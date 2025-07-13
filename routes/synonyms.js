const express = require("express");
const router = express.Router();
const SynonymService = require("../services/synonymService");

//Endpoint zaduzen za dodavanje sinonima
router.post("/addSynonym", (req, res) => {
    try {
        let { word1, word2 } = req.body;
        
        //Normalizacija dolaznih podataka
        if (typeof word1 === "string") word1 = word1.trim().toLowerCase();
        if (typeof word2 === "string") word2 = word2.trim().toLowerCase();

        const isValidWord = (word) => /^[\p{L}]+$/u.test(word);

        if (!isValidWord(word1) || !isValidWord(word2)) {
            return res.status(400).json({ message: "Riječi moraju sadržavati samo slova." });
        }
    
        if (!word1 || !word2) {
          return res.status(400).json({ message: "Obje riječi su obavezne." });
        }
    
        if (word1 === word2) {
          return res.status(400).json({ message: "Riječi moraju biti različite." });
        }
        
        //Poziv metode iz servisa za postavljanje sinonima
        SynonymService.setSynonym(word1, word2);
        res.json({ message: `Spojeni sinonimi: ${word1} i ${word2}.` });
      } catch (error) {
        console.error("Greška kod dodavanja sinonima:", error);
        res.status(500).json({ message: "Došlo je do greške na serveru." });
      }
});

//Endpoint zaduzen za dohvacanje svih sinonima 
router.get("/:word", (req, res) => {
    try {
        let word = req.params.word;
        
        //Normalizacija dolaznih podataka
        if (typeof word === "string") word = word.trim().toLowerCase();
        
        //Dohvat svih sinonima te riječi
        const synonyms = SynonymService.getSynonym(word);
    
        if (synonyms.length === 0) {
          return res
            .status(404)
            .json({ synonyms: [], message: "Nema sinonima za ovu riječ." });
        }
    
        res.json({ synonyms });
      } catch (error) {
        console.error("Greška kod dohvaćanja sinonima:", error);
        res.status(500).json({ message: "Došlo je do greške na serveru." });
      }
});

module.exports = router;

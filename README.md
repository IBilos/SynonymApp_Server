# Synonym Backend API

**Synonym Backend API** je brz i jednostavan Node.js/Express servis koji omogućuje rad s grupama sinonima u memoriji.  
Podržava dodavanje sinonima, dohvat svih sinonima za zadanu riječ, kao i automatsko tranzitivno povezivanje.

---

## Značajke

- ✅ Dodavanje novih riječi i njihovih sinonima
- ✅ Dohvat svih sinonima za zadanu riječ
- ✅ Podrška za tranzitivno povezivanje

---

## Tehnologije

- Node.js
- Express

---

## Pokretanje lokalno

1. Kloniraj repozitorij:
git clone https://github.com/tvoj-username/synonym-backend.git
cd synonym-backend

2️. Instaliraj ovisnosti:
npm install

3️. Pokreni server:
npm start

Server će raditi na:
http://localhost:3000

---

## API Endpoints

Dodavanje sinonima
POST /synonyms/addSynonym

Dohvat sinonima
GET /synonyms/:word
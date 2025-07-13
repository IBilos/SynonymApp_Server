const parent = new Map();
const rank = new Map();
const group = new Map();

// Normalizira riječ (trim i lowercase) radi sigurnosti unutar servisa
function normalize(word) {
    return typeof word === "string" ? word.trim().toLowerCase() : word;
}

// Inicijalizira novi skup s danom riječi ako još ne postoji
function makeSet(word) {
    if (typeof word !== "string" || word.trim() === "") return;

    if (!parent.has(word)) {
        parent.set(word, word);
        rank.set(word, 0);
        group.set(word, new Set([word]));
    }
}

// Rekurzivno pronalazi korijen skupa (root) s path compression optimizacijom
function find(word) {
    if (parent.get(word) === word) return word;

    parent.set(word, find(parent.get(word))); // path compression
    return parent.get(word);
}

// Spaja dvije grupe sinonima u jednu i ažurira mapu grupa
function mergeGroups(rootKeep, rootMove) {
    const setKeep = group.get(rootKeep);
    const setMove = group.get(rootMove);

    for (const word of setMove) {
        setKeep.add(word);
    }
    group.delete(rootMove);
}

// Spaja dva skupa sinonima koristeći rank za balansiranje stabla
function union(word1, word2) {
    const root1 = find(word1);
    const root2 = find(word2);

    if (root1 === root2) return;

    if (rank.get(root1) < rank.get(root2)) {
        parent.set(root1, root2);
        mergeGroups(root2, root1);
    } else if (rank.get(root1) > rank.get(root2)) {
        parent.set(root2, root1);
        mergeGroups(root1, root2);
    } else {
        parent.set(root2, root1);
        rank.set(root1, rank.get(root1) + 1);
        mergeGroups(root1, root2);
    }
}

// Postavlja dva pojma kao sinonime, inicijalizira i spaja skupove
function setSynonym(word1, word2) {
    word1 = normalize(word1);
    word2 = normalize(word2);

    makeSet(word1);
    makeSet(word2);
    union(word1, word2);
}

// Dohvaća sve sinonime riječi osim same riječi
function getSynonym(word) {
    word = normalize(word);

    if (!parent.has(word)) return [];

    const root = find(word);
    const synonymsSet = group.get(root);
    if (!synonymsSet) return [];

    return [...synonymsSet].filter(w => w !== word);
}

module.exports = {
    setSynonym,
    getSynonym,
};
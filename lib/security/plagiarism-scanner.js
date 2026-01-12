/**
 * Plagiarism Scanner
 * 
 * Simulates a check against a database of known sources.
 * In a real production environment, this would call an API like Copyleaks or Turnitin.
 * For this "Production Ready" standalone implementation, we will:
 * 1. Shingle-based fingerprinting (N-grams)
 * 2. Check against a local "database" of previous submissions (Mocked for now, but structured to run)
 * 3. Check against a set of "Common Knowledge" or "Famous Texts" to demonstrate detection.
 */

// Simulated internal database of previous submissions
const INTERNAL_DB = [
    "React is a library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called components.",
    "Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering.",
    "Tailwind CSS is a utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90.",
    "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune."
];

// Tokenize into 3-grams (Shingles)
const getShingles = (text) => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    if (words.length < 3) return new Set([text]);

    const shingles = new Set();
    for (let i = 0; i < words.length - 2; i++) {
        shingles.add(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
    }
    return shingles;
};

// Jaccard Similarity
const calculateSimilarity = (setA, setB) => {
    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);
    return (intersection.size / union.size) * 100;
};

export const scanPlagiarism = (text) => {
    if (!text || text.length < 20) return { score: 0, matches: [] };

    const inputShingles = getShingles(text);
    let maxSimilarity = 0;
    let matches = [];

    // Scan against Internal DB
    INTERNAL_DB.forEach((sourceText, index) => {
        const sourceShingles = getShingles(sourceText);
        const similarity = calculateSimilarity(inputShingles, sourceShingles);

        if (similarity > 5) { // Threshold to report a match
            maxSimilarity = Math.max(maxSimilarity, similarity);
            matches.push({
                sourceId: `db_record_${index}`,
                sourcePreview: sourceText.substring(0, 50) + "...",
                similarity: Math.round(similarity)
            });
        }
    });

    // Heuristic: Check for exact string matches of reasonable length (Copy-Paste)
    // This catches direct copies even if surrounded by new unique text
    INTERNAL_DB.forEach((sourceText, index) => {
        if (text.includes(sourceText.substring(0, 30)) && text.length > 50) {
            // If input contains a significant chunk of a source
            if (!matches.find(m => m.sourceId === `db_record_${index}`)) {
                maxSimilarity = Math.max(maxSimilarity, 100);
                matches.push({
                    sourceId: `db_record_${index}`,
                    sourcePreview: sourceText.substring(0, 50) + "...",
                    similarity: 100,
                    type: "EXACT_MATCH"
                });
            }
        }
    });

    return {
        score: Math.min(100, Math.round(maxSimilarity)),
        isPlagiarized: maxSimilarity > 15,
        matches: matches.sort((a, b) => b.similarity - a.similarity)
    };
};

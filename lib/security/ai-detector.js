/**
 * AI Content Detector - Heuristic Analysis Engine
 * 
 * Uses statistical analysis of text features to estimate the probability of AI generation.
 * Factors:
 * 1. Burstiness (Sentence length variance) - AI is often very uniform. Humans are chaotic.
 * 2. Perplexity Proxy (Vocabulary complexity/diversity) - AI uses common tokens.
 * 3. AI Transition Phrases - "In conclusion", "Furthermore", "It is worth noting".
 */

const AI_TRANSITIONS = [
    "in conclusion", "furthermore", "moreover", "it is important to note",
    "on the other hand", "consequently", "therefore", "significantly",
    "additionally", "in summary", "to summarize", "as a matter of fact",
    "it can be seen that", "it is evident that", "lastly", "firstly",
    "secondly", "thirdly", "notably", "subsequently"
];

const AI_PHRASES = [
    "as an ai language model", "regenerate response", "cutoff date",
    "my knowledge cutoff", "i do not have an opinion", "i cannot browse",
    "vital role", "game changer", "tapestry", "delve into"
];

export const analyzeAI = (text) => {
    if (!text || text.length < 50) return { score: 0, confidence: 'low', details: [] };

    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];

    let score = 0;
    const details = [];

    // 1. BURSTINESS CHECK (Variance in sentence length)
    // Low variance = High AI probability
    const sentenceLengths = sentences.map(s => s.split(" ").length);
    const avgLen = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
    const variance = sentenceLengths.reduce((a, b) => a + Math.pow(b - avgLen, 2), 0) / sentenceLengths.length;
    const stdDev = Math.sqrt(variance);
    const coefficientOfVariation = stdDev / avgLen;

    if (coefficientOfVariation < 0.35) {
        score += 30; // Very uniform sentence lengths
        details.push("Low sentence length variance (Robotic rhythm)");
    } else if (coefficientOfVariation < 0.5) {
        score += 15;
    }

    // 2. VOCABULARY DIVERSITY (Type-Token Ratio)
    // High repetition = Higher AI probability (sometimes, depending on model settings, but simpler models repeat)
    // Actually, modern AI has high diversity, but specific "safe" diversity. 
    // Let's invert: Humans make typos and use slang. AI is perfect.
    // For this heuristic, we'll focus on "Perplexity Proxy" - absence of complex/rare words? 
    // Easier: Check for common AI transition overuse.

    let transitionCount = 0;
    AI_TRANSITIONS.forEach(phrase => {
        if (text.toLowerCase().includes(phrase)) {
            transitionCount++;
        }
    });

    // Density of transitions
    const transitionDensity = transitionCount / sentences.length;
    if (transitionDensity > 0.25) {
        score += 25;
        details.push(`High overuse of transition phrases (${transitionCount} found)`);
    } else if (transitionDensity > 0.15) {
        score += 15;
    }

    // 3. SPECIFIC AI PHRASES (The "Smoking Gun")
    let phraseCount = 0;
    AI_PHRASES.forEach(phrase => {
        if (text.toLowerCase().includes(phrase)) {
            phraseCount++;
            score += 20; // High penalty for obvious AI watermarks
            details.push(`Detected AI fingerprint phrase: "${phrase}"`);
        }
    });

    // 4. COMPLEXITY (Avg word length)
    // AI tends to use slightly more complex/academic vocabulary on average than casual humans
    const avgWordLen = words.reduce((a, b) => a + b.length, 0) / words.length;
    if (avgWordLen > 6.5) {
        score += 10;
        details.push("Unusually complex average vocabulary");
    }

    // Cap score at 100
    score = Math.min(100, Math.round(score));

    return {
        score, // 0-100 probability
        isAI: score > 40,
        confidence: score > 70 ? 'high' : 'medium',
        breakingFactors: details
    };
};

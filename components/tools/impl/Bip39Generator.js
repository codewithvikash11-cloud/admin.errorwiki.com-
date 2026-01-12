"use client";

import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Check, AlertTriangle, Wallet } from 'lucide-react';

// Simplified BIP39 Wordlist (Excerpt for demo purposes)
const MOCKED_WORDLIST = [
    "abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract", "absurd", "abuse",
    "access", "accident", "account", "accuse", "achieve", "acid", "acoustic", "acquire", "across", "act",
    "action", "actor", "actress", "actual", "adapt", "add", "addict", "address", "adjust", "admit",
    "adult", "advance", "advice", "aerobic", "affair", "afford", "afraid", "again", "age", "agent",
    "agree", "ahead", "aim", "air", "airport", "aisle", "alarm", "album", "alcohol", "alert",
    "alien", "all", "alley", "allow", "almost", "alone", "alpha", "already", "also", "alter",
    "always", "amateur", "amazing", "among", "amount", "amused", "analyst", "anchor", "ancient", "anger",
    "angle", "angry", "animal", "ankle", "announce", "annual", "another", "answer", "antenna", "antique",
    "anxiety", "any", "apart", "apology", "appear", "apple", "approve", "april", "arch", "arctic",
    "area", "arena", "argue", "arm", "armed", "armor", "army", "around", "arrange", "arrest",
    "arrive", "arrow", "art", "artefact", "artist", "artwork", "ask", "aspect", "assault", "asset",
    "assist", "assume", "asthma", "athlete", "atom", "attack", "attend", "attitude", "attract", "auction",
    "audit", "august", "aunt", "author", "auto", "autumn", "average", "avocado", "avoid", "awake",
    "aware", "away", "awesome", "awful", "awkward", "axis", "baby", "bachelor", "bacon", "badge",
    "bag", "balance", "balcony", "ball", "bamboo", "banana", "banner", "bar", "barely", "bargain",
    "barrel", "base", "basic", "basket", "battle", "beach", "bean", "beauty", "because", "become",
    "beef", "before", "begin", "behave", "behind", "believe", "below", "belt", "bench", "benefit",
    "best", "betray", "better", "between", "beyond", "bicycle", "bid", "bike", "bind", "biology",
    "bird", "birth", "bitter", "black", "blade", "blame", "blanket", "blast", "bleak", "bless",
    "blind", "blood", "blossom", "blouse", "blue", "blur", "blush", "board", "boat", "body",
    "boil", "bomb", "bone", "bonus", "book", "boost", "border", "boring", "borrow", "boss",
    "bottom", "bounce", "box", "boy", "bracket", "brain", "brand", "brass", "brave", "bread",
    "breeze", "brick", "bridge", "brief", "bright", "bring", "brisk", "broccoli", "broken", "bronze",
    "broom", "brother", "brown", "brush", "bubble", "buddy", "budget", "buffalo", "build", "bulb",
    "bulk", "bullet", "bundle", "bunker", "burden", "burger", "burst", "bus", "business", "busy",
    "butter", "buyer", "buzz", "cabbage", "cabin", "cable", "cactus", "cage", "cake", "call",
    "calm", "camera", "camp", "can", "canal", "cancel", "candy", "cannon", "canoe", "canvas",
    "canyon", "capable", "capital", "captain", "car", "carbon", "card", "cargo", "carpet", "carry",
    "cart", "case", "cash", "casino", "castle", "casual", "cat", "catalog", "catch", "category",
    "cattle", "caught", "cause", "caution", "cave", "ceiling", "celery", "cement", "census", "century",
    "cereal", "certain", "chair", "chalk", "champion", "change", "chaos", "chapter", "charge", "chase",
    "chat", "cheap", "check", "cheese", "chef", "cherry", "chest", "chicken", "chief", "child",
    "chimney", "choice", "choose", "chronic", "chuckle", "chunk", "churn", "cigar", "cinnamon", "circle",
    "citizen", "city", "civil", "claim", "clap", "clarify", "claw", "clay", "clean", "clerk",
    "clever", "click", "client", "cliff", "climb", "clinic", "clip", "clock", "clog", "close",
    "cloth", "cloud", "clown", "club", "clump", "cluster", "clutch", "coach", "coast", "coconut",
    "code", "coffee", "coil", "coin", "collect", "color", "column", "combine", "come", "comfort",
    "comic", "common", "company", "concert", "conduct", "confirm", "congress", "connect", "consider", "control",
    "convince", "cook", "cool", "copper", "copy", "coral", "core", "corn", "correct", "cost",
    "cotton", "couch", "country", "couple", "course", "cousin", "cover", "coyote", "crack", "cradle",
    "craft", "cram", "crane", "crash", "crater", "crawl", "crazy", "cream", "credit", "creek",
    "crew", "cricket", "crime", "crisp", "critic", "crop", "cross", "crouch", "crowd", "crucial",
    "cruel", "cruise", "crumble", "crunch", "crush", "cry", "crystal", "cube", "culture", "cup",
    "cupboard", "curious", "current", "curtain", "curve", "cushion", "custom", "cute", "cycle", "dad",
    "damage", "damp", "dance", "danger", "daring", "dash", "daughter", "dawn", "day", "deal",
    "debate", "debris", "debt", "decade", "decay", "december", "decide", "deck", "decrease", "dedicate",
    "deep", "deer", "defense", "define", "defy", "degree", "delay", "deliver", "demand", "demise",
    "denial", "dentist", "deny", "depart", "depend", "deposit", "depth", "deputy", "derive", "describe",
    "desert", "design", "desk", "despair", "destroy", "detail", "detect", "develop", "device", "devote",
    "diagram", "dial", "diamond", "diary", "dice", "diesel", "diet", "differ", "digital", "dignity",
    "dilemma", "dinner", "dinosaur", "direct", "dirt", "disagree", "discover", "disease", "dish", "dismiss",
    "disorder", "display", "distance", "divert", "divide", "divorce", "dizzy", "doctor", "document", "dog",
    "doll", "dolphin", "domain", "donate", "donkey", "donor", "door", "dose", "double", "dove",
    "draft", "dragon", "drama", "drastic", "draw", "dream", "dress", "drift", "drill", "drink",
    "drip", "drive", "drop", "drum", "dry", "duck", "dumb", "dune", "during", "dust",
    "dutch", "duty", "dwarf", "dynamic", "eager", "eagle", "early", "earn", "earth", "easily",
    "east", "easy", "echo", "ecology", "economy", "edge", "edit", "educate", "effort", "egg",
    "eight", "either", "elbow", "elder", "electric", "elegant", "element", "elephant", "elevator", "elite",
    "else", "embark", "embody", "embrace", "emerge", "emotion", "employ", "empower", "empty", "enable",
    "enact", "end", "endless", "endorse", "enemy", "energy", "enforce", "engage", "engine", "enhance",
    "enjoy", "enlist", "enough", "enrich", "enroll", "ensure", "enter", "entire", "entry", "envelope",
    "episode", "equal", "equip", "era", "erase", "erode", "erosion", "error", "erupt", "escape",
    "essay", "essence", "estate", "eternal", "ethics", "evidence", "evil", "evoke", "evolve", "exact"
];

function generateMnemonic(length = 12) {
    if (typeof window === 'undefined' || !window.crypto) {
        // Fallback for SSR or no crypto
        return Array(length).fill('loading...');
    }

    const phrase = [];
    try {
        const randomValues = new Uint32Array(length);
        window.crypto.getRandomValues(randomValues);

        for (let i = 0; i < length; i++) {
            const index = randomValues[i] % MOCKED_WORDLIST.length;
            phrase.push(MOCKED_WORDLIST[index]);
        }
    } catch (e) {
        console.error("Crypto generation failed", e);
        // Fallback to Math.random if strictly necessary but better to show error?
        // User requested secure generator.
        return Array(length).fill('Error');
    }
    return phrase;
}

export default function Bip39Generator() {
    const [phrase, setPhrase] = useState([]);
    const [length, setLength] = useState(12);
    const [copied, setCopied] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        generate();
    }, []);

    useEffect(() => {
        if (mounted) generate();
    }, [length]);

    const generate = () => {
        setPhrase(generateMnemonic(length));
        setCopied(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(phrase.join(' '));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!mounted) {
        return <div className="p-8 text-center text-text-tertiary">Loading generator...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex gap-3 text-sm text-yellow-500">
                <AlertTriangle className="shrink-0 mt-0.5" size={18} />
                <div className="leading-relaxed">
                    <span className="font-bold block mb-1">Important Note:</span>
                    This tool uses a secure random number generator but a limited wordlist for demonstration purposes in this standalone environment. For holding real cryptocurrency assets, always use an offline hardware wallet or correctly audited offline tools.
                </div>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="bg-accent-primary/10 p-3 rounded-xl text-accent-primary">
                            <Wallet size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-text-primary">Generate Recovery Phrase</h3>
                            <p className="text-text-tertiary text-sm">Create specific length mnemonic phrases</p>
                        </div>
                    </div>

                    <div className="flex items-center bg-background rounded-lg p-1 border border-border">
                        {[12, 15, 18, 24].map(len => (
                            <button
                                key={len}
                                onClick={() => setLength(len)}
                                className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${length === len ? 'bg-accent-primary text-white shadow-sm' : 'text-text-secondary hover:text-text-primary hover:bg-surface-active'}`}
                            >
                                {len} words
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                    {phrase.map((word, i) => (
                        <div key={i} className="flex items-center gap-3 bg-background border border-border rounded-xl px-4 py-3 group hover:border-accent-primary/50 transition-colors">
                            <span className="text-xs font-mono text-text-tertiary select-none w-6 text-right font-bold group-hover:text-accent-primary transition-colors">{i + 1}.</span>
                            <span className="text-base font-bold text-text-primary tracking-wide font-mono">{word}</span>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={generate}
                        className="flex-1 py-4 bg-surface-highlight hover:bg-surface-active border border-border text-text-primary rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={20} /> Generate New Phrase
                    </button>
                    <button
                        onClick={copyToClipboard}
                        className="flex-[2] py-4 bg-accent-primary hover:bg-accent-hover text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent-primary/20"
                    >
                        {copied ? <Check size={20} /> : <Copy size={20} />}
                        {copied ? 'Copied to Clipboard' : 'Copy Recovery Phrase'}
                    </button>
                </div>
            </div>
        </div>
    );
}

/**
 * Behavior Tracker
 * 
 * Analyze user interaction patterns to detect bots or malicious actors.
 * 
 * Client-Side Events Processed:
 * - Paste Events (Frequency, Volume)
 * - Typing Interval (Superhuman speed = Bot)
 * - Focus/Blur flipping (Context switching to copy source)
 */

export const analyzeBehavior = (eventLog) => {
    // eventLog expected format: { type: 'paste'|'type', timestamp: number, charCount?: number }[]

    let score = 100; // Start with perfect trust
    const violations = [];

    if (!eventLog || eventLog.length === 0) return { trustScore: 100, violations: [] };

    // 1. PASTE VELOCITY
    const pastes = eventLog.filter(e => e.type === 'paste');
    if (pastes.length > 0) {
        const totalPastedChars = pastes.reduce((sum, e) => sum + (e.charCount || 0), 0);

        // If they pasted a huge amount in a single go or very quickly
        if (totalPastedChars > 500 && pastes.length < 3) {
            score -= 20;
            violations.push("Bulk content dumping");
        }

        // High frequency pasting
        if (pastes.length > 5) {
            const timeSpan = pastes[pastes.length - 1].timestamp - pastes[0].timestamp;
            if (timeSpan < 10000) { // 5 pastes in 10 seconds
                score -= 30;
                violations.push("Rapid paste sequences");
            }
        }
    }

    // 2. TYPING SPEED (Bot Detection)
    const keystrokes = eventLog.filter(e => e.type === 'type');
    if (keystrokes.length > 10) {
        let totalInterval = 0;
        for (let i = 1; i < keystrokes.length; i++) {
            totalInterval += (keystrokes[i].timestamp - keystrokes[i - 1].timestamp);
        }
        const avgInterval = totalInterval / (keystrokes.length - 1);

        if (avgInterval < 30) { // Under 30ms per key is superhuman
            score -= 50;
            violations.push("Superhuman typing speed (Potential Bot)");
        }
    }

    return {
        trustScore: Math.max(0, score),
        isSuspicious: score < 70,
        violations
    };
};

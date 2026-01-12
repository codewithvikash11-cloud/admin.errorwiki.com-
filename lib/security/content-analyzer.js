import { analyzeAI } from './ai-detector';
import { scanPlagiarism } from './plagiarism-scanner';
import { analyzeBehavior } from './behavior-tracker';

/**
 * Main Entry Point for Content Security Validation
 * 
 * @param {string} content - The text content to analyze
 * @param {object} behaviorLogs - Client-side captured event logs
 * @param {object} userProfile - Current user's metadata (trustScore, role)
 */
export const validateContent = async (content, behaviorLogs = [], userProfile = { trustScore: 100 }) => {

    // 1. Run Analysis Modules Parallelly
    const aiResult = analyzeAI(content);
    const plagiarismResult = scanPlagiarism(content);
    const behaviorResult = analyzeBehavior(behaviorLogs);

    // 2. Synthesize Results
    const securityReport = {
        timestamp: new Date().toISOString(),
        ai: aiResult,
        plagiarism: plagiarismResult,
        behavior: behaviorResult,
        userTrustBefore: userProfile.trustScore,
        status: 'APPROVED', // Default
        rejectionReason: null
    };

    // 3. Enforce Rules
    const violations = [];

    // Rule 1: AI Content Strictness
    if (aiResult.isAI) {
        violations.push(`AI Content Detected (${aiResult.score}%)`);
        securityReport.status = 'REJECTED';
    }

    // Rule 2: Plagiarism Tolerance
    if (plagiarismResult.isPlagiarized) {
        violations.push(`High Plagiarism Detected (${plagiarismResult.score}%)`);
        securityReport.status = 'REJECTED';
    }

    // Rule 3: Suspicious Behavior
    if (behaviorResult.isSuspicious) {
        violations.push(`Suspicious User Behavior (Trust Score Impact: -${100 - behaviorResult.trustScore})`);
        // We might not reject solely on behavior, but we flag it hard.
        // If trust drops too low, then reject.
        if (behaviorResult.trustScore < 50) {
            securityReport.status = 'REJECTED';
            violations.push("Trust score too low");
        }
    }

    securityReport.violations = violations;
    if (violations.length > 0) {
        securityReport.rejectionReason = violations.join(", ");
    }

    return securityReport;
};

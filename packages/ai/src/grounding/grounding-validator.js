"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroundingValidator = void 0;
const shared_types_1 = require("@bis/shared-types");
class GroundingValidator {
    /**
     * Validates generated answer against retrieved evidence.
     * Ensures that standards numbers, clause references, and specific claims are present in the evidence.
     */
    validate(answer, evidenceList) {
        if (!evidenceList || evidenceList.length === 0) {
            return {
                isFullyGrounded: false,
                supportedClaimsCount: 0,
                unsupportedClaimsCount: 1,
                confidenceScore: 0.1,
                confidenceLevel: shared_types_1.ConfidenceLevel.LOW,
                groundingDetails: [
                    {
                        claim: 'General assertion without evidence backing',
                        isSupported: false,
                        note: 'No authoritative evidence chunks were retrieved.'
                    }
                ]
            };
        }
        const standardNumbersInAnswer = answer.match(/IS\s*\d+(?::\d{4})?/gi) || [];
        const clausesInAnswer = answer.match(/Clause\s*[0-9.]+/gi) || [];
        const evidenceTextCombined = evidenceList
            .map(e => `${e.standardNumber} ${e.documentTitle} ${e.clause} ${e.excerpt}`)
            .join(' ')
            .toLowerCase();
        const details = [];
        let supported = 0;
        let unsupported = 0;
        // Check standard numbers
        for (const std of standardNumbersInAnswer) {
            const normalizedStd = std.toLowerCase().replace(/\s+/g, ' ');
            const matchingEvidence = evidenceList.find(e => e.standardNumber.toLowerCase().includes(normalizedStd) || normalizedStd.includes(e.standardNumber.toLowerCase()));
            if (matchingEvidence) {
                supported++;
                details.push({
                    claim: `Reference to standard ${std}`,
                    isSupported: true,
                    supportingEvidenceId: matchingEvidence.id
                });
            }
            else {
                unsupported++;
                details.push({
                    claim: `Unverified standard ${std}`,
                    isSupported: false,
                    note: 'Standard mentioned in answer is not present in retrieved authoritative evidence.'
                });
            }
        }
        // Check clauses
        for (const cl of clausesInAnswer) {
            const normalizedCl = cl.toLowerCase();
            const matchingEvidence = evidenceList.find(e => evidenceTextCombined.includes(normalizedCl) || (e.clause && e.clause.toLowerCase().includes(normalizedCl.replace('clause', '').trim())));
            if (matchingEvidence) {
                supported++;
                details.push({
                    claim: `Reference to ${cl}`,
                    isSupported: true,
                    supportingEvidenceId: matchingEvidence.id
                });
            }
            else {
                unsupported++;
                details.push({
                    claim: `Unverified clause ${cl}`,
                    isSupported: false,
                    note: 'Clause not found in evidence chunk.'
                });
            }
        }
        const totalClaims = supported + unsupported;
        const score = totalClaims === 0 ? 0.85 : supported / totalClaims;
        let confidenceLevel = shared_types_1.ConfidenceLevel.HIGH;
        if (score < 0.6 || unsupported > 0) {
            confidenceLevel = shared_types_1.ConfidenceLevel.MEDIUM;
        }
        if (score < 0.4 || (supported === 0 && totalClaims > 0)) {
            confidenceLevel = shared_types_1.ConfidenceLevel.LOW;
        }
        return {
            isFullyGrounded: unsupported === 0,
            supportedClaimsCount: supported,
            unsupportedClaimsCount: unsupported,
            confidenceScore: Math.round(score * 100) / 100,
            confidenceLevel,
            groundingDetails: details
        };
    }
}
exports.GroundingValidator = GroundingValidator;
//# sourceMappingURL=grounding-validator.js.map
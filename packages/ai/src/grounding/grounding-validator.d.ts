import { Evidence, GroundingValidationResult } from '@bis/shared-types';
export declare class GroundingValidator {
    /**
     * Validates generated answer against retrieved evidence.
     * Ensures that standards numbers, clause references, and specific claims are present in the evidence.
     */
    validate(answer: string, evidenceList: Evidence[]): GroundingValidationResult;
}
//# sourceMappingURL=grounding-validator.d.ts.map
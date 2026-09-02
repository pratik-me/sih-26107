import { Evidence } from './rag';
export interface TestingRequirement {
    id: string;
    standardNumber: string;
    testName: string;
    testMethod: string;
    clauseNumber: string;
    description: string;
    acceptanceCriteria: string;
    samplingRequirements: string;
    testingFrequency: string;
    requiredEquipment: string[];
    isDestructive: boolean;
    isMandatoryRoutineTest: boolean;
    applicableProducts: string[];
    sourceUrl?: string;
    evidence?: Evidence;
}
export interface TestingSearchFilter {
    standardNumber?: string;
    productName?: string;
    testName?: string;
    isDestructive?: boolean;
}
//# sourceMappingURL=testing.d.ts.map
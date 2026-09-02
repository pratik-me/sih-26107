export interface PurityFineness {
    metal: 'GOLD' | 'SILVER';
    karatDisplay: string;
    finenessNumber: number;
    description: string;
    usageType: string;
    officialStandard: string;
    mandatoryMarkings: Array<{
        name: string;
        description: string;
        iconOrRepresentation: string;
    }>;
}
export interface HuidValidationResult {
    huid: string;
    isValidFormat: boolean;
    length: number;
    explanation: string;
    mandatoryComponents: string[];
    howToVerifyOnBisCare: string[];
    consumerSafetyTips: string[];
}
export interface HallmarkingCentre {
    id: string;
    centreName: string;
    centreCode: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    contactEmail: string;
    contactPhone: string;
    recognizedMetals: Array<'GOLD' | 'SILVER'>;
    recognitionStatus: 'ACTIVE' | 'SUSPENDED' | 'EXPIRED';
    validUpTo: string;
    sourceUrl: string;
}
export interface HallmarkingGuidance {
    purityGrades: PurityFineness[];
    huidExplanation: string;
    threeMandatoryMarks: Array<{
        markNumber: number;
        title: string;
        detail: string;
    }>;
    consumerRights: string[];
    compensationPolicy: string;
}
//# sourceMappingURL=hallmarking.d.ts.map
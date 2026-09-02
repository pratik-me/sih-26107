export interface Laboratory {
    id: string;
    name: string;
    labCode: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    contactPerson?: string;
    contactEmail: string;
    contactPhone: string;
    recognitionStatus: 'RECOGNIZED' | 'PROVISIONAL' | 'SUSPENDED' | 'EXPIRED';
    validUpTo: string;
    accreditationBody: string;
    recognizedStandards: string[];
    testingCapabilities: string[];
    isNablAccredited: boolean;
    isBisRecognized: boolean;
    latitude?: number;
    longitude?: number;
    sourceUrl: string;
    lastUpdatedDate: string;
}
export interface LaboratorySearchFilter {
    standardNumber?: string;
    productName?: string;
    testName?: string;
    state?: string;
    city?: string;
    recognitionStatus?: string;
}
//# sourceMappingURL=laboratories.d.ts.map
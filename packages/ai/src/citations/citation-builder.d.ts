import { Citation, Evidence } from '@bis/shared-types';
export declare class CitationBuilder {
    /**
     * Constructs strict, traceable citations for each referenced evidence chunk.
     */
    buildCitations(evidenceList: Evidence[]): Citation[];
    /**
     * Appends formal citation references to generated response text.
     */
    formatResponseWithCitations(text: string, citations: Citation[]): string;
}
//# sourceMappingURL=citation-builder.d.ts.map
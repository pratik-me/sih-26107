import { StandardStatus } from '@bis/shared-types';

export interface RawDocumentSection {
  documentTitle: string;
  standardNumber: string;
  sectionTitle?: string;
  clauseNumber: string;
  subclauseNumber?: string;
  pageNumber: number;
  content: string;
  tables?: Array<{
    title: string;
    headers: string[];
    rows: string[][];
  }>;
  sourceUrl: string;
  version?: string;
  publicationDate: string;
  status: StandardStatus;
}

export interface StructuredChunk {
  chunkIndex: number;
  documentTitle: string;
  standardNumber: string;
  section?: string;
  clause: string;
  subclause?: string;
  page: number;
  content: string;
  metadata: {
    sourceUrl: string;
    version?: string;
    publicationDate: string;
    status: StandardStatus;
    hasTables: boolean;
  };
}

export class StructureAwareDocumentChunker {
  /**
   * Structure-aware chunking that preserves clause boundaries, tables, and page metadata.
   * Does NOT blindly slice by character length.
   */
  chunkDocument(sections: RawDocumentSection[]): StructuredChunk[] {
    const chunks: StructuredChunk[] = [];
    let chunkIndex = 0;

    for (const sec of sections) {
      // If table exists, format into structured markdown text to preserve relations
      let formattedContent = sec.content.trim();

      if (sec.tables && sec.tables.length > 0) {
        for (const tbl of sec.tables) {
          formattedContent += `\n\n**Table: ${tbl.title}**\n`;
          formattedContent += `| ${tbl.headers.join(' | ')} |\n`;
          formattedContent += `| ${tbl.headers.map(() => '---').join(' | ')} |\n`;
          for (const row of tbl.rows) {
            formattedContent += `| ${row.join(' | ')} |\n`;
          }
        }
      }

      // If content is very long, split along paragraph boundaries preserving clause context
      const paragraphs = formattedContent.split(/\n\s*\n/);
      let currentSubChunk = '';

      for (let p = 0; p < paragraphs.length; p++) {
        const para = paragraphs[p].trim();
        if (!para) continue;

        if ((currentSubChunk + '\n\n' + para).length > 1200 && currentSubChunk.length > 0) {
          chunks.push({
            chunkIndex: chunkIndex++,
            documentTitle: sec.documentTitle,
            standardNumber: sec.standardNumber,
            section: sec.sectionTitle,
            clause: sec.clauseNumber,
            subclause: sec.subclauseNumber,
            page: sec.pageNumber,
            content: `[${sec.standardNumber} Clause ${sec.clauseNumber} - Page ${sec.pageNumber}]\n${currentSubChunk.trim()}`,
            metadata: {
              sourceUrl: sec.sourceUrl,
              version: sec.version,
              publicationDate: sec.publicationDate,
              status: sec.status,
              hasTables: !!(sec.tables && sec.tables.length > 0)
            }
          });
          currentSubChunk = para;
        } else {
          currentSubChunk = currentSubChunk ? `${currentSubChunk}\n\n${para}` : para;
        }
      }

      if (currentSubChunk.trim()) {
        chunks.push({
          chunkIndex: chunkIndex++,
          documentTitle: sec.documentTitle,
          standardNumber: sec.standardNumber,
          section: sec.sectionTitle,
          clause: sec.clauseNumber,
          subclause: sec.subclauseNumber,
          page: sec.pageNumber,
          content: `[${sec.standardNumber} Clause ${sec.clauseNumber} - Page ${sec.pageNumber}]\n${currentSubChunk.trim()}`,
          metadata: {
            sourceUrl: sec.sourceUrl,
            version: sec.version,
            publicationDate: sec.publicationDate,
            status: sec.status,
            hasTables: !!(sec.tables && sec.tables.length > 0)
          }
        });
      }
    }

    return chunks;
  }
}

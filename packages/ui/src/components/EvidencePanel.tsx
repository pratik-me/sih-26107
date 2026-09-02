import React from 'react';
import { Evidence } from '@bis/shared-types';
import { ExternalLink, Copy, Check, FileText, BookOpen, AlertTriangle } from 'lucide-react';
import { SourceFreshnessBadge } from './SourceFreshnessBadge';

interface EvidencePanelProps {
  evidenceList: Evidence[];
  activeEvidenceId?: string;
  onSelectEvidence?: (id: string) => void;
  onClose?: () => void;
  className?: string;
}

export const EvidencePanel: React.FC<EvidencePanelProps> = ({
  evidenceList,
  activeEvidenceId,
  onSelectEvidence,
  onClose,
  className = ''
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const activeEvidence =
    evidenceList.find(e => e.id === activeEvidenceId) || (evidenceList.length > 0 ? evidenceList[0] : null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (evidenceList.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 text-center text-slate-500 bg-slate-50/50 dark:bg-slate-900/30 rounded-lg border border-dashed border-slate-200 dark:border-slate-800 ${className}`}>
        <BookOpen className="w-10 h-10 text-slate-400 mb-3" />
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">No Evidence Referenced</h4>
        <p className="text-xs text-slate-500 mt-1 max-w-xs">
          Ask a question or select a standard to inspect grounded Bureau of Indian Standards evidence clauses and Gazette excerpts.
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Authoritative Evidence ({evidenceList.length})
          </h3>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded"
          >
            ✕
          </button>
        )}
      </div>

      {/* Evidence Tabs if multiple */}
      {evidenceList.length > 1 && (
        <div className="flex items-center gap-1.5 p-2 bg-slate-100/70 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
          {evidenceList.map((ev, index) => {
            const isSelected = activeEvidence?.id === ev.id;
            return (
              <button
                key={ev.id}
                type="button"
                onClick={() => onSelectEvidence && onSelectEvidence(ev.id)}
                className={`text-xs px-2.5 py-1 rounded whitespace-nowrap font-medium transition-all ${
                  isSelected
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 shadow-sm border border-slate-200 dark:border-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                [{index + 1}] {ev.standardNumber}
              </button>
            );
          })}
        </div>
      )}

      {/* Main Evidence Content */}
      {activeEvidence && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Metadata Card */}
          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase">
                  Indian Standard
                </span>
                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {activeEvidence.standardNumber}
                </h4>
              </div>
              <SourceFreshnessBadge status={activeEvidence.status} />
            </div>

            <p className="text-xs font-medium text-slate-600 dark:text-slate-300 line-clamp-2">
              {activeEvidence.documentTitle}
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400">
              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Clause: </span>
                {activeEvidence.clause || 'General Scope'}
              </div>
              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Page: </span>
                {activeEvidence.page || 'N/A'}
              </div>
              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Publication: </span>
                {activeEvidence.publicationDate || 'Official Publication'}
              </div>
              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Relevance: </span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {Math.round(activeEvidence.similarityScore * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Outdated Warning if applicable */}
          {activeEvidence.isOutdated && (
            <div className="p-3 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200 flex gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Freshness Notice:</strong> This version of the standard may have subsequent amendments or reaffirmations. Verify against the current BIS Gazette list.
              </span>
            </div>
          )}

          {/* Verbatim Excerpt */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Verbatim Clause Excerpt
              </label>
              <button
                type="button"
                onClick={() => handleCopy(activeEvidence.id, activeEvidence.excerpt)}
                className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium"
              >
                {copiedId === activeEvidence.id ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> Copy Excerpt
                  </>
                )}
              </button>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed overflow-x-auto border border-slate-800 shadow-inner">
              {activeEvidence.excerpt}
            </div>
          </div>

          {/* Action links */}
          <div className="pt-2">
            <a
              href={activeEvidence.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-semibold rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 border border-indigo-200 dark:border-indigo-800 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Source on Official BIS Portal</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

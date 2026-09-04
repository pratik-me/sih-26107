"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  ChatMessage,
  ChatSession,
  Citation,
  ConfidenceLevel,
  Evidence,
  IndianLanguage,
  UserRole,
} from "@bis/shared-types";
import { apiClient } from "@bis/api-client";
import {
  CitationBadge,
  ConfidenceBadge,
  EvidencePanel,
  LanguageSelector,
  SourceFreshnessBadge,
} from "@bis/ui";
import {
  Send,
  Plus,
  Trash2,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  Compass,
  Award,
  FlaskConical,
  Building2,
  FileText,
  Copy,
  Check,
  FileBarChart2,
} from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function ChatContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialRole =
    (searchParams.get("role") as UserRole) || UserRole.INDUSTRY;

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] =
    useState<string>("default-session");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<IndianLanguage>(
    IndianLanguage.EN,
  );
  const [activeEvidenceList, setActiveEvidenceList] = useState<Evidence[]>([]);
  const [activeEvidenceId, setActiveEvidenceId] = useState<
    string | undefined
  >();
  const [isEvidencePanelOpen, setIsEvidencePanelOpen] = useState(true);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial greeting if no messages
    if (messages.length === 0 && !initialQuery) {
      const welcomeMessage: ChatMessage = {
        id: "welcome-msg",
        sessionId: currentSessionId,
        role: "assistant",
        content: `Welcome to BIS IntelliGuide 👋\nI am your evidence-backed decision assistant for Indian Standards (IS), BIS certification schemes, testing clauses, laboratory accreditation, and hallmarking.\n\nWhat would you like to explore?\n- Product Compliance: "I manufacture stainless steel bottles. Which standard applies?"\n- Testing Requirements: "What are the routine tests required for TMT steel bars?"\n- Certification Guidance: "Do I need Compulsory Registration Scheme (CRS) for electronics?"\n- Hallmarking: "How do I verify a 6-digit HUID code on BIS Care App?"\n- Clause Explanation: "Explain IS 10500 Clause 4.2 in simple language."`,
        confidence: ConfidenceLevel.HIGH,
        suggestedFollowUps: [
          "Find standard for my product",
          "Do I need BIS certification?",
          "What tests are required?",
          "How to verify a gold hallmark?",
        ],
        createdAt: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Handle URL query parameter if passed from landing page
  useEffect(() => {
    if (initialQuery && messages.length <= 1) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [messages, isLoading]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    setInputQuery("");
    setIsLoading(true);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sessionId: currentSessionId,
      role: "user",
      content: textToSend,
      originalLanguage: selectedLanguage,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await apiClient.sendMessage({
        sessionId: currentSessionId,
        message: textToSend,
        roleMode: initialRole,
        language: selectedLanguage,
      });

      setMessages((prev) => [...prev, res.reply]);

      if (res.reply.evidence && res.reply.evidence.length > 0) {
        setActiveEvidenceList(res.reply.evidence);
        setActiveEvidenceId(res.reply.evidence[0].id);
        setIsEvidencePanelOpen(true);
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sessionId: currentSessionId,
        role: "assistant",
        content: `⚠️ **Unable to process query:** ${err.message || "Server connection issue. Please verify backend API status."}\n\nYou can also verify directly on the official BIS portal (https://www.services.bis.gov.in).`,
        confidence: ConfidenceLevel.LOW,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCitationClick = (citation: Citation) => {
    if (citation.evidenceId) {
      setActiveEvidenceId(citation.evidenceId);
      setIsEvidencePanelOpen(true);
    }
  };

  const handleFeedback = async (
    messageId: string,
    type: "HELPFUL" | "NOT_HELPFUL" | "REPORTED",
  ) => {
    try {
      await apiClient.submitFeedback({ messageId, feedback: type as any });
      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, feedback: type } : m)),
      );
    } catch {
      // ignore
    }
  };

  const handleCopyMessage = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(msgId);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const startNewChat = () => {
    const newId = `session-${Date.now()}`;
    setCurrentSessionId(newId);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sessionId: newId,
        role: "assistant",
        content: `New Session Started\nAsk any question regarding Indian Standards, testing, recognized laboratories, or certification schemes.`,
        confidence: ConfidenceLevel.HIGH,
        createdAt: new Date().toISOString(),
      },
    ]);
    setActiveEvidenceList([]);
    setActiveEvidenceId(undefined);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100dvh-105px)] overflow-hidden bg-slate-100 dark:bg-slate-950">
      {/* 1. LEFT SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shrink-0">
        <div className="p-3 border-b border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={startNewChat}
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Chat Session</span>
          </button>
        </div>

        {/* Quick Tools Navigation */}
        <div className="p-3 border-b border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2">
            BIS Specialized Tools
          </span>
          <Link
            href="/standards/recommend"
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-blue-600" />
            <span>Find My Standard</span>
          </Link>
          <Link
            href="/certification"
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Certification Schemes</span>
          </Link>
          <Link
            href="/testing"
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <FlaskConical className="w-3.5 h-3.5 text-indigo-600" />
            <span>Testing Requirements</span>
          </Link>
          <Link
            href="/laboratories"
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Find Recognized Lab</span>
          </Link>
          <Link
            href="/reports"
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <FileBarChart2 className="w-3.5 h-3.5 text-rose-600" />
            <span>Generate Compliance Report</span>
          </Link>
        </div>

        {/* Sessions list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2">
            Active Workspace
          </span>
          <div className="p-2.5 rounded-lg bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs font-semibold text-blue-900 dark:text-blue-200 truncate">
            Current Investigation
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Grounded Retrieval Active</span>
          </div>
          <p className="text-[10px]">
            Answers verified against published Gazette notifications.
          </p>
        </div>
      </aside>

      {/* 2. CENTER CONVERSATION AREA */}
      <section className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-hidden relative min-h-0">
        {/* Top Chat Bar */}
        <div className="px-4 py-2.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                BIS IntelliGuide Conversation
              </h2>
              <span className="text-[10px] text-slate-500">
                Mode: {initialRole}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsEvidencePanelOpen(!isEvidencePanelOpen)}
              className={`text-xs px-2.5 py-1 rounded font-medium border transition-colors ${
                isEvidencePanelOpen
                  ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"
                  : "bg-white text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              Evidence Panel ({activeEvidenceList.length})
            </button>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 min-h-0">
          {messages.map((msg, index) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.id || index}
                className={`flex gap-3 max-w-4xl mx-auto ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-lg bg-blue-700 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`flex flex-col space-y-2 max-w-[85%] rounded-2xl p-4 shadow-sm ${
                    isUser
                      ? "bg-blue-700 text-white rounded-tr-none"
                      : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none"
                  }`}
                >
                  {/* Assistant Meta Header */}
                  {!isUser && (
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-1">
                      <div className="flex items-center gap-2">
                        {msg.confidence && (
                          <ConfidenceBadge level={msg.confidence} />
                        )}
                        {msg.sourceFreshnessWarning && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-medium">
                            Source Notice
                          </span>
                        )}
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopyMessage(msg.id, msg.content)
                            }
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 inline-flex items-center justify-center"
                          >
                            {copiedMsgId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="px-2 py-0.5 text-[11px] rounded bg-gray-500 text-white shadow-sm">
                          <p>
                            {copiedMsgId === msg.id ? "Copied" : "Copy answer"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  )}

                  {/* Message Body */}
                  <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line prose dark:prose-invert max-w-none">
                    {msg.content}
                  </div>

                  {/* Citations Badges if available */}
                  {!isUser && msg.citations && msg.citations.length > 0 && (
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Traceable Authoritative Citations:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {msg.citations.map((cite, cIdx) => (
                          <CitationBadge
                            key={cIdx}
                            citation={cite}
                            onClick={handleCitationClick}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggested follow-up prompt pills */}
                  {!isUser &&
                    msg.suggestedFollowUps &&
                    msg.suggestedFollowUps.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {msg.suggestedFollowUps.map((followUp, fIdx) => (
                          <button
                            key={fIdx}
                            type="button"
                            onClick={() => handleSendMessage(followUp)}
                            className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950/60 dark:hover:text-blue-300 text-slate-600 dark:text-slate-300 transition-colors text-left"
                          >
                            {followUp} →
                          </button>
                        ))}
                      </div>
                    )}

                  {/* Assistant Footer Feedback */}
                  {!isUser && (
                    <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                      <span>
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              onClick={() => handleFeedback(msg.id, "HELPFUL")}
                              className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 ${
                                msg.feedback === "HELPFUL"
                                  ? "text-emerald-600"
                                  : ""
                              }`}
                            >
                              <ThumbsUp className="w-3.5 h-3.5" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="px-2 py-0.5 text-[11px] rounded bg-gray-500 text-white shadow-sm" sideOffset={7} side="bottom">
                            <p>
                              Helpful response
                            </p>
                          </TooltipContent>
                        </Tooltip>

                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                          type="button"
                          onClick={() => handleFeedback(msg.id, "NOT_HELPFUL")}
                          className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 ${
                            msg.feedback === "NOT_HELPFUL"
                              ? "text-rose-600"
                              : ""
                          }`}
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                          </TooltipTrigger>
                          <TooltipContent className="px-2 py-0.5 text-[11px] rounded bg-gray-500 text-white shadow-sm" sideOffset={7} side="bottom">
                            <p>
                              Not helpful
                            </p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                          type="button"
                          onClick={() => handleFeedback(msg.id, "REPORTED")}
                          className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 ${
                            msg.feedback === "REPORTED" ? "text-amber-600" : ""
                          }`}
                        >
                          <Flag className="w-3.5 h-3.5" />
                        </button>
                          </TooltipTrigger>
                          <TooltipContent className="px-2 py-0.5 text-[11px] rounded bg-gray-500 text-white shadow-sm" sideOffset={7} side="bottom">
                            <p>
                              Report inaccurate citation
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 max-w-4xl mx-auto items-start">
              <div className="w-7 h-7 rounded-lg bg-blue-700 text-white flex items-center justify-center shrink-0 shadow-sm animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 dark:text-blue-400">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Searching BIS Repository & Retrieving Clauses...</span>
                </div>
                <div className="w-48 h-2 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input Form */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative flex items-center bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-300 dark:border-slate-700 focus-within:border-blue-600 transition-all p-1.5">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask about standards, certification, test methods, lab credentials, or clauses..."
                disabled={isLoading}
                className="w-full px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-slate-100 bg-transparent focus:outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={isLoading || !inputQuery.trim()}
                className="p-2 rounded-lg bg-blue-700 hover:bg-blue-800 disabled:opacity-40 text-white shadow-sm transition-all"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between px-2 pt-2 text-[10px] text-slate-400">
              <span>
                Grounding: Strict adherence to Indian Standards. Never
                fabricates requirements.
              </span>
              <span>BIS Act 2016 Compliant</span>
            </div>
          </form>
        </div>
      </section>

      {/* 3. RIGHT EVIDENCE PANEL */}
      {isEvidencePanelOpen && (
        <>
          {/* Mobile Backdrop */}
          <div
            onClick={() => setIsEvidencePanelOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />

          <aside className="fixed inset-x-0 bottom-0 z-50 h-[65vh] rounded-t-2xl shadow-xl lg:static lg:h-full lg:w-80 xl:w-96 lg:rounded-none lg:shadow-none lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto transition-transform">
            <div className="lg:hidden flex justify-center py-2">
              <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>
            <EvidencePanel
              evidenceList={activeEvidenceList}
              activeEvidenceId={activeEvidenceId}
              onSelectEvidence={setActiveEvidenceId}
              onClose={() => setIsEvidencePanelOpen(false)}
            />
          </aside>
        </>
      )}
    </div>
  );
}

export default function ChatWorkspacePage() {
  return (
    <React.Suspense
      fallback={
        <div className="p-8 text-center text-xs text-slate-500">
          Loading BIS IntelliGuide Workspace...
        </div>
      }
    >
      <ChatContent />
    </React.Suspense>
  );
}

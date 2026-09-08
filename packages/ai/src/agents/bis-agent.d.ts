import { AgentExecutionResponse, Evidence, IndianLanguage, QueryIntent, ToolName } from '@bis/shared-types';
import { ILLMProvider } from '../providers/llm.provider';
export interface BISAgentToolsHandler {
    executeTool(tool: ToolName, args: Record<string, unknown>): Promise<{
        data: unknown;
        evidence: Evidence[];
    }>;
}
export declare class BISSaarthiAgent {
    private llmProvider;
    private toolsHandler?;
    private citationBuilder;
    private groundingValidator;
    private languageEngine;
    constructor(llmProvider: ILLMProvider, toolsHandler?: BISAgentToolsHandler | undefined);
    /**
     * Classify user query intent into one of the specialized BIS domains.
     */
    classifyIntent(query: string): QueryIntent;
    /**
     * Main multi-step AI Agent Execution Loop
     */
    execute(query: string, preferredLanguage?: IndianLanguage): Promise<AgentExecutionResponse>;
}
//# sourceMappingURL=bis-agent.d.ts.map
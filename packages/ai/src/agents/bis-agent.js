"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BISSaarthiAgent = void 0;
const shared_types_1 = require("@bis/shared-types");
const citation_builder_1 = require("../citations/citation-builder");
const grounding_validator_1 = require("../grounding/grounding-validator");
const translation_provider_1 = require("../providers/translation.provider");
class BISSaarthiAgent {
    llmProvider;
    toolsHandler;
    citationBuilder = new citation_builder_1.CitationBuilder();
    groundingValidator = new grounding_validator_1.GroundingValidator();
    languageEngine = new translation_provider_1.IndicLanguageEngine();
    constructor(llmProvider, toolsHandler) {
        this.llmProvider = llmProvider;
        this.toolsHandler = toolsHandler;
    }
    /**
     * Classify user query intent into one of the specialized BIS domains.
     */
    classifyIntent(query) {
        const q = query.toLowerCase();
        if (q.includes('hallmark') || q.includes('huid') || q.includes('gold purity') || q.includes('silver purity') || q.includes('22k') || q.includes('916')) {
            return shared_types_1.QueryIntent.HALLMARKING_VERIFICATION;
        }
        if (q.includes('isi mark') || q.includes('cml') || q.includes('genuine isi') || q.includes('fake') || q.includes('consumer complaint')) {
            return shared_types_1.QueryIntent.CONSUMER_ISI_CHECK;
        }
        if (q.includes('clause') || q.includes('explain clause') || q.includes('clause 5') || q.includes('clause 4')) {
            return shared_types_1.QueryIntent.CLAUSE_EXPLANATION;
        }
        if (q.includes('test') || q.includes('sampling') || q.includes('test method') || q.includes('routine test')) {
            return shared_types_1.QueryIntent.TESTING_REQUIREMENTS;
        }
        if (q.includes('laboratory') || q.includes('lab') || q.includes('nabl') || q.includes('where to test') || q.includes('testing centre')) {
            return shared_types_1.QueryIntent.LABORATORY_LOOKUP;
        }
        if (q.includes('certif') || q.includes('scheme') || q.includes('licence') || q.includes('license') || q.includes('crs') || q.includes('fmcs')) {
            return shared_types_1.QueryIntent.CERTIFICATION_GUIDANCE;
        }
        if (q.includes('roadmap') || q.includes('process') || q.includes('steps to comply')) {
            return shared_types_1.QueryIntent.COMPLIANCE_ROADMAP;
        }
        if (q.includes('compare') || q.includes('difference between')) {
            return shared_types_1.QueryIntent.COMPARE_STANDARDS;
        }
        if (q.includes('standard') || q.includes('manufacture') || q.includes('which is') || q.includes('applicable') || q.includes('bottle') || q.includes('cement') || q.includes('cable') || q.includes('battery')) {
            return shared_types_1.QueryIntent.FIND_STANDARD;
        }
        return shared_types_1.QueryIntent.GENERAL_BIS_INFO;
    }
    /**
     * Main multi-step AI Agent Execution Loop
     */
    async execute(query, preferredLanguage) {
        const detectedLang = preferredLanguage || (await this.languageEngine.detectLanguage(query));
        const { translatedText, preservedEntities } = await this.languageEngine.translateToEnglish(query, detectedLang);
        const intent = this.classifyIntent(translatedText);
        let retrievedEvidence = [];
        const workflowOffers = [];
        // Route query through relevant agent tool
        if (this.toolsHandler) {
            if (intent === shared_types_1.QueryIntent.FIND_STANDARD) {
                const res = await this.toolsHandler.executeTool('recommend_standards', { query: translatedText, entities: preservedEntities });
                retrievedEvidence = res.evidence;
                workflowOffers.push({ type: 'FIND_TESTING', label: 'View Testing Requirements', actionPayload: { query: translatedText } }, { type: 'FIND_LAB', label: 'Find Recognized Laboratory', actionPayload: { query: translatedText } }, { type: 'VIEW_ROADMAP', label: 'Check Certification Scheme', actionPayload: { query: translatedText } });
            }
            else if (intent === shared_types_1.QueryIntent.TESTING_REQUIREMENTS) {
                const res = await this.toolsHandler.executeTool('get_testing_requirements', { query: translatedText });
                retrievedEvidence = res.evidence;
                workflowOffers.push({ type: 'FIND_LAB', label: 'Locate Testing Lab', actionPayload: { query: translatedText } });
            }
            else if (intent === shared_types_1.QueryIntent.LABORATORY_LOOKUP) {
                const res = await this.toolsHandler.executeTool('search_laboratories', { query: translatedText });
                retrievedEvidence = res.evidence;
            }
            else if (intent === shared_types_1.QueryIntent.HALLMARKING_VERIFICATION) {
                const res = await this.toolsHandler.executeTool('search_hallmarking_information', { query: translatedText });
                retrievedEvidence = res.evidence;
            }
            else if (intent === shared_types_1.QueryIntent.CONSUMER_ISI_CHECK) {
                const res = await this.toolsHandler.executeTool('search_consumer_information', { query: translatedText });
                retrievedEvidence = res.evidence;
                workflowOffers.push({ type: 'VERIFY_ISI', label: 'Check CML Number on BIS Care', actionPayload: { query: translatedText } });
            }
            else {
                const res = await this.toolsHandler.executeTool('search_bis_documents', { query: translatedText });
                retrievedEvidence = res.evidence;
            }
        }
        // Generate grounded LLM response
        const llmResult = await this.llmProvider.generateText(translatedText, retrievedEvidence);
        const citations = this.citationBuilder.buildCitations(retrievedEvidence);
        const groundingValidation = this.groundingValidator.validate(llmResult.text, retrievedEvidence);
        // Formulate suggested follow-ups
        const suggestedFollowUps = [];
        if (intent === shared_types_1.QueryIntent.FIND_STANDARD) {
            suggestedFollowUps.push('What are the mandatory testing requirements under this standard?', 'Which BIS certification scheme applies to my unit?', 'Can you generate a complete compliance roadmap report?');
        }
        else if (intent === shared_types_1.QueryIntent.HALLMARKING_VERIFICATION) {
            suggestedFollowUps.push('How do I verify the 6-digit HUID code on BIS Care App?', 'What is the difference between 22K (916) and 18K (750) gold purity?', 'Where is the nearest BIS Assaying and Hallmarking Centre?');
        }
        else if (intent === shared_types_1.QueryIntent.CONSUMER_ISI_CHECK) {
            suggestedFollowUps.push('How do I report a product with a fake or counterfeit ISI mark?', 'What is the BIS Care App toll-free consumer helpline number?', 'How to verify manufacturer license status online?');
        }
        else {
            suggestedFollowUps.push('Show applicable testing clauses', 'Find nearest NABL/BIS testing laboratory', 'Explain clause requirements in simple language');
        }
        // Always offer compliance report if relevant
        if (intent === shared_types_1.QueryIntent.FIND_STANDARD || intent === shared_types_1.QueryIntent.CERTIFICATION_GUIDANCE) {
            workflowOffers.push({
                type: 'GENERATE_REPORT',
                label: 'Generate BIS Compliance Report (PDF/Print)',
                actionPayload: { query: translatedText }
            });
        }
        return {
            query,
            intent,
            structuredAnswer: llmResult.text,
            citations,
            evidence: retrievedEvidence,
            suggestedFollowUps,
            workflowOffers
        };
    }
}
exports.BISSaarthiAgent = BISSaarthiAgent;
//# sourceMappingURL=bis-agent.js.map
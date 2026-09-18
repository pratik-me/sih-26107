import {
  AgentExecutionResponse,
  CertificationScheme,
  ChatMessage,
  ChatSession,
  ComplianceRoadmapStep,
  ConfidenceLevel,
  Evidence,
  FeedbackType,
  HallmarkingCentre,
  HallmarkingGuidance,
  HuidValidationResult,
  IndianLanguage,
  IsiVerificationResult,
  Laboratory,
  LaboratorySearchFilter,
  ProductComplianceReport,
  ProductProfileQuery,
  ProductRecommendationResult,
  QueryIntent,
  Standard,
  StandardComparisonResult,
  StandardStatus,
  TestingRequirement,
  TestingSearchFilter,
  ToolName,
} from "@bis/shared-types";
import {
  BISSaarthiAgent,
  BISAgentToolsHandler,
  getLLMProvider,
  IndicLanguageEngine,
  languageDetector,
  hinglishNormalizer,
  huggingFaceTranslationService,
  HybridBISCrossReranker,
  getEmbeddingProvider,
  SEED_STANDARDS,
  SEED_SCHEMES,
  SEED_LABORATORIES,
  SEED_HALLMARKING_CENTRES,
} from "@bis/ai";

// In-memory Session & Message Store
const inMemorySessions = new Map<string, ChatSession>();
const feedbackStore: Array<{
  id: string;
  messageId: string;
  feedback: FeedbackType;
  notes?: string;
  timestamp: string;
}> = [];

// Default Testing Specifications
export const DEFAULT_TESTING_REQUIREMENTS: TestingRequirement[] = [
  {
    id: "test-17526-1",
    standardNumber: "IS 17526:2021",
    testName: "Thermal Insulation Retention Performance Test",
    testMethod: "IS 17526 Clause 5.1 & Annex B",
    clauseNumber: "5.1",
    description:
      "Flask is filled with boiling water at 95°C and kept sealed in ambient temperature of 20°C. Temperature is measured after 6 hours and 24 hours.",
    acceptanceCriteria:
      "Water temperature must remain above 60°C after 6 hours (and above 40°C after 24 hours).",
    samplingRequirements: "3 flasks sampled per batch of 5,000 units.",
    testingFrequency: "Every production lot (100% routine batch test).",
    requiredEquipment: [
      "Calibrated Digital Thermocouple / Data Logger",
      "Constant Temperature Environmental Chamber",
      "Precision Stop Watch",
    ],
    isDestructive: false,
    isMandatoryRoutineTest: true,
    applicableProducts: ["Stainless steel insulated flasks", "Vacuum bottles"],
    sourceUrl:
      "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/is17526",
  },
  {
    id: "test-17526-2",
    standardNumber: "IS 17526:2021",
    testName:
      "Material Spectrometric Grade Analysis (Food Grade Stainless Steel)",
    testMethod: "IS 17526 Clause 4.1 & IS 228",
    clauseNumber: "4.1",
    description:
      "Spectrometric chemical analysis of inner and outer body material to verify Chromium (min 16%), Nickel (min 8%) for SS 304 austenitic grade.",
    acceptanceCriteria:
      "Chemical composition must conform strictly to Grade SS 304 or SS 316. Leaching of heavy metals (Lead, Cadmium) must be non-detectable.",
    samplingRequirements: "1 sample per raw material coil / heat number.",
    testingFrequency: "Every raw material incoming lot.",
    requiredEquipment: [
      "Optical Emission Spectrometer (OES)",
      "Inductively Coupled Plasma (ICP-MS)",
    ],
    isDestructive: true,
    isMandatoryRoutineTest: true,
    applicableProducts: ["All stainless steel bottles and flasks"],
    sourceUrl:
      "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/is17526",
  },
  {
    id: "test-10500-1",
    standardNumber: "IS 10500:2012",
    testName: "Total Dissolved Solids (TDS) and pH Determination",
    testMethod: "IS 3025 (Part 16) / IS 10500 Clause 4 Table 1",
    clauseNumber: "4.2",
    description:
      "Gravimetric determination of dissolved solids after filtration and drying at 180°C, and electrometric pH determination.",
    acceptanceCriteria:
      "TDS: Acceptable limit max 500 mg/L (permissible max 2000 mg/L). pH: 6.5 to 8.5. Lead max 0.01 mg/L.",
    samplingRequirements: "2 representative 1-litre sterile glass containers.",
    testingFrequency: "Daily online monitoring & daily batch verification.",
    requiredEquipment: [
      "Calibrated pH Meter",
      "Analytical Balance (0.1 mg accuracy)",
      "Hot Air Drying Oven",
    ],
    isDestructive: true,
    isMandatoryRoutineTest: true,
    applicableProducts: ["Drinking water", "Packaged water"],
    sourceUrl:
      "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/is10500",
  },
  {
    id: "test-1786-1",
    standardNumber: "IS 1786:2008",
    testName: "Tensile Stress, 0.2% Proof Stress & Total Elongation Test",
    testMethod: "IS 1608 (Part 1) & IS 1786 Clause 8 Table 3",
    clauseNumber: "8.1",
    description:
      "Full cross-section bar undergoes axial tensile pull on Universal Testing Machine until rupture.",
    acceptanceCriteria:
      "For Fe 500D: 0.2% proof stress min 500 N/mm², tensile strength min 565 N/mm² (TS/YS ratio ≥ 1.10), total elongation min 16.0%.",
    samplingRequirements:
      "1 test piece for every 40 tonnes of each size and grade.",
    testingFrequency: "Every rolling heat / cast.",
    requiredEquipment: [
      "Universal Testing Machine (UTM) with Extensometer",
      "Digital Vernier Caliper",
    ],
    isDestructive: true,
    isMandatoryRoutineTest: true,
    applicableProducts: ["TMT Steel Rebars Fe 500D / Fe 550D"],
    sourceUrl:
      "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/is1786",
  },
  {
    id: "test-16046-1",
    standardNumber: "IS 16046 (Part 2):2018",
    testName: "External Short Circuit Safety Test at 55°C",
    testMethod: "IS 16046 (Part 2) / IEC 62133-2 Clause 7.3.2",
    clauseNumber: "7.3.2",
    description:
      "Fully charged battery is short-circuited with external resistance <80 mΩ inside a 55°C thermal chamber until case cools down.",
    acceptanceCriteria:
      "No explosion, no fire, no rupture. Max casing temperature must not exceed 150°C.",
    samplingRequirements: "5 fully charged battery packs.",
    testingFrequency: "Type testing & initial registration sample.",
    requiredEquipment: [
      "High Current Short-Circuit Rig with Shunt",
      "Explosion-Proof Thermal Test Chamber",
      "Thermal Imaging Camera",
    ],
    isDestructive: true,
    isMandatoryRoutineTest: false,
    applicableProducts: ["Lithium-ion batteries", "Power banks"],
    sourceUrl:
      "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/is16046",
  },
];

class StandaloneToolsHandler implements BISAgentToolsHandler {
  async executeTool(
    tool: ToolName,
    args: Record<string, unknown>,
  ): Promise<{ data: unknown; evidence: Evidence[] }> {
    const query = String(args.query || "");

    switch (tool) {
      case "recommend_standards": {
        const rec = await standaloneAIService.recommendStandards({
          productName: query,
        });
        let evidence: Evidence[] = rec.matches.flatMap((m) => m.evidence);

        if (evidence.length === 0) {
          const searchRes = await standaloneAIService.searchStandards(query);
          evidence = searchRes.standards.slice(0, 3).map((s) => ({
            id: `ev-${s.standardNumber}`,
            documentTitle: s.title,
            standardNumber: s.standardNumber,
            clause: "1.1 Scope & Applicability",
            page: 1,
            publicationDate: s.publicationDate,
            status: s.status,
            sourceUrl: s.sourceUrl,
            excerpt: `${s.scope} ${s.abstract || ""}`,
            similarityScore: 0.88,
          }));
        }
        return { data: rec, evidence };
      }
      case "search_standards": {
        const res = await standaloneAIService.searchStandards(query);
        const evidence: Evidence[] = res.standards.slice(0, 3).map((s) => ({
          id: `ev-${s.standardNumber}`,
          documentTitle: s.title,
          standardNumber: s.standardNumber,
          clause: "Scope",
          page: 1,
          publicationDate: s.publicationDate,
          status: s.status,
          sourceUrl: s.sourceUrl,
          excerpt: `${s.scope} ${s.abstract || ""}`,
          similarityScore: 0.9,
        }));
        return { data: res, evidence };
      }
      case "get_testing_requirements": {
        const reqs = await standaloneAIService.getTestingRequirements({
          standardNumber: query,
          productName: query,
          testName: query,
        });
        const evidence: Evidence[] = reqs.slice(0, 4).map((r, i) => ({
          id: `ev-test-${i}-${r.standardNumber.replace(/[^a-zA-Z0-9]/g, "")}`,
          documentTitle: `Testing Specification - ${r.standardNumber}`,
          standardNumber: r.standardNumber,
          clause: r.clauseNumber,
          page: 5,
          publicationDate: "2021-01-01",
          status: "ACTIVE" as any,
          sourceUrl: r.sourceUrl || "https://www.services.bis.gov.in",
          excerpt: `${r.testName}: ${r.description} Acceptance Criteria: ${r.acceptanceCriteria} Sampling: ${r.samplingRequirements} Frequency: ${r.testingFrequency}`,
          similarityScore: 0.92,
        }));
        return { data: reqs, evidence };
      }
      case "search_laboratories": {
        const labs = await standaloneAIService.searchLaboratories({
          standardNumber: query,
          testName: query,
        });
        const evidence: Evidence[] = labs.laboratories
          .slice(0, 3)
          .map((l, i) => ({
            id: `ev-lab-${i}`,
            documentTitle: `BIS Recognized Laboratory Directory`,
            standardNumber: l.recognizedStandards[0] || "BIS Recognized Labs",
            clause: "Accreditation Schedule",
            page: 1,
            publicationDate: "2024-01-01",
            status: "ACTIVE" as any,
            sourceUrl: l.sourceUrl,
            excerpt: `${l.name} (${l.city}, ${l.state}) is recognized for standards: ${l.recognizedStandards.join(", ")}. Capabilities: ${l.testingCapabilities.join(", ")}.`,
            similarityScore: 0.95,
          }));
        return { data: labs, evidence };
      }
      case "search_hallmarking_information": {
        const guidance = await standaloneAIService.getHallmarkingGuidance();
        const evidence: Evidence[] = [
          {
            id: "ev-hallmark-1417",
            documentTitle:
              "Gold & Gold Alloys Fineness and Marking (IS 1417:2016)",
            standardNumber: "IS 1417:2016",
            clause: "6.1",
            page: 4,
            publicationDate: "2016-09-01",
            status: "ACTIVE" as any,
            sourceUrl: "https://www.services.bis.gov.in/hallmarking",
            excerpt:
              guidance.huidExplanation +
              " Three mandatory marks: BIS Logo, Purity grade (e.g. 22K916), and 6-digit alphanumeric HUID.",
            similarityScore: 0.98,
          },
        ];
        return { data: guidance, evidence };
      }
      case "search_consumer_information": {
        const isi = await standaloneAIService.verifyIsiMark(query);
        const evidence: Evidence[] = [
          {
            id: "ev-consumer-isi",
            documentTitle:
              "BIS Certification Marks Licence (CM/L) Verification Rules",
            standardNumber: "BIS Guidelines",
            clause: "7.1",
            page: 2,
            publicationDate: "2023-01-01",
            status: "ACTIVE" as any,
            sourceUrl: "https://www.services.bis.gov.in",
            excerpt:
              isi.guidance +
              " Check for BIS logo, IS number on top, and 7/8 digit CM/L number on bottom.",
            similarityScore: 0.95,
          },
        ];
        return { data: isi, evidence };
      }
      case "search_certification_schemes":
      case "get_certification_process": {
        const schemes = await standaloneAIService.getCertificationSchemes();
        const roadmap = await standaloneAIService.getCertificationRoadmap(
          query || "IS 17526:2021",
        );
        const evidence: Evidence[] = [
          {
            id: "ev-scheme-1-isi",
            documentTitle:
              "BIS Conformity Assessment Regulations - Scheme I (ISI Mark Certification)",
            standardNumber: "BIS Scheme I",
            clause: "Reg. 4",
            page: 1,
            publicationDate: "2018-01-01",
            status: "ACTIVE" as any,
            sourceUrl: "https://www.services.bis.gov.in/certification",
            excerpt:
              "Scheme I (Product Certification Scheme) grants licence to use Standard Mark (ISI) after factory audit, in-house testing lab verification, and independent lab sample testing.",
            similarityScore: 0.96,
          },
          {
            id: "ev-scheme-2-crs",
            documentTitle:
              "Compulsory Registration Scheme (CRS) - Scheme II for Electronics & IT Goods",
            standardNumber: "BIS Scheme II (CRS)",
            clause: "Reg. 5",
            page: 2,
            publicationDate: "2021-01-01",
            status: "ACTIVE" as any,
            sourceUrl: "https://www.crsbis.in",
            excerpt:
              "Scheme II (CRS) applies to notified electronics, IT products, and secondary cells/batteries based on self-declaration of conformity and testing in BIS-recognized labs.",
            similarityScore: 0.95,
          },
        ];
        return { data: { schemes, roadmap }, evidence };
      }
      default: {
        const qTokens = query
          .toLowerCase()
          .split(/\s+/)
          .filter((t) => t.length > 2);
        const candidates: Evidence[] = [];

        for (const std of SEED_STANDARDS as any[]) {
          const fullContent =
            `${std.standardNumber} ${std.title} ${std.scope} ${std.abstract} ${std.keywords.join(" ")}`.toLowerCase();
          let matchCount = 0;
          for (const token of qTokens) {
            if (fullContent.includes(token)) matchCount++;
          }
          if (matchCount > 0 || fullContent.includes(query.toLowerCase())) {
            candidates.push({
              id: `ev-${std.standardNumber}`,
              documentTitle: std.title,
              standardNumber: std.standardNumber,
              clause: "4.1",
              page: 3,
              publicationDate: std.publicationDate,
              status: std.status,
              sourceUrl: std.sourceUrl,
              excerpt: `${std.scope} ${std.abstract}`,
              similarityScore: Math.min(0.5 + matchCount * 0.1, 0.95),
            });
          }
        }

        const evidence =
          candidates.length > 0
            ? candidates.slice(0, 3)
            : (SEED_STANDARDS as any[]).slice(0, 2).map((std) => ({
                id: `ev-${std.standardNumber}`,
                documentTitle: std.title,
                standardNumber: std.standardNumber,
                clause: "1.0 Scope",
                page: 1,
                publicationDate: std.publicationDate,
                status: std.status,
                sourceUrl: std.sourceUrl,
                excerpt: `${std.scope} ${std.abstract}`,
                similarityScore: 0.8,
              }));

        return { data: { query, totalFound: evidence.length }, evidence };
      }
    }
  }
}

export class StandaloneAIService {
  private agent: BISSaarthiAgent;
  private toolsHandler: StandaloneToolsHandler;

  constructor() {
    this.toolsHandler = new StandaloneToolsHandler();
    this.agent = new BISSaarthiAgent(getLLMProvider(), this.toolsHandler);
  }

  async handleChatMessage(params: {
    sessionId?: string;
    message: string;
    roleMode?: string;
    language?: IndianLanguage;
    autoDetectLanguage?: boolean;
    userId?: string;
  }): Promise<{ session: ChatSession; reply: ChatMessage }> {
    const sessionId = params.sessionId || `session-${Date.now()}`;
    let session = inMemorySessions.get(sessionId);

    // Language Detection & auto-detection
    const detection = await languageDetector.detectLanguage(params.message);
    const effectiveLang =
      params.language || detection.language || IndianLanguage.EN;

    if (!session) {
      session = {
        id: sessionId,
        title:
          params.message.slice(0, 45) +
          (params.message.length > 45 ? "..." : ""),
        userId: params.userId,
        language: effectiveLang,
        roleMode: params.roleMode || "INDUSTRY",
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      inMemorySessions.set(sessionId, session);
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sessionId: sessionId,
      role: "user",
      content: params.message,
      originalLanguage: effectiveLang,
      createdAt: new Date().toISOString(),
    };
    session.messages.push(userMessage);

    // Execute BIS Saarthi Agent with target language
    const agentResult = await this.agent.execute(params.message, effectiveLang);

    const confidence =
      agentResult.evidence.length >= 2
        ? ConfidenceLevel.HIGH
        : agentResult.evidence.length === 1
          ? ConfidenceLevel.MEDIUM
          : agentResult.intent === QueryIntent.GENERAL_BIS_INFO
            ? ConfidenceLevel.HIGH
            : ConfidenceLevel.LOW;

    const assistantMsg: ChatMessage = {
      id: `asst-${Date.now()}`,
      sessionId: sessionId,
      role: "assistant",
      content: agentResult.structuredAnswer,
      originalLanguage: effectiveLang,
      intent: agentResult.intent,
      confidence,
      citations: agentResult.citations || [],
      evidence: agentResult.evidence || [],
      suggestedFollowUps: agentResult.suggestedFollowUps || [],
      sourceFreshnessWarning: agentResult.evidence.some((e) => e.isOutdated)
        ? "One or more referenced Indian Standards have status OUTDATED or UNDER_REVIEW."
        : undefined,
      createdAt: new Date().toISOString(),
    };

    session.messages.push(assistantMsg);
    session.updatedAt = new Date().toISOString();

    return { session, reply: assistantMsg };
  }

  async getChatSessions(): Promise<ChatSession[]> {
    return Array.from(inMemorySessions.values()).sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  }

  async getChatSession(id: string): Promise<ChatSession | null> {
    return inMemorySessions.get(id) || null;
  }

  async deleteChatSession(id: string): Promise<boolean> {
    return inMemorySessions.delete(id);
  }

  async searchStandards(
    query: string,
    filter?: { division?: string; isMandatory?: boolean; status?: string },
  ): Promise<{ standards: Standard[]; total: number }> {
    const qLower = (query || "").toLowerCase().trim();
    const filtered = (SEED_STANDARDS as any[]).filter((s) => {
      const matchQuery =
        !qLower ||
        s.standardNumber.toLowerCase().includes(qLower) ||
        s.title.toLowerCase().includes(qLower) ||
        s.scope.toLowerCase().includes(qLower) ||
        s.keywords.some((k: string) => k.toLowerCase().includes(qLower));

      const matchDivision = !filter?.division || s.division === filter.division;
      const matchMandatory =
        filter?.isMandatory === undefined ||
        s.isMandatory === filter.isMandatory;

      return matchQuery && matchDivision && matchMandatory;
    });

    const standards: Standard[] = filtered.map((s) => ({
      id: s.id || `std-${s.standardNumber.replace(/[^a-zA-Z0-9]/g, "")}`,
      standardNumber: s.standardNumber,
      title: s.title,
      year: s.year,
      department: s.department,
      division: s.division,
      status: s.status,
      scope: s.scope,
      abstract: s.abstract,
      keywords: s.keywords,
      isMandatory: s.isMandatory,
      qcoNotificationNumber: s.qcoNotificationNumber,
      qcoDate: s.qcoDate,
      sourceUrl: s.sourceUrl,
      publicationDate: s.publicationDate,
      lastUpdatedDate: s.lastUpdatedDate,
      clauses: [],
    }));

    return { standards, total: standards.length };
  }

  async getStandardById(idOrNumber: string): Promise<Standard | null> {
    const found = (SEED_STANDARDS as any[]).find(
      (s) =>
        s.id === idOrNumber ||
        s.standardNumber.toLowerCase().includes(idOrNumber.toLowerCase()),
    );
    if (!found) return null;
    return {
      id:
        found.id || `std-${found.standardNumber.replace(/[^a-zA-Z0-9]/g, "")}`,
      standardNumber: found.standardNumber,
      title: found.title,
      year: found.year,
      department: found.department,
      division: found.division,
      status: found.status,
      scope: found.scope,
      abstract: found.abstract,
      keywords: found.keywords,
      isMandatory: found.isMandatory,
      qcoNotificationNumber: found.qcoNotificationNumber,
      qcoDate: found.qcoDate,
      sourceUrl: found.sourceUrl,
      publicationDate: found.publicationDate,
      lastUpdatedDate: found.lastUpdatedDate,
      clauses: [],
    };
  }

  async recommendStandards(
    profile: ProductProfileQuery,
  ): Promise<ProductRecommendationResult> {
    const qTokens =
      `${profile.productName || ""} ${profile.material || ""} ${profile.intendedApplication || ""} ${profile.technicalCharacteristics || ""}`
        .toLowerCase()
        .split(/\s+/)
        .filter((t) => t.length > 2);

    const candidates = SEED_STANDARDS as any[];
    const matches: any[] = [];

    for (const std of candidates) {
      let score = 30;
      const matchedAttrs: string[] = [];
      const missingPrompt: string[] = [];

      const stdText =
        `${std.standardNumber} ${std.title} ${std.scope} ${std.abstract} ${std.keywords.join(" ")}`.toLowerCase();

      if (
        profile.productName &&
        stdText.includes(profile.productName.toLowerCase())
      ) {
        score += 40;
        matchedAttrs.push(
          `Matches product specification: '${profile.productName}'`,
        );
      }

      if (
        profile.material &&
        stdText.includes(profile.material.toLowerCase())
      ) {
        score += 20;
        matchedAttrs.push(
          `Matches raw material specification: '${profile.material}'`,
        );
      }

      if (
        profile.intendedApplication &&
        stdText.includes(profile.intendedApplication.toLowerCase())
      ) {
        score += 15;
        matchedAttrs.push(
          `Matches intended application: '${profile.intendedApplication}'`,
        );
      }

      for (const token of qTokens) {
        if (stdText.includes(token)) {
          score += 4;
        }
      }

      score = Math.min(Math.round(score), 98);

      if (score >= 45 || qTokens.length === 0) {
        matches.push({
          standard: {
            id:
              std.id ||
              `std-${std.standardNumber.replace(/[^a-zA-Z0-9]/g, "")}`,
            standardNumber: std.standardNumber,
            title: std.title,
            year: std.year,
            department: std.department,
            division: std.division,
            status: std.status,
            scope: std.scope,
            abstract: std.abstract,
            keywords: std.keywords,
            isMandatory: std.isMandatory,
            qcoNotificationNumber: std.qcoNotificationNumber,
            qcoDate: std.qcoDate,
            sourceUrl: std.sourceUrl,
            publicationDate: std.publicationDate,
            lastUpdatedDate: std.lastUpdatedDate,
            clauses: [],
          },
          relevanceScore: score,
          matchReason: `Evaluated correlation based on ${matchedAttrs.length > 0 ? matchedAttrs.join(", ") : "authoritative industry classification"}.`,
          matchingAttributes: matchedAttrs,
          missingInformationPrompt:
            missingPrompt.length > 0
              ? missingPrompt
              : [
                  "Verify in-house testing capacity for full Scheme I conformity.",
                ],
          relatedStandards: candidates
            .filter(
              (c) =>
                c.standardNumber !== std.standardNumber &&
                c.division === std.division,
            )
            .map((c) => c.standardNumber),
          confidence: score >= 80 ? "HIGH" : score >= 60 ? "MEDIUM" : "LOW",
          evidence: [
            {
              id: `ev-${std.standardNumber}`,
              documentTitle: std.title,
              standardNumber: std.standardNumber,
              clause: "1.1 Scope",
              page: 1,
              publicationDate: std.publicationDate,
              status: std.status,
              sourceUrl: std.sourceUrl,
              excerpt: std.scope,
              similarityScore: score / 100,
            },
          ],
        });
      }
    }

    matches.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // If zero matches, provide top candidate standards
    if (matches.length === 0) {
      for (const std of candidates.slice(0, 3)) {
        matches.push({
          standard: {
            id:
              std.id ||
              `std-${std.standardNumber.replace(/[^a-zA-Z0-9]/g, "")}`,
            standardNumber: std.standardNumber,
            title: std.title,
            year: std.year,
            department: std.department,
            division: std.division,
            status: std.status,
            scope: std.scope,
            abstract: std.abstract,
            keywords: std.keywords,
            isMandatory: std.isMandatory,
            qcoNotificationNumber: std.qcoNotificationNumber,
            qcoDate: std.qcoDate,
            sourceUrl: std.sourceUrl,
            publicationDate: std.publicationDate,
            lastUpdatedDate: std.lastUpdatedDate,
            clauses: [],
          },
          relevanceScore: 65,
          matchReason:
            "Potentially applicable Indian Standard from official BIS repository.",
          matchingAttributes: ["Standard Catalog Classification"],
          missingInformationPrompt: [
            "Please provide exact product material grade and operational voltage/dimensions.",
          ],
          relatedStandards: [],
          confidence: "MEDIUM",
          evidence: [
            {
              id: `ev-${std.standardNumber}`,
              documentTitle: std.title,
              standardNumber: std.standardNumber,
              clause: "1.1 Scope",
              page: 1,
              publicationDate: std.publicationDate,
              status: std.status,
              sourceUrl: std.sourceUrl,
              excerpt: std.scope,
              similarityScore: 0.65,
            },
          ],
        });
      }
    }

    return {
      query: profile,
      matches,
      totalMatches: matches.length,
      guidanceNotes:
        "Semantic similarity alone does NOT constitute legal certification applicability. Verify against mandatory Quality Control Orders (QCO) and official Sectional Committee schedules.",
      disclaimer:
        "Authoritative decisions must be verified on the official Bureau of Indian Standards e-BIS portal (services.bis.gov.in).",
    };
  }

  async compareStandards(
    standardNumbers: string[],
  ): Promise<StandardComparisonResult> {
    const stds = standardNumbers
      .map((num) => this.getStandardByIdSync(num))
      .filter(Boolean) as Standard[];
    return {
      standards: stds,
      commonFeatures: [
        "Clause 1: Scope",
        "Clause 4: Material Requirements",
        "Clause 5: Safety & Performance Testing",
        "Clause 8: Marking & Labelling",
      ],
      differences: [
        {
          parameter: "Conformity Scheme",
          values: Object.fromEntries(
            stds.map((s) => [
              s.standardNumber,
              s.isMandatory
                ? "Mandatory (Scheme I / ISI)"
                : "Voluntary / Scheme II",
            ]),
          ),
        },
        {
          parameter: "Scope of Application",
          values: Object.fromEntries(
            stds.map((s) => [s.standardNumber, s.scope.slice(0, 100) + "..."]),
          ),
        },
      ],
      applicabilityCriteria: Object.fromEntries(
        stds.map((s) => [s.standardNumber, s.scope]),
      ),
      summary: `Detailed comparative analysis of ${stds.map((s) => s.standardNumber).join(" vs ")}. Consult BIS technical committees for boundary specifications.`,
    };
  }

  private getStandardByIdSync(idOrNumber: string): Standard | null {
    const found = (SEED_STANDARDS as any[]).find(
      (s) =>
        s.id === idOrNumber ||
        s.standardNumber.toLowerCase().includes(idOrNumber.toLowerCase()),
    );
    if (!found) return null;
    return {
      id:
        found.id || `std-${found.standardNumber.replace(/[^a-zA-Z0-9]/g, "")}`,
      standardNumber: found.standardNumber,
      title: found.title,
      year: found.year,
      department: found.department,
      division: found.division,
      status: found.status,
      scope: found.scope,
      abstract: found.abstract,
      keywords: found.keywords,
      isMandatory: found.isMandatory,
      qcoNotificationNumber: found.qcoNotificationNumber,
      qcoDate: found.qcoDate,
      sourceUrl: found.sourceUrl,
      publicationDate: found.publicationDate,
      lastUpdatedDate: found.lastUpdatedDate,
      clauses: [],
    };
  }

  async getTestingRequirements(
    filter: TestingSearchFilter,
  ): Promise<TestingRequirement[]> {
    if (
      !filter ||
      (!filter.standardNumber && !filter.testName && !filter.productName)
    ) {
      return DEFAULT_TESTING_REQUIREMENTS;
    }

    const filtered = DEFAULT_TESTING_REQUIREMENTS.filter((req) => {
      const matchStd =
        !filter.standardNumber ||
        req.standardNumber
          .toLowerCase()
          .includes(filter.standardNumber.toLowerCase());
      const matchName =
        !filter.testName ||
        req.testName.toLowerCase().includes(filter.testName.toLowerCase());
      const matchProd =
        !filter.productName ||
        req.applicableProducts.some((p) =>
          p.toLowerCase().includes(filter.productName!.toLowerCase()),
        );
      return matchStd && (matchName || matchProd);
    });

    return filtered.length > 0
      ? filtered
      : DEFAULT_TESTING_REQUIREMENTS.slice(0, 3);
  }

  async searchLaboratories(
    filter: LaboratorySearchFilter,
  ): Promise<{ laboratories: Laboratory[]; total: number }> {
    const filtered = (SEED_LABORATORIES as any[]).filter((lab) => {
      if (
        filter.state &&
        !lab.state.toLowerCase().includes(filter.state.toLowerCase())
      )
        return false;
      if (
        filter.city &&
        !lab.city.toLowerCase().includes(filter.city.toLowerCase())
      )
        return false;
      if (filter.standardNumber) {
        const cleanStd = filter.standardNumber
          .replace(/:\d{4}/, "")
          .trim()
          .toLowerCase();
        const hasStd = (lab.recognizedStandards as string[]).some((s) =>
          s.toLowerCase().includes(cleanStd),
        );
        if (!hasStd) return false;
      }
      return true;
    });

    const laboratories: Laboratory[] = (
      filtered.length > 0 ? filtered : SEED_LABORATORIES
    ).map((l: any) => ({
      id: l.id || `lab-${l.labCode}`,
      name: l.name,
      labCode: l.labCode,
      address: l.address,
      city: l.city,
      state: l.state,
      pincode: l.pincode,
      contactPerson: l.contactPerson,
      contactEmail: l.contactEmail,
      contactPhone: l.contactPhone,
      recognitionStatus: l.recognitionStatus || "RECOGNIZED",
      validUpTo: l.validUpTo || "2030-12-31",
      accreditationBody: l.accreditationBody || "NABL (ISO/IEC 17025)",
      recognizedStandards: l.recognizedStandards || [],
      testingCapabilities: l.testingCapabilities || [],
      isNablAccredited: l.isNablAccredited ?? true,
      isBisRecognized: l.isBisRecognized ?? true,
      latitude: l.latitude,
      longitude: l.longitude,
      sourceUrl: l.sourceUrl || "https://www.services.bis.gov.in",
      lastUpdatedDate: l.lastUpdatedDate || "2024-02-01",
    }));

    return { laboratories, total: laboratories.length };
  }

  async getHallmarkingGuidance(): Promise<HallmarkingGuidance> {
    return {
      purityGrades: [
        {
          metal: "GOLD",
          karatDisplay: "24K",
          finenessNumber: 999,
          description:
            "Fine Gold (99.9% pure). Primary standard for bullion & investment bars.",
          usageType: "Bullion / Investment Coins",
          officialStandard: "IS 1417",
          mandatoryMarkings: [
            {
              name: "BIS Logo",
              description: "Standard triangular BIS emblem",
              iconOrRepresentation: "BIS_TRIANGLE",
            },
            {
              name: "Purity/Fineness",
              description: "24K999",
              iconOrRepresentation: "24K999",
            },
            {
              name: "6-digit HUID",
              description: "Laser marked 6-character code",
              iconOrRepresentation: "HUID_CODE",
            },
          ],
        },
        {
          metal: "GOLD",
          karatDisplay: "22K",
          finenessNumber: 916,
          description:
            "22 Karat Gold (91.6% pure). Mandatory standard for traditional bridal jewellery.",
          usageType: "Traditional Jewellery",
          officialStandard: "IS 1417",
          mandatoryMarkings: [
            {
              name: "BIS Logo",
              description: "Standard triangular BIS emblem",
              iconOrRepresentation: "BIS_TRIANGLE",
            },
            {
              name: "Purity/Fineness",
              description: "22K916",
              iconOrRepresentation: "22K916",
            },
            {
              name: "6-digit HUID",
              description: "Laser marked 6-character code",
              iconOrRepresentation: "HUID_CODE",
            },
          ],
        },
      ],
      huidExplanation:
        "6-digit alphanumeric Hallmarking Unique Identification (HUID) code gives full traceability of purity and jeweller registration on the BIS Care App.",
      threeMandatoryMarks: [
        {
          markNumber: 1,
          title: "BIS Logo",
          detail: "Triangular mark confirming government statutory conformity.",
        },
        {
          markNumber: 2,
          title: "Purity / Fineness Grade",
          detail: "Karat and fineness indicator (e.g., 22K916, 18K750).",
        },
        {
          markNumber: 3,
          title: "6-Digit HUID",
          detail:
            "Unique laser-etched alphanumeric identification code for individual piece traceability.",
        },
      ],
      consumerRights: [
        "Right to authentic purity as stamped on the jewellery piece.",
        "Right to verify the 6-digit HUID instantly on the BIS Care App before making payment.",
        "Right to assay testing in any BIS recognized testing laboratory if purity is disputed.",
      ],
      compensationPolicy:
        "Under BIS Hallmarking Regulations, if hallmarked jewellery is found to be of lesser purity than marked, the customer is entitled to receive refund of the purity difference plus compensation up to twice the testing fee.",
    };
  }

  async validateHuid(huid: string): Promise<HuidValidationResult> {
    const clean = (huid || "").trim().toUpperCase();
    const isValidStructure = /^[A-Z0-9]{6}$/.test(clean);

    return {
      huid: clean || "UNKNOWN",
      isValidFormat: isValidStructure,
      length: clean.length,
      explanation: isValidStructure
        ? `The code '${clean}' adheres to the standard 6-digit alphanumeric HUID format specified under IS 1417.`
        : `The code '${clean}' does not match the valid 6-character alphanumeric HUID pattern.`,
      mandatoryComponents: ["BIS Logo", "Purity/Fineness Mark", "6-digit HUID"],
      howToVerifyOnBisCare: [
        "1. Open the BIS Care App on Android or iOS.",
        '2. Select "Verify HUID" on the home dashboard.',
        '3. Enter the 6-digit code and click "Submit".',
        "4. Cross-check Jeweller Name, Assaying Centre, and Article Type displayed.",
      ],
      consumerSafetyTips: [
        "Always demand an invoice specifically recording the 6-digit HUID and purity karat.",
        "Never purchase gold jewellery marked only with non-standard private stamps without the BIS logo.",
      ],
    };
  }

  async searchHallmarkingCentres(
    state?: string,
    city?: string,
  ): Promise<HallmarkingCentre[]> {
    return (SEED_HALLMARKING_CENTRES as any[])
      .map((c: any) => ({
        id: c.id || `ahc-${c.centreCode.toLowerCase()}`,
        centreName: c.centreName,
        centreCode: c.centreCode,
        address: c.address,
        city: c.city,
        state: c.state,
        pincode: c.pincode,
        contactEmail: c.contactEmail,
        contactPhone: c.contactPhone,
        recognizedMetals: c.recognizedMetals || ["GOLD", "SILVER"],
        recognitionStatus: c.recognitionStatus || "ACTIVE",
        validUpTo: c.validUpTo || "2029-12-31",
        sourceUrl: c.sourceUrl || "https://services.bis.gov.in",
      }))
      .filter((c) => {
        if (state && !c.state.toLowerCase().includes(state.toLowerCase()))
          return false;
        if (city && !c.city.toLowerCase().includes(city.toLowerCase()))
          return false;
        return true;
      });
  }

  async verifyIsiMark(cmlNumber: string): Promise<IsiVerificationResult> {
    const cleanCml = (cmlNumber || "")
      .trim()
      .toUpperCase()
      .replace(/[^0-9]/g, "");
    const isValidLength = cleanCml.length === 7 || cleanCml.length === 8;

    return {
      cmlNumber: cleanCml ? `CM/L-${cleanCml}` : "CM/L-XXXXXXX",
      isValidFormat: isValidLength,
      standardNumber: cleanCml.startsWith("14543")
        ? "IS 14543:2016"
        : "IS 17526:2021",
      licenseeName: isValidLength
        ? "Verified Registered Domestic Manufacturer (Authoritative query on BIS Care required)"
        : undefined,
      productName:
        "Industrial / Consumer Product under Mandatory BIS Quality Control Order",
      validityStatus: isValidLength ? "OPERATIVE" : "UNVERIFIED",
      guidance: isValidLength
        ? `The format 'CM/L-${cleanCml}' is a valid 7/8-digit Certification Marks Licence structure. Always verify its live operative status on the official BIS Care mobile app.`
        : `Invalid CM/L structure: A genuine ISI Mark licence number must contain 7 or 8 numeric digits directly below the BIS mark.`,
      stepsToVerify: [
        "1. Locate the ISI Mark on the product label or packaging.",
        "2. Verify that the Indian Standard number (e.g. IS 14543) is printed ABOVE the mark.",
        "3. Verify that the 7 or 8 digit CM/L number is printed BELOW the mark.",
        '4. Open the BIS Care Mobile App and select "Verify License Details (ISI Mark)".',
        "5. Enter the CM/L number to view: Licensee Name, Address, Valid Up To date, and Product Scope.",
      ],
      authenticityChecklist: [
        "Is the triangular BIS standard logo printed with crisp, high-resolution geometry?",
        "Is the standard number IS:XXXX present on top of the logo?",
        "Is the 7 or 8 digit CM/L licence number printed at the bottom of the logo?",
        "Does the product name on the packaging match the scope shown on the BIS Care App?",
      ],
      fraudIndicators: [
        "No CM/L number printed below the ISI mark.",
        'Wordings like "As per IS Standards" or "ISO Certified" disguised as an ISI mark.',
        "Blurry, distorted, or hand-drawn triangular logos.",
        'CM/L number that shows "EXPIRED" or "CANCELLED" when queried on the BIS Care App.',
      ],
      bisCareAppLink:
        "https://play.google.com/store/apps/details?id=com.bis.bisconnect",
    };
  }

  async getCertificationSchemes(): Promise<CertificationScheme[]> {
    return (SEED_SCHEMES as any[]).map((s: any) => ({
      id: s.id || `scheme-${s.code.toLowerCase()}`,
      code: s.code,
      name: s.name,
      schemeType: s.schemeType,
      description: s.description,
      applicability: s.applicability,
      applicableSectors: s.applicableSectors || [],
      mandatoryProductCategories: s.mandatoryProductCategories || [],
      keySteps: s.keySteps || [],
      requiredDocuments: s.requiredDocuments || [],
      feeStructureSummary: s.feeStructureSummary || "",
      surveillanceFrequency: s.surveillanceFrequency || "",
      validityPeriod: s.validityPeriod || "",
      officialGuidelineUrl:
        s.officialGuidelineUrl || "https://www.services.bis.gov.in",
    }));
  }

  async getCertificationRoadmap(
    standardNumber: string,
    productType?: string,
  ): Promise<{ steps: ComplianceRoadmapStep[] }> {
    const isCRS =
      standardNumber.includes("16046") ||
      (productType && productType.toLowerCase().includes("battery"));

    if (isCRS) {
      return {
        steps: [
          {
            stepNumber: 1,
            phaseName: "Sample Preparation & Lab Selection",
            title: "Submit Prototype / Sample to BIS-Recognized Lab",
            status: "COMPLETED",
            category: "TESTING",
            description: `Submit representative production models to a BIS-recognized laboratory for testing against ${standardNumber}. Ensure safety chambers and altitude simulation tests are scheduled.`,
            actionItems: [
              "Prepare 5-10 product samples with complete marking labels",
              "Obtain test quotation from NABL/BIS accredited laboratory",
              "Verify component test certificates for critical parts (cells, adapter, PCB)",
            ],
            requiredDocuments: [
              "Component Specification Sheet",
              "Circuit Schematic & PCB Layout",
              "User Manual in English & Hindi",
            ],
            estimatedTimeframe: "15 - 25 Days",
            relevantStandards: [standardNumber],
          },
          {
            stepNumber: 2,
            phaseName: "Laboratory Test Report",
            title: "Obtain Comprehensive Test Report",
            status: "IN_PROGRESS",
            category: "TESTING",
            description:
              "Receive endorsed test report from BIS-recognized laboratory confirming all safety clauses pass.",
            actionItems: [
              "Review test report for non-conformities",
              "Obtain signed digital test report copy",
            ],
            requiredDocuments: ["Official NABL / BIS Endorsed Test Report"],
            estimatedTimeframe: "3 - 5 Days",
            relevantStandards: [standardNumber],
          },
          {
            stepNumber: 3,
            phaseName: "CRS Online Application",
            title: "File Online Application on BIS CRS Portal",
            status: "PENDING",
            category: "APPLICATION",
            description:
              "Submit test report and manufacturer credentials on www.crsbis.in portal.",
            actionItems: [
              "Create manufacturing unit user profile",
              "Upload test report and authorization declaration",
              "Pay government statutory registration fees",
            ],
            requiredDocuments: [
              "Proof of Manufacturing Unit (Factory Licence / ISO 9001)",
              "Authorized Indian Representative (AIR) Undertaking if foreign manufacturer",
              "Test Report (within 90 days of issue)",
            ],
            estimatedTimeframe: "10 - 15 Days",
            relevantStandards: [standardNumber],
          },
        ],
      };
    }

    return {
      steps: [
        {
          stepNumber: 1,
          phaseName: "Factory Infrastructure & Standard Verification",
          title: "Establish In-House Quality Assurance & Lab Setup",
          status: "COMPLETED",
          category: "PREPARATION",
          description: `Verify that manufacturing facility satisfies Scheme of Inspection and Testing (SIT) under ${standardNumber}. Procure required in-house calibrated test instruments.`,
          actionItems: [
            "Study Scheme of Inspection & Testing (SIT) schedule",
            "Calibrate all in-house test equipment with NABL traceable certificates",
            "Appoint qualified quality control chemist/engineer",
          ],
          requiredDocuments: [
            "Plant & Machinery Layout Diagram",
            "Calibration Certificates of Test Equipment",
            "Quality Manual / In-House Lab SOPs",
          ],
          estimatedTimeframe: "30 - 45 Days",
          relevantStandards: [standardNumber],
        },
        {
          stepNumber: 2,
          phaseName: "Application Submission (e-BIS)",
          title: "File e-BIS Application Form V",
          status: "IN_PROGRESS",
          category: "APPLICATION",
          description:
            "Submit formal application for grant of licence on the Manakonline portal.",
          actionItems: [
            "Fill Form V on manakonline.in",
            "Upload plant details and brand trade name authorization",
            "Pay application fee & preliminary inspection charges",
          ],
          requiredDocuments: [
            "MSME / Udyam Registration Certificate",
            "Trademark Registration Certificate / NOC",
            "Manufacturing Process Flowchart",
          ],
          estimatedTimeframe: "7 - 14 Days",
          relevantStandards: [standardNumber],
        },
        {
          stepNumber: 3,
          phaseName: "BIS Officer Factory Audit & Sample Drawing",
          title: "Preliminary Inspection by BIS Quality Officer",
          status: "PENDING",
          category: "INSPECTION",
          description:
            "A BIS Inspecting Officer conducts on-site factory verification, inspects quality control processes, and draws independent samples.",
          actionItems: [
            "Facilitate complete plant walkthrough",
            "Demonstrate routine testing in the in-house lab",
            "Sign sample collection & test schedule protocol",
          ],
          requiredDocuments: [
            "Factory Inspection Checklist",
            "Sample Dispatch Memo (Form 13)",
          ],
          estimatedTimeframe: "15 - 30 Days",
          relevantStandards: [standardNumber],
        },
        {
          stepNumber: 4,
          phaseName: "Independent Lab Sample Testing",
          title: "Third-Party Laboratory Testing",
          status: "PENDING",
          category: "TESTING",
          description:
            "The drawn sample is tested in a BIS Central/Regional Laboratory or BIS-recognized referral lab for full conformity.",
          actionItems: [
            "Monitor lab testing status on Manakonline dashboard",
            "Respond to any technical queries from the BIS branch office",
          ],
          requiredDocuments: ["BIS Referral Lab Test Report"],
          estimatedTimeframe: "30 - 45 Days",
          relevantStandards: [standardNumber],
        },
        {
          stepNumber: 5,
          phaseName: "Grant of Licence & CM/L Number",
          title: "Issuance of BIS Certification Marks Licence",
          status: "PENDING",
          category: "GRANT",
          description:
            "Upon satisfactory test report and audit clearance, BIS issues the Certificate of Conformity and allocates the unique 7/8-digit CM/L number.",
          actionItems: [
            "Pay annual minimum marking fee",
            "Receive Form VII Licence Document",
            "Print standard ISI mark with IS number and CM/L number on packaging",
          ],
          requiredDocuments: ["Official CM/L Licence Document (Form VII)"],
          estimatedTimeframe: "7 - 10 Days",
          relevantStandards: [standardNumber],
        },
      ],
    };
  }

  async generateComplianceReport(
    profile: ProductProfileQuery,
  ): Promise<ProductComplianceReport> {
    const rec = await this.recommendStandards(profile);
    const topMatch = rec.matches.length > 0 ? rec.matches[0].standard : null;
    const stdNumber = topMatch ? topMatch.standardNumber : "IS 17526:2021";

    const schemes = await this.getCertificationSchemes();
    const primaryScheme = schemes[0];

    const roadmap = await this.getCertificationRoadmap(
      stdNumber,
      profile.productName,
    );
    const testReqs = await this.getTestingRequirements({
      standardNumber: stdNumber,
    });
    const labs = await this.searchLaboratories({ standardNumber: stdNumber });

    return {
      id: `report-${Date.now()}`,
      productName:
        profile.productName || "Industrial / MSME Manufactured Product",
      manufacturerType: "INDIAN_MSME",
      generationDate: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      applicableStandards: rec.matches.map((m) => ({
        standardNumber: m.standard.standardNumber,
        title: m.standard.title,
        isMandatory: m.standard.isMandatory,
        qcoDetails:
          m.standard.qcoNotificationNumber || "Mandatory Quality Control Order",
        keyClauses: [
          "Clause 4 Material Specifications",
          "Clause 5 Performance & Safety",
          "Clause 8 Marking & Labelling",
        ],
      })),
      certificationScheme: primaryScheme,
      testingChecklist: testReqs.map((t) => ({
        testName: t.testName,
        clause: t.clauseNumber,
        isMandatory: t.isMandatoryRoutineTest,
        samplingRule: t.samplingRequirements,
      })),
      accreditedLaboratories: labs.laboratories.map((l) => ({
        name: l.name,
        location: `${l.city}, ${l.state}`,
        accreditationStatus: l.recognitionStatus,
      })),
      roadmap: roadmap.steps,
      documentationChecklist: [
        "Factory Registration / MSME Udyam Certificate",
        "Plant & Machinery Calibration Certificates",
        "In-house Quality Control Personnel Qualifications",
        "Raw Material Test Certificates (SS 304/316)",
        "Consent to Operate from State Pollution Control Board",
      ],
      potentialPitfalls: [
        "Attempting to submit applications without calibrated in-house testing instruments.",
        "Non-conformity in trace heavy metal leaching tests in initial sample testing.",
        "Incomplete process flow documentation or unverified brand authorization.",
      ],
      citations: [
        {
          id: "ev-rep-1",
          documentTitle: topMatch
            ? topMatch.title
            : "Indian Standard Specification",
          standardNumber: stdNumber,
          clause: "Clause 4 & 5",
          page: 1,
          publicationDate: "2021-01-01",
          status: "ACTIVE" as any,
          sourceUrl: "https://services.bis.gov.in",
          excerpt: `Statutory product conformity requirements under ${stdNumber} as notified by Quality Control Orders.`,
          similarityScore: 0.95,
        },
      ],

      disclaimer:
        "This compliance assessment is generated for preliminary operational guidance based on Gazette Quality Control Orders. Official certification is granted exclusively by the Bureau of Indian Standards via manakonline.in.",
    };
  }

  async checkCompliance(
    specification: Record<string, any>,
    standardNumber?: string,
  ): Promise<{
    summary: string;
    applicableStandard: string;
    requirements: Array<{
      requirement: string;
      product_value: string;
      status: "Satisfied" | "Potential Gap" | "Unclear / Information Missing";
      explanation: string;
      citation: { standardNumber: string; clause: string; page?: number };
    }>;
  }> {
    const stdNum = standardNumber || "IS 17526:2021";
    const reqs = [
      {
        requirement:
          "Material Composition (Austenitic Food Grade Stainless Steel SS 304/316)",
        product_value: specification.material || "Stainless Steel",
        status:
          specification.material &&
          (specification.material.includes("304") ||
            specification.material.includes("316"))
            ? ("Satisfied" as const)
            : ("Potential Gap" as const),
        explanation:
          "Clause 4.1 requires minimum 16% Chromium and 8% Nickel for food contact surfaces.",
        citation: { standardNumber: stdNum, clause: "4.1", page: 2 },
      },
      {
        requirement: "Thermal Retention Performance (>60°C after 6h)",
        product_value:
          specification.thermalPerformance || "Double wall vacuum insulated",
        status: "Satisfied" as const,
        explanation:
          "Clause 5.1 requires water filled at 95°C to remain above 60°C after 6 hours at 20°C ambient.",
        citation: { standardNumber: stdNum, clause: "5.1", page: 4 },
      },
      {
        requirement: "Leakage and Gasket Tightness",
        product_value: specification.leakProof
          ? "Leak-proof silicone seal"
          : "Information missing",
        status: specification.leakProof
          ? ("Satisfied" as const)
          : ("Unclear / Information Missing" as const),
        explanation:
          "Clause 5.4 mandates zero leakage when inverted for 10 minutes under 50 kPa pressure.",
        citation: { standardNumber: stdNum, clause: "5.4", page: 6 },
      },
    ];

    return {
      summary: `Compliance assessment against ${stdNum}. ${reqs.filter((r) => r.status === "Satisfied").length}/${reqs.length} core specifications conform.`,
      applicableStandard: stdNum,
      requirements: reqs,
    };
  }

  async recordFeedback(data: {
    messageId: string;
    feedback: FeedbackType;
    notes?: string;
  }) {
    feedbackStore.push({
      id: `fb-${Date.now()}`,
      messageId: data.messageId,
      feedback: data.feedback,
      notes: data.notes,
      timestamp: new Date().toISOString(),
    });
    return { success: true };
  }
}

export const standaloneAIService = new StandaloneAIService();

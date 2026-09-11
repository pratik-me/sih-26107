export const en = {
  nav: {
    title: "BIS",
    subtitle: "AI Assistant for Indian Standards & Services",
    askAi: "Ask AI",
    askAiShort: "Ask AI",
    standardsMenu: "Standards Catalogue",
    standardsMenuDesc: "Search and explore Indian Standards catalogue.",
    findMyStandard: "Find My Standard",
    findMyStandardDesc: "AI product profiler matching your product to IS",
    testingRequirements: "Testing Requirements & Clauses",
    testingRequirementsDesc:
      "Acceptance criteria, sampling rules, and lab equipment",
    schemesRoadmap: "Certification Schemes & Roadmap",
    schemesRoadmapDesc: "Scheme I (ISI), Scheme II (CRS), Scheme IV & FMCS",
    hallmarking: "Hallmark",
    hallmarkingDesc: "Verify 6-digit HUID codes, purity & recognized AHCs",
    labs: "Recognized Laboratories",
    labsDesc: "Find accredited NABL & BIS testing facilities",
    consumerHub: "Consumer",
    consumerHubDesc: "Verify ISI CM/L licence & report fake marks",
    dashboard: "Reports",
    dashboardDesc: "Live telemetry, compliance trends, and query insights",
    standardsDirect: "Standards",
    certification: "Certification",
    testing: "Testing",
    labFinder: "Labs",
    admin: "Admin",
    selectRole: "Select Role",
    roles: {
      industry: "Industry / MSME",
      consumer: "Consumer / Citizen",
      student: "Student / Researcher",
      admin: "Admin / Regulator",
    },
  },
  hero: {
    headline: "Your AI Assistant for",
    headlineHighlight: "Indian Standards & BIS Services",
    subheadline:
      "Find the right standard. Understand certification schemes. Verify hallmarking and test clauses with evidence-backed, zero-hallucination AI.",
    selectProfileMode: "Select Your Profile Mode:",
    searchPlaceholderDefault:
      "Ask about product standards, Scheme I/CRS certification, lab testing, or clauses...",
    askAiButton: "Ask AI",
    suggestedQueriesFor: "Suggested queries for:",
  },
  modes: {
    industry: {
      label: "Industry / MSME",
      placeholder:
        "Ask about product standards, Scheme I/CRS certification, lab testing, or clauses...",
      prompts: [
        "I manufacture stainless steel water bottles. Which standard applies?",
        "Do I need BIS certification for Lithium-ion power banks?",
        "What tests are required for TMT steel bars under IS 1786?",
        "What is the factory audit and sample testing process for Scheme-I?",
        "FMCS guidelines for foreign manufacturers exporting to India",
        "Required lab testing equipment for IS 302 electrical appliances",
      ],
    },
    consumer: {
      label: "Consumer",
      placeholder:
        "Check gold hallmark HUID, verify ISI mark authenticity, consumer grievance...",
      prompts: [
        "How do I verify a gold jewellery hallmark with 6-digit HUID?",
        "How can I check whether an ISI mark on packaged water is genuine?",
        "How to file a consumer grievance against defective ISI certified goods?",
        "Differenciate between BIS Hallmark and 916 purity mark.",
        "Is BIS registration mandatory for smart phones?",
        "How to verify R-number on electronics under CRS scheme?",
      ],
    },
    student: {
      label: "Student / Researcher",
      placeholder:
        "Search standard clauses, comparative analysis, test formulas, or NBC codes...",
      prompts: [
        "Explain IS 10500 Clause 4.2 drinking water TDS & heavy metal limits",
        "Comparative analysis between IS 456 standards and Eurocode 2",
        "What are the latest amendments to NBC 2016?",
        "Search technical clauses for tensile and elongation requirements in IS 2062",
        "Evolution of energy efficiency and BEE star rating test protocols in IS 1391",
        "Standard testing methods for cement compressive strength under IS 4031",
      ],
    },
    admin: {
      label: "Admin & Regulatory",
      placeholder:
        "Search standards, schemes, reports, or administrative guidelines...",
      prompts: [
        "What are the active Quality Control Orders (QCOs) in effect?",
        "Audit compliance checklist for BIS recognized testing laboratories",
        "Standards revision roadmap and committee review process",
      ],
    },
  },
  features: {
    sectionTitlePrefix: "Comprehensive",
    sectionTitleHighlight: "Bureau of Indian Standards",
    sectionTitleSuffix: "Intelligence",
    sectionSubtitle:
      "Structured modules for manufacturers, compliance officers, consumers, and research scholars.",
    cards: {
      findStandard: {
        title: "Find My Standard Workflow",
        badge: "AI Profiler",
        tag: "Product Matching",
        desc: "Step-by-step product profiler matching your product's material, intended application, and specifications to applicable Indian Standards with relevance metrics.",
        action: "Start Profiler →",
      },
      certification: {
        title: "Certification Schemes & Roadmap",
        badge: "ISI & CRS",
        tag: "Audit & FMCS",
        desc: "Navigate Scheme I (ISI Mark), Scheme II (CRS), Scheme IV (CoC), and FMCS. Understand timelines, documentation checklists, and factory audit rules.",
        action: "Explore Schemes →",
      },
      testing: {
        title: "Testing Requirements & Clauses",
        badge: "Clauses",
        tag: "Sampling Schedules",
        desc: "Detailed acceptance criteria, sampling rules, testing frequencies, and required testing equipment directly cited from Indian Standards.",
        action: "Inspect Test Schedules →",
      },
      labs: {
        title: "BIS Recognized Laboratories Finder",
        badge: "Lab Network",
        tag: "NABL & BIS Facilities",
        desc: "Filter recognized NABL and BIS testing facilities by Indian Standard number, product category, test capability, state, and city.",
        action: "Locate Accredited Lab →",
      },
      hallmarking: {
        title: "Gold & Silver Hallmarking Assistant",
        badge: "HUID Check",
        tag: "Purity & Assaying",
        desc: "Understand 22K (916), 18K (750), and 14K (585) purity. Verify 6-digit alphanumeric HUID codes and locate recognized Assaying & Hallmarking Centres.",
        action: "Hallmarking Guidance →",
      },
      consumer: {
        title: "Consumer Protection & ISI Check",
        badge: "Verify & Report",
        tag: "Grievance Redressal",
        desc: "Verify genuine ISI Mark CM/L licence numbers, spot counterfeit marks with our visual checklist, and learn grievance redressal steps.",
        action: "Consumer Hub →",
      },
    },
  },
  pipeline: {
    badge: "Architecture & Verification Pipeline",
    title: "How BIS Saarthi Works",
    subtitle: "Strict adherence to",
    motto: "Retrieve First → Reason Second → Cite Everything",
    steps: {
      s1: {
        title: "Ask Query",
        desc: "Query in English, Hindi, or any of 22 Scheduled Indian Languages.",
      },
      s2: {
        title: "Retrieve",
        desc: "Hybrid BM25 + Vector semantic search across BIS repository.",
      },
      s3: {
        title: "Verify",
        desc: "Cross-encoder reranking & source freshness verification.",
      },
      s4: {
        title: "Explain",
        desc: "Clear plain-language guidance distinguished from statutory clauses.",
      },
      s5: {
        title: "Cite",
        desc: "Every claim traceable to standard number, clause, page, and link.",
      },
    },
  },
  trustBanner: {
    tag: "Zero Hallucination Operational Standard",
    title: "Trusted by MSMEs, Compliance Teams & Citizens",
    desc: "BIS Saarthi never invents Indian Standard numbers, test clauses, or lab recognition statuses. If official evidence is not available in the database, the system will explicitly state that the requirement cannot be verified.",
    cta: "Launch AI Workspace →",
  },
  chat: {
    title: "BIS Saarthi AI Workspace",
    welcomeTitle: "Welcome to BIS Saarthi 👋",
    welcomeContent: `I am your evidence-backed decision assistant for Indian Standards (IS), BIS certification schemes, testing clauses, laboratory accreditation, and hallmarking.\n\nWhat would you like to explore?\n- Product Compliance: "I manufacture stainless steel bottles. Which standard applies?"\n- Testing Requirements: "What are the routine tests required for TMT steel bars?"\n- Certification Guidance: "Do I need Compulsory Registration Scheme (CRS) for electronics?"\n- Hallmarking: "How do I verify a 6-digit HUID code on BIS Care App?"\n- Clause Explanation: "Explain IS 10500 Clause 4.2 in simple language."`,
    inputPlaceholder:
      "Ask about Indian Standards, certification, testing, or hallmarking...",
    send: "Send",
    newChat: "New Session",
    evidencePanelTitle: "Grounding Evidence & Citations",
    evidenceCount: "Evidence Sources",
    noEvidence: "No evidence loaded yet. Ask a query to inspect citations.",
    confidence: "Confidence Level",
    sourceFreshness: "Source Freshness",
    copy: "Copy Response",
    copied: "Copied!",
    thumbsUp: "Helpful",
    thumbsDown: "Not Helpful",
    reportIssue: "Report Issue",
    suggestedFollowUps: "Suggested Follow-ups",
    suggestedPrompts: [
      "Find standard for my product",
      "Do I need BIS certification?",
      "What tests are required?",
      "How to verify a gold hallmark?",
    ],
  },
  footer: {
    description:
      "AI-Powered Decision-Support Platform for Indian Standards, Certification Schemes, Laboratory Testing, and Hallmarking.",
    motto: "Retrieve First → Reason Second → Cite Everything",
    bisPortals: "BIS Portals",
    eBisPortal: "e-BIS Portal",
    manakonline: "Manakonline (Scheme I)",
    crsPortal: "CRS Portal (Electronics)",
    nablDirectory: "NABL Directory",
    coreModules: "Core Modules",
    findMyStandard: "Find My Standard",
    certificationSchemes: "Certification",
    testingRequirements: "Testing",
    recognizedLabs: "Labs",
    hallmarking: "Hallmark",
    legalNotice: "Legal & Quality Notice",
    legalDisclaimer:
      "Information provided is grounded in published Indian Standards and Gazette notifications. Formal legal compliance requires certification grant through official BIS portals.",
    adminConsole: "Admin & Evaluation Console →",
    copyright:
      "© {year} BIS Saarthi. Built for Indian Industry, MSMEs & Citizens.",
    consumerGrievance: "Consumer Grievance",
    aiSupport: "AI Decision Support",
  },
};

export type TranslationDictionary = typeof en;

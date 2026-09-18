"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  IndianLanguage,
  SUPPORTED_LANGUAGES,
  LanguageInfo,
  getLanguageInfo,
} from "@bis/shared-types";

// Complete Translation Dictionary for all 22 Scheduled Indian Languages + English + Hinglish
export const UI_TRANSLATIONS: Partial<
  Record<IndianLanguage, Record<string, string>>
> &
  Record<IndianLanguage.EN, Record<string, string>> = {
  [IndianLanguage.EN]: {
    "nav.standards": "Standards",
    "nav.find_standard": "Find Your Standards",
    "nav.catalogue": "Standards Catalogue",
    "nav.certification": "Certification",
    "nav.testing": "Testing",
    "nav.labs": "Labs",
    "nav.hallmark": "Hallmark",
    "nav.consumer": "Consumer",
    "nav.reports": "Reports",
    "nav.ask_bis_ai": "Ask BIS AI",
    "nav.ask_ai": "Ask AI",
    "hero.title": "Your AI Assistant for Indian Standards & BIS Services",
    "hero.subtitle":
      "Find the right standard. Understand certification schemes. Verify hallmarking and test clauses with evidence-backed, zero-hallucination AI.",
    "hero.select_profile": "SELECT YOUR PROFILE MODE:",
    "hero.search_placeholder":
      "Ask about product standards, Scheme I/CRS certification, lab testing, or clauses...",
    "hero.ask_ai_btn": "Ask AI",
    "hero.suggested_queries": "Suggested queries for:",
    "chat.new_session": "+ New Chat Session",
    "chat.specialized_tools": "BIS Specialized Tools",
    "chat.find_standard": "Find My Standard",
    "chat.certification_schemes": "Certification Schemes",
    "chat.testing_requirements": "Testing Requirements",
    "chat.find_lab": "Find Recognized Lab",
    "chat.generate_report": "Generate Compliance Report",
    "chat.active_workspace": "Active Workspace",
    "chat.current_investigation": "Current Investigation",
    "chat.grounded_active": "Grounded Retrieval Active",
    "chat.grounded_desc":
      "Answers verified against published Gazette notifications.",
    "chat.conversation_title": "BIS Saarthi Conversation",
    "chat.mode": "Mode:",
    "chat.language_label": "Language:",
    "chat.evidence_panel_btn": "Evidence Panel",
    "chat.welcome_title": "BIS Saarthi — Evidence-Backed Decision Assistant",
    "chat.input_placeholder":
      "Ask about standards, certification, test methods, lab credentials, or clauses...",
    "chat.send_btn": "Send",
    "chat.answer_language": "Answer Language",
    "chat.detected_language": "Detected Language",
    "chat.evidence_panel": "Authoritative Evidence & Citations",
    "chat.confidence": "Confidence Level",
    "chat.source_freshness": "Source Freshness Verified",
    "chat.searching_status": "Searching BIS Repository & Retrieving Clauses...",
    "chat.traceable_citations": "Traceable Authoritative Citations:",
    "chat.copy_answer": "Copy answer",
    "chat.copied": "Copied",
    "chat.helpful": "Helpful response",
    "chat.not_helpful": "Not helpful",
    "chat.report_citation": "Report inaccurate citation",
    "chat.disclaimer":
      "Grounding: Strict adherence to Indian Standards. Never fabricates requirements.",
    "chat.bis_act_compliant": "BIS Act 2016 Compliant",
    "evidence.title": "Authoritative Evidence",
    "evidence.indian_standard": "Indian Standard",
    "evidence.clause": "Clause:",
    "evidence.page": "Page:",
    "evidence.publication": "Publication:",
    "evidence.relevance": "Relevance:",
    "evidence.freshness_notice": "Freshness Notice:",
    "evidence.verbatim_excerpt": "Verbatim Clause Excerpt",
    "evidence.copy_excerpt": "Copy Excerpt",
    "evidence.copied": "Copied",
    "evidence.view_source": "View Source on Official BIS Portal",
    "evidence.no_evidence_title": "No Evidence Referenced",
    "evidence.no_evidence_desc":
      "Ask a question or select a standard to inspect grounded Bureau of Indian Standards evidence clauses and Gazette excerpts.",
    "common.loading": "Processing query with BIS RAG Engine...",
    "common.error": "Unable to process query. Please check your connection.",
    "header.subtitle": "Indian Standards Intelligence",
    "header.find_standard_desc":
      "AI product profiler matching your product to IS",
    "header.catalogue_desc": "Search and explore Indian Standards catalogue",
    "home.mode_industry": "Industry / MSME",
    "home.mode_consumer": "Consumer",
    "home.mode_student": "Student / Researcher",
    "home.mode_admin": "Admin & Regulatory",
    "home.mode_consumer_placeholder":
      "Check gold hallmark HUID, verify ISI mark authenticity, consumer grievance...",
    "home.mode_student_placeholder":
      "Search standard clauses, comparative analysis, test formulas, or NBC codes...",
    "home.mode_admin_placeholder":
      "Search standards, schemes, reports, or administrative guidelines...",
    "home.features_title":
      "Comprehensive Bureau of Indian Standards Intelligence",
    "home.features_subtitle":
      "Structured modules for manufacturers, compliance officers, consumers, and research scholars.",
    "home.features_find_title": "Find My Standard Workflow",
    "home.features_find_badge": "AI Profiler",
    "home.features_find_tag": "Product Matching",
    "home.features_find_desc":
      "Step-by-step product profiler matching your product's material, intended application, and specifications to applicable Indian Standards with relevance metrics.",
    "home.features_find_action": "Start Profiler →",
    "home.features_cert_title": "Certification Schemes & Roadmap",
    "home.features_cert_badge": "ISI & CRS",
    "home.features_cert_tag": "Audit & FMCS",
    "home.features_cert_desc":
      "Navigate Scheme I (ISI Mark), Scheme II (CRS), Scheme IV (CoC), and FMCS. Understand timelines, documentation checklists, and factory audit rules.",
    "home.features_cert_action": "Explore Schemes →",
    "home.features_testing_title": "Testing Requirements & Clauses",
    "home.features_testing_badge": "Clauses",
    "home.features_testing_tag": "Sampling Schedules",
    "home.features_testing_desc":
      "Detailed acceptance criteria, sampling rules, testing frequencies, and required testing equipment directly cited from Indian Standards.",
    "home.features_testing_action": "Inspect Test Schedules →",
    "home.features_labs_title": "BIS Recognized Laboratories Finder",
    "home.features_labs_badge": "Lab Network",
    "home.features_labs_tag": "NABL & BIS Facilities",
    "home.features_labs_desc":
      "Filter recognized NABL and BIS testing facilities by Indian Standard number, product category, test capability, state, and city.",
    "home.features_labs_action": "Locate Accredited Lab →",
    "home.features_hallmark_title": "Gold & Silver Hallmarking Assistant",
    "home.features_hallmark_badge": "HUID Check",
    "home.features_hallmark_tag": "Purity & Assaying",
    "home.features_hallmark_desc":
      "Understand 22K (916), 18K (750), and 14K (585) purity. Verify 6-digit alphanumeric HUID codes and locate recognized Assaying & Hallmarking Centres.",
    "home.features_hallmark_action": "Hallmarking Guidance →",
    "home.features_consumer_title": "Consumer Protection & ISI Check",
    "home.features_consumer_badge": "Verify & Report",
    "home.features_consumer_tag": "Grievance Redressal",
    "home.features_consumer_desc":
      "Verify genuine ISI Mark CM/L licence numbers, spot counterfeit marks with our visual checklist, and learn grievance redressal steps.",
    "home.features_consumer_action": "Consumer Hub →",
    "home.how_title": "How BIS Saarthi Works",
    "home.how_badge": "Architecture & Verification Pipeline",
    "home.how_subtitle":
      "Strict adherence to Retrieve First → Reason Second → Cite Everything",
    "home.how_step1_title": "Ask Query",
    "home.how_step1_desc":
      "Query in English, Hindi, or any of 22 Scheduled Indian Languages.",
    "home.how_step2_title": "Retrieve",
    "home.how_step2_desc":
      "Hybrid BM25 + Vector semantic search across BIS repository.",
    "home.how_step3_title": "Verify",
    "home.how_step3_desc":
      "Cross-encoder reranking & source freshness verification.",
    "home.how_step4_title": "Explain",
    "home.how_step4_desc":
      "Clear plain-language guidance distinguished from statutory clauses.",
    "home.how_step5_title": "Cite",
    "home.how_step5_desc":
      "Every claim traceable to standard number, clause, page, and link.",
    "home.trust_badge": "Zero Hallucination Operational Standard",
    "home.trust_title": "Trusted by MSMEs, Compliance Teams & Citizens",
    "home.trust_desc":
      "BIS Saarthi never invents Indian Standard numbers, test clauses, or lab recognition statuses. If official evidence is not available in the database, the system will explicitly state that the requirement cannot be verified.",
    "home.trust_action": "Launch AI Workspace →",
    "standards.badge": "Bureau of Indian Standards Repository",
    "standards.title": "Indian Standards Directory & Search",
    "standards.subtitle":
      "Search authoritative Indian Standards (IS), explore technical scopes, mandatory Quality Control Orders (QCO), and testing clause schedules.",
    "standards.search_placeholder":
      "Search by IS number (e.g. IS 10500, IS 17526) or keyword (cement, cable, steel, bottle)...",
    "standards.search_btn": "Search",
    "standards.filter_division": "Division:",
    "standards.filter_all": "All Divisions",
    "standards.filter_mandatory": "Mandatory QCO Only",
    "standards.div_mech": "Mechanical Engineering",
    "standards.div_civil": "Civil Engineering",
    "standards.div_electro": "Electrotechnical",
    "standards.div_met": "Metallurgical Engineering",
    "standards.div_food": "Food and Agriculture",
    "standards.loading_msg": "Retrieving Standards from BIS Repository...",
    "standards.loading_sub":
      "Applying division filters and QCO regulatory scopes...",
    "standards.empty_title": "No Indian Standards Found",
    "standards.empty_desc":
      "Try broadening your search query or reset the division and mandatory QCO filters.",
    "standards.empty_action": "Reset Filters",
    "findstd.badge": "AI Product Scope Profiler",
    "findstd.title_prefix": "Find Applicable",
    "findstd.title_highlight": "Indian Standard",
    "findstd.subtitle":
      "Input your product specifications, raw materials, and intended application. Our semantic engine matches your product against published Indian Standards with exact matching criteria and missing attribute prompts.",
    "findstd.anti_badge": "Anti-Speculation Standard",
    "findstd.anti_desc":
      "Semantic similarity is presented as potentially applicable. Always verify final grade classification against statutory QCOs.",
    "findstd.form_title": "Product Specification Form",
    "findstd.form_subtitle":
      "Provide as many details as possible for precise standard matching.",
    "findstd.field_product": "Product Name / Type",
    "findstd.field_material": "Raw Material Composition",
    "findstd.field_application": "Intended Application / Usage",
    "findstd.field_industry": "Industry / Domain Sector",
    "findstd.field_capacity": "Capacity / Size",
    "findstd.field_techspec": "Technical Specifications",
    "findstd.placeholder_product":
      "e.g. Stainless steel water bottle, PVC insulated cable, TMT bar",
    "findstd.placeholder_material":
      "e.g. SS 304, Aluminium alloy, High density polyethylene",
    "findstd.placeholder_application":
      "e.g. Drinking water storage, building construction, underground cabling",
    "findstd.placeholder_industry":
      "e.g. Metallurgical, Food & Agriculture, Civil, Electrical",
    "findstd.placeholder_capacity":
      "e.g. 750 ml / 1000 ml double wall, 1.1kV, 12mm",
    "findstd.placeholder_techspec":
      "e.g. Voltage rating 1.1kV, double wall vacuum insulation, diameter 12mm Fe 500D",
    "findstd.btn_evaluate": "Evaluate Applicable Standards",
    "findstd.btn_clear": "Clear",
    "findstd.btn_sample": "Run Sample Evaluation (SS Water Bottle)",
    "findstd.results_title": "Evaluated Indian Standards",
    "findstd.results_complete": "Grounded Assessment Completed",
    "findstd.loading_msg": "Evaluating Product-to-Standard Scope...",
    "findstd.loading_sub":
      "Scanning Gazette notifications, sectional committee divisions, and material grade parameters...",
    "findstd.empty_title": "No Profile Evaluated Yet",
    "findstd.empty_desc":
      "Fill in the product specification attributes on the left and click Evaluate Applicable Standards to generate matched Indian Standards with clause citations.",
    "testing.badge": "Statutory Testing Schedules",
    "testing.title": "Indian Standards Testing Requirements",
    "testing.subtitle":
      "Inspect mandatory routine batch tests, acceptance criteria, sampling rules, and required testing equipment cited directly from Indian Standards.",
    "testing.filter_placeholder":
      "Filter by Standard Number (e.g. IS 17526, IS 10500, IS 1786)...",
    "testing.btn_filter": "Filter Tests",
    "testing.btn_showall": "Show All Tests",
    "testing.loading_msg":
      "Retrieving Testing Clauses & Acceptance Parameters...",
    "testing.loading_sub":
      "Cross-referencing laboratory test methods and sampling frequencies...",
    "testing.empty_title": "No Testing Requirements Found",
    "testing.empty_desc":
      "Try searching with a standard number like IS 17526, IS 10500, or IS 1786.",
    "labs.badge": "Accredited Testing Infrastructure",
    "labs.title": "Find a BIS Recognized Laboratory",
    "labs.subtitle":
      "Search NABL (ISO/IEC 17025) accredited and BIS Recognized Testing Laboratories across Indian states and cities with valid testing scopes.",
    "labs.search_placeholder":
      "Search by Indian Standard (e.g. IS 17526, IS 14543, IS 16046, IS 1786)...",
    "labs.btn_filter": "Filter Labs",
    "labs.filter_state": "State:",
    "labs.filter_allstates": "All States",
    "labs.loading_msg": "Locating Recognized Testing Laboratories...",
    "labs.loading_sub":
      "Matching accredited testing parameters and laboratory validity schedules...",
    "labs.empty_title": "No Laboratories Found",
    "labs.empty_desc":
      "Try removing the standard filter or choosing All States to view national reference laboratories.",
    "labs.empty_action": "View All Laboratories",
    "hallmarking.badge": "Precious Metals Purity Assurance",
    "hallmarking.title_prefix": "Gold & Silver",
    "hallmarking.title_highlight": "Hallmarking Assistant",
    "hallmarking.subtitle":
      "Understand standard fineness grades, verify 6-digit alphanumeric HUID codes, locate Assaying & Hallmarking Centres, and know your statutory compensation rights.",
    "hallmarking.mandate_badge": "BIS Hallmarking Mandate",
    "hallmarking.mandate_desc":
      "Mandatory hallmarking is operative across notified districts in India. Only 3 marks are permitted on gold jewellery.",
    "hallmarking.3marks_title": "The 3 Mandatory Marks on Gold Jewellery",
    "hallmarking.3marks_note": "Operative since July 2021",
    "hallmarking.verify_tag": "Consumer Verification Tool",
    "hallmarking.verify_title": "Verify 6-Digit Alphanumeric HUID Structure",
    "hallmarking.verify_subtitle":
      "Test and inspect any 6-digit laser-marked HUID code before buying jewellery.",
    "hallmarking.verify_placeholder": "Enter 6-character HUID (e.g. A1B2C3)",
    "hallmarking.btn_validate": "Validate Format",
    "hallmarking.verify_howto": "How to verify this on BIS Care App:",
    "hallmarking.verify_safety": "Consumer Safety & Rights Tips:",
    "hallmarking.grades_title":
      "Official Gold & Silver Fineness Grades (IS 1417 & IS 2112)",
    "hallmarking.comp_badge": "Statutory 2X Compensation Policy",
    "hallmarking.comp_title": "Consumer Protection Guarantee",
    "hallmarking.loading_msg":
      "Loading Hallmarking Standards & Fineness Schedules...",
    "hallmarking.loading_sub":
      "Retrieving IS 1417 (Gold) and IS 2112 (Silver) statutory markings...",
    "reports.badge": "Decision Support Deliverable",
    "reports.title": "BIS Compliance Roadmap Report",
    "reports.btn_print": "Print / Save as PDF",
    "reports.doc_header": "Government Compliance Assessment Document",
    "reports.doc_title": "BIS Product Compliance & Conformity Roadmap",
    "reports.section1": "1. Target Product Profile",
    "reports.label_product": "Product Evaluated:",
    "reports.label_primarystd": "Primary Applicable Standard:",
    "reports.section2": "2. Applicable Indian Standards & QCO Mandates",
    "reports.tag_mandatory": "Mandatory",
    "reports.label_regulatory": "Regulatory Notification:",
    "reports.section3": "3. Applicable BIS Certification Scheme",
    "reports.label_validity": "Validity:",
    "reports.label_surveillance": "Surveillance:",
    "reports.section4": "4. Mandatory Testing Requirements & Sampling Criteria",
    "reports.col_test": "Test Parameter",
    "reports.col_clause": "Standard Clause",
    "reports.col_type": "Type",
    "reports.col_sampling": "Sampling Rule",
    "reports.section5": "5. Recommended Testing Laboratories",
    "reports.section6": "6. Statutory Documentation Checklist",
    "reports.section7": "Key Statutory Compliance Pitfalls to Avoid:",
    "reports.disclaimer_title": "Authoritative Compliance Notice:",
    "reports.loading_msg": "Synthesizing BIS Compliance Assessment Report...",
    "reports.loading_sub":
      "Compiling applicable standards, testing schedules, laboratory options, and statutory evidence...",
    "certification.badge": "BIS Conformity Assessment Schemes",
    "certification.title": "Certification Schemes & Compliance Roadmap",
    "certification.subtitle":
      "Understand statutory conformity schemes, mandatory factory audits, laboratory sample testing, and step-by-step licence grant procedures.",
    "certification.btn_report": "Generate Full Compliance Report",
    "certification.active_product": "Active Product Roadmap:",
    "certification.btn_change": "Change Product Profile →",
    "certification.roadmap_title":
      "Interactive Step-by-Step Certification Journey",
    "certification.phases": "Phases",
    "certification.details_tag": "Scheme Details",
    "certification.docs_title": "Statutory Documents Required:",
    "certification.fee_title": "Fee Structure:",
    "certification.validity": "Validity:",
    "certification.surveillance": "Surveillance:",
    "certification.link_official": "Official Manakonline / CRS Portal",
    "certification.loading_msg": "Loading Certification Scheme Requirements...",
    "certification.loading_sub":
      "Compiling documentation checklists and audit schedules...",
    "consumer.badge": "Citizen & Consumer Protection",
    "consumer.title_prefix": "Consumer Safety &",
    "consumer.title_highlight": "ISI Mark Verification Hub",
    "consumer.subtitle":
      "Verify genuine ISI Mark Certification Marks Licence (CM/L) numbers, detect counterfeit markings, and access official grievance channels.",
    "consumer.helpline_badge": "Toll-Free Consumer Helpline",
    "consumer.helpline_number": "1800-11-4000",
    "consumer.verify_tag": "Licence Authentication",
    "consumer.verify_title": "Verify ISI Mark CM/L Number",
    "consumer.verify_subtitle":
      "Enter the 7 or 8-digit numeric licence code printed beneath the ISI triangular logo.",
    "consumer.verify_placeholder":
      "Enter 7 or 8-digit CM/L Number (e.g. 1454301)",
    "consumer.btn_check": "Check Licence Structure",
    "consumer.checklist_auth": "Authenticity Verification Checklist:",
    "consumer.checklist_fraud": "Red Flag Fraud Indicators:",
    "consumer.link_biscare": "Download Official BIS Care Citizen App",
    "consumer.complaint_title": "How to Lodge a Counterfeit Complaint",
    "consumer.complaint_desc":
      "If you encounter a substandard product or fake ISI/Hallmark, you can submit an anonymous report directly to the BIS Enforcement Branch via the BIS Care App or e-BIS portal.",
    "consumer.categories_title": "Key Mandatory Consumer Categories",
    "consumer.categories_desc":
      "Products that strictly require the ISI Mark before retail sale in India:",
    "consumer.cat_packaged_water": "Packaged Drinking Water",
    "consumer.cat_cement": "Cement",
    "consumer.cat_steel_tmt": "Steel TMT Bars",
    "consumer.cat_pvc_pipes": "PVC Pipes",
    "consumer.cat_electrical": "Electrical Appliances",
    "consumer.cat_food_dairy": "Food & Dairy Products",
    "consumer.cat_lpg": "LPG Cylinders",
    "consumer.cat_gold": "Gold Jewellery",
    "chat.loading_testing": "Loading Testing Requirements...",
    "chat.loading_labs": "Loading Laboratories...",
    "chat.loading_certification": "Loading Certification Schemes...",
    "chat.loading_reports": "Loading Compliance Report...",
    "home.how_subtitle_prefix": "Strict adherence to",
    "home.how_subtitle_bold":
      '"Retrieve First → Reason Second → Cite Everything"',
    "footer.description":
      "AI-Powered Decision-Support Platform for Indian Standards, Certification Schemes, Laboratory Testing, and Hallmarking.",
    "footer.tagline": "Retrieve First → Reason Second → Cite Everything",
    "footer.portals_title": "BIS Portals",
    "footer.ebis": "e-BIS Portal",
    "footer.manakonline": "Manakonline (Scheme I)",
    "footer.crs": "CRS Portal (Electronics)",
    "footer.nabl": "NABL Directory",
    "footer.modules_title": "Core Modules",
    "footer.find_standard": "Find My Standard",
    "footer.certification": "Certification Schemes",
    "footer.testing": "Testing Requirements",
    "footer.labs": "Recognized Labs Finder",
    "footer.hallmarking": "Gold & Silver Hallmarking",
    "footer.legal_title": "Legal & Quality Notice",
    "footer.legal_text":
      "Information provided is grounded in published Indian Standards and Gazette notifications. Formal legal compliance requires certification grant through official BIS portals.",
    "footer.admin_link": "Admin & Evaluation Console →",
    "footer.copyright":
      "BIS Saarthi. Built for Indian Industry, MSMEs & Citizens.",
    "footer.consumer_grievance": "Consumer Grievance",
    "footer.ai_support": "AI Decision Support",
    "prompts.industry.1":
      "I manufacture stainless steel water bottles. Which standard applies?",
    "prompts.industry.2":
      "Do I need BIS certification for Lithium-ion power banks?",
    "prompts.industry.3":
      "What tests are required for TMT steel bars under IS 1786?",
    "prompts.industry.4":
      "What is the factory audit and sample testing process for Scheme-I?",
    "prompts.industry.5":
      "FMCS guidelines for foreign manufacturers exporting to India",
    "prompts.industry.6":
      "Required lab testing equipment for IS 302 electrical appliances",
    "prompts.consumer.1":
      "How do I verify a gold jewellery hallmark with 6-digit HUID?",
    "prompts.consumer.2":
      "How can I check whether an ISI mark on packaged water is genuine?",
    "prompts.consumer.3":
      "How to file a consumer grievance against defective ISI certified goods?",
    "prompts.consumer.4":
      "Difference between BIS Hallmark and 916 purity mark.",
    "prompts.consumer.5": "Is BIS registration mandatory for smart phones?",
    "prompts.consumer.6":
      "How to verify R-number on electronics under CRS scheme?",
    "prompts.student.1":
      "Explain IS 10500 Clause 4.2 drinking water TDS & heavy metal limits",
    "prompts.student.2":
      "Comparative analysis between IS 456 standards and Eurocode 2",
    "prompts.student.3": "What are the latest amendments to NBC 2016?",
    "prompts.student.4":
      "Search technical clauses for tensile and elongation requirements in IS 2062",
    "prompts.student.5":
      "Evolution of energy efficiency and BEE star rating test protocols in IS 1391",
    "prompts.student.6":
      "Standard testing methods for cement compressive strength under IS 4031",
    "prompts.admin.1":
      "What are the active Quality Control Orders (QCOs) in effect?",
    "prompts.admin.2":
      "Audit compliance checklist for BIS recognized testing laboratories",
    "prompts.admin.3":
      "Standards revision roadmap and committee review process",
  },
  [IndianLanguage.HI]: {
    "nav.standards": "मानक",
    "nav.find_standard": "अपना मानक खोजें",
    "nav.catalogue": "मानक सूची",
    "nav.certification": "प्रमाणन",
    "nav.testing": "परीक्षण",
    "nav.labs": "प्रयोगशालाएं",
    "nav.hallmark": "हॉलमार्क",
    "nav.consumer": "उपभोक्ता",
    "nav.reports": "रिपोर्ट",
    "nav.ask_bis_ai": "पूछें BIS AI",
    "nav.ask_ai": "पूछें AI",
    "hero.title": "भारतीय मानकों और बीआईएस सेवाओं के लिए आपका एआई सहायक",
    "hero.subtitle":
      "सही मानक खोजें, प्रमाणन योजनाओं को समझें, हॉलमार्किंग और परीक्षण खंडों को प्रामाणिक साक्ष्य-आधारित एआई से सत्यापित करें।",
    "hero.select_profile": "अपनी प्रोफ़ाइल मोड चुनें:",
    "hero.search_placeholder":
      "उत्पाद मानकों, स्कीम I/सीआरएस प्रमाणन, लैब परीक्षण या क्लॉज़ के बारे में पूछें...",
    "hero.ask_ai_btn": "पूछें AI",
    "hero.suggested_queries": "सुझाए गए प्रश्न:",
    "chat.new_session": "+ नया चैट सत्र",
    "chat.specialized_tools": "बीआईएस विशेषज्ञ उपकरण",
    "chat.find_standard": "अपना मानक खोजें",
    "chat.certification_schemes": "प्रमाणन योजनाएं",
    "chat.testing_requirements": "परीक्षण आवश्यकताएं",
    "chat.find_lab": "मान्यता प्राप्त लैब खोजें",
    "chat.generate_report": "अनुपालन रिपोर्ट तैयार करें",
    "chat.active_workspace": "सक्रिय कार्यक्षेत्र",
    "chat.current_investigation": "वर्तमान अनुसंधान",
    "chat.grounded_active": "साक्ष्य-आधारित पुनर्प्राप्ति सक्रिय",
    "chat.grounded_desc": "प्रकाशित राजपत्र अधिसूचनाओं से सत्यापित उत्तर।",
    "chat.conversation_title": "बीआईएस सारथी संवाद",
    "chat.mode": "मोड:",
    "chat.language_label": "भाषा:",
    "chat.evidence_panel_btn": "साक्ष्य पैनल",
    "chat.welcome_title": "बीआईएस सारथी — साक्ष्य-समर्थित निर्णय सहायक",
    "chat.input_placeholder":
      "मानकों, प्रमाणन, परीक्षण विधियों, लैब साख या धाराओं के बारे में पूछें...",
    "chat.send_btn": "भेजें",
    "chat.answer_language": "उत्तर भाषा",
    "chat.detected_language": "पहचानी गई भाषा",
    "chat.evidence_panel": "प्रामाणिक साक्ष्य और उद्धरण",
    "chat.confidence": "विश्वसनीयता स्तर",
    "chat.source_freshness": "सत्यापित स्रोत",
    "chat.searching_status":
      "बीआईएस रिपॉजिटरी में खोज और धाराएं निकाली जा रही हैं...",
    "chat.traceable_citations": "प्रामाणिक उद्धरण एवं संदर्भ:",
    "chat.copy_answer": "उत्तर कॉपी करें",
    "chat.copied": "कॉपी किया गया",
    "chat.helpful": "उपयोगी उत्तर",
    "chat.not_helpful": "अनुपयोगी",
    "chat.report_citation": "अशुद्ध उद्धरण की रिपोर्ट करें",
    "chat.disclaimer":
      "सटीकता गारंटी: बीआईएस सारथी कभी भी मानक संख्या या वैधानिक आवश्यकताएं मनगढ़ंत नहीं करता।",
    "chat.bis_act_compliant": "बीआईएस अधिनियम 2016 के अनुरूप",
    "evidence.title": "प्रामाणिक साक्ष्य और उद्धरण",
    "evidence.indian_standard": "भारतीय मानक",
    "evidence.clause": "खंड:",
    "evidence.page": "पृष्ठ:",
    "evidence.publication": "प्रकाशन तिथि:",
    "evidence.relevance": "प्रासंगिकता:",
    "evidence.freshness_notice": "नवीनता सूचना:",
    "evidence.verbatim_excerpt": "मूल मानक धारा उद्धरण",
    "evidence.copy_excerpt": "उद्धरण कॉपी करें",
    "evidence.copied": "कॉपी किया गया",
    "evidence.view_source": "आधिकारिक बीआईएस पोर्टल पर स्रोत देखें",
    "evidence.no_evidence_title": "कोई साक्ष्य संदर्भित नहीं है",
    "evidence.no_evidence_desc":
      "बीआईएस मानक धाराओं और राजपत्र अंशों का निरीक्षण करने के लिए कोई प्रश्न पूछें या मानक चुनें।",
    "common.loading": "बीआईएस आरएजी इंजन से उत्तर तैयार हो रहा है...",
    "common.error": "प्रक्रिया पूरी करने में असमर्थ। कृपया पुनः प्रयास करें।",
    "header.subtitle": "भारतीय मानक बुद्धिमत्ता",
    "home.how_subtitle_prefix": "कठोर पालन",
    "home.how_subtitle_bold":
      '"पहले खोजें → फिर तर्क करें → सब कुछ उद्धृत करें"',
    "home.mode_industry": "उद्योग / एमएसएमई",
    "home.mode_consumer": "उपभोक्ता",
    "home.mode_student": "छात्र / शोधकर्ता",
    "home.mode_admin": "प्रशासन और विनियामक",
    "home.mode_consumer_placeholder":
      "सोने की हॉलमार्क HUID जांचें, ISI मार्क सत्यापित करें...",
    "home.mode_student_placeholder":
      "मानक खंड खोजें, तुलनात्मक विश्लेषण, परीक्षण सूत्र...",
    "home.mode_admin_placeholder":
      "मानक, योजनाएं, रिपोर्ट या प्रशासनिक दिशानिर्देश खोजें...",
    "home.features_title": "भारतीय मानक ब्यूरो की व्यापक जानकारी",
    "home.features_subtitle":
      "निर्माताओं, अनुपालन अधिकारियों, उपभोक्ताओं और शोधकर्ताओं के लिए संरचित मॉड्यूल।",
    "home.features_find_title": "मानक खोज कार्यप्रवाह",
    "home.features_find_badge": "एआई प्रोफाइलर",
    "home.features_find_tag": "उत्पाद मिलान",
    "home.features_find_desc":
      "चरण-दर-चरण उत्पाद प्रोफाइलर जो आपके उत्पाद को भारतीय मानकों से मिलाता है।",
    "home.features_find_action": "प्रोफाइलर शुरू करें →",
    "home.features_cert_title": "प्रमाणन योजनाएं और रोडमैप",
    "home.features_cert_badge": "ISI और CRS",
    "home.features_cert_tag": "ऑडिट और FMCS",
    "home.features_cert_desc":
      "स्कीम I (ISI मार्क), स्कीम II (CRS), स्कीम IV और FMCS को समझें।",
    "home.features_cert_action": "योजनाएं देखें →",
    "home.features_testing_title": "परीक्षण आवश्यकताएं और खंड",
    "home.features_testing_badge": "खंड",
    "home.features_testing_tag": "नमूना अनुसूची",
    "home.features_testing_desc":
      "स्वीकृति मानदंड, नमूना नियम और परीक्षण उपकरण आवश्यकताएं।",
    "home.features_testing_action": "परीक्षण अनुसूची देखें →",
    "home.features_labs_title": "बीआईएस मान्यता प्राप्त प्रयोगशाला खोजक",
    "home.features_labs_badge": "लैब नेटवर्क",
    "home.features_labs_tag": "NABL और BIS सुविधाएं",
    "home.features_labs_desc":
      "NABL और BIS मान्यता प्राप्त परीक्षण सुविधाओं को फ़िल्टर करें।",
    "home.features_labs_action": "मान्यता प्राप्त लैब खोजें →",
    "home.features_hallmark_title": "सोना और चांदी हॉलमार्किंग सहायक",
    "home.features_hallmark_badge": "HUID जांच",
    "home.features_hallmark_tag": "शुद्धता और परख",
    "home.features_hallmark_desc":
      "22K (916), 18K (750) और 14K (585) शुद्धता समझें। 6-अंकीय HUID कोड सत्यापित करें।",
    "home.features_hallmark_action": "हॉलमार्किंग मार्गदर्शन →",
    "home.features_consumer_title": "उपभोक्ता संरक्षण और ISI जांच",
    "home.features_consumer_badge": "सत्यापित और रिपोर्ट",
    "home.features_consumer_tag": "शिकायत निवारण",
    "home.features_consumer_desc":
      "ISI मार्क CM/L लाइसेंस नंबर सत्यापित करें, नकली मार्क पहचानें।",
    "home.features_consumer_action": "उपभोक्ता हब →",
    "home.how_title": "BIS सारथी कैसे काम करता है",
    "home.how_badge": "वास्तुकला और सत्यापन पाइपलाइन",
    "home.how_step1_title": "प्रश्न पूछें",
    "home.how_step1_desc":
      "हिंदी, अंग्रेजी या 22 भारतीय भाषाओं में से किसी में भी प्रश्न पूछें।",
    "home.how_step2_title": "खोजें",
    "home.how_step2_desc": "BIS रिपॉजिटरी में हाइब्रिड BM25 + वेक्टर खोज।",
    "home.how_step3_title": "सत्यापित करें",
    "home.how_step3_desc": "क्रॉस-एनकोडर रैंकिंग और स्रोत ताजगी सत्यापन।",
    "home.how_step4_title": "समझाएं",
    "home.how_step4_desc": "सरल भाषा में स्पष्ट मार्गदर्शन।",
    "home.how_step5_title": "उद्धृत करें",
    "home.how_step5_desc":
      "हर दावा मानक संख्या, खंड, पृष्ठ और लिंक से जोड़ा गया।",
    "home.trust_badge": "शून्य-मतिभ्रम परिचालन मानक",
    "home.trust_title": "एमएसएमई, अनुपालन टीमों और नागरिकों द्वारा विश्वसनीय",
    "home.trust_desc":
      "BIS सारथी कभी भी भारतीय मानक संख्या, परीक्षण खंड या लैब मान्यता का आविष्कार नहीं करता।",
    "home.trust_action": "AI कार्यक्षेत्र लॉन्च करें →",
    "standards.badge": "भारतीय मानक ब्यूरो भंडार",
    "standards.title": "भारतीय मानक निर्देशिका और खोज",
    "standards.subtitle":
      "प्रामाणिक भारतीय मानक (IS), तकनीकी दायरे, अनिवार्य QCO और परीक्षण खंड खोजें।",
    "standards.search_placeholder": "IS नंबर या कीवर्ड से खोजें...",
    "standards.search_btn": "खोजें",
    "standards.filter_division": "विभाग:",
    "standards.filter_all": "सभी विभाग",
    "standards.filter_mandatory": "केवल अनिवार्य QCO",
    "standards.div_mech": "यांत्रिक इंजीनियरिंग",
    "standards.div_civil": "सिविल इंजीनियरिंग",
    "standards.div_electro": "इलेक्ट्रोटेक्निकल",
    "standards.div_met": "धातुकर्म इंजीनियरिंग",
    "standards.div_food": "खाद्य और कृषि",
    "standards.loading_msg": "BIS भंडार से मानक प्राप्त किए जा रहे हैं...",
    "standards.loading_sub":
      "विभाग फ़िल्टर और QCO दायरे लागू किए जा रहे हैं...",
    "standards.empty_title": "कोई भारतीय मानक नहीं मिला",
    "standards.empty_desc": "खोज क्वेरी को व्यापक बनाएं या फ़िल्टर रीसेट करें।",
    "standards.empty_action": "फ़िल्टर रीसेट करें",
    "findstd.badge": "एआई उत्पाद प्रोफाइलर",
    "findstd.title_prefix": "लागू खोजें",
    "findstd.title_highlight": "भारतीय मानक",
    "findstd.subtitle":
      "अपने उत्पाद की विशिष्टताएं दर्ज करें और लागू भारतीय मानक प्राप्त करें।",
    "findstd.anti_badge": "अनुमान-विरोधी मानक",
    "findstd.anti_desc":
      "अंतिम ग्रेड वर्गीकरण वैधानिक QCO के विरुद्ध सत्यापित करें।",
    "findstd.form_title": "उत्पाद विशिष्टता प्रपत्र",
    "findstd.form_subtitle": "सटीक मानक मिलान के लिए अधिकतम विवरण प्रदान करें।",
    "findstd.field_product": "उत्पाद नाम / प्रकार",
    "findstd.field_material": "कच्चा माल संरचना",
    "findstd.field_application": "इच्छित अनुप्रयोग / उपयोग",
    "findstd.field_industry": "उद्योग / क्षेत्र",
    "findstd.field_capacity": "क्षमता / आकार",
    "findstd.field_techspec": "तकनीकी विशिष्टताएं",
    "findstd.placeholder_product":
      "उदा. स्टेनलेस स्टील वाटर बोटल, PVC केबल, TMT बार",
    "findstd.placeholder_material": "उदा. SS 304, एल्युमिनियम मिश्र धातु",
    "findstd.placeholder_application": "उदा. पेयजल भंडारण, भवन निर्माण",
    "findstd.placeholder_industry": "उदा. धातुकर्म, खाद्य और कृषि, सिविल",
    "findstd.placeholder_capacity": "उदा. 750 मिलीलीटर, 1.1kV, 12mm",
    "findstd.placeholder_techspec": "उदा. वोल्टेज रेटिंग 1.1kV, डबल वॉल",
    "findstd.btn_evaluate": "लागू मानकों का मूल्यांकन करें",
    "findstd.btn_clear": "साफ़ करें",
    "findstd.btn_sample": "नमूना मूल्यांकन चलाएं",
    "findstd.results_title": "मूल्यांकित भारतीय मानक",
    "findstd.results_complete": "आधारित मूल्यांकन पूर्ण",
    "findstd.loading_msg":
      "उत्पाद-से-मानक दायरे का मूल्यांकन किया जा रहा है...",
    "findstd.loading_sub":
      "राजपत्र अधिसूचनाएं और सामग्री ग्रेड पैरामीटर स्कैन किए जा रहे हैं...",
    "findstd.empty_title": "अभी तक कोई प्रोफ़ाइल मूल्यांकित नहीं",
    "findstd.empty_desc":
      "बाईं ओर उत्पाद विशिष्टता भरें और लागू मानक प्राप्त करें।",
    "testing.badge": "वैधानिक परीक्षण अनुसूची",
    "testing.title": "भारतीय मानक परीक्षण आवश्यकताएं",
    "testing.subtitle":
      "अनिवार्य बैच परीक्षण, स्वीकृति मानदंड, नमूना नियम और परीक्षण उपकरण देखें।",
    "testing.filter_placeholder":
      "मानक संख्या से फ़िल्टर करें (उदा. IS 17526, IS 10500)...",
    "testing.btn_filter": "परीक्षण फ़िल्टर करें",
    "testing.btn_showall": "सभी परीक्षण दिखाएं",
    "testing.loading_msg":
      "परीक्षण खंड और स्वीकृति पैरामीटर प्राप्त किए जा रहे हैं...",
    "testing.loading_sub":
      "प्रयोगशाला परीक्षण विधियों को क्रॉस-रेफरेंस किया जा रहा है...",
    "testing.empty_title": "कोई परीक्षण आवश्यकता नहीं मिली",
    "testing.empty_desc":
      "IS 17526, IS 10500 या IS 1786 जैसे मानक संख्या के साथ खोजें।",
    "labs.badge": "मान्यता प्राप्त परीक्षण अवसंरचना",
    "labs.title": "बीआईएस मान्यता प्राप्त प्रयोगशाला खोजें",
    "labs.subtitle":
      "भारतीय राज्यों और शहरों में NABL और BIS मान्यता प्राप्त प्रयोगशालाएं खोजें।",
    "labs.search_placeholder": "भारतीय मानक संख्या से खोजें (उदा. IS 17526)...",
    "labs.btn_filter": "लैब फ़िल्टर करें",
    "labs.filter_state": "राज्य:",
    "labs.filter_allstates": "सभी राज्य",
    "labs.loading_msg":
      "मान्यता प्राप्त परीक्षण प्रयोगशालाएं खोजी जा रही हैं...",
    "labs.loading_sub": "मान्यता प्राप्त परीक्षण पैरामीटर मिलाए जा रहे हैं...",
    "labs.empty_title": "कोई प्रयोगशाला नहीं मिली",
    "labs.empty_desc": "मानक फ़िल्टर हटाएं या सभी राज्य चुनें।",
    "labs.empty_action": "सभी प्रयोगशालाएं देखें",
    "hallmarking.badge": "कीमती धातु शुद्धता आश्वासन",
    "hallmarking.title_prefix": "सोना और चांदी",
    "hallmarking.title_highlight": "हॉलमार्किंग सहायक",
    "hallmarking.subtitle":
      "मानक शुद्धता ग्रेड समझें, 6-अंकीय HUID कोड सत्यापित करें और परख केंद्र खोजें।",
    "hallmarking.mandate_badge": "बीआईएस हॉलमार्किंग अनिवार्यता",
    "hallmarking.mandate_desc":
      "अधिसूचित जिलों में अनिवार्य हॉलमार्किंग। सोने के आभूषण पर केवल 3 निशान अनुमत।",
    "hallmarking.3marks_title": "सोने के आभूषण पर 3 अनिवार्य निशान",
    "hallmarking.3marks_note": "जुलाई 2021 से प्रचालन में",
    "hallmarking.verify_tag": "उपभोक्ता सत्यापन उपकरण",
    "hallmarking.verify_title": "6-अंकीय HUID संरचना सत्यापित करें",
    "hallmarking.verify_subtitle":
      "आभूषण खरीदने से पहले किसी भी 6-अंकीय HUID कोड का परीक्षण करें।",
    "hallmarking.verify_placeholder": "6-अंकीय HUID दर्ज करें (उदा. A1B2C3)",
    "hallmarking.btn_validate": "प्रारूप सत्यापित करें",
    "hallmarking.verify_howto": "BIS Care App पर इसे कैसे सत्यापित करें:",
    "hallmarking.verify_safety": "उपभोक्ता सुरक्षा और अधिकार युक्तियां:",
    "hallmarking.grades_title":
      "आधिकारिक सोना और चांदी शुद्धता ग्रेड (IS 1417 और IS 2112)",
    "hallmarking.comp_badge": "वैधानिक 2X मुआवजा नीति",
    "hallmarking.comp_title": "उपभोक्ता संरक्षण गारंटी",
    "hallmarking.loading_msg":
      "हॉलमार्किंग मानक और शुद्धता अनुसूची लोड हो रही हैं...",
    "hallmarking.loading_sub":
      "IS 1417 और IS 2112 वैधानिक चिह्न प्राप्त किए जा रहे हैं...",
    "reports.badge": "निर्णय समर्थन दस्तावेज़",
    "reports.title": "BIS अनुपालन रोडमैप रिपोर्ट",
    "reports.btn_print": "प्रिंट / PDF के रूप में सहेजें",
    "reports.doc_header": "सरकारी अनुपालन मूल्यांकन दस्तावेज़",
    "reports.doc_title": "BIS उत्पाद अनुपालन और अनुरूपता रोडमैप",
    "reports.section1": "1. लक्ष्य उत्पाद प्रोफ़ाइल",
    "reports.label_product": "मूल्यांकित उत्पाद:",
    "reports.label_primarystd": "प्राथमिक लागू मानक:",
    "reports.section2": "2. लागू भारतीय मानक और QCO आदेश",
    "reports.tag_mandatory": "अनिवार्य",
    "reports.label_regulatory": "नियामक अधिसूचना:",
    "reports.section3": "3. लागू BIS प्रमाणन योजना",
    "reports.label_validity": "वैधता:",
    "reports.label_surveillance": "निगरानी:",
    "reports.section4": "4. अनिवार्य परीक्षण आवश्यकताएं",
    "reports.col_test": "परीक्षण पैरामीटर",
    "reports.col_clause": "मानक खंड",
    "reports.col_type": "प्रकार",
    "reports.col_sampling": "नमूना नियम",
    "reports.section5": "5. अनुशंसित परीक्षण प्रयोगशालाएं",
    "reports.section6": "6. वैधानिक दस्तावेज़ीकरण चेकलिस्ट",
    "reports.section7": "मुख्य वैधानिक अनुपालन त्रुटियां:",
    "reports.disclaimer_title": "अधिकृत अनुपालन नोटिस:",
    "reports.loading_msg":
      "BIS अनुपालन मूल्यांकन रिपोर्ट तैयार की जा रही है...",
    "reports.loading_sub":
      "लागू मानक, परीक्षण अनुसूची और साक्ष्य संकलित किए जा रहे हैं...",
    "certification.badge": "बीआईएस अनुरूपता मूल्यांकन योजनाएं",
    "certification.title": "प्रमाणन योजनाएं और अनुपालन रोडमैप",
    "certification.subtitle":
      "वैधानिक अनुरूपता योजनाएं, फैक्ट्री ऑडिट और लाइसेंस प्रक्रिया समझें।",
    "certification.btn_report": "पूर्ण अनुपालन रिपोर्ट तैयार करें",
    "certification.active_product": "सक्रिय उत्पाद रोडमैप:",
    "certification.btn_change": "उत्पाद प्रोफ़ाइल बदलें →",
    "certification.roadmap_title": "चरण-दर-चरण प्रमाणन यात्रा",
    "certification.phases": "चरण",
    "certification.details_tag": "योजना विवरण",
    "certification.docs_title": "आवश्यक वैधानिक दस्तावेज़:",
    "certification.fee_title": "शुल्क संरचना:",
    "certification.validity": "वैधता:",
    "certification.surveillance": "निगरानी:",
    "certification.link_official": "आधिकारिक Manakonline / CRS पोर्टल",
    "certification.loading_msg": "प्रमाणन योजना आवश्यकताएं लोड हो रही हैं...",
    "certification.loading_sub":
      "दस्तावेज़ीकरण चेकलिस्ट और ऑडिट अनुसूची संकलित की जा रही हैं...",
    "consumer.badge": "नागरिक और उपभोक्ता संरक्षण",
    "consumer.title_prefix": "उपभोक्ता सुरक्षा और",
    "consumer.title_highlight": "ISI मार्क सत्यापन हब",
    "consumer.subtitle":
      "ISI मार्क CM/L लाइसेंस नंबर सत्यापित करें, नकली चिह्न पहचानें।",
    "consumer.helpline_badge": "टोल-फ्री उपभोक्ता हेल्पलाइन",
    "consumer.helpline_number": "1800-11-4000",
    "consumer.verify_tag": "लाइसेंस प्रमाणीकरण",
    "consumer.verify_title": "ISI मार्क CM/L नंबर सत्यापित करें",
    "consumer.verify_subtitle": "7 या 8-अंकीय लाइसेंस कोड दर्ज करें।",
    "consumer.verify_placeholder": "7 या 8-अंकीय CM/L नंबर दर्ज करें",
    "consumer.btn_check": "लाइसेंस संरचना जांचें",
    "consumer.checklist_auth": "प्रामाणिकता सत्यापन चेकलिस्ट:",
    "consumer.checklist_fraud": "लाल झंडा धोखाधड़ी संकेतक:",
    "consumer.link_biscare": "आधिकारिक BIS Care नागरिक ऐप डाउनलोड करें",
    "consumer.complaint_title": "नकली शिकायत कैसे दर्ज करें",
    "consumer.complaint_desc":
      "BIS Care ऐप या e-BIS पोर्टल के माध्यम से गुमनाम रिपोर्ट जमा करें।",
    "consumer.categories_title": "प्रमुख अनिवार्य उपभोक्ता श्रेणियां",
    "consumer.categories_desc":
      "उत्पाद जिन्हें भारत में खुदरा बिक्री से पहले ISI मार्क की आवश्यकता है:",
    "consumer.cat_packaged_water": "पैकेज्ड पेयजल",
    "consumer.cat_cement": "सीमेंट",
    "consumer.cat_steel_tmt": "स्टील TMT बार",
    "consumer.cat_pvc_pipes": "PVC पाइप",
    "consumer.cat_electrical": "विद्युत उपकरण",
    "consumer.cat_food_dairy": "खाद्य और डेयरी उत्पाद",
    "consumer.cat_lpg": "LPG सिलेंडर",
    "consumer.cat_gold": "सोने के आभूषण",
    "footer.description":
      "भारतीय मानकों, प्रमाणन योजनाओं, प्रयोगशाला परीक्षण और हॉलमार्किंग के लिए एआई-संचालित मंच।",
    "footer.tagline": "पहले खोजें → फिर तर्क करें → सब कुछ उद्धृत करें",
    "footer.portals_title": "BIS पोर्टल",
    "footer.ebis": "e-BIS पोर्टल",
    "footer.manakonline": "मानकऑनलाइन (स्कीम I)",
    "footer.crs": "CRS पोर्टल (इलेक्ट्रॉनिक्स)",
    "footer.nabl": "NABL निर्देशिका",
    "footer.modules_title": "मुख्य मॉड्यूल",
    "footer.find_standard": "अपना मानक खोजें",
    "footer.certification": "प्रमाणन योजनाएं",
    "footer.testing": "परीक्षण आवश्यकताएं",
    "footer.labs": "मान्यता प्राप्त लैब खोजक",
    "footer.hallmarking": "सोना और चांदी हॉलमार्किंग",
    "footer.legal_title": "कानूनी और गुणवत्ता नोटिस",
    "footer.legal_text":
      "दी गई जानकारी प्रकाशित भारतीय मानकों और राजपत्र अधिसूचनाओं पर आधारित है।",
    "footer.admin_link": "प्रशासन और मूल्यांकन कंसोल →",
    "footer.copyright":
      "BIS सारथी। भारतीय उद्योग, एमएसएमई और नागरिकों के लिए निर्मित।",
    "footer.consumer_grievance": "उपभोक्ता शिकायत",
    "footer.ai_support": "एआई निर्णय समर्थन",
    "prompts.industry.1":
      "मैं स्टेनलेस स्टील वाटर बोटल बनाता हूं। कौन सा मानक लागू होता है?",
    "prompts.industry.2":
      "क्या लिथियम-आयन पावर बैंक के लिए BIS प्रमाणन आवश्यक है?",
    "prompts.industry.3":
      "IS 1786 के तहत TMT स्टील बार के लिए कौन से परीक्षण आवश्यक हैं?",
    "prompts.industry.4":
      "स्कीम-I के लिए फैक्ट्री ऑडिट और नमूना परीक्षण प्रक्रिया क्या है?",
    "prompts.industry.5":
      "भारत निर्यात करने वाले विदेशी निर्माताओं के लिए FMCS दिशानिर्देश",
    "prompts.industry.6":
      "IS 302 विद्युत उपकरणों के लिए आवश्यक लैब परीक्षण उपकरण",
    "prompts.consumer.1":
      "6-अंकीय HUID के साथ सोने के आभूषण का हॉलमार्क कैसे सत्यापित करें?",
    "prompts.consumer.2":
      "पैकेज्ड वाटर पर ISI मार्क की प्रामाणिकता कैसे जांचें?",
    "prompts.consumer.3":
      "दोषपूर्ण ISI प्रमाणित सामान के खिलाफ उपभोक्ता शिकायत कैसे दर्ज करें?",
    "prompts.consumer.4": "BIS हॉलमार्क और 916 शुद्धता मार्क के बीच अंतर।",
    "prompts.consumer.5": "क्या स्मार्टफोन के लिए BIS पंजीकरण अनिवार्य है?",
    "prompts.consumer.6":
      "CRS योजना के तहत इलेक्ट्रॉनिक्स पर R-नंबर कैसे सत्यापित करें?",
    "prompts.student.1":
      "IS 10500 खंड 4.2 पेयजल TDS और भारी धातु सीमाएं समझाएं",
    "prompts.student.2":
      "IS 456 मानकों और Eurocode 2 के बीच तुलनात्मक विश्लेषण",
    "prompts.student.3": "NBC 2016 में नवीनतम संशोधन क्या हैं?",
    "prompts.student.4":
      "IS 2062 में तन्यता और बढ़ाव आवश्यकताओं के लिए तकनीकी खंड खोजें",
    "prompts.student.5":
      "IS 1391 में ऊर्जा दक्षता और BEE स्टार रेटिंग परीक्षण प्रोटोकॉल",
    "prompts.student.6":
      "IS 4031 के तहत सीमेंट संपीड़न शक्ति के लिए मानक परीक्षण विधियां",
    "prompts.admin.1":
      "वर्तमान में लागू सक्रिय गुणवत्ता नियंत्रण आदेश (QCO) क्या हैं?",
    "prompts.admin.2":
      "BIS मान्यता प्राप्त परीक्षण प्रयोगशालाओं के लिए ऑडिट अनुपालन चेकलिस्ट",
    "prompts.admin.3": "मानक संशोधन रोडमैप और समिति समीक्षा प्रक्रिया",
    "consumer.complaint_step1": "1. उत्पाद और पैकेजिंग की स्पष्ट तस्वीरें लें।",

    "consumer.complaint_step2": "2. खुदरा नकद मेमो / GST चालान संरक्षित करें।",

    "consumer.complaint_step3": "3. BIS Care ऐप पर खुदरा विक्रेता के पते के साथ शिकायत जमा करें।",

    "consumer.cat_lpg_cylinders": "LPG नियामक और सिलेंडर",

    "consumer.cat_infant_formula": "शिशु फार्मूला",

    "consumer.cat_immersion_heaters": "इलेक्ट्रिक इमर्शन हीटर",

    "consumer.cat_auto_tyres": "ऑटोमोबाइल टायर",

    "labs.state_maharashtra": "महाराष्ट्र",

    "labs.state_delhi": "दिल्ली",

    "labs.state_uttar_pradesh": "उत्तर प्रदेश",

    "labs.state_karnataka": "कर्नाटक",

    "labs.state_haryana": "हरियाणा",

    "labs.state_tamil_nadu": "तमिलनाडु",

    "labs.state_gujarat": "गुजरात",

  },
  [IndianLanguage.TA]: {
    "nav.standards": "தரநிலைகள்",
    "nav.find_standard": "தரநிலையைக் கண்டறியவும்",
    "nav.catalogue": "தரநிலைகள் பட்டியல்",
    "nav.certification": "சான்றிதழ்",
    "nav.testing": "சோதனை",
    "nav.labs": "ஆய்வகங்கள்",
    "nav.hallmark": "ஹால்மார்க்",
    "nav.consumer": "நுகர்வோர்",
    "nav.reports": "அறிக்கைகள்",
    "nav.ask_bis_ai": "BIS AI-யிடம் கேளுங்கள்",
    "nav.ask_ai": "கேளுங்கள் AI",
    "hero.title":
      "இந்திய தரநிலைகள் மற்றும் BIS சேவைகளுக்கான உங்கள் AI உதவியாளர்",
    "hero.subtitle":
      "சரியான தரநிலையைக் கண்டறியவும், சான்றிதழ் திட்டங்களைப் புரிந்து கொள்ளவும், ஹால்மார்க்கிங்கை சரிபார்க்கவும்.",
    "hero.select_profile": "உங்கள் சுயவிவரப் பயன்முறையைத் தேர்ந்தெடுக்கவும்:",
    "hero.search_placeholder":
      "தயாரிப்பு தரநிலைகள், ISI/CRS சான்றிதழ் பற்றி கேளுங்கள்...",
    "hero.ask_ai_btn": "கேளுங்கள் AI",
    "hero.suggested_queries": "பரிந்துரைக்கப்பட்ட வினவல்கள்:",
    "chat.new_session": "+ புதிய அரட்டை அமர்வு",
    "chat.specialized_tools": "BIS பிரத்யேக கருவிகள்",
    "chat.find_standard": "எனது தரநிலையைக் கண்டறியவும்",
    "chat.certification_schemes": "சான்றிதழ் திட்டங்கள்",
    "chat.testing_requirements": "சோதனை தேவைகள்",
    "chat.find_lab": "அங்கீகரிக்கப்பட்ட ஆய்வகத்தைக் கண்டறியவும்",
    "chat.generate_report": "இணக்க அறிக்கையை உருவாக்கவும்",
    "chat.active_workspace": "செயலில் உள்ள பணியிடம்",
    "chat.current_investigation": "தற்போதைய ஆய்வு",
    "chat.grounded_active": "சான்று அடிப்படையிலான மீட்பு செயலில் உள்ளது",
    "chat.grounded_desc":
      "வெளியிடப்பட்ட அரசு வர்த்தமானி அறிவிப்புகளிலிருந்து சரிபார்க்கப்பட்ட பதில்கள்.",
    "chat.conversation_title": "BIS சாரதி உரையாடல்",
    "chat.mode": "பயன்முறை:",
    "chat.language_label": "மொழி:",
    "chat.evidence_panel_btn": "சான்று குழு",
    "chat.welcome_title": "BIS சாரதி — சான்று அடிப்படையிலான முடிவு உதவியாளர்",
    "chat.input_placeholder":
      "தரநிலைகள், சான்றிதழ், சோதனை முறைகள் அல்லது பிரிவுகள் பற்றி கேளுங்கள்...",
    "chat.send_btn": "அனுப்பு",
    "chat.answer_language": "பதில் மொழி",
    "chat.detected_language": "கண்டறியப்பட்ட மொழி",
    "chat.evidence_panel": "அதிகாரப்பூர்வ சான்றுகள் மற்றும் மேற்கோள்கள்",
    "chat.confidence": "நம்பகத்தன்மை நிலை",
    "chat.source_freshness": "சரிபார்க்கப்பட்ட மூலம்",
    "chat.searching_status":
      "BIS களஞ்சியத்தில் தேடுகிறது மற்றும் பிரிவுகளை மீட்டெடுக்கிறது...",
    "chat.traceable_citations": "கண்காணிக்கக்கூடிய அதிகாரப்பூர்வ மேற்கோள்கள்:",
    "chat.copy_answer": "பதிலை நகலெடு",
    "chat.copied": "நகலெடுக்கப்பட்டது",
    "chat.helpful": "பயனுள்ள பதில்",
    "chat.not_helpful": "பயனற்றது",
    "chat.report_citation": "தவறான மேற்கோளைப் புகாரளிக்கவும்",
    "chat.disclaimer":
      "துல்லிய உத்தரவாதம்: BIS சாரதி இந்திய தரநிலைகளின்படி நம்பகமான பதில்களை மட்டுமே வழங்குகிறது.",
    "chat.bis_act_compliant": "BIS சட்டம் 2016-க்கு இணங்குகிறது",
    "evidence.title": "அதிகாரப்பூர்வ சான்றுகள் மற்றும் மேற்கோள்கள்",
    "evidence.indian_standard": "இந்திய தரநிலை",
    "evidence.clause": "பிரிவு:",
    "evidence.page": "பக்கம்:",
    "evidence.publication": "வெளியீட்டு தேதி:",
    "evidence.relevance": "பொருத்தம்:",
    "evidence.freshness_notice": "புதிய நிலை அறிவிப்பு:",
    "evidence.verbatim_excerpt": "அசல் தரநிலை பிரிவு மேற்கோள்",
    "evidence.copy_excerpt": "மேற்கோளை நகலெடுக்கவும்",
    "evidence.copied": "நகலெடுக்கப்பட்டது",
    "evidence.view_source": "அதிகாரப்பூர்வ BIS தளத்தில் பார்க்கவும்",
    "evidence.no_evidence_title": "எந்த சான்றும் குறிப்பிடப்படவில்லை",
    "evidence.no_evidence_desc":
      "BIS தரநிலை பிரிவுகள் மற்றும் வர்த்தமானி சான்றுகளை ஆய்வு செய்ய ஒரு கேள்வியைக் கேளுங்கள் அல்லது தரநிலையைத் தேர்ந்தெடுக்கவும்.",
    "common.loading": "BIS RAG இன்ஜின் மூலம் பதில் தயாராகிறது...",
    "common.error": "செயல்முறை தோல்வியடைந்தது. இணைப்பைச் சரிபார்க்கவும்.",
    "header.subtitle": "இந்திய தரநிலைகள் நுண்ணறிவு",
    "home.how_subtitle_prefix": "கண்டிப்பான கடைபிடிப்பு",
    "home.how_subtitle_bold":
      '"முதலில் மீட்டு → பிறகு சிந்தி → எல்லாவற்றையும் மேற்கோளிடு"',
    "home.mode_industry": "தொழில் / சிறு தொழில்",
    "home.mode_consumer": "நுகர்வோர்",
    "home.mode_student": "மாணவர் / ஆராய்ச்சியாளர்",
    "home.mode_admin": "நிர்வாகம் & கட்டுப்பாடு",
    "home.mode_consumer_placeholder":
      "தங்க HUID சரிபார்க்கவும், ISI மார்க் நம்பகத்தன்மை சரிபார்க்கவும்...",
    "home.mode_student_placeholder":
      "தரநிலை பிரிவுகள் தேடவும், ஒப்பீட்டு பகுப்பாய்வு...",
    "home.mode_admin_placeholder":
      "தரநிலைகள், திட்டங்கள், அறிக்கைகள் தேடவும்...",
    "home.features_title": "இந்திய தரநிலைகள் பணியகத்தின் விரிவான தகவல்",
    "home.features_subtitle":
      "உற்பத்தியாளர்கள், நுகர்வோர்கள் மற்றும் ஆராய்ச்சியாளர்களுக்கான தொகுக்கப்பட்ட தொகுதிகள்.",
    "home.features_find_title": "தரநிலை கண்டுபிடிப்பு பணிமுறை",
    "home.features_find_badge": "AI புரோஃபைலர்",
    "home.features_find_tag": "தயாரிப்பு பொருத்தம்",
    "home.features_find_desc":
      "உங்கள் தயாரிப்பை இந்திய தரநிலைகளுடன் பொருத்தும் படிப்படியான புரோஃபைலர்.",
    "home.features_find_action": "புரோஃபைலரை தொடங்கவும் →",
    "home.features_cert_title": "சான்றிதழ் திட்டங்கள் & வழிகாட்டி",
    "home.features_cert_badge": "ISI & CRS",
    "home.features_cert_tag": "தணிக்கை & FMCS",
    "home.features_cert_desc":
      "திட்டம் I (ISI மார்க்), திட்டம் II (CRS), திட்டம் IV மற்றும் FMCS புரிந்துகொள்ளுங்கள்.",
    "home.features_cert_action": "திட்டங்களை ஆராயவும் →",
    "home.features_testing_title": "சோதனை தேவைகள் & பிரிவுகள்",
    "home.features_testing_badge": "பிரிவுகள்",
    "home.features_testing_tag": "மாதிரி அட்டவணைகள்",
    "home.features_testing_desc":
      "ஏற்பு அளவுகோல்கள், மாதிரி விதிகள் மற்றும் சோதனை உபகரண தேவைகள்.",
    "home.features_testing_action": "சோதனை அட்டவணைகள் →",
    "home.features_labs_title":
      "BIS அங்கீகரிக்கப்பட்ட ஆய்வகங்கள் கண்டுபிடிப்பாளர்",
    "home.features_labs_badge": "லேப் நெட்வொர்க்",
    "home.features_labs_tag": "NABL & BIS வசதிகள்",
    "home.features_labs_desc":
      "NABL மற்றும் BIS அங்கீகரிக்கப்பட்ட ஆய்வகங்களை மாநிலம் மற்றும் நகரம் மூலம் வடிகட்டுங்கள்.",
    "home.features_labs_action": "அங்கீகரிக்கப்பட்ட லேப் கண்டுபிடிக்கவும் →",
    "home.features_hallmark_title": "தங்கம் & வெள்ளி ஹால்மார்க்கிங் உதவியாளர்",
    "home.features_hallmark_badge": "HUID சரிபார்ப்பு",
    "home.features_hallmark_tag": "தூய்மை & மதிப்பீடு",
    "home.features_hallmark_desc":
      "22K (916), 18K (750) மற்றும் 14K (585) தூய்மை புரிந்துகொள்ளுங்கள்.",
    "home.features_hallmark_action": "ஹால்மார்க்கிங் வழிகாட்டி →",
    "home.features_consumer_title": "நுகர்வோர் பாதுகாப்பு & ISI சரிபார்ப்பு",
    "home.features_consumer_badge": "சரிபார்க்கவும் & அறிக்கை",
    "home.features_consumer_tag": "புகார் தீர்வு",
    "home.features_consumer_desc":
      "ISI மார்க் CM/L உரிம எண்களை சரிபார்க்கவும், போலி நிறுவனங்களை கண்டறியவும்.",
    "home.features_consumer_action": "நுகர்வோர் மையம் →",
    "home.how_title": "BIS சாரதி எப்படி வேலை செய்கிறது",
    "home.how_badge": "கட்டமைப்பு & சரிபார்ப்பு குழாய்",
    "home.how_step1_title": "வினவல் கேளுங்கள்",
    "home.how_step1_desc":
      "தமிழ், ஆங்கிலம் அல்லது 22 இந்திய மொழிகளில் கேளுங்கள்.",
    "home.how_step2_title": "மீட்டெடுக்கவும்",
    "home.how_step2_desc": "BIS களஞ்சியத்தில் BM25 + வெக்டர் தேடல்.",
    "home.how_step3_title": "சரிபார்க்கவும்",
    "home.how_step3_desc":
      "குறுக்கு-குறியாக்க மறு தரவரிசை & மூல தாஜா சரிபார்ப்பு.",
    "home.how_step4_title": "விளக்கவும்",
    "home.how_step4_desc":
      "வைதீக பிரிவுகளிலிருந்து வேறுபட்ட தெளிவான வழிகாட்டுதல்.",
    "home.how_step5_title": "மேற்கோளிடுங்கள்",
    "home.how_step5_desc":
      "ஒவ்வொரு கூற்றும் தரநிலை எண், பிரிவு, பக்கம் மற்றும் இணைப்பிற்கு தொடர்புடையது.",
    "home.trust_badge": "பூஜ்ஜிய மாயை செயல்பாட்டு தரநிலை",
    "home.trust_title":
      "MSMEகள், இணக்க குழுக்கள் & குடிமக்களால் நம்பப்படுகிறது",
    "home.trust_desc":
      "BIS சாரதி ஒருபோதும் இந்திய தரநிலை எண்கள் அல்லது பரிசோதனை விதிமுறைகளை கட்டுக்கதைகள் சொல்வதில்லை.",
    "home.trust_action": "AI பணியிடத்தை தொடங்கவும் →",
    "standards.badge": "இந்திய தரநிலைகள் பணியக களஞ்சியம்",
    "standards.title": "இந்திய தரநிலைகள் தேடல்",
    "standards.subtitle":
      "அதிகாரப்பூர்வ IS தரநிலைகள், கட்டாய QCO மற்றும் சோதனை பிரிவுகள் தேடுங்கள்.",
    "standards.search_placeholder": "IS எண் அல்லது சொல்லால் தேடுங்கள்...",
    "standards.search_btn": "தேடவும்",
    "standards.filter_division": "பிரிவு:",
    "standards.filter_all": "அனைத்து பிரிவுகளும்",
    "standards.filter_mandatory": "கட்டாய QCO மட்டும்",
    "standards.div_mech": "இயந்திர பொறியியல்",
    "standards.div_civil": "சிவில் பொறியியல்",
    "standards.div_electro": "மின்னணு தொழில்நுட்பம்",
    "standards.div_met": "உலோக பொறியியல்",
    "standards.div_food": "உணவு மற்றும் விவசாயம்",
    "standards.loading_msg":
      "BIS களஞ்சியத்திலிருந்து தரநிலைகள் பெறப்படுகின்றன...",
    "standards.loading_sub":
      "பிரிவு வடிகட்டிகள் மற்றும் QCO நியமங்கள் பயன்படுத்தப்படுகின்றன...",
    "standards.empty_title": "இந்திய தரநிலைகள் கிடைக்கவில்லை",
    "standards.empty_desc":
      "தேடல் வினவலை விரிவுபடுத்துங்கள் அல்லது வடிகட்டிகளை மீட்டமைக்கவும்.",
    "standards.empty_action": "வடிகட்டிகளை மீட்டமை",
    "findstd.badge": "AI தயாரிப்பு புரோஃபைலர்",
    "findstd.title_prefix": "பொருந்தும் கண்டுபிடிக்கவும்",
    "findstd.title_highlight": "இந்திய தரநிலை",
    "findstd.subtitle":
      "உங்கள் தயாரிப்பு விவரக்குறிப்புகளை உள்ளிடவும் மற்றும் பொருந்தும் IS பெறவும்.",
    "findstd.anti_badge": "ஊகம்-எதிர்ப்பு தரநிலை",
    "findstd.anti_desc": "இறுதி வர்க்கீகரணத்தை QCO-க்கு எதிராக சரிபார்க்கவும்.",
    "findstd.form_title": "தயாரிப்பு விவரக்குறிப்பு படிவம்",
    "findstd.form_subtitle":
      "துல்லியமான மிலான் கண்டுபிடிப்பிற்கு அதிகமான தகவல்களை வழங்கவும்.",
    "findstd.field_product": "தயாரிப்பு பெயர் / வகை",
    "findstd.field_material": "கச்சா பொருள் கலவை",
    "findstd.field_application": "நோக்கப்பட்ட பயன்பாடு",
    "findstd.field_industry": "தொழில் / துறை",
    "findstd.field_capacity": "கொள்ளளவு / அளவு",
    "findstd.field_techspec": "தொழில்நுட்ப விவரக்குறிப்புகள்",
    "findstd.placeholder_product":
      "எ.கா. தாமிரப் பாட்டில், PVC கேபிள், TMT பார்",
    "findstd.placeholder_material": "எ.கா. SS 304, அலுமினியம் கலவை",
    "findstd.placeholder_application":
      "எ.கா. குடிநீர் சேமிப்பு, கட்டிட நிர்மாணம்",
    "findstd.placeholder_industry": "எ.கா. உலோக, உணவு & விவசாயம், சிவில்",
    "findstd.placeholder_capacity": "எ.கா. 750 மி.லி, 1.1kV, 12mm",
    "findstd.placeholder_techspec": "எ.கா. மின்னழுத்த மதிப்பீடு 1.1kV",
    "findstd.btn_evaluate": "பொருந்தும் தரநிலைகளை மதிப்பீடு செய்யவும்",
    "findstd.btn_clear": "அழிக்கவும்",
    "findstd.btn_sample": "மாதிரி மதிப்பீடு இயக்கவும்",
    "findstd.results_title": "மதிப்பீடு செய்யப்பட்ட இந்திய தரநிலைகள்",
    "findstd.results_complete": "ஆதார மதிப்பீடு நிறைவடைந்தது",
    "findstd.loading_msg":
      "தயாரிப்பு-தரநிலை நோக்கம் மதிப்பீடு செய்யப்படுகிறது...",
    "findstd.loading_sub":
      "ஆவணங்கள் மற்றும் பொருள் தர அளவுருக்கள் ஸ்கேன் செய்யப்படுகின்றன...",
    "findstd.empty_title": "இதுவரை எந்த சுயவிவரமும் மதிப்பிடப்படவில்லை",
    "findstd.empty_desc": "தயாரிப்பு விவரக்குறிப்பு படிவத்தை நிரப்பவும்.",
    "testing.badge": "சட்டப்பூர்வ சோதனை அட்டவணைகள்",
    "testing.title": "இந்திய தரநிலைகள் சோதனை தேவைகள்",
    "testing.subtitle":
      "கட்டாய தொடர்ச்சி சோதனைகள், ஏற்பு அளவுகோல்கள் மற்றும் மாதிரி விதிகள்.",
    "testing.filter_placeholder":
      "தரநிலை எண்ணால் வடிகட்டவும் (எ.கா. IS 17526)...",
    "testing.btn_filter": "சோதனைகளை வடிகட்டவும்",
    "testing.btn_showall": "அனைத்து சோதனைகளும்",
    "testing.loading_msg": "சோதனை பிரிவுகள் பெறப்படுகின்றன...",
    "testing.loading_sub": "ஆய்வக சோதனை முறைகள் குறுக்கு-குறிப்பிட்டுள்ளன...",
    "testing.empty_title": "சோதனை தேவைகள் கிடைக்கவில்லை",
    "testing.empty_desc":
      "IS 17526, IS 10500 அல்லது IS 1786 போன்ற தரநிலை எண்ணுடன் தேடவும்.",
    "labs.badge": "அங்கீகரிக்கப்பட்ட சோதனை உள்கட்டமைப்பு",
    "labs.title": "BIS அங்கீகரிக்கப்பட்ட ஆய்வகத்தை கண்டுபிடிக்கவும்",
    "labs.subtitle":
      "இந்திய மாநிலங்கள் மற்றும் நகரங்களில் NABL மற்றும் BIS அங்கீகரிக்கப்பட்ட ஆய்வகங்கள்.",
    "labs.search_placeholder": "IS எண்ணால் தேடவும் (எ.கா. IS 17526)...",
    "labs.btn_filter": "ஆய்வகங்களை வடிகட்டவும்",
    "labs.filter_state": "மாநிலம்:",
    "labs.filter_allstates": "அனைத்து மாநிலங்களும்",
    "labs.loading_msg":
      "அங்கீகரிக்கப்பட்ட சோதனை ஆய்வகங்கள் கண்டுபிடிக்கப்படுகின்றன...",
    "labs.loading_sub":
      "அங்கீகரிக்கப்பட்ட சோதனை அளவுருக்கள் பொருத்தப்படுகின்றன...",
    "labs.empty_title": "ஆய்வகங்கள் கிடைக்கவில்லை",
    "labs.empty_desc":
      "தரநிலை வடிகட்டியை அகற்றவும் அல்லது அனைத்து மாநிலங்களையும் தேர்வு செய்யவும்.",
    "labs.empty_action": "அனைத்து ஆய்வகங்களையும் பாருங்கள்",
    "hallmarking.badge": "விலைமதிப்பற்ற உலோகங்கள் தூய்மை உறுதிப்பாடு",
    "hallmarking.title_prefix": "தங்கம் & வெள்ளி",
    "hallmarking.title_highlight": "ஹால்மார்க்கிங் உதவியாளர்",
    "hallmarking.subtitle":
      "தூய்மை தர அளவுகோல்களை புரிந்துகொள்ளுங்கள், HUID குறியீடுகளை சரிபார்க்கவும்.",
    "hallmarking.mandate_badge": "BIS ஹால்மார்க்கிங் ஆணை",
    "hallmarking.mandate_desc":
      "அறிவிக்கப்பட்ட மாவட்டங்களில் கட்டாய ஹால்மார்க்கிங் நடைமுறையில் உள்ளது.",
    "hallmarking.3marks_title": "தங்க நகைகளில் 3 கட்டாய குறிகள்",
    "hallmarking.3marks_note": "ஜூலை 2021 முதல் செயல்பாட்டில்",
    "hallmarking.verify_tag": "நுகர்வோர் சரிபார்ப்பு கருவி",
    "hallmarking.verify_title": "6-இலக்க HUID அமைப்பை சரிபார்க்கவும்",
    "hallmarking.verify_subtitle":
      "நகை வாங்குவதற்கு முன் எந்த 6-இலக்க HUID குறியீட்டையும் சோதியுங்கள்.",
    "hallmarking.verify_placeholder":
      "6-எழுத்து HUID உள்ளிடவும் (எ.கா. A1B2C3)",
    "hallmarking.btn_validate": "வடிவமைப்பை சரிபார்க்கவும்",
    "hallmarking.verify_howto": "BIS Care App-ல் இதை சரிபார்க்கும் விதம்:",
    "hallmarking.verify_safety": "நுகர்வோர் பாதுகாப்பு உதவிக்குறிப்புகள்:",
    "hallmarking.grades_title":
      "அதிகாரப்பூர்வ தங்கம் & வெள்ளி தூய்மை தர அளவுகோல்கள் (IS 1417 & IS 2112)",
    "hallmarking.comp_badge": "சட்டப்பூர்வ 2X இழப்பீட்டு கொள்கை",
    "hallmarking.comp_title": "நுகர்வோர் பாதுகாப்பு உத்தரவாதம்",
    "hallmarking.loading_msg": "ஹால்மார்க்கிங் தரநிலைகள் ஏற்றப்படுகின்றன...",
    "hallmarking.loading_sub":
      "IS 1417 மற்றும் IS 2112 சட்டப்பூர்வ குறிகள் பெறப்படுகின்றன...",
    "reports.badge": "முடிவு ஆதரவு ஆவணம்",
    "reports.title": "BIS இணக்க வழிகாட்டி அறிக்கை",
    "reports.btn_print": "அச்சிடு / PDF சேமி",
    "reports.doc_header": "அரசு இணக்க மதிப்பீட்டு ஆவணம்",
    "reports.doc_title": "BIS தயாரிப்பு இணக்கம் & ஒத்துழைப்பு வழிகாட்டி",
    "reports.section1": "1. இலக்கு தயாரிப்பு சுயவிவரம்",
    "reports.label_product": "மதிப்பீடு செய்யப்பட்ட தயாரிப்பு:",
    "reports.label_primarystd": "முதன்மை பொருந்தும் தரநிலை:",
    "reports.section2": "2. பொருந்தும் IS மற்றும் QCO ஆணைகள்",
    "reports.tag_mandatory": "கட்டாயம்",
    "reports.label_regulatory": "ஒழுங்குமுறை அறிவிப்பு:",
    "reports.section3": "3. பொருந்தும் BIS சான்றிதழ் திட்டம்",
    "reports.label_validity": "செல்லுபடி:",
    "reports.label_surveillance": "கண்காணிப்பு:",
    "reports.section4": "4. கட்டாய சோதனை தேவைகள்",
    "reports.col_test": "சோதனை அளவுரு",
    "reports.col_clause": "தரநிலை பிரிவு",
    "reports.col_type": "வகை",
    "reports.col_sampling": "மாதிரி விதி",
    "reports.section5": "5. பரிந்துரைக்கப்பட்ட சோதனை ஆய்வகங்கள்",
    "reports.section6": "6. சட்டப்பூர்வ ஆவண சரிபார்ப்பு பட்டியல்",
    "reports.section7": "முக்கிய சட்டப்பூர்வ இணக்க தவறுகள்:",
    "reports.disclaimer_title": "அதிகாரப்பூர்வ இணக்க அறிவிப்பு:",
    "reports.loading_msg": "BIS இணக்க மதிப்பீட்டு அறிக்கை தொகுக்கப்படுகிறது...",
    "reports.loading_sub":
      "பொருந்தும் தரநிலைகள், சோதனை அட்டவணைகள் தொகுக்கப்படுகின்றன...",
    "certification.badge": "BIS இணக்கத்தன்மை மதிப்பீட்டு திட்டங்கள்",
    "certification.title": "சான்றிதழ் திட்டங்கள் & இணக்க வழிகாட்டி",
    "certification.subtitle":
      "சட்டப்பூர்வ இணக்கத்தன்மை திட்டங்கள், தொழிற்சாலை தணிக்கை மற்றும் உரிம நடைமுறைகள்.",
    "certification.btn_report": "முழு இணக்க அறிக்கை உருவாக்கவும்",
    "certification.active_product": "செயலில் உள்ள தயாரிப்பு வழிகாட்டி:",
    "certification.btn_change": "தயாரிப்பு சுயவிவரம் மாற்றவும் →",
    "certification.roadmap_title": "படிப்படியான சான்றிதழ் பயணம்",
    "certification.phases": "கட்டங்கள்",
    "certification.details_tag": "திட்ட விவரங்கள்",
    "certification.docs_title": "சட்டப்பூர்வ ஆவணங்கள் தேவை:",
    "certification.fee_title": "கட்டண அமைப்பு:",
    "certification.validity": "செல்லுபடி:",
    "certification.surveillance": "கண்காணிப்பு:",
    "certification.link_official": "அதிகாரப்பூர்வ Manakonline / CRS போர்டல்",
    "certification.loading_msg": "சான்றிதழ் திட்ட தேவைகள் ஏற்றப்படுகின்றன...",
    "certification.loading_sub":
      "ஆவண சரிபார்ப்பு பட்டியல்கள் தொகுக்கப்படுகின்றன...",
    "consumer.badge": "குடிமக்கள் & நுகர்வோர் பாதுகாப்பு",
    "consumer.title_prefix": "நுகர்வோர் பாதுகாப்பு &",
    "consumer.title_highlight": "ISI மார்க் சரிபார்ப்பு மையம்",
    "consumer.subtitle":
      "ISI மார்க் CM/L உரிம எண்களை சரிபார்க்கவும், போலி குறிகளை கண்டறியவும்.",
    "consumer.helpline_badge": "இலவச நுகர்வோர் உதவி எண்",
    "consumer.helpline_number": "1800-11-4000",
    "consumer.verify_tag": "உரிம சான்றுபடுத்தல்",
    "consumer.verify_title": "ISI மார்க் CM/L எண்ணை சரிபார்க்கவும்",
    "consumer.verify_subtitle": "7 அல்லது 8-இலக்க உரிம குறியீட்டை உள்ளிடவும்.",
    "consumer.verify_placeholder": "7 அல்லது 8-இலக்க CM/L எண் உள்ளிடவும்",
    "consumer.btn_check": "உரிம அமைப்பை சரிபார்க்கவும்",
    "consumer.checklist_auth": "நம்பகத்தன்மை சரிபார்ப்பு பட்டியல்:",
    "consumer.checklist_fraud": "சிவப்பு கொடி மோசடி குறிகாட்டிகள்:",
    "consumer.link_biscare": "அதிகாரப்பூர்வ BIS Care App பதிவிறக்கவும்",
    "consumer.complaint_title": "போலி புகார் கொடுக்கும் விதம்",
    "consumer.complaint_desc":
      "BIS Care App அல்லது e-BIS போர்டல் மூலம் BIS செயல்பாட்டு கிளைக்கு புகார் செய்யவும்.",
    "consumer.categories_title": "முக்கிய கட்டாய நுகர்வோர் பிரிவுகள்",
    "consumer.categories_desc":
      "இந்தியாவில் சில்லறை விற்பனைக்கு முன் ISI மார்க் தேவையான தயாரிப்புகள்:",
    "consumer.cat_packaged_water": "பேக்கேஜ் செய்யப்பட்ட குடிநீர்",
    "consumer.cat_cement": "சிமென்ட்",
    "consumer.cat_steel_tmt": "எஃகு TMT பார்கள்",
    "consumer.cat_pvc_pipes": "PVC குழாய்கள்",
    "consumer.cat_electrical": "மின்சார சாதனங்கள்",
    "consumer.cat_food_dairy": "உணவு & பால் பொருட்கள்",
    "consumer.cat_lpg": "LPG சிலிண்டர்கள்",
    "consumer.cat_gold": "தங்க நகைகள்",
    "footer.description":
      "இந்திய தரநிலைகள், சான்றிதழ் திட்டங்கள், ஆய்வக சோதனை மற்றும் ஹால்மார்க்கிங்கிற்கான AI-இயக்கப்படும் மேடை.",
    "footer.tagline":
      "முதலில் மீட்டு → பிறகு சிந்தி → எல்லாவற்றையும் மேற்கோளிடு",
    "footer.portals_title": "BIS போர்டல்கள்",
    "footer.ebis": "e-BIS போர்டல்",
    "footer.manakonline": "மானக்ஆன்லைன் (திட்டம் I)",
    "footer.crs": "CRS போர்டல் (மின்னணுவியல்)",
    "footer.nabl": "NABL கோப்பகம்",
    "footer.modules_title": "முக்கிய தொகுதிகள்",
    "footer.find_standard": "என் தரநிலையை கண்டுபிடி",
    "footer.certification": "சான்றிதழ் திட்டங்கள்",
    "footer.testing": "சோதனை தேவைகள்",
    "footer.labs": "அங்கீகரிக்கப்பட்ட ஆய்வகங்கள்",
    "footer.hallmarking": "தங்கம் & வெள்ளி ஹால்மார்க்கிங்",
    "footer.legal_title": "சட்ட & தர அறிவிப்பு",
    "footer.legal_text":
      "வழங்கப்பட்ட தகவல்கள் வெளியிடப்பட்ட இந்திய தரநிலைகளிலும் அரசு ஆணைகளிலும் அடிப்படையாக உள்ளன.",
    "footer.admin_link": "நிர்வாக & மதிப்பீட்டு கன்சோல் →",
    "footer.copyright":
      "BIS சாரதி. இந்திய தொழில், MSMEகள் & குடிமக்களுக்காக கட்டமைக்கப்பட்டது.",
    "footer.consumer_grievance": "நுகர்வோர் புகார்",
    "footer.ai_support": "AI முடிவு ஆதரவு",
    "prompts.industry.1":
      "நான் ஸ்டெயின்லெஸ் ஸ்டீல் வாட்டர் பாட்டில்கள் தயாரிக்கிறேன். எந்த தரநிலை பொருந்தும்?",
    "prompts.industry.2":
      "லித்தியம்-அயன் பவர் பேங்க்களுக்கு BIS சான்றிதழ் தேவையா?",
    "prompts.industry.3":
      "IS 1786-ன் கீழ் TMT ஸ்டீல் பார்களுக்கு என்ன சோதனைகள் தேவை?",
    "prompts.industry.4":
      "திட்டம்-I-க்கான தொழிற்சாலை தணிக்கை மற்றும் மாதிரி சோதனை நடைமுறை என்ன?",
    "prompts.industry.5":
      "இந்தியாவிற்கு ஏற்றுமதி செய்யும் வெளிநாட்டு உற்பத்தியாளர்களுக்கான FMCS வழிகாட்டுதல்கள்",
    "prompts.industry.6":
      "IS 302 மின்சார சாதனங்களுக்கான ஆய்வக சோதனை உபகரணங்கள்",
    "prompts.consumer.1":
      "6-இலக்க HUID-உடன் தங்க நகை ஹால்மார்க்கை எவ்வாறு சரிபார்ப்பது?",
    "prompts.consumer.2":
      "பேக்கேஜ் செய்யப்பட்ட தண்ணீரில் ISI மார்க் உண்மையானதா என்று எவ்வாறு சரிபார்ப்பது?",
    "prompts.consumer.3":
      "குறைபாடுள்ள ISI சான்றிதழ் பெற்ற பொருட்களுக்கு எதிராக நுகர்வோர் புகார் கொடுப்பது எப்படி?",
    "prompts.consumer.4":
      "BIS ஹால்மார்க் மற்றும் 916 தூய்மை மார்க் வித்தியாசம்.",
    "prompts.consumer.5": "ஸ்மார்ட்போன்களுக்கு BIS பதிவு கட்டாயமா?",
    "prompts.consumer.6":
      "CRS திட்டத்தின் கீழ் மின்னணுவியலில் R-எண்ணை எவ்வாறு சரிபார்ப்பது?",
    "prompts.student.1":
      "IS 10500 பிரிவு 4.2 குடிநீர் TDS & கனரக உலோக வரம்புகளை விளக்கவும்",
    "prompts.student.2":
      "IS 456 தரநிலைகளும் Eurocode 2-உம் ஒப்பீட்டு பகுப்பாய்வு",
    "prompts.student.3": "NBC 2016-ல் சமீபத்திய திருத்தங்கள் என்ன?",
    "prompts.student.4":
      "IS 2062-ல் தன்மை மற்றும் நீட்சி தேவைகளுக்கான தொழில்நுட்ப பிரிவுகள்",
    "prompts.student.5":
      "IS 1391-ல் ஆற்றல் திறன் மற்றும் BEE நட்சத்திர மதிப்பீடு சோதனை நெறிமுறைகளின் பரிணாமம்",
    "prompts.student.6":
      "IS 4031-ன் கீழ் சிமென்ட் சுருக்கம் வலிமைக்கான நிலையான சோதனை முறைகள்",
    "prompts.admin.1":
      "தற்போது நடைமுறையில் உள்ள சுறுசுறுப்பான தர கட்டுப்பாட்டு ஆணைகள் (QCO) என்ன?",
    "prompts.admin.2":
      "BIS அங்கீகரிக்கப்பட்ட சோதனை ஆய்வகங்களுக்கான தணிக்கை இணக்க சரிபார்ப்பு பட்டியல்",
    "prompts.admin.3":
      "தரநிலை திருத்தம் வழிகாட்டி மற்றும் குழு மதிப்பாய்வு நடைமுறை",
    "consumer.complaint_step1": "1. தயாரிப்பு மற்றும் பேக்கேஜிங்கின் தெளிவான புகைப்படங்களை எடுக்கவும்.",

    "consumer.complaint_step2": "2. சில்லறை விற்பனை ரசீது / GST இன்வாய்ஸை பாதுகாக்கவும்.",

    "consumer.complaint_step3": "3. BIS Care செயலியில் சில்லறை விற்பனையாளர் முகவரியுடன் புகார் சமர்ப்பிக்கவும்.",

    "consumer.cat_lpg_cylinders": "LPG ரெகுலேட்டர்கள் & சிலிண்டர்கள்",

    "consumer.cat_infant_formula": "குழந்தை உணவு",

    "consumer.cat_immersion_heaters": "மின்சார நீர் சூடேற்றிகள்",

    "consumer.cat_auto_tyres": "வாகன டயர்கள்",

    "labs.state_maharashtra": "மகாராஷ்டிரா",

    "labs.state_delhi": "டெல்லி",

    "labs.state_uttar_pradesh": "உத்தரப் பிரதேசம்",

    "labs.state_karnataka": "கர்நாடகா",

    "labs.state_haryana": "ஹரியாணா",

    "labs.state_tamil_nadu": "தமிழ்நாடு",

    "labs.state_gujarat": "குஜராத்",

  },
  [IndianLanguage.TE]: {
    "nav.standards": "ప్రమాణాలు",
    "nav.find_standard": "మీ ప్రమాణాన్ని కనుగొనండి",
    "nav.catalogue": "ప్రమాణాల జాబితా",
    "nav.certification": "ధృవీకరణ",
    "nav.testing": "పరీక్ష",
    "nav.labs": "ప్రయోగశాలలు",
    "nav.hallmark": "హాల్‌మార్క్",
    "nav.consumer": "వినియోగదారు",
    "nav.reports": "నివేదికలు",
    "nav.ask_bis_ai": "BIS AI ని అడగండి",
    "nav.ask_ai": "అడగండి AI",
    "hero.title": "భారతీయ ప్రమాణాలు మరియు BIS సేవల కోసం మీ AI సహాయకుడు",
    "hero.subtitle":
      "సరైన ప్రమాణాన్ని కనుగొనండి, ధృవీకరణ ప్రక్రియలను అర్థం చేసుకోండి మరియు హాల్‌మార్కింగ్‌ను ధృవీకరించండి.",
    "hero.select_profile": "మీ ప్రొఫైల్ మోడ్‌ను ఎంచుకోండి:",
    "hero.search_placeholder":
      "ఉత్పత్తి ప్రమాణాలు, ISI/CRS ధృవీకరణ గురించి అడగండి...",
    "hero.ask_ai_btn": "అడగండి AI",
    "hero.suggested_queries": "సూచించిన ప్రశ్నలు:",
    "chat.new_session": "+ కొత్త చాట్ సెషన్",
    "chat.specialized_tools": "BIS ప్రత్యేక సాధనాలు",
    "chat.find_standard": "నా ప్రమాణాన్ని కనుగొనండి",
    "chat.certification_schemes": "ధృవీకరణ పథకాలు",
    "chat.testing_requirements": "పరీక్ష అవసరాలు",
    "chat.find_lab": "గుర్తింపు పొందిన ల్యాబ్‌ను కనుగొనండి",
    "chat.generate_report": "సమ్మతి నివేదికను రూపొందించండి",
    "chat.active_workspace": "క్రియాశీల వర్క్‌స్పేస్",
    "chat.current_investigation": "ప్రస్తుత పరిశోధన",
    "chat.grounded_active": "ఆధారిత పునరుద్ధరణ సక్రియంగా ఉంది",
    "chat.grounded_desc":
      "ప్రచురించిన గెజిట్ నోటిఫికేషన్ల నుండి ధృవీకరించబడిన సమాధానాలు.",
    "chat.conversation_title": "BIS సారథి సంభాషణ",
    "chat.mode": "మోడ్:",
    "chat.language_label": "భాష:",
    "chat.evidence_panel_btn": "ఆధారాల ప్యానెల్",
    "chat.welcome_title": "BIS సారథి — ఆధారిత నిర్ణయ సహాయకుడు",
    "chat.input_placeholder":
      "ప్రమాణాలు, ధృవీకరణ, పరీక్ష పద్ధతులు లేదా క్లాజుల గురించి అడగండి...",
    "chat.send_btn": "పంపండి",
    "chat.answer_language": "సమాధాన భాష",
    "chat.detected_language": "గుర్తించిన భాష",
    "chat.evidence_panel": "అధికారిక ఆధారాలు మరియు అనులేఖనాలు",
    "chat.confidence": "విశ్వసనీయత స్థాయి",
    "chat.source_freshness": "ధృవీకరించబడిన మూలం",
    "chat.searching_status":
      "BIS రిపోజిటరీలో వెతుకుతోంది మరియు క్లాజులను సేకరిస్తోంది...",
    "chat.traceable_citations": "గుర్తించదగిన అధికారిక అనులేఖనాలు:",
    "chat.copy_answer": "సమాధానాన్ని కాపీ చేయండి",
    "chat.copied": "కాపీ చేయబడింది",
    "chat.helpful": "సహాయకరమైన సమాధానం",
    "chat.not_helpful": "సహాయకరం కాదు",
    "chat.report_citation": "సరికాని అనులేఖనాన్ని నివేదించండి",
    "chat.disclaimer":
      "ఖచ్చితత్వ హామీ: BIS సారథి అధికారిక భారతీయ ప్రమాణాల ఆధారంగా మాత్రమే సమాధానమిస్తుంది.",
    "chat.bis_act_compliant": "BIS చట్టం 2016 కంప్లైంట్",
    "evidence.title": "అధికారిక ఆధారాలు మరియు అనులేఖనాలు",
    "evidence.indian_standard": "భారతీయ ప్రమాణం",
    "evidence.clause": "నియమం:",
    "evidence.page": "పేజీ:",
    "evidence.publication": "ప్రచురణ తేదీ:",
    "evidence.relevance": "ప్రాముఖ్యత:",
    "evidence.freshness_notice": "తాజా సమాచార నోటీసు:",
    "evidence.verbatim_excerpt": "మూల ప్రమాణ నిబంధన భాగం",
    "evidence.copy_excerpt": "కాపీ చేయండి",
    "evidence.copied": "కాపీ చేయబడింది",
    "evidence.view_source": "అధికారిక BIS పోర్టల్‌లో చూడండి",
    "evidence.no_evidence_title": "ఎలాంటి ఆధారం ప్రస్తావించబడలేదు",
    "evidence.no_evidence_desc":
      "BIS ప్రమాణాల నిబంధనలను పరిశీలించడానికి ప్రశ్నను అడగండి లేదా ప్రమాణాన్ని ఎంచుకోండి.",
    "common.loading": "BIS RAG ఇంజిన్ ద్వారా సమాధానం సిద్ధమవుతోంది...",
    "common.error": "ప్రాసెస్ విఫలమైంది. మీ కనెక్షన్‌ని తనిఖీ చేయండి.",

    "header.subtitle": "Indian Standards Intelligence",
    "home.how_subtitle_prefix": "Strict adherence to",
    "home.how_subtitle_bold":
      '"Retrieve First → Reason Second → Cite Everything"',
    "home.mode_industry": "పరిశ్రమ / MSME",
    "home.mode_consumer": "వినియోగదారు",
    "home.mode_student": "విద్యార్థి / పరిశోధకుడు",
    "home.mode_admin": "నిర్వహణ మరియు నియంత్రణ",
    "home.mode_consumer_placeholder":
      "బంగారు HUID పరిశీలించండి, ISI మార్క్ ధృవీకరించండి...",
    "home.mode_student_placeholder":
      "Standard clauses వెతకండి, తులనాత్మక విశ్లేషణ...",
    "home.mode_admin_placeholder":
      "ప్రమాణాలు, పథకాలు, నివేదికలు వెతకండి...",
    "home.features_title": "Bureau of Indian Standards Intelligence",
    "home.features_subtitle":
      "Structured modules for manufacturers, compliance officers, consumers.",
    "home.features_find_title": "Find My Standard Workflow",
    "home.features_find_badge": "AI Profiler",
    "home.features_find_tag": "Product Matching",
    "home.features_find_desc":
      "Step-by-step product profiler matching your product to Indian Standards.",
    "home.features_find_action": "Start Profiler →",
    "home.features_cert_title": "Certification Schemes & Roadmap",
    "home.features_cert_badge": "ISI & CRS",
    "home.features_cert_tag": "Audit & FMCS",
    "home.features_cert_desc":
      "Navigate Scheme I (ISI Mark), Scheme II (CRS), Scheme IV, and FMCS.",
    "home.features_cert_action": "Explore Schemes →",
    "home.features_testing_title": "Testing Requirements & Clauses",
    "home.features_testing_badge": "Clauses",
    "home.features_testing_tag": "Sampling Schedules",
    "home.features_testing_desc":
      "Acceptance criteria, sampling rules, and testing equipment from Indian Standards.",
    "home.features_testing_action": "Inspect Test Schedules →",
    "home.features_labs_title": "BIS Recognized Laboratories Finder",
    "home.features_labs_badge": "Lab Network",
    "home.features_labs_tag": "NABL & BIS Facilities",
    "home.features_labs_desc":
      "Filter NABL and BIS recognized labs by IS number, state, and city.",
    "home.features_labs_action": "Locate Accredited Lab →",
    "home.features_hallmark_title": "Gold & Silver Hallmarking Assistant",
    "home.features_hallmark_badge": "HUID Check",
    "home.features_hallmark_tag": "Purity & Assaying",
    "home.features_hallmark_desc":
      "Verify 6-digit HUID codes and understand gold/silver purity grades.",
    "home.features_hallmark_action": "Hallmarking Guidance →",
    "home.features_consumer_title": "Consumer Protection & ISI Check",
    "home.features_consumer_badge": "Verify & Report",
    "home.features_consumer_tag": "Grievance Redressal",
    "home.features_consumer_desc":
      "Verify ISI Mark CM/L licence numbers, spot counterfeits.",
    "home.features_consumer_action": "Consumer Hub →",
    "home.how_title": "How BIS Saarthi Works",
    "home.how_badge": "Architecture & Verification Pipeline",
    "home.how_step1_title": "Ask Query",
    "home.how_step1_desc":
      "Query in English, Hindi, or any of 22 Scheduled Indian Languages.",
    "home.how_step2_title": "Retrieve",
    "home.how_step2_desc":
      "Hybrid BM25 + Vector semantic search across BIS repository.",
    "home.how_step3_title": "Verify",
    "home.how_step3_desc":
      "Cross-encoder reranking & source freshness verification.",
    "home.how_step4_title": "Explain",
    "home.how_step4_desc":
      "Clear plain-language guidance distinguished from statutory clauses.",
    "home.how_step5_title": "Cite",
    "home.how_step5_desc":
      "Every claim traceable to standard number, clause, page, and link.",
    "home.trust_badge": "Zero Hallucination Operational Standard",
    "home.trust_title": "Trusted by MSMEs, Compliance Teams & Citizens",
    "home.trust_desc":
      "BIS Saarthi never invents Indian Standard numbers, test clauses, or lab recognition statuses.",
    "home.trust_action": "Launch AI Workspace →",
    "standards.badge": "Bureau of Indian Standards Repository",
    "standards.title": "Indian Standards Directory & Search",
    "standards.subtitle":
      "Search authoritative Indian Standards, mandatory QCOs, and testing clause schedules.",
    "standards.search_placeholder": "Search by IS number or keyword...",
    "standards.search_btn": "Search",
    "standards.filter_division": "Division:",
    "standards.filter_all": "All Divisions",
    "standards.filter_mandatory": "Mandatory QCO Only",
    "standards.div_mech": "Mechanical Engineering",
    "standards.div_civil": "Civil Engineering",
    "standards.div_electro": "Electrotechnical",
    "standards.div_met": "Metallurgical Engineering",
    "standards.div_food": "Food and Agriculture",
    "standards.loading_msg": "Retrieving Standards from BIS Repository...",
    "standards.loading_sub":
      "Applying division filters and QCO regulatory scopes...",
    "standards.empty_title": "No Indian Standards Found",
    "standards.empty_desc":
      "Try broadening your search query or reset the filters.",
    "standards.empty_action": "Reset Filters",
    "findstd.badge": "AI Product Scope Profiler",
    "findstd.title_prefix": "Find Applicable",
    "findstd.title_highlight": "Indian Standard",
    "findstd.subtitle":
      "Input product specifications and get matched Indian Standards.",
    "findstd.anti_badge": "Anti-Speculation Standard",
    "findstd.anti_desc":
      "Verify final grade classification against statutory QCOs.",
    "findstd.form_title": "Product Specification Form",
    "findstd.form_subtitle":
      "Provide as many details as possible for precise standard matching.",
    "findstd.field_product": "Product Name / Type",
    "findstd.field_material": "Raw Material Composition",
    "findstd.field_application": "Intended Application / Usage",
    "findstd.field_industry": "Industry / Domain Sector",
    "findstd.field_capacity": "Capacity / Size",
    "findstd.field_techspec": "Technical Specifications",
    "findstd.placeholder_product":
      "e.g. Stainless steel water bottle, PVC cable, TMT bar",
    "findstd.placeholder_material": "e.g. SS 304, Aluminium alloy",
    "findstd.placeholder_application":
      "e.g. Drinking water storage, building construction",
    "findstd.placeholder_industry":
      "e.g. Metallurgical, Food & Agriculture, Civil",
    "findstd.placeholder_capacity": "e.g. 750 ml, 1.1kV, 12mm",
    "findstd.placeholder_techspec":
      "e.g. Voltage rating 1.1kV, double wall insulation",
    "findstd.btn_evaluate": "Evaluate Applicable Standards",
    "findstd.btn_clear": "Clear",
    "findstd.btn_sample": "Run Sample Evaluation",
    "findstd.results_title": "Evaluated Indian Standards",
    "findstd.results_complete": "Grounded Assessment Completed",
    "findstd.loading_msg": "Evaluating Product-to-Standard Scope...",
    "findstd.loading_sub":
      "Scanning Gazette notifications and material grade parameters...",
    "findstd.empty_title": "No Profile Evaluated Yet",
    "findstd.empty_desc":
      "Fill in the product specification form and click Evaluate.",
    "testing.badge": "Statutory Testing Schedules",
    "testing.title": "Indian Standards Testing Requirements",
    "testing.subtitle":
      "Inspect mandatory routine tests, acceptance criteria, and sampling rules.",
    "testing.filter_placeholder":
      "Filter by Standard Number (e.g. IS 17526, IS 10500)...",
    "testing.btn_filter": "Filter Tests",
    "testing.btn_showall": "Show All Tests",
    "testing.loading_msg":
      "Retrieving Testing Clauses & Acceptance Parameters...",
    "testing.loading_sub":
      "Cross-referencing laboratory test methods and sampling frequencies...",
    "testing.empty_title": "No Testing Requirements Found",
    "testing.empty_desc": "Try searching with IS 17526, IS 10500, or IS 1786.",
    "labs.badge": "Accredited Testing Infrastructure",
    "labs.title": "Find a BIS Recognized Laboratory",
    "labs.subtitle":
      "Search NABL and BIS recognized testing labs across Indian states.",
    "labs.search_placeholder":
      "Search by Indian Standard (e.g. IS 17526, IS 14543)...",
    "labs.btn_filter": "Filter Labs",
    "labs.filter_state": "State:",
    "labs.filter_allstates": "All States",
    "labs.loading_msg": "Locating Recognized Testing Laboratories...",
    "labs.loading_sub": "Matching accredited testing parameters...",
    "labs.empty_title": "No Laboratories Found",
    "labs.empty_desc":
      "Try removing the standard filter or choosing All States.",
    "labs.empty_action": "View All Laboratories",
    "hallmarking.badge": "Precious Metals Purity Assurance",
    "hallmarking.title_prefix": "Gold & Silver",
    "hallmarking.title_highlight": "Hallmarking Assistant",
    "hallmarking.subtitle":
      "Understand fineness grades, verify HUID codes, locate hallmarking centres.",
    "hallmarking.mandate_badge": "BIS Hallmarking Mandate",
    "hallmarking.mandate_desc":
      "Mandatory hallmarking operative across notified districts.",
    "hallmarking.3marks_title": "The 3 Mandatory Marks on Gold Jewellery",
    "hallmarking.3marks_note": "Operative since July 2021",
    "hallmarking.verify_tag": "Consumer Verification Tool",
    "hallmarking.verify_title": "Verify 6-Digit Alphanumeric HUID Structure",
    "hallmarking.verify_subtitle":
      "Test any 6-digit HUID code before buying jewellery.",
    "hallmarking.verify_placeholder": "Enter 6-character HUID (e.g. A1B2C3)",
    "hallmarking.btn_validate": "Validate Format",
    "hallmarking.verify_howto": "How to verify on BIS Care App:",
    "hallmarking.verify_safety": "Consumer Safety & Rights Tips:",
    "hallmarking.grades_title":
      "Official Gold & Silver Fineness Grades (IS 1417 & IS 2112)",
    "hallmarking.comp_badge": "Statutory 2X Compensation Policy",
    "hallmarking.comp_title": "Consumer Protection Guarantee",
    "hallmarking.loading_msg":
      "Loading Hallmarking Standards & Fineness Schedules...",
    "hallmarking.loading_sub":
      "Retrieving IS 1417 and IS 2112 statutory markings...",
    "reports.badge": "Decision Support Deliverable",
    "reports.title": "BIS Compliance Roadmap Report",
    "reports.btn_print": "Print / Save as PDF",
    "reports.doc_header": "Government Compliance Assessment Document",
    "reports.doc_title": "BIS Product Compliance & Conformity Roadmap",
    "reports.section1": "1. Target Product Profile",
    "reports.label_product": "Product Evaluated:",
    "reports.label_primarystd": "Primary Applicable Standard:",
    "reports.section2": "2. Applicable Indian Standards & QCO Mandates",
    "reports.tag_mandatory": "Mandatory",
    "reports.label_regulatory": "Regulatory Notification:",
    "reports.section3": "3. Applicable BIS Certification Scheme",
    "reports.label_validity": "Validity:",
    "reports.label_surveillance": "Surveillance:",
    "reports.section4": "4. Mandatory Testing Requirements",
    "reports.col_test": "Test Parameter",
    "reports.col_clause": "Standard Clause",
    "reports.col_type": "Type",
    "reports.col_sampling": "Sampling Rule",
    "reports.section5": "5. Recommended Testing Laboratories",
    "reports.section6": "6. Statutory Documentation Checklist",
    "reports.section7": "Key Statutory Compliance Pitfalls:",
    "reports.disclaimer_title": "Authoritative Compliance Notice:",
    "reports.loading_msg": "Synthesizing BIS Compliance Assessment Report...",
    "reports.loading_sub":
      "Compiling applicable standards, testing schedules, and statutory evidence...",
    "certification.badge": "BIS Conformity Assessment Schemes",
    "certification.title": "Certification Schemes & Compliance Roadmap",
    "certification.subtitle":
      "Understand statutory conformity schemes, factory audits, and licence grant procedures.",
    "certification.btn_report": "Generate Full Compliance Report",
    "certification.active_product": "Active Product Roadmap:",
    "certification.btn_change": "Change Product Profile →",
    "certification.roadmap_title":
      "Interactive Step-by-Step Certification Journey",
    "certification.phases": "Phases",
    "certification.details_tag": "Scheme Details",
    "certification.docs_title": "Statutory Documents Required:",
    "certification.fee_title": "Fee Structure:",
    "certification.validity": "Validity:",
    "certification.surveillance": "Surveillance:",
    "certification.link_official": "Official Manakonline / CRS Portal",
    "certification.loading_msg": "Loading Certification Scheme Requirements...",
    "certification.loading_sub":
      "Compiling documentation checklists and audit schedules...",
    "consumer.badge": "Citizen & Consumer Protection",
    "consumer.title_prefix": "Consumer Safety &",
    "consumer.title_highlight": "ISI Mark Verification Hub",
    "consumer.subtitle":
      "Verify ISI Mark CM/L licence numbers, detect counterfeit markings, access grievance channels.",
    "consumer.helpline_badge": "Toll-Free Consumer Helpline",
    "consumer.helpline_number": "1800-11-4000",
    "consumer.verify_tag": "Licence Authentication",
    "consumer.verify_title": "Verify ISI Mark CM/L Number",
    "consumer.verify_subtitle":
      "Enter the 7 or 8-digit numeric licence code beneath the ISI triangular logo.",
    "consumer.verify_placeholder":
      "Enter 7 or 8-digit CM/L Number (e.g. 1454301)",
    "consumer.btn_check": "Check Licence Structure",
    "consumer.checklist_auth": "Authenticity Verification Checklist:",
    "consumer.checklist_fraud": "Red Flag Fraud Indicators:",
    "consumer.link_biscare": "Download Official BIS Care Citizen App",
    "consumer.complaint_title": "How to Lodge a Counterfeit Complaint",
    "consumer.complaint_desc":
      "Submit an anonymous report to BIS Enforcement Branch via the BIS Care App or e-BIS portal.",
    "consumer.categories_title": "Key Mandatory Consumer Categories",
    "consumer.categories_desc":
      "Products that strictly require the ISI Mark before retail sale in India:",
    "consumer.cat_packaged_water": "Packaged Drinking Water",
    "consumer.cat_cement": "Cement",
    "consumer.cat_steel_tmt": "Steel TMT Bars",
    "consumer.cat_pvc_pipes": "PVC Pipes",
    "consumer.cat_electrical": "Electrical Appliances",
    "consumer.cat_food_dairy": "Food & Dairy Products",
    "consumer.cat_lpg": "LPG Cylinders",
    "consumer.cat_gold": "Gold Jewellery",
    "footer.description":
      "AI-Powered Decision-Support Platform for Indian Standards, Certification Schemes, Laboratory Testing, and Hallmarking.",
    "footer.tagline": "Retrieve First → Reason Second → Cite Everything",
    "footer.portals_title": "BIS Portals",
    "footer.ebis": "e-BIS Portal",
    "footer.manakonline": "Manakonline (Scheme I)",
    "footer.crs": "CRS Portal (Electronics)",
    "footer.nabl": "NABL Directory",
    "footer.modules_title": "Core Modules",
    "footer.find_standard": "Find My Standard",
    "footer.certification": "Certification Schemes",
    "footer.testing": "Testing Requirements",
    "footer.labs": "Recognized Labs Finder",
    "footer.hallmarking": "Gold & Silver Hallmarking",
    "footer.legal_title": "Legal & Quality Notice",
    "footer.legal_text":
      "Information provided is grounded in published Indian Standards and Gazette notifications. Formal legal compliance requires certification grant through official BIS portals.",
    "footer.admin_link": "Admin & Evaluation Console →",
    "footer.copyright":
      "BIS Saarthi. Built for Indian Industry, MSMEs & Citizens.",
    "footer.consumer_grievance": "వినియోగదారు ఫిర్యాదు",
    "footer.ai_support": "AI నిర్ణయ సహాయం",
    "prompts.industry.1":
      "నేను స్టెయిన్‌లెస్ స్టీల్ వాటర్ బాటిల్స్ తయారు చేస్తాను. ఏ ప్రమాణం వర్తిస్తుంది?",
    "prompts.industry.2":
      "లిథియం-అయాన్ పవర్ బ్యాంకులకు BIS ప్రమాణపత్రం అవసరమా?",
    "prompts.industry.3": "IS 1786 క్రింద TMT స్టీల్ బార్లకు ఏ పరీక్షలు అవసరం?",
    "prompts.industry.4":
      "స్కీమ్-I కోసం ఫ్యాక్టరీ ఆడిట్ మరియు నమూనా పరీక్ష ప్రక్రియ ఏమిటి?",
    "prompts.industry.5":
      "భారతదేశానికి ఎగుమతి చేసే విదేశీ తయారీదారుల కోసం FMCS మార్గదర్శకాలు",
    "prompts.industry.6":
      "IS 302 ఎలక్ట్రికల్ ఉపకరణాల కోసం అవసరమైన ప్రయోగశాల పరీక్ష పరికరాలు",
    "prompts.consumer.1":
      "6-అంకెల HUID తో బంగారు ఆభరణాల హాల్‌మార్క్‌ను నేను ఎలా ధృవీకరించాలి?",
    "prompts.consumer.2":
      "ప్యాకేజీ చేసిన నీటిపై ISI మార్క్ నిజమైనదా అని నేను ఎలా తనిఖీ చేయగలను?",
    "prompts.consumer.3":
      "లోపభూయిష్టమైన ISI ధృవీకరించబడిన వస్తువులకు వ్యతిరేకంగా వినియోగదారు ఫిర్యాదు ఎలా దాఖలు చేయాలి?",
    "prompts.consumer.4":
      "BIS హాల్‌మార్క్ మరియు 916 స్వచ్ఛత గుర్తుల మధ్య తేడా.",
    "prompts.consumer.5": "స్మార్ట్ ఫోన్లకు BIS నమోదు తప్పనిసరా?",
    "prompts.student.1":
      "త్రాగునీటి TDS & హెవీ మెటల్ పరిమితులపై IS 10500 క్లాజ్ 4.2 వివరించండి",
    "prompts.student.2":
      "IS 456 ప్రమాణాలు మరియు Eurocode 2 మధ్య తులనాత్మక విశ్లేషణ",
    "prompts.student.3": "NBC 2016కి తాజా సవరణలు ఏమిటి?",
    "prompts.student.5":
      "2015 ముందు ఉపసంహరించిన ఆర్కైవ్ చేయబడిన ప్రమాణాలను ఎలా యాక్సెస్ చేయాలి?",
    "prompts.student.6":
      "IS 1417 మరియు అంతర్జాతీయ ప్రమాణాల మధ్య hallmarking assaying tolerances పోల్చండి",
    "prompts.admin.1":
      "What are the active Quality Control Orders (QCOs) in effect?",
    "prompts.admin.2":
      "Audit compliance checklist for BIS recognized testing laboratories",
    "prompts.admin.3":
      "Standards revision roadmap and committee review process",
  },
  [IndianLanguage.BN]: {
    "nav.standards": "মানক",
    "nav.find_standard": "মানক অনুসন্ধান",
    "nav.catalogue": "মানক তালিকা",
    "nav.certification": "শংসাপত্র",
    "nav.testing": "পরীক্ষা",
    "nav.labs": "গবেষণাগার",
    "nav.hallmark": "হলমার্ক",
    "nav.consumer": "ভোক্তা সুরক্ষা",
    "nav.reports": "প্রতিবেদন",
    "nav.ask_bis_ai": "জিজ্ঞাসা করুন BIS AI",
    "nav.ask_ai": "জিজ্ঞাসা করুন AI",
    "hero.title": "ভারতীয় মানক ও বিআইএস সেবার জন্য আপনার এআই সহায়ক",
    "hero.subtitle":
      "সঠিক মানক খুঁজুন, শংসাপত্র প্রক্রিয়া বুঝুন এবং হলমার্কিং ও পরীক্ষার ধারা যাচাই করুন।",
    "hero.select_profile": "আপনার প্রোফাইল মোড নির্বাচন করুন:",
    "hero.search_placeholder":
      "পণ্য মানক, স্কিম ১/সিআরএস শংসাপত্র বা পরীক্ষা সম্পর্কে জিজ্ঞাসা করুন...",
    "hero.ask_ai_btn": "জিজ্ঞাসা করুন AI",
    "hero.suggested_queries": "প্রস্তাবিত প্রশ্নাবলী:",
    "chat.new_session": "+ নতুন চ্যাট সেশন",
    "chat.specialized_tools": "বিআইএস বিশেষ সরঞ্জাম",
    "chat.find_standard": "আমার মানক খুঁজুন",
    "chat.certification_schemes": "শংসাপত্র প্রকল্প",
    "chat.testing_requirements": "পরীক্ষার প্রয়োজনীয়তা",
    "chat.find_lab": "স্বীকৃত ল্যাব খুঁজুন",
    "chat.generate_report": "কমপ্লায়েন্স রিপোর্ট তৈরি করুন",
    "chat.active_workspace": "সক্রিয় ওয়ার্কস্পেস",
    "chat.current_investigation": "বর্তমান অনুসন্ধান",
    "chat.grounded_active": "প্রমাণ-ভিত্তিক অনুসন্ধান সক্রিয়",
    "chat.grounded_desc": "প্রকাশিত গেজেট বিজ্ঞপ্তি থেকে যাচাইকৃত উত্তর।",
    "chat.conversation_title": "বিআইএস সারথী কথোপকথন",
    "chat.mode": "মোড:",
    "chat.language_label": "ভাষা:",
    "chat.evidence_panel_btn": "প্রমাণ প্যানেল",
    "chat.welcome_title": "বিআইএস সারথী — প্রমাণ-সমর্থিত সিদ্ধান্ত সহায়ক",
    "chat.input_placeholder":
      "মানক, সার্টিফিকেশন, পরীক্ষার পদ্ধতি বা ধারা সম্পর্কে জিজ্ঞাসা করুন...",
    "chat.send_btn": "পাঠান",
    "chat.answer_language": "উত্তরের ভাষা",
    "chat.detected_language": "শনাক্তকৃত ভাষা",
    "chat.evidence_panel": "প্রামাণ্য প্রমাণ ও উদ্ধৃতি",
    "chat.confidence": "আত্মবিশ্বাস স্তর",
    "chat.source_freshness": "উৎস যাচাইকৃত",
    "chat.searching_status":
      "বিআইএস ভাণ্ডারে অনুসন্ধান এবং ধারা বের করা হচ্ছে...",
    "chat.traceable_citations": "সনাক্তযোগ্য প্রামাণ্য উদ্ধৃতিসমূহ:",
    "chat.copy_answer": "উত্তর কপি করুন",
    "chat.copied": "কপি করা হয়েছে",
    "chat.helpful": "উপকারী উত্তর",
    "chat.not_helpful": "উপকারী নয়",
    "chat.report_citation": "ভুল উদ্ধৃতি রিপোর্ট করুন",
    "chat.disclaimer":
      "সঠিকতার নিশ্চয়তা: বিআইএস সারথী ভারতীয় মানকের ভিত্তিতে খাঁটি তথ্য প্রদান করে।",
    "chat.bis_act_compliant": "বিআইএস আইন ২০১৬ অনুবর্তী",
    "evidence.title": "প্রামাণ্য প্রমাণ ও উদ্ধৃতি",
    "evidence.indian_standard": "ভারতীয় মানক",
    "evidence.clause": "ধারা:",
    "evidence.page": "পৃষ্ঠা:",
    "evidence.publication": "প্রকাশের তারিখ:",
    "evidence.relevance": "প্রাসঙ্গিকতা:",
    "evidence.freshness_notice": "উৎস বিজ্ঞপ্তি:",
    "evidence.verbatim_excerpt": "মূল মানক ধারা উদ্ধৃতি",
    "evidence.copy_excerpt": "উদ্ধৃতি কপি করুন",
    "evidence.copied": "কপি করা হয়েছে",
    "evidence.view_source": "অফিসিয়াল BIS পোর্টালে উৎস দেখুন",
    "evidence.no_evidence_title": "কোনো প্রমাণ উল্লেখিত নেই",
    "evidence.no_evidence_desc":
      "BIS মানক ধারা ও প্রমাণ পরীক্ষা করতে প্রশ্ন জিজ্ঞাসা করুন বা মানক নির্বাচন করুন।",
    "common.loading": "বিআইএস আরএজি ইঞ্জিন দ্বারা উত্তর প্রস্তুত করা হচ্ছে...",
    "common.error":
      "অনুরোধ প্রক্রিয়া করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করুন।",

    "header.subtitle": "Indian Standards Intelligence",
    "home.how_subtitle_prefix": "Strict adherence to",
    "home.how_subtitle_bold":
      '"Retrieve First → Reason Second → Cite Everything"',
    "home.mode_industry": "শিল্প / MSME",
    "home.mode_consumer": "ভোক্তা",
    "home.mode_student": "শিক্ষার্থী / গবেষক",
    "home.mode_admin": "প্রশাসন ও নিয়ন্ত্রক",
    "home.mode_consumer_placeholder":
      "সোনার HUID যাচাই করুন, ISI মার্ক যাচাই করুন...",
    "home.mode_student_placeholder":
      "Standard clauses খুঁজুন, তুলনামূলক বিশ্লেষণ...",
    "home.mode_admin_placeholder":
      "মান, পরিকল্পনা, প্রতিবেদন খুঁজুন...",
    "home.features_title": "Bureau of Indian Standards Intelligence",
    "home.features_subtitle":
      "Structured modules for manufacturers, compliance officers, consumers.",
    "home.features_find_title": "Find My Standard Workflow",
    "home.features_find_badge": "AI Profiler",
    "home.features_find_tag": "Product Matching",
    "home.features_find_desc":
      "Step-by-step product profiler matching your product to Indian Standards.",
    "home.features_find_action": "Start Profiler →",
    "home.features_cert_title": "Certification Schemes & Roadmap",
    "home.features_cert_badge": "ISI & CRS",
    "home.features_cert_tag": "Audit & FMCS",
    "home.features_cert_desc":
      "Navigate Scheme I (ISI Mark), Scheme II (CRS), Scheme IV, and FMCS.",
    "home.features_cert_action": "Explore Schemes →",
    "home.features_testing_title": "Testing Requirements & Clauses",
    "home.features_testing_badge": "Clauses",
    "home.features_testing_tag": "Sampling Schedules",
    "home.features_testing_desc":
      "Acceptance criteria, sampling rules, and testing equipment from Indian Standards.",
    "home.features_testing_action": "Inspect Test Schedules →",
    "home.features_labs_title": "BIS Recognized Laboratories Finder",
    "home.features_labs_badge": "Lab Network",
    "home.features_labs_tag": "NABL & BIS Facilities",
    "home.features_labs_desc":
      "Filter NABL and BIS recognized labs by IS number, state, and city.",
    "home.features_labs_action": "Locate Accredited Lab →",
    "home.features_hallmark_title": "Gold & Silver Hallmarking Assistant",
    "home.features_hallmark_badge": "HUID Check",
    "home.features_hallmark_tag": "Purity & Assaying",
    "home.features_hallmark_desc":
      "Verify 6-digit HUID codes and understand gold/silver purity grades.",
    "home.features_hallmark_action": "Hallmarking Guidance →",
    "home.features_consumer_title": "Consumer Protection & ISI Check",
    "home.features_consumer_badge": "Verify & Report",
    "home.features_consumer_tag": "Grievance Redressal",
    "home.features_consumer_desc":
      "Verify ISI Mark CM/L licence numbers, spot counterfeits.",
    "home.features_consumer_action": "Consumer Hub →",
    "home.how_title": "How BIS Saarthi Works",
    "home.how_badge": "Architecture & Verification Pipeline",
    "home.how_step1_title": "Ask Query",
    "home.how_step1_desc":
      "Query in English, Hindi, or any of 22 Scheduled Indian Languages.",
    "home.how_step2_title": "Retrieve",
    "home.how_step2_desc":
      "Hybrid BM25 + Vector semantic search across BIS repository.",
    "home.how_step3_title": "Verify",
    "home.how_step3_desc":
      "Cross-encoder reranking & source freshness verification.",
    "home.how_step4_title": "Explain",
    "home.how_step4_desc":
      "Clear plain-language guidance distinguished from statutory clauses.",
    "home.how_step5_title": "Cite",
    "home.how_step5_desc":
      "Every claim traceable to standard number, clause, page, and link.",
    "home.trust_badge": "Zero Hallucination Operational Standard",
    "home.trust_title": "Trusted by MSMEs, Compliance Teams & Citizens",
    "home.trust_desc":
      "BIS Saarthi never invents Indian Standard numbers, test clauses, or lab recognition statuses.",
    "home.trust_action": "Launch AI Workspace →",
    "standards.badge": "Bureau of Indian Standards Repository",
    "standards.title": "Indian Standards Directory & Search",
    "standards.subtitle":
      "Search authoritative Indian Standards, mandatory QCOs, and testing clause schedules.",
    "standards.search_placeholder": "Search by IS number or keyword...",
    "standards.search_btn": "Search",
    "standards.filter_division": "Division:",
    "standards.filter_all": "All Divisions",
    "standards.filter_mandatory": "Mandatory QCO Only",
    "standards.div_mech": "Mechanical Engineering",
    "standards.div_civil": "Civil Engineering",
    "standards.div_electro": "Electrotechnical",
    "standards.div_met": "Metallurgical Engineering",
    "standards.div_food": "Food and Agriculture",
    "standards.loading_msg": "Retrieving Standards from BIS Repository...",
    "standards.loading_sub":
      "Applying division filters and QCO regulatory scopes...",
    "standards.empty_title": "No Indian Standards Found",
    "standards.empty_desc":
      "Try broadening your search query or reset the filters.",
    "standards.empty_action": "Reset Filters",
    "findstd.badge": "AI Product Scope Profiler",
    "findstd.title_prefix": "Find Applicable",
    "findstd.title_highlight": "Indian Standard",
    "findstd.subtitle":
      "Input product specifications and get matched Indian Standards.",
    "findstd.anti_badge": "Anti-Speculation Standard",
    "findstd.anti_desc":
      "Verify final grade classification against statutory QCOs.",
    "findstd.form_title": "Product Specification Form",
    "findstd.form_subtitle":
      "Provide as many details as possible for precise standard matching.",
    "findstd.field_product": "Product Name / Type",
    "findstd.field_material": "Raw Material Composition",
    "findstd.field_application": "Intended Application / Usage",
    "findstd.field_industry": "Industry / Domain Sector",
    "findstd.field_capacity": "Capacity / Size",
    "findstd.field_techspec": "Technical Specifications",
    "findstd.placeholder_product":
      "e.g. Stainless steel water bottle, PVC cable, TMT bar",
    "findstd.placeholder_material": "e.g. SS 304, Aluminium alloy",
    "findstd.placeholder_application":
      "e.g. Drinking water storage, building construction",
    "findstd.placeholder_industry":
      "e.g. Metallurgical, Food & Agriculture, Civil",
    "findstd.placeholder_capacity": "e.g. 750 ml, 1.1kV, 12mm",
    "findstd.placeholder_techspec":
      "e.g. Voltage rating 1.1kV, double wall insulation",
    "findstd.btn_evaluate": "Evaluate Applicable Standards",
    "findstd.btn_clear": "Clear",
    "findstd.btn_sample": "Run Sample Evaluation",
    "findstd.results_title": "Evaluated Indian Standards",
    "findstd.results_complete": "Grounded Assessment Completed",
    "findstd.loading_msg": "Evaluating Product-to-Standard Scope...",
    "findstd.loading_sub":
      "Scanning Gazette notifications and material grade parameters...",
    "findstd.empty_title": "No Profile Evaluated Yet",
    "findstd.empty_desc":
      "Fill in the product specification form and click Evaluate.",
    "testing.badge": "Statutory Testing Schedules",
    "testing.title": "Indian Standards Testing Requirements",
    "testing.subtitle":
      "Inspect mandatory routine tests, acceptance criteria, and sampling rules.",
    "testing.filter_placeholder":
      "Filter by Standard Number (e.g. IS 17526, IS 10500)...",
    "testing.btn_filter": "Filter Tests",
    "testing.btn_showall": "Show All Tests",
    "testing.loading_msg":
      "Retrieving Testing Clauses & Acceptance Parameters...",
    "testing.loading_sub":
      "Cross-referencing laboratory test methods and sampling frequencies...",
    "testing.empty_title": "No Testing Requirements Found",
    "testing.empty_desc": "Try searching with IS 17526, IS 10500, or IS 1786.",
    "labs.badge": "Accredited Testing Infrastructure",
    "labs.title": "Find a BIS Recognized Laboratory",
    "labs.subtitle":
      "Search NABL and BIS recognized testing labs across Indian states.",
    "labs.search_placeholder":
      "Search by Indian Standard (e.g. IS 17526, IS 14543)...",
    "labs.btn_filter": "Filter Labs",
    "labs.filter_state": "State:",
    "labs.filter_allstates": "All States",
    "labs.loading_msg": "Locating Recognized Testing Laboratories...",
    "labs.loading_sub": "Matching accredited testing parameters...",
    "labs.empty_title": "No Laboratories Found",
    "labs.empty_desc":
      "Try removing the standard filter or choosing All States.",
    "labs.empty_action": "View All Laboratories",
    "hallmarking.badge": "Precious Metals Purity Assurance",
    "hallmarking.title_prefix": "Gold & Silver",
    "hallmarking.title_highlight": "Hallmarking Assistant",
    "hallmarking.subtitle":
      "Understand fineness grades, verify HUID codes, locate hallmarking centres.",
    "hallmarking.mandate_badge": "BIS Hallmarking Mandate",
    "hallmarking.mandate_desc":
      "Mandatory hallmarking operative across notified districts.",
    "hallmarking.3marks_title": "The 3 Mandatory Marks on Gold Jewellery",
    "hallmarking.3marks_note": "Operative since July 2021",
    "hallmarking.verify_tag": "Consumer Verification Tool",
    "hallmarking.verify_title": "Verify 6-Digit Alphanumeric HUID Structure",
    "hallmarking.verify_subtitle":
      "Test any 6-digit HUID code before buying jewellery.",
    "hallmarking.verify_placeholder": "Enter 6-character HUID (e.g. A1B2C3)",
    "hallmarking.btn_validate": "Validate Format",
    "hallmarking.verify_howto": "How to verify on BIS Care App:",
    "hallmarking.verify_safety": "Consumer Safety & Rights Tips:",
    "hallmarking.grades_title":
      "Official Gold & Silver Fineness Grades (IS 1417 & IS 2112)",
    "hallmarking.comp_badge": "Statutory 2X Compensation Policy",
    "hallmarking.comp_title": "Consumer Protection Guarantee",
    "hallmarking.loading_msg":
      "Loading Hallmarking Standards & Fineness Schedules...",
    "hallmarking.loading_sub":
      "Retrieving IS 1417 and IS 2112 statutory markings...",
    "reports.badge": "Decision Support Deliverable",
    "reports.title": "BIS Compliance Roadmap Report",
    "reports.btn_print": "Print / Save as PDF",
    "reports.doc_header": "Government Compliance Assessment Document",
    "reports.doc_title": "BIS Product Compliance & Conformity Roadmap",
    "reports.section1": "1. Target Product Profile",
    "reports.label_product": "Product Evaluated:",
    "reports.label_primarystd": "Primary Applicable Standard:",
    "reports.section2": "2. Applicable Indian Standards & QCO Mandates",
    "reports.tag_mandatory": "Mandatory",
    "reports.label_regulatory": "Regulatory Notification:",
    "reports.section3": "3. Applicable BIS Certification Scheme",
    "reports.label_validity": "Validity:",
    "reports.label_surveillance": "Surveillance:",
    "reports.section4": "4. Mandatory Testing Requirements",
    "reports.col_test": "Test Parameter",
    "reports.col_clause": "Standard Clause",
    "reports.col_type": "Type",
    "reports.col_sampling": "Sampling Rule",
    "reports.section5": "5. Recommended Testing Laboratories",
    "reports.section6": "6. Statutory Documentation Checklist",
    "reports.section7": "Key Statutory Compliance Pitfalls:",
    "reports.disclaimer_title": "Authoritative Compliance Notice:",
    "reports.loading_msg": "Synthesizing BIS Compliance Assessment Report...",
    "reports.loading_sub":
      "Compiling applicable standards, testing schedules, and statutory evidence...",
    "certification.badge": "BIS Conformity Assessment Schemes",
    "certification.title": "Certification Schemes & Compliance Roadmap",
    "certification.subtitle":
      "Understand statutory conformity schemes, factory audits, and licence grant procedures.",
    "certification.btn_report": "Generate Full Compliance Report",
    "certification.active_product": "Active Product Roadmap:",
    "certification.btn_change": "Change Product Profile →",
    "certification.roadmap_title":
      "Interactive Step-by-Step Certification Journey",
    "certification.phases": "Phases",
    "certification.details_tag": "Scheme Details",
    "certification.docs_title": "Statutory Documents Required:",
    "certification.fee_title": "Fee Structure:",
    "certification.validity": "Validity:",
    "certification.surveillance": "Surveillance:",
    "certification.link_official": "Official Manakonline / CRS Portal",
    "certification.loading_msg": "Loading Certification Scheme Requirements...",
    "certification.loading_sub":
      "Compiling documentation checklists and audit schedules...",
    "consumer.badge": "Citizen & Consumer Protection",
    "consumer.title_prefix": "Consumer Safety &",
    "consumer.title_highlight": "ISI Mark Verification Hub",
    "consumer.subtitle":
      "Verify ISI Mark CM/L licence numbers, detect counterfeit markings, access grievance channels.",
    "consumer.helpline_badge": "Toll-Free Consumer Helpline",
    "consumer.helpline_number": "1800-11-4000",
    "consumer.verify_tag": "Licence Authentication",
    "consumer.verify_title": "Verify ISI Mark CM/L Number",
    "consumer.verify_subtitle":
      "Enter the 7 or 8-digit numeric licence code beneath the ISI triangular logo.",
    "consumer.verify_placeholder":
      "Enter 7 or 8-digit CM/L Number (e.g. 1454301)",
    "consumer.btn_check": "Check Licence Structure",
    "consumer.checklist_auth": "Authenticity Verification Checklist:",
    "consumer.checklist_fraud": "Red Flag Fraud Indicators:",
    "consumer.link_biscare": "Download Official BIS Care Citizen App",
    "consumer.complaint_title": "How to Lodge a Counterfeit Complaint",
    "consumer.complaint_desc":
      "Submit an anonymous report to BIS Enforcement Branch via the BIS Care App or e-BIS portal.",
    "consumer.categories_title": "Key Mandatory Consumer Categories",
    "consumer.categories_desc":
      "Products that strictly require the ISI Mark before retail sale in India:",
    "consumer.cat_packaged_water": "Packaged Drinking Water",
    "consumer.cat_cement": "Cement",
    "consumer.cat_steel_tmt": "Steel TMT Bars",
    "consumer.cat_pvc_pipes": "PVC Pipes",
    "consumer.cat_electrical": "Electrical Appliances",
    "consumer.cat_food_dairy": "Food & Dairy Products",
    "consumer.cat_lpg": "LPG Cylinders",
    "consumer.cat_gold": "Gold Jewellery",
    "footer.description":
      "AI-Powered Decision-Support Platform for Indian Standards, Certification Schemes, Laboratory Testing, and Hallmarking.",
    "footer.tagline": "Retrieve First → Reason Second → Cite Everything",
    "footer.portals_title": "BIS Portals",
    "footer.ebis": "e-BIS Portal",
    "footer.manakonline": "Manakonline (Scheme I)",
    "footer.crs": "CRS Portal (Electronics)",
    "footer.nabl": "NABL Directory",
    "footer.modules_title": "Core Modules",
    "footer.find_standard": "Find My Standard",
    "footer.certification": "Certification Schemes",
    "footer.testing": "Testing Requirements",
    "footer.labs": "Recognized Labs Finder",
    "footer.hallmarking": "Gold & Silver Hallmarking",
    "footer.legal_title": "Legal & Quality Notice",
    "footer.legal_text":
      "Information provided is grounded in published Indian Standards and Gazette notifications. Formal legal compliance requires certification grant through official BIS portals.",
    "footer.admin_link": "Admin & Evaluation Console →",
    "footer.copyright":
      "BIS Saarthi. Built for Indian Industry, MSMEs & Citizens.",
    "footer.consumer_grievance": "ভোক্তা অভিযোগ",
    "footer.ai_support": "AI সিদ্ধান্ত সহায়তা",
    "prompts.industry.1":
      "আমি স্টেইনলেস স্টিল ওয়াটার বোতল তৈরি করি। কোন মান প্রযোজ্য?",
    "prompts.industry.2":
      "লিথিয়াম-আয়ন পাওয়ার ব্যাংকগুলির জন্য BIS সার্টিফিকেশন প্রয়োজন আছে কি?",
    "prompts.industry.3":
      "IS 1786-এর অধীনে TMT স্টিল বারের জন্য কোন পরীক্ষা প্রয়োজন?",
    "prompts.industry.4":
      "স্কিম-I-এর জন্য ফ্যাক্টরি অডিট এবং নমুনা পরীক্ষার প্রক্রিয়া কী?",
    "prompts.industry.5":
      "ভারতে রপ্তানিকারী বিদেশী নির্মাতাদের জন্য FMCS নির্দেশিকা",
    "prompts.industry.6":
      "IS 302 বৈদ্যুতিক যন্ত্রপাতির জন্য প্রয়োজনীয় ল্যাব পরীক্ষার সরঞ্জাম",
    "prompts.consumer.1":
      "6-সংখ্যার HUID সহ সোনার গহনার হলমার্ক আমি কীভাবে যাচাই করব?",
    "prompts.consumer.2":
      "প্যাকেজড জলে ISI চিহ্ন প্রকৃত কিনা আমি কীভাবে পরীক্ষা করতে পারি?",
    "prompts.consumer.3":
      "ত্রুটিপূর্ণ ISI সার্টিফাইড পণ্যের বিরুদ্ধে ভোক্তা অভিযোগ কীভাবে দায়ের করবেন?",
    "prompts.consumer.4":
      "BIS হলমার্ক এবং 916 বিশুদ্ধতা চিহ্নের মধ্যে পার্থক্য।",
    "prompts.consumer.5": "স্মার্ট ফোনের জন্য BIS রেজিস্ট্রেশন বাধ্যতামূলক কি?",
    "prompts.student.1":
      "IS 10500 ক্লজ 4.2 পানযোগ্য জলের TDS এবং ভারী ধাতুর সীমা ব্যাখ্যা করুন",
    "prompts.student.2":
      "IS 456 মান এবং Eurocode 2-এর মধ্যে তুলনামূলক বিশ্লেষণ",
    "prompts.student.3": "NBC 2016-এর সর্বশেষ সংশোধনীগুলি কী কী?",
    "prompts.student.5":
      "2015-এর আগে প্রত্যাহার করা আর্কাইভ করা মানগুলি কীভাবে অ্যাক্সেস করবেন?",
    "prompts.student.6":
      "IS 1417 এবং আন্তর্জাতিক মানের মধ্যে hallmarking assaying tolerances তুলনা করুন",
    "prompts.admin.1":
      "What are the active Quality Control Orders (QCOs) in effect?",
    "prompts.admin.2":
      "Audit compliance checklist for BIS recognized testing laboratories",
    "prompts.admin.3":
      "Standards revision roadmap and committee review process",
    "consumer.complaint_step1": "১. পণ্য ও প্যাকেজিংয়ের স্পষ্ট ছবি তুলুন।",

    "consumer.complaint_step2": "২. খুচরা ক্যাশ মেমো / GST ইনভয়েস সংরক্ষণ করুন।",

    "consumer.complaint_step3": "৩. BIS Care অ্যাপে খুচরা বিক্রেতার ঠিকানাসহ অভিযোগ দাখিল করুন।",

    "consumer.cat_lpg_cylinders": "LPG রেগুলেটর ও সিলিন্ডার",

    "consumer.cat_infant_formula": "শিশু খাদ্য",

    "consumer.cat_immersion_heaters": "বৈদ্যুতিক ইমার্শন হিটার",

    "consumer.cat_auto_tyres": "অটোমোবাইল টায়ার",

    "labs.state_maharashtra": "মহারাষ্ট্র",

    "labs.state_delhi": "দিল্লি",

    "labs.state_uttar_pradesh": "উত্তর প্রদেশ",

    "labs.state_karnataka": "কর্ণাটক",

    "labs.state_haryana": "হরিয়ানা",

    "labs.state_tamil_nadu": "তামিলনাড়ু",

    "labs.state_gujarat": "গুজরাট",

  },
  [IndianLanguage.MR]: {
    "nav.standards": "मानके",
    "nav.find_standard": "मानक शोधा",
    "nav.catalogue": "मानक सूची",
    "nav.certification": "प्रमाणन",
    "nav.testing": "चाचणी",
    "nav.labs": "प्रयोगशाळा",
    "nav.hallmark": "हॉलमार्क",
    "nav.consumer": "ग्राहक संरक्षण",
    "nav.reports": "अहवाल",
    "nav.ask_bis_ai": "BIS AI ला विचारा",
    "nav.ask_ai": "विचारा AI",
    "hero.title": "भारतीय मानके आणि बीआयएस सेवांसाठी तुमचा एआय सहाय्यक",
    "hero.subtitle":
      "योग्य मानक शोधा, प्रमाणन योजना समजून घ्या आणि हॉलमार्किंग व चाचणी कलम पडताळून पहा।",
    "hero.select_profile": "तुमचा प्रोफाइल मोड निवडा:",
    "hero.search_placeholder":
      "उत्पादन मानके, स्कीम १/सीआरएस प्रमाणन याबद्दल विचारा...",
    "hero.ask_ai_btn": "विचारा AI",
    "hero.suggested_queries": "सुचवलेले प्रश्न:",
    "chat.new_session": "+ नवीन चॅट सत्र",
    "chat.specialized_tools": "बीआयएस विशेष साधने",
    "chat.find_standard": "माझे मानक शोधा",
    "chat.certification_schemes": "प्रमाणन योजना",
    "chat.testing_requirements": "चाचणी आवश्यकता",
    "chat.find_lab": "मान्यताप्राप्त लॅब शोधा",
    "chat.generate_report": "अनुपालन अहवाल तयार करा",
    "chat.active_workspace": "सक्रिय कार्यक्षेत्र",
    "chat.current_investigation": "सध्याचे संशोधन",
    "chat.grounded_active": "पुरावा-आधारित पुनर्प्राप्ती सक्रिय",
    "chat.grounded_desc": "अधिकृत राजपत्र अधिसूचनांमधून पडताळलेली उत्तरे.",
    "chat.conversation_title": "बीआयएस सारथी संवाद",
    "chat.mode": "मोड:",
    "chat.language_label": "भाषा:",
    "chat.evidence_panel_btn": "पुरावा पॅनेल",
    "chat.welcome_title": "बीआयएस सारथी — पुरावा-समर्थित निर्णय सहाय्यक",
    "chat.input_placeholder":
      "मानके, प्रमाणन, चाचणी पद्धती किंवा कलमांबद्दल विचारा...",
    "chat.send_btn": "पाठवा",
    "chat.answer_language": "उत्तराची भाषा",
    "chat.detected_language": "ओळखलेली भाषा",
    "chat.evidence_panel": "अधिकृत पुरावे आणि उद्धरणे",
    "chat.confidence": "विश्वासार्हता पातळी",
    "chat.source_freshness": "सत्यापित स्त्रोत",
    "chat.searching_status": "बीआयएस भांडारात शोध आणि कलमे मिळवली जात आहेत...",
    "chat.traceable_citations": "पडताळणीयोग्य अधिकृत संदर्भ:",
    "chat.copy_answer": "उत्तर कॉपी करा",
    "chat.copied": "कॉपी केले",
    "chat.helpful": "उपयुक्त उत्तर",
    "chat.not_helpful": "अनुपयुक्त",
    "chat.report_citation": "चुकीच्या संदर्भाची तक्रार करा",
    "chat.disclaimer":
      "अचूकतेची हमी: बीआयएस सारथी भारतीय मानकांनुसार केवळ अधिकृत माहिती देते.",
    "chat.bis_act_compliant": "बीआयएस कायदा २०१६ चे पालन",
    "evidence.title": "अधिकृत पुरावे आणि उद्धरणे",
    "evidence.indian_standard": "भारतीय मानक",
    "evidence.clause": "कलम:",
    "evidence.page": "पृष्ठ:",
    "evidence.publication": "प्रकाशन दिनांक:",
    "evidence.relevance": "सुसंगतता:",
    "evidence.freshness_notice": "ताजी सूचना:",
    "evidence.verbatim_excerpt": "मूळ मानक कलम उद्धरण",
    "evidence.copy_excerpt": "उद्धरण कॉपी करा",
    "evidence.copied": "कॉपी केले",
    "evidence.view_source": "अधिकृत BIS पोर्टलवर स्रोत पहा",
    "evidence.no_evidence_title": "कोणताही पुरावा संदर्भित नाही",
    "evidence.no_evidence_desc":
      "BIS मानक कलमे आणि राजपत्र तपासण्यासाठी प्रश्न विचारा किंवा मानक निवडा.",
    "common.loading": "बीआयएस आरएजी इंजिनद्वारे उत्तर तयार होत आहे...",
    "common.error": "प्रक्रिया पूर्ण होऊ शकली नाही. कृपया कनेक्शन तपासा.",

    "header.subtitle": "Indian Standards Intelligence",
    "home.how_subtitle_prefix": "Strict adherence to",
    "home.how_subtitle_bold":
      '"Retrieve First → Reason Second → Cite Everything"',
    "home.mode_industry": "उद्योग / MSME",
    "home.mode_consumer": "उपभोक्ता",
    "home.mode_student": "विद्यार्थी / संशोधक",
    "home.mode_admin": "प्रशासन आणि नियामक",
    "home.mode_consumer_placeholder":
      "सोन्याचा HUID तपासा, ISI मार्क सत्यापित करा...",
    "home.mode_student_placeholder":
      "Standard clauses शोधा, तुलनात्मक विश्लेषण...",
    "home.mode_admin_placeholder":
      "मानके, योजना, अहवाल शोधा...",
    "home.features_title": "Bureau of Indian Standards Intelligence",
    "home.features_subtitle":
      "Structured modules for manufacturers, compliance officers, consumers.",
    "home.features_find_title": "Find My Standard Workflow",
    "home.features_find_badge": "AI Profiler",
    "home.features_find_tag": "Product Matching",
    "home.features_find_desc":
      "Step-by-step product profiler matching your product to Indian Standards.",
    "home.features_find_action": "Start Profiler →",
    "home.features_cert_title": "Certification Schemes & Roadmap",
    "home.features_cert_badge": "ISI & CRS",
    "home.features_cert_tag": "Audit & FMCS",
    "home.features_cert_desc":
      "Navigate Scheme I (ISI Mark), Scheme II (CRS), Scheme IV, and FMCS.",
    "home.features_cert_action": "Explore Schemes →",
    "home.features_testing_title": "Testing Requirements & Clauses",
    "home.features_testing_badge": "Clauses",
    "home.features_testing_tag": "Sampling Schedules",
    "home.features_testing_desc":
      "Acceptance criteria, sampling rules, and testing equipment from Indian Standards.",
    "home.features_testing_action": "Inspect Test Schedules →",
    "home.features_labs_title": "BIS Recognized Laboratories Finder",
    "home.features_labs_badge": "Lab Network",
    "home.features_labs_tag": "NABL & BIS Facilities",
    "home.features_labs_desc":
      "Filter NABL and BIS recognized labs by IS number, state, and city.",
    "home.features_labs_action": "Locate Accredited Lab →",
    "home.features_hallmark_title": "Gold & Silver Hallmarking Assistant",
    "home.features_hallmark_badge": "HUID Check",
    "home.features_hallmark_tag": "Purity & Assaying",
    "home.features_hallmark_desc":
      "Verify 6-digit HUID codes and understand gold/silver purity grades.",
    "home.features_hallmark_action": "Hallmarking Guidance →",
    "home.features_consumer_title": "Consumer Protection & ISI Check",
    "home.features_consumer_badge": "Verify & Report",
    "home.features_consumer_tag": "Grievance Redressal",
    "home.features_consumer_desc":
      "Verify ISI Mark CM/L licence numbers, spot counterfeits.",
    "home.features_consumer_action": "Consumer Hub →",
    "home.how_title": "How BIS Saarthi Works",
    "home.how_badge": "Architecture & Verification Pipeline",
    "home.how_step1_title": "Ask Query",
    "home.how_step1_desc":
      "Query in English, Hindi, or any of 22 Scheduled Indian Languages.",
    "home.how_step2_title": "Retrieve",
    "home.how_step2_desc":
      "Hybrid BM25 + Vector semantic search across BIS repository.",
    "home.how_step3_title": "Verify",
    "home.how_step3_desc":
      "Cross-encoder reranking & source freshness verification.",
    "home.how_step4_title": "Explain",
    "home.how_step4_desc":
      "Clear plain-language guidance distinguished from statutory clauses.",
    "home.how_step5_title": "Cite",
    "home.how_step5_desc":
      "Every claim traceable to standard number, clause, page, and link.",
    "home.trust_badge": "Zero Hallucination Operational Standard",
    "home.trust_title": "Trusted by MSMEs, Compliance Teams & Citizens",
    "home.trust_desc":
      "BIS Saarthi never invents Indian Standard numbers, test clauses, or lab recognition statuses.",
    "home.trust_action": "Launch AI Workspace →",
    "standards.badge": "Bureau of Indian Standards Repository",
    "standards.title": "Indian Standards Directory & Search",
    "standards.subtitle":
      "Search authoritative Indian Standards, mandatory QCOs, and testing clause schedules.",
    "standards.search_placeholder": "Search by IS number or keyword...",
    "standards.search_btn": "Search",
    "standards.filter_division": "Division:",
    "standards.filter_all": "All Divisions",
    "standards.filter_mandatory": "Mandatory QCO Only",
    "standards.div_mech": "Mechanical Engineering",
    "standards.div_civil": "Civil Engineering",
    "standards.div_electro": "Electrotechnical",
    "standards.div_met": "Metallurgical Engineering",
    "standards.div_food": "Food and Agriculture",
    "standards.loading_msg": "Retrieving Standards from BIS Repository...",
    "standards.loading_sub":
      "Applying division filters and QCO regulatory scopes...",
    "standards.empty_title": "No Indian Standards Found",
    "standards.empty_desc":
      "Try broadening your search query or reset the filters.",
    "standards.empty_action": "Reset Filters",
    "findstd.badge": "AI Product Scope Profiler",
    "findstd.title_prefix": "Find Applicable",
    "findstd.title_highlight": "Indian Standard",
    "findstd.subtitle":
      "Input product specifications and get matched Indian Standards.",
    "findstd.anti_badge": "Anti-Speculation Standard",
    "findstd.anti_desc":
      "Verify final grade classification against statutory QCOs.",
    "findstd.form_title": "Product Specification Form",
    "findstd.form_subtitle":
      "Provide as many details as possible for precise standard matching.",
    "findstd.field_product": "Product Name / Type",
    "findstd.field_material": "Raw Material Composition",
    "findstd.field_application": "Intended Application / Usage",
    "findstd.field_industry": "Industry / Domain Sector",
    "findstd.field_capacity": "Capacity / Size",
    "findstd.field_techspec": "Technical Specifications",
    "findstd.placeholder_product":
      "e.g. Stainless steel water bottle, PVC cable, TMT bar",
    "findstd.placeholder_material": "e.g. SS 304, Aluminium alloy",
    "findstd.placeholder_application":
      "e.g. Drinking water storage, building construction",
    "findstd.placeholder_industry":
      "e.g. Metallurgical, Food & Agriculture, Civil",
    "findstd.placeholder_capacity": "e.g. 750 ml, 1.1kV, 12mm",
    "findstd.placeholder_techspec":
      "e.g. Voltage rating 1.1kV, double wall insulation",
    "findstd.btn_evaluate": "Evaluate Applicable Standards",
    "findstd.btn_clear": "Clear",
    "findstd.btn_sample": "Run Sample Evaluation",
    "findstd.results_title": "Evaluated Indian Standards",
    "findstd.results_complete": "Grounded Assessment Completed",
    "findstd.loading_msg": "Evaluating Product-to-Standard Scope...",
    "findstd.loading_sub":
      "Scanning Gazette notifications and material grade parameters...",
    "findstd.empty_title": "No Profile Evaluated Yet",
    "findstd.empty_desc":
      "Fill in the product specification form and click Evaluate.",
    "testing.badge": "Statutory Testing Schedules",
    "testing.title": "Indian Standards Testing Requirements",
    "testing.subtitle":
      "Inspect mandatory routine tests, acceptance criteria, and sampling rules.",
    "testing.filter_placeholder":
      "Filter by Standard Number (e.g. IS 17526, IS 10500)...",
    "testing.btn_filter": "Filter Tests",
    "testing.btn_showall": "Show All Tests",
    "testing.loading_msg":
      "Retrieving Testing Clauses & Acceptance Parameters...",
    "testing.loading_sub":
      "Cross-referencing laboratory test methods and sampling frequencies...",
    "testing.empty_title": "No Testing Requirements Found",
    "testing.empty_desc": "Try searching with IS 17526, IS 10500, or IS 1786.",
    "labs.badge": "Accredited Testing Infrastructure",
    "labs.title": "Find a BIS Recognized Laboratory",
    "labs.subtitle":
      "Search NABL and BIS recognized testing labs across Indian states.",
    "labs.search_placeholder":
      "Search by Indian Standard (e.g. IS 17526, IS 14543)...",
    "labs.btn_filter": "Filter Labs",
    "labs.filter_state": "State:",
    "labs.filter_allstates": "All States",
    "labs.loading_msg": "Locating Recognized Testing Laboratories...",
    "labs.loading_sub": "Matching accredited testing parameters...",
    "labs.empty_title": "No Laboratories Found",
    "labs.empty_desc":
      "Try removing the standard filter or choosing All States.",
    "labs.empty_action": "View All Laboratories",
    "hallmarking.badge": "Precious Metals Purity Assurance",
    "hallmarking.title_prefix": "Gold & Silver",
    "hallmarking.title_highlight": "Hallmarking Assistant",
    "hallmarking.subtitle":
      "Understand fineness grades, verify HUID codes, locate hallmarking centres.",
    "hallmarking.mandate_badge": "BIS Hallmarking Mandate",
    "hallmarking.mandate_desc":
      "Mandatory hallmarking operative across notified districts.",
    "hallmarking.3marks_title": "The 3 Mandatory Marks on Gold Jewellery",
    "hallmarking.3marks_note": "Operative since July 2021",
    "hallmarking.verify_tag": "Consumer Verification Tool",
    "hallmarking.verify_title": "Verify 6-Digit Alphanumeric HUID Structure",
    "hallmarking.verify_subtitle":
      "Test any 6-digit HUID code before buying jewellery.",
    "hallmarking.verify_placeholder": "Enter 6-character HUID (e.g. A1B2C3)",
    "hallmarking.btn_validate": "Validate Format",
    "hallmarking.verify_howto": "How to verify on BIS Care App:",
    "hallmarking.verify_safety": "Consumer Safety & Rights Tips:",
    "hallmarking.grades_title":
      "Official Gold & Silver Fineness Grades (IS 1417 & IS 2112)",
    "hallmarking.comp_badge": "Statutory 2X Compensation Policy",
    "hallmarking.comp_title": "Consumer Protection Guarantee",
    "hallmarking.loading_msg":
      "Loading Hallmarking Standards & Fineness Schedules...",
    "hallmarking.loading_sub":
      "Retrieving IS 1417 and IS 2112 statutory markings...",
    "reports.badge": "Decision Support Deliverable",
    "reports.title": "BIS Compliance Roadmap Report",
    "reports.btn_print": "Print / Save as PDF",
    "reports.doc_header": "Government Compliance Assessment Document",
    "reports.doc_title": "BIS Product Compliance & Conformity Roadmap",
    "reports.section1": "1. Target Product Profile",
    "reports.label_product": "Product Evaluated:",
    "reports.label_primarystd": "Primary Applicable Standard:",
    "reports.section2": "2. Applicable Indian Standards & QCO Mandates",
    "reports.tag_mandatory": "Mandatory",
    "reports.label_regulatory": "Regulatory Notification:",
    "reports.section3": "3. Applicable BIS Certification Scheme",
    "reports.label_validity": "Validity:",
    "reports.label_surveillance": "Surveillance:",
    "reports.section4": "4. Mandatory Testing Requirements",
    "reports.col_test": "Test Parameter",
    "reports.col_clause": "Standard Clause",
    "reports.col_type": "Type",
    "reports.col_sampling": "Sampling Rule",
    "reports.section5": "5. Recommended Testing Laboratories",
    "reports.section6": "6. Statutory Documentation Checklist",
    "reports.section7": "Key Statutory Compliance Pitfalls:",
    "reports.disclaimer_title": "Authoritative Compliance Notice:",
    "reports.loading_msg": "Synthesizing BIS Compliance Assessment Report...",
    "reports.loading_sub":
      "Compiling applicable standards, testing schedules, and statutory evidence...",
    "certification.badge": "BIS Conformity Assessment Schemes",
    "certification.title": "Certification Schemes & Compliance Roadmap",
    "certification.subtitle":
      "Understand statutory conformity schemes, factory audits, and licence grant procedures.",
    "certification.btn_report": "Generate Full Compliance Report",
    "certification.active_product": "Active Product Roadmap:",
    "certification.btn_change": "Change Product Profile →",
    "certification.roadmap_title":
      "Interactive Step-by-Step Certification Journey",
    "certification.phases": "Phases",
    "certification.details_tag": "Scheme Details",
    "certification.docs_title": "Statutory Documents Required:",
    "certification.fee_title": "Fee Structure:",
    "certification.validity": "Validity:",
    "certification.surveillance": "Surveillance:",
    "certification.link_official": "Official Manakonline / CRS Portal",
    "certification.loading_msg": "Loading Certification Scheme Requirements...",
    "certification.loading_sub":
      "Compiling documentation checklists and audit schedules...",
    "consumer.badge": "Citizen & Consumer Protection",
    "consumer.title_prefix": "Consumer Safety &",
    "consumer.title_highlight": "ISI Mark Verification Hub",
    "consumer.subtitle":
      "Verify ISI Mark CM/L licence numbers, detect counterfeit markings, access grievance channels.",
    "consumer.helpline_badge": "Toll-Free Consumer Helpline",
    "consumer.helpline_number": "1800-11-4000",
    "consumer.verify_tag": "Licence Authentication",
    "consumer.verify_title": "Verify ISI Mark CM/L Number",
    "consumer.verify_subtitle":
      "Enter the 7 or 8-digit numeric licence code beneath the ISI triangular logo.",
    "consumer.verify_placeholder":
      "Enter 7 or 8-digit CM/L Number (e.g. 1454301)",
    "consumer.btn_check": "Check Licence Structure",
    "consumer.checklist_auth": "Authenticity Verification Checklist:",
    "consumer.checklist_fraud": "Red Flag Fraud Indicators:",
    "consumer.link_biscare": "Download Official BIS Care Citizen App",
    "consumer.complaint_title": "How to Lodge a Counterfeit Complaint",
    "consumer.complaint_desc":
      "Submit an anonymous report to BIS Enforcement Branch via the BIS Care App or e-BIS portal.",
    "consumer.categories_title": "Key Mandatory Consumer Categories",
    "consumer.categories_desc":
      "Products that strictly require the ISI Mark before retail sale in India:",
    "consumer.cat_packaged_water": "Packaged Drinking Water",
    "consumer.cat_cement": "Cement",
    "consumer.cat_steel_tmt": "Steel TMT Bars",
    "consumer.cat_pvc_pipes": "PVC Pipes",
    "consumer.cat_electrical": "Electrical Appliances",
    "consumer.cat_food_dairy": "Food & Dairy Products",
    "consumer.cat_lpg": "LPG Cylinders",
    "consumer.cat_gold": "Gold Jewellery",
    "footer.description":
      "AI-Powered Decision-Support Platform for Indian Standards, Certification Schemes, Laboratory Testing, and Hallmarking.",
    "footer.tagline": "Retrieve First → Reason Second → Cite Everything",
    "footer.portals_title": "BIS Portals",
    "footer.ebis": "e-BIS Portal",
    "footer.manakonline": "Manakonline (Scheme I)",
    "footer.crs": "CRS Portal (Electronics)",
    "footer.nabl": "NABL Directory",
    "footer.modules_title": "Core Modules",
    "footer.find_standard": "Find My Standard",
    "footer.certification": "Certification Schemes",
    "footer.testing": "Testing Requirements",
    "footer.labs": "Recognized Labs Finder",
    "footer.hallmarking": "Gold & Silver Hallmarking",
    "footer.legal_title": "Legal & Quality Notice",
    "footer.legal_text":
      "Information provided is grounded in published Indian Standards and Gazette notifications. Formal legal compliance requires certification grant through official BIS portals.",
    "footer.admin_link": "Admin & Evaluation Console →",
    "footer.copyright":
      "BIS Saarthi. Built for Indian Industry, MSMEs & Citizens.",
    "footer.consumer_grievance": "ग्राहक तक्रार",
    "footer.ai_support": "AI निर्णय समर्थन",
    "prompts.industry.1":
      "मी स्टेनलेस स्टील वॉटर बाटल्या तयार करतो। कोणते मानक लागू होते?",
    "prompts.industry.2":
      "लिथियम-आयन पॉवर बँकांसाठी BIS प्रमाणपत्र आवश्यक आहे का?",
    "prompts.industry.3":
      "IS 1786 अंतर्गत TMT स्टील बार्ससाठी कोणत्या चाचण्या आवश्यक आहेत?",
    "prompts.industry.4":
      "स्कीम-I साठी फॅक्टरी ऑडिट आणि नमुना चाचणी प्रक्रिया काय आहे?",
    "prompts.industry.5":
      "भारतात निर्यात करणाऱ्या परदेशी उत्पादकांसाठी FMCS मार्गदर्शक तत्त्वे",
    "prompts.industry.6":
      "IS 302 विद्युत उपकरणांसाठी आवश्यक प्रयोगशाळा चाचणी उपकरणे",
    "prompts.consumer.1":
      "6-अंकी HUID सह सोन्याच्या दागिन्यांचे हॉलमार्क मी कसे सत्यापित करू?",
    "prompts.consumer.2":
      "पॅकेज केलेल्या पाण्यावरील ISI चिन्ह अस्सल आहे का ते मी कसे तपासू शकतो?",
    "prompts.consumer.3":
      "सदोष ISI प्रमाणित वस्तूंविरुद्ध ग्राहक तक्रार कशी नोंदवावी?",
    "prompts.consumer.4": "BIS हॉलमार्क आणि 916 शुद्धता चिन्हामधील फरक.",
    "prompts.consumer.5": "स्मार्ट फोनसाठी BIS नोंदणी अनिवार्य आहे का?",
    "prompts.student.1":
      "IS 10500 कलम 4.2 पिण्याच्या पाण्याची TDS आणि हेवी मेटल मर्यादा स्पष्ट करा",
    "prompts.student.2":
      "IS 456 मानके आणि Eurocode 2 यांच्यातील तुलनात्मक विश्लेषण",
    "prompts.student.3": "NBC 2016 मधील नवीनतम सुधारणा कोणत्या आहेत?",
    "prompts.student.5":
      "2015 पूर्वी मागे घेतलेल्या संग्रहित मानकांमध्ये कसे प्रवेश करावा?",
    "prompts.student.6":
      "IS 1417 आणि आंतरराष्ट्रीय मानकांमधील hallmarking assaying tolerances ची तुलना करा",
    "prompts.admin.1":
      "What are the active Quality Control Orders (QCOs) in effect?",
    "prompts.admin.2":
      "Audit compliance checklist for BIS recognized testing laboratories",
    "prompts.admin.3":
      "Standards revision roadmap and committee review process",
    "consumer.complaint_step1": "1. उत्पादन आणि पॅकेजिंगचे स्पष्ट फोटो काढा.",

    "consumer.complaint_step2": "2. किरकोळ रोख मेमो / GST बीजक जतन करा.",

    "consumer.complaint_step3": "3. BIS Care अॅपवर किरकोळ विक्रेत्याच्या पत्त्यासह तक्रार सादर करा.",

    "consumer.cat_lpg_cylinders": "LPG नियामक आणि सिलिंडर",

    "consumer.cat_infant_formula": "शिशु आहार",

    "consumer.cat_immersion_heaters": "इलेक्ट्रिक इमर्शन हीटर",

    "consumer.cat_auto_tyres": "वाहन टायर",

    "labs.state_maharashtra": "महाराष्ट्र",

    "labs.state_delhi": "दिल्ली",

    "labs.state_uttar_pradesh": "उत्तर प्रदेश",

    "labs.state_karnataka": "कर्नाटक",

    "labs.state_haryana": "हरियाणा",

    "labs.state_tamil_nadu": "तामिळनाडू",

    "labs.state_gujarat": "गुजरात",

  },
  [IndianLanguage.GU]: {
    "nav.standards": "ધોરણો",
    "nav.find_standard": "ધોરણ શોધો",
    "nav.catalogue": "ધોરણ સૂચિ",
    "nav.certification": "પ્રમાણન",
    "nav.testing": "પરીક્ષણ",
    "nav.labs": "પ્રયોગશાળાઓ",
    "nav.hallmark": "હૉલમાર્ક",
    "nav.consumer": "ઉપભોક્તા",
    "nav.reports": "અહેવાલ",
    "nav.ask_bis_ai": "BIS AI ને પૂછો",
    "nav.ask_ai": "AI ને પૂછો",
    "hero.title": "ભારતીય ધોરણો અને BIS સેવાઓ માટે તમારો AI સહાયક",
    "hero.subtitle":
      "સાચું ધોરણ શોધો, પ્રમાણન યોજનાઓ સમજો, hallmarking અને test clauses ચકાસો.",
    "hero.select_profile": "તમારી પ્રોફાઇલ પ્રકાર પસંદ કરો:",
    "hero.search_placeholder":
      "ઉત્પાદ ધોરણો, Scheme I/CRS પ્રમાણન, lab testing વિશે પૂછો...",
    "hero.ask_ai_btn": "AI ને પૂછો",
    "hero.suggested_queries": "સૂચવેલ પ્રશ્નો:",
    "chat.new_session": "+ નવું ચેટ સત્ર",
    "chat.specialized_tools": "BIS વિશિષ્ટ સાધનો",
    "chat.find_standard": "મારું ધોરણ શોધો",
    "chat.certification_schemes": "પ્રમાણપત્ર યોજનાઓ",
    "chat.testing_requirements": "પરીક્ષણ આવશ્યકતાઓ",
    "chat.find_lab": "માન્યતા પ્રાપ્ત લેબ શોધો",
    "chat.generate_report": "અનુપાલન અહેવાલ બનાવો",
    "chat.active_workspace": "સક્રિય વર્કસ્પેસ",
    "chat.current_investigation": "વર્તમાન તપાસ",
    "chat.grounded_active": "પુરાવા આધારિત શોધ સક્રિય",
    "chat.grounded_desc": "પ્રકાશિત ગેઝેટ સૂચનાઓમાંથી ચકાસાયેલ જવાબો.",
    "chat.conversation_title": "BIS સારથી વાતચીત",
    "chat.mode": "મોડ:",
    "chat.language_label": "ભાષા:",
    "chat.evidence_panel_btn": "પુરાવા પેનલ",
    "chat.welcome_title": "BIS સારથી — પુરાવા-સમર્થિત નિર્ણય સહાયક",
    "chat.input_placeholder":
      "ધોરણો, પ્રમાણપત્ર, પરીક્ષણ પદ્ધતિઓ અથવા કલમો વિશે પૂછો...",
    "chat.send_btn": "મોકલો",
    "chat.answer_language": "જવાબની ભાષા",
    "chat.detected_language": "ઓળખાયેલી ભાષા",
    "chat.evidence_panel": "સત્તાવાર પુરાવા અને સંદર્ભો",
    "chat.confidence": "વિશ્વાસ સ્તર",
    "chat.source_freshness": "ચકાસાયેલ સ્ત્રોત",
    "chat.searching_status":
      "BIS રિપોઝિટરીમાં શોધ અને કલમો મેળવવામાં આવી રહી છે...",
    "chat.traceable_citations": "ચકાસી શકાય તેવા સત્તાવાર સંદર્ભો:",
    "chat.copy_answer": "જવાબ કૉપિ કરો",
    "chat.copied": "કૉપિ થઈ ગયું",
    "chat.helpful": "ઉપયોગી જવાબ",
    "chat.not_helpful": "બિનઉપયોગી",
    "chat.report_citation": "ખોટા સંદર્ભની જાણ કરો",
    "chat.disclaimer":
      "ચોકસાઈની ગેરંટી: BIS સારથી ભારતીય ધોરણો અનુસાર માત્ર અધિકૃત માહિતી આપે છે.",
    "chat.bis_act_compliant": "BIS અધિનિયમ 2016 અનુસાર",
    "evidence.title": "સત્તાવાર પુરાવા અને સંદર્ભો",
    "evidence.indian_standard": "ભારતીય ધોરણ",
    "evidence.clause": "કલમ:",
    "evidence.page": "પૃષ્ઠ:",
    "evidence.publication": "પ્રકાશન તારીખ:",
    "evidence.relevance": "પ્રાસંગિકતા:",
    "evidence.freshness_notice": "તાજી માહિતી નોટિસ:",
    "evidence.verbatim_excerpt": "મૂળ ધોરણ કલમ અંશ",
    "evidence.copy_excerpt": "અંશ કૉપિ કરો",
    "evidence.copied": "કૉપિ થઈ ગયું",
    "evidence.view_source": "સત્તાવાર BIS પોર્ટલ પર સ્ત્રોત જુઓ",
    "evidence.no_evidence_title": "કોઈ પુરાવો સંદર્ભિત નથી",
    "evidence.no_evidence_desc":
      "BIS ધોરણો અને પુરાવાઓ જોવા માટે પ્રશ્ન પૂછો અથવા ધોરણ પસંદ કરો.",
    "common.loading": "BIS RAG એન્જિન દ્વારા જવાબ તૈયાર થઈ રહ્યો છે...",
    "common.error": "વિનંતી પ્રક્રિયા થઈ શકી નથી. કનેક્શન તપાસો.",

    "header.subtitle": "Indian Standards Intelligence",
    "home.how_subtitle_prefix": "Strict adherence to",
    "home.how_subtitle_bold":
      '"Retrieve First → Reason Second → Cite Everything"',
    "home.mode_industry": "ઉદ્યોગ / MSME",
    "home.mode_consumer": "ઉપભોક્તા",
    "home.mode_student": "વિદ્યાર્થી / સંશોધક",
    "home.mode_admin": "વહીવટ અને નિયામક",
    "home.mode_consumer_placeholder":
      "સોનાનો HUID ચકાસો, ISI માર્ક ચકાસો, ઉપભોક્તા ફરિયાદ...",
    "home.mode_student_placeholder": "ધોરણ clauses શોધો, તુલનાત્મક વિશ્લેષણ...",
    "home.mode_admin_placeholder":
      "ધોરણ, યોજનાઓ, અહેવાલ, વ્યવહારી માર્ગદર્શિકા...",
    "home.features_title": "ભારતીય ધોરણ બ્યૂરોની વ્યાપક માહિતી",
    "home.features_subtitle":
      "ઉત્પાદકો, ઉપભોક્તાઓ, અને સંશોધકો માટે સંરચિત વિભાગો.",
    "home.features_find_title": "ધોરણ શોધ પ્રક્રિયા",
    "home.features_find_badge": "AI Profiler",
    "home.features_find_tag": "ઉત્પાદ મેળ",
    "home.features_find_desc":
      "ઉત્પાદ specifications, raw materials, ઉદ્દેશ્ય ઉપયોગ input કરો — ભારતીય ધોરણ સાથે ચોક્કસ matching.",
    "home.features_find_action": "Profiler શરૂ કરો →",
    "home.features_cert_title": "પ્રમાણન યોજનાઓ અને Roadmap",
    "home.features_cert_badge": "ISI & CRS",
    "home.features_cert_tag": "Audit & FMCS",
    "home.features_cert_desc":
      "Scheme I (ISI Mark), Scheme II (CRS), Scheme IV (CoC), FMCS. Timeline, documentation checklist, factory audit rules.",
    "home.features_cert_action": "યોજનાઓ જુઓ →",
    "home.features_testing_title": "પરીક્ષણ જરૂરિયાતો અને Clauses",
    "home.features_testing_badge": "Clauses",
    "home.features_testing_tag": "Sampling Schedules",
    "home.features_testing_desc":
      "Acceptance criteria, sampling rules, testing frequencies — ભારતીય ધોરણોમાંથી.",
    "home.features_testing_action": "Test Schedules જુઓ →",
    "home.features_labs_title": "BIS માન્ય પ્રયોગશાળા શોધ",
    "home.features_labs_badge": "Lab Network",
    "home.features_labs_tag": "NABL & BIS Facilities",
    "home.features_labs_desc":
      "IS number, ઉત્પાદ શ્રેણી, test capability, રાજ્ય, શહેર — NABL ও BIS labs ફિલ્ટર.",
    "home.features_labs_action": "Accredited Lab શોધો →",
    "home.features_hallmark_title": "સોના-ચાંદી Hallmarking સહાયક",
    "home.features_hallmark_badge": "HUID ચકાસ",
    "home.features_hallmark_tag": "Purity & Assaying",
    "home.features_hallmark_desc":
      "22K (916), 18K (750), 14K (585) — 6-અંકી HUID codes ચકાસો.",
    "home.features_hallmark_action": "Hallmarking ગાઈડ →",
    "home.features_consumer_title": "ઉપભોક્તા સુરક્ષા અને ISI ચકાસ",
    "home.features_consumer_badge": "ચકાસો & રિપોર્ટ",
    "home.features_consumer_tag": "ફરિયાદ નિવારણ",
    "home.features_consumer_desc":
      "ISI Mark CM/L licence numbers ચકાસો, counterfeit marks ઓળખો, ફરિયાદ નિવારણ steps.",
    "home.features_consumer_action": "Consumer Hub →",
    "home.how_title": "BIS Saarthi કેવી રીતે કામ કરે છે",
    "home.how_badge": "Architecture & Verification Pipeline",
    "home.how_step1_title": "પ્રશ્ન પૂછો",
    "home.how_step1_desc": "અંગ્રેજી, ગુજરાતી, અથવા 22 ભારતીય ભાષાઓમાં.",
    "home.how_step2_title": "શોધ",
    "home.how_step2_desc":
      "BIS repository માં hybrid BM25 + Vector semantic search.",
    "home.how_step3_title": "ચકાસ",
    "home.how_step3_desc":
      "Cross-encoder reranking & source freshness verification.",
    "home.how_step4_title": "સ્પષ્ટ",
    "home.how_step4_desc": "સ્પષ્ટ ભાષામાં guidance.",
    "home.how_step5_title": "ઉllekhit",
    "home.how_step5_desc":
      "દરેક claim standard number, clause, page, link સાથે traceable.",
    "home.trust_badge": "Zero Hallucination Operational Standard",
    "home.trust_title": "MSMEs, Compliance Teams & નાગરિકો દ્વારા વિશ્વાસ",
    "home.trust_desc":
      "BIS Saarthi ક્યારેય Indian Standard numbers, test clauses, lab recognition statuses બનાવટી નથી.",
    "home.trust_action": "AI Workspace ખોલો →",
    "standards.badge": "ભારતીય ધોરણ બ્યૂરો Repository",
    "standards.title": "ભારતીય ધોરણ Directory & Search",
    "standards.subtitle":
      "IS number (IS 10500) અથવા keyword (cement, cable, steel) દ્વારા ધોરણ શોધો.",
    "standards.search_placeholder":
      "IS number (IS 10500) અથવા keyword (cement, cable, steel) શોધો...",
    "standards.search_btn": "શોધ",
    "standards.filter_division": "Division:",
    "standards.filter_all": "બધા Divisions",
    "standards.filter_mandatory": "ફક્ત Mandatory QCO",
    "standards.div_mech": "Mechanical Engineering",
    "standards.div_civil": "Civil Engineering",
    "standards.div_electro": "Electrotechnical",
    "standards.div_met": "Metallurgical Engineering",
    "standards.div_food": "Food and Agriculture",
    "standards.loading_msg": "BIS Repository માંથી ધોરણ પ્રાપ્ત...",
    "standards.loading_sub":
      "Division filters ઓ QCO regulatory scopes apply...",
    "standards.empty_title": "કોઈ ભારતીય ધોરણ મળ્યું નથી",
    "standards.empty_desc": "search query વ્યાપ બનાવો અથવા filters reset કરો.",
    "standards.empty_action": "Filters Reset",
    "findstd.badge": "AI Product Scope Profiler",
    "findstd.title_prefix": "લાગુ",
    "findstd.title_highlight": "ભારતીય ધોરણ",
    "findstd.subtitle":
      "ઉત્પાદ specifications, raw materials, ઉદ્દેશ્ય ઉપયોગ input કરો.",
    "findstd.anti_badge": "Anti-Speculation Standard",
    "findstd.anti_desc":
      "Semantic similarity potentially applicable તરીકે ચિહ્નિત. QCOs against statutory check.",
    "findstd.form_title": "ઉત્પાદ Specification Form",
    "findstd.form_subtitle": "ચોક્કસ matching માટે વધુ વિગત આપો.",
    "findstd.field_product": "Product Name / Type",
    "findstd.field_material": "Raw Material / Composition",
    "findstd.field_application": "Intended Application / Use",
    "findstd.field_industry": "Industry / Domain Sector",
    "findstd.field_capacity": "Capacity / Dimensions (optional)",
    "findstd.field_techspec": "Technical Specifications",
    "findstd.placeholder_product":
      "ઉ.ત. Stainless Steel Water Bottle, TMT Bar, PVC Pipe",
    "findstd.placeholder_material": "ઉ.ત. SS 304 Food Grade, Fe 500 TMT Grade",
    "findstd.placeholder_application":
      "ઉ.ત. Domestic use, Construction, Electrical",
    "findstd.placeholder_industry":
      "ઉ.ત. Metallurgical, Food, Civil, Electrical",
    "findstd.placeholder_capacity": "ઉ.ત. 1 litre, 20mm dia, 12 ampere",
    "findstd.placeholder_techspec":
      "e.g. Voltage rating 1.1kV, double wall insulation",
    "findstd.btn_evaluate": "Evaluate Applicable Standards",
    "findstd.btn_clear": "Clear",
    "findstd.btn_sample": "Run Sample Evaluation",
    "findstd.results_title": "Applicable Indian Standards",
    "findstd.results_complete": "Grounded Assessment Completed",
    "findstd.loading_msg": "Evaluating Product-to-Standard Scope...",
    "findstd.loading_sub":
      "Scanning Gazette notifications and material grade parameters...",
    "findstd.empty_title": "No Profile Evaluated Yet",
    "findstd.empty_desc":
      "Fill in the product specification form and click Evaluate.",
    "testing.badge": "BIS Testing Requirements",
    "testing.title": "Testing Requirements & Clauses",
    "testing.subtitle":
      "Testing requirements, acceptance criteria, sampling schedules.",
    "testing.filter_placeholder":
      "Filter by Standard Number (e.g. IS 17526, IS 10500)...",
    "testing.btn_filter": "Filter Tests",
    "testing.btn_showall": "Show All Tests",
    "testing.loading_msg":
      "Retrieving Testing Clauses & Acceptance Parameters...",
    "testing.loading_sub":
      "Cross-referencing laboratory test methods and sampling frequencies...",
    "testing.empty_title": "No Testing Requirements Found",
    "testing.empty_desc": "Try searching with IS 17526, IS 10500, or IS 1786.",
    "labs.badge": "BIS Recognized Laboratories",
    "labs.title": "Laboratories Finder",
    "labs.subtitle": "Accredited NABL & BIS testing facilities.",
    "labs.search_placeholder":
      "Search by Indian Standard (e.g. IS 17526, IS 14543)...",
    "labs.btn_filter": "Filter Labs",
    "labs.filter_state": "State:",
    "labs.filter_allstates": "All States",
    "labs.loading_msg": "Locating Recognized Testing Laboratories...",
    "labs.loading_sub": "Matching accredited testing parameters...",
    "labs.empty_title": "No Laboratories Found",
    "labs.empty_desc":
      "Try removing the standard filter or choosing All States.",
    "labs.empty_action": "View All Laboratories",
    "hallmarking.badge": "Precious Metals Purity Assurance",
    "hallmarking.title_prefix": "Gold & Silver",
    "hallmarking.title_highlight": "Hallmarking Assistant",
    "hallmarking.subtitle":
      "Understand fineness grades, verify HUID codes, locate hallmarking centres.",
    "hallmarking.mandate_badge": "BIS Hallmarking Mandate",
    "hallmarking.mandate_desc":
      "Mandatory hallmarking operative across notified districts.",
    "hallmarking.3marks_title": "The 3 Mandatory Marks on Gold Jewellery",
    "hallmarking.3marks_note": "Operative since July 2021",
    "hallmarking.verify_tag": "Consumer Verification Tool",
    "hallmarking.verify_title": "Verify 6-Digit Alphanumeric HUID Structure",
    "hallmarking.verify_subtitle":
      "Test any 6-digit HUID code before buying jewellery.",
    "hallmarking.verify_placeholder": "Enter 6-character HUID (e.g. A1B2C3)",
    "hallmarking.btn_validate": "Validate Format",
    "hallmarking.verify_howto": "How to verify on BIS Care App:",
    "hallmarking.verify_safety": "Consumer Safety & Rights Tips:",
    "hallmarking.grades_title":
      "Official Gold & Silver Fineness Grades (IS 1417 & IS 2112)",
    "hallmarking.comp_badge": "Statutory 2X Compensation Policy",
    "hallmarking.comp_title": "Consumer Protection Guarantee",
    "hallmarking.loading_msg":
      "Loading Hallmarking Standards & Fineness Schedules...",
    "hallmarking.loading_sub":
      "Retrieving IS 1417 and IS 2112 statutory markings...",
    "reports.badge": "BIS Compliance Report",
    "reports.title": "Compliance Report Generator",
    "reports.btn_print": "Print / Save as PDF",
    "reports.doc_header": "Government Compliance Assessment Document",
    "reports.doc_title": "BIS Product Compliance & Conformity Roadmap",
    "reports.section1": "1. Target Product Profile",
    "reports.label_product": "Product Evaluated:",
    "reports.label_primarystd": "Primary Applicable Standard:",
    "reports.section2": "2. Applicable Indian Standards & QCO Mandates",
    "reports.tag_mandatory": "Mandatory",
    "reports.label_regulatory": "Regulatory Notification:",
    "reports.section3": "3. Applicable BIS Certification Scheme",
    "reports.label_validity": "Validity:",
    "reports.label_surveillance": "Surveillance:",
    "reports.section4": "4. Mandatory Testing Requirements",
    "reports.col_test": "Test Parameter",
    "reports.col_clause": "Standard Clause",
    "reports.col_type": "Type",
    "reports.col_sampling": "Sampling Rule",
    "reports.section5": "5. Recommended Testing Laboratories",
    "reports.section6": "6. Statutory Documentation Checklist",
    "reports.section7": "Key Statutory Compliance Pitfalls:",
    "reports.disclaimer_title": "Authoritative Compliance Notice:",
    "reports.loading_msg": "Synthesizing BIS Compliance Assessment Report...",
    "reports.loading_sub":
      "Compiling applicable standards, testing schedules, and statutory evidence...",
    "certification.badge": "BIS Certification Schemes",
    "certification.title": "BIS પ્રમાણન યોજનાઓ",
    "certification.subtitle":
      "Scheme I (ISI Mark) થી FMCS — BIS certification landscape",
    "certification.btn_report": "Generate Full Compliance Report",
    "certification.active_product": "Active Product Roadmap:",
    "certification.btn_change": "Change Product Profile →",
    "certification.roadmap_title":
      "Interactive Step-by-Step Certification Journey",
    "certification.phases": "Phases",
    "certification.details_tag": "Scheme Details",
    "certification.docs_title": "Statutory Documents Required:",
    "certification.fee_title": "Fee Structure:",
    "certification.validity": "Validity:",
    "certification.surveillance": "Surveillance:",
    "certification.link_official": "Official Manakonline / CRS Portal",
    "certification.loading_msg": "Loading Certification Scheme Requirements...",
    "certification.loading_sub":
      "Compiling documentation checklists and audit schedules...",
    "consumer.badge": "Citizen & Consumer Protection",
    "consumer.title_prefix": "ઉપભોક્તા સુરક્ષા &",
    "consumer.title_highlight": "ISI Mark Verification Hub",
    "consumer.subtitle":
      "Verify ISI Mark CM/L licence numbers, detect counterfeit markings, access grievance channels.",
    "consumer.helpline_badge": "Toll-Free Consumer Helpline",
    "consumer.helpline_number": "1800-11-4000",
    "consumer.verify_tag": "Licence Authentication",
    "consumer.verify_title": "Verify ISI Mark CM/L Number",
    "consumer.verify_subtitle":
      "Enter the 7 or 8-digit numeric licence code beneath the ISI triangular logo.",
    "consumer.verify_placeholder":
      "Enter 7 or 8-digit CM/L Number (e.g. 1454301)",
    "consumer.btn_check": "Check Licence Structure",
    "consumer.checklist_auth": "Authenticity Verification Checklist:",
    "consumer.checklist_fraud": "Red Flag Fraud Indicators:",
    "consumer.link_biscare": "Download Official BIS Care Citizen App",
    "consumer.complaint_title": "How to Lodge a Counterfeit Complaint",
    "consumer.complaint_desc":
      "Submit an anonymous report to BIS Enforcement Branch via the BIS Care App or e-BIS portal.",
    "consumer.categories_title": "Key Mandatory Consumer Categories",
    "consumer.categories_desc":
      "Products that strictly require the ISI Mark before retail sale in India:",
    "consumer.cat_packaged_water": "Packaged Drinking Water",
    "consumer.cat_cement": "Cement",
    "consumer.cat_steel_tmt": "Steel TMT Bars",
    "consumer.cat_pvc_pipes": "PVC Pipes",
    "consumer.cat_electrical": "Electrical Appliances",
    "consumer.cat_food_dairy": "Food & Dairy Products",
    "consumer.cat_lpg": "LPG Cylinders",
    "consumer.cat_gold": "Gold Jewellery",
    "footer.description":
      "AI-Powered Decision-Support Platform for Indian Standards, Certification Schemes, Laboratory Testing, and Hallmarking.",
    "footer.tagline": "ભારતીય ઉત્પાદ ધોરણ, પ્રમાણન, ઉપભોક્તા સુરક્ષા.",
    "footer.portals_title": "BIS Portals",
    "footer.ebis": "e-BIS Portal",
    "footer.manakonline": "Manakonline (Scheme I)",
    "footer.crs": "CRS Portal (Electronics)",
    "footer.nabl": "NABL Directory",
    "footer.modules_title": "Core Modules",
    "footer.find_standard": "Find My Standard",
    "footer.certification": "BIS પ્રમાણન",
    "footer.testing": "Testing Requirements",
    "footer.labs": "Accredited Laboratories",
    "footer.hallmarking": "સોના-ચાંદી Hallmarking",
    "footer.legal_title": "Legal & Quality Notice",
    "footer.legal_text":
      "BIS Saarthi BI Indian Standards pur aadharit chhe. Statutory QCOs verify karo.",
    "footer.admin_link": "Admin & Evaluation Console →",
    "footer.copyright": "BIS Saarthi. ભારતીય ઉદ્યોગ, MSMEs & નાગરિકો માટે.",
    "footer.consumer_grievance": "ઉપભોક્તા ફરિયાદ",
    "footer.ai_support": "AI Decision Support",
    "prompts.industry.1":
      "હું Stainless Steel Water Bottles બનાવું છું. કયું ધોરણ લાગુ પડે?",
    "prompts.industry.2":
      "Lithium-ion Power Banks માટે BIS certification જરૂરી?",
    "prompts.industry.3": "IS 1786 હેઠળ TMT Steel Bars માટે કઈ tests જરૂરી?",
    "prompts.industry.4":
      "Scheme-I માટે factory audit ও sample testing process?",
    "prompts.industry.5": "ભારત export foreign manufacturers — FMCS guidelines",
    "prompts.industry.6":
      "IS 302 electrical appliances — lab testing equipment",
    "prompts.consumer.1":
      "6-digit HUID સાથે સોના-ઘરેણાંનો hallmark કેવી ચકાસું?",
    "prompts.consumer.2": "Packaged water ISI mark અસલ — કઈ રીતે ચકાસું?",
    "prompts.consumer.3": "ખામીયુક્ત ISI certified goods — ઉપભોક્તા ફરિયાદ?",
    "prompts.consumer.4": "BIS Hallmark ও 916 purity mark — ફરક.",
    "prompts.consumer.5": "Smartphones — BIS registration ફરજિયાત?",
    "prompts.consumer.6": "CRS scheme electronics — R-number ચકાસ?",
    "prompts.student.1": "IS 10500 Clause 4.2 TDS & heavy metal limits",
    "prompts.student.2": "IS 456 ō Eurocode 2 — comparative analysis",
    "prompts.student.3": "NBC 2016 — latest amendments?",
    "prompts.student.4": "IS 2062 tensile & elongation — technical clauses",
    "prompts.student.5": "2015 pehela withdrawn archived standards access?",
    "prompts.student.6": "IS 1417 ō international — hallmarking tolerances",
    "prompts.admin.1": "BIS Saarthi Analytics Dashboard — query trends",
    "prompts.admin.2": "Laboratory accreditation database",
    "prompts.admin.3": "Standard revision roadmap and committee review",
  },
  [IndianLanguage.KN]: {
    "nav.standards": "ಮಾನದಂಡಗಳು",
    "nav.find_standard": "ಮಾನದಂಡವನ್ನು ಹುಡುಕಿ",
    "nav.catalogue": "ಮಾನದಂಡಗಳ ಪಟ್ಟಿ",
    "nav.certification": "ಪ್ರಮಾಣೀಕರಣ",
    "nav.testing": "ಪರೀಕ್ಷೆ",
    "nav.labs": "ಪ್ರಯೋಗಾಲಯಗಳು",
    "nav.hallmark": "ಹಾಲ್‌ಮಾರ್ಕ್",
    "nav.consumer": "ಗ್ರಾಹಕ ರಕ್ಷಣೆ",
    "nav.reports": "ವರದಿಗಳು",
    "nav.ask_bis_ai": "BIS AI ಕೇಳಿ",
    "nav.ask_ai": "ಕೇಳಿ AI",
    "hero.title": "ಭಾರತೀಯ ಮಾನದಂಡಗಳು ಮತ್ತು BIS ಸೇವೆಗಳಿಗಾಗಿ ನಿಮ್ಮ AI ಸಹಾಯಕ",
    "hero.subtitle":
      "ಸರಿಯಾದ ಮಾನದಂಡವನ್ನು ಹುಡುಕಿ, ಪ್ರಮಾಣೀಕರಣ ಪ್ರಕ್ರಿಯೆಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
    "hero.select_profile": "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಮೋಡ್ ಆಯ್ಕೆಮಾಡಿ:",
    "hero.search_placeholder":
      "ಉತ್ಪನ್ನ ಮಾನದಂಡಗಳು, ISI/CRS ಪ್ರಮಾಣೀಕರಣದ ಬಗ್ಗೆ ಕೇಳಿ...",
    "hero.ask_ai_btn": "ಕೇಳಿ AI",
    "hero.suggested_queries": "ಸೂಚಿಸಲಾದ ಪ್ರಶ್ನೆಗಳು:",
    "chat.new_session": "+ ಹೊಸ ಚಾಟ್ ಸೆಷನ್",
    "chat.specialized_tools": "BIS ವಿಶೇಷ ಪರಿಕರಗಳು",
    "chat.find_standard": "ನನ್ನ ಮಾನದಂಡವನ್ನು ಹುಡುಕಿ",
    "chat.certification_schemes": "ಪ್ರಮಾಣೀಕರಣ ಯೋಜನೆಗಳು",
    "chat.testing_requirements": "ಪರೀಕ್ಷಾ ಅವಶ್ಯಕತೆಗಳು",
    "chat.find_lab": "ಮಾನ್ಯತೆ ಪಡೆದ ಲ್ಯಾಬ್ ಹುಡುಕಿ",
    "chat.generate_report": "ಅನುಸರಣೆ ವರದಿ ರಚಿಸಿ",
    "chat.active_workspace": "ಸಕ್ರಿಯ ಕಾರ್ಯಕ್ಷೇತ್ರ",
    "chat.current_investigation": "ಪ್ರಸ್ತುತ ತನಿಖೆ",
    "chat.grounded_active": "ಸಾಕ್ಷ್ಯಾಧಾರಿತ ಮರುಪಡೆಯುವಿಕೆ ಸಕ್ರಿಯ",
    "chat.grounded_desc": "ಅಧಿಕೃತ ಗೆಜೆಟ್ ಅಧಿಸೂಚನೆಗಳಿಂದ ಪರಿಶೀಲಿಸಲಾದ ಉತ್ತರಗಳು.",
    "chat.conversation_title": "BIS ಸಾರಥಿ ಸಂವಾದ",
    "chat.mode": "ಮೋಡ್:",
    "chat.language_label": "ಭಾಷೆ:",
    "chat.evidence_panel_btn": "ಸಾಕ್ಷ್ಯ ಫಲಕ",
    "chat.welcome_title": "BIS ಸಾರಥಿ — ಸಾಕ್ಷ್ಯ ಆಧಾರಿತ ನಿರ್ಧಾರ ಸಹಾಯಕ",
    "chat.input_placeholder":
      "ಮಾನದಂಡಗಳು, ಪ್ರಮಾಣೀಕರಣ, ಪರೀಕ್ಷಾ ವಿಧಾನಗಳು ಅಥವಾ ವಿಧಿಗಳ ಬಗ್ಗೆ ಕೇಳಿ...",
    "chat.send_btn": "ಕಳುಹಿಸಿ",
    "chat.answer_language": "ಉತ್ತರ ಭಾಷೆ",
    "chat.detected_language": "ಗುರುತಿಸಲಾದ ಭಾಷೆ",
    "chat.evidence_panel": "ಅಧಿಕೃತ ಸಾಕ್ಷ್ಯಗಳು ಮತ್ತು ಉಲ್ಲೇಖಗಳು",
    "chat.confidence": "ವಿಶ್ವಾಸಾರ್ಹತೆಯ ಮಟ್ಟ",
    "chat.source_freshness": "ಪರಿಶೀಲಿಸಿದ ಮೂಲ",
    "chat.searching_status":
      "BIS ರೆಪೊಸಿಟರಿಯಲ್ಲಿ ಹುಡುಕಲಾಗುತ್ತಿದೆ ಮತ್ತು ವಿಧಿಗಳನ್ನು ಪಡೆಯಲಾಗುತ್ತಿದೆ...",
    "chat.traceable_citations": "ಪತ್ತೆಹಚ್ಚಬಹುದಾದ ಅಧಿಕೃತ ಉಲ್ಲೇಖಗಳು:",
    "chat.copy_answer": "ಉತ್ತರ ನಕಲಿಸಿ",
    "chat.copied": "ನಕಲಿಸಲಾಗಿದೆ",
    "chat.helpful": "ಉಪಯುಕ್ತ ಉತ್ತರ",
    "chat.not_helpful": "ಉಪಯುಕ್ತವಲ್ಲ",
    "chat.report_citation": "ತಪ್ಪಾದ ಉಲ್ಲೇಖವನ್ನು ವರದಿ ಮಾಡಿ",
    "chat.disclaimer":
      "ನಿಖರತೆಯ ಭರವಸೆ: BIS ಸಾರಥಿ ಭಾರತೀಯ ಮಾನದಂಡಗಳ ಆಧಾರದ ಮೇಲೆ ಅಧಿಕೃತ ಮಾಹಿತಿಯನ್ನು ಮಾತ್ರ ಒದಗಿಸುತ್ತದೆ.",
    "chat.bis_act_compliant": "BIS ಕಾಯಿದೆ 2016 ಕ್ಕೆ ಅನುಗುಣವಾಗಿದೆ",
    "evidence.title": "ಅಧಿಕೃತ ಪುರಾವೆ ಮತ್ತು ಉಲ್ಲೇಖಗಳು",
    "evidence.indian_standard": "ಭಾರತೀಯ ಮಾನಕ",
    "evidence.clause": "ವಿಧಿ:",
    "evidence.page": "ಪುಟ:",
    "evidence.publication": "ಪ್ರಕಟಣೆ ದಿನಾಂಕ:",
    "evidence.relevance": "ಪ್ರಸ್ತುತತೆ:",
    "evidence.freshness_notice": "ಮೂಲ ಸೂಚನೆ:",
    "evidence.verbatim_excerpt": "ಮೂಲ ಮಾನಕ ವಿಧಿ ಉಲ್ಲೇಖ",
    "evidence.copy_excerpt": "ಉಲ್ಲೇಖ ನಕಲಿಸಿ",
    "evidence.copied": "ನಕಲಿಸಲಾಗಿದೆ",
    "evidence.view_source": "ಅಧಿಕೃತ BIS ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ವೀಕ್ಷಿಸಿ",
    "evidence.no_evidence_title": "ಯಾವುದೇ ಪುರಾವೆ ಉಲ್ಲೇಖಿಸಿಲ್ಲ",
    "evidence.no_evidence_desc":
      "BIS ಮಾನಕ ವಿಧಿಗಳನ್ನು ವೀಕ್ಷಿಸಲು ಪ್ರಶ್ನೆ ಕೇಳಿ ಅಥವಾ ಮಾನಕವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    "common.loading": "BIS RAG ಎಂಜಿನ್‌ನಿಂದ ಉತ್ತರ ಸಿದ್ಧವಾಗುತ್ತಿದೆ...",
    "common.error":
      "ವಿನಂತಿಯನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲು ಸಾಧ್ಯವಾಗಿಲ್ಲ. ಸಂಪರ್ಕವನ್ನು ಪರಿಶೀಲಿಸಿ.",

    "header.subtitle": "Indian Standards Intelligence",
    "home.how_subtitle_prefix": "Strict adherence to",
    "home.how_subtitle_bold":
      '"Retrieve First → Reason Second → Cite Everything"',
    "home.mode_industry": "ಉದ್ಯಮ / MSME",
    "home.mode_consumer": "ಗ್ರಾಹಕ",
    "home.mode_student": "ವಿದ್ಯಾರ್ಥಿ / ಸಂಶೋಧಕ",
    "home.mode_admin": "ಆಡಳಿತ ಮತ್ತು ನಿಯಂತ್ರಕ",
    "home.mode_consumer_placeholder":
      "ಚಿನ್ನದ HUID ಪರಿಶೀಲಿಸಿ, ISI ಮಾರ್ಕ್ ಪರಿಶೀಲಿಸಿ...",
    "home.mode_student_placeholder":
      "Standard clauses ಹುಡುಕಿ, ತುಲನಾತ್ಮಕ ವಿಶ್ಲೇಷಣೆ...",
    "home.mode_admin_placeholder":
      "ಮಾನದಂಡಗಳು, ಯೋಜನೆಗಳು, ವರದಿಗಳು ಹುಡುಕಿ...",
    "home.features_title": "Bureau of Indian Standards Intelligence",
    "home.features_subtitle":
      "Structured modules for manufacturers, compliance officers, consumers.",
    "home.features_find_title": "Find My Standard Workflow",
    "home.features_find_badge": "AI Profiler",
    "home.features_find_tag": "Product Matching",
    "home.features_find_desc":
      "Step-by-step product profiler matching your product to Indian Standards.",
    "home.features_find_action": "Start Profiler →",
    "home.features_cert_title": "Certification Schemes & Roadmap",
    "home.features_cert_badge": "ISI & CRS",
    "home.features_cert_tag": "Audit & FMCS",
    "home.features_cert_desc":
      "Navigate Scheme I (ISI Mark), Scheme II (CRS), Scheme IV, and FMCS.",
    "home.features_cert_action": "Explore Schemes →",
    "home.features_testing_title": "Testing Requirements & Clauses",
    "home.features_testing_badge": "Clauses",
    "home.features_testing_tag": "Sampling Schedules",
    "home.features_testing_desc":
      "Acceptance criteria, sampling rules, and testing equipment from Indian Standards.",
    "home.features_testing_action": "Inspect Test Schedules →",
    "home.features_labs_title": "BIS Recognized Laboratories Finder",
    "home.features_labs_badge": "Lab Network",
    "home.features_labs_tag": "NABL & BIS Facilities",
    "home.features_labs_desc":
      "Filter NABL and BIS recognized labs by IS number, state, and city.",
    "home.features_labs_action": "Locate Accredited Lab →",
    "home.features_hallmark_title": "Gold & Silver Hallmarking Assistant",
    "home.features_hallmark_badge": "HUID Check",
    "home.features_hallmark_tag": "Purity & Assaying",
    "home.features_hallmark_desc":
      "Verify 6-digit HUID codes and understand gold/silver purity grades.",
    "home.features_hallmark_action": "Hallmarking Guidance →",
    "home.features_consumer_title": "Consumer Protection & ISI Check",
    "home.features_consumer_badge": "Verify & Report",
    "home.features_consumer_tag": "Grievance Redressal",
    "home.features_consumer_desc":
      "Verify ISI Mark CM/L licence numbers, spot counterfeits.",
    "home.features_consumer_action": "Consumer Hub →",
    "home.how_title": "How BIS Saarthi Works",
    "home.how_badge": "Architecture & Verification Pipeline",
    "home.how_step1_title": "Ask Query",
    "home.how_step1_desc":
      "Query in English, Hindi, or any of 22 Scheduled Indian Languages.",
    "home.how_step2_title": "Retrieve",
    "home.how_step2_desc":
      "Hybrid BM25 + Vector semantic search across BIS repository.",
    "home.how_step3_title": "Verify",
    "home.how_step3_desc":
      "Cross-encoder reranking & source freshness verification.",
    "home.how_step4_title": "Explain",
    "home.how_step4_desc":
      "Clear plain-language guidance distinguished from statutory clauses.",
    "home.how_step5_title": "Cite",
    "home.how_step5_desc":
      "Every claim traceable to standard number, clause, page, and link.",
    "home.trust_badge": "Zero Hallucination Operational Standard",
    "home.trust_title": "Trusted by MSMEs, Compliance Teams & Citizens",
    "home.trust_desc":
      "BIS Saarthi never invents Indian Standard numbers, test clauses, or lab recognition statuses.",
    "home.trust_action": "Launch AI Workspace →",
    "standards.badge": "Bureau of Indian Standards Repository",
    "standards.title": "Indian Standards Directory & Search",
    "standards.subtitle":
      "Search authoritative Indian Standards, mandatory QCOs, and testing clause schedules.",
    "standards.search_placeholder": "Search by IS number or keyword...",
    "standards.search_btn": "Search",
    "standards.filter_division": "Division:",
    "standards.filter_all": "All Divisions",
    "standards.filter_mandatory": "Mandatory QCO Only",
    "standards.div_mech": "Mechanical Engineering",
    "standards.div_civil": "Civil Engineering",
    "standards.div_electro": "Electrotechnical",
    "standards.div_met": "Metallurgical Engineering",
    "standards.div_food": "Food and Agriculture",
    "standards.loading_msg": "Retrieving Standards from BIS Repository...",
    "standards.loading_sub":
      "Applying division filters and QCO regulatory scopes...",
    "standards.empty_title": "No Indian Standards Found",
    "standards.empty_desc":
      "Try broadening your search query or reset the filters.",
    "standards.empty_action": "Reset Filters",
    "findstd.badge": "AI Product Scope Profiler",
    "findstd.title_prefix": "Find Applicable",
    "findstd.title_highlight": "Indian Standard",
    "findstd.subtitle":
      "Input product specifications and get matched Indian Standards.",
    "findstd.anti_badge": "Anti-Speculation Standard",
    "findstd.anti_desc":
      "Verify final grade classification against statutory QCOs.",
    "findstd.form_title": "Product Specification Form",
    "findstd.form_subtitle":
      "Provide as many details as possible for precise standard matching.",
    "findstd.field_product": "Product Name / Type",
    "findstd.field_material": "Raw Material Composition",
    "findstd.field_application": "Intended Application / Usage",
    "findstd.field_industry": "Industry / Domain Sector",
    "findstd.field_capacity": "Capacity / Size",
    "findstd.field_techspec": "Technical Specifications",
    "findstd.placeholder_product":
      "e.g. Stainless steel water bottle, PVC cable, TMT bar",
    "findstd.placeholder_material": "e.g. SS 304, Aluminium alloy",
    "findstd.placeholder_application":
      "e.g. Drinking water storage, building construction",
    "findstd.placeholder_industry":
      "e.g. Metallurgical, Food & Agriculture, Civil",
    "findstd.placeholder_capacity": "e.g. 750 ml, 1.1kV, 12mm",
    "findstd.placeholder_techspec":
      "e.g. Voltage rating 1.1kV, double wall insulation",
    "findstd.btn_evaluate": "Evaluate Applicable Standards",
    "findstd.btn_clear": "Clear",
    "findstd.btn_sample": "Run Sample Evaluation",
    "findstd.results_title": "Evaluated Indian Standards",
    "findstd.results_complete": "Grounded Assessment Completed",
    "findstd.loading_msg": "Evaluating Product-to-Standard Scope...",
    "findstd.loading_sub":
      "Scanning Gazette notifications and material grade parameters...",
    "findstd.empty_title": "No Profile Evaluated Yet",
    "findstd.empty_desc":
      "Fill in the product specification form and click Evaluate.",
    "testing.badge": "Statutory Testing Schedules",
    "testing.title": "Indian Standards Testing Requirements",
    "testing.subtitle":
      "Inspect mandatory routine tests, acceptance criteria, and sampling rules.",
    "testing.filter_placeholder":
      "Filter by Standard Number (e.g. IS 17526, IS 10500)...",
    "testing.btn_filter": "Filter Tests",
    "testing.btn_showall": "Show All Tests",
    "testing.loading_msg":
      "Retrieving Testing Clauses & Acceptance Parameters...",
    "testing.loading_sub":
      "Cross-referencing laboratory test methods and sampling frequencies...",
    "testing.empty_title": "No Testing Requirements Found",
    "testing.empty_desc": "Try searching with IS 17526, IS 10500, or IS 1786.",
    "labs.badge": "Accredited Testing Infrastructure",
    "labs.title": "Find a BIS Recognized Laboratory",
    "labs.subtitle":
      "Search NABL and BIS recognized testing labs across Indian states.",
    "labs.search_placeholder":
      "Search by Indian Standard (e.g. IS 17526, IS 14543)...",
    "labs.btn_filter": "Filter Labs",
    "labs.filter_state": "State:",
    "labs.filter_allstates": "All States",
    "labs.loading_msg": "Locating Recognized Testing Laboratories...",
    "labs.loading_sub": "Matching accredited testing parameters...",
    "labs.empty_title": "No Laboratories Found",
    "labs.empty_desc":
      "Try removing the standard filter or choosing All States.",
    "labs.empty_action": "View All Laboratories",
    "hallmarking.badge": "Precious Metals Purity Assurance",
    "hallmarking.title_prefix": "Gold & Silver",
    "hallmarking.title_highlight": "Hallmarking Assistant",
    "hallmarking.subtitle":
      "Understand fineness grades, verify HUID codes, locate hallmarking centres.",
    "hallmarking.mandate_badge": "BIS Hallmarking Mandate",
    "hallmarking.mandate_desc":
      "Mandatory hallmarking operative across notified districts.",
    "hallmarking.3marks_title": "The 3 Mandatory Marks on Gold Jewellery",
    "hallmarking.3marks_note": "Operative since July 2021",
    "hallmarking.verify_tag": "Consumer Verification Tool",
    "hallmarking.verify_title": "Verify 6-Digit Alphanumeric HUID Structure",
    "hallmarking.verify_subtitle":
      "Test any 6-digit HUID code before buying jewellery.",
    "hallmarking.verify_placeholder": "Enter 6-character HUID (e.g. A1B2C3)",
    "hallmarking.btn_validate": "Validate Format",
    "hallmarking.verify_howto": "How to verify on BIS Care App:",
    "hallmarking.verify_safety": "Consumer Safety & Rights Tips:",
    "hallmarking.grades_title":
      "Official Gold & Silver Fineness Grades (IS 1417 & IS 2112)",
    "hallmarking.comp_badge": "Statutory 2X Compensation Policy",
    "hallmarking.comp_title": "Consumer Protection Guarantee",
    "hallmarking.loading_msg":
      "Loading Hallmarking Standards & Fineness Schedules...",
    "hallmarking.loading_sub":
      "Retrieving IS 1417 and IS 2112 statutory markings...",
    "reports.badge": "Decision Support Deliverable",
    "reports.title": "BIS Compliance Roadmap Report",
    "reports.btn_print": "Print / Save as PDF",
    "reports.doc_header": "Government Compliance Assessment Document",
    "reports.doc_title": "BIS Product Compliance & Conformity Roadmap",
    "reports.section1": "1. Target Product Profile",
    "reports.label_product": "Product Evaluated:",
    "reports.label_primarystd": "Primary Applicable Standard:",
    "reports.section2": "2. Applicable Indian Standards & QCO Mandates",
    "reports.tag_mandatory": "Mandatory",
    "reports.label_regulatory": "Regulatory Notification:",
    "reports.section3": "3. Applicable BIS Certification Scheme",
    "reports.label_validity": "Validity:",
    "reports.label_surveillance": "Surveillance:",
    "reports.section4": "4. Mandatory Testing Requirements",
    "reports.col_test": "Test Parameter",
    "reports.col_clause": "Standard Clause",
    "reports.col_type": "Type",
    "reports.col_sampling": "Sampling Rule",
    "reports.section5": "5. Recommended Testing Laboratories",
    "reports.section6": "6. Statutory Documentation Checklist",
    "reports.section7": "Key Statutory Compliance Pitfalls:",
    "reports.disclaimer_title": "Authoritative Compliance Notice:",
    "reports.loading_msg": "Synthesizing BIS Compliance Assessment Report...",
    "reports.loading_sub":
      "Compiling applicable standards, testing schedules, and statutory evidence...",
    "certification.badge": "BIS Conformity Assessment Schemes",
    "certification.title": "Certification Schemes & Compliance Roadmap",
    "certification.subtitle":
      "Understand statutory conformity schemes, factory audits, and licence grant procedures.",
    "certification.btn_report": "Generate Full Compliance Report",
    "certification.active_product": "Active Product Roadmap:",
    "certification.btn_change": "Change Product Profile →",
    "certification.roadmap_title":
      "Interactive Step-by-Step Certification Journey",
    "certification.phases": "Phases",
    "certification.details_tag": "Scheme Details",
    "certification.docs_title": "Statutory Documents Required:",
    "certification.fee_title": "Fee Structure:",
    "certification.validity": "Validity:",
    "certification.surveillance": "Surveillance:",
    "certification.link_official": "Official Manakonline / CRS Portal",
    "certification.loading_msg": "Loading Certification Scheme Requirements...",
    "certification.loading_sub":
      "Compiling documentation checklists and audit schedules...",
    "consumer.badge": "Citizen & Consumer Protection",
    "consumer.title_prefix": "Consumer Safety &",
    "consumer.title_highlight": "ISI Mark Verification Hub",
    "consumer.subtitle":
      "Verify ISI Mark CM/L licence numbers, detect counterfeit markings, access grievance channels.",
    "consumer.helpline_badge": "Toll-Free Consumer Helpline",
    "consumer.helpline_number": "1800-11-4000",
    "consumer.verify_tag": "Licence Authentication",
    "consumer.verify_title": "Verify ISI Mark CM/L Number",
    "consumer.verify_subtitle":
      "Enter the 7 or 8-digit numeric licence code beneath the ISI triangular logo.",
    "consumer.verify_placeholder":
      "Enter 7 or 8-digit CM/L Number (e.g. 1454301)",
    "consumer.btn_check": "Check Licence Structure",
    "consumer.checklist_auth": "Authenticity Verification Checklist:",
    "consumer.checklist_fraud": "Red Flag Fraud Indicators:",
    "consumer.link_biscare": "Download Official BIS Care Citizen App",
    "consumer.complaint_title": "How to Lodge a Counterfeit Complaint",
    "consumer.complaint_desc":
      "Submit an anonymous report to BIS Enforcement Branch via the BIS Care App or e-BIS portal.",
    "consumer.categories_title": "Key Mandatory Consumer Categories",
    "consumer.categories_desc":
      "Products that strictly require the ISI Mark before retail sale in India:",
    "consumer.cat_packaged_water": "Packaged Drinking Water",
    "consumer.cat_cement": "Cement",
    "consumer.cat_steel_tmt": "Steel TMT Bars",
    "consumer.cat_pvc_pipes": "PVC Pipes",
    "consumer.cat_electrical": "Electrical Appliances",
    "consumer.cat_food_dairy": "Food & Dairy Products",
    "consumer.cat_lpg": "LPG Cylinders",
    "consumer.cat_gold": "Gold Jewellery",
    "footer.description":
      "AI-Powered Decision-Support Platform for Indian Standards, Certification Schemes, Laboratory Testing, and Hallmarking.",
    "footer.tagline": "Retrieve First → Reason Second → Cite Everything",
    "footer.portals_title": "BIS Portals",
    "footer.ebis": "e-BIS Portal",
    "footer.manakonline": "Manakonline (Scheme I)",
    "footer.crs": "CRS Portal (Electronics)",
    "footer.nabl": "NABL Directory",
    "footer.modules_title": "Core Modules",
    "footer.find_standard": "Find My Standard",
    "footer.certification": "Certification Schemes",
    "footer.testing": "Testing Requirements",
    "footer.labs": "Recognized Labs Finder",
    "footer.hallmarking": "Gold & Silver Hallmarking",
    "footer.legal_title": "Legal & Quality Notice",
    "footer.legal_text":
      "Information provided is grounded in published Indian Standards and Gazette notifications. Formal legal compliance requires certification grant through official BIS portals.",
    "footer.admin_link": "Admin & Evaluation Console →",
    "footer.copyright":
      "BIS Saarthi. Built for Indian Industry, MSMEs & Citizens.",
    "footer.consumer_grievance": "ಗ್ರಾಹಕ ದೂರು",
    "footer.ai_support": "AI ನಿರ್ಧಾರ ಬೆಂಬಲ",
    "prompts.industry.1":
      "ನಾನು ಸ್ಟೇನ್‌ಲೆಸ್ ಸ್ಟೀಲ್ ವಾಟರ್ ಬಾಟಲ್‌ಗಳನ್ನು ತಯಾರಿಸುತ್ತೇನೆ. ಯಾವ ಮಾನದಂಡ ಅನ್ವಯಿಸುತ್ತದೆ?",
    "prompts.industry.2":
      "ಲಿಥಿಯಂ-ಐಯಾನ್ ಪವರ್ ಬ್ಯಾಂಕ್‌ಗಳಿಗೆ BIS ಪ್ರಮಾಣೀಕರಣ ಅಗತ್ಯವಿದೆಯೇ?",
    "prompts.industry.3":
      "IS 1786 ಅಡಿಯಲ್ಲಿ TMT ಸ್ಟೀಲ್ ಬಾರ್‌ಗಳಿಗೆ ಯಾವ ಪರೀಕ್ಷೆಗಳು ಅಗತ್ಯವಿದೆ?",
    "prompts.industry.4":
      "ಸ್ಕೀಮ್-I ಗಾಗಿ ಫ್ಯಾಕ್ಟರಿ ಆಡಿಟ್ ಮತ್ತು ಮಾದರಿ ಪರೀಕ್ಷಾ ಪ್ರಕ್ರಿಯೆ ಏನು?",
    "prompts.industry.5":
      "ಭಾರತಕ್ಕೆ ರಫ್ತು ಮಾಡುವ ವಿದೇಶಿ ತಯಾರಕರಿಗೆ FMCS ಮಾರ್ಗಸೂಚಿಗಳು",
    "prompts.industry.6":
      "IS 302 ಎಲೆಕ್ಟ್ರಿಕಲ್ ಉಪಕರಣಗಳಿಗೆ ಅಗತ್ಯವಾದ ಲ್ಯಾಬ್ ಪರೀಕ್ಷಾ ಸಾಧನಗಳು",
    "prompts.consumer.1":
      "6-ಅಂಕಿಯ HUID ಜೊತೆಗಿನ ಚಿನ್ನದ ಆಭರಣಗಳ ಹಾಲ್‌ಮಾರ್ಕ್ ಅನ್ನು ನಾನು ಹೇಗೆ ಪರಿಶೀಲಿಸಬಹುದು?",
    "prompts.consumer.2":
      "ಪ್ಯಾಕೇಜ್ ಮಾಡಿದ ನೀರಿನ ಮೇಲಿನ ISI ಮಾರ್ಕ್ ನಿಜವಾದುದೇ ಎಂದು ನಾನು ಹೇಗೆ ಪರಿಶೀಲಿಸಬಹುದು?",
    "prompts.consumer.3":
      "ದೋಷಪೂರಿತ ISI ಪ್ರಮಾಣೀಕೃತ ಸರಕುಗಳ ವಿರುದ್ಧ ಗ್ರಾಹಕ ದೂರು ಹೇಗೆ ಸಲ್ಲಿಸುವುದು?",
    "prompts.consumer.4":
      "BIS ಹಾಲ್‌ಮಾರ್ಕ್ ಮತ್ತು 916 ಶುದ್ಧತೆ ಮಾರ್ಕ್ ನಡುವಿನ ವ್ಯತ್ಯಾಸ.",
    "prompts.consumer.5": "ಸ್ಮಾರ್ಟ್ ಫೋನ್‌ಗಳಿಗೆ BIS ನೋಂದಣಿ ಕಡ್ಡಾಯವೇ?",
    "prompts.student.1":
      "IS 10500 ಕ್ಲಾಸ್ 4.2 ಕುಡಿಯುವ ನೀರಿನ TDS & ಭಾರೀ ಲೋಹದ ಮಿತಿಗಳನ್ನು ವಿವರಿಸಿ",
    "prompts.student.2":
      "IS 456 ಮಾನದಂಡಗಳು ಮತ್ತು Eurocode 2 ನಡುವಿನ ತುಲನಾತ್ಮಕ ವಿಶ್ಲೇಷಣೆ",
    "prompts.student.3": "NBC 2016 ಗೆ ಇತ್ತೀಚಿನ ತಿದ್ದುಪಡಿಗಳು ಯಾವುವು?",
    "prompts.student.5":
      "2015 ರ ಮೊದಲು ಹಿಂತೆಗೆದುಕೊಂಡ ಆರ್ಕೈವ್ ಮಾನದಂಡಗಳನ್ನು ಹೇಗೆ ಪ್ರವೇಶಿಸುವುದು?",
    "prompts.student.6":
      "IS 1417 ಮತ್ತು ಅಂತರಾಷ್ಟ್ರೀಯ ಮಾನದಂಡಗಳ ನಡುವಿನ hallmarking assaying tolerances ಹೋಲಿಕೆ ಮಾಡಿ",
    "prompts.admin.1":
      "What are the active Quality Control Orders (QCOs) in effect?",
    "prompts.admin.2":
      "Audit compliance checklist for BIS recognized testing laboratories",
    "prompts.admin.3":
      "Standards revision roadmap and committee review process",
    "consumer.complaint_step1": "1. ಉತ್ಪನ್ನ ಮತ್ತು ಪ್ಯಾಕೇಜಿಂಗ್‌ನ ಸ್ಪಷ್ಟ ಫೋಟೋಗಳನ್ನು ತೆಗೆಯಿರಿ.",

    "consumer.complaint_step2": "2. ಚಿಲ್ಲರೆ ಕ್ಯಾಶ್ ಮೆಮೊ / GST ಇನ್‌ವಾಯ್ಸ್ ಸಂರಕ್ಷಿಸಿ.",

    "consumer.complaint_step3": "3. BIS Care ಆ್ಯಪ್‌ನಲ್ಲಿ ಚಿಲ್ಲರೆ ವ್ಯಾಪಾರಿ ವಿಳಾಸದೊಂದಿಗೆ ದೂರು ಸಲ್ಲಿಸಿ.",

    "consumer.cat_lpg_cylinders": "LPG ರೆಗ್ಯುಲೇಟರ್‌ಗಳು & ಸಿಲಿಂಡರ್‌ಗಳು",

    "consumer.cat_infant_formula": "ಶಿಶು ಆಹಾರ",

    "consumer.cat_immersion_heaters": "ಇಮ್ಮರ್ಶನ್ ಹೀಟರ್‌ಗಳು",

    "consumer.cat_auto_tyres": "ವಾಹನ ಟೈರ್‌ಗಳು",

    "labs.state_maharashtra": "ಮಹಾರಾಷ್ಟ್ರ",

    "labs.state_delhi": "ದೆಹಲಿ",

    "labs.state_uttar_pradesh": "ಉತ್ತರ ಪ್ರದೇಶ",

    "labs.state_karnataka": "ಕರ್ನಾಟಕ",

    "labs.state_haryana": "ಹರಿಯಾಣ",

    "labs.state_tamil_nadu": "ತಮಿಳುನಾಡು",

    "labs.state_gujarat": "ಗುಜರಾತ್",

  },
  [IndianLanguage.ML]: {
    "nav.standards": "മാനദണ്ഡങ്ങൾ",
    "nav.find_standard": "മാനദണ്ഡം കണ്ടെത്തുക",
    "nav.catalogue": "മാനദണ്ഡ കാറ്റലോഗ്",
    "nav.certification": "സർട്ടിഫിക്കേഷൻ",
    "nav.testing": "പരിശോധന",
    "nav.labs": "ലാബുകൾ",
    "nav.hallmark": "ഹാൾമാർക്ക്",
    "nav.consumer": "ഉപഭോക്തൃ സംരക്ഷണം",
    "nav.reports": "റിപ്പോർട്ടുകൾ",
    "nav.ask_bis_ai": "BIS AI-യോട് ചോദിക്കുക",
    "nav.ask_ai": "ചോദിക്കുക AI",
    "hero.title":
      "ഇന്ത്യൻ മാനദണ്ഡങ്ങൾക്കും BIS സേവനങ്ങൾക്കുമുള്ള നിങ്ങളുടെ AI അസിസ്റ്റന്റ്",
    "hero.subtitle":
      "ശരിയായ മാനദണ്ഡം കണ്ടെത്തുക, സർട്ടിഫിക്കേഷൻ പ്രക്രിയകൾ മനസ്സിലാക്കുക.",
    "hero.select_profile": "നിങ്ങളുടെ പ്രൊഫൈൽ മോഡ് തിരഞ്ഞെടുക്കുക:",
    "hero.search_placeholder": "ഉൽപ്പന്ന മാനദണ്ഡങ്ങളെക്കുറിച്ച് ചോദിക്കുക...",
    "hero.ask_ai_btn": "ചോദിക്കുക AI",
    "hero.suggested_queries": "നിർദ്ദേശിച്ച ചോദ്യങ്ങൾ:",
    "chat.new_session": "+ പുതിയ ചാറ്റ് സെഷൻ",
    "chat.specialized_tools": "BIS പ്രത്യേക ടൂളുകൾ",
    "chat.find_standard": "എന്റെ സ്റ്റാൻഡേർഡ് കണ്ടെത്തുക",
    "chat.certification_schemes": "സർട്ടിഫിക്കേഷൻ സ്കീമുകൾ",
    "chat.testing_requirements": "ടെസ്റ്റിംഗ് ആവശ്യകതകൾ",
    "chat.find_lab": "അംഗീകൃത ലാബ് കണ്ടെത്തുക",
    "chat.generate_report": "കംപ്ലയൻസ് റിപ്പോർട്ട് തയ്യാറാക്കുക",
    "chat.active_workspace": "ആക്ടീവ് വർക്ക്‌സ്‌പേസ്",
    "chat.current_investigation": "നിലവിലെ അന്വേഷണം",
    "chat.grounded_active": "തെളിവ് അടിസ്ഥാനമാക്കിയുള്ള വീണ്ടെടുക്കൽ സജീവം",
    "chat.grounded_desc":
      "ഗസറ്റ് വിജ്ഞാപനങ്ങളിൽ നിന്ന് പരിശോധിച്ചുറപ്പിച്ച ഉത്തരങ്ങൾ.",
    "chat.conversation_title": "BIS സാരഥി സംഭാഷണം",
    "chat.mode": "മോഡ്:",
    "chat.language_label": "ഭാഷ:",
    "chat.evidence_panel_btn": "തെളിവ് പാനൽ",
    "chat.welcome_title": "BIS സാരഥി — തെളിവ് അധിഷ്ഠിത തീരുമാന സഹായി",
    "chat.input_placeholder":
      "സ്റ്റാൻഡേർഡുകൾ, സർട്ടിഫിക്കേഷൻ, ടെസ്റ്റിംഗ് രീതികൾ എന്നിവയെക്കുറിച്ച് ചോദിക്കുക...",
    "chat.send_btn": "അയക്കുക",
    "chat.answer_language": "മറുപടി ഭാഷ",
    "chat.detected_language": "തിരിച്ചറിഞ്ഞ ഭാഷ",
    "chat.evidence_panel": "ഔദ്യോഗിക തെളിവുകളും ഉദ്ധരണികളും",
    "chat.confidence": "വിശ്വാസ്യത ലെവൽ",
    "chat.source_freshness": "സ്ഥിരീകരിച്ച ഉറവിടം",
    "chat.searching_status":
      "BIS ശേഖരത്തിൽ തിരയുകയും വകുപ്പുകൾ വീണ്ടെടുക്കുകയും ചെയ്യുന്നു...",
    "chat.traceable_citations": "ആധികാരിക ഉദ്ധരണികൾ:",
    "chat.copy_answer": "മറുപടി പകർത്തുക",
    "chat.copied": "പകർത്തി",
    "chat.helpful": "സഹായകരമായ മറുപടി",
    "chat.not_helpful": "സഹായകരമല്ല",
    "chat.report_citation": "തെറ്റായ ഉദ്ധരണി റിപ്പോർട്ട് ചെയ്യുക",
    "chat.disclaimer":
      "കൃത്യത ഉറപ്പ്: BIS സാരഥി ഇന്ത്യൻ മാനദണ്ഡങ്ങൾ അടിസ്ഥാനമാക്കിയുള്ള വിവരങ്ങൾ മാത്രം നൽകുന്നു.",
    "chat.bis_act_compliant": "BIS ആക്ട് 2016 അനുസൃതമാണ്",
    "evidence.title": "ആധികാരിക തെളിവുകളും ഉദ്ധരണികളും",
    "evidence.indian_standard": "ഇന്ത്യൻ സ്റ്റാൻഡേർഡ്",
    "evidence.clause": "വകുപ്പ്:",
    "evidence.page": "പേജ്:",
    "evidence.publication": "പ്രസിദ്ധീകരണ തീയതി:",
    "evidence.relevance": "പ്രസക്തി:",
    "evidence.freshness_notice": "അറിയിപ്പ്:",
    "evidence.verbatim_excerpt": "യഥാർത്ഥ മാനദണ്ഡ വകുപ്പ് ഉദ്ധരണി",
    "evidence.copy_excerpt": "ഉദ്ധരണി പകർത്തുക",
    "evidence.copied": "പകർത്തി",
    "evidence.view_source": "ഔദ്യോഗിക BIS പോർട്ടലിൽ കാണുക",
    "evidence.no_evidence_title": "തെളിവുകളൊന്നും പരാമർശിച്ചിട്ടില്ല",
    "evidence.no_evidence_desc":
      "BIS മാനദണ്ഡങ്ങളും തെളിവുകളും പരിശോധിക്കാൻ ഒരു ചോദ്യം ചോദിക്കുക.",
    "common.loading": "BIS RAG എഞ്ചിൻ വഴി മറുപടി തയ്യാറാക്കുന്നു...",
    "common.error": "പ്രോസസ്സ് ചെയ്യാൻ കഴിഞ്ഞില്ല. കണക്ഷൻ പരിശോധിക്കുക.",

    "header.subtitle": "Indian Standards Intelligence",
    "home.how_subtitle_prefix": "Strict adherence to",
    "home.how_subtitle_bold":
      '"Retrieve First → Reason Second → Cite Everything"',
    "home.mode_industry": "വ്യവസായം / MSME",
    "home.mode_consumer": "ഉപഭോക്താവ്",
    "home.mode_student": "വിദ്യാർഥി / ഗവേഷകൻ",
    "home.mode_admin": "ഭരണ & നിയന്ത്രണ",
    "home.mode_consumer_placeholder":
      "സ്വർണ HUID പരിശോധിക്കുക, ISI മാർക്ക് ഉറപ്പാക്കുക...",
    "home.mode_student_placeholder":
      "Standard clauses തിരയുക, comparative analysis...",
    "home.mode_admin_placeholder":
      "Standards, schemes, reports, administrative guidelines...",
    "home.features_title": "ഇന്ത്യൻ സ്റ്റാൻഡേർഡ്‌ ബ്യൂറോയുടെ സമഗ്ര വിവരം",
    "home.features_subtitle":
      "നിർമ്മാതാക്കൾ, ഉപഭോക്താക്കൾ, ഗവേഷകർ — structured modules.",
    "home.features_find_title": "Standard Find Workflow",
    "home.features_find_badge": "AI Profiler",
    "home.features_find_tag": "Product Matching",
    "home.features_find_desc":
      "ഉൽപ്പന്ന specs, raw materials, intended application — ഇന്ത്യൻ standard match.",
    "home.features_find_action": "Profiler ആരംഭിക്കുക →",
    "home.features_cert_title": "സർട്ടിഫിക്കേഷൻ സ്കീമുകൾ & Roadmap",
    "home.features_cert_badge": "ISI & CRS",
    "home.features_cert_tag": "Audit & FMCS",
    "home.features_cert_desc":
      "Scheme I (ISI Mark), CRS, FMCS — timelines, documentation, factory audit rules.",
    "home.features_cert_action": "Schemes കാണുക →",
    "home.features_testing_title": "Testing Requirements & Clauses",
    "home.features_testing_badge": "Clauses",
    "home.features_testing_tag": "Sampling Schedules",
    "home.features_testing_desc":
      "Acceptance criteria, sampling rules, testing frequencies — ഇന്ത്യൻ standard sources.",
    "home.features_testing_action": "Test Schedules കാണുക →",
    "home.features_labs_title": "BIS Recognized Laboratories Finder",
    "home.features_labs_badge": "Lab Network",
    "home.features_labs_tag": "NABL & BIS Facilities",
    "home.features_labs_desc":
      "IS number, product category, test capability, state, city — ലബോറട്ടറി find.",
    "home.features_labs_action": "Accredited Lab കണ്ടെത്തുക →",
    "home.features_hallmark_title": "സ്വർണ-വെള്ളി Hallmarking Assistant",
    "home.features_hallmark_badge": "HUID Check",
    "home.features_hallmark_tag": "Purity & Assaying",
    "home.features_hallmark_desc":
      "22K (916), 18K (750), 14K (585) — 6-digit HUID verify.",
    "home.features_hallmark_action": "Hallmarking Guide →",
    "home.features_consumer_title": "Consumer Protection & ISI Check",
    "home.features_consumer_badge": "Verify & Report",
    "home.features_consumer_tag": "Grievance Redressal",
    "home.features_consumer_desc":
      "ISI Mark CM/L numbers verify, counterfeit marks detect, grievance steps.",
    "home.features_consumer_action": "Consumer Hub →",
    "home.how_title": "BIS Saarthi എങ്ങനെ പ്രവർത്തിക്കുന്നു",
    "home.how_badge": "Architecture & Verification Pipeline",
    "home.how_step1_title": "ചോദ്യം ചോദിക്കുക",
    "home.how_step1_desc": "ഇംഗ്ലീഷ്, മലയാളം, 22 ഭാഷകളിൽ.",
    "home.how_step2_title": "Retrieve",
    "home.how_step2_desc": "BIS repository hybrid BM25 + Vector search.",
    "home.how_step3_title": "Verify",
    "home.how_step3_desc": "Cross-encoder reranking & freshness verification.",
    "home.how_step4_title": "Explain",
    "home.how_step4_desc": "സ്പഷ്ടമായ guidance.",
    "home.how_step5_title": "Cite",
    "home.how_step5_desc": "Standard number, clause, page traceable.",
    "home.trust_badge": "Zero Hallucination Operational Standard",
    "home.trust_title": "MSMEs, Compliance Teams & പൗരൻമാർ വിശ്വസിക്കുന്നു",
    "home.trust_desc":
      "BIS Saarthi ഒരിക്കലും Indian Standard numbers, test clauses കൃത്രിമമായി ഉണ്ടാക്കുന്നില്ല.",
    "home.trust_action": "AI Workspace ആരംഭിക്കുക →",
    "standards.badge": "Bureau of Indian Standards Repository",
    "standards.title": "Indian Standards Directory & Search",
    "standards.subtitle":
      "Search authoritative Indian Standards, mandatory QCOs, and testing clause schedules.",
    "standards.search_placeholder": "Search by IS number or keyword...",
    "standards.search_btn": "തിരയുക",
    "standards.filter_division": "Division:",
    "standards.filter_all": "എല്ലാ Divisions",
    "standards.filter_mandatory": "Mandatory QCO Only",
    "standards.div_mech": "Mechanical Engineering",
    "standards.div_civil": "Civil Engineering",
    "standards.div_electro": "Electrotechnical",
    "standards.div_met": "Metallurgical Engineering",
    "standards.div_food": "Food and Agriculture",
    "standards.loading_msg": "Retrieving Standards from BIS Repository...",
    "standards.loading_sub":
      "Applying division filters and QCO regulatory scopes...",
    "standards.empty_title": "ഇന്ത്യൻ Standards കണ്ടെത്തിയില്ല",
    "standards.empty_desc":
      "Try broadening your search query or reset the filters.",
    "standards.empty_action": "Filters Reset",
    "findstd.badge": "AI Product Scope Profiler",
    "findstd.title_prefix": "ബാധകമായ",
    "findstd.title_highlight": "ഇന്ത്യൻ Standard",
    "findstd.subtitle":
      "Input product specifications and get matched Indian Standards.",
    "findstd.anti_badge": "Anti-Speculation Standard",
    "findstd.anti_desc":
      "Verify final grade classification against statutory QCOs.",
    "findstd.form_title": "Product Specification Form",
    "findstd.form_subtitle":
      "Provide as many details as possible for precise standard matching.",
    "findstd.field_product": "Product Name / Type",
    "findstd.field_material": "Raw Material Composition",
    "findstd.field_application": "Intended Application / Usage",
    "findstd.field_industry": "Industry / Domain Sector",
    "findstd.field_capacity": "Capacity / Size",
    "findstd.field_techspec": "Technical Specifications",
    "findstd.placeholder_product":
      "e.g. Stainless steel water bottle, PVC cable, TMT bar",
    "findstd.placeholder_material": "e.g. SS 304, Aluminium alloy",
    "findstd.placeholder_application":
      "e.g. Drinking water storage, building construction",
    "findstd.placeholder_industry":
      "e.g. Metallurgical, Food & Agriculture, Civil",
    "findstd.placeholder_capacity": "e.g. 750 ml, 1.1kV, 12mm",
    "findstd.placeholder_techspec":
      "e.g. Voltage rating 1.1kV, double wall insulation",
    "findstd.btn_evaluate": "Evaluate Applicable Standards",
    "findstd.btn_clear": "Clear",
    "findstd.btn_sample": "Run Sample Evaluation",
    "findstd.results_title": "Evaluated Indian Standards",
    "findstd.results_complete": "Grounded Assessment Completed",
    "findstd.loading_msg": "Evaluating Product-to-Standard Scope...",
    "findstd.loading_sub":
      "Scanning Gazette notifications and material grade parameters...",
    "findstd.empty_title": "No Profile Evaluated Yet",
    "findstd.empty_desc":
      "Fill in the product specification form and click Evaluate.",
    "testing.badge": "Statutory Testing Schedules",
    "testing.title": "Indian Standards Testing Requirements",
    "testing.subtitle":
      "Inspect mandatory routine tests, acceptance criteria, and sampling rules.",
    "testing.filter_placeholder":
      "Filter by Standard Number (e.g. IS 17526, IS 10500)...",
    "testing.btn_filter": "Filter Tests",
    "testing.btn_showall": "Show All Tests",
    "testing.loading_msg":
      "Retrieving Testing Clauses & Acceptance Parameters...",
    "testing.loading_sub":
      "Cross-referencing laboratory test methods and sampling frequencies...",
    "testing.empty_title": "No Testing Requirements Found",
    "testing.empty_desc": "Try searching with IS 17526, IS 10500, or IS 1786.",
    "labs.badge": "Accredited Testing Infrastructure",
    "labs.title": "Find a BIS Recognized Laboratory",
    "labs.subtitle":
      "Search NABL and BIS recognized testing labs across Indian states.",
    "labs.search_placeholder":
      "Search by Indian Standard (e.g. IS 17526, IS 14543)...",
    "labs.btn_filter": "Filter Labs",
    "labs.filter_state": "State:",
    "labs.filter_allstates": "All States",
    "labs.loading_msg": "Locating Recognized Testing Laboratories...",
    "labs.loading_sub": "Matching accredited testing parameters...",
    "labs.empty_title": "No Laboratories Found",
    "labs.empty_desc":
      "Try removing the standard filter or choosing All States.",
    "labs.empty_action": "View All Laboratories",
    "hallmarking.badge": "Precious Metals Purity Assurance",
    "hallmarking.title_prefix": "Gold & Silver",
    "hallmarking.title_highlight": "Hallmarking Assistant",
    "hallmarking.subtitle":
      "Understand fineness grades, verify HUID codes, locate hallmarking centres.",
    "hallmarking.mandate_badge": "BIS Hallmarking Mandate",
    "hallmarking.mandate_desc":
      "Mandatory hallmarking operative across notified districts.",
    "hallmarking.3marks_title": "The 3 Mandatory Marks on Gold Jewellery",
    "hallmarking.3marks_note": "Operative since July 2021",
    "hallmarking.verify_tag": "Consumer Verification Tool",
    "hallmarking.verify_title": "Verify 6-Digit Alphanumeric HUID Structure",
    "hallmarking.verify_subtitle":
      "Test any 6-digit HUID code before buying jewellery.",
    "hallmarking.verify_placeholder": "Enter 6-character HUID (e.g. A1B2C3)",
    "hallmarking.btn_validate": "Validate Format",
    "hallmarking.verify_howto": "How to verify on BIS Care App:",
    "hallmarking.verify_safety": "Consumer Safety & Rights Tips:",
    "hallmarking.grades_title":
      "Official Gold & Silver Fineness Grades (IS 1417 & IS 2112)",
    "hallmarking.comp_badge": "Statutory 2X Compensation Policy",
    "hallmarking.comp_title": "Consumer Protection Guarantee",
    "hallmarking.loading_msg":
      "Loading Hallmarking Standards & Fineness Schedules...",
    "hallmarking.loading_sub":
      "Retrieving IS 1417 and IS 2112 statutory markings...",
    "reports.badge": "Decision Support Deliverable",
    "reports.title": "BIS Compliance Roadmap Report",
    "reports.btn_print": "Print / Save as PDF",
    "reports.doc_header": "Government Compliance Assessment Document",
    "reports.doc_title": "BIS Product Compliance & Conformity Roadmap",
    "reports.section1": "1. Target Product Profile",
    "reports.label_product": "Product Evaluated:",
    "reports.label_primarystd": "Primary Applicable Standard:",
    "reports.section2": "2. Applicable Indian Standards & QCO Mandates",
    "reports.tag_mandatory": "Mandatory",
    "reports.label_regulatory": "Regulatory Notification:",
    "reports.section3": "3. Applicable BIS Certification Scheme",
    "reports.label_validity": "Validity:",
    "reports.label_surveillance": "Surveillance:",
    "reports.section4": "4. Mandatory Testing Requirements",
    "reports.col_test": "Test Parameter",
    "reports.col_clause": "Standard Clause",
    "reports.col_type": "Type",
    "reports.col_sampling": "Sampling Rule",
    "reports.section5": "5. Recommended Testing Laboratories",
    "reports.section6": "6. Statutory Documentation Checklist",
    "reports.section7": "Key Statutory Compliance Pitfalls:",
    "reports.disclaimer_title": "Authoritative Compliance Notice:",
    "reports.loading_msg": "Synthesizing BIS Compliance Assessment Report...",
    "reports.loading_sub":
      "Compiling applicable standards, testing schedules, and statutory evidence...",
    "certification.badge": "BIS Conformity Assessment Schemes",
    "certification.title": "BIS Certification Schemes",
    "certification.subtitle":
      "Understand statutory conformity schemes, factory audits, and licence grant procedures.",
    "certification.btn_report": "Generate Full Compliance Report",
    "certification.active_product": "Active Product Roadmap:",
    "certification.btn_change": "Change Product Profile →",
    "certification.roadmap_title":
      "Interactive Step-by-Step Certification Journey",
    "certification.phases": "Phases",
    "certification.details_tag": "Scheme Details",
    "certification.docs_title": "Statutory Documents Required:",
    "certification.fee_title": "Fee Structure:",
    "certification.validity": "Validity:",
    "certification.surveillance": "Surveillance:",
    "certification.link_official": "Official Manakonline / CRS Portal",
    "certification.loading_msg": "Loading Certification Scheme Requirements...",
    "certification.loading_sub":
      "Compiling documentation checklists and audit schedules...",
    "consumer.badge": "Citizen & Consumer Protection",
    "consumer.title_prefix": "Consumer Safety &",
    "consumer.title_highlight": "ISI Mark Verification Hub",
    "consumer.subtitle":
      "Verify ISI Mark CM/L licence numbers, detect counterfeit markings, access grievance channels.",
    "consumer.helpline_badge": "Toll-Free Consumer Helpline",
    "consumer.helpline_number": "1800-11-4000",
    "consumer.verify_tag": "Licence Authentication",
    "consumer.verify_title": "Verify ISI Mark CM/L Number",
    "consumer.verify_subtitle":
      "Enter the 7 or 8-digit numeric licence code beneath the ISI triangular logo.",
    "consumer.verify_placeholder":
      "Enter 7 or 8-digit CM/L Number (e.g. 1454301)",
    "consumer.btn_check": "Check Licence Structure",
    "consumer.checklist_auth": "Authenticity Verification Checklist:",
    "consumer.checklist_fraud": "Red Flag Fraud Indicators:",
    "consumer.link_biscare": "Download Official BIS Care Citizen App",
    "consumer.complaint_title": "How to Lodge a Counterfeit Complaint",
    "consumer.complaint_desc":
      "Submit an anonymous report to BIS Enforcement Branch via the BIS Care App or e-BIS portal.",
    "consumer.categories_title": "Key Mandatory Consumer Categories",
    "consumer.categories_desc":
      "Products that strictly require the ISI Mark before retail sale in India:",
    "consumer.cat_packaged_water": "Packaged Drinking Water",
    "consumer.cat_cement": "Cement",
    "consumer.cat_steel_tmt": "Steel TMT Bars",
    "consumer.cat_pvc_pipes": "PVC Pipes",
    "consumer.cat_electrical": "Electrical Appliances",
    "consumer.cat_food_dairy": "Food & Dairy Products",
    "consumer.cat_lpg": "LPG Cylinders",
    "consumer.cat_gold": "Gold Jewellery",
    "footer.description":
      "AI-Powered Decision-Support Platform for Indian Standards, Certification Schemes, Laboratory Testing, and Hallmarking.",
    "footer.tagline": "Retrieve First → Reason Second → Cite Everything",
    "footer.portals_title": "BIS Portals",
    "footer.ebis": "e-BIS Portal",
    "footer.manakonline": "Manakonline (Scheme I)",
    "footer.crs": "CRS Portal (Electronics)",
    "footer.nabl": "NABL Directory",
    "footer.modules_title": "Core Modules",
    "footer.find_standard": "Find My Standard",
    "footer.certification": "Certification Schemes",
    "footer.testing": "Testing Requirements",
    "footer.labs": "Recognized Labs Finder",
    "footer.hallmarking": "Gold & Silver Hallmarking",
    "footer.legal_title": "Legal & Quality Notice",
    "footer.legal_text":
      "Information provided is grounded in published Indian Standards and Gazette notifications. Formal legal compliance requires certification grant through official BIS portals.",
    "footer.admin_link": "Admin & Evaluation Console →",
    "footer.copyright":
      "BIS Saarthi. Built for Indian Industry, MSMEs & Citizens.",
    "footer.consumer_grievance": "ഉപഭോക്തൃ പരാതി",
    "footer.ai_support": "AI Decision Support",
    "prompts.industry.1":
      "ഞാൻ Stainless Steel Water Bottles നിർമ്മിക്കുന്നു. ഏത് standard?",
    "prompts.industry.2":
      "Lithium-ion Power Banks — BIS certification ആവശ്യമോ?",
    "prompts.industry.3": "IS 1786 TMT Steel Bars — tests?",
    "prompts.industry.4": "Scheme-I factory audit & sample testing?",
    "prompts.industry.5":
      "India export foreign manufacturers — FMCS guidelines",
    "prompts.industry.6":
      "IS 302 electrical appliances — lab testing equipment",
    "prompts.consumer.1": "6-digit HUID സ്വർണ hallmark verify?",
    "prompts.consumer.2": "Packaged water ISI mark genuine — check?",
    "prompts.consumer.3":
      "Defective ISI certified goods — consumer grievance file?",
    "prompts.consumer.4": "BIS Hallmark vs 916 purity mark — difference.",
    "prompts.consumer.5": "Smartphones — BIS registration mandatory?",
    "prompts.consumer.6": "CRS scheme electronics R-number verify?",
    "prompts.student.1":
      "IS 10500 Clause 4.2 drinking water TDS & heavy metal limits",
    "prompts.student.2": "IS 456 vs Eurocode 2 — comparative analysis",
    "prompts.student.3": "NBC 2016 — latest amendments?",
    "prompts.student.4": "IS 2062 tensile & elongation — technical clauses",
    "prompts.student.5": "2015-ന് മുൻ withdrawn archived standards access?",
    "prompts.student.6":
      "IS 1417 vs international standards — hallmarking tolerances",
    "prompts.admin.1": "BIS Saarthi Analytics Dashboard",
    "prompts.admin.2": "Laboratory accreditation database",
    "prompts.admin.3": "Standard revision roadmap and committee review",
  },
  [IndianLanguage.PA]: {
    "nav.standards": "ਮਾਨਕ",
    "nav.find_standard": "ਮਾਨਕ ਲੱਭੋ",
    "nav.catalogue": "ਮਾਨਕ ਸੂਚੀ",
    "nav.certification": "ਪ੍ਰਮਾਣੀਕਰਨ",
    "nav.testing": "ਪਰੀਖਣ",
    "nav.labs": "ਪ੍ਰਯੋਗਸ਼ਾਲਾਵਾਂ",
    "nav.hallmark": "ਹਾਲਮਾਰਕ",
    "nav.consumer": "ਉਪਭੋਗਤਾ",
    "nav.reports": "ਰਿਪੋਰਟਾਂ",
    "nav.ask_bis_ai": "BIS AI ਨੂੰ ਪੁੱਛੋ",
    "nav.ask_ai": "AI ਨੂੰ ਪੁੱਛੋ",
    "hero.title": "ਭਾਰਤੀ ਮਾਨਕਾਂ ਅਤੇ BIS ਸੇਵਾਵਾਂ ਲਈ ਤੁਹਾਡਾ AI ਸਹਾਇਕ",
    "hero.subtitle":
      "ਸਹੀ ਮਾਨਕ ਲੱਭੋ, ਪ੍ਰਮਾਣੀਕਰਨ ਯੋਜਨਾਵਾਂ ਸਮਝੋ, hallmarking ਜਾਂਚੋ।",
    "hero.select_profile": "ਆਪਣਾ ਪ੍ਰੋਫਾਈਲ ਚੁਣੋ:",
    "hero.search_placeholder":
      "ਉਤਪਾਦ ਮਾਨਕ, Scheme I/CRS, lab testing ਬਾਰੇ ਪੁੱਛੋ...",
    "hero.ask_ai_btn": "AI ਤੋਂ ਪੁੱਛੋ",
    "hero.suggested_queries": "ਸੁਝਾਏ ਸਵਾਲ:",
    "chat.new_session": "+ ਨਵਾਂ ਚੈਟ ਸੈਸ਼ਨ",
    "chat.specialized_tools": "BIS ਵਿਸ਼ੇਸ਼ ਟੂਲ",
    "chat.find_standard": "ਮੇਰਾ ਮਿਆਰ ਲੱਭੋ",
    "chat.certification_schemes": "ਪ੍ਰਮਾਣੀਕਰਨ ਸਕੀਮਾਂ",
    "chat.testing_requirements": "ਟੈਸਟਿੰਗ ਲੋੜਾਂ",
    "chat.find_lab": "ਮਾਨਤਾ ਪ੍ਰਾਪਤ ਲੈਬ ਲੱਭੋ",
    "chat.generate_report": "ਪਾਲਣਾ ਰਿਪੋਰਟ ਤਿਆਰ ਕਰੋ",
    "chat.active_workspace": "ਸਰਗਰਮ ਵਰਕਸਪੇਸ",
    "chat.current_investigation": "ਮੌਜੂਦਾ ਜਾਂਚ",
    "chat.grounded_active": "ਸਬੂਤ ਅਧਾਰਤ ਪ੍ਰਾਪਤੀ ਸਰਗਰਮ",
    "chat.grounded_desc": "ਸਰਕਾਰੀ ਗਜ਼ਟ ਨੋਟੀਫਿਕੇਸ਼ਨਾਂ ਤੋਂ ਪ੍ਰਮਾਣਿਤ ਜਵਾਬ।",
    "chat.conversation_title": "BIS ਸਾਰਥੀ ਗੱਲਬਾਤ",
    "chat.mode": "ਮੋਡ:",
    "chat.language_label": "ਭਾਸ਼ਾ:",
    "chat.evidence_panel_btn": "ਸਬੂਤ ਪੈਨਲ",
    "chat.welcome_title": "BIS ਸਾਰਥੀ — ਸਬੂਤ ਅਧਾਰਤ ਫੈਸਲਾ ਸਹਾਇਕ",
    "chat.input_placeholder":
      "ਮਿਆਰਾਂ, ਪ੍ਰਮਾਣੀਕਰਨ, ਟੈਸਟਿੰਗ ਤਰੀਕਿਆਂ ਜਾਂ ਧਾਰਾਵਾਂ ਬਾਰੇ ਪੁੱਛੋ...",
    "chat.send_btn": "ਭੇਜੋ",
    "chat.answer_language": "ਜਵਾਬ ਦੀ ਭਾਸ਼ਾ",
    "chat.detected_language": "ਪਛਾਣੀ ਗਈ ਭਾਸ਼ਾ",
    "chat.evidence_panel": "ਅਧਿਕਾਰਤ ਸਬੂਤ ਅਤੇ ਹਵਾਲੇ",
    "chat.confidence": "ਭਰੋਸੇਯੋਗਤਾ ਦਾ ਪੱਧਰ",
    "chat.source_freshness": "ਤਸਦੀਕ ਕੀਤਾ ਸਰੋਤ",
    "chat.searching_status":
      "BIS ਭੰਡਾਰ ਵਿੱਚ ਖੋਜ ਅਤੇ ਧਾਰਾਵਾਂ ਪ੍ਰਾਪਤ ਕੀਤੀਆਂ ਜਾ ਰਹੀਆਂ ਹਨ...",
    "chat.traceable_citations": "ਪ੍ਰਮਾਣਿਤ ਅਧਿਕਾਰਤ ਹਵਾਲੇ:",
    "chat.copy_answer": "ਜਵਾਬ ਕਾਪੀ ਕਰੋ",
    "chat.copied": "ਕਾਪੀ ਕੀਤਾ ਗਿਆ",
    "chat.helpful": "ਮਦਦਗਾਰ ਜਵਾਬ",
    "chat.not_helpful": "ਮਦਦਗਾਰ ਨਹੀਂ",
    "chat.report_citation": "ਗਲਤ ਹਵਾਲੇ ਦੀ ਰਿਪੋਰਟ ਕਰੋ",
    "chat.disclaimer":
      "ਸ਼ੁੱਧਤਾ ਗਾਰੰਟੀ: BIS ਸਾਰਥੀ ਭਾਰਤੀ ਮਿਆਰਾਂ ਅਨੁਸਾਰ ਕੇਵਲ ਪ੍ਰਮਾਣਿਤ ਜਾਣਕਾਰੀ ਦਿੰਦਾ ਹੈ।",
    "chat.bis_act_compliant": "BIS ਐਕਟ 2016 ਅਨੁਸਾਰ",
    "evidence.title": "ਅਧਿਕਾਰਤ ਸਬੂਤ ਅਤੇ ਹਵਾਲੇ",
    "evidence.indian_standard": "ਭਾਰਤੀ ਮਿਆਰ",
    "evidence.clause": "ਧਾਰਾ:",
    "evidence.page": "ਸਫ਼ਾ:",
    "evidence.publication": "ਪ੍ਰਕਾਸ਼ਨ ਮਿਤੀ:",
    "evidence.relevance": "ਢੁਕਵਾਂਪਣ:",
    "evidence.freshness_notice": "ਸੂਚਨਾ:",
    "evidence.verbatim_excerpt": "ਅਸਲ ਮਿਆਰ ਧਾਰਾ ਦਾ ਅੰਸ਼",
    "evidence.copy_excerpt": "ਹਵਾਲਾ ਕਾਪੀ ਕਰੋ",
    "evidence.copied": "ਕਾਪੀ ਕੀਤਾ ਗਿਆ",
    "evidence.view_source": "ਸਰਕਾਰੀ BIS ਪੋਰਟਲ ਤੇ ਵੇਖੋ",
    "evidence.no_evidence_title": "ਕੋਈ ਸਬੂਤ ਨਹੀਂ ਦਿੱਤਾ ਗਿਆ",
    "evidence.no_evidence_desc":
      "BIS ਮਿਆਰ ਧਾਰਾਵਾਂ ਵੇਖਣ ਲਈ ਕੋਈ ਸਵਾਲ ਪੁੱਛੋ ਜਾਂ ਮਿਆਰ ਚੁਣੋ।",
    "common.loading": "BIS RAG ਇੰਜਣ ਦੁਆਰਾ ਜਵਾਬ ਤਿਆਰ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...",
    "common.error": "ਬੇਨਤੀ ਦੀ ਕਾਰਵਾਈ ਅਸਫਲ ਰਹੀ। ਕਨੈਕਸ਼ਨ ਦੀ ਜਾਂਚ ਕਰੋ।",

    "header.subtitle": "Indian Standards Intelligence",
    "home.how_subtitle_prefix": "Strict adherence to",
    "home.how_subtitle_bold":
      '"Retrieve First → Reason Second → Cite Everything"',
    "home.mode_industry": "ਉਦਯੋਗ / MSME",
    "home.mode_consumer": "ਉਪਭੋਗਤਾ",
    "home.mode_student": "ਵਿਦਿਆਰਥੀ / ਖੋਜਕਾਰ",
    "home.mode_admin": "ਪ੍ਰਬੰਧਨ ਅਤੇ ਰੈਗੂਲੇਟਰੀ",
    "home.mode_consumer_placeholder": "ਸੋਨੇ ਦਾ HUID ਜਾਂਚੋ, ISI ਮਾਰਕ ਜਾਂਚੋ...",
    "home.mode_student_placeholder": "ਮਾਨਕ clauses ਖੋਜੋ, ਤੁਲਨਾਤਮਕ ਵਿਸ਼ਲੇਸ਼ਣ...",
    "home.mode_admin_placeholder": "ਮਾਨਕ, ਯੋਜਨਾਵਾਂ, ਰਿਪੋਰਟਾਂ, ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼...",
    "home.features_title": "ਭਾਰਤੀ ਮਾਨਕ ਬਿਊਰੋ ਦੀ ਵਿਆਪਕ ਸੂਚਨਾ",
    "home.features_subtitle":
      "ਉਤਪਾਦਕਾਂ, ਉਪਭੋਗਤਾਵਾਂ ਅਤੇ ਖੋਜਕਾਰਾਂ ਲਈ ਸੰਗਠਿਤ ਮੋਡੀਊਲ।",
    "home.features_find_title": "ਮਾਨਕ ਖੋਜ Workflow",
    "home.features_find_badge": "AI Profiler",
    "home.features_find_tag": "ਉਤਪਾਦ ਮੇਲ",
    "home.features_find_desc":
      "ਉਤਪਾਦ ਵੇਰਵੇ ਅਤੇ ਉਦੇਸ਼ ਅਨੁਸਾਰ ਭਾਰਤੀ ਮਾਨਕ ਨਾਲ ਮੇਲ।",
    "home.features_find_action": "Profiler ਸ਼ੁਰੂ ਕਰੋ →",
    "home.features_cert_title": "ਪ੍ਰਮਾਣੀਕਰਨ ਯੋਜਨਾਵਾਂ ਅਤੇ Roadmap",
    "home.features_cert_badge": "ISI & CRS",
    "home.features_cert_tag": "Audit & FMCS",
    "home.features_cert_desc":
      "Scheme I, CRS, FMCS — timelines, checklists, audit rules.",
    "home.features_cert_action": "ਯੋਜਨਾਵਾਂ ਵੇਖੋ →",
    "home.features_testing_title": "ਪਰੀਖਣ ਲੋੜਾਂ ਅਤੇ Clauses",
    "home.features_testing_badge": "Clauses",
    "home.features_testing_tag": "Sampling Schedules",
    "home.features_testing_desc":
      "Acceptance criteria, sampling rules, testing frequencies.",
    "home.features_testing_action": "Test Schedules ਵੇਖੋ →",
    "home.features_labs_title": "BIS ਮਾਨਤਾ ਪ੍ਰਾਪਤ ਪ੍ਰਯੋਗਸ਼ਾਲਾ ਖੋਜ",
    "home.features_labs_badge": "Lab Network",
    "home.features_labs_tag": "NABL & BIS Facilities",
    "home.features_labs_desc":
      "IS number, product category, ਰਾਜ ਅਤੇ ਸ਼ਹਿਰ — labs filter.",
    "home.features_labs_action": "Accredited Lab ਲੱਭੋ →",
    "home.features_hallmark_title": "ਸੋਨਾ-ਚਾਂਦੀ Hallmarking ਸਹਾਇਕ",
    "home.features_hallmark_badge": "HUID ਜਾਂਚ",
    "home.features_hallmark_tag": "Purity & Assaying",
    "home.features_hallmark_desc":
      "22K (916), 18K (750), 14K (585) — 6-ਅੰਕੀ HUID verify.",
    "home.features_hallmark_action": "Hallmarking ਗਾਈਡ →",
    "home.features_consumer_title": "ਉਪਭੋਗਤਾ ਸੁਰੱਖਿਆ ਅਤੇ ISI ਜਾਂਚ",
    "home.features_consumer_badge": "ਜਾਂਚੋ & ਰਿਪੋਰਟ ਕਰੋ",
    "home.features_consumer_tag": "ਸ਼ਿਕਾਇਤ ਨਿਵਾਰਨ",
    "home.features_consumer_desc":
      "ISI Mark CM/L licence numbers ਜਾਂਚੋ, counterfeit marks ਪਛਾਣੋ।",
    "home.features_consumer_action": "Consumer Hub →",
    "home.how_title": "BIS Saarthi ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    "home.how_badge": "Architecture & Verification Pipeline",
    "home.how_step1_title": "ਸਵਾਲ ਕਰੋ",
    "home.how_step1_desc": "ਪੰਜਾਬੀ, ਅੰਗਰੇਜ਼ੀ, 22 ਭਾਰਤੀ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ।",
    "home.how_step2_title": "ਖੋਜ",
    "home.how_step2_desc": "BIS repository hybrid search.",
    "home.how_step3_title": "ਜਾਂਚ",
    "home.how_step3_desc": "Source freshness verification.",
    "home.how_step4_title": "ਸਪੱਸ਼ਟ",
    "home.how_step4_desc": "ਸਾਦੀ ਭਾਸ਼ਾ guidance.",
    "home.how_step5_title": "ਹਵਾਲਾ",
    "home.how_step5_desc": "ਹਰ claim standard number, clause traceable.",
    "home.trust_badge": "Zero Hallucination Operational Standard",
    "home.trust_title": "MSMEs, Compliance Teams ਅਤੇ ਨਾਗਰਿਕਾਂ ਦਾ ਭਰੋਸਾ",
    "home.trust_desc":
      "BIS Saarthi ਕਦੇ ਵੀ Indian Standard numbers, test clauses ਬਣਾਵਟੀ ਨਹੀਂ।",
    "home.trust_action": "AI Workspace ਖੋਲ੍ਹੋ →",
    "standards.badge": "Bureau of Indian Standards Repository",
    "standards.title": "Indian Standards Directory & Search",
    "standards.subtitle":
      "Search authoritative Indian Standards, mandatory QCOs, and testing clause schedules.",
    "standards.search_placeholder": "Search by IS number or keyword...",
    "standards.search_btn": "ਖੋਜੋ",
    "standards.filter_division": "Division:",
    "standards.filter_all": "ਸਾਰੇ Divisions",
    "standards.filter_mandatory": "Mandatory QCO Only",
    "standards.div_mech": "Mechanical Engineering",
    "standards.div_civil": "Civil Engineering",
    "standards.div_electro": "Electrotechnical",
    "standards.div_met": "Metallurgical Engineering",
    "standards.div_food": "Food and Agriculture",
    "standards.loading_msg": "Retrieving Standards from BIS Repository...",
    "standards.loading_sub":
      "Applying division filters and QCO regulatory scopes...",
    "standards.empty_title": "ਕੋਈ ਭਾਰਤੀ ਮਾਨਕ ਨਹੀਂ ਮਿਲਿਆ",
    "standards.empty_desc":
      "Try broadening your search query or reset the filters.",
    "standards.empty_action": "Filters Reset",
    "findstd.badge": "AI Product Scope Profiler",
    "findstd.title_prefix": "ਲਾਗੂ",
    "findstd.title_highlight": "ਭਾਰਤੀ ਮਾਨਕ",
    "findstd.subtitle":
      "Input product specifications and get matched Indian Standards.",
    "findstd.anti_badge": "Anti-Speculation Standard",
    "findstd.anti_desc":
      "Verify final grade classification against statutory QCOs.",
    "findstd.form_title": "ਉਤਪਾਦ Specification Form",
    "findstd.form_subtitle":
      "Provide as many details as possible for precise standard matching.",
    "findstd.field_product": "Product Name / Type",
    "findstd.field_material": "Raw Material Composition",
    "findstd.field_application": "Intended Application / Usage",
    "findstd.field_industry": "Industry / Domain Sector",
    "findstd.field_capacity": "Capacity / Size",
    "findstd.field_techspec": "Technical Specifications",
    "findstd.placeholder_product":
      "e.g. Stainless steel water bottle, PVC cable, TMT bar",
    "findstd.placeholder_material": "e.g. SS 304, Aluminium alloy",
    "findstd.placeholder_application":
      "e.g. Drinking water storage, building construction",
    "findstd.placeholder_industry":
      "e.g. Metallurgical, Food & Agriculture, Civil",
    "findstd.placeholder_capacity": "e.g. 750 ml, 1.1kV, 12mm",
    "findstd.placeholder_techspec":
      "e.g. Voltage rating 1.1kV, double wall insulation",
    "findstd.btn_evaluate": "Evaluate Applicable Standards",
    "findstd.btn_clear": "Clear",
    "findstd.btn_sample": "Run Sample Evaluation",
    "findstd.results_title": "Evaluated Indian Standards",
    "findstd.results_complete": "Grounded Assessment Completed",
    "findstd.loading_msg": "Evaluating Product-to-Standard Scope...",
    "findstd.loading_sub":
      "Scanning Gazette notifications and material grade parameters...",
    "findstd.empty_title": "No Profile Evaluated Yet",
    "findstd.empty_desc":
      "Fill in the product specification form and click Evaluate.",
    "testing.badge": "Statutory Testing Schedules",
    "testing.title": "Indian Standards Testing Requirements",
    "testing.subtitle":
      "Inspect mandatory routine tests, acceptance criteria, and sampling rules.",
    "testing.filter_placeholder":
      "Filter by Standard Number (e.g. IS 17526, IS 10500)...",
    "testing.btn_filter": "Filter Tests",
    "testing.btn_showall": "Show All Tests",
    "testing.loading_msg":
      "Retrieving Testing Clauses & Acceptance Parameters...",
    "testing.loading_sub":
      "Cross-referencing laboratory test methods and sampling frequencies...",
    "testing.empty_title": "No Testing Requirements Found",
    "testing.empty_desc": "Try searching with IS 17526, IS 10500, or IS 1786.",
    "labs.badge": "Accredited Testing Infrastructure",
    "labs.title": "Find a BIS Recognized Laboratory",
    "labs.subtitle":
      "Search NABL and BIS recognized testing labs across Indian states.",
    "labs.search_placeholder":
      "Search by Indian Standard (e.g. IS 17526, IS 14543)...",
    "labs.btn_filter": "Filter Labs",
    "labs.filter_state": "State:",
    "labs.filter_allstates": "All States",
    "labs.loading_msg": "Locating Recognized Testing Laboratories...",
    "labs.loading_sub": "Matching accredited testing parameters...",
    "labs.empty_title": "No Laboratories Found",
    "labs.empty_desc":
      "Try removing the standard filter or choosing All States.",
    "labs.empty_action": "View All Laboratories",
    "hallmarking.badge": "Precious Metals Purity Assurance",
    "hallmarking.title_prefix": "Gold & Silver",
    "hallmarking.title_highlight": "Hallmarking Assistant",
    "hallmarking.subtitle":
      "Understand fineness grades, verify HUID codes, locate hallmarking centres.",
    "hallmarking.mandate_badge": "BIS Hallmarking Mandate",
    "hallmarking.mandate_desc":
      "Mandatory hallmarking operative across notified districts.",
    "hallmarking.3marks_title": "The 3 Mandatory Marks on Gold Jewellery",
    "hallmarking.3marks_note": "Operative since July 2021",
    "hallmarking.verify_tag": "Consumer Verification Tool",
    "hallmarking.verify_title": "Verify 6-Digit Alphanumeric HUID Structure",
    "hallmarking.verify_subtitle":
      "Test any 6-digit HUID code before buying jewellery.",
    "hallmarking.verify_placeholder": "Enter 6-character HUID (e.g. A1B2C3)",
    "hallmarking.btn_validate": "Validate Format",
    "hallmarking.verify_howto": "How to verify on BIS Care App:",
    "hallmarking.verify_safety": "Consumer Safety & Rights Tips:",
    "hallmarking.grades_title":
      "Official Gold & Silver Fineness Grades (IS 1417 & IS 2112)",
    "hallmarking.comp_badge": "Statutory 2X Compensation Policy",
    "hallmarking.comp_title": "Consumer Protection Guarantee",
    "hallmarking.loading_msg":
      "Loading Hallmarking Standards & Fineness Schedules...",
    "hallmarking.loading_sub":
      "Retrieving IS 1417 and IS 2112 statutory markings...",
    "reports.badge": "Decision Support Deliverable",
    "reports.title": "BIS Compliance Roadmap Report",
    "reports.btn_print": "Print / Save as PDF",
    "reports.doc_header": "Government Compliance Assessment Document",
    "reports.doc_title": "BIS Product Compliance & Conformity Roadmap",
    "reports.section1": "1. Target Product Profile",
    "reports.label_product": "Product Evaluated:",
    "reports.label_primarystd": "Primary Applicable Standard:",
    "reports.section2": "2. Applicable Indian Standards & QCO Mandates",
    "reports.tag_mandatory": "Mandatory",
    "reports.label_regulatory": "Regulatory Notification:",
    "reports.section3": "3. Applicable BIS Certification Scheme",
    "reports.label_validity": "Validity:",
    "reports.label_surveillance": "Surveillance:",
    "reports.section4": "4. Mandatory Testing Requirements",
    "reports.col_test": "Test Parameter",
    "reports.col_clause": "Standard Clause",
    "reports.col_type": "Type",
    "reports.col_sampling": "Sampling Rule",
    "reports.section5": "5. Recommended Testing Laboratories",
    "reports.section6": "6. Statutory Documentation Checklist",
    "reports.section7": "Key Statutory Compliance Pitfalls:",
    "reports.disclaimer_title": "Authoritative Compliance Notice:",
    "reports.loading_msg": "Synthesizing BIS Compliance Assessment Report...",
    "reports.loading_sub":
      "Compiling applicable standards, testing schedules, and statutory evidence...",
    "certification.badge": "BIS Conformity Assessment Schemes",
    "certification.title": "BIS ਪ੍ਰਮਾਣੀਕਰਨ ਯੋਜਨਾਵਾਂ",
    "certification.subtitle":
      "Understand statutory conformity schemes, factory audits, and licence grant procedures.",
    "certification.btn_report": "Generate Full Compliance Report",
    "certification.active_product": "Active Product Roadmap:",
    "certification.btn_change": "Change Product Profile →",
    "certification.roadmap_title":
      "Interactive Step-by-Step Certification Journey",
    "certification.phases": "Phases",
    "certification.details_tag": "Scheme Details",
    "certification.docs_title": "Statutory Documents Required:",
    "certification.fee_title": "Fee Structure:",
    "certification.validity": "Validity:",
    "certification.surveillance": "Surveillance:",
    "certification.link_official": "Official Manakonline / CRS Portal",
    "certification.loading_msg": "Loading Certification Scheme Requirements...",
    "certification.loading_sub":
      "Compiling documentation checklists and audit schedules...",
    "consumer.badge": "Citizen & Consumer Protection",
    "consumer.title_prefix": "ਉਪਭੋਗਤਾ ਸੁਰੱਖਿਆ &",
    "consumer.title_highlight": "ISI Mark Verification Hub",
    "consumer.subtitle":
      "Verify ISI Mark CM/L licence numbers, detect counterfeit markings, access grievance channels.",
    "consumer.helpline_badge": "Toll-Free Consumer Helpline",
    "consumer.helpline_number": "1800-11-4000",
    "consumer.verify_tag": "Licence Authentication",
    "consumer.verify_title": "Verify ISI Mark CM/L Number",
    "consumer.verify_subtitle":
      "Enter the 7 or 8-digit numeric licence code beneath the ISI triangular logo.",
    "consumer.verify_placeholder":
      "Enter 7 or 8-digit CM/L Number (e.g. 1454301)",
    "consumer.btn_check": "Check Licence Structure",
    "consumer.checklist_auth": "Authenticity Verification Checklist:",
    "consumer.checklist_fraud": "Red Flag Fraud Indicators:",
    "consumer.link_biscare": "Download Official BIS Care Citizen App",
    "consumer.complaint_title": "How to Lodge a Counterfeit Complaint",
    "consumer.complaint_desc":
      "Submit an anonymous report to BIS Enforcement Branch via the BIS Care App or e-BIS portal.",
    "consumer.categories_title": "Key Mandatory Consumer Categories",
    "consumer.categories_desc":
      "Products that strictly require the ISI Mark before retail sale in India:",
    "consumer.cat_packaged_water": "Packaged Drinking Water",
    "consumer.cat_cement": "Cement",
    "consumer.cat_steel_tmt": "Steel TMT Bars",
    "consumer.cat_pvc_pipes": "PVC Pipes",
    "consumer.cat_electrical": "Electrical Appliances",
    "consumer.cat_food_dairy": "Food & Dairy Products",
    "consumer.cat_lpg": "LPG Cylinders",
    "consumer.cat_gold": "Gold Jewellery",
    "footer.description":
      "AI-Powered Decision-Support Platform for Indian Standards, Certification Schemes, Laboratory Testing, and Hallmarking.",
    "footer.tagline": "Retrieve First → Reason Second → Cite Everything",
    "footer.portals_title": "BIS Portals",
    "footer.ebis": "e-BIS Portal",
    "footer.manakonline": "Manakonline (Scheme I)",
    "footer.crs": "CRS Portal (Electronics)",
    "footer.nabl": "NABL Directory",
    "footer.modules_title": "Core Modules",
    "footer.find_standard": "Find My Standard",
    "footer.certification": "Certification Schemes",
    "footer.testing": "Testing Requirements",
    "footer.labs": "Recognized Labs Finder",
    "footer.hallmarking": "Gold & Silver Hallmarking",
    "footer.legal_title": "Legal & Quality Notice",
    "footer.legal_text":
      "Information provided is grounded in published Indian Standards and Gazette notifications. Formal legal compliance requires certification grant through official BIS portals.",
    "footer.admin_link": "Admin & Evaluation Console →",
    "footer.copyright":
      "BIS Saarthi. Built for Indian Industry, MSMEs & Citizens.",
    "footer.consumer_grievance": "ਉਪਭੋਗਤਾ ਸ਼ਿਕਾਇਤ",
    "footer.ai_support": "AI ਫੈਸਲਾ ਸਮਰਥਨ",
    "prompts.industry.1":
      "ਮੈਂ Stainless Steel Water Bottles ਬਣਾਉਂਦਾ ਹਾਂ। ਕਿਹੜਾ ਮਾਨਕ?",
    "prompts.industry.2": "Lithium-ion Power Banks — BIS certification ਜ਼ਰੂਰੀ?",
    "prompts.industry.3": "IS 1786 TMT Steel Bars — tests?",
    "prompts.industry.4": "Scheme-I — factory audit & sample testing?",
    "prompts.industry.5": "ਭਾਰਤ export foreign manufacturers — FMCS guidelines",
    "prompts.industry.6":
      "IS 302 electrical appliances — lab testing equipment",
    "prompts.consumer.1": "6-digit HUID ਸੋਨੇ ਦੇ ਗਹਿਣੇ hallmark ਜਾਂਚ?",
    "prompts.consumer.2": "Packaged water ISI mark ਅਸਲੀ — ਜਾਂਚ?",
    "prompts.consumer.3": "ਖਰਾਬ ISI certified goods — ਉਪਭੋਗਤਾ ਸ਼ਿਕਾਇਤ?",
    "prompts.consumer.4": "BIS Hallmark ਅਤੇ 916 purity mark ਫ਼ਰਕ।",
    "prompts.consumer.5": "Smartphones — BIS registration ਲਾਜ਼ਮੀ?",
    "prompts.consumer.6": "CRS scheme electronics R-number ਜਾਂਚ?",
    "prompts.student.1": "IS 10500 Clause 4.2 TDS & heavy metal limits",
    "prompts.student.2": "IS 456 vs Eurocode 2 — comparative analysis",
    "prompts.student.3": "NBC 2016 — latest amendments?",
    "prompts.student.4": "IS 2062 tensile & elongation — technical clauses",
    "prompts.student.5": "2015 ਤੋਂ ਪਹਿਲਾਂ withdrawn archived standards access?",
    "prompts.student.6": "IS 1417 vs international — hallmarking tolerances",
    "prompts.admin.1": "BIS Saarthi Analytics Dashboard",
    "prompts.admin.2": "Laboratory accreditation database",
    "prompts.admin.3": "Standard revision roadmap and committee review",
  },
  [IndianLanguage.OR]: {
    "nav.standards": "ମାନଦଣ୍ଡ",
    "nav.find_standard": "ମାନଦଣ୍ଡ ଖୋଜ",
    "nav.catalogue": "ମାନଦଣ୍ଡ ତାଲିକା",
    "nav.certification": "ପ୍ରମାଣୀକରଣ",
    "nav.testing": "ପରୀକ୍ଷଣ",
    "nav.labs": "ପ୍ରୟୋଗଶାଳା",
    "nav.hallmark": "ହଲ୍‌ମାର୍କ",
    "nav.consumer": "ଉପଭୋକ୍ତା",
    "nav.reports": "ରିପୋର୍ଟ",
    "nav.ask_bis_ai": "BIS AI କୁ ପଚାର",
    "nav.ask_ai": "AI ପଚାର",
    "hero.title": "ଭାରତୀୟ ମାନଦଣ୍ଡ ଓ BIS ସେବା ପାଇଁ ଆପଣଙ୍କ AI ସହାୟକ",
    "hero.subtitle":
      "ସଠିକ ମାନଦଣ୍ଡ ଖୋଜନ୍ତୁ, ପ୍ରମାଣୀକରଣ ଯୋଜନା ବୁଝନ୍ତୁ, hallmarking ଯାଞ୍ଚ କରନ୍ତୁ।",
    "hero.select_profile": "ଆପଣଙ୍କ ପ୍ରୋଫାଇଲ ଚୟନ କରନ୍ତୁ:",
    "hero.search_placeholder":
      "ଉତ୍ପାଦ ମାନଦଣ୍ଡ, Scheme I/CRS ପ୍ରମାଣୀକରଣ, lab testing ବିଷୟରେ ପଚାର...",
    "hero.ask_ai_btn": "AI ପଚାର",
    "hero.suggested_queries": "ପ୍ରସ୍ତାବିତ ପ୍ରଶ୍ନ:",
    "chat.new_session": "+ ନୂତନ ଚାଟ୍ ସେସନ୍",
    "chat.specialized_tools": "BIS ବିଶେଷ ଉପକରଣ",
    "chat.find_standard": "ମୋର ମାନକ ଖୋଜନ୍ତୁ",
    "chat.certification_schemes": "ପ୍ରମାଣପତ୍ର ଯୋଜନା",
    "chat.testing_requirements": "ପରୀକ୍ଷଣ ଆବଶ୍ୟକତା",
    "chat.find_lab": "ସ୍ୱୀକୃତିପ୍ରାପ୍ତ ଲ୍ୟାବ୍ ଖୋଜନ୍ତୁ",
    "chat.generate_report": "ଅନୁପାଳନ ରିପୋର୍ଟ ପ୍ରସ୍ତୁତ କରନ୍ତୁ",
    "chat.active_workspace": "ସକ୍ରିୟ କାର୍ଯ୍ୟକ୍ଷେତ୍ର",
    "chat.current_investigation": "ବର୍ତ୍ତମାନର ଅନୁସନ୍ଧାନ",
    "chat.grounded_active": "ପ୍ରମାଣ-ଭିତ୍ତିକ ପୁନରୁଦ୍ଧାର ସକ୍ରିୟ",
    "chat.grounded_desc": "ସରକାରୀ ଗେଜେଟ୍ ବିଜ୍ଞପ୍ତିରୁ ଯାଞ୍ଚ ହୋଇଥିବା ଉତ୍ତର।",
    "chat.conversation_title": "BIS ସାରଥି ବାର୍ତ୍ତାଳାପ",
    "chat.mode": "ମୋଡ୍:",
    "chat.language_label": "ଭାଷା:",
    "chat.evidence_panel_btn": "ପ୍ରମାଣ ପ୍ୟାନେଲ୍",
    "chat.welcome_title": "BIS ସାରଥି — ପ୍ରମାଣ-ଭିତ୍ତିକ ନିଷ୍ପତ୍ତି ସହାୟକ",
    "chat.input_placeholder":
      "ମାନକ, ପ୍ରମାଣପତ୍ର, ପରୀକ୍ଷଣ ପଦ୍ଧତି କିମ୍ବା ଧାରା ବିଷୟରେ ପଚାରନ୍ତୁ...",
    "chat.send_btn": "ପଠାନ୍ତୁ",
    "chat.answer_language": "ଉତ୍ତର ଭାଷା",
    "chat.detected_language": "ଚିହ୍ନଟ ହୋଇଥିବା ଭାଷା",
    "chat.evidence_panel": "ଅଧିକୃତ ପ୍ରମାଣ ଏବଂ ଉଦ୍ଧୃତି",
    "chat.confidence": "ବିଶ୍ୱାସନୀୟତା ସ୍ତର",
    "chat.source_freshness": "ଯାଞ୍ଚ ହୋଇଥିବା ଉତ୍ସ",
    "chat.searching_status":
      "BIS ରେପୋଜିଟୋରୀରେ ସନ୍ଧାନ ଏବଂ ଧାରାଗୁଡ଼ିକ ସଂଗ୍ରହ କରାଯାଉଛି...",
    "chat.traceable_citations": "ଯାଞ୍ଚଯୋଗ୍ୟ ପ୍ରାମାଣିକ ଉଦ୍ଧୃତି:",
    "chat.copy_answer": "ଉତ୍ତର କପି କରନ୍ତୁ",
    "chat.copied": "କପି ହୋଇଛି",
    "chat.helpful": "ଉପଯୋଗୀ ଉତ୍ତର",
    "chat.not_helpful": "ଉପଯୋଗୀ ନୁହେଁ",
    "chat.report_citation": "ତ୍ରୁଟିପୂର୍ଣ୍ଣ ଉଦ୍ଧୃତି ରିପୋର୍ଟ କରନ୍ତୁ",
    "chat.disclaimer":
      "ସଠିକତା ଗ୍ୟାରେଣ୍ଟି: BIS ସାରଥି କେବଳ ଭାରତୀୟ ମାନକ ଆଧାରିତ ପ୍ରାମାଣିକ ତଥ୍ୟ ପ୍ରଦାନ କରେ।",
    "chat.bis_act_compliant": "BIS ଆଇନ 2016 ଅନୁପାଳନ",
    "evidence.title": "ପ୍ରାମାଣିକ ପ୍ରମାଣ ଏବଂ ଉଦ୍ଧୃତି",
    "evidence.indian_standard": "ଭାରତୀୟ ମାନକ",
    "evidence.clause": "ଧାରା:",
    "evidence.page": "ପୃଷ୍ଠା:",
    "evidence.publication": "ପ୍ରକାଶନ ତାରିଖ:",
    "evidence.relevance": "ପ୍ରାସଙ୍ଗିକତା:",
    "evidence.freshness_notice": "ସୂଚନା:",
    "evidence.verbatim_excerpt": "ମୂଳ ମାନକ ଧାରା ଉଦ୍ଧୃତି",
    "evidence.copy_excerpt": "ଉଦ୍ଧୃତି କପି କରନ୍ତୁ",
    "evidence.copied": "କପି ହୋଇଛି",
    "evidence.view_source": "ସରକାରୀ BIS ପୋର୍ଟାଲରେ ଦେଖନ୍ତୁ",
    "evidence.no_evidence_title": "କୌଣସି ପ୍ରମାଣ ଉଲ୍ଲେଖ ନାହିଁ",
    "evidence.no_evidence_desc":
      "BIS ମାନକ ଧାରା ଦେଖିବା ପାଇଁ ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ କିମ୍ବା ମାନକ ଚୟନ କରନ୍ତୁ।",
    "common.loading": "BIS RAG ଇଞ୍ଜିନ୍ ଦ୍ୱାରା ଉତ୍ତର ପ୍ରସ୍ତୁତ ହେଉଛି...",
    "common.error": "ଅନୁରୋଧ ପ୍ରକ୍ରିୟାକରଣ ବିଫଳ ହେଲା। କନେକ୍ସନ୍ ଯାଞ୍ଚ କରନ୍ତୁ।",

    "header.subtitle": "Indian Standards Intelligence",
    "home.how_subtitle_prefix": "Strict adherence to",
    "home.how_subtitle_bold":
      '"Retrieve First → Reason Second → Cite Everything"',
    "home.mode_industry": "ଶିଳ୍ପ / MSME",
    "home.mode_consumer": "ଉପଭୋକ୍ତା",
    "home.mode_student": "ଛାତ୍ର / ଅନୁସନ୍ଧାନକାରୀ",
    "home.mode_admin": "ପ୍ରଶାସନ ଓ ନିୟାମକ",
    "home.mode_consumer_placeholder":
      "ସୁନା HUID ଯାଞ୍ଚ, ISI ମାର୍କ ଯାଞ୍ଚ, ଉପଭୋକ୍ତା ଅଭିଯୋଗ...",
    "home.mode_student_placeholder":
      "ମାନଦଣ୍ଡ clauses ଖୋଜ, ତୁଳନାତ୍ମକ ବିଶ୍ଲେଷଣ...",
    "home.mode_admin_placeholder": "ମାନଦଣ୍ଡ, ଯୋଜନା, ରିପୋର୍ଟ ଖୋଜ...",
    "home.features_title": "ଭାରତୀୟ ମାନଦଣ୍ଡ ବ୍ୟୁରୋର ସମ୍ପୂର୍ଣ ସୂଚନା",
    "home.features_subtitle":
      "ଉତ୍ପାଦକ, ଉପଭୋକ୍ତା ଓ ଅନୁସନ୍ଧାନକାରୀଙ୍କ ପାଇଁ ସଂଗଠିତ ଅଧ୍ୟାୟ।",
    "home.features_find_title": "ମାନଦଣ୍ଡ ଖୋଜ Workflow",
    "home.features_find_badge": "AI Profiler",
    "home.features_find_tag": "ଉତ୍ପାଦ ମେଳ",
    "home.features_find_desc":
      "ଉତ୍ପାଦ specifications ଓ ଉଦ୍ଦ୍ୟୋଗ ଅନୁଯାୟୀ ଭାରତୀୟ ମାନଦଣ୍ଡ ସହ ମିଳାଇ ଦିଅ।",
    "home.features_find_action": "Profiler ଆରମ୍ଭ →",
    "home.features_cert_title": "ପ୍ରମାଣୀକରଣ ଯୋଜନା ଓ Roadmap",
    "home.features_cert_badge": "ISI & CRS",
    "home.features_cert_tag": "Audit & FMCS",
    "home.features_cert_desc":
      "Scheme I (ISI Mark), CRS, FMCS — timeline, checklist, factory audit rules।",
    "home.features_cert_action": "ଯୋଜନା ଦେଖ →",
    "home.features_testing_title": "ପରୀକ୍ଷଣ ଆବଶ୍ୟକତା ଓ Clauses",
    "home.features_testing_badge": "Clauses",
    "home.features_testing_tag": "Sampling Schedules",
    "home.features_testing_desc":
      "ଭାରତୀୟ ମାନଦଣ୍ଡ ଅନୁଯାୟୀ acceptance criteria, sampling rules, testing frequencies।",
    "home.features_testing_action": "Test Schedules ଦେଖ →",
    "home.features_labs_title": "BIS ମାନ୍ୟ ପ୍ରୟୋଗଶାଳା ଖୋଜ",
    "home.features_labs_badge": "Lab Network",
    "home.features_labs_tag": "NABL & BIS Facilities",
    "home.features_labs_desc":
      "IS number, ଉତ୍ପାଦ ଶ୍ରେଣୀ, ରାଜ୍ୟ ଓ ସହର ଅନୁଯାୟୀ labs ଫିଲ୍ଟର।",
    "home.features_labs_action": "Accredited Lab ଖୋଜ →",
    "home.features_hallmark_title": "ସୁନା-ରୂପା Hallmarking ସହାୟ",
    "home.features_hallmark_badge": "HUID ଯାଞ୍ଚ",
    "home.features_hallmark_tag": "Purity & Assaying",
    "home.features_hallmark_desc":
      "22K (916), 18K (750), 14K (585) — 6-ଅଙ୍କ HUID codes ଯାଞ୍ଚ।",
    "home.features_hallmark_action": "Hallmarking ଗାଇଡ →",
    "home.features_consumer_title": "ଉପଭୋକ୍ତା ସୁରକ୍ଷା ଓ ISI ଯାଞ୍ଚ",
    "home.features_consumer_badge": "ଯାଞ୍ଚ & ରିପୋର୍ଟ",
    "home.features_consumer_tag": "ଅଭିଯୋଗ ନିବାରଣ",
    "home.features_consumer_desc":
      "ISI Mark CM/L licence numbers ଯାଞ୍ଚ, counterfeit marks ଚିହ୍ନ, ଅଭିଯୋଗ ନିବାରଣ।",
    "home.features_consumer_action": "Consumer Hub →",
    "home.how_title": "BIS Saarthi କିପରି କାମ କରେ",
    "home.how_badge": "Architecture & Verification Pipeline",
    "home.how_step1_title": "ପ୍ରଶ୍ନ ପଚାର",
    "home.how_step1_desc": "ଓଡ଼ିଆ, ଇଂରାଜୀ, ବା 22 ଭାରତୀୟ ଭାଷାରେ।",
    "home.how_step2_title": "ଖୋଜ",
    "home.how_step2_desc": "BIS repository ରେ hybrid search।",
    "home.how_step3_title": "ଯାଞ୍ଚ",
    "home.how_step3_desc": "Source freshness verification।",
    "home.how_step4_title": "ସ୍ପଷ୍ଟ",
    "home.how_step4_desc": "ସ୍ପଷ୍ଟ ଭାଷାରେ guidance।",
    "home.how_step5_title": "ଉddhrit",
    "home.how_step5_desc": "ପ୍ରତ୍ୟେକ claim traceable।",
    "home.trust_badge": "Zero Hallucination Operational Standard",
    "home.trust_title": "MSMEs, Compliance Teams ଓ ନାଗରିକଙ୍କ ବିଶ୍ଵାସ",
    "home.trust_desc":
      "BIS Saarthi କେବେ ବି Indian Standard numbers ଅଟକଳ ଦ୍ୱାରା ଦିଏ ନାହିଁ।",
    "home.trust_action": "AI Workspace ଖୋଲ →",
    "standards.badge": "Bureau of Indian Standards Repository",
    "standards.title": "Indian Standards Directory & Search",
    "standards.subtitle":
      "Search authoritative Indian Standards, mandatory QCOs, and testing clause schedules.",
    "standards.search_placeholder": "Search by IS number or keyword...",
    "standards.search_btn": "ଖୋଜ",
    "standards.filter_division": "Division:",
    "standards.filter_all": "ସବୁ Divisions",
    "standards.filter_mandatory": "Mandatory QCO Only",
    "standards.div_mech": "Mechanical Engineering",
    "standards.div_civil": "Civil Engineering",
    "standards.div_electro": "Electrotechnical",
    "standards.div_met": "Metallurgical Engineering",
    "standards.div_food": "Food and Agriculture",
    "standards.loading_msg": "Retrieving Standards from BIS Repository...",
    "standards.loading_sub":
      "Applying division filters and QCO regulatory scopes...",
    "standards.empty_title": "କୌଣସି ଭାରତୀୟ ମାନଦଣ୍ଡ ମିଳିଲା ନାହିଁ",
    "standards.empty_desc":
      "Try broadening your search query or reset the filters.",
    "standards.empty_action": "Filters Reset",
    "findstd.badge": "AI Product Scope Profiler",
    "findstd.title_prefix": "ଲାଗୁ",
    "findstd.title_highlight": "ଭାରତୀୟ ମାନଦଣ୍ଡ",
    "findstd.subtitle":
      "Input product specifications and get matched Indian Standards.",
    "findstd.anti_badge": "Anti-Speculation Standard",
    "findstd.anti_desc":
      "Verify final grade classification against statutory QCOs.",
    "findstd.form_title": "ଉତ୍ପାଦ Specification Form",
    "findstd.form_subtitle":
      "Provide as many details as possible for precise standard matching.",
    "findstd.field_product": "Product Name / Type",
    "findstd.field_material": "Raw Material Composition",
    "findstd.field_application": "Intended Application / Usage",
    "findstd.field_industry": "Industry / Domain Sector",
    "findstd.field_capacity": "Capacity / Size",
    "findstd.field_techspec": "Technical Specifications",
    "findstd.placeholder_product":
      "e.g. Stainless steel water bottle, PVC cable, TMT bar",
    "findstd.placeholder_material": "e.g. SS 304, Aluminium alloy",
    "findstd.placeholder_application":
      "e.g. Drinking water storage, building construction",
    "findstd.placeholder_industry":
      "e.g. Metallurgical, Food & Agriculture, Civil",
    "findstd.placeholder_capacity": "e.g. 750 ml, 1.1kV, 12mm",
    "findstd.placeholder_techspec":
      "e.g. Voltage rating 1.1kV, double wall insulation",
    "findstd.btn_evaluate": "Evaluate Applicable Standards",
    "findstd.btn_clear": "Clear",
    "findstd.btn_sample": "Run Sample Evaluation",
    "findstd.results_title": "Evaluated Indian Standards",
    "findstd.results_complete": "Grounded Assessment Completed",
    "findstd.loading_msg": "Evaluating Product-to-Standard Scope...",
    "findstd.loading_sub":
      "Scanning Gazette notifications and material grade parameters...",
    "findstd.empty_title": "No Profile Evaluated Yet",
    "findstd.empty_desc":
      "Fill in the product specification form and click Evaluate.",
    "testing.badge": "Statutory Testing Schedules",
    "testing.title": "Indian Standards Testing Requirements",
    "testing.subtitle":
      "Inspect mandatory routine tests, acceptance criteria, and sampling rules.",
    "testing.filter_placeholder":
      "Filter by Standard Number (e.g. IS 17526, IS 10500)...",
    "testing.btn_filter": "Filter Tests",
    "testing.btn_showall": "Show All Tests",
    "testing.loading_msg":
      "Retrieving Testing Clauses & Acceptance Parameters...",
    "testing.loading_sub":
      "Cross-referencing laboratory test methods and sampling frequencies...",
    "testing.empty_title": "No Testing Requirements Found",
    "testing.empty_desc": "Try searching with IS 17526, IS 10500, or IS 1786.",
    "labs.badge": "Accredited Testing Infrastructure",
    "labs.title": "Find a BIS Recognized Laboratory",
    "labs.subtitle":
      "Search NABL and BIS recognized testing labs across Indian states.",
    "labs.search_placeholder":
      "Search by Indian Standard (e.g. IS 17526, IS 14543)...",
    "labs.btn_filter": "Filter Labs",
    "labs.filter_state": "State:",
    "labs.filter_allstates": "All States",
    "labs.loading_msg": "Locating Recognized Testing Laboratories...",
    "labs.loading_sub": "Matching accredited testing parameters...",
    "labs.empty_title": "No Laboratories Found",
    "labs.empty_desc":
      "Try removing the standard filter or choosing All States.",
    "labs.empty_action": "View All Laboratories",
    "hallmarking.badge": "Precious Metals Purity Assurance",
    "hallmarking.title_prefix": "Gold & Silver",
    "hallmarking.title_highlight": "Hallmarking Assistant",
    "hallmarking.subtitle":
      "Understand fineness grades, verify HUID codes, locate hallmarking centres.",
    "hallmarking.mandate_badge": "BIS Hallmarking Mandate",
    "hallmarking.mandate_desc":
      "Mandatory hallmarking operative across notified districts.",
    "hallmarking.3marks_title": "The 3 Mandatory Marks on Gold Jewellery",
    "hallmarking.3marks_note": "Operative since July 2021",
    "hallmarking.verify_tag": "Consumer Verification Tool",
    "hallmarking.verify_title": "Verify 6-Digit Alphanumeric HUID Structure",
    "hallmarking.verify_subtitle":
      "Test any 6-digit HUID code before buying jewellery.",
    "hallmarking.verify_placeholder": "Enter 6-character HUID (e.g. A1B2C3)",
    "hallmarking.btn_validate": "Validate Format",
    "hallmarking.verify_howto": "How to verify on BIS Care App:",
    "hallmarking.verify_safety": "Consumer Safety & Rights Tips:",
    "hallmarking.grades_title":
      "Official Gold & Silver Fineness Grades (IS 1417 & IS 2112)",
    "hallmarking.comp_badge": "Statutory 2X Compensation Policy",
    "hallmarking.comp_title": "Consumer Protection Guarantee",
    "hallmarking.loading_msg":
      "Loading Hallmarking Standards & Fineness Schedules...",
    "hallmarking.loading_sub":
      "Retrieving IS 1417 and IS 2112 statutory markings...",
    "reports.badge": "Decision Support Deliverable",
    "reports.title": "BIS Compliance Roadmap Report",
    "reports.btn_print": "Print / Save as PDF",
    "reports.doc_header": "Government Compliance Assessment Document",
    "reports.doc_title": "BIS Product Compliance & Conformity Roadmap",
    "reports.section1": "1. Target Product Profile",
    "reports.label_product": "Product Evaluated:",
    "reports.label_primarystd": "Primary Applicable Standard:",
    "reports.section2": "2. Applicable Indian Standards & QCO Mandates",
    "reports.tag_mandatory": "Mandatory",
    "reports.label_regulatory": "Regulatory Notification:",
    "reports.section3": "3. Applicable BIS Certification Scheme",
    "reports.label_validity": "Validity:",
    "reports.label_surveillance": "Surveillance:",
    "reports.section4": "4. Mandatory Testing Requirements",
    "reports.col_test": "Test Parameter",
    "reports.col_clause": "Standard Clause",
    "reports.col_type": "Type",
    "reports.col_sampling": "Sampling Rule",
    "reports.section5": "5. Recommended Testing Laboratories",
    "reports.section6": "6. Statutory Documentation Checklist",
    "reports.section7": "Key Statutory Compliance Pitfalls:",
    "reports.disclaimer_title": "Authoritative Compliance Notice:",
    "reports.loading_msg": "Synthesizing BIS Compliance Assessment Report...",
    "reports.loading_sub":
      "Compiling applicable standards, testing schedules, and statutory evidence...",
    "certification.badge": "BIS Conformity Assessment Schemes",
    "certification.title": "BIS ପ୍ରମାଣୀକରଣ ଯୋଜନା",
    "certification.subtitle":
      "Understand statutory conformity schemes, factory audits, and licence grant procedures.",
    "certification.btn_report": "Generate Full Compliance Report",
    "certification.active_product": "Active Product Roadmap:",
    "certification.btn_change": "Change Product Profile →",
    "certification.roadmap_title":
      "Interactive Step-by-Step Certification Journey",
    "certification.phases": "Phases",
    "certification.details_tag": "Scheme Details",
    "certification.docs_title": "Statutory Documents Required:",
    "certification.fee_title": "Fee Structure:",
    "certification.validity": "Validity:",
    "certification.surveillance": "Surveillance:",
    "certification.link_official": "Official Manakonline / CRS Portal",
    "certification.loading_msg": "Loading Certification Scheme Requirements...",
    "certification.loading_sub":
      "Compiling documentation checklists and audit schedules...",
    "consumer.badge": "Citizen & Consumer Protection",
    "consumer.title_prefix": "ଉପଭୋକ୍ତା ସୁରକ୍ଷା &",
    "consumer.title_highlight": "ISI Mark Verification Hub",
    "consumer.subtitle":
      "Verify ISI Mark CM/L licence numbers, detect counterfeit markings, access grievance channels.",
    "consumer.helpline_badge": "Toll-Free Consumer Helpline",
    "consumer.helpline_number": "1800-11-4000",
    "consumer.verify_tag": "Licence Authentication",
    "consumer.verify_title": "Verify ISI Mark CM/L Number",
    "consumer.verify_subtitle":
      "Enter the 7 or 8-digit numeric licence code beneath the ISI triangular logo.",
    "consumer.verify_placeholder":
      "Enter 7 or 8-digit CM/L Number (e.g. 1454301)",
    "consumer.btn_check": "Check Licence Structure",
    "consumer.checklist_auth": "Authenticity Verification Checklist:",
    "consumer.checklist_fraud": "Red Flag Fraud Indicators:",
    "consumer.link_biscare": "Download Official BIS Care Citizen App",
    "consumer.complaint_title": "How to Lodge a Counterfeit Complaint",
    "consumer.complaint_desc":
      "Submit an anonymous report to BIS Enforcement Branch via the BIS Care App or e-BIS portal.",
    "consumer.categories_title": "Key Mandatory Consumer Categories",
    "consumer.categories_desc":
      "Products that strictly require the ISI Mark before retail sale in India:",
    "consumer.cat_packaged_water": "Packaged Drinking Water",
    "consumer.cat_cement": "Cement",
    "consumer.cat_steel_tmt": "Steel TMT Bars",
    "consumer.cat_pvc_pipes": "PVC Pipes",
    "consumer.cat_electrical": "Electrical Appliances",
    "consumer.cat_food_dairy": "Food & Dairy Products",
    "consumer.cat_lpg": "LPG Cylinders",
    "consumer.cat_gold": "Gold Jewellery",
    "footer.description":
      "AI-Powered Decision-Support Platform for Indian Standards, Certification Schemes, Laboratory Testing, and Hallmarking.",
    "footer.tagline": "Retrieve First → Reason Second → Cite Everything",
    "footer.portals_title": "BIS Portals",
    "footer.ebis": "e-BIS Portal",
    "footer.manakonline": "Manakonline (Scheme I)",
    "footer.crs": "CRS Portal (Electronics)",
    "footer.nabl": "NABL Directory",
    "footer.modules_title": "Core Modules",
    "footer.find_standard": "Find My Standard",
    "footer.certification": "Certification Schemes",
    "footer.testing": "Testing Requirements",
    "footer.labs": "Recognized Labs Finder",
    "footer.hallmarking": "Gold & Silver Hallmarking",
    "footer.legal_title": "Legal & Quality Notice",
    "footer.legal_text":
      "Information provided is grounded in published Indian Standards and Gazette notifications. Formal legal compliance requires certification grant through official BIS portals.",
    "footer.admin_link": "Admin & Evaluation Console →",
    "footer.copyright":
      "BIS Saarthi. Built for Indian Industry, MSMEs & Citizens.",
    "footer.consumer_grievance": "ଉପଭୋକ୍ତା ଅଭିଯୋଗ",
    "footer.ai_support": "AI Decision Support",
    "prompts.industry.1":
      "ମୁଁ Stainless Steel Water Bottles ତିଆରି କରେ। କେଉଁ ମାନଦଣ୍ଡ?",
    "prompts.industry.2": "Lithium-ion Power Banks ପାଇଁ BIS certification?",
    "prompts.industry.3": "IS 1786 ଅଧୀନ TMT Steel Bars — tests?",
    "prompts.industry.4": "Scheme-I — factory audit & sample testing?",
    "prompts.industry.5": "ଭାରତ export foreign manufacturers — FMCS guidelines",
    "prompts.industry.6":
      "IS 302 electrical appliances — lab testing equipment",
    "prompts.consumer.1": "6-digit HUID ସୁନା-ଆଭୂଷଣ hallmark ଯାଞ୍ଚ?",
    "prompts.consumer.2": "Packaged water ISI mark ଅସଲ — ଯାଞ୍ଚ?",
    "prompts.consumer.3": "ଖରାପ ISI certified goods — ଉପଭୋକ୍ତା ଅଭିଯୋଗ?",
    "prompts.consumer.4": "BIS Hallmark ଓ 916 purity mark ଭେଦ।",
    "prompts.consumer.5": "Smartphones — BIS registration ବାଧ୍ୟତାମୂଳକ?",
    "prompts.consumer.6": "CRS scheme electronics — R-number ଯାଞ୍ଚ?",
    "prompts.student.1": "IS 10500 Clause 4.2 TDS & heavy metal limits",
    "prompts.student.2": "IS 456 ও Eurocode 2 — comparative analysis",
    "prompts.student.3": "NBC 2016 — latest amendments?",
    "prompts.student.4": "IS 2062 tensile & elongation — technical clauses",
    "prompts.student.5": "2015 pehele withdrawn archived standards access?",
    "prompts.student.6": "IS 1417 & international — hallmarking tolerances",
    "prompts.admin.1": "BIS Saarthi Analytics Dashboard",
    "prompts.admin.2": "Laboratory accreditation database",
    "prompts.admin.3": "Standard revision roadmap and committee review",
  },
  [IndianLanguage.UR]: {
    "nav.standards": "معیارات",
    "nav.find_standard": "اپنا معیار تلاش کریں",
    "nav.catalogue": "معیارات کی فہرست",
    "nav.certification": "سرٹیفیکیشن",
    "nav.testing": "جانچ",
    "nav.labs": "لیبارٹریز",
    "nav.hallmark": "ہال مارک",
    "nav.consumer": "صارفین کا تحفظ",
    "nav.reports": "رپورٹس",
    "nav.ask_bis_ai": "BIS AI سے پوچھیں",
    "nav.ask_ai": "پوچھیں AI",
    "hero.title": "ہندوستانی معیارات اور BIS خدمات کے لیے آپ کا AI اسسٹنٹ",
    "hero.subtitle":
      "صحیح معیار تلاش کریں، سرٹیفیکیشن کے طریقہ کار کو سمجھیں اور ہال مارکنگ کی تصدیق کریں۔",
    "hero.select_profile": "اپنا پروفائل موڈ منتخب کریں:",
    "hero.search_placeholder": "مصنوعات کے معیارات کے بارے میں پوچھیں...",
    "hero.ask_ai_btn": "پوچھیں AI",
    "hero.suggested_queries": "تجویز کردہ سوالات:",
    "chat.new_session": "+ نیا چیٹ سیشن",
    "chat.specialized_tools": "BIS خصوصی ٹولز",
    "chat.find_standard": "میرا معیار تلاش کریں",
    "chat.certification_schemes": "سرٹیفیکیشن اسکیمیں",
    "chat.testing_requirements": "ٹیسٹنگ کی ضروریات",
    "chat.find_lab": "تسلیم شدہ لیب تلاش کریں",
    "chat.generate_report": "تعمیل کی رپورٹ تیار کریں",
    "chat.active_workspace": "فعال ورک اسپیس",
    "chat.current_investigation": "موجودہ تحقیق",
    "chat.grounded_active": "شواہد پر مبنی بازیافت فعال",
    "chat.grounded_desc": "سرکاری گزٹ کے نوٹیفیکیشنز سے تصدیق شدہ جوابات۔",
    "chat.conversation_title": "BIS سارتھی گفتگو",
    "chat.mode": "موڈ:",
    "chat.language_label": "زبان:",
    "chat.evidence_panel_btn": "شواہد پینل",
    "chat.welcome_title": "BIS سارتھی — شواہد پر مبنی فیصلہ سازی کا معاون",
    "chat.input_placeholder":
      "معیارات، سرٹیفیکیشن، ٹیسٹنگ کے طریقے یا شقوں کے بارے میں پوچھیں...",
    "chat.send_btn": "ارسال کریں",
    "chat.answer_language": "جواب کی زبان",
    "chat.detected_language": "شناخت شدہ زبان",
    "chat.evidence_panel": "مستند شواہد اور حوالہ جات",
    "chat.confidence": "اعتماد کی سطح",
    "chat.source_freshness": "تصدیق شدہ ذریعہ",
    "chat.searching_status": "BIS ذخیرے میں تلاش اور شقیں نکالی جا رہی ہیں...",
    "chat.traceable_citations": "قابل تصدیق مستند حوالہ جات:",
    "chat.copy_answer": "جواب کاپی کریں",
    "chat.copied": "کاپی ہو گیا",
    "chat.helpful": "مفید جواب",
    "chat.not_helpful": "غیر مفید",
    "chat.report_citation": "غلط حوالہ رپورٹ کریں",
    "chat.disclaimer":
      "درستگی کی ضمانت: BIS سارتھی ہندوستانی معیارات کے مطابق صرف مستند معلومات فراہم کرتا ہے۔",
    "chat.bis_act_compliant": "BIS ایکٹ 2016 کے مطابق",
    "evidence.title": "مستند شواہد اور حوالہ جات",
    "evidence.indian_standard": "ہندوستانی معیار",
    "evidence.clause": "شق:",
    "evidence.page": "صفحہ:",
    "evidence.publication": "تاریخ اشاعت:",
    "evidence.relevance": "مطابقت:",
    "evidence.freshness_notice": "تازہ ترین نوٹس:",
    "evidence.verbatim_excerpt": "اصل معیار کی شق کا اقتباس",
    "evidence.copy_excerpt": "اقتباس کاپی کریں",
    "evidence.copied": "کاپی ہو گیا",
    "evidence.view_source": "سرکاری BIS پورٹل پر ماخذ دیکھیں",
    "evidence.no_evidence_title": "کوئی حوالہ شدہ ثبوت نہیں ہے",
    "evidence.no_evidence_desc":
      "BIS معیار کی شقوں کو دیکھنے کے لیے کوئی سوال پوچھیں یا معیار منتخب کریں۔",
    "common.loading": "BIS RAG انجن کے ذریعے جواب تیار کیا جا رہا ہے...",
    "common.error": "درخواست پر عمل نہیں ہو سکا۔ انٹرنیٹ چیک کریں۔",

    "header.subtitle": "Indian Standards Intelligence",
    "home.how_subtitle_prefix": "Strict adherence to",
    "home.how_subtitle_bold":
      '"Retrieve First → Reason Second → Cite Everything"',
    "home.mode_industry": "صنعت / MSME",
    "home.mode_consumer": "صارف",
    "home.mode_student": "طالب علم / محقق",
    "home.mode_admin": "انتظامی اور ریگولیٹری",
    "home.mode_consumer_placeholder":
      "سونے کا HUID چیک کریں، ISI مارک تصدیق کریں...",
    "home.mode_student_placeholder":
      "Standard clauses تلاش کریں...",
    "home.mode_admin_placeholder":
      "معیارات، منصوبے، رپورٹیں تلاش کریں...",
    "home.features_title": "Bureau of Indian Standards Intelligence",
    "home.features_subtitle":
      "Structured modules for manufacturers, compliance officers, consumers.",
    "home.features_find_title": "Find My Standard Workflow",
    "home.features_find_badge": "AI Profiler",
    "home.features_find_tag": "Product Matching",
    "home.features_find_desc":
      "Step-by-step product profiler matching your product to Indian Standards.",
    "home.features_find_action": "Start Profiler →",
    "home.features_cert_title": "Certification Schemes & Roadmap",
    "home.features_cert_badge": "ISI & CRS",
    "home.features_cert_tag": "Audit & FMCS",
    "home.features_cert_desc":
      "Navigate Scheme I (ISI Mark), Scheme II (CRS), Scheme IV, and FMCS.",
    "home.features_cert_action": "Explore Schemes →",
    "home.features_testing_title": "Testing Requirements & Clauses",
    "home.features_testing_badge": "Clauses",
    "home.features_testing_tag": "Sampling Schedules",
    "home.features_testing_desc":
      "Acceptance criteria, sampling rules, and testing equipment from Indian Standards.",
    "home.features_testing_action": "Inspect Test Schedules →",
    "home.features_labs_title": "BIS Recognized Laboratories Finder",
    "home.features_labs_badge": "Lab Network",
    "home.features_labs_tag": "NABL & BIS Facilities",
    "home.features_labs_desc":
      "Filter NABL and BIS recognized labs by IS number, state, and city.",
    "home.features_labs_action": "Locate Accredited Lab →",
    "home.features_hallmark_title": "Gold & Silver Hallmarking Assistant",
    "home.features_hallmark_badge": "HUID Check",
    "home.features_hallmark_tag": "Purity & Assaying",
    "home.features_hallmark_desc":
      "Verify 6-digit HUID codes and understand gold/silver purity grades.",
    "home.features_hallmark_action": "Hallmarking Guidance →",
    "home.features_consumer_title": "Consumer Protection & ISI Check",
    "home.features_consumer_badge": "Verify & Report",
    "home.features_consumer_tag": "Grievance Redressal",
    "home.features_consumer_desc":
      "Verify ISI Mark CM/L licence numbers, spot counterfeits.",
    "home.features_consumer_action": "Consumer Hub →",
    "home.how_title": "How BIS Saarthi Works",
    "home.how_badge": "Architecture & Verification Pipeline",
    "home.how_step1_title": "Ask Query",
    "home.how_step1_desc":
      "Query in English, Hindi, or any of 22 Scheduled Indian Languages.",
    "home.how_step2_title": "Retrieve",
    "home.how_step2_desc":
      "Hybrid BM25 + Vector semantic search across BIS repository.",
    "home.how_step3_title": "Verify",
    "home.how_step3_desc":
      "Cross-encoder reranking & source freshness verification.",
    "home.how_step4_title": "Explain",
    "home.how_step4_desc":
      "Clear plain-language guidance distinguished from statutory clauses.",
    "home.how_step5_title": "Cite",
    "home.how_step5_desc":
      "Every claim traceable to standard number, clause, page, and link.",
    "home.trust_badge": "Zero Hallucination Operational Standard",
    "home.trust_title": "Trusted by MSMEs, Compliance Teams & Citizens",
    "home.trust_desc":
      "BIS Saarthi never invents Indian Standard numbers, test clauses, or lab recognition statuses.",
    "home.trust_action": "Launch AI Workspace →",
    "standards.badge": "Bureau of Indian Standards Repository",
    "standards.title": "Indian Standards Directory & Search",
    "standards.subtitle":
      "Search authoritative Indian Standards, mandatory QCOs, and testing clause schedules.",
    "standards.search_placeholder": "Search by IS number or keyword...",
    "standards.search_btn": "Search",
    "standards.filter_division": "Division:",
    "standards.filter_all": "All Divisions",
    "standards.filter_mandatory": "Mandatory QCO Only",
    "standards.div_mech": "Mechanical Engineering",
    "standards.div_civil": "Civil Engineering",
    "standards.div_electro": "Electrotechnical",
    "standards.div_met": "Metallurgical Engineering",
    "standards.div_food": "Food and Agriculture",
    "standards.loading_msg": "Retrieving Standards from BIS Repository...",
    "standards.loading_sub":
      "Applying division filters and QCO regulatory scopes...",
    "standards.empty_title": "No Indian Standards Found",
    "standards.empty_desc":
      "Try broadening your search query or reset the filters.",
    "standards.empty_action": "Reset Filters",
    "findstd.badge": "AI Product Scope Profiler",
    "findstd.title_prefix": "Find Applicable",
    "findstd.title_highlight": "Indian Standard",
    "findstd.subtitle":
      "Input product specifications and get matched Indian Standards.",
    "findstd.anti_badge": "Anti-Speculation Standard",
    "findstd.anti_desc":
      "Verify final grade classification against statutory QCOs.",
    "findstd.form_title": "Product Specification Form",
    "findstd.form_subtitle":
      "Provide as many details as possible for precise standard matching.",
    "findstd.field_product": "Product Name / Type",
    "findstd.field_material": "Raw Material Composition",
    "findstd.field_application": "Intended Application / Usage",
    "findstd.field_industry": "Industry / Domain Sector",
    "findstd.field_capacity": "Capacity / Size",
    "findstd.field_techspec": "Technical Specifications",
    "findstd.placeholder_product":
      "e.g. Stainless steel water bottle, PVC cable, TMT bar",
    "findstd.placeholder_material": "e.g. SS 304, Aluminium alloy",
    "findstd.placeholder_application":
      "e.g. Drinking water storage, building construction",
    "findstd.placeholder_industry":
      "e.g. Metallurgical, Food & Agriculture, Civil",
    "findstd.placeholder_capacity": "e.g. 750 ml, 1.1kV, 12mm",
    "findstd.placeholder_techspec":
      "e.g. Voltage rating 1.1kV, double wall insulation",
    "findstd.btn_evaluate": "Evaluate Applicable Standards",
    "findstd.btn_clear": "Clear",
    "findstd.btn_sample": "Run Sample Evaluation",
    "findstd.results_title": "Evaluated Indian Standards",
    "findstd.results_complete": "Grounded Assessment Completed",
    "findstd.loading_msg": "Evaluating Product-to-Standard Scope...",
    "findstd.loading_sub":
      "Scanning Gazette notifications and material grade parameters...",
    "findstd.empty_title": "No Profile Evaluated Yet",
    "findstd.empty_desc":
      "Fill in the product specification form and click Evaluate.",
    "testing.badge": "Statutory Testing Schedules",
    "testing.title": "Indian Standards Testing Requirements",
    "testing.subtitle":
      "Inspect mandatory routine tests, acceptance criteria, and sampling rules.",
    "testing.filter_placeholder":
      "Filter by Standard Number (e.g. IS 17526, IS 10500)...",
    "testing.btn_filter": "Filter Tests",
    "testing.btn_showall": "Show All Tests",
    "testing.loading_msg":
      "Retrieving Testing Clauses & Acceptance Parameters...",
    "testing.loading_sub":
      "Cross-referencing laboratory test methods and sampling frequencies...",
    "testing.empty_title": "No Testing Requirements Found",
    "testing.empty_desc": "Try searching with IS 17526, IS 10500, or IS 1786.",
    "labs.badge": "Accredited Testing Infrastructure",
    "labs.title": "Find a BIS Recognized Laboratory",
    "labs.subtitle":
      "Search NABL and BIS recognized testing labs across Indian states.",
    "labs.search_placeholder":
      "Search by Indian Standard (e.g. IS 17526, IS 14543)...",
    "labs.btn_filter": "Filter Labs",
    "labs.filter_state": "State:",
    "labs.filter_allstates": "All States",
    "labs.loading_msg": "Locating Recognized Testing Laboratories...",
    "labs.loading_sub": "Matching accredited testing parameters...",
    "labs.empty_title": "No Laboratories Found",
    "labs.empty_desc":
      "Try removing the standard filter or choosing All States.",
    "labs.empty_action": "View All Laboratories",
    "hallmarking.badge": "Precious Metals Purity Assurance",
    "hallmarking.title_prefix": "Gold & Silver",
    "hallmarking.title_highlight": "Hallmarking Assistant",
    "hallmarking.subtitle":
      "Understand fineness grades, verify HUID codes, locate hallmarking centres.",
    "hallmarking.mandate_badge": "BIS Hallmarking Mandate",
    "hallmarking.mandate_desc":
      "Mandatory hallmarking operative across notified districts.",
    "hallmarking.3marks_title": "The 3 Mandatory Marks on Gold Jewellery",
    "hallmarking.3marks_note": "Operative since July 2021",
    "hallmarking.verify_tag": "Consumer Verification Tool",
    "hallmarking.verify_title": "Verify 6-Digit Alphanumeric HUID Structure",
    "hallmarking.verify_subtitle":
      "Test any 6-digit HUID code before buying jewellery.",
    "hallmarking.verify_placeholder": "Enter 6-character HUID (e.g. A1B2C3)",
    "hallmarking.btn_validate": "Validate Format",
    "hallmarking.verify_howto": "How to verify on BIS Care App:",
    "hallmarking.verify_safety": "Consumer Safety & Rights Tips:",
    "hallmarking.grades_title":
      "Official Gold & Silver Fineness Grades (IS 1417 & IS 2112)",
    "hallmarking.comp_badge": "Statutory 2X Compensation Policy",
    "hallmarking.comp_title": "Consumer Protection Guarantee",
    "hallmarking.loading_msg":
      "Loading Hallmarking Standards & Fineness Schedules...",
    "hallmarking.loading_sub":
      "Retrieving IS 1417 and IS 2112 statutory markings...",
    "reports.badge": "Decision Support Deliverable",
    "reports.title": "BIS Compliance Roadmap Report",
    "reports.btn_print": "Print / Save as PDF",
    "reports.doc_header": "Government Compliance Assessment Document",
    "reports.doc_title": "BIS Product Compliance & Conformity Roadmap",
    "reports.section1": "1. Target Product Profile",
    "reports.label_product": "Product Evaluated:",
    "reports.label_primarystd": "Primary Applicable Standard:",
    "reports.section2": "2. Applicable Indian Standards & QCO Mandates",
    "reports.tag_mandatory": "Mandatory",
    "reports.label_regulatory": "Regulatory Notification:",
    "reports.section3": "3. Applicable BIS Certification Scheme",
    "reports.label_validity": "Validity:",
    "reports.label_surveillance": "Surveillance:",
    "reports.section4": "4. Mandatory Testing Requirements",
    "reports.col_test": "Test Parameter",
    "reports.col_clause": "Standard Clause",
    "reports.col_type": "Type",
    "reports.col_sampling": "Sampling Rule",
    "reports.section5": "5. Recommended Testing Laboratories",
    "reports.section6": "6. Statutory Documentation Checklist",
    "reports.section7": "Key Statutory Compliance Pitfalls:",
    "reports.disclaimer_title": "Authoritative Compliance Notice:",
    "reports.loading_msg": "Synthesizing BIS Compliance Assessment Report...",
    "reports.loading_sub":
      "Compiling applicable standards, testing schedules, and statutory evidence...",
    "certification.badge": "BIS Conformity Assessment Schemes",
    "certification.title": "Certification Schemes & Compliance Roadmap",
    "certification.subtitle":
      "Understand statutory conformity schemes, factory audits, and licence grant procedures.",
    "certification.btn_report": "Generate Full Compliance Report",
    "certification.active_product": "Active Product Roadmap:",
    "certification.btn_change": "Change Product Profile →",
    "certification.roadmap_title":
      "Interactive Step-by-Step Certification Journey",
    "certification.phases": "Phases",
    "certification.details_tag": "Scheme Details",
    "certification.docs_title": "Statutory Documents Required:",
    "certification.fee_title": "Fee Structure:",
    "certification.validity": "Validity:",
    "certification.surveillance": "Surveillance:",
    "certification.link_official": "Official Manakonline / CRS Portal",
    "certification.loading_msg": "Loading Certification Scheme Requirements...",
    "certification.loading_sub":
      "Compiling documentation checklists and audit schedules...",
    "consumer.badge": "Citizen & Consumer Protection",
    "consumer.title_prefix": "Consumer Safety &",
    "consumer.title_highlight": "ISI Mark Verification Hub",
    "consumer.subtitle":
      "Verify ISI Mark CM/L licence numbers, detect counterfeit markings, access grievance channels.",
    "consumer.helpline_badge": "Toll-Free Consumer Helpline",
    "consumer.helpline_number": "1800-11-4000",
    "consumer.verify_tag": "Licence Authentication",
    "consumer.verify_title": "Verify ISI Mark CM/L Number",
    "consumer.verify_subtitle":
      "Enter the 7 or 8-digit numeric licence code beneath the ISI triangular logo.",
    "consumer.verify_placeholder":
      "Enter 7 or 8-digit CM/L Number (e.g. 1454301)",
    "consumer.btn_check": "Check Licence Structure",
    "consumer.checklist_auth": "Authenticity Verification Checklist:",
    "consumer.checklist_fraud": "Red Flag Fraud Indicators:",
    "consumer.link_biscare": "Download Official BIS Care Citizen App",
    "consumer.complaint_title": "How to Lodge a Counterfeit Complaint",
    "consumer.complaint_desc":
      "Submit an anonymous report to BIS Enforcement Branch via the BIS Care App or e-BIS portal.",
    "consumer.categories_title": "Key Mandatory Consumer Categories",
    "consumer.categories_desc":
      "Products that strictly require the ISI Mark before retail sale in India:",
    "consumer.cat_packaged_water": "Packaged Drinking Water",
    "consumer.cat_cement": "Cement",
    "consumer.cat_steel_tmt": "Steel TMT Bars",
    "consumer.cat_pvc_pipes": "PVC Pipes",
    "consumer.cat_electrical": "Electrical Appliances",
    "consumer.cat_food_dairy": "Food & Dairy Products",
    "consumer.cat_lpg": "LPG Cylinders",
    "consumer.cat_gold": "Gold Jewellery",
    "footer.description":
      "AI-Powered Decision-Support Platform for Indian Standards, Certification Schemes, Laboratory Testing, and Hallmarking.",
    "footer.tagline": "Retrieve First → Reason Second → Cite Everything",
    "footer.portals_title": "BIS Portals",
    "footer.ebis": "e-BIS Portal",
    "footer.manakonline": "Manakonline (Scheme I)",
    "footer.crs": "CRS Portal (Electronics)",
    "footer.nabl": "NABL Directory",
    "footer.modules_title": "Core Modules",
    "footer.find_standard": "Find My Standard",
    "footer.certification": "Certification Schemes",
    "footer.testing": "Testing Requirements",
    "footer.labs": "Recognized Labs Finder",
    "footer.hallmarking": "Gold & Silver Hallmarking",
    "footer.legal_title": "Legal & Quality Notice",
    "footer.legal_text":
      "Information provided is grounded in published Indian Standards and Gazette notifications. Formal legal compliance requires certification grant through official BIS portals.",
    "footer.admin_link": "Admin & Evaluation Console →",
    "footer.copyright":
      "BIS Saarthi. Built for Indian Industry, MSMEs & Citizens.",
    "footer.consumer_grievance": "صارف شکایت",
    "footer.ai_support": "AI فیصلہ سپورٹ",
    "prompts.industry.1":
      "میں سٹینلیس سٹیل واٹر بوتلیں بناتا ہوں۔ کون سا معیار لاگو ہوتا ہے؟",
    "prompts.industry.2":
      "کیا لتھیم-آئن پاور بینکوں کے لیے BIS سرٹیفیکیشن ضروری ہے؟",
    "prompts.industry.3":
      "IS 1786 کے تحت TMT سٹیل بارز کے لیے کون سے ٹیسٹ درکار ہیں؟",
    "prompts.industry.4":
      "اسکیم-I کے لیے فیکٹری آڈٹ اور نمونہ ٹیسٹنگ کا عمل کیا ہے؟",
    "prompts.industry.5":
      "ہندوستان میں برآمد کرنے والے غیر ملکی مینوفیکچررز کے لیے FMCS رہنما خطوط",
    "prompts.industry.6":
      "IS 302 الیکٹریکل آلات کے لیے مطلوبہ لیبارٹری ٹیسٹنگ سازوسامان",
    "prompts.consumer.1":
      "6 ہندسوں کے HUID کے ساتھ سونے کے زیورات کے ہال مارک کی تصدیق کیسے کروں؟",
    "prompts.consumer.2":
      "میں کیسے چیک کر سکتا ہوں کہ پیکج شدہ پانی پر ISI مارک اصلی ہے؟",
    "prompts.consumer.3":
      "خراب ISI سرٹیفائیڈ سامان کے خلاف صارف کی شکایت کیسے درج کریں؟",
    "prompts.consumer.4": "BIS ہال مارک اور 916 خالصیت کے نشان میں فرق۔",
    "prompts.consumer.5": "کیا سمارٹ فونز کے لیے BIS رجسٹریشن لازمی ہے؟",
    "prompts.student.1":
      "IS 10500 شق 4.2 پینے کے پانی کی TDS اور بھاری دھات کی حدود کی وضاحت کریں",
    "prompts.student.2": "IS 456 معیارات اور Eurocode 2 کے درمیان تقابلی تجزیہ",
    "prompts.student.3": "NBC 2016 میں تازہ ترین ترامیم کیا ہیں؟",
    "prompts.student.5":
      "2015 سے پہلے واپس لی گئی آرکائیو شدہ معیارات تک کیسے رسائی حاصل کریں؟",
    "prompts.student.6":
      "IS 1417 اور بین الاقوامی معیارات کے درمیان hallmarking assaying tolerances کا موازنہ کریں",
    "prompts.admin.1":
      "What are the active Quality Control Orders (QCOs) in effect?",
    "prompts.admin.2":
      "Audit compliance checklist for BIS recognized testing laboratories",
    "prompts.admin.3":
      "Standards revision roadmap and committee review process",
    "consumer.complaint_step1": "1. مصنوعات اور پیکیجنگ کی واضح تصاویر لیں۔",

    "consumer.complaint_step2": "2. خوردہ کیش میمو / GST انوائس محفوظ رکھیں۔",

    "consumer.complaint_step3": "3. BIS Care ایپ پر خوردہ فروش کے پتے کے ساتھ شکایت جمع کریں۔",

    "consumer.cat_lpg_cylinders": "LPG ریگولیٹر اور سلنڈر",

    "consumer.cat_infant_formula": "شیرخوار فارمولا",

    "consumer.cat_immersion_heaters": "برقی عمیق ہیٹر",

    "consumer.cat_auto_tyres": "موٹر گاڑی کے ٹائر",

    "labs.state_maharashtra": "مہاراشٹر",

    "labs.state_delhi": "دہلی",

    "labs.state_uttar_pradesh": "اتر پردیش",

    "labs.state_karnataka": "کرناٹک",

    "labs.state_haryana": "ہریانہ",

    "labs.state_tamil_nadu": "تمل ناڈو",

    "labs.state_gujarat": "گجرات",

  },
  [IndianLanguage.AS]: {
    "nav.standards": "মানদণ্ড",
    "nav.find_standard": "মানদণ্ড বিচাৰক",
    "nav.catalogue": "মানদণ্ড তালিকা",
    "nav.certification": "প্ৰমাণপত্ৰ",
    "nav.testing": "পৰীক্ষণ",
    "nav.labs": "পৰীক্ষাগাৰ",
    "nav.hallmark": "হলমাৰ্ক",
    "nav.consumer": "গ্ৰাহক",
    "nav.reports": "প্ৰতিবেদন",
    "nav.ask_bis_ai": "BIS AI ক সোধক",
    "nav.ask_ai": "AI ক সোধক",
    "hero.title": "ভাৰতীয় মানদণ্ড আৰু BIS সেৱাৰ বাবে আপোনাৰ AI সহায়ক",
    "hero.subtitle": "সঠিক মানদণ্ড বিচাৰক, পৰীক্ষণ clauses যাচাই কৰক।",
    "hero.select_profile": "আপোনাৰ প্ৰ'ফাইল বাছনি কৰক:",
    "hero.search_placeholder":
      "উৎপাদ মানদণ্ড, Scheme I/CRS পৰীক্ষণ বিষয়ে সোধক...",
    "hero.ask_ai_btn": "AI ক সোধক",
    "hero.suggested_queries": "পৰামৰ্শিত প্ৰশ্ন:",
    "chat.new_session": "+ নতুন চ্যাট অধিবেশন",
    "chat.specialized_tools": "BIS বিশেষ সঁজুলি",
    "chat.find_standard": "মোৰ মানক বিচাৰক",
    "chat.certification_schemes": "প্ৰমাণপত্ৰ আঁচনি",
    "chat.testing_requirements": "পৰীক্ষণৰ প্ৰয়োজনীয়তা",
    "chat.find_lab": "স্বীকৃত লেব বিচাৰক",
    "chat.generate_report": "অনুপালন প্ৰতিবেদন প্ৰস্তুত কৰক",
    "chat.active_workspace": "সক্ৰিয় কৰ্মক্ষেত্ৰ",
    "chat.current_investigation": "বৰ্তমানৰ অনুসন্ধান",
    "chat.grounded_active": "প্ৰমাণ-ভিত্তিক পুনৰুদ্ধাৰ সক্ৰিয়",
    "chat.grounded_desc": "চৰকাৰী গেজেট অধিসূচনাৰ পৰা পৰীক্ষিত উত্তৰ।",
    "chat.conversation_title": "BIS সাৰথী বাৰ্তালাপ",
    "chat.mode": "ম'ড:",
    "chat.language_label": "ভাষা:",
    "chat.evidence_panel_btn": "প্ৰমাণ পেনেল",
    "chat.welcome_title": "BIS সাৰথী — প্ৰমাণ-ভিত্তিক সিদ্ধান্ত সহায়ক",
    "chat.input_placeholder":
      "মানক, প্ৰমাণপত্ৰ, পৰীক্ষণ পদ্ধতি বা ধাৰাৰ বিষয়ে সোধক...",
    "chat.send_btn": "প্ৰেৰণ কৰক",
    "chat.answer_language": "উত্তৰৰ ভাষা",
    "chat.detected_language": "চিনাক্ত কৰা ভাষা",
    "chat.evidence_panel": "প্ৰামাণিক প্ৰমাণ আৰু উদ্ধৃতি",
    "chat.confidence": "বিশ্বাসযোগ্যতাৰ স্তৰ",
    "chat.source_freshness": "যাচাই কৰা উৎস",
    "chat.searching_status":
      "BIS ভঁৰালত সন্ধান আৰু ধাৰাসমূহ সংগ্ৰহ কৰা হৈছে...",
    "chat.traceable_citations": "ট্ৰেচ কৰিব পৰা প্ৰামাণিক উদ্ধৃতি:",
    "chat.copy_answer": "উত্তৰ নকল কৰক",
    "chat.copied": "নকল কৰা হ’ল",
    "chat.helpful": "সহায়কাৰী উত্তৰ",
    "chat.not_helpful": "সহায়কাৰী নহয়",
    "chat.report_citation": "ভুল উদ্ধৃতি ৰিপৰ্ট কৰক",
    "chat.disclaimer":
      "শুদ্ধতাৰ নিশ্চয়তা: BIS সাৰথীয়ে সদায় ভাৰতীয় মানক ভিত্তিক প্ৰমাণিত তথ্য প্ৰদান কৰে।",
    "chat.bis_act_compliant": "BIS আইন ২০১৬ অনুসৰণকাৰী",
    "evidence.title": "প্ৰামাণিক প্ৰমাণ আৰু উদ্ধৃতি",
    "evidence.indian_standard": "ভাৰতীয় মানক",
    "evidence.clause": "ধাৰা:",
    "evidence.page": "পৃষ্ঠা:",
    "evidence.publication": "প্ৰকাশৰ তাৰিখ:",
    "evidence.relevance": "প্ৰাসংগিকতা:",
    "evidence.freshness_notice": "জাননী:",
    "evidence.verbatim_excerpt": "মূল মানক ধাৰা উদ্ধৃতি",
    "evidence.copy_excerpt": "উদ্ধৃতি নকল কৰক",
    "evidence.copied": "নকল কৰা হ’ল",
    "evidence.view_source": "চৰকাৰী BIS পোৰ্টেলত চাওক",
    "evidence.no_evidence_title": "কোনো প্ৰমাণ উল্লেখ কৰা নাই",
    "evidence.no_evidence_desc":
      "BIS মানক ধাৰা পৰিদৰ্শন কৰিবলৈ প্ৰশ্ন সোধক বা মানক বাছক।",
    "common.loading": "BIS RAG ইঞ্জিনৰ দ্বাৰা উত্তৰ প্ৰস্তুত কৰা হৈছে...",
    "common.error": "প্ৰক্ৰিয়া কৰিব পৰা নগ'ল। সংযোগ পৰীক্ষা কৰক।",

    "header.subtitle": "Indian Standards Intelligence",
    "home.how_subtitle_prefix": "Strict adherence to",
    "home.how_subtitle_bold":
      '"Retrieve First → Reason Second → Cite Everything"',
    "home.mode_industry": "উদ্যোগ / MSME",
    "home.mode_consumer": "গ্ৰাহক",
    "home.mode_student": "শিক্ষাৰ্থী / গৱেষক",
    "home.mode_admin": "প্ৰশাসন আৰু নিয়ন্ত্ৰক",
    "home.mode_consumer_placeholder": "সোণৰ HUID পৰীক্ষা, ISI মাৰ্ক পৰীক্ষা...",
    "home.mode_student_placeholder":
      "মানদণ্ড clauses বিচাৰক, তুলনামূলক বিশ্লেষণ...",
    "home.mode_admin_placeholder": "মানদণ্ড, আঁচনি, প্ৰতিবেদন বিচাৰক...",
    "home.features_title": "ভাৰতীয় মানদণ্ড ব্যুৰ'ৰ সম্পূৰ্ণ তথ্য",
    "home.features_subtitle": "উৎপাদক, গ্ৰাহক আৰু গৱেষকৰ বাবে সংগঠিত অধ্যায়।",
    "home.features_find_title": "মানদণ্ড বিচাৰ Workflow",
    "home.features_find_badge": "AI Profiler",
    "home.features_find_tag": "উৎপাদ মেলান",
    "home.features_find_desc":
      "উৎপাদ specifications আৰু ব্যৱহাৰ অনুযায়ী ভাৰতীয় মানদণ্ড মেলান।",
    "home.features_find_action": "Profiler আৰম্ভ →",
    "home.features_cert_title": "প্ৰমাণপত্ৰ আঁচনি আৰু Roadmap",
    "home.features_cert_badge": "ISI & CRS",
    "home.features_cert_tag": "Audit & FMCS",
    "home.features_cert_desc":
      "Scheme I (ISI Mark), CRS, FMCS — timelines, checklists, factory audit rules।",
    "home.features_cert_action": "আঁচনি চাওক →",
    "home.features_testing_title": "পৰীক্ষণ আৱশ্যকতা আৰু Clauses",
    "home.features_testing_badge": "Clauses",
    "home.features_testing_tag": "Sampling Schedules",
    "home.features_testing_desc":
      "Acceptance criteria, sampling rules, testing frequencies।",
    "home.features_testing_action": "Test Schedules চাওক →",
    "home.features_labs_title": "BIS স্বীকৃত পৰীক্ষাগাৰ বিচাৰ",
    "home.features_labs_badge": "Lab Network",
    "home.features_labs_tag": "NABL & BIS Facilities",
    "home.features_labs_desc":
      "IS number, উৎপাদ শ্ৰেণী, ৰাজ্য আৰু চহৰ — labs filter।",
    "home.features_labs_action": "Accredited Lab বিচাৰক →",
    "home.features_hallmark_title": "সোণ-ৰূপ Hallmarking সহায়ক",
    "home.features_hallmark_badge": "HUID পৰীক্ষা",
    "home.features_hallmark_tag": "Purity & Assaying",
    "home.features_hallmark_desc":
      "22K (916), 18K (750), 14K (585) — 6-ডিজিট HUID verify।",
    "home.features_hallmark_action": "Hallmarking গাইড →",
    "home.features_consumer_title": "গ্ৰাহক সুৰক্ষা আৰু ISI পৰীক্ষা",
    "home.features_consumer_badge": "পৰীক্ষা & ৰিপৰ্ট",
    "home.features_consumer_tag": "অভিযোগ নিবাৰণ",
    "home.features_consumer_desc":
      "ISI Mark CM/L licence numbers পৰীক্ষা, counterfeit marks চিনাক্ত।",
    "home.features_consumer_action": "Consumer Hub →",
    "home.how_title": "BIS Saarthi কেনেদৰে কাম কৰে",
    "home.how_badge": "Architecture & Verification Pipeline",
    "home.how_step1_title": "প্ৰশ্ন সোধক",
    "home.how_step1_desc": "অসমীয়া, ইংৰাজী, 22 ভাৰতীয় ভাষাত।",
    "home.how_step2_title": "Retrieve",
    "home.how_step2_desc": "BIS repository hybrid search।",
    "home.how_step3_title": "Verify",
    "home.how_step3_desc": "Source freshness verification।",
    "home.how_step4_title": "Explain",
    "home.how_step4_desc": "স্পষ্ট ভাষাত guidance।",
    "home.how_step5_title": "Cite",
    "home.how_step5_desc": "প্ৰতিটো claim traceable।",
    "home.trust_badge": "Zero Hallucination Operational Standard",
    "home.trust_title": "MSMEs, Compliance Teams আৰু নাগৰিকৰ বিশ্বাস",
    "home.trust_desc":
      "BIS Saarthi কেতিয়াও Indian Standard numbers অনুমানৰে দিয়া নহয়।",
    "home.trust_action": "AI Workspace আৰম্ভ →",
    "standards.badge": "Bureau of Indian Standards Repository",
    "standards.title": "Indian Standards Directory & Search",
    "standards.subtitle":
      "Search authoritative Indian Standards, mandatory QCOs, and testing clause schedules.",
    "standards.search_placeholder": "Search by IS number or keyword...",
    "standards.search_btn": "বিচাৰক",
    "standards.filter_division": "Division:",
    "standards.filter_all": "সকলো Divisions",
    "standards.filter_mandatory": "Mandatory QCO Only",
    "standards.div_mech": "Mechanical Engineering",
    "standards.div_civil": "Civil Engineering",
    "standards.div_electro": "Electrotechnical",
    "standards.div_met": "Metallurgical Engineering",
    "standards.div_food": "Food and Agriculture",
    "standards.loading_msg": "Retrieving Standards from BIS Repository...",
    "standards.loading_sub":
      "Applying division filters and QCO regulatory scopes...",
    "standards.empty_title": "কোনো ভাৰতীয় মানদণ্ড পোৱা নগ'ল",
    "standards.empty_desc":
      "Try broadening your search query or reset the filters.",
    "standards.empty_action": "Filters Reset",
    "findstd.badge": "AI Product Scope Profiler",
    "findstd.title_prefix": "প্ৰযোজ্য",
    "findstd.title_highlight": "ভাৰতীয় মানদণ্ড",
    "findstd.subtitle":
      "Input product specifications and get matched Indian Standards.",
    "findstd.anti_badge": "Anti-Speculation Standard",
    "findstd.anti_desc":
      "Verify final grade classification against statutory QCOs.",
    "findstd.form_title": "উৎপাদ Specification Form",
    "findstd.form_subtitle":
      "Provide as many details as possible for precise standard matching.",
    "findstd.field_product": "Product Name / Type",
    "findstd.field_material": "Raw Material Composition",
    "findstd.field_application": "Intended Application / Usage",
    "findstd.field_industry": "Industry / Domain Sector",
    "findstd.field_capacity": "Capacity / Size",
    "findstd.field_techspec": "Technical Specifications",
    "findstd.placeholder_product":
      "e.g. Stainless steel water bottle, PVC cable, TMT bar",
    "findstd.placeholder_material": "e.g. SS 304, Aluminium alloy",
    "findstd.placeholder_application":
      "e.g. Drinking water storage, building construction",
    "findstd.placeholder_industry":
      "e.g. Metallurgical, Food & Agriculture, Civil",
    "findstd.placeholder_capacity": "e.g. 750 ml, 1.1kV, 12mm",
    "findstd.placeholder_techspec":
      "e.g. Voltage rating 1.1kV, double wall insulation",
    "findstd.btn_evaluate": "Evaluate Applicable Standards",
    "findstd.btn_clear": "Clear",
    "findstd.btn_sample": "Run Sample Evaluation",
    "findstd.results_title": "Evaluated Indian Standards",
    "findstd.results_complete": "Grounded Assessment Completed",
    "findstd.loading_msg": "Evaluating Product-to-Standard Scope...",
    "findstd.loading_sub":
      "Scanning Gazette notifications and material grade parameters...",
    "findstd.empty_title": "No Profile Evaluated Yet",
    "findstd.empty_desc":
      "Fill in the product specification form and click Evaluate.",
    "testing.badge": "Statutory Testing Schedules",
    "testing.title": "Indian Standards Testing Requirements",
    "testing.subtitle":
      "Inspect mandatory routine tests, acceptance criteria, and sampling rules.",
    "testing.filter_placeholder":
      "Filter by Standard Number (e.g. IS 17526, IS 10500)...",
    "testing.btn_filter": "Filter Tests",
    "testing.btn_showall": "Show All Tests",
    "testing.loading_msg":
      "Retrieving Testing Clauses & Acceptance Parameters...",
    "testing.loading_sub":
      "Cross-referencing laboratory test methods and sampling frequencies...",
    "testing.empty_title": "No Testing Requirements Found",
    "testing.empty_desc": "Try searching with IS 17526, IS 10500, or IS 1786.",
    "labs.badge": "Accredited Testing Infrastructure",
    "labs.title": "Find a BIS Recognized Laboratory",
    "labs.subtitle":
      "Search NABL and BIS recognized testing labs across Indian states.",
    "labs.search_placeholder":
      "Search by Indian Standard (e.g. IS 17526, IS 14543)...",
    "labs.btn_filter": "Filter Labs",
    "labs.filter_state": "State:",
    "labs.filter_allstates": "All States",
    "labs.loading_msg": "Locating Recognized Testing Laboratories...",
    "labs.loading_sub": "Matching accredited testing parameters...",
    "labs.empty_title": "No Laboratories Found",
    "labs.empty_desc":
      "Try removing the standard filter or choosing All States.",
    "labs.empty_action": "View All Laboratories",
    "hallmarking.badge": "Precious Metals Purity Assurance",
    "hallmarking.title_prefix": "Gold & Silver",
    "hallmarking.title_highlight": "Hallmarking Assistant",
    "hallmarking.subtitle":
      "Understand fineness grades, verify HUID codes, locate hallmarking centres.",
    "hallmarking.mandate_badge": "BIS Hallmarking Mandate",
    "hallmarking.mandate_desc":
      "Mandatory hallmarking operative across notified districts.",
    "hallmarking.3marks_title": "The 3 Mandatory Marks on Gold Jewellery",
    "hallmarking.3marks_note": "Operative since July 2021",
    "hallmarking.verify_tag": "Consumer Verification Tool",
    "hallmarking.verify_title": "Verify 6-Digit Alphanumeric HUID Structure",
    "hallmarking.verify_subtitle":
      "Test any 6-digit HUID code before buying jewellery.",
    "hallmarking.verify_placeholder": "Enter 6-character HUID (e.g. A1B2C3)",
    "hallmarking.btn_validate": "Validate Format",
    "hallmarking.verify_howto": "How to verify on BIS Care App:",
    "hallmarking.verify_safety": "Consumer Safety & Rights Tips:",
    "hallmarking.grades_title":
      "Official Gold & Silver Fineness Grades (IS 1417 & IS 2112)",
    "hallmarking.comp_badge": "Statutory 2X Compensation Policy",
    "hallmarking.comp_title": "Consumer Protection Guarantee",
    "hallmarking.loading_msg":
      "Loading Hallmarking Standards & Fineness Schedules...",
    "hallmarking.loading_sub":
      "Retrieving IS 1417 and IS 2112 statutory markings...",
    "reports.badge": "Decision Support Deliverable",
    "reports.title": "BIS Compliance Roadmap Report",
    "reports.btn_print": "Print / Save as PDF",
    "reports.doc_header": "Government Compliance Assessment Document",
    "reports.doc_title": "BIS Product Compliance & Conformity Roadmap",
    "reports.section1": "1. Target Product Profile",
    "reports.label_product": "Product Evaluated:",
    "reports.label_primarystd": "Primary Applicable Standard:",
    "reports.section2": "2. Applicable Indian Standards & QCO Mandates",
    "reports.tag_mandatory": "Mandatory",
    "reports.label_regulatory": "Regulatory Notification:",
    "reports.section3": "3. Applicable BIS Certification Scheme",
    "reports.label_validity": "Validity:",
    "reports.label_surveillance": "Surveillance:",
    "reports.section4": "4. Mandatory Testing Requirements",
    "reports.col_test": "Test Parameter",
    "reports.col_clause": "Standard Clause",
    "reports.col_type": "Type",
    "reports.col_sampling": "Sampling Rule",
    "reports.section5": "5. Recommended Testing Laboratories",
    "reports.section6": "6. Statutory Documentation Checklist",
    "reports.section7": "Key Statutory Compliance Pitfalls:",
    "reports.disclaimer_title": "Authoritative Compliance Notice:",
    "reports.loading_msg": "Synthesizing BIS Compliance Assessment Report...",
    "reports.loading_sub":
      "Compiling applicable standards, testing schedules, and statutory evidence...",
    "certification.badge": "BIS Conformity Assessment Schemes",
    "certification.title": "BIS প্ৰমাণপত্ৰ আঁচনি",
    "certification.subtitle":
      "Understand statutory conformity schemes, factory audits, and licence grant procedures.",
    "certification.btn_report": "Generate Full Compliance Report",
    "certification.active_product": "Active Product Roadmap:",
    "certification.btn_change": "Change Product Profile →",
    "certification.roadmap_title":
      "Interactive Step-by-Step Certification Journey",
    "certification.phases": "Phases",
    "certification.details_tag": "Scheme Details",
    "certification.docs_title": "Statutory Documents Required:",
    "certification.fee_title": "Fee Structure:",
    "certification.validity": "Validity:",
    "certification.surveillance": "Surveillance:",
    "certification.link_official": "Official Manakonline / CRS Portal",
    "certification.loading_msg": "Loading Certification Scheme Requirements...",
    "certification.loading_sub":
      "Compiling documentation checklists and audit schedules...",
    "consumer.badge": "Citizen & Consumer Protection",
    "consumer.title_prefix": "গ্ৰাহক সুৰক্ষা &",
    "consumer.title_highlight": "ISI Mark Verification Hub",
    "consumer.subtitle":
      "Verify ISI Mark CM/L licence numbers, detect counterfeit markings, access grievance channels.",
    "consumer.helpline_badge": "Toll-Free Consumer Helpline",
    "consumer.helpline_number": "1800-11-4000",
    "consumer.verify_tag": "Licence Authentication",
    "consumer.verify_title": "Verify ISI Mark CM/L Number",
    "consumer.verify_subtitle":
      "Enter the 7 or 8-digit numeric licence code beneath the ISI triangular logo.",
    "consumer.verify_placeholder":
      "Enter 7 or 8-digit CM/L Number (e.g. 1454301)",
    "consumer.btn_check": "Check Licence Structure",
    "consumer.checklist_auth": "Authenticity Verification Checklist:",
    "consumer.checklist_fraud": "Red Flag Fraud Indicators:",
    "consumer.link_biscare": "Download Official BIS Care Citizen App",
    "consumer.complaint_title": "How to Lodge a Counterfeit Complaint",
    "consumer.complaint_desc":
      "Submit an anonymous report to BIS Enforcement Branch via the BIS Care App or e-BIS portal.",
    "consumer.categories_title": "Key Mandatory Consumer Categories",
    "consumer.categories_desc":
      "Products that strictly require the ISI Mark before retail sale in India:",
    "consumer.cat_packaged_water": "Packaged Drinking Water",
    "consumer.cat_cement": "Cement",
    "consumer.cat_steel_tmt": "Steel TMT Bars",
    "consumer.cat_pvc_pipes": "PVC Pipes",
    "consumer.cat_electrical": "Electrical Appliances",
    "consumer.cat_food_dairy": "Food & Dairy Products",
    "consumer.cat_lpg": "LPG Cylinders",
    "consumer.cat_gold": "Gold Jewellery",
    "footer.description":
      "AI-Powered Decision-Support Platform for Indian Standards, Certification Schemes, Laboratory Testing, and Hallmarking.",
    "footer.tagline": "Retrieve First → Reason Second → Cite Everything",
    "footer.portals_title": "BIS Portals",
    "footer.ebis": "e-BIS Portal",
    "footer.manakonline": "Manakonline (Scheme I)",
    "footer.crs": "CRS Portal (Electronics)",
    "footer.nabl": "NABL Directory",
    "footer.modules_title": "Core Modules",
    "footer.find_standard": "Find My Standard",
    "footer.certification": "Certification Schemes",
    "footer.testing": "Testing Requirements",
    "footer.labs": "Recognized Labs Finder",
    "footer.hallmarking": "Gold & Silver Hallmarking",
    "footer.legal_title": "Legal & Quality Notice",
    "footer.legal_text":
      "Information provided is grounded in published Indian Standards and Gazette notifications. Formal legal compliance requires certification grant through official BIS portals.",
    "footer.admin_link": "Admin & Evaluation Console →",
    "footer.copyright":
      "BIS Saarthi. Built for Indian Industry, MSMEs & Citizens.",
    "footer.consumer_grievance": "গ্ৰাহক অভিযোগ",
    "footer.ai_support": "AI সিদ্ধান্ত সমৰ্থন",
    "prompts.industry.1":
      "মই Stainless Steel Water Bottles নিৰ্মাণ কৰোঁ। কোনটো মানদণ্ড?",
    "prompts.industry.2": "Lithium-ion Power Banks — BIS certification?",
    "prompts.industry.3": "IS 1786 TMT Steel Bars — tests?",
    "prompts.industry.4": "Scheme-I — factory audit & sample testing?",
    "prompts.industry.5": "ভাৰত export foreign manufacturers — FMCS guidelines",
    "prompts.industry.6":
      "IS 302 electrical appliances — lab testing equipment",
    "prompts.consumer.1": "6-digit HUID সোণৰ গহনা hallmark যাচাই?",
    "prompts.consumer.2": "Packaged water ISI mark প্ৰকৃত — পৰীক্ষা?",
    "prompts.consumer.3": "ত্ৰুটিপূৰ্ণ ISI certified — গ্ৰাহক অভিযোগ?",
    "prompts.consumer.4": "BIS Hallmark আৰু 916 purity mark পাৰ্থক্য।",
    "prompts.consumer.5": "Smartphones — BIS registration বাধ্যতামূলক?",
    "prompts.consumer.6": "CRS scheme electronics R-number যাচাই?",
    "prompts.student.1": "IS 10500 Clause 4.2 TDS & heavy metal limits",
    "prompts.student.2": "IS 456 vs Eurocode 2 — comparative analysis",
    "prompts.student.3": "NBC 2016 — latest amendments?",
    "prompts.student.4": "IS 2062 tensile & elongation — technical clauses",
    "prompts.student.5": "2015-ৰ আগত withdrawn archived standards access?",
    "prompts.student.6": "IS 1417 vs international — hallmarking tolerances",
    "prompts.admin.1": "BIS Saarthi Analytics Dashboard",
    "prompts.admin.2": "Laboratory accreditation database",
    "prompts.admin.3": "Standard revision roadmap and committee review",
  },
  [IndianLanguage.SAN]: {
    "nav.standards": "मानकानि",
    "nav.find_standard": "स्वमानकं अन्विष्यतु",
    "nav.catalogue": "मानकसूची",
    "nav.certification": "प्रमाणीकरणम्",
    "nav.testing": "परीक्षणम्",
    "nav.labs": "प्रयोगशालाः",
    "nav.hallmark": "हॉल्मार्क",
    "nav.consumer": "उपभोक्तृसंरक्षणम्",
    "nav.reports": "विवरणानि",
    "nav.ask_bis_ai": "BIS AI पृच्छतु",
    "nav.ask_ai": "पृच्छतु AI",
    "hero.title": "भारतीयमानकानां बीआईएस-सेवानां च कृते भवतः एआई-सहायकः",
    "hero.subtitle":
      "उचितं मानकं प्राप्नुवन्तु, प्रमाणीकरणयोजनाः अवगच्छन्तु च।",
    "hero.select_profile": "स्वकीय-रूपरेखां चिनोतु:",
    "hero.search_placeholder": "उत्पादमानकानां विषये पृच्छतु...",
    "hero.ask_ai_btn": "पृच्छतु AI",
    "hero.suggested_queries": "प्रस्ताविताः प्रश्नाः:",
    "chat.new_session": "+ नूतन-संवाद-सत्रम्",
    "chat.specialized_tools": "बीआईएस विशिष्टोपकरणानि",
    "chat.find_standard": "स्वमानकं अन्विष्यतु",
    "chat.certification_schemes": "प्रमाणीकरण-योजनाः",
    "chat.testing_requirements": "परीक्षण-आवश्यकताः",
    "chat.find_lab": "मान्यताप्राप्त-प्रयोगशालां अन्विष्यतु",
    "chat.generate_report": "अनुपालन-विवरणं सृजतु",
    "chat.active_workspace": "सक्रिय-कार्यक्षेत्रम्",
    "chat.current_investigation": "वर्तमान-अनुसन्धानम्",
    "chat.grounded_active": "प्रमाण-आधारित-पुनर्प्राप्तिः सक्रिया",
    "chat.grounded_desc": "प्रकाशित-राजपत्र-अधिसूचनाभ्यः सत्यापितानि उत्तराणि।",
    "chat.conversation_title": "बीआईएस सारथी संवादः",
    "chat.mode": "प्रकारः:",
    "chat.language_label": "भाषा:",
    "chat.evidence_panel_btn": "प्रमाण-फलकम्",
    "chat.welcome_title": "बीआईएस सारथी — प्रमाण-आधारित-निर्णय-सहायकः",
    "chat.input_placeholder":
      "भारतीयमानकानां, प्रमाणीकरणस्य, परीक्षणविधीनां विषये पृच्छतु...",
    "chat.send_btn": "प्रेषयतु",
    "chat.answer_language": "उत्तरभाषा",
    "chat.detected_language": "अभिज्ञाता भाषा",
    "chat.evidence_panel": "प्रामाणिकानि प्रमाणानि उद्धरणानि च",
    "chat.confidence": "विश्वसनीयतास्तरः",
    "chat.source_freshness": "सत्यापितः स्रोतः",
    "chat.searching_status":
      "बीआईएस भण्डारे अन्वेषणं खण्डाः च निष्कास्यन्ते...",
    "chat.traceable_citations": "सत्यापनयोग्यानि प्रामाणिकोद्धरणानि:",
    "chat.copy_answer": "उत्तरं प्रतिलिखतु",
    "chat.copied": "प्रतिलिखितम्",
    "chat.helpful": "उपयोगि उत्तरम्",
    "chat.not_helpful": "अनुपयोगि",
    "chat.report_citation": "अशुद्धोद्धरणं सूचयतु",
    "chat.disclaimer":
      "सत्यता-प्रतिज्ञा: बीआईएस-सारथी सर्वदा प्रामाणिक-तथ्यान्येव प्रदर्शयति।",
    "chat.bis_act_compliant": "बीआईएस अधिनियम २०१६ अनुसरणं",
    "evidence.title": "प्रामाणिकानि प्रमाणानि उद्धरणानि च",
    "evidence.indian_standard": "भारतीयमानकम्",
    "evidence.clause": "खण्डः:",
    "evidence.page": "पृष्ठम्:",
    "evidence.publication": "प्रकाशन-दिनाङ्कः:",
    "evidence.relevance": "प्रासङ्गिकता:",
    "evidence.freshness_notice": "नवीनता-सूचना:",
    "evidence.verbatim_excerpt": "मूलमानकखण्डोद्धरणम्",
    "evidence.copy_excerpt": "उद्धरणं प्रतिलिखतु",
    "evidence.copied": "प्रतिलिखितम्",
    "evidence.view_source": "आधिकारिके बीआईएस-जालपुटे पश्यतु",
    "evidence.no_evidence_title": "किमपि प्रमाणं न उल्लिखितम्",
    "evidence.no_evidence_desc":
      "बीआईएस-मानकखण्डान् राजपत्रभागान् च परीक्षितुं प्रश्नं पृच्छतु मानकं वा चिनोतु।",
    "common.loading": "उत्तरं सज्जीक्रियते...",
    "common.error": "प्रक्रिया विफला जाता।",

    "header.subtitle": "Indian Standards Intelligence",
    "home.how_subtitle_prefix": "Strict adherence to",
    "home.how_subtitle_bold":
      '"Retrieve First → Reason Second → Cite Everything"',
    "home.mode_industry": "Industry / MSME",
    "home.mode_consumer": "Consumer",
    "home.mode_student": "Student / Researcher",
    "home.mode_admin": "Admin & Regulatory",
    "home.mode_consumer_placeholder":
      "Check gold hallmark HUID, verify ISI mark...",
    "home.mode_student_placeholder":
      "Search standard clauses, comparative analysis...",
    "home.mode_admin_placeholder":
      "Search standards, schemes, reports, or guidelines...",
    "home.features_title": "Bureau of Indian Standards Intelligence",
    "home.features_subtitle":
      "Structured modules for manufacturers, compliance officers, consumers.",
    "home.features_find_title": "Find My Standard Workflow",
    "home.features_find_badge": "AI Profiler",
    "home.features_find_tag": "Product Matching",
    "home.features_find_desc":
      "Step-by-step product profiler matching your product to Indian Standards.",
    "home.features_find_action": "Start Profiler →",
    "home.features_cert_title": "Certification Schemes & Roadmap",
    "home.features_cert_badge": "ISI & CRS",
    "home.features_cert_tag": "Audit & FMCS",
    "home.features_cert_desc":
      "Navigate Scheme I (ISI Mark), Scheme II (CRS), Scheme IV, and FMCS.",
    "home.features_cert_action": "Explore Schemes →",
    "home.features_testing_title": "Testing Requirements & Clauses",
    "home.features_testing_badge": "Clauses",
    "home.features_testing_tag": "Sampling Schedules",
    "home.features_testing_desc":
      "Acceptance criteria, sampling rules, and testing equipment from Indian Standards.",
    "home.features_testing_action": "Inspect Test Schedules →",
    "home.features_labs_title": "BIS Recognized Laboratories Finder",
    "home.features_labs_badge": "Lab Network",
    "home.features_labs_tag": "NABL & BIS Facilities",
    "home.features_labs_desc":
      "Filter NABL and BIS recognized labs by IS number, state, and city.",
    "home.features_labs_action": "Locate Accredited Lab →",
    "home.features_hallmark_title": "Gold & Silver Hallmarking Assistant",
    "home.features_hallmark_badge": "HUID Check",
    "home.features_hallmark_tag": "Purity & Assaying",
    "home.features_hallmark_desc":
      "Verify 6-digit HUID codes and understand gold/silver purity grades.",
    "home.features_hallmark_action": "Hallmarking Guidance →",
    "home.features_consumer_title": "Consumer Protection & ISI Check",
    "home.features_consumer_badge": "Verify & Report",
    "home.features_consumer_tag": "Grievance Redressal",
    "home.features_consumer_desc":
      "Verify ISI Mark CM/L licence numbers, spot counterfeits.",
    "home.features_consumer_action": "Consumer Hub →",
    "home.how_title": "How BIS Saarthi Works",
    "home.how_badge": "Architecture & Verification Pipeline",
    "home.how_step1_title": "Ask Query",
    "home.how_step1_desc":
      "Query in English, Hindi, or any of 22 Scheduled Indian Languages.",
    "home.how_step2_title": "Retrieve",
    "home.how_step2_desc":
      "Hybrid BM25 + Vector semantic search across BIS repository.",
    "home.how_step3_title": "Verify",
    "home.how_step3_desc":
      "Cross-encoder reranking & source freshness verification.",
    "home.how_step4_title": "Explain",
    "home.how_step4_desc":
      "Clear plain-language guidance distinguished from statutory clauses.",
    "home.how_step5_title": "Cite",
    "home.how_step5_desc":
      "Every claim traceable to standard number, clause, page, and link.",
    "home.trust_badge": "Zero Hallucination Operational Standard",
    "home.trust_title": "Trusted by MSMEs, Compliance Teams & Citizens",
    "home.trust_desc":
      "BIS Saarthi never invents Indian Standard numbers, test clauses, or lab recognition statuses.",
    "home.trust_action": "Launch AI Workspace →",
    "standards.badge": "Bureau of Indian Standards Repository",
    "standards.title": "Indian Standards Directory & Search",
    "standards.subtitle":
      "Search authoritative Indian Standards, mandatory QCOs, and testing clause schedules.",
    "standards.search_placeholder": "Search by IS number or keyword...",
    "standards.search_btn": "Search",
    "standards.filter_division": "Division:",
    "standards.filter_all": "All Divisions",
    "standards.filter_mandatory": "Mandatory QCO Only",
    "standards.div_mech": "Mechanical Engineering",
    "standards.div_civil": "Civil Engineering",
    "standards.div_electro": "Electrotechnical",
    "standards.div_met": "Metallurgical Engineering",
    "standards.div_food": "Food and Agriculture",
    "standards.loading_msg": "Retrieving Standards from BIS Repository...",
    "standards.loading_sub":
      "Applying division filters and QCO regulatory scopes...",
    "standards.empty_title": "No Indian Standards Found",
    "standards.empty_desc":
      "Try broadening your search query or reset the filters.",
    "standards.empty_action": "Reset Filters",
    "findstd.badge": "AI Product Scope Profiler",
    "findstd.title_prefix": "Find Applicable",
    "findstd.title_highlight": "Indian Standard",
    "findstd.subtitle":
      "Input product specifications and get matched Indian Standards.",
    "findstd.anti_badge": "Anti-Speculation Standard",
    "findstd.anti_desc":
      "Verify final grade classification against statutory QCOs.",
    "findstd.form_title": "Product Specification Form",
    "findstd.form_subtitle":
      "Provide as many details as possible for precise standard matching.",
    "findstd.field_product": "Product Name / Type",
    "findstd.field_material": "Raw Material Composition",
    "findstd.field_application": "Intended Application / Usage",
    "findstd.field_industry": "Industry / Domain Sector",
    "findstd.field_capacity": "Capacity / Size",
    "findstd.field_techspec": "Technical Specifications",
    "findstd.placeholder_product":
      "e.g. Stainless steel water bottle, PVC cable, TMT bar",
    "findstd.placeholder_material": "e.g. SS 304, Aluminium alloy",
    "findstd.placeholder_application":
      "e.g. Drinking water storage, building construction",
    "findstd.placeholder_industry":
      "e.g. Metallurgical, Food & Agriculture, Civil",
    "findstd.placeholder_capacity": "e.g. 750 ml, 1.1kV, 12mm",
    "findstd.placeholder_techspec":
      "e.g. Voltage rating 1.1kV, double wall insulation",
    "findstd.btn_evaluate": "Evaluate Applicable Standards",
    "findstd.btn_clear": "Clear",
    "findstd.btn_sample": "Run Sample Evaluation",
    "findstd.results_title": "Evaluated Indian Standards",
    "findstd.results_complete": "Grounded Assessment Completed",
    "findstd.loading_msg": "Evaluating Product-to-Standard Scope...",
    "findstd.loading_sub":
      "Scanning Gazette notifications and material grade parameters...",
    "findstd.empty_title": "No Profile Evaluated Yet",
    "findstd.empty_desc":
      "Fill in the product specification form and click Evaluate.",
    "testing.badge": "Statutory Testing Schedules",
    "testing.title": "Indian Standards Testing Requirements",
    "testing.subtitle":
      "Inspect mandatory routine tests, acceptance criteria, and sampling rules.",
    "testing.filter_placeholder":
      "Filter by Standard Number (e.g. IS 17526, IS 10500)...",
    "testing.btn_filter": "Filter Tests",
    "testing.btn_showall": "Show All Tests",
    "testing.loading_msg":
      "Retrieving Testing Clauses & Acceptance Parameters...",
    "testing.loading_sub":
      "Cross-referencing laboratory test methods and sampling frequencies...",
    "testing.empty_title": "No Testing Requirements Found",
    "testing.empty_desc": "Try searching with IS 17526, IS 10500, or IS 1786.",
    "labs.badge": "Accredited Testing Infrastructure",
    "labs.title": "Find a BIS Recognized Laboratory",
    "labs.subtitle":
      "Search NABL and BIS recognized testing labs across Indian states.",
    "labs.search_placeholder":
      "Search by Indian Standard (e.g. IS 17526, IS 14543)...",
    "labs.btn_filter": "Filter Labs",
    "labs.filter_state": "State:",
    "labs.filter_allstates": "All States",
    "labs.loading_msg": "Locating Recognized Testing Laboratories...",
    "labs.loading_sub": "Matching accredited testing parameters...",
    "labs.empty_title": "No Laboratories Found",
    "labs.empty_desc":
      "Try removing the standard filter or choosing All States.",
    "labs.empty_action": "View All Laboratories",
    "hallmarking.badge": "Precious Metals Purity Assurance",
    "hallmarking.title_prefix": "Gold & Silver",
    "hallmarking.title_highlight": "Hallmarking Assistant",
    "hallmarking.subtitle":
      "Understand fineness grades, verify HUID codes, locate hallmarking centres.",
    "hallmarking.mandate_badge": "BIS Hallmarking Mandate",
    "hallmarking.mandate_desc":
      "Mandatory hallmarking operative across notified districts.",
    "hallmarking.3marks_title": "The 3 Mandatory Marks on Gold Jewellery",
    "hallmarking.3marks_note": "Operative since July 2021",
    "hallmarking.verify_tag": "Consumer Verification Tool",
    "hallmarking.verify_title": "Verify 6-Digit Alphanumeric HUID Structure",
    "hallmarking.verify_subtitle":
      "Test any 6-digit HUID code before buying jewellery.",
    "hallmarking.verify_placeholder": "Enter 6-character HUID (e.g. A1B2C3)",
    "hallmarking.btn_validate": "Validate Format",
    "hallmarking.verify_howto": "How to verify on BIS Care App:",
    "hallmarking.verify_safety": "Consumer Safety & Rights Tips:",
    "hallmarking.grades_title":
      "Official Gold & Silver Fineness Grades (IS 1417 & IS 2112)",
    "hallmarking.comp_badge": "Statutory 2X Compensation Policy",
    "hallmarking.comp_title": "Consumer Protection Guarantee",
    "hallmarking.loading_msg":
      "Loading Hallmarking Standards & Fineness Schedules...",
    "hallmarking.loading_sub":
      "Retrieving IS 1417 and IS 2112 statutory markings...",
    "reports.badge": "Decision Support Deliverable",
    "reports.title": "BIS Compliance Roadmap Report",
    "reports.btn_print": "Print / Save as PDF",
    "reports.doc_header": "Government Compliance Assessment Document",
    "reports.doc_title": "BIS Product Compliance & Conformity Roadmap",
    "reports.section1": "1. Target Product Profile",
    "reports.label_product": "Product Evaluated:",
    "reports.label_primarystd": "Primary Applicable Standard:",
    "reports.section2": "2. Applicable Indian Standards & QCO Mandates",
    "reports.tag_mandatory": "Mandatory",
    "reports.label_regulatory": "Regulatory Notification:",
    "reports.section3": "3. Applicable BIS Certification Scheme",
    "reports.label_validity": "Validity:",
    "reports.label_surveillance": "Surveillance:",
    "reports.section4": "4. Mandatory Testing Requirements",
    "reports.col_test": "Test Parameter",
    "reports.col_clause": "Standard Clause",
    "reports.col_type": "Type",
    "reports.col_sampling": "Sampling Rule",
    "reports.section5": "5. Recommended Testing Laboratories",
    "reports.section6": "6. Statutory Documentation Checklist",
    "reports.section7": "Key Statutory Compliance Pitfalls:",
    "reports.disclaimer_title": "Authoritative Compliance Notice:",
    "reports.loading_msg": "Synthesizing BIS Compliance Assessment Report...",
    "reports.loading_sub":
      "Compiling applicable standards, testing schedules, and statutory evidence...",
    "certification.badge": "BIS Conformity Assessment Schemes",
    "certification.title": "Certification Schemes & Compliance Roadmap",
    "certification.subtitle":
      "Understand statutory conformity schemes, factory audits, and licence grant procedures.",
    "certification.btn_report": "Generate Full Compliance Report",
    "certification.active_product": "Active Product Roadmap:",
    "certification.btn_change": "Change Product Profile →",
    "certification.roadmap_title":
      "Interactive Step-by-Step Certification Journey",
    "certification.phases": "Phases",
    "certification.details_tag": "Scheme Details",
    "certification.docs_title": "Statutory Documents Required:",
    "certification.fee_title": "Fee Structure:",
    "certification.validity": "Validity:",
    "certification.surveillance": "Surveillance:",
    "certification.link_official": "Official Manakonline / CRS Portal",
    "certification.loading_msg": "Loading Certification Scheme Requirements...",
    "certification.loading_sub":
      "Compiling documentation checklists and audit schedules...",
    "consumer.badge": "Citizen & Consumer Protection",
    "consumer.title_prefix": "Consumer Safety &",
    "consumer.title_highlight": "ISI Mark Verification Hub",
    "consumer.subtitle":
      "Verify ISI Mark CM/L licence numbers, detect counterfeit markings, access grievance channels.",
    "consumer.helpline_badge": "Toll-Free Consumer Helpline",
    "consumer.helpline_number": "1800-11-4000",
    "consumer.verify_tag": "Licence Authentication",
    "consumer.verify_title": "Verify ISI Mark CM/L Number",
    "consumer.verify_subtitle":
      "Enter the 7 or 8-digit numeric licence code beneath the ISI triangular logo.",
    "consumer.verify_placeholder":
      "Enter 7 or 8-digit CM/L Number (e.g. 1454301)",
    "consumer.btn_check": "Check Licence Structure",
    "consumer.checklist_auth": "Authenticity Verification Checklist:",
    "consumer.checklist_fraud": "Red Flag Fraud Indicators:",
    "consumer.link_biscare": "Download Official BIS Care Citizen App",
    "consumer.complaint_title": "How to Lodge a Counterfeit Complaint",
    "consumer.complaint_desc":
      "Submit an anonymous report to BIS Enforcement Branch via the BIS Care App or e-BIS portal.",
    "consumer.categories_title": "Key Mandatory Consumer Categories",
    "consumer.categories_desc":
      "Products that strictly require the ISI Mark before retail sale in India:",
    "consumer.cat_packaged_water": "Packaged Drinking Water",
    "consumer.cat_cement": "Cement",
    "consumer.cat_steel_tmt": "Steel TMT Bars",
    "consumer.cat_pvc_pipes": "PVC Pipes",
    "consumer.cat_electrical": "Electrical Appliances",
    "consumer.cat_food_dairy": "Food & Dairy Products",
    "consumer.cat_lpg": "LPG Cylinders",
    "consumer.cat_gold": "Gold Jewellery",
    "footer.description":
      "AI-Powered Decision-Support Platform for Indian Standards, Certification Schemes, Laboratory Testing, and Hallmarking.",
    "footer.tagline": "Retrieve First → Reason Second → Cite Everything",
    "footer.portals_title": "BIS Portals",
    "footer.ebis": "e-BIS Portal",
    "footer.manakonline": "Manakonline (Scheme I)",
    "footer.crs": "CRS Portal (Electronics)",
    "footer.nabl": "NABL Directory",
    "footer.modules_title": "Core Modules",
    "footer.find_standard": "Find My Standard",
    "footer.certification": "Certification Schemes",
    "footer.testing": "Testing Requirements",
    "footer.labs": "Recognized Labs Finder",
    "footer.hallmarking": "Gold & Silver Hallmarking",
    "footer.legal_title": "Legal & Quality Notice",
    "footer.legal_text":
      "Information provided is grounded in published Indian Standards and Gazette notifications. Formal legal compliance requires certification grant through official BIS portals.",
    "footer.admin_link": "Admin & Evaluation Console →",
    "footer.copyright":
      "BIS Saarthi. Built for Indian Industry, MSMEs & Citizens.",
    "footer.consumer_grievance": "Consumer Grievance",
    "footer.ai_support": "AI Decision Support",
    "prompts.industry.1":
      "I manufacture stainless steel water bottles. Which standard applies?",
    "prompts.industry.2":
      "Do I need BIS certification for Lithium-ion power banks?",
    "prompts.industry.3":
      "What tests are required for TMT steel bars under IS 1786?",
    "prompts.industry.4":
      "What is the factory audit and sample testing process for Scheme-I?",
    "prompts.industry.5":
      "FMCS guidelines for foreign manufacturers exporting to India",
    "prompts.industry.6":
      "Required lab testing equipment for IS 302 electrical appliances",
    "prompts.consumer.1":
      "How do I verify a gold jewellery hallmark with 6-digit HUID?",
    "prompts.consumer.2":
      "How can I check whether an ISI mark on packaged water is genuine?",
    "prompts.consumer.3":
      "How to file a consumer grievance against defective ISI certified goods?",
    "prompts.consumer.4":
      "Difference between BIS Hallmark and 916 purity mark.",
    "prompts.consumer.5": "Is BIS registration mandatory for smart phones?",
    "prompts.consumer.6":
      "How to verify R-number on electronics under CRS scheme?",
    "prompts.student.1":
      "Explain IS 10500 Clause 4.2 drinking water TDS & heavy metal limits",
    "prompts.student.2":
      "Comparative analysis between IS 456 standards and Eurocode 2",
    "prompts.student.3": "What are the latest amendments to NBC 2016?",
    "prompts.student.4":
      "Search technical clauses for tensile and elongation requirements in IS 2062",
    "prompts.student.5":
      "Evolution of energy efficiency and BEE star rating test protocols in IS 1391",
    "prompts.student.6":
      "Standard testing methods for cement compressive strength under IS 4031",
    "prompts.admin.1":
      "What are the active Quality Control Orders (QCOs) in effect?",
    "prompts.admin.2":
      "Audit compliance checklist for BIS recognized testing laboratories",
    "prompts.admin.3":
      "Standards revision roadmap and committee review process",
  },
  [IndianLanguage.NEP]: {
    "nav.standards": "मानकहरू",
    "nav.find_standard": "आफ्नो मानक खोज्नुहोस्",
    "nav.catalogue": "मानक सूची",
    "nav.certification": "प्रमाणीकरण",
    "nav.testing": "परीक्षण",
    "nav.labs": "प्रयोगशालाहरू",
    "nav.hallmark": "हलमार्क",
    "nav.consumer": "उपभोक्ता संरक्षण",
    "nav.reports": "प्रतिवेदनहरू",
    "nav.ask_bis_ai": "BIS AI लाई सोध्नुहोस्",
    "nav.ask_ai": "सोध्नुहोस् AI",
    "hero.title": "भारतीय मानक र BIS सेवाहरूका लागि तपाईंको AI सहायक",
    "hero.subtitle":
      "सही मानक पत्ता लगाउनुहोस्, प्रमाणीकरण प्रक्रियाहरू बुझ्नुहोस्।",
    "hero.select_profile": "आफ्नो प्रोफाइल मोड छान्नुहोस्:",
    "hero.search_placeholder": "उत्पादन मानकहरूको बारेमा सोध्नुहोस्...",
    "hero.ask_ai_btn": "सोध्नुहोस् AI",
    "hero.suggested_queries": "सुझाइएका प्रश्नहरू:",
    "chat.new_session": "+ नयाँ च्याट सत्र",
    "chat.specialized_tools": "BIS विशेष उपकरणहरू",
    "chat.find_standard": "मेरो मानक खोज्नुहोस्",
    "chat.certification_schemes": "प्रमाणीकरण योजनाहरू",
    "chat.testing_requirements": "परीक्षण आवश्यकताहरू",
    "chat.find_lab": "मान्यता प्राप्त ल्याब खोज्नुहोस्",
    "chat.generate_report": "अनुपालन प्रतिवेदन तयार गर्नुहोस्",
    "chat.active_workspace": "सक्रिय कार्यक्षेत्र",
    "chat.current_investigation": "वर्तमान अनुसन्धान",
    "chat.grounded_active": "प्रमाण-आधारित पुनर्प्राप्ति सक्रिय",
    "chat.grounded_desc": "प्रकाशित राजपत्र सूचनाहरूबाट प्रमाणित उत्तरहरू।",
    "chat.conversation_title": "BIS सारथी कुराकानी",
    "chat.mode": "मोड:",
    "chat.language_label": "भाषा:",
    "chat.evidence_panel_btn": "प्रमाण प्यानल",
    "chat.welcome_title": "BIS सारथी — प्रमाण-आधारित निर्णय सहायक",
    "chat.input_placeholder":
      "मानक, प्रमाणीकरण, परीक्षण विधि वा दफाहरूको बारेमा सोध्नुहोस्...",
    "chat.send_btn": "पठाउनुहोस्",
    "chat.answer_language": "उत्तर भाषा",
    "chat.detected_language": "पहिचान गरिएको भाषा",
    "chat.evidence_panel": "आधिकारिक प्रमाण र उद्धरणहरू",
    "chat.confidence": "विश्वसनीयता स्तर",
    "chat.source_freshness": "प्रमाणित स्रोत",
    "chat.searching_status": "BIS भण्डारमा खोज र दफाहरू प्राप्त गरिँदै छ...",
    "chat.traceable_citations": "प्रमाणित आधिकारिक उद्धरणहरू:",
    "chat.copy_answer": "उत्तर प्रतिलिपि गर्नुहोस्",
    "chat.copied": "प्रतिलिपि गरियो",
    "chat.helpful": "उपयोगी उत्तर",
    "chat.not_helpful": "अनुपयोगी",
    "chat.report_citation": "गलत उद्धरण रिपोर्ट गर्नुहोस्",
    "chat.disclaimer":
      "सटीकता ग्यारेन्टी: BIS सारथीले भारतीय मानक अनुसार आधिकारिक जानकारी मात्र दिन्छ।",
    "chat.bis_act_compliant": "BIS ऐन २०१६ अनुरूप",
    "evidence.title": "आधिकारिक प्रमाण र उद्धरणहरू",
    "evidence.indian_standard": "भारतीय मानक",
    "evidence.clause": "दफा:",
    "evidence.page": "पृष्ठ:",
    "evidence.publication": "प्रकाशन मिति:",
    "evidence.relevance": "प्रासंगिकता:",
    "evidence.freshness_notice": "ताजा सूचना:",
    "evidence.verbatim_excerpt": "मूल मानक दफा उद्धरण",
    "evidence.copy_excerpt": "उद्धरण प्रतिलिपि गर्नुहोस्",
    "evidence.copied": "प्रतिलिपि गरियो",
    "evidence.view_source": "आधिकारिक BIS पोर्टलमा स्रोत हेर्नुहोस्",
    "evidence.no_evidence_title": "कुनै प्रमाण उल्लेख गरिएको छैन",
    "evidence.no_evidence_desc":
      "BIS मानक दफाहरू र राजपत्र अंशहरू हेर्न प्रश्न सोध्नुहोस् वा मानक छान्नुहोस्।",
    "common.loading": "BIS RAG इन्जिनद्वारा उत्तर तयार हुँदैछ...",
    "common.error": "प्रक्रिया गर्न सकिएन। कृपया जडान जाँच गर्नुहोस्।",

    "header.subtitle": "Indian Standards Intelligence",
    "home.how_subtitle_prefix": "Strict adherence to",
    "home.how_subtitle_bold":
      '"Retrieve First → Reason Second → Cite Everything"',
    "home.mode_industry": "Industry / MSME",
    "home.mode_consumer": "Consumer",
    "home.mode_student": "Student / Researcher",
    "home.mode_admin": "Admin & Regulatory",
    "home.mode_consumer_placeholder":
      "Check gold hallmark HUID, verify ISI mark...",
    "home.mode_student_placeholder":
      "Search standard clauses, comparative analysis...",
    "home.mode_admin_placeholder":
      "Search standards, schemes, reports, or guidelines...",
    "home.features_title": "Bureau of Indian Standards Intelligence",
    "home.features_subtitle":
      "Structured modules for manufacturers, compliance officers, consumers.",
    "home.features_find_title": "Find My Standard Workflow",
    "home.features_find_badge": "AI Profiler",
    "home.features_find_tag": "Product Matching",
    "home.features_find_desc":
      "Step-by-step product profiler matching your product to Indian Standards.",
    "home.features_find_action": "Start Profiler →",
    "home.features_cert_title": "Certification Schemes & Roadmap",
    "home.features_cert_badge": "ISI & CRS",
    "home.features_cert_tag": "Audit & FMCS",
    "home.features_cert_desc":
      "Navigate Scheme I (ISI Mark), Scheme II (CRS), Scheme IV, and FMCS.",
    "home.features_cert_action": "Explore Schemes →",
    "home.features_testing_title": "Testing Requirements & Clauses",
    "home.features_testing_badge": "Clauses",
    "home.features_testing_tag": "Sampling Schedules",
    "home.features_testing_desc":
      "Acceptance criteria, sampling rules, and testing equipment from Indian Standards.",
    "home.features_testing_action": "Inspect Test Schedules →",
    "home.features_labs_title": "BIS Recognized Laboratories Finder",
    "home.features_labs_badge": "Lab Network",
    "home.features_labs_tag": "NABL & BIS Facilities",
    "home.features_labs_desc":
      "Filter NABL and BIS recognized labs by IS number, state, and city.",
    "home.features_labs_action": "Locate Accredited Lab →",
    "home.features_hallmark_title": "Gold & Silver Hallmarking Assistant",
    "home.features_hallmark_badge": "HUID Check",
    "home.features_hallmark_tag": "Purity & Assaying",
    "home.features_hallmark_desc":
      "Verify 6-digit HUID codes and understand gold/silver purity grades.",
    "home.features_hallmark_action": "Hallmarking Guidance →",
    "home.features_consumer_title": "Consumer Protection & ISI Check",
    "home.features_consumer_badge": "Verify & Report",
    "home.features_consumer_tag": "Grievance Redressal",
    "home.features_consumer_desc":
      "Verify ISI Mark CM/L licence numbers, spot counterfeits.",
    "home.features_consumer_action": "Consumer Hub →",
    "home.how_title": "How BIS Saarthi Works",
    "home.how_badge": "Architecture & Verification Pipeline",
    "home.how_step1_title": "Ask Query",
    "home.how_step1_desc":
      "Query in English, Hindi, or any of 22 Scheduled Indian Languages.",
    "home.how_step2_title": "Retrieve",
    "home.how_step2_desc":
      "Hybrid BM25 + Vector semantic search across BIS repository.",
    "home.how_step3_title": "Verify",
    "home.how_step3_desc":
      "Cross-encoder reranking & source freshness verification.",
    "home.how_step4_title": "Explain",
    "home.how_step4_desc":
      "Clear plain-language guidance distinguished from statutory clauses.",
    "home.how_step5_title": "Cite",
    "home.how_step5_desc":
      "Every claim traceable to standard number, clause, page, and link.",
    "home.trust_badge": "Zero Hallucination Operational Standard",
    "home.trust_title": "Trusted by MSMEs, Compliance Teams & Citizens",
    "home.trust_desc":
      "BIS Saarthi never invents Indian Standard numbers, test clauses, or lab recognition statuses.",
    "home.trust_action": "Launch AI Workspace →",
    "standards.badge": "Bureau of Indian Standards Repository",
    "standards.title": "Indian Standards Directory & Search",
    "standards.subtitle":
      "Search authoritative Indian Standards, mandatory QCOs, and testing clause schedules.",
    "standards.search_placeholder": "Search by IS number or keyword...",
    "standards.search_btn": "Search",
    "standards.filter_division": "Division:",
    "standards.filter_all": "All Divisions",
    "standards.filter_mandatory": "Mandatory QCO Only",
    "standards.div_mech": "Mechanical Engineering",
    "standards.div_civil": "Civil Engineering",
    "standards.div_electro": "Electrotechnical",
    "standards.div_met": "Metallurgical Engineering",
    "standards.div_food": "Food and Agriculture",
    "standards.loading_msg": "Retrieving Standards from BIS Repository...",
    "standards.loading_sub":
      "Applying division filters and QCO regulatory scopes...",
    "standards.empty_title": "No Indian Standards Found",
    "standards.empty_desc":
      "Try broadening your search query or reset the filters.",
    "standards.empty_action": "Reset Filters",
    "findstd.badge": "AI Product Scope Profiler",
    "findstd.title_prefix": "Find Applicable",
    "findstd.title_highlight": "Indian Standard",
    "findstd.subtitle":
      "Input product specifications and get matched Indian Standards.",
    "findstd.anti_badge": "Anti-Speculation Standard",
    "findstd.anti_desc":
      "Verify final grade classification against statutory QCOs.",
    "findstd.form_title": "Product Specification Form",
    "findstd.form_subtitle":
      "Provide as many details as possible for precise standard matching.",
    "findstd.field_product": "Product Name / Type",
    "findstd.field_material": "Raw Material Composition",
    "findstd.field_application": "Intended Application / Usage",
    "findstd.field_industry": "Industry / Domain Sector",
    "findstd.field_capacity": "Capacity / Size",
    "findstd.field_techspec": "Technical Specifications",
    "findstd.placeholder_product":
      "e.g. Stainless steel water bottle, PVC cable, TMT bar",
    "findstd.placeholder_material": "e.g. SS 304, Aluminium alloy",
    "findstd.placeholder_application":
      "e.g. Drinking water storage, building construction",
    "findstd.placeholder_industry":
      "e.g. Metallurgical, Food & Agriculture, Civil",
    "findstd.placeholder_capacity": "e.g. 750 ml, 1.1kV, 12mm",
    "findstd.placeholder_techspec":
      "e.g. Voltage rating 1.1kV, double wall insulation",
    "findstd.btn_evaluate": "Evaluate Applicable Standards",
    "findstd.btn_clear": "Clear",
    "findstd.btn_sample": "Run Sample Evaluation",
    "findstd.results_title": "Evaluated Indian Standards",
    "findstd.results_complete": "Grounded Assessment Completed",
    "findstd.loading_msg": "Evaluating Product-to-Standard Scope...",
    "findstd.loading_sub":
      "Scanning Gazette notifications and material grade parameters...",
    "findstd.empty_title": "No Profile Evaluated Yet",
    "findstd.empty_desc":
      "Fill in the product specification form and click Evaluate.",
    "testing.badge": "Statutory Testing Schedules",
    "testing.title": "Indian Standards Testing Requirements",
    "testing.subtitle":
      "Inspect mandatory routine tests, acceptance criteria, and sampling rules.",
    "testing.filter_placeholder":
      "Filter by Standard Number (e.g. IS 17526, IS 10500)...",
    "testing.btn_filter": "Filter Tests",
    "testing.btn_showall": "Show All Tests",
    "testing.loading_msg":
      "Retrieving Testing Clauses & Acceptance Parameters...",
    "testing.loading_sub":
      "Cross-referencing laboratory test methods and sampling frequencies...",
    "testing.empty_title": "No Testing Requirements Found",
    "testing.empty_desc": "Try searching with IS 17526, IS 10500, or IS 1786.",
    "labs.badge": "Accredited Testing Infrastructure",
    "labs.title": "Find a BIS Recognized Laboratory",
    "labs.subtitle":
      "Search NABL and BIS recognized testing labs across Indian states.",
    "labs.search_placeholder":
      "Search by Indian Standard (e.g. IS 17526, IS 14543)...",
    "labs.btn_filter": "Filter Labs",
    "labs.filter_state": "State:",
    "labs.filter_allstates": "All States",
    "labs.loading_msg": "Locating Recognized Testing Laboratories...",
    "labs.loading_sub": "Matching accredited testing parameters...",
    "labs.empty_title": "No Laboratories Found",
    "labs.empty_desc":
      "Try removing the standard filter or choosing All States.",
    "labs.empty_action": "View All Laboratories",
    "hallmarking.badge": "Precious Metals Purity Assurance",
    "hallmarking.title_prefix": "Gold & Silver",
    "hallmarking.title_highlight": "Hallmarking Assistant",
    "hallmarking.subtitle":
      "Understand fineness grades, verify HUID codes, locate hallmarking centres.",
    "hallmarking.mandate_badge": "BIS Hallmarking Mandate",
    "hallmarking.mandate_desc":
      "Mandatory hallmarking operative across notified districts.",
    "hallmarking.3marks_title": "The 3 Mandatory Marks on Gold Jewellery",
    "hallmarking.3marks_note": "Operative since July 2021",
    "hallmarking.verify_tag": "Consumer Verification Tool",
    "hallmarking.verify_title": "Verify 6-Digit Alphanumeric HUID Structure",
    "hallmarking.verify_subtitle":
      "Test any 6-digit HUID code before buying jewellery.",
    "hallmarking.verify_placeholder": "Enter 6-character HUID (e.g. A1B2C3)",
    "hallmarking.btn_validate": "Validate Format",
    "hallmarking.verify_howto": "How to verify on BIS Care App:",
    "hallmarking.verify_safety": "Consumer Safety & Rights Tips:",
    "hallmarking.grades_title":
      "Official Gold & Silver Fineness Grades (IS 1417 & IS 2112)",
    "hallmarking.comp_badge": "Statutory 2X Compensation Policy",
    "hallmarking.comp_title": "Consumer Protection Guarantee",
    "hallmarking.loading_msg":
      "Loading Hallmarking Standards & Fineness Schedules...",
    "hallmarking.loading_sub":
      "Retrieving IS 1417 and IS 2112 statutory markings...",
    "reports.badge": "Decision Support Deliverable",
    "reports.title": "BIS Compliance Roadmap Report",
    "reports.btn_print": "Print / Save as PDF",
    "reports.doc_header": "Government Compliance Assessment Document",
    "reports.doc_title": "BIS Product Compliance & Conformity Roadmap",
    "reports.section1": "1. Target Product Profile",
    "reports.label_product": "Product Evaluated:",
    "reports.label_primarystd": "Primary Applicable Standard:",
    "reports.section2": "2. Applicable Indian Standards & QCO Mandates",
    "reports.tag_mandatory": "Mandatory",
    "reports.label_regulatory": "Regulatory Notification:",
    "reports.section3": "3. Applicable BIS Certification Scheme",
    "reports.label_validity": "Validity:",
    "reports.label_surveillance": "Surveillance:",
    "reports.section4": "4. Mandatory Testing Requirements",
    "reports.col_test": "Test Parameter",
    "reports.col_clause": "Standard Clause",
    "reports.col_type": "Type",
    "reports.col_sampling": "Sampling Rule",
    "reports.section5": "5. Recommended Testing Laboratories",
    "reports.section6": "6. Statutory Documentation Checklist",
    "reports.section7": "Key Statutory Compliance Pitfalls:",
    "reports.disclaimer_title": "Authoritative Compliance Notice:",
    "reports.loading_msg": "Synthesizing BIS Compliance Assessment Report...",
    "reports.loading_sub":
      "Compiling applicable standards, testing schedules, and statutory evidence...",
    "certification.badge": "BIS Conformity Assessment Schemes",
    "certification.title": "Certification Schemes & Compliance Roadmap",
    "certification.subtitle":
      "Understand statutory conformity schemes, factory audits, and licence grant procedures.",
    "certification.btn_report": "Generate Full Compliance Report",
    "certification.active_product": "Active Product Roadmap:",
    "certification.btn_change": "Change Product Profile →",
    "certification.roadmap_title":
      "Interactive Step-by-Step Certification Journey",
    "certification.phases": "Phases",
    "certification.details_tag": "Scheme Details",
    "certification.docs_title": "Statutory Documents Required:",
    "certification.fee_title": "Fee Structure:",
    "certification.validity": "Validity:",
    "certification.surveillance": "Surveillance:",
    "certification.link_official": "Official Manakonline / CRS Portal",
    "certification.loading_msg": "Loading Certification Scheme Requirements...",
    "certification.loading_sub":
      "Compiling documentation checklists and audit schedules...",
    "consumer.badge": "Citizen & Consumer Protection",
    "consumer.title_prefix": "Consumer Safety &",
    "consumer.title_highlight": "ISI Mark Verification Hub",
    "consumer.subtitle":
      "Verify ISI Mark CM/L licence numbers, detect counterfeit markings, access grievance channels.",
    "consumer.helpline_badge": "Toll-Free Consumer Helpline",
    "consumer.helpline_number": "1800-11-4000",
    "consumer.verify_tag": "Licence Authentication",
    "consumer.verify_title": "Verify ISI Mark CM/L Number",
    "consumer.verify_subtitle":
      "Enter the 7 or 8-digit numeric licence code beneath the ISI triangular logo.",
    "consumer.verify_placeholder":
      "Enter 7 or 8-digit CM/L Number (e.g. 1454301)",
    "consumer.btn_check": "Check Licence Structure",
    "consumer.checklist_auth": "Authenticity Verification Checklist:",
    "consumer.checklist_fraud": "Red Flag Fraud Indicators:",
    "consumer.link_biscare": "Download Official BIS Care Citizen App",
    "consumer.complaint_title": "How to Lodge a Counterfeit Complaint",
    "consumer.complaint_desc":
      "Submit an anonymous report to BIS Enforcement Branch via the BIS Care App or e-BIS portal.",
    "consumer.categories_title": "Key Mandatory Consumer Categories",
    "consumer.categories_desc":
      "Products that strictly require the ISI Mark before retail sale in India:",
    "consumer.cat_packaged_water": "Packaged Drinking Water",
    "consumer.cat_cement": "Cement",
    "consumer.cat_steel_tmt": "Steel TMT Bars",
    "consumer.cat_pvc_pipes": "PVC Pipes",
    "consumer.cat_electrical": "Electrical Appliances",
    "consumer.cat_food_dairy": "Food & Dairy Products",
    "consumer.cat_lpg": "LPG Cylinders",
    "consumer.cat_gold": "Gold Jewellery",
    "footer.description":
      "AI-Powered Decision-Support Platform for Indian Standards, Certification Schemes, Laboratory Testing, and Hallmarking.",
    "footer.tagline": "Retrieve First → Reason Second → Cite Everything",
    "footer.portals_title": "BIS Portals",
    "footer.ebis": "e-BIS Portal",
    "footer.manakonline": "Manakonline (Scheme I)",
    "footer.crs": "CRS Portal (Electronics)",
    "footer.nabl": "NABL Directory",
    "footer.modules_title": "Core Modules",
    "footer.find_standard": "Find My Standard",
    "footer.certification": "Certification Schemes",
    "footer.testing": "Testing Requirements",
    "footer.labs": "Recognized Labs Finder",
    "footer.hallmarking": "Gold & Silver Hallmarking",
    "footer.legal_title": "Legal & Quality Notice",
    "footer.legal_text":
      "Information provided is grounded in published Indian Standards and Gazette notifications. Formal legal compliance requires certification grant through official BIS portals.",
    "footer.admin_link": "Admin & Evaluation Console →",
    "footer.copyright":
      "BIS Saarthi. Built for Indian Industry, MSMEs & Citizens.",
    "footer.consumer_grievance": "Consumer Grievance",
    "footer.ai_support": "AI Decision Support",
    "prompts.industry.1":
      "I manufacture stainless steel water bottles. Which standard applies?",
    "prompts.industry.2":
      "Do I need BIS certification for Lithium-ion power banks?",
    "prompts.industry.3":
      "What tests are required for TMT steel bars under IS 1786?",
    "prompts.industry.4":
      "What is the factory audit and sample testing process for Scheme-I?",
    "prompts.industry.5":
      "FMCS guidelines for foreign manufacturers exporting to India",
    "prompts.industry.6":
      "Required lab testing equipment for IS 302 electrical appliances",
    "prompts.consumer.1":
      "How do I verify a gold jewellery hallmark with 6-digit HUID?",
    "prompts.consumer.2":
      "How can I check whether an ISI mark on packaged water is genuine?",
    "prompts.consumer.3":
      "How to file a consumer grievance against defective ISI certified goods?",
    "prompts.consumer.4":
      "Difference between BIS Hallmark and 916 purity mark.",
    "prompts.consumer.5": "Is BIS registration mandatory for smart phones?",
    "prompts.consumer.6":
      "How to verify R-number on electronics under CRS scheme?",
    "prompts.student.1":
      "Explain IS 10500 Clause 4.2 drinking water TDS & heavy metal limits",
    "prompts.student.2":
      "Comparative analysis between IS 456 standards and Eurocode 2",
    "prompts.student.3": "What are the latest amendments to NBC 2016?",
    "prompts.student.4":
      "Search technical clauses for tensile and elongation requirements in IS 2062",
    "prompts.student.5":
      "Evolution of energy efficiency and BEE star rating test protocols in IS 1391",
    "prompts.student.6":
      "Standard testing methods for cement compressive strength under IS 4031",
    "prompts.admin.1":
      "What are the active Quality Control Orders (QCOs) in effect?",
    "prompts.admin.2":
      "Audit compliance checklist for BIS recognized testing laboratories",
    "prompts.admin.3":
      "Standards revision roadmap and committee review process",
  },
  [IndianLanguage.KOK]: {
    "nav.standards": "मानकां",
    "nav.find_standard": "तुमचें मानक सोधात",
    "nav.catalogue": "मानक सूची",
    "nav.certification": "प्रमाणन",
    "nav.testing": "चांचणी",
    "nav.labs": "प्रयोगशाळा",
    "nav.hallmark": "हॉलमार्क",
    "nav.consumer": "ग्राहक संरक्षण",
    "nav.reports": "अहवाल",
    "nav.ask_bis_ai": "BIS AI विचारात",
    "nav.ask_ai": "विचारात AI",
    "hero.title": "भारतीय मानकां आनी बीआयएस सेवां खातीर तुमचो एआय सहाय्यक",
    "hero.subtitle":
      "योग्य मानक सोधात, प्रमाणन प्रक्रिया समजात आनी हॉलमार्किंग तपासात।",
    "hero.select_profile": "तुमचो प्रोफाइल मोड निवडा:",
    "hero.search_placeholder": "उत्पादन मानकां विशीं विचारात...",
    "hero.ask_ai_btn": "विचारात AI",
    "hero.suggested_queries": "सुचयिल्ले प्रस्न:",
    "chat.new_session": "+ नवें चॅट सत्र",
    "chat.specialized_tools": "बीआयएस खाशेल्यो साधनां",
    "chat.find_standard": "माझें मानक सोधात",
    "chat.certification_schemes": "प्रमाणन येवजण्यो",
    "chat.testing_requirements": "चांचणी गरजेचीं",
    "chat.find_lab": "मान्यताप्राप्त लॅब सोधात",
    "chat.generate_report": "अनुपालन अहवाल तयार करात",
    "chat.active_workspace": "सक्रिय कार्यक्षेत्र",
    "chat.current_investigation": "सद्याचें संशोधन",
    "chat.grounded_active": "पुरावो-आधारित सोद सक्रिय",
    "chat.grounded_desc": "प्रकाशीत राजपत्र सुचनांतल्यान तपाशिल्लीं जापो.",
    "chat.conversation_title": "बीआयएस सारथी संवाद",
    "chat.mode": "मोड:",
    "chat.language_label": "भाषा:",
    "chat.evidence_panel_btn": "पुरावो पॅनेल",
    "chat.welcome_title": "बीआयएस सारथी — पुरावो-समर्थित निर्णय सहाय्यक",
    "chat.input_placeholder":
      "मानकां, प्रमाणन, चांचणी पद्दती वा कलमां विशीं विचारात...",
    "chat.send_btn": "धाडात",
    "chat.answer_language": "जापेची भाषा",
    "chat.detected_language": "ओळखिल्ली भाषा",
    "chat.evidence_panel": "अधिकृत पुरावो आनी संदर्भ",
    "chat.confidence": "विश्वासार्हता पातळी",
    "chat.source_freshness": "तपाशिल्लो स्त्रोत",
    "chat.searching_status": "बीआयएस भांडारांत सोद आनी कलमां काडटात...",
    "chat.traceable_citations": "तपासणीयोग्य अधिकृत संदर्भ:",
    "chat.copy_answer": "जाप कॉपी करात",
    "chat.copied": "कॉपी केली",
    "chat.helpful": "उपेगाची जाप",
    "chat.not_helpful": "उपकार पडना",
    "chat.report_citation": "चुकीच्या संदर्भाची तक्रार करात",
    "chat.disclaimer": "अचूकता हमी: बीआयएस सारथी फकत अधिकृत मानकां दाखयता।",
    "chat.bis_act_compliant": "बीआयएस कायदो २०१६ प्रमाण",
    "evidence.title": "अधिकृत पुरावो आनी संदर्भ",
    "evidence.indian_standard": "भारतीय मानक",
    "evidence.clause": "कलम:",
    "evidence.page": "पान:",
    "evidence.publication": "प्रकाशन तारीख:",
    "evidence.relevance": "सुसंगतता:",
    "evidence.freshness_notice": "ताजी सुचोवणी:",
    "evidence.verbatim_excerpt": "मूळ मानक कलम संदर्भ",
    "evidence.copy_excerpt": "संदर्भ कॉपी करात",
    "evidence.copied": "कॉपी केली",
    "evidence.view_source": "अधिकृत BIS पोर्टलाचेर पळयात",
    "evidence.no_evidence_title": "कसलोच पुरावो उल्लेखीला ना",
    "evidence.no_evidence_desc":
      "BIS मानक कलमां तपासपाक प्रस्न विचारात वा मानक निवडात.",
    "common.loading": "जाप तयार जाता...",
    "common.error": "प्रक्रिया करपाक जमना जाली।",

    "header.subtitle": "Indian Standards Intelligence",
    "home.how_subtitle_prefix": "Strict adherence to",
    "home.how_subtitle_bold":
      '"Retrieve First → Reason Second → Cite Everything"',
    "home.mode_industry": "Industry / MSME",
    "home.mode_consumer": "Consumer",
    "home.mode_student": "Student / Researcher",
    "home.mode_admin": "Admin & Regulatory",
    "home.mode_consumer_placeholder":
      "Check gold hallmark HUID, verify ISI mark...",
    "home.mode_student_placeholder":
      "Search standard clauses, comparative analysis...",
    "home.mode_admin_placeholder":
      "Search standards, schemes, reports, or guidelines...",
    "home.features_title": "Bureau of Indian Standards Intelligence",
    "home.features_subtitle":
      "Structured modules for manufacturers, compliance officers, consumers.",
    "home.features_find_title": "Find My Standard Workflow",
    "home.features_find_badge": "AI Profiler",
    "home.features_find_tag": "Product Matching",
    "home.features_find_desc":
      "Step-by-step product profiler matching your product to Indian Standards.",
    "home.features_find_action": "Start Profiler →",
    "home.features_cert_title": "Certification Schemes & Roadmap",
    "home.features_cert_badge": "ISI & CRS",
    "home.features_cert_tag": "Audit & FMCS",
    "home.features_cert_desc":
      "Navigate Scheme I (ISI Mark), Scheme II (CRS), Scheme IV, and FMCS.",
    "home.features_cert_action": "Explore Schemes →",
    "home.features_testing_title": "Testing Requirements & Clauses",
    "home.features_testing_badge": "Clauses",
    "home.features_testing_tag": "Sampling Schedules",
    "home.features_testing_desc":
      "Acceptance criteria, sampling rules, and testing equipment from Indian Standards.",
    "home.features_testing_action": "Inspect Test Schedules →",
    "home.features_labs_title": "BIS Recognized Laboratories Finder",
    "home.features_labs_badge": "Lab Network",
    "home.features_labs_tag": "NABL & BIS Facilities",
    "home.features_labs_desc":
      "Filter NABL and BIS recognized labs by IS number, state, and city.",
    "home.features_labs_action": "Locate Accredited Lab →",
    "home.features_hallmark_title": "Gold & Silver Hallmarking Assistant",
    "home.features_hallmark_badge": "HUID Check",
    "home.features_hallmark_tag": "Purity & Assaying",
    "home.features_hallmark_desc":
      "Verify 6-digit HUID codes and understand gold/silver purity grades.",
    "home.features_hallmark_action": "Hallmarking Guidance →",
    "home.features_consumer_title": "Consumer Protection & ISI Check",
    "home.features_consumer_badge": "Verify & Report",
    "home.features_consumer_tag": "Grievance Redressal",
    "home.features_consumer_desc":
      "Verify ISI Mark CM/L licence numbers, spot counterfeits.",
    "home.features_consumer_action": "Consumer Hub →",
    "home.how_title": "How BIS Saarthi Works",
    "home.how_badge": "Architecture & Verification Pipeline",
    "home.how_step1_title": "Ask Query",
    "home.how_step1_desc":
      "Query in English, Hindi, or any of 22 Scheduled Indian Languages.",
    "home.how_step2_title": "Retrieve",
    "home.how_step2_desc":
      "Hybrid BM25 + Vector semantic search across BIS repository.",
    "home.how_step3_title": "Verify",
    "home.how_step3_desc":
      "Cross-encoder reranking & source freshness verification.",
    "home.how_step4_title": "Explain",
    "home.how_step4_desc":
      "Clear plain-language guidance distinguished from statutory clauses.",
    "home.how_step5_title": "Cite",
    "home.how_step5_desc":
      "Every claim traceable to standard number, clause, page, and link.",
    "home.trust_badge": "Zero Hallucination Operational Standard",
    "home.trust_title": "Trusted by MSMEs, Compliance Teams & Citizens",
    "home.trust_desc":
      "BIS Saarthi never invents Indian Standard numbers, test clauses, or lab recognition statuses.",
    "home.trust_action": "Launch AI Workspace →",
    "standards.badge": "Bureau of Indian Standards Repository",
    "standards.title": "Indian Standards Directory & Search",
    "standards.subtitle":
      "Search authoritative Indian Standards, mandatory QCOs, and testing clause schedules.",
    "standards.search_placeholder": "Search by IS number or keyword...",
    "standards.search_btn": "Search",
    "standards.filter_division": "Division:",
    "standards.filter_all": "All Divisions",
    "standards.filter_mandatory": "Mandatory QCO Only",
    "standards.div_mech": "Mechanical Engineering",
    "standards.div_civil": "Civil Engineering",
    "standards.div_electro": "Electrotechnical",
    "standards.div_met": "Metallurgical Engineering",
    "standards.div_food": "Food and Agriculture",
    "standards.loading_msg": "Retrieving Standards from BIS Repository...",
    "standards.loading_sub":
      "Applying division filters and QCO regulatory scopes...",
    "standards.empty_title": "No Indian Standards Found",
    "standards.empty_desc":
      "Try broadening your search query or reset the filters.",
    "standards.empty_action": "Reset Filters",
    "findstd.badge": "AI Product Scope Profiler",
    "findstd.title_prefix": "Find Applicable",
    "findstd.title_highlight": "Indian Standard",
    "findstd.subtitle":
      "Input product specifications and get matched Indian Standards.",
    "findstd.anti_badge": "Anti-Speculation Standard",
    "findstd.anti_desc":
      "Verify final grade classification against statutory QCOs.",
    "findstd.form_title": "Product Specification Form",
    "findstd.form_subtitle":
      "Provide as many details as possible for precise standard matching.",
    "findstd.field_product": "Product Name / Type",
    "findstd.field_material": "Raw Material Composition",
    "findstd.field_application": "Intended Application / Usage",
    "findstd.field_industry": "Industry / Domain Sector",
    "findstd.field_capacity": "Capacity / Size",
    "findstd.field_techspec": "Technical Specifications",
    "findstd.placeholder_product":
      "e.g. Stainless steel water bottle, PVC cable, TMT bar",
    "findstd.placeholder_material": "e.g. SS 304, Aluminium alloy",
    "findstd.placeholder_application":
      "e.g. Drinking water storage, building construction",
    "findstd.placeholder_industry":
      "e.g. Metallurgical, Food & Agriculture, Civil",
    "findstd.placeholder_capacity": "e.g. 750 ml, 1.1kV, 12mm",
    "findstd.placeholder_techspec":
      "e.g. Voltage rating 1.1kV, double wall insulation",
    "findstd.btn_evaluate": "Evaluate Applicable Standards",
    "findstd.btn_clear": "Clear",
    "findstd.btn_sample": "Run Sample Evaluation",
    "findstd.results_title": "Evaluated Indian Standards",
    "findstd.results_complete": "Grounded Assessment Completed",
    "findstd.loading_msg": "Evaluating Product-to-Standard Scope...",
    "findstd.loading_sub":
      "Scanning Gazette notifications and material grade parameters...",
    "findstd.empty_title": "No Profile Evaluated Yet",
    "findstd.empty_desc":
      "Fill in the product specification form and click Evaluate.",
    "testing.badge": "Statutory Testing Schedules",
    "testing.title": "Indian Standards Testing Requirements",
    "testing.subtitle":
      "Inspect mandatory routine tests, acceptance criteria, and sampling rules.",
    "testing.filter_placeholder":
      "Filter by Standard Number (e.g. IS 17526, IS 10500)...",
    "testing.btn_filter": "Filter Tests",
    "testing.btn_showall": "Show All Tests",
    "testing.loading_msg":
      "Retrieving Testing Clauses & Acceptance Parameters...",
    "testing.loading_sub":
      "Cross-referencing laboratory test methods and sampling frequencies...",
    "testing.empty_title": "No Testing Requirements Found",
    "testing.empty_desc": "Try searching with IS 17526, IS 10500, or IS 1786.",
    "labs.badge": "Accredited Testing Infrastructure",
    "labs.title": "Find a BIS Recognized Laboratory",
    "labs.subtitle":
      "Search NABL and BIS recognized testing labs across Indian states.",
    "labs.search_placeholder":
      "Search by Indian Standard (e.g. IS 17526, IS 14543)...",
    "labs.btn_filter": "Filter Labs",
    "labs.filter_state": "State:",
    "labs.filter_allstates": "All States",
    "labs.loading_msg": "Locating Recognized Testing Laboratories...",
    "labs.loading_sub": "Matching accredited testing parameters...",
    "labs.empty_title": "No Laboratories Found",
    "labs.empty_desc":
      "Try removing the standard filter or choosing All States.",
    "labs.empty_action": "View All Laboratories",
    "hallmarking.badge": "Precious Metals Purity Assurance",
    "hallmarking.title_prefix": "Gold & Silver",
    "hallmarking.title_highlight": "Hallmarking Assistant",
    "hallmarking.subtitle":
      "Understand fineness grades, verify HUID codes, locate hallmarking centres.",
    "hallmarking.mandate_badge": "BIS Hallmarking Mandate",
    "hallmarking.mandate_desc":
      "Mandatory hallmarking operative across notified districts.",
    "hallmarking.3marks_title": "The 3 Mandatory Marks on Gold Jewellery",
    "hallmarking.3marks_note": "Operative since July 2021",
    "hallmarking.verify_tag": "Consumer Verification Tool",
    "hallmarking.verify_title": "Verify 6-Digit Alphanumeric HUID Structure",
    "hallmarking.verify_subtitle":
      "Test any 6-digit HUID code before buying jewellery.",
    "hallmarking.verify_placeholder": "Enter 6-character HUID (e.g. A1B2C3)",
    "hallmarking.btn_validate": "Validate Format",
    "hallmarking.verify_howto": "How to verify on BIS Care App:",
    "hallmarking.verify_safety": "Consumer Safety & Rights Tips:",
    "hallmarking.grades_title":
      "Official Gold & Silver Fineness Grades (IS 1417 & IS 2112)",
    "hallmarking.comp_badge": "Statutory 2X Compensation Policy",
    "hallmarking.comp_title": "Consumer Protection Guarantee",
    "hallmarking.loading_msg":
      "Loading Hallmarking Standards & Fineness Schedules...",
    "hallmarking.loading_sub":
      "Retrieving IS 1417 and IS 2112 statutory markings...",
    "reports.badge": "Decision Support Deliverable",
    "reports.title": "BIS Compliance Roadmap Report",
    "reports.btn_print": "Print / Save as PDF",
    "reports.doc_header": "Government Compliance Assessment Document",
    "reports.doc_title": "BIS Product Compliance & Conformity Roadmap",
    "reports.section1": "1. Target Product Profile",
    "reports.label_product": "Product Evaluated:",
    "reports.label_primarystd": "Primary Applicable Standard:",
    "reports.section2": "2. Applicable Indian Standards & QCO Mandates",
    "reports.tag_mandatory": "Mandatory",
    "reports.label_regulatory": "Regulatory Notification:",
    "reports.section3": "3. Applicable BIS Certification Scheme",
    "reports.label_validity": "Validity:",
    "reports.label_surveillance": "Surveillance:",
    "reports.section4": "4. Mandatory Testing Requirements",
    "reports.col_test": "Test Parameter",
    "reports.col_clause": "Standard Clause",
    "reports.col_type": "Type",
    "reports.col_sampling": "Sampling Rule",
    "reports.section5": "5. Recommended Testing Laboratories",
    "reports.section6": "6. Statutory Documentation Checklist",
    "reports.section7": "Key Statutory Compliance Pitfalls:",
    "reports.disclaimer_title": "Authoritative Compliance Notice:",
    "reports.loading_msg": "Synthesizing BIS Compliance Assessment Report...",
    "reports.loading_sub":
      "Compiling applicable standards, testing schedules, and statutory evidence...",
    "certification.badge": "BIS Conformity Assessment Schemes",
    "certification.title": "Certification Schemes & Compliance Roadmap",
    "certification.subtitle":
      "Understand statutory conformity schemes, factory audits, and licence grant procedures.",
    "certification.btn_report": "Generate Full Compliance Report",
    "certification.active_product": "Active Product Roadmap:",
    "certification.btn_change": "Change Product Profile →",
    "certification.roadmap_title":
      "Interactive Step-by-Step Certification Journey",
    "certification.phases": "Phases",
    "certification.details_tag": "Scheme Details",
    "certification.docs_title": "Statutory Documents Required:",
    "certification.fee_title": "Fee Structure:",
    "certification.validity": "Validity:",
    "certification.surveillance": "Surveillance:",
    "certification.link_official": "Official Manakonline / CRS Portal",
    "certification.loading_msg": "Loading Certification Scheme Requirements...",
    "certification.loading_sub":
      "Compiling documentation checklists and audit schedules...",
    "consumer.badge": "Citizen & Consumer Protection",
    "consumer.title_prefix": "Consumer Safety &",
    "consumer.title_highlight": "ISI Mark Verification Hub",
    "consumer.subtitle":
      "Verify ISI Mark CM/L licence numbers, detect counterfeit markings, access grievance channels.",
    "consumer.helpline_badge": "Toll-Free Consumer Helpline",
    "consumer.helpline_number": "1800-11-4000",
    "consumer.verify_tag": "Licence Authentication",
    "consumer.verify_title": "Verify ISI Mark CM/L Number",
    "consumer.verify_subtitle":
      "Enter the 7 or 8-digit numeric licence code beneath the ISI triangular logo.",
    "consumer.verify_placeholder":
      "Enter 7 or 8-digit CM/L Number (e.g. 1454301)",
    "consumer.btn_check": "Check Licence Structure",
    "consumer.checklist_auth": "Authenticity Verification Checklist:",
    "consumer.checklist_fraud": "Red Flag Fraud Indicators:",
    "consumer.link_biscare": "Download Official BIS Care Citizen App",
    "consumer.complaint_title": "How to Lodge a Counterfeit Complaint",
    "consumer.complaint_desc":
      "Submit an anonymous report to BIS Enforcement Branch via the BIS Care App or e-BIS portal.",
    "consumer.categories_title": "Key Mandatory Consumer Categories",
    "consumer.categories_desc":
      "Products that strictly require the ISI Mark before retail sale in India:",
    "consumer.cat_packaged_water": "Packaged Drinking Water",
    "consumer.cat_cement": "Cement",
    "consumer.cat_steel_tmt": "Steel TMT Bars",
    "consumer.cat_pvc_pipes": "PVC Pipes",
    "consumer.cat_electrical": "Electrical Appliances",
    "consumer.cat_food_dairy": "Food & Dairy Products",
    "consumer.cat_lpg": "LPG Cylinders",
    "consumer.cat_gold": "Gold Jewellery",
    "footer.description":
      "AI-Powered Decision-Support Platform for Indian Standards, Certification Schemes, Laboratory Testing, and Hallmarking.",
    "footer.tagline": "Retrieve First → Reason Second → Cite Everything",
    "footer.portals_title": "BIS Portals",
    "footer.ebis": "e-BIS Portal",
    "footer.manakonline": "Manakonline (Scheme I)",
    "footer.crs": "CRS Portal (Electronics)",
    "footer.nabl": "NABL Directory",
    "footer.modules_title": "Core Modules",
    "footer.find_standard": "Find My Standard",
    "footer.certification": "Certification Schemes",
    "footer.testing": "Testing Requirements",
    "footer.labs": "Recognized Labs Finder",
    "footer.hallmarking": "Gold & Silver Hallmarking",
    "footer.legal_title": "Legal & Quality Notice",
    "footer.legal_text":
      "Information provided is grounded in published Indian Standards and Gazette notifications. Formal legal compliance requires certification grant through official BIS portals.",
    "footer.admin_link": "Admin & Evaluation Console →",
    "footer.copyright":
      "BIS Saarthi. Built for Indian Industry, MSMEs & Citizens.",
    "footer.consumer_grievance": "Consumer Grievance",
    "footer.ai_support": "AI Decision Support",
    "prompts.industry.1":
      "I manufacture stainless steel water bottles. Which standard applies?",
    "prompts.industry.2":
      "Do I need BIS certification for Lithium-ion power banks?",
    "prompts.industry.3":
      "What tests are required for TMT steel bars under IS 1786?",
    "prompts.industry.4":
      "What is the factory audit and sample testing process for Scheme-I?",
    "prompts.industry.5":
      "FMCS guidelines for foreign manufacturers exporting to India",
    "prompts.industry.6":
      "Required lab testing equipment for IS 302 electrical appliances",
    "prompts.consumer.1":
      "How do I verify a gold jewellery hallmark with 6-digit HUID?",
    "prompts.consumer.2":
      "How can I check whether an ISI mark on packaged water is genuine?",
    "prompts.consumer.3":
      "How to file a consumer grievance against defective ISI certified goods?",
    "prompts.consumer.4":
      "Difference between BIS Hallmark and 916 purity mark.",
    "prompts.consumer.5": "Is BIS registration mandatory for smart phones?",
    "prompts.consumer.6":
      "How to verify R-number on electronics under CRS scheme?",
    "prompts.student.1":
      "Explain IS 10500 Clause 4.2 drinking water TDS & heavy metal limits",
    "prompts.student.2":
      "Comparative analysis between IS 456 standards and Eurocode 2",
    "prompts.student.3": "What are the latest amendments to NBC 2016?",
    "prompts.student.4":
      "Search technical clauses for tensile and elongation requirements in IS 2062",
    "prompts.student.5":
      "Evolution of energy efficiency and BEE star rating test protocols in IS 1391",
    "prompts.student.6":
      "Standard testing methods for cement compressive strength under IS 4031",
    "prompts.admin.1":
      "What are the active Quality Control Orders (QCOs) in effect?",
    "prompts.admin.2":
      "Audit compliance checklist for BIS recognized testing laboratories",
    "prompts.admin.3":
      "Standards revision roadmap and committee review process",
  },
  [IndianLanguage.MAI]: {
    "nav.standards": "मानक",
    "nav.find_standard": "अपन मानक खोजू",
    "nav.catalogue": "मानक सूची",
    "nav.certification": "प्रमाणन",
    "nav.testing": "परीक्षण",
    "nav.labs": "प्रयोगशाला",
    "nav.hallmark": "हॉलमार्क",
    "nav.consumer": "उपभोक्ता संरक्षण",
    "nav.reports": "रिपोर्ट",
    "nav.ask_bis_ai": "BIS AI सँ पूछू",
    "nav.ask_ai": "पूछू AI",
    "hero.title": "भारतीय मानक आ बीआईएस सेवा लेल अहाँक एआई सहायक",
    "hero.subtitle":
      "सही मानक खोजू, प्रमाणन प्रक्रिया समझू आ हॉलमार्किंग सत्यापित करू।",
    "hero.select_profile": "अपन प्रोफाइल मोड चुनू:",
    "hero.search_placeholder": "उत्पाद मानकक बारे मे पूछू...",
    "hero.ask_ai_btn": "पूछू AI",
    "hero.suggested_queries": "सुझाओल गेल प्रश्न:",
    "chat.new_session": "+ नव चैट सत्र",
    "chat.specialized_tools": "बीआईएस विशेषज्ञ उपकरण",
    "chat.find_standard": "हमर मानक खोजू",
    "chat.certification_schemes": "प्रमाणन योजना सभ",
    "chat.testing_requirements": "परीक्षण आवश्यकता",
    "chat.find_lab": "मान्यता प्राप्त लैब खोजू",
    "chat.generate_report": "अनुपालन रिपोर्ट बनाउ",
    "chat.active_workspace": "सक्रिय कार्यक्षेत्र",
    "chat.current_investigation": "वर्तमान शोध",
    "chat.grounded_active": "साक्ष्य-आधारित खोज सक्रिय",
    "chat.grounded_desc": "प्रकाशित राजपत्र अधिसूचना सँ सत्यापित उत्तर।",
    "chat.conversation_title": "बीआईएस सारथी संवाद",
    "chat.mode": "मोड:",
    "chat.language_label": "भाषा:",
    "chat.evidence_panel_btn": "साक्ष्य पैनल",
    "chat.welcome_title": "बीआईएस सारथी — प्रमाण-समर्थित निर्णय सहायक",
    "chat.input_placeholder":
      "मानक, प्रमाणन, परीक्षण विधि या धारा सभक बारे मे पूछू...",
    "chat.send_btn": "पठाउ",
    "chat.answer_language": "उत्तरक भाषा",
    "chat.detected_language": "पहचानल गेल भाषा",
    "chat.evidence_panel": "प्रामाणिक साक्ष्य आ उद्धरण",
    "chat.confidence": "विश्वसनीयता स्तर",
    "chat.source_freshness": "सत्यापित स्रोत",
    "chat.searching_status": "बीआईएस संग्रह मे खोज आ धारा निकालल जा रहल अछि...",
    "chat.traceable_citations": "सत्यापन योग्य प्रामाणिक उद्धरण:",
    "chat.copy_answer": "उत्तर कॉपी करू",
    "chat.copied": "कॉपी कएल गेल",
    "chat.helpful": "उपयोगी उत्तर",
    "chat.not_helpful": "अनुपयोगी",
    "chat.report_citation": "गलत उद्धरणक रिपोर्ट करू",
    "chat.disclaimer":
      "सटीकता गारंटी: बीआईएस सारथी केवल भारतीय मानकक आधार पर प्रामाणिक तथ्य दैत अछि।",
    "chat.bis_act_compliant": "बीआईएस अधिनियम २०१६ अनुरूप",
    "evidence.title": "प्रामाणिक साक्ष्य आ उद्धरण",
    "evidence.indian_standard": "भारतीय मानक",
    "evidence.clause": "खंड:",
    "evidence.page": "पृष्ठ:",
    "evidence.publication": "प्रकाशन तिथि:",
    "evidence.relevance": "प्रासंगिकता:",
    "evidence.freshness_notice": "नवीनता सूचना:",
    "evidence.verbatim_excerpt": "मूल मानक धारा उद्धरण",
    "evidence.copy_excerpt": "उद्धरण कॉपी करू",
    "evidence.copied": "कॉपी कएल गेल",
    "evidence.view_source": "आधिकारिक बीआईएस पोर्टल पर स्रोत देखू",
    "evidence.no_evidence_title": "कोनो साक्ष्य संदर्भित नहि अछि",
    "evidence.no_evidence_desc":
      "बीआईएस मानक धारा आ राजपत्र अंश देखबाक लेल प्रश्न पूछू वा मानक चुनू।",
    "common.loading": "उत्तर तैयार भ रहल अछि...",
    "common.error": "प्रक्रिया पूरा नहि भ सकल।",

    "header.subtitle": "Indian Standards Intelligence",
    "home.how_subtitle_prefix": "Strict adherence to",
    "home.how_subtitle_bold":
      '"Retrieve First → Reason Second → Cite Everything"',
    "home.mode_industry": "Industry / MSME",
    "home.mode_consumer": "Consumer",
    "home.mode_student": "Student / Researcher",
    "home.mode_admin": "Admin & Regulatory",
    "home.mode_consumer_placeholder":
      "Check gold hallmark HUID, verify ISI mark...",
    "home.mode_student_placeholder":
      "Search standard clauses, comparative analysis...",
    "home.mode_admin_placeholder":
      "Search standards, schemes, reports, or guidelines...",
    "home.features_title": "Bureau of Indian Standards Intelligence",
    "home.features_subtitle":
      "Structured modules for manufacturers, compliance officers, consumers.",
    "home.features_find_title": "Find My Standard Workflow",
    "home.features_find_badge": "AI Profiler",
    "home.features_find_tag": "Product Matching",
    "home.features_find_desc":
      "Step-by-step product profiler matching your product to Indian Standards.",
    "home.features_find_action": "Start Profiler →",
    "home.features_cert_title": "Certification Schemes & Roadmap",
    "home.features_cert_badge": "ISI & CRS",
    "home.features_cert_tag": "Audit & FMCS",
    "home.features_cert_desc":
      "Navigate Scheme I (ISI Mark), Scheme II (CRS), Scheme IV, and FMCS.",
    "home.features_cert_action": "Explore Schemes →",
    "home.features_testing_title": "Testing Requirements & Clauses",
    "home.features_testing_badge": "Clauses",
    "home.features_testing_tag": "Sampling Schedules",
    "home.features_testing_desc":
      "Acceptance criteria, sampling rules, and testing equipment from Indian Standards.",
    "home.features_testing_action": "Inspect Test Schedules →",
    "home.features_labs_title": "BIS Recognized Laboratories Finder",
    "home.features_labs_badge": "Lab Network",
    "home.features_labs_tag": "NABL & BIS Facilities",
    "home.features_labs_desc":
      "Filter NABL and BIS recognized labs by IS number, state, and city.",
    "home.features_labs_action": "Locate Accredited Lab →",
    "home.features_hallmark_title": "Gold & Silver Hallmarking Assistant",
    "home.features_hallmark_badge": "HUID Check",
    "home.features_hallmark_tag": "Purity & Assaying",
    "home.features_hallmark_desc":
      "Verify 6-digit HUID codes and understand gold/silver purity grades.",
    "home.features_hallmark_action": "Hallmarking Guidance →",
    "home.features_consumer_title": "Consumer Protection & ISI Check",
    "home.features_consumer_badge": "Verify & Report",
    "home.features_consumer_tag": "Grievance Redressal",
    "home.features_consumer_desc":
      "Verify ISI Mark CM/L licence numbers, spot counterfeits.",
    "home.features_consumer_action": "Consumer Hub →",
    "home.how_title": "How BIS Saarthi Works",
    "home.how_badge": "Architecture & Verification Pipeline",
    "home.how_step1_title": "Ask Query",
    "home.how_step1_desc":
      "Query in English, Hindi, or any of 22 Scheduled Indian Languages.",
    "home.how_step2_title": "Retrieve",
    "home.how_step2_desc":
      "Hybrid BM25 + Vector semantic search across BIS repository.",
    "home.how_step3_title": "Verify",
    "home.how_step3_desc":
      "Cross-encoder reranking & source freshness verification.",
    "home.how_step4_title": "Explain",
    "home.how_step4_desc":
      "Clear plain-language guidance distinguished from statutory clauses.",
    "home.how_step5_title": "Cite",
    "home.how_step5_desc":
      "Every claim traceable to standard number, clause, page, and link.",
    "home.trust_badge": "Zero Hallucination Operational Standard",
    "home.trust_title": "Trusted by MSMEs, Compliance Teams & Citizens",
    "home.trust_desc":
      "BIS Saarthi never invents Indian Standard numbers, test clauses, or lab recognition statuses.",
    "home.trust_action": "Launch AI Workspace →",
    "standards.badge": "Bureau of Indian Standards Repository",
    "standards.title": "Indian Standards Directory & Search",
    "standards.subtitle":
      "Search authoritative Indian Standards, mandatory QCOs, and testing clause schedules.",
    "standards.search_placeholder": "Search by IS number or keyword...",
    "standards.search_btn": "Search",
    "standards.filter_division": "Division:",
    "standards.filter_all": "All Divisions",
    "standards.filter_mandatory": "Mandatory QCO Only",
    "standards.div_mech": "Mechanical Engineering",
    "standards.div_civil": "Civil Engineering",
    "standards.div_electro": "Electrotechnical",
    "standards.div_met": "Metallurgical Engineering",
    "standards.div_food": "Food and Agriculture",
    "standards.loading_msg": "Retrieving Standards from BIS Repository...",
    "standards.loading_sub":
      "Applying division filters and QCO regulatory scopes...",
    "standards.empty_title": "No Indian Standards Found",
    "standards.empty_desc":
      "Try broadening your search query or reset the filters.",
    "standards.empty_action": "Reset Filters",
    "findstd.badge": "AI Product Scope Profiler",
    "findstd.title_prefix": "Find Applicable",
    "findstd.title_highlight": "Indian Standard",
    "findstd.subtitle":
      "Input product specifications and get matched Indian Standards.",
    "findstd.anti_badge": "Anti-Speculation Standard",
    "findstd.anti_desc":
      "Verify final grade classification against statutory QCOs.",
    "findstd.form_title": "Product Specification Form",
    "findstd.form_subtitle":
      "Provide as many details as possible for precise standard matching.",
    "findstd.field_product": "Product Name / Type",
    "findstd.field_material": "Raw Material Composition",
    "findstd.field_application": "Intended Application / Usage",
    "findstd.field_industry": "Industry / Domain Sector",
    "findstd.field_capacity": "Capacity / Size",
    "findstd.field_techspec": "Technical Specifications",
    "findstd.placeholder_product":
      "e.g. Stainless steel water bottle, PVC cable, TMT bar",
    "findstd.placeholder_material": "e.g. SS 304, Aluminium alloy",
    "findstd.placeholder_application":
      "e.g. Drinking water storage, building construction",
    "findstd.placeholder_industry":
      "e.g. Metallurgical, Food & Agriculture, Civil",
    "findstd.placeholder_capacity": "e.g. 750 ml, 1.1kV, 12mm",
    "findstd.placeholder_techspec":
      "e.g. Voltage rating 1.1kV, double wall insulation",
    "findstd.btn_evaluate": "Evaluate Applicable Standards",
    "findstd.btn_clear": "Clear",
    "findstd.btn_sample": "Run Sample Evaluation",
    "findstd.results_title": "Evaluated Indian Standards",
    "findstd.results_complete": "Grounded Assessment Completed",
    "findstd.loading_msg": "Evaluating Product-to-Standard Scope...",
    "findstd.loading_sub":
      "Scanning Gazette notifications and material grade parameters...",
    "findstd.empty_title": "No Profile Evaluated Yet",
    "findstd.empty_desc":
      "Fill in the product specification form and click Evaluate.",
    "testing.badge": "Statutory Testing Schedules",
    "testing.title": "Indian Standards Testing Requirements",
    "testing.subtitle":
      "Inspect mandatory routine tests, acceptance criteria, and sampling rules.",
    "testing.filter_placeholder":
      "Filter by Standard Number (e.g. IS 17526, IS 10500)...",
    "testing.btn_filter": "Filter Tests",
    "testing.btn_showall": "Show All Tests",
    "testing.loading_msg":
      "Retrieving Testing Clauses & Acceptance Parameters...",
    "testing.loading_sub":
      "Cross-referencing laboratory test methods and sampling frequencies...",
    "testing.empty_title": "No Testing Requirements Found",
    "testing.empty_desc": "Try searching with IS 17526, IS 10500, or IS 1786.",
    "labs.badge": "Accredited Testing Infrastructure",
    "labs.title": "Find a BIS Recognized Laboratory",
    "labs.subtitle":
      "Search NABL and BIS recognized testing labs across Indian states.",
    "labs.search_placeholder":
      "Search by Indian Standard (e.g. IS 17526, IS 14543)...",
    "labs.btn_filter": "Filter Labs",
    "labs.filter_state": "State:",
    "labs.filter_allstates": "All States",
    "labs.loading_msg": "Locating Recognized Testing Laboratories...",
    "labs.loading_sub": "Matching accredited testing parameters...",
    "labs.empty_title": "No Laboratories Found",
    "labs.empty_desc":
      "Try removing the standard filter or choosing All States.",
    "labs.empty_action": "View All Laboratories",
    "hallmarking.badge": "Precious Metals Purity Assurance",
    "hallmarking.title_prefix": "Gold & Silver",
    "hallmarking.title_highlight": "Hallmarking Assistant",
    "hallmarking.subtitle":
      "Understand fineness grades, verify HUID codes, locate hallmarking centres.",
    "hallmarking.mandate_badge": "BIS Hallmarking Mandate",
    "hallmarking.mandate_desc":
      "Mandatory hallmarking operative across notified districts.",
    "hallmarking.3marks_title": "The 3 Mandatory Marks on Gold Jewellery",
    "hallmarking.3marks_note": "Operative since July 2021",
    "hallmarking.verify_tag": "Consumer Verification Tool",
    "hallmarking.verify_title": "Verify 6-Digit Alphanumeric HUID Structure",
    "hallmarking.verify_subtitle":
      "Test any 6-digit HUID code before buying jewellery.",
    "hallmarking.verify_placeholder": "Enter 6-character HUID (e.g. A1B2C3)",
    "hallmarking.btn_validate": "Validate Format",
    "hallmarking.verify_howto": "How to verify on BIS Care App:",
    "hallmarking.verify_safety": "Consumer Safety & Rights Tips:",
    "hallmarking.grades_title":
      "Official Gold & Silver Fineness Grades (IS 1417 & IS 2112)",
    "hallmarking.comp_badge": "Statutory 2X Compensation Policy",
    "hallmarking.comp_title": "Consumer Protection Guarantee",
    "hallmarking.loading_msg":
      "Loading Hallmarking Standards & Fineness Schedules...",
    "hallmarking.loading_sub":
      "Retrieving IS 1417 and IS 2112 statutory markings...",
    "reports.badge": "Decision Support Deliverable",
    "reports.title": "BIS Compliance Roadmap Report",
    "reports.btn_print": "Print / Save as PDF",
    "reports.doc_header": "Government Compliance Assessment Document",
    "reports.doc_title": "BIS Product Compliance & Conformity Roadmap",
    "reports.section1": "1. Target Product Profile",
    "reports.label_product": "Product Evaluated:",
    "reports.label_primarystd": "Primary Applicable Standard:",
    "reports.section2": "2. Applicable Indian Standards & QCO Mandates",
    "reports.tag_mandatory": "Mandatory",
    "reports.label_regulatory": "Regulatory Notification:",
    "reports.section3": "3. Applicable BIS Certification Scheme",
    "reports.label_validity": "Validity:",
    "reports.label_surveillance": "Surveillance:",
    "reports.section4": "4. Mandatory Testing Requirements",
    "reports.col_test": "Test Parameter",
    "reports.col_clause": "Standard Clause",
    "reports.col_type": "Type",
    "reports.col_sampling": "Sampling Rule",
    "reports.section5": "5. Recommended Testing Laboratories",
    "reports.section6": "6. Statutory Documentation Checklist",
    "reports.section7": "Key Statutory Compliance Pitfalls:",
    "reports.disclaimer_title": "Authoritative Compliance Notice:",
    "reports.loading_msg": "Synthesizing BIS Compliance Assessment Report...",
    "reports.loading_sub":
      "Compiling applicable standards, testing schedules, and statutory evidence...",
    "certification.badge": "BIS Conformity Assessment Schemes",
    "certification.title": "Certification Schemes & Compliance Roadmap",
    "certification.subtitle":
      "Understand statutory conformity schemes, factory audits, and licence grant procedures.",
    "certification.btn_report": "Generate Full Compliance Report",
    "certification.active_product": "Active Product Roadmap:",
    "certification.btn_change": "Change Product Profile →",
    "certification.roadmap_title":
      "Interactive Step-by-Step Certification Journey",
    "certification.phases": "Phases",
    "certification.details_tag": "Scheme Details",
    "certification.docs_title": "Statutory Documents Required:",
    "certification.fee_title": "Fee Structure:",
    "certification.validity": "Validity:",
    "certification.surveillance": "Surveillance:",
    "certification.link_official": "Official Manakonline / CRS Portal",
    "certification.loading_msg": "Loading Certification Scheme Requirements...",
    "certification.loading_sub":
      "Compiling documentation checklists and audit schedules...",
    "consumer.badge": "Citizen & Consumer Protection",
    "consumer.title_prefix": "Consumer Safety &",
    "consumer.title_highlight": "ISI Mark Verification Hub",
    "consumer.subtitle":
      "Verify ISI Mark CM/L licence numbers, detect counterfeit markings, access grievance channels.",
    "consumer.helpline_badge": "Toll-Free Consumer Helpline",
    "consumer.helpline_number": "1800-11-4000",
    "consumer.verify_tag": "Licence Authentication",
    "consumer.verify_title": "Verify ISI Mark CM/L Number",
    "consumer.verify_subtitle":
      "Enter the 7 or 8-digit numeric licence code beneath the ISI triangular logo.",
    "consumer.verify_placeholder":
      "Enter 7 or 8-digit CM/L Number (e.g. 1454301)",
    "consumer.btn_check": "Check Licence Structure",
    "consumer.checklist_auth": "Authenticity Verification Checklist:",
    "consumer.checklist_fraud": "Red Flag Fraud Indicators:",
    "consumer.link_biscare": "Download Official BIS Care Citizen App",
    "consumer.complaint_title": "How to Lodge a Counterfeit Complaint",
    "consumer.complaint_desc":
      "Submit an anonymous report to BIS Enforcement Branch via the BIS Care App or e-BIS portal.",
    "consumer.categories_title": "Key Mandatory Consumer Categories",
    "consumer.categories_desc":
      "Products that strictly require the ISI Mark before retail sale in India:",
    "consumer.cat_packaged_water": "Packaged Drinking Water",
    "consumer.cat_cement": "Cement",
    "consumer.cat_steel_tmt": "Steel TMT Bars",
    "consumer.cat_pvc_pipes": "PVC Pipes",
    "consumer.cat_electrical": "Electrical Appliances",
    "consumer.cat_food_dairy": "Food & Dairy Products",
    "consumer.cat_lpg": "LPG Cylinders",
    "consumer.cat_gold": "Gold Jewellery",
    "footer.description":
      "AI-Powered Decision-Support Platform for Indian Standards, Certification Schemes, Laboratory Testing, and Hallmarking.",
    "footer.tagline": "Retrieve First → Reason Second → Cite Everything",
    "footer.portals_title": "BIS Portals",
    "footer.ebis": "e-BIS Portal",
    "footer.manakonline": "Manakonline (Scheme I)",
    "footer.crs": "CRS Portal (Electronics)",
    "footer.nabl": "NABL Directory",
    "footer.modules_title": "Core Modules",
    "footer.find_standard": "Find My Standard",
    "footer.certification": "Certification Schemes",
    "footer.testing": "Testing Requirements",
    "footer.labs": "Recognized Labs Finder",
    "footer.hallmarking": "Gold & Silver Hallmarking",
    "footer.legal_title": "Legal & Quality Notice",
    "footer.legal_text":
      "Information provided is grounded in published Indian Standards and Gazette notifications. Formal legal compliance requires certification grant through official BIS portals.",
    "footer.admin_link": "Admin & Evaluation Console →",
    "footer.copyright":
      "BIS Saarthi. Built for Indian Industry, MSMEs & Citizens.",
    "footer.consumer_grievance": "Consumer Grievance",
    "footer.ai_support": "AI Decision Support",
    "prompts.industry.1":
      "I manufacture stainless steel water bottles. Which standard applies?",
    "prompts.industry.2":
      "Do I need BIS certification for Lithium-ion power banks?",
    "prompts.industry.3":
      "What tests are required for TMT steel bars under IS 1786?",
    "prompts.industry.4":
      "What is the factory audit and sample testing process for Scheme-I?",
    "prompts.industry.5":
      "FMCS guidelines for foreign manufacturers exporting to India",
    "prompts.industry.6":
      "Required lab testing equipment for IS 302 electrical appliances",
    "prompts.consumer.1":
      "How do I verify a gold jewellery hallmark with 6-digit HUID?",
    "prompts.consumer.2":
      "How can I check whether an ISI mark on packaged water is genuine?",
    "prompts.consumer.3":
      "How to file a consumer grievance against defective ISI certified goods?",
    "prompts.consumer.4":
      "Difference between BIS Hallmark and 916 purity mark.",
    "prompts.consumer.5": "Is BIS registration mandatory for smart phones?",
    "prompts.consumer.6":
      "How to verify R-number on electronics under CRS scheme?",
    "prompts.student.1":
      "Explain IS 10500 Clause 4.2 drinking water TDS & heavy metal limits",
    "prompts.student.2":
      "Comparative analysis between IS 456 standards and Eurocode 2",
    "prompts.student.3": "What are the latest amendments to NBC 2016?",
    "prompts.student.4":
      "Search technical clauses for tensile and elongation requirements in IS 2062",
    "prompts.student.5":
      "Evolution of energy efficiency and BEE star rating test protocols in IS 1391",
    "prompts.student.6":
      "Standard testing methods for cement compressive strength under IS 4031",
    "prompts.admin.1":
      "What are the active Quality Control Orders (QCOs) in effect?",
    "prompts.admin.2":
      "Audit compliance checklist for BIS recognized testing laboratories",
    "prompts.admin.3":
      "Standards revision roadmap and committee review process",
  },
  [IndianLanguage.DOG]: {
    "nav.standards": "मानक",
    "nav.find_standard": "अपना मानक लब्भो",
    "nav.catalogue": "मानक सूची",
    "nav.certification": "प्रमाणन",
    "nav.testing": "परिक्षण",
    "nav.labs": "प्रयोगशाला",
    "nav.hallmark": "हॉलमार्क",
    "nav.consumer": "उपभोक्ता सरक्खण",
    "nav.reports": "रिपोर्टां",
    "nav.ask_bis_ai": "BIS AI गी पुच्छो",
    "nav.ask_ai": "पुच्छो AI",
    "hero.title": "भारतीय मानके ते बीआईएस सेवान लेई तुंदा एआई सहायक",
    "hero.subtitle":
      "सही मानक लब्भो, प्रमाणन प्रक्रिया समझो ते हॉलमार्किंग जांचो।",
    "hero.select_profile": "अपनी प्रोफाइल चुनो:",
    "hero.search_placeholder": "उत्पाद मानके दे बारे च पुच्छो...",
    "hero.ask_ai_btn": "पुच्छो AI",
    "hero.suggested_queries": "सुझाए दे सवाल:",
    "chat.new_session": "+ नवा चैट सत्र",
    "chat.specialized_tools": "बीआईएस खास औजार",
    "chat.find_standard": "अपना मानक लब्भो",
    "chat.certification_schemes": "प्रमाणन स्कीमां",
    "chat.testing_requirements": "परिक्षण जरूरत",
    "chat.find_lab": "मान्यता प्राप्त लैब लब्भो",
    "chat.generate_report": "अनुपालन रिपोर्ट त्यार करो",
    "chat.active_workspace": "सक्रिय कार्यक्षेत्र",
    "chat.current_investigation": "वर्तमान जांच",
    "chat.grounded_active": "सबूत आधारित खोज सक्रिय",
    "chat.grounded_desc": "सरकारी गजट सूचनां थमां परखे दे जवाब।",
    "chat.conversation_title": "बीआईएस सारथी गलबात",
    "chat.mode": "मोड:",
    "chat.language_label": "बोली:",
    "chat.evidence_panel_btn": "सबूत पैनल",
    "chat.welcome_title": "बीआईएस सारथी — प्रमाण-समर्थित निर्णय सहायक",
    "chat.input_placeholder":
      "मानके, प्रमाणन, परिक्षण तरीके जां धारा दे बारे च पुच्छो...",
    "chat.send_btn": "भेजो",
    "chat.answer_language": "उत्तर दी बोली",
    "chat.detected_language": "पन्छानी गेई बोली",
    "chat.evidence_panel": "प्रामाणिक प्रमाण ते हवाले",
    "chat.confidence": "भरोसे दा स्तर",
    "chat.source_freshness": "जांचे दा स्रोत",
    "chat.searching_status": "बीआईएस भंडार च खोज ते धारा कड्ढिया जा करदी न...",
    "chat.traceable_citations": "जांच योग्य प्रामाणिक हवाले:",
    "chat.copy_answer": "जवाब कॉपी करो",
    "chat.copied": "कॉपी कीता गेआ",
    "chat.helpful": "मददगार जवाब",
    "chat.not_helpful": "अनुपयोगी",
    "chat.report_citation": "गलत हवाले दी रिपोर्ट करो",
    "chat.disclaimer":
      "सटीकता दी गारंटी: बीआईएस सारथी सिर्फ प्रामाणिक जानकारी दिंदा ऐ।",
    "chat.bis_act_compliant": "बीआईएस एक्ट २०१६ अनुसार",
    "evidence.title": "प्रामाणिक प्रमाण ते हवाले",
    "evidence.indian_standard": "भारतीय मानक",
    "evidence.clause": "धारा:",
    "evidence.page": "सफा:",
    "evidence.publication": "प्रकाशन मिती:",
    "evidence.relevance": "प्रासंगिकता:",
    "evidence.freshness_notice": "ताजा सूचना:",
    "evidence.verbatim_excerpt": "मूल मानक धारा दा अंश",
    "evidence.copy_excerpt": "हवाला कॉपी करो",
    "evidence.copied": "कॉपी कीता गेआ",
    "evidence.view_source": "सरकारी BIS पोर्टल पर स्रोत दिखो",
    "evidence.no_evidence_title": "कोई सबूत नेईं दित्ता गेआ",
    "evidence.no_evidence_desc":
      "BIS मानक धारा दिखणे लेई सवाल पुच्छो जां मानक चुनो।",
    "common.loading": "उत्तर त्यार होआ करदा ऐ...",
    "common.error": "प्रक्रिया पूरी नेईं होई सकी।",

    "header.subtitle": "Indian Standards Intelligence",
    "home.how_subtitle_prefix": "Strict adherence to",
    "home.how_subtitle_bold":
      '"Retrieve First → Reason Second → Cite Everything"',
    "home.mode_industry": "Industry / MSME",
    "home.mode_consumer": "Consumer",
    "home.mode_student": "Student / Researcher",
    "home.mode_admin": "Admin & Regulatory",
    "home.mode_consumer_placeholder":
      "Check gold hallmark HUID, verify ISI mark...",
    "home.mode_student_placeholder":
      "Search standard clauses, comparative analysis...",
    "home.mode_admin_placeholder":
      "Search standards, schemes, reports, or guidelines...",
    "home.features_title": "Bureau of Indian Standards Intelligence",
    "home.features_subtitle":
      "Structured modules for manufacturers, compliance officers, consumers.",
    "home.features_find_title": "Find My Standard Workflow",
    "home.features_find_badge": "AI Profiler",
    "home.features_find_tag": "Product Matching",
    "home.features_find_desc":
      "Step-by-step product profiler matching your product to Indian Standards.",
    "home.features_find_action": "Start Profiler →",
    "home.features_cert_title": "Certification Schemes & Roadmap",
    "home.features_cert_badge": "ISI & CRS",
    "home.features_cert_tag": "Audit & FMCS",
    "home.features_cert_desc":
      "Navigate Scheme I (ISI Mark), Scheme II (CRS), Scheme IV, and FMCS.",
    "home.features_cert_action": "Explore Schemes →",
    "home.features_testing_title": "Testing Requirements & Clauses",
    "home.features_testing_badge": "Clauses",
    "home.features_testing_tag": "Sampling Schedules",
    "home.features_testing_desc":
      "Acceptance criteria, sampling rules, and testing equipment from Indian Standards.",
    "home.features_testing_action": "Inspect Test Schedules →",
    "home.features_labs_title": "BIS Recognized Laboratories Finder",
    "home.features_labs_badge": "Lab Network",
    "home.features_labs_tag": "NABL & BIS Facilities",
    "home.features_labs_desc":
      "Filter NABL and BIS recognized labs by IS number, state, and city.",
    "home.features_labs_action": "Locate Accredited Lab →",
    "home.features_hallmark_title": "Gold & Silver Hallmarking Assistant",
    "home.features_hallmark_badge": "HUID Check",
    "home.features_hallmark_tag": "Purity & Assaying",
    "home.features_hallmark_desc":
      "Verify 6-digit HUID codes and understand gold/silver purity grades.",
    "home.features_hallmark_action": "Hallmarking Guidance →",
    "home.features_consumer_title": "Consumer Protection & ISI Check",
    "home.features_consumer_badge": "Verify & Report",
    "home.features_consumer_tag": "Grievance Redressal",
    "home.features_consumer_desc":
      "Verify ISI Mark CM/L licence numbers, spot counterfeits.",
    "home.features_consumer_action": "Consumer Hub →",
    "home.how_title": "How BIS Saarthi Works",
    "home.how_badge": "Architecture & Verification Pipeline",
    "home.how_step1_title": "Ask Query",
    "home.how_step1_desc":
      "Query in English, Hindi, or any of 22 Scheduled Indian Languages.",
    "home.how_step2_title": "Retrieve",
    "home.how_step2_desc":
      "Hybrid BM25 + Vector semantic search across BIS repository.",
    "home.how_step3_title": "Verify",
    "home.how_step3_desc":
      "Cross-encoder reranking & source freshness verification.",
    "home.how_step4_title": "Explain",
    "home.how_step4_desc":
      "Clear plain-language guidance distinguished from statutory clauses.",
    "home.how_step5_title": "Cite",
    "home.how_step5_desc":
      "Every claim traceable to standard number, clause, page, and link.",
    "home.trust_badge": "Zero Hallucination Operational Standard",
    "home.trust_title": "Trusted by MSMEs, Compliance Teams & Citizens",
    "home.trust_desc":
      "BIS Saarthi never invents Indian Standard numbers, test clauses, or lab recognition statuses.",
    "home.trust_action": "Launch AI Workspace →",
    "standards.badge": "Bureau of Indian Standards Repository",
    "standards.title": "Indian Standards Directory & Search",
    "standards.subtitle":
      "Search authoritative Indian Standards, mandatory QCOs, and testing clause schedules.",
    "standards.search_placeholder": "Search by IS number or keyword...",
    "standards.search_btn": "Search",
    "standards.filter_division": "Division:",
    "standards.filter_all": "All Divisions",
    "standards.filter_mandatory": "Mandatory QCO Only",
    "standards.div_mech": "Mechanical Engineering",
    "standards.div_civil": "Civil Engineering",
    "standards.div_electro": "Electrotechnical",
    "standards.div_met": "Metallurgical Engineering",
    "standards.div_food": "Food and Agriculture",
    "standards.loading_msg": "Retrieving Standards from BIS Repository...",
    "standards.loading_sub":
      "Applying division filters and QCO regulatory scopes...",
    "standards.empty_title": "No Indian Standards Found",
    "standards.empty_desc":
      "Try broadening your search query or reset the filters.",
    "standards.empty_action": "Reset Filters",
    "findstd.badge": "AI Product Scope Profiler",
    "findstd.title_prefix": "Find Applicable",
    "findstd.title_highlight": "Indian Standard",
    "findstd.subtitle":
      "Input product specifications and get matched Indian Standards.",
    "findstd.anti_badge": "Anti-Speculation Standard",
    "findstd.anti_desc":
      "Verify final grade classification against statutory QCOs.",
    "findstd.form_title": "Product Specification Form",
    "findstd.form_subtitle":
      "Provide as many details as possible for precise standard matching.",
    "findstd.field_product": "Product Name / Type",
    "findstd.field_material": "Raw Material Composition",
    "findstd.field_application": "Intended Application / Usage",
    "findstd.field_industry": "Industry / Domain Sector",
    "findstd.field_capacity": "Capacity / Size",
    "findstd.field_techspec": "Technical Specifications",
    "findstd.placeholder_product":
      "e.g. Stainless steel water bottle, PVC cable, TMT bar",
    "findstd.placeholder_material": "e.g. SS 304, Aluminium alloy",
    "findstd.placeholder_application":
      "e.g. Drinking water storage, building construction",
    "findstd.placeholder_industry":
      "e.g. Metallurgical, Food & Agriculture, Civil",
    "findstd.placeholder_capacity": "e.g. 750 ml, 1.1kV, 12mm",
    "findstd.placeholder_techspec":
      "e.g. Voltage rating 1.1kV, double wall insulation",
    "findstd.btn_evaluate": "Evaluate Applicable Standards",
    "findstd.btn_clear": "Clear",
    "findstd.btn_sample": "Run Sample Evaluation",
    "findstd.results_title": "Evaluated Indian Standards",
    "findstd.results_complete": "Grounded Assessment Completed",
    "findstd.loading_msg": "Evaluating Product-to-Standard Scope...",
    "findstd.loading_sub":
      "Scanning Gazette notifications and material grade parameters...",
    "findstd.empty_title": "No Profile Evaluated Yet",
    "findstd.empty_desc":
      "Fill in the product specification form and click Evaluate.",
    "testing.badge": "Statutory Testing Schedules",
    "testing.title": "Indian Standards Testing Requirements",
    "testing.subtitle":
      "Inspect mandatory routine tests, acceptance criteria, and sampling rules.",
    "testing.filter_placeholder":
      "Filter by Standard Number (e.g. IS 17526, IS 10500)...",
    "testing.btn_filter": "Filter Tests",
    "testing.btn_showall": "Show All Tests",
    "testing.loading_msg":
      "Retrieving Testing Clauses & Acceptance Parameters...",
    "testing.loading_sub":
      "Cross-referencing laboratory test methods and sampling frequencies...",
    "testing.empty_title": "No Testing Requirements Found",
    "testing.empty_desc": "Try searching with IS 17526, IS 10500, or IS 1786.",
    "labs.badge": "Accredited Testing Infrastructure",
    "labs.title": "Find a BIS Recognized Laboratory",
    "labs.subtitle":
      "Search NABL and BIS recognized testing labs across Indian states.",
    "labs.search_placeholder":
      "Search by Indian Standard (e.g. IS 17526, IS 14543)...",
    "labs.btn_filter": "Filter Labs",
    "labs.filter_state": "State:",
    "labs.filter_allstates": "All States",
    "labs.loading_msg": "Locating Recognized Testing Laboratories...",
    "labs.loading_sub": "Matching accredited testing parameters...",
    "labs.empty_title": "No Laboratories Found",
    "labs.empty_desc":
      "Try removing the standard filter or choosing All States.",
    "labs.empty_action": "View All Laboratories",
    "hallmarking.badge": "Precious Metals Purity Assurance",
    "hallmarking.title_prefix": "Gold & Silver",
    "hallmarking.title_highlight": "Hallmarking Assistant",
    "hallmarking.subtitle":
      "Understand fineness grades, verify HUID codes, locate hallmarking centres.",
    "hallmarking.mandate_badge": "BIS Hallmarking Mandate",
    "hallmarking.mandate_desc":
      "Mandatory hallmarking operative across notified districts.",
    "hallmarking.3marks_title": "The 3 Mandatory Marks on Gold Jewellery",
    "hallmarking.3marks_note": "Operative since July 2021",
    "hallmarking.verify_tag": "Consumer Verification Tool",
    "hallmarking.verify_title": "Verify 6-Digit Alphanumeric HUID Structure",
    "hallmarking.verify_subtitle":
      "Test any 6-digit HUID code before buying jewellery.",
    "hallmarking.verify_placeholder": "Enter 6-character HUID (e.g. A1B2C3)",
    "hallmarking.btn_validate": "Validate Format",
    "hallmarking.verify_howto": "How to verify on BIS Care App:",
    "hallmarking.verify_safety": "Consumer Safety & Rights Tips:",
    "hallmarking.grades_title":
      "Official Gold & Silver Fineness Grades (IS 1417 & IS 2112)",
    "hallmarking.comp_badge": "Statutory 2X Compensation Policy",
    "hallmarking.comp_title": "Consumer Protection Guarantee",
    "hallmarking.loading_msg":
      "Loading Hallmarking Standards & Fineness Schedules...",
    "hallmarking.loading_sub":
      "Retrieving IS 1417 and IS 2112 statutory markings...",
    "reports.badge": "Decision Support Deliverable",
    "reports.title": "BIS Compliance Roadmap Report",
    "reports.btn_print": "Print / Save as PDF",
    "reports.doc_header": "Government Compliance Assessment Document",
    "reports.doc_title": "BIS Product Compliance & Conformity Roadmap",
    "reports.section1": "1. Target Product Profile",
    "reports.label_product": "Product Evaluated:",
    "reports.label_primarystd": "Primary Applicable Standard:",
    "reports.section2": "2. Applicable Indian Standards & QCO Mandates",
    "reports.tag_mandatory": "Mandatory",
    "reports.label_regulatory": "Regulatory Notification:",
    "reports.section3": "3. Applicable BIS Certification Scheme",
    "reports.label_validity": "Validity:",
    "reports.label_surveillance": "Surveillance:",
    "reports.section4": "4. Mandatory Testing Requirements",
    "reports.col_test": "Test Parameter",
    "reports.col_clause": "Standard Clause",
    "reports.col_type": "Type",
    "reports.col_sampling": "Sampling Rule",
    "reports.section5": "5. Recommended Testing Laboratories",
    "reports.section6": "6. Statutory Documentation Checklist",
    "reports.section7": "Key Statutory Compliance Pitfalls:",
    "reports.disclaimer_title": "Authoritative Compliance Notice:",
    "reports.loading_msg": "Synthesizing BIS Compliance Assessment Report...",
    "reports.loading_sub":
      "Compiling applicable standards, testing schedules, and statutory evidence...",
    "certification.badge": "BIS Conformity Assessment Schemes",
    "certification.title": "Certification Schemes & Compliance Roadmap",
    "certification.subtitle":
      "Understand statutory conformity schemes, factory audits, and licence grant procedures.",
    "certification.btn_report": "Generate Full Compliance Report",
    "certification.active_product": "Active Product Roadmap:",
    "certification.btn_change": "Change Product Profile →",
    "certification.roadmap_title":
      "Interactive Step-by-Step Certification Journey",
    "certification.phases": "Phases",
    "certification.details_tag": "Scheme Details",
    "certification.docs_title": "Statutory Documents Required:",
    "certification.fee_title": "Fee Structure:",
    "certification.validity": "Validity:",
    "certification.surveillance": "Surveillance:",
    "certification.link_official": "Official Manakonline / CRS Portal",
    "certification.loading_msg": "Loading Certification Scheme Requirements...",
    "certification.loading_sub":
      "Compiling documentation checklists and audit schedules...",
    "consumer.badge": "Citizen & Consumer Protection",
    "consumer.title_prefix": "Consumer Safety &",
    "consumer.title_highlight": "ISI Mark Verification Hub",
    "consumer.subtitle":
      "Verify ISI Mark CM/L licence numbers, detect counterfeit markings, access grievance channels.",
    "consumer.helpline_badge": "Toll-Free Consumer Helpline",
    "consumer.helpline_number": "1800-11-4000",
    "consumer.verify_tag": "Licence Authentication",
    "consumer.verify_title": "Verify ISI Mark CM/L Number",
    "consumer.verify_subtitle":
      "Enter the 7 or 8-digit numeric licence code beneath the ISI triangular logo.",
    "consumer.verify_placeholder":
      "Enter 7 or 8-digit CM/L Number (e.g. 1454301)",
    "consumer.btn_check": "Check Licence Structure",
    "consumer.checklist_auth": "Authenticity Verification Checklist:",
    "consumer.checklist_fraud": "Red Flag Fraud Indicators:",
    "consumer.link_biscare": "Download Official BIS Care Citizen App",
    "consumer.complaint_title": "How to Lodge a Counterfeit Complaint",
    "consumer.complaint_desc":
      "Submit an anonymous report to BIS Enforcement Branch via the BIS Care App or e-BIS portal.",
    "consumer.categories_title": "Key Mandatory Consumer Categories",
    "consumer.categories_desc":
      "Products that strictly require the ISI Mark before retail sale in India:",
    "consumer.cat_packaged_water": "Packaged Drinking Water",
    "consumer.cat_cement": "Cement",
    "consumer.cat_steel_tmt": "Steel TMT Bars",
    "consumer.cat_pvc_pipes": "PVC Pipes",
    "consumer.cat_electrical": "Electrical Appliances",
    "consumer.cat_food_dairy": "Food & Dairy Products",
    "consumer.cat_lpg": "LPG Cylinders",
    "consumer.cat_gold": "Gold Jewellery",
    "footer.description":
      "AI-Powered Decision-Support Platform for Indian Standards, Certification Schemes, Laboratory Testing, and Hallmarking.",
    "footer.tagline": "Retrieve First → Reason Second → Cite Everything",
    "footer.portals_title": "BIS Portals",
    "footer.ebis": "e-BIS Portal",
    "footer.manakonline": "Manakonline (Scheme I)",
    "footer.crs": "CRS Portal (Electronics)",
    "footer.nabl": "NABL Directory",
    "footer.modules_title": "Core Modules",
    "footer.find_standard": "Find My Standard",
    "footer.certification": "Certification Schemes",
    "footer.testing": "Testing Requirements",
    "footer.labs": "Recognized Labs Finder",
    "footer.hallmarking": "Gold & Silver Hallmarking",
    "footer.legal_title": "Legal & Quality Notice",
    "footer.legal_text":
      "Information provided is grounded in published Indian Standards and Gazette notifications. Formal legal compliance requires certification grant through official BIS portals.",
    "footer.admin_link": "Admin & Evaluation Console →",
    "footer.copyright":
      "BIS Saarthi. Built for Indian Industry, MSMEs & Citizens.",
    "footer.consumer_grievance": "Consumer Grievance",
    "footer.ai_support": "AI Decision Support",
    "prompts.industry.1":
      "I manufacture stainless steel water bottles. Which standard applies?",
    "prompts.industry.2":
      "Do I need BIS certification for Lithium-ion power banks?",
    "prompts.industry.3":
      "What tests are required for TMT steel bars under IS 1786?",
    "prompts.industry.4":
      "What is the factory audit and sample testing process for Scheme-I?",
    "prompts.industry.5":
      "FMCS guidelines for foreign manufacturers exporting to India",
    "prompts.industry.6":
      "Required lab testing equipment for IS 302 electrical appliances",
    "prompts.consumer.1":
      "How do I verify a gold jewellery hallmark with 6-digit HUID?",
    "prompts.consumer.2":
      "How can I check whether an ISI mark on packaged water is genuine?",
    "prompts.consumer.3":
      "How to file a consumer grievance against defective ISI certified goods?",
    "prompts.consumer.4":
      "Difference between BIS Hallmark and 916 purity mark.",
    "prompts.consumer.5": "Is BIS registration mandatory for smart phones?",
    "prompts.consumer.6":
      "How to verify R-number on electronics under CRS scheme?",
    "prompts.student.1":
      "Explain IS 10500 Clause 4.2 drinking water TDS & heavy metal limits",
    "prompts.student.2":
      "Comparative analysis between IS 456 standards and Eurocode 2",
    "prompts.student.3": "What are the latest amendments to NBC 2016?",
    "prompts.student.4":
      "Search technical clauses for tensile and elongation requirements in IS 2062",
    "prompts.student.5":
      "Evolution of energy efficiency and BEE star rating test protocols in IS 1391",
    "prompts.student.6":
      "Standard testing methods for cement compressive strength under IS 4031",
    "prompts.admin.1":
      "What are the active Quality Control Orders (QCOs) in effect?",
    "prompts.admin.2":
      "Audit compliance checklist for BIS recognized testing laboratories",
    "prompts.admin.3":
      "Standards revision roadmap and committee review process",
  },
  [IndianLanguage.BOD]: {
    "nav.standards": "मानथाखिफोर",
    "nav.find_standard": "नोंथांनि मानथाखि नागिर",
    "nav.catalogue": "मानथाखि फारिलाइ",
    "nav.certification": "फोरमानलाइ",
    "nav.testing": "आनजाद",
    "nav.labs": "आनजादसालि",
    "nav.hallmark": "हलमार्क",
    "nav.consumer": "बायग्रा रैखाथि",
    "nav.reports": "फोरमायथि",
    "nav.ask_bis_ai": "BIS AI निफ्राय सों",
    "nav.ask_ai": "सों AI",
    "hero.title":
      "भारतारि मानथाखि आरो BIS सिबिथाइनि थाखाय नोंथांनि AI हेफाजाबगिरि",
    "hero.subtitle":
      "थार मानथाखि नागिरना दिहुन, फोरमानलाइ बिथांखिफोरखौ बुजिना ला।",
    "hero.select_profile": "नोंथांनि प्र'फाइल म'ड सायख':",
    "hero.search_placeholder": "दिहुन्थाय मानथाखिनि सोमोन्दै सों...",
    "hero.ask_ai_btn": "सों AI",
    "hero.suggested_queries": "सुझाव होनाय सोंलुफोर:",
    "chat.new_session": "+ गोदान सावरायनाय",
    "chat.specialized_tools": "BIS जुनिया आयदाफोर",
    "chat.find_standard": "आंनि मानथाखि नागिर",
    "chat.certification_schemes": "फोरमानलाइ बिथांखिफोर",
    "chat.testing_requirements": "आनजादनि गोनांथिफोर",
    "chat.find_lab": "मान्यतालखौ लिरनाय आनजादसालि नागिर",
    "chat.generate_report": "मानिनाय फोरमायथि बानाय",
    "chat.active_workspace": "मावगासिनो थानाय जायगा",
    "chat.current_investigation": "दानि बिजिरनाय",
    "chat.grounded_active": "साखि-गोनां बिथा दिहुननाय सलिगासिनो",
    "chat.grounded_desc":
      "सोरखारि गेजेट फोसावनायनिफ्राय आनजाद खालामखानाय फिननाय।",
    "chat.conversation_title": "BIS सारथी सावरायनाय",
    "chat.mode": "म'ड:",
    "chat.language_label": "राव:",
    "chat.evidence_panel_btn": "साखि प्यानल",
    "chat.welcome_title": "BIS सारथी — साखि-गोनां थि खालामग्रा हेफाजाबगिरि",
    "chat.input_placeholder":
      "मानथाखि, फोरमानलाइ, आनजाद नेमफोरनि सोमोन्दै सों...",
    "chat.send_btn": "दैथायहर",
    "chat.answer_language": "फिननायनि राव",
    "chat.detected_language": "सिनायथि मोननाय राव",
    "chat.evidence_panel": "थार साखि आरो बिमुंफोर",
    "chat.confidence": "फोथायथाव थाखो",
    "chat.source_freshness": "आनजाद खालामखानाय फुंखा",
    "chat.searching_status":
      "BIS थुंलियाव नागिरगासिनो आरो बाहागोफोर दिहुनगासिनो...",
    "chat.traceable_citations": "नायबिजिरथाव थार बिमुंफोर:",
    "chat.copy_answer": "फिननाय कपि खालाम",
    "chat.copied": "कपि खालामबाय",
    "chat.helpful": "मजां फिननाय",
    "chat.not_helpful": "मोजां नङा",
    "chat.report_citation": "गोरोन्थि बिमुं खौरां हर",
    "chat.disclaimer":
      "थारथानि ग्यारान्टि: BIS सारथिया जेब्लाबो थार खारथि होयो।",
    "chat.bis_act_compliant": "BIS आयेन २०१६ नि बादियै",
    "evidence.title": "थार साखि आरो बिमुंफोर",
    "evidence.indian_standard": "भारतारि मानथाखि",
    "evidence.clause": "बाहागो:",
    "evidence.page": "बिलाइ:",
    "evidence.publication": "फोसावनाय खालार:",
    "evidence.relevance": "गोरोबनाय:",
    "evidence.freshness_notice": "गोदान मिथिहोनाय:",
    "evidence.verbatim_excerpt": "गुबै मानथाखि खोन्दो",
    "evidence.copy_excerpt": "खोन्दो कपि खालाम",
    "evidence.copied": "कपि खालामबाय",
    "evidence.view_source": "सोरखारि BIS पर्टेलआव नाय",
    "evidence.no_evidence_title": "जेबो साखि उखावनाय जायाखै",
    "evidence.no_evidence_desc":
      "BIS मानथाखि खोन्दोफोर नायनो सोंलु सों एबा मानथाखि सायख'।",
    "common.loading": "फिननाय थियारि खालामगासिनो...",
    "common.error": "मावफुंनो हायाखै।",

    "header.subtitle": "Indian Standards Intelligence",
    "home.how_subtitle_prefix": "Strict adherence to",
    "home.how_subtitle_bold":
      '"Retrieve First → Reason Second → Cite Everything"',
    "home.mode_industry": "Industry / MSME",
    "home.mode_consumer": "Consumer",
    "home.mode_student": "Student / Researcher",
    "home.mode_admin": "Admin & Regulatory",
    "home.mode_consumer_placeholder":
      "Check gold hallmark HUID, verify ISI mark...",
    "home.mode_student_placeholder":
      "Search standard clauses, comparative analysis...",
    "home.mode_admin_placeholder":
      "Search standards, schemes, reports, or guidelines...",
    "home.features_title": "Bureau of Indian Standards Intelligence",
    "home.features_subtitle":
      "Structured modules for manufacturers, compliance officers, consumers.",
    "home.features_find_title": "Find My Standard Workflow",
    "home.features_find_badge": "AI Profiler",
    "home.features_find_tag": "Product Matching",
    "home.features_find_desc":
      "Step-by-step product profiler matching your product to Indian Standards.",
    "home.features_find_action": "Start Profiler →",
    "home.features_cert_title": "Certification Schemes & Roadmap",
    "home.features_cert_badge": "ISI & CRS",
    "home.features_cert_tag": "Audit & FMCS",
    "home.features_cert_desc":
      "Navigate Scheme I (ISI Mark), Scheme II (CRS), Scheme IV, and FMCS.",
    "home.features_cert_action": "Explore Schemes →",
    "home.features_testing_title": "Testing Requirements & Clauses",
    "home.features_testing_badge": "Clauses",
    "home.features_testing_tag": "Sampling Schedules",
    "home.features_testing_desc":
      "Acceptance criteria, sampling rules, and testing equipment from Indian Standards.",
    "home.features_testing_action": "Inspect Test Schedules →",
    "home.features_labs_title": "BIS Recognized Laboratories Finder",
    "home.features_labs_badge": "Lab Network",
    "home.features_labs_tag": "NABL & BIS Facilities",
    "home.features_labs_desc":
      "Filter NABL and BIS recognized labs by IS number, state, and city.",
    "home.features_labs_action": "Locate Accredited Lab →",
    "home.features_hallmark_title": "Gold & Silver Hallmarking Assistant",
    "home.features_hallmark_badge": "HUID Check",
    "home.features_hallmark_tag": "Purity & Assaying",
    "home.features_hallmark_desc":
      "Verify 6-digit HUID codes and understand gold/silver purity grades.",
    "home.features_hallmark_action": "Hallmarking Guidance →",
    "home.features_consumer_title": "Consumer Protection & ISI Check",
    "home.features_consumer_badge": "Verify & Report",
    "home.features_consumer_tag": "Grievance Redressal",
    "home.features_consumer_desc":
      "Verify ISI Mark CM/L licence numbers, spot counterfeits.",
    "home.features_consumer_action": "Consumer Hub →",
    "home.how_title": "How BIS Saarthi Works",
    "home.how_badge": "Architecture & Verification Pipeline",
    "home.how_step1_title": "Ask Query",
    "home.how_step1_desc":
      "Query in English, Hindi, or any of 22 Scheduled Indian Languages.",
    "home.how_step2_title": "Retrieve",
    "home.how_step2_desc":
      "Hybrid BM25 + Vector semantic search across BIS repository.",
    "home.how_step3_title": "Verify",
    "home.how_step3_desc":
      "Cross-encoder reranking & source freshness verification.",
    "home.how_step4_title": "Explain",
    "home.how_step4_desc":
      "Clear plain-language guidance distinguished from statutory clauses.",
    "home.how_step5_title": "Cite",
    "home.how_step5_desc":
      "Every claim traceable to standard number, clause, page, and link.",
    "home.trust_badge": "Zero Hallucination Operational Standard",
    "home.trust_title": "Trusted by MSMEs, Compliance Teams & Citizens",
    "home.trust_desc":
      "BIS Saarthi never invents Indian Standard numbers, test clauses, or lab recognition statuses.",
    "home.trust_action": "Launch AI Workspace →",
    "standards.badge": "Bureau of Indian Standards Repository",
    "standards.title": "Indian Standards Directory & Search",
    "standards.subtitle":
      "Search authoritative Indian Standards, mandatory QCOs, and testing clause schedules.",
    "standards.search_placeholder": "Search by IS number or keyword...",
    "standards.search_btn": "Search",
    "standards.filter_division": "Division:",
    "standards.filter_all": "All Divisions",
    "standards.filter_mandatory": "Mandatory QCO Only",
    "standards.div_mech": "Mechanical Engineering",
    "standards.div_civil": "Civil Engineering",
    "standards.div_electro": "Electrotechnical",
    "standards.div_met": "Metallurgical Engineering",
    "standards.div_food": "Food and Agriculture",
    "standards.loading_msg": "Retrieving Standards from BIS Repository...",
    "standards.loading_sub":
      "Applying division filters and QCO regulatory scopes...",
    "standards.empty_title": "No Indian Standards Found",
    "standards.empty_desc":
      "Try broadening your search query or reset the filters.",
    "standards.empty_action": "Reset Filters",
    "findstd.badge": "AI Product Scope Profiler",
    "findstd.title_prefix": "Find Applicable",
    "findstd.title_highlight": "Indian Standard",
    "findstd.subtitle":
      "Input product specifications and get matched Indian Standards.",
    "findstd.anti_badge": "Anti-Speculation Standard",
    "findstd.anti_desc":
      "Verify final grade classification against statutory QCOs.",
    "findstd.form_title": "Product Specification Form",
    "findstd.form_subtitle":
      "Provide as many details as possible for precise standard matching.",
    "findstd.field_product": "Product Name / Type",
    "findstd.field_material": "Raw Material Composition",
    "findstd.field_application": "Intended Application / Usage",
    "findstd.field_industry": "Industry / Domain Sector",
    "findstd.field_capacity": "Capacity / Size",
    "findstd.field_techspec": "Technical Specifications",
    "findstd.placeholder_product":
      "e.g. Stainless steel water bottle, PVC cable, TMT bar",
    "findstd.placeholder_material": "e.g. SS 304, Aluminium alloy",
    "findstd.placeholder_application":
      "e.g. Drinking water storage, building construction",
    "findstd.placeholder_industry":
      "e.g. Metallurgical, Food & Agriculture, Civil",
    "findstd.placeholder_capacity": "e.g. 750 ml, 1.1kV, 12mm",
    "findstd.placeholder_techspec":
      "e.g. Voltage rating 1.1kV, double wall insulation",
    "findstd.btn_evaluate": "Evaluate Applicable Standards",
    "findstd.btn_clear": "Clear",
    "findstd.btn_sample": "Run Sample Evaluation",
    "findstd.results_title": "Evaluated Indian Standards",
    "findstd.results_complete": "Grounded Assessment Completed",
    "findstd.loading_msg": "Evaluating Product-to-Standard Scope...",
    "findstd.loading_sub":
      "Scanning Gazette notifications and material grade parameters...",
    "findstd.empty_title": "No Profile Evaluated Yet",
    "findstd.empty_desc":
      "Fill in the product specification form and click Evaluate.",
    "testing.badge": "Statutory Testing Schedules",
    "testing.title": "Indian Standards Testing Requirements",
    "testing.subtitle":
      "Inspect mandatory routine tests, acceptance criteria, and sampling rules.",
    "testing.filter_placeholder":
      "Filter by Standard Number (e.g. IS 17526, IS 10500)...",
    "testing.btn_filter": "Filter Tests",
    "testing.btn_showall": "Show All Tests",
    "testing.loading_msg":
      "Retrieving Testing Clauses & Acceptance Parameters...",
    "testing.loading_sub":
      "Cross-referencing laboratory test methods and sampling frequencies...",
    "testing.empty_title": "No Testing Requirements Found",
    "testing.empty_desc": "Try searching with IS 17526, IS 10500, or IS 1786.",
    "labs.badge": "Accredited Testing Infrastructure",
    "labs.title": "Find a BIS Recognized Laboratory",
    "labs.subtitle":
      "Search NABL and BIS recognized testing labs across Indian states.",
    "labs.search_placeholder":
      "Search by Indian Standard (e.g. IS 17526, IS 14543)...",
    "labs.btn_filter": "Filter Labs",
    "labs.filter_state": "State:",
    "labs.filter_allstates": "All States",
    "labs.loading_msg": "Locating Recognized Testing Laboratories...",
    "labs.loading_sub": "Matching accredited testing parameters...",
    "labs.empty_title": "No Laboratories Found",
    "labs.empty_desc":
      "Try removing the standard filter or choosing All States.",
    "labs.empty_action": "View All Laboratories",
    "hallmarking.badge": "Precious Metals Purity Assurance",
    "hallmarking.title_prefix": "Gold & Silver",
    "hallmarking.title_highlight": "Hallmarking Assistant",
    "hallmarking.subtitle":
      "Understand fineness grades, verify HUID codes, locate hallmarking centres.",
    "hallmarking.mandate_badge": "BIS Hallmarking Mandate",
    "hallmarking.mandate_desc":
      "Mandatory hallmarking operative across notified districts.",
    "hallmarking.3marks_title": "The 3 Mandatory Marks on Gold Jewellery",
    "hallmarking.3marks_note": "Operative since July 2021",
    "hallmarking.verify_tag": "Consumer Verification Tool",
    "hallmarking.verify_title": "Verify 6-Digit Alphanumeric HUID Structure",
    "hallmarking.verify_subtitle":
      "Test any 6-digit HUID code before buying jewellery.",
    "hallmarking.verify_placeholder": "Enter 6-character HUID (e.g. A1B2C3)",
    "hallmarking.btn_validate": "Validate Format",
    "hallmarking.verify_howto": "How to verify on BIS Care App:",
    "hallmarking.verify_safety": "Consumer Safety & Rights Tips:",
    "hallmarking.grades_title":
      "Official Gold & Silver Fineness Grades (IS 1417 & IS 2112)",
    "hallmarking.comp_badge": "Statutory 2X Compensation Policy",
    "hallmarking.comp_title": "Consumer Protection Guarantee",
    "hallmarking.loading_msg":
      "Loading Hallmarking Standards & Fineness Schedules...",
    "hallmarking.loading_sub":
      "Retrieving IS 1417 and IS 2112 statutory markings...",
    "reports.badge": "Decision Support Deliverable",
    "reports.title": "BIS Compliance Roadmap Report",
    "reports.btn_print": "Print / Save as PDF",
    "reports.doc_header": "Government Compliance Assessment Document",
    "reports.doc_title": "BIS Product Compliance & Conformity Roadmap",
    "reports.section1": "1. Target Product Profile",
    "reports.label_product": "Product Evaluated:",
    "reports.label_primarystd": "Primary Applicable Standard:",
    "reports.section2": "2. Applicable Indian Standards & QCO Mandates",
    "reports.tag_mandatory": "Mandatory",
    "reports.label_regulatory": "Regulatory Notification:",
    "reports.section3": "3. Applicable BIS Certification Scheme",
    "reports.label_validity": "Validity:",
    "reports.label_surveillance": "Surveillance:",
    "reports.section4": "4. Mandatory Testing Requirements",
    "reports.col_test": "Test Parameter",
    "reports.col_clause": "Standard Clause",
    "reports.col_type": "Type",
    "reports.col_sampling": "Sampling Rule",
    "reports.section5": "5. Recommended Testing Laboratories",
    "reports.section6": "6. Statutory Documentation Checklist",
    "reports.section7": "Key Statutory Compliance Pitfalls:",
    "reports.disclaimer_title": "Authoritative Compliance Notice:",
    "reports.loading_msg": "Synthesizing BIS Compliance Assessment Report...",
    "reports.loading_sub":
      "Compiling applicable standards, testing schedules, and statutory evidence...",
    "certification.badge": "BIS Conformity Assessment Schemes",
    "certification.title": "Certification Schemes & Compliance Roadmap",
    "certification.subtitle":
      "Understand statutory conformity schemes, factory audits, and licence grant procedures.",
    "certification.btn_report": "Generate Full Compliance Report",
    "certification.active_product": "Active Product Roadmap:",
    "certification.btn_change": "Change Product Profile →",
    "certification.roadmap_title":
      "Interactive Step-by-Step Certification Journey",
    "certification.phases": "Phases",
    "certification.details_tag": "Scheme Details",
    "certification.docs_title": "Statutory Documents Required:",
    "certification.fee_title": "Fee Structure:",
    "certification.validity": "Validity:",
    "certification.surveillance": "Surveillance:",
    "certification.link_official": "Official Manakonline / CRS Portal",
    "certification.loading_msg": "Loading Certification Scheme Requirements...",
    "certification.loading_sub":
      "Compiling documentation checklists and audit schedules...",
    "consumer.badge": "Citizen & Consumer Protection",
    "consumer.title_prefix": "Consumer Safety &",
    "consumer.title_highlight": "ISI Mark Verification Hub",
    "consumer.subtitle":
      "Verify ISI Mark CM/L licence numbers, detect counterfeit markings, access grievance channels.",
    "consumer.helpline_badge": "Toll-Free Consumer Helpline",
    "consumer.helpline_number": "1800-11-4000",
    "consumer.verify_tag": "Licence Authentication",
    "consumer.verify_title": "Verify ISI Mark CM/L Number",
    "consumer.verify_subtitle":
      "Enter the 7 or 8-digit numeric licence code beneath the ISI triangular logo.",
    "consumer.verify_placeholder":
      "Enter 7 or 8-digit CM/L Number (e.g. 1454301)",
    "consumer.btn_check": "Check Licence Structure",
    "consumer.checklist_auth": "Authenticity Verification Checklist:",
    "consumer.checklist_fraud": "Red Flag Fraud Indicators:",
    "consumer.link_biscare": "Download Official BIS Care Citizen App",
    "consumer.complaint_title": "How to Lodge a Counterfeit Complaint",
    "consumer.complaint_desc":
      "Submit an anonymous report to BIS Enforcement Branch via the BIS Care App or e-BIS portal.",
    "consumer.categories_title": "Key Mandatory Consumer Categories",
    "consumer.categories_desc":
      "Products that strictly require the ISI Mark before retail sale in India:",
    "consumer.cat_packaged_water": "Packaged Drinking Water",
    "consumer.cat_cement": "Cement",
    "consumer.cat_steel_tmt": "Steel TMT Bars",
    "consumer.cat_pvc_pipes": "PVC Pipes",
    "consumer.cat_electrical": "Electrical Appliances",
    "consumer.cat_food_dairy": "Food & Dairy Products",
    "consumer.cat_lpg": "LPG Cylinders",
    "consumer.cat_gold": "Gold Jewellery",
    "footer.description":
      "AI-Powered Decision-Support Platform for Indian Standards, Certification Schemes, Laboratory Testing, and Hallmarking.",
    "footer.tagline": "Retrieve First → Reason Second → Cite Everything",
    "footer.portals_title": "BIS Portals",
    "footer.ebis": "e-BIS Portal",
    "footer.manakonline": "Manakonline (Scheme I)",
    "footer.crs": "CRS Portal (Electronics)",
    "footer.nabl": "NABL Directory",
    "footer.modules_title": "Core Modules",
    "footer.find_standard": "Find My Standard",
    "footer.certification": "Certification Schemes",
    "footer.testing": "Testing Requirements",
    "footer.labs": "Recognized Labs Finder",
    "footer.hallmarking": "Gold & Silver Hallmarking",
    "footer.legal_title": "Legal & Quality Notice",
    "footer.legal_text":
      "Information provided is grounded in published Indian Standards and Gazette notifications. Formal legal compliance requires certification grant through official BIS portals.",
    "footer.admin_link": "Admin & Evaluation Console →",
    "footer.copyright":
      "BIS Saarthi. Built for Indian Industry, MSMEs & Citizens.",
    "footer.consumer_grievance": "Consumer Grievance",
    "footer.ai_support": "AI Decision Support",
    "prompts.industry.1":
      "I manufacture stainless steel water bottles. Which standard applies?",
    "prompts.industry.2":
      "Do I need BIS certification for Lithium-ion power banks?",
    "prompts.industry.3":
      "What tests are required for TMT steel bars under IS 1786?",
    "prompts.industry.4":
      "What is the factory audit and sample testing process for Scheme-I?",
    "prompts.industry.5":
      "FMCS guidelines for foreign manufacturers exporting to India",
    "prompts.industry.6":
      "Required lab testing equipment for IS 302 electrical appliances",
    "prompts.consumer.1":
      "How do I verify a gold jewellery hallmark with 6-digit HUID?",
    "prompts.consumer.2":
      "How can I check whether an ISI mark on packaged water is genuine?",
    "prompts.consumer.3":
      "How to file a consumer grievance against defective ISI certified goods?",
    "prompts.consumer.4":
      "Difference between BIS Hallmark and 916 purity mark.",
    "prompts.consumer.5": "Is BIS registration mandatory for smart phones?",
    "prompts.consumer.6":
      "How to verify R-number on electronics under CRS scheme?",
    "prompts.student.1":
      "Explain IS 10500 Clause 4.2 drinking water TDS & heavy metal limits",
    "prompts.student.2":
      "Comparative analysis between IS 456 standards and Eurocode 2",
    "prompts.student.3": "What are the latest amendments to NBC 2016?",
    "prompts.student.4":
      "Search technical clauses for tensile and elongation requirements in IS 2062",
    "prompts.student.5":
      "Evolution of energy efficiency and BEE star rating test protocols in IS 1391",
    "prompts.student.6":
      "Standard testing methods for cement compressive strength under IS 4031",
    "prompts.admin.1":
      "What are the active Quality Control Orders (QCOs) in effect?",
    "prompts.admin.2":
      "Audit compliance checklist for BIS recognized testing laboratories",
    "prompts.admin.3":
      "Standards revision roadmap and committee review process",
  },
  [IndianLanguage.MNI]: {
    "nav.standards": "স্তেন্দার্দশিং",
    "nav.find_standard": "নহাক্কী স্তেন্দার্দ থিবীযু",
    "nav.catalogue": "স্তেন্দার্দ লীস্ত",
    "nav.certification": "সর্তিফিকেসন",
    "nav.testing": "তেস্তিং",
    "nav.labs": "লেবোরেতোরীশিং",
    "nav.hallmark": "হোলমার্ক",
    "nav.consumer": "কঞ্জ্যুমার ঙাক-শেন",
    "nav.reports": "রিপোর্তশিং",
    "nav.ask_bis_ai": "BIS AI দা হংবীয়ু",
    "nav.ask_ai": "হংবীয়ু AI",
    "hero.title":
      "ইন্দিয়ান স্তেন্দার্দ অমসুং BIS সর্ভিসশিংগীদমক নহাক্কী AI মতেংপাংবা",
    "hero.subtitle": "অচুম্বা স্তেন্দার্দ থিবীযু, সর্তিফিকেসন প্রসেস খঙবীয়ু।",
    "hero.select_profile": "নহাক্কী প্রোফাইল মোদ খনবীযু:",
    "hero.search_placeholder": "পোত্থোক্কী স্তেন্দার্দশিংগী মরমদা হংবীয়ু...",
    "hero.ask_ai_btn": "হংবীয়ু AI",
    "hero.suggested_queries": "হংবা য়াবা ৱাহংশিং:",
    "chat.new_session": "+ অনৌবা চেত সেসন",
    "chat.specialized_tools": "BIS অখন্নবা খুৎলাইশিং",
    "chat.find_standard": "ঐগী স্তেন্দার্দ থিবীয়ু",
    "chat.certification_schemes": "সর্তিফিকেসন স্কিমশিং",
    "chat.testing_requirements": "তেস্তিংগী তঙাইফদবশিং",
    "chat.find_lab": "শকখঙলবা লেব থিবীয়ু",
    "chat.generate_report": "কমপ্লাইন্স রিপোর্ত শেম্বীয়ু",
    "chat.active_workspace": "একতিভ ৱার্কস্পেস",
    "chat.current_investigation": "হৌজিক্কী থিজিনবা",
    "chat.grounded_active": "প্রমাণ য়াওবা রিত্রাইভেল চত্থরি",
    "chat.grounded_desc": "গেজেত নোতিফিকেসন্দগী চেক তৌরবা পাউখুমশিং।",
    "chat.conversation_title": "BIS সারথী ৱারী-ৱাতাই",
    "chat.mode": "মোদ:",
    "chat.language_label": "লোন:",
    "chat.evidence_panel_btn": "প্রমাণ পেনেল",
    "chat.welcome_title": "BIS সারথী — প্রমাণ য়াওবা ৱারেপ লৌবগী এসিস্তেন্ত",
    "chat.input_placeholder":
      "স্তেন্দার্দশিং, সর্তিফিকেসন, তেস্তিং মেথদশিংগী মরমদা হংবীয়ু...",
    "chat.send_btn": "থাবীয়ু",
    "chat.answer_language": "পাউখুমগী লোন",
    "chat.detected_language": "খঙদোক্লবা লোন",
    "chat.evidence_panel": "অচুম্বা প্রমাণ অমসুং সাইতেসনশিং",
    "chat.confidence": "থাজবগী থাক",
    "chat.source_freshness": "চেক তৌরবা হৌফম",
    "chat.searching_status": "BIS দিপোজিৎতা থিরি অমসুং ক্লজশিং লৌথোক্লি...",
    "chat.traceable_citations": "থেংনবা য়াবা অচুম্বা সাইতেসনশিং:",
    "chat.copy_answer": "পাউখুম কোপি তৌবীয়ু",
    "chat.copied": "কোপি তৌরে",
    "chat.helpful": "কান্নবা পাউখুম",
    "chat.not_helpful": "কান্নদে",
    "chat.report_citation": "লানবা সাইতেসন রিপোর্ত তৌবীয়ু",
    "chat.disclaimer":
      "অচুম্বা ৱাফমগী গ্যারান্তী: BIS সারথীনা তশেংবা স্তেন্দার্দশিং খক্তা পীরি।",
    "chat.bis_act_compliant": "BIS এক্ত ২০১৬ গী মতুংইন্না",
    "evidence.title": "অচুম্বা প্রমাণ অমসুং সাইতেসনশিং",
    "evidence.indian_standard": "ইন্দিয়ান স্তেন্দার্দ",
    "evidence.clause": "ক্লজ:",
    "evidence.page": "লমাই:",
    "evidence.publication": "ফোঙখিবা তারিখ:",
    "evidence.relevance": "মরী লৈনবা:",
    "evidence.freshness_notice": "অনৌবা পাউ:",
    "evidence.verbatim_excerpt": "স্তেন্দার্দ ক্লজকী অশেংবা শরুক",
    "evidence.copy_excerpt": "ক্লজ কোপি তৌবীয়ু",
    "evidence.copied": "কোপি তৌরে",
    "evidence.view_source": "অফিসিয়েল BIS পোর্তেলদা য়েংবীয়ু",
    "evidence.no_evidence_title": "অমাখক প্রমাণ য়াওদে",
    "evidence.no_evidence_desc":
      "BIS স্তেন্দার্দ ক্লজশিং য়েংনবগীদমক ৱাহং অমা হংবীয়ু নত্রগা স্তেন্দার্দ খনবীয়ু।",
    "common.loading": "পাউখুম শেম-শারি...",
    "common.error": "প্রসেস তৌবা ঙমদ্রে।",

    "header.subtitle": "Indian Standards Intelligence",
    "home.how_subtitle_prefix": "Strict adherence to",
    "home.how_subtitle_bold":
      '"Retrieve First → Reason Second → Cite Everything"',
    "home.mode_industry": "Industry / MSME",
    "home.mode_consumer": "Consumer",
    "home.mode_student": "Student / Researcher",
    "home.mode_admin": "Admin & Regulatory",
    "home.mode_consumer_placeholder":
      "Check gold hallmark HUID, verify ISI mark...",
    "home.mode_student_placeholder":
      "Search standard clauses, comparative analysis...",
    "home.mode_admin_placeholder":
      "Search standards, schemes, reports, or guidelines...",
    "home.features_title": "Bureau of Indian Standards Intelligence",
    "home.features_subtitle":
      "Structured modules for manufacturers, compliance officers, consumers.",
    "home.features_find_title": "Find My Standard Workflow",
    "home.features_find_badge": "AI Profiler",
    "home.features_find_tag": "Product Matching",
    "home.features_find_desc":
      "Step-by-step product profiler matching your product to Indian Standards.",
    "home.features_find_action": "Start Profiler →",
    "home.features_cert_title": "Certification Schemes & Roadmap",
    "home.features_cert_badge": "ISI & CRS",
    "home.features_cert_tag": "Audit & FMCS",
    "home.features_cert_desc":
      "Navigate Scheme I (ISI Mark), Scheme II (CRS), Scheme IV, and FMCS.",
    "home.features_cert_action": "Explore Schemes →",
    "home.features_testing_title": "Testing Requirements & Clauses",
    "home.features_testing_badge": "Clauses",
    "home.features_testing_tag": "Sampling Schedules",
    "home.features_testing_desc":
      "Acceptance criteria, sampling rules, and testing equipment from Indian Standards.",
    "home.features_testing_action": "Inspect Test Schedules →",
    "home.features_labs_title": "BIS Recognized Laboratories Finder",
    "home.features_labs_badge": "Lab Network",
    "home.features_labs_tag": "NABL & BIS Facilities",
    "home.features_labs_desc":
      "Filter NABL and BIS recognized labs by IS number, state, and city.",
    "home.features_labs_action": "Locate Accredited Lab →",
    "home.features_hallmark_title": "Gold & Silver Hallmarking Assistant",
    "home.features_hallmark_badge": "HUID Check",
    "home.features_hallmark_tag": "Purity & Assaying",
    "home.features_hallmark_desc":
      "Verify 6-digit HUID codes and understand gold/silver purity grades.",
    "home.features_hallmark_action": "Hallmarking Guidance →",
    "home.features_consumer_title": "Consumer Protection & ISI Check",
    "home.features_consumer_badge": "Verify & Report",
    "home.features_consumer_tag": "Grievance Redressal",
    "home.features_consumer_desc":
      "Verify ISI Mark CM/L licence numbers, spot counterfeits.",
    "home.features_consumer_action": "Consumer Hub →",
    "home.how_title": "How BIS Saarthi Works",
    "home.how_badge": "Architecture & Verification Pipeline",
    "home.how_step1_title": "Ask Query",
    "home.how_step1_desc":
      "Query in English, Hindi, or any of 22 Scheduled Indian Languages.",
    "home.how_step2_title": "Retrieve",
    "home.how_step2_desc":
      "Hybrid BM25 + Vector semantic search across BIS repository.",
    "home.how_step3_title": "Verify",
    "home.how_step3_desc":
      "Cross-encoder reranking & source freshness verification.",
    "home.how_step4_title": "Explain",
    "home.how_step4_desc":
      "Clear plain-language guidance distinguished from statutory clauses.",
    "home.how_step5_title": "Cite",
    "home.how_step5_desc":
      "Every claim traceable to standard number, clause, page, and link.",
    "home.trust_badge": "Zero Hallucination Operational Standard",
    "home.trust_title": "Trusted by MSMEs, Compliance Teams & Citizens",
    "home.trust_desc":
      "BIS Saarthi never invents Indian Standard numbers, test clauses, or lab recognition statuses.",
    "home.trust_action": "Launch AI Workspace →",
    "standards.badge": "Bureau of Indian Standards Repository",
    "standards.title": "Indian Standards Directory & Search",
    "standards.subtitle":
      "Search authoritative Indian Standards, mandatory QCOs, and testing clause schedules.",
    "standards.search_placeholder": "Search by IS number or keyword...",
    "standards.search_btn": "Search",
    "standards.filter_division": "Division:",
    "standards.filter_all": "All Divisions",
    "standards.filter_mandatory": "Mandatory QCO Only",
    "standards.div_mech": "Mechanical Engineering",
    "standards.div_civil": "Civil Engineering",
    "standards.div_electro": "Electrotechnical",
    "standards.div_met": "Metallurgical Engineering",
    "standards.div_food": "Food and Agriculture",
    "standards.loading_msg": "Retrieving Standards from BIS Repository...",
    "standards.loading_sub":
      "Applying division filters and QCO regulatory scopes...",
    "standards.empty_title": "No Indian Standards Found",
    "standards.empty_desc":
      "Try broadening your search query or reset the filters.",
    "standards.empty_action": "Reset Filters",
    "findstd.badge": "AI Product Scope Profiler",
    "findstd.title_prefix": "Find Applicable",
    "findstd.title_highlight": "Indian Standard",
    "findstd.subtitle":
      "Input product specifications and get matched Indian Standards.",
    "findstd.anti_badge": "Anti-Speculation Standard",
    "findstd.anti_desc":
      "Verify final grade classification against statutory QCOs.",
    "findstd.form_title": "Product Specification Form",
    "findstd.form_subtitle":
      "Provide as many details as possible for precise standard matching.",
    "findstd.field_product": "Product Name / Type",
    "findstd.field_material": "Raw Material Composition",
    "findstd.field_application": "Intended Application / Usage",
    "findstd.field_industry": "Industry / Domain Sector",
    "findstd.field_capacity": "Capacity / Size",
    "findstd.field_techspec": "Technical Specifications",
    "findstd.placeholder_product":
      "e.g. Stainless steel water bottle, PVC cable, TMT bar",
    "findstd.placeholder_material": "e.g. SS 304, Aluminium alloy",
    "findstd.placeholder_application":
      "e.g. Drinking water storage, building construction",
    "findstd.placeholder_industry":
      "e.g. Metallurgical, Food & Agriculture, Civil",
    "findstd.placeholder_capacity": "e.g. 750 ml, 1.1kV, 12mm",
    "findstd.placeholder_techspec":
      "e.g. Voltage rating 1.1kV, double wall insulation",
    "findstd.btn_evaluate": "Evaluate Applicable Standards",
    "findstd.btn_clear": "Clear",
    "findstd.btn_sample": "Run Sample Evaluation",
    "findstd.results_title": "Evaluated Indian Standards",
    "findstd.results_complete": "Grounded Assessment Completed",
    "findstd.loading_msg": "Evaluating Product-to-Standard Scope...",
    "findstd.loading_sub":
      "Scanning Gazette notifications and material grade parameters...",
    "findstd.empty_title": "No Profile Evaluated Yet",
    "findstd.empty_desc":
      "Fill in the product specification form and click Evaluate.",
    "testing.badge": "Statutory Testing Schedules",
    "testing.title": "Indian Standards Testing Requirements",
    "testing.subtitle":
      "Inspect mandatory routine tests, acceptance criteria, and sampling rules.",
    "testing.filter_placeholder":
      "Filter by Standard Number (e.g. IS 17526, IS 10500)...",
    "testing.btn_filter": "Filter Tests",
    "testing.btn_showall": "Show All Tests",
    "testing.loading_msg":
      "Retrieving Testing Clauses & Acceptance Parameters...",
    "testing.loading_sub":
      "Cross-referencing laboratory test methods and sampling frequencies...",
    "testing.empty_title": "No Testing Requirements Found",
    "testing.empty_desc": "Try searching with IS 17526, IS 10500, or IS 1786.",
    "labs.badge": "Accredited Testing Infrastructure",
    "labs.title": "Find a BIS Recognized Laboratory",
    "labs.subtitle":
      "Search NABL and BIS recognized testing labs across Indian states.",
    "labs.search_placeholder":
      "Search by Indian Standard (e.g. IS 17526, IS 14543)...",
    "labs.btn_filter": "Filter Labs",
    "labs.filter_state": "State:",
    "labs.filter_allstates": "All States",
    "labs.loading_msg": "Locating Recognized Testing Laboratories...",
    "labs.loading_sub": "Matching accredited testing parameters...",
    "labs.empty_title": "No Laboratories Found",
    "labs.empty_desc":
      "Try removing the standard filter or choosing All States.",
    "labs.empty_action": "View All Laboratories",
    "hallmarking.badge": "Precious Metals Purity Assurance",
    "hallmarking.title_prefix": "Gold & Silver",
    "hallmarking.title_highlight": "Hallmarking Assistant",
    "hallmarking.subtitle":
      "Understand fineness grades, verify HUID codes, locate hallmarking centres.",
    "hallmarking.mandate_badge": "BIS Hallmarking Mandate",
    "hallmarking.mandate_desc":
      "Mandatory hallmarking operative across notified districts.",
    "hallmarking.3marks_title": "The 3 Mandatory Marks on Gold Jewellery",
    "hallmarking.3marks_note": "Operative since July 2021",
    "hallmarking.verify_tag": "Consumer Verification Tool",
    "hallmarking.verify_title": "Verify 6-Digit Alphanumeric HUID Structure",
    "hallmarking.verify_subtitle":
      "Test any 6-digit HUID code before buying jewellery.",
    "hallmarking.verify_placeholder": "Enter 6-character HUID (e.g. A1B2C3)",
    "hallmarking.btn_validate": "Validate Format",
    "hallmarking.verify_howto": "How to verify on BIS Care App:",
    "hallmarking.verify_safety": "Consumer Safety & Rights Tips:",
    "hallmarking.grades_title":
      "Official Gold & Silver Fineness Grades (IS 1417 & IS 2112)",
    "hallmarking.comp_badge": "Statutory 2X Compensation Policy",
    "hallmarking.comp_title": "Consumer Protection Guarantee",
    "hallmarking.loading_msg":
      "Loading Hallmarking Standards & Fineness Schedules...",
    "hallmarking.loading_sub":
      "Retrieving IS 1417 and IS 2112 statutory markings...",
    "reports.badge": "Decision Support Deliverable",
    "reports.title": "BIS Compliance Roadmap Report",
    "reports.btn_print": "Print / Save as PDF",
    "reports.doc_header": "Government Compliance Assessment Document",
    "reports.doc_title": "BIS Product Compliance & Conformity Roadmap",
    "reports.section1": "1. Target Product Profile",
    "reports.label_product": "Product Evaluated:",
    "reports.label_primarystd": "Primary Applicable Standard:",
    "reports.section2": "2. Applicable Indian Standards & QCO Mandates",
    "reports.tag_mandatory": "Mandatory",
    "reports.label_regulatory": "Regulatory Notification:",
    "reports.section3": "3. Applicable BIS Certification Scheme",
    "reports.label_validity": "Validity:",
    "reports.label_surveillance": "Surveillance:",
    "reports.section4": "4. Mandatory Testing Requirements",
    "reports.col_test": "Test Parameter",
    "reports.col_clause": "Standard Clause",
    "reports.col_type": "Type",
    "reports.col_sampling": "Sampling Rule",
    "reports.section5": "5. Recommended Testing Laboratories",
    "reports.section6": "6. Statutory Documentation Checklist",
    "reports.section7": "Key Statutory Compliance Pitfalls:",
    "reports.disclaimer_title": "Authoritative Compliance Notice:",
    "reports.loading_msg": "Synthesizing BIS Compliance Assessment Report...",
    "reports.loading_sub":
      "Compiling applicable standards, testing schedules, and statutory evidence...",
    "certification.badge": "BIS Conformity Assessment Schemes",
    "certification.title": "Certification Schemes & Compliance Roadmap",
    "certification.subtitle":
      "Understand statutory conformity schemes, factory audits, and licence grant procedures.",
    "certification.btn_report": "Generate Full Compliance Report",
    "certification.active_product": "Active Product Roadmap:",
    "certification.btn_change": "Change Product Profile →",
    "certification.roadmap_title":
      "Interactive Step-by-Step Certification Journey",
    "certification.phases": "Phases",
    "certification.details_tag": "Scheme Details",
    "certification.docs_title": "Statutory Documents Required:",
    "certification.fee_title": "Fee Structure:",
    "certification.validity": "Validity:",
    "certification.surveillance": "Surveillance:",
    "certification.link_official": "Official Manakonline / CRS Portal",
    "certification.loading_msg": "Loading Certification Scheme Requirements...",
    "certification.loading_sub":
      "Compiling documentation checklists and audit schedules...",
    "consumer.badge": "Citizen & Consumer Protection",
    "consumer.title_prefix": "Consumer Safety &",
    "consumer.title_highlight": "ISI Mark Verification Hub",
    "consumer.subtitle":
      "Verify ISI Mark CM/L licence numbers, detect counterfeit markings, access grievance channels.",
    "consumer.helpline_badge": "Toll-Free Consumer Helpline",
    "consumer.helpline_number": "1800-11-4000",
    "consumer.verify_tag": "Licence Authentication",
    "consumer.verify_title": "Verify ISI Mark CM/L Number",
    "consumer.verify_subtitle":
      "Enter the 7 or 8-digit numeric licence code beneath the ISI triangular logo.",
    "consumer.verify_placeholder":
      "Enter 7 or 8-digit CM/L Number (e.g. 1454301)",
    "consumer.btn_check": "Check Licence Structure",
    "consumer.checklist_auth": "Authenticity Verification Checklist:",
    "consumer.checklist_fraud": "Red Flag Fraud Indicators:",
    "consumer.link_biscare": "Download Official BIS Care Citizen App",
    "consumer.complaint_title": "How to Lodge a Counterfeit Complaint",
    "consumer.complaint_desc":
      "Submit an anonymous report to BIS Enforcement Branch via the BIS Care App or e-BIS portal.",
    "consumer.categories_title": "Key Mandatory Consumer Categories",
    "consumer.categories_desc":
      "Products that strictly require the ISI Mark before retail sale in India:",
    "consumer.cat_packaged_water": "Packaged Drinking Water",
    "consumer.cat_cement": "Cement",
    "consumer.cat_steel_tmt": "Steel TMT Bars",
    "consumer.cat_pvc_pipes": "PVC Pipes",
    "consumer.cat_electrical": "Electrical Appliances",
    "consumer.cat_food_dairy": "Food & Dairy Products",
    "consumer.cat_lpg": "LPG Cylinders",
    "consumer.cat_gold": "Gold Jewellery",
    "footer.description":
      "AI-Powered Decision-Support Platform for Indian Standards, Certification Schemes, Laboratory Testing, and Hallmarking.",
    "footer.tagline": "Retrieve First → Reason Second → Cite Everything",
    "footer.portals_title": "BIS Portals",
    "footer.ebis": "e-BIS Portal",
    "footer.manakonline": "Manakonline (Scheme I)",
    "footer.crs": "CRS Portal (Electronics)",
    "footer.nabl": "NABL Directory",
    "footer.modules_title": "Core Modules",
    "footer.find_standard": "Find My Standard",
    "footer.certification": "Certification Schemes",
    "footer.testing": "Testing Requirements",
    "footer.labs": "Recognized Labs Finder",
    "footer.hallmarking": "Gold & Silver Hallmarking",
    "footer.legal_title": "Legal & Quality Notice",
    "footer.legal_text":
      "Information provided is grounded in published Indian Standards and Gazette notifications. Formal legal compliance requires certification grant through official BIS portals.",
    "footer.admin_link": "Admin & Evaluation Console →",
    "footer.copyright":
      "BIS Saarthi. Built for Indian Industry, MSMEs & Citizens.",
    "footer.consumer_grievance": "Consumer Grievance",
    "footer.ai_support": "AI Decision Support",
    "prompts.industry.1":
      "I manufacture stainless steel water bottles. Which standard applies?",
    "prompts.industry.2":
      "Do I need BIS certification for Lithium-ion power banks?",
    "prompts.industry.3":
      "What tests are required for TMT steel bars under IS 1786?",
    "prompts.industry.4":
      "What is the factory audit and sample testing process for Scheme-I?",
    "prompts.industry.5":
      "FMCS guidelines for foreign manufacturers exporting to India",
    "prompts.industry.6":
      "Required lab testing equipment for IS 302 electrical appliances",
    "prompts.consumer.1":
      "How do I verify a gold jewellery hallmark with 6-digit HUID?",
    "prompts.consumer.2":
      "How can I check whether an ISI mark on packaged water is genuine?",
    "prompts.consumer.3":
      "How to file a consumer grievance against defective ISI certified goods?",
    "prompts.consumer.4":
      "Difference between BIS Hallmark and 916 purity mark.",
    "prompts.consumer.5": "Is BIS registration mandatory for smart phones?",
    "prompts.consumer.6":
      "How to verify R-number on electronics under CRS scheme?",
    "prompts.student.1":
      "Explain IS 10500 Clause 4.2 drinking water TDS & heavy metal limits",
    "prompts.student.2":
      "Comparative analysis between IS 456 standards and Eurocode 2",
    "prompts.student.3": "What are the latest amendments to NBC 2016?",
    "prompts.student.4":
      "Search technical clauses for tensile and elongation requirements in IS 2062",
    "prompts.student.5":
      "Evolution of energy efficiency and BEE star rating test protocols in IS 1391",
    "prompts.student.6":
      "Standard testing methods for cement compressive strength under IS 4031",
    "prompts.admin.1":
      "What are the active Quality Control Orders (QCOs) in effect?",
    "prompts.admin.2":
      "Audit compliance checklist for BIS recognized testing laboratories",
    "prompts.admin.3":
      "Standards revision roadmap and committee review process",
  },
  [IndianLanguage.SAT]: {
    "nav.standards": "ᱢᱟᱱᱚᱠ",
    "nav.find_standard": "ᱟᱢᱟᱜ ᱢᱟᱱᱚᱠ ᱧᱟᱢ ᱢᱮ",
    "nav.catalogue": "ᱢᱟᱱᱚᱠ ᱛᱟᱹᱞᱠᱟᱹ",
    "nav.certification": "ᱯᱨᱚᱢᱟᱬᱚᱱ",
    "nav.testing": "ᱵᱤᱰᱟᱹᱣ",
    "nav.labs": "ᱵᱤᱰᱟᱹᱣ ᱚᱲᱟᱜ",
    "nav.hallmark": "ᱦᱚᱞᱢᱟᱨᱠ",
    "nav.consumer": "ᱠᱤᱨᱤᱧᱤᱡ ᱨᱩᱠᱷᱤᱭᱟᱹ",
    "nav.reports": "ᱨᱤᱯᱚᱨᱴ",
    "nav.ask_bis_ai": "BIS AI ᱠᱩᱞᱤᱭᱮᱢ",
    "nav.ask_ai": "ᱠᱩᱞᱤᱭᱮᱢ AI",
    "hero.title": "ᱵᱷᱟᱨᱚᱛ ᱨᱮᱱᱟᱜ ᱢᱟᱱᱚᱠ ᱟᱨ BIS ᱥᱮᱵᱟ ᱞᱟᱹᱜᱤᱫ ᱟᱢᱟᱜ AI ᱜᱚᱲᱚᱭᱤᱡ",
    "hero.subtitle":
      "ᱥᱟᱹᱨᱤ ᱢᱟᱱᱚᱠ ᱯᱟᱱᱛᱮ ᱧᱟᱢ ᱢᱮ, ᱯᱨᱚᱢᱟᱬᱚᱱ ᱵᱩᱡᱷᱟᱹᱣ ᱢᱮ ᱟᱨ ᱦᱚᱞᱢᱟᱨᱠᱤᱝ ᱯᱟᱨᱠᱷᱟᱣ ᱢᱮ᱾",
    "hero.select_profile": "ᱟᱢᱟᱜ ᱯᱨᱚᱯᱷᱟᱭᱤᱞ ᱵᱟᱪᱷᱟᱣ ᱢᱮ:",
    "hero.search_placeholder": "ᱡᱤᱱᱤᱥ ᱨᱮᱱᱟᱜ ᱢᱟᱱᱚᱠ ᱵᱟᱵᱚᱛ ᱠᱩᱞᱤ ᱢᱮ...",
    "hero.ask_ai_btn": "ᱠᱩᱞᱤ ᱢᱮ AI",
    "hero.suggested_queries": "ᱥᱩᱡᱷᱟᱹᱣ ᱠᱩᱠᱞᱤ:",
    "chat.new_session": "+ ᱱᱟᱶᱟ ᱪᱮᱴ ᱥᱮᱥᱚᱱ",
    "chat.specialized_tools": "BIS ᱵᱤᱥᱮᱥ ᱦᱟᱹᱛᱭᱟᱹᱨ",
    "chat.find_standard": "ᱤᱧᱟᱜ ᱢᱟᱱᱚᱠ ᱯᱟᱱᱛᱮᱭ ᱢᱮ",
    "chat.certification_schemes": "ᱯᱨᱚᱢᱟᱬᱚᱱ ᱡᱚᱡᱚᱱᱟ",
    "chat.testing_requirements": "ᱵᱤᱰᱟᱹᱣ ᱞᱟᱹᱠᱛᱤ",
    "chat.find_lab": "ᱢᱟᱹᱱ ᱧᱟᱢ ᱵᱤᱰᱟᱹᱣ ᱚᱲᱟᱜ ᱧᱟᱢ ᱢᱮ",
    "chat.generate_report": "ᱠᱚᱢᱯᱞᱟᱭᱮᱱᱥ ᱨᱤᱯᱚᱨᱴ ᱛᱮᱭᱟᱨ ᱢᱮ",
    "chat.active_workspace": "ᱠᱟᱹᱢᱤᱦᱚᱨᱟ ᱡᱟᱭᱜᱟ",
    "chat.current_investigation": "ᱱᱤᱛᱚᱜᱟᱜ ᱯᱟᱱᱛᱮ",
    "chat.grounded_active": "ᱥᱟᱹᱠᱷᱤ ᱪᱮᱛᱟᱱ ᱥᱮᱸᱫᱽᱨᱟ ᱪᱟᱹᱞᱩ",
    "chat.grounded_desc": "ᱥᱚᱨᱠᱟᱨᱤ ᱜᱮᱡᱮᱴ ᱠᱷᱚᱱ ᱯᱟᱨᱠᱷᱟᱣ ᱛᱮᱞᱟ᱾",
    "chat.conversation_title": "BIS ᱥᱟᱨᱛᱷᱤ ᱨᱚᱯᱚᱲ",
    "chat.mode": "ᱢᱳᱰ:",
    "chat.language_label": "ᱯᱟᱹᱨᱥᱤ:",
    "chat.evidence_panel_btn": "ᱥᱟᱹᱠᱷᱤ ᱯᱮᱱᱮᱞ",
    "chat.welcome_title": "BIS ᱥᱟᱨᱛᱷᱤ — ᱥᱟᱹᱠᱷᱤ ᱪᱮᱛᱟᱱ ᱜᱚᱲᱚᱭᱤᱡ",
    "chat.input_placeholder": "ᱢᱟᱱᱚᱠ, ᱯᱨᱚᱢᱟᱬᱚᱱ, ᱵᱤᱰᱟᱹᱣ ᱰᱟᱦᱟᱨ ᱵᱟᱵᱚᱛ ᱠᱩᱞᱤ ᱢᱮ...",
    "chat.send_btn": "ᱠᱩᱞ ᱢᱮ",
    "chat.answer_language": "ᱛᱮᱞᱟ ᱨᱮᱱᱟᱜ ᱯᱟᱹᱨᱥᱤ",
    "chat.detected_language": "ᱪᱤᱱᱦᱟᱹᱣ ᱯᱟᱹᱨᱥᱤ",
    "chat.evidence_panel": "ᱥᱟᱹᱨᱤ ᱥᱟᱹᱠᱷᱤ ᱟᱨ ᱩᱫᱷᱨᱚᱬ",
    "chat.confidence": "ᱯᱟᱹᱛᱭᱟᱹᱣ ᱛᱷᱟᱠ",
    "chat.source_freshness": "ᱯᱟᱨᱠᱷᱟᱣ ᱯᱷᱮᱰᱟᱛ",
    "chat.searching_status": "BIS ᱨᱮ ᱯᱟᱱᱛᱮ ᱟᱨ ᱫᱷᱟᱨᱟ ᱩᱰᱩᱠᱚᱜ ᱠᱟᱱᱟ...",
    "chat.traceable_citations": "ᱯᱟᱨᱠᱷᱟᱣ ᱜᱟᱱᱚᱜ ᱥᱟᱹᱨᱤ ᱦᱟᱹᱴᱤᱧ:",
    "chat.copy_answer": "ᱛᱮᱞᱟ ᱠᱚᱯᱤ ᱢᱮ",
    "chat.copied": "ᱠᱚᱯᱤ ᱮᱱᱟ",
    "chat.helpful": "ᱜᱚᱲᱚᱣᱟᱱ ᱛᱮᱞᱟ",
    "chat.not_helpful": "ᱵᱟᱝ ᱜᱚᱲᱚᱣᱟᱱ",
    "chat.report_citation": "ᱵᱷᱩᱞ ᱥᱟᱹᱠᱷᱤ ᱨᱤᱯᱚᱨᱴ ᱢᱮ",
    "chat.disclaimer": "ᱥᱟᱹᱨᱤ ᱠᱟᱛᱷᱟ: BIS ᱥᱟᱨᱛᱷᱤ ᱥᱟᱹᱨᱤ ᱢᱟᱱᱚᱠ ᱮᱢᱚᱜᱼᱟ᱾",
    "chat.bis_act_compliant": "BIS ᱟᱹᱭᱤᱱ ᱒᱐᱑᱖ ᱞᱮᱠᱟᱛᱮ",
    "evidence.title": "ᱥᱟᱹᱨᱤ ᱥᱟᱹᱠᱷᱤ ᱟᱨ ᱩᱫᱷᱨᱚᱬ",
    "evidence.indian_standard": "ᱵᱷᱟᱨᱚᱛ ᱢᱟᱱᱚᱠ",
    "evidence.clause": "ᱫᱷᱟᱨᱟ:",
    "evidence.page": "ᱥᱟᱠᱟᱢ:",
    "evidence.publication": "ᱩᱪᱷᱟᱹᱱ ᱢᱟᱹᱦᱤᱛ:",
    "evidence.relevance": "ᱥᱟᱹᱜᱟᱹᱭ:",
    "evidence.freshness_notice": "ᱱᱟᱶᱟ ᱵᱟᱰᱟᱭ:",
    "evidence.verbatim_excerpt": "ᱢᱩᱞ ᱢᱟᱱᱚᱠ ᱫᱷᱟᱨᱟ ᱦᱟᱹᱴᱤᱧ",
    "evidence.copy_excerpt": "ᱦᱟᱹᱴᱤᱧ ᱠᱚᱯᱤ ᱢᱮ",
    "evidence.copied": "ᱠᱚᱯᱤ ᱮᱱᱟ",
    "evidence.view_source": "ᱥᱚᱨᱠᱟᱨᱤ BIS ᱯᱳᱨᱴᱟᱞ ᱨᱮ ᱧᱮᱞ ᱢᱮ",
    "evidence.no_evidence_title": "ᱡᱟᱦᱟᱸᱱ ᱥᱟᱹᱠᱷᱤ ᱵᱟᱹᱱᱩᱜᱼᱟ",
    "evidence.no_evidence_desc":
      "BIS ᱢᱟᱱᱚᱠ ᱧᱮᱞ ᱞᱟᱹᱜᱤᱫ ᱠᱩᱠᱞᱤ ᱠᱩᱞᱤ ᱢᱮ ᱥᱮ ᱢᱟᱱᱚᱠ ᱵᱟᱪᱷᱟᱣ ᱢᱮ᱾",
    "common.loading": "ᱛᱮᱞᱟ ᱥᱟᱯᱲᱟᱣᱜ ᱠᱟᱱᱟ...",
    "common.error": "ᱠᱟᱹᱢᱤᱦᱚᱨᱟ ᱵᱟᱝ ᱦᱩᱭ ᱞᱮᱱᱟ᱾",

    "header.subtitle": "Indian Standards Intelligence",
    "home.how_subtitle_prefix": "Strict adherence to",
    "home.how_subtitle_bold":
      '"Retrieve First → Reason Second → Cite Everything"',
    "home.mode_industry": "Industry / MSME",
    "home.mode_consumer": "Consumer",
    "home.mode_student": "Student / Researcher",
    "home.mode_admin": "Admin & Regulatory",
    "home.mode_consumer_placeholder":
      "Check gold hallmark HUID, verify ISI mark...",
    "home.mode_student_placeholder":
      "Search standard clauses, comparative analysis...",
    "home.mode_admin_placeholder":
      "Search standards, schemes, reports, or guidelines...",
    "home.features_title": "Bureau of Indian Standards Intelligence",
    "home.features_subtitle":
      "Structured modules for manufacturers, compliance officers, consumers.",
    "home.features_find_title": "Find My Standard Workflow",
    "home.features_find_badge": "AI Profiler",
    "home.features_find_tag": "Product Matching",
    "home.features_find_desc":
      "Step-by-step product profiler matching your product to Indian Standards.",
    "home.features_find_action": "Start Profiler →",
    "home.features_cert_title": "Certification Schemes & Roadmap",
    "home.features_cert_badge": "ISI & CRS",
    "home.features_cert_tag": "Audit & FMCS",
    "home.features_cert_desc":
      "Navigate Scheme I (ISI Mark), Scheme II (CRS), Scheme IV, and FMCS.",
    "home.features_cert_action": "Explore Schemes →",
    "home.features_testing_title": "Testing Requirements & Clauses",
    "home.features_testing_badge": "Clauses",
    "home.features_testing_tag": "Sampling Schedules",
    "home.features_testing_desc":
      "Acceptance criteria, sampling rules, and testing equipment from Indian Standards.",
    "home.features_testing_action": "Inspect Test Schedules →",
    "home.features_labs_title": "BIS Recognized Laboratories Finder",
    "home.features_labs_badge": "Lab Network",
    "home.features_labs_tag": "NABL & BIS Facilities",
    "home.features_labs_desc":
      "Filter NABL and BIS recognized labs by IS number, state, and city.",
    "home.features_labs_action": "Locate Accredited Lab →",
    "home.features_hallmark_title": "Gold & Silver Hallmarking Assistant",
    "home.features_hallmark_badge": "HUID Check",
    "home.features_hallmark_tag": "Purity & Assaying",
    "home.features_hallmark_desc":
      "Verify 6-digit HUID codes and understand gold/silver purity grades.",
    "home.features_hallmark_action": "Hallmarking Guidance →",
    "home.features_consumer_title": "Consumer Protection & ISI Check",
    "home.features_consumer_badge": "Verify & Report",
    "home.features_consumer_tag": "Grievance Redressal",
    "home.features_consumer_desc":
      "Verify ISI Mark CM/L licence numbers, spot counterfeits.",
    "home.features_consumer_action": "Consumer Hub →",
    "home.how_title": "How BIS Saarthi Works",
    "home.how_badge": "Architecture & Verification Pipeline",
    "home.how_step1_title": "Ask Query",
    "home.how_step1_desc":
      "Query in English, Hindi, or any of 22 Scheduled Indian Languages.",
    "home.how_step2_title": "Retrieve",
    "home.how_step2_desc":
      "Hybrid BM25 + Vector semantic search across BIS repository.",
    "home.how_step3_title": "Verify",
    "home.how_step3_desc":
      "Cross-encoder reranking & source freshness verification.",
    "home.how_step4_title": "Explain",
    "home.how_step4_desc":
      "Clear plain-language guidance distinguished from statutory clauses.",
    "home.how_step5_title": "Cite",
    "home.how_step5_desc":
      "Every claim traceable to standard number, clause, page, and link.",
    "home.trust_badge": "Zero Hallucination Operational Standard",
    "home.trust_title": "Trusted by MSMEs, Compliance Teams & Citizens",
    "home.trust_desc":
      "BIS Saarthi never invents Indian Standard numbers, test clauses, or lab recognition statuses.",
    "home.trust_action": "Launch AI Workspace →",
    "standards.badge": "Bureau of Indian Standards Repository",
    "standards.title": "Indian Standards Directory & Search",
    "standards.subtitle":
      "Search authoritative Indian Standards, mandatory QCOs, and testing clause schedules.",
    "standards.search_placeholder": "Search by IS number or keyword...",
    "standards.search_btn": "Search",
    "standards.filter_division": "Division:",
    "standards.filter_all": "All Divisions",
    "standards.filter_mandatory": "Mandatory QCO Only",
    "standards.div_mech": "Mechanical Engineering",
    "standards.div_civil": "Civil Engineering",
    "standards.div_electro": "Electrotechnical",
    "standards.div_met": "Metallurgical Engineering",
    "standards.div_food": "Food and Agriculture",
    "standards.loading_msg": "Retrieving Standards from BIS Repository...",
    "standards.loading_sub":
      "Applying division filters and QCO regulatory scopes...",
    "standards.empty_title": "No Indian Standards Found",
    "standards.empty_desc":
      "Try broadening your search query or reset the filters.",
    "standards.empty_action": "Reset Filters",
    "findstd.badge": "AI Product Scope Profiler",
    "findstd.title_prefix": "Find Applicable",
    "findstd.title_highlight": "Indian Standard",
    "findstd.subtitle":
      "Input product specifications and get matched Indian Standards.",
    "findstd.anti_badge": "Anti-Speculation Standard",
    "findstd.anti_desc":
      "Verify final grade classification against statutory QCOs.",
    "findstd.form_title": "Product Specification Form",
    "findstd.form_subtitle":
      "Provide as many details as possible for precise standard matching.",
    "findstd.field_product": "Product Name / Type",
    "findstd.field_material": "Raw Material Composition",
    "findstd.field_application": "Intended Application / Usage",
    "findstd.field_industry": "Industry / Domain Sector",
    "findstd.field_capacity": "Capacity / Size",
    "findstd.field_techspec": "Technical Specifications",
    "findstd.placeholder_product":
      "e.g. Stainless steel water bottle, PVC cable, TMT bar",
    "findstd.placeholder_material": "e.g. SS 304, Aluminium alloy",
    "findstd.placeholder_application":
      "e.g. Drinking water storage, building construction",
    "findstd.placeholder_industry":
      "e.g. Metallurgical, Food & Agriculture, Civil",
    "findstd.placeholder_capacity": "e.g. 750 ml, 1.1kV, 12mm",
    "findstd.placeholder_techspec":
      "e.g. Voltage rating 1.1kV, double wall insulation",
    "findstd.btn_evaluate": "Evaluate Applicable Standards",
    "findstd.btn_clear": "Clear",
    "findstd.btn_sample": "Run Sample Evaluation",
    "findstd.results_title": "Evaluated Indian Standards",
    "findstd.results_complete": "Grounded Assessment Completed",
    "findstd.loading_msg": "Evaluating Product-to-Standard Scope...",
    "findstd.loading_sub":
      "Scanning Gazette notifications and material grade parameters...",
    "findstd.empty_title": "No Profile Evaluated Yet",
    "findstd.empty_desc":
      "Fill in the product specification form and click Evaluate.",
    "testing.badge": "Statutory Testing Schedules",
    "testing.title": "Indian Standards Testing Requirements",
    "testing.subtitle":
      "Inspect mandatory routine tests, acceptance criteria, and sampling rules.",
    "testing.filter_placeholder":
      "Filter by Standard Number (e.g. IS 17526, IS 10500)...",
    "testing.btn_filter": "Filter Tests",
    "testing.btn_showall": "Show All Tests",
    "testing.loading_msg":
      "Retrieving Testing Clauses & Acceptance Parameters...",
    "testing.loading_sub":
      "Cross-referencing laboratory test methods and sampling frequencies...",
    "testing.empty_title": "No Testing Requirements Found",
    "testing.empty_desc": "Try searching with IS 17526, IS 10500, or IS 1786.",
    "labs.badge": "Accredited Testing Infrastructure",
    "labs.title": "Find a BIS Recognized Laboratory",
    "labs.subtitle":
      "Search NABL and BIS recognized testing labs across Indian states.",
    "labs.search_placeholder":
      "Search by Indian Standard (e.g. IS 17526, IS 14543)...",
    "labs.btn_filter": "Filter Labs",
    "labs.filter_state": "State:",
    "labs.filter_allstates": "All States",
    "labs.loading_msg": "Locating Recognized Testing Laboratories...",
    "labs.loading_sub": "Matching accredited testing parameters...",
    "labs.empty_title": "No Laboratories Found",
    "labs.empty_desc":
      "Try removing the standard filter or choosing All States.",
    "labs.empty_action": "View All Laboratories",
    "hallmarking.badge": "Precious Metals Purity Assurance",
    "hallmarking.title_prefix": "Gold & Silver",
    "hallmarking.title_highlight": "Hallmarking Assistant",
    "hallmarking.subtitle":
      "Understand fineness grades, verify HUID codes, locate hallmarking centres.",
    "hallmarking.mandate_badge": "BIS Hallmarking Mandate",
    "hallmarking.mandate_desc":
      "Mandatory hallmarking operative across notified districts.",
    "hallmarking.3marks_title": "The 3 Mandatory Marks on Gold Jewellery",
    "hallmarking.3marks_note": "Operative since July 2021",
    "hallmarking.verify_tag": "Consumer Verification Tool",
    "hallmarking.verify_title": "Verify 6-Digit Alphanumeric HUID Structure",
    "hallmarking.verify_subtitle":
      "Test any 6-digit HUID code before buying jewellery.",
    "hallmarking.verify_placeholder": "Enter 6-character HUID (e.g. A1B2C3)",
    "hallmarking.btn_validate": "Validate Format",
    "hallmarking.verify_howto": "How to verify on BIS Care App:",
    "hallmarking.verify_safety": "Consumer Safety & Rights Tips:",
    "hallmarking.grades_title":
      "Official Gold & Silver Fineness Grades (IS 1417 & IS 2112)",
    "hallmarking.comp_badge": "Statutory 2X Compensation Policy",
    "hallmarking.comp_title": "Consumer Protection Guarantee",
    "hallmarking.loading_msg":
      "Loading Hallmarking Standards & Fineness Schedules...",
    "hallmarking.loading_sub":
      "Retrieving IS 1417 and IS 2112 statutory markings...",
    "reports.badge": "Decision Support Deliverable",
    "reports.title": "BIS Compliance Roadmap Report",
    "reports.btn_print": "Print / Save as PDF",
    "reports.doc_header": "Government Compliance Assessment Document",
    "reports.doc_title": "BIS Product Compliance & Conformity Roadmap",
    "reports.section1": "1. Target Product Profile",
    "reports.label_product": "Product Evaluated:",
    "reports.label_primarystd": "Primary Applicable Standard:",
    "reports.section2": "2. Applicable Indian Standards & QCO Mandates",
    "reports.tag_mandatory": "Mandatory",
    "reports.label_regulatory": "Regulatory Notification:",
    "reports.section3": "3. Applicable BIS Certification Scheme",
    "reports.label_validity": "Validity:",
    "reports.label_surveillance": "Surveillance:",
    "reports.section4": "4. Mandatory Testing Requirements",
    "reports.col_test": "Test Parameter",
    "reports.col_clause": "Standard Clause",
    "reports.col_type": "Type",
    "reports.col_sampling": "Sampling Rule",
    "reports.section5": "5. Recommended Testing Laboratories",
    "reports.section6": "6. Statutory Documentation Checklist",
    "reports.section7": "Key Statutory Compliance Pitfalls:",
    "reports.disclaimer_title": "Authoritative Compliance Notice:",
    "reports.loading_msg": "Synthesizing BIS Compliance Assessment Report...",
    "reports.loading_sub":
      "Compiling applicable standards, testing schedules, and statutory evidence...",
    "certification.badge": "BIS Conformity Assessment Schemes",
    "certification.title": "Certification Schemes & Compliance Roadmap",
    "certification.subtitle":
      "Understand statutory conformity schemes, factory audits, and licence grant procedures.",
    "certification.btn_report": "Generate Full Compliance Report",
    "certification.active_product": "Active Product Roadmap:",
    "certification.btn_change": "Change Product Profile →",
    "certification.roadmap_title":
      "Interactive Step-by-Step Certification Journey",
    "certification.phases": "Phases",
    "certification.details_tag": "Scheme Details",
    "certification.docs_title": "Statutory Documents Required:",
    "certification.fee_title": "Fee Structure:",
    "certification.validity": "Validity:",
    "certification.surveillance": "Surveillance:",
    "certification.link_official": "Official Manakonline / CRS Portal",
    "certification.loading_msg": "Loading Certification Scheme Requirements...",
    "certification.loading_sub":
      "Compiling documentation checklists and audit schedules...",
    "consumer.badge": "Citizen & Consumer Protection",
    "consumer.title_prefix": "Consumer Safety &",
    "consumer.title_highlight": "ISI Mark Verification Hub",
    "consumer.subtitle":
      "Verify ISI Mark CM/L licence numbers, detect counterfeit markings, access grievance channels.",
    "consumer.helpline_badge": "Toll-Free Consumer Helpline",
    "consumer.helpline_number": "1800-11-4000",
    "consumer.verify_tag": "Licence Authentication",
    "consumer.verify_title": "Verify ISI Mark CM/L Number",
    "consumer.verify_subtitle":
      "Enter the 7 or 8-digit numeric licence code beneath the ISI triangular logo.",
    "consumer.verify_placeholder":
      "Enter 7 or 8-digit CM/L Number (e.g. 1454301)",
    "consumer.btn_check": "Check Licence Structure",
    "consumer.checklist_auth": "Authenticity Verification Checklist:",
    "consumer.checklist_fraud": "Red Flag Fraud Indicators:",
    "consumer.link_biscare": "Download Official BIS Care Citizen App",
    "consumer.complaint_title": "How to Lodge a Counterfeit Complaint",
    "consumer.complaint_desc":
      "Submit an anonymous report to BIS Enforcement Branch via the BIS Care App or e-BIS portal.",
    "consumer.categories_title": "Key Mandatory Consumer Categories",
    "consumer.categories_desc":
      "Products that strictly require the ISI Mark before retail sale in India:",
    "consumer.cat_packaged_water": "Packaged Drinking Water",
    "consumer.cat_cement": "Cement",
    "consumer.cat_steel_tmt": "Steel TMT Bars",
    "consumer.cat_pvc_pipes": "PVC Pipes",
    "consumer.cat_electrical": "Electrical Appliances",
    "consumer.cat_food_dairy": "Food & Dairy Products",
    "consumer.cat_lpg": "LPG Cylinders",
    "consumer.cat_gold": "Gold Jewellery",
    "footer.description":
      "AI-Powered Decision-Support Platform for Indian Standards, Certification Schemes, Laboratory Testing, and Hallmarking.",
    "footer.tagline": "Retrieve First → Reason Second → Cite Everything",
    "footer.portals_title": "BIS Portals",
    "footer.ebis": "e-BIS Portal",
    "footer.manakonline": "Manakonline (Scheme I)",
    "footer.crs": "CRS Portal (Electronics)",
    "footer.nabl": "NABL Directory",
    "footer.modules_title": "Core Modules",
    "footer.find_standard": "Find My Standard",
    "footer.certification": "Certification Schemes",
    "footer.testing": "Testing Requirements",
    "footer.labs": "Recognized Labs Finder",
    "footer.hallmarking": "Gold & Silver Hallmarking",
    "footer.legal_title": "Legal & Quality Notice",
    "footer.legal_text":
      "Information provided is grounded in published Indian Standards and Gazette notifications. Formal legal compliance requires certification grant through official BIS portals.",
    "footer.admin_link": "Admin & Evaluation Console →",
    "footer.copyright":
      "BIS Saarthi. Built for Indian Industry, MSMEs & Citizens.",
    "footer.consumer_grievance": "Consumer Grievance",
    "footer.ai_support": "AI Decision Support",
    "prompts.industry.1":
      "I manufacture stainless steel water bottles. Which standard applies?",
    "prompts.industry.2":
      "Do I need BIS certification for Lithium-ion power banks?",
    "prompts.industry.3":
      "What tests are required for TMT steel bars under IS 1786?",
    "prompts.industry.4":
      "What is the factory audit and sample testing process for Scheme-I?",
    "prompts.industry.5":
      "FMCS guidelines for foreign manufacturers exporting to India",
    "prompts.industry.6":
      "Required lab testing equipment for IS 302 electrical appliances",
    "prompts.consumer.1":
      "How do I verify a gold jewellery hallmark with 6-digit HUID?",
    "prompts.consumer.2":
      "How can I check whether an ISI mark on packaged water is genuine?",
    "prompts.consumer.3":
      "How to file a consumer grievance against defective ISI certified goods?",
    "prompts.consumer.4":
      "Difference between BIS Hallmark and 916 purity mark.",
    "prompts.consumer.5": "Is BIS registration mandatory for smart phones?",
    "prompts.consumer.6":
      "How to verify R-number on electronics under CRS scheme?",
    "prompts.student.1":
      "Explain IS 10500 Clause 4.2 drinking water TDS & heavy metal limits",
    "prompts.student.2":
      "Comparative analysis between IS 456 standards and Eurocode 2",
    "prompts.student.3": "What are the latest amendments to NBC 2016?",
    "prompts.student.4":
      "Search technical clauses for tensile and elongation requirements in IS 2062",
    "prompts.student.5":
      "Evolution of energy efficiency and BEE star rating test protocols in IS 1391",
    "prompts.student.6":
      "Standard testing methods for cement compressive strength under IS 4031",
    "prompts.admin.1":
      "What are the active Quality Control Orders (QCOs) in effect?",
    "prompts.admin.2":
      "Audit compliance checklist for BIS recognized testing laboratories",
    "prompts.admin.3":
      "Standards revision roadmap and committee review process",
  },
  [IndianLanguage.KAS]: {
    "nav.standards": "معیار",
    "nav.find_standard": "پَنُن معیار ژھانڈِو",
    "nav.catalogue": "معیار لِسٹ",
    "nav.certification": "سرٹیفیکیشن",
    "nav.testing": "جانچ",
    "nav.labs": "لیب",
    "nav.hallmark": "ہال مارک",
    "nav.consumer": "صارفین تحفظ",
    "nav.reports": "رپورٹس",
    "nav.ask_bis_ai": "BIS AI پُچھِو",
    "nav.ask_ai": "پُچھِو AI",
    "hero.title": "ہندوستانی معیارات تہٕ BIS خدمات خٲطرٕ تُہُند AI اسسٹنٹ",
    "hero.subtitle": "صحیح معیار ژھانڈِو، سرٹیفیکیشن طریقہ کار زٲنِو۔",
    "hero.select_profile": "پَنُن پروفائل موڈ چُنِو:",
    "hero.search_placeholder": "پروڈکٹ معیاراتن متعلق پُچھِو...",
    "hero.ask_ai_btn": "پُچھِو AI",
    "hero.suggested_queries": "تجویز کرنہٕ آمٕت سوالات:",
    "chat.new_session": "+ نۆو چیٹ سیشن",
    "chat.specialized_tools": "BIS خاص اوزار",
    "chat.find_standard": "مےٚ پَنُن معیار ژھانڈِو",
    "chat.certification_schemes": "سرٹیفیکیشن سکیماں",
    "chat.testing_requirements": "جانچٕچ ضروريات",
    "chat.find_lab": "منظور شدہ لیب ژھانڈِو",
    "chat.generate_report": "تعمیل رپورٹ بناوِو",
    "chat.active_workspace": "فعال ورک سپیس",
    "chat.current_investigation": "موجودہ تحقیق",
    "chat.grounded_active": "ثبوتن پؠٹھ مبنی نظام فعال",
    "chat.grounded_desc": "سرکاری گزٹ نوٹیفکیشنن منٛزٕ تصدیق شدٕ جوابات۔",
    "chat.conversation_title": "BIS سارتھی کتھ باتھ",
    "chat.mode": "موڈ:",
    "chat.language_label": "زبان:",
    "chat.evidence_panel_btn": "ثبوت پینل",
    "chat.welcome_title": "BIS سارتھی — ثبوتن پؠٹھ مبنی معاون",
    "chat.input_placeholder":
      "معیارات، سرٹیفیکیشن، جانچ طریقہ کار یا شقن متعلق پُچھِو...",
    "chat.send_btn": "سوزِو",
    "chat.answer_language": "جوابُک زبان",
    "chat.detected_language": "شناخت شدٕ زبان",
    "chat.evidence_panel": "مستند ثبوت تہٕ حوالہ جات",
    "chat.confidence": "اعتمادُک سطح",
    "chat.source_freshness": "تصدیق شدٕ ذریعہ",
    "chat.searching_status": "BIS منٛز تلاش تہٕ شق کڈنہٕ چھِ یوان...",
    "chat.traceable_citations": "تصدیق لائق مستند حوالہ جات:",
    "chat.copy_answer": "جواب کاپی کٔرِو",
    "chat.copied": "کاپی گوو",
    "chat.helpful": "مددگار جواب",
    "chat.not_helpful": "بے فائدہ",
    "chat.report_citation": "غلط حوالہ رپورٹ کٔرِو",
    "chat.disclaimer":
      "درستگی ہنز ضمانت: BIS سارتھی چھِ صرف اصلی معلومات دِوان۔",
    "chat.bis_act_compliant": "BIS ایکٹ ۲۰۱۶ مطابق",
    "evidence.title": "مستند ثبوت تہٕ حوالہ جات",
    "evidence.indian_standard": "ہندوستانی معیار",
    "evidence.clause": "شق:",
    "evidence.page": "صفحہ:",
    "evidence.publication": "شائع گژھنُک تاریخ:",
    "evidence.relevance": "مطابقت:",
    "evidence.freshness_notice": "نوٹس:",
    "evidence.verbatim_excerpt": "اصل معیار شقُک اقتباس",
    "evidence.copy_excerpt": "اقتباس کاپی کٔرِو",
    "evidence.copied": "کاپی گوو",
    "evidence.view_source": "سرکاری BIS پورٹلس پؠٹھ وِچھِو",
    "evidence.no_evidence_title": "کانٛہہ ثبوت چُھنہٕ حوالہ دِتھ",
    "evidence.no_evidence_desc":
      "BIS معیار شق وُچھنہٕ خٲطرٕ سوال پُچھِو یا معیار چُنِو۔",
    "common.loading": "جواب چھُ تیار گژھان...",
    "common.error": "عمل مکمل گژھتھ ہیک نہٕ۔",

    "header.subtitle": "Indian Standards Intelligence",
    "home.how_subtitle_prefix": "Strict adherence to",
    "home.how_subtitle_bold":
      '"Retrieve First → Reason Second → Cite Everything"',
    "home.mode_industry": "Industry / MSME",
    "home.mode_consumer": "Consumer",
    "home.mode_student": "Student / Researcher",
    "home.mode_admin": "Admin & Regulatory",
    "home.mode_consumer_placeholder":
      "Check gold hallmark HUID, verify ISI mark...",
    "home.mode_student_placeholder":
      "Search standard clauses, comparative analysis...",
    "home.mode_admin_placeholder":
      "Search standards, schemes, reports, or guidelines...",
    "home.features_title": "Bureau of Indian Standards Intelligence",
    "home.features_subtitle":
      "Structured modules for manufacturers, compliance officers, consumers.",
    "home.features_find_title": "Find My Standard Workflow",
    "home.features_find_badge": "AI Profiler",
    "home.features_find_tag": "Product Matching",
    "home.features_find_desc":
      "Step-by-step product profiler matching your product to Indian Standards.",
    "home.features_find_action": "Start Profiler →",
    "home.features_cert_title": "Certification Schemes & Roadmap",
    "home.features_cert_badge": "ISI & CRS",
    "home.features_cert_tag": "Audit & FMCS",
    "home.features_cert_desc":
      "Navigate Scheme I (ISI Mark), Scheme II (CRS), Scheme IV, and FMCS.",
    "home.features_cert_action": "Explore Schemes →",
    "home.features_testing_title": "Testing Requirements & Clauses",
    "home.features_testing_badge": "Clauses",
    "home.features_testing_tag": "Sampling Schedules",
    "home.features_testing_desc":
      "Acceptance criteria, sampling rules, and testing equipment from Indian Standards.",
    "home.features_testing_action": "Inspect Test Schedules →",
    "home.features_labs_title": "BIS Recognized Laboratories Finder",
    "home.features_labs_badge": "Lab Network",
    "home.features_labs_tag": "NABL & BIS Facilities",
    "home.features_labs_desc":
      "Filter NABL and BIS recognized labs by IS number, state, and city.",
    "home.features_labs_action": "Locate Accredited Lab →",
    "home.features_hallmark_title": "Gold & Silver Hallmarking Assistant",
    "home.features_hallmark_badge": "HUID Check",
    "home.features_hallmark_tag": "Purity & Assaying",
    "home.features_hallmark_desc":
      "Verify 6-digit HUID codes and understand gold/silver purity grades.",
    "home.features_hallmark_action": "Hallmarking Guidance →",
    "home.features_consumer_title": "Consumer Protection & ISI Check",
    "home.features_consumer_badge": "Verify & Report",
    "home.features_consumer_tag": "Grievance Redressal",
    "home.features_consumer_desc":
      "Verify ISI Mark CM/L licence numbers, spot counterfeits.",
    "home.features_consumer_action": "Consumer Hub →",
    "home.how_title": "How BIS Saarthi Works",
    "home.how_badge": "Architecture & Verification Pipeline",
    "home.how_step1_title": "Ask Query",
    "home.how_step1_desc":
      "Query in English, Hindi, or any of 22 Scheduled Indian Languages.",
    "home.how_step2_title": "Retrieve",
    "home.how_step2_desc":
      "Hybrid BM25 + Vector semantic search across BIS repository.",
    "home.how_step3_title": "Verify",
    "home.how_step3_desc":
      "Cross-encoder reranking & source freshness verification.",
    "home.how_step4_title": "Explain",
    "home.how_step4_desc":
      "Clear plain-language guidance distinguished from statutory clauses.",
    "home.how_step5_title": "Cite",
    "home.how_step5_desc":
      "Every claim traceable to standard number, clause, page, and link.",
    "home.trust_badge": "Zero Hallucination Operational Standard",
    "home.trust_title": "Trusted by MSMEs, Compliance Teams & Citizens",
    "home.trust_desc":
      "BIS Saarthi never invents Indian Standard numbers, test clauses, or lab recognition statuses.",
    "home.trust_action": "Launch AI Workspace →",
    "standards.badge": "Bureau of Indian Standards Repository",
    "standards.title": "Indian Standards Directory & Search",
    "standards.subtitle":
      "Search authoritative Indian Standards, mandatory QCOs, and testing clause schedules.",
    "standards.search_placeholder": "Search by IS number or keyword...",
    "standards.search_btn": "Search",
    "standards.filter_division": "Division:",
    "standards.filter_all": "All Divisions",
    "standards.filter_mandatory": "Mandatory QCO Only",
    "standards.div_mech": "Mechanical Engineering",
    "standards.div_civil": "Civil Engineering",
    "standards.div_electro": "Electrotechnical",
    "standards.div_met": "Metallurgical Engineering",
    "standards.div_food": "Food and Agriculture",
    "standards.loading_msg": "Retrieving Standards from BIS Repository...",
    "standards.loading_sub":
      "Applying division filters and QCO regulatory scopes...",
    "standards.empty_title": "No Indian Standards Found",
    "standards.empty_desc":
      "Try broadening your search query or reset the filters.",
    "standards.empty_action": "Reset Filters",
    "findstd.badge": "AI Product Scope Profiler",
    "findstd.title_prefix": "Find Applicable",
    "findstd.title_highlight": "Indian Standard",
    "findstd.subtitle":
      "Input product specifications and get matched Indian Standards.",
    "findstd.anti_badge": "Anti-Speculation Standard",
    "findstd.anti_desc":
      "Verify final grade classification against statutory QCOs.",
    "findstd.form_title": "Product Specification Form",
    "findstd.form_subtitle":
      "Provide as many details as possible for precise standard matching.",
    "findstd.field_product": "Product Name / Type",
    "findstd.field_material": "Raw Material Composition",
    "findstd.field_application": "Intended Application / Usage",
    "findstd.field_industry": "Industry / Domain Sector",
    "findstd.field_capacity": "Capacity / Size",
    "findstd.field_techspec": "Technical Specifications",
    "findstd.placeholder_product":
      "e.g. Stainless steel water bottle, PVC cable, TMT bar",
    "findstd.placeholder_material": "e.g. SS 304, Aluminium alloy",
    "findstd.placeholder_application":
      "e.g. Drinking water storage, building construction",
    "findstd.placeholder_industry":
      "e.g. Metallurgical, Food & Agriculture, Civil",
    "findstd.placeholder_capacity": "e.g. 750 ml, 1.1kV, 12mm",
    "findstd.placeholder_techspec":
      "e.g. Voltage rating 1.1kV, double wall insulation",
    "findstd.btn_evaluate": "Evaluate Applicable Standards",
    "findstd.btn_clear": "Clear",
    "findstd.btn_sample": "Run Sample Evaluation",
    "findstd.results_title": "Evaluated Indian Standards",
    "findstd.results_complete": "Grounded Assessment Completed",
    "findstd.loading_msg": "Evaluating Product-to-Standard Scope...",
    "findstd.loading_sub":
      "Scanning Gazette notifications and material grade parameters...",
    "findstd.empty_title": "No Profile Evaluated Yet",
    "findstd.empty_desc":
      "Fill in the product specification form and click Evaluate.",
    "testing.badge": "Statutory Testing Schedules",
    "testing.title": "Indian Standards Testing Requirements",
    "testing.subtitle":
      "Inspect mandatory routine tests, acceptance criteria, and sampling rules.",
    "testing.filter_placeholder":
      "Filter by Standard Number (e.g. IS 17526, IS 10500)...",
    "testing.btn_filter": "Filter Tests",
    "testing.btn_showall": "Show All Tests",
    "testing.loading_msg":
      "Retrieving Testing Clauses & Acceptance Parameters...",
    "testing.loading_sub":
      "Cross-referencing laboratory test methods and sampling frequencies...",
    "testing.empty_title": "No Testing Requirements Found",
    "testing.empty_desc": "Try searching with IS 17526, IS 10500, or IS 1786.",
    "labs.badge": "Accredited Testing Infrastructure",
    "labs.title": "Find a BIS Recognized Laboratory",
    "labs.subtitle":
      "Search NABL and BIS recognized testing labs across Indian states.",
    "labs.search_placeholder":
      "Search by Indian Standard (e.g. IS 17526, IS 14543)...",
    "labs.btn_filter": "Filter Labs",
    "labs.filter_state": "State:",
    "labs.filter_allstates": "All States",
    "labs.loading_msg": "Locating Recognized Testing Laboratories...",
    "labs.loading_sub": "Matching accredited testing parameters...",
    "labs.empty_title": "No Laboratories Found",
    "labs.empty_desc":
      "Try removing the standard filter or choosing All States.",
    "labs.empty_action": "View All Laboratories",
    "hallmarking.badge": "Precious Metals Purity Assurance",
    "hallmarking.title_prefix": "Gold & Silver",
    "hallmarking.title_highlight": "Hallmarking Assistant",
    "hallmarking.subtitle":
      "Understand fineness grades, verify HUID codes, locate hallmarking centres.",
    "hallmarking.mandate_badge": "BIS Hallmarking Mandate",
    "hallmarking.mandate_desc":
      "Mandatory hallmarking operative across notified districts.",
    "hallmarking.3marks_title": "The 3 Mandatory Marks on Gold Jewellery",
    "hallmarking.3marks_note": "Operative since July 2021",
    "hallmarking.verify_tag": "Consumer Verification Tool",
    "hallmarking.verify_title": "Verify 6-Digit Alphanumeric HUID Structure",
    "hallmarking.verify_subtitle":
      "Test any 6-digit HUID code before buying jewellery.",
    "hallmarking.verify_placeholder": "Enter 6-character HUID (e.g. A1B2C3)",
    "hallmarking.btn_validate": "Validate Format",
    "hallmarking.verify_howto": "How to verify on BIS Care App:",
    "hallmarking.verify_safety": "Consumer Safety & Rights Tips:",
    "hallmarking.grades_title":
      "Official Gold & Silver Fineness Grades (IS 1417 & IS 2112)",
    "hallmarking.comp_badge": "Statutory 2X Compensation Policy",
    "hallmarking.comp_title": "Consumer Protection Guarantee",
    "hallmarking.loading_msg":
      "Loading Hallmarking Standards & Fineness Schedules...",
    "hallmarking.loading_sub":
      "Retrieving IS 1417 and IS 2112 statutory markings...",
    "reports.badge": "Decision Support Deliverable",
    "reports.title": "BIS Compliance Roadmap Report",
    "reports.btn_print": "Print / Save as PDF",
    "reports.doc_header": "Government Compliance Assessment Document",
    "reports.doc_title": "BIS Product Compliance & Conformity Roadmap",
    "reports.section1": "1. Target Product Profile",
    "reports.label_product": "Product Evaluated:",
    "reports.label_primarystd": "Primary Applicable Standard:",
    "reports.section2": "2. Applicable Indian Standards & QCO Mandates",
    "reports.tag_mandatory": "Mandatory",
    "reports.label_regulatory": "Regulatory Notification:",
    "reports.section3": "3. Applicable BIS Certification Scheme",
    "reports.label_validity": "Validity:",
    "reports.label_surveillance": "Surveillance:",
    "reports.section4": "4. Mandatory Testing Requirements",
    "reports.col_test": "Test Parameter",
    "reports.col_clause": "Standard Clause",
    "reports.col_type": "Type",
    "reports.col_sampling": "Sampling Rule",
    "reports.section5": "5. Recommended Testing Laboratories",
    "reports.section6": "6. Statutory Documentation Checklist",
    "reports.section7": "Key Statutory Compliance Pitfalls:",
    "reports.disclaimer_title": "Authoritative Compliance Notice:",
    "reports.loading_msg": "Synthesizing BIS Compliance Assessment Report...",
    "reports.loading_sub":
      "Compiling applicable standards, testing schedules, and statutory evidence...",
    "certification.badge": "BIS Conformity Assessment Schemes",
    "certification.title": "Certification Schemes & Compliance Roadmap",
    "certification.subtitle":
      "Understand statutory conformity schemes, factory audits, and licence grant procedures.",
    "certification.btn_report": "Generate Full Compliance Report",
    "certification.active_product": "Active Product Roadmap:",
    "certification.btn_change": "Change Product Profile →",
    "certification.roadmap_title":
      "Interactive Step-by-Step Certification Journey",
    "certification.phases": "Phases",
    "certification.details_tag": "Scheme Details",
    "certification.docs_title": "Statutory Documents Required:",
    "certification.fee_title": "Fee Structure:",
    "certification.validity": "Validity:",
    "certification.surveillance": "Surveillance:",
    "certification.link_official": "Official Manakonline / CRS Portal",
    "certification.loading_msg": "Loading Certification Scheme Requirements...",
    "certification.loading_sub":
      "Compiling documentation checklists and audit schedules...",
    "consumer.badge": "Citizen & Consumer Protection",
    "consumer.title_prefix": "Consumer Safety &",
    "consumer.title_highlight": "ISI Mark Verification Hub",
    "consumer.subtitle":
      "Verify ISI Mark CM/L licence numbers, detect counterfeit markings, access grievance channels.",
    "consumer.helpline_badge": "Toll-Free Consumer Helpline",
    "consumer.helpline_number": "1800-11-4000",
    "consumer.verify_tag": "Licence Authentication",
    "consumer.verify_title": "Verify ISI Mark CM/L Number",
    "consumer.verify_subtitle":
      "Enter the 7 or 8-digit numeric licence code beneath the ISI triangular logo.",
    "consumer.verify_placeholder":
      "Enter 7 or 8-digit CM/L Number (e.g. 1454301)",
    "consumer.btn_check": "Check Licence Structure",
    "consumer.checklist_auth": "Authenticity Verification Checklist:",
    "consumer.checklist_fraud": "Red Flag Fraud Indicators:",
    "consumer.link_biscare": "Download Official BIS Care Citizen App",
    "consumer.complaint_title": "How to Lodge a Counterfeit Complaint",
    "consumer.complaint_desc":
      "Submit an anonymous report to BIS Enforcement Branch via the BIS Care App or e-BIS portal.",
    "consumer.categories_title": "Key Mandatory Consumer Categories",
    "consumer.categories_desc":
      "Products that strictly require the ISI Mark before retail sale in India:",
    "consumer.cat_packaged_water": "Packaged Drinking Water",
    "consumer.cat_cement": "Cement",
    "consumer.cat_steel_tmt": "Steel TMT Bars",
    "consumer.cat_pvc_pipes": "PVC Pipes",
    "consumer.cat_electrical": "Electrical Appliances",
    "consumer.cat_food_dairy": "Food & Dairy Products",
    "consumer.cat_lpg": "LPG Cylinders",
    "consumer.cat_gold": "Gold Jewellery",
    "footer.description":
      "AI-Powered Decision-Support Platform for Indian Standards, Certification Schemes, Laboratory Testing, and Hallmarking.",
    "footer.tagline": "Retrieve First → Reason Second → Cite Everything",
    "footer.portals_title": "BIS Portals",
    "footer.ebis": "e-BIS Portal",
    "footer.manakonline": "Manakonline (Scheme I)",
    "footer.crs": "CRS Portal (Electronics)",
    "footer.nabl": "NABL Directory",
    "footer.modules_title": "Core Modules",
    "footer.find_standard": "Find My Standard",
    "footer.certification": "Certification Schemes",
    "footer.testing": "Testing Requirements",
    "footer.labs": "Recognized Labs Finder",
    "footer.hallmarking": "Gold & Silver Hallmarking",
    "footer.legal_title": "Legal & Quality Notice",
    "footer.legal_text":
      "Information provided is grounded in published Indian Standards and Gazette notifications. Formal legal compliance requires certification grant through official BIS portals.",
    "footer.admin_link": "Admin & Evaluation Console →",
    "footer.copyright":
      "BIS Saarthi. Built for Indian Industry, MSMEs & Citizens.",
    "footer.consumer_grievance": "Consumer Grievance",
    "footer.ai_support": "AI Decision Support",
    "prompts.industry.1":
      "I manufacture stainless steel water bottles. Which standard applies?",
    "prompts.industry.2":
      "Do I need BIS certification for Lithium-ion power banks?",
    "prompts.industry.3":
      "What tests are required for TMT steel bars under IS 1786?",
    "prompts.industry.4":
      "What is the factory audit and sample testing process for Scheme-I?",
    "prompts.industry.5":
      "FMCS guidelines for foreign manufacturers exporting to India",
    "prompts.industry.6":
      "Required lab testing equipment for IS 302 electrical appliances",
    "prompts.consumer.1":
      "How do I verify a gold jewellery hallmark with 6-digit HUID?",
    "prompts.consumer.2":
      "How can I check whether an ISI mark on packaged water is genuine?",
    "prompts.consumer.3":
      "How to file a consumer grievance against defective ISI certified goods?",
    "prompts.consumer.4":
      "Difference between BIS Hallmark and 916 purity mark.",
    "prompts.consumer.5": "Is BIS registration mandatory for smart phones?",
    "prompts.consumer.6":
      "How to verify R-number on electronics under CRS scheme?",
    "prompts.student.1":
      "Explain IS 10500 Clause 4.2 drinking water TDS & heavy metal limits",
    "prompts.student.2":
      "Comparative analysis between IS 456 standards and Eurocode 2",
    "prompts.student.3": "What are the latest amendments to NBC 2016?",
    "prompts.student.4":
      "Search technical clauses for tensile and elongation requirements in IS 2062",
    "prompts.student.5":
      "Evolution of energy efficiency and BEE star rating test protocols in IS 1391",
    "prompts.student.6":
      "Standard testing methods for cement compressive strength under IS 4031",
    "prompts.admin.1":
      "What are the active Quality Control Orders (QCOs) in effect?",
    "prompts.admin.2":
      "Audit compliance checklist for BIS recognized testing laboratories",
    "prompts.admin.3":
      "Standards revision roadmap and committee review process",
  },
  [IndianLanguage.SD]: {
    "nav.standards": "معيار",
    "nav.find_standard": "پنهنجو معيار ڳوليو",
    "nav.catalogue": "معيارن جي فهرست",
    "nav.certification": "سرٽيفڪيشن",
    "nav.testing": "ٽيسٽنگ",
    "nav.labs": "ليبارٽريون",
    "nav.hallmark": "هال مارڪ",
    "nav.consumer": "صارفين جو تحفظ",
    "nav.reports": "رپورٽون",
    "nav.ask_bis_ai": "BIS AI کان پڇو",
    "nav.ask_ai": "پڇو AI",
    "hero.title": "ڀارتي معيارن ۽ BIS خدمتن لاءِ توهان جو AI مددگار",
    "hero.subtitle": "صحيح معيار ڳوليو، سرٽيفڪيشن اسڪيمن کي سمجهو.",
    "hero.select_profile": "پنهنجو پروفائل موڊ چونڊيو:",
    "hero.search_placeholder": "پراڊڪٽ معيارن بابت پڇو...",
    "hero.ask_ai_btn": "پڇو AI",
    "hero.suggested_queries": "تجويز ڪيل سوال:",
    "chat.new_session": "+ نئون چيٽ سيشن",
    "chat.specialized_tools": "BIS خاص اوزار",
    "chat.find_standard": "منهنجو معيار ڳوليو",
    "chat.certification_schemes": "سرٽيفڪيشن اسڪيمون",
    "chat.testing_requirements": "ٽيسٽنگ جون ضرورتون",
    "chat.find_lab": "منظور ٿيل ليب ڳوليو",
    "chat.generate_report": "تعميل رپورٽ تيار ڪريو",
    "chat.active_workspace": "فعال ڪم جي جڳھ",
    "chat.current_investigation": "موجوده تحقيقات",
    "chat.grounded_active": "ثبوت تي ٻڌل کوج فعال",
    "chat.grounded_desc": "سرڪاري گزٽ نوٽيفڪيشنن مان تصديق ٿيل جواب.",
    "chat.conversation_title": "BIS سارٿي ڳالهه ٻولهه",
    "chat.mode": "موڊ:",
    "chat.language_label": "ٻولي:",
    "chat.evidence_panel_btn": "ثبوت پينل",
    "chat.welcome_title": "BIS سارٿي — ثبوتن تي ٻڌل فيصلو مددگار",
    "chat.input_placeholder": "معيارن، سرٽيفڪيشن، ٽيسٽ طريقن بابت پڇو...",
    "chat.send_btn": "موڪليو",
    "chat.answer_language": "جواب جي ٻولي",
    "chat.detected_language": "سڃاڻپ ڪيل ٻولي",
    "chat.evidence_panel": "سرڪاري ثبوت ۽ حوالا",
    "chat.confidence": "اعتماد جي سطح",
    "chat.source_freshness": "تصديق ٿيل ذريعو",
    "chat.searching_status": "BIS ذخيري مان ڳولا ۽ شقون ڪڍيون پيون وڃن...",
    "chat.traceable_citations": "تصديق لائق سرڪاري حوالا:",
    "chat.copy_answer": "جواب نقل ڪريو",
    "chat.copied": "نقل ٿي ويو",
    "chat.helpful": "مددگار جواب",
    "chat.not_helpful": "غير مددگار",
    "chat.report_citation": "غلط حوالي جي رپورٽ ڪريو",
    "chat.disclaimer": "درستگي جي ضمانت: BIS سارٿي صرف مستند معلومات ڏئي ٿو.",
    "chat.bis_act_compliant": "BIS ايڪٽ 2016 موجب",
    "evidence.title": "سرڪاري ثبوت ۽ حوالا",
    "evidence.indian_standard": "ڀارتي معيار",
    "evidence.clause": "شق:",
    "evidence.page": "صفحو:",
    "evidence.publication": "اشاعت جي تاريخ:",
    "evidence.relevance": "مطابقت:",
    "evidence.freshness_notice": "نوٽيس:",
    "evidence.verbatim_excerpt": "اصل معيار شق جو اقتباس",
    "evidence.copy_excerpt": "اقتباس نقل ڪريو",
    "evidence.copied": "نقل ٿي ويو",
    "evidence.view_source": "سرڪاري BIS پورٽل تي ماخذ ڏسو",
    "evidence.no_evidence_title": "ڪو به ثبوت ڏنل ناهي",
    "evidence.no_evidence_desc":
      "BIS معيار شق ڏسڻ لاءِ سوال پڇو يا معيار چونڊيو.",
    "common.loading": "جواب تيار ٿي رهيو آهي...",
    "common.error": "ڪم مڪمل نه ٿي سگهيو.",

    "header.subtitle": "Indian Standards Intelligence",
    "home.how_subtitle_prefix": "Strict adherence to",
    "home.how_subtitle_bold":
      '"Retrieve First → Reason Second → Cite Everything"',
    "home.mode_industry": "Industry / MSME",
    "home.mode_consumer": "Consumer",
    "home.mode_student": "Student / Researcher",
    "home.mode_admin": "Admin & Regulatory",
    "home.mode_consumer_placeholder":
      "Check gold hallmark HUID, verify ISI mark...",
    "home.mode_student_placeholder":
      "Search standard clauses, comparative analysis...",
    "home.mode_admin_placeholder":
      "Search standards, schemes, reports, or guidelines...",
    "home.features_title": "Bureau of Indian Standards Intelligence",
    "home.features_subtitle":
      "Structured modules for manufacturers, compliance officers, consumers.",
    "home.features_find_title": "Find My Standard Workflow",
    "home.features_find_badge": "AI Profiler",
    "home.features_find_tag": "Product Matching",
    "home.features_find_desc":
      "Step-by-step product profiler matching your product to Indian Standards.",
    "home.features_find_action": "Start Profiler →",
    "home.features_cert_title": "Certification Schemes & Roadmap",
    "home.features_cert_badge": "ISI & CRS",
    "home.features_cert_tag": "Audit & FMCS",
    "home.features_cert_desc":
      "Navigate Scheme I (ISI Mark), Scheme II (CRS), Scheme IV, and FMCS.",
    "home.features_cert_action": "Explore Schemes →",
    "home.features_testing_title": "Testing Requirements & Clauses",
    "home.features_testing_badge": "Clauses",
    "home.features_testing_tag": "Sampling Schedules",
    "home.features_testing_desc":
      "Acceptance criteria, sampling rules, and testing equipment from Indian Standards.",
    "home.features_testing_action": "Inspect Test Schedules →",
    "home.features_labs_title": "BIS Recognized Laboratories Finder",
    "home.features_labs_badge": "Lab Network",
    "home.features_labs_tag": "NABL & BIS Facilities",
    "home.features_labs_desc":
      "Filter NABL and BIS recognized labs by IS number, state, and city.",
    "home.features_labs_action": "Locate Accredited Lab →",
    "home.features_hallmark_title": "Gold & Silver Hallmarking Assistant",
    "home.features_hallmark_badge": "HUID Check",
    "home.features_hallmark_tag": "Purity & Assaying",
    "home.features_hallmark_desc":
      "Verify 6-digit HUID codes and understand gold/silver purity grades.",
    "home.features_hallmark_action": "Hallmarking Guidance →",
    "home.features_consumer_title": "Consumer Protection & ISI Check",
    "home.features_consumer_badge": "Verify & Report",
    "home.features_consumer_tag": "Grievance Redressal",
    "home.features_consumer_desc":
      "Verify ISI Mark CM/L licence numbers, spot counterfeits.",
    "home.features_consumer_action": "Consumer Hub →",
    "home.how_title": "How BIS Saarthi Works",
    "home.how_badge": "Architecture & Verification Pipeline",
    "home.how_step1_title": "Ask Query",
    "home.how_step1_desc":
      "Query in English, Hindi, or any of 22 Scheduled Indian Languages.",
    "home.how_step2_title": "Retrieve",
    "home.how_step2_desc":
      "Hybrid BM25 + Vector semantic search across BIS repository.",
    "home.how_step3_title": "Verify",
    "home.how_step3_desc":
      "Cross-encoder reranking & source freshness verification.",
    "home.how_step4_title": "Explain",
    "home.how_step4_desc":
      "Clear plain-language guidance distinguished from statutory clauses.",
    "home.how_step5_title": "Cite",
    "home.how_step5_desc":
      "Every claim traceable to standard number, clause, page, and link.",
    "home.trust_badge": "Zero Hallucination Operational Standard",
    "home.trust_title": "Trusted by MSMEs, Compliance Teams & Citizens",
    "home.trust_desc":
      "BIS Saarthi never invents Indian Standard numbers, test clauses, or lab recognition statuses.",
    "home.trust_action": "Launch AI Workspace →",
    "standards.badge": "Bureau of Indian Standards Repository",
    "standards.title": "Indian Standards Directory & Search",
    "standards.subtitle":
      "Search authoritative Indian Standards, mandatory QCOs, and testing clause schedules.",
    "standards.search_placeholder": "Search by IS number or keyword...",
    "standards.search_btn": "Search",
    "standards.filter_division": "Division:",
    "standards.filter_all": "All Divisions",
    "standards.filter_mandatory": "Mandatory QCO Only",
    "standards.div_mech": "Mechanical Engineering",
    "standards.div_civil": "Civil Engineering",
    "standards.div_electro": "Electrotechnical",
    "standards.div_met": "Metallurgical Engineering",
    "standards.div_food": "Food and Agriculture",
    "standards.loading_msg": "Retrieving Standards from BIS Repository...",
    "standards.loading_sub":
      "Applying division filters and QCO regulatory scopes...",
    "standards.empty_title": "No Indian Standards Found",
    "standards.empty_desc":
      "Try broadening your search query or reset the filters.",
    "standards.empty_action": "Reset Filters",
    "findstd.badge": "AI Product Scope Profiler",
    "findstd.title_prefix": "Find Applicable",
    "findstd.title_highlight": "Indian Standard",
    "findstd.subtitle":
      "Input product specifications and get matched Indian Standards.",
    "findstd.anti_badge": "Anti-Speculation Standard",
    "findstd.anti_desc":
      "Verify final grade classification against statutory QCOs.",
    "findstd.form_title": "Product Specification Form",
    "findstd.form_subtitle":
      "Provide as many details as possible for precise standard matching.",
    "findstd.field_product": "Product Name / Type",
    "findstd.field_material": "Raw Material Composition",
    "findstd.field_application": "Intended Application / Usage",
    "findstd.field_industry": "Industry / Domain Sector",
    "findstd.field_capacity": "Capacity / Size",
    "findstd.field_techspec": "Technical Specifications",
    "findstd.placeholder_product":
      "e.g. Stainless steel water bottle, PVC cable, TMT bar",
    "findstd.placeholder_material": "e.g. SS 304, Aluminium alloy",
    "findstd.placeholder_application":
      "e.g. Drinking water storage, building construction",
    "findstd.placeholder_industry":
      "e.g. Metallurgical, Food & Agriculture, Civil",
    "findstd.placeholder_capacity": "e.g. 750 ml, 1.1kV, 12mm",
    "findstd.placeholder_techspec":
      "e.g. Voltage rating 1.1kV, double wall insulation",
    "findstd.btn_evaluate": "Evaluate Applicable Standards",
    "findstd.btn_clear": "Clear",
    "findstd.btn_sample": "Run Sample Evaluation",
    "findstd.results_title": "Evaluated Indian Standards",
    "findstd.results_complete": "Grounded Assessment Completed",
    "findstd.loading_msg": "Evaluating Product-to-Standard Scope...",
    "findstd.loading_sub":
      "Scanning Gazette notifications and material grade parameters...",
    "findstd.empty_title": "No Profile Evaluated Yet",
    "findstd.empty_desc":
      "Fill in the product specification form and click Evaluate.",
    "testing.badge": "Statutory Testing Schedules",
    "testing.title": "Indian Standards Testing Requirements",
    "testing.subtitle":
      "Inspect mandatory routine tests, acceptance criteria, and sampling rules.",
    "testing.filter_placeholder":
      "Filter by Standard Number (e.g. IS 17526, IS 10500)...",
    "testing.btn_filter": "Filter Tests",
    "testing.btn_showall": "Show All Tests",
    "testing.loading_msg":
      "Retrieving Testing Clauses & Acceptance Parameters...",
    "testing.loading_sub":
      "Cross-referencing laboratory test methods and sampling frequencies...",
    "testing.empty_title": "No Testing Requirements Found",
    "testing.empty_desc": "Try searching with IS 17526, IS 10500, or IS 1786.",
    "labs.badge": "Accredited Testing Infrastructure",
    "labs.title": "Find a BIS Recognized Laboratory",
    "labs.subtitle":
      "Search NABL and BIS recognized testing labs across Indian states.",
    "labs.search_placeholder":
      "Search by Indian Standard (e.g. IS 17526, IS 14543)...",
    "labs.btn_filter": "Filter Labs",
    "labs.filter_state": "State:",
    "labs.filter_allstates": "All States",
    "labs.loading_msg": "Locating Recognized Testing Laboratories...",
    "labs.loading_sub": "Matching accredited testing parameters...",
    "labs.empty_title": "No Laboratories Found",
    "labs.empty_desc":
      "Try removing the standard filter or choosing All States.",
    "labs.empty_action": "View All Laboratories",
    "hallmarking.badge": "Precious Metals Purity Assurance",
    "hallmarking.title_prefix": "Gold & Silver",
    "hallmarking.title_highlight": "Hallmarking Assistant",
    "hallmarking.subtitle":
      "Understand fineness grades, verify HUID codes, locate hallmarking centres.",
    "hallmarking.mandate_badge": "BIS Hallmarking Mandate",
    "hallmarking.mandate_desc":
      "Mandatory hallmarking operative across notified districts.",
    "hallmarking.3marks_title": "The 3 Mandatory Marks on Gold Jewellery",
    "hallmarking.3marks_note": "Operative since July 2021",
    "hallmarking.verify_tag": "Consumer Verification Tool",
    "hallmarking.verify_title": "Verify 6-Digit Alphanumeric HUID Structure",
    "hallmarking.verify_subtitle":
      "Test any 6-digit HUID code before buying jewellery.",
    "hallmarking.verify_placeholder": "Enter 6-character HUID (e.g. A1B2C3)",
    "hallmarking.btn_validate": "Validate Format",
    "hallmarking.verify_howto": "How to verify on BIS Care App:",
    "hallmarking.verify_safety": "Consumer Safety & Rights Tips:",
    "hallmarking.grades_title":
      "Official Gold & Silver Fineness Grades (IS 1417 & IS 2112)",
    "hallmarking.comp_badge": "Statutory 2X Compensation Policy",
    "hallmarking.comp_title": "Consumer Protection Guarantee",
    "hallmarking.loading_msg":
      "Loading Hallmarking Standards & Fineness Schedules...",
    "hallmarking.loading_sub":
      "Retrieving IS 1417 and IS 2112 statutory markings...",
    "reports.badge": "Decision Support Deliverable",
    "reports.title": "BIS Compliance Roadmap Report",
    "reports.btn_print": "Print / Save as PDF",
    "reports.doc_header": "Government Compliance Assessment Document",
    "reports.doc_title": "BIS Product Compliance & Conformity Roadmap",
    "reports.section1": "1. Target Product Profile",
    "reports.label_product": "Product Evaluated:",
    "reports.label_primarystd": "Primary Applicable Standard:",
    "reports.section2": "2. Applicable Indian Standards & QCO Mandates",
    "reports.tag_mandatory": "Mandatory",
    "reports.label_regulatory": "Regulatory Notification:",
    "reports.section3": "3. Applicable BIS Certification Scheme",
    "reports.label_validity": "Validity:",
    "reports.label_surveillance": "Surveillance:",
    "reports.section4": "4. Mandatory Testing Requirements",
    "reports.col_test": "Test Parameter",
    "reports.col_clause": "Standard Clause",
    "reports.col_type": "Type",
    "reports.col_sampling": "Sampling Rule",
    "reports.section5": "5. Recommended Testing Laboratories",
    "reports.section6": "6. Statutory Documentation Checklist",
    "reports.section7": "Key Statutory Compliance Pitfalls:",
    "reports.disclaimer_title": "Authoritative Compliance Notice:",
    "reports.loading_msg": "Synthesizing BIS Compliance Assessment Report...",
    "reports.loading_sub":
      "Compiling applicable standards, testing schedules, and statutory evidence...",
    "certification.badge": "BIS Conformity Assessment Schemes",
    "certification.title": "Certification Schemes & Compliance Roadmap",
    "certification.subtitle":
      "Understand statutory conformity schemes, factory audits, and licence grant procedures.",
    "certification.btn_report": "Generate Full Compliance Report",
    "certification.active_product": "Active Product Roadmap:",
    "certification.btn_change": "Change Product Profile →",
    "certification.roadmap_title":
      "Interactive Step-by-Step Certification Journey",
    "certification.phases": "Phases",
    "certification.details_tag": "Scheme Details",
    "certification.docs_title": "Statutory Documents Required:",
    "certification.fee_title": "Fee Structure:",
    "certification.validity": "Validity:",
    "certification.surveillance": "Surveillance:",
    "certification.link_official": "Official Manakonline / CRS Portal",
    "certification.loading_msg": "Loading Certification Scheme Requirements...",
    "certification.loading_sub":
      "Compiling documentation checklists and audit schedules...",
    "consumer.badge": "Citizen & Consumer Protection",
    "consumer.title_prefix": "Consumer Safety &",
    "consumer.title_highlight": "ISI Mark Verification Hub",
    "consumer.subtitle":
      "Verify ISI Mark CM/L licence numbers, detect counterfeit markings, access grievance channels.",
    "consumer.helpline_badge": "Toll-Free Consumer Helpline",
    "consumer.helpline_number": "1800-11-4000",
    "consumer.verify_tag": "Licence Authentication",
    "consumer.verify_title": "Verify ISI Mark CM/L Number",
    "consumer.verify_subtitle":
      "Enter the 7 or 8-digit numeric licence code beneath the ISI triangular logo.",
    "consumer.verify_placeholder":
      "Enter 7 or 8-digit CM/L Number (e.g. 1454301)",
    "consumer.btn_check": "Check Licence Structure",
    "consumer.checklist_auth": "Authenticity Verification Checklist:",
    "consumer.checklist_fraud": "Red Flag Fraud Indicators:",
    "consumer.link_biscare": "Download Official BIS Care Citizen App",
    "consumer.complaint_title": "How to Lodge a Counterfeit Complaint",
    "consumer.complaint_desc":
      "Submit an anonymous report to BIS Enforcement Branch via the BIS Care App or e-BIS portal.",
    "consumer.categories_title": "Key Mandatory Consumer Categories",
    "consumer.categories_desc":
      "Products that strictly require the ISI Mark before retail sale in India:",
    "consumer.cat_packaged_water": "Packaged Drinking Water",
    "consumer.cat_cement": "Cement",
    "consumer.cat_steel_tmt": "Steel TMT Bars",
    "consumer.cat_pvc_pipes": "PVC Pipes",
    "consumer.cat_electrical": "Electrical Appliances",
    "consumer.cat_food_dairy": "Food & Dairy Products",
    "consumer.cat_lpg": "LPG Cylinders",
    "consumer.cat_gold": "Gold Jewellery",
    "footer.description":
      "AI-Powered Decision-Support Platform for Indian Standards, Certification Schemes, Laboratory Testing, and Hallmarking.",
    "footer.tagline": "Retrieve First → Reason Second → Cite Everything",
    "footer.portals_title": "BIS Portals",
    "footer.ebis": "e-BIS Portal",
    "footer.manakonline": "Manakonline (Scheme I)",
    "footer.crs": "CRS Portal (Electronics)",
    "footer.nabl": "NABL Directory",
    "footer.modules_title": "Core Modules",
    "footer.find_standard": "Find My Standard",
    "footer.certification": "Certification Schemes",
    "footer.testing": "Testing Requirements",
    "footer.labs": "Recognized Labs Finder",
    "footer.hallmarking": "Gold & Silver Hallmarking",
    "footer.legal_title": "Legal & Quality Notice",
    "footer.legal_text":
      "Information provided is grounded in published Indian Standards and Gazette notifications. Formal legal compliance requires certification grant through official BIS portals.",
    "footer.admin_link": "Admin & Evaluation Console →",
    "footer.copyright":
      "BIS Saarthi. Built for Indian Industry, MSMEs & Citizens.",
    "footer.consumer_grievance": "Consumer Grievance",
    "footer.ai_support": "AI Decision Support",
    "prompts.industry.1":
      "I manufacture stainless steel water bottles. Which standard applies?",
    "prompts.industry.2":
      "Do I need BIS certification for Lithium-ion power banks?",
    "prompts.industry.3":
      "What tests are required for TMT steel bars under IS 1786?",
    "prompts.industry.4":
      "What is the factory audit and sample testing process for Scheme-I?",
    "prompts.industry.5":
      "FMCS guidelines for foreign manufacturers exporting to India",
    "prompts.industry.6":
      "Required lab testing equipment for IS 302 electrical appliances",
    "prompts.consumer.1":
      "How do I verify a gold jewellery hallmark with 6-digit HUID?",
    "prompts.consumer.2":
      "How can I check whether an ISI mark on packaged water is genuine?",
    "prompts.consumer.3":
      "How to file a consumer grievance against defective ISI certified goods?",
    "prompts.consumer.4":
      "Difference between BIS Hallmark and 916 purity mark.",
    "prompts.consumer.5": "Is BIS registration mandatory for smart phones?",
    "prompts.consumer.6":
      "How to verify R-number on electronics under CRS scheme?",
    "prompts.student.1":
      "Explain IS 10500 Clause 4.2 drinking water TDS & heavy metal limits",
    "prompts.student.2":
      "Comparative analysis between IS 456 standards and Eurocode 2",
    "prompts.student.3": "What are the latest amendments to NBC 2016?",
    "prompts.student.4":
      "Search technical clauses for tensile and elongation requirements in IS 2062",
    "prompts.student.5":
      "Evolution of energy efficiency and BEE star rating test protocols in IS 1391",
    "prompts.student.6":
      "Standard testing methods for cement compressive strength under IS 4031",
    "prompts.admin.1":
      "What are the active Quality Control Orders (QCOs) in effect?",
    "prompts.admin.2":
      "Audit compliance checklist for BIS recognized testing laboratories",
    "prompts.admin.3":
      "Standards revision roadmap and committee review process",
  },
};

interface I18nContextType {
  language: IndianLanguage;
  setLanguage: (lang: IndianLanguage) => void;
  t: (key: string, fallback?: string) => string;
  languageInfo: LanguageInfo;
}

const I18nContext = createContext<I18nContextType>({
  language: IndianLanguage.EN,
  setLanguage: () => {},
  t: (key: string, fallback?: string) => fallback || key,
  languageInfo: getLanguageInfo(IndianLanguage.EN),
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<IndianLanguage>(
    IndianLanguage.EN,
  );

  useEffect(() => {
    try {
      const saved = localStorage.getItem("bis_saarthi_lang");
      if (
        saved &&
        Object.values(IndianLanguage).includes(saved as IndianLanguage)
      ) {
        setLanguageState(saved as IndianLanguage);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = (lang: IndianLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("bis_saarthi_lang", lang);
    } catch {
      // ignore
    }
  };

  const t = (key: string, fallback?: string): string => {
    const langDict = UI_TRANSLATIONS[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    const enDict = UI_TRANSLATIONS[IndianLanguage.EN];
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return fallback || key;
  };

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languageInfo: getLanguageInfo(language),
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  return useContext(I18nContext);
}

import { CertificationSchemeType } from '@bis/shared-types';

export const SEED_SCHEMES = [
  {
    schemeType: CertificationSchemeType.SCHEME_I_ISI,
    name: 'Scheme I — Product Certification Scheme (ISI Mark)',
    code: 'SCHEME-I',
    description: 'The premier BIS Product Certification Scheme granting licence to use the prestigious ISI Mark. Involves factory infrastructure audit, in-house laboratory evaluation, drawing of independent samples, and grant of CM/L licence.',
    applicability: 'Applicable to all domestic manufacturing facilities producing products covered under Indian Standards with mandatory QCO or voluntary demand.',
    applicableSectors: ['Food & Beverages', 'Steel & Cement', 'Pipes & Cables', 'Automotive Components', 'Consumer Appliances', 'Chemicals'],
    mandatoryProductCategories: ['Packaged Drinking Water', 'TMT Steel Bars', 'Portland Cement', 'LPG Cylinders', 'Infant Milk Formula', 'Electric Iron & Water Heaters'],
    keySteps: [
      { stepNumber: 1, title: 'Standard & Scope Identification', description: 'Determine applicable IS number, product grade, and in-house testing capability.', responsibleParty: 'Applicant', estimatedDuration: '1-3 days' },
      { stepNumber: 2, title: 'Online Manakonline Application', description: 'Submit Form-I on Manakonline portal with plant layout, machinery list, manufacturing process flow, and test personnel details.', responsibleParty: 'Applicant', estimatedDuration: '2-5 days' },
      { stepNumber: 3, title: 'Preliminary Factory Inspection', description: 'BIS Inspecting Officer visits factory, evaluates QA systems, witnesses test verification, and draws independent sample.', responsibleParty: 'BIS / Applicant', estimatedDuration: '10-20 days' },
      { stepNumber: 4, title: 'Sample Testing in BIS/NABL Lab', description: 'Drawn sample is tested for all parameters in recognized lab. Test report must show 100% compliance.', responsibleParty: 'Recognized Laboratory', estimatedDuration: '15-30 days' },
      { stepNumber: 5, title: 'Grant of Licence (CM/L Number)', description: 'Upon satisfactory verification of report and payment of marking fee, BIS issues the 7 or 8-digit CM/L licence number.', responsibleParty: 'BIS', estimatedDuration: '7-14 days' }
    ],
    requiredDocuments: [
      'Factory Registration / MSME Udyam Certificate',
      'Manufacturing Machinery & Calibrated Equipment List',
      'In-house Quality Control Personnel Qualifications',
      'Plant Layout & Process Flow Diagram',
      'Test Reports of Raw Materials & Finished Product',
      'Consent to Operate from State Pollution Control Board'
    ],
    feeStructureSummary: 'Application Fee: ₹1,000; Factory Audit Charge: ₹7,000 per man-day; Annual Marking Fee: based on actual production volume (concessional for MSME).',
    surveillanceFrequency: 'Periodic unannounced factory audits and market sample testing twice a year.',
    validityPeriod: 'Initial licence valid for 1 to 2 years; renewable up to 5 years.',
    officialGuidelineUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/schemes/scheme-1'
  },
  {
    schemeType: CertificationSchemeType.SCHEME_II_CRS,
    name: 'Scheme II — Compulsory Registration Scheme (CRS)',
    code: 'SCHEME-II-CRS',
    description: 'Self-declaration of conformity based on testing of product in BIS-recognized labs. Primarily mandated by MeitY, MNRE, and MoP for electronics, IT goods, and solar products.',
    applicability: 'Applicable to manufacturers (both domestic and overseas) of notified electronic, IT, solar PV, and lighting equipment.',
    applicableSectors: ['Electronics & IT Goods', 'Solar Photovoltaic Systems', 'LED Lighting', 'Smart Watches & Consumer Devices', 'Power Banks & Batteries'],
    mandatoryProductCategories: ['Mobile Phones', 'Lithium-ion Batteries & Power Banks', 'Laptops & Tablets', 'LED Drivers', 'Solar Inverters', 'Smart Speakers'],
    keySteps: [
      { stepNumber: 1, title: 'Sample Testing in BIS Recognized Lab', description: 'Submit product sample to a BIS recognized Indian laboratory for full safety testing as per relevant IS/IEC standard.', responsibleParty: 'Applicant / Lab', estimatedDuration: '15-25 days' },
      { stepNumber: 2, title: 'Obtain Test Report', description: 'Receive valid, accredited test report (must be within 90 days of generation for registration).', responsibleParty: 'Recognized Laboratory', estimatedDuration: '3-5 days' },
      { stepNumber: 3, title: 'Online Registration Submission', description: 'Apply on CRS portal (crsbis.in) with test report, Undertaking (Affidavit), Brand Authorization, and Foreign/Domestic Manufacturer details.', responsibleParty: 'Applicant', estimatedDuration: '2-4 days' },
      { stepNumber: 4, title: 'Scrutiny & Grant of R-Number', description: 'BIS officer verifies report compliance and issues unique 8-digit Registration Number (R-XXXXXXXX).', responsibleParty: 'BIS', estimatedDuration: '10-18 days' }
    ],
    requiredDocuments: [
      'Accredited Test Report from BIS-recognized Lab (within 90 days)',
      'Brand Owner Authorization Letter & Trademark Certificate',
      'Authorized Indian Representative (AIR) appointment (for foreign manufacturers)',
      'Manufacturer Business Registration (ISO / Factory License)'
    ],
    feeStructureSummary: 'Government Processing Fee: ₹53,000 per application (including 2 years registration); Model addition: ₹20,000.',
    surveillanceFrequency: 'Market surveillance sample picking and laboratory re-testing.',
    validityPeriod: '2 Years initially; renewable for 2 to 5 years.',
    officialGuidelineUrl: 'https://www.crsbis.in/BIS/'
  },
  {
    schemeType: CertificationSchemeType.SCHEME_HALLMARK,
    name: 'Hallmarking Scheme for Precious Metals (Gold & Silver)',
    code: 'SCHEME-HALLMARK',
    description: 'Mandatory quality certification for gold jewellery and artefacts, ensuring accurate fineness and consumer protection through Assaying & Hallmarking (A&H) centres.',
    applicability: 'All jewellers manufacturing or retailing gold jewellery and artefacts in notified districts across India.',
    applicableSectors: ['Precious Metal Retailing', 'Jewellery Manufacturing', 'Bullion & Refining'],
    mandatoryProductCategories: ['Gold Jewellery (14K, 18K, 20K, 22K, 23K, 24K)', 'Gold Artefacts', 'Silver Articles (voluntary)'],
    keySteps: [
      { stepNumber: 1, title: 'Jeweller Registration on Manakonline', description: 'Jeweller registers retail outlet online; registration is granted instantly with zero government fee for MSMEs.', responsibleParty: 'Jeweller / BIS', estimatedDuration: '1 day' },
      { stepNumber: 2, title: 'Submission to A&H Centre', description: 'Jeweller submits batch of manufactured jewellery to BIS Recognized Assaying & Hallmarking Centre.', responsibleParty: 'Jeweller', estimatedDuration: '1-2 days' },
      { stepNumber: 3, title: 'Assaying (Fire Assay / XRF)', description: 'A&H Centre tests purity of alloy using fire assay method as per IS 1417.', responsibleParty: 'A&H Centre', estimatedDuration: '6-12 hours' },
      { stepNumber: 4, title: 'Laser Inscription of HUID', description: 'Centre inscribes BIS Logo, Fineness Mark (e.g. 22K916), and unique 6-digit alphanumeric HUID onto the jewellery piece.', responsibleParty: 'A&H Centre', estimatedDuration: '1-2 hours' }
    ],
    requiredDocuments: [
      'GST Registration Certificate',
      'PAN Card & Proof of Business Outlet',
      'Self-Declaration of Turnover / MSME Certificate'
    ],
    feeStructureSummary: 'Jeweller Registration: Free (per recent BIS notification); Hallmarking Charge: ₹45 + GST per piece for gold jewellery.',
    surveillanceFrequency: 'Periodic quality audits of A&H Centres and mystery shopping of jewellery stores.',
    validityPeriod: 'Lifetime registration for jewellers.',
    officialGuidelineUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/schemes/hallmarking'
  }
];

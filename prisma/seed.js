const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {

  // Categories
  const categories = [
    'Construction and Infrastructure',
    'Landscaping and Grounds Maintenance',
    'Information Technology and Networking',
    'Janitorial and Cleaning Services',
    'Professional and Financial Services',
    'Office Supplies and Furniture',
    'Vehicles and Equipment',
    'Printing and Signage',
    'Utilities and Environmental Services',
    'Food and Catering Services',
  ]

  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    })
  }

  console.log('Categories seeded')

  // Staff Users
  const lynn = await prisma.staffUser.upsert({
    where: { email: 'lspencer@wallertexas.gov' },
    update: {},
    create: {
      name: 'Lynn Spencer',
      email: 'lspencer@wallertexas.gov',
      password: 'WallerAdmin2026',
      role: 'Admin',
    },
  })

  const marcus = await prisma.staffUser.upsert({
    where: { email: 'mwebb@wallertexas.gov' },
    update: {},
    create: {
      name: 'Marcus Webb',
      email: 'mwebb@wallertexas.gov',
      password: 'WallerStaff2026',
      role: 'Staff',
    },
  })

  console.log('Staff users seeded')

  // Vendors
  const vendor1 = await prisma.vendor.upsert({
    where: { email: 'ray@lonestargrounds.com' },
    update: {},
    create: {
      vendorId: 'WLR-V-001',
      businessName: 'Lone Star Grounds and Landscaping LLC',
      contactName: 'Ray Thibodeaux',
      email: 'ray@lonestargrounds.com',
      phone: '(936) 555-0142',
      address: '204 Prairie View Rd, Waller, TX 77484',
      businessType: 'LLC',
      ein: '74-2391045',
      status: 'Active',
      categories: {
        connect: [
          { name: 'Landscaping and Grounds Maintenance' },
          { name: 'Utilities and Environmental Services' },
        ],
      },
    },
  })

  const vendor2 = await prisma.vendor.upsert({
    where: { email: 'priya@gulfcoasttech.io' },
    update: {},
    create: {
      vendorId: 'WLR-V-002',
      businessName: 'Gulf Coast Tech Solutions',
      contactName: 'Priya Anand',
      email: 'priya@gulfcoasttech.io',
      phone: '(713) 555-0287',
      address: '810 FM 1488, Magnolia, TX 77354',
      businessType: 'Corporation',
      ein: '76-1048293',
      status: 'Active',
      categories: {
        connect: [
          { name: 'Information Technology and Networking' },
          { name: 'Office Supplies and Furniture' },
        ],
      },
    },
  })

  const vendor3 = await prisma.vendor.upsert({
    where: { email: 'dale@wallercountybuild.com' },
    update: {},
    create: {
      vendorId: 'WLR-V-003',
      businessName: 'Waller County Building and Repair',
      contactName: 'Dale Fontenot',
      email: 'dale@wallercountybuild.com',
      phone: '(936) 555-0374',
      address: '118 Main St, Waller, TX 77484',
      businessType: 'Sole Proprietor',
      ein: '74-8820134',
      status: 'Active',
      categories: {
        connect: [
          { name: 'Construction and Infrastructure' },
          { name: 'Vehicles and Equipment' },
        ],
      },
    },
  })

  console.log('Vendors seeded')

  // Opportunities
  const opp1 = await prisma.opportunity.upsert({
    where: { oppId: 'WLR-OPP-001' },
    update: {},
    create: {
      oppId: 'WLR-OPP-001',
      title: 'Mowing and Grounds Maintenance — City Parks and Rights-of-Way',
      type: 'RFP',
      category: 'Landscaping and Grounds Maintenance',
      description: 'The City of Waller is soliciting proposals from qualified vendors to provide mowing, edging, weed control, and general grounds maintenance services for city-owned parks, medians, and public rights-of-way within the city limits. Services shall be performed on a scheduled basis from April through October, with on-call services available year-round.',
      requirements: 'Vendors must provide proof of general liability insurance ($1M minimum), a valid Texas business license, and at least two verifiable municipal or commercial references.',
      deadline: new Date('2026-07-15'),
      contactName: 'Lynn Spencer',
      contactEmail: 'lspencer@wallertexas.gov',
      requiredDocs: ['Proposal', 'W-9', 'Certificate of Insurance'],
      status: 'Published',
      createdBy: lynn.id,
    },
  })

  const opp2 = await prisma.opportunity.upsert({
    where: { oppId: 'WLR-OPP-002' },
    update: {},
    create: {
      oppId: 'WLR-OPP-002',
      title: 'IT Network Equipment Procurement — City Hall Upgrade',
      type: 'Bid',
      category: 'Information Technology and Networking',
      description: 'The City of Waller is seeking bids from qualified vendors for the procurement and installation of network equipment for City Hall including switches, routers, access points, and associated cabling.',
      requirements: 'Vendors must be an authorized reseller or manufacturer of the proposed equipment and provide a minimum one-year warranty on all hardware.',
      deadline: new Date('2026-07-22'),
      contactName: 'Marcus Webb',
      contactEmail: 'mwebb@wallertexas.gov',
      requiredDocs: ['Itemized Bid', 'W-9', 'Product Specs Sheet'],
      status: 'Published',
      createdBy: marcus.id,
    },
  })

  const opp3 = await prisma.opportunity.upsert({
    where: { oppId: 'WLR-OPP-003' },
    update: {},
    create: {
      oppId: 'WLR-OPP-003',
      title: 'Janitorial Services — City Hall and Public Works Facility',
      type: 'QuoteRequest',
      category: 'Janitorial and Cleaning Services',
      description: 'The City of Waller is requesting quotes for regularly scheduled janitorial and cleaning services for City Hall and the Public Works facility. Services are required five days per week.',
      requirements: 'Vendors must carry general liability insurance and provide references from at least two comparable municipal or commercial contracts.',
      deadline: new Date('2026-07-10'),
      contactName: 'Lynn Spencer',
      contactEmail: 'lspencer@wallertexas.gov',
      requiredDocs: ['Quote Sheet', 'W-9'],
      status: 'Published',
      createdBy: lynn.id,
    },
  })

  const opp4 = await prisma.opportunity.upsert({
    where: { oppId: 'WLR-OPP-004' },
    update: {},
    create: {
      oppId: 'WLR-OPP-004',
      title: 'Annual Asphalt Road Repair and Patching Contract',
      type: 'Bid',
      category: 'Construction and Infrastructure',
      description: 'The City of Waller is accepting bids for an annual contract to perform asphalt road repair, pothole patching, and related surface maintenance on city-maintained roads.',
      requirements: 'Bidders must hold a valid Texas contractor license and provide proof of insurance. A site visit may be required prior to bid submission.',
      deadline: new Date('2026-08-01'),
      contactName: 'Marcus Webb',
      contactEmail: 'mwebb@wallertexas.gov',
      requiredDocs: ['Bid Proposal', 'W-9', 'Certificate of Insurance', 'References'],
      status: 'Published',
      createdBy: marcus.id,
    },
  })

  const opp5 = await prisma.opportunity.upsert({
    where: { oppId: 'WLR-OPP-005' },
    update: {},
    create: {
      oppId: 'WLR-OPP-005',
      title: 'Professional Accounting and Audit Services — FY2027',
      type: 'RFP',
      category: 'Professional and Financial Services',
      description: 'The City of Waller is soliciting proposals from qualified accounting firms to provide annual audit services and ongoing financial consulting for FY2027.',
      requirements: 'Firms must be licensed CPAs in the State of Texas with demonstrated experience in municipal government accounting.',
      deadline: new Date('2026-08-14'),
      contactName: 'Lynn Spencer',
      contactEmail: 'lspencer@wallertexas.gov',
      requiredDocs: ['Proposal', 'Firm Qualifications', 'W-9'],
      status: 'Published',
      createdBy: lynn.id,
    },
  })

  console.log('Opportunities seeded')

  // Submissions
  await prisma.submission.upsert({
    where: { referenceNumber: 'WLR-SUB-0047' },
    update: {},
    create: {
      referenceNumber: 'WLR-SUB-0047',
      opportunityId: opp1.id,
      vendorId: vendor1.id,
      notes: 'Lone Star Grounds has maintained city properties in Waller County for over six years. We are fully insured and available to begin immediately upon contract award.',
      documentNames: ['LoneStar_Proposal.pdf', 'LoneStar_W9.pdf', 'LoneStar_COI.pdf'],
      status: 'UnderReview',
      submittedAt: new Date('2026-06-28'),
    },
  })

  await prisma.submission.upsert({
    where: { referenceNumber: 'WLR-SUB-0048' },
    update: {},
    create: {
      referenceNumber: 'WLR-SUB-0048',
      opportunityId: opp2.id,
      vendorId: vendor2.id,
      notes: 'Gulf Coast Tech Solutions is a Cisco and Dell authorized reseller. We can complete installation within 30 days of contract award.',
      documentNames: ['GulfCoast_Bid.pdf', 'GulfCoast_W9.pdf', 'GulfCoast_Specs.pdf'],
      status: 'New',
      submittedAt: new Date('2026-07-01'),
    },
  })

  await prisma.submission.upsert({
    where: { referenceNumber: 'WLR-SUB-0049' },
    update: {},
    create: {
      referenceNumber: 'WLR-SUB-0049',
      opportunityId: opp4.id,
      vendorId: vendor3.id,
      notes: 'Waller County Building and Repair has completed road patching contracts for Harris County and surrounding municipalities. References available upon request.',
      documentNames: ['WallerCounty_Bid.pdf', 'WallerCounty_W9.pdf', 'WallerCounty_COI.pdf'],
      status: 'New',
      submittedAt: new Date('2026-07-02'),
    },
  })

  await prisma.submission.upsert({
    where: { referenceNumber: 'WLR-SUB-0050' },
    update: {},
    create: {
      referenceNumber: 'WLR-SUB-0050',
      opportunityId: opp3.id,
      vendorId: vendor1.id,
      notes: 'We offer comprehensive janitorial services and can service both facilities on the requested schedule.',
      documentNames: ['LoneStar_Quote.pdf', 'LoneStar_W9_Jan.pdf'],
      status: 'Accepted',
      submittedAt: new Date('2026-06-25'),
    },
  })

  await prisma.submission.upsert({
    where: { referenceNumber: 'WLR-SUB-0051' },
    update: {},
    create: {
      referenceNumber: 'WLR-SUB-0051',
      opportunityId: opp3.id,
      vendorId: vendor2.id,
      notes: 'Gulf Coast Tech submitted a quote for janitorial services.',
      documentNames: ['GulfCoast_Quote.pdf', 'GulfCoast_W9_Jan.pdf'],
      status: 'Rejected',
      submittedAt: new Date('2026-06-26'),
    },
  })

  console.log('Submissions seeded')
  console.log('All seed data loaded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
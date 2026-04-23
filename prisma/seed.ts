/**
 * DocFlow Pro — database seed.
 * Populates default Plans and 50 business/marketing/legal templates.
 *
 * Run:  npm run db:seed
 */

import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

// ─────────────────── Plans ───────────────────

const plans = [
  {
    slug: 'starter',
    name: 'Starter',
    description: 'For individuals getting started.',
    priceMonthly: 0,
    priceYearly: 0,
    features: ['5 documents / month', '3 templates', 'Email signature', 'Basic analytics'],
    docLimit: 5,
    teamLimit: 1,
    aiEnabled: false,
    isActive: true,
    isPopular: false,
    sortOrder: 1,
  },
  {
    slug: 'pro',
    name: 'Pro',
    description: 'For professionals sending documents often.',
    priceMonthly: 2900,
    priceYearly: 29000,
    features: [
      'Unlimited documents',
      'All 50 templates',
      'Advanced analytics',
      'Custom branding',
      'AI document generation',
      'Priority support',
    ],
    docLimit: -1,
    teamLimit: 3,
    aiEnabled: true,
    isActive: true,
    isPopular: true,
    sortOrder: 2,
  },
  {
    slug: 'business',
    name: 'Business',
    description: 'For teams and agencies.',
    priceMonthly: 7900,
    priceYearly: 79000,
    features: [
      'Everything in Pro',
      'Unlimited team members',
      'SSO / SAML',
      'Audit logs',
      'API access',
      'Dedicated success manager',
    ],
    docLimit: -1,
    teamLimit: -1,
    aiEnabled: true,
    isActive: true,
    isPopular: false,
    sortOrder: 3,
  },
]

// ─────────────────── Templates (50) ───────────────────

const html = (title: string, body: string) => `
<h1>${title}</h1>
${body}
<p><em>[Signature]</em></p>
<p>Date: <strong>{{date}}</strong></p>
`

const t = (
  title: string,
  description: string,
  category: string,
  tags: string[],
  bodyHtml: string
) => ({
  title,
  description,
  category,
  tags,
  content: html(title, bodyHtml),
  isPublic: true,
})

const templates = [
  // ── Legal / Contracts ──
  t('Mutual Non-Disclosure Agreement', 'Two-way NDA for protecting confidential info between two parties.', 'Legal', ['nda', 'confidentiality'],
    '<p>This Mutual NDA is entered into by <strong>{{party_a}}</strong> and <strong>{{party_b}}</strong>.</p><h3>1. Confidential Information</h3><p>Each party acknowledges that it may receive confidential information from the other...</p><h3>2. Obligations</h3><p>Each party agrees to hold confidential information in strict confidence...</p><h3>3. Term</h3><p>This agreement remains in effect for <strong>{{duration}}</strong> years.</p>'),
  t('One-Way NDA', 'Unilateral NDA where one party discloses to another.', 'Legal', ['nda'],
    '<p>This One-Way NDA binds the <strong>Recipient</strong> to confidentiality regarding information shared by the <strong>Disclosing Party</strong>.</p>'),
  t('Independent Contractor Agreement', 'Standard agreement for hiring 1099 contractors.', 'Legal', ['contractor', 'freelance'],
    '<p>This Independent Contractor Agreement is entered into between <strong>{{company}}</strong> and <strong>{{contractor}}</strong>.</p><h3>Scope of Work</h3><p>{{scope}}</p><h3>Compensation</h3><p>Contractor will be paid <strong>{{rate}}</strong>.</p>'),
  t('Employment Offer Letter', 'Formal employment offer with compensation and start date.', 'Legal', ['employment', 'offer'],
    '<p>Dear <strong>{{candidate_name}}</strong>,</p><p>We are pleased to offer you the position of <strong>{{role}}</strong> at <strong>{{company}}</strong>.</p><p>Start date: <strong>{{start_date}}</strong>. Base salary: <strong>{{salary}}</strong>.</p>'),
  t('Master Service Agreement (MSA)', 'Framework agreement for ongoing services.', 'Legal', ['msa', 'services'],
    '<p>This Master Service Agreement (MSA) governs the provision of services by <strong>{{provider}}</strong> to <strong>{{client}}</strong>...</p>'),
  t('Statement of Work (SOW)', 'Project-specific scope under an MSA.', 'Legal', ['sow', 'services'],
    '<p>This SOW is issued under the MSA dated <strong>{{msa_date}}</strong>.</p><h3>Deliverables</h3><p>{{deliverables}}</p>'),
  t('Consulting Agreement', 'Short-term consulting engagement.', 'Legal', ['consulting'],
    '<p>This Consulting Agreement is made between <strong>{{consultant}}</strong> and <strong>{{client}}</strong> for advisory services...</p>'),
  t('Freelance Services Agreement', 'Project-based freelance contract.', 'Legal', ['freelance'],
    '<p>This agreement covers freelance services between <strong>{{freelancer}}</strong> and <strong>{{client}}</strong>.</p>'),
  t('Partnership Agreement', 'Joint venture / partnership terms.', 'Legal', ['partnership'],
    '<p>The undersigned parties form a partnership known as <strong>{{partnership_name}}</strong>...</p>'),
  t('Terms of Service', 'Website / SaaS product terms.', 'Legal', ['tos', 'saas'],
    '<p>These Terms govern your use of <strong>{{product}}</strong>...</p>'),
  t('Privacy Policy', 'GDPR-friendly privacy policy.', 'Legal', ['privacy', 'gdpr'],
    '<p><strong>{{company}}</strong> respects your privacy. This policy explains what data we collect and how we use it...</p>'),

  // ── Sales / Business ──
  t('Sales Proposal', 'Ready-to-send sales proposal.', 'Sales', ['proposal', 'sales'],
    '<h3>Executive Summary</h3><p>We propose to help <strong>{{client}}</strong> achieve {{goal}}.</p><h3>Investment</h3><p>Total: <strong>{{total_price}}</strong>.</p>'),
  t('SaaS Order Form', 'SaaS subscription order form.', 'Sales', ['saas', 'order'],
    '<p>Customer: <strong>{{customer}}</strong>. Plan: <strong>{{plan}}</strong>. Monthly fee: <strong>{{mrr}}</strong>.</p>'),
  t('Quote / Estimate', 'Itemized quote for services.', 'Sales', ['quote'],
    '<table><tr><th>Item</th><th>Qty</th><th>Price</th></tr><tr><td>{{item}}</td><td>{{qty}}</td><td>{{price}}</td></tr></table>'),
  t('Purchase Order', 'Standard purchase order.', 'Sales', ['po', 'procurement'],
    '<p>PO #<strong>{{po_number}}</strong> issued by <strong>{{buyer}}</strong> to <strong>{{supplier}}</strong>.</p>'),
  t('Invoice', 'Professional invoice with totals.', 'Sales', ['invoice', 'billing'],
    '<p>Invoice #<strong>{{invoice_number}}</strong></p><p>Bill to: <strong>{{client}}</strong></p><p>Amount due: <strong>{{amount}}</strong></p>'),
  t('Receipt', 'Payment receipt.', 'Sales', ['receipt'],
    '<p>Received from <strong>{{payer}}</strong> the sum of <strong>{{amount}}</strong>.</p>'),
  t('Letter of Intent (LOI)', 'Non-binding LOI for a deal.', 'Sales', ['loi'],
    '<p>This Letter of Intent outlines the intent of <strong>{{party_a}}</strong> and <strong>{{party_b}}</strong> to proceed with <strong>{{subject}}</strong>.</p>'),
  t('Sales Commission Agreement', 'Commission structure for sales reps.', 'Sales', ['commission'],
    '<p>Commissions for <strong>{{rep}}</strong> are structured as <strong>{{structure}}</strong>.</p>'),

  // ── Marketing Agency ──
  t('Marketing Retainer Agreement', 'Monthly marketing retainer for agencies.', 'Marketing Agency', ['retainer', 'agency'],
    '<p>Agency <strong>{{agency}}</strong> will provide monthly marketing services to <strong>{{client}}</strong> for <strong>{{retainer_fee}}</strong>/month.</p><h3>Scope</h3><p>{{scope}}</p>'),
  t('Social Media Management Contract', 'Managing client social channels.', 'Marketing Agency', ['social', 'agency'],
    '<p>Agency will manage <strong>{{platforms}}</strong> for <strong>{{client}}</strong>, posting <strong>{{frequency}}</strong>.</p>'),
  t('SEO Services Agreement', 'Monthly SEO engagement.', 'Marketing Agency', ['seo', 'agency'],
    '<p>SEO services include keyword research, on-page optimization, link building, and monthly reports for <strong>{{client}}</strong>.</p>'),
  t('Content Marketing Agreement', 'Blog + content production.', 'Marketing Agency', ['content', 'agency'],
    '<p>Agency will produce <strong>{{article_count}}</strong> articles per month averaging <strong>{{word_count}}</strong> words.</p>'),
  t('Paid Ads Management Contract', 'Google/Meta ads management.', 'Marketing Agency', ['ads', 'ppc'],
    '<p>Agency will manage paid campaigns on <strong>{{channels}}</strong> with an ad spend of <strong>{{budget}}</strong>/month.</p>'),
  t('Brand Identity Design Agreement', 'Logo + brand system.', 'Marketing Agency', ['brand', 'design'],
    '<p>Deliverables include logo, color palette, typography, and brand guidelines for <strong>{{client}}</strong>.</p>'),
  t('Website Design Agreement', 'Full website design engagement.', 'Marketing Agency', ['web', 'design'],
    '<p>Agency will design and develop a <strong>{{page_count}}</strong>-page website for <strong>{{client}}</strong>.</p>'),
  t('Email Marketing Services', 'Newsletter + campaign management.', 'Marketing Agency', ['email', 'agency'],
    '<p>Agency will manage <strong>{{client}}</strong>’s email marketing, sending <strong>{{send_count}}</strong> campaigns per month.</p>'),
  t('Video Production Agreement', 'Short-form video production.', 'Marketing Agency', ['video', 'agency'],
    '<p>Agency will produce <strong>{{video_count}}</strong> videos of <strong>{{duration}}</strong> seconds for <strong>{{client}}</strong>.</p>'),
  t('Influencer Collaboration Agreement', 'Influencer / brand partnership.', 'Marketing Agency', ['influencer'],
    '<p>Influencer <strong>{{influencer}}</strong> will create <strong>{{deliverable_count}}</strong> posts for <strong>{{brand}}</strong>.</p>'),
  t('PR Services Agreement', 'PR retainer and media relations.', 'Marketing Agency', ['pr'],
    '<p>Agency will secure media placements and manage <strong>{{client}}</strong>’s public relations.</p>'),
  t('Creative Brief', 'Project kickoff creative brief.', 'Marketing Agency', ['brief', 'creative'],
    '<h3>Objective</h3><p>{{objective}}</p><h3>Audience</h3><p>{{audience}}</p><h3>Deliverables</h3><p>{{deliverables}}</p>'),
  t('Marketing Plan', 'Quarterly marketing plan document.', 'Marketing Agency', ['plan'],
    '<h3>Goals</h3><p>{{goals}}</p><h3>Channels</h3><p>{{channels}}</p><h3>Budget</h3><p>{{budget}}</p>'),
  t('Campaign Strategy Document', 'Full campaign strategy with KPIs.', 'Marketing Agency', ['campaign'],
    '<p>Campaign <strong>{{campaign_name}}</strong> targets <strong>{{audience}}</strong> with KPIs of <strong>{{kpis}}</strong>.</p>'),

  // ── HR / People ──
  t('Employee Confidentiality Agreement', 'For new hires.', 'HR', ['confidentiality', 'hr'],
    '<p>Employee agrees to maintain confidentiality of all <strong>{{company}}</strong> proprietary information.</p>'),
  t('Non-Compete Agreement', 'Post-employment non-compete.', 'HR', ['noncompete'],
    '<p>Employee agrees not to compete for <strong>{{duration}}</strong> post-termination within <strong>{{territory}}</strong>.</p>'),
  t('Employee Handbook Acknowledgement', 'Sign-off on the handbook.', 'HR', ['handbook'],
    '<p>I acknowledge receipt of the <strong>{{company}}</strong> Employee Handbook.</p>'),
  t('Termination Letter', 'Formal termination notice.', 'HR', ['termination'],
    '<p>This letter confirms the end of your employment with <strong>{{company}}</strong> effective <strong>{{date}}</strong>.</p>'),
  t('Performance Improvement Plan', '30/60/90 day PIP.', 'HR', ['pip'],
    '<p>This PIP outlines expectations for <strong>{{employee}}</strong> over the next 90 days.</p>'),
  t('Parental Leave Policy Agreement', 'Parental leave acknowledgement.', 'HR', ['leave'],
    '<p>Employee is entitled to <strong>{{weeks}}</strong> weeks of paid parental leave.</p>'),

  // ── Real Estate ──
  t('Residential Lease Agreement', 'Standard residential lease.', 'Real Estate', ['lease'],
    '<p>Landlord <strong>{{landlord}}</strong> leases to Tenant <strong>{{tenant}}</strong> the property at <strong>{{address}}</strong>.</p>'),
  t('Commercial Lease Agreement', 'Commercial property lease.', 'Real Estate', ['lease', 'commercial'],
    '<p>This Commercial Lease is for the premises at <strong>{{address}}</strong>.</p>'),
  t('Rental Application', 'Prospective tenant application.', 'Real Estate', ['rental'],
    '<p>Applicant details: Name <strong>{{name}}</strong>, Employer <strong>{{employer}}</strong>, Income <strong>{{income}}</strong>.</p>'),
  t('Purchase & Sale Agreement', 'Real estate P&S.', 'Real Estate', ['purchase'],
    '<p>Seller agrees to sell and Buyer agrees to purchase the property at <strong>{{address}}</strong> for <strong>{{price}}</strong>.</p>'),

  // ── Tech / Product ──
  t('Software License Agreement', 'Perpetual / term software license.', 'Tech', ['license'],
    '<p>Licensor grants Licensee a license to use <strong>{{software}}</strong>...</p>'),
  t('SaaS Subscription Agreement', 'Subscription-based SaaS terms.', 'Tech', ['saas'],
    '<p>Customer subscribes to <strong>{{service}}</strong> on a <strong>{{term}}</strong> basis.</p>'),
  t('API License Agreement', 'API usage license.', 'Tech', ['api'],
    '<p>Developer is granted an API key to access <strong>{{service}}</strong>.</p>'),
  t('Data Processing Agreement (DPA)', 'GDPR DPA between controller & processor.', 'Tech', ['dpa', 'gdpr'],
    '<p>Controller appoints Processor to process personal data on its behalf.</p>'),
  t('Beta Testing Agreement', 'Early access tester NDA.', 'Tech', ['beta'],
    '<p>Tester agrees to provide feedback on the beta version of <strong>{{product}}</strong>.</p>'),

  // ── Finance ──
  t('Loan Agreement', 'Personal / business loan terms.', 'Finance', ['loan'],
    '<p>Lender <strong>{{lender}}</strong> agrees to loan <strong>{{amount}}</strong> to Borrower <strong>{{borrower}}</strong>.</p>'),
  t('Promissory Note', 'Promise to pay.', 'Finance', ['promissory'],
    '<p>Borrower promises to pay <strong>{{amount}}</strong> to Lender on <strong>{{due_date}}</strong>.</p>'),
  t('Equity Investment Agreement', 'Seed / angel round terms.', 'Finance', ['equity'],
    '<p>Investor agrees to purchase <strong>{{shares}}</strong> shares of Company at <strong>{{valuation}}</strong>.</p>'),
  t('Board Resolution', 'Board-approved corporate action.', 'Finance', ['board'],
    '<p>Resolved, that the Company hereby approves <strong>{{action}}</strong>.</p>'),

  // ── Misc ──
  t('General Release of Liability', 'Waiver of liability.', 'Legal', ['release', 'waiver'],
    '<p>Releasor hereby releases Releasee from any and all claims arising from <strong>{{activity}}</strong>.</p>'),
  t('Model Release', 'Photo / video model release.', 'Legal', ['model'],
    '<p>Model grants rights to use their likeness for <strong>{{usage}}</strong>.</p>'),
]

// ─────────────────── Run ───────────────────

async function main() {
  console.log('🌱 Seeding plans...')
  for (const plan of plans) {
    await db.plan.upsert({
      where: { slug: plan.slug },
      create: plan,
      update: plan,
    })
  }
  console.log(`   ✓ ${plans.length} plans`)

  console.log(`🌱 Seeding templates (${templates.length})...`)
  // Wipe existing public templates on seed to allow upgrades
  await db.template.deleteMany({ where: { isPublic: true, authorId: null } })
  for (const tpl of templates) {
    await db.template.create({ data: tpl })
  }
  console.log(`   ✓ ${templates.length} templates`)

  console.log('✅ Seed complete')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await db.$disconnect() })

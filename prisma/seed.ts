/**
 * DocFlow Pro — database seed.
 * Populates default Plans and 50+ business templates with real boilerplate.
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

// ─────────────────── Template helpers ───────────────────

const sigBlock = `
<div style="margin-top:48px;">
  <hr style="border:none;border-top:1px solid #e2e8f0;margin-bottom:32px;" />
  <table style="width:100%;border-collapse:collapse;">
    <tr>
      <td style="width:50%;padding-right:24px;vertical-align:top;">
        <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Party A Signature</p>
        <div style="border-bottom:1.5px solid #334155;height:48px;margin-bottom:8px;"></div>
        <p style="margin:0;font-size:12px;color:#94a3b8;">Name: ___________________________</p>
        <p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Title: ___________________________</p>
        <p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Date: ___________________________</p>
      </td>
      <td style="width:50%;padding-left:24px;vertical-align:top;">
        <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Party B Signature</p>
        <div style="border-bottom:1.5px solid #334155;height:48px;margin-bottom:8px;"></div>
        <p style="margin:0;font-size:12px;color:#94a3b8;">Name: ___________________________</p>
        <p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Title: ___________________________</p>
        <p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Date: ___________________________</p>
      </td>
    </tr>
  </table>
</div>`

const wrap = (title: string, body: string) =>
  `<h1>${title}</h1>\n${body}\n${sigBlock}`

const t = (
  title: string,
  description: string,
  category: string,
  tags: string[],
  body: string
) => ({ title, description, category, tags, content: wrap(title, body), isPublic: true })

// ─────────────────── Templates ───────────────────

const templates = [

  // ── Legal ──────────────────────────────────────────────────────────────

  t('Mutual Non-Disclosure Agreement',
    'Two-way NDA protecting confidential information shared between two parties.',
    'Legal', ['nda', 'confidentiality'],
    `<p>This Mutual Non-Disclosure Agreement (<strong>"Agreement"</strong>) is entered into as of <strong>{{effective_date}}</strong> by and between <strong>{{party_a}}</strong>, a company organised under the laws of <strong>{{party_a_jurisdiction}}</strong> (<strong>"Party A"</strong>), and <strong>{{party_b}}</strong>, a company organised under the laws of <strong>{{party_b_jurisdiction}}</strong> (<strong>"Party B"</strong>) (together, the <strong>"Parties"</strong>).</p>

<h2>1. Purpose</h2>
<p>The Parties wish to explore a potential business relationship (the <strong>"Purpose"</strong>) and may disclose confidential information to each other in connection with the Purpose.</p>

<h2>2. Definition of Confidential Information</h2>
<p><strong>"Confidential Information"</strong> means any information disclosed by either Party to the other that is designated as confidential, or that reasonably should be understood to be confidential given the nature of the information and circumstances of disclosure. This includes, but is not limited to, technical data, trade secrets, know-how, research, product plans, products, services, customers, markets, software, developments, inventions, processes, formulas, technology, designs, drawings, engineering, finances, and business plans.</p>

<h2>3. Obligations</h2>
<p>Each Party agrees to: (a) hold the other Party's Confidential Information in strict confidence; (b) not disclose such information to any third party without prior written consent; (c) use the Confidential Information solely for the Purpose; and (d) protect such information with at least the same degree of care used to protect its own confidential information, but no less than reasonable care.</p>

<h2>4. Exclusions</h2>
<p>The obligations above do not apply to information that: (a) is or becomes publicly known through no fault of the receiving Party; (b) was rightfully known before receipt from the disclosing Party; (c) is independently developed without use of Confidential Information; or (d) is required to be disclosed by law or regulation, provided prompt written notice is given to the disclosing Party.</p>

<h2>5. Term</h2>
<p>This Agreement shall remain in effect for <strong>{{duration}} years</strong> from the Effective Date. The confidentiality obligations survive termination for a further <strong>2 years</strong>.</p>

<h2>6. Governing Law</h2>
<p>This Agreement is governed by the laws of <strong>{{governing_jurisdiction}}</strong>, without regard to conflict-of-law principles.</p>`),

  t('One-Way Non-Disclosure Agreement',
    'Unilateral NDA where one party discloses confidential information to another.',
    'Legal', ['nda'],
    `<p>This Non-Disclosure Agreement (<strong>"Agreement"</strong>) is entered into as of <strong>{{effective_date}}</strong> between <strong>{{disclosing_party}}</strong> (<strong>"Disclosing Party"</strong>) and <strong>{{receiving_party}}</strong> (<strong>"Receiving Party"</strong>).</p>

<h2>1. Confidential Information</h2>
<p>The Receiving Party acknowledges that in connection with <strong>{{purpose}}</strong>, the Disclosing Party may disclose non-public, proprietary, and confidential information (<strong>"Confidential Information"</strong>).</p>

<h2>2. Obligations of Receiving Party</h2>
<p>The Receiving Party agrees to: (a) keep all Confidential Information strictly confidential; (b) not use Confidential Information for any purpose other than evaluating the stated Purpose; (c) not disclose Confidential Information to any third party without prior written consent from the Disclosing Party.</p>

<h2>3. Term &amp; Return of Information</h2>
<p>This Agreement remains in effect for <strong>{{duration}} years</strong>. Upon request, the Receiving Party shall promptly return or destroy all Confidential Information and certify such destruction in writing.</p>`),

  t('Independent Contractor Agreement',
    'Standard agreement for hiring freelancers and 1099 contractors.',
    'Legal', ['contractor', 'freelance'],
    `<p>This Independent Contractor Agreement (<strong>"Agreement"</strong>) is entered into as of <strong>{{start_date}}</strong> between <strong>{{company_name}}</strong> (<strong>"Company"</strong>) and <strong>{{contractor_name}}</strong> (<strong>"Contractor"</strong>).</p>

<h2>1. Services</h2>
<p>Contractor agrees to provide the following services (<strong>"Services"</strong>):</p>
<p>{{scope_of_work}}</p>

<h2>2. Compensation</h2>
<p>Company agrees to pay Contractor at a rate of <strong>{{rate}}</strong>. Invoices shall be submitted <strong>{{invoice_frequency}}</strong> and paid within <strong>{{payment_terms}} days</strong> of receipt.</p>

<h2>3. Independent Contractor Status</h2>
<p>Contractor is an independent contractor, not an employee, agent, partner, or joint venture of Company. Contractor is solely responsible for all taxes, insurance, and benefits. Contractor is free to perform services for other clients during the term of this Agreement.</p>

<h2>4. Intellectual Property</h2>
<p>All work product, inventions, and deliverables created by Contractor in connection with this Agreement shall be considered work-for-hire and shall be the sole property of Company upon full payment of all fees.</p>

<h2>5. Confidentiality</h2>
<p>Contractor agrees to keep all Company proprietary information confidential and not to disclose it to any third party.</p>

<h2>6. Term &amp; Termination</h2>
<p>This Agreement commences on <strong>{{start_date}}</strong> and continues until <strong>{{end_date}}</strong>, unless earlier terminated. Either Party may terminate this Agreement upon <strong>{{notice_period}} days'</strong> written notice.</p>`),

  t('Employment Offer Letter',
    'Formal offer of employment with compensation details and start date.',
    'Legal', ['employment', 'offer'],
    `<p>Date: <strong>{{date}}</strong></p>
<p>Dear <strong>{{candidate_name}}</strong>,</p>
<p>We are thrilled to offer you a position at <strong>{{company_name}}</strong>. After careful consideration, we believe you will be a valuable member of our team. Please review the details of this offer below.</p>

<h2>Position Details</h2>
<table style="width:100%;border-collapse:collapse;">
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;width:40%">Job Title</td><td style="padding:8px;border:1px solid #e2e8f0;">{{job_title}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Department</td><td style="padding:8px;border:1px solid #e2e8f0;">{{department}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Start Date</td><td style="padding:8px;border:1px solid #e2e8f0;">{{start_date}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Base Salary</td><td style="padding:8px;border:1px solid #e2e8f0;">{{salary}} per {{pay_period}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Work Location</td><td style="padding:8px;border:1px solid #e2e8f0;">{{location}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Reporting To</td><td style="padding:8px;border:1px solid #e2e8f0;">{{manager}}</td></tr>
</table>

<h2>Benefits</h2>
<p>You will be eligible for the following benefits, subject to Company policy: {{benefits_summary}}.</p>

<h2>Conditions of Employment</h2>
<p>This offer is contingent upon: (a) successful completion of a background check; (b) your execution of the Company's standard Confidentiality and IP Agreement; and (c) proof of your right to work in <strong>{{country}}</strong>.</p>

<h2>At-Will Employment</h2>
<p>Your employment with the Company is at-will, meaning either you or the Company may terminate the employment relationship at any time, with or without cause or advance notice.</p>

<p>This offer expires on <strong>{{expiry_date}}</strong>. Please sign and return this letter by that date.</p>
<p>We look forward to welcoming you to the team!</p>
<p>Sincerely,<br/><strong>{{hiring_manager_name}}</strong><br/>{{hiring_manager_title}}<br/>{{company_name}}</p>`),

  t('Master Service Agreement (MSA)',
    'Framework agreement governing the terms of ongoing services.',
    'Legal', ['msa', 'services'],
    `<p>This Master Service Agreement (<strong>"MSA"</strong> or <strong>"Agreement"</strong>) is entered into as of <strong>{{effective_date}}</strong> by and between <strong>{{provider_name}}</strong> (<strong>"Provider"</strong>) and <strong>{{client_name}}</strong> (<strong>"Client"</strong>).</p>

<h2>1. Services</h2>
<p>Provider agrees to perform the services described in one or more Statements of Work (<strong>"SOWs"</strong>) executed under this Agreement. Each SOW is incorporated herein by reference.</p>

<h2>2. Payment Terms</h2>
<p>Client agrees to pay Provider within <strong>{{payment_terms}} days</strong> of receipt of invoice. Late payments shall accrue interest at <strong>1.5% per month</strong>. Provider may suspend services for overdue accounts.</p>

<h2>3. Intellectual Property</h2>
<p>Unless otherwise specified in an SOW, all pre-existing IP remains the property of the respective Party. Deliverables specifically created for Client under an SOW shall be owned by Client upon payment in full.</p>

<h2>4. Confidentiality</h2>
<p>Both Parties agree to keep confidential any non-public information of the other Party and not to disclose such information to third parties without prior written consent.</p>

<h2>5. Limitation of Liability</h2>
<p>Neither Party shall be liable for indirect, incidental, special, or consequential damages. Provider's total liability shall not exceed the fees paid in the <strong>three (3) months</strong> prior to the claim.</p>

<h2>6. Term &amp; Termination</h2>
<p>This Agreement commences on the Effective Date and continues until terminated by either Party with <strong>{{notice_days}} days'</strong> written notice, provided no SOWs are then active.</p>`),

  t('Statement of Work (SOW)',
    'Project-specific scope, timeline, and deliverables issued under an MSA.',
    'Legal', ['sow', 'services'],
    `<p>This Statement of Work (<strong>"SOW"</strong>) is entered into as of <strong>{{sow_date}}</strong> pursuant to the Master Service Agreement dated <strong>{{msa_date}}</strong> between <strong>{{provider_name}}</strong> (<strong>"Provider"</strong>) and <strong>{{client_name}}</strong> (<strong>"Client"</strong>).</p>

<h2>1. Project Description</h2>
<p>{{project_description}}</p>

<h2>2. Deliverables</h2>
<p>Provider shall deliver the following:</p>
<ul><li>{{deliverable_1}}</li><li>{{deliverable_2}}</li><li>{{deliverable_3}}</li></ul>

<h2>3. Timeline</h2>
<table style="width:100%;border-collapse:collapse;">
  <tr style="background:#f8fafc;"><th style="padding:8px;border:1px solid #e2e8f0;text-align:left;">Milestone</th><th style="padding:8px;border:1px solid #e2e8f0;text-align:left;">Due Date</th></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;">Project Kickoff</td><td style="padding:8px;border:1px solid #e2e8f0;">{{kickoff_date}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;">First Draft</td><td style="padding:8px;border:1px solid #e2e8f0;">{{draft_date}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;">Final Delivery</td><td style="padding:8px;border:1px solid #e2e8f0;">{{delivery_date}}</td></tr>
</table>

<h2>4. Fees</h2>
<p>Total project fee: <strong>{{total_fee}}</strong>. Payment schedule: {{payment_schedule}}.</p>

<h2>5. Change Orders</h2>
<p>Any changes to scope must be agreed in writing. Provider will provide a change order with revised timeline and cost estimates for Client's approval before proceeding.</p>`),

  t('Consulting Agreement',
    'Engagement agreement for advisory and consulting services.',
    'Legal', ['consulting'],
    `<p>This Consulting Agreement (<strong>"Agreement"</strong>) is effective as of <strong>{{start_date}}</strong> between <strong>{{consultant_name}}</strong> (<strong>"Consultant"</strong>) and <strong>{{client_name}}</strong> (<strong>"Client"</strong>).</p>

<h2>1. Consulting Services</h2>
<p>Consultant will provide the following advisory services: <strong>{{services_description}}</strong>.</p>

<h2>2. Compensation</h2>
<p>Client shall pay Consultant a fee of <strong>{{fee}}</strong> on a <strong>{{billing_basis}}</strong> basis. Reasonable out-of-pocket expenses pre-approved by Client will be reimbursed within 30 days.</p>

<h2>3. Term</h2>
<p>This Agreement shall begin on <strong>{{start_date}}</strong> and expire on <strong>{{end_date}}</strong>, unless extended by mutual written agreement or earlier terminated.</p>

<h2>4. Ownership of Work Product</h2>
<p>All deliverables produced solely for Client shall become Client's property upon full payment. Consultant retains the right to use general skills and methodologies.</p>

<h2>5. Non-Solicitation</h2>
<p>During the term and for <strong>12 months</strong> thereafter, Consultant agrees not to solicit or hire any employee or contractor of Client.</p>`),

  t('Partnership Agreement',
    'Define roles, contributions, and profit-sharing in a business partnership.',
    'Legal', ['partnership'],
    `<p>This Partnership Agreement (<strong>"Agreement"</strong>) is entered into as of <strong>{{effective_date}}</strong> between the following partners (collectively, <strong>"Partners"</strong>):</p>
<ul><li><strong>{{partner_1_name}}</strong>, contributing {{partner_1_contribution}}</li><li><strong>{{partner_2_name}}</strong>, contributing {{partner_2_contribution}}</li></ul>

<h2>1. Partnership Name &amp; Purpose</h2>
<p>The Partners agree to operate a business under the name <strong>{{partnership_name}}</strong> for the purpose of <strong>{{business_purpose}}</strong>.</p>

<h2>2. Capital Contributions</h2>
<p>Each Partner's initial capital contribution is as set forth above. Additional capital contributions require unanimous consent.</p>

<h2>3. Profit &amp; Loss Sharing</h2>
<p>Net profits and losses shall be shared as follows: <strong>{{partner_1_name}}: {{partner_1_share}}%</strong> and <strong>{{partner_2_name}}: {{partner_2_share}}%</strong>.</p>

<h2>4. Management</h2>
<p>Decisions shall be made by majority vote, except major decisions (sale of assets, admission of new partners, amendment of this Agreement) which require unanimous consent.</p>

<h2>5. Dissolution</h2>
<p>The Partnership may be dissolved by unanimous agreement of the Partners, death or withdrawal of a Partner, or by court order. Upon dissolution, assets shall be distributed after payment of debts according to profit-sharing ratios.</p>`),

  t('Terms of Service',
    'GDPR-compliant terms of service for a website or SaaS product.',
    'Legal', ['tos', 'saas'],
    `<p>Last updated: <strong>{{last_updated}}</strong></p>
<p>Please read these Terms of Service (<strong>"Terms"</strong>) carefully before using <strong>{{product_name}}</strong> operated by <strong>{{company_name}}</strong> (<strong>"Company"</strong>).</p>

<h2>1. Acceptance</h2>
<p>By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part, you may not access the Service.</p>

<h2>2. Accounts</h2>
<p>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Notify us immediately of any unauthorised access.</p>

<h2>3. Subscriptions &amp; Billing</h2>
<p>Paid subscriptions are billed in advance on a {{billing_cycle}} basis. Refunds are processed in accordance with our Refund Policy.</p>

<h2>4. Intellectual Property</h2>
<p>The Service and its original content are the exclusive property of Company and protected by copyright, trademark, and other laws.</p>

<h2>5. Limitation of Liability</h2>
<p>Company shall not be liable for indirect, incidental, special, or consequential damages. Our total liability shall not exceed the amount paid by you in the <strong>12 months</strong> preceding the claim.</p>

<h2>6. Governing Law</h2>
<p>These Terms shall be governed by the laws of <strong>{{jurisdiction}}</strong>.</p>`),

  t('Privacy Policy',
    'GDPR-aligned privacy policy for websites and apps.',
    'Legal', ['privacy', 'gdpr'],
    `<p>Effective Date: <strong>{{effective_date}}</strong></p>
<p><strong>{{company_name}}</strong> (<strong>"we"</strong>, <strong>"us"</strong>) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal data.</p>

<h2>1. Data We Collect</h2>
<p>We collect: (a) Account data (name, email, password); (b) Usage data (pages visited, features used); (c) Payment data (processed via our payment provider — we do not store card numbers); (d) Communications (support emails).</p>

<h2>2. How We Use Your Data</h2>
<p>We use your data to: provide and improve the Service; send transactional emails; respond to support requests; comply with legal obligations.</p>

<h2>3. Your Rights (GDPR)</h2>
<p>If you are located in the EEA, you have the right to: access, correct, delete, or export your personal data; restrict or object to processing; withdraw consent at any time.</p>

<h2>4. Data Retention</h2>
<p>We retain personal data for as long as necessary to provide the Service and comply with legal obligations, typically no longer than <strong>{{retention_period}}</strong>.</p>

<h2>5. Contact</h2>
<p>For privacy requests, contact our Data Protection Officer at <strong>{{dpo_email}}</strong>.</p>`),

  // ── Sales ───────────────────────────────────────────────────────────────

  t('Sales Proposal',
    'Professional proposal to win new business with pricing and scope.',
    'Sales', ['proposal', 'sales'],
    `<p>Prepared for: <strong>{{client_name}}</strong><br/>Prepared by: <strong>{{your_company}}</strong><br/>Date: <strong>{{date}}</strong><br/>Valid until: <strong>{{expiry_date}}</strong></p>

<h2>Executive Summary</h2>
<p>Thank you for the opportunity to present this proposal. We understand that <strong>{{client_name}}</strong> is looking to <strong>{{client_goal}}</strong>. Based on our experience and your specific requirements, we are confident that our solution will deliver measurable results.</p>

<h2>The Challenge</h2>
<p>{{client_challenge}}</p>

<h2>Our Proposed Solution</h2>
<p>{{solution_description}}</p>

<h2>Scope of Work</h2>
<ul><li>{{scope_item_1}}</li><li>{{scope_item_2}}</li><li>{{scope_item_3}}</li></ul>

<h2>Investment</h2>
<table style="width:100%;border-collapse:collapse;">
  <tr style="background:#f8fafc;"><th style="padding:10px;border:1px solid #e2e8f0;text-align:left;">Service</th><th style="padding:10px;border:1px solid #e2e8f0;text-align:right;">Price</th></tr>
  <tr><td style="padding:10px;border:1px solid #e2e8f0;">{{service_1}}</td><td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{price_1}}</td></tr>
  <tr><td style="padding:10px;border:1px solid #e2e8f0;">{{service_2}}</td><td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{price_2}}</td></tr>
  <tr style="background:#f0f9ff;font-weight:600;"><td style="padding:10px;border:1px solid #e2e8f0;">Total Investment</td><td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{total}}</td></tr>
</table>

<h2>Next Steps</h2>
<p>To proceed, please sign this proposal and return it by <strong>{{expiry_date}}</strong>. A <strong>{{deposit_percentage}}% deposit</strong> is required to begin work.</p>`),

  t('SaaS Order Form',
    'Subscription order form for SaaS products.',
    'Sales', ['saas', 'order'],
    `<p>Order Date: <strong>{{order_date}}</strong><br/>Order Number: <strong>#{{order_number}}</strong></p>

<h2>Customer Information</h2>
<table style="width:100%;border-collapse:collapse;">
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;width:35%">Company Name</td><td style="padding:8px;border:1px solid #e2e8f0;">{{company_name}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Billing Contact</td><td style="padding:8px;border:1px solid #e2e8f0;">{{billing_contact}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Email</td><td style="padding:8px;border:1px solid #e2e8f0;">{{billing_email}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Billing Address</td><td style="padding:8px;border:1px solid #e2e8f0;">{{billing_address}}</td></tr>
</table>

<h2>Subscription Details</h2>
<table style="width:100%;border-collapse:collapse;">
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Plan</td><td style="padding:8px;border:1px solid #e2e8f0;">{{plan_name}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Number of Seats</td><td style="padding:8px;border:1px solid #e2e8f0;">{{seats}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Term</td><td style="padding:8px;border:1px solid #e2e8f0;">{{term}} ({{start_date}} – {{end_date}})</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Monthly Fee</td><td style="padding:8px;border:1px solid #e2e8f0;">{{monthly_fee}}</td></tr>
  <tr style="font-weight:600;background:#f0f9ff;"><td style="padding:8px;border:1px solid #e2e8f0;">Total Contract Value</td><td style="padding:8px;border:1px solid #e2e8f0;">{{total_value}}</td></tr>
</table>

<h2>Payment Terms</h2>
<p>Invoices are issued <strong>{{invoice_frequency}}</strong> and due within <strong>{{payment_terms}} days</strong>. Auto-renewal applies unless cancelled <strong>30 days</strong> before renewal date.</p>`),

  t('Invoice',
    'Professional invoice with line items and payment details.',
    'Sales', ['invoice', 'billing'],
    `<p>Invoice #: <strong>{{invoice_number}}</strong><br/>Date: <strong>{{invoice_date}}</strong><br/>Due Date: <strong>{{due_date}}</strong></p>
<hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0;" />
<p><strong>Bill To:</strong><br/>{{client_name}}<br/>{{client_address}}<br/>{{client_email}}</p>
<p><strong>From:</strong><br/>{{your_company}}<br/>{{your_address}}<br/>{{your_email}}</p>

<h2>Items</h2>
<table style="width:100%;border-collapse:collapse;">
  <tr style="background:#f8fafc;"><th style="padding:10px;border:1px solid #e2e8f0;text-align:left;">Description</th><th style="padding:10px;border:1px solid #e2e8f0;text-align:right;">Qty</th><th style="padding:10px;border:1px solid #e2e8f0;text-align:right;">Unit Price</th><th style="padding:10px;border:1px solid #e2e8f0;text-align:right;">Amount</th></tr>
  <tr><td style="padding:10px;border:1px solid #e2e8f0;">{{item_1_description}}</td><td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{item_1_qty}}</td><td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{item_1_price}}</td><td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{item_1_total}}</td></tr>
  <tr><td style="padding:10px;border:1px solid #e2e8f0;">{{item_2_description}}</td><td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{item_2_qty}}</td><td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{item_2_price}}</td><td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{item_2_total}}</td></tr>
  <tr style="background:#f8fafc;"><td colspan="3" style="padding:10px;border:1px solid #e2e8f0;text-align:right;font-weight:600;">Subtotal</td><td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{subtotal}}</td></tr>
  <tr><td colspan="3" style="padding:10px;border:1px solid #e2e8f0;text-align:right;">Tax ({{tax_rate}}%)</td><td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{tax_amount}}</td></tr>
  <tr style="background:#f0f9ff;font-weight:700;"><td colspan="3" style="padding:10px;border:1px solid #e2e8f0;text-align:right;">Total Due</td><td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{total_due}}</td></tr>
</table>

<h2>Payment Instructions</h2>
<p>Please transfer payment to: <strong>{{bank_details}}</strong>. Reference: Invoice #{{invoice_number}}.</p>
<p>Late payments may incur a <strong>{{late_fee}}%</strong> monthly charge.</p>`),

  t('Quote / Estimate',
    'Itemized cost estimate for products or services.',
    'Sales', ['quote'],
    `<p>Quote #: <strong>{{quote_number}}</strong><br/>Date: <strong>{{date}}</strong><br/>Valid Until: <strong>{{valid_until}}</strong></p>

<p>Prepared for: <strong>{{client_name}}</strong></p>

<h2>Quoted Items</h2>
<table style="width:100%;border-collapse:collapse;">
  <tr style="background:#f8fafc;"><th style="padding:10px;border:1px solid #e2e8f0;text-align:left;">Item</th><th style="padding:10px;border:1px solid #e2e8f0;text-align:right;">Qty</th><th style="padding:10px;border:1px solid #e2e8f0;text-align:right;">Unit Price</th><th style="padding:10px;border:1px solid #e2e8f0;text-align:right;">Total</th></tr>
  <tr><td style="padding:10px;border:1px solid #e2e8f0;">{{item_1}}</td><td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{qty_1}}</td><td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{price_1}}</td><td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{total_1}}</td></tr>
  <tr><td style="padding:10px;border:1px solid #e2e8f0;">{{item_2}}</td><td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{qty_2}}</td><td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{price_2}}</td><td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{total_2}}</td></tr>
  <tr style="font-weight:700;background:#f0f9ff;"><td colspan="3" style="padding:10px;border:1px solid #e2e8f0;text-align:right;">Grand Total</td><td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{grand_total}}</td></tr>
</table>
<p style="font-size:13px;color:#64748b;">This quote is valid for <strong>30 days</strong>. To accept, sign and return this document.</p>`),

  t('Purchase Order',
    'Standard purchase order for goods or services.',
    'Sales', ['po', 'procurement'],
    `<p>PO Number: <strong>{{po_number}}</strong><br/>Date: <strong>{{date}}</strong></p>

<p><strong>Buyer:</strong> {{buyer_name}}, {{buyer_address}}<br/><strong>Supplier:</strong> {{supplier_name}}, {{supplier_address}}</p>

<h2>Order Details</h2>
<table style="width:100%;border-collapse:collapse;">
  <tr style="background:#f8fafc;"><th style="padding:10px;border:1px solid #e2e8f0;text-align:left;">Description</th><th style="padding:10px;border:1px solid #e2e8f0;text-align:right;">Qty</th><th style="padding:10px;border:1px solid #e2e8f0;text-align:right;">Unit Price</th><th style="padding:10px;border:1px solid #e2e8f0;text-align:right;">Total</th></tr>
  <tr><td style="padding:10px;border:1px solid #e2e8f0;">{{item_description}}</td><td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{quantity}}</td><td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{unit_price}}</td><td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{line_total}}</td></tr>
  <tr style="font-weight:700;"><td colspan="3" style="padding:10px;border:1px solid #e2e8f0;text-align:right;">Total</td><td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{po_total}}</td></tr>
</table>

<h2>Terms</h2>
<p>Delivery Date: <strong>{{delivery_date}}</strong>. Payment Terms: <strong>{{payment_terms}}</strong>. Delivery Address: <strong>{{delivery_address}}</strong>.</p>`),

  t('Letter of Intent (LOI)',
    'Non-binding letter of intent expressing interest in a deal or partnership.',
    'Sales', ['loi'],
    `<p>Date: <strong>{{date}}</strong></p>
<p>To: <strong>{{recipient_name}}</strong><br/>{{recipient_company}}</p>

<p>Dear {{recipient_name}},</p>
<p>This Letter of Intent (<strong>"LOI"</strong>) sets forth the intent of <strong>{{your_company}}</strong> (<strong>"Company"</strong>) to <strong>{{transaction_description}}</strong> with <strong>{{recipient_company}}</strong> (<strong>"Counterparty"</strong>).</p>

<h2>Key Terms</h2>
<ul>
  <li><strong>Transaction:</strong> {{transaction_description}}</li>
  <li><strong>Proposed Consideration:</strong> {{consideration}}</li>
  <li><strong>Proposed Closing Date:</strong> {{closing_date}}</li>
  <li><strong>Conditions:</strong> {{conditions}}</li>
</ul>

<h2>Non-Binding Nature</h2>
<p>This LOI is not legally binding (except for any confidentiality provisions). The Parties agree to negotiate in good faith to execute definitive agreements by <strong>{{target_signing_date}}</strong>.</p>

<p>Sincerely,<br/><strong>{{your_name}}</strong><br/>{{your_title}}<br/>{{your_company}}</p>`),

  t('Sales Commission Agreement',
    'Defines commission structure and terms for sales representatives.',
    'Sales', ['commission'],
    `<p>This Sales Commission Agreement is entered into as of <strong>{{effective_date}}</strong> between <strong>{{company_name}}</strong> (<strong>"Company"</strong>) and <strong>{{rep_name}}</strong> (<strong>"Sales Representative"</strong>).</p>

<h2>1. Commission Structure</h2>
<table style="width:100%;border-collapse:collapse;">
  <tr style="background:#f8fafc;"><th style="padding:10px;border:1px solid #e2e8f0;text-align:left;">Revenue Tier</th><th style="padding:10px;border:1px solid #e2e8f0;text-align:right;">Commission Rate</th></tr>
  <tr><td style="padding:10px;border:1px solid #e2e8f0;">USD 0 – {{tier_1_max}}</td><td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{tier_1_rate}}%</td></tr>
  <tr><td style="padding:10px;border:1px solid #e2e8f0;">{{tier_1_max}} – {{tier_2_max}}</td><td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{tier_2_rate}}%</td></tr>
  <tr><td style="padding:10px;border:1px solid #e2e8f0;">Above {{tier_2_max}}</td><td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{tier_3_rate}}%</td></tr>
</table>

<h2>2. Payment of Commissions</h2>
<p>Commissions are calculated on collected revenue and paid within <strong>{{payment_days}} days</strong> after the close of each month.</p>

<h2>3. Clawback</h2>
<p>If a customer cancels or receives a refund within <strong>{{clawback_period}} days</strong>, commissions paid on that sale will be deducted from future commission payments.</p>`),

  t('Receipt',
    'Acknowledgement of payment received.',
    'Sales', ['receipt'],
    `<p>Receipt Number: <strong>{{receipt_number}}</strong><br/>Date: <strong>{{date}}</strong></p>
<hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0;" />
<p>Received from: <strong>{{payer_name}}</strong><br/>Payment method: <strong>{{payment_method}}</strong></p>

<h2>Payment Details</h2>
<table style="width:100%;border-collapse:collapse;">
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Description</td><td style="padding:8px;border:1px solid #e2e8f0;">{{description}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Amount</td><td style="padding:8px;border:1px solid #e2e8f0;font-weight:700;">{{amount}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Balance Due</td><td style="padding:8px;border:1px solid #e2e8f0;">{{balance}}</td></tr>
</table>
<p style="margin-top:16px;font-size:13px;color:#64748b;">Thank you for your payment. Please retain this receipt for your records.</p>`),

  // ── Marketing Agency ───────────────────────────────────────────────────

  t('Marketing Retainer Agreement',
    'Monthly marketing retainer for agencies with scope and deliverables.',
    'Marketing Agency', ['retainer', 'agency'],
    `<p>This Marketing Retainer Agreement (<strong>"Agreement"</strong>) is effective as of <strong>{{start_date}}</strong> between <strong>{{agency_name}}</strong> (<strong>"Agency"</strong>) and <strong>{{client_name}}</strong> (<strong>"Client"</strong>).</p>

<h2>1. Retainer Services</h2>
<p>Agency agrees to provide the following services on an ongoing monthly basis:</p>
<ul><li>{{service_1}}</li><li>{{service_2}}</li><li>{{service_3}}</li></ul>

<h2>2. Monthly Retainer Fee</h2>
<p>Client agrees to pay Agency a monthly retainer of <strong>{{retainer_fee}}</strong>, invoiced on the <strong>1st of each month</strong> and due within <strong>{{payment_terms}} days</strong>.</p>

<h2>3. Additional Work</h2>
<p>Work outside the agreed scope will be quoted separately at Agency's standard rate of <strong>{{hourly_rate}}/hour</strong> and requires written approval before commencement.</p>

<h2>4. Term &amp; Cancellation</h2>
<p>This Agreement runs month-to-month from <strong>{{start_date}}</strong>. Either Party may cancel with <strong>{{notice_period}} days'</strong> written notice. Active month fees are non-refundable.</p>

<h2>5. Ownership</h2>
<p>Upon receipt of full payment, all creative work produced specifically for Client becomes Client's property. Agency retains the right to display work in its portfolio unless otherwise agreed.</p>`),

  t('Social Media Management Contract',
    'Agreement for managing a client\'s social media channels.',
    'Marketing Agency', ['social', 'agency'],
    `<p>This agreement is entered into as of <strong>{{start_date}}</strong> between <strong>{{agency_name}}</strong> (<strong>"Agency"</strong>) and <strong>{{client_name}}</strong> (<strong>"Client"</strong>).</p>

<h2>1. Platforms Managed</h2>
<p>Agency will manage the following platforms: <strong>{{platforms}}</strong>.</p>

<h2>2. Monthly Deliverables</h2>
<ul>
  <li><strong>{{post_count}} posts per month</strong> across managed platforms</li>
  <li>Community management (responding to comments/DMs within <strong>{{response_time}} hours</strong>)</li>
  <li>Monthly performance report with reach, engagement, and follower growth</li>
  <li>Content calendar shared with Client by the <strong>{{calendar_delivery_date}}</strong> of each month</li>
</ul>

<h2>3. Client Responsibilities</h2>
<p>Client shall: provide brand assets, product images, and key messages; review and approve content calendar within <strong>48 hours</strong>; provide login credentials and admin access.</p>

<h2>4. Monthly Fee</h2>
<p>Monthly fee: <strong>{{monthly_fee}}</strong>. Paid advertising budget (if any) is billed separately at cost plus <strong>{{ad_management_fee}}%</strong> management fee.</p>`),

  t('SEO Services Agreement',
    'Monthly SEO engagement including audits, content, and link building.',
    'Marketing Agency', ['seo', 'agency'],
    `<p>This SEO Services Agreement is entered into as of <strong>{{start_date}}</strong> between <strong>{{agency_name}}</strong> (<strong>"Agency"</strong>) and <strong>{{client_name}}</strong> (<strong>"Client"</strong>).</p>

<h2>1. SEO Services Included</h2>
<ul>
  <li>Technical SEO audit and on-page optimisation</li>
  <li>Keyword research and mapping (up to <strong>{{keyword_count}} target keywords</strong>)</li>
  <li>Monthly content production: <strong>{{content_pieces}} pieces</strong></li>
  <li>Link building: minimum <strong>{{link_count}} quality backlinks</strong> per month</li>
  <li>Google Search Console and Analytics setup and monitoring</li>
  <li>Monthly ranking report and strategy call</li>
</ul>

<h2>2. Timeline &amp; Expectations</h2>
<p>SEO results typically require <strong>3–6 months</strong> to manifest. Agency does not guarantee specific ranking positions, as results depend on competitive landscape and algorithm changes.</p>

<h2>3. Monthly Fee</h2>
<p>Monthly retainer: <strong>{{monthly_fee}}</strong>. Minimum term: <strong>{{minimum_term}} months</strong>.</p>`),

  t('Paid Ads Management Contract',
    'Google, Meta, or other paid advertising channel management.',
    'Marketing Agency', ['ads', 'ppc'],
    `<p>This Paid Advertising Management Agreement is entered into as of <strong>{{start_date}}</strong> between <strong>{{agency_name}}</strong> (<strong>"Agency"</strong>) and <strong>{{client_name}}</strong> (<strong>"Client"</strong>).</p>

<h2>1. Channels Managed</h2>
<p>Agency will manage paid campaigns on: <strong>{{ad_channels}}</strong>.</p>

<h2>2. Monthly Ad Budget</h2>
<p>Client will provide a monthly ad spend budget of <strong>{{ad_budget}}</strong>. Budgets must be funded in advance.</p>

<h2>3. Management Fee</h2>
<p>Agency charges a management fee of <strong>{{management_fee}}</strong> (or <strong>{{management_percentage}}% of ad spend</strong>, whichever is higher).</p>

<h2>4. Deliverables</h2>
<ul>
  <li>Campaign setup, copywriting, and creative direction</li>
  <li>Ongoing A/B testing and optimisation</li>
  <li>Weekly performance summary</li>
  <li>Monthly strategy review call</li>
</ul>

<h2>5. Reporting</h2>
<p>Agency will provide a live dashboard and monthly report covering spend, impressions, clicks, conversions, CPA, and ROAS.</p>`),

  t('Brand Identity Design Agreement',
    'Logo and full brand system design engagement.',
    'Marketing Agency', ['brand', 'design'],
    `<p>This Brand Identity Design Agreement is entered into as of <strong>{{start_date}}</strong> between <strong>{{studio_name}}</strong> (<strong>"Studio"</strong>) and <strong>{{client_name}}</strong> (<strong>"Client"</strong>).</p>

<h2>1. Deliverables</h2>
<ul>
  <li>Primary logo (full colour, reverse, monochrome)</li>
  <li>Secondary logo / icon variants</li>
  <li>Brand colour palette (Pantone, CMYK, RGB, HEX)</li>
  <li>Typography system (primary and secondary typefaces)</li>
  <li>Brand guidelines document ({{page_count}} pages)</li>
  <li>Business card and letterhead templates</li>
  <li>Final files in AI, EPS, SVG, PNG, PDF formats</li>
</ul>

<h2>2. Process</h2>
<p><strong>Phase 1 — Discovery:</strong> Brand questionnaire, competitor analysis, mood board.<br/><strong>Phase 2 — Concepts:</strong> {{concept_count}} initial directions presented.<br/><strong>Phase 3 — Refinement:</strong> {{revision_rounds}} rounds of revisions.<br/><strong>Phase 4 — Delivery:</strong> Final files and brand guidelines.</p>

<h2>3. Investment</h2>
<p>Total fee: <strong>{{total_fee}}</strong>. Payable: 50% deposit to begin, 50% on delivery.</p>

<h2>4. Revisions</h2>
<p>This Agreement includes <strong>{{revision_rounds}} rounds</strong> of revisions. Additional revisions are billed at <strong>{{hourly_rate}}/hour</strong>.</p>`),

  t('Website Design Agreement',
    'Full website design and development project contract.',
    'Marketing Agency', ['web', 'design'],
    `<p>This Website Design &amp; Development Agreement is entered into as of <strong>{{start_date}}</strong> between <strong>{{agency_name}}</strong> (<strong>"Agency"</strong>) and <strong>{{client_name}}</strong> (<strong>"Client"</strong>).</p>

<h2>1. Project Scope</h2>
<p>Agency will design and develop a <strong>{{page_count}}-page website</strong> for Client. Pages include: {{page_list}}.</p>

<h2>2. Technology</h2>
<p>Platform: <strong>{{platform}}</strong>. Hosting provided by: <strong>{{hosting_provider}}</strong>.</p>

<h2>3. Project Timeline</h2>
<table style="width:100%;border-collapse:collapse;">
  <tr style="background:#f8fafc;"><th style="padding:8px;border:1px solid #e2e8f0;text-align:left;">Phase</th><th style="padding:8px;border:1px solid #e2e8f0;text-align:left;">Timeline</th></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;">Discovery &amp; Wireframes</td><td style="padding:8px;border:1px solid #e2e8f0;">{{wireframe_weeks}} weeks</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;">Design</td><td style="padding:8px;border:1px solid #e2e8f0;">{{design_weeks}} weeks</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;">Development</td><td style="padding:8px;border:1px solid #e2e8f0;">{{dev_weeks}} weeks</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;">Testing &amp; Launch</td><td style="padding:8px;border:1px solid #e2e8f0;">{{qa_weeks}} weeks</td></tr>
</table>

<h2>4. Investment</h2>
<p>Total: <strong>{{total_fee}}</strong>. Payment: 40% deposit, 30% at design approval, 30% at launch.</p>

<h2>5. Post-Launch Support</h2>
<p>Includes <strong>{{support_days}} days</strong> of bug-fix support at no charge post-launch.</p>`),

  t('Influencer Collaboration Agreement',
    'Brand and influencer partnership for sponsored content.',
    'Marketing Agency', ['influencer'],
    `<p>This Influencer Collaboration Agreement is entered into as of <strong>{{date}}</strong> between <strong>{{brand_name}}</strong> (<strong>"Brand"</strong>) and <strong>{{influencer_name}}</strong> (<strong>"Influencer"</strong>).</p>

<h2>1. Campaign Details</h2>
<table style="width:100%;border-collapse:collapse;">
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Campaign Name</td><td style="padding:8px;border:1px solid #e2e8f0;">{{campaign_name}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Product / Service</td><td style="padding:8px;border:1px solid #e2e8f0;">{{product_name}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Platforms</td><td style="padding:8px;border:1px solid #e2e8f0;">{{platforms}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Go-Live Date</td><td style="padding:8px;border:1px solid #e2e8f0;">{{go_live_date}}</td></tr>
</table>

<h2>2. Deliverables</h2>
<ul><li>{{deliverable_1}}</li><li>{{deliverable_2}}</li></ul>

<h2>3. Compensation</h2>
<p>Brand agrees to pay Influencer <strong>{{fee}}</strong>, payable within <strong>{{payment_days}} days</strong> of content going live and passing brand review.</p>

<h2>4. Disclosure</h2>
<p>Influencer agrees to clearly disclose the paid partnership in accordance with FTC guidelines using #Ad, #Sponsored, or equivalent disclosure required by local law.</p>

<h2>5. Content Approval</h2>
<p>Influencer will submit content for Brand approval at least <strong>{{approval_days}} business days</strong> before the go-live date. Brand has <strong>2 rounds</strong> of revisions.</p>`),

  t('Content Marketing Agreement',
    'Blog, article, and content production service contract.',
    'Marketing Agency', ['content', 'agency'],
    `<p>This Content Marketing Agreement is entered into as of <strong>{{start_date}}</strong> between <strong>{{agency_name}}</strong> (<strong>"Agency"</strong>) and <strong>{{client_name}}</strong> (<strong>"Client"</strong>).</p>

<h2>1. Monthly Content Deliverables</h2>
<ul>
  <li><strong>{{article_count}} long-form articles</strong> (avg. <strong>{{word_count}} words</strong> each), fully SEO-optimised</li>
  <li>Content calendar delivered by the <strong>{{calendar_date}}</strong> of each month</li>
  <li>Published directly to Client's CMS ({{cms_platform}})</li>
  <li>Monthly content performance report</li>
</ul>

<h2>2. Monthly Fee</h2>
<p>Monthly retainer: <strong>{{monthly_fee}}</strong>. Includes up to <strong>{{revision_rounds}} rounds</strong> of revisions per article.</p>

<h2>3. Ownership</h2>
<p>All content produced under this Agreement becomes the exclusive property of Client upon full payment.</p>`),

  t('PR Services Agreement',
    'Public relations retainer for media coverage and brand reputation.',
    'Marketing Agency', ['pr'],
    `<p>This Public Relations Services Agreement is entered into as of <strong>{{start_date}}</strong> between <strong>{{agency_name}}</strong> (<strong>"Agency"</strong>) and <strong>{{client_name}}</strong> (<strong>"Client"</strong>).</p>

<h2>1. Services</h2>
<ul>
  <li>Media list development and relationship management</li>
  <li>Press release writing and distribution (up to <strong>{{press_releases}} per month</strong>)</li>
  <li>Proactive media pitching targeting <strong>{{target_publications}}</strong></li>
  <li>Spokesperson training and interview preparation</li>
  <li>Monthly media coverage report</li>
</ul>

<h2>2. Monthly Retainer</h2>
<p>Client agrees to pay a monthly retainer of <strong>{{retainer_fee}}</strong>, invoiced on the 1st of each month.</p>

<h2>3. No Guarantee of Coverage</h2>
<p>Agency will make best efforts to secure media placements. Agency cannot guarantee publication, as editorial decisions remain with media outlets.</p>`),

  t('Creative Brief',
    'Kickoff brief aligning stakeholders on a creative project.',
    'Marketing Agency', ['brief', 'creative'],
    `<p>Project: <strong>{{project_name}}</strong><br/>Date: <strong>{{date}}</strong><br/>Prepared by: <strong>{{prepared_by}}</strong></p>

<h2>Project Overview</h2>
<p>{{project_overview}}</p>

<h2>Objective</h2>
<p>{{objective}}</p>

<h2>Target Audience</h2>
<p><strong>Primary:</strong> {{primary_audience}}<br/><strong>Secondary:</strong> {{secondary_audience}}</p>

<h2>Key Messages</h2>
<ul><li>{{key_message_1}}</li><li>{{key_message_2}}</li><li>{{key_message_3}}</li></ul>

<h2>Deliverables</h2>
<ul><li>{{deliverable_1}}</li><li>{{deliverable_2}}</li></ul>

<h2>Timeline</h2>
<p>Deadline: <strong>{{deadline}}</strong></p>

<h2>Budget</h2>
<p>Total budget: <strong>{{budget}}</strong></p>

<h2>Tone &amp; Style</h2>
<p>{{tone_description}}</p>`),

  t('Campaign Strategy Document',
    'Full marketing campaign strategy with objectives, channels, and KPIs.',
    'Marketing Agency', ['campaign'],
    `<p>Campaign: <strong>{{campaign_name}}</strong><br/>Period: <strong>{{start_date}} – {{end_date}}</strong><br/>Budget: <strong>{{budget}}</strong></p>

<h2>Executive Summary</h2>
<p>{{executive_summary}}</p>

<h2>Campaign Objectives</h2>
<ul><li>{{objective_1}}</li><li>{{objective_2}}</li></ul>

<h2>Target Audience</h2>
<p>{{audience_description}}</p>

<h2>Channel Strategy</h2>
<table style="width:100%;border-collapse:collapse;">
  <tr style="background:#f8fafc;"><th style="padding:8px;border:1px solid #e2e8f0;">Channel</th><th style="padding:8px;border:1px solid #e2e8f0;">Budget Allocation</th><th style="padding:8px;border:1px solid #e2e8f0;">KPI</th></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;">{{channel_1}}</td><td style="padding:8px;border:1px solid #e2e8f0;">{{budget_1}}</td><td style="padding:8px;border:1px solid #e2e8f0;">{{kpi_1}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;">{{channel_2}}</td><td style="padding:8px;border:1px solid #e2e8f0;">{{budget_2}}</td><td style="padding:8px;border:1px solid #e2e8f0;">{{kpi_2}}</td></tr>
</table>

<h2>Success Metrics</h2>
<ul><li>{{metric_1}}</li><li>{{metric_2}}</li></ul>`),

  t('Email Marketing Services',
    'Agreement for newsletter and email campaign management.',
    'Marketing Agency', ['email', 'agency'],
    `<p>This Email Marketing Services Agreement is entered into as of <strong>{{start_date}}</strong> between <strong>{{agency_name}}</strong> and <strong>{{client_name}}</strong>.</p>

<h2>1. Monthly Deliverables</h2>
<ul>
  <li><strong>{{campaign_count}} email campaigns</strong> per month</li>
  <li>Email design and copywriting</li>
  <li>List segmentation and management</li>
  <li>A/B testing of subject lines and content</li>
  <li>Monthly performance report (open rate, CTR, conversions)</li>
</ul>

<h2>2. Platform</h2>
<p>Campaigns managed via: <strong>{{email_platform}}</strong>.</p>

<h2>3. Monthly Fee</h2>
<p>Monthly retainer: <strong>{{monthly_fee}}</strong> (excludes email platform subscription costs).</p>`),

  t('Video Production Agreement',
    'Short-form or long-form video production contract.',
    'Marketing Agency', ['video', 'agency'],
    `<p>This Video Production Agreement is entered into as of <strong>{{date}}</strong> between <strong>{{production_company}}</strong> (<strong>"Producer"</strong>) and <strong>{{client_name}}</strong> (<strong>"Client"</strong>).</p>

<h2>1. Production Scope</h2>
<p>Producer will create <strong>{{video_count}} video(s)</strong> of approximately <strong>{{duration}} seconds/minutes</strong> each, for the following purpose: <strong>{{purpose}}</strong>.</p>

<h2>2. Production Schedule</h2>
<table style="width:100%;border-collapse:collapse;">
  <tr style="background:#f8fafc;"><th style="padding:8px;border:1px solid #e2e8f0;">Phase</th><th style="padding:8px;border:1px solid #e2e8f0;">Date</th></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;">Pre-production &amp; Script</td><td style="padding:8px;border:1px solid #e2e8f0;">{{preproduction_date}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;">Production / Shoot</td><td style="padding:8px;border:1px solid #e2e8f0;">{{shoot_date}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;">First Edit</td><td style="padding:8px;border:1px solid #e2e8f0;">{{first_edit_date}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;">Final Delivery</td><td style="padding:8px;border:1px solid #e2e8f0;">{{delivery_date}}</td></tr>
</table>

<h2>3. Investment</h2>
<p>Total fee: <strong>{{total_fee}}</strong>. Payment: 50% deposit, 50% on delivery of final cut. Includes <strong>{{revision_rounds}} rounds</strong> of revisions.</p>

<h2>4. Usage Rights</h2>
<p>Client receives a non-exclusive, worldwide, perpetual licence to use the final video for: <strong>{{usage_rights}}</strong>.</p>`),

  t('Marketing Plan',
    'Quarterly or annual marketing plan with goals, channels, and budget.',
    'Marketing Agency', ['plan'],
    `<p>Plan Period: <strong>{{period}}</strong><br/>Prepared by: <strong>{{prepared_by}}</strong><br/>Date: <strong>{{date}}</strong></p>

<h2>Business Overview</h2>
<p>{{business_overview}}</p>

<h2>Marketing Goals</h2>
<ul><li>{{goal_1}}</li><li>{{goal_2}}</li><li>{{goal_3}}</li></ul>

<h2>Target Market</h2>
<p>{{target_market}}</p>

<h2>Marketing Channels &amp; Budget</h2>
<table style="width:100%;border-collapse:collapse;">
  <tr style="background:#f8fafc;"><th style="padding:8px;border:1px solid #e2e8f0;">Channel</th><th style="padding:8px;border:1px solid #e2e8f0;text-align:right;">Budget</th><th style="padding:8px;border:1px solid #e2e8f0;">Expected Outcome</th></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;">{{channel_1}}</td><td style="padding:8px;border:1px solid #e2e8f0;text-align:right;">{{budget_1}}</td><td style="padding:8px;border:1px solid #e2e8f0;">{{outcome_1}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;">{{channel_2}}</td><td style="padding:8px;border:1px solid #e2e8f0;text-align:right;">{{budget_2}}</td><td style="padding:8px;border:1px solid #e2e8f0;">{{outcome_2}}</td></tr>
  <tr style="font-weight:700;"><td style="padding:8px;border:1px solid #e2e8f0;">Total Budget</td><td style="padding:8px;border:1px solid #e2e8f0;text-align:right;">{{total_budget}}</td><td style="padding:8px;border:1px solid #e2e8f0;"></td></tr>
</table>

<h2>KPIs</h2>
<ul><li>{{kpi_1}}</li><li>{{kpi_2}}</li></ul>`),

  // ── HR ─────────────────────────────────────────────────────────────────

  t('Employee Confidentiality Agreement',
    'Protects company secrets on new hire onboarding.',
    'HR', ['confidentiality', 'hr'],
    `<p>This Employee Confidentiality Agreement is entered into as of <strong>{{date}}</strong> between <strong>{{company_name}}</strong> (<strong>"Company"</strong>) and <strong>{{employee_name}}</strong> (<strong>"Employee"</strong>).</p>

<h2>1. Confidential Information</h2>
<p>Employee acknowledges that in the course of employment they will have access to Confidential Information including, but not limited to: trade secrets, customer lists, pricing, financial data, product roadmaps, and technical know-how.</p>

<h2>2. Non-Disclosure Obligations</h2>
<p>Employee agrees not to: (a) disclose Confidential Information to any third party; (b) use Confidential Information for personal benefit or for the benefit of any competitor; (c) copy or transmit Confidential Information except as required in the normal course of employment.</p>

<h2>3. Duration</h2>
<p>These obligations continue for <strong>{{duration}}</strong> following termination of employment.</p>

<h2>4. Return of Property</h2>
<p>Upon termination, Employee shall immediately return all Confidential Information, documents, devices, and materials in their possession.</p>`),

  t('Non-Compete Agreement',
    'Post-employment non-compete restricting competition and solicitation.',
    'HR', ['noncompete'],
    `<p>This Non-Compete Agreement (<strong>"Agreement"</strong>) is entered into as of <strong>{{date}}</strong> between <strong>{{company_name}}</strong> (<strong>"Company"</strong>) and <strong>{{employee_name}}</strong> (<strong>"Employee"</strong>).</p>

<h2>1. Restricted Activities</h2>
<p>During employment and for <strong>{{duration}}</strong> after termination, Employee agrees not to: (a) directly or indirectly engage in any business that competes with Company within <strong>{{territory}}</strong>; (b) solicit or attempt to hire any Company employee; (c) solicit or service any Company customer with whom Employee had material contact.</p>

<h2>2. Consideration</h2>
<p>Employee acknowledges receipt of adequate consideration for this Agreement, including continued employment and access to confidential information and training.</p>

<h2>3. Reasonableness</h2>
<p>Employee agrees that the restrictions are reasonable in time, geography, and scope and are necessary to protect Company's legitimate business interests.</p>`),

  t('Employee Handbook Acknowledgement',
    'Employee sign-off confirming receipt and review of company handbook.',
    'HR', ['handbook'],
    `<p>I, <strong>{{employee_name}}</strong>, acknowledge that I have received, read, and understand the <strong>{{company_name}} Employee Handbook</strong> (version <strong>{{version}}</strong>, effective <strong>{{effective_date}}</strong>).</p>

<p>I understand and agree that:</p>
<ul>
  <li>The Handbook sets forth the Company's policies and my responsibilities as an employee.</li>
  <li>The Handbook does not constitute an employment contract.</li>
  <li>The Company reserves the right to amend, revise, or rescind any policies at any time.</li>
  <li>I am responsible for staying informed of any updates to the Handbook.</li>
  <li>Violations of Handbook policies may result in disciplinary action, up to and including termination.</li>
</ul>

<p>If I have any questions about the Handbook, I understand I should contact <strong>{{hr_contact}}</strong> in Human Resources.</p>`),

  t('Termination Letter',
    'Formal notice of termination of employment.',
    'HR', ['termination'],
    `<p>Date: <strong>{{date}}</strong></p>
<p>Dear <strong>{{employee_name}}</strong>,</p>
<p>This letter serves as formal notice that your employment with <strong>{{company_name}}</strong> is terminated, effective <strong>{{termination_date}}</strong>.</p>

<h2>Reason for Termination</h2>
<p>{{reason_for_termination}}</p>

<h2>Final Pay &amp; Benefits</h2>
<p>Your final paycheck, including payment for all hours worked through your termination date and any accrued but unused vacation (per Company policy), will be processed on <strong>{{final_pay_date}}</strong>.</p>

<h2>Return of Company Property</h2>
<p>Please return all Company property (laptop, badge, keys, documents) to HR by <strong>{{return_date}}</strong>.</p>

<h2>Confidentiality</h2>
<p>Your confidentiality and non-solicitation obligations remain in full effect per your employment agreement.</p>

<p>Sincerely,<br/><strong>{{hr_name}}</strong><br/>{{hr_title}}<br/>{{company_name}}</p>`),

  t('Performance Improvement Plan (PIP)',
    '90-day performance improvement plan with measurable goals.',
    'HR', ['pip'],
    `<p>Employee: <strong>{{employee_name}}</strong><br/>Title: <strong>{{job_title}}</strong><br/>Manager: <strong>{{manager_name}}</strong><br/>Start Date: <strong>{{pip_start_date}}</strong><br/>End Date: <strong>{{pip_end_date}}</strong></p>

<h2>Purpose</h2>
<p>This Performance Improvement Plan (PIP) has been developed to assist <strong>{{employee_name}}</strong> in meeting the performance standards required for their role.</p>

<h2>Areas for Improvement</h2>
<ul><li>{{improvement_area_1}}</li><li>{{improvement_area_2}}</li></ul>

<h2>Goals &amp; Milestones</h2>
<table style="width:100%;border-collapse:collapse;">
  <tr style="background:#f8fafc;"><th style="padding:8px;border:1px solid #e2e8f0;">Goal</th><th style="padding:8px;border:1px solid #e2e8f0;">Metric</th><th style="padding:8px;border:1px solid #e2e8f0;">Target Date</th></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;">{{goal_1}}</td><td style="padding:8px;border:1px solid #e2e8f0;">{{metric_1}}</td><td style="padding:8px;border:1px solid #e2e8f0;">{{date_1}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;">{{goal_2}}</td><td style="padding:8px;border:1px solid #e2e8f0;">{{metric_2}}</td><td style="padding:8px;border:1px solid #e2e8f0;">{{date_2}}</td></tr>
</table>

<h2>Support Provided</h2>
<p>{{support_resources}}</p>

<h2>Consequences</h2>
<p>Failure to meet the goals outlined above by <strong>{{pip_end_date}}</strong> may result in further disciplinary action, up to and including termination of employment.</p>`),

  t('Parental Leave Policy Agreement',
    'Parental leave entitlement and return-to-work agreement.',
    'HR', ['leave'],
    `<p>Employee: <strong>{{employee_name}}</strong><br/>Expected Start of Leave: <strong>{{leave_start}}</strong><br/>Expected Return Date: <strong>{{return_date}}</strong></p>

<h2>Leave Entitlement</h2>
<p>In accordance with Company policy and applicable law, <strong>{{employee_name}}</strong> is entitled to <strong>{{leave_duration}} weeks</strong> of parental leave, of which <strong>{{paid_weeks}} weeks</strong> will be fully paid at their current base salary.</p>

<h2>Benefits During Leave</h2>
<p>Health insurance and other Company benefits will continue during the leave period, subject to employee contribution requirements.</p>

<h2>Return to Work</h2>
<p>Employee is expected to return to their position (or an equivalent position) on <strong>{{return_date}}</strong>. Employee agrees to notify HR at least <strong>2 weeks</strong> in advance of any changes to the expected return date.</p>`),

  // ── Real Estate ─────────────────────────────────────────────────────────

  t('Residential Lease Agreement',
    'Standard fixed-term residential lease for landlords and tenants.',
    'Real Estate', ['lease'],
    `<p>This Residential Lease Agreement (<strong>"Lease"</strong>) is entered into as of <strong>{{lease_date}}</strong> between <strong>{{landlord_name}}</strong> (<strong>"Landlord"</strong>) and <strong>{{tenant_name}}</strong> (<strong>"Tenant"</strong>).</p>

<h2>1. Property</h2>
<p>Landlord hereby leases to Tenant the residential property located at: <strong>{{property_address}}</strong> (<strong>"Premises"</strong>).</p>

<h2>2. Term</h2>
<p>The lease term begins on <strong>{{start_date}}</strong> and ends on <strong>{{end_date}}</strong>.</p>

<h2>3. Rent</h2>
<p>Monthly rent: <strong>{{monthly_rent}}</strong>, payable on the <strong>{{due_day}}th</strong> of each month. Late fee of <strong>{{late_fee}}</strong> applies after a <strong>{{grace_period}}-day</strong> grace period.</p>

<h2>4. Security Deposit</h2>
<p>Security deposit: <strong>{{deposit_amount}}</strong>, held in a separate account and returned within <strong>{{deposit_return_days}} days</strong> of lease end, less any deductions for damages.</p>

<h2>5. Utilities</h2>
<p>Tenant is responsible for: <strong>{{tenant_utilities}}</strong>. Landlord is responsible for: <strong>{{landlord_utilities}}</strong>.</p>

<h2>6. Pets</h2>
<p>{{pet_policy}}</p>

<h2>7. Maintenance</h2>
<p>Tenant agrees to keep Premises in good condition and promptly notify Landlord of any necessary repairs.</p>`),

  t('Commercial Lease Agreement',
    'Commercial property lease for office, retail, or industrial use.',
    'Real Estate', ['lease', 'commercial'],
    `<p>This Commercial Lease Agreement is entered into as of <strong>{{date}}</strong> between <strong>{{landlord_name}}</strong> (<strong>"Landlord"</strong>) and <strong>{{tenant_company}}</strong> (<strong>"Tenant"</strong>).</p>

<h2>1. Premises</h2>
<p>Landlord leases to Tenant approximately <strong>{{square_footage}} sq ft</strong> at <strong>{{property_address}}</strong>, Unit/Suite <strong>{{unit}}</strong> (<strong>"Premises"</strong>), for use as <strong>{{permitted_use}}</strong>.</p>

<h2>2. Term</h2>
<p>Lease term: <strong>{{term_years}} years</strong> commencing <strong>{{start_date}}</strong>.</p>

<h2>3. Rent</h2>
<p>Base rent: <strong>{{monthly_rent}}/month</strong>. Rent increases <strong>{{annual_increase}}%</strong> annually on each anniversary.</p>

<h2>4. Operating Expenses</h2>
<p>Tenant's proportionate share of operating expenses (CAM): <strong>{{cam_estimate}}/month</strong> (estimated), reconciled annually.</p>

<h2>5. Improvements</h2>
<p>Tenant may make improvements with prior written consent of Landlord. Tenant improvements are Tenant's property unless otherwise agreed; Tenant shall restore Premises to original condition upon expiry unless waived by Landlord.</p>`),

  t('Purchase & Sale Agreement',
    'Real estate purchase and sale agreement for residential property.',
    'Real Estate', ['purchase'],
    `<p>This Purchase and Sale Agreement (<strong>"Agreement"</strong>) is entered into as of <strong>{{date}}</strong> between <strong>{{seller_name}}</strong> (<strong>"Seller"</strong>) and <strong>{{buyer_name}}</strong> (<strong>"Buyer"</strong>).</p>

<h2>1. Property</h2>
<p>Seller agrees to sell and Buyer agrees to purchase the property located at <strong>{{property_address}}</strong> (<strong>"Property"</strong>), including all fixtures and improvements.</p>

<h2>2. Purchase Price</h2>
<p>Purchase price: <strong>{{purchase_price}}</strong>. Earnest money deposit: <strong>{{deposit_amount}}</strong>, due within <strong>{{deposit_due_days}} days</strong>.</p>

<h2>3. Financing Contingency</h2>
<p>This Agreement is contingent upon Buyer obtaining financing at no more than <strong>{{interest_rate}}%</strong> interest. Buyer shall apply for financing within <strong>{{financing_application_days}} days</strong>.</p>

<h2>4. Inspection</h2>
<p>Buyer has <strong>{{inspection_days}} days</strong> to complete a property inspection. If defects are discovered, Buyer may request repairs or credits, or terminate this Agreement.</p>

<h2>5. Closing</h2>
<p>Closing shall occur on or before <strong>{{closing_date}}</strong> at a mutually agreed location.</p>`),

  t('Rental Application',
    'Prospective tenant rental application form.',
    'Real Estate', ['rental'],
    `<p>Property Address: <strong>{{property_address}}</strong><br/>Application Date: <strong>{{date}}</strong></p>

<h2>Applicant Information</h2>
<table style="width:100%;border-collapse:collapse;">
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;width:40%">Full Name</td><td style="padding:8px;border:1px solid #e2e8f0;">{{applicant_name}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Date of Birth</td><td style="padding:8px;border:1px solid #e2e8f0;">{{dob}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Phone</td><td style="padding:8px;border:1px solid #e2e8f0;">{{phone}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Email</td><td style="padding:8px;border:1px solid #e2e8f0;">{{email}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Current Address</td><td style="padding:8px;border:1px solid #e2e8f0;">{{current_address}}</td></tr>
</table>

<h2>Employment &amp; Income</h2>
<table style="width:100%;border-collapse:collapse;">
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Employer</td><td style="padding:8px;border:1px solid #e2e8f0;">{{employer}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Job Title</td><td style="padding:8px;border:1px solid #e2e8f0;">{{job_title}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Monthly Income</td><td style="padding:8px;border:1px solid #e2e8f0;">{{monthly_income}}</td></tr>
</table>

<h2>References</h2>
<p>Reference 1: <strong>{{reference_1_name}}</strong>, {{reference_1_relationship}}, {{reference_1_phone}}</p>
<p>Reference 2: <strong>{{reference_2_name}}</strong>, {{reference_2_relationship}}, {{reference_2_phone}}</p>

<p>I authorise the landlord to conduct credit and background checks and verify all information provided above.</p>`),

  // ── Tech ────────────────────────────────────────────────────────────────

  t('Software License Agreement',
    'Perpetual or term license for proprietary software.',
    'Tech', ['license'],
    `<p>This Software License Agreement (<strong>"Agreement"</strong>) is entered into as of <strong>{{effective_date}}</strong> between <strong>{{licensor_name}}</strong> (<strong>"Licensor"</strong>) and <strong>{{licensee_name}}</strong> (<strong>"Licensee"</strong>).</p>

<h2>1. License Grant</h2>
<p>Licensor grants Licensee a <strong>{{license_type}}</strong> (non-exclusive, non-transferable) license to use <strong>{{software_name}}</strong> (<strong>"Software"</strong>) for internal business purposes only.</p>

<h2>2. Restrictions</h2>
<p>Licensee shall not: (a) sublicense, sell, or transfer the Software; (b) reverse engineer, decompile, or disassemble the Software; (c) use the Software to develop a competing product.</p>

<h2>3. Fees</h2>
<p>License fee: <strong>{{license_fee}}</strong>, payable as <strong>{{payment_terms}}</strong>. Annual maintenance and support: <strong>{{support_fee}}</strong>.</p>

<h2>4. Term</h2>
<p>This Agreement is effective for <strong>{{term}}</strong> and renews automatically unless terminated with <strong>{{notice_days}} days'</strong> written notice.</p>

<h2>5. Warranty Disclaimer</h2>
<p>THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. LICENSOR'S TOTAL LIABILITY SHALL NOT EXCEED FEES PAID IN THE PRIOR 12 MONTHS.</p>`),

  t('SaaS Subscription Agreement',
    'Cloud-hosted SaaS subscription terms for businesses.',
    'Tech', ['saas'],
    `<p>This SaaS Subscription Agreement (<strong>"Agreement"</strong>) is entered into as of <strong>{{effective_date}}</strong> between <strong>{{provider_name}}</strong> (<strong>"Provider"</strong>) and <strong>{{customer_name}}</strong> (<strong>"Customer"</strong>).</p>

<h2>1. Service</h2>
<p>Provider will make available to Customer the <strong>{{service_name}}</strong> service (<strong>"Service"</strong>) as described in the Order Form. Provider grants Customer a limited, non-exclusive right to access and use the Service during the Subscription Term.</p>

<h2>2. Subscription &amp; Payment</h2>
<p>Plan: <strong>{{plan_name}}</strong>. Subscription Fee: <strong>{{fee}}/{{billing_cycle}}</strong>. Invoiced in advance.</p>

<h2>3. Data &amp; Privacy</h2>
<p>Customer retains all rights to Customer Data. Provider processes Customer Data solely to deliver the Service, in accordance with the Privacy Policy and applicable data protection laws.</p>

<h2>4. Uptime SLA</h2>
<p>Provider targets <strong>{{sla_percentage}}% monthly uptime</strong>, excluding scheduled maintenance. Credits for downtime beyond SLA thresholds are detailed in Provider's SLA Policy.</p>

<h2>5. Termination</h2>
<p>Either Party may terminate this Agreement with <strong>{{notice_days}} days'</strong> written notice. Customer may export data within <strong>30 days</strong> of termination.</p>`),

  t('Data Processing Agreement (DPA)',
    'GDPR-compliant DPA between data controller and processor.',
    'Tech', ['dpa', 'gdpr'],
    `<p>This Data Processing Agreement (<strong>"DPA"</strong>) is entered into as of <strong>{{effective_date}}</strong> between <strong>{{controller_name}}</strong> (<strong>"Controller"</strong>) and <strong>{{processor_name}}</strong> (<strong>"Processor"</strong>).</p>

<h2>1. Scope of Processing</h2>
<p><strong>Subject matter:</strong> {{processing_subject}}<br/><strong>Nature and purpose:</strong> {{processing_purpose}}<br/><strong>Type of personal data:</strong> {{data_types}}<br/><strong>Categories of data subjects:</strong> {{data_subjects}}</p>

<h2>2. Processor Obligations</h2>
<p>Processor agrees to: (a) process personal data only on documented instructions from Controller; (b) ensure persons authorised to process data are under confidentiality obligations; (c) implement appropriate technical and organisational security measures; (d) not engage sub-processors without prior written consent from Controller.</p>

<h2>3. Data Subject Rights</h2>
<p>Processor shall assist Controller in responding to data subject rights requests (access, rectification, erasure, portability) within <strong>{{response_days}} days</strong>.</p>

<h2>4. Data Breach</h2>
<p>Processor shall notify Controller without undue delay (and within <strong>72 hours</strong>) upon becoming aware of a personal data breach.</p>

<h2>5. Deletion / Return</h2>
<p>Upon termination, Processor shall, at Controller's choice, delete or return all personal data within <strong>{{deletion_days}} days</strong>.</p>`),

  t('API License Agreement',
    'Terms for accessing and using a third-party API.',
    'Tech', ['api'],
    `<p>This API License Agreement is entered into as of <strong>{{effective_date}}</strong> between <strong>{{api_provider}}</strong> (<strong>"Provider"</strong>) and <strong>{{developer_name}}</strong> (<strong>"Developer"</strong>).</p>

<h2>1. API Access</h2>
<p>Provider grants Developer a revocable, non-exclusive, non-transferable licence to access and use the <strong>{{api_name}}</strong> API for the purpose of: <strong>{{permitted_purpose}}</strong>.</p>

<h2>2. Usage Limits</h2>
<p>Developer's usage is subject to the following limits: <strong>{{rate_limit}} API calls per {{rate_period}}</strong>. Exceeding limits may result in throttling or suspension.</p>

<h2>3. Prohibited Uses</h2>
<p>Developer shall not: resell API access; use the API to build competing products; scrape or extract data in bulk; violate any applicable law or third-party rights.</p>

<h2>4. Fees</h2>
<p>API access fee: <strong>{{api_fee}}</strong>, billed <strong>{{billing_frequency}}</strong>.</p>

<h2>5. Termination</h2>
<p>Provider may suspend or terminate API access immediately upon breach of this Agreement.</p>`),

  t('Beta Testing Agreement',
    'NDA and feedback agreement for beta testers of a new product.',
    'Tech', ['beta'],
    `<p>This Beta Testing Agreement is entered into as of <strong>{{date}}</strong> between <strong>{{company_name}}</strong> (<strong>"Company"</strong>) and <strong>{{tester_name}}</strong> (<strong>"Tester"</strong>).</p>

<h2>1. Beta Programme</h2>
<p>Company invites Tester to participate in the beta testing programme for <strong>{{product_name}}</strong> (<strong>"Beta Product"</strong>) from <strong>{{beta_start}}</strong> to <strong>{{beta_end}}</strong>.</p>

<h2>2. Tester Responsibilities</h2>
<ul>
  <li>Test the Beta Product in good faith and report bugs via {{feedback_channel}}</li>
  <li>Provide at least <strong>{{feedback_frequency}}</strong> feedback sessions</li>
  <li>Complete exit survey upon programme completion</li>
</ul>

<h2>3. Confidentiality</h2>
<p>Tester agrees to keep all information about the Beta Product strictly confidential and not to share screenshots, features, or functionality with any third party.</p>

<h2>4. No Compensation</h2>
<p>Beta access is provided free of charge. In exchange, Tester's feedback may be used to improve the product. Tester waives any claim to compensation for feedback provided.</p>

<h2>5. No Warranty</h2>
<p>The Beta Product is provided "as is" and may contain bugs. Company is not liable for any loss or damage resulting from use of the Beta Product.</p>`),

  // ── Finance ─────────────────────────────────────────────────────────────

  t('Loan Agreement',
    'Personal or business loan agreement with repayment terms.',
    'Finance', ['loan'],
    `<p>This Loan Agreement (<strong>"Agreement"</strong>) is entered into as of <strong>{{date}}</strong> between <strong>{{lender_name}}</strong> (<strong>"Lender"</strong>) and <strong>{{borrower_name}}</strong> (<strong>"Borrower"</strong>).</p>

<h2>1. Loan Amount</h2>
<p>Lender agrees to loan Borrower the principal amount of <strong>{{loan_amount}}</strong> (<strong>"Loan"</strong>).</p>

<h2>2. Interest Rate</h2>
<p>The Loan shall bear interest at <strong>{{interest_rate}}% per annum</strong> (simple / compound as applicable).</p>

<h2>3. Repayment Schedule</h2>
<table style="width:100%;border-collapse:collapse;">
  <tr style="background:#f8fafc;"><th style="padding:8px;border:1px solid #e2e8f0;">Payment</th><th style="padding:8px;border:1px solid #e2e8f0;">Due Date</th><th style="padding:8px;border:1px solid #e2e8f0;text-align:right;">Amount</th></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;">Monthly Instalment</td><td style="padding:8px;border:1px solid #e2e8f0;">{{payment_day}} of each month</td><td style="padding:8px;border:1px solid #e2e8f0;text-align:right;">{{monthly_payment}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;">Final Payment</td><td style="padding:8px;border:1px solid #e2e8f0;">{{final_payment_date}}</td><td style="padding:8px;border:1px solid #e2e8f0;text-align:right;">{{final_payment_amount}}</td></tr>
</table>

<h2>4. Default</h2>
<p>If Borrower fails to make a payment within <strong>{{grace_period}} days</strong> of its due date, the entire outstanding balance becomes immediately due.</p>

<h2>5. Governing Law</h2>
<p>This Agreement is governed by the laws of <strong>{{jurisdiction}}</strong>.</p>`),

  t('Promissory Note',
    'Unconditional promise to repay a debt on a specified date.',
    'Finance', ['promissory'],
    `<p>Date: <strong>{{date}}</strong><br/>Principal: <strong>{{principal_amount}}</strong></p>

<p>FOR VALUE RECEIVED, <strong>{{borrower_name}}</strong> (<strong>"Maker"</strong>) unconditionally promises to pay to the order of <strong>{{lender_name}}</strong> (<strong>"Payee"</strong>), the principal sum of <strong>{{principal_amount}}</strong>, together with interest at the rate of <strong>{{interest_rate}}% per annum</strong>.</p>

<h2>Payment</h2>
<p>The full principal and accrued interest shall be due and payable on <strong>{{due_date}}</strong>. Payment shall be made by <strong>{{payment_method}}</strong> to: <strong>{{payment_details}}</strong>.</p>

<h2>Late Payment</h2>
<p>Any payment not received within <strong>{{grace_days}} days</strong> of the due date shall incur a late fee of <strong>{{late_fee}}</strong> and the unpaid balance will accrue interest at <strong>{{default_rate}}%</strong>.</p>

<h2>Waiver</h2>
<p>Maker waives presentment, demand for payment, notice of non-payment, protest, and notice of protest.</p>`),

  t('Equity Investment Agreement',
    'Simple equity agreement for seed or angel investment rounds.',
    'Finance', ['equity'],
    `<p>This Equity Investment Agreement (<strong>"Agreement"</strong>) is entered into as of <strong>{{date}}</strong> between <strong>{{company_name}}</strong> (<strong>"Company"</strong>) and <strong>{{investor_name}}</strong> (<strong>"Investor"</strong>).</p>

<h2>1. Investment</h2>
<p>Investor agrees to invest <strong>{{investment_amount}}</strong> in Company in exchange for <strong>{{equity_percentage}}%</strong> of Company's fully diluted share capital at a pre-money valuation of <strong>{{valuation}}</strong>.</p>

<h2>2. Use of Funds</h2>
<p>The proceeds shall be used for: {{use_of_funds}}.</p>

<h2>3. Investor Rights</h2>
<ul>
  <li>Pro-rata right to participate in future funding rounds</li>
  <li>Information rights: quarterly financial statements</li>
  <li>Right of first refusal on any transfer of shares</li>
</ul>

<h2>4. Representations</h2>
<p>Company represents it is duly organised, has authority to enter this Agreement, and has no undisclosed material liabilities. Investor represents it is an accredited investor.</p>

<h2>5. Governing Law</h2>
<p>This Agreement is governed by the laws of <strong>{{jurisdiction}}</strong>.</p>`),

  t('Board Resolution',
    'Corporate board resolution to authorise a business action.',
    'Finance', ['board'],
    `<p>RESOLUTIONS OF THE BOARD OF DIRECTORS OF <strong>{{company_name}}</strong></p>
<p>A meeting of the Board of Directors was held on <strong>{{meeting_date}}</strong> at <strong>{{meeting_location}}</strong>. The following directors were present, constituting a quorum: <strong>{{directors_present}}</strong>.</p>

<h2>Resolution 1 — {{resolution_1_title}}</h2>
<p>RESOLVED, that the Board of Directors of {{company_name}} hereby authorises and approves: <strong>{{resolution_1_description}}</strong>.</p>

<h2>Resolution 2 — {{resolution_2_title}}</h2>
<p>RESOLVED FURTHER, that <strong>{{authorised_officer}}</strong>, acting as <strong>{{officer_title}}</strong>, is hereby authorised to execute any and all documents and take any and all actions necessary or appropriate to carry out the purposes of the foregoing resolution.</p>

<p>There being no further business, the meeting was adjourned.</p>
<p>Certified as a true and correct copy of the resolutions adopted by the Board of Directors.</p>`),

  // ── Legal / General ─────────────────────────────────────────────────────

  t('Freelance Services Agreement',
    'Lightweight project-based agreement for freelancers.',
    'Legal', ['freelance'],
    `<p>This Freelance Services Agreement is entered into as of <strong>{{date}}</strong> between <strong>{{client_name}}</strong> (<strong>"Client"</strong>) and <strong>{{freelancer_name}}</strong> (<strong>"Freelancer"</strong>).</p>

<h2>1. Project</h2>
<p>Freelancer agrees to complete the following project: <strong>{{project_description}}</strong>.</p>

<h2>2. Fee &amp; Payment</h2>
<p>Client agrees to pay Freelancer <strong>{{project_fee}}</strong>. Payment schedule: <strong>{{payment_schedule}}</strong>.</p>

<h2>3. Timeline</h2>
<p>Project to be completed by: <strong>{{deadline}}</strong>. Revisions included: <strong>{{revision_count}} rounds</strong>.</p>

<h2>4. Ownership</h2>
<p>All deliverables become Client's property upon receipt of full payment.</p>

<h2>5. Relationship</h2>
<p>Freelancer is an independent contractor. This Agreement does not create an employment relationship.</p>`),

  t('General Release of Liability',
    'Waiver releasing a party from liability for a specific activity.',
    'Legal', ['release', 'waiver'],
    `<p>This General Release of Liability (<strong>"Release"</strong>) is entered into as of <strong>{{date}}</strong> by <strong>{{releasor_name}}</strong> (<strong>"Releasor"</strong>) in favour of <strong>{{releasee_name}}</strong> (<strong>"Releasee"</strong>).</p>

<h2>Release</h2>
<p>In consideration of being permitted to participate in <strong>{{activity}}</strong>, Releasor, on behalf of themselves and their heirs, executors, administrators, and assigns, hereby forever releases and discharges Releasee from any and all claims, demands, damages, actions, causes of action, or suits at law or equity arising from or relating to participation in the Activity, including claims for personal injury, property damage, or death, whether caused by negligence or otherwise.</p>

<h2>Assumption of Risk</h2>
<p>Releasor acknowledges and voluntarily assumes all risks associated with <strong>{{activity}}</strong>, including the risk of injury, damage, or loss.</p>

<h2>Indemnification</h2>
<p>Releasor agrees to indemnify and hold harmless Releasee from any claims, costs, or liabilities arising from Releasor's participation in the Activity.</p>

<p>I have read this Release, understand its terms, and sign it freely and voluntarily.</p>`),

  t('Model Release',
    'Photo and video model release for commercial or editorial use.',
    'Legal', ['model'],
    `<p>This Model Release is entered into as of <strong>{{date}}</strong> between <strong>{{photographer_company}}</strong> (<strong>"Photographer"</strong>) and <strong>{{model_name}}</strong> (<strong>"Model"</strong>).</p>

<h2>Grant of Rights</h2>
<p>Model grants Photographer and its clients the irrevocable, royalty-free, worldwide, perpetual right to use, reproduce, publish, distribute, and display Model's likeness, image, voice, and appearance as captured in the shoot conducted on <strong>{{shoot_date}}</strong>.</p>

<h2>Permitted Uses</h2>
<p>Uses include, but are not limited to: <strong>{{permitted_uses}}</strong>.</p>

<h2>Compensation</h2>
<p>In consideration of this Release, Model has received: <strong>{{compensation}}</strong>.</p>

<h2>Waiver</h2>
<p>Model waives any right to inspect or approve finished images or the copy used in connection with them. Model releases Photographer from any claims arising out of any distortion, alteration, or composite use of the images.</p>`),

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
  // Wipe existing public templates to allow upgrades
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

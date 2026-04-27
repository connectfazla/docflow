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
    `<p>This Mutual Non-Disclosure Agreement (<strong>"Agreement"</strong>) is entered into as of <strong>{{effective_date}}</strong> (the <strong>"Effective Date"</strong>) by and between:</p>

<p><strong>{{party_a_name}}</strong>, a {{party_a_entity_type}} organised under the laws of {{party_a_jurisdiction}}, with its principal place of business at {{party_a_address}} (<strong>"Party A"</strong>); and</p>

<p><strong>{{party_b_name}}</strong>, a {{party_b_entity_type}} organised under the laws of {{party_b_jurisdiction}}, with its principal place of business at {{party_b_address}} (<strong>"Party B"</strong>).</p>

<p>Party A and Party B are each referred to herein as a <strong>"Party"</strong> and collectively as the <strong>"Parties."</strong></p>

<h2>1. Purpose</h2>
<p>The Parties wish to explore a potential business relationship concerning <strong>{{purpose}}</strong> (the <strong>"Purpose"</strong>). In connection with the Purpose, each Party (as a <strong>"Disclosing Party"</strong>) may disclose certain confidential and proprietary information to the other Party (as a <strong>"Receiving Party"</strong>).</p>

<h2>2. Definitions</h2>
<p><strong>"Confidential Information"</strong> means any non-public, proprietary, or confidential information disclosed by the Disclosing Party to the Receiving Party, whether disclosed orally, in writing, electronically, or by any other means, and whether or not marked as "confidential," including but not limited to: trade secrets; business plans; financial information; customer and supplier lists; technical data; source code; algorithms; product roadmaps; marketing strategies; and any other information that a reasonable person would consider confidential given the nature of the information and the circumstances of disclosure.</p>

<p><strong>"Representative"</strong> means, with respect to a Party, its directors, officers, employees, agents, advisors, contractors, and legal counsel who have a need to know the Confidential Information for the Purpose and who are bound by confidentiality obligations at least as protective as those set forth herein.</p>

<h2>3. Obligations of Receiving Party</h2>
<p>Each Receiving Party agrees to:</p>
<ol>
  <li>Hold all Confidential Information of the Disclosing Party in strict confidence using at least the same degree of care it uses to protect its own confidential information, but in no event less than reasonable care;</li>
  <li>Not disclose any Confidential Information to any third party without the prior written consent of the Disclosing Party, except to its Representatives on a need-to-know basis;</li>
  <li>Use the Confidential Information solely for the Purpose and for no other purpose whatsoever;</li>
  <li>Promptly notify the Disclosing Party in writing upon becoming aware of any actual or suspected unauthorised disclosure or use of Confidential Information;</li>
  <li>Not reverse engineer, disassemble, or decompile any prototypes, software, or tangible objects that embody the Confidential Information.</li>
</ol>

<h2>4. Exclusions from Confidentiality Obligations</h2>
<p>The obligations of Section 3 shall not apply to information that the Receiving Party can demonstrate by documentary evidence:</p>
<ol type="a">
  <li>Is or becomes publicly known through no breach of this Agreement by the Receiving Party;</li>
  <li>Was rightfully in the Receiving Party's possession prior to receipt from the Disclosing Party, free of any obligation of confidentiality;</li>
  <li>Is independently developed by the Receiving Party without use of or reference to the Confidential Information;</li>
  <li>Is rightfully received from a third party without restriction on disclosure; or</li>
  <li>Is required to be disclosed by applicable law, regulation, or court order, provided that the Receiving Party gives the Disclosing Party prompt prior written notice to the extent permitted by law and cooperates with the Disclosing Party's efforts to obtain a protective order or other confidential treatment.</li>
</ol>

<h2>5. Intellectual Property</h2>
<p>Nothing in this Agreement grants either Party any right, title, interest, or licence in or to any Confidential Information, intellectual property, or technology of the other Party. All Confidential Information remains the sole property of the Disclosing Party.</p>

<h2>6. Return or Destruction of Information</h2>
<p>Upon the written request of the Disclosing Party or upon expiration or termination of this Agreement, the Receiving Party shall promptly return or destroy (and certify in writing such destruction of) all Confidential Information and all copies, extracts, and summaries thereof, retaining only such copies as required by applicable law.</p>

<h2>7. No Representations or Warranties</h2>
<p>ALL CONFIDENTIAL INFORMATION IS PROVIDED "AS IS." THE DISCLOSING PARTY MAKES NO REPRESENTATION OR WARRANTY, EXPRESS OR IMPLIED, AS TO THE ACCURACY, COMPLETENESS, OR FITNESS FOR A PARTICULAR PURPOSE OF ANY CONFIDENTIAL INFORMATION.</p>

<h2>8. Term and Termination</h2>
<p>This Agreement shall commence on the Effective Date and remain in effect for a period of <strong>{{term_years}} years</strong>, unless earlier terminated by either Party upon thirty (30) days' written notice. The confidentiality obligations of Section 3 shall survive expiration or termination of this Agreement for a period of <strong>{{survival_years}} years</strong> thereafter.</p>

<h2>9. Remedies</h2>
<p>Each Party acknowledges that any breach of this Agreement may cause irreparable harm to the Disclosing Party for which monetary damages would be an inadequate remedy, and that the Disclosing Party shall be entitled to seek equitable relief, including injunction and specific performance, without the necessity of proving actual damages or posting bond.</p>

<h2>10. General Provisions</h2>
<p><strong>Governing Law.</strong> This Agreement shall be governed by and construed in accordance with the laws of <strong>{{governing_law_jurisdiction}}</strong>, without regard to its conflict of law principles.</p>
<p><strong>Dispute Resolution.</strong> Any dispute arising out of or relating to this Agreement shall be submitted to the exclusive jurisdiction of the courts located in <strong>{{dispute_resolution_venue}}</strong>.</p>
<p><strong>Entire Agreement.</strong> This Agreement constitutes the entire agreement between the Parties with respect to its subject matter and supersedes all prior and contemporaneous agreements, negotiations, and understandings.</p>
<p><strong>Amendment.</strong> This Agreement may not be amended except by a written instrument signed by both Parties.</p>
<p><strong>Severability.</strong> If any provision of this Agreement is found to be unenforceable, the remaining provisions shall remain in full force and effect.</p>
<p><strong>Waiver.</strong> No failure or delay by either Party in exercising any right shall constitute a waiver of that right.</p>
<p><strong>Counterparts.</strong> This Agreement may be executed in counterparts, each of which shall be deemed an original, and electronic signatures shall be deemed valid.</p>

<div style="margin-top:48px;"><hr style="border:none;border-top:1px solid #e2e8f0;margin-bottom:32px;"/><table style="width:100%;border-collapse:collapse;"><tr><td style="width:50%;padding-right:24px;vertical-align:top;"><p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Party A — {{party_a_name}}</p><div style="border-bottom:1.5px solid #334155;height:48px;margin-bottom:8px;"></div><p style="margin:0;font-size:12px;color:#94a3b8;">Authorised Signatory: ___________________________</p><p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Title: ___________________________</p><p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Date: ___________________________</p></td><td style="width:50%;padding-left:24px;vertical-align:top;"><p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Party B — {{party_b_name}}</p><div style="border-bottom:1.5px solid #334155;height:48px;margin-bottom:8px;"></div><p style="margin:0;font-size:12px;color:#94a3b8;">Authorised Signatory: ___________________________</p><p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Title: ___________________________</p><p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Date: ___________________________</p></td></tr></table></div>`),

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
    `<p>This Freelance Service Agreement (<strong>"Agreement"</strong>) is entered into as of <strong>{{effective_date}}</strong> by and between:</p>

<p><strong>{{client_name}}</strong>, a {{client_entity_type}} with its principal place of business at {{client_address}} (<strong>"Client"</strong>); and</p>

<p><strong>{{freelancer_name}}</strong>, an individual / {{freelancer_entity_type}} with a principal place of business at {{freelancer_address}} (<strong>"Freelancer"</strong>).</p>

<h2>1. Services and Deliverables</h2>
<p>Freelancer agrees to perform the following services and provide the following deliverables (collectively, <strong>"Services"</strong>):</p>
<p>{{scope_of_work}}</p>
<p>Freelancer shall perform the Services in a professional and workmanlike manner, consistent with industry standards. Any changes to the scope of Services must be agreed upon in writing via a signed Change Order before work begins.</p>

<h2>2. Project Timeline</h2>
<table style="width:100%;border-collapse:collapse;">
  <tr style="background:#f8fafc;"><th style="padding:10px;border:1px solid #e2e8f0;text-align:left;">Milestone</th><th style="padding:10px;border:1px solid #e2e8f0;text-align:left;">Due Date</th></tr>
  <tr><td style="padding:10px;border:1px solid #e2e8f0;">Project Kickoff</td><td style="padding:10px;border:1px solid #e2e8f0;">{{kickoff_date}}</td></tr>
  <tr><td style="padding:10px;border:1px solid #e2e8f0;">First Draft / Prototype</td><td style="padding:10px;border:1px solid #e2e8f0;">{{draft_date}}</td></tr>
  <tr><td style="padding:10px;border:1px solid #e2e8f0;">Client Review Period</td><td style="padding:10px;border:1px solid #e2e8f0;">{{review_period}}</td></tr>
  <tr><td style="padding:10px;border:1px solid #e2e8f0;">Final Delivery</td><td style="padding:10px;border:1px solid #e2e8f0;">{{delivery_date}}</td></tr>
</table>
<p>Client acknowledges that timelines are contingent upon Client's timely provision of feedback, materials, and approvals. Delays caused by Client may result in a proportional extension of deadlines.</p>

<h2>3. Compensation and Payment Terms</h2>
<p>Client agrees to pay Freelancer as follows:</p>
<table style="width:100%;border-collapse:collapse;">
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;width:40%">Fee Structure</td><td style="padding:8px;border:1px solid #e2e8f0;">{{fee_structure}} (e.g., fixed-price / hourly)</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Total / Rate</td><td style="padding:8px;border:1px solid #e2e8f0;">{{total_fee_or_rate}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Deposit (due on signing)</td><td style="padding:8px;border:1px solid #e2e8f0;">{{deposit_amount}} ({{deposit_percentage}}%)</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Remaining Balance</td><td style="padding:8px;border:1px solid #e2e8f0;">{{balance_amount}} due upon {{balance_trigger}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Payment Terms</td><td style="padding:8px;border:1px solid #e2e8f0;">Net {{payment_due_days}} days from invoice date</td></tr>
</table>
<p>Late payments shall accrue interest at the rate of <strong>1.5% per month</strong> (or the maximum rate permitted by law, whichever is lower) from the date payment was due. Freelancer may suspend Services for accounts overdue by more than <strong>10 business days</strong> without liability.</p>

<h2>4. Expenses</h2>
<p>Freelancer shall not incur expenses on Client's behalf without prior written approval. Pre-approved, reasonable out-of-pocket expenses will be reimbursed within <strong>30 days</strong> of submission of receipts.</p>

<h2>5. Independent Contractor Status</h2>
<p>Freelancer is an independent contractor, not an employee, agent, or partner of Client. Freelancer is solely responsible for all federal, state, and local taxes, social security contributions, insurance, and other statutory obligations arising from compensation paid under this Agreement. Nothing in this Agreement creates an employment, agency, or joint venture relationship.</p>

<h2>6. Intellectual Property and Ownership</h2>
<p><strong>Work Product.</strong> Upon receipt of full payment, all original work product, deliverables, and materials created specifically for Client under this Agreement (the <strong>"Work Product"</strong>) shall be assigned to and become the exclusive property of Client, including all associated intellectual property rights.</p>
<p><strong>Pre-existing IP.</strong> Freelancer retains ownership of all pre-existing tools, frameworks, libraries, processes, methodologies, and know-how developed prior to or independently of this Agreement (<strong>"Background IP"</strong>). To the extent any Background IP is incorporated into the Work Product, Freelancer grants Client a non-exclusive, perpetual, royalty-free licence to use such Background IP solely as part of the Work Product.</p>
<p><strong>Moral Rights.</strong> Freelancer waives any moral rights in the Work Product to the fullest extent permitted by law.</p>

<h2>7. Confidentiality</h2>
<p>Freelancer agrees to keep confidential all non-public information received from Client in connection with this Agreement, including but not limited to business plans, technical data, financial information, and customer data. This obligation survives termination for a period of <strong>3 years</strong>.</p>

<h2>8. Representations and Warranties</h2>
<p>Freelancer represents and warrants that: (a) Freelancer has the full right and authority to enter into this Agreement; (b) the Services and Work Product will not infringe any third-party intellectual property rights; (c) the Work Product will be original; and (d) Freelancer is not subject to any agreement that would restrict performance of Services hereunder.</p>

<h2>9. Limitation of Liability</h2>
<p>IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES. FREELANCER'S TOTAL LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT SHALL NOT EXCEED THE TOTAL FEES PAID BY CLIENT IN THE THREE (3) MONTHS PRECEDING THE CLAIM.</p>

<h2>10. Term and Termination</h2>
<p>This Agreement commences on the Effective Date and continues until the Services are completed and all payments are made, unless earlier terminated. Either Party may terminate this Agreement upon <strong>{{notice_days}} days'</strong> written notice. Upon termination, Client shall pay for all Services rendered and expenses incurred through the termination date. Work Product shall not transfer to Client until all outstanding amounts are paid in full.</p>

<h2>11. Dispute Resolution and Governing Law</h2>
<p>This Agreement is governed by the laws of <strong>{{governing_law}}</strong>. Any dispute shall first be submitted to good-faith negotiation. If unresolved within 30 days, disputes shall be resolved by binding arbitration in <strong>{{arbitration_venue}}</strong> under the rules of <strong>{{arbitration_body}}</strong>.</p>

<h2>12. General</h2>
<p>This Agreement constitutes the entire agreement between the Parties and supersedes all prior discussions. It may be amended only in writing signed by both Parties. If any provision is held invalid, the remaining provisions remain in effect. This Agreement may be executed electronically.</p>

<div style="margin-top:48px;"><hr style="border:none;border-top:1px solid #e2e8f0;margin-bottom:32px;"/><table style="width:100%;border-collapse:collapse;"><tr><td style="width:50%;padding-right:24px;vertical-align:top;"><p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Client — {{client_name}}</p><div style="border-bottom:1.5px solid #334155;height:48px;margin-bottom:8px;"></div><p style="margin:0;font-size:12px;color:#94a3b8;">Name: ___________________________</p><p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Title: ___________________________</p><p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Date: ___________________________</p></td><td style="width:50%;padding-left:24px;vertical-align:top;"><p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Freelancer — {{freelancer_name}}</p><div style="border-bottom:1.5px solid #334155;height:48px;margin-bottom:8px;"></div><p style="margin:0;font-size:12px;color:#94a3b8;">Name: ___________________________</p><p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Title: ___________________________</p><p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Date: ___________________________</p></td></tr></table></div>`),

  t('Employment Offer Letter',
    'Formal offer of employment with compensation details and start date.',
    'Legal', ['employment', 'offer'],
    `<p>Date: <strong>{{offer_date}}</strong></p>

<p>{{candidate_name}}<br/>{{candidate_address}}</p>

<p>Dear <strong>{{candidate_first_name}}</strong>,</p>

<p>On behalf of <strong>{{company_name}}</strong> (<strong>"Company"</strong>), we are pleased to extend this offer of employment to you. We were impressed by your background and believe you will make a significant contribution to our team. The terms and conditions of your employment are set forth below.</p>

<h2>1. Position and Reporting</h2>
<table style="width:100%;border-collapse:collapse;">
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;width:40%">Job Title</td><td style="padding:8px;border:1px solid #e2e8f0;">{{job_title}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Department</td><td style="padding:8px;border:1px solid #e2e8f0;">{{department}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Reports To</td><td style="padding:8px;border:1px solid #e2e8f0;">{{reporting_manager}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Work Location</td><td style="padding:8px;border:1px solid #e2e8f0;">{{work_location}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Employment Type</td><td style="padding:8px;border:1px solid #e2e8f0;">{{employment_type}} (Full-Time / Part-Time)</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Start Date</td><td style="padding:8px;border:1px solid #e2e8f0;">{{start_date}}</td></tr>
</table>

<h2>2. Compensation</h2>
<table style="width:100%;border-collapse:collapse;">
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;width:40%">Base Salary</td><td style="padding:8px;border:1px solid #e2e8f0;">{{base_salary}} per {{pay_period}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Pay Frequency</td><td style="padding:8px;border:1px solid #e2e8f0;">{{pay_frequency}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Target Bonus</td><td style="padding:8px;border:1px solid #e2e8f0;">{{bonus_target}} of base salary, subject to Company performance and individual objectives</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Equity</td><td style="padding:8px;border:1px solid #e2e8f0;">{{equity_grant}}, subject to the Company's equity plan and a {{vesting_schedule}} vesting schedule</td></tr>
</table>

<h2>3. Benefits</h2>
<p>You will be eligible to participate in the following benefit programs, subject to the terms of each plan and any applicable waiting periods:</p>
<ul>
  <li><strong>Health Insurance:</strong> {{health_insurance_details}}</li>
  <li><strong>Dental &amp; Vision:</strong> {{dental_vision_details}}</li>
  <li><strong>Retirement Plan:</strong> {{retirement_plan_details}}</li>
  <li><strong>Paid Time Off:</strong> {{pto_days}} days per year, plus {{public_holidays}} public holidays</li>
  <li><strong>Sick Leave:</strong> {{sick_leave_policy}}</li>
  <li><strong>Professional Development:</strong> {{professional_development_budget}}</li>
  <li><strong>Other Benefits:</strong> {{other_benefits}}</li>
</ul>
<p>The Company reserves the right to modify, suspend, or discontinue any benefit plan at any time with reasonable notice.</p>

<h2>4. Conditions of Employment</h2>
<p>This offer is contingent upon the following conditions being satisfied prior to or on your start date:</p>
<ol type="a">
  <li>Successful completion of a background and reference check satisfactory to the Company;</li>
  <li>Your execution of the Company's standard <em>Confidentiality, Intellectual Property Assignment, and Non-Solicitation Agreement</em>;</li>
  <li>Verification of your eligibility to work in <strong>{{country}}</strong> in accordance with applicable immigration law;</li>
  <li>Completion of all required pre-employment documentation.</li>
</ol>

<h2>5. At-Will Employment</h2>
<p>Your employment with the Company is <strong>at-will</strong>, meaning either you or the Company may terminate the employment relationship at any time, for any reason or no reason, with or without cause or advance notice, subject to applicable law. Nothing in this offer letter creates a contract of employment for any definite period of time.</p>

<h2>6. Outside Activities and Conflicts of Interest</h2>
<p>During your employment, you agree to devote your full professional attention to the Company. You must disclose and obtain written approval for any outside employment, advisory roles, or business interests that could create a conflict of interest with the Company.</p>

<h2>7. Confidentiality and Intellectual Property</h2>
<p>As a condition of employment, you will be required to execute and comply with the Company's <em>Confidentiality and Intellectual Property Agreement</em>, which governs your obligations with respect to the Company's proprietary information and any work product you create during your employment. Please review this document before signing.</p>

<h2>8. Expiration of Offer</h2>
<p>This offer will expire on <strong>{{offer_expiry_date}}</strong>. To accept this offer, please sign and return this letter and the accompanying Confidentiality and IP Agreement by that date. If we do not receive your signed acceptance by that date, this offer shall be deemed withdrawn.</p>

<p>We are genuinely excited about the prospect of you joining our team and look forward to working together. Please do not hesitate to contact <strong>{{hr_contact_name}}</strong> at <strong>{{hr_contact_email}}</strong> if you have any questions.</p>

<p>Sincerely,</p>
<p><strong>{{hiring_manager_name}}</strong><br/>{{hiring_manager_title}}<br/>{{company_name}}<br/>{{hiring_manager_email}}</p>

<div style="margin-top:48px;"><hr style="border:none;border-top:1px solid #e2e8f0;margin-bottom:32px;"/><table style="width:100%;border-collapse:collapse;"><tr><td style="width:50%;padding-right:24px;vertical-align:top;"><p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Accepted by Candidate</p><div style="border-bottom:1.5px solid #334155;height:48px;margin-bottom:8px;"></div><p style="margin:0;font-size:12px;color:#94a3b8;">Name: {{candidate_name}}</p><p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Date: ___________________________</p></td><td style="width:50%;padding-left:24px;vertical-align:top;"><p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">On Behalf of {{company_name}}</p><div style="border-bottom:1.5px solid #334155;height:48px;margin-bottom:8px;"></div><p style="margin:0;font-size:12px;color:#94a3b8;">Name: {{hiring_manager_name}}</p><p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Title: {{hiring_manager_title}}</p><p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Date: ___________________________</p></td></tr></table></div>`),

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
    `<p>This Consulting Agreement (<strong>"Agreement"</strong>) is entered into as of <strong>{{effective_date}}</strong> (the <strong>"Effective Date"</strong>) by and between:</p>

<p><strong>{{client_name}}</strong>, a {{client_entity_type}} with its principal place of business at {{client_address}} (<strong>"Client"</strong>); and</p>

<p><strong>{{consultant_name}}</strong>, a {{consultant_entity_type}} with its principal place of business at {{consultant_address}} (<strong>"Consultant"</strong>).</p>

<h2>1. Engagement and Scope of Services</h2>
<p>Client hereby engages Consultant, and Consultant agrees to provide, the consulting services described in Exhibit A attached hereto (the <strong>"Services"</strong>). Consultant shall perform the Services in a professional and competent manner, consistent with industry best practices. Consultant shall not subcontract any Services without Client's prior written consent.</p>

<h2>2. Term</h2>
<p>This Agreement shall commence on <strong>{{start_date}}</strong> and, unless earlier terminated in accordance with Section 10, shall continue through <strong>{{end_date}}</strong> (the <strong>"Initial Term"</strong>). Upon expiration of the Initial Term, this Agreement may be renewed by mutual written agreement of the Parties.</p>

<h2>3. Compensation and Expenses</h2>
<p><strong>Consulting Fees.</strong> Client shall pay Consultant at the rate of <strong>{{fee_rate}}</strong> on a {{billing_basis}} basis. Consultant shall submit invoices to Client {{invoice_frequency}}. Client shall pay each invoice within <strong>{{payment_terms}} days</strong> of receipt.</p>
<p><strong>Retainer.</strong> If applicable, Client shall pay a monthly retainer of <strong>{{retainer_amount}}</strong>, due on the first business day of each month, credited against hourly fees incurred during that month.</p>
<p><strong>Expenses.</strong> Client shall reimburse Consultant for all reasonable, pre-approved out-of-pocket expenses incurred in connection with the Services, including travel, accommodation, and materials, upon submission of appropriate documentation. Expenses exceeding <strong>{{expense_threshold}}</strong> require advance written approval.</p>
<p><strong>Late Payments.</strong> Invoices not paid within the agreed period shall accrue interest at <strong>1.5% per month</strong>. Client shall also reimburse Consultant for reasonable costs of collection, including attorneys' fees.</p>

<h2>4. Independent Contractor Relationship</h2>
<p>Consultant is an independent contractor and not an employee, agent, partner, or joint venturer of Client. Consultant is solely responsible for all taxes, withholdings, social insurance contributions, and statutory obligations arising from compensation under this Agreement. Consultant shall determine the method, details, and means of performing the Services.</p>

<h2>5. Confidential Information</h2>
<p><strong>Definition.</strong> <strong>"Confidential Information"</strong> means any non-public, proprietary, or confidential information of Client disclosed to Consultant in connection with this Agreement, whether oral or written.</p>
<p><strong>Obligations.</strong> Consultant agrees to: (a) hold Confidential Information in strict confidence; (b) not disclose it to any third party without Client's prior written consent; (c) use it only to perform the Services; and (d) protect it with at least the same care used to protect Consultant's own confidential information.</p>
<p><strong>Exceptions.</strong> Confidentiality obligations do not apply to information that is publicly known, was known to Consultant prior to disclosure, is independently developed, or is required to be disclosed by law (with prior notice to Client).</p>
<p><strong>Survival.</strong> The confidentiality obligations shall survive termination of this Agreement for a period of <strong>{{confidentiality_survival_years}} years</strong>.</p>

<h2>6. Intellectual Property</h2>
<p><strong>Work Product.</strong> Subject to full payment of all fees, all deliverables, reports, analyses, and materials created by Consultant specifically for Client under this Agreement (collectively, <strong>"Work Product"</strong>) shall be considered works-for-hire and shall be owned exclusively by Client. Consultant hereby assigns to Client all right, title, and interest in and to the Work Product, including all intellectual property rights therein.</p>
<p><strong>Background IP.</strong> Consultant retains all right, title, and interest in pre-existing methodologies, tools, frameworks, and know-how (<strong>"Background IP"</strong>). To the extent Background IP is incorporated into Work Product, Consultant grants Client a non-exclusive, perpetual, royalty-free, worldwide licence to use such Background IP solely within the Work Product.</p>
<p><strong>Consultant Portfolio.</strong> Consultant may reference the engagement in professional materials (e.g., portfolio, LinkedIn) with Client's prior written consent, which shall not be unreasonably withheld.</p>

<h2>7. Non-Solicitation</h2>
<p>During the term of this Agreement and for a period of <strong>{{non_solicit_months}} months</strong> following its expiration or termination, Consultant agrees not to directly or indirectly: (a) solicit or hire any employee, officer, or contractor of Client; or (b) solicit any customer of Client with whom Consultant had material contact during the engagement, for competitive purposes.</p>

<h2>8. Representations and Warranties</h2>
<p>Consultant represents and warrants that: (a) Consultant has full authority to enter into this Agreement; (b) performance of Services will not violate any agreement with a third party; (c) the Work Product will be original and will not infringe any third-party intellectual property rights; and (d) Consultant shall perform the Services in compliance with all applicable laws and regulations.</p>

<h2>9. Limitation of Liability</h2>
<p>IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, PUNITIVE, OR EXEMPLARY DAMAGES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. CONSULTANT'S TOTAL CUMULATIVE LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT SHALL NOT EXCEED THE TOTAL FEES PAID BY CLIENT TO CONSULTANT IN THE THREE (3) MONTHS IMMEDIATELY PRECEDING THE CLAIM.</p>

<h2>10. Term and Termination</h2>
<p><strong>Termination for Convenience.</strong> Either Party may terminate this Agreement upon <strong>{{notice_days}} days'</strong> written notice to the other Party.</p>
<p><strong>Termination for Cause.</strong> Either Party may terminate this Agreement immediately upon written notice if the other Party materially breaches this Agreement and fails to cure such breach within <strong>15 days</strong> of written notice.</p>
<p><strong>Effect of Termination.</strong> Upon termination, Client shall pay for all Services rendered and expenses incurred through the termination date. Sections 5, 6, 7, 9, 11, and 12 shall survive termination.</p>

<h2>11. Indemnification</h2>
<p>Each Party (the <strong>"Indemnifying Party"</strong>) agrees to indemnify, defend, and hold harmless the other Party and its officers, directors, and employees from and against any claims, damages, losses, and expenses (including reasonable attorneys' fees) arising from: (a) the Indemnifying Party's breach of this Agreement; (b) the Indemnifying Party's negligence or wilful misconduct; or (c) any infringement of third-party intellectual property rights caused by the Indemnifying Party.</p>

<h2>12. General Provisions</h2>
<p><strong>Governing Law.</strong> This Agreement is governed by the laws of <strong>{{governing_law}}</strong>, without regard to conflict-of-law principles.</p>
<p><strong>Dispute Resolution.</strong> Any dispute shall first be subject to good-faith negotiation for 30 days. Unresolved disputes shall be resolved by binding arbitration in <strong>{{arbitration_venue}}</strong>.</p>
<p><strong>Entire Agreement.</strong> This Agreement, including Exhibit A, constitutes the entire agreement and supersedes all prior agreements relating to the subject matter hereof.</p>
<p><strong>Amendment.</strong> No amendment shall be valid unless in writing and signed by both Parties.</p>
<p><strong>Severability.</strong> If any provision is held unenforceable, it shall be modified to the minimum extent necessary to make it enforceable, and all other provisions remain in full force.</p>
<p><strong>Notices.</strong> All notices shall be in writing and delivered by email with confirmation, courier, or certified mail to the addresses above.</p>

<h2>Exhibit A — Statement of Work</h2>
<p><strong>Scope of Services:</strong> {{detailed_scope_of_services}}</p>
<p><strong>Key Deliverables:</strong></p>
<ul><li>{{deliverable_1}}</li><li>{{deliverable_2}}</li><li>{{deliverable_3}}</li></ul>
<p><strong>Project Timeline:</strong> {{project_timeline}}</p>
<p><strong>Success Criteria:</strong> {{success_criteria}}</p>

<div style="margin-top:48px;"><hr style="border:none;border-top:1px solid #e2e8f0;margin-bottom:32px;"/><table style="width:100%;border-collapse:collapse;"><tr><td style="width:50%;padding-right:24px;vertical-align:top;"><p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Client — {{client_name}}</p><div style="border-bottom:1.5px solid #334155;height:48px;margin-bottom:8px;"></div><p style="margin:0;font-size:12px;color:#94a3b8;">Name: ___________________________</p><p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Title: ___________________________</p><p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Date: ___________________________</p></td><td style="width:50%;padding-left:24px;vertical-align:top;"><p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Consultant — {{consultant_name}}</p><div style="border-bottom:1.5px solid #334155;height:48px;margin-bottom:8px;"></div><p style="margin:0;font-size:12px;color:#94a3b8;">Name: ___________________________</p><p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Title: ___________________________</p><p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Date: ___________________________</p></td></tr></table></div>`),

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
    `<p><strong>Last Updated: {{last_updated}}</strong><br/>Effective Date: <strong>{{effective_date}}</strong></p>

<p>Please read these Terms of Service (<strong>"Terms"</strong> or <strong>"Agreement"</strong>) carefully before accessing or using the services provided by <strong>{{company_name}}</strong>, a {{company_entity_type}} registered at {{company_address}} (<strong>"Company,"</strong> <strong>"we,"</strong> <strong>"us,"</strong> or <strong>"our"</strong>), through our website at {{website_url}} and related applications (collectively, the <strong>"Service"</strong>).</p>

<p>By creating an account, accessing, or using the Service, you (<strong>"User,"</strong> <strong>"you,"</strong> or <strong>"your"</strong>) agree to be legally bound by these Terms and our Privacy Policy, which is incorporated herein by reference. If you do not agree to these Terms, you must not use the Service.</p>

<h2>1. Definitions</h2>
<p><strong>"Account"</strong> means the unique account you create to access the Service.</p>
<p><strong>"Content"</strong> means any information, data, text, files, documents, or other materials uploaded, submitted, or transmitted through the Service.</p>
<p><strong>"Subscription"</strong> means a paid plan granting access to specified features of the Service for a defined period.</p>
<p><strong>"User Content"</strong> means Content submitted or created by you using the Service.</p>

<h2>2. Eligibility</h2>
<p>You must be at least <strong>{{minimum_age}}</strong> years of age and have the legal capacity to enter into binding contracts to use the Service. By using the Service, you represent and warrant that you meet these requirements. If you are using the Service on behalf of a business or entity, you represent that you have authority to bind that entity to these Terms.</p>

<h2>3. Account Registration and Security</h2>
<p>To access certain features, you must register for an Account. You agree to: (a) provide accurate, current, and complete registration information; (b) maintain and promptly update your information; (c) keep your password confidential and not share it with any third party; (d) notify us immediately at {{security_email}} of any unauthorised access to your Account; and (e) accept responsibility for all activities that occur under your Account.</p>
<p>We reserve the right to suspend or terminate Accounts that we reasonably believe have been compromised or are being misused.</p>

<h2>4. Subscriptions, Fees, and Payment</h2>
<p><strong>Free Tier.</strong> The Service may offer a free tier with limited features, subject to usage restrictions specified on our pricing page.</p>
<p><strong>Paid Subscriptions.</strong> Paid Subscriptions are billed in advance on a {{billing_cycle}} (monthly/annual) basis. All fees are stated in {{currency}} and are exclusive of applicable taxes unless stated otherwise.</p>
<p><strong>Payment.</strong> You authorise us (or our payment processor) to charge your designated payment method for all fees. If payment fails, we may suspend your access to paid features until payment is received.</p>
<p><strong>Price Changes.</strong> We may modify Subscription fees upon <strong>30 days'</strong> prior notice. Continued use after the effective date of the price change constitutes acceptance.</p>
<p><strong>Refunds.</strong> Except as required by applicable law, all payments are non-refundable. We do not provide refunds or credits for partial subscription periods, unused features, or unused document allowances.</p>
<p><strong>Cancellation.</strong> You may cancel your Subscription at any time through your Account settings. Cancellation takes effect at the end of the current billing period, and you will retain access to paid features until that date.</p>

<h2>5. Acceptable Use</h2>
<p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You shall not:</p>
<ol type="a">
  <li>Upload, transmit, or distribute any Content that is unlawful, defamatory, obscene, fraudulent, or that infringes any third-party rights;</li>
  <li>Use the Service to send unsolicited communications (spam);</li>
  <li>Attempt to gain unauthorised access to any portion of the Service or related systems;</li>
  <li>Interfere with or disrupt the integrity or performance of the Service;</li>
  <li>Use automated means (bots, scrapers) to access or collect data from the Service without our express written consent;</li>
  <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity;</li>
  <li>Use the Service in any manner that could violate applicable law, regulation, or third-party rights.</li>
</ol>
<p>We reserve the right to investigate violations and take appropriate action, including suspension or termination of access and reporting to law enforcement.</p>

<h2>6. User Content</h2>
<p><strong>Ownership.</strong> You retain all ownership rights in your User Content. By submitting User Content to the Service, you grant us a non-exclusive, worldwide, royalty-free, sublicensable licence to host, store, process, display, and transmit your User Content solely to the extent necessary to provide and operate the Service.</p>
<p><strong>Responsibility.</strong> You are solely responsible for your User Content. You represent and warrant that: (a) you own or have the necessary rights to your User Content; (b) your User Content does not infringe any third-party rights; and (c) your User Content complies with applicable law.</p>
<p><strong>Removal.</strong> We reserve the right (but not the obligation) to remove or disable access to any User Content that violates these Terms or applicable law.</p>

<h2>7. Intellectual Property</h2>
<p>The Service and all its original content (excluding User Content), features, design, software, and functionality are and remain the exclusive property of the Company and its licensors, protected by copyright, trademark, trade secret, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of the Service or its content without our express written permission.</p>

<h2>8. Third-Party Services and Links</h2>
<p>The Service may integrate with or contain links to third-party services, websites, or applications. We do not control and are not responsible for the content, privacy practices, or availability of such third-party services. Your use of third-party services is subject to their respective terms and policies.</p>

<h2>9. Disclaimer of Warranties</h2>
<p>THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR UNINTERRUPTED OR ERROR-FREE OPERATION. WE DO NOT WARRANT THAT THE SERVICE WILL MEET YOUR REQUIREMENTS OR THAT ANY ERRORS WILL BE CORRECTED.</p>

<h2>10. Limitation of Liability</h2>
<p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE COMPANY, ITS AFFILIATES, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, REVENUE, DATA, BUSINESS OPPORTUNITIES, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR THE USE OF OR INABILITY TO USE THE SERVICE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. THE COMPANY'S TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED THE GREATER OF (A) THE TOTAL FEES PAID BY YOU IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR (B) {{minimum_liability_cap}}.</p>

<h2>11. Indemnification</h2>
<p>You agree to defend, indemnify, and hold harmless the Company and its affiliates, directors, officers, employees, and agents from and against any and all claims, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising from: (a) your use of the Service; (b) your User Content; (c) your violation of these Terms; or (d) your violation of any third-party rights.</p>

<h2>12. Term and Termination</h2>
<p>These Terms are effective until terminated. We may suspend or terminate your access to the Service immediately, without notice, for: (a) material breach of these Terms; (b) non-payment of fees; (c) activity that we reasonably believe poses a legal, security, or reputational risk to us or other users; or (d) as required by applicable law. You may terminate by cancelling your account. Upon termination, your right to use the Service ceases and we may delete your data subject to our data retention policy and applicable law. Sections 6–12 and 14 shall survive termination.</p>

<h2>13. Changes to Terms</h2>
<p>We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms with a revised effective date and, where appropriate, by email. Your continued use of the Service after the effective date constitutes your acceptance of the modified Terms. If you do not agree to the modified Terms, you must stop using the Service.</p>

<h2>14. Governing Law and Dispute Resolution</h2>
<p><strong>Governing Law.</strong> These Terms shall be governed by and construed in accordance with the laws of <strong>{{governing_law_jurisdiction}}</strong>, without regard to its conflict of law provisions.</p>
<p><strong>Informal Resolution.</strong> Before initiating any formal legal proceeding, you agree to attempt to resolve the dispute informally by contacting us at {{legal_email}}. We will attempt to resolve the dispute within <strong>30 days</strong>.</p>
<p><strong>Arbitration.</strong> If informal resolution fails, any dispute, claim, or controversy arising out of or relating to these Terms shall be resolved by binding arbitration administered by <strong>{{arbitration_body}}</strong> in <strong>{{arbitration_venue}}</strong>, except that either Party may seek injunctive or other equitable relief in any court of competent jurisdiction.</p>
<p><strong>Class Action Waiver.</strong> YOU AND THE COMPANY AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN AN INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION.</p>

<h2>15. General Provisions</h2>
<p><strong>Entire Agreement.</strong> These Terms and the Privacy Policy constitute the entire agreement between you and the Company regarding the Service.</p>
<p><strong>Severability.</strong> If any provision of these Terms is found invalid or unenforceable, that provision shall be modified to the minimum extent necessary, and all other provisions shall remain in effect.</p>
<p><strong>Waiver.</strong> Failure to enforce any provision of these Terms shall not constitute a waiver of that right.</p>
<p><strong>Assignment.</strong> You may not assign these Terms without our prior written consent. We may assign these Terms in connection with a merger, acquisition, or sale of assets.</p>
<p><strong>Contact.</strong> For questions about these Terms, contact us at: {{company_name}}, {{company_address}}, {{legal_email}}.</p>`),

  t('Privacy Policy',
    'GDPR-aligned privacy policy for websites and apps.',
    'Legal', ['privacy', 'gdpr'],
    `<p><strong>Last Updated: {{last_updated}}</strong><br/>Effective Date: <strong>{{effective_date}}</strong></p>

<p>This Privacy Policy describes how <strong>{{company_name}}</strong> (<strong>"Company,"</strong> <strong>"we,"</strong> <strong>"us,"</strong> or <strong>"our"</strong>), a {{company_entity_type}} registered at {{company_address}}, collects, uses, stores, shares, and protects personal data when you use our website at {{website_url}} and our services (collectively, the <strong>"Services"</strong>). Please read this Policy carefully.</p>

<p>By accessing or using our Services, you acknowledge that you have read and understood this Privacy Policy. If you do not agree, please discontinue use of our Services.</p>

<h2>1. Data Controller Information</h2>
<p>For the purposes of applicable data protection law (including the General Data Protection Regulation (GDPR) where applicable), the data controller is:</p>
<p><strong>{{company_name}}</strong><br/>{{company_address}}<br/>Data Protection Officer (DPO): {{dpo_name}}<br/>DPO Email: {{dpo_email}}<br/>Privacy enquiries: {{privacy_email}}</p>

<h2>2. Personal Data We Collect</h2>
<p>We collect the following categories of personal data:</p>
<table style="width:100%;border-collapse:collapse;">
  <tr style="background:#f8fafc;"><th style="padding:10px;border:1px solid #e2e8f0;text-align:left;">Category</th><th style="padding:10px;border:1px solid #e2e8f0;text-align:left;">Examples</th><th style="padding:10px;border:1px solid #e2e8f0;text-align:left;">Source</th></tr>
  <tr><td style="padding:10px;border:1px solid #e2e8f0;">Identity Data</td><td style="padding:10px;border:1px solid #e2e8f0;">First name, last name, username, profile photo</td><td style="padding:10px;border:1px solid #e2e8f0;">Provided by you</td></tr>
  <tr><td style="padding:10px;border:1px solid #e2e8f0;">Contact Data</td><td style="padding:10px;border:1px solid #e2e8f0;">Email address, phone number, postal address</td><td style="padding:10px;border:1px solid #e2e8f0;">Provided by you</td></tr>
  <tr><td style="padding:10px;border:1px solid #e2e8f0;">Account Data</td><td style="padding:10px;border:1px solid #e2e8f0;">Login credentials, account settings, preferences</td><td style="padding:10px;border:1px solid #e2e8f0;">Provided by you</td></tr>
  <tr><td style="padding:10px;border:1px solid #e2e8f0;">Financial Data</td><td style="padding:10px;border:1px solid #e2e8f0;">Billing address, payment method (tokenised — card numbers are not stored by us)</td><td style="padding:10px;border:1px solid #e2e8f0;">Provided by you / payment processor</td></tr>
  <tr><td style="padding:10px;border:1px solid #e2e8f0;">Usage Data</td><td style="padding:10px;border:1px solid #e2e8f0;">IP address, browser type, pages visited, features used, timestamps</td><td style="padding:10px;border:1px solid #e2e8f0;">Automatically collected</td></tr>
  <tr><td style="padding:10px;border:1px solid #e2e8f0;">Device Data</td><td style="padding:10px;border:1px solid #e2e8f0;">Device ID, operating system, browser version</td><td style="padding:10px;border:1px solid #e2e8f0;">Automatically collected</td></tr>
  <tr><td style="padding:10px;border:1px solid #e2e8f0;">Communications</td><td style="padding:10px;border:1px solid #e2e8f0;">Support requests, feedback, survey responses</td><td style="padding:10px;border:1px solid #e2e8f0;">Provided by you</td></tr>
</table>

<h2>3. Legal Bases for Processing (GDPR)</h2>
<p>We process your personal data on the following legal bases:</p>
<ul>
  <li><strong>Performance of a contract:</strong> Processing necessary to provide you with the Services you have requested.</li>
  <li><strong>Legitimate interests:</strong> Processing necessary for our legitimate business interests (e.g., security, fraud prevention, analytics, product improvement), provided such interests are not overridden by your rights.</li>
  <li><strong>Consent:</strong> Where we have obtained your explicit consent (e.g., marketing communications). You may withdraw consent at any time.</li>
  <li><strong>Legal obligation:</strong> Processing required to comply with applicable laws.</li>
</ul>

<h2>4. How We Use Your Personal Data</h2>
<p>We use your personal data to:</p>
<ol>
  <li>Create and manage your account and provide the Services;</li>
  <li>Process transactions and send related notifications (receipts, invoices);</li>
  <li>Send service-related communications (technical notices, security alerts, updates);</li>
  <li>Respond to your enquiries and provide customer support;</li>
  <li>Send marketing communications where you have opted in;</li>
  <li>Monitor and analyse usage to improve and develop the Services;</li>
  <li>Detect, prevent, and investigate fraud, security incidents, and abuse;</li>
  <li>Comply with legal and regulatory obligations.</li>
</ol>

<h2>5. Cookies and Tracking Technologies</h2>
<p>We use cookies and similar technologies (pixels, local storage) to recognise you, personalise content, and analyse traffic. You can control cookies through your browser settings or our cookie consent tool. Disabling certain cookies may affect the functionality of the Services. Categories of cookies we use: Strictly Necessary, Functional, Analytics, and Marketing (where consented).</p>

<h2>6. Sharing of Personal Data</h2>
<p>We do not sell your personal data. We may share your data with:</p>
<ul>
  <li><strong>Service providers:</strong> Trusted third-party vendors who process data on our behalf (hosting, payment processing, email delivery, analytics), subject to appropriate data processing agreements;</li>
  <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets, your data may be transferred to the acquirer;</li>
  <li><strong>Legal requirements:</strong> We may disclose data when required by law, court order, or to protect our legal rights;</li>
  <li><strong>With your consent:</strong> For any other purpose with your explicit consent.</li>
</ul>

<h2>7. International Data Transfers</h2>
<p>Your data may be transferred to, and processed in, countries outside your home jurisdiction. Where such transfers occur from the EEA/UK, we rely on: Standard Contractual Clauses approved by the European Commission; adequacy decisions; or other appropriate safeguards as required by applicable law.</p>

<h2>8. Data Retention</h2>
<p>We retain personal data for as long as necessary to provide the Services, comply with legal obligations, resolve disputes, and enforce our agreements. Typical retention periods are:</p>
<ul>
  <li>Account data: Duration of account plus {{account_retention_period}} following closure;</li>
  <li>Financial records: {{financial_retention_period}} (as required by applicable tax law);</li>
  <li>Marketing consent records: Until consent is withdrawn plus {{consent_retention_period}};</li>
  <li>Support communications: {{support_retention_period}}.</li>
</ul>

<h2>9. Your Rights</h2>
<p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
<ul>
  <li><strong>Access:</strong> Request a copy of the personal data we hold about you;</li>
  <li><strong>Rectification:</strong> Request correction of inaccurate or incomplete data;</li>
  <li><strong>Erasure:</strong> Request deletion of your data in certain circumstances ("right to be forgotten");</li>
  <li><strong>Restriction:</strong> Request that we restrict processing of your data;</li>
  <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format;</li>
  <li><strong>Objection:</strong> Object to processing based on legitimate interests or for direct marketing;</li>
  <li><strong>Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent;</li>
  <li><strong>Complaint:</strong> Lodge a complaint with your local data protection authority.</li>
</ul>
<p>To exercise any of these rights, contact us at <strong>{{privacy_email}}</strong>. We will respond within <strong>30 days</strong> (or as required by applicable law).</p>

<h2>10. Security</h2>
<p>We implement appropriate technical and organisational security measures, including encryption in transit (TLS) and at rest, access controls, regular security assessments, and staff training. However, no system is completely secure, and we cannot guarantee absolute security of your data.</p>

<h2>11. Children's Privacy</h2>
<p>Our Services are not directed to individuals under the age of <strong>{{minimum_age}}</strong>. We do not knowingly collect personal data from children under this age. If you believe we have inadvertently collected such data, please contact us and we will delete it promptly.</p>

<h2>12. Third-Party Links</h2>
<p>Our Services may contain links to third-party websites. We are not responsible for the privacy practices of those websites and encourage you to review their privacy policies.</p>

<h2>13. Changes to This Policy</h2>
<p>We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy with a new effective date and, where appropriate, by email. Your continued use of the Services after the effective date constitutes acceptance of the updated policy.</p>

<h2>14. Contact Us</h2>
<p>If you have any questions about this Privacy Policy or our data practices, please contact:<br/><strong>{{company_name}}</strong><br/>{{company_address}}<br/>Email: {{privacy_email}}<br/>DPO: {{dpo_email}}</p>`),

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
    `<table style="width:100%;border-collapse:collapse;margin-bottom:32px;">
  <tr>
    <td style="vertical-align:top;width:50%;">
      <p style="margin:0;font-size:13px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">From</p>
      <p style="margin:4px 0 0;"><strong>{{vendor_company_name}}</strong></p>
      <p style="margin:2px 0;font-size:14px;color:#475569;">{{vendor_address_line_1}}</p>
      <p style="margin:2px 0;font-size:14px;color:#475569;">{{vendor_city_state_zip}}</p>
      <p style="margin:2px 0;font-size:14px;color:#475569;">{{vendor_country}}</p>
      <p style="margin:2px 0;font-size:14px;color:#475569;">Tax ID / VAT: {{vendor_tax_id}}</p>
      <p style="margin:2px 0;font-size:14px;color:#475569;">Email: {{vendor_email}}</p>
    </td>
    <td style="vertical-align:top;width:50%;text-align:right;">
      <p style="margin:0;font-size:13px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Invoice Details</p>
      <p style="margin:4px 0 0;"><strong>Invoice #:</strong> {{invoice_number}}</p>
      <p style="margin:2px 0;font-size:14px;"><strong>Issue Date:</strong> {{issue_date}}</p>
      <p style="margin:2px 0;font-size:14px;"><strong>Due Date:</strong> {{due_date}}</p>
      <p style="margin:2px 0;font-size:14px;"><strong>PO Number:</strong> {{po_number}}</p>
    </td>
  </tr>
</table>

<table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
  <tr>
    <td style="padding:12px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;width:40%;">
      Bill To
    </td>
    <td style="padding:12px;border:1px solid #e2e8f0;">
      <strong>{{client_company_name}}</strong><br/>
      Attn: {{client_contact_name}}<br/>
      {{client_address_line_1}}<br/>
      {{client_city_state_zip}}<br/>
      {{client_country}}<br/>
      Email: {{client_billing_email}}
    </td>
  </tr>
</table>

<h2>Services Rendered</h2>
<table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
  <tr style="background:#f8fafc;">
    <th style="padding:10px;border:1px solid #e2e8f0;text-align:left;">Description</th>
    <th style="padding:10px;border:1px solid #e2e8f0;text-align:center;">Qty / Hrs</th>
    <th style="padding:10px;border:1px solid #e2e8f0;text-align:right;">Unit Price</th>
    <th style="padding:10px;border:1px solid #e2e8f0;text-align:right;">Amount</th>
  </tr>
  <tr>
    <td style="padding:10px;border:1px solid #e2e8f0;">{{line_item_1_description}}</td>
    <td style="padding:10px;border:1px solid #e2e8f0;text-align:center;">{{line_item_1_qty}}</td>
    <td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{line_item_1_unit_price}}</td>
    <td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{line_item_1_amount}}</td>
  </tr>
  <tr>
    <td style="padding:10px;border:1px solid #e2e8f0;">{{line_item_2_description}}</td>
    <td style="padding:10px;border:1px solid #e2e8f0;text-align:center;">{{line_item_2_qty}}</td>
    <td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{line_item_2_unit_price}}</td>
    <td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{line_item_2_amount}}</td>
  </tr>
  <tr>
    <td style="padding:10px;border:1px solid #e2e8f0;">{{line_item_3_description}}</td>
    <td style="padding:10px;border:1px solid #e2e8f0;text-align:center;">{{line_item_3_qty}}</td>
    <td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{line_item_3_unit_price}}</td>
    <td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{line_item_3_amount}}</td>
  </tr>
  <tr>
    <td colspan="3" style="padding:10px;border:1px solid #e2e8f0;text-align:right;">Subtotal</td>
    <td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{subtotal}}</td>
  </tr>
  <tr>
    <td colspan="3" style="padding:10px;border:1px solid #e2e8f0;text-align:right;">Tax / VAT ({{tax_rate}}%)</td>
    <td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">{{tax_amount}}</td>
  </tr>
  <tr>
    <td colspan="3" style="padding:10px;border:1px solid #e2e8f0;text-align:right;">Discount</td>
    <td style="padding:10px;border:1px solid #e2e8f0;text-align:right;">-{{discount_amount}}</td>
  </tr>
  <tr style="background:#f0f9ff;font-weight:700;font-size:16px;">
    <td colspan="3" style="padding:12px;border:1px solid #e2e8f0;text-align:right;">TOTAL DUE</td>
    <td style="padding:12px;border:1px solid #e2e8f0;text-align:right;">{{total_due}} {{currency}}</td>
  </tr>
</table>

<h2>Payment Terms and Instructions</h2>
<p><strong>Payment Due Date:</strong> {{due_date}}</p>
<p><strong>Accepted Payment Methods:</strong> {{payment_methods}}</p>
<table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;width:35%">Bank Name</td><td style="padding:8px;border:1px solid #e2e8f0;">{{bank_name}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Account Name</td><td style="padding:8px;border:1px solid #e2e8f0;">{{bank_account_name}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Account Number / IBAN</td><td style="padding:8px;border:1px solid #e2e8f0;">{{bank_account_number}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Routing / SWIFT / BIC</td><td style="padding:8px;border:1px solid #e2e8f0;">{{bank_routing_swift}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Reference</td><td style="padding:8px;border:1px solid #e2e8f0;">Invoice #{{invoice_number}}</td></tr>
</table>

<h2>Late Payment Policy</h2>
<p>Invoices not paid by the due date shall be subject to a late payment fee of <strong>1.5% per month</strong> (18% per annum) or the maximum rate permitted by applicable law, whichever is lower, calculated from the due date until the date of actual payment. The vendor reserves the right to suspend services, withhold deliverables, and engage collection remedies for overdue accounts. In the event of a dispute over any invoice amount, Client must notify Vendor in writing within <strong>10 business days</strong> of the invoice date, specifying the nature of the dispute in reasonable detail.</p>

<h2>Notes</h2>
<p>{{invoice_notes}}</p>

<p style="font-size:13px;color:#64748b;margin-top:24px;">This invoice was prepared by {{vendor_company_name}}. Please include the invoice number in all payment correspondence. For billing enquiries, contact {{vendor_billing_email}}.</p>`),

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
    `<p>This Software License Agreement (<strong>"Agreement"</strong>) is entered into as of <strong>{{effective_date}}</strong> by and between:</p>

<p><strong>{{licensor_name}}</strong>, a {{licensor_entity_type}} with its principal place of business at {{licensor_address}} (<strong>"Licensor"</strong>); and</p>

<p><strong>{{licensee_name}}</strong>, a {{licensee_entity_type}} with its principal place of business at {{licensee_address}} (<strong>"Licensee"</strong>).</p>

<h2>1. Definitions</h2>
<p><strong>"Software"</strong> means the {{software_name}} computer program, including all object code, source code (if provided), associated documentation, updates, upgrades, patches, and modifications provided by Licensor.</p>
<p><strong>"Documentation"</strong> means all user manuals, technical specifications, and other written or electronic materials provided by Licensor relating to the Software.</p>
<p><strong>"Authorised Users"</strong> means the Licensee's employees, contractors, and agents who are permitted to access and use the Software under this Agreement, up to the number of seats or user licences purchased.</p>
<p><strong>"Intellectual Property Rights"</strong> means all patents, copyrights, trademarks, trade secrets, database rights, and any other form of intellectual property recognised in any jurisdiction.</p>

<h2>2. Grant of Licence</h2>
<p>Subject to the terms and conditions of this Agreement and timely payment of all applicable licence fees, Licensor hereby grants to Licensee a <strong>{{licence_type}}</strong> (non-exclusive / exclusive), non-transferable, non-sublicensable, revocable licence to:</p>
<ol type="a">
  <li>Install and use the Software on up to <strong>{{number_of_seats}}</strong> devices or user accounts;</li>
  <li>Use the Documentation in connection with the permitted use of the Software; and</li>
  <li>Make a reasonable number of copies of the Software solely for backup and archival purposes.</li>
</ol>
<p>The licence granted herein is limited to Licensee's internal business purposes and does not include any rights not expressly stated in this Section 2.</p>

<h2>3. Restrictions</h2>
<p>Licensee shall not, and shall not permit any third party to:</p>
<ol type="a">
  <li>Copy, modify, adapt, translate, or create derivative works of the Software or Documentation;</li>
  <li>Reverse engineer, disassemble, decompile, or otherwise attempt to derive the source code of the Software, except to the extent permitted by applicable law;</li>
  <li>Rent, lease, lend, sell, sublicence, assign, or otherwise transfer the Software or any rights therein to any third party;</li>
  <li>Remove or alter any proprietary notices, labels, or marks on the Software or Documentation;</li>
  <li>Use the Software to provide services to third parties on a service bureau, time-sharing, or similar basis without Licensor's prior written consent;</li>
  <li>Use the Software in violation of any applicable law, regulation, or export control restriction.</li>
</ol>

<h2>4. Licence Fees and Payment</h2>
<table style="width:100%;border-collapse:collapse;">
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;width:40%">Licence Type</td><td style="padding:8px;border:1px solid #e2e8f0;">{{licence_tier}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Number of Seats / Users</td><td style="padding:8px;border:1px solid #e2e8f0;">{{number_of_seats}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Annual Licence Fee</td><td style="padding:8px;border:1px solid #e2e8f0;">{{annual_fee}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Payment Due</td><td style="padding:8px;border:1px solid #e2e8f0;">{{payment_due_date}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Renewal</td><td style="padding:8px;border:1px solid #e2e8f0;">Auto-renews annually unless cancelled with 30 days' notice</td></tr>
</table>
<p>Licensor may increase licence fees upon <strong>60 days'</strong> written notice prior to renewal. All fees are non-refundable except as expressly provided herein.</p>

<h2>5. Intellectual Property Ownership</h2>
<p>The Software, Documentation, and all Intellectual Property Rights therein are and shall remain the exclusive property of Licensor. Licensee acquires no ownership interest in the Software under this Agreement. Any feedback, suggestions, or improvements provided by Licensee regarding the Software may be used by Licensor without restriction or compensation.</p>

<h2>6. Support and Maintenance</h2>
<p>During the licence term and subject to payment of any applicable support fees, Licensor shall provide: (a) email and/or phone support during Licensor's standard business hours; (b) bug fixes and patches; and (c) access to new minor versions of the Software. Major version upgrades may be subject to additional fees.</p>

<h2>7. Confidentiality</h2>
<p>Each Party acknowledges that in connection with this Agreement it may receive the other Party's Confidential Information. Each Party agrees to hold such information in confidence, use it only for the purposes of this Agreement, and not disclose it to third parties without the other Party's prior written consent. The Software, its source code (if disclosed), and its technical specifications shall be considered Licensor's Confidential Information regardless of how they are marked.</p>

<h2>8. Warranties and Disclaimers</h2>
<p><strong>Limited Warranty.</strong> Licensor warrants that, for a period of <strong>90 days</strong> from the date of initial delivery, the Software will perform substantially in accordance with the Documentation when operated on supported hardware and operating systems. Licensee's exclusive remedy for breach of this warranty is, at Licensor's option, repair or replacement of the Software or a refund of fees paid for the non-conforming Software.</p>
<p><strong>DISCLAIMER. EXCEPT AS SET FORTH IN THIS SECTION, THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. LICENSOR EXPRESSLY DISCLAIMS ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ANY WARRANTIES ARISING FROM COURSE OF DEALING OR USAGE OF TRADE.</strong></p>

<h2>9. Limitation of Liability</h2>
<p>IN NO EVENT SHALL LICENSOR BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR BUSINESS, EVEN IF ADVISED OF THE POSSIBILITY THEREOF. LICENSOR'S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT SHALL NOT EXCEED THE TOTAL LICENCE FEES PAID BY LICENSEE IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.</p>

<h2>10. Indemnification</h2>
<p><strong>By Licensor.</strong> Licensor shall defend, indemnify, and hold harmless Licensee from and against any third-party claim that the Software, as delivered and used in accordance with this Agreement, infringes any patent, copyright, or trademark of a third party, provided Licensee promptly notifies Licensor of such claim, gives Licensor sole control of the defence, and cooperates reasonably.</p>
<p><strong>By Licensee.</strong> Licensee shall defend, indemnify, and hold harmless Licensor from any claim arising from Licensee's misuse of the Software or breach of this Agreement.</p>

<h2>11. Term and Termination</h2>
<p>This Agreement commences on the Effective Date and continues for an initial term of <strong>{{initial_term}}</strong> (the <strong>"Term"</strong>), automatically renewing for successive one-year periods unless either Party provides written notice of non-renewal at least <strong>30 days</strong> before renewal.</p>
<p>Licensor may terminate this Agreement immediately upon written notice if Licensee: (a) materially breaches this Agreement and fails to cure within <strong>30 days</strong> of notice; (b) becomes insolvent or files for bankruptcy; or (c) infringes Licensor's intellectual property. Upon termination, Licensee shall immediately cease using the Software, destroy all copies, and certify such destruction in writing.</p>

<h2>12. General Provisions</h2>
<p><strong>Governing Law.</strong> This Agreement is governed by the laws of <strong>{{governing_law}}</strong>. Any disputes shall be resolved in the courts of <strong>{{jurisdiction_courts}}</strong>.</p>
<p><strong>Export Compliance.</strong> Licensee shall comply with all applicable export and import laws and regulations and shall not export the Software to any country, person, or entity subject to applicable trade restrictions.</p>
<p><strong>Entire Agreement.</strong> This Agreement constitutes the entire agreement between the Parties with respect to the Software and supersedes all prior agreements, understandings, and representations.</p>
<p><strong>Assignment.</strong> Licensee may not assign this Agreement without Licensor's prior written consent. Licensor may assign this Agreement in connection with a merger, acquisition, or sale of all or substantially all of its assets.</p>

<div style="margin-top:48px;"><hr style="border:none;border-top:1px solid #e2e8f0;margin-bottom:32px;"/><table style="width:100%;border-collapse:collapse;"><tr><td style="width:50%;padding-right:24px;vertical-align:top;"><p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Licensor — {{licensor_name}}</p><div style="border-bottom:1.5px solid #334155;height:48px;margin-bottom:8px;"></div><p style="margin:0;font-size:12px;color:#94a3b8;">Name: ___________________________</p><p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Title: ___________________________</p><p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Date: ___________________________</p></td><td style="width:50%;padding-left:24px;vertical-align:top;"><p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Licensee — {{licensee_name}}</p><div style="border-bottom:1.5px solid #334155;height:48px;margin-bottom:8px;"></div><p style="margin:0;font-size:12px;color:#94a3b8;">Name: ___________________________</p><p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Title: ___________________________</p><p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Date: ___________________________</p></td></tr></table></div>`),

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
    `<p>This Freelance Service Agreement (<strong>"Agreement"</strong>) is entered into as of <strong>{{effective_date}}</strong> by and between:</p>

<p><strong>{{client_name}}</strong>, a {{client_entity_type}} with its principal place of business at {{client_address}} (<strong>"Client"</strong>); and</p>

<p><strong>{{freelancer_name}}</strong>, an individual / {{freelancer_entity_type}} with a principal place of business at {{freelancer_address}} (<strong>"Freelancer"</strong>).</p>

<h2>1. Services and Deliverables</h2>
<p>Freelancer agrees to perform the following services and provide the following deliverables (collectively, <strong>"Services"</strong>):</p>
<p>{{scope_of_work}}</p>
<p>Freelancer shall perform the Services in a professional and workmanlike manner, consistent with industry standards. Any changes to the scope of Services must be agreed upon in writing via a signed Change Order before work begins.</p>

<h2>2. Project Timeline</h2>
<table style="width:100%;border-collapse:collapse;">
  <tr style="background:#f8fafc;"><th style="padding:10px;border:1px solid #e2e8f0;text-align:left;">Milestone</th><th style="padding:10px;border:1px solid #e2e8f0;text-align:left;">Due Date</th></tr>
  <tr><td style="padding:10px;border:1px solid #e2e8f0;">Project Kickoff</td><td style="padding:10px;border:1px solid #e2e8f0;">{{kickoff_date}}</td></tr>
  <tr><td style="padding:10px;border:1px solid #e2e8f0;">First Draft / Prototype</td><td style="padding:10px;border:1px solid #e2e8f0;">{{draft_date}}</td></tr>
  <tr><td style="padding:10px;border:1px solid #e2e8f0;">Client Review Period</td><td style="padding:10px;border:1px solid #e2e8f0;">{{review_period}}</td></tr>
  <tr><td style="padding:10px;border:1px solid #e2e8f0;">Final Delivery</td><td style="padding:10px;border:1px solid #e2e8f0;">{{delivery_date}}</td></tr>
</table>
<p>Client acknowledges that timelines are contingent upon Client's timely provision of feedback, materials, and approvals. Delays caused by Client may result in a proportional extension of deadlines.</p>

<h2>3. Compensation and Payment Terms</h2>
<p>Client agrees to pay Freelancer as follows:</p>
<table style="width:100%;border-collapse:collapse;">
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;width:40%">Fee Structure</td><td style="padding:8px;border:1px solid #e2e8f0;">{{fee_structure}} (e.g., fixed-price / hourly)</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Total / Rate</td><td style="padding:8px;border:1px solid #e2e8f0;">{{total_fee_or_rate}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Deposit (due on signing)</td><td style="padding:8px;border:1px solid #e2e8f0;">{{deposit_amount}} ({{deposit_percentage}}%)</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Remaining Balance</td><td style="padding:8px;border:1px solid #e2e8f0;">{{balance_amount}} due upon {{balance_trigger}}</td></tr>
  <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">Payment Terms</td><td style="padding:8px;border:1px solid #e2e8f0;">Net {{payment_due_days}} days from invoice date</td></tr>
</table>
<p>Late payments shall accrue interest at the rate of <strong>1.5% per month</strong> (or the maximum rate permitted by law, whichever is lower) from the date payment was due. Freelancer may suspend Services for accounts overdue by more than <strong>10 business days</strong> without liability.</p>

<h2>4. Expenses</h2>
<p>Freelancer shall not incur expenses on Client's behalf without prior written approval. Pre-approved, reasonable out-of-pocket expenses will be reimbursed within <strong>30 days</strong> of submission of receipts.</p>

<h2>5. Independent Contractor Status</h2>
<p>Freelancer is an independent contractor, not an employee, agent, or partner of Client. Freelancer is solely responsible for all federal, state, and local taxes, social security contributions, insurance, and other statutory obligations arising from compensation paid under this Agreement. Nothing in this Agreement creates an employment, agency, or joint venture relationship.</p>

<h2>6. Intellectual Property and Ownership</h2>
<p><strong>Work Product.</strong> Upon receipt of full payment, all original work product, deliverables, and materials created specifically for Client under this Agreement (the <strong>"Work Product"</strong>) shall be assigned to and become the exclusive property of Client, including all associated intellectual property rights.</p>
<p><strong>Pre-existing IP.</strong> Freelancer retains ownership of all pre-existing tools, frameworks, libraries, processes, methodologies, and know-how developed prior to or independently of this Agreement (<strong>"Background IP"</strong>). To the extent any Background IP is incorporated into the Work Product, Freelancer grants Client a non-exclusive, perpetual, royalty-free licence to use such Background IP solely as part of the Work Product.</p>
<p><strong>Moral Rights.</strong> Freelancer waives any moral rights in the Work Product to the fullest extent permitted by law.</p>

<h2>7. Confidentiality</h2>
<p>Freelancer agrees to keep confidential all non-public information received from Client in connection with this Agreement, including but not limited to business plans, technical data, financial information, and customer data. This obligation survives termination for a period of <strong>3 years</strong>.</p>

<h2>8. Representations and Warranties</h2>
<p>Freelancer represents and warrants that: (a) Freelancer has the full right and authority to enter into this Agreement; (b) the Services and Work Product will not infringe any third-party intellectual property rights; (c) the Work Product will be original; and (d) Freelancer is not subject to any agreement that would restrict performance of Services hereunder.</p>

<h2>9. Limitation of Liability</h2>
<p>IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES. FREELANCER'S TOTAL LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT SHALL NOT EXCEED THE TOTAL FEES PAID BY CLIENT IN THE THREE (3) MONTHS PRECEDING THE CLAIM.</p>

<h2>10. Term and Termination</h2>
<p>This Agreement commences on the Effective Date and continues until the Services are completed and all payments are made, unless earlier terminated. Either Party may terminate this Agreement upon <strong>{{notice_days}} days'</strong> written notice. Upon termination, Client shall pay for all Services rendered and expenses incurred through the termination date. Work Product shall not transfer to Client until all outstanding amounts are paid in full.</p>

<h2>11. Dispute Resolution and Governing Law</h2>
<p>This Agreement is governed by the laws of <strong>{{governing_law}}</strong>. Any dispute shall first be submitted to good-faith negotiation. If unresolved within 30 days, disputes shall be resolved by binding arbitration in <strong>{{arbitration_venue}}</strong> under the rules of <strong>{{arbitration_body}}</strong>.</p>

<h2>12. General</h2>
<p>This Agreement constitutes the entire agreement between the Parties and supersedes all prior discussions. It may be amended only in writing signed by both Parties. If any provision is held invalid, the remaining provisions remain in effect. This Agreement may be executed electronically.</p>

<div style="margin-top:48px;"><hr style="border:none;border-top:1px solid #e2e8f0;margin-bottom:32px;"/><table style="width:100%;border-collapse:collapse;"><tr><td style="width:50%;padding-right:24px;vertical-align:top;"><p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Client — {{client_name}}</p><div style="border-bottom:1.5px solid #334155;height:48px;margin-bottom:8px;"></div><p style="margin:0;font-size:12px;color:#94a3b8;">Name: ___________________________</p><p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Title: ___________________________</p><p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Date: ___________________________</p></td><td style="width:50%;padding-left:24px;vertical-align:top;"><p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Freelancer — {{freelancer_name}}</p><div style="border-bottom:1.5px solid #334155;height:48px;margin-bottom:8px;"></div><p style="margin:0;font-size:12px;color:#94a3b8;">Name: ___________________________</p><p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Title: ___________________________</p><p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Date: ___________________________</p></td></tr></table></div>`),

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

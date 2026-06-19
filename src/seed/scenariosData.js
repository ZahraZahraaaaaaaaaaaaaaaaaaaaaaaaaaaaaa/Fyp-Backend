/** Full scenario definitions for MongoDB seed */

const sim = {
  phish: {
    type: 'phishing_alert',
    title: 'Credentials captured',
    lines: [
      'Your login credentials were submitted to a fake portal.',
      'The attacker now has access to your username and password.',
      'Your account may already be compromised.',
    ],
  },
  unauth: {
    type: 'unauthorized_login',
    title: 'Unauthorized access detected',
    lines: [
      'An attacker logged into your account from an unrecognized device.',
      'Sessions may have been hijacked — immediate password reset required.',
    ],
  },
  lock: {
    type: 'system_lock',
    title: 'System locked',
    lines: [
      'Unauthorized activity detected on your workstation.',
      'Your device has been isolated from the corporate network.',
      'Contact your security team — do not power off.',
    ],
  },
  ransom: {
    type: 'ransomware',
    title: 'Files encrypted',
    lines: [
      'All documents on this device have been encrypted.',
      'Recovery requires authorization from the attacker.',
      'This breach was triggered by executing an untrusted file.',
    ],
  },
  exfil: {
    type: 'data_exfiltration',
    title: 'Data sent externally',
    lines: [
      'Internal data was transmitted to an external, unknown recipient.',
      'Sensitive information may now be in the attacker\'s hands.',
    ],
  },
  malware: {
    type: 'malware',
    title: 'Malware installed',
    lines: [
      'Malicious software has been installed on this device.',
      'A security breach was triggered by the last action.',
      'Automatic containment has started — IT has been alerted.',
    ],
  },
  vish: {
    type: 'vishing_breach',
    title: 'Account codes disclosed',
    lines: [
      'Sensitive codes were shared with an unverified caller.',
      'The attacker may now have access to your account.',
    ],
  },
  imp: {
    type: 'impersonation_success',
    title: 'Fraud completed',
    lines: [
      'The attacker\'s request was fulfilled without verification.',
      'Money or access has been handed to a malicious actor.',
    ],
  },
  // New contextual simulation types below
  gift_card_sent: {
    type: 'impersonation_success',
    title: 'Gift cards purchased and sent',
    lines: [
      'Gift card codes were sent to the attacker\'s number.',
      'These funds are unrecoverable — the scam succeeded.',
      'Your "manager" was never involved — this was a stranger.',
    ],
  },
  channel_switch: {
    type: 'impersonation_success',
    title: 'Oversight bypassed',
    lines: [
      'You moved to an unmonitored channel as the attacker requested.',
      'With no oversight, the attacker continued the scam undetected.',
      'Channel-switching is a deliberate tactic to avoid being stopped.',
    ],
  },
  spread_ignored: {
    type: 'unauthorized_login',
    title: 'Attack spread to the whole team',
    lines: [
      'You did not share the warning — three colleagues also ignored the same alert.',
      'The attacker targeted the entire team without resistance.',
      'Silence helped the scam succeed at scale.',
    ],
  },
  directory_leaked: {
    type: 'data_exfiltration',
    title: 'Internal directory exposed',
    lines: [
      'Your internal employee directory was sent to the attacker.',
      'This data enables targeted follow-on attacks against your colleagues.',
    ],
  },
  wire_sent: {
    type: 'impersonation_success',
    title: 'Wire transfer completed',
    lines: [
      'A fraudulent wire transfer was processed without verification.',
      'Funds are routing to an attacker-controlled account.',
      'Wire fraud is typically unrecoverable once sent.',
    ],
  },
  partial_codes: {
    type: 'impersonation_success',
    title: 'Partial disclosure enabled fraud',
    lines: [
      'Even partial gift card codes gave the attacker enough to redeem them.',
      'Partial disclosure is still a loss — there is no "safe" amount to share.',
    ],
  },
  incident_silenced: {
    type: 'unauthorized_login',
    title: 'Incident went unreported',
    lines: [
      'By staying silent, the attacker\'s indicators were never logged.',
      'The same tactic was used on two more colleagues the next day.',
      'Under-reporting is one of the biggest amplifiers of social engineering.',
    ],
  },
  scammer_engaged: {
    type: 'data_exfiltration',
    title: 'More information leaked',
    lines: [
      'By engaging the scammer, you revealed your name, role, and work schedule.',
      'Attackers use re-engagement to gather intelligence for future attacks.',
    ],
  },
  usb_malware: {
    type: 'malware',
    title: 'Malware deployed from USB',
    lines: [
      'The USB executed a script the moment it was connected.',
      'Keylogging and file-scraping malware is now running silently.',
      'This device and its network neighbors are at risk.',
    ],
  },
  usb_ransomware: {
    type: 'ransomware',
    title: 'Ransomware deployed from USB',
    lines: [
      'Opening the USB triggered an autorun ransomware payload.',
      'Files on this machine are being encrypted right now.',
      'Disconnect immediately and notify security.',
    ],
  },
  portal_leaked: {
    type: 'data_exfiltration',
    title: 'Internal data harvested',
    lines: [
      'Tax ID, cost center, and vendor data were sent to the attacker.',
      'This information supports deeper financial fraud against your organization.',
    ],
  },
  invoice_paid: {
    type: 'impersonation_success',
    title: 'Payment sent to fraudulent account',
    lines: [
      'The invoice was paid to an attacker-controlled account.',
      'The real vendor never received the funds.',
      'Invoice fraud payments are rarely recoverable.',
    ],
  },
  no_doc: {
    type: 'unauthorized_login',
    title: 'Incident went undocumented',
    lines: [
      'Without documentation, the security team had no indicators to act on.',
      'The same fraudulent account targeted another vendor the following week.',
    ],
  },
  dl_malware: {
    type: 'malware',
    title: 'Malware installed from download',
    lines: [
      'The recruiter\'s file contained a remote-access trojan.',
      'An attacker now has persistent access to this device.',
      'All keystrokes and files on this machine may be monitored.',
    ],
  },
  av_disabled_ransom: {
    type: 'ransomware',
    title: 'Ransomware executed undetected',
    lines: [
      'With antivirus disabled, the malware ran without any warnings.',
      'Files are now encrypted and a ransom note has appeared.',
    ],
  },
  smishing_creds: {
    type: 'phishing_alert',
    title: 'Credentials submitted to fake portal',
    lines: [
      'You entered your password on a site controlled by the attacker.',
      'Your work account credentials are now compromised.',
    ],
  },
  unknown_device: {
    type: 'unauthorized_login',
    title: 'Unauthorized device session active',
    lines: [
      'An unrecognized device retains active session access to your account.',
      'The attacker can act as you at any time — revoke this session immediately.',
    ],
  },
  sms_spread: {
    type: 'data_exfiltration',
    title: 'Phishing link spread further',
    lines: [
      'By forwarding the SMS to your group chat, the phishing link reached 14 more people.',
      'Three colleagues clicked the link before IT could issue a warning.',
    ],
  },
};

function wrong(optText, feedback, next, simKey, points = 0) {
  const s = sim[simKey];
  return {
    optionText: optText,
    isCorrect: false,
    consequenceText: s.lines[0],
    feedbackText: feedback,
    points,
    nextStepNumber: next,
    simulationType: s.type,
    simulationTitle: s.title,
    simulationLines: s.lines,
  };
}

function right(optText, feedback, next, points = 5) {
  return {
    optionText: optText,
    isCorrect: true,
    consequenceText: '',
    feedbackText: feedback,
    points,
    nextStepNumber: next,
    simulationType: 'none',
    simulationTitle: '',
    simulationLines: [],
  };
}

module.exports = [
  // ─── SCENARIO 1: HR Bonus Phishing ────────────────────────────────────────
  {
    title: 'Urgent: HR bonus payout — verify today',
    type: 'phishing',
    difficulty: 'beginner',
    description:
      'You receive an email claiming to be from HR about a surprise bonus. Pressure and urgency are high.',
    estimatedTime: 8,
    isActive: true,
    steps: [
      {
        stepNumber: 1,
        contextLabel: 'Inbox',
        content: `From: hr-rewards@company-updates.net (display name: HR Department)\nSubject: ACTION REQUIRED: Bonus confirmation within 2 hours\n\nDear employee,\n\nDue to payroll alignment, you must confirm your direct deposit details to receive today's bonus. This link expires in 120 minutes.\n\n[Verify payroll] (link shortened: bit.ly/hr-bonus-now)\n\nThanks,\nHR`,
        isFinalStep: false,
        options: [
          right(
            'Report the message using the corporate phishing button and do not click the link.',
            'Correct. The domain is not your company domain, urgency is artificial, and payroll changes never arrive via random links.',
            2,
            30
          ),
          wrong(
            'Click the link now so you do not miss the bonus.',
            'Missed red flags: wrong domain, urgency, and unsolicited link. Always verify through official HR channels.',
            2,
            'phish'
          ),
          wrong(
            'Reply with your employee ID and last four digits of your SSN to "verify" identity.',
            'Never share identifiers by email. Attackers use this to impersonate you elsewhere.',
            2,
            'unauth'
          ),
        ],
      },
      {
        stepNumber: 2,
        contextLabel: 'Follow-up',
        content: `A colleague forwards a screenshot of the same email and asks, "Did you get paid yet? Everyone is clicking."`,
        isFinalStep: false,
        options: [
          right(
            'Tell them not to click, point out the suspicious domain, and escalate to IT.',
            'Social proof is a common trick. Stopping the chain prevents wider compromise.',
            3,
            25
          ),
          wrong(
            'Click the link "just once" to see if it is real because others did.',
            'Herd behavior is exploited by attackers. One click can still compromise credentials.',
            3,
            'phish'
          ),
        ],
      },
      {
        stepNumber: 3,
        contextLabel: 'Verification',
        content: `IT posts an advisory: "We will never ask for payroll changes via external links."`,
        isFinalStep: false,
        options: [
          right(
            'Delete the email, clear the link from chat threads, and confirm policy on the internal wiki.',
            'You validated official guidance and reduced reinfection risk.',
            4,
            5
          ),
          wrong(
            'Forward the email to your personal address "for backup."',
            'Spreading phishing content increases exposure and may leak headers or metadata.',
            4,
            'exfil'
          ),
        ],
      },
      {
        stepNumber: 4,
        contextLabel: 'Browser warning',
        content:
          'You accidentally hovered the shortened link and your email client shows a preview URL that does not match your company domain.',
        isFinalStep: false,
        options: [
          right(
            'Treat it as suspicious and verify via the HR portal you normally use (typed manually).',
            'Good practice: verify via a known, trusted path — never via a link inside the message.',
            5
          ),
          wrong(
            'Ignore the mismatch because the email "looks official."',
            'Branding is easy to fake. Domain mismatch is a core indicator of phishing.',
            5,
            'phish'
          ),
        ],
      },
      {
        stepNumber: 5,
        contextLabel: 'Internal portal',
        content:
          'The real HR portal shows no announcement about bonuses. A banner reminds staff: "We will never request bank changes via email."',
        isFinalStep: false,
        options: [
          right(
            'Capture the message headers (if trained) and report to security with the policy reference.',
            'Excellent. Providing indicators (domain, headers, link) helps blocking and awareness.',
            6
          ),
          wrong(
            'Reply to the sender asking if the link is safe.',
            'Replying confirms your address is active and may invite further targeting.',
            6,
            'unauth'
          ),
        ],
      },
      {
        stepNumber: 6,
        contextLabel: 'Look‑alike domain',
        content:
          'You notice the sender domain uses a subtle substitution (company-updates.net vs your real company.com).',
        isFinalStep: false,
        options: [
          right(
            'Flag it as a look‑alike domain and alert teammates in the approved channel.',
            'Correct. Look‑alike domains are a common technique in payroll phishing.',
            7
          ),
          wrong(
            'Assume it is a new HR vendor domain and proceed.',
            'New vendor domains should be validated via official announcements, not assumed.',
            7,
            'phish'
          ),
        ],
      },
      {
        stepNumber: 7,
        contextLabel: 'MFA prompt',
        content:
          'Minutes later, you receive an unexpected MFA push notification on your phone.',
        isFinalStep: false,
        options: [
          right(
            'Deny the prompt and report a suspected credential/MFA fatigue attempt immediately.',
            'Good. Unexpected MFA prompts are a red flag; denying helps prevent account takeover.',
            8
          ),
          wrong(
            'Approve it to stop the notifications.',
            'Approving can grant an attacker access. Never approve unexpected prompts.',
            8,
            'unauth'
          ),
        ],
      },
      {
        stepNumber: 8,
        contextLabel: 'Team response',
        content:
          'A teammate says they already clicked and entered their credentials. They ask what to do next.',
        isFinalStep: false,
        options: [
          right(
            'Tell them to reset password, revoke sessions, and contact IT/security immediately.',
            'Correct. Quick containment (reset + revoke + report) reduces impact.',
            9
          ),
          wrong(
            'Tell them to wait and see if anything happens.',
            'Delays increase damage. Credential theft should be treated as urgent.',
            9,
            'unauth'
          ),
        ],
      },
      {
        stepNumber: 9,
        contextLabel: 'Wrap‑up',
        content:
          'Security sends a final note: the campaign is blocked. They remind staff to use the phishing report workflow.',
        isFinalStep: true,
        options: [
          right(
            'Acknowledge the guidance and commit to reporting suspicious messages quickly.',
            'Solid. Habitual reporting improves detection and reduces organization-wide risk.',
            0
          ),
          wrong(
            'Assume phishing is an IT problem and ignore future reminders.',
            'Awareness is a shared responsibility; ignoring guidance increases risk.',
            0,
            'incident_silenced'
          ),
        ],
      },
    ],
  },

  // ─── SCENARIO 2: CEO Wire Transfer ────────────────────────────────────────
  {
    title: 'CEO asks for an urgent wire transfer',
    type: 'impersonation',
    difficulty: 'intermediate',
    description:
      'You get an email that looks like it is from the CEO about a confidential acquisition payment.',
    estimatedTime: 10,
    isActive: true,
    steps: [
      {
        stepNumber: 1,
        contextLabel: 'Email',
        content: `From: ceo@company-corp-mail.com\nSubject: STRICTLY CONFIDENTIAL — Wire today\n\nI am in meetings and unreachable by phone. Please initiate a wire of $48,200 to the attached account for the NDA escrow. This cannot wait.\n\nSent from my iPhone`,
        isFinalStep: false,
        options: [
          right(
            'Verify through a known channel: call the CEO assistant using the internal directory number.',
            'Executive impersonation often uses mobile blur and urgency. Out-of-band verification defeats it.',
            2,
            5
          ),
          wrong(
            'Reply with "Sure, sending now" and ask for account details.',
            'You engaged the attacker and signaled willingness to move money.',
            2,
            'wire_sent'
          ),
          wrong(
            'Forward to finance and approve because the tone sounds like the CEO.',
            'Tone alone is not authentication. Domain mismatch is a major red flag.',
            2,
            'wire_sent'
          ),
        ],
      },
      {
        stepNumber: 2,
        contextLabel: 'Chat',
        content: `Finance pings you: "Did the CEO really email you about a wire?"`,
        isFinalStep: false,
        options: [
          right(
            'Say no decision until dual control and verbal callback to a trusted number.',
            'Dual control and callback policies exist to stop BEC scams.',
            3,
            30
          ),
          wrong(
            'Tell finance to process quickly to avoid upsetting leadership.',
            'Pressure bypasses controls — exactly what attackers want.',
            3,
            'wire_sent'
          ),
        ],
      },
      {
        stepNumber: 3,
        contextLabel: 'Outcome',
        content: `Security confirms the domain is look-alike and blocks the message across the org.`,
        isFinalStep: false,
        options: [
          right(
            'Document the attempt in the incident form so others get the same protection.',
            'Reporting improves detection rules and trains the org.',
            4,
            5
          ),
          wrong(
            'Delete everything silently so nobody thinks you almost fell for it.',
            'Silence hides indicators. Safe reporting is encouraged and improves defenses.',
            4,
            'incident_silenced'
          ),
        ],
      },
      {
        stepNumber: 4,
        contextLabel: 'Payment policy',
        content:
          'Finance policy requires dual approval and vendor verification for any new beneficiary account.',
        isFinalStep: false,
        options: [
          right(
            'Follow policy and require dual approval even for executive requests.',
            'Correct. Policies exist to resist social pressure and prevent fraud.',
            5
          ),
          wrong(
            'Bypass policy because the request claims to be confidential.',
            'Confidentiality is commonly used to isolate victims and bypass controls.',
            5,
            'wire_sent'
          ),
        ],
      },
      {
        stepNumber: 5,
        contextLabel: 'Domain check',
        content:
          'You compare the sender domain: `company-corp-mail.com` vs the real `company.com`.',
        isFinalStep: false,
        options: [
          right(
            'Treat it as a look‑alike domain and report as BEC (business email compromise).',
            'Correct. Look‑alike domains are a primary BEC indicator.',
            6
          ),
          wrong(
            'Assume it is a temporary mobile domain used by leadership.',
            'Assumptions are risky. Verify using known channels, not guesswork.',
            6,
            'wire_sent'
          ),
        ],
      },
      {
        stepNumber: 6,
        contextLabel: 'Attachment pressure',
        content:
          'The email includes an attachment named `Escrow_Details.pdf` and asks you to "process immediately."',
        isFinalStep: false,
        options: [
          right(
            'Do not open; forward to security for analysis and verify the request out-of-band.',
            'Correct. Attachments can carry malware or fraudulent instructions.',
            7
          ),
          wrong(
            'Open the attachment and follow instructions quickly.',
            'BEC often uses convincing documents to trigger immediate payment.',
            7,
            'malware'
          ),
        ],
      },
      {
        stepNumber: 7,
        contextLabel: 'Out-of-band verification',
        content:
          'You cannot reach the CEO directly. You can reach the executive assistant via the internal directory.',
        isFinalStep: false,
        options: [
          right(
            'Call the executive assistant and confirm whether any wire request exists.',
            'Correct. Trusted callbacks are a strong control for executive impersonation.',
            8
          ),
          wrong(
            'Message the same email thread asking for confirmation.',
            'Staying in the attacker-controlled channel does not verify identity.',
            8,
            'wire_sent'
          ),
        ],
      },
      {
        stepNumber: 8,
        contextLabel: 'Escalation',
        content:
          'Finance asks if they should proceed. You\'re under time pressure and multiple people are watching.',
        isFinalStep: false,
        options: [
          right(
            'Tell them to pause and escalate to security/finance leadership per policy.',
            'Correct. Pausing prevents irreversible loss.',
            9
          ),
          wrong(
            'Tell them to proceed and fix it later if wrong.',
            'Fraudulent wires are typically unrecoverable once sent.',
            9,
            'wire_sent'
          ),
        ],
      },
      {
        stepNumber: 9,
        contextLabel: 'Wrap‑up',
        content:
          'Security shares a short checklist for executive requests: verify, dual-approve, and log the incident.',
        isFinalStep: true,
        options: [
          right(
            'Save the checklist and apply it consistently for future requests.',
            'Great. Repeatable process beats urgency and authority pressure.',
            0
          ),
          wrong(
            'Rely on "gut feel" next time to decide quickly.',
            'Attackers exploit intuition; controls and verification are safer.',
            0,
            'wire_sent'
          ),
        ],
      },
    ],
  },

  // ─── SCENARIO 3: Vishing ──────────────────────────────────────────────────
  {
    title: 'IT support "verification" phone call',
    type: 'vishing',
    difficulty: 'intermediate',
    description:
      'Your desk phone rings. The caller claims to be IT support and needs to fix your VPN.',
    estimatedTime: 9,
    isActive: true,
    steps: [
      {
        stepNumber: 1,
        contextLabel: 'Call',
        content: `Caller ID shows "Help Desk". Caller: "Hi, this is IT — we see failed VPN logins on your account. We need to reset MFA. Can you read me a one-time code from your phone?"`,
        isFinalStep: false,
        options: [
          right(
            'Hang up and call the official IT line from the intranet contact page.',
            'Vishers spoof caller ID. Callback to a trusted number breaks the attack.',
            2,
            5
          ),
          wrong(
            'Read the MFA code aloud to resolve the issue faster.',
            'You may have handed the attacker real-time access.',
            2,
            'vish'
          ),
          wrong(
            'Give your password verbally so they can "verify" it.',
            'Passwords must never be shared, especially over phone.',
            2,
            'vish'
          ),
        ],
      },
      {
        stepNumber: 2,
        contextLabel: 'Callback',
        content: `Real IT confirms there is no ticket and warns about spoofed calls.`,
        isFinalStep: false,
        options: [
          right(
            'Block the number if possible and report the incident with time and details.',
            'Timely reporting helps trace patterns and warn others.',
            3,
            25
          ),
          wrong(
            'Call the scammer back to argue.',
            'Re-engaging can leak more information or enable harassment.',
            3,
            'scammer_engaged'
          ),
        ],
      },
      {
        stepNumber: 3,
        contextLabel: 'Wrap-up',
        content: `Your manager asks what happened.`,
        isFinalStep: false,
        options: [
          right(
            'Explain briefly and share the official guidance link.',
            'Transparency improves team resilience without blame.',
            4,
            5
          ),
          wrong(
            'Say "nothing" to avoid looking careless.',
            'Under-reporting slows collective learning.',
            4,
            'incident_silenced'
          ),
        ],
      },
      {
        stepNumber: 4,
        contextLabel: 'Caller verification',
        content:
          'The caller claims to have your employee ID and office location to "prove" they are IT.',
        isFinalStep: false,
        options: [
          right(
            'Assume it could be public/internal info and still verify via an official callback number.',
            'Correct. Partial personal info is not identity verification.',
            5
          ),
          wrong(
            'Trust them because they know internal details and comply.',
            'Attackers often gather details from signatures, LinkedIn, and breached data.',
            5,
            'vish'
          ),
        ],
      },
      {
        stepNumber: 5,
        contextLabel: 'MFA reset request',
        content:
          'They ask you to "confirm" by reading a code sent to your phone or email.',
        isFinalStep: false,
        options: [
          right(
            'Refuse to share codes and report the request.',
            'Correct. Codes are for you only; sharing enables account takeover.',
            6
          ),
          wrong(
            'Read the code to speed up the "reset."',
            'That code can be used to bypass MFA and access your account.',
            6,
            'vish'
          ),
        ],
      },
      {
        stepNumber: 6,
        contextLabel: 'Internal ticket check',
        content:
          'You check the IT portal: there is no ticket linked to your account.',
        isFinalStep: false,
        options: [
          right(
            'Treat it as suspicious and submit a ticket yourself referencing the call.',
            'Great. Creating your own ticket ensures traceability and proper handling.',
            7
          ),
          wrong(
            'Ignore the portal because "IT already called."',
            'Skipping verification removes an important control.',
            7,
            'unauth'
          ),
        ],
      },
      {
        stepNumber: 7,
        contextLabel: 'Team advisory',
        content:
          'Security asks you to share indicators: number, time, script, and what was requested.',
        isFinalStep: false,
        options: [
          right(
            'Provide details without sensitive data (no passwords/codes) to help warn others.',
            'Correct. Indicators enable alerts and pattern detection.',
            8
          ),
          wrong(
            'Share the full MFA codes you received "for analysis."',
            'Never share secrets; security teams do not need your live codes.',
            8,
            'unauth'
          ),
        ],
      },
      {
        stepNumber: 8,
        contextLabel: 'Wrap‑up',
        content:
          'Policy reminder: IT will never ask for passwords or one-time codes. Callback is mandatory for unexpected calls.',
        isFinalStep: true,
        options: [
          right(
            'Commit to callback verification for unexpected support calls.',
            'Strong habit. Verification beats urgency and spoofing.',
            0
          ),
          wrong(
            'Assume caller ID is enough verification in the future.',
            'Caller ID is easily spoofed and should not be trusted.',
            0,
            'vish'
          ),
        ],
      },
    ],
  },

  // ─── SCENARIO 4: USB Baiting ──────────────────────────────────────────────
  {
    title: 'USB drive labeled "Q4_Salaries" in the parking lot',
    type: 'baiting',
    difficulty: 'beginner',
    description: 'You find a USB stick near your car. Curiosity is tempting.',
    estimatedTime: 7,
    isActive: true,
    steps: [
      {
        stepNumber: 1,
        contextLabel: 'Parking lot',
        content: `A branded USB drive is on the ground with a label: "Q4_Salaries_CONFIDENTIAL".`,
        isFinalStep: false,
        options: [
          right(
            'Do not plug it in. Hand it to security or IT as found property.',
            'USB baiting is a classic initial access technique.',
            2,
            5
          ),
          wrong(
            'Plug it into your work laptop to see if it belongs to someone internal.',
            'Unknown media can deploy malware or steal data.',
            2,
            'usb_malware'
          ),
          wrong(
            'Plug it into a personal laptop first "to be safe."',
            'Malware can still spread or phone home; also risky data handling.',
            2,
            'usb_malware'
          ),
        ],
      },
      {
        stepNumber: 2,
        contextLabel: 'Office',
        content: `Security posts: "If you found removable media, do not insert it."`,
        isFinalStep: false,
        options: [
          right(
            'Follow the bulletin and submit the device to IT forensics.',
            'Forensics can analyze safely in an isolated environment.',
            3,
            25
          ),
          wrong(
            'Open the USB on an air-gapped machine without telling anyone.',
            'Air-gap mistakes still happen; policy exists for a reason.',
            3,
            'usb_ransomware'
          ),
        ],
      },
      {
        stepNumber: 3,
        contextLabel: 'Result',
        content: `IT confirms the drive contained autorun malware in a sandbox test.`,
        isFinalStep: false,
        options: [
          right(
            'Acknowledge the lesson: curiosity is exploited by attackers.',
            'Baiting relies on human nature — awareness breaks the chain.',
            4,
            5
          ),
          wrong(
            'Assume IT is exaggerating and keep a copy "just in case."',
            'Duplicating untrusted media increases risk.',
            4,
            'usb_malware'
          ),
        ],
      },
      {
        stepNumber: 4,
        contextLabel: 'Device handling',
        content:
          'A coworker suggests plugging the USB into a meeting-room PC "because it isn\'t your laptop."',
        isFinalStep: false,
        options: [
          right(
            'Decline and follow the official process: submit to IT/security forensics.',
            'Correct. Shared machines are still corporate assets and can spread infection.',
            5
          ),
          wrong(
            'Agree because it\'s not your primary workstation.',
            'Malware can spread laterally; "not my device" is not a protection.',
            5,
            'usb_malware'
          ),
        ],
      },
      {
        stepNumber: 5,
        contextLabel: 'Social pressure',
        content:
          'Someone says, "But the label says Salaries — we should return it to HR fast."',
        isFinalStep: false,
        options: [
          right(
            'Treat labels as untrusted; proceed through security with chain-of-custody.',
            'Correct. Labels are designed to trigger curiosity and urgency.',
            6
          ),
          wrong(
            'Take it to HR and ask them to open it to identify the owner.',
            'That increases risk and spreads handling to more people.',
            6,
            'usb_ransomware'
          ),
        ],
      },
      {
        stepNumber: 6,
        contextLabel: 'Data policy',
        content:
          'Policy states removable media must be scanned in an isolated environment before any access.',
        isFinalStep: false,
        options: [
          right(
            'Follow policy and document where the USB was found.',
            'Good. Context helps investigations and awareness.',
            7
          ),
          wrong(
            'Skip documentation to save time.',
            'Missing context reduces the ability to respond and learn.',
            7,
            'incident_silenced'
          ),
        ],
      },
      {
        stepNumber: 7,
        contextLabel: 'Awareness message',
        content:
          'Security asks you to share a short internal post on baiting risks.',
        isFinalStep: false,
        options: [
          right(
            'Share a concise warning: do not plug unknown media; report to IT/security.',
            'Correct. Clear communication prevents repeat incidents.',
            8
          ),
          wrong(
            'Share a photo of the USB label publicly on social media.',
            'Public posts can leak internal context and invite more attacks.',
            8,
            'exfil'
          ),
        ],
      },
      {
        stepNumber: 8,
        contextLabel: 'Wrap‑up',
        content:
          'Lesson: physical items can be attack vectors. Treat unknown media as malicious until proven otherwise.',
        isFinalStep: true,
        options: [
          right(
            'Commit to never connecting unknown devices to corporate systems.',
            'Strong. This single habit prevents many initial access events.',
            0
          ),
          wrong(
            'Assume physical threats are rare and ignore the guidance.',
            'Physical access is a real risk, especially in shared spaces.',
            0,
            'usb_malware'
          ),
        ],
      },
    ],
  },

  // ─── SCENARIO 5: WhatsApp Manager Impersonation ───────────────────────────
  {
    title: 'WhatsApp message from "your manager"',
    type: 'impersonation',
    difficulty: 'beginner',
    description: 'A new WhatsApp number texts you with an urgent favor.',
    estimatedTime: 8,
    isActive: true,
    steps: [
      {
        stepNumber: 1,
        contextLabel: 'Messaging',
        content: `"Hey it's me — in back-to-back meetings. Can you buy 4 gift cards for a client reward and send codes here? I'll reimburse today."`,
        isFinalStep: false,
        options: [
          right(
            'Do not buy cards. Contact your manager via a known work channel.',
            'Gift card urgency is a hallmark of impersonation scams.',
            2,
            5
          ),
          wrong(
            'Buy the cards to be helpful and keep the receipt.',
            'Money is often unrecoverable once codes are sent.',
            2,
            'gift_card_sent'
          ),
        ],
      },
      {
        stepNumber: 2,
        contextLabel: 'Pressure',
        content: `The number replies: "Need it in 10 minutes, client waiting."`,
        isFinalStep: false,
        options: [
          right(
            'Ignore and report the number to security.',
            'Pressure loops are designed to bypass thinking.',
            3,
            30
          ),
          wrong(
            'Send partial codes "to buy time."',
            'Partial disclosure still enables fraud.',
            3,
            'partial_codes'
          ),
        ],
      },
      {
        stepNumber: 3,
        contextLabel: 'Verification',
        content: `Your real manager confirms they did not message you.`,
        isFinalStep: false,
        options: [
          right(
            'Block the number and warn teammates about the pattern.',
            'Sharing indicators prevents repeat victimization.',
            4,
            5
          ),
          wrong(
            'Confront the scammer in chat to scare them.',
            'Engagement can leak more personal info.',
            4,
            'scammer_engaged'
          ),
        ],
      },
      {
        stepNumber: 4,
        contextLabel: 'Verification channel',
        content:
          'The attacker asks you to continue the conversation on a "private number" and avoid email "for confidentiality."',
        isFinalStep: false,
        options: [
          right(
            'Refuse and verify via your manager\'s known work contact methods.',
            'Correct. Moving to private channels is a tactic to avoid oversight.',
            5
          ),
          wrong(
            'Switch channels as requested to "help quickly."',
            'Attackers isolate victims to reduce chances of being stopped.',
            5,
            'channel_switch'
          ),
        ],
      },
      {
        stepNumber: 5,
        contextLabel: 'Policy check',
        content:
          'Company policy: gift cards are never purchased on behalf of clients without procurement approval.',
        isFinalStep: false,
        options: [
          right(
            'Follow policy and report the attempt to security.',
            'Correct. Policy-based decisions are harder to manipulate.',
            6
          ),
          wrong(
            'Treat policy as optional if a senior person asks.',
            'Attackers rely on authority pressure to bypass policy.',
            6,
            'gift_card_sent'
          ),
        ],
      },
      {
        stepNumber: 6,
        contextLabel: 'Information request',
        content:
          'They ask for your employee directory screenshot "to confirm you are authorized."',
        isFinalStep: false,
        options: [
          right(
            'Do not share internal directories; escalate to security.',
            'Correct. Directory data aids further impersonation and targeting.',
            7
          ),
          wrong(
            'Send the screenshot since it doesn\'t include passwords.',
            'Internal structure and names can still be sensitive.',
            7,
            'directory_leaked'
          ),
        ],
      },
      {
        stepNumber: 7,
        contextLabel: 'Team awareness',
        content:
          'Security suggests a short training reminder: "gift card requests via messaging apps are high risk."',
        isFinalStep: false,
        options: [
          right(
            'Post the reminder in the approved internal channel with a report link.',
            'Correct. Fast awareness reduces follow-on victims.',
            8
          ),
          wrong(
            'Ignore because "it only happened to you."',
            'Attackers target multiple employees simultaneously. Your silence puts your whole team at risk.',
            8,
            'spread_ignored'
          ),
        ],
      },
      {
        stepNumber: 8,
        contextLabel: 'Wrap‑up',
        content:
          'Lesson: verify identity out-of-band, resist urgency, and treat gift card requests as fraud until proven otherwise.',
        isFinalStep: true,
        options: [
          right(
            'Commit to verification before acting on urgent financial requests.',
            'Great. Verification is the strongest defense against impersonation scams.',
            0
          ),
          wrong(
            'Rely on quick texting for approvals in the future.',
            'Texting is easily spoofed; use trusted channels and approvals.',
            0,
            'gift_card_sent'
          ),
        ],
      },
    ],
  },

  // ─── SCENARIO 6: Invoice Scam ─────────────────────────────────────────────
  {
    title: 'Vendor invoice with updated bank details',
    type: 'invoice_scam',
    difficulty: 'intermediate',
    description: 'An invoice arrives with a last-minute bank account change.',
    estimatedTime: 10,
    isActive: true,
    steps: [
      {
        stepNumber: 1,
        contextLabel: 'Email',
        content: `Subject: Updated banking for invoice INV-9931\n\nPlease use the new account for payment processing starting today.\n\nNew beneficiary: Apex Solutions Ltd\nIBAN: … (different country than usual)\n\nThanks,\nAccounts Receivable`,
        isFinalStep: false,
        options: [
          right(
            'Call the vendor using a number from your contract, not this email.',
            'Invoice fraud often uses look-alike domains and last-minute changes.',
            2,
            5
          ),
          wrong(
            'Pay immediately to avoid late fees.',
            'You may have sent funds directly to criminals.',
            2,
            'invoice_paid'
          ),
        ],
      },
      {
        stepNumber: 2,
        contextLabel: 'Verification',
        content: `Your contract contact says: "We did not change banking details."`,
        isFinalStep: false,
        options: [
          right(
            'Freeze the payment batch and escalate to finance leadership.',
            'Stopping movement prevents loss.',
            3,
            30
          ),
          wrong(
            'Split the payment between old and new accounts "to be safe."',
            'Splitting still sends money to the fraudulent account.',
            3,
            'invoice_paid'
          ),
        ],
      },
      {
        stepNumber: 3,
        contextLabel: 'Lessons',
        content: `Finance updates vendor verification checklist.`,
        isFinalStep: false,
        options: [
          right(
            'Save the checklist link and follow it for every change request.',
            'Process beats urgency.',
            4,
            5
          ),
          wrong(
            'Trust future changes if the email looks nicely formatted.',
            'Visual polish does not equal authenticity.',
            4,
            'invoice_paid'
          ),
        ],
      },
      {
        stepNumber: 4,
        contextLabel: 'Second factor',
        content:
          'The email requests you to confirm bank details by replying with the vendor\'s tax ID and your internal cost center.',
        isFinalStep: false,
        options: [
          right(
            'Do not share internal finance details by email; verify via the vendor contact on file.',
            'Correct. Attackers use "verification" prompts to harvest data.',
            5
          ),
          wrong(
            'Reply with the details to speed up payment processing.',
            'That information can support future fraud or impersonation.',
            5,
            'portal_leaked'
          ),
        ],
      },
      {
        stepNumber: 5,
        contextLabel: 'Look for changes',
        content:
          'You notice the new account is in a different country and the email signature formatting is slightly off.',
        isFinalStep: false,
        options: [
          right(
            'Treat it as high risk; require verified callback and written confirmation via contract channel.',
            'Correct. Account-country changes are a major invoice-scam indicator.',
            6
          ),
          wrong(
            'Proceed because the invoice number looks correct.',
            'Invoice numbers can be copied from prior emails or leaked documents.',
            6,
            'invoice_paid'
          ),
        ],
      },
      {
        stepNumber: 6,
        contextLabel: 'Supplier portal',
        content:
          'The supplier portal (official) still lists the old bank account and no change request is logged.',
        isFinalStep: false,
        options: [
          right(
            'Pause payment and report suspected invoice fraud.',
            'Correct. Use official systems as the source of truth.',
            7
          ),
          wrong(
            'Assume the portal is outdated and pay anyway.',
            'Assuming systems are wrong is how fraud succeeds.',
            7,
            'invoice_paid'
          ),
        ],
      },
      {
        stepNumber: 7,
        contextLabel: 'Vendor confirmation',
        content:
          'You reach the real vendor contact who confirms no banking change was requested.',
        isFinalStep: false,
        options: [
          right(
            'Collect indicators and submit to security/finance fraud mailbox.',
            'Correct. Reporting helps block and alert others.',
            8
          ),
          wrong(
            'Delete the email and move on to avoid paperwork.',
            'Skipping reporting increases risk of repeat attacks.',
            8,
            'no_doc'
          ),
        ],
      },
      {
        stepNumber: 8,
        contextLabel: 'Wrap‑up',
        content:
          'Lesson: treat last-minute banking changes as high risk; verify through known contacts and systems.',
        isFinalStep: true,
        options: [
          right(
            'Commit to using callback + portal verification for any beneficiary change.',
            'Strong. These steps dramatically reduce invoice fraud success.',
            0
          ),
          wrong(
            'Accept bank changes by email if the message is "urgent."',
            'Urgency is commonly used to bypass controls.',
            0,
            'invoice_paid'
          ),
        ],
      },
    ],
  },

  // ─── SCENARIO 7: LinkedIn Malware ─────────────────────────────────────────
  {
    title: 'LinkedIn recruiter — malware "portfolio" download',
    type: 'phishing',
    difficulty: 'advanced',
    description:
      'A recruiter asks you to download a "password-protected portfolio" from a file host.',
    estimatedTime: 12,
    isActive: true,
    steps: [
      {
        stepNumber: 1,
        contextLabel: 'LinkedIn',
        content: `Message: "We loved your profile. Before the call, review our brief — password is 1234." Link: tiny.url/role-brief-now`,
        isFinalStep: false,
        options: [
          right(
            'Do not download. Ask to share PDF via official careers portal or verified email domain.',
            'Arbitrary downloads from unknown hosts are high risk.',
            2,
            5
          ),
          wrong(
            'Download and open on your work machine to prepare.',
            'Malware often arrives as "documents."',
            2,
            'dl_malware'
          ),
        ],
      },
      {
        stepNumber: 2,
        contextLabel: 'Follow-up',
        content: `They insist: "Our security blocks attachments; the file host is standard for us."`,
        isFinalStep: false,
        options: [
          right(
            'Decline and propose a scheduled screen-share instead.',
            'Legitimate hiring flows can adapt without unsafe downloads.',
            3,
            30
          ),
          wrong(
            'Disable antivirus temporarily to open the file.',
            'Disabling protections is never appropriate for unknown files.',
            3,
            'av_disabled_ransom'
          ),
        ],
      },
      {
        stepNumber: 3,
        contextLabel: 'Company policy',
        content: `Security reminds: downloads must come from approved repositories.`,
        isFinalStep: false,
        options: [
          right(
            'Follow policy and report the conversation if pressure continues.',
            'Policy exists to reduce attack surface.',
            4,
            30
          ),
          wrong(
            'Use a personal device to bypass policy "just once."',
            'Data mixing and shadow IT increase breach impact.',
            4,
            'lock'
          ),
        ],
      },
      {
        stepNumber: 4,
        contextLabel: 'Outcome',
        content: `You avoided executing unknown binaries.`,
        isFinalStep: false,
        options: [
          right(
            'Share the safe hiring checklist with peers.',
            'Collective habits reduce enterprise risk.',
            5,
            5
          ),
          wrong(
            'Tell everyone the recruiter was "probably fine."',
            'Downplaying risk weakens vigilance.',
            5,
            'spread_ignored'
          ),
        ],
      },
      {
        stepNumber: 5,
        contextLabel: 'File host',
        content:
          'They send a new link to a different file host and ask you to "disable SmartScreen if it warns."',
        isFinalStep: false,
        options: [
          right(
            'Refuse to disable protections; report the request and end the conversation.',
            'Correct. Requests to disable protection are a strong malware indicator.',
            6
          ),
          wrong(
            'Disable protections to open the document "just once."',
            'Disabling defenses increases the chance of compromise.',
            6,
            'av_disabled_ransom'
          ),
        ],
      },
      {
        stepNumber: 6,
        contextLabel: 'Verification',
        content:
          'You search the company name and find the official careers site uses a different domain than the recruiter\'s email.',
        isFinalStep: false,
        options: [
          right(
            'Contact the company via the official careers site, not the link provided.',
            'Correct. Verify identity via independent sources.',
            7
          ),
          wrong(
            'Assume the recruiter uses a personal email and continue.',
            'Personal domains reduce traceability and increase impersonation risk.',
            7,
            'phish'
          ),
        ],
      },
      {
        stepNumber: 7,
        contextLabel: 'Device separation',
        content:
          'A colleague suggests downloading on a personal laptop to avoid corporate restrictions.',
        isFinalStep: false,
        options: [
          right(
            'Decline; keep work activities on managed devices and avoid untrusted downloads entirely.',
            'Correct. Shadow IT increases risk and reduces protection.',
            8
          ),
          wrong(
            'Use a personal device and then forward the file to work email.',
            'That still introduces risk and can spread malware.',
            8,
            'dl_malware'
          ),
        ],
      },
      {
        stepNumber: 8,
        contextLabel: 'Wrap‑up',
        content:
          'Lesson: avoid untrusted downloads, verify recruiter identity, and never disable security controls.',
        isFinalStep: true,
        options: [
          right(
            'Commit to using verified portals and safe sharing methods for recruitment materials.',
            'Great. Safe processes reduce both malware and credential risk.',
            0
          ),
          wrong(
            'Trust future requests if they include a simple password like "1234."',
            'Weak "password protection" is often used to make malware seem legitimate.',
            0,
            'dl_malware'
          ),
        ],
      },
    ],
  },

  // ─── SCENARIO 8: SMS/Email Smishing Panic ─────────────────────────────────
  {
    title: 'Security audit panic: "Your account will be deleted"',
    type: 'mixed',
    difficulty: 'advanced',
    description:
      'You receive an SMS and email combo claiming your account will be deleted in 30 minutes.',
    estimatedTime: 11,
    isActive: true,
    steps: [
      {
        stepNumber: 1,
        contextLabel: 'SMS',
        content: `SMS: "Security alert: your work account will be deleted. Confirm: secure-verify-team.net"`,
        isFinalStep: false,
        options: [
          right(
            'Do not tap. Open the official SSO portal by typing the known URL.',
            'Smishing pairs urgency with fake portals.',
            2,
            5
          ),
          wrong(
            'Tap the link quickly on mobile to avoid losing access.',
            'You may have entered credentials into a phishing portal.',
            2,
            'smishing_creds'
          ),
        ],
      },
      {
        stepNumber: 2,
        contextLabel: 'Email',
        content: `Email mirrors the SMS with the same link and threats.`,
        isFinalStep: false,
        options: [
          right(
            'Report both messages and verify status with IT via internal chat.',
            'Cross-channel repetition is meant to feel legitimate.',
            3,
            30
          ),
          wrong(
            'Enter credentials to "see what happens."',
            'Test-entering credentials still exposes secrets.',
            3,
            'unauth'
          ),
        ],
      },
      {
        stepNumber: 3,
        contextLabel: 'Portal',
        content: `The real SSO shows your account is healthy.`,
        isFinalStep: false,
        options: [
          right(
            'Enable MFA if not already and remove trusted devices you do not recognize.',
            'Hardening accounts reduces future success of similar attacks.',
            4,
            5
          ),
          wrong(
            'Ignore because "it was only SMS."',
            'Smishing is a major credential theft channel.',
            4,
            'lock'
          ),
        ],
      },
      {
        stepNumber: 4,
        contextLabel: 'Link inspection',
        content:
          'You inspect the SMS domain and see it was registered recently and has no relation to your organization.',
        isFinalStep: false,
        options: [
          right(
            'Report the SMS to security and block the sender.',
            'Correct. Reporting enables telecom blocking and awareness.',
            5
          ),
          wrong(
            'Open it in an incognito window to "check."',
            'Incognito does not prevent phishing or credential capture.',
            5,
            'smishing_creds'
          ),
        ],
      },
      {
        stepNumber: 5,
        contextLabel: 'Password reset',
        content:
          'You worry someone may have your password from a previous breach. You consider resetting it.',
        isFinalStep: false,
        options: [
          right(
            'Reset password via the official portal and enable MFA; review recent sign-ins.',
            'Correct. Proactive hardening is appropriate via trusted channels.',
            6
          ),
          wrong(
            'Use the link in the SMS to reset password faster.',
            'That link is likely the attacker\'s portal.',
            6,
            'smishing_creds'
          ),
        ],
      },
      {
        stepNumber: 6,
        contextLabel: 'Device trust',
        content:
          'Your account shows a "trusted device" you do not recognize.',
        isFinalStep: false,
        options: [
          right(
            'Revoke the device/session and notify IT/security.',
            'Correct. Session revocation helps contain potential compromise.',
            7
          ),
          wrong(
            'Ignore it because it might be "a phone you used once."',
            'Unknown devices should be treated as suspicious until verified.',
            7,
            'unknown_device'
          ),
        ],
      },
      {
        stepNumber: 7,
        contextLabel: 'Team guidance',
        content:
          'IT asks you to share the message with screenshots so they can warn others.',
        isFinalStep: false,
        options: [
          right(
            'Share screenshots via the approved channel and include the sender number/domain.',
            'Correct. Indicators help protect the organization.',
            8
          ),
          wrong(
            'Forward the SMS to your personal phone group chat.',
            'Sharing outside approved channels can spread phishing links further.',
            8,
            'sms_spread'
          ),
        ],
      },
      {
        stepNumber: 8,
        contextLabel: 'Wrap‑up',
        content:
          'Lesson: cross-channel urgency is a tactic. Always verify via typed URLs and trusted support channels.',
        isFinalStep: true,
        options: [
          right(
            'Commit to verifying urgent account alerts via official portals and IT support.',
            'Excellent. Verification and reporting reduce credential theft.',
            0
          ),
          wrong(
            'Treat SMS alerts as inherently trustworthy in the future.',
            'Attackers frequently use SMS due to higher click rates.',
            0,
            'smishing_creds'
          ),
        ],
      },
    ],
  },
];

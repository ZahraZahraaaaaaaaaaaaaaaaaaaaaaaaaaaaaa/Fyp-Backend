/** Full scenario definitions for MongoDB seed */

const sim = {
  phish: {
    type: 'phishing_alert',
    title: 'Account security alert',
    lines: [
      'Your account has been compromised.',
      'Unauthorized login detected from an unknown device.',
      'Session tokens may have been stolen.',
    ],
  },
  unauth: {
    type: 'unauthorized_login',
    title: 'Unauthorized access detected',
    lines: [
      'Multiple failed verification attempts.',
      'Your credentials were used from a suspicious location.',
    ],
  },
  lock: {
    type: 'system_lock',
    title: 'SYSTEM LOCKED',
    lines: [
      'Unauthorized activity detected.',
      'Your workstation has been isolated from the network.',
      'Contact security — do not power off.',
    ],
  },
  ransom: {
    type: 'ransomware',
    title: 'YOUR FILES ARE ENCRYPTED',
    lines: [
      'All documents on this device have been encrypted.',
      'Recovery requires authorization from the attacker.',
      'Security breach triggered by unsafe action.',
    ],
  },
  exfil: {
    type: 'data_exfiltration',
    title: 'Sensitive data transmitted',
    lines: [
      'Sensitive data has been sent successfully.',
      'External transfer completed to unknown recipient.',
    ],
  },
  malware: {
    type: 'malware',
    title: 'Malware detected',
    lines: [
      'Malware detected on this system.',
      'A security breach was triggered by the last action.',
      'Automatic containment has started.',
    ],
  },
  vish: {
    type: 'vishing_breach',
    title: 'Voice verification failed',
    lines: [
      'Caller identity could not be verified.',
      'Your account recovery codes may have been disclosed.',
    ],
  },
  imp: {
    type: 'impersonation_success',
    title: 'Transfer initiated',
    lines: [
      'Wire transfer request accepted.',
      'Funds routing to external account.',
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

function right(optText, feedback, next, points = 25) {
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
        content: `From: hr-rewards@company-updates.net (display name: HR Department)
Subject: ACTION REQUIRED: Bonus confirmation within 2 hours

Dear employee,

Due to payroll alignment, you must confirm your direct deposit details to receive today's bonus. This link expires in 120 minutes.

[Verify payroll] (link shortened: bit.ly/hr-bonus-now)

Thanks,
HR`,
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
        isFinalStep: true,
        options: [
          right(
            'Delete the email, clear the link from chat threads, and confirm policy on the internal wiki.',
            'You validated official guidance and reduced reinfection risk.',
            0,
            35
          ),
          wrong(
            'Forward the email to your personal address "for backup."',
            'Spreading phishing content increases exposure and may leak headers or metadata.',
            0,
            'unauth'
          ),
        ],
      },
    ],
  },
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
        content: `From: ceo@company-corp-mail.com
Subject: STRICTLY CONFIDENTIAL — Wire today

I am in meetings and unreachable by phone. Please initiate a wire of $48,200 to the attached account for the NDA escrow. This cannot wait.

Sent from my iPhone`,
        isFinalStep: false,
        options: [
          right(
            'Verify through a known channel: call the CEO assistant using the internal directory number.',
            'Executive impersonation often uses mobile blur and urgency. Out-of-band verification defeats it.',
            2,
            35
          ),
          wrong(
            'Reply with "Sure, sending now" and ask for account details.',
            'You engaged the attacker and signaled willingness to move money.',
            2,
            'imp'
          ),
          wrong(
            'Forward to finance and approve because the tone sounds like the CEO.',
            'Tone alone is not authentication. Domain mismatch is a major red flag.',
            2,
            'exfil'
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
            'imp'
          ),
        ],
      },
      {
        stepNumber: 3,
        contextLabel: 'Outcome',
        content: `Security confirms the domain is look-alike and blocks the message across the org.`,
        isFinalStep: true,
        options: [
          right(
            'Document the attempt in the incident form so others get the same protection.',
            'Reporting improves detection rules and trains the org.',
            0,
            40
          ),
          wrong(
            'Delete everything silently so nobody thinks you almost fell for it.',
            'Silence hides indicators. Safe reporting is encouraged and improves defenses.',
            0,
            'unauth'
          ),
        ],
      },
    ],
  },
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
            35
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
            'vish'
          ),
        ],
      },
      {
        stepNumber: 3,
        contextLabel: 'Wrap-up',
        content: `Your manager asks what happened.`,
        isFinalStep: true,
        options: [
          right(
            'Explain briefly and share the official guidance link.',
            'Transparency improves team resilience without blame.',
            0,
            30
          ),
          wrong(
            'Say "nothing" to avoid looking careless.',
            'Under-reporting slows collective learning.',
            0,
            'unauth'
          ),
        ],
      },
    ],
  },
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
            35
          ),
          wrong(
            'Plug it into your work laptop to see if it belongs to someone internal.',
            'Unknown media can deploy malware or steal data.',
            2,
            'malware'
          ),
          wrong(
            'Plug it into a personal laptop first "to be safe."',
            'Malware can still spread or phone home; also risky data handling.',
            2,
            'malware'
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
            'ransom'
          ),
        ],
      },
      {
        stepNumber: 3,
        contextLabel: 'Result',
        content: `IT confirms the drive contained autorun malware in a sandbox test.`,
        isFinalStep: true,
        options: [
          right(
            'Acknowledge the lesson: curiosity is exploited by attackers.',
            'Baiting relies on human nature — awareness breaks the chain.',
            0,
            35
          ),
          wrong(
            'Assume IT is exaggerating and keep a copy "just in case."',
            'Duplicating untrusted media increases risk.',
            0,
            'malware'
          ),
        ],
      },
    ],
  },
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
            35
          ),
          wrong(
            'Buy the cards to be helpful and keep the receipt.',
            'Money is often unrecoverable once codes are sent.',
            2,
            'imp'
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
            'imp'
          ),
        ],
      },
      {
        stepNumber: 3,
        contextLabel: 'Verification',
        content: `Your real manager confirms they did not message you.`,
        isFinalStep: true,
        options: [
          right(
            'Block the number and warn teammates about the pattern.',
            'Sharing indicators prevents repeat victimization.',
            0,
            35
          ),
          wrong(
            'Confront the scammer in chat to scare them.',
            'Engagement can leak more personal info.',
            0,
            'exfil'
          ),
        ],
      },
    ],
  },
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
        content: `Subject: Updated banking for invoice INV-9931

Please use the new account for payment processing starting today.

New beneficiary: Apex Solutions Ltd
IBAN: … (different country than usual)

Thanks,
Accounts Receivable`,
        isFinalStep: false,
        options: [
          right(
            'Call the vendor using a number from your contract, not this email.',
            'Invoice fraud often uses look-alike domains and last-minute changes.',
            2,
            35
          ),
          wrong(
            'Pay immediately to avoid late fees.',
            'You may have sent funds directly to criminals.',
            2,
            'imp'
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
            'imp'
          ),
        ],
      },
      {
        stepNumber: 3,
        contextLabel: 'Lessons',
        content: `Finance updates vendor verification checklist.`,
        isFinalStep: true,
        options: [
          right(
            'Save the checklist link and follow it for every change request.',
            'Process beats urgency.',
            0,
            40
          ),
          wrong(
            'Trust future changes if the email looks nicely formatted.',
            'Visual polish does not equal authenticity.',
            0,
            'phish'
          ),
        ],
      },
    ],
  },
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
            35
          ),
          wrong(
            'Download and open on your work machine to prepare.',
            'Malware often arrives as "documents."',
            2,
            'malware'
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
            'ransom'
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
        isFinalStep: true,
        options: [
          right(
            'Share the safe hiring checklist with peers.',
            'Collective habits reduce enterprise risk.',
            0,
            45
          ),
          wrong(
            'Tell everyone the recruiter was "probably fine."',
            'Downplaying risk weakens vigilance.',
            0,
            'phish'
          ),
        ],
      },
    ],
  },
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
            35
          ),
          wrong(
            'Tap the link quickly on mobile to avoid losing access.',
            'You may have entered credentials into a phishing portal.',
            2,
            'phish'
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
        isFinalStep: true,
        options: [
          right(
            'Enable MFA if not already and remove trusted devices you do not recognize.',
            'Hardening accounts reduces future success of similar attacks.',
            0,
            45
          ),
          wrong(
            'Ignore because "it was only SMS."',
            'Smishing is a major credential theft channel.',
            0,
            'lock'
          ),
        ],
      },
    ],
  },
];

/**
 * Email template utility for generating mailto: links with pre-filled content
 * for project contact requests.
 */

export type RequestType = 'code-access' | 'inquiry' | 'collaboration' | 'demo';

interface EmailTemplateParams {
  projectName: string;
  contactEmail: string;
  requestType: RequestType;
}

const REQUEST_LABELS: Record<RequestType, { en: string; fr: string }> = {
  'code-access': {
    en: 'Code/Repository Access Request',
    fr: 'Demande d\'accès au code/dépôt',
  },
  inquiry: {
    en: 'General Inquiry',
    fr: 'Demande de renseignements généraux',
  },
  collaboration: {
    en: 'Collaboration Request',
    fr: 'Demande de collaboration',
  },
  demo: {
    en: 'Demo/Presentation Request',
    fr: 'Demande de démonstration/présentation',
  },
};

const EMAIL_TEMPLATES: Record<
  RequestType,
  { subject: string; body: string }
> = {
  'code-access': {
    subject: 'Request: Code/Repository Access - {projectName}',
    body: `Hello,

I am interested in accessing the code/repository for the "{projectName}" AI initiative.

About me:
• Name: [Your Name]
• Organization: [Your Organization/Department]
• Role: [Your Role]

Purpose of access:
[Please describe why you need access to the code and how you plan to use it]

Additional information:
[Any other relevant details]

Thank you for considering my request.

Best regards,
[Your Name]`,
  },
  inquiry: {
    subject: 'Inquiry: {projectName}',
    body: `Hello,

I have a question regarding the "{projectName}" AI initiative.

Question/Inquiry:
[Please describe your question or what information you're seeking]

Context:
[Optional: Provide any relevant context about your inquiry]

Thank you for your time.

Best regards,
[Your Name]
[Your Organization]`,
  },
  collaboration: {
    subject: 'Collaboration Opportunity: {projectName}',
    body: `Hello,

I am interested in exploring collaboration opportunities with the "{projectName}" AI initiative.

About me/my team:
• Name: [Your Name]
• Organization: [Your Organization/Department]
• Role: [Your Role]

Collaboration proposal:
[Please describe the type of collaboration you're proposing and potential mutual benefits]

Relevant experience/capabilities:
[Optional: Describe relevant expertise or resources you can bring to the collaboration]

I would be happy to schedule a meeting to discuss this further.

Best regards,
[Your Name]`,
  },
  demo: {
    subject: 'Request: Demo/Presentation - {projectName}',
    body: `Hello,

I would like to request a demo or presentation of the "{projectName}" AI initiative.

About me/my audience:
• Name: [Your Name]
• Organization: [Your Organization/Department]
• Role: [Your Role]
• Audience size: [Number of attendees]

Purpose:
[Please describe why you're interested in a demo and how it would be beneficial]

Preferred format:
• [ ] Virtual meeting
• [ ] In-person presentation
• [ ] Pre-recorded demo

Timeframe:
[Optional: Preferred dates or time period]

Thank you for considering this request.

Best regards,
[Your Name]`,
  },
};

/**
 * Generates a mailto: link with pre-filled subject and body for a contact request.
 *
 * @param params - Template parameters including project name, contact email, and request type
 * @param language - Language for the email (default: 'en')
 * @returns A properly encoded mailto: URL
 */
export function generateContactEmail(
  params: EmailTemplateParams,
  language: 'en' | 'fr' = 'en'
): string {
  const { projectName, contactEmail, requestType } = params;
  const template = EMAIL_TEMPLATES[requestType];

  // Replace placeholders in subject and body
  const subject = template.subject.replace('{projectName}', projectName);
  const body = template.body.replace(/{projectName}/g, projectName);

  // Encode URI components
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  return `mailto:${contactEmail}?subject=${encodedSubject}&body=${encodedBody}`;
}

/**
 * Gets the display label for a request type
 *
 * @param requestType - The type of request
 * @param language - Language for the label (default: 'en')
 * @returns The localized display label
 */
export function getRequestLabel(
  requestType: RequestType,
  language: 'en' | 'fr' = 'en'
): string {
  return REQUEST_LABELS[requestType][language];
}

import { Mail, Phone, User, Briefcase } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProjectContact, ContactRole } from '@/types';
import { RequestButton } from './RequestButton';

interface ContactSectionProps {
  projectName: string;
  contacts: ProjectContact[];
  language?: 'en' | 'fr';
}

const ROLE_LABELS: Record<ContactRole, { en: string; fr: string; variant: 'default' | 'secondary' | 'outline' }> = {
  [ContactRole.Primary]: {
    en: 'Primary Contact',
    fr: 'Contact principal',
    variant: 'default',
  },
  [ContactRole.Technical]: {
    en: 'Technical Lead',
    fr: 'Responsable technique',
    variant: 'secondary',
  },
  [ContactRole.Business]: {
    en: 'Business Owner',
    fr: 'Responsable métier',
    variant: 'outline',
  },
};

export function ContactSection({ projectName, contacts, language = 'en' }: ContactSectionProps) {
  // Don't render if no contacts
  if (!contacts || contacts.length === 0) {
    return null;
  }

  // Get primary contact for the main contact button
  const primaryContact = contacts.find((c) => c.role === ContactRole.Primary) || contacts[0];

  // Sort contacts: Primary first, then Technical, then Business
  const roleOrder = [ContactRole.Primary, ContactRole.Technical, ContactRole.Business];
  const sortedContacts = [...contacts].sort((a, b) => {
    return roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role);
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-gcds-text-primary">
              {language === 'en' ? 'Project Contacts' : 'Contacts du projet'}
            </CardTitle>
            <CardDescription className="text-gcds-text-secondary">
              {language === 'en'
                ? 'Reach out to the team for questions, collaboration, or access requests'
                : 'Contactez l\'équipe pour des questions, collaborations ou demandes d\'accès'}
            </CardDescription>
          </div>
          <RequestButton
            projectName={projectName}
            contactEmail={primaryContact.email}
            language={language}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedContacts.map((contact, index) => (
            <ContactCard key={index} contact={contact} language={language} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface ContactCardProps {
  contact: ProjectContact;
  language: 'en' | 'fr';
}

function ContactCard({ contact, language }: ContactCardProps) {
  const roleLabel = ROLE_LABELS[contact.role][language];
  const roleVariant = ROLE_LABELS[contact.role].variant;

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gcds-border-secondary bg-gcds-background-primary p-4 hover:border-gcds-border-accent transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gcds-color-blue-100">
            <User className="h-5 w-5 text-gcds-color-blue-700" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gcds-text-primary">{contact.name}</span>
            {contact.title && (
              <span className="text-xs text-gcds-text-secondary flex items-center gap-1">
                <Briefcase className="h-3 w-3" />
                {contact.title}
              </span>
            )}
          </div>
        </div>
      </div>

      <Badge variant={roleVariant} className="w-fit text-xs">
        {roleLabel}
      </Badge>

      <div className="flex flex-col gap-2 text-sm">
        <a
          href={`mailto:${contact.email}`}
          className="flex items-center gap-2 text-gcds-text-secondary hover:text-gcds-color-blue-700 transition-colors"
        >
          <Mail className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">{contact.email}</span>
        </a>
        {contact.phone && (
          <a
            href={`tel:${contact.phone}`}
            className="flex items-center gap-2 text-gcds-text-secondary hover:text-gcds-color-blue-700 transition-colors"
          >
            <Phone className="h-4 w-4 flex-shrink-0" />
            <span>{contact.phone}</span>
          </a>
        )}
      </div>
    </div>
  );
}

import { Mail, Code, MessageCircle, Users, Presentation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { generateContactEmail, getRequestLabel, RequestType } from '@/lib/emailTemplates';

interface RequestButtonProps {
  projectName: string;
  contactEmail: string;
  language?: 'en' | 'fr';
}

const REQUEST_ICONS: Record<RequestType, React.ElementType> = {
  'code-access': Code,
  inquiry: MessageCircle,
  collaboration: Users,
  demo: Presentation,
};

const REQUEST_DESCRIPTIONS: Record<RequestType, { en: string; fr: string }> = {
  'code-access': {
    en: 'Request access to code repository',
    fr: 'Demander l\'accès au dépôt de code',
  },
  inquiry: {
    en: 'Ask questions about this project',
    fr: 'Poser des questions sur ce projet',
  },
  collaboration: {
    en: 'Propose a collaboration',
    fr: 'Proposer une collaboration',
  },
  demo: {
    en: 'Request a demo or presentation',
    fr: 'Demander une démonstration',
  },
};

export function RequestButton({ projectName, contactEmail, language = 'en' }: RequestButtonProps) {
  const handleRequest = (requestType: RequestType) => {
    const mailtoLink = generateContactEmail(
      {
        projectName,
        contactEmail,
        requestType,
      },
      language
    );
    window.location.href = mailtoLink;
  };

  const requestTypes: RequestType[] = ['code-access', 'inquiry', 'collaboration', 'demo'];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="gap-2">
          <Mail className="h-4 w-4" />
          {language === 'en' ? 'Contact' : 'Contacter'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          {language === 'en' ? 'Send a request' : 'Envoyer une demande'}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {requestTypes.map((type) => {
          const Icon = REQUEST_ICONS[type];
          return (
            <DropdownMenuItem
              key={type}
              onClick={() => handleRequest(type)}
              className="cursor-pointer flex items-start gap-3 py-3"
            >
              <Icon className="h-4 w-4 mt-0.5 text-gcds-text-secondary" />
              <div className="flex flex-col gap-0.5">
                <span className="font-medium text-gcds-text-primary">
                  {getRequestLabel(type, language)}
                </span>
                <span className="text-xs text-gcds-text-secondary">
                  {REQUEST_DESCRIPTIONS[type][language]}
                </span>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

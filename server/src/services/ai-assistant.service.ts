import { PrismaClient, ProjectStatus, PrimaryUsers } from '../../generated/prisma';

interface QueryIntent {
  type: 'search' | 'stats' | 'recommendation' | 'general';
  entities: {
    departments?: string[];
    statuses?: ProjectStatus[];
    keywords?: string[];
    compliance?: ('ads' | 'personalInfo')[];
    primaryUsers?: PrimaryUsers[];
  };
}

interface AIResponse {
  message: string;
  projects?: any[];
  stats?: any;
  suggestions?: string[];
}

export class AIAssistantService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * Parse natural language query to extract intent and entities
   */
  private parseQuery(query: string): QueryIntent {
    const lowerQuery = query.toLowerCase();
    const intent: QueryIntent = {
      type: 'general',
      entities: {},
    };

    // Detect query type
    if (
      lowerQuery.includes('how many') ||
      lowerQuery.includes('count') ||
      lowerQuery.includes('number of') ||
      lowerQuery.includes('total')
    ) {
      intent.type = 'stats';
    } else if (
      lowerQuery.includes('find') ||
      lowerQuery.includes('show') ||
      lowerQuery.includes('list') ||
      lowerQuery.includes('search') ||
      lowerQuery.includes('looking for')
    ) {
      intent.type = 'search';
    } else if (
      lowerQuery.includes('recommend') ||
      lowerQuery.includes('suggest') ||
      lowerQuery.includes('similar')
    ) {
      intent.type = 'recommendation';
    }

    // Extract status entities
    if (lowerQuery.includes('production') || lowerQuery.includes('live')) {
      intent.entities.statuses = [ProjectStatus.InProduction];
    } else if (lowerQuery.includes('development') || lowerQuery.includes('dev')) {
      intent.entities.statuses = [ProjectStatus.InDevelopment];
    } else if (lowerQuery.includes('retired')) {
      intent.entities.statuses = [ProjectStatus.Retired];
    }

    // Extract compliance entities
    const compliance: ('ads' | 'personalInfo')[] = [];
    if (
      lowerQuery.includes('ads') ||
      lowerQuery.includes('automated decision') ||
      lowerQuery.includes('decision-making')
    ) {
      compliance.push('ads');
    }
    if (
      lowerQuery.includes('personal info') ||
      lowerQuery.includes('privacy') ||
      lowerQuery.includes('pib')
    ) {
      compliance.push('personalInfo');
    }
    if (compliance.length > 0) {
      intent.entities.compliance = compliance;
    }

    // Extract primary users
    if (lowerQuery.includes('public') || lowerQuery.includes('citizen')) {
      intent.entities.primaryUsers = [PrimaryUsers.MembersOfPublic];
    } else if (lowerQuery.includes('employee') || lowerQuery.includes('staff') || lowerQuery.includes('internal')) {
      intent.entities.primaryUsers = [PrimaryUsers.Employees];
    }

    // Extract keywords (simple approach - in production, use NLP)
    const keywords: string[] = [];
    const techKeywords = ['chatbot', 'nlp', 'vision', 'translation', 'document', 'classification', 'detection', 'prediction'];
    techKeywords.forEach(keyword => {
      if (lowerQuery.includes(keyword)) {
        keywords.push(keyword);
      }
    });
    if (keywords.length > 0) {
      intent.entities.keywords = keywords;
    }

    return intent;
  }

  /**
   * Build database query from intent
   */
  private buildDatabaseQuery(intent: QueryIntent) {
    const where: any = {
      moderationState: 'Published',
    };

    if (intent.entities.statuses && intent.entities.statuses.length > 0) {
      where.status = { in: intent.entities.statuses };
    }

    if (intent.entities.compliance) {
      if (intent.entities.compliance.includes('ads')) {
        where.isAutomatedDecisionSystem = true;
      }
      if (intent.entities.compliance.includes('personalInfo')) {
        where.involvesPersonalInfo = true;
      }
    }

    if (intent.entities.primaryUsers && intent.entities.primaryUsers.length > 0) {
      where.primaryUsers = { in: intent.entities.primaryUsers };
    }

    if (intent.entities.keywords && intent.entities.keywords.length > 0) {
      where.OR = intent.entities.keywords.map(keyword => ({
        OR: [
          { name: { contains: keyword } },
          { description: { contains: keyword } },
          { capabilities: { contains: keyword } },
        ],
      }));
    }

    return where;
  }

  /**
   * Generate natural language response
   */
  private async generateResponse(intent: QueryIntent, query: string): Promise<AIResponse> {
    const where = this.buildDatabaseQuery(intent);

    if (intent.type === 'stats') {
      // Get statistics
      const totalProjects = await this.prisma.project.count({ where });
      const statusCounts = await this.prisma.project.groupBy({
        by: ['status'],
        where,
        _count: true,
      });

      const stats = {
        total: totalProjects,
        byStatus: statusCounts.map(s => ({ status: s.status, count: s._count })),
      };

      let message = `I found ${totalProjects} AI project${totalProjects !== 1 ? 's' : ''}`;

      if (intent.entities.statuses && intent.entities.statuses.length > 0) {
        message += ` in ${intent.entities.statuses[0].toLowerCase().replace('In', '')}`;
      }

      if (intent.entities.compliance) {
        if (intent.entities.compliance.includes('ads')) {
          message += ' that are Automated Decision Systems';
        }
        if (intent.entities.compliance.includes('personalInfo')) {
          message += ' involving personal information';
        }
      }

      message += '. ';

      if (statusCounts.length > 0) {
        message += 'Breakdown by status: ';
        message += statusCounts
          .map(s => `${s._count} ${s.status.toLowerCase().replace('In', '')}`)
          .join(', ');
      }

      return {
        message,
        stats,
        suggestions: [
          'Show me all production projects',
          'Which projects involve personal information?',
          'List all chatbot projects',
        ],
      };
    } else if (intent.type === 'search' || intent.type === 'recommendation') {
      // Search for projects
      const projects = await this.prisma.project.findMany({
        where,
        include: {
          organization: true,
        },
        take: 5,
        orderBy: {
          createdAt: 'desc',
        },
      });

      let message = `I found ${projects.length} project${projects.length !== 1 ? 's' : ''}`;

      if (intent.entities.keywords && intent.entities.keywords.length > 0) {
        message += ` related to ${intent.entities.keywords.join(', ')}`;
      }

      if (intent.entities.statuses && intent.entities.statuses.length > 0) {
        message += ` in ${intent.entities.statuses[0].toLowerCase().replace('In', '')}`;
      }

      message += '. ';

      if (projects.length > 0) {
        message += `Here are the top results: ${projects.map(p => p.name).slice(0, 3).join(', ')}`;
        if (projects.length > 3) {
          message += ` and ${projects.length - 3} more`;
        }
        message += '. Click on any project card below to see full details.';
      } else {
        message += 'Try adjusting your search criteria or browsing all projects.';
      }

      return {
        message,
        projects: projects.map(p => ({
          id: p.id,
          name: p.name,
          description: p.description,
          status: p.status,
          organization: p.organization?.nameEN,
          capabilities: p.capabilities,
        })),
        suggestions: projects.length > 0
          ? [
              'Tell me more about the first project',
              'Show similar projects',
              'What departments are working on this?',
            ]
          : [
              'Show all projects',
              'What AI projects are in production?',
              'List projects by department',
            ],
      };
    } else {
      // General query - provide helpful information
      const totalProjects = await this.prisma.project.count({
        where: { moderationState: 'Published' },
      });
      const totalOrgs = await this.prisma.organization.count();

      return {
        message: `Hello! I'm the GC AI Assistant. I can help you explore ${totalProjects} AI projects across ${totalOrgs} government departments. I can answer questions about project status, compliance requirements, technologies used, and much more. What would you like to know?`,
        suggestions: [
          'How many AI projects are in production?',
          'Show me all chatbot projects',
          'Which projects involve personal information?',
          'List all projects by Service Canada',
        ],
      };
    }
  }

  /**
   * Main query handler
   */
  async query(userQuery: string): Promise<AIResponse> {
    try {
      const intent = this.parseQuery(userQuery);
      const response = await this.generateResponse(intent, userQuery);
      return response;
    } catch (error) {
      console.error('AI Assistant query error:', error);
      return {
        message: 'I apologize, but I encountered an error processing your request. Please try rephrasing your question or contact support if the issue persists.',
        suggestions: [
          'Show all projects',
          'What AI projects are in production?',
          'Help me find projects',
        ],
      };
    }
  }

  /**
   * Get conversation starters
   */
  async getConversationStarters(): Promise<string[]> {
    return [
      'How many AI projects are in production?',
      'Show me all chatbot projects',
      'Which projects are Automated Decision Systems?',
      'List projects involving personal information',
      'What departments are using AI?',
      'Show me projects in development',
    ];
  }
}

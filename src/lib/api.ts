import {
  Project,
  Organization,
  PaginatedResponse,
  ProjectFilters,
  CreateProjectInput,
  UpdateProjectInput,
  ImportResult,
  AdminStatsResponse,
} from '@/types';

// API base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function getClientAuthHeaders(): Record<string, string> {
  const authToken = localStorage.getItem('gcaihubAccessToken');
  const devUserId = localStorage.getItem('gcaihubDevUserId');
  const devRoles = localStorage.getItem('gcaihubDevRoles') || 'submitter';

  if (authToken) {
    return { Authorization: `Bearer ${authToken}` };
  }

  if (devUserId) {
    return {
      'x-dev-user-id': devUserId,
      'x-dev-roles': devRoles,
    };
  }

  return {};
}

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const authHeaders = getClientAuthHeaders();

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        error: 'Request failed',
        message: response.statusText,
      }));
      throw new Error(error.message || error.error || 'Request failed');
    }

    return response.json();
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

/**
 * Projects API
 */
export const projectsApi = {
  /**
   * Get list of projects with optional filters
   */
  async getAll(filters?: ProjectFilters): Promise<PaginatedResponse<Project>> {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      });
    }

    const query = params.toString();
    const endpoint = query ? `/projects?${query}` : '/projects';

    return fetchAPI<PaginatedResponse<Project>>(endpoint);
  },

  /**
   * Get single project by ID
   */
  async getById(id: string): Promise<Project> {
    return fetchAPI<Project>(`/projects/${id}`);
  },

  /**
   * Create new project
   */
  async create(data: CreateProjectInput): Promise<Project> {
    return fetchAPI<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update existing project
   */
  async update(id: string, data: UpdateProjectInput): Promise<Project> {
    return fetchAPI<Project>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async submit(id: string, reviewNotes?: string): Promise<Project> {
    return fetchAPI<Project>(`/projects/${id}/submit`, {
      method: 'POST',
      body: JSON.stringify({ reviewNotes }),
    });
  },

  async requestChanges(id: string, reviewNotes?: string): Promise<Project> {
    return fetchAPI<Project>(`/projects/${id}/request-changes`, {
      method: 'POST',
      body: JSON.stringify({ reviewNotes }),
    });
  },

  async approve(id: string, reviewNotes?: string): Promise<Project> {
    return fetchAPI<Project>(`/projects/${id}/approve`, {
      method: 'POST',
      body: JSON.stringify({ reviewNotes }),
    });
  },

  async publish(id: string, reviewNotes?: string): Promise<Project> {
    return fetchAPI<Project>(`/projects/${id}/publish`, {
      method: 'POST',
      body: JSON.stringify({ reviewNotes }),
    });
  },

  async archive(id: string, reviewNotes?: string): Promise<Project> {
    return fetchAPI<Project>(`/projects/${id}/archive`, {
      method: 'POST',
      body: JSON.stringify({ reviewNotes }),
    });
  },

  /**
   * Delete (archive) project
   */
  async delete(id: string): Promise<{ message: string; project: Project }> {
    return fetchAPI(`/projects/${id}`, {
      method: 'DELETE',
    });
  },

  /**
   * Get project statistics
   */
  async getStats(id: string): Promise<{ codeRequests: number }> {
    return fetchAPI(`/projects/${id}/stats`);
  },

  /**
   * Get global project statistics
   */
  async getGlobalStats(): Promise<{
    total: number;
    featured: number;
    inProduction: number;
    organizations: number;
    openSource: number;
  }> {
    return fetchAPI('/projects/stats');
  },
};

/**
 * Organizations API
 */
export const organizationsApi = {
  /**
   * Get all organizations
   */
  async getAll(search?: string): Promise<Organization[]> {
    const endpoint = search ? `/organizations?search=${encodeURIComponent(search)}` : '/organizations';
    return fetchAPI<Organization[]>(endpoint);
  },

  /**
   * Get single organization by ID
   */
  async getById(id: string): Promise<Organization> {
    return fetchAPI<Organization>(`/organizations/${id}`);
  },

  /**
   * Create new organization (admin only)
   */
  async create(data: { nameEN: string; nameFR: string; acronym?: string; url?: string }): Promise<Organization> {
    return fetchAPI<Organization>('/organizations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update organization (admin only)
   */
  async update(id: string, data: Partial<Organization>): Promise<Organization> {
    return fetchAPI<Organization>(`/organizations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * Delete organization (admin only)
   */
  async delete(id: string): Promise<{ message: string }> {
    return fetchAPI(`/organizations/${id}`, {
      method: 'DELETE',
    });
  },
};

/**
 * Registry API (Import/Export)
 */
export const registryApi = {
  /**
   * Import projects from Excel file
   */
  async import(file: File): Promise<{ message: string; result: ImportResult }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/registry/import`, {
      method: 'POST',
      body: formData,
      headers: getClientAuthHeaders(),
      // Don't set Content-Type header - browser will set it with boundary
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        error: 'Import failed',
        message: response.statusText,
      }));
      throw new Error(error.message || error.error || 'Import failed');
    }

    return response.json();
  },

  /**
   * Export projects to Excel
   */
  async export(filters?: { organizationId?: string; status?: string; moderationState?: string }): Promise<Blob> {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }

    const query = params.toString();
    const endpoint = query ? `/registry/export?${query}` : '/registry/export';

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: getClientAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Export failed');
    }

    return response.blob();
  },

  /**
   * Download exported Excel file
   */
  async downloadExport(filters?: { organizationId?: string; status?: string; moderationState?: string }): Promise<void> {
    const blob = await this.export(filters);

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gc-ai-registry-${new Date().toISOString().split('T')[0]}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  },
};

/**
 * AI Assistant API
 */
export const assistantApi = {
  /**
   * Query the AI assistant
   */
  async query(query: string, locale: 'en' | 'fr' = 'en'): Promise<{
    success: boolean;
    query: string;
    locale: 'en' | 'fr';
    response: {
      answer: string;
      projects: Array<{
        id: string;
        nameEN: string;
        nameFR: string;
        descriptionEN: string;
        descriptionFR: string;
        status: string;
        organizationNameEN: string;
        organizationNameFR: string;
        isAutomatedDecisionSystem: boolean;
        involvesPersonalInfo: boolean;
        isOpenSource: boolean;
      }>;
      citations: Array<{
        projectId: string;
        title: string;
        href: string;
      }>;
      suggestions: string[];
    };
  }> {
    return fetchAPI('/assistant/query', {
      method: 'POST',
      body: JSON.stringify({ query, locale }),
    });
  },

  /**
   * Get conversation starters
   */
  async getStarters(): Promise<{
    success: boolean;
    locale: 'en' | 'fr';
    starters: string[];
  }> {
    return fetchAPI('/assistant/starters');
  },
};

/**
 * Admin API
 */
export const adminApi = {
  /**
   * Get comprehensive admin analytics
   */
  async getStats(params?: { scope?: 'published' | 'all'; includeCodeRequests?: boolean }): Promise<AdminStatsResponse> {
    const url = new URL(`${API_BASE_URL}/admin/stats`);
    if (params?.scope) url.searchParams.set('scope', params.scope);
    if (params?.includeCodeRequests !== undefined) {
      url.searchParams.set('includeCodeRequests', String(params.includeCodeRequests));
    }
    return fetchAPI<AdminStatsResponse>(url.toString().replace(API_BASE_URL, ''));
  },
};

/**
 * Auth API
 */
export const authApi = {
  async me(): Promise<{
    authenticated: boolean;
    user: { id?: string; email?: string; displayName?: string } | null;
    roles: Array<'submitter' | 'reviewer' | 'admin'>;
  }> {
    return fetchAPI('/auth/me');
  },
};

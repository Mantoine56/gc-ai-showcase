import * as XLSX from 'xlsx';
import { PrismaClient, PrimaryUsers, DevelopedBy, ProjectStatus } from '../../generated/prisma';

// Column mapping from Excel to our database schema
// Based on GCAI-Hub-Plan.md Section 5
const EXCEL_COLUMN_MAP = {
  'AI Register ID (TBS use only)': 'aiRegisterId',
  'Name of AI system': 'name',
  'Service Inventory ID': 'serviceInventoryId',
  'Government organization': 'organization',
  'Purpose of AI system': 'description',
  'AI system primary users': 'primaryUsers',
  'Developed by': 'developedBy',
  'Vendor name': 'vendorName',
  'AI system status': 'status',
  'Status date': 'statusYear',
  'AI system capabilities': 'capabilities',
  'Automated decision system': 'isAutomatedDecisionSystem',
  'Algorithmic Impact Assessment': 'openGovAiaId',
  'Data sources': 'dataSources',
  'Involves personal information': 'involvesPersonalInfo',
  'Personal Information Banks': 'personalInformationBanks',
  'Notification of AI': 'hasUserNotification',
  'Access to Information request': 'atipRequestRefs',
  'AI system results': 'outcomes',
  'Source 1 (TBS use only)': 'source1',
  'Source 2 (TBS use only)': 'source2',
};

interface ImportResult {
  success: boolean;
  imported: number;
  errors: Array<{ row: number; error: string }>;
  warnings: Array<{ row: number; warning: string }>;
}

export class ExcelService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Parse Excel file buffer and import projects
   */
  async importFromExcel(fileBuffer: Buffer): Promise<ImportResult> {
    const result: ImportResult = {
      success: false,
      imported: 0,
      errors: [],
      warnings: [],
    };

    try {
      // Read the workbook
      const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

      // Get the first sheet (assuming "GC" sheet as per data.xlsx)
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert to JSON
      const rows: any[] = XLSX.utils.sheet_to_json(worksheet);

      console.log(`📊 Processing ${rows.length} rows from Excel file`);

      // Process each row
      for (let i = 0; i < rows.length; i++) {
        const rowNum = i + 2; // +2 because Excel is 1-indexed and has header row
        const row = rows[i];

        try {
          await this.importRow(row, rowNum, result);
          result.imported++;
        } catch (error: any) {
          result.errors.push({
            row: rowNum,
            error: error.message || 'Unknown error',
          });
        }
      }

      result.success = result.errors.length === 0;

      return result;
    } catch (error: any) {
      throw new Error(`Failed to parse Excel file: ${error.message}`);
    }
  }

  /**
   * Import a single row from Excel
   */
  private async importRow(row: any, rowNum: number, result: ImportResult): Promise<void> {
    // Map Excel columns to our schema
    const name = this.getStringValue(row, 'Name of AI system');
    const organizationName = this.getStringValue(row, 'Government organization');

    // Validate required fields
    if (!name) {
      throw new Error('Name of AI system is required');
    }
    if (!organizationName) {
      throw new Error('Government organization is required');
    }

    // Find or create organization
    let organization = await this.prisma.organization.findFirst({
      where: {
        OR: [
          { nameEN: { equals: organizationName, mode: 'insensitive' } },
          { nameFR: { equals: organizationName, mode: 'insensitive' } },
        ],
      },
    });

    if (!organization) {
      // Create new organization
      organization = await this.prisma.organization.create({
        data: {
          nameEN: organizationName,
          nameFR: organizationName, // In production, would need proper FR translation
        },
      });
      result.warnings.push({
        row: rowNum,
        warning: `Created new organization: ${organizationName}`,
      });
    }

    // Map primary users
    const primaryUsersRaw = this.getStringValue(row, 'AI system primary users');
    const primaryUsers = this.mapPrimaryUsers(primaryUsersRaw);

    // Map developed by
    const developedByRaw = this.getStringValue(row, 'Developed by');
    const developedBy = this.mapDevelopedBy(developedByRaw);

    // Map status
    const statusRaw = this.getStringValue(row, 'AI system status');
    const status = this.mapStatus(statusRaw);

    // Parse boolean fields
    const isAutomatedDecisionSystem = this.parseBooleanField(
      row,
      'Automated decision system'
    );
    const involvesPersonalInfo = this.parseBooleanField(
      row,
      'Involves personal information'
    );
    const hasUserNotification = this.parseBooleanField(
      row,
      'Notification of AI'
    );

    // Create project
    await this.prisma.project.create({
      data: {
        name,
        organizationId: organization.id,
        description: this.getStringValue(row, 'Purpose of AI system') || '',
        primaryUsers,
        developedBy,
        vendorName: this.getStringValue(row, 'Vendor name'),
        status,
        statusYear: this.getYearValue(row, 'Status date'),
        capabilities: this.getStringValue(row, 'AI system capabilities'),
        isAutomatedDecisionSystem,
        openGovAiaId: this.getStringValue(row, 'Algorithmic Impact Assessment'),
        dataSources: this.getStringValue(row, 'Data sources'),
        involvesPersonalInfo,
        personalInformationBanks: this.getStringValue(row, 'Personal Information Banks'),
        hasUserNotification,
        atipRequestRefs: this.getStringValue(row, 'Access to Information request'),
        outcomes: this.getStringValue(row, 'AI system results'),
        aiRegisterId: this.getStringValue(row, 'AI Register ID (TBS use only)'),
        source1: this.getStringValue(row, 'Source 1 (TBS use only)'),
        source2: this.getStringValue(row, 'Source 2 (TBS use only)'),
        moderationState: 'Published', // Auto-publish imported data
      },
    });
  }

  /**
   * Helper methods for data extraction and mapping
   */
  private getStringValue(row: any, columnName: string): string | null {
    const value = row[columnName];
    if (!value || value === '' || value === 'N/A' || value === 'Not applicable') {
      return null;
    }
    return String(value).trim();
  }

  private getYearValue(row: any, columnName: string): number | null {
    const value = this.getStringValue(row, columnName);
    if (!value) return null;

    const year = parseInt(value);
    if (isNaN(year) || year < 2000 || year > 2100) {
      return null;
    }
    return year;
  }

  private parseBooleanField(row: any, columnName: string): boolean {
    const value = this.getStringValue(row, columnName);
    if (!value) return false;

    const normalized = value.toLowerCase();
    return normalized === 'yes' || normalized === 'true' || normalized === '1';
  }

  private mapPrimaryUsers(value: string | null): PrimaryUsers {
    if (!value) return PrimaryUsers.Neither;

    const normalized = value.toLowerCase().replace(/\s+/g, '');

    if (normalized.includes('employee')) return PrimaryUsers.Employees;
    if (normalized.includes('public') || normalized.includes('citizen')) {
      return PrimaryUsers.MembersOfPublic;
    }
    if (normalized.includes('both')) return PrimaryUsers.Both;

    return PrimaryUsers.Neither;
  }

  private mapDevelopedBy(value: string | null): DevelopedBy {
    if (!value) return DevelopedBy.Other;

    const normalized = value.toLowerCase();

    if (normalized.includes('government')) return DevelopedBy.Government;
    if (normalized.includes('vendor') || normalized.includes('contractor')) {
      return DevelopedBy.Vendor;
    }

    return DevelopedBy.Other;
  }

  private mapStatus(value: string | null): ProjectStatus {
    if (!value) return ProjectStatus.InDevelopment;

    const normalized = value.toLowerCase().replace(/\s+/g, '');

    if (normalized.includes('production') || normalized === 'live') {
      return ProjectStatus.InProduction;
    }
    if (normalized.includes('retired') || normalized.includes('decommission')) {
      return ProjectStatus.Retired;
    }

    return ProjectStatus.InDevelopment;
  }

  /**
   * Export projects to Excel format
   */
  async exportToExcel(filters?: any): Promise<Buffer> {
    // Fetch projects with filters
    const projects = await this.prisma.project.findMany({
      where: filters,
      include: {
        organization: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    console.log(`📤 Exporting ${projects.length} projects to Excel`);

    // Create worksheet data
    const worksheetData: any[] = [];

    // Add header row (matching Excel template column names)
    worksheetData.push([
      'AI Register ID (TBS use only)',
      'Name of AI system',
      'Service Inventory ID',
      'Government organization',
      'Purpose of AI system',
      'AI system primary users',
      'Developed by',
      'Vendor name',
      'AI system status',
      'Status date',
      'AI system capabilities',
      'Automated decision system',
      'Algorithmic Impact Assessment',
      'Data sources',
      'Involves personal information',
      'Personal Information Banks',
      'Notification of AI',
      'Access to Information request',
      'AI system results',
      'Source 1 (TBS use only)',
      'Source 2 (TBS use only)',
    ]);

    // Add data rows
    for (const project of projects) {
      worksheetData.push([
        project.aiRegisterId || '',
        project.name,
        project.serviceInventoryId || '',
        project.organization.nameEN,
        project.description,
        this.formatPrimaryUsers(project.primaryUsers),
        this.formatDevelopedBy(project.developedBy),
        project.vendorName || '',
        this.formatStatus(project.status),
        project.statusYear?.toString() || '',
        project.capabilities || '',
        this.formatBoolean(project.isAutomatedDecisionSystem),
        project.openGovAiaId || '',
        project.dataSources || '',
        this.formatBoolean(project.involvesPersonalInfo),
        project.personalInformationBanks || '',
        this.formatBoolean(project.hasUserNotification),
        project.atipRequestRefs || '',
        project.outcomes || '',
        project.source1 || '',
        project.source2 || '',
      ]);
    }

    // Create workbook
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'GC AI Registry');

    // Set column widths for better readability
    const columnWidths = [
      { wch: 20 }, // AI Register ID
      { wch: 30 }, // Name
      { wch: 20 }, // Service Inventory ID
      { wch: 25 }, // Organization
      { wch: 50 }, // Description
      { wch: 20 }, // Primary users
      { wch: 15 }, // Developed by
      { wch: 25 }, // Vendor name
      { wch: 15 }, // Status
      { wch: 10 }, // Status date
      { wch: 40 }, // Capabilities
      { wch: 10 }, // ADS
      { wch: 25 }, // AIA
      { wch: 40 }, // Data sources
      { wch: 10 }, // Personal info
      { wch: 30 }, // PIBs
      { wch: 10 }, // Notification
      { wch: 25 }, // ATIP
      { wch: 40 }, // Outcomes
      { wch: 20 }, // Source 1
      { wch: 20 }, // Source 2
    ];
    worksheet['!cols'] = columnWidths;

    // Generate buffer
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    return buffer;
  }

  /**
   * Format enum values for Excel export
   */
  private formatPrimaryUsers(value: PrimaryUsers): string {
    const map: Record<PrimaryUsers, string> = {
      [PrimaryUsers.Employees]: 'Employees',
      [PrimaryUsers.MembersOfPublic]: 'Members of Public',
      [PrimaryUsers.Both]: 'Both',
      [PrimaryUsers.Neither]: 'Neither',
    };
    return map[value] || '';
  }

  private formatDevelopedBy(value: DevelopedBy): string {
    const map: Record<DevelopedBy, string> = {
      [DevelopedBy.Government]: 'Government',
      [DevelopedBy.Vendor]: 'Vendor',
      [DevelopedBy.Other]: 'Other',
    };
    return map[value] || '';
  }

  private formatStatus(value: ProjectStatus): string {
    const map: Record<ProjectStatus, string> = {
      [ProjectStatus.InDevelopment]: 'In Development',
      [ProjectStatus.InProduction]: 'In Production',
      [ProjectStatus.Retired]: 'Retired',
    };
    return map[value] || '';
  }

  private formatBoolean(value: boolean): string {
    return value ? 'Yes' : 'No';
  }
}

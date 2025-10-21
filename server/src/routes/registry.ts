import { Router } from 'express';
import multer from 'multer';
import { asyncHandler } from '../middleware/errorHandler';
import { prisma } from '../lib/prisma';
import { ExcelService } from '../services/excel.service';

const router = Router();

// Configure multer for file upload (memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept Excel files only
    const allowedMimes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel.sheet.macroEnabled.12',
    ];

    if (allowedMimes.includes(file.mimetype) || file.originalname.match(/\.(xls|xlsx|xlsm)$/)) {
      cb(null, true);
    } else {
      cb(new Error('Only Excel files (.xls, .xlsx, .xlsm) are allowed'));
    }
  },
});

// POST /api/registry/import - Import from Excel
router.post(
  '/import',
  upload.single('file'),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded',
        message: 'Please upload an Excel file',
      });
    }

    console.log(`📥 Importing Excel file: ${req.file.originalname} (${req.file.size} bytes)`);

    const excelService = new ExcelService(prisma);
    const result = await excelService.importFromExcel(req.file.buffer);

    const statusCode = result.success ? 200 : 207; // 207 Multi-Status for partial success

    res.status(statusCode).json({
      message: result.success
        ? 'Import completed successfully'
        : 'Import completed with errors',
      result,
    });
  })
);

// GET /api/registry/export - Export to Excel
router.get(
  '/export',
  asyncHandler(async (req, res) => {
    const { organizationId, status, moderationState } = req.query;

    // Build filter criteria
    const filters: any = {};

    if (organizationId) filters.organizationId = organizationId;
    if (status) filters.status = status;
    if (moderationState) filters.moderationState = moderationState;

    // Default to only published projects if no moderation state specified
    if (!moderationState) {
      filters.moderationState = 'Published';
    }

    console.log('📊 Export filters:', filters);

    const excelService = new ExcelService(prisma);
    const buffer = await excelService.exportToExcel(filters);

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `gc-ai-registry-${timestamp}.xlsx`;

    // Set response headers for file download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', buffer.length);

    res.send(buffer);
  })
);

export default router;

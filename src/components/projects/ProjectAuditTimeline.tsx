import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { ProjectAuditEntry } from '@/types';
import { History, MessageSquare, RefreshCw } from 'lucide-react';

interface ProjectAuditTimelineProps {
  entries?: ProjectAuditEntry[];
  isLoading: boolean;
  error?: Error | null;
}

interface ParsedAuditDiff {
  from?: string;
  to?: string;
  reviewNotes?: string;
  moderationState?: string;
  translationStatus?: string;
}

function formatAuditAction(action: string) {
  switch (action) {
    case 'project.create':
      return 'Created';
    case 'project.update':
      return 'Updated';
    case 'project.submitted':
      return 'Submitted for review';
    case 'project.approved':
      return 'Approved';
    case 'project.published':
      return 'Published';
    case 'project.request_changes':
      return 'Returned to draft';
    case 'project.archived':
      return 'Archived';
    default:
      return action.replace(/^project\./, '').replace(/_/g, ' ');
  }
}

function parseAuditDiff(diff?: string): ParsedAuditDiff | null {
  if (!diff) return null;

  try {
    return JSON.parse(diff) as ParsedAuditDiff;
  } catch {
    return null;
  }
}

function formatActor(entry: ProjectAuditEntry) {
  return entry.actorDisplayName || entry.actorEmail || entry.actorId || 'System';
}

export function ProjectAuditTimeline({
  entries,
  isLoading,
  error,
}: ProjectAuditTimelineProps) {
  return (
    <Card className="border-gcds-border-secondary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gcds-text-primary">
          <History className="h-5 w-5" />
          Activity timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : error ? (
          <div className="rounded-lg border border-gcds-color-red-300 bg-gcds-color-red-100 p-4 text-sm text-gcds-color-red-900">
            Failed to load activity history: {error.message}
          </div>
        ) : !entries || entries.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gcds-border-secondary p-4 text-sm text-gcds-text-secondary">
            No internal activity has been recorded for this project yet.
          </div>
        ) : (
          <ScrollArea className="max-h-[24rem] pr-3">
            <div className="space-y-3">
              {entries.map((entry) => {
                const diff = parseAuditDiff(entry.diff);
                return (
                  <div
                    key={entry.id}
                    className="rounded-lg border border-gcds-border-secondary bg-gcds-background-primary p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline">{formatAuditAction(entry.action)}</Badge>
                          {diff?.from && diff?.to && (
                            <span className="text-xs text-gcds-text-secondary">
                              {diff.from} {'->'} {diff.to}
                            </span>
                          )}
                        </div>
                        <div className="mt-2 text-sm font-medium text-gcds-text-primary">
                          {formatActor(entry)}
                        </div>
                        <div className="text-xs text-gcds-text-secondary">
                          {new Date(entry.createdAt).toLocaleString()}
                        </div>
                      </div>
                      {diff?.translationStatus && (
                        <Badge variant="secondary">Translation {diff.translationStatus}</Badge>
                      )}
                    </div>

                    {diff?.reviewNotes && (
                      <div className="mt-3 rounded-lg border border-gcds-color-blue-300 bg-gcds-color-blue-100 p-3 text-sm text-gcds-color-blue-900">
                        <div className="mb-1 flex items-center gap-2 font-semibold">
                          <MessageSquare className="h-4 w-4" />
                          Review notes
                        </div>
                        <p className="whitespace-pre-wrap">{diff.reviewNotes}</p>
                      </div>
                    )}

                    {entry.action === 'project.update' && !diff?.reviewNotes && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-gcds-text-secondary">
                        <RefreshCw className="h-4 w-4" />
                        Draft content or metadata was updated.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}

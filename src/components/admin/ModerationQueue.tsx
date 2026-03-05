import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Globe2, Loader2, MessageSquare } from 'lucide-react';
import { useAuthProfile } from '@/hooks/useAuth';
import {
  useApproveProject,
  useArchiveProject,
  useProjects,
  usePublishProject,
  useRequestChangesProject,
} from '@/hooks/useProjects';
import { getPublishReadiness } from '@/lib/projectReadiness';
import { ModerationState, Project } from '@/types';

type ModerationAction = 'approve' | 'requestChanges' | 'publish' | 'archive';

const MODERATION_TABS: Array<{ value: ModerationState; label: string }> = [
  { value: ModerationState.Submitted, label: 'Submitted' },
  { value: ModerationState.Approved, label: 'Approved' },
  { value: ModerationState.Draft, label: 'Draft' },
  { value: ModerationState.Published, label: 'Published' },
  { value: ModerationState.Archived, label: 'Archived' },
];

const MODERATION_ACTION_LABELS: Record<
  ModerationAction,
  { title: string; button: string; nextState: ModerationState }
> = {
  approve: {
    title: 'Approve project',
    button: 'Approve project',
    nextState: ModerationState.Approved,
  },
  requestChanges: {
    title: 'Request changes',
    button: 'Return to draft',
    nextState: ModerationState.Draft,
  },
  publish: {
    title: 'Publish project',
    button: 'Publish project',
    nextState: ModerationState.Published,
  },
  archive: {
    title: 'Archive project',
    button: 'Archive project',
    nextState: ModerationState.Archived,
  },
};

function formatModerationDate(project: Project, state: ModerationState) {
  switch (state) {
    case ModerationState.Submitted:
      return project.submittedAt;
    case ModerationState.Approved:
      return project.approvedAt;
    case ModerationState.Published:
      return project.publishedAt;
    default:
      return project.updatedAt;
  }
}

function formatModerationLabel(state: ModerationState) {
  switch (state) {
    case ModerationState.Submitted:
      return 'Submitted';
    case ModerationState.Approved:
      return 'Approved';
    case ModerationState.Published:
      return 'Published';
    case ModerationState.Archived:
      return 'Archived';
    case ModerationState.Draft:
      return 'Draft';
  }
}

function ModerationProjectCard({
  project,
  queueState,
  onAction,
}: {
  project: Project;
  queueState: ModerationState;
  onAction: (project: Project, action: ModerationAction) => void;
}) {
  const publishReadiness = getPublishReadiness(project);
  const lastRelevantDate = formatModerationDate(project, queueState);

  return (
    <Card className="border-gcds-border-secondary">
      <CardHeader className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="text-lg text-gcds-text-primary">{project.nameEN}</CardTitle>
            <p className="mt-1 text-sm text-gcds-text-secondary">
              {project.organization?.nameEN || 'Unknown organization'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{formatModerationLabel(project.moderationState)}</Badge>
            <Badge variant={publishReadiness.isReady ? 'default' : 'outline'}>
              {publishReadiness.isReady ? 'Publish ready' : 'Publish blocked'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gcds-text-secondary">
          {project.descriptionEN || 'No description provided.'}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/20 p-3 text-sm">
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <Globe2 className="h-4 w-4" />
              Publish readiness
            </div>
            <div className="mt-1 text-muted-foreground">
              {publishReadiness.completeCount}/{publishReadiness.totalCount} bilingual checks complete
            </div>
          </div>
          <div className="rounded-lg border border-border bg-muted/20 p-3 text-sm">
            <div className="font-semibold text-foreground">
              {queueState === ModerationState.Submitted ? 'Submitted' : 'Last updated'}
            </div>
            <div className="mt-1 text-muted-foreground">
              {lastRelevantDate ? new Date(lastRelevantDate).toLocaleString() : 'No timestamp available'}
            </div>
          </div>
        </div>

        {!publishReadiness.isReady && (
          <div className="rounded-lg border border-gcds-color-orange-300 bg-gcds-color-orange-100 p-3 text-sm text-gcds-color-orange-900">
            Missing: {publishReadiness.items.filter((item) => !item.complete).map((item) => item.label).join(', ')}
          </div>
        )}

        {project.reviewNotes && (
          <div className="rounded-lg border border-gcds-color-blue-300 bg-gcds-color-blue-100 p-3 text-sm">
            <div className="mb-1 flex items-center gap-2 font-semibold text-gcds-color-blue-900">
              <MessageSquare className="h-4 w-4" />
              Review notes
            </div>
            <p className="whitespace-pre-wrap text-gcds-color-blue-900">{project.reviewNotes}</p>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to={`/project/${project.id}`}>
              Open detail
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          {queueState === ModerationState.Submitted && (
            <>
              <Button size="sm" onClick={() => onAction(project, 'approve')}>
                Approve
              </Button>
              <Button size="sm" variant="outline" onClick={() => onAction(project, 'requestChanges')}>
                Return to draft
              </Button>
              <Button size="sm" variant="destructive" onClick={() => onAction(project, 'archive')}>
                Archive
              </Button>
            </>
          )}

          {queueState === ModerationState.Approved && (
            <>
              <Button
                size="sm"
                onClick={() => onAction(project, 'publish')}
                disabled={!publishReadiness.isReady}
              >
                Publish
              </Button>
              <Button size="sm" variant="destructive" onClick={() => onAction(project, 'archive')}>
                Archive
              </Button>
            </>
          )}

          {(queueState === ModerationState.Published || queueState === ModerationState.Draft) && (
            <Button size="sm" variant="destructive" onClick={() => onAction(project, 'archive')}>
              Archive
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function ModerationQueue({
  initialState = ModerationState.Submitted,
}: {
  initialState?: ModerationState;
}) {
  const [queueState, setQueueState] = useState<ModerationState>(initialState);
  const [dialogProject, setDialogProject] = useState<Project | null>(null);
  const [dialogAction, setDialogAction] = useState<ModerationAction | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const { data: authProfile } = useAuthProfile();
  const moderationQueue = useProjects({
    moderationState: queueState,
    limit: 12,
    page: 1,
    sortBy: 'updatedAt',
    sortOrder: 'desc',
  });
  const approveProject = useApproveProject();
  const requestChangesProject = useRequestChangesProject();
  const publishProject = usePublishProject();
  const archiveProject = useArchiveProject();

  const moderationQueueProjects = moderationQueue.data?.data || [];
  const moderationQueueTotal = moderationQueue.data?.pagination.total || 0;
  const moderationQueueError = moderationQueue.error as Error | null;
  const isModerating =
    approveProject.isPending ||
    requestChangesProject.isPending ||
    publishProject.isPending ||
    archiveProject.isPending;

  const openModerationDialog = (project: Project, action: ModerationAction) => {
    setDialogProject(project);
    setDialogAction(action);
    setReviewNotes(project.reviewNotes || '');
  };

  const closeModerationDialog = () => {
    if (isModerating) return;
    setDialogProject(null);
    setDialogAction(null);
    setReviewNotes('');
  };

  const handleModerationAction = async () => {
    if (!dialogProject || !dialogAction) return;

    const payload = {
      id: dialogProject.id,
      reviewNotes: reviewNotes.trim() || undefined,
    };

    switch (dialogAction) {
      case 'approve':
        await approveProject.mutateAsync(payload);
        break;
      case 'requestChanges':
        await requestChangesProject.mutateAsync(payload);
        break;
      case 'publish':
        await publishProject.mutateAsync(payload);
        break;
      case 'archive':
        await archiveProject.mutateAsync(payload);
        break;
    }

    closeModerationDialog();
  };

  return (
    <>
      <Card className="border-gcds-border-secondary">
        <CardHeader className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <CardTitle className="text-xl text-gcds-text-primary">Review queue</CardTitle>
              <p className="mt-1 text-sm text-gcds-text-secondary">
                Triage drafts and submissions, capture reviewer notes, and publish only when bilingual checks are complete.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gcds-text-secondary">
              <Badge variant="outline">Roles: {(authProfile?.roles || []).join(', ') || 'anonymous'}</Badge>
              <Badge variant="outline">
                Queue size: {moderationQueueTotal.toLocaleString()} item{moderationQueueTotal === 1 ? '' : 's'}
              </Badge>
            </div>
          </div>
          <Tabs value={queueState} onValueChange={(value) => setQueueState(value as ModerationState)}>
            <TabsList className="grid w-full grid-cols-5 lg:w-auto">
              {MODERATION_TABS.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {MODERATION_TABS.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="mt-4">
                {moderationQueue.isLoading ? (
                  <div className="flex items-center gap-3 rounded-lg border border-dashed border-gcds-border-secondary p-6 text-sm text-gcds-text-secondary">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading {tab.label.toLowerCase()} queue...
                  </div>
                ) : moderationQueueError ? (
                  <div className="rounded-lg border border-gcds-color-red-300 bg-gcds-color-red-100 p-4 text-sm text-gcds-color-red-900">
                    Failed to load review queue: {moderationQueueError.message}
                  </div>
                ) : moderationQueueProjects.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-gcds-border-secondary p-6 text-sm text-gcds-text-secondary">
                    No {tab.label.toLowerCase()} projects in this queue.
                  </div>
                ) : (
                  <div className="grid gap-4 xl:grid-cols-2">
                    {moderationQueueProjects.map((project) => (
                      <ModerationProjectCard
                        key={project.id}
                        project={project}
                        queueState={queueState}
                        onAction={openModerationDialog}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardHeader>
      </Card>

      <Dialog open={Boolean(dialogProject && dialogAction)} onOpenChange={(open) => !open && closeModerationDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogAction ? MODERATION_ACTION_LABELS[dialogAction].title : 'Moderation action'}
            </DialogTitle>
            <DialogDescription>
              {dialogProject
                ? `${dialogProject.nameEN} will move to ${dialogAction ? MODERATION_ACTION_LABELS[dialogAction].nextState : 'the next state'}.`
                : 'Confirm the moderation action.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {dialogProject && (
              <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm">
                <div className="font-semibold text-foreground">{dialogProject.nameEN}</div>
                <div className="mt-1 text-muted-foreground">
                  Publish readiness:{' '}
                  {getPublishReadiness(dialogProject).isReady ? 'ready' : 'incomplete'}
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="review-notes">Review notes</Label>
              <Textarea
                id="review-notes"
                value={reviewNotes}
                onChange={(event) => setReviewNotes(event.target.value)}
                placeholder="Capture reviewer context, requested edits, or publish notes."
                className="min-h-[140px] resize-y"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeModerationDialog} disabled={isModerating}>
              Cancel
            </Button>
            <Button onClick={() => void handleModerationAction()} disabled={isModerating}>
              {isModerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Applying...
                </>
              ) : (
                MODERATION_ACTION_LABELS[dialogAction || 'approve'].button
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

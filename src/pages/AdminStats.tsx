import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
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
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowRight,
  BarChart3,
  Building2,
  Globe2,
  Loader2,
  MessageSquare,
  ShieldCheck,
  Star,
  TrendingUp,
  User2,
} from 'lucide-react';
import { useAdminStats } from '@/hooks/useAdminStats';
import {
  useApproveProject,
  useArchiveProject,
  useProjects,
  usePublishProject,
  useRequestChangesProject,
} from '@/hooks/useProjects';
import { useAuthProfile } from '@/hooks/useAuth';
import { AdminStatsScope, ModerationState, Project, TranslationStatus } from '@/types';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, AreaChart, Area, CartesianGrid, PieChart, Pie, Cell, LabelList, Label as RechartsLabel } from 'recharts';

const STATUS_ORDER = ['InDevelopment', 'InProduction', 'Retired'] as const;
const STATUS_LABELS: Record<(typeof STATUS_ORDER)[number], string> = {
  InDevelopment: 'In Development',
  InProduction: 'In Production',
  Retired: 'Retired',
};

// Admin Stats page with Published/All scope toggle and comprehensive charts
export default function AdminStats() {
  const [scope, setScope] = useState<AdminStatsScope>('all');
  const [queueState, setQueueState] = useState<ModerationState>(ModerationState.Submitted);
  const [dialogProject, setDialogProject] = useState<Project | null>(null);
  const [dialogAction, setDialogAction] = useState<ModerationAction | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const { data, isLoading, error } = useAdminStats({ scope, includeCodeRequests: true });
  const { data: authProfile } = useAuthProfile();
  const moderationQueue = useProjects({
    moderationState: queueState,
    limit: 8,
    page: 1,
    sortBy: 'updatedAt',
    sortOrder: 'desc',
  });
  const approveProject = useApproveProject();
  const requestChangesProject = useRequestChangesProject();
  const publishProject = usePublishProject();
  const archiveProject = useArchiveProject();

  const summary = data?.summary;

  // Colors using GCDS tokens mapped to chart series keys
  // GC Design System tokens (see docs/designtokens.md). Use only tokens defined in index.css.
  // Using semantic colors: Blues for general metrics, Purples for compliance, Greens for success/production
  const palette = {
    // Primary data visualization colors
    blue800: 'hsl(var(--gcds-color-blue-800))',
    blue700: 'hsl(var(--gcds-color-blue-700))',
    blue600: 'hsl(var(--gcds-color-blue-600))',
    blue500: 'hsl(var(--gcds-color-blue-500))',
    blue400: 'hsl(var(--gcds-color-blue-400))',
    blue300: 'hsl(var(--gcds-color-blue-300))',
    // Compliance and governance colors
    purple700: 'hsl(var(--gcds-color-purple-700))',
    purple600: 'hsl(var(--gcds-color-purple-600))',
    purple500: 'hsl(var(--gcds-color-purple-500))',
    purple400: 'hsl(var(--gcds-color-purple-400))',
    // Time-based and success metrics
    green700: 'hsl(var(--gcds-color-green-700))',
    green600: 'hsl(var(--gcds-color-green-600))',
    green500: 'hsl(var(--gcds-color-green-500))',
    // Supporting colors
    orange600: 'hsl(var(--gcds-color-orange-600))',
    gray: 'hsl(var(--gcds-border-secondary))',
  } as const;

  const statusData = useMemo(() => (data?.distributions.status || []).map(s => ({ name: s.key, value: s.count })), [data]);
  const statusColors: Record<(typeof STATUS_ORDER)[number], string> = {
    InDevelopment: palette.blue600,
    InProduction: 'hsl(var(--gcds-text-success))',
    Retired: 'hsl(var(--gcds-text-secondary))',
  };
  const statusCountsByName = new Map(statusData.map((entry) => [entry.name, entry.value]));
  const statusPieData = STATUS_ORDER.map((key) => ({
    name: key,
    value: statusCountsByName.get(key) || 0,
    fill: statusColors[key],
    displayName: STATUS_LABELS[key],
  }));
  const statusChartConfig = Object.fromEntries(
    STATUS_ORDER.map((key) => [key, { label: STATUS_LABELS[key], color: statusColors[key] }])
  );
  const statusTotal = statusPieData.reduce((sum, entry) => sum + entry.value, 0);
  const moderationData = useMemo(() => (data?.distributions.moderationState || []).map(s => ({ name: s.key, value: s.count })), [data]);
  const developedByData = useMemo(() => (data?.distributions.developedBy || []).map(s => ({ name: s.key, value: s.count })), [data]);
  const primaryUsersData = useMemo(() => (data?.distributions.primaryUsers || []).map(s => ({ name: s.key, value: s.count })), [data]);

  const months = data?.timeSeries.months || [];
  const createdMonthly = data?.timeSeries.createdMonthly || [];
  const publishedMonthly = data?.timeSeries.publishedMonthly || [];
  const cumulative = data?.timeSeries.cumulative || [];
  const timeSeriesRows = months.map((m, i) => ({ month: m, created: createdMonthly[i] || 0, published: publishedMonthly[i] || 0, cumulative: cumulative[i] || 0 }));

  const orgTop = data?.organizations.top || [];
  const orgBarRows = orgTop.map(o => ({ name: o.name, count: o.count }));

  const vendorTop = data?.vendors.top || [];
  const vendorRows = vendorTop.map(v => ({ name: v.vendorName, count: v.count }));

  const capabilitiesTop = data?.content.capabilitiesTop || [];
  const capabilitiesRows = capabilitiesTop.map(c => ({ name: c.key, count: c.count }));
  const pibTop = data?.content.pibCodesTop || [];
  const pibRows = pibTop.map(c => ({ name: c.key, count: c.count }));

  const codeRequests = data?.codeRequests;
  const codeRequestsRows = codeRequests?.months.map((m, i) => ({ month: m, created: codeRequests.createdMonthly[i] || 0 })) || [];
  const codeRequestStatusRows = codeRequests?.countsByStatus.map(s => ({ name: s.key, value: s.count })) || [];
  const moderationCounts = useMemo(() => {
    const counts = new Map<ModerationState, number>();
    (data?.distributions.moderationState || []).forEach((item) => {
      counts.set(item.key as ModerationState, item.count);
    });
    return counts;
  }, [data]);
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
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header and Scope Toggle */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gcds-text-primary">Admin Analytics</h1>
            <p className="text-gcds-text-secondary mt-1.5">Comprehensive statistics across GC AI Registry</p>
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="scope-toggle" className="text-sm text-gcds-text-secondary">Published only</Label>
            <Switch id="scope-toggle" checked={scope === 'all'} onCheckedChange={(v) => setScope(v ? 'all' : 'published')} />
            <span className="text-sm text-gcds-text-secondary">All states</span>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          <KpiCard icon={BarChart3} label="Total" value={summary?.total ?? 0} colorClass="text-gcds-color-blue-700 bg-gcds-color-blue-100" />
          <KpiCard icon={Building2} label="Organizations" value={summary?.organizations ?? 0} colorClass="text-gcds-color-blue-700 bg-gcds-color-blue-100" />
          <KpiCard icon={Star} label="Featured" value={summary?.featured ?? 0} colorClass="text-gcds-color-blue-700 bg-gcds-color-blue-100" />
          <KpiCard icon={TrendingUp} label="In Production" value={summary?.inProduction ?? 0} colorClass="text-gcds-color-blue-700 bg-gcds-color-blue-100" />
          <KpiCard icon={ShieldCheck} label="ADS" value={summary?.adsCount ?? 0} colorClass="text-gcds-color-green-700 bg-gcds-color-green-100" />
          <KpiCard icon={User2} label="Personal Info" value={summary?.personalInfoCount ?? 0} colorClass="text-gcds-color-orange-700 bg-gcds-color-orange-100" />
        </div>

        <Card className="border-gcds-border-secondary">
          <CardHeader className="space-y-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <CardTitle className="text-xl text-gcds-text-primary">Moderation queue</CardTitle>
                <p className="mt-1 text-sm text-gcds-text-secondary">
                  Review submitted drafts, return entries for changes, and publish only when bilingual content is complete.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gcds-text-secondary">
                <Badge variant="outline">Roles: {(authProfile?.roles || []).join(', ') || 'anonymous'}</Badge>
                <Badge variant="outline">
                  Active queue: {moderationQueueTotal.toLocaleString()} item{moderationQueueTotal === 1 ? '' : 's'}
                </Badge>
              </div>
            </div>
            <Tabs value={queueState} onValueChange={(value) => setQueueState(value as ModerationState)}>
              <TabsList className="grid w-full grid-cols-5 lg:w-auto">
                <TabsTrigger value={ModerationState.Submitted}>
                  Submitted ({moderationCounts.get(ModerationState.Submitted) || 0})
                </TabsTrigger>
                <TabsTrigger value={ModerationState.Approved}>
                  Approved ({moderationCounts.get(ModerationState.Approved) || 0})
                </TabsTrigger>
                <TabsTrigger value={ModerationState.Draft}>
                  Draft ({moderationCounts.get(ModerationState.Draft) || 0})
                </TabsTrigger>
                <TabsTrigger value={ModerationState.Published}>
                  Published ({moderationCounts.get(ModerationState.Published) || 0})
                </TabsTrigger>
                <TabsTrigger value={ModerationState.Archived}>
                  Archived ({moderationCounts.get(ModerationState.Archived) || 0})
                </TabsTrigger>
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
                      Failed to load moderation queue: {moderationQueueError.message}
                    </div>
                  ) : moderationQueueProjects.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-gcds-border-secondary p-6 text-sm text-gcds-text-secondary">
                      No {tab.label.toLowerCase()} projects in the current queue.
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

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-gcds-color-blue-600" />
              <p className="text-sm text-gcds-text-secondary">Loading analytics data...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="p-6 bg-gcds-color-red-100 border-gcds-color-red-300">
            <p className="text-gcds-color-red-900">Failed to load admin stats: {(error as Error).message}</p>
          </Card>
        )}

        {/* Charts */}
        {!isLoading && !error && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Time series */}
          <Card className="p-5 hover:shadow-md transition-shadow duration-200 border-gcds-border-secondary">
            <h2 className="text-base font-bold mb-4 text-gcds-text-primary flex items-center gap-2">
              <div className="h-1 w-1 bg-gcds-color-blue-600 rounded-full"></div>
              Projects per month
            </h2>
            <ChartContainer config={{ created: { label: 'Created', color: palette.blue600 }, published: { label: 'Published', color: palette.blue400 } }}>
              <AreaChart data={timeSeriesRows}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" hide tickMargin={8} />
                <YAxis width={40} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Area type="monotone" dataKey="created" stroke={palette.blue600} fill={palette.blue600} fillOpacity={0.2} />
                <Area type="monotone" dataKey="published" stroke={palette.blue400} fill={palette.blue400} fillOpacity={0.2} />
              </AreaChart>
            </ChartContainer>
          </Card>

          {/* Cumulative */}
          <Card className="p-5 hover:shadow-md transition-shadow duration-200 border-gcds-border-secondary">
            <h2 className="text-base font-bold mb-4 text-gcds-text-primary flex items-center gap-2">
              <div className="h-1 w-1 bg-gcds-color-blue-500 rounded-full"></div>
              Cumulative projects
            </h2>
            <ChartContainer config={{ cumulative: { label: 'Cumulative', color: palette.blue500 } }}>
              <AreaChart data={timeSeriesRows}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" hide tickMargin={8} />
                <YAxis width={40} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Area type="monotone" dataKey="cumulative" stroke={palette.blue500} fill={palette.blue500} fillOpacity={0.2} />
              </AreaChart>
            </ChartContainer>
          </Card>

          {/* Status distribution */}
          <Card className="p-5 hover:shadow-md transition-shadow duration-200 border-gcds-border-secondary">
            <h2 className="text-base font-bold mb-4 text-gcds-text-primary flex items-center gap-2">
              <div className="h-1 w-1 bg-gcds-color-green-600 rounded-full"></div>
              Status distribution
            </h2>
            <ChartContainer config={statusChartConfig}>
              <PieChart>
                <Pie
                  data={statusPieData}
                  dataKey="value"
                  nameKey="name"
                  // Donut shape with fixed angles to avoid jitter between reloads
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  startAngle={90}
                  endAngle={-270}
                  isAnimationActive={false}
                  labelLine={false}
                  // Only show percent labels on sufficiently large slices
                  label={({ percent }) => (percent && percent >= 0.08 ? `${Math.round(percent * 100)}%` : '')}
                  stroke="hsl(var(--gcds-background-primary))"
                  strokeWidth={2}
                >
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                  {/* Center total label keeps the chart informative even with small slices */}
                  <RechartsLabel
                    value={`${statusTotal.toLocaleString()} projects`}
                    position="center"
                    className="fill-gcds-text-primary text-sm font-semibold"
                  />
                </Pie>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      // Show both absolute number and percent in the tooltip
                      formatter={(value: number) => {
                        return (
                          <span className="font-mono font-medium tabular-nums">
                            {value.toLocaleString()}
                          </span>
                        );
                      }}
                      nameKey="name"
                    />
                  }
                />
                <ChartLegend content={<ChartLegendContent className="text-gcds-text-primary" nameKey="name" />} verticalAlign="bottom" />
              </PieChart>
            </ChartContainer>
          </Card>

          {/* Moderation state distribution (only if scope=all) */}
          {scope === 'all' && (
            <Card className="p-5 hover:shadow-md transition-shadow duration-200 border-gcds-border-secondary">
              <h2 className="text-base font-bold mb-4 text-gcds-text-primary flex items-center gap-2">
                <div className="h-1 w-1 bg-gcds-color-blue-400 rounded-full"></div>
                Moderation state distribution
              </h2>
              <ChartContainer config={{ value: { label: 'Projects' } }}>
                <BarChart data={moderationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="value" fill={palette.blue400}>
                    <LabelList dataKey="value" position="top" />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </Card>
          )}

          {/* DevelopedBy / PrimaryUsers */}
          <Card className="p-5 hover:shadow-md transition-shadow duration-200 border-gcds-border-secondary">
            <h2 className="text-base font-bold mb-4 text-gcds-text-primary flex items-center gap-2">
              <div className="h-1 w-1 bg-gcds-color-blue-600 rounded-full"></div>
              Developed by
            </h2>
            <ChartContainer config={{ value: { label: 'Projects' } }}>
              <BarChart data={developedByData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="value" fill={palette.blue600}>
                  <LabelList dataKey="value" position="top" />
                </Bar>
              </BarChart>
            </ChartContainer>
          </Card>

          <Card className="p-5 hover:shadow-md transition-shadow duration-200 border-gcds-border-secondary">
            <h2 className="text-base font-bold mb-4 text-gcds-text-primary flex items-center gap-2">
              <div className="h-1 w-1 bg-gcds-color-blue-500 rounded-full"></div>
              Primary users
            </h2>
            <ChartContainer config={{ value: { label: 'Projects' } }}>
              <BarChart data={primaryUsersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="value" fill={palette.blue500}>
                  <LabelList dataKey="value" position="top" />
                </Bar>
              </BarChart>
            </ChartContainer>
          </Card>

          {/* Organizations top 10 */}
          <Card className="p-5 hover:shadow-md transition-shadow duration-200 border-gcds-border-secondary">
            <h2 className="text-base font-bold mb-4 text-gcds-text-primary flex items-center gap-2">
              <div className="h-1 w-1 bg-gcds-color-blue-600 rounded-full"></div>
              Top organizations
            </h2>
            <ChartContainer config={{ count: { label: 'Projects', color: palette.blue600 } }}>
              <BarChart data={orgBarRows}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0} angle={-30} textAnchor="end" height={60} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="count" fill={palette.blue600}>
                  <LabelList dataKey="count" position="top" />
                </Bar>
              </BarChart>
            </ChartContainer>
          </Card>

          {/* Vendors top 10 */}
          <Card className="p-5 hover:shadow-md transition-shadow duration-200 border-gcds-border-secondary">
            <h2 className="text-base font-bold mb-4 text-gcds-text-primary flex items-center gap-2">
              <div className="h-1 w-1 bg-gcds-color-purple-600 rounded-full"></div>
              Top vendors
            </h2>
            <ChartContainer config={{ count: { label: 'Projects', color: palette.purple600 } }}>
              <BarChart data={vendorRows}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0} angle={-30} textAnchor="end" height={60} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="count" fill={palette.purple600}>
                  <LabelList dataKey="count" position="top" />
                </Bar>
              </BarChart>
            </ChartContainer>
          </Card>

          {/* Governance charts */}
          <Card className="p-5 hover:shadow-md transition-shadow duration-200 border-gcds-border-secondary">
            <h2 className="text-base font-bold mb-4 text-gcds-text-primary flex items-center gap-2">
              <div className="h-1 w-1 bg-gcds-color-green-600 rounded-full"></div>
              Status year
            </h2>
            <ChartContainer config={{ count: { label: 'Projects', color: palette.green600 } }}>
              <BarChart data={(data?.governance.statusYearBuckets || []).map(b => ({ year: b.year, count: b.count }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="count" fill={palette.green600}>
                  <LabelList dataKey="count" position="top" />
                </Bar>
              </BarChart>
            </ChartContainer>
          </Card>

          {/* Content signals: capabilities and PIBs */}
          <Card className="p-5 hover:shadow-md transition-shadow duration-200 border-gcds-border-secondary">
            <h2 className="text-base font-bold mb-4 text-gcds-text-primary flex items-center gap-2">
              <div className="h-1 w-1 bg-gcds-color-blue-400 rounded-full"></div>
              Top capabilities
            </h2>
            <ChartContainer config={{ count: { label: 'Projects', color: palette.blue400 } }}>
              <BarChart data={capabilitiesRows}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0} angle={-30} textAnchor="end" height={60} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="count" fill={palette.blue400}>
                  <LabelList dataKey="count" position="top" />
                </Bar>
              </BarChart>
            </ChartContainer>
          </Card>

          <Card className="p-5 hover:shadow-md transition-shadow duration-200 border-gcds-border-secondary">
            <h2 className="text-base font-bold mb-4 text-gcds-text-primary flex items-center gap-2">
              <div className="h-1 w-1 bg-gcds-color-orange-600 rounded-full"></div>
              Top PIB codes
            </h2>
            <ChartContainer config={{ count: { label: 'Projects', color: palette.orange600 } }}>
              <BarChart data={pibRows}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0} angle={-30} textAnchor="end" height={60} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="count" fill={palette.orange600}>
                  <LabelList dataKey="count" position="top" />
                </Bar>
              </BarChart>
            </ChartContainer>
          </Card>

          {/* Code Requests */}
          {codeRequests && (
            <Card className="p-5 hover:shadow-md transition-shadow duration-200 border-gcds-border-secondary">
              <h2 className="text-base font-bold mb-4 text-gcds-text-primary flex items-center gap-2">
                <div className="h-1 w-1 bg-gcds-color-blue-600 rounded-full"></div>
                Code requests per month
              </h2>
              <ChartContainer config={{ created: { label: 'Requests', color: palette.blue600 } }}>
                <AreaChart data={codeRequestsRows}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" hide tickMargin={8} />
                  <YAxis width={40} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="created" stroke={palette.blue600} fill={palette.blue600} fillOpacity={0.2} />
                </AreaChart>
              </ChartContainer>
            </Card>
          )}

          {codeRequests && (
            <Card className="p-5 hover:shadow-md transition-shadow duration-200 border-gcds-border-secondary">
              <h2 className="text-base font-bold mb-4 text-gcds-text-primary flex items-center gap-2">
                <div className="h-1 w-1 bg-gcds-color-purple-600 rounded-full"></div>
                Code requests by status
              </h2>
              <ChartContainer config={{ value: { label: 'Requests' } }}>
                <PieChart>
                  <Pie data={codeRequestStatusRows.map((d, i) => ({ ...d, fill: [palette.blue600, palette.purple600, palette.green600, palette.orange600, palette.blue400][i % 5] }))} dataKey="value" nameKey="name" outerRadius={100}>
                    <LabelList dataKey="value" position="outside" />
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                </PieChart>
              </ChartContainer>
            </Card>
          )}
        </div>
        )}

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
                    Translation status: {dialogProject.translationStatus}
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
      </div>
    </DashboardLayout>
  );
}

function KpiCard({ icon: Icon, label, value, colorClass }: { icon: any; label: string; value: number; colorClass: string }) {
  return (
    <Card className="bg-gcds-background-primary rounded-lg p-4 border border-gcds-border-secondary hover:border-gcds-border-accent transition-all duration-200 hover:shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl shrink-0 ${colorClass}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-2xl font-bold text-gcds-text-primary">{value.toLocaleString()}</div>
          <div className="text-xs font-medium text-gcds-text-secondary mt-0.5">{label}</div>
        </div>
      </div>
    </Card>
  );
}

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

function translationBadgeVariant(status: TranslationStatus) {
  return status === TranslationStatus.Ready ? 'default' : 'outline';
}

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
            <Badge variant={translationBadgeVariant(project.translationStatus)}>
              {project.translationStatus === TranslationStatus.Ready ? 'Publish ready' : 'Translation incomplete'}
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
            <div className="font-semibold text-foreground">French content</div>
            <div className="mt-1 text-muted-foreground">
              {project.nameFR?.trim() && project.descriptionFR?.trim()
                ? 'Core French fields are present.'
                : 'Name and description still need French content.'}
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
                disabled={project.translationStatus !== TranslationStatus.Ready}
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

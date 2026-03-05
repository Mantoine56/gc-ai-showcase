import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  ArrowRight,
  BarChart3,
  Building2,
  ClipboardCheck,
  Loader2,
  ShieldCheck,
  Star,
  TrendingUp,
  User2,
} from 'lucide-react';
import { useAdminStats } from '@/hooks/useAdminStats';
import { AdminStatsScope, ModerationState } from '@/types';
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
  const { data, isLoading, error } = useAdminStats({ scope, includeCodeRequests: true });

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

        <Card className="border-gcds-border-secondary p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gcds-text-primary">Reviewer workflow</h2>
              <p className="mt-1 text-sm text-gcds-text-secondary">
                Moderation now lives in its own reviewer queue instead of inside analytics.
              </p>
            </div>
            <Button asChild>
              <Link to="/admin/review">
                Open review queue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            <WorkflowCard
              icon={ClipboardCheck}
              label="Submitted"
              value={moderationCounts.get(ModerationState.Submitted) || 0}
            />
            <WorkflowCard
              icon={ClipboardCheck}
              label="Approved"
              value={moderationCounts.get(ModerationState.Approved) || 0}
            />
            <WorkflowCard
              icon={ClipboardCheck}
              label="Draft"
              value={moderationCounts.get(ModerationState.Draft) || 0}
            />
            <WorkflowCard
              icon={ClipboardCheck}
              label="Archived"
              value={moderationCounts.get(ModerationState.Archived) || 0}
            />
          </div>
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

function WorkflowCard({ icon: Icon, label, value }: { icon: any; label: string; value: number }) {
  return (
    <div className="rounded-lg border border-gcds-border-secondary bg-gcds-background-primary p-4">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-gcds-color-blue-100 p-2 text-gcds-color-blue-700">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-2xl font-bold text-gcds-text-primary">{value.toLocaleString()}</div>
          <div className="text-xs font-medium text-gcds-text-secondary">{label}</div>
        </div>
      </div>
    </div>
  );
}

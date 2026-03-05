import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ModerationQueue } from '@/components/admin/ModerationQueue';

export default function ReviewQueue() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gcds-text-primary">Review Queue</h1>
          <p className="mt-1 text-gcds-text-secondary">
            Dedicated reviewer workspace for moderation actions and publish gating.
          </p>
        </div>

        <ModerationQueue />
      </div>
    </DashboardLayout>
  );
}

import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { AlertCircle, Shield, User } from 'lucide-react';
import BilingualFieldGroup from '../BilingualFieldGroup';
import { ProjectFormData } from '../projectForm';

interface ComplianceStepProps {
  form: UseFormReturn<ProjectFormData>;
}

export default function ComplianceStep({ form }: ComplianceStepProps) {
  const isAutomatedDecisionSystem = form.watch('isAutomatedDecisionSystem');
  const involvesPersonalInfo = form.watch('involvesPersonalInfo');

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <h4 className="mb-1 text-sm font-semibold text-amber-900">
              Compliance and governance requirements
            </h4>
            <p className="text-sm text-amber-800">
              This section captures transparency and privacy signals that reviewers need before approval.
            </p>
          </div>
        </div>
      </div>

      <FormField
        control={form.control}
        name="isAutomatedDecisionSystem"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-border bg-card p-4">
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-gcds-color-blue-700" />
                <FormLabel className="text-base font-semibold">
                  Automated decision system
                </FormLabel>
              </div>
              <FormDescription className="text-sm">
                Turn this on if the system assists or makes administrative decisions about individuals.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      {isAutomatedDecisionSystem && (
        <FormField
          control={form.control}
          name="openGovAiaId"
          render={({ field }) => (
            <FormItem className="ml-6 border-l-2 border-gcds-color-blue-300 pl-4">
              <FormLabel>Algorithmic Impact Assessment ID</FormLabel>
              <FormControl>
                <Input placeholder="e.g., AIA-2024-001" {...field} />
              </FormControl>
              <FormDescription>
                Enter the published AIA identifier if one exists.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="involvesPersonalInfo"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-border bg-card p-4">
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gcds-color-purple-700" />
                <FormLabel className="text-base font-semibold">
                  Involves personal information
                </FormLabel>
              </div>
              <FormDescription className="text-sm">
                Turn this on if the system collects, uses, or discloses personal information.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      {involvesPersonalInfo && (
        <div className="ml-6 border-l-2 border-gcds-color-purple-300 pl-4">
          <BilingualFieldGroup
            form={form}
            nameEN="personalInformationBanksEN"
            nameFR="personalInformationBanksFR"
            label="Personal information bank references"
            description="If PIB references are required, capture them in both languages before publish."
            placeholderEN="e.g., PIB-2024-001, PIB-2024-002"
            placeholderFR="p. ex. FRP-2024-001, FRP-2024-002"
            publishRequired
            multiline
            minHeightClassName="min-h-[100px] resize-y"
          />
        </div>
      )}

      <FormField
        control={form.control}
        name="hasUserNotification"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-border bg-card p-4">
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div className="flex-1 space-y-1">
              <FormLabel className="text-base font-semibold">User notification</FormLabel>
              <FormDescription className="text-sm">
                Confirm whether users are notified that they are interacting with an AI system.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}

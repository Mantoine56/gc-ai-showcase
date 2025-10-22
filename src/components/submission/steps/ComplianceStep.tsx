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
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Shield, User, AlertCircle } from 'lucide-react';

interface ComplianceStepProps {
  form: UseFormReturn<any>;
}

export default function ComplianceStep({ form }: ComplianceStepProps) {
  const isAutomatedDecisionSystem = form.watch('isAutomatedDecisionSystem');
  const involvesPersonalInfo = form.watch('involvesPersonalInfo');
  const personalInformationBanks = form.watch('personalInformationBanks') || '';

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-1">
              Compliance and Governance Requirements
            </h4>
            <p className="text-sm text-amber-800 dark:text-amber-200">
              This section helps ensure your AI system complies with federal privacy laws, transparency requirements, and the Directive on Automated Decision-Making.
            </p>
          </div>
        </div>
      </div>

      {/* Automated Decision System */}
      <FormField
        control={form.control}
        name="isAutomatedDecisionSystem"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-border p-4 bg-card">
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-gcds-color-blue-700" />
                <FormLabel className="text-base font-semibold">
                  Automated Decision System (ADS)
                </FormLabel>
              </div>
              <FormDescription className="text-sm">
                Does this system make or assist in making administrative decisions about individuals?
                This includes recommendations, scoring, or automated processing that affects service delivery.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      {/* AIA ID - Conditional */}
      {isAutomatedDecisionSystem && (
        <FormField
          control={form.control}
          name="openGovAiaId"
          render={({ field }) => (
            <FormItem className="ml-6 pl-4 border-l-2 border-gcds-color-blue-300">
              <FormLabel>Algorithmic Impact Assessment (AIA) ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., AIA-2024-001"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                If an AIA has been completed, enter its reference ID from the Open Government registry
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {/* Personal Information */}
      <FormField
        control={form.control}
        name="involvesPersonalInfo"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-border p-4 bg-card">
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gcds-color-purple-700" />
                <FormLabel className="text-base font-semibold">
                  Involves Personal Information
                </FormLabel>
              </div>
              <FormDescription className="text-sm">
                Does this system collect, use, or disclose personal information as defined by the Privacy Act?
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      {/* PIB References - Conditional */}
      {involvesPersonalInfo && (
        <FormField
          control={form.control}
          name="personalInformationBanks"
          render={({ field }) => (
            <FormItem className="ml-6 pl-4 border-l-2 border-gcds-color-purple-300">
              <FormLabel>Personal Information Bank (PIB) References</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., PIB-2024-001, PIB-2024-002..."
                  className="min-h-[80px] resize-y"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                List all relevant PIB reference numbers, separated by commas ({personalInformationBanks.length} characters)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {/* User Notification */}
      <FormField
        control={form.control}
        name="hasUserNotification"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-border p-4 bg-card">
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 flex-1">
              <FormLabel className="text-base font-semibold">
                User Notification
              </FormLabel>
              <FormDescription className="text-sm">
                Are users notified that they are interacting with an AI system?
                This helps meet transparency and trust requirements.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      {/* Help Text */}
      <div className="bg-gcds-color-blue-100 border border-gcds-color-blue-300 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-gcds-color-blue-900 mb-2">
          Need Help?
        </h4>
        <ul className="text-sm text-gcds-color-blue-900 space-y-1.5">
          <li className="flex items-start gap-2">
            <span className="font-semibold shrink-0">ADS:</span>
            <span>Review the <a href="https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592" target="_blank" rel="noopener noreferrer" className="underline hover:text-gcds-color-blue-700">Directive on Automated Decision-Making</a></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold shrink-0">AIA:</span>
            <span>Complete an <a href="https://open.canada.ca/aia-eia-js/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gcds-color-blue-700">Algorithmic Impact Assessment</a> if required</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold shrink-0">Privacy:</span>
            <span>Consult your department's privacy officer for PIB guidance</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

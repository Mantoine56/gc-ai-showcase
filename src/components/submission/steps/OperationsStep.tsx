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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProjectStatus } from '@/types';

interface OperationsStepProps {
  form: UseFormReturn<any>;
}

export default function OperationsStep({ form }: OperationsStepProps) {
  const dataSources = form.watch('dataSources') || '';
  const atipRequestRefs = form.watch('atipRequestRefs') || '';
  const outcomes = form.watch('outcomes') || '';

  return (
    <div className="space-y-6">
      {/* Status */}
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project Status *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select the current status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={ProjectStatus.InDevelopment}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span>In Development</span>
                  </div>
                </SelectItem>
                <SelectItem value={ProjectStatus.InProduction}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>In Production</span>
                  </div>
                </SelectItem>
                <SelectItem value={ProjectStatus.Retired}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-500" />
                    <span>Retired</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              What is the current operational status of this AI system?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Status Year */}
      <FormField
        control={form.control}
        name="statusYear"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status Year</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="e.g., 2024"
                min={2000}
                max={2100}
                {...field}
                onChange={(e) => {
                  const value = e.target.value ? parseInt(e.target.value) : undefined;
                  field.onChange(value);
                }}
                value={field.value || ''}
              />
            </FormControl>
            <FormDescription>
              Year when this system reached its current status (optional)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Data Sources */}
      <FormField
        control={form.control}
        name="dataSources"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Data Sources</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe the data sources used to train or operate this AI system..."
                className="min-h-[100px] resize-y"
                {...field}
              />
            </FormControl>
            <FormDescription>
              What data is used by this system? Include training data, operational data sources, or external APIs ({dataSources.length} characters)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* ATIP Request References */}
      <FormField
        control={form.control}
        name="atipRequestRefs"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ATIP Request References</FormLabel>
            <FormControl>
              <Textarea
                placeholder="e.g., A-2023-00123, A-2024-00456..."
                className="min-h-[80px] resize-y"
                {...field}
              />
            </FormControl>
            <FormDescription>
              References to any Access to Information or Privacy (ATIP) requests related to this system ({atipRequestRefs.length} characters)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Outcomes */}
      <FormField
        control={form.control}
        name="outcomes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Outcomes & Impact</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe the results, benefits, or impact of this AI system..."
                className="min-h-[120px] resize-y"
                {...field}
                maxLength={500}
              />
            </FormControl>
            <FormDescription>
              What measurable outcomes or impacts has this system achieved? Include efficiency gains, cost savings, improved service delivery, etc. ({outcomes.length}/500 characters)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Help Text */}
      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Tips for Describing Outcomes
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
          <li>Use specific, quantifiable metrics when possible (e.g., "Reduced processing time by 40%")</li>
          <li>Highlight improvements in service quality or citizen satisfaction</li>
          <li>Mention any cost savings or resource efficiencies</li>
          <li>Include lessons learned or areas for improvement</li>
        </ul>
      </div>
    </div>
  );
}

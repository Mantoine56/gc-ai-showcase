import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PrimaryUsers } from '@/types';

interface PurposeStepProps {
  form: UseFormReturn<any>;
}

export default function PurposeStep({ form }: PurposeStepProps) {
  const description = form.watch('description') || '';
  const capabilities = form.watch('capabilities') || '';

  return (
    <div className="space-y-6">
      {/* Description */}
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project Description *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe what this AI system does, its purpose, and how it's used..."
                className="min-h-[150px] resize-y"
                {...field}
                maxLength={1000}
              />
            </FormControl>
            <FormDescription>
              Provide a clear, comprehensive description of your AI system's purpose and functionality ({description.length}/1000 characters)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Capabilities */}
      <FormField
        control={form.control}
        name="capabilities"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Key Capabilities</FormLabel>
            <FormControl>
              <Textarea
                placeholder="e.g., Natural Language Processing, Document Classification, Predictive Analytics..."
                className="min-h-[100px] resize-y"
                {...field}
                maxLength={300}
              />
            </FormControl>
            <FormDescription>
              List the main AI/ML capabilities of this system, separated by commas ({capabilities.length}/300 characters)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Primary Users */}
      <FormField
        control={form.control}
        name="primaryUsers"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Primary Users *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select the primary users of this system" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={PrimaryUsers.Employees}>
                  Employees (Internal Government Staff)
                </SelectItem>
                <SelectItem value={PrimaryUsers.MembersOfPublic}>
                  Members of Public (Citizens)
                </SelectItem>
                <SelectItem value={PrimaryUsers.Both}>
                  Both (Employees and Public)
                </SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Who are the primary intended users of this AI system?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Helper Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Tips for a Great Description
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
          <li>Explain the problem your AI system solves</li>
          <li>Describe the key features and how they benefit users</li>
          <li>Mention any specific AI/ML techniques used (if applicable)</li>
          <li>Be clear and concise - avoid technical jargon when possible</li>
        </ul>
      </div>
    </div>
  );
}

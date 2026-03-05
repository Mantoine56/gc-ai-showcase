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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProjectStatus } from '@/types';
import BilingualFieldGroup from '../BilingualFieldGroup';
import { ProjectFormData } from '../projectForm';

interface OperationsStepProps {
  form: UseFormReturn<ProjectFormData>;
}

export default function OperationsStep({ form }: OperationsStepProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project status *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select the current status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={ProjectStatus.InDevelopment}>In development</SelectItem>
                <SelectItem value={ProjectStatus.InProduction}>In production</SelectItem>
                <SelectItem value={ProjectStatus.Retired}>Retired</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>Set the current lifecycle status of the system.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="statusYear"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status year</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="e.g., 2026"
                min={2000}
                max={2100}
                value={field.value ?? ''}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  field.onChange(nextValue ? Number.parseInt(nextValue, 10) : undefined);
                }}
              />
            </FormControl>
            <FormDescription>
              Optional year the system entered its current status.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <BilingualFieldGroup
        form={form}
        nameEN="dataSourcesEN"
        nameFR="dataSourcesFR"
        label="Data sources"
        description="List the operational or training data sources that support the system."
        placeholderEN="Describe the English data-source summary"
        placeholderFR="Décrivez le résumé français des sources de données"
        publishRequired
        multiline
        minHeightClassName="min-h-[120px] resize-y"
      />

      <BilingualFieldGroup
        form={form}
        nameEN="atipRequestRefsEN"
        nameFR="atipRequestRefsFR"
        label="ATIP request references"
        description="If there are ATIP references worth publishing, keep the bilingual text aligned."
        placeholderEN="e.g., A-2024-00123"
        placeholderFR="p. ex. A-2024-00123"
        multiline
        minHeightClassName="min-h-[100px] resize-y"
      />

      <BilingualFieldGroup
        form={form}
        nameEN="outcomesEN"
        nameFR="outcomesFR"
        label="Outcomes and impact"
        description="Summarize the outcomes that can be publicly disclosed."
        placeholderEN="Describe the results, impact, or benefits in English"
        placeholderFR="Décrivez les résultats, l'impact ou les avantages en français"
        publishRequired
        multiline
        maxLength={500}
        minHeightClassName="min-h-[140px] resize-y"
      />
    </div>
  );
}

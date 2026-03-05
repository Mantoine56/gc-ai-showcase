import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PrimaryUsers } from '@/types';
import BilingualFieldGroup from '../BilingualFieldGroup';
import { ProjectFormData } from '../projectForm';

interface PurposeStepProps {
  form: UseFormReturn<ProjectFormData>;
}

export default function PurposeStep({ form }: PurposeStepProps) {
  return (
    <div className="space-y-6">
      <BilingualFieldGroup
        form={form}
        nameEN="descriptionEN"
        nameFR="descriptionFR"
        label="Project description"
        description="Describe what the system does, why it exists, and how it is used."
        placeholderEN="Describe the AI system in English"
        placeholderFR="Décrivez le système d'IA en français"
        englishRequired
        frenchRequiredForPublish
        multiline
        maxLength={1000}
        minHeightClassName="min-h-[160px] resize-y"
      />

      <BilingualFieldGroup
        form={form}
        nameEN="capabilitiesEN"
        nameFR="capabilitiesFR"
        label="Key capabilities"
        description="List the major AI or automation capabilities in each language."
        placeholderEN="e.g., Document classification, semantic search, summarization"
        placeholderFR="p. ex. classification de documents, recherche sémantique, résumé"
        publishRequired
        multiline
        maxLength={300}
        minHeightClassName="min-h-[120px] resize-y"
      />

      <FormField
        control={form.control}
        name="primaryUsers"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Primary users *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select the primary users of this system" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={PrimaryUsers.Employees}>
                  Employees (internal government staff)
                </SelectItem>
                <SelectItem value={PrimaryUsers.MembersOfPublic}>
                  Members of the public
                </SelectItem>
                <SelectItem value={PrimaryUsers.Both}>Both</SelectItem>
                <SelectItem value={PrimaryUsers.Neither}>Neither / indirect users</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>Choose who directly interacts with the system.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="rounded-lg border border-gcds-color-blue-300 bg-gcds-color-blue-100 p-4">
        <h4 className="mb-2 text-sm font-semibold text-gcds-color-blue-900">
          Content guidance
        </h4>
        <ul className="list-disc space-y-1 pl-5 text-sm text-gcds-color-blue-900">
          <li>Describe the operational problem, not just the model class.</li>
          <li>Use public-safe language that can appear in the registry unchanged.</li>
          <li>Keep English and French meaning aligned so reviewers can publish without rewrite.</li>
        </ul>
      </div>
    </div>
  );
}

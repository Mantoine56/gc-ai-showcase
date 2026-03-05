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
import { Skeleton } from '@/components/ui/skeleton';
import { useOrganizations } from '@/hooks/useOrganizations';
import { DevelopedBy } from '@/types';
import BilingualFieldGroup from '../BilingualFieldGroup';
import { ProjectFormData } from '../projectForm';
import { UseFormReturn } from 'react-hook-form';

interface IdentityStepProps {
  form: UseFormReturn<ProjectFormData>;
}

export default function IdentityStep({ form }: IdentityStepProps) {
  const { data: organizations, isLoading } = useOrganizations();
  const developedBy = form.watch('developedBy');

  return (
    <div className="space-y-6">
      <BilingualFieldGroup
        form={form}
        nameEN="nameEN"
        nameFR="nameFR"
        label="Project name"
        description="Use the public-facing name of the AI system in both official languages."
        placeholderEN="Enter the English name of your AI system"
        placeholderFR="Entrez le nom français de votre système d'IA"
        englishRequired
        frenchRequiredForPublish
        maxLength={50}
      />

      <FormField
        control={form.control}
        name="serviceInventoryId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Service Inventory ID</FormLabel>
            <FormControl>
              <Input placeholder="e.g., SI-12345" {...field} />
            </FormControl>
            <FormDescription>
              Optional internal reference used by your department or agency.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="organizationId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Organization *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your department or agency" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {isLoading ? (
                  <div className="p-2">
                    <Skeleton className="h-8 w-full" />
                  </div>
                ) : (
                  organizations?.map((org) => (
                    <SelectItem key={org.id} value={org.id}>
                      {org.nameEN}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <FormDescription>
              The Government of Canada organization responsible for this AI system.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="developedBy"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Developed by *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select who developed this system" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={DevelopedBy.Government}>Government (in-house)</SelectItem>
                <SelectItem value={DevelopedBy.Vendor}>Vendor</SelectItem>
                <SelectItem value={DevelopedBy.Other}>Other / collaboration</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>Identify who built or is building the system.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {developedBy === DevelopedBy.Vendor && (
        <FormField
          control={form.control}
          name="vendorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vendor name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter the vendor company name" {...field} />
              </FormControl>
              <FormDescription>
                Required when the system is built by an external supplier.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}

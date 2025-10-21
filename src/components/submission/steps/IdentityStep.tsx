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
import { DevelopedBy } from '@/types';
import { useOrganizations } from '@/hooks/useOrganizations';
import { Skeleton } from '@/components/ui/skeleton';

interface IdentityStepProps {
  form: UseFormReturn<any>;
}

export default function IdentityStep({ form }: IdentityStepProps) {
  const { data: organizations, isLoading } = useOrganizations();
  const developedBy = form.watch('developedBy');

  return (
    <div className="space-y-6">
      {/* Project Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project Name *</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter the name of your AI system"
                {...field}
                maxLength={50}
              />
            </FormControl>
            <FormDescription>
              A clear, descriptive name for your AI system ({field.value?.length || 0}/50 characters)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Service Inventory ID */}
      <FormField
        control={form.control}
        name="serviceInventoryId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Service Inventory ID</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g., SI-12345"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Optional: Your organization's service inventory identifier
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Organization */}
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
              The Government of Canada department or agency responsible for this AI system
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Developed By */}
      <FormField
        control={form.control}
        name="developedBy"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Developed By *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select who developed this system" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={DevelopedBy.Government}>Government (In-house)</SelectItem>
                <SelectItem value={DevelopedBy.Vendor}>Vendor</SelectItem>
                <SelectItem value={DevelopedBy.Collaboration}>Collaboration</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Who developed or is developing this AI system
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Vendor Name - Conditional */}
      {developedBy === DevelopedBy.Vendor && (
        <FormField
          control={form.control}
          name="vendorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vendor Name *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the vendor company name"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Name of the vendor company that developed this system
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}

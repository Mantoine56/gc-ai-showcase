import { FieldPathByValue, UseFormReturn } from 'react-hook-form';
import { Badge } from '@/components/ui/badge';
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
import { ProjectFormData } from './projectForm';

interface BilingualFieldGroupProps {
  form: UseFormReturn<ProjectFormData>;
  nameEN: FieldPathByValue<ProjectFormData, string>;
  nameFR: FieldPathByValue<ProjectFormData, string>;
  label: string;
  description: string;
  placeholderEN: string;
  placeholderFR: string;
  englishRequired?: boolean;
  frenchRequiredForPublish?: boolean;
  multiline?: boolean;
  maxLength?: number;
  minHeightClassName?: string;
}

function hasText(value: string | undefined) {
  return Boolean(value?.trim());
}

export default function BilingualFieldGroup({
  form,
  nameEN,
  nameFR,
  label,
  description,
  placeholderEN,
  placeholderFR,
  englishRequired = false,
  frenchRequiredForPublish = true,
  multiline = false,
  maxLength,
  minHeightClassName,
}: BilingualFieldGroupProps) {
  const englishValue = form.watch(nameEN) as string | undefined;
  const frenchValue = form.watch(nameFR) as string | undefined;
  const FieldComponent = multiline ? Textarea : Input;

  return (
    <section className="rounded-xl border border-border bg-muted/20 p-4 space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-foreground">{label}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant={hasText(englishValue) ? 'default' : 'outline'}>
            EN {englishRequired ? 'required' : 'optional'}
          </Badge>
          <Badge variant={hasText(frenchValue) ? 'default' : 'outline'}>
            FR {frenchRequiredForPublish ? 'publish gate' : 'optional'}
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <FormField
          control={form.control}
          name={nameEN}
          render={({ field }) => (
            <FormItem>
              <FormLabel>English {englishRequired ? '*' : ''}</FormLabel>
              <FormControl>
                <FieldComponent
                  placeholder={placeholderEN}
                  className={multiline ? minHeightClassName || 'min-h-[120px] resize-y' : undefined}
                  maxLength={maxLength}
                  value={field.value}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {englishRequired ? 'Required before a draft can be submitted.' : 'Optional field.'}
                {maxLength ? ` ${field.value?.length || 0}/${maxLength} characters.` : ''}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={nameFR}
          render={({ field }) => (
            <FormItem>
              <FormLabel>French {frenchRequiredForPublish ? '*' : ''}</FormLabel>
              <FormControl>
                <FieldComponent
                  placeholder={placeholderFR}
                  className={multiline ? minHeightClassName || 'min-h-[120px] resize-y' : undefined}
                  maxLength={maxLength}
                  value={field.value}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {frenchRequiredForPublish
                  ? 'Required for publish readiness when this content exists in English.'
                  : 'Optional field.'}
                {maxLength ? ` ${field.value?.length || 0}/${maxLength} characters.` : ''}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </section>
  );
}

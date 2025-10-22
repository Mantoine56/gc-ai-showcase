import { useTranslation } from 'react-i18next';

/**
 * Hook to get the localized version of a bilingual field
 *
 * Usage:
 * const getField = useLocalizedField();
 * const projectName = getField(project, 'name');
 * // Returns project.nameEN or project.nameFR based on current language
 */
export function useLocalizedField() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return function<T extends Record<string, any>>(
    obj: T | null | undefined,
    fieldBaseName: string
  ): string {
    if (!obj) return '';

    const suffix = currentLang === 'fr' ? 'FR' : 'EN';
    const fieldName = `${fieldBaseName}${suffix}`;

    return obj[fieldName] || obj[`${fieldBaseName}EN`] || ''; // Fallback to EN
  };
}

/**
 * Hook to get both EN and FR versions of a field
 * Useful for forms where you need to edit both languages
 */
export function useBilingualField() {
  return function<T extends Record<string, any>>(
    obj: T | null | undefined,
    fieldBaseName: string
  ): { en: string; fr: string } {
    if (!obj) return { en: '', fr: '' };

    return {
      en: obj[`${fieldBaseName}EN`] || '',
      fr: obj[`${fieldBaseName}FR`] || '',
    };
  };
}

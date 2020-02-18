import {
  useTranslation as originalUseTranslation,
} from 'react-i18next'
import { TFunction, i18n } from 'i18next'

import { TranslateFunctions, createFunctions } from '../../utils/translate-functions.factory'

/**
 * Extends {@link TranslateFunctions}. Apart from that it also returns all the properties
 * defined below.
 *
 * @memberof useTranslation
 * @alias UseTranslationResponse
 *
 * @property {TranslateFunction} ... All functions defined in {@link TranslateFunctions}
 */
export type UseTranslationResponse = TranslateFunctions & {
  t: TFunction;
  /**
   * Current i18n instance.
   */
  i18n: i18n;
  /**
   * Indicates if translation system is ready. In AdminBro it is always ready :).
   */
  ready: boolean;
}

/**
 * Extends the useTranslation hook from react-i18next library.
 *
 * Returns all the {@link TranslateFunctions} + methods returned by the original
 * useTranslation method from react-i18next like: `i18n` instance and `ready` flag.
 *
 * @component
 * @subcategory Hooks
 */
export const useTranslation = (): UseTranslationResponse => {
  // eslint-disable-next-line no-shadow
  const { i18n, ...rest } = originalUseTranslation()
  const translateFunctions = createFunctions(i18n)

  return {
    ...rest,
    i18n,
    ...translateFunctions,
  }
}

export default useTranslation

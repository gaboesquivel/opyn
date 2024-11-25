import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsString,
} from 'nuqs/server'

export const searchParams = {
  category: parseAsArrayOf(parseAsString).withDefault([]),
  q: parseAsString.withDefault(''),
}
export const searchParamsCache = createSearchParamsCache(searchParams)

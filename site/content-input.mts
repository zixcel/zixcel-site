import assert from 'node:assert/strict'
import type { Link, Locale, Page, Resource, Section, SiteContent } from './types.ts'
export interface SiteData { siteId: string; origin: string; defaultLocale: Locale; locales: Record<Locale, SiteContent> }
function object(value: unknown): Record<string, unknown> {
  assert.ok(value !== null && typeof value === 'object' && !Array.isArray(value), 'content object required')
  return value as Record<string, unknown>
}
function text(value: unknown): string { assert.equal(typeof value, 'string', 'content string required'); return value as string }
function array<T>(value: unknown, decode: (value: unknown) => T): T[] {
  assert.ok(Array.isArray(value), 'content array required'); return value.map(decode)
}
function choice<const T extends string>(value: unknown, values: readonly T[]): T {
  for (const candidate of values) if (value === candidate) return candidate
  throw new Error('unsupported content enum')
}
function optional(value: unknown, name: string): Record<string, string> {
  return value === undefined ? {} : { [name]: text(value) }
}
function link(value: unknown): Link {
  const item = object(value)
  return { title: text(item.title), href: text(item.href), ...optional(item.summary, 'summary'), ...optional(item.icon, 'icon') }
}
function section(value: unknown): Section {
  const item = object(value)
  return { title: text(item.title), text: text(item.text), ...optional(item.code, 'code'),
    ...(item.links === undefined ? {} : { links: array(item.links, link) }) }
}
function page(value: unknown): Page {
  const item = object(value)
  return { path: text(item.path), title: text(item.title), summary: text(item.summary), sections: array(item.sections, section),
    kind: choice(item.kind, ['home', 'catalog', 'journal', 'article', 'page']), status: choice(item.status, ['draft', 'published']),
    ...optional(item.label, 'label'), ...optional(item.category, 'category') }
}
function resource(value: unknown): Resource {
  const item = object(value)
  return { ...link(item), category: text(item.category), ...optional(item.license, 'license') }
}
function content(value: unknown): SiteContent {
  const item = object(value)
  return { brand: text(item.brand), caption: text(item.caption), origin: text(item.origin),
    locale: choice(item.locale, ['ja', 'en']), accent: text(item.accent), icon: text(item.icon),
    navigation: array(item.navigation, link), pages: array(item.pages, page), resources: array(item.resources, resource),
    ...(item.secondaryAction === undefined ? {} : { secondaryAction: link(item.secondaryAction) }) }
}
export function decodeContent(value: unknown): SiteData {
  const item = object(value), locales = object(item.locales)
  return { siteId: text(item.siteId), origin: text(item.origin), defaultLocale: choice(item.defaultLocale, ['ja', 'en']),
    locales: { ja: content(locales.ja), en: content(locales.en) } }
}

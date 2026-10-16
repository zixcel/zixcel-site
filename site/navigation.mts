import assert from 'node:assert/strict'

type Link = { href: string }
type Page = { path: string; sections: { links?: Link[] }[] }
export type Content = { pages: Page[]; navigation: Link[]; resources: Link[] }

export function validateIntroduction(content: Content) {
  const pages = new Map(content.pages.map(page => [page.path, page]))
  const links = (page: Page) => page.sections.flatMap(section => section.links ?? [])
  const reached = new Set<string>()
  const pending = ['/', ...content.navigation.map(link => link.href)]
  while (pending.length) {
    const path = pending.pop()!
    if (path === '/sitemap' || reached.has(path)) continue
    const page = pages.get(path)
    if (!page) continue
    reached.add(path)
    pending.push(...links(page).map(link => link.href))
  }
  const path = '/docs/getting-started'
  assert.ok(reached.has(path), 'introduction is unreachable without the sitemap')
  const guide = pages.get(path)!
  const destinations = new Set(content.resources.flatMap(resource => [
    resource.href, `${resource.href.replace(/\/$/, '')}/blob/main/README.md`
  ]))
  assert.ok(links(guide).some(link => destinations.has(link.href)),
    'introduction needs a concrete repository destination')
  for (const section of guide.sections) {
    const hrefs = (section.links ?? []).map(link => link.href)
    assert.equal(new Set(hrefs).size, hrefs.length, 'duplicate introduction destination')
  }
}

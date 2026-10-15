import sitePages from './site/module'
import siteBranding from './branding'
import { organizationSite } from '@nuxtjp/localized-site/organization'

const shared = organizationSite(import.meta.url, process.env.SITE_ID, process.env.SITE_ID === 'zixcel' ? { theme: 'zixcel', scope: 'organization' } : undefined)

export default defineNuxtConfig({ ...shared, modules: [...shared.modules, siteBranding, sitePages] })

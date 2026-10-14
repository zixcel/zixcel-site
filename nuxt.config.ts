import { organizationSite } from '@nuxtjp/localized-site/organization'

export default defineNuxtConfig(organizationSite(import.meta.url, process.env.SITE_ID, process.env.SITE_ID === 'zixcel' ? { theme: 'zixcel', scope: 'organization' } : undefined))

import { organizationSite } from '@nuxtjp/localized-site/organization'

export default defineNuxtConfig(organizationSite(import.meta.url))

import contactConfig from './contact-form.config.json'
import consentConfig from './consent.config.json'
import type { ModuleOptions as ContactOptions } from '@nuxtjp/contact-form'
import sitePages from './site/module'
import siteBranding from './branding'
import { organizationSite } from '@nuxtjp/localized-site/organization'

const shared = organizationSite(import.meta.url, process.env.SITE_ID, process.env.SITE_ID === 'zixcel' ? { theme: 'zixcel', scope: 'organization' } : undefined)

const enableContact = !process.env.SITE_ID || process.env.SITE_ID === 'zixcel'
export default defineNuxtConfig({ ...shared, contactForm: enableContact ? contactConfig as ContactOptions : undefined, modules: [...(enableContact ? [['@nuxtjp/localized-site/consent', { ...consentConfig, defaultLocale: 'en' }] as [string, Record<string, unknown>], '@nuxtjp/contact-form'] : []),...shared.modules, siteBranding, sitePages] })

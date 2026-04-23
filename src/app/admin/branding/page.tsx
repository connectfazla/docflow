import { getSettings } from '@/lib/settings'
import { BrandingForm } from './client'

export default async function BrandingPage() {
  const s = await getSettings(['branding.companyName', 'branding.supportEmail'])
  return <BrandingForm initial={{
    'branding.companyName': s['branding.companyName'] || 'DocFlow Pro',
    'branding.supportEmail': s['branding.supportEmail'] || 'support@docflow.pro',
  }} />
}

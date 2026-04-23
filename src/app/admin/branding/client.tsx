'use client'
import { SettingForm } from '@/components/admin/setting-form'

export function BrandingForm({ initial }: { initial: Record<string, string> }) {
  return (
    <SettingForm
      title="Branding"
      description="Shown across the app, signed PDFs, and email notifications."
      fields={[
        { key: 'branding.companyName',  label: 'Company name', placeholder: 'DocFlow Pro' },
        { key: 'branding.supportEmail', label: 'Support email', type: 'email', placeholder: 'support@docflow.pro' },
      ]}
      initialValues={initial}
    />
  )
}

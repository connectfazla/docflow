import { AppLayout } from '@/components/layout/sidebar'
export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>
}

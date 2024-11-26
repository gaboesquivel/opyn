import dynamic from 'next/dynamic'

const DynamicMobileMenu = dynamic(
  () => import('@/components/layout/mobile/menu').then((mod) => mod.MobileMenu),
  {
    ssr: false,
    loading: () => null,
  },
)

export function Footer() {
  return (
    <footer className="flex w-full whitespace-nowrap bg-background h-20 sm:h-10  pt-1 self-end sm:p-0 sm:m-0 sm:fixed sm:bottom-0">
      <DynamicMobileMenu />
    </footer>
  )
}

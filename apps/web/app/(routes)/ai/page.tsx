import dynamic from 'next/dynamic'
export default async function AiPage() {
  return <OpynAi />
}

const OpynAi = dynamic(
  () => import('@/components/opyn-ai').then((mod) => mod.OpynAi),
  { ssr: false },
)

import dynamic from 'next/dynamic'

export default async function AiPage() {
  // return <OpynAi />
  return <div>AI</div>
}

// const OpynAi = dynamic(() => import('@opyn/ai').then((mod) => mod.OpynAi), {
//   ssr: false,
// })

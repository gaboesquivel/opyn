import { HomeComp } from '@/components/routes/home/home-comp'
import { Suspense } from 'react'

export default function GlassPage() {
  return (
    <div>
      <h1>Glass</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <HomeComp />
      </Suspense>
    </div>
  )
}

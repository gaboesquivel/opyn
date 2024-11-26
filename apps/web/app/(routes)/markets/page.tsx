import Image from 'next/image'

export default async function MarketsPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4 mb-[150px]">
        <Image
          src="/images/soon.png"
          alt="Coming Soon"
          width={200}
          height={200}
          priority
        />
      </div>
    </div>
  )
}

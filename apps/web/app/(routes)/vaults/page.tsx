import Image from 'next/image'
export default async function VaultsPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4 mb-[150px]">
        <Image
          className=""
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

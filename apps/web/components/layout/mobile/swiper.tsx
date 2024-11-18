'use client'

import type { ReactNode } from 'react'
import { EffectCoverflow, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

interface MobileSwiperProps {
  slides: ReactNode[]
}

export function MobileSwiper({ slides }: MobileSwiperProps) {
  return (
    <div className="w-full flex flex-col flex-grow max-h-full">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination]}
        className="w-full max-h-full flex-grow swiper-custom-pagination swiper-reduced-padding"
        noSwiping={true}
        noSwipingClass="swiper-no-swiping"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={`slide-${
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              index
            }`}
            className="items-center justify-center flex-grow h-full max-h-full pb-10 overflow-y-"
          >
            <div className="w-full h-full max-h-[calc(100dvh-300px)] flex  overflow-y-auto">
              {slide}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

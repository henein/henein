import { Button } from '@/components';
import { useProcessSlider } from '@/hooks/useProcessSlider';
import Image from 'next/image';
import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const NexonApiProcessModal = ({ onClose }: { onClose: () => void }) => {
  const { infoText, handleSlideChange } = useProcessSlider();

  return (
    <div className="flex h-[553px] w-[800px] flex-col bg-white shadow-md">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Keyboard, Pagination, Navigation]}
        className="border-grey-700a h-[480px] w-full rounded-t-2xl border border-b-0 bg-white"
        onSlideChange={handleSlideChange}
      >
        {Array.from({ length: 6 }, (_, index) => (
          <SwiperSlide key={index}>
            <Image
              src={`/images/process/${index + 1}.png`}
              alt=""
              width={800}
              height={480}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="border-grey-700a bg-grey-900 flex items-center justify-between rounded-b-2xl border p-4">
        <div className="text-sm">{infoText}</div>
        <Button sort="secondary" onClick={onClose}>
          닫기
        </Button>
      </div>
    </div>
  );
};

export default NexonApiProcessModal;

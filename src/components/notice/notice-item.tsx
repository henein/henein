import Image from 'next/image';

const NoticeItem = ({ text }: { text: string }) => {
  return (
    <div inert className="flex items-center justify-center gap-1">
      <div className="flex h-6 w-6 items-center justify-center">
        <Image
          src={'/images/campaign.svg'}
          alt="campaign-icon"
          width={20}
          height={12}
        />
      </div>
      <span className="text-sm font-normal text-gray-800 dark:text-gray-200">
        {text}
      </span>
    </div>
  );
};

export default NoticeItem;

'use client';

import { PlatformIcon } from './platform-icon';
import { StreamerImage } from './streamer-image';
import { StreamerId, Streamers } from '@/constants';
import classNames from 'classnames';

export interface StreamerProfileProps {
  streamerId?: StreamerId;
  className?: string;
  size?: number;
  isLive?: boolean;
}

export const StreamerProfile = (props: StreamerProfileProps) => {
  const streamer =
    Streamers.find((streamer) => streamer.id === props.streamerId) ??
    Streamers[0];

  return (
    <div className={classNames('flex flex-col items-center', props.className)}>
      <div className="relative">
        <div className="bg-black-700 dark:bg-black-800 text-white-900 absolute z-10 flex h-full w-full items-center justify-center gap-2 rounded-full opacity-0 transition-opacity hover:opacity-100">
          {streamer.links.map((platformLink) => (
            <a
              key={platformLink.platform}
              href={platformLink.link}
              target="_blank"
              rel="noreferrer"
            >
              <PlatformIcon platform={platformLink.platform} />
            </a>
          ))}
        </div>
        {props.isLive && (
          <div className="bg-danger-600 text-white-900 absolute left-2 top-2 z-20 rounded-full px-1.5 text-[0.6rem]">
            LIVE
          </div>
        )}
        <StreamerImage className="border-default border" streamer={streamer} />
      </div>
      <p className="mt-1">{streamer.nickname}</p>
    </div>
  );
};

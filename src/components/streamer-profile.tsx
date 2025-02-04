'use client'

import { StreamerId, Streamers } from '@/constants';
import { PlatformIcon } from './platform-icon';
import { StreamerImage } from './streamer-image';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

export interface StreamerProfileProps {
  streamerId: StreamerId;
  className?: string;
  size?: number;
}

export const StreamerProfile = (props: StreamerProfileProps) => {
  const [isOnAir, setIsOnAir] = useState(false);

  const streamer =
    Streamers.find((streamer) => streamer.id === props.streamerId) ??
    Streamers[0];

  useEffect(() => {
    (async () => {
      const chzzkLink = streamer.links.find(
        (link) => link.platform === 'chzzk',
      )?.link;
      const soopLink = streamer.links.find(
        (link) => link.platform === 'soop',
      )?.link;

      if (chzzkLink) {
        const chzzkId = chzzkLink.replace('https://chzzk.naver.com/', '');

        const res = await fetch(`/api/mamudae?chzzkId=${chzzkId}`);

        setIsOnAir((await res.json()).isOnAir);
      } else if (soopLink) {
        const soopId = soopLink.replace('https://ch.sooplive.co.kr/', '');

        const res = await fetch(`/api/mamudae?soopId=${soopId}`);

        setIsOnAir((await res.json()).isOnAir);
      }
    })();
  });

  return (
    <div className={classNames('flex flex-col items-center', props.className)}>
      <div className="relative">
        <div className="absolute z-10 flex h-full w-full items-center justify-center gap-2 rounded-full bg-black-800 opacity-0 transition-opacity hover:opacity-100">
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
        {isOnAir && (
          <div className="absolute top-2 left-2 z-20 rounded-full bg-danger-600 px-1.5 text-[0.6rem]">
            LIVE
          </div>
        )}
        <StreamerImage
          className="border border-border dark:border-dark-border"
          streamer={streamer}
        />
      </div>
      <p className="mt-1">{streamer.nickname}</p>
    </div>
  );
};

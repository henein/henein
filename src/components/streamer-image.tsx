import { Streamer, StreamerId } from '@/constants';
import classNames from 'classnames';
import Image from 'next/image';

export interface StreamerImageProps {
  streamer: Streamer;
  className?: string;
  size?: number;
}

export const StreamerImage = (props: StreamerImageProps) => {
  return (
    <Image
      className={classNames('rounded-full', props.className)}
      src={
        props.streamer?.id != StreamerId.NULL
          ? `/images/mamudae/profile/${props.streamer.id}.png`
          : '/images/mamudae/profile/null.png'
      }
      alt={props.streamer.nickname}
      width={props.size || 160}
      height={props.size || 160}
    />
  );
};

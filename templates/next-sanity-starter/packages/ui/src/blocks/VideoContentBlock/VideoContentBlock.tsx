import type { VideoContentBlock as VideoContentBlockProps } from '@site-foundry-template/sanity-types';
import { BaseBlock } from '../../components/BaseBlock';
import { Image } from '../../primitives/Image';
import { ImageFit, ImageRadius } from '../../primitives/Image/image-types';
import { Stack } from '../../primitives/Stack';
import { StackAlign, StackGap } from '../../primitives/Stack/stack-types';
import { Text } from '../../primitives/Text';
import { TextColor, TextSize } from '../../primitives/Text/text-types';

export function VideoContentBlock(props: VideoContentBlockProps) {
  const posterUrl = props.poster?.asset?.url ?? undefined;
  const videoUrl = props.videoUrl ?? undefined;

  return (
    <BaseBlock block={props}>
      <Stack gap={StackGap.LG} align={StackAlign.CENTER}>
        <div className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden">
          {videoUrl ? (
            <video
              className="w-full h-auto block"
              controls
              preload="metadata"
              poster={posterUrl}
              playsInline
            >
              <source src={videoUrl} />
              Your browser does not support inline video playback.
            </video>
          ) : props.poster?.asset?.url ? (
            <div className="relative">
              <Image
                source={props.poster}
                fit={ImageFit.COVER}
                rounded={ImageRadius.NONE}
                className="w-full h-auto block"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-black ml-1"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        {props.caption ? (
          <Text size={TextSize.SM} color={TextColor.MUTED} className="max-w-2xl text-center">
            {props.caption}
          </Text>
        ) : null}
      </Stack>
    </BaseBlock>
  );
}

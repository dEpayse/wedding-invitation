/**
 * 로컬 비디오 파일을 재생하는 컴포넌트
 *
 * @param props - 컴포넌트 props
 * @param props.src - 비디오 파일 경로
 * @param props.autoPlay - 자동 재생 여부
 * @param props.muted - 음소거 여부
 * @param props.loop - 반복 재생 여부
 * @param props.controls - 컨트롤 표시 여부
 * @returns HTML5 video 엘리먼트
 *
 * @example
 * ```tsx
 * <VideoPlayer
 *   src="/videos/spitz-swiss-village.mp4"
 *   muted={true}
 *   controls={true}
 * />
 * ```
 */
export default function VideoPlayer({
  src,
  width = "100%",
  height = "auto",
  autoPlay = false,
  muted = true,
  loop = false,
  controls = true,
}: VideoPlayerProps) {
  return (
    <div style={{ textAlign: "center" }}>
      <video
        width={width}
        height={height}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        style={{ maxWidth: "100%", 
    display: 'block' }}
      >
        <source src={src} type="video/mp4" />
        <source src={src.replace(".mp4", ".webm")} type="video/webm" />
        브라우저가 비디오를 지원하지 않습니다.
      </video>
    </div>
  );
}
interface VideoPlayerProps {
  /** 비디오 파일 경로 */
  src: string;
  /** 너비 (기본값: 100%) */
  width?: string;
  /** 높이 (기본값: auto) */
  height?: string;
  /** 자동 재생 여부 (기본값: false) */
  autoPlay?: boolean;
  /** 음소거 여부 (기본값: true) */
  muted?: boolean;
  /** 반복 재생 여부 (기본값: false) */
  loop?: boolean;
  /** 컨트롤 표시 여부 (기본값: true) */
  controls?: boolean;
}

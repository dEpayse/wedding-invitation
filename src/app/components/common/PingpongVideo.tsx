"use client";
import { useRef, useState, useEffect } from "react";

interface LoopVideoProps {
  /** 비디오 파일 경로 */
  src: string;
  /** 너비 (기본값: 100%) */
  width?: string;
  /** 높이 (기본값: auto) */
  height?: string;
  /** 자동 재생 여부 (기본값: true) */
  autoPlay?: boolean;  // ← 이거 추가!
  /** 음소거 여부 (기본값: true) */
  muted?: boolean;
  /** 컨트롤 표시 여부 (기본값: false) */
  controls?: boolean;
}

/**
 * 자동으로 반복 재생되는 비디오 컴포넌트
 * 
 * 가장 안정적이고 모든 브라우저에서 동작하는 방식입니다.
 * 
 * @param props - 컴포넌트 props
 * @returns 자동 반복 재생 비디오
 * 
 * @example
 * ```tsx
 * <LoopVideo 
 *   src="/videos/video_spiez.mp4" 
 *   muted={true}
 * />
 * ```
 */
export default function LoopVideo({ 
  src,
  width = "100%",
  height = "auto",
  muted = true,
  controls = false
}: LoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPlayButton, setShowPlayButton] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = async () => {
      try {
        await video.play();
        setShowPlayButton(false);
      } catch (error) {
        console.error('자동 재생 실패, 플레이 버튼 표시', error);
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    return () => video.removeEventListener('canplay', handleCanPlay);
  }, []);

  const handlePlayClick = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
      setShowPlayButton(false);
    } catch (error) {
      console.error('재생 실패', error);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <video
        ref={videoRef}
        width={width}
        height={height}
        autoPlay        // 자동재생 시도
        muted={muted}   // 음소거 (자동재생을 위해 필수)
        loop            // 무한 반복 (이게 핵심!)
        playsInline     // iOS에서 전체화면 방지
        controls={controls}
        style={{ 
          maxWidth: '100%',
          display: 'block',
          margin: '0 auto'
        }}
      >
        <source src={src} type="video/mp4" />
        <source src={src.replace('.mp4', '.webm')} type="video/webm" />
        브라우저가 비디오를 지원하지 않습니다.
      </video>
      
      {showPlayButton && (
        <div 
          onClick={handlePlayClick}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '50px',
            cursor: 'pointer',
            fontSize: '24px'
          }}
        >
          ▶
        </div>
      )}
    </div>
  );
}
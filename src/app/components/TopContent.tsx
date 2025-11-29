"use client";

import Image from "next/image";
import styles from "./TopContent.module.css";
import {brideFirstName, brideFirstNameEn, groomFirstName, groomFirstNameEn} from "@/app/constants/name";

interface TopContentProps {
  onAnimationComplete?: () => void;
}

export default function TopContent({ onAnimationComplete }: TopContentProps) {
  const handleAnimationEnd = () => {
    if (onAnimationComplete) {
      onAnimationComplete();
    }
  };

  return (
    <div className={styles.topContent}>
      {/* 꽃잎 떨어지는 효과 */}
      <div className={styles.petalsContainer}>
        {[...Array(20)].map((_, i) => {
          const rotation = Math.random() * 360; // 초기 회전
          const direction = Math.random() > 0.5 ? 1 : -1; // 좌우 방향
          const isFloating = i % 4 === 0; // 4개 중 1개는 수평 이동
          const animationName = isFloating ? styles.float : styles.fall;

          return (
            <div
              key={i}
              className={`${styles.petal} ${animationName}`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 8}s`, // 6~14초로 다양하게
                transform: `rotate(${rotation}deg)`,
                '--direction': direction,
                '--initial-rotation': `${rotation}deg`,
              } as React.CSSProperties & { '--direction': number; '--initial-rotation': string }}
            />
          );
        })}
      </div>

      <div className={styles.imageWrapper}>
        <Image
          src="/cover_image.png"
          alt={`${groomFirstName}과 ${brideFirstName}의 결혼식`}
          layout="responsive"
          width={0}
          height={300}
          priority
        />

          {/* 손글씨 애니메이션 제목 */}
          <div className={styles.title}>
            {/* We are */}
            <div className={styles.line}>
              <svg viewBox="0 0 200 60" className={styles.lineSvg}>
                <text x="50%" y="45" textAnchor="middle">
                  <tspan className={styles.char1}>W</tspan>
                  <tspan className={styles.char2}>e</tspan>
                  <tspan className={styles.char3}> </tspan>
                  <tspan className={styles.char4}>a</tspan>
                  <tspan className={styles.char5}>r</tspan>
                  <tspan className={styles.char6}>e</tspan>
                </text>
              </svg>
            </div>

            {/* getting */}
            <div className={styles.line}>
              <svg viewBox="0 0 200 60" className={styles.lineSvg}>
                <text x="50%" y="45" textAnchor="middle">
                  <tspan className={styles.char7}>g</tspan>
                  <tspan className={styles.char8}>e</tspan>
                  <tspan className={styles.char9}>t</tspan>
                  <tspan className={styles.char10}>t</tspan>
                  <tspan className={styles.char11}>i</tspan>
                  <tspan className={styles.char12}>n</tspan>
                  <tspan className={styles.char13}>g</tspan>
                </text>
              </svg>
            </div>

            {/* married */}
            <div className={styles.line}>
              <svg viewBox="0 0 200 60" className={styles.lineSvg}>
                <text x="50%" y="45" textAnchor="middle">
                  <tspan className={styles.char14}>m</tspan>
                  <tspan className={styles.char15}>a</tspan>
                  <tspan className={styles.char16}>r</tspan>
                  <tspan className={styles.char17}>r</tspan>
                  <tspan className={styles.char18}>i</tspan>
                  <tspan className={styles.char19}>e</tspan>
                  <tspan className={styles.char20} onAnimationEnd={handleAnimationEnd}>d</tspan>
                </text>
              </svg>
            </div>
          </div>
          <div className={styles.textOverlay}>
            <p className={styles.names}>{brideFirstNameEn} AND {groomFirstNameEn}</p>
          </div>
      </div>
    </div>
  );
}

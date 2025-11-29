"use client";

import React, { useState, useEffect } from 'react';
import styles from './Container.module.css';

export default function Container({ children }: { children: React.ReactNode }) {
  const [showOverlay, setShowOverlay] = useState(true);
  const [isScrollLocked, setIsScrollLocked] = useState(true);

  useEffect(() => {
    // 전체 페이지 스크롤 잠금 (모달처럼)
    if (isScrollLocked) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = '0';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isScrollLocked]);

  const handleAnimationComplete = () => {
    // 애니메이션 완료 후 오버레이 페이드아웃
    setShowOverlay(false);
    // 스크롤 활성화
    setTimeout(() => {
      setIsScrollLocked(false);
    }, 500); // 오버레이 fade out 시간과 맞춤
  };

  return (
    <div className={`${styles.container} ${isScrollLocked ? styles.noScroll : ''}`}>
      {showOverlay && (
        <div
          className={`${styles.overlay} ${!showOverlay ? styles.overlayHidden : ''}`}
        />
      )}
      {React.Children.map(children, (child, index) => {
        // TopContent에만 onAnimationComplete prop 전달
        if (index === 0 && React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            onAnimationComplete: handleAnimationComplete,
          });
        }
        return child;
      })}
    </div>
  );
}
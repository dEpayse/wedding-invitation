'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './ImageModal.module.css';

interface ImageModalProps {
    images: { src: string; alt: string }[];
    initialIndex: number;
    onClose: () => void;
    showNavigation?: boolean; // 화살표와 페이지 인디케이터 표시 여부
}

export default function ImageModal({ images, initialIndex, onClose, showNavigation = true }: ImageModalProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [mounted, setMounted] = useState(false);

    // 클라이언트 사이드에서만 렌더링
    useEffect(() => {
        setMounted(true);
    }, []);

    // 이전 이미지로 이동
    const goToPrevious = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }, [images.length]);

    // 다음 이미지로 이동
    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, [images.length]);

    // 키보드 이벤트 처리
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowLeft') {
                goToPrevious();
            } else if (e.key === 'ArrowRight') {
                goToNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, goToPrevious, goToNext]);

    // body와 Container 스크롤 방지 및 스크롤 위치 복원
    useEffect(() => {
        // 현재 스크롤 위치 저장
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;

        // body 스크롤 방지
        const originalBodyOverflow = document.body.style.overflow;
        const originalBodyPosition = document.body.style.position;
        const originalBodyTop = document.body.style.top;
        const originalBodyWidth = document.body.style.width;

        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';

        // Container 스크롤 방지 (Container는 overflow-y: auto를 가지고 있음)
        const container = document.querySelector('[class*="Container_container"]') as HTMLElement;
        const originalContainerOverflow = container?.style.overflow;
        if (container) {
            container.style.overflow = 'hidden';
        }

        return () => {
            // body 스타일 복원
            document.body.style.overflow = originalBodyOverflow;
            document.body.style.position = originalBodyPosition;
            document.body.style.top = originalBodyTop;
            document.body.style.width = originalBodyWidth;

            // 스크롤 위치 복원
            window.scrollTo(scrollX, scrollY);

            // Container 스타일 복원
            if (container && originalContainerOverflow !== undefined) {
                container.style.overflow = originalContainerOverflow;
            }
        };
    }, []);

    // 터치 시작
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    // 터치 이동
    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    // 터치 종료 (스와이프 감지)
    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const minSwipeDistance = 30;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            goToNext();
        } else if (isRightSwipe) {
            goToPrevious();
        }

        setTouchStart(0);
        setTouchEnd(0);
    };

    // 클라이언트에서만 렌더링
    if (!mounted) return null;

    const modalContent = (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* X 닫기 버튼 */}
                <button
                    className={styles.closeButton}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                {/* 이미지 컨테이너 */}
                <div className={styles.imageContainer}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={images[currentIndex].src}
                        alt={images[currentIndex].alt}
                        className={styles.image}
                    />
                </div>

                {/* 좌측 화살표 */}
                {showNavigation && (
                    <button
                        className={`${styles.navButton} ${styles.navButtonLeft}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            goToPrevious();
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                )}

                {/* 우측 화살표 */}
                {showNavigation && (
                    <button
                        className={`${styles.navButton} ${styles.navButtonRight}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            goToNext();
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                )}

                {/* 페이지 인디케이터 */}
                {showNavigation && (
                    <div className={styles.pageIndicator}>
                        {currentIndex + 1} / {images.length}
                    </div>
                )}
            </div>
        </div>
    );

    // Portal을 사용하여 body에 직접 렌더링
    return createPortal(modalContent, document.body);
}

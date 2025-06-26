'use client';

import React from 'react';
import Slider from 'react-slick';
import styles from './Gallery.module.css';
import VerticalSpacer from "@/app/components/common/VerticalSpacer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 🎯 커스텀 다음 버튼
function CustomNextArrow({ onClick }: { onClick?: () => void }) {
    return (
        <button className={styles.customNextArrow} onClick={onClick}>
            <span>→</span>
        </button>
    );
}

// 🎯 커스텀 이전 버튼  
function CustomPrevArrow({ onClick }: { onClick?: () => void }) {
    return (
        <button className={styles.customPrevArrow} onClick={onClick}>
            <span>←</span>
        </button>
    );
}

// 🎯 커스텀 인디케이터
function CustomDots({ dots }: { dots?: React.ReactNode }) {
    return (
        <div className={styles.customDots}>
            <ul>{dots}</ul>
        </div>
    );
}

export default function Gallery() {
    // 테스트용 이미지 데이터 (나중에 실제 이미지로 교체)
    const galleryImages = [
        { src: 'https://via.placeholder.com/400x300/ff6b6b/ffffff?text=Image+1', alt: '갤러리 이미지 1' },
        { src: 'https://via.placeholder.com/400x300/4ecdc4/ffffff?text=Image+2', alt: '갤러리 이미지 2' },
        { src: 'https://via.placeholder.com/400x300/45b7d1/ffffff?text=Image+3', alt: '갤러리 이미지 3' },
        { src: 'https://via.placeholder.com/400x300/96ceb4/ffffff?text=Image+4', alt: '갤러리 이미지 4' },
        { src: 'https://via.placeholder.com/400x300/ffeaa7/000000?text=Image+5', alt: '갤러리 이미지 5' },
    ];

    const settings = {
        dots: true,                    // 인디케이터 표시
        infinite: true,                // 무한 루프
        speed: 500,                    // 애니메이션 속도
        slidesToShow: 1,               // 한 번에 보여줄 슬라이드 수
        slidesToScroll: 1,             // 한 번에 스크롤할 슬라이드 수
        autoplay: false,               // 자동재생 비활성화
        
        // 🎨 커스텀 화살표
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        
        // 🎨 커스텀 인디케이터
        appendDots: (dots: React.ReactNode) => <CustomDots dots={dots} />,
        customPaging: (i: number) => (
            <button className={styles.customDot}>
                <span className={styles.dotNumber}>{i + 1}</span>
            </button>
        ),
        
        // 📱 반응형 설정
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div>
            <VerticalSpacer size={80}/>
            <p className={styles.galleryTitle}>Gallery</p>
            <VerticalSpacer size={32}/>
            <p className={styles.galleryGuide}>사진을 클릭하시면 전체 화면 보기가 가능합니다</p>
            <VerticalSpacer size={40}/>
            
            {/* 🎠 React Slick 캐러셀 */}
            <div className={styles.carouselContainer}>
                <Slider {...settings}>
                    {galleryImages.map((image, index) => (
                        <div key={index} className={styles.slide}>
                            <div className={styles.imageWrapper}>
                                <img 
                                    src={image.src} 
                                    alt={image.alt}
                                    className={styles.galleryImage}
                                    onClick={() => console.log(`이미지 ${index + 1} 클릭됨`)}
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            
            <VerticalSpacer size={80}/>
        </div>
    );
}
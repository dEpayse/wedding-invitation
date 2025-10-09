'use client';

import React from 'react';
import Slider from 'react-slick';
import styles from './Gallery.module.css';
import VerticalSpacer from "@/app/components/common/VerticalSpacer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
        { src: '/gallery/gallery_01.jpg', alt: '갤러리 이미지 1' },
        { src: '/gallery/gallery_02.jpg', alt: '갤러리 이미지 2' },
        { src: '/gallery/gallery_03.jpg', alt: '갤러리 이미지 3' },
        { src: '/gallery/gallery_04.jpg', alt: '갤러리 이미지 4' },
        { src: '/gallery/gallery_05.jpg', alt: '갤러리 이미지 5' },
        { src: '/gallery/gallery_06.jpg', alt: '갤러리 이미지 6' },
    ];

    const settings = {
        dots: true,                    // 인디케이터 표시
        infinite: true,                // 무한 루프
        speed: 500,                    // 애니메이션 속도
        slidesToShow: 1,               // 한 번에 보여줄 슬라이드 수
        slidesToScroll: 1,             // 한 번에 스크롤할 슬라이드 수
        autoplay: false,               // 자동재생 비활성화
        arrows: false,                 // 기본적으로 화살표 숨김 (웹용)

        // 🎨 커스텀 인디케이터
        appendDots: (dots: React.ReactNode) => <CustomDots dots={dots} />,
        customPaging: () => (
            <button className={styles.customDot}>
                {/* 숫자 제거하고 심플한 닷으로 */}
            </button>
        ),
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
                                {/* eslint-disable-next-line @next/next/no-img-element */}
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
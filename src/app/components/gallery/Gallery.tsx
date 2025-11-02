'use client';

import React from 'react';
import styles from './Gallery.module.css';
import VerticalSpacer from "@/app/components/common/VerticalSpacer";

export default function Gallery() {
    // 갤러리 이미지 데이터 (12개)
    const galleryImages = [
        { src: '/gallery/gallery_01.jpg', alt: '갤러리 이미지 1' },
        { src: '/gallery/gallery_02.jpg', alt: '갤러리 이미지 2' },
        { src: '/gallery/gallery_03.jpg', alt: '갤러리 이미지 3' },
        { src: '/gallery/gallery_04.jpg', alt: '갤러리 이미지 4' },
        { src: '/gallery/gallery_05.jpg', alt: '갤러리 이미지 5' },
        { src: '/gallery/gallery_06.jpg', alt: '갤러리 이미지 6' },
        { src: '/gallery/gallery_01.jpg', alt: '갤러리 이미지 7' },
        { src: '/gallery/gallery_02.jpg', alt: '갤러리 이미지 8' },
        { src: '/gallery/gallery_03.jpg', alt: '갤러리 이미지 9' },
        { src: '/gallery/gallery_04.jpg', alt: '갤러리 이미지 10' },
        { src: '/gallery/gallery_05.jpg', alt: '갤러리 이미지 11' },
        { src: '/gallery/gallery_06.jpg', alt: '갤러리 이미지 12' },
    ];

    return (
        <div className={styles.container}>
            <VerticalSpacer size={80}/>
            <p className={styles.galleryTitle}>Gallery</p>
            <VerticalSpacer size={32}/>
            <p className={styles.galleryGuide}>사진을 클릭하시면 전체 화면 보기가 가능합니다</p>
            <VerticalSpacer size={40}/>

            {/* 3x3 그리드 갤러리 */}
            <div className={styles.gridContainer}>
                {galleryImages.map((image, index) => (
                    <div key={index} className={styles.gridItem}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={image.src}
                            alt={image.alt}
                            className={styles.gridImage}
                            onClick={() => console.log(`이미지 ${index + 1} 클릭됨`)}
                        />
                    </div>
                ))}
            </div>

            <VerticalSpacer size={80}/>
        </div>
    );
}

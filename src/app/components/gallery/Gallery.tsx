"use client";

import React, { useState } from "react";
import styles from "./Gallery.module.css";
import VerticalSpacer from "@/app/components/common/VerticalSpacer";
import ImageModal from "./ImageModal";
import FadeInChildren from "../common/FadeInChildren";

export default function Gallery() {
  const [showAll, setShowAll] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  // 갤러리 이미지 데이터 (24개)
  const galleryImages = [
    { src: "/gallery/gallery_01.png", alt: "갤러리 이미지 1" },
    { src: "/gallery/gallery_02.png", alt: "갤러리 이미지 2" },
    { src: "/gallery/gallery_03.png", alt: "갤러리 이미지 3" },
    { src: "/gallery/gallery_04.png", alt: "갤러리 이미지 4" },
    { src: "/gallery/gallery_05.png", alt: "갤러리 이미지 5" },
    { src: "/gallery/gallery_06.png", alt: "갤러리 이미지 6" },
    { src: "/gallery/gallery_07.png", alt: "갤러리 이미지 7" },
    { src: "/gallery/gallery_08.png", alt: "갤러리 이미지 8" },
    { src: "/gallery/gallery_09.png", alt: "갤러리 이미지 9" },
    { src: "/gallery/gallery_10.png", alt: "갤러리 이미지 10" },
    { src: "/gallery/gallery_11.png", alt: "갤러리 이미지 11" },
    { src: "/gallery/gallery_12.png", alt: "갤러리 이미지 12" },
    { src: "/gallery/gallery_13.png", alt: "갤러리 이미지 13" },
    { src: "/gallery/gallery_14.png", alt: "갤러리 이미지 14" },
    { src: "/gallery/gallery_15.png", alt: "갤러리 이미지 15" },
    { src: "/gallery/gallery_16.png", alt: "갤러리 이미지 16" },
    { src: "/gallery/gallery_17.png", alt: "갤러리 이미지 17" },
    { src: "/gallery/gallery_18.png", alt: "갤러리 이미지 18" },
    { src: "/gallery/gallery_19.png", alt: "갤러리 이미지 19" },
    { src: "/gallery/gallery_20.png", alt: "갤러리 이미지 20" },
    { src: "/gallery/gallery_21.png", alt: "갤러리 이미지 21" },
    { src: "/gallery/gallery_22.png", alt: "갤러리 이미지 22" },
    { src: "/gallery/gallery_23.png", alt: "갤러리 이미지 23" },
    { src: "/gallery/gallery_24.png", alt: "갤러리 이미지 24" },
  ];

  // 보여줄 이미지: showAll이 false면 9개만, true면 전체
  const displayedImages = showAll ? galleryImages : galleryImages.slice(0, 9);

  return (
    <div className={styles.container}>
      <VerticalSpacer size={80} />
      <FadeInChildren staggerDelay={100}>
        <p className={styles.galleryTitle}>Gallery</p>
        <VerticalSpacer size={32} />
        <p className={styles.galleryGuide}>
          사진을 클릭하시면 전체 화면 보기가 가능합니다
        </p>
      </FadeInChildren>
      <VerticalSpacer size={40} />

      {/* 3x3 (또는 확장된) 그리드 갤러리 */}
      <div className={styles.gridContainer}>
        {displayedImages.map((image, index) => (
          <div key={index} className={styles.gridItem}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              className={styles.gridImage}
              onClick={() => setSelectedImageIndex(index)}
            />
          </div>
        ))}
      </div>

      {/* 더보기 버튼 */}
      {!showAll && (
        <>
          <VerticalSpacer size={32} />
          <div className={styles.moreButtonContainer}>
            <button
              className={styles.moreButton}
              onClick={() => setShowAll(true)}
            >
              더보기
            </button>
          </div>
        </>
      )}

      <VerticalSpacer size={80} />

      {/* 이미지 모달 */}
      {selectedImageIndex !== null && (
        <ImageModal
          images={galleryImages}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </div>
  );
}

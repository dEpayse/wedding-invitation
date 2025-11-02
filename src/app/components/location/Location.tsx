"use client";

import styles from "./Location.module.css";
import VerticalSpacer from "@/app/components/common/VerticalSpacer";
import React, { useState } from "react";
import NaverMap from "@/app/components/map/NaverMap";
import {
  WEDDING_LOCATION,
  WEDDING_VENUE_INFO,
  MAP_CONFIG,
} from "@/app/constants/wedding";

export default function Location() {
  const [copyMessage, setCopyMessage] = useState("");

  // 모바일 디바이스 체크
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  // 전화 걸기
  const handleCall = () => {
    if (isMobile()) {
      window.location.href = `tel:${WEDDING_VENUE_INFO.phone}`;
    } else {
      alert("전화 연결은 모바일에서만 가능합니다.");
    }
  };

  // 주소 복사
  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(WEDDING_VENUE_INFO.address);
      setCopyMessage("주소가 복사되었습니다!");
      setTimeout(() => setCopyMessage(""), 2000);
    } catch {
      alert("주소 복사에 실패했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <VerticalSpacer size={80} />
      <p className={styles.locationTitle}>Location</p>

      {/* 장소명과 전화 아이콘 */}
      <div className={styles.infoRow}>
        <p className={styles.locationName}>{WEDDING_VENUE_INFO.title}</p>
        <button
          className={styles.iconButton}
          onClick={handleCall}
          aria-label="전화 걸기"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ic_call.svg" alt="전화" width={14} height={14} />
        </button>
      </div>

      <VerticalSpacer size={10} />

      {/* 주소와 복사 아이콘 */}
      <div className={styles.infoRow}>
        <p className={styles.locationAddr}>{WEDDING_VENUE_INFO.address}</p>
        <button
          className={styles.iconButton}
          onClick={handleCopyAddress}
          aria-label="주소 복사"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ic_copy.svg" alt="복사" width={16} height={16} />
        </button>
      </div>

      {/* 복사 메시지 */}
      {copyMessage && <div className={styles.copyMessage}>{copyMessage}</div>}

      <VerticalSpacer size={56} />
      <div className={styles.mapContainer}>
        <NaverMap
          center={WEDDING_LOCATION}
          zoom={MAP_CONFIG.zoom}
          width="100%"
          height="230px"
          markerInfo={WEDDING_VENUE_INFO}
          showControls={MAP_CONFIG.showControls}
        />
      </div>
    </div>
  );
}

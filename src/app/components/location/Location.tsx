"use client";

import styles from "./Location.module.css";
import VerticalSpacer from "@/app/components/common/VerticalSpacer";
import React, { useState } from "react";
import NaverMap from "@/app/components/map/NaverMap";
import FadeInChildren from "../common/FadeInChildren";
import ImageModal from "@/app/components/gallery/ImageModal";
import {
  WEDDING_LOCATION,
  WEDDING_VENUE_INFO,
  MAP_CONFIG,
} from "@/app/constants/wedding";
import {
  SELF_DRIVING_INFO,
  BUS_INFO,
  SUBWAY_INFO,
  PARKING_INFO,
} from "@/app/constants/transportation";

export default function Location() {
  const [copyMessage, setCopyMessage] = useState("");
  const [showMapImage, setShowMapImage] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

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
      <FadeInChildren staggerDelay={100}>
        <p className={styles.locationTitle}>Location</p>
      </FadeInChildren>

      {/* 장소명과 전화 아이콘 */}
      <FadeInChildren staggerDelay={100}>
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
      </FadeInChildren>

      <VerticalSpacer size={10} />

      {/* 주소와 복사 아이콘 */}
      <FadeInChildren staggerDelay={100}>
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
      </FadeInChildren>

      {/* 복사 메시지 */}
      {copyMessage && <div className={styles.copyMessage}>{copyMessage}</div>}

      <VerticalSpacer size={56} />
      <FadeInChildren staggerDelay={100}>
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
      </FadeInChildren>

      {/* 교통 정보 섹션 */}
      <VerticalSpacer size={56} />

      <FadeInChildren staggerDelay={100}>
        {/* 자차 */}
        <div className={styles.transportSection}>
          <div className={styles.transportHeader}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ic_car.svg" alt="자차" width={18} height={18} />
            <p className={styles.transportTitle}>자차</p>
          </div>
          <p className={styles.transportDesc}>{SELF_DRIVING_INFO.description}</p>
          <p className={styles.transportDesc}>{SELF_DRIVING_INFO.parkingNotice}</p>

          {/* 약도 토글 버튼 */}
          <button
            className={styles.mapToggleButton}
            onClick={() => setShowMapImage(!showMapImage)}
          >
            {showMapImage ? '약도 닫기' : '약도 보기'}
            <svg
              width="10"
              height="10"
              viewBox="0 0 12 12"
              fill="none"
              className={showMapImage ? styles.arrowUp : styles.arrowDown}
            >
              <path
                d="M2 4L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* 약도 이미지 */}
          {showMapImage && (
            <div
              className={styles.mapImageContainer}
              onClick={() => setShowMapModal(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setShowMapModal(true);
                }
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/location_map.jpg"
                alt="L65호텔웨딩컨벤션 약도"
                className={styles.mapImage}
              />
            </div>
          )}
        </div>

        <div className={styles.divider} />

        {/* 버스 */}
        <div className={styles.transportSection}>
          <div className={styles.transportHeader}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ic_bus.svg" alt="버스" width={18} height={18} />
            <p className={styles.transportTitle}>버스</p>
          </div>
          <p className={styles.transportSubtitle}>{BUS_INFO.stop}</p>
          <div className={styles.busListContainer}>
            {BUS_INFO.lines.map((line, index) => (
              <div key={index} className={styles.busLineRow}>
                <div
                  className={styles.busBadge}
                  style={{ backgroundColor: line.color }}
                >
                  {line.label}
                </div>
                <p className={styles.busRoutes}>{line.routes}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        {/* 지하철 */}
        <div className={styles.transportSection}>
          <div className={styles.transportHeader}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ic_subway.svg" alt="지하철" width={18} height={18} />
            <p className={styles.transportTitle}>지하철</p>
          </div>
          <div className={styles.subwayContainer}>
            {/* 1호선 그룹 */}
            <div className={styles.subwayGroup}>
              <div className={styles.subwayBadgeRow}>
                <div
                  className={styles.subwayBadge}
                  style={{ backgroundColor: SUBWAY_INFO.lines[0].color }}
                >
                  {SUBWAY_INFO.lines[0].name}
                </div>
              </div>
              <p className={styles.subwayExit}>{SUBWAY_INFO.lines[0].exit}</p>
            </div>

            {/* 경의중앙, 수인분당, 경춘선 그룹 */}
            <div className={styles.subwayGroup}>
              <div className={styles.subwayBadgeRow}>
                {SUBWAY_INFO.lines.slice(1).map((line, index) => (
                  <div
                    key={index}
                    className={styles.subwayBadge}
                    style={{ backgroundColor: line.color }}
                  >
                    {line.name}
                  </div>
                ))}
              </div>
              <p className={styles.subwayExit}>{SUBWAY_INFO.lines[1].exit}</p>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        {/* 주차 */}
        <div className={styles.transportSection}>
          <div className={styles.transportHeader}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ic_parking.svg" alt="주차" width={18} height={18} />
            <p className={styles.transportTitle}>주차</p>
          </div>
          <div className={styles.parkingDesc}>
            {PARKING_INFO.description.map((line, index) => (
              <p key={index} className={styles.parkingLine}>
                {index === 0 ? (
                  <>
                    <strong>지하 3층, 4층</strong>만 <strong>주차 가능</strong>
                    합니다.
                  </>
                ) : index === 1 ? (
                  <>
                    <strong>지하 2층</strong>은 <strong>주차가 불가능</strong>
                    합니다.
                  </>
                ) : index === 2 ? (
                  <>
                    <strong>연회장 입구 태블릿으로 차량 등록</strong>을 해주시면 <strong>1시간 30분 무료로</strong> 사용 가능하고, 이후는 주차 요금이 발생합니다.
                  </>
                ) : (
                  line
                )}
              </p>
            ))}
          </div>
        </div>
      </FadeInChildren>

      <VerticalSpacer size={80} />

      {/* 약도 전체화면 모달 */}
      {showMapModal && (
        <ImageModal
          images={[{ src: '/location_map.jpg', alt: 'L65호텔웨딩컨벤션 약도' }]}
          initialIndex={0}
          onClose={() => setShowMapModal(false)}
          showNavigation={false}
        />
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import styles from "./Rsvp.module.css";
import VerticalSpacer from "@/app/components/common/VerticalSpacer";
import { groomFirstName, brideFirstName } from "@/app/constants/name";
import { WEDDING_VENUE_INFO } from "@/app/constants/wedding";
import AttendanceModal from "./AttendanceModal";
import FadeInChildren from "../common/FadeInChildren";

export default function Rsvp() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckAttendance = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <VerticalSpacer size={80} />

      <FadeInChildren staggerDelay={150}>
        <p className={styles.title}>Rsvp</p>
        <VerticalSpacer size={40} />

        <p className={styles.subtitle}>참석 의사</p>
        <VerticalSpacer size={8} />
        <p className={styles.description}>
          모든 분들을 소중히 모실 수 있도록 전해주세요
        </p>

        <VerticalSpacer size={40} />

      {/* 참석 의사 카드 */}
      <div className={styles.card}>
        <div className={styles.coupleNames}>
          <span className={styles.groomName}>신랑 {groomFirstName}</span>
          
          {/* 하트 아이콘 */}
          <div className={styles.heartIcon}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ic_heart.svg" alt="heart" width={12} height={12} />
          </div>
          <span className={styles.brideName}>신부 {brideFirstName}</span>
        </div>

        <div className={styles.divider} />

        <p className={styles.date}>2026년 2월 7일</p>
        <p className={styles.time}>토요일 오후 4시</p>

        <VerticalSpacer size={24} />

        <p className={styles.venue}>
          {WEDDING_VENUE_INFO.title}
          <br />
          청량리역 1번, 5번 출구 앞
        </p>

        <VerticalSpacer size={24} />

        <button className={styles.checkButton} onClick={handleCheckAttendance}>
          참석 의사 체크하기
        </button>
      </div>
      </FadeInChildren>

      <VerticalSpacer size={80} />

      {/* 참석 의사 모달 */}
      {isModalOpen && (
        <AttendanceModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

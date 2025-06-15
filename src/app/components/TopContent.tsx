import Image from "next/image";
import styles from "./TopContent.module.css";
import {brideFirstName, brideFirstNameEn, groomFirstName, groomFirstNameEn} from "@/app/constants/name";

export default function TopContent() {
  return (
    <div className={styles.topContent}>
      <div className={styles.imageWrapper}>
        <Image
          src="/cover_image.png"
          alt={`${groomFirstName}과 ${brideFirstName}의 결혼식`}
          layout="responsive"
          width={400}
          height={300}
          priority
        />
        <div className={styles.textOverlay}>
          <h1 className={styles.title}>${groomFirstNameEn} & ${brideFirstNameEn}</h1>
          <p className={styles.subtitle}>2026년 2월 7일 토요일 오후 4시</p>
          <p className={styles.subtitle}>L65호텔웨딩컨벤션</p>
        </div>
      </div>
    </div>
  );
}

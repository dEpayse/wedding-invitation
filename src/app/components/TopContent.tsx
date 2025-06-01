import Image from "next/image";
import styles from "./TopContent.module.css";

export default function TopContent() {
  return (
    <div className={styles.topContent}>
      <div className={styles.imageWrapper}>
        <Image
          src="/cover_image.png"
          alt="범순과 승주의 결혼식"
          layout="responsive"
          width={400}
          height={300}
          priority
        />
        <div className={styles.textOverlay}>
          <h1 className={styles.title}>BEOMSOON & SEUNGJU</h1>
          <p className={styles.subtitle}>2026년 2월 7일 토요일 오후 4시</p>
          <p className={styles.subtitle}>L65호텔웨딩컨벤션</p>
        </div>
      </div>
    </div>
  );
}

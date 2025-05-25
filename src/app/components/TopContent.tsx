import Image from 'next/image';
import styles from './TopContent.module.css';

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
      </div>
      <h1 className={styles.title}>BEOMSOON & SEUNGJU</h1>
      <p className={styles.subtitle}>2025년 7월 5일 토요일 오후 12시</p>
      <p className={styles.subtitle}>더 플라자 지스텀하우스 (22층)</p>
    </div>
  );
}
import Image from "next/image";
import styles from "./TopContent.module.css";
import {brideFirstName, brideFirstNameEn, groomFirstName, groomFirstNameEn} from "@/app/constants/name";

export default function TopContent() {
  return (
    <div className={styles.topContent}>
      {/* 꽃잎 떨어지는 효과 */}
      <div className={styles.petalsContainer}>
        {[...Array(20)].map((_, i) => {
          const rotation = Math.random() * 360; // 초기 회전
          const direction = Math.random() > 0.5 ? 1 : -1; // 좌우 방향
          const isFloating = i % 4 === 0; // 4개 중 1개는 수평 이동
          const animationName = isFloating ? styles.float : styles.fall;

          return (
            <div
              key={i}
              className={`${styles.petal} ${animationName}`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 8}s`, // 6~14초로 다양하게
                transform: `rotate(${rotation}deg)`,
                '--direction': direction,
                '--initial-rotation': `${rotation}deg`,
              } as React.CSSProperties & { '--direction': number; '--initial-rotation': string }}
            />
          );
        })}
      </div>

      <div className={styles.imageWrapper}>
        <Image
          src="/cover_image.png"
          alt={`${groomFirstName}과 ${brideFirstName}의 결혼식`}
          layout="responsive"
          width={0}
          height={300}
          priority
        />

          {/* 제목 */}
          <div className={styles.title}>
            <p>
              We are
              <br />
              getting
              <br />
              married
            </p>
          </div>
          <div className={styles.textOverlay}>
            <p className={styles.names}>{brideFirstNameEn} AND {groomFirstNameEn}</p>
          </div>
      </div>
    </div>
  );
}

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

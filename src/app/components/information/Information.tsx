import React from 'react';
import styles from './Information.module.css';
import VerticalSpacer from '@/app/components/common/VerticalSpacer';
import FadeInChildren from '../common/FadeInChildren';

export default function Information() {
  return (
    <div className={styles.container}>
      <VerticalSpacer size={80} />

      <FadeInChildren staggerDelay={100}>
        <h2 className={styles.title}>information</h2>
      </FadeInChildren>

      <VerticalSpacer size={20} />

      <FadeInChildren staggerDelay={100}>
        <div className={styles.infoSection}>
          <div className={styles.infoItem}>
            <h3 className={styles.subtitle}>식사 안내</h3>
            <VerticalSpacer size={8} />
            <p className={styles.description}>
              뷔페식으로 식사가 준비되어 있습니다.<br />
              이용 가능한 시간은 15:00 ~ 18:00 입니다.
            </p>
            <a
              href="http://www.l65hotelwedding.co.kr/banquet/menu/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.menuLink}
            >
              메뉴 자세히 보기
            </a>
          </div>

          <div className={styles.divider} />

          <div className={styles.infoItem}>
            <h3 className={styles.subtitle}>화환 안내</h3>
            <VerticalSpacer size={8} />
            <p className={styles.description}>
              축하의 마음만으로도 충분합니다.<br />
              정중히 화환은 사양합니다.
            </p>
          </div>
        </div>
      </FadeInChildren>

      <VerticalSpacer size={80} />
    </div>
  );
}

import React from "react";
import styles from "./MainMessage.module.css";

export default function MainMessage() {
  return (
    <div className={styles.mainMessage}>
      <div className={styles.verticalDivider}></div>
      <h6 className={styles.contents}>
        사람이 온다는 건 실은 어마어마한 일이다.
      </h6>
      <h6 className={styles.contents}>그는 그의 과거와 현재와 그리고</h6>
    </div>
  );
}

import React from "react";
import styles from "./MainMessage.module.css";
import VerticalSpacer from "./common/VerticalSpacer";

export default function MainMessage() {
  return (
    <div className={styles.mainMessage}>
      <div className={styles.verticalDivider}></div>
      <h6 className={styles.contents}>
        사람이 온다는 건 실은 어마어마한 일이다. <br />
        그는 그의 과거와 현재와 그리고 <br />
        그의 미래와 함께 오기 때문이다. <br />
        한 사람의 인생이 오기 때문이다. <br />
      </h6>
      <VerticalSpacer size={45} />
      <h6 className={styles.contents}>-정현종, &apos;방문객&apos;</h6>
      <VerticalSpacer size={45} />
      <h6 className={styles.contents}>
        저희 두 사람이 함께하는 새로운 시작에 <br />
        귀한 발걸음으로 축복해 주시면 감사하겠습니다.
      </h6>
      <VerticalSpacer size={48} />
      <h6 className={styles.contents}>신랑 최범순 · 신부 류승주</h6>
      <VerticalSpacer size={45} />
    </div>
  );
}

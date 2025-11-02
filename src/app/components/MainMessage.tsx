import React from "react";
import Image from "next/image";
import styles from "./MainMessage.module.css";
import VerticalSpacer from "./common/VerticalSpacer";

export default function MainMessage() {
  return (
    <div className={styles.mainMessage}>
      <VerticalSpacer size={188} />
      <Image src="/main_message_ribbon.svg" alt="리본" width={30} height={30} />
      <VerticalSpacer size={50} />
      <h6 className={styles.contents}>
        8년이 넘는 시간 동안
        <br />
        서로의 곁을 지켜 왔습니다.
        <br />
        <br />
        파릇파릇한 대학생부터
        <br />
        지금까지 함께해온 것처럼,
        <br />
        이제는 범순과 승주가
        <br />
        하나의 가정을 이루고자 합니다.
        <br />
        <br />
        하나된 삶을 시작 하는 자리에
        <br />
        기쁜 마음으로 초대합니다.
      </h6>
      <VerticalSpacer size={188} />
    </div>
  );
}

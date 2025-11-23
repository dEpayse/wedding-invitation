"use client";

import styles from "./FamilyInfos.module.css";
import {
  brideFatherFullName,
  brideFirstName,
  brideMotherFullName,
  groomFatherFullName,
  groomFirstName,
  groomMotherFullName,
} from "@/app/constants/name";
import VerticalSpacer from "@/app/components/common/VerticalSpacer";
import HorizontalSpacer from "../common/HorizontalSpacer";
import FadeInChildren from "../common/FadeInChildren";

export function FamilyInfos() {
  return (
    <div className={styles.container}>
      <VerticalSpacer size={120} />
      <FadeInChildren staggerDelay={150}>
        <FamilyInfo
          fatherFullName={groomFatherFullName}
          motherFullName={groomMotherFullName}
          relation={`의 아들`}
          groomOrBrideStr={`신랑`}
          groomOrBrideFirstName={groomFirstName}
        />
        <VerticalSpacer size={32} />
        <div className={styles.divider} />
        <VerticalSpacer size={32} />
        <FamilyInfo
          fatherFullName={brideFatherFullName}
          motherFullName={brideMotherFullName}
          relation={`의 딸`}
          groomOrBrideStr={`신부`}
          groomOrBrideFirstName={brideFirstName}
        />
      </FadeInChildren>
      <VerticalSpacer size={120} />
    </div>
  );
}

interface FamilyInfo {
  fatherFullName: string;
  motherFullName: string;
  relation: string;
  groomOrBrideStr: string;
  groomOrBrideFirstName: string;
}

function FamilyInfo({
  fatherFullName,
  motherFullName,
  relation,
  groomOrBrideStr,
  groomOrBrideFirstName,
}: FamilyInfo) {
  return (
    <div>
      <div className={styles.familyFirstRow}>
        <div>
          <span className={styles.text}>{fatherFullName}</span>
          <span className={styles.relationText}> · </span>
          <span className={styles.text}>{motherFullName}</span>
        </div>
        <HorizontalSpacer size={8} />
        <div>
          <span className={styles.relationText}>{relation}</span>
        </div>
      </div>

      <VerticalSpacer size={32} />
      <div className={styles.familySecondRow}>
        <div>
          <span className={styles.relationText}>{groomOrBrideStr} </span>
        </div>
        <HorizontalSpacer size={8} />
        <div>
          <span className={styles.text}>{groomOrBrideFirstName}</span>
        </div>
      </div>
    </div>
  );
}

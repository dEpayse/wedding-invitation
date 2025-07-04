import styles from './FamilyInfos.module.css';
import {
    brideFatherFullName, brideFirstName,
    brideMotherFullName,
    groomFatherFullName,
    groomFirstName,
    groomMotherFullName
} from "@/app/constants/name";
import VerticalSpacer from "@/app/components/common/VerticalSpacer";
import Button from "@/app/components/button/Button";
import Image from "next/image";

export function FamilyInfos() {
    return (
        <div className={styles.container}>
            <VerticalSpacer size={80}/>
            <FamilyInfo
                fatherFullName={groomFatherFullName}
                motherFullName={groomMotherFullName}
                relation={`의 아들`}
                groomOrBrideStr={`신랑`}
                groomOrBrideFirstName={groomFirstName}/>
            <VerticalSpacer size={32}/>
            <div className={styles.divider} />
            <VerticalSpacer size={32}/>
            <FamilyInfo
                fatherFullName={brideFatherFullName}
                motherFullName={brideMotherFullName}
                relation={`의 딸`}
                groomOrBrideStr={`신부`}
                groomOrBrideFirstName={brideFirstName}/>
            <VerticalSpacer size={48}/>
            <Button className={styles.congratulations}>
                <div className={styles.congratulationsDiv}>
                    <span>축하 연락하기</span>
                    <Image
                        width={25}
                        height={25}
                        src="/ic_arrow_right.svg"
                        alt="화살표"/>
                </div>
            </Button>
            <VerticalSpacer size={80}/>
        </div>
    )
}

interface FamilyInfo {
    fatherFullName: string;
    motherFullName: string;
    relation: string;
    groomOrBrideStr: string;
    groomOrBrideFirstName: string;
}

function FamilyInfo(
    {
        fatherFullName,
        motherFullName,
        relation,
        groomOrBrideStr,
        groomOrBrideFirstName,
    } : FamilyInfo
) {
    return (
        <div>
            <div className={styles.familyRow}>
                <div>
                    <span className={styles.text}>{fatherFullName}</span>
                    <span className={styles.text}> • </span>
                    <span className={styles.text}>{motherFullName}</span>
                </div>
                <div>
                    <span className={styles.text}>{relation}</span>
                </div>
            </div>

            <VerticalSpacer size={32}/>
            <div className={styles.familyRow}>
                <div>
                    <span className={styles.text}>{groomOrBrideStr}</span>
                </div>
                <div>
                    <span className={styles.text}>{groomOrBrideFirstName}</span>
                </div>
            </div>
        </div>
    )
}
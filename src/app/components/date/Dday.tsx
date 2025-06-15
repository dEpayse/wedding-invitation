"use client";

import styles from "./Dday.module.css";
import {brideFirstName, groomFirstName} from "@/app/constants/name";
import VerticalSpacer from "@/app/components/common/VerticalSpacer";
import Image from "next/image";

export function Dday() {
    return (
        <div>
            <VerticalSpacer size={32}/>
            <div className={styles.dDayContainer}>
                <RemainCountCard count={60} unit="DAYS"/>
                <RemainCountCard count={2} unit="HOURS"/>
                <RemainCountCard count={24} unit="MINUTES"/>
                <RemainCountCard count={20} unit="SECONDS"/>
            </div>
            <VerticalSpacer size={32}/>
            <RemainGuide count={60} unit={"일"}/>
            <VerticalSpacer size={120}/>
        </div>
    );
}

interface RemainCountCardProps {
    count: number;
    unit: string;
}

function RemainCountCard({count, unit}: RemainCountCardProps) {
    return (
        <div className={styles.roundedContainer}>
            <p className={styles.count}>{count}</p>
            <p className={styles.unit}>{unit}</p>
        </div>
    );
}

interface RemainGuideProps {
    count: number;
    unit: string;
}

function RemainGuide({count, unit}: RemainGuideProps) {
    return (
        <div className={styles.remainGuide}>
            <span>{groomFirstName}</span>
            <Image
                src="/ic_heart.svg"
                alt="하트"
                width={0}
                height={0}
                className={styles.originalSize}
            />
            <span>{brideFirstName}</span>
            <span> 결혼식이</span>
            <span className={styles.highlight}>{count}{unit}</span>
            <span> 남았습니다</span>
        </div>
    )
}



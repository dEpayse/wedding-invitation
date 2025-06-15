"use client";

import styles from "./Dday.module.css";
import {brideFirstName, groomFirstName} from "@/app/constants/name";
import VerticalSpacer from "@/app/components/common/VerticalSpacer";
import {useEffect, useState} from "react";
import {calculateTimeRemaining, TimeRemaining} from "@/app/utils/dateUtils";
import {WEDDING_DATE} from "@/app/constants/date";

export function Dday() {
    const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
        days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0
    })

    useEffect(() => {
        const updateTimer = () => {
            const remaining = calculateTimeRemaining({
                targetDate: WEDDING_DATE,
            });
            setTimeRemaining(remaining);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.background}>
            <VerticalSpacer size={32}/>
            <div className={styles.dDayContainer}>
                <RemainCountCard count={timeRemaining.days} unit="DAYS"/>
                <RemainCountCard count={timeRemaining.hours} unit="HOURS"/>
                <RemainCountCard count={timeRemaining.minutes} unit="MINUTES"/>
                <RemainCountCard count={timeRemaining.seconds} unit="SECONDS"/>
            </div>
            <VerticalSpacer size={32}/>
            <RemainGuide count={timeRemaining.days} unit={"일"}/>
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/ic_heart.svg"
                alt="하트"
                className={styles.heartImage}
            />
            <span>{brideFirstName}</span>
            <span>결혼식이</span>
            <span className={styles.highlight}>{count}{unit}</span>
            <span>남았습니다</span>
        </div>
    )
}



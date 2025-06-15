import dayjs from "dayjs";

import duration from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';


dayjs.extend(duration)
dayjs.extend(timezone)
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.locale('ko');

const DEFAULT_TIMEZONE = 'Asia/Seoul';

export interface TimeRemaining {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds?: number;
}

export interface CalculateTimeRemainingOptions {
    targetDate: string;
    timezone?: string;
    includeMilliseconds?: boolean;
}

/**
 * 목표 날짜까지 남은 시간을 계산합니다
 * @param options 계산 옵션들
 * @returns 남은 시간 객체
 */
export function calculateTimeRemaining(options: CalculateTimeRemainingOptions): TimeRemaining {
    const {
        targetDate,
        timezone = DEFAULT_TIMEZONE,
        includeMilliseconds = false,
    } = options;

    // 날짜 생성
    const target = dayjs(targetDate).tz(timezone);
    const current = dayjs().tz(timezone);

    // 과거 날짜면 0 반환
    if (target.isBefore(current)) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            ...(includeMilliseconds && { milliseconds: 0 })
        };
    }

    // 차이 계산
    const diff = target.diff(current);
    const durationObj = dayjs.duration(diff);

    const result: TimeRemaining = {
        days: Math.floor(durationObj.asDays()),
        hours: durationObj.hours(),
        minutes: durationObj.minutes(),
        seconds: durationObj.seconds(),
    };

    if (includeMilliseconds) {
        result.milliseconds = durationObj.milliseconds();
    }

    return result;
}
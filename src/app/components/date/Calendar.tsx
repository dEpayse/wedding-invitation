import VerticalSpacer from "../common/VerticalSpacer";
import styles from "./Calendar.module.css";

export function Calendar() {
  return (
    <div className={styles.calendarBg}>
      <VerticalSpacer size={80} />
      <p className={styles.calendarTitle}> wedding day </p>
      <p className={styles.dateTitle}> 2026년 2월 7일 토요일 | 오후 4시 </p>
      <VerticalSpacer size={34} />
      <hr className={styles.divider} />
      <VerticalSpacer size={22} />
      <InnerCalendar year={2026} month={2} highlightDates={[7]} />
      <VerticalSpacer size={22} />
      <hr className={styles.divider} />
      <VerticalSpacer size={32} />
    </div>
  );
}

interface CalendarProps {
  year: number;
  month: number;
  highlightDates?: number[];
}

function InnerCalendar({ year, month, highlightDates = [] }: CalendarProps) {
  // 달력 데이터 생성
  const getDatesInMonth = () => {
    const date = new Date(year, month - 1, 1);
    const daysInMonth = new Date(year, month, 0).getDate();
    const startDay = date.getDay(); // 1일이 무슨 요일인지
    console.log(
      `Year: ${year}, Month: ${month}, Days in Month: ${daysInMonth}, Start Day: ${startDay}`
    );

    const days: Array<Date | null> = [];

    // 빈 칸 추가 (월 시작하기 전)
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    // 실제 날짜들 추가
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month - 1, day));
    }

    return days;
  };

  const isHighlighted = (day: number) => {
    return highlightDates.includes(day);
  };

  const dates = getDatesInMonth();

  return (
    <div className={styles.calendar}>
      {/* 요일 표시 */}
      <div className={styles.weekdays}>
        <div className={`${styles.weekday} ${styles.sunday}`}>일</div>
        {["월", "화", "수", "목", "금"].map((day) => (
          <div key={day} className={styles.weekday}>
            {day}
          </div>
        ))}
        <div className={`${styles.weekday} ${styles.saturday}`}>토</div>
      </div>

      {/* 날짜들 */}
      <div className={styles.daysGrid}>
        {dates.map((date: Date | null, index: number) => (
          <div
            key={index}
            className={`${styles.day} ${date ? styles.active : styles.empty} ${
              date && isHighlighted(date.getDate()) ? styles.highlighted : ""
            } ${date && date.getDay() === 0 ? styles.sunday : ""} ${
              date && date.getDay() === 6 ? styles.saturday : ""
            }
            `}
          >
            {date?.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
}

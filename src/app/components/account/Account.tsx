"use client";

import styles from "./Account.module.css";
import VerticalSpacer from "@/app/components/common/VerticalSpacer";
import { useState } from "react";

interface AccountInfo {
  bank: string;
  accountNumber: string;
  accountHolder: string;
}

export default function Account() {
  const [showGroomAccount, setShowGroomAccount] = useState(false);
  const [showBrideAccount, setShowBrideAccount] = useState(false);

  // TODO: 실제 계좌 정보로 변경
  const groomAccount: AccountInfo = {
    bank: "신한은행",
    accountNumber: "110-123-456789",
    accountHolder: "최범순",
  };

  const brideAccount: AccountInfo = {
    bank: "국민은행",
    accountNumber: "123-456-789012",
    accountHolder: "류승주",
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("계좌번호가 복사되었습니다.");
  };

  return (
    <div className={styles.container}>
      <VerticalSpacer size={80} />

      {/* 상단 구분선 */}
      <div className={styles.topDivider} />

      <VerticalSpacer size={73} />

      <p className={styles.title}>마음 전하실 곳</p>
      <VerticalSpacer size={8} />
      <p className={styles.description}>
        참석이 어려우신 분들을 위해 기재했습니다
        <br />
        너그러운 마음으로 양해 부탁드립니다
      </p>

      <VerticalSpacer size={43} />

      {/* 신랑측 버튼 */}
      <button
        className={styles.accountButton}
        onClick={() => setShowGroomAccount(!showGroomAccount)}
      >
        <span>신랑측에게</span>
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          className={showGroomAccount ? styles.arrowUp : styles.arrowDown}
        >
          <path
            d="M1 1L7 7L13 1"
            stroke="#444444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {showGroomAccount && (
        <div className={styles.accountInfo}>
          <div className={styles.accountRow}>
            <span className={styles.accountLabel}>은행</span>
            <span className={styles.accountValue}>{groomAccount.bank}</span>
          </div>
          <div className={styles.accountRow}>
            <span className={styles.accountLabel}>예금주</span>
            <span className={styles.accountValue}>
              {groomAccount.accountHolder}
            </span>
          </div>
          <div className={styles.accountRow}>
            <span className={styles.accountLabel}>계좌번호</span>
            <span className={styles.accountValue}>
              {groomAccount.accountNumber}
            </span>
            <button
              className={styles.copyButton}
              onClick={() => copyToClipboard(groomAccount.accountNumber)}
            >
              복사
            </button>
          </div>
        </div>
      )}

      <VerticalSpacer size={12} />

      {/* 신부측 버튼 */}
      <button
        className={styles.accountButton}
        onClick={() => setShowBrideAccount(!showBrideAccount)}
      >
        <span>신부측에게</span>
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          className={showBrideAccount ? styles.arrowUp : styles.arrowDown}
        >
          <path
            d="M1 1L7 7L13 1"
            stroke="#444444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {showBrideAccount && (
        <div className={styles.accountInfo}>
          <div className={styles.accountRow}>
            <span className={styles.accountLabel}>은행</span>
            <span className={styles.accountValue}>{brideAccount.bank}</span>
          </div>
          <div className={styles.accountRow}>
            <span className={styles.accountLabel}>예금주</span>
            <span className={styles.accountValue}>
              {brideAccount.accountHolder}
            </span>
          </div>
          <div className={styles.accountRow}>
            <span className={styles.accountLabel}>계좌번호</span>
            <span className={styles.accountValue}>
              {brideAccount.accountNumber}
            </span>
            <button
              className={styles.copyButton}
              onClick={() => copyToClipboard(brideAccount.accountNumber)}
            >
              복사
            </button>
          </div>
        </div>
      )}

      <VerticalSpacer size={80} />
    </div>
  );
}

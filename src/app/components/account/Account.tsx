"use client";

import styles from "./Account.module.css";
import VerticalSpacer from "@/app/components/common/VerticalSpacer";
import { useState } from "react";
import FadeInChildren from "../common/FadeInChildren";
import {
  groomAccounts,
  brideAccounts,
  type AccountInfo,
} from "@/app/constants/account";

export default function Account() {
  const [showGroomAccount, setShowGroomAccount] = useState(false);
  const [showBrideAccount, setShowBrideAccount] = useState(false);

  const copyToClipboard = (text: string) => {
    const cleanedText = text.replace(/-/g, "");
    navigator.clipboard.writeText(cleanedText);
    alert("계좌번호가 복사되었습니다.");
  };

  const openKakaoPay = async (account: AccountInfo) => {
    // 계좌번호 복사
    const cleanedAccountNumber = account.accountNumber.replace(/-/g, "");

    try {
      await navigator.clipboard.writeText(cleanedAccountNumber);

      // 모바일 환경에서 카카오페이 앱 열기
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

      if (isMobile) {
        // 카카오페이 앱 실행 (송금 화면으로)
        window.location.href = "kakaotalk://kakaopay/home";

        // 앱 실행 실패 대비 알림
        setTimeout(() => {
          alert(`${account.bank} ${cleanedAccountNumber}\n계좌번호가 복사되었습니다.`);
        }, 100);
      } else {
        alert(`${account.bank} ${cleanedAccountNumber}\n계좌번호가 복사되었습니다.\n\n모바일에서 카카오페이를 실행해주세요.`);
      }
    } catch {
      alert("계좌번호 복사에 실패했습니다.");
    }
  };

  const renderAccountCard = (account: AccountInfo) => {
    return (
      <div className={styles.accountCard}>
        <div className={styles.accountHeader}>
          <div>
            <span className={styles.accountName}>{account.accountHolder}</span>
            <span className={styles.accountRelation}>{account.relation}</span>
          </div>
        </div>
        <div className={styles.accountBody}>
          <div className={styles.bankName}>{account.bank}</div>
          <div className={styles.accountNumberRow}>
            <span className={styles.accountNumber}>{account.accountNumber}</span>
            <div className={styles.accountActions}>
              <button
                className={styles.copyButton}
                onClick={() => copyToClipboard(account.accountNumber)}
                aria-label="계좌번호 복사"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeWidth="2"/>
                </svg>
              </button>
              <button
                className={styles.kakaoPayButton}
                onClick={() => openKakaoPay(account)}
                aria-label="카카오페이 송금"
              >
                <img src="/ic_kakao_pay.png" alt="카카오페이" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {/* 상단 구분선 */}
      <div className={styles.topDivider} />

      <VerticalSpacer size={73} />

      <FadeInChildren staggerDelay={100}>
        <p className={styles.title}>마음 전하실 곳</p>
        <VerticalSpacer size={8} />
        <p className={styles.description}>
          참석이 어려우신 분들을 위해 기재했습니다
          <br />
          너그러운 마음으로 양해 부탁드립니다
        </p>
      </FadeInChildren>

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
          {groomAccounts.map((account, index) => (
            <div key={index}>
              {renderAccountCard(account)}
            </div>
          ))}
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
          {brideAccounts.map((account, index) => (
            <div key={index}>
              {renderAccountCard(account)}
            </div>
          ))}
        </div>
      )}

      <VerticalSpacer size={80} />
    </div>
  );
}

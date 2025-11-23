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

  const openKakaoPay = (account: AccountInfo) => {
    // 모바일 환경 체크
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (!isMobile) {
      alert("카카오페이는 모바일에서만 사용 가능합니다.");
      return;
    }

    const cleanedAccountNumber = account.accountNumber.replace(/-/g, "");

    // 카카오페이 송금 URL 스킴
    const bankCode = getBankCode(account.bank);
    const kakaoPayUrl = `kakaotalk://kakaopay/money/transfer?bank=${bankCode}&account=${cleanedAccountNumber}&name=${encodeURIComponent(account.accountHolder)}`;

    window.location.href = kakaoPayUrl;
  };

  const getBankCode = (bankName: string): string => {
    const bankCodes: { [key: string]: string } = {
      "카카오뱅크": "090",
      "국민은행": "004",
      "우체국": "071",
      "농협": "011",
      "신한은행": "088",
      "우리은행": "020",
      "하나은행": "081",
      "IBK기업은행": "003",
      "SC제일은행": "023",
      "한국씨티은행": "027",
      "경남은행": "039",
      "광주은행": "034",
      "대구은행": "031",
      "부산은행": "032",
      "전북은행": "037",
      "제주은행": "035",
      "케이뱅크": "089",
      "토스뱅크": "092",
    };
    return bankCodes[bankName] || "";
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

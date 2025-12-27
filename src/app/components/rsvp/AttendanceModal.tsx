'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './AttendanceModal.module.css';
import { GuestSide, type GuestFormData } from '@/app/types/guest';

interface AttendanceModalProps {
    onClose: () => void;
}

export default function AttendanceModal({ onClose }: AttendanceModalProps) {
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState<GuestFormData>({
        side: '',
        willAttend: null,
        name: '',
        phoneLastDigits: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 클라이언트 사이드에서만 렌더링
    useEffect(() => {
        setMounted(true);
    }, []);

    // body와 Container 스크롤 방지 및 스크롤 위치 복원
    useEffect(() => {
        // 현재 스크롤 위치 저장
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;

        // body 스크롤 방지
        const originalBodyOverflow = document.body.style.overflow;
        const originalBodyPosition = document.body.style.position;
        const originalBodyTop = document.body.style.top;
        const originalBodyWidth = document.body.style.width;

        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';

        // Container 스크롤 방지
        const container = document.querySelector('[class*="Container_container"]') as HTMLElement;
        const originalContainerOverflow = container?.style.overflow;
        if (container) {
            container.style.overflow = 'hidden';
        }

        return () => {
            // body 스타일 복원
            document.body.style.overflow = originalBodyOverflow;
            document.body.style.position = originalBodyPosition;
            document.body.style.top = originalBodyTop;
            document.body.style.width = originalBodyWidth;

            // 스크롤 위치 복원
            window.scrollTo(scrollX, scrollY);

            // Container 스타일 복원
            if (container && originalContainerOverflow !== undefined) {
                container.style.overflow = originalContainerOverflow;
            }
        };
    }, []);

    // ESC 키로 닫기
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // 필수 필드가 모두 입력되었는지 확인 (phoneLastDigits는 선택사항)
    const isFormValid =
        formData.side !== '' &&
        formData.willAttend !== null &&
        formData.name.trim() !== '';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isFormValid) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/guests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    side: formData.side,
                    willAttend: formData.willAttend,
                    name: formData.name,
                    phoneLastDigits: formData.phoneLastDigits || null,
                }),
            });

            if (!response.ok) {
                throw new Error('전송에 실패했습니다.');
            }

            alert('참석 의사가 전달되었습니다. 감사합니다!');
            onClose();
        } catch (error) {
            console.error('Error submitting attendance:', error);
            alert('전송 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!mounted) return null;

    const modalContent = (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                {/* X 닫기 버튼 */}
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                    type="button"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                {/* 모달 헤더 */}
                <h2 className={styles.title}>참석 의사 체크하기</h2>
                <p className={styles.subtitle}>
                    한 분 한 분을 소중히 모실 수 있도록<br />
                    참석 의사를 전해주시면 감사하겠습니다.
                </p>

                {/* 폼 */}
                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* 어느 분의 하객이신가요? */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            어느 분의 하객이신가요? <span className={styles.required}>*</span>
                        </label>
                        <div className={styles.buttonGroup}>
                            <button
                                type="button"
                                className={`${styles.optionButton} ${formData.side === GuestSide.GROOM ? styles.active : ''}`}
                                onClick={() => setFormData({ ...formData, side: GuestSide.GROOM })}
                            >
                                신랑
                            </button>
                            <button
                                type="button"
                                className={`${styles.optionButton} ${formData.side === GuestSide.BRIDE ? styles.active : ''}`}
                                onClick={() => setFormData({ ...formData, side: GuestSide.BRIDE })}
                            >
                                신부
                            </button>
                        </div>
                    </div>

                    {/* 참석하실 수 있나요? */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            참석하실 수 있나요? <span className={styles.required}>*</span>
                        </label>
                        <div className={styles.buttonGroup}>
                            <button
                                type="button"
                                className={`${styles.optionButton} ${formData.willAttend === true ? styles.active : ''}`}
                                onClick={() => setFormData({ ...formData, willAttend: true })}
                            >
                                참석할게요
                            </button>
                            <button
                                type="button"
                                className={`${styles.optionButton} ${formData.willAttend === false ? styles.active : ''}`}
                                onClick={() => setFormData({ ...formData, willAttend: false })}
                            >
                                참석이 어려워요
                            </button>
                        </div>
                    </div>

                    {/* 성함이 어떻게 되시나요? */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            성함이 어떻게 되시나요? <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="참석자 본인 성함"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    {/* 동명이인 체크를 위한 번호를 알려주세요 */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            동명이인 체크를 위한 번호를 알려주세요
                        </label>
                        <input
                            type="tel"
                            className={styles.input}
                            placeholder="핸드폰 번호 뒤 4자리"
                            value={formData.phoneLastDigits}
                            onChange={(e) => setFormData({ ...formData, phoneLastDigits: e.target.value })}
                        />
                    </div>

                    {/* 제출 버튼 */}
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={!isFormValid || isSubmitting}
                    >
                        {isSubmitting ? '전송 중...' : '체크 완료하기'}
                    </button>
                </form>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}

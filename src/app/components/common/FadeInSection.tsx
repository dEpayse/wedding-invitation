'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import styles from './FadeInSection.module.css';

interface FadeInSectionProps {
    children: ReactNode;
    delay?: number; // 애니메이션 지연 시간 (ms)
    threshold?: number; // 뷰포트에 얼마나 들어와야 트리거할지 (0~1)
}

export default function FadeInSection({
    children,
    delay = 0,
    threshold = 0.1
}: FadeInSectionProps) {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // 섹션이 뷰포트에 들어오면 visible 상태로 변경
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // 한 번 보이면 observer 해제 (재실행 방지)
                    if (sectionRef.current) {
                        observer.unobserve(sectionRef.current);
                    }
                }
            },
            {
                threshold, // 얼마나 보여야 트리거할지
                rootMargin: '0px', // 뷰포트 여백
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [threshold]);

    return (
        <div
            ref={sectionRef}
            className={`${styles.fadeInSection} ${isVisible ? styles.visible : ''}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

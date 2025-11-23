'use client';

import { useEffect, useRef, useState, ReactElement, Children, cloneElement } from 'react';
import styles from './FadeInSection.module.css';

interface FadeInChildrenProps {
    children: ReactElement | ReactElement[];
    staggerDelay?: number; // 각 자식 요소 간 지연 시간 (ms)
    threshold?: number;
}

export default function FadeInChildren({
    children,
    staggerDelay = 100,
    threshold = 0.1
}: FadeInChildrenProps) {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (sectionRef.current) {
                        observer.unobserve(sectionRef.current);
                    }
                }
            },
            {
                threshold,
                rootMargin: '0px',
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

    const childArray = Children.toArray(children);

    return (
        <div ref={sectionRef}>
            {childArray.map((child, index) => (
                <div
                    key={index}
                    className={`${styles.fadeInSection} ${isVisible ? styles.visible : ''}`}
                    style={{ transitionDelay: `${index * staggerDelay}ms` }}
                >
                    {child}
                </div>
            ))}
        </div>
    );
}

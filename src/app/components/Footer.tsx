import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <div className={styles.container}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/footer.png"
                alt="Footer"
                className={styles.footerImage}
            />
        </div>
    );
}

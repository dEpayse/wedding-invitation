"use client"

import styles from './Location.module.css'
import VerticalSpacer from "@/app/components/common/VerticalSpacer";
import React from "react";
import NaverMap from "@/app/components/map/NaverMap";
import { WEDDING_LOCATION, WEDDING_VENUE_INFO, MAP_CONFIG } from "@/app/constants/wedding";

export default function Location() {
    return (
        <div className={styles.container}>
            <VerticalSpacer size={80}/>
            <p className={styles.locationTitle}>Location</p>
            <div className={styles.mapContainer}>
                <NaverMap 
                    center={WEDDING_LOCATION}
                    zoom={MAP_CONFIG.zoom}
                    width="100%"
                    height="400px"
                    markerInfo={WEDDING_VENUE_INFO}
                    showControls={MAP_CONFIG.showControls}
                    onMapLoad={() => {
                        console.log('🎉 지도 로드 완료! Location.tsx에서 확인');
                    }}
                />
            </div>
        </div>
    );
}

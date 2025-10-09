"use client"

import styles from './Location.module.css'
import VerticalSpacer from "@/app/components/common/VerticalSpacer";
import React from "react";
import NaverMap from "@/app/components/map/NaverMap";
import {WEDDING_LOCATION, WEDDING_VENUE_INFO, MAP_CONFIG, WEDDING_CONVENTION_NAME} from "@/app/constants/wedding";

export default function Location() {
    return (
        <div className={styles.container}>
            <VerticalSpacer size={80}/>
            <p className={styles.locationTitle}>Location</p>
            <VerticalSpacer size={40}/>
            <p className={styles.locationName}>{WEDDING_CONVENTION_NAME}</p>
            <VerticalSpacer size={10}/>
            <p className={styles.locationAddr}>{WEDDING_VENUE_INFO.address}</p>
            <VerticalSpacer size={56}/>
            <div className={styles.mapContainer}>
                <NaverMap
                    center={WEDDING_LOCATION}
                    zoom={MAP_CONFIG.zoom}
                    width="100%"
                    height="230px"
                    markerInfo={WEDDING_VENUE_INFO}
                    showControls={MAP_CONFIG.showControls}
                />
            </div>
        </div>
    );
}

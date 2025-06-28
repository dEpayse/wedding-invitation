"use client"

import styles from './Location.module.css'
import VerticalSpacer from "@/app/components/common/VerticalSpacer";
import React, { useEffect, useRef } from "react";

export default function Location() {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapRef.current || !window.naver) {
            return;
        }

        // 지도 옵션 설정 (웨딩홀 위치로 설정하세요)
        const weddingLat = 37.5800045;
        const weddingLng = 127.0462246;
        
        const mapOptions: naver.maps.MapOptions = {
            center: new naver.maps.LatLng(weddingLat, weddingLng),
            zoom: 16,
            minZoom: 10,
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT,
            },
            mapTypeControl: true,
            mapTypeControlOptions: {
                position: naver.maps.Position.TOP_LEFT,
                mapTypeIds: null,
                style: naver.maps.MapTypeControlStyle.BUTTON
            },
        };

        // 지도 생성
        const map = new naver.maps.Map(mapRef.current, mapOptions);

        // 마커 추가
        const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(weddingLat, weddingLng), // 같은 좌표 사용
            map: map,
            title: '웨딩홀 위치',
        });

        // 정보창 추가
        const infoWindow = new naver.maps.InfoWindow({
            content: `
                <div style="padding: 10px; font-size: 14px;">
                    <strong>강남역 테스트</strong><br/>
                    주소: 서울특별시 강남구 강남대로<br/>
                    <a href="https://map.naver.com/v5/search/강남역" target="_blank">길찾기</a>
                </div>
            `,
        });

        // 마커 클릭시 정보창 열기/닫기
        naver.maps.Event.addListener(marker, 'click', () => {
            if (infoWindow.getMap()) {
                infoWindow.close();
            } else {
                infoWindow.open(map, marker);
            }
        });

        // 컴포넌트 언마운트시 정리
        return () => {
            map.destroy();
        };
    }, []);

    return (
        <div className={styles.container}>
            <VerticalSpacer size={80}/>
            <p className={styles.locationTitle}>Location</p>
            <div 
                ref={mapRef} 
                className={styles.mapContainer}
                style={{ width: '100%', height: '400px' }}
            />
        </div>
    );
}

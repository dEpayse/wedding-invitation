"use client"

import styles from './Location.module.css'
import VerticalSpacer from "@/app/components/common/VerticalSpacer";
import React, { useEffect, useRef } from "react";

export default function Location() {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 네이버 지도 API가 로드되었는지 확인
        if (!mapRef.current || !window.naver) {
            console.error('네이버 지도 API가 로드되지 않았습니다.');
            return;
        }

        // 지도 옵션 설정 (웨딩홀 위치로 설정하세요)
        const mapOptions: naver.maps.MapOptions = {
            center: new naver.maps.LatLng(37.5665, 126.9780), // 서울 시청 좌표 (웨딩홀 좌표로 변경)
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
            position: new naver.maps.LatLng(37.5665, 126.9780), // 웨딩홀 좌표
            map: map,
            title: '웨딩홀 위치',
        });

        // 정보창 추가
        const infoWindow = new naver.maps.InfoWindow({
            content: `
                <div style="padding: 10px; font-size: 14px;">
                    <strong>웨딩홀 이름</strong><br/>
                    주소: 서울특별시 중구 태평로 1가<br/>
                    <a href="https://map.naver.com/v5/search/웨딩홀" target="_blank">길찾기</a>
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

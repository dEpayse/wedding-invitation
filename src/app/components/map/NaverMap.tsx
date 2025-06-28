'use client';

import React, { useEffect, useRef } from 'react';
import MapOptions = naver.maps.MapOptions;

interface NaverMapProps {
  width?: string;
  height?: string;
  zoom?: number;
  center: {
    lat: number;
    lng: number;
  };
  markerInfo?: {
    title: string;
    address: string;
    linkUrl?: string;
    linkText?: string;
  };
  showControls?: boolean;
}

export default function NaverMap({
  width = "100%",
  height = "400px",
  zoom = 16,
  center,
  markerInfo,
  showControls = true,
}: NaverMapProps) {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {

    // 네이버 지도 API가 로드되었는지 확인 (layout.tsx 스크립트 사용)
    if (!mapElement.current || !window.naver) {
      return;
    }
    const mapOptions: MapOptions = {
      center: new window.naver.maps.LatLng(center.lat, center.lng),
      zoom: zoom,
      minZoom: 10,
      zoomControl: showControls,
      zoomControlOptions: showControls ? {
        position: window.naver.maps.Position.TOP_RIGHT,
      } : undefined,
      mapTypeControl: showControls,
      mapTypeControlOptions: showControls ? {
        position: window.naver.maps.Position.TOP_LEFT,
        mapTypeIds: null,
        style: window.naver.maps.MapTypeControlStyle.BUTTON
      } : undefined,
    };

    // 지도 생성
    const map = new window.naver.maps.Map(mapElement.current, mapOptions);

    setTimeout(() => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(center.lat, center.lng),
        map: map,
        title: markerInfo?.title || '위치',
        icon: {
          content: `
            <div style="
              background: #ff4444;
              color: white;
              padding: 8px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: bold;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
              border: 2px solid white;
              position: relative;
            ">
              ${markerInfo?.title || '📍 위치'}
              <div style="
                position: absolute;
                bottom: -8px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-top: 8px solid #ff4444;
              "></div>
            </div>
          `,
          anchor: new window.naver.maps.Point(0, 0)
        }
      });

      // 정보창 추가 (markerInfo가 있을 때만)
      if (markerInfo) {
        const infoWindow = new window.naver.maps.InfoWindow({
          content: `
            <div style="padding: 10px; font-size: 14px;">
              <strong>${markerInfo.title}</strong><br/>
              주소: ${markerInfo.address}<br/>
              ${markerInfo.linkUrl ? `<a href="${markerInfo.linkUrl}" target="_blank">${markerInfo.linkText || '길찾기'}</a>` : ''}
            </div>
          `,
        });

        // 마커 클릭시 정보창 열기/닫기
        window.naver.maps.Event.addListener(marker, 'click', () => {
          if (infoWindow.getMap()) {
            infoWindow.close();
          } else {
            infoWindow.open(map, marker);
          }
        });
      }
    }, 500); // 0.5초 후 마커 추가

    // 컴포넌트 언마운트시 정리
    return () => {
      map.destroy();
    };
  }, [center.lat, center.lng, zoom, markerInfo, showControls]);

  return (
    <div 
      ref={mapElement} 
      style={{ width, height }}
      className="rounded-lg shadow-lg"
    />
  );
}

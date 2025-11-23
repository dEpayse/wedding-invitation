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
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(center.lat, center.lng),
        map: map,
        title: markerInfo?.title || '위치',
        icon: {
          content: `
            <div style="
              background: #111111;
              color: white;
              padding: 10px 10px;
              border-radius: 8px;
              font-size: 14px;
              font-weight: 500;
              box-shadow: 0 10px 15px -3px rgba(17, 17, 17, 0.4);
              border: none;
              transform: translate(-50%, -86%);
              position: relative;
              white-space: nowrap;
              font-family: Arial, Helvetica, sans-serif;
              backdrop-filter: blur(8px);
            ">
              ${markerInfo?.title || '📍 위치'}
              <div style="
                position: absolute;
                bottom: -7px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-top: 8px solid #111111;
              "></div>
            </div>
          `
        }
      });
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

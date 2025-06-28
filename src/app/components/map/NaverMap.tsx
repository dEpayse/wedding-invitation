'use client';

import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    naver: any;
  }
}

interface NaverMapProps {
  width?: string;
  height?: string;
  zoom?: number;
  center?: {
    lat: number;
    lng: number;
  };
}

export default function NaverMap({ 
  width = "100%", 
  height = "400px", 
  zoom = 15,
  center = { lat: 37.5800045, lng: 127.0462246 } // 서울 시청 기본값
}: NaverMapProps) {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 네이버 지도 API 스크립트 동적 로드
    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=0qse53sk6j`;
    script.async = true;
    
    script.onload = () => {
      if (mapElement.current && window.naver) {
        const map = new window.naver.maps.Map(mapElement.current, {
          center: new window.naver.maps.LatLng(center.lat, center.lng),
          zoom: zoom,
          mapTypeId: window.naver.maps.MapTypeId.NORMAL
        });

        // 마커 추가 (선택사항)
        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(center.lat, center.lng),
          map: map
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      // 클린업
      document.head.removeChild(script);
    };
  }, [center.lat, center.lng, zoom]);

  return (
    <div 
      ref={mapElement} 
      style={{ width, height }}
      className="rounded-lg shadow-lg"
    />
  );
}

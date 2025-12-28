// 교통 정보 타입 정의
export interface BusLine {
  type: "trunk" | "branch" | "seat" | "direct" | "airport";
  label: string;
  color: string;
  routes: string;
}

export interface SubwayLine {
  name: string;
  color: string;
}

// 자차 정보
export const SELF_DRIVING_INFO = {
  description: "내비게이션 : 'L65호텔웨딩컨벤션' 또는 '청량리역 5번출구' 검색",
  parkingEntrance: "청량리역 5번 출구로 오시면 주차장 입구가 보입니다.",
};

// 버스 정보
export const BUS_INFO = {
  stop: "청량리역환승센터 하차",
  lines: [
    {
      type: "trunk" as const,
      label: "간선버스",
      color: "#4c63e6",
      routes: "105, 120, 121, 147, 202, 241, 260, 261, 270, 271, 272, 420, 720",
    },
    {
      type: "branch" as const,
      label: "지선버스",
      color: "#2fc646",
      routes: "1213, 1222, 1224, 1227, 2115, 2230, 3216, 3220, 51, 65, 166, 170, 707",
    },
    {
      type: "seat" as const,
      label: "좌석버스",
      color: "#8e2ed1",
      routes: "330-1",
    },
    {
      type: "direct" as const,
      label: "직행버스",
      color: "#fa5a58",
      routes: "1330-2, 1330-3, 1330-4, 1330-44, 3200, 8500",
    },
    {
      type: "airport" as const,
      label: "공항버스",
      color: "#6ba4d1",
      routes: "6002",
    },
  ],
};

// 지하철 정보
export const SUBWAY_INFO = {
  lines: [
    {
      name: "1호선",
      color: "#4352bb",
      exit: "청량리역 5번 출구 바로 앞",
    },
    {
      name: "경의중앙",
      color: "#409e9d",
      exit: "청량리역 1번 출구 바로 앞",
    },
    {
      name: "수인분당",
      color: "#fc9d22",
      exit: "청량리역 1번 출구 바로 앞",
    },
    {
      name: "경춘선",
      color: "#87d8be",
      exit: "청량리역 1번 출구 바로 앞",
    },
  ],
};

// 주차 정보
export const PARKING_INFO = {
  description: [
    "지하 3층, 4층만 주차 가능합니다.",
    "지하 2층은 주차가 불가능합니다.",
    "1시간 30분 무료로 사용 가능하고, 이후는 주차 요금이 발생합니다.",
    "주차장이 혼잡하오니 대중교통을 이용하여 주시기 바랍니다.",
  ],
};

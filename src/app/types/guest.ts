// 하객 측 (신랑/신부)
export enum GuestSide {
    GROOM = 'GROOM',
    BRIDE = 'BRIDE',
}

// 하객 정보 인터페이스
export interface GuestFormData {
    side: GuestSide | '';
    willAttend: boolean | null;
    name: string;
    phoneLastDigits: string;
}

// API 요청 타입
export interface WeddingGuestRequest {
    side: GuestSide;
    willAttend: boolean;
    name: string;
    phoneLastDigits: string | null;
}

// API 응답 타입
export interface WeddingGuestResponse {
    id: number;
    name: string;
    phoneLastDigits: string | null;
    side: GuestSide;
    willAttend: boolean;
    message: string | null;
    createdAt: string;
    updatedAt: string;
}

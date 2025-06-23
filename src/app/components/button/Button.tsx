import React, { ButtonHTMLAttributes } from 'react';

/**
 * Button 컴포넌트의 속성 인터페이스
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 배경색
   * CSS 변수 시스템에서 정의된 색상을 사용하거나 직접 색상값을 지정할 수 있습니다.
   * @example palette.primary, palette.heart, gradients.wedding, "#ff6b6b"
   */
  backgroundColor?: string;
  /**
   * 버튼 모서리 반지름
   * @example "20px" 또는 12
   */
  radius?: string | number;
  /**
   * 버튼 내부 콘텐츠
   */
  children: React.ReactNode;
}

/**
 * 재사용 가능한 Button 컴포넌트
 *
 * CSS Variables 시스템과 완전히 연동되어 CSS와 JavaScript에서
 * 동일한 색상값을 사용할 수 있습니다.
 *
 * @param children
 * @param className
 * @param style
 * @param props - 버튼 컴포넌트 속성
 * @returns 버튼 컴포넌트
 *
 */
export default function Button({
  children,
  className,
  style,
  ...props
}: ButtonProps) {
  const buttonStyle: React.CSSProperties = {
    ...style,
  };

  const buttonClasses = [
    'button',    // 기본 버튼 스타일
    className         // 외부에서 전달받은 추가 클래스
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      style={buttonStyle}
      {...props}
    >
      {children}
    </button>
  );
}

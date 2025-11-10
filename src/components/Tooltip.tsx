interface TooltipProps {
  children: React.ReactNode;
  text: string;
}

export function Tooltip({ children, text }: TooltipProps) {
  return (
    <span className="tooltip-wrapper">
      {children}
      <span className="tooltip-icon">ⓘ</span>
      <span className="tooltip-text">{text}</span>
    </span>
  );
}

"use client";

interface StickyResultBarProps {
  label: string;
  value: string;
  subValue?: string;
  visible: boolean;
}

export default function StickyResultBar({
  label,
  value,
  subValue,
  visible,
}: StickyResultBarProps) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      <div className="bg-emerald-600 text-white px-4 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-emerald-200 text-xs font-medium uppercase tracking-wide">
            {label}
          </span>
          <span className="text-xl font-extrabold">{value}</span>
        </div>
        {subValue && (
          <span className="text-emerald-200 text-sm font-medium">
            {subValue}
          </span>
        )}
      </div>
    </div>
  );
}

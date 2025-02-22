import { useState } from "react";

export interface LanguageSelectProps {
  width: string;
  value: number;
  onChange: (selectItem: { label: string; value: number }) => void;
}

export function LanguageSelect({
  width,
  value,
  onChange,
}: LanguageSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    {
      label: "日本語",
      value: 1,
    },
    {
      label: "英語",
      value: 2,
    },
    {
      label: "中国語",
      value: 3,
    },
    {
      label: "韓国語",
      value: 4,
    },
  ];

  return (
    <div className="relative" style={{ width: width }}>
      {isOpen && (
        <div className="absolute w-full bottom-full left-0 flex flex-col rounded-t-lg border border-text overflow-hidden">
          {options
            .filter((option) => option.value !== value)
            .map((option, index) => (
              <button
                className={`bg-baseColor [&:not(:last-child)]:border-b border-text py-2 ${
                  option.value === value ? "hidden" : ""
                }`}
                key={index}
                onClick={() => {
                  setIsOpen(false);
                  onChange(option);
                }}
              >
                {option.label}
              </button>
            ))}
        </div>
      )}
      <button
        className={`w-full py-2 font-bold border-text transition duration-300 flex items-center justify-center gap-2 ${
          isOpen
            ? "bg-accent text-baseColor rounded-b-lg"
            : "bg-baseColor text-text border-b"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.find((options) => options.value === value)?.label || "Select"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
        </svg>
      </button>
    </div>
  );
}

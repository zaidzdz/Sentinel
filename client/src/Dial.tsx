import { useEffect, useState } from "react";
interface DialProps {
  name: string;
  description?: string;
  metric: number;
}

export default function Dial({ name, description, metric }: DialProps) {
  const [percent, setPercent] = useState(0.55);

  useEffect(
    function () {
      setPercent(metric);
    },
    [metric],
  );

  return (
    <div className="w-50 h-50 bg-panel rounded-ui m-2 flex flex-col overflow-hidden border-line border hover:border-accent transition-all duration-200 ease-in-out relative">
      <p className="text-fg-faint px-4 pt-3 pb-0 m-0">{name}</p>
      <svg className="h-full w-auto" viewBox="0 0 100 100">
        <circle
          r={35}
          cx={50}
          cy={55}
          fill="none"
          strokeWidth={11}
          stroke="var(--panel-2)"
        ></circle>
        <circle
          r={35}
          cx={50}
          cy={55}
          fill="none"
          strokeWidth={11}
          strokeDasharray={35 * 2 * Math.PI}
          strokeDashoffset={35 * 2 * Math.PI * (1 - metric)}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.3s ease" }}
          stroke="var(--accent)"
        ></circle>
      </svg>
      <div className="flex flex-row flex-1">
        <div className="absolute flex flex-col right-5 top-2 right0 ">
          <span className="text-fg-soft font-mono text-2xl font-bold">
            {Math.round(100 * percent)}%
          </span>
          <span className="text-fg-faint text-xs">{description}</span>
        </div>
      </div>
    </div>
  );
}

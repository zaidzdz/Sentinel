import { useEffect, useState } from "react";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
interface GraphProps {
  name: string;
  description?: string;
  metric: number;
}

export default function Graph({ name, description, metric }: GraphProps) {
  const [percent, setPercent] = useState(0.55);
  const [history, setHistory] = useState<number[]>([]);

  useEffect(
    function () {
      setHistory((history) => [...history.slice(-30), metric]);
      setPercent(metric);
    },
    [metric],
  );
  const data = history.map((v, i) => ({ t: i, cpu: v }));

  return (
    <div className="w-80 h-40 bg-panel rounded-ui m-2 flex flex-col overflow-hidden border-line border hover:border-accent transition-all duration-200 ease-in-out relative">
      <p className="text-fg-faint px-4 pt-3 pb-0 m-0">{name}</p>
      <div className="flex flex-row flex-1">
        <svg className="h-full w-auto" viewBox="0 0 100 100"></svg>
        <div className="absolute flex flex-col right-5 top-2 right0 ">
          <span className="text-fg-soft font-mono text-2xl font-bold">
            {Math.round(100 * percent)}%
          </span>
          <span className="text-fg-faint text-xs">{description}</span>
        </div>
        <div className="absolute bottom-0 right-0">
          <AreaChart
            width={320}
            height={100}
            data={data}
            margin={{ top: 0, right: 0, bottom: -20, left: -5 }}
          >
            <Area
              type="monotone"
              dataKey="cpu"
              stroke="var(--accent)"
              fill="var(--accent)"
              fillOpacity={0.14}
              strokeWidth={1.5}
              dot={false}
              activeDot={false}
            />
          </AreaChart>
        </div>
      </div>
    </div>
  );
}

import { ServerType } from "./types";
interface ServerProps {
  server: ServerType;
  cpu: number;
  selected: boolean;
  onClick: (name: string) => void;
}

export default function Server({
  server,
  cpu,
  selected,
  onClick,
}: ServerProps) {
  return (
    <button
      onClick={() => onClick(server.name)}
      className={`cursor-pointer flex my-2 px-4 py-2 border border-line items-center gap-2 w-full transition-all duration-200 rounded-lg
          ${selected ? "bg-accent/14 border-accent/35 text-fg" : "hover:bg-panel-2 text-fg-soft"}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      >
        <rect x="1.5" y="2.5" width="13" height="4.4" rx="1.2" />
        <rect x="1.5" y="9.1" width="13" height="4.4" rx="1.2" />
        <circle cx="4.4" cy="4.7" r="0.5" fill="currentColor" />
        <circle cx="4.4" cy="11.3" r="0.5" fill="currentColor" />
      </svg>
      <div className="flex flex-col min-w-0 text-left leading-tight">
        <span className="text-sm font-medium truncate">{server.name}</span>
        <span className="text-[12px] font-mono text-fg-faint truncate">
          {server.ip}
        </span>
      </div>
      <span className="ml-auto text-xs font-mono text-fg-faint shrink-0">
        {(cpu * 100).toFixed(2)}%
      </span>
      <svg width="16" height="16" viewBox="0 0 16 16">
        <circle
          cx="8"
          cy="8"
          r="3.5"
          fill={cpu <= 0.5 ? "var(--good)" : "var(--warn)"}
        />
      </svg>
    </button>
  );
}

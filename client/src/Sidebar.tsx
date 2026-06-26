import { useState } from "react";
import { toast } from "sonner";
import Server from "./Server";
import { MetricsType, ServerType } from "./types";

interface SidebarProps {
  servers: ServerType[];
  setServers: React.Dispatch<React.SetStateAction<ServerType[]>>;
  metrics: Record<string, MetricsType>;
  setCurrentServer: React.Dispatch<
    React.SetStateAction<ServerType | undefined>
  >;
  currentServer: ServerType | undefined;
}
export default function Sidebar({
  servers,
  setServers,
  metrics,
  setCurrentServer, //set ip of current server
  currentServer, //ip
}: SidebarProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [ip, setIP] = useState("");

  return (
    <>
      <aside className="w-60 border-r border-line bg-panel flex flex-col h-full">
        <h1 className="text-xl text-fg-soft px-5 py-3 border-b-1 border-line bg-panel-2">
          Sentinel
        </h1>
        <nav className="flex-1 overflow-y-auto px-2 py-1">
          {servers.map((server, i) => (
            <Server
              key={i}
              server={server}
              cpu={metrics[server.ip]?.cpu}
              selected={currentServer?.ip === server.ip}
              onClick={() => {
                setCurrentServer(server);
              }}
            />
          ))}
        </nav>
        <div className="border-t border-line bg-panel-2">
          <button
            onClick={() => setOpen(true)}
            className="mx-3 mb-3 mt-3 px-4 py-2.5 bg-transparent border border-line text-fg-soft font-medium text-sm rounded-lg w-[calc(100%-1.5rem)] transition-colors duration-150 hover:border-accent hover:bg-panel-2 hover:text-fg cursor-pointer"
          >
            Add New Server
          </button>
        </div>
      </aside>
      {open && (
        <div className="fixed flex items-center justify-center inset-0 bg-bg/60 backdrop-blur-[2px] z-3 transition-all duration-75">
          <div className="bg-panel rounded-ui border border-line py-3 px-5 w-96 flex flex-col items-start gap-3">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-fg-soft font-semibold text-lg">
                Add new server
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-fg-soft transition-all duration-150 bg-panel-2 border border-line text-lg px-2 rounded-md cursor-pointer hover:border-accent hover:bg-line-soft hover:text-fg"
              >
                ✕
              </button>
            </div>

            <input
              className="w-full bg-panel-2 px-3 py-2 border border-line rounded-lg outline-none transition-colors duration-150 hover:border-fg-faint focus:border-accent caret-fg-faint text-fg text-sm placeholder:text-fg-faint"
              value={name}
              onChange={function (e) {
                setName(e.target.value);
              }}
              placeholder="Server name"
            ></input>
            <input
              className="w-full bg-panel-2 px-3 py-2 border border-line rounded-lg outline-none transition-colors duration-150 hover:border-fg-faint focus:border-accent caret-fg-faint text-fg text-sm placeholder:text-fg-faint"
              value={ip}
              onChange={function (e) {
                setIP(e.target.value);
              }}
              placeholder="IP address"
            ></input>
            <button
              onClick={function () {
                let hasError = false;
                if (name == "") {
                  toast.error("Error", {
                    icon: null,
                    description: "Server must have a name",
                    dismissible: false,
                    duration: 1000,
                  });
                  hasError = true;
                }
                if (ip == "") {
                  toast.error("Error", {
                    icon: null,
                    description: "Server must have an IP",
                    dismissible: false,
                    duration: 1000,
                  });
                  hasError = true;
                }
                if (servers.some((s) => s.ip == ip)) {
                  toast.error("Error", {
                    icon: null,
                    description: 'IP "' + ip + '" already added',
                    dismissible: false,
                    duration: 1000,
                  });
                  hasError = true;
                }
                if (hasError) return;

                setServers((prev) => [...prev, { name, ip }]);
                setCurrentServer({ name, ip });

                setOpen(false);
                toast("Added new server", {
                  dismissible: false,
                  description: ip,
                });
                setName("");
                setIP("");
              }}
              className="text-fg-soft transition-all duration-150 bg-panel-2 border border-line text-lg w-full py-2 rounded-md cursor-pointer hover:border-accent hover:bg-line-soft hover:text-fg"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </>
  );
}

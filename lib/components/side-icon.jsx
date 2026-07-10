import * as Uebersicht from "uebersicht";
import * as Icons from "./icons/icons.jsx";
import { SuspenseIcon } from "./icons/icon.jsx";

const { React } = Uebersicht;

export { sideIconStyles as styles } from "../../lib/styles/components/side-icon";

const APPLE_MENU_CMD = "$HOME/.config/ubersicht/bin/apple-menu";

export function Component() {
  const onClick = () => {
    Uebersicht.run(`${APPLE_MENU_CMD} &`);
  };

  return (
    <div className="apple-menu">
      <button className="apple-menu__trigger" onClick={onClick}>
        <SuspenseIcon>
          <Icons.Apple className="apple-menu__icon" />
        </SuspenseIcon>
      </button>
    </div>
  );
}

// --- HTML dropdown (disabled — Übersicht widgets render below app windows) ---
// To re-enable: replace the Component above with this version once Übersicht
// supports above-window rendering or a workaround is found.
/*
const MENU_ITEMS = [
  { label: "About This Mac", command: "open -a 'About This Mac' || open 'x-apple.systempreferences:com.apple.SystemProfiler.AboutExtension'" },
  { type: "separator" },
  { label: "System Settings...", command: "open -a 'System Settings'" },
  { type: "separator" },
  { label: "Sleep", command: "pmset sleepnow" },
  { label: "Restart...", command: "osascript -e 'tell app \"loginwindow\" to «event aevtrrst»'" },
  { label: "Shut Down...", command: "osascript -e 'tell app \"loginwindow\" to «event aevtrsdn»'" },
  { type: "separator" },
  { label: "Lock Screen", command: "pmset displaysleepnow" },
  { label: "Log Out...", command: "osascript -e 'tell app \"loginwindow\" to «event aevtrlgo»'" },
];

export function ComponentHTML() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef();

  React.useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleItemClick = async (item) => {
    setOpen(false);
    if (item.command) await Uebersicht.run(item.command);
  };

  return (
    <div className="apple-menu" ref={ref}>
      <button className="apple-menu__trigger" onClick={() => setOpen(!open)}>
        <SuspenseIcon>
          <Icons.Apple className="apple-menu__icon" />
        </SuspenseIcon>
      </button>
      {open && (
        <div className="apple-menu__dropdown">
          {MENU_ITEMS.map((item, i) =>
            item.type === "separator" ? (
              <div key={i} className="apple-menu__separator" />
            ) : (
              <button
                key={i}
                className="apple-menu__item"
                onClick={() => handleItemClick(item)}
              >
                {item.label}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}
*/

import * as Uebersicht from "uebersicht";
import * as Utils from "../../utils";

const { React } = Uebersicht;

const Mode = React.memo(() => {
  const [mode, setMode] = React.useState("");

  const getMode = React.useCallback(async () => {
    const output = await Uebersicht.run(
      `cat /tmp/aerospace-mode 2>/dev/null || echo main`
    );
    const cleaned = Utils.cleanupOutput(output).trim();
    setMode(cleaned === "main" ? "" : cleaned);
  }, []);

  React.useEffect(() => {
    getMode();
    const interval = setInterval(getMode, 1000);
    return () => clearInterval(interval);
  }, [getMode]);

  if (!mode) return null;

  return (
    <div className="aerospace-mode">
      <span className="aerospace-mode__label">{mode}</span>
    </div>
  );
});

Mode.displayName = "AerospaceMode";

export default Mode;

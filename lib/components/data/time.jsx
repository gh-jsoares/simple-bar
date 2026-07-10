import * as Uebersicht from "uebersicht";
import * as DataWidget from "./data-widget.jsx";
import * as DataWidgetLoader from "./data-widget-loader.jsx";
import useWidgetRefresh from "../../hooks/use-widget-refresh";
import useServerSocket from "../../hooks/use-server-socket";
import { useSimpleBarContext } from "../simple-bar-context.jsx";
import * as Utils from "../../utils";

export { timeStyles as styles } from "../../styles/components/data/time";

const { React } = Uebersicht;

const DEFAULT_REFRESH_FREQUENCY = 1000;

/**
 * Time widget component.
 * @returns {JSX.Element|null} The rendered widget.
 */
export const Widget = React.memo(() => {
  const { displayIndex, settings } = useSimpleBarContext();
  const { widgets, timeWidgetOptions } = settings;
  const { timeWidget } = widgets;
  const {
    refreshFrequency,
    hour12,
    dayProgress,
    showSeconds,
    showOnDisplay,
    showIcon,
  } = timeWidgetOptions;

  // Determine if the widget should be visible on the current display
  const visible =
    Utils.isVisibleOnDisplay(displayIndex, showOnDisplay) && timeWidget;

  // Calculate the refresh frequency for the widget
  const refresh = React.useMemo(
    () =>
      Utils.getRefreshFrequency(refreshFrequency, DEFAULT_REFRESH_FREQUENCY),
    [refreshFrequency],
  );

  const [state, setState] = React.useState();
  const [loading, setLoading] = React.useState(visible);

  // Options for formatting the time string
  const options = React.useMemo(
    () => ({
      hour: "numeric",
      minute: "numeric",
      hour12,
    }),
    [hour12],
  );

  const optionsWithSeconds = React.useMemo(
    () => ({
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12,
    }),
    [hour12],
  );

  /**
   * Resets the widget state.
   */
  const resetWidget = () => {
    setState(undefined);
    setLoading(false);
  };

  /**
   * Fetches the current time and updates the widget state.
   */
  const getTime = React.useCallback(() => {
    if (!visible) return;
    const now = new Date();
    const time = now.toLocaleString("en-UK", options);
    const timeWithSeconds = now.toLocaleString("en-UK", optionsWithSeconds);
    setState({ time, timeWithSeconds });
    setLoading(false);
  }, [visible, options, optionsWithSeconds]);

  // Use server socket to get time updates
  useServerSocket("time", visible, getTime, resetWidget, setLoading);
  // Refresh the widget at the specified interval
  useWidgetRefresh(visible, getTime, refresh);

  if (loading) return <DataWidgetLoader.Widget className="time" />;
  if (!state) return null;
  const { time, timeWithSeconds } = state;

  // Calculate the progress of the current day
  const [dayStart, dayEnd] = [new Date(), new Date()];
  dayStart.setHours(0, 0, 0);
  dayEnd.setHours(0, 0, 0);
  dayEnd.setDate(dayEnd.getDate() + 1);
  const range = dayEnd - dayStart;
  const diff = Math.max(0, dayEnd - new Date());
  const fillerWidth = (100 - (100 * diff) / range) / 100;

  /**
   * Icon component for the time widget.
   * @returns {JSX.Element} The rendered icon.
   */
  const TimeIcon = () => {
    return <Icon time={time} />;
  };

  return (
    <DataWidget.Widget
      classes="time"
      Icon={showIcon ? TimeIcon : null}
      disableSlider
    >
      {time}<span className="time__seconds">:{timeWithSeconds.split(":")[2]}</span>
      {dayProgress && (
        <div
          className="time__filler"
          style={{ transform: `scaleX(${fillerWidth})` }}
        />
      )}
    </DataWidget.Widget>
  );
});

Widget.displayName = "Time";

/**
 * Icon component for displaying the time as a clock.
 * @param {Object} props - The component props.
 * @param {string} props.time - The current time string.
 * @returns {JSX.Element} The rendered icon.
 */
function Icon({ time }) {
  const [hours, minutes] = time.split(":");

  const hoursInDegree = ((parseInt(hours, 10) % 12) / 12) * 360;
  const minutesInDegree = (parseInt(minutes, 10) / 60) * 360;

  return (
    <div className="time__icon">
      <div
        className="time__hours"
        style={{ transform: `rotate(${hoursInDegree}deg)` }}
      />
      <div
        className="time__minutes"
        style={{ transform: `rotate(${minutesInDegree}deg)` }}
      />
    </div>
  );
}

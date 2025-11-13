// bring in React hooks we need
import { useEffect, useMemo, useRef, useState } from "react";

// small helpers ---------------------------------------------------------------

// pad a number like 7 -> "07"
const pad = (n) => String(n).padStart(2, "0");

// turn a Date into an ISO key like "2025-10-30"
const toKey = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export default function CallyWithEvents() {
  // a ref to the <calendar-date> custom element in the DOM
  const calRef = useRef(null);

  // selectedDate: which day is currently selected in the calendar
  const [selectedDate, setSelectedDate] = useState(new Date());

  // events: an object keyed by "YYYY-MM-DD" -> array of events for that day
  // we seed it with one example on "today"
  const [events, setEvents] = useState({
    [toKey(new Date())]: [{ id: "e1", title: "Appointment with John Smith" }],
  });

  // controlled input text for the "Add event…" field
  const [newTitle, setNewTitle] = useState("");

  // derive the string key for the selectedDate, recompute only when it changes
  const selectedKey = useMemo(() => toKey(selectedDate), [selectedDate]);

  // get the events for the selected day (or empty array)
  const dayEvents = events[selectedKey] ?? [];

  // EFFECT 1: listen to the cally calendar selecting a date -------------------
  useEffect(() => {
    const el = calRef.current; // the <calendar-date> DOM node
    if (!el) return;

    // handler when the calendar changes selection
    const onChange = (e) => {
      // different cally builds expose the iso string in different places:
      // prefer custom event detail, then target.value, then the attribute
      const iso =
        e.detail?.value || e.target?.value || el.getAttribute("value");
      if (!iso) return;

      // parse "YYYY-MM-DD" into a JS Date and store in state
      const [y, m, d] = iso.split("-").map(Number);
      setSelectedDate(new Date(y, m - 1, d));
    };

    // attach listener to the custom element (not React's onChange)
    el.addEventListener("change", onChange);
    // (if your cally uses a different event name, add it here too)

    // cleanup on unmount
    return () => el.removeEventListener("change", onChange);
  }, []); // run once after mount

  // EFFECT 2: push React's selected date *into* the calendar ------------------
  useEffect(() => {
    const el = calRef.current;
    if (!el) return;

    const iso = selectedKey; // "YYYY-MM-DD"
    // set both the property and the attribute (covers cally versions)
    try {
      el.value = iso;
    } catch {}
    el.setAttribute("value", iso);
  }, [selectedKey]); // run whenever the selected date changes

  // add a new event to the currently selected day -----------------------------
  const addEvent = () => {
    const title = newTitle.trim(); // ignore blank input
    if (!title) return;
    const evt = {
      // build a new event object
      id: crypto.randomUUID?.() ?? String(Date.now()),
      title,
    };

    // immutably update the events map for selectedKey
    setEvents((prev) => {
      const arr = prev[selectedKey] ? [...prev[selectedKey], evt] : [evt];
      return { ...prev, [selectedKey]: arr };
    });

    setNewTitle(""); // clear the input
  };

  const toCellKeyUTC = (d) =>
    `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getUTCDate()).padStart(2, "0")}`;

  // 3) Decorate days (dots) based on events
  useEffect(() => {
    const el = calRef.current;
    if (!el) return;

    const eventDates = new Set(Object.keys(events));

    el.getDayParts = (date) => {
      const key = toCellKeyUTC(date);
      return eventDates.has(key) ? "has-event" : "";
    };

    const v = el.getAttribute("value");
    el.setAttribute("value", v || "");
  }, [events]);

  // delete an event by id from the selected day -------------------------------
  const deleteEvent = (id) => {
    setEvents((prev) => {
      // remove it from that day's array
      const arr = (prev[selectedKey] ?? []).filter((e) => e.id !== id);
      const next = { ...prev };
      if (arr.length) next[selectedKey] = arr; // keep day if still has events
      else delete next[selectedKey]; // otherwise remove the key entirely
      return next;
    });
  };

  // UI ------------------------------------------------------------------------
  return (
    // two-row grid: row 1 (calendar) auto height, row 2 (list) fills & scrolls
    <div className="grid grid-rows-[auto,1fr] gap-3 h-120 min-w-0">
      {/* row 1 — the cally calendar; ref gives us a handle to the DOM node */}
      <calendar-date
        ref={calRef}
        className="block w-full max-w-none bg-base-100 border border-base-300 shadow-lg rounded-box"
        value={toKey(selectedDate)}
      >
        {/* slotted prev/next icons that cally expects */}
        <svg
          slot="previous"
          aria-label="Previous"
          viewBox="0 0 24 24"
          width="16"
          height="16"
        >
          <path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>

        <svg
          slot="next"
          aria-label="Next"
          viewBox="0 0 24 24"
          width="16"
          height="16"
        >
          <path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>

        {/* custom heading content */}
        <span slot="heading">
          {selectedDate.toLocaleString(undefined, { month: "long" })}{" "}
          {selectedDate.getFullYear()}
        </span>
        <calendar-month></calendar-month>
      </calendar-date>

      {/* row 2 — scrollable events for the selected date */}
      <div className="bg-base-100 border border-base-300 rounded-box p-3 overflow-y-auto min-h-0">
        <div className="flex">
          {/* show the selected date */}
          <div className="mb-2 font-semibold">
            {(() => {
              const [y, m, d] = selectedKey.split("-").map(Number);
              const local = new Date(y, m - 1, d);
              return local.toLocaleDateString();
            })()}
          </div>
          {/* add-event input + button */}
          <div className="mb-2 ml-auto flex gap-2">
            <input
              className="input input-sm input-bordered w-full"
              placeholder="Add event…"
              value={newTitle} // controlled input
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addEvent()} // submit on Enter
            />
            <button className="btn btn-sm btn-neutral" onClick={addEvent}>
              Add
            </button>
          </div>
        </div>

        {/* list of events (or an empty message) */}
        {dayEvents.length === 0 ? (
          <p className="text-sm opacity-70">No events.</p>
        ) : (
          <ul className="space-y-2">
            {dayEvents.map((evt) => (
              <li key={evt.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-600" />
                  <span>{evt.title}</span>
                </div>
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => deleteEvent(evt.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

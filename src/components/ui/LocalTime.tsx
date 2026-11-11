"use client";
import { useEffect, useState } from "react";

/** Shows the current time in Edmonton, ticking every 20s. Renders the city alone on the server. */
export default function LocalTime({ bare = false }: { bare?: boolean }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-CA", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/Edmonton",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);

  if (bare) return <span>{time ?? "Edmonton"}</span>;
  return <span>{time ? `${time} in Edmonton, AB` : "Edmonton, AB"}</span>;
}

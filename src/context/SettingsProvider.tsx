import React, { useState } from "react";
import SettingsContext, { ISettings } from "./SettingsContext";

export default function SettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [config, setConfig] = useState<ISettings>({
    color: {
      bg: "bg-brand-red",
      text: "text-brand-red",
      stroke: "stroke-brand-red",
    },
    font: "font-kumbh",
    time: {
      pomodoro: 15,
      shortBreak: 5,
      longBreak: 25,
    },
  });
  return (
    <SettingsContext.Provider
      value={{ settings: config, setSettings: setConfig }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

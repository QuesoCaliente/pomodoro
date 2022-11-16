import { createContext, Dispatch, SetStateAction } from "react";

export interface ISettings {
  color: {
    bg: "bg-brand-red" | "bg-brand-blue" | "bg-brand-purple";
    text: "text-brand-red" | "text-brand-blue" | "text-brand-purple";
    stroke: "stroke-brand-red" | "stroke-brand-blue" | "stroke-brand-purple";
  };
  font: "font-kumbh" | "font-roboslab" | "font-spacemono";
  time: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
  };
}

export interface ISettingsContext {
  settings: ISettings;
  setSettings: Dispatch<SetStateAction<ISettings>>;
}

const SettingsContext = createContext<ISettingsContext | null>(null);

export default SettingsContext;

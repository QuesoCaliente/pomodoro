import Head from "next/head";
import Image from "next/image";
import Header from "../components/header";
import ProgressCircle from "../components/progressCircle";
import styles from "../styles/Home.module.css";
import configIcon from "../../public/icon-settings.svg";
import Modal from "../components/modal";
import { useState } from "react";
import { ColorSettings, FontSettings } from "../core/settings/interface";
import useSettings from "../utils/hooks/useSettings";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const settings = useSettings();
  const [config, setConfig] = useState(settings?.settings);
  const [activeColor, setActiveColor] = useState("red");
  const [activeFont, setActiveFont] = useState("kumbh");
  const [activeMode, setActiveMode] = useState("pomodoro");

  const handleClose = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <Head>
        <title>Pomodoro App</title>
      </Head>
      <Modal onClose={handleClose} visible={isVisible} title="Settings">
        {/* Pomodo Timers */}
        <h2
          className={`pb-3 text-center ${settings?.settings.font} text-[11px] font-bold tracking-[4.23px] text-brand-bg-200 md:self-start md:text-[13px] md:tracking-[5px]`}
        >
          Time (Minutes)
        </h2>
        <div className="flex flex-col gap-2 border-b-2 border-b-[#E3E1E1] pb-5 md:flex-row md:justify-between">
          <PomodoInputTimeItem
            onChange={(value) =>
              setConfig({
                ...config!,
                time: {
                  ...config?.time!,
                  pomodoro: value,
                },
              })
            }
            time={config?.time.pomodoro!}
            title="pomodoro"
          />
          <PomodoInputTimeItem
            onChange={(value) =>
              setConfig({
                ...config!,
                time: {
                  ...config?.time!,
                  shortBreak: value,
                },
              })
            }
            time={config?.time.shortBreak!}
            title="short break"
          />
          <PomodoInputTimeItem
            onChange={(value) =>
              setConfig({
                ...config!,
                time: {
                  ...config?.time!,
                  longBreak: value,
                },
              })
            }
            time={config?.time.longBreak!}
            title="long break"
          />
        </div>
        <div className="w-full md:flex md:items-center md:justify-between">
          <h2
            className={`py-3 text-center ${settings?.settings.font} text-[11px] font-bold tracking-[4.23px] text-brand-bg-200 md:text-[13px] md:tracking-[5px]`}
          >
            FONT
          </h2>
          <div className="flex items-center justify-center gap-3  py-3 md:py-8">
            <FontButton
              onClick={() => {
                setActiveFont("kumbh");
                setConfig({ ...config!, font: "font-kumbh" });
              }}
              active={activeFont === "kumbh"}
              font="kumbh"
              title="Aa"
            />
            <FontButton
              onClick={() => {
                setActiveFont("roboslab");
                setConfig({ ...config!, font: "font-roboslab" });
              }}
              active={activeFont === "roboslab"}
              font="roboslab"
              title="Aa"
            />
            <FontButton
              onClick={() => {
                setActiveFont("spacemono");
                setConfig({ ...config!, font: "font-spacemono" });
              }}
              active={activeFont === "spacemono"}
              font="spacemono"
              title="Aa"
            />
          </div>
        </div>
        <div className="w-full border-b-2 border-b-[#E3E1E1]"></div>
        <div className="w-full md:my-5 md:flex md:items-center md:justify-between">
          <h2
            className={`py-3 text-center ${settings?.settings.font} text-[11px] font-bold tracking-[4.23px] text-brand-bg-200 md:text-[13px]`}
          >
            COLOR
          </h2>
          <div className="flex justify-center gap-3">
            <ColorButton
              onClick={() => {
                setActiveColor("red");
                setConfig({
                  ...config!,
                  color: {
                    bg: "bg-brand-red",
                    text: "text-brand-red",
                    stroke: "stroke-brand-red",
                  },
                });
              }}
              active={activeColor === "red"}
              color="red"
            />
            <ColorButton
              onClick={() => {
                setActiveColor("lightblue");
                setConfig({
                  ...config!,
                  color: {
                    bg: "bg-brand-blue",
                    text: "text-brand-blue",
                    stroke: "stroke-brand-blue",
                  },
                });
              }}
              active={activeColor === "lightblue"}
              color="lightblue"
            />
            <ColorButton
              onClick={() => {
                setActiveColor("purple");
                setConfig({
                  ...config!,
                  color: {
                    bg: "bg-brand-purple",
                    text: "text-brand-purple",
                    stroke: "stroke-brand-purple",
                  },
                });
              }}
              active={activeColor === "purple"}
              color="purple"
            />
          </div>
        </div>
        <button
          onClick={() => settings?.setSettings(config!)}
          className={`relative -bottom-10 rounded-full  hover:brightness-125  ${settings?.settings.color.bg} px-10 py-3 ${settings?.settings.font} text-[16px] font-bold text-brand-gray-100 md:w-[140px]`}
        >
          Apply
        </button>
      </Modal>
      <div className="flex h-screen flex-col">
        <Header onActiveChange={(item) => setActiveMode(item)}>
          <>
            <span className="flex items-center gap-5">
              pomodoro
              <div className="flex items-center">
                <span className="text-xs">by</span>
                <Image
                  alt="quesocaliente"
                  width={80}
                  height={80}
                  src={"/quesocaliente.png"}
                />
              </div>
            </span>
          </>
        </Header>
        <section className="mt-20 mb-10 flex flex-[3] flex-col items-center justify-between">
          <div className={`${activeMode != "pomodoro" && "hidden"}`}>
            <ProgressCircle type="pomodoro" />
          </div>
          <div className={`${activeMode != "short break" && "hidden"}`}>
            <ProgressCircle type="shortBreak" />
          </div>
          <div className={`${activeMode != "long break" && "hidden"}`}>
            <ProgressCircle type="longBreak" />
          </div>
          <Image
            className="cursor-pointer"
            onClick={handleClose}
            alt="settings"
            src={configIcon}
          />
        </section>
      </div>
    </>
  );
}

const PomodoInputTimeItem = ({
  title,
  onChange,
  time,
}: {
  title: string;
  time: number;
  onChange?: (value: number) => void;
}) => {
  return (
    <div className="flex items-center justify-between md:flex-col md:items-start">
      <span className="font-kumbh text-[12px] font-bold text-brand-bg-100 opacity-40 ">
        {title}
      </span>
      <input
        onChange={(e) => onChange && onChange(parseInt(e.target.value))}
        className="h-[40px] w-[140px] rounded-xl bg-brand-gray-300 px-3 font-kumbh text-[14px] font-bold text-brand-bg-100 md:h-[48px] md:w-full"
        value={time}
        type="number"
      />
    </div>
  );
};

const FontButton = ({
  title,
  font,
  active,
  onClick,
}: {
  title: string;
  font: FontSettings;
  active?: boolean;
  onClick: () => void;
}) => {
  const fontStyle = {
    kumbh: "font-kumbh",
    roboslab: "font-roboslab",
    spacemono: "font-spacemono",
  };
  return (
    <button
      onClick={onClick}
      className={`${fontStyle[font]} h-[40px] w-[40px] rounded-full ${
        active
          ? "bg-brand-bg-200 text-brand-gray-100"
          : "bg-brand-gray-300 text-brand-bg-100"
      }  px-3 text-[15px] font-bold `}
    >
      {title}
    </button>
  );
};

const ColorButton = ({
  color,
  active,
  onClick,
}: {
  color: ColorSettings;
  active?: boolean;
  onClick?: () => void;
}) => {
  const colorStyle = {
    red: "bg-brand-red",
    lightblue: "bg-brand-blue",
    purple: "bg-brand-purple",
  };
  return (
    <button
      onClick={onClick && onClick}
      className={`${colorStyle[color]} h-[40px] w-[40px] rounded-full  px-3 text-[15px] font-bold text-brand-bg-100`}
    >
      {active && (
        <svg
          width="15"
          height="11"
          viewBox="0 0 15 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 5.5L4.95263 9.45263L13.4053 1"
            stroke="#161932"
            strokeWidth="2"
          />
        </svg>
      )}
    </button>
  );
};

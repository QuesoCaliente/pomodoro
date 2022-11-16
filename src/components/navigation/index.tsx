import React, { useEffect, useState } from "react";
import useSettings from "../../utils/hooks/useSettings";

export default function Navigation({
  onActiveChange,
}: {
  onActiveChange: (item: string) => void;
}) {
  const [activeItem, setActiveItem] = useState("pomodoro");
  const settings = useSettings();

  useEffect(() => {
    onActiveChange(activeItem);
  }, [activeItem]);

  return (
    <nav className="flex w-[90%] rounded-full bg-brand-bg-200 p-4 md:w-[400px]">
      <NavItem
        onItemChange={(item) => setActiveItem(item)}
        active={activeItem === "pomodoro"}
      >
        pomodoro
      </NavItem>
      <NavItem
        onItemChange={(item) => setActiveItem(item)}
        active={activeItem === "short break"}
      >
        short break
      </NavItem>
      <NavItem
        onItemChange={(item) => setActiveItem(item)}
        active={activeItem === "long break"}
      >
        long break
      </NavItem>
    </nav>
  );
}

const NavItem = ({
  children,
  active,
  onItemChange,
}: {
  children: string;
  active?: boolean;
  onItemChange: (item: string) => void;
}) => {
  const settings = useSettings();
  return (
    <li
      onClick={() => onItemChange(children)}
      className={`flex-1 cursor-pointer list-none rounded-full p-3 text-center ${
        settings?.settings.font
      } text-[12px] font-bold md:text-[14px] ${
        active
          ? `${settings?.settings.color.bg} text-brand-bg-100`
          : "text-brand-gray-200 opacity-40 transition-opacity duration-300 hover:opacity-100"
      }`}
    >
      {children}
    </li>
  );
};

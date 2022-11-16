import React from "react";
import useSettings from "../../utils/hooks/useSettings";
import Navigation from "../navigation";

export default function Header({
  children,
  onActiveChange,
}: {
  children: React.ReactNode;
  onActiveChange: (item: string) => void;
}) {
  const settings = useSettings();
  return (
    <header className="flex flex-1 flex-col items-center justify-center">
      <h1
        className={`py-5 ${settings?.settings.font} flex items-center gap-5 text-[32px] font-bold text-brand-gray-200`}
      >
        {children}
      </h1>
      <Navigation onActiveChange={(item) => onActiveChange(item)} />
    </header>
  );
}

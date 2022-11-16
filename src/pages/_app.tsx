import "../styles/globals.css";
import "../styles/progressCircle.css";
import type { AppProps } from "next/app";
import SettingsProvider from "../context/SettingsProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SettingsProvider>
      <Component {...pageProps} />
    </SettingsProvider>
  );
}

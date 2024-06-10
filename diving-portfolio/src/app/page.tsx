'use client'

import AvailableDiveSites from "./components/AvailableDiveSites";
import SavedDiveSites from "./components/SavedDiveSites";
import PopupPortalRoot from "./components/popups/PopupPortalRoot";
import { DiveSitesContextProvider } from "./context/DiveSitesContext";

export default function Home() {

  return (
    <DiveSitesContextProvider>
      <PopupPortalRoot />
      <main className="flex min-h-screen flex-col z-20 gap-y-3 items-center justify-between p-12">
        <SavedDiveSites />
        <AvailableDiveSites />
      </main>
    </DiveSitesContextProvider>
  );
}

import { useEffect } from "react";
import { useUnit } from "effector-react";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { $AppStore, isMobileVersionChanger } from "@stores/App.model";

export const useMobileSync = () => {
  const isMobile = useMediaQuery("(max-width: 1070px)");
  const { isMobileVersion } = useUnit($AppStore);

  useEffect(() => {
    if (isMobile !== isMobileVersion) {
      isMobileVersionChanger(isMobile);
    }
  }, [isMobile, isMobileVersion]);
};
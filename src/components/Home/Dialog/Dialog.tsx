import React, { useEffect } from "react";
import { Content } from "./Content/Content";
import "./Dialog.scss";
import { useParams } from "react-router";
import { loadDialogFx } from "../../../store/Home.model";
import { Header } from "./Header/Header";

export const Dialog = () => {
  const { dialogId } = useParams();

  useEffect(() => {
    if (dialogId) loadDialogFx(dialogId);
  }, [dialogId]);

  return (
    <div className="dialog__wrapper">
      <Header />
      <Content />
    </div>
  );
};

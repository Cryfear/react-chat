import { Route, Routes } from "react-router";
import { Auth } from "../Auth/Auth";
import { Home } from "../Home/Home";

export const HostRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<Home />}>
        <Route path="dialogs/:dialogId" element={<Home />} />
      </Route>
      <Route path="/auth/*" element={<Auth />} />
    </Routes>
  );
};

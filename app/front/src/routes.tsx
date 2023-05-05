import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppWrapper from "./screens/app";
import Account from "./screens/app/account";
import Home from "./screens/app/home";
import ModelPreview from "./screens/app/home/model";
import Interaction from "./screens/app/interaction";
import Preview from "./screens/app/preview";
import Index from "./screens/index";
import Login from "./screens/login";
import Registry from "./screens/registry";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="index" element={<Index />} />
          <Route path="registry" element={<Registry />} />
          <Route path="app" element={<AppWrapper />}>
            <Route path="home" element={<Home />} />
            <Route path="home/:model" element={<ModelPreview />} />
            <Route path="preview" element={<Preview />} />
            <Route path="preview/:model" element={<Preview />} />
            <Route path="interaction" element={<Interaction />} />
            <Route path="account" element={<Account />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

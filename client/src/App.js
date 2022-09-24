import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Activate from "./pages/activate";
import Auth from "./pages/auth/Auth";
import Home from "./pages/Home";
import Profile from "./pages/profile/Index";
import Unauthenticated from "./route_guards/Unauthenticated";
import Authenticated from "./route_guards/Authenticated";
function App() {
  return (
    <div style={{ height: "100%" }}>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Authenticated>
              <Home />
            </Authenticated>
          }
        />
        <Route path="/activate/:token" element={<Activate />} />
        <Route
          path="/profile/:username"
          element={
            <Authenticated>
              <Profile />
            </Authenticated>
          }
        />{" "}
        <Route
          path="/profile"
          element={
            <Authenticated>
              <Profile />
            </Authenticated>
          }
        />
        <Route
          path="/auth"
          element={
            <Unauthenticated>
              <Auth />
            </Unauthenticated>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

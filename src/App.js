import { useSelector } from "react-redux";
import "./App.css";
import Otp from "./Component/Otp";
import MainRoutes from "./pages/MainRoutes";
import { Route, Routes, Navigate } from "react-router-dom";
function App() {
  const isAuth = useSelector((state) => state.Auth.isAuth);
  console.log(isAuth)
  return (
    <div className="App">
      <Routes>
        <Route path="/otp" element={<Otp />} />
        {isAuth ? (
          <Route path="*" element={<Navigate to="/otp" />} />
        ) : (
          <Route path="/" element={<MainRoutes />} />
        )}
      </Routes>
    </div>
  );
}

export default App;

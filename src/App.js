import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ListDetails from "./components/ListDetails";
import AddStore from "./components/AddStore";
import UpdateStore from "./components/UpdateStore";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer theme="colored" position="bottom-right"></ToastContainer>
      <Routes>
        <Route index path="/*" element={<Login />} />
        <Route index path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/listdetail/:id" element={<ListDetails />} />
        <Route path="/addstore" element={<AddStore />} />
        <Route path="/updatestore/:id" element={<UpdateStore />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

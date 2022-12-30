import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CriarItem, ListarItem, Login, Register } from "./pages";
import { ProtectedRoute } from "./components";
import { api } from "./api/config";
import { GlobalContext } from "./providers/context";

export default function App() {
  const { getAccess, setAccess } = useContext(GlobalContext)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/registro" element={<Register></Register>}></Route>
        <Route path="/item" element={<ProtectedRoute><ListarItem></ListarItem></ProtectedRoute>}></Route>
        <Route path="/criar/item" element={<ProtectedRoute><CriarItem></CriarItem></ProtectedRoute>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

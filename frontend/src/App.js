import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CriarItem, ListarItem } from "./pages";
import { api } from "./api/config";
import { GlobalContext } from "./providers/context";

export default function App() {
  const { setAccess, getAccess } = useContext(GlobalContext)

  useEffect(() => {
    api.post("login/", {
      "username": "diogo",
      "password": "19111911dio"
    }).then((res) => {
      setAccess(res.data.access)
    })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListarItem></ListarItem>}></Route>
        <Route path="/criar/item" element={<CriarItem></CriarItem>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

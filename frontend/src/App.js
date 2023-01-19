import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CriarItem, ListarItem, Login, Register, ResponderItem, Settings, VisualizarItem, RespostaItem } from "./pages";
import { ProtectedRoute } from "./components";
import { useContext, useEffect } from "react";
import { GetUser } from "./api/config";
import { GlobalContext } from "./providers/context";

export default function App() {
  const {setUser} = useContext(GlobalContext);
  

  useEffect(()=>{
    GetUser().then(res =>{
      console.log(res.data);
      setUser(res.data);
    }).catch((error)=>{
      console.log(error);
    })
  },[])

  const router = createBrowserRouter([
    {
      path: "/",
      element: (<Login></Login>)
    },
    {
      path: "/registro",
      element: (<Register></Register>)
    },
    {
      path: "/item",
      element: (<ListarItem></ListarItem>)
    },
    {
      path: "/item/:id",
      element: (<VisualizarItem></VisualizarItem>)
    },
    {
      path: "/item/:id/responder",
      element: (<ResponderItem></ResponderItem>)
    },
    {
      path: "/criar/item",
      element: (<CriarItem></CriarItem>)
    },
    {
      path: "/item/:id/resposta",
      element: (<RespostaItem></RespostaItem>)
    },
    {
      path: "/settings",
      element: (<Settings></Settings>)
    }
    
  ])

return (
  <RouterProvider router={router}></RouterProvider>
)
}

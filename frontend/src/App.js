import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateAvaliacao, CriarItem, ListarItem, ListAvaliacao, Login, Register, ResponderItem, Settings, VisualizarItem } from "./pages";
import { ProtectedRoute } from "./components";
import { useContext, useEffect } from "react";
import { GetUser } from "./api/config";
import { GlobalContext } from "./providers/context";

export default function App() {
  const {setUser} = useContext(GlobalContext);
  

  useEffect(()=>{
    GetUser().then(res =>{
      setUser(res.data);
    }).catch((error)=>{
      console.log("amigo estou aqui!");
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
      path: "/avaliacao",
      element: (<ProtectedRoute><ListAvaliacao></ListAvaliacao></ProtectedRoute>)
    },
    {
      path: "/avaliacao/criar",
      element: (<ProtectedRoute><CreateAvaliacao></CreateAvaliacao></ProtectedRoute>)
    },
    {
      path: "/item",
      element: (<ProtectedRoute><ListarItem></ListarItem></ProtectedRoute>)
    },
    {
      path: "/item/:id",
      element: (<ProtectedRoute><VisualizarItem></VisualizarItem></ProtectedRoute>)
    },
    {
      path: "/item/:id/responder",
      element: (<ProtectedRoute><ResponderItem></ResponderItem></ProtectedRoute>)
    },
    {
      path: "/criar/item",
      element: (<ProtectedRoute><CriarItem></CriarItem></ProtectedRoute>)
    },
    {
      path: "/settings",
      element: (<ProtectedRoute><Settings></Settings></ProtectedRoute>)
    }
    
  ])

return (
  <RouterProvider router={router}></RouterProvider>
)
}

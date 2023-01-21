import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CriarItem, ListarItem, Login, Register, ResponderItem, Settings, VisualizarItem, AlunoVisualizarRespostaAvaliacao } from "./pages";
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
    },
    {
      path: "/avaliacao/:id/aluno/respostas",
      element: (<ProtectedRoute><AlunoVisualizarRespostaAvaliacao></AlunoVisualizarRespostaAvaliacao></ProtectedRoute>)
    }
    
  ])

return (
  <RouterProvider router={router}></RouterProvider>
)
}

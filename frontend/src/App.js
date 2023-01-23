import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import { CriarItem, ListarItem, Login, Register, ResponderItem, Settings, VisualizarItem, AlunoVisualizarRespostaAvaliacao, AvaliacaoRespostas, CreateAvaliacao } from "./pages";
import { ProtectedRoute } from "./components";
import { useContext, useEffect } from "react";
import { GetUser, Logout } from "./api/config";
import { GlobalContext } from "./providers/context";

export default function App() {
  const { setUser } = useContext(GlobalContext);


  useEffect(() => {
    GetUser().then(res => {
      setUser(res.data);
    }).catch((error) => {
      if (error.response.status === 401) {
        console.log("here");
        localStorage.clear();
        // Logout().then(res => {
        //   navigate("/");
        // })
      }
    })
  }, [])

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
      path:"avaliacao/:id/respostas",
      element: (<ProtectedRoute><AvaliacaoRespostas></AvaliacaoRespostas></ProtectedRoute>)
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
      path: "/item/:id/resposta",
      element: (<ProtectedRoute><RespostaItem></RespostaItem></ProtectedRoute>)
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

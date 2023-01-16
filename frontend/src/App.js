import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CriarItem, ListarItem, Login, Register, Settings, VisualizarItem, RespostasItem } from "./pages";
import { ProtectedRoute } from "./components";

export default function App() {

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
      path: "/criar/item",
      element: (<ProtectedRoute><CriarItem></CriarItem></ProtectedRoute>)
    },
    {
      path: "/item/:id/resposta",
      element: (<ProtectedRoute><RespostasItem></RespostasItem></ProtectedRoute>)
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

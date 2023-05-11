import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
	CriarItem,
	ListarItem,
	Login,
	Register,
	ResponderItem,
	Settings,
	VisualizarItem,
	AlunoVisualizarRespostaAvaliacao,
	AvaliacaoRespostas,
	CreateAvaliacao,
	ListAvaliacao,
	RespostaItem,
	ResponderAvaliacao,
} from "./pages";
import { ProtectedRoute } from "./components";

export default function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Login />,
		},
		{
			path: "/registro",
			element: <Register />,
		},
		{
			path: "/avaliacao",
			element: (
				<ProtectedRoute>
					<ListAvaliacao />
				</ProtectedRoute>
			),
		},
		{
			path: "/avaliacao/criar",
			element: (
				<ProtectedRoute>
					<CreateAvaliacao />
				</ProtectedRoute>
			),
		},
		{
			path: "/avaliacao/:id/responder",
			element: (
				<ProtectedRoute>
					<ResponderAvaliacao />
				</ProtectedRoute>
			),
		},
		{
			path: "avaliacao/:id/respostas",
			element: (
				<ProtectedRoute>
					<AvaliacaoRespostas />
				</ProtectedRoute>
			),
		},
		{
			path: "/item",
			element: (
				<ProtectedRoute>
					<ListarItem />
				</ProtectedRoute>
			),
		},
		{
			path: "/item/:id",
			element: (
				<ProtectedRoute>
					<VisualizarItem />
				</ProtectedRoute>
			),
		},
		{
			path: "/item/:id/responder",
			element: (
				<ProtectedRoute>
					<ResponderItem />
				</ProtectedRoute>
			),
		},
		{
			path: "/criar/item",
			element: (
				<ProtectedRoute>
					<CriarItem />
				</ProtectedRoute>
			),
		},
		{
			path: "/item/:id/resposta",
			element: (
				<ProtectedRoute>
					<RespostaItem />
				</ProtectedRoute>
			),
		},
		{
			path: "/settings",
			element: (
				<ProtectedRoute>
					<Settings />
				</ProtectedRoute>
			),
		},
		{
			path: "/avaliacao/:id/aluno/respostas",
			element: (
				<ProtectedRoute>
					<AlunoVisualizarRespostaAvaliacao />
				</ProtectedRoute>
			),
		},
	]);

	return <RouterProvider router={router} />;
}

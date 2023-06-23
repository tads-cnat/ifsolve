import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
    Login,
    FormLayout,
    Landing,
    ItemListar,
    ItemCriar,
    ItemResponder,
    ItemResposta,
    ItemVisualizar,
    AvaliacaoListar,
    AvalicaoCriar,
    AvaliacaoResponder,
    AvaliacaoResposta,
    AvaliacaoResumo,
    Settings,
} from './pages';
import { ProtectedRoute } from './components';

export default function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Landing />,
        },
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/item',
            element: (
                <ProtectedRoute>
                    <ItemListar />
                </ProtectedRoute>
            ),
        },
        {
            path: '/item/:id/responder/',
            element: (
                <ProtectedRoute>
                    <ItemResponder />
                </ProtectedRoute>
            ),
        },
        {
            path: '/item/:id/respostas/',
            element: (
                <ProtectedRoute>
                    <ItemResposta />
                </ProtectedRoute>
            ),
        },
        {
            path: '/item/:id/visualizar/',
            element: (
                <ProtectedRoute>
                    <ItemVisualizar />
                </ProtectedRoute>
            ),
        },
        {
            path: '/avaliacao/',
            element: (
                <ProtectedRoute>
                    <AvaliacaoListar />
                </ProtectedRoute>
            ),
        },
        {
            path: '/avaliacao/:id/responder/',
            element: (
                <ProtectedRoute>
                    <AvaliacaoResponder />
                </ProtectedRoute>
            ),
        },
        {
            path: '/avaliacao/:id/respostas/',
            element: (
                <ProtectedRoute>
                    <AvaliacaoResposta />
                </ProtectedRoute>
            ),
        },
        {
            path: '/avaliacao/:id/resumo/',
            element: (
                <ProtectedRoute>
                    <AvaliacaoResumo />
                </ProtectedRoute>
            ),
        },
        {
            path: '/elaborar/',
            element: <FormLayout />,
        },
        {
            path: '/elaborar/item/',
            element: (
                <ProtectedRoute>
                    <ItemCriar />
                </ProtectedRoute>
            ),
        },
        {
            path: '/elaborar/avaliacao/',
            element: (
                <ProtectedRoute>
                    <AvalicaoCriar />
                </ProtectedRoute>
            ),
        },
        {
            path: '/perfil',
            element: (
                <ProtectedRoute>
                    <Settings />
                </ProtectedRoute>
            ),
        },
    ]);

    return <RouterProvider router={router} />;
}

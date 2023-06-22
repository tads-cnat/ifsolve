import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
    Login,
    ItemListar,
    ItemCriar,
    AvaliacaoListar,
    FormLayout,
    Landing,
    AvalicaoCriar,
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
            path: '/avaliacao',
            element: (
                <ProtectedRoute>
                    <AvaliacaoListar />
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
    ]);

    return <RouterProvider router={router} />;
}

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login, Register, ItemListar, AvaliacaoListar } from './pages';
import { ProtectedRoute } from './components';

export default function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Login />,
        },
        {
            path: '/registro',
            element: <Register />,
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
    ]);

    return <RouterProvider router={router} />;
}

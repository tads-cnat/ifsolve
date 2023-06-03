import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login, ItemListar, AvaliacaoListar, FormLayout } from './pages';
import { ProtectedRoute } from './components';

export default function App() {
    const router = createBrowserRouter([
        {
            path: '/',
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
    ]);

    return <RouterProvider router={router} />;
}

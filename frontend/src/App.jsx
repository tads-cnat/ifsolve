import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login, ItemListar, AvaliacaoListar, FormLayout, Landing } from './pages';
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
    ]);

    return <RouterProvider router={router} />;
}

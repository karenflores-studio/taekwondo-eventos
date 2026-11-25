import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './estilo.css'

import { SessionProvider } from './context/session.context.jsx'

import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Logout from './pages/Logout.jsx'

// vista de cartelera, la que ve un usuario comun
import Eventos from './pages/Eventos.jsx'
import EventoDetalle from './pages/EventoDetalle.jsx'

// abm de eventos, para administradores
import EventosLista from './pages/eventos/Lista.jsx'
import EventosNuevo from './pages/eventos/Nuevo.jsx'
import EventosEditar from './pages/eventos/Editar.jsx'
import EventosEliminar from './pages/eventos/Eliminar.jsx'
import EventosDetalle from './pages/eventos/Detalle.jsx'

// abm de profesores, para administradores
import ProfesoresLista from './pages/profesores/Lista.jsx'
import ProfesoresNuevo from './pages/profesores/Nuevo.jsx'
import ProfesoresEditar from './pages/profesores/Editar.jsx'
import ProfesoresEliminar from './pages/profesores/Eliminar.jsx'

// ProtectedRoute envuelve las paginas que necesitan sesion
// sin roles alcanza con estar logueado, con roles ademas hay que tener ese rol
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            // publicas
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'salir', element: <Logout /> },

            // cualquier usuario logueado
            { index: true, element: <ProtectedRoute element={<Home />} /> },
            { path: 'eventos', element: <ProtectedRoute element={<EventosLista />} /> },
            { path: 'eventos/detalle/:id', element: <ProtectedRoute element={<EventosDetalle />} /> },
            { path: 'eventos-usuario', element: <ProtectedRoute element={<Eventos />} /> },
            { path: 'eventos-usuario/detalle/:id', element: <ProtectedRoute element={<EventoDetalle />} /> },

            // solo administradores
            { path: 'eventos/nuevo', element: <ProtectedRoute roles={['admin']} element={<EventosNuevo />} /> },
            { path: 'eventos/editar/:id', element: <ProtectedRoute roles={['admin']} element={<EventosEditar />} /> },
            { path: 'eventos/eliminar/:id', element: <ProtectedRoute roles={['admin']} element={<EventosEliminar />} /> },

            { path: 'profesores', element: <ProtectedRoute roles={['admin']} element={<ProfesoresLista />} /> },
            { path: 'profesores/nuevo', element: <ProtectedRoute roles={['admin']} element={<ProfesoresNuevo />} /> },
            { path: 'profesores/editar/:id', element: <ProtectedRoute roles={['admin']} element={<ProfesoresEditar />} /> },
            { path: 'profesores/eliminar/:id', element: <ProtectedRoute roles={['admin']} element={<ProfesoresEliminar />} /> }
        ]
    }
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <SessionProvider>
            <RouterProvider router={router} />
        </SessionProvider>
    </StrictMode>
)

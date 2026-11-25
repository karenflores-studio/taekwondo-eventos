import { Outlet } from 'react-router'
import Nav from './Nav'

export default function Layout() {
    return (
        <>
            <Nav />

            <main className="container-fluid contenido">
                <Outlet />
            </main>
        </>
    )
}
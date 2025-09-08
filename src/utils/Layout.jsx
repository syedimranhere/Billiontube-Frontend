// Layout.jsx
import { Outlet } from "react-router-dom";
import { Header, Footer, Sidebar } from '../components/index';

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-black text-white">
            {/* HEADER */}
            <Header />

            <div className="flex flex-1 relative overflow-hidden">
                {/* SIDEBAR - Now positioned absolutely to overlay content */}
                <Sidebar />

                {/* MAIN OUTLET - Takes full width, sidebar overlays on top */}
                <main className="flex-1 overflow-y-auto w-full">
                    <Outlet />
                </main>
            </div>

            {/* FOOTER */}
            <Footer />
        </div>
    );
}
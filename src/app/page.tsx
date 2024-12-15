import 'bootstrap/dist/css/bootstrap.min.css';
import TimeTracker from "@/shared/components/TimerTracker/TimeTracker";
import FooterComponent from "@/shared/components/Footer/Footer";
import NavbarComponent from "@/shared/components/Navbar/Navbar";

export default function Home() {
    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Navbar */}
            <NavbarComponent />

            {/* Main Content */}
            <main className="container my-5 flex-grow-1 text-center">
                <h1 className="mb-4">Project Name</h1>
                <TimeTracker />
            </main>

            {/* Footer */}
            <FooterComponent />
        </div>
    );
}

import 'bootstrap/dist/css/bootstrap.min.css';
import FooterComponent from "@/shared/components/Footer/Footer";
import NavbarComponent from "@/shared/components/Navbar/Navbar";
import AddProject from "@/shared/components/Home/AddProject";
import SearchProject from "@/shared/components/Home/SearchProject";

export default function Home() {
    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Navbar */}
            <NavbarComponent/>

            {/* Main Content */}
            <main className="container my-5 flex-grow-1 text-center">
                <h1 className="mb-4">Time Tracker</h1>
                <div>
                    <AddProject/>
                </div>
                <div className="mt-3">
                    <SearchProject/>
                </div>

            </main>
            {/* Footer */}
            <FooterComponent/>
        </div>
    );
}

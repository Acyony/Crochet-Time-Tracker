import 'bootstrap/dist/css/bootstrap.min.css';

import AddProject from "@/shared/components/Home/AddProject";
import NavbarAuthComponent from "@/shared/components/Navbar/NavbarLogIn";
import FooterComponent from "@/shared/components/Footer/Footer";
import SearchProject from "@/shared/components/Home/SearchProject";

export default async function Page() {
    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Navbar */}
            <NavbarAuthComponent/>
            {/*main*/}
            <main className="container my-5 flex-grow-1 text-center">
                <h1 className="mb-4">Time Tracker</h1>
                <div className="mt-3">

                    <AddProject/>
                </div>
                <div className="mt-3">
                    <SearchProject/>
                </div>
            </main>
            {/* Footer */}
            <FooterComponent/>
        </div>
    )
}

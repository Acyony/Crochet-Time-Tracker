import 'bootstrap/dist/css/bootstrap.min.css';

import AuthComponent from "@/shared/components/Home/UserAuthentication";
import FooterComponent from "@/shared/components/Footer/Footer";
import NavbarAuthComponent from "@/shared/components/Navbar/NavbarLogIn";

export default async function Page() {
    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Navbar */}
            <NavbarAuthComponent/>
            <AuthComponent register={true}/>
            {/* Footer */}
            <FooterComponent/>
        </div>
    )
}

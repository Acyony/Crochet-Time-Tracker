import 'bootstrap/dist/css/bootstrap.min.css';

import AuthComponent from "@/shared/components/Home/UserAuthentication";
import NavbarAuthComponent from "@/shared/components/Navbar/NavbarLogIn";
import FooterComponent from "@/shared/components/Footer/Footer";

export default async function Page() {
    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Navbar */}
            <NavbarAuthComponent/>
            <AuthComponent register={false}/>
            {/* Footer */}
            <FooterComponent/>
        </div>
    )
}

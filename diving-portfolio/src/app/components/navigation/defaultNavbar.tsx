import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./navigation.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    return (
        <nav className="flex min-w-full h-16 nav-gradient flex-row-reverse p-4">
           <div className="hamburger-menu-wrapper">
                <FontAwesomeIcon icon={faBars} />
           </div> 
        </nav>
    );
} 
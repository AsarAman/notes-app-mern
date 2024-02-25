/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";

import { CiDark, CiLight } from "react-icons/ci";
import { useAppContext } from "../context/appContext";

/* eslint-disable no-unused-vars */
function Navbar() {
  const { toggleDark, isDarkMode, user } = useAppContext();
  
  return (
    <nav>
      <div className="content">
        <h1>
          <Link to={"/notes"}>Noter</Link>
        </h1>
        <div className="links">
          <p onClick={toggleDark} className="darkmode-toggle">
            {isDarkMode ? (
              <CiDark color="blue" size={40} />
            ) : (
              <CiLight size={40} color="blue" />
            )}
          </p>
          {user && <Link to="/profile">Profile</Link>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

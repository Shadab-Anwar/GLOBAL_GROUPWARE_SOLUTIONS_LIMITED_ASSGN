import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userSession");
    if (!storedUser) {
      navigate("/users");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };


  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/users" className="flex items-center space-x-3">
          <img
            src="https://res.cloudinary.com/duwddcqzi/image/upload/v1743104740/dashsync-high-resolution-logo_geqvsq.png"
            alt="DashSync Logo"
            width={40}
            height={40}
            className="h-8"
          />
          <span className="text-2xl font-semibold dark:text-white">DashSync</span>
        </Link>

        <div className="flex items-center md:order-2 space-x-3">
          <button onClick={() => setShowDropdown(!showDropdown)} className="flex text-sm rounded-full">
            <img
              src="https://res.cloudinary.com/duwddcqzi/image/upload/v1743104563/Basic_Ui__186_vbb7pk.jpg"
              alt="User Photo"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          </button>
          {showDropdown && (
            <div ref={dropdownRef} className="absolute right-0 mr-8 mt-44 w-48 bg-white divide-y rounded-lg shadow-md">
              <div className="px-4 py-3">
                <span className="block text-sm">Welcome to DashSync</span>
              </div>
              <ul className="py-2">
                <li>
                    <button onClick={handleLogout} className="block w-full px-4 py-2 text-sm hover:bg-gray-100">
                      Logout User
                    </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

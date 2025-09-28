import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
   <nav className="bg-gradient-to-r from-slate-50 to-blue-50 shadow-lg border-b border-slate-200/60">
  <div className="container mx-auto px-6 py-4 flex justify-between items-center">
    <Link 
      to="/" 
      className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
    >
      PM App
    </Link>
    <div className="flex items-center space-x-6">
      {user ? (
        <>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user.email.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-sm font-medium text-slate-700 hidden sm:block">
              {user.email}
            </span>
          </div>
          <button 
            onClick={handleLogout} 
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link 
            to="/login" 
            className="text-blue-600 hover:text-blue-700 font-medium px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-300"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Register
          </Link>
        </>
      )}
    </div>
  </div>
</nav>
  );
}

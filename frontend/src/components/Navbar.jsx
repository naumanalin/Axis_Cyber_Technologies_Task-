import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../utils/Logout';
import { 
  LayoutDashboard,
  LineChart,
  User,
  LogOut,
  Menu,
  X,
  Wallet
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userData = localStorage.getItem('client_a_x_i_s_680');
  const token = localStorage.getItem('token');
  const user = userData ? JSON.parse(userData) : null;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gray-900 text-white fixed top-0 w-full z-20 shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* logo | Name section */}
          <div className="flex items-center space-x-2">
            <Wallet className="text-blue-400" size={28} />
            <Link to="/" className="text-2xl font-bold">
              {user && token ? (
                <span className="text-white">
                  👋 Hi, <span className="text-blue-400">{user?.name?.split(' ')[0] || 'User'}</span>
                </span>
              ) : (
                <span>
                  <span className="text-blue-400">Bud</span>
                  <span className="text-yellow-400">get</span>
                  <span className="text-blue-400">Tracker</span>
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {user && token ? (
              <>
                <NavLink to="/dashboard" icon={<LayoutDashboard size={20} />} text="Dashboard" />
                <NavLink to="/analytics" icon={<LineChart size={20} />} text="Analytics" />
                <NavLink to="/profile" icon={<User size={20} />} text="Profile" />
                <Logout>
                  <button className="flex items-center space-x-2 text-red-400 hover:text-red-300">
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </Logout>
              </>
            ) : (
              <Link to="/login" className="flex items-center space-x-2 hover:text-blue-300">
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-gray-800 rounded-lg"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              {user && token ? (
                <>
                  <MobileNavLink to="/dashboard" icon={<LayoutDashboard />} text="Dashboard" onClick={toggleMenu} />
                  <MobileNavLink to="/analytics" icon={<LineChart />} text="Analytics" onClick={toggleMenu} />
                  <MobileNavLink to="/profile" icon={<User />} text="Profile" onClick={toggleMenu} />
                  <div className="pt-4 border-t border-gray-800">
                    <Logout>
                      <button className="w-full flex items-center space-x-2 text-red-400 hover:text-red-300 p-2">
                        <LogOut size={20} />
                        <span>Logout</span>
                      </button>
                    </Logout>
                  </div>
                </>
              ) : (
                <MobileNavLink to="/login" text="Login" onClick={toggleMenu} />
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Reusable NavLink component
const NavLink = ({ to, icon, text }) => (
  <Link to={to} className="flex items-center space-x-2 hover:text-blue-300">
    {icon}
    <span>{text}</span>
  </Link>
);

// Reusable MobileNavLink component
const MobileNavLink = ({ to, icon, text, onClick }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded-lg"
  >
    {icon && React.cloneElement(icon, { size: 20 })}
    <span>{text}</span>
  </Link>
);

export default Navbar;
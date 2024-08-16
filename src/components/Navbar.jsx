/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import { RiDashboard3Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaCartFlatbedSuitcase } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate, NavLink } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav className="bg-blue-50 fixed bottom-0 w-full h-16 md:h-max md:static md:w-16 flex md:flex-col items-center justify-between shadow-xl  md:rounded-r-3xl">
            <div className="container flex md:flex-col justify-around md:justify-start items-center gap-6 p-4 md:gap-10 md:pt-8">
                <NavLink to="/home">
                    {({ isActive }) => (
                        isActive ? <RiDashboard3Line className="text-blue-700" size={24}  /> : <RiDashboard3Line className="text-black" size={24}  />
                    )}
                </NavLink>
                <NavLink to="/products">
                    {({ isActive }) => (
                        isActive ? <FaPlus className="text-blue-700" size={24}  /> : <FaPlus className="text-black" size={24}  />
                    )}
                </NavLink>
                <NavLink to="/categories">
                    {({ isActive }) => (
                        isActive ? <BiSolidCategoryAlt className="text-blue-700" size={24}  /> : <BiSolidCategoryAlt className="text-black" size={24}  />
                    )}
                </NavLink>
                <NavLink to="/orders">
                    {({ isActive }) => (
                        isActive ? <FaCartFlatbedSuitcase className="text-blue-700" size={24}  /> : <FaCartFlatbedSuitcase className="text-black" size={24}  />
                    )}
                </NavLink>
            </div>
            <button onClick={handleLogout} className="md:mt-auto p-4">
                <AiOutlineLogout className="text-black" size={24}  />
            </button>
        </nav>
    );
};

export default Navbar;

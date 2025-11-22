import Link from "next/link";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { useState } from "react";

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
    };
    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isMenuOpen) setIsMenuOpen(false);
    }

    return (
        <header className="bg-[#96D9C0] p-4 sticky w-full">
            <nav className="flex justify-between items-center p-4 mx-auto">
            <div className="px-4"><Image src={'/assets/LOGO.svg'} alt="PELLICLA" height={50} width={200} className="w-[150px] md:w-[200px]"/></div>
            <div className="hidden md:flex space-x-10 items-center">
                <Link href="/" className="hover:text-[#591427]">
                <p className="text-[#4C3A51] text-[30px]">Home</p>
                </Link>
                <p className="text-[#4C3A51] text-[30px]">Movies</p>
                <p className="text-[#4C3A51] text-[30px]">Dashboard</p>
            </div>
            <div className="flex items-center space-x-10 px-4">
                <button onClick={toggleSearch} className="text-[#4C3A51] focus:outline-none">
                {isSearchOpen ? (
                <IoIosClose className="text-[#4C3A51] text-5xl" />
                ) : (
                <CiSearch className="text-[#4C3A51] text-4xl" />
                )}
                </button>
                <button onClick={toggleMenu} className="md:hidden text-[#4C3A51] focus:outline-none">
                {isMenuOpen ? (
                <IoIosClose className="text-[#4C3A51] text-5xl" />
                ) : (
                <IoIosMenu className="text-[#4C3A51] text-4xl" />
                )}
                </button>
            </div>
            </nav>
            {isMenuOpen && (
            <div className="md:hidden bg-[#4C3A51] px-4 pb-4 pt-2 space-y-4 border-t border-[#4C3A51]/10 rounded-[10px]">
            <Link href="/">
                <p className="block text-[#D27C91] text-[24px] py-2 border-b border-[#96D9C0]/10 hover:text-[#8080FF] rounded px-2 cursor-pointer">
                Home</p>
            </Link>
            <p className="block text-[#D27C91] text-[24px] py-2 border-b border-[#96D9C0]/10 hover:text-[#8080FF] rounded px-2 cursor-pointer">
            Movies</p>
            <p className="block text-[#D27C91] text-[24px] py-2 border-[#96D9C0]/10 hover:text-[#8080FF] rounded px-2 cursor-pointer">
            Dashboard</p>
            </div>
            )}

            {isSearchOpen && (
        <div className="top-full left-0 w-full p-4 flex justify-center items-center">
            <div className="relative w-full max-w-3xl">
            <input type="text" placeholder="Search for a movie" className="w-full p-3 pl-4 rounded-full border-2 border-[#4C3A51] bg-[#f1d7de] text-[#4C3A51] text-xl" />
            <CiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4C3A51] text-3xl" />
            </div>
        </div>
        )}
        </header>
    )
}
export default Header;
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
    return (
        <footer className="h-60 w-full bottom-0">
            <div className="h-10 bg-[#96D9C0]"></div>
            <div className="bg-[#D27C91]">
            <div className="h-[200px] flex space-x-10 justify-center items-center">
                <Image src={'/assets/LOGO.svg'} alt="PELLICLA" height={50} width={300} className="w-[150px] md:w-[300px] h-[50px]"/>
                <a href="https://figma.com" rel="figma">
                <Image src={'/assets/figma.svg'} alt="figma" width={40} height={60} className="w-4 md:w-10 h-[60px]"/>
                </a>
                <a href="https://github.com/smileTTP" rel="github">
                <Image src={'/assets/github.svg'} alt="figma" width={55} height={80} className="w-6 md:w-[55px] h-20"/>
                </a>
                <a href="https://x.com/ibtissam7_" rel="github">
                <Image src={'/assets/twitter.svg'} alt="figma" width={55} height={80} className="w-6 md:w-[55px] h-20"/>
                </a>
            </div>
            <br/>
            <hr className="text-[#7B1B38]"/>
            <div className="text-[16px] py-4 px-4 text-[#7B1B38] font-semibold">© 2025 Ibtissam. All rights reserved. <a href="https://developer.themoviedb.org/docs/getting-started" className="text-[#4C3A51]">TMDB API</a></div>
            </div>
        </footer>
    )
}
export default Footer;
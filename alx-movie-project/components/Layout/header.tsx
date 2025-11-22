import Link from "next/link";
import Image from "next/image";
const Header: React.FC = () => {
    return (
        <header>
            <div><Image src={'/assets/LOGO.svg'} alt="" height={60} width={302}/></div>
        </header>
    )
}
export default Header;
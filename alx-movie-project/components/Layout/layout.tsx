import { ComponentProps } from "@/interfaces";
import Header from "./header";
import Footer from "./footer";


const Layout: React.FC<ComponentProps> = ({ children }) => {
    return (
    <>
        <Header />
        <main className="min-h-screen bg-[#591427]">{children}</main>
        <Footer />
    </>
    )
}

export default Layout;
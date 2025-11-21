import { ComponentProps } from "@/interfaces";
import Header from "./header";
import Footer from "./footer";


const Layout: React.FC<ComponentProps> = ({ children }) => {
    return (
    <>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
    </>
    )
}

export default Layout;
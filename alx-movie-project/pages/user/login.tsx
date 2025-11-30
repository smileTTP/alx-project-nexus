import { IoEnter } from "react-icons/io5";
import { SiThemoviedatabase } from "react-icons/si";
import useTmdbAuth from "@/hooks/useTmdbAuth";

const Login: React.FC = () => {
    const { redirectUrl, fetchNewToken } = useTmdbAuth(); 

    const redirectUser = async () => {
        if (redirectUrl) {
            window.location.href = redirectUrl;
        } else {
            await fetchNewToken();
            console.log("Waiting for token to load...");
        }
    };
    
    const isDisabled = !redirectUrl; 

    return (
        <div className="flex items-center justify-center min-h-screen w-full p-4">
        <div className="p-8 bg-[#f1d7de] rounded-xl shadow-2xl border-4 border-[#4C3A51] max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-[#4C3A51] mb-4 flex items-center gap-3">
                <IoEnter className="text-3xl"/> Log in to TMDB
            </h2>
            <p className="text-[#591427] mb-6">
                To access features like favorites list, you need to link your TMDB account.
            </p>
            <button onClick={redirectUser} className={`w-full bg-[#4C3A51] text-[#f1d7de] font-extrabold py-3 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#8080FF] hover:shadow-lg hover:text-[#4C3A51]'}`} disabled={isDisabled} >
                <SiThemoviedatabase className="text-3xl"/>
                {isDisabled ? 'Loading...' : 'Connect with TMDb'}
            </button>
        </div>
        </div>
    );
}

export default Login;
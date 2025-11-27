import { MdError } from "react-icons/md";

const ErrorComponent: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen w-full p-4">
            <div className="bg-[#4C3A51] text-[#f1d7de] p-8 rounded-[10px] text-center">
                <div className="flex justify-between mt-4 gap-4">
                <MdError className="text-2xl md:text-5xl" />
                <p className="text-2xl md:text-5xl font-extrabold text-[#f1d7de]">Oops! Something Went Wrong.</p>
                </div>
                <button
                    onClick={() => window.history.back()}
                    className="text-lg px-8 py-2 border-2 rounded-[10px] border-[#8080FF] text-[#f1d7de] bg-[#8080FF] hover:bg-[#96D9C0] hover:text-[#4C3A51] transition-colors duration-300 mt-4">
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default ErrorComponent;
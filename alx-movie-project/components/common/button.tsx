
interface ButtonProps {
    title: string;
    action?: () => void;
    disabled?: boolean;
    active?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, action, disabled = false, active = false }) => {
    let colorStyles = "border-[#4C3A51] text-[#4C3A51] bg-[#f1d7de] hover:bg-[#7B1B38] hover:text-[#8080FF] transition-colors duration-300";

    if (active) {
        colorStyles = "border-[#4C3A51] text-[#4C3A51] bg-[#f1d7de] hover:bg-[#7B1B38] hover:text-[#8080FF] transition-colors duration-300";
    }
    if (disabled) {
        colorStyles = "bg-gray-100 text-[#8080FF] border-[#f1d7de] cursor-not-allowed opacity-50";
    }
    return (
    <button onClick={action} disabled={disabled} className={`px-8 py-2 border-2 rounded-[10px] ${colorStyles}`}>
        {title}
    </button>
    )
}

export default Button;
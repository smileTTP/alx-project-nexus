
interface ButtonProps {
    title: string;
    action?: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, action }) => {
    return (
    <button onClick={action} className={"px-8 py-2 border-2 rounded-[10px] border-[#4C3A51] text-[#4C3A51] bg-[#f1d7de] hover:bg-[#8080FF] hover:text-[#f1d7de] transition-colors duration-300"}>
        {title}
    </button>
    )
}

export default Button;
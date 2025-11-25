
interface ButtonProps {
    title: string
    action?: () => void
}

const Button: React.FC<ButtonProps> = ({ title, action }) => {
    return (
    <button onClick={action} className="px-8 py-2 border-2 border-[#4C3A51] text-[#4C3A51] bg-[#f1d7de] rounded-[10px] hover:bg-[#7B1B38] hover:text-[#8080FF] transition-colors duration-300">
        {title}
    </button>
    )
}

export default Button;
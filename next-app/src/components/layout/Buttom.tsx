export interface ButtonProps {
    className?: string;
    type: "submit" | "reset" | "button" | undefined;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const Button = ({className, type, children, onClick }:ButtonProps) => {
    return(
        <button
            className={`m-2 p-3 rounded-lg bg-accent text-base ${className}`}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
export default Button;
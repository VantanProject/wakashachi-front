import Link from "next/link";

export interface ButtonProps {
    href:string;
    children: React.ReactNode;
}
export function Button({ href, children }:ButtonProps) {
    return(
        <Link 
            href={href}
            className="text-accent text-base bg-accentLight px-5 py-2 rounded-md border-[1px] border-accent hover:border-2 hover:bg-baseColor transition duration-300"
        >
            {children}
        </Link>
    )
}
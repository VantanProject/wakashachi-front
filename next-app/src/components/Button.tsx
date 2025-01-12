import Link from "next/link";

export interface ButtonProps {
  href: string;
  children: React.ReactNode;
}
export function Button({ href, children }: ButtonProps) {
  return (
    <Link
      href={href}
      className="w-fit text-accent text-base bg-accentLight px-5 py-2 rounded-md border-[1px] border-accent hover:ring-1 ring-accent hover:bg-baseColor transition duration-300"
    >
      {children}
    </Link>
  );
}

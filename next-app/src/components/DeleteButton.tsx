export interface DeleteButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isCheck: boolean;
}

export function DeleteButton({ onClick, isCheck }: DeleteButtonProps) {
  const buttonProps = isCheck
    ? {
        className:
          "leading-tight w-fit border border-formError px-5 py-2 text-formError rounded-md text-base hover:ring-1 ring-formError transition duration-300",
        onClick: onClick,
      }
    : {
        className: `leading-tight  w-fit border border-textOpacity px-5 py-2 text-textLight rounded-md text-base bg-gradient-to-bl from-transparent to-black via-black bg-opacity-50
                bg-[linear-gradient(to_bottom_left,_transparent_49%,_#4D4535_50%,_transparent_51%)]`,
        disabled: true,
      };
  return <button {...buttonProps}>削除</button>;
}

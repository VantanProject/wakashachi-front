interface Props {
    onClese: () => void;
    children?: React.ReactNode;
  }
  
  export function Modal({ onClese, children }: Props) {
    return (
      <div
        className="fixed inset-0 z-20 flex items-center justify-center"
      >
        <div
          className="absolute inset-0 bg-textOpacity"
          onClick={onClese}
        />
        <div
          className="absolute"
        >
          {children}
        </div>
      </div>
    );
  }
  
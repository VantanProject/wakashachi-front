interface Props {
    onClose: () => void;
    children?: React.ReactNode;
  }
  
  export function Modal({ onClose, children }: Props) {
    return (
      <div
        className="fixed inset-0 z-30 flex items-center justify-center"
      >
        <div
          className="absolute inset-0 bg-textOpacity"
          onClick={onClose}
        />
        <div
          className="absolute"
        >
          {children}
        </div>
      </div>
    );
  }
  
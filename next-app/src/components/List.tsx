export interface ListProps {
    title: string;
    height?: string;
    children: React.ReactNode;
  }
  
  export function List({
    title,
    height = "calc(100vh - 105px)",
    children,
  }: ListProps) {
    return (
      <div className={`bg-baseColor w-full rounded-2xl border border-textLight`} style={{ height }}>
        <div>
          <h1
            className="text-4xl border-b border-textLight py-4 px-3 text-text"
            style={{ textShadow: "2px 2px 3px rgba(0, 0, 0, 0.4)" }}
          >
            {title}
          </h1>
        </div>
        <div className="p-5">
          {children}
        </div>
      </div>
    );
  }
  
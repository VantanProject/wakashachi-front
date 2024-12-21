export interface ListProps {
    title: string;
    height: string;
    children: React.ReactNode;
}

export function List({ title, height, children }: ListProps) {
    return (
        <div className={`bg-baseColor w-[900px] rounded-2xl border border-textLight`}>
            <div>
                <h1 
                    className="text-4xl border-b border-textLight py-4 px-3 text-text"
                    style={{ textShadow: '2px 2px 3px rgba(0, 0, 0, 0.4)' }}
                >
                    {title}
                </h1>
            </div>
            <div className={`h-${height} p-5`}>
                {children}
            </div>
        </div>
    )
}

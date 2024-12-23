import Image from 'next/image';

export interface SearchBoxProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    placeholder: string;
}

export function SearchBox({ onChange, value, placeholder }: SearchBoxProps) {
    return (
        <div className="relative">
            <input 
                type="text"
                className="peer w-[500px] h-11 pl-8 pr-12 border border-textOpacity rounded-md text-text placeholder:text-base focus:outline-none focus:border-text"
                onChange={onChange}
                value={value}
                placeholder={placeholder}
            />
            <Image
                className='absolute left-[460px] top-1/2 transform -translate-y-1/2 opacity-60 peer-focus:opacity-100'
                src="/search.svg"
                alt="検索のアイコン"
                width={32}
                height={32}
            />
        </div>
    );
}

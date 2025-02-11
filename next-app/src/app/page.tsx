import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4 flex flex-col items-center justify-center h-[calc(100vh-70px)]">
      <div className="flex justify-center">
        <Image
          src="/top-logo.png"
          width={550}
          height={208}
          alt="トップページのロゴ"
          unoptimized
        />
      </div>
      <div className="flex w-[1248px] mt-32 mx-auto justify-between">
        <Link
          href="/merch"
          className="w-[272px] h-[311px] bg-baseColor rounded-2xl border-[3px] border-accent shadow-lg cursor-pointer"
        >
          <div className="mt-8 text-text text-2xl text-center">
            <div className="flex w-[208px] h-[208px] mx-auto items-center">
              <Image
                className="mx-auto"
                src="/top-food-icon.svg"
                width={125}
                height={118.35}
                alt="商品情報一覧のアイコン"
              />
            </div>
            <p className="mt-[10px]">商品情報一覧</p>
          </div>
        </Link>
        <Link
          href="/merch/store"
          className="w-[272px] h-[311px] bg-baseColor rounded-2xl border-[3px] border-accent shadow-lg cursor-pointer"
        >
          <div className="mt-8 text-text text-2xl text-center">
            <div className="w-[208px] h-[208px] mx-auto items-center bg-[url(/top-food-icon.svg)] bg-no-repeat bg-center">
              <Image
                className="relative top-[calc((208px_-_47.83px)_-_17.08px)] left-[calc((208px_-_47.83px)_-_17.08px)]"
                src="/top-pulus-icon.svg"
                width={47.83}
                height={47.83}
                alt="商品情報新規登録のアイコン"
              />
            </div>
            <p className="mt-[10px]">商品情報新規登録</p>
          </div>
        </Link>
        <Link
          href="/menu"
          className="w-[272px] h-[311px] bg-baseColor rounded-2xl border-[3px] border-accent shadow-lg cursor-pointer"
        >
          <div className="mt-8 text-text text-2xl text-center">
            <div className="flex w-[208px] h-[208px] mx-auto items-center">
              <Image
                className="mx-auto"
                src="/top-menu-list.svg"
                width={125}
                height={138.89}
                alt="メニュー表一覧のアイコン"
              />
            </div>
            <p className="mt-[10px]">メニュー表一覧</p>
          </div>
        </Link>
        <Link
          href="/menu/store"
          className="w-[272px] h-[311px] bg-baseColor rounded-2xl border-[3px] border-accent shadow-lg cursor-pointer"
        >
          <div className="mt-8 text-text text-2xl text-center">
            <div className="w-[208px] h-[208px] mx-auto items-center bg-[url(/top-menu-list.svg)] bg-no-repeat bg-center">
              <Image
                className="relative top-[calc(208px_-_47.83px)] left-[calc((208px_-_47.83px)_-_(17.08px_/_2))]"
                src="/top-pulus-icon.svg"
                width={47.83}
                height={47.83}
                alt="新規メニュー表作成のアイコン"
              />
            </div>
            <p className="mt-[10px]">新規メニュー表作成</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

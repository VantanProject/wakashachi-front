import Header from '@/components/Header';

const MainLayout = ({ children }:any) => {
    return (
        <div>
            <Header />
            <main className='pt-[70px]'>{children}</main>
        </div>
    );
};

export default MainLayout;
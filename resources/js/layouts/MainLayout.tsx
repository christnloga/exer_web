import type { PropsWithChildren } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ScrollTop from '@/components/ScrollTop';

const MainLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
            <Navbar />
            <main className="grow">{children}</main>
            <Footer />
            <ScrollTop />
        </div>
    );
};

export default MainLayout;

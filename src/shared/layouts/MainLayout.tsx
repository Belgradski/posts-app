import React from "react";
import Header from "../../widgets/LayoutHeader";
import Footer from "../../widgets/LayoutFooter";
import styles from './MainLayout.module.css'

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
    return (
        <div className={styles.mainLayout}>
            <Header/>
            <main className={styles.main}>
                {children}
            </main>
            <Footer/>
        </div>
    )
}

export default MainLayout;
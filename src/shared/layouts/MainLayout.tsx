import React from "react";
import Header from "../../widgets/LayoutHeader";
import Footer from "../../widgets/LayoutFooter";
import styles from './MainLayout.module.css'
import { Outlet } from "react-router-dom";




const MainLayout: React.FC = () => {
    return (
        <div className={styles.mainLayout}>
            <Header/>
            <main className={styles.main}>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}

export default MainLayout;
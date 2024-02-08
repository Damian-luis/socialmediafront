import react from 'react';
import { Sidebar } from '../components/Sidebar';
import { useState } from 'react';
import { Login } from '../components/Login';
import { Home } from '../components/Home';
import styles from "./layout.module.css"
import { SidebarOptional } from '../components/SidebarOptional';
export const Layout=({children})=>{

    //const isLogged=localStorage.getItem('logged')
    
    return <>
     
     <div className={styles.main}>
                
                <main style={{display:"flex"}}>
                    <Sidebar/>
                    {children}
                    <SidebarOptional />
                </main>
                
            </div>
        
    
    </>
}


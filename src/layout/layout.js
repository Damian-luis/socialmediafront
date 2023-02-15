import react from 'react';
import { Sidebar } from '../components/Sidebar';
import { useState } from 'react';
import { Login } from '../components/Login';
import { Home } from '../components/Home';

export const Layout=({children})=>{

    const [authenticated, setAuthenticated] = useState(true);
    return <>
    
        <div className="main">
            
           {authenticated?<Login/>:<Home/>}
        <div className="content">
           
        </div>
        </div>
        
    
    </>
}


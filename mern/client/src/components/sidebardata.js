import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [  
    {   title: 'Home',    
        path: '/',    
        icon: <AiIcons.AiFillHome />,    
        cName: 'nav-text'  
    },  
    {    
        title: 'Bloggs',
        path: '/bloggs',    
        icon: <IoIcons.IoIosPaper />,    
        cName: 'nav-text'  
    },  
    {    
        title: 'Network',    
        path: '/network',    
        icon: <FaIcons.FaCartPlus />,    
        cName: 'nav-text'  
    },  
    {    
        title: 'Admin',    
        path: '/admin',    
        icon: <IoIcons.IoMdPeople />,    
        cName: 'nav-text'  
    },  
];
import React from 'react';
import HeaderSection from './HeaderSection';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import Index from './Index';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const user = useSelector((state) => state.user);


  const backgroundColor = user.color || '#003366';  

  return (
    <div>
   
      <header>
        <HeaderSection />
      </header>
      <main className='relative'>
        <NavigationBar/>
        <div className='my-10'>
         <Outlet/>
        </div>
      </main>


      <footer style={footerStyle}>
        <Footer />
      </footer> 
    </div>
  );
};



const headerStyle = {
  backgroundColor: '#ffffff',
  padding: '10px 10px',
  marginBottom: '30px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
  borderRadius: '8px',
};

const mainContentStyle = {
  display: 'flex',
  flex: 1,
  padding: '20px',
  justifyContent: 'space-between',
};

const sidebarStyle = {
  width: '250px',
  backgroundColor: '#ffffff',
  padding: '20px',
  marginRight: '20px',
};

const mainSectionStyle = {
  flex: 1,
  padding: '20px',
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const footerStyle = {

  color: '#ffffff',
  padding: '20px 20px',
  textAlign: 'center',
  boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
};

export default Layout;

import { Link } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import logo from './../../public/logo.png';
import profileImage from './../assets/profileImage.png';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Sidebar() {
  const [userData, setUserData] = useState({
    name: '',
    email: ''
  });

  const fetchUserData = async () => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (!token) return;

    try {
      const response = await axios.get('http://172.210.36.34:8080/users/me', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Response data:', response.data); // Debugging log
      setUserData({
        name: response.data.name,
        email: response.data.email
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="bg-white top-0 h-[100vh] w-[13%] fixed flex flex-col 
        items-center justify-between p-2">
      {/* Logo */}
      <div className="pt-8">
        <img src={logo} alt="website-logo" />
         {/* NavLinks */}
      <div className="flex flex-col items-start gap-2 w-full pt-20">
        <Link className="w-full flex flex-row items-center gap-3 text-xs 
                font-semibold bg-indigo-600 text-white p-3 rounded-md
                transition duration-100">
          <MdDashboard className="text-xl" />
          Dashboard
        </Link>
      </div>
      </div>
     
      {/* Profile Component */}
      <div className="flex flex-col items-center gap-3 w-full hover:bg-indigo-600 
             p-3 transition duration-100 group rounded-md">
        <div className="flex flex-col items-center">
          <label className="text-md font-bold text-gray-800 group-hover:text-white ">
            {userData.name}
          </label>
          <label className="text-xs font-medium text-gray-600 group-hover:text-white">
            {userData.email}
          </label>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

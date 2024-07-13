import React, { useState , useContext } from 'react';
import axios from 'axios';
import logo from './../../public/logo.png';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { AuthContext } from '../context/AuthProvider';
import { useEffect } from 'react';

function Login() {
  const navigate = useNavigate();
  const { setToken , successSignup } = useContext(AuthContext);

  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false
  });

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (successSignup) {
      alert('User has successfully signed up!');
    }
  }, [successSignup]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: false }); // Reset error state on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {
      email: !formValues.email,
      password: !formValues.password
    };
    setFormErrors(errors);

    // Check if any errors exist
    const hasErrors = Object.values(errors).some(error => error);
    if (!hasErrors) {
      try {
        const response = await axios.post('http://172.210.36.34:8080/token', new URLSearchParams({
          username: formValues.email,
          password: formValues.password
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        console.log('Form submitted:', response.data);

        // Store the token in localStorage or any state management solution
        const token = response.data.access_token;
        setToken(token);
        localStorage.setItem('token', token);
        console.log('Token:', token);

        // Reset form values
        setFormValues({
          email: '',
          password: ''
        });

        // Clear error message and navigate to dashboard
        setErrorMessage('');
        navigate('/app/dashboard');
      } catch (error) {
        console.error('Error logging in:', error);
        setErrorMessage('Incorrect email or password. Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 h-[100vh] bg-gray-100 w-[50vw]">
      <img src={logo} alt="Logo" className="w-auto h-20" />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 bg-white rounded shadow-md flex flex-col items-center gap-6"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formValues.email}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded text-sm outline-none ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formValues.password}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded text-sm outline-none ${formErrors.password ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <Button label='LOG IN' primary />
      </form>
      <p className='text-xs text-gray-800 font-medium'>Don't have an account? 
        <span onClick={() => navigate('signup')} className='text-sky-600 cursor-pointer'> Sign Up</span>
      </p>
    </div>
  );
};

export default Login;

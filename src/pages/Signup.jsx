import React, { useState , useContext } from 'react';
import axios from 'axios';
import logo from './../../public/logo.png';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { AuthContext } from '../context/AuthProvider';

function Signup() {
  const navigate = useNavigate();
  const { setSuccessSignup } = useContext(AuthContext);

  const [formValues, setFormValues] = useState({
    name: '',
    password: '',
    email: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    password: false
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: false }); // Reset error state on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {
      name: !formValues.name,
      email: !formValues.email,
      password: !formValues.password
    };
    setFormErrors(errors);

    // Check if any errors exist
    const hasErrors = Object.values(errors).some(error => error);
    if (!hasErrors) {
      try {
        const response = await axios.post('http://172.210.36.34:8080/register/', {
          name: formValues.name,
          email: formValues.email,
          password: formValues.password
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Form submitted:', response.data);

        // Reset form values
        setFormValues({
          name: '',
          password: '',
          email: '',
        });

        // Set success message and navigate to login page
        setSuccessMessage('Signed up successfully!');
        setSuccessSignup(true);
        navigate('/');
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrorMessage('Email Already Exist');
      }
    }
  };

  
  return (
    <div className="flex flex-col items-center justify-center gap-8 min-h-screen bg-gray-100 w-[50vw]">
      <img src={logo} alt="Logo" className="w-auto h-20" />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 bg-white rounded shadow-md flex flex-col items-center gap-6"
      >
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formValues.name}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded text-sm outline-none ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
        />
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
        <Button label="SIGN UP" primary />
      </form>
      {successMessage && <p className="text-green-500 text-sm mt-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 text-sm mt-4">{errorMessage}</p>}
      <p className="text-xs text-gray-800 font-medium">
        Already have an account?{' '}
        <span onClick={() => navigate('/')} className="text-sky-600 cursor-pointer">
          Login
        </span>
      </p>
    </div>
  );
}

export default Signup;

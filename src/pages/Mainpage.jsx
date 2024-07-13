import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import CardBalance from "../components/CardBalance";
import IncomeCard from "../components/IncomeCard";
import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import AnalyticChart from "../components/AnalyticChart";
import ActivityChart from "../components/ActivityChart";
import Transaction from "../components/Transaction";
import Chatbot from "../components/ChatBot";
import PieChart from "../components/PieChart";
import Summary from "../components/Summary";
import Loader from "../components/Loader";
import { AuthContext } from '../context/AuthProvider';
import addFileIcon from './../assets/addFile.png';

function MainPage() {
  const { data, setData } = useContext(AuthContext);
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccessful, setUploadSuccessful] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalOutcome, setTotalOutcome] = useState(0);

  // Calculate total income and outcome when data changes
  useEffect(() => {
    if (data && data.scores) {
      const income = data.scores.reduce((acc, score) => acc + score.total_credit, 0);
      const outcome = data.scores.reduce((acc, score) => acc + score.total_debit, 0);
      setTotalIncome(income);
      setTotalOutcome(outcome);
    }
  }, [data]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const uploadedFiles = Array.from(e.dataTransfer.files);
    setFiles(uploadedFiles);
    handleUploadAnimation(uploadedFiles);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    handleUploadAnimation(selectedFiles);
  };

  const handleUploadAnimation = (filesToUpload) => {
    setUploading(true);
    uploadFiles(filesToUpload);
  };

  const uploadFiles = async (filesToUpload) => {
    const formData = new FormData();
    filesToUpload.forEach((file) => {
      formData.append('file', file);
    });

    const token = localStorage.getItem('token'); // Get token from localStorage

    try {
      const response = await axios.post('http://172.210.36.34:8080/upload_pdf/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      console.log('Upload successful:', response.data);
      setData(response.data);
      setUploadSuccessful(true);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='flex flex-col gap-8'>
      {/* File Upload */}
      <div 
        className={`bg-white rounded p-8 mt-4 ${dragging ? 'border-blue-500' : 'border-gray-300'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          multiple 
          onChange={handleFileSelect} 
          style={{ display: 'none' }} 
          id="fileUpload" 
        />
        <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center justify-center">
          <img src={addFileIcon} className="w-16 h-auto mb-2 text-white" />
          {dragging ? 
            <p className="text-gray-800 font-semibold">Drop your file here ...</p> : 
            <p className="text-gray-800 font-semibold">Drag 'n' drop some files here, or click to select files</p>
          }
          <p className="text-gray-400 mt-1 text-sm">Support: pdf</p>
        </label>
        {/* Display selected files */}
        {uploading ? (
          <Loader />
        ) : (
          <ul className="pt-4">
            {files.map((file, index) => (
              <li key={index} className="text-gray-800 font-semibold text-xs">----- {file.name}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Conditionally render the grid section only if upload was successful */}
      {uploadSuccessful && (
        <div className="grid lg:grid-cols-5 grid-cols-3 gap-4">
          <div className="col-span-2 w-full flex flex-col items-center gap-4">
            <div className="flex flex-row w-full gap-4">
              <IncomeCard 
                heading='Total Income'
                amount={totalIncome.toFixed(2)}
                icon={<MdArrowDownward style={{ transform: 'rotate(40deg)' }} className='text-white text-xl' />}
                Income/>
              <IncomeCard 
                heading='Total Outcome'
                amount={totalOutcome.toFixed(2)}
                icon={<MdArrowUpward style={{ transform: 'rotate(40deg)' }} className='text-white text-xl' />} 
              />
            </div>
            <AnalyticChart/>
            <Transaction />
          </div>
          <div className="col-span-1 flex flex-col gap-4">
            <PieChart/>
            <ActivityChart />
          </div>
          <div className="lg:col-span-1 col-span-2 w-full flex flex-col gap-4">
            <Chatbot/>
          </div>
          <div className="lg:col-span-1 col-span-1 w-full flex flex-col gap-4">
            <Summary />
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;

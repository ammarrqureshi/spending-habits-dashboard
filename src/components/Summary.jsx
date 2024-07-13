import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

function Summary() {
  const { data } = useContext(AuthContext);

  // Ensure data is available
  if (!data || !data.scores || data.scores.length === 0) {
    return <div>Loading...</div>;
  }

  // Get the latest object from data.scores (first element)
  const latestData = data.scores[0];

  return (
    <div className="bg-white rounded-md p-3 flex flex-col items-start gap-4 w-full lg:h-[70vh] h-[50vh] overflow-y-auto scrollbar-thin">
      <h1 className="font-bold text-gray-800 text-xl">Summary</h1>
      <div className="flex flex-col items-start gap-3">
        <p className="text-gray-800 font-medium text-xs bg-indigo-100 rounded p-2">
          {latestData.summary}
        </p>
      </div>
    </div>
  );
}

export default Summary;

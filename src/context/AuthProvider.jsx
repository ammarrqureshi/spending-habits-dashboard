import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

function AuthProvider(props) {
  const [token, setToken] = useState(null);
  const [data, setData] = useState();
  const [successSignup, setSuccessSignup]=useState(false);

  const setDataWithUniqueScores = (newData) => {
    if (!newData || !newData.scores) return;

    const seen = new Set();
    const uniqueScores = newData.scores.filter(score => {
      const identifier = `${score.month}-${score.year}`;
      if (seen.has(identifier)) {
        return false;
      } else {
        seen.add(identifier);
        return true;
      }
    });

    setData({ ...newData, scores: uniqueScores });
  };

  useEffect(() => {
    if (data && data.scores) {
      console.log('Unique Data is:', data.scores);
    }
  }, [data]);

  return (
    <AuthContext.Provider value={{ token, setToken, data, setData: setDataWithUniqueScores , successSignup, setSuccessSignup }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

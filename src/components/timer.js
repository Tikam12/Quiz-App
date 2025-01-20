import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Timer = ({ secs, evaluate, questions, options, userAns, correctAns }) => {
  const [counter, setCounter] = useState(secs);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter > 0) {
        setCounter(prevCounter => prevCounter - 1);
      } else {
        clearInterval(interval);
        const marks = evaluate();
        const data = { marks, questions, options, userAns, correctAns};
        navigate('/feedback', { state: {data:{data}} });
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [counter, evaluate, navigate]);

  return (
    <div className="text-center">
      <h3>
        {Math.floor(counter / 60)} mins {counter % 60} secs
      </h3>
    </div>
  );
};

export default Timer;

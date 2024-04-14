import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  const [isActive, setIsActive] = useState(false);

  const toggleStartStop = useCallback(() => {
    setIsActive(prevIsActive => !prevIsActive);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
        toggleStartStop();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [toggleStartStop]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime(prevTime => {
          let newMilliseconds = prevTime.milliseconds + 10;
          let newSeconds = prevTime.seconds;
          let newMinutes = prevTime.minutes;
          let newHours = prevTime.hours;

          if (newMilliseconds === 1000) {
            newMilliseconds = 0;
            newSeconds++;
          }
          if (newSeconds === 60) {
            newSeconds = 0;
            newMinutes++;
          }
          if (newMinutes === 60) {
            newMinutes = 0;
            newHours++;
          }

          return {
            hours: newHours,
            minutes: newMinutes,
            seconds: newSeconds,
            milliseconds: newMilliseconds
          };
        });
      }, 10);
    } else if (!isActive && time.milliseconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleReset = () => {
    setTime({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    setIsActive(false);
  };

  const formatTime = (time) => {
    return (
      <div className="time">
        <span className="hours">{time.hours < 10 ? '0' + time.hours : time.hours}</span>:
        <span className="minutes">{time.minutes < 10 ? '0' + time.minutes : time.minutes}</span>:
        <span className="seconds">{time.seconds < 10 ? '0' + time.seconds : time.seconds}</span>.
        <span className="miliseconds">{time.milliseconds < 10 ? '00' + time.milliseconds : time.milliseconds < 100 ? '0' + time.milliseconds : time.milliseconds}</span>
      </div>
    );
  };
  

  return (
    <div className="App">
      <h1 className="title">Stoper</h1>
      <div className="timer">{formatTime(time)}</div>
      <div className="buttons">
        <button className="start-stop" onClick={toggleStartStop}>{isActive ? 'Stop' : 'Start'}</button>
        <button className="reset" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default App;

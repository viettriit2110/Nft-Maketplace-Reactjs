import React from "react";

const Completionist = () => <span>Time's up!</span>;

const Countdown = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    return (
      <div aria-hidden="true" className="countdown__timer">
        <span className="countdown__item">
          <span className="countdown__value countdown__value--0 js-countdown__value--0">
            {days}
          </span>
          <span className="countdown__label">:</span>
        </span>
        <span className="countdown__item">
          <span className="countdown__value countdown__value--1 js-countdown__value--1">
            {hours}
          </span>
          <span className="countdown__label">:</span>
        </span>
        <span className="countdown__item">
          <span className="countdown__value countdown__value--2 js-countdown__value--2">
            {minutes}
          </span>
          <span className="countdown__label">:</span>
        </span>
        <span className="countdown__item">
          <span className="countdown__value countdown__value--3 js-countdown__value--3">
            {seconds}
          </span>
          <span className="countdown__label"></span>
        </span>
      </div>
    );
  }
};

export default Countdown;

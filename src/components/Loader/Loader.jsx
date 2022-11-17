import React from 'react';
import './Loader.css';
import loadingImg from './loader.gif';

const Loading = () => (
  <div className="loading">
    <img src={loadingImg} alt="loading" />
  </div>
);

export default Loading;
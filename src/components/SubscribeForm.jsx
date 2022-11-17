import React from 'react';
const Subscribe = () => (
  <div className="form-subcribe">
    <form
      id="subscribe-form"
      action="#"
      method="GET"
      acceptCharset="utf-8"
      className="form-submit"
    >
      <input
        name="email"
        className="email"
        type="email"
        placeholder="info@yourgmail.com"
        required
      />
      <button id="submit" name="submit" type="submit">
        <i className="icon-fl-send"></i>
      </button>
    </form>
  </div>
);

export default Subscribe;
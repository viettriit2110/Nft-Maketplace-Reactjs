import React from 'react';
import CustomDropdown from '../../../components/Dropdown';
import { Dropdown } from 'react-bootstrap';

const Filters = ({onSelect}) => (

  <div className="wrap-box explore-1 flex mg-bt-40 fillter__wrapper">
    <div className="seclect-box style-1">
      <CustomDropdown name="All categories" onSelect={onSelect}>
        <Dropdown.Item eventKey="fire">Fire</Dropdown.Item>
        <Dropdown.Item eventKey="water">Water</Dropdown.Item>
        <Dropdown.Item eventKey="plant">Plant</Dropdown.Item>
      </CustomDropdown>
    </div>
    <div className="seclect-box style-2 box-right">
      {/* <div id="artworks" className="dropdown">
        <a href="#" className="btn-selector nolink">All Artworks</a>
        <ul>
          <li><span>Abstraction</span></li>
          <li><span>Skecthify</span></li>
          <li><span>Patternlicious</span></li>
          <li><span>Virtuland</span></li>
          <li><span>Papercut</span></li>
        </ul>
      </div> */}
      <CustomDropdown name="Sort by">
        <Dropdown.Item eventKey="1">Top rate</Dropdown.Item>
        <Dropdown.Item eventKey="2">Mid rate</Dropdown.Item>
        <Dropdown.Item eventKey="3">Low rate</Dropdown.Item>
      </CustomDropdown>
    </div>
  </div>
);

export default Filters;
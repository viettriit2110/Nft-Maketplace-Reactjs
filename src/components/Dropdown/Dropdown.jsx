/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import './Dropdown.css';


const CustomToggle = React.forwardRef(((props, ref) => (
  <a
    href="#"
    className="btn-selector nolink"
    ref={ref}
    onClick={e => {
      e.stopPropagation();
      e.preventDefault();
      props.onClick(e);
    }}

  >
    {props.children}
  </a>
)));

const CustomMenu = React.forwardRef(
  (props, ref) => {

    return (
      <ul className="list-unstyled" ref={ref}>
        {React.Children.toArray(props.children).map(
          (child, index) =>
            <li key={index}><span>{child}</span></li>
        )}
      </ul>
    );
  },
);

const CustomDropdown = ({ name, onSelect, children }) => (
  <Dropdown autoClose="outside" onSelect={onSelect}>
    <Dropdown.Toggle as={CustomToggle}>
      {name}
    </Dropdown.Toggle>
    <Dropdown.Menu as={CustomMenu}>
      {children}
    </Dropdown.Menu>
  </Dropdown>
);

export default CustomDropdown;
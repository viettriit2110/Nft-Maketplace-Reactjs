import React, { useState } from "react";

const InlineEdit = ({ name = 'name', value = '', setValue }) => {
  const [formData, setFormData] = useState({ [name]: "" });

  const onChange = (event) => {
    event.preventDefault();
    const element = event.currentTarget;
    setFormData({ ...formData, [element.name]: element.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValue(formData);
  };

  return (<form>
    <input
      name={name}
      type="text"
      aria-label="Field name"
      defaultValue={value}
      onChange={onChange}
    />
    <button type="submit" onClick={onSubmit} title="Save" style={{
      right: "auto",
      color: "rgb(0 255 137)",
      marginTop: "5px"
    }}>
      <i className="fas fa-check"></i>
    </button>
  </form>
  )
}

export default InlineEdit;
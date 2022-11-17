import React, { useState } from "react";
import AvatarEdit from "./AvatarEdit";
import UserAvatar from "react-user-avatar";
import "./AvatarImage.css";

export const AvatarImage = ({ image, name, size, editable = true }) => {
  const [avatarEditing, toggleAvatarEdit] = useState(false);
  const toggleChangeAvatar = () => toggleAvatarEdit(!avatarEditing);

  const renderEditAvatar = (isEditEnable) => {
    if (isEditEnable) {
      return <AvatarEdit />;
    } else {
      return (
        <div>
          <UserAvatar
            size={size}
            name={name}
            src={image}
            className="user-avatar"
          />
          {editable ? (
            <button
              onClick={toggleChangeAvatar}
              title="Edit"
              className="btn-edit">
              <i className="fa fa-pencil"></i>
            </button>
          ) : null}
        </div>
      );
    }
  };
  return <>{renderEditAvatar(avatarEditing)}</>;
};
AvatarImage.defaultProps = {
  size: 237,
  name: "NA",
  image: "",
};
export default AvatarImage;

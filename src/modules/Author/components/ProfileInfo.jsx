import React, { useState } from 'react';
import AvatarImage from '../../../components/AvatarImage';
import InlineEdit from '../../../components/InlineEdit';
import { copyText } from '../../../utils';

/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/accessible-emoji */
const Author = ({
  image,
  fullName = "No Name",
  walletAddress,
  onChangeName = () => { },
  editable,
}) => {
  const [titleEditing, toggleTitleChange] = useState(false);

  const handleCopyText = () => {
    if (!walletAddress) {
      return;
    }
    copyText(walletAddress);
  }
  const toggleChangeTitle = () => toggleTitleChange(!titleEditing);
  const onChangeDisplayName = ({ name }) => {
    onChangeName(name);
    toggleTitleChange(false);
  }

  return (
    <>
      <div className="feature-profile">
        <AvatarImage name={fullName || "No Name"} image={image} editable={false} />
      </div>
      <div className="infor-profile">
        <span>Author Profile</span>
        <h2 className="title">
          {
            titleEditing ? <InlineEdit name={"name"} value={fullName} setValue={onChangeDisplayName} />
              :
              <>{fullName.length > 25 ? fullName.substring(0, 25) + '...' : fullName || "No Name"}
                {
                  editable ?
                    <button onClick={toggleChangeTitle} title="Edit name" style={{
                      right: "auto",
                      color: "#fff",
                      marginTop: "-10px"
                    }}>
                      <i className="fa fa-pencil"></i>
                    </button>
                    : null
                }

              </>
          }
        </h2>
        <form>
          <input type="text" className="inputcopy" defaultValue={walletAddress} readOnly={true} />
          <button type="button" className="btn-copycode" onClick={handleCopyText}><i className="icon-fl-file-1"></i></button>
        </form>
      </div>
      <div className="widget-social style-3">
        <ul>
          <li><a href="#"><i className="fab fa-twitter"></i></a></li>
          <li className="style-2"><a href="#"><i className="fab fa-telegram-plane"></i></a></li>
          <li><a href="#"><i className="fab fa-youtube"></i></a></li>
          <li className="mgr-none"><a href="#"><i className="icon-fl-tik-tok-2"></i></a></li>
        </ul>
        <div className="btn-profile"><a href="login.html" className="sc-button style-1 follow">Follow</a></div>
      </div>
    </>
  );
}

export default React.memo(Author);
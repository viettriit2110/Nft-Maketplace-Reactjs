import React, { useState } from "react";
import ImageUploading from 'react-images-uploading';
import './AvatarImage.css';

export const AvatarEdit = () => {
  const [images, setImages] = useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <ImageUploading
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div className="upload__image-wrapper">
          {
            imageList.length ?
              imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image['data_url']} alt="" className="upload-preview" />
                  <div className="image-item__btn-wrapper">
                    <button onClick={() => onImageUpdate(index)}>Update</button>
                    <button onClick={() => onImageRemove(index)}>Remove</button>
                  </div>
                </div>
              ))
              : <button
                  style={isDragging ? { color: 'red' } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </button>
          }
        </div>
      )}
    </ImageUploading>
  );
};
export default AvatarEdit;
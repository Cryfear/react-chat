import classNames from "classnames";
import React, { useRef, useState } from "react";
import { UsersApi } from "../../../../api/UsersApi";

export const FileUpload = () => {
  const [file, setFile] = useState<File | File[]>();
  const el = useRef<HTMLInputElement>(null);

  const [uploadStatus, setUploadStatus] = useState<"changed!" | null | "fail.">(null);

  const handleChange = (e: any) => {
    if(e.target.files) {
      const file: File | File[]  = e.target.files[0];

      setFile(file);
    }
    
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", file as Blob);

    UsersApi.changeUserPhoto(formData)
      .then((data) => {
        data.responseCode === "success" ? setUploadStatus("changed!") : setUploadStatus("fail.");
      })
      .catch(() => setUploadStatus("fail."));
  };

  return (
    <div>
      <div className="file-upload">
        <button className="change__photo">
          <label htmlFor="avatar_loader">Choose a photo</label>
        </button>
        <input
          id="avatar_loader"
          type="file"
          ref={el}
          style={{ display: "none" }}
          onChange={handleChange}
        />

        <button onClick={uploadFile} className="upbutton">
          Upload photo
        </button>

        <div
          className={classNames(
            uploadStatus === "changed!" ? "file-upload__result-success" : "file-upload__result-fail"
          )}
        >
          {uploadStatus}
        </div>
      </div>
    </div>
  );
};

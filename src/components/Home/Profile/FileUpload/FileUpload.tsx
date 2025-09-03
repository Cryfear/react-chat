import classNames from "classnames";
import React, { useRef, useState } from "react";
import { uploadFileFx } from "../../../Auth/Login/Login.model";

export const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const el = useRef<HTMLInputElement>(null);

  const [uploadStatus, setUploadStatus] = useState<"changed!" | null | "fail.">(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <div className="file-upload">
        <button className="change__photo" >
          <label htmlFor="avatar_loader">Choose a photo</label>
        </button>
        <input
          id="avatar_loader"
          type="file"
          ref={el}
          style={{ display: "none" }}
          onChange={handleChange}
        />

        <button onClick={() => uploadFileFx(file)} className="upbutton" disabled={!file}>
          Upload photo
        </button>

        {uploadStatus && (
          <div
            className={classNames(
              uploadStatus === "changed!"
                ? "file-upload__result-success"
                : "file-upload__result-fail"
            )}
          >
            {uploadStatus}
          </div>
        )}
      </div>
    </div>
  );
};

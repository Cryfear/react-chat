import classNames from "classnames";
import React, { useState } from "react";
import { UsersApi } from "../../../api/UsersApi";
import { logoutFx } from "../../Auth/Login/Login.model";
import { FileUpload } from "./FileUpload/FileUpload";
import { Link } from "react-router-dom";
import { OpenedProfileTypes } from "../Home.types";
import { Button } from "@radix-ui/themes";

type statusType = "changed!" | null | "fail.";

export const OpenedProfile = ({ isOpen, name, avatar }: OpenedProfileTypes) => {
  //let navigate = useNavigate();
  const [isChangingName, setIsChangingName] = useState(false);
  const [isChangingPhoto, setIsChangingPhoto] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  // меняется ли в данный момент определенный блок профиля, например, меняется ли имя?

  const [changeNameValue, setChangeNameValue] = useState("");
  const [changeOldPasswordValue, setChangeOldPasswordValue] = useState("");
  const [changeNewPasswordValue, setChangeNewPasswordValue] = useState("");
  // значения инпутов

  const changePasswordHandler = () => {
    UsersApi.changeUserPassword({
      newPassword: changeNewPasswordValue,
      oldPassword: changeOldPasswordValue,
      email: sessionStorage["email"],
      authToken: sessionStorage["auth-token"],
    }).then((data) => {
      data.responseCode === "success"
        ? setUploadStatusPassword("changed!")
        : setUploadStatusPassword("fail.");
    });
  };

  const changeUsernameHandler = () => {
    UsersApi.changeUserName({
      newNickName: changeNameValue,
      email: sessionStorage["email"],
      authToken: sessionStorage["auth-token"],
    }).then((data) => {
      data.responseCode === "success"
        ? setUploadStatusName("changed!")
        : setUploadStatusName("fail.");
    });
  };

  const [uploadStatusPassword, setUploadStatusPassword] = useState<statusType>(null);
  const [uploadStatusName, setUploadStatusName] = useState<statusType>(null);

  return (
    <div className={classNames(isOpen ? "profile" : "profile hidden-content")}>
      <span className="profile__name">{name}</span>
      <img src={avatar || 'null'} alt="profile_photo" />
      <div
        className="profile__edit profile__edit-data"
        onClick={() => {
          setIsChangingPassword(false);
          setIsChangingName(!isChangingName);
          setIsChangingPhoto(false);
        }}
      >
        Change nickname
      </div>
      <div className={classNames(isChangingName ? "trans" : "trans hidden-profile-content")}>
        <input
          value={changeNameValue}
          onChange={(e) => setChangeNameValue(e.target.value)}
          placeholder="New nickname"
          type="text"
          className="change__nickname"
        />

        <div
          className={classNames(
            uploadStatusName === "changed!"
              ? "file-upload__result-success"
              : "file-upload__result-fail"
          )}
        >
          {uploadStatusName}
        </div>

        <button onClick={() => changeUsernameHandler()} className="profile__save-button">
          Save name
        </button>
      </div>
      <div
        className="profile__edit profile__edit-photo"
        onClick={() => {
          setIsChangingPassword(false);
          setIsChangingName(false);
          setIsChangingPhoto(!isChangingPhoto);
        }}
      >
        Change photo
      </div>
      <div className={classNames(isChangingPhoto ? "trans" : "trans hidden-profile-content")}>
        <FileUpload />
      </div>
      <div
        className="profile__edit profile__edit-password"
        onClick={() => {
          setIsChangingPassword(!isChangingPassword);
          setIsChangingName(false);
          setIsChangingPhoto(false);
        }}
      >
        Change password
      </div>
      <div
        className={classNames(
          isChangingPassword ? "trans trans-xtwo" : "trans trans-xtwo hidden-profile-content"
        )}
      >
        <input
          placeholder="Old password"
          type="password"
          value={changeOldPasswordValue}
          onChange={(e) => setChangeOldPasswordValue(e.target.value)}
          className="change__password"
        />
        <input
          placeholder="New password"
          type="password"
          value={changeNewPasswordValue}
          onChange={(e) => setChangeNewPasswordValue(e.target.value)}
          className="change__password"
        />

        <button onClick={() => changePasswordHandler()} className="profile__save-button">
          Change password
        </button>

        <div
          className={classNames(
            uploadStatusPassword === "changed!"
              ? "file-upload__result-success"
              : "file-upload__result-fail"
          )}
        >
          {uploadStatusPassword}
        </div>
      </div>
      <Link to="/home">
        <Button onClick={() => {
          // navigate('/home');
          logoutFx();
        }} className="profile__logout-button" color="crimson" variant="soft">
          Logout
        </Button>
      </Link >
    </div>

  );
};

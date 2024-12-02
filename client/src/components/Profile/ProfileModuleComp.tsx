import React from "react";
import "../../styles/styles.css";
import { User } from "../../types/types";
import ProfileLogInComp from "./ProfileLogInComp";

interface Props {
  updateUserFunc: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const ProfileModuleComp = ({ updateUserFunc }: Props) => {
  return (
    <div className="module-invisible">
      <ProfileLogInComp updateUser={updateUserFunc}></ProfileLogInComp>
    </div>
  );
};

export default ProfileModuleComp;

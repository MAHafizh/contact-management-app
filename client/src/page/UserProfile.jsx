import React from "react";
import { useState } from "react";
import { useEffectOnce, useLocalStorage } from "react-use";
import {
  UserDetailEndpoint,
  UserUpdatePassword,
  UserUpdateProfile,
} from "../lib/api/UserApi";
import { alertError, alertSuccess } from "../lib/alert";
import UserProfileForm from "../components/User/UserProfileForm";

export default function UserProfile() {
  const [profile, setProfile] = useState({
    name: "",
  });
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const [token, _] = useLocalStorage("token", "");

  function handleChangeProfile(e) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  function handleChangePassword(e) {
    setPassword({ ...password, [e.target.name]: e.target.value });
  }

  async function fetchUserDetail() {
    const response = await UserDetailEndpoint(token);
    const responseBody = await response.json();

    if (response.status === 200) {
      setProfile({ name: responseBody.data.name });
    } else {
      await alertError(responseBody.errors);
    }
  }

  async function handleSubmitProfile(e) {
    e.preventDefault();
    const response = await UserUpdateProfile(token, { name: profile.name });
    const responseBody = await response.json();

    if (response.status === 200) {
      alertSuccess("Profile updated successfully");
    } else {
      await alertError(responseBody.errors);
    }
  }

  async function handleSubmitPassword(e) {
    e.preventDefault();

    if (password.password !== password.confirmPassword) {
      await alertError("Password don't match");
      return;
    }

    const response = await UserUpdatePassword(token, {
      password: password.password,
    });
    const responseBody = await response.json();

    if (response.status === 200) {
      setPassword({ password: "", confirmPassword: "" });
      alertSuccess("Password updated successfully");
    } else {
      await alertError(responseBody.errors);
    }
  }

  useEffectOnce(() => {
    fetchUserDetail().then(() => console.log("User Detail Fetched"));
  });

  return (
    <div className="container mx-auto px-4 py-8 flex-grow">
      <div className="flex items-center mb-6">
        <i className="fas fa-user-cog text-blue-400 text-2xl mr-3" />
        <h1 className="text-2xl font-bold text-blue-400">Hello!</h1>
      </div>
      <UserProfileForm
        profile={profile}
        password={password}
        onChangeProfile={handleChangeProfile}
        onChangePassword={handleChangePassword}
        onSubmitProfile={handleSubmitProfile}
        onSubmitPassword={handleSubmitPassword}
      />
    </div>
  );
}

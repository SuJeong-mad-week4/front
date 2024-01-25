// ProfileComponent.js
import { Button } from "antd";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const ProfileComponent = ({ onClose }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 처리
    localStorage.removeItem("user");
    setUser(null);
    onClose(); // 프로필 컴포넌트 닫기
    navigate("/Login");

    return (
      <div
        style={{
          position: "absolute",
          top: "50px",
          left: "0",
          right: "0",
          padding: "20px",
          background: "white",
        }}
      >
        {user && (
          <>
            <div>{user.nickname} 님</div>
            <Button type="link" onClick={handleLogout}>
              로그아웃
            </Button>
          </>
        )}
      </div>
    );
  };
};

export default ProfileComponent;

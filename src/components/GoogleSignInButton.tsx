import React from "react";
import { signInWithGoogle } from "../firebase/Auth";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { FaGoogle } from "react-icons/fa";

const GoogleSignInButton: React.FC = () => {
  const navigate = useNavigate();

  const handleSignIn = async () => {
    await signInWithGoogle()
      .then((res) => {
        if (res.user) {
          navigate("/");
          console.log(res.user.uid);
        } else {
          return null;
        }
      })
      .catch((err) => console.log(`Error During Loggging`, err));
  };

  return (
    <Button
      onClick={handleSignIn}
      className=" border border-zinc-800 p-5 px-4 flex items-center bg-[#0A0A0A] gap-x-3 "
      variant={"ghost"}
    >
      <FaGoogle size={"20"} />
      <h1 className="text-lg font-sans ">Google</h1>
    </Button>
  );
};

export default GoogleSignInButton;

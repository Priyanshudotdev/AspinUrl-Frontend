import React from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const name = currentUser?.displayName || "";
  const shortName = name.slice(0, 1);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign out error", error);
      });
  };

  return (
    <>
      <nav className="w-full flex items-center justify-between px-[5vw] md:px-[4vw] lg:px-[5vw] h-[4.2rem] border-b border-dashed border-b-zinc-600 top-0 z-10">
        <Link to="/">
          <h1 className="font-cinzel text-[1.3rem] font-bold md:text-[1.6rem]">
            AspinURL
          </h1>
        </Link>
        {!currentUser ? (
          <Button
            onClick={() => {
              navigate("/auth");
            }}
            className="active:opacity-[0.5] h-[2rem] md:px-6 md:h-auto"
          >
            Login
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full overflow-hidden">
              <Avatar>
                <AvatarImage
                  src={currentUser.photoURL || ""}
                  className="object-contain"
                />
                <AvatarFallback>{shortName}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4 text-center">
              <DropdownMenuLabel>{currentUser.displayName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={"/dashboard"} className="flex">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  <span>My Links</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span onClick={handleLogOut}>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
    </>
  );
};

export default Header;

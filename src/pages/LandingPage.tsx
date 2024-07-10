import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { currentUser, loading } = useAuth();

  const [longLink, setLongLink] = useState<string>("");

  const userId = currentUser?.uid;
  const navigate = useNavigate();

  const handleCreateShortLink = () => {
    navigate(`/dashboard?url=${longLink}`);
  };

  return (
    <div className="w-full px-[5vw] md:px-[4vw] lg:px-[5vw] py-8 flex flex-col items-center h-auto">
      <h2 className="mt-[5rem] font-poppins font-extrabold text-center text-3xl sm:text-4xl md:text-6xl lg:text-7xl sm:my-16">
        Your Shortcut to the Web <br />
        Shorten. Share. Simplify.
      </h2>
      <form
        className="mt-10 w-full flex flex-col items-center md:flex-row md:w-[60%] gap-y-3 md:gap-8"
        action=""
      >
        <Input
          value={longLink}
          onChange={(e) => setLongLink(e.target.value)}
          type="url"
          placeholder="Enter your loooong URL"
          className="text-lg py-4 px-4 flex h-12"
        />
        <Button
          onClick={handleCreateShortLink}
          variant={"default"}
          className="w-full transition-opacity ease-in hover:opacity-[0.8] active:opacity-[0.5] md:w-auto font-semibold text-lg md:text-[0.95rem] md:px-6 md:tracking-wide h-12"
        >
          Shorten!
        </Button>
      </form>
    </div>
  );
};

export default LandingPage;

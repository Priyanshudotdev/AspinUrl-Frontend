import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import SingleLink from "../components/SingleLink";
import Stats from "../components/Stats";
import { useAuth } from "../hooks/useAuth";

const LinkPage = () => {
  const [query] = useSearchParams();
  const urlTitle = query.get("title");
  const { currentUser } = useAuth();

  return (
    <div className="w-full px-[5vw] md:px-[4vw] lg:px-[5vw] py-8 flex flex-col gap-5 lg:flex-row  justify-center pt-12 ">
      <SingleLink urlTitle={urlTitle || null} />
      <Stats />
    </div>
  );
};

export default LinkPage;

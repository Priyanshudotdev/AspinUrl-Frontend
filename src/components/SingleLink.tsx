import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Copy, Download, Trash } from "lucide-react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import SkeletonCard from "./SkeletonCard";

interface LinkData {
  qrCode: string;
  urlTitle: string;
  shortId: string;
  customUrl?: string;
  redirectUrl: string;
  createdAt: string;
}

const SingleLink = ({ urlTitle }: { urlTitle: string | null }) => {
  const { currentUser, loading } = useAuth();
  const [linkData, setLinkData] = useState<LinkData | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>("");

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const handleFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", options);
    setFormattedDate(formattedDate);
  };

  useEffect(() => {
    if (currentUser && !loading) {
      axios
        .post("http://localhost:3000/api/v1/url/link", {
          urlTitle,
          userId: currentUser.uid,
        })
        .then((res) => {
          const response = res.data?.link[0];
          if (response) {
            setLinkData(response);
            handleFormattedDate(response.createdAt);

            console.log(linkData);
          }
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
    }
  }, [currentUser, loading, urlTitle]);

  return (
    <div className="flex flex-col gap-5 w-full lg:w-[50%] p-5 border-[0.1rem] border-[#262626] bg-[#0a0a0a] items-center rounded-lg shadow-lg">
      {linkData ? (
        <>
          <div className="flex flex-col items-center w-full">
            <img
              src={linkData.qrCode}
              className="h-32 lg:h-64 object-contain ring ring-zinc-800 mb-4"
              alt="QR Code"
            />
            <div className="flex flex-col items-center w-full gap-2">
              <span className="text-2xl lg:text-4xl font-bold hover:underline cursor-pointer">
                {linkData.urlTitle}
              </span>
              <span className="text-xl lg:text-2xl text-blue-400 font-bold tracking-wide hover:underline cursor-pointer">
                https://aspinUrl.vercel.app/
                {linkData.customUrl || linkData.shortId}
              </span>
              <span className="text-lg lg:text-xl hover:underline tracking-wide cursor-pointer">
                {linkData.redirectUrl}
              </span>
              <span className="text-sm lg:text-lg text-gray-400 mt-2">
                {formattedDate}
              </span>
            </div>
          </div>

          <div className="flex gap-2 lg:gap-4 mt-4 w-full justify-center">
            <Button variant={"ghost"}>
              <Copy size={"20"} />
            </Button>
            <Button variant={"ghost"}>
              <Download size={"20"} />
            </Button>
            <Button className="hover:text-red-600" variant={"ghost"}>
              <Trash size={"20"} />
            </Button>
          </div>
        </>
      ) : (
        <SkeletonCard />
      )}
    </div>
  );
};

export default SingleLink;

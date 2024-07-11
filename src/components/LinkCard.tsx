import React, { useEffect, useState } from "react";
import { Copy, Download, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import { useToast } from "./ui/use-toast";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { SingleLinkProps } from "../pages/Dashboard";
import { toast as Toast } from "react-toastify";

interface LinkCardProps {
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  qrCode: string;
  linkTitle: string;
  shortUrl?: string;
  customUrl?: string;
  originalUrl: string;
  createdAt: string;
}

const LinkCard = ({
  setError,
  qrCode,
  linkTitle,
  shortUrl,
  customUrl,
  originalUrl,
  createdAt,
}: LinkCardProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const date = new Date(createdAt);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const { currentUser, links, setLinks } = useAuth();
  const navigate = useNavigate();
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const formattedDateTime = date.toLocaleDateString("en-US", options);

  const shortLink = `https://aspinUrl.vercel.app/${customUrl || shortUrl}`;

  const downlodQrCode = async () => {
    setLoading(true);
    try {
      const response = await fetch(qrCode);
      console.log("RESPONSE", response);
      const blob = await response.blob();

      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = linkTitle;
      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
      setLoading(false);

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.log("Error");
      setLoading(false);
    }
  };

  const handleDeleteUrl = async () => {
    setDeleteLoading(true);
    axios
      .delete<any>(`${import.meta.env.VITE_SERVER_DELETE_LINK}`, {
        params: {
          urlTitle: linkTitle,
          userId: currentUser?.uid,
        },
      })
      .then(() => {
        setLinks((prevLinks: SingleLinkProps[]) =>
          prevLinks.filter(
            (link: SingleLinkProps) => link.urlTitle !== linkTitle,
          ),
        );
        Toast(" Link Deleted Successfully");
        setDeleteLoading(false);
      })
      .catch((err) => {
        Toast(" There Is Some Error");
        setError(err);
        setDeleteLoading(false);
      });
  };

  const copyQrCode = async () => {
    try {
      await navigator.clipboard.writeText(shortLink);
      Toast(" Link Copied");
    } catch (error) {
      Toast(" Error copying link");
    }
  };

  return (
    <div className="flex {flex-col md:flex-row} gap-5 border px-4 py-3 bg-[#0a0a0a] items-center rounded-lg shadow-lg">
      <img
        src={qrCode || ""}
        className="h-24 md:h-32 object-contain ring ring-zinc-800"
        alt="QR Code"
      />
      <div className="flex flex-col flex-1 gap-1 min-w-0">
        <span
          onClick={() => {
            navigate(`/link?title=${linkTitle}`);
          }}
          className="text-lg md:text-2xl font-bold hover:underline cursor-pointer break-words truncate"
        >
          {linkTitle || ""}
        </span>
        <a
          href={originalUrl}
          target="_blank"
          className=" text-sm md:text-xl text-blue-400 font-bold tracking-wide hover:underline cursor-pointer break-words truncate"
        >
          {shortLink}
        </a>
        <a
          href={originalUrl}
          target="_blank"
          className="text-sm md:text-base hover:underline tracking-wide cursor-pointer break-words truncate"
        >
          {originalUrl || ""}
        </a>
        <span className="text-xs md:text-sm text-gray-400 mt-1">
          {formattedDateTime || ""}
        </span>
      </div>
      <div className="flex flex-col gap-2 mt-2 md:mt-0">
        <Button onClick={copyQrCode} variant={"ghost"}>
          <Copy size={"20"} />
        </Button>
        <Button onClick={downlodQrCode} variant={"ghost"}>
          {loading ? (
            <BeatLoader size={"3"} color="#a1a1a1" />
          ) : (
            <Download size={"20"} />
          )}
        </Button>
        <Button
          onClick={handleDeleteUrl}
          className="hover:text-red-600"
          variant={"ghost"}
        >
          {deleteLoading ? (
            <BeatLoader size={"3"} color="#a1a1a1" />
          ) : (
            <Trash size={"20"} />
          )}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;

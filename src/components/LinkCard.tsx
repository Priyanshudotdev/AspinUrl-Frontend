import React, { useState } from "react";
import { Copy, Download, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";

interface LinkCardProps {
  qrCode: string;
  linkTitle: string;
  shortUrl?: string;
  customUrl?: string;
  originalUrl: string;
  createdAt: string;
}

const LinkCard = ({
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
    weekday: "long", // "Monday"
    day: "numeric", // "1"
    month: "long", // "January"
    year: "numeric", // "2024"
    hour: "numeric", // "12"
    minute: "numeric", // "00"
    hour12: true, // Use 12-hour format
  };
  const navigate = useNavigate();

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

  const copyQrCode = async () => {
    try {
      await navigator.clipboard.writeText(shortLink);
      toast({
        description: "Short Link Copied",
      });
    } catch (error) {
      toast({
        description: "Error copying link",
      });
    }
  };

  return (
    <div className="flex gap-5 border px-4 py-3 bg-[#0a0a0a] items-center rounded-lg shadow-lg">
      <img
        src={qrCode || ""}
        className="h-24 md:h-32 object-contain ring ring-zinc-800"
        alt="QR Code"
      />
      <div className="flex flex-col flex-1 gap-1 ">
        <span
          onClick={() => {
            navigate(`/link?title=${linkTitle}`);
          }}
          className="text-lg md:text-2xl font-bold hover:underline cursor-pointer"
        >
          {linkTitle || ""}
        </span>
        <span className="text-md md:text-xl text-blue-400 font-bold tracking-wide hover:underline cursor-pointer">
          {shortLink}
        </span>
        <span className="text-sm md:text-base hover:underline tracking-wide cursor-pointer">
          {originalUrl || ""}
        </span>
        <span className="text-xs flex-1 md:text-sm text-gray-400 mt-1">
          {formattedDateTime || ""}
        </span>
      </div>

      <div className="flex flex-col gap-2 md:mt-0">
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
        <Button className="hover:text-red-600" variant={"ghost"}>
          <Trash size={"20"} />
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;

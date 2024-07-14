import React, {
  ButtonHTMLAttributes,
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ClipLoader } from "react-spinners";

const CreateLink = ({
  url,
  onLinkCreated,
}: {
  url: string | null;
  onLinkCreated: () => void;
}) => {
  const [urlTitle, setUrlTitle] = useState<string>("");
  const [longUrl, setLongUrl] = useState<string>(() => {
    if (!url) {
      return "";
    }
    return url;
  });
  const [customUrl, setCustomUrl] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [createdDate, setCreatedDate] = useState<string | null>(null);
  const { currentUser } = useAuth();

  const navigate = useNavigate();
  const clearAll = () => {
    setLongUrl("");
    setCustomUrl("");
    setUrlTitle("");
  };
  const handleDialogClose = (isOpen: boolean) => {
    if (!isOpen) {
      clearAll();
      setLoading(false);

      navigate("/dashboard");
    }
  };

  useEffect(() => {
    if (url) {
      setIsDialogOpen(true);
    }
  }, [url]);

  const handleChange = (
    targetValue: ChangeEvent<HTMLInputElement>,
    setFunction: Function,
  ) => {
    setFunction(targetValue.target.value);
  };

  const handleCreateLink = () => {
    setLoading(true);
    axios
      .post(import.meta.env.VITE_SERVER_CREATE_LINK, {
        url: longUrl,
        userId: currentUser?.uid,
        urlTitle,
        customUrl: customUrl || "",
      })
      .then((res) => {
        setLoading(false);
        setIsDialogOpen(false);
        clearAll();
        if (onLinkCreated) {
          onLinkCreated();
        }
        setCreatedDate(res.data.link);
      })
      .catch((err) => {
        setLoading(false);
        clearAll();
        console.log("ERROR", err);
      });
  };

  return (
    <div>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(isOpen) => {
          setIsDialogOpen(isOpen);
          handleDialogClose(isOpen);
        }}
      >
        <DialogTrigger asChild>
          <span>
            <Button ref={buttonRef}>Create Link</Button>
          </span>
        </DialogTrigger>
        <DialogContent className=" px-6 h-[24rem] ">
          <DialogHeader>
            <DialogTitle>Create Your Short Link</DialogTitle>
            <DialogDescription>Shorten. Share. Simplify.</DialogDescription>
          </DialogHeader>
          <Input
            value={urlTitle}
            onChange={(e) => {
              handleChange(e, setUrlTitle);
            }}
            placeholder="URL Title"
          />
          <Input
            type="url"
            value={longUrl}
            onChange={(e) => {
              handleChange(e, setLongUrl);
            }}
            placeholder="Enter Your Looong URL"
          />
          <span className="flex gap-3 ">
            <Input
              readOnly
              value={"http://apsinurl.vercel.app/"}
              className=" w-[80%]  "
            />
            <Input
              className=""
              value={customUrl}
              onChange={(e) => {
                handleChange(e, setCustomUrl);
              }}
              placeholder="Custom Url (Optional) "
            />
          </span>
          <Button
            type="submit"
            onClick={handleCreateLink}
            variant={"outline"}
            className="  text-lg hover:opacity-[0.9]"
          >
            {loading ? <ClipLoader color="white" size={"20"} /> : "Create"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateLink;

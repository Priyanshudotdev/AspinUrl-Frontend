import { useSearchParams } from "react-router-dom";
import { Filter } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import LinkCard from "../components/LinkCard";
import { Button } from "../components/ui/button";
import CreateLink from "../components/CreateLink";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import Error from "../components/Error";
import SkeletonCard from "../components/SkeletonCard";
import { BarLoader } from "react-spinners";

export interface SingleLinkProps {
  qrCode: string;
  urlTitle: string;
  shortId: string | undefined;
  customUrl: string | undefined;
  redirectUrl: string;
  createdAt: string;
}

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");
  const { currentUser, links, setLinks } = useAuth();

  const [error, setError] = useState<string>();
  const [isSkeletonOpen, setIsSkeletonOpen] = useState<boolean>(false);
  const [barLoader, setBarLoader] = useState<boolean>(false);

  const reFetchLinks = () => {
    if (currentUser?.uid) {
      setIsSkeletonOpen(true);
      setBarLoader(true);
      axios
        .post(`${import.meta.env.VITE_SERVER_LINKS}`, {
          userId: currentUser?.uid,
        })
        .then((res) => {
          setLinks(res.data.links);
          setIsSkeletonOpen(false);
          setBarLoader(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsSkeletonOpen(false);
          setBarLoader(false);
        });
    }
  };

  useEffect(() => {
    if (currentUser?.uid) {
      setIsSkeletonOpen(true);
      setBarLoader(true);
      axios
        .post(`${import.meta.env.VITE_SERVER_LINKS}`, {
          userId: currentUser?.uid,
        })
        .then((res) => {
          console.log(res.data.links);
          setLinks(res.data.links);
          setIsSkeletonOpen(false);
          setBarLoader(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsSkeletonOpen(false);
          setBarLoader(false);
        });
    }
  }, [currentUser?.uid]);

  return (
    <>
      {barLoader && <BarLoader color="#111111" width={"100"} />}
      <div className="flex flex-col px-[3vw] md:px-[4vw] lg:px-[5vw] font-space py-[4vh] gap-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Links Created</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{links.length || 0}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Clicks</CardTitle>
            </CardHeader>
            <CardContent>
              <p>5</p> {/* Display the total clicks */}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between mt-3 px-2">
          <h1 className="text-3xl font-extrabold">My Links</h1>
          <CreateLink onLinkCreated={reFetchLinks} url={url || null} />
        </div>

        <div className="relative">
          <Input type="text" placeholder="Filter Links..." />
          <Filter className="absolute top-2 right-2 p-1" />
          {error && <Error message={error} />}
        </div>

        <div className="grid overflow-hidden gap-4">
          {!isSkeletonOpen
            ? links.map((link: SingleLinkProps, index: number) => (
                <span key={index}>
                  <LinkCard
                    setError={setError}
                    qrCode={link.qrCode}
                    linkTitle={link.urlTitle}
                    shortUrl={link.shortId}
                    customUrl={link.customUrl}
                    originalUrl={link.redirectUrl}
                    createdAt={link.createdAt}
                  />
                </span>
              ))
            : Array.from({ length: 4 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

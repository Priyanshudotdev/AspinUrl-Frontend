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

interface LinkProps {
  createdAt: string;
  createdBy: string;
  qrCode: string;
  redirectUrl: string;
  shortId?: string;
  customUrl?: string;
  urlTitle: string;
  visitHistory: [];
}

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");
  const { currentUser } = useAuth();
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [error, setError] = useState<string>();
  const [isSkeletonOpen, setIsSkeletonOpen] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser?.uid) {
      setIsSkeletonOpen(true);
      axios
        .post(`${import.meta.env.VITE_SERVER_LINKS}`, {
          userId: currentUser?.uid,
        })
        .then((res) => {
          setLinks(res.data.links);
          setIsSkeletonOpen(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsSkeletonOpen(false);
        });
    }
  }, [currentUser?.uid]);

  return (
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
        <CreateLink url={url || null} />
      </div>

      <div className="relative">
        <Input type="text" placeholder="Filter Links..." />
        <Filter className="absolute top-2 right-2 p-1" />
        {error && <Error message={error} />}
      </div>

      <div className="grid overflow-hidden gap-4">
        {!isSkeletonOpen
          ? links.map((link, index: number) => (
              <span key={index}>
                <LinkCard
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
  );
};

export default Dashboard;

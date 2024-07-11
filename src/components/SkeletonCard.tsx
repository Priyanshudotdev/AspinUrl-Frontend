import { Skeleton } from "./ui/skeleton";

const SkeletonCard = () => (
  <div className="flex flex-col space-y-3 w-full h-full px-[5vw] md:px-[4vw] lg:px-[5vw] pt-[15vh] ">
    <Skeleton className="h-32 w-full lg:h-64 rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-full lg:w-1/2" />
      <Skeleton className="h-4 w-full lg:w-1/3" />
    </div>
  </div>
);

export default SkeletonCard;

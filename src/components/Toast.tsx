import React from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export function ToastSimple() {
  const { toast } = useToast();

  return (
    <div className="w-full h-screen text-white ">
      <Button
        variant="outline"
        onClick={() => {
          toast({
            description: "Short Link Copied",
          });
        }}
      >
        Show Toast
      </Button>
    </div>
  );
}

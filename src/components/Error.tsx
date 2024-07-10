import React from "react";

const Error = ({ message }: { message: string }) => {
  return <h1 className="text-red-500 font-normal tracking-wide ">{message}</h1>;
};

export default Error;

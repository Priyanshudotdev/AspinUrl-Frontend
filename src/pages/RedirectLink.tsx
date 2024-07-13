import axios from "axios";
import React, { useEffect } from "react";
import { redirect, useParams } from "react-router-dom";

const RedirectLink = () => {
  const urlId = useParams().id;

  useEffect(() => {
    axios
      .post(`http://localhost:3000/api/v1/url/redirect?link=${urlId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("ERROR");
      });
  }, [urlId]);

  return;
};

export default RedirectLink;

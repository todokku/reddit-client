import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { SubredditContext } from "../../contexts/SubredditContext";
import { FetchGetSubreddit } from "../../util/Fetch";
import { PostsContext } from "../../contexts/PostsContext";
import { SubredditModel, Subreddit } from "../../contexts/Subreddit";
import "./Banner.css";

export const Banner: React.FC = () => {
  const { subreddit, subredditDispatch } = useContext(SubredditContext);
  const { postsDispatch } = useContext(PostsContext);
  const [sub, setSub] = useState<Subreddit>(SubredditModel);
  let { subName } = useParams();

  useEffect(() => {
    setSub(subreddit);
  }, [subreddit]);

  useEffect(() => {
    FetchGetSubreddit(subredditDispatch, postsDispatch, subName);
  }, []);

  return (
    <div className="main-background-banner">
      <div
        style={{
          backgroundImage: "url(" + sub.bannerImgSrc + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "144px",
        }}
      ></div>
      <div className="row-banner">
        <div className="col-banner">
          <img
            src={sub.logoImgSrc}
            className="logo-placeholder-banner"
            alt="ubuntu"
          />
          <div className="mt-x-banner">
            <div className="text-container-banner">
              <h1 className="title-banner">{sub.heading}</h1>
              <h2 className="subreddit-banner">r/{sub.name}</h2>
            </div>
            <div className="btn-container-banner">
              {sub.joined ? (
                <button className="btn-light-banner pointer">JOINED</button>
              ) : (
                <button className="btn-light-banner pointer">JOIN</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { Dots } from "../../svg";
import { stories } from "../../data/home";
import AddFriendSmallCard from "./AddFriendSmallCard";

const PeopleYouMayKnow = () => {
  return (
    <div className="pplumayknow">
      <div className="pplumayknow_header">
        People You may know
        <div className="post_header_right hover1">
          <Dots />
        </div>
      </div>
      <div className="pplumayknow_list">
        {stories.map((story, index) => (
          <AddFriendSmallCard item={story} key={index} />
        ))}
      </div>
    </div>
  );
};

export default PeopleYouMayKnow;

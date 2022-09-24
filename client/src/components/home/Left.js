import { Button, Divider, Grid, Paper } from "@mui/material";
import * as react from "react";
import "./left.css";
import { Category } from "../categories/Category";
import { GroupCard } from "../groups/GroupCard";
import { FriendSuggestion } from "../profile/Friendsuggestion";

export const Left = ({
  user,
  getAllPosts,
  categories,
  getPostsPerCategory,
  groups,
}) => {
  const [showAll, setShowAll] = react.useState(false);
  return (
    <Grid item xs="auto" md={3} className="left">
      <div className="left_home scrollbar">
        <div>
          <FriendSuggestion user={user} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Category
            name="All Categories"
            image="../../categories/all.png"
            handleFetCategories={getAllPosts}
          />
          {!showAll ? (
            <>
              {categories.slice(0, 4).map((category) => (
                <Category
                  key={category.name}
                  name={category.name}
                  image={category.image}
                  handleFetCategories={() => getPostsPerCategory(category.name)}
                />
              ))}
            </>
          ) : (
            <>
              {categories.map((category) => (
                <Category
                  key={category.name}
                  name={category.name}
                  image={category.image}
                  handleFetCategories={() => getPostsPerCategory(category.name)}
                />
              ))}
            </>
          )}
          <Button variant="text" onClick={() => setShowAll((prev) => !prev)}>
            {showAll ? "Show Less" : "Show More"}
          </Button>
        </div>
        <Divider />
        <Paper sx={{ padding: "10px", textAlign: "center" }}>
          <h5>Your groups</h5>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 50%)",
              gap: "10px",
            }}
          >
            {groups.map((group) => (
              <div key={group._id}>
                <GroupCard group={group} />
              </div>
            ))}
          </div>
        </Paper>
      </div>
    </Grid>
  );
};

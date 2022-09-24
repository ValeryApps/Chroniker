import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
// import { Button } from "@mui/material";

export const GroupCard = ({ group }) => {
  return (
    <Card sx={{ maxWidth: "90%", minHeight: "150px" }}>
      <CardMedia
        component="img"
        height="79"
        image="../../images/0x0.jpg"
        alt="green iguana"
      />
      <h6 style={{ overFlow: "hidden" }}>{group?.groupName}</h6>
      {/* <Button size="small" color="primary">
        Follow
      </Button> */}
    </Card>
  );
};

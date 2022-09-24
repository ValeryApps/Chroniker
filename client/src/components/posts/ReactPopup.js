const reactsArray = [
  {
    name: "like",
    image: "../../../reacts/like.gif",
  },
  {
    name: "love",
    image: "../../../reacts/love.gif",
  },
  {
    name: "haha",
    image: "../../../reacts/haha.gif",
  },
  {
    name: "wow",
    image: "../../../reacts/wow.gif",
  },
  {
    name: "sad",
    image: "../../../reacts/sad.gif",
  },
  {
    name: "angry",
    image: "../../../reacts/angry.gif",
  },
];

const ReactPopup = ({ visible, setVisible, handleReactToPost }) => {
  return (
    <>
      {visible && (
        <div
          className="react_popup"
          onMouseOver={() =>
            setTimeout(() => {
              setVisible(true);
            }, 500)
          }
          onMouseLeave={() =>
            setTimeout(() => {
              setVisible(false);
            }, 1500)
          }
        >
          {reactsArray.map((react, index) => (
            <div
              className="react"
              key={index}
              onClick={() => handleReactToPost(react.name)}
            >
              <img src={react.image} alt={react.name} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ReactPopup;

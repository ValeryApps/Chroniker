import { useState, useRef, useEffect } from "react";
import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import DraftEditor from "../../editor/DraftEditor";
import { CategorySelect } from "../../categories/CategorySelect";
import { categories } from "../../../data/categories";

const EmojiPickerBackground = ({
  text,
  setText,
  user,
  setBackground,
  background,
  type2 = false,
  category,
  setCategory,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [showBg, setShowBg] = useState(false);
  // const [cursorPosition, setCursorPosition] = useState(3);
  const bgRef = useRef(null);
  const textRef = useRef(null);
  // useEffect(() => {
  //   textRef.current.selectionEnd = cursorPosition;
  // }, [cursorPosition]);

  // const handleEmoji = (e, { emoji }) => {
  //   const ref = textRef.current;
  //   ref.focus();
  //   const start = text.substring(0, ref.selectionStart);
  //   const end = text.substring(ref.selectionStart);
  //   const newText = start + emoji + end;
  //   setText(newText);
  //   setCursorPosition(start.length + emoji.length);
  // };

  const postBackgrounds = [
    "../../../images/postBackgrounds/1.jpg",
    "../../../images/postBackgrounds/2.jpg",
    "../../../images/postBackgrounds/3.jpg",
    "../../../images/postBackgrounds/4.jpg",
    "../../../images/postBackgrounds/5.jpg",
    "../../../images/postBackgrounds/6.jpg",
    "../../../images/postBackgrounds/7.jpg",
    "../../../images/postBackgrounds/8.jpg",
    "../../../images/postBackgrounds/9.jpg",
  ];
  const handleDisplayBackground = (index) => {
    bgRef.current.style.backgroundImage = `url(${postBackgrounds[index]})`;
    setBackground(postBackgrounds[index]);
    bgRef.current.classList.add("bgHandler");
  };
  const removeBackground = () => {
    bgRef.current.style.backgroundImage = "";
    setBackground("");
    bgRef.current.classList.remove("bgHandler");
  };

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());

    setText(currentContentAsHTML);
  };
  const handlePickCategory = (e) => {
    setCategory(e.target.value);
  };
  console.log(category);
  return (
    <div className={`${type2 ? "images_input" : ""}`}>
      <div className={`${!type2 ? "flex_center" : ""}`} ref={bgRef}>
        {!showBg ? (
          <>
            <div className="category">
              <CategorySelect
                categories={categories}
                handlePickCategory={handlePickCategory}
                category={category}
              />
            </div>
            <DraftEditor
              editorState={editorState}
              handleEditorChange={handleEditorChange}
            />
          </>
        ) : (
          <textarea
            ref={textRef}
            maxLength={250}
            value={text}
            className={`post_input ${type2 && "input2"}`}
            placeholder={`What is on your mind ${user?.first_name}
  `}
            style={{
              paddingTop: `${
                background
                  ? Math.abs(textRef.current?.value.length * 0.1 - 24)
                  : 0
              }%`,
            }}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        )}
      </div>
      <div className={`${!type2 ? "post_emojis_wrap" : ""}`}>
        {showPicker && (
          <div
            className={`comment_emoji_picker ${
              type2 ? "movePicker2" : "remove"
            }`}
          ></div>
        )}
        {!type2 && (
          <>
            {" "}
            <img
              className="colorful"
              src="../../../icons/colorful.png"
              alt=""
              onClick={() => setShowBg((prev) => !prev)}
            />
            {showBg && (
              <div className="post_background">
                <div className="no_bg" onClick={removeBackground}></div>
                {postBackgrounds.map((image, i) => (
                  <img
                    src={image}
                    key={i}
                    alt=""
                    onClick={() => handleDisplayBackground(i)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EmojiPickerBackground;

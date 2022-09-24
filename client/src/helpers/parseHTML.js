import DOMPurify from "dompurify";
export const createMarkup = (post) => {
  return {
    __html: DOMPurify.sanitize(post),
  };
};

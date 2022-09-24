export const FETCH_PHOTOS_START = "FETCH_PHOTOS_START";
export const FETCH_PHOTOS_ERROR = "FETCH_PHOTOS_ERROR";
export const FETCH_PHOTOS_SUCCESS = "FETCH_PHOTOS_SUCCESS";

export const initial_photo_State = {
  photos: [],
  error_photos: "",
  loading_photos: false,
};
export const photoReducer = (
  state = initial_photo_State,
  { type, payload }
) => {
  switch (type) {
    case FETCH_PHOTOS_START:
      return {
        ...state,
        error_photos: "",
        loading_photos: true,
      };

    case FETCH_PHOTOS_SUCCESS:
      return {
        ...state,
        photos: payload,
        error_photos: "",
        loading_photos: false,
      };
    case FETCH_PHOTOS_ERROR:
      return {
        ...state,
        error_photos: payload,
        loading_photos: false,
      };

    default:
      return state;
  }
};

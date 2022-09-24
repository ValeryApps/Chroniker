export const FETCH_PROFILE_START = "FETCH_PROFILE_START";
export const FETCH_PROFILE_ERROR = "FETCH_PROFILE_ERROR";
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";
export const PROFILE_CREATE_POST = "PROFILE_CREATE_POST";

export const initialState = {
  profile: null,
  error: "",
  loading: false,
};
export const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PROFILE_START:
      return {
        ...state,
        error: "",
        loading: true,
      };

    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
        error: "",
        loading: false,
      };
    case PROFILE_CREATE_POST:
      return {
        profile: { ...state, profile: payload },
        error: "",
        loading: false,
      };
    case FETCH_PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
};

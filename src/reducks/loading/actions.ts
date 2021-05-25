export const SHOW_LOADING = "SHOW_LOADING";
export const HIDE_LOADING = "HIDE_LOADING";

export const showLoadingAction = (text = "loading...") => {
  console.log("text", text);
  return {
    type: SHOW_LOADING,
    payload: {
      state: true,
      text: text,
    },
  };
};

export const hideLoadingAction = () => {
  return {
    type: HIDE_LOADING,
    payload: {
      state: false,
      text: "",
    },
  };
};

export type Actions =
  | ReturnType<typeof showLoadingAction>
  | ReturnType<typeof hideLoadingAction>;

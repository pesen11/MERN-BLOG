export const initialState = JSON.parse(localStorage.getItem("authUser")) ? true : false;

export const reducer = (state, action) => {
  if (action.type === "USER") {
    return action.payload;
  }

  return state;
};

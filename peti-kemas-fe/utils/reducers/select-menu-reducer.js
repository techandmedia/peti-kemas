export default function menuReducer(state, action) {
  // console.log(state);
  // console.log(action);
  const { key, results } = action;
  switch (key) {
    case key:
      return {
        ...state,
        key
      };
    default:
      throw new Error();
  }
}

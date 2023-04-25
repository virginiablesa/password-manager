function wrapperAppReducer(state, action) {
  switch (action.type) {
    case "waitingrequest":
      return {
        ...state,
        isLoading: true
      };
    case "setSuccessFeedback":
      return {
        ...state,
        isSuccessProcess: action.value,
        isLoading: false
      };
    default:
      throw new Error();
  }
}

export default wrapperAppReducer;

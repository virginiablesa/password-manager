import wrapperAppReducer from "./wrapperAppReducer";

describe("reducer function", () => {
  it("should handle waitingrequest action", () => {
    const initialState = {
      isSuccessProcess: false,
      isLoading: false
    };
    const action = { type: "waitingrequest" };
    const expectedState = {
      isSuccessProcess: false,
      isLoading: true
    };
    const state = wrapperAppReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle setSuccessFeedback action", () => {
    const initialState = {
      isSuccessProcess: false,
      isLoading: false
    };
    const action = { type: "setSuccessFeedback", value: true };
    const expectedState = {
      isSuccessProcess: true,
      isLoading: false
    };
    const state = wrapperAppReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });
});

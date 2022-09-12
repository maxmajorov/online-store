import { authReducer, loginTC } from "../auth-reducer";

let startState = {
  isLoggedIn: false,
};

beforeEach(() => {
  startState = {
    isLoggedIn: false,
  };
});

test("should be login", () => {
  const endState = authReducer(
    startState,
    loginTC.fulfilled({ isLoggedIn: true }, "requestID", { isLoggedIn: true })
  );

  expect(endState.isLoggedIn).toBe(true);
});

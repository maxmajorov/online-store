import {
  appReducer,
  RequestStatusType,
  setAppErrorAC,
  setAppInitializedAC,
  setAppStatusAC,
} from "../app-reducer";

let startState = {
  status: "idle",
  error: null,
  isInitialized: false,
};

beforeEach(() => {
  startState = {
    status: "idle",
    error: null,
    isInitialized: false,
  };
});

test("app should be initialized", () => {
  const endState = appReducer(
    startState,
    setAppInitializedAC({ isInitialized: true })
  );

  expect(endState.isInitialized).toBe(true);
});

test("error should be add in state", () => {
  const error: string = "Some occured error";

  const endState = appReducer(startState, setAppErrorAC({ error }));

  expect(endState.error).toBeTruthy();
});

test("correct task should update title", () => {
  const status: RequestStatusType = "loading";

  const endState = appReducer(startState, setAppStatusAC({ status }));

  expect(endState.status).toBe("loading");
});

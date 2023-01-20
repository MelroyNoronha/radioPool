jest.mock('redux-persist/lib/createPersistoid', () =>
  jest.fn(() => ({
    update: jest.fn(),
    flush: jest.fn(),
  })),
);

// https://stackoverflow.com/questions/61876682/jest-redux-persist-typeerror-cannot-read-property-catch-of-undefined-at-writ

export default jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});

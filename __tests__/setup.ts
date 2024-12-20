import "@testing-library/jest-dom";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      back: jest.fn(),
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

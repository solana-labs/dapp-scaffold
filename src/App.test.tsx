import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

jest.mock("./components/Identicon", () => {
  return {
    __esModule: true,
    Identicon: () => null,
  };
});

test("renders balances text", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Your balances/i);
  expect(linkElement).toBeInTheDocument();
});

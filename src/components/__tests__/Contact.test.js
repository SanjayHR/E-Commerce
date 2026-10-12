import { render, screen } from "@testing-library/react";
import Contact from "../Contact.js";
import "@testing-library/jest-dom";

test("Should load contact page ", () => {
  render(<Contact />);
  const heading = screen.getByText("This is Contact Us Page");
  expect(heading).toBeInTheDocument();
});

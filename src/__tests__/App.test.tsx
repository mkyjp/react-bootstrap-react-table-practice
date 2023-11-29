// Imports
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

// To Test
import App from "../App";

// Tests
describe("Renders main page correctly", async () => {
  /**
   * Resets all renders after each test
   */
  afterEach(() => {
    cleanup();
  });

  /**
   * Passes - shows description correctly
   */
  it("Should render the page correctly", async () => {
    // Setup
    await render(<App />);
    const description = await screen.queryByText("おにぎり");

    // Post Expectations
    expect(description).toBeInTheDocument();
  });
});

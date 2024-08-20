import { act, render, screen } from "@testing-library/react";
import { Dashboard } from "../Dashboard"; // Update the path as necessary
import { MemoryRouter } from "react-router-dom";

// Mock the external API functions
jest.mock("../../api/inventory");
jest.mock("../../api/warehouse");

describe("Dashboard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mocks to avoid test interference
  });

  test("should display loading state initially", async () => {
    // Use act to wrap state updates
    await act(async () => {
      render(
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      );
    });

    expect(screen.getByText("Loading...")).toBeDefined();

  });
});

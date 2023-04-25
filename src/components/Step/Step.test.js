import { render, act, screen } from "@testing-library/react";
import Step from "./Step";

describe("Step component", () => {
  it("renders without crashing", async () => {
    const title = "testing title";
    render(<Step title={title} />);
    const stepTitle = screen.getByText(title);
    expect(stepTitle).toBeDefined();
  });
});

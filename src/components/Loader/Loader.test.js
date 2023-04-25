import { render, act } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader component", () => {
  it("renders without crashing", async () => {
    await act(async () => {
      const { container } = render(<Loader />);
      expect(container.firstChild).toBeDefined();
    });
  });
});

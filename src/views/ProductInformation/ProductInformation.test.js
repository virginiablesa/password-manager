import { render, act, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useTranslation } from "react-i18next";
import Step1 from "../../views/ProductInformation";

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn()
}));

describe("Step1 component", () => {
  it("renders without crashing", async () => {
    const useTranslationSpy = useTranslation;
    const tSpy = jest.fn(str => str);
    useTranslationSpy.mockReturnValue({
      t: tSpy
    });
    await act(async () => {
      const { container } = render(<Step1 />);
      expect(container.firstChild).toBeDefined();
    });
  });
});

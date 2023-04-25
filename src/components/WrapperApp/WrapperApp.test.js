import { render, act, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WrapperApp from "./WrapperApp";
import { useTranslation } from "react-i18next";
import React from "react";

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn()
}));

jest.mock("i18next", () => ({
  t: key => key
}));

describe("WrapperApp component", () => {
  it("renders without crashing", async () => {
    const useTranslationSpy = useTranslation;
    const tSpy = jest.fn(str => str);
    useTranslationSpy.mockReturnValue({
      t: tSpy
    });
    await act(async () => {
      const { container } = render(<WrapperApp />);
      expect(container.firstChild).toBeDefined();
    });
  });

  it("displays the correct steps", async () => {
    const useTranslationSpy = useTranslation;
    const tSpy = jest.fn(str => str);
    useTranslationSpy.mockReturnValue({
      t: tSpy
    });
    render(<WrapperApp />);
    const step1Title = screen.getByText("stepList.step1");
    expect(step1Title).toBeDefined();
  });

  it("Buttons are renderized", async () => {
    const useTranslationSpy = useTranslation;
    const tSpy = jest.fn(str => str);
    useTranslationSpy.mockReturnValue({
      t: tSpy
    });

    render(<WrapperApp />);
    const button = await screen.queryByTestId("next");
    expect(button).toBeInTheDocument();
  });
});

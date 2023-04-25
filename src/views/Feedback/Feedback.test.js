import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useTranslation } from "react-i18next";
import Feedback from ".";
import StateContext from "../../contexts/StateContext";

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn()
}));

jest.mock("i18next", () => ({
  t: key => key
}));

describe("Feedback component", () => {
  beforeEach(() => {
    const useTranslationSpy = useTranslation;
    const tSpy = jest.fn(str => str);
    useTranslationSpy.mockReturnValue({
      t: tSpy
    });
  });

  it("Is rendered with the correct properties with isSuccessProcess false value", () => {
    const state = {
      isSuccessProcess: false
    };
    render(
      <StateContext.Provider value={state}>
        <Feedback />
      </StateContext.Provider>
    );

    expect(screen.getByText("feedback.error.title")).toBeInTheDocument();
    expect(screen.getByText("feedback.error.description")).toBeInTheDocument();
    expect(screen.queryByTestId("error-icon")).toBeInTheDocument();

    const linkElement = screen.getByRole("button", { name: "feedback.btn2" });
    expect(linkElement).toBeInTheDocument();
  });

  it("Is rendered with the correct properties with isSuccessProcess true value", () => {
    const useTranslationSpy = useTranslation;
    const tSpy = jest.fn(str => str);
    useTranslationSpy.mockReturnValue({
      t: tSpy
    });
    const state = {
      isSuccessProcess: true
    };
    render(
      <StateContext.Provider value={state}>
        <Feedback />
      </StateContext.Provider>
    );

    expect(screen.getByText("feedback.success.title")).toBeInTheDocument();
    expect(screen.getByText("feedback.success.description")).toBeInTheDocument();
    expect(screen.queryByTestId("success-icon")).toBeInTheDocument();

    const linkElement = screen.getByRole("link", { name: "feedback.btn1" });
    expect(linkElement).toBeInTheDocument();
  });
});

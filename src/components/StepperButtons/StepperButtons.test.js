import { render, act, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useTranslation } from "react-i18next";
import StepperButtons from "./Stepperbuttons";

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn()
}));

describe("StepperButtons component", () => {
  beforeEach(() => {
    const useTranslationSpy = useTranslation;
    const tSpy = jest.fn(str => str);
    useTranslationSpy.mockReturnValue({
      t: tSpy
    });
  });
  it("renders without crashing", async () => {
    render(<StepperButtons />);

    const buttonNext = await screen.queryByTestId("next");
    expect(buttonNext).toBeInTheDocument();

    const buttonCancel = await screen.queryByTestId("cancel");
    expect(buttonCancel).toBeInTheDocument();
  });

  it("Display only next button", async () => {
    render(<StepperButtons leftButtonHidden={true} />);

    const buttonNext = await screen.queryByTestId("next");
    expect(buttonNext).toBeInTheDocument();

    const buttonCancel = await screen.queryByTestId("cancel");
    expect(buttonCancel).not.toBeInTheDocument();
  });

  it("Display custom content when areCustomButtons is true", () => {
    const useTranslationSpy = useTranslation;
    const tSpy = jest.fn(str => str);
    useTranslationSpy.mockReturnValue({
      t: tSpy
    });
    const text = "custom content";
    render(
      <StepperButtons areCustomButtons={true}>
        <div>{text}</div>
      </StepperButtons>
    );
    const contentGenerated = screen.getByText(text);
    expect(contentGenerated).toHaveTextContent(text);
  });
});

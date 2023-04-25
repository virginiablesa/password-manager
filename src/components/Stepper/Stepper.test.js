import { render, act, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useTranslation } from "react-i18next";
import Stepper from "./Stepper";
import Step1 from "../../views/ProductInformation";
import Step2 from "../../views/Form";

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn()
}));

describe("Stepper component", () => {
  it("renders without crashing", async () => {
    const useTranslationSpy = useTranslation;
    const tSpy = jest.fn(str => str);
    useTranslationSpy.mockReturnValue({
      t: tSpy
    });
    await act(async () => {
      const { container } = render(
        <Stepper
          isNextButtonEnabled={true}
          list={[
            {
              step: 1,
              title: "stepList.step1",
              component: Step1
            },
            {
              step: 2,
              title: "stepList.step2",
              component: Step2
            }
          ]}
        />
      );
      expect(container.firstChild).toBeDefined();
    });
  });

  it("On on click buttons functions are called correctly", async () => {
    const useTranslationSpy = useTranslation;
    const tSpy = jest.fn(str => str);
    useTranslationSpy.mockReturnValue({
      t: tSpy
    });

    render(
      <Stepper
        isNextButtonEnabled={true}
        list={[
          {
            step: 1,
            title: "stepList.step1",
            component: Step1
          },
          {
            step: 2,
            title: "stepList.step2",
            component: Step2
          }
        ]}
      />
    );

    const checkBox = await screen.getByRole("checkbox");
    expect(checkBox).toBeInTheDocument();

    await userEvent.click(checkBox);
    const buttonNext = await screen.queryByTestId("next");
    expect(buttonNext).toBeInTheDocument();

    await fireEvent.click(buttonNext);
    const step2Title = screen.getByText("stepList.step2");
    expect(step2Title).toBeInTheDocument();

    const buttonCancel = await screen.queryByTestId("cancel");
    expect(buttonCancel).toBeInTheDocument();

    await fireEvent.click(buttonCancel);
    const step1Title = screen.getByText("stepList.step1");
    expect(step1Title).toBeInTheDocument();
  });
});

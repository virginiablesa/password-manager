import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StepperProgressBar from "./StepperProgressBar";

describe("StepperProgressBar component", () => {
  it("renders with active className", async () => {
    render(
      <StepperProgressBar
        activeStep={1}
        list={[
          {
            step: 1,
            title: "stepList.step",
            component: <div></div>
          },
          {
            step: 2,
            title: "stepList.step2",
            component: <div></div>
          }
        ]}
      />
    );

    const listItems = screen.queryAllByRole("listitem");
    expect(listItems[0]).toHaveClass("active");
  });

  it("renders with completed className", async () => {
    render(
      <StepperProgressBar
        activeStep={2}
        list={[
          {
            step: 1,
            title: "stepList.step",
            component: <div></div>
          },
          {
            step: 2,
            title: "stepList.step2",
            component: <div></div>
          }
        ]}
      />
    );

    const listItems = screen.queryAllByRole("listitem");
    expect(listItems[0]).toHaveClass("completed");
    expect(listItems[1]).toHaveClass("active");
    expect(typeof listItems[0].textContent).toBe("string");
  });
});

import { render, screen, act, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useTranslation } from "react-i18next";
import Form from ".";
import userEvent from "@testing-library/user-event";
import DispatchContext from "../../contexts/DispatchContext";
import { submitForm } from "../../services/api";

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn()
}));

jest.mock("i18next", () => ({
  t: key => key
}));

jest.mock("../../services/api", () => ({
  submitForm: jest.fn()
}));

const handleNext = jest.fn();

describe("Form component", () => {
  beforeEach(() => {
    const useTranslationSpy = useTranslation;
    const tSpy = jest.fn(str => str);
    useTranslationSpy.mockReturnValue({
      t: tSpy
    });
  });

  it("renders without crashing", async () => {
    await act(async () => {
      const { container } = render(<Form />);
      expect(container.firstChild).toBeDefined();
    });
  });

  it("Button Next is enabled with all the fields filled", async () => {
    render(<Form />);

    const buttonNext = await screen.queryByTestId("next");
    expect(buttonNext).toBeDisabled();
    const input1 = screen.getByLabelText("form.pass1.label");
    expect(input1).toBeInTheDocument();

    const input2 = screen.getByLabelText("form.pass2.label");
    expect(input2).toBeInTheDocument();

    await userEvent.type(input1, "pass123456");
    await userEvent.type(input2, "pass123456");

    expect(buttonNext).toBeInTheDocument();
    expect(buttonNext).not.toBeDisabled();
  });

  it("An error should be displayed with two different passwords", async () => {
    render(<Form />);

    const input1 = screen.getByLabelText("form.pass1.label");
    expect(input1).toBeInTheDocument();

    const input2 = screen.getByLabelText("form.pass2.label");
    expect(input2).toBeInTheDocument();

    const textarea = screen.getByLabelText("form.hint.label");
    expect(textarea).toBeInTheDocument();

    await userEvent.type(input1, "pass123456");
    await userEvent.type(input2, "pass12345");
    await userEvent.type(textarea, "hint");

    let error = screen.getByText("form.pass.error2");
    expect(error).toBeInTheDocument();
  });

  it("An error should be displayed with two different passwords", async () => {
    render(<Form />);

    const input1 = screen.getByLabelText("form.pass1.label");
    expect(input1).toBeInTheDocument();

    const input2 = screen.getByLabelText("form.pass2.label");
    expect(input2).toBeInTheDocument();

    await userEvent.type(input1, "pass123456");
    await userEvent.type(input2, "pass12345");

    let error = screen.getByText("form.pass.error2");
    expect(error).toBeInTheDocument();
  });

  it("An error should be displayed with two different passwords", async () => {
    render(<Form />);

    const input1 = screen.getByLabelText("form.pass1.label");
    expect(input1).toBeInTheDocument();

    fireEvent.change(input1, { target: { value: "pass123456" } });
    fireEvent.change(input1, { target: { value: "" } });

    const error = screen.getByText("form.pass.error1");
    expect(error).toBeInTheDocument();
  });

  it("handleNextButton method", async () => {
    const dispatch = jest.fn();
    submitForm.mockResolvedValueOnce({ status: 200 });
    render(
      <DispatchContext.Provider value={dispatch}>
        <Form handleNext={handleNext} />
      </DispatchContext.Provider>
    );

    const buttonNext = await screen.queryByTestId("next");
    expect(buttonNext).toBeDisabled();
    const input1 = screen.getByLabelText("form.pass1.label");
    expect(input1).toBeInTheDocument();

    const input2 = screen.getByLabelText("form.pass2.label");
    expect(input2).toBeInTheDocument();

    await userEvent.type(input1, "pass123456");
    await userEvent.type(input2, "pass123456");

    expect(buttonNext).toBeInTheDocument();
    await userEvent.click(buttonNext);

    expect(dispatch).toHaveBeenCalledWith({ type: "waitingrequest" });
    expect(submitForm).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      type: "setSuccessFeedback",
      value: true
    });
    expect(handleNext).toHaveBeenCalled();
  });
});

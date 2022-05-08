import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback ", async () => {
    await expect(
      submitFeedback.excute({
        type: "BUG",
        comment: "example comment",
        screenshot: "data:images/png;base64,asdfasdf",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit a feedback without type", async () => {
    await expect(
      submitFeedback.excute({
        type: "",
        comment: "example comment",
        screenshot: "data:images/png;base64,asdfasdf",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback without comment", async () => {
    await expect(
      submitFeedback.excute({
        type: "BUG",
        comment: "",
        screenshot: "data:images/png;base64,asdfasdf",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback without an invalid screenshot", async () => {
    await expect(
      submitFeedback.excute({
        type: "",
        comment: "example comment",
        screenshot: "test",
      })
    ).rejects.toThrow();
  });
});

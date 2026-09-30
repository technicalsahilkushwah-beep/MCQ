import attemptModel from "../models/attemptModel.js";
import paperModel from "../Models/paperModel.js";

export const startAttempt = async (req, res) => {
  try {
    const { paperId } = req.body;

    const userId = req.user.userId;

    const paper = await paperModel.findById(paperId);

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found",
      });
    }

    const attempt = await attemptModel.create({
      user: userId,
      paper: paperId,
    });

    res.status(201).json({
      success: true,
      message: "Exam started successfully",
      attemptId: attempt._id,
      paperId: paper._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const saveAnswer = async (req, res) => {
  try {
    const { attemptId } = req.params;
    const { questionId, selectedAnswer } = req.body;

    const attempt = await attemptModel.findById(attemptId);

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Attempt not found",
      });
    }

    if (attempt.status === "submitted") {
      return res.status(400).json({
        success: false,
        message: "Exam already submitted",
      });
    }

    const paper = await paperModel.findById(attempt.paper);

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found",
      });
    }

    const question = paper.questions.id(questionId);

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question does not belong to this paper",
      });
    }

    const existingAnswer = attempt.answers.find(
      (answer) => answer.questionId.toString() === questionId,
    );

    if (existingAnswer) {
      existingAnswer.selectedAnswer = selectedAnswer;
    } else {
      attempt.answers.push({
        questionId,
        selectedAnswer,
      });
    }

    await attempt.save();

    res.status(200).json({
      success: true,
      message: "Answer saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const submitAttempt = async (req, res) => {
  try {
    const { attemptId } = req.params;

    const attempt = await attemptModel.findById(attemptId);

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Attempt not found",
      });
    }

    if (attempt.status === "submitted") {
      return res.status(400).json({
        success: false,
        message: "Exam already submitted",
      });
    }

    const paper = await paperModel.findById(attempt.paper);

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found",
      });
    }

    let correct = 0;
    let wrong = 0;
    let unattempted = 0;

    paper.questions.forEach((question) => {
      const studentAnswer = attempt.answers.find(
        (answer) => answer.questionId.toString() === question._id.toString(),
      );

      if (!studentAnswer || !studentAnswer.selectedAnswer) {
        unattempted++;
      } else if (studentAnswer.selectedAnswer === question.correctAnswer) {
        correct++;
      } else {
        wrong++;
      }
    });

    const totalQuestions = paper.questions.length;

    const score = correct;

    const percentage =
      totalQuestions > 0 ? (correct / totalQuestions) * 100 : 0;

    attempt.status = "submitted";
    attempt.submittedAt = new Date();

    await attempt.save();

    res.status(200).json({
      success: true,
      message: "Exam submitted successfully",

      result: {
        totalQuestions,
        correct,
        wrong,
        unattempted,
        score,
        percentage: Number(percentage.toFixed(2)),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

import paperModel from "../Models/paperModel.js";

export const createPaper = async (req, res) => {
  try {
    const { title, duration, questions } = req.body;

    const paper = await paperModel.create({
      title,
      duration,
      questions,
    });

    res.status(201).json({
      success: true,
      message: "Paper created successfully",
      paper,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllPapers = async (req, res) => {
  try {
    const papers = await paperModel.find();

    res.status(200).json({
      success: true,
      message: "All papers fetched successfully",
      papers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSinglePaper = async (req, res) => {
  try {
    const { id } = req.params;

    const paper = await paperModel.findById(id);

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Paper fetched successfully",
      paper,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

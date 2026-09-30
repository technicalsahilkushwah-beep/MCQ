import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },

  options: {
    type: [String],
    required: true,
    validate: {
      validator: function (value) {
        return value.length === 4;
      },
      message: "A question must have exactly 4 options",
    },
  },

  correctAnswer: {
    type: String,
    required: true,
  },
});

const paperSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    questions: {
      type: [questionSchema],
      required: true,
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: "Paper must contain at least one question",
      },
    },
  },
  {
    timestamps: true,
  },
);

const paperModel = mongoose.model("Paper", paperSchema);

export default paperModel;

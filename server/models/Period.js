import mongoose from "mongoose";

const periodSchema = new mongoose.Schema(

  {

    userId: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true

    },

    startDate: {

      type: Date,

      required: true

    },

    endDate: {

      type: Date,

      required: true

    },

    flow: {

      type: String,

      enum: [
        "light",
        "medium",
        "heavy"
      ],

      default: "medium"

    },

    symptoms: {

      type: [String],

      default: []

    },

    notes: {

      type: String,

      default: ""

    },

    duration: {

      type: Number

    }

  },

  {

    timestamps: true

  }

);

export default mongoose.model(
  "Period",
  periodSchema
);
import { model, models, Schema, Types } from "mongoose";

export interface ITagQuestion {
  name: Types.ObjectId;
  questions: Types.ObjectId;
}

const TagQuestionSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    tag: { type: Schema.Types.ObjectId, ref: "Tag", required: true },
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  },
  { timestamps: true }
);

const TagQuestion =
  models?.TagQuestion || model<ITagQuestion>("TagQuestion", TagQuestionSchema);

export default TagQuestion;

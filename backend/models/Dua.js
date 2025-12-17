import mongoose from 'mongoose';

const duaSchema = new mongoose.Schema(
  {
    nameId: {
      type: Number,
      required: true,
      index: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true,
    },
    source: {
      type: String,
      enum: ['seed', 'user'],
      default: 'user',
    },
  },
  { timestamps: true }
);

const Dua = mongoose.model('Dua', duaSchema);

export default Dua;


import { Schema, model } from 'mongoose';
import { CarModel, ICar } from './car.interface';

// car schema
const carSchema = new Schema<ICar, CarModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    isElectric: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      enum: ['available', 'unavailable'],
      default: 'available',
    },
    features: [
      {
        type: String,
        required: true,
      },
    ],
    pricePerHour: {
      type: Number,
      required: true,
    },
    carType: {
      type: String || null,
      default: null,
    },
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/dk4zufod5/image/upload/v1724772905/kd9sy8amvzaky9popnfs.jpg',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// removing the car or cars that are deleted
carSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

carSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// checking if the car is exists
carSchema.statics.isCarExists = async function (id: string) {
  return await Car.findById(id);
};

export const Car = model<ICar, CarModel>('Car', carSchema);

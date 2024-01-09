import { mongooseErrorValidator } from '@/lib/mongooseErrorValidator'
import { IClass } from '@/types/IClass'
import { CollectionsEnum } from '@/types/TableEnum'
import { Schema, model, models } from 'mongoose'

const ClassSchema = new Schema({
  title: {
    type: String,
    required: [true, 'title']
  },
  description: {
    type: String
  },
  coverUrl: {
    type: String
  },
  classUrl: {
    type: String
  },
  complementaryUrl: {
    type: String
  }
}, {
  timestamps: true
})

mongooseErrorValidator(ClassSchema)

const Class = models.class || model<IClass>(
  CollectionsEnum.Classes,
  ClassSchema,
  CollectionsEnum.Classes
)

export {
  Class
}

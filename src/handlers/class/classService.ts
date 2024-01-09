import { Class } from '@/models/classModel'
import { IClass } from '@/types/IClass'
import { IUser } from '@/types/IUser'
import { logService } from '../log/logService'
import { error } from '@/lib/error'
import { classErrors } from './classErrors'

const create = async (data: IClass, user: IUser) => {
  const classe = await Class.create(data)

  await logService.create({
    user: user._id,
    event: 'Criar aula',
    detail: `Aula com id ${classe._id} criada com sucesso!`
  })

  return classe
}

const remove = async (classId: string, user: IUser) => {
  const classe = await Class.findById(classId)

  if (!classe) {
    throw classErrors.buildClassNotFoundError()
  }

  const removedClass = await Class.findByIdAndRemove(classId)

  await logService.create({
    user: user._id,
    event: 'Remover aula',
    detail: `Aula com id ${classId} removida com sucesso!`
  })

  return removedClass
}

const update = async ({ _id, ...body }, user: IUser) => {
  if (!_id) {
    throw error.buildSchemaValidationError({
      message: 'ID da aula não foi informado!'
    })
  }

  const updatedClass = await Class.findByIdAndUpdate(_id, body, { new: true })

  if (!updatedClass) {
    throw classErrors.buildClassNotFoundError()
  }

  await logService.create({
    user: user._id,
    event: 'Alterar aula',
    detail: `Aula com id ${_id} alterada com sucesso!`
  })

  return updatedClass
}

const list = async ({ titleSearch, descriptionSearch, hasVideo, page = 1, perPage = 50 }, user) => {
  const maxPages = Math.min(+perPage, 50)
  const skip = (+page - 1) * +perPage
  const titleFilter = {
    title: new RegExp(titleSearch, 'i')
  }
  const descriptionFilter = {
    description: new RegExp(descriptionSearch, 'i')
  }

  const hasVideoFilter = {
    classUrl: { $exists: true }
  }

  const filters = [titleFilter, descriptionFilter, hasVideoFilter]

  if (!hasVideo) {
    filters.pop()
  }
  const query = { $and: filters }
  const classes = await Class.find(query)
    .skip(skip)
    .limit(maxPages)

  const totalSize = await Class.countDocuments(query)

  await logService.create({
    user: user._id,
    event: 'Listar aulas',
    detail: 'Foram listadas as aulas!'
  })

  return { classes, totalSize }
}

const findById = async (classId: string, user: IUser) => {
  const classe = await Class.findById(classId)

  if (!classe) {
    throw classErrors.buildClassNotFoundError()
  }

  await logService.create({
    user: user._id,
    event: 'Obter aula',
    detail: `Aula obtida com o id ${classId}`
  })

  return classe
}

const classService = {
  create,
  remove,
  update,
  list,
  findById
}

export {
  classService
}

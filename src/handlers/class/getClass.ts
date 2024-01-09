import { classService } from './classService'

const getClass = async ({ params, user }) => {
  const { classId } = params

  const classe = await classService.findById(classId, user)

  return { classe }
}

export {
  getClass
}

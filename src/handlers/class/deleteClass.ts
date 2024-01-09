import { classService } from './classService'

const removeClass = async ({ params, user }) => {
  const { classId } = params

  const classe = await classService.remove(classId, user)

  return { classe }
}

export {
  removeClass
}

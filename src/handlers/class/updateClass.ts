import { classService } from './classService'

const updateClass = async ({ body, user }) => {
  const classe = await classService.update(body, user)

  return { classe }
}

export {
  updateClass
}

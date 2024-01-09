import { classService } from './classService'

const createClass = async ({ body, user }) => {
  const classe = await classService.create(body, user)

  return { classe }
}

export {
  createClass
}

import { classService } from './classService'

const listClasses = async ({ user, query }) => {
  const { titleSearch, descriptionSearch, hasVideo, page, perPage } = query

  const classes = await classService.list({ titleSearch, descriptionSearch, hasVideo, page, perPage }, user)

  return classes
}

export {
  listClasses
}

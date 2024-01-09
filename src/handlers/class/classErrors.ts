import { error } from '@/lib/error'
import { ErrorTypesEnum } from '@/types/ErrorTypesEnum'

const buildClassNotFoundError = () => error.build({
  message: 'Aula não encontrada!',
  statusCode: 412,
  type: ErrorTypesEnum.CLASS_NOT_FOUND
})

const classErrors = {
  buildClassNotFoundError
}

export {
  classErrors
}

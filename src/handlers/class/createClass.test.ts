import { buildMasterUser, request, connect, disconnect } from '@/lib/test'
import { ErrorTypesEnum } from '@/types/ErrorTypesEnum'
import { main } from './handler'
import { IClass } from '@/types/IClass'

const PATH = '/classes'

describe('integration: Create Class', () => {
  beforeAll(async () => {
    await connect(__filename)
    await buildMasterUser()
  })

  afterAll(async () => {
    await disconnect(__filename)
  })

  it('should return 422 and INVALID_SCHEMA error when title is not informed', async () => {
    // arrange
    const classe = {
      description: 'Descrição da aula'
    }

    // act
    const response = await request({
      method: 'POST',
      path: PATH,
      body: classe,
      handler: main
    })

    // assert
    const error = response.body

    expect(response.statusCode).toBe(422)
    expect(error.type).toBe(ErrorTypesEnum.INVALID_SCHEMA)
  })

  it('should return 200 on create class', async () => {
    // arrange
    const newClass: IClass = {
      title: 'title test',
      description: 'description test',
      coverUrl: 'url://cover.com/'
    }
    // act
    const response = await request({
      method: 'POST',
      path: PATH,
      body: newClass,
      handler: main
    })

    // assert
    expect(response.statusCode).toBe(200)
    const classe = response.body.classe

    expect(classe._id).toBeDefined()
    expect(classe.title).toBe('title test')
  })
})

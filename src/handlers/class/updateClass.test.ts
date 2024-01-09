import { request, disconnect, connect, buildMasterUser } from '@/lib/test'
import { main } from './handler'
import { ErrorTypesEnum } from '@/types/ErrorTypesEnum'
import { Class } from '@/models/classModel'

const PATH = '/classes'

const createArrange = async () => {
  await Class.create({
    title: 'Historia 1',
    description: 'Aula de Historia 1'
  })
}

describe('integration: Update Class', () => {
  beforeAll(async () => {
    await connect(__filename)
    await buildMasterUser()
    await createArrange()
  })

  afterAll(async () => {
    await disconnect(__filename)
  })

  it('should return 412 and CLASS_NOT_FOUND error when class is not found', async () => {
    // arrange
    const randomId = '6228db4cfb2a1ab7debe4afa'
    // act
    const response = await request({
      method: 'PUT',
      path: PATH,
      body: {
        _id: randomId,
        title: 'Historia 1 parte 2',
        description: 'Parte 2 da historia'
      },
      handler: main
    })

    // assert
    const error = response.body

    expect(response.statusCode).toBe(412)
    expect(error.type).toBe(ErrorTypesEnum.CLASS_NOT_FOUND)
  })

  it('should return 422 and INVALID_SCHEMA error when _id is not informed', async () => {
    // arrange

    // act
    const response = await request({
      method: 'PUT',
      path: PATH,
      body: {
        title: 'asdasdas',
        description: 'asdasdas'
      },
      handler: main
    })

    // assert
    const error = response.body

    expect(response.statusCode).toBe(422)
    expect(error.type).toBe(ErrorTypesEnum.INVALID_SCHEMA)
  })

  it('should return 200 and update Class', async () => {
    // arrange
    const classFound = await Class.findOne({ title: 'Historia 1' })
    // act
    const response = await request({
      method: 'PUT',
      path: PATH,
      body: {
        _id: classFound._id,
        title: 'Historia 2',
        description: 'Aula de Historia 2'
      },
      handler: main
    })

    // assert

    expect(response.statusCode).toBe(200)
    const classe = response.body.classe
    expect(classe._id).toBeDefined()
    expect(classe.title).toBe('Historia 2')
    expect(classe.description).toBe('Aula de Historia 2')
  })
})

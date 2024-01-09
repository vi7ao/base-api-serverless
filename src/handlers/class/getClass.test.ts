import { request, disconnect, connect, buildMasterUser } from '@/lib/test'
import { main } from './handler'
import { ErrorTypesEnum } from '@/types/ErrorTypesEnum'
import { Class } from '@/models/classModel'

const PATH = '/classes'

const createArrange = async () => {
  await Class.create({
    title: 'Aula Matematica',
    description: 'Aula de Matematica'
  })

  await Class.create({
    title: 'Aula Historia',
    description: 'Aula de Historia'
  })
}

describe('integration: Get Class', () => {
  beforeAll(async () => {
    await connect(__filename)
    await buildMasterUser()
    await createArrange()
  })

  afterAll(async () => {
    await disconnect(__filename)
  })

  it('should return 422 and CLASS_NOT_FOUND error when class is not found', async () => {
    // arrange
    const randomId = '6228db4cfb2a1ab7debe4afa'
    // act
    const response = await request({
      method: 'GET',
      path: `${PATH}/${randomId}`,
      handler: main
    })

    // assert
    const error = response.body

    expect(response.statusCode).toBe(412)
    expect(error.type).toBe(ErrorTypesEnum.CLASS_NOT_FOUND)
  })

  it('should return 200 and get Class', async () => {
    // arrange
    const classFound = await Class.findOne({ title: 'Aula Matematica' })
    // act
    const response = await request({
      method: 'GET',
      path: `${PATH}/${classFound._id}`,
      handler: main
    })

    // assert
    expect(response.statusCode).toBe(200)

    const classe = response.body.classe
    expect(classe._id).toBeDefined()
    expect(classe.title).toBe('Aula Matematica')
  })
})

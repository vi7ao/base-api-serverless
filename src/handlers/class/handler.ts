import { auth } from '@/lib/auth'
import { buildHandler, buildRouter } from '@/lib/router'
import { createClass } from './createClass'
import { listClasses } from './listClasses'
import { getClass } from './getClass'
import { updateClass } from './updateClass'
import { removeClass } from './deleteClass'

const router = buildRouter()

router.post('/classes', auth.verifyLogged(createClass))
router.get('/classes', auth.verifyLogged(listClasses))
router.get('/classes/{classId}', auth.verifyLogged(getClass))
router.put('/classes', auth.verifyLogged(updateClass))
router.delete('/classes/{classId}', auth.verifyLogged(removeClass))

const main = buildHandler(router)

export {
  main
}

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/sessions', 'SessionController.store')

Route.post('/users', 'UserController.store')
Route.put('/users/:id', 'UserController.update')

Route.resource('/posts', 'PostController')
  .apiOnly()
  .except(['index', 'show'])
  .middleware(['auth', 'is:(administrator || moderator)'])

Route.get('/posts', 'PostController.index').middleware([
  'auth',
  'can:read-posts'
])

Route.get('/posts/:id', 'PostController.show').middleware([
  'auth',
  'can:read-posts'
])

Route.resource('/permissions', 'PermissionController')
  .apiOnly()
  .middleware('auth')

Route.resource('/roles', 'RoleController')
  .apiOnly()
  .middleware('auth')

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/sessions', 'SessionController.store')

Route.post('/users', 'UserController.store')
Route.put('/users/:id', 'UserController.update')

Route.resource('/posts', 'PostController')
  .apiOnly()
  .middleware('auth')

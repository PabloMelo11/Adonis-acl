const Post = use('App/Models/Post')

class PostController {
  async index ({ request, auth }) {
    const user = await auth.getUser()

    if (await user.can('read-private-posts')) {
      const posts = await Post.all()

      return posts
    }

    const posts = await Post.query()
      .where({ type: 'public' })
      .fetch()

    return posts
  }

  async store ({ request, auth }) {
    const data = request.only(['title', 'content', 'type'])

    const post = await Post.create({ ...data, user_id: auth.user.id })

    return post
  }

  async show ({ params, auth, response }) {
    const post = await Post.findOrFail(params.id)

    if (post.type === 'public') {
      return post
    }

    const user = await auth.getUser()

    if (await user.can('read-private-posts')) {
      return post
    }

    return response.status(400).send({
      error: {
        message: 'Voce nao tem permissao de leitura para esse post'
      }
    })
  }

  async update ({ params, request, response }) {
    const data = request.only(['title', 'content', 'type'])

    const post = await Post.findOrFail(params.id)

    post.merge(data)

    await post.save()

    return post
  }

  async destroy ({ params }) {
    const post = await Post.findOrFail(params.id)

    await post.delete()
  }
}

module.exports = PostController

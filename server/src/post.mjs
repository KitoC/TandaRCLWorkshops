import k from 'koa-route';
import db from './database';

async function get(ctx) {
  const { page = 1 } = ctx.request.query;
  const offset = (page - 1) * 25;
  const limit = page * 25;
  const { count, rows } = await db.models.post.findAndCount({ offset, limit });
  ctx.body = {
    items: rows,
    page,
    count,
    next: count > limit,
  }
  console.log(count, rows);
}

async function find(ctx, id) {
  const post = await db.models.post.findById(id);
  if (!post) {
    return ctx.throw(404);
  }

  ctx.body = post.toJSON();
}

async function update(ctx, id) {
  const post = await db.models.post.findById(id);
  if (!post) {
    return ctx.throw(404);
  }

  const { body } = ctx.request;
  const update = {};
  if ('message' in body) {
    update.message = body.message;
  }
  if ('title' in body) {
    update.message = body.message;
  }

  const updated = await post.update(update);
  ctx.body = updated.toJSON();
}

async function create(ctx) {
  try {
    const post = await db.models.post.create(ctx.request.body);
    await post.setUser(ctx.user);
    ctx.body = post.toJSON();
  } catch (e) {
    if (Array.isArray(e.errors)) {
      const errors = e.errors.map(error => error.message);
      return ctx.throw(400, errors.join(', '));
    }

    throw e;
  }
}

async function del(ctx, id) {
  const post = await db.models.post.findById(id);
  if (!post) {
    return ctx.throw(404, "That post doesn't exist");
  }
  if (post.userId !== ctx.user.id) {
    return ctx.throw(401, 'You can only delete your own posts');
  }

  post.delete();
}

export default function post(app) {
  app.use(k.get('/posts', get));
  app.use(k.get('/posts/:id', find));
  app.use(k.put('/posts/:id', update));
  app.use(k.post('/posts', create));
  app.use(k.delete('/posts/:id', del));
}
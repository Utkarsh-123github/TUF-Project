import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { cardRouter } from './routes/card';

const app = new Hono<{
  Bindings : {
    DATABASE_URL : string;
    JWT_SECRET : string;
  }
}>()

app.route('/api/v1/user',userRouter)
app.route('/api/v1/card',cardRouter)



export default app

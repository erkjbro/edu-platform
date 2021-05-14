import mongoose from 'mongoose';

import app from './app.js';
import HttpError from './models/http-error.js';

if (!process.env.JWT_KEY) {
  throw new Error('JWT_KEY must be defined');
}

if (!process.env.MONGODB_URI) {
  throw new Error('MONGO_URI must be defined');
}

try {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log('\n  Connected to MongoDB...');
} catch (err) {
  throw new HttpError(err, 503);
}

app.listen(app.get('port'), () => {
  console.log(
    '  Listening on port %d in %s mode!',
    app.get('port'),
    app.get('env')
  );
  console.log('  Press CTRL-C to stop\n');
});

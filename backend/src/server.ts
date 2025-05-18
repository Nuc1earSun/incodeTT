import app from './app.ts';
import config from './config/config';

app.listen(config.port, () => {
  console.log('Lets goooo!');
});

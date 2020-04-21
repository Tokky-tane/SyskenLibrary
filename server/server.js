const port = 3001;
require('dotenv').config();
const setupDatabase = require('./setupDatabase');

setupDatabase().then(() => {
  const app = require('./app');

  app.listen(port,
      () => console.log(`Sysken Library App listening on port ${port}!`));
});

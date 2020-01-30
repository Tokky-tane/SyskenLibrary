const port = 3001;
const app = require('./app');

app.listen(port,
    () => console.log(`Sysken Library App listening on port ${port}!`));

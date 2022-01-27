const numbers = require('./api/controllers/getNumbers');

async function start() {
    await numbers();
    const app = require('./config/express')();
    const port = app.get('port');
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`)
    });
}

start()



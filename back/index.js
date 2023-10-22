const app = require('./app')
const port = 5000;

app.get('/', (req, res) => {
    res.send('Prueba técnica Venti Pay')
})

app.listen(port, () => {
    console.log(`http://localhost:${port}/api/v1/`);
})
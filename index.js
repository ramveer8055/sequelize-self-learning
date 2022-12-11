const express = require('express')
const app = express()

const PORT = 4242

const userCtrl = require('./controllers/userController')
const postCtrl = require('./controllers/postController')

app.get('/', (req, res) => {
    res.status(200).json({
        message: "success"
    })
})

app.get('/add', userCtrl.addUser)
app.get('/crud', userCtrl.crudOperation)
app.get('/query', userCtrl.queryData)
app.get('/finder', userCtrl.finderData)
app.get('/setter-getter', userCtrl.setterGetter)
app.get('/validation', userCtrl.validatConst)
app.get('/raw-query', userCtrl.rawQuery)


app.get('/oneToOne', userCtrl.oneToOne)

app.get('/one-to-one', postCtrl.oneToOne)
app.get('/belongs-to', postCtrl.belongsTo)

app.listen(PORT, () => {
    console.log(`port is listening on http://localhost:${PORT}`)
})
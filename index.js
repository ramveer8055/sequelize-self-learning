const express = require('express')
const app = express()

const PORT = 4242

const userCtrl = require('./controllers/userController')
const postCtrl = require('./controllers/postController')
const polymorphicCtrl = require('./controllers/polymorphicController')

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


app.get('/scope', userCtrl.scope)

app.get('/one-to-one', postCtrl.oneToOne)
app.get('/belongs-to', postCtrl.belongsTo)



app.get('/one-to-many', postCtrl.oneToMany)
app.get('/many-to-many', postCtrl.manyToMany)



app.get('/polymorphic', polymorphicCtrl.polymorphic)
app.get('/polymorphic-many', polymorphicCtrl.polymorphicMany)

app.listen(PORT, () => {
    console.log(`port is listening on http://localhost:${PORT}`)
})
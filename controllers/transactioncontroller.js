const { DataTypes } = require('sequelize')
const { sequelize } = require('../models')
const db = require('../models')
const User = db.users

const transaction = async (req, res) => {
    const t = await sequelize.transaction()
    // try {
    //     const user = await User.create({name: 'Veer', email:"veer@mail", gender: 'M'},{
    //         transaction: t
    //     })
    //     t.commit()
    // } catch (error) {
    //     t.rollback()
    // }

    const data = await User.findAll({
        transaction: t,
        lock: true
    })

    res.status(200).json({
        status: true,
        data: data
    })
}


const hooks = async (req, res) => {
    const data = await User.create({ name: 'Veer', email: "foll34w@mail", gender: 'M' })
    res.status(200).json({
        status: true,
        data: data
    })
}


const queryInterFace = sequelize.getQueryInterface()

const queryInterFaceData = async (req, res) => {
    //----------Create trable--------------
    // queryInterFace.createTable('avon',{
    //     name: DataTypes.STRING
    // })

    //----------Column Add-----------------
    // queryInterFace.addColumn('avon', 'email',{
    //     type: DataTypes.STRING
    // })


    //----------Alter-----------------
    // queryInterFace.changeColumn('avon', 'email',{
    //     type: DataTypes.STRING,
    //     defaultValue: 'test@gmail.com'
    // })

    //---------Column Remove----------
    // queryInterFace.removeColumn('avon', 'name')


    //---------Drop table-------------
    queryInterFace.dropTable('avon')

    let data = "hell"
    res.status(200).json({
        status: true,
        data: data
    })
}

module.exports = {
    transaction,
    hooks,
    queryInterFaceData
}
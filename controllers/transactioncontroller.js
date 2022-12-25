const { sequelize } = require('../models')
const db = require('../models')
const User = db.users

const transaction = async(req, res)=>{
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
        transaction:t,
        lock:true
    })

    res.status(200).json({
        status: true,
        data: data
    })
}

module.exports = {
    transaction
}
const db = require('../models')
const { Sequelize, Op, QueryTypes } = require('sequelize')

const User = db.users
const Post = db.posts
const addUser = async (req, res) => {

    // let data =await User.build({name:"King"})
    // data.save()

    //update
    // data.name = "Pummy"
    // data.save()
    // console.log(data.dataValues)
    const data = await User.create({ name: "Jane" });

    data.name = "King"
    data.reload()
    data.save()

    //delete
    // data.destroy()

    let response = {
        data: 'success'
    }
    res.status(200).json(response)
}

const crudOperation = async (req, res) => {

    //------------ Insert
    // const data = await User.create({ name: "Jane" });

    //------------- update
    // const data = await User.update({ name: "King" },{
    //     where:{
    //         id:16
    //     }
    // });

    //-----------Delete
    // const data = await User.destroy({
    //     where:{
    //         id:16
    //     }
    // })


    //-----------Truncate
    // const data = await User.destroy({
    //     truncate: true
    // })


    //-----------Blul Create
    // const data = await User.bulkCreate([
    //     { name: "Hello" },
    //     { name: "Hello" },
    //     { name: "Hello" },
    //     { name: "Hello" }
    // ])


    //-----------Find All
    // const data = await User.findAll()


    //-----------Find One
    const data = await User.findOne()



    let response = {
        status: 'true',
        data: data
    }
    res.status(200).json(response)
}

const queryData = async (req, res) => {

    // const data = await User.create({ name: "Jane", last_name: "chauhan" },{
    //     fields: ['last_name']
    // });

    //-----------Select
    // const data = await User.findAll({
    //     attributes: [
    //         'name',
    //         ['created_at','Date'],
    //         'updated_at',
    //         [Sequelize.fn('CONCAT', Sequelize.col('email'),'ID'), 'email_count'],
    //     ]
    // });

    //------------Include Exclude
    // const data = await User.findAll({
    //     attributes:{
    //         exclude:['created_at', 'updated_at'],
    //         include: [
    //             [Sequelize.fn('CONCAT', Sequelize.col('name'),' ', Sequelize.col('last_name')), 'full_name']
    //         ]
    //     }
    // });

    //------------Condition
    // const data = await User.findAll({
    //     where: {
    //         // id:9
    //         id: {
    //             [Op.gt]: 2
    //         },
    //         // email:{
    //         //     [Op.eq]:'Lewis_Jaskolski@yahoo.com'
    //         // },
    //         email: {
    //             [Op.like]: '%@yahoo.com'
    //         }
    //     },
    //     order: [
    //         ['name', 'DESC'],
    //         // ['email','ASC']
    //     ],
    //     limit:2,
    //     offset:1
    // });


    //------------Count
    const data = await User.count();





    let response = {
        status: true,
        data: data
    }
    res.status(200).json(response)
}

const finderData = async (req, res) => {
    // let data = await User.findAll();
    // let data = await User.findOne();
    // let data = await User.findByPk(5);
    // let data = await User.findAndCountAll({
    //     where:{
    //         name: 'Hello'
    //     }
    // });
    let [data, created] = await User.findOrCreate({
        where: {
            name: 'Sfrok'
        },
        defaults: {
            email: 'hello@gmail.com',
            last_name: "Singh"
        }
    })
    let response = {
        status: true,
        data: data,
        add: created
    }
    res.status(200).json(response)
}

const setterGetter = async (req, res) => {
    const data = await User.create({ name: "Jane", email: "test2@mail.com" });
    // let data = await User.findAll();
    let response = {
        status: true,
        data: data,
    }
    res.status(200).json(response)
}


const validatConst = async (req, res) => {
    try {
        const data = await User.create({ name: "Jane", email: "test4@mail.com", gender: "M" });
        res.status(200).json({
            status: true,
            message: "success",
            data: data
        })
    } catch (e) {

        e.errors.forEach((error) => {
            let message
            switch (error.validatorKey) {
                case 'not_unique':
                    message = 'Email id must be unique'
                    break;
                case 'isIn':
                    console.log(error.message)
                    message = error.message
                    break;
                case 'equals':

                    message = 'Gender not M'
                    break;

            }
            res.status(500).json({
                errors: [{
                    key: message || "Some error accurred while inserted Query.",
                    message: "Some error accurred while inserted Query."
                }]
            })
        });
    }
}

const rawQuery = async(req,res)=>{

    const users = await db.sequelize.query("SELECT * FROM users where gender=$gender",{
        type: QueryTypes.SELECT,
        // replacements:{ gender:'M'}, //gender =:gender
        // replacements:['M'], //gender = ? 
        // replacements: {gender:['M','F']}
        // replacements: { searchEmail:'%@gmail.com'}
        bind:{gender: 'M'}
    })

    let response = {
        status: true,
        data: users,
    }
    res.status(200).json(response)
}

const scope  = async(req, res)=>{
    // let data = await User.scope('checkStatus').findAll()
    // let data = await User.scope(['checkStatus','checkGender']).findAll()
    // let data = await Post.findAll({
    //     include:[{
    //         model: User,
    //         as: 'user_details'
    //     }]
    // })
    let data = await User.scope(['includePost', 'selectUsers', 'limit'])
    let response = {
        status: true,
        data: data,
    }
    res.status(200).json(response)
}

module.exports = {
    addUser,
    crudOperation,
    queryData,
    finderData,
    setterGetter,
    validatConst,
    rawQuery,
    scope
}
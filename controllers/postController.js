const db = require('../models')

const User = db.users
const Post = db.posts

const oneToOne = async (req, res) => {

    let data = await User.findAll({
        attributes: ['first_name'],
        include: {
            model: Post,
            as: 'post_details',
            attributes: [['name','PostName'],'title','content']
        },
        where: {
            id: 7
        }
    })
    let response = {
        status: true,
        data: data,
    }
    res.status(200).json(response)
}

const belongsTo = async(req, res)=>{
    let data = await Post.findAll({
        attributes: ['content', 'title'],
        include: {
            model: User,
            as: 'user_details',
            attributes: ['id','first_name']
        }
    })
    let response = {
        status: true,
        data: data,
    }
    res.status(200).json(response)
}

const oneToMany = async(req, res)=>{
    let data = await User.findAll({
        include: {
            model: Post,
            as: 'post_details',
        },
       
    })
    let response = {
        status: true,
        data: data,
    }
    res.status(200).json(response)
}

module.exports = {
    oneToOne,
    belongsTo,
    oneToMany
}
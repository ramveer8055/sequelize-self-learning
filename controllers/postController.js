const db = require('../models')

const User = db.users
const Post = db.posts
const Tag = db.tags

const oneToOne = async (req, res) => {

    let data = await User.findAll({
        attributes: ['name'],
        include: {
            model: Post,
            as: 'post_details',
            attributes: [['name', 'PostName'], 'title', 'content']
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

const belongsTo = async (req, res) => {
    let data = await Post.findAll({
        attributes: ['content', 'title'],
        include: {
            model: User,
            as: 'user_details',
            attributes: ['id', 'name']
        }
    })
    let response = {
        status: true,
        data: data,
    }
    res.status(200).json(response)
}

const oneToMany = async (req, res) => {
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

const manyToMany = async (req, res) => {
    //------------Post To Tag
    // let data = await Post.findAll({
    //     attributes: ['title','content'],
    //     include:{
    //         model: Tag,
    //         attributes: ['name']
    //     }
    // })

    //----------Tag To Post

    let data = await Tag.findAll({
        attributes: ['name'],
        include: {
            model: Post,
            attributes: ['title']
        }
    })
    let response = {
        status: true,
        data: data,
    }
    res.status(200).json(response)
}


const loading = async (req, res) => {
    //Eager loading
    let data = await User.findOne({
        include:[{
            required: true,
            model: Post,
           
            attributes: ['name']
        }],
        where:{
            id:2
        }
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
    oneToMany,
    manyToMany,
    loading
}
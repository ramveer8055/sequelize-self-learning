const db = require('../models')
const { Op } = require('sequelize')

const Image = db.images
const Video = db.videos
const Comment = db.comments
const Tag = db.tags
const Employee = db.employees


const polymorphic = async (req, res) => {
    //------image to comment----------
    // let data = await Image.findAll({
    //     include:[{
    //         model: Comment
    //     }]
    // })

    // let data = await Video.findAll({
    //     include: [{
    //         model: Comment
    //     }]
    // })


    //------------comment to video/image
    let data = await Comment.findAll({
        include: [{
            model: Image
        }]
    })
    let response = {
        status: true,
        data: data,
    }
    res.status(200).json(response)
}

const polymorphicMany = async (req, res) => {
    // let data = await Image.findAll({
    //     include: [{
    //         model: Tag
    //     }]
    // });
    // let data = await Video.findAll({
    //    include: [Tag]
    // });

    let data = await Tag.findAll({
        include: [Video]
    })
    let response = {
        status: true,
        data: data,
    }
    res.status(200).json(response)
}

const paranoid = async (req, res) => {
    //---------------Create---------------
    // const data = await Employee.create({ name: "Jane" });

    //--------------Find All--------------
    // const data = await Employee.findOne({
    //     where: {
    //         id: 8
    //     }
    // })

    //--------------Find All and with deleted--------------
    // const data = await Employee.findAll({
    //     where: {
    //         id: {
    //             [Op.gt]: 1
    //         }
    //     }
    //     // paranoid:false
    // })

    //-----Delete---------------
    // const data = await Employee.destroy({
    //     where: {
    //         user_id: 8
    //     }
    // })

    //-----Restore---------------
    const data = await Employee.restore({
        where: {
            user_id: 8
        }
    })

    let response = {
        status: true,
        data: data,
    }

    res.status(200).json(response)
}

module.exports = {
    polymorphic,
    polymorphicMany,
    paranoid
}
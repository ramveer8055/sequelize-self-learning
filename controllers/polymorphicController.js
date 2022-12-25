const db = require('../models')

const Image = db.images
const Video = db.videos
const Comment = db.comments
const Tag = db.tags


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

const polymorphicMany = async (req, res)=>{
    // let data = await Image.findAll({
    //     include: [{
    //         model: Tag
    //     }]
    // });
    // let data = await Video.findAll({
    //    include: [Tag]
    // });

    let data = await Tag.findAll({
        include:[Video]
    })
    let response = {
        status: true,
        data: data,
    }
    res.status(200).json(response)
}

module.exports = {
    polymorphic,
    polymorphicMany
}
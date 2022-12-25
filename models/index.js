'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.sequelize.sync({force:false, match:/mydb$/}).then(()=>{
//   console.log("RE SYNC")
// })

db.users = require("./user.js")(sequelize, Sequelize);
db.posts = require("./post.js")(sequelize, Sequelize);
db.tags = require("./tag.js")(sequelize, Sequelize);
db.post_tags = require("./posttag.js")(sequelize, Sequelize);

//--------One To One-----------------
// db.users.hasOne(db.posts, { foreignKey: 'user_id', as: 'post_details' })  // default userId 

//--------One To Many----------------
db.users.hasMany(db.posts)  // default userId 

//--------Scope Active user posts
// db.posts.belongsTo(db.users, { foreignKey: 'user_id', as: 'user_details' })

//--------Many To Many---------------
db.posts.belongsToMany(db.tags, { through: 'post_tags', foreignKey: 'tag_id' })
db.tags.belongsToMany(db.posts, { through: 'post_tags', foreignKey: 'post_id' })

//-------Scope ---------------------
db.users.addScope('checkStatus', {
  where: {
    status: 1
  }
})

db.posts.belongsTo(db.users.scope('checkStatus'), { foreignKey: 'user_id', as: 'user_details' })


db.users.addScope('checkGender', {
  where: {
    status: 1,
    gender: 'M'
  }
})


//-------When we doesn't relationship b/w 
db.users.addScope('includePost', {
  include: {
    model: db.posts,
    attributes: ['title', 'content']
  }
})
db.users.addScope('selectUsers', {
  attributes: ['name', 'email']
})
db.users.addScope('limit', {
  limit: 2
})


//--------------------Polymorphic one to many--------------

db.videos = require('./video')(sequelize, Sequelize)
db.images = require('./image')(sequelize, Sequelize)
db.comments = require('./comment')(sequelize, Sequelize)

db.images.hasMany(db.comments, {
  foreignKey: 'comment_table_id',
  constraints: false,
  scope: {
    comment_table_type: 'image'
  }
})


db.videos.hasMany(db.comments, {
  foreignKey: 'comment_table_id',
  constraints: false,
  scope: {
    comment_table_type: 'video'
  }
})

db.comments.belongsTo(db.images, { foreignKey: 'comment_table_id', constraints: false })

db.comments.belongsTo(db.videos, { foreignKey: 'comment_table_id', constraints: false })

//-----------------Polymorphic Many To Many--------------
db.tag_taggables = require('./tagtaggable')(sequelize, Sequelize);

//--------------------------Image to Tag-----------------
db.images.belongsToMany(db.tags, {
  through: {
    model: db.tag_taggables,
    unique: false,
    scope: {
      taggable_type: 'image'
    },
    foreignKey: 'taggable_id',
    constraints: false
  }
})



//--------------------------Tag to Image-----------------
db.tags.belongsToMany(db.images, {
  through: {
    model: db.tag_taggables,
    unique: false,
    scope: {
      taggable_type: 'image'
    },
    foreignKey: 'tag_id',
    constraints: false
  }
})


//--------------------------Video to Tag-----------------
db.videos.belongsToMany(db.tags, {
  through: {
    model: db.tag_taggables,
    unique: false,
    scope: {
      taggable_type: 'video'
    },
    foreignKey: 'taggable_id',
    constraints: false
  }
})


//--------------------------Tag to Video-----------------
db.tags.belongsToMany(db.videos, {
  through: {
    model: db.tag_taggables,
    unique: false,
    scope: {
      taggable_type: 'video'
    },
    foreignKey: 'tag_id',
    constraints: false
  }
})


module.exports = db;

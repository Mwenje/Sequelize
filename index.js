const { Sequelize, DataTypes, Op, where } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    // define: {
    //   freezeTableName: true,
    // },
  }
);

// sequelize.sync({ alter: true });
// sequelize.drop({ match: /_test$/ });

const User = sequelize.define(
  "user",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 10],
      },
    },
    password: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 21,
    },
    codebindRocks: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

User.sync({ alter: true })
  .then(() => {
    // return User.findAll({
    //   attributes: [
    //     ["username", "myname"],
    //     ["password", "pwd"],
    //   ],
    // });
    // return User.findAll({
    //   attributes: [[sequelize.fn("SUM", sequelize.col("age")), "total_age"]],
    // });
    // return User.findAll({ attributes: { exclude: ["password"] } });`
    // return User.findAll({
    //   attributes: [["username", "profile_name"]],
    //   where: { age: 45 },
    // });
    // return User.findAll({ where: { age: 45, username: "codebind" } });
    // return User.findAll({ limit: 2 });
    // return User.findAll({ order: [["age", "ASC"]] });
    // return User.findAll({
    //   attributes: [
    //     "username",
    //     [sequelize.fn("SUM", sequelize.col("age")), "total_age"],
    //   ],
    //   group: "username",
    // });
    // return User.findAll({
    //   where: {
    //     [Op.or]: { username: "codebind", age: 22 },
    //   },
    // });
    // return User.findAll({
    //   where: {
    //     age: {
    //       [Op.or]: {
    //         [Op.lt]: 45,
    //         [Op.eq]: null,
    //       },
    //     },
    //   },
    // });
    // return User.findAll({
    //   where: sequelize.where(
    //     sequelize.fn("char_length", sequelize.col("username")),
    //     6
    //   ),
    // });
    // return User.update(
    //   { username: "samuel" },
    //   {
    //     where: { age: 21 },
    //   }
    // );
    // return User.update(
    //   { username: "Yes!" },
    //   {
    //     where: {
    //       age: {
    //         [Op.gt]: 1,
    //       },
    //     },
    //   }
    // );

    // return User.destroy({ where: { username: "Yes!" } });

    // return User.destroy({ truncate: true });

    return User.sum("age", { where: { age: 21 } });
  })
  .then((data) => {
    // data.forEach((el) => {
    //   console.log(el.toJSON());
    // });

    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

// User.sync({ alter: true })
//   .then(() => {
//     return User.bulkCreate(
//       [
//         {
//           username: "testlkhdflh1",
//           age: 24,
//           password: "jkasf",
//         },
//         {
//           username: "M",
//           age: 36,
//           password: "1527",
//         },
//         {
//           username: "teshldkhft1",
//         },
//       ],
//       {
//         validate: true,
//       }
//     );
//   })
//   .then((data) => {
//     data.forEach((ele) => {
//       console.log(ele.toJSON());
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// console.log(sequelize.models.user === User);

// User.sync({ alter: true })
//   .then(() => {
//     // const user = User.build({
//     //   username: "codebind",
//     //   password: "123",
//     //   age: 21,
//     //   codebindRocks: true,
//     // });
//     // user.username = "Mugaah";
//     // return user.save();
//     return User.create({
//       username: "codebind",
//       password: "123",
//       age: 21,
//       codebindRocks: true,
//     });
//   })
//   .then((data) => {
//     // console.log(data.toJSON());

//     console.log(`User added to database`);
//     data.username = "pizza";
//     data.age = 45;
//     return data.save({ fields: ["age"] });
//   })
//   .then((data) => {
//     console.log("USer returned to normal");
//     console.log(data.toJSON());
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((error) => {
//     console.error("Unable to connect to the database:", error);
//   });

// const checkConnection = async function () {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

// checkConnection();

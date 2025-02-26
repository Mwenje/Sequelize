const { Sequelize, DataTypes, Op, where } = require("sequelize");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const zlib = require("zlib");
const { abort } = require("process");

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
        len: [4, 20],
      },
      get() {
        const rawValue = this.getDataValue("username");
        return rawValue.toUpperCase();
      },
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue("password", hash);
      },
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 21,
    },
    codebindRocks: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    description: {
      type: DataTypes.STRING,
      set(value) {
        const compressed = zlib.deflateSync(value).toString("base64");
        this.setDataValue("description", compressed);
      },
      get() {
        const value = this.getDataValue("description");
        const uncompressed = zlib.inflateSync(Buffer.from(value, "base64"));
        return uncompressed.toString();
      },
    },
    abortUser: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.username} ${this.description}`;
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

User.sync({ alter: true })
  .then(() => {
    return User.findOne({ where: { username: "olivia_james22" } });
    // return User.create({
    //   username: "olivia_james22",
    //   age: 22,
    //   password: "oliviajames22",
    //   description:
    //     "Olivia is a recent graduate with a degree in finance and a keen interest in traveling.",
    // });

    // return User.findAndCountAll({
    //   where: {
    //     username: "john_jones",
    //   },
    //   raw: true,
    // });

    // return User.findOrCreate({
    //   where: { username: "john_jones" },
    //   defaults: { password: "123456", age: 25 },
    // });
    // return User.findOne({
    //   where: {
    //     age: {
    //       [Op.or]: {
    //         [Op.lt]: 25,
    //         [Op.eq]: null,
    //       },
    //     },
    //   },
    // });
    // return User.findByPk(4);
    // return User.findAll({
    //   where: { age: 21, username: "mark_lee44" },
    //   raw: true,
    // });
  })
  .then((data) => {
    console.log(data.abortUser);

    //forfindandcountall
    // const { count, rows } = data;
    // console.log(count);
    // console.log(rows);

    //for findorcreate
    // const [result, created] = data;
    // console.log(created);
  })
  .catch((err) => {
    console.log(err);
  });

// User.sync({ alter: true })
//   .then(() => {
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

//   return User.sum("age", { where: { age: 21 } });
// })
// .then((data) => {
//   // data.forEach((el) => {
//   //   console.log(el.toJSON());
//   // });

//   console.log(data);
// })
// .catch((err) => {
//   console.log(err);
// });

// User.sync({ alter: true })
//   .then(() => {
//     return User.bulkCreate(
//       [
//         {
//           username: "john_doe123",
//           age: 30,
//           password: "password123",
//           codebindRocks: false,
//         },
//         {
//           username: "alexandra_smith56",
//           age: 27,
//           password: "alex1234",
//         },
//         {
//           username: "random_user789",
//           age: 22,
//           password: "randompass78",
//           codebindRocks: true,
//         },
//         {
//           username: "jane_doe2025",
//           age: 33,
//           password: "janedoe2025",
//           codebindRocks: true,
//         },
//         {
//           username: "testuserabc",
//           age: 19,
//           password: "testpassabc",
//           codebindRocks: false,
//         },
//         {
//           username: "mark_lee44",
//           password: "markpass44",
//           codebindRocks: true,
//         },
//         {
//           username: "susan_34abc",
//           password: "susanpass34",
//         },
//         {
//           username: "hello_world56",
//           age: 26,
//           password: "helloworld56",
//           codebindRocks: false,
//         },
//         {
//           username: "username1234",
//           age: 21,
//           password: "userpass1234",
//           codebindRocks: false,
//         },
//         {
//           username: "test123user",
//           age: 23,
//           password: "test123password",
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

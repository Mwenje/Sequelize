const { Sequelize, DataTypes, Op, where } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
  }
);

const Student = sequelize.define(
  "student",
  {
    student_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [4, 20] },
    },
    favorite_class: {
      type: DataTypes.STRING,
      defaultValue: "Computer Science",
    },
    school_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subscribed_to_wittcode: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Student.sync({ alter: true })
  .then(() => {
    // return Student.findAll({
    //   where: {
    //     [Op.or]: {
    //       favorite_class: "Computer Science",
    //       subscribed_to_wittcode: true,
    //     },
    //   },
    // });

    return Student.findAll({
      attributes: [
        "school_year",
        [sequelize.fn("COUNT", sequelize.col("student_id")), "num_students"],
      ],
      group: "school_year",
    });
  })
  .then((data) => {
    data.forEach((el) => {
      console.log(el.toJSON());
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Student.sync({ alter: true })
//   .then(() => {
//     return Student.bulkCreate(
//       [
//         {
//           name: "John",
//           school_year: 1,
//           favorite_class: "Computer Science",
//           subscribed_to_wittcode: false,
//         },
//         {
//           name: "Jane Smith",
//           school_year: 2,
//           favorite_class: "Mathematics",
//           subscribed_to_wittcode: true,
//         },
//         {
//           name: "Michael Lee",
//           school_year: 3,
//           favorite_class: "Physics",
//         },
//         {
//           name: "Emily Davis",
//           school_year: 4,
//           favorite_class: "Biology",
//           subscribed_to_wittcode: true,
//         },
//         {
//           name: "Robert Brown",
//           school_year: 1,
//           favorite_class: "History",
//           subscribed_to_wittcode: false,
//         },
//         {
//           name: "Sophia Wilson",
//           school_year: 2,
//           favorite_class: "English",
//           subscribed_to_wittcode: true,
//         },
//       ],
//       {
//         validate: true,
//       }
//     );
//   })
//   .then((data) => {
//     data.forEach((el) => {
//       console.log(el.toJSON());
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Student.sync({ alert: true })
//   .then(() => {
//     console.log("Table created");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const checkConnection = async function () {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.log("Unable to connect to the database:", error);
//   }
// };

// checkConnection();

import { DataTypes } from "sequelize";

class DnmModel{
  constructor(server){
    const table = server.model.db.define('dnm', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      picOne:{
        type: DataTypes.STRING(40),
        allowNull: false
      },
      picTwo: {
        type: DataTypes.STRING(40),
        allowNull: true
      },
      UIC: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      crNumber: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      status: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      timeline: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      category: {
        type: DataTypes.STRING(4),
        allowNull: false
      },
      subCategory: {
        type: DataTypes.STRING(3),
        allowNull: true
      }
    }, {
      freezeTableName: true
    })

    this.table = table
  }
}

export default DnmModel;
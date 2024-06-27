import { DataTypes } from "sequelize"

class KPIHandlingComplain{
  constructor(server) {
    const table = server.model.db.define('kpi-handling-complain', {
        dateTrx: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        itemTrx: {
          type: DataTypes.STRING,
          allowNull: false
        },
        itemTrxSLA: {
          type: DataTypes.STRING,
          allowNull: false
        },
        categoryMachine: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'masterdata-category-machine',
            key : 'id'
          }

        }
    }, {
      freezeTableName: true
    })

    this.table = table;

  }
}

export default KPIHandlingComplain;
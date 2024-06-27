import { DataTypes } from "sequelize"

class KPIRekonModel{
  constructor(server) {
    const table = server.model.db.define('kpi-rekon', {
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
        categoryJaringan: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'masterdata-category-jaringan',
            key : 'id'
          }
        }
    }, {
      freezeTableName: true
    })

    this.table = table;

  }
}

export default KPIRekonModel;
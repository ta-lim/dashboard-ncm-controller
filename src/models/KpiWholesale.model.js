import { DataTypes } from "sequelize"

class KPIWholesaleModel{
  constructor(server) {
    const table = server.model.db.define('kpi-wholesale', {
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
        categoryTrxDefect: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'masterdata-category-trx-defect',
            key : 'id'
          }
        }
    }, {
      freezeTableName: true
    })

    this.table = table;

  }
}

export default KPIWholesaleModel;
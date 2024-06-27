import { DataTypes } from "sequelize"

class KPIRetailModel{
  constructor(server) {
    const table = server.model.db.define('kpi-retail', {
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
        categoryOpsRetail: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'masterdata-category-ops-retail',
            key : 'id'
          }

        }
    }, {
      freezeTableName: true
    })

    this.table = table;

  }
}

export default KPIRetailModel;
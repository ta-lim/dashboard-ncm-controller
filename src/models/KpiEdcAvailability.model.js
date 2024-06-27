import { DataTypes } from "sequelize"

class KPIEdcAvailibilityModel{
  constructor(server) {
    const table = server.model.db.define('kpi-edc-availibility', {
        dateTrx: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        totalActiveTID: {
          type: DataTypes.STRING,
          allowNull: false
        },
        totalTID: {
          type: DataTypes.STRING,
          allowNull: false
        },
    }, {
      freezeTableName: true
    })

    this.table = table;

  }
}

export default KPIEdcAvailibilityModel;
import { DataTypes } from "sequelize"

class KPIDisputeResolution{
  constructor(server) {
    const table = server.model.db.define('kpi-dispute-resolution', {
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
    }, {
      freezeTableName: true
    })

    this.table = table;

  }
}

export default KPIDisputeResolution;
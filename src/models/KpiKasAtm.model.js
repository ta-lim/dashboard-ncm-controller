import { DataTypes } from "sequelize"

class KPIKasATMModel{
  constructor(server) {
    const table = server.model.db.define('kpi-kas-atm', {
        dateTrx: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        cashRetrieval: {
          type: DataTypes.STRING(25),
          allowNull: false
        },
        cashFilling: {
          type: DataTypes.STRING(25),
          allowNull: false
        },
    }, {
      freezeTableName: true
    })

    this.table = table;

  }
}

export default KPIKasATMModel;
import { DataTypes } from "sequelize"

class KPIPaguKasModel{
  constructor(server) {
    const table = server.model.db.define('kpi-pagukas', {
        dateTrx: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        realisasi: {
          type: DataTypes.STRING(75),
          allowNull: false
        },
        paguKas: {
          type: DataTypes.STRING(75),
          allowNull: false
        },
    }, {
      freezeTableName: true
    })

    this.table = table;

  }
}

export default KPIPaguKasModel;
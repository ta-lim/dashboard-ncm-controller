import { DataTypes } from "sequelize"

class KPIUpTimeMachine{
  constructor(server) {
    const table = server.model.db.define('kpi-uptime-machine', {
        dateTrx: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        upTimeATM: {
          type: DataTypes.STRING(10),
          allowNull: false
        },
        upTimeCRM: {
          type: DataTypes.STRING(10),
          allowNull: false
        },
        categoryWilayahOperasional: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'masterdata-wilayah-operasional',
            key: 'id'
          }
        },
    }, {
      freezeTableName: true
    })

    this.table = table;

  }
}

export default KPIUpTimeMachine;
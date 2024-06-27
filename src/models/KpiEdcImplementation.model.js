import { DataTypes } from "sequelize"

class KPIEdcImplementation{
  constructor(server) {
    const table = server.model.db.define('kpi-edc-implementation', {
        dateTrx: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        itemEdc: {
          type: DataTypes.STRING(10),
          allowNull: false
        },
        targetItemEdc: {
          type: DataTypes.STRING(10),
          allowNull: false,
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

export default KPIEdcImplementation;
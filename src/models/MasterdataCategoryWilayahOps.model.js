import { DataTypes } from "sequelize";

class MasterdataWilayahOps {
  constructor(server) {
    const table = server.model.db.define("masterdata-wilayah-operasional",
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true 
        },
        categoryWilayahOperasional: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        timestamps: false,
        createdAt: false,
        updateAt: false,
        freezeTableName: true
      }
    );


    this.table = table;
    this.initializeTable();
  }
  async initializeTable() {
    try {
      await this.table.sync();

      const count = await this.table.count();
      if (count === 0) {
        await this.table.bulkCreate([
          {categoryWilayahOperasional: "W01"},
          {categoryWilayahOperasional: "W02"},
          {categoryWilayahOperasional: "W03"},
          {categoryWilayahOperasional: "W04"},
          {categoryWilayahOperasional: "W05"},
          {categoryWilayahOperasional: "W06"},
          {categoryWilayahOperasional: "W07"},
          {categoryWilayahOperasional: "W08"},
          {categoryWilayahOperasional: "W09"},
          {categoryWilayahOperasional: "W10"},
          {categoryWilayahOperasional: "W11"},
          {categoryWilayahOperasional: "W12"},
          {categoryWilayahOperasional: "W14"},
          {categoryWilayahOperasional: "W15"},
          {categoryWilayahOperasional: "W16"},
          {categoryWilayahOperasional: "W17"},
          {categoryWilayahOperasional: "W18"},
          {categoryWilayahOperasional: "WHK"},
          {categoryWilayahOperasional: "WSN"},
        ]);
        
      }
    } catch (error) {
      console.error("Error initializing master data:", error);
    }
  }
}

export default MasterdataWilayahOps;

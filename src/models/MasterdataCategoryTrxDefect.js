import { DataTypes } from "sequelize";

class MasterdataCategoryTrxDefect {
  constructor(server) {
    const table = server.model.db.define("masterdata-category-trx-defect",
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true 
        },
        categoryTrxDefect: {
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
          { categoryTrxDefect: "Retur Kliring" },
          { categoryTrxDefect: "Retur RTGS" },
          { categoryTrxDefect: "Gagal IH" },
          { categoryTrxDefect: "Charge to Ben Kliring" },
          { categoryTrxDefect: "Charge to Ben RTGS" },
          { categoryTrxDefect: "Gagal BI Fast" },
          { categoryTrxDefect: "Gagal Online Payment" },
          { categoryTrxDefect: "Retur Refund IFT OTF" },
          { categoryTrxDefect: "Ammendment" },
        ]);
      }
    } catch (error) {
      console.error("Error initializing master data:", error);
    }
  }
}

export default MasterdataCategoryTrxDefect;

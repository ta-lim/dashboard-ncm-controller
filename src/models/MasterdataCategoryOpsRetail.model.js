import { DataTypes } from "sequelize";

class MasterdataCategoryOpsRetail {
  constructor(server) {
    const table = server.model.db.define("masterdata-category-ops-retail",
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true 
        },
        categoryOpsRetail: {
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
          { categoryOpsRetail: "AUTODEBET SOF KARTU KREDIT" },
          { categoryOpsRetail: "AUTODEBET SOF KARTU DEBIT" },
          { categoryOpsRetail: "HANDLING COMPLAIN TOP UP TAPCASH (ORM)" },
          { categoryOpsRetail: "HANDLING COMPLAIN FITUR KARTU KREDIT (ORM)" },
          // { categoryOpsRetail: "HANDLING COMPLAIN INTERCHANGE" },
        ]);
      }
    } catch (error) {
      console.error("Error initializing master data:", error);
    }
  }
}

export default MasterdataCategoryOpsRetail;

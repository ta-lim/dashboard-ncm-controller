import { DataTypes } from "sequelize";

class MasterdataCategoryJaringan {
  constructor(server) {
    const table = server.model.db.define("masterdata-category-jaringan",
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true 
        },
        categoryJaringan: {
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
          { categoryJaringan: "Switcher" },
          { categoryJaringan: "BI-Fast" },
          { categoryJaringan: "Principal" },
          { categoryJaringan: "Payment Biller" },
          { categoryJaringan: "Merchant dan E-Commerce" },
          { categoryJaringan: "Private Label" },
          { categoryJaringan: "Institusi dan Program Pemerintah" },
        ]);
      }
    } catch (error) {
      console.error("Error initializing master data:", error);
    }
  }
}

export default MasterdataCategoryJaringan;

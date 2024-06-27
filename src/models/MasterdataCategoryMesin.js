import { DataTypes } from "sequelize";

class MasterdataCategoryMachine {
  constructor(server) {
    const table = server.model.db.define("masterdata-category-machine",
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true 
        },
        categoryMachine: {
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
          { categoryMachine: "e-Channel" },
          { categoryMachine: "EDC" },
        ]);
      }
    } catch (error) {
      console.error("Error initializing master data:", error);
    }
  }
}

export default MasterdataCategoryMachine;

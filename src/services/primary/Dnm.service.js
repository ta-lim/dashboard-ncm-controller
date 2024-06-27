import DnmModel from "../../models/Dnm.model.js";
import ExcelJS from "exceljs";
import { Op } from "sequelize";
import FileSystemHelper from "../../helpers/FileSystem.helper.js";

class DnmService {
  constructor(server) {
    this.server = server;
    this.FileSystemHelper = new FileSystemHelper(this.server);
    this.DnmModel = new DnmModel(this.server).table;
  }

  async createData(data) {
    if (data.subCategory === "4" && data.category.includes(["8", "9", "10"])) {
      return -1;
    }

    const addDataDnmModel = await this.DnmModel.create({
      title: data.title,
      picOne: data.picOne,
      picTwo: data.picTwo,
      UIC: data.UIC,
      description: data.description,
      crNumber: data.crNumber,
      status: data.status,
      timeline: data.timeline,
      category: data.category,
      subCategory: data.subCategory,
    });

    return 1;
  }

  async getAllData(category, subCategory) {
    const getDataDnm = await this.DnmModel.findAll({
      where: {
        category,
        ...(subCategory && { subCategory }),
      },
      order: [
        ["status", "ASC"],
        ["timeline", "ASC"],
        ["picOne", "ASC"],
      ],
    });

    return getDataDnm;
  }

  async getDetail(id) {
    const getDetailDnm = await this.DnmModel.findOne({
      attributes: {exclude: ["createdAt", "updatedAt"]},
      where: {
        id,
      },
    });

    return getDetailDnm;
  }

  async updateData(data) {
    const updateDataDnm = await this.DnmModel.update(
      {
        title: data.title,
        picOne: data.picOne,
        picTwo: data.picTwo,
        UIC: data.UIC,
        description: data.description,
        crNumber: data.crNumber,
        status: data.status,
        timeline: data.timeline,
      },
      {
        where: {
          id: data.id,
        },
      }
    );

    return 1;
  }

  async updateStatus(data) {
    const updateStatus = await this.DnmModel.update(
      {
        status: data.status,
      },
      {
        where: {
          id: data.id,
        },
      }
    );

    return 1;
  }

  async deleteData(id) {
    const deleteaDataDnm = await this.DnmModel.destroy({
      where: {
        id,
      },
    });

    return 1;
  }

  async getAnalyze(category, subCategory) {
    const getAnalyze = await this.DnmModel.count({
      where: {
        category,
        ...(subCategory && { subCategory }),
      },
      group: ["status"],
    });

    const getRank = await this.DnmModel.count({
      where: {
        category,
        ...(subCategory && { subCategory }),
      },
      group: ["picOne", "status"],
    });

    const onProgress = await getAnalyze.filter((item) =>
      ["1", "2", "3", "4", "5", "9"].includes(item.status)
    );
    const pending = await getAnalyze.filter((item) =>
      ["7", "8"].includes(item.status)
    );
    const done = await getAnalyze.filter((item) =>
      ["6", "10"].includes(item.status)
    );

    function calculateRankSum(arr) {
      const result = arr.reduce((acc, current) => {
        if (!acc[current.picOne]) {
          acc[current.picOne] = { count: 0 };
        }
        acc[current.picOne].count += current.count;
        return acc;
      }, {});

      const sortedData = Object.keys(result).map((name) => ({
        name,
        count: result[name].count,
      }));

      sortedData.sort((a, b) => b.count - a.count);

      return sortedData;
    }

    const onProgressSum = await onProgress.reduce(
      (total, item) => total + item.count,
      0
    );

    const summary = {
      onProgress: onProgressSum,
      pending: pending.length > 0 ? pending[0].count : 0,
      done: done.length > 0 ? done[0].count : 0,
      total: getAnalyze.reduce((total, item) => total + item.count, 0),
    };
    const onProgressRank = calculateRankSum(
      getRank.filter((item) =>
        ["1", "2", "3", "4", "5", "9"].includes(item.status)
      )
    );
    const pendingRank = calculateRankSum(
      getRank.filter((item) => ["7", "8"].includes(item.status))
    );
    const doneRank = calculateRankSum(
      getRank.filter((item) => ["6", "10"].includes(item.status))
    );
    function transformData(onProgressRank, pendingRank, doneRank) {
      // Helper function to add counts to the aggregation object
      function addCounts(rank, counts) {
        rank.forEach(({ name, count }) => {
          counts[name] = (counts[name] || 0) + count;
        });
      }
      // Aggregate the counts for each name
      const totalCounts = {};
      addCounts(onProgressRank, totalCounts);
      addCounts(pendingRank, totalCounts);
      addCounts(doneRank, totalCounts);

      // Sort names by their total count
      const sortedNames = Object.keys(totalCounts).sort(
        (a, b) => totalCounts[b] - totalCounts[a]
      );

      // Initialize statusData with empty arrays
      const statusData = {
        "On Progress": new Array(sortedNames.length).fill(0),
        Pending: new Array(sortedNames.length).fill(0),
        Done: new Array(sortedNames.length).fill(0),
      };

      // Helper function to populate statusData based on sorted names
      function populateStatusData(rank, status) {
        rank.forEach(({ name, count }) => {
          const index = sortedNames.indexOf(name);
          statusData[status][index] = count;
        });
      }

      // Populate statusData with counts from each rank
      populateStatusData(onProgressRank, "On Progress");
      populateStatusData(pendingRank, "Pending");
      populateStatusData(doneRank, "Done");

      // Transform statusData into the desired format
      const transformedData = Object.entries(statusData).map(
        ([name, data]) => ({
          name,
          data,
        })
      );

      return { transformedData, sortedNames };
    }

    const transformedData = transformData(
      onProgressRank,
      pendingRank,
      doneRank
    );
    
    const summaryRank = {
      onProgress: onProgressRank,
      pending: pendingRank,
      done: doneRank,
      total: transformedData,
    };
    return { summary, summaryRank };
  }

  async search(title, category, subCategory) {
    if (category === "undefined") return -1;
    const whereCondition = { category };
    // Check if subCategory is provided
    if (subCategory !== "-1") {
      whereCondition.subCategory = subCategory;
    }

    const searchTitle = await this.DnmModel.findAll({
      where: {
        title: {
          [Op.substring]: `%${title}%`,
        },
        whereCondition,
      },
    });

    return searchTitle;
  }

  async masterDataFilter(category, subCategory) {
    const whereCondition = { category };
    // Check if subCategory is provided
    if (subCategory !== undefined) {
      whereCondition.subCategory = subCategory;
    }
    const masterDataPicOne = await this.DnmModel.findAll({
      attributes: ["picOne"],
      group: ["picOne"],
      where: whereCondition,
    });

    const masterDataUIC = await this.DnmModel.findAll({
      attributes: ["UIC"],
      group: ["UIC"],
      where: whereCondition,
    });

    const masterDataStatus = await this.DnmModel.findAll({
      attributes: ["status"],
      group: "status",
      where: whereCondition,
    });

    const masterDataTimeline = await this.DnmModel.findAll({
      attributes: ["timeline"],
      group: "timeline",
      where: whereCondition,
    });

    return {
      masterDataPicOne,
      masterDataStatus,
      masterDataTimeline,
      masterDataUIC,
    };
  }
  async filterData(options) {
    const whereClause = {};

    for (const key in options) {
      // Check if the value is provided and not null
      if (options[key] !== undefined && options[key] !== null) {
        // Add the parameter to the where clause
        whereClause[key] = options[key];
      }
    }
    const filterData = await this.DnmModel.findAll({
      where: whereClause,
    });
    return filterData;
  }

  async downloadData(category) {
    const dataDnm = await this.DnmModel.findAll({
      order: [
        ["status", "ASC"],
        ["timeline", "ASC"],
      ],
      where: {
        category,
      },
    });

    const workBook = new ExcelJS.Workbook();
    const workSheet = workBook.addWorksheet("Data Project");

    workSheet.columns = [
      { header: "Title", id: "title", width: 30 },
      { header: "PIC 1", id: "picOne" },
      { header: "PIC 2", id: "picTwo" },
      { header: "UIC", id: "UIC" },
      { header: "Description", id: "description", width: 30 },
      { header: "CR Number", id: "crNumber" },
      { header: "Status", id: "status" },
      { header: "Timeline", id: "timeline" },
    ];
    workSheet.getColumn("A").alignment = {
      wrapText: true,
      horizontal: "center",
      vertical: "middle",
    };
    workSheet.getColumn("E").alignment = {
      wrapText: true,
      horizontal: "left",
      vertical: "middle",
    };
    // workSheet.getColumn(['B', 'C', 'D', 'F', 'G', 'H']).alignment = {vertical: 'middle', horizontal: 'center'}
    const statusMap = new Map([
      ["1", "Design"],
      ["2", "Development"],
      ["3", "Testing"],
      ["4", "Promote"],
      ["5", "PIR"],
      ["6", "Go Live"],
      ["7", "Requirement"],
      ["8", "Pending"],
      ["9", "On Progress"],
      ["10", "Done"],
    ]);

    const timelineMap = new Map([
      ["1", "Q1 - 2024"],
      ["2", "Q2 - 2024"],
      ["3", "Q3 - 2024"],
      ["4", "Q4 - 2024"],
    ]);

    dataDnm.forEach((data) => {
      workSheet.addRow([
        data.title,
        data.picOne,
        data.picTwo,
        data.UIC,
        data.description,
        data.crNumber,
        statusMap.get(data.status),
        timelineMap.get(data.timeline),
      ]);
    });

    await workBook.xlsx.writeFile(`./server_data/data.xlsx`);
    return {
      title: "data",
      ...(await this.FileSystemHelper.readFile("/server_data/data.xlsx")),
    };
  }
}

export default DnmService;

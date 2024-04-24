import DnmModel from "../../models/Dnm.model.js";
import ExcelJS from "exceljs";
import { Op } from "sequelize";
import FileSystemHelper from "../../helpers/FileSystem.helper.js";


class DnmService {
  constructor(server){
    this.server = server;
    this.FileSystemHelper = new FileSystemHelper(this.server);
    this.DnmModel = new DnmModel(this.server).table;
  }

  async createData(data) { 
    if (data.subCategory === '4' && data.category.includes(['8', '9', '10'])){
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
      subCategory: data.subCategory
    });

    return 1;
  }

  async getAllData( category, subCategory ) {
    const getDataDnm = await this.DnmModel.findAll({
      where: {
        category,
        ...(subCategory && { subCategory }),
      },
      order: [
        [
          'status', 'ASC'
        ],
        [
          'timeline', 'ASC'
        ],
        [
          'picOne', 'ASC'
        ]
      ],
    })

    return getDataDnm;
  }

  async getDetail(id) {
    const getDetailDnm = await this.DnmModel.findOne({
      where: {
        id
      }
    })

    return getDetailDnm;
  }

  async updateData(data) {
    const updateDataDnm = await this.DnmModel.update({
      title: data.title,
      picOne: data.picOne,
      picTwo: data.picTwo,
      UIC: data.UIC,
      description: data.description,
      crNumber: data.crNumber,
      status: data.status,
      timeline: data.timeline,
    },{
      where: {
        id: data.id
      }
    })

    return 1;
  }

  async deleteData(id) {
    const deleteaDataDnm = await this.DnmModel.destroy({
      where: {
        id
      }
    })

    return 1
  }

  async getAnalyze( category, subCategory ) {
    const getAnalyze = await this.DnmModel.count({
      where: {
        category,
        ...(subCategory && { subCategory })
      },
      group: ['status']
    });

    const getRank = await this.DnmModel.count({
      where: {
        category,
        ...(subCategory && { subCategory })
      },
      group: ['picOne', 'status']
    });

    const onProgress = await getAnalyze.filter(item => ['1', '2', '3', '4', '5', '9'].includes(item.status));
    const pending = await getAnalyze.filter(item => ['7', '8'].includes(item.status));
    const done = await getAnalyze.filter(item => ['6', '10'].includes(item.status));

    function calculateRankSum(arr) {
      return arr.reduce((result, current) => {
        if (!result[current.picOne]) {
          result[current.picOne] = { count: 0 };
        }
        result[current.picOne].count += current.count;
        return result;
      }, {});
    }

    const onProgressSum = await onProgress.reduce((total, item) => total + item.count, 0);

    const summary = {
      "onProgress": onProgressSum,
      "pending": pending.length > 0 ? pending[0].count  : 0,
      "done": done.length > 0 ? done[0].count : 0,
      "total": getAnalyze.reduce((total, item) => total + item.count, 0),
    }
    const summaryRank = {
      "onProgress": calculateRankSum(getRank.filter(item => ['1', '2', '3', '4', '5', '9'].includes(item.status))),
      "pending": calculateRankSum(getRank.filter(item => ['7', '8'].includes(item.status))),
      "done": calculateRankSum(getRank.filter(item => ['6', '10'].includes(item.status))),
      "total": calculateRankSum(getRank),
    }
    return {summary, summaryRank};
  }

  async search(title) {
    const searchTitle = await this.DnmModel.findAll({
      where: {
        title: {
          [Op.substring]: `%${title}%`
        }
      }
    })

    return searchTitle;
  } 

  async downloadData( category ) {
    const dataDnm = await this.DnmModel.findAll({
      order: [
        ['status', 'ASC'],
        ['timeline', 'ASC'],
      ],
      where: {
        category
      }
    })

    const workBook = new ExcelJS.Workbook();
    const workSheet = workBook.addWorksheet("Data Project");

    workSheet.columns = [
      {header: "Title", id: "title", width:30 },
      {header: "PIC 1", id: "picOne"},
      {header: "PIC 2", id: "picTwo"},
      {header: "UIC", id: "UIC"},
      {header: "Description", id: "description", width:30},
      {header: "CR Number", id: "crNumber"},
      {header: "Status", id: "status"},
      {header: "Timeline", id: "timeline"},

    ]
    workSheet.getColumn('A').alignment = { wrapText: true, horizontal: 'center', vertical: 'middle'}
    workSheet.getColumn('E').alignment = { wrapText: true, horizontal: 'left', vertical: 'middle'}
    // workSheet.getColumn(['B', 'C', 'D', 'F', 'G', 'H']).alignment = {vertical: 'middle', horizontal: 'center'}
    const statusMap = new Map([
      ["1",  'Design' ],
      ["2",  'Development' ],
      ["3",  'Testing' ],
      ["4",  'Promote' ],
      ["5",  'PIR' ],
      ["6",  'Go Live' ],
      ["7", 'Requirement'],
      ["8",  'Pending' ],
      ["9",  'On Progress' ],
      ["10",  'Done' ]
    ]);

    const timelineMap = new Map([
      ["1", "Q1 - 2024"],
      ["2", "Q2 - 2024"],
      ["3", "Q3 - 2024"],
      ["4", "Q4 - 2024"]
    ]);

    dataDnm.forEach((data) => {
      // console.log(data.title);
      // workSheet.addRow([1, 'cek', new Date()])
      workSheet.addRow([
        data.title,
        data.picOne,
        data.picTwo,
        data.UIC,
        data.description,
        data.crNumber,
        statusMap.get(data.status),
        timelineMap.get(data.timeline),
      ])
    });
    
    workBook.xlsx.writeFile(`./server_data/data.xlsx`)
    return {
      title: 'data',
      ...(await this.FileSystemHelper.readFile('/server_data/data.xlsx'))
    }
  }
}

export default DnmService;
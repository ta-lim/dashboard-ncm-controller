import DnmModel from "../../models/Dnm.model.js";

class DnmService {
  constructor(server){
    this.server = server;

    this.DnmModel = new DnmModel(this.server).table;
  }

  async createData(data) { 
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

  async updateData(data, id) {
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
    
    const onProgress = getAnalyze.filter(item => ['1', '2', '3', '4', '5'].includes(item.status));
    const pending = getAnalyze.filter(item => ['7'].includes(item.status));
    const done = getAnalyze.filter(item => ['6'].includes(item.status));

    const onProgressSum = onProgress.reduce((total, item) => total + item.count, 0);

    const summary = {
      "onProgress": onProgressSum,
      "pending": pending.length > 0 ? pending[0].count  : 0,
      "done": done.length > 0 ? done[0].count : 0,
      "total": getAnalyze.reduce((total, item) => total + item.count, 0),
    }
    return summary
  }
}

export default DnmService;
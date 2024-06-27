import KPIRekonModel from "../../models/KpiRekon.model.js";
import KPIRetailModel from "../../models/KpiRetail.model.js";
import KPIKasATMModel from "../../models/KpiKasAtm.model.js";
import KPIPaguKasModel from "../../models/KpiPaguKas.model.js";
import KPIWholesaleModel from "../../models/KpiWholesale.model.js";
import KPIUpTimeMachine from "../../models/KpiUpTimeMachine.model.js";
import KPIHandlingComplain from "../../models/KpiHandlingComplain.model.js";
import KPIDisputeResolution from "../../models/KpiDisputeResolution.model.js";
import KPIEdcImplementation from "../../models/KpiEdcImplementation.model.js";
import KPIEdcAvailability from "../../models/KpiEdcAvailability.model.js";

import MasterdataCategoryMachine from "../../models/MasterdataCategoryMesin.js";
import MasterdataWilayahOps from "../../models/MasterdataCategoryWilayahOps.model.js";
import MasterdataCategoryTrxDefect from "../../models/MasterdataCategoryTrxDefect.js";
import MasterdataCategoryJaringan from "../../models/MasterdataCategoryJaringan.model.js";
import MasterdataCategoryOpsRetail from "../../models/MasterdataCategoryOpsRetail.model.js";
// import { sequelize } from "sequelize";

class KPIService {
  constructor(server) {
    this.server = server;

    this.KPIRekonModel = new KPIRekonModel(this.server).table;
    this.KPIRetailModel = new KPIRetailModel(this.server).table;
    this.KPIKasATMModel = new KPIKasATMModel(this.server).table;
    this.KPIPaguKasModel = new KPIPaguKasModel(this.server).table;
    this.KPIWholesaleModel = new KPIWholesaleModel(this.server).table;
    this.KPIUpTimeMachineModel = new KPIUpTimeMachine(this.server).table;
    this.KPIHandlingComplainModel= new KPIHandlingComplain(this.server).table;
    this.KPIDisputeResolutionModel = new KPIDisputeResolution(this.server).table;
    this.KPIEdcAvailabilityModel = new KPIEdcAvailability(this.server).table;
    this.KPIEdcImplementationModel = new KPIEdcImplementation(this.server).table;

    this.MasterdataWilayahOps = new MasterdataWilayahOps(this.server).table;
    this.MasterdataCategoryJaringan = new MasterdataCategoryJaringan(this.server).table;
    this.MasterdataCategoryTrxDefect = new MasterdataCategoryTrxDefect(this.server).table;
    this.MasterdataCategoryOpsRetail = new MasterdataCategoryOpsRetail(this.server).table;
    this.MasterdataCategoryMachine = new MasterdataCategoryMachine(this.server).table;

    // this.KPI_MODELS = {
    //   3: this.KPIPaguKasModel,
    //   4: this.KPIKasATMModel,
    //   5: this.KPIUpTimeMachine
    //   // Add all your KPI models here
    // };
    this.KPIModelsSettlement = {
      0: this.KPIRekonModel,
      1: this.KPIRetailModel,
      2: this.KPIWholesaleModel,
    };
    this.KPIModelsATMCRM = {
      0: this.KPIPaguKasModel,
      1: this.KPIKasATMModel,
      2: this.KPIUpTimeMachineModel,
    };
    this.KPIModelsEDC = {
      0: this.KPIEdcAvailabilityModel,
      1: this.KPIEdcImplementationModel,
    };
    this.KPIModelsComplainHandling = {
      0: this.KPIHandlingComplainModel,
      1: this.KPIDisputeResolutionModel,
    };
    this.CATEGORY_MODELS = {
      0: this.MasterdataCategoryJaringan,
      1: this.MasterdataCategoryOpsRetail,
      2: this.MasterdataCategoryTrxDefect,
      3: this.MasterdataWilayahOps,
      4: this.MasterdataCategoryMachine
    };
    this.KPI_CATEGORY_FIELDS = {
      0: "categoryJaringan",
      1: "categoryOpsRetail",
      2: "categoryTrxDefect",
      3: "categoryWilayahOperasional",
    };
  }
  async checkData(date, kpi, category) {
    let KPIModel;

    // Determine the KPIModel based on the kpi parameter
    switch (kpi) {
        case '1':
            KPIModel = this.KPIModelsSettlement[category];
            break;
        case '2':
            KPIModel = this.KPIModelsATMCRM[category];
            break;
        case '3':
            KPIModel = this.KPIModelsEDC[category];
            break;
        case '4':
            KPIModel = this.KPIModelsComplainHandling[category];
            break;
        default:
            throw new Error('Invalid KPI type');
    }

    // Ensure KPIModel is valid
    console.log(KPIModel);
    if (!KPIModel) {
        // throw new Error('Invalid category for the given KPI type');
        return -1
    }

    // Fetch data from the determined KPIModel
    const getData = await KPIModel.findAll({
      attributes: {
        exclude: ["id", "dateTrx", "createdAt", "updatedAt"],
      },
        where: {
          dateTrx: date,
        },
    });
    console.log(getData)
    return getData;
}

  // async checkData(date, kpi, category) {
  //   // console.log(date)
  //   let KPIModel;
  //   switch(kpi) {
  //       case '1':
  //           KPIModel = this.KPIModelsSettlement[category];
  //           break;
  //       case '2':
  //           KPIModel = this.KPIModelsATMCRM[category];
  //           break;
  //       case '3':
  //           KPIModel = this.KPIModelsEDC[category];
  //           break;
  //       case '4':
  //           KPIModel = this.KPIModelsComplainHandling[category];
  //           break;
  //   }
    
  //   // const KPIModel = this.KPIModelsSettlement[category];
  //   const getData = await KPIModel.findAll({
  //     where: {
  //       dateTrx :date,
  //       // ...(subCategory && { subCategory }),
  //     },
  //   })
  //   return getData;
  // }

  async getDataRekon(kpi) {
    const KPIModel = this.KPIModelsSettlement[kpi];
    const categoryModel = this.CATEGORY_MODELS[kpi];
    const categoryField = this.KPI_CATEGORY_FIELDS[kpi];
    const getMasterdataCategory = await categoryModel.findAll({});
    const getDataKPI = await KPIModel.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    const categories = [...new Set(getDataKPI.map((d) => d[categoryField]))];
    const periods = [...new Set(getDataKPI.map((d) => d.dateTrx))];

    const datasets = categories.map((category) => {
      return {
        name: `Category ${category}`,
        data: {
          itemTrx: periods.map((date) => {
            const item = getDataKPI.find(
              (d) => d.dateTrx === date && d[categoryField] === category
            );
            return item ? parseInt(item.itemTrx) : 0;
          }),
          percentageSLA: periods.map((date) => {
            const item = getDataKPI.find(
              (d) => d.dateTrx === date && d[categoryField] === category
            );
            if (item) {
              const itemTrx = parseInt(item.itemTrx);
              const itemTrxSla = parseInt(item.itemTrxSLA);
              return itemTrx !== 0 ? (itemTrxSla / itemTrx) * 100 : 0;
            }
            return 0;
          }),
        },
        // borderColor: getRandomColor(), // Function to generate a random color for each series
        // fill: false
      };
    });
    return { periods, datasets, category: getMasterdataCategory };
    // return getDataKPI;
  }
  async getDataAtm(kpi) {
    const KPIModel = this.KPIModelsATMCRM[kpi];
    const categoryModel = this.CATEGORY_MODELS[3];
    const categoryField = 'categoryWilayahOperasional'
    const getMasterdataCategory = await categoryModel.findAll({
      // attributes: ["id",['categoryWilayahOperasional', 'category']]
    });

    const fieldKPI = {
      0: ["realisasi", "paguKas"],
      1: ["cashRetrieval", "cashFilling"],
      2: ["upTimeATM", "upTimeCRM"],
    };

    const getDataKPI = await KPIModel.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["dateTrx", "ASC"],
              ],
    });
    const categories = [...new Set(getDataKPI.map((d) => d[categoryField]))];
    const periods = [...new Set(getDataKPI.map((d) => d.dateTrx))];

    function calculateAvgCash(data, realisasiKey, paguKasKey) {
      // console.log(data)
      return data.map((item) => {
        const realisasi = item[realisasiKey];
        const paguKas = item[paguKasKey];
        const avgMonth = ((realisasi / paguKas) * 100).toFixed(2); // calculate the percentage

        return avgMonth;
      });
    }

    function calculateYTDAverages(data) {
      let ytdAverages = [];
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        sum += parseFloat(data[i]);
        let average = sum / (i + 1); // Calculate average up to current month
        ytdAverages.push(average.toFixed(2)); // Push the average to the array
      }
      return ytdAverages;
    }
    // this.calculateAverageUptime(getDataKPI) :
    const avgCash = calculateAvgCash(
      getDataKPI,
      fieldKPI[kpi][0],
      fieldKPI[kpi][1]
    );
    const ytdAverages = calculateYTDAverages(avgCash);
    
    const datasets = categories.map((category) => {
      return {
        name: `Category ${category}`,
        data: {
          series1: periods.map((date) => {
            const item = getDataKPI.find(
              (d) => d.dateTrx === date && d[categoryField] === category
            )
            // console.log(item)
            if(item) {
              // const realisasi = item[realisasiKey];
              // const paguKas = item[paguKasKey];
              // const avgMonth = ((realisasi / paguKas) * 100).toFixed(2); // calculate the percentage

              return item['upTimeATM'];
              
            }
            return 0;
          }),
          series2: periods.map((date) => {
            const item = getDataKPI.find(
              (d) => d.dateTrx === date && d[categoryField] === category
            )
            // console.log(item)
            if(item) {
              // const realisasi = item[realisasiKey];
              // const paguKas = item[paguKasKey];
              // const avgMonth = ((realisasi / paguKas) * 100).toFixed(2); // calculate the percentage

              return item['upTimeCRM'];
              
            }
            return 0;
          }),
        }
      }
    })


    if (getDataKPI) 
      console.log(kpi)
      if(kpi === "2") return {periods, datasets, category: getMasterdataCategory}

      return { periods, avgCash, ytdAverages};
  }
  async getDataHandlingComplain(kpi) {
    const KPIModel = this.KPIModelsComplainHandling[kpi];
    const getMasterdataCategory = await this.MasterdataCategoryMachine.findAll({});
    const categoryField = "categoryMachine";


    const fieldKPI = {
      0: ["realisasi", "paguKas"],
      1: ["cashRetrieval", "cashFilling"],
      // 2:['upTimeATM', 'upTimeCRM']
    };

    const getDataKPI = await KPIModel.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["dateTrx", "ASC"]],
    });

    const categories = [...new Set(getDataKPI.map((d) => d[categoryField]))];
    const periods = [...new Set(getDataKPI.map((d) => d.dateTrx))];

    const datasets = categories.map((category) => {
      console.log(category)
      return {
        name: {category},
        data: {
          series1: periods.map((date) => {
            const item = getDataKPI.find(
              (d) => d.dateTrx === date && d[categoryField] === category
            );
            return item ? parseInt(item.itemTrx) : 0;
          }),
          series2: periods.map((date) => {
            const item = getDataKPI.find(
              (d) => d.dateTrx === date && d[categoryField] === category
            );
            if (item) {
              const itemTrx = parseInt(item.itemTrx);
              const itemTrxSla = parseInt(item.itemTrxSLA);
              return itemTrx !== 0 ? ((itemTrxSla / itemTrx) * 100).toFixed(2) : 0;
            }
            return 0;
          }),
        },
      };
    });

    if (getDataKPI) {
      return {
          periods,
          datasets,
          ...(kpi === "0" && { category: getMasterdataCategory })
      };
  }
  
  }
  async getDataEdc(kpi) {
    const KPIModel = this.KPIModelsEDC[kpi];
    const getMasterdataCategory = await this.MasterdataWilayahOps.findAll({});
    const categoryField = "categoryWilayahOperasional";


    const fieldKPI = {
      0: ["totalActiveTID", "totalTID"],
      1: ["itemEdc", "targetItemEdc"],
      // 2:['upTimeATM', 'upTimeCRM']
    };

    const getDataKPI = await KPIModel.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["dateTrx", "ASC"]],
    });

    const groupData = this.groupAndFlattenData(getDataKPI, "dateTrx", "itemEdc" )
    const categories = [...new Set(getDataKPI.map((d) => d[categoryField]))];
    const periods = [...new Set(getDataKPI.map((d) => d.dateTrx))];
    // console.log(categories)
    const datasets = categories.map((category) => {
      // console.log(category)
      return {
        name: {category},
        data: {
          series1: periods.map((date) => {
            const item = getDataKPI.find(
              (d) => d.dateTrx === date && d[categoryField] === category
            );
            return item ? parseInt(item[fieldKPI[kpi][0]]) : 0;
          }),
          series2: periods.map((date) => {
            const item = getDataKPI.find(
              (d) => d.dateTrx === date && d[categoryField] === category
            );
            if (item) {
              // console.log(item)
              const totalActiveTID = parseInt(item[fieldKPI[kpi][0]]);
              const totalTID = parseInt(item[fieldKPI[kpi][1]]);
              return totalActiveTID !== 0 ? ((totalActiveTID / totalTID) * 100).toFixed(2) : 0;
            }
            return 0;
          }),
        },
      };
    });

    if (getDataKPI) {
      return {
          periods,
          // getDataKPI,
          datasets,
          groupData
          // ...(kpi === "1" && { category: getMasterdataCategory })
      };
  }
  
  }

  // async getDataAtm(kpi) {
  //   const getDataKPI = await this.KPIPaguKasModel.findAll({
  //     attributes: {
  //       exclude: ["createdAt", "updatedAt"],
  //     },
  //     order: [['dateTrx', 'ASC']]
  //   });

  //   // Extract unique periods (months)
  //   const periods = [...new Set(getDataKPI.map((d) => d.dateTrx.slice(0, 7)))];

  //   // Initialize a dictionary to store totals for each period
  //   const periodData = periods.reduce((acc, period) => {
  //     acc[period] = { totalRealisasi: 0, totalPaguKas: 0, count: 0 };
  //     return acc;
  //   }, {});

  //   // Calculate the totals for each entry and accumulate by period
  //   getDataKPI.forEach(item => {
  //     const { dateTrx, realisasi, paguKas } = item;
  //     const period = dateTrx.slice(0, 7); // Get the year-month part of the date

  //     // Accumulate the data for each period
  //     if (periodData[period]) {
  //       periodData[period].totalRealisasi += realisasi;
  //       periodData[period].totalPaguKas += paguKas;
  //       periodData[period].count += 1;
  //     }
  //   });

  //   // Calculate the YTD averages
  //   let cumulativeRealisasi = 0;
  //   let cumulativePaguKas = 0;
  //   const avgCash = periods.map(period => {
  //     const { totalRealisasi, totalPaguKas } = periodData[period];
  //     cumulativeRealisasi += totalRealisasi;
  //     cumulativePaguKas += totalPaguKas;
  //     return ((cumulativeRealisasi / cumulativePaguKas) * 100).toFixed(2);
  //   });

  //   // Return the structured data
  //   return { periods, avgCash };
  // }

  async createDataRekon(data, kpi) {
    const KPIModel = this.KPIModelsSettlement[kpi];
    const checkData = await KPIModel.findAll({
      where: {
        dateTrx: data[0].dateTrx
      }
    })
    let createDataKPI;
    if (!checkData || checkData.length === 0) {
      createDataKPI = await KPIModel.bulkCreate(data);

    }else {
      try {
        await this.server.model.db.transaction(async t => {
          // Delete existing data within the transaction
          await KPIModel.destroy({
            where: {
              dateTrx: data[0].dateTrx
            }
          }, { transaction: t });
          
          createDataKPI = await KPIModel.bulkCreate(data, {transaction: t});
        });
      } catch (err) {
        // Log and handle the error appropriately
        console.error(`Error in transaction: ${err.message}`);
        throw err;
      }
    }
    return createDataKPI ? 1 : -1;
  }

  async createDataAtm(data, kpi) {
    const KPIModel = this.KPIModelsATMCRM[kpi];
    
    let createDataKpi;
    if (kpi === "0" || kpi === "1") {
        // Use bulkCreate for KPI 1
        createDataKpi = await KPIModel.create(data);
    } else if (kpi === "2") {
        // Use create for KPI 2
        createDataKpi = await KPIModel.bulkCreate(data);
    }

    if (createDataKpi) return 1;
    return 0; // return 0 or some other value if creation failed
}


async createDataHandlingComplain(data, kpi) {
  const KPIModel = this.KPIModelsComplainHandling[kpi];
  // console.log(this.server.model.db)
  // Check if data for the given dateTrx already exists
  const checkData = await KPIModel.findAll({
    where: {
      dateTrx: data[0].dateTrx
    }
  });

  let createDataKPI;

  if (!checkData || checkData.length === 0) {
    // No existing data, create new data based on kpi
    // console.log(kpi)
    switch (kpi) {
      case "0":
        createDataKPI = await KPIModel.bulkCreate(data);
        console.log(kpi)

        break;
      case "1":
        createDataKPI = await KPIModel.create(data);
        break;
      default:
        throw new Error(`Invalid KPI value: ${kpi}`);
    }
  } else {
    // Data exists, update with transaction
    try {
      await this.server.model.db.transaction(async t => {
        // Delete existing data within the transaction
        await KPIModel.destroy({
          where: {
            dateTrx: data[0].dateTrx
          }
        }, { transaction: t });

        // Create new data within the transaction
        switch (kpi) {
          case "0":
            createDataKPI = await KPIModel.bulkCreate(data, { transaction: t });
            break;
          case "1":
            createDataKPI = await KPIModel.create(data, { transaction: t });
            break;
          default:
            throw new Error(`Invalid KPI value: ${kpi}`);
        }
      });
    } catch (err) {
      // Log and handle the error appropriately
      console.error(`Error in transaction: ${err.message}`);
      throw err;
    }
  }

  return createDataKPI ? 1 : 0;
}


  async createDataEDC(data, kpi) {
    const KPIModel = this.KPIModelsEDC[kpi];

    let createDataKPI;
    switch (kpi) {
      case "0":
        createDataKPI = await KPIModel.create(data);
        break;
      case "1":
        createDataKPI = await KPIModel.bulkCreate(data);
        break;
    }

    if (createDataKPI) return 1;
  }

  async createDataWholesale() {
    const cretaDataKpi = await this.KPIRetailModel.create({
      dateTrx: data.dateTrx,
      itemTrx: data.itemTrx,
      itemTrxSLA: data.itemTrxSLA,
      categoryOperasionalRitel: data.categoryOperasionalRitel,
    });
  }

  async getMasterdataCategory(kpi) {
    if (!["0", "1", "2", "3", "4"].includes(kpi)) {
      return -1;
    }
    console.log(kpi);
    const CategoryModel = this.CATEGORY_MODELS[kpi];
    // console.log(CategoryModel)
    if (CategoryModel) {
      const getMasterdataCategoryModel = await CategoryModel.findAll({limit: 17});
      // console.log(getMasterdataCategoryModel)
      if (getMasterdataCategoryModel) return getMasterdataCategoryModel;
    }
  }

  async getAnalyze() {
    // Fetch data from each model concurrently
    const [rekonData, retailData, wholesaleData] = await Promise.all([
      this.fetchModelData(this.KPIRekonModel),
      this.fetchModelData(this.KPIRetailModel),
      this.fetchModelData(this.KPIWholesaleModel),
    ]);

    // Grouping and summing the data
    const groupedRekonData = this.groupAndFlattenData(rekonData, "dateTrx", "itemTrx", "itemTrxSLA")
    const groupedRetailData = this.groupAndFlattenData(retailData, "dateTrx", "itemTrx", "itemTrxSLA")
    const groupedWholesaleData = this.groupAndFlattenData(wholesaleData, "dateTrx", "itemTrx", "itemTrxSLA")

    // Return the grouped and summed data for each model with percentage
    return [
      {
        name: "rekon",
        data: {
          dateTrx: groupedRekonData.dates,
          totalItemTrx: groupedRekonData.itemTrxValues,
          percentageSLA: groupedRekonData.percentageTrxValues,
        },
      },
      {
        name: "retail",
        data: {
          dateTrx: groupedRetailData.dates,
          totalItemTrx: groupedRetailData.itemTrxValues,
          percentageSLA: groupedRetailData.percentageTrxValues,
        },
      },
      {
        name: "wholesale",
        data: {
          dateTrx: groupedWholesaleData.dates,
          totalItemTrx: groupedWholesaleData.itemTrxValues,
          percentageSLA: groupedWholesaleData.percentageTrxValues,
        },
      },
    ];
  }

  async fetchModelData(model) {
    return model.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["dateTrx", "ASC"]],
    });
  }

  // flattenData(data) {
  //   const dates = [];
  //   const itemTrxValues = [];
  //   const itemTrxSLAValues = [];
  //   const percentageTrxValues = [];

  //   for (const date in data) {
  //     dates.push(date);
  //     itemTrxValues.push(data[date].itemTrx);
  //     itemTrxSLAValues.push(data[date].itemTrxSLA);
  //     percentageTrxValues.push(data[date].percentageTrx);
  //   }

  //   return {
  //     dates: dates,
  //     itemTrxValues: itemTrxValues,
  //     itemTrxSLAValues: itemTrxSLAValues,
  //     percentageTrxValues: percentageTrxValues,
  //   };
  // }

  // groupAndSumData(data, keyCol, sumCol1, sumCol2) {
  //   const result = data.reduce((acc, item) => {
  //     const key = item[keyCol];
  //     const sum1 = parseInt(item[sumCol1], 10);
  //     const sum2 = parseInt(item[sumCol2], 10);

  //     console.log(sum1, sum2);
  //     if (!acc[key]) {
  //       acc[key] = { [sumCol1]: 0, [sumCol2]: 0 };
  //     }
  //     acc[key][sumCol1] += sum1;
  //     acc[key][sumCol2] += sum2;

  //     return acc;
  //   }, {});

  //   // Calculate percentage for each key
  //   for (const key in result) {
  //     const total = result[key][sumCol2]; // Total is sumCol2
  //     result[key].percentageTrx = (result[key][sumCol1] / total) * 100;
  //   }

  //   return result;
  // }

  groupAndFlattenData(data, keyCol, sumCol1, sumCol2) {
    // Group and sum data
    const groupedData = data.reduce((acc, item) => {
      const key = item[keyCol];
      const sum1 = parseInt(item[sumCol1], 10);
      const sum2 = parseInt(item[sumCol2], 10);

      if (!acc[key]) {
        acc[key] = { [sumCol1]: 0, [sumCol2]: 0 };
      }
      acc[key][sumCol1] += sum1;
      acc[key][sumCol2] += sum2;

      return acc;
    }, {});

    // Calculate percentage for each key
    for (const key in groupedData) {
      const total = groupedData[key][sumCol2]; // Total is sumCol2
      groupedData[key].percentageTrx =
        (groupedData[key][sumCol1] / total) * 100;
    }

    // Flatten data
    const dates = [];
    const sumCol1Values = [];
    const sumCol2Values = [];
    const percentageTrxValues = [];

    for (const date in groupedData) {
      dates.push(date);
      sumCol1Values.push(groupedData[date][sumCol1]);
      sumCol2Values.push(groupedData[date][sumCol2]);
      percentageTrxValues.push(groupedData[date].percentageTrx);
    }

    return {
      dates: dates,
      [sumCol1 + "Values"]: sumCol1Values,
      [sumCol2 + "Values"]: sumCol2Values,
      percentageTrxValues: percentageTrxValues,
    };
  }

  parseUptime(uptimeStr) {
    return uptimeStr ? parseFloat(uptimeStr.replace(",", ".")) : null;
  }

  calculateAverageUptime(data) {
    const result = {};

    data.forEach((entry) => {
      const dateTrx = entry.dateTrx;
      const period = dateTrx.substring(0, 7); // Get YYYY-MM
      const category = entry.categoryWilayahOperasional;
      const uptimeATM = this.parseUptime(entry.upTimeATM);
      const uptimeCRM = this.parseUptime(entry.upTimeCRM);

      if (!result[category]) {
        result[category] = {};
      }
      if (!result[category][period]) {
        result[category][period] = {
          sumATM: 0,
          countATM: 0,
          sumCRM: 0,
          countCRM: 0,
        };
      }

      if (uptimeATM !== null) {
        result[category][period].sumATM += uptimeATM;
        result[category][period].countATM += 1;
      }

      if (uptimeCRM !== null) {
        result[category][period].sumCRM += uptimeCRM;
        result[category][period].countCRM += 1;
      }
    });

    const averages = {};

    for (const category in result) {
      if (!averages[category]) {
        averages[category] = {};
      }
      for (const period in result[category]) {
        const values = result[category][period];
        averages[category][period] = {
          avgATM: values.countATM
            ? (values.sumATM / values.countATM).toFixed(2)
            : 0,
          avgCRM: values.countCRM
            ? (values.sumCRM / values.countCRM).toFixed(2)
            : 0,
        };
      }
    }

    return averages;
  }
}

export default KPIService;

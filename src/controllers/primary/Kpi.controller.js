import KPIService from "../../services/primary/Kpi.service.js";
import KPIValidator from "../../validators/primary/Kpi.validator.js";

// Helper
import ResponsePreset from "../../helpers/ResponsePreset.helper.js";

// Library
import Ajv from 'ajv';

class KPIController {

  constructor(server) {
    this.server = server;

    this.ResponsePreset = new ResponsePreset();

    this.Ajv = new Ajv();
    this.KPIValidator = new KPIValidator();

    this.KPIService = new KPIService(this.server)
  }

  async checkData(req, res){
    const {date , kpi,  category} = req.query
    const { role } = req.middlewares.authorization.data;
    console.log(role)
    if (role !== "super admin" && role !== "admin" ) return res.status(401).json(this.ResponsePreset.resErr(
      401,
      'Request Unauthorized',
      'token',
      { code: -1 }
    ));

    
    if(!date || !["1", "2", "3", "4"].includes(kpi) || !["0", "1", "2"].includes(category)) return res.status(400).json(this.ResponsePreset.resErr(
      404,
      "Date or KPI is not valid",
      'service',
      { code: -1 }
    ))
    const checkDataSrv = await this.KPIService.checkData(date, kpi, category);
    
    if(checkDataSrv)return res.status(200).json(this.ResponsePreset.resOK('OK', checkDataSrv));
  }

  async getAllDataRekon(req, res){
    const { category } = req.query
    if ( !["0", "1", "2"].includes(category)) return res.status(400).json(this.ResponsePreset.resErr(
      404,
      "Not found",
      'service',
      -1
    ))

    const getAllData = await this.KPIService.getDataRekon(category);

    return res.status(200).json(this.ResponsePreset.resOK('OK', getAllData));
  }

  async getAllDataAtm(req, res){
    const { category } = req.query
    if ( !['0','1','2'].includes(category)) return res.status(400).json(this.ResponsePreset.resErr(
      404,
      "Not found",
      'service',
      -1
    ))

    const getAllData = await this.KPIService.getDataAtm(category);

    return res.status(200).json(this.ResponsePreset.resOK('OK', getAllData));
  }
  async getAllDataHandlingComplain(req, res){
    const { category } = req.query
    if ( !["0","1"].includes(category)) return res.status(400).json(this.ResponsePreset.resErr(
      404,
      "Not found",
      'service',
      -1
    ))

    const getAllData = await this.KPIService.getDataHandlingComplain(category);

    return res.status(200).json(this.ResponsePreset.resOK('OK', getAllData));
  }
  async getAllDataEdc(req, res){

    const { category } = req.query
    if ( !["0","1"].includes(category)) return res.status(400).json(this.ResponsePreset.resErr(
      404,
      "Not found",
      'service',
      -1
    ))

    const getAllData = await this.KPIService.getDataEdc(category);

    return res.status(200).json(this.ResponsePreset.resOK('OK', getAllData));
  }


  async getAllDataRetail(req, res){
    // const { category, subCategory } = req.query
    // if ( !category) return res.status(400).json(this.ResponsePreset.resErr(
    //   404,
    //   "Not found",
    //   'service',
    //   -1
    // ))
    const getAllData = await this.KPIService.getDataRetail();

    return res.status(200).json(this.ResponsePreset.resOK('OK', getAllData));
  }

  async getMasterdataCategory(req, res){
    const { kpi } = req.query
    console.log(kpi)
    const getMasterdataCategory = await this.KPIService.getMasterdataCategory(kpi);

    if(getMasterdataCategory === -1) return res.status(404).json(this.ResponsePreset.resErr(
      404,
      'Not Found, Category not exis',
      'service',
      { code: -1 }

    ))
    if(getMasterdataCategory) return res.status(200).json(this.ResponsePreset.resOK('OK', getMasterdataCategory))
  }

  async createDataRekon(req, res){
    const   schemeCreateDataValidate = this.Ajv.compile(this.KPIValidator.createDataScheme);

    if(!schemeCreateDataValidate(req.body)) return res.status(400).json(this.ResponsePreset.resErr(
      400,
      schemeCreateDataValidate.errors[0].message,
      'validator',
      schemeCreateDataValidate.errors[0]
    ));
    const { kpi } = req.query;
    const createDataSrv = await this.KPIService.createDataRekon(req.body, kpi);
    if(createDataSrv) return res.status(200).json(this.ResponsePreset.resOK("OK",null));

  }

  async createDataATM(req, res){
    let schemeCreateDataValidate;
    const { kpi } = req.query;


    switch (kpi) {
      case '0':
        schemeCreateDataValidate = this.Ajv.compile(this.KPIValidator.createDataPaguKasScheme);
        break;
      case '1':
        schemeCreateDataValidate = this.Ajv.compile(this.KPIValidator.createDataKasATMScheme);
        break;
      case '2':
        schemeCreateDataValidate = this.Ajv.compile(this.KPIValidator.createDataUptimeMachineScheme);
        break;
      default:
        return res.status(400).json(this.ResponsePreset.resErr(
          400,
          'Invalid scheme type',
          'validator',
          { message: 'Invalid scheme type' }
        ));
    }
    if(!schemeCreateDataValidate(req.body)) return res.status(400).json(this.ResponsePreset.resErr(
      400,
      schemeCreateDataValidate.errors[0].message,
      'validator',
      schemeCreateDataValidate.errors[0]
    ));
    const createDataSrv = await this.KPIService.createDataAtm(req.body, kpi);
    if(createDataSrv) return res.status(200).json(this.ResponsePreset.resOK("OK",null));
  }

  async createDataHandlingComplain(req, res){
    
    let schemeCreateDataValidate;
    const { kpi } = req.query;


    switch (kpi) {
      case '0':
        schemeCreateDataValidate = this.Ajv.compile(this.KPIValidator.createDataHandlingComplain);
        break;
      case '1':
        schemeCreateDataValidate = this.Ajv.compile(this.KPIValidator.createDataDisputeResolution);
        break;
      // case '2':
      //   schemeCreateDataValidate = this.Ajv.compile(this.KPIValidator.createDataUptimeMachineScheme);
      //   break;
      default:
        return res.status(400).json(this.ResponsePreset.resErr(
          400,
          'Invalid scheme type',
          'validator',
          { message: 'Invalid scheme type' }
        ));
    }
    if(!schemeCreateDataValidate(req.body)) return res.status(400).json(this.ResponsePreset.resErr(
      400,
      schemeCreateDataValidate.errors[0].message,
      'validator',
      schemeCreateDataValidate.errors[0]
    ));
    const createDataSrv = await this.KPIService.createDataHandlingComplain(req.body, kpi);
    if(createDataSrv) return res.status(200).json(this.ResponsePreset.resOK("OK",null));
  }

  async createDataEDC(req, res){
    
    let schemeCreateDataValidate;
    const { kpi } = req.query;


    switch (kpi) {
      case '0':
        schemeCreateDataValidate = this.Ajv.compile(this.KPIValidator.createDataEDCAvailibility);
        break;
      case '1':
        schemeCreateDataValidate = this.Ajv.compile(this.KPIValidator.createDataEDCImplementaion);
        break;
      // case '2':
      //   schemeCreateDataValidate = this.Ajv.compile(this.KPIValidator.createDataUptimeMachineScheme);
      //   break;
      default:
        return res.status(400).json(this.ResponsePreset.resErr(
          400,
          'Invalid scheme type',
          'validator',
          { message: 'Invalid scheme type' }
        ));
    }
    if(!schemeCreateDataValidate(req.body)) return res.status(400).json(this.ResponsePreset.resErr(
      400,
      schemeCreateDataValidate.errors[0].message,
      'validator',
      schemeCreateDataValidate.errors[0]
    ));
    const createDataSrv = await this.KPIService.createDataEDC(req.body, kpi);
    if(createDataSrv) return res.status(200).json(this.ResponsePreset.resOK("OK",null));
  }

  async getAnalyze(req, res){
    // const { category,subCategory } = req.query
    const getAnalyzeSrv = await this.KPIService.getAnalyze();

    if(getAnalyzeSrv) return res.status(200).json(this.ResponsePreset.resOK('OK', getAnalyzeSrv))

  }
}

export default KPIController
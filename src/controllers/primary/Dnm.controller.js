import DnmService from "../../services/primary/Dnm.service.js";
import DnmValidator from "../../validators/primary/Dnm.validator.js";

// Helper
import ResponsePreset from "../../helpers/ResponsePreset.helper.js";

// Library
import Ajv from 'ajv';

class DnmController {
  constructor(server) {
    this.server = server;

    // Init Service
    this.DnmService = new DnmService(this.server);

    // Init Helper
    this.ResponsePreset = new ResponsePreset();

    this.Ajv = new Ajv();
    this.DnmValidator = new DnmValidator();
  }

  async createData(req, res){
    const schemeValidate = this.Ajv.compile(this.DnmValidator.createDataScheme);

    if(!schemeValidate(req.body)) return res.status(400).json(this.ResponsePreset.resErr(
      400,
      schemeValidate.errors[0].message,
      'validator',
      schemeValidate.errors[0]
    ));
    
    const createDataSrv = await this.DnmService.createData(req.body);
    return res.status(200).json(this.ResponsePreset.resOK("OK", null))
  }

  async getAllData(req, res){
    const { category, subCategory } = req.query
    
    const getAllData = await this.DnmService.getAllData(category, subCategory);

    return res.status(200).json(this.ResponsePreset.resOK('OK', getAllData));
  }

  async getDetail(req, res){
    const { id } = req.params
    const getDetail = await this.DnmService.getDetail(id);

    return res.status(200).json(this.ResponsePreset.resOK('OK', getDetail));

  }

  async updateData(req, res){
    const schemeValidate = this.Ajv.compile(this.DnmValidator.updateDataScheme);

    if(!schemeValidate(req.body)) return res.status(400).json(this.ResponsePreset.resErr(
      400,
      schemeValidate.errors[0].message,
      'validator',
      schemeValidate.errors[0]
    ));
    const updateDataSrv = await this.DnmService.updateData(req.body);
    return res.status(200).json(this.ResponsePreset.resOK("OK", null))
  }

  async deleteData(req, res){
    const { id } = req.params

    const deleteDataSrv = await this.DnmService.deleteData(id);

    return res.status(200).json(this.ResponsePreset.resOK("OK", deleteDataSrv));
  }

  async getAnalyze(req, res){
    const { category,subCategory } = req.query

    const getAnalyzeSrv = await this.DnmService.getAnalyze(category, subCategory);

    return res.status(200).json(this.ResponsePreset.resOK('OK', getAnalyzeSrv))
  }

  async search(req, res){
    const { title } = req.query;

    if(title.length < 3) return res.status(400).json(this.ResponsePreset.resErr(
      400,
      'Bad request, Minimum length search 3 ',
      'service'
    ))
    

    const searchSrv = await this.DnmService.search(title);

    res.status(200).json(this.ResponsePreset.resOK( 'OK', searchSrv ))
  }
}
export default DnmController
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
    if ( !category) return res.status(400).json(this.ResponsePreset.resErr(
      404,
      "Not found",
      'service',
      -1
    ))
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
    if (updateDataSrv) return res.status(200).json(this.ResponsePreset.resOK("OK", null))
    return -1;
  }

  async updateStatus(req, res){
    const schemeValidate = this.Ajv.compile(this.DnmValidator.updateStatusScheme);
    
    if(!schemeValidate(req.body)) return res.status(400).json(this.ResponsePreset.resErr(
      400,
      schemeValidate.errors[0].message,
      'validator',
      schemeValidate.errors[0]
    ));
    const updateStatusSrv = await this.DnmService.updateStatus(req.body);

    if (updateStatusSrv) return res.status(200).json(this.ResponsePreset.resOK("OK", null)) ;
    
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
    const { title, category, subCategory } = req.query;

    if(title.length < 3) return res.status(400).json(this.ResponsePreset.resErr(
      400,
      'Bad request, Minimum length search 3 ',
      'service'
    ))
    

    const searchSrv = await this.DnmService.search(title, category, subCategory);
    
    if (searchSrv === -1) return res.status(400).json({
      message: 'Error required spesific category',
    })
    res.status(200).json(this.ResponsePreset.resOK( 'OK', searchSrv ))
  }

  async downloadData(req, res){
    try{
      const { category } = req.query;
      const downloadDocumentSrv = await this.DnmService.downloadData(category);
  
      res.setHeader('Content-Type', downloadDocumentSrv.mime);
      res.setHeader('Content-Disposition', 'attachment; filename=' + downloadDocumentSrv.title + '.xlsx');
      res.status(200).send(downloadDocumentSrv.file);
    } catch(err) {
      return res.status(500).json({
        status: 500,
        message: 'Server Error',
        err: err.message
      });
    }
  }
  async masterDataFilter(req, res){
    const { category, subCategory } = req.query;

    const masterDataFilterSrv = await this.DnmService.masterDataFilter(category, subCategory);
      
    return res.status(200).json(this.ResponsePreset.resOK("OK", masterDataFilterSrv))

  }
  async filterData(req, res){
  
    if (Object.keys(req.query).length !== 0) {
      const {picOne, status, timeline, UIC, category, subCategory} = req.query
      const filterDataSrv = await this.DnmService.filterData({picOne, status, timeline, UIC, category, subCategory})

      return res.status(200).json(this.ResponsePreset.resOK("OK", filterDataSrv))
      
    }
  }
}
export default DnmController
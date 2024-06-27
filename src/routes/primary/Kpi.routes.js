import Primary from "./Primary.js";
import KPIController from "../../controllers/primary/Kpi.controller.js";

class KPIRoute extends Primary {
  constructor(server) {
    super(server);
    
    this.endpointPrefix = this.endpointPrefix + '/kpi'; // /api/v1/primary/kpi
    // this.DnmController = new DnmController(this.server);
    this.KPIController = new KPIController(this.server);

    this.routes();
  }

  routes() {
    this.API.get(this.endpointPrefix + '/trx-settle', (req, res) => this.KPIController.getAllDataRekon(req,res));
    this.API.get(this.endpointPrefix + '/atm-crm', (req, res) => this.KPIController.getAllDataAtm(req,res));
    this.API.get(this.endpointPrefix + '/handling-complain', (req, res) => this.KPIController.getAllDataHandlingComplain(req,res));
    this.API.get(this.endpointPrefix + '/edc', (req, res) => this.KPIController.getAllDataEdc(req,res));
    this.API.get(this.endpointPrefix + '/analyze', (req, res) => this.KPIController.getAnalyze(req,res));
    // this.API.get(this.endpointPrefix + '/detail/:id', (req, res) => this.DnmController.getDetail(req,res));
    // this.API.get(this.endpointPrefix + '/search', (req, res) => this.DnmController.search(req, res));
    // this.API.get(this.endpointPrefix + '/filter', (req, res) => this.DnmController.filterData(req, res));
    this.API.get(this.endpointPrefix + '/masterdata-category', (req, res) => this.KPIController.getMasterdataCategory(req, res));
    // this.API.get(this.endpointPrefix + '/download', this.AuthorizationMiddleware.check(), (req, res) => this.DnmController.downloadData(req, res));
    this.API.get(this.endpointPrefix + '/check-data', this.AuthorizationMiddleware.check(), (req, res) => this.KPIController.checkData(req, res));

    // this.API

    this.API.post(this.endpointPrefix + '/create-rekon', this.AuthorizationMiddleware.check(), (req, res) => this.KPIController.createDataRekon(req, res));
    this.API.post(this.endpointPrefix + '/create-atm', this.AuthorizationMiddleware.check(), (req, res) => this.KPIController.createDataATM(req, res));
    this.API.post(this.endpointPrefix + '/create-handling-complain', this.AuthorizationMiddleware.check(), (req, res) => this.KPIController.createDataHandlingComplain(req, res));
    this.API.post(this.endpointPrefix + '/create-edc', this.AuthorizationMiddleware.check(), (req, res) => this.KPIController.createDataEDC(req, res));
    // this.API.post(this.endpointPrefix + '/create/retail', (req, res) => this.KPIController.createData(req, res));

    // this.API.put(this.endpointPrefix + '/update', this.AuthorizationMiddleware.check(), (req, res) => this.DnmController.updateData(req, res));
    // this.API.put(this.endpointPrefix + '/update-status', this.AuthorizationMiddleware.check(),  (req, res) => this.DnmController.updateStatus(req, res));

    // this.API.delete(this.endpointPrefix + '/delete/:id', this.AuthorizationMiddleware.check(), (req, res) => this.DnmController.deleteData(req, res))

  }
}

export default KPIRoute;
// this.AuthorizationMiddleware.check(),
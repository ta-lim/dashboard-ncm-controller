import Primary from "./Primary.js";
import DnmController from "../../controllers/primary/Dnm.controller.js";

class DnmRoute extends Primary {
  constructor(server) {
    super(server);
    
    this.endpointPrefix = this.endpointPrefix + '/dnm'; // /api/v1/primary/dnm
    this.DnmController = new DnmController(this.server);

    this.routes();
  }

  routes() {
    this.API.get(this.endpointPrefix, (req, res) => this.DnmController.getAllData(req,res));
    this.API.get(this.endpointPrefix + '/analyze', (req, res) => this.DnmController.getAnalyze(req,res));
    this.API.get(this.endpointPrefix + '/detail/:id', (req, res) => this.DnmController.getDetail(req,res));
    this.API.get(this.endpointPrefix + '/search', (req, res) => this.DnmController.search(req, res));
    this.API.get(this.endpointPrefix + '/download', this.AuthorizationMiddleware.check(), (req, res) => this.DnmController.downloadData(req, res));

    this.API.post(this.endpointPrefix + '/create', this.AuthorizationMiddleware.check(),  (req, res) => this.DnmController.createData(req, res));

    this.API.put(this.endpointPrefix + '/update', this.AuthorizationMiddleware.check(), (req, res) => this.DnmController.updateData(req, res));

    this.API.delete(this.endpointPrefix + '/delete/:id', this.AuthorizationMiddleware.check(), (req, res) => this.DnmController.deleteData(req, res))

  }
}

export default DnmRoute;
// this.AuthorizationMiddleware.check(),
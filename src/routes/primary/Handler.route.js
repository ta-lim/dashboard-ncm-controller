import AuthRoute from "./Auth.route.js";
import DnmRoute from "./Dnm.route.js";
import KPIRoute from "./Kpi.routes.js";

class PrimaryHandler{
  constructor(server) {
    new DnmRoute(server);
    new AuthRoute(server);
    new KPIRoute(server);
  }
}

export default PrimaryHandler;
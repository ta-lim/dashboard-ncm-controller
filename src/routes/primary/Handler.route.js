import AuthRoute from "./Auth.route.js";
import DnmRoute from "./Dnm.route.js";

class PrimaryHandler{
  constructor(server) {
    new DnmRoute(server);
    new AuthRoute(server);
  }
}

export default PrimaryHandler;
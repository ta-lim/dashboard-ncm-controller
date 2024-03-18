import PrimaryHandler from './primary/Handler.route.js';
// import IntegratedHandler from './integrated/Handler.route.js';
// import AdminHandler from './admin/Handler.route.js';

class Handler {
  constructor(server) {
    new PrimaryHandler(server);
    // new IntegratedHandler(server);
    // new AdminHandler(server);
  }
}

export default Handler;

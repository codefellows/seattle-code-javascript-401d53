'use strict';

// note the currying notation / double functions
// essentially the route handler runs the way its runs with the express defined params entered correctly, we can not just add capabilities to that precise mix of params. we can however curry the capabilities to the route handler.  by adding the outer function call.  the inner function call returns a proper route handler, and the outer function call delivers the capability argument to the properly defined route handler
module.exports = (capability) => (req, res, next) => {
  try {
    if(req.user.capabilities.includes(capability)){
      next();
    } else {
      next('Access Denied (acl not capable)');
    }
  } catch(e){
    next('Invalid Login (acl middleware error): message:', e.message);
  }
};

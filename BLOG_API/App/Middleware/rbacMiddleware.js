exports.isAdmin = (req, res, next) => {
  let role = req.authUser.role;
  if (role.includes("admin")) {
    next();
  } else {
    next({
      status: 403,
      msg: "Unauthorized",
    });
  }
};

exports.isAuthor = (req, res, next) => {
  let role = req.authUser.role;
  if (role.includes("author")) {
    next();
  } else {
    next({
      status: 403,
      msg: "Unauthorized",
    });
  }
};

exports.isAdminAuthor = (req, res, next) => {
  let role = req.authUser.role;
  if (role.includes("author") || role.includes("admin")) {
    next();
  } else {
    next({
      status: 403,
      msg: "Unauthorized",
    });
  }
};

exports.isLoggedIn = (req, res, next) => {
  let role = req.authUser.role;
  if (role) {
    next();
  } else {
    next({
      status: 403,
      msg: "Unauthorized",
    });
  }
};

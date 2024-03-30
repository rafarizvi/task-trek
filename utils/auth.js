const withAuth = (req, res, next) => {
    console.log("Entering withAuth middleware.");

   
    if (!req.session.logged_in) {
        console.log("User not logged in. Redirecting to /login");
        res.redirect('/login');
    } else {
        console.log("User logged in. Proceeding to next middleware.");
        next();
    }
};

module.exports = withAuth;

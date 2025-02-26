export function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    console.log("Necessário logar");
    return res.redirect('/login'); 
   
}
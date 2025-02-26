export function isAdmin(res,req,next){
    if(!req.session.user && !req.session){
        res.status(401).send("Acesso negado, faça login primeiro!")
    }
    if(req.session.user.role !== "admin"){
        res.status(401).send("Acesso negado, exclusivo de admins!")
    }else{
        next();
        
    }
}

export function isPremium(res,req,next){
    if(req.session.user && req.session.user.role === "premium"){
        next();
    }else(res.status(403).send("Área premium"))
}
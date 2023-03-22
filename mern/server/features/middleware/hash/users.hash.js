const bcrypt = require('bcrypt');

const hashPassword = async function(req,res,next){

    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword
    }catch{
        res.status(500).send();
        return;
    }

    next();
}

module.exports = {hashPassword};
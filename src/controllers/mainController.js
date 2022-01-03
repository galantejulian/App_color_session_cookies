const { validationResult } = require('express-validator');

const mainController = {
    index: function (req, res) {
        res.render('index')
},
register: function (req, res){
    if (req.cookies.colorRecordado){
        let color = req.cookies.colorRecordado;
        res.render('register', {color})
    }
        else if(req.session){
        let {name, color, email} = req.session;
            res.render('register', {name,color,email})        
        }else{
            res.render('register')
        }
},
registerProcess: (req, res) => {
    const resultValidation = validationResult(req);
    
    if (resultValidation.isEmpty()) {
       req.session.name = req.body.fullName
    req.session.color = req.body.color
    req.session.email = req.body.email
    
    if (req.body.recordarme){
        res.cookie('colorRecordado', req.body.color, {maxAge: 1000*60})
    }


    res.redirect('/')


    }else{
        return res.render('register', {
            errors: resultValidation.mapped(),
            oldData: req.body
        });
    }
},
graciasVisita: (req, res)=>{
if(req.session){
    let {name, color} = req.session;
    res.render('graciasVisita', {name, color})
}else{
    res.redirect("/")
}

},

olvidarColor: (req, res)=>{
    res.clearCookie('colorRecordado')
    req.session.destroy()
    res.redirect('/')
}
}


module.exports = mainController;
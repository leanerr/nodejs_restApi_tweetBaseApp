const controller = require('app/http/controllers/controller');

class landController extends controller {


    async index(req, res) {

        const title = 'اپلیکیشن فیتکس';
        res.render('land/index', {title});
    }
    async home(req, res) {

        const title = ' فیتکس';
        res.render('land/index', {title});
    }


}


module.exports = new landController();
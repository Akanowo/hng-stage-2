const router = require('express').Router();
const { contactValidator } = require('../validators/contact');
const sendMail = require('../_helpers/sendMail');

const routes = () => {

    router.route('/')
    .post((req, res) => {
        const { error, value } = contactValidator.validate(req.body);
        if(error) {
            return res.json(error);
        }

        sendMail(value.email, value.name, value.subject, value.message, (err, response) => {
            if(err) {
                return res.render('error', { err });
            }
            return res.render('success');
        });
        
    });

    return router;
}

module.exports = routes;
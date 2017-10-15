var keystone = require('keystone'),
    Halle = keystone.list('Halle'),
    appRoot = require('app-root-path'),
    TemplateLoader = require(appRoot + '/lib/TemplateLoader'),
    _ = require('underscore');

exports.get = function(req, res) {

    var Templates = new TemplateLoader(), 
        data = {}, 
        random;

    Halle.model.find({}).exec(function(err, result){

        random = Math.floor(Math.random() * result.length);

        data.halle = result[random];

        Templates.Load('/partials/memory', data, function(html) {

            console.log(html);

            res.send(html);

        }); 

    });

    
};

exports.update = function(req, res) {

}

exports.edit = function(req, res) {

    var Templates = new TemplateLoader(), 
        data = {};



    Halle.model.find({ _id: req.params.id }).exec(function(err, result){

        result.getUpdateHandler(req).process(req.body, function(err) {
 
            if (err) return res.apiError('error', err);

            res.send('success');

        });
         

    });

    
};

exports.new = function(req, res) {

    Halle.model.findOne({ _id: req.params.id }).exec((err, result) => {

        result.getUpdateHandler(req).process(req.body, function(err) {
 
            if (err) return res.apiError('error', err);

            res.send('success');

        });

    });

};

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

        random = return Math.random() * result.length;

        data.memory = result[random];

        Templates.Load('/partials/profile', data, function(html) {

            res.send(html);

        }); 

    });

    
};

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

        if (data.halle.captions.length > 0) {
            var caption = Math.floor(Math.random() * data.halle.captions.length);

            data.caption = data.halle.captions[caption];
        }

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

    var Templates = new TemplateLoader();

    var newHalle = new Halle.model({
        name: req.body.image.signature, 
        image: req.body.image
    });

    newHalle.save(function(){

        Templates.Load('partials/modal', req.body.image, (html) => {

            res.send({ html: html });

        });
    });

};

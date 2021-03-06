/**
 * (Halle and Me)
 * Developed by Erica Salling, 2017
 * ==============
 * Index page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class Index
 * @author 
 *
 * ==========
 */
var keystone = require('keystone'),
    Index = keystone.list('Index'),
    Halle = keystone.list('Halle'),
    _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'index';

    view.on('init', function(next) {

        var queryIndex = Index.model.findOne({}, {}, {
            sort: {
                'createdAt': -1
            }
        });
        queryIndex.exec(function(err, resultIndex) {
            if (err) throw err;

            locals.index = resultIndex;

            Halle.model.find({}).exec(function(err, result){

                var randomHalle = Math.floor(Math.random() * result.length);

                locals.halle = result[randomHalle];

                if (locals.halle.captions.length > 0) {
                    var caption = Math.floor(Math.random() * locals.halle.captions.length);

                    locals.caption = locals.halle.captions[caption];
                }
 
                next();
                
            });

        });
    });

    // Render the view
    view.render('index');

};

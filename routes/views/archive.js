/**
 * (Halle and Me)
 * Developed by Erica Salling, 2017
 * ==============
 * Archive page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class Archive
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

            var queryHalle = Halle.model.find({}, {}, {
                sort: {
                    'createdAt': -1
                }
            });

            queryHalle.exec(function(err, result) {
                if (err) throw err;

                locals.Halles = result;
                
                next();

            });

        });
    });

    // Render the view
    view.render('index');

};
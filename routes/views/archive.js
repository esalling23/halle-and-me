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
    Halle = keystone.list('Halle'),
    _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'archive';

    view.on('init', function(next) {

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

    // Render the view
    view.render('archive');

};
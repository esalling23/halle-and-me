/**
 * (Site name here) 
 * 
 * Halle page Model
 * @module Halle
 * @class Halle
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Halle model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Halle = new keystone.List('Halle', 
	{
		label: 'Halles',
		singular: 'Halle',
		autokey: { path: 'key', from: 'name', unique: true },
	});

/**
 * Model Fields
 * @main Halle
 */
Halle.add({

	name: { type: String, label: 'Name', required: true, initial: true },

	captions: { type: Types.TextArray, label: 'Captions/Memories'},
	image: { type: Types.CloudinaryImage, label: 'Image', folder: 'halle-and-me'}
	

});

Halle.schema.pre('save', function(next){

	console.log(this.image);

	// this.name = this.image;
	next();
});


/**
 * Model Registration
 */
Halle.defaultSort = '-createdAt';
Halle.defaultColumns = 'name, updatedAt';
Halle.register();

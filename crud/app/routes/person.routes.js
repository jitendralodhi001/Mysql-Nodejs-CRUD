const { prependListener } = require("../models/db.js");

module.exports = app => {
    const person = require("../controllers/person.controller.js");
    var router = require("express").Router();

    // Inserting a person record 
    router.post('/', person.create);

    // Show specific person details 
    router.get('/:id', person.findOne);

    // update a specific person details 
    router.put('/:id', person.update)

    // Delete a Person with id
    router.delete("/:id", person.delete);



    app.use('/api/person', router);
}
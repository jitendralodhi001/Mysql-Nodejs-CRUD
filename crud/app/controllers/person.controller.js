const Person = require('../models/person.model.js');

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a person
    const person = new Person({
      Id: req.body.Id,
      Name: req.body.Name,
      Mobile: req.body.Mobile,
      Address: req.body.Address
    });
  
    // Save peroson in the database
    Person.create(person, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Company."
        });
      else res.send(data);
    });
  };


  // Find a single person by Id
exports.findOne = (req, res) => {
    Person.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Person with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Person with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };
  

//   updateing a person info by id  
  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    Person.updateById(
      req.params.id,
      new Person(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Person with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Person with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

  // Delete a person with the specified id in the request
exports.delete = (req, res) => {
  Person.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Person with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete person with id " + req.params.id
        });
      }
    } else res.send({ message: `Person was deleted successfully!` });
  });
};

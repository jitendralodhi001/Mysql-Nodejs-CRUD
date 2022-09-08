const sql = require("./db.js");

const Person = function (person) {
    this.Id = person.Id,
        this.Name = person.Name,
        this.Mobile = person.Mobile,
        this.Address = person.Address
}

// crearing new person details 
Person.create = (newPerson, result) => {
    sql.query("INSERT INTO person SET ?", newPerson, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created person: ", { id: res.insertId, ...newPerson });
        result(null, { ...newPerson });
    });
};


// find a person by id  

Person.findById = (id, result) => {
    sql.query(`SELECT * FROM person WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found person: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });
  };


//   updating person info by id 

Person.updateById = (id, person, result) => {
    sql.query(
      "UPDATE person SET Name = ?, Mobile = ?, Address = ? WHERE id = ?",
      [person.Name, person.Mobile, person.Address, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Tutorial with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated person: ", { id: id, ...person });
        result(null, { id: id, ...person });
      }
    );
  };


//   Removing a specific person details 

  Person.remove = (id, result) => {
  sql.query("DELETE FROM person WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted person with id: ", id);
    result(null, res);
  });
};


module.exports = Person;
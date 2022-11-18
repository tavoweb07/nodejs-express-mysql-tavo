const Tutorial = require("../models/tutorial.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío!"
    });
  }

  // Create a Tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  // Save Tutorial in the database
  Tutorial.create(tutorial, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error al crear el Tutorial."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Tutorial.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Se produjo un error al recuperar los tutoriales."
      });
    else res.send(data);
  });
};

// Find a single Tutorial by Id
exports.findOne = (req, res) => {
  Tutorial.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error al recuperar Tutorial con id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Se produjo un error al recuperar los tutoriales."
      });
    else res.send(data);
  });
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío!"
    });
  }

  console.log(req.body);

  Tutorial.updateById(
    req.params.id,
    new Tutorial(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Tutorial no encontrado con id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error al actualizar Tutorial con id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  Tutorial.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Tutorial con id:${req.params.id} no encontrado .`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar Tutorial con id " + req.params.id
        });
      }
    } else res.send({ message: `Tutorial was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Se produjo un error al eliminar todos los tutoriales."
      });
    else res.send({ message: `Todos los tutoriales se eliminaron con éxito!` });
  });
};

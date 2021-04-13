const { Thing } = require('./../models');

module.exports.createThing = async (req, res, next) => {
  const { body } = req;
  try {
    const createThing = await Thing.create(body);
    if (createThing) {
      return res.status(201).send(createThing);
    }
    return res.status(400).send();
  } catch (err) {
    next(err);
  }
};

module.exports.getAllThings = async (req, res, next) => {
  try {
    const things = await Thing.find();
    res.send(things);
  } catch (err) {
    next(err);
  }
};

module.exports.getThing = async (req, res, next) => {
  try {
    const {
      params: { thingId },
    } = req;
    const thing = await Thing.findByPk(thingId);
    if (thing) {
      return res.send(thing);
    }
    res.status(404).send(`Thing with id ${thingId} not found`);
  } catch (err) {
    next(err);
  }
};
module.exports.updateThing = (req, res, next) => {
  res.send('THING UPDATED');
};
module.exports.deleteThing = async (req, res, next) => {
  try {
    const {
      params: { thingId },
    } = req;
    const thing = await Thing.deleteByPk(thingId);
    if (thing) {
      return res.status(200).send(thing);
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

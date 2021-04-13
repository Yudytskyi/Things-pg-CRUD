const { Router } = require('express');
const ThingController = require('./../controllers/thing.controller');
const thingRouter = Router();

thingRouter.post('/thing', ThingController.createThing);
thingRouter.get('/things', ThingController.getAllThings);

thingRouter
  .route('/things/:thingId')
  .get(ThingController.getThing)
  .put(ThingController.updateThing)
  .delete(ThingController.deleteThing);

module.exports = thingRouter;

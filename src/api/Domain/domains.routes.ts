import { Router } from 'express';
import * as DomainController from './domain.controller';
import { validateRequest } from '../../middlewares';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { Domain } from './domain.model';

const router = Router();

router.get( '/', DomainController.get );

router.get( '/:id',
  validateRequest( { params: ParamsWithId } ),
  DomainController.find );

router.post( '/',
  validateRequest( { body: Domain } ),
  DomainController.store );

router.put( '/:id', DomainController.update );

router.delete( '/:id', DomainController.destroy );

export default router;

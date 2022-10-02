import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import domains from './Domain/domains.routes';

const router = express.Router();

router.get<{}, MessageResponse>( '/', ( req, res ) => {
  res.json( {
    message: 'API - 👋🌎🌍🌏',
  } );
} );

router.use( '/domains', domains );

export default router;

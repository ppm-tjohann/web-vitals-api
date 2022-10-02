import { NextFunction, Request, Response } from 'express';
import { Domain, DomainWithId } from './domain.model';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { ObjectId } from 'mongodb';
import * as Domains from './domains.service';

export const get = async (
  req: Request<{}>, res: Response<DomainWithId[]>, next: NextFunction ) => {
  try {
    const domains = await Domains.fetchAll();
    res.json( domains );
  } catch ( e ) {
    next( e );
  }
};

export const find = async (
  req: Request<ParamsWithId>, res: Response, next: NextFunction ) => {
  try {
    const domain = await Domains.fetchOne( new ObjectId( req.params.id ) );
    if ( !domain ) {
      res.status( 404 );
      throw new Error( `Domain with id '${req.params.id}' not found` );
    }
    res.json( domain );
  } catch ( e ) {
    next( e );
  }
};

export const store = async (
  req: Request<{}, DomainWithId, Domain>,
  res: Response<DomainWithId>,
  next: NextFunction,
) => {
  try {
    const storedDomain = await Domains.store( req.body );
    res.status( 201 );
    res.json( {
      _id: storedDomain.insertedId,
      ...req.body,
    } );
  } catch ( e ) {
    next( e );
  }
};

export const update = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
};

export const destroy = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
};


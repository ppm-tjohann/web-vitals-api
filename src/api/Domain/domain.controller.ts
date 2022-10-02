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
    console.log('Store Error : ',e);
    next( e );
  }
};

export const update = async (
  req: Request<ParamsWithId, DomainWithId, Domain>,
  res: Response<DomainWithId>,
  next: NextFunction,
) => {
  try {
    const updatedDomain = await Domains.update(
      new ObjectId( req.params.id ), req.body );
    if ( !updatedDomain.value ) {
      res.status( 404 );
      throw new Error( `Domain with id '${req.params.id}' not found` );
    }
    res.json( updatedDomain.value );
  } catch ( e ) {
    next( e );
  }
};

export const destroy = async (
  req: Request<ParamsWithId>,
  res: Response<DomainWithId>,
  next: NextFunction,
) => {
  try {
    const deletedDomain = await Domains.destroy(
      new ObjectId( req.params.id ) )
        ;

    if ( !deletedDomain.value ) {
      res.status( 404 );
      throw new Error( `Domain with id '${req.params.id}' not found` );
    }
    res.status( 200 );
    res.json( deletedDomain.value );
  } catch ( e ) {
    next( e );
  }
};


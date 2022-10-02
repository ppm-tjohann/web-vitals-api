import { Domain, Domains } from './domain.model';
import { ObjectId } from 'mongodb';

export async function fetchAll() {
  return Domains.find().toArray();
}

export async function fetchOne( id: ObjectId ) {
  return Domains.findOne( { _id: id } );

}

export async function store( domain: Domain ) {
  return Domains.insertOne( domain );
}

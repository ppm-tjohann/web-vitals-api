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

export async function update( id: ObjectId, domain: Domain ) {
  return Domains.findOneAndUpdate( { _id: id }, {
    $set: domain,
  },{returnDocument:'after'} );
}

export async function destroy( id: ObjectId ) {
  return Domains.findOneAndDelete( { _id: id } );
}


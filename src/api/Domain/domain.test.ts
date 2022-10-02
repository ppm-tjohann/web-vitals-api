import request from 'supertest';

import app from '../../app';
import { Domains } from './domain.model';

beforeAll( async () => {
  await Domains.drop();
} );

describe( 'GET /api/v1/domains', () => {
  it( 'responds with all domains', async () =>
    request( app ).
      get( '/api/v1/domains' ).
      set( 'Accept', 'application/json' ).
      expect( 'Content-Type', /json/ ).
      then( ( response ) => {
        expect( response.body ).toHaveProperty( 'length' );
        expect( response.body.length ).toBe( 0 );
      } ),
  );
} );

let id = '';

describe( 'POST /api/v1/domains', () => {
  it( 'responds with new created domain', async () =>
    request( app ).
      post( '/api/v1/domains/de' ).
      send( {
        name: 'https://www.walkdlinik.de',
        sitemap: 'https://www.sitemap.de',
        favicon: 'https://www.favi.de',
      } ).
      set( 'Accept', 'application/json' ).
      expect( 'Content-Type', /json/ ).
      expect( 201 ).
      then( ( response ) => {
        id = response.body._id;
        expect( response.body ).toHaveProperty( '_id' );
        expect( response.body ).toHaveProperty( 'name' );
        expect( response.body.name ).toBe( 'https://www.walkdlinik.de' );
        expect( response.body ).toHaveProperty( 'sitemap' );
        expect( response.body.sitemap ).toBe( 'https://www.sitemap.de' );
        expect( response.body ).toHaveProperty( 'favicon' );
        expect( response.body.favicon ).toBe( 'https://www.favi.de' );
      } ),
  );

  it( 'responds with 422', async () =>
    request( app ).
      post( '/api/v1/domains' ).
      send( {
        name: 'https://www.walkdlinik.de',
        sitemap: 'ww.sitemap.de',
        favicon: 'https://www.favi.de',
      } ).
      set( 'Accept', 'application/json' ).
      expect( 'Content-Type', /json/ ).
      expect( 422 ).then( ( response ) => {
        expect( response.body ).toHaveProperty( 'message' );
      } ),
  );

} );

describe( 'PUT /api/v1/domains/:id', () => {
  it( 'responds with 422, missing id', async () =>
    request( app ).
      put( '/api/v1/domains/id' ).
      send( {
        name: 'https://www.walkdlinik.de',
        sitemap: 'https://www.sitemap.de',
        favicon: 'https://www.favi.de',
      } ).
      set( 'Accept', 'application/json' ).
      expect( 'Content-Type', /json/ ).
      expect( 200 ).
      then( ( response ) => {
        expect( response.body ).toHaveProperty( 'message' );
      } ),
  );

  it( 'responds with 422, wrong body', async () =>
    request( app ).
      put( `/api/v1/domains/${id}` ).
      send( {
        name: 'https://www.walkdlinik.de',
        sitemap: 'ww.sitemap.de',
        favicon: 'https://www.favi.de',
      } ).
      set( 'Accept', 'application/json' ).
      expect( 'Content-Type', /json/ ).
      expect( 422 ).then( ( response ) => {
        expect( response.body ).toHaveProperty( 'message' );
      } ),
  );
  it( 'responds with updated domain', async () =>
    request( app ).
      put( `/api/v1/domains/${id}` ).
      send( {
        name: 'https://www.new-walkdlinik.de',
        sitemap: 'https://www.new-sitemap.de',
        favicon: 'https://www.new-favi.de',
      } ).
      set( 'Accept', 'application/json' ).
      expect( 'Content-Type', /json/ ).
      expect( 200 ).then( ( response ) => {
        expect( response.body ).toHaveProperty( '_id' );
        expect( response.body ).toHaveProperty( 'name' );
        expect( response.body.name ).toBe( 'https://www.walkdlinik.de' );
        expect( response.body ).toHaveProperty( 'sitemap' );
        expect( response.body.sitemap ).toBe( 'https://www.sitemap.de' );
        expect( response.body ).toHaveProperty( 'favicon' );
        expect( response.body.favicon ).toBe( 'https://www.favi.de' );
      } ),
  );

} );

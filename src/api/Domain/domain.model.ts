import * as z from 'zod';
import { db } from '../../db';
import { WithId } from 'mongodb';

export const Domain = z.object( {
  name: z.string().url(),
  favicon: z.string().url(),
  sitemap: z.string().url(),
} );
export type Domain = z.infer<typeof Domain>;
export type DomainWithId = WithId<Domain>;
export const Domains = db.collection<Domain>( 'domains' );
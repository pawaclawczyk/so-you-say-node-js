import { Map } from 'immutable';
import { Maybe } from 'monet';
import { Identifiable, RepositoryGet, RepositoryStore } from '../../model/repository/repository';

export const InMemoryGet = <ID, T extends Identifiable<ID>> (xs: Map<ID, T>): RepositoryGet<ID, T> =>
    (id: ID) => Maybe.fromNull(xs.get(id, undefined));

export const InMemoryStore = <ID, T extends Identifiable<ID>> (xs: Map<ID, T>): RepositoryStore<ID, T> =>
    (x: T) => { xs.set(x.id, x); return Maybe.Just(x); };

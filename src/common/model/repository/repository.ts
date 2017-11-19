import { Maybe } from "monet";

export type RepositoryGet<ID, T> = (id: ID) => Maybe<T>;
export type RepositoryStory<T> = (x: T) => void;

export interface Repository<ID, T> {
    get: RepositoryGet<ID, T>;
    store: RepositoryStory<T>;
}

export interface Identifiable<ID> {
    id: ID;
}

export interface Identifiable<ID> {
    id: ID;
}

export type RepositoryGet<ID, T extends Identifiable<ID>> = (id: ID) => Promise<T>;
export type RepositoryStore<ID, T extends Identifiable<ID>> = (x: T) => Promise<T>;

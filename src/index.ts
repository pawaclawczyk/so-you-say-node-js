import { Maybe } from 'monet';
import { __, compose, curry } from 'ramda';
import { Connection, createConnection, FindOneOptions, Repository } from 'typeorm';
import { createAndAddTask, finishTask, Matrix, MatrixId } from './eisenhower/model/matrix.model';

const matrix = Maybe.Just(1)
    .map(Matrix)
    .map(createAndAddTask(__, 'first task'))
    .map(createAndAddTask(__, 'second task'))
    .map(createAndAddTask(__, 'third task'))
    .map(finishTask(__, 2))
    .map((m) => ({
        id: m.id,
        tasks: m.tasks.toArray(),
    }))
    .just();

const opts = { relations: ['tasks'] };

const conn = createConnection();

const mapP = <A, B>(fn: (x: A) => B) => (p: Promise<A>): Promise<B> => p.then(fn);

const getRepo = curry(
    (e: string, c: Connection) => c.manager.getRepository(e),
);

const get = curry(
    (id: MatrixId, opts: FindOneOptions<{}>, r: Repository<{}>) => r.findOne(id, opts)
);

const close = async () => (await conn).close();

const app = compose(
    mapP(close),
    mapP((v) => { console.log(v); return v; }),
    mapP(get(1, opts as FindOneOptions<{}>)),
    mapP(getRepo('Matrix')),
);

app(conn);

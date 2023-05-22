import {
    ClientSession,
    FilterQuery,
    HydratedDocument,
    SortOrder,
    UnpackedIntersection,
    UpdateQuery,
    UpdateWithAggregationPipeline,
} from "mongoose"

type Prettify<T> = {
    [K in keyof T]: T[K];
}
export type Model<T> = Prettify<T & {
    _id: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    deletedAt?: Date | string | null;
}>
export type Sort =
    | string
    | { [key: string]: SortOrder | { $meta: "textScore" } }
    | [string, SortOrder][]
    | undefined
    | null
export type Projections<TModel extends Model<{}>> =
    import("mongoose").ProjectionType<TModel>
export type Archived = string | boolean
export type Keys<TModel extends Model<{}>> = keyof TModel extends string
    ? keyof TModel
    : never
export type Populate<TModel extends Model<{}>> = Keys<TModel> | Keys<TModel>[]

interface ISessionRepository {
    connectDBSession(session: ClientSession): this
    disconnectDBSession(): this
}

interface IWritableRepository<TModel extends {}> extends ISessionRepository {
    create(attributes: Partial<TModel>): Promise<HydratedDocument<TModel>>
    update(
        condition: FilterQuery<TModel>,
        update: UpdateWithAggregationPipeline | UpdateQuery<TModel>
    ): Promise<HydratedDocument<TModel>>
    updateWithOperators(
        condition: FilterQuery<TModel>,
        update: UpdateWithAggregationPipeline | UpdateQuery<TModel>
    ): Promise<TModel>
    updateMany(
        condition: FilterQuery<TModel>,
        update: UpdateWithAggregationPipeline | UpdateQuery<TModel>
    ): Promise<HydratedDocument<TModel>[]>
    softDelete(condition: FilterQuery<TModel>): Promise<TModel>
    softDeleteMany(condition: FilterQuery<TModel>): Promise<TModel[]>
    delete(condition: FilterQuery<TModel>): Promise<void>
    deleteMany(condition: FilterQuery<TModel>): Promise<void>
}

interface IReadableRepository<TModel extends Model<{}>> extends ISessionRepository {
    byID(
        _id: string,
        projections: Projections<TModel>,
        archived: Archived
    ): Promise<HydratedDocument<TModel>>
    byQuery(
        query: FilterQuery<TModel>,
        projections?: Projections<TModel>,
        archived?: Archived,
        populate?: Populate<TModel>,
        sort?: Sort
    ): Promise<UnpackedIntersection<HydratedDocument<TModel>, {}>>
    count(query: FilterQuery<TModel>): Promise<number>
    distinct(field: Keys<TModel>, query: FilterQuery<TModel>): Promise<string[]>
    countDistinct(
        field: Keys<TModel>,
        query: FilterQuery<TModel>
    ): Promise<number>
    exists(query: FilterQuery<TModel>): Promise<boolean>
    all(query: PaginationQuery<TModel>): Promise<TModel[]>
    paginate(query: PaginationQuery<TModel>): Promise<PaginationResult<TModel>>
}

export interface IRepository<TModel extends Model<{}>>
    extends IReadableRepository<TModel>,
        IWritableRepository<TModel> {}

export type PaginationResult<T> = {
    data: T[]
    total: number
    limit: number
    offset: number
    pages: number
    page: {
        current: number
        next: number | null
        prev: number | null
    }
    sort: string | object
}

export type PaginationQuery<T extends Model<{}>> = {
    archived?: string | boolean
    populate?: Populate<T>
    sort?: Sort
    conditions?: import("mongoose").FilterQuery<T>
    skip?: number
    limit?: number
    page?: number
    projections?: import("mongoose").ProjectionType<T>
}

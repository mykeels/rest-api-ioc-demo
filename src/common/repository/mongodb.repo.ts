import "mongoose-paginate-v2";

import mongoose, {
    ClientSession,
    FilterQuery,
    HydratedDocument,
    Schema,
    SortOrder,
    UnpackedIntersection,
} from "mongoose";

import {
    Archived,
    IRepository,
    Keys,
    Populate,
    Projections,
    Sort,
    PaginationQuery,
    PaginationResult,
    Model,
} from "./repo.interface";
import { makeError } from "./utils";

export class MongoDBRepository<TModel extends Model<{}>> implements IRepository<TModel> {
    name: string;
    schema: Schema;
    session: ClientSession | null;
    model: import("mongoose").PaginateModel<TModel>;

    constructor(name: string, schema: Schema);
    constructor(name: string, model: import("mongoose").PaginateModel<TModel>);
    constructor(
        name: string,
        modelOrSchema: Schema | import("mongoose").PaginateModel<TModel>
    ) {
        this.name = name;
        if (modelOrSchema instanceof Schema) {
            const schema = modelOrSchema;
            this.schema = schema;
            this.model = (mongoose.models[name] ||
                mongoose.model(
                    name,
                    schema
                )) as import("mongoose").PaginateModel<TModel>;
        } else {
            this.model = modelOrSchema;
            this.schema = modelOrSchema.schema;
        }

        this.session = null;
    }

    /**
     * checks if the archived argument is either undefined
     * or passed as a false string in the cause of query params, and
     * converts it to a boolean.
     * @param archived string or boolean archived option
     */
    private convertArchived = (archived: string | boolean) =>
        [undefined, "false", false, null].includes(archived) ? false : true;

    /**
     * Converts a passed condition argument to a query
     * @param condition string or object condition
     */
    private getQuery = (condition: string | Partial<TModel>) =>
        typeof condition === "string" ? { _id: condition } : { ...condition };

    getDBModel() {
        return this.model;
    }

    /**
     * Connects to a DB Session
     */
    connectDBSession(session: ClientSession) {
        this.session = session;
        if (session && !session.inTransaction()) {
            session.startTransaction();
        }
        return this;
    }

    /**
     * Disconnects from a DB Session
     */
    disconnectDBSession() {
        this.session = null;
        return this;
    }

    /**
     * Creates one or more documents.
     */
    async create(
        attributes: Partial<TModel>
    ): Promise<HydratedDocument<TModel>> {
        const [doc] = await this.model.create([attributes], {
            session: this.session,
        });
        return doc!.save({ session: this.session }).catch((err) => {
            if (err && err.code === 11000) {
                return Promise.reject(
                    makeError(
                        `${this.name} exists already`,
                        "DuplicateModelError"
                    )
                );
            }
            return Promise.reject(err);
        });
    }

    /**
     * Finds a document by it's id
     * @throws a `ModelNotFoundError()` if the model is not found
     * @returns {Promise<TModel>}
     */
    async byID(
        _id: string,
        projections?: Projections<TModel>,
        archived?: Archived
    ): Promise<HydratedDocument<TModel>> {
        return new Promise((resolve, reject) => {
            archived = this.convertArchived(archived || false);
            this.model
                // @ts-ignore
                .findOne({
                    _id,
                    ...(!archived
                        ? { deleted_at: undefined }
                        : { deleted_at: { $ne: undefined } }),
                })
                .session(this.session)
                .select(projections || [])
                // @ts-expect-error
                .exec((err, result) => {
                    if (err) return reject(err);
                    if (!result) {
                        return reject(
                            makeError(
                                `${this.name} not found`,
                                "ModelNotFoundError"
                            )
                        );
                    }
                    resolve(result);
                });
        });
    }

    /**
     * Finds a document by an object query.
     * @throws a `ModelNotFoundError()` if the model is not found
     */
    async byQuery(
        query: FilterQuery<TModel>,
        projections: Projections<TModel>,
        archived: Archived,
        populate: Populate<TModel>,
        sort: Sort = "-createdAt"
    ): Promise<UnpackedIntersection<HydratedDocument<TModel>, {}>> {
        archived = this.convertArchived(archived);
        return new Promise((resolve, reject) => {
            this.model
                .findOne({
                    ...query,
                    ...(!archived
                        ? { deleted_at: undefined }
                        : { deleted_at: { $ne: undefined } }),
                })
                .session(this.session)
                .select(projections || [])
                .populate(populate)
                .sort(sort)
                // @ts-expect-error
                .exec((err, result) => {
                    if (err) return reject(err);
                    if (!result) {
                        return reject(
                            makeError(
                                `${this.name} not found`,
                                "ModelNotFoundError"
                            )
                        );
                    } else resolve(result);
                });
        });
    }

    /**
     * Counts documents matching a query.
     */
    async count(query: FilterQuery<TModel>): Promise<number> {
        return new Promise((resolve, reject) => {
            this.model
                .countDocuments(
                    {
                        ...query,
                    },
                    {},
                    // @ts-expect-error
                    (err, result) => {
                        if (err) return reject(err);
                        resolve(result);
                    }
                )
                .session(this.session);
        });
    }

    /**
     * Counts documents matching a query.
     */
    async distinct(
        field: Keys<TModel>,
        query: FilterQuery<TModel>
    ): Promise<string[]> {
        return new Promise((resolve, reject) => {
            this.model
                .distinct(field, {
                    ...query,
                })
                .session(this.session)
                // @ts-expect-error
                .exec((err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
        });
    }

    /**
     * Counts documents matching a query.
     */
    async countDistinct(
        field: Keys<TModel>,
        query: FilterQuery<TModel>
    ): Promise<number> {
        return this.distinct(field, query).then((ids) => ids.length);
    }

    /**
     * Returns true if a document exists, matching a query.
     */
    async exists(query: FilterQuery<TModel>): Promise<boolean> {
        return this.model.exists(query).then((result) => !!result);
    }

    /**
     * Finds all documents that match a query
     */
    async all(
        query: PaginationQuery<TModel>
    ): Promise<HydratedDocument<TModel>[]> {
        const sort = query?.sort || "createdAt";
        const archived = this.convertArchived(query?.archived || false);
        return this.model
            .find({
                ...query?.conditions,
                ...(!archived
                    ? { deleted_at: undefined }
                    : {
                          $or: [
                              { deleted_at: { $ne: undefined } },
                              { deleted_at: undefined },
                          ],
                      }),
            })
            .session(this.session)
            .skip(query?.skip || 0)
            .limit(query?.limit || 0)
            .select(query?.projections || [])
            .populate(query?.populate || [])
            .sort(sort) as unknown as Promise<HydratedDocument<TModel>[]>;
    }

    /**
     * Same as `all()` but returns paginated results.
     */
    async paginate(
        query: PaginationQuery<TModel>
    ): Promise<PaginationResult<HydratedDocument<TModel>>> {
        const page = Number(query.page) - 1 || 0;
        const limit = Number(query.limit) || 20;
        const offset = page * limit;
        const sort = query.sort || "createdAt";
        const archived = this.convertArchived(query.archived || false);
        const dbQuery = {
            ...query.conditions,
            ...(!archived
                ? { deleted_at: undefined }
                : { deleted_at: { $ne: undefined } }),
        };
        return Promise.all([
            this.count(dbQuery),
            new Promise((resolve, reject) => {
                this.model
                    .find(dbQuery)
                    .session(this.session)
                    .limit(limit)
                    .select(query.projections || [])
                    .populate(query.populate || [])
                    .skip(offset)
                    .sort(sort)
                    // @ts-expect-error
                    .exec((err, result) => {
                        if (err) return reject(err);
                        resolve({
                            page: {
                                current: page + 1,
                                prev: page > 0 ? page : null,
                                next:
                                    page < Math.ceil(result.length / limit)
                                        ? page + 2
                                        : null,
                            },
                            limit,
                            sort,
                            data: result,
                        });
                    });
            }) as Promise<
                Pick<
                    PaginationResult<TModel>,
                    "page" | "limit" | "sort" | "data"
                >
            >,
        ]).then(
            ([count, result]) =>
                ({
                    ...result,
                    data: result.data,
                    limit: result.limit,
                    sort: result.sort,
                    total: count,
                    pages: Math.ceil(count / limit),
                    page: result.page,
                    offset: page * limit,
                } as PaginationResult<HydratedDocument<TModel>>)
        );
    }

    /**
     * Updates a single document that matches a particular condition.
     * Triggers mongoose `save` hooks.
     * @param condition Query condition to match against documents
     * @param update Instructions for how to update the document
     * @throws {ModelNotFoundError} a `ModelNotFoundError()` if the model is not found
     */
    async update(
        condition: FilterQuery<TModel>,
        update:
            | mongoose.UpdateWithAggregationPipeline
            | mongoose.UpdateQuery<TModel>
    ): Promise<HydratedDocument<TModel>> {
        const query = this.getQuery(condition);

        return new Promise((resolve, reject) => {
            this.model.findOne(
                query,
                null,
                { session: this.session },
                // @ts-expect-error
                (err, result) => {
                    if (err) return reject(err);
                    if (!result) {
                        return reject(
                            makeError(
                                `${this.name} not found`,
                                "ModelNotFoundError"
                            )
                        );
                    }
                    result.set(update);
                    resolve(result.save({ session: this.session }));
                }
            );
        });
    }

    /**
     * Allows the user of atomic operators such as $inc in updates.
     * Note: It does not trigger mongoose `save` hooks.
     * @param condition Query condition to match against documents
     * @param update Instructions for how to update the document
     * @throws a `ModelNotFoundError()` if the model is not found
     */
    async updateWithOperators(
        condition: FilterQuery<TModel>,
        update:
            | mongoose.UpdateWithAggregationPipeline
            | mongoose.UpdateQuery<TModel>
    ): Promise<TModel> {
        const query = this.getQuery(condition);

        return new Promise((resolve, reject) => {
            this.model.findOneAndUpdate(
                query,
                update,
                { new: true, session: this.session },
                // @ts-expect-error
                (err, result) => {
                    if (err) return reject(err);
                    if (!result) {
                        return reject(
                            makeError(
                                `${this.name} not found`,
                                "ModelNotFoundError"
                            )
                        );
                    } else resolve(result);
                }
            );
        });
    }

    /**
     * Updates multiple documents that match a query
     * @param condition Query condition to match against documents
     * @param update Instructions for how to update the documents
     */
    async updateMany(
        condition: FilterQuery<TModel>,
        update:
            | mongoose.UpdateWithAggregationPipeline
            | mongoose.UpdateQuery<TModel>
    ): Promise<HydratedDocument<TModel>[]> {
        const query = this.getQuery(condition);

        return new Promise((resolve, reject) => {
            this.model.updateMany(
                query,
                update,
                { session: this.session },
                // @ts-expect-error
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                }
            );
        });
    }

    /**
     * Soft deletes a document by created `deleted_at` field in the document and setting it to true.
     * @throws a `ModelNotFoundError()` if the model is not found
     */
    async softDelete(condition: FilterQuery<TModel>): Promise<TModel> {
        return new Promise((resolve, reject) => {
            const query = this.getQuery(condition);

            this.model.findOneAndUpdate(
                query,
                {
                    deleted_at: new Date(),
                },
                {
                    new: true,
                    session: this.session,
                },
                // @ts-expect-error
                (err, result) => {
                    if (err) return reject(err);
                    if (!result)
                        reject(
                            makeError(
                                `${this.name} not found`,
                                "ModelNotFoundError"
                            )
                        );
                    else resolve(result);
                }
            );
        });
    }

    /**
     * Soft deletes a document by created `deleted_at` field in the document and setting it to true.
     * @throws a `ModelNotFoundError()` if the model is not found
     */
    async softDeleteMany(condition: FilterQuery<TModel>): Promise<TModel[]> {
        return new Promise((resolve, reject) => {
            const query = this.getQuery(condition);

            this.model.updateMany(
                query,
                {
                    deleted_at: new Date(),
                },
                {
                    new: true,
                    session: this.session,
                },
                // @ts-expect-error
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                }
            );
        });
    }

    /**
     * Permanently deletes a document by removing it from the collection(DB)
     * @throws a `ModelNotFoundError()` if the model is not found
     */
    async delete(condition: FilterQuery<TModel>): Promise<void> {
        return new Promise((resolve, reject) => {
            const query = this.getQuery(condition);
            this.model
                // @ts-expect-error
                .findOneAndDelete(query, {}, (err, result) => {
                    if (err) return reject(err);
                    resolve();
                })
                .session(this.session);
        });
    }

    /**
     * Permanently deletes multiple documents by removing them from the collection(DB)
     * @throws a `ModelNotFoundError()` if the model is not found
     */
    async deleteMany(condition: FilterQuery<TModel> = {}): Promise<void> {
        return new Promise((resolve, reject) => {
            const query = this.getQuery(condition);
            // @ts-expect-error
            this.model.deleteMany(query, { session: this.session }, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}

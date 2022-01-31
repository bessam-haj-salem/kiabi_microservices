/**
 * Special options passed to Repository#upsert
 */
export interface UpsertOptions<Entity> {
    conflictPaths: string[];
}

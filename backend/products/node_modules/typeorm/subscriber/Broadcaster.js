"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Broadcaster = void 0;
var tslib_1 = require("tslib");
var BroadcasterResult_1 = require("./BroadcasterResult");
/**
 * Broadcaster provides a helper methods to broadcast events to the subscribers.
 */
var Broadcaster = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function Broadcaster(queryRunner) {
        this.queryRunner = queryRunner;
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    Broadcaster.prototype.broadcast = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var result, broadcastFunction;
            var _a;
            return (0, tslib_1.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        result = new BroadcasterResult_1.BroadcasterResult();
                        broadcastFunction = this["broadcast" + event + "Event"];
                        if (typeof broadcastFunction === "function") {
                            (_a = broadcastFunction).call.apply(_a, (0, tslib_1.__spreadArray)([this,
                                result], (0, tslib_1.__read)(args), false));
                        }
                        return [4 /*yield*/, result.wait()];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Broadcasts "BEFORE_INSERT" event.
     * Before insert event is executed before entity is being inserted to the database for the first time.
     * All subscribers and entity listeners who listened to this event will be executed at this point.
     * Subscribers and entity listeners can return promises, it will wait until they are resolved.
     *
     * Note: this method has a performance-optimized code organization, do not change code structure.
     */
    Broadcaster.prototype.broadcastBeforeInsertEvent = function (result, metadata, entity) {
        var _this = this;
        if (entity && metadata.beforeInsertListeners.length) {
            metadata.beforeInsertListeners.forEach(function (listener) {
                if (listener.isAllowed(entity)) {
                    var executionResult = listener.execute(entity);
                    if (executionResult instanceof Promise)
                        result.promises.push(executionResult);
                    result.count++;
                }
            });
        }
        if (this.queryRunner.connection.subscribers.length) {
            this.queryRunner.connection.subscribers.forEach(function (subscriber) {
                if (_this.isAllowedSubscriber(subscriber, metadata.target) && subscriber.beforeInsert) {
                    var executionResult = subscriber.beforeInsert({
                        connection: _this.queryRunner.connection,
                        queryRunner: _this.queryRunner,
                        manager: _this.queryRunner.manager,
                        entity: entity,
                        metadata: metadata
                    });
                    if (executionResult instanceof Promise)
                        result.promises.push(executionResult);
                    result.count++;
                }
            });
        }
    };
    /**
     * Broadcasts "BEFORE_UPDATE" event.
     * Before update event is executed before entity is being updated in the database.
     * All subscribers and entity listeners who listened to this event will be executed at this point.
     * Subscribers and entity listeners can return promises, it will wait until they are resolved.
     *
     * Note: this method has a performance-optimized code organization, do not change code structure.
     */
    Broadcaster.prototype.broadcastBeforeUpdateEvent = function (result, metadata, entity, databaseEntity, updatedColumns, updatedRelations) {
        var _this = this;
        if (entity && metadata.beforeUpdateListeners.length) {
            metadata.beforeUpdateListeners.forEach(function (listener) {
                if (listener.isAllowed(entity)) {
                    var executionResult = listener.execute(entity);
                    if (executionResult instanceof Promise)
                        result.promises.push(executionResult);
                    result.count++;
                }
            });
        }
        if (this.queryRunner.connection.subscribers.length) {
            this.queryRunner.connection.subscribers.forEach(function (subscriber) {
                if (_this.isAllowedSubscriber(subscriber, metadata.target) && subscriber.beforeUpdate) {
                    var executionResult = subscriber.beforeUpdate({
                        connection: _this.queryRunner.connection,
                        queryRunner: _this.queryRunner,
                        manager: _this.queryRunner.manager,
                        entity: entity,
                        metadata: metadata,
                        databaseEntity: databaseEntity,
                        updatedColumns: updatedColumns || [],
                        updatedRelations: updatedRelations || []
                    });
                    if (executionResult instanceof Promise)
                        result.promises.push(executionResult);
                    result.count++;
                }
            });
        }
    };
    /**
     * Broadcasts "BEFORE_REMOVE" event.
     * Before remove event is executed before entity is being removed from the database.
     * All subscribers and entity listeners who listened to this event will be executed at this point.
     * Subscribers and entity listeners can return promises, it will wait until they are resolved.
     *
     * Note: this method has a performance-optimized code organization, do not change code structure.
     */
    Broadcaster.prototype.broadcastBeforeRemoveEvent = function (result, metadata, entity, databaseEntity) {
        var _this = this;
        if (entity && metadata.beforeRemoveListeners.length) {
            metadata.beforeRemoveListeners.forEach(function (listener) {
                if (listener.isAllowed(entity)) {
                    var executionResult = listener.execute(entity);
                    if (executionResult instanceof Promise)
                        result.promises.push(executionResult);
                    result.count++;
                }
            });
        }
        if (this.queryRunner.connection.subscribers.length) {
            this.queryRunner.connection.subscribers.forEach(function (subscriber) {
                if (_this.isAllowedSubscriber(subscriber, metadata.target) && subscriber.beforeRemove) {
                    var executionResult = subscriber.beforeRemove({
                        connection: _this.queryRunner.connection,
                        queryRunner: _this.queryRunner,
                        manager: _this.queryRunner.manager,
                        entity: entity,
                        metadata: metadata,
                        databaseEntity: databaseEntity,
                        entityId: metadata.getEntityIdMixedMap(databaseEntity)
                    });
                    if (executionResult instanceof Promise)
                        result.promises.push(executionResult);
                    result.count++;
                }
            });
        }
    };
    /**
     * Broadcasts "AFTER_INSERT" event.
     * After insert event is executed after entity is being persisted to the database for the first time.
     * All subscribers and entity listeners who listened to this event will be executed at this point.
     * Subscribers and entity listeners can return promises, it will wait until they are resolved.
     *
     * Note: this method has a performance-optimized code organization, do not change code structure.
     */
    Broadcaster.prototype.broadcastAfterInsertEvent = function (result, metadata, entity) {
        var _this = this;
        if (entity && metadata.afterInsertListeners.length) {
            metadata.afterInsertListeners.forEach(function (listener) {
                if (listener.isAllowed(entity)) {
                    var executionResult = listener.execute(entity);
                    if (executionResult instanceof Promise)
                        result.promises.push(executionResult);
                    result.count++;
                }
            });
        }
        if (this.queryRunner.connection.subscribers.length) {
            this.queryRunner.connection.subscribers.forEach(function (subscriber) {
                if (_this.isAllowedSubscriber(subscriber, metadata.target) && subscriber.afterInsert) {
                    var executionResult = subscriber.afterInsert({
                        connection: _this.queryRunner.connection,
                        queryRunner: _this.queryRunner,
                        manager: _this.queryRunner.manager,
                        entity: entity,
                        metadata: metadata
                    });
                    if (executionResult instanceof Promise)
                        result.promises.push(executionResult);
                    result.count++;
                }
            });
        }
    };
    /**
     * Broadcasts "BEFORE_TRANSACTION_START" event.
     */
    Broadcaster.prototype.broadcastBeforeTransactionStartEvent = function (result) {
        var _this = this;
        if (this.queryRunner.connection.subscribers.length) {
            this.queryRunner.connection.subscribers.forEach(function (subscriber) {
                if (subscriber.beforeTransactionStart) {
                    var executionResult = subscriber.beforeTransactionStart({
                        connection: _this.queryRunner.connection,
                        queryRunner: _this.queryRunner,
                        manager: _this.queryRunner.manager,
                    });
                    if (executionResult instanceof Promise)
                        result.promises.push(executionResult);
                    result.count++;
                }
            });
        }
    };
    /**
     * Broadcasts "AFTER_TRANSACTION_START" event.
     */
    Broadcaster.prototype.broadcastAfterTransactionStartEvent = function (result) {
        var _this = this;
        if (this.queryRunner.connection.subscribers.length) {
            this.queryRunner.connection.subscribers.forEach(function (subscriber) {
                if (subscriber.afterTransactionStart) {
                    var executionResult = subscriber.afterTransactionStart({
                        connection: _this.queryRunner.connection,
                        queryRunner: _this.queryRunner,
                        manager: _this.queryRunner.manager,
                    });
                    if (executionResult instanceof Promise)
                        result.promises.push(executionResult);
                    result.count++;
                }
            });
        }
    };
    /**
     * Broadcasts "BEFORE_TRANSACTION_COMMIT" event.
     */
    Broadcaster.prototype.broadcastBeforeTransactionCommitEvent = function (result) {
        var _this = this;
        if (this.queryRunner.connection.subscribers.length) {
            this.queryRunner.connection.subscribers.forEach(function (subscriber) {
                if (subscriber.beforeTransactionCommit) {
                    var executionResult = subscriber.beforeTransactionCommit({
                        connection: _this.queryRunner.connection,
                        queryRunner: _this.queryRunner,
                        manager: _this.queryRunner.manager,
                    });
                    if (executionResult instanceof Promise)
                        result.promises.push(executionResult);
                    result.count++;
                }
            });
        }
    };
    /**
     * Broadcasts "AFTER_TRANSACTION_COMMIT" event.
     */
    Broadcaster.prototype.broadcastAfterTransactionCommitEvent = function (result) {
        var _this = this;
        if (this.queryRunner.connection.subscribers.length) {
            this.queryRunner.connection.subscribers.forEach(function (subscriber) {
                if (subscriber.afterTransactionCommit) {
                    var executionResult = subscriber.afterTransactionCommit({
                        connection: _this.queryRunner.connection,
                        queryRunner: _this.queryRunner,
                        manager: _this.queryRunner.manager,
                    });
                    if (executionResult instanceof Promise)
                        result.promises.push(executionResult);
                    result.count++;
                }
            });
        }
    };
    /**
     * Broadcasts "BEFORE_TRANSACTION_ROLLBACK" event.
     */
    Broadcaster.prototype.broadcastBeforeTransactionRollbackEvent = function (result) {
        var _this = this;
        if (this.queryRunner.connection.subscribers.length) {
            this.queryRunner.connection.subscribers.forEach(function (subscriber) {
                if (subscriber.beforeTransactionRollback) {
                    var executionResult = subscriber.beforeTransactionRollback({
                        connection: _this.queryRunner.connection,
                        queryRunner: _this.queryRunner,
                        manager: _this.queryRunner.manager,
                    });
                    if (executionResult instanceof Promise)
                        result.promises.push(executionResult);
                    result.count++;
                }
            });
        }
    };
    /**
     * Broadcasts "AFTER_TRANSACTION_ROLLBACK" event.
     */
    Broadcaster.prototype.broadcastAfterTransactionRollbackEvent = function (result) {
        var _this = this;
        if (this.queryRunner.connection.subscribers.length) {
            this.queryRunner.connection.subscribers.forEach(function (subscriber) {
                if (subscriber.afterTransactionRollback) {
                    var executionResult = subscriber.afterTransactionRollback({
                        connection: _this.queryRunner.connection,
                        queryRunner: _this.queryRunner,
                        manager: _this.queryRunner.manager,
                    });
                    if (executionResult instanceof Promise)
                        result.promises.push(executionResult);
                    result.count++;
                }
            });
        }
    };
    /**
     * Broadcasts "AFTER_UPDATE" event.
     * After update event is executed after entity is being updated in the database.
     * All subscribers and entity listeners who listened to this event will be executed at this point.
     * Subscribers and entity listeners can return promises, it will wait until they are resolved.
     *
     * Note: this method has a performance-optimized code organization, do not change code structure.
     */
    Broadcaster.prototype.broadcastAfterUpdateEvent = function (result, metadata, entity, databaseEntity, updatedColumns, updatedRelations) {
        var _this = this;
        if (entity && metadata.afterUpdateListeners.length) {
            metadata.afterUpdateListeners.forEach(function (listener) {
                if (listener.isAllowed(entity)) {
                    var executionResult = listener.execute(entity);
                    if (executionResult instanceof Promise)
                        result.promises.push(executionResult);
                    result.count++;
                }
            });
        }
        if (this.queryRunner.connection.subscribers.length) {
            this.queryRunner.connection.subscribers.forEach(function (subscriber) {
                if (_this.isAllowedSubscriber(subscriber, metadata.target) && subscriber.afterUpdate) {
                    var executionResult = subscriber.afterUpdate({
                        connection: _this.queryRunner.connection,
                        queryRunner: _this.queryRunner,
                        manager: _this.queryRunner.manager,
                        entity: entity,
                        metadata: metadata,
                        databaseEntity: databaseEntity,
                        updatedColumns: updatedColumns || [],
                        updatedRelations: updatedRelations || []
                    });
                    if (executionResult instanceof Promise)
                        result.promises.push(executionResult);
                    result.count++;
                }
            });
        }
    };
    /**
     * Broadcasts "AFTER_REMOVE" event.
     * After remove event is executed after entity is being removed from the database.
     * All subscribers and entity listeners who listened to this event will be executed at this point.
     * Subscribers and entity listeners can return promises, it will wait until they are resolved.
     *
     * Note: this method has a performance-optimized code organization, do not change code structure.
     */
    Broadcaster.prototype.broadcastAfterRemoveEvent = function (result, metadata, entity, databaseEntity) {
        var _this = this;
        if (entity && metadata.afterRemoveListeners.length) {
            metadata.afterRemoveListeners.forEach(function (listener) {
                if (listener.isAllowed(entity)) {
                    var executionResult = listener.execute(entity);
                    if (executionResult instanceof Promise)
                        result.promises.push(executionResult);
                    result.count++;
                }
            });
        }
        if (this.queryRunner.connection.subscribers.length) {
            this.queryRunner.connection.subscribers.forEach(function (subscriber) {
                if (_this.isAllowedSubscriber(subscriber, metadata.target) && subscriber.afterRemove) {
                    var executionResult = subscriber.afterRemove({
                        connection: _this.queryRunner.connection,
                        queryRunner: _this.queryRunner,
                        manager: _this.queryRunner.manager,
                        entity: entity,
                        metadata: metadata,
                        databaseEntity: databaseEntity,
                        entityId: metadata.getEntityIdMixedMap(databaseEntity)
                    });
                    if (executionResult instanceof Promise)
                        result.promises.push(executionResult);
                    result.count++;
                }
            });
        }
    };
    /**
     * @deprecated Use `broadcastLoadForAllEvent`
     */
    Broadcaster.prototype.broadcastLoadEventsForAll = function (result, metadata, entities) {
        return this.broadcastLoadEvent(result, metadata, entities);
    };
    /**
     * Broadcasts "AFTER_LOAD" event for all given entities, and their sub-entities.
     * After load event is executed after entity has been loaded from the database.
     * All subscribers and entity listeners who listened to this event will be executed at this point.
     * Subscribers and entity listeners can return promises, it will wait until they are resolved.
     *
     * Note: this method has a performance-optimized code organization, do not change code structure.
     */
    Broadcaster.prototype.broadcastLoadEvent = function (result, metadata, entities) {
        var _this = this;
        entities.forEach(function (entity) {
            if (entity instanceof Promise) // todo: check why need this?
                return;
            // collect load events for all children entities that were loaded with the main entity
            if (metadata.relations.length) {
                metadata.relations.forEach(function (relation) {
                    // in lazy relations we cannot simply access to entity property because it will cause a getter and a database query
                    if (relation.isLazy && !entity.hasOwnProperty(relation.propertyName))
                        return;
                    var value = relation.getEntityValue(entity);
                    if (value instanceof Object)
                        _this.broadcastLoadEvent(result, relation.inverseEntityMetadata, Array.isArray(value) ? value : [value]);
                });
            }
            if (metadata.afterLoadListeners.length) {
                metadata.afterLoadListeners.forEach(function (listener) {
                    if (listener.isAllowed(entity)) {
                        var executionResult = listener.execute(entity);
                        if (executionResult instanceof Promise)
                            result.promises.push(executionResult);
                        result.count++;
                    }
                });
            }
            if (_this.queryRunner.connection.subscribers.length) {
                _this.queryRunner.connection.subscribers.forEach(function (subscriber) {
                    if (_this.isAllowedSubscriber(subscriber, metadata.target) && subscriber.afterLoad) {
                        var executionResult = subscriber.afterLoad(entity, {
                            connection: _this.queryRunner.connection,
                            queryRunner: _this.queryRunner,
                            manager: _this.queryRunner.manager,
                            entity: entity,
                            metadata: metadata
                        });
                        if (executionResult instanceof Promise)
                            result.promises.push(executionResult);
                        result.count++;
                    }
                });
            }
        });
    };
    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------
    /**
     * Checks if subscriber's methods can be executed by checking if its don't listen to the particular entity,
     * or listens our entity.
     */
    Broadcaster.prototype.isAllowedSubscriber = function (subscriber, target) {
        return !subscriber.listenTo ||
            !subscriber.listenTo() ||
            subscriber.listenTo() === Object ||
            subscriber.listenTo() === target ||
            subscriber.listenTo().isPrototypeOf(target);
    };
    return Broadcaster;
}());
exports.Broadcaster = Broadcaster;

//# sourceMappingURL=Broadcaster.js.map

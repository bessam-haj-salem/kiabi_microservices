import { __awaiter, __extends, __generator } from "tslib";
import { QueryRunnerAlreadyReleasedError } from "../../error/QueryRunnerAlreadyReleasedError";
import { QueryFailedError } from "../../error/QueryFailedError";
import { AbstractSqliteQueryRunner } from "../sqlite-abstract/AbstractSqliteQueryRunner";
import { TransactionAlreadyStartedError } from "../../error/TransactionAlreadyStartedError";
import { TransactionNotStartedError } from "../../error/TransactionNotStartedError";
import { Broadcaster } from "../../subscriber/Broadcaster";
import { QueryResult } from "../../query-runner/QueryResult";
/**
 * Runs queries on a single sqlite database connection.
 */
var ExpoQueryRunner = /** @class */ (function (_super) {
    __extends(ExpoQueryRunner, _super);
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function ExpoQueryRunner(driver) {
        var _this = _super.call(this) || this;
        _this.driver = driver;
        _this.connection = driver.connection;
        _this.broadcaster = new Broadcaster(_this);
        return _this;
    }
    /**
     * Starts transaction. Within Expo, all database operations happen in a
     * transaction context, so issuing a `BEGIN TRANSACTION` command is
     * redundant and will result in the following error:
     *
     * `Error: Error code 1: cannot start a transaction within a transaction`
     *
     * Instead, we keep track of a `Transaction` object in `this.transaction`
     * and continue using the same object until we wish to commit the
     * transaction.
     */
    ExpoQueryRunner.prototype.startTransaction = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isTransactionActive && typeof this.transaction !== "undefined")
                            throw new TransactionAlreadyStartedError();
                        return [4 /*yield*/, this.broadcaster.broadcast('BeforeTransactionStart')];
                    case 1:
                        _a.sent();
                        this.isTransactionActive = true;
                        return [4 /*yield*/, this.broadcaster.broadcast('AfterTransactionStart')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Commits transaction.
     * Error will be thrown if transaction was not started.
     * Since Expo will automatically commit the transaction once all the
     * callbacks of the transaction object have been completed, "committing" a
     * transaction in this driver's context means that we delete the transaction
     * object and set the stage for the next transaction.
     */
    ExpoQueryRunner.prototype.commitTransaction = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isTransactionActive && typeof this.transaction === "undefined")
                            throw new TransactionNotStartedError();
                        return [4 /*yield*/, this.broadcaster.broadcast('BeforeTransactionCommit')];
                    case 1:
                        _a.sent();
                        this.isTransactionActive = false;
                        this.transaction = undefined;
                        return [4 /*yield*/, this.broadcaster.broadcast('AfterTransactionCommit')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Rollbacks transaction.
     * Error will be thrown if transaction was not started.
     * This method's functionality is identical to `commitTransaction()` because
     * the transaction lifecycle is handled within the Expo transaction object.
     * Issuing separate statements for `COMMIT` or `ROLLBACK` aren't necessary.
     */
    ExpoQueryRunner.prototype.rollbackTransaction = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isTransactionActive && typeof this.transaction === "undefined")
                            throw new TransactionNotStartedError();
                        return [4 /*yield*/, this.broadcaster.broadcast('BeforeTransactionRollback')];
                    case 1:
                        _a.sent();
                        this.isTransactionActive = false;
                        this.transaction = undefined;
                        return [4 /*yield*/, this.broadcaster.broadcast('AfterTransactionRollback')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Executes a given SQL query.
     */
    ExpoQueryRunner.prototype.query = function (query, parameters, useStructuredResult) {
        if (useStructuredResult === void 0) { useStructuredResult = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.isReleased)
                    throw new QueryRunnerAlreadyReleasedError();
                return [2 /*return*/, new Promise(function (ok, fail) { return __awaiter(_this, void 0, void 0, function () {
                        var databaseConnection, queryStartTime;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.connect()];
                                case 1:
                                    databaseConnection = _a.sent();
                                    this.driver.connection.logger.logQuery(query, parameters, this);
                                    queryStartTime = +new Date();
                                    // All Expo SQL queries are executed in a transaction context
                                    databaseConnection.transaction(function (transaction) {
                                        if (typeof _this.transaction === "undefined") {
                                            _this.startTransaction();
                                            _this.transaction = transaction;
                                        }
                                        _this.transaction.executeSql(query, parameters, function (t, raw) {
                                            // log slow queries if maxQueryExecution time is set
                                            var maxQueryExecutionTime = _this.driver.options.maxQueryExecutionTime;
                                            var queryEndTime = +new Date();
                                            var queryExecutionTime = queryEndTime - queryStartTime;
                                            if (maxQueryExecutionTime && queryExecutionTime > maxQueryExecutionTime) {
                                                _this.driver.connection.logger.logQuerySlow(queryExecutionTime, query, parameters, _this);
                                            }
                                            var result = new QueryResult();
                                            // return id of inserted row, if query was insert statement.
                                            if (query.substr(0, 11) === "INSERT INTO") {
                                                result.raw = raw.insertId;
                                            }
                                            if (raw === null || raw === void 0 ? void 0 : raw.hasOwnProperty('rowsAffected')) {
                                                result.affected = raw.rowsAffected;
                                            }
                                            if (raw === null || raw === void 0 ? void 0 : raw.hasOwnProperty('rows')) {
                                                var resultSet = [];
                                                for (var i = 0; i < raw.rows.length; i++) {
                                                    resultSet.push(raw.rows.item(i));
                                                }
                                                result.raw = resultSet;
                                                result.records = resultSet;
                                            }
                                            if (useStructuredResult) {
                                                ok(result);
                                            }
                                            else {
                                                ok(result.raw);
                                            }
                                        }, function (t, err) {
                                            _this.driver.connection.logger.logQueryError(err, query, parameters, _this);
                                            fail(new QueryFailedError(query, parameters, err));
                                        });
                                    }, function (err) {
                                        _this.rollbackTransaction();
                                    }, function () {
                                        _this.isTransactionActive = false;
                                        _this.transaction = undefined;
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return ExpoQueryRunner;
}(AbstractSqliteQueryRunner));
export { ExpoQueryRunner };

//# sourceMappingURL=ExpoQueryRunner.js.map

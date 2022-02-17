import { __awaiter, __extends, __generator } from "tslib";
import { QueryRunnerAlreadyReleasedError } from "../../error/QueryRunnerAlreadyReleasedError";
import { AbstractSqliteQueryRunner } from "../sqlite-abstract/AbstractSqliteQueryRunner";
import { Broadcaster } from "../../subscriber/Broadcaster";
import { QueryFailedError } from "../../error/QueryFailedError";
import { QueryResult } from "../../query-runner/QueryResult";
/**
 * Runs queries on a single sqlite database connection.
 */
var SqljsQueryRunner = /** @class */ (function (_super) {
    __extends(SqljsQueryRunner, _super);
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function SqljsQueryRunner(driver) {
        var _this = _super.call(this) || this;
        /**
         * Flag to determine if a modification has happened since the last time this query runner has requested a save.
         */
        _this.isDirty = false;
        _this.driver = driver;
        _this.connection = driver.connection;
        _this.broadcaster = new Broadcaster(_this);
        return _this;
    }
    // -------------------------------------------------------------------------
    // Public methods
    // -------------------------------------------------------------------------
    SqljsQueryRunner.prototype.flush = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isDirty) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.driver.autoSave()];
                    case 1:
                        _a.sent();
                        this.isDirty = false;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    SqljsQueryRunner.prototype.release = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.flush()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, _super.prototype.release.call(this)];
                }
            });
        });
    };
    /**
     * Commits transaction.
     * Error will be thrown if transaction was not started.
     */
    SqljsQueryRunner.prototype.commitTransaction = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.commitTransaction.call(this)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.flush()];
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
    SqljsQueryRunner.prototype.query = function (query, parameters, useStructuredResult) {
        if (parameters === void 0) { parameters = []; }
        if (useStructuredResult === void 0) { useStructuredResult = false; }
        return __awaiter(this, void 0, void 0, function () {
            var command, databaseConnection, queryStartTime, statement, maxQueryExecutionTime, queryEndTime, queryExecutionTime, records, result;
            return __generator(this, function (_a) {
                if (this.isReleased)
                    throw new QueryRunnerAlreadyReleasedError();
                command = query.trim().split(" ", 1)[0];
                databaseConnection = this.driver.databaseConnection;
                this.driver.connection.logger.logQuery(query, parameters, this);
                queryStartTime = +new Date();
                try {
                    statement = databaseConnection.prepare(query);
                    if (parameters) {
                        parameters = parameters.map(function (p) { return typeof p !== 'undefined' ? p : null; });
                        statement.bind(parameters);
                    }
                    maxQueryExecutionTime = this.driver.options.maxQueryExecutionTime;
                    queryEndTime = +new Date();
                    queryExecutionTime = queryEndTime - queryStartTime;
                    if (maxQueryExecutionTime && queryExecutionTime > maxQueryExecutionTime)
                        this.driver.connection.logger.logQuerySlow(queryExecutionTime, query, parameters, this);
                    records = [];
                    while (statement.step()) {
                        records.push(statement.getAsObject());
                    }
                    result = new QueryResult();
                    result.affected = databaseConnection.getRowsModified();
                    result.records = records;
                    result.raw = records;
                    statement.free();
                    if (command !== "SELECT") {
                        this.isDirty = true;
                    }
                    if (useStructuredResult) {
                        return [2 /*return*/, result];
                    }
                    else {
                        return [2 /*return*/, result.raw];
                    }
                }
                catch (e) {
                    if (statement) {
                        statement.free();
                    }
                    this.driver.connection.logger.logQueryError(e, query, parameters, this);
                    throw new QueryFailedError(query, parameters, e);
                }
                return [2 /*return*/];
            });
        });
    };
    return SqljsQueryRunner;
}(AbstractSqliteQueryRunner));
export { SqljsQueryRunner };

//# sourceMappingURL=SqljsQueryRunner.js.map

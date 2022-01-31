import { __awaiter, __extends, __generator, __read } from "tslib";
import { QueryRunnerAlreadyReleasedError } from "../../error/QueryRunnerAlreadyReleasedError";
import { TransactionAlreadyStartedError } from "../../error/TransactionAlreadyStartedError";
import { TransactionNotStartedError } from "../../error/TransactionNotStartedError";
import { PostgresQueryRunner } from "../postgres/PostgresQueryRunner";
import { QueryResult } from "../../query-runner/QueryResult";
var PostgresQueryRunnerWrapper = /** @class */ (function (_super) {
    __extends(PostgresQueryRunnerWrapper, _super);
    function PostgresQueryRunnerWrapper(driver, mode) {
        return _super.call(this, driver, mode) || this;
    }
    return PostgresQueryRunnerWrapper;
}(PostgresQueryRunner));
/**
 * Runs queries on a single postgres database connection.
 */
var AuroraDataApiPostgresQueryRunner = /** @class */ (function (_super) {
    __extends(AuroraDataApiPostgresQueryRunner, _super);
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function AuroraDataApiPostgresQueryRunner(driver, client, mode) {
        var _this = _super.call(this, driver, mode) || this;
        _this.client = client;
        return _this;
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Creates/uses database connection from the connection pool to perform further operations.
     * Returns obtained database connection.
     */
    AuroraDataApiPostgresQueryRunner.prototype.connect = function () {
        var _this = this;
        if (this.databaseConnection)
            return Promise.resolve(this.databaseConnection);
        if (this.databaseConnectionPromise)
            return this.databaseConnectionPromise;
        if (this.mode === "slave" && this.driver.isReplicated) {
            this.databaseConnectionPromise = this.driver.obtainSlaveConnection().then(function (_a) {
                var _b = __read(_a, 2), connection = _b[0], release = _b[1];
                _this.driver.connectedQueryRunners.push(_this);
                _this.databaseConnection = connection;
                _this.releaseCallback = release;
                return _this.databaseConnection;
            });
        }
        else { // master
            this.databaseConnectionPromise = this.driver.obtainMasterConnection().then(function (_a) {
                var _b = __read(_a, 2), connection = _b[0], release = _b[1];
                _this.driver.connectedQueryRunners.push(_this);
                _this.databaseConnection = connection;
                _this.releaseCallback = release;
                return _this.databaseConnection;
            });
        }
        return this.databaseConnectionPromise;
    };
    /**
     * Starts transaction on the current connection.
     */
    AuroraDataApiPostgresQueryRunner.prototype.startTransaction = function (isolationLevel) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isTransactionActive)
                            throw new TransactionAlreadyStartedError();
                        return [4 /*yield*/, this.broadcaster.broadcast('BeforeTransactionStart')];
                    case 1:
                        _a.sent();
                        this.isTransactionActive = true;
                        return [4 /*yield*/, this.client.startTransaction()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.broadcaster.broadcast('AfterTransactionStart')];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Commits transaction.
     * Error will be thrown if transaction was not started.
     */
    AuroraDataApiPostgresQueryRunner.prototype.commitTransaction = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isTransactionActive)
                            throw new TransactionNotStartedError();
                        return [4 /*yield*/, this.broadcaster.broadcast('BeforeTransactionCommit')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.client.commitTransaction()];
                    case 2:
                        _a.sent();
                        this.isTransactionActive = false;
                        return [4 /*yield*/, this.broadcaster.broadcast('AfterTransactionCommit')];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Rollbacks transaction.
     * Error will be thrown if transaction was not started.
     */
    AuroraDataApiPostgresQueryRunner.prototype.rollbackTransaction = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isTransactionActive)
                            throw new TransactionNotStartedError();
                        return [4 /*yield*/, this.broadcaster.broadcast('BeforeTransactionRollback')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.client.rollbackTransaction()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.broadcaster.broadcast('AfterTransactionRollback')];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Executes a given SQL query.
     */
    AuroraDataApiPostgresQueryRunner.prototype.query = function (query, parameters, useStructuredResult) {
        if (useStructuredResult === void 0) { useStructuredResult = false; }
        return __awaiter(this, void 0, void 0, function () {
            var raw, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isReleased)
                            throw new QueryRunnerAlreadyReleasedError();
                        return [4 /*yield*/, this.client.query(query, parameters)];
                    case 1:
                        raw = _a.sent();
                        result = new QueryResult();
                        result.raw = raw;
                        if ((raw === null || raw === void 0 ? void 0 : raw.hasOwnProperty('records')) && Array.isArray(raw.records)) {
                            result.records = raw.records;
                        }
                        if (raw === null || raw === void 0 ? void 0 : raw.hasOwnProperty('numberOfRecordsUpdated')) {
                            result.affected = raw.numberOfRecordsUpdated;
                        }
                        if (!useStructuredResult) {
                            return [2 /*return*/, result.raw];
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return AuroraDataApiPostgresQueryRunner;
}(PostgresQueryRunnerWrapper));
export { AuroraDataApiPostgresQueryRunner };

//# sourceMappingURL=AuroraDataApiPostgresQueryRunner.js.map

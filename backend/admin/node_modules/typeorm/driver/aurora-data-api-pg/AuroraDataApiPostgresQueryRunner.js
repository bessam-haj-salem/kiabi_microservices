"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuroraDataApiPostgresQueryRunner = void 0;
var tslib_1 = require("tslib");
var QueryRunnerAlreadyReleasedError_1 = require("../../error/QueryRunnerAlreadyReleasedError");
var TransactionAlreadyStartedError_1 = require("../../error/TransactionAlreadyStartedError");
var TransactionNotStartedError_1 = require("../../error/TransactionNotStartedError");
var PostgresQueryRunner_1 = require("../postgres/PostgresQueryRunner");
var QueryResult_1 = require("../../query-runner/QueryResult");
var PostgresQueryRunnerWrapper = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(PostgresQueryRunnerWrapper, _super);
    function PostgresQueryRunnerWrapper(driver, mode) {
        return _super.call(this, driver, mode) || this;
    }
    return PostgresQueryRunnerWrapper;
}(PostgresQueryRunner_1.PostgresQueryRunner));
/**
 * Runs queries on a single postgres database connection.
 */
var AuroraDataApiPostgresQueryRunner = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(AuroraDataApiPostgresQueryRunner, _super);
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
                var _b = (0, tslib_1.__read)(_a, 2), connection = _b[0], release = _b[1];
                _this.driver.connectedQueryRunners.push(_this);
                _this.databaseConnection = connection;
                _this.releaseCallback = release;
                return _this.databaseConnection;
            });
        }
        else { // master
            this.databaseConnectionPromise = this.driver.obtainMasterConnection().then(function (_a) {
                var _b = (0, tslib_1.__read)(_a, 2), connection = _b[0], release = _b[1];
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
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isTransactionActive)
                            throw new TransactionAlreadyStartedError_1.TransactionAlreadyStartedError();
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
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isTransactionActive)
                            throw new TransactionNotStartedError_1.TransactionNotStartedError();
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
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isTransactionActive)
                            throw new TransactionNotStartedError_1.TransactionNotStartedError();
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
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var raw, result;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isReleased)
                            throw new QueryRunnerAlreadyReleasedError_1.QueryRunnerAlreadyReleasedError();
                        return [4 /*yield*/, this.client.query(query, parameters)];
                    case 1:
                        raw = _a.sent();
                        result = new QueryResult_1.QueryResult();
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
exports.AuroraDataApiPostgresQueryRunner = AuroraDataApiPostgresQueryRunner;

//# sourceMappingURL=AuroraDataApiPostgresQueryRunner.js.map

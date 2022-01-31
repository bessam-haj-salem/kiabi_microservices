"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CordovaDriver = void 0;
var tslib_1 = require("tslib");
var AbstractSqliteDriver_1 = require("../sqlite-abstract/AbstractSqliteDriver");
var CordovaQueryRunner_1 = require("./CordovaQueryRunner");
var DriverOptionNotSetError_1 = require("../../error/DriverOptionNotSetError");
var DriverPackageNotInstalledError_1 = require("../../error/DriverPackageNotInstalledError");
var CordovaDriver = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(CordovaDriver, _super);
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function CordovaDriver(connection) {
        var _this = _super.call(this, connection) || this;
        // this.connection = connection;
        // this.options = connection.options as CordovaConnectionOptions;
        _this.database = _this.options.database;
        // validate options to make sure everything is set
        if (!_this.options.database)
            throw new DriverOptionNotSetError_1.DriverOptionNotSetError("database");
        if (!_this.options.location)
            throw new DriverOptionNotSetError_1.DriverOptionNotSetError("location");
        // load sqlite package
        _this.loadDependencies();
        return _this;
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Closes connection with database.
     */
    CordovaDriver.prototype.disconnect = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var _this = this;
            return (0, tslib_1.__generator)(this, function (_a) {
                this.queryRunner = undefined;
                return [2 /*return*/, new Promise(function (ok, fail) {
                        _this.databaseConnection.close(ok, fail);
                    })];
            });
        });
    };
    /**
     * Creates a query runner used to execute database queries.
     */
    CordovaDriver.prototype.createQueryRunner = function (mode) {
        if (!this.queryRunner)
            this.queryRunner = new CordovaQueryRunner_1.CordovaQueryRunner(this);
        return this.queryRunner;
    };
    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------
    /**
     * Creates connection with the database.
     */
    CordovaDriver.prototype.createDatabaseConnection = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var options, connection;
            var _this = this;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = Object.assign({}, {
                            name: this.options.database,
                            location: this.options.location,
                        }, this.options.extra || {});
                        return [4 /*yield*/, new Promise(function (resolve) {
                                _this.sqlite.openDatabase(options, function (db) { return resolve(db); });
                            })];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, new Promise(function (ok, fail) {
                                // we need to enable foreign keys in sqlite to make sure all foreign key related features
                                // working properly. this also makes onDelete to work with sqlite.
                                connection.executeSql("PRAGMA foreign_keys = ON;", [], function () { return ok(); }, function (err) { return fail(err); });
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, connection];
                }
            });
        });
    };
    /**
     * If driver dependency is not given explicitly, then try to load it via "require".
     */
    CordovaDriver.prototype.loadDependencies = function () {
        try {
            var sqlite = this.options.driver || window.sqlitePlugin;
            this.sqlite = sqlite;
        }
        catch (e) {
            throw new DriverPackageNotInstalledError_1.DriverPackageNotInstalledError("Cordova-SQLite", "cordova-sqlite-storage");
        }
    };
    return CordovaDriver;
}(AbstractSqliteDriver_1.AbstractSqliteDriver));
exports.CordovaDriver = CordovaDriver;

//# sourceMappingURL=CordovaDriver.js.map

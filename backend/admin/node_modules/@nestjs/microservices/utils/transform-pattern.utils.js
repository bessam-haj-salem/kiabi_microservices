"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformPatternToRoute = void 0;
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
/**
 * Transforms the Pattern to Route.
 * 1. If Pattern is a `string`, it will be returned as it is.
 * 2. If Pattern is a `number`, it will be converted to `string`.
 * 3. If Pattern is a `JSON` object, it will be transformed to Route. For that end,
 * the function will sort properties of `JSON` Object and creates `route` string
 * according to the following template:
 * <key1>:<value1>/<key2>:<value2>/.../<keyN>:<valueN>
 *
 * @param  {MsPattern} pattern - client pattern
 * @returns string
 */
function transformPatternToRoute(pattern) {
    if (shared_utils_1.isString(pattern) || shared_utils_1.isNumber(pattern)) {
        return `${pattern}`;
    }
    if (!shared_utils_1.isObject(pattern)) {
        return pattern;
    }
    const sortedKeys = Object.keys(pattern).sort((a, b) => ('' + a).localeCompare(b));
    // Creates the array of Pattern params from sorted keys and their corresponding values
    const sortedPatternParams = sortedKeys.map(key => {
        let partialRoute = `"${key}":`;
        partialRoute += shared_utils_1.isString(pattern[key])
            ? `"${transformPatternToRoute(pattern[key])}"`
            : transformPatternToRoute(pattern[key]);
        return partialRoute;
    });
    const route = sortedPatternParams.join(',');
    return `{${route}}`;
}
exports.transformPatternToRoute = transformPatternToRoute;

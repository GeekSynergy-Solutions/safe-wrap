import safeWrap from "./package/safeWrap.js"

const _safeWrap = new safeWrap.SafeWrap();

const safeWarpSync = ({ tryFn = () => undefined,
    fallbackValue,
    fallbackFn,
    throwOnFail = false }) => _safeWrap.runSync(tryFn, fallbackValue, fallbackFn, throwOnFail);

const safeWarpASync = ({ tryFn = async () => undefined,
    fallbackValue,
    fallbackFn,
    redirectUrl,
    checkRouteExists = async () => true,
    throwOnFail = false }) => _safeWrap.runAsync(tryFn, fallbackValue, fallbackFn, redirectUrl, checkRouteExists, throwOnFail);


export default {safeWarpSync, safeWarpASync};    
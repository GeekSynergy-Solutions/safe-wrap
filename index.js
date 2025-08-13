import safeWrap from "./package/safeWrapClass.js"

const _safeWrap = new safeWrap.SafeWrapClass();

const safeValue = ({givenValue: givenValue, fallbackValue: fallbackValue}) => _safeWrap.runValidValue(givenValue, {fallbackValue: fallbackValue});

const safeWarpSyncFun = ({ tryFn = () => undefined,
    fallbackValue,
    fallbackFn,
    throwOnFail = false }) => _safeWrap.runSyncFun({ tryFn: tryFn, fallbackValue: fallbackValue, fallbackFn: fallbackFn, throwOnFail: throwOnFail });

const safeWarpASyncFun = ({ tryFn = () => undefined,
    fallbackValue,
    fallbackFn,
    redirectUrl,
    checkRouteExists = async () => true,
    throwOnFail = false }) => _safeWrap.runAsyncFun({ tryFn: tryFn, fallbackValue: fallbackValue, fallbackFn: fallbackFn, redirectUrl: redirectUrl, checkRouteExists: checkRouteExists, throwOnFail: throwOnFail });


export default { safeWarpSyncFun, safeWarpASyncFun, safeValue };

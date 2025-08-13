import protectedconsole from "protectedconsole";
class SafeWrapClass {
    constructor() {
    }

    runValidValue(givenValue, {
        fallbackValue,
    }) {
        if (givenValue === null || givenValue === undefined || this.isResultNaN(givenValue)) {
            if (fallbackValue !== null && fallbackValue !== undefined && fallbackValue !== NaN) {
                return fallbackValue;
            }
        }
        return givenValue;
    }

    isResultNaN(givenValue) {
        return typeof givenValue ? Number.isNaN(givenValue) : false;
    }
    
    isFunction(value) {
        return typeof value === 'function';
    }

    _getRightFunctionData(tryFn = () => undefined){
        return tryFn();
    }

    runSyncFun({
        tryFn = () => undefined,
        fallbackValue,
        fallbackFn,
        throwOnFail = false
    } = {}) {
        try {
            
            const result = tryFn();

            if (result === null || result === undefined || this.isResultNaN(result)) {
                if (fallbackFn) {
                    const fallbackResult = fallbackFn();
                    if (fallbackResult !== null && fallbackResult !== undefined && !this.isResultNaN(fallbackFn)) {
                        return fallbackResult;
                    }
                }
                if (fallbackValue !== null && fallbackValue !== undefined && !this.isResultNaN(fallbackValue)) {
                    return fallbackValue;
                }

                if (throwOnFail) {
                    throw new Error("safeWrapSyncFun: result and fallback are null or undefined");
                }
                return undefined;
            }

            return result;
        } catch (error) {
            protectedconsole.protectedDebugData(`safeWrapSyncFun caught an error: ${error}`);

            if (fallbackFn) {
                try {
                    const fallbackResult = fallbackFn();
                    if (fallbackResult !== null && fallbackResult !== undefined && !this.isResultNaN(fallbackResult)) {
                        return fallbackResult;
                    }
                } catch (fallbackError) {
                    protectedconsole.protectedDebugData(`Fallback function also failed: ${fallbackError}`);
                }
            }

            if (fallbackValue !== null && fallbackValue !== undefined && !this.isResultNaN(fallbackValue)) {
                return fallbackValue;
            }

            if (throwOnFail) {
                throw error;
            }

            return undefined;
        }
    }

    async runAsyncFun({
        tryFn = async () => undefined,
        fallbackValue,
        fallbackFn,
        redirectUrl,
        checkRouteExists = async () => true,
        throwOnFail = false
    } = {}) {
        try {
            const result = await tryFn();

            if (result === null || result === undefined || this.isResultNaN(result)) {
                if (fallbackFn) {
                    const fallbackResult = await fallbackFn();
                    if (fallbackResult !== null && fallbackResult !== undefined && !this.isResultNaN(fallbackResult)) {
                        return fallbackResult;
                    }
                }

                if (fallbackValue !== null && fallbackValue !== undefined && !this.isResultNaN(fallbackValue)) {
                    return fallbackValue;
                }

                if (throwOnFail) {
                    throw new Error("safeWrapAsyncFun: result and fallback are null or undefined");
                }
                return undefined;
            }

            return result;

        } catch (error) {
            protectedconsole.protectedDebugData(`safeWrapAsyncFun caught an error: ${error}`);

            if (redirectUrl && typeof window !== "undefined") {
                const routeOk = await checkRouteExists(redirectUrl);
                if (routeOk) {
                    window.location.href = redirectUrl;
                    return;
                }
            }

            if (fallbackFn) {
                try {
                    const fallbackResult = await fallbackFn();
                    if (fallbackResult !== null && fallbackResult !== undefined && !this.isResultNaN(fallbackResult)) {
                        return fallbackResult;
                    }
                } catch (fallbackError) {
                    protectedconsole.protectedDebugData(`Fallback function also failed: ${fallbackError}`);
                }
            }

            if (fallbackValue !== null && fallbackValue !== undefined && !this.isResultNaN(fallbackValue)) {
                return fallbackValue;
            }

            if (throwOnFail) {
                throw error;
            }

            return undefined;
        }
    }
}

export default { SafeWrapClass }

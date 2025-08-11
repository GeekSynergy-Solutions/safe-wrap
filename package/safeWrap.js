import protectedconsole from "protectedconsole";
class SafeWrap {
    constructor (){
    }
    
    runSync({
        tryFn = () => undefined,
        fallbackValue,
        fallbackFn,
        throwOnFail = false
    } = {}) {
        try {
            const result = tryFn();

            if (result === null || result === undefined) {
                if (fallbackFn) {
                    const fallbackResult = fallbackFn();
                    if (fallbackResult !== null && fallbackResult !== undefined) {
                        return fallbackResult;
                    }
                }
                if (fallbackValue !== null && fallbackValue !== undefined) {
                    return fallbackValue;
                }

                if (throwOnFail) {
                    throw new Error("safeWrapSync: result and fallback are null or undefined");
                }
                return undefined;
            }

            return result;
        } catch (error) {
            protectedconsole.protectedDebugData(`safeWrapSync caught an error: ${error}`);

            if (fallbackFn) {
                try {
                    const fallbackResult = fallbackFn();
                    if (fallbackResult !== null && fallbackResult !== undefined) {
                        return fallbackResult;
                    }
                } catch (fallbackError) {
                    protectedconsole.protectedDebugData(`Fallback function also failed: ${fallbackError}`);
                }
            }

            if (fallbackValue !== null && fallbackValue !== undefined) {
                return fallbackValue;
            }

            if (throwOnFail) {
                throw error;
            }

            return undefined;
        }
    }

    async runAsync({
        tryFn = async () => undefined,
        fallbackValue,
        fallbackFn,
        redirectUrl,
        checkRouteExists = async () => true,
        throwOnFail = false
    } = {}) {
        try {
            const result = await tryFn();

            if (result === null || result === undefined) {
                if (fallbackFn) {
                    const fallbackResult = await fallbackFn();
                    if (fallbackResult !== null && fallbackResult !== undefined) {
                        return fallbackResult;
                    }
                }

                if (fallbackValue !== null && fallbackValue !== undefined) {
                    return fallbackValue;
                }

                if (throwOnFail) {
                    throw new Error("safeWrap: result and fallback are null or undefined");
                }
                return undefined;
            }

            return result;

        } catch (error) {
            protectedconsole.protectedDebugData(`safeWrap caught an error: ${error}`);

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
                    if (fallbackResult !== null && fallbackResult !== undefined) {
                        return fallbackResult;
                    }
                } catch (fallbackError) {
                    protectedconsole.protectedDebugData(`Fallback function also failed: ${fallbackError}`);
                }
            }

            if (fallbackValue !== null && fallbackValue !== undefined) {
                return fallbackValue;
            }

            if (throwOnFail) {
                throw error;
            }

            return undefined;
        }
    }
}

export default {SafeWrap}

import protectedconsole from "protectedconsole";
import safeWrap from "./index.js";

const sum = null + undefined;

const result = safeWrap.safeValue({
    givenValue: sum,
});

const helloSyncFun = safeWrap.safeWarpSyncFun({
    tryFn: () => null,
    fallbackFn: () => 'Hello',
});

const helloAsyncFun = safeWrap.safeWarpASyncFun({
    tryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return nul;
    },
    fallbackFn: () => 'Hello async',
});

protectedconsole.protectedInfoData(result);

protectedconsole.protectedInfoData(helloSyncFun);

protectedconsole.protectedInfoData(`${await helloAsyncFun}`);

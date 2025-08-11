import protectedConsoleClass from "./package/protected_console_class.js";

var _protectedConsole = new protectedConsoleClass.ProtectedConsoleClass();

var protectedLogData = (protectedData, showProtectedData = false) => _protectedConsole.logData(protectedData, showProtectedData);
var protectedWarningData = (protectedData, showProtectedData = false) => _protectedConsole.warningData(protectedData, showProtectedData);
var protectedInfoData = (protectedData, showProtectedData = false) => _protectedConsole.infoData(protectedData, showProtectedData);
var protectedDebugData = (protectedData, showProtectedData = false) => _protectedConsole.debugData(protectedData, showProtectedData);

export default { protectedLogData, protectedWarningData, protectedInfoData, protectedDebugData }

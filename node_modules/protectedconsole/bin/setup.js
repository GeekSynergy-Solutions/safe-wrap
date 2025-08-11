#!/usr/bin/env node

import protectedConsoleClass from '../package/protected_console_class.js';

const logger = new protectedConsoleClass.ProtectedConsoleClass(true);

logger.debugData("Custom setup complete.");

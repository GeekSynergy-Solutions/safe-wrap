import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

class ProtectedConsoleClass {
    constructor(fromCli = false) {
        if (process.env.NODE_ENV !== 'production') {
            const envPathFile = path.join(this._getDirName(), 'project_updated_env_path.txt');

            if (fs.existsSync(envPathFile) && !fromCli) {
                var saveEnvPath = fs.readFileSync(envPathFile, 'utf-8').trim();
                this._checkSavedEnvFilePath(saveEnvPath);
            } else {
                this._configuringProjectNewEnvPath();
            }
        }
        this.forProd = (process.env.NODE_ENV === 'production');
    }

    _checkSavedEnvFilePath(saveEnvPath) {
        if (fs.existsSync(saveEnvPath)) {
            dotenv.config({ path: saveEnvPath });
        } else {
            this.warningData(`⚠️  Update project env file by running npx protectedconsole -- --env=[file_path], ${saveEnvPath} no longer exist.`);
        }
    }

    _configuringProjectNewEnvPath() {
        const envPath = this._getEnvPathFromArgs();
        if (fs.existsSync(envPath)) {
            dotenv.config({ path: envPath });
            this.logData(`⚠️ Environment variables file, ${envPath} loaded.`);
            this._setTheUpdateEnvFile(envPath);
            this.infoData(`⚠️ NODE_ENV: ${process.env.NODE_ENV}`);
        } else {
            this.warningData(`⚠️  Default env file not found at ${envPath}, therefore falling back to default.`);
            dotenv.config({ path: envPath });
            this._setTheUpdateEnvFile('.env');
        }
    }

    _getDirName() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        return __dirname;
    }

    _setTheUpdateEnvFile(envPath) {
        const envPathFile = path.join(this._getDirName(), 'project_updated_env_path.txt');
        fs.writeFileSync(envPathFile, envPath, 'utf-8');
    }

    _getEnvPathFromArgs() {
        const envArgPrefix = '--env=';
        const envArg = process.argv.find(arg => arg.startsWith(envArgPrefix));
        let providedPath = '.env';
        if (envArg) {
            providedPath = envArg.slice(envArgPrefix.length);
        }
        return providedPath;
    }

    logData(data, stillDisplayData = false) {
        const forProd = this.forProd;
        if (!forProd || stillDisplayData) {
            console.log(data);
        }
    }

    warningData(data, stillDisplayData = false) {
        const forProd = this.forProd;
        if (!forProd || stillDisplayData) {
            console.warn(data);
        }
    }

    infoData(data, stillDisplayData = false) {
        const forProd = this.forProd;
        if (!forProd || stillDisplayData) {
            console.info(data);
        }
    }

    debugData(data, stillDisplayData = false) {
        const forProd = this.forProd;
        if (!forProd || stillDisplayData) {
            console.debug(data);
        }
    }
}

export default { ProtectedConsoleClass }

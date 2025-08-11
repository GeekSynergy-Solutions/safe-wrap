# 🧼 protectedconsole

[![npm version](https://img.shields.io/npm/v/protectedconsole.svg)](https://www.npmjs.com/package/protectedconsole)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub Repo](https://img.shields.io/badge/github-GeeksSynergy--Solutions%2Fprotectedconsole-blue?logo=github)](https://github.com/GeekSynergy-Solutions/protectedconsole)

> ✅ Secure, environment-aware logging utility for Node.js and browser apps — suppress console output in production, log freely in development.

---

## 📦 Install

```bash
npm install protectedconsole
```

or

```bash
yarn add protectedconsole
```

---

## Setup
protectedconsole requires your project’s environment file (.env) to be specified and expects NODE_ENV to be set within it. To indicate that your project is running in production, set NODE_ENV=production in your env file. Use the appropriate command and installation steps to let protectedconsole know which environment file your project is using.

```bash
npx protectedconsole -- --env=.env
```

## 🛠 Usage

```js
import protectedconsole from 'protectedconsole';

const userData = {
  name: 'Alice',
  token: 'secret-token-123',
};

// Will log only in non-production environments
protectedconsole.protectedLogData(userData);

// Will always log, even in production
protectedconsole.protectedWarningData('This warning is always shown!', true);

// Suppressed in production by default
protectedconsole.protectedInfoData({ status: 'Init complete' });

// Force debug log in all environments
protectedconsole.protectedDebugData('Debugging info', true);
```

---

## 🌐 How It Works

The internal check is based on the environment:

```js
process.env.NODE_ENV !== 'production'
```

### 🔒 Behavior Summary

| Function               | Dev (default) | Prod (default) | Override with `true` |
| ---------------------- | ------------- | -------------- | -------------------- |
| `protectedLogData`     | ✅ Shown       | ❌ Hidden       | ✅ Forced if `true`   |
| `protectedWarningData` | ✅ Shown       | ❌ Hidden       | ✅ Forced if `true`   |
| `protectedInfoData`    | ✅ Shown       | ❌ Hidden       | ✅ Forced if `true`   |
| `protectedDebugData`   | ✅ Shown       | ❌ Hidden       | ✅ Forced if `true`   |

---

## 🔧 API

Each method is a wrapper around native console methods, with protection based on the environment, which you can override if need be anywhere.

### `protectedLogData(data: any, showProtectedData?: boolean)`

Logs using `console.log`.

### `protectedWarningData(data: any, showProtectedData?: boolean)`

Logs using `console.warn`.

### `protectedInfoData(data: any, showProtectedData?: boolean)`

Logs using `console.info`.

### `protectedDebugData(data: any, showProtectedData?: boolean)`

Logs using `console.debug`.

---

## 📂 Project Structure

```
protectedconsole/
├── index.js
├── package/
│   └── protected_console_class.js
├── package.json
└── README.md
```

---

## 📍 Repository

GitHub: [GeekSynergy-Solutions/protectedconsole](https://github.com/GeekSynergy-Solutions/protectedconsole)

Clone:

```bash
git clone https://github.com/GeekSynergy-Solutions/protectedconsole.git
```

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork this repo
2. Create a new branch (`git checkout -b feature/new`)
3. Commit your changes
4. Open a pull request

---

## 📄 License

MIT © [GeekSynergy Solutions](https://github.com/GeekSynergy-Solutions)

---

## 💡 Tip

Use with:

```js
const isDev = process.env.NODE_ENV !== 'production';
protectedconsole.protectedInfoData('Hello Dev!', isDev);
```

This gives you precise control over logging in your apps or internal tools.

---

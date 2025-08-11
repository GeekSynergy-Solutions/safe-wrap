# safe-wrap

> 🛡️ Safely wrap JavaScript functions and values with fallbacks, redirection, and graceful error handling — no TypeScript required.

---

## 🚀 Overview

`safe-wrap` is a lightweight utility designed to protect your JavaScript applications from runtime crashes. Whether you're working in legacy JS or migrating to TypeScript, this tool gives you a simple way to:

- Handle unexpected `null`/`undefined` values
- Catch runtime errors in function execution
- Provide fallback values or functions
- Redirect users to an error or fallback page (only if the route exists)
- Apply safety logic without rewriting your entire codebase

---

## 📦 Installation

```bash
npm install safe-wrap
````

or

```bash
yarn add safe-wrap
```

---

## 🧠 Usage

### Import

```js
import { safeWrap } from "safe-wrap";
```

### Basic Usage

```js
const result = await safeWrap({
  tryFn: () => riskyFunction(),
  fallbackValue: "default",
});
```

### With Fallback Function

```js
const data = await safeWrap({
  tryFn: () => fetchDataFromAPI(),
  fallbackFn: () => getCachedData()
});
```

### With Redirection (if route exists)

```js
await safeWrap({
  tryFn: () => loadUserProfile(),
  redirectUrl: "/error",
  checkRouteExists: async (url) => myRouter.hasRoute(url),
});
```

---

## ✅ Parameters

| Option             | Type                                | Required | Description                                                |
| ------------------ | ----------------------------------- | -------- | ---------------------------------------------------------- |
| `tryFn`            | `() => any \| Promise<any>`         | ❌        | Function to safely execute.                                |
| `fallbackValue`    | `any`                               | ❌        | Value to return if an error occurs.                        |
| `fallbackFn`       | `() => any \| Promise<any>`         | ❌        | Function to run as fallback if `tryFn` fails.              |
| `redirectUrl`      | `string`                            | ❌        | URL to redirect to if an error occurs.                     |
| `checkRouteExists` | `(url: string) => Promise<boolean>` | ❌        | Optional async check before redirect.                      |
| `throwOnFail`      | `boolean`                           | ❌        | Rethrow the error if all fallbacks fail. Default: `false`. |

---

## 🌍 Global Usage (Optional)

You can catch unhandled errors at the app level too:

```js
window.onerror = function (msg, src, line, col, err) {
  safeWrap({
    tryFn: () => { throw err },
    redirectUrl: "/error"
  });
};

window.onunhandledrejection = function (e) {
  safeWrap({
    tryFn: () => { throw e.reason },
    redirectUrl: "/error"
  });
};
```

---

## 🛠 Example Use Cases

* Wrapping risky component logic or API calls
* Preventing white-screen errors in production
* Adding graceful degradation in old JavaScript apps
* Transition helper for teams slowly adopting TypeScript


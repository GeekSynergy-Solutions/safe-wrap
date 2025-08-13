# safe-wrap

> 🛡️ Safely wrap JavaScript functions and values with fallbacks, redirection, and graceful error handling — no TypeScript required.

---

## 🚀 Overview

`safe-wrap` is a lightweight utility designed to protect your JavaScript applications from runtime crashes. Whether you're working in legacy JS or migrating to TypeScript, this tool gives you a simple way to:

* Handle unexpected `null`/`undefined` values
* Catch runtime errors in **sync or async** function execution
* Provide fallback values or functions
* Redirect users to an error or fallback page (if the route exists)
* Apply safety logic without rewriting your entire codebase

---

## 📦 Installation

```bash
npm install safe-wrap
```

or

```bash
yarn add safe-wrap
```

---

## 🧠 Usage

### Import

```js
import safeWrap from "safe-wrap";
```

> This gives you access to:
>
> * `safeWrap.safeWarpSyncFun`
> * `safeWrap.safeWarpASyncFun`
> * `safeWrap.safeValue`

---

### 1. Wrap Synchronous Function

```js
const result = safeWrap.safeWarpSyncFun({
  tryFn: () => riskyLogic(),
  fallbackValue: "default",
});
```

### 2. Wrap Asynchronous Function

```js
const result = await safeWrap.safeWarpASyncFun({
  tryFn: async () => await fetchUserData(),
  fallbackFn: () => getCachedUserData(),
});
```

### 3. With Redirection (if route exists)

```js
await safeWrap.safeWarpASyncFun({
  tryFn: () => loadProfile(),
  redirectUrl: "/error",
  checkRouteExists: async (url) => router.hasRoute(url),
});
```

### 4. Safe Value Fallback

```js
const username = safeWrap.safeValue({
  givenValue: maybeNullUsername,
  fallbackValue: "Guest",
});
```

---

## ✅ Parameters

| Option             | Type                                | Required | Description                                            |
| ------------------ | ----------------------------------- | -------- | ------------------------------------------------------ |
| `tryFn`            | `() => any \| Promise<any>`         | ❌        | Function to safely execute.                            |
| `fallbackValue`    | `any`                               | ❌        | Value to return if an error occurs.                    |
| `fallbackFn`       | `() => any \| Promise<any>`         | ❌        | Function to run as fallback if `tryFn` fails.          |
| `redirectUrl`      | `string`                            | ❌        | URL to redirect to if an error occurs.                 |
| `checkRouteExists` | `(url: string) => Promise<boolean>` | ❌        | Optional async check before redirecting.               |
| `throwOnFail`      | `boolean`                           | ❌        | Rethrow error if all fallbacks fail. Default: `false`. |

---

## 🌍 Global Usage (Optional)

Catch unhandled errors globally:

```js
window.onerror = function (msg, src, line, col, err) {
  safeWrap.safeWarpSyncFun({
    tryFn: () => { throw err },
    redirectUrl: "/error"
  });
};

window.onunhandledrejection = function (e) {
  safeWrap.safeWarpASyncFun({
    tryFn: () => { throw e.reason },
    redirectUrl: "/error"
  });
};
```

---

## 🧱 Safe Wrap for App Initialization

You can use `safe-wrap` to protect your **entire app entry point**, preventing fatal runtime crashes during initial load:

### Example: Vue.js App

```js
import safeWrap from "safe-wrap";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

safeWrap.safeWarpSyncFun({
  tryFn: () => {
    const app = createApp(App);
    app.use(router);
    app.mount("#app");
  },
  fallbackFn: () => {
    // Fallback UI or redirect
    window.location.href = "/error";
  },
});
```

### Example: React App

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import safeWrap from "safe-wrap";

safeWrap.safeWarpSyncFun({
  tryFn: () => {
    ReactDOM.render(<App />, document.getElementById("root"));
  },
  fallbackFn: () => {
    document.body.innerHTML = `<h1>Something went wrong. Please refresh or contact support.</h1>`;
  },
});
```

## 🛠 Example Use Cases

* Wrapping risky component logic or API calls
* Preventing white-screen errors in production
* Adding graceful degradation in legacy JavaScript apps
* A transition helper while migrating to TypeScript
* ✅ **Safely bootstrapping the entire application (e.g., React/Vue apps)**

# Redux Connect for Web Components  [![](https://img.shields.io/npm/v/lite-redux.svg?style=flat)](https://www.npmjs.com/package/lite-redux) ![](https://img.shields.io/bundlephobia/minzip/lite-redux.svg?style=flat)

Redux Connect HOC for Web Components. It's also works for LitElement.

## Usage

The function that is exported from the package gets store as an argument and returns connect HoC, which you can use just like the standard Redux connect (e.g. react-redux). Simple usage looks like this:

```js
import connect from "lite-redux";
...

connect(store)(mapStateToProps, mapDispatchToProps)(Component)
```

But it is more concise to make connect with store and use it everywhere in your project:

```js
// store.js
import { createStore, combineReducers } from "redux";
import makeConnect from "lite-redux";

const reducer = combineReducers({ ... });

const store = createStore(reducer);

export default store;

export const connect = makeConnect(store);
```

```js
// Component.js
import { connect } from "./store";

class Component extends WhatEver {
    ...
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)

```

# Other

> <a href="https://github.com/CB279/vue-3-cb-paginate">paginate</a>

> <a href="https://github.com/CB279/vue-3-cb-alert">alert</a>

> <a href="https://github.com/CB279/vue-3-cb-modal">modal</a>

> <a href="https://github.com/CB279/vue-3-cb-datepicker">datepicker</a>

> <a href="https://github.com/CB279/vue-3-cb-select">select</a>

> <a href="https://github.com/CB279/vue-3-cb-grid">grid</a>

> <a href="https://github.com/CB279/vue-3-cb-sidenav">sidenav</a>

## Development

npm install @vue-cb/validate

## Config

```js
import validate from "@vue-cb/validate";

createApp(app).use(validate);
```

## Usage

```html
<input v-model="state.firstname" v-rule="rule1.firstname" />
<br />
<input v-model="state.lastname" v-rule="rule1.lastname" />
```

```js
const rules = inject("rules");
const rule1 = rules({
    firstname: [() => state.firstname, (value) => !value && "กรุณากรอกชื่อ"],
    lastname: [() => state.lastname, (value) => !value && "กรุณากรอกนามสกุล"],
});

const state = reactive({
    firstname: "",
    lastname: "",
});
```

or multiple item

```html
<input
    v-for="(item, i) in state.items"
    :key="i"
    v-model="item.value"
    v-rule="[() => [item.value, i], rule1.item]"
/>
```

```js
const rules = inject("rules");
const rule1 = rules({
    item: ([value, i]) => !value && `input ${i} is require`,
});

const state = reactive({
    items: [{ value: "" }, { value: "" }],
});
```

## 📑 License

[MIT License](./LICENSE)

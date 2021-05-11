import { watch } from "vue";

export default {
    mounted(el, binding, vnode) {
        if (!binding.value) return;
        const [w, rule] = binding.value;

        const el_message = document.createElement("div");
        el_message.classList.add("rule-text-error");
        el.el_message = el_message;

        const validate = async (success, error, data = w()) => {
            const msg = await rule(data, { el, binding, vnode });
            if (msg) {
                el_message.innerHTML = msg;
                el.after(el_message);
                el.classList.add("rule-error");
                if (error) error(msg);
            } else {
                el_message.remove();
                el.classList.remove("rule-error");
                if (success) success();
            }
        };

        const unwatch = watch(
            w,
            data => {
                validate(null, null, data);
            },
            {
                deep: true
            }
        );

        Object.defineProperties(el, {
            validate: {
                value(success, error) {
                    return validate(success, error);
                }
            },
            _rr: {
                value() {
                    el_message.remove();
                    unwatch();
                    rule._remove(validate);
                }
            }
        });

        rule._add(validate);
    },
    unmounted(el) {
        el._rr();
    }
};

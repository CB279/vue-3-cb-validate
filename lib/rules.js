import { shallowReadonly } from "vue";

export default object => {
    const validates = [];

    const validate = async (success, error) => {
        const errors = [];
        for (const valid of validates) {
            await valid(null, err => {
                if (err) {
                    errors.push(err);
                }
            });
        }

        if (errors.length) {
            if (error) error(errors);
            return false;
        } else {
            if (success) success();
            return true;
        }
    };

    const add = valid => {
        validates.push(valid);
    };

    const remove = valid => {
        validates.splice(validates.indexOf(valid), 1);
    };

    for (const key in object) {
        if (typeof object[key] === "function") {
            object[key]._add = add;
            object[key]._remove = remove;
        } else {
            object[key][1]._add = add;
            object[key][1]._remove = remove;
        }
    }

    return shallowReadonly({
        ...object,
        validate
    });
};

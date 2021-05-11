import rules from './rules.js';
import rule from './rule.js';
import '../css/index.css';

export default {
    install(app) {
        app.provide('rules', rules);
        app.directive('rule', rule);
    }
};

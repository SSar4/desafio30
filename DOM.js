(function (window) {

    'use strick';

    function DOM(elements) {
        this.element = document.querySelectorAll(elements);
    }

    DOM.prototype.on = function on(event, cb) {
        Array.prototype.forEach.call(this.element, function (element) {
            element.addEventListener(event, cb, false);
        })
    };

    DOM.prototype.off = function off(event, cb) {
        Array.prototype.forEach.call(this.element, function (element) {
            element.removeEventListener(event, cb, false);
        })
    };

    DOM.prototype.get = function get() {
        return this.element;
    };

    DOM.prototype.forEach = function forEach() {
        return Array.prototype.forEach.call(this.element, arguments);
    };

    DOM.prototype.map = function map() {
        return Array.prototype.map.call(this.element, arguments);
    };

    DOM.prototype.filter = function filter() {
        return Array.prototype.filter.call(this.element, arguments);
    };

    DOM.prototype.reduce = function filter() {
        return Array.prototype.reduce.call(this.element, arguments);
    };

    DOM.prototype.reduceRight = function filter() {
        return Array.prototype.reduceRight.call(this.element, arguments);
    };

    DOM.prototype.some = function filter() {
        return Array.prototype.some.call(this.element, arguments);
    };

    DOM.prototype.every = function filter() {
        return Array.prototype.every.call(this.element, arguments);
    };

    DOM.is = (obj) => {
        return Array.prototype.toString.call(obj);
    }

    DOM.isArray = (obj) => {
        return DOM.is(obj) === '[object Array]';
    };

    DOM.isFunction = (obj) => {
        return DOM.is(obj) === '[object Function]';
    };

    DOM.isNumber = (obj) => {
        return DOM.is(obj) === '[object Number]';
    };

    DOM.isString = (obj) => {
        return DOM.is(obj) === '[object String]';
    };

    DOM.isObject = (obj) => {
        return DOM.is(obj) === '[object Object]';
    };

    DOM.isObject = (obj) => {
        return DOM.is(obj) === '[object Object]';
    };

    DOM.isBoolean = (obj) => {
        return DOM.is(obj) === '[object Boolean]';
    };

    DOM.isNull = (obj) => {
        return Object.prototype.toString.call(obj) === '[object Null]'
            || Object.prototype.toString.call(obj) === '[object Undefined]';
    };


    window.DOM = DOM;
})(window);
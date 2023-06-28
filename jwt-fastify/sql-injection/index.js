"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateEmail = exports.validText = void 0;
function validText(field) {
    var re = /^\w+$/;
    if (!re.test(field)) {
        return false;
    }
    else {
        return true;
    }
}
exports.validText = validText;
function ValidateEmail(inputText) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) {
        return true;
    }
    else {
        return false;
    }
}
exports.ValidateEmail = ValidateEmail;

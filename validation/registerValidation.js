const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateRegisterInput = (data) => {
    let errors = {};

    // check the email field
    if (isEmpty(data.email)) {
        errors.email = "بخش ایمیل نباید خالی باشد";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "ایمیل نامعتبر است";
    }

    // check password field
    if (isEmpty(data.password)) {
        errors.password = "بخش رمز نباید خالی باشد";
    } else if (!Validator.isLength(data.password, { min: 6, max: 150 })) {
        errors.password = "رمز عبور مناسب انتخاب کنید";
    }

    // check name field
    if (isEmpty(data.name)) {
        errors.name = "بخش نام نباید خالی باشد";
    } else if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = "نام مناسب انتخاب کنید";
    }

    // check confirm password field
    if (isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "بخش تایید رمز نباید خالی باشد";
    } else if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = "رمز عبور با رمز عبور وارد شده همخوانی ندارد";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

module.exports = validateRegisterInput;
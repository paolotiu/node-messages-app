const User = require('../models/User');
const express = require('express');
const router = express.Router;
const {
    signUpValidators,
    validationResult,
    signUpSchema,
} = require('./validation');

exports.login_get = (req, res, next) => {
    res.render('login');
};

exports.sign_up_get = (req, res, next) => {
    res.render('sign-up', { title: 'Sign-Up' });
};

exports.sign_up_post = [
    async (req, res, next) => {
        const user = req.body;

        try {
            const { value, error } = await signUpSchema.validate(req.body, {
                abortEarly: false,
            });
            if (error) {
                error.details.forEach((err) => {
                    errors[err.context.label] = {
                        message: err.message,
                    };
                });
                console.log(errors);

                return res.render('sign-up', {
                    title: 'Create a new user',
                    errors,
                    user,
                });
            } else {
                const checkUser = await User.findOne({
                    username: value.username,
                });
                const errors = {};
                if (checkUser) {
                    errors.username = { message: 'Username already taken' };
                    return res.render('sign-up', {
                        title: 'Create a new user',
                        errors,
                        user,
                    });
                } else {
                    const newUser = new User({
                        ...value,
                        status: 'user',
                    });

                    await newUser.save();
                    return res.redirect('/');
                }
            }
        } catch (error) {
            console.log(error);
            return next(error);
        }
    },
];

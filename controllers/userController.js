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
                const errors = {};

                error.details.forEach((err) => {
                    errors[err.context.label] = {
                        message: err.message,
                    };
                });
                console.log(errors);

                return res.render('sign-up', {
                    title: 'Create a new user',
                    errors,
                });
            }

            return res.json(error.details);
        } catch (error) {
            return res.send(error);
        }
    },
];

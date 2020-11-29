const User = require('../models/User');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router;

const {
    signUpValidators,
    validationResult,
    signUpSchema,
} = require('./validation');
const passport = require('passport');

exports.login_get = (req, res, next) => {
    res.render('login', { title: 'Login' });
};

exports.login_post = [
    (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) return next(err);
            if (!user) {
                res.render('login', {
                    title: 'Login',
                    error: 'Incorrect username or password',
                });
            } else {
                try {
                    req.login(user, (err) => {
                        if (err) return next(err);
                    });
                    return res.redirect('/');
                } catch (error) {
                    console.log(error);
                    return next(error);
                }
            }
        })(req, res, next);
    },
];

exports.sign_up_get = (req, res, next) => {
    res.render('sign-up', { title: 'Sign-Up' });
};

exports.sign_up_post = [
    async (req, res, next) => {
        const values = req.body;

        try {
            // Joi validation
            const { value, error } = signUpSchema.validate(req.body, {
                abortEarly: false,
            });

            if (error) {
                // Error detected, show errors in view
                const errors = {};
                error.details.forEach((err) => {
                    errors[err.context.label] = {
                        message: err.message,
                    };
                });

                return res.render('sign-up', {
                    title: 'Create a new user',
                    errors,
                    values,
                });
            } else {
                // No errors detected

                //Check if username is in db
                const checkUser = await User.findOne({
                    username: value.username,
                });

                const errors = {};
                if (checkUser) {
                    // Username taken, show eror
                    errors.username = { message: 'Username already taken' };
                    return res.render('sign-up', {
                        title: 'Create a new user',
                        errors,
                        user: values,
                    });
                } else {
                    // Username not taken
                    bcrypt.hash(user.password, 10, (err, hashedPassword) => {
                        value.password = hashedPassword;
                        const newUser = new User({
                            ...value,
                            status: 'user',
                        });
                        newUser.save((err) => {
                            if (err) return next(err);
                            req.login(newUser, (err) => {
                                if (err) return next(err);
                                return res.redirect('/');
                            });
                        });
                    });
                }
            }
        } catch (error) {
            return next(error);
        }
    },
];

const express = require("express")
const router = express.Router()
const {check, validationResult} = require('express-validator')

exports.validateAuthor = [
    check('name')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage("Author's name can not be empty!")
        .bail()
        .matches('^[A-Z][a-zA-Z ,]{2,39}$')
        .isLength({min:2})
        .withMessage("Minimum 2 character required")
        .bail(),
    check('surname')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage("Author's surname name can not be empty!")
        .bail()
        .matches('^[A-Z][a-zA-Z ,]{2,39}$')
        .isLength({min:2})
        .withMessage("Minimum 2 character required")
        .bail(),
    check('nationality')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage("Nationality can not be empty!")
        .bail()
        .matches('^[A-Z][a-zA-Z ]{2,19}$')
        .isLength({min:2})
        .withMessage("Minimum 2 character required")
        .bail(),
    check('birthYear')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage("Birth year cannot be empty")
        .bail()
        .isNumeric()
        .isLength({min:3, max:4})
        .withMessage('Minimum 3 numbers required'),
    check('deathYear')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage("Author's  year of death can not be empty!")
        .bail()
        .isNumeric()
        .isLength({min:3, max:4})
        .withMessage("Minimum 3 numbers required")
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return console.log("errors on Authors inputs")
        }   else {
            console.log('working')
        }
        next();
    } 
]

exports.validateBook = [
    check('bookTitle')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Book title can not be empty')
        .bail()
        .matches("^[A-Z][a-zA-Z ,]{2,38}$")
        .isLength({min:2})
        .withMessage("Minimum 2 characters required and must start witha captial")
        .bail(),
    check('originalTitle')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Original title can not be empty')
        .bail()
        .matches("^[A-Z][a-zA-Z ,]{2,38}$")
        .isLength({min:2})
        .withMessage("Minimum 2 characters required and must start witha captial")
        .bail(),
    check('yearofPublication')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage("Publication year can not be empty!")
        .bail()
        .isNumeric()
        .isLength({min:3, max:4})
        .withMessage("Minimum 3 numbers required")
        .bail(),
    check('genre')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Genre can not be empty')
        .bail()
        .matches('^[a-zA-Z /,]{2,19}$')
        .isLength({min:2})
        .withMessage("Minimum 2 characters required")
        .bail(),
    check('millionsSold')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage("Milions sold can not be empty!")
        .bail()
        .isNumeric()
        .isLength({min:1, max:4})
        .withMessage("Minimum 1 number required, max of 4")
        .bail(),
    check('languageWritten')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Language Written can not be empty')
        .bail()
        .matches('^[a-zA-Z ]{2,19}$')
        .isLength({min:2})
        .withMessage("Minimum 2 characters required")
        .bail(),
/*     check('coverImagePath')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Genre can not be empty')
        .bail()
        .matches('^[a-zA-Z]{2,19}$')
        .isLength({min:2})
        .withMessage("Minimum 2 characters required")
        .bail(), */
    check('authorID')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Author can not be empty'),  
    (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return console.log("errors on Books inputs")
            }   else {
                console.log('working')
            }
            next();
        } 
]

exports.validateUser = [
    check('firstName')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage("Users first name must not be empty")
        .bail()
        .matches('^[A-Z][a-zA-Z]{2,19}$')
        .withMessage("First name must start with a captial")
        .bail(),
    check('lastName')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage("User's last name cannot be empty")
        .bail()
        .matches('^[A-Z][a-zA-z]{2,19}$')
        .withMessage("Last name must start with a captial")
        .bail(),
    check('email')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .isEmail()
        .bail(),
    check('username')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage("user name cannot be empty")
        .bail()
        .matches('^[a-zA-z]{2,19}$')
        .withMessage("username must only contain normal chracters")
        .bail(),
    check('password')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage("Password cannot be empty")
        .bail()
        .isStrongPassword()
        .withMessage("password must contain one uppercase, lowercase, number and special character")
        .bail(),
    check('accessRights')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage("Please select an access level")
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return console.log("errors on user inputs")
        }   else {
            console.log('working')
        }
        next();
    }  
]
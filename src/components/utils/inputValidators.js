/*
    isObject()

    Check if the input is an object, 
    input = {}

    Params:
    - input (can be whatever)

    Returns:
    - true, if the input is an object
    - false, if the input is not an object
*/

const isObject = (input) => {
    if(typeof input === "object"){
        return true;
    } else {
        return false;
    }
} 

/*
    isArray

    Check if the input is an array.

    Params:
    - input (can be whatever)

    Returns:
    - true, if input is an array
    - false, if input is not an array or if input is not defined
*/

const isArray = (input) => {
    if(typeof input !== "undefined"){
        return Array.isArray(input);
    } else {
        return false;
    }
}

/*
    isEmptyString()

    Check if a value is an empty string. A value is an empty
    string if all of the fllowing conditions are met:
        - The input is a string
        - The input's length is 0 OR
        - The input only consists of empty space

    Params:
    - input (can be whatever)

    Returns: 
        - true, if the input is an empty string
        - false, if the input is not an empty string
*/

const isEmptyString = (input) => {
    if(typeof input === "string"){
        if(input.length === 0 || input.replace(/ /g, "").length === 0){
            return true;
        } else {
            return false
        }
    } else {
        return false;
    }
}

/*
    isString()

    Check if the input value is a string, which consists of more than 0 characters (not empty).
    
    Params:
    - input (can be whatever)
    
    Returns:
    - true, if input is string and longer than 0 characters
    - false, if the input is not a string OR if the input is a string consisting of 0 characters
*/

const isString = (input) => {
    if(typeof input === "string"){
        if(input.length > 0){
            return true;
        } else {
            return false
        }
    } else {
        return false;
    }
}

/*
    isNumber()

    Verify that the input is actually a number

    Parameters:
    - input (Can be whatever)

    Returns:
    - true, if the input is a number (any number)
    - false, if the input is not a number
*/
const isNumber = (input) => {
    if(typeof input === "number"){
        return true;
    } else {
        return false
    }
}

/*
    isPositiveNumber()

    Check whether the input is a positive number or not

    Params:
    - input (can be anything)

    Returns:
    - true, if the input is a number AND the input is larger than 0
    - false, if the input is a number but not larger than 0
    - false, if the input is not a number
*/
const isPositiveNumber = (input) => {
    if(typeof input === "number"){
        if(input > 0){
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

/*
    isNegativeNumber()

    Check if the input is a negative number

    Params:
    - input (can be any value)

    Returns:
    - true, if the input is a number and less than 0
    - false, if the input is a number, but larger than 0
    - false, if the input is not a number
*/
const isNegativeNumber = (input) => {
    if(typeof input === "number"){
        if(input < 0){
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}


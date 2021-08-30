/**@module utils */

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const jsonContentTypeValue = "application/json;charset=utf-8";

/**
 * JSON Content-Type value.
 */
exports.jsonContentType = jsonContentTypeValue;

/**
 * All different types of HTTP request methods.
 */
exports.httpMethod = Object.freeze({
    GET: "GET",
    HEAD: "HEAD",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    CONNECT: "CONNECT",
    OPTIONS: "OPTIONS",
    TRACE: "TRACE",
    PATCH: "PATCH"
});

/**
 * Makes an HTTP request to the passed url, based on the passed method and request body.
 * @param {string} url The URL to make a request to.
 * @param {string} method The request method.
 * @param {string} contentType The contentType
 * @param {string} requestBody The body of the request.
 */
exports.httpRequest = (url, method, contentType = undefined, requestBody = undefined) =>
    new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(method, url);
            let rejectFun = function () {
                reject(new Error(`There was an error when doing a ${method} request!`));
            };
            xhr.onload = function () {
                if (xhr.readyState === 4) {
                    resolve(xhr.responseText);
                } else {
                    rejectFun();
                }
            };
            xhr.onerror = rejectFun;

            if (contentType) {
                xhr.setRequestHeader("Content-Type", contentType);
            }

            xhr.send(requestBody);
        }
    );

/**
 * Makes an HTTP request on the given URL and parses the result.
 * @param {string} url The URL.
 * @param {string} method The request method.
 * @param {Function} parseFun
 * The function used to parse the request result.
 * @param {string} contentType The content type of the request
 * @param {string} requestBody The body of the request
 * @returns {Promise<*>} A Promise of a parsed response.
 */
exports.parseHttpRequest = async function (url, method, parseFun, contentType = undefined, requestBody = undefined) {
    try {
        // Await the HTTP request and return its parsed results
        let response = await exports.httpRequest(url, method, contentType, requestBody);
        return parseFun(response);
    } catch (error) {
        console.log(error);
    }
};
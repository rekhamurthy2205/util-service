const config = require("../config/config.json");
const uuid = require("uuid");

const successResponse = (responseMessage) => ({
  result: "Success",
  responseObj: {
    responseId: uuid.v4(),
    responseTs: `${Math.floor(Date.now() / 1000)}`,
    responseApiVersion: config.appVersion,
    responseCode: 200,
    responseMessage: "successfully done",
    responseDataParams: {
      data: responseMessage,
    },
  },
});

const errorResponse = (errorMessage) => ({
  result: "Error",
  responseObj: {
    responseId: uuid.v4(),
    responseTs: `${Math.floor(Date.now() / 1000)}`,
    responseApiVersion: config.appVersion,
    responseCode: 401,
    responseMessage: "Error in Process",
    responseDataParams: {
      data: errorMessage,
    },
  },
});

const warningResponse = (warningMessage) => ({
  result: "Warning",
  responseObj: {
    responseId: uuid.v4(),
    responseTs: `${Math.floor(Date.now() / 1000)}`,
    responseApiVersion: config.appVersion,
    responseCode: 501,
    responseMessage: "Ran with Warnings",
    responseDataParams: {
      data: warningMessage,
    },
  },
});

module.exports = {
  successResponse,
  errorResponse,
  warningResponse,
};

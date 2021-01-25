const toObject = (array) =>
  array.reduce((res, value, index) => {
    res[index] = value;
    return res;
  }, {});

const toFieldError = ({ validatorKey, validatorArgs, message }) => ({
  key:
    validatorKey && validatorArgs instanceof Array && validatorArgs.length
      ? `${validatorKey}-${validatorArgs.length}`
      : validatorKey || 'error.general',
  values: toObject(validatorArgs),
  message,
});

const toFormErrors = (response) => {
  if (response.body instanceof Array) {
    return response.body.reduce((res, data) => {
      res[data.path] = toFieldError(data);
      return res;
    }, {});
  }

  return {
    global: {
      key:
        typeof response === 'string'
          ? response
          : response.message || 'error.general',
      ...response.body,
    },
  };
};

export default toFormErrors;

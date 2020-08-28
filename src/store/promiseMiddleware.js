export default function promiseMiddleware() {
  return next => action => {
    const { promise, type, transform, ...rest } = action;

    if (!promise) {
      return next(action);
    }

    const SUCCESS = type;
    const REQUEST = type + '_REQUEST';
    const FAILURE = type + '_FAILURE';

    next({ ...rest, type: REQUEST });

    return promise
      .then(res => {
        let data = {};
        if (typeof transform === 'function') {
          data = transform({ res, ...rest });
        } else {
          data = res.data
        }
        next({ ...rest, data, res, type: SUCCESS });
        return true;
      })
      .catch(error => {
        next({ ...rest, error, type: FAILURE });
        console.error(error);
        return false;
      });
  };
}

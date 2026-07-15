export default function wrapAsync(fn) {
  return async function (req, res, next) {
    try {
      await fn(req, res, next);
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error(err.stack);
      }
      next(err);
    }
  };
}
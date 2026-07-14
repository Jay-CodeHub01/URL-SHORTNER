export default function wrapAsync(fn) {
  return async function (req, res, next) {
    try {
      await fn(req, res, next);
    } catch (err) {
      console.error("===== ERROR =====");
      console.error(err.stack);
      console.error("=================");
      next(err);
    }
  };
}
export default function wrapAsync(fn) {
    return function (req, res, next) {
        const safeNext = typeof next === "function"
            ? next
            : (error) => {
                if (error) {
                    console.error(error);
                }
                if (!res.headersSent) {
                    res.status(500).json({
                        success: false,
                        message: error?.message || "Internal Server Error",
                    });
                }
            };

        Promise.resolve()
            .then(() => fn(req, res, safeNext))
            .catch((error) => safeNext(error));
    };
};
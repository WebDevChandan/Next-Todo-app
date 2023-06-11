import { cookieSetter } from "@/utils/features";

const { assyncError, errorHandler } = require("@/middlewares/error");

const handler = assyncError(async (req, res) => {
    if (req.method !== "GET")
        return errorHandler(res, 400, "Only GET Request is allowed");

    cookieSetter(res, null, false);

    res.status(200).json({
        success: true,
        message: `Logged Out Successfully `,
    });

});

export default handler;
import { assyncError, errorHandler } from "@/middlewares/error";
import { Task } from "@/models/task";
import { checkAuth, connectDB } from "@/utils/features";

const handler = assyncError(async (req, res) => {

    await connectDB();

    //checkAuth(): It's an async function. So, it will definitely return promise.
    const user = await checkAuth(req);

    if (!user) return errorHandler(res, 401, "Login First");

    const taskId = req.query.id;

    const task = await Task.findById(taskId);

    if (!task) return errorHandler(res, 404, "Task Not Found");

    if (req.method === "PUT") {

        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task Updated Successfully",
        })
        
    } else if (req.method === "DELETE") {
        await task.deleteOne()
        
        res.status(200).json({
            success: true,
            message: "Task Deleted Successfully",
        })

    } else
        return errorHandler(res, 400, "This Request is not Allowed")


});

export default handler;
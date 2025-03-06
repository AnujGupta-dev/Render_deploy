import User from "../model/user.js";

export const postHistory = async (req, res) => {
    try {
        const { travelHistory } = req.body;

        if (!req.user || !req.user.id) {
            return res.status(400).json({
                success: false,
                message: "Invalid user",
            });
        }

        const user = await User.findById(req.user.id);
        user.$skipEmail = true;

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if(travelHistory && travelHistory.length > 0){
            user.travelHistory.push(travelHistory); 
            await user.save();
        }

        res.status(200).json({
            success: true,
            message: user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
        });
    }
};


export const getHistory = async (req, res) => {
    try {
        const id = req.body.id || req.user?.id; 
        if (!id) {
            return res.status(400).json({
                message: "User ID is required",
                status: false,
            });
        }

        const user = await User.findById(id);
        user.$skipEmail = true;
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: false,
            });
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false,
        });
    }
};

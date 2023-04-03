const User = require("../models/User")
const Order = require("../models/Order")

// Get Stats for Admin 
exports.getStats = async (req, res) => {

    // Creating Dates for Finding Data based on Dates
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))

    try {
        
        // Finding users joined this month in Database
        const usersJoinedThisMonth = await User.find({
            createdAt: {
                $gte: lastMonth
            }
        })

        // Finding active users this month in Database
        const activeUesrsThisMonth = await User.find({
            updatedAt: {
                $gte: lastMonth
            }
        })

        // Finding products that are dilivered to the Customer 
        const productsDilivered = await Order.find({
            orderStatus: 'dilivered'
        })

        // Finding Income of last month
        const income = await Order.aggregate([
            { 
                $match: { 
                    createdAt: { $gte: prevMonth } 
                } 
            },
            {
                $project: {
                    month: { $month: '$createdAt' },
                    sales: '$amount'
                }
            },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: '$sales' }
                }
            }
        ])

        res.status(200).json({ usersJoinedThisMonth, activeUesrsThisMonth, productsDilivered, income })

    } catch (err) {

        res.status(500).json(err)
    }
}
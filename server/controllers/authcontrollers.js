import Job from '../models/jobModel.js'

export const jobsCreate = async (req, res) => {
    const { description, location } = req.body

    if (!description || !location) {
        return res.status(400).json({ message: 'Please fill missing details' })
    }

    try {
        const job = await Job.create({
            description,
            location,
        })

        return res.status(201).json({
            description: job.description,
            location: job.location,

            message: `Your Job post is created!`
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
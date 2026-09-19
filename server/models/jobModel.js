import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    location: {
        type: String,
        required: [true, 'Please add a location'],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true,
});

const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);
export default Job;
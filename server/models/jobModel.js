import mongoose from 'mongoose';

const jobSchema = mongoose.Schema({
        title: {
            type: String,
            required: [true, 'Please add a title'],
        },
        location: {
            type: String,
            required: [true, 'Please add a location'],
        }
})

const Job = mongoose.models ||  mongoose.model('Job', jobSchema);
export default Job;
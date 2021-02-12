const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/manage', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    username: String,
    password: Number,
    create_time: Number,
});

const AccountList = mongoose.model('Account', AccountSchema);

module.exports = {
    AccountList,
}
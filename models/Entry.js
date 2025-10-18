const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  value: { type: Number, required: true },
  color: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^#[0-9A-Fa-f]{6}$/.test(v);
      },
      message: props => `${props.value} is not a valid hex color (expected format #RRGGBB)`
    }
  }
});

module.exports = mongoose.model('Entry', entrySchema);

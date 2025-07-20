const mongoose = require('mongoose');

const onboardingSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  tasks: [{
    title: {
      type: String,
      required: true
    },
    description: String,
    category: {
      type: String,
      enum: ['documentation', 'equipment', 'training', 'introduction', 'system_access'],
      required: true
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'skipped'],
      default: 'pending'
    },
    dueDate: Date,
    completedDate: Date,
    notes: String,
    attachments: [{
      filename: String,
      path: String,
      uploadDate: {
        type: Date,
        default: Date.now
      }
    }]
  }],
  overallStatus: {
    type: String,
    enum: ['not-started', 'in-progress', 'completed'],
    default: 'not-started'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  expectedCompletionDate: Date,
  actualCompletionDate: Date,
  assignedHRBuddy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  feedbackFromEmployee: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comments: String,
    submittedDate: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update overall status based on task completion
onboardingSchema.methods.updateOverallStatus = function() {
  const totalTasks = this.tasks.length;
  const completedTasks = this.tasks.filter(task => task.status === 'completed').length;
  
  if (completedTasks === 0) {
    this.overallStatus = 'not-started';
  } else if (completedTasks === totalTasks) {
    this.overallStatus = 'completed';
    if (!this.actualCompletionDate) {
      this.actualCompletionDate = new Date();
    }
  } else {
    this.overallStatus = 'in-progress';
  }
};

// Update timestamp on save
onboardingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  this.updateOverallStatus();
  next();
});

module.exports = mongoose.model('Onboarding', onboardingSchema);

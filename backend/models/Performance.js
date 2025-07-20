const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewPeriod: {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  },
  reviewType: {
    type: String,
    enum: ['quarterly', 'half-yearly', 'annual', 'probation', 'project-based'],
    required: true
  },
  goals: [{
    title: {
      type: String,
      required: true
    },
    description: String,
    targetDate: Date,
    weight: {
      type: Number,
      min: 0,
      max: 100
    },
    status: {
      type: String,
      enum: ['not-started', 'in-progress', 'completed', 'overdue'],
      default: 'not-started'
    },
    actualCompletionDate: Date,
    employeeComments: String,
    reviewerComments: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    }
  }],
  competencies: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    selfRating: {
      type: Number,
      min: 1,
      max: 5
    },
    managerRating: {
      type: Number,
      min: 1,
      max: 5
    },
    finalRating: {
      type: Number,
      min: 1,
      max: 5
    },
    comments: String
  }],
  overallRating: {
    type: Number,
    min: 1,
    max: 5
  },
  strengths: [String],
  areasForImprovement: [String],
  developmentPlan: {
    goals: [String],
    resources: [String],
    timeline: String,
    supportNeeded: String
  },
  employeeFeedback: {
    jobSatisfaction: {
      type: Number,
      min: 1,
      max: 5
    },
    managerSupport: {
      type: Number,
      min: 1,
      max: 5
    },
    workLifeBalance: {
      type: Number,
      min: 1,
      max: 5
    },
    careerGrowth: {
      type: Number,
      min: 1,
      max: 5
    },
    comments: String
  },
  status: {
    type: String,
    enum: ['draft', 'self-assessment', 'manager-review', 'hr-review', 'completed'],
    default: 'draft'
  },
  submittedByEmployee: {
    date: Date,
    signature: String
  },
  submittedByManager: {
    date: Date,
    signature: String
  },
  hrApproval: {
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    approvalDate: Date,
    comments: String
  },
  nextReviewDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate overall rating based on goals and competencies
performanceSchema.methods.calculateOverallRating = function() {
  let totalRating = 0;
  let count = 0;
  
  // Include goal ratings
  this.goals.forEach(goal => {
    if (goal.rating) {
      totalRating += goal.rating * (goal.weight || 10);
      count += (goal.weight || 10);
    }
  });
  
  // Include competency ratings
  this.competencies.forEach(comp => {
    if (comp.finalRating) {
      totalRating += comp.finalRating * 10;
      count += 10;
    }
  });
  
  this.overallRating = count > 0 ? Math.round((totalRating / count) * 10) / 10 : 0;
};

// Update timestamp on save
performanceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  this.calculateOverallRating();
  next();
});

module.exports = mongoose.model('Performance', performanceSchema);

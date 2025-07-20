# HR Dashboard - MERN Stack Application

A comprehensive Human Resources management dashboard built with MongoDB, Express.js, React.js, and Node.js (MERN Stack).

## Features

### 🔐 Authentication & Authorization
- Secure JWT-based authentication
- Role-based access control (Admin, HR, Manager, Employee)
- Protected routes and API endpoints

### 👥 Employee Management
- Employee registration and profile management
- Employee directory with search and filters
- Role assignment and department allocation

### 📋 Onboarding Management
- Streamlined onboarding process
- Task tracking and progress monitoring
- Document collection and verification

### 🏖️ Leave Management
- Leave request submission and approval workflow
- Leave balance tracking
- Calendar integration

### 💰 Salary Management
- Salary slip generation and distribution
- Payroll processing
- Compensation tracking

### 🏢 Team Management
- Department and team organization
- Team member allocation
- Reporting structure

### 📊 Performance Management
- Performance review cycles
- Goal setting and tracking
- 360-degree feedback

### 📈 Reports & Analytics
- Comprehensive HR analytics
- Downloadable reports (PDF, Excel)
- Dashboard with key metrics

### 🔔 Notifications & Alerts
- Automated email notifications
- System alerts for important events
- Reminder notifications

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads
- **Nodemailer** - Email service
- **ExcelJS** - Excel file generation
- **PDFKit** - PDF generation

### Frontend
- **React.js** - UI framework with hooks and functional components
- **Material-UI (MUI)** - Comprehensive component library with theming
- **React Router** - Client-side routing and navigation
- **Axios** - HTTP client for API communication
- **Context API** - Global state management for authentication
- **Material Icons** - Icon library for consistent UI design

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hr-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm run install-deps
   ```

3. **Set up environment variables**
   
   **Backend** (`backend/.env`):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/hr-dashboard
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   
   # Email configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   
   # Admin credentials
   ADMIN_EMAIL=admin@company.com
   ADMIN_PASSWORD=admin123
   ```
   
   **Frontend** (`frontend/.env`):
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start MongoDB**
   ```bash
   mongod
   ```

5. **Run the application**
   ```bash
   npm run dev
   ```

   This will start both backend (http://localhost:5000) and frontend (http://localhost:3000) simultaneously.

### Manual Setup (Alternative)

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

## Usage

### Default Login Credentials

For testing purposes, you can use these demo credentials:
- **Email:** admin@company.com
- **Password:** admin123

### Creating Your First Admin User

1. Start the application
2. Navigate to `/register` (only accessible by admin/HR users)
3. Create your admin account
4. Use the admin account to create other users

### User Roles & Permissions

- **Admin**: Full system access, user management, system configuration
- **HR**: Employee management, onboarding, salary management, comprehensive reports
- **Manager**: Team management, employee performance, leave approvals, team reports  
- **Employee**: Personal dashboard, profile management, leave requests, performance tracking

### Key Dashboard Features

- **Real-time Statistics**: Employee count, new hires, pending leaves, active projects
- **Activity Feed**: Live updates on system activities and user actions
- **Event Management**: Upcoming meetings, reviews, and training sessions
- **Department Analytics**: Employee distribution and growth metrics by department
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new employee (Admin/HR only)
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/change-password` - Change password
- `PUT /api/auth/profile` - Update profile

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee
- `GET /api/employees/stats` - Get employee statistics

### Additional endpoints for leaves, salary, teams, performance, and reports are available.

## File Structure

```
hr-dashboard/
├── backend/
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Custom middleware
│   ├── models/              # Mongoose models
│   ├── routes/              # Express routes
│   ├── utils/               # Utility functions
│   ├── uploads/             # File uploads
│   ├── server.js            # Entry point
│   └── package.json
├── frontend/
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── EmployeeList.js
│   │   │   ├── OnboardingDashboard.js
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/         # React Context providers
│   │   │   └── AuthContext.jsx
│   │   ├── pages/           # Main page components
│   │   │   ├── Dashboard.js      # Main dashboard with routing
│   │   │   ├── HomePage.js       # Dashboard homepage
│   │   │   ├── Employees.jsx     # Employee management
│   │   │   ├── Onboarding.jsx    # Multi-step onboarding
│   │   │   ├── Leaves.jsx        # Leave management
│   │   │   ├── Salary.jsx        # Salary management
│   │   │   ├── Teams.jsx         # Team management
│   │   │   ├── Performance.jsx   # Performance tracking
│   │   │   ├── Reports.jsx       # Reports and analytics
│   │   │   ├── Profile.jsx       # User profile
│   │   │   ├── Settings.jsx      # Application settings
│   │   │   └── Login.jsx         # Authentication
│   │   ├── services/        # API service functions
│   │   │   └── authService.js
│   │   ├── App.jsx          # Main application component
│   │   └── index.js         # Application entry point
│   └── package.json
├── package.json             # Root package.json
└── README.md
```

## Recent Updates

### ✅ Completed Features
- **Enhanced Dashboard**: Comprehensive dashboard with real-time statistics, recent activities, upcoming events, and department overview
- **Improved Navigation**: Fully functional sidebar navigation with role-based access control
- **Onboarding Workflow**: Multi-step onboarding process with form validation and document upload
- **Modern UI**: Material-UI components with responsive design and theme support
- **Employee Directory**: Advanced employee listing with search and filter capabilities
- **Activity Tracking**: Real-time activity feed showing system events and user actions

### 🔄 Features in Development
- [ ] Advanced reporting with charts and data visualization
- [ ] Calendar integration for events and leave management
- [ ] Mobile app development
- [ ] Integration with external HR systems (ATS, HRIS)
- [ ] Advanced analytics and insights dashboard
- [ ] Document management system with version control
- [ ] Employee self-service portal enhancements
- [ ] Automated workflows and approval processes

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security

- All passwords are hashed using bcrypt
- JWT tokens for secure authentication
- Input validation on all endpoints
- Rate limiting to prevent abuse
- CORS configuration
- Helmet for security headers

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

## Screenshots

### Dashboard Overview
- Comprehensive statistics cards showing key HR metrics
- Recent activity feed with real-time updates
- Upcoming events calendar
- Department-wise employee distribution with growth indicators

### Navigation Features
- Responsive sidebar navigation
- Role-based menu items
- Active route highlighting
- Mobile-friendly drawer interface

### Onboarding Process
- Multi-step form with progress indicator
- Personal information collection
- Job details assignment
- Document upload and verification

## Deployment Notes

**Development Environment**: This project is currently optimized for development. 

**For Production Deployment**:
- Use strong, unique JWT secrets and rotate them regularly
- Configure proper database security and authentication
- Set up SSL/HTTPS with proper certificates
- Configure proper email settings for notifications
- Implement comprehensive backup strategies
- Set up monitoring, logging, and error tracking
- Configure environment-specific variables
- Implement proper error handling and user feedback
- Set up CI/CD pipelines for automated deployment

## Performance Optimization

- React components optimized with proper state management
- Lazy loading for route components
- Efficient database queries with proper indexing
- Responsive design for optimal mobile experience
- Caching strategies for frequently accessed data

---

**Developed with ❤️ using the MERN Stack**

For support, feature requests, or bug reports, please open an issue on the GitHub repository.
# HRDASHBOARD
# HR-DASHBOARD

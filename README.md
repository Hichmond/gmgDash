# GMG EHS Dashboard

A modern, glassmorphism-styled Environmental Health & Safety (EHS) management dashboard built with React, TypeScript, and Framer Motion.

## 🚀 Features

- **Glassmorphism UI Design**: Beautiful translucent interface with backdrop blur effects
- **Role-Based Access Control**: 7 different user roles with granular permissions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Animated Interactions**: Smooth animations powered by Framer Motion
- **12 Core Modules**: Comprehensive EHS management system
- **Real-time Role Switching**: Demo-friendly role switcher for presentations
- **Progressive Module Rollout**: "Coming Soon" placeholders for future modules

## 🎨 Design System

- **Glassmorphism**: Translucent cards with backdrop blur
- **Animated Backgrounds**: Floating gradient orbs with CSS animations
- **Modern Typography**: Inter font family with gradient text effects
- **Consistent Spacing**: CSS custom properties for maintainable design
- **Accessibility**: WCAG 2.1 AA compliant focus states and keyboard navigation

## 👥 User Roles

1. **GMG Admin** - Full system access
2. **Compliance Coordinator** - Document and training management
3. **Area Manager** - Incident reporting and site management
4. **Site Manager** - Local site operations
5. **Employee (Field Tech)** - Mobile-focused incident reporting
6. **Client** - Read-only access to relevant modules
7. **Auditor** - Read-only access for compliance reviews

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gmg-ehs-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔐 Authentication & Demo

### Login
- Use any email and password combination
- Recommended demo credentials: `demo@gmg.com` / `demo123`
- The system will accept any valid email format
- No actual authentication backend required for demo

### Role Switching
1. After login, click on your user profile in the sidebar
2. Select a different role from the dropdown
3. The interface will update to show only accessible modules
4. Navigation and permissions update in real-time

### Demo Scenarios
- **Admin Demo**: Switch to "GMG Admin" to see all modules
- **Field Tech Demo**: Switch to "Employee (Field Tech)" for mobile-focused view
- **Client Demo**: Switch to "Client" for read-only experience
- **Auditor Demo**: Switch to "Auditor" for compliance review mode

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout with sidebar
│   ├── Sidebar.tsx     # Navigation sidebar
│   └── ComingSoon.tsx  # Placeholder for future modules
├── contexts/           # React Context providers
│   └── AuthContext.tsx # Authentication and role management
├── pages/              # Page components
│   ├── LoginPage.tsx   # Authentication page
│   └── DashboardPage.tsx # Main dashboard
├── styles/             # Global styles
│   └── GlobalStyles.ts # CSS-in-JS global styles
├── types/              # TypeScript type definitions
│   └── index.ts        # Core type definitions
├── utils/              # Utility functions
│   └── moduleConfig.ts # Module configuration
└── App.tsx            # Main application component
```

## 🎯 Module Status

### ✅ Implemented Modules
- **Dashboard**: Overview with statistics and quick actions
- **Employees**: Employee management (Coming Soon page)
- **Incident Reporting**: Incident tracking (Coming Soon page)
- **Documents**: Document management (Coming Soon page)
- **Toolbox Talks**: Safety discussions (Coming Soon page)
- **Training & Certification**: Training management (Coming Soon page)

### 🚧 Coming Soon Modules
- **Notifications**: Real-time alerts system
- **JHA**: Job Hazard Analysis tools
- **Support**: Help desk and support system
- **Equipment Inspection**: Equipment management
- **Site Assessment**: Site safety audits
- **Messaging**: Internal communication platform

## 🛠️ Technology Stack

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **React Router**: Client-side routing
- **Styled Components**: CSS-in-JS styling
- **Framer Motion**: Animation library
- **Lucide React**: Modern icon library

## 🎨 Customization

### Colors and Themes
Edit `src/styles/GlobalStyles.ts` to modify:
- Primary gradient colors
- Glassmorphism opacity levels
- Border radius values
- Animation timings

### Module Configuration
Update `src/utils/moduleConfig.ts` to:
- Add new modules
- Modify module icons
- Change implementation status
- Update module descriptions

### Role Permissions
Modify `src/contexts/AuthContext.tsx` to:
- Add new user roles
- Update permission matrices
- Change access control logic

## 📱 Responsive Design

- **Desktop**: Full sidebar navigation
- **Tablet**: Collapsible sidebar
- **Mobile**: Hamburger menu with slide-out navigation
- **Touch-friendly**: Optimized for touch interactions

## 🔧 Development

### Adding New Modules
1. Update `moduleConfig.ts` with new module details
2. Create module page component in `pages/`
3. Add route in `App.tsx`
4. Update role permissions in `AuthContext.tsx`

### Styling Guidelines
- Use CSS custom properties for consistency
- Follow glassmorphism design principles
- Implement smooth transitions
- Ensure accessibility compliance

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
The build output can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

## 📄 License

This project is proprietary software for GMG Environmental Health & Safety.

## 🤝 Contributing

For development questions or clarifications:
1. Review the relevant module specifications
2. Check the wireframes and design documents
3. Contact the project lead for business rule clarifications

## 📞 Support

For technical support or feature requests, please contact the development team.

---

**Built with ❤️ for GMG Environmental Health & Safety**
# gmgDash

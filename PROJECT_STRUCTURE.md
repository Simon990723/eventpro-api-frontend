# Project Structure

## 📁 Organized Frontend Architecture

```
src/
├── components/           # Reusable UI components
│   ├── animations/      # Animation-related components
│   │   ├── AnimatedBackground.tsx
│   │   ├── AnimatedButton.tsx
│   │   ├── AnimatedCard.tsx
│   │   ├── AnimatedWrapper.tsx
│   │   └── SimpleTestBackground.tsx
│   ├── forms/           # Form components
│   │   ├── AuthForm.tsx
│   │   └── EventForm.tsx
│   ├── layout/          # Layout and routing components
│   │   ├── AnimatedLayout.tsx
│   │   ├── GuestRoute.tsx
│   │   ├── Navbar.tsx
│   │   └── ProtectedRoute.tsx
│   ├── ui/              # Basic UI components
│   │   ├── CalendarWidget.tsx
│   │   ├── EventList.tsx
│   │   ├── MyRegistrationsList.tsx
│   │   └── Skeleton.tsx
│   └── index.ts         # Component exports
├── pages/               # Page components
│   ├── AnimatedDemo.tsx
│   ├── EventDetailPage.tsx
│   ├── EventManagementPage.tsx
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── MyRegistrationsPage.tsx
│   └── RegisterPage.tsx
├── styles/              # CSS files
│   ├── animated-design.css
│   ├── App-enhanced.css
│   ├── App.css
│   ├── index.css
│   ├── mobile-enhancements.css
│   └── index.ts         # Style imports
├── hooks/               # Custom React hooks
│   ├── useClickOutside.ts
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   ├── useWindowSize.ts
│   └── index.ts
├── utils/               # Utility functions
│   └── index.ts
├── constants/           # Application constants
│   └── index.ts
├── context/             # React context providers
├── types/               # TypeScript type definitions
├── assets/              # Static assets
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── vite-env.d.ts        # Vite type definitions
```

## 🎯 Key Improvements

### **1. Organized Component Structure**
- **animations/**: All animation-related components
- **forms/**: Form components for user input
- **layout/**: Navigation, routing, and layout components
- **ui/**: Basic reusable UI components

### **2. Centralized Styles**
- All CSS files moved to `styles/` folder
- Organized by purpose and functionality
- Easy to maintain and update

### **3. Custom Hooks**
- Reusable logic extracted into custom hooks
- Better code organization and reusability
- Type-safe implementations

### **4. Utility Functions**
- Common functions centralized in `utils/`
- Date formatting, currency formatting, etc.
- Debounce, throttle, and other helpers

### **5. Constants Management**
- Application constants in dedicated folder
- Routes, API endpoints, configuration
- Easy to update and maintain

### **6. Clean Imports**
- Index files for cleaner imports
- Barrel exports for better organization
- Reduced import complexity

## 🚀 Usage Examples

### **Component Imports**
```tsx
// Before
import Navbar from './components/Navbar';
import AnimatedCard from './components/AnimatedCard';

// After
import { Navbar, AnimatedCard } from './components';
```

### **Hook Usage**
```tsx
import { useLocalStorage, useDebounce } from './hooks';

const [value, setValue] = useLocalStorage('key', 'default');
const debouncedValue = useDebounce(searchTerm, 300);
```

### **Utility Functions**
```tsx
import { formatDate, formatCurrency, classNames } from './utils';

const formattedDate = formatDate(new Date());
const price = formatCurrency(29.99);
const className = classNames('base', isActive && 'active');
```

### **Constants**
```tsx
import { ROUTES, BREAKPOINTS } from './constants';

// Use in routing
<Route path={ROUTES.HOME} element={<HomePage />} />

// Use in responsive design
const isMobile = window.innerWidth <= BREAKPOINTS.MOBILE;
```

## 📱 Benefits

1. **Better Organization**: Easy to find and maintain code
2. **Scalability**: Structure supports growth
3. **Reusability**: Components and hooks are easily reusable
4. **Type Safety**: Full TypeScript support
5. **Performance**: Optimized imports and code splitting
6. **Developer Experience**: Cleaner, more intuitive codebase

## 🔧 Development Guidelines

1. **Components**: Keep components small and focused
2. **Hooks**: Extract reusable logic into custom hooks
3. **Styles**: Use the organized CSS structure
4. **Types**: Define types in the `types/` folder
5. **Constants**: Use constants instead of magic strings
6. **Utils**: Create utility functions for common operations

This structure provides a solid foundation for a scalable, maintainable React application with professional organization and best practices.
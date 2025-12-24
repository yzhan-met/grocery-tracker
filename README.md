# 🛒 家庭购物清单 (Grocery Tracker)

A modern, user-friendly grocery shopping list application built with React, TypeScript, and Tailwind CSS. Designed to help you organize your shopping needs by different store categories.

![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.0.1-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.16-38B2AC?logo=tailwind-css)

## ✨ Features

### 📝 Grocery List Management
- **Add Items**: Quickly add grocery items with a simple, intuitive interface
- **Mark as Completed**: Check off items as you purchase them
- **Delete Items**: Remove items individually or clear all completed items at once
- **Time Tracking**: See when items were added or last updated

### 🏪 Category Organization
- **Preset Categories**: Three built-in categories optimized for different shopping locations:
  - 🔵 **洋人超市** (Western Supermarket) - Blue
  - 🔴 **华人超市** (Asian Supermarket) - Red
  - 🟢 **加油站** (Gas Station) - Green
- **Custom Categories**: Create your own categories for specialty stores (e.g., 五金店, 药店)
- **Color-Coded**: Each category has a distinct color for easy visual identification
- **Grouped Display**: Items are automatically grouped by category for organized shopping

### 💾 Data Persistence
- **Local Storage**: All data is automatically saved to your browser's local storage
- **No Account Required**: Use the app without sign-up or authentication
- **Offline Support**: Works completely offline after initial load

### 📊 Statistics Dashboard
- **Total Items**: View the total number of items in your list
- **Pending Count**: See how many items you still need to purchase
- **Completed Count**: Track how many items you've already bought

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Beautiful Gradients**: Eye-catching emerald and teal gradient background
- **Smooth Animations**: Polished transitions and hover effects
- **Intuitive Icons**: Powered by Lucide React icons for clarity

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and pnpm installed on your system

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd grocery-tracker
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Start managing your grocery list!

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Build for production (production mode)
pnpm build:prod

# Preview production build
pnpm preview

# Run ESLint
pnpm lint

# Clean dependencies
pnpm clean
```

## 🛠️ Tech Stack

### Core
- **React 18.3.1** - UI library
- **TypeScript 5.6.2** - Type safety
- **Vite 6.0.1** - Build tool and dev server

### Styling
- **Tailwind CSS 3.4.16** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Lucide React** - Icon library

### UI Components
- **Radix UI** - Accessible, unstyled component primitives
- **shadcn/ui** - Re-usable component library built on Radix UI
- **class-variance-authority** - Variant-based styling
- **tailwind-merge** - Merge Tailwind classes efficiently

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Playwright** - End-to-end testing

## 📱 Usage

### Adding Items

1. Type the item name in the input field (e.g., "牛奶", "面包", "西红柿")
2. Select a category (Western Supermarket, Asian Supermarket, Gas Station, or create custom)
3. Click the **+** button or press Enter

### Managing Items

- **Complete**: Click the circle checkbox next to an item
- **Uncomplete**: Click the checkmark to move it back to pending
- **Delete**: Hover over an item and click the trash icon
- **Clear Completed**: Click "清除已完成项目" at the bottom to remove all completed items

### Custom Categories

1. Click the **自定义** (Custom) button
2. Enter your custom category name (e.g., "五金店", "药店")
3. Add an item with this category
4. The category will be saved for future use
5. Hover over a custom category to see the delete button

## 📂 Project Structure

```
grocery-tracker/
├── src/
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── App.tsx         # Main application component
│   ├── App.css         # Application styles
│   ├── index.css       # Global styles and Tailwind imports
│   └── main.tsx        # Application entry point
├── public/             # Static assets
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## 🎯 Key Features Explained

### Data Model

Each grocery item contains:
- `id` - Unique identifier
- `name` - Item name
- `completed` - Completion status
- `category` - Store category
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Category System

The app uses a hybrid category system:
- **Preset categories** with predefined colors and names
- **Custom categories** that users can create on-demand
- **Automatic persistence** of custom categories in local storage

### Grouping Logic

Items are automatically grouped by:
1. Status (Pending/Completed)
2. Category (within each status group)
3. Preset categories appear first, followed by custom categories

## 🔒 Privacy & Data

- All data is stored locally in your browser
- No data is sent to external servers
- No tracking or analytics
- Clear your browser data to reset the app

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with modern React best practices
- UI components from Radix UI and shadcn/ui
- Icons from Lucide React
- Styled with Tailwind CSS
```

# GC AI Hub - Government of Canada AI Innovation Platform

## Project Overview

The GC AI Hub is a comprehensive platform showcasing AI initiatives across Government of Canada departments. This application provides a centralized location to discover, explore, and learn about innovative AI projects being developed by various federal departments and agencies.

## Features

- **Project Discovery**: Browse and search through AI projects across government departments
- **Detailed Information**: View comprehensive details about each project including tech stack, status, and descriptions
- **Filtering & Search**: Advanced filtering by department, technology, and project status
- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern UI**: Clean, accessible interface following Government of Canada design standards

## Development Setup

**Prerequisites**

Ensure you have Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

**Local Development**

Follow these steps to set up the project locally:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd gc-ai-showcase

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Technology Stack

This project is built with modern web technologies:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript development
- **React** - Modern UI framework
- **shadcn/ui** - Accessible UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── home/      # Homepage specific components
│   ├── layout/    # Layout components (header, sidebar, etc.)
│   ├── projects/  # Project-related components
│   └── ui/        # shadcn/ui components
├── data/          # Static data files
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── pages/         # Page components
└── assets/        # Static assets (images, logos)
```

## Contributing

This project follows Government of Canada development standards and accessibility guidelines. When contributing:

1. Ensure all components are accessible (WCAG 2.1 AA compliance)
2. Follow the established coding patterns and conventions
3. Include proper documentation and comments
4. Test across different screen sizes and devices

## License

This project is developed for the Government of Canada and follows applicable federal guidelines and policies.

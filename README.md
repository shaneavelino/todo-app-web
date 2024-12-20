# Task Management App

A Next.js application for managing tasks with color coding, completion tracking, and a clean, modern interface.

## Features

- Create, edit, and delete tasks
- Color code tasks
- Track task completion status
- Modern, responsive UI
- Real-time updates with SWR
- Server-side rendering with Next.js

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see backend repo)
- Local MySQL service running

## Installation

1. Clone the repository:
```bash
git clone https://github.com/shaneavelino/todo-app-web
cd todo-app-web
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```
Will need to update this URL in `hooks/use-tasks.tsx`

## Running the Application

### Development
```bash
npm run dev
```
The app will run on http://localhost:3001

### Production Build
```bash
npm run build
npm start
```

## Project Structure
```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── tasks/
│   │   ├── [id]/
│   │   │   └── page.tsx     # Edit task page
│   │   └── new/
│   │       └── page.tsx     # Create task page
├── components/
│   ├── ui/
│   │   ├── button.tsx       # Reusable button component
│   │   └── counter.tsx      # Task counter component
│   └── tasks/
│       ├── task-card.tsx    # Individual task display
│       ├── task-form.tsx    # Task creation/edit form
│       └── task-list.tsx    # List of tasks
├── hooks/
│   └── use-tasks.ts         # Task data fetching hook
└── types/
    └── task.ts              # TypeScript interfaces
```

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Create production build
- `npm start`: Start production server
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier

## Components

### TaskForm
Creates and edits tasks with properties:
- Title
- Color selection
- Completion status

### TaskCard
Displays individual tasks with:
- Title
- Color indicator
- Completion checkbox
- Edit and delete options

### Counter
Shows task statistics:
- Total tasks
- Completed tasks

## Task Colors
Available colors for tasks:
- RED
- ORANGE
- YELLOW
- GREEN
- BLUE
- INDIGO
- PURPLE
- PINK
- BROWN

## API Integration

The app uses SWR for data fetching with endpoints:
- GET /tasks - Fetch all tasks
- GET /tasks/:id - Fetch single task
- POST /tasks - Create task
- PUT /tasks/:id - Update task
- DELETE /tasks/:id - Delete task

## Styling

- Uses Tailwind CSS for styling
- Consistent color scheme and spacing
- Responsive design for all screen sizes

## Error Handling

The app handles:
- API errors
- Loading states
- Empty states
- Form validation

## Browser Support

Supports modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Common Issues

### SWR Cache
If data isn't updating, try:
```javascript
mutate('/tasks') // Revalidate tasks
```

### Build Errors
For build errors:
1. Clear `.next` directory
```bash
rm -rf .next
```
2. Rebuild
```bash
npm run build
```

- Backend API Repository: https://github.com/shaneavelino/todo-app-server
```

Would you like me to expand on any section or add additional documentation about specific components, styling, or functionality?

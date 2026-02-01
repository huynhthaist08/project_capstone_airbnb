## Công nghệ sử dụng

- ReactJS + Vite -> npm create vite@latest
- TypeScript
- TailwindCSS -> npm install tailwindcss @tailwindcss/vite
- Redux Toolkit
- Shadcn
- Axios -> npm install axios
- Tanstack React Query -> npm install @tanstack/react-query
- React Router DOM -> npm install react-router-dom
- Zod -> npm install zod
- React icons -> npm install react-icons
- qs -> npm install -D @types/qs

## Cấu trúc thư mục

src/
├── @types/ # TypeScript types
├── api/ # API services (Axios)
├── assets/ # Images, icons, fonts
├── components/ # Reusable UI components
├── config/ # App & library configuration
├── constants/ # Constant values
├── core/ # Core logic (auth, layout, guards), core UI Shadcn
├── hooks/ # Custom hooks
├── pages/ # Pages (route-level components)
├── routes/ # React Router definitions
├── themes/ # UI themes & styling system
├── utils/ # Utility functions
├── validators/ # Zod validation schemas

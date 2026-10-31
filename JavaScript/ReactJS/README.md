# Belajar React per Episode (versi lengkap)

Setiap folder = 1 episode = **1 proyek React (Vite) yang lengkap dan berdiri sendiri**.
Tanpa `node_modules`, jadi tinggal install lalu jalankan.

```bash
cd "01 - ReactJS Tutorial - 1 - Introduction"
npm install
npm run dev
```

## Isi tiap folder

- `README.md`: ringkasan materi episode itu
- `package.json`, `index.html`, `vite.config.js`: konfigurasi proyek
- `src/`: kode contoh (`App.jsx` atau `App.tsx` adalah demo episode)
- `.gitignore`

## Catatan

- Butuh Node.js 18 atau lebih baru.
- Episode 94–118 (React TypeScript) memakai `.tsx` dan punya `npm run typecheck`.
- Episode 41–43, 55–57, 66–67 memakai `axios` dan internet (API jsonplaceholder).
- Episode 120 (react-admin) memakai React 18 agar cocok dengan react-admin.
- Semua proyek memakai React 19 (kecuali episode 120) dan Vite 6.
- StrictMode sengaja dimatikan agar log console tidak muncul ganda.

## Seri

| Episode | Seri |
|---|---|
| 01–43 | ReactJS Tutorial |
| 44–76 | React Hooks Tutorial |
| 77 | How To Debug React Apps |
| 78–93 | React Render Tutorial |
| 94–118 | React TypeScript Tutorial |
| 119 | React Interview Questions |
| 120 | Learn react-admin in 30 minutes |

## Daftar folder

- 01 - ReactJS Tutorial - 1 - Introduction
- 02 - ReactJS Tutorial - 2 - Hello World
- 03 - ReactJS Tutorial - 3 - Folder Structure
- 04 - ReactJS Tutorial - 4 - Components
- 05 - ReactJS Tutorial - 5 - Functional Components
- 06 - ReactJS Tutorial - 6 - Class Components
- 07 - ReactJS Tutorial - 7 - Hooks Update
- 08 - ReactJS Tutorial - 8 - JSX
- 09 - ReactJS Tutorial - 9 - Props
- 10 - ReactJS Tutorial - 10 - State
- 11 - ReactJS Tutorial - 11 - setState
- 12 - ReactJS Tutorial - 12 - Destructuring props and state
- 13 - ReactJS Tutorial - 13 - Event Handling
- 14 - ReactJS Tutorial - 14 - Binding Event Handlers
- 15 - ReactJS Tutorial - 15 - Methods as props
- 16 - ReactJS Tutorial - 16 - Conditional Rendering
- 17 - ReactJS Tutorial - 17 - List Rendering
- 18 - ReactJS Tutorial - 18 - Lists and Keys
- 19 - ReactJS Tutorial - 19 - Index as Key Anti-pattern
- 20 - ReactJS Tutorial - 20 - Styling and CSS Basics
- 21 - ReactJS Tutorial - 21 - Basics of Form Handling
- 22 - ReactJS Tutorial - 22 - Component Lifecycle Methods
- 23 - ReactJS Tutorial - 23 - Component Mounting Lifecycle Methods
- 24 - ReactJS Tutorial - 24 - Component Updating Lifecycle Methods
- 25 - ReactJS Tutorial - 25 - Fragments
- 26 - ReactJS Tutorial - 26 - Pure Components
- 27 - ReactJS Tutorial - 27 - memo
- 28 - ReactJS Tutorial - 28 - Refs
- 29 - ReactJS Tutorial - 29 - Refs with Class Components
- 30 - ReactJS Tutorial - 30 - Forwarding Refs
- 31 - ReactJS Tutorial - 31 - Portals
- 32 - ReactJS Tutorial - 32 - Error Boundary
- 33 - ReactJS Tutorial - 33 - Higher Order Components (Part 1)
- 34 - ReactJS Tutorial - 34 - Higher Order Components (Part 2)
- 35 - ReactJS Tutorial - 35 - Higher Order Components (Part 3)
- 36 - ReactJS Tutorial - 36 - Render Props (Part 1)
- 37 - ReactJS Tutorial - 37 - Render Props (Part 2)
- 38 - ReactJS Tutorial - 38 - Context (Part 1)
- 39 - ReactJS Tutorial - 39 - Context (Part 2)
- 40 - ReactJS Tutorial - 40 - Context (Part 3)
- 41 - ReactJS Tutorial - 41 - HTTP and React
- 42 - ReactJS Tutorial - 42 - HTTP GET Request
- 43 - ReactJS Tutorial - 43 - HTTP Post Request
- 44 - React Hooks Tutorial - 1 - Introduction
- 45 - React Hooks Tutorial - 2 - useState Hook
- 46 - React Hooks Tutorial - 3 - useState with previous state
- 47 - React Hooks Tutorial - 4 - useState with object
- 48 - React Hooks Tutorial - 5 - useState with array
- 49 - React Hooks Tutorial - 6 - useEffect Hook
- 50 - React Hooks Tutorial - 7 - useEffect after render
- 51 - React Hooks Tutorial - 8 - Conditionally run effects
- 52 - React Hooks Tutorial - 9 - Run effects only once
- 53 - React Hooks Tutorial - 10 - useEffect with cleanup
- 54 - React Hooks Tutorial - 11 - useEffect with incorrect dependency
- 55 - React Hooks Tutorial - 12 - Fetching data with useEffect Part 1
- 56 - React Hooks Tutorial - 13 - Fetching data with useEffect Part 2
- 57 - React Hooks Tutorial - 14 - Fetching data with useEffect Part 3
- 58 - React Hooks Tutorial - 15 - useContext Hook Part 1
- 59 - React Hooks Tutorial - 16 - useContext Hook Part 2
- 60 - React Hooks Tutorial - 17 - useContext Hook Part 3
- 61 - React Hooks Tutorial - 18 - useReducer Hook
- 62 - React Hooks Tutorial - 19 - useReducer (simple state - action)
- 63 - React Hooks Tutorial - 20 - useReducer (complex state - action)
- 64 - React Hooks Tutorial - 21 - Multiple useReducers
- 65 - React Hooks Tutorial - 22 - useReducer with useContext
- 66 - React Hooks Tutorial - 23 - Fetching data with useReducer Part 1
- 67 - React Hooks Tutorial - 24 - Fetching data with useReducer Part 2
- 68 - React Hooks Tutorial - 25 - useState vs useReducer
- 69 - React Hooks Tutorial - 26 - useCallback Hook
- 70 - React Hooks Tutorial - 27 - useMemo Hook
- 71 - React Hooks Tutorial - 28 - useRef Hook Part 1
- 72 - React Hooks Tutorial - 29 - useRef Hook Part 2
- 73 - React Hooks Tutorial - 30 - Custom Hooks
- 74 - React Hooks Tutorial - 31 - useDocumentTitle Custom Hook
- 75 - React Hooks Tutorial - 32 - useCounter Custom Hook
- 76 - React Hooks Tutorial - 33 - useInput Custom Hook
- 77 - How To Debug React Apps
- 78 - React Render Tutorial - 1 - Introduction
- 79 - React Render Tutorial - 2 - Rendering
- 80 - React Render Tutorial - 3 - useState
- 81 - React Render Tutorial - 4 - useReducer
- 82 - React Render Tutorial - 5 - State Immutability
- 83 - React Render Tutorial - 6 - Parent and Child
- 84 - React Render Tutorial - 7 - Same Element Reference
- 85 - React Render Tutorial - 8 - React memo
- 86 - React Render Tutorial - 9 - Questions on Optimization
- 87 - React Render Tutorial - 10 - Incorrect memo with children
- 88 - React Render Tutorial - 11 - Incorrect memo with Impure Component
- 89 - React Render Tutorial - 12 - Incorrect memo with props Reference
- 90 - React Render Tutorial - 13 - useMemo and useCallback
- 91 - React Render Tutorial - 14 - Context
- 92 - React Render Tutorial - 15 - Context and memo
- 93 - React Render Tutorial - 16 - Context and Same Element Reference
- 94 - React TypeScript Tutorial - 1 - Introduction
- 95 - React TypeScript Tutorial - 2 - Getting Started
- 96 - React TypeScript Tutorial - 3 - Typing Props
- 97 - React TypeScript Tutorial - 4 - Basic Props
- 98 - React TypeScript Tutorial - 5 - Advanced Props
- 99 - React TypeScript Tutorial - 6 - Event Props
- 100 - React TypeScript Tutorial - 7 - Style Props
- 101 - React TypeScript Tutorial - 8 - Prop Types and Tips
- 102 - React TypeScript Tutorial - 9 - useState Hook
- 103 - React TypeScript Tutorial - 10 - useState Future Value
- 104 - React TypeScript Tutorial - 11 - useState Type Assertion
- 105 - React TypeScript Tutorial - 12 - useReducer Hook
- 106 - React TypeScript Tutorial - 13 - useReducer Strict Action Types
- 107 - React TypeScript Tutorial - 14 - useContext Hook
- 108 - React TypeScript Tutorial - 15 - useContext Future Value
- 109 - React TypeScript Tutorial - 16 - useRef Hook
- 110 - React TypeScript Tutorial - 17 - Class Component
- 111 - React TypeScript Tutorial - 18 - Component Prop
- 112 - React TypeScript Tutorial - 19 - Generic Props
- 113 - React TypeScript Tutorial - 20 - Restricting Props
- 114 - React TypeScript Tutorial - 21 - Template Literals and Exclude
- 115 - React TypeScript Tutorial - 22 - Wrapping HTML Elements
- 116 - React TypeScript Tutorial - 23 - Extracting a Components Prop Types
- 117 - React TypeScript Tutorial - 24 - Polymorphic Components
- 118 - React TypeScript Tutorial - 25 - Wrapping up
- 119 - React Interview Questions - A Preparation Guide
- 120 - Learn react-admin in 30 minutes

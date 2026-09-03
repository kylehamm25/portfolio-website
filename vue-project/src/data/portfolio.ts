// Single source of truth for site content. The interactive terminal and the
// scrolling sections both read from here so they can't drift apart.

export const PROFILE = {
  name: 'Kyle Hammond',
  role: 'Full-Stack Software Developer',
  location: 'Elkridge, MD',
  email: 'kylehamm25@gmail.com',
  github: 'https://github.com/kylehamm25',
  linkedin: 'https://www.linkedin.com/in/kyle-hammond-85902b395/',
  stack: ['Python', 'TypeScript', 'React', 'Next.js', 'Node', 'AWS', 'PostgreSQL'],
  blurb:
    "Computer Science graduate from UMBC. I'm passionate about full-stack development, cloud technologies, and solving real-world problems with software.",
}

// Solid block-letter banner (5x5 dot-matrix glyphs, ▮ pixels). Bigger and
// bolder than a figlet font, and every column lines up since it's built
// on a fixed grid rather than variable-width strokes.
export const BANNER = String.raw`▮   ▮ ▮   ▮ ▮     ▮▮▮▮▮   ▮   ▮  ▮▮▮  ▮   ▮ ▮   ▮  ▮▮▮  ▮   ▮ ▮▮▮▮
▮  ▮   ▮ ▮  ▮     ▮       ▮   ▮ ▮   ▮ ▮▮ ▮▮ ▮▮ ▮▮ ▮   ▮ ▮▮  ▮ ▮   ▮
▮▮▮     ▮   ▮     ▮▮▮▮    ▮▮▮▮▮ ▮▮▮▮▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮   ▮ ▮ ▮ ▮ ▮   ▮
▮  ▮    ▮   ▮     ▮       ▮   ▮ ▮   ▮ ▮   ▮ ▮   ▮ ▮   ▮ ▮  ▮▮ ▮   ▮
▮   ▮   ▮   ▮▮▮▮▮ ▮▮▮▮▮   ▮   ▮ ▮   ▮ ▮   ▮ ▮   ▮  ▮▮▮  ▮   ▮ ▮▮▮▮ `

export const SOCIALS = [
  { label: 'github',   href: 'https://github.com/kylehamm25' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/kyle-hammond-85902b395/' },
  { label: 'email',    href: 'mailto:kylehamm25@gmail.com' },
]

export type Project = {
  id?: string
  title: string
  subtitle: string
  period: string
  review?: string
  website?: string
  tagline: string
  details: string[]
}

export const PROJECTS: Project[] = [
  {
    // the id doubles as the `cat projects/<id>` argument, so it's the full
    // title slugified rather than an abbreviation — keeps the command
    // guessable straight from what `ls projects` printed
    id: 'salon-t',
    title: 'Salon T',
    subtitle: 'Next.js, AWS Lambda, DynamoDB',
    period: 'Jan. 2026 — Present',
    website: 'https://www.beautysalont.com',
    tagline: 'Full salon management platform for a multi-employee business.',
    details: [
      'Sole developer of a full salon management platform (Next.js, AWS Lambda, DynamoDB) supporting daily operations for a multi-employee business, handling hundreds of bookings monthly',
      'Eliminated double-booking across all staff calendars by building a real-time scheduling engine with automated conflict detection, processing hundreds of appointments monthly',
      'Automated payroll reporting for 10+ employees, aggregating revenue, tips, and product sales, applying commission calculations, and generating bi-weekly CSV exports',
      'Designed DynamoDB schemas and REST APIs to reliably manage thousands of records across appointments, customers, payroll, and inventory',
      'Built an OAuth2-secured admin dashboard with RBAC, enabling owners and staff to manage schedules, bulk operations, and multi-employee bookings through a purpose-built interface',
    ],
  },
  {
    id: 'ebay-data-analysis-automation',
    title: 'eBay Data Analysis & Automation',
    subtitle: 'Python, Chrome Extension, eBay APIs',
    period: 'June 2023 – Present',
    review: 'https://github.com/kylehamm25/ebaypricer',
    tagline: 'Automated repricing and profit tracking across hundreds of listings.',
    details: [
      'Wrote a Python script that pulls sold orders from the Trading API, combines them with fee data from the Finances API, and formats the data into an Excel sheet for profit tracking',
      'Built a pricing model that checks the Browse API for current competitive prices and automatically adjusts my listing prices, allowing for market price accuracy and visibility over 100s of listings',
      'Built a Chrome extension (Manifest V3) that pre-fills eBay listing forms, cutting listing creation time by an estimated 80%',
    ],
  },
  {
    id: 'industry-sponsored-inventory-system',
    title: 'Industry-Sponsored Inventory System',
    subtitle: 'React Native, TypeScript, Supabase',
    period: 'Jan. 2026 – May 2026',
    tagline: 'Mobile material tracking for an HVAC/MEP contractor.',
    details: [
      'Delivered a production mobile app (React Native) for an HVAC/MEP contractor, giving field and warehouse teams real-time visibility into material inventory across multiple locations',
      'Designed role-based workflows for material requests, inventory transfers, delivery confirmation, and approval management',
      'Cut manual data entry by integrating Gemini OCR to parse packing slips and purchase orders directly into structured inventory records',
      'Built a Supabase/PostgreSQL backend handling real-time sync, auth, and full-text search across thousands of inventory records at multiple sites',
    ],
  },
]

export const SKILL_GROUPS = [
  { label: 'Languages',     items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C++', 'SQL'] },
  { label: 'Frontend',      items: ['React', 'React Native', 'Next.js', 'Expo', 'Vue'] },
  { label: 'Backend',       items: ['Node.js', 'REST APIs', 'AWS Lambda', 'API Gateway', 'OAuth 2.0'] },
  { label: 'Databases',     items: ['PostgreSQL', 'DynamoDB', 'Supabase'] },
  { label: 'Cloud & Tools', items: ['AWS', 'Vercel', 'Git', 'GitHub'] },
]

// Extended case-study content, printed by the terminal when the user runs
// `cat projects/<id>`.
export type DetailBlock = { title: string; image?: string; alt?: string; items: string[] }

export const PROJECT_DETAILS: Record<string, { problem: string; problemDetail: string[]; blocks: DetailBlock[] }> = {
  'salon-t': {
    problem:
      'Contracted as sole developer to build a full salon management platform for a growing multi-employee business, replacing manual, paper-based scheduling and payroll.',
    problemDetail: [
      'No online booking system, leading to double-booked appointments across staff calendars',
      'Payroll, tips, and commission calculations tracked manually for 10+ employees',
      'No centralized system for managing customers, services, stylists, and appointment records',
    ],
    blocks: [
      {
        title: 'Solution',
        items: [
          'A full salon management platform (Next.js, AWS Lambda, DynamoDB) supporting daily operations for a multi-employee business, handling hundreds of bookings monthly',
          'Real-time scheduling engine with automated conflict detection, eliminating double-booking across all staff calendars',
          'Automated payroll reporting for 10+ employees, aggregating revenue, tips, and product sales, applying commission calculations, and generating bi-weekly CSV exports',
          'DynamoDB schemas and REST APIs reliably managing thousands of records across appointments, customers, payroll, and inventory',
        ],
      },
      {
        title: 'Home Page',
        image: '/images/home.webp',
        alt: 'Salon T home page',
        items: ['Includes business overview, navigation, socials and contact information'],
      },
      {
        title: 'Appointment Page',
        image: '/images/appointments.webp',
        alt: 'Salon T appointment booking page',
        items: [
          'Customer appointment booking system',
          'Allows for selecting preferred date and time, service, and stylist',
          'Guards against double booking, with validation for date and time availability as well as service and stylist selection',
          'Sends confirmation emails to both the customer and the salon',
        ],
      },
      {
        title: 'Admin Page (Mock Data)',
        image: '/images/employee.webp',
        alt: 'Salon T admin dashboard',
        items: [
          'Admin dashboard with secure login and authentication through AWS Cognito',
          'Employee hours management, allowing for selecting hours/days available',
          'Daily and weekly view for appointments by date, time, and stylist',
          'Ability to view, edit, and delete appointments',
          'Ability to add, edit, and delete services and stylists',
          'Tracking for item sales by employee',
          'Exportable data for appointments, services, and stylists in CSV format',
        ],
      },
      {
        title: 'Tech Stack',
        items: [
          'Frontend: Next.js, React, TypeScript, Tailwind CSS',
          'Backend: AWS Lambda (Python 3), API Gateway, DynamoDB, Cognito, CloudFront, SES',
          'Deployment: Vercel',
        ],
      },
    ],
  },
  'ebay-data-analysis-automation': {
    problem:
      'Sold across hundreds of eBay listings with no automated way to track per-listing profitability, stay competitively priced, or speed up repetitive listing creation.',
    problemDetail: [
      'Profit per listing (after eBay fees) had to be calculated by hand from raw order and fee data',
      'Prices had to be checked and adjusted manually to stay competitive across hundreds of listings',
      'Creating a new listing meant re-entering the same fields by hand every time',
    ],
    blocks: [
      {
        title: 'Solution',
        items: [
          'A Python script that pulls sold orders from the Trading API, combines them with fee data from the Finances API, and formats the data into an Excel sheet for profit tracking',
          'A pricing model that checks the Browse API for current competitive prices and automatically adjusts listing prices, keeping pricing accurate and visible across 100s of listings',
          'A Chrome extension (Manifest V3) that pre-fills eBay listing forms, cutting listing creation time by an estimated 80%',
        ],
      },
      {
        title: 'Tech Stack',
        items: [
          'Python',
          'eBay Trading, Finances & Browse APIs',
          'Chrome Extension (Manifest V3)',
        ],
      },
    ],
  },
  'industry-sponsored-inventory-system': {
    problem:
      'Industry-sponsored project focused on building a deployable internal application for HVAC/MEP construction operations. The primary objective was a finished, usable product that solves an active operational problem.',
    problemDetail: [
      'Limited visibility into construction materials from delivery through installation',
      'Materials frequently arrive on pallets with little notice and vague packing slips',
      'Leads to misplaced material, reorders, and lost field productivity',
    ],
    blocks: [
      {
        title: 'Solution',
        items: [
          'A mobile-first inventory and material-tracking system that logs deliveries (including photos of packing slips)',
          'Tracks quantities and physical locations (warehouse, yard, jobsite)',
          'Allows field crews to request material',
          'Provides visibility and accountability for project managers',
        ],
      },
      {
        title: 'Sign-in / Sign-up',
        image: '/images/signin.webp',
        alt: 'Inventory system sign-in screen',
        items: [
          'Secure sign-in/sign-up with role-based access control (RBAC) for Admin, Project Managers, Logisticians, and Field Workers',
          'Authentication handled by Supabase Auth with JWT tokens',
        ],
      },
      {
        title: 'Location Selection',
        image: '/images/homepage.webp',
        alt: 'Inventory system location selection screen',
        items: [
          'Toggle for selecting a warehouse to view',
          'Dropdown for selecting a specific field location',
          'Admin-exclusive features for managing locations and assigning users to specific locations',
        ],
      },
      {
        title: 'Location View',
        image: '/images/location_view.webp',
        alt: 'Inventory system location detail screen',
        items: [
          'Displays inventory for the selected location, including item name, quantity, and status',
          'Search bar for filtering items by name or status',
          'Allows users to request items, transfer inventory between locations, and confirm deliveries',
          'Project Managers can approve or reject requests',
          'Upload file button for adding new inventory items from purchase orders using Gemini OCR',
        ],
      },
      {
        title: 'Request View',
        image: '/images/request_view.webp',
        alt: 'Inventory system request screen',
        items: [
          'Allows users to add items to a request list, specifying the quantity needed',
          'Users can submit requests for approval, and Project Managers can view and manage these requests',
          'History of past requests and their statuses',
          'Custom items can be added to requests',
        ],
      },
      {
        title: 'Database Schema',
        image: '/images/database.webp',
        alt: 'Inventory system database schema',
        items: [
          'Supabase schema includes tables for users, locations, inventory items, requests, and approvals',
          'Designed to support role-based access control and efficient querying of inventory and request data',
        ],
      },
      {
        title: 'Tech Stack',
        items: [
          'React Native',
          'TypeScript',
          'Supabase (PostgreSQL, Auth, Storage)',
          'Gemini OCR for document processing',
        ],
      },
    ],
  },
}

export const EDUCATION = {
  degree: 'Bachelor of Science in Computer Science',
  school: 'University of Maryland, Baltimore County',
  location: 'Baltimore, MD',
  period: 'Aug. 2021 — May 2026',
  coursework: [
    'Data Structures',
    'Algorithms',
    'Operating Systems',
    'Computer Networks',
    'Software Engineering',
    'Artificial Intelligence',
    'Machine Learning',
  ],
}

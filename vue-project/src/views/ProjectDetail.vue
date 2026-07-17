<template>
  <div class="detail-page project-detail">
    <div class="detail-container">

      <router-link to="/" class="back-link">
        <span class="back-arrow">←</span> Back to Portfolio
      </router-link>

      <div class="detail-header">
        <h1 class="detail-title">{{ project.title }}</h1>
        <p class="detail-company">{{ project.subtitle }}</p>
        <span class="detail-period">{{ project.period }}</span>
      </div>

      <div class="detail-card">
        <div class="detail-card-body">
          <h2 class="detail-section-title">Problem Statement</h2>
          <p class="detail-text">{{ project.problem }}</p>
          <ul class="detail-list">
            <li v-for="(d, j) in project.problem_detail" :key="j" class="detail-item">
              <span class="detail-bullet">▸</span> {{ d }}
            </li>
          </ul>
        </div>
      </div>

      <div class="detail-card">
        <div class="detail-card-body">
          <h2 class="detail-section-title">Solution</h2>
          <ul class="detail-list">
            <li v-for="(d, j) in project.solution" :key="j" class="detail-item">
              <span class="detail-bullet">▸</span> {{ d }}
            </li>
          </ul>
        </div>
      </div>

      <div class="detail-card">
        <a href="/images/signin.webp" target="_blank" rel="noopener noreferrer" class="detail-image-link">
          <img src="/images/signin.webp" alt="Salon T signin page" class="detail-image" />
        </a>
        <div class="detail-card-body">
          <h2 class="detail-section-title">Sign-in/Sign-up</h2>
          <ul class="detail-list">
            <li v-for="(d, j) in project.signin" :key="j" class="detail-item">
              <span class="detail-bullet">▸</span> {{ d }}
            </li>
          </ul>
        </div>
      </div>

      <div class="detail-card">
        <a href="/images/homepage.webp" target="_blank" rel="noopener noreferrer" class="detail-image-link">
          <img src="/images/homepage.webp" alt="Salon T homepage" class="detail-image" />
        </a>
        <div class="detail-card-body">
          <h2 class="detail-section-title">Location Selection</h2>
          <ul class="detail-list">
            <li v-for="(d, j) in project.location" :key="j" class="detail-item">
              <span class="detail-bullet">▸</span> {{ d }}
            </li>
          </ul>
        </div>
      </div>

      <div class="detail-card">
        <a href="/images/location_view.webp" target="_blank" rel="noopener noreferrer" class="detail-image-link">
          <img src="/images/location_view.webp" alt="Salon T location view" class="detail-image" />
        </a>
        <div class="detail-card-body">
          <h2 class="detail-section-title">Location View</h2>
          <ul class="detail-list">
            <li v-for="(d, j) in project.location_view" :key="j" class="detail-item">
              <span class="detail-bullet">▸</span> {{ d }}
            </li>
          </ul>
        </div>
      </div>

      <div class="detail-card">
        <a href="/images/request_view.webp" target="_blank" rel="noopener noreferrer" class="detail-image-link">
          <img src="/images/request_view.webp" alt="Salon T request view" class="detail-image" />
        </a>
        <div class="detail-card-body">
          <h2 class="detail-section-title">Request View</h2>
          <ul class="detail-list">
            <li v-for="(d, j) in project.request_view" :key="j" class="detail-item">
              <span class="detail-bullet">▸</span> {{ d }}
            </li>
          </ul>
        </div>
      </div>

      <div class="detail-card">
        <a href="/images/database.webp" target="_blank" rel="noopener noreferrer" class="detail-image-link">
          <img src="/images/database.webp" alt="Salon T database view" class="detail-image" />
        </a>
        <div class="detail-card-body">
          <h2 class="detail-section-title">Database Schema</h2>
          <ul class="detail-list">
            <li v-for="(d, j) in project.database" :key="j" class="detail-item">
              <span class="detail-bullet">▸</span> {{ d }}
            </li>
          </ul>
        </div>
      </div>

      <div class="detail-card">
        <div class="detail-card-body">
          <h2 class="detail-section-title">Tech Stack</h2>
          <ul class="detail-list">
            <li v-for="(d, j) in project.tech_stack" :key="j" class="detail-item">
              <span class="detail-bullet">▸</span> {{ d }}
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
const project = {
  id: 'inventory-system',
  title: 'Industry-Sponsored Inventory System',
  subtitle: 'React Native, TypeScript, Supabase',
  period: 'Jan. 2026 – May 2026',
  problem: 'Industry-sponsored project focused on building a deployable internal application for HVAC/MEP construction operations. The primary objective was a finished, usable product that solves an active operational problem.',
  problem_detail: [
    'Limited visibility into construction materials from delivery through installation',
    'Materials frequently arrive on pallets with little notice and vague packing slips',
    'Leads to misplaced material, reorders, and lost field productivity',
  ],
  solution: [
    'A mobile-first inventory and material-tracking system that logs deliveries (including photos of packing slips)',
    'Tracks quantities and physical locations (warehouse, yard, jobsite)',
    'Allows field crews to request material',
    'Provides visibility and accountability for project managers',
  ],
  signin: [
    'Secure Sign-In/Sign-Up with Role-Based Access Control (RBAC) for Admin, Project Managers, Logisticians, and Field Workers',
    'Authentication handled by Supabase Auth with JWT tokens'
  ],
  location: [
    'Toggle for selecting a warehouse to view',
    'Dropdown for selecting a specific field location',
    'Includes admin exclusive features for managing locations and assigning users to specific locations'
  ],
  location_view: [
    'Displays inventory for the selected location, including item name, quantity, and status',
    'Includes a search bar for filtering items by name or status',
    'Allows users to request items, transfer inventory between locations, and confirm deliveries',
    'Project Managers can approve or reject requests',
    'Upload file button for adding new inventory items with purchases orders using Gemini OCR'
  ],
  request_view: [
    'Allows users to add items to a request list, specifying the quantity needed',
    'Users can submit requests for approval, and Project Managers can view and manage these requests',
    'Includes a history of past requests and their statuses',
    'Custom items can be added to requests'
  ],
  database: [
    'Supabase database schema includes tables for users, locations, inventory items, requests, and approvals',
    'Database is designed to support role-based access control and efficient querying of inventory and request data'
  ],
  tech_stack: [
    'React Native',
    'TypeScript',
    'Supabase (PostgreSQL, Auth, Storage)',
    'Gemini OCR for document processing'
  ],
}
</script>

<style>
.detail-page {
  min-height: 100vh;
  padding: calc(var(--nav-h) + var(--sp-16)) var(--sp-8) var(--sp-24);
}

.detail-container {
  max-width: var(--max-w);
  margin: 0 auto;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  transition: color 0.2s;
  margin-bottom: var(--sp-12);
}

.back-link:hover {
  color: var(--indigo);
}

.back-arrow {
  font-size: var(--text-lg);
}

.detail-header {
  margin-bottom: var(--sp-8);
}

.detail-title {
  font-family: var(--font-display);
  font-size: clamp(var(--text-2xl), 4vw, var(--text-3xl));
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1.15;
  margin-bottom: var(--sp-3);
}

.detail-company {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--indigo);
  margin-bottom: var(--sp-2);
}

.detail-period {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

.detail-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: var(--sp-8);
}

/* constrain images on project page only */
.project-detail .detail-image-link {
  display: flex;
  justify-content: center;
}

.project-detail .detail-image {
  max-width: 500px;
  width: 100%;
  display: block;
}

.detail-card-body {
  padding: var(--sp-8);
}

.detail-card-body p {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.7;
}

.detail-text {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: var(--sp-6);
}

.detail-sub-title {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--indigo);
  margin-bottom: var(--sp-4);
}

.detail-section-title {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: var(--sp-6);
}

.detail-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}

.detail-item {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.7;
  padding-left: var(--sp-4);
  position: relative;
}

.detail-bullet {
  position: absolute;
  left: 0;
  color: var(--indigo);
}

@media (max-width: 768px) {
  .detail-page {
    padding: calc(var(--nav-h) + var(--sp-8)) var(--sp-4) var(--sp-16);
  }

  .detail-card-body {
    padding: var(--sp-6);
  }
}
</style>

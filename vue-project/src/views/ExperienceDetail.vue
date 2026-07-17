<template>
  <div class="detail-page">
    <div class="detail-container">
      
      <router-link to="/" class="back-link">
        <span class="back-arrow">←</span> Back to Portfolio
      </router-link>

      <div class="detail-header">
        <h1 class="detail-title">{{ experience.role }}</h1>
        <p class="detail-company">{{ experience.company }} — {{ experience.location }}</p>
        <span class="detail-period">{{ experience.period }}</span>
      </div>

      <div class="detail-card">
        <a href="/images/home.webp" target="_blank" rel="noopener noreferrer" class="detail-image-link">
          <img src="/images/home.webp" alt="Salon T dashboard" class="detail-image" />
        </a>
        <div class="detail-card-body">
          <h2 class="detail-section-title">Home Page Features</h2>
          <ul class="detail-list">
            <li v-for="(d, j) in experience.homepage" :key="j" class="detail-item">
              <span class="detail-bullet">▸</span> {{ d }}
            </li>
          </ul>
        </div>
      </div>

      <div class="detail-card">
        <a href="/images/appointments.webp" target="_blank" rel="noopener noreferrer" class="detail-image-link">
          <img src="/images/appointments.webp" alt="Salon T appointment page" class="detail-image" />
        </a>
        <div class="detail-card-body">
          <h2 class="detail-section-title">Appointment Page</h2>
          <ul class="detail-list">
            <li v-for="(d, j) in experience.appointment" :key="j" class="detail-item">
              <span class="detail-bullet">▸</span> {{ d }}
            </li>
          </ul>
        </div>
      </div>

      <div class="detail-card">
        <a href="/images/employee.webp" target="_blank" rel="noopener noreferrer" class="detail-image-link">
          <img src="/images/employee.webp" alt="Salon T employee page" class="detail-image" />
        </a>
        <div class="detail-card-body">
          <h2 class="detail-section-title">Admin Page (Mock Data)</h2>
          <ul class="detail-list">
            <li v-for="(d, j) in experience.admin" :key="j" class="detail-item">
              <span class="detail-bullet">▸</span> {{ d }}
            </li>
          </ul>
        </div>
      </div>

      <div class="detail-card">
        <div class="detail-card-body">
          <h2 class="detail-section-title">Tech Stack</h2>
          <ul class="detail-list">
            <li v-for="(d, j) in experience.details" :key="j" class="detail-item">
              <span class="detail-bullet">▸</span> {{ d }}
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
const experience = {
  id: 'salon-t',
  role: 'Full-Stack Software Developer (Contract)',
  company: 'Salon T',
  location: 'Gaithersburg, MD',
  period: 'Jan. 2026 — Present',
  details: [
    'Frontend: Next.js, React, TypeScript, Tailwind CSS',
    'Backend: AWS Lambda (Python 3), API Gateway, DynamoDB, Cognito, CloudFront, SES',
    'Deployment: Vercel',
  ],
  homepage: [
    'Includes business overview, navigation, socials and contact information'
  ],
  appointment: [
    'Customer appointment booking system',
    'Allows for selecting preferred date and time, service, and stylist',
    'Includes guards double booking and validation for date and time availability, as well as service and stylist selection',
    'Sends confirmation emails to both the customer and the salon',
   ],
  admin: [
    'Admin dashboard with secure login and authentication through AWS Cognito',
    'Includes employee hours management, allowing for selecting hours/days available',
    'Daily and weekly view for appointment by date, time, and stylist',
    'Ability to view, edit, and delete appointments',
    'Ability to add, edit, and delete services and stylists',
    'Tracking for item sales by employee',
    'Exportable data for appointments, services, and stylists in CSV format'
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

.detail-image-link {
  display: block;
}

.detail-image {
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

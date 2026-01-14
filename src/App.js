import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import * as FigmaAssets from './figmaAssets';

// Icons Component
const Icons = {
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  Search: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  Filter: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  ),
  Back: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  ),
  Close: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  ChevronRight: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  Play: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  Camera: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  MoreVertical: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="5" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="19" r="2" />
    </svg>
  ),
  ChevronRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  ChevronDown: ({ className }) => (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  Tag: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  Download: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  ),
  Trash: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  Calendar: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Map: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  ),
  User: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Image: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  Video: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  Bell: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Chat: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Briefcase: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  Schedule: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Tasks: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  Announcement: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M6 8v8M18 8v8" />
      <path d="M9.5 17v1a2.5 2.5 0 0 0 5 0v-1" />
    </svg>
  ),
  Megaphone: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l18-5v12L3 13v-2z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  ),
  Gallery: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  ),
  Scan: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M23 6V1h-5M1 6V1h5M23 18v5h-5M1 18v5h5" />
      <line x1="1" y1="12" x2="23" y2="12" />
    </svg>
  ),
  Photos: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  Plus: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Edit: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  Info: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  ZoomIn: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  ),
  Share: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  Wifi: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 12.55a11 11 0 0 1 14.08 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  Signal: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <rect x="1" y="14" width="4" height="8" rx="1"/>
      <rect x="7" y="10" width="4" height="12" rx="1"/>
      <rect x="13" y="6" width="4" height="16" rx="1"/>
      <rect x="19" y="2" width="4" height="20" rx="1"/>
    </svg>
  ),
  Battery: () => (
    <svg width="26" height="14" viewBox="0 0 26 14" fill="currentColor">
      <rect x="0.5" y="0.5" width="22" height="13" rx="3" stroke="currentColor" fill="none"/>
      <rect x="2" y="2" width="18" height="10" rx="1.5"/>
      <path d="M24 4.5v5a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2z"/>
    </svg>
  ),
  Refresh: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  ),
  Lock: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  CloudOff: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M16.72 11.06A6.01 6.01 0 0 1 22 17a5 5 0 0 1-5 5H7a7 7 0 0 1-6.73-9.04" />
      <path d="M7.73 7.73A7 7 0 0 1 16 6a6.02 6.02 0 0 1 3.72 2.06" />
    </svg>
  ),
  Grid: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  List: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  WifiOff: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
      <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
      <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
      <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  ),
  AlertCircle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  ImageOff: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="2" y1="2" x2="22" y2="22" />
      <path d="M10.41 10.41a2 2 0 1 1-2.83-2.83" />
      <line x1="13.5" y1="13.5" x2="6" y2="21" />
      <line x1="18" y1="12" x2="21" y2="15" />
      <path d="M3.59 3.59A1.99 1.99 0 0 0 3 5v14c0 1.1.9 2 2 2h14c.55 0 1.05-.22 1.41-.59" />
      <path d="M21 15V5a2 2 0 0 0-2-2H9" />
    </svg>
  ),
  FileText: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  Building: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
    </svg>
  ),
  Pause: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  ),
  Volume2: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  ),
  VolumeX: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  ),
  Maximize: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  ),
  Eye: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  EyeOff: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ),
  Clock: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
};

// Helper function to get date string relative to today
const getDateString = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

// Sample photo data with edge cases - dates relative to today
const samplePhotos = [
  // TODAY
  { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?w=400&h=400&fit=crop', job: '#2024-1429', jobTitle: 'Oak Street - Complete Roof Replacement', customer: 'Richard Mathew', address: '1234 Oak St, Seattle, WA', company: 'Mathew Properties', uploadedBy: 'Henry Jones', date: getDateString(0), tags: ['Shingles', 'Before'], description: 'Initial roof condition assessment' },
  { id: 101, type: 'image', url: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=400&h=400&fit=crop', job: '#2024-1429', jobTitle: 'Oak Street - Complete Roof Replacement', customer: 'Richard Mathew', address: '1234 Oak St, Seattle, WA', company: 'Mathew Properties', uploadedBy: 'Henry Jones', date: getDateString(0), tags: ['Damage', 'Assessment'], description: 'Damaged shingles close-up' },
  { id: 102, type: 'video', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', duration: '1:30', job: '#2024-1429', jobTitle: 'Oak Street - Complete Roof Replacement', customer: 'Richard Mathew', address: '1234 Oak St, Seattle, WA', company: 'Mathew Properties', uploadedBy: 'Henry Jones', date: getDateString(0), tags: ['Walkthrough', 'Inspection'], description: 'Full roof inspection walkthrough' },
  { id: 103, type: 'image', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop', job: '#2024-1429', jobTitle: 'Oak Street - Complete Roof Replacement', customer: 'Richard Mathew', address: '1234 Oak St, Seattle, WA', company: 'Mathew Properties', uploadedBy: 'Henry Jones', date: getDateString(0), tags: ['Tear-off', 'Progress'], description: 'Old shingles removal' },
  
  // YESTERDAY
  { id: 2, type: 'video', url: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?w=400&h=400&fit=crop', duration: '0:45', job: '#2024-1430', jobTitle: 'Elm Drive - Storm Damage Repair', customer: 'Sarah Chen', address: '567 Elm Dr, Portland, OR', company: 'Chen Residence', uploadedBy: 'Mike Wilson', date: getDateString(1), tags: ['Storm', 'Damage'], description: 'Storm damage assessment video' },
  { id: 201, type: 'image', url: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400&h=400&fit=crop', job: '#2024-1430', jobTitle: 'Elm Drive - Storm Damage Repair', customer: 'Sarah Chen', address: '567 Elm Dr, Portland, OR', company: 'Chen Residence', uploadedBy: 'Mike Wilson', date: getDateString(1), tags: ['Missing', 'Shingles'], description: 'Missing shingles from wind' },
  { id: 202, type: 'image', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=400&fit=crop', job: '#2024-1430', jobTitle: 'Elm Drive - Storm Damage Repair', customer: 'Sarah Chen', address: '567 Elm Dr, Portland, OR', company: 'Chen Residence', uploadedBy: 'Mike Wilson', date: getDateString(1), tags: ['Repair', 'Progress'], description: 'Repair in progress' },
  { id: 203, type: 'image', url: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=400&h=400&fit=crop', job: '#2024-1430', jobTitle: 'Elm Drive - Storm Damage Repair', customer: 'Sarah Chen', address: '567 Elm Dr, Portland, OR', company: 'Chen Residence', uploadedBy: 'Tom Anderson', date: getDateString(1), tags: ['Complete', 'After'], description: 'Repair completed' },
  { id: 3, type: 'image', url: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=400&h=400&fit=crop', job: '#2024-1431', jobTitle: 'Valley View - Leak Inspection', customer: 'John Davis', address: '890 Valley View Rd, Bellevue, WA', company: 'Davis Family Trust', uploadedBy: 'Henry Jones', date: getDateString(1), tags: ['Leak', 'Inspection'], description: 'Leak source identified at flashing' },
  
  // LAST WEEK
  { id: 106, type: 'image', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=400&fit=crop', job: '#2024-1429', jobTitle: 'Oak Street - Complete Roof Replacement', customer: 'Richard Mathew', company: 'Mathew Properties', uploadedBy: 'Henry Jones', date: getDateString(2), tags: ['Underlayment', 'Installation'], description: 'New underlayment installed' },
  { id: 107, type: 'image', url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=400&fit=crop', job: '#2024-1429', jobTitle: 'Oak Street - Complete Roof Replacement', customer: 'Richard Mathew', company: 'Mathew Properties', uploadedBy: 'Henry Jones', date: getDateString(3), tags: ['Flashing', 'Detail'], description: 'Chimney flashing detail' },
  { id: 108, type: 'video', url: 'https://images.unsplash.com/photo-1590725121839-892b458a74fe?w=400&h=400&fit=crop', duration: '0:32', job: '#2024-1429', jobTitle: 'Oak Street - Complete Roof Replacement', customer: 'Richard Mathew', company: 'Mathew Properties', uploadedBy: 'Henry Jones', date: getDateString(4), tags: ['Shingles', 'Installation'], description: 'Shingle installation process' },
  { id: 109, type: 'image', url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=400&fit=crop', job: '#2024-1429', jobTitle: 'Oak Street - Complete Roof Replacement', customer: 'Richard Mathew', company: 'Mathew Properties', uploadedBy: 'Henry Jones', date: getDateString(5), tags: ['Complete', 'Final'], description: 'Completed roof view' },
  { id: 110, type: 'image', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop', job: '#2024-1429', jobTitle: 'Oak Street - Complete Roof Replacement', customer: 'Richard Mathew', company: 'Mathew Properties', uploadedBy: 'Henry Jones', date: getDateString(6), tags: ['Ridge', 'Vent'], description: 'Ridge vent installation' },
  { id: 104, type: 'image', url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=400&fit=crop', job: '#2024-1429', jobTitle: 'Oak Street - Complete Roof Replacement', customer: 'Richard Mathew', company: 'Mathew Properties', uploadedBy: 'Henry Jones', date: getDateString(7), tags: ['Gutter', 'Installation'], description: 'New gutter system' },
  { id: 105, type: 'image', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=400&fit=crop', job: '#2024-1429', jobTitle: 'Oak Street - Complete Roof Replacement', customer: 'Richard Mathew', company: 'Mathew Properties', uploadedBy: 'Mike Wilson', date: getDateString(7), tags: ['Final', 'Inspection'], description: 'Final inspection complete' },
  { id: 4, type: 'image', url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=400&fit=crop', job: '#2024-1432', jobTitle: 'Pine Street - Gutter Replacement', customer: 'Emily Brown', company: 'Brown Holdings', uploadedBy: 'Tom Anderson', date: getDateString(7), tags: ['Gutter', 'Replacement'], description: 'Old gutters removed' },
  { id: 5, type: 'video', url: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=400&h=400&fit=crop', duration: '1:23', job: '#2024-1433', jobTitle: 'Commercial Plaza - Flat Roof Coating', customer: 'David Lee', company: 'Lee Commercial', uploadedBy: 'Henry Jones', date: getDateString(7), tags: ['Flat Roof', 'Commercial'], description: 'Flat roof inspection video' },
  { id: 501, type: 'image', url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=400&fit=crop', job: '#2024-1433', jobTitle: 'Commercial Plaza - Flat Roof Coating', customer: 'David Lee', company: 'Lee Commercial', uploadedBy: 'Henry Jones', date: getDateString(7), tags: ['Ponding', 'Issue'], description: 'Water ponding area' },
  { id: 502, type: 'image', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop', job: '#2024-1433', jobTitle: 'Commercial Plaza - Flat Roof Coating', customer: 'David Lee', company: 'Lee Commercial', uploadedBy: 'Henry Jones', date: getDateString(7), tags: ['Coating', 'Applied'], description: 'Reflective coating applied' },
  { id: 6, type: 'image', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop', job: '#2024-1434', jobTitle: 'Maple Avenue - Skylight Installation', customer: 'Lisa Wang', company: 'Wang Residence', uploadedBy: 'Mike Wilson', date: getDateString(7), tags: ['Skylight', 'Installation'], description: 'Skylight opening prepared' },
  { id: 7, type: 'image', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=400&fit=crop', job: '#2024-1435', jobTitle: 'Cedar Lane - Tile Roof Repair', customer: 'Mark Thompson', company: 'Thompson Estate', uploadedBy: 'Tom Anderson', date: getDateString(7), tags: ['Tile', 'Repair'], description: 'Broken tile replacement' },
  
  // LAST MONTH
  { id: 8, type: 'image', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop', job: '#2023-1436', jobTitle: 'Main Street - Roof Inspection', customer: 'Robert Kim', company: 'Kim Properties', uploadedBy: 'Henry Jones', date: getDateString(20), tags: ['Inspection', 'Before'], description: 'Pre-winter roof inspection' },
  { id: 9, type: 'video', url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=400&fit=crop', duration: '2:15', job: '#2023-1437', jobTitle: 'Park Avenue - Gutter Cleaning', customer: 'Jennifer White', company: 'White Estate', uploadedBy: 'Mike Wilson', date: getDateString(25), tags: ['Gutter', 'Maintenance'], description: 'Gutter cleaning process' },
  { id: 10, type: 'image', url: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=400&h=400&fit=crop', job: '#2023-1438', jobTitle: 'River Road - Shingle Repair', customer: 'Michael Brown', company: 'Brown Construction', uploadedBy: 'Tom Anderson', date: getDateString(30), tags: ['Shingles', 'Repair'], description: 'Damaged shingle replacement' },
  { id: 11, type: 'image', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=400&fit=crop', job: '#2023-1439', jobTitle: 'Hilltop Drive - Chimney Repair', customer: 'Patricia Garcia', company: 'Garcia Homes', uploadedBy: 'Henry Jones', date: getDateString(35), tags: ['Chimney', 'Repair'], description: 'Chimney flashing repair' },
  { id: 12, type: 'image', url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=400&fit=crop', job: '#2023-1440', jobTitle: 'Sunset Blvd - Roof Coating', customer: 'James Taylor', company: 'Taylor Properties', uploadedBy: 'Mike Wilson', date: getDateString(40), tags: ['Coating', 'Protection'], description: 'Protective coating applied' },
  
  // Edge case: No customer assigned
  { id: 13, type: 'image', url: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=400&h=400&fit=crop', job: '#2024-1441', jobTitle: 'General Roof Inspection', customer: null, company: null, uploadedBy: 'Henry Jones', date: getDateString(45), tags: [], description: '' },
  // Edge case: Job deleted (simulated)
  { id: 16, type: 'image', url: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=400&h=400&fit=crop', job: null, jobTitle: null, jobDeleted: true, customer: 'Previous Customer', company: 'Old Company', uploadedBy: 'Henry Jones', date: getDateString(60), tags: ['Archive'], description: 'Historical photo - job removed' },
];

// Sample customers for filter
const sampleCustomers = [
  { id: 1, name: 'Richard Mathew', company: 'Mathew Properties' },
  { id: 2, name: 'Sarah Chen', company: 'Chen Residence' },
  { id: 3, name: 'John Davis', company: 'Davis Family Trust' },
  { id: 4, name: 'Emily Brown', company: 'Brown Holdings' },
  { id: 5, name: 'David Lee', company: 'Lee Commercial' },
  { id: 6, name: 'Lisa Wang', company: 'Wang Residence' },
  { id: 7, name: 'Mark Thompson', company: 'Thompson Estate' },
];

// User roles
const USER_ROLES = {
  FIELD_ENGINEER: 'field_engineer',
  TEAM_LEADER: 'team_leader',
  ADMIN: 'admin'
};

// Status Bar Component
const StatusBar = () => (
  <div className="status-bar">
    <div className="status-bar-time">9:41</div>
    <div className="status-bar-icons">
      <Icons.Signal />
      <Icons.Wifi />
      <Icons.Battery />
    </div>
  </div>
);

// Phone Frame Component
const PhoneFrame = ({ children, title }) => (
  <div className="phone-wrapper">
    <div className="phone-label">{title}</div>
    <div className="phone-frame">
      <div className="phone-screen">
        <StatusBar />
        {children}
      </div>
    </div>
  </div>
);

// Toast Notification Component
const Toast = ({ message, type = 'info', onDismiss }) => (
  <div className={`toast toast-${type}`} onClick={onDismiss}>
    {type === 'error' && <Icons.AlertCircle />}
    {type === 'success' && <Icons.Check />}
    {type === 'offline' && <Icons.WifiOff />}
    <span>{message}</span>
  </div>
);

// Offline Banner Component
const OfflineBanner = () => (
  <div className="offline-banner">
    <Icons.WifiOff />
    <span>You're offline. Some features may be limited.</span>
  </div>
);


// More Options Menu Component
const MoreOptionsMenu = ({ isOpen, onClose, onAction, canDelete }) => {
  if (!isOpen) return null;
  
  return (
    <div className="options-menu-overlay" onClick={onClose}>
      <div className="options-menu" onClick={e => e.stopPropagation()}>
        <button className="option-item" onClick={() => onAction('download')}>
          <Icons.Download />
          <span>Download</span>
        </button>
        <button className="option-item" onClick={() => onAction('share')}>
          <Icons.Share />
          <span>Share</span>
        </button>
        <button className="option-item" onClick={() => onAction('report')}>
          <Icons.FileText />
          <span>Add to Job Report</span>
        </button>
        {canDelete && (
          <>
            <div className="option-divider" />
            <button className="option-item danger" onClick={() => onAction('delete')}>
              <Icons.Trash />
              <span>Delete</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Video Player Controls Component
const VideoPlayerControls = ({ duration, isPlaying, isMuted, currentTime, onPlayPause, onMute, onSeek }) => (
  <div className="video-player-controls">
    <div className="video-progress-bar">
      <div className="progress-fill" style={{ width: `${(currentTime / 100) * 100}%` }} />
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={currentTime} 
        onChange={(e) => onSeek(e.target.value)}
        className="progress-slider"
      />
    </div>
    <div className="video-controls-bar">
      <button className="control-btn" onClick={onPlayPause}>
        {isPlaying ? <Icons.Pause /> : <Icons.Play />}
      </button>
      <span className="time-display">0:{String(Math.floor(currentTime * 0.45)).padStart(2, '0')} / {duration}</span>
      <div className="control-spacer" />
      <button className="control-btn" onClick={onMute}>
        {isMuted ? <Icons.VolumeX /> : <Icons.Volume2 />}
      </button>
      <button className="control-btn">
        <Icons.Maximize />
      </button>
    </div>
  </div>
);


// Active Filters Chips Component
const ActiveFiltersChips = ({ filters, onRemove, onClearAll }) => {
  const chips = [];
  
  if (filters.dateFrom || filters.dateTo) {
    chips.push({ key: 'date', label: `${filters.dateFrom || '...'} - ${filters.dateTo || '...'}` });
  }
  if (filters.selectedUsers?.length > 0) {
    chips.push({ key: 'users', label: `${filters.selectedUsers.length} user${filters.selectedUsers.length > 1 ? 's' : ''}` });
  }
  if (filters.selectedCustomers?.length > 0) {
    chips.push({ key: 'customers', label: `${filters.selectedCustomers.length} customer${filters.selectedCustomers.length > 1 ? 's' : ''}` });
  }
  if (filters.selectedTags?.length > 0) {
    chips.push({ key: 'tags', label: `${filters.selectedTags.length} tag${filters.selectedTags.length > 1 ? 's' : ''}` });
  }
  if (filters.mediaType && filters.mediaType !== 'all') {
    chips.push({ key: 'media', label: filters.mediaType === 'images' ? 'Images only' : 'Videos only' });
  }

  if (chips.length === 0) return null;

  return (
    <div className="active-filters-bar">
      {chips.map(chip => (
        <div key={chip.key} className="active-filter-chip">
          <span>{chip.label}</span>
          <button onClick={() => onRemove(chip.key)}><Icons.Close /></button>
        </div>
      ))}
      <button className="clear-all-btn" onClick={onClearAll}>Clear all</button>
    </div>
  );
};

// Homepage Component (Entry Point)
const Homepage = ({ onNavigate }) => {
  return (
    <div className="home-screen">
      {/* Header */}
      <div className="home-header">
        <div className="header-left">
          <img src={FigmaAssets.imgMenu2} alt="Menu" className="header-icon" />
          <img src={FigmaAssets.imgImage1} alt="IKEA" className="company-logo-img" />
        </div>
        <div className="header-center"></div>
        <div className="header-actions">
          <img src={FigmaAssets.imgSearch} alt="Search" className="header-icon" />
          <img src={FigmaAssets.imgMessage} alt="Message" className="header-icon" />
          <img src={FigmaAssets.imgBell} alt="Bell" className="header-icon" />
        </div>
      </div>
      <div className="header-separator"></div>

      {/* User Greeting Card */}
      <div className="greeting-card">
        <div className="greeting-top">
          <div className="greeting-content">
            <h2>Hello, Henry Jones! 👋</h2>
            <p className="date-text">Friday, January 6th 2022</p>
          </div>
          <div className="user-avatar">
            <img src={FigmaAssets.img5} alt="User" />
          </div>
        </div>
        <div className="greeting-separator"></div>
        <div className="work-hours-section">
          <div className="work-hours-info">
            <span className="work-label">Work hours</span>
            <span className="work-time">10:00 am to 5:00 pm</span>
          </div>
          <button className="start-btn">
            <img src={FigmaAssets.img6} alt="Play" className="play-icon-img" />
            <span>Start</span>
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="quick-links-section">
        <div className="section-header">
          <h3>Quick Links</h3>
          <button className="add-btn">
            <img src={FigmaAssets.imgPlus} alt="Add" className="add-icon-img" />
          </button>
        </div>
        <div className="quick-links-grid">
          <button className="quick-link-item" onClick={() => onNavigate('photo-feed')}>
            <div className="quick-link-icon photo-feed">
              <Icons.Gallery />
            </div>
            <span>Photo Feed</span>
          </button>
          <button className="quick-link-item">
            <div className="quick-link-icon schedule">
              <Icons.Schedule />
            </div>
            <span>Schedule</span>
          </button>
          <button className="quick-link-item">
            <div className="quick-link-icon tasks">
              <Icons.Tasks />
            </div>
            <span>My Tasks (12)</span>
          </button>
          <button className="quick-link-item">
            <div className="quick-link-icon announcement">
              <Icons.Megaphone />
            </div>
            <span>Announcement(s)</span>
          </button>
          <button className="quick-link-item">
            <div className="quick-link-icon scan">
              <Icons.Scan />
            </div>
            <span>Scan</span>
          </button>
        </div>
      </div>

      {/* Jobs Section */}
      <div className="jobs-section">
        <div className="jobs-header">
          <h3>Jobs (35)</h3>
          <div className="jobs-nav">
            <button className="map-icon-btn">
              <img src={FigmaAssets.imgMap2} alt="Map" className="map-icon-img" />
            </button>
            <div className="date-nav">
              <button>
                <img src={FigmaAssets.imgChevronLeft} alt="Previous" className="chevron-icon" />
              </button>
              <span>Today</span>
              <button className="chevron-right">
                <img src={FigmaAssets.imgChevronLeft} alt="Next" className="chevron-icon" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card total-jobs">
            <span className="stat-label">Total jobs</span>
            <span className="stat-value">35</span>
          </div>
          <div className="stat-card yet-to-start">
            <span className="stat-label">Yet to start</span>
            <span className="stat-value">27</span>
          </div>
          <div className="stat-card in-progress">
            <span className="stat-label">In Progress</span>
            <span className="stat-value">4</span>
          </div>
          <div className="stat-card completed">
            <span className="stat-label">Completed</span>
            <span className="stat-value">0</span>
          </div>
        </div>

        {/* Job Card */}
        <div className="job-card">
          <div className="job-card-header">
            <div className="job-number">
              <img src={FigmaAssets.imgRepeat} alt="Repeat" className="repeat-icon-img" />
              #2022 - 1429
            </div>
            <span className="job-status new">New</span>
          </div>
          <h4 className="job-title">46th Avenue Genese St - Interior Design</h4>
          <p className="job-time">Today, 10:30 - 11:00 AM</p>
          <div className="job-details">
            <div className="job-detail">
              <div className="job-badge-icon">
                <img src={FigmaAssets.img3} alt="User" />
              </div>
              <span>Richard Mathew (Vodafone Idea)</span>
            </div>
            <div className="job-detail">
              <div className="job-badge-icon">
                <img src={FigmaAssets.img} alt="Briefcase" />
              </div>
              <span>Renovation</span>
            </div>
            <div className="job-detail">
              <div className="job-badge-icon">
                <img src={FigmaAssets.img1} alt="Location" />
              </div>
              <span>Genese Street, 46th Avenue, SW, Seattle</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Homepage V2 - With Photo Preview Section
const HomepageWithPhotos = ({ onNavigate, recentPhotos = [] }) => {
  // Take first 4 photos for preview strip
  const previewPhotos = recentPhotos.slice(0, 4);
  
  return (
    <div className="home-screen">
      {/* Header */}
      <div className="home-header">
        <div className="header-left">
          <img src={FigmaAssets.imgMenu2} alt="Menu" className="header-icon" />
          <img src={FigmaAssets.imgImage1} alt="IKEA" className="company-logo-img" />
        </div>
        <div className="header-center"></div>
        <div className="header-actions">
          <img src={FigmaAssets.imgSearch} alt="Search" className="header-icon" />
          <img src={FigmaAssets.imgMessage} alt="Message" className="header-icon" />
          <img src={FigmaAssets.imgBell} alt="Bell" className="header-icon" />
        </div>
      </div>
      <div className="header-separator"></div>

      {/* User Greeting Card */}
      <div className="greeting-card">
        <div className="greeting-top">
          <div className="greeting-content">
            <h2>Hello, Henry Jones! 👋</h2>
            <p className="date-text">Friday, January 6th 2022</p>
          </div>
          <div className="user-avatar">
            <img src={FigmaAssets.img5} alt="User" />
          </div>
        </div>
        <div className="greeting-separator"></div>
        <div className="work-hours-section">
          <div className="work-hours-info">
            <span className="work-label">Work hours</span>
            <span className="work-time">10:00 am to 5:00 pm</span>
          </div>
          <button className="start-btn">
            <img src={FigmaAssets.img6} alt="Play" className="play-icon-img" />
            <span>Start</span>
          </button>
        </div>
      </div>

      {/* Quick Links - With Photo Feed */}
      <div className="quick-links-section">
        <div className="section-header">
          <h3>Quick Links</h3>
          <button className="add-btn">
            <img src={FigmaAssets.imgPlus} alt="Add" className="add-icon-img" />
          </button>
        </div>
        <div className="quick-links-grid">
          <button className="quick-link-item" onClick={() => onNavigate('photo-feed')}>
            <div className="quick-link-icon photo-feed">
              <Icons.Gallery />
            </div>
            <span>Photo Feed</span>
          </button>
          <button className="quick-link-item">
            <div className="quick-link-icon schedule">
              <Icons.Schedule />
            </div>
            <span>Schedule</span>
          </button>
          <button className="quick-link-item">
            <div className="quick-link-icon tasks">
              <Icons.Tasks />
            </div>
            <span>My Tasks (12)</span>
          </button>
          <button className="quick-link-item">
            <div className="quick-link-icon announcement">
              <Icons.Megaphone />
            </div>
            <span>Announcements</span>
          </button>
        </div>
      </div>

      {/* Jobs Section */}
      <div className="jobs-section">
        <div className="jobs-header">
          <h3>Jobs (35)</h3>
          <div className="jobs-nav">
            <button className="map-icon-btn">
              <img src={FigmaAssets.imgMap2} alt="Map" className="map-icon-img" />
            </button>
            <div className="date-nav">
              <button>
                <img src={FigmaAssets.imgChevronLeft} alt="Previous" className="chevron-icon" />
              </button>
              <span>Today</span>
              <button className="chevron-right">
                <img src={FigmaAssets.imgChevronLeft} alt="Next" className="chevron-icon" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card total-jobs">
            <span className="stat-label">Total jobs</span>
            <span className="stat-value">35</span>
          </div>
          <div className="stat-card yet-to-start">
            <span className="stat-label">Yet to start</span>
            <span className="stat-value">27</span>
          </div>
          <div className="stat-card in-progress">
            <span className="stat-label">In Progress</span>
            <span className="stat-value">4</span>
          </div>
          <div className="stat-card completed">
            <span className="stat-label">Completed</span>
            <span className="stat-value">0</span>
          </div>
        </div>

        {/* Job Card - Details */}
        <div className="job-card">
          <div className="job-card-header">
            <div className="job-number">
              <img src={FigmaAssets.imgRepeat} alt="Repeat" className="repeat-icon-img" />
              #2022 - 1429
            </div>
            <span className="job-status new">New</span>
          </div>
          <h4 className="job-title">46th Avenue Genese St - Interior Design</h4>
          <p className="job-time">Today, 10:30 - 11:00 AM</p>
          <div className="job-details">
            <div className="job-detail">
              <div className="job-badge-icon">
                <img src={FigmaAssets.img3} alt="User" />
              </div>
              <span>Richard Mathew (Vodafone Idea)</span>
            </div>
            <div className="job-detail">
              <div className="job-badge-icon">
                <img src={FigmaAssets.img} alt="Briefcase" />
              </div>
              <span>Renovation</span>
            </div>
            <div className="job-detail">
              <div className="job-badge-icon">
                <img src={FigmaAssets.img1} alt="Location" />
              </div>
              <span>Genese Street, 46th Avenue, SW, Seattle</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Photos Preview Card - Navigates to Photo Feed */}
      <div className="photo-preview-card" onClick={() => onNavigate('photo-feed')}>
        <div className="preview-card-header">
          <div className="preview-card-title">
            <Icons.Gallery />
            <span>Recent Photos</span>
          </div>
          <div className="preview-card-action">
            <span className="photo-count-badge">{recentPhotos.length}</span>
            <Icons.ChevronRight />
          </div>
        </div>
        <div className="preview-card-strip">
          {previewPhotos.map((photo) => (
            <img key={photo.id} src={photo.url} alt="" className="strip-thumb" />
          ))}
          {recentPhotos.length > 4 && (
            <div className="strip-more">
              <span>+{recentPhotos.length - 4}</span>
              <span className="more-label">more</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Photo Feed Main Grid
const PhotoFeedGrid = ({ 
  photos, 
  onPhotoClick, 
  onFilterClick, 
  onSearchClick,
  activeFilters,
  multiSelectMode,
  selectedPhotos,
  onToggleSelect,
  onLongPress,
  onCancelSelect,
  onSelectAll,
  onBulkAction,
  userRole = USER_ROLES.TEAM_LEADER,
  isOffline = false,
  activeFilterDetails = {},
  onRemoveFilter,
  onClearAllFilters,
  showMetadata = false,
  initialViewMode = 'grid',
  onBack
}) => {
  const [activeTab, setActiveTab] = useState('my');
  const [viewMode, setViewMode] = useState(initialViewMode); // 'grid' or 'job'

  // Sync viewMode with initialViewMode when it changes (for navigation)
  useEffect(() => {
    setViewMode(initialViewMode);
  }, [initialViewMode]);

  // Group photos by job for job view
  const groupPhotosByJob = (photos) => {
    const jobGroups = {};
    photos.forEach((photo, index) => {
      const jobKey = photo.job || 'unassigned';
      if (!jobGroups[jobKey]) {
        jobGroups[jobKey] = {
          jobId: photo.job,
          jobTitle: photo.jobTitle,
          customer: photo.customer,
          address: photo.address,
          jobDeleted: photo.jobDeleted,
          photos: []
        };
      }
      jobGroups[jobKey].photos.push({ ...photo, originalIndex: index });
    });
    return Object.values(jobGroups);
  };

  // Group photos by date for gallery view - using relative periods
  const groupPhotosByDate = (photos) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    // Format date for subtitle
    const formatDateShort = (date) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[date.getMonth()]} ${date.getDate()}`;
    };
    
    const dateGroups = {
      'Today': { displayDate: 'Today', dateSubtitle: formatDateShort(today), photos: [] },
      'Yesterday': { displayDate: 'Yesterday', dateSubtitle: formatDateShort(yesterday), photos: [] },
      'Last Week': { displayDate: 'Last Week', dateSubtitle: `${formatDateShort(lastWeek)} - ${formatDateShort(yesterday)}`, photos: [] },
      'Last Month': { displayDate: 'Last Month', dateSubtitle: `${formatDateShort(lastMonth)} - ${formatDateShort(lastWeek)}`, photos: [] },
      'Older': { displayDate: 'Older', dateSubtitle: '', photos: [] }
    };
    
    photos.forEach((photo, index) => {
      // Parse date
      const parts = photo.date.split(' ');
      const month = parts[0];
      const day = parseInt(parts[1].replace(',', ''));
      const year = parseInt(parts[2]);
      const photoDate = new Date(`${month} ${day}, ${year}`);
      photoDate.setHours(0, 0, 0, 0);
      
      let groupKey = 'Older';
      if (photoDate.getTime() === today.getTime()) {
        groupKey = 'Today';
      } else if (photoDate.getTime() === yesterday.getTime()) {
        groupKey = 'Yesterday';
      } else if (photoDate > lastWeek && photoDate < yesterday) {
        groupKey = 'Last Week';
      } else if (photoDate >= lastMonth && photoDate <= lastWeek) {
        groupKey = 'Last Month';
      }
      
      dateGroups[groupKey].photos.push({ ...photo, originalIndex: index });
    });
    
    // Return only groups that have photos, in order
    const order = ['Today', 'Yesterday', 'Last Week', 'Last Month', 'Older'];
    return order
      .map(key => dateGroups[key])
      .filter(group => group.photos.length > 0);
  };

  const jobGroups = groupPhotosByJob(photos);
  const dateGroups = groupPhotosByDate(photos);

  // Get tabs based on user role
  const getTabs = () => {
    switch (userRole) {
      case USER_ROLES.FIELD_ENGINEER:
        return null; // No tabs, only their own uploads
      case USER_ROLES.TEAM_LEADER:
        return [
          { id: 'my', label: 'My Uploads' },
          { id: 'team', label: 'Team Uploads' }
        ];
      case USER_ROLES.ADMIN:
        return [
          { id: 'all', label: 'All Photos' },
          { id: 'team', label: 'By Team' }
        ];
      default:
        return null;
    }
  };

  const tabs = getTabs();

  return (
    <div className="feed-screen">
      {/* Offline Banner */}
      {isOffline && <OfflineBanner />}

      {/* Header */}
      <div className="feed-header">
        {multiSelectMode ? (
          <>
            <button className="header-btn text" onClick={onCancelSelect}>Cancel</button>
            <h1 className="header-title">{selectedPhotos.length} {selectedPhotos.length === 1 ? 'Photo' : 'Photos'}</h1>
            <button className="header-btn text" onClick={onSelectAll}>Select All</button>
          </>
        ) : (
          <>
            <button className="header-btn" onClick={onBack}><Icons.Back /></button>
            <h1 className="header-title">Photo Feed</h1>
            <div className="header-actions">
              <button className={`header-btn ${activeFilters > 0 ? 'has-filters' : ''}`} onClick={onFilterClick}>
                <Icons.Filter />
                {activeFilters > 0 && <span className="filter-dot" />}
              </button>
              <button className="header-btn" onClick={onSearchClick}>
                <Icons.Search />
              </button>
            </div>
          </>
        )}
      </div>

      {/* View Switcher - Photos / Jobs */}
      {!multiSelectMode && (
        <div className="feed-tabs view-tabs">
          <button 
            className={`tab-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <Icons.Grid />
            Photos
          </button>
          <button 
            className={`tab-btn ${viewMode === 'job' ? 'active' : ''}`}
            onClick={() => setViewMode('job')}
          >
            <Icons.Briefcase />
            Jobs
          </button>
        </div>
      )}

      {/* Active Filters Chips */}
      {!multiSelectMode && activeFilters > 0 && (
        <ActiveFiltersChips 
          filters={activeFilterDetails}
          onRemove={onRemoveFilter}
          onClearAll={onClearAllFilters}
        />
      )}

      {/* Stats Bar - Only show in Job View mode */}
      {!multiSelectMode && viewMode === 'job' && (
        <div className="stats-bar">
          <div className="stat-chip">
            <Icons.Image />
            <span>47 Photos</span>
          </div>
          <div className="stat-chip">
            <Icons.Video />
            <span>12 Videos</span>
          </div>
          <div className="stat-chip">
            <Icons.Calendar />
            <span>This Week: 8</span>
          </div>
        </div>
      )}

      {/* Photo Gallery or Job View */}
      {viewMode === 'grid' ? (
        <div className="photo-gallery">
          {dateGroups.map((group, groupIndex) => (
            <div key={group.date} className="gallery-date-section">
              {/* Date Header */}
              <div className="gallery-date-header">
                <div className="date-header-content">
                  <span className="date-title">{group.displayDate}</span>
                  {group.dateSubtitle && <span className="date-subtitle">{group.dateSubtitle}</span>}
                </div>
                <span className="date-count">
                  {group.photos.length}
                  <span className="date-count-label"> {group.photos.length === 1 ? 'photo' : 'photos'}</span>
                </span>
              </div>
              
              {/* Photos Grid */}
              <div className={`gallery-grid ${showMetadata ? 'with-metadata' : ''}`}>
                {group.photos.map((photo, photoIndex) => (
                  <div 
                    key={photo.id}
                    className={`gallery-thumb ${photo.type === 'video' ? 'is-video' : ''} ${multiSelectMode ? 'selectable' : ''} ${selectedPhotos.includes(photo.id) ? 'selected' : ''} ${showMetadata ? 'show-metadata' : ''}`}
                    onClick={() => multiSelectMode ? onToggleSelect(photo.id) : onPhotoClick(photo.originalIndex)}
                    onContextMenu={(e) => { e.preventDefault(); onLongPress(photo.id); }}
                  >
                    <img src={photo.url} alt="" loading="lazy" />
                    {photo.type === 'video' && (
                      <div className="gallery-video-badge">
                        <Icons.Play />
                        <span>{photo.duration}</span>
                      </div>
                    )}
                    {showMetadata && (
                      <div className="photo-metadata-overlay">
                        <div className="metadata-uploader">
                          <Icons.User />
                          <span>{photo.uploadedBy}</span>
                        </div>
                        <div className="metadata-time">
                          <Icons.Clock />
                          <span>{photo.date.split(',')[0]}</span>
                        </div>
                        {photo.tags && photo.tags.length > 0 && (
                          <div className="metadata-tags">
                            {photo.tags.slice(0, 2).map((tag, i) => (
                              <span key={i} className="metadata-tag">{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    {multiSelectMode && (
                      <div className={`gallery-checkbox ${selectedPhotos.includes(photo.id) ? 'checked' : ''}`}>
                        {selectedPhotos.includes(photo.id) && <Icons.Check />}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="job-gallery">
          {jobGroups.map((group) => {
            const videoCount = group.photos.filter(p => p.type === 'video').length;
            const imageCount = group.photos.length - videoCount;
            const latestDate = group.photos[group.photos.length - 1]?.date;
            // Get relative date
            const getRelativeDate = (dateStr) => {
              if (!dateStr) return '';
              const parts = dateStr.split(',');
              return parts[0] || dateStr;
            };
            // Format counts
            const totalCount = group.photos.length;
            const countText = `${totalCount} ${totalCount === 1 ? 'photo' : 'photos'}${videoCount > 0 ? `, ${videoCount} video${videoCount > 1 ? 's' : ''}` : ''}`;
            
            return (
            <div key={group.jobId || 'unassigned'} className="job-section">
              {/* Minimal Section Header - 2 lines max */}
              <div className="job-section-header">
                {group.jobDeleted ? (
                  <div className="job-deleted-state">
                    <Icons.AlertCircle />
                    <span>Job no longer exists</span>
                  </div>
                ) : (
                  <>
                    <div className="job-header-row">
                      <div className="job-header-info">
                        <span className="job-header-title">{group.jobTitle}</span>
                        <span className="job-header-meta">
                          {group.address && <>{group.address}</>}
                          {group.address && <> · </>}
                          <span className="job-photo-count">{countText}</span>
                        </span>
                      </div>
                      <button className="job-camera-btn" title="Add photo to this job">
                        <Icons.Camera />
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Photo Grid - SAME AS GRID VIEW */}
              <div className="job-photo-grid">
                {group.photos.map((photo) => (
                  <div 
                    key={photo.id}
                    className={`gallery-thumb ${photo.type === 'video' ? 'is-video' : ''} ${multiSelectMode ? 'selectable' : ''} ${selectedPhotos.includes(photo.id) ? 'selected' : ''}`}
                    onClick={() => multiSelectMode ? onToggleSelect(photo.id) : onPhotoClick(photo.originalIndex)}
                    onContextMenu={(e) => { e.preventDefault(); onLongPress(photo.id); }}
                  >
                    <img src={photo.url} alt="" loading="lazy" />
                    {photo.type === 'video' && (
                      <div className="gallery-video-badge">
                        <Icons.Play />
                        <span>{photo.duration}</span>
                      </div>
                    )}
                    {multiSelectMode && (
                      <div className={`gallery-checkbox ${selectedPhotos.includes(photo.id) ? 'checked' : ''}`}>
                        {selectedPhotos.includes(photo.id) && <Icons.Check />}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            );
          })}
        </div>
      )}


      {/* Bulk Actions Bar */}
      {multiSelectMode && selectedPhotos.length > 0 && (
        <div className="bulk-actions-bar">
          <button className="bulk-action" onClick={() => onBulkAction('tag')}>
            <Icons.Tag />
            <span>Tag</span>
          </button>
          <button className="bulk-action" onClick={() => onBulkAction('download')}>
            <Icons.Download />
            <span>Download</span>
          </button>
          <button className="bulk-action delete" onClick={() => onBulkAction('delete')}>
            <Icons.Trash />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
};

// Filter Bottom Sheet
const FilterSheet = ({ isOpen, onClose, onApply, userRole = USER_ROLES.TEAM_LEADER, showMetadata = false, onToggleMetadata }) => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [mediaType, setMediaType] = useState('all');
  const [showCustomerSearch, setShowCustomerSearch] = useState(false);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  
  // Collapsible sections state
  const [expandedSections, setExpandedSections] = useState({
    dateRange: true,
    uploadedBy: false,
    customer: false,
    tags: false,
    mediaType: true
  });

  const users = ['Henry Jones', 'Mike Wilson', 'Tom Anderson', 'Sarah Chen', 'Emma Davis', 'David Brown'];
  
  // All tags (flat list, no categories)
  const allTags = ['Roofing', 'HVAC', 'Plumbing', 'Electrical', 'Landscaping', 'Interior', 'Exterior', 'Kitchen', 'Bathroom', 'Before', 'After', 'Damage', 'Repair'];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleUser = (user) => {
    setSelectedUsers(prev => 
      prev.includes(user) ? prev.filter(u => u !== user) : [...prev, user]
    );
  };

  const toggleCustomer = (customer) => {
    setSelectedCustomers(prev => 
      prev.includes(customer.name) ? prev.filter(c => c !== customer.name) : [...prev, customer.name]
    );
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearAll = () => {
    setDateFrom('');
    setDateTo('');
    setSelectedUsers([]);
    setSelectedCustomers([]);
    setSelectedTags([]);
    setMediaType('all');
  };

  const setDatePreset = (preset) => {
    const today = new Date();
    const formatDate = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    setDateTo(formatDate(today));
    switch(preset) {
      case 'today':
        setDateFrom(formatDate(today));
        break;
      case '7days':
        const week = new Date(today);
        week.setDate(week.getDate() - 7);
        setDateFrom(formatDate(week));
        break;
      case '30days':
        const month = new Date(today);
        month.setDate(month.getDate() - 30);
        setDateFrom(formatDate(month));
        break;
      default:
        break;
    }
  };

  const removeActiveFilter = (type, value) => {
    switch(type) {
      case 'date':
        setDateFrom('');
        setDateTo('');
        break;
      case 'user':
        setSelectedUsers(prev => prev.filter(u => u !== value));
        break;
      case 'customer':
        setSelectedCustomers(prev => prev.filter(c => c !== value));
        break;
      case 'tag':
        setSelectedTags(prev => prev.filter(t => t !== value));
        break;
      case 'media':
        setMediaType('all');
        break;
      default:
        break;
    }
  };

  // Calculate active filters
  const activeFilterCount = [
    dateFrom || dateTo ? 1 : 0,
    selectedUsers.length,
    selectedCustomers.length,
    selectedTags.length,
    mediaType !== 'all' ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  const hasFilters = activeFilterCount > 0;

  // Build active filter pills
  const activeFilterPills = [];
  if (dateFrom && dateTo) {
    activeFilterPills.push({ type: 'date', label: `${dateFrom} - ${dateTo}` });
  } else if (dateFrom) {
    activeFilterPills.push({ type: 'date', label: `From ${dateFrom}` });
  } else if (dateTo) {
    activeFilterPills.push({ type: 'date', label: `Until ${dateTo}` });
  }
  selectedUsers.forEach(u => activeFilterPills.push({ type: 'user', value: u, label: u }));
  selectedCustomers.forEach(c => activeFilterPills.push({ type: 'customer', value: c, label: c }));
  selectedTags.forEach(t => activeFilterPills.push({ type: 'tag', value: t, label: t }));
  if (mediaType !== 'all') {
    activeFilterPills.push({ type: 'media', label: mediaType === 'images' ? 'Images Only' : 'Videos Only' });
  }

  // Filter users by search
  const filteredUsers = users.filter(u => 
    u.toLowerCase().includes(userSearchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="bottom-sheet-overlay" onClick={onClose}>
      <div className="bottom-sheet filter-sheet-v2" onClick={e => e.stopPropagation()}>
        <div className="sheet-handle" />
        
        {/* Enhanced Header */}
        <div className="filter-header">
          <div className="filter-header-left">
            <h2>Filters</h2>
            {hasFilters && (
              <span className="filter-count">{activeFilterCount} active</span>
            )}
          </div>
          <div className="filter-header-right">
            {hasFilters && (
              <button className="clear-all-btn" onClick={clearAll}>Clear All</button>
            )}
            <button className="filter-close-btn" onClick={onClose}>
              <Icons.Close />
            </button>
          </div>
        </div>

        {/* Active Filter Pills */}
        {activeFilterPills.length > 0 && (
          <div className="active-filters-row">
            {activeFilterPills.map((pill, idx) => (
              <span key={idx} className="active-filter-pill">
                {pill.label}
                <button onClick={() => removeActiveFilter(pill.type, pill.value)}>
                  <Icons.Close />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="filter-content">
          {/* Date Range - Always Expanded */}
          <div className="filter-section-v2">
            <div 
              className="section-header-row"
              onClick={() => toggleSection('dateRange')}
            >
              <span className="section-title">Date Range</span>
              {(dateFrom || dateTo) && !expandedSections.dateRange && (
                <span className="section-summary">{dateFrom && dateTo ? `${dateFrom} - ${dateTo}` : dateFrom || dateTo}</span>
              )}
              <Icons.ChevronDown className={`section-chevron ${expandedSections.dateRange ? 'expanded' : ''}`} />
            </div>
            
            {expandedSections.dateRange && (
              <div className="section-content">
                <div className="date-inputs-row">
                  <div className="date-input-v2">
                    <Icons.Calendar />
                    <input 
                      type="text" 
                      placeholder="From" 
                      value={dateFrom}
                      onChange={e => setDateFrom(e.target.value)}
                    />
                  </div>
                  <div className="date-input-v2">
                    <Icons.Calendar />
                    <input 
                      type="text" 
                      placeholder="To" 
                      value={dateTo}
                      onChange={e => setDateTo(e.target.value)}
                    />
                  </div>
                </div>
                <div className="date-presets">
                  <button 
                    className={`preset-chip ${dateFrom && dateTo && dateFrom === dateTo ? 'active' : ''}`}
                    onClick={() => setDatePreset('today')}
                  >
                    Today
                  </button>
                  <button 
                    className="preset-chip"
                    onClick={() => setDatePreset('7days')}
                  >
                    Last 7 days
                  </button>
                  <button 
                    className="preset-chip"
                    onClick={() => setDatePreset('30days')}
                  >
                    Last 30 days
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Uploaded By - Team Leader/Admin Only */}
          {(userRole === USER_ROLES.TEAM_LEADER || userRole === USER_ROLES.ADMIN) && (
            <div className="filter-section-v2">
              <div 
                className="section-header-row"
                onClick={() => toggleSection('uploadedBy')}
              >
                <span className="section-title">Uploaded By</span>
                {selectedUsers.length > 0 && !expandedSections.uploadedBy && (
                  <span className="section-summary">{selectedUsers.length} selected</span>
                )}
                {!selectedUsers.length && !expandedSections.uploadedBy && (
                  <span className="section-summary muted">Not selected</span>
                )}
                <Icons.ChevronDown className={`section-chevron ${expandedSections.uploadedBy ? 'expanded' : ''}`} />
              </div>
              
              {expandedSections.uploadedBy && (
                <div className="section-content">
                  <div className="user-search-input">
                    <Icons.Search />
                    <input 
                      type="text"
                      placeholder="Search team members..."
                      value={userSearchQuery}
                      onChange={e => setUserSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="user-chips">
                    {filteredUsers.map(user => (
                      <button 
                        key={user}
                        className={`user-chip ${selectedUsers.includes(user) ? 'selected' : ''}`}
                        onClick={() => toggleUser(user)}
                      >
                        <span className="user-avatar">{user.split(' ').map(n => n[0]).join('')}</span>
                        <span className="user-name">{user}</span>
                        {selectedUsers.includes(user) && <Icons.Check />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Customer */}
          <div className="filter-section-v2">
            <div 
              className="section-header-row"
              onClick={() => toggleSection('customer')}
            >
              <span className="section-title">Customer</span>
              {selectedCustomers.length > 0 && !expandedSections.customer && (
                <span className="section-summary">{selectedCustomers.length} selected</span>
              )}
              {!selectedCustomers.length && !expandedSections.customer && (
                <span className="section-summary muted">Not selected</span>
              )}
              <Icons.ChevronDown className={`section-chevron ${expandedSections.customer ? 'expanded' : ''}`} />
            </div>
            
            {expandedSections.customer && (
              <div className="section-content">
                {selectedCustomers.length > 0 && (
                  <div className="selected-items-row">
                    {selectedCustomers.map(name => (
                      <span key={name} className="selected-item-chip">
                        {name}
                        <button onClick={() => setSelectedCustomers(prev => prev.filter(c => c !== name))}>
                          <Icons.Close />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <div className="customer-search-input" onClick={() => setShowCustomerSearch(!showCustomerSearch)}>
                  <Icons.Search />
                  <span className="placeholder">Search customers...</span>
                </div>
                {showCustomerSearch && (
                  <div className="customer-dropdown">
                    {sampleCustomers.map(customer => (
                      <button 
                        key={customer.id}
                        className={`customer-option ${selectedCustomers.includes(customer.name) ? 'selected' : ''}`}
                        onClick={() => toggleCustomer(customer)}
                      >
                        <div className="customer-info">
                          <span className="customer-name">{customer.name}</span>
                          <span className="customer-company">{customer.company}</span>
                        </div>
                        {selectedCustomers.includes(customer.name) && <Icons.Check />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tags - Flat List */}
          <div className="filter-section-v2">
            <div 
              className="section-header-row"
              onClick={() => toggleSection('tags')}
            >
              <span className="section-title">Tags</span>
              {selectedTags.length > 0 && !expandedSections.tags && (
                <span className="section-summary">{selectedTags.length} selected</span>
              )}
              {!selectedTags.length && !expandedSections.tags && (
                <span className="section-summary muted">Not selected</span>
              )}
              <Icons.ChevronDown className={`section-chevron ${expandedSections.tags ? 'expanded' : ''}`} />
            </div>
            
            {expandedSections.tags && (
              <div className="section-content">
                <div className="tags-flat-list">
                  {allTags.map(tag => (
                    <button 
                      key={tag}
                      className={`filter-chip-v2 ${selectedTags.includes(tag) ? 'selected' : ''}`}
                      onClick={() => toggleTag(tag)}
                    >
                      {selectedTags.includes(tag) && <Icons.Check />}
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Media Type - Segmented Control */}
          <div className="filter-section-v2">
            <div 
              className="section-header-row"
              onClick={() => toggleSection('mediaType')}
            >
              <span className="section-title">Media Type</span>
              <Icons.ChevronDown className={`section-chevron ${expandedSections.mediaType ? 'expanded' : ''}`} />
            </div>
            
            {expandedSections.mediaType && (
              <div className="section-content">
                <div className="media-type-segmented">
                  <div 
                    className="segment-slider"
                    style={{ 
                      transform: `translateX(${mediaType === 'all' ? '0%' : mediaType === 'images' ? '100%' : '200%'})` 
                    }}
                  />
                  <button 
                    className={`segment-btn ${mediaType === 'all' ? 'active' : ''}`}
                    onClick={() => setMediaType('all')}
                  >
                    All
                  </button>
                  <button 
                    className={`segment-btn ${mediaType === 'images' ? 'active' : ''}`}
                    onClick={() => setMediaType('images')}
                  >
                    <Icons.Image />
                    Images
                  </button>
                  <button 
                    className={`segment-btn ${mediaType === 'videos' ? 'active' : ''}`}
                    onClick={() => setMediaType('videos')}
                  >
                    <Icons.Video />
                    Videos
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Display Options - View Setting */}
          <div className="filter-section-v2 display-options-section">
            <div className="display-option-row" onClick={onToggleMetadata}>
              <div className="display-option-info">
                <span className="display-option-label">Show photo details</span>
                <span className="display-option-description">Display uploader, date & tags on thumbnails</span>
              </div>
              <div className={`toggle-switch-v2 ${showMetadata ? 'active' : ''}`}>
                <div className="toggle-track">
                  <div className="toggle-thumb" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Apply Button with State */}
        <div className="filter-footer">
          <button 
            className={`apply-btn-v2 ${hasFilters ? 'has-filters' : ''}`}
            onClick={() => {
              onApply({ dateFrom, dateTo, selectedUsers, selectedCustomers, selectedTags, mediaType });
              onClose();
            }}
          >
            {hasFilters ? `Apply Filters (${activeFilterCount})` : 'Apply Filters'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Search Screen
const SearchScreen = ({ onClose, photos, onPhotoClick }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (query.length > 0) {
      setSearching(true);
      const timer = setTimeout(() => {
        const filtered = photos.filter(p => 
          p.jobTitle.toLowerCase().includes(query.toLowerCase()) ||
          p.customer.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
        );
        setResults(filtered);
        setSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query, photos]);

  return (
    <div className="search-screen">
      <div className="search-header">
        <div className="search-input-wrapper">
          <Icons.Search />
          <input 
            type="text"
            placeholder="Search by job, customer, tags..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button className="clear-search" onClick={() => setQuery('')}>
              <Icons.Close />
            </button>
          )}
        </div>
        <button className="cancel-search" onClick={onClose}>Cancel</button>
      </div>

      <div className="search-content">
        {!query && (
          <div className="recent-searches">
            <h3>Recent Searches</h3>
            <div className="recent-list">
              <button className="recent-item">Roof repair</button>
              <button className="recent-item">Interior</button>
              <button className="recent-item">Vodafone</button>
            </div>
          </div>
        )}

        {searching && (
          <div className="searching-state">
            <div className="spinner" />
            <span>Searching...</span>
          </div>
        )}

        {query && !searching && results.length > 0 && (
          <>
            <div className="results-count">{results.length} results for "{query}"</div>
            <div className="photo-grid search-results">
              {results.map((photo, index) => (
                <div 
                  key={photo.id}
                  className="photo-thumb"
                  onClick={() => onPhotoClick(index)}
                >
                  <img src={photo.url} alt={photo.jobTitle} />
                  {photo.type === 'video' && (
                    <div className="video-overlay">
                      <div className="play-btn"><Icons.Play /></div>
                      <span className="duration">{photo.duration}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {query && !searching && results.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              <Icons.Search />
            </div>
            <h3>No results for "{query}"</h3>
            <p>Check spelling or try different keywords</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Media Viewer
const MediaViewer = ({ photos, currentIndex, onClose, onNavigate, onShowDetails, onToast }) => {
  const [showControls, setShowControls] = useState(true);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const currentPhoto = photos[currentIndex];

  // Check if user can delete (owns the photo)
  const canDelete = currentPhoto.uploadedBy === 'Henry Jones'; // Simulated current user

  const handleSwipe = useCallback((direction) => {
    if (direction === 'left' && currentIndex < photos.length - 1) {
      onNavigate(currentIndex + 1);
    } else if (direction === 'right' && currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  }, [currentIndex, photos.length, onNavigate]);

  const handleMenuAction = (action) => {
    setShowOptionsMenu(false);
    switch (action) {
      case 'download':
        onToast?.({ message: 'Downloading photo...', type: 'info' });
        break;
      case 'share':
        onToast?.({ message: 'Share options opened', type: 'info' });
        break;
      case 'report':
        onToast?.({ message: 'Added to Job Report', type: 'success' });
        break;
      case 'delete':
        if (!canDelete) {
          onToast?.({ message: 'You can only delete photos you uploaded', type: 'error' });
        } else {
          onToast?.({ message: 'Photo deleted', type: 'success' });
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="media-viewer" onClick={() => setShowControls(!showControls)}>
      {/* Top Bar */}
      <div className={`viewer-top-bar ${showControls ? 'visible' : ''}`}>
        <button className="viewer-btn" onClick={(e) => { e.stopPropagation(); onClose(); }}>
          <Icons.Close />
        </button>
        <span className="photo-counter">{currentIndex + 1} of {photos.length}</span>
        <button className="viewer-btn" onClick={(e) => { e.stopPropagation(); setShowOptionsMenu(true); }}>
          <Icons.MoreVertical />
        </button>
      </div>

      {/* Media Content */}
      <div className={`viewer-content ${isZoomed ? 'zoomed' : ''}`}>
        <img 
          src={currentPhoto.url} 
          alt={currentPhoto.jobTitle || 'Photo'} 
          className="viewer-image"
          onDoubleClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
        />
        
        {currentPhoto.type === 'video' && (
          <>
            {!isPlaying && (
              <div className="video-controls">
                <button className="large-play-btn" onClick={(e) => { e.stopPropagation(); setIsPlaying(true); }}>
                  <Icons.Play />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Zoom hint on first view */}
      {showControls && !isZoomed && currentPhoto.type === 'image' && !currentPhoto.corrupted && (
        <div className="zoom-hint">
          <Icons.ZoomIn />
          <span>Double-tap to zoom</span>
        </div>
      )}

      {/* Video Player Controls (when playing) */}
      {currentPhoto.type === 'video' && isPlaying && (
        <div className="video-player-overlay" onClick={e => e.stopPropagation()}>
          <VideoPlayerControls 
            duration={currentPhoto.duration}
            isPlaying={isPlaying}
            isMuted={isMuted}
            currentTime={videoProgress}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onMute={() => setIsMuted(!isMuted)}
            onSeek={setVideoProgress}
          />
        </div>
      )}

      {/* Navigation Arrows */}
      {currentIndex > 0 && (
        <button 
          className="nav-arrow left"
          onClick={(e) => { e.stopPropagation(); handleSwipe('right'); }}
        >
          <Icons.ChevronLeft />
        </button>
      )}
      {currentIndex < photos.length - 1 && (
        <button 
          className="nav-arrow right"
          onClick={(e) => { e.stopPropagation(); handleSwipe('left'); }}
        >
          <Icons.ChevronRight />
        </button>
      )}

      {/* Bottom Info Bar */}
      <div className={`viewer-bottom-bar ${showControls ? 'visible' : ''}`} onClick={(e) => { e.stopPropagation(); onShowDetails(); }}>
        <div className="quick-info">
          <div className="job-info">
            <Icons.Briefcase />
            {currentPhoto.jobDeleted ? (
              <span className="deleted-text">Job no longer exists</span>
            ) : (
              <span>{currentPhoto.job}</span>
            )}
          </div>
          <div className="customer-info">
            <Icons.User />
            {currentPhoto.customer ? (
              <span>{currentPhoto.customer}</span>
            ) : (
              <span className="no-customer-text">No customer assigned</span>
            )}
          </div>
        </div>
        <Icons.ChevronRight />
      </div>

      {/* Thumbnail Strip */}
      <div className={`thumbnail-strip ${showControls ? 'visible' : ''}`}>
        {photos.map((photo, index) => (
          <div 
            key={photo.id}
            className={`strip-thumb ${index === currentIndex ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); onNavigate(index); }}
          >
            <img src={photo.url} alt="" />
          </div>
        ))}
      </div>

      {/* More Options Menu */}
      <MoreOptionsMenu 
        isOpen={showOptionsMenu}
        onClose={() => setShowOptionsMenu(false)}
        onAction={handleMenuAction}
        canDelete={canDelete}
      />
    </div>
  );
};

// Media Details Panel
const MediaDetailsPanel = ({ photo, onClose, isExpanded, onToggleExpand, onNavigateToJob, onNavigateToCustomer }) => {
  if (!photo) return null;

  const hasNoTags = !photo.tags || photo.tags.length === 0;
  const hasNoDescription = !photo.description;
  const hasNoCustomer = !photo.customer;
  const isJobDeleted = photo.jobDeleted;

  return (
    <div className="bottom-sheet-overlay" onClick={onClose}>
      <div 
        className={`bottom-sheet details-sheet ${isExpanded ? 'expanded' : ''}`} 
        onClick={e => e.stopPropagation()}
      >
        <div className="sheet-handle" onClick={onToggleExpand} />
        
        {/* Job & Customer Card */}
        <div className="detail-card">
          {/* Job Row */}
          <div className={`detail-row ${!isJobDeleted ? 'clickable' : 'disabled'}`} onClick={() => !isJobDeleted && onNavigateToJob?.()}>
            <div className={`detail-icon ${isJobDeleted ? 'error' : ''}`}>
              <Icons.Briefcase />
            </div>
            <div className="detail-content">
              {isJobDeleted ? (
                <>
                  <span className="detail-primary error-text">Job no longer exists</span>
                  <span className="detail-secondary">This job has been deleted</span>
                </>
              ) : (
                <>
                  <span className="detail-primary">{photo.job}</span>
                  <span className="detail-secondary truncate-text">{photo.jobTitle}</span>
                </>
              )}
            </div>
            {!isJobDeleted && <Icons.ChevronRight />}
          </div>
          
          <div className="detail-divider" />
          
          {/* Customer Row */}
          <div className={`detail-row ${!hasNoCustomer ? 'clickable' : ''}`} onClick={() => !hasNoCustomer && onNavigateToCustomer?.()}>
            <div className={`detail-icon ${hasNoCustomer ? 'muted' : ''}`}>
              {hasNoCustomer ? <Icons.User /> : <Icons.User />}
            </div>
            <div className="detail-content">
              {hasNoCustomer ? (
                <>
                  <span className="detail-primary muted-text">No customer assigned</span>
                  <span className="detail-secondary">Customer not linked to this job</span>
                </>
              ) : (
                <>
                  <span className="detail-primary">{photo.customer}</span>
                  <span className="detail-secondary">{photo.company}</span>
                </>
              )}
            </div>
            {!hasNoCustomer && <Icons.ChevronRight />}
          </div>
        </div>

        {isExpanded && (
          <>
            {/* Tags */}
            <div className="detail-section">
              <div className="section-header">
                <span className="section-label">Tags</span>
                <button className="edit-btn"><Icons.Edit /></button>
              </div>
              <div className="tags-list">
                {hasNoTags ? (
                  <span className="no-tags-text">No tags added</span>
                ) : (
                  photo.tags.map(tag => (
                    <span key={tag} className="tag-chip">
                      {tag}
                      <button className="remove-tag"><Icons.Close /></button>
                    </span>
                  ))
                )}
                <button className="add-tag-chip">+ Add Tag</button>
              </div>
            </div>

            {/* Description */}
            <div className="detail-section">
              <div className="section-header">
                <span className="section-label">Description</span>
                <button className="edit-btn"><Icons.Edit /></button>
              </div>
              {hasNoDescription ? (
                <p className="description-text empty">No description added</p>
              ) : (
                <p className="description-text">{photo.description}</p>
              )}
            </div>

            {/* File Details */}
            <div className="detail-card file-details">
              <h4>File Details</h4>
              <div className="file-info-grid">
                <div className="file-info-row">
                  <span className="info-label">File Name</span>
                  <span className="info-value">IMG_{photo.date?.replace(/[^0-9]/g, '')}_01.{photo.type === 'video' ? 'mp4' : 'jpg'}</span>
                </div>
                <div className="file-info-row">
                  <span className="info-label">Type</span>
                  <span className="info-value">{photo.type === 'video' ? 'MP4 Video' : 'JPEG Image'}</span>
                </div>
                <div className="file-info-row">
                  <span className="info-label">Size</span>
                  <span className="info-value">{photo.fileSize || '2.4 MB'}</span>
                </div>
                {photo.type !== 'video' && (
                  <div className="file-info-row">
                    <span className="info-label">Dimensions</span>
                    <span className="info-value">4032 × 3024</span>
                  </div>
                )}
                {photo.type === 'video' && (
                  <div className="file-info-row">
                    <span className="info-label">Duration</span>
                    <span className="info-value">{photo.duration}</span>
                  </div>
                )}
                <div className="file-info-row">
                  <span className="info-label">Uploaded By</span>
                  <span className="info-value clickable-text">{photo.uploadedBy}</span>
                </div>
                <div className="file-info-row">
                  <span className="info-label">Uploaded On</span>
                  <span className="info-value">{photo.date}, 10:32 AM</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Bulk Tag Sheet
const BulkTagSheet = ({ isOpen, onClose, selectedCount, onApply }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const availableTags = ['Interior', 'Exterior', 'Plumbing', 'HVAC', 'Electrical', 'Roofing', 'Landscaping', 'Kitchen', 'Bathroom', 'Before', 'After', 'Progress'];

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="bottom-sheet-overlay" onClick={onClose}>
      <div className="bottom-sheet tag-sheet" onClick={e => e.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="sheet-header">
          <h2>Add Tags</h2>
          <span className="selected-count">{selectedCount} {selectedCount === 1 ? 'photo' : 'photos'} selected</span>
        </div>
        <div className="sheet-content">
          <div className="chip-group">
            {availableTags.map(tag => (
              <button 
                key={tag}
                className={`filter-chip ${selectedTags.includes(tag) ? 'selected' : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {selectedTags.includes(tag) && <Icons.Check />}
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div className="sheet-footer">
          <button className="apply-btn" onClick={() => onApply(selectedTags)} disabled={selectedTags.length === 0}>
            Apply to {selectedCount} items
          </button>
        </div>
      </div>
    </div>
  );
};

// Delete Confirmation Modal
const DeleteConfirmModal = ({ isOpen, onClose, selectedCount, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="confirm-modal" onClick={e => e.stopPropagation()}>
        <h3>Delete {selectedCount} {selectedCount === 1 ? 'photo' : 'photos'}?</h3>
        <p>This action cannot be undone.</p>
        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onClose}>Cancel</button>
          <button className="modal-btn delete" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

// Permission Denied Dialog
const PermissionDeniedDialog = ({ isOpen, onClose, action = 'delete' }) => {
  if (!isOpen) return null;

  const messages = {
    delete: {
      title: 'Cannot Delete Photo',
      description: "You don't have permission to delete this photo. Only the uploader or an admin can delete it."
    },
    view: {
      title: 'Access Restricted',
      description: "You don't have permission to view this photo."
    },
    edit: {
      title: 'Cannot Edit',
      description: "You don't have permission to edit this photo."
    }
  };

  const message = messages[action] || messages.delete;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="permission-modal" onClick={e => e.stopPropagation()}>
        <div className="permission-icon">
          <Icons.Lock />
        </div>
        <h3>{message.title}</h3>
        <p>{message.description}</p>
        <button className="modal-btn primary" onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

// Empty States
const EmptyState = ({ type }) => {
  const states = {
    'no-photos': {
      icon: <Icons.Camera />,
      title: 'No photos yet',
      subtitle: 'Photos uploaded to jobs will appear here',
      action: 'Go to Jobs'
    },
    'no-team': {
      icon: <Icons.Users />,
      title: 'No team photos yet',
      subtitle: 'Photos uploaded by your team will appear here',
      action: null
    },
    'no-results': {
      icon: <Icons.Filter />,
      title: 'No photos match your filters',
      subtitle: 'Try adjusting your filters or search terms',
      action: 'Clear Filters'
    },
    'error': {
      icon: <Icons.CloudOff />,
      title: 'Connection error',
      subtitle: 'Please check your internet and try again',
      action: 'Retry'
    },
    'no-access': {
      icon: <Icons.Lock />,
      title: 'Access restricted',
      subtitle: "You don't have permission to view this photo",
      action: 'Go Back'
    }
  };

  const state = states[type];

  return (
    <div className="empty-state-container">
      <div className="empty-icon-large">{state.icon}</div>
      <h3>{state.title}</h3>
      <p>{state.subtitle}</p>
      {state.action && <button className="empty-action-btn">{state.action}</button>}
    </div>
  );
};

// Loading State
const LoadingGrid = () => (
  <div className="feed-screen">
    <div className="feed-header">
      <button className="header-btn"><Icons.Back /></button>
      <h1 className="header-title">Photo Feed</h1>
      <div className="header-actions">
        <button className="header-btn"><Icons.Filter /></button>
        <button className="header-btn"><Icons.Search /></button>
      </div>
    </div>
    <div className="feed-tabs">
      <button className="tab-btn active">My Uploads</button>
      <button className="tab-btn">Team Uploads</button>
    </div>
    <div className="photo-grid">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="photo-thumb skeleton" />
      ))}
    </div>
  </div>
);

// Role Info Component
const RoleInfo = ({ role }) => {
  const roleDetails = {
    [USER_ROLES.FIELD_ENGINEER]: {
      title: 'Field Engineer',
      icon: '👷',
      description: 'Sees only photos they personally uploaded',
      color: '#4CAF50'
    },
    [USER_ROLES.TEAM_LEADER]: {
      title: 'Team Leader',
      icon: '👨‍💼',
      description: 'Sees all photos from their team members',
      color: '#2196F3'
    },
    [USER_ROLES.ADMIN]: {
      title: 'Admin',
      icon: '🔑',
      description: 'Sees all photos across the organization',
      color: '#9C27B0'
    }
  };

  const info = roleDetails[role];

  return (
    <div className="role-info-banner" style={{ borderColor: info.color }}>
      <span className="role-icon">{info.icon}</span>
      <div className="role-details">
        <span className="role-title" style={{ color: info.color }}>{info.title}</span>
        <span className="role-desc">{info.description}</span>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [currentRole, setCurrentRole] = useState(USER_ROLES.TEAM_LEADER);
  const [showFilter, setShowFilter] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [activeFilters, setActiveFilters] = useState(0);
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [showTagSheet, setShowTagSheet] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showMetadata, setShowMetadata] = useState(false);

  const handlePhotoClick = (index) => {
    setCurrentPhotoIndex(index);
    setShowViewer(true);
  };

  const handleApplyFilters = (filters) => {
    let count = 0;
    if (filters.dateFrom || filters.dateTo) count++;
    if (filters.selectedUsers.length > 0) count++;
    if (filters.selectedTags.length > 0) count++;
    if (filters.mediaType !== 'all') count++;
    setActiveFilters(count);
    setShowFilter(false);
  };

  const handleLongPress = (photoId) => {
    setMultiSelectMode(true);
    setSelectedPhotos([photoId]);
  };

  const handleToggleSelect = (photoId) => {
    setSelectedPhotos(prev => 
      prev.includes(photoId) 
        ? prev.filter(id => id !== photoId)
        : [...prev, photoId]
    );
  };

  const handleCancelSelect = () => {
    setMultiSelectMode(false);
    setSelectedPhotos([]);
  };

  const handleSelectAll = () => {
    setSelectedPhotos(samplePhotos.map(p => p.id));
  };

  const handleBulkAction = (action) => {
    if (action === 'tag') {
      setShowTagSheet(true);
    } else if (action === 'delete') {
      setShowDeleteConfirm(true);
    } else if (action === 'download') {
      // Simulate download
      handleCancelSelect();
    }
  };

  const screens = [
    { id: 'home', label: 'Home' },
    { id: 'home-v2', label: 'Home V2' },
    { id: 'feed', label: 'Photo Feed' },
    { id: 'job-view', label: 'Job View' },
    { id: 'filter', label: 'Filter Sheet' },
    { id: 'search', label: 'Search' },
    { id: 'viewer', label: 'Media Viewer' },
    { id: 'video-player', label: 'Video Player' },
    { id: 'multiselect', label: 'Multi-Select' },
    { id: 'offline', label: 'Offline Mode' },
    { id: 'empty', label: 'Empty States' },
    { id: 'loading', label: 'Loading' },
    { id: 'error', label: 'Error State' },
  ];

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <Homepage onNavigate={() => setCurrentScreen('feed')} />
        );
      case 'home-v2':
        return (
          <HomepageWithPhotos 
            onNavigate={() => setCurrentScreen('feed')} 
            recentPhotos={samplePhotos}
          />
        );
      case 'feed':
        return (
          <>
            <PhotoFeedGrid 
              photos={samplePhotos.slice(0, 12)}
              onPhotoClick={handlePhotoClick}
              onFilterClick={() => setShowFilter(true)}
              onSearchClick={() => setShowSearch(true)}
              activeFilters={activeFilters}
              multiSelectMode={false}
              selectedPhotos={[]}
              onToggleSelect={() => {}}
              onLongPress={handleLongPress}
              onCancelSelect={() => {}}
              onSelectAll={() => {}}
              onBulkAction={() => {}}
              userRole={currentRole}
              showMetadata={showMetadata}
              onBack={() => setCurrentScreen('home')}
            />
            <FilterSheet 
              isOpen={showFilter} 
              onClose={() => setShowFilter(false)}
              onApply={handleApplyFilters}
              userRole={currentRole}
              showMetadata={showMetadata}
              onToggleMetadata={() => setShowMetadata(!showMetadata)}
            />
            {showSearch && (
              <SearchScreen 
                onClose={() => setShowSearch(false)}
                photos={samplePhotos}
                onPhotoClick={handlePhotoClick}
              />
            )}
            {showViewer && (
              <MediaViewer 
                photos={samplePhotos}
                currentIndex={currentPhotoIndex}
                onClose={() => setShowViewer(false)}
                onNavigate={setCurrentPhotoIndex}
                onShowDetails={() => setShowDetails(true)}
              />
            )}
            {showDetails && (
              <MediaDetailsPanel 
                photo={samplePhotos[currentPhotoIndex]}
                onClose={() => { setShowDetails(false); setDetailsExpanded(false); }}
                isExpanded={detailsExpanded}
                onToggleExpand={() => setDetailsExpanded(!detailsExpanded)}
              />
            )}
          </>
        );
      case 'job-view':
        return (
          <>
            <PhotoFeedGrid 
              photos={samplePhotos.slice(0, 12)}
              onPhotoClick={handlePhotoClick}
              onFilterClick={() => setShowFilter(true)}
              onSearchClick={() => setShowSearch(true)}
              activeFilters={activeFilters}
              multiSelectMode={false}
              selectedPhotos={[]}
              onToggleSelect={() => {}}
              onLongPress={handleLongPress}
              onCancelSelect={() => {}}
              onSelectAll={() => {}}
              onBulkAction={() => {}}
              userRole={currentRole}
              showMetadata={showMetadata}
              onToggleMetadata={() => setShowMetadata(!showMetadata)}
              initialViewMode="job"
              onBack={() => setCurrentScreen('home')}
            />
            <FilterSheet 
              isOpen={showFilter} 
              onClose={() => setShowFilter(false)}
              onApply={handleApplyFilters}
              userRole={currentRole}
              showMetadata={showMetadata}
              onToggleMetadata={() => setShowMetadata(!showMetadata)}
            />
            {showSearch && (
              <SearchScreen 
                onClose={() => setShowSearch(false)}
                photos={samplePhotos}
                onPhotoClick={handlePhotoClick}
              />
            )}
            {showViewer && (
              <MediaViewer 
                photos={samplePhotos}
                currentIndex={currentPhotoIndex}
                onClose={() => setShowViewer(false)}
                onNavigate={setCurrentPhotoIndex}
                onShowDetails={() => setShowDetails(true)}
              />
            )}
            {showDetails && (
              <MediaDetailsPanel 
                photo={samplePhotos[currentPhotoIndex]}
                onClose={() => { setShowDetails(false); setDetailsExpanded(false); }}
                isExpanded={detailsExpanded}
                onToggleExpand={() => setDetailsExpanded(!detailsExpanded)}
              />
            )}
          </>
        );
      case 'filter':
        return (
          <>
            <PhotoFeedGrid 
              photos={samplePhotos.slice(0, 12)}
              onPhotoClick={() => {}}
              onFilterClick={() => {}}
              onSearchClick={() => {}}
              activeFilters={0}
              multiSelectMode={false}
              selectedPhotos={[]}
              onToggleSelect={() => {}}
              onLongPress={() => {}}
              onCancelSelect={() => {}}
              onSelectAll={() => {}}
              onBulkAction={() => {}}
              userRole={currentRole}
              onBack={() => setCurrentScreen('home')}
            />
            <FilterSheet isOpen={true} onClose={() => {}} onApply={() => {}} userRole={currentRole} />
          </>
        );
      case 'search':
        return (
          <SearchScreen 
            onClose={() => setCurrentScreen('feed')}
            photos={samplePhotos}
            onPhotoClick={() => {}}
          />
        );
      case 'viewer':
        return (
          <>
            <MediaViewer 
              photos={samplePhotos}
              currentIndex={0}
              onClose={() => setCurrentScreen('feed')}
              onNavigate={() => {}}
              onShowDetails={() => setShowDetails(!showDetails)}
            />
            {showDetails && (
              <MediaDetailsPanel 
                photo={samplePhotos[0]}
                onClose={() => setShowDetails(false)}
                isExpanded={true}
                onToggleExpand={() => {}}
              />
            )}
          </>
        );
      case 'video-player':
        return (
          <MediaViewer 
            photos={samplePhotos.filter(p => p.type === 'video')}
            currentIndex={0}
            onClose={() => setCurrentScreen('feed')}
            onNavigate={() => {}}
            onShowDetails={() => {}}
          />
        );
      case 'multiselect':
        return (
          <>
            <PhotoFeedGrid 
              photos={samplePhotos.slice(0, 12)}
              onPhotoClick={() => {}}
              onFilterClick={() => {}}
              onSearchClick={() => {}}
              activeFilters={0}
              multiSelectMode={true}
              selectedPhotos={[1, 3, 5]}
              onToggleSelect={handleToggleSelect}
              onLongPress={() => {}}
              onCancelSelect={handleCancelSelect}
              onSelectAll={handleSelectAll}
              onBulkAction={handleBulkAction}
              onBack={() => setCurrentScreen('home')}
            />
            <BulkTagSheet 
              isOpen={showTagSheet}
              onClose={() => setShowTagSheet(false)}
              selectedCount={3}
              onApply={() => setShowTagSheet(false)}
            />
            <DeleteConfirmModal 
              isOpen={showDeleteConfirm}
              onClose={() => setShowDeleteConfirm(false)}
              selectedCount={3}
              onConfirm={() => setShowDeleteConfirm(false)}
            />
          </>
        );
      case 'offline':
        return (
          <PhotoFeedGrid 
            photos={samplePhotos.slice(0, 12)}
            onPhotoClick={() => {}}
            onFilterClick={() => {}}
            onSearchClick={() => {}}
            activeFilters={0}
            multiSelectMode={false}
            selectedPhotos={[]}
            onToggleSelect={() => {}}
            onLongPress={() => {}}
            onCancelSelect={() => {}}
            onSelectAll={() => {}}
            onBulkAction={() => {}}
            isOffline={true}
            onBack={() => setCurrentScreen('home')}
          />
        );
      case 'empty':
        return (
          <div className="feed-screen">
            <div className="feed-header">
              <button className="header-btn" onClick={() => setCurrentScreen('home')}><Icons.Back /></button>
              <h1 className="header-title">Photo Feed</h1>
              <div className="header-actions">
                <button className="header-btn"><Icons.Filter /></button>
                <button className="header-btn"><Icons.Search /></button>
              </div>
            </div>
            <div className="feed-tabs">
              <button className="tab-btn active">My Uploads</button>
              <button className="tab-btn">Team Uploads</button>
            </div>
            <EmptyState type="no-photos" />
          </div>
        );
      case 'loading':
        return <LoadingGrid />;
      case 'error':
        return (
          <div className="feed-screen">
            <div className="feed-header">
              <button className="header-btn" onClick={() => setCurrentScreen('home')}><Icons.Back /></button>
              <h1 className="header-title">Photo Feed</h1>
              <div className="header-actions">
                <button className="header-btn"><Icons.Filter /></button>
                <button className="header-btn"><Icons.Search /></button>
              </div>
            </div>
            <EmptyState type="error" />
          </div>
        );
      default:
        return null;
    }
  };

  const roles = [
    { id: USER_ROLES.FIELD_ENGINEER, label: 'Field Engineer', icon: '👷', color: '#4CAF50' },
    { id: USER_ROLES.TEAM_LEADER, label: 'Team Leader', icon: '👨‍💼', color: '#2196F3' },
    { id: USER_ROLES.ADMIN, label: 'Admin', icon: '🔑', color: '#9C27B0' }
  ];

  return (
    <div className="app-container">
      {/* Role Switcher */}
      <div className="role-switcher">
        <span className="switcher-label">View as:</span>
        <div className="role-buttons">
          {roles.map(role => (
            <button
              key={role.id}
              className={`role-btn ${currentRole === role.id ? 'active' : ''}`}
              style={{ 
                '--role-color': role.color,
                borderColor: currentRole === role.id ? role.color : 'transparent',
                background: currentRole === role.id ? `${role.color}15` : 'rgba(255,255,255,0.1)'
              }}
              onClick={() => setCurrentRole(role.id)}
            >
              <span className="role-btn-icon">{role.icon}</span>
              <span className="role-btn-label">{role.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Screen Navigation */}
      <div className="screen-nav">
        {screens.map(screen => (
          <button
            key={screen.id}
            className={`screen-nav-btn ${currentScreen === screen.id ? 'active' : ''}`}
            onClick={() => {
              setCurrentScreen(screen.id);
              setShowFilter(false);
              setShowSearch(false);
              setShowViewer(false);
              setShowDetails(false);
              setShowTagSheet(false);
              setShowDeleteConfirm(false);
            }}
          >
            {screen.label}
          </button>
        ))}
      </div>

      <PhoneFrame title={screens.find(s => s.id === currentScreen)?.label || ''}>
        {renderCurrentScreen()}
      </PhoneFrame>
    </div>
  );
}

export default App;

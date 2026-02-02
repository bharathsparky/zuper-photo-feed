import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import * as FigmaAssets from './figmaAssets';

// Icons Component
const Icons = {
  // Grid size toggle icons
  Grid2: () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <rect x="2" y="2" width="7" height="7" rx="1.5" />
      <rect x="11" y="2" width="7" height="7" rx="1.5" />
      <rect x="2" y="11" width="7" height="7" rx="1.5" />
      <rect x="11" y="11" width="7" height="7" rx="1.5" />
    </svg>
  ),
  Grid3: () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <rect x="1" y="1" width="5" height="5" rx="1" />
      <rect x="7.5" y="1" width="5" height="5" rx="1" />
      <rect x="14" y="1" width="5" height="5" rx="1" />
      <rect x="1" y="7.5" width="5" height="5" rx="1" />
      <rect x="7.5" y="7.5" width="5" height="5" rx="1" />
      <rect x="14" y="7.5" width="5" height="5" rx="1" />
      <rect x="1" y="14" width="5" height="5" rx="1" />
      <rect x="7.5" y="14" width="5" height="5" rx="1" />
      <rect x="14" y="14" width="5" height="5" rx="1" />
    </svg>
  ),
  Grid4: () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <rect x="1" y="1" width="3.5" height="3.5" rx="0.75" />
      <rect x="5.5" y="1" width="3.5" height="3.5" rx="0.75" />
      <rect x="10" y="1" width="3.5" height="3.5" rx="0.75" />
      <rect x="14.5" y="1" width="3.5" height="3.5" rx="0.75" />
      <rect x="1" y="5.5" width="3.5" height="3.5" rx="0.75" />
      <rect x="5.5" y="5.5" width="3.5" height="3.5" rx="0.75" />
      <rect x="10" y="5.5" width="3.5" height="3.5" rx="0.75" />
      <rect x="14.5" y="5.5" width="3.5" height="3.5" rx="0.75" />
      <rect x="1" y="10" width="3.5" height="3.5" rx="0.75" />
      <rect x="5.5" y="10" width="3.5" height="3.5" rx="0.75" />
      <rect x="10" y="10" width="3.5" height="3.5" rx="0.75" />
      <rect x="14.5" y="10" width="3.5" height="3.5" rx="0.75" />
      <rect x="1" y="14.5" width="3.5" height="3.5" rx="0.75" />
      <rect x="5.5" y="14.5" width="3.5" height="3.5" rx="0.75" />
      <rect x="10" y="14.5" width="3.5" height="3.5" rx="0.75" />
      <rect x="14.5" y="14.5" width="3.5" height="3.5" rx="0.75" />
    </svg>
  ),
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
  Heart: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  HeartFilled: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#E44A19" stroke="#E44A19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  // Editor Icons
  Pencil: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  ),
  Undo: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 14L4 9l5-5" />
      <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" />
    </svg>
  ),
  Redo: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14l5-5-5-5" />
      <path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5v0A5.5 5.5 0 0 0 9.5 20H13" />
    </svg>
  ),
  Draw: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 18 Q 7 8, 10 14 Q 13 20, 16 10 Q 18 4, 20 6" />
    </svg>
  ),
  Arrow: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Rectangle: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  ),
  Circle: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
  TextTool: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  ),
  Polyline: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 17 9 11 13 15 21 7" />
      <circle cx="3" cy="17" r="2" fill="currentColor" />
      <circle cx="9" cy="11" r="2" fill="currentColor" />
      <circle cx="13" cy="15" r="2" fill="currentColor" />
      <circle cx="21" cy="7" r="2" fill="currentColor" />
    </svg>
  ),
  Crop: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6.13 1L6 16a2 2 0 0 0 2 2h15" />
      <path d="M1 6.13L16 6a2 2 0 0 1 2 2v15" />
    </svg>
  ),
  RotateRight: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 2v6h-6" />
      <path d="M21 13a9 9 0 1 1-3-7.7L21 8" />
    </svg>
  ),
  Sticker: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  ),
  Magnifier: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <circle cx="11" cy="11" r="3" />
    </svg>
  ),
  Location: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  ),
  Ruler: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.42 6.34L17.66 2.58a2 2 0 0 0-2.83 0l-12.25 12.25a2 2 0 0 0 0 2.83l3.76 3.76a2 2 0 0 0 2.83 0l12.25-12.25a2 2 0 0 0 0-2.83Z"/>
      <path d="M7.5 10.5L9 12"/>
      <path d="M10.5 7.5L12 9"/>
      <path d="M13.5 4.5L15 6"/>
    </svg>
  ),
  Copy: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  ),
  BringFront: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="8" width="12" height="12" rx="2"/>
      <path d="M4 16V6a2 2 0 0 1 2-2h10"/>
    </svg>
  ),
  SendBack: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="12" height="12" rx="2"/>
      <path d="M8 20h10a2 2 0 0 0 2-2V8"/>
    </svg>
  ),
  Rotate: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2v6h-6"/>
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8"/>
      <path d="M3 22v-6h6"/>
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>
    </svg>
  ),
  FlipArrow: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 16l-4-4 4-4"/>
      <path d="M17 8l4 4-4 4"/>
      <path d="M3 12h18"/>
    </svg>
  ),
  Bold: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
      <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
    </svg>
  ),
  Italic: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="4" x2="10" y2="4"/>
      <line x1="14" y1="20" x2="5" y2="20"/>
      <line x1="15" y1="4" x2="9" y2="20"/>
    </svg>
  ),
  FillShape: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
      <circle cx="12" cy="12" r="8"/>
    </svg>
  ),
  OutlineShape: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="8"/>
    </svg>
  ),
  TextSize: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 7 4 4 20 4 20 7"/>
      <line x1="9" y1="20" x2="15" y2="20"/>
      <line x1="12" y1="4" x2="12" y2="20"/>
    </svg>
  ),
  Move: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="5 9 2 12 5 15" />
      <polyline points="9 5 12 2 15 5" />
      <polyline points="15 19 12 22 9 19" />
      <polyline points="19 9 22 12 19 15" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="12" y1="2" x2="12" y2="22" />
    </svg>
  ),
  Mic: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  ),
  Paperclip: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
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
  MapPin: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  MyLocation: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
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
  
  // Additional jobs for more map pins
  { id: 17, type: 'image', url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=400&fit=crop', job: '#2024-1442', jobTitle: 'Lakeside Dr - New Construction', customer: 'Amanda Foster', address: '123 Lakeside Dr, Kirkland, WA', company: 'Foster Developments', uploadedBy: 'Henry Jones', date: getDateString(0), tags: ['New Build', 'Installation'], description: 'New construction roof installation' },
  { id: 18, type: 'image', url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=400&h=400&fit=crop', job: '#2024-1443', jobTitle: 'Highland Ave - Emergency Repair', customer: 'Steven Clark', address: '456 Highland Ave, Tacoma, WA', company: 'Clark Industries', uploadedBy: 'Mike Wilson', date: getDateString(0), tags: ['Emergency', 'Leak'], description: 'Emergency leak repair' },
  { id: 19, type: 'video', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop', duration: '0:55', job: '#2024-1444', jobTitle: 'Westview Rd - Solar Panel Prep', customer: 'Nancy Martinez', address: '789 Westview Rd, Redmond, WA', company: 'Martinez Solar', uploadedBy: 'Tom Anderson', date: getDateString(1), tags: ['Solar', 'Preparation'], description: 'Roof prep for solar installation' },
  { id: 20, type: 'image', url: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=400&h=400&fit=crop', job: '#2024-1445', jobTitle: 'Birch Street - Ventilation Install', customer: 'Daniel Robinson', address: '321 Birch St, Renton, WA', company: 'Robinson Home Services', uploadedBy: 'Henry Jones', date: getDateString(1), tags: ['Ventilation', 'Attic'], description: 'Attic ventilation installation' },
  { id: 21, type: 'image', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=400&fit=crop', job: '#2024-1446', jobTitle: 'Northgate Mall - Commercial Flat', customer: 'Northgate Properties', address: '401 Northgate Way, Seattle, WA', company: 'Northgate Mall LLC', uploadedBy: 'Mike Wilson', date: getDateString(2), tags: ['Commercial', 'Flat Roof'], description: 'Commercial flat roof maintenance' },
  { id: 22, type: 'video', url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=400&fit=crop', duration: '1:15', job: '#2024-1447', jobTitle: 'Downtown Tower - High Rise', customer: 'Metro Tower Inc', address: '1000 1st Ave, Seattle, WA', company: 'Metro Tower Management', uploadedBy: 'Tom Anderson', date: getDateString(2), tags: ['High Rise', 'Inspection'], description: 'High rise roof inspection' },
  { id: 23, type: 'image', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=400&fit=crop', job: '#2024-1448', jobTitle: 'Ballard Market - Waterproofing', customer: 'Ballard Market Co', address: '2200 NW Market St, Seattle, WA', company: 'Ballard Market LLC', uploadedBy: 'Henry Jones', date: getDateString(3), tags: ['Waterproofing', 'Commercial'], description: 'Waterproof membrane application' },
  { id: 24, type: 'image', url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=400&fit=crop', job: '#2024-1449', jobTitle: 'Queen Anne - Historic Restoration', customer: 'Historic Seattle', address: '500 Queen Anne Ave N, Seattle, WA', company: 'Historic Preservation Society', uploadedBy: 'Mike Wilson', date: getDateString(3), tags: ['Historic', 'Restoration'], description: 'Historic building roof restoration' },
  { id: 25, type: 'image', url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=400&fit=crop', job: '#2024-1450', jobTitle: 'Fremont Bridge Area - Apartment Complex', customer: 'Fremont Apartments', address: '3500 Fremont Ave N, Seattle, WA', company: 'Fremont Living', uploadedBy: 'Tom Anderson', date: getDateString(4), tags: ['Multi-family', 'Inspection'], description: 'Apartment complex roof survey' },
  { id: 26, type: 'video', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=400&fit=crop', duration: '2:00', job: '#2024-1451', jobTitle: 'Capitol Hill - Condo Repair', customer: 'Capitol Hill Condos', address: '1500 Broadway, Seattle, WA', company: 'Capitol Hill HOA', uploadedBy: 'Henry Jones', date: getDateString(5), tags: ['Condo', 'Repair'], description: 'Condo roof repair walkthrough' },
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
            <h2>Hello, Henry Jones!</h2>
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

// Map View Component - Enhanced with Tech Delighters
const MapView = ({ jobs, onJobClick, onPhotoClick }) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [sheetState, setSheetState] = useState('collapsed'); // collapsed, half, full
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all'); // all, today, urgent, new, in-progress
  const [showRouteOptimizer, setShowRouteOptimizer] = useState(false);

  // Job statuses for visual differentiation
  const jobStatuses = ['new', 'in-progress', 'scheduled', 'urgent'];
  const distances = ['0.3 mi', '0.8 mi', '1.2 mi', '2.1 mi', '3.5 mi'];
  const driveTimes = ['2 min', '5 min', '8 min', '12 min', '18 min'];

  // Sample job locations with enhanced data - spread across the map for visibility
  const pinPositions = [
    { lat: 47.62, lng: -122.35, area: 'Downtown' },
    { lat: 47.58, lng: -122.30, area: 'Capitol Hill' },
    { lat: 47.65, lng: -122.38, area: 'Ballard' },
    { lat: 47.55, lng: -122.35, area: 'Fremont' },
    { lat: 47.60, lng: -122.28, area: 'Queen Anne' },
    { lat: 47.63, lng: -122.32, area: 'Northgate' },
    { lat: 47.57, lng: -122.40, area: 'West Seattle' },
    { lat: 47.68, lng: -122.34, area: 'Shoreline' },
    { lat: 47.52, lng: -122.29, area: 'Renton' },
    { lat: 47.61, lng: -122.42, area: 'Magnolia' },
    { lat: 47.66, lng: -122.30, area: 'University' },
    { lat: 47.54, lng: -122.38, area: 'Burien' },
    { lat: 47.59, lng: -122.33, area: 'Beacon Hill' },
    { lat: 47.64, lng: -122.36, area: 'Greenwood' },
    { lat: 47.56, lng: -122.32, area: 'Columbia City' },
    { lat: 47.67, lng: -122.39, area: 'Bitter Lake' },
    { lat: 47.53, lng: -122.34, area: 'Tukwila' },
    { lat: 47.60, lng: -122.37, area: 'Interbay' },
    { lat: 47.58, lng: -122.28, area: 'Leschi' },
    { lat: 47.62, lng: -122.40, area: 'Sunset Hill' },
  ];
  
  const jobLocations = jobs.map((job, index) => ({
    ...job,
    lat: pinPositions[index % pinPositions.length].lat + (Math.random() - 0.5) * 0.01,
    lng: pinPositions[index % pinPositions.length].lng + (Math.random() - 0.5) * 0.01,
    area: pinPositions[index % pinPositions.length].area,
    status: jobStatuses[index % 4],
    distance: distances[index % 5],
    driveTime: driveTimes[index % 5],
    isToday: index < 3, // First 3 jobs are today's
    isUrgent: index === 0, // First job is urgent
    hasNewPhotos: index < 2, // First 2 have new photos
    customerPhone: '+1 (555) 123-4567',
    scheduledTime: ['9:00 AM', '10:30 AM', '1:00 PM', '3:30 PM', '4:45 PM'][index % 5],
  }));

  // Stats
  const todayJobsCount = jobLocations.filter(j => j.isToday).length;
  const urgentJobsCount = jobLocations.filter(j => j.isUrgent).length;
  const totalPhotosNearby = jobLocations.reduce((sum, j) => sum + (j.photos?.length || 0), 0);

  // Filter jobs based on search and status filter
  const filteredJobs = jobLocations.filter(job => {
    const matchesSearch = !searchQuery || 
      job.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.customer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.area?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'today' && job.isToday) ||
      (statusFilter === 'urgent' && job.isUrgent) ||
      (statusFilter === 'new' && job.status === 'new') ||
      (statusFilter === 'in-progress' && job.status === 'in-progress');
    
    return matchesSearch && matchesStatus;
  });

  const handlePinClick = (job) => {
    setSelectedJob(job);
    setSheetState('half'); // Default to half-expanded view
    setIsSearching(false);
  };

  // Navigate to next/previous job in carousel
  const handleNextJob = () => {
    const currentIndex = filteredJobs.findIndex(j => j.jobId === selectedJob?.jobId);
    const nextIndex = (currentIndex + 1) % filteredJobs.length;
    setSelectedJob(filteredJobs[nextIndex]);
  };

  const handlePrevJob = () => {
    const currentIndex = filteredJobs.findIndex(j => j.jobId === selectedJob?.jobId);
    const prevIndex = currentIndex === 0 ? filteredJobs.length - 1 : currentIndex - 1;
    setSelectedJob(filteredJobs[prevIndex]);
  };

  // Get current job index for display
  const currentJobIndex = selectedJob ? filteredJobs.findIndex(j => j.jobId === selectedJob?.jobId) + 1 : 0;

  const handleSheetDrag = () => {
    if (sheetState === 'half') setSheetState('full');
    else setSheetState('collapsed');
  };

  const handleCloseSheet = () => {
    setSelectedJob(null);
    setSheetState('collapsed');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSearching(false);
  };

  const handleNavigate = (job) => {
    // Simulate opening maps app
    alert(`Opening navigation to: ${job.address}`);
  };

  const handleCall = (job) => {
    // Simulate calling customer
    alert(`Calling customer: ${job.customerPhone}`);
  };

  return (
    <div className="map-view-container">
      {/* Clean Search Bar */}
      <div className={`map-search-bar ${isSearching ? 'focused' : ''}`}>
        <form onSubmit={handleSearchSubmit}>
          <Icons.Search />
          <input 
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearching(true)}
          />
          {searchQuery && (
            <button type="button" className="clear-search" onClick={() => { setSearchQuery(''); setIsSearching(false); }}>
              <Icons.Close />
            </button>
          )}
        </form>
      </div>

      {/* Search Results Dropdown */}
      {isSearching && searchQuery && (
        <div className="map-search-results">
          {filteredJobs.length > 0 ? (
            <>
              {filteredJobs.slice(0, 5).map(job => (
                <button 
                  key={job.jobId} 
                  className="search-result-item"
                  onClick={() => handlePinClick(job)}
                >
                  <div className="result-thumb">
                    <img src={job.photos?.[0]?.url} alt="" />
                  </div>
                  <div className="result-info">
                    <span className="result-title">{job.jobTitle}</span>
                    <span className="result-address">{job.address}</span>
                  </div>
                </button>
              ))}
            </>
          ) : (
            <div className="no-results">
              <span>No jobs found</span>
            </div>
          )}
        </div>
      )}

      {/* Realistic Map Background */}
      <div className="map-background">
        {/* Map Base Layer - mimics real map */}
        <div className="map-base-layer">
          {/* Parks/Green Areas */}
          <div className="map-park" style={{ top: '60%', left: '10%', width: '25%', height: '30%' }}></div>
          <div className="map-park" style={{ top: '5%', left: '70%', width: '20%', height: '15%' }}></div>
          
          {/* Water Body */}
          <div className="map-water" style={{ top: '75%', left: '50%', width: '45%', height: '20%' }}></div>
          
          {/* Main Roads */}
          <div className="map-road main-road horizontal" style={{ top: '30%' }}></div>
          <div className="map-road main-road horizontal" style={{ top: '65%' }}></div>
          <div className="map-road main-road vertical" style={{ left: '25%' }}></div>
          <div className="map-road main-road vertical" style={{ left: '60%' }}></div>
          
          {/* Secondary Roads */}
          <div className="map-road secondary horizontal" style={{ top: '15%' }}></div>
          <div className="map-road secondary horizontal" style={{ top: '45%' }}></div>
          <div className="map-road secondary horizontal" style={{ top: '80%' }}></div>
          <div className="map-road secondary vertical" style={{ left: '10%' }}></div>
          <div className="map-road secondary vertical" style={{ left: '42%' }}></div>
          <div className="map-road secondary vertical" style={{ left: '78%' }}></div>
          
          {/* Buildings/Blocks */}
          <div className="map-block" style={{ top: '8%', left: '12%', width: '10%', height: '18%' }}></div>
          <div className="map-block" style={{ top: '8%', left: '28%', width: '12%', height: '18%' }}></div>
          <div className="map-block" style={{ top: '8%', left: '45%', width: '13%', height: '18%' }}></div>
          <div className="map-block" style={{ top: '35%', left: '5%', width: '18%', height: '22%' }}></div>
          <div className="map-block" style={{ top: '35%', left: '28%', width: '12%', height: '22%' }}></div>
          <div className="map-block" style={{ top: '35%', left: '45%', width: '13%', height: '12%' }}></div>
          <div className="map-block" style={{ top: '50%', left: '45%', width: '13%', height: '10%' }}></div>
          <div className="map-block" style={{ top: '35%', left: '63%', width: '15%', height: '22%' }}></div>
          <div className="map-block" style={{ top: '35%', left: '82%', width: '12%', height: '22%' }}></div>
          <div className="map-block" style={{ top: '70%', left: '5%', width: '8%', height: '12%' }}></div>
          <div className="map-block" style={{ top: '70%', left: '28%', width: '12%', height: '15%' }}></div>
          
          {/* Street Labels */}
          <div className="map-street-label" style={{ top: '28%', left: '35%' }}>Main St</div>
          <div className="map-street-label" style={{ top: '63%', left: '35%' }}>Oak Ave</div>
          <div className="map-street-label vertical" style={{ top: '50%', left: '23%' }}>1st St</div>
        </div>
        
        {/* Map Pins - Clean Photo Thumbnails */}
        <div className="map-pins-layer">
          {filteredJobs.map((job, index) => {
            // Grid layout: 5 columns x 4 rows = 20 pins max
            const col = index % 5;
            const row = Math.floor(index / 5);
            // Position pins in a grid, leaving space for search bar and water
            const leftPos = 8 + col * 18; // 8%, 26%, 44%, 62%, 80%
            const topPos = 15 + row * 18;  // 15%, 33%, 51%, 69%
            
            return (
              <div 
                key={job.jobId || `job-${index}`}
                className={`map-pin photo-pin-clean ${selectedJob?.jobId === job.jobId ? 'selected' : ''}`}
                style={{
                  left: `${leftPos}%`,
                  top: `${topPos}%`,
                }}
                onClick={() => handlePinClick(job)}
              >
                <div className="pin-photo-clean">
                  <img src={job.photos?.[0]?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100'} alt="" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Current Location Marker */}
        <div className="current-location-marker">
          <div className="location-dot"></div>
          <div className="location-pulse"></div>
        </div>
      </div>

      {/* Current Location Button - Hide when bottom sheet is open */}
      {!selectedJob && (
        <button className="current-location-btn">
          <Icons.MyLocation />
        </button>
      )}

      {/* Zoom Controls - Hide when bottom sheet is open */}
      {!selectedJob && (
        <div className="zoom-controls">
          <button className="zoom-btn">+</button>
          <button className="zoom-btn">−</button>
        </div>
      )}

      {/* Map Attribution */}
      <div className="map-attribution">Map data simulated</div>

      {/* Bottom Sheet */}
      {selectedJob && (
        <div className={`map-bottom-sheet ${sheetState}`}>
          <div className="sheet-drag-handle" onClick={handleSheetDrag}>
            <div className="drag-indicator"></div>
          </div>

          {sheetState === 'half' && (
            <div className="sheet-half-content">
              {/* Job Title with Navigation Arrows */}
              <div className="job-title-row">
                <button className="nav-arrow" onClick={handlePrevJob} disabled={currentJobIndex === 1}>
                  <Icons.ChevronLeft />
                </button>
                <div className="job-title-center">
                  <h3>{selectedJob.jobTitle}</h3>
                </div>
                <button className="nav-arrow" onClick={handleNextJob} disabled={currentJobIndex === filteredJobs.length}>
                  <Icons.ChevronRight />
                </button>
              </div>
              
              {/* Address - separate row */}
              <p className="job-address-row">{selectedJob.address}</p>

              <div className="photo-strip">
                {selectedJob.photos.slice(0, 4).map((photo, i) => (
                  <div key={photo.id} className="strip-photo" onClick={() => onPhotoClick(photo.originalIndex)}>
                    <img src={photo.url} alt="" />
                    {photo.type === 'video' && (
                      <div className="video-indicator">
                        <Icons.Play />
                        <span>{photo.duration}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button className="view-all-btn primary-subtle" onClick={() => setSheetState('full')}>
                View All Photos
              </button>
            </div>
          )}

          {sheetState === 'full' && (
            <div className="sheet-full-content">
              <div className="full-header">
                <div>
                  <h3>{selectedJob.jobTitle}</h3>
                  <p className="job-address">{selectedJob.address}</p>
                </div>
                <button className="close-sheet-btn" onClick={handleCloseSheet}>
                  <Icons.Close />
                </button>
              </div>
              
              {/* Photos organized by date timeline */}
              <div className="photos-timeline">
                {(() => {
                  // Group photos by date
                  const photosByDate = selectedJob.photos.reduce((groups, photo) => {
                    const dateKey = photo.date?.split(',')[0] || 'Unknown';
                    if (!groups[dateKey]) groups[dateKey] = [];
                    groups[dateKey].push(photo);
                    return groups;
                  }, {});
                  
                  return Object.entries(photosByDate).map(([date, photos]) => (
                    <div key={date} className="timeline-date-section">
                      <div className="timeline-date-header">
                        <span className="timeline-date">{date}</span>
                      </div>
                      <div className="timeline-photos-grid">
                        {photos.map((photo) => (
                          <div 
                            key={photo.id} 
                            className={`grid-photo ${photo.type === 'video' ? 'is-video' : ''}`}
                            onClick={() => onPhotoClick(photo.originalIndex)}
                          >
                            <img src={photo.url} alt="" />
                            {photo.type === 'video' && (
                              <div className="video-badge">
                                <Icons.Play />
                                <span>{photo.duration}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ));
                })()}
              </div>
              
              <button className="go-to-job-btn">
                Go to Job Details
              </button>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {jobs.length === 0 && (
        <div className="map-empty-state">
          <div className="empty-icon"><Icons.MapPin /></div>
          <h3>No job photos yet</h3>
          <p>Photos uploaded to jobs will appear on the map</p>
          <button className="browse-jobs-btn">Browse Jobs</button>
        </div>
      )}
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
  favoritedPhotos: propFavoritedPhotos,
  onToggleFavorite: propOnToggleFavorite,
  onRemoveFilter,
  onClearAllFilters,
  showMetadata = false,
  initialViewMode = 'grid',
  onBack
}) => {
  const [activeTab, setActiveTab] = useState('my');
  const [viewMode, setViewMode] = useState(initialViewMode); // 'grid', 'job', or 'map'
  
  // Helper function to get initials from name (e.g., "John Doe" -> "JD")
  const getInitials = (name) => {
    if (!name) return '??';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };
  
  // Check if uploader avatar should be shown (only for Team Leader and Admin)
  const showUploaderAvatar = userRole === USER_ROLES.TEAM_LEADER || userRole === USER_ROLES.ADMIN;
  
  // Inline filter states for Photos tab
  const [activeInlineFilter, setActiveInlineFilter] = useState(null); // 'mediaType', 'tags', 'date', 'jobDate', 'uploadedBy'
  const [selectedMediaType, setSelectedMediaType] = useState('all'); // 'all', 'photos', 'videos'
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState(null); // { from, to } or preset like 'today', 'week'
  const [selectedUploadedBy, setSelectedUploadedBy] = useState([]); // For Photos tab - Team Leader/Admin only (multi-select)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false); // Favorites filter
  const [gridSize, setGridSize] = useState(3); // 2, 3, or 4 columns
  
  // Use prop favoritedPhotos if provided, otherwise use empty set (controlled by parent)
  const favoritedPhotos = propFavoritedPhotos || new Set();
  
  // Cycle through grid sizes
  const cycleGridSize = () => {
    setGridSize(prev => {
      if (prev === 3) return 2;
      if (prev === 2) return 4;
      return 3;
    });
  };
  
  // Get the appropriate grid icon
  const GridIcon = gridSize === 2 ? Icons.Grid2 : gridSize === 4 ? Icons.Grid4 : Icons.Grid3;
  
  // Available tags (would come from backend)
  const availableTags = ['Before', 'After', 'Damage', 'Progress', 'Complete', 'Issue', 'Inspection'];
  
  // Team members (would come from backend)
  const teamMembers = [
    { id: 1, name: 'John Smith' },
    { id: 2, name: 'Sarah Johnson' },
    { id: 3, name: 'Mike Wilson' },
    { id: 4, name: 'Emily Davis' },
    { id: 5, name: 'Chris Brown' },
  ];
  
  // Date presets
  const datePresets = [
    { id: 'today', label: 'Today' },
    { id: 'yesterday', label: 'Yesterday' },
    { id: 'week', label: 'Last 7 days' },
    { id: 'month', label: 'Last 30 days' },
    { id: 'custom', label: 'Custom range' }
  ];

  // Sync viewMode with initialViewMode when it changes (for navigation)
  useEffect(() => {
    setViewMode(initialViewMode);
  }, [initialViewMode]);
  
  // Close inline filter when clicking outside
  const handleCloseInlineFilter = () => {
    setActiveInlineFilter(null);
  };

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

  // Group jobs by date for timeline view in Jobs tab
  const groupJobsByDate = (photos) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Format date for display
    const formatDateShort = (date) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[date.getMonth()]} ${date.getDate()}`;
    };

    // First, group photos by job
    const jobsMap = {};
    photos.forEach((photo, index) => {
      const jobKey = photo.job || 'unassigned';
      if (!jobsMap[jobKey]) {
        jobsMap[jobKey] = {
          jobId: photo.job,
          jobTitle: photo.jobTitle,
          customer: photo.customer,
          address: photo.address,
          jobDeleted: photo.jobDeleted,
          photos: [],
          latestPhotoDate: null
        };
      }
      jobsMap[jobKey].photos.push({ ...photo, originalIndex: index });
      
      // Track the latest photo date for this job
      const photoDate = new Date(photo.timestamp || Date.now());
      if (!jobsMap[jobKey].latestPhotoDate || photoDate > jobsMap[jobKey].latestPhotoDate) {
        jobsMap[jobKey].latestPhotoDate = photoDate;
      }
    });

    // Now group jobs by their latest photo date
    const dateJobGroups = {};
    Object.values(jobsMap).forEach(job => {
      const photoDate = job.latestPhotoDate || new Date();
      photoDate.setHours(0, 0, 0, 0);
      
      let dateKey;
      let displayDate;
      let dateSubtitle = null;
      
      if (photoDate.getTime() === today.getTime()) {
        dateKey = 'today';
        displayDate = `Today ${formatDateShort(today)}`;
      } else if (photoDate.getTime() === yesterday.getTime()) {
        dateKey = 'yesterday';
        displayDate = `Yesterday ${formatDateShort(yesterday)}`;
      } else {
        // Use specific date
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dateKey = photoDate.toISOString().split('T')[0];
        displayDate = `${days[photoDate.getDay()]} ${formatDateShort(photoDate)}`;
      }

      if (!dateJobGroups[dateKey]) {
        dateJobGroups[dateKey] = {
          date: dateKey,
          displayDate,
          dateSubtitle,
          timestamp: photoDate.getTime(),
          jobs: []
        };
      }
      dateJobGroups[dateKey].jobs.push(job);
    });

    // Sort by date (newest first) and return
    return Object.keys(dateJobGroups)
      .sort((a, b) => dateJobGroups[b].timestamp - dateJobGroups[a].timestamp)
      .map(key => dateJobGroups[key])
      .filter(group => group.jobs.length > 0);
  };

  // Group photos by date for gallery view - using relative periods
  const groupPhotosByDate = (photos) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Format date for display
    const formatDateShort = (date) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[date.getMonth()]} ${date.getDate()}`;
    };
    
    // Format full date key for grouping
    const getDateKey = (date) => {
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    };
    
    const dateGroups = {};
    const dateOrder = [];
    
    photos.forEach((photo, index) => {
      // Parse date
      const parts = photo.date.split(' ');
      const month = parts[0];
      const day = parseInt(parts[1].replace(',', ''));
      const year = parseInt(parts[2]);
      const photoDate = new Date(`${month} ${day}, ${year}`);
      photoDate.setHours(0, 0, 0, 0);
      
      let displayDate;
      let dateSubtitle = '';
      const dateKey = getDateKey(photoDate);
      
      if (photoDate.getTime() === today.getTime()) {
        displayDate = 'Today';
        dateSubtitle = formatDateShort(today);
      } else if (photoDate.getTime() === yesterday.getTime()) {
        displayDate = 'Yesterday';
        dateSubtitle = formatDateShort(yesterday);
      } else {
        // Show actual date for all other days
        displayDate = formatDateShort(photoDate);
        dateSubtitle = '';
      }
      
      if (!dateGroups[dateKey]) {
        dateGroups[dateKey] = { 
          displayDate, 
          dateSubtitle, 
          photos: [],
          timestamp: photoDate.getTime()
        };
        dateOrder.push(dateKey);
      }
      
      dateGroups[dateKey].photos.push({ ...photo, originalIndex: index });
    });
    
    // Sort by date (most recent first) and return
    return dateOrder
      .sort((a, b) => dateGroups[b].timestamp - dateGroups[a].timestamp)
      .map(key => dateGroups[key])
      .filter(group => group.photos.length > 0);
  };

  const jobGroups = groupPhotosByJob(photos);
  
  // Filter photos for favorites if enabled
  const filteredPhotosForGrid = showFavoritesOnly 
    ? photos.filter((_, index) => favoritedPhotos.has(index))
    : photos;
  
  const dateGroups = groupPhotosByDate(filteredPhotosForGrid);
  const jobDateGroups = groupJobsByDate(photos);

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
            {/* Grid size toggle - only show in Photos view */}
            {(viewMode === 'grid' || viewMode === 'favorites') ? (
              <button className="header-btn grid-toggle" onClick={cycleGridSize} title={`${gridSize} columns`}>
                <GridIcon />
              </button>
            ) : (
              <div style={{ width: '40px' }} />
            )}
          </>
        )}
      </div>

      {/* View Switcher - Photos / Jobs / Map */}
      {!multiSelectMode && (
        <div className="feed-tabs view-tabs three-tabs">
          <button 
            className={`tab-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => { setViewMode('grid'); setShowFavoritesOnly(false); }}
          >
            <Icons.Grid />
            Photos
          </button>
          <button 
            className={`tab-btn ${viewMode === 'job' ? 'active' : ''}`}
            onClick={() => { setViewMode('job'); setShowFavoritesOnly(false); }}
          >
            <Icons.Briefcase />
            Jobs
          </button>
          <button 
            className={`tab-btn ${viewMode === 'map' ? 'active' : ''}`}
            onClick={() => { setViewMode('map'); setShowFavoritesOnly(false); }}
          >
            <Icons.MapPin />
            Map
          </button>
        </div>
      )}

      {/* Inline Filter Pills - Only for Photos tab */}
      {!multiSelectMode && viewMode === 'grid' && (
        <div className="inline-filters">
          {/* Media Type Filter */}
          <div className="filter-pill-wrapper">
            <button 
              className={`filter-pill ${selectedMediaType !== 'all' ? 'active' : ''} ${activeInlineFilter === 'mediaType' ? 'open' : ''}`}
              onClick={() => setActiveInlineFilter(activeInlineFilter === 'mediaType' ? null : 'mediaType')}
            >
              <span>Media type</span>
              <Icons.ChevronDown />
            </button>
          </div>

          {/* Tags Filter */}
          <div className="filter-pill-wrapper">
            <button 
              className={`filter-pill ${selectedTags.length > 0 ? 'active' : ''} ${activeInlineFilter === 'tags' ? 'open' : ''}`}
              onClick={() => setActiveInlineFilter(activeInlineFilter === 'tags' ? null : 'tags')}
            >
              <span>Tags{selectedTags.length > 0 ? ` (${selectedTags.length})` : ''}</span>
              <Icons.ChevronDown />
            </button>
          </div>

          {/* Date Filter */}
          <div className="filter-pill-wrapper">
            <button 
              className={`filter-pill ${selectedDateRange ? 'active' : ''} ${activeInlineFilter === 'date' ? 'open' : ''}`}
              onClick={() => setActiveInlineFilter(activeInlineFilter === 'date' ? null : 'date')}
            >
              <span>Date</span>
              <Icons.ChevronDown />
            </button>
          </div>

          {/* Uploaded By Filter - Team Leader & Admin Only */}
          {(userRole === USER_ROLES.TEAM_LEADER || userRole === USER_ROLES.ADMIN) && (
            <div className="filter-pill-wrapper">
              <button 
                className={`filter-pill ${selectedUploadedBy.length > 0 ? 'active' : ''} ${activeInlineFilter === 'uploadedBy' ? 'open' : ''}`}
                onClick={() => setActiveInlineFilter(activeInlineFilter === 'uploadedBy' ? null : 'uploadedBy')}
              >
                <span>Uploaded by{selectedUploadedBy.length > 0 ? ` (${selectedUploadedBy.length})` : ''}</span>
                <Icons.ChevronDown />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Filter Dropdown - Rendered outside the scrolling container */}
      {activeInlineFilter && ['mediaType', 'tags', 'date', 'uploadedBy'].includes(activeInlineFilter) && (
        <>
          <div className="filter-overlay" onClick={handleCloseInlineFilter} />
          <div className="photos-filter-dropdown">
            {/* Media Type Options */}
            {activeInlineFilter === 'mediaType' && (
              <>
                <button 
                  className={`dropdown-option ${selectedMediaType === 'all' ? 'selected' : ''}`}
                  onClick={() => { setSelectedMediaType('all'); setActiveInlineFilter(null); }}
                >
                  All
                </button>
                <button 
                  className={`dropdown-option ${selectedMediaType === 'photos' ? 'selected' : ''}`}
                  onClick={() => { setSelectedMediaType('photos'); setActiveInlineFilter(null); }}
                >
                  Photos only
                </button>
                <button 
                  className={`dropdown-option ${selectedMediaType === 'videos' ? 'selected' : ''}`}
                  onClick={() => { setSelectedMediaType('videos'); setActiveInlineFilter(null); }}
                >
                  Videos only
                </button>
              </>
            )}

            {/* Tags Options */}
            {activeInlineFilter === 'tags' && (
              <>
                {availableTags.map(tag => (
                  <button 
                    key={tag}
                    className={`dropdown-option ${selectedTags.includes(tag) ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedTags(prev => 
                        prev.includes(tag) 
                          ? prev.filter(t => t !== tag)
                          : [...prev, tag]
                      );
                    }}
                  >
                    <span className="tag-checkbox">{selectedTags.includes(tag) ? '✓' : ''}</span>
                    {tag}
                  </button>
                ))}
                {selectedTags.length > 0 && (
                  <button 
                    className="dropdown-option clear-option"
                    onClick={() => { setSelectedTags([]); setActiveInlineFilter(null); }}
                  >
                    Clear all
                  </button>
                )}
              </>
            )}

            {/* Date Options */}
            {activeInlineFilter === 'date' && (
              <>
                {datePresets.map(preset => (
                  <button 
                    key={preset.id}
                    className={`dropdown-option ${selectedDateRange === preset.id ? 'selected' : ''}`}
                    onClick={() => { 
                      setSelectedDateRange(selectedDateRange === preset.id ? null : preset.id); 
                      if (preset.id !== 'custom') setActiveInlineFilter(null);
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </>
            )}

            {/* Uploaded By Options - Multi-select */}
            {activeInlineFilter === 'uploadedBy' && (
              <>
                {teamMembers.map(member => (
                  <button 
                    key={member.id}
                    className={`dropdown-option ${selectedUploadedBy.includes(member.name) ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedUploadedBy(prev => 
                        prev.includes(member.name) 
                          ? prev.filter(n => n !== member.name)
                          : [...prev, member.name]
                      );
                    }}
                  >
                    <span className="tag-checkbox">{selectedUploadedBy.includes(member.name) ? '✓' : ''}</span>
                    {member.name}
                  </button>
                ))}
                {selectedUploadedBy.length > 0 && (
                  <button 
                    className="dropdown-option clear-option"
                    onClick={() => { setSelectedUploadedBy([]); setActiveInlineFilter(null); }}
                  >
                    Clear all
                  </button>
                )}
              </>
            )}
          </div>
        </>
      )}

      {/* Jobs Date Filter Dropdown */}
      {activeInlineFilter === 'jobDate' && (
        <>
          <div className="filter-overlay" onClick={handleCloseInlineFilter} />
          <div className="photos-filter-dropdown">
            {datePresets.map(preset => (
              <button 
                key={preset.id}
                className={`dropdown-option ${selectedDateRange === preset.label ? 'selected' : ''}`}
                onClick={() => { 
                  setSelectedDateRange(preset.id === 'all' ? null : preset.label); 
                  setActiveInlineFilter(null); 
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Jobs Search and Date Filter - Only for Jobs tab */}
      {!multiSelectMode && viewMode === 'job' && (
        <div className="jobs-search-filter">
          {/* Search Bar */}
          <div className="jobs-search-bar">
            <Icons.Search />
            <input 
              type="text" 
              placeholder="Search jobs by name or address..." 
              className="jobs-search-input"
            />
          </div>
          
          {/* Filter Pills Row */}
          <div className="jobs-filter-pills">
            {/* Date Filter */}
            <div className="filter-pill-wrapper">
              <button 
                className={`filter-pill ${selectedDateRange ? 'active' : ''} ${activeInlineFilter === 'jobDate' ? 'open' : ''}`}
                onClick={() => setActiveInlineFilter(activeInlineFilter === 'jobDate' ? null : 'jobDate')}
              >
                <span>{selectedDateRange || 'Date'}</span>
                <Icons.ChevronDown />
              </button>
            </div>
          </div>
        </div>
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

      {/* Photo Gallery, Job View, or Map View */}
      {(viewMode === 'grid' || viewMode === 'favorites') && (
        <div className="photo-gallery">
          {/* Empty state for favorites */}
          {showFavoritesOnly && dateGroups.length === 0 && (
            <div className="favorites-empty-state">
              <div className="empty-icon">
                <Icons.Heart />
              </div>
              <h3>No favorites yet</h3>
              <p>Tap the heart icon when viewing a photo to add it to your favorites</p>
            </div>
          )}
          {dateGroups.map((group, groupIndex) => (
            <div key={group.date} className="gallery-date-section">
              {/* Date Header */}
              <div className="gallery-date-header">
                <div className="date-header-content">
                  <span className="date-title">{group.displayDate}</span>
                  {group.dateSubtitle && <span className="date-subtitle">{group.dateSubtitle}</span>}
                </div>
              </div>
              
              {/* Photos Grid */}
              <div className={`gallery-grid grid-cols-${gridSize} ${showMetadata ? 'with-metadata' : ''}`}>
                {group.photos.map((photo, photoIndex) => (
                  <div 
                    key={photo.id}
                    className={`gallery-thumb ${photo.type === 'video' ? 'is-video' : ''} ${multiSelectMode ? 'selectable' : ''} ${selectedPhotos.includes(photo.id) ? 'selected' : ''} ${showMetadata ? 'show-metadata' : ''} ${favoritedPhotos.has(photo.originalIndex) ? 'is-favorited' : ''}`}
                    onClick={() => multiSelectMode ? onToggleSelect(photo.id) : onPhotoClick(photo.originalIndex)}
                    onContextMenu={(e) => { e.preventDefault(); onLongPress(photo.id); }}
                  >
                    <img src={photo.url} alt="" loading="lazy" />
                    {/* Uploader avatar - only for Team Leader and Admin */}
                    {showUploaderAvatar && photo.uploadedBy && !multiSelectMode && (
                      <div className="uploader-avatar" title={photo.uploadedBy}>
                        {getInitials(photo.uploadedBy)}
                      </div>
                    )}
                    {/* Small favorite indicator - only shown if favorited */}
                    {favoritedPhotos.has(photo.originalIndex) && !multiSelectMode && (
                      <div className="favorite-indicator">
                        <Icons.HeartFilled />
                      </div>
                    )}
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
      )}

      {viewMode === 'job' && (
        <div className="job-gallery">
          {jobDateGroups.map((dateGroup) => (
            <div key={dateGroup.date} className="job-date-section">
              {/* Date Header - Same style as Photos tab */}
              <div className="gallery-date-header">
                <div className="date-header-content">
                  <span className="date-title">{dateGroup.displayDate}</span>
                </div>
              </div>

              {/* Jobs under this date */}
              {dateGroup.jobs.map((group) => (
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
                            </span>
                          </div>
                          <button className="job-camera-btn" title="Add photo to this job">
                            <Icons.Camera />
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Photo Grid - Show max 6 photos with "View More" */}
                  <div className="job-photo-grid">
                    {group.photos.slice(0, 6).map((photo, index) => {
                      const isLastVisible = index === 5 && group.photos.length > 6;
                      
                      return (
                        <div 
                          key={photo.id}
                          className={`gallery-thumb ${photo.type === 'video' ? 'is-video' : ''} ${multiSelectMode ? 'selectable' : ''} ${selectedPhotos.includes(photo.id) ? 'selected' : ''} ${isLastVisible ? 'has-more-overlay' : ''}`}
                          onClick={() => {
                            if (isLastVisible) {
                              onPhotoClick(photo.originalIndex);
                            } else if (multiSelectMode) {
                              onToggleSelect(photo.id);
                            } else {
                              onPhotoClick(photo.originalIndex);
                            }
                          }}
                          onContextMenu={(e) => { e.preventDefault(); onLongPress(photo.id); }}
                        >
                          <img src={photo.url} alt="" loading="lazy" />
                          {/* Uploader avatar - only for Team Leader and Admin */}
                          {showUploaderAvatar && photo.uploadedBy && !multiSelectMode && !isLastVisible && (
                            <div className="uploader-avatar" title={photo.uploadedBy}>
                              {getInitials(photo.uploadedBy)}
                            </div>
                          )}
                          {photo.type === 'video' && !isLastVisible && (
                            <div className="gallery-video-badge">
                              <Icons.Play />
                              <span>{photo.duration}</span>
                            </div>
                          )}
                          {isLastVisible && (
                            <div className="view-more-overlay">
                              <span className="view-more-text">View All</span>
                            </div>
                          )}
                          {multiSelectMode && !isLastVisible && (
                            <div className={`gallery-checkbox ${selectedPhotos.includes(photo.id) ? 'checked' : ''}`}>
                              {selectedPhotos.includes(photo.id) && <Icons.Check />}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Map View */}
      {viewMode === 'map' && (
        <MapView 
          jobs={jobGroups} 
          onJobClick={(job) => console.log('Job clicked:', job)}
          onPhotoClick={onPhotoClick}
        />
      )}

      {/* Bulk Actions Bar */}
      {multiSelectMode && selectedPhotos.length > 0 && (
        <div className="bulk-actions-bar">
          <button className="bulk-action" onClick={() => onBulkAction('share')}>
            <Icons.Share />
            <span>Share</span>
          </button>
        </div>
      )}

      {/* Bottom Navigation - Only show in Photos/Grid view */}
      {!multiSelectMode && (viewMode === 'grid' || viewMode === 'favorites') && (
        <div className="feed-bottom-nav">
          <button 
            className={`bottom-nav-item ${!showFavoritesOnly ? 'active' : ''}`}
            onClick={() => { setShowFavoritesOnly(false); setViewMode('grid'); }}
          >
            <Icons.Grid />
            <span>All Photos</span>
          </button>
          <button 
            className={`bottom-nav-item ${showFavoritesOnly ? 'active' : ''}`}
            onClick={() => { setShowFavoritesOnly(true); setViewMode('grid'); }}
          >
            {showFavoritesOnly ? <Icons.HeartFilled /> : <Icons.Heart />}
            <span>Favorites</span>
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
const MediaViewer = ({ photos, currentIndex, onClose, onNavigate, onShowDetails, onToast, favoritedPhotos, onToggleFavorite, onEditPhoto }) => {
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
        <div className="viewer-top-actions">
          <button 
            className="viewer-btn edit-btn"
            onClick={(e) => { e.stopPropagation(); onEditPhoto?.(currentPhoto); }}
            title="Annotate photo"
          >
            <Icons.Pencil />
          </button>
          <button 
            className={`viewer-btn favorite-viewer-btn ${favoritedPhotos?.has(currentIndex) ? 'favorited' : ''}`}
            onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(currentIndex); }}
          >
            {favoritedPhotos?.has(currentIndex) ? <Icons.HeartFilled /> : <Icons.Heart />}
          </button>
          <button className="viewer-btn" onClick={(e) => { e.stopPropagation(); setShowOptionsMenu(true); }}>
            <Icons.MoreVertical />
          </button>
        </div>
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

// Photo Editor Component - Canvas-based annotation tool
const PhotoEditor = ({ photo, onClose, onSave }) => {
  const canvasRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [currentTool, setCurrentTool] = React.useState(null); // No tool selected by default
  const [strokeColor, setStrokeColor] = React.useState('#FF3B30');
  const [strokeWidth, setStrokeWidth] = React.useState(4);
  const [annotations, setAnnotations] = React.useState([]);
  const [currentPath, setCurrentPath] = React.useState([]);
  const [startPoint, setStartPoint] = React.useState(null);
  const [selectedAnnotationId, setSelectedAnnotationId] = React.useState(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = React.useState(false);
  const [resizeHandle, setResizeHandle] = React.useState(null); // 'nw', 'ne', 'sw', 'se', 'n', 's', 'e', 'w'
  const [isRotating, setIsRotating] = React.useState(false);
  const [rotateStartAngle, setRotateStartAngle] = React.useState(0);
  const [showSelectionMenu, setShowSelectionMenu] = React.useState(false);
  const [arrowHeadStyle, setArrowHeadStyle] = React.useState('single'); // 'none', 'single', 'double'
  const [showColorPicker, setShowColorPicker] = React.useState(false);
  const [showMoreTools, setShowMoreTools] = React.useState(false);
  const [showStrokeWidth, setShowStrokeWidth] = React.useState(false);
  const [canvasCursor, setCanvasCursor] = React.useState('default');
  const [undoStack, setUndoStack] = React.useState([]);
  const [redoStack, setRedoStack] = React.useState([]);
  const [textInput, setTextInput] = React.useState('');
  const [showTextInput, setShowTextInput] = React.useState(false);
  const [textPosition, setTextPosition] = React.useState(null);
  const [polylinePoints, setPolylinePoints] = React.useState([]);
  const [loupePosition, setLoupePosition] = React.useState(null); // For polyline magnifier
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [canvasSize, setCanvasSize] = React.useState({ width: 0, height: 0 });
  const [showStickerPicker, setShowStickerPicker] = React.useState(false);
  const [selectedSticker, setSelectedSticker] = React.useState(null);
  // Default fisheye zoom for rendering
  const fisheyeZoom = 2;
  const [fillEnabled, setFillEnabled] = React.useState(true);
  const [measureStart, setMeasureStart] = React.useState(null);
  const [lastTapTime, setLastTapTime] = React.useState(0);
  const [editingTextId, setEditingTextId] = React.useState(null);
  const imageRef = React.useRef(null);

  const COLORS = ['#1A1A1A', '#FFFFFF', '#FF3B30', '#FF9500', '#FFCC00', '#32D74B', '#00C7BE', '#007AFF', '#AF52DE', '#FF2D92'];
  const STROKE_WIDTHS = [2, 4, 6, 8, 12];

  // Stickers/stamps for roofing industry
  const STICKERS = [
    { id: 'x-mark', label: '✕', type: 'symbol', color: '#FF3B30' },
    { id: 'check', label: '✓', type: 'symbol', color: '#34C759' },
    { id: 'question', label: '?', type: 'symbol', color: '#FFCC00' },
    { id: 'exclaim', label: '!', type: 'symbol', color: '#FF9500' },
    { id: 'leak', label: '💧', type: 'emoji' },
    { id: 'crack', label: '⚡', type: 'emoji' },
    { id: 'approve', label: 'APPROVED', type: 'stamp', color: '#34C759' },
    { id: 'reject', label: 'REJECTED', type: 'stamp', color: '#FF3B30' },
    { id: 'repair', label: 'REPAIR', type: 'stamp', color: '#FF9500' },
    { id: 'review', label: 'REVIEW', type: 'stamp', color: '#007AFF' },
  ];

  // Load image and set canvas size
  React.useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageRef.current = img; // Store reference for fisheye
      const container = containerRef.current;
      if (container) {
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const imgAspect = img.width / img.height;
        const containerAspect = containerWidth / containerHeight;
        
        let canvasWidth, canvasHeight;
        if (imgAspect > containerAspect) {
          canvasWidth = containerWidth;
          canvasHeight = containerWidth / imgAspect;
        } else {
          canvasHeight = containerHeight;
          canvasWidth = containerHeight * imgAspect;
        }
        
        setCanvasSize({ width: canvasWidth, height: canvasHeight });
        setImageLoaded(true);
      }
    };
    img.src = photo.url;
  }, [photo.url]);

  // Draw everything on canvas
  React.useEffect(() => {
    if (!imageLoaded || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Draw all annotations
      annotations.forEach(annotation => {
        drawAnnotation(ctx, annotation);
      });
      
      // Draw current path (while drawing)
      if (currentPath.length > 0 && currentTool === 'freehand') {
        ctx.beginPath();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        currentPath.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();
      }
      
      // Draw polyline points preview
      if (polylinePoints.length > 0 && (currentTool === 'polyline' || currentTool === 'polygon')) {
        ctx.beginPath();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        polylinePoints.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();
        
        // Draw vertices
        polylinePoints.forEach(point => {
          ctx.beginPath();
          ctx.fillStyle = strokeColor;
          ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
          ctx.fill();
        });
        
        // Draw line preview from last point to loupe position
        if (loupePosition && polylinePoints.length > 0) {
          const lastPoint = polylinePoints[polylinePoints.length - 1];
          ctx.beginPath();
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = strokeWidth;
          ctx.setLineDash([5, 5]);
          ctx.moveTo(lastPoint.x, lastPoint.y);
          ctx.lineTo(loupePosition.x, loupePosition.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }
      
      // Draw magnifier loupe for polyline tool
      if ((currentTool === 'polyline' || currentTool === 'polygon') && loupePosition && imageRef.current) {
        const loupeRadius = 45;
        const loupeZoom = 2.5;
        const loupeX = loupePosition.x;
        const loupeY = loupePosition.y - 80; // Position above finger
        
        const sourceRadius = loupeRadius / loupeZoom;
        const scaleX = img.width / canvas.width;
        const scaleY = img.height / canvas.height;
        
        // Draw loupe background
        ctx.save();
        ctx.beginPath();
        ctx.arc(loupeX, loupeY, loupeRadius + 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fill();
        
        // Clip to circle and draw magnified image
        ctx.beginPath();
        ctx.arc(loupeX, loupeY, loupeRadius, 0, Math.PI * 2);
        ctx.clip();
        
        ctx.drawImage(
          img,
          (loupePosition.x * scaleX) - sourceRadius * scaleX,
          (loupePosition.y * scaleY) - sourceRadius * scaleY,
          sourceRadius * 2 * scaleX,
          sourceRadius * 2 * scaleY,
          loupeX - loupeRadius,
          loupeY - loupeRadius,
          loupeRadius * 2,
          loupeRadius * 2
        );
        
        // Draw crosshair in loupe
        ctx.strokeStyle = '#E44A19';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(loupeX - 10, loupeY);
        ctx.lineTo(loupeX + 10, loupeY);
        ctx.moveTo(loupeX, loupeY - 10);
        ctx.lineTo(loupeX, loupeY + 10);
        ctx.stroke();
        
        ctx.restore();
        
        // Draw loupe border
        ctx.beginPath();
        ctx.arc(loupeX, loupeY, loupeRadius, 0, Math.PI * 2);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Draw connecting line from loupe to actual point
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.moveTo(loupeX, loupeY + loupeRadius);
        ctx.lineTo(loupePosition.x, loupePosition.y);
        ctx.stroke();
        
        // Draw small dot at actual point
        ctx.beginPath();
        ctx.fillStyle = '#E44A19';
        ctx.arc(loupePosition.x, loupePosition.y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw selection indicator for selected annotation
      if (selectedAnnotationId) {
        const selectedAnnotation = annotations.find(a => a.id === selectedAnnotationId);
        if (selectedAnnotation) {
          drawSelectionIndicator(ctx, selectedAnnotation);
        }
      }
    };
    img.src = photo.url;
  }, [imageLoaded, annotations, currentPath, strokeColor, strokeWidth, photo.url, currentTool, polylinePoints, selectedAnnotationId, loupePosition]);

  // Draw selection indicator around annotation - Professional Figma-style
  const drawSelectionIndicator = (ctx, annotation) => {
    const bounds = getSelectionBounds(annotation);
    if (!bounds) return;
    
    ctx.save();
    
    const rotation = annotation.rotation || 0;
    const centerX = bounds.x + bounds.width / 2;
    const centerY = bounds.y + bounds.height / 2;
    
    // Apply rotation transform
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);
    ctx.translate(-centerX, -centerY);
    
    // 1. Draw selection border - clean solid line (Figma style)
    ctx.strokeStyle = '#0D99FF';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([]);
    ctx.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
    
    // 2. Draw corner resize handles - small squares (Figma style)
    const handleSize = 8;
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#0D99FF';
    ctx.lineWidth = 1.5;
    
    const corners = [
      { x: bounds.x, y: bounds.y },
      { x: bounds.x + bounds.width, y: bounds.y },
      { x: bounds.x, y: bounds.y + bounds.height },
      { x: bounds.x + bounds.width, y: bounds.y + bounds.height }
    ];
    
    corners.forEach(corner => {
      ctx.fillRect(corner.x - handleSize/2, corner.y - handleSize/2, handleSize, handleSize);
      ctx.strokeRect(corner.x - handleSize/2, corner.y - handleSize/2, handleSize, handleSize);
    });
    
    // 3. Draw rotation handle - stem + circle at top center
    const stemLength = 24;
    const handleRadius = 5;
    const topCenterX = bounds.x + bounds.width / 2;
    const topCenterY = bounds.y;
    const rotateHandleY = topCenterY - stemLength;
    
    // Stem line
    ctx.beginPath();
    ctx.strokeStyle = '#0D99FF';
    ctx.lineWidth = 1.5;
    ctx.moveTo(topCenterX, topCenterY);
    ctx.lineTo(topCenterX, rotateHandleY + handleRadius);
    ctx.stroke();
    
    // Rotation handle circle
    ctx.beginPath();
    ctx.arc(topCenterX, rotateHandleY, handleRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.strokeStyle = '#0D99FF';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    ctx.restore();
  };
  
  // Get selection bounds for an annotation
  const getSelectionBounds = (annotation) => {
    const padding = 10;
    let bounds = null;
    
    switch (annotation.type) {
      case 'rectangle':
        bounds = {
          x: annotation.x - padding,
          y: annotation.y - padding,
          width: annotation.width + padding * 2,
          height: annotation.height + padding * 2
        };
        break;
      case 'ellipse':
        bounds = {
          x: annotation.cx - annotation.rx - padding,
          y: annotation.cy - annotation.ry - padding,
          width: (annotation.rx + padding) * 2,
          height: (annotation.ry + padding) * 2
        };
        break;
      case 'arrow':
      case 'measure':
        const minXa = Math.min(annotation.start.x, annotation.end.x);
        const minYa = Math.min(annotation.start.y, annotation.end.y);
        const maxXa = Math.max(annotation.start.x, annotation.end.x);
        const maxYa = Math.max(annotation.start.y, annotation.end.y);
        bounds = {
          x: minXa - padding,
          y: minYa - padding,
          width: maxXa - minXa + padding * 2,
          height: maxYa - minYa + padding * 2
        };
        break;
      case 'text':
      case 'sticker':
        bounds = {
          x: annotation.x - 40,
          y: annotation.y - 40,
          width: 80,
          height: 80
        };
        break;
      default:
        break;
    }
    return bounds;
  };
  
  // Check if point is on rotation handle
  const hitTestRotationHandle = (pos, annotation) => {
    const bounds = getSelectionBounds(annotation);
    if (!bounds) return false;
    
    const rotation = annotation.rotation || 0;
    const centerX = bounds.x + bounds.width / 2;
    const centerY = bounds.y + bounds.height / 2;
    
    // Handle is at top center, but rotated with the selection
    const stemLength = 24;
    const localHandleX = 0;
    const localHandleY = -(bounds.height / 2 + stemLength);
    
    // Rotate handle position
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    const handleX = centerX + localHandleX * cos - localHandleY * sin;
    const handleY = centerY + localHandleX * sin + localHandleY * cos;
    
    const dist = Math.sqrt(Math.pow(pos.x - handleX, 2) + Math.pow(pos.y - handleY, 2));
    return dist <= 12;
  };
  
  // Check if point is on resize handle - larger hit area for easier touch
  const hitTestResizeHandle = (pos, annotation) => {
    const bounds = getSelectionBounds(annotation);
    if (!bounds) return null;
    
    const hitArea = 24; // Larger hit area for touch
    const corners = [
      { x: bounds.x, y: bounds.y, id: 'nw' },
      { x: bounds.x + bounds.width, y: bounds.y, id: 'ne' },
      { x: bounds.x, y: bounds.y + bounds.height, id: 'sw' },
      { x: bounds.x + bounds.width, y: bounds.y + bounds.height, id: 'se' }
    ];
    
    for (const corner of corners) {
      const dist = Math.sqrt(Math.pow(pos.x - corner.x, 2) + Math.pow(pos.y - corner.y, 2));
      if (dist <= hitArea) {
        return corner.id;
      }
    }
    return null;
  };
  
  // Rotate annotation
  const rotateAnnotation = (annotationId, deltaAngle) => {
    setAnnotations(prev => prev.map(ann => {
      if (ann.id !== annotationId) return ann;
      const currentRotation = ann.rotation || 0;
      return { ...ann, rotation: currentRotation + deltaAngle };
    }));
  };
  
  // Scale annotation
  const scaleAnnotation = (annotationId, scaleFactor, handleId, deltaX, deltaY) => {
    setAnnotations(prev => prev.map(ann => {
      if (ann.id !== annotationId) return ann;
      
      switch (ann.type) {
        case 'rectangle':
          let newX = ann.x, newY = ann.y, newW = ann.width, newH = ann.height;
          if (handleId.includes('w')) { newX += deltaX; newW -= deltaX; }
          if (handleId.includes('e')) { newW += deltaX; }
          if (handleId.includes('n')) { newY += deltaY; newH -= deltaY; }
          if (handleId.includes('s')) { newH += deltaY; }
          return { ...ann, x: newX, y: newY, width: Math.max(20, newW), height: Math.max(20, newH) };
          
        case 'ellipse':
          // More responsive resize - direct delta mapping
          let newRx = ann.rx, newRy = ann.ry;
          if (handleId.includes('e')) newRx = Math.max(15, newRx + deltaX);
          if (handleId.includes('w')) newRx = Math.max(15, newRx - deltaX);
          if (handleId.includes('s')) newRy = Math.max(15, newRy + deltaY);
          if (handleId.includes('n')) newRy = Math.max(15, newRy - deltaY);
          return { ...ann, rx: newRx, ry: newRy };
          
        case 'fisheye':
          // Resize magnifier radius - direct drag distance for responsive feel
          const avgDelta = (deltaX + deltaY) / 2;
          const newRadius = Math.max(25, Math.min(200, ann.radius + avgDelta));
          return { ...ann, radius: newRadius };
          
        case 'arrow':
        case 'measure':
          // For arrows, move the endpoint being dragged
          if (handleId === 'se' || handleId === 'ne') {
            return { ...ann, end: { x: ann.end.x + deltaX, y: ann.end.y + deltaY }};
          } else if (handleId === 'nw' || handleId === 'sw') {
            return { ...ann, start: { x: ann.start.x + deltaX, y: ann.start.y + deltaY }};
          }
          return ann;
          
        default:
          return ann;
      }
    }));
  };
  
  // Duplicate annotation
  const duplicateAnnotation = () => {
    if (!selectedAnnotationId) return;
    const original = annotations.find(a => a.id === selectedAnnotationId);
    if (!original) return;
    
    pushToHistory();
    const duplicate = { ...original, id: Date.now() };
    
    // Offset the duplicate
    if (duplicate.x !== undefined) { duplicate.x += 20; duplicate.y += 20; }
    if (duplicate.cx !== undefined) { duplicate.cx += 20; duplicate.cy += 20; }
    if (duplicate.start) { 
      duplicate.start = { x: duplicate.start.x + 20, y: duplicate.start.y + 20 };
      duplicate.end = { x: duplicate.end.x + 20, y: duplicate.end.y + 20 };
    }
    if (duplicate.points) {
      duplicate.points = duplicate.points.map(p => ({ x: p.x + 20, y: p.y + 20 }));
    }
    
    setAnnotations(prev => [...prev, duplicate]);
    setSelectedAnnotationId(duplicate.id);
  };
  
  // Change color of selected annotation
  const changeSelectedColor = (newColor) => {
    if (!selectedAnnotationId) return;
    pushToHistory();
    setAnnotations(prev => prev.map(ann => 
      ann.id === selectedAnnotationId ? { ...ann, color: newColor } : ann
    ));
    setStrokeColor(newColor);
  };
  
  // Z-order functions
  const bringToFront = () => {
    if (!selectedAnnotationId) return;
    pushToHistory();
    setAnnotations(prev => {
      const selected = prev.find(a => a.id === selectedAnnotationId);
      const rest = prev.filter(a => a.id !== selectedAnnotationId);
      return [...rest, selected];
    });
  };
  
  const sendToBack = () => {
    if (!selectedAnnotationId) return;
    pushToHistory();
    setAnnotations(prev => {
      const selected = prev.find(a => a.id === selectedAnnotationId);
      const rest = prev.filter(a => a.id !== selectedAnnotationId);
      return [selected, ...rest];
    });
  };
  
  // Flip arrow direction (swap start and end)
  const flipArrowDirection = () => {
    if (!selectedAnnotationId) return;
    pushToHistory();
    setAnnotations(prev => prev.map(ann => {
      if (ann.id !== selectedAnnotationId || ann.type !== 'arrow') return ann;
      return {
        ...ann,
        start: ann.end,
        end: ann.start
      };
    }));
  };

  // Toggle fill for shapes (ellipse, rectangle)
  const toggleShapeFill = () => {
    if (!selectedAnnotationId) return;
    pushToHistory();
    setAnnotations(prev => prev.map(ann => {
      if (ann.id !== selectedAnnotationId) return ann;
      if (ann.type !== 'ellipse' && ann.type !== 'rectangle') return ann;
      return {
        ...ann,
        fill: !ann.fill
      };
    }));
  };

  // Toggle text bold
  const toggleTextBold = () => {
    if (!selectedAnnotationId) return;
    pushToHistory();
    setAnnotations(prev => prev.map(ann => {
      if (ann.id !== selectedAnnotationId || ann.type !== 'text') return ann;
      return {
        ...ann,
        bold: !ann.bold
      };
    }));
  };

  // Toggle text italic
  const toggleTextItalic = () => {
    if (!selectedAnnotationId) return;
    pushToHistory();
    setAnnotations(prev => prev.map(ann => {
      if (ann.id !== selectedAnnotationId || ann.type !== 'text') return ann;
      return {
        ...ann,
        italic: !ann.italic
      };
    }));
  };

  // Increase text size
  const increaseTextSize = () => {
    if (!selectedAnnotationId) return;
    pushToHistory();
    setAnnotations(prev => prev.map(ann => {
      if (ann.id !== selectedAnnotationId || ann.type !== 'text') return ann;
      return {
        ...ann,
        fontSize: Math.min((ann.fontSize || 24) + 4, 72)
      };
    }));
  };

  // Decrease text size
  const decreaseTextSize = () => {
    if (!selectedAnnotationId) return;
    pushToHistory();
    setAnnotations(prev => prev.map(ann => {
      if (ann.id !== selectedAnnotationId || ann.type !== 'text') return ann;
      return {
        ...ann,
        fontSize: Math.max((ann.fontSize || 24) - 4, 12)
      };
    }));
  };

  const drawAnnotation = (ctx, annotation) => {
    ctx.strokeStyle = annotation.color;
    ctx.fillStyle = annotation.color;
    ctx.lineWidth = annotation.strokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    switch (annotation.type) {
      case 'freehand':
        if (annotation.points.length > 0) {
          ctx.beginPath();
          annotation.points.forEach((point, index) => {
            if (index === 0) {
              ctx.moveTo(point.x, point.y);
            } else {
              ctx.lineTo(point.x, point.y);
            }
          });
          ctx.stroke();
        }
        break;

      case 'arrow': {
        const { start, end } = annotation;
        const arrowAngle = Math.atan2(end.y - start.y, end.x - start.x);
        const headLength = annotation.strokeWidth * 4;
        const headStyle = annotation.headStyle || 'single';
        
        // Apply rotation if any
        const centerX = (start.x + end.x) / 2;
        const centerY = (start.y + end.y) / 2;
        const rotation = annotation.rotation || 0;
        
        ctx.save();
        if (rotation !== 0) {
          ctx.translate(centerX, centerY);
          ctx.rotate(rotation);
          ctx.translate(-centerX, -centerY);
        }
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
        
        // Draw arrowhead at end (if single or double)
        if (headStyle === 'single' || headStyle === 'double') {
          ctx.beginPath();
          ctx.moveTo(end.x, end.y);
          ctx.lineTo(
            end.x - headLength * Math.cos(arrowAngle - Math.PI / 6),
            end.y - headLength * Math.sin(arrowAngle - Math.PI / 6)
          );
          ctx.lineTo(
            end.x - headLength * Math.cos(arrowAngle + Math.PI / 6),
            end.y - headLength * Math.sin(arrowAngle + Math.PI / 6)
          );
          ctx.closePath();
          ctx.fill();
        }
        
        // Draw arrowhead at start (if double)
        if (headStyle === 'double') {
          const reverseAngle = arrowAngle + Math.PI;
          ctx.beginPath();
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(
            start.x - headLength * Math.cos(reverseAngle - Math.PI / 6),
            start.y - headLength * Math.sin(reverseAngle - Math.PI / 6)
          );
          ctx.lineTo(
            start.x - headLength * Math.cos(reverseAngle + Math.PI / 6),
            start.y - headLength * Math.sin(reverseAngle + Math.PI / 6)
          );
          ctx.closePath();
          ctx.fill();
        }
        
        ctx.restore();
        break;
      }

      case 'rectangle': {
        const rectCenterX = annotation.x + annotation.width / 2;
        const rectCenterY = annotation.y + annotation.height / 2;
        const rectRotation = annotation.rotation || 0;
        const rectScale = annotation.scale || 1;
        
        ctx.save();
        ctx.translate(rectCenterX, rectCenterY);
        if (rectRotation !== 0) ctx.rotate(rectRotation);
        if (rectScale !== 1) ctx.scale(rectScale, rectScale);
        ctx.translate(-rectCenterX, -rectCenterY);
        
        ctx.strokeRect(
          annotation.x,
          annotation.y,
          annotation.width,
          annotation.height
        );
        if (annotation.fill) {
          ctx.globalAlpha = 0.3;
          ctx.fillRect(annotation.x, annotation.y, annotation.width, annotation.height);
          ctx.globalAlpha = 1;
        }
        ctx.restore();
        break;
      }

      case 'ellipse': {
        const ellipseRotation = annotation.rotation || 0;
        const ellipseScale = annotation.scale || 1;
        
        ctx.save();
        ctx.translate(annotation.cx, annotation.cy);
        if (ellipseRotation !== 0) ctx.rotate(ellipseRotation);
        if (ellipseScale !== 1) ctx.scale(ellipseScale, ellipseScale);
        ctx.translate(-annotation.cx, -annotation.cy);
        
        ctx.beginPath();
        ctx.ellipse(
          annotation.cx,
          annotation.cy,
          Math.abs(annotation.rx),
          Math.abs(annotation.ry),
          0,
          0,
          Math.PI * 2
        );
        ctx.stroke();
        if (annotation.fill) {
          ctx.globalAlpha = 0.3;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
        ctx.restore();
        break;
      }

      case 'text': {
        const fontStyle = annotation.italic ? 'italic ' : '';
        const fontWeight = annotation.bold !== false ? 'bold ' : 'normal ';
        ctx.font = `${fontStyle}${fontWeight}${annotation.fontSize || 24}px Inter, sans-serif`;
        ctx.fillStyle = annotation.color;
        
        // Draw background if present
        if (annotation.background) {
          const textMetrics = ctx.measureText(annotation.text);
          const padding = 8;
          ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
          ctx.fillRect(
            annotation.x - padding,
            annotation.y - annotation.fontSize - padding,
            textMetrics.width + padding * 2,
            annotation.fontSize + padding * 2
          );
          ctx.fillStyle = annotation.color;
        }
        
        ctx.fillText(annotation.text, annotation.x, annotation.y);
        break;
      }

      case 'polyline':
      case 'polygon':
        if (annotation.points.length > 0) {
          ctx.beginPath();
          annotation.points.forEach((point, index) => {
            if (index === 0) {
              ctx.moveTo(point.x, point.y);
            } else {
              ctx.lineTo(point.x, point.y);
            }
          });
          if (annotation.type === 'polygon' || annotation.closed) {
            ctx.closePath();
            if (annotation.fill) {
              ctx.globalAlpha = 0.3;
              ctx.fill();
              ctx.globalAlpha = 1;
            }
          }
          ctx.stroke();
        }
        break;

      case 'sticker':
        ctx.font = `bold ${annotation.size || 48}px Inter, sans-serif`;
        if (annotation.stickerType === 'stamp') {
          // Draw stamp box
          const text = annotation.label;
          const textMetrics = ctx.measureText(text);
          const padding = 10;
          const boxWidth = textMetrics.width + padding * 2;
          const boxHeight = 40;
          
          ctx.strokeStyle = annotation.color;
          ctx.lineWidth = 3;
          ctx.strokeRect(
            annotation.x - boxWidth / 2,
            annotation.y - boxHeight / 2,
            boxWidth,
            boxHeight
          );
          
          ctx.fillStyle = annotation.color;
          ctx.font = `bold 20px Inter, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(text, annotation.x, annotation.y);
          ctx.textAlign = 'left';
          ctx.textBaseline = 'alphabetic';
        } else if (annotation.stickerType === 'symbol') {
          ctx.fillStyle = annotation.color;
          ctx.font = `bold 48px Inter, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(annotation.label, annotation.x, annotation.y);
          ctx.textAlign = 'left';
          ctx.textBaseline = 'alphabetic';
        } else {
          ctx.font = '48px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(annotation.label, annotation.x, annotation.y);
          ctx.textAlign = 'left';
          ctx.textBaseline = 'alphabetic';
        }
        break;

      case 'measure': {
        // Draw measurement line with end markers and distance label
        const mStart = annotation.start;
        const mEnd = annotation.end;
        const mDistance = annotation.distance;
        
        // Draw the line
        ctx.beginPath();
        ctx.moveTo(mStart.x, mStart.y);
        ctx.lineTo(mEnd.x, mEnd.y);
        ctx.stroke();
        
        // Draw end markers (perpendicular lines)
        const mAngle = Math.atan2(mEnd.y - mStart.y, mEnd.x - mStart.x);
        const perpAngle = mAngle + Math.PI / 2;
        const markerLength = 10;
        
        // Start marker
        ctx.beginPath();
        ctx.moveTo(
          mStart.x + Math.cos(perpAngle) * markerLength,
          mStart.y + Math.sin(perpAngle) * markerLength
        );
        ctx.lineTo(
          mStart.x - Math.cos(perpAngle) * markerLength,
          mStart.y - Math.sin(perpAngle) * markerLength
        );
        ctx.stroke();
        
        // End marker
        ctx.beginPath();
        ctx.moveTo(
          mEnd.x + Math.cos(perpAngle) * markerLength,
          mEnd.y + Math.sin(perpAngle) * markerLength
        );
        ctx.lineTo(
          mEnd.x - Math.cos(perpAngle) * markerLength,
          mEnd.y - Math.sin(perpAngle) * markerLength
        );
        ctx.stroke();
        
        // Draw distance label
        const midX = (mStart.x + mEnd.x) / 2;
        const midY = (mStart.y + mEnd.y) / 2;
        const labelText = `${mDistance}px`;
        
        ctx.font = 'bold 14px Inter, sans-serif';
        const labelMetrics = ctx.measureText(labelText);
        const labelPadding = 6;
        const labelWidth = labelMetrics.width + labelPadding * 2;
        const labelHeight = 20;
        
        // Background for label
        ctx.fillStyle = annotation.color;
        ctx.beginPath();
        ctx.roundRect(
          midX - labelWidth / 2,
          midY - labelHeight / 2,
          labelWidth,
          labelHeight,
          4
        );
        ctx.fill();
        
        // Label text
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(labelText, midX, midY);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
        break;
      }

      case 'fisheye':
        // Draw fisheye/magnifier effect
        if (imageRef.current) {
          const { cx, cy, radius, zoom } = annotation;
          const img = imageRef.current;
          const canvas = canvasRef.current;
          
          // Calculate source coordinates in original image space
          const scaleX = img.width / canvas.width;
          const scaleY = img.height / canvas.height;
          
          // Source area to magnify (smaller area that will be zoomed)
          const sourceRadius = radius / zoom;
          const sourceX = cx * scaleX;
          const sourceY = cy * scaleY;
          
          // Save context state
          ctx.save();
          
          // Create circular clipping path
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.clip();
          
          // Draw magnified portion of image
          ctx.drawImage(
            img,
            sourceX - sourceRadius * scaleX,
            sourceY - sourceRadius * scaleY,
            sourceRadius * 2 * scaleX,
            sourceRadius * 2 * scaleY,
            cx - radius,
            cy - radius,
            radius * 2,
            radius * 2
          );
          
          // Restore context
          ctx.restore();
          
          // Draw border circle
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.strokeStyle = annotation.borderColor || '#E44A19';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
        break;

      default:
        break;
    }
  };

  const getPointerPosition = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  // Get the center point of an annotation for hit testing
  const getAnnotationCenter = (annotation) => {
    switch (annotation.type) {
      case 'rectangle':
        return { x: annotation.x + annotation.width / 2, y: annotation.y + annotation.height / 2 };
      case 'ellipse':
        return { x: annotation.cx, y: annotation.cy };
      case 'arrow':
      case 'measure':
        return { x: (annotation.start.x + annotation.end.x) / 2, y: (annotation.start.y + annotation.end.y) / 2 };
      case 'text':
      case 'sticker':
        return { x: annotation.x, y: annotation.y };
      case 'fisheye':
        return { x: annotation.cx, y: annotation.cy };
      case 'freehand':
      case 'polyline':
      case 'polygon':
        if (annotation.points && annotation.points.length > 0) {
          const sumX = annotation.points.reduce((acc, p) => acc + p.x, 0);
          const sumY = annotation.points.reduce((acc, p) => acc + p.y, 0);
          return { x: sumX / annotation.points.length, y: sumY / annotation.points.length };
        }
        return { x: 0, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  // Hit test to find annotation at point
  const hitTestAnnotation = (pos) => {
    const hitRadius = 25; // Tolerance for hit testing
    
    // Test in reverse order (top to bottom in z-order)
    for (let i = annotations.length - 1; i >= 0; i--) {
      const annotation = annotations[i];
      
      switch (annotation.type) {
        case 'rectangle': {
          if (pos.x >= annotation.x - hitRadius && 
              pos.x <= annotation.x + annotation.width + hitRadius &&
              pos.y >= annotation.y - hitRadius && 
              pos.y <= annotation.y + annotation.height + hitRadius) {
            return annotation;
          }
          break;
        }
        case 'ellipse': {
          const dx = pos.x - annotation.cx;
          const dy = pos.y - annotation.cy;
          const normalizedDist = (dx * dx) / ((annotation.rx + hitRadius) * (annotation.rx + hitRadius)) +
                                 (dy * dy) / ((annotation.ry + hitRadius) * (annotation.ry + hitRadius));
          if (normalizedDist <= 1) return annotation;
          break;
        }
        case 'arrow':
        case 'measure': {
          // Test distance to line segment
          const { start, end } = annotation;
          const lineLen = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
          if (lineLen === 0) break;
          const t = Math.max(0, Math.min(1, ((pos.x - start.x) * (end.x - start.x) + (pos.y - start.y) * (end.y - start.y)) / (lineLen * lineLen)));
          const projX = start.x + t * (end.x - start.x);
          const projY = start.y + t * (end.y - start.y);
          const dist = Math.sqrt(Math.pow(pos.x - projX, 2) + Math.pow(pos.y - projY, 2));
          if (dist <= hitRadius) return annotation;
          break;
        }
        case 'text':
        case 'sticker': {
          const dist = Math.sqrt(Math.pow(pos.x - annotation.x, 2) + Math.pow(pos.y - annotation.y, 2));
          if (dist <= hitRadius + 30) return annotation;
          break;
        }
        case 'fisheye': {
          const dist = Math.sqrt(Math.pow(pos.x - annotation.cx, 2) + Math.pow(pos.y - annotation.cy, 2));
          if (dist <= annotation.radius + hitRadius) return annotation;
          break;
        }
        case 'freehand':
        case 'polyline':
        case 'polygon': {
          // Test distance to any point in the path
          if (annotation.points) {
            for (const point of annotation.points) {
              const dist = Math.sqrt(Math.pow(pos.x - point.x, 2) + Math.pow(pos.y - point.y, 2));
              if (dist <= hitRadius) return annotation;
            }
          }
          break;
        }
        default:
          break;
      }
    }
    return null;
  };

  // Move annotation by delta
  const moveAnnotation = (annotationId, deltaX, deltaY) => {
    setAnnotations(prev => prev.map(ann => {
      if (ann.id !== annotationId) return ann;
      
      switch (ann.type) {
        case 'rectangle':
          return { ...ann, x: ann.x + deltaX, y: ann.y + deltaY };
        case 'ellipse':
          return { ...ann, cx: ann.cx + deltaX, cy: ann.cy + deltaY };
        case 'arrow':
        case 'measure':
          return {
            ...ann,
            start: { x: ann.start.x + deltaX, y: ann.start.y + deltaY },
            end: { x: ann.end.x + deltaX, y: ann.end.y + deltaY }
          };
        case 'text':
        case 'sticker':
          return { ...ann, x: ann.x + deltaX, y: ann.y + deltaY };
        case 'fisheye':
          return { ...ann, cx: ann.cx + deltaX, cy: ann.cy + deltaY };
        case 'freehand':
        case 'polyline':
        case 'polygon':
          return {
            ...ann,
            points: ann.points.map(p => ({ x: p.x + deltaX, y: p.y + deltaY }))
          };
        default:
          return ann;
      }
    }));
  };

  // Delete selected annotation
  const deleteSelectedAnnotation = () => {
    if (selectedAnnotationId) {
      pushToHistory();
      setAnnotations(prev => prev.filter(ann => ann.id !== selectedAnnotationId));
      setSelectedAnnotationId(null);
    }
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    const pos = getPointerPosition(e);
    
    // If an annotation is already selected, check for handle interactions first
    if (selectedAnnotationId) {
      const selectedAnn = annotations.find(a => a.id === selectedAnnotationId);
      if (selectedAnn) {
        // Check rotation handle
        if (hitTestRotationHandle(pos, selectedAnn)) {
          setIsRotating(true);
          const bounds = getSelectionBounds(selectedAnn);
          const centerX = bounds.x + bounds.width / 2;
          const centerY = bounds.y + bounds.height / 2;
          const startAngle = Math.atan2(pos.y - centerY, pos.x - centerX);
          setRotateStartAngle(startAngle);
          setDragOffset({ x: pos.x, y: pos.y });
          return;
        }
        
        // Check resize handles
        const handle = hitTestResizeHandle(pos, selectedAnn);
        if (handle) {
          setIsResizing(true);
          setResizeHandle(handle);
          setDragOffset({ x: pos.x, y: pos.y });
          return;
        }
      }
    }
    
    // Always check if clicking on an existing annotation first (for selection/moving)
    const hitAnnotation = hitTestAnnotation(pos);
    if (hitAnnotation) {
      // Check for double-tap to edit text
      const now = Date.now();
      if (now - lastTapTime < 300 && hitAnnotation.type === 'text' && hitAnnotation.id === selectedAnnotationId) {
        // Double-tap on text - enable editing
        setEditingTextId(hitAnnotation.id);
        setTextInput(hitAnnotation.text);
        setTextPosition({ x: hitAnnotation.x, y: hitAnnotation.y });
        setShowTextInput(true);
        setLastTapTime(0);
        return;
      }
      setLastTapTime(now);
      
      // Select and prepare to drag
      setSelectedAnnotationId(hitAnnotation.id);
      setShowSelectionMenu(false);
      setIsDragging(true);
      setDragOffset({ x: pos.x, y: pos.y });
      return;
    }
    
    // Clicked on empty space - deselect any selected annotation
    setSelectedAnnotationId(null);
    setShowSelectionMenu(false);
    
    // If no tool is selected, just deselect
    if (!currentTool) {
      return;
    }
    
    if (currentTool === 'text') {
      setTextPosition(pos);
      setShowTextInput(true);
      return;
    }
    
    if (currentTool === 'polyline' || currentTool === 'polygon') {
      // Check if clicking near the first point to close
      if (polylinePoints.length >= 2) {
        const firstPoint = polylinePoints[0];
        const distance = Math.sqrt(
          Math.pow(pos.x - firstPoint.x, 2) + Math.pow(pos.y - firstPoint.y, 2)
        );
        if (distance < 20) {
          // Close the shape
          const annotation = {
            id: Date.now(),
            type: currentTool === 'polygon' ? 'polygon' : 'polyline',
            points: [...polylinePoints],
            closed: currentTool === 'polygon',
            color: strokeColor,
            strokeWidth: strokeWidth,
            fill: currentTool === 'polygon'
          };
          pushToHistory();
          setAnnotations(prev => [...prev, annotation]);
          setPolylinePoints([]);
          setLoupePosition(null);
          setCurrentTool(null); // Deselect tool after action
          return;
        }
      }
      setPolylinePoints(prev => [...prev, pos]);
      return;
    }
    
    if (currentTool === 'sticker') {
      if (selectedSticker) {
        // Place the selected sticker at tap position
        pushToHistory();
        const annotation = {
          id: Date.now(),
          type: 'sticker',
          label: selectedSticker.label,
          stickerType: selectedSticker.type,
          x: pos.x,
          y: pos.y,
          color: selectedSticker.color || strokeColor,
          size: 48
        };
        setAnnotations(prev => [...prev, annotation]);
        setSelectedSticker(null);
        setCurrentTool(null);
      } else {
        // No sticker selected, open picker
        setShowStickerPicker(true);
      }
      return;
    }
    
    if (currentTool === 'fisheye') {
      // Directly place magnifier with default settings
      pushToHistory();
      const annotation = {
        id: Date.now(),
        type: 'fisheye',
        cx: pos.x,
        cy: pos.y,
        radius: 50,
        zoom: 2,
        borderColor: strokeColor
      };
      setAnnotations(prev => [...prev, annotation]);
      setSelectedAnnotationId(annotation.id); // Select it for immediate resizing
      setCurrentTool(null);
      return;
    }

    setIsDrawing(true);
    setStartPoint(pos);
    
    if (currentTool === 'freehand') {
      setCurrentPath([pos]);
    }
  };

  const handlePointerMove = (e) => {
    e.preventDefault();
    const pos = getPointerPosition(e);
    
    // Track loupe position for polyline tool
    if (currentTool === 'polyline' || currentTool === 'polygon') {
      setLoupePosition(pos);
    }
    
    // Handle rotation - smooth cursor following
    if (isRotating && selectedAnnotationId) {
      setCanvasCursor('grabbing');
      const selectedAnn = annotations.find(a => a.id === selectedAnnotationId);
      if (selectedAnn) {
        const bounds = getSelectionBounds(selectedAnn);
        const centerX = bounds.x + bounds.width / 2;
        const centerY = bounds.y + bounds.height / 2;
        const currentAngle = Math.atan2(pos.y - centerY, pos.x - centerX);
        const deltaAngle = currentAngle - rotateStartAngle;
        rotateAnnotation(selectedAnnotationId, deltaAngle);
        setRotateStartAngle(currentAngle);
      }
      return;
    }
    
    // Handle resize
    if (isResizing && selectedAnnotationId && resizeHandle) {
      const deltaX = pos.x - dragOffset.x;
      const deltaY = pos.y - dragOffset.y;
      scaleAnnotation(selectedAnnotationId, 1, resizeHandle, deltaX, deltaY);
      setDragOffset({ x: pos.x, y: pos.y });
      return;
    }
    
    // Handle dragging selected annotation (works with any tool)
    if (isDragging && selectedAnnotationId) {
      setCanvasCursor('move');
      const deltaX = pos.x - dragOffset.x;
      const deltaY = pos.y - dragOffset.y;
      moveAnnotation(selectedAnnotationId, deltaX, deltaY);
      setDragOffset({ x: pos.x, y: pos.y });
      return;
    }
    
    // Update cursor based on what's being hovered (when not dragging/rotating)
    if (selectedAnnotationId && !isDrawing) {
      const selectedAnn = annotations.find(a => a.id === selectedAnnotationId);
      if (selectedAnn) {
        if (hitTestRotationHandle(pos, selectedAnn)) {
          setCanvasCursor('grab');
          return;
        }
        const handle = hitTestResizeHandle(pos, selectedAnn);
        if (handle) {
          // Set cursor based on resize handle position
          const cursors = {
            'nw': 'nwse-resize',
            'se': 'nwse-resize',
            'ne': 'nesw-resize',
            'sw': 'nesw-resize'
          };
          setCanvasCursor(cursors[handle] || 'pointer');
          return;
        }
        if (hitTestAnnotation(pos)?.id === selectedAnnotationId) {
          setCanvasCursor('move');
          return;
        }
      }
    }
    
    // Default cursor based on tool
    if (currentTool === 'select') {
      setCanvasCursor('default');
    } else {
      setCanvasCursor('crosshair');
    }
    
    if (!isDrawing) return;
    
    if (currentTool === 'freehand') {
      setCurrentPath(prev => [...prev, pos]);
    }
  };

  const handlePointerUp = (e) => {
    // Handle end of rotation
    if (isRotating) {
      if (selectedAnnotationId) {
        pushToHistory();
      }
      setIsRotating(false);
      return;
    }
    
    // Handle end of resize
    if (isResizing) {
      if (selectedAnnotationId) {
        pushToHistory();
      }
      setIsResizing(false);
      setResizeHandle(null);
      return;
    }
    
    // Handle end of dragging
    if (isDragging) {
      if (selectedAnnotationId) {
        pushToHistory();
      }
      setIsDragging(false);
      return;
    }
    
    if (!isDrawing) return;
    e.preventDefault();
    const pos = getPointerPosition(e);
    
    pushToHistory();
    
    let annotation = null;
    
    switch (currentTool) {
      case 'freehand':
        if (currentPath.length > 1) {
          annotation = {
            id: Date.now(),
            type: 'freehand',
            points: [...currentPath],
            color: strokeColor,
            strokeWidth: strokeWidth
          };
        }
        setCurrentPath([]);
        break;
        
      case 'arrow':
        if (startPoint) {
          annotation = {
            id: Date.now(),
            type: 'arrow',
            start: startPoint,
            end: pos,
            color: strokeColor,
            strokeWidth: strokeWidth,
            headStyle: arrowHeadStyle, // 'none', 'single', 'double'
            rotation: 0
          };
        }
        break;
        
      case 'rectangle':
        if (startPoint) {
          annotation = {
            id: Date.now(),
            type: 'rectangle',
            x: Math.min(startPoint.x, pos.x),
            y: Math.min(startPoint.y, pos.y),
            width: Math.abs(pos.x - startPoint.x),
            height: Math.abs(pos.y - startPoint.y),
            color: strokeColor,
            strokeWidth: strokeWidth,
            fill: fillEnabled,
            rotation: 0,
            scale: 1
          };
        }
        break;
        
      case 'ellipse':
        if (startPoint) {
          annotation = {
            id: Date.now(),
            type: 'ellipse',
            cx: (startPoint.x + pos.x) / 2,
            cy: (startPoint.y + pos.y) / 2,
            rx: Math.abs(pos.x - startPoint.x) / 2,
            ry: Math.abs(pos.y - startPoint.y) / 2,
            color: strokeColor,
            strokeWidth: strokeWidth,
            fill: fillEnabled,
            rotation: 0,
            scale: 1
          };
        }
        break;
      
      case 'measure':
        if (startPoint) {
          const distance = Math.sqrt(
            Math.pow(pos.x - startPoint.x, 2) + Math.pow(pos.y - startPoint.y, 2)
          );
          annotation = {
            id: Date.now(),
            type: 'measure',
            start: startPoint,
            end: pos,
            distance: Math.round(distance),
            color: strokeColor,
            strokeWidth: strokeWidth
          };
        }
        break;
        
      default:
        break;
    }
    
    if (annotation) {
      setAnnotations(prev => [...prev, annotation]);
      setCurrentTool(null); // Deselect tool after action
    }
    
    setIsDrawing(false);
    setStartPoint(null);
  };

  const handleTextSubmit = () => {
    if (textInput.trim() && textPosition) {
      pushToHistory();
      
      if (editingTextId) {
        // Editing existing text
        setAnnotations(prev => prev.map(ann => 
          ann.id === editingTextId ? { ...ann, text: textInput } : ann
        ));
        setEditingTextId(null);
      } else {
        // Creating new text
        const annotation = {
          id: Date.now(),
          type: 'text',
          text: textInput,
          x: textPosition.x,
          y: textPosition.y,
          color: strokeColor,
          fontSize: 24,
          background: true,
          rotation: 0
        };
        setAnnotations(prev => [...prev, annotation]);
        setCurrentTool(null); // Deselect tool after action
      }
    }
    setTextInput('');
    setShowTextInput(false);
    setTextPosition(null);
    setEditingTextId(null);
  };

  const handleStickerSelect = (sticker) => {
    // Store selected sticker and close picker - user will tap to place
    setSelectedSticker(sticker);
    setShowStickerPicker(false);
    setCurrentTool('sticker');
  };

  // Handle Text Template selection
  const handleTextTemplate = (template) => {
    if (textPosition) {
      pushToHistory();
      const annotation = {
        id: Date.now(),
        type: 'text',
        text: template.text,
        x: textPosition.x,
        y: textPosition.y,
        color: template.color,
        fontSize: 20,
        background: true,
        isTemplate: true
      };
      setAnnotations(prev => [...prev, annotation]);
      setCurrentTool(null);
    }
    setShowTextInput(false);
    setTextPosition(null);
  };

  const pushToHistory = () => {
    setUndoStack(prev => [...prev, [...annotations]]);
    setRedoStack([]);
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const previousState = undoStack[undoStack.length - 1];
    setRedoStack(prev => [...prev, [...annotations]]);
    setAnnotations(previousState);
    setUndoStack(prev => prev.slice(0, -1));
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const nextState = redoStack[redoStack.length - 1];
    setUndoStack(prev => [...prev, [...annotations]]);
    setAnnotations(nextState);
    setRedoStack(prev => prev.slice(0, -1));
  };

  const handleClearAll = () => {
    if (annotations.length > 0) {
      pushToHistory();
      setAnnotations([]);
    }
    setPolylinePoints([]);
    setLoupePosition(null);
  };

  const handleSave = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Get data URL
    const dataUrl = canvas.toDataURL('image/png');
    
    // Call onSave callback with the image data
    if (onSave) {
      onSave({
        originalPhoto: photo,
        annotatedImage: dataUrl,
        annotations: annotations
      });
    }
  };

  const handleSaveAsCopy = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Create download link
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `annotated_${photo?.name || 'photo'}_${Date.now()}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    onClose();
  };

  // Primary tools shown in bottom toolbar
  const primaryTools = [
    { id: 'freehand', icon: <Icons.Draw />, label: 'Draw' },
    { id: 'arrow', icon: <Icons.Arrow />, label: 'Arrow' },
    { id: 'text', icon: <Icons.TextTool />, label: 'Text' },
    { id: 'ellipse', icon: <Icons.Circle />, label: 'Circle' },
  ];
  
  // Secondary tools shown in the "more" menu
  const moreTools = [
    { id: 'rectangle', icon: <Icons.Rectangle />, label: 'Rectangle' },
    { id: 'polyline', icon: <Icons.Polyline />, label: 'Polyline' },
    { id: 'sticker', icon: <Icons.Sticker />, label: 'Sticker' },
    { id: 'fisheye', icon: <Icons.Magnifier />, label: 'Magnify' },
  ];
  
  // Combined for reference
  const allTools = [...primaryTools, ...moreTools];

  return (
    <div className="photo-editor">
      {/* Header - Simple: X on left, Save on right */}
      <div className="editor-header">
        <button className="editor-btn close-btn" onClick={onClose}>
          <Icons.Close />
        </button>
        <button 
          className="editor-save-btn" 
          onClick={handleSave}
        >
          Save
        </button>
      </div>

      {/* Main Editor Area - Canvas */}
      <div className="editor-main">
        {/* Canvas Area */}
        <div className="editor-canvas-container" ref={containerRef}>
          {imageLoaded && (
            <canvas
              ref={canvasRef}
              width={canvasSize.width}
              height={canvasSize.height}
              className="editor-canvas"
              style={{ cursor: canvasCursor }}
              onMouseDown={handlePointerDown}
              onMouseMove={handlePointerMove}
              onMouseUp={handlePointerUp}
              onMouseLeave={handlePointerUp}
              onTouchStart={handlePointerDown}
              onTouchMove={handlePointerMove}
              onTouchEnd={handlePointerUp}
            />
          )}
          
          
          {/* Selection controls - show when annotation is selected */}
          {selectedAnnotationId && (() => {
            const selectedAnn = annotations.find(a => a.id === selectedAnnotationId);
            if (!selectedAnn) return null;
            
            return (
              <div className="selection-controls">
                {/* Arrow-specific: Flip direction */}
                {selectedAnn.type === 'arrow' && (
                  <button 
                    className="selection-action-btn"
                    onClick={flipArrowDirection}
                    title="Flip direction"
                  >
                    <Icons.FlipArrow />
                  </button>
                )}
                
                {/* Shape-specific: Fill toggle */}
                {(selectedAnn.type === 'ellipse' || selectedAnn.type === 'rectangle') && (
                  <button 
                    className={`selection-action-btn ${selectedAnn.fill ? 'active' : ''}`}
                    onClick={toggleShapeFill}
                    title={selectedAnn.fill ? 'Remove fill' : 'Add fill'}
                  >
                    {selectedAnn.fill ? <Icons.FillShape /> : <Icons.OutlineShape />}
                  </button>
                )}
                
                {/* Text-specific: Bold, Italic, Size */}
                {selectedAnn.type === 'text' && (
                  <>
                    <button 
                      className={`selection-action-btn ${selectedAnn.bold !== false ? 'active' : ''}`}
                      onClick={toggleTextBold}
                      title="Bold"
                    >
                      <Icons.Bold />
                    </button>
                    <button 
                      className={`selection-action-btn ${selectedAnn.italic ? 'active' : ''}`}
                      onClick={toggleTextItalic}
                      title="Italic"
                    >
                      <Icons.Italic />
                    </button>
                    <button 
                      className="selection-action-btn"
                      onClick={decreaseTextSize}
                      title="Smaller text"
                    >
                      <span style={{ fontSize: '14px', fontWeight: 'bold' }}>A-</span>
                    </button>
                    <button 
                      className="selection-action-btn"
                      onClick={increaseTextSize}
                      title="Larger text"
                    >
                      <span style={{ fontSize: '18px', fontWeight: 'bold' }}>A+</span>
                    </button>
                  </>
                )}
                
                <button 
                  className="selection-delete-btn"
                  onClick={deleteSelectedAnnotation}
                  title="Delete"
                >
                  <Icons.Trash />
                </button>
              </div>
            );
          })()}
          
          {/* Polyline instruction */}
          {(currentTool === 'polyline' || currentTool === 'polygon') && polylinePoints.length > 0 && (
            <div className="editor-instruction">
              Tap to add points. Tap near start to close.
            </div>
          )}
        </div>
      </div>

      {/* Bottom Toolbar - Two rows */}
      <div className="editor-toolbar">
        {/* Color Row - Shows when color picker is active */}
        {showColorPicker && (
          <div className="toolbar-colors-row">
            {COLORS.map(color => (
              <button
                key={color}
                className={`toolbar-color ${strokeColor === color ? 'active' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => {
                  setStrokeColor(color);
                  if (selectedAnnotationId) changeSelectedColor(color);
                }}
              />
            ))}
          </div>
        )}
        
        {/* Tools Row - Always visible */}
        <div className="toolbar-tools-row">
          {/* Color Picker Button */}
          <button 
            className={`color-picker-btn ${showColorPicker ? 'active' : ''}`}
            style={{ backgroundColor: strokeColor }}
            onClick={() => setShowColorPicker(!showColorPicker)}
          />
          
          {/* Primary Tools */}
          {primaryTools.map(tool => (
            <button
              key={tool.id}
              className={`tool-btn ${currentTool === tool.id ? 'active' : ''}`}
              onClick={() => {
                setCurrentTool(currentTool === tool.id ? null : tool.id);
                setShowMoreTools(false);
              }}
              title={tool.label}
            >
              {tool.icon}
            </button>
          ))}
          
          {/* More Tools Button */}
          <div className="more-tools-section">
            <button 
              className={`tool-btn more-tools-trigger ${showMoreTools ? 'active' : ''}`}
              onClick={() => setShowMoreTools(!showMoreTools)}
            >
              <Icons.Plus />
            </button>
            {showMoreTools && (
              <div className="more-tools-popover">
                {moreTools.map(tool => (
                  <button
                    key={tool.id}
                    className={`more-tool-item ${currentTool === tool.id ? 'active' : ''}`}
                    onClick={() => {
                      if (tool.id === 'sticker') {
                        setShowStickerPicker(true);
                      } else {
                        setCurrentTool(currentTool === tool.id ? null : tool.id);
                      }
                      setShowMoreTools(false);
                    }}
                  >
                    <span className="more-tool-icon">{tool.icon}</span>
                    <span className="more-tool-label">{tool.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Text Input Modal */}
      {showTextInput && (
        <div className="text-input-modal" onClick={() => { setShowTextInput(false); setEditingTextId(null); }}>
          <div className="text-input-content" onClick={e => e.stopPropagation()}>
            <div className="text-modal-header">
              <span>{editingTextId ? 'Edit Text' : 'Add Text'}</span>
            </div>
            
            <input
              type="text"
              value={textInput}
              onChange={e => setTextInput(e.target.value)}
              placeholder="Enter text (e.g., 12' 6&quot;)"
              autoFocus
              onKeyPress={e => e.key === 'Enter' && handleTextSubmit()}
            />
            
            {/* Quick measurement buttons for roofing */}
            <div className="measurement-quick-btns">
              <span className="quick-label">Quick add:</span>
              <button 
                type="button"
                className="measure-btn"
                onClick={() => setTextInput(prev => prev + "'")}
              >
                ft (')
              </button>
              <button 
                type="button"
                className="measure-btn"
                onClick={() => setTextInput(prev => prev + '"')}
              >
                in (")
              </button>
              <button 
                type="button"
                className="measure-btn"
                onClick={() => setTextInput(prev => prev + ' x ')}
              >
                x
              </button>
              <button 
                type="button"
                className="measure-btn"
                onClick={() => setTextInput(prev => prev + ' sq ft')}
              >
                sq ft
              </button>
            </div>
            <div className="text-input-actions">
              <button onClick={() => { setShowTextInput(false); setEditingTextId(null); }}>Cancel</button>
              <button className="primary" onClick={handleTextSubmit}>
                {editingTextId ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticker Picker Modal */}
      {showStickerPicker && (
        <div className="sticker-picker-modal" onClick={() => setShowStickerPicker(false)}>
          <div className="sticker-picker-content" onClick={e => e.stopPropagation()}>
            <div className="sticker-picker-header">
              <span>Select Sticker</span>
              <button onClick={() => setShowStickerPicker(false)}>
                <Icons.Close />
              </button>
            </div>
            <div className="sticker-grid">
              {STICKERS.map(sticker => (
                <button
                  key={sticker.id}
                  className="sticker-option"
                  onClick={() => handleStickerSelect(sticker)}
                  style={{ color: sticker.color }}
                >
                  {sticker.type === 'stamp' ? (
                    <span className="stamp-preview" style={{ borderColor: sticker.color, color: sticker.color }}>
                      {sticker.label}
                    </span>
                  ) : (
                    <span className="sticker-preview">{sticker.label}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

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
      <div style={{ width: '40px' }} />
    </div>
    <div className="feed-tabs view-tabs three-tabs">
      <button className="tab-btn active"><Icons.Grid /> Photos</button>
      <button className="tab-btn"><Icons.Briefcase /> Jobs</button>
      <button className="tab-btn"><Icons.MapPin /> Map</button>
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
  const [favoritedPhotos, setFavoritedPhotos] = useState(new Set([0, 3, 7])); // App-level favorites
  const [showEditor, setShowEditor] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);

  // Handle opening the photo editor
  const handleEditPhoto = (photo) => {
    setEditingPhoto(photo);
    setShowEditor(true);
  };

  // Handle saving annotated photo
  const handleSaveAnnotatedPhoto = (data) => {
    console.log('Saving annotated photo:', data);
    // In a real app, you would upload the annotated image here
    // For now, we'll just close the editor
    setShowEditor(false);
    setEditingPhoto(null);
  };

  // Toggle favorite for a photo
  const handleToggleFavorite = (photoIndex) => {
    setFavoritedPhotos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(photoIndex)) {
        newSet.delete(photoIndex);
      } else {
        newSet.add(photoIndex);
      }
      return newSet;
    });
  };

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
    { id: 'feed', label: 'Photo Feed' },
    { id: 'job-view', label: 'Job View' },
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
              favoritedPhotos={favoritedPhotos}
              onToggleFavorite={handleToggleFavorite}
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
                favoritedPhotos={favoritedPhotos}
                onToggleFavorite={handleToggleFavorite}
                onEditPhoto={handleEditPhoto}
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
              favoritedPhotos={favoritedPhotos}
              onToggleFavorite={handleToggleFavorite}
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
                favoritedPhotos={favoritedPhotos}
                onToggleFavorite={handleToggleFavorite}
                onEditPhoto={handleEditPhoto}
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
      case 'viewer':
        return (
          <>
            <MediaViewer 
              photos={samplePhotos}
              currentIndex={0}
              onClose={() => setCurrentScreen('feed')}
              onNavigate={() => {}}
              onShowDetails={() => setShowDetails(!showDetails)}
              favoritedPhotos={favoritedPhotos}
              onToggleFavorite={handleToggleFavorite}
              onEditPhoto={handleEditPhoto}
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
            favoritedPhotos={favoritedPhotos}
            onToggleFavorite={handleToggleFavorite}
            onEditPhoto={handleEditPhoto}
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
              favoritedPhotos={favoritedPhotos}
              onToggleFavorite={handleToggleFavorite}
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
              <div style={{ width: '40px' }} />
            </div>
            <div className="feed-tabs view-tabs three-tabs">
              <button className="tab-btn active"><Icons.Grid /> Photos</button>
              <button className="tab-btn"><Icons.Briefcase /> Jobs</button>
              <button className="tab-btn"><Icons.MapPin /> Map</button>
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
              <div style={{ width: '40px' }} />
            </div>
            <div className="feed-tabs view-tabs three-tabs">
              <button className="tab-btn active"><Icons.Grid /> Photos</button>
              <button className="tab-btn"><Icons.Briefcase /> Jobs</button>
              <button className="tab-btn"><Icons.MapPin /> Map</button>
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
        
        {/* Photo Editor - renders inside phone frame */}
        {showEditor && editingPhoto && (
          <PhotoEditor 
            photo={editingPhoto}
            onClose={() => {
              setShowEditor(false);
              setEditingPhoto(null);
            }}
            onSave={handleSaveAnnotatedPhoto}
          />
        )}
      </PhoneFrame>
    </div>
  );
}

export default App;

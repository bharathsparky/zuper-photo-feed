# iOS Human Interface Guidelines — CSS Reskin

This directory contains a complete CSS reskin of the Zuper Photo Feed app following **Apple Human Interface Guidelines (HIG)**. Same React logic (`App.js`), entirely different visual presentation.

## How to Switch

### To use iOS styling:

In `src/index.js`, change the CSS import:

```js
// Replace:
import './index.css';
// With:
import './ios/index.css';
```

In `src/App.js`, change the CSS import:

```js
// Replace:
import './App.css';
// With:
import './ios/App.css';
```

### To revert to Android/Material styling:

Switch the imports back to `'./index.css'` and `'./App.css'`.

## What Changed (HIG Component Mapping)

| UI Pattern | Android/Material | iOS (HIG) |
|---|---|---|
| **Font** | Inter | SF Pro (`-apple-system`) |
| **Accent Color** | Orange `#E44A19` | System Blue `#007AFF` |
| **Tabs** | Underlined text tabs with orange indicator | `UISegmentedControl` (rounded pill, white selected segment with shadow) |
| **Navigation Bar** | Custom header with border-bottom | `UINavigationBar` (44pt, centered semibold title, 0.5px separator) |
| **Filter Pills** | Bordered chips with chevron dropdown | Menu buttons with `quaternarySystemFill` background |
| **Search Bar** | Custom styled input with border | `UISearchBar` (`tertiarySystemFill`, 36pt height, 10pt radius) |
| **Photo Grid** | 6px gaps, 4px rounded thumbnails | 1-2px gaps, no rounding (edge-to-edge like Photos.app) |
| **Date Headers** | Floating pill with grey border | Plain uppercase text (`secondaryLabel`, like `UITableView` section headers) |
| **Job Cards** | Bordered cards with shadow | Grouped Inset List cells (`10pt` radius, no shadow, `0.5px` separators) |
| **Bottom Sheets** | Custom sheet with handle | iOS `.sheet` (5x36pt grabber, `systemFill` color, `14pt` top radius) |
| **Options Menu** | Custom popup overlay | iOS Action Sheet (bottom-anchored, grouped buttons, blur background) |
| **Alerts/Modals** | Custom modal | iOS `UIAlertController` (270px, blur background, button dividers) |
| **Empty States** | Custom layout with icon | Centered large SF Symbol + title/subtitle |
| **Toast** | Custom notification | iOS notification banner (blur background, rounded, spring animation) |
| **Toggle** | Custom switch | `UISwitch` (51x31pt, green active, white thumb) |
| **Selection** | Checkbox squares | Circular checkmarks (blue fill, white check) |
| **Backgrounds** | White/light gray | `systemGroupedBackground` (`#F2F2F7`) with `secondarySystemGroupedBackground` cells |

## iOS Design Tokens

All iOS system values are defined as CSS custom properties in `index.css`:

- **System Colors**: `--ios-blue`, `--ios-red`, `--ios-green`, `--ios-orange`, etc.
- **Label Colors**: `--ios-label`, `--ios-secondary-label`, `--ios-tertiary-label`
- **Backgrounds**: `--ios-system-background`, `--ios-system-grouped-background`
- **Fills**: `--ios-system-fill` through `--ios-quaternary-system-fill`
- **Gray Scale**: `--ios-system-gray` through `--ios-system-gray6`
- **Typography**: `--ios-large-title` (34px) through `--ios-caption2` (11px)
- **Spacing**: 4pt grid from `--ios-space-2` to `--ios-space-32`
- **Corner Radius**: `--ios-radius-sm` (6px) to `--ios-radius-xl` (20px)
- **Animation**: `--ios-spring`, `--ios-ease`, `--ios-duration-fast/normal/slow`

## Key iOS HIG Principles Applied

1. **Clarity** — Content is the focus. UI chrome is minimal.
2. **Deference** — Fluid motion, translucent materials, borderless buttons.
3. **Depth** — Layered interfaces with blur, shadow for elevation.
4. **44pt minimum touch targets** — All interactive elements meet the minimum.
5. **SF Pro typography** — System font with proper weight/size scale.
6. **0.5px separators** — Hairline dividers matching Retina precision.
7. **System colors** — Semantic colors that adapt to context.
8. **No custom shapes** — iOS continuous corner radius (squircle) throughout.

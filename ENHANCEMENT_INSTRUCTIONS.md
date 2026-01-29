# Zuper Photo Annotation Editor - UX Improvement Guidelines v2

## Executive Summary

Looking at your current UI screenshot, I see a functional editor that follows generic design patterns. However, **roofing contractors are not graphic designers** - they need speed, clarity, and tools that match their specific workflow. This document provides comprehensive improvements to transform this into a competitive advantage.

---

## Current UI Analysis (From Screenshot)

### What I See:
```
┌────────────────────────────────────────────┐
│ [X]        [?][?]              [Save]      │  ← Header
├────────────────────────────────────────────┤
│            "Freehand"                      │  ← Mode label
├────────────────────────────────────────────┤
│                                            │
│           [Roof Image]                     │
│                                            │
│        ┌──────────────────┐               │
│        │ □ Rectangle      │               │  ← Blocking popup!
│        │ ⌇ Polyline       │               │
│        │ ⌇ Polygon        │               │
│        │ ☺ Sticker        │               │
│        │ ⊕ Magnifier      │               │
│        │ 🗑 Clear All      │               │
│        └──────────────────┘               │
│                                            │
├────────────────────────────────────────────┤
│ [●][◇][→][○][T][+][—]                     │  ← Toolbar
└────────────────────────────────────────────┘
```

### Critical Problems Identified:

| Problem | Impact | Severity |
|---------|--------|----------|
| **Popup blocks the image** | Can't see what you're annotating | 🔴 Critical |
| **Inconsistent tool hierarchy** | Arrow in bar, Rectangle in popup - why? | 🔴 Critical |
| **"Freehand" label wastes space** | Less room for the actual photo | 🟡 Medium |
| **Tiny undo/redo buttons** | Users afraid to experiment | 🔴 Critical |
| **No visible undo/redo** | Can't tell if undo is available | 🔴 Critical |
| **+/- buttons unclear** | What do they do? Zoom? Stroke? | 🟡 Medium |
| **Single color indicator** | Can't see available colors | 🟡 Medium |
| **No selection feedback** | How to edit existing annotations? | 🔴 Critical |
| **No contextual options** | All options hidden in menus | 🟡 Medium |
| **Generic tool set** | Missing roofing-specific features | 🟡 Medium |

---

## Proposed New Layout

### Visual Mockup:

```
┌────────────────────────────────────────────────────────────────┐
│ ╭─────╮                                         ╭──────────╮   │
│ │  ✕  │       ╭────╮ ╭────╮                     │   Save   │   │
│ ╰─────╯       │ ↩️ │ │ ↪️ │                     │    ✓     │   │
│               ╰────╯ ╰────╯                     ╰──────────╯   │
│ Close          Undo   Redo                      Save (green    │
│ (confirms)     (large, clear)                   when changes)  │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│                                                                │
│                                                                │
│                    ╔═══════════════════╗                       │
│                    ║                   ║                       │
│                    ║    ROOF IMAGE     ║                       │
│                    ║                   ║                       │
│                    ║   (Maximum Area)  ║                       │
│                    ║                   ║                       │
│                    ╚═══════════════════╝                       │
│                                                                │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  CONTEXT BAR (changes based on active tool)                    │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │ [🔴][🟠][🟡][🟢][🔵][⚪][⚫]  │  [━][━━][━━━]  │  [◐ Fill]  │ │
│ │      Quick Colors             Stroke Width      Toggle     │ │
│ └────────────────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────────┤
│  PRIMARY TOOLBAR (horizontal scroll)                           │
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ ╭────╮ ╭────╮ ╭────╮ ╭────╮ ╭────╮ ╭────╮ ╭────╮ ╭────╮│   │
│ │ │ 👆 │ │ ✏️ │ │ →  │ │ ▢  │ │ ○  │ │ T  │ │ 📍 │ │ •••││   │
│ │ │Sel │ │Draw│ │Arrw│ │Rect│ │Circ│ │Text│ │Mrkr│ │More││   │
│ │ ╰────╯ ╰────╯ ╰────╯ ╰────╯ ╰────╯ ╰────╯ ╰────╯ ╰────╯│   │
│ │        ↑                                                │   │
│ │   Selected = Orange fill + lift                         │   │
│ └──────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────┘
```

---

## Detailed Component Specifications

### 1. Header Bar

**Remove the "Freehand" mode label** - it wastes space and the toolbar already shows the active tool.

```typescript
// HeaderBar.tsx
interface HeaderBarProps {
  hasUnsavedChanges: boolean;
  canUndo: boolean;
  canRedo: boolean;
  undoCount: number;  // Show "Undo (3)" if multiple
  onClose: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = (props) => {
  return (
    <View style={styles.headerBar}>
      {/* Close Button - Left */}
      <TouchableOpacity 
        onPress={handleClose}
        style={styles.closeButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Icon name="close" size={24} color="#FFF" />
      </TouchableOpacity>
      
      {/* Undo/Redo - Center */}
      <View style={styles.undoRedoContainer}>
        <TouchableOpacity 
          onPress={props.onUndo}
          disabled={!props.canUndo}
          style={[
            styles.undoRedoButton,
            !props.canUndo && styles.disabled
          ]}
        >
          <Icon name="undo" size={24} color={props.canUndo ? "#FFF" : "#666"} />
          {props.undoCount > 1 && (
            <Text style={styles.undoCount}>{props.undoCount}</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={props.onRedo}
          disabled={!props.canRedo}
          style={[
            styles.undoRedoButton,
            !props.canRedo && styles.disabled
          ]}
        >
          <Icon name="redo" size={24} color={props.canRedo ? "#FFF" : "#666"} />
        </TouchableOpacity>
      </View>
      
      {/* Save Button - Right */}
      <TouchableOpacity 
        onPress={props.onSave}
        onLongPress={handleSaveOptions} // Long press for "Save as Copy"
        style={[
          styles.saveButton,
          props.hasUnsavedChanges && styles.saveButtonActive
        ]}
      >
        <Text style={styles.saveButtonText}>
          {props.hasUnsavedChanges ? 'Save' : 'Done'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#1A1A1A',
  },
  closeButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  undoRedoContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 4,
  },
  undoRedoButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  disabled: {
    opacity: 0.4,
  },
  saveButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  saveButtonActive: {
    backgroundColor: '#FF6B35', // Zuper orange
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
```

### 2. Primary Toolbar

**Key Changes:**
- Horizontal scrollable instead of popup menus
- All primary tools visible at once
- Clear visual feedback for selected tool
- "More" button for secondary features

```typescript
// PrimaryToolbar.tsx
type ToolId = 
  | 'select' 
  | 'freehand' 
  | 'arrow' 
  | 'rectangle' 
  | 'ellipse' 
  | 'text' 
  | 'marker'  // Quick damage markers
  | 'polyline'
  | 'polygon'
  | 'sticker'
  | 'magnifier'
  | 'measure';

interface Tool {
  id: ToolId;
  icon: string;
  label: string;
  group?: 'primary' | 'secondary';
}

const PRIMARY_TOOLS: Tool[] = [
  { id: 'select', icon: 'cursor-pointer', label: 'Select', group: 'primary' },
  { id: 'freehand', icon: 'pencil', label: 'Draw', group: 'primary' },
  { id: 'arrow', icon: 'arrow-right', label: 'Arrow', group: 'primary' },
  { id: 'rectangle', icon: 'square-outline', label: 'Rect', group: 'primary' },
  { id: 'ellipse', icon: 'circle-outline', label: 'Circle', group: 'primary' },
  { id: 'text', icon: 'format-text', label: 'Text', group: 'primary' },
  { id: 'marker', icon: 'map-marker-check', label: 'Marker', group: 'primary' },
];

const SECONDARY_TOOLS: Tool[] = [
  { id: 'polyline', icon: 'vector-polyline', label: 'Polyline', group: 'secondary' },
  { id: 'polygon', icon: 'hexagon-outline', label: 'Polygon', group: 'secondary' },
  { id: 'sticker', icon: 'sticker-emoji', label: 'Sticker', group: 'secondary' },
  { id: 'magnifier', icon: 'magnify-plus', label: 'Magnify', group: 'secondary' },
  { id: 'measure', icon: 'ruler', label: 'Measure', group: 'secondary' },
];

const PrimaryToolbar: React.FC<{
  activeTool: ToolId;
  onToolSelect: (tool: ToolId) => void;
  onMorePress: () => void;
}> = ({ activeTool, onToolSelect, onMorePress }) => {
  return (
    <View style={styles.toolbarContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.toolbarScroll}
      >
        {PRIMARY_TOOLS.map((tool) => (
          <ToolButton
            key={tool.id}
            tool={tool}
            isActive={activeTool === tool.id}
            onPress={() => onToolSelect(tool.id)}
          />
        ))}
        
        {/* More button for secondary tools */}
        <TouchableOpacity 
          style={styles.moreButton}
          onPress={onMorePress}
        >
          <Icon name="dots-horizontal" size={24} color="#999" />
          <Text style={styles.toolLabel}>More</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const ToolButton: React.FC<{
  tool: Tool;
  isActive: boolean;
  onPress: () => void;
}> = ({ tool, isActive, onPress }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(
      isActive ? '#FF6B35' : 'transparent',
      { duration: 150 }
    ),
    transform: [
      { scale: withSpring(isActive ? 1.05 : 1) },
      { translateY: withSpring(isActive ? -2 : 0) },
    ],
  }));

  return (
    <Animated.View style={[styles.toolButton, animatedStyle]}>
      <TouchableOpacity onPress={onPress} style={styles.toolButtonInner}>
        <Icon 
          name={tool.icon} 
          size={24} 
          color={isActive ? '#FFF' : '#999'} 
        />
        <Text style={[
          styles.toolLabel,
          isActive && styles.toolLabelActive
        ]}>
          {tool.label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toolbarContainer: {
    height: 72,
    backgroundColor: '#1A1A1A',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  toolbarScroll: {
    paddingHorizontal: 12,
    alignItems: 'center',
    height: '100%',
  },
  toolButton: {
    marginHorizontal: 4,
    borderRadius: 12,
  },
  toolButtonInner: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  toolLabelActive: {
    color: '#FFF',
    fontWeight: '600',
  },
  moreButton: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    borderLeftWidth: 1,
    borderLeftColor: '#333',
  },
});
```

### 3. Context Bar (NEW COMPONENT)

**This replaces the hidden options with visible, contextual controls.**

```typescript
// ContextBar.tsx
interface ContextBarProps {
  activeTool: ToolId;
  selectedAnnotation: Annotation | null;
  strokeColor: string;
  fillColor: string | null;
  strokeWidth: number;
  onColorChange: (color: string) => void;
  onFillChange: (color: string | null) => void;
  onStrokeWidthChange: (width: number) => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

const QUICK_COLORS = [
  '#FF3B30', // Red - Damage
  '#FF9500', // Orange - Warning
  '#FFCC00', // Yellow - Attention
  '#34C759', // Green - OK
  '#007AFF', // Blue - Water/Info
  '#FFFFFF', // White
  '#000000', // Black
];

const STROKE_WIDTHS = [
  { value: 2, label: '━' },
  { value: 4, label: '━━' },
  { value: 6, label: '━━━' },
  { value: 10, label: '━━━━' },
];

const ContextBar: React.FC<ContextBarProps> = (props) => {
  const { activeTool, selectedAnnotation } = props;
  
  // Show different options based on context
  if (selectedAnnotation) {
    return <SelectedAnnotationBar {...props} />;
  }
  
  switch (activeTool) {
    case 'text':
      return <TextToolBar {...props} />;
    case 'marker':
      return <MarkerToolBar {...props} />;
    case 'sticker':
      return <StickerToolBar {...props} />;
    default:
      return <DrawingToolBar {...props} />;
  }
};

// Default drawing toolbar (freehand, arrow, shapes)
const DrawingToolBar: React.FC<ContextBarProps> = (props) => {
  const [showFillOptions, setShowFillOptions] = useState(false);
  
  return (
    <View style={styles.contextBar}>
      {/* Quick Color Palette */}
      <View style={styles.colorSection}>
        {QUICK_COLORS.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorSwatch,
              { backgroundColor: color },
              props.strokeColor === color && styles.colorSwatchSelected,
            ]}
            onPress={() => props.onColorChange(color)}
          />
        ))}
        <TouchableOpacity 
          style={styles.moreColorsButton}
          onPress={() => {/* Open full color picker */}}
        >
          <Icon name="palette" size={20} color="#999" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.divider} />
      
      {/* Stroke Width */}
      <View style={styles.strokeSection}>
        {STROKE_WIDTHS.map((sw) => (
          <TouchableOpacity
            key={sw.value}
            style={[
              styles.strokeButton,
              props.strokeWidth === sw.value && styles.strokeButtonSelected,
            ]}
            onPress={() => props.onStrokeWidthChange(sw.value)}
          >
            <View 
              style={[
                styles.strokePreview,
                { 
                  height: sw.value,
                  backgroundColor: props.strokeColor,
                }
              ]} 
            />
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.divider} />
      
      {/* Fill Toggle (for shapes) */}
      {['rectangle', 'ellipse', 'polygon'].includes(props.activeTool) && (
        <TouchableOpacity
          style={[
            styles.fillToggle,
            props.fillColor && styles.fillToggleActive,
          ]}
          onPress={() => {
            props.onFillChange(props.fillColor ? null : props.strokeColor + '40');
          }}
        >
          <Icon 
            name={props.fillColor ? 'square' : 'square-outline'} 
            size={24} 
            color={props.fillColor || '#999'} 
          />
          <Text style={styles.fillLabel}>Fill</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// When an annotation is selected
const SelectedAnnotationBar: React.FC<ContextBarProps> = (props) => {
  return (
    <View style={styles.contextBar}>
      {/* Edit Properties */}
      <TouchableOpacity style={styles.contextButton}>
        <View 
          style={[styles.colorIndicator, { backgroundColor: props.strokeColor }]} 
        />
        <Text style={styles.contextButtonLabel}>Color</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.contextButton}>
        <Icon name="resize" size={20} color="#999" />
        <Text style={styles.contextButtonLabel}>Size</Text>
      </TouchableOpacity>
      
      <View style={styles.divider} />
      
      {/* Actions */}
      <TouchableOpacity 
        style={styles.contextButton}
        onPress={props.onDuplicate}
      >
        <Icon name="content-copy" size={20} color="#999" />
        <Text style={styles.contextButtonLabel}>Copy</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.contextButton, styles.deleteButton]}
        onPress={props.onDelete}
      >
        <Icon name="trash-can-outline" size={20} color="#FF3B30" />
        <Text style={[styles.contextButtonLabel, styles.deleteLabel]}>Delete</Text>
      </TouchableOpacity>
      
      <View style={styles.divider} />
      
      {/* Z-order */}
      <TouchableOpacity style={styles.contextButton}>
        <Icon name="arrange-bring-forward" size={20} color="#999" />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.contextButton}>
        <Icon name="arrange-send-backward" size={20} color="#999" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contextBar: {
    height: 52,
    backgroundColor: '#242424',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  colorSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorSwatch: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginHorizontal: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorSwatchSelected: {
    borderColor: '#FFF',
    transform: [{ scale: 1.1 }],
  },
  moreColorsButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: '#444',
    marginHorizontal: 12,
  },
  strokeSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  strokeButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
    borderRadius: 6,
  },
  strokeButtonSelected: {
    backgroundColor: '#444',
  },
  strokePreview: {
    width: 20,
    borderRadius: 2,
  },
  fillToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 6,
  },
  fillToggleActive: {
    backgroundColor: '#444',
  },
  fillLabel: {
    color: '#999',
    fontSize: 12,
    marginLeft: 4,
  },
  contextButton: {
    alignItems: 'center',
    padding: 8,
    marginHorizontal: 4,
  },
  contextButtonLabel: {
    color: '#999',
    fontSize: 10,
    marginTop: 2,
  },
  deleteButton: {},
  deleteLabel: {
    color: '#FF3B30',
  },
  colorIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
```

### 4. Quick Markers Panel (NEW FEATURE)

**This is a game-changer for roofing workflow** - one-tap damage indicators.

```typescript
// QuickMarkersPanel.tsx
interface QuickMarker {
  id: string;
  icon: string;
  label: string;
  color: string;
  category: 'status' | 'damage' | 'roofing';
}

const QUICK_MARKERS: QuickMarker[] = [
  // Status markers
  { id: 'ok', icon: '✓', label: 'OK', color: '#34C759', category: 'status' },
  { id: 'damage', icon: '✗', label: 'Damage', color: '#FF3B30', category: 'status' },
  { id: 'check', icon: '?', label: 'Check', color: '#FFCC00', category: 'status' },
  { id: 'urgent', icon: '!', label: 'Urgent', color: '#FF9500', category: 'status' },
  
  // Roofing-specific
  { id: 'leak', icon: '💧', label: 'Leak', color: '#007AFF', category: 'roofing' },
  { id: 'crack', icon: '⚡', label: 'Crack', color: '#AF52DE', category: 'roofing' },
  { id: 'missing', icon: '▢', label: 'Missing', color: '#FF9500', category: 'roofing' },
  { id: 'rot', icon: '🔴', label: 'Rot', color: '#8B4513', category: 'roofing' },
  { id: 'hail', icon: '◉', label: 'Hail', color: '#5AC8FA', category: 'roofing' },
];

const MarkerToolBar: React.FC<ContextBarProps> = () => {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  
  return (
    <View style={styles.markerBar}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.markerScroll}
      >
        {/* Status markers */}
        <View style={styles.markerGroup}>
          <Text style={styles.groupLabel}>STATUS</Text>
          <View style={styles.markerRow}>
            {QUICK_MARKERS.filter(m => m.category === 'status').map((marker) => (
              <TouchableOpacity
                key={marker.id}
                style={[
                  styles.markerButton,
                  { borderColor: marker.color },
                  selectedMarker === marker.id && { 
                    backgroundColor: marker.color + '30' 
                  },
                ]}
                onPress={() => setSelectedMarker(marker.id)}
              >
                <Text style={[styles.markerIcon, { color: marker.color }]}>
                  {marker.icon}
                </Text>
                <Text style={styles.markerLabel}>{marker.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.markerDivider} />
        
        {/* Roofing markers */}
        <View style={styles.markerGroup}>
          <Text style={styles.groupLabel}>ROOFING</Text>
          <View style={styles.markerRow}>
            {QUICK_MARKERS.filter(m => m.category === 'roofing').map((marker) => (
              <TouchableOpacity
                key={marker.id}
                style={[
                  styles.markerButton,
                  { borderColor: marker.color },
                  selectedMarker === marker.id && { 
                    backgroundColor: marker.color + '30' 
                  },
                ]}
                onPress={() => setSelectedMarker(marker.id)}
              >
                <Text style={[styles.markerIcon, { color: marker.color }]}>
                  {marker.icon}
                </Text>
                <Text style={styles.markerLabel}>{marker.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      
      {/* Instructions */}
      <Text style={styles.markerHint}>
        {selectedMarker 
          ? 'Tap on image to place marker' 
          : 'Select a marker type'}
      </Text>
    </View>
  );
};
```

### 5. Selection & Transform System

**Clear visual feedback when annotations are selected:**

```typescript
// SelectionOverlay.tsx
const SelectionOverlay: React.FC<{
  annotation: Annotation;
  bounds: Rect;
  onResize: (corner: string, delta: Point) => void;
  onRotate: (angle: number) => void;
  onMove: (delta: Point) => void;
}> = ({ annotation, bounds, onResize, onRotate, onMove }) => {
  const HANDLE_SIZE = 24;
  const HANDLE_HIT_SIZE = 44; // Larger hit area
  
  const corners = [
    { id: 'topLeft', x: bounds.x, y: bounds.y },
    { id: 'topRight', x: bounds.x + bounds.width, y: bounds.y },
    { id: 'bottomLeft', x: bounds.x, y: bounds.y + bounds.height },
    { id: 'bottomRight', x: bounds.x + bounds.width, y: bounds.y + bounds.height },
  ];
  
  return (
    <Group>
      {/* Selection border - dashed for visibility on any background */}
      <DashPathEffect intervals={[6, 4]}>
        <RoundedRect
          x={bounds.x - 2}
          y={bounds.y - 2}
          width={bounds.width + 4}
          height={bounds.height + 4}
          r={4}
          color="transparent"
          style="stroke"
          strokeWidth={2}
          color="#007AFF"
        />
      </DashPathEffect>
      
      {/* Secondary border for contrast */}
      <RoundedRect
        x={bounds.x - 1}
        y={bounds.y - 1}
        width={bounds.width + 2}
        height={bounds.height + 2}
        r={4}
        color="transparent"
        style="stroke"
        strokeWidth={1}
        color="#FFFFFF"
      />
      
      {/* Corner handles */}
      {corners.map((corner) => (
        <Group key={corner.id}>
          {/* White fill */}
          <Circle
            cx={corner.x}
            cy={corner.y}
            r={HANDLE_SIZE / 2}
            color="#FFFFFF"
          />
          {/* Blue border */}
          <Circle
            cx={corner.x}
            cy={corner.y}
            r={HANDLE_SIZE / 2}
            color="#007AFF"
            style="stroke"
            strokeWidth={2}
          />
        </Group>
      ))}
      
      {/* Rotation handle - below center */}
      <Group>
        {/* Connection line */}
        <Line
          p1={vec(bounds.x + bounds.width / 2, bounds.y + bounds.height)}
          p2={vec(bounds.x + bounds.width / 2, bounds.y + bounds.height + 40)}
          color="#007AFF"
          strokeWidth={1}
        />
        {/* Rotation circle */}
        <Circle
          cx={bounds.x + bounds.width / 2}
          cy={bounds.y + bounds.height + 40}
          r={14}
          color="#FFFFFF"
        />
        <Circle
          cx={bounds.x + bounds.width / 2}
          cy={bounds.y + bounds.height + 40}
          r={14}
          color="#007AFF"
          style="stroke"
          strokeWidth={2}
        />
        {/* Rotation icon */}
        <Path
          path="M -5,-3 A 6 6 0 1 1 5,-3 L 7,-5 L 5,-3 L 7,-1"
          transform={[
            { translateX: bounds.x + bounds.width / 2 },
            { translateY: bounds.y + bounds.height + 40 },
          ]}
          color="#007AFF"
          style="stroke"
          strokeWidth={1.5}
        />
      </Group>
    </Group>
  );
};
```

### 6. "More" Tools Panel

**Slide-up panel instead of blocking popup:**

```typescript
// MoreToolsPanel.tsx
const MoreToolsPanel: React.FC<{
  visible: boolean;
  onClose: () => void;
  onToolSelect: (tool: ToolId) => void;
  onClearAll: () => void;
}> = ({ visible, onClose, onToolSelect, onClearAll }) => {
  const translateY = useSharedValue(300);
  
  useEffect(() => {
    translateY.value = withSpring(visible ? 0 : 300, {
      damping: 20,
      stiffness: 200,
    });
  }, [visible]);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  
  return (
    <>
      {/* Backdrop */}
      {visible && (
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
      )}
      
      {/* Panel */}
      <Animated.View style={[styles.panel, animatedStyle]}>
        <View style={styles.panelHandle} />
        
        <Text style={styles.panelTitle}>More Tools</Text>
        
        <View style={styles.toolGrid}>
          {SECONDARY_TOOLS.map((tool) => (
            <TouchableOpacity
              key={tool.id}
              style={styles.gridItem}
              onPress={() => {
                onToolSelect(tool.id);
                onClose();
              }}
            >
              <View style={styles.gridItemIcon}>
                <Icon name={tool.icon} size={28} color="#FFF" />
              </View>
              <Text style={styles.gridItemLabel}>{tool.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.panelDivider} />
        
        {/* Destructive action at bottom */}
        <TouchableOpacity 
          style={styles.clearAllButton}
          onPress={() => {
            Alert.alert(
              'Clear All Annotations?',
              'This cannot be undone.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Clear All', style: 'destructive', onPress: onClearAll },
              ]
            );
          }}
        >
          <Icon name="trash-can-outline" size={20} color="#FF3B30" />
          <Text style={styles.clearAllText}>Clear All Annotations</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  panel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34, // Safe area
  },
  panelHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#666',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  panelTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  toolGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  gridItem: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 12,
  },
  gridItemIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  gridItemLabel: {
    color: '#999',
    fontSize: 12,
  },
  panelDivider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 16,
    marginHorizontal: 20,
  },
  clearAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  clearAllText: {
    color: '#FF3B30',
    fontSize: 16,
    marginLeft: 8,
  },
});
```

---

## New Features to Add

### 1. Measurement Tool

```typescript
// MeasurementAnnotation.tsx
interface MeasurementAnnotation extends BaseAnnotation {
  type: 'measurement';
  startPoint: Point;
  endPoint: Point;
  displayValue: string;  // "12' 6\""
  unit: 'imperial' | 'metric';
  scaleFactor?: number;  // Pixels per inch/cm
}

const MeasurementTool: React.FC = () => {
  // Context bar for measurement
  return (
    <View style={styles.measureContextBar}>
      <TouchableOpacity style={styles.unitToggle}>
        <Text style={styles.unitText}>ft/in</Text>
        <Icon name="chevron-down" size={16} color="#999" />
      </TouchableOpacity>
      
      <View style={styles.divider} />
      
      <TouchableOpacity style={styles.scaleButton}>
        <Icon name="ruler" size={20} color="#999" />
        <Text style={styles.scaleText}>Set Scale</Text>
      </TouchableOpacity>
      
      <Text style={styles.measureHint}>
        Drag on image to measure
      </Text>
    </View>
  );
};
```

### 2. Quick Text Templates

```typescript
// TextTemplates.tsx
const TEXT_TEMPLATES = [
  { id: 'damaged', text: 'DAMAGED', color: '#FF3B30' },
  { id: 'repair', text: 'NEEDS REPAIR', color: '#FF9500' },
  { id: 'replace', text: 'REPLACE', color: '#FF3B30' },
  { id: 'ok', text: 'OK', color: '#34C759' },
  { id: 'leak', text: 'WATER DAMAGE', color: '#007AFF' },
  { id: 'inspect', text: 'INSPECT', color: '#FFCC00' },
];

const TextToolBar: React.FC = () => {
  return (
    <View style={styles.textContextBar}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {TEXT_TEMPLATES.map((template) => (
          <TouchableOpacity
            key={template.id}
            style={[
              styles.textTemplate,
              { borderColor: template.color },
            ]}
          >
            <Text style={[styles.templateText, { color: template.color }]}>
              {template.text}
            </Text>
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity style={styles.customTextButton}>
          <Icon name="keyboard" size={20} color="#999" />
          <Text style={styles.customTextLabel}>Custom</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
```

### 3. Timestamp & GPS Stamp

```typescript
// MetadataStamp.tsx
const addTimestampToImage = async (annotation: Annotation) => {
  const now = new Date();
  const timestamp = format(now, 'MMM d, yyyy h:mm a');
  
  // Get GPS if available
  let locationText = '';
  if (await hasLocationPermission()) {
    const location = await getCurrentLocation();
    locationText = `\n${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;
  }
  
  return {
    type: 'text',
    text: `📅 ${timestamp}${locationText}`,
    position: { x: 20, y: imageHeight - 40 }, // Bottom-left
    style: {
      fontSize: 12,
      color: '#FFFFFF',
      backgroundColor: 'rgba(0,0,0,0.7)',
      padding: 8,
      borderRadius: 4,
    },
  };
};
```

---

## Interaction Patterns

### Gesture Reference

| Gesture | On Canvas | On Annotation |
|---------|-----------|---------------|
| **Tap** | Place sticker/marker, start text | Select |
| **Drag** | Draw/create | Move |
| **Pinch** | Zoom image | Resize |
| **Two-finger rotate** | — | Rotate |
| **Double-tap** | Zoom in | Edit (text) |
| **Long-press** | Quick marker menu | Context menu |

### Long-Press Quick Actions (Radial Menu)

```
Long-press anywhere on canvas:

         [✗ Damage]
              │
    [💧 Leak]─┼─[? Check]
              │
          [✓ OK]

Slide finger to option and release to place
```

### Shake to Undo

```typescript
// Optional - can be disabled in settings
useShakeDetector({
  sensitivity: 'medium',
  onShake: () => {
    if (canUndo) {
      undo();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  },
});
```

---

## Performance Optimizations

```typescript
// AnnotationCanvas.tsx
const AnnotationCanvas: React.FC = () => {
  // 1. Memoize expensive calculations
  const sortedAnnotations = useMemo(
    () => [...annotations].sort((a, b) => a.zIndex - b.zIndex),
    [annotations]
  );
  
  // 2. Use Picture caching for static annotations
  const staticAnnotationsPicture = useMemo(() => {
    const recorder = Skia.PictureRecorder();
    const canvas = recorder.beginRecording(bounds);
    
    sortedAnnotations
      .filter(a => !a.isBeingEdited)
      .forEach(annotation => renderAnnotation(canvas, annotation));
    
    return recorder.finishRecordingAsPicture();
  }, [sortedAnnotations.filter(a => !a.isBeingEdited)]);
  
  // 3. Only re-render active annotation
  const activeAnnotation = annotations.find(a => a.isBeingEdited);
  
  return (
    <Canvas style={styles.canvas}>
      {/* Background image */}
      <Image image={backgroundImage} fit="contain" />
      
      {/* Cached static annotations */}
      <Picture picture={staticAnnotationsPicture} />
      
      {/* Active annotation (real-time rendering) */}
      {activeAnnotation && (
        <ActiveAnnotationRenderer annotation={activeAnnotation} />
      )}
      
      {/* Selection overlay */}
      {selectedAnnotation && (
        <SelectionOverlay annotation={selectedAnnotation} />
      )}
    </Canvas>
  );
};
```

---

## Summary: Key Changes to Implement

### Immediate Fixes (Priority 1)
1. ❌ **Remove popup menus** → Use horizontal scroll + slide-up panels
2. ✅ **Move undo/redo to header** → Make them prominent and always visible
3. ✅ **Add context bar** → Show relevant options based on active tool
4. ✅ **Fix color picker** → Show palette directly, not hidden

### Tool Improvements (Priority 2)
5. ✅ **Add Quick Markers** → One-tap damage indicators
6. ✅ **Add text templates** → Pre-made labels for speed
7. ✅ **Improve selection** → Clear handles for resize/rotate
8. ✅ **Add measurement tool** → Critical for estimates

### Polish (Priority 3)
9. ✅ **Haptic feedback** → Tactile confirmation
10. ✅ **Animations** → Tool selection, panel transitions
11. ✅ **Accessibility** → Large targets, high contrast option
12. ✅ **Auto-save** → Prevent data loss

---

This redesign transforms a generic image editor into a **purpose-built roofing documentation tool** that respects the constraints of field work while providing professional output.
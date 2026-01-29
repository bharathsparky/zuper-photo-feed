# MEGA PROMPT: Build Mobile Photo Annotation Editor for Zuper

## Project Context & Background

You are building an **advanced mobile photo annotation tool** for **Zuper**, a field service management platform. This editor will be used by **roofing contractors, HVAC technicians, and field service professionals** to annotate job site photos directly on their mobile devices.

### Business Problem Being Solved
- Roofing technicians need to mark damage areas, draw attention to specific issues, and add professional annotations to photos taken on-site
- Current annotation features are basic and lack critical functionality that competitors like **CompanyCam** and **JobNimbus** offer
- Ambiguous annotations lead to ordering errors, project delays, and miscommunication with customers

### Target Users
- Field technicians using Android devices (primary)
- Office staff reviewing annotated photos on web
- Customers receiving annotated photos as part of proposals

### Existing Codebase
This editor is being built **on top of an existing Photo Feed feature** in a React Native application. The basic editing functionality (freehand drawing, basic shapes, text, rotate) already exists. We are **enhancing** this editor with advanced features.

---

## Feature Requirements (Priority Order)

### MUST HAVE - Critical Features

#### 1. Point-to-Point Drawing / Polyline Tool
Allow users to draw connected line segments by tapping points. Each tap adds a vertex, creating a polyline that can:
- Auto-close into a polygon when user taps near start point
- Show vertex handles for editing individual points
- Support undo for last point added
- Different from freehand - creates clean, straight lines between taps

#### 2. Advanced Arrow Tool
Arrows that can:
- **Rotate freely** (not just 0°, 90°, 180°, 270° - any angle)
- **Move arrow head and tail independently** after drawing
- Have configurable arrowhead styles (single, double, none)
- Support color changes
- Maintain aspect ratio or allow free scaling

#### 3. Shape Annotations with Full Control
- **Rectangle**: Draw, resize, rotate, change color, adjust stroke width
- **Ellipse/Circle**: Same controls as rectangle
- **Polygon**: Tap to create vertices, close shape by tapping near origin
- All shapes support:
  - Fill color (solid, semi-transparent, or none)
  - Stroke color and width
  - Rotation handles
  - Scale handles (corner + edge)
  - Move by dragging

#### 4. Stickers / Stamps System
Pre-made annotation stamps specific to roofing/construction:
- **Damage indicators**: X marks, checkmarks, question marks
- **Roofing symbols**: Leak icon, crack icon, missing shingle, rot indicator
- **Directional**: North arrow, compass, slope indicators
- **Status stamps**: "APPROVE", "REJECT", "REVIEW", "DAMAGED", "REPAIR"
- **Custom stickers**: Ability to add company logo/custom stickers

Sticker behavior:
- Tap to place at default size
- Pinch to resize
- Two-finger rotate
- Tap and drag to move
- Delete by tapping delete button or gesture

#### 5. Fish Eye Lens / Magnifier Effect
Allow users to zoom into a specific area of the photo to highlight details:
- Circular magnifier that can be:
  - Dragged to any position
  - Resized (pinch)
  - Shows 2x, 3x, or configurable zoom level
- Creates a "callout" effect pointing to the magnified area
- Useful for highlighting small damage details in roofing photos

#### 6. Enhanced Text Annotations
- **Text input with styling**: Font size, color, bold, italic
- **Text boxes**: Configurable background color, border
- **Callout bubbles**: Arrow pointing from text to a spot
- **Auto-sizing**: Text box grows/shrinks with content
- **Multi-line support**: Line breaks within text annotations

#### 7. Color Selection System
- **Quick color palette**: Red, Orange, Yellow, Green, Blue, White, Black
- **Full color picker**: HSV picker or hex input
- **Apply to**: Stroke color, fill color, text color independently
- **Recent colors**: Remember last 5 used colors
- **Color per element**: Each annotation can have different colors

#### 8. Undo/Redo System
- Full undo stack (at least 20 levels)
- Redo support when undoing
- Clear All function with confirmation
- Individual element delete

### SHOULD HAVE - Important Features

#### 9. Layer Management
- Z-ordering: Bring to front, send to back
- Select specific elements when overlapping
- Lock elements from editing
- Group multiple elements

#### 10. Save Options
- **Save**: Overwrite original
- **Save as Copy**: Create new file with annotations baked in
- **Save without flatten**: Preserve ability to re-edit (store annotation data separately)

#### 11. Date/Time Stamping
- Auto-insert current date/time as text annotation
- Configurable format
- GPS coordinates option

---

## Technical Architecture & Library Recommendations

### PRIMARY RECOMMENDATION: React Native Skia + Gesture Handler

After extensive research, the recommended approach is using **@shopify/react-native-skia** combined with **react-native-gesture-handler** and **react-native-reanimated** for 60fps smooth interactions.

#### Why Skia?
- **GPU-accelerated**: Uses Metal on iOS, OpenGL on Android
- **60fps drawing**: Smooth freehand and touch interactions
- **Path manipulation**: Native SVG-like path operations
- **Image manipulation**: Built-in image filters and effects
- **Cross-platform**: Same code works iOS and Android
- **Shopify maintained**: Active development, good documentation

### Required Dependencies

```bash
# Core drawing engine
npm install @shopify/react-native-skia

# Gesture handling (likely already installed)
npm install react-native-gesture-handler

# Animations (likely already installed)
npm install react-native-reanimated

# Image saving/capture
npm install react-native-view-shot

# File system operations
npm install react-native-fs

# Image manipulation (crop, rotate before annotation)
npm install react-native-photo-manipulator
# OR
npm install @react-native-community/image-editor

# For stickers with transparency
npm install react-native-image-marker
```

### Alternative/Complementary Libraries

If Skia proves too complex for certain features, these can be used as fallbacks:

```bash
# For fisheye/lens distortion effects (WebGL-based)
npm install gl-react
npm install gl-react-native

# For Instagram-style image filters
npm install react-native-gl-image-filters

# For complex sticker system with drag/drop
npm install react-native-stickers
```

---

## Detailed Implementation Guide

### File Structure

```
src/
├── features/
│   └── photoEditor/
│       ├── components/
│       │   ├── Canvas/
│       │   │   ├── AnnotationCanvas.tsx      # Main Skia canvas
│       │   │   ├── DrawingLayer.tsx          # Freehand/path drawing
│       │   │   ├── ShapeLayer.tsx            # Shapes (rect, circle, polygon)
│       │   │   ├── ArrowLayer.tsx            # Arrow annotations
│       │   │   ├── TextLayer.tsx             # Text annotations
│       │   │   ├── StickerLayer.tsx          # Sticker/stamp system
│       │   │   └── FishEyeLayer.tsx          # Magnifier effect
│       │   ├── Toolbar/
│       │   │   ├── MainToolbar.tsx           # Bottom toolbar
│       │   │   ├── ColorPicker.tsx           # Color selection
│       │   │   ├── StrokeWidthPicker.tsx     # Line thickness
│       │   │   ├── ShapeStylePicker.tsx      # Fill/stroke options
│       │   │   └── StickerPicker.tsx         # Sticker gallery
│       │   ├── Controls/
│       │   │   ├── TransformControls.tsx     # Resize/rotate handles
│       │   │   ├── SelectionBox.tsx          # Selection indicator
│       │   │   └── ContextMenu.tsx           # Element options
│       │   └── Modals/
│       │       ├── TextInputModal.tsx        # Text entry
│       │       ├── SaveOptionsModal.tsx      # Save choices
│       │       └── ColorPickerModal.tsx      # Full color picker
│       ├── hooks/
│       │   ├── useAnnotations.ts             # Annotation state management
│       │   ├── useGestures.ts                # Gesture handling logic
│       │   ├── useUndoRedo.ts                # History management
│       │   ├── useTransform.ts               # Element transformations
│       │   └── useImageSave.ts               # Save/export functionality
│       ├── types/
│       │   └── annotations.ts                # TypeScript definitions
│       ├── utils/
│       │   ├── geometryUtils.ts              # Math helpers
│       │   ├── colorUtils.ts                 # Color manipulation
│       │   ├── pathUtils.ts                  # SVG path helpers
│       │   └── exportUtils.ts                # Image export helpers
│       ├── constants/
│       │   ├── colors.ts                     # Color palette
│       │   ├── stickers.ts                   # Sticker definitions
│       │   └── tools.ts                      # Tool configurations
│       └── PhotoEditorScreen.tsx             # Main screen component
└── assets/
    └── stickers/
        ├── damage/
        │   ├── x-mark.png
        │   ├── checkmark.png
        │   ├── question.png
        │   └── ...
        ├── roofing/
        │   ├── leak.png
        │   ├── crack.png
        │   ├── missing-shingle.png
        │   └── ...
        └── status/
            ├── approve.png
            ├── reject.png
            └── ...
```

### Core Type Definitions

```typescript
// types/annotations.ts

export type ToolType = 
  | 'select'
  | 'freehand'
  | 'line'
  | 'polyline'
  | 'arrow'
  | 'rectangle'
  | 'ellipse'
  | 'polygon'
  | 'text'
  | 'sticker'
  | 'fisheye';

export interface Point {
  x: number;
  y: number;
}

export interface Transform {
  translateX: number;
  translateY: number;
  scaleX: number;
  scaleY: number;
  rotation: number; // in degrees
}

export interface BaseAnnotation {
  id: string;
  type: ToolType;
  transform: Transform;
  zIndex: number;
  locked: boolean;
  visible: boolean;
  createdAt: number;
}

export interface StrokeStyle {
  color: string;
  width: number;
  opacity: number;
  dashArray?: number[]; // for dashed lines
}

export interface FillStyle {
  color: string;
  opacity: number;
}

export interface FreehandAnnotation extends BaseAnnotation {
  type: 'freehand';
  path: string; // SVG path string
  stroke: StrokeStyle;
}

export interface LineAnnotation extends BaseAnnotation {
  type: 'line';
  startPoint: Point;
  endPoint: Point;
  stroke: StrokeStyle;
}

export interface PolylineAnnotation extends BaseAnnotation {
  type: 'polyline';
  points: Point[];
  closed: boolean; // if true, becomes polygon
  stroke: StrokeStyle;
  fill?: FillStyle; // only if closed
}

export interface ArrowAnnotation extends BaseAnnotation {
  type: 'arrow';
  startPoint: Point;
  endPoint: Point;
  stroke: StrokeStyle;
  arrowHead: {
    start: 'none' | 'arrow' | 'circle' | 'diamond';
    end: 'none' | 'arrow' | 'circle' | 'diamond';
    size: number;
  };
}

export interface RectangleAnnotation extends BaseAnnotation {
  type: 'rectangle';
  x: number;
  y: number;
  width: number;
  height: number;
  cornerRadius: number;
  stroke: StrokeStyle;
  fill?: FillStyle;
}

export interface EllipseAnnotation extends BaseAnnotation {
  type: 'ellipse';
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  stroke: StrokeStyle;
  fill?: FillStyle;
}

export interface PolygonAnnotation extends BaseAnnotation {
  type: 'polygon';
  points: Point[];
  stroke: StrokeStyle;
  fill?: FillStyle;
}

export interface TextAnnotation extends BaseAnnotation {
  type: 'text';
  text: string;
  position: Point;
  fontSize: number;
  fontFamily: string;
  fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic';
  color: string;
  backgroundColor?: string;
  padding?: number;
  borderColor?: string;
  borderWidth?: number;
  calloutPoint?: Point; // if set, draws arrow from text to this point
}

export interface StickerAnnotation extends BaseAnnotation {
  type: 'sticker';
  stickerId: string; // references sticker asset
  position: Point;
  width: number;
  height: number;
}

export interface FisheyeAnnotation extends BaseAnnotation {
  type: 'fisheye';
  center: Point;
  radius: number;
  zoomLevel: number; // 2x, 3x, etc.
  showBorder: boolean;
  borderColor: string;
}

export type Annotation = 
  | FreehandAnnotation
  | LineAnnotation
  | PolylineAnnotation
  | ArrowAnnotation
  | RectangleAnnotation
  | EllipseAnnotation
  | PolygonAnnotation
  | TextAnnotation
  | StickerAnnotation
  | FisheyeAnnotation;

// State management
export interface EditorState {
  imageUri: string;
  imageDimensions: { width: number; height: number };
  annotations: Annotation[];
  selectedAnnotationId: string | null;
  currentTool: ToolType;
  strokeStyle: StrokeStyle;
  fillStyle: FillStyle | null;
  undoStack: Annotation[][];
  redoStack: Annotation[][];
}
```

### Main Canvas Component Implementation

```typescript
// components/Canvas/AnnotationCanvas.tsx

import React, { useRef, useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {
  Canvas,
  Image,
  useImage,
  Path,
  Skia,
  Circle,
  Rect,
  Text as SkiaText,
  useFont,
  Group,
  RoundedRect,
  Line,
  vec,
  Paint,
  ImageShader,
  Blur,
} from '@shopify/react-native-skia';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { captureRef } from 'react-native-view-shot';

import { Annotation, ToolType, Point, EditorState } from '../../types/annotations';
import { useAnnotations } from '../../hooks/useAnnotations';
import { useGestures } from '../../hooks/useGestures';
import { useUndoRedo } from '../../hooks/useUndoRedo';

interface AnnotationCanvasProps {
  imageUri: string;
  initialAnnotations?: Annotation[];
  currentTool: ToolType;
  strokeColor: string;
  strokeWidth: number;
  fillColor: string | null;
  onAnnotationsChange: (annotations: Annotation[]) => void;
  onSelectionChange: (annotationId: string | null) => void;
}

export const AnnotationCanvas: React.FC<AnnotationCanvasProps> = ({
  imageUri,
  initialAnnotations = [],
  currentTool,
  strokeColor,
  strokeWidth,
  fillColor,
  onAnnotationsChange,
  onSelectionChange,
}) => {
  const canvasRef = useRef<View>(null);
  const image = useImage(imageUri);
  
  const {
    annotations,
    addAnnotation,
    updateAnnotation,
    deleteAnnotation,
    selectAnnotation,
    selectedAnnotation,
  } = useAnnotations(initialAnnotations);

  const { undo, redo, canUndo, canRedo, pushState } = useUndoRedo(annotations);

  // Shared values for current drawing
  const currentPath = useSharedValue<string>('');
  const startPoint = useSharedValue<Point>({ x: 0, y: 0 });
  const endPoint = useSharedValue<Point>({ x: 0, y: 0 });
  const isDrawing = useSharedValue(false);

  // For polyline/polygon - track points as user taps
  const [polylinePoints, setPolylinePoints] = useState<Point[]>([]);

  // Calculate canvas dimensions to fit image
  const screenWidth = Dimensions.get('window').width;
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: screenWidth,
    height: screenWidth * 1.33, // default 4:3 aspect
  });

  // Update canvas dimensions when image loads
  React.useEffect(() => {
    if (image) {
      const aspectRatio = image.width() / image.height();
      const height = screenWidth / aspectRatio;
      setCanvasDimensions({ width: screenWidth, height });
    }
  }, [image, screenWidth]);

  // Gesture handlers
  const panGesture = Gesture.Pan()
    .onStart((event) => {
      if (currentTool === 'select') {
        // Hit test to select annotation
        const hitAnnotation = hitTestAnnotations(
          { x: event.x, y: event.y },
          annotations
        );
        runOnJS(selectAnnotation)(hitAnnotation?.id || null);
        runOnJS(onSelectionChange)(hitAnnotation?.id || null);
      } else if (currentTool === 'freehand') {
        isDrawing.value = true;
        startPoint.value = { x: event.x, y: event.y };
        currentPath.value = `M ${event.x} ${event.y}`;
      } else if (currentTool === 'line' || currentTool === 'arrow') {
        isDrawing.value = true;
        startPoint.value = { x: event.x, y: event.y };
        endPoint.value = { x: event.x, y: event.y };
      } else if (currentTool === 'rectangle' || currentTool === 'ellipse') {
        isDrawing.value = true;
        startPoint.value = { x: event.x, y: event.y };
        endPoint.value = { x: event.x, y: event.y };
      }
    })
    .onUpdate((event) => {
      if (currentTool === 'freehand' && isDrawing.value) {
        currentPath.value += ` L ${event.x} ${event.y}`;
      } else if (
        (currentTool === 'line' || 
         currentTool === 'arrow' || 
         currentTool === 'rectangle' || 
         currentTool === 'ellipse') &&
        isDrawing.value
      ) {
        endPoint.value = { x: event.x, y: event.y };
      } else if (currentTool === 'select' && selectedAnnotation) {
        // Move selected annotation
        runOnJS(updateAnnotation)(selectedAnnotation.id, {
          transform: {
            ...selectedAnnotation.transform,
            translateX: event.translationX,
            translateY: event.translationY,
          },
        });
      }
    })
    .onEnd((event) => {
      if (currentTool === 'freehand' && isDrawing.value) {
        const newAnnotation: FreehandAnnotation = {
          id: generateUUID(),
          type: 'freehand',
          path: currentPath.value,
          stroke: {
            color: strokeColor,
            width: strokeWidth,
            opacity: 1,
          },
          transform: { translateX: 0, translateY: 0, scaleX: 1, scaleY: 1, rotation: 0 },
          zIndex: annotations.length,
          locked: false,
          visible: true,
          createdAt: Date.now(),
        };
        runOnJS(addAnnotation)(newAnnotation);
        runOnJS(pushState)(annotations);
        currentPath.value = '';
      } else if (currentTool === 'arrow' && isDrawing.value) {
        const newAnnotation: ArrowAnnotation = {
          id: generateUUID(),
          type: 'arrow',
          startPoint: startPoint.value,
          endPoint: endPoint.value,
          stroke: {
            color: strokeColor,
            width: strokeWidth,
            opacity: 1,
          },
          arrowHead: {
            start: 'none',
            end: 'arrow',
            size: strokeWidth * 3,
          },
          transform: { translateX: 0, translateY: 0, scaleX: 1, scaleY: 1, rotation: 0 },
          zIndex: annotations.length,
          locked: false,
          visible: true,
          createdAt: Date.now(),
        };
        runOnJS(addAnnotation)(newAnnotation);
        runOnJS(pushState)(annotations);
      } else if (currentTool === 'rectangle' && isDrawing.value) {
        const x = Math.min(startPoint.value.x, endPoint.value.x);
        const y = Math.min(startPoint.value.y, endPoint.value.y);
        const width = Math.abs(endPoint.value.x - startPoint.value.x);
        const height = Math.abs(endPoint.value.y - startPoint.value.y);
        
        const newAnnotation: RectangleAnnotation = {
          id: generateUUID(),
          type: 'rectangle',
          x,
          y,
          width,
          height,
          cornerRadius: 0,
          stroke: {
            color: strokeColor,
            width: strokeWidth,
            opacity: 1,
          },
          fill: fillColor ? { color: fillColor, opacity: 0.3 } : undefined,
          transform: { translateX: 0, translateY: 0, scaleX: 1, scaleY: 1, rotation: 0 },
          zIndex: annotations.length,
          locked: false,
          visible: true,
          createdAt: Date.now(),
        };
        runOnJS(addAnnotation)(newAnnotation);
        runOnJS(pushState)(annotations);
      } else if (currentTool === 'ellipse' && isDrawing.value) {
        const cx = (startPoint.value.x + endPoint.value.x) / 2;
        const cy = (startPoint.value.y + endPoint.value.y) / 2;
        const rx = Math.abs(endPoint.value.x - startPoint.value.x) / 2;
        const ry = Math.abs(endPoint.value.y - startPoint.value.y) / 2;
        
        const newAnnotation: EllipseAnnotation = {
          id: generateUUID(),
          type: 'ellipse',
          cx,
          cy,
          rx,
          ry,
          stroke: {
            color: strokeColor,
            width: strokeWidth,
            opacity: 1,
          },
          fill: fillColor ? { color: fillColor, opacity: 0.3 } : undefined,
          transform: { translateX: 0, translateY: 0, scaleX: 1, scaleY: 1, rotation: 0 },
          zIndex: annotations.length,
          locked: false,
          visible: true,
          createdAt: Date.now(),
        };
        runOnJS(addAnnotation)(newAnnotation);
        runOnJS(pushState)(annotations);
      }
      
      isDrawing.value = false;
      runOnJS(onAnnotationsChange)(annotations);
    });

  // Tap gesture for polyline/sticker placement
  const tapGesture = Gesture.Tap()
    .onEnd((event) => {
      if (currentTool === 'polyline' || currentTool === 'polygon') {
        const newPoint = { x: event.x, y: event.y };
        
        // Check if user tapped near the start point to close the shape
        if (polylinePoints.length >= 2) {
          const firstPoint = polylinePoints[0];
          const distance = Math.sqrt(
            Math.pow(newPoint.x - firstPoint.x, 2) +
            Math.pow(newPoint.y - firstPoint.y, 2)
          );
          
          if (distance < 20) { // Close threshold of 20 pixels
            // Close the shape
            const newAnnotation: PolylineAnnotation = {
              id: generateUUID(),
              type: 'polyline',
              points: polylinePoints,
              closed: true,
              stroke: {
                color: strokeColor,
                width: strokeWidth,
                opacity: 1,
              },
              fill: fillColor ? { color: fillColor, opacity: 0.3 } : undefined,
              transform: { translateX: 0, translateY: 0, scaleX: 1, scaleY: 1, rotation: 0 },
              zIndex: annotations.length,
              locked: false,
              visible: true,
              createdAt: Date.now(),
            };
            runOnJS(addAnnotation)(newAnnotation);
            runOnJS(pushState)(annotations);
            runOnJS(setPolylinePoints)([]);
            runOnJS(onAnnotationsChange)(annotations);
            return;
          }
        }
        
        // Add point to polyline
        runOnJS(setPolylinePoints)([...polylinePoints, newPoint]);
      } else if (currentTool === 'sticker') {
        // Show sticker picker modal (handled by parent component)
      }
    });

  // Pinch gesture for scaling selected annotation
  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      if (selectedAnnotation) {
        runOnJS(updateAnnotation)(selectedAnnotation.id, {
          transform: {
            ...selectedAnnotation.transform,
            scaleX: selectedAnnotation.transform.scaleX * event.scale,
            scaleY: selectedAnnotation.transform.scaleY * event.scale,
          },
        });
      }
    });

  // Rotation gesture for rotating selected annotation
  const rotationGesture = Gesture.Rotation()
    .onUpdate((event) => {
      if (selectedAnnotation) {
        runOnJS(updateAnnotation)(selectedAnnotation.id, {
          transform: {
            ...selectedAnnotation.transform,
            rotation: selectedAnnotation.transform.rotation + (event.rotation * 180 / Math.PI),
          },
        });
      }
    });

  // Combine gestures
  const composedGesture = Gesture.Simultaneous(
    panGesture,
    tapGesture,
    Gesture.Simultaneous(pinchGesture, rotationGesture)
  );

  // Save canvas as image
  const saveCanvas = async (saveAsNew: boolean = false): Promise<string> => {
    if (!canvasRef.current) throw new Error('Canvas ref not available');
    
    const uri = await captureRef(canvasRef.current, {
      format: 'png',
      quality: 1,
    });
    
    // Use react-native-fs to save or replace
    // Implementation depends on your file handling requirements
    
    return uri;
  };

  // Render annotation based on type
  const renderAnnotation = (annotation: Annotation) => {
    const { transform } = annotation;
    const transformMatrix = Skia.Matrix();
    transformMatrix.translate(transform.translateX, transform.translateY);
    transformMatrix.rotate(transform.rotation, 0, 0); // Add proper pivot point
    transformMatrix.scale(transform.scaleX, transform.scaleY);

    switch (annotation.type) {
      case 'freehand':
        return (
          <Group key={annotation.id} matrix={transformMatrix}>
            <Path
              path={annotation.path}
              color={annotation.stroke.color}
              style="stroke"
              strokeWidth={annotation.stroke.width}
              strokeCap="round"
              strokeJoin="round"
            />
          </Group>
        );

      case 'arrow':
        return (
          <Group key={annotation.id} matrix={transformMatrix}>
            {renderArrow(annotation)}
          </Group>
        );

      case 'rectangle':
        return (
          <Group key={annotation.id} matrix={transformMatrix}>
            {annotation.fill && (
              <Rect
                x={annotation.x}
                y={annotation.y}
                width={annotation.width}
                height={annotation.height}
                color={annotation.fill.color}
                opacity={annotation.fill.opacity}
              />
            )}
            <Rect
              x={annotation.x}
              y={annotation.y}
              width={annotation.width}
              height={annotation.height}
              color={annotation.stroke.color}
              style="stroke"
              strokeWidth={annotation.stroke.width}
            />
          </Group>
        );

      case 'ellipse':
        return (
          <Group key={annotation.id} matrix={transformMatrix}>
            {/* Skia doesn't have native ellipse, use Path */}
            {renderEllipse(annotation)}
          </Group>
        );

      case 'text':
        return (
          <Group key={annotation.id} matrix={transformMatrix}>
            {renderText(annotation)}
          </Group>
        );

      case 'sticker':
        return (
          <Group key={annotation.id} matrix={transformMatrix}>
            {renderSticker(annotation)}
          </Group>
        );

      case 'fisheye':
        return (
          <Group key={annotation.id} matrix={transformMatrix}>
            {renderFisheye(annotation)}
          </Group>
        );

      default:
        return null;
    }
  };

  // Helper to render arrow with arrowhead
  const renderArrow = (annotation: ArrowAnnotation) => {
    const { startPoint: start, endPoint: end, stroke, arrowHead } = annotation;
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    const headLength = arrowHead.size;
    
    // Calculate arrowhead points
    const arrowPoints = [
      { x: end.x, y: end.y },
      {
        x: end.x - headLength * Math.cos(angle - Math.PI / 6),
        y: end.y - headLength * Math.sin(angle - Math.PI / 6),
      },
      {
        x: end.x - headLength * Math.cos(angle + Math.PI / 6),
        y: end.y - headLength * Math.sin(angle + Math.PI / 6),
      },
    ];
    
    const linePath = Skia.Path.Make();
    linePath.moveTo(start.x, start.y);
    linePath.lineTo(end.x, end.y);
    
    const arrowPath = Skia.Path.Make();
    arrowPath.moveTo(arrowPoints[0].x, arrowPoints[0].y);
    arrowPath.lineTo(arrowPoints[1].x, arrowPoints[1].y);
    arrowPath.lineTo(arrowPoints[2].x, arrowPoints[2].y);
    arrowPath.close();
    
    return (
      <>
        <Path
          path={linePath}
          color={stroke.color}
          style="stroke"
          strokeWidth={stroke.width}
          strokeCap="round"
        />
        <Path
          path={arrowPath}
          color={stroke.color}
          style="fill"
        />
      </>
    );
  };

  // Helper to render ellipse using Path
  const renderEllipse = (annotation: EllipseAnnotation) => {
    const { cx, cy, rx, ry, stroke, fill } = annotation;
    
    // Create ellipse path using bezier curves approximation
    const kappa = 0.5522848;
    const ox = rx * kappa;
    const oy = ry * kappa;
    
    const path = Skia.Path.Make();
    path.moveTo(cx - rx, cy);
    path.cubicTo(cx - rx, cy - oy, cx - ox, cy - ry, cx, cy - ry);
    path.cubicTo(cx + ox, cy - ry, cx + rx, cy - oy, cx + rx, cy);
    path.cubicTo(cx + rx, cy + oy, cx + ox, cy + ry, cx, cy + ry);
    path.cubicTo(cx - ox, cy + ry, cx - rx, cy + oy, cx - rx, cy);
    path.close();
    
    return (
      <>
        {fill && (
          <Path
            path={path}
            color={fill.color}
            style="fill"
            opacity={fill.opacity}
          />
        )}
        <Path
          path={path}
          color={stroke.color}
          style="stroke"
          strokeWidth={stroke.width}
        />
      </>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={composedGesture}>
        <View ref={canvasRef} collapsable={false}>
          <Canvas style={[styles.canvas, canvasDimensions]}>
            {/* Background image */}
            {image && (
              <Image
                image={image}
                fit="contain"
                x={0}
                y={0}
                width={canvasDimensions.width}
                height={canvasDimensions.height}
              />
            )}
            
            {/* Render all annotations */}
            {annotations
              .filter(a => a.visible)
              .sort((a, b) => a.zIndex - b.zIndex)
              .map(renderAnnotation)}
            
            {/* Current drawing preview */}
            {isDrawing.value && currentTool === 'freehand' && (
              <Path
                path={currentPath.value}
                color={strokeColor}
                style="stroke"
                strokeWidth={strokeWidth}
                strokeCap="round"
                strokeJoin="round"
              />
            )}
            
            {/* Polyline in progress */}
            {polylinePoints.length > 0 && (
              <>
                {/* Draw lines between points */}
                {polylinePoints.map((point, index) => {
                  if (index === 0) return null;
                  const prevPoint = polylinePoints[index - 1];
                  return (
                    <Line
                      key={`polyline-${index}`}
                      p1={vec(prevPoint.x, prevPoint.y)}
                      p2={vec(point.x, point.y)}
                      color={strokeColor}
                      style="stroke"
                      strokeWidth={strokeWidth}
                    />
                  );
                })}
                {/* Draw vertices */}
                {polylinePoints.map((point, index) => (
                  <Circle
                    key={`vertex-${index}`}
                    cx={point.x}
                    cy={point.y}
                    r={6}
                    color={strokeColor}
                  />
                ))}
              </>
            )}
            
            {/* Selection indicators */}
            {selectedAnnotation && (
              <SelectionOverlay annotation={selectedAnnotation} />
            )}
          </Canvas>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  canvas: {
    backgroundColor: '#1a1a1a',
  },
});

// Utility function
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Hit testing for annotation selection
const hitTestAnnotations = (
  point: Point,
  annotations: Annotation[]
): Annotation | null => {
  // Iterate in reverse z-order (top to bottom)
  for (let i = annotations.length - 1; i >= 0; i--) {
    const annotation = annotations[i];
    if (isPointInAnnotation(point, annotation)) {
      return annotation;
    }
  }
  return null;
};

const isPointInAnnotation = (point: Point, annotation: Annotation): boolean => {
  // Simplified hit testing - expand based on annotation type
  switch (annotation.type) {
    case 'rectangle':
      return (
        point.x >= annotation.x &&
        point.x <= annotation.x + annotation.width &&
        point.y >= annotation.y &&
        point.y <= annotation.y + annotation.height
      );
    case 'ellipse':
      const dx = point.x - annotation.cx;
      const dy = point.y - annotation.cy;
      return (dx * dx) / (annotation.rx * annotation.rx) +
             (dy * dy) / (annotation.ry * annotation.ry) <= 1;
    // Add more cases for other annotation types
    default:
      return false;
  }
};

export default AnnotationCanvas;
```

### Fisheye Effect Implementation

```typescript
// components/Canvas/FishEyeLayer.tsx

import React from 'react';
import {
  Circle,
  Group,
  Image,
  ImageShader,
  Shader,
  Skia,
  vec,
  RuntimeShader,
} from '@shopify/react-native-skia';
import { FisheyeAnnotation } from '../../types/annotations';

// GLSL shader for fisheye effect
const fisheyeShader = Skia.RuntimeEffect.Make(`
  uniform shader image;
  uniform float2 center;
  uniform float radius;
  uniform float strength;
  
  half4 main(float2 pos) {
    float2 coord = pos;
    float2 diff = coord - center;
    float dist = length(diff);
    
    if (dist < radius) {
      float percent = dist / radius;
      float theta = percent * percent * strength * 3.14159;
      float sinTheta = sin(theta);
      float cosTheta = cos(theta);
      
      coord = center + (diff * cosTheta);
    }
    
    return image.eval(coord);
  }
`)!;

interface FishEyeLayerProps {
  annotation: FisheyeAnnotation;
  sourceImage: any; // Skia image
}

export const FishEyeLayer: React.FC<FishEyeLayerProps> = ({
  annotation,
  sourceImage,
}) => {
  const { center, radius, zoomLevel, showBorder, borderColor } = annotation;

  return (
    <Group>
      {/* Fisheye magnifier circle with shader */}
      <Circle cx={center.x} cy={center.y} r={radius}>
        <RuntimeShader
          source={fisheyeShader}
          uniforms={{
            center: vec(center.x, center.y),
            radius: radius,
            strength: zoomLevel,
          }}
        >
          <ImageShader
            image={sourceImage}
            fit="cover"
          />
        </RuntimeShader>
      </Circle>
      
      {/* Border circle */}
      {showBorder && (
        <Circle
          cx={center.x}
          cy={center.y}
          r={radius}
          color={borderColor}
          style="stroke"
          strokeWidth={3}
        />
      )}
    </Group>
  );
};
```

### Sticker System Implementation

```typescript
// constants/stickers.ts

export interface StickerDefinition {
  id: string;
  name: string;
  category: 'damage' | 'roofing' | 'status' | 'directional' | 'custom';
  source: any; // require() for local assets
  defaultWidth: number;
  defaultHeight: number;
}

export const STICKER_CATEGORIES = [
  { id: 'damage', name: 'Damage Markers' },
  { id: 'roofing', name: 'Roofing Symbols' },
  { id: 'status', name: 'Status Stamps' },
  { id: 'directional', name: 'Directional' },
  { id: 'custom', name: 'Custom' },
];

export const DEFAULT_STICKERS: StickerDefinition[] = [
  // Damage markers
  {
    id: 'x-mark-red',
    name: 'X Mark (Red)',
    category: 'damage',
    source: require('../../../assets/stickers/damage/x-mark-red.png'),
    defaultWidth: 60,
    defaultHeight: 60,
  },
  {
    id: 'checkmark-green',
    name: 'Checkmark (Green)',
    category: 'damage',
    source: require('../../../assets/stickers/damage/checkmark-green.png'),
    defaultWidth: 60,
    defaultHeight: 60,
  },
  {
    id: 'question-yellow',
    name: 'Question Mark',
    category: 'damage',
    source: require('../../../assets/stickers/damage/question-yellow.png'),
    defaultWidth: 60,
    defaultHeight: 60,
  },
  {
    id: 'exclamation-orange',
    name: 'Alert',
    category: 'damage',
    source: require('../../../assets/stickers/damage/exclamation-orange.png'),
    defaultWidth: 60,
    defaultHeight: 60,
  },
  
  // Roofing symbols
  {
    id: 'leak-icon',
    name: 'Water Leak',
    category: 'roofing',
    source: require('../../../assets/stickers/roofing/leak.png'),
    defaultWidth: 80,
    defaultHeight: 80,
  },
  {
    id: 'crack-icon',
    name: 'Crack',
    category: 'roofing',
    source: require('../../../assets/stickers/roofing/crack.png'),
    defaultWidth: 80,
    defaultHeight: 40,
  },
  {
    id: 'missing-shingle',
    name: 'Missing Shingle',
    category: 'roofing',
    source: require('../../../assets/stickers/roofing/missing-shingle.png'),
    defaultWidth: 100,
    defaultHeight: 60,
  },
  {
    id: 'rot-damage',
    name: 'Rot/Decay',
    category: 'roofing',
    source: require('../../../assets/stickers/roofing/rot.png'),
    defaultWidth: 80,
    defaultHeight: 80,
  },
  {
    id: 'hail-damage',
    name: 'Hail Damage',
    category: 'roofing',
    source: require('../../../assets/stickers/roofing/hail.png'),
    defaultWidth: 60,
    defaultHeight: 60,
  },
  
  // Status stamps
  {
    id: 'stamp-approve',
    name: 'APPROVED',
    category: 'status',
    source: require('../../../assets/stickers/status/approve.png'),
    defaultWidth: 150,
    defaultHeight: 50,
  },
  {
    id: 'stamp-reject',
    name: 'REJECTED',
    category: 'status',
    source: require('../../../assets/stickers/status/reject.png'),
    defaultWidth: 150,
    defaultHeight: 50,
  },
  {
    id: 'stamp-repair',
    name: 'NEEDS REPAIR',
    category: 'status',
    source: require('../../../assets/stickers/status/repair.png'),
    defaultWidth: 180,
    defaultHeight: 50,
  },
  {
    id: 'stamp-review',
    name: 'REVIEW',
    category: 'status',
    source: require('../../../assets/stickers/status/review.png'),
    defaultWidth: 120,
    defaultHeight: 50,
  },
  
  // Directional
  {
    id: 'north-arrow',
    name: 'North Arrow',
    category: 'directional',
    source: require('../../../assets/stickers/directional/north-arrow.png'),
    defaultWidth: 60,
    defaultHeight: 80,
  },
  {
    id: 'slope-arrow',
    name: 'Slope Direction',
    category: 'directional',
    source: require('../../../assets/stickers/directional/slope-arrow.png'),
    defaultWidth: 100,
    defaultHeight: 40,
  },
];

// components/Modals/StickerPicker.tsx

import React, { useState } from 'react';
import {
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { DEFAULT_STICKERS, STICKER_CATEGORIES, StickerDefinition } from '../../constants/stickers';

interface StickerPickerProps {
  visible: boolean;
  onClose: () => void;
  onSelectSticker: (sticker: StickerDefinition) => void;
}

export const StickerPicker: React.FC<StickerPickerProps> = ({
  visible,
  onClose,
  onSelectSticker,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('damage');

  const filteredStickers = DEFAULT_STICKERS.filter(
    s => s.category === selectedCategory
  );

  const renderSticker = ({ item }: { item: StickerDefinition }) => (
    <TouchableOpacity
      style={styles.stickerItem}
      onPress={() => {
        onSelectSticker(item);
        onClose();
      }}
    >
      <Image source={item.source} style={styles.stickerImage} resizeMode="contain" />
      <Text style={styles.stickerName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Select Sticker</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Category tabs */}
          <View style={styles.categoryTabs}>
            {STICKER_CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryTab,
                  selectedCategory === cat.id && styles.categoryTabActive,
                ]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <Text
                  style={[
                    styles.categoryTabText,
                    selectedCategory === cat.id && styles.categoryTabTextActive,
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Sticker grid */}
          <FlatList
            data={filteredStickers}
            renderItem={renderSticker}
            keyExtractor={item => item.id}
            numColumns={3}
            contentContainerStyle={styles.stickerGrid}
          />
        </View>
      </View>
    </Modal>
  );
};

const { width } = Dimensions.get('window');
const STICKER_SIZE = (width - 80) / 3;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    color: '#999',
    fontSize: 24,
  },
  categoryTabs: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 12,
    flexWrap: 'wrap',
  },
  categoryTab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
    marginBottom: 8,
    borderRadius: 16,
    backgroundColor: '#333',
  },
  categoryTabActive: {
    backgroundColor: '#FF6B35', // Zuper orange
  },
  categoryTabText: {
    color: '#999',
    fontSize: 12,
  },
  categoryTabTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  stickerGrid: {
    padding: 16,
  },
  stickerItem: {
    width: STICKER_SIZE,
    height: STICKER_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  stickerImage: {
    width: STICKER_SIZE - 32,
    height: STICKER_SIZE - 48,
  },
  stickerName: {
    color: '#999',
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },
});
```

### Main Toolbar Component

```typescript
// components/Toolbar/MainToolbar.tsx

import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { ToolType } from '../../types/annotations';

// You'll need to add your own icons or use a library like react-native-vector-icons
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface MainToolbarProps {
  currentTool: ToolType;
  onToolChange: (tool: ToolType) => void;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onColorPress: () => void;
  onStrokeWidthPress: () => void;
  canUndo: boolean;
  canRedo: boolean;
  currentColor: string;
}

const TOOLS: { type: ToolType; icon: string; label: string }[] = [
  { type: 'select', icon: 'cursor-default', label: 'Select' },
  { type: 'freehand', icon: 'draw', label: 'Draw' },
  { type: 'arrow', icon: 'arrow-right', label: 'Arrow' },
  { type: 'rectangle', icon: 'square-outline', label: 'Rectangle' },
  { type: 'ellipse', icon: 'circle-outline', label: 'Circle' },
  { type: 'polyline', icon: 'vector-polyline', label: 'Polyline' },
  { type: 'text', icon: 'format-text', label: 'Text' },
  { type: 'sticker', icon: 'sticker-emoji', label: 'Sticker' },
  { type: 'fisheye', icon: 'magnify', label: 'Magnify' },
];

export const MainToolbar: React.FC<MainToolbarProps> = ({
  currentTool,
  onToolChange,
  onUndo,
  onRedo,
  onSave,
  onColorPress,
  onStrokeWidthPress,
  canUndo,
  canRedo,
  currentColor,
}) => {
  return (
    <View style={styles.container}>
      {/* Tools row */}
      <View style={styles.toolsRow}>
        {TOOLS.map(tool => (
          <TouchableOpacity
            key={tool.type}
            style={[
              styles.toolButton,
              currentTool === tool.type && styles.toolButtonActive,
            ]}
            onPress={() => onToolChange(tool.type)}
          >
            {/* Replace with actual icon component */}
            <Text style={styles.toolIcon}>{tool.icon.charAt(0).toUpperCase()}</Text>
            <Text style={styles.toolLabel}>{tool.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Actions row */}
      <View style={styles.actionsRow}>
        {/* Color picker */}
        <TouchableOpacity style={styles.actionButton} onPress={onColorPress}>
          <View style={[styles.colorIndicator, { backgroundColor: currentColor }]} />
        </TouchableOpacity>

        {/* Stroke width */}
        <TouchableOpacity style={styles.actionButton} onPress={onStrokeWidthPress}>
          <View style={styles.strokeIndicator}>
            <View style={[styles.strokeLine, { height: 3 }]} />
          </View>
        </TouchableOpacity>

        {/* Undo */}
        <TouchableOpacity
          style={[styles.actionButton, !canUndo && styles.actionButtonDisabled]}
          onPress={onUndo}
          disabled={!canUndo}
        >
          <Text style={styles.actionIcon}>↩</Text>
        </TouchableOpacity>

        {/* Redo */}
        <TouchableOpacity
          style={[styles.actionButton, !canRedo && styles.actionButtonDisabled]}
          onPress={onRedo}
          disabled={!canRedo}
        >
          <Text style={styles.actionIcon}>↪</Text>
        </TouchableOpacity>

        {/* Save */}
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    paddingBottom: 20, // Safe area
  },
  toolsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  toolButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  toolButtonActive: {
    backgroundColor: '#FF6B35',
  },
  toolIcon: {
    color: '#fff',
    fontSize: 18,
  },
  toolLabel: {
    color: '#999',
    fontSize: 10,
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonDisabled: {
    opacity: 0.3,
  },
  actionIcon: {
    color: '#fff',
    fontSize: 20,
  },
  colorIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#fff',
  },
  strokeIndicator: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  strokeLine: {
    width: 20,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  saveButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
```

---

## Color Palette & Theming

```typescript
// constants/colors.ts

export const ANNOTATION_COLORS = {
  // Primary annotation colors
  red: '#FF3B30',
  orange: '#FF9500',
  yellow: '#FFCC00',
  green: '#34C759',
  blue: '#007AFF',
  purple: '#AF52DE',
  pink: '#FF2D55',
  
  // Neutral colors
  white: '#FFFFFF',
  lightGray: '#D1D1D6',
  gray: '#8E8E93',
  darkGray: '#636366',
  black: '#000000',
};

export const QUICK_COLOR_PALETTE = [
  ANNOTATION_COLORS.red,
  ANNOTATION_COLORS.orange,
  ANNOTATION_COLORS.yellow,
  ANNOTATION_COLORS.green,
  ANNOTATION_COLORS.blue,
  ANNOTATION_COLORS.white,
  ANNOTATION_COLORS.black,
];

export const STROKE_WIDTHS = [2, 4, 6, 8, 12];

export const ZUPER_BRAND_COLORS = {
  primary: '#FF6B35', // Zuper orange
  secondary: '#1A1A1A',
  background: '#000000',
  surface: '#1A1A1A',
  border: '#333333',
  text: '#FFFFFF',
  textSecondary: '#999999',
};
```

---

## Testing & Quality Assurance

### Unit Tests to Implement

```typescript
// __tests__/geometryUtils.test.ts

import {
  calculateDistance,
  isPointInRectangle,
  isPointInEllipse,
  calculateArrowHeadPoints,
  normalizeAngle,
} from '../utils/geometryUtils';

describe('geometryUtils', () => {
  describe('calculateDistance', () => {
    it('calculates distance between two points', () => {
      expect(calculateDistance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);
    });
  });

  describe('isPointInRectangle', () => {
    it('returns true for point inside rectangle', () => {
      expect(
        isPointInRectangle(
          { x: 50, y: 50 },
          { x: 0, y: 0, width: 100, height: 100 }
        )
      ).toBe(true);
    });

    it('returns false for point outside rectangle', () => {
      expect(
        isPointInRectangle(
          { x: 150, y: 50 },
          { x: 0, y: 0, width: 100, height: 100 }
        )
      ).toBe(false);
    });
  });

  // Add more tests...
});
```

### Manual Testing Checklist

- [ ] Freehand drawing smooth at 60fps
- [ ] Arrows can be rotated to any angle
- [ ] Arrow heads update correctly when rotated
- [ ] Shapes (rect, ellipse) can be resized from all handles
- [ ] Shape rotation maintains correct center pivot
- [ ] Polyline points can be tapped to add vertices
- [ ] Polyline closes when tapping near origin
- [ ] Stickers can be placed, moved, rotated, scaled
- [ ] Fisheye magnifier shows zoomed area correctly
- [ ] Color picker applies to selected element
- [ ] Undo/redo works for all operations
- [ ] Save produces correct image with annotations baked in
- [ ] Save as copy creates new file
- [ ] Works on both Android phones tested

---

## Performance Optimization Tips

1. **Use `useMemo` and `useCallback`** for expensive calculations and gesture handlers
2. **Limit re-renders** by separating annotation list from active drawing state
3. **Use Skia's `Picture` for caching** completed annotations that don't change
4. **Debounce annotation updates** during drawing to reduce state changes
5. **Use worklets** for gesture handlers to run on UI thread
6. **Lazy load sticker images** only when category is selected

---

## Known Issues & Workarounds

### Issue: Skia Canvas not capturing in react-native-view-shot
**Workaround**: Wrap Skia Canvas in a View with `collapsable={false}` attribute

### Issue: Gesture conflicts between pan and tap for polyline tool
**Workaround**: Use `Gesture.Exclusive()` with timing thresholds to distinguish tap from pan start

### Issue: Large images causing memory issues
**Workaround**: Resize image to screen dimensions before loading into editor, save at original resolution by compositing

---

## Competitor Reference

Based on the PRD comparison table:

| Feature | Zuper (Current) | CompanyCam | JobNimbus | Target |
|---------|-----------------|------------|-----------|--------|
| Freehand drawing | ✅ | ✅ | ✅ | ✅ |
| Shape annotations | ⚠️ Limited | ✅ | ✅ | ✅ Full |
| Arrows | ✅ | ✅ | ✅ | ✅ Rotatable |
| Text styling/colors | ⚠️ Color only | ✅ Advanced | ✅ | ✅ Advanced |
| Color selection | ❌ | ✅ | ✅ | ✅ |
| Stickers/stamps | ❌ | ✅ | ✅ | ✅ |
| Date/time stamping | ❌ | ✅ | ❌ | ✅ |
| Undo/reset | ✅ | ✅ Clear All | ✅ | ✅ Full undo stack |
| Rotate image | ✅ | ✅ | ✅ | ✅ |
| Save options | ✅ | ✅ + copy | ✅ + copy | ✅ + copy |
| Fisheye/zoom | ❌ | ❌ | ❌ | ✅ (differentiator!) |

---

## Final Notes for Cursor Implementation

1. **Start with the canvas component** - get basic drawing working first
2. **Add tools incrementally** - freehand → shapes → arrows → text → stickers → fisheye
3. **Test on real Android device** frequently - emulator performance differs
4. **Use the existing Photo Feed styles** for consistent UI
5. **Follow Zuper design language** - dark theme, orange accents
6. **Ask clarifying questions** if any requirement is ambiguous

**Priority Order for Implementation:**
1. AnnotationCanvas with freehand drawing
2. Shape tools (rectangle, ellipse)
3. Arrow tool with rotation
4. Polyline/polygon tool
5. Text annotations
6. Undo/redo system
7. Color picker
8. Sticker system
9. Fisheye effect
10. Save functionality

Good luck building this editor! 🚀
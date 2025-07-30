# Enhanced Collage System

A powerful, flexible, and accessible web-based collage creation system supporting 2–6 images with multiple layouts, responsive design, customization options, and integrated Google Login.

---

## Features

### Supported Image Counts and Layouts

#### 2 Images
- **2×1 (Vertical):** Two images stacked vertically
- **1×2 (Horizontal):** Two images side by side

#### 3 Images
- **3×1 (Vertical):** Three images stacked vertically
- **1×3 (Horizontal):** Three images side by side
- **2×2 with 1 empty:** Grid layout with one empty space

#### 4 Images
- **2×2 (Square):** Four images in a square grid
- **4×1 (Vertical):** Four images stacked vertically
- **1×4 (Horizontal):** Four images side by side

#### 5 Images
- **5×1 (Vertical):** Five images stacked vertically
- **1×5 (Horizontal):** Five images side by side
- **2×3 with 1 empty:** Grid layout with one empty space

#### 6 Images
- **2×3:** Two rows, three columns
- **3×2:** Three rows, two columns
- **6×1 (Vertical):** Six images stacked vertically
- **1×6 (Horizontal):** Six images side by side

---

### User Experience Features

- **Drag & Drop Upload:** Easily upload images by dragging them into the upload area
- **Image Reordering:** Drag and drop images to reorder them within the collage
- **Auto Layout Suggestions:** Automatically suggests the optimal layout based on image count
- **Real-time Preview:** See your collage update in real-time as you make changes
- **Dynamic Layout Filtering:** Filter layouts based on the number of uploaded images
- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile devices

---

### Customization Options

- **Canvas Sizes:** Choose from multiple preset canvas sizes (800×600, 1024×768, 1200×900, 1600×1200)
- **Image Spacing:** Adjust the spacing between images (0–20px)
- **Background Color:** Customize the background color of your collage
- **Corner Radius:** Add rounded corners to images (0–20px)

---

### Accessibility Features

- **Keyboard Navigation:** Full keyboard accessibility support
- **Screen Reader Support:** Proper ARIA labels and semantic HTML
- **High Contrast Mode:** Supports system high contrast preferences
- **Reduced Motion:** Respects user's reduced motion preferences

---

### Google Login Integration

The Enhanced Collage System supports authentication with Google via OAuth 2.0 for a streamlined and personalized experience.

#### Key Features

- **One-click Google Sign-In:** Quick login without creating a new account
- **OAuth 2.0 Security:** Utilizes Google’s secure OAuth flow
- **User Profile Access:** Retrieves basic profile information (name, email, avatar) after user consent
- **Session Management:** Maintains user sessions with secure tokens
- **Seamless UX:** Integrated with the existing UI

#### Technical Implementation

- Loads Google API JS client dynamically
- Uses a registered Google OAuth client ID
- Login button triggers Google Sign-In flow
- On successful login, retrieves user info and updates UI
- Handles login errors gracefully

#### Example Usage

1. Click the “Sign in with Google” button.
2. Grant permission on the Google consent screen.
3. Upon success, your profile name and avatar appear in the app.
4. Log out anytime to revoke access.

---

## Technical Implementation

### Architecture

- **Vanilla JavaScript:** Modular, class-based architecture
- **CollageSystem Class:** Main controller for all collage functionality
- **COLLAGE_LAYOUTS Config:** Comprehensive layout definitions
- **Event-Driven UI:** Responsive updates based on user actions
- **Canvas API:** High-quality image rendering for download

### Key Methods

- `populateLayoutOptions(filterCount)`: Dynamically populates available layout options and suggests optimal layouts
- `createCollage()`: Generates collage preview with arrangement, spacing, and styling
- `validateImageCount(count)`: Ensures image count is between 2–6 and gives feedback
- `generateCanvasFromCollage()`: Produces a downloadable, high-quality canvas reflecting all customizations

### Layout Configuration

Each layout in `COLLAGE_LAYOUTS` includes:
- **Grid Definition:** Rows and columns
- **Cell Mapping:** Positioning for each image
- **Metadata:** Name, description, and optimal use cases

### Error Handling

- **File Type Validation:** Only accepts image files
- **Image Count Limits:** Max 6 images
- **Layout Compatibility:** Only shows layouts for current image count
- **User Feedback:** Clear messages for errors and successes

---

## Browser Compatibility

- **Modern Browsers:** Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Mobile:** iOS Safari 12+, Chrome Mobile 60+
- **Progressive Enhancement:** Graceful degradation for older browsers

---

## Usage Instructions

1. **Sign in with Google:** (Optional) for a personalized experience
2. **Upload Images:** Click upload area or drag & drop 2–6 images
3. **Arrange Images:** Drag images to reorder
4. **Select Layout:** Pick from filtered layouts based on image count
5. **Customize:** Adjust spacing, background color, and corner radius
6. **Create Collage:** Click “Create Collage” to preview
7. **Download:** Save your creation with “Download Collage”

---

## File Structure

```
collage-system/
├── index.html          # Main HTML interface
├── styles.css          # Responsive CSS styling
├── script.js           # JavaScript functionality
└── README.md           # Documentation
```

---

## Performance Considerations

- **Efficient Processing:** FileReader API for client-side image handling
- **Optimized Rendering:** Canvas for high-quality output
- **Memory Management:** Cleans up image references for efficiency
- **Responsive Images:** Adapts to viewport size

---

## Future Enhancements

- More layout patterns for each image count
- Advanced image editing (crop, rotate, filters)
- Social sharing options
- Template system for commonly used layouts
- Batch processing for multiple collages

---

## 📄 License

This project is licensed under the [Apache License 2.0](https://github.com/ThisIs-Developer/Collage-App/blob/main/LICENSE).

# HTML Configuration for Mobile Optimization

Since this is a React application bundled by Vite, you'll need to ensure your `index.html` file (if you create one locally) includes the following mobile-optimized meta tags:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    
    <!-- Critical Mobile Meta Tags -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
    
    <!-- iOS-specific Meta Tags -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="Mentorship" />
    
    <!-- Theme Color (matches your app's primary color) -->
    <meta name="theme-color" content="#3B82F6" />
    <meta name="msapplication-TileColor" content="#3B82F6" />
    
    <!-- Improve text rendering on mobile -->
    <meta name="format-detection" content="telephone=no" />
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    
    <!-- Apple Touch Icons (if you add PWA support later) -->
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    
    <title>Mentorship Platform</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/App.tsx"></script>
  </body>
</html>
```

## Key Meta Tag Explanations

### Viewport Meta Tag
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
```
- `width=device-width`: Sets the page width to the device's screen width
- `initial-scale=1.0`: Sets the initial zoom level when the page loads
- `maximum-scale=5.0`: Allows users to zoom up to 5x (accessibility requirement)
- `user-scalable=yes`: Allows pinch-to-zoom (required for accessibility)

### iOS Web App Meta Tags
These make your web app behave more like a native app when added to the iOS home screen:
- `apple-mobile-web-app-capable`: Enables full-screen mode
- `apple-mobile-web-app-status-bar-style`: Controls the iOS status bar appearance
- `apple-mobile-web-app-title`: Sets the name shown on the home screen

### Format Detection
```html
<meta name="format-detection" content="telephone=no" />
```
Prevents iOS from automatically detecting and linking phone numbers (unless you want this behavior).

## Current Status

Your application already includes:
✅ Responsive Tailwind CSS classes (sm:, md:, lg: breakpoints)
✅ Touch-optimized buttons with `touch-manipulation` class
✅ Mobile-friendly scrolling with `scrollbar-hide` utility
✅ Responsive layouts that adapt to mobile screens
✅ Proper input sizing for mobile keyboards

The app is already optimized for mobile browsers and will work well on smartphones and tablets!

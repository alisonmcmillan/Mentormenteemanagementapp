# App Icon & Asset Requirements

## 📱 iOS App Icons

### Required Sizes
Apple requires multiple icon sizes for different contexts. Here's the complete list:

| Size (px) | Usage | Notes |
|-----------|-------|-------|
| 1024x1024 | App Store | Required, no alpha channel, no transparency |
| 180x180 | iPhone (3x) | @3x |
| 167x167 | iPad Pro | @2x |
| 152x152 | iPad | @2x |
| 120x120 | iPhone (2x/3x) | @2x and @3x |
| 87x87 | iPhone | @3x |
| 80x80 | iPad | @2x |
| 76x76 | iPad | @1x |
| 60x60 | iPhone | @2x |
| 58x58 | iPhone/iPad | @2x |
| 40x40 | iPad | @1x and @2x |
| 29x29 | iPhone/iPad Settings | @2x and @3x |
| 20x20 | iPad Notifications | @1x, @2x, @3x |

### Design Guidelines
- **No transparency**: iOS doesn't support transparent icons
- **No rounded corners**: iOS applies the rounded corners automatically
- **Safe area**: Keep important content within center 80% of canvas
- **Background**: Should fill the entire 1024x1024 canvas
- **Colors**: Use vibrant, recognizable colors
- **Simplicity**: Icons should be simple and recognizable at small sizes

### iOS Icon Generator Tools
- **App Icon Generator**: https://appicon.co/
- **MakeAppIcon**: https://makeappicon.com/
- **Icon Generator (Xcode)**: Built into Xcode

---

## 🤖 Android App Icons

### Required Sizes (Adaptive Icons)

Android uses adaptive icons (introduced in API 26). You need:

1. **Foreground Layer** (with transparency)
2. **Background Layer** (solid color or image)

| Density | Size (px) | Usage |
|---------|-----------|-------|
| ldpi | 36x36 | Low density (deprecated but sometimes needed) |
| mdpi | 48x48 | Medium density |
| hdpi | 72x72 | High density |
| xhdpi | 96x96 | Extra-high density |
| xxhdpi | 144x144 | Extra-extra-high density |
| xxxhdpi | 192x192 | Extra-extra-extra-high density |
| Google Play | 512x512 | Play Store listing (required) |

### Design Guidelines
- **Safe zone**: Important content should be in the center 66% of canvas
- **Outer 33%**: May be masked by different shapes on different devices
- **Background**: Can be solid color or simple gradient
- **Foreground**: Should have transparency where appropriate
- **Testing**: Test how your icon looks with different mask shapes (circle, square, squircle)

### Android Icon Generator Tools
- **Android Asset Studio**: https://romannurik.github.io/AndroidAssetStudio/
- **App Icon Generator**: https://appicon.co/
- **Android Studio**: Built-in Image Asset tool

---

## 🎨 Splash Screen Images

### iOS Splash Screens

Apple requires different splash screen sizes for various devices:

| Device | Size (px) | Notes |
|--------|-----------|-------|
| iPhone 15 Pro Max | 1290x2796 | @3x |
| iPhone 15 Pro | 1179x2556 | @3x |
| iPhone 15 | 1170x2532 | @3x |
| iPhone 14 Pro Max | 1290x2796 | @3x |
| iPhone 14 Pro | 1179x2556 | @3x |
| iPhone SE (3rd gen) | 750x1334 | @2x |
| iPad Pro 12.9" | 2048x2732 | @2x |
| iPad Pro 11" | 1668x2388 | @2x |
| iPad Air | 1620x2160 | @2x |
| iPad | 1536x2048 | @2x |

**Recommendation**: Create a single 2732x2732px image with centered logo. Capacitor will handle the resizing.

### Android Splash Screens

Android splash screens are simpler with the new Splash Screen API (Android 12+):

| Element | Size | Notes |
|---------|------|-------|
| Icon | 288x288dp | Centered icon/logo |
| Background | Solid color | Use your brand color |

**Recommendation**: Use a 1080x1920px image with centered logo, or better yet, use a simple logo + background color.

---

## 🖼️ Screenshots for App Stores

### iOS App Store Screenshots

Required for each device size you support:

| Device Type | Required Sizes | Orientation |
|-------------|----------------|-------------|
| 6.7" Display (iPhone 15 Pro Max) | 1290x2796 or 2796x1290 | Portrait or Landscape |
| 5.5" Display (older iPhones) | 1242x2208 or 2208x1242 | Portrait or Landscape |
| 12.9" iPad Pro | 2048x2732 or 2732x2048 | Portrait or Landscape |

- **Minimum**: 1 screenshot per device type
- **Maximum**: 10 screenshots per device type
- **Format**: PNG or JPEG, sRGB color space
- **No transparency**

**Pro Tip**: Focus on iPhone 6.7" and iPad 12.9" as these are the current requirements.

### Google Play Store Screenshots

| Device Type | Size Requirements | Quantity |
|-------------|-------------------|----------|
| Phone | Min: 320px, Max: 3840px | 2-8 screenshots |
| 7" Tablet | Min: 320px, Max: 3840px | Optional |
| 10" Tablet | Min: 320px, Max: 3840px | Optional |

**Recommended Phone Size**: 1080x1920px (portrait) or 1920x1080px (landscape)

- **Format**: PNG or JPEG, 24-bit RGB
- **Aspect ratio**: 16:9 or 9:16

---

## 📏 Quick Design Templates

### App Icon Template (1024x1024)

```
┌─────────────────────────────┐
│         80px margin          │
│  ┌───────────────────────┐  │
│  │                       │  │
│  │   Logo/Icon Content   │  │
│  │      864x864px        │  │
│  │    (Safe Area)        │  │
│  │                       │  │
│  └───────────────────────┘  │
│         80px margin          │
└─────────────────────────────┘
```

### Splash Screen Template (2732x2732)

```
┌─────────────────────────────┐
│                             │
│                             │
│      ┌───────────┐          │
│      │   Logo    │          │
│      │  512x512  │          │
│      └───────────┘          │
│                             │
│   Mentorship Platform       │
│                             │
└─────────────────────────────┘
```

---

## 🎨 Design Tool Recommendations

### Professional Tools
1. **Figma** - Free, web-based, great for app design
2. **Sketch** - Mac only, industry standard
3. **Adobe Illustrator** - Vector graphics, professional
4. **Adobe Photoshop** - Raster graphics, professional

### Free Tools
1. **GIMP** - Free Photoshop alternative
2. **Inkscape** - Free Illustrator alternative
3. **Canva** - Simple, template-based design
4. **Affinity Designer** - One-time purchase, very capable

### Online Icon Generators
1. **AppIcon.co** - Upload 1024x1024, get all sizes
2. **MakeAppIcon** - Similar to AppIcon.co
3. **Ape Tools** - Generate all required sizes

---

## ✅ Icon Checklist

Before submitting your app:

### iOS
- [ ] 1024x1024 App Store icon (no transparency, no rounded corners)
- [ ] All icon sizes generated in AppIcon.appiconset
- [ ] Icons tested in Xcode simulator
- [ ] Icons look good on actual device
- [ ] Splash screens for required device sizes

### Android
- [ ] 512x512 Play Store icon
- [ ] Adaptive icon foreground layer (with transparency)
- [ ] Adaptive icon background (color or image)
- [ ] All density sizes generated (mdpi to xxxhdpi)
- [ ] Tested with different shapes (circle, square, squircle)
- [ ] Splash screen configured

### Both Platforms
- [ ] Brand colors are consistent
- [ ] Logo is recognizable at small sizes
- [ ] Icons follow platform design guidelines
- [ ] No copyright issues with images/logos
- [ ] High resolution source files backed up

---

## 💡 Pro Tips

1. **Start with vector graphics** (SVG, AI) - they scale perfectly
2. **Keep it simple** - Complex icons don't work at small sizes
3. **Use high contrast** - Icons should be visible on any background
4. **Test at actual size** - View your icon at 60x60px on your phone
5. **Follow platform guidelines** - Don't make an iOS-style icon for Android
6. **Brand consistency** - Use your brand colors and style
7. **No text** - Icons with text are hard to read at small sizes
8. **Future-proof** - Save high-resolution source files (at least 1024x1024)

---

## 📚 Official Guidelines

- **Apple Human Interface Guidelines**: https://developer.apple.com/design/human-interface-guidelines/app-icons
- **Android Material Design Icons**: https://material.io/design/iconography/product-icons.html
- **iOS App Store Screenshot Specs**: https://help.apple.com/app-store-connect/#/devd274dd925
- **Google Play Screenshot Specs**: https://support.google.com/googleplay/android-developer/answer/9866151

---

## 🎯 Mentorship Platform Recommendations

For your Mentorship Platform, consider icons with these elements:

1. **Mentorship symbols**: Handshake, connection, growth
2. **Colors**: Professional blue (#3B82F6 from your app)
3. **Style**: Modern, clean, trustworthy
4. **Elements**: People, chat bubbles, calendar, or book icons

### Example Concepts:
- Two people silhouettes connecting
- Speech bubble with a lightbulb
- Upward arrow with support hand
- Open book with chat bubble
- Calendar with checkmark

Good luck with your icon design! 🎨

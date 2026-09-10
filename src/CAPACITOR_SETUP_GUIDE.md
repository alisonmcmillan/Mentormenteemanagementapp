# Complete Capacitor Setup Guide for iOS & Android

This guide will walk you through converting your Mentorship Platform web app into native iOS and Android applications that can be published to the Apple App Store and Google Play Store.

---

## 📋 Prerequisites

### Required Software
1. **Node.js** (v18 or later)
   - Download: https://nodejs.org/
   - Verify: `node --version`

2. **npm or yarn**
   - Comes with Node.js
   - Verify: `npm --version`

3. **For iOS Development:**
   - **macOS** (Required - iOS apps can only be built on Mac)
   - **Xcode** (latest version from Mac App Store)
   - **Xcode Command Line Tools**: `xcode-select --install`
   - **CocoaPods**: `sudo gem install cocoapods`

4. **For Android Development:**
   - **Android Studio** (Download: https://developer.android.com/studio)
   - **Java Development Kit (JDK)** 11 or later
   - **Android SDK** (installed via Android Studio)

### Developer Accounts
- **Apple Developer Account**: $99/year (https://developer.apple.com/)
- **Google Play Console Account**: $25 one-time fee (https://play.google.com/console/)

---

## 🚀 Step 1: Download and Setup Your Project

1. **Download your code** from Figma Make
2. **Extract** the project to a folder on your computer
3. **Open Terminal/Command Prompt** and navigate to the project folder:
   ```bash
   cd /path/to/your/project
   ```

4. **Initialize npm** (if not already done):
   ```bash
   npm init -y
   ```

5. **Install dependencies** (create a package.json if needed):
   ```bash
   npm install react react-dom @types/react @types/react-dom
   npm install -D vite @vitejs/plugin-react typescript
   npm install @supabase/supabase-js lucide-react
   ```

---

## 🔧 Step 2: Install Capacitor

1. **Install Capacitor Core and CLI:**
   ```bash
   npm install @capacitor/core
   npm install -D @capacitor/cli
   ```

2. **Initialize Capacitor:**
   ```bash
   npx cap init
   ```
   
   When prompted:
   - **App name**: Mentorship Platform
   - **App ID**: com.mentorship.platform (or your custom domain in reverse)
   - **Web asset directory**: dist

3. **Install platform packages:**
   ```bash
   npm install @capacitor/ios @capacitor/android
   ```

4. **Install useful plugins:**
   ```bash
   npm install @capacitor/splash-screen @capacitor/status-bar @capacitor/keyboard
   ```

---

## 📱 Step 3: Build Your Web App

Before adding native platforms, you need to build your web app:

1. **Create a vite.config.ts** file in your project root (if not exists):
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     build: {
       outDir: 'dist'
     }
   })
   ```

2. **Update package.json** to add build scripts:
   ```json
   {
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview"
     }
   }
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

---

## 🍎 Step 4: iOS Setup

### 4.1 Add iOS Platform

```bash
npx cap add ios
```

### 4.2 Open in Xcode

```bash
npx cap open ios
```

### 4.3 Configure in Xcode

1. **Select your project** in the navigator (left panel)
2. **Select the target** (under "Targets")
3. **Signing & Capabilities tab:**
   - Check "Automatically manage signing"
   - Select your **Team** (your Apple Developer account)
   - Xcode will generate a provisioning profile

4. **General tab:**
   - Set **Display Name**: Mentorship Platform
   - Set **Bundle Identifier**: com.mentorship.platform
   - Set **Version**: 1.0.0
   - Set **Build**: 1
   - Set **Deployment Target**: iOS 13.0 or later

5. **Info tab:**
   - Add privacy descriptions if needed (camera, location, etc.)

### 4.4 Update Info.plist

In Xcode, find `Info.plist` and add these entries (if you need camera/photo access):

```xml
<key>NSCameraUsageDescription</key>
<string>This app requires camera access to upload photos</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>This app requires photo library access to upload photos</string>
```

### 4.5 Build and Test on Simulator

1. Select a simulator (e.g., iPhone 15 Pro)
2. Click the **Play button** (▶) or press `Cmd + R`
3. The app should launch in the iOS simulator

### 4.6 Test on Physical Device

1. Connect your iPhone via USB
2. Select your device in Xcode's device dropdown
3. Click **Play** to build and install on your device
4. **First time only**: Go to Settings > General > VPN & Device Management > Trust your developer profile

---

## 🤖 Step 5: Android Setup

### 5.1 Add Android Platform

```bash
npx cap add android
```

### 5.2 Open in Android Studio

```bash
npx cap open android
```

Wait for Android Studio to finish indexing and syncing.

### 5.3 Configure in Android Studio

1. **Open `android/app/build.gradle`** and verify:
   ```gradle
   android {
       compileSdkVersion 34
       defaultConfig {
           applicationId "com.mentorship.platform"
           minSdkVersion 22
           targetSdkVersion 34
           versionCode 1
           versionName "1.0.0"
       }
   }
   ```

2. **Update app name** in `android/app/src/main/res/values/strings.xml`:
   ```xml
   <resources>
       <string name="app_name">Mentorship Platform</string>
   </resources>
   ```

### 5.4 Build and Test on Emulator

1. **Create an emulator** if you don't have one:
   - Tools > Device Manager > Create Device
   - Select a phone (e.g., Pixel 6)
   - Select a system image (e.g., API 34)
   
2. **Run the app:**
   - Click the **Play button** (▶) or select Run > Run 'app'
   - Select your emulator
   - The app will build and launch

### 5.5 Test on Physical Device

1. **Enable Developer Mode** on your Android phone:
   - Settings > About Phone > Tap "Build Number" 7 times
   
2. **Enable USB Debugging**:
   - Settings > Developer Options > USB Debugging (ON)
   
3. **Connect via USB** and select your device in Android Studio
4. Click **Play** to install and run

---

## 🔄 Step 6: Sync Changes

Every time you make changes to your web app:

1. **Build the web app:**
   ```bash
   npm run build
   ```

2. **Sync with Capacitor:**
   ```bash
   npx cap sync
   ```

3. **For iOS**, re-run from Xcode
4. **For Android**, re-run from Android Studio

### Quick Commands

```bash
# Build and sync iOS
npm run build && npx cap sync ios && npx cap open ios

# Build and sync Android
npm run build && npx cap sync android && npx cap open android
```

---

## 🎨 Step 7: Add App Icons and Splash Screens

### 7.1 Prepare Assets

Create the following images:

- **App Icon**: 1024x1024px PNG (no transparency, no rounded corners)
- **Splash Screen**: 2732x2732px PNG (centered logo on solid background)

### 7.2 iOS Icons

1. Use a tool like **Icon Generator** or **App Icon Generator**
2. Generate all required sizes
3. Drag the generated `AppIcon.appiconset` folder into Xcode:
   - Navigate to `App > App > Assets.xcassets`
   - Replace the existing AppIcon

### 7.3 Android Icons

1. In Android Studio: Right-click `res` folder > New > Image Asset
2. Select "Launcher Icons"
3. Upload your 1024x1024 icon
4. Click "Next" > "Finish"

### 7.4 Splash Screens

Install the Capacitor Assets plugin:

```bash
npm install -D @capacitor/assets
```

Create a `resources` folder in your project root and add:
- `icon.png` (1024x1024)
- `splash.png` (2732x2732)

Generate assets:

```bash
npx capacitor-assets generate
```

---

## 🏪 Step 8: Publish to App Stores

### 8.1 iOS App Store

#### Archive and Upload

1. In Xcode, select **Any iOS Device (arm64)** as the destination
2. **Product > Archive**
3. Wait for archiving to complete
4. In the Organizer window that opens:
   - Select your archive
   - Click **Distribute App**
   - Choose **App Store Connect**
   - Follow the prompts to upload

#### App Store Connect

1. Go to https://appstoreconnect.apple.com/
2. **Create a new app:**
   - Click the **+** button
   - Fill in app name, bundle ID, SKU
   
3. **Fill in required information:**
   - App description
   - Screenshots (required sizes)
   - Privacy policy URL
   - Support URL
   - Keywords
   - Category
   
4. **Submit for review**
   - Review typically takes 1-3 days
   
5. **Wait for approval** and your app goes live!

### 8.2 Google Play Store

#### Generate Signed APK/Bundle

1. In Android Studio: **Build > Generate Signed Bundle / APK**
2. Select **Android App Bundle** (recommended) or APK
3. **Create a new keystore:**
   - Key store path: Choose a secure location
   - Password: Create a strong password (SAVE THIS!)
   - Key alias: mentorship-key
   - Validity: 25+ years
   - Fill in certificate info
   
4. Click **Next** > **Release** > **Finish**
5. Find your `.aab` file in `android/app/release/`

#### Google Play Console

1. Go to https://play.google.com/console/
2. **Create app:**
   - App name: Mentorship Platform
   - Default language: English
   - App type: App
   - Free/Paid: Your choice
   
3. **Fill in Store Listing:**
   - Short description (80 chars)
   - Full description (4000 chars)
   - App icon (512x512)
   - Feature graphic (1024x500)
   - Screenshots (at least 2 per device type)
   - Privacy policy URL
   
4. **Content Rating:**
   - Complete the questionnaire
   
5. **App Content:**
   - Privacy policy
   - Ads declaration
   - Target audience
   
6. **Release:**
   - Go to Production > Create new release
   - Upload your `.aab` file
   - Add release notes
   - Review and roll out
   
7. **Review process** takes a few hours to a few days

---

## 🔐 Step 9: Security Considerations

### Environment Variables

Your app uses Supabase environment variables. Since mobile apps bundle all code, you need to:

1. **Ensure you're using the Supabase Anon Key** (which is safe for public exposure)
2. **Never include the Service Role Key** in the frontend code
3. **Row Level Security (RLS)** should be enabled on all Supabase tables

### HTTPS

- Capacitor requires HTTPS for your API endpoints
- Your Supabase URLs already use HTTPS ✅

---

## 🐛 Step 10: Common Issues and Solutions

### Issue: White screen on launch
**Solution**: Check the console in Xcode/Android Studio for JavaScript errors. Make sure `npm run build` completed successfully.

### Issue: API calls not working
**Solution**: Check CORS settings. Capacitor uses `capacitor://` and `https://` schemes. Update your server to allow these origins.

### Issue: Keyboard covering inputs
**Solution**: The Keyboard plugin handles this, but you may need to adjust:
```json
"Keyboard": {
  "resize": "native"
}
```

### Issue: App rejected by Apple
**Solution**: Common reasons:
- Missing privacy descriptions in Info.plist
- Not following Human Interface Guidelines
- Broken links (privacy policy, support URL)
- Misleading metadata

### Issue: Build fails in Xcode
**Solution**:
```bash
cd ios/App
pod install
```

### Issue: Android build fails
**Solution**: Update Gradle in `android/build.gradle`:
```gradle
dependencies {
    classpath 'com.android.tools.build:gradle:8.0.0'
}
```

---

## 📊 Step 11: Analytics and Monitoring

Consider adding:

- **Firebase Analytics**: Track user behavior
- **Sentry**: Error tracking and crash reporting
- **App Store Analytics**: Built-in analytics from Apple/Google

---

## 🔄 Step 12: Updates and Maintenance

### Code-Push Updates (Optional)

For instant updates of web assets (JS/CSS/HTML) without a full store review cycle, consider:

- **[Capgo](https://capgo.app)** (`@capgo/capacitor-updater`) — open-source client/backend option with channels, rollback, and it plugs into any CI/CD you already use ([docs](https://capgo.app/docs/))
- **Ionic Appflow Live Updates** — Ionic’s hosted live-update product (keep if you already use Appflow)
- **Capacitor Live Updates** (`@capacitor/live-updates`) — Ionic’s plugin path tied to Appflow channels
- ~~CodePush (Microsoft)~~ — App Center / CodePush was retired; do not start new Capacitor projects on it

Note: OTA only covers the web layer. Native plugin or permission changes still need a store binary.

### Regular Updates

1. Make changes to your web app
2. Increment version number
3. Build: `npm run build`
4. Sync: `npx cap sync`
5. Test on simulators/emulators
6. Archive and upload new version
7. Submit for review

---

## ✅ Final Checklist

Before submitting to app stores:

### iOS Checklist
- [ ] App builds without errors in Xcode
- [ ] Tested on multiple iOS versions (13+)
- [ ] All required screenshots prepared
- [ ] Privacy policy URL is live
- [ ] Support URL is live
- [ ] App icon is correct (1024x1024, no transparency)
- [ ] Info.plist has all required privacy descriptions
- [ ] App follows Apple Human Interface Guidelines

### Android Checklist
- [ ] App builds without errors in Android Studio
- [ ] Tested on multiple Android versions (API 22+)
- [ ] All required screenshots prepared
- [ ] Privacy policy URL is live
- [ ] App icon is correct (512x512)
- [ ] Feature graphic created (1024x500)
- [ ] Signed with production keystore (KEYSTORE BACKED UP!)
- [ ] Content rating completed

---

## 📚 Additional Resources

- **Capacitor Docs**: https://capacitorjs.com/docs
- **iOS Human Interface Guidelines**: https://developer.apple.com/design/human-interface-guidelines/
- **Android Material Design**: https://material.io/design
- **App Store Review Guidelines**: https://developer.apple.com/app-store/review/guidelines/
- **Google Play Policy**: https://play.google.com/about/developer-content-policy/

---

## 💡 Pro Tips

1. **Start with one platform** (iOS or Android) to learn the process
2. **Use TestFlight** (iOS) and **Internal Testing** (Android) to beta test
3. **Keep your keystore safe** - losing it means you can't update your Android app
4. **Version carefully** - Use semantic versioning (1.0.0, 1.0.1, 1.1.0, etc.)
5. **Test on real devices** - Simulators don't catch everything
6. **Read rejection feedback carefully** - App stores provide detailed reasons
7. **Plan for reviews** - First review can take 1-2 weeks, updates are faster

---

## 🆘 Need Help?

- **Capacitor Community**: https://ionic.io/community
- **Stack Overflow**: Tag questions with [capacitor]
- **Capacitor Discord**: https://discord.com/invite/UPYYRhtyzp

---

## 🎉 You're Ready!

Follow these steps carefully, and you'll have your Mentorship Platform running as native apps on iOS and Android. Good luck with your app launch! 🚀

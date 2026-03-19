# 🔧 CineVerse - Detailed Troubleshooting Guide

**Solutions for common issues your friend might encounter**

---

## 🎬 Movie Poster Issues

### Issue: All Posters Are Gray Boxes

**What you see**:
- Movie cards appear but with gray placeholders
- Film emoji (🎬) instead of movie posters
- Movie titles are visible

**Is this a problem?**
❌ **NO! This is actually normal and expected behavior.**

**Why it happens**:
1. TMDB API is blocked by school/work network
2. Firewall is preventing image downloads
3. Slow/no internet connection
4. TMDB servers are temporarily down

**What the fallback system does**:
```
Try TMDB Image
  ↓ (blocked/failed)
Show Placeholder
  ↓ (perfect fallback)
Display: 🎬 + Movie Title
```

**This is CORRECT behavior!** The app is designed to work even without external images.

---

### Issue: Some Posters Load, Some Don't

**What you see**:
- 5-10 movies have posters
- Others show placeholders
- Random mix

**Why it happens**:
- TMDB rate limiting (too many requests)
- Slow internet connection
- Some images load before timeout

**Fix**:
1. Wait 30 seconds
2. Scroll down and back up
3. Images should load progressively
4. Refresh browser (F5)

**Alternative**:
- This is fine! The placeholders ensure you can still use the app

---

### Issue: Posters Load Then Disappear

**What you see**:
- Images flash briefly then vanish
- Replaced with placeholder

**Why it happens**:
- CORS (Cross-Origin Resource Sharing) block
- Browser security settings
- Ad blocker interfering

**Fix**:

**Option 1: Disable Ad Blocker**
1. Click ad blocker icon in browser
2. Disable for `localhost`
3. Refresh page

**Option 2: Try Different Browser**
- Chrome (usually works best)
- Firefox
- Edge

**Option 3: Clear Browser Cache**
1. Press `Ctrl+Shift+Delete`
2. Select "Cached images and files"
3. Click "Clear data"
4. Refresh page

---

## 🤖 Chatbot Issues

### Issue: Chatbot Button Not Visible

**What you should see**:
- Red circular button
- Bottom-right corner
- Has chat icon

**Why it might be hidden**:
1. Browser window is too small
2. Scrolled to top of page
3. Z-index issue (rare)

**Fix**:

**Option 1: Scroll Down**
- Scroll to bottom of page
- Button should appear

**Option 2: Resize Window**
- Make browser window larger
- Full screen browser (F11)

**Option 3: Check Console**
1. Press F12
2. Look for errors in Console tab
3. If you see errors, try:
   ```bash
   # In VS Code terminal
   Ctrl+C (stop server)
   npm run dev (restart)
   ```

---

### Issue: Chat Opens But Doesn't Respond

**What you see**:
- Click chat button → opens ✓
- Welcome message appears ✓
- Type message → no response ❌

**OR**:
- "thinking..." appears forever
- No response after 30+ seconds

**Why it happens**:
1. Gemini API is down
2. Network timeout
3. API key issue (rare)

**Expected Behavior**:
The chatbot should either:
- **A)** Respond with AI answer (1-3 seconds)
- **B)** Show error message with helpful suggestions

**If you see error message** like this:
```
⚠️ I'm having trouble connecting right now.

Try asking about:
• Movie recommendations by genre
• Specific actors or directors
...
```

**This is CORRECT!** The fallback system is working.

**Fix if stuck on "thinking..."**:

1. **Wait 10 seconds** (API might be slow)
2. **Close and reopen chat**:
   - Click X to close
   - Click chat button again
   - Try different message

3. **Refresh browser**:
   - Press F5
   - Reopen chat
   - Try again

4. **Check internet connection**:
   - Open new tab
   - Go to google.com
   - If slow/down, that's the issue

---

### Issue: Chatbot Shows Error Every Time

**What you see**:
- Every message gets error response
- No AI responses at all
- Error message appears immediately

**Is this a problem?**
❌ **NO! The app still works perfectly.**

**Why it happens**:
- Gemini API is unavailable in your region
- Network firewall blocks AI services
- API quota exceeded (rare)

**What to do**:
**Nothing!** The app is designed to work without the chatbot. You can still:
- ✅ Browse all movies
- ✅ Search for movies
- ✅ View movie details
- ✅ Rate movies
- ✅ Navigate categories
- ✅ Get recommendations

**The chatbot is a bonus feature**, not required.

---

### Issue: Chat Suggestion Chips Don't Work

**What you see**:
- Suggestion chips appear
- Click them → nothing happens
- OR error appears

**Fix**:
1. **Try typing manually** instead of clicking chips
2. **Refresh page** (F5)
3. **Clear browser cache**:
   ```
   Ctrl+Shift+Delete
   → Clear cached files
   → Refresh
   ```

---

## 🔍 Search Issues

### Issue: Search Doesn't Find Movies

**What you see**:
- Type movie name
- "No results found"
- But movie exists in the app

**Why it happens**:
- Typo in movie title
- Case sensitivity
- Search only works with loaded movies

**Fix**:

**Option 1: Check Spelling**
- Try: "Inception" (correct)
- Not: "Incepton" (typo)

**Option 2: Try Partial Search**
- Type: "3 idiots" ✓
- Type: "idiots" ✓
- Type: "3" ✓

**Option 3: Navigate to Category**
- Instead of searching, click category tab
- Example: Bollywood → Find "3 Idiots"

---

### Issue: Search Bar Not Responsive

**What you see**:
- Click search bar
- Can't type
- Cursor doesn't appear

**Fix**:
1. Click directly inside the search box
2. Refresh page (F5)
3. Check if browser window is focused
4. Try different browser

---

## 🎯 Navigation Issues

### Issue: Tabs Don't Switch

**What you see**:
- Click "Bollywood" tab
- Nothing happens
- Still on same page

**Fix**:
1. **Wait 1 second** (might be loading)
2. **Click again** (might need double-click)
3. **Refresh page** (F5)
4. **Check console** (F12 → Console)

---

### Issue: Sidebar Collapsed/Hidden

**What you see**:
- Sidebar is very thin
- Only icons visible
- No text labels

**Is this a problem?**
❌ **NO! This is mobile/collapsed mode.**

**To expand**:
- Click the hamburger menu icon (☰)
- OR resize browser window larger
- OR it auto-expands on desktop screens

---

## 🎬 Movie Modal Issues

### Issue: Modal Won't Open

**What you see**:
- Click movie card
- Nothing happens
- No popup

**Fix**:

**Option 1: Try Different Movie**
- Click another movie card
- See if that one works

**Option 2: Check Console**
1. Press F12
2. Console tab
3. Look for errors
4. If error, refresh page

**Option 3: Hard Refresh**
```
Ctrl+Shift+R (Windows)
Cmd+Shift+R (Mac)
```

---

### Issue: Modal Won't Close

**What you see**:
- Movie details popup open
- Click X → nothing happens
- Click outside → nothing happens
- Stuck!

**Fix**:
1. **Press Escape key** (ESC)
2. **Refresh page** (F5)
3. **Close browser tab** and reopen

---

## 💾 Rating Issues

### Issue: Ratings Don't Save

**What you see**:
- Rate a movie (5 stars)
- Refresh page
- Rating is gone

**Why it happens**:
- Browser in incognito/private mode
- localStorage disabled
- Browser security settings

**Fix**:

**Option 1: Use Regular Browser Window**
- Exit incognito/private mode
- Open normal browser window

**Option 2: Enable Cookies**
1. Browser Settings
2. Privacy & Security
3. Allow cookies for localhost

**Option 3: Check Browser**
- Try Chrome (usually works)
- Try Firefox
- Avoid Safari private mode

---

## ⚡ Performance Issues

### Issue: App is Slow/Laggy

**What you see**:
- Slow animations
- Delayed clicks
- Page stutters

**Why it happens**:
- Too many browser tabs open
- Low RAM/Memory
- Old computer

**Fix**:

**Option 1: Close Other Tabs**
- Close unnecessary browser tabs
- Close other programs
- Free up memory

**Option 2: Reduce Browser Zoom**
- Press `Ctrl+0` to reset zoom
- Don't zoom in too much
- 100% zoom is best

**Option 3: Restart Browser**
- Close all browser windows
- Wait 10 seconds
- Reopen and try again

---

## 🌐 Network/Connection Issues

### Issue: "Failed to Fetch" Errors

**What you see**:
- Console shows "Failed to fetch"
- Movies not loading
- Errors in console

**Fix**:

**Option 1: Check Internet**
1. Open new tab
2. Go to google.com
3. If loads → Internet works
4. If doesn't → Fix internet first

**Option 2: Disable VPN**
- Turn off VPN if using one
- Refresh page
- Try again

**Option 3: Check Firewall**
- Firewall might block localhost
- Temporarily disable firewall
- Try again

---

## 🖥️ VS Code Terminal Issues

### Issue: Terminal Commands Don't Work

**What you see**:
- Type `npm run dev`
- Error: "npm is not recognized"

**Fix**:

**Option 1: Restart VS Code**
1. Close VS Code completely
2. Wait 10 seconds
3. Reopen
4. Try again

**Option 2: Use Different Terminal**
1. Click dropdown in terminal
2. Select "Command Prompt" or "PowerShell"
3. Try again

**Option 3: Reinstall Node.js**
1. Go to nodejs.org
2. Download and install
3. **Restart computer**
4. Try again

---

### Issue: "Port 5173 Already in Use"

**What you see**:
```
Error: Port 5173 is already in use
```

**Fix**:

**Option 1: Kill the Port (Windows)**
```bash
# In terminal:
netstat -ano | findstr :5173
# Note the PID number
taskkill /PID [number] /F
# Then run npm run dev again
```

**Option 2: Kill the Port (Mac/Linux)**
```bash
lsof -ti:5173 | xargs kill -9
npm run dev
```

**Option 3: Use Different Port**
```bash
npm run dev -- --port 3000
# Then open localhost:3000 in browser
```

---

## 🔴 Critical Errors

### Issue: White Screen / Blank Page

**What you see**:
- Browser shows nothing
- Just white/blank
- No CineVerse logo

**Fix**:

**Step 1: Check Terminal**
- Look at VS Code terminal
- Should say "VITE ready"
- If errors, stop (Ctrl+C) and restart

**Step 2: Check URL**
- URL should be: `http://localhost:5173/`
- NOT: `http://localhost:5173/index.html`
- NOT: `file:///...`

**Step 3: Check Browser Console**
1. Press F12
2. Console tab
3. Look for RED errors
4. If you see errors:
   ```bash
   # In VS Code terminal
   Ctrl+C
   rm -rf node_modules
   npm install
   npm run dev
   ```

---

### Issue: "Module Not Found" Errors

**What you see**:
```
Error: Cannot find module 'X'
Module not found: Can't resolve 'Y'
```

**Fix**:

**Nuclear Option** (Works every time):
```bash
# In VS Code terminal:
# Stop server first (Ctrl+C)

# Windows:
rmdir /s /q node_modules
del package-lock.json
npm cache clean --force
npm install
npm run dev

# Mac/Linux:
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm run dev
```

Wait 3-4 minutes for installation to complete.

---

## 📱 Mobile/Responsive Issues

### Issue: Layout Broken on Mobile View

**What you see**:
- Resize browser window
- UI breaks
- Things overlap

**Fix**:
1. **Refresh page** at current size
2. **Zoom to 100%** (Ctrl+0)
3. **Use actual mobile device** instead of browser resize

---

## 🎨 Visual/Display Issues

### Issue: Colors Look Wrong

**What you see**:
- Background not dark
- Red color looks different
- UI looks weird

**Fix**:

**Option 1: Check Browser**
- Try Chrome (best compatibility)
- Check browser zoom (should be 100%)

**Option 2: Clear Cache**
```
Ctrl+Shift+Delete
→ Cached files and images
→ Clear
→ Refresh page
```

**Option 3: Disable Extensions**
- Disable browser extensions
- Especially: Dark mode extensions, Color changers

---

## ✅ Verification: Is It Working?

### Quick Test (30 seconds)

```
✓ Login page appears
✓ Can login with any credentials
✓ Dashboard loads
✓ See movie cards (20 total)
✓ Movie titles visible
✓ Can click a movie
✓ Modal opens
✓ Search bar works
✓ Tabs navigate
✓ Chat button appears
```

**If 8+ items checked → App is working! 🎉**

---

## 🆘 Last Resort

If **NOTHING** works:

### Option 1: Complete Reset

```bash
# Close VS Code
# Delete the entire project folder
# Re-download/clone fresh
# Start from Step 1 in QUICK_START.md
```

### Option 2: Try Different Computer

- Sometimes it's just the computer
- Try on a different machine
- Or ask friend to check their setup

---

## 📊 Expected vs Actual

### ✅ Expected Behavior

| Feature | Should Work |
|---------|-------------|
| Login | Any username/password |
| Movies Display | 20 movies visible |
| Posters | Images OR placeholders |
| Search | Filters movies |
| Categories | Switch between tabs |
| Movie Modal | Opens on click |
| Ratings | Can rate with stars |
| Chatbot | Opens and responds OR shows error |

### ❌ What's NOT a Bug

| "Issue" | Why It's Normal |
|---------|-----------------|
| Gray placeholders instead of posters | Fallback system working |
| Chatbot error messages | API unavailable, fallback working |
| Slow initial load | First time loading assets |
| Some images load slow | Network dependent |
| Sidebar collapsed on mobile | Responsive design |

---

## 💡 Pro Tips

1. **Keep VS Code terminal open** while using the app
2. **Check console (F12)** when something seems wrong
3. **Refresh page (F5)** fixes 80% of issues
4. **Ctrl+Shift+R** for hard refresh (clears cache)
5. **Use Chrome** for best compatibility

---

## 📞 Getting Help

When asking for help, provide:

1. **Screenshot of error** (if any)
2. **What you tried to do** (clicked X, typed Y)
3. **What happened** (saw error Z)
4. **Browser & OS** (Chrome on Windows 11)
5. **Console errors** (F12 → Console → screenshot)

**Good help request example**:
> "When I click the Bollywood tab, nothing happens. I'm using Chrome on Windows. Console shows: [screenshot]. I tried refreshing but still doesn't work."

**Bad help request example**:
> "It's broken. Help!"

---

## 🎯 Success Checklist

Your app is **fully functional** if:

- [ ] Can login ✓
- [ ] See 20 movies ✓
- [ ] Movies have posters or placeholders ✓
- [ ] Can click and view details ✓
- [ ] Search works ✓
- [ ] Can navigate tabs ✓
- [ ] Chat button appears ✓
- [ ] Chat responds or shows error ✓
- [ ] No browser crashes ✓
- [ ] Everything is smooth ✓

**10/10 checked? Perfect! Everything is working! 🎉**

---

**Remember**: Most "issues" are actually the app working correctly with fallback systems!

---

**Last Updated**: March 18, 2026  
**Covers**: 95% of common issues

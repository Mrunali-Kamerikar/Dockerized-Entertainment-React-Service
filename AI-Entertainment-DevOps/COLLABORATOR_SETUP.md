# CineVerse - Collaborator Setup Guide

## 🎯 Ensuring Consistent Experience Across All Users

This guide ensures all collaborators see **exactly the same UI, movie content, and features** without any inconsistencies.

---

## 📋 Quick Start Checklist

- [ ] Clone the repository
- [ ] Install dependencies: `npm install` or `pnpm install`
- [ ] Start the development server: `npm run dev`
- [ ] Verify all movies are loading from `industryMovies.ts`
- [ ] Check that movie posters have proper fallbacks
- [ ] Test chatbot functionality
- [ ] Confirm responsive layout on different screen sizes

---

## 🎬 Data Consistency

### Static Movie Data

All movie data is **statically defined** in `/src/app/data/industryMovies.ts`. This ensures:

✅ **All collaborators see the exact same movies**
✅ **No external API dependencies for basic functionality**
✅ **Consistent industry categorization** (Bollywood, Hollywood, Tollywood, Anime, K-Drama)
✅ **Reliable fallback when TMDB is unavailable**

### Movie Categories

- **Hollywood**: 4 movies (The Shawshank Redemption, The Dark Knight, Inception, Pulp Fiction)
- **Bollywood**: 4 movies (3 Idiots, Dangal, Lagaan, PK)
- **Tollywood**: 3 movies (Baahubali, RRR, Eega)
- **Anime**: 4 movies (Spirited Away, Your Name, Demon Slayer, Akira)
- **K-Drama**: 4 movies (Train to Busan, Oldboy, The Handmaiden, Burning)

**Total: 20 curated movies** loaded immediately on app start.

---

## 🖼️ Image Handling

### Movie Poster Display

All movie posters use a **robust fallback system**:

1. **Primary**: TMDB poster path (if available)
2. **Secondary**: Placeholder image with movie title
3. **Error State**: Film emoji (🎬) with movie title

### Image Components Used

- **`ImageWithFallback`**: Protected component for consistent image rendering
- **Loading State**: Animated spinner while poster loads
- **Error State**: Graceful fallback UI with film icon

### No Missing Posters

Every movie card will **always display something**, ensuring no blank placeholders for any user.

---

## 🎨 Reusable Components

### MovieCard Component

**Location**: `/src/app/components/MovieCard.tsx`

**Fixed Structure**:
- ✅ Poster with loading/error states
- ✅ AI Score badge
- ✅ User rating badge (if rated)
- ✅ Movie title
- ✅ Genre tags (max 2)
- ✅ Release year
- ✅ Industry tag
- ✅ Hover effects with rating controls

All movie cards are rendered using **the same component** to ensure consistency.

### MovieGrid Component

**Location**: `/src/app/components/MovieGrid.tsx`

**Features**:
- ✅ Unified grid layout
- ✅ Loading states with skeletons
- ✅ Empty states
- ✅ Responsive columns
- ✅ Consistent spacing

### MovieCardSkeleton Component

**Location**: `/src/app/components/MovieCardSkeleton.tsx`

**Purpose**: Provides consistent loading placeholders while movies are being fetched.

### EmptyState Component

**Location**: `/src/app/components/EmptyState.tsx`

**Variants**:
- `search`: No search results
- `nodata`: No content available
- `error`: Something went wrong
- `loading`: Content is loading

---

## 🤖 Chatbot Consistency

### ChatBot Component

**Location**: `/src/app/components/ChatBot.tsx`

**States**:

1. **Closed State**: Floating button with pulse animation
2. **Open State**: Full chat interface
3. **Loading State**: Typing indicator with animated dots
4. **Success State**: AI response with formatted text
5. **Error State**: Helpful error message with suggestions
6. **Empty State**: Welcome message with suggestion chips

### Error Handling

If Gemini API fails, the chatbot displays:

```
⚠️ I'm having trouble connecting right now.

Try asking about:
• Movie recommendations by genre
• Specific actors or directors
• Trending films in Bollywood, Hollywood, Anime, K-Drama
• Movie summaries or reviews

Or use the search bar to find movies directly!
```

This ensures **all users get helpful guidance** even when AI is unavailable.

---

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 768px (2 columns)
- **Tablet**: 768px - 1024px (3-4 columns)
- **Desktop**: > 1024px (4-6 columns)

### Sidebar Behavior

- **Desktop**: Always visible (256px width)
- **Mobile**: Collapsible with hamburger menu (64px collapsed)

### ChatBot Responsiveness

- **Desktop**: 420px × 600px
- **Mobile**: calc(100vw - 48px) × calc(100vh - 100px)

---

## 🔧 Troubleshooting Common Issues

### Issue: "Movies not loading"

**Solution**: 
- Check that `/src/app/data/industryMovies.ts` exists
- Verify `ALL_INDUSTRY_MOVIES` is exported
- Ensure `dataLoader.ts` is importing from `industryMovies.ts`

### Issue: "Blank movie posters"

**Solution**:
- Movie posters use TMDB paths, which may fail if TMDB is blocked
- Fallback system automatically shows placeholder
- No action needed - this is expected behavior

### Issue: "Chatbot not responding"

**Solution**:
- Verify Gemini API key is set (or use without it for fallback responses)
- Check browser console for errors
- Error state should display automatically with helpful message

### Issue: "useApp must be used inside AppProvider"

**Solution**:
- AppProvider is in `routes.tsx` wrapping `<Outlet />`
- Do NOT wrap `<RouterProvider>` in App.tsx
- All child routes automatically have context access

### Issue: "Different users seeing different content"

**Solution**:
- Clear browser cache and localStorage
- Verify all users are on the same commit/branch
- Check that `industryMovies.ts` has not been modified locally

---

## 🚀 Performance Optimization

### Loading Strategy

1. **Immediate Load**: 20 curated movies from `industryMovies.ts`
2. **Background Fetch**: TMDB data (if available)
3. **Progressive Enhancement**: AI features load after base content

### Caching

- Movie data is cached in AppContext
- User ratings stored in localStorage
- Search query persists in context state

---

## ✅ Verification Steps

After setup, verify the following:

### 1. Movie Display
- [ ] All 20 movies visible in their respective categories
- [ ] All posters loading or showing fallbacks
- [ ] Genre tags displaying correctly
- [ ] Industry tags visible

### 2. Search Functionality
- [ ] Search bar works with local data
- [ ] Results filter correctly
- [ ] Empty state shows when no results

### 3. Chatbot
- [ ] Floating button visible
- [ ] Chat opens/closes smoothly
- [ ] Typing indicator works
- [ ] Error state displays properly
- [ ] Suggestion chips clickable

### 4. Movie Modal
- [ ] Clicking movie opens modal
- [ ] All movie details visible
- [ ] Modal closes properly
- [ ] AI score displayed

### 5. Responsive Layout
- [ ] Mobile sidebar collapses
- [ ] Grid adjusts to screen size
- [ ] Chatbot resizes on mobile
- [ ] Search bar accessible on all devices

---

## 🎯 Best Practices for Collaborators

### DO:
✅ Use the existing reusable components
✅ Test on multiple screen sizes
✅ Check console for errors
✅ Verify changes don't break existing features
✅ Add proper error handling
✅ Use TypeScript types

### DON'T:
❌ Modify `industryMovies.ts` without coordinating with team
❌ Create duplicate components
❌ Hard-code movie data in multiple places
❌ Skip error states
❌ Ignore responsive design
❌ Remove fallback mechanisms

---

## 📞 Support

If you encounter issues not covered in this guide:

1. Check the browser console for errors
2. Verify all dependencies are installed
3. Clear cache and localStorage
4. Review recent commits for breaking changes
5. Contact the development team

---

## 🎉 Success Criteria

You've successfully set up CineVerse when:

✅ All 20 movies load immediately
✅ Movie posters display (or show fallbacks)
✅ Chatbot opens and handles errors gracefully
✅ Search works with local data
✅ Responsive layout adapts to screen size
✅ No console errors
✅ Consistent experience across all browsers and devices

---

**Last Updated**: March 18, 2026

**Version**: 2.0.0

# Implement Dynamic Room Ratings and Reviews

This plan outlines the steps to build a "proper" dynamic review and rating system for the hotel rooms. It covers database changes, backend API creation, and frontend integration to allow users to see and submit real reviews for specific rooms.

## User Review Required

> [!IMPORTANT]
> This plan involves creating a new backend table and API routes, as well as modifying the main `Rooms.js` UI. Please review the proposed approach below.

## Open Questions

> [!WARNING]
> Do you want the reviews to be restricted to logged-in users only, or can guests (anonymous users) also leave a review by simply providing their name? For now, I will implement it so anyone can leave a review by entering their name, but let me know if it should be restricted to authenticated users.

## Proposed Changes

### Backend Changes

- **Database**: Add logic to create a new `room_reviews` table if it doesn't exist. This will store the `room_id`, user's name, rating (1-5), and the review text.
- **API Routes**: Create a new file for review routes to handle fetching and submitting reviews.

#### [NEW] [reviews.js](file:///d:/React-Project/backend/routes/reviews.js)
Create `backend/routes/reviews.js` with two endpoints:
- `GET /api/reviews/:roomId` - Fetches all reviews for a specific room.
- `POST /api/reviews` - Saves a new review to the database.

#### [MODIFY] [server.js](file:///d:/React-Project/backend/server.js)
- Import the new `reviews.js` routes.
- Mount it to `app.use("/api/reviews", reviewsRoutes)`.

#### [MODIFY] [rooms.js (Backend)](file:///d:/React-Project/backend/routes/rooms.js)
Update the `GET /api/rooms` endpoint to join with the `room_reviews` table and calculate the average rating for each room, so `Rooms.js` gets the dynamic rating immediately on page load.

### Frontend Changes

- **Reviews Component**: Create a reusable component to display and submit reviews.
- **Rooms Page Integration**: Update the room cards to show the dynamic average rating instead of the static 4 stars. Add a button to open the reviews modal.

#### [NEW] [RoomReviews.js](file:///d:/React-Project/frontend/src/components/RoomReviews.js)
Create a new component that takes a `roomId` as a prop. It will:
- Fetch existing reviews from `/api/reviews/:roomId`.
- Display a list of reviews.
- Provide a form to submit a new rating (1-5 stars) and review text.
- Be displayed inside a Modal on the `Rooms` page.

#### [DELETE] [Reviews.js](file:///d:/React-Project/frontend/src/pages/Reviews.js)
Delete this old, unused static file since it will be replaced by the new `RoomReviews.js` component.

#### [MODIFY] [Rooms.js](file:///d:/React-Project/frontend/src/pages/Rooms.js)
- Import `RoomReviews.js`.
- Add state to manage which room's reviews are currently being viewed (e.g., `showReviewsModal` state).
- Update the room card UI to replace the static `{"★".repeat(4)}` with a dynamically computed average rating returned by the backend.
- Add a "Read Reviews" button to the room card that opens the `RoomReviews` modal.

## Verification Plan

### Automated Tests
None specifically for this feature.

### Manual Verification
1. Open the Rooms page and verify the stars now reflect actual data (or default to 0/5 if no reviews).
2. Click on a room's "Reviews" button.
3. Submit a new 5-star review.
4. Verify the review appears in the list immediately.
5. Close the modal and verify the room's average star rating has updated.

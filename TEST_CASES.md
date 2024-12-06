# Test Cases for my Project "Real Estate Marketplace"

This document outlines the test cases for the Real Estate Marketplace application, including actions to be undertaken and the expected results.

---

## **General Test Cases**

### Test Case 1: User Registration
- **Action:**
  1. Navigate to the registration page/Sign Up page.
  2. Fill in the required fields: username, email and password.
  3. Submit the form, click "Sign Up".
- **Expected Result:**
  - User is registered successfully.
  - User is redirected to the Sign In page.

### Test Case 2: User Login
- **Action:**
  1. Navigate to the login page.
  2. Enter valid credentials.
  3. Submit the form, click "Sign In".
- **Expected Result:**
  - User is logged in successfully.
  - User is redirected to the homepage.

### Test Case 3: Search for Listings
- **Action:**
  1. Enter a keyword or location in the search bar.
  2. Click the search button or press enter.
- **Expected Result:**
  - Relevant listings are displayed based on the search query.
  - If no results are found, the message *"No listing found!"* is shown.

---

## **Listing-Specific Test Cases**

### Test Case 4: View a Listing
- **Action:**
  1. Click on a listing card on the homepage or search results.
- **Expected Result:**
  - The listing details page opens.
  - Details like title, description, price, and images are displayed.

### Test Case 5: Add a New Listing
- **Action:**
  1. Navigate to the "Create Listing" page by clicking the "Create Listing" button on the Profile page.
  2. Fill in all required fields, including title, description, price, and upload images.
  3. Submit the form, click the "Create Listing" button.
- **Expected Result:**
  - The listing is created and the user is redirected to the newly created listing page.

### Test Case 6: Delete a Listing
- **Action:**
  1. Go to the profile page.
  2. Select a listing and click the delete button.
- **Expected Result:**
  - The listing is removed from the dashboard and the database.

---

## **Error Handling Test Cases**

### Test Case 7: Invalid Login Credentials
- **Action:**
  1. Enter invalid credentials on the Sign In page.
  2. Submit the form.
- **Expected Result:**
  - An error message is displayed: *"User not found!"*

### Test Case 8: Image Upload Failure
- **Action:**
  1. Upload more images than the limit of 10 images.
- **Expected Result:**
  - An error message is displayed: *"You can only upload 10 images per listing"*

---

## **Responsive Design Test Cases**

### Test Case 9: Mobile View
- **Action:**
  1. Change to mobile view in the console of the browser.
  2. Navigate through all pages.
- **Expected Result:**
  - The layout adjusts correctly to the screen size.
  - All buttons and text are easily accessible.

### Test Case 10: Desktop View
- **Action:**
  1. Change back to destop view.
  2. Navigate through all pages.
- **Expected Result:**
  - The layout is visually appealing and uses the available screen space effectively.

---

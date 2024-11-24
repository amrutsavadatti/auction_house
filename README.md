## USE CASES COMPLETED
  1) Create Account (Seller)
  2) Create Account (Buyer)
  3) Login Account (Seller)
  4) Login Account (Buyer)
  5) Close Account (Seller)
  6) Close Account (Buyer)
  7) Add Funds (Buyer)
  8) Add Item (Seller)
  9) Edit Item (Seller)
  10) Review Items (Seller)
  11) Remove inactive item (Seller)
  12) Publish Item (Seller)
  13) Unpublish Item (Seller)
  14) Archive Item (Seller)
  15) Search Items (Customer)
  16) View Item (Customer)
  17) Sort items (Customer)
  18) View Item (Buyer)
  19) Place Bid (Buyer)
  20) Review Active Bids (Buyer)

## Landing Page URLs and Descriptions
URL for AWS APP: http://iteration2bucket.s3-website.us-east-2.amazonaws.com/

  1) / <br/>
    Landing page. User is in customer mode and can view all active, published items (can view its set price, highest bid, seller name, published date). The customer has the option to search based off of a keyword or buy putting a price filter. They also can sort the items based on price, publish date, and expiration date.For every item, the user has the option to click "view item", redirecting you to /customer/viewItem. User can click on sign in button on the top right corner. Redirects you to /home/userType

  2) /customer/viewItem
     Page that provides the customer an item's image, description, and its set price. Has the option to go back to customer home page.
    
  3) /home/userType <br/>
    Page that gives two buttons to choose from: one to continue if user is a buyer and another to continue if user is a seller. If user clicks buyer: redirects to /buyer/signin. If user clicks seller: redirects to /seller/signin.
    
  4) /buyer/signin <br/>
    Sign-In page for Buyer that allows a buyer to sign in using an existing account or create a new account. If user clicks on "create account": redirects to /buyer/signup.
    
  5) /buyer/signup <br/>
    Sign Up page for Buyer that allows a buyer to sign up and create a new account. Once a new account is successfully made, the page reroutes to the sign-in page (/buyer/signin).
    
  6) /buyer/home <br/>
     Home page for the buyer. Similar to the landing page, the buyer is able to see all the active and published items. On the page, the buyer has the option to click "view item", rerouting to the bid page (/buyer/bid). The buyer can also click "active bids", rerouting to /buyer/reviewActiveBids. Finally, the buyer can click "Add Funds", rerouting to /buyer/funds.

  7) /buyer/bid
    Page for the buyer to view information about a specific item and to place a bid. They can also view all the previous bids made for that item. Buyer can click "place bid", should they have enough funds, rerouting to the /buyer/home page.

  8) /buyer/reviewActiveBids
    Page for Buyer to review all active bids they have made. Shows a table with information of the item name and the bid value.

  9) /buyer/funds
    Page for buyer to view their total funds. They have the option to add funds by entering amount to add and clicking "add funds" button. The "logout" button, when clicked, reroutes to /, the general home page. "Close Account" button, when clicked, removes the account.
    
  10) /seller/signin <br/>
    Sign-In page for seller that allows a seller to sign in using an existing account or create a new account. If user clicks on "create account": redirects to /seller/signup 
    
  11) /seller/signup <br/>
    Sign Up page for seller that allows a seller to sign up and create a new account. Once a new account is successfully made, the page reroutes to the sign-in page (/seller/signin). 
    
  12) /seller/home <br/>
    On this page, the seller can review their items, add items, choose to edit items, and close their account. Closing their account will reroute them to the /seller/signin page, clicking the add item button will reroute to the /seller/item page, and clicking edit item will reroute to /seller/editItem. The seller should also have the ability to click on the "publish", "remove", or "archive" button. If the seller were to click on the "publish", they can publish the item and choose their expiration date, which disables the other buttons and enables only the "unpublish" button. Once it is published, the item is live/active and buyers are able to place bids until the chosen expiration date. If the item is inactive, the seller has the option to remove the item altogether or archive it.
    
  13) /seller/item <br/>
    This page allows the seller to enter all fields to add a new item. The seller can see the added item on the seller home page. 
    
  14) /seller/editItem <br/>
    This page is routed when the seller clicks "edit" next to an item on the items list. They will be able to make any modifications to the fields of the item. The updated item will be seen on the /seller/home page.

  15) 
  16) 
     


## BUYER INSTRUCTIONS:
  1) To sign-in as a buyer from the load-up page click sign-in on the top right 
  2) Click where it says buyer click here (it lands you to /buyer/signin) 
  3) In buyer/sign-in press on create account it lands you on buyer/signup if you want to create an account. 
  4) Create credentials for a buyer with an email address in the email field and password in the password field (example could be e@e.com and password: e)
  5) After signing in you land up on buyer/signin again. Over here, sign in with the credentials you entered
  6) After signing you end up on the buyer/home page where you are allowed to add funds and to close account
  7) To add funds make sure you amount greater than 10 by toggling before the 0 and amount less than 0 by toggling after as the 0 cannot be deleted.
  8) Once you add funds by clicking the button you can view the funds the buyer has
  9) To close the account, click on the close account button if it gives a message saying your account is closed successfully, you will not be able to log in to the buyer account with the same credentials

## SELLER INSTRUCTIONS:
1) To sign-in as a seller from the load-up page click sign-in on the top right 
  2) Click where it says seller click here (it lands you to /seller/signin) 
  3) In seller/sign-in press on create account: it lands you on /seller/signup if you want to create an account. 
  4)Create credentials for a seller with an email address in the email field and password in the password field (example could be f@f.com and password: f)
  3) After signing in you land up on /seller/signin again. Over here, sign in with the credentials you entered
  4) After signing you end up on the /seller/home page where you are allowed to review all items, which should be nothing, since we have created a new account. You should see the close account button here, as well. 
  5) Click on Add Items button, which should bring you to /seller/item. Fill in all of the fields and add the item. 
  6) You should be able to view that newly added item on /seller/home.  
  7) Let's say you made a mistake and want to edit the item. You should be able to view "edit item" button. Click the button to go to /seller/editItem
  8) Change a field you want to modify the information for and edit the item. You should be able to see the modified item on the seller home page.
  9) To close the account, click on the close account button if it gives a message saying your account is closed successfully, you will not be able to log in to the seller account with the same credentials


## Iteration 1 Work Distribution
- Manas Pise: Front End Work (Buyer)
- Amrut Savadatti: Front End Work (Seller)
- Jai Patel: Back End, Helped with Front End Work, S3 Bucket
- Pooja Kawatkar: Back End, Helped with Front End Work, Seller Images (S3/Front End)
- 
## Iteration 2 Work Distribution
- Manas Pise: Back End Work
- Amrut Savadatti: Front End Work
- Jai Patel: Back End Work, S3 Bucket
- Pooja Kawatkar: Front End Work

## General Notes
Please make sure not to refresh the live URLs, as it runs into a 404 not found/403 forbidden error. We reached out to the professor and other teams who are experiencing the same issue, but we are not sure how to go about solving it.


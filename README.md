# USE CASES COMPLETED

## Iteration #1

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

## Iteration #2

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

## Iteration #3

  21) Fulfill Item (Seller)
  22) Review Purchases (Buyer)
  23) Generate Auction Report (Admin)
  24) Generate Forensics Report (Admin)
  25) Search Recently Sold (Buyer)
  26) Sort Recently Sold (Buyer)
  27) Freeze Item (Admin)
  28) Unfreeze Item (Admin)
  29) Request Unfreeze Item (Seller)
  30) Buy Now (Buyer)

## Landing Page URLs and Descriptions
URL for AWS APP: http://finaliterationbucket.s3-website.us-east-2.amazonaws.com/

  1) / <br/>
    Landing page. User is in customer mode and can view all active, published items (can view its set price, highest bid, seller name, published date). The customer has the option to search based off of a keyword or buy putting a price filter. They also can sort the items based on price, publish date, and expiration date.For every item, the user has the option to click "view item", redirecting you to /customer/viewItem. User can click on sign in button on the top right corner. Redirects you to /home/userType

  2) /customer/viewItem <br/>
     Page that provides the customer an item's image, description, and its set price. Has the option to go back to customer home page.
    
  3) /home/userType <br/>
    Page that gives two buttons to choose from: one to continue if user is a buyer and another to continue if user is a seller. If user clicks buyer: redirects to /buyer/signin. If user clicks seller: redirects to /seller/signin.
    
  4) /buyer/signin <br/>
    Sign-In page for Buyer that allows a buyer to sign in using an existing account or create a new account. If user clicks on "create account": redirects to /buyer/signup.
    
  5) /buyer/signup <br/>
    Sign Up page for Buyer that allows a buyer to sign up and create a new account. Once a new account is successfully made, the page reroutes to the sign-in page (/buyer/signin).
    
  6) /buyer/home <br/>
     Home page for the buyer. Similar to the landing page, the buyer is able to see all the active and published items. On the page, the buyer has the option to click "view item", rerouting to the bid page (/buyer/bid). The buyer can also click "active bids", rerouting to /buyer/reviewActiveBids. THe buyer can click "Review Purchases", rerouting to /buyer/reviewPurchases, and click "Recently Sold", rerouting to buyer/recentlySoldItems. Please see "21" and "22" for more info about the two pages. Finally, the buyer can click "Add Funds", rerouting to /buyer/funds.

  7) /buyer/bid <br/>
    Page for the buyer to view information about a specific item and to place a bid. They can also view all the previous bids made for that item. Buyer can click "place bid", should they have enough funds, rerouting to the /buyer/home page.

  8) /buyer/reviewActiveBids <br/>
    Page for Buyer to review all active bids they have made. Shows a table with information of the item name and the bid value.

  9) /buyer/funds <br/>
    Page for buyer to view their total funds. They have the option to add funds by entering amount to add and clicking "add funds" button. The "logout" button, when clicked, reroutes to /, the general home page. "Close Account" button, when clicked, removes the account.
    
  10) /seller/signin <br/>
    Sign-In page for seller that allows a seller to sign in using an existing account or create a new account. If user clicks on "create account": redirects to /seller/signup 
    
  11) /seller/signup <br/>
    Sign Up page for seller that allows a seller to sign up and create a new account. Once a new account is successfully made, the page reroutes to the sign-in page (/seller/signin). 
    
  12) /seller/home <br/>
    On this page, the seller can review their items, add items, choose to edit items, and close their account. Closing their account will reroute them to the /seller/signin page, clicking the add item button will reroute to the /seller/item page, and clicking edit item will reroute to /seller/editItem. The seller should also have the ability to click on the "publish", "remove", or "archive" button. If the seller were to click on the "publish", they can publish the item and choose their expiration date, which disables the other buttons and enables only the "unpublish" button. Once it is published, the item is live/active and buyers are able to place bids until the chosen expiration date. If the item is inactive, the seller has the option to remove the item altogether or archive it. If the item has been completed, the seller has the option to "fulfill" the item. If the item is frozen, the seller has the option to request to unfreeze the item.
    
  13) /seller/item <br/>
    This page allows the seller to enter all fields to add a new item. The seller can see the added item on the seller home page. 
    
  14) /seller/editItem <br/>
    This page is routed when the seller clicks "edit" next to an item on the items list. They will be able to make any modifications to the fields of the item. The updated item will be seen on the /seller/home page.

  15) /admin/signIn <br/>
    Sign-In page for admin that allows the admin to sign in using admin@admin.com

  16) /admin/home <br/>
    Home page for admin. On this page the admin is able to view their auction house funds. They are also able to choose from clicking "List of Active Items" (reroutes to /admin/activeItems), "List of Frozen Items" (reroutes to /admin), "Generate Auction Report" (reroutes to /admin), or "Generate Forensics Report" (reroutes to /admin).

  17) /admin/activeItems <br/>
      On this page, the admin is able to view all active items of the auction house. They have the option to freeze a specific item, if they wish, changing the status of the item to frozen.

  18) /admin/frozenItems <br/>
     On this page, the admin is able to view all the frozen items and a list of items that are requesting to be unfrozen. The admin has the option to unfreeze any of these frozen items and unfreeze request items.

  19) /admin/auctionReport <br/>
    On this page, the admin is able to view a list of bought items, their final sale price, and the commission value it gives for the auction house. The admin is able to view their total commission funds.
  
  20) /admin/forensicsReport <br/>
    On this page, the admin is able to view a list of statistics for the auction house. The admin can see the calculated mean, median, and mode of the final sale prices. They can also see the top 3 items by sale price.

  21) /buyer/reviewPurchases <br/>
    On this page, the buyer is able to view a list of all the items they have previously bought, with their final sale price.

  22) /buyer/recentlySoldItems <br/>
    On this page, the buyer is able to view all recently sold items within the last 24 hours. If they click "view item", they will be able to view the item along with their bidding history too (rerouted to /buyer/bid).
  


## INSTRUCTIONS:
  1) Once you're on the landing page, you should be able to view all the active items that are published. Since you're in customer view, you will be able to see the item's set price, current highest bid, the seller, publishing date, and an option to view the item.
  2) Use the search fields to filter by keyword and price range. If you leave the lower bound blank, the upper bound will act as the maximum price filter (Vice versa). Feel free to experiment with different combinations to get different results.
  3) The customer also has the ability to sort through the active items list based on either price, published date, and expiration date.
  4) Let's say the customer wants to buy one of these items. Click the top right corner "Sign In" button, which reroutes to /home/userType. Choose "buyer? click here" button to sign in as a buyer. When signing in, write in ur credentials "a@a.com" with password "a". Click Login.
  5) Now you're in buyer mode. You should be able to see the same active items as you did when you were on the home page (Customer View). However now if you click the "view item" button next to item "activePH1", you not only see the general item description, set price, and image, but you also see the option to place bid. On the right you should be able to see the bid history of the item.
  6) Let's place a bid on activePH1. It must be higher than the highest bid, which is currently $46. Enter $50 and click place bid.
  7) At the buyer home page, you should see a green button on the top left "Active Bids". Click the button, rerouting to /buyer/reviewActiveBids.
  8) Here, as buyer, you will be able to see all your active bids. This is shown through a table with the item name and the bid value.
  9) As usual, if you click "Add Funds", you should be able to see and add any funds.
  10) Logout and log in as seller this time. Use credentials: "i@i.com" with password "i"
  11) You should be rerouted to /seller/home. Here, you should see a list of all the items created by i@i.com seller.
  12) You can click the "remove" button to remove the "testitem" item that is currently inactive. This represents the remove inactive item usecase.
  13) Now you can publish the "dance team photo" item by clicking the "publish" button. This brings you to a page where you can specify the end date, which indicates how long the item is up for. You will now see that the item status is "active". You will see that the item now has the option to "Unpublish" since there are no active bids made for the item. Now you can hit "Unpublish", which will set the item status back to inactive. Finally, you can click the "archive" button for the item, which will change the status to "archived".


## Iteration 1 Work Distribution
- Manas Pise: Front End Work (Buyer)
- Amrut Savadatti: Front End Work (Seller)
- Jai Patel: Back End, Helped with Front End Work, S3 Bucket
- Pooja Kawatkar: Back End, Helped with Front End Work, Seller Images (S3/Front End)

## Iteration 2 Work Distribution
- Manas Pise: Back End Work
- Amrut Savadatti: Front End Work
- Jai Patel: Back End Work, S3 Bucket
- Pooja Kawatkar: Front End Work

## Iteration 3 Work Distribution
- Manas Pise: Back End Work
- Amrut Savadatti: Some back end some front end 
- Jai Patel: Led back end
- Pooja Kawatkar: Front End WOrk

## General Notes
Please make sure not to refresh the live URLs, as it runs into a 404 not found/403 forbidden error. We reached out to the professor and other teams who are experiencing the same issue, but we are not sure how to go about solving it.

For the "Search Items (Customer)" and "Sort Items (Customer)" use cases, you may have to click on the search button and/or sorting filters twice in order to see the changes on the screen.


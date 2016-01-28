/**
Stories inspire people – can you drive a shopping journey from a story?
    This coding challenge is all about creating an inviting shopping experience led by media (photo/video) that can inspire people to get on a shopping journey.
    Brownie statement 1: Experiences that encourage social behavior.
    Brownie statement 2: For all the products, a filter based on merchant, brand, discount and price range
Services provided (The responses are self-explanatory; however, in case of any questions write to us) –
GET INSPIRATION:
    Get story details
http://api.dev.shopalyst.com/v1/inspirations/<inspirationId>?apikey=<apikey>
// inspirationID [string]: Use EA42D7FBEA24F69E20CE67634153E8CC for this challenge'
Ex http://api.dev.shopalyst.com/v1/inspirations/EA42D7FBEA24F69E20CE67634153E8CC?apikey=c4d38ea7614d4effce8758519b59d52d
GET PRODUCTS FOR INSPIRATION:
    Get products related to an inspiration
http://api.dev.shopalyst.com/v1/inspirations/<inspirationId>/shortlyst?apikey=<apikey>&limit=<limit>&index=<index>
// inspirationID [string]: Use EA42D7FBEA24F69E20CE67634153E8CC for this challenge
// limit [integer]: Number of items to fetch
   index [integer]: Starting item index for this request.Start from 0 for first request and add <limit> for each subsequent result
 Ex http://api.dev.shopalyst.com/v1/inspirations/EA42D7FBEA24F69E20CE67634153E8CC/shortlyst?apikey=c4d38ea7614d4effce8758519b59d52d&limit=10&index=0
GET PRODUCT:
    Get product details
http://api.dev.shopalyst.com/v1/products/<productId>?apikey=<apikey>
// productID [string]: ID of product Note: The product variant (color, size etc) information is available within the skuSet property in the response.
// This is a map of [attributeNameId, atrributeValueId] – look up attributeName and attributeValue properties to get the values for these properties.
 Ex http://api.dev.shopalyst.com/v1/products/4E45E6DCC06547B3?apikey=c4d38ea7614d4effce8758519b59d52d
**/
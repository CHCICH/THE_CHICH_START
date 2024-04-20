# Class: UserData

## Description:
The `UserData` class represents user data with encrypted fields for username, password, and email. It provides methods for initializing user data securely.

## Constructor:
- **Parameters**:
  - `username` (string): The username of the user.
  - `password` (string): The password of the user.
  - `email` (string): The email address of the user.

## Properties:
- `UserID` (string): Encrypted user identifier generated based on username, password, and email.
- `username` (string): Encrypted username.
- `password` (string): Encrypted password.
- `email` (string): Encrypted email address.

---

# Class: Item

## Description:
The `Item` class represents a product item with basic details such as ID, name, price, description, and photo link.

## Constructor:
- **Parameters**:
  - `ProductID` (string): The unique identifier for the product.
  - `ProductName` (string): The name of the product.
  - `Price` (number): The price of the product.
  - `description` (string): The description of the product.
  - `photoLink` (string): The URL link to the product photo.

## Properties:
- `ProductID` (string): The unique identifier for the product.
- `ProductName` (string): The name of the product.
- `Price` (number): The price of the product.
- `description` (string): The description of the product.
- `photoLink` (string): The URL link to the product photo.

---

# Class: Cart

## Description:
The `Cart` class represents a shopping cart associated with a user. It allows adding and removing items from the cart.

## Constructor:
- **Parameters**:
  - `UserID` (string): The identifier of the user associated with the cart.

## Properties:
- `UserID` (string): The identifier of the user associated with the cart.
- `Cart` (array): An array containing the items in the cart.

## Methods:
- `addItemToCart(itemID)`: Adds an item to the cart.
  - **Parameters**:
    - `itemID` (string): The identifier of the item to be added.
- `removeItemFromCart(itemID)`: Removes an item from the cart.
  - **Parameters**:
    - `itemID` (string): The identifier of the item to be removed.

---

# Class: Response

## Description:
The `Response` class represents a generic response object containing information about the success of an operation and any associated data.

## Constructor:
- **Parameters**:
  - `success` (boolean): Indicates whether the operation was successful.
  - `data` (any): Additional data associated with the response.

## Properties:
- `success` (boolean): Indicates whether the operation was successful.
- `data` (any): Additional data associated with the response.

---

# Class: UserID

## Description:
The `UserID` class represents a user identifier with an optional message.

## Constructor:
- **Parameters**:
  - `UserID` (string): The user identifier.
  - `msg` (string): Optional message associated with the user identifier.

## Properties:
- `UserID` (string): The user identifier.
- `msg` (string): Optional message associated with the user identifier.

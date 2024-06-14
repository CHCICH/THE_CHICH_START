# Functions Documentation

## `/api/item/create`

Creates a new item in the database for a specified user.

### Request Body Parameters:
- `UserID` (string): ID of the user creating the item.
- `NameOfTheItem` (string): Name of the item to be created.
- `price` (string): Price of the item.
- `descOftheItem` (string): Description of the item.
- `imageOftheItem` (string): Image URL of the item.

### Response:
- 200 OK: Returns JSON with `Response` object containing `true` and the created `Item` object.
- 400 Bad Request: Returns JSON with `Error` object describing specific errors encountered during creation.

### Error Handling:
- Validates user existence and item creation parameters.
- Logs creation activity to a log file.

## `/api/item/editType/:ItemID`

Edits an existing item in the database if the user is the author.

### Request Body Parameters:
- `UserID` (string): ID of the user attempting to edit the item.
- `name` (string): New name of the item.
- `price` (string): New price of the item.
- `desc` (string): New description of the item.
- `image` (string): New image URL of the item.

### URL Parameters:
- `ItemID` (string): ID of the item to be edited.

### Response:
- 200 OK: Returns JSON with `Response` object containing `true` and the edited `Item` object.
- 400 Bad Request: Returns JSON with `Error` object describing specific errors encountered during editing.
- 404 Not Found: Returns JSON with `Error` object if the item with given `ItemID` is not found.

### Error Handling:
- Validates user authorization and edit parameters.
- Logs editing activity to a log file.

## `api/item/deleteItem`

Deletes an item from the database if the user is the author.

### Request Body Parameters:
- `UserID` (string): ID of the user attempting to delete the item.
# Functions Documentation

## `api/item/deleteAllItems`

Deletes all items belonging to a specified user from the database.

### Request Body Parameters:
- `UserID` (string): ID of the user whose items are to be deleted.

### Response:
- 200 OK: Returns JSON with `Response` object containing `true`, a success message, and the previous and new data arrays.
- 400 Bad Request: Returns JSON with `Error` object if the user does not exist in the database.

### Error Handling:
- Checks if the user exists in the user table before proceeding with deletion.
- Logs deletion activity to a log file.




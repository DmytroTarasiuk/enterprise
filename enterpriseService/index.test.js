// Task 3. Unit Testing

const db = require("./db");

test("addUsersToEnterprise should add users to enterprise", async () => {
  const userHashes = ["hash1", "hash2"];
  const userData = {
    email: "test@email.com",
    firstName: "Test",
    lastName: "User",
    phoneNumber: "123-456-7890",
  };
  const taxId = "123456789";
  const permissions = ["read", "write"];

  const result = await db.addUsersToEnterprise(
    userHashes,
    userData,
    taxId,
    permissions
  );

  expect(result.success).toBe(true);

  // Verify that the user was added to the database
  const usersInDatabase = await db.getAllUsers();
  const addedUser = usersInDatabase.find(
    (user) => user.Email === userData.email
  );

  expect(addedUser).toBeDefined();
  expect(addedUser.FirstName).toBe(userData.firstName);
  expect(addedUser.LastName).toBe(userData.lastName);
  expect(addedUser.PhoneNumber).toBe(userData.phoneNumber);
  expect(addedUser.RegistrationDate).toBeDefined();
  expect(addedUser.Login).toBeDefined();
  expect(addedUser.Password).toBeDefined();
  expect(JSON.parse(addedUser.Permissions)).toEqual(permissions);
});

test("addUsersToEnterprise should handle error when enterprise is not found", async () => {
  const userHashes = ["hash1", "hash2"];
  const userData = {
    email: "test2@email.com",
    firstName: "Test2",
    lastName: "User",
    phoneNumber: "123-456-7890",
  };
  const taxId = "invalid_tax_id"; // This taxId should not correspond to any existing enterprise
  const permissions = ["read", "write"];

  const result = await db.addUsersToEnterprise(
    userHashes,
    userData,
    taxId,
    permissions
  );

  expect(result.success).toBe(false);
  expect(result.error).toBe("Enterprise not found");
});

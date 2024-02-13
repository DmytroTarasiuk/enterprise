const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:"); // In-memory database for simplicity
const {
  parseUserDataFromHash,
  hashValue,
  getRandomInt,
  getUserIDByEmail,
} = require("./utils");

// Task 1: Database Design Challenge
db.serialize(() => {
  db.run(`
    CREATE TABLE User (
      UserID INTEGER PRIMARY KEY,
      Email TEXT,
      FirstName TEXT,
      LastName TEXT,
      PhoneNumber TEXT,
      RegistrationDate DATE,
      Login TEXT,
      Password TEXT,
      Permissions TEXT ARRAY
    )
  `);

  db.run(`
    CREATE TABLE Enterprise (
      EnterpriseID INTEGER PRIMARY KEY,
      Name TEXT,
      TaxID TEXT,
      Address TEXT
    )
  `);

  db.run(`
    CREATE TABLE UserEnterprise (
      UserID INTEGER,
      EnterpriseID INTEGER,
      FOREIGN KEY (UserID) REFERENCES User(UserID),
      FOREIGN KEY (EnterpriseID) REFERENCES Enterprise(EnterpriseID),
      PRIMARY KEY (UserID, EnterpriseID)
    )
  `);
});

// Sample data
db.serialize(() => {
  const userStmt = db.prepare(
    "INSERT INTO User (Email, FirstName, LastName, PhoneNumber, RegistrationDate, Login, Password, Permissions) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  );
  const enterpriseStmt = db.prepare(
    "INSERT INTO Enterprise (Name, TaxID, Address) VALUES (?, ?, ?)"
  );
  const userEnterpriseStmt = db.prepare(
    "INSERT INTO UserEnterprise (UserID, EnterpriseID) VALUES (?, ?)"
  );

  userStmt.run(
    "user1@email.com",
    "John",
    "Doe",
    "123-456-7890",
    "2023-08-10",
    `${hashValue("john-doe")}`,
    `${hashValue("password123")}`,
    '[ "read", "write" ]'
  );
  userStmt.run(
    "user2@email.com",
    "Jane",
    "Smith",
    "987-654-3210",
    "2024-02-12",
    `${hashValue("jane-smith")}`,
    `${hashValue("password123")}`,
    '[ "read", "write" ]'
  );

  enterpriseStmt.run("CompanyA", "123456789", "123 Main St");
  enterpriseStmt.run("CompanyB", "987654321", "456 Oak St");

  userEnterpriseStmt.run(1, 1);
  userEnterpriseStmt.run(1, 2);
  userEnterpriseStmt.run(2, 1);

  userStmt.finalize();
  enterpriseStmt.finalize();
  userEnterpriseStmt.finalize();
});

// Database queries
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `
        SELECT User.*
        FROM User
      `,
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

const getUsersByTaxId = (taxId) => {
  return new Promise((resolve, reject) => {
    db.all(
      `
      SELECT User.*
      FROM User
      JOIN UserEnterprise ON User.UserID = UserEnterprise.UserID
      JOIN Enterprise ON UserEnterprise.EnterpriseID = Enterprise.EnterpriseID
      WHERE Enterprise.TaxID = ?
    `,
      [taxId],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

const getUsersRegisteredAfterDate = (date) => {
  return new Promise((resolve, reject) => {
    db.all(
      `
      SELECT *
      FROM User
      WHERE RegistrationDate > ?
    `,
      [date],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

// TASK 2. Add user to enterprise

const addUsersToEnterprise = async (
  userHashes,
  userData,
  taxId,
  permissions
) => {
  try {
    const enterprise = await new Promise((resolve, reject) => {
      db.get(
        "SELECT EnterpriseID FROM Enterprise WHERE TaxID = ?",
        [taxId],
        (err, enterprise) => {
          if (err) {
            reject(err);
          } else if (!enterprise) {
            reject(new Error("Enterprise not found"));
          } else {
            resolve(enterprise);
          }
        }
      );
    });

    const enterpriseID = enterprise.EnterpriseID;
    const currentDate = new Date().toISOString().split("T")[0];
    const parsedPermissions = JSON.stringify(permissions);

    // Insert users into the User table if they don't exist
    const userInsertStmt = db.prepare(
      "INSERT OR IGNORE INTO User (UserId, Email, FirstName, LastName, PhoneNumber, RegistrationDate, Login, Password, Permissions) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );

    const hashedData = parseUserDataFromHash(userHashes);
    const uid = getRandomInt(1000);

    userInsertStmt.run(
      uid,
      userData.email,
      userData.firstName,
      userData.lastName,
      userData.phoneNumber,
      currentDate,
      hashedData.login,
      hashedData.password,
      parsedPermissions
    );

    const userID = await getUserIDByEmail(db, userData.email);

    if (userID) {
      // Insert users into the UserEnterprise table
      const userEnterpriseInsertStmt = db.prepare(
        "INSERT INTO UserEnterprise (UserID, EnterpriseID) VALUES (?, ?)"
      );

      userEnterpriseInsertStmt.run(userID, enterpriseID);

      userEnterpriseInsertStmt.finalize();
    }

    userInsertStmt.finalize();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  getAllUsers,
  getUsersByTaxId,
  getUsersRegisteredAfterDate,
  addUsersToEnterprise,
};

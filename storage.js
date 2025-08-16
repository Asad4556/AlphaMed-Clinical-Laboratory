/* ====== Local Storage Utility Functions ====== */

// Save data to localStorage
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Get data from localStorage
function getData(key) {
  let data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

// Add new record
function addRecord(key, record) {
  let data = getData(key);
  data.push(record);
  saveData(key, data);
}

// Update record by index
function updateRecord(key, index, newRecord) {
  let data = getData(key);
  if (index >= 0 && index < data.length) {
    data[index] = newRecord;
    saveData(key, data);
  }
}

// Delete record by index
function deleteRecord(key, index) {
  let data = getData(key);
  if (index >= 0 && index < data.length) {
    data.splice(index, 1);
    saveData(key, data);
  }
}

// Clear all records
function clearData(key) {
  localStorage.removeItem(key);
}

/* ====== Specific Storages ====== */
const STORAGE_KEYS = {
  PATIENTS: "patients",
  TESTS: "tests",
  USERS: "users",
  REPORTS: "reports"
};

// Example usage:
// addRecord(STORAGE_KEYS.PATIENTS, { name: "Ali", age: 35, test: "Blood Test" });
// let patients = getData(STORAGE_KEYS.PATIENTS);

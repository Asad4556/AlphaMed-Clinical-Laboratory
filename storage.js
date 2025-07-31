// ✅ Save data to localStorage
function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ✅ Load data from localStorage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

// ✅ Add new item to an existing list
function addToStorage(key, newItem) {
  const data = getFromStorage(key);
  data.push(newItem);
  saveToStorage(key, data);
}

// ✅ Add item only if not already exists (by unique key like CNIC or MRN)
function addUniqueToStorage(key, newItem, uniqueKey = "id") {
  const data = getFromStorage(key);
  const exists = data.some(item => item[uniqueKey] === newItem[uniqueKey]);
  if (!exists) {
    data.push(newItem);
    saveToStorage(key, data);
  }
}

// ✅ Get a single item matching a condition
function getOneFromStorage(key, conditionFn) {
  const data = getFromStorage(key);
  return data.find(conditionFn);
}

// ✅ Delete item(s) matching condition
function deleteFromStorage(key, conditionFn) {
  let data = getFromStorage(key);
  data = data.filter(item => !conditionFn(item));
  saveToStorage(key, data);
}

// ✅ Update item(s) matching condition
function updateStorage(key, conditionFn, updateFn) {
  let data = getFromStorage(key);
  data = data.map(item => {
    if (conditionFn(item)) {
      return updateFn(item);
    }
    return item;
  });
  saveToStorage(key, data);
}

// ✅ Remove entire key from localStorage
function clearStorageKey(key) {
  localStorage.removeItem(key);
}

// ✅ Wrap all methods in one service for easy use
const StorageService = {
  save: saveToStorage,
  get: getFromStorage,
  add: addToStorage,
  addUnique: addUniqueToStorage,
  getOne: getOneFromStorage,
  delete: deleteFromStorage,
  update: updateStorage,
  clear: clearStorageKey
};

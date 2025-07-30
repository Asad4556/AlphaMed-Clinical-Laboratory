// ✅ Save data to localStorage
function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ✅ Load data from localStorage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

// ✅ Add new item to an existing list in localStorage
function addToStorage(key, newItem) {
  const data = getFromStorage(key);
  data.push(newItem);
  saveToStorage(key, data);
}

// ✅ Delete item by index or condition
function deleteFromStorage(key, conditionFn) {
  let data = getFromStorage(key);
  data = data.filter(item => !conditionFn(item));
  saveToStorage(key, data);
}

// ✅ Update item by condition
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

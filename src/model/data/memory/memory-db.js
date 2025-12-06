// src/model/data/memory/memory-db.js
const store = new Map();

function key(ownerId, id) {
  return `${ownerId}:${id}`;
}

function put(ownerId, id, fragment) {
  store.set(key(ownerId, id), fragment);
  return fragment;
}

function get(ownerId, id) {
  return store.get(key(ownerId, id)) || null;
}

async function query(ownerId) {
  const result = [];
  for (const [k, v] of store.entries()) {
    if (k.startsWith(`${ownerId}:`)) {
      result.push(v);
    }
  }
  return result;
}

async function del(ownerId, id) {
  store.delete(key(ownerId, id));
}

module.exports = {
  put,
  get,
  query,
  del,
};

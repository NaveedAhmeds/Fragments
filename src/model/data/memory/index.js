// src/model/data/memory/index.js

const { createStore } = require('./memory-db');

// Two independent in-memory stores: one for fragment metadata, one for raw data
const data = createStore();
const metadata = createStore();

// Write a fragment's metadata
function writeFragment(fragment) {
  return Promise.resolve(metadata.put(fragment.ownerId, fragment.id, fragment));
}

// Read a fragment's metadata
function readFragment(ownerId, id) {
  return Promise.resolve(metadata.get(ownerId, id));
}

// Write a fragment's data buffer
function writeFragmentData(ownerId, id, buffer) {
  return Promise.resolve(data.put(ownerId, id, buffer));
}

// Read a fragment's data buffer
function readFragmentData(ownerId, id) {
  return Promise.resolve(data.get(ownerId, id));
}

// List fragments for a user.
// - expand=true: return objects with id, ownerId, type, created, data
// - expand=false: return objects with only { id }
async function listFragments(ownerId, expand = false) {
  const fragments = await metadata.query(ownerId);

  if (!fragments || fragments.length === 0) {
    return [];
  }

  if (expand) {
    const expanded = await Promise.all(
      fragments.map(async (f) => ({
        id: f.id,
        ownerId: f.ownerId,
        type: f.type,
        created: f.created,
        data: await readFragmentData(ownerId, f.id),
      }))
    );
    return expanded;
  }

  return fragments.map((f) => ({ id: f.id }));
}

// Delete both metadata and data
function deleteFragment(ownerId, id) {
  return Promise.all([metadata.del(ownerId, id), data.del(ownerId, id)]);
}

module.exports = {
  listFragments,
  writeFragment,
  readFragment,
  writeFragmentData,
  readFragmentData,
  deleteFragment,
};

// src/services/fragmentService.js
const data = require('../model/data');

// Create a new fragment for a user
async function createFragment(user, type, buffer) {
  const ownerId = user; // whatever you store as owner (e.g., req.user)
  const id = String(Date.now()); // or use your existing ID strategy

  const fragment = {
    id,
    ownerId,
    owner: ownerId,
    type,
    created: new Date().toISOString(),
  };

  // Save metadata (MemoryDB)
  await data.writeFragment(fragment);
  // Save data (S3)
  await data.writeFragmentData(ownerId, id, buffer);

  return fragment;
}

// List fragments for a user
async function getFragmentsForUser(user, expand = false) {
  const ownerId = user;
  return data.listFragments(ownerId, expand);
}

// Get fragment metadata + data for a user/id
async function getFragmentById(user, id) {
  const ownerId = user;
  const fragment = await data.readFragment(ownerId, id);
  if (!fragment) {
    return null;
  }
  const buffer = await data.readFragmentData(ownerId, id);
  return {
    id: fragment.id,
    owner: fragment.ownerId || fragment.owner,
    type: fragment.type,
    created: fragment.created,
    data: buffer,
  };
}

// Delete fragment metadata + data
async function deleteFragmentById(user, id) {
  const ownerId = user;
  const fragment = await data.readFragment(ownerId, id);
  if (!fragment) {
    return false;
  }
  await data.deleteFragment(ownerId, id);
  return true;
}

module.exports = {
  createFragment,
  getFragmentsForUser,
  getFragmentById,
  deleteFragmentById,
};

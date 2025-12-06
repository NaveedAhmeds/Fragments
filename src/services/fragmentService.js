let fragments = []; // real store would be DB

function createFragment(user, type, data) {
  const newFragment = {
    id: String(fragments.length + 1),
    owner: user || 'testuser',
    type,
    data,
    created: new Date().toISOString(),
  };
  fragments.push(newFragment);

  return Promise.resolve(newFragment);
}

function getFragmentsForUser(user) {
  return Promise.resolve(fragments.filter((frag) => frag.owner === user));
}

function getFragmentById(user, id) {
  return Promise.resolve(
    fragments.find((frag) => frag.id === id && frag.owner === user)
  );
}

module.exports = {
  createFragment,
  getFragmentsForUser,
  getFragmentById,
};

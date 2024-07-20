function Empty(info) {
  const { resourceName } = info
  return <p>No {resourceName} could be found.</p>;
}

export default Empty;

function mockFile({ name = 'file.txt', size = 1024, type = 'plain/txt' }) {
  const blob = new Blob(['a'.repeat(size)], { type });
  return new File([blob], name);
}

export default mockFile;

export const createPost = async (data: string) => {
  const res = await fetch('/api/post', {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('something went wrong');
  }

  return await res.json();
};

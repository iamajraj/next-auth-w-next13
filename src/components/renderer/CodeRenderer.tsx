'use client';

function CodeRenderer({ data }: any) {
  data;

  return (
    <pre className="bg-gray-800 rounded-md p-4">
      <code className="text-gray-100 text-sm">{data.code}</code>
    </pre>
  );
}

export default CodeRenderer;
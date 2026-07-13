/**
 * Renders a JSON-LD <script> block. Server component — the structured data
 * is present in the initial HTML so generative bots can read it (GSO #3/#4).
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = Array.isArray(data) ? data : [data];
  return (
    <>
      {json.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Structured data is static and trusted (built from our own content).
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

import { DocumentPageClient } from "./DocumentPageClient";

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DocumentPageClient id={id} />;
}

import { DocumentViewer } from "@/widgets/DocumentViewer";

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DocumentViewer id={id} />;
}

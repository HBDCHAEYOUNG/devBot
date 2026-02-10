import type {
  GeneratedDocument,
  GenerateDocumentResponse,
  GenerateDocumentRequest,
  TemplateType,
} from "@/types/document.types";

const STORAGE_KEY = "my-documents";

export const documentStorage = {
  // Create
  save(
    apiResponse: GenerateDocumentResponse,
    requestInfo: GenerateDocumentRequest
  ): GeneratedDocument {
    const documents = this.getAll();
    const now = new Date().toISOString();

    const newDocument: GeneratedDocument = {
      id: crypto.randomUUID(),
      title: apiResponse.title,
      body: apiResponse.body,
      hashtags: apiResponse.hashtags,
      templateType: requestInfo.templateType,
      topic: requestInfo.topic,
      difficulty: requestInfo.difficulty,
      length: requestInfo.length,
      createdAt: now,
      updatedAt: now,
    };

    documents.push(newDocument);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));

    return newDocument;
  },

  // Read
  getAll(): GeneratedDocument[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  getById(id: string): GeneratedDocument | null {
    return this.getAll().find((doc) => doc.id === id) || null;
  },

  getByTemplate(templateType: TemplateType): GeneratedDocument[] {
    return this.getAll().filter((doc) => doc.templateType === templateType);
  },

  getRecent(limit: number = 10): GeneratedDocument[] {
    return this.getAll()
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, limit);
  },

  search(query: string): GeneratedDocument[] {
    const lowerQuery = query.toLowerCase();
    return this.getAll().filter(
      (doc) =>
        doc.title.toLowerCase().includes(lowerQuery) ||
        doc.topic.toLowerCase().includes(lowerQuery)
    );
  },

  // Update
  update(
    id: string,
    updates: Partial<Pick<GeneratedDocument, "title" | "body" | "hashtags">>
  ): GeneratedDocument | null {
    const documents = this.getAll();
    const index = documents.findIndex((doc) => doc.id === id);

    if (index === -1) return null;

    documents[index] = {
      ...documents[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
    return documents[index];
  },

  // Delete
  delete(id: string): boolean {
    const documents = this.getAll();
    const filtered = documents.filter((doc) => doc.id !== id);

    if (filtered.length === documents.length) return false;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  deleteMultiple(ids: string[]): { success: number; failed: number } {
    let success = 0;
    let failed = 0;

    ids.forEach((id) => {
      if (this.delete(id)) success++;
      else failed++;
    });

    return { success, failed };
  },

  // Utility
  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  },
};

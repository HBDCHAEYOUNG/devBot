export async function generateWithAPI(prompt: string): Promise<string> {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ error: "알 수 없는 오류" }));
    throw new Error(errorData.error || "API 호출에 실패했습니다.");
  }

  const data = await response.json();
  return data.content;
}

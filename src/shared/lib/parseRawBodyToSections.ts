export function parseRawBodyToSections(raw: string): Record<string, string> {
    raw = raw.replace(/\n{2,}/g, "\n"); // 2개 이상 줄바꿈을 1개로
    const lines = raw.split(/\r?\n/).map((line) => line.trimEnd());
    const result: Record<string, string[]> = {};
  
    const headers = [
      "1. 장애 발생 시간 :",
      "2. 장애 확인 경로 :",
      "3. 장애 증상 :",
      "4. 영향 범위 :",
    ];
  
    let currentHeader: string | null = null;
  
    for (const line of lines) {
      if (line.startsWith("[image:")) continue;
      
      const matchedHeader = headers.find((h) => line.startsWith(h));
  
      if (matchedHeader) {
        currentHeader = matchedHeader;
        const content = line.replace(matchedHeader, "").trim();
        result[matchedHeader] = content ? [content] : [];
      } else if (currentHeader) {
        const etcKey = currentHeader;
        if (!result[etcKey]) result[etcKey] = [];
        result[etcKey].push(line);
      }
    }
  
    headers.forEach((h) => {
      if (!result[h]) result[h] = [];
    });
  
    // 문자열로 합쳐서 반환
    const finalResult: Record<string, string> = {};
    for (const key in result) {
      finalResult[key] = result[key].join(" ");
    }
  
    return finalResult;
  }
  
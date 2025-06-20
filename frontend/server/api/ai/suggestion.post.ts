// server/api/ai/suggestion.post.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  if (!body.prompt) {
    throw createError({
      statusCode: 400,
      statusMessage: "Prompt is required",
    });
  }

  try {
    const promptText = `
    Bạn là AI chuyên gia về việc viết mô tả dự án freelance. Hãy giúp tôi tạo một mô tả dự án chuyên nghiệp từ ý tưởng sau:
    
    "${body.prompt}"
    
    Hãy trả về JSON với format sau:
    {
      "title": "Tiêu đề dự án ngắn gọn và hấp dẫn",
      "description": "Mô tả chi tiết dự án bằng HTML, bao gồm: mục tiêu, yêu cầu chức năng, thiết kế UI/UX, timeline",
      "suggestedTechnologies": ["Công nghệ 1", "Công nghệ 2", "..."],
      "suggestedTags": ["Tag 1", "Tag 2", "..."],
      "estimatedBudget": {
        "min": 5000000,
        "max": 15000000
      }
    }

    Lưu ý:
    - Description phải là HTML format hoàn chỉnh với các thẻ <h3>, <p>, <ul>, <li>
    - Công nghệ phải phù hợp với dự án
    - Budget tính bằng VNĐ
    - Chỉ trả về JSON, không có text thừa
    `;

    const requestData = {
      contents: [
        {
          parts: [
            {
              text: promptText,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    };

    const response = await $fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${config.geminiApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestData,
      }
    );

    const aiText = response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const cleanJson = aiText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    try {
      const suggestion = JSON.parse(cleanJson);
      return suggestion;
    } catch {
      throw createError({
        statusCode: 500,
        statusMessage: "Error parsing AI response",
      });
    }
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error calling Gemini API",
    });
  }
});

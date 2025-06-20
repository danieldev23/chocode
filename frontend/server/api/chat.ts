// server/api/chat.ts
import { defineEventHandler, readBody, getQuery } from "h3";
import axios from "axios";
const config = useRuntimeConfig();

const baseURL = config.public.BASE_API_URL;

export default defineEventHandler(async (event) => {
  const method = event.method;
  const query = getQuery(event);

  try {
    if (method === "GET" && query.userId) {
      // Get messages for specific user
      const res = await axios.get(`${baseURL}/chat/user`, {
        params: { userId: query.userId },
      });
      console.log("User messages response:", res.data);
      return res.data;
    }

    if (method === "GET") {
      const res = await axios.get(`${baseURL}/chat`);
      if (Array.isArray(res.data)) {
        return res.data;
      } else if (res.data && Array.isArray(res.data.data)) {
        return res.data.data;
      } else if (res.data && Array.isArray(res.data.messages)) {
        return res.data.messages;
      } else {
        console.warn("Unexpected backend response format:", res.data);
        return [];
      }
    }

    if (method === "POST") {
      // Create new message
      const body = await readBody(event);
      console.log("Creating new message:", body);
      const res = await axios.post(`${baseURL}/chat`, body);
      console.log("Message creation response:", res.data);
      return res.data;
    }

    if (method === "DELETE" && query.messageId) {
      // Delete message by messageId
      const res = await axios.delete(`${baseURL}/chat`, {
        params: { messageId: query.messageId },
      });
      return res.data;
    }

    return { error: "Invalid request method" };
  } catch (err: any) {
    console.error("API Error:", err.response?.data || err.message);
    if (method === "GET") {
      return []; // Return empty array for GET requests on error
    }
    return { error: err.response?.data || err.message };
  }
});

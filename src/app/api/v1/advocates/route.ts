import db from "@/db";
import {
  RequestInput,
  requestSchema,
  ResponseOutput,
  responseSchema,
} from "../../api-models/v1/advocates/get";
import { handlerWrapper } from "../../lambda/wrapper";
import { getPaginatedAdvocates } from "../../query/advocates";
import { logger } from "../../utils/logger";

export async function GET(request: Request) {
  return handlerWrapper<RequestInput, ResponseOutput>(
    request,
    {
      requireAuth: false,
      logRequest: true,
      inputSchema: requestSchema,
      outputSchema: responseSchema,
    },
    async ({ query }) => {
      const { page, limit } = query;

      const data = await getPaginatedAdvocates(db, page, limit);

      logger.info("Paginated advocates fetched:", {
        page,
        limit,
        count: data.length,
      });

      return {
        status: 200,
        body: { data },
      };
    }
  );
}

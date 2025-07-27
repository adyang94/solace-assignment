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
      logRequest: false,
      inputSchema: requestSchema,
      outputSchema: responseSchema,
    },
    async ({ query }) => {
      const { page, limit, search } = query;

      const { data, hasNextPage } = await getPaginatedAdvocates(
        db,
        page,
        limit,
        search
      );

      logger.info("Paginated advocates fetched:", {
        page,
        limit,
        count: data.length,
        hasNextPage,
      });

      return {
        status: 200,
        body: { data, hasNextPage },
      };
    }
  );
}

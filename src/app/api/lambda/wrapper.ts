import { z } from "zod";
import { logger } from "../utils/logger";
import { validateSchema } from "../utils/validate";

export async function handlerWrapper<TInput, TOutput>(
  request: Request,
  options: {
    requireAuth?: boolean;
    logRequest?: boolean;
    inputSchema?: z.ZodSchema<TInput>;
    outputSchema?: z.ZodSchema<TOutput>;
  },
  handler: (
    validatedInput: TInput
  ) => Promise<{ status: number; body: TOutput }>
): Promise<Response> {
  try {
    if (options.logRequest) {
      logger.info(request);
    }

    if (options.requireAuth && !checkAuthorization()) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const url = new URL(request.url);
    const query = Object.fromEntries(url.searchParams.entries());

    let body = {};
    if (request.method !== "GET") {
      try {
        body = await request.json();
      } catch {
        body = {};
      }
    }

    const composedInput = { query, body };

    const validatedInput = validateSchema(composedInput, options.inputSchema);
    if (!validatedInput.success) {
      return new Response(
        JSON.stringify({
          error: "Invalid request format",
          issues: validatedInput.issues,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { status, body: result } = await handler(validatedInput.data);

    const validatedOutput = validateSchema(result, options.outputSchema);
    if (!validatedOutput.success) {
      return new Response(
        JSON.stringify({
          error: "Invalid response format",
          issues: validatedOutput.issues,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(result), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    logger.error("API request failed", error);

    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

const isDev = process.env.NODE_ENV !== "production";

const formatMessage = (level: "info" | "error", args: any[]) => {
  const timestamp = new Date().toISOString();
  return [`[${timestamp}] [${level.toUpperCase()}]`, ...args];
};

export const logger = {
  // Ideally would a more robust logger, but for now, this will work.
  info: (...args: any[]) => {
    if (isDev) console.info(...formatMessage("info", args));
  },
  error: (...args: any[]) => {
    console.error(...formatMessage("error", args));
  },
};

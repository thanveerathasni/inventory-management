import { ERROR_MESSAGES } from "../../constants/messages";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const readMessage = (value: unknown): string | null => {
  if (!isRecord(value)) {
    return null;
  }

  const message = value.message ?? value._message;

  return typeof message === "string" ? message : null;
};

export const getApiErrorMessage = (error: unknown): string => {
  if (!isRecord(error)) {
    return ERROR_MESSAGES.GENERIC;
  }

  const responseMessage = readMessage(error.response);

  return responseMessage ?? readMessage(error) ?? ERROR_MESSAGES.GENERIC;
};

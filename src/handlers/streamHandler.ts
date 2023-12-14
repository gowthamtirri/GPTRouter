import { ProviderFactory } from "../providers/factory";
import { BasePromptParams } from "../schema";

export default async function* streamHandler({
  providerName,
  modelName,
  promptParams,
  timeout,
  maxRetries,
}: {
  providerName: string;
  modelName: string;
  promptParams: BasePromptParams;
  timeout: number;
  maxRetries: number;
}) {
  const providerInstance = ProviderFactory.createProvider(providerName);
  for await (const messageEvent of providerInstance.generateStream(modelName, promptParams, timeout, maxRetries)) {
    yield messageEvent;
  }
}

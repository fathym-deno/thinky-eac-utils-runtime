import {
  EaCRuntimeConfig,
  EaCRuntimePlugin,
  EaCRuntimePluginConfig,
} from '@fathym/eac/runtime';
import {
  EaCAzureOpenAILLMDetails,
  EaCChatPromptNeuron,
  EaCLinearCircuitDetails,
  EaCLLMNeuron,
  EaCPassthroughNeuron,
  EverythingAsCodeSynaptic,
} from '@fathym/synaptic';
import { z } from 'npm:zod';
import { FathymEaCStatusPlugin } from './utils/FathymEaCStatusPlugin.ts';
import { HumanMessage } from 'npm:@langchain/core/messages';
import { MessagesPlaceholder } from 'npm:@langchain/core/prompts';

export default class ThinkyEaCUtilsSynapticPlugin implements EaCRuntimePlugin {
  constructor() {}

  public Setup(_config: EaCRuntimeConfig) {
    const pluginConfig: EaCRuntimePluginConfig = {
      Name: ThinkyEaCUtilsSynapticPlugin.name,
      Plugins: [new FathymEaCStatusPlugin()],
      EaC: {
        AIs: {
          [ThinkyEaCUtilsSynapticPlugin.name]: {
            LLMs: {
              'azure-openai': {
                Details: {
                  Type: 'AzureOpenAI',
                  Name: 'Azure OpenAI LLM',
                  Description: 'The LLM for interacting with Azure OpenAI.',
                  APIKey: Deno.env.get('AZURE_OPENAI_KEY')!,
                  Endpoint: Deno.env.get('AZURE_OPENAI_ENDPOINT')!,
                  DeploymentName: 'gpt-4o',
                  ModelName: 'gpt-4o',
                  Streaming: true,
                  Verbose: false,
                } as EaCAzureOpenAILLMDetails,
              },
            },
          },
        },
        Circuits: {
          $neurons: {
            $pass: {
              Type: 'Passthrough',
            } as EaCPassthroughNeuron,
            [`${ThinkyEaCUtilsSynapticPlugin.name}|llm`]: {
              Type: 'LLM',
              LLMLookup: `${ThinkyEaCUtilsSynapticPlugin.name}|azure-openai`,
            } as EaCLLMNeuron,
          },
          test: {
            Details: {
              Type: 'Linear',
              BootstrapInput({ Input }: { Input: string }) {
                return {
                  Messages: [],
                };
              },
              Neurons: {
                '': {
                  Type: 'ChatPrompt',
                  SystemMessage: `You are a helpful distopian assistant, tell the user a story.`,
                  NewMessages: [new MessagesPlaceholder('Messages')],
                  Neurons: {
                    '': `${ThinkyEaCUtilsSynapticPlugin.name}|llm`,
                  },
                } as EaCChatPromptNeuron,
              },
            } as EaCLinearCircuitDetails,
          },
        },
      } as EverythingAsCodeSynaptic,
    };

    return Promise.resolve(pluginConfig);
  }
}

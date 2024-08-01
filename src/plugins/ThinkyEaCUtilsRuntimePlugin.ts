import {
  EaCRuntimeConfig,
  EaCRuntimePlugin,
  EaCRuntimePluginConfig,
  FathymAzureContainerCheckPlugin,
  FathymDFSFileHandlerPlugin,
  FathymEaCServicesPlugin,
} from '@fathym/eac/runtime';
import { EaCSynapticCircuitsProcessor, FathymSynapticPlugin } from '@fathym/synaptic';
import { DefaultThinkyEaCUtilsProcessorHandlerResolver } from './DefaultThinkyEaCUtilsProcessorHandlerResolver.ts';
import ThinkyEaCUtilsSynapticPlugin from './ThinkyEaCUtilsSynapticPlugin.ts';
import { IoCContainer } from '@fathym/ioc';

export default class ThinkyEaCUtilsRuntimePlugin implements EaCRuntimePlugin {
  constructor() {}

  public Setup(config: EaCRuntimeConfig) {
    const pluginConfig: EaCRuntimePluginConfig = {
      Name: ThinkyEaCUtilsRuntimePlugin.name,
      Plugins: [
        new FathymAzureContainerCheckPlugin(),
        new ThinkyEaCUtilsSynapticPlugin(),
        new FathymSynapticPlugin(),
      ],
      IoC: new IoCContainer(),
      EaC: {
        Projects: {
          core: {
            Details: {
              Name: 'Core Micro Applications',
              Description: 'The Core Micro Applications to use.',
              Priority: 100,
            },
            ResolverConfigs: {
              localhost: {
                Hostname: 'localhost',
                Port: config.Server.port || 8000,
              },
              '127.0.0.1': {
                Hostname: '127.0.0.1',
                Port: config.Server.port || 8000,
              },
            },
            ModifierResolvers: {},
            ApplicationResolvers: {
              circuits: {
                PathPattern: '/circuits*',
                Priority: 100,
              },
            },
          },
        },
        Applications: {
          circuits: {
            Details: {
              Name: 'Circuits',
              Description: 'The API for accessing circuits',
            },
            ModifierResolvers: {},
            Processor: {
              Type: 'SynapticCircuits',
            } as EaCSynapticCircuitsProcessor,
          },
        },
      },
    };

    pluginConfig.IoC!.Register(DefaultThinkyEaCUtilsProcessorHandlerResolver, {
      Type: pluginConfig.IoC!.Symbol('ProcessorHandlerResolver'),
    });

    return Promise.resolve(pluginConfig);
  }
}

import * as _azureSearch from 'npm:@azure/search-documents';
import * as _parse from 'npm:pdf-parse';
import * as _htmlToText from 'npm:html-to-text';
import {
  DefaultEaCConfig,
  defineEaCConfig,
  EaCRuntime,
} from '@fathym/eac/runtime';
import ThinkyEaCUtilsRuntimePlugin from '../src/plugins/ThinkyEaCUtilsRuntimePlugin.ts';

export const config = defineEaCConfig({
  Server: {
    port: 6152,
  },
  Plugins: [
    ...(DefaultEaCConfig.Plugins || []),
    new ThinkyEaCUtilsRuntimePlugin(),
  ],
});

export function configure(_rt: EaCRuntime): Promise<void> {
  return Promise.resolve();
}

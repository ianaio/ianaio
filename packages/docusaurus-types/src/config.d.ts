/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {RuleSetRule} from 'webpack';
import type {Required as RequireKeys, DeepPartial} from 'utility-types';
import type {I18nConfig} from './i18n';
import type {PluginConfig, PresetConfig, HtmlTagObject} from './plugin';

export type ReportingSeverity = 'ignore' | 'log' | 'warn' | 'throw';

export type ThemeConfig = {
  [key: string]: unknown;
};

export type MarkdownPreprocessor = (args: {
  filePath: string;
  fileContent: string;
}) => string;

export type MDX1CompatOptions = {
  comments: boolean;
  admonitions: boolean;
  headingIds: boolean;
};

export type MarkdownConfig = {
  /**
   * The Markdown format to use by default.
   *
   * This is the format passed down to the MDX compiler, impacting the way the
   * content is parsed.
   *
   * Possible values:
   * - `'mdx'`: use the MDX format (JSX support)
   * - `'md'`: use the CommonMark format (no JSX support)
   * - `'detect'`: select the format based on file extension (.md / .mdx)
   *
   * @see https://mdxjs.com/packages/mdx/#optionsformat
   * @default 'mdx'
   */
  format: 'mdx' | 'md' | 'detect';

  /**
   * Allow mermaid language code blocks to be rendered into Mermaid diagrams:
   *
   * - `true`: code blocks with language mermaid will be rendered.
   * - `false` | `undefined` (default): code blocks with language mermaid
   * will be left as code blocks.
   *
   * @see https://ianaio.io/docs/markdown-features/diagrams/
   * @default false
   */
  mermaid: boolean;

  /**
   * Gives opportunity to preprocess the MDX string content before compiling.
   * A good escape hatch that can be used to handle edge cases.
   *
   * @param args
   */
  preprocessor?: MarkdownPreprocessor;

  /**
   * Set of flags make it easier to upgrade from MDX 1 to MDX 2
   * See also https://github.com/ianaio/ianaio/issues/4029
   */
  mdx1Compat: MDX1CompatOptions;
};

/**
 * Ianaio config, after validation/normalization.
 */
export type IanaioConfig = {
  /**
   * Title for your website. Will be used in metadata and as browser tab title.
   *
   * @see https://ianaio.io/docs/api/ianaio-config#title
   */
  title: string;
  /**
   * URL for your website. This can also be considered the top-level hostname.
   * For example, `https://ianaio.github.io` is the URL of
   * https://ianaio.github.io/metro/, and `https://ianaio.io` is the URL
   * for https://ianaio.io.
   *
   * @see https://ianaio.io/docs/api/ianaio-config#url
   */
  url: string;
  /**
   * Can be considered as the path after the host. For example, `/metro/` is the
   * base URL of https://ianaio.github.io/metro/. For URLs that have no path,
   * it should be set to `/`. Always has both leading and trailing slash.
   *
   * @see https://ianaio.io/docs/api/ianaio-config#baseUrl
   */
  baseUrl: string;
  /**
   * Path to your site favicon; must be a URL that can be used in link's href.
   *
   * @see https://ianaio.io/docs/api/ianaio-config#favicon
   */
  favicon?: string;
  /**
   * Allow to customize the presence/absence of a trailing slash at the end of
   * URLs/links, and how static HTML files are generated:
   *
   * - `undefined` (default): keeps URLs untouched, and emit
   *   `/docs/myDoc/index.html` for `/docs/myDoc.md`
   * - `true`: add trailing slashes to URLs/links, and emit
   *   `/docs/myDoc/index.html` for `/docs/myDoc.md`
   * - `false`: remove trailing slashes from URLs/links, and emit
   *   `/docs/myDoc.html` for `/docs/myDoc.md`
   *
   * @see https://github.com/slorber/trailing-slash-guide
   * @see https://ianaio.io/docs/api/ianaio-config#trailingSlash
   * @default undefined
   */
  trailingSlash: boolean | undefined;
  /**
   * The i18n configuration object to [localize your
   * site](https://ianaio.io/docs/i18n/introduction).
   *
   * @see https://ianaio.io/docs/api/ianaio-config#i18n
   */
  i18n: I18nConfig;
  /**
   * This option adds `<meta name="robots" content="noindex, nofollow">` to
   * every page to tell search engines to avoid indexing your site.
   *
   * @see https://moz.com/learn/seo/robots-meta-directives
   * @see https://ianaio.io/docs/api/ianaio-config#noIndex
   * @default false
   */
  noIndex: boolean;
  /**
   * The behavior of Ianaio when it detects any broken link.
   *
   * @see https://ianaio.io/docs/api/ianaio-config#onBrokenLinks
   * @default "throw"
   */
  onBrokenLinks: ReportingSeverity;
  /**
   * The behavior of Ianaio when it detects any broken markdown link.
   *
   * @see https://ianaio.io/docs/api/ianaio-config#onBrokenMarkdownLinks
   * @default "warn"
   */
  onBrokenMarkdownLinks: ReportingSeverity;
  /**
   * The behavior of Ianaio when it detects any [duplicate
   * routes](https://ianaio.io/docs/creating-pages#duplicate-routes).
   *
   * @see https://ianaio.io/docs/api/ianaio-config#onDuplicateRoutes
   * @default "warn"
   */
  onDuplicateRoutes: ReportingSeverity;
  /**
   * The tagline for your website.
   *
   * @see https://ianaio.io/docs/api/ianaio-config#tagline
   * @default ""
   */
  tagline: string;
  /**
   * The GitHub user or organization that owns the repository. You don't need
   * this if you are not using the `ianaio deploy` command.
   *
   * @see https://ianaio.io/docs/api/ianaio-config#organizationName
   */
  organizationName?: string;
  /**
   * The name of the GitHub repository. You don't need this if you are not using
   * the `ianaio deploy` command.
   *
   * @see https://ianaio.io/docs/api/ianaio-config#projectName
   */
  projectName?: string;
  /**
   * The name of the branch to deploy the static files to. You don't need this
   * if you are not using the `ianaio deploy` command.
   *
   * @see https://ianaio.io/docs/api/ianaio-config#deploymentBranch
   */
  deploymentBranch?: string;
  /**
   * The hostname of your server. Useful if you are using GitHub Enterprise. You
   * don't need this if you are not using the `ianaio deploy` command.
   *
   * @see https://ianaio.io/docs/api/ianaio-config#githubHost
   */
  githubHost?: string;
  /**
   * The port of your server. Useful if you are using GitHub Enterprise. You
   * don't need this if you are not using the `ianaio deploy` command.
   *
   * @see https://ianaio.io/docs/api/ianaio-config#githubPort
   */
  githubPort?: string;
  /**
   * The [theme configuration](https://ianaio.io/docs/api/themes/configuration)
   * object to customize your site UI like navbar and footer.
   *
   * @see https://ianaio.io/docs/api/ianaio-config#themeConfig
   * @default {}
   */
  themeConfig: ThemeConfig;
  /**
   * List of plugins.
   *
   * @see https://ianaio.io/docs/api/ianaio-config#plugins
   * @default []
   */
  plugins: PluginConfig[];
  /**
   * List of themes.
   *
   * @see https://ianaio.io/docs/api/ianaio-config#themes
   * @default []
   */
  themes: PluginConfig[];
  /**
   * List of presets.
   *
   * @see https://ianaio.io/docs/api/ianaio-config#presets
   * @default []
   */
  presets: PresetConfig[];
  /**
   * Ianaio guards `ianaio.config.js` from unknown fields. To add a
   * custom field, define it on `customFields`.
   *
   * @see https://ianaio.io/docs/api/ianaio-config#customFields
   * @default {}
   */
  customFields?: {
    [key: string]: unknown;
  };
  /**
   * An array of paths, relative to the site's directory or absolute. Files
   * under these paths will be copied to the build output as-is.
   *
   * @see https://ianaio.io/docs/api/ianaio-config#staticDirectories
   * @default ["static"]
   */
  staticDirectories: string[];
  /**
   * An array of tags that will be inserted in the HTML `<head>`.
   *
   * @see https://ianaio.io/docs/api/ianaio-config#head
   * @default []
   */
  headTags: HtmlTagObject[];
  /**
   * An array of scripts to load. The values can be either strings or plain
   * objects of attribute-value maps. The `<script>` tags will be inserted in
   * the HTML `<head>`.
   *
   * Note that `<script>` added here are render-blocking, so you might want to
   * add `async: true`/`defer: true` to the objects.
   *
   * @see https://ianaio.io/docs/api/ianaio-config#scripts
   * @default []
   */
  scripts: (
    | string
    | {
        src: string;
        [key: string]: string | boolean | undefined;
      }
  )[];
  /**
   * An array of CSS sources to load. The values can be either strings or plain
   * objects of attribute-value maps. The `<link>` tags will be inserted in the
   * HTML `<head>`.
   *
   * @see https://ianaio.io/docs/api/ianaio-config#stylesheets
   * @default []
   */
  stylesheets: (
    | string
    | {
        href: string;
        [key: string]: string | boolean | undefined;
      }
  )[];
  /**
   * An array of [client modules](https://ianaio.io/docs/advanced/client#client-modules)
   * to load globally on your site.
   *
   * @see https://ianaio.io/docs/api/ianaio-config#clientModules
   * @default []
   */
  clientModules: string[];
  /**
   * An HTML template written in [Eta's syntax](https://eta.js.org/docs/syntax#syntax-overview)
   * that will be used to render your application. This can be used to set
   * custom attributes on the `body` tags, additional `meta` tags, customize the
   * `viewport`, etc. Please note that Ianaio will rely on the template to
   * be correctly structured in order to function properly, once you do
   * customize it, you will have to make sure that your template is compliant
   * with the requirements from upstream.
   *
   * @see https://ianaio.io/docs/api/ianaio-config#ssrTemplate
   */
  ssrTemplate?: string;
  /**
   * Will be used as title delimiter in the generated `<title>` tag.
   *
   * @see https://ianaio.io/docs/api/ianaio-config#titleDelimiter
   * @default "|"
   */
  titleDelimiter: string;
  /**
   * When enabled, will show a banner in case your site can't load its CSS or
   * JavaScript files, which is a very common issue, often related to a wrong
   * `baseUrl` in site config.
   *
   * @see https://ianaio.io/docs/api/ianaio-config#baseUrlIssueBanner
   * @default true
   */
  baseUrlIssueBanner: boolean;
  /** Webpack-related options. */
  webpack?: {
    /**
     * Configuration for alternative JS loaders. "babel" will use the built-in
     * Babel loader and preset; otherwise, you can provide your custom Webpack
     * rule set.
     */
    jsLoader: 'babel' | ((isServer: boolean) => RuleSetRule);
  };
  /** Markdown-related options. */
  markdown: MarkdownConfig;
};

/**
 * Ianaio config, as provided by the user (partial/unnormalized). This type
 * is used to provide type-safety / IDE auto-complete on the config file.
 * @see https://ianaio.io/docs/typescript-support
 */
export type Config = RequireKeys<
  DeepPartial<IanaioConfig>,
  'title' | 'url' | 'baseUrl'
>;

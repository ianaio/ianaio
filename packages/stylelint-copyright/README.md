# `stylelint-copyright`

Stylelint plugin to check CSS files for a copyright header.

```css
/*
 * Copyright ...
 * ...
 */
```

## Usage

```json
// .stylelintrc
{
  "plugins": ["stylelint-copyright"],
  "rules": {
    "ianaio/copyright-header": [true, {"header": "\n * Copyright"}]
  }
}
```

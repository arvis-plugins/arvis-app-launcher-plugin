# arvis-app-launcher-plugin

Cross platform app launcher plugin for [Arvis](https://github.com/jopemachine/arvis)

Demo on mac: 

![](./demo.gif)

## Installation

```
$ npm i -g arvis-app-launcher-plugin
```

## Config

You can edit this plugin's config.

You can open the config file by typing or copy and paste `@config/arvis-app-launcher-plugin` to Arvis.

### applicationFolder

type: `object`

default value: 

* windows: `C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs`

* macos: `/Applications`

* linux: `/usr/share/applications`

Change the path you want to assign to explore.

If this plugin doesn't work properly, need to check this path exists.

### deep

type: `number`

default value: `3`

Sets the depth to explore

In macos, it is fixed by 1 to avoid to explore in App file.

### concurrency

type: `number | undefined`

default value: `os.cpus().length`

Specifies the number of cpu to use to explore.

## Icon sources

This plugin uses below icon sources

<a target="_blank" href="https://icons8.com">Image</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
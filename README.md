# FuckDarkPatterns

_A small, opinionated **\*cough\*** project, aimed at undoing manipulative interface decisions. Better known as dark pattern design._

This repository is not a collective yet. For now, it starts with a single userscript that restores missing controls to YouTube's embedded player. The intent is to expand it carefully. One script per problem, each narrowly scoped, transparent and easy to audit at first glance.

If you encounter a hostile UI, a missing control or a redesign that is actually a regression, from an annoying, bloated company that everyone relies on, open an issue. If you have a complete, clean fix with a similar coding style, open a pull request. The goal is not customisation or adding unnecessary features, but rather to cleanly restore baseline functionality that should never have been removed in the first place.

## [YouTubeEmbeddedPlayerScrubber.js](https://github.com/ScepticDope/FuckDarkPatterns/blob/main/YouTubeEmbeddedPlayerScrubber.js)
Restores the controls that have been removed from YouTube's, latest and greatest, embedded player on third-party sites. This does not apply to YouTube.com. It only works with the iframe player.

This script patches over the now borked UI and restores controls and functionality that should never have been removed.

### Features.

_Strips the dark pattern UX from the new YouTube embedded player, re-adds the play/pause, fullscreen and mute buttons, fullscreen via double-click, volume slider, volume control by arrow keys, 5 seconds arrow key scrubbing, position jumping via the 0–9 keys, jump to beginning/end via home/end keys, Shift + < or > to control playback speed and custom context menu with video URL copy functionality._

### Requirements.

Install a userscript manager. _(A userscript manager is a type of browser extension that enables you to run custom scripts on web pages.)_

* \*Tampermonkey _(\*Sadly not open source to public, but usable cross-platform and idiot proof. @derjanb y u not FOSS it once more? <3)_
* Violentmonkey
* Greasemonkey

## Installation instruction for n00bs.

1. Install a userscript manager of your choice.
2. Create a new script.
3. Copy paste entire code from a userscript here. No wait, hold on, not literally here, replace all the code in your new script file instead.
4. Save.
5. Feel like a kewl haX0r. o/

## Warning for bigger n00bs. DO NOT MODIFY the @match lines.

The YouTubeEmbeddedPlayerScrubber script, for a example, includes:

```js
// @match        *://www.youtube.com/embed/*
// @match        *://www.youtube-nocookie.com/embed/*
```

These are **correct**. Do **not** change them.

### But why??

Embedded YouTube players run inside an iframe. Even when the video appears on example.com, the player itself is loaded from either `youtube.com/embed/` or `youtube-nocookie.com/embed/` in an isolated context.

The script runs inside the iframe and not on the outer page. Therefore, the match rules must target the embed URL.

#### **Bad idea:**
`Match the script to the site hosting the embedded video.`

#### **Correct idea:**
`Match to the YouTube embed URL inside the iframe.`

Changing these lines will prevent the script from properly executing. Please do not contact me with this exact question.

## Why it no run on YouTube.com???

As I tried very hard to explain. This only affects the embedded player. It is designed to do exactly nothing on YouTube.com.

If you want to make improvements to YouTube itself, use tools such as:

--Ublock Origin
--SponsorBlock
--AdGuard Pro, for iOS
--An actual hammer?

## FAQ FOR LOVEABLE DUMB DUMBS <3

---
##### Q: Installed it but nothing happens on YouTube.com?? Oh, why, cruel world!?
##### A: Expected. Try testing it on a site that embeds YouTube videos.
---
##### Q: The embedded video on pageX still not has any controls?
##### A: Ensure that your userscript manager runs scripts in iframes, and that it is actually running if you are viewing a page in private mode.
---
##### Q: The script only activates sometimes on embedded players?
##### A: It only runs when the darkpattern UI/UX player is detected. If YouTube serves a full player, the script stays idle. And yes, there is a perfectly acceptable full player that they could continue to use, but they seem hardcore set on enshittifying it to make more monero.
---
##### Q: So I should change the @match lines for it to work, right?
##### A: By now, you must have realised that, yes, this is exactly what you should be doing.
---

## Contributing

Only PRs for full scripts are welcome. Keep it concise, no creeping or shenanigans plz. Help each other out in open issues.

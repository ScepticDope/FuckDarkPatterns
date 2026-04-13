// ==UserScript==
// @name         YouTube Embedded Player Scrubber
// @version      1.1
// @description  Strips the dark pattern UX from the new YouTube embedded player, re-adds the play/pause, fullscreen and mute buttons, fullscreen via double-click, volume slider, volume control by arrow keys, 5 seconds arrow key scrubbing, position jumping via the 0–9 keys and Shift + < or > to control playback speed.
// @match        *://www.youtube.com/embed/*
// @match        *://www.youtube-nocookie.com/embed/*
// @run-at       document-idle
// ==/UserScript==

(() => {
  "use strict";

  // Only run when an abnormal player is detected.
  if (!document.querySelector(".ytp-play-button")) {
    document.head.appendChild(
      Object.assign(document.createElement("style"), {
        textContent: `
          player-fullscreen-action-menu {
            display: none !important;
          }

          #ytc-pp,
          #ytc-fs {
            z-index: 9999;
            position: fixed;

            bottom: 8px;

            color: white;
            line-height: 1;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
            background: none;
            border: none;
            cursor: pointer;
          }
          #ytc-pp {
            left: 15px;

            font-size: 18px;
          }
          #ytc-fs {
            right: 8px;

            font-size: 22px;
          }

          #ytc-mute,
          #ytc-vol {
            z-index: 9999;
            position: fixed;

            bottom: 3px;

            color: white;
            line-height: 1;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
            background: none;
            border: none;
          }

          #ytc-mute {
            bottom: 8px;
            left: 48px;

            width: 18px;
            height: 18px;

            cursor: pointer;
            background: url('data:image/png;base64,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') no-repeat center center;
            background-size: contain;
          }

          #ytc-mute.muted::after {
            position: absolute;

            left: -2px;
            right: -2px;
            top: 50%;
            transform: rotate(45deg);
            transform-origin: center;

            height: 2px;

            content: "";
            background: white;
            pointer-events: none;
          }

          #ytc-vol {
            left: 75px;

            width: 42px;

            cursor: pointer;
            appearance: none;
            background: transparent;
          }

          #ytc-vol:focus {
            transform: translateY(-1.5px);
          }

          #ytc-vol::-webkit-slider-runnable-track {
            height: 3px;

            background: rgba(255, 255, 255, 0.6);
          }

          #ytc-vol::-moz-range-track {
            height: 3px;

            background: rgba(255, 255, 255, 0.6);
          }

          #ytc-vol::-webkit-slider-thumb {
            width: 8px;
            height: 8px;
            margin-top: -3px;

            appearance: none;
            border-radius: 50%;
            background: white;
          }

          #ytc-vol::-moz-range-thumb {
            width: 8px;
            height: 8px;

            border-radius: 50%;
            background: white;
            border: none;
          }

          #ytc-vol::-moz-focus-outer {
            border: 0;
          }
        `,
      }),
    );

    // Play/pause button.
    const ppBtn = Object.assign(document.createElement("button"), {
      id: "ytc-pp",
      textContent: "❚❚",
    });
    ppBtn.addEventListener("click", () =>
      document.querySelector(".player-control-play-pause-icon")?.click(),
    );

    const video = document.querySelector("video");
    video.addEventListener("play", () => {
      ppBtn.textContent = "❚❚";
      ppBtn.style.paddingLeft = "0";
    });
    video.addEventListener("pause", () => {
      ppBtn.textContent = "▶";
      ppBtn.style.paddingLeft = "1.5px";
    });

    // Fullscreen button.
    const fsBtn = Object.assign(document.createElement("button"), {
      id: "ytc-fs",
      textContent: "⛶",
    });
    fsBtn.addEventListener("click", () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        const player = document.getElementById("player");
        (player.requestFullscreen ?? player.webkitRequestFullscreen)?.call(player);
      }
    });

    // Fix double click fullscreen.
    document.body.addEventListener("dblclick", () => {
      const player = document.getElementById("player");

      if (document.fullscreenElement) {
        document.exitFullscreen?.();
      } else {
        (player.requestFullscreen ?? player.webkitRequestFullscreen)?.call(player);
      }
    });

    // Mute button.
    const muteBtn = Object.assign(document.createElement("button"), {
      id: "ytc-mute",
    });

    muteBtn.addEventListener("click", () => {
      video.muted = !video.muted;
      muteBtn.classList.toggle("muted", video.muted);
    });

    video.addEventListener("volumechange", () => {
      muteBtn.classList.toggle("muted", video.muted);
    });

    // Volume slider.
    const vol = Object.assign(document.createElement("input"), {
      id: "ytc-vol",
      type: "range",
      min: 0,
      max: 1,
      step: 0.01,
      value: video.volume,
    });

    vol.addEventListener("input", () => {
      video.volume = vol.value;
      video.muted = vol.value == 0;
    });

    // Mouse wheel volume.
    vol.addEventListener("wheel", (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.05 : 0.05;
      const v = Math.min(1, Math.max(0, video.volume + delta));
      video.volume = v;
      video.muted = v === 0;
    });

    // Volume control by arrow keys.
    window.addEventListener(
      "keydown",
      function (e) {
        if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
        e.stopImmediatePropagation();
        e.preventDefault();
        const v = Math.min(
          1,
          Math.max(0, video.volume + (e.key === "ArrowUp" ? 0.05 : -0.05)),
        );
        video.muted = false;
        video.volume = v;
      },
      true,
    );

    // Update slider and mute icon.
    video.addEventListener("volumechange", () => {
      muteBtn.classList.toggle("muted", video.muted);
      vol.value = video.muted ? 0 : video.volume;

      // Fix for edgecases where user is spamming volume controls using different features and mute messes up.
      video.muted = v === 0;
    });

    // Add all elements.
    function fullscreenchangeHandler() {
      [fsBtn, vol, muteBtn, ppBtn].forEach((el) => el.remove());
      if (document.fullscreenElement) {
        document.querySelector(".html5-video-player").prepend(fsBtn, vol, muteBtn, ppBtn);
      } else {
        document.body.prepend(fsBtn, vol, muteBtn, ppBtn);
      }
    }
    document.addEventListener("fullscreenchange", fullscreenchangeHandler);
    fullscreenchangeHandler();

    // Set arrow key scrubbing to 5 seconds.
    window.addEventListener(
      "keydown",
      function (e) {
        if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

        e.stopImmediatePropagation();
        e.preventDefault();

        if (e.key === "ArrowLeft") {
          video.currentTime -= 5;
        } else {
          video.currentTime += 5;
        }
      },
      true,
    );

    // Make numbers 0-9 jump to % time in video.
    window.addEventListener(
      "keydown",
      function (e) {
        if (!/^[0-9]$/.test(e.key)) return;

        e.stopImmediatePropagation();
        e.preventDefault();

        const percentage = parseInt(e.key) / 10;
        video.currentTime = video.duration * percentage;
      },
      true,
    );

    // Use Shift + < or > to decrease or increase playback speed.
    window.addEventListener("keydown", function (e) {
      if (e.key !== "<" && e.key !== ">") return;
      e.stopImmediatePropagation();
      e.preventDefault();
      video.playbackRate = Math.min(2, Math.max(0.25, Math.round((video.playbackRate + (e.key === ">" ? 0.25 : -0.25)) * 100) / 100));
    }, true);
  }
})();

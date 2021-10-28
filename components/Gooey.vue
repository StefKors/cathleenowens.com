<template>
  <div class="blobwrapper">
    <div class="blob">
      <!-- This SVG is from https://codepen.io/Ali_Farooq_/pen/gKOJqx -->
      <svg viewBox="0 0 310 350">
        <path
          d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
// import SimplexNoise from "https://cdn.skypack.dev/simplex-noise@2.4.0"

export default {
  props: ["intensity", "id", "style"],
  data() {
    return {
      blur:
        this.intensity === "weak" ? 8 : this.intensity === "strong" ? 16 : 12,
      alpha: this.blur * 6,
      shift: this.alpha / -2,
      r: "1 0 0 0 0",
      g: "0 1 0 0 0",
      b: "0 0 1 0 0",
      a: `0 0 0 ${this.alpha} ${this.shift}`,
    }
  },
  mounted() {},
}
</script>

<style>
.blobwrapper {
  overflow: hidden;
  pointer-events: none;
  position: fixed;
  width: 100vw;
  height: 100vh;
}
.blob {
  position: absolute;
  top: 0;
  left: 0;
  fill: var(--color-blob);
  width: 90vw;
  z-index: -1;
  animation: move 60s ease-in-out infinite;
  transform-origin: 50% 50%;
  z-index: -1;
}

.blob svg {
  filter: drop-shadow(0 0 30px 30px var(--color-blob));
  -webkit-filter: drop-shadow(0 0 30px 30px var(--color-blob));
}

@keyframes move {
  0% {
    transform: scale(1) translate(10px, 0px);
  }
  38% {
    transform: scale(0.8, 1) translate(80vw, 30vh) rotate(160deg);
  }
  40% {
    transform: scale(0.8, 1) translate(80vw, 30vh) rotate(160deg);
  }
  78% {
    transform: scale(1.3) translate(0vw, 50vh) rotate(-20deg);
  }
  80% {
    transform: scale(1.3) translate(0vw, 50vh) rotate(-20deg);
  }
  100% {
    transform: scale(1) translate(10px, 0px);
  }
}
</style>

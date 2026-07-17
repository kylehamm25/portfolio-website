<script setup>
import interact from 'interactjs';
const props = defineProps({
    width: {
        type: String,
        default: '100%'
    },
    height: {
        type: String,
        default: 'auto'
    },
    href: {
        type: String,
        default: '#'
    }
});
const position = { x: 0, y: 0 }

interact('.card').draggable({
    listeners: {
        move(event) {
            position.x += event.dx;
            position.y += event.dy;
            event.target.style.transform = 
                `translate(${position.x}px, ${position.y}px)`
        },
    }
})
</script>

<template>
    <a class="card" :href="props.href" :style="{ width: props.width, height: props.height }">
        <slot></slot>
    </a>

    <svg style="display:none;">
        <filter id="displacementFilter">
            <feTurbulence type="turbulence" 
                baseFrequency="0.01" 
                numOctaves="2" 
                result="turbulence" />
    
            <feDisplacementMap in="SourceGraphic"
                in2="turbulence"    
                            scale="200" xChannelSelector="R" yChannelSelector="G" />
        </filter>
    </svg>
</template>

<style scoped>
.card {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    overflow: hidden;
    border-radius: 28px;
    filter: var(--card-filter);
    backdrop-filter: var(--card-backdrop-filter);
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    background: var(--card-bg-move);
    transition: opacity 0.26s ease-out, background 0.4s ease;
}

.card:hover {
    background: var(--card-bg-move-hover);
}

.card::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    border-radius: 28px;
    -webkit-box-shadow: var(--card-before-shadow-webkit);
    box-shadow: var(--card-before-shadow);
}
</style>
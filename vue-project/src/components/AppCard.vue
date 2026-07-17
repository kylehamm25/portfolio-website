<script setup lang="ts">
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
    },
    padding: {
        type: String,
        default: '2rem'
    },

    borderRadius: {
        type: String,
        default: '28px'
    }
});
</script>

<template>
    <a class="glass-card" :href="props.href" :style="{ width: props.width, height: props.height, padding: props.padding, borderRadius: props.borderRadius }">
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
.glass-card {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: v-bind('props.borderRadius');
    filter: var(--card-filter);
    backdrop-filter: var(--card-backdrop-filter);
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    background: var(--card-bg);
    transition: opacity 0.26s ease-out, background 0.4s ease;
}

.glass-card:hover {
    background: var(--card-bg-hover);
}

.glass-card::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    border-radius: v-bind('props.borderRadius');
    -webkit-box-shadow: var(--card-before-shadow-webkit);
    box-shadow: var(--card-before-shadow);
}
</style>
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
    padding: {
        type: String,
        default: '2rem'
    },
    borderRadius: {
        type: String,
        default: '28px'
    },
    marginBottom: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <div class="glass-card" :style="{ width: props.width, height: props.height, padding: props.padding, borderRadius: props.borderRadius, marginBottom: props.marginBottom ? '24px' : '0' }">
        <slot></slot>
    </div>

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
    display: flex;
    flex-direction: column;
    align-items: left;
    overflow: hidden;
    border-radius: v-bind('props.borderRadius');
    filter: var(--card-filter);
    backdrop-filter: var(--card-backdrop-filter);
    color: inherit;
    background: var(--card-bg);
    transition: opacity 0.26s ease-out, background 0.4s ease;
    box-shadow: var(--card-box-shadow);
}
</style>
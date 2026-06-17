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
    }
});
</script>

<template>
    <div class="glass-card" :style="{ width: props.width, height: props.height, padding: props.padding, borderRadius: props.borderRadius }">
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
    filter: drop-shadow(-8px -10px 46px #0000005f);
    backdrop-filter: brightness(1.1) 
        blur(2px)
        url(#displacementFilter);
    color: inherit;
    background: rgba(255, 255, 255, 0.01);
    transition: opacity 0.26s ease-out, background 0.s ease;

    box-shadow: inset 0 0 8px 1px rgba(90, 90, 90, 0.1);
}


</style>
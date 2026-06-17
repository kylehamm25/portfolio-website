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
    filter: drop-shadow(-8px -10px 46px #0000005f);
    backdrop-filter: brightness(1.1) 
        blur(2px)
        url(#displacementFilter);
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.01);
    transition: opacity 0.26s ease-out, background 0.4s ease;
}

.glass-card:hover {
    background: rgba(108, 99, 255, 0.1);
}

.glass-card::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    border-radius: v-bind('props.borderRadius');
    -webkit-box-shadow: inset 2px 2px 0px -2px rgba(255, 255, 255, 0.7), 
                        inset 0 0 3px 1px rgba(255, 255, 255, 0.7);
    box-shadow: inset 6px 6px 0px -6px rgba(255, 255, 255, 0.2), 
                inset 0 0 8px 1px rgba(255, 255, 255, 0.4);
}
</style>
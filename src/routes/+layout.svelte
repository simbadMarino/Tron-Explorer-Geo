<script lang="ts">
  import '@skeletonlabs/skeleton/themes/theme-crimson.css';
  import '@skeletonlabs/skeleton/styles/skeleton.css';
  import '../app.postcss';
  import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<style>
  .glowing-edges::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: -1;
    background-image: radial-gradient(circle, rgba(255, 0, 0, 0.7) 10%, transparent 80%);
    animation: glowing 5s ease-in-out infinite;
  }

  @keyframes glowing {
    0% {
      transform: scale(1);
      opacity: 0.7;
    }
    50% {
      transform: scale(1.3);
      opacity: 0.3;
    }
    100% {
      transform: scale(1);
      opacity: 0.7;
    }
  }
</style>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar>
      <svelte:fragment slot="lead">
        <strong class="text-xl uppercase text-red-600">Tron-Blockchain-Explorer Lite 2.2</strong>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        <!-- Your existing code for Discord, Twitter, and GitHub buttons -->
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <div class="glowing-edges"></div>
  <slot />
</AppShell>

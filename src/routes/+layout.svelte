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
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    pointer-events: none;
    z-index: -1;
    background-image: radial-gradient(circle, #0ff 10%, transparent 80%);
    animation: glowing 24s ease-in-out infinite;
  }

  @keyframes glowing {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    12.5% {
      transform: scale(1.05);
      opacity: 0.2;
    }
    25% {
      transform: scale(1.1);
      opacity: 0.5;
    }
    37.5% {
      transform: scale(1.05);
      opacity: 0.2;
    }
    50% {
      transform: scale(1);
      opacity: 0.5;
    }
    62.5% {
      transform: scale(1.05);
      opacity: 0.2;
    }
    75% {
      transform: scale(1.1);
      opacity: 0.5;
    }
    87.5% {
      transform: scale(1.05);
      opacity: 0.2;
    }
    100% {
      transform: scale(1);
      opacity: 0.5;
    }
  }
</style>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar>
      <svelte:fragment slot="lead">
        <strong class="text-xl uppercase text-pink-600">Tron-Block-Explorer 2.0</strong>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        <!-- Your existing code for Discord, Twitter, and GitHub buttons -->
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <div class="glowing-edges"></div>
  <slot />
</AppShell>

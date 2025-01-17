<script setup lang="ts">
interface MenuLink {
  title: string;
  url: string;
  icon?: any;
}

const props = withDefaults(
  defineProps<{
    links: MenuLink[];
  }>(),
  {
    links: () => [],
  },
);

const route = useRoute();
</script>

<template>
  <div
    class="grid min-h-screen max-w-7xl mx-auto w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
  >
    <aside class="hidden border-r md:block">
      <div class="flex h-full max-h-screen flex-col gap-2">
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <slot name="aside-header" />
        </div>
        <div class="flex-1">
          <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
            <template v-for="item in links" :key="item.title">
              <MenuLinkItem
                :to="item.url"
                :icon="item.icon"
                :active="route.path === item.url"
              >
                {{ item.title }}
              </MenuLinkItem>
            </template>
          </nav>
        </div>
        <div class="mt-auto p-4">
          <div class="flex justify-end gap-2">
            <ClientOnly>
              <ThemeSwitcher />
              <LanguageSwitcher />
            </ClientOnly>
          </div>
        </div>
      </div>
    </aside>
    <div class="flex flex-col h-svh overflow-hidden">
      <header
        class="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6 backdrop-blur-md"
      >
        <ClientOnly>
          <Sheet>
            <SheetTrigger as-child>
              <Button variant="outline" size="icon" class="shrink-0 md:hidden">
                <Icon
                  name="i-solar-hamburger-menu-line-duotone"
                  class="size-5"
                />
                <span class="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" class="flex flex-col p-4">
              <div class="flex items-center border-b pb-4 pt-6">
                <slot name="aside-header" />
              </div>
              <nav class="grid gap-2 text-lg font-medium">
                <template v-for="item in links" :key="item.title">
                  <MenuLinkItem
                    :to="item.url"
                    :icon="item.icon"
                    :active="route.path === item.url"
                  >
                    {{ item.title }}
                  </MenuLinkItem>
                </template>
              </nav>
              <div class="mt-auto">
                <div class="flex justify-end gap-2">
                  <ThemeSwitcher />
                  <LanguageSwitcher />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </ClientOnly>
        <div class="flex-1">
          <slot name="header" />
        </div>
      </header>
      <main class="flex flex-1 overflow-hidden">
        <UiScrollArea>
          <slot />
        </UiScrollArea>
      </main>
    </div>
  </div>
</template>

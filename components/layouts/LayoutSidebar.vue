<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '~layer/components/ui/sidebar';
import ThemeSwitcher from '../common/ThemeSwitcher.vue';

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
  <SidebarProvider class="max-w-6xl mx-auto">
    <Sidebar>
      <SidebarHeader>
        <slot name="sidebar-header" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem :key="item.title" v-for="item in links">
                <SidebarMenuButton
                 size="lg"
                  :class="{
                    'bg-sidebar-accent text-sidebar-accent-foreground':
                      route.path === item.url,
                  }"
                  class="font-bold text-base"
                  as-child
                >
                  <div class="">
                    <Icon :name="item.icon" class="" v-if="item.icon" />
                    <NuxtLink :to="item.url">{{ item.title }}</NuxtLink>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div class="flex justify-end gap-2">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>

    <SidebarInset class="max-h-svh">
      <ScrollArea>
        <header
          class="flex justify-between h-12 sm:h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10"
        >
          <SidebarTrigger class="-ml-1 sm:hidden" />
          <div class="flex items-center gap-2 justify-end flex-1">
            <slot name="header" />
          </div>
        </header>
        <div class="p-4 sm:p-6">
          <slot />
        </div>

      </ScrollArea>
    </SidebarInset>
  </SidebarProvider>
</template>

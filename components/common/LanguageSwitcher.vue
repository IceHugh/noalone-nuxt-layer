<template>
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        size="icon"
        class="w-10 h-10"
      >
        <Icon name="i-prime-language" class="h-4 w-4" />
        <span class="sr-only">Change language</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-28 p-0">
      <Command>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="lang in locales"
              :key="lang.code"
              :value="lang.code"
              @select="onChange(lang.code)"
            >
              <Icon
              name="i-prime-check"
                v-if="locale === lang.code"
                class="mr-2 h-4 w-4"
              />
              <span>{{ lang.name }}</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale, locales, setLocale } = useI18n()

const toggleLocale = (v: 'en' | 'zh') => {
  setLocale(v)
  document.body.classList.toggle('locale-en', v === 'en')
  document.body.classList.toggle('locale-zh', v === 'zh')
}

const onChange = (value: 'en' | 'zh') => {
  toggleLocale(value)
}
</script>


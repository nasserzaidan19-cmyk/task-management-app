<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User, Settings, LifeBuoy, LogOut } from 'lucide-vue-next'

withDefaults(
  defineProps<{
    name?: string
    email?: string
    avatarUrl?: string
  }>(),
  {
    name: 'User',
    email: '',
    avatarUrl: '',
  }
)

const emit = defineEmits<{
  profile: []
  settings: []
  support: []
  logout: []
}>()

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <button
        class="rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label="Open user menu"
      >
        <Avatar class="h-8 w-8">
          <AvatarImage v-if="avatarUrl" :src="avatarUrl" :alt="name" />
          <AvatarFallback class="text-xs">{{ initials(name) }}</AvatarFallback>
        </Avatar>
      </button>
    </DropdownMenuTrigger>

    <DropdownMenuContent class="w-56" align="end">
      <!-- Identity -->
      <DropdownMenuLabel class="font-normal">
        <div class="flex flex-col gap-0.5">
          <span class="text-sm font-medium leading-none">{{ name }}</span>
          <span v-if="email" class="text-xs text-muted-foreground truncate">{{ email }}</span>
        </div>
      </DropdownMenuLabel>

      <DropdownMenuSeparator />

      <DropdownMenuGroup>
        <DropdownMenuItem @click="emit('profile')">
          <User class="mr-2 h-4 w-4" />
          Profile
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem @click="emit('settings')">
          <Settings class="mr-2 h-4 w-4" />
          Settings
          <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <DropdownMenuItem @click="emit('support')">
        <LifeBuoy class="mr-2 h-4 w-4" />
        Support
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem class="text-destructive focus:text-destructive" @click="emit('logout')">
        <LogOut class="mr-2 h-4 w-4" />
        Log out
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

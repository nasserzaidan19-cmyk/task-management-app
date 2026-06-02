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
import { User, Settings, LogOut } from 'lucide-vue-next'
import { useAuth } from '@/composables/useAuth.ts'
import { queryClient } from '@/lib/queryClient'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const { signOut, user } = useAuth()
const router = useRouter()

const userProfile = computed(() => {
  return {
    userName: user.value?.name || 'User',
    email: user.value?.email || 'user@example.com',
    avatarUrl: user.value?.image || '',
  }
})

async function handleSignOut() {
  try {
    await signOut()
    queryClient.clear()
    router.push('/auth/login')
  } catch (error) {
    // need to tell the user about this error in the future
    console.error('Error signing out:', error)
  }
}

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
          <AvatarImage
            v-if="userProfile.avatarUrl"
            :src="userProfile.avatarUrl"
            :alt="userProfile.userName"
          />
          <AvatarFallback class="text-xs">{{ initials(userProfile.userName) }}</AvatarFallback>
        </Avatar>
      </button>
    </DropdownMenuTrigger>

    <DropdownMenuContent class="w-56" align="end">
      <!-- Identity -->
      <DropdownMenuLabel class="font-normal">
        <div class="flex flex-col gap-0.5">
          <span class="text-sm font-medium leading-none">{{ userProfile.userName }}</span>
          <span v-if="userProfile.email" class="text-xs text-muted-foreground truncate">{{
            userProfile.email
          }}</span>
        </div>
      </DropdownMenuLabel>

      <DropdownMenuSeparator />

      <DropdownMenuGroup>
        <DropdownMenuItem>
          <RouterLink to="/profile" class="w-full flex items-center cursor-pointer">
            <User class="mr-4 h-4 w-4" />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </RouterLink>
        </DropdownMenuItem>
        <DropdownMenuItem @click="console.log('settings')">
          <Settings class="mr-2 h-4 w-4" />
          Settings
          <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <DropdownMenuItem class="text-destructive focus:text-destructive" @click="handleSignOut">
        <LogOut class="mr-2 h-4 w-4" />
        Log out
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

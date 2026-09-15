<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/axios'

const router = useRouter()
const activeTab = ref('inicio')
const usuario = ref({ nombre: 'Administrador', email: '', rol: 'Administrador' })

onMounted(async () => {
  try {
    const response = await api.get('/auth/me')
    usuario.value = response.data
  } catch (e) {
    console.warn('No se pudo cargar la información del usuario:', e)
  }
})

const irA = (ruta) => {
  router.push(ruta)
}

const cerrarSesion = async () => {
  try {
    await api.post('/auth/logout')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  } finally {
    localStorage.removeItem('pegasus_user')
    router.push('/')
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-white flex flex-col justify-between max-w-md mx-auto relative pb-24">
    
    <header class="p-6 pt-8 pb-3">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center font-bold text-slate-950">
            A
          </div>
          <span class="font-bold tracking-wider text-xs text-cyan-400 uppercase">Concesionario Móvil</span>
        </div>
        <span class="text-[10px] px-2.5 py-1 bg-cyan-950/80 border border-cyan-700/50 rounded-full text-cyan-300 font-semibold uppercase">
          {{ usuario.rol }}
        </span>
      </div>

      <h1 class="text-2xl font-black tracking-tight">¡Hola, {{ usuario.nombre }}!</h1>
      <p class="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">
        Panel de Administrador: GESTIÓN GENERAL.
      </p>
    </header>

    <main class="px-6 flex-1 flex flex-col justify-center gap-3">
      
      <template v-if="activeTab === 'inicio'">
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
          <p class="text-slate-400 text-xs">
            Bienvenido al panel de administración. Selecciona una opción en la barra inferior para continuar.
          </p>
        </div>
      </template>

      <template v-else-if="activeTab === 'consulta'">
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center flex flex-col gap-4">
          <div class="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-full flex items-center justify-center mx-auto">
            <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-sm text-white mb-1">Módulo de Consultas</h3>
            <p class="text-slate-400 text-xs mb-4">Accede a las consultas generales y gestión de usuarios del sistema.</p>
          </div>
          <button 
            @click="irA('/usuarios')"
            class="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold uppercase transition"
          >
            Consultar Usuarios
          </button>
        </div>
      </template>

      <template v-else-if="activeTab === 'notificaciones'">
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
          <div class="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
          </div>
          <h3 class="font-bold text-sm text-white mb-1">Notificaciones</h3>
          <p class="text-slate-400 text-xs">No tienes notificaciones</p>
        </div>
      </template>

      <template v-else-if="activeTab === 'perfil'">
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
          <div class="w-16 h-16 bg-cyan-600 rounded-full mx-auto flex items-center justify-center font-bold text-2xl text-white mb-3 shadow-lg">
            {{ usuario.nombre?.charAt(0)?.toUpperCase() || 'A' }}
          </div>
          <h2 class="font-bold text-lg text-white">{{ usuario.nombre }}</h2>
          <p class="text-xs text-cyan-400 mb-6">{{ usuario.email || 'admin@concesionario.com' }}</p>
          
          <button 
            @click="cerrarSesion" 
            class="w-full py-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-xl text-sm font-semibold transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </template>

    </main>

    <nav class="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-900/95 backdrop-blur-md border-t border-slate-800 py-2.5 px-4 flex justify-around items-center z-50">
      
      <button 
        @click="activeTab = 'inicio'" 
        :class="[activeTab === 'inicio' ? 'text-cyan-400' : 'text-slate-500', 'flex flex-col items-center gap-1 text-xs font-semibold']"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
        <span>Inicio</span>
      </button>

      <button 
        @click="activeTab = 'consulta'" 
        :class="[activeTab === 'consulta' ? 'text-cyan-400' : 'text-slate-500', 'flex flex-col items-center gap-1 text-xs font-semibold']"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <span>Consulta</span>
      </button>

      <button 
        @click="activeTab = 'notificaciones'" 
        :class="[activeTab === 'notificaciones' ? 'text-cyan-400' : 'text-slate-500', 'flex flex-col items-center gap-1 text-xs font-semibold']"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
        </svg>
        <span>Notificaciones</span>
      </button>

      <button 
        @click="activeTab = 'perfil'" 
        :class="[activeTab === 'perfil' ? 'text-cyan-400' : 'text-slate-500', 'flex flex-col items-center gap-1 text-xs font-semibold']"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
        <span>Mi Perfil</span>
      </button>

    </nav>
  </div>
</template>
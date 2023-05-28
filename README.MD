
# RHINO

## Chat bot for twitch

### Deploy

```
npm install
npm run build
npm start
```

### Configuration

- [x] Configurar conexion con twitch API
  - [x] Crear funciones para enviar/recibir solicitudes
- [x] Configurar conexion con chat de twitch
- [x] Configurar conexion con horaro API
  - [x] Crear funciones para enviar/recibir solicitudes
  - [x] Format strings
  
<hr style="border:2px solid gray"> </hr>

### DB

- [x] Crear conexion con sqlite
- [x] Establecer tabla de comandos
- [x] Establecer tabla de timers
- [x] Realizar promesas de busqueda en DB

<hr style="border:2px solid gray"> </hr>

### Commands

- [x] Crear interface para comandos
- [x] Crear custom commands
- [x] Crear default commands
  - [ ] Implementar flags si son necesarios para los default
- [x] Obtener los comandos desde la DB
- [x] Crear command handler
  - [x] Obtener comando filtrado
  - [x] Obtener parametros
  - [x] Comparar permisos
  - [x] Comparar cooldown
  - [x] Si es un commando default realizar accion
  - [x] Enviar mensaje del comando por el chat

<hr style="border:2px solid gray"> </hr>

### Timers

- [x] Crear interface para timers
- [x] Obtener los timers desde la DB
- [x] Realizar timer handler
  - [x] Verificar si el timer llama un comando
  - [x] Verificar si comando es custom
  - [x] Crear el timeInterval para el comando
  - [x] Enviar mensaje por el chat
- [x] Testear varios timers al tiempo




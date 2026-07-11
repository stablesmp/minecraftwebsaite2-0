# AdvancedBan 2.3.0 — patchad för Minecraft 1.21.x (inkl. 1.21.11)

`AdvancedBanBundle-2.3.0-mc1.21.jar` är original-jaren (AdvancedBan 2.3.0 av Leoko)
med två fixar för att fungera felfritt på moderna servrar:

## Ändringar

1. **`UUIDManager.getNameFromUUID`** — pluginen anropade Mojangs namnhistorik-API
   (`https://api.mojang.com/user/profiles/<uuid>/names`) som Mojang stängde ner i
   september 2022. Utbytt mot session-servern:
   `https://sessionserver.mojang.com/session/minecraft/profile/<uuid>` (nyckel `name`).

2. **`config.yml` (standardkonfig)** — backup-UUID-API:t `https://us.mc-api.net/v3/uuid/%NAME%`
   är nedlagt. Utbytt mot `https://api.minetools.eu/uuid/%NAME%` (nyckel `id`).

   OBS: Om servern redan har en genererad `plugins/AdvancedBan/config.yml` uppdateras den
   inte automatiskt — ändra `BackUp-API` där manuellt till samma värden.

## Övrigt

- Resten av pluginen använder enbart stabilt Bukkit-API (ingen NMS/CraftBukkit-reflection),
  så den fungerar på Paper/Spigot 1.13–1.21.11 utan fler ändringar.
- Kompilerad mot Java 8-bytekod precis som originalet — kör på alla Java-versioner (8–21+).
- Installera genom att lägga jaren i serverns `plugins/`-mapp (ta bort den gamla jaren först).

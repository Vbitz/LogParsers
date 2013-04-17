var classSources = {
	"net.minecraft.server": "Minecraft Server",
	"net.minecraft.client": "Minecraft Client",
	"net.minecraft": "Minecraft",
	"java.lang.reflect": "Java Reflection",
	"sun.reflect": "Java Reflection",
	"java.util.concurrent": "Java Threads",
	"java.lang": "Java",
	"com.google": "Google (In Minecraft it's used by FML and Forge)",
	"org.bukkit": "Bukkit [http://bukkit.org/]",
	"forestry": "Forestry [http://forestry.sengir.net/wiki.new/doku.php]",
	"thaumicbees": "ThaumicBees [http://www.minecraftforum.net/topic/1627856-thaumic-bees-magic-themed-bees-for-forestry-equivalent-exchange-3-thaumcraft-3-compatible/]",
	"cpw.mods.fml": "Forge Mod Loader [https://github.com/MinecraftForge/FML]",
	"FMLRenderAccessLibrary": "Forge Mod Loader [https://github.com/MinecraftForge/FML]",
	"soaryn.xycraft": "Xycraft [http://xycraft.wikispaces.com/]",
	"thaumcraft": "Thaumcraft 3 [http://www.minecraftforum.net/topic/1585216-thaumcraft-303-updated-122013/]"
};

module.exports = function (classname) {
	for (var i in classSources) {
		if (classname.indexOf(i) === 0) {
			return classSources[i];
		}
	}
	console.log("Classname not found: " + classname);
	return "Unknown";
}
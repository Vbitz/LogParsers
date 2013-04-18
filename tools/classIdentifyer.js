var classSources = {
	"net.minecraft.server": "Minecraft Server",
	"net.minecraft.client": "Minecraft Client",
	"net.minecraft": "Minecraft",
	"java.lang.reflect": "Java Reflection",
	"sun.reflect": "Java Reflection",
	"java.util.concurrent": "Java Threads",
	"java.lang": "Java",
	"com.google": "Google (In Minecraft it's used by FML and Forge)",
	"org.bukkit": "<a href=\"http://bukkit.org/\">Bukkit</a>",
	"forestry": "<a href=\"http://forestry.sengir.net/wiki.new/doku.php\">Forestry</a>",
	"thaumicbees": "<a href=\"http://www.minecraftforum.net/topic/1627856-thaumic-bees-magic-themed-bees-for-forestry-equivalent-exchange-3-thaumcraft-3-compatible/\">ThaumicBees</a>",
	"cpw.mods.fml": "<a href=\"https://github.com/MinecraftForge/FML\">Forge Mod Loader</a>",
	"FMLRenderAccessLibrary": "<a href=\"https://github.com/MinecraftForge/FML\">Forge Mod Loader</a>",
	"soaryn.xycraft": "<a href=\"http://xycraft.wikispaces.com/\">Xycraft</a>",
	"thaumcraft": "<a href=\"http://www.minecraftforum.net/topic/1585216-thaumcraft-303-updated-122013/\">Thaumcraft 3</a>"
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
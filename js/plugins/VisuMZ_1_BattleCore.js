//=============================================================================
// VisuStella MZ - Battle Core
// VisuMZ_1_BattleCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_BattleCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleCore = VisuMZ.BattleCore || {};
VisuMZ.BattleCore.version = 1.33;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.33] [BattleCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Battle Core plugin revamps the battle engine provided by RPG Maker MZ to
 * become more flexible, streamlined, and support a variety of features. The
 * updated battle engine allows for custom Action Sequences, battle layout
 * styles, and a lot of control over the battle mechanics, too.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Action Sequence Plugin Commands to give you full control over what happens
 *   during the course of a skill or item.
 * * Animated Sideview Battler support for enemies!
 * * Auto Battle options for party-wide and actor-only instances.
 * * Base Troop Events to quickly streamline events for all Troop events.
 * * Battle Command control to let you change which commands appear for actors.
 * * Battle Layout styles to change the way the battle scene looks.
 * * Casting animation support for skills.
 * * Critical Hit control over the success rate formula and damage multipliers.
 * * Custom target scopes added for skills and items.
 * * Damage formula control, including Damage Styles.
 * * Damage caps, both hard caps and soft caps.
 * * Damage traits such Armor Penetration/Reduction to bypass defenses.
 * * Elements & Status Menu Core support for traits.
 * * Multitude of JavaScript notetags and global Plugin Parameters to let you
 *   make a variety of effects across various instances during battle.
 * * Party Command window can be skipped/disabled entirely.
 * * Weather effects now show in battle.
 * * Streamlined Battle Log to remove redundant information and improve the
 *   flow of battle.
 * * Visual HP Gauges can be displayed above the heads of actors and/or enemies
 *   with a possible requirement for enemies to be defeated at least once first
 *   in order for them to show.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin will overwrite some core parts of the RPG Maker MZ base code in
 * order to ensure the Battle Core plugin will work at full capacity. The
 * following are explanations of what has been changed.
 *
 * ---
 *
 * Action Sequences
 *
 * - Action sequences are now done either entirely by the Battle Log Window or
 * through common events if the <Custom Action Sequence> notetag is used.
 * In RPG Maker MZ by default, Action Sequences would be a mixture of using the
 * Battle Log Window, the Battle Manager, and the Battle Scene, making it hard
 * to fully grab control of the situation.
 *
 * ---
 *
 * Action Speed
 *
 * - Action speeds determine the turn order in the default battle system. The
 * AGI of a battle unit is also taken into consideration. However, the random
 * variance applied to the action speed system makes the turn order extremely
 * chaotic and hard for the player to determine. Thus, the random variance
 * aspect of it has been turned off. This can be reenabled by default through
 * Plugin Parameters => Mechanics Settings => Allow Random Speed?
 *
 * ---
 *
 * Animated Sideview Battler Support For Enemies
 *
 * - Enemies can now use Sideview Actor sprites for themselves! They will
 * behave like actors and can even carry their own set of weapons for physical
 * attacks. These must be set up using notetags. More information can be found
 * in the notetag section.
 *
 * - As the sprites are normally used for actors, some changes have been made
 * to Sprite_Actor to be able to support both actors and enemies. These changes
 * should have minimal impact on other plugins.
 *
 * ---
 *
 * Battle Sprite Updates
 *
 * - A lot of functions in Sprite_Battler, Sprite_Actor, and Sprite_Enemy have
 * been overwritten to make the new Action Sequence system added by this plugin
 * possible. These changes make it possible for the sprites to move anywhere on
 * the screen, jump, float, change visibility, and more.
 *
 * ---
 *
 * Change Battle Back in Battle
 * 
 * - By default, the Change Battle Back event command does not work in battle.
 * Any settings made to it will only reflect in the following battle. Now, if
 * the battle back event command is used during battle, it will reflect upon
 * any new changes immediately.
 *
 * ---
 *
 * Critical Hit - LUK Influence
 *
 * - The LUK Buffs now affect the critical hit rate based off how the formula
 * is now calculated. Each stack of a LUK Buff will double the critical hit
 * rate and compound upon that. That means a x1 LUK Buff stack will raise it by
 * x2, a x2 LUK Buff stack will raise the critical hit rate by x4, a x3 LUK
 * Buff Stack will raise the critical hit rate stack by x8, and so on.
 *
 * - LUK also plays a role in how much damage is dealt with critical hits. The
 * default critical hit multiplier has been reduced from x3 to x2. However, a
 * percentage of LUK will added on (based off the user's CRI rate) onto the
 * finalized critical damage. If the user's CRI rate is 4%, then 4% of the user
 * LUK value will also be added onto the damage.
 *
 * - This change can be altered through Plugin Parameters => Damage Settings =>
 * Critical Hits => JS: Rate Formula and JS: Damage Formula.
 *
 * ---
 * 
 * Damage Popups
 * 
 * - Damage popups are now formatted with + and - to determine healing and
 * damage. MP Damage will also include "MP" at the back. This is to make it
 * clearer what each colored variant of the damage popup means as well as help
 * color blind players read the on-screen data properly.
 * 
 * - Damage popups have also been rewritten to show all changed aspects instead
 * of just one. Previously with RPG Maker MZ, if an action would deal both HP
 * and MP damage, only one of them would show. Now, everything is separated and
 * both HP and MP changes will at a time.
 * 
 * ---
 * 
 * Dual Wielding
 * 
 * - Previously, RPG Maker MZ had "Dual Wielding" attack using both weapon
 * animations at once, with the combined ATK of each weapon. It's confusing to
 * look at and does not portray the nature of "Dual Wielding".
 * 
 * - Dual Wielding, or in the case of users adding in third and fourth weapons,
 * Multi Wielding is now changed. Each weapon is displayed individually, each
 * producing its own attack animation, showing each weapon type, and applying
 * only that weapon's ATK, Traits, and related effects. It is no longer a
 * combined effect to display everything at once like RPG Maker MZ default.
 * 
 * - If an actor has multiple weapon slots but some of them are unequipped,
 * then the action will treat the attack as a single attack. There will be no
 * barehanded attack to add on top of it. This is to match RPG Maker MZ's
 * decision to omit a second animation if the same scenario is applied.
 * 
 * ---
 *
 * Force Action
 *
 * - Previously, Forced Actions would interrupt the middle of an event to
 * perform an action. However, with the addition of more flexible Action
 * Sequences, the pre-existing Force Action system would not be able to exist
 * and would require being remade.
 *
 * - Forced Actions now are instead, added to a separate queue from the action
 * battler list. Whenever an action and/or common event is completed, then if
 * there's a Forced Action battler queued, then the Forced Action battler will
 * have its turn. This is the cleanest method available and avoids the most
 * conflicts possible.
 *
 * - This means if you planned to make cinematic sequences with Forced Actions,
 * you will need to account for the queued Force Actions. However, in the case
 * of battle cinematics, we would highly recommend that you use the newly added
 * Action Sequence Plugin Commands instead as those give you more control than
 * any Force Action ever could.
 *
 * ---
 *
 * Random Scope
 *
 * - The skill and item targeting scopes for Random Enemy, 2 Random Enemies,
 * 3 Random Enemies, 4 Random Enemies will now ignore TGR and utilize true
 * randomness.
 *
 * ---
 *
 * Spriteset_Battle Update
 *
 * - The spriteset now has extra containers to separate battlers (actors and
 * enemies), animations, and damage. This is to make actors and enemy battler
 * sprites more efficient to sort (if enabled), so that animations won't
 * interfere with and cover damage sprites, and to make sure damage sprites are
 * unaffected by screen tints in order to ensure the player will always have a
 * clear read on the information relaying sprites.
 *
 * ---
 *
 * Weather Displayed in Battle
 *
 * - Previously, weather has not been displayed in battle. This means that any
 * weather effects placed on the map do not transfer over to battle and causes
 * a huge disconnect for players. The Battle Core plugin will add weather
 * effects to match the map's weather conditions. Any changes made to weather
 * through event commands midway through battle will also be reflected.
 *
 * ---
 *
 * ============================================================================
 * Base Troops
 * ============================================================================
 *
 * Base Troops can be found, declared, and modified in the Plugin Parameters =>
 * Mechanics Settings => Base Troop ID's. All of the listed Troop ID's here
 * will have their page events replicated and placed under all other troops
 * found in the database.
 *
 * ---
 *
 * This means that if you have an event that runs on Turn 1 of a Base Troop,
 * then for every troop out there, that same event will also run on Turn 1,
 * as well. This is useful for those who wish to customize their battle system
 * further and to reduce the amount of work needed to copy/paste said event
 * pages into every database troop object manually.
 *
 * ---
 *
 * ============================================================================
 * Damage Styles
 * ============================================================================
 *
 * Damage Styles are a new feature added through the Battle Core plugin. When
 * using certain Battle Styles, you can completely ignore typing in the whole
 * damage formula inside the damage formula input box, and instead, insert
 * either a power amount or a multiplier depending on the Damage Style. The
 * plugin will then automatically calculate damage using that value factoring
 * in ATK, DEF, MAT, MDF values.
 *
 * ---
 *
 * Here is a list of the Damage Styles that come with this plugin by default.
 * You can add in your own and even edit them to your liking.
 * Or just remove them if you want.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Style          Use Formula As   PH/MA Disparity   Stat Scale   Damage Scale
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Standard       Formula          No                Varies       Varies
 * ArmorScaling   Formula          No                Varies       Varies
 * CT             Multiplier       Yes               Low          Normal
 * D4             Multiplier       No                High         Normal
 * DQ             Multiplier       No                Low          Low
 * FF7            Power            Yes               Low          High
 * FF8            Power            Yes               Medium       Normal
 * FF9            Power            Yes               Low          Normal
 * FF10           Power            Yes               Medium       High
 * MK             Multiplier       No                Medium       Low
 * MOBA           Multiplier       No                Medium       Normal
 * PKMN           Power            No                Low          Normal
 *
 * Use the above chart to figure out which Damage Style best fits your game,
 * if you plan on using them.
 *
 * The 'Standard' style is the same as the 'Manual' formula input, except that
 * it allows for the support of <Armor Penetration> and <Armor Reduction>
 * notetags.
 *
 * The 'Armor Scaling' style allows you to type in the base damage calculation
 * without the need to type in any defending modifiers.
 *
 * NOTE: While these are based off the damage formulas found in other games,
 * not all of them are exact replicas. Many of them are adapted for use in
 * RPG Maker MZ since not all RPG's use the same set of parameters and not all
 * external multipliers function the same way as RPG Maker MZ.
 * 
 * ---
 *
 * Style:
 * - This is what the Damage Style is.
 *
 * Use Formula As:
 * - This is what you insert into the formula box.
 * - Formula: Type in the formula for the action just as you would normally.
 * - Multiplier: Type in the multiplier for the action.
 *     Use float values. This means 250% is typed out as 2.50
 * - Power: Type in the power constant for the action.
 *     Use whole numbers. Type in something like 16 for a power constant.
 * 
 * PH/MA Disparity:
 * - Is there a disparity between how Physical Attacks and Magical Attacks
 *   are calculated?
 * - If yes, then physical attacks and magical attacks will have different
 *   formulas used.
 * - If no, then physical attacks and magical attacks will share similar
 *   formulas for how they're calculated.
 *
 * Stat Scale:
 * - How much should stats scale throughout the game?
 * - Low: Keep them under 100 for the best results.
 * - Medium: Numbers work from low to mid 400's for best results.
 * - High: The numbers really shine once they're higher.
 *
 * Damage Scale:
 * - How much does damage vary depending on small parameter changes?
 * - Low: Very little increase from parameter changes.
 * - Normal: Damage scales close to proportionally with parameter changes.
 * - High: Damage can boost itself drastically with parameter changes.
 *
 * ---
 *
 * To determine what kind of parameters are used for the Damage Styles, they
 * will depend on two things: the action's 'Hit Type' (ie Physical Attack,
 * Magical Attack, and Certain Hit) and the action's 'Damage Type' (ie. Damage,
 * Recovery, or Drain).
 *
 * Certain Hit tends to use whichever value is higher: ATK or MAT, and then
 * ignores the target's defense values. Use Certain Hits for 'True Damage'.
 *
 * Use the chart below to figure out everything else:
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Hit Type      Damage Type   Attacker Parameter   Defender Parameter
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Physical      Damage        ATK                  DEF
 * Magical       Damage        MAT                  MDF
 * Certain Hit   Damage        Larger (ATK, MAT)    -Ignores-
 * Physical      Recover       DEF                  -Ignores-
 * Magical       Recover       MDF                  -Ignores-
 * Certain Hit   Recover       Larger (ATK, MAT)    -Ignores-
 * Physical      Drain         ATK                  DEF
 * Magical       Drain         MAT                  MDF
 * Certain Hit   Drain         Larger (ATK, MAT)    -Ignores-
 *
 * These can be modified within the Plugin Parameters in the individual
 * Damage Styles themselves.
 *
 * ---
 *
 * Skills and Items can use different Damage Styles from the setting you've
 * selected in the Plugin Parameters. They can be altered to have different
 * Damage Styles through the usage of a notetag:
 *
 * <Damage Style: name>
 *
 * This will use whichever style is found in the Plugin Parameters.
 *
 * If "Manual" is used, then no style will be used and all calculations will be
 * made strictly based off the formula found inside the formula box.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * VisuMZ_1_BattleCore
 * 
 * When using Action Sequences, Boost effects for damage, turn extensions,
 * analyze, etc. will not occur for anything other than the Action Sequence:
 * "MECH: Action Effect" in order to maintain controlled effects. However, if
 * you do want to apply bonuses for Boosts, utilize "MECH: Boost Store Data" to
 * store inside a variable how many times Boosts were used. This can be used
 * however which way you want it to as long as it is manageable through events
 * and Common Events.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 * 
 * === HP Gauge-Related Notetags ===
 * 
 * The following notetags allow you to set whether or not HP Gauges can be
 * displayed by enemies regardless of Plugin Parameter settings.
 * 
 * ---
 *
 * <Show HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always show the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * - This does not bypass disabling enemy HP Gauges as a whole.
 * 
 * ---
 *
 * <Hide HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always hide the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * 
 * ---
 * 
 * <Battle UI Offset: +x, +y>
 * <Battle UI Offset: -x, -y>
 * 
 * <Battle UI Offset X: +x>
 * <Battle UI Offset X: -x>
 * 
 * <Battle UI Offset Y: +y>
 * <Battle UI Offset Y: -y>
 * 
 * - Used for: Actor and Enemy Notetags
 * - Adjusts the offset of HP Gauges and State Icons above the heads of actors
 *   and enemies.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * 
 * ---
 *
 * === Animation-Related Notetags ===
 *
 * The following notetags allow you to set animations to play at certain
 * instances and/or conditions.
 *
 * ---
 *
 * <Slip Animation: x>
 *
 * - Requires VisuMZ_0_CoreEngine!
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - During the phase at which the user regenerates HP, MP, or TP, this
 *   animation will play as long as the user is alive and visible.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Cast Animation: x>
 *
 * - Used for: Skill Notetags
 * - Plays a battle animation at the start of the skill.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Attack Animation: x>
 *
 * - Used for: Enemy Notetags
 * - Gives an enemy an attack animation to play for its basic attack.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * === Battleback-Related Notetags ===
 *
 * You can apply these notetags to have some control over the battlebacks that
 * appear in different regions of the map for random or touch encounters.
 *
 * ---
 *
 * <Region x Battleback1: filename>
 * <Region x Battleback2: filename>
 * 
 * - Used for: Map Notetags
 * - If the player starts a battle while standing on 'x' region, then the
 *   'filename' battleback will be used.
 * - Replace 'x' with a number representing the region ID you wish to use.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Castle1.png' will be only inserted
 *   as 'Castle1' without the '.png' at the end.
 * - *NOTE: This will override any specified battleback settings.
 *
 * ---
 *
 * === Battle Command-Related Notetags ===
 *
 * You can use notetags to change how the battle commands of playable
 * characters appear in battle as well as whether or not they can be used.
 *
 * ---
 *
 * <Seal Attack>
 * <Seal Guard>
 * <Seal Item>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Prevents specific battle commands from being able to be used.
 *
 * ---
 *
 * <Battle Commands>
 *  Attack
 *  Skills
 *  SType: x
 *  SType: name
 *  All Skills
 *  Skill: x
 *  Skill: name
 *  Guard
 *  Item
 *  Party
 *  Escape
 *  Auto Battle
 *  Combat Log
 *  Weapon Swap
 * </Battle Commands>
 *
 * - Used for: Class Notetags
 * - Changes which commands appear in the Actor Command Window in battle.
 *   If this notetag is not used, then the default commands determined in
 *   Plugin Parameters => Actor Command Window => Command List will be used.
 * - Add/remove/modify entries as needed.
 *
 * - Attack 
 *   - Adds the basic attack command.
 * 
 * - Skills
 *   - Displays all the skill types available to the actor.
 * 
 * - SType: x
 * - Stype: name
 *   - Adds in a specific skill type.
 *   - Replace 'x' with the ID of the skill type.
 *   - Replace 'name' with the name of the skill type (without text codes).
 *
 * - All Skills
 *   - Adds all usable battle skills as individual actions.
 * 
 * - Skill: x
 * - Skill: name
 *   - Adds in a specific skill as a usable action.
 *   - Replace 'x' with the ID of the skill.
 *   - Replace 'name' with the name of the skill.
 * 
 * - Guard
 *   - Adds the basic guard command.
 * 
 * - Item
 *   - Adds the basic item command.
 *
 * - Party
 *   - Requires VisuMZ_2_PartySystem.
 *   - Allows this actor to switch out with a different party member.
 * 
 * - Escape
 *   - Adds the escape command.
 * 
 * - Auto Battle
 *   - Adds the auto battle command.
 * 
 * - Combat Log
 *   - Requires VisuMZ_4_CombatLog.
 *   - Opens up the combat log.
 * 
 * - Weapon Swap
 *   - Requires VisuMZ_2_WeaponSwapSystem.
 *   - Swaps the current weapon.
 *
 * Example:
 *
 * <Battle Commands>
 *  Attack
 *  Skill: Heal
 *  Skills
 *  Guard
 *  Item
 *  Escape
 * </Battle Commands>
 *
 * ---
 *
 * <Command Text: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill name text that appears to something else.
 * - Replace 'x' with the skill's name you want to shown in the Actor Battle
 *   Command window.
 * - Recommended Usage: Shorten skill names that are otherwise too big to fit
 *   inside of the Actor Battle Command window.
 *
 * ---
 *
 * <Command Icon: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill icon that appears to something else.
 * - Replace 'x' with the ID of icon you want shown in the Actor Battle Command
 *   window to represent the skill.
 *
 * ---
 * 
 * <Command Show Switch: x>
 * 
 * <Command Show All Switches: x,x,x>
 * <Command Show Any Switches: x,x,x>
 * 
 * - Used for: Skill Notetags
 * - Determines if a battle command is visible or not through switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all
 *   switches are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 * - This can be applied to Attack and Guard commands, too.
 * 
 * ---
 * 
 * <Command Hide Switch: x>
 * 
 * <Command Hide All Switches: x,x,x>
 * <Command Hide Any Switches: x,x,x>
 * 
 * - Used for: Skill Notetags
 * - Determines if a battle command is visible or not through switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, item will be shown until all
 *   switches are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 * - This can be applied to Attack and Guard commands, too.
 * 
 * ---
 * 
 * <Battle Portrait: filename>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" Battle Layout.
 * - Sets the battle portrait image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 * - This will override any menu images used for battle only.
 * 
 * ---
 * 
 * <Battle Portrait Offset: +x, +y>
 * <Battle Portrait Offset: -x, -y>
 * 
 * <Battle Portrait Offset X: +x>
 * <Battle Portrait Offset X: -x>
 * 
 * <Battle Portrait Offset Y: +y>
 * <Battle Portrait Offset Y: -y>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" and "Border" Battle Layouts.
 * - Offsets the X and Y coordinates for the battle portrait.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * 
 * ---
 * 
 * === JavaScript Notetag: Battle Command-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if skill-based battle commands are visible or hidden.
 * 
 * ---
 * 
 * <JS Command Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Command Visible>
 * 
 * - Used for: Skill Notetags
 * - The 'visible' variable is the final returned variable to determine the
 *   skill's visibility in the Battle Command Window.
 * - Replace 'code' with JavaScript code to determine the skill's visibility in
 *   the Battle Command Window.
 * - The 'user' variable represents the user who will perform the skill.
 * - The 'skill' variable represents the skill to be used.
 * 
 * ---
 *
 * === Targeting-Related Notetags ===
 *
 * The following notetags are related to the targeting aspect of skills and
 * items and may adjust the scope of how certain skills/items work.
 *
 * ---
 *
 * <Always Hit>
 *
 * <Always Hit Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the action to always hit or to always have a hit rate of exactly
 *   the marked x%.
 * - Replace 'x' with a number value representing the hit success percentage.
 *
 * ---
 *
 * <Repeat Hits: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the number of hits the action will produce.
 * - Replace 'x' with a number value representing the number of hits to incur.
 *
 * ---
 *
 * <Target: x Random Any>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets can be both actors and enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Enemies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Allies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only actors.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: All Allies But User>
 *
 * - Used for: Skill, Item Notetags
 * - Targets all allies with the exception of the user.
 *
 * ---
 *
 * === JavaScript Notetag: Targeting-Related ===
 *
 * ---
 * 
 * <JS Targets>
 *  code
 *  code
 *  targets = [code];
 * </JS Targets>
 *
 * - Used for: Skill, Item Notetags
 * - The 'targets' variable is an array that is returned to be used as a
 *   container for all the valid action targets.
 * - The 'targets' variable will include the original set of targets determined
 *   by the skill/item's original scale.
 * - If you wish to clear it out, simply do 'targets = []' first.
 * - Replace 'code' with JavaScript code to determine valid targets.
 *
 * ---
 *
 * === Damage-Related Notetags ===
 *
 * ---
 *
 * <Damage Style: name>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'name' with a Damage Style name to change the way calculations are
 *   made using the damage formula input box.
 * - Names can be found in Plugin Parameters => Damage Settings => Style List
 *
 * ---
 *
 * <Armor Reduction: x>
 * <Armor Reduction: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   reduction properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
 *   when calculating one's own armor.
 * - This applies to physical attacks.
 * - Use the 'x' notetag variant to determine a flat reduction value.
 * - Use the 'x%' notetag variant to determine a percentile reduction value.
 *
 * ---
 *
 * <Armor Penetration: x>
 * <Armor Penetration: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   penetration properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor penetration
 *   properties when calculating a target's armor.
 * - This applies to physical attacks.
 * - Use the 'x' notetag variant to determine a flat penetration value.
 * - Use the 'x%' notetag variant to determine a percentile penetration value.
 *
 * ---
 *
 * <Magic Reduction: x>
 * <Magic Reduction: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   reduction properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
 *   when calculating one's own armor.
 * - This applies to magical attacks.
 * - Use the 'x' notetag variant to determine a flat reduction value.
 * - Use the 'x%' notetag variant to determine a percentile reduction value.
 *
 * ---
 *
 * <Magic Penetration: x>
 * <Magic Penetration: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   penetration properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor penetration
 *   properties when calculating a target's armor.
 * - This applies to magical attacks.
 * - Use the 'x' notetag variant to determine a flat penetration value.
 * - Use the 'x%' notetag variant to determine a percentile penetration value.
 *
 * ---
 *
 * <Bypass Damage Cap>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage capped.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage capped.
 *
 * ---
 *
 * <Damage Cap: x>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will declare the hard damage cap to
 *   be the 'x' value.
 * - If used on trait objects, this will raise the affect unit's hard damage
 *   cap to 'x' value. If another trait object has a higher value, use that
 *   value instead.
 *
 * ---
 *
 * <Bypass Soft Damage Cap>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage scaled downward to the soft cap.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage scaled downward to the soft cap.
 *
 * ---
 *
 * <Soft Damage Cap: +x%>
 * <Soft Damage Cap: -x%>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will increase/decrease the action's
 *   soft cap by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 * - If used on trait objects, this will raise the affect unit's soft damage
 *   limit by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 *
 * ---
 *
 * <Unblockable>
 *
 * - Used for: Skill, Item Notetags
 * - Using "Guard" against this skill will not reduce any damage.
 *
 * ---
 *
 * === Critical-Related Notetags ===
 *
 * The following notetags affect skill and item critical hit rates and the
 * critical damage multiplier.
 *
 * ---
 *
 * <Always Critical>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always land a critical hit regardless of the
 *   user's CRI parameter value.
 *
 * ---
 *
 * <Set Critical Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always have a x% change to land a critical hit
 *   regardless of user's CRI parameter value.
 * - Replace 'x' with a percerntage value representing the success rate.
 *
 * ---
 *
 * <Modify Critical Rate: x%>
 * <Modify Critical Rate: +x%>
 * <Modify Critical Rate: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - Modifies the user's CRI parameter calculation for this skill/item.
 * - The 'x%' notetag variant will multiply the user's CRI parameter value
 *   for this skill/item.
 * - The '+x%' and '-x%' notetag variants will incremenetally increase/decrease
 *   the user's CRI parameter value for this skill/item.
 *
 * ---
 *
 * <Modify Critical Multiplier: x%>
 * <Modify Critical Multiplier: +x%>
 * <Modify Critical Multiplier: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the damage multiplier when a critical hit lands.
 * - The 'x%' notetag variant multiply the multiplier to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the multiplier with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * <Modify Critical Bonus Damage: x%>
 * <Modify Critical Bonus Damage: +x%>
 * <Modify Critical Bonus Damage: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the bonus damage added when a critical hit lands.
 * - The 'x%' notetag variant multiply the damage to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the bonus damage with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * === JavaScript Notetags: Critical-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine how critical hit-related aspects are calculated.
 *
 * ---
 *
 * <JS Critical Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Critical Rate>
 *
 * - Used for: Skill, Item Notetags
 * - The 'rate' variable is the final returned amount to determine the
 *   critical hit success rate.
 * - Replace 'code' with JavaScript code to determine the final 'rate' to be
 *   returned as the critical hit success rate.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Critical Damage>
 *  code
 *  code
 *  multiplier = code;
 *  bonusDamage = code;
 * </JS Critical Damage>
 *
 * - Used for: Skill, Item Notetags
 * - The 'multiplier' variable is returned later and used as the damage
 *   multiplier used to amplify the critical damage amount.
 * - The 'bonusDamage' variable is returned later and used as extra added
 *   damage for the critical damage amount.
 * - Replace 'code' with JavaScript code to determine how the 'multiplier' and
 *   'bonusDamage' variables are calculated.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * === Action Sequence-Related Notetags ===
 *
 * Action Sequences allow you full control over how a skill and/or item plays
 * through its course. These notetags give you control over various aspects of
 * those Action Sequences. More information is found in the Action Sequences
 * help section.
 *
 * ---
 *
 * <Custom Action Sequence>
 *
 * - Used for: Skill, Item Notetags
 * - Removes all automated Action Sequence parts from the skill.
 * - Everything Action Sequence-related will be done by Common Events.
 * - Insert Common Event(s) into the skill/item's effects list to make use of
 *   the Custom Action Sequences.
 * - This will prevent common events from loading in the Item Scene and Skill
 *   Scene when used outside of battle.
 *
 * ---
 * 
 * <Auto Action Sequence>
 * 
 * - Used for: Skill, Item Notetags
 * - If the Action Sequence Plugin Parameter "Auto Notetag" is enabled, this
 *   plugin will prevent custom action sequences from happening for the skill
 *   or item, and instead, use an Automatic Action Sequence instead.
 * - Ignore this if you have "Auto Notetag" disabled or set to false.
 * 
 * ---
 * 
 * <Common Event: name>
 *
 * - Used for: Skill, Item Notetags
 * - Battle only: calls forth a Common Event of a matching name.
 * - Replace 'name' with the name of a Common Event to call from when this
 *   skill/item is used in battle.
 *   - Remove any \I[x] in the name.
 * - Insert multiple notetags to call multiple Common Events in succession.
 * - This will occur after any Common Event Trait Effects for the skill/item's
 *   database entry.
 * - This is primarily used for users who are reorganizing around their Common
 *   Events and would still like to have their skills/items perform the correct
 *   Action Sequences in case the ID's are different.
 * 
 * ---
 *
 * <Display Icon: x>
 * <Display Text: string>
 *
 * - Used for: Skill, Item Notetags
 * - When displaying the skill/item name in the Action Sequence, determine the
 *   icon and/or text displayed.
 * - Replace 'x' with a number value representing the icon ID to be displayed.
 * - Replace 'string' with a text value representing the displayed name.
 *
 * ---
 *
 * === Animated Sideview Battler-Related Notetags ===
 *
 * Enemies can use Animated Sideview Actor graphics thanks to this plugin.
 * These notetags give you control over that aspect. Some of these also affect
 * actors in addition to enemies.
 *
 * ---
 *
 * <Sideview Battler: filename>
 *
 * <Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Replaces the enemy's battler graphic with an animated Sideview Actor
 *   graphic found in the img/sv_actors/ folder.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Sideview Battlers>
 *
 * ---
 *
 * <Sideview Anchor: x, y>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets the sprite anchor positions for the sideview sprite.
 * - Replace 'x' and 'y' with numbers depicting where the anchors should be for
 *   the sideview sprite.
 * - By default, the x and y anchors are 0.5 and 1.0.
 *
 * ---
 * 
 * <Sideview Home Offset: +x, +y>
 * <Sideview Home Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Offsets the sideview actor sprite's home position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * - This notetag will not work if you remove it from the JavaScript code in
 *   Plugin Parameters > Actor > JS:  Home Position
 * 
 * ---
 * 
 * <Sideview Weapon Offset: +x, +y>
 * <Sideview Weapon Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy State Notetags
 * - Offsets the sideview weapon sprite's position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * 
 * ---
 *
 * <Sideview Show Shadow>
 * <Sideview Hide Shadow>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets it so the sideview battler's shadow will be visible or hidden.
 *
 * ---
 * 
 * <Sideview Shadow Scale: x%>
 * <Sideview Shadow Scale: x.y>
 * 
 * - Used for: Actor, Enemy Notetags
 * - Adjusts the scaling size of the sideview battler's shadow.
 * 
 * ---
 *
 * <Sideview Collapse>
 * <Sideview No Collapse>
 *
 * - Used for: Enemy Notetags
 * - Either shows the collapse graphic or does not show the collapse graphic.
 * - Collapse graphic means the enemy will 'fade away' once it's defeated.
 * - No collapse graphic means the enemy's corpse will remain on the screen.
 *
 * ---
 *
 * <Sideview Idle Motion: name>
 *
 * <Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Changes the default idle motion for the enemy.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Idle Motions>
 *  walk: 25
 *  wait: 50
 *  guard
 *  victory
 *  abnormal
 * </Sideview Idle Motions>
 *
 * ---
 *
 * <Sideview Size: width, height>
 *
 * - Used for: Enemy Notetags
 * - When using a sideview battler, its width and height will default to the
 *   setting made in Plugin Parameters => Enemy Settings => Size: Width/Height.
 * - This notetag lets you change that value to something else.
 * - Replace 'width' and 'height' with numbers representing how many pixels
 *   wide/tall the sprite will be treated as.
 *
 * ---
 *
 * <Sideview Weapon: weapontype>
 *
 * <Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Give your sideview enemies weapons to use.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Sideview Weapons>
 *
 * ---
 *
 * <traitname Sideview Battler: filename>
 *
 * <traitname Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </traitname Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have a unique appearance.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Male Sideview Battlers>
 *
 * <Female Sideview Battlers>
 *  Actor1_2: 25
 *  Actor1_4: 10
 *  Actor1_6
 *  Actor1_8
 * </Female Sideview Battlers>
 *
 * ---
 *
 * <traitname Sideview Idle Motion: name>
 *
 * <traitname Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </traitname Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique idle motions.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Jolly Sideview Idle Motions>
 *  wait: 25
 *  victory: 10
 *  walk
 * </Jolly Sideview Idle Motions>
 *
 * <Serious Sideview Idle Motions>
 *  walk: 25
 *  guard: 10
 *  wait
 * </Jolly Sideview Idle Motions>
 *
 * ---
 *
 * <traitname Sideview Weapon: weapontype>
 *
 * <traitname Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </traitname Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique weapons.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Male Sideview Weapons>
 *
 * <Female Sideview Weapons>
 *  Dagger: 25
 *  Spear: 25
 *  Cane
 * </Female Sideview Weapons>
 *
 * ---
 *
 * === Enemy-Related Notetags ===
 *
 * ---
 *
 * <Battler Sprite Cannot Move>
 *
 * - Used for: Enemy Notetags
 * - Prevents the enemy from being able to move, jump, and/or float due to
 *   Action Sequences. Useful for rooted enemies.
 *
 * ---
 * 
 * <Battler Sprite Grounded>
 *
 * - Used for: Enemy Notetags
 * - Prevents the enemy from being able to jumping and/or floating due to
 *   Action Sequences but still able to move. Useful for rooted enemies.
 * 
 * ---
 *
 * <Swap Enemies>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Swap Enemies>
 *
 * - Used for: Enemy Notetags
 * - Causes this enemy database object to function as a randomizer for any of
 *   the listed enemies inside the notetag. When the enemy is loaded into the
 *   battle scene, the enemy is immediately replaced with one of the enemies
 *   listed. The randomization is based off the 'weight' given to each of the
 *   enemy 'names'.
 * - Replace 'name' with the database enemy of the enemy you wish to replace
 *   the enemy with.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Swap Enemies>
 *  Bat: 50
 *  Slime: 25
 *  Orc
 *  Minotaur
 * </Swap Enemies>
 *
 * ---
 *
 * === JavaScript Notetags: Mechanics-Related ===
 *
 * These JavaScript notetags allow you to run code at specific instances during
 * battle provided that the unit has that code associated with them in a trait
 * object (actor, class, weapon, armor, enemy, or state). How you use these is
 * entirely up to you and will depend on your ability to understand the code
 * used and driven for each case.
 *
 * ---
 *
 * <JS Pre-Start Battle>
 *  code
 *  code
 *  code
 * </JS Pre-Start Battle>
 *
 * <JS Post-Start Battle>
 *  code
 *  code
 *  code
 * </JS Post-Start Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of battle aimed at the function:
 *   BattleManager.startBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Turn>
 *  code
 *  code
 *  code
 * </JS Pre-Start Turn>
 *
 * <JS Post-Start Turn>
 *  code
 *  code
 *  code
 * </JS Post-Start Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of a turn aimed at the function:
 *   BattleManager.startTurn()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Action>
 *  code
 *  code
 *  code
 * </JS Pre-Start Action>
 *
 * <JS Post-Start Action>
 *  code
 *  code
 *  code
 * </JS Post-Start Action>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action aimed at the function:
 *   BattleManager.startAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Apply>
 *  code
 *  code
 *  code
 * </JS Pre-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Apply as User>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as User>
 *
 * <JS Pre-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage>
 *  code
 *  code
 *  code
 * </JS Pre-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage as User>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as User>
 *
 * <JS Pre-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage>
 *  code
 *  code
 *  code
 * </JS Post-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage as User>
 *  code
 *  code
 *  code
 * </JS Post-Damage as User>
 *
 * <JS Post-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Post-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply>
 *  code
 *  code
 *  code
 * </JS Post-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply as User>
 *  code
 *  code
 *  code
 * </JS Post-Apply as User>
 *
 * <JS Post-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Post-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 *
 * ---
 *
 * <JS Pre-End Action>
 *  code
 *  code
 *  code
 * </JS Pre-End Action>
 *
 * <JS Post-End Action>
 *  code
 *  code
 *  code
 * </JS Post-End Action>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action aimed at the function:
 *   BattleManager.endAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Turn>
 *  code
 *  code
 *  code
 * </JS Pre-End Turn>
 *
 * <JS Post-End Turn>
 *  code
 *  code
 *  code
 * </JS Post-End Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of a turn aimed at the function:
 *   Game_Battler.prototype.onTurnEnd()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Regenerate>
 *  code
 *  code
 *  code
 * </JS Pre-Regenerate>
 *
 * <JS Post-Regenerate>
 *  code
 *  code
 *  code
 * </JS Post-Regenerate>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a unit regenerates HP/MP aimed at the function:
 *   Game_Battler.prototype.regenerateAll()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Victory>
 *  code
 *  code
 *  code
 * </JS Battle Victory>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is won aimed at the function:
 *   BattleManager.processVictory()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Success>
 *  code
 *  code
 *  code
 * </JS Escape Success>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping succeeds aimed at the function:
 *   BattleManager.onEscapeSuccess()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Failure>
 *  code
 *  code
 *  code
 * </JS Escape Failure>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping fails aimed at the function:
 *   BattleManager.onEscapeFailure()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Defeat>
 *  code
 *  code
 *  code
 * </JS Battle Defeat>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is lost aimed at the function:
 *   BattleManager.processDefeat()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Battle>
 *  code
 *  code
 *  code
 * </JS Pre-End Battle>
 *
 * <JS Post-End Battle>
 *  code
 *  code
 *  code
 * </JS Post-End Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when the battle is over aimed at the function:
 *   BattleManager.endBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 * 
 * === Battle Layout-Related Notetags ===
 * 
 * These tags will change the battle layout for a troop regardless of how the
 * plugin parameters are set up normally. Insert these tags in either the
 * noteboxes of maps or the names of troops for them to take effect. If both
 * are present for a specific battle, then priority goes to the setting found
 * in the troop name.
 * 
 * ---
 * 
 * <Layout: type>
 * <Battle Layout: type>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle layout style used for this specific map or battle.
 * - Replace 'type' with 'default', 'list', 'xp', 'portrait', or 'border'.
 * 
 * ---
 *
 * ============================================================================
 * Action Sequence - Plugin Commands
 * ============================================================================
 *
 * Skills and items, when used in battle, have a pre-determined series of
 * actions to display to the player as a means of representing what's going on
 * with the action. For some game devs, this may not be enough and they would
 * like to get more involved with the actions themselves.
 *
 * Action Sequences, added through this plugin, enable this. To give a skill or
 * item a Custom Action Sequence, a couple of steps must be followed:
 *
 * ---
 *
 * 1. Insert the <Custom Action Sequence> notetag into the skill or item's
 *    notebox (or else this would not work as intended).
 * 2. Give that skill/item a Common Event through the Effects box. The selected
 *    Common Event will contain all the Action Sequence data.
 * 3. Create the Common Event with Action Sequence Plugin Commands and/or event
 *    commands to make the skill/item do what you want it to do.
 *
 * ---
 *
 * The Plugin Commands added through the Battle Core plugin focus entirely on
 * Action Sequences. However, despite the fact that they're made for skills and
 * items, some of these Action Sequence Plugin Commands can still be used for
 * regular Troop events and Common Events.
 *
 * ---
 *
 * === Action Sequence - Action Sets ===
 *
 * Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * ---
 *
 * ACSET: Setup Action Set
 * - The generic start to most actions.
 *
 *   Display Action:
 *   Immortal: On:
 *   Battle Step:
 *   Wait For Movement:
 *   Cast Animation:
 *   Wait For Animation:
 *   - Use this part of the action sequence?
 *
 * ---
 *
 * ACSET: All Targets Action Set
 * - Affects all targets simultaneously performing the following.
 *
 *   Dual/Multi Wield?
 *   - Add times struck based on weapon quantity equipped?
 * 
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait For Animation:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Each Target Action Set
 * - Goes through each target one by one to perform the following.
 *
 *   Dual/Multi Wield?
 *   - Add times struck based on weapon quantity equipped?
 *
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait Count:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Finish Action
 * - The generic ending to most actions.
 *
 *   Wait For New Line:
 *   Wait For Effects:
 *   Clear Battle Log:
 *   Home Reset:
 *   Wait For Movement:
 *   - Use this part of the action sequence?
 *
 * ---
 * 
 * === Action Sequences - Angle ===
 * 
 * These action sequences allow you to have control over the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * ---
 *
 * ANGLE: Change Angle
 * - Changes the camera angle.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Angle:
 *   - Change the camera angle to this many degrees.
 *
 *   Duration:
 *   - Duration in frames to change camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Reset Angle
 * - Reset any angle settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Wait For Angle
 * - Waits for angle changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Animations ===
 *
 * These Action Sequences are related to the 'Animations' that can be found in
 * the Animations tab of the Database.
 *
 * ---
 *
 * ANIM: Action Animation
 * - Plays the animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Attack Animation
 * - Plays the animation associated with the user's weapon.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Attack Animation 2+
 * - Plays the animation associated with the user's other weapons.
 * - Plays nothing if there is no other weapon equipped.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 * 
 *   Slot:
 *   - Which weapon slot to get this data from?
 *   - Main-hand weapon is weapon slot 1.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Cast Animation
 * - Plays the cast animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Change Battle Portrait
 * - Changes the battle portrait of the actor (if it's an actor).
 * - Can be used outside of battle/action sequences.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *   - Valid units can only be actors.
 *
 *   Filename:
 *   - Select the file to change the actor's portrait to.
 *
 * ---
 *
 * ANIM: Show Animation
 * - Plays the a specific animation on unit(s).
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Animation ID:
 *   - Select which animation to play on unit(s).
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Wait For Animation
 * - Causes the interpreter to wait for any animation(s) to finish.
 *
 * ---
 *
 * === Action Sequences - Battle Log ===
 *
 * These Action Sequences are related to the Battle Log Window, the window
 * found at the top of the battle screen.
 *
 * ---
 *
 * BTLOG: Add Text
 * - Adds a new line of text into the Battle Log.
 *
 *   Text:
 *   - Add this text into the Battle Log.
 *   - Text codes allowed.
 * 
 *   Copy to Combat Log?:
 *   - Copies text to the Combat Log.
 *   - Requires VisuMZ_4_CombatLog
 * 
 *     Combat Log Icon:
 *     - What icon would you like to bind to this entry?
 *     - Requires VisuMZ_4_CombatLog
 *
 * ---
 *
 * BTLOG: Clear Battle Log
 * - Clears all the text in the Battle Log.
 *
 * ---
 *
 * BTLOG: Display Action
 * - plays the current action in the Battle Log.
 *
 * ---
 *
 * BTLOG: Pop Base Line
 * - Removes the Battle Log's last added base line and  all text up to its
 *   former location.
 *
 * ---
 *
 * BTLOG: Push Base Line
 * - Adds a new base line to where the Battle Log currently is at.
 *
 * ---
 *
 * BTLOG: Refresh Battle Log
 * - Refreshes the Battle Log.
 *
 * ---
 *
 * BTLOG: UI Show/Hide
 * - Shows or hides the Battle UI (including the Battle Log).
 *
 *   Show/Hide?:
 *   - Shows/hides the Battle UI.
 *
 * ---
 *
 * BTLOG: Wait For Battle Log
 * - Causes the interpreter to wait for the Battle Log to finish.
 *
 * ---
 *
 * BTLOG: Wait For New Line
 * - Causes the interpreter to wait for a new line in the Battle Log.
 *
 * ---
 *
 * === Action Sequences - Camera ===
 *
 * These Action Sequences are battle camera-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * CAMERA: Clamp ON/OFF
 * - Turns battle camera clamping on/off.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Setting:
 *   - Turns camera clamping on/off.
 *
 * ---
 *
 * CAMERA: Focus Point
 * - Focus the battle camera on a certain point in the screen.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   X Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Focus Target(s)
 * - Focus the battle camera on certain battler target(s).
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Targets:
 *   - Select unit(s) to focus the battle camera on.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Offset
 * - Offset the battle camera from the focus target.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Offset X:
 *   - How much to offset the camera X by.
 *   - Negative: left. Positive: right.
 *
 *   Offset Y:
 *   - How much to offset the camera Y by.
 *   - Negative: up. Positive: down.
 *
 *   Duration:
 *   - Duration in frames for offset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Reset
 * - Reset the battle camera settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Reset Focus?:
 *   - Reset the focus point?
 *
 *   Reset Offset?:
 *   - Reset the camera offset?
 *
 *   Duration:
 *   - Duration in frames for reset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Wait For Camera
 * - Waits for camera changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Dragonbones ===
 *
 * These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * ---
 *
 * DB: Dragonbones Animation
 * - Causes the unit(s) to play a Dragonbones motion animation.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Motion Animation:
 *   - What is the name of the Dragonbones motion animation you wish to play?
 *
 * ---
 *
 * DB: Dragonbones Time Scale
 * - Causes the unit(s) to change their Dragonbones time scale.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Time Scale:
 *   - Change the value of the Dragonbones time scale to this.
 *
 * ---
 *
 * === Action Sequences - Elements ===
 *
 * These Action Sequences can change up the element(s) used for the action's
 * damage calculation midway through an action.
 *
 * They also require the VisuMZ_1_ElementStatusCore plugin to be present in
 * order for them to work.
 *
 * ---
 *
 * ELE: Add Elements
 * - Adds element(s) to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to add onto the action.
 *   - Insert multiple element ID's to add multiple at once.
 *
 * ---
 *
 * ELE: Clear Element Changes
 * - Clears all element changes made through Action Sequences.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 *
 * ELE: Force Elements
 * - Forces only specific element(s) when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to force in the action.
 *   - Insert multiple element ID's to force multiple at once.
 *
 * ---
 *
 * ELE: Null Element
 * - Forces no element to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 * 
 * === Action Sequences - Horror Effects ===
 * 
 * These Action Sequences are Horror Effects-related.
 * Requires VisuMZ_2_HorrorEffects!
 * 
 * ---
 *
 * HORROR: Clear All Filters
 * - Clear all Horror Effects filters on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove Horror Effects for.
 *
 * ---
 *
 * HORROR: Glitch Create
 * - Creates the glitch effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * HORROR: Glitch Remove
 * - Removes the glitch effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 *
 * HORROR: Noise Create
 * - Creates the noise effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * HORROR: Noise Remove
 * - Removes the noise effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 *
 * HORROR: TV Create
 * - Creates the TV effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * HORROR: TV Remove
 * - Removes the TV effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 * 
 * === Action Sequences - Impact ===
 * 
 * These Action Sequences are related to creating impact.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * ---
 *
 * IMPACT: Color Break
 * - Breaks the colors on the screen before reassembling.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Intensity:
 *   - What is the intensity of the color break effect?
 *
 *   Duration:
 *   - What is the duration of the color break effect?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Blur Screen
 * - Creates a motion blur on the whole screen.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Angle:
 *   - Determine what angle to make the motion blur at.
 *
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 *
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Blur Target(s)
 * - Creates a motion blur on selected target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to create motion blur effects for.
 *
 *   Angle:
 *   - Determine what angle to make the motion blur at.
 *
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 *
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Trail Create
 * - Creates a motion trail effect for the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to create motion trail effects for.
 *
 *   Delay:
 *   - How many frames to delay by when creating a motion trail?
 *   - The higher the delay, the less motion trails there are.
 *
 *   Duration:
 *   - How many frames should the motion trail last?
 *   - What do you want to be its duration?
 *
 *   Hue:
 *   - What do you want to be the hue for the motion trail?
 *
 *   Starting Opacity:
 *   - What starting opacity value do you want for the motion trail?
 *   - Opacity values decrease over time.
 *
 *   Tone:
 *   - What tone do you want for the motion trail?
 *   - Format: [Red, Green, Blue, Gray]
 *
 * ---
 *
 * IMPACT: Motion Trail Remove
 * - Removes the motion trail effect from the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to clear motion trail effects for.
 *
 * ---
 *
 * IMPACT: Shockwave at Point
 * - Creates a shockwave at the designated coordinates.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Point: X:
 *   Point: Y:
 *   - What x/y coordinate do you want to create a shockwave at?
 *   - You can use JavaScript code.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Shockwave from Each Target(s)
 * - Creates a shockwave at each of the target(s) location(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a shockwave from.
 *
 *   Target Location:
 *   - Select which part target group to start a shockwave from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the shockwave X/Y point by.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Shockwave from Target(s) Center
 * - Creates a shockwave from the center of the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a shockwave from.
 *
 *   Target Location:
 *   - Select which part target group to start a shockwave from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the shockwave X/Y point by.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Zoom Blur at Point
 * - Creates a zoom blur at the designated coordinates.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Point: X:
 *   Point: Y:
 *   - What x/y coordinate do you want to focus the zoom at?
 *   - You can use JavaScript code.
 *
 *   Zoom Strength:
 *   - What is the strength of the zoom effect?
 *   - Use a number between 0 and 1.
 *
 *   Visible Radius:
 *   - How much of a radius should be visible from the center?
 *
 *   Duration:
 *   - What is the duration of the zoom blur?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Zoom Blur at Target(s) Center
 * - Creates a zoom blur at the center of targets.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a zoom blur from.
 *
 *   Target Location:
 *   - Select which part target group to start a zoom blur from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the zoom blur X/Y point by.
 *
 *   Zoom Strength:
 *   - What is the strength of the zoom effect?
 *   - Use a number between 0 and 1.
 *
 *   Visible Radius:
 *   - How much of a radius should be visible from the center?
 *
 *   Duration:
 *   - What is the duration of the zoom blur?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * === Action Sequences - Mechanics ===
 *
 * These Action Sequences are related to various mechanics related to the
 * battle system.
 *
 * ---
 *
 * MECH: Action Effect
 * - Causes the unit(s) to take damage/healing from action and incurs any
 *   changes made such as buffs and states.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 * ---
 *
 * MECH: Add Buff/Debuff
 * - Adds buff(s)/debuff(s) to unit(s). 
 * - Determine which parameters are affected and their durations.
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s) and/or debuff(s).
 *
 *   Buff Parameters:
 *   - Select which parameter(s) to buff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Debuff Parameters:
 *   - Select which parameter(s) to debuff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Turns:
 *   - Number of turns to set the parameter(s) buffs to.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * MECH: Add State
 * - Adds state(s) to unit(s).
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s).
 *
 *   States:
 *   - Select which state ID(s) to add to unit(s).
 *   - Insert multiple state ID's to add multiple at once.
 *
 * ---
 * 
 * MECH: Analyze Weakness
 * - Reveal elemental weakness(es) from target(s).
 * - Requires VisuMZ_3_WeaknessDisplay!
 * 
 *   Targets:
 *   - Select unit(s) to reveal elemental weaknesses for.
 * 
 *   Reveal:
 *   - How many elemental weaknesses do you wish to reveal?
 *   - You may use JavaScript code.
 * 
 * ---
 *
 * MECH: Armor Penetration
 * - Adds an extra layer of defensive penetration/reduction.
 * - You may use JavaScript code for any of these.
 *
 *   Armor/Magic Penetration:
 *
 *     Rate:
 *     - Penetrates an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Penetrates a flat amount of armor by this value.
 *
 *   Armor/Magic Reduction:
 *
 *     Rate:
 *     - Reduces an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Reduces a flat amount of armor by this value.
 *
 * ---
 * 
 * MECH: ATB Gauge
 * - Alters the ATB/TPB Gauges.
 * - Requires VisuMZ_2_BattleSystemATB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the ATB/TPB Gauges for.
 * 
 *   Charging:
 *   
 *     Charge Rate:
 *     - Changes made to the ATB Gauge if it is currently charging.
 * 
 *   Casting:
 *   
 *     Cast Rate:
 *     - Changes made to the ATB Gauge if it is currently casting.
 *   
 *     Interrupt?:
 *     - Interrupt the ATB Gauge if it is currently casting?
 * 
 * ---
 * 
 * MECH: Boost Points Change
 * - Changes Boost Points for target(s).
 * - Requires VisuMZ_3_BoostAction!
 * 
 *   Targets:
 *   - Select unit(s) to alter the Boost Points for.
 * 
 *   Alter Boost Points By:
 *   - Alters the unit(s) Boost Points.
 *   - Positive for gaining points. Negative for losing points.
 * 
 * ---
 * 
 * MECH: Boost Store Data
 * - Stores the number of Boosts used this action inside a variable.
 * - Requires VisuMZ_3_BoostAction!
 * 
 *   Variable ID:
 *   - Which variable do you want to store the data inside?
 * 
 * ---
 * 
 * MECH: Break Shield Change
 * - Changes Break Shields for target(s) if not Break Stunned.
 * - Requires VisuMZ_4_BreakShields!
 * 
 *   Targets:
 *   - Select unit(s) to alter the Break Shields for.
 * 
 *   Alter Break Shields By:
 *   - Alters the unit(s) Break Shields.
 *   - Positive for gaining shields. Negative for losing shields.
 * 
 * ---
 * 
 * MECH: Break Shield Reset
 * - Resets Break Shields for target(s) if not Break Stunned.
 * - Requires VisuMZ_4_BreakShields!
 * 
 *   Targets:
 *   - Select unit(s) to reset the Break Shields for.
 * 
 * ---
 * 
 * MECH: BTB Brave Points
 * - Alters the target(s) Brave Points to an exact value.
 * - Requires VisuMZ_2_BattleSystemBTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the ATB/TPB Gauges for.
 * 
 *   Alter Brave Points By:
 *   - Alters the target(s) Brave Points.
 *   - Positive for gaining BP.
 *   - Negative for losing BP.
 * 
 * ---
 *
 * MECH: Collapse
 * - Causes the unit(s) to perform its collapse animation if the unit(s)
 *   has died.
 *
 *   Targets:
 *   - Select unit(s) to process a death collapse.
 *
 *   Force Death:
 *   - Force death even if the unit has not reached 0 HP?
 *   - This will remove immortality.
 *
 *   Wait For Effect?:
 *   - Wait for the collapse effect to complete before performing next command?
 *
 * ---
 * 
 * MECH: CTB Order
 * - Alters the CTB Turn Order.
 * - Requires VisuMZ_2_BattleSystemCTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the CTB Turn Order for.
 * 
 *   Change Order By:
 *   - Changes turn order for target(s) by this amount.
 *   - Positive increases wait. Negative decreases wait.
 * 
 * ---
 * 
 * MECH: CTB Speed
 * - Alters the CTB Speed.
 * - Requires VisuMZ_2_BattleSystemCTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the CTB Speed for.
 * 
 *   Charge Rate:
 *   - Changes made to the CTB Speed if it is currently charging.
 * 
 *   Cast Rate:
 *   - Changes made to the CTB Speed if it is currently casting.
 * 
 * ---
 * 
 * MECH: Custom Damage Formula
 * - Changes the current action's damage formula to custom.
 * - This will assume the MANUAL damage style.
 * 
 *   Formula:
 *   - Changes the current action's damage formula to custom.
 *   - Use 'default' to revert the damage formula.
 * 
 * ---
 *
 * MECH: Damage Popup
 * - Causes the unit(s) to display the current state of damage received
 *   or healed.
 *
 *   Targets:
 *   - Select unit(s) to prompt a damage popup.
 *
 * ---
 *
 * MECH: Dead Label Jump
 * - If the active battler is dead, jump to a specific label in the
 *   common event.
 *
 *   Jump To Label:
 *   - If the active battler is dead, jump to this specific label in the
 *     common event.
 *
 * ---
 *
 * MECH: HP, MP, TP
 * - Alters the HP, MP, and TP values for unit(s).
 * - Positive values for healing. Negative values for damage.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 *   HP, MP, TP:
 *
 *     Rate:
 *     - Changes made to the parameter based on rate.
 *     - Positive values for healing. Negative values for damage.
 *
 *     Flat:
 *     - Flat changes made to the parameter.
 *     - Positive values for healing. Negative values for damage.
 *
 *   Damage Popup?:
 *   - Display a damage popup after?
 *
 * ---
 *
 * MECH: Immortal
 * - Changes the immortal flag of targets. If immortal flag is removed and a
 *   unit would die, collapse that unit.
 *
 *   Targets:
 *   - Alter the immortal flag of these groups. If immortal flag is removed and
 *     a unit would die, collapse that unit.
 *
 *   Immortal:
 *   - Turn immortal flag for unit(s) on/off?
 *
 * ---
 *
 * MECH: Multipliers
 * - Changes the multipliers for the current action.
 * - You may use JavaScript code for any of these.
 *
 *   Critical Hit%:
 *
 *     Rate:
 *     - Affects chance to land a critical hit by this multiplier.
 *
 *     Flat:
 *     - Affects chance to land a critical hit by this flat bonus.
 *
 *   Critical Damage
 *
 *     Rate:
 *     - Affects critical damage by this multiplier.
 *
 *     Flat:
 *     - Affects critical damage by this flat bonus.
 *
 *   Damage/Healing
 *
 *     Rate:
 *     - Sets the damage/healing multiplier for current action.
 *
 *     Flat:
 *     - Sets the damage/healing bonus for current action.
 *
 *   Hit Rate
 *
 *     Rate:
 *     - Affects chance to connect attack by this multiplier.
 *
 *     Flat:
 *     - Affects chance to connect attack by this flat bonus.
 *
 * ---
 * 
 * MECH: OTB Order
 * - Alters the OTB Turn Order. Best used with single targets.
 * - Requires VisuMZ_2_BattleSystemOTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the OTB Turn Order for.
 * 
 *   Current Turn By:
 *   - Changes turn order for target(s) by this amount.
 *   - Positive increases wait. Negative decreases wait.
 * 
 *   Next Turn By:
 *   - Changes turn order for target(s) by this amount.
 *   - Positive increases wait. Negative decreases wait.
 * 
 *   Follow Turn By:
 *   - Changes turn order for target(s) by this amount.
 *   - Positive increases wait. Negative decreases wait.
 * 
 * ---
 *
 * MECH: Remove Buff/Debuff
 * - Removes buff(s)/debuff(s) from unit(s). 
 * - Determine which parameters are removed.
 *
 *   Targets:
 *   - Select unit(s) to have the buff(s) and/or debuff(s) removed.
 *
 *   Buff Parameters:
 *   - Select which buffed parameter(s) to remove.
 *
 *   Debuff Parameters:
 *   - Select which debuffed parameter(s) to remove.
 *
 * ---
 *
 * MECH: Remove State
 * - Remove state(s) from unit(s).
 *
 *   Targets:
 *   - Select unit(s) to have states removed from.
 *
 *   States:
 *   - Select which state ID(s) to remove from unit(s).
 *   - Insert multiple state ID's to remove multiple at once.
 *
 * ---
 * 
 * MECH: STB Exploit Effect
 * - Utilize the STB Exploitation mechanics!
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Target(s) Exploited?:
 *   - Exploit the below targets?
 * 
 *     Targets:
 *     - Select unit(s) to become exploited.
 * 
 *     Force Exploitation:
 *     - Force the exploited status?
 * 
 *   User Exploiter?:
 *   - Allow the user to become the exploiter?
 * 
 *     Force Exploitation:
 *     - Force the exploiter status?
 * 
 * ---
 * 
 * MECH: STB Extra Action
 * - Adds an extra action for the currently active battler.
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Extra Actions:
 *   - How many extra actions should the active battler gain?
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * MECH: STB Remove Excess Actions
 * - Removes excess actions from the active battler.
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Remove Actions:
 *   - How many actions to remove from the active battler?
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * MECH: Swap Weapon
 * - Causes the unit(s) to swap their weapon for another.
 * - Requires VisuMZ_2_WeaponSwapSystem!
 * 
 *   Targets:
 *   - Select unit(s) to swap weapons for.
 * 
 *   Weapon Type ID:
 *   - Which weapon type to swap to?
 *   - This is NOT the weapon's ID.
 *   - It's the weapon TYPE.
 * 
 * ---
 * 
 * MECH: Text Popup
 * - Causes the unit(s) to display a text popup.
 * 
 *   Targets:
 *   - Select unit(s) to prompt a text popup.
 * 
 *   Text:
 *   - What text do you wish to display?
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 * 
 * ---
 * 
 * MECH: Variable Popup
 * - Causes the unit(s) to display a popup using the data stored inside
 *   a variable.
 * 
 *   Targets:
 *   - Select unit(s) to prompt a text popup.
 * 
 *   Variable:
 *   - Get data from which variable to display as a popup?
 * 
 *   Digit Grouping:
 *   - Use digit grouping to separate numbers?
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 * 
 * ---
 *
 * MECH: Wait For Effect
 * - Waits for the effects to complete before performing next command.
 *
 * ---
 *
 * === Action Sequences - Motion ===
 *
 * These Action Sequences allow you the ability to control the motions of
 * sideview sprites.
 *
 * ---
 * 
 * MOTION: Clear Freeze Frame
 * - Clears any freeze frames from the unit(s).
 * 
 *   Targets:
 *   - Select which unit(s) to clear freeze frames for.
 * 
 * ---
 * 
 * MOTION: Freeze Motion Frame
 * - Forces a freeze frame instantly at the selected motion.
 * - Automatically clears with a new motion.
 * 
 *   Targets:
 *   - Select which unit(s) to freeze motions for.
 * 
 *   Motion Type:
 *   - Freeze this motion for the unit(s).
 * 
 *   Frame Index:
 *   - Which frame do you want to freeze the motion on?
 *   - Frame index values start at 0.
 * 
 *   Show Weapon?:
 *   - If using 'attack', 'thrust', 'swing', or 'missile', display the
 *     weapon sprite?
 * 
 * ---
 *
 * MOTION: Motion Type
 * - Causes the unit(s) to play the selected motion.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 *   Motion Type:
 *   - Play this motion for the unit(s).
 *
 *   Show Weapon?:
 *   - If using 'attack', 'thrust', 'swing', or 'missile', display the
 *     weapon sprite?
 *
 * ---
 *
 * MOTION: Perform Action
 * - Causes the unit(s) to play the proper motion based on the current action.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 * ---
 *
 * MOTION: Refresh Motion
 * - Cancels any set motions unit(s) has to do and use their most natural
 *   motion at the moment.
 *
 *   Targets:
 *   - Select which unit(s) to refresh their motion state.
 *
 * ---
 *
 * MOTION: Wait By Motion Frame
 * - Creates a wait equal to the number of motion frames passing.
 * - Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 *   Motion Frames to Wait?:
 *   - Each "frame" is equal to the value found in 
 *     Plugin Parameters => Actors => Motion Speed
 *
 * ---
 *
 * === Action Sequences - Movement ===
 *
 * These Action Sequences allow you the ability to control the sprites of
 * actors and enemies in battle.
 *
 * ---
 *
 * MOVE: Battle Step
 * - Causes the unit(s) to move forward past their home position to prepare
 *   for action.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Face Direction
 * - Causes the unit(s) to face forward or backward.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Direction:
 *   - Select which direction to face.
 *
 * ---
 *
 * MOVE: Face Point
 * - Causes the unit(s) to face a point on the screen.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Face Away From?:
 *   - Face away from the point instead?
 *
 * ---
 *
 * MOVE: Face Target(s)
 * - Causes the unit(s) to face other targets on the screen.
 * - Sideview-only!
 *
 *   Targets (facing):
 *   - Select which unit(s) to change direction.
 *
 *   Targets (destination):
 *   - Select which unit(s) for the turning unit(s) to face.
 *
 *   Face Away From?:
 *   - Face away from the unit(s) instead?
 *
 * ---
 *
 * MOVE: Float
 * - Causes the unit(s) to float above the ground.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make float.
 *
 *   Desired Height:
 *   - Vertical distance to float upward.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total float amount.
 *
 *   Float Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Float?:
 *   - Wait for floating to complete before performing next command?
 *
 * ---
 *
 * MOVE: Home Reset
 * - Causes the unit(s) to move back to their home position(s) and face back to
 *   their original direction(s).
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Jump
 * - Causes the unit(s) to jump into the air.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make jump.
 *
 *   Desired Height:
 *   - Max jump height to go above the ground
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total jump amount.
 *
 *   Wait For Jump?:
 *   - Wait for jumping to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move Distance
 * - Moves unit(s) by a distance from their current position(s).
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Distance Adjustment:
 *   - Makes adjustments to distance values to determine which direction to
 *     move unit(s).
 *     - Normal - No adjustments made
 *     - Horizontal - Actors adjust left, Enemies adjust right
 *     - Vertical - Actors adjust Up, Enemies adjust down
 *     - Both - Applies both Horizontal and Vertical
 *
 *     Distance: X:
 *     - Horizontal distance to move.
 *     - You may use JavaScript code.
 *
 *     Distance: Y:
 *     - Vertical distance to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Point
 * - Moves unit(s) to a designated point on the screen.
 * - Sideview-only! Points based off Graphics.boxWidth/Height.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Destination Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Target(s)
 * - Moves unit(s) to another unit(s) on the battle field.
 * - Sideview-only!
 *
 *   Targets (Moving):
 *   - Select which unit(s) to move.
 *
 *   Targets (Destination):
 *   - Select which unit(s) to move to.
 *
 *     Target Location:
 *     - Select which part target group to move to.
 *       - front head
 *       - front center
 *       - front base
 *       - middle head
 *       - middle center
 *       - middle base
 *       - back head
 *       - back center
 *       - back base
 *
 *     Melee Distance:
 *     - The melee distance away from the target location in addition to the
 *       battler's width.
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Opacity
 * - Causes the unit(s) to change opacity.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change opacity.
 *
 *   Desired Opacity:
 *   - Change to this opacity value.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for opacity change.
 *
 *   Opacity Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Opacity?:
 *   - Wait for opacity changes to complete before performing next command?
 *
 * ---
 *
 * MOVE: Scale/Grow/Shrink
 * - Causes the unit(s) to scale, grow, or shrink?.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change the scale of.
 *
 *   Scale X:
 *   Scale Y:
 *   - What target scale value do you want?
 *   - 1.0 is normal size.
 *
 *   Duration:
 *   - Duration in frames to scale for.
 *
 *   Scale Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Scale?:
 *   - Wait for scaling to complete before performing next command?
 *
 * ---
 *
 * MOVE: Skew/Distort
 * - Causes the unit(s) to skew.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to skew.
 *
 *   Skew X:
 *   Skew Y:
 *   - What variance to skew?
 *   - Use small values for the best results.
 *
 *   Duration:
 *   - Duration in frames to skew for.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew to complete before performing next command?
 *
 * ---
 *
 * MOVE: Spin/Rotate
 * - Causes the unit(s) to spin.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to spin.
 *
 *   Angle:
 *   - How many degrees to spin?
 *
 *   Duration:
 *   - Duration in frames to spin for.
 *
 *   Spin Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Revert Angle on Finish:
 *   - Upon finishing the spin, revert the angle back to 0.
 *
 *   Wait For Spin?:
 *   - Wait for spin to complete before performing next command?
 *
 * ---
 *
 * MOVE: Wait For Float
 * - Waits for floating to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Jump
 * - Waits for jumping to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Movement
 * - Waits for movement to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Opacity
 * - Waits for opacity changes to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Scale
 * - Waits for scaling to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Skew
 * - Waits for skewing to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Spin
 * - Waits for spinning to complete before performing next command.
 *
 * ---
 * 
 * === Action Sequences - Projectiles ===
 * 
 * Create projectiles on the screen and fire them off at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * ---
 *
 * PROJECTILE: Animation
 * - Create an animation projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Animation ID:
 *     - Determine which animation to use as a projectile.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 *
 * ---
 *
 * PROJECTILE: Icon
 * - Create an icon projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Icon:
 *     - Determine which icon to use as a projectile.
 *       - You may use JavaScript code.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the projectile?
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Hue:
 *       - Adjust the hue of the projectile.
 *       - Insert a number between 0 and 360.
 *
 *       Scale:
 *       - Adjust the size scaling of the projectile.
 *       - Use decimals for exact control.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 *
 * ---
 *
 * PROJECTILE: Picture
 * - Create a picture projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Picture Filename:
 *     - Determine which picture to use as a projectile.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the projectile?
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Hue:
 *       - Adjust the hue of the projectile.
 *       - Insert a number between 0 and 360.
 *
 *       Scale:
 *       - Adjust the size scaling of the projectile.
 *       - Use decimals for exact control.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 *
 * ---
 * 
 * === Action Sequences - Skew ===
 * 
 * These action sequences allow you to have control over the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * ---
 *
 * SKEW: Change Skew
 * - Changes the camera skew.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Skew X:
 *   - Change the camera skew X to this value.
 *
 *   Skew Y:
 *   - Change the camera skew Y to this value.
 *
 *   Duration:
 *   - Duration in frames to change camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Reset Skew
 * - Reset any skew settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Wait For Skew
 * - Waits for skew changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Target ===
 *
 * If using a manual target by target Action Sequence, these commands will give
 * you full control over its usage.
 *
 * ---
 *
 * TARGET: Current Index
 * - Sets the current index to this value.
 * - Then decide to jump to a label (optional).
 *
 *   Set Index To:
 *   - Sets current targeting index to this value.
 *   - 0 is the starting index of a target group.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Next Target
 * - Moves index forward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Previous Target
 * - Moves index backward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Random Target
 * - Sets index randomly to determine new currernt target.
 * - Then decide to jump to a label (optional).
 *
 *   Force Random?:
 *   - Index cannot be its previous index amount after random.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * === Action Sequences - Weapon ===
 *
 * Allows for finer control over Dual/Multi Wielding actors.
 * Only works for Actors.
 *
 * ---
 *
 * WEAPON: Clear Weapon Slot
 * - Clears the active weapon slot (making others valid again).
 * - Only works for Actors.
 *
 *   Targets:
 *   - Select unit(s) to clear the active weapon slot for.
 *
 * ---
 *
 * WEAPON: Next Weapon Slot
 * - Goes to next active weapon slot (making others invalid).
 * - If next slot is weaponless, don't label jump.
 *
 *   Targets:
 *   - Select unit(s) to change the next active weapon slot for.
 *
 * ---
 *
 * WEAPON: Set Weapon Slot
 * - Sets the active weapon slot (making others invalid).
 * - Only works for Actors.
 *
 *   Targets:
 *   - Select unit(s) to change the active weapon slot for.
 *
 *   Weapon Slot ID:
 *   - Select weapon slot to make active (making others invalid).
 *   - Use 0 to clear and normalize. You may use JavaScript code.
 *
 * ---
 *
 * === Action Sequences - Zoom ===
 *
 * These Action Sequences are zoom-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ZOOM: Change Scale
 * - Changes the zoom scale.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Scale:
 *   - The zoom scale to change to.
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Reset Zoom
 * - Reset any zoom settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Wait For Zoom
 * - Waits for zoom changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto Battle Settings
 * ============================================================================
 *
 * These Plugin Parameter settings allow you to change the aspects added by
 * this plugin that support Auto Battle and the Auto Battle commands.
 *
 * Auto Battle commands can be added to the Party Command Window and/or Actor
 * Command Window. The one used by the Party Command Window will cause the
 * whole party to enter an Auto Battle state until stopped by a button input.
 * The command used by the Actor Command Window, however, will cause the actor
 * to select an action based off the Auto Battle A.I. once for the current turn
 * instead.
 *
 * ---
 *
 * Battle Display
 * 
 *   Message:
 *   - Message that's displayed when Auto Battle is on.
 *     Text codes allowed. %1 - OK button, %2 - Cancel button
 * 
 *   OK Button:
 *   - Text used to represent the OK button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Cancel Button:
 *   - Text used to represent the Cancel button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Background Type:
 *   - Select background type for Auto Battle window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the Auto Battle options to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Startup Name:
 *   - Command name of the option.
 * 
 *   Style Name:
 *   - Command name of the option.
 * 
 *   OFF:
 *   - Text displayed when Auto Battle Style is OFF.
 * 
 *   ON:
 *   - Text displayed when Auto Battle Style is ON.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Damage Settings
 * ============================================================================
 *
 * These Plugin Parameters add a variety of things to how damage is handled in
 * battle. These range from hard damage caps to soft damage caps to how damage
 * popups appear, how the formulas for various aspects are handled and more.
 *
 * Damage Styles are also a feature added through this plugin. More information
 * can be found in the help section above labeled 'Damage Styles'.
 *
 * ---
 *
 * Damage Cap
 * 
 *   Enable Damage Cap?:
 *   - Put a maximum hard damage cap on how far damage can go?
 *   - This can be broken through the usage of notetags.
 * 
 *   Default Hard Cap:
 *   - The default hard damage cap used before applying damage.
 * 
 *   Enable Soft Cap?:
 *   - Soft caps ease in the damage values leading up to the  hard damage cap.
 *   - Requires hard Damage Cap enabled.
 * 
 *     Base Soft Cap Rate:
 *     - The default soft damage cap used before applying damage.
 * 
 *     Soft Scale Constant:
 *     - The default soft damage cap used before applying damage.
 *
 * ---
 *
 * Popups
 * 
 *   Popup Duration:
 *   - Adjusts how many frames a popup stays visible.
 * 
 *   Newest Popups Bottom:
 *   - Puts the newest popups at the bottom.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Sets how much to offset the sprites by horizontally/vertically.
 * 
 *   Shift X:
 *   Shift Y:
 *   - Sets how much to shift the sprites by horizontally/vertically.
 * 
 *   Shift Y:
 * 
 *   Critical Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Critical Duration:
 *   - Adjusts how many frames a the flash lasts.
 *
 * ---
 *
 * Formulas
 * 
 *   JS: Overall Formula:
 *   - The overall formula used when calculating damage.
 * 
 *   JS: Variance Formula:
 *   - The formula used when damage variance.
 * 
 *   JS: Guard Formula:
 *   - The formula used when damage is guarded.
 *
 * ---
 *
 * Critical Hits
 * 
 *   JS: Rate Formula:
 *   - The formula used to calculate Critical Hit Rates.
 * 
 *   JS: Damage Formula:
 *   - The formula used to calculate Critical Hit Damage modification.
 *
 * ---
 *
 * Damage Styles
 * 
 *   Default Style:
 *   - Which Damage Style do you want to set as default?
 *   - Use 'Manual' to not use any styles at all.
 *     - The 'Manual' style will not support <Armor Penetration> notetags.
 *     - The 'Manual' style will not support <Armor Reduction> notetags.
 * 
 *   Style List:
 *   - A list of the damage styles available.
 *   - These are used to calculate base damage.
 * 
 *     Name:
 *     - Name of this Damage Style.
 *     -Used for notetags and such.
 * 
 *     JS: Formula:
 *     - The base formula for this Damage Style.
 * 
 *     Items & Equips Core:
 * 
 *       HP Damage:
 *       MP Damage:
 *       HP Recovery:
 *       MP Recovery:
 *       HP Drain:
 *       MP Drain:
 *       - Vocabulary used for this data entry.
 * 
 *       JS: Damage Display:
 *       - Code used the data displayed for this category.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Some of the base settings for the various mechanics found in the battle
 * system can be altered here in these Plugin Parameters. Most of these will
 * involve JavaScript code and require you to have to good understanding of
 * how the RPG Maker MZ code works before tampering with it.
 *
 * ---
 *
 * Action Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   JS: Calculate:
 *   - Code used to calculate action speed.
 *
 * ---
 *
 * Base Troop
 * 
 *   Base Troop ID's:
 *   - Select the Troop ID(s) to duplicate page events from for all
 *     other troops.
 *   - More information can be found in the dedicated Help section above.
 *
 * ---
 * 
 * Common Events (on Map)
 * 
 *   Pre-Battle Event:
 *   Post-Battle Event:
 *   Victory Event:
 *   Defeat Event:
 *   Escape Success Event:
 *   Escape Fail Event:
 *   - Queued Common Event to run upon meeting the condition.
 *   - Use to 0 to not run any Common Event at all.
 *   - "Post-Battle Event" will always run regardless.
 *   - If any events are running before the battle, they will continue running
 *     to the end first before the queued Common Events will run.
 *   - These common events only run on the map scene. They're not meant to run
 *     in the battle scene.
 *   - If the "Defeat Event" has a common event attached to it, then random
 *     encounters will be changed to allow defeat without being sent to the
 *     Game Over scene. Instead, the game will send the player to the map scene
 *     where the Defeat Event will run.
 *
 * ---
 *
 * Escape
 * 
 *   JS: Calc Escape Ratio:
 *   - Code used to calculate the escape success ratio.
 * 
 *   JS: Calc Escape Raise:
 *   - Code used to calculate how much the escape success ratio raises upon
 *     each failure.
 * 
 * ---
 * 
 * Switches
 * 
 *   Switch: Critical:
 *   - Turns switch ON if the action performs a critical hit.
 *   - Switch reverts to OFF whenever an action starts.
 *   - If multiple targets/hits are struck, as long as one hit lands a critical
 *     hit, then the switch will remain ON for the rest of the action.
 * 
 *   Switch: Miss/Evade:
 *   - Turns switch ON if the action misses/is evaded.
 *   - Switch reverts to OFF whenever an action starts.
 *   - If multiple targets/hits are struck, as long as one hit fails to land,
 *     then the switch will remain ON for the rest of the action.
 * 
 * ---
 * 
 * Variables
 * 
 *   Variable: Damage:
 *   - Variable records target damage during action.
 *   - Variable reverts to 0 whenever an action starts.
 *   - If multiple targets/hits are struck, the variable will record the total
 *     amount of damage done for the remainder of the action (unless manually
 *     reseting to 0 during an Action Sequence).
 * 
 *   Variable: Healing:
 *   - Variable records target healing during action.
 *   - Variable reverts to 0 whenever an action starts.
 *   - If multiple targets/hits are struck, the variable will record the total
 *     amount of healing done for the remainder of the action (unless manually
 *     reseting to 0 during an Action Sequence).
 * 
 * ---
 *
 * JS: Battle-Related
 * 
 *   JS: Pre-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Battle Victory:
 *   - Target function: BattleManager.processVictory()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Success:
 *   - Target function: BattleManager.onEscapeSuccess()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Failure:
 *   - Target function: BattleManager.onEscapeFailure()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Battle Defeat:
 *   - Target function: BattleManager.processDefeat()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Turn-Related
 * 
 *   JS: Pre-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Action-Related
 * 
 *   JS: Pre-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Post-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Action:
 *   - Target function: BattleManager.endAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Action:
 *   - DescriTarget function: BattleManager.endAction()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Layout Settings
 * ============================================================================
 *
 * The Battle Layout Settings Plugin Parameter gives you control over the look,
 * style, and appearance of certain UI elements. These range from the way the
 * Battle Status Window presents its information to the way certain windows
 * like the Party Command Window and Actor Command Window appear.
 *
 * ---
 *
 * Battle Layout Style
 * - The style used for the battle layout.
 * 
 *   Default:
 *   - Shows actor faces in Battle Status.
 * 
 *   List:
 *   - Lists actors in Battle Status.
 * 
 *   XP:
 *   - Shows actor battlers in a stretched Battle Status.
 * 
 *   Portrait:
 *   - Shows portraits in a stretched Battle Status.
 * 
 *   Border:
 *   - Displays windows around the screen border.
 *
 * ---
 *
 * List Style
 * 
 *   Show Faces:
 *   - Shows faces in List Style?
 * 
 *   Command Window Width:
 *   - Determine the window width for the Party and Actor Command Windows.
 *   - Affects Default and List Battle Layout styles.
 *
 * ---
 *
 * XP Style
 * 
 *   Command Lines:
 *   - Number of action lines in the Actor Command Window for the XP Style.
 * 
 *   Sprite Height:
 *   - Default sprite height used when if the sprite's height has not been
 *     determined yet.
 * 
 *   Sprite Base Location:
 *   - Determine where the sprite is located on the Battle Status Window.
 *     - Above Name - Sprite is located above the name.
 *     - Bottom - Sprite is located at the bottom of the window.
 *     - Centered - Sprite is centered in the window.
 *     - Top - Sprite is located at the top of the window.
 *
 * ---
 *
 * Portrait Style
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait instead of a face.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Border Style
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait at the edge of the screen.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Skill & Item Windows
 * 
 *   Middle Layout:
 *   - Shows the Skill & Item Windows in mid-screen?
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 *
 * ---
 * 
 * Status Window Elements
 * 
 *   Battler Name:
 *   Gauge 1 (HP):
 *   Gauge 2 (MP):
 *   Gauge 3 (TP):
 *   State Icon:
 *   TPB/ATB Gauge:
 * 
 *     Offset: X/Y:
 *     - Offset this Battle Status Window element's X/Y.
 *     - For X: Negative goes left. Positive goes right.
 *     - For Y: Negative goes up. Positive goes down.
 * 
 *   Window Skin:
 * 
 *     Filename:
 *     - Filename used for the Battle Status Window skin.
 *     - Leave this empty to use the default window skin.
 * 
 *     Hide Window Skin?:
 *     - Hide the window skin for the Battle Status Window?
 * 
 *   Selectable Background:
 * 
 *     Hide Selectable BG?:
 *     - Show/Hide the selectable background box for the Battle Status Window?
 * 
 *   Attachments:
 * 
 *     Back Attachment:
 * 
 *       Filename:
 *       - Filename used for an image to attach to the back of the Battle
 *         Status Window. Leave empty for none.
 * 
 *       Offset: X/Y:
 *       - Offset this Battle Status Window element's X/Y.
 *       - For X: Negative goes left. Positive goes right.
 *       - For Y: Negative goes up. Positive goes down.
 * 
 *     Front Attachment:
 * 
 *       Filename:
 *       - Filename used for an image to attach to the front of the Battle
 *         Status Window. Leave empty for none.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Log Settings
 * ============================================================================
 *
 * These Plugin Parameters give you control over how the Battle Log Window, the
 * window shown at the top of the screen in the battle layout, appears, its
 * various properties, and which text will be displayed.
 *
 * The majority of the text has been disabled by default with this plugin to
 * make the flow of battle progress faster.
 *
 * ---
 *
 * General
 * 
 *   Back Color:
 *   - Use #rrggbb for a hex color.
 * 
 *   Max Lines:
 *   - Maximum number of lines to be displayed.
 * 
 *   Message Wait:
 *   - Number of frames for a usual message wait.
 * 
 *   Text Align:
 *   - Text alignment for the Window_BattleLog.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the battle log.
 *
 * ---
 *
 * Start Turn
 * 
 *   Show Start Turn?:
 *   - Display turn changes at the start of the turn?
 * 
 *   Start Turn Message:
 *   - Message displayed at turn start.
 *   - %1 - Turn Count
 * 
 *   Start Turn Wait:
 *   - Number of frames to wait after a turn started.
 *
 * ---
 *
 * Display Action
 * 
 *   Show Centered Action?:
 *   - Display a centered text of the action name?
 * 
 *   Show Skill Message 1?:
 *   - Display the 1st skill message?
 * 
 *   Show Skill Message 2?:
 *   - Display the 2nd skill message?
 * 
 *   Show Item Message?:
 *   - Display the item use message?
 *
 * ---
 *
 * Action Changes
 * 
 *   Show Counter?:
 *   - Display counter text?
 * 
 *   Show Reflect?:
 *   - Display magic reflection text?
 * 
 *   Show Substitute?:
 *   - Display substitute text?
 *
 * ---
 *
 * Action Results
 * 
 *   Show No Effect?:
 *   - Display no effect text?
 * 
 *   Show Critical?:
 *   - Display critical text?
 * 
 *   Show Miss/Evasion?:
 *   - Display miss/evasion text?
 * 
 *   Show HP Damage?:
 *   - Display HP Damage text?
 * 
 *   Show MP Damage?:
 *   - Display MP Damage text?
 * 
 *   Show TP Damage?:
 *   - Display TP Damage text?
 *
 * ---
 *
 * Display States
 * 
 *   Show Added States?:
 *   - Display added states text?
 * 
 *   Show Removed States?:
 *   - Display removed states text?
 * 
 *   Show Current States?:
 *   - Display the currently affected state text?
 * 
 *   Show Added Buffs?:
 *   - Display added buffs text?
 * 
 *   Show Added Debuffs?:
 *   - Display added debuffs text?
 * 
 *   Show Removed Buffs?:
 *   - Display removed de/buffs text?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battleback Scaling Settings
 * ============================================================================
 *
 * By default, the battlebacks in RPG Maker MZ scale as if the screen size is
 * a static 816x624 resolution, which isn't always the case. These settings
 * here allow you to dictate how you want the battlebacks to scale for the
 * whole game. These settings CANNOT be changed midgame or per battle.
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default scaling style used for battlebacks.
 *   - MZ (MZ's default style)
 *   - 1:1 (No Scaling)
 *   - Scale To Fit (Scale to screen size)
 *   - Scale Down (Scale Downward if Larger than Screen)
 *   - Scale Up (Scale Upward if Smaller than Screen)
 * 
 *   JS: 1:1:
 *   JS: Scale To Fit:
 *   JS: Scale Down:
 *   JS: Scale Up:
 *   JS: 1:1:
 *   JS: 1:1:
 *   - This code gives you control over the scaling for this style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Party Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you control over how the Party Command Window
 * operates in the battle scene. You can turn disable it from appearing or make
 * it so that it doesn't 
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Party Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Party Command Window.
 * 
 *   Fight Icon:
 *   - The icon used for the Fight command.
 * 
 *   Add Auto Battle?:
 *   - Add the "Auto Battle" command to the Command Window?
 * 
 *     Auto Battle Icon:
 *     - The icon used for the Auto Battle command.
 * 
 *     Auto Battle Text:
 *     - The text used for the Auto Battle command.
 * 
 *   Add Options?:
 *   - Add the "Options" command to the Command Window?
 * 
 *     Options Icon:
 *     - The icon used for the Options command.
 * 
 *     Active TPB Message:
 *     - Message that will be displayed when selecting options during the
 *       middle of an action.
 * 
 *   Escape Icon:
 *   - The icon used for the Escape command.
 *
 * ---
 *
 * Access
 * 
 *   Skip Party Command:
 *   - DTB: Skip Party Command selection on turn start.
 *   - TPB: Skip Party Command selection at battle start.
 * 
 *   Disable Party Command:
 *   - Disable the Party Command Window entirely?
 *
 * ---
 *
 * Help Window
 * 
 *   Fight:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 * 
 *   Options:
 *   - Text displayed when selecting the Options command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you to change various aspects regarding the
 * Actor Command Window and how it operates in the battle scene. This ranges
 * from how it appears to the default battle commands given to all players
 * without a custom <Battle Commands> notetag.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Actor Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Actor Command Window.
 * 
 *   Item Icon:
 *   - The icon used for the Item command.
 * 
 *   Normal SType Icon:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * 
 *   Magic SType Icon:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 *
 * ---
 *
 * Battle Commands
 * 
 *   Command List:
 *   - List of battle commands that appear by default if the <Battle Commands>
 *     notetag isn't present.
 *
 *     - Attack 
 *       - Adds the basic attack command.
 * 
 *     - Skills
 *       - Displays all the skill types available to the actor.
 * 
 *     - SType: x
 *     - Stype: name
 *       - Adds in a specific skill type.
 *       - Replace 'x' with the ID of the skill type.
 *       - Replace 'name' with the name of the skill type (without text codes).
 *
 *     - All Skills
 *       - Adds all usable battle skills as individual actions.
 * 
 *     - Skill: x
 *     - Skill: name
 *       - Adds in a specific skill as a usable action.
 *       - Replace 'x' with the ID of the skill.
 *       - Replace 'name' with the name of the skill.
 * 
 *     - Guard
 *       - Adds the basic guard command.
 * 
 *     - Item
 *       - Adds the basic item command.
 * 
 *     - Escape
 *       - Adds the escape command.
 * 
 *     - Auto Battle
 *       - Adds the auto battle command.
 * 
 *   Show Command Costs:
 *   - If a battle command has a resource cost, show it?
 *
 * ---
 *
 * Help Window
 * 
 *   Skill Types:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Items:
 *   - Text displayed when selecting the item command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how the sideview battlers behave for
 * the actor sprites. Some of these settings are shared with enemies if they
 * use sideview battler graphics.
 *
 * ---
 *
 * Flinch
 * 
 *   Flinch Distance X:
 *   - The normal X distance when flinching.
 * 
 *   Flinch Distance Y:
 *   - The normal Y distance when flinching.
 * 
 *   Flinch Duration:
 *   - The number of frames for a flinch to complete.
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 * 
 *   Chant Style:
 *   - What determines the chant motion?
 *   - Hit type or skill type?
 * 
 *   Offset X:
 *   - Offsets X position where actor is positioned.
 *   - Negative values go left. Positive values go right.
 * 
 *   Offset Y:
 *   - Offsets Y position where actor is positioned.
 *   - Negative values go up. Positive values go down.
 * 
 *   Motion Speed:
 *   - The number of frames in between each motion.
 * 
 *   Priority: Active:
 *   - Place the active actor on top of actor and enemy sprites.
 * 
 *   Priority: Actors:
 *   - Prioritize actors over enemies when placing sprites on top of each other
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   Smooth Image:
 *   - Smooth out the battler images or pixelate them?
 * 
 *   JS: Home Position:
 *   - Code used to calculate the home position of actors.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Enemy Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how enemies appear visually in the
 * battle scene. Some of these settings will override the settings used for
 * actors if used as sideview battlers. Other settings include changing up the
 * default attack animation for enemies, how the enemy select window functions,
 * and more.
 *
 * ---
 *
 * Visual
 * 
 *   Attack Animation:
 *   - Default attack animation used for enemies.
 *   - Use <Attack Animation: x> for custom animations.
 * 
 *   Emerge Text:
 *   - Show or hide the 'Enemy emerges!' text at the start of battle.
 * 
 *   Offset X:
 *   - Offsets X position where enemy is positioned.
 *   - Negative values go left. Positive values go right.
 * 
 *   Offset Y:
 *   - Offsets Y position where enemy is positioned.
 *   - Negative values go up. Positive values go down.
 * 
 *   Smooth Image:
 *   - Smooth out the battler images or pixelate them?
 *
 * ---
 *
 * Select Window
 * 
 *   Any: Last Selected:
 *   - Prioritize last selected enemy over front view or sideview settings?
 * 
 *   FV: Right Priority:
 *   - If using frontview, auto select the enemy furthest right.
 * 
 *   SV: Right Priority:
 *   - If using sideview, auto select the enemy furthest right.
 * 
 * ---
 * 
 * Name:
 * 
 *   Name: Font Size:
 *   - Font size used for enemy names.
 * 
 *   Name: Offset X:
 *   Name: Offset Y:
 *   - Offset the enemy name's position by this much.
 *   - For X: Negative goes left. Positive goes right.
 *   - For Y: Negative goes up. Positive goes down.
 * 
 *   Name: Always Visible:
 *   - Determines if the enemy name will always be visible.
 * 
 *   Name: Attach States:
 *   - Attach the enemy's state icon to the enemy name?
 * 
 *     Attach: Offset X:
 *     Attach: Offset Y:
 *     - How much to offset the attached icon's X/Y position by?
 *     - For X: Negative goes left. Positive goes right.
 *     - For Y: Negative goes up. Positive goes down.
 * 
 *   Legacy Option:
 *   - Use the legacy version (window) or new version (sprite).
 *   - WARNING: Legacy version is no longer supported for bugs.
 *   - Not all settings available here in the Plugin Parameters will be
 *     available to the legacy version (ie Always Visible and Attach States).
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Allow Collapse:
 *   - Causes defeated enemies with SV Battler graphics to "fade away"
 *     when defeated?
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Motion: Idle:
 *   - Sets default idle animation used by Sideview Battlers.
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   Size: Width:
 *   - Default width for enemies that use Sideview Battlers.
 * 
 *   Size: Height:
 *   - Default height for enemies that use Sideview Battlers.
 * 
 *   Weapon Type:
 *   - Sets default weapon type used by Sideview Battlers.
 *   - Use 0 for Bare Hands.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: HP Gauge Settings
 * ============================================================================
 *
 * Settings that adjust the visual HP Gauge displayed in battle.
 *
 * ---
 *
 * Show Gauges For
 * 
 *   Actors:
 *   - Show HP Gauges over the actor sprites' heads?
 *   - Requires SV Actors to be visible.
 * 
 *   Enemies:
 *   - Show HP Gauges over the enemy sprites' heads?
 *   - Can be bypassed with <Hide HP Gauge> notetag.
 * 
 *     Requires Defeat?:
 *     - Requires defeating the enemy once to show HP Gauge?
 *     - Can be bypassed with <Show HP Gauge> notetag.
 * 
 *       Battle Test Bypass?:
 *       - Bypass the defeat requirement in battle test?
 *
 * ---
 *
 * Settings
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the HP Gauge sprite's anchor X/Y to be?
 *     Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the HP Gauge to be scaled?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the HP Gauge's X/Y by?
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the 'Show HP Gauge' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Action Sequence Settings
 * ============================================================================
 *
 * Action Sequence Plugin Parameters allow you to decide if you want automatic
 * Action Sequences to be used for physical attacks, the default casting
 * animations used, how counters and reflects appear visually, and what the
 * default stepping distances are.
 *
 * ---
 *
 * Automatic Sequences
 * 
 *   Melee Single Target:
 *   - Allow this auto sequence for physical, single target actions?
 * 
 *   Melee Multi Target:
 *   - Allow this auto sequence for physical, multi-target actions?
 *
 * ---
 * 
 * Quality of Life
 * 
 *   Auto Notetag:
 *   - Automatically apply the <Custom Action Sequence> notetag effect to any
 *     item or skill that has a Common Event?
 *   - Any item or skill without a Common Event attached to it will use the
 *     Automatic Action Sequences instead.
 *   - The <Auto Action Sequence> notetag will disable this effect for that
 *     particular skill or item.
 * 
 * ---
 *
 * Cast Animations
 * 
 *   Certain Hit:
 *   - Cast animation for Certain Hit skills.
 * 
 *   Physical:
 *   - Cast animation for Physical skills.
 * 
 *   Magical:
 *   - Cast animation for Magical skills.
 *
 * ---
 *
 * Counter/Reflect
 * 
 *   Counter Back:
 *   - Play back the attack animation used?
 * 
 *   Reflect Animation:
 *   - Animation played when an action is reflected.
 * 
 *   Reflect Back:
 *   - Play back the attack animation used?
 *
 * ---
 *
 * Stepping
 * 
 *   Melee Distance:
 *   - Minimum distance in pixels for Movement Action Sequences.
 * 
 *   Step Distance X:
 *   - The normal X distance when stepping forward.
 * 
 *   Step Distance Y:
 *   - The normal Y distance when stepping forward.
 * 
 *   Step Duration:
 *   - The number of frames for a stepping action to complete.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** Skill costs should now be displayed on battle commands again. Bug fix
 *    made by Olivia.
 * ** Pre-Battle Common Events should no longer cause stalling when used with
 *    specific event commands. Bug fix made by Olivia.
 * * Compatibility Update!
 * ** Added "Weapon Swap" to the list of battle commands that can be added.
 * * Documentation Update!
 * ** Added "Weapon Swap" and "Combat Log" to the list of <Battle Commands> in
 *    the notetags section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Olivia:
 * *** <Sideview Shadow Scale: x%> and <Sideview Shadow Scale: x.y>
 * **** Used for: Actor, Enemy Notetags
 * **** Adjusts the scaling size of the sideview battler's shadow.
 * 
 * Version 1.32: April 2, 2021
 * * Feature Update!
 * ** Sideview battler sprites when using front view will now factor in the
 *    window padding and appear properly centered to their focus point. Update
 *    made by Olivia.
 * 
 * Version 1.31: March 26, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_3_BoostAction plugin.
 * 
 * Version 1.30: March 19, 2021
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <JS Targets> is now updated to include the default set of targets
 *    selected by the skill/item's original scope. Update made by Yanfly.
 * *** If you wish to clear it out, simply do 'targets = []' first.
 * 
 * Version 1.29: March 12, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Enemy Battler Settings > Name > Legacy Option
 * **** Use the legacy version (window) or new version (sprite).
 * **** WARNING: Legacy version is no longer supported for bugs.
 * **** Not all settings available here in the Plugin Parameters will be
 *      available to the legacy version (ie Always Visible and Attach States).
 * 
 * Version 1.28: March 5, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Actor Command > Show Command Costs
 * **** If you don't want to show skill costs for your commands in the Actor
 *      Command Window, you can now hide them.
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Battle Layout Settings > Status Window Elements
 * *** Battle Layout Settings > Status Window Elements > Battler Name
 * *** Battle Layout Settings > Status Window Elements > Gauge 1 (HP)
 * *** Battle Layout Settings > Status Window Elements > Gauge 2 (MP)
 * *** Battle Layout Settings > Status Window Elements > Gauge 3 (TP)
 * *** Battle Layout Settings > Status Window Elements > State Icon
 * *** Battle Layout Settings > Status Window Elements > TPB/ATB Gauge
 * **** These new Plugin Parameters allow you to offset the positions of the
 *      various Battle Status Window elements. Their base positions will be
 *      calculated by the Battle Layout used and then offset from there.
 * *** Battle Layout Settings > Status Window Elements > Window Skin
 * **** These settings allow you to set a specific window skin for the
 *      Battle Status Window or hide it from view completely.
 * *** Battle Layout Settings > Status Window Elements > Selectable Background
 * **** This option allows you to hide the black box that comes with the
 *      majority of selectable elements found in RPG Maker MZ in case it does
 *      not fit with how you want the Battle Status Window to look.
 * *** Battle Layout Settings > Status Window Elements > Back Attachment
 * *** Battle Layout Settings > Status Window Elements > Front Attachment
 * **** These settings allow you to attach images to the back/front of the
 *      Battle Status Window from the img/system/ folder.
 * **** You may offset X and Y positions for them as well.
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > Enemy Settings > Name: Always Visible
 * **** Determines if the enemy name will always be visible.
 * *** Plugin Parameters > Enemy Settings > Name: Attach States
 * **** Attach the enemy's state icon to the enemy name?
 * *** Plugin Parameters > Enemy Settings > Attach: Offset X/Y
 * **** Offset the attached state icon's position.
 * * Feature Update!
 * ** Switched drawing enemy names on the screen from window to sprite to
 *    reduce lag and for better screen positioning accuracy especially during
 *    screen zooming. Update by Olivia.
 * 
 * Version 1.27: February 26, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Mechanics Settings > Switches > Switch: Critical
 * *** Plugin Parameters > Mechanics Settings > Switches > Switch: Miss/Evade
 * **** Turns Switches ON if the action performs a critical hit, misses, or is
 *      evaded at any point.
 * **** Switch reverts to OFF whenever an action starts.
 * **** If multiple targets/hits are struck, as long as one hit respectively
 *      lands a critical hit, fails to land, then the switch will remain ON for
 *      the rest of the action.
 * *** Plugin Parameters > Mechanics Settings > Variables > Variable: Damage
 * *** Plugin Parameters > Mechanics Settings > Variables > Variable: Healing
 * **** Variable records target damage/healing during action.
 * **** Variable reverts to 0 whenever an action starts.
 * **** If multiple targets/hits are struck, the variable will record the total
 *      amount of damage/healing done for the remainder of the action (unless
 *      manually reseting to 0 during an Action Sequence).
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Battles with branching event paths found within a conditional branch or
 *    choice tree will no longer be skipped over. Fix made by Arisu.
 * * Compatibility Update
 * ** Returning to the battle scene from the options scene in a Tpb-base battle
 *    system now links the current actor. Update by Irina.
 * 
 * Version 1.25: February 5, 2021
 * * Compatibility Update
 * ** Added compatibility update with VisuStella MZ Skills and States Core's
 *    Plugin Parameter > State Settings > Action End Update
 * * Feature Update!
 * ** <Common Event: name> notetag no longer requires <Custom Action Sequence>
 *    notetag if the Plugin Parameter: Auto Notetag is enabled.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** MOVE: Move To Point and MOVE: Move To Target(s) Action Sequences'
 *    "Offset Adjustment" normal setting will now factor in Offset X and
 *    Offset Y positions unlike before where it cancels them. Update by Irina.
 * * New Features!
 * ** New notetag added by Arisu:
 * *** <Common Event: name>
 * **** Battle only: calls forth a Common Event of a matching name.
 * **** This is primarily used for users who are reorganizing around their
 *      Common Events and would still like to have their skills/items perform
 *      the correct Action Sequences in case the ID's are different.
 * 
 * Version 1.23: January 22, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** ACSET: All Targets Action Set and ACSET: Each Target Action Set updated
 * *** New parameter added: Dual/Multi Wield?
 * **** Add times struck based on weapon quantity equipped?
 * * New Features!
 * ** Dual Wielding now functions differently. Made by Olivia.
 * *** Previously, RPG Maker MZ had "Dual Wielding" attack using both weapon
 *     animations at once, with the combined ATK of each weapon. It's confusing
 *     to look at and does not portray the nature of "Dual Wielding".
 * *** Dual Wielding, or in the case of users adding in third and fourth
 *     weapons, Multi Wielding is now changed. Each weapon is displayed
 *     individually, each producing its own attack animation, showing each
 *     weapon type, and applying only that weapon's ATK, Traits, and related
 *     effects. It is no longer a combined effect to display everything at once
 *     like RPG Maker MZ default.
 * *** If an actor has multiple weapon slots but some of them are unequipped,
 *     then the action will treat the attack as a single attack. There will be
 *     no barehanded attack to add on top of it. This is to match RPG Maker
 *     MZ's decision to omit a second animation if the same scenario is
 *     applied.
 * ** New Action Sequence Plugin Commands added by Yanfly
 * *** ANIM: Attack Animation 2+
 * **** Plays the animation associated with the user's 2nd weapon.
 *      Plays nothing if there is no 2nd weapon equipped.
 * ** New Action Sequence Plugin Commands added by Olivia
 * *** WEAPON: Clear Weapon Slot
 * *** WEAPON: Next Weapon Slot
 * *** WEAPON: Set Weapon Slot
 * **** These are Action Sequence Plugin Commands for devs who want finer
 *      control over Dual/Multi Wielding weapons.
 * 
 * Version 1.22: January 15, 2021
 * * Compatibility Update
 * ** Compatibility with "All Skills" Actor Command should now work with the
 *    Skills & States Core hide skill notetags.
 * 
 * Version 1.21: January 8, 2021
 * * Bug Fixes!
 * ** "MOVE: Home Reset" Plugin Command Action Sequence should work properly.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Notetag snuck in by Arisu
 * *** <Auto Action Sequence>
 * **** Used for those who have the "Auto Notetag" Plugin Parameter enabled and
 *      just want to use an automatic Action Sequence instead.
 * ** New Plugin Parameter snuck in by Arisu!
 * *** Plugin Parameters > Action Sequences > Quality of Life > Auto Notetag
 * **** Automatically apply the <Custom Action Sequence> notetag effect to any
 *      item or skill that has a Common Event?
 * **** Any item or skill without a Common Event attached to it will use the
 *      Automatic Action Sequences instead.
 * **** The <Auto Action Sequence> notetag will disable this effect for that
 *      particular skill or item.
 * ** Arisu, you're going to be responsible for any bugs these may cause.
 * *** Bring it!!!!
 * **** And handling any bug report emails that are sent because this was
 *      turned on by accident.
 * ***** Please read the documentation, guys!
 * 
 * Version 1.20: January 1, 2021
 * * Bug Fixes!
 * ** For TPB Active or ATB Active, inputting actors that have received damage
 *    will return back to place after flinching. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Battle Portrait Offset: +x, +y>
 * *** <Battle Portrait Offset X: +x>
 * *** <Battle Portrait Offset Y: +y>
 * **** This is used with the "Portrait" and "Border" Battle Layouts.
 * **** Offsets the X and Y coordinates for the battle portrait.
 * 
 * Version 1.19: December 25, 2020
 * * Bug Fixes!
 * ** Removing a state from a Sideview Enemy during the middle of their a non-
 *    looping motion will no longer reset their motion to neutral.
 *    Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** Action Sequence "PROJECTILE: Icon" now supports code for the "Icon"
 *    parameter. Update made by Yanfly.
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** For TPB Active or ATB Active, inputting actors will no longer step back
 *    after an enemy's action is finished. Fix made by Yanfly and Shiro.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** Action Sequence "BTLOG: Add Text" is updated for the convenience of a new
 *    option to quickly copy the displayed text to the VisuStella MZ Combat Log
 *    if that plugin is installed. Added by Yanfly.
 * 
 * Version 1.17: December 11, 2020
 * * Bug Fixes!
 * ** Common Events in TPB Active that cause forced actions will no longer
 *    cause currently inputting actors that match the forced action battler to
 *    crash the game. Fix made by Yanfly and Shiro.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Action Sequence Impact Action Sequences "Shockwave from Each Target(s)",
 *    "Shockwave from Target(s) Center", and "Zoom Blur at Target(s) Center"
 *    now have "Offset X" and "Offset Y" plugin parameters. Added by Yanfly.
 * ** Action Sequence "MOVE: Move To Target(s)" is now changed so that if the
 *    "Melee Distance" value is set to 0, battlers will no longer stand a half
 *    body distance away. Added by Yanfly.
 * 
 * Version 1.16: December 4, 2020
 * * Bug Fixes!
 * ** Bug fixes made for the RPG Maker MZ base code. If a battler has no
 *    actions, then their action speed will not be Infinity. Fix by Olivia.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Completely replacing the whole party at once will no longer cause the
 *    battle system to crash. Fix made by Olivia.
 * ** Pre-Battle Common Events will no longer cancel out any win/lose branches.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Custom Action Sequences will no longer close the Actor Command Input
 *    window unless absolutely necessary (like for Show Message events) during
 *    Active TPB/ATB. Change made by Arisu.
 * 
 * Version 1.14: November 22, 2020
 * * Feature Update!
 * ** Natural Miss and Evasion motions now have flinch distance.
 *    Added by Yanfly.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Bug Fixes!
 * ** Failsafes added to prevent common events from running if they're empty.
 *    Fix made by Irina.
 * ** Skip Party Command will now work properly with TPB-based battle systems.
 *    Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** In preparation for upcoming VisuStella MZ plugins.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added clarity for the Plugin Parameters for the Common Events settings
 *    found in the mechanics section. The common events are only meant to run
 *    in the map scene and not for the battle scene. Update made by Irina.
 * * Feature Update!
 * ** The Plugin Parameter for Mechanics, Common Events (on Map), Defeat Event
 *    now has updated functionality. If this has a common event attached to it,
 *    then losing to random encounters will no longer send the player to the
 *    Game Over scene, but instead, send the player back to the map scene,
 *    where the Defeat Common Event will run. Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Action Sequence Plugin Command added by Olivia:
 * *** MECH: Custom Damage Formula
 * **** Changes the current action's damage formula to custom.
 *      This will assume the MANUAL damage style.
 * ** New Notetag added by Irina:
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Battleback Scaling Settings
 * **** These settings allow you to adjust how battlebacks scale to the screen
 *      in the game.
 * *** <Battler Sprite Grounded>
 * **** Prevents the enemy from being able to jumping and/or floating due to
 *      Action Sequences but still able to move. Useful for rooted enemies.
 * 
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** Exiting out of the Options menu scene or Party menu scene will no longer
 *    cause party members to reset their starting position. Fix made by Arisu
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** There was a documentation error with <JS Pre-Regenerate> and
 *    <JS Post-Regenerate>. Fix made by Yanfly.
 * *** Before, these were written as <JS Pre-Regenerate Turn> and
 *     <JS Post-Regenerate Turn>. The "Turn" part of the notetag has been
 *     removed in the documentation.
 * * Feature Update!
 * ** Damage sprites on actors are now centered relative to the actor's anchor.
 *    Change made by Yanfly.
 * * New Features!
 * ** New Action Sequence Plugin Command added by Yanfly:
 * *** MECH: Variable Popup
 * **** Causes the unit(s) to display a popup using the data stored inside
 *      a variable.
 * 
 * Version 1.08: October 11, 2020
 * * Bug Fixes!
 * ** Dead party members at the start of battle no longer start offscreen.
 *    Fix made by Arisu.
 * ** Removed party members from battle no longer count as moving battlers.
 *    Fix made by Yanfly.
 * ** Using specific motions should now have the weapons showing and not
 *    showing properly. Fix made by Yanfly.
 * 
 * Version 1.07: October 4, 2020
 * * Bug Fixes!
 * ** Adding and removing actors will now refresh the battle status display.
 *    Fix made by Irina.
 * ** Adding new states that would change the affected battler's state motion
 *    will automatically refresh the battler's motion. Fix made by Irina.
 * ** Boss Collapse animation fixed and will sink into the ground.
 *    Fix made by Irina.
 * ** Failsafes added for certain animation types. Fix made by Yanfly.
 * ** Freeze Motion for thrust, swing, and missile animations will now show the
 *    weapons properly. Fix made by Yanfly.
 * ** The Guard command will no longer display the costs of the Attack command.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Updated help file for newly added plugin parameters.
 * * Feature Updates!
 * ** When using the Change Battleback event command in battle, the game client
 *    will wait until both battlebacks are loaded before changing the both of
 *    them so that the appearance is synched together. Change made by Yanfly.
 * * New Features!
 * ** New plugin parameters added by Irina!
 * *** Plugin Parameters > Actor Battler Settings > Chant Style
 * **** What determines the chant motion? Hit type or skill type?
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Enemy Battler Plugin Parameter "Shadow Visible" should now work again.
 *    Fix made by Irina.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins. Added by Yanfly.
 * * Documentation Update!
 * ** Updated the help file for all the new plugin parameters.
 * * Feature Update!
 * ** Action Sequence "MECH: HP, MP, TP" will now automatically collapse an
 *    enemy if it has been killed by the effect.
 * ** All battle systems for front view will now have damage popups appear
 *    in front of the status window instead of just the Portrait battle layout.
 *    Update made by Yanfly.
 * * New Features!
 * ** New Action Sequence Plugin Commands from Irina!
 * *** MOTION: Clear Freeze Frame
 * *** MOTION: Freeze Motion Frame
 * **** You can freeze a battler's sprite's motion with a specific frame.
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Battle Layout: type> to change the battle layout style used for
 *     specific maps and/or troops.
 * ** New plugin parameters added by Yanfly!
 * *** Plugin Parameters > Battle Layout Settings > Command Window Width
 * **** This plugin parameter lets you adjust the window width for Party and
 *      Actor Command windows in the Default and List Battle Layout styles.
 * *** Plugin Parameters > Enemy Battler Settings > Name: Offset X
 * *** Plugin Parameters > Enemy Battler Settings > Name: Offset Y
 * **** These plugin parameters allow you to offset the position of the enemy
 *      name positions on the screen by a specific amount.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Actors now use their casting or charging animations again during TPB/ATB.
 *    Fix made by Yanfly.
 * ** Defeat requirement for enemies will no longer crash the game if turned on
 *    after creating
 * ** Escaping animation no longer has actors stay in place. Fixed by Yanfly.
 * ** Failsafes added for newly added weapon types that have not been adjusted
 *    in the Database > System 2 tab. Fixed by Irina.
 * ** Shadows now appear under the actor sprites. Fix made by Yanfly.
 * ** Victory during TPB will no longer cancel the victory animations of
 *    actors that will have their turn after. Fixed by Yanfly.
 * * Documentation Update!
 * ** All Anchor Plugin Parameter descriptions now state to use values between
 *    0 and 1 to be safe. Update made by Yanfly.
 * * Feature Update!
 * ** During Active TPB / ATB, canceling out of the actor command window will
 *    go directly into the party window without having to sort through all of
 *    the available active actors.
 * ** Going from the Party Command Window's Fight command will immediately
 *    return back to the actor command window that was canceled from.
 * * New Features!
 * ** Action Sequence Plugin Command "MOVE: Spin/Rotate" has been updated.
 * *** A new parameter has been added: "Revert Angle on Finish"
 * *** Added by Yanfly.
 * ** New plugin parameters have been added to Damage Settings.
 * *** Appear Position: Selects where you want popups to appear relative to the
 *     battler. Head, Center, Base. Added by Yanfly.
 * *** Offset X: Sets how much to offset the sprites by vertically.
 *     Added by Yanfly.
 * *** Offset Y: Sets how much to offset the sprites by horizontally.
 *     Added by Yanfly.
 * ** New plugin parameters have been added to Actor Battler Settings.
 * *** Priority: Active - Place the active actor on top of actor and
 *     enemy sprites. Added by Yanfly.
 * *** Priority: Actors - Prioritize actors over enemies when placing 
 *     sprites on top of each other. Added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Active Battler Sprites now remain on top and won't be hidden behind
 *    other sprites for better visual clarity. Fix made by Arisu.
 * ** Collapsing battlers will now show the dead motion properly. Fix made by
 *    Olivia.
 * ** Dead battlers can no longer be given immortality. Fix made by Olivia.
 * ** Going into the Options menu with no battleback set will no longer set a
 *    battle snapshot.
 * ** HP Gauges for Sideview Enemies are no longer flipped! Fix made by Yanfly.
 * ** Moving a dead battler would no longer reset their animation. Fix made by
 *    Olivia.
 * ** Pre-Battle Common Events now work with events instead of just random
 *    encounters. Fix made by Yanfly.
 * ** Sideview Enemy shadows no longer twitch. Fix made by Irina.
 * * Documentation Updates!
 * ** Added further explanations for Anchor X and Anchor Y plugin parameters.
 *    This is because there's a lot of confusion for users who aren't familiar
 *    with how sprites work. Added by Irina.
 * ** <Magic Reduction: x> notetag updated to say magical damage instead of
 *    physical damage. Fix made by Yanfly.
 * * New Features!
 * ** Additional Action Sequence Plugin Commands have been added in preparation
 *    of upcoming plugins! Additions made by Irina.
 * *** Action Sequences - Angle (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Camera (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Skew (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Zoom (for VisuMZ_3_ActSeqCamera)
 * ** Additional Action Sequence Plugin Commands have been made available now
 *    and added to Battle Core! Additions made by Irina.
 * *** MOVE: Scale/Grow/Shrink
 * *** MOVE: Skew/Distort
 * *** MOVE: Spin/Rotate
 * *** MOVE: Wait For Scale
 * *** MOVE: Wait For Skew
 * *** MOVE: Wait For Spin
 * ** Plugin Parameters Additions. Additions made by Irina.
 * *** Plugin Params > Actor Battler Settings > Offset X
 * *** Plugin Params > Actor Battler Settings > Offset Y
 * *** Plugin Params > Actor Battler Settings > Smooth Image
 * *** Plugin Params > Enemy Battler Settings > Offset X
 * *** Plugin Params > Enemy Battler Settings > Offset Y
 * *** Plugin Params > Enemy Battler Settings > Smooth Image
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Animated Battlers will refresh their motions from the death motion once
 *    they're revived instead of waiting for their next input phase. Fix made
 *    by Yanfly.
 * ** Battle Log speed sometimes went by too fast for certain enabled messages.
 *    Wait timers are now added to them, like state results, buff results, and
 *    debuff results. Fix made by Yanfly.
 * ** Boss Collapse animation now works properly. Fix made by Yanfly.
 * ** Freeze fix for TPB (Wait) if multiple actors get a turn at the same time.
 *    Fix made by Olivia.
 * ** Pressing cancel on a target window after selecting a single skill no
 *    longer causes the status window to twitch.
 * ** Sideview Enemies had a split frame of being visible if they were to start
 *    off hidden in battle. Fix made by Shaz.
 * * Compatibility Update:
 * ** Battle Core's Sprite_Damage.setup() function is now separated fro the
 *    default to allow for better compatibility. Made by Yanfly.
 * * Documentation Update:
 * ** Inserted more information for "Damage Popups" under "Major Changes"
 * * New Features!
 * ** <Magic Penetration: x>, <Magic Penetration: x%> notetags added.
 * ** <Magic Reduction: x>, <Magic Reduction: x%> notetags added.
 * ** <Battle UI Offset: +x, +y>, <Battle UI Offset X: +x>, and
 *    <Battle UI Offset Y: +y> notetags added for adjusting the positions of
 *    HP Gauges and State Icons.
 * *** Notetags added by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** Failsafes added for parsing battle targets. Fix made by Yanfly.
 * ** Immortality is no longer ignored by skills/items with the Normal Attack
 *    state effect. Fix made by Yanfly.
 * ** Miss and Evasion sound effects work again! Fix made by Yanfly.
 * ** Selecting "Escape" from the Actor Command Window will now have the
 *    Inputting Battler show its escape motion. Fix made by Yanfly.
 * ** Wait for Movement now applies to SV Enemies. Fix made by Yanfly.
 * * New Features!
 * ** Plugin Command "ACSET: Finish Action" now has an option to turn off the
 *    Immortality of targets. Feature added by Yanfly.
 * * Optimization Update
 * ** Uses less resources when making checks for Pre-Battle Battle Start events
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Plugin Parameters > Damage Settings > Damage Formats are now fixed.
 *    Fix made by Olivia.
 * ** TPB Battle System with Disable Party Command fixed. Fix made by Olivia.
 * ** States now show in list format if faces are disabled. Fix made by Yanfly.
 * ** The default damage styles were missing the 'v' variable to allow for
 *    variable data input. These are back now. Fix made by Yanfly.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Damage Settings > Style List > the style
 *     you want, and adding "const v = $gameVariables._data;" to JS: Formula
 * * New Notetags Added:
 * ** <Command Show Switch: x> added by Olivia
 * ** <Command Show All Switches: x,x,x> added by Olivia
 * ** <Command Show Any Switches: x,x,x> added by Olivia
 * ** <Command Hide Switch: x> added by Olivia
 * ** <Command Hide All Switches: x,x,x> added by Olivia
 * ** <Command Hide Any Switches: x,x,x> added by Olivia
 * ** <JS Command Visible> added by Olivia
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceStart
 * @text -
 * @desc The following are Action Sequences commands/sets.
 * These Plugin Commands only work in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakSet
 * @text Action Sequence - Action Sets
 * @desc Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_SetupAction
 * @text ACSET: Setup Action Set
 * @desc The generic start to most actions.
 * 
 * @arg DisplayAction:eval
 * @text Display Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: On
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionStart:eval
 * @text Battle Step
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg CastAnimation:eval
 * @text Cast Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_WholeActionSet
 * @text ACSET: All Targets Action Set
 * @desc Affects all targets simultaneously performing the following.
 * 
 * @arg DualWield:eval
 * @text Dual/Multi Wield?
 * @type boolean
 * @on Apply
 * @off Don't
 * @desc Add times struck based on weapon quantity equipped?
 * @default false
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_TargetActionSet
 * @text ACSET: Each Target Action Set
 * @desc Goes through each target one by one to perform the following.
 * 
 * @arg DualWield:eval
 * @text Dual/Multi Wield?
 * @type boolean
 * @on Apply
 * @off Don't
 * @desc Add times struck based on weapon quantity equipped?
 * @default false
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount1:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount2:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed * 2
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_FinishAction
 * @text ACSET: Finish Action
 * @desc The generic ending to most actions.
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForNewLine:eval
 * @text Wait For New Line
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effects
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ClearBattleLog:eval
 * @text Clear Battle Log
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEnd:eval
 * @text Home Reset
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceAngle
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakAngle
 * @text Action Sequences - Angle
 * @desc Allows you to have control over the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_ChangeAngle
 * @text ANGLE: Change Angle
 * @desc Changes the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Angle:eval
 * @text Angle
 * @desc Change the camera angle to this many degrees.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change camera angle.
 * @default 60
 *
 * @arg EasingType:str
 * @text Angle Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForAngle:eval
 * @text Wait For Angle?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for angle changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Angle_Reset
 * @text ANGLE: Reset Angle
 * @desc Reset any angle settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset camera angle.
 * @default 60
 *
 * @arg EasingType:str
 * @text Angle Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForAngle:eval
 * @text Wait For Angle?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for angle changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Angle_WaitForAngle
 * @text ANGLE: Wait For Angle
 * @desc Waits for angle changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceAnimation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakAnimation
 * @text Action Sequences - Animations
 * @desc These Action Sequences are related to the 'Animations' that
 * can be found in the Animations tab of the Database.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ActionAnimation
 * @text ANIM: Action Animation
 * @desc Plays the animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_AttackAnimation
 * @text ANIM: Attack Animation
 * @desc Plays the animation associated with the user's 1st weapon.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_AttackAnimation2
 * @text ANIM: Attack Animation 2+
 * @desc Plays the animation associated with the user's other weapons.
 * Plays nothing if there is no other weapon equipped.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Slot:eval
 * @text Slot
 * @desc Which weapon slot to get this data from?
 * Main-hand weapon is weapon slot 1.
 * @default 2
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_CastAnimation
 * @text ANIM: Cast Animation
 * @desc Plays the cast animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["user"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ChangeBattlePortrait
 * @text ANIM: Change Battle Portrait
 * @desc Changes the battle portrait of the actor (if it's an actor).
 * Can be used outside of battle/action sequences.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to change the portraits for.
 * Valid units can only be actors.
 * @default ["user"]
 * 
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Select the file to change the actor's portrait to.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ShowAnimation
 * @text ANIM: Show Animation
 * @desc Plays the a specific animation on unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg AnimationID:num
 * @text Animation ID
 * @type animation
 * @desc Select which animation to play on unit(s).
 * @default 1
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_WaitForAnimation
 * @text ANIM: Wait For Animation
 * @desc Causes the interpreter to wait for any animation(s) to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceBattleLog
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakBattleLog
 * @text Action Sequences - Battle Log
 * @desc These Action Sequences are related to the Battle Log Window,
 * the window found at the top of the battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_AddText
 * @text BTLOG: Add Text
 * @desc Adds a new line of text into the Battle Log.
 * 
 * @arg Text:str
 * @text Text
 * @desc Add this text into the Battle Log.
 * Text codes allowed.
 * @default Insert text here.
 * 
 * @arg CopyCombatLog:eval
 * @text Copy to Combat Log?
 * @type boolean
 * @on Copy Text
 * @off Don't Copy
 * @desc Copies text to the Combat Log.
 * Requires VisuMZ_4_CombatLog
 * @default true
 *
 * @arg CombatLogIcon:num
 * @text Combat Log Icon
 * @parent CopyCombatLog:eval
 * @desc What icon would you like to bind to this entry?
 * Requires VisuMZ_4_CombatLog
 * @default 87
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Clear
 * @text BTLOG: Clear Battle Log
 * @desc Clears all the text in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_DisplayAction
 * @text BTLOG: Display Action
 * @desc Displays the current action in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PopBaseLine
 * @text BTLOG: Pop Base Line
 * @desc Removes the Battle Log's last added base line and 
 * all text up to its former location.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PushBaseLine
 * @text BTLOG: Push Base Line
 * @desc Adds a new base line to where the Battle Log currently is at.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Refresh
 * @text BTLOG: Refresh Battle Log
 * @desc Refreshes the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_UI
 * @text BTLOG: UI Show/Hide
 * @desc Shows or hides the Battle UI (including the Battle Log).
 * 
 * @arg ShowHide:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides the Battle UI.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForBattleLog
 * @text BTLOG: Wait For Battle Log
 * @desc Causes the interpreter to wait for the Battle Log to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForNewLine
 * @text BTLOG: Wait For New Line
 * @desc Causes the interpreter to wait for a new line in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceCamera
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakCamera
 * @text Action Sequences - Camera
 * @desc Allows you to have control over the camera.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Clamp
 * @text CAMERA: Clamp ON/OFF
 * @desc Turns battle camera clamping on/off.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Setting:eval
 * @text ON/OFF
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Turns camera clamping on/off.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusPoint
 * @text CAMERA: Focus Point
 * @desc Focus the battle camera on a certain point in the screen.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg FocusX:eval
 * @text X Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg FocusY:eval
 * @text Y Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusTarget
 * @text CAMERA: Focus Target(s)
 * @desc Focus the battle camera on certain battler target(s).
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to focus the battle camera on.
 * @default ["user"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Offset
 * @text CAMERA: Offset
 * @desc Offset the battle camera from the focus target.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @desc How much to offset the camera X by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc How much to offset the camera Y by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for offset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Reset
 * @text CAMERA: Reset
 * @desc Reset the battle camera settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg ResetFocus:eval
 * @text Reset Focus?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the focus point?
 * @default true
 * 
 * @arg ResetOffset:eval
 * @text Reset Offset?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the camera offset?
 * @default true
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for reset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_WaitForCamera
 * @text CAMERA: Wait For Camera
 * @desc Waits for camera to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 *
 * @command ActionSequenceSpaceDragonbones
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreaDragonbones
 * @text Action Sequences - Dragonbones
 * @desc These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesMotionAni
 * @text DB: Dragonbones Animation
 * @desc Causes the unit(s) to play a Dragonbones motion animation.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg MotionAni:str
 * @text Motion Animation
 * @desc What is the name of the Dragonbones motion animation you wish to play?
 * @default attack
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesTimeScale
 * @text DB: Dragonbones Time Scale
 * @desc Causes the unit(s) to change their Dragonbones time scale.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg TimeScale:num
 * @text Time Scale
 * @desc Change the value of the Dragonbones time scale to this.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceElements
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakElements
 * @text Action Sequences - Elements
 * @desc These Action Sequences are related to elements.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_AddElements
 * @text ELE: Add Elements
 * @desc Adds element(s) to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to add onto the action.
 * Insert multiple element ID's to add multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_Clear
 * @text ELE: Clear Element Changes
 * @desc Clears all element changes made through Action Sequences.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_ForceElements
 * @text ELE: Force Elements
 * @desc Forces only specific element(s) when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to force in the action.
 * Insert multiple element ID's to force multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_NullElements
 * @text ELE: Null Element
 * @desc Forces no element to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceHorror
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakHorror
 * @text Action Sequences - Horror Effects
 * @desc These Action Sequences are Horror Effects-related.
 * Requires VisuMZ_2_HorrorEffects!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_Clear
 * @text HORROR: Clear All Filters
 * @desc Clear all Horror Effects filters on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove Horror Effects for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_GlitchCreate
 * @text HORROR: Glitch Create
 * @desc Creates the glitch effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_GlitchRemove
 * @text HORROR: Glitch Remove
 * @desc Removes the glitch effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_NoiseCreate
 * @text HORROR: Noise Create
 * @desc Creates the noise effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_NoiseRemove
 * @text HORROR: Noise Remove
 * @desc Removes the noise effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_TVCreate
 * @text HORROR: TV Create
 * @desc Creates the TV effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_TVRemove
 * @text HORROR: TV Remove
 * @desc Removes the TV effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceImpact
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakImpact
 * @text Action Sequences - Impact
 * @desc These Action Sequences are related to creating impact.
 * Requires VisuMZ_3_ActSeqImpact!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ColorBreak
 * @text IMPACT: Color Break
 * @desc Breaks the colors on the screen before reassembling.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Intensity:eval
 * @text Intensity
 * @desc What is the intensity of the color break effect?
 * @default 60
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the color break effect?
 * @default 60
 *
 * @arg EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default OutBack
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionBlurScreen
 * @text IMPACT: Motion Blur Screen
 * @desc Creates a motion blur on the whole screen.
 * Requires VisuMZ_3_ActSeqImpact!
 *
 * @arg Angle:eval
 * @text Angle
 * @desc Determine what angle to make the motion blur at.
 * @default Math.randomInt(360)
 *
 * @arg Rate:eval
 * @text Intensity Rate
 * @desc This determines intensity rate of the motion blur.
 * Use a number between 0 and 1.
 * @default 0.1
 *
 * @arg Duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion blur last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default InOutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionBlurTarget
 * @text IMPACT: Motion Blur Target(s)
 * @desc Creates a motion blur on selected target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create motion blur effects for.
 * @default ["user"]
 *
 * @arg Angle:eval
 * @text Angle
 * @desc Determine what angle to make the motion blur at.
 * @default Math.randomInt(360)
 *
 * @arg Rate:eval
 * @text Intensity Rate
 * @desc This determines intensity rate of the motion blur.
 * Use a number between 0 and 1.
 * @default 0.5
 *
 * @arg Duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion blur last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default InOutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionTrailCreate
 * @text IMPACT: Motion Trail Create
 * @desc Creates a motion trail effect for the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create motion trail effects for.
 * @default ["user"]
 *
 * @arg delay:num
 * @text Delay
 * @type Number
 * @min 1
 * @desc How many frames to delay by when creating a motion trail?
 * The higher the delay, the less after images there are.
 * @default 1
 *
 * @arg duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion trail last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg hue:num
 * @text Hue
 * @type Number
 * @min 0
 * @max 255
 * @desc What do you want to be the hue for the motion trail?
 * @default 0
 *
 * @arg opacityStart:num
 * @text Starting Opacity
 * @type Number
 * @min 0
 * @max 255
 * @desc What starting opacity value do you want for the motion
 * trail? Opacity values decrease over time.
 * @default 200
 *
 * @arg tone:eval
 * @text Tone
 * @desc What tone do you want for the motion trail?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionTrailRemove
 * @text IMPACT: Motion Trail Remove
 * @desc Removes the motion trail effect from the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to clear motion trail effects for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwavePoint
 * @text IMPACT: Shockwave at Point
 * @desc Creates a shockwave at the designated coordinates.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Coordinates
 * 
 * @arg X:eval
 * @text Point: X
 * @parent Coordinates
 * @desc What x coordinate do you want to create a shockwave at?
 * You can use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg Y:eval
 * @text Point: Y
 * @parent Coordinates
 * @desc What y coordinate do you want to create a shockwave at?
 * You can use JavaScript code.
 * @default (Graphics.height - 200) / 2
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwaveEachTargets
 * @text IMPACT: Shockwave from Each Target(s)
 * @desc Creates a shockwave at each of the target(s) location(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a shockwave from.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a shockwave from.
 * @default middle center
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave X point by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave Y point by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwaveCenterTargets
 * @text IMPACT: Shockwave from Target(s) Center
 * @desc Creates a shockwave from the center of the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a shockwave from.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a shockwave from.
 * @default middle center
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave X point by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave Y point by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ZoomBlurPoint
 * @text IMPACT: Zoom Blur at Point
 * @desc Creates a zoom blur at the designated coordinates.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Coordinates
 * 
 * @arg X:eval
 * @text Point: X
 * @parent Coordinates
 * @desc What x coordinate do you want to focus the zoom at?
 * You can use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg Y:eval
 * @text Point: Y
 * @parent Coordinates
 * @desc What y coordinate do you want to focus the zoom at?
 * You can use JavaScript code.
 * @default (Graphics.height - 200) / 2
 * 
 * @arg Strength:eval
 * @text Zoom Strength
 * @desc What is the strength of the zoom effect?
 * Use a number between 0 and 1.
 * @default 0.5
 * 
 * @arg Radius:eval
 * @text Visible Radius
 * @desc How much of a radius should be visible from the center?
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the zoom blur?
 * @default 60
 *
 * @arg EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default OutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ZoomBlurTargetCenter
 * @text IMPACT: Zoom Blur at Target(s) Center
 * @desc Creates a zoom blur at the center of targets.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a zoom blur from.
 * @default ["user"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a zoom blur from.
 * @default middle center
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @parent TargetLocation:str
 * @desc How much to offset the zoom blur X point by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent TargetLocation:str
 * @desc How much to offset the zoom blur Y point by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Strength:eval
 * @text Zoom Strength
 * @desc What is the strength of the zoom effect?
 * Use a number between 0 and 1.
 * @default 0.5
 * 
 * @arg Radius:eval
 * @text Visible Radius
 * @desc How much of a radius should be visible from the center?
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the zoom blur?
 * @default 60
 *
 * @arg EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default OutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMechanics
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMechanics
 * @text Action Sequences - Mechanics
 * @desc These Action Sequences are related to various mechanics
 * related to the battle system.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ActionEffect
 * @text MECH: Action Effect
 * @desc Causes the unit(s) to take damage/healing from action and
 * incurs any changes made such as buffs and states.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddBuffDebuff
 * @text MECH: Add Buff/Debuff
 * @desc Adds buff(s)/debuff(s) to unit(s). 
 * Determine which parameters are affected and their durations.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s) and/or debuff(s).
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to buff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["ATK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to debuff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["DEF"]
 * 
 * @arg Turns:eval
 * @text Turns
 * @desc Number of turns to set the parameter(s) buffs to.
 * You may use JavaScript code.
 * @default 5
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddState
 * @text MECH: Add State
 * @desc Adds state(s) to unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s).
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to add to unit(s).
 * Insert multiple state ID's to add multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AnalyzeWeakness
 * @text MECH: Analyze Weakness
 * @desc Reveal elemental weakness(es) from target(s).
 * Requires VisuMZ_3_WeaknessDisplay!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to reveal elemental weaknesses for.
 * @default ["all targets"]
 * 
 * @arg Reveal:eval
 * @text Reveal
 * @desc How many elemental weaknesses do you wish to reveal?
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ArmorPenetration
 * @text MECH: Armor Penetration
 * @desc Adds an extra layer of defensive penetration/reduction.
 * You may use JavaScript code for any of these.
 *
 * @arg ArmorPenetration
 * @text Armor/Magic Penetration
 * 
 * @arg ArPenRate:eval
 * @text Rate
 * @parent ArmorPenetration
 * @desc Penetrates an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArPenFlat:eval
 * @text Flat
 * @parent ArmorPenetration
 * @desc Penetrates a flat amount of armor by this value.
 * @default 0
 *
 * @arg ArmorReduction
 * @text Armor/Magic Reduction
 * 
 * @arg ArRedRate:eval
 * @text Rate
 * @parent ArmorReduction
 * @desc Reduces an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArRedFlat:eval
 * @text Flat
 * @parent ArmorReduction
 * @desc Reduces a flat amount of armor by this value.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AtbGauge
 * @text MECH: ATB Gauge
 * @desc Alters the ATB/TPB Gauges.
 * Requires VisuMZ_2_BattleSystemATB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the ATB/TPB Gauges for.
 * @default ["all targets"]
 *
 * @arg Charging
 * 
 * @arg ChargeRate:eval
 * @text Charge Rate
 * @parent Charging
 * @desc Changes made to the ATB Gauge if it is currently charging.
 * @default -0.00
 * 
 * @arg Casting
 * 
 * @arg CastRate:eval
 * @text Cast Rate
 * @parent Casting
 * @desc Changes made to the ATB Gauge if it is currently casting.
 * @default -0.00
 * 
 * @arg Interrupt:eval
 * @text Interrupt?
 * @parent Casting
 * @type boolean
 * @on Interrupt
 * @off Don't Interrupt
 * @desc Interrupt the ATB Gauge if it is currently casting?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_BoostPointsChange
 * @text MECH: Boost Points Change
 * @desc Changes Boost Points for target(s).
 * Requires VisuMZ_3_BoostAction!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the Boost Points for.
 * @default ["user"]
 * 
 * @arg BoostPoints:eval
 * @text Alter Boost Points By
 * @desc Alters the unit(s) Boost Points.
 * Positive for gaining points. Negative for losing points.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_BoostPointsStoreData
 * @text MECH: Boost Store Data
 * @desc Stores the number of Boosts used this action inside a variable.
 * Requires VisuMZ_3_BoostAction!
 * 
 * @arg VariableID:num
 * @text Variable ID
 * @type variable
 * @desc Which variable do you want to store the data inside?
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_BreakShieldChange
 * @text MECH: Break Shield Change
 * @desc Changes Break Shields for target(s) if not Break Stunned.
 * Requires VisuMZ_4_BreakShields!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the Break Shields for.
 * @default ["all targets"]
 * 
 * @arg BreakShields:eval
 * @text Alter Break Shields By
 * @desc Alters the unit(s) Break Shields.
 * Positive for gaining shields. Negative for losing shields.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_BreakShieldReset
 * @text MECH: Break Shield Reset
 * @desc Resets Break Shields for target(s) if not Break Stunned.
 * Requires VisuMZ_4_BreakShields!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to reset the Break Shields for.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_BtbGain
 * @text MECH: BTB Brave Points
 * @desc Alters the target(s) Brave Points to an exact value.
 * Requires VisuMZ_2_BattleSystemBTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the ATB/TPB Gauges for.
 * @default ["all targets"]
 * 
 * @arg BravePoints:eval
 * @text Alter Brave Points By
 * @desc Alters the target(s) Brave Points.
 * Positive for gaining BP. Negative for losing BP.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Collapse
 * @text MECH: Collapse
 * @desc Causes the unit(s) to perform its collapse animation
 * if the unit(s) has died.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to process a death collapse.
 * @default ["all targets"]
 * 
 * @arg ForceDeath:eval
 * @text Force Death
 * @type boolean
 * @on On
 * @off Off
 * @desc Force death even if the unit has not reached 0 HP?
 * This will remove immortality.
 * @default false
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effect?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for the collapse effect to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CtbOrder
 * @text MECH: CTB Order
 * @desc Alters the CTB Turn Order.
 * Requires VisuMZ_2_BattleSystemCTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the CTB Turn Order for.
 * @default ["all targets"]
 *
 * @arg ChangeOrderBy:eval
 * @text Change Order By
 * @parent Charging
 * @desc Changes turn order for target(s) by this amount.
 * Positive increases wait. Negative decreases wait.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CtbSpeed
 * @text MECH: CTB Speed
 * @desc Alters the CTB Speed.
 * Requires VisuMZ_2_BattleSystemCTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the CTB Speed for.
 * @default ["all targets"]
 *
 * @arg ChargeRate:eval
 * @text Charge Rate
 * @parent Charging
 * @desc Changes made to the CTB Speed if it is currently charging.
 * @default -0.00
 * 
 * @arg CastRate:eval
 * @text Cast Rate
 * @parent Casting
 * @desc Changes made to the CTB Speed if it is currently casting.
 * @default -0.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CustomDmgFormula
 * @text MECH: Custom Damage Formula
 * @desc Changes the current action's damage formula to custom.
 * This will assume the MANUAL damage style.
 * 
 * @arg Formula:str
 * @text Formula
 * @desc Changes the current action's damage formula to custom.
 * Use 'default' to revert the damage formula.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DamagePopup
 * @text MECH: Damage Popup
 * @desc Causes the unit(s) to display the current state of
 * damage received or healed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a damage popup.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DeathBreak
 * @text MECH: Dead Label Jump
 * @desc If the active battler is dead, jump to a specific label in the common event.
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If the active battler is dead, jump to this specific label in the common event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_FtbAction
 * @text MECH: FTB Action Count
 * @desc Alters the subject team's available Action Count.
 * Requires VisuMZ_2_BattleSystemFTB!
 * 
 * @arg ActionCount:eval
 * @text Action Count
 * @desc Alters the subject team's available Action Count.
 * Positive for gaining actions. Negative for losing actions.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_HpMpTp
 * @text MECH: HP, MP, TP
 * @desc Alters the HP, MP, and TP values for unit(s).
 * Positive values for healing. Negative values for damage.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["user"]
 *
 * @arg HP
 * 
 * @arg HP_Rate:eval
 * @text HP Rate
 * @parent HP
 * @desc Changes made to HP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg HP_Flat:eval
 * @text HP Flat
 * @parent HP
 * @desc Flat changes made to HP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg MP
 * 
 * @arg MP_Rate:eval
 * @text MP Rate
 * @parent MP
 * @desc Changes made to MP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg MP_Flat:eval
 * @text MP Flat
 * @parent MP
 * @desc Flat changes made to MP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 *
 * @arg TP
 * 
 * @arg TP_Rate:eval
 * @text TP Rate
 * @parent TP
 * @desc Changes made to TP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg TP_Flat:eval
 * @text TP Flat
 * @parent TP
 * @desc Flat changes made to TP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg ShowPopup:eval
 * @text Damage Popup?
 * @type boolean
 * @on On
 * @off Off
 * @desc Display a damage popup after?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Immortal
 * @text MECH: Immortal
 * @desc Changes the immortal flag of targets. If immortal flag is
 * removed and a unit would die, collapse that unit.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Alter the immortal flag of these groups. If immortal flag
 * is removed and a unit would die, collapse that unit.
 * @default ["user","all targets"]
 * 
 * @arg Immortal:eval
 * @text Immortal
 * @type boolean
 * @on On
 * @off Off
 * @desc Turn immortal flag for unit(s) on/off?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Multipliers
 * @text MECH: Multipliers
 * @desc Changes the multipliers for the current action.
 * You may use JavaScript code for any of these.
 *
 * @arg CriticalHit
 * @text Critical Hit%
 * 
 * @arg CriticalHitRate:eval
 * @text Rate
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalHitFlat:eval
 * @text Flat
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this flat bonus.
 * @default +0.00
 *
 * @arg CriticalDmg
 * @text Critical Damage
 * 
 * @arg CriticalDmgRate:eval
 * @text Rate
 * @parent CriticalDmg
 * @desc Affects critical damage by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalDmgFlat:eval
 * @text Flat
 * @parent CriticalDmg
 * @desc Affects critical damage by this flat bonus.
 * @default +0.00
 *
 * @arg Damage
 * @text Damage/Healing
 * 
 * @arg DamageRate:eval
 * @text Rate
 * @parent Damage
 * @desc Sets the damage/healing multiplier for current action.
 * @default 1.00
 * 
 * @arg DamageFlat:eval
 * @text Flat
 * @parent Damage
 * @desc Sets the damage/healing bonus for current action.
 * @default +0.00
 *
 * @arg HitRate
 * @text Hit Rate
 * 
 * @arg HitRate:eval
 * @text Rate
 * @parent HitRate
 * @desc Affects chance to connect attack by this multiplier.
 * @default 1.00
 * 
 * @arg HitFlat:eval
 * @text Flat
 * @parent HitRate
 * @desc Affects chance to connect attack by this flat bonus.
 * @default +0.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_OtbOrder
 * @text MECH: OTB Order
 * @desc Alters the OTB Turn Order. Best used with single targets.
 * Requires VisuMZ_2_BattleSystemOTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the OTB Turn Order for.
 * @default ["all targets"]
 *
 * @arg CurrentTurn:eval
 * @text Current Turn By
 * @parent Charging
 * @desc Changes turn order for target(s) by this amount.
 * Positive increases wait. Negative decreases wait.
 * @default +0
 *
 * @arg NextTurn:eval
 * @text Next Turn By
 * @parent Charging
 * @desc Changes turn order for target(s) by this amount.
 * Positive increases wait. Negative decreases wait.
 * @default +1
 *
 * @arg FollowTurn:eval
 * @text Follow Turn By
 * @parent Charging
 * @desc Changes turn order for target(s) by this amount.
 * Positive increases wait. Negative decreases wait.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveBuffDebuff
 * @text MECH: Remove Buff/Debuff
 * @desc Removes buff(s)/debuff(s) from unit(s). 
 * Determine which parameters are removed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have the buff(s) and/or debuff(s) removed.
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which buffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which debuffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveState
 * @text MECH: Remove State
 * @desc Remove state(s) from unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have states removed from.
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to remove from unit(s).
 * Insert multiple state ID's to remove multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbExploit
 * @text MECH: STB Exploit Effect
 * @desc Utilize the STB Exploitation mechanics!
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Exploited:eval
 * @text Target(s) Exploited?
 * @type boolean
 * @on Exploit
 * @off Don't
 * @desc Exploit the below targets?
 * @default true
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to become exploited.
 * @default ["all targets"]
 * 
 * @arg ForceExploited:eval
 * @text Force Exploitation
 * @type boolean
 * @on Force
 * @off Don't
 * @desc Force the exploited status?
 * @default false
 * 
 * @arg Exploiter:eval
 * @text User Exploiter?
 * @type boolean
 * @on Exploit
 * @off Don't
 * @desc Allow the user to become the exploiter?
 * @default true
 * 
 * @arg ForceExploited:eval
 * @text Force Exploitation
 * @type boolean
 * @on Force
 * @off Don't
 * @desc Force the exploiter status?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbExtraAction
 * @text MECH: STB Extra Action
 * @desc Adds an extra action for the currently active battler.
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Actions:eval
 * @text Extra Actions
 * @parent Charging
 * @desc How many extra actions should the active battler gain?
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbRemoveExcessActions
 * @text MECH: STB Remove Excess Actions
 * @desc Removes excess actions from the active battler.
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Actions:eval
 * @text Remove Actions
 * @parent Charging
 * @desc How many actions to remove from the active battler?
 * You may use JavaScript code.
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_SwapWeapon
 * @text MECH: Swap Weapon
 * @desc Causes the unit(s) to swap their weapon for another.
 * Requires VisuMZ_2_WeaponSwapSystem!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to swap weapons for.
 * @default ["user"]
 * 
 * @arg WeaponTypeID:eval
 * @text Weapon Type ID
 * @desc Which weapon type to swap to?
 * This is NOT the weapon's ID. It's the weapon TYPE.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_TextPopup
 * @text MECH: Text Popup
 * @desc Causes the unit(s) to display a text popup.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a text popup.
 * @default ["target"]
 * 
 * @arg Text:str
 * @text Text
 * @desc What text do you wish to display?
 * @default Text
 * 
 * @arg TextColor:str
 * @text Text Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @arg FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @arg FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_VariablePopup
 * @text MECH: Variable Popup
 * @desc Causes the unit(s) to display a popup using the data
 * stored inside a variable.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a text popup.
 * @default ["target"]
 * 
 * @arg Variable:num
 * @text Variable ID
 * @type variable
 * @desc Get data from which variable to display as a popup?
 * @default 1
 * 
 * @arg DigitGrouping:eval
 * @text Digit Grouping
 * @parent Variable:num
 * @type boolean
 * @on Group Digits
 * @off Don't Group
 * @desc Use digit grouping to separate numbers?
 * Requires VisuMZ_0_CoreEngine!
 * @default true
 * 
 * @arg TextColor:str
 * @text Text Color
 * @parent Variable:num
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @arg FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 0, 0, 0]
 * 
 * @arg FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_WaitForEffect
 * @text MECH: Wait For Effect
 * @desc Waits for the effects to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMotion
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMotion
 * @text Action Sequences - Motion
 * @desc These Action Sequences allow you the ability to control
 * the motions of sideview sprites.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_ClearFreezeFrame
 * @text MOTION: Clear Freeze Frame
 * @desc Clears any freeze frames from the unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to clear freeze frames for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_FreezeMotionFrame
 * @text MOTION: Freeze Motion Frame
 * @desc Forces a freeze frame instantly at the selected motion.
 * Automatically clears with a new motion.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to freeze motions for.
 * @default ["user"]
 *
 * @arg MotionType:str
 * @text Motion Type
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Freeze this motion for the unit(s).
 * @default attack
 * 
 * @arg Frame:num
 * @text Frame Index
 * @desc Which frame do you want to freeze the motion on?
 * Frame index values start at 0.
 * @default 2
 *
 * @arg ShowWeapon:eval
 * @text Show Weapon?
 * @type combo
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If using 'attack', 'thrust', 'swing', or 'missile',
 * display the weapon sprite?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_MotionType
 * @text MOTION: Motion Type
 * @desc Causes the unit(s) to play the selected motion.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @arg MotionType:str
 * @text Motion Type
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default attack
 *
 * @arg ShowWeapon:eval
 * @text Show Weapon?
 * @type combo
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If using 'attack', 'thrust', 'swing', or 'missile',
 * display the weapon sprite?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_PerformAction
 * @text MOTION: Perform Action
 * @desc Causes the unit(s) to play the proper motion based
 * on the current action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_RefreshMotion
 * @text MOTION: Refresh Motion
 * @desc Cancels any set motions unit(s) has to do and use
 * their most natural motion at the moment.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to refresh their motion state.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_WaitMotionFrame
 * @text MOTION: Wait By Motion Frame
 * @desc Creates a wait equal to the number of motion frames passing.
 * Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 * @arg MotionFrameWait:num
 * @text Motion Frames to Wait?
 * @type number
 * @min 1
 * @desc Each "frame" is equal to the value found in
 * Plugin Parameters => Actors => Motion Speed
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMovement
 * @text Action Sequences - Movement
 * @desc These Action Sequences allow you the ability to control
 * the sprites of actors and enemies in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_BattleStep
 * @text MOVE: Battle Step
 * @desc Causes the unit(s) to move forward past their home position
 * to prepare for action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceDirection
 * @text MOVE: Face Direction
 * @desc Causes the unit(s) to face forward or backward.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Direction:str
 * @text Direction
 * @type combo
 * @option forward
 * @option backward
 * @option random
 * @desc Select which direction to face.
 * @default forward
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FacePoint
 * @text MOVE: Face Point
 * @desc Causes the unit(s) to face a point on the screen.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Point:str
 * @text Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the point instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceTarget
 * @text MOVE: Face Target(s)
 * @desc Causes the unit(s) to face other targets on the screen.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (facing)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) for the turning unit(s) to face.
 * @default ["current target"]
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the unit(s) instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Float
 * @text MOVE: Float
 * @desc Causes the unit(s) to float above the ground.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make float.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Vertical distance to float upward.
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total float amount.
 * @default 12
 *
 * @arg EasingType:str
 * @text Float Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForFloat:eval
 * @text Wait For Float?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for floating to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_HomeReset
 * @text MOVE: Home Reset
 * @desc Causes the unit(s) to move back to their home position(s)
 * and face back to their original direction(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["alive battlers"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Jump
 * @text MOVE: Jump
 * @desc Causes the unit(s) to jump into the air.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make jump.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Max jump height to go above the ground
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total jump amount.
 * @default 12
 * 
 * @arg WaitForJump:eval
 * @text Wait For Jump?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for jumping to complete before performing next command?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveBy
 * @text MOVE: Move Distance
 * @desc Moves unit(s) by a distance from their current position(s).
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 *
 * @arg DistanceAdjust:str
 * @text Distance Adjustment
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to distance values to determine
 * which direction to move unit(s).
 * @default horz
 * 
 * @arg DistanceX:eval
 * @text Distance: X
 * @parent DistanceAdjust:str
 * @desc Horizontal distance to move.
 * You may use JavaScript code.
 * @default 48
 * 
 * @arg DistanceY:eval
 * @text Distance: Y
 * @parent DistanceAdjust:str
 * @desc Vertical distance to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToPoint
 * @text MOVE: Move To Point
 * @desc Moves unit(s) to a designated point on the screen.
 * Sideview-only! Points based off Graphics.boxWidth/Height.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Destination:str
 * @text Destination Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Destination:str
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToTarget
 * @text MOVE: Move To Target(s)
 * @desc Moves unit(s) to another unit(s) on the battle field.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (Moving)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (Destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move to.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to move to.
 * @default front base
 * 
 * @arg MeleeDistance:eval
 * @text Melee Distance
 * @parent TargetLocation:str
 * @desc The melee distance away from the target location
 * in addition to the battler's width.
 * @default 24
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Targets2:arraystr
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Opacity
 * @text MOVE: Opacity
 * @desc Causes the unit(s) to change opacity.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change opacity.
 * @default ["user"]
 * 
 * @arg Opacity:eval
 * @text Desired Opacity
 * @desc Change to this opacity value.
 * You may use JavaScript code.
 * @default 255
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for opacity change.
 * @default 12
 *
 * @arg EasingType:str
 * @text Opacity Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForOpacity:eval
 * @text Wait For Opacity?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for opacity changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Scale
 * @text MOVE: Scale/Grow/Shrink
 * @desc Causes the unit(s) to scale, grow, or shrink?.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change the scale of.
 * @default ["user"]
 * 
 * @arg ScaleX:eval
 * @text Scale X
 * @desc What target scale value do you want?
 * 1.0 is normal size.
 * @default 1.00
 * 
 * @arg ScaleY:eval
 * @text Scale Y
 * @desc What target scale value do you want?
 * 1.0 is normal size.
 * @default 1.00
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to scale for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Scale Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForScale:eval
 * @text Wait For Scale?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for scaling to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Skew
 * @text MOVE: Skew/Distort
 * @desc Causes the unit(s) to skew.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to skew.
 * @default ["user"]
 * 
 * @arg SkewX:eval
 * @text Skew X
 * @desc X variance to skew?
 * Use small values for the best results.
 * @default 0.00
 * 
 * @arg SkewY:eval
 * @text Skew Y
 * @desc Y variance to skew?
 * Use small values for the best results.
 * @default 0.00
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to skew for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Skew Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Spin
 * @text MOVE: Spin/Rotate
 * @desc Causes the unit(s) to spin.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to spin.
 * @default ["user"]
 * 
 * @arg Angle:eval
 * @text Angle
 * @desc How many degrees to spin?
 * @default 360
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to spin for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Spin Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg RevertAngle:eval
 * @text Revert Angle on Finish
 * @type boolean
 * @on Revert
 * @off Don't
 * @desc Revert angle after spinning?
 * @default true
 * 
 * @arg WaitForSpin:eval
 * @text Wait For Spin?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for spin to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForFloat
 * @text MOVE: Wait For Float
 * @desc Waits for floating to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForJump
 * @text MOVE: Wait For Jump
 * @desc Waits for jumping to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForMovement
 * @text MOVE: Wait For Movement
 * @desc Waits for movement to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForOpacity
 * @text MOVE: Wait For Opacity
 * @desc Waits for opacity changes to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForScale
 * @text MOVE: Wait For Scale
 * @desc Waits for scaling to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForSkew
 * @text MOVE: Wait For Skew
 * @desc Waits for skewing to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForSpin
 * @text MOVE: Wait For Spin
 * @desc Waits for spinning to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceProjectile
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakProjectile
 * @text Action Sequences - Projectiles
 * @desc Create projectiles on the screen and fire them off at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Projectile_Animation
 * @text PROJECTILE: Animation
 * @desc Create an animation projectile and fire it at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * @arg Coordinates
 *
 * @arg Start:struct
 * @text Start Location
 * @parent Coordinates
 * @type struct<ProjectileStart>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"user\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 *
 * @arg Goal:struct
 * @text Goal Location
 * @parent Coordinates
 * @type struct<ProjectileGoal>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"all targets\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 * 
 * @arg Settings
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Settings
 * @type animation
 * @desc Determine which animation to use as a projectile.
 * @default 77
 * 
 * @arg Duration:eval
 * @text Duration
 * @parent Settings
 * @desc Duration for the projectile(s) to travel.
 * @default 20
 * 
 * @arg WaitForProjectile:eval
 * @text Wait For Projectile?
 * @parent Settings
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for projectile(s) to reach their destination before
 * going onto the next command?
 * @default true
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<ProjectileExAni>
 * @desc Add extra settings to the projectile?
 * @default {"AutoAngle:eval":"true","AngleOffset:eval":"+0","Arc:eval":"0","EasingType:str":"Linear","Spin:eval":"+0.0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Projectile_Icon
 * @text PROJECTILE: Icon
 * @desc Create an icon projectile and fire it at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * @arg Coordinates
 *
 * @arg Start:struct
 * @text Start Location
 * @parent Coordinates
 * @type struct<ProjectileStart>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"user\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 *
 * @arg Goal:struct
 * @text Goal Location
 * @parent Coordinates
 * @type struct<ProjectileGoal>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"all targets\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 * 
 * @arg Settings
 *
 * @arg Icon:eval
 * @text Icon Index
 * @parent Settings
 * @desc Determine which icon to use as a projectile.
 * You may use JavaScript code.
 * @default 118
 * 
 * @arg Duration:eval
 * @text Duration
 * @parent Settings
 * @desc Duration for the projectile(s) to travel.
 * @default 20
 * 
 * @arg WaitForProjectile:eval
 * @text Wait For Projectile?
 * @parent Settings
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for projectile(s) to reach their destination before
 * going onto the next command?
 * @default true
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<ProjectileExtra>
 * @desc Add extra settings to the projectile?
 * @default {"AutoAngle:eval":"true","AngleOffset:eval":"+0","Arc:eval":"0","BlendMode:num":"0","EasingType:str":"Linear","Hue:eval":"0","Scale:eval":"1.0","Spin:eval":"+0.0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Projectile_Picture
 * @text PROJECTILE: Picture
 * @desc Create a picture projectile and fire it at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * @arg Coordinates
 *
 * @arg Start:struct
 * @text Start Location
 * @parent Coordinates
 * @type struct<ProjectileStart>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"user\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 *
 * @arg Goal:struct
 * @text Goal Location
 * @parent Coordinates
 * @type struct<ProjectileGoal>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"all targets\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 * 
 * @arg Settings
 *
 * @arg Picture:str
 * @text Picture Filename
 * @parent Settings
 * @type file
 * @dir img/pictures/
 * @desc Determine which picture to use as a projectile.
 * @default Untitled
 * 
 * @arg Duration:eval
 * @text Duration
 * @parent Settings
 * @desc Duration for the projectile(s) to travel.
 * @default 20
 * 
 * @arg WaitForProjectile:eval
 * @text Wait For Projectile?
 * @parent Settings
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for projectile(s) to reach their destination before
 * going onto the next command?
 * @default true
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<ProjectileExtra>
 * @desc Add extra settings to the projectile?
 * @default {"AutoAngle:eval":"true","AngleOffset:eval":"+0","Arc:eval":"0","BlendMode:num":"0","EasingType:str":"Linear","Hue:eval":"0","Scale:eval":"1.0","Spin:eval":"+0.0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceSkew
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakSkew
 * @text Action Sequences - Skew
 * @desc Allows you to have control over the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_ChangeSkew
 * @text SKEW: Change Skew
 * @desc Changes the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg SkewX:eval
 * @text Skew X
 * @desc Change the camera skew X to this value.
 * @default 0
 * 
 * @arg SkewY:eval
 * @text Skew Y
 * @desc Change the camera skew Y to this value.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change camera skew.
 * @default 60
 *
 * @arg EasingType:str
 * @text Skew Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Skew_Reset
 * @text SKEW: Reset Skew
 * @desc Reset any skew settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset camera skew.
 * @default 60
 *
 * @arg EasingType:str
 * @text Skew Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Skew_WaitForSkew
 * @text SKEW: Wait For Skew
 * @desc Waits for skew changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceTarget
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakTarget
 * @text Action Sequences - Target
 * @desc If using a manual target by target Action Sequence,
 * these commands will give you full control over its usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_CurrentIndex
 * @text TARGET: Current Index
 * @desc Sets the current index to this value.
 * Then decide to jump to a label (optional).
 * 
 * @arg Index:eval
 * @text Set Index To
 * @desc Sets current targeting index to this value.
 * 0 is the starting index of a target group.
 * @default 0
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_NextTarget
 * @text TARGET: Next Target
 * @desc Moves index forward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_PrevTarget
 * @text TARGET: Previous Target
 * @desc Moves index backward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_RandTarget
 * @text TARGET: Random Target
 * @desc Sets index randomly to determine new currernt target.
 * Then decide to jump to a label (optional).
 * 
 * @arg ForceRandom:eval
 * @text Force Random?
 * @type boolean
 * @on On
 * @off Off
 * @desc Index cannot be its previous index amount after random.
 * @default false
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceWeapon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakWeapon
 * @text Action Sequences - Weapon
 * @desc Allows for finer control over Dual/Multi Wielding actors.
 * Only works for Actors.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Weapon_ClearActiveWeapon
 * @text WEAPON: Clear Weapon Slot
 * @desc Clears the active weapon slot (making others valid again).
 * Only works for Actors.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @desc Select unit(s) to clear the active weapon slot for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Weapon_NextActiveWeapon
 * @text WEAPON: Next Weapon Slot
 * @desc Goes to next active weapon slot (making others invalid).
 * If next slot is weaponless, don't label jump.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @desc Select unit(s) to change the next active weapon slot for.
 * @default ["user"]
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a weapon is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Weapon_SetActiveWeapon
 * @text WEAPON: Set Weapon Slot
 * @desc Sets the active weapon slot (making others invalid).
 * Only works for Actors.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @desc Select unit(s) to change the active weapon slot for.
 * @default ["user"]
 * 
 * @arg SlotID:eval
 * @text Weapon Slot ID
 * @desc Select weapon slot to make active (making others invalid).
 * Use 0 to clear and normalize. You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceZoom
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakZoom
 * @text Action Sequences - Zoom
 * @desc Allows you to have control over the screen zoom.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Scale
 * @text ZOOM: Change Scale
 * @desc Changes the zoom scale.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Scale:eval
 * @text Scale
 * @desc The zoom scale to change to.
 * @default 1.0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Reset
 * @text ZOOM: Reset Zoom
 * @desc Reset any zoom settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_WaitForZoom
 * @text ZOOM: Wait For Zoom
 * @desc Waits for zoom to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceEnd
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AutoBattle:struct
 * @text Auto Battle Settings
 * @type struct<AutoBattle>
 * @desc Settings pertaining to Auto Battle.
 * @default {"BattleDisplay":"","AutoBattleMsg:str":"Press %1 or %2 to stop Auto Battle","AutoBattleOK:str":"OK","AutoBattleCancel:str":"Cancel","AutoBattleBgType:num":"1","AutoBattleRect:func":"\"const width = Graphics.width;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = 0;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","StartName:str":"Auto Battle Start","StyleName:str":"Auto Battle Style","StyleOFF:str":"Attack","StyleON:str":"Skills"}
 *
 * @param Damage:struct
 * @text Damage Settings
 * @type struct<Damage>
 * @desc Settings pertaining to damage calculations.
 * @default {"Cap":"","EnableDamageCap:eval":"false","DefaultHardCap:num":"9999","EnableSoftCap:eval":"false","DefaultSoftCap:num":"0.80","DefaultSoftScaler:num":"0.1275","Popups":"","PopupDuration:num":"128","NewPopupBottom:eval":"true","PopupPosition:str":"base","PopupOffsetX:num":"0","PopupOffsetY:num":"0","PopupShiftX:num":"8","PopupShiftY:num":"-28","hpDamageFmt:str":"-%1","hpHealingFmt:str":"+%1","mpDamageFmt:str":"-%1 %2","mpHealingFmt:str":"+%1 %2","CriticalColor:eval":"[255, 0, 0, 160]","CriticalDuration:num":"128","Formulas":"","OverallFormulaJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst critical = arguments[1];\\nconst item = this.item();\\n\\n// Get Base Damage\\nconst baseValue = this.evalDamageFormula(target);\\n\\n// Calculate Element Modifiers\\nlet value = baseValue * this.calcElementRate(target);\\n\\n// Calculate Physical and Magical Modifiers\\nif (this.isPhysical()) {\\n    value *= target.pdr;\\n}\\nif (this.isMagical()) {\\n    value *= target.mdr;\\n}\\n\\n// Apply Healing Modifiers\\nif (baseValue < 0) {\\n    value *= target.rec;\\n}\\n\\n// Apply Critical Modifiers\\nif (critical) {\\n    value = this.applyCritical(value);\\n}\\n\\n// Apply Variance and Guard Modifiers\\nvalue = this.applyVariance(value, item.damage.variance);\\nvalue = this.applyGuard(value, target);\\n\\n// Finalize Damage\\nvalue = Math.round(value);\\nreturn value;\"","VarianceFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst variance = arguments[1];\\n\\n// Calculate Variance\\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\\n\\n// Return Damage\\nreturn damage >= 0 ? damage + v : damage - v;\"","GuardFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst target = arguments[1];\\n\\n// Return Damage Early\\nconst note = this.item().note;\\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\\nif (!target.isGuard()) return damage;\\nif (damage < 0) return damage;\\n\\n// Declare Guard Rate\\nlet guardRate = 0.5;\\nguardRate /= target.grd;\\n\\n// Return Damage\\nreturn damage * guardRate;\"","Critical":"","CriticalHitRateJS:func":"\"// Declare Constants\\nconst user = this.subject();\\nconst target = arguments[0];\\n\\n// Create Base Critical Rate\\nlet rate = this.subject().cri * (1 - target.cev);\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<ALWAYS CRITICAL>/i)) {\\n    return 1;\\n}\\nif (note.match(/<SET CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    return Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    rate *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    rate += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL RATE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL RATE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Apply LUK Buffs/Debuffs\\nconst lukStack = this.subject().buff(7);\\nrate *= 2 ** lukStack;\\n\\n// Return Rate\\nreturn rate;\"","CriticalHitMultiplier:func":"\"// Declare Constants\\nconst user = this.subject();\\nlet damage = arguments[0];\\nlet multiplier = 2.0;\\nlet bonusDamage = this.subject().luk * this.subject().cri;\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\\\d+)([%％])>/i)) {\\n    multiplier = Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    multiplier += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\\\d+)([%％])>/i)) {\\n    bonusDamage *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL DAMAGE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL DAMAGE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Return Damage\\nreturn damage * multiplier + bonusDamage;\"","DamageStyles":"","DefaultDamageStyle:str":"Standard","DamageStyleList:arraystruct":"[\"{\\\"Name:str\\\":\\\"Standard\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 0)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"Armor Scaling\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"CT\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\\\\\nvalue = attackStat * 4;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"D4\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nlet stat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n    armor = 0;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n    armor = 0;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"DQ\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Get Primary Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Check for Recovery\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    let value = stat * multiplier * sign;\\\\\\\\n    return isNaN(value) ? 0 : value;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = 0;\\\\\\\\nif (stat < ((2 + armor) / 2)) {\\\\\\\\n    // Plink Damage\\\\\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\\\\\n    value = baseline / 3;\\\\\\\\n} else {\\\\\\\\n    // Normal Damage\\\\\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\\\\\n    value = baseline / 2;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF7\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare base Damage\\\\\\\\nlet baseDamage = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = 6 * (a.mat + level);\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.def + level);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.mdf + level);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Final Damage\\\\\\\\nlet value = baseDamage;\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    value += 22 * power;\\\\\\\\n} else {\\\\\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF8\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Damage\\\\\\\\nlet Value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\\\\\n    value *= power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.mat + power;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\\\\\n    value *= power / 256;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = (power + a.def) * power / 2;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = (power + a.mdf) * power / 2;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF9\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Main Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Base Damage\\\\\\\\nlet baseDamage = power;\\\\\\\\nif (this.isPhysical()) {\\\\\\\\n    baseDamage += stat;\\\\\\\\n}\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    baseDamage -= armor;\\\\\\\\n    baseDamage = Math.max(1, baseDamage);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Bonus Damage\\\\\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\\\\\n\\\\\\\\n// Declare Final Damage\\\\\\\\nlet value = baseDamage * bonusDamage * sign;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF10\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Create Damage Offense Value\\\\\\\\nlet value = power;\\\\\\\\n\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.def + power) / 2);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.mdf + power) / 2);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Damage Defense Value\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\\\\\n    armor = Math.max(armor, 1);\\\\\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\\\\\n} else if (this.isRecover()) {\\\\\\\\n    value *= -1;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MK\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nconst denominator = Math.max(200 + armor, 1);\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.atk / denominator;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.mat / denominator;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.def / 200;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.mdf / 200;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MOBA\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Value\\\\\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\\\\\n\\\\\\\\n// Apply Attacker's Offense Parameter\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value *= a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value *= a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"PKMN\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\"]"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Settings pertaining to various game mechanics.
 * @default {"ActionSpeed":"","AllowRandomSpeed:eval":"false","CalcActionSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\"","BaseTroop":"","BaseTroopIDs:arraynum":"[\"1\"]","CommonEvents":"","BattleStartEvent:num":"0","BattleEndEvent:num":"0","VictoryEvent:num":"0","DefeatEvent:num":"0","EscapeSuccessEvent:num":"0","EscapeFailEvent:num":"0","Escape":"","CalcEscapeRatioJS:func":"\"// Calculate Escape Ratio\\nlet ratio = 0.5;\\nratio *= $gameParty.agility();\\nratio /= $gameTroop.agility();\\n\\n// Return Ratio\\nreturn ratio;\"","CalcEscapeRaiseJS:func":"\"// Calculate Escape Ratio\\nlet value = 0.1;\\nvalue += $gameParty.aliveMembers().length;\\n\\n// Return Value\\nreturn value;\"","BattleJS":"","PreStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleVictoryJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeSuccessJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeFailureJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleDefeatJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","TurnJS":"","PreStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","ActionJS":"","PreStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PreApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\""}
 *
 * @param CmdWindows
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleLayout:struct
 * @text Battle Layout Settings
 * @type struct<BattleLayout>
 * @desc Settings that adjust how the battle layout appears.
 * @default {"Style:str":"default","ListStyle":"","ShowFacesListStyle:eval":"true","CommandWidth:num":"192","XPStyle":"","XPActorCommandLines:num":"4","XPActorDefaultHeight:num":"64","XPSpriteYLocation:str":"name","PotraitStyle":"","ShowPortraits:eval":"true","PortraitScale:num":"0.5","BorderStyle":"","SkillItemBorderCols:num":"1","ShowPortraitsBorderStyle:eval":"true","PortraitScaleBorderStyle:num":"1.25","SkillItemWindows":"","SkillItemMiddleLayout:eval":"false","SkillItemStandardCols:num":"2"}
 *
 * @param BattleLog:struct
 * @text Battle Log Settings
 * @type struct<BattleLog>
 * @desc Settings that adjust how Window_BattleLog behaves.
 * @default {"General":"","BackColor:str":"#000000","MaxLines:num":"10","MessageWait:num":"16","TextAlign:str":"center","BattleLogRectJS:func":"\"const wx = 0;\\nconst wy = 0;\\nconst ww = Graphics.boxWidth;\\nconst wh = this.calcWindowHeight(10, false);\\nreturn new Rectangle(wx, wy, ww, wh);\"","StartTurn":"","StartTurnShow:eval":"true","StartTurnMsg:str":"Turn %1","StartTurnWait:num":"40","DisplayAction":"","ActionCenteredName:eval":"true","ActionSkillMsg1:eval":"false","ActionSkillMsg2:eval":"true","ActionItemMsg:eval":"false","ActionChanges":"","ShowCounter:eval":"true","ShowReflect:eval":"true","ShowSubstitute:eval":"true","ActionResults":"","ShowFailure:eval":"false","ShowCritical:eval":"false","ShowMissEvasion:eval":"false","ShowHpDmg:eval":"false","ShowMpDmg:eval":"false","ShowTpDmg:eval":"false","DisplayStates":"","ShowAddedState:eval":"false","ShowRemovedState:eval":"false","ShowCurrentState:eval":"false","ShowAddedBuff:eval":"false","ShowAddedDebuff:eval":"false","ShowRemovedBuff:eval":"false"}
 *
 * @param Battleback:struct
 * @text Battleback Scaling
 * @type struct<Battleback>
 * @desc Settings that adjust how battlebacks scale.
 * @default {"DefaultStyle:str":"MZ","jsOneForOne:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst scale = 1.0;\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = 0;\\nthis.y = 0;\"","jsScaleToFit:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = this.width / this.bitmap.width;\\nconst ratioY = this.height / this.bitmap.height;\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\"","jsScaleDown:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = Math.min(1, this.width / this.bitmap.width);\\nconst ratioY = Math.min(1, this.height / this.bitmap.height);\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\"","jsScale Up:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = Math.max(1, this.width / this.bitmap.width);\\nconst ratioY = Math.max(1, this.height / this.bitmap.height);\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\""}
 *
 * @param PartyCmd:struct
 * @text Party Command Window
 * @type struct<PartyCmd>
 * @desc Settings that alter the Party Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconFight:num":"76","CommandAddAutoBattle:eval":"true","CmdIconAutoBattle:num":"78","CmdTextAutoBattle:str":"Auto","CommandAddOptions:eval":"true","CmdIconOptions:num":"83","ActiveTpbOptionsMessage:str":"Options Menu queued after action is complete.","CmdIconEscape:num":"82","Access":"","SkipPartyCmd:eval":"true","DisablePartyCmd:eval":"false","HelpWindow":"","HelpFight:str":"Select actions to fight.","HelpAutoBattle:str":"Sets party to Auto Battle mode.","HelpOptions:str":"Opens up the Options Menu.","HelpEscape:str":"Attempt to escape the battle."}
 *
 * @param ActorCmd:struct
 * @text Actor Command Window
 * @type struct<ActorCmd>
 * @desc Settings that alter the Actor Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconItem:num":"176","IconStypeNorm:num":"78","IconStypeMagic:num":"79","BattleCmd":"","BattleCmdList:arraystr":"[\"attack\",\"skills\",\"guard\",\"item\",\"escape\"]","HelpWindow":"","HelpSkillType:str":"Opens up a list of skills under the \\C[16]%1\\C[0] category.","HelpItem:str":"Opens up a list of items that you can use.","HelpEscape:str":"Attempt to escape the battle.","HelpAutoBattle:str":"Automatically choose an action suitable for combat."}
 *
 * @param VisualBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Actor:struct
 * @text Actor Battler Settings
 * @type struct<Actor>
 * @desc Settings that alter various properties for actors.
 * @default {"Flinch":"","FlinchDistanceX:num":"12","FlinchDistanceY:num":"0","FlinchDuration:num":"6","SvBattlers":"","AnchorX:num":"0.5","AnchorY:num":"1.0","ChantStyle:eval":"true","OffsetX:num":"0","OffsetY:num":"0","MotionSpeed:num":"12","PrioritySortActive:eval":"true","PrioritySortActors:eval":"false","Shadow:eval":"true","SmoothImage:eval":"true","HomePosJS:func":"\"// Declare Constants\\nconst sprite = this;\\nconst actor = this._actor;\\nconst index = arguments[0];\\n\\n// Make Calculations\\nlet x = Math.round((Graphics.width / 2) + 192)\\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\\nx += index * 32;\\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\\ny += index * 48;\\n\\n// Home Position Offsets\\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\\\+\\\\-]\\\\d+),[ ]([\\\\+\\\\-]\\\\d+)>/i;\\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\\nx = xOffsets.reduce((r, offset) => r + offset, x);\\ny = yOffsets.reduce((r, offset) => r + offset, y);\\n\\n// Set Home Position\\nthis.setHome(x, y);\""}
 *
 * @param Enemy:struct
 * @text Enemy Battler Settings
 * @type struct<Enemy>
 * @desc Settings that alter various properties for enemies.
 * @default {"Visual":"","AttackAnimation:num":"1","EmergeText:eval":"false","OffsetX:num":"0","OffsetY:num":"0","SmoothImage:eval":"true","SelectWindow":"","FrontViewSelect:eval":"false","SideviewSelect:eval":"true","NameFontSize:num":"22","SvBattlers":"","AllowCollapse:eval":"false","AnchorX:num":"0.5","AnchorY:num":"1.0","MotionIdle:str":"walk","Shadow:eval":"true","Width:num":"64","Height:num":"64","WtypeId:num":"0"}
 *
 * @param HpGauge:struct
 * @text HP Gauge Settings
 * @type struct<HpGauge>
 * @desc Settings that adjust the visual HP Gauge displayed in battle.
 * @default {"Display":"","ShowActorGauge:eval":"false","ShowEnemyGauge:eval":"true","RequiresDefeat:eval":"false","BTestBypass:eval":"true","Settings":"","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"-3","Options":"","AddHpGaugeOption:eval":"true","AdjustRect:eval":"true","Name:str":"Show HP Gauge"}
 *
 * @param ActionSequence:struct
 * @text Action Sequence Settings
 * @type struct<ActionSequence>
 * @desc Settings that adjust how certain Action Sequences work.
 * @default {"AutoSequences":"","AutoMeleeSolo:eval":"true","AutoMeleeAoE:eval":"true","CastAnimations":"","CastCertain:num":"120","CastPhysical:num":"52","CastMagical:num":"51","CounterReflection":"","CounterPlayback:eval":"true","ReflectAnimation:num":"1","ReflectPlayback:eval":"true","Stepping":"","MeleeDistance:num":"24","StepDistanceX:num":"48","StepDistanceY:num":"0","StepDuration:num":"12"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Battle Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoBattle:
 *
 * @param BattleDisplay
 * @text Battle Display
 *
 * @param AutoBattleMsg:str
 * @text Message
 * @parent BattleDisplay
 * @desc Message that's displayed when Auto Battle is on.
 * Text codes allowed. %1 - OK button, %2 - Cancel button
 * @default Press %1 or %2 to stop Auto Battle
 *
 * @param AutoBattleOK:str
 * @text OK Button
 * @parent BattleDisplay
 * @desc Text used to represent the OK button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default OK
 *
 * @param AutoBattleCancel:str
 * @text Cancel Button
 * @parent BattleDisplay
 * @desc Text used to represent the Cancel button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default Cancel
 *
 * @param AutoBattleBgType:num
 * @text Background Type
 * @parent BattleDisplay
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for Auto Battle window.
 * @default 1
 *
 * @param AutoBattleRect:func
 * @text JS: X, Y, W, H
 * @parent BattleDisplay
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.width;\nconst height = this.calcWindowHeight(1, false);\nconst x = 0;\nconst y = (Graphics.height - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the Auto Battle options to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param StartName:str
 * @text Startup Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Start
 *
 * @param StyleName:str
 * @text Style Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Style
 *
 * @param StyleOFF:str
 * @text OFF
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is OFF.
 * @default Attack
 *
 * @param StyleON:str
 * @text ON
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is ON.
 * @default Skills
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Damage:
 *
 * @param Cap
 * @text Damage Cap
 *
 * @param EnableDamageCap:eval
 * @text Enable Damage Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Put a maximum hard damage cap on how far damage can go?
 * This can be broken through the usage of notetags.
 * @default false
 *
 * @param DefaultHardCap:num
 * @text Default Hard Cap
 * @parent EnableDamageCap:eval
 * @type number
 * @min 1
 * @desc The default hard damage cap used before applying damage.
 * @default 9999
 *
 * @param EnableSoftCap:eval
 * @text Enable Soft Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Soft caps ease in the damage values leading up to the 
 * hard damage cap. Requires hard Damage Cap enabled.
 * @default false
 *
 * @param DefaultSoftCap:num
 * @text Base Soft Cap Rate
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.80
 *
 * @param DefaultSoftScaler:num
 * @text Soft Scale Constant
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.1275
 *
 * @param Popups
 *
 * @param PopupDuration:num
 * @text Popup Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a popup stays visible.
 * @default 128
 *
 * @param NewPopupBottom:eval
 * @text Newest Popups Bottom
 * @parent Popups
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Puts the newest popups at the bottom.
 * @default true
 *
 * @param PopupPosition:str
 * @text Appear Position
 * @parent Popups
 * @type select
 * @option Head - At the top of the battler.
 * @value head
 * @option Center - At the center of the battler.
 * @value center
 * @option Base - At the foot of the battler.
 * @value base
 * @desc Selects where you want popups to appear relative to the battler.
 * @default base
 *
 * @param PopupOffsetX:num
 * @text Offset X
 * @parent Popups
 * @desc Sets how much to offset the sprites by horizontally.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param PopupOffsetY:num
 * @text Offset Y
 * @parent Popups
 * @desc Sets how much to offset the sprites by vertically.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param PopupShiftX:num
 * @text Shift X
 * @parent Popups
 * @desc Sets how much to shift the sprites by horizontally.
 * Negative values go left. Positive values go right.
 * @default 8
 *
 * @param PopupShiftY:num
 * @text Shift Y
 * @parent Popups
 * @desc Sets how much to shift the sprites by vertically.
 * Negative values go up. Positive values go down.
 * @default -28
 *
 * @param hpDamageFmt:str
 * @text HP Damage Format
 * @parent Popups
 * @desc Determines HP damage format for popup.
 * %1 - Value, %2 - HP Text
 * @default -%1
 *
 * @param hpHealingFmt:str
 * @text HP Healing Format
 * @parent Popups
 * @desc Determines HP healing format for popup.
 * %1 - Value, %2 - HP Text
 * @default +%1
 *
 * @param mpDamageFmt:str
 * @text MP Damage Format
 * @parent Popups
 * @desc Determines MP damage format for popup.
 * %1 - Value, %2 - MP Text
 * @default -%1 %2
 *
 * @param mpHealingFmt:str
 * @text MP Healing Format
 * @parent Popups
 * @desc Determines MP healing format for popup.
 * %1 - Value, %2 - MP Text
 * @default +%1 %2
 *
 * @param CriticalColor:eval
 * @text Critical Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 *
 * @param CriticalDuration:num
 * @text Critical Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a the flash lasts.
 * @default 128
 *
 * @param Formulas
 *
 * @param OverallFormulaJS:func
 * @text JS: Overall Formula
 * @parent Formulas
 * @type note
 * @desc The overall formula used when calculating damage.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst critical = arguments[1];\nconst item = this.item();\n\n// Get Base Damage\nconst baseValue = this.evalDamageFormula(target);\n\n// Calculate Element Modifiers\nlet value = baseValue * this.calcElementRate(target);\n\n// Calculate Physical and Magical Modifiers\nif (this.isPhysical()) {\n    value *= target.pdr;\n}\nif (this.isMagical()) {\n    value *= target.mdr;\n}\n\n// Apply Healing Modifiers\nif (baseValue < 0) {\n    value *= target.rec;\n}\n\n// Apply Critical Modifiers\nif (critical) {\n    value = this.applyCritical(value);\n}\n\n// Apply Variance and Guard Modifiers\nvalue = this.applyVariance(value, item.damage.variance);\nvalue = this.applyGuard(value, target);\n\n// Finalize Damage\nvalue = Math.round(value);\nreturn value;"
 *
 * @param VarianceFormulaJS:func
 * @text JS: Variance Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage variance.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst variance = arguments[1];\n\n// Calculate Variance\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\n\n// Return Damage\nreturn damage >= 0 ? damage + v : damage - v;"
 *
 * @param GuardFormulaJS:func
 * @text JS: Guard Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage is guarded.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst target = arguments[1];\n\n// Return Damage Early\nconst note = this.item().note;\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\nif (!target.isGuard()) return damage;\nif (damage < 0) return damage;\n\n// Declare Guard Rate\nlet guardRate = 0.5;\nguardRate /= target.grd;\n\n// Return Damage\nreturn damage * guardRate;"
 *
 * @param Critical
 * @text Critical Hits
 *
 * @param CriticalHitRateJS:func
 * @text JS: Rate Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Rates.
 * @default "// Declare Constants\nconst user = this.subject();\nconst target = arguments[0];\n\n// Create Base Critical Rate\nlet rate = this.subject().cri * (1 - target.cev);\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<ALWAYS CRITICAL>/i)) {\n    return 1;\n}\nif (note.match(/<SET CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    return Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    rate *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    rate += Number(RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL RATE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL RATE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Apply LUK Buffs/Debuffs\nconst lukStack = this.subject().buff(7);\nrate *= 2 ** lukStack;\n\n// Return Rate\nreturn rate;"
 *
 * @param CriticalHitMultiplier:func
 * @text JS: Damage Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Damage modification.
 * @default "// Declare Constants\nconst user = this.subject();\nlet damage = arguments[0];\nlet multiplier = 2.0;\nlet bonusDamage = this.subject().luk * this.subject().cri;\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\d+)([%％])>/i)) {\n    multiplier = Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    multiplier += Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\d+)([%％])>/i)) {\n    bonusDamage *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL DAMAGE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL DAMAGE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Return Damage\nreturn damage * multiplier + bonusDamage;"
 *
 * @param DamageStyles
 * @text Damage Styles
 *
 * @param DefaultDamageStyle:str
 * @text Default Style
 * @parent DamageStyles
 * @desc Which Damage Style do you want to set as default?
 * Use 'Manual' to not use any styles at all.
 * @default Standard
 *
 * @param DamageStyleList:arraystruct
 * @text Style List
 * @parent DamageStyles
 * @type struct<DamageStyle>[]
 * @desc A list of the damage styles available.
 * These are used to calculate base damage.
 * @default ["{\"Name:str\":\"Standard\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 0)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"Armor Scaling\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"CT\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\nvalue = attackStat * 4;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"D4\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nlet stat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n    armor = 0;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n    armor = 0;\\\\n}\\\\n\\\\n// Calculate Damage \\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"DQ\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\n}\\\\n\\\\n// Get Primary Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Check for Recovery\\\\nif (this.isRecover()) {\\\\n    let value = stat * multiplier * sign;\\\\n    return isNaN(value) ? 0 : value;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = 0;\\\\nif (stat < ((2 + armor) / 2)) {\\\\n    // Plink Damage\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\n    value = baseline / 3;\\\\n} else {\\\\n    // Normal Damage\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\n    value = baseline / 2;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF7\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare base Damage\\\\nlet baseDamage = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = 6 * (a.mat + level);\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.def + level);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.mdf + level);\\\\n}\\\\n\\\\n// Calculate Final Damage\\\\nlet value = baseDamage;\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isRecover()) {\\\\n    value += 22 * power;\\\\n} else {\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF8\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Damage\\\\nlet Value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\n    value *= power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.mat + power;\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\n    value *= power / 256;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = (power + a.def) * power / 2;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = (power + a.mdf) * power / 2;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF9\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Declare Main Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Declare Base Damage\\\\nlet baseDamage = power;\\\\nif (this.isPhysical()) {\\\\n    baseDamage += stat;\\\\n}\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    baseDamage -= armor;\\\\n    baseDamage = Math.max(1, baseDamage);\\\\n}\\\\n\\\\n// Declare Bonus Damage\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\n\\\\n// Declare Final Damage\\\\nlet value = baseDamage * bonusDamage * sign;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF10\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Create Damage Offense Value\\\\nlet value = power;\\\\n\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = power * ((a.def + power) / 2);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = power * ((a.mdf + power) / 2);\\\\n}\\\\n\\\\n// Apply Damage Defense Value\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\n    armor = Math.max(armor, 1);\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\n} else if (this.isRecover()) {\\\\n    value *= -1;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MK\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nconst denominator = Math.max(200 + armor, 1);\\\\n\\\\n// Calculate Damage \\\\nlet value = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.atk / denominator;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.mat / denominator;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = 200 * a.def / 200;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = 200 * a.mdf / 200;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MOBA\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Value\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\n\\\\n// Apply Attacker's Offense Parameter\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value *= a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value *= a.mdf;\\\\n}\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"PKMN\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}"]
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Formula Style
 * ----------------------------------------------------------------------------
 */
/*~struct~DamageStyle:
 *
 * @param Name:str
 * @text Name
 * @desc Name of this Damage Style.
 * Used for notetags and such.
 * @default Untitled
 *
 * @param Formula:func
 * @text JS: Formula
 * @parent Name:str
 * @type note
 * @desc The base formula for this Damage Style.
 * @default "// Define Constants\nconst item = this.item();\nconst a = this.subject();\nconst b = target;\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\n\n// Create Damage Value\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\n\n// Return Value\nreturn isNaN(value) ? 0 : value;"
 *
 * @param ItemsEquipsCore
 * @text Items & Equips Core
 *
 * @param DamageType
 * @text Damage Label
 * @parent ItemsEquipsCore
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageDisplay:func
 * @text JS: Damage Display
 * @parent ItemsEquipsCore
 * @type note
 * @desc Code used the data displayed for this category.
 * @default "// Define Constants\nconst item = this._item;\nconst formula = item.damage.formula;\nconst a = this._tempActorA;\nconst b = this._tempActorB;\nconst user = a;\nconst target = b;\n\n// Return Value\ntry {\n    const value = Math.max(eval(formula), 0);\n    return '%1%'.format(Math.round(value * 100));\n} catch (e) {\n    if ($gameTemp.isPlaytest()) {\n        console.log('Damage Formula Error for %1'.format(this._item.name));\n    }\n    return '?????';\n}"
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param ActionSpeed
 * @text Action Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent ActionSpeed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param CalcActionSpeedJS:func
 * @text JS: Calculate
 * @parent ActionSpeed
 * @type note
 * @desc Code used to calculate action speed.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param BaseTroop
 * @text Base Troop
 *
 * @param BaseTroopIDs:arraynum
 * @text Base Troop ID's
 * @parent BaseTroop
 * @type troop[]
 * @desc Select the Troop ID(s) to duplicate page events from for all other troops.
 * @default ["1"]
 *
 * @param CommonEvents
 * @text Common Events (on Map)
 *
 * @param BattleStartEvent:num
 * @text Pre-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Common Event to run before each battle on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param BattleEndEvent:num
 * @text Post-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run after each battle on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param VictoryEvent:num
 * @text Victory Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon victory on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param DefeatEvent:num
 * @text Defeat Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon defeat on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeSuccessEvent:num
 * @text Escape Success Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape success on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeFailEvent:num
 * @text Escape Fail Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape failure on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param Escape
 *
 * @param CalcEscapeRatioJS:func
 * @text JS: Calc Escape Ratio
 * @parent Escape
 * @type note
 * @desc Code used to calculate the escape success ratio.
 * @default "// Calculate Escape Ratio\nlet ratio = 0.5;\nratio *= $gameParty.agility();\nratio /= $gameTroop.agility();\n\n// Return Ratio\nreturn ratio;"
 *
 * @param CalcEscapeRaiseJS:func
 * @text JS: Calc Escape Raise
 * @parent Escape
 * @type note
 * @desc Code used to calculate how much the escape success ratio raises upon each failure.
 * @default "// Calculate Escape Ratio\nlet value = 0.1;\nvalue += $gameParty.aliveMembers().length;\n\n// Return Value\nreturn value;"
 *
 * @param Switches
 *
 * @param SwitchCritical:num
 * @text Switch: Critical
 * @parent Switches
 * @type switch
 * @desc Turns switch ON if the action performs a critical hit.
 * Switch reverts to OFF whenever an action starts.
 * @default 0
 *
 * @param SwitchMissEvade:num
 * @text Switch: Miss/Evade
 * @parent Switches
 * @type switch
 * @desc Turns switch ON if the action misses/is evaded.
 * Switch reverts to OFF whenever an action starts.
 * @default 0
 *
 * @param Variables
 *
 * @param VariableDmg:num
 * @text Variable: Damage
 * @parent Variables
 * @type variable
 * @desc Variable records target damage during action.
 * Variable reverts to 0 whenever an action starts.
 * @default 0
 *
 * @param VariableHeal:num
 * @text Variable: Healing
 * @parent Variables
 * @type variable
 * @desc Variable records target healing during action.
 * Variable reverts to 0 whenever an action starts.
 * @default 0
 *
 * @param BattleJS
 * @text JS: Battle-Related
 * 
 * @param PreStartBattleJS:func
 * @text JS: Pre-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartBattleJS:func
 * @text JS: Post-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleVictoryJS:func
 * @text JS: Battle Victory
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processVictory()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeSuccessJS:func
 * @text JS: Escape Success
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeSuccess()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeFailureJS:func
 * @text JS: Escape Failure
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeFailure()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleDefeatJS:func
 * @text JS: Battle Defeat
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processDefeat()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param PreEndBattleJS:func
 * @text JS: Pre-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndBattleJS:func
 * @text JS: Post-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param TurnJS
 * @text JS: Turn-Related
 *
 * @param PreStartTurnJS:func
 * @text JS: Pre-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartTurnJS:func
 * @text JS: Post-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreEndTurnJS:func
 * @text JS: Pre-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndTurnJS:func
 * @text JS: Post-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreRegenerateJS:func
 * @text JS: Pre-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostRegenerateJS:func
 * @text JS: Post-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param ActionJS
 * @text JS: Action-Related
 *
 * @param PreStartActionJS:func
 * @text JS: Pre-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostStartActionJS:func
 * @text JS: Post-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PreApplyJS:func
 * @text JS: Pre-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreDamageJS:func
 * @text JS: Pre-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostDamageJS:func
 * @text JS: Post-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostApplyJS:func
 * @text JS: Post-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreEndActionJS:func
 * @text JS: Pre-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostEndActionJS:func
 * @text JS: Post-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLayout:
 *
 * @param Style:str
 * @text Battle Layout Style
 * @type select
 * @option Default - Shows actor faces in Battle Status.
 * @value default
 * @option List - Lists actors in Battle Status.
 * @value list
 * @option XP - Shows actor battlers in a stretched Battle Status.
 * @value xp
 * @option Portrait - Shows portraits in a stretched Battle Status.
 * @value portrait
 * @option Border - Displays windows around the screen border.
 * @value border
 * @option Sideview Battle UI - Requires VisuMZ_3_SideviewBattleUI
 * @value sideview_ui
 * @desc The style used for the battle layout.
 * @default default
 *
 * @param ListStyle
 * @text List Style
 * @parent Style:str
 *
 * @param ShowFacesListStyle:eval
 * @text Show Faces
 * @parent ListStyle
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows faces in List Style?
 * @default true
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent ListStyle
 * @type number
 * @min 1
 * @desc Determine the window width for the Party and Actor Command
 * Windows. Affects Default and List Battle Layout styles.
 * @default 192
 *
 * @param XPStyle
 * @text XP Style
 * @parent Style:str
 *
 * @param XPActorCommandLines:num
 * @text Command Lines
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Number of action lines in the Actor Command Window for the XP Style.
 * @default 4
 *
 * @param XPActorDefaultHeight:num
 * @text Sprite Height
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Default sprite height used when if the sprite's height has not been determined yet.
 * @default 64
 *
 * @param XPSpriteYLocation:str
 * @text Sprite Base Location
 * @parent XPStyle
 * @type select
 * @option Above Name - Sprite is located above the name.
 * @value name
 * @option Bottom - Sprite is located at the bottom of the window.
 * @value bottom
 * @option Centered - Sprite is centered in the window.
 * @value center
 * @option Top - Sprite is located at the top of the window.
 * @value top
 * @desc Determine where the sprite is located on the Battle Status Window.
 * @default name
 *
 * @param PotraitStyle
 * @text Portrait Style
 * @parent Style:str
 *
 * @param ShowPortraits:eval
 * @text Show Portraits?
 * @parent PotraitStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait instead of a face.
 * @default true
 *
 * @param PortraitScale:num
 * @text Portrait Scaling
 * @parent PotraitStyle
 * @desc If portraits are used, scale them by this much.
 * @default 0.5
 *
 * @param BorderStyle
 * @text Border Style
 * @parent Style:str
 *
 * @param SkillItemBorderCols:num
 * @text Columns
 * @parent BorderStyle
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 1
 *
 * @param ShowPortraitsBorderStyle:eval
 * @text Show Portraits?
 * @parent BorderStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait at the edge of the screen.
 * @default true
 *
 * @param PortraitScaleBorderStyle:num
 * @text Portrait Scaling
 * @parent BorderStyle
 * @desc If portraits are used, scale them by this much.
 * @default 1.0
 *
 * @param SkillItemWindows
 * @text Skill & Item Windows
 *
 * @param SkillItemMiddleLayout:eval
 * @text Middle Layout
 * @parent SkillItemWindows
 * @type boolean
 * @on Middle
 * @off Bottom
 * @desc Shows the Skill & Item Windows in mid-screen?
 * @default false
 *
 * @param SkillItemStandardCols:num
 * @text Columns
 * @parent SkillItemWindows
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 2
 *
 * @param StatusWindow
 * @text Status Window Elements
 *
 * @param StatusWindowName
 * @text Battler Name
 * @parent StatusWindow
 *
 * @param NameOffsetX:num
 * @text Offset: X
 * @parent StatusWindowName
 * @desc Offset this Battle Status Window element's X.
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param NameOffsetY:num
 * @text Offset: Y
 * @parent StatusWindowName
 * @desc Offset this Battle Status Window element's Y.
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param StatusWindowHpGauge
 * @text Gauge 1 (HP)
 * @parent StatusWindow
 *
 * @param HpGaugeOffsetX:num
 * @text Offset: X
 * @parent StatusWindowHpGauge
 * @desc Offset this Battle Status Window element's X.
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param HpGaugeOffsetY:num
 * @text Offset: Y
 * @parent StatusWindowHpGauge
 * @desc Offset this Battle Status Window element's Y.
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param StatusWindowMpGauge
 * @text Gauge 2 (MP)
 * @parent StatusWindow
 *
 * @param MpGaugeOffsetX:num
 * @text Offset: X
 * @parent StatusWindowMpGauge
 * @desc Offset this Battle Status Window element's X.
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param MpGaugeOffsetY:num
 * @text Offset: Y
 * @parent StatusWindowMpGauge
 * @desc Offset this Battle Status Window element's Y.
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param StatusWindowTpGauge
 * @text Gauge 3 (TP)
 * @parent StatusWindow
 *
 * @param TpGaugeOffsetX:num
 * @text Offset: X
 * @parent StatusWindowTpGauge
 * @desc Offset this Battle Status Window element's X.
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param TpGaugeOffsetY:num
 * @text Offset: Y
 * @parent StatusWindowTpGauge
 * @desc Offset this Battle Status Window element's Y.
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param StatusWindowStateIcon
 * @text State Icon
 * @parent StatusWindow
 *
 * @param StateIconOffsetX:num
 * @text Offset: X
 * @parent StatusWindowStateIcon
 * @desc Offset this Battle Status Window element's X.
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param StateIconOffsetY:num
 * @text Offset: Y
 * @parent StatusWindowStateIcon
 * @desc Offset this Battle Status Window element's Y.
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param StatusWindowTpbGauge
 * @text TPB/ATB Gauge
 * @parent StatusWindow
 *
 * @param TpbGaugeOffsetX:num
 * @text Offset: X
 * @parent StatusWindowTpbGauge
 * @desc Offset this Battle Status Window element's X.
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param TpbGaugeOffsetY:num
 * @text Offset: Y
 * @parent StatusWindowTpbGauge
 * @desc Offset this Battle Status Window element's Y.
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param StatusWindowSkin
 * @text Window Skin
 * @parent StatusWindow
 *
 * @param StatusWindowSkinFilename:str
 * @text Filename
 * @parent StatusWindowSkin
 * @type file
 * @dir img/system/
 * @desc Filename used for the Battle Status Window skin.
 * Leave this empty to use the default window skin.
 * @default 
 *
 * @param StatusWindowSkinHide:eval
 * @text Hide Window Skin?
 * @parent StatusWindowSkin
 * @type boolean
 * @on No Window Skin
 * @off Default Skin
 * @desc Show/Hide the window skin for the Battle Status Window?
 * @default false
 *
 * @param StatusWindowSelectBack
 * @text Selectable Background
 * @parent StatusWindow
 *
 * @param StatusWindowSelectableBackHide:eval
 * @text Hide Selectable BG?
 * @parent StatusWindowSelectBack
 * @type boolean
 * @on No Selectable BG
 * @off Default Selectable BG
 * @desc Show/Hide the selectable background box for the Battle Status Window?
 * @default false
 *
 * @param StatusWindowAttachments
 * @text Attachments
 * @parent StatusWindow
 *
 * @param StatusWindowBackAttachment
 * @text Back Attachment
 * @parent StatusWindowAttachments
 *
 * @param StatusWindowAttachmentBack:str
 * @text Filename
 * @parent StatusWindowBackAttachment
 * @type file
 * @dir img/system/
 * @desc Filename used for an image to attach to the back of the
 * Battle Status Window. Leave empty for none.
 * @default 
 *
 * @param StatusWindowAttachmentBackOffsetX:num
 * @text Offset: X
 * @parent StatusWindowBackAttachment
 * @desc Offset this Battle Status Window element's X.
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param StatusWindowAttachmentBackOffsetY:num
 * @text Offset: Y
 * @parent StatusWindowBackAttachment
 * @desc Offset this Battle Status Window element's Y.
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param StatusWindowFrontAttachment
 * @text Front Attachment
 * @parent StatusWindowAttachments
 *
 * @param StatusWindowAttachmentFront:str
 * @text Filename
 * @parent StatusWindowFrontAttachment
 * @type file
 * @dir img/system/
 * @desc Filename used for an image to attach to the front of the
 * Battle Status Window. Leave empty for none.
 * @default 
 *
 * @param StatusWindowAttachmentFrontOffsetX:num
 * @text Offset: X
 * @parent StatusWindowFrontAttachment
 * @desc Offset this Battle Status Window element's X.
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param StatusWindowAttachmentFrontOffsetY:num
 * @text Offset: Y
 * @parent StatusWindowFrontAttachment
 * @desc Offset this Battle Status Window element's Y.
 * Negative goes up. Positive goes down.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLog:
 *
 * @param General
 *
 * @param BackColor:str
 * @text Back Color
 * @parent General
 * @desc Use #rrggbb for a hex color.
 * @default #000000
 *
 * @param MaxLines:num
 * @text Max Lines
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of lines to be displayed.
 * @default 10
 *
 * @param MessageWait:num
 * @text Message Wait
 * @parent General
 * @type number
 * @min 1
 * @desc Number of frames for a usual message wait.
 * @default 16
 *
 * @param TextAlign:str
 * @text Text Align
 * @parent General
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Window_BattleLog.
 * @default center
 *
 * @param BattleLogRectJS:func
 * @text JS: X, Y, W, H
 * @parent General
 * @type note
 * @desc Code used to determine the dimensions for the battle log.
 * @default "const wx = 0;\nconst wy = 0;\nconst ww = Graphics.boxWidth;\nconst wh = this.calcWindowHeight(10, false);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StartTurn
 * @text Start Turn
 *
 * @param StartTurnShow:eval
 * @text Show Start Turn?
 * @parent StartTurn
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display turn changes at the start of the turn?
 * @default false
 *
 * @param StartTurnMsg:str
 * @text Start Turn Message
 * @parent StartTurn
 * @desc Message displayed at turn start.
 * %1 - Turn Count
 * @default Turn %1
 *
 * @param StartTurnWait:num
 * @text Start Turn Wait
 * @parent StartTurn
 * @type number
 * @min 1
 * @desc Number of frames to wait after a turn started.
 * @default 40
 *
 * @param DisplayAction
 * @text Display Action
 *
 * @param ActionCenteredName:eval
 * @text Show Centered Action?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display a centered text of the action name?
 * @default true
 *
 * @param ActionSkillMsg1:eval
 * @text Show Skill Message 1?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 1st skill message?
 * @default false
 *
 * @param ActionSkillMsg2:eval
 * @text Show Skill Message 2?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 2nd skill message?
 * @default true
 *
 * @param ActionItemMsg:eval
 * @text Show Item Message?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the item use message?
 * @default false
 *
 * @param ActionChanges
 * @text Action Changes
 *
 * @param ShowCounter:eval
 * @text Show Counter?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display counter text?
 * @default true
 *
 * @param ShowReflect:eval
 * @text Show Reflect?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display magic reflection text?
 * @default true
 *
 * @param ShowSubstitute:eval
 * @text Show Substitute?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display substitute text?
 * @default true
 *
 * @param ActionResults
 * @text Action Results
 *
 * @param ShowFailure:eval
 * @text Show No Effect?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display no effect text?
 * @default false
 *
 * @param ShowCritical:eval
 * @text Show Critical?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display critical text?
 * @default false
 *
 * @param ShowMissEvasion:eval
 * @text Show Miss/Evasion?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display miss/evasion text?
 * @default false
 *
 * @param ShowHpDmg:eval
 * @text Show HP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display HP Damage text?
 * @default false
 *
 * @param ShowMpDmg:eval
 * @text Show MP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display MP Damage text?
 * @default false
 *
 * @param ShowTpDmg:eval
 * @text Show TP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display TP Damage text?
 * @default false
 *
 * @param DisplayStates
 * @text Display States
 *
 * @param ShowAddedState:eval
 * @text Show Added States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added states text?
 * @default false
 *
 * @param ShowRemovedState:eval
 * @text Show Removed States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed states text?
 * @default false
 *
 * @param ShowCurrentState:eval
 * @text Show Current States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the currently affected state text?
 * @default false
 *
 * @param ShowAddedBuff:eval
 * @text Show Added Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added buffs text?
 * @default false
 *
 * @param ShowAddedDebuff:eval
 * @text Show Added Debuffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added debuffs text?
 * @default false
 *
 * @param ShowRemovedBuff:eval
 * @text Show Removed Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed de/buffs text?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Battleback Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Battleback:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option MZ (MZ's default style)
 * @value MZ
 * @option 1:1 (No Scaling)
 * @value 1:1
 * @option Scale To Fit (Scale to screen size)
 * @value ScaleToFit
 * @option Scale Down (Scale Downward if Larger than Screen)
 * @value ScaleDown
 * @option Scale Up (Scale Upward if Smaller than Screen)
 * @value ScaleUp
 * @desc The default scaling style used for battlebacks.
 * @default MZ
 *
 * @param jsOneForOne:func
 * @text JS: 1:1
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst scale = 1.0;\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = 0;\nthis.y = 0;"
 *
 * @param jsScaleToFit:func
 * @text JS: Scale To Fit
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = this.width / this.bitmap.width;\nconst ratioY = this.height / this.bitmap.height;\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 * @param jsScaleDown:func
 * @text JS: Scale Down
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = Math.min(1, this.width / this.bitmap.width);\nconst ratioY = Math.min(1, this.height / this.bitmap.height);\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 * @param jsScale Up:func
 * @text JS: Scale Up
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = Math.max(1, this.width / this.bitmap.width);\nconst ratioY = Math.max(1, this.height / this.bitmap.height);\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 */
/* ----------------------------------------------------------------------------
 * Party Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PartyCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Party Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Party Command Window.
 * @default left
 *
 * @param CmdIconFight:num
 * @text Fight Icon
 * @parent Cmd
 * @desc The icon used for the Fight command.
 * @default 76
 *
 * @param CommandAddAutoBattle:eval
 * @text Add Auto Battle?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Auto Battle" command to the Command Window?
 * @default true
 *
 * @param CmdIconAutoBattle:num
 * @text Auto Battle Icon
 * @parent CommandAddAutoBattle:eval
 * @desc The icon used for the Auto Battle command.
 * @default 78
 *
 * @param CmdTextAutoBattle:str
 * @text Auto Battle Text
 * @parent CommandAddAutoBattle:eval
 * @desc The text used for the Auto Battle command.
 * @default Auto
 *
 * @param CommandAddOptions:eval
 * @text Add Options?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Options" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptions:num
 * @text Options Icon
 * @parent CommandAddOptions:eval
 * @desc The icon used for the Options command.
 * @default 83
 *
 * @param ActiveTpbOptionsMessage:str
 * @text Active TPB Message
 * @parent CommandAddOptions:eval
 * @desc Message that will be displayed when selecting options during the middle of an action.
 * @default Options Menu queued after action is complete.
 *
 * @param CmdIconEscape:num
 * @text Escape Icon
 * @parent Cmd
 * @desc The icon used for the Escape command.
 * @default 82
 *
 * @param Access
 *
 * @param SkipPartyCmd:eval
 * @text Skip Party Command
 * @parent Access
 * @type boolean
 * @on Skip
 * @off Don't
 * @desc DTB: Skip Party Command selection on turn start.
 * TPB: Skip Party Command selection at battle start.
 * @default true
 *
 * @param DisablePartyCmd:eval
 * @text Disable Party Command
 * @parent Access
 * @type boolean
 * @on Disable
 * @off Don't
 * @desc Disable the Party Command Window entirely?
 * @default false
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpFight:str
 * @text Fight
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Select actions to fight.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Sets party to Auto Battle mode.
 *
 * @param HelpOptions:str
 * @text Options
 * @parent HelpWindow
 * @desc Text displayed when selecting the Options command.
 * @default Opens up the Options Menu.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActorCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Actor Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Actor Command Window.
 * @default left
 *
 * @param CmdIconItem:num
 * @text Item Icon
 * @parent Cmd
 * @desc The icon used for the Item command.
 * @default 176
 *
 * @param IconStypeNorm:num
 * @text Normal SType Icon
 * @parent Cmd
 * @desc Icon used for normal skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Magic SType Icon
 * @parent Cmd
 * @desc Icon used for magic skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 79
 *
 * @param BattleCmd
 * @text Battle Commands
 *
 * @param BattleCmdList:arraystr
 * @text Command List
 * @parent BattleCmd
 * @type combo[]
 * @option attack
 * @option skills
 * @option guard
 * @option item
 * @option party
 * @option escape
 * @option auto battle
 * @option stypes
 * @option stype: x
 * @option stype: name
 * @option all skills
 * @option skill: x
 * @option skill: name
 * @option combat log
 * @option weapon swap
 * @desc List of battle commands that appear by default
 * if the <Battle Commands> notetag isn't present.
 * @default ["attack","skills","guard","party","item"]
 *
 * @param ShowCosts:eval
 * @text Show Command Costs
 * @parent BattleCmd
 * @type boolean
 * @on Show Costs
 * @off Hide Costs
 * @desc If a battle command has a resource cost, show it?
 * @default true
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpSkillType:str
 * @text Skill Types
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Opens up a list of skills under the \C[16]%1\C[0] category.
 *
 * @param HelpItem:str
 * @text Items
 * @parent HelpWindow
 * @desc Text displayed when selecting the item command.
 * @default Opens up a list of items that you can use.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Automatically choose an action suitable for combat.
 *
 * @param HelpParty:str
 * @text Party
 * @parent HelpWindow
 * @desc Text displayed when selecting the Party command.
 * Requires 
 * @default Automatically choose an action suitable for combat.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Actor:
 *
 * @param Flinch
 *
 * @param FlinchDistanceX:num
 * @text Flinch Distance X
 * @parent Flinch
 * @desc The normal X distance when flinching.
 * @default 12
 *
 * @param FlinchDistanceY:num
 * @text Flinch Distance Y
 * @parent Flinch
 * @desc The normal Y distance when flinching.
 * @default 0
 *
 * @param FlinchDuration:num
 * @text Flinch Duration
 * @parent Flinch
 * @desc The number of frames for a flinch to complete.
 * @default 6
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param ChantStyle:eval
 * @text Chant Style
 * @parent SvBattlers
 * @type boolean
 * @on Magical Hit Type
 * @off Magical Skill Type
 * @desc What determines the chant motion?
 * Hit type or skill type?
 * @default true
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent SvBattlers
 * @desc Offsets X position where actor is positioned.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent SvBattlers
 * @desc Offsets Y position where actor is positioned.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param MotionSpeed:num
 * @text Motion Speed
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc The number of frames in between each motion.
 * @default 12
 *
 * @param PrioritySortActive:eval
 * @text Priority: Active
 * @parent SvBattlers
 * @type boolean
 * @on Active Actor over All Else
 * @off Active Actor is Sorted Normally
 * @desc Place the active actor on top of actor and enemy sprites.
 * @default false
 *
 * @param PrioritySortActors:eval
 * @text Priority: Actors
 * @parent SvBattlers
 * @type boolean
 * @on Actors over Enemies
 * @off Sort by Y Position
 * @desc Prioritize actors over enemies when placing sprites on top
 * of each other.
 * @default true
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param SmoothImage:eval
 * @text Smooth Image
 * @parent SvBattlers
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Smooth out the battler images or pixelate them?
 * @default false
 *
 * @param HomePosJS:func
 * @text JS: Home Position
 * @parent SvBattlers
 * @type note
 * @desc Code used to calculate the home position of actors.
 * @default "// Declare Constants\nconst sprite = this;\nconst actor = this._actor;\nconst index = arguments[0];\n\n// Make Calculations\nlet x = Math.round((Graphics.width / 2) + 192)\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\nx += index * 32;\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\ny += index * 48;\n\n// Home Position Offsets\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\+\\-]\\d+),[ ]([\\+\\-]\\d+)>/i;\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\nx = xOffsets.reduce((r, offset) => r + offset, x);\ny = yOffsets.reduce((r, offset) => r + offset, y);\n\n// Set Home Position\nthis.setHome(x, y);"
 *
 */
/* ----------------------------------------------------------------------------
 * Enemy Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Enemy:
 *
 * @param Visual
 *
 * @param AttackAnimation:num
 * @text Attack Animation
 * @parent Visual
 * @type animation
 * @desc Default attack animation used for enemies.
 * Use <Attack Animation: x> for custom animations.
 * @default 1
 *
 * @param EmergeText:eval
 * @text Emerge Text
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the 'Enemy emerges!' text at the start of battle.
 * @default false
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent Visual
 * @desc Offsets X position where enemy is positioned.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent Visual
 * @desc Offsets Y position where enemy is positioned.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param SmoothImage:eval
 * @text Smooth Image
 * @parent Visual
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Smooth out the battler images or pixelate them?
 * @default true
 *
 * @param SelectWindow
 * @text Select Window
 *
 * @param LastSelected:eval
 * @text Any: Last Selected
 * @parent SelectWindow
 * @type boolean
 * @on Last Selected
 * @off FV/SV Priority
 * @desc Prioritize last selected enemy over front view or sideview settings?
 * @default true
 *
 * @param FrontViewSelect:eval
 * @text FV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using frontview, auto select the enemy furthest right.
 * @default false
 *
 * @param SideviewSelect:eval
 * @text SV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using sideview, auto select the enemy furthest right.
 * @default true
 * 
 * @param Name
 *
 * @param NameFontSize:num
 * @text Name: Font Size
 * @parent Name
 * @desc Font size used for enemy names.
 * @default 22
 *
 * @param NameOffsetX:num
 * @text Name: Offset X
 * @parent Name
 * @desc Offset the enemy name's X position by this much.
 * Negative goes left. Positive goes right.
 * @default 0
 *
 * @param NameOffsetY:num
 * @text Name: Offset Y
 * @parent Name
 * @desc Offset the enemy name's Y position by this much.
 * Negative goes up. Positive goes down.
 * @default 0
 *
 * @param NameAlwaysVisible:eval
 * @text Name: Always Visible
 * @parent Name
 * @type boolean
 * @on Always Visible
 * @off Hide when Unselected
 * @desc Determines if the enemy name will always be visible.
 * @default false
 *
 * @param NameAttachStateIcon:eval
 * @text Name: Attach States
 * @parent Name
 * @type boolean
 * @on Attach
 * @off Normal Position
 * @desc Attach the enemy's state icon to the enemy name?
 * @default false
 *
 * @param AttachStateOffsetX:num
 * @text Attach: Offset X
 * @parent NameAttachStateIcon:eval
 * @desc How much to offset the attached icon's X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param AttachStateOffsetY:num
 * @text Attach: Offset Y
 * @parent NameAttachStateIcon:eval
 * @desc How much to offset the attached icon's Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param NameLegacy:eval
 * @text Legacy Option
 * @parent Name
 * @type boolean
 * @on Legacy Version
 * @off New Version (Sprite)
 * @desc Use the legacy version (window) or new version (sprite).
 * WARNING: Legacy version is no longer supported for bugs.
 * @default false
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AllowCollapse:eval
 * @text Allow Collapse
 * @parent SvBattlers
 * @type boolean
 * @on Allow
 * @off Don't
 * @desc Causes defeated enemies with SV Battler graphics
 * to "fade away" when defeated?
 * @default false
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param MotionIdle:str
 * @text Motion: Idle
 * @parent SvBattlers
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Sets default idle animation used by Sideview Battlers.
 * @default walk
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param Width:num
 * @text Size: Width
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default width for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param Height:num
 * @text Size: Height
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default height for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param WtypeId:num
 * @text Weapon Type
 * @parent SvBattlers
 * @type number
 * @min 0
 * @desc Sets default weapon type used by Sideview Battlers.
 * Use 0 for Bare Hands.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * HP Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~HpGauge:
 *
 * @param Display
 * @text Show Gauges For
 *
 * @param ShowActorGauge:eval
 * @text Actors
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the actor sprites' heads?
 * Requires SV Actors to be visible.
 * @default true
 *
 * @param ShowEnemyGauge:eval
 * @text Enemies
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the enemy sprites' heads?
 * Can be bypassed with <Hide HP Gauge> notetag.
 * @default true
 *
 * @param RequiresDefeat:eval
 * @text Requires Defeat?
 * @parent ShowEnemyGauge:eval
 * @type boolean
 * @on Require Defeat First
 * @off No Requirement
 * @desc Requires defeating the enemy once to show HP Gauge?
 * Can be bypassed with <Show HP Gauge> notetag.
 * @default true
 *
 * @param BTestBypass:eval
 * @text Battle Test Bypass?
 * @parent RequiresDefeat:eval
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass the defeat requirement in battle test?
 * @default true
 *
 * @param Settings
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent Settings
 * @desc How large/small do you want the HP Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's Y by?
 * @default -3
 *
 * @param Options
 * @text Options
 *
 * @param AddHpGaugeOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show HP Gauge' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show HP Gauge
 *
 */
/* ----------------------------------------------------------------------------
 * Action Sequence Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActionSequence:
 *
 * @param AutoSequences
 * @text Automatic Sequences
 *
 * @param AutoMeleeSolo:eval
 * @text Melee Single Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, single target actions?
 * @default true
 *
 * @param AutoMeleeAoE:eval
 * @text Melee Multi Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, multi-target actions?
 * @default true
 *
 * @param QoL
 * @text Quality of Life
 *
 * @param AutoNotetag:eval
 * @text Auto Notetag
 * @parent QoL
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically apply the <Custom Action Sequence> notetag
 * effect to any item or skill that has a Common Event?
 * @default false
 *
 * @param CastAnimations
 * @text Cast Animations
 *
 * @param CastCertain:num
 * @text Certain Hit
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Certain Hit skills.
 * @default 120
 *
 * @param CastPhysical:num
 * @text Physical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Physical skills.
 * @default 52
 *
 * @param CastMagical:num
 * @text Magical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Magical skills.
 * @default 51
 *
 * @param CounterReflection
 * @text Counter/Reflect
 *
 * @param CounterPlayback:eval
 * @text Counter Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param ReflectAnimation:num
 * @text Reflect Animation
 * @parent CounterReflection
 * @type animation
 * @desc Animation played when an action is reflected.
 * @default 1
 *
 * @param ReflectPlayback:eval
 * @text Reflect Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param Stepping
 *
 * @param MeleeDistance:num
 * @text Melee Distance
 * @parent Stepping
 * @desc Minimum distance in pixels for Movement Action Sequences.
 * @default 24
 *
 * @param StepDistanceX:num
 * @text Step Distance X
 * @parent Stepping
 * @desc The normal X distance when stepping forward.
 * @default 48
 *
 * @param StepDistanceY:num
 * @text Step Distance Y
 * @parent Stepping
 * @desc The normal Y distance when stepping forward.
 * @default 0
 *
 * @param StepDuration:num
 * @text Step Duration
 * @parent Stepping
 * @desc The number of frames for a stepping action to complete.
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Start Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileStart:
 * 
 * @param Type:str
 * @text Type
 * @type select
 * @option Target - Start from battler target(s)
 * @value target
 * @option Point - Start from a point on the screen
 * @value point
 * @desc Select where the projectile should start from.
 * @default target
 * 
 * @param Targets:arraystr
 * @text Target(s)
 * @parent Type:str
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to start the projectile from.
 * @default ["user"]
 * 
 * @param TargetCenter:eval
 * @text Centralize
 * @parent Targets:arraystr
 * @type boolean
 * @on Center Projectile
 * @off Create Each
 * @desc Create one projectile at the center of the targets?
 * Or create a projectile for each target?
 * @default false
 * 
 * @param PointX:eval
 * @text Point X
 * @parent Type:str
 * @desc Insert the X coordinate to start the projectile at.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @param PointY:eval
 * @text Point Y
 * @parent Type:str
 * @desc Insert the Y coordinate to start the projectile at.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @param OffsetX:eval
 * @text Offset X
 * @desc Insert how many pixels to offset the X coordinate by.
 * You may use JavaScript code.
 * @default +0
 * 
 * @param OffsetY:eval
 * @text Offset Y
 * @desc Insert how many pixels to offset the Y coordinate by.
 * You may use JavaScript code.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Goal Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileGoal:
 * 
 * @param Type:str
 * @text Type
 * @type select
 * @option Target - Goal is battler target(s)
 * @value target
 * @option Point - Goal is a point on the screen
 * @value point
 * @desc Select where the projectile should go to.
 * @default target
 * 
 * @param Targets:arraystr
 * @text Target(s)
 * @parent Type:str
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) for projectile to go to.
 * @default ["all targets"]
 * 
 * @param TargetCenter:eval
 * @text Centralize
 * @parent Targets:arraystr
 * @type boolean
 * @on Center Projectile
 * @off Create Each
 * @desc Set goal in the center of targets?
 * Or create a projectile to go to each target?
 * @default false
 * 
 * @param PointX:eval
 * @text Point X
 * @parent Type:str
 * @desc Insert the X coordinate to send the projectile to.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @param PointY:eval
 * @text Point Y
 * @parent Type:str
 * @desc Insert the Y coordinate to send the projectile to.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @param OffsetX:eval
 * @text Offset X
 * @desc Insert how many pixels to offset the X coordinate by.
 * You may use JavaScript code.
 * @default +0
 * 
 * @param OffsetY:eval
 * @text Offset Y
 * @desc Insert how many pixels to offset the Y coordinate by.
 * You may use JavaScript code.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Extra Animation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileExAni:
 * 
 * @param AutoAngle:eval
 * @text Auto Angle?
 * @parent Settings
 * @type boolean
 * @on Automatically Angle
 * @off Normal
 * @desc Automatically angle the projectile to tilt the direction it's moving?
 * @default true
 * 
 * @param AngleOffset:eval
 * @text Angle Offset
 * @desc Alter the projectile's tilt by this many degrees.
 * @default +0
 * 
 * @param Arc:eval
 * @text Arc Peak
 * @parent Settings
 * @desc This is the height of the project's trajectory arc
 * in pixels.
 * @default 0
 *
 * @param EasingType:str
 * @text Easing
 * @parent Settings
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type to apply to the projectile's trajectory.
 * @default Linear
 * 
 * @param Spin:eval
 * @text Spin Speed
 * @parent Settings
 * @desc Determine how much angle the projectile spins per frame.
 * Does not work well with "Auto Angle".
 * @default +0.0
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Extra Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileExtra:
 * 
 * @param AutoAngle:eval
 * @text Auto Angle?
 * @parent Settings
 * @type boolean
 * @on Automatically Angle
 * @off Normal
 * @desc Automatically angle the projectile to tilt the direction it's moving?
 * @default true
 * 
 * @param AngleOffset:eval
 * @text Angle Offset
 * @desc Alter the projectile's tilt by this many degrees.
 * @default +0
 * 
 * @param Arc:eval
 * @text Arc Peak
 * @parent Settings
 * @desc This is the height of the project's trajectory arc
 * in pixels.
 * @default 0
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the projectile?
 * @default 0
 *
 * @param EasingType:str
 * @text Easing
 * @parent Settings
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type to apply to the projectile's trajectory.
 * @default Linear
 * 
 * @param Hue:eval
 * @text Hue
 * @parent Settings
 * @desc Adjust the hue of the projectile.
 * Insert a number between 0 and 360.
 * @default 0
 * 
 * @param Scale:eval
 * @text Scale
 * @parent Settings
 * @desc Adjust the size scaling of the projectile.
 * Use decimals for exact control.
 * @default 1.0
 * 
 * @param Spin:eval
 * @text Spin Speed
 * @parent Settings
 * @desc Determine how much angle the projectile spins per frame.
 * Does not work well with "Auto Angle".
 * @default +0.0
 *
 */
//=============================================================================

const _0x25b1=['dead','ShowAddedState','StepDistanceY','selectPreviousCommand','JS\x20%1START\x20TURN','Pre','forceEscapeSprite','Spriteset_Battle_createLowerLayer','Window_BattleStatus_drawItemImage','Sprite_Enemy_updateBossCollapse','Game_Map_battleback1Name','autoBattleStyle','_lastPluginCommandInterpreter','ActSeq_Movement_Jump','preemptive','resizeWindowBorderStyle','performReflection','setupTextPopup','alive\x20enemies','Sprite_Enemy_loadBitmap','inBattle','PrioritySortActive','_multipliers','_statusWindow','drawBackgroundRect','_back1Sprite','isGrowing','_growDuration','changeAtbChargeTime','bind','isBorderStylePortraitShown','criticalHitRate','Scene_Map_initialize','EscapeSuccess','Window_BattleLog_performReflection','Game_Enemy_setup','extraHeight','_flipScaleX','BattleVictoryJS','setBattleCameraPoint','Window_BattleLog_performCounter','isAppeared','Scene_Map_initializeAfter','gaugeLineHeight','gainTp','ceil','processBorderActor','trim','wait','focus','ATTACK','CommandAddAutoBattle','noise','StatusWindowAttachmentBackOffsetY','Destination','_shadowScale','_lines','performCollapse','result','fontSize','Window_BattleLog_performSubstitute','EscapeFailureJS','maxCommands','thrust','applyGlobalCommonEventNotetags','setBattleCameraTargets','createCommandNameWindow','isAutoBattleCommandEnabled','length','BattleManager_onEscapeFailure','isMagicSkill','addChild','clearDamagePopup','getAttackMotion','_spriteset','WaitForAnimation','gradientFillRect','Window_BattleLog_clear','setActiveWeaponSlot','alive\x20battlers','chantStyle','clearActiveWeaponSet','ActionSequence','VisuMZ_2_BattleSystemBTB','forceWeaponAnimation','customDamageFormula','Scene_Battle_stop','mainFontSize','startEnemySelection','waitForEffect','clear','MotionAni','motionType','PostApply%1JS','addPartyCommand','fight','isSceneBattle','_tempActor','getSkillTypes','animationId','registerDefeatedEnemy','Width','TPB','_targetSkewX','Amp','isEscapeCommandEnabled','performFlinch','ArRedRate','AGI','Game_Interpreter_terminate','front\x20center','PRE-','CriticalHitRate','_jumpHeight','Sprite_Enemy_setBattler','uiInputPosition','sortEnemies','name','motionSpeed','commandNameWindowCenter','Scene_Battle_terminate','Armor-%1-%2','alive\x20opponents\x20not\x20target','SkipPartyCmd','_regionBattleback2','alive\x20enemies\x20not\x20target','action','CmdTextAlign','mainSpriteScaleY','AnchorX','hpDamage','_lastEnemy','_actorCommandWindow','_tpbSceneChangeCacheActor','DualWield','_speed','commandNameWindowDrawBackground','SvBattlerMass-%1-%2','isActing','user','addFightCommand','applyForcedGameTroopSettingsBattleCore','origin','FocusY','revertTpbCachedActor','ActSeq_Projectile_Icon','processAnimationRequests','actorCommandCancelTPB','getSimilarSTypes','weatherPower','PrioritySortActors','DamageType%1','_cache','_currentAngle','refreshMotion','ShowHide','setImmortal','_skewX','loadPicture','TP_Rate','displayEvasion','ActSeq_Mechanics_AddBuffDebuff','CopyCombatLog','_backAttachmentSprite','StatusWindowAttachmentBackOffsetX','createBattleField','process_VisuMZ_BattleCore_Notetags','_armorPenetration','PreDamageAsUserJS','Game_Enemy_transform','battleSys','SmoothImage','active','prepareCustomActionSequence','drawItemStatusListStyle','regenerateAllBattleCore','NameOffsetY','addedDebuffs','updateScale','JS\x20ESCAPE\x20SUCCESS','_autoBattleWindow','isSceneChanging','setCustomDamageFormula','occasion','_createClientArea','svAnchorX','_pattern','HelpItem','JS\x20%1REGENERATE','partyCommandWindowRectXPStyle','_callSceneOptions','surprise','statusWindowRect','addCommand','changeBattlebacks','Game_Action_itemEffectAddAttackState','getWtypeIdWithName','ActSeq_Set_TargetActionSet','ActSeq_Camera_Clamp','mpDamage','round','Sprite_Actor_updateShadow','refreshCursor','mmp','VisuMZ_1_ElementStatusCore','animationNextDelay','startJump','Targets','setup','auto','startActorCommandSelection','battleLayoutStyle','motionIdle','windowAreaHeight','alive\x20friends\x20not\x20target','WaitCount','maxTp','BattleManager_isTpbMainPhase','itemLineRect','requestMotionRefresh','ConvertActionSequenceTarget','Window_PartyCommand_initialize','isMVAnimation','height','prev\x20target','VisuMZ_2_WeaponSwapSystem','hasSvBattler','ActSeq_BattleLog_AddText','abnormal','DamageRate','canMove','ConvertParams','getDualWieldTimes','stepForward','STYPES','_svBattlerSprite','loadBattleback1','Formula','command119','isQueueOptionsMenu','onActorOk','Game_Map_battleback2Name','drawItemBackground','loadBitmap','svBattlerData','ActiveTpbOptionsMessage','commandFight','makeActionOrders','ParseStateNotetags','_back2Sprite','adjustFlippedBattlefield','updateEffectContainers','ActSeq_Motion_PerformAction','Game_Battler_clearMotion','drawItemImageXPStyle','ActSeq_Animation_ChangeBattlePortrait','ActionSkillMsg2','addItemCommand','Window_BattleLog_performActionStart','BattleManager_selectNextCommand','inputtingAction','MANUAL','stypeId','ShowCritical','drawSingleSkillCost','_opacityEasing','_escapeRatio','cancelActorInput','setActorHome','isSpinning','portrait','setActionState','backColor','scope','setBattler','<CENTER>%1','refreshActorPortrait','clearRect','applyImmortal','isHidden','isCertainHit','status','NameFontSize','Victory','setupFont','ActionCenteredName','battleCommands','getBattlePortraitFilename','activate','process_VisuMZ_BattleCore_DamageStyles','formula','ActSeq_Camera_Offset','ActSeq_Movement_Opacity','ARRAYJSON','createEnemies','_floatHeight','updatePhase','1:1','ActSeq_Animation_ShowAnimation','useDigitGrouping','StatusWindowAttachmentFront','isAnimationPlaying','attackMotions','smooth','_opacityWholeDuration','EnableSoftCap','_targetGrowY','compatibilityVisible','performCastAnimation','updateForceAction','Sprite_Battler_startMove','Game_Battler_performActionStart','isTeamBased','displayAddedStates','isSkewing','PostDamageAsTargetJS','ActSeq_Mechanics_BoostPointsChange','_isBattlerFlipped','createEnemyNames','isInputting','_helpWindow','getColor','pop','playCancel','setHue','playReflection','VariableID','isTickBased','worldTransform','isGuardWaiting','Parse_Notetags_Targets','ActSeq_Element_NullElements','swapEnemyIDs','initMembersBattleCore','Scene_Battle_updateBattleProcess','isDead','HpGaugeOffsetX','arPenFlat','rowSpacing','PreStartBattleJS','CalcActionSpeedJS','loadSvEnemy','endBattle','itemEffectAddAttackState','Window_BattleLog_performDamage','mainSprite','partyCommandWindowRectBorderStyle','updateGrow','ActSeq_DB_DragonbonesTimeScale','_windowLayer','26LLPBUc','BattleLayout','deathStateId','recoverAll','param','canUse','addState','FUNC','_targets','BattleManager_startTurn','_motion','svBattlerName','adjustPosition_ScaleDown','onAngleEnd','Game_BattlerBase_refresh','_actions','GuardFormulaJS','subject','ActSeq_Movement_Skew','command357','_subject','actionBattleCoreJS','_updateCursorArea','Sprite_Battler_update','moveBattlerDistance','Scene_Battle_helpWindowRect','isAnimationShownOnBattlePortrait','ActSeq_Skew_Reset','applyResultSwitches','_requestRefresh','apply','performMiss','process_VisuMZ_BattleCore_jsFunctions','onSkewEnd','displayReflection','optDisplayTp','autoSelect','Sprite_Battleback_adjustPosition','CoreEngine','applyHardDamageCap','Window_BattleLog_displayCurrentState','isLearnedSkill','deadMembers','applyArmorModifiers','1079YcHPVw','createSeparateDamagePopups','1254587ZeDNke','guardSkillId','applyEasing','setupIconTextPopup','_borderPortraitTargetX','ActSeq_Impact_MotionBlurTarget','isMeleeSingleTargetAction','join','addShowHpGaugeCommand','createPartyCommandWindow','isOkEnabled','Parse_Notetags_TraitObjects','indexOf','filterArea','isBattleCoreTargetScope','putActiveBattlerOnTop','battleGrow','Window_BattleLog_performEvasion','SwitchCritical','damageContainer','WaitForSpin','_duration','ActSeq_Impact_ShockwavePoint','repeatTargets','startGrow','showNormalAnimation','custom','Scene_Options_maxCommands','criticalHitFlat','VisuMZ_3_ActSeqCamera','updateHpGaugePosition','updateFrame','Game_BattlerBase_isStateResist','setBattlerBattleCore','createDistortionSprite','getSkillIdWithName','PreEndBattleJS','isJumping','isAutoBattleCommandAdded','processEscape','updateActors','getDamageStyle','atbInterrupt','Sprite_Battler_damageOffsetY','_dimmerSprite','_shake','Game_BattlerBase_die','setupRgbSplitImpactFilter','_growEasing','updateShadowScale','isDeathStateAffected','drawTextEx','remove','commandStyle','isGuard','isBattlerFlipped','AUTO\x20BATTLE','AnimationID','Scene_Battle_createAllWindows','_enemyNameContainer','States','VisuMZ_3_ActSeqProjectiles','text\x20target','-%1\x20MP','ARRAYSTR','Sprite_Actor_updateBitmap','ActSeq_Mechanics_HpMpTp','duration','commandName','addGeneralOptions','7TrJjAe','clearActiveWeaponSlot','ActSeq_Impact_ColorBreak','isCharging','setupBattleback','ElementStatusCore','ActionSkillMsg1','growBattler','drawItemImagePortraitStyle','_targetSkewY','VisuMZ_2_BattleSystemATB','isBattleRefreshRequested','ActSeq_Target_CurrentIndex','battleUIOffsetY','statusWindowRectDefaultStyle','Scene_Boot_onDatabaseLoaded','mpDamageFmt','_active','ActSeq_Weapon_ClearActiveWeapon','show','startFloat','_battleCoreBattleStartEvent','createShadowSprite','refreshStatusWindow','ActSeq_Movement_WaitForSkew','RevertAngle','placeActorName','updatePadding','actorCommandWindowRect','contentsOpacity','updateStateIconSprite','AS\x20USER','setHorrorEffectSettings','BoostPoints','ActSeq_BattleLog_UI','Game_Action_clear','Scene_Battle_updateStatusWindowPosition','_createCursorArea','ShowMissEvasion','TpbGaugeOffsetY','_itemWindow','charged','ActorCmd','ActSeq_Mechanics_BtbGain','svBattlerAnchorX','ActSeq_Mechanics_SwapWeapon','_preBattleCommonEvent','_baseY','Window_BattleEnemy_initialize','filter','ActSeq_Horror_TVCreate','partyCommandWindowRectDefaultStyle','okButtonText','createWeather','WaitForMovement','BattleManager_startBattle','Enemy-%1-%2','top','_dragonbonesSpriteContainer','centerFrontViewSprite','MDF','members','_frontAttachmentSprite','currentAction','Window_BattleLog_popBaseLine','close','_freezeMotionData','Window_Options_addGeneralOptions','_linkedSprite','makeTargetSelectionMoreVisible','canGuard','PostApplyJS','isActionSelectionValid','applyGuard','_enemy','animationBaseDelay','getHardDamageCap','VariableDmg','battleCoreTpbMainPhase','_forcing','turnCount','move','Immortal','StyleName','isItemCommandEnabled','LastSelected','Sprite_Actor_setActorHome','_homeY','floatBattler','_opacityDuration','updateMain','prototype','Sprite_Actor_createStateSprite','setupCriticalEffect','HelpAutoBattle','isPhysical','PreEndTurnJS','drawText','SkillItemMiddleLayout','ShowHpDmg','switchToWeaponType','onEncounterBattleCore','172835CIAhnu','removeState','ApplyImmortal','drawIcon','needsSelectionBattleCore','ConfigManager_makeData','updateAttachedSprites','ActSeq_Animation_WaitForAnimation','autoMeleeMultiTargetActionSet','BattleManager_processVictory','updateWaitMode','createActorCommandWindow','_commandNameWindow','PopupShiftX','getItemDamageAmountLabelOriginal','ShowCosts','ARRAYSTRUCT','hide','updateInterpreter','NameLegacy','ActSeq_BattleLog_PushBaseLine','isForAll','Skills','processForcedAction','Linear','_battleCoreAddedElements','createDigits','PreApply%1JS','_damagePopupArray','hpAffected','isCustomActionSequence','turnOrderChangeOTB','_skewEasing','GUARD','Window_BattleLog_popupDamage','displaySubstitute','default','Style','dead\x20enemies','isTpb','reserveCommonEvent','startMove','popupDamage','isMeleeMultiTargetAction','updateStateSprite','revealNewWeaknesses','Scene_Battle_selectPreviousCommand','_lineHeight','VisuMZ_2_DragonbonesUnion','isRightInputMode','addNewState','AdjustRect','ForceExploiter','_skewWholeDuration','itemWindowRect','width','setMoveEasingType','createBattleUIOffsetX','ActSeq_Angle_WaitForAngle','isOnCurrentMap','HpGaugeOffsetY','effects','svShadow','escape','AutoMeleeAoE','StatusWindowAttachmentFrontOffsetY','startWeaponAnimation','setupHpGaugeSprite','buffAdd','isCancelled','addAttackCommand','helpAreaBottom','makeEscapeRatio','CommandVisible','visible','AutoNotetag','MpGaugeOffsetX','_branch','_inputting','battleback2Name','PostEndActionJS','Game_Action_makeTargets','commandOptions','onEncounter','skillItemWindowRectMiddle','isAnyoneSpinning','battleJump','CastPhysical','ActSeq_Movement_WaitForOpacity','prepareBorderActor','nextActiveWeaponSlot','current\x20target','Game_BattlerBase_eraseState','addGuardCommand','traitObjects','displayType','clamp','PreStartTurnJS','basicGaugesY','onDisabledPartyCommandSelection','endAction','version','JumpToLabel','criticalDmgFlat','_commonEventIDs','actionEffect','callNextMethod','angleDuration','NUM','damageOffsetY','updateJump','Frame','autoMeleeSingleTargetActionSet','addSingleSkillCommands','ActionAnimation','ShowEnemyGauge','battleback1Name','HelpSkillType','setText','isChanting','Window_BattleLog_performMagicEvasion','onEscapeFailure','_jumpWholeDuration','EscapeSuccessJS','findTargetSprite','setupBattleCoreData','stepFlinch','ShowFailure','ActSeq_BattleLog_Refresh','VisuMZ_3_BoostAction','JS\x20%1START\x20BATTLE','onAllActionsEnd','TP_Flat','getDefeatedEnemies','aliveMembers','cameraClamp','Scene_Battle_start','%1EndTurnJS','DefaultSoftScaler','textSizeEx','actorId','StyleOFF','ActionItemMsg','_weaponSprite','loop','drawItemStyleIconText','Angle','lineHeight','QoL','Sprite_Enemy_updateCollapse','_flashColor','isCommandEnabled','VisuMZ_3_SideviewBattleUI','displayMiss','requestAnimation','ParseArmorNotetags','damage','Intensity','performActionStart','ResetFocus','setLastPluginCommandInterpreter','_stateSprite','initVisibility','TpGaugeOffsetX','_motionCount','retreat','battleDisplayText','AnchorY','_wtypeIDs','performActionEnd','Game_BattlerBase_canAttack','battleCommandName','applyGlobal','_baseLineStack','EscapeFail','Game_Battler_clearDamagePopup','stateMotionIndex','finishActorInput','BaseTroopIDs','usePremadeActionSequence','registerCommand','canAddSkillCommand','statusTextAutoBattleStyle','_weaponImageId','jump','%1Event','XPActorCommandLines','onTurnEnd','ActSeq_Movement_MoveToTarget','_defeatedEnemies','updateBattlebackBitmap2','164623qPbRwF','checkAutoCustomActionSequenceNotetagEffect','isSpriteVisible','onEscapeSuccess','SvMotionIdleMass-%1-%2','drawItemStatus','Weapon-%1-%2','PreStartActionJS','skillTypes','dying','ActSeq_Mechanics_OtbOrder','AutoBattleMsg','Game_Actor_equips','BravePoints','isMoving','regenerateAll','arRedFlat','numTargets','LUK','addChildToBack','processPostBattleCommonEvents','Slot','forceMotion','SwitchMissEvade','createHelpWindowBattleCore','notFocusValid','ActSeq_Movement_MoveToPoint','boxWidth','CriticalHitFlat','toUpperCase','_regionBattleback1','_phase','createActorCommandWindowBattleCore','evade','_checkOn','isDamagePopupRequested','SideviewSelect','addCombatLogCommand','index','createInnerPortrait','timeScale','waitCount','PostStartTurnJS','createDamageContainer','startBattle','ActionStart','BattleStartEvent','alive\x20enemies\x20not\x20user','ParseWeaponNotetags','Game_Battler_performMiss','commandStyleCheck','clearResult','return\x200','StepDuration','HomePosJS','_allTargets','createHpGaugeSprite','pages','Game_BattlerBase_addNewState','Actions','weaponTypes','freezeFrame','Game_BattlerBase_initMembers','setBattleAngle','HP_Rate','_updateClientArea','ShowPortraits','padding','removeStatesAuto','ActSeq_Camera_FocusPoint','_endBattle','placeStateIcon','bitmapHeight','isFlipped','isForFriendBattleCore','_tempBattler','displayStartMessages','_totalValue','blockWidth','_jumpMaxHeight','uiMenuStyle','StartTurnWait','Scene_Battle_skillWindowRect','dataId','code','iconWidth','slices','head','addWeaponSwapCommand','slice','Game_Battler_onTurnEnd','animationShouldMirror','_list','clearMotion','setupMotionBlurImpactFilter','battleMove','BattleDefeatJS','SvWeaponSolo-%1-%2','okTargetSelectionVisibility','open','process_VisuMZ_BattleCore_BaseTroops','Game_Action_applyGlobal','TpbGaugeOffsetX','forceSelect','updateAngleCalculations','autoSelectLastSelected','adjustPosition_ScaleUp','attackAnimationId2','collapse','battleAngle','createUIContainer','getAttackWeaponAnimationId','die','push','STRUCT','setActiveWeaponSet','Scene_Battle_startActorCommandSelection','_targetFloatHeight','_targetIndex','GroupDigits','_canLose','Window_BattleLog_displayMiss','criticalDmgRate','destroy','createCommandVisibleJS','missle','isShownOnBattlePortrait','_createEffectsContainer','MP_Flat','cancelButtonText','Sprite_Enemy_createStateIconSprite','addTextToCombatLog','OffsetX','alive\x20battlers\x20not\x20user','SvBattlerSolo-%1-%2','StateIconOffsetX','WaitForOpacity','+%1','addDamageSprite','VarianceFormulaJS','updateEventMain','_uiContainer','canUseItemCommand','isSkillItemWindowsMiddle','some','WaitForProjectile','maxCols','WaitForSkew','VisuMZ_2_HorrorEffects','AutoBattleCancel','log','buffRemove','battleFloat','ShowTpDmg','_targetAngle','executeDamage','enemy','_enemies','updateAttachmentSprites','ActSeq_Mechanics_ArmorPenetration','ScaleToFit','arRedRate','_cursorSprite','_growX','CheckSkillCommandShowSwitches','isBusy','ActSeq_Impact_ZoomBlurPoint','waitForMovement','updateBattleProcess','SvMotionIdleSolo-%1-%2','_item','right','updateShadowPosition','drain','reverse','_battleCoreBattleResumeAfter','isStateResist','changeTurnOrderByCTB','AutoMeleeSolo','Wave','isTriggered','performRecovery','showAnimation','Rate','getBattlePortrait','toString','isSideButtonLayout','Window_BattleLog_performAction','9357QMUHPP','skillItemWindowRectBorderStyle','AutoBattle','CriticalHitMultiplier','damageOffsetX','createBattleFieldBattleCore','helpWindowRectBorderStyle','call','ActionCount','WEAPON\x20SWAP','_angleRevertOnFinish','moveToStartPosition','6pGYBNB','createBattleUIOffsetY','ActSeq_DB_DragonbonesMotionAni','BattleManager_cancelActorInput','removeHorrorEffect','_animationSprites','_createCursorSprite','_animation','_enemyWindow','Game_Battler_performEvasion','updateWeather','battleMembers','addSingleSkillCommand','border','skill','loadSvActor','drawItemImage','_interpreter','ActSeq_Mechanics_VariablePopup','popBaseLine','jumpBattler','isDying','filters','getNextSubjectFromPool','SkillsStatesCore','_waitMode','Shadow','destroyDamageSprite','_targetGrowX','createEffectActionSet','flashColor','performMoveToPoint','message2','Mechanics','onEnemyCancel','ActSeq_Zoom_WaitForZoom','mainSpriteHeight','isFrameVisible','setHelpWindowItem','makeActionList','setWaitMode','processRefresh','messageSpeed','waitForFloat','refresh','Turns','MotionSpeed','ShowAddedBuff','preparePartyRefresh','skillWindowRect','_partyCommandWindow','ActSeq_ChangeAngle','isPartyCommandWindowDisabled','_battleLayoutStyle','isNonSubmenuCancel','checkShowHideBattleNotetags','contents','autoBattleUseSkills','removeActor','Text','partyCommandWindowRect','Scene_ItemBase_applyItem','displayChangedBuffs','isBreakStunned','CastAnimation','AutoBattleOK','isAnyoneJumping','_jumpDuration','spell','_battleCoreForcedElements','Scene_Battle_createActorCommandWindow','EnableDamageCap','battleStatusWindowAnimationContainer','Sprite_Actor_initMembers','displayRemovedStates','options','onGrowEnd','cancel','_text','getAttackMotionSlot','textWidth','setupActionSet','ALL\x20SKILLS','createStateSprite','extraPositionX','iconHeight','JS\x20BATTLE\x20DEFEAT','battleSpin','JS\x20%1END\x20BATTLE','all\x20targets','commandNameWindowDrawText','makeBattleCommand','CmdIconFight','spriteId','selectNextCommand','_hpGaugeSprite','itemCri','Game_Battler_makeSpeed','Sprite_Battler_setHome','isOptionsCommandAdded','Sprite_Actor_moveToStartPosition','loadBattleback2','ActSeq_ChangeSkew','sleep','Scene_Battle_onEnemyCancel','list','createAttachedSprites','PopupDuration','isBattleSys','placeTimeGauge','performDamage','JS\x20%1DAMAGE\x20%2','isAttack','addAutoBattleCommand','autoBattleAtStart','traitSet','wtypeId','WaitForCamera','ShowReflect','displayMpDamage','isAlwaysVisible','Game_Battler_onBattleStart','waitForNewLine','damageRate','898yDGLBI','setBattleZoom','split','floor','addText','updateShadowVisibility','isImmortal','Scene_Battle_commandFight','ActSeq_Motion_RefreshMotion','StatusWindowAttachmentBack','JS\x20ESCAPE\x20FAILURE','item','includes','battleUIOffsetX','updateBorderStyle','isVisualHpGaugeDisplayed','ActSeq_Mechanics_RemoveState','currentValue','Window_SkillList_maxCols','_effectDuration','onFloatEnd','isWaiting','battleSkew','ActSeq_Motion_MotionType','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','makeActions','AddHpGaugeOption','isAnyoneSkewing','flashDuration','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20obj\x20=\x20arguments[2];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[3]\x20||\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20value;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Constants\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20action\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this\x20:\x20user.currentAction();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20attacker\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20defender\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20healer\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20receiver\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20actor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20currentClass\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20weapon\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20armor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20enemy\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20obj;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Create\x20Compatibility\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20origin\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(Imported.VisuMZ_1_SkillsStatesCore\x20&&\x20$dataStates.includes(obj))\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20origin\x20=\x20target.getStateOrigin(obj.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(value)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20value\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20value\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20value\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','ActSeq_Skew_WaitForSkew','canAttackBattleCore','drawItem','isPreviousSceneBattleTransitionable','processDefeat','setBattlerFacePoint','skew','AsUser','%1StartBattleJS','_offsetY','Index','frameVisible','isConfused','ActSeq_Movement_BattleStep','_tpbNeedsPartyCommand','onEnemyOk','updateBattlebackBitmap1','_target','createEmptyBitmap','attackAnimationIdSlot','updateStatusWindowPosition','getLastPluginCommandInterpreter','hue','BattleManager_endBattle','actorCommandAutoBattle','getBattlePortraitOffsetX','Game_Action_itemEffectAddNormalState','friendsUnit','resetResultSwitches','turn','statusWindowRectBorderStyle','canInput','_skillIDs','ActSeq_Impact_ShockwaveEachTargets','itemHeight','stepBack','icon','942pLPNIA','actorCommandEscape','ActSeq_Mechanics_CtbSpeed','validTargets','shift','isUndecided','FlinchDuration','ReflectPlayback','DigitGroupingDamageSprites','PortraitScale','createEnemyNameContainer','showHelpWindow','ActSeq_Impact_MotionBlurScreen','Sprite_Battler_initMembers','dragonbonesData','getBattlePortraitOffsetY','WeaponTypeID','RepositionEnemies','softDamageCapRate','_actorSprites','999YbFzil','SkewY','createMiss','#ffffff','displayItemMessage','PerformAction','Actor','_motionSpeed','alterBreakShield','BattleEndEvent','battleAnimation','checkCacheKey','PreApplyAsTargetJS','BattleManager_startInput','abs','hardDamageCap','WaitForZoom','mpHealingFmt','wholeActionSet','hitRate','hpDamageFmt','PostStartActionJS','isItem','create','isActiveTpb','ParseEnemyNotetags','FaceAway','EasingType','PostRegenerateJS','walk','AsTarget','makeDamageValue','removeDamageSprite','isForRandomBattleCore','casting','displayAction','_targetOpacity','reduce','needsSelection','applyCritical','MpGaugeOffsetY','BattleLog','requestMotion','DefaultHardCap','ScaleY','ActSeq_Set_FinishAction','SkillItemStandardCols','ConfigManager_applyData','Game_Action_isForFriend','createActors','ActSeq_Motion_WaitMotionFrame','MaxLines','nameY','onBattleStartBattleCore','shadow','ReflectAnimation','sideview_ui','addBattleCoreAutoBattleStyleCommand','snapForBackground','_updateFilterArea','ForceExploited','updateCollapse','addAutoBattleCommands','isForFriend','canBattlerMove','isAutoBattle','chant','onDatabaseLoaded','helpWindowRect','%1Apply%2JS','performAttack','getMenuImage','glitch','BattleManager_endAction','skewDuration','PartyCmd','left','isHiddenSkill','FlinchDistanceY','getItemDamageAmountLabelBattleCore','commandAutoBattle','tone','StatusWindowAttachmentFrontOffsetX','BattleManager_inputtingAction','guard','Window_ActorCommand_setup','Scene_Battle_itemWindowRect','PreApplyAsUserJS','freezeMotion','adjustPosition','not\x20focus','NewPopupBottom','getConfigValue','JS\x20%1END\x20ACTION','gainStoredBoostPoints','targetActionSet','waitForAnimation','waitForJump','displayFailure','opponentsUnit','battleEffect','isPartyTpbInputtable','sort','adjustPosition_1for1','damageFlat','mainSpriteWidth','applyItem','command301','PreRegenerateJS','magicReflection','performEvasion','VisuMZ_2_PartySystem','_cursorArea','drawItemStyleIcon','delay','refreshBattlerMotions','Sprite_Enemy_update','_offsetX','BattleManager_updatePhase','_angleWholeDuration','CombatLogIcon','checkShowHideSkillNotetags','swing','_emptyBitmap','isBattleMember','trueRandomTarget','Item-%1-%2','random','PreDamageJS','startSkew','isDisplayEmergedEnemies','_battleField','showEnemyAttackAnimation','clone','drawLineText','DamageStyles','performSubstitute','createBattleFieldContainer','getEnemyIdWithName','ActSeq_Movement_MoveBy','BattleManager_initMembers','MAT','commandSymbol','lineRect','pushBaseLine','Sprite_Battler_isMoving','isBypassDamageCap','PreDamageAsTargetJS','bossCollapse','missile','DefaultSoftCap','alive\x20battlers\x20not\x20target','_effectsContainer','<%1>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1>','sliceMin','performActionMotions','skewBattler','Sprite_Actor_updateFrame','sortDamageSprites','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','substitute','_skewDuration','CmdStyle','ActSeq_Set_WholeActionSet','pattern','getInputButtonString','_borderPortraitSprite','autoBattleWindowRect','DamageDisplay','makeActionListAutoAttack','compareBattlerSprites','BattleCore','anchorX','_executedValue','Game_Actor_setup','Interrupt','sliceMax','battler','Strength','86398RjESZw','ChantStyle','createActionSequenceProjectile','_customDamageFormula','displayTpDamage','HelpEscape','alive\x20actors','_battler','_damages','performJump','equipSlots','displayCurrentState','bitmap','frontviewSpriteY','ActSeq_Mechanics_Collapse','isBattlerGrounded','DisplayAction','ActSeq_Mechanics_AddState','_index','JS\x20%1APPLY\x20%2','ArPenRate','battleCorePreBattleCommonEvent','isDTB','FlinchDistanceX','createTargetsJS','_autoBattle','Sprite_Battler_damageOffsetX','HitRate','ActSeq_Animation_CastAnimation','statusWindowRectXPStyle','isPlaytest','blt','makeTargets','CheckMapBattleEventValid','initBattlePortrait','evalDamageFormula','Scene_Battle_selectNextCommand','DefaultDamageStyle','_stypeIDs','addImmortal','performMoveToTargets','AutoBattleRect','note','canEscape','Game_Battler_performDamage','isPreviousScene','_enemyID','VisuMZ_3_ActSeqImpact','splice','displayCritical','onOpacityEnd','helpAreaHeight','clearFreezeMotionForWeapons','iconText','clearWeaponAnimation','Mirror','_cacheTextWidth','applyData','_tpbState','allowCollapse','CmdIconAutoBattle','_weather','maxItems','loadEnemy','arPenRate','_currentActor','removeChild','createKeyJS','isAlive','Game_Battler_regenerateAll','ActSeq_Horror_GlitchCreate','onJumpEnd','evalDamageFormulaBattleCore','JS\x20%1END\x20TURN','createHelpWindow','getItemDamageAmountTextOriginal','Scene_Battle_createHelpWindow','updateSpin','cameraOffsetDuration','Game_Troop_setup','ActSeq_Movement_FaceDirection','svBattlerShadowVisible','animation','_homeX','Sprite_Enemy_initVisibility','min','Targets1','_immortal','updateSkew','Game_Action_evalDamageFormula','actionSplicePoint','startActorSelection','invokeMagicReflection','_commonEventQueue','isSkill','update','changeBattlerOpacity','createCancelButton','extraPositionY','addDebuff','isNextScene','Sprite_Battler_setBattler','opacity','Scene_Battle_startEnemySelection','_growY','startPartyCommandSelection','ActSeq_Mechanics_CtbOrder','VisuMZ_4_BreakShields','targetObjects','innerWidth','attachSpritesToDistortionSprite','setupZoomBlurImpactFilter','+%1\x20MP','removedStateObjects','setSvBattlerSprite','OffsetY','_shadowSprite','Window_BattleLog_performCollapse','moveBattlerToPoint','dead\x20battlers','_damageContainer','loadWindowskin','weaponImageId','regionId','_indent','removeAnimationFromContainer','makeData','OverallFormulaJS','_flinched','cancelTargetSelectionVisibility','setBattlePortrait','isOpponent','physical','Sprite_Battler_updatePosition','eraseState','Scene_Battle_createCancelButton','unshift','isNextSceneBattleTransitionable','ShowWeapon','Window_BattleLog_performRecovery','linkSprite','process_VisuMZ_BattleCore_TraitObject_Notetags','StyleON','_attackAnimationId','parameters','HpGauge','MOTIONS','startTurn','randomInt','Scene_Battle_startActorSelection','_colorType','maxBattleMembers','children','performCounter','AddOption','redraw','startAttackWeaponAnimation','WaitCount1','BARE\x20HANDS','updateBossCollapse','boxHeight','PopupShiftY','_effectType','getNextDamagePopup','setupShockwaveImpactFilter','displayActionResults','invokeAction','updateRefresh','AttackAnimation','Game_Temp_requestAnimation','changeCtbChargeTime','ActSeq_Angle_Reset','ActSeq_Mechanics_ActionEffect','value','DistanceY','_angleEasing','message1','ChargeRate','process_VisuMZ_BattleCore_CreateRegExp','isAffectedByBreakShield','setupBattleCore','resize','addCustomCommands','_visualHpGauge_JustDied','statusText','OffsetAdjust','VisuMZ_4_CombatLog','Name','BattleCmdList','IconStypeMagic','isSideView','clearBattleCoreData','battlerSprites','isEffecting','Damage','BattleManager_onEscapeSuccess','startAction','clearForcedGameTroopSettingsBattleCore','_createDamageContainer','requestDragonbonesAnimation','ActSeq_Mechanics_BreakShieldChange','drawItemStatusXPStyle','addEscapeCommand','isForOpponentBattleCore','addSkillTypeCommand','initMembers','ShowRemovedBuff','map','StateIconOffsetY','_distortionSprite','StepDistanceX','performWeaponAnimation','createString','setBattlerFlip','updateBitmap','magicSkills','battleZoom','JS\x20%1START\x20ACTION','Window_BattleLog_displayCritical','_svBattlerData','StatusWindowSkinHide','_floatWholeDuration','_borderPortraitDuration','createAnimationSprite','addBattleCoreAutoBattleStartupCommand','canGuardBattleCore','updateOpacity','Game_Interpreter_command301','loadSystem','Parse_Notetags_Action','Scene_Battle_windowAreaHeight','battleCoreResumeLaunchBattle','Scene_Battle_onActorCancel','MIN_SAFE_INTEGER','Window_ActorCommand_initialize','allowRandomSpeed','CommandWidth','_skewY','innerHeight','ARRAYEVAL','AllowCollapse','PostEndTurnJS','Sprite_Enemy_updateStateSprite','BattleLogRectJS','iterateBattler','ActSeq_Mechanics_TextPopup','ActSeq_Mechanics_AtbGauge','battlelog','Battleback','itemHit','enemyId','_surprise','battleProjectiles','makeDeepCopy','_action','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','XPActorDefaultHeight','_stateIconSprite','MotionIdle','MotionFrameWait','MotionType','_actionInputIndex','requestRefresh','WtypeId','addOptionsCommand','setBackgroundType','displayBuffs','setupMotion','makeAutoBattleActions','commandEscape','SkewX','createChildSprite','VisuMZ_1_SkillsStatesCore','autoSelectPriority','HelpFight','_baseX','stop','ParseAllNotetags','updateFlip','removeImmortal','Window_BattleLog_performActionEnd','TextColor','ActSeq_Projectile_Animation','dead\x20friends','NameAttachStateIcon','battleOpacity','inHomePosition','_forcedBattlers','Height','isDuringNonLoopingMotion','randomTargets','command3011','requestFauxAnimation','isTpbMainPhase','Reveal','setSkill','makeTargetsBattleCore','battleCamera','command301_PreBattleEvent','_tempEquipCheck','battleSpriteSkew','createAllWindows','createAutoBattleWindow','battlerShadowScale','_padding','transform','Sprite_Battler_updateMain','measureTextWidth','isAnyoneChangingOpacity','type','removeBuff','process_VisuMZ_BattleCore_PluginParams','checkTpbInputOpen','ParseItemNotetags','launchBattle','anchorY','calcWindowHeight','Sprite_Actor_setBattler','pow','ActSeq_Zoom_Reset','%1EndBattleJS','FlashColor','Scene_Battle_startPartyCommandSelection','updateLink','PostEndBattleJS','PostApplyAsUserJS','createAttachmentSprites','_logWindow','compareEnemySprite','ActSeq_Horror_Clear','_mainSprite','currentExt','CmdTextAutoBattle','Window_BattleLog_pushBaseLine','ActSeq_BattleLog_DisplayAction','isAnyoneMoving','updatePosition','processVictory','updateShadow','ShowActorGauge','DistanceX','Window_BattleLog_update','Game_Action_itemHit','_battlerName','text','start','attack','ParseClassNotetags','PortraitScaleBorderStyle','applyDamageCaps','ActionEndUpdate','_animationContainer','BattleManager_startAction','UNTITLED','updateStyleOpacity','Game_Party_removeActor','VisuMZ_2_BattleSystemCTB','setBattleCameraOffset','adjustPosition_ScaleToFit','_angleDuration','ActSeq_Mechanics_Multipliers','makeCommandList','spinBattler','iconIndex','Debuffs','VisuMZ_0_CoreEngine','setupDamagePopup','constructor','isChangingOpacity','AllowRandomSpeed','endAnimation','Window_BattleStatus_initialize','counterAttack','isOptionsCommandEnabled','XPSpriteYLocation','skillId','attackSkillId','windowPadding','visualHpGauge','singleSkill','canAttack','ActSeq_BattleLog_WaitForBattleLog','toUseBoostPoints','collapseType','Window_BattleLog_displayTpDamage','WaitForNewLine','\x5cI[%1]%2','_enemyId','updateFloat','Game_Action_executeDamage','_appeared','PreEndActionJS','power','gainHp','performAttackSlot','_cancelButton','ActSeq_Zoom_Scale','_additionalSprites','VisuMZ_2_BattleSystemOTB','Opacity','ActSeq_BattleLog_Clear','Spriteset_Battle_updateActors','RegExp','updateBattlerContainer','currentSymbol','applyAngleChange','applySoftDamageCap','getCommonEventIdWithName','CriticalDmgFlat','textColor','clearBattlerMotionTrailData','onMoveEnd','setVisibleUI','victory','Game_Action_isForOpponent','Window_BattleLog_displayMpDamage','windowskin','ActSeq_Movement_Float','callUpdateHelp','onBattleStart','performMagicEvasion','FollowTurn','changePaintOpacity','gainCurrentActionsFTB','alive\x20actors\x20not\x20target','ActSeq_Movement_HomeReset','updateShadowBattleCore','itemTextAlign','_battlePortrait','isActor','Exploiter','ActSeq_Movement_FacePoint','setHome','onRegeneratePlayStateAnimation','ActSeq_Mechanics_StbExtraAction','applyVariance','process_VisuMZ_BattleCore_Action_Notetags','Game_Actor_makeActionList','updateAction','svBattlerAnchorY','setValue','processRandomizedData','_battlerHue','isTurnBased','startInput','ActSeq_Element_AddElements','AS\x20TARGET','createBorderStylePortraitSprite','ActSeq_Set_SetupAction','Game_Map_setupBattleback','ActSeq_Horror_TVRemove','_growWholeDuration','setSTBExploited','bottom','missed','DamageStyleList','scale','Game_Action_needsSelection','Settings','updateHelp','CmdIconOptions','ActSeq_Animation_ActionAnimation','_scene','isForOpponent','ForceRandom','Filename','%1EndActionJS','Spriteset_Battle_createBattleField','VisuMZ_2_BattleSystemSTB','NameAlwaysVisible','ShowPopup','equips','concat','center','showPortraits','Elements','adjustWeaponSpriteOffset','_motionType','BTestBypass','addAnimationSpriteToContainer','ActSeq_Movement_Scale','DistanceAdjust','ActSeq_Mechanics_FtbAction','clearHorrorEffects','WaitForAngle','resetFontSettings','TpGaugeOffsetY','setBattleSkew','isBattleTest','ScaleX','isCustomBattleScope','updateBorderSprite','ITEM','isFriendly','isMagical','STR','command283','softDamageCap','createJS','AttachStateOffsetY','weapons','CreateActionSequenceTargets','FaceDirection','svAnchorY','Game_System_initialize','autoBattleStart','startMotion','_battlerContainer','actorCommandSingleSkill','_actor','performSTBExploiter','Window_BattleLog_displayFailure','performAction','Scene_Map_launchBattle','Game_Interpreter_command283','ActSeq_Impact_MotionTrailRemove','ParseSkillNotetags','checkTpbInputClose','hasBeenDefeatedBefore','initBattleCore','placeGauge','skills','applyFreezeMotionFrames','repeats','logWindowRect','match','anchor','battleCommandIcon','startDamagePopup','parent','addBuff','startOpacity','updateVisibility','callOptions','NameOffsetX','drawItemImageListStyle','max','isBattleFlipped','CriticalHitRateJS','ActSeq_Element_ForceElements','Game_Interpreter_updateWaitMode','Scale','battlerSmoothImage','_skillWindow','replace','addLoadListener','callOkHandler','PostStartBattleJS','Enemy','SceneManager_isSceneChanging','parse','isForRandom','toLowerCase','process_VisuMZ_BattleCore_Failsafes','_enemyIDs','drawActorFace','VariableHeal','TargetLocation','_actionBattlers','battleCameraData','effect','exit','ActSeq_Camera_Reset','getStypeIdWithName','createStateIconSprite','ActSeq_Element_Clear','createAnimationContainer','MAXHP','createDamageSprite','Spriteset_Battle_update','itemRect','makeSpeed','Window_BattleLog_performMiss','isAnyoneFloating','changeAtbCastTime','isDebuffAffected','Scene_Battle_createPartyCommandWindow','Window_BattleLog_displayEvasion','MAXMP','moveToStartPositionBattleCore','_floatEasing','Point','attackAnimationId1','updateCommandNameWindow','_battleCoreNoElement','ShowSubstitute','PopupOffsetY','performActionEndMembers','ActSeq_Animation_AttackAnimation2','updateStart','isSkipPartyCommandWindow','createLowerLayer','Sprite_Weapon_loadBitmap','addSkillCommands','Window_ItemList_maxCols','Duration','Scene_Battle_onEnemyOk','Game_Party_addActor','StatusWindowSkinFilename','_floatDuration','_updateCursorFilterArea','addActor','ShowMpDmg','setupChild','PostDamageAsUserJS','isEnemy','onActorCancel','ParseActorNotetags','format','ActSeq_Weapon_NextActiveWeapon','finalizeScale','BattleManager_processDefeat','EVAL','_flashDuration','forceAction','getChildIndex','AutoBattleBgType','isFightCommandEnabled','ActSeq_Target_RandTarget','ShowPortraitsBorderStyle','createPartyCommandWindowBattleCore','Targets2','WaitForEffect','evaded','DisablePartyCmd','CriticalDuration','stbGainInstant','actor','dimColor2','undecided','clearFreezeMotion','drawSkillCost','VisuMZ_2_BattleSystemFTB','_forcedBattleLayout','Window_Options_statusText','FrontViewSelect','resetBreakShield','fillRect','BattleManager_makeActionOrders','dead\x20actors','PopupPosition','_activeWeaponSlot','PreDamage%1JS','maxLines','JSON','2KadXwB','dead\x20opponents','Direction','Sprite_Actor_update','CurrentTurn','addChildAt','%1RegenerateJS','zoomDuration','Window_BattleEnemy_show','setAttack','SlotID','Scene_Battle_logWindowRect','WaitForScale','initElementStatusCore','Exploited','ActSeq_Target_PrevTarget','setHelpWindow','Game_Battler_startTpbTurn','ForceDeath','parseForcedGameTroopSettingsBattleCore','createContents','applyBattleCoreJS','initialize','setFrame','faceRect','mainSpriteScaleX','needsActorInputCancel','terminate','PreApplyJS','critical','ext','startTpbTurn','autoBattle','StartName','refreshDimmerBitmap','processBattleCoreJS','setHandler','_methods'];const _0x46a0=function(_0x3e4f5f,_0x1961f3){_0x3e4f5f=_0x3e4f5f-0x18a;let _0x25b1e8=_0x25b1[_0x3e4f5f];return _0x25b1e8;};const _0x16b2b1=_0x46a0;(function(_0x3b8553,_0x37d2cd){const _0x40fef8=_0x46a0;while(!![]){try{const _0x888669=-parseInt(_0x40fef8(0x294))*parseInt(_0x40fef8(0x95f))+parseInt(_0x40fef8(0x8eb))*-parseInt(_0x40fef8(0x350))+parseInt(_0x40fef8(0x919))+-parseInt(_0x40fef8(0x3d8))*-parseInt(_0x40fef8(0x42f))+parseInt(_0x40fef8(0x41b))*-parseInt(_0x40fef8(0x917))+parseInt(_0x40fef8(0x1d5))*parseInt(_0x40fef8(0x35c))+-parseInt(_0x40fef8(0x767))*-parseInt(_0x40fef8(0x4e2));if(_0x888669===_0x37d2cd)break;else _0x3b8553['push'](_0x3b8553['shift']());}catch(_0xeeedd7){_0x3b8553['push'](_0x3b8553['shift']());}}}(_0x25b1,0xe7cba));var label='BattleCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x16b2b1(0x1a0)](function(_0x3588ce){const _0x4ebfbd=_0x16b2b1;return _0x3588ce[_0x4ebfbd(0x8a6)]&&_0x3588ce['description'][_0x4ebfbd(0x3e4)]('['+label+']');})[0x0];VisuMZ[label][_0x16b2b1(0x6ac)]=VisuMZ[label][_0x16b2b1(0x6ac)]||{},VisuMZ[_0x16b2b1(0x874)]=function(_0xf17e2f,_0x463a85){const _0x26a408=_0x16b2b1;for(const _0xce9a3b in _0x463a85){if(_0xce9a3b['match'](/(.*):(.*)/i)){const _0x14a612=String(RegExp['$1']),_0x3877cb=String(RegExp['$2'])[_0x26a408(0x2b1)]()['trim']();let _0x5288ad,_0x3254a9,_0x58e782;switch(_0x3877cb){case _0x26a408(0x241):_0x5288ad=_0x463a85[_0xce9a3b]!==''?Number(_0x463a85[_0xce9a3b]):0x0;break;case'ARRAYNUM':_0x3254a9=_0x463a85[_0xce9a3b]!==''?JSON[_0x26a408(0x708)](_0x463a85[_0xce9a3b]):[],_0x5288ad=_0x3254a9[_0x26a408(0x5b1)](_0x29b904=>Number(_0x29b904));break;case _0x26a408(0x746):_0x5288ad=_0x463a85[_0xce9a3b]!==''?eval(_0x463a85[_0xce9a3b]):null;break;case _0x26a408(0x5d1):_0x3254a9=_0x463a85[_0xce9a3b]!==''?JSON['parse'](_0x463a85[_0xce9a3b]):[],_0x5288ad=_0x3254a9['map'](_0x3d2b7c=>eval(_0x3d2b7c));break;case _0x26a408(0x766):_0x5288ad=_0x463a85[_0xce9a3b]!==''?JSON['parse'](_0x463a85[_0xce9a3b]):'';break;case _0x26a408(0x8b2):_0x3254a9=_0x463a85[_0xce9a3b]!==''?JSON[_0x26a408(0x708)](_0x463a85[_0xce9a3b]):[],_0x5288ad=_0x3254a9[_0x26a408(0x5b1)](_0x417166=>JSON[_0x26a408(0x708)](_0x417166));break;case _0x26a408(0x8f2):_0x5288ad=_0x463a85[_0xce9a3b]!==''?new Function(JSON[_0x26a408(0x708)](_0x463a85[_0xce9a3b])):new Function(_0x26a408(0x2c8));break;case'ARRAYFUNC':_0x3254a9=_0x463a85[_0xce9a3b]!==''?JSON[_0x26a408(0x708)](_0x463a85[_0xce9a3b]):[],_0x5288ad=_0x3254a9['map'](_0x333d69=>new Function(JSON[_0x26a408(0x708)](_0x333d69)));break;case _0x26a408(0x6d1):_0x5288ad=_0x463a85[_0xce9a3b]!==''?String(_0x463a85[_0xce9a3b]):'';break;case _0x26a408(0x959):_0x3254a9=_0x463a85[_0xce9a3b]!==''?JSON[_0x26a408(0x708)](_0x463a85[_0xce9a3b]):[],_0x5288ad=_0x3254a9[_0x26a408(0x5b1)](_0x142f6e=>String(_0x142f6e));break;case _0x26a408(0x306):_0x58e782=_0x463a85[_0xce9a3b]!==''?JSON[_0x26a408(0x708)](_0x463a85[_0xce9a3b]):{},_0xf17e2f[_0x14a612]={},VisuMZ[_0x26a408(0x874)](_0xf17e2f[_0x14a612],_0x58e782);continue;case _0x26a408(0x1e5):_0x3254a9=_0x463a85[_0xce9a3b]!==''?JSON[_0x26a408(0x708)](_0x463a85[_0xce9a3b]):[],_0x5288ad=_0x3254a9[_0x26a408(0x5b1)](_0x3a3389=>VisuMZ[_0x26a408(0x874)]({},JSON[_0x26a408(0x708)](_0x3a3389)));break;default:continue;}_0xf17e2f[_0x14a612]=_0x5288ad;}}return _0xf17e2f;},(_0x9ddeb1=>{const _0x4ca080=_0x16b2b1,_0x3a2b8a=_0x9ddeb1[_0x4ca080(0x802)];for(const _0x9eb335 of dependencies){if(!Imported[_0x9eb335]){alert(_0x4ca080(0x5e1)[_0x4ca080(0x742)](_0x3a2b8a,_0x9eb335)),SceneManager['exit']();break;}}const _0x9ab24f=_0x9ddeb1['description'];if(_0x9ab24f['match'](/\[Version[ ](.*?)\]/i)){const _0x113ff4=Number(RegExp['$1']);_0x113ff4!==VisuMZ[label][_0x4ca080(0x23a)]&&(alert(_0x4ca080(0x4ce)['format'](_0x3a2b8a,_0x113ff4)),SceneManager[_0x4ca080(0x713)]());}if(_0x9ab24f[_0x4ca080(0x6ef)](/\[Tier[ ](\d+)\]/i)){const _0x40a087=Number(RegExp['$1']);_0x40a087<tier?(alert(_0x4ca080(0x3f0)['format'](_0x3a2b8a,_0x40a087,tier)),SceneManager[_0x4ca080(0x713)]()):tier=Math[_0x4ca080(0x6fa)](_0x40a087,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x9ddeb1[_0x4ca080(0x572)]);})(pluginData),VisuMZ[_0x16b2b1(0x6d7)]=function(_0x1a99b5){const _0x22af6e=_0x16b2b1;let _0x256311=[];for(const _0x443e0b of _0x1a99b5){_0x256311=_0x256311[_0x22af6e(0x6ba)](VisuMZ[_0x22af6e(0x869)](_0x443e0b));}return _0x256311[_0x22af6e(0x1a0)](_0x484c87=>_0x484c87);},VisuMZ[_0x16b2b1(0x869)]=function(_0x3a6c59){const _0x3a8dd7=_0x16b2b1,_0x1a9709=BattleManager['allBattleMembers']()[_0x3a8dd7(0x1a0)](_0x25974a=>_0x25974a&&_0x25974a[_0x3a8dd7(0x7b6)]()),_0x3ff014=BattleManager['_subject'],_0x54f9bd=BattleManager['_target'],_0x93bdec=BattleManager[_0x3a8dd7(0x2cb)]?BattleManager['_allTargets'][_0x3a8dd7(0x2ed)](0x0):_0x1a9709;_0x3a6c59=_0x3a6c59[_0x3a8dd7(0x70a)]()[_0x3a8dd7(0x7bc)]();if(_0x3a6c59===_0x3a8dd7(0x818))return[_0x3ff014];else{if(_0x3a6c59===_0x3a8dd7(0x230))return[_0x54f9bd];else{if(_0x3a6c59===_0x3a8dd7(0x86d)){if(_0x54f9bd){const _0x2e5e9e=_0x93bdec[_0x3a8dd7(0x925)](_0x54f9bd);return _0x2e5e9e>=0x0?[_0x93bdec[_0x2e5e9e-0x1]||_0x54f9bd]:[_0x54f9bd];}}else{if(_0x3a6c59===_0x3a8dd7(0x957)){if(_0x54f9bd){const _0x1b1779=_0x93bdec[_0x3a8dd7(0x925)](_0x54f9bd);return _0x1b1779>=0x0?[_0x93bdec[_0x1b1779+0x1]||_0x54f9bd]:[_0x54f9bd];}}else{if(_0x3a6c59===_0x3a8dd7(0x3b5))return _0x93bdec;else{if(_0x3a6c59===_0x3a8dd7(0x7be))return[_0x3ff014][_0x3a8dd7(0x6ba)](_0x93bdec);else{if(_0x3a6c59===_0x3a8dd7(0x489))return _0x1a9709[_0x3a8dd7(0x1a0)](_0x7dbcd6=>_0x7dbcd6!==_0x3ff014&&!_0x93bdec[_0x3a8dd7(0x3e4)](_0x7dbcd6)&&_0x7dbcd6[_0x3a8dd7(0x2ad)]());}}}}}}if(_0x3ff014){if(_0x3a6c59==='alive\x20friends')return _0x3ff014[_0x3a8dd7(0x411)]()[_0x3a8dd7(0x25b)]();else{if(_0x3a6c59==='alive\x20friends\x20not\x20user')return _0x3ff014[_0x3a8dd7(0x411)]()['aliveMembers']()['filter'](_0x191046=>_0x191046!==_0x3ff014);else{if(_0x3a6c59===_0x3a8dd7(0x863))return _0x3ff014[_0x3a8dd7(0x411)]()['aliveMembers']()[_0x3a8dd7(0x1a0)](_0x417d55=>_0x417d55!==_0x54f9bd);else{if(_0x3a6c59===_0x3a8dd7(0x5fd))return _0x3ff014[_0x3a8dd7(0x411)]()[_0x3a8dd7(0x915)]();else{if(_0x3a6c59['match'](/FRIEND INDEX (\d+)/i)){const _0x487a80=Number(RegExp['$1']);return[_0x3ff014['friendsUnit']()[_0x3a8dd7(0x1ac)]()[_0x487a80]];}}}}}if(_0x3a6c59==='alive\x20opponents')return _0x3ff014[_0x3a8dd7(0x492)]()[_0x3a8dd7(0x25b)]();else{if(_0x3a6c59===_0x3a8dd7(0x807))return _0x3ff014['opponentsUnit']()[_0x3a8dd7(0x25b)]()[_0x3a8dd7(0x1a0)](_0x35cb12=>_0x35cb12!==_0x54f9bd);else{if(_0x3a6c59===_0x3a8dd7(0x768))return _0x3ff014[_0x3a8dd7(0x492)]()[_0x3a8dd7(0x915)]();else{if(_0x3a6c59[_0x3a8dd7(0x6ef)](/OPPONENT INDEX (\d+)/i)){const _0x26700e=Number(RegExp['$1']);return[_0x3ff014['opponentsUnit']()[_0x3a8dd7(0x1ac)]()[_0x26700e]];}}}}}if(_0x3a6c59===_0x3a8dd7(0x4e8))return $gameParty[_0x3a8dd7(0x25b)]();else{if(_0x3a6c59==='alive\x20actors\x20not\x20user')return $gameParty[_0x3a8dd7(0x25b)]()[_0x3a8dd7(0x1a0)](_0x36d6b6=>_0x36d6b6!==_0x3ff014);else{if(_0x3a6c59===_0x3a8dd7(0x68a))return $gameParty['aliveMembers']()[_0x3a8dd7(0x1a0)](_0x2aac80=>_0x2aac80!==_0x54f9bd);else{if(_0x3a6c59===_0x3a8dd7(0x761))return $gameParty['deadMembers']();else{if(_0x3a6c59['match'](/ACTOR INDEX (\d+)/i)){const _0x4cccae=Number(RegExp['$1']);return[$gameParty[_0x3a8dd7(0x1ac)]()[_0x4cccae]];}else{if(_0x3a6c59[_0x3a8dd7(0x6ef)](/ACTOR ID (\d+)/i)){const _0x5dff0b=Number(RegExp['$1']);return[$gameActors[_0x3a8dd7(0x755)](_0x5dff0b)];}}}}}}if(_0x3a6c59===_0x3a8dd7(0x79f))return $gameTroop[_0x3a8dd7(0x25b)]();else{if(_0x3a6c59===_0x3a8dd7(0x2c3))return $gameTroop['aliveMembers']()[_0x3a8dd7(0x1a0)](_0x4bdf89=>_0x4bdf89!==_0x3ff014);else{if(_0x3a6c59===_0x3a8dd7(0x80a))return $gameTroop[_0x3a8dd7(0x25b)]()[_0x3a8dd7(0x1a0)](_0x5dfe9e=>_0x5dfe9e!==_0x54f9bd);else{if(_0x3a6c59===_0x3a8dd7(0x1fb))return $gameTroop[_0x3a8dd7(0x915)]();else{if(_0x3a6c59[_0x3a8dd7(0x6ef)](/ENEMY INDEX (\d+)/i)){const _0x48f2bd=Number(RegExp['$1']);return[$gameTroop[_0x3a8dd7(0x1ac)]()[_0x48f2bd]];}else{if(_0x3a6c59[_0x3a8dd7(0x6ef)](/ENEMY ID (\d+)/i)){const _0x151db1=Number(RegExp['$1']);return $gameTroop[_0x3a8dd7(0x25b)]()[_0x3a8dd7(0x1a0)](_0x3f3879=>_0x3f3879[_0x3a8dd7(0x5dc)]()===_0x151db1);}}}}}}if(_0x3a6c59===_0x3a8dd7(0x7dc))return _0x1a9709[_0x3a8dd7(0x1a0)](_0x1c24c0=>_0x1c24c0[_0x3a8dd7(0x526)]());else{if(_0x3a6c59===_0x3a8dd7(0x319))return _0x1a9709[_0x3a8dd7(0x1a0)](_0x409fc6=>_0x409fc6[_0x3a8dd7(0x526)]()&&_0x409fc6!==_0x3ff014);else{if(_0x3a6c59===_0x3a8dd7(0x4c6))return _0x1a9709[_0x3a8dd7(0x1a0)](_0x791011=>_0x791011[_0x3a8dd7(0x526)]()&&_0x791011!==_0x54f9bd);else{if(_0x3a6c59===_0x3a8dd7(0x559))return _0x1a9709[_0x3a8dd7(0x1a0)](_0x347d3d=>_0x347d3d[_0x3a8dd7(0x8dc)]());}}}return[];},PluginManager[_0x16b2b1(0x289)](pluginData['name'],_0x16b2b1(0x6a2),_0x27fe09=>{const _0x3bd435=_0x16b2b1;if(!SceneManager[_0x3bd435(0x7ed)]())return;VisuMZ['ConvertParams'](_0x27fe09,_0x27fe09);const _0xea6f52=$gameTemp[_0x3bd435(0x40b)](),_0x4f8ed8=BattleManager[_0x3bd435(0x5e0)],_0x5ec7b3=BattleManager[_0x3bd435(0x8ff)],_0x23f681=BattleManager[_0x3bd435(0x2cb)]?BattleManager[_0x3bd435(0x2cb)][_0x3bd435(0x2ed)](0x0):[],_0x31e675=BattleManager[_0x3bd435(0x629)];if(!_0xea6f52||!_0x4f8ed8||!_0x5ec7b3)return;if(!_0x4f8ed8[_0x3bd435(0x3e3)]())return;if(_0x27fe09[_0x3bd435(0x4f2)])_0x31e675[_0x3bd435(0x452)](_0x5ec7b3,_0x4f8ed8[_0x3bd435(0x3e3)]());_0x27fe09[_0x3bd435(0x1d7)]&&_0x31e675['push']('applyImmortal',_0x5ec7b3,_0x23f681,!![]);if(_0x27fe09[_0x3bd435(0x2c1)])_0x31e675[_0x3bd435(0x305)]('performActionStart',_0x5ec7b3,_0x4f8ed8);if(_0x27fe09[_0x3bd435(0x1a5)])_0x31e675[_0x3bd435(0x305)](_0x3bd435(0x33b));if(_0x27fe09[_0x3bd435(0x39c)])_0x31e675[_0x3bd435(0x305)](_0x3bd435(0x8c1),_0x5ec7b3,_0x4f8ed8);if(_0x27fe09['WaitForAnimation'])_0x31e675[_0x3bd435(0x305)](_0x3bd435(0x48f));_0xea6f52[_0x3bd435(0x384)](_0x3bd435(0x5d9));}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x4d2),_0x4c8c72=>{const _0x513c30=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x513c30(0x874)](_0x4c8c72,_0x4c8c72);const _0x2b06b1=$gameTemp['getLastPluginCommandInterpreter'](),_0x4e7538=BattleManager[_0x513c30(0x5e0)],_0x4f0520=BattleManager[_0x513c30(0x8ff)],_0x3cabf9=BattleManager[_0x513c30(0x2cb)]?BattleManager['_allTargets']['slice'](0x0):[],_0x54de0b=BattleManager[_0x513c30(0x629)],_0x1a4857=_0x4c8c72[_0x513c30(0x813)]??![];if(!_0x2b06b1||!_0x4e7538||!_0x4f0520)return;if(!_0x4e7538[_0x513c30(0x3e3)]())return;let _0x153a21=_0x1a4857?_0x54de0b[_0x513c30(0x875)](_0x4f0520):0x1;for(let _0xc20a05=0x0;_0xc20a05<_0x153a21;_0xc20a05++){_0x1a4857&&_0x4f0520[_0x513c30(0x68f)]()&&_0x54de0b['push'](_0x513c30(0x307),_0x4f0520,_0xc20a05);if(_0x4c8c72[_0x513c30(0x434)])_0x54de0b[_0x513c30(0x305)](_0x513c30(0x6e2),_0x4f0520,_0x4e7538);if(_0x4c8c72[_0x513c30(0x864)]>0x0)_0x54de0b[_0x513c30(0x305)](_0x513c30(0x2bd),_0x4c8c72[_0x513c30(0x864)]);if(_0x4c8c72[_0x513c30(0x247)])_0x54de0b[_0x513c30(0x305)](_0x513c30(0x34a),_0x4f0520,_0x3cabf9,_0x4e7538['item']()[_0x513c30(0x7f0)]);if(_0x4c8c72[_0x513c30(0x7d8)])_0x54de0b[_0x513c30(0x305)](_0x513c30(0x48f));for(const _0x3036ec of _0x3cabf9){if(!_0x3036ec)continue;if(_0x4c8c72['ActionEffect'])_0x54de0b['push'](_0x513c30(0x23e),_0x4f0520,_0x3036ec);}}_0x1a4857&&_0x4f0520[_0x513c30(0x68f)]()&&_0x54de0b[_0x513c30(0x305)](_0x513c30(0x7de),_0x4f0520);if(_0x4c8c72[_0x513c30(0x1d7)])_0x54de0b[_0x513c30(0x305)](_0x513c30(0x8a3),_0x4f0520,_0x3cabf9,![]);_0x2b06b1[_0x513c30(0x384)](_0x513c30(0x5d9));}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x852),_0x2fa53d=>{const _0x3b3085=_0x16b2b1;if(!SceneManager[_0x3b3085(0x7ed)]())return;VisuMZ[_0x3b3085(0x874)](_0x2fa53d,_0x2fa53d);const _0x1fdd19=$gameTemp['getLastPluginCommandInterpreter'](),_0x450e58=BattleManager[_0x3b3085(0x5e0)],_0x287e1b=BattleManager['_subject'],_0x1d83d0=BattleManager[_0x3b3085(0x2cb)]?BattleManager[_0x3b3085(0x2cb)][_0x3b3085(0x2ed)](0x0):[],_0x558a75=BattleManager[_0x3b3085(0x629)],_0x4b1e5e=_0x2fa53d[_0x3b3085(0x813)]??![];if(!_0x1fdd19||!_0x450e58||!_0x287e1b)return;if(!_0x450e58[_0x3b3085(0x3e3)]())return;let _0x3a6311=_0x4b1e5e?_0x558a75[_0x3b3085(0x875)](_0x287e1b):0x1;for(let _0x3e63d9=0x0;_0x3e63d9<_0x3a6311;_0x3e63d9++){for(const _0x316d1c of _0x1d83d0){if(!_0x316d1c)continue;_0x4b1e5e&&_0x287e1b[_0x3b3085(0x68f)]()&&_0x558a75[_0x3b3085(0x305)](_0x3b3085(0x307),_0x287e1b,_0x3e63d9);if(_0x2fa53d[_0x3b3085(0x434)])_0x558a75['push'](_0x3b3085(0x6e2),_0x287e1b,_0x450e58);if(_0x2fa53d[_0x3b3085(0x57f)]>0x0)_0x558a75[_0x3b3085(0x305)](_0x3b3085(0x2bd),_0x2fa53d['WaitCount1']);if(_0x2fa53d['ActionAnimation'])_0x558a75[_0x3b3085(0x305)](_0x3b3085(0x34a),_0x287e1b,[_0x316d1c],_0x450e58['item']()[_0x3b3085(0x7f0)]);if(_0x2fa53d['WaitCount2']>0x0)_0x558a75['push'](_0x3b3085(0x2bd),_0x2fa53d['WaitCount2']);if(_0x2fa53d['ActionEffect'])_0x558a75[_0x3b3085(0x305)]('actionEffect',_0x287e1b,_0x316d1c);}}_0x4b1e5e&&_0x287e1b[_0x3b3085(0x68f)]()&&_0x558a75[_0x3b3085(0x305)](_0x3b3085(0x7de),_0x287e1b);if(_0x2fa53d['ApplyImmortal'])_0x558a75[_0x3b3085(0x305)](_0x3b3085(0x8a3),_0x287e1b,_0x1d83d0,![]);_0x1fdd19[_0x3b3085(0x384)](_0x3b3085(0x5d9));}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x45c),_0x221976=>{const _0x2f219f=_0x16b2b1;if(!SceneManager[_0x2f219f(0x7ed)]())return;VisuMZ[_0x2f219f(0x874)](_0x221976,_0x221976);const _0x454ca8=$gameTemp[_0x2f219f(0x40b)](),_0x66c609=BattleManager['_action'],_0x301155=BattleManager[_0x2f219f(0x8ff)],_0x4b1a29=BattleManager['_allTargets']?BattleManager[_0x2f219f(0x2cb)][_0x2f219f(0x2ed)](0x0):[],_0x2b3240=BattleManager[_0x2f219f(0x629)];if(!_0x454ca8||!_0x66c609||!_0x301155)return;if(!_0x66c609[_0x2f219f(0x3e3)]())return;if(_0x221976[_0x2f219f(0x1d7)])_0x2b3240[_0x2f219f(0x305)](_0x2f219f(0x8a3),_0x301155,_0x4b1a29,![]);if(_0x221976[_0x2f219f(0x663)])_0x2b3240[_0x2f219f(0x305)](_0x2f219f(0x3d6));if(_0x221976[_0x2f219f(0x750)])_0x2b3240[_0x2f219f(0x305)](_0x2f219f(0x7e6));if(_0x221976['ClearBattleLog'])_0x2b3240['push'](_0x2f219f(0x7e7));if(_0x221976['ActionEnd'])_0x2b3240[_0x2f219f(0x305)](_0x2f219f(0x27e),_0x301155);if(_0x221976[_0x2f219f(0x1a5)])_0x2b3240[_0x2f219f(0x305)](_0x2f219f(0x33b));_0x454ca8['setWaitMode'](_0x2f219f(0x5d9));}),PluginManager['registerCommand'](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x38f),_0x223b0d=>{const _0x24c4c0=_0x16b2b1;if(!SceneManager[_0x24c4c0(0x7ed)]())return;if(!Imported[_0x24c4c0(0x936)])return;VisuMZ[_0x24c4c0(0x874)](_0x223b0d,_0x223b0d);const _0x3d1a87=$gameTemp[_0x24c4c0(0x40b)](),_0x5e9ab7=_0x223b0d[_0x24c4c0(0x6c6)];if(!_0x3d1a87)return;$gameScreen[_0x24c4c0(0x2d3)](_0x223b0d[_0x24c4c0(0x267)],_0x223b0d[_0x24c4c0(0x735)],_0x223b0d['EasingType']);if(_0x5e9ab7)_0x3d1a87[_0x24c4c0(0x384)](_0x24c4c0(0x301));}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x58d),_0x529ce7=>{const _0x58d11e=_0x16b2b1;if(!SceneManager[_0x58d11e(0x7ed)]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0x58d11e(0x874)](_0x529ce7,_0x529ce7);const _0x1ae0d4=$gameTemp[_0x58d11e(0x40b)](),_0xc48be2=_0x529ce7[_0x58d11e(0x6c6)];if(!_0x1ae0d4)return;$gameScreen[_0x58d11e(0x2d3)](0x0,_0x529ce7[_0x58d11e(0x735)],_0x529ce7[_0x58d11e(0x44a)]);if(_0xc48be2)_0x1ae0d4[_0x58d11e(0x384)](_0x58d11e(0x301));}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x20f),_0x4ebc4c=>{const _0x282272=_0x16b2b1;if(!SceneManager[_0x282272(0x7ed)]())return;if(!Imported[_0x282272(0x936)])return;const _0x5cce08=$gameTemp[_0x282272(0x40b)]();if(!_0x5cce08)return;_0x5cce08[_0x282272(0x384)](_0x282272(0x301));}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x6af),_0x56fe9b=>{const _0x89b4e5=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x56fe9b,_0x56fe9b);const _0xa5ec99=$gameTemp[_0x89b4e5(0x40b)](),_0x48b868=BattleManager[_0x89b4e5(0x5e0)],_0x31aa10=BattleManager[_0x89b4e5(0x8ff)],_0x160a70=VisuMZ[_0x89b4e5(0x6d7)](_0x56fe9b[_0x89b4e5(0x85c)]),_0x901452=_0x56fe9b[_0x89b4e5(0x519)],_0x11f331=BattleManager[_0x89b4e5(0x629)];if(!_0xa5ec99||!_0x48b868||!_0x31aa10)return;if(!_0x48b868['item']())return;let _0x5bf39f=_0x48b868[_0x89b4e5(0x3e3)]()[_0x89b4e5(0x7f0)];if(_0x5bf39f<0x0)_0x5bf39f=_0x31aa10[_0x89b4e5(0x728)]();$gameTemp[_0x89b4e5(0x26f)](_0x160a70,_0x5bf39f,_0x901452),_0x56fe9b[_0x89b4e5(0x7d8)]&&_0xa5ec99[_0x89b4e5(0x384)]('battleAnimation');}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],'ActSeq_Animation_AttackAnimation',_0x473812=>{const _0x21f1a8=_0x16b2b1;if(!SceneManager[_0x21f1a8(0x7ed)]())return;VisuMZ['ConvertParams'](_0x473812,_0x473812);const _0x3d1989=$gameTemp[_0x21f1a8(0x40b)](),_0x5cd4b4=BattleManager['_subject'],_0x345eb3=VisuMZ['CreateActionSequenceTargets'](_0x473812[_0x21f1a8(0x85c)]),_0x1eb536=_0x473812['Mirror'],_0x5df6f8=BattleManager[_0x21f1a8(0x629)];if(!_0x3d1989||!_0x5cd4b4)return;const _0x164058=_0x5cd4b4[_0x21f1a8(0x728)]();$gameTemp['requestAnimation'](_0x345eb3,_0x164058,_0x1eb536),_0x473812[_0x21f1a8(0x7d8)]&&_0x3d1989[_0x21f1a8(0x384)]('battleAnimation');}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x72e),_0x22c381=>{const _0x43c756=_0x16b2b1;if(!SceneManager[_0x43c756(0x7ed)]())return;VisuMZ[_0x43c756(0x874)](_0x22c381,_0x22c381);const _0x11914e=_0x37b14e[_0x43c756(0x409)](_0x22c381[_0x43c756(0x2a9)]);if(_0x11914e<=0x0)return;const _0x1e1797=$gameTemp[_0x43c756(0x40b)](),_0x37b14e=BattleManager[_0x43c756(0x8ff)],_0x37b625=VisuMZ['CreateActionSequenceTargets'](_0x22c381[_0x43c756(0x85c)]),_0x1dea47=_0x22c381['Mirror'],_0x16273=BattleManager['_logWindow'];if(!_0x1e1797||!_0x37b14e)return;$gameTemp[_0x43c756(0x26f)](_0x37b625,_0x11914e,_0x1dea47),_0x22c381['WaitForAnimation']&&_0x1e1797[_0x43c756(0x384)](_0x43c756(0x439));}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x4fe),_0x45ca8c=>{const _0x732b79=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x45ca8c,_0x45ca8c);const _0x1e5db3=$gameTemp[_0x732b79(0x40b)](),_0x5998df=BattleManager[_0x732b79(0x5e0)],_0x38b8e6=_0x45ca8c[_0x732b79(0x519)],_0x286e57=VisuMZ['CreateActionSequenceTargets'](_0x45ca8c[_0x732b79(0x85c)]);if(!_0x1e5db3||!_0x5998df)return;if(!_0x5998df[_0x732b79(0x3e3)]())return;for(const _0x3af193 of _0x286e57){if(!_0x3af193)continue;_0x3af193[_0x732b79(0x8c1)](_0x5998df,_0x38b8e6);}if(_0x45ca8c['WaitForAnimation'])_0x1e5db3['setWaitMode'](_0x732b79(0x439));}),PluginManager['registerCommand'](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x88c),_0x310104=>{const _0x5e31d6=_0x16b2b1;VisuMZ['ConvertParams'](_0x310104,_0x310104);const _0x35348b=$gameTemp['getLastPluginCommandInterpreter'](),_0x414e0f=VisuMZ[_0x5e31d6(0x6d7)](_0x310104[_0x5e31d6(0x85c)]),_0x2a9fda=_0x310104[_0x5e31d6(0x6b3)];if(!_0x2a9fda)return;for(const _0x9a9c00 of _0x414e0f){if(!_0x9a9c00)continue;if(!_0x9a9c00[_0x5e31d6(0x68f)]())continue;_0x9a9c00[_0x5e31d6(0x564)](_0x2a9fda);}}),PluginManager['registerCommand'](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x8b7),_0x2c6fe4=>{const _0x356403=_0x16b2b1;if(!SceneManager[_0x356403(0x7ed)]())return;VisuMZ[_0x356403(0x874)](_0x2c6fe4,_0x2c6fe4);const _0x415701=$gameTemp[_0x356403(0x40b)](),_0x740a22=VisuMZ[_0x356403(0x6d7)](_0x2c6fe4[_0x356403(0x85c)]),_0x5615fe=_0x2c6fe4[_0x356403(0x952)],_0x852917=_0x2c6fe4[_0x356403(0x519)];if(!_0x415701)return;$gameTemp['requestAnimation'](_0x740a22,_0x5615fe,_0x852917);if(_0x2c6fe4['WaitForAnimation'])_0x415701[_0x356403(0x384)](_0x356403(0x439));}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x1dc),_0x3fb020=>{const _0x8f9ac8=_0x16b2b1;if(!SceneManager[_0x8f9ac8(0x7ed)]())return;const _0x4ebb12=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x4ebb12)return;_0x4ebb12[_0x8f9ac8(0x384)](_0x8f9ac8(0x439));}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x870),_0x5a6d0d=>{const _0x452891=_0x16b2b1;if(!SceneManager[_0x452891(0x7ed)]())return;VisuMZ[_0x452891(0x874)](_0x5a6d0d,_0x5a6d0d);const _0x4c3b56=BattleManager[_0x452891(0x629)],_0x102fdd=_0x5a6d0d[_0x452891(0x82f)]&&Imported['VisuMZ_4_CombatLog'];_0x4c3b56['addText'](_0x5a6d0d['Text']),_0x102fdd&&Imported[_0x452891(0x59c)]&&$gameSystem[_0x452891(0x317)](_0x5a6d0d['Text']||'',_0x5a6d0d[_0x452891(0x4a7)]||0x0);}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x672),_0xee978=>{const _0x587180=_0x16b2b1;if(!SceneManager[_0x587180(0x7ed)]())return;const _0x152f37=BattleManager[_0x587180(0x629)];_0x152f37['clear']();}),PluginManager[_0x16b2b1(0x289)](pluginData['name'],_0x16b2b1(0x630),_0x1a3d98=>{const _0xc965f3=_0x16b2b1;if(!SceneManager[_0xc965f3(0x7ed)]())return;const _0x2ffa09=$gameTemp[_0xc965f3(0x40b)](),_0x3c1766=BattleManager[_0xc965f3(0x5e0)],_0x34b50e=BattleManager[_0xc965f3(0x8ff)],_0x4cf792=BattleManager[_0xc965f3(0x629)];if(!_0x2ffa09||!_0x3c1766||!_0x34b50e)return;if(!_0x3c1766[_0xc965f3(0x3e3)]())return;_0x4cf792[_0xc965f3(0x452)](_0x34b50e,_0x3c1766[_0xc965f3(0x3e3)]()),_0x2ffa09[_0xc965f3(0x384)](_0xc965f3(0x5d9));}),PluginManager[_0x16b2b1(0x289)](pluginData['name'],'ActSeq_BattleLog_PopBaseLine',_0xb09df6=>{const _0x12ea43=_0x16b2b1;if(!SceneManager[_0x12ea43(0x7ed)]())return;const _0x208572=BattleManager['_logWindow'];_0x208572[_0x12ea43(0x36f)]();}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x1e9),_0x308675=>{const _0x5fa307=_0x16b2b1;if(!SceneManager[_0x5fa307(0x7ed)]())return;const _0x212747=BattleManager[_0x5fa307(0x629)];_0x212747['pushBaseLine']();}),PluginManager[_0x16b2b1(0x289)](pluginData['name'],_0x16b2b1(0x255),_0x1d741e=>{const _0x42921e=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;const _0x274451=BattleManager[_0x42921e(0x629)];_0x274451[_0x42921e(0x388)]();}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x191),_0xf9e95=>{const _0x2ca0fb=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x2ca0fb(0x874)](_0xf9e95,_0xf9e95),SceneManager['_scene']['setVisibleUI'](_0xf9e95[_0x2ca0fb(0x828)]);}),PluginManager[_0x16b2b1(0x289)](pluginData['name'],_0x16b2b1(0x65f),_0x35e4b5=>{const _0x43dfae=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;const _0x17c51d=$gameTemp[_0x43dfae(0x40b)]();_0x17c51d['setWaitMode']('battlelog');}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],'ActSeq_BattleLog_WaitForNewLine',_0x361af4=>{if(!SceneManager['isSceneBattle']())return;const _0x448803=$gameTemp['getLastPluginCommandInterpreter'](),_0x4dbc75=BattleManager['_logWindow'];_0x4dbc75['waitForNewLine'](),_0x448803['setWaitMode']('battlelog');}),PluginManager['registerCommand'](pluginData['name'],_0x16b2b1(0x853),_0x532765=>{const _0x26acb7=_0x16b2b1;if(!SceneManager[_0x26acb7(0x7ed)]())return;if(!Imported[_0x26acb7(0x936)])return;VisuMZ['ConvertParams'](_0x532765,_0x532765);const _0xa2b590=$gameScreen[_0x26acb7(0x711)]();_0xa2b590[_0x26acb7(0x25c)]=_0x532765['Setting'];}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x2d9),_0xe91f08=>{const _0xa5e1d5=_0x16b2b1;if(!SceneManager[_0xa5e1d5(0x7ed)]())return;if(!Imported[_0xa5e1d5(0x936)])return;VisuMZ[_0xa5e1d5(0x874)](_0xe91f08,_0xe91f08);const _0x344aaf=$gameTemp[_0xa5e1d5(0x40b)](),_0x5b3933=_0xe91f08[_0xa5e1d5(0x3d1)];$gameScreen[_0xa5e1d5(0x7b4)](_0xe91f08['FocusX'],_0xe91f08[_0xa5e1d5(0x81c)],_0xe91f08['Duration'],_0xe91f08[_0xa5e1d5(0x44a)]);if(_0x5b3933)_0x344aaf[_0xa5e1d5(0x384)](_0xa5e1d5(0x60b));}),PluginManager['registerCommand'](pluginData[_0x16b2b1(0x802)],'ActSeq_Camera_FocusTarget',_0x423af7=>{const _0x1e5b4c=_0x16b2b1;if(!SceneManager[_0x1e5b4c(0x7ed)]())return;if(!Imported[_0x1e5b4c(0x936)])return;VisuMZ[_0x1e5b4c(0x874)](_0x423af7,_0x423af7);const _0xf57698=$gameTemp[_0x1e5b4c(0x40b)](),_0x3ca7fc=VisuMZ[_0x1e5b4c(0x6d7)](_0x423af7[_0x1e5b4c(0x85c)]),_0x300015=_0x423af7[_0x1e5b4c(0x3d1)];$gameScreen[_0x1e5b4c(0x7ce)](_0x3ca7fc,_0x423af7[_0x1e5b4c(0x735)],_0x423af7[_0x1e5b4c(0x44a)]);if(_0x300015)_0xf57698[_0x1e5b4c(0x384)](_0x1e5b4c(0x60b));}),PluginManager['registerCommand'](pluginData['name'],_0x16b2b1(0x8b0),_0x37977d=>{const _0x2c5427=_0x16b2b1;if(!SceneManager[_0x2c5427(0x7ed)]())return;if(!Imported[_0x2c5427(0x936)])return;VisuMZ[_0x2c5427(0x874)](_0x37977d,_0x37977d);const _0xf02125=$gameTemp['getLastPluginCommandInterpreter'](),_0x46d513=_0x37977d[_0x2c5427(0x3d1)];$gameScreen[_0x2c5427(0x647)](_0x37977d['OffsetX'],_0x37977d['OffsetY'],_0x37977d['Duration'],_0x37977d[_0x2c5427(0x44a)]);if(_0x46d513)_0xf02125[_0x2c5427(0x384)]('battleCamera');}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x714),_0x451922=>{const _0x3dd49c=_0x16b2b1;if(!SceneManager[_0x3dd49c(0x7ed)]())return;if(!Imported[_0x3dd49c(0x936)])return;VisuMZ[_0x3dd49c(0x874)](_0x451922,_0x451922);const _0x5f0126=$gameTemp[_0x3dd49c(0x40b)](),_0x564626=_0x451922[_0x3dd49c(0x274)],_0x54d8c2=_0x451922['ResetOffset'],_0x53b60e=_0x451922[_0x3dd49c(0x3d1)];if(_0x564626){const _0x40f70d=Math[_0x3dd49c(0x855)](Graphics[_0x3dd49c(0x20c)]/0x2),_0x1b73ac=Math[_0x3dd49c(0x855)](Graphics['height']/0x2);$gameScreen[_0x3dd49c(0x7b4)](_0x40f70d,_0x1b73ac,_0x451922[_0x3dd49c(0x735)],_0x451922['EasingType']);}_0x54d8c2&&$gameScreen[_0x3dd49c(0x647)](0x0,0x0,_0x451922['Duration'],_0x451922['EasingType']);if(_0x53b60e)_0x5f0126[_0x3dd49c(0x384)](_0x3dd49c(0x60b));}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],'ActSeq_Camera_WaitForCamera',_0x13f7b3=>{const _0x4af4f0=_0x16b2b1;if(!SceneManager[_0x4af4f0(0x7ed)]())return;if(!Imported[_0x4af4f0(0x936)])return;const _0xc95f24=$gameTemp[_0x4af4f0(0x40b)]();if(!_0xc95f24)return;_0xc95f24['setWaitMode'](_0x4af4f0(0x60b));}),PluginManager[_0x16b2b1(0x289)](pluginData['name'],_0x16b2b1(0x35e),_0x2e1ff0=>{const _0x3ce227=_0x16b2b1;if(!SceneManager[_0x3ce227(0x7ed)]())return;if(!Imported['VisuMZ_2_DragonbonesUnion'])return;VisuMZ[_0x3ce227(0x874)](_0x2e1ff0,_0x2e1ff0);const _0x9d84f2=VisuMZ[_0x3ce227(0x6d7)](_0x2e1ff0['Targets']),_0xc65b11=_0x2e1ff0[_0x3ce227(0x7e8)][_0x3ce227(0x70a)]()[_0x3ce227(0x7bc)]();for(const _0x19626a of _0x9d84f2){if(!_0x19626a)continue;_0x19626a[_0x3ce227(0x5a9)](_0xc65b11);}}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x8e9),_0x11b21e=>{const _0x430782=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x430782(0x205)])return;VisuMZ['ConvertParams'](_0x11b21e,_0x11b21e);const _0x572e76=VisuMZ[_0x430782(0x6d7)](_0x11b21e['Targets']),_0x3eb964=_0x11b21e['TimeScale'];for(const _0x5263b1 of _0x572e76){if(!_0x5263b1)continue;_0x5263b1[_0x430782(0x429)]()[_0x430782(0x2bc)]=_0x3eb964;}}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x69f),_0x217f7d=>{const _0x1ea8a3=_0x16b2b1;if(!SceneManager[_0x1ea8a3(0x7ed)]())return;if(!Imported[_0x1ea8a3(0x859)])return;VisuMZ['ConvertParams'](_0x217f7d,_0x217f7d);const _0x4f4e0a=BattleManager[_0x1ea8a3(0x5e0)],_0x456941=_0x217f7d['Elements'];if(!_0x4f4e0a)return;_0x4f4e0a[_0x1ea8a3(0x1ee)]=_0x456941;}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x717),_0x4565dd=>{const _0x9a9bdc=_0x16b2b1;if(!SceneManager[_0x9a9bdc(0x7ed)]())return;if(!Imported[_0x9a9bdc(0x859)])return;const _0x3ad41d=BattleManager[_0x9a9bdc(0x5e0)];if(!_0x3ad41d)return;_0x3ad41d['clearElementChanges']();}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x6fd),_0x32c93f=>{const _0x159a83=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;if(!Imported['VisuMZ_1_ElementStatusCore'])return;VisuMZ[_0x159a83(0x874)](_0x32c93f,_0x32c93f);const _0x55194f=BattleManager[_0x159a83(0x5e0)],_0x581ad3=_0x32c93f[_0x159a83(0x6bd)];if(!_0x55194f)return;_0x55194f[_0x159a83(0x3a1)]=_0x581ad3;}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x8d8),_0x516447=>{const _0x205139=_0x16b2b1;if(!SceneManager[_0x205139(0x7ed)]())return;if(!Imported['VisuMZ_1_ElementStatusCore'])return;const _0x19b7f2=BattleManager[_0x205139(0x5e0)];if(!_0x19b7f2)return;_0x19b7f2[_0x205139(0x72a)]=!![];}),PluginManager[_0x16b2b1(0x289)](pluginData['name'],_0x16b2b1(0x62b),_0x1f5ff5=>{const _0x5d8b59=_0x16b2b1;if(!Imported[_0x5d8b59(0x328)])return;if(!SceneManager[_0x5d8b59(0x7ed)]())return;VisuMZ[_0x5d8b59(0x874)](_0x1f5ff5,_0x1f5ff5);const _0x5d4a49=VisuMZ[_0x5d8b59(0x6d7)](_0x1f5ff5[_0x5d8b59(0x85c)]);for(const _0x2e65a3 of _0x5d4a49){if(!_0x2e65a3)continue;_0x2e65a3[_0x5d8b59(0x360)](_0x5d8b59(0x7c1)),_0x2e65a3[_0x5d8b59(0x360)](_0x5d8b59(0x477)),_0x2e65a3[_0x5d8b59(0x360)]('tv'),_0x2e65a3[_0x5d8b59(0x6c5)]();}$gamePlayer[_0x5d8b59(0x388)]();}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x528),_0x335361=>{const _0x10190a=_0x16b2b1;if(!Imported['VisuMZ_2_HorrorEffects'])return;if(!SceneManager[_0x10190a(0x7ed)]())return;VisuMZ['ConvertParams'](_0x335361,_0x335361);const _0x102354=VisuMZ[_0x10190a(0x6d7)](_0x335361['Targets']),_0x112ac8=_0x10190a(0x477);_0x335361[_0x10190a(0x4c9)]=Math[_0x10190a(0x7ba)](_0x335361[_0x10190a(0x2ea)]/0x2),_0x335361[_0x10190a(0x4df)]=_0x335361[_0x10190a(0x2ea)],_0x335361['refreshRequest']=!![];for(const _0x407887 of _0x102354){if(!_0x407887)continue;_0x407887[_0x10190a(0x18f)](_0x112ac8,_0x335361);}$gamePlayer[_0x10190a(0x388)]();}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],'ActSeq_Horror_GlitchRemove',_0x8ee921=>{const _0x592396=_0x16b2b1;if(!Imported[_0x592396(0x328)])return;if(!SceneManager[_0x592396(0x7ed)]())return;VisuMZ[_0x592396(0x874)](_0x8ee921,_0x8ee921);const _0x3e3363=VisuMZ[_0x592396(0x6d7)](_0x8ee921[_0x592396(0x85c)]);for(const _0x318528 of _0x3e3363){if(!_0x318528)continue;_0x318528[_0x592396(0x360)]('glitch');}$gamePlayer[_0x592396(0x388)]();}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],'ActSeq_Horror_NoiseCreate',_0x4822d0=>{const _0x3b4666=_0x16b2b1;if(!Imported[_0x3b4666(0x328)])return;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x3b4666(0x874)](_0x4822d0,_0x4822d0);const _0x4937a2=VisuMZ['CreateActionSequenceTargets'](_0x4822d0[_0x3b4666(0x85c)]),_0x33cbb5=_0x3b4666(0x7c1);for(const _0x56cf62 of _0x4937a2){if(!_0x56cf62)continue;_0x56cf62[_0x3b4666(0x18f)](_0x33cbb5,_0x4822d0);}$gamePlayer[_0x3b4666(0x388)]();}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],'ActSeq_Horror_NoiseRemove',_0x18c41e=>{const _0x1c6e8c=_0x16b2b1;if(!Imported[_0x1c6e8c(0x328)])return;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x18c41e,_0x18c41e);const _0x172920=VisuMZ[_0x1c6e8c(0x6d7)](_0x18c41e[_0x1c6e8c(0x85c)]);for(const _0x306fff of _0x172920){if(!_0x306fff)continue;_0x306fff['removeHorrorEffect'](_0x1c6e8c(0x7c1));}$gamePlayer['refresh']();}),PluginManager['registerCommand'](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x1a1),_0x43b57a=>{const _0x385ecd=_0x16b2b1;if(!Imported[_0x385ecd(0x328)])return;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x385ecd(0x874)](_0x43b57a,_0x43b57a);const _0x272e14=VisuMZ['CreateActionSequenceTargets'](_0x43b57a[_0x385ecd(0x85c)]),_0x249954='tv';for(const _0x1beaa0 of _0x272e14){if(!_0x1beaa0)continue;_0x1beaa0[_0x385ecd(0x18f)](_0x249954,_0x43b57a);}$gamePlayer['refresh']();}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x6a4),_0x146dc4=>{const _0x3020ae=_0x16b2b1;if(!Imported[_0x3020ae(0x328)])return;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x3020ae(0x874)](_0x146dc4,_0x146dc4);const _0x82c5c6=VisuMZ[_0x3020ae(0x6d7)](_0x146dc4[_0x3020ae(0x85c)]);for(const _0x17bd2b of _0x82c5c6){if(!_0x17bd2b)continue;_0x17bd2b['removeHorrorEffect']('tv');}$gamePlayer['refresh']();}),PluginManager['registerCommand'](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x961),_0x41b44=>{const _0x20389d=_0x16b2b1;if(!SceneManager[_0x20389d(0x7ed)]())return;if(!Imported[_0x20389d(0x511)])return;const _0x195490=SceneManager['_scene'][_0x20389d(0x7d7)];if(!_0x195490)return;VisuMZ[_0x20389d(0x874)](_0x41b44,_0x41b44);const _0x1d6dbd=_0x41b44[_0x20389d(0x272)]||0x1,_0x405a70=_0x41b44['Duration']||0x1,_0x4f981b=_0x41b44[_0x20389d(0x44a)]||'Linear';_0x195490[_0x20389d(0x948)](_0x1d6dbd,_0x405a70,_0x4f981b);}),PluginManager['registerCommand'](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x427),_0x4db8bb=>{const _0x42a363=_0x16b2b1;if(!SceneManager[_0x42a363(0x7ed)]())return;if(!Imported[_0x42a363(0x511)])return;const _0x513472=SceneManager['_scene'][_0x42a363(0x7d7)];if(!_0x513472)return;VisuMZ[_0x42a363(0x874)](_0x4db8bb,_0x4db8bb);const _0x7c7893=Number(_0x4db8bb[_0x42a363(0x267)])||0x0,_0x2089a2=Number(_0x4db8bb[_0x42a363(0x34b)]),_0x51801b=_0x4db8bb[_0x42a363(0x735)]||0x1,_0x3087ea=_0x4db8bb[_0x42a363(0x44a)]||_0x42a363(0x1ed);_0x513472[_0x42a363(0x2f2)](_0x7c7893,_0x2089a2,_0x51801b,_0x3087ea);}),PluginManager['registerCommand'](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x91e),_0x45b5d7=>{const _0x3b8519=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x3b8519(0x511)])return;const _0x5c7ed7=SceneManager[_0x3b8519(0x6b0)]['_spriteset'];if(!_0x5c7ed7)return;VisuMZ[_0x3b8519(0x874)](_0x45b5d7,_0x45b5d7);const _0x45a763=Number(_0x45b5d7[_0x3b8519(0x267)])||0x0,_0x42c78c=Number(_0x45b5d7[_0x3b8519(0x34b)]),_0x610f60=_0x45b5d7[_0x3b8519(0x735)]||0x1,_0x539bf6=_0x45b5d7[_0x3b8519(0x44a)]||_0x3b8519(0x1ed),_0x23a110=VisuMZ['CreateActionSequenceTargets'](_0x45b5d7[_0x3b8519(0x85c)]);for(const _0x1a93de of _0x23a110){if(!_0x1a93de)continue;if(!_0x1a93de['battler']())continue;_0x1a93de[_0x3b8519(0x4e0)]()[_0x3b8519(0x2f2)](_0x45a763,_0x42c78c,_0x610f60,_0x539bf6);}}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],'ActSeq_Impact_MotionTrailCreate',_0x10a705=>{const _0x211cb0=_0x16b2b1;if(!SceneManager[_0x211cb0(0x7ed)]())return;if(!Imported['VisuMZ_3_ActSeqImpact'])return;VisuMZ['ConvertParams'](_0x10a705,_0x10a705);const _0x486bde={'delay':_0x10a705[_0x211cb0(0x4a1)],'duration':_0x10a705[_0x211cb0(0x95c)],'hue':_0x10a705[_0x211cb0(0x40c)],'opacityStart':_0x10a705['opacityStart'],'tone':_0x10a705[_0x211cb0(0x480)],'visible':!![]},_0x317a4f=VisuMZ['CreateActionSequenceTargets'](_0x10a705[_0x211cb0(0x85c)]);for(const _0xcc11fc of _0x317a4f){if(!_0xcc11fc)continue;_0xcc11fc['setBattlerMotionTrailData'](_0x486bde);}}),PluginManager[_0x16b2b1(0x289)](pluginData['name'],_0x16b2b1(0x6e5),_0x28d236=>{const _0x5cc3a9=_0x16b2b1;if(!SceneManager[_0x5cc3a9(0x7ed)]())return;if(!Imported[_0x5cc3a9(0x511)])return;VisuMZ[_0x5cc3a9(0x874)](_0x28d236,_0x28d236);const _0x42ab18=VisuMZ[_0x5cc3a9(0x6d7)](_0x28d236[_0x5cc3a9(0x85c)]);for(const _0xaa45ca of _0x42ab18){if(!_0xaa45ca)continue;_0xaa45ca[_0x5cc3a9(0x67c)]();}}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x92f),_0xf021c8=>{const _0x1536f7=_0x16b2b1;if(!Imported[_0x1536f7(0x511)])return;const _0x4d9acc=SceneManager[_0x1536f7(0x6b0)]['_spriteset'];if(!_0x4d9acc)return;VisuMZ[_0x1536f7(0x874)](_0xf021c8,_0xf021c8);const _0x15ffad=_0xf021c8['X']||0x0,_0x135b8f=_0xf021c8['Y']||0x0,_0x570706=_0xf021c8[_0x1536f7(0x7f5)]||0x0,_0x1cca89=_0xf021c8[_0x1536f7(0x347)]||0x0,_0x4a6860=_0xf021c8[_0x1536f7(0x735)]||0x1;_0x4d9acc[_0x1536f7(0x586)](_0x15ffad,_0x135b8f,_0x570706,_0x1cca89,_0x4a6860);}),PluginManager[_0x16b2b1(0x289)](pluginData['name'],_0x16b2b1(0x417),_0x93bee5=>{const _0x4a04d6=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;if(!Imported['VisuMZ_3_ActSeqImpact'])return;const _0x22929a=SceneManager[_0x4a04d6(0x6b0)][_0x4a04d6(0x7d7)];if(!_0x22929a)return;VisuMZ[_0x4a04d6(0x874)](_0x93bee5,_0x93bee5);const _0x522ec0=VisuMZ[_0x4a04d6(0x6d7)](_0x93bee5['Targets']),_0x59a076=_0x93bee5[_0x4a04d6(0x70f)],_0x506080=_0x93bee5['OffsetX']||0x0,_0x509f39=_0x93bee5['OffsetY']||0x0,_0x111c2d=_0x93bee5[_0x4a04d6(0x7f5)]||0x0,_0x2435ca=_0x93bee5[_0x4a04d6(0x347)]||0x0,_0x513db2=_0x93bee5[_0x4a04d6(0x735)]||0x1;for(const _0x687023 of _0x522ec0){if(!_0x687023)continue;if(!_0x687023[_0x4a04d6(0x4e0)]())continue;const _0x2452f8=_0x687023[_0x4a04d6(0x4e0)]();let _0x46dd43=_0x2452f8[_0x4a04d6(0x5f5)],_0x37be33=_0x2452f8[_0x4a04d6(0x19e)];_0x46dd43+=(Graphics['width']-Graphics['boxWidth'])/0x2,_0x37be33+=(Graphics[_0x4a04d6(0x86c)]-Graphics['boxHeight'])/0x2;if(_0x59a076['match'](/front/i))_0x46dd43+=(_0x687023['isEnemy']()?0x1:-0x1)*_0x2452f8[_0x4a04d6(0x498)]()/0x2;else _0x59a076[_0x4a04d6(0x6ef)](/back/i)&&(_0x46dd43+=(_0x687023[_0x4a04d6(0x73f)]()?-0x1:0x1)*_0x2452f8[_0x4a04d6(0x498)]()/0x2);if(_0x59a076[_0x4a04d6(0x6ef)](/head/i))_0x37be33-=_0x2452f8['mainSpriteHeight']();else _0x59a076[_0x4a04d6(0x6ef)](/center/i)&&(_0x37be33-=_0x2452f8['mainSpriteHeight']()/0x2);_0x46dd43+=_0x506080,_0x37be33+=_0x509f39,_0x22929a[_0x4a04d6(0x586)](_0x46dd43,_0x37be33,_0x111c2d,_0x2435ca,_0x513db2);}}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],'ActSeq_Impact_ShockwaveCenterTargets',_0x1ec67b=>{const _0x19bf2d=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x19bf2d(0x511)])return;const _0x43a17d=SceneManager[_0x19bf2d(0x6b0)][_0x19bf2d(0x7d7)];if(!_0x43a17d)return;VisuMZ[_0x19bf2d(0x874)](_0x1ec67b,_0x1ec67b);const _0x187b02=VisuMZ[_0x19bf2d(0x6d7)](_0x1ec67b[_0x19bf2d(0x85c)]),_0x92b892=_0x1ec67b[_0x19bf2d(0x70f)],_0x3d69d4=_0x1ec67b[_0x19bf2d(0x318)]||0x0,_0x5745d1=_0x1ec67b[_0x19bf2d(0x555)]||0x0,_0x1d98d3=_0x1ec67b[_0x19bf2d(0x7f5)]||0x0,_0x3c0325=_0x1ec67b[_0x19bf2d(0x347)]||0x0,_0x21bbe4=_0x1ec67b['Duration']||0x1,_0x69a6e0=Math[_0x19bf2d(0x537)](..._0x187b02[_0x19bf2d(0x5b1)](_0xdd2f17=>_0xdd2f17['battler']()[_0x19bf2d(0x5f5)]-_0xdd2f17[_0x19bf2d(0x4e0)]()[_0x19bf2d(0x498)]()/0x2)),_0x2fb47e=Math[_0x19bf2d(0x6fa)](..._0x187b02[_0x19bf2d(0x5b1)](_0x35927f=>_0x35927f['battler']()[_0x19bf2d(0x5f5)]+_0x35927f['battler']()[_0x19bf2d(0x498)]()/0x2)),_0x1431af=Math[_0x19bf2d(0x537)](..._0x187b02[_0x19bf2d(0x5b1)](_0xfd3217=>_0xfd3217[_0x19bf2d(0x4e0)]()[_0x19bf2d(0x19e)]-_0xfd3217[_0x19bf2d(0x4e0)]()[_0x19bf2d(0x380)]())),_0x120fe6=Math[_0x19bf2d(0x6fa)](..._0x187b02[_0x19bf2d(0x5b1)](_0x1c680b=>_0x1c680b[_0x19bf2d(0x4e0)]()[_0x19bf2d(0x19e)])),_0x39a27b=_0x187b02[_0x19bf2d(0x1a0)](_0x26d99a=>_0x26d99a[_0x19bf2d(0x68f)]())[_0x19bf2d(0x7d1)],_0x41a161=_0x187b02[_0x19bf2d(0x1a0)](_0x343d34=>_0x343d34['isEnemy']())[_0x19bf2d(0x7d1)];let _0x1554a1=0x0,_0x13ad56=0x0;if(_0x92b892['match'](/front/i))_0x1554a1=_0x39a27b>=_0x41a161?_0x69a6e0:_0x2fb47e;else{if(_0x92b892[_0x19bf2d(0x6ef)](/middle/i))_0x1554a1=(_0x69a6e0+_0x2fb47e)/0x2,melee=-0x1;else _0x92b892[_0x19bf2d(0x6ef)](/back/i)&&(_0x1554a1=_0x39a27b>=_0x41a161?_0x2fb47e:_0x69a6e0);}if(_0x92b892['match'](/head/i))_0x13ad56=_0x1431af;else{if(_0x92b892[_0x19bf2d(0x6ef)](/center/i))_0x13ad56=(_0x1431af+_0x120fe6)/0x2;else _0x92b892[_0x19bf2d(0x6ef)](/base/i)&&(_0x13ad56=_0x120fe6);}_0x1554a1+=(Graphics[_0x19bf2d(0x20c)]-Graphics[_0x19bf2d(0x2af)])/0x2,_0x13ad56+=(Graphics['height']-Graphics[_0x19bf2d(0x582)])/0x2,_0x1554a1+=_0x3d69d4,_0x13ad56+=_0x5745d1,_0x43a17d[_0x19bf2d(0x586)](_0x1554a1,_0x13ad56,_0x1d98d3,_0x3c0325,_0x21bbe4);}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x33a),_0x36529f=>{const _0x43e34e=_0x16b2b1;if(!Imported['VisuMZ_3_ActSeqImpact'])return;const _0x20bdd1=SceneManager['_scene'][_0x43e34e(0x7d7)];if(!_0x20bdd1)return;VisuMZ[_0x43e34e(0x874)](_0x36529f,_0x36529f);const _0x27e8a3=_0x36529f['X']||0x0,_0x4ad988=_0x36529f['Y']||0x0,_0x43fe8d=_0x36529f['Strength']||0x0,_0x545bac=_0x36529f['Radius']||0x0,_0x296fe1=_0x36529f[_0x43e34e(0x735)]||0x1,_0x134656=_0x36529f[_0x43e34e(0x44a)]||_0x43e34e(0x1ed);_0x20bdd1[_0x43e34e(0x551)](_0x43fe8d,_0x27e8a3,_0x4ad988,_0x545bac,_0x296fe1,_0x134656);}),PluginManager['registerCommand'](pluginData[_0x16b2b1(0x802)],'ActSeq_Impact_ZoomBlurTargetCenter',_0x425260=>{const _0xc81dce=_0x16b2b1;if(!Imported[_0xc81dce(0x511)])return;const _0x19edd4=SceneManager['_scene']['_spriteset'];if(!_0x19edd4)return;VisuMZ['ConvertParams'](_0x425260,_0x425260);const _0xb2393c=VisuMZ[_0xc81dce(0x6d7)](_0x425260[_0xc81dce(0x85c)]),_0x3544de=_0x425260['TargetLocation'],_0x3471d2=_0x425260[_0xc81dce(0x318)]||0x0,_0x4eff11=_0x425260[_0xc81dce(0x555)]||0x0,_0x21159f=_0x425260[_0xc81dce(0x4e1)]||0x0,_0x1aed95=_0x425260['Radius']||0x0,_0x1eaf60=_0x425260['Duration']||0x1,_0x5c2bf5=_0x425260[_0xc81dce(0x44a)]||_0xc81dce(0x1ed),_0x798ae7=Math[_0xc81dce(0x537)](..._0xb2393c[_0xc81dce(0x5b1)](_0x1ac8ac=>_0x1ac8ac[_0xc81dce(0x4e0)]()['_baseX']-_0x1ac8ac[_0xc81dce(0x4e0)]()[_0xc81dce(0x498)]()/0x2)),_0x14865d=Math[_0xc81dce(0x6fa)](..._0xb2393c[_0xc81dce(0x5b1)](_0x20a45e=>_0x20a45e[_0xc81dce(0x4e0)]()[_0xc81dce(0x5f5)]+_0x20a45e[_0xc81dce(0x4e0)]()[_0xc81dce(0x498)]()/0x2)),_0x46f350=Math[_0xc81dce(0x537)](..._0xb2393c[_0xc81dce(0x5b1)](_0x44bb54=>_0x44bb54[_0xc81dce(0x4e0)]()['_baseY']-_0x44bb54[_0xc81dce(0x4e0)]()[_0xc81dce(0x380)]())),_0x3a93e3=Math[_0xc81dce(0x6fa)](..._0xb2393c[_0xc81dce(0x5b1)](_0x153afd=>_0x153afd[_0xc81dce(0x4e0)]()[_0xc81dce(0x19e)])),_0x3c3ec5=_0xb2393c[_0xc81dce(0x1a0)](_0x11cc5c=>_0x11cc5c[_0xc81dce(0x68f)]())[_0xc81dce(0x7d1)],_0xe2b43c=_0xb2393c['filter'](_0x3c6a0c=>_0x3c6a0c[_0xc81dce(0x73f)]())[_0xc81dce(0x7d1)];let _0x20b331=0x0,_0x31bf98=0x0;if(_0x3544de['match'](/front/i))_0x20b331=_0x3c3ec5>=_0xe2b43c?_0x798ae7:_0x14865d;else{if(_0x3544de['match'](/middle/i))_0x20b331=(_0x798ae7+_0x14865d)/0x2,melee=-0x1;else _0x3544de['match'](/back/i)&&(_0x20b331=_0x3c3ec5>=_0xe2b43c?_0x14865d:_0x798ae7);}if(_0x3544de[_0xc81dce(0x6ef)](/head/i))_0x31bf98=_0x46f350;else{if(_0x3544de[_0xc81dce(0x6ef)](/center/i))_0x31bf98=(_0x46f350+_0x3a93e3)/0x2;else _0x3544de[_0xc81dce(0x6ef)](/base/i)&&(_0x31bf98=_0x3a93e3);}_0x20b331+=(Graphics[_0xc81dce(0x20c)]-Graphics[_0xc81dce(0x2af)])/0x2,_0x31bf98+=(Graphics['height']-Graphics[_0xc81dce(0x582)])/0x2,_0x20b331+=_0x3471d2,_0x31bf98+=_0x4eff11,_0x19edd4['setupZoomBlurImpactFilter'](_0x21159f,_0x20b331,_0x31bf98,_0x1aed95,_0x1eaf60,_0x5c2bf5);}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x58e),_0x2c9f07=>{const _0x487747=_0x16b2b1;if(!SceneManager[_0x487747(0x7ed)]())return;VisuMZ[_0x487747(0x874)](_0x2c9f07,_0x2c9f07);const _0x37d855=$gameTemp[_0x487747(0x40b)](),_0x49892c=BattleManager['_action'],_0x31b23e=BattleManager[_0x487747(0x8ff)],_0x21b82b=BattleManager[_0x487747(0x629)];if(!_0x37d855||!_0x49892c||!_0x31b23e)return;if(!_0x49892c[_0x487747(0x3e3)]())return;const _0x807d54=VisuMZ['CreateActionSequenceTargets'](_0x2c9f07[_0x487747(0x85c)]);for(const _0x3dcbf0 of _0x807d54){if(!_0x3dcbf0)continue;_0x21b82b['push'](_0x487747(0x23e),_0x31b23e,_0x3dcbf0);}_0x37d855[_0x487747(0x384)](_0x487747(0x5d9));}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x82e),_0x38f5d9=>{const _0x369db3=_0x16b2b1;if(!SceneManager[_0x369db3(0x7ed)]())return;VisuMZ['ConvertParams'](_0x38f5d9,_0x38f5d9);const _0x15c4a1=['MAXHP',_0x369db3(0x724),'ATK','DEF','MAT',_0x369db3(0x1ab),_0x369db3(0x7f9),_0x369db3(0x2a6)],_0x458d61=_0x38f5d9['Buffs'],_0x3ee28a=_0x38f5d9[_0x369db3(0x64e)],_0x4e5819=_0x38f5d9[_0x369db3(0x389)],_0x36c389=VisuMZ['CreateActionSequenceTargets'](_0x38f5d9[_0x369db3(0x85c)]);for(const _0x54670e of _0x36c389){if(!_0x54670e)continue;for(const _0x5dc402 of _0x458d61){const _0x5641c7=_0x15c4a1[_0x369db3(0x925)](_0x5dc402['toUpperCase']()[_0x369db3(0x7bc)]());_0x5641c7>=0x0&&_0x5641c7<=0x7&&_0x54670e[_0x369db3(0x6f4)](_0x5641c7,_0x4e5819);}for(const _0x6b227b of _0x3ee28a){const _0x425888=_0x15c4a1[_0x369db3(0x925)](_0x6b227b['toUpperCase']()[_0x369db3(0x7bc)]());_0x425888>=0x0&&_0x425888<=0x7&&_0x54670e[_0x369db3(0x545)](_0x425888,_0x4e5819);}}}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x4f3),_0x245b34=>{const _0x3326b2=_0x16b2b1;if(!SceneManager[_0x3326b2(0x7ed)]())return;VisuMZ[_0x3326b2(0x874)](_0x245b34,_0x245b34);const _0x538fa3=_0x245b34[_0x3326b2(0x955)],_0x175447=VisuMZ['CreateActionSequenceTargets'](_0x245b34[_0x3326b2(0x85c)]);for(const _0x3e386f of _0x175447){if(!_0x3e386f)continue;for(const _0x138499 of _0x538fa3){_0x3e386f[_0x3326b2(0x8f1)](_0x138499);}}}),PluginManager['registerCommand'](pluginData['name'],_0x16b2b1(0x333),_0x16151e=>{const _0x38025f=_0x16b2b1;if(!SceneManager[_0x38025f(0x7ed)]())return;VisuMZ[_0x38025f(0x874)](_0x16151e,_0x16151e);const _0x23da06=BattleManager['_action'],_0x3b0876={'arPenRate':_0x16151e[_0x38025f(0x4f6)],'arPenFlat':_0x16151e['ArPenFlat'],'arRedRate':_0x16151e[_0x38025f(0x7f8)],'arRedFlat':_0x16151e['ArRedFlat']};_0x23da06[_0x38025f(0x834)]=_0x3b0876;}),PluginManager[_0x16b2b1(0x289)](pluginData['name'],'ActSeq_Mechanics_AnalyzeWeakness',_0x379aaf=>{const _0x73356b=_0x16b2b1;if(!SceneManager[_0x73356b(0x7ed)]())return;if(!Imported['VisuMZ_3_WeaknessDisplay'])return;VisuMZ['ConvertParams'](_0x379aaf,_0x379aaf);const _0x537158=VisuMZ[_0x73356b(0x6d7)](_0x379aaf[_0x73356b(0x85c)]),_0x50ebf2=_0x379aaf[_0x73356b(0x608)]||0x1;for(const _0x32f657 of _0x537158){if(!_0x32f657)continue;if(!_0x32f657['isEnemy']())continue;_0x32f657[_0x73356b(0x202)](_0x50ebf2);}}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x5d8),_0x174914=>{const _0x20d6ad=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x20d6ad(0x969)])return;VisuMZ[_0x20d6ad(0x874)](_0x174914,_0x174914);const _0x40461e=VisuMZ[_0x20d6ad(0x6d7)](_0x174914['Targets']),_0xe9e95=_0x174914[_0x20d6ad(0x593)],_0x43ad9c=_0x174914['ChargeRate'],_0x426686=_0x174914[_0x20d6ad(0x4de)];for(const _0x4c0af4 of _0x40461e){if(!_0x4c0af4)continue;if(_0x4c0af4['isAtbChargingState']())_0x4c0af4[_0x20d6ad(0x7a9)](_0xe9e95);else{if(_0x4c0af4['isAtbCastingState']()){_0x4c0af4[_0x20d6ad(0x720)](_0x43ad9c);if(_0x426686)_0x4c0af4[_0x20d6ad(0x943)]();}}}}),PluginManager[_0x16b2b1(0x289)](pluginData['name'],_0x16b2b1(0x8c9),_0x2dce5f=>{const _0xfc1b2a=_0x16b2b1;if(!SceneManager[_0xfc1b2a(0x7ed)]())return;if(!Imported['VisuMZ_3_BoostAction'])return;VisuMZ[_0xfc1b2a(0x874)](_0x2dce5f,_0x2dce5f);const _0xe3adbc=VisuMZ[_0xfc1b2a(0x6d7)](_0x2dce5f['Targets']),_0xaf2d04=_0x2dce5f[_0xfc1b2a(0x190)];for(const _0x3c34a1 of _0xe3adbc){if(!_0x3c34a1)continue;_0x3c34a1[_0xfc1b2a(0x48d)](_0xaf2d04);}}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Mechanics_BoostPointsStoreData',_0x6d79d2=>{const _0x41ace8=_0x16b2b1;if(!SceneManager[_0x41ace8(0x7ed)]())return;if(!Imported[_0x41ace8(0x256)])return;if(!BattleManager[_0x41ace8(0x8ff)])return;VisuMZ[_0x41ace8(0x874)](_0x6d79d2,_0x6d79d2);const _0x57b1a7=_0x6d79d2[_0x41ace8(0x8d3)];$gameVariables[_0x41ace8(0x69a)](_0x57b1a7,BattleManager[_0x41ace8(0x8ff)][_0x41ace8(0x660)]());}),PluginManager['registerCommand'](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x5aa),_0x51e9ce=>{const _0x83633=_0x16b2b1;if(!SceneManager[_0x83633(0x7ed)]())return;if(!Imported[_0x83633(0x54d)])return;VisuMZ[_0x83633(0x874)](_0x51e9ce,_0x51e9ce);const _0x528f8f=VisuMZ[_0x83633(0x6d7)](_0x51e9ce[_0x83633(0x85c)]),_0x14c31a=_0x51e9ce['BreakShields'];for(const _0x57178e of _0x528f8f){if(!_0x57178e)continue;if(_0x57178e[_0x83633(0x39b)]())continue;if(!_0x57178e[_0x83633(0x595)]())continue;_0x57178e[_0x83633(0x437)](_0x14c31a);}}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],'ActSeq_Mechanics_BreakShieldReset',_0x5cc79d=>{const _0x720858=_0x16b2b1;if(!SceneManager[_0x720858(0x7ed)]())return;if(!Imported[_0x720858(0x54d)])return;VisuMZ[_0x720858(0x874)](_0x5cc79d,_0x5cc79d);const _0x4a1e28=VisuMZ[_0x720858(0x6d7)](_0x5cc79d[_0x720858(0x85c)]);for(const _0x36692a of _0x4a1e28){if(!_0x36692a)continue;if(_0x36692a[_0x720858(0x39b)]())continue;if(!_0x36692a[_0x720858(0x595)]())continue;_0x36692a[_0x720858(0x75e)]();}}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x19a),_0x189e44=>{const _0x2717ff=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x2717ff(0x7e0)])return;VisuMZ[_0x2717ff(0x874)](_0x189e44,_0x189e44);const _0x266ec3=VisuMZ[_0x2717ff(0x6d7)](_0x189e44['Targets']),_0x31c135=_0x189e44[_0x2717ff(0x2a1)];for(const _0x5b1b16 of _0x266ec3){if(!_0x5b1b16)continue;_0x5b1b16['gainBravePoints'](_0x31c135);}}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x4f0),_0x355f14=>{const _0x404c35=_0x16b2b1;if(!SceneManager[_0x404c35(0x7ed)]())return;VisuMZ[_0x404c35(0x874)](_0x355f14,_0x355f14);const _0x120938=$gameTemp['getLastPluginCommandInterpreter'](),_0x10dc5a=BattleManager[_0x404c35(0x5e0)],_0x320598=BattleManager[_0x404c35(0x8ff)];if(!_0x120938||!_0x10dc5a||!_0x320598)return;if(!_0x10dc5a[_0x404c35(0x3e3)]())return;const _0x3854bf=VisuMZ[_0x404c35(0x6d7)](_0x355f14[_0x404c35(0x85c)]);for(const _0x2d65d6 of _0x3854bf){if(!_0x2d65d6)continue;_0x355f14[_0x404c35(0x779)]&&(_0x2d65d6['removeImmortal'](),_0x2d65d6['addState'](_0x2d65d6['deathStateId']())),_0x2d65d6[_0x404c35(0x94b)]()&&_0x2d65d6['performCollapse']();}_0x120938[_0x404c35(0x384)]('battleEffect');}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x54c),_0x40ee3d=>{const _0x599b0a=_0x16b2b1;if(!SceneManager[_0x599b0a(0x7ed)]())return;if(!Imported['VisuMZ_2_BattleSystemCTB'])return;VisuMZ['ConvertParams'](_0x40ee3d,_0x40ee3d);const _0x40ed64=VisuMZ[_0x599b0a(0x6d7)](_0x40ee3d['Targets']),_0x235848=_0x40ee3d['ChangeOrderBy'];for(const _0x2974ab of _0x40ed64){if(!_0x2974ab)continue;_0x2974ab[_0x599b0a(0x345)](_0x235848);}}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x41d),_0x269d29=>{const _0x53888d=_0x16b2b1;if(!SceneManager[_0x53888d(0x7ed)]())return;if(!Imported[_0x53888d(0x646)])return;VisuMZ[_0x53888d(0x874)](_0x269d29,_0x269d29);const _0x6f1736=VisuMZ['CreateActionSequenceTargets'](_0x269d29['Targets']),_0x2d78a7=_0x269d29[_0x53888d(0x593)],_0x3149ad=_0x269d29[_0x53888d(0x593)];for(const _0x40767f of _0x6f1736){if(!_0x40767f)continue;if(_0x40767f['_tpbState']==='charging')_0x40767f[_0x53888d(0x58c)](_0x2d78a7);else _0x40767f[_0x53888d(0x51c)]===_0x53888d(0x451)&&_0x40767f['changeCtbCastTime'](_0x3149ad);}}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],'ActSeq_Mechanics_CustomDmgFormula',_0x54e4af=>{const _0x1f38b2=_0x16b2b1;if(!SceneManager[_0x1f38b2(0x7ed)]())return;VisuMZ['ConvertParams'](_0x54e4af,_0x54e4af);const _0x3542da=BattleManager[_0x1f38b2(0x5e0)];if(!_0x3542da)return;let _0x2bccac=_0x54e4af['Formula'];_0x3542da[_0x1f38b2(0x843)](_0x2bccac);}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Mechanics_DamagePopup',_0x59a3b2=>{const _0xe818a1=_0x16b2b1;if(!SceneManager[_0xe818a1(0x7ed)]())return;VisuMZ['ConvertParams'](_0x59a3b2,_0x59a3b2);const _0x484e2e=VisuMZ[_0xe818a1(0x6d7)](_0x59a3b2['Targets']);for(const _0x460440 of _0x484e2e){if(!_0x460440)continue;if(_0x460440['shouldPopupDamage']())_0x460440[_0xe818a1(0x6f2)]();}}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],'ActSeq_Mechanics_DeathBreak',_0x3d307b=>{const _0x387b8d=_0x16b2b1;if(!SceneManager[_0x387b8d(0x7ed)]())return;VisuMZ[_0x387b8d(0x874)](_0x3d307b,_0x3d307b);const _0x46bd90=$gameTemp[_0x387b8d(0x40b)](),_0x564759=BattleManager[_0x387b8d(0x8ff)],_0x3dbd66=_0x3d307b[_0x387b8d(0x23b)];if(!_0x46bd90)return;if(!_0x564759)return;_0x564759&&_0x564759[_0x387b8d(0x8dc)]()&&_0x3dbd66['toUpperCase']()[_0x387b8d(0x7bc)]()!==_0x387b8d(0x643)&&_0x46bd90[_0x387b8d(0x87b)]([_0x3dbd66]);}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x6c4),_0x517063=>{const _0x4501ab=_0x16b2b1;if(!SceneManager[_0x4501ab(0x7ed)]())return;if(!Imported[_0x4501ab(0x75a)])return;VisuMZ['ConvertParams'](_0x517063,_0x517063);const _0x13474c=_0x517063[_0x4501ab(0x358)];BattleManager[_0x4501ab(0x8ff)]&&BattleManager[_0x4501ab(0x8ff)][_0x4501ab(0x411)]()[_0x4501ab(0x689)](_0x13474c);}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x95b),_0x1d7304=>{const _0x51f68f=_0x16b2b1;if(!SceneManager[_0x51f68f(0x7ed)]())return;VisuMZ[_0x51f68f(0x874)](_0x1d7304,_0x1d7304);const _0x5e7f3b=VisuMZ[_0x51f68f(0x6d7)](_0x1d7304[_0x51f68f(0x85c)]),_0x308821=_0x1d7304[_0x51f68f(0x2d4)],_0x305d94=_0x1d7304['HP_Flat'],_0x58fd81=_0x1d7304['MP_Rate'],_0x2a58f=_0x1d7304[_0x51f68f(0x314)],_0x24ea91=_0x1d7304[_0x51f68f(0x82c)],_0x18a78b=_0x1d7304[_0x51f68f(0x259)],_0x180179=_0x1d7304[_0x51f68f(0x6b8)];for(const _0x1cdaad of _0x5e7f3b){if(!_0x1cdaad)continue;const _0x5d2b9b=_0x1cdaad[_0x51f68f(0x526)](),_0x182c16=Math[_0x51f68f(0x855)](_0x308821*_0x1cdaad['mhp']+_0x305d94),_0x26f744=Math[_0x51f68f(0x855)](_0x58fd81*_0x1cdaad[_0x51f68f(0x858)]+_0x2a58f),_0x3089e7=Math[_0x51f68f(0x855)](_0x24ea91*_0x1cdaad[_0x51f68f(0x865)]()+_0x18a78b);if(_0x182c16!==0x0)_0x1cdaad[_0x51f68f(0x66b)](_0x182c16);if(_0x26f744!==0x0)_0x1cdaad['gainMp'](_0x26f744);if(_0x3089e7!==0x0)_0x1cdaad[_0x51f68f(0x7b9)](_0x3089e7);if(_0x180179)_0x1cdaad[_0x51f68f(0x6f2)]();_0x5d2b9b&&_0x1cdaad[_0x51f68f(0x8dc)]()&&_0x1cdaad[_0x51f68f(0x7c6)]();}}),PluginManager[_0x16b2b1(0x289)](pluginData['name'],'ActSeq_Mechanics_Immortal',_0x42b488=>{const _0x2830a2=_0x16b2b1;if(!SceneManager[_0x2830a2(0x7ed)]())return;VisuMZ[_0x2830a2(0x874)](_0x42b488,_0x42b488);const _0x4cf2e2=VisuMZ[_0x2830a2(0x6d7)](_0x42b488[_0x2830a2(0x85c)]);for(const _0x547ee9 of _0x4cf2e2){if(!_0x547ee9)continue;_0x547ee9['setImmortal'](_0x42b488[_0x2830a2(0x1c1)]);}}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x64a),_0x331be1=>{const _0x22cae7=_0x16b2b1;if(!SceneManager[_0x22cae7(0x7ed)]())return;VisuMZ[_0x22cae7(0x874)](_0x331be1,_0x331be1);const _0x21a92e=BattleManager[_0x22cae7(0x5e0)],_0x176b38={'criticalHitRate':_0x331be1[_0x22cae7(0x7fd)],'criticalHitFlat':_0x331be1[_0x22cae7(0x2b0)],'criticalDmgRate':_0x331be1['CriticalDmgRate'],'criticalDmgFlat':_0x331be1[_0x22cae7(0x67a)],'damageRate':_0x331be1[_0x22cae7(0x872)],'damageFlat':_0x331be1['DamageFlat'],'hitRate':_0x331be1[_0x22cae7(0x4fd)],'hitFlat':_0x331be1['HitFlat']};_0x21a92e['_multipliers']=_0x176b38;}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x29e),_0x5e0d54=>{const _0x2b5410=_0x16b2b1;if(!SceneManager[_0x2b5410(0x7ed)]())return;if(!Imported[_0x2b5410(0x670)])return;VisuMZ[_0x2b5410(0x874)](_0x5e0d54,_0x5e0d54);const _0x22edc4=VisuMZ[_0x2b5410(0x6d7)](_0x5e0d54[_0x2b5410(0x85c)]);for(const _0x3adcfa of _0x22edc4){if(!_0x3adcfa)continue;let _0x2d6a87=_0x5e0d54[_0x2b5410(0x76b)],_0x8670fc=_0x5e0d54['NextTurn'],_0x532a2d=_0x5e0d54[_0x2b5410(0x687)];BattleManager[_0x2b5410(0x710)]['includes'](_0x3adcfa)?_0x2d6a87+=_0x532a2d:_0x8670fc+=_0x532a2d,BattleManager[_0x2b5410(0x1f4)](_0x3adcfa,-_0x2d6a87,![]),BattleManager[_0x2b5410(0x1f4)](_0x3adcfa,-_0x8670fc,!![]);}}),PluginManager[_0x16b2b1(0x289)](pluginData['name'],'ActSeq_Mechanics_RemoveBuffDebuff',_0x173af8=>{const _0x3b6f0c=_0x16b2b1;if(!SceneManager[_0x3b6f0c(0x7ed)]())return;VisuMZ[_0x3b6f0c(0x874)](_0x173af8,_0x173af8);const _0x3260f2=[_0x3b6f0c(0x719),'MAXMP','ATK','DEF',_0x3b6f0c(0x4bc),_0x3b6f0c(0x1ab),_0x3b6f0c(0x7f9),_0x3b6f0c(0x2a6)],_0x3cea70=_0x173af8['Buffs'],_0x2c779e=_0x173af8[_0x3b6f0c(0x64e)],_0x57abd3=VisuMZ[_0x3b6f0c(0x6d7)](_0x173af8['Targets']);for(const _0x328bfa of _0x57abd3){if(!_0x328bfa)continue;for(const _0x1b13a0 of _0x3cea70){const _0x40e0af=_0x3260f2[_0x3b6f0c(0x925)](_0x1b13a0[_0x3b6f0c(0x2b1)]()[_0x3b6f0c(0x7bc)]());_0x40e0af>=0x0&&_0x40e0af<=0x7&&_0x328bfa['isBuffAffected'](_0x40e0af)&&_0x328bfa[_0x3b6f0c(0x618)](_0x40e0af);}for(const _0x39b81f of _0x2c779e){const _0x161435=_0x3260f2['indexOf'](_0x39b81f['toUpperCase']()['trim']());_0x161435>=0x0&&_0x161435<=0x7&&_0x328bfa[_0x3b6f0c(0x721)](_0x161435)&&_0x328bfa['removeBuff'](_0x161435);}}}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x3e8),_0x2ff798=>{const _0x427d15=_0x16b2b1;if(!SceneManager[_0x427d15(0x7ed)]())return;VisuMZ[_0x427d15(0x874)](_0x2ff798,_0x2ff798);const _0x5a0407=_0x2ff798[_0x427d15(0x955)],_0x43796f=VisuMZ[_0x427d15(0x6d7)](_0x2ff798[_0x427d15(0x85c)]);for(const _0x2e4e10 of _0x43796f){if(!_0x2e4e10)continue;for(const _0x2c2d5a of _0x5a0407){_0x2e4e10[_0x427d15(0x1d6)](_0x2c2d5a);}}}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],'ActSeq_Mechanics_StbExploit',_0x318eb5=>{const _0x48e8dd=_0x16b2b1;if(!SceneManager[_0x48e8dd(0x7ed)]())return;if(!Imported[_0x48e8dd(0x6b6)])return;VisuMZ[_0x48e8dd(0x874)](_0x318eb5,_0x318eb5);const _0x455fde=_0x318eb5[_0x48e8dd(0x775)],_0x5968e0=VisuMZ['CreateActionSequenceTargets'](_0x318eb5[_0x48e8dd(0x85c)]),_0x4c7038=_0x318eb5[_0x48e8dd(0x46b)],_0x5ce93c=_0x318eb5[_0x48e8dd(0x690)],_0x27bd9=_0x318eb5[_0x48e8dd(0x209)],_0x1f4f73=BattleManager[_0x48e8dd(0x5e0)];if(_0x455fde)for(const _0x1ec47b of _0x5968e0){if(!_0x1ec47b)continue;if(_0x1ec47b===user)continue;if(_0x4c7038)_0x1ec47b[_0x48e8dd(0x6a6)](![]);_0x1ec47b['becomeSTBExploited'](BattleManager[_0x48e8dd(0x8ff)],_0x1f4f73);}if(_0x5ce93c&&BattleManager[_0x48e8dd(0x8ff)]){if(_0x27bd9)BattleManager[_0x48e8dd(0x8ff)][_0x48e8dd(0x6a6)](![]);const _0x26d6c3=_0x5968e0[0x0];BattleManager[_0x48e8dd(0x6e0)](_0x26d6c3,_0x1f4f73);}}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x694),_0x17a076=>{const _0x5f5d2b=_0x16b2b1;if(!SceneManager[_0x5f5d2b(0x7ed)]())return;if(!Imported[_0x5f5d2b(0x6b6)])return;VisuMZ['ConvertParams'](_0x17a076,_0x17a076);const _0x2d0807=_0x17a076[_0x5f5d2b(0x2cf)];BattleManager[_0x5f5d2b(0x8ff)]&&BattleManager[_0x5f5d2b(0x8ff)][_0x5f5d2b(0x754)](_0x2d0807);}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],'ActSeq_Mechanics_StbRemoveExcessActions',_0x3f60ac=>{const _0x18e7c6=_0x16b2b1;if(!SceneManager[_0x18e7c6(0x7ed)]())return;if(!Imported[_0x18e7c6(0x6b6)])return;VisuMZ[_0x18e7c6(0x874)](_0x3f60ac,_0x3f60ac);let _0x78aa0e=_0x3f60ac['Actions'];if(BattleManager[_0x18e7c6(0x8ff)]){BattleManager[_0x18e7c6(0x8ff)][_0x18e7c6(0x8fa)]=BattleManager[_0x18e7c6(0x8ff)][_0x18e7c6(0x8fa)]||[];while(_0x78aa0e--){if(BattleManager[_0x18e7c6(0x8ff)][_0x18e7c6(0x8fa)][_0x18e7c6(0x7d1)]<=0x0)break;BattleManager[_0x18e7c6(0x8ff)][_0x18e7c6(0x8fa)][_0x18e7c6(0x41f)]();}}}),PluginManager['registerCommand'](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x19c),_0x4f6132=>{const _0x17668c=_0x16b2b1;if(!SceneManager[_0x17668c(0x7ed)]())return;if(!Imported[_0x17668c(0x86e)])return;VisuMZ[_0x17668c(0x874)](_0x4f6132,_0x4f6132);const _0x36f35b=VisuMZ[_0x17668c(0x6d7)](_0x4f6132[_0x17668c(0x85c)]),_0x927f8=_0x4f6132[_0x17668c(0x42b)];for(const _0x54ad00 of _0x36f35b){if(!_0x54ad00)continue;if(!_0x54ad00[_0x17668c(0x68f)]())continue;_0x54ad00[_0x17668c(0x1d3)](_0x927f8);}}),PluginManager[_0x16b2b1(0x289)](pluginData['name'],_0x16b2b1(0x5d7),_0x5929ab=>{const _0x1afbd5=_0x16b2b1;if(!SceneManager[_0x1afbd5(0x7ed)]())return;VisuMZ[_0x1afbd5(0x874)](_0x5929ab,_0x5929ab);const _0x5254a6=VisuMZ[_0x1afbd5(0x6d7)](_0x5929ab['Targets']),_0x54eb48=_0x5929ab[_0x1afbd5(0x397)],_0x5eec9f={'textColor':ColorManager[_0x1afbd5(0x8ce)](_0x5929ab[_0x1afbd5(0x5fb)]),'flashColor':_0x5929ab[_0x1afbd5(0x623)],'flashDuration':_0x5929ab['FlashDuration']};for(const _0x135325 of _0x5254a6){if(!_0x135325)continue;_0x135325[_0x1afbd5(0x79e)](_0x54eb48,_0x5eec9f);}}),PluginManager['registerCommand'](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x36e),_0xd1322b=>{const _0x5af7e5=_0x16b2b1;if(!SceneManager[_0x5af7e5(0x7ed)]())return;VisuMZ[_0x5af7e5(0x874)](_0xd1322b,_0xd1322b);const _0x54aa2e=VisuMZ[_0x5af7e5(0x6d7)](_0xd1322b['Targets']);let _0x16aed3=$gameVariables[_0x5af7e5(0x58f)](_0xd1322b['Variable']);Imported[_0x5af7e5(0x64f)]&&_0xd1322b['DigitGrouping']&&(_0x16aed3=VisuMZ[_0x5af7e5(0x30b)](_0x16aed3));const _0x29d895=String(_0x16aed3),_0x203434={'textColor':ColorManager[_0x5af7e5(0x8ce)](_0xd1322b['TextColor']),'flashColor':_0xd1322b['FlashColor'],'flashDuration':_0xd1322b['FlashDuration']};for(const _0x29037b of _0x54aa2e){if(!_0x29037b)continue;_0x29037b['setupTextPopup'](_0x29d895,_0x203434);}}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],'ActSeq_Mechanics_WaitForEffect',_0x538cd0=>{const _0x3f734c=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;const _0x1eecd0=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x1eecd0)return;_0x1eecd0[_0x3f734c(0x384)](_0x3f734c(0x493));}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],'ActSeq_Motion_ClearFreezeFrame',_0x304baa=>{const _0x6a1ffa=_0x16b2b1;if(!SceneManager[_0x6a1ffa(0x7ed)]())return;VisuMZ[_0x6a1ffa(0x874)](_0x304baa,_0x304baa);const _0x5a5ed7=VisuMZ[_0x6a1ffa(0x6d7)](_0x304baa[_0x6a1ffa(0x85c)]);for(const _0x1cb828 of _0x5a5ed7){if(!_0x1cb828)continue;_0x1cb828['clearFreezeMotion']();}}),PluginManager[_0x16b2b1(0x289)](pluginData['name'],'ActSeq_Motion_FreezeMotionFrame',_0x5815a9=>{const _0x58398f=_0x16b2b1;if(!SceneManager[_0x58398f(0x7ed)]())return;VisuMZ[_0x58398f(0x874)](_0x5815a9,_0x5815a9);const _0x121c06=VisuMZ[_0x58398f(0x6d7)](_0x5815a9[_0x58398f(0x85c)]),_0x5a1157=_0x5815a9[_0x58398f(0x5e6)][_0x58398f(0x70a)]()[_0x58398f(0x7bc)](),_0x2660d8=_0x5815a9[_0x58398f(0x56c)],_0x202e68=_0x5815a9[_0x58398f(0x244)];for(const _0x312061 of _0x121c06){if(!_0x312061)continue;_0x312061[_0x58398f(0x487)](_0x5a1157,_0x2660d8,_0x202e68);}}),PluginManager[_0x16b2b1(0x289)](pluginData['name'],_0x16b2b1(0x3ef),_0x1cd4bc=>{const _0x217e9f=_0x16b2b1;if(!SceneManager[_0x217e9f(0x7ed)]())return;VisuMZ[_0x217e9f(0x874)](_0x1cd4bc,_0x1cd4bc);const _0xab52b5=VisuMZ['CreateActionSequenceTargets'](_0x1cd4bc[_0x217e9f(0x85c)]),_0x5afeda=_0x1cd4bc[_0x217e9f(0x5e6)][_0x217e9f(0x70a)]()['trim'](),_0x211239=_0x1cd4bc['ShowWeapon'];for(const _0xffcdc of _0xab52b5){if(!_0xffcdc)continue;if(_0x5afeda[_0x217e9f(0x6ef)](/ATTACK[ ](\d+)/i))_0xffcdc[_0x217e9f(0x66c)](Number(RegExp['$1']));else _0x5afeda===_0x217e9f(0x63c)?_0xffcdc[_0x217e9f(0x475)]():_0xffcdc[_0x217e9f(0x459)](_0x5afeda);if(!_0x211239)_0xffcdc[_0x217e9f(0x217)](0x0);else{if(_0x211239&&[_0x217e9f(0x7cc),'swing',_0x217e9f(0x311)]['includes'](_0x5afeda)){}}}}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x889),_0x72ffe2=>{const _0x766d6a=_0x16b2b1;if(!SceneManager[_0x766d6a(0x7ed)]())return;VisuMZ[_0x766d6a(0x874)](_0x72ffe2,_0x72ffe2);const _0x4b8b2e=BattleManager[_0x766d6a(0x5e0)];if(!_0x4b8b2e)return;if(!_0x4b8b2e['item']())return;const _0x29a8ee=VisuMZ[_0x766d6a(0x6d7)](_0x72ffe2[_0x766d6a(0x85c)]);for(const _0x5a38f6 of _0x29a8ee){if(!_0x5a38f6)continue;_0x5a38f6[_0x766d6a(0x6e2)](_0x4b8b2e);}}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x3e0),_0x5a1f26=>{const _0x2c13f5=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x2c13f5(0x874)](_0x5a1f26,_0x5a1f26);const _0x1f92d8=VisuMZ[_0x2c13f5(0x6d7)](_0x5a1f26['Targets']);for(const _0x519105 of _0x1f92d8){if(!_0x519105)continue;if(!_0x519105[_0x2c13f5(0x4e0)]())continue;_0x519105[_0x2c13f5(0x4e0)]()[_0x2c13f5(0x827)]();}}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x461),_0x2a2f1a=>{const _0x20c481=_0x16b2b1;if(!SceneManager[_0x20c481(0x7ed)]())return;VisuMZ[_0x20c481(0x874)](_0x2a2f1a,_0x2a2f1a);const _0x2aab6e=$gameTemp[_0x20c481(0x40b)](),_0x2c393a=_0x2a2f1a[_0x20c481(0x5e5)]*Sprite_Battler[_0x20c481(0x436)];_0x2aab6e[_0x20c481(0x7bd)](_0x2c393a);}),PluginManager[_0x16b2b1(0x289)](pluginData['name'],_0x16b2b1(0x403),_0x549b46=>{const _0x133303=_0x16b2b1;if(!SceneManager[_0x133303(0x7ed)]())return;VisuMZ[_0x133303(0x874)](_0x549b46,_0x549b46);const _0x559701=$gameTemp[_0x133303(0x40b)](),_0x2214f1=BattleManager[_0x133303(0x5e0)];if(!_0x559701||!_0x2214f1)return;if(!_0x2214f1[_0x133303(0x3e3)]())return;const _0x5c7ca6=VisuMZ['CreateActionSequenceTargets'](_0x549b46[_0x133303(0x85c)]);for(const _0x187f8c of _0x5c7ca6){if(!_0x187f8c)continue;_0x187f8c['performActionStart'](_0x2214f1);}if(_0x549b46[_0x133303(0x1a5)])_0x559701[_0x133303(0x384)](_0x133303(0x2f3));}),PluginManager[_0x16b2b1(0x289)](pluginData['name'],_0x16b2b1(0x532),_0x4858d8=>{const _0x5daacd=_0x16b2b1;if(!SceneManager[_0x5daacd(0x7ed)]())return;if(!$gameSystem[_0x5daacd(0x5a0)]())return;VisuMZ[_0x5daacd(0x874)](_0x4858d8,_0x4858d8);const _0x8ef729=VisuMZ[_0x5daacd(0x6d7)](_0x4858d8[_0x5daacd(0x85c)]);let _0x48a378=_0x4858d8['Direction'][_0x5daacd(0x6ef)](/back/i);for(const _0x4a310d of _0x8ef729){if(!_0x4a310d)continue;if(_0x4858d8[_0x5daacd(0x769)][_0x5daacd(0x6ef)](/rand/i))_0x48a378=Math['randomInt'](0x2);_0x4a310d[_0x5daacd(0x5b7)](!!_0x48a378);}}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x691),_0x45cff8=>{const _0xafce5e=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;if(!$gameSystem[_0xafce5e(0x5a0)]())return;VisuMZ[_0xafce5e(0x874)](_0x45cff8,_0x45cff8);const _0x32257c=VisuMZ[_0xafce5e(0x6d7)](_0x45cff8[_0xafce5e(0x85c)]);let _0x3d2ef2=_0x45cff8[_0xafce5e(0x727)];const _0x49f757=_0x45cff8[_0xafce5e(0x449)];for(const _0x29af12 of _0x32257c){if(!_0x29af12)continue;let _0x97a7ad=_0x29af12[_0xafce5e(0x4e0)]()[_0xafce5e(0x5f5)],_0x2d7e67=_0x29af12[_0xafce5e(0x4e0)]()[_0xafce5e(0x19e)];if(_0x3d2ef2[_0xafce5e(0x6ef)](/home/i))_0x97a7ad=_0x29af12[_0xafce5e(0x4e0)]()[_0xafce5e(0x535)],_0x2d7e67=_0x29af12[_0xafce5e(0x4e0)]()[_0xafce5e(0x1c6)];else{if(_0x3d2ef2[_0xafce5e(0x6ef)](/center/i))_0x97a7ad=Graphics[_0xafce5e(0x2af)]/0x2,_0x2d7e67=Graphics['boxHeight']/0x2;else _0x3d2ef2[_0xafce5e(0x6ef)](/point (\d+), (\d+)/i)&&(_0x97a7ad=Number(RegExp['$1']),_0x2d7e67=Number(RegExp['$2']));}_0x29af12[_0xafce5e(0x3fb)](Math[_0xafce5e(0x855)](_0x97a7ad),Math[_0xafce5e(0x855)](_0x2d7e67),!!_0x49f757);}}),PluginManager[_0x16b2b1(0x289)](pluginData['name'],'ActSeq_Movement_FaceTarget',_0x3ada37=>{const _0xd1ddca=_0x16b2b1;if(!SceneManager[_0xd1ddca(0x7ed)]())return;if(!$gameSystem[_0xd1ddca(0x5a0)]())return;VisuMZ[_0xd1ddca(0x874)](_0x3ada37,_0x3ada37);const _0x719df=VisuMZ[_0xd1ddca(0x6d7)](_0x3ada37[_0xd1ddca(0x538)]),_0xe306af=VisuMZ['CreateActionSequenceTargets'](_0x3ada37[_0xd1ddca(0x74f)]),_0xf175f9=_0xe306af[_0xd1ddca(0x5b1)](_0x1c278b=>_0x1c278b&&_0x1c278b[_0xd1ddca(0x4e0)]()?_0x1c278b[_0xd1ddca(0x4e0)]()['_baseX']:0x0)/(_0xe306af[_0xd1ddca(0x7d1)]||0x1),_0x33fa7d=_0xe306af[_0xd1ddca(0x5b1)](_0x241433=>_0x241433&&_0x241433[_0xd1ddca(0x4e0)]()?_0x241433[_0xd1ddca(0x4e0)]()[_0xd1ddca(0x19e)]:0x0)/(_0xe306af[_0xd1ddca(0x7d1)]||0x1),_0x133eb8=_0x3ada37[_0xd1ddca(0x449)];for(const _0x2907f9 of _0x719df){if(!_0x2907f9)continue;_0x2907f9['setBattlerFacePoint'](Math['round'](_0xf175f9),Math[_0xd1ddca(0x855)](_0x33fa7d),!!_0x133eb8);}}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x683),_0x11ce7c=>{const _0x59baba=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x59baba(0x874)](_0x11ce7c,_0x11ce7c);const _0x1ffe1c=$gameTemp[_0x59baba(0x40b)](),_0x2088b1=VisuMZ[_0x59baba(0x6d7)](_0x11ce7c[_0x59baba(0x85c)]),_0x49ba2c=_0x11ce7c[_0x59baba(0x602)],_0x1a313e=_0x11ce7c[_0x59baba(0x735)],_0x31c011=_0x11ce7c[_0x59baba(0x44a)],_0x55a29b=_0x11ce7c['WaitForFloat'];if(!_0x1ffe1c)return;for(const _0x431caa of _0x2088b1){if(!_0x431caa)continue;_0x431caa[_0x59baba(0x1c7)](_0x49ba2c,_0x1a313e,_0x31c011);}if(_0x55a29b)_0x1ffe1c[_0x59baba(0x384)](_0x59baba(0x32c));}),PluginManager['registerCommand'](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x68b),_0x2ac1e0=>{const _0x22604e=_0x16b2b1;if(!SceneManager[_0x22604e(0x7ed)]())return;VisuMZ[_0x22604e(0x874)](_0x2ac1e0,_0x2ac1e0);const _0x1badb0=$gameTemp[_0x22604e(0x40b)]();if(!_0x1badb0)return;const _0x4be693=VisuMZ[_0x22604e(0x6d7)](_0x2ac1e0[_0x22604e(0x85c)]);for(const _0x635dc0 of _0x4be693){if(!_0x635dc0)continue;_0x635dc0[_0x22604e(0x27e)](),_0x635dc0['performActionEndMembers']();}if(_0x2ac1e0[_0x22604e(0x1a5)])_0x1badb0[_0x22604e(0x384)]('battleMove');}),PluginManager[_0x16b2b1(0x289)](pluginData['name'],_0x16b2b1(0x79a),_0x3ea4ac=>{const _0x31b50e=_0x16b2b1;if(!SceneManager[_0x31b50e(0x7ed)]())return;VisuMZ[_0x31b50e(0x874)](_0x3ea4ac,_0x3ea4ac);const _0x379b42=$gameTemp['getLastPluginCommandInterpreter'](),_0x91fb51=VisuMZ['CreateActionSequenceTargets'](_0x3ea4ac['Targets']),_0x39e256=_0x3ea4ac['Height'],_0x1ad12b=_0x3ea4ac['Duration'],_0x1acad5=_0x3ea4ac['WaitForJump'];if(!_0x379b42)return;for(const _0x4d824c of _0x91fb51){if(!_0x4d824c)continue;_0x4d824c[_0x31b50e(0x370)](_0x39e256,_0x1ad12b);}if(_0x1acad5)_0x379b42[_0x31b50e(0x384)](_0x31b50e(0x22b));}),PluginManager['registerCommand'](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x4ba),_0x512fb5=>{const _0x52fb30=_0x16b2b1;if(!SceneManager[_0x52fb30(0x7ed)]())return;if(!$gameSystem['isSideView']())return;VisuMZ[_0x52fb30(0x874)](_0x512fb5,_0x512fb5);const _0x24cc9b=$gameTemp[_0x52fb30(0x40b)](),_0x2cc398=VisuMZ[_0x52fb30(0x6d7)](_0x512fb5[_0x52fb30(0x85c)]),_0x59cd37=_0x512fb5[_0x52fb30(0x6c3)],_0x308b22=_0x512fb5[_0x52fb30(0x636)],_0x4e1ad4=_0x512fb5[_0x52fb30(0x590)],_0x5a80c9=_0x512fb5[_0x52fb30(0x735)],_0x5c11ae=_0x512fb5[_0x52fb30(0x6d8)],_0x22d0eb=_0x512fb5[_0x52fb30(0x44a)],_0xf06421=_0x512fb5[_0x52fb30(0x5e6)],_0x25aa06=_0x512fb5[_0x52fb30(0x1a5)];if(!_0x24cc9b)return;for(const _0x49971f of _0x2cc398){if(!_0x49971f)continue;let _0x18298a=_0x308b22,_0x35c696=_0x4e1ad4;if(_0x59cd37[_0x52fb30(0x6ef)](/horz/i))_0x18298a*=_0x49971f[_0x52fb30(0x68f)]()?-0x1:0x1;if(_0x59cd37['match'](/vert/i))_0x35c696*=_0x49971f[_0x52fb30(0x68f)]()?-0x1:0x1;_0x49971f[_0x52fb30(0x903)](_0x18298a,_0x35c696,_0x5a80c9,_0x5c11ae,_0x22d0eb),_0x49971f[_0x52fb30(0x459)](_0xf06421);}if(_0x25aa06)_0x24cc9b[_0x52fb30(0x384)]('battleMove');}),PluginManager[_0x16b2b1(0x289)](pluginData['name'],_0x16b2b1(0x2ae),_0x1e7acb=>{const _0x28905d=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;if(!$gameSystem['isSideView']())return;VisuMZ['ConvertParams'](_0x1e7acb,_0x1e7acb);const _0x4a5a92=$gameTemp['getLastPluginCommandInterpreter'](),_0x9fb00f=VisuMZ[_0x28905d(0x6d7)](_0x1e7acb[_0x28905d(0x85c)]),_0x539d71=_0x1e7acb[_0x28905d(0x7c3)],_0x394e42=_0x1e7acb[_0x28905d(0x59b)],_0x75760b=_0x1e7acb[_0x28905d(0x318)],_0x4dfea3=_0x1e7acb[_0x28905d(0x555)],_0x31bc4d=_0x1e7acb['Duration'],_0x5e2379=_0x1e7acb[_0x28905d(0x6d8)],_0x4b0934=_0x1e7acb[_0x28905d(0x44a)],_0x2a4741=_0x1e7acb[_0x28905d(0x5e6)],_0x5ac891=_0x1e7acb[_0x28905d(0x1a5)];if(!_0x4a5a92)return;for(const _0x3eebd8 of _0x9fb00f){if(!_0x3eebd8)continue;let _0x27c3f9=_0x3eebd8[_0x28905d(0x4e0)]()[_0x28905d(0x5f5)],_0x529a6d=_0x3eebd8[_0x28905d(0x4e0)]()['_baseY'];if(_0x539d71[_0x28905d(0x6ef)](/home/i))_0x27c3f9=_0x3eebd8['battler']()['_homeX'],_0x529a6d=_0x3eebd8['battler']()['_homeY'];else{if(_0x539d71[_0x28905d(0x6ef)](/center/i))_0x27c3f9=Graphics['boxWidth']/0x2,_0x529a6d=Graphics[_0x28905d(0x582)]/0x2;else _0x539d71['match'](/point (\d+), (\d+)/i)&&(_0x27c3f9=Number(RegExp['$1']),_0x529a6d=Number(RegExp['$2']));}if(_0x394e42[_0x28905d(0x6ef)](/none/i))_0x27c3f9+=_0x75760b,_0x529a6d+=_0x4dfea3;else{if(_0x394e42[_0x28905d(0x6ef)](/horz/i)&&_0x394e42[_0x28905d(0x6ef)](/vert/i))_0x27c3f9+=_0x3eebd8['isActor']()?-_0x75760b:_0x75760b,_0x529a6d+=_0x3eebd8['isActor']()?-_0x4dfea3:_0x4dfea3;else{if(_0x394e42[_0x28905d(0x6ef)](/horz/i))_0x27c3f9+=_0x3eebd8[_0x28905d(0x68f)]()?-_0x75760b:_0x75760b,_0x529a6d+=_0x4dfea3;else _0x394e42[_0x28905d(0x6ef)](/vert/i)&&(_0x27c3f9+=_0x75760b,_0x529a6d+=_0x3eebd8['isActor']()?-_0x4dfea3:_0x4dfea3);}}_0x3eebd8[_0x28905d(0x558)](_0x27c3f9,_0x529a6d,_0x31bc4d,_0x5e2379,_0x4b0934,-0x1),_0x3eebd8[_0x28905d(0x459)](_0x2a4741);}if(_0x5ac891)_0x4a5a92[_0x28905d(0x384)](_0x28905d(0x2f3));}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x291),_0x5e74c1=>{const _0x3e636f=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;if(!$gameSystem['isSideView']())return;VisuMZ[_0x3e636f(0x874)](_0x5e74c1,_0x5e74c1);const _0xeb74e7=$gameTemp[_0x3e636f(0x40b)](),_0x27300a=VisuMZ['CreateActionSequenceTargets'](_0x5e74c1['Targets1']),_0x59ed1c=VisuMZ[_0x3e636f(0x6d7)](_0x5e74c1[_0x3e636f(0x74f)]),_0x247cd4=_0x5e74c1[_0x3e636f(0x70f)];let _0x529fe0=_0x5e74c1['MeleeDistance'];const _0x5edc06=_0x5e74c1['OffsetAdjust'],_0x41ca4b=_0x5e74c1[_0x3e636f(0x318)],_0x1c86cf=_0x5e74c1[_0x3e636f(0x555)],_0x41daa1=_0x5e74c1['Duration'],_0x5d198b=_0x5e74c1['FaceDirection'],_0x323361=_0x5e74c1[_0x3e636f(0x44a)],_0xbe3b4d=_0x5e74c1[_0x3e636f(0x5e6)],_0x25c1a5=_0x5e74c1[_0x3e636f(0x1a5)],_0x37a6ac=Math['min'](..._0x59ed1c[_0x3e636f(0x5b1)](_0x541e44=>_0x541e44[_0x3e636f(0x4e0)]()[_0x3e636f(0x5f5)]-_0x541e44[_0x3e636f(0x4e0)]()[_0x3e636f(0x498)]()/0x2)),_0x1eef69=Math['max'](..._0x59ed1c[_0x3e636f(0x5b1)](_0x1b5690=>_0x1b5690[_0x3e636f(0x4e0)]()['_baseX']+_0x1b5690[_0x3e636f(0x4e0)]()[_0x3e636f(0x498)]()/0x2)),_0x7573bc=Math['min'](..._0x59ed1c[_0x3e636f(0x5b1)](_0x4c48d7=>_0x4c48d7['battler']()[_0x3e636f(0x19e)]-_0x4c48d7[_0x3e636f(0x4e0)]()[_0x3e636f(0x380)]())),_0x5a75fc=Math[_0x3e636f(0x6fa)](..._0x59ed1c[_0x3e636f(0x5b1)](_0x2e62f1=>_0x2e62f1['battler']()[_0x3e636f(0x19e)])),_0x1235d0=_0x59ed1c[_0x3e636f(0x1a0)](_0x53f933=>_0x53f933[_0x3e636f(0x68f)]())[_0x3e636f(0x7d1)],_0x4fd581=_0x59ed1c[_0x3e636f(0x1a0)](_0x589d62=>_0x589d62[_0x3e636f(0x73f)]())[_0x3e636f(0x7d1)];let _0x3fd126=0x0,_0x29f7c2=0x0;if(_0x247cd4[_0x3e636f(0x6ef)](/front/i))_0x3fd126=_0x1235d0>=_0x4fd581?_0x37a6ac:_0x1eef69;else{if(_0x247cd4[_0x3e636f(0x6ef)](/middle/i))_0x3fd126=(_0x37a6ac+_0x1eef69)/0x2,_0x529fe0=-0x1;else _0x247cd4['match'](/back/i)&&(_0x3fd126=_0x1235d0>=_0x4fd581?_0x1eef69:_0x37a6ac);}if(_0x247cd4['match'](/head/i))_0x29f7c2=_0x7573bc;else{if(_0x247cd4['match'](/center/i))_0x29f7c2=(_0x7573bc+_0x5a75fc)/0x2;else _0x247cd4[_0x3e636f(0x6ef)](/base/i)&&(_0x29f7c2=_0x5a75fc);}if(!_0xeb74e7)return;for(const _0x836dda of _0x27300a){if(!_0x836dda)continue;let _0x411fa7=_0x3fd126,_0x42e943=_0x29f7c2;if(_0x5edc06[_0x3e636f(0x6ef)](/none/i))_0x411fa7+=_0x41ca4b,_0x42e943+=_0x1c86cf;else{if(_0x5edc06[_0x3e636f(0x6ef)](/horz/i)&&_0x5edc06['match'](/vert/i))_0x411fa7+=_0x836dda[_0x3e636f(0x68f)]()?-_0x41ca4b:_0x41ca4b,_0x42e943+=_0x836dda[_0x3e636f(0x68f)]()?-_0x1c86cf:_0x1c86cf;else{if(_0x5edc06[_0x3e636f(0x6ef)](/horz/i))_0x411fa7+=_0x836dda[_0x3e636f(0x68f)]()?-_0x41ca4b:_0x41ca4b,_0x42e943+=_0x1c86cf;else _0x5edc06['match'](/vert/i)&&(_0x411fa7+=_0x41ca4b,_0x42e943+=_0x836dda[_0x3e636f(0x68f)]()?-_0x1c86cf:_0x1c86cf);}}_0x836dda[_0x3e636f(0x558)](_0x411fa7,_0x42e943,_0x41daa1,_0x5d198b,_0x323361,_0x529fe0),_0x836dda['requestMotion'](_0xbe3b4d);}if(_0x25c1a5)_0xeb74e7[_0x3e636f(0x384)](_0x3e636f(0x2f3));}),PluginManager['registerCommand'](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x8b1),_0x277941=>{const _0x1fbab2=_0x16b2b1;if(!SceneManager[_0x1fbab2(0x7ed)]())return;VisuMZ[_0x1fbab2(0x874)](_0x277941,_0x277941);const _0x140052=$gameTemp[_0x1fbab2(0x40b)](),_0x362a84=VisuMZ[_0x1fbab2(0x6d7)](_0x277941[_0x1fbab2(0x85c)]),_0x13cc42=_0x277941[_0x1fbab2(0x671)],_0x2b0880=_0x277941[_0x1fbab2(0x735)],_0x266ca6=_0x277941['EasingType'],_0x1ce45f=_0x277941[_0x1fbab2(0x31c)];if(!_0x140052)return;for(const _0x39242c of _0x362a84){if(!_0x39242c)continue;_0x39242c[_0x1fbab2(0x542)](_0x13cc42,_0x2b0880,_0x266ca6);}if(_0x1ce45f)_0x140052[_0x1fbab2(0x384)](_0x1fbab2(0x5ff));}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x6c2),_0x385bd9=>{const _0x266775=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x385bd9,_0x385bd9);const _0x23aded=$gameTemp['getLastPluginCommandInterpreter'](),_0xd04528=VisuMZ[_0x266775(0x6d7)](_0x385bd9['Targets']),_0x1092b0=_0x385bd9[_0x266775(0x6cb)],_0x34ba34=_0x385bd9[_0x266775(0x45b)],_0x20a5b6=_0x385bd9[_0x266775(0x735)],_0x52c6b1=_0x385bd9[_0x266775(0x44a)],_0x1c65d2=_0x385bd9[_0x266775(0x773)];if(!_0x23aded)return;for(const _0x433217 of _0xd04528){if(!_0x433217)continue;_0x433217[_0x266775(0x966)](_0x1092b0,_0x34ba34,_0x20a5b6,_0x52c6b1);}if(_0x1c65d2)_0x23aded[_0x266775(0x384)](_0x266775(0x929));}),PluginManager[_0x16b2b1(0x289)](pluginData['name'],_0x16b2b1(0x8fd),_0x1391d0=>{const _0xe91a9d=_0x16b2b1;if(!SceneManager[_0xe91a9d(0x7ed)]())return;VisuMZ[_0xe91a9d(0x874)](_0x1391d0,_0x1391d0);const _0x4ca3b6=$gameTemp[_0xe91a9d(0x40b)](),_0x15795d=VisuMZ[_0xe91a9d(0x6d7)](_0x1391d0[_0xe91a9d(0x85c)]),_0x93009d=_0x1391d0[_0xe91a9d(0x5f0)],_0xd77379=_0x1391d0['SkewY'],_0x360ccd=_0x1391d0[_0xe91a9d(0x735)],_0x2449b3=_0x1391d0[_0xe91a9d(0x44a)],_0x69313=_0x1391d0[_0xe91a9d(0x327)];if(!_0x4ca3b6)return;for(const _0x2b782a of _0x15795d){if(!_0x2b782a)continue;_0x2b782a[_0xe91a9d(0x4cb)](_0x93009d,_0xd77379,_0x360ccd,_0x2449b3);}if(_0x69313)_0x4ca3b6['setWaitMode'](_0xe91a9d(0x60e));}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Movement_Spin',_0x58ec7b=>{const _0x471269=_0x16b2b1;if(!SceneManager[_0x471269(0x7ed)]())return;VisuMZ[_0x471269(0x874)](_0x58ec7b,_0x58ec7b);const _0x19338a=$gameTemp[_0x471269(0x40b)](),_0x5e19e7=VisuMZ[_0x471269(0x6d7)](_0x58ec7b[_0x471269(0x85c)]),_0x32027b=_0x58ec7b[_0x471269(0x267)],_0xaac0d=_0x58ec7b['Duration'],_0x250229=_0x58ec7b[_0x471269(0x44a)],_0x19ce86=_0x58ec7b[_0x471269(0x978)],_0x2ccfb7=_0x58ec7b[_0x471269(0x92d)];if(!_0x19338a)return;for(const _0x51d091 of _0x5e19e7){if(!_0x51d091)continue;_0x51d091[_0x471269(0x64c)](_0x32027b,_0xaac0d,_0x250229,_0x19ce86);}if(_0x2ccfb7)_0x19338a[_0x471269(0x384)](_0x471269(0x3b3));}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],'ActSeq_Movement_WaitForFloat',_0x3b104c=>{const _0x4491bb=_0x16b2b1;if(!SceneManager[_0x4491bb(0x7ed)]())return;const _0x5da0ad=$gameTemp[_0x4491bb(0x40b)]();if(!_0x5da0ad)return;_0x5da0ad[_0x4491bb(0x384)](_0x4491bb(0x32c));}),PluginManager[_0x16b2b1(0x289)](pluginData['name'],'ActSeq_Movement_WaitForJump',_0x183903=>{const _0x2e1f5c=_0x16b2b1;if(!SceneManager[_0x2e1f5c(0x7ed)]())return;const _0x12bb40=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x12bb40)return;_0x12bb40['setWaitMode'](_0x2e1f5c(0x22b));}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],'ActSeq_Movement_WaitForMovement',_0x409802=>{const _0x4bbb6a=_0x16b2b1;if(!SceneManager[_0x4bbb6a(0x7ed)]())return;const _0x371940=$gameTemp[_0x4bbb6a(0x40b)]();if(!_0x371940)return;_0x371940['setWaitMode'](_0x4bbb6a(0x2f3));}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x22d),_0x17f174=>{const _0x3e2d6c=_0x16b2b1;if(!SceneManager[_0x3e2d6c(0x7ed)]())return;const _0x5fce9e=$gameTemp[_0x3e2d6c(0x40b)]();if(!_0x5fce9e)return;_0x5fce9e[_0x3e2d6c(0x384)](_0x3e2d6c(0x5ff));}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],'ActSeq_Movement_WaitForScale',_0x561498=>{const _0x2f00c7=_0x16b2b1;if(!SceneManager[_0x2f00c7(0x7ed)]())return;const _0x4c00a0=$gameTemp[_0x2f00c7(0x40b)]();if(!_0x4c00a0)return;_0x4c00a0[_0x2f00c7(0x384)](_0x2f00c7(0x929));}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x977),_0x4b7804=>{const _0x33f701=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;const _0x193ace=$gameTemp[_0x33f701(0x40b)]();if(!_0x193ace)return;_0x193ace[_0x33f701(0x384)](_0x33f701(0x60e));}),PluginManager['registerCommand'](pluginData[_0x16b2b1(0x802)],'ActSeq_Movement_WaitForSpin',_0x4b2003=>{const _0x486ac1=_0x16b2b1;if(!SceneManager[_0x486ac1(0x7ed)]())return;const _0x41c6da=$gameTemp[_0x486ac1(0x40b)]();if(!_0x41c6da)return;_0x41c6da[_0x486ac1(0x384)](_0x486ac1(0x3b3));}),PluginManager['registerCommand'](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x5fc),_0x3dc6ea=>{const _0x22f75c=_0x16b2b1;if(!SceneManager[_0x22f75c(0x7ed)]())return;if(!Imported['VisuMZ_3_ActSeqProjectiles'])return;VisuMZ['ConvertParams'](_0x3dc6ea,_0x3dc6ea);const _0x48f343=$gameTemp[_0x22f75c(0x40b)](),_0x342de0=_0x3dc6ea['WaitForProjectile'];if(!_0x48f343)return;const _0x38af6c=BattleManager[_0x22f75c(0x7d7)];if(!_0x38af6c)return;_0x38af6c[_0x22f75c(0x4e4)](_0x3dc6ea);if(_0x342de0)_0x48f343[_0x22f75c(0x384)](_0x22f75c(0x5de));}),PluginManager['registerCommand'](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x81e),_0x4ff0b6=>{const _0x132b1e=_0x16b2b1;if(!SceneManager[_0x132b1e(0x7ed)]())return;if(!Imported[_0x132b1e(0x956)])return;VisuMZ[_0x132b1e(0x874)](_0x4ff0b6,_0x4ff0b6);const _0x58e21d=$gameTemp[_0x132b1e(0x40b)](),_0x3dc8c1=_0x4ff0b6[_0x132b1e(0x325)];if(!_0x58e21d)return;const _0x24fa80=BattleManager[_0x132b1e(0x7d7)];if(!_0x24fa80)return;_0x24fa80[_0x132b1e(0x4e4)](_0x4ff0b6);if(_0x3dc8c1)_0x58e21d['setWaitMode']('battleProjectiles');}),PluginManager[_0x16b2b1(0x289)](pluginData['name'],'ActSeq_Projectile_Picture',_0x34d472=>{const _0x1de221=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x1de221(0x956)])return;VisuMZ[_0x1de221(0x874)](_0x34d472,_0x34d472);const _0x3ffd4f=$gameTemp[_0x1de221(0x40b)](),_0x4a6fb9=_0x34d472['WaitForProjectile'];if(!_0x3ffd4f)return;const _0x134a67=BattleManager[_0x1de221(0x7d7)];if(!_0x134a67)return;_0x134a67[_0x1de221(0x4e4)](_0x34d472);if(_0x4a6fb9)_0x3ffd4f[_0x1de221(0x384)](_0x1de221(0x5de));}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x3c2),_0x328fad=>{const _0x1b1fb1=_0x16b2b1;if(!SceneManager[_0x1b1fb1(0x7ed)]())return;if(!Imported[_0x1b1fb1(0x936)])return;VisuMZ[_0x1b1fb1(0x874)](_0x328fad,_0x328fad);const _0x43da98=$gameTemp[_0x1b1fb1(0x40b)](),_0x1cac77=_0x328fad['WaitForSkew'];if(!_0x43da98)return;$gameScreen[_0x1b1fb1(0x6c9)](_0x328fad['SkewX'],_0x328fad[_0x1b1fb1(0x430)],_0x328fad['Duration'],_0x328fad[_0x1b1fb1(0x44a)]);if(_0x1cac77)_0x43da98[_0x1b1fb1(0x384)]('battleSkew');}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x906),_0x516048=>{const _0x2b1a69=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x2b1a69(0x936)])return;VisuMZ['ConvertParams'](_0x516048,_0x516048);const _0x3a1d06=$gameTemp[_0x2b1a69(0x40b)](),_0x32b673=_0x516048[_0x2b1a69(0x327)];if(!_0x3a1d06)return;$gameScreen[_0x2b1a69(0x6c9)](0x0,0x0,_0x516048[_0x2b1a69(0x735)],_0x516048[_0x2b1a69(0x44a)]);if(_0x32b673)_0x3a1d06[_0x2b1a69(0x384)](_0x2b1a69(0x3ee));}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x3f6),_0x300495=>{const _0x5b9b7e=_0x16b2b1;if(!SceneManager[_0x5b9b7e(0x7ed)]())return;if(!Imported[_0x5b9b7e(0x936)])return;const _0x25063f=$gameTemp[_0x5b9b7e(0x40b)]();if(!_0x25063f)return;_0x25063f['setWaitMode'](_0x5b9b7e(0x3ee));}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x96b),_0x292f84=>{const _0x162ce9=_0x16b2b1;if(!SceneManager[_0x162ce9(0x7ed)]())return;VisuMZ[_0x162ce9(0x874)](_0x292f84,_0x292f84);const _0x265a91=$gameTemp['getLastPluginCommandInterpreter'](),_0x145579=_0x292f84[_0x162ce9(0x400)],_0x1d20e4=_0x292f84[_0x162ce9(0x23b)];if(!_0x265a91)return;BattleManager['_targetIndex']=_0x145579,BattleManager[_0x162ce9(0x407)]=BattleManager[_0x162ce9(0x2cb)]?BattleManager['_allTargets'][BattleManager['_targetIndex']]||null:null,BattleManager[_0x162ce9(0x407)]&&_0x1d20e4[_0x162ce9(0x2b1)]()[_0x162ce9(0x7bc)]()!=='UNTITLED'&&_0x265a91[_0x162ce9(0x87b)]([_0x1d20e4]);}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],'ActSeq_Target_NextTarget',_0x645c36=>{const _0x341309=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x341309(0x874)](_0x645c36,_0x645c36);const _0x599daf=$gameTemp[_0x341309(0x40b)](),_0x283ea0=_0x645c36[_0x341309(0x23b)];if(!_0x599daf)return;BattleManager[_0x341309(0x30a)]++,BattleManager[_0x341309(0x407)]=BattleManager[_0x341309(0x2cb)][BattleManager[_0x341309(0x30a)]]||null,BattleManager['_target']&&_0x283ea0[_0x341309(0x2b1)]()[_0x341309(0x7bc)]()!==_0x341309(0x643)&&_0x599daf[_0x341309(0x87b)]([_0x283ea0]);}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x776),_0x519912=>{const _0x35100f=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x35100f(0x874)](_0x519912,_0x519912);const _0x12c5ba=$gameTemp['getLastPluginCommandInterpreter'](),_0x1fdda5=_0x519912[_0x35100f(0x23b)];if(!_0x12c5ba)return;BattleManager[_0x35100f(0x30a)]--,BattleManager['_target']=BattleManager['_allTargets'][BattleManager[_0x35100f(0x30a)]]||null,BattleManager['_target']&&_0x1fdda5[_0x35100f(0x2b1)]()['trim']()!==_0x35100f(0x643)&&_0x12c5ba[_0x35100f(0x87b)]([_0x1fdda5]);}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x74c),_0x242bf1=>{const _0x9afe95=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x9afe95(0x874)](_0x242bf1,_0x242bf1);const _0x5492cd=$gameTemp[_0x9afe95(0x40b)](),_0x4b46bf=_0x242bf1[_0x9afe95(0x6b2)],_0x31dcd9=_0x242bf1[_0x9afe95(0x23b)];if(!_0x5492cd)return;const _0x12f8f8=BattleManager['_targetIndex'];for(;;){BattleManager['_targetIndex']=Math[_0x9afe95(0x576)](BattleManager[_0x9afe95(0x2cb)]['length']);if(!_0x4b46bf)break;if(BattleManager[_0x9afe95(0x30a)]!==_0x12f8f8)break;if(BattleManager['_allTargets'][_0x9afe95(0x7d1)]<=0x1){BattleManager[_0x9afe95(0x30a)]=0x0;break;}}BattleManager[_0x9afe95(0x407)]=BattleManager[_0x9afe95(0x2cb)][BattleManager['_targetIndex']]||null,BattleManager[_0x9afe95(0x407)]&&_0x31dcd9[_0x9afe95(0x2b1)]()['trim']()!==_0x9afe95(0x643)&&_0x5492cd['command119']([_0x31dcd9]);}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x971),_0x22cd8b=>{const _0x3a30d1=_0x16b2b1;if(!SceneManager[_0x3a30d1(0x7ed)]())return;VisuMZ[_0x3a30d1(0x874)](_0x22cd8b,_0x22cd8b);const _0x1fd466=VisuMZ[_0x3a30d1(0x6d7)](_0x22cd8b[_0x3a30d1(0x85c)]);for(const _0x3c97bc of _0x1fd466){if(!_0x3c97bc)continue;if(!_0x3c97bc[_0x3a30d1(0x68f)]())continue;_0x3c97bc['clearActiveWeaponSlot']();}}),PluginManager[_0x16b2b1(0x289)](pluginData['name'],_0x16b2b1(0x743),_0x10a906=>{const _0x5eff2c=_0x16b2b1;if(!SceneManager[_0x5eff2c(0x7ed)]())return;VisuMZ[_0x5eff2c(0x874)](_0x10a906,_0x10a906);const _0xb9de27=$gameTemp[_0x5eff2c(0x40b)]();let _0x553243=![];const _0x2c17db=_0x10a906['JumpToLabel'],_0x3cb8b5=VisuMZ[_0x5eff2c(0x6d7)](_0x10a906[_0x5eff2c(0x85c)]);for(const _0x5c0aae of _0x3cb8b5){if(!_0x5c0aae)continue;if(!_0x5c0aae[_0x5eff2c(0x68f)]())continue;_0x5c0aae[_0x5eff2c(0x22f)](),_0x5c0aae[_0x5eff2c(0x6d6)]()[_0x5eff2c(0x7d1)]>0x0?_0x553243=!![]:_0x5c0aae['clearActiveWeaponSlot']();}_0x553243&&_0x2c17db[_0x5eff2c(0x2b1)]()[_0x5eff2c(0x7bc)]()!==_0x5eff2c(0x643)&&_0xb9de27[_0x5eff2c(0x87b)]([_0x2c17db]);}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],'ActSeq_Weapon_SetActiveWeapon',_0x2218ae=>{const _0x5fafe1=_0x16b2b1;if(!SceneManager[_0x5fafe1(0x7ed)]())return;VisuMZ[_0x5fafe1(0x874)](_0x2218ae,_0x2218ae);let _0x414860=_0x2218ae[_0x5fafe1(0x771)];_0x414860--,_0x414860=Math[_0x5fafe1(0x6fa)](_0x414860,0x0);const _0x280925=VisuMZ[_0x5fafe1(0x6d7)](_0x2218ae[_0x5fafe1(0x85c)]);for(const _0x195154 of _0x280925){if(!_0x195154)continue;if(!_0x195154[_0x5fafe1(0x68f)]())continue;_0x195154[_0x5fafe1(0x7db)](_0x414860);}}),PluginManager[_0x16b2b1(0x289)](pluginData['name'],_0x16b2b1(0x66e),_0x1fa7d9=>{const _0x41ea18=_0x16b2b1;if(!SceneManager[_0x41ea18(0x7ed)]())return;if(!Imported[_0x41ea18(0x936)])return;VisuMZ[_0x41ea18(0x874)](_0x1fa7d9,_0x1fa7d9);const _0x500757=$gameTemp[_0x41ea18(0x40b)](),_0x10cab7=_0x1fa7d9[_0x41ea18(0x43f)];if(!_0x500757)return;$gameScreen[_0x41ea18(0x3d9)](_0x1fa7d9[_0x41ea18(0x6ff)],_0x1fa7d9['Duration'],_0x1fa7d9[_0x41ea18(0x44a)]);if(_0x10cab7)_0x500757[_0x41ea18(0x384)]('battleZoom');}),PluginManager[_0x16b2b1(0x289)](pluginData['name'],_0x16b2b1(0x621),_0x261389=>{const _0x32770a=_0x16b2b1;if(!SceneManager[_0x32770a(0x7ed)]())return;if(!Imported[_0x32770a(0x936)])return;VisuMZ[_0x32770a(0x874)](_0x261389,_0x261389);const _0x3daa4a=$gameTemp[_0x32770a(0x40b)](),_0x174f66=_0x261389['WaitForZoom'];if(!_0x3daa4a)return;$gameScreen[_0x32770a(0x3d9)](0x1,_0x261389['Duration'],_0x261389['EasingType']);if(_0x174f66)_0x3daa4a[_0x32770a(0x384)](_0x32770a(0x5ba));}),PluginManager[_0x16b2b1(0x289)](pluginData[_0x16b2b1(0x802)],_0x16b2b1(0x37f),_0x199b94=>{const _0x2e9780=_0x16b2b1;if(!SceneManager[_0x2e9780(0x7ed)]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;const _0x3d0933=$gameTemp[_0x2e9780(0x40b)]();if(!_0x3d0933)return;_0x3d0933[_0x2e9780(0x384)](_0x2e9780(0x5ba));}),VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x96e)]=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot[_0x16b2b1(0x1ca)][_0x16b2b1(0x472)]=function(){const _0x25b8f9=_0x16b2b1;this[_0x25b8f9(0x70b)](),this['process_VisuMZ_BattleCore_PluginParams'](),this['process_VisuMZ_BattleCore_DamageStyles'](),this[_0x25b8f9(0x594)](),VisuMZ[_0x25b8f9(0x4da)][_0x25b8f9(0x96e)][_0x25b8f9(0x357)](this),this[_0x25b8f9(0x833)](),this[_0x25b8f9(0x2f8)]();},Scene_Boot[_0x16b2b1(0x1ca)][_0x16b2b1(0x833)]=function(){const _0x1440ed=_0x16b2b1;if(VisuMZ[_0x1440ed(0x5f7)])return;this[_0x1440ed(0x696)](),this[_0x1440ed(0x56f)](),this[_0x1440ed(0x90b)]();},Scene_Boot[_0x16b2b1(0x1ca)]['process_VisuMZ_BattleCore_Failsafes']=function(){const _0x2dfd47=_0x16b2b1,_0x152cae=$dataSystem[_0x2dfd47(0x2d0)]['length'];for(let _0x263117=0x0;_0x263117<_0x152cae;_0x263117++){const _0x2c781b=$dataSystem[_0x2dfd47(0x8bb)][_0x263117];if(_0x2c781b)continue;$dataSystem['attackMotions'][_0x263117]=JsonEx[_0x2dfd47(0x5df)]($dataSystem[_0x2dfd47(0x8bb)][0x0]);}},Scene_Boot[_0x16b2b1(0x1ca)][_0x16b2b1(0x619)]=function(){const _0x4e446c=_0x16b2b1,_0x470a25=VisuMZ[_0x4e446c(0x4da)][_0x4e446c(0x6ac)];_0x470a25['Damage']['PopupPosition']===undefined&&(_0x470a25[_0x4e446c(0x5a4)][_0x4e446c(0x762)]='base'),_0x470a25[_0x4e446c(0x435)]['SmoothImage']===undefined&&(_0x470a25[_0x4e446c(0x435)][_0x4e446c(0x838)]=![]),_0x470a25[_0x4e446c(0x706)][_0x4e446c(0x838)]===undefined&&(_0x470a25[_0x4e446c(0x706)][_0x4e446c(0x838)]=!![]),_0x470a25[_0x4e446c(0x435)]['PrioritySortActive']===undefined&&(_0x470a25[_0x4e446c(0x435)][_0x4e446c(0x7a2)]=![]),_0x470a25[_0x4e446c(0x435)][_0x4e446c(0x823)]===undefined&&(_0x470a25['Actor'][_0x4e446c(0x823)]=!![]);},VisuMZ['DamageStyles']={},Scene_Boot[_0x16b2b1(0x1ca)][_0x16b2b1(0x8ae)]=function(){const _0xca6138=_0x16b2b1;for(const _0x2c831a of VisuMZ[_0xca6138(0x4da)][_0xca6138(0x6ac)]['Damage'][_0xca6138(0x6a9)]){if(!_0x2c831a)continue;const _0x3767cc=_0x2c831a['Name'][_0xca6138(0x2b1)]()[_0xca6138(0x7bc)]();VisuMZ[_0xca6138(0x4b6)][_0x3767cc]=_0x2c831a;}},VisuMZ[_0x16b2b1(0x4da)]['RegExp']={},Scene_Boot[_0x16b2b1(0x1ca)][_0x16b2b1(0x594)]=function(){const _0x11c42d=_0x16b2b1,_0x32b820=VisuMZ[_0x11c42d(0x4da)]['RegExp'],_0x32ca75=_0x11c42d(0x4c8),_0x5e560a=[[_0x11c42d(0x792),_0x11c42d(0x7fc)],['Post','POST-']],_0xf8634b=[[_0x11c42d(0x474),_0x11c42d(0x4f5)],['%1Damage%2JS',_0x11c42d(0x3cb)]],_0x58e100=[['',''],[_0x11c42d(0x3fd),_0x11c42d(0x18e)],[_0x11c42d(0x44d),_0x11c42d(0x6a0)]];for(const _0x3c5f45 of _0xf8634b){for(const _0x1c6884 of _0x58e100){for(const _0xd0f2f of _0x5e560a){const _0x527383=_0x3c5f45[0x0][_0x11c42d(0x742)](_0xd0f2f[0x0],_0x1c6884[0x0]),_0x75febc=_0x3c5f45[0x1]['format'](_0xd0f2f[0x1],_0x1c6884[0x1])[_0x11c42d(0x7bc)](),_0x5200fa=new RegExp(_0x32ca75[_0x11c42d(0x742)](_0x75febc),'i');_0x32b820[_0x527383]=_0x5200fa;}}}const _0xf3cc60=[['%1StartActionJS',_0x11c42d(0x5bb)],[_0x11c42d(0x6b4),_0x11c42d(0x48c)]];for(const _0x4f110f of _0xf3cc60){for(const _0x401354 of _0x5e560a){const _0x16bf96=_0x4f110f[0x0][_0x11c42d(0x742)](_0x401354[0x0]),_0x27ae57=_0x4f110f[0x1][_0x11c42d(0x742)](_0x401354[0x1]),_0x2d27c5=new RegExp(_0x32ca75['format'](_0x27ae57),'i');_0x32b820[_0x16bf96]=_0x2d27c5;}}const _0x5e7a6d=[[_0x11c42d(0x3fe),_0x11c42d(0x257)],[_0x11c42d(0x622),_0x11c42d(0x3b4)],['BattleVictoryJS','JS\x20BATTLE\x20VICTORY'],[_0x11c42d(0x2f4),_0x11c42d(0x3b2)],[_0x11c42d(0x250),_0x11c42d(0x840)],['EscapeFailureJS',_0x11c42d(0x3e2)],['%1StartTurnJS',_0x11c42d(0x791)],[_0x11c42d(0x25e),_0x11c42d(0x52b)],[_0x11c42d(0x76d),_0x11c42d(0x849)]];for(const _0x39e7a6 of _0x5e7a6d){for(const _0x32a0ac of _0x5e560a){const _0x491126=_0x39e7a6[0x0][_0x11c42d(0x742)](_0x32a0ac[0x0]),_0xe66779=_0x39e7a6[0x1]['format'](_0x32a0ac[0x1]),_0x5ca6cb=new RegExp(_0x32ca75['format'](_0xe66779),'i');_0x32b820[_0x491126]=_0x5ca6cb;}}},Scene_Boot[_0x16b2b1(0x1ca)][_0x16b2b1(0x696)]=function(){const _0x418809=_0x16b2b1,_0x1f1a57=$dataSkills['concat']($dataItems);for(const _0x6b0420 of _0x1f1a57){if(!_0x6b0420)continue;VisuMZ[_0x418809(0x4da)]['Parse_Notetags_Action'](_0x6b0420);}},Scene_Boot[_0x16b2b1(0x1ca)][_0x16b2b1(0x56f)]=function(){const _0x56a6ae=_0x16b2b1,_0x137aa9=$dataActors[_0x56a6ae(0x6ba)]($dataClasses,$dataWeapons,$dataArmors,$dataEnemies,$dataStates);for(const _0x58cfd8 of _0x137aa9){if(!_0x58cfd8)continue;VisuMZ[_0x56a6ae(0x4da)][_0x56a6ae(0x924)](_0x58cfd8);}},Scene_Boot['prototype'][_0x16b2b1(0x2f8)]=function(){const _0x4a04c1=_0x16b2b1,_0xb38301=VisuMZ['BattleCore'][_0x4a04c1(0x6ac)][_0x4a04c1(0x37d)][_0x4a04c1(0x287)],_0x16afe1=[];for(const _0x4fd93b of _0xb38301){const _0xb5f95f=$dataTroops[_0x4fd93b];if(_0xb5f95f)_0x16afe1['push'](JsonEx['makeDeepCopy'](_0xb5f95f));}for(const _0x4090b8 of $dataTroops){if(!_0x4090b8)continue;for(const _0x254405 of _0x16afe1){if(_0x254405['id']===_0x4090b8['id'])continue;_0x4090b8['pages']=_0x4090b8[_0x4a04c1(0x2cd)][_0x4a04c1(0x6ba)](_0x254405[_0x4a04c1(0x2cd)]);}}},Scene_Boot[_0x16b2b1(0x1ca)][_0x16b2b1(0x90b)]=function(){const _0x4af7b3=_0x16b2b1,_0x4a3d97=$dataSkills[_0x4af7b3(0x6ba)]($dataItems);for(const _0x2e4b0c of _0x4a3d97){if(!_0x2e4b0c)continue;VisuMZ[_0x4af7b3(0x4da)][_0x4af7b3(0x8d7)](_0x2e4b0c);}},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x741)]=VisuMZ[_0x16b2b1(0x741)],VisuMZ[_0x16b2b1(0x741)]=function(_0x5571b0){const _0x2b6c00=_0x16b2b1;VisuMZ[_0x2b6c00(0x4da)][_0x2b6c00(0x741)]&&VisuMZ['BattleCore'][_0x2b6c00(0x741)]['call'](this,_0x5571b0),VisuMZ[_0x2b6c00(0x4da)][_0x2b6c00(0x924)](_0x5571b0);},VisuMZ['BattleCore'][_0x16b2b1(0x63d)]=VisuMZ[_0x16b2b1(0x63d)],VisuMZ[_0x16b2b1(0x63d)]=function(_0x3a6000){const _0x5bcfb8=_0x16b2b1;VisuMZ[_0x5bcfb8(0x4da)][_0x5bcfb8(0x63d)]&&VisuMZ[_0x5bcfb8(0x4da)]['ParseClassNotetags'][_0x5bcfb8(0x357)](this,_0x3a6000),VisuMZ[_0x5bcfb8(0x4da)]['Parse_Notetags_TraitObjects'](_0x3a6000);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x6e6)]=VisuMZ[_0x16b2b1(0x6e6)],VisuMZ[_0x16b2b1(0x6e6)]=function(_0x7bd4){const _0x54d9f3=_0x16b2b1;VisuMZ[_0x54d9f3(0x4da)][_0x54d9f3(0x6e6)]&&VisuMZ[_0x54d9f3(0x4da)][_0x54d9f3(0x6e6)]['call'](this,_0x7bd4),VisuMZ[_0x54d9f3(0x4da)][_0x54d9f3(0x5c7)](_0x7bd4),VisuMZ[_0x54d9f3(0x4da)][_0x54d9f3(0x8d7)](_0x7bd4);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x61b)]=VisuMZ[_0x16b2b1(0x61b)],VisuMZ[_0x16b2b1(0x61b)]=function(_0x49d564){const _0xdef58f=_0x16b2b1;VisuMZ['BattleCore'][_0xdef58f(0x61b)]&&VisuMZ['BattleCore']['ParseItemNotetags'][_0xdef58f(0x357)](this,_0x49d564),VisuMZ[_0xdef58f(0x4da)][_0xdef58f(0x5c7)](_0x49d564),VisuMZ['BattleCore'][_0xdef58f(0x8d7)](_0x49d564);},VisuMZ['BattleCore'][_0x16b2b1(0x2c4)]=VisuMZ[_0x16b2b1(0x2c4)],VisuMZ['ParseWeaponNotetags']=function(_0x2c2b5b){const _0x589b30=_0x16b2b1;VisuMZ[_0x589b30(0x4da)][_0x589b30(0x2c4)]&&VisuMZ['BattleCore'][_0x589b30(0x2c4)][_0x589b30(0x357)](this,_0x2c2b5b),VisuMZ['BattleCore']['Parse_Notetags_TraitObjects'](_0x2c2b5b);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x270)]=VisuMZ['ParseArmorNotetags'],VisuMZ['ParseArmorNotetags']=function(_0x356d98){const _0x1818cd=_0x16b2b1;VisuMZ[_0x1818cd(0x4da)][_0x1818cd(0x270)]&&VisuMZ[_0x1818cd(0x4da)][_0x1818cd(0x270)]['call'](this,_0x356d98),VisuMZ[_0x1818cd(0x4da)][_0x1818cd(0x924)](_0x356d98);},VisuMZ['BattleCore']['ParseEnemyNotetags']=VisuMZ[_0x16b2b1(0x448)],VisuMZ[_0x16b2b1(0x448)]=function(_0x28a6f0){const _0x23242d=_0x16b2b1;VisuMZ[_0x23242d(0x4da)]['ParseEnemyNotetags']&&VisuMZ[_0x23242d(0x4da)][_0x23242d(0x448)]['call'](this,_0x28a6f0),VisuMZ[_0x23242d(0x4da)]['Parse_Notetags_TraitObjects'](_0x28a6f0);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x885)]=VisuMZ['ParseStateNotetags'],VisuMZ['ParseStateNotetags']=function(_0x6539ef){const _0x34439a=_0x16b2b1;VisuMZ[_0x34439a(0x4da)][_0x34439a(0x885)]&&VisuMZ['BattleCore'][_0x34439a(0x885)][_0x34439a(0x357)](this,_0x6539ef),VisuMZ['BattleCore'][_0x34439a(0x924)](_0x6539ef);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x5c7)]=function(_0x13ef3){const _0x44b2b5=_0x16b2b1,_0x581e6c=[_0x44b2b5(0x783),_0x44b2b5(0x1b6),_0x44b2b5(0x4af),'PostDamageJS',_0x44b2b5(0x29b),_0x44b2b5(0x444),'PreEndActionJS',_0x44b2b5(0x225)];for(const _0x244066 of _0x581e6c){VisuMZ[_0x44b2b5(0x4da)][_0x44b2b5(0x6d4)](_0x13ef3,_0x244066);}const _0x2df794=_0x13ef3[_0x44b2b5(0x50c)];_0x2df794['match'](/<ALWAYS CRITICAL/i)&&(_0x13ef3[_0x44b2b5(0x271)][_0x44b2b5(0x784)]=!![]),_0x2df794[_0x44b2b5(0x6ef)](/<(?:REPEAT|REPEATS|REPEAT HITS):[ ](\d+)/i)&&(_0x13ef3[_0x44b2b5(0x6ed)]=Math[_0x44b2b5(0x6fa)](0x1,Number(RegExp['$1']))),_0x2df794[_0x44b2b5(0x6ef)](/<TARGET:[ ](.*)>/i)&&(_0x13ef3['scope']=String(RegExp['$1'])['toUpperCase']()['trim']());},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x924)]=function(_0x276643){const _0x497500=_0x16b2b1,_0x670252=[_0x497500(0x486),_0x497500(0x627),_0x497500(0x835),_0x497500(0x73e),_0x497500(0x43b),'PostApplyAsTargetJS',_0x497500(0x4c2),_0x497500(0x8c8),_0x497500(0x29b),_0x497500(0x444),'PreEndActionJS',_0x497500(0x225),_0x497500(0x8e0),_0x497500(0x705),'PreEndBattleJS','PostEndBattleJS','BattleVictoryJS',_0x497500(0x2f4),_0x497500(0x250),_0x497500(0x7ca),_0x497500(0x236),'PostStartTurnJS',_0x497500(0x1cf),_0x497500(0x5d3),_0x497500(0x49b),_0x497500(0x44b)];for(const _0x336ad6 of _0x670252){VisuMZ[_0x497500(0x4da)]['createJS'](_0x276643,_0x336ad6);}},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x8d7)]=function(_0x14dfbb){const _0x407b9c=_0x16b2b1,_0x5147de=_0x14dfbb[_0x407b9c(0x50c)];if(_0x5147de[_0x407b9c(0x6ef)](/<JS TARGETS>\s*([\s\S]*)\s*<\/JS TARGETS>/i)){const _0x19428f=String(RegExp['$1']),_0x263165=VisuMZ[_0x407b9c(0x4da)][_0x407b9c(0x525)](_0x14dfbb,_0x407b9c(0x85c));VisuMZ[_0x407b9c(0x4da)]['createTargetsJS'](_0x19428f,_0x263165);}if(_0x5147de[_0x407b9c(0x6ef)](/<JS COMMAND (?:VISIBLE|SHOW|HIDE)>\s*([\s\S]*)\s*<\/JS COMMAND (?:VISIBLE|SHOW|HIDE)>/i)){const _0x45a230=String(RegExp['$1']),_0x185244=VisuMZ[_0x407b9c(0x4da)]['createKeyJS'](_0x14dfbb,_0x407b9c(0x21e));VisuMZ[_0x407b9c(0x4da)]['createCommandVisibleJS'](_0x45a230,_0x185244);}},VisuMZ[_0x16b2b1(0x4da)]['JS']={},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x6d4)]=function(_0x11c8f6,_0x15dd3b){const _0x171b8d=_0x16b2b1,_0xcd6b2e=_0x11c8f6[_0x171b8d(0x50c)];if(_0xcd6b2e[_0x171b8d(0x6ef)](VisuMZ['BattleCore']['RegExp'][_0x15dd3b])){const _0x80297c=RegExp['$1'],_0x7a4ece=_0x171b8d(0x3f5)[_0x171b8d(0x742)](_0x80297c),_0x5b6a98=VisuMZ[_0x171b8d(0x4da)][_0x171b8d(0x525)](_0x11c8f6,_0x15dd3b);VisuMZ[_0x171b8d(0x4da)]['JS'][_0x5b6a98]=new Function(_0x7a4ece);}},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x525)]=function(_0x3a1e55,_0x56a238){const _0x32df5f=_0x16b2b1;let _0x42be7c='';if($dataActors['includes'](_0x3a1e55))_0x42be7c='Actor-%1-%2'[_0x32df5f(0x742)](_0x3a1e55['id'],_0x56a238);if($dataClasses[_0x32df5f(0x3e4)](_0x3a1e55))_0x42be7c='Class-%1-%2'['format'](_0x3a1e55['id'],_0x56a238);if($dataSkills['includes'](_0x3a1e55))_0x42be7c='Skill-%1-%2'[_0x32df5f(0x742)](_0x3a1e55['id'],_0x56a238);if($dataItems[_0x32df5f(0x3e4)](_0x3a1e55))_0x42be7c=_0x32df5f(0x4ad)['format'](_0x3a1e55['id'],_0x56a238);if($dataWeapons['includes'](_0x3a1e55))_0x42be7c=_0x32df5f(0x29a)['format'](_0x3a1e55['id'],_0x56a238);if($dataArmors[_0x32df5f(0x3e4)](_0x3a1e55))_0x42be7c=_0x32df5f(0x806)['format'](_0x3a1e55['id'],_0x56a238);if($dataEnemies['includes'](_0x3a1e55))_0x42be7c=_0x32df5f(0x1a7)['format'](_0x3a1e55['id'],_0x56a238);if($dataStates['includes'](_0x3a1e55))_0x42be7c='State-%1-%2'[_0x32df5f(0x742)](_0x3a1e55['id'],_0x56a238);return _0x42be7c;},VisuMZ['BattleCore'][_0x16b2b1(0x4fa)]=function(_0x7dc7a6,_0xb80ef3){const _0x3f8f96=_0x16b2b1,_0x42062b='\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20targets\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20targets\x20||\x20[];\x0a\x20\x20\x20\x20'['format'](_0x7dc7a6);VisuMZ[_0x3f8f96(0x4da)]['JS'][_0xb80ef3]=new Function(_0x42062b);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x310)]=function(_0x2b1ffa,_0x2c4b3f){const _0x35f2ed=_0x16b2b1,_0x488c86='\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20'[_0x35f2ed(0x742)](_0x2b1ffa);VisuMZ['BattleCore']['JS'][_0x2c4b3f]=new Function(_0x488c86);},TextManager['autoBattle']=VisuMZ[_0x16b2b1(0x4da)]['Settings'][_0x16b2b1(0x47a)][_0x16b2b1(0x62e)],TextManager['autoBattleStart']=VisuMZ[_0x16b2b1(0x4da)]['Settings'][_0x16b2b1(0x352)][_0x16b2b1(0x788)],TextManager[_0x16b2b1(0x798)]=VisuMZ['BattleCore'][_0x16b2b1(0x6ac)][_0x16b2b1(0x352)][_0x16b2b1(0x1c2)],TextManager[_0x16b2b1(0x65c)]=VisuMZ['BattleCore'][_0x16b2b1(0x6ac)][_0x16b2b1(0x573)][_0x16b2b1(0x59d)],ColorManager[_0x16b2b1(0x8ce)]=function(_0x3df220){const _0xb190cb=_0x16b2b1;return _0x3df220=String(_0x3df220),_0x3df220[_0xb190cb(0x6ef)](/#(.*)/i)?'#%1'[_0xb190cb(0x742)](String(RegExp['$1'])):this[_0xb190cb(0x67b)](Number(_0x3df220));},DataManager[_0x16b2b1(0x942)]=function(_0x51f4d7){const _0x41b96a=_0x16b2b1;if(_0x51f4d7[_0x41b96a(0x50c)][_0x41b96a(0x6ef)](/<DAMAGE STYLE:[ ](.*)>/i)){const _0x16c6c5=String(RegExp['$1'])[_0x41b96a(0x2b1)]()[_0x41b96a(0x7bc)]();if(_0x16c6c5===_0x41b96a(0x892))return _0x41b96a(0x892);if(VisuMZ['DamageStyles'][_0x16c6c5])return _0x16c6c5;}const _0x2a84be=VisuMZ[_0x41b96a(0x4da)][_0x41b96a(0x6ac)][_0x41b96a(0x5a4)][_0x41b96a(0x507)][_0x41b96a(0x2b1)]()[_0x41b96a(0x7bc)]();if(VisuMZ[_0x41b96a(0x4b6)][_0x2a84be])return _0x2a84be;return _0x41b96a(0x892);},DataManager['getStypeIdWithName']=function(_0x5071c2){const _0x5003c9=_0x16b2b1;_0x5071c2=_0x5071c2['toUpperCase']()['trim'](),this[_0x5003c9(0x508)]=this[_0x5003c9(0x508)]||{};if(this['_stypeIDs'][_0x5071c2])return this[_0x5003c9(0x508)][_0x5071c2];for(let _0x4e0ff6=0x1;_0x4e0ff6<0x64;_0x4e0ff6++){if(!$dataSystem['skillTypes'][_0x4e0ff6])continue;let _0x165988=$dataSystem[_0x5003c9(0x29c)][_0x4e0ff6]['toUpperCase']()[_0x5003c9(0x7bc)]();_0x165988=_0x165988[_0x5003c9(0x702)](/\x1I\[(\d+)\]/gi,''),_0x165988=_0x165988[_0x5003c9(0x702)](/\\I\[(\d+)\]/gi,''),this['_stypeIDs'][_0x165988]=_0x4e0ff6;}return this[_0x5003c9(0x508)][_0x5071c2]||0x0;},DataManager[_0x16b2b1(0x93c)]=function(_0x590e37){const _0xd148d7=_0x16b2b1;_0x590e37=_0x590e37[_0xd148d7(0x2b1)]()[_0xd148d7(0x7bc)](),this['_skillIDs']=this[_0xd148d7(0x416)]||{};if(this[_0xd148d7(0x416)][_0x590e37])return this[_0xd148d7(0x416)][_0x590e37];for(const _0xebf310 of $dataSkills){if(!_0xebf310)continue;this[_0xd148d7(0x416)][_0xebf310[_0xd148d7(0x802)][_0xd148d7(0x2b1)]()['trim']()]=_0xebf310['id'];}return this[_0xd148d7(0x416)][_0x590e37]||0x0;},DataManager[_0x16b2b1(0x4b9)]=function(_0x1a4c8e){const _0x37a756=_0x16b2b1;_0x1a4c8e=_0x1a4c8e[_0x37a756(0x2b1)]()['trim'](),this[_0x37a756(0x70c)]=this[_0x37a756(0x70c)]||{};if(this[_0x37a756(0x70c)][_0x1a4c8e])return this[_0x37a756(0x70c)][_0x1a4c8e];for(const _0x477701 of $dataEnemies){if(!_0x477701)continue;this[_0x37a756(0x70c)][_0x477701[_0x37a756(0x802)][_0x37a756(0x2b1)]()[_0x37a756(0x7bc)]()]=_0x477701['id'];}return this[_0x37a756(0x70c)][_0x1a4c8e]||0x0;},DataManager[_0x16b2b1(0x851)]=function(_0x235007){const _0x4d31a2=_0x16b2b1;_0x235007=_0x235007[_0x4d31a2(0x2b1)]()[_0x4d31a2(0x7bc)](),this['_wtypeIDs']=this[_0x4d31a2(0x27d)]||{};if(this[_0x4d31a2(0x27d)][_0x235007])return this[_0x4d31a2(0x27d)][_0x235007];for(let _0x2b6a75=0x1;_0x2b6a75<0x64;_0x2b6a75++){if(!$dataSystem[_0x4d31a2(0x2d0)][_0x2b6a75])continue;let _0x37b0ba=$dataSystem[_0x4d31a2(0x2d0)][_0x2b6a75]['toUpperCase']()[_0x4d31a2(0x7bc)]();_0x37b0ba=_0x37b0ba[_0x4d31a2(0x702)](/\x1I\[(\d+)\]/gi,''),_0x37b0ba=_0x37b0ba['replace'](/\\I\[(\d+)\]/gi,''),this['_wtypeIDs'][_0x37b0ba]=_0x2b6a75;}return this[_0x4d31a2(0x27d)][_0x4d31a2(0x580)]=0x0,this[_0x4d31a2(0x27d)][_0x235007]||0x0;},DataManager[_0x16b2b1(0x27b)]=function(_0x40bfd9){const _0x1f262e=_0x16b2b1,_0x58d471=_0x1f262e(0x664);let _0x54e475=_0x40bfd9[_0x1f262e(0x64d)],_0x317eed=_0x40bfd9['name'];const _0x4e5b6a=_0x40bfd9['note'];return _0x4e5b6a[_0x1f262e(0x6ef)](/<DISPLAY ICON: (\d+)>/i)&&(_0x54e475=Number(RegExp['$1'])),_0x4e5b6a[_0x1f262e(0x6ef)](/<DISPLAY TEXT: (.*)>/i)&&(_0x317eed=String(RegExp['$1'])),_0x58d471[_0x1f262e(0x742)](_0x54e475,_0x317eed);},DataManager[_0x16b2b1(0x280)]=function(_0x3d8696){const _0x1575f9=_0x16b2b1;return _0x3d8696[_0x1575f9(0x50c)][_0x1575f9(0x6ef)](/<COMMAND TEXT: (.*)>/i)?String(RegExp['$1']):_0x3d8696[_0x1575f9(0x802)];},DataManager[_0x16b2b1(0x6f1)]=function(_0xab013b){const _0x590a61=_0x16b2b1;return _0xab013b[_0x590a61(0x50c)][_0x590a61(0x6ef)](/<COMMAND ICON: (\d+)>/i)?Number(RegExp['$1']):_0xab013b[_0x590a61(0x64d)];},DataManager['swapEnemyIDs']=function(_0x76aa02){const _0x3acdea=_0x16b2b1,_0x19c04c=$dataEnemies[_0x76aa02];if(_0x19c04c){if(_0x19c04c[_0x3acdea(0x50c)][_0x3acdea(0x6ef)](/<SWAP ENEMIES>\s*([\s\S]*)\s*<\/SWAP ENEMIES>/i)){const _0x43c691=String(RegExp['$1'])[_0x3acdea(0x3da)](/[\r\n]+/)['remove'](''),_0x52f406=this[_0x3acdea(0x69b)](_0x43c691);_0x76aa02=this[_0x3acdea(0x4b9)](_0x52f406)||_0x76aa02,_0x76aa02=DataManager[_0x3acdea(0x8d9)](_0x76aa02);}}return _0x76aa02;},DataManager[_0x16b2b1(0x69b)]=function(_0x571060){const _0x4a3a9d=_0x16b2b1;let _0x108c80=0x0;const _0x19a09c={};for(const _0x136d49 of _0x571060){if(_0x136d49[_0x4a3a9d(0x6ef)](/(.*):[ ](\d+)/i)){const _0x326d32=String(RegExp['$1'])['trim'](),_0x2c09ff=Number(RegExp['$2']);_0x19a09c[_0x326d32]=_0x2c09ff,_0x108c80+=_0x2c09ff;}else{if(_0x136d49[_0x4a3a9d(0x6ef)](/(.*):[ ](\d+\.?\d+)/i)){const _0x446757=String(RegExp['$1'])['trim'](),_0x1d9e9e=Number(RegExp['$2']);_0x19a09c[_0x446757]=_0x1d9e9e,_0x108c80+=_0x1d9e9e;}else _0x136d49!==''&&(_0x19a09c[_0x136d49]=0x1,_0x108c80++);}}if(_0x108c80<=0x0)return'';let _0x4ba7ba=Math[_0x4a3a9d(0x4ae)]()*_0x108c80;for(const _0x5d136c in _0x19a09c){_0x4ba7ba-=_0x19a09c[_0x5d136c];if(_0x4ba7ba<=0x0)return _0x5d136c;}return'';},DataManager[_0x16b2b1(0x295)]=function(_0x3a2278){const _0x359978=_0x16b2b1;if(!_0x3a2278)return![];if(!VisuMZ[_0x359978(0x4da)][_0x359978(0x6ac)]['ActionSequence'][_0x359978(0x220)])return![];if(_0x3a2278['note'][_0x359978(0x6ef)](/<AUTO ACTION SEQUENCE>/i))return![];if(_0x3a2278[_0x359978(0x50c)][_0x359978(0x6ef)](/<COMMON (?:EVENT|EVENTS):[ ](.*)>/gi))return!![];for(const _0x332404 of _0x3a2278[_0x359978(0x212)]){if(!_0x332404)continue;if(_0x332404[_0x359978(0x2e8)]===Game_Action['EFFECT_COMMON_EVENT'])return!![];}return![];},ConfigManager[_0x16b2b1(0x3ce)]=ConfigManager[_0x16b2b1(0x3ce)]??![],ConfigManager['autoBattleUseSkills']=ConfigManager[_0x16b2b1(0x395)]??![],ConfigManager[_0x16b2b1(0x65c)]=ConfigManager[_0x16b2b1(0x65c)]??!![],VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x1da)]=ConfigManager[_0x16b2b1(0x560)],ConfigManager[_0x16b2b1(0x560)]=function(){const _0x4ccc82=_0x16b2b1,_0x5e5295=VisuMZ['BattleCore'][_0x4ccc82(0x1da)][_0x4ccc82(0x357)](this);return _0x5e5295['autoBattleAtStart']=this[_0x4ccc82(0x3ce)],_0x5e5295['autoBattleUseSkills']=this[_0x4ccc82(0x395)],_0x5e5295[_0x4ccc82(0x65c)]=this['visualHpGauge'],_0x5e5295;},VisuMZ['BattleCore'][_0x16b2b1(0x45e)]=ConfigManager[_0x16b2b1(0x51b)],ConfigManager['applyData']=function(_0x31999f){const _0x451a08=_0x16b2b1;VisuMZ[_0x451a08(0x4da)][_0x451a08(0x45e)][_0x451a08(0x357)](this,_0x31999f),'autoBattleAtStart'in _0x31999f?this[_0x451a08(0x3ce)]=_0x31999f['autoBattleAtStart']:this['autoBattleAtStart']=![],_0x451a08(0x395)in _0x31999f?this['autoBattleUseSkills']=_0x31999f[_0x451a08(0x395)]:this[_0x451a08(0x395)]=![],'visualHpGauge'in _0x31999f?this['visualHpGauge']=_0x31999f[_0x451a08(0x65c)]:this['visualHpGauge']=!![];},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x4bb)]=BattleManager[_0x16b2b1(0x5af)],BattleManager['initMembers']=function(){const _0x3042ab=_0x16b2b1;VisuMZ[_0x3042ab(0x4da)][_0x3042ab(0x4bb)][_0x3042ab(0x357)](this),this[_0x3042ab(0x601)]=[];},BattleManager[_0x16b2b1(0x976)]=function(){const _0x5af14e=_0x16b2b1;if(!SceneManager[_0x5af14e(0x7ed)]())return;const _0x92c0d1=SceneManager['_scene']['_statusWindow'];if(_0x92c0d1)_0x92c0d1[_0x5af14e(0x5e8)]();},BattleManager[_0x16b2b1(0x837)]=function(){const _0x264115=_0x16b2b1;if(BattleManager[_0x264115(0x1fc)]())return _0x264115(0x7f3);return'DTB';},BattleManager['isBattleSys']=function(_0x12d645){const _0x2596c3=_0x16b2b1;return _0x12d645=_0x12d645[_0x2596c3(0x2b1)]()['trim'](),this[_0x2596c3(0x837)]()===_0x12d645;},BattleManager['isDTB']=function(){const _0x4ecea1=_0x16b2b1;return this[_0x4ecea1(0x3c8)]('DTB');},BattleManager[_0x16b2b1(0x69d)]=function(){const _0xe1f0ce=_0x16b2b1;return this[_0xe1f0ce(0x4f8)]();},BattleManager['isTickBased']=function(){const _0x8ba6db=_0x16b2b1;return!this[_0x8ba6db(0x69d)]();},BattleManager[_0x16b2b1(0x8c5)]=function(){const _0x33f7bb=_0x16b2b1;return!this[_0x33f7bb(0x69d)]()&&!this[_0x33f7bb(0x8d4)]();},BattleManager['processBattleCoreJS']=function(_0x42e9e8){const _0x22ecff=_0x16b2b1;$gameParty[_0x22ecff(0x78a)](_0x42e9e8),$gameTroop[_0x22ecff(0x78a)](_0x42e9e8);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x1a6)]=BattleManager[_0x16b2b1(0x2c0)],BattleManager[_0x16b2b1(0x2c0)]=function(){const _0x560a40=_0x16b2b1;this[_0x560a40(0x2da)]=![],this[_0x560a40(0x4fb)]=ConfigManager[_0x560a40(0x3ce)],this[_0x560a40(0x78a)](_0x560a40(0x8e0)),VisuMZ['BattleCore']['BattleManager_startBattle'][_0x560a40(0x357)](this),this[_0x560a40(0x78a)]('PostStartBattleJS');},BattleManager[_0x16b2b1(0x2a8)]=function(_0x12a431){const _0x5e61cf=_0x16b2b1,_0x38dfac=VisuMZ[_0x5e61cf(0x4da)][_0x5e61cf(0x6ac)][_0x5e61cf(0x37d)];_0x38dfac[_0x5e61cf(0x438)]&&VisuMZ[_0x5e61cf(0x4da)][_0x5e61cf(0x503)](_0x38dfac[_0x5e61cf(0x438)])&&$gameTemp[_0x5e61cf(0x1fd)](_0x38dfac[_0x5e61cf(0x438)]);const _0x5d068f=_0x5e61cf(0x28e)[_0x5e61cf(0x742)](_0x12a431);_0x38dfac[_0x5d068f]&&VisuMZ['BattleCore'][_0x5e61cf(0x503)](_0x38dfac[_0x5d068f])&&$gameTemp['reserveCommonEvent'](_0x38dfac[_0x5d068f]);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x1de)]=BattleManager['processVictory'],BattleManager[_0x16b2b1(0x633)]=function(){const _0x17a82d=_0x16b2b1;this[_0x17a82d(0x78a)](_0x17a82d(0x7b3)),VisuMZ[_0x17a82d(0x4da)][_0x17a82d(0x1de)]['call'](this),this[_0x17a82d(0x2a8)](_0x17a82d(0x8a8));},VisuMZ[_0x16b2b1(0x4da)]['BattleManager_processDefeat']=BattleManager[_0x16b2b1(0x3fa)],BattleManager[_0x16b2b1(0x3fa)]=function(){const _0x52eb66=_0x16b2b1;this[_0x52eb66(0x78a)](_0x52eb66(0x2f4)),VisuMZ[_0x52eb66(0x4da)][_0x52eb66(0x745)][_0x52eb66(0x357)](this),this[_0x52eb66(0x2a8)]('Defeat');},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x40d)]=BattleManager[_0x16b2b1(0x8e3)],BattleManager['endBattle']=function(_0x1169b4){const _0x5b59d6=_0x16b2b1;this[_0x5b59d6(0x2da)]=!![],this[_0x5b59d6(0x4fb)]=![],this[_0x5b59d6(0x78a)](_0x5b59d6(0x93d)),VisuMZ[_0x5b59d6(0x4da)]['BattleManager_endBattle'][_0x5b59d6(0x357)](this,_0x1169b4),this[_0x5b59d6(0x78a)](_0x5b59d6(0x626));},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x8f4)]=BattleManager[_0x16b2b1(0x575)],BattleManager[_0x16b2b1(0x575)]=function(){const _0x3fbbef=_0x16b2b1;if(this[_0x3fbbef(0x69d)]())this[_0x3fbbef(0x78a)](_0x3fbbef(0x236));VisuMZ[_0x3fbbef(0x4da)][_0x3fbbef(0x8f4)][_0x3fbbef(0x357)](this);if(this[_0x3fbbef(0x69d)]())this[_0x3fbbef(0x78a)](_0x3fbbef(0x2be));},VisuMZ['BattleCore'][_0x16b2b1(0x642)]=BattleManager[_0x16b2b1(0x5a6)],BattleManager[_0x16b2b1(0x5a6)]=function(){const _0x41df85=_0x16b2b1,_0x16274d=this[_0x41df85(0x8ff)][_0x41df85(0x1ae)]();if(_0x16274d)_0x16274d['actionBattleCoreJS'](_0x41df85(0x29b));VisuMZ[_0x41df85(0x4da)][_0x41df85(0x642)][_0x41df85(0x357)](this);if(_0x16274d)_0x16274d[_0x41df85(0x900)](_0x41df85(0x444));},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x478)]=BattleManager['endAction'],BattleManager['endAction']=function(){const _0x2280cf=_0x16b2b1,_0x142483=this['_action'];_0x142483&&_0x142483[_0x2280cf(0x900)](_0x2280cf(0x669)),VisuMZ[_0x2280cf(0x4da)]['BattleManager_endAction']['call'](this),_0x142483&&_0x142483[_0x2280cf(0x900)](_0x2280cf(0x225)),this[_0x2280cf(0x4a2)](this['allBattleMembers']());},BattleManager['refreshBattlerMotions']=function(_0x1c9f09){const _0x146d41=_0x16b2b1;for(const _0x20ba91 of _0x1c9f09){if(!_0x20ba91)continue;if(!_0x20ba91[_0x146d41(0x4e0)]())continue;_0x20ba91[_0x146d41(0x4e0)]()[_0x146d41(0x827)]();}},BattleManager[_0x16b2b1(0x698)]=function(){const _0x42924c=_0x16b2b1;!this['_logWindow']['isBusy']()&&this[_0x42924c(0x239)]();},Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x258)]=function(){const _0x3ba8ed=_0x16b2b1;this[_0x3ba8ed(0x2c7)]();if(Imported[_0x3ba8ed(0x5f2)]){const _0x5b92cd=VisuMZ['SkillsStatesCore'][_0x3ba8ed(0x6ac)][_0x3ba8ed(0x955)];_0x5b92cd&&_0x5b92cd[_0x3ba8ed(0x640)]===![]&&this[_0x3ba8ed(0x2d8)](0x1);}else this[_0x3ba8ed(0x2d8)](0x1);this['removeBuffsAuto']();},BattleManager[_0x16b2b1(0x21d)]=function(){const _0x281c2e=_0x16b2b1;this[_0x281c2e(0x897)]=VisuMZ[_0x281c2e(0x4da)][_0x281c2e(0x6ac)][_0x281c2e(0x37d)]['CalcEscapeRatioJS'][_0x281c2e(0x357)](this);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x5a5)]=BattleManager[_0x16b2b1(0x297)],BattleManager['onEscapeSuccess']=function(){const _0x3f0fd8=_0x16b2b1;this[_0x3f0fd8(0x78a)](_0x3f0fd8(0x250)),BattleManager[_0x3f0fd8(0x7d7)][_0x3f0fd8(0x940)](),VisuMZ[_0x3f0fd8(0x4da)]['BattleManager_onEscapeSuccess']['call'](this),this['processPostBattleCommonEvents'](_0x3f0fd8(0x7ae));},VisuMZ['BattleCore'][_0x16b2b1(0x7d2)]=BattleManager[_0x16b2b1(0x24e)],BattleManager[_0x16b2b1(0x24e)]=function(){const _0x58033e=_0x16b2b1;this[_0x58033e(0x78a)](_0x58033e(0x7ca));const _0x49f278=this[_0x58033e(0x897)];VisuMZ['BattleCore'][_0x58033e(0x7d2)][_0x58033e(0x357)](this),this[_0x58033e(0x897)]=_0x49f278+VisuMZ[_0x58033e(0x4da)]['Settings'][_0x58033e(0x37d)]['CalcEscapeRaiseJS'][_0x58033e(0x357)](this),this[_0x58033e(0x2a8)](_0x58033e(0x283));},BattleManager[_0x16b2b1(0x2e0)]=function(){const _0x42f0ba=_0x16b2b1;let _0x5c4dd4=![];if(this[_0x42f0ba(0x4b1)]())for(const _0x14d21e of $gameTroop['enemyNames']()){this[_0x42f0ba(0x629)][_0x42f0ba(0x305)](_0x42f0ba(0x3dc),TextManager['emerge'][_0x42f0ba(0x742)](_0x14d21e)),this[_0x42f0ba(0x629)][_0x42f0ba(0x305)](_0x42f0ba(0x7bd)),_0x5c4dd4=!![];}if(this['_preemptive'])this[_0x42f0ba(0x629)]['push'](_0x42f0ba(0x3dc),TextManager[_0x42f0ba(0x79b)][_0x42f0ba(0x742)]($gameParty['name']())),this['_logWindow'][_0x42f0ba(0x305)]('wait');else this[_0x42f0ba(0x5dd)]&&(this[_0x42f0ba(0x629)][_0x42f0ba(0x305)](_0x42f0ba(0x3dc),TextManager[_0x42f0ba(0x84c)][_0x42f0ba(0x742)]($gameParty[_0x42f0ba(0x802)]())),this[_0x42f0ba(0x629)][_0x42f0ba(0x305)](_0x42f0ba(0x7bd)));_0x5c4dd4&&(this[_0x42f0ba(0x629)][_0x42f0ba(0x305)](_0x42f0ba(0x7bd)),this[_0x42f0ba(0x629)]['push'](_0x42f0ba(0x7e7))),this[_0x42f0ba(0x1fc)]()&&this['isSkipPartyCommandWindow']()&&(this[_0x42f0ba(0x404)]=![]);},BattleManager[_0x16b2b1(0x4b1)]=function(){const _0x4cf859=_0x16b2b1;if(BattleManager[_0x4cf859(0x4fb)])return![];return VisuMZ['BattleCore'][_0x4cf859(0x6ac)][_0x4cf859(0x706)]['EmergeText'];},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x43c)]=BattleManager[_0x16b2b1(0x69e)],BattleManager['startInput']=function(){const _0x4e2990=_0x16b2b1;VisuMZ[_0x4e2990(0x4da)][_0x4e2990(0x43c)][_0x4e2990(0x357)](this),this['isDTB']()&&this['isSkipPartyCommandWindow']()&&!this[_0x4e2990(0x5dd)]&&$gameParty[_0x4e2990(0x415)]()&&this[_0x4e2990(0x3ba)]();},BattleManager[_0x16b2b1(0x730)]=function(){const _0x3d4719=_0x16b2b1;return VisuMZ['BattleCore']['Settings'][_0x3d4719(0x47a)][_0x3d4719(0x808)];},BattleManager[_0x16b2b1(0x61a)]=function(){const _0x3ecd62=_0x16b2b1;this[_0x3ecd62(0x494)]()&&this[_0x3ecd62(0x3ba)]();},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x308)]=Scene_Battle['prototype'][_0x16b2b1(0x85f)],Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x85f)]=function(){const _0x1c92a9=_0x16b2b1;VisuMZ[_0x1c92a9(0x4da)]['Scene_Battle_startActorCommandSelection']['call'](this),BattleManager[_0x1c92a9(0x1fc)]()&&BattleManager[_0x1c92a9(0x404)]&&(BattleManager[_0x1c92a9(0x404)]=![],this[_0x1c92a9(0x820)]());},BattleManager[_0x16b2b1(0x53e)]=function(_0x37b376,_0x512b3b){const _0x2da914=_0x16b2b1;this[_0x2da914(0x5e0)]['_reflectionTarget']=_0x512b3b,this[_0x2da914(0x629)][_0x2da914(0x90d)](_0x512b3b),this[_0x2da914(0x629)]['displayReflectionPlayBack'](_0x37b376,this[_0x2da914(0x5e0)]),this[_0x2da914(0x5e0)][_0x2da914(0x909)](_0x37b376),this['_logWindow'][_0x2da914(0x587)](_0x37b376,_0x37b376);},VisuMZ['BattleCore'][_0x16b2b1(0x760)]=BattleManager[_0x16b2b1(0x884)],BattleManager['makeActionOrders']=function(){const _0x4124aa=_0x16b2b1;VisuMZ[_0x4124aa(0x4da)]['BattleManager_makeActionOrders'][_0x4124aa(0x357)](this),this['_actionBattlers']=this[_0x4124aa(0x710)][_0x4124aa(0x1a0)](_0x184427=>_0x184427&&_0x184427[_0x4124aa(0x7b6)]());},VisuMZ['BattleCore'][_0x16b2b1(0x4a5)]=BattleManager[_0x16b2b1(0x8b5)],BattleManager[_0x16b2b1(0x8b5)]=function(_0x6f8f33){const _0x397ec1=_0x16b2b1;if(this[_0x397ec1(0x2b3)]===_0x397ec1(0x933))this['updateCustomActionSequence']();else this[_0x397ec1(0x2b3)]===_0x397ec1(0x748)?this[_0x397ec1(0x8c2)]():VisuMZ[_0x397ec1(0x4da)][_0x397ec1(0x4a5)][_0x397ec1(0x357)](this,_0x6f8f33);},BattleManager['prepareCustomActionSequence']=function(){const _0x335d22=_0x16b2b1;this[_0x335d22(0x2cb)]=this[_0x335d22(0x8f3)]['slice'](0x0),this[_0x335d22(0x30a)]=0x0,this[_0x335d22(0x407)]=this[_0x335d22(0x2cb)][0x0]||null,this[_0x335d22(0x2b3)]='custom';},BattleManager['updateCustomActionSequence']=function(){const _0x5bdf42=_0x16b2b1;!this[_0x5bdf42(0x320)]()&&!this[_0x5bdf42(0x629)][_0x5bdf42(0x339)]()&&(this[_0x5bdf42(0x2b3)]=_0x5bdf42(0x80b));},BattleManager[_0x16b2b1(0x748)]=function(_0x16e1de){const _0x4fbc26=_0x16b2b1;this[_0x4fbc26(0x710)][_0x4fbc26(0x94d)](_0x16e1de);if(_0x16e1de===this['_subject'])return;const _0x135bc4=JsonEx['makeDeepCopy'](_0x16e1de['currentAction']());this[_0x4fbc26(0x601)][_0x4fbc26(0x305)]([_0x16e1de,_0x135bc4]);},BattleManager[_0x16b2b1(0x1ec)]=function(){},BattleManager[_0x16b2b1(0x72f)]=function(){const _0x2ba271=_0x16b2b1;if(this[_0x2ba271(0x1fc)]())this[_0x2ba271(0x2b3)]=_0x2ba271(0x413);else this[_0x2ba271(0x601)][_0x2ba271(0x7d1)]>0x0?this[_0x2ba271(0x2b3)]='turn':this[_0x2ba271(0x69e)]();},BattleManager['getNextSubject']=function(){const _0x5cc37e=_0x16b2b1,_0x3f98d9=this[_0x5cc37e(0x8ff)];_0x3f98d9&&this['isTpb']()&&_0x3f98d9[_0x5cc37e(0x89c)](_0x5cc37e(0x757));for(;;){const _0xb29758=this[_0x5cc37e(0x373)]();if(!_0xb29758)return null;if(_0xb29758[_0x5cc37e(0x4ab)]()&&_0xb29758[_0x5cc37e(0x526)]())return _0xb29758;}},BattleManager[_0x16b2b1(0x373)]=function(){const _0x27b975=_0x16b2b1;if(this[_0x27b975(0x601)][_0x27b975(0x7d1)]>0x0){const _0x36f087=this[_0x27b975(0x601)][_0x27b975(0x41f)](),_0x402e34=_0x36f087[0x0];return _0x402e34['_actions']=_0x402e34[_0x27b975(0x8fa)]||[],_0x402e34[_0x27b975(0x8fa)][0x0]=_0x36f087[0x1],_0x402e34;}else return this['_actionBattlers'][_0x27b975(0x41f)]();},VisuMZ[_0x16b2b1(0x4da)]['Game_Battler_forceAction']=Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x748)],Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x748)]=function(_0x3c2459,_0x415aec){const _0x320df1=_0x16b2b1;VisuMZ[_0x320df1(0x4da)]['Game_Battler_forceAction'][_0x320df1(0x357)](this,_0x3c2459,_0x415aec),this[_0x320df1(0x8fa)][this[_0x320df1(0x8fa)][_0x320df1(0x7d1)]-0x1]['_forceAction']=!![];},Game_Interpreter[_0x16b2b1(0x1ca)]['command339']=function(_0x54df04){const _0x3708a7=_0x16b2b1;return this[_0x3708a7(0x5d6)](_0x54df04[0x0],_0x54df04[0x1],_0x4bb7b7=>{const _0x4852fd=_0x3708a7;!_0x4bb7b7[_0x4852fd(0x94b)]()&&(_0x4bb7b7[_0x4852fd(0x748)](_0x54df04[0x2],_0x54df04[0x3]),BattleManager['forceAction'](_0x4bb7b7));}),!![];},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x3bd)]=Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x71d)],Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x71d)]=function(){const _0x1f63af=_0x16b2b1;VisuMZ['BattleCore'][_0x1f63af(0x3bd)]['call'](this),this[_0x1f63af(0x8fa)]['length']<=0x0&&(this[_0x1f63af(0x814)]=Number[_0x1f63af(0x5cb)]);},VisuMZ[_0x16b2b1(0x4da)]['BattleManager_selectNextCommand']=BattleManager['selectNextCommand'],BattleManager[_0x16b2b1(0x3ba)]=function(){const _0x1ef8d7=_0x16b2b1;this['isTpb']()?this['selectNextCommandTpb']():VisuMZ['BattleCore'][_0x1ef8d7(0x890)][_0x1ef8d7(0x357)](this);},BattleManager['selectNextCommandTpb']=function(){const _0x168454=_0x16b2b1;if(this[_0x168454(0x523)]){if(this[_0x168454(0x523)][_0x168454(0x3ba)]())return;this[_0x168454(0x286)](),this[_0x168454(0x6e7)](),!this[_0x168454(0x8ff)]&&!this[_0x168454(0x523)]&&SceneManager[_0x168454(0x6b0)][_0x168454(0x33c)]();}else!this[_0x168454(0x8ff)]&&this['selectNextActor']();},BattleManager['checkTpbInputClose']=function(){const _0x55b8e4=_0x16b2b1;(!this[_0x55b8e4(0x494)]()||this[_0x55b8e4(0x781)]())&&(this[_0x55b8e4(0x812)]&&(!$gameParty[_0x55b8e4(0x367)]()['includes'](this[_0x55b8e4(0x812)])&&(this[_0x55b8e4(0x812)]=null)),!this[_0x55b8e4(0x812)]?(this[_0x55b8e4(0x898)](),this['_currentActor']=null,this[_0x55b8e4(0x223)]=![]):this['revertTpbCachedActor']());},BattleManager[_0x16b2b1(0x81d)]=function(){const _0x18125a=_0x16b2b1;!$gameParty[_0x18125a(0x367)]()[_0x18125a(0x3e4)](this[_0x18125a(0x812)])&&(this['_tpbSceneChangeCacheActor']=null),this['_tpbSceneChangeCacheActor']?(this[_0x18125a(0x523)]=this[_0x18125a(0x812)],this['_currentActor'][_0x18125a(0x51c)]=_0x18125a(0x198),this[_0x18125a(0x223)]=!![],this[_0x18125a(0x812)]=null):(this[_0x18125a(0x898)](),this['_currentActor']=null,this[_0x18125a(0x223)]=![]);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x866)]=BattleManager['isTpbMainPhase'],BattleManager[_0x16b2b1(0x607)]=function(){const _0x3ab1c4=_0x16b2b1;return this[_0x3ab1c4(0x2b3)]===_0x3ab1c4(0x933)?this[_0x3ab1c4(0x1bd)]():VisuMZ[_0x3ab1c4(0x4da)][_0x3ab1c4(0x866)][_0x3ab1c4(0x357)](this);},BattleManager[_0x16b2b1(0x1bd)]=function(){const _0x596706=_0x16b2b1;return this[_0x596706(0x447)]();},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x35f)]=BattleManager[_0x16b2b1(0x898)],BattleManager[_0x16b2b1(0x898)]=function(){const _0x3e3128=_0x16b2b1;this[_0x3e3128(0x1fc)]()&&this[_0x3e3128(0x2b3)]==='battleEnd'&&(this[_0x3e3128(0x523)]=null),VisuMZ['BattleCore']['BattleManager_cancelActorInput'][_0x3e3128(0x357)](this);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x482)]=BattleManager[_0x16b2b1(0x891)],BattleManager[_0x16b2b1(0x891)]=function(){const _0x102a53=_0x16b2b1,_0x46f6e8=this['_currentActor'];if(_0x46f6e8&&!_0x46f6e8[_0x102a53(0x891)]()){const _0x9a84b3=_0x46f6e8[_0x102a53(0x5e7)];_0x46f6e8['_actions'][_0x9a84b3]=new Game_Action(_0x46f6e8);}return VisuMZ[_0x102a53(0x4da)][_0x102a53(0x482)][_0x102a53(0x357)](this);},SceneManager['isSceneBattle']=function(){const _0x314ce5=_0x16b2b1;return this['_scene']&&this[_0x314ce5(0x6b0)][_0x314ce5(0x651)]===Scene_Battle;},SceneManager[_0x16b2b1(0x6fb)]=function(){const _0x1305e9=_0x16b2b1;return Spriteset_Battle[_0x1305e9(0x1ca)][_0x1305e9(0x2dd)]();},SceneManager[_0x16b2b1(0x3f9)]=function(){const _0x34dbfc=_0x16b2b1;if(SceneManager[_0x34dbfc(0x50f)](Scene_Options))return!![];return![];},SceneManager[_0x16b2b1(0x56b)]=function(){const _0x31ec0a=_0x16b2b1;if(SceneManager[_0x31ec0a(0x546)](Scene_Options))return!![];return![];},VisuMZ['BattleCore']['Game_Temp_requestAnimation']=Game_Temp[_0x16b2b1(0x1ca)][_0x16b2b1(0x26f)],Game_Temp[_0x16b2b1(0x1ca)][_0x16b2b1(0x26f)]=function(_0x5b1f6a,_0x3e5ccd,_0x40c3a0){const _0x1178c7=_0x16b2b1;_0x5b1f6a=_0x5b1f6a[_0x1178c7(0x1a0)]((_0x1c3576,_0x37f301,_0x528bb7)=>_0x528bb7['indexOf'](_0x1c3576)===_0x37f301),SceneManager[_0x1178c7(0x7ed)]()&&SceneManager['isBattleFlipped']()&&(_0x40c3a0=!_0x40c3a0),VisuMZ[_0x1178c7(0x4da)][_0x1178c7(0x58b)][_0x1178c7(0x357)](this,_0x5b1f6a,_0x3e5ccd,_0x40c3a0),SceneManager['isSceneBattle']()&&BattleManager[_0x1178c7(0x7d7)][_0x1178c7(0x81f)]();},Game_Temp[_0x16b2b1(0x1ca)]['setLastPluginCommandInterpreter']=function(_0x2aee99){const _0xa2ada6=_0x16b2b1;this[_0xa2ada6(0x799)]=_0x2aee99;},Game_Temp[_0x16b2b1(0x1ca)][_0x16b2b1(0x40b)]=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp[_0x16b2b1(0x1ca)][_0x16b2b1(0x5a7)]=function(){this['_forcedBattleLayout']=undefined;},Game_Temp[_0x16b2b1(0x1ca)][_0x16b2b1(0x81a)]=function(_0x5a3bb3){const _0x2dae4c=_0x16b2b1;$gameMap&&$dataMap&&$dataMap[_0x2dae4c(0x50c)]&&this[_0x2dae4c(0x77a)]($dataMap[_0x2dae4c(0x50c)]);const _0x498527=$dataTroops[_0x5a3bb3];_0x498527&&this['parseForcedGameTroopSettingsBattleCore'](_0x498527[_0x2dae4c(0x802)]);},Game_Temp[_0x16b2b1(0x1ca)]['parseForcedGameTroopSettingsBattleCore']=function(_0x43525f){const _0x1cbdb6=_0x16b2b1;if(!_0x43525f)return;if(_0x43525f['match'](/<(?:BATTLELAYOUT|BATTLE LAYOUT|LAYOUT):[ ](.*)>/i)){const _0x1f8415=String(RegExp['$1']);if(_0x1f8415[_0x1cbdb6(0x6ef)](/DEFAULT/i))this[_0x1cbdb6(0x75b)]=_0x1cbdb6(0x1f9);else{if(_0x1f8415[_0x1cbdb6(0x6ef)](/LIST/i))this['_forcedBattleLayout']=_0x1cbdb6(0x3c5);else{if(_0x1f8415[_0x1cbdb6(0x6ef)](/XP/i))this[_0x1cbdb6(0x75b)]='xp';else{if(_0x1f8415['match'](/PORTRAIT/i))this[_0x1cbdb6(0x75b)]=_0x1cbdb6(0x89b);else{if(_0x1f8415[_0x1cbdb6(0x6ef)](/BORDER/i))this[_0x1cbdb6(0x75b)]=_0x1cbdb6(0x369);else _0x1f8415[_0x1cbdb6(0x6ef)](/(?:SIDEVIEW UI|SIDEVIEW)/i)&&(Imported[_0x1cbdb6(0x26d)]?this[_0x1cbdb6(0x75b)]=_0x1cbdb6(0x467):this['_forcedBattleLayout']=_0x1cbdb6(0x1f9));}}}}}},VisuMZ[_0x16b2b1(0x4da)]['Game_System_initialize']=Game_System[_0x16b2b1(0x1ca)][_0x16b2b1(0x77d)],Game_System[_0x16b2b1(0x1ca)][_0x16b2b1(0x77d)]=function(){const _0x56f2a6=_0x16b2b1;VisuMZ[_0x56f2a6(0x4da)][_0x56f2a6(0x6da)][_0x56f2a6(0x357)](this),this[_0x56f2a6(0x6e9)]();},Game_System[_0x16b2b1(0x1ca)][_0x16b2b1(0x6e9)]=function(){const _0x45adef=_0x16b2b1;this[_0x45adef(0x292)]=this[_0x45adef(0x292)]||[];},Game_System[_0x16b2b1(0x1ca)]['getDefeatedEnemies']=function(){const _0x3d658b=_0x16b2b1;if(this[_0x3d658b(0x292)]===undefined)this['initBattleCore']();return this[_0x3d658b(0x292)];},Game_System[_0x16b2b1(0x1ca)][_0x16b2b1(0x7f1)]=function(_0x24ed92){const _0x39f45b=_0x16b2b1;if(this['_defeatedEnemies']===undefined)this[_0x39f45b(0x6e9)]();if(!_0x24ed92)return;if(this['_defeatedEnemies'][_0x39f45b(0x3e4)](_0x24ed92))return;this[_0x39f45b(0x292)]['push'](_0x24ed92),this[_0x39f45b(0x292)][_0x39f45b(0x495)]((_0x4006f2,_0x552519)=>_0x4006f2-_0x552519);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x2ce)]=Game_BattlerBase[_0x16b2b1(0x1ca)]['addNewState'],Game_BattlerBase[_0x16b2b1(0x1ca)][_0x16b2b1(0x207)]=function(_0x364d06){const _0x33deb6=_0x16b2b1,_0x2f3bfe=this[_0x33deb6(0x526)](),_0x11c76b=this[_0x33deb6(0x285)]();VisuMZ[_0x33deb6(0x4da)][_0x33deb6(0x2ce)][_0x33deb6(0x357)](this,_0x364d06),this[_0x33deb6(0x73f)]()&&_0x2f3bfe&&this[_0x33deb6(0x8dc)]()&&(this[_0x33deb6(0x599)]=!this[_0x33deb6(0x6e8)](),$gameSystem[_0x33deb6(0x7f1)](this[_0x33deb6(0x5dc)]())),SceneManager['isSceneBattle']()&&_0x11c76b!==this[_0x33deb6(0x285)]()&&(this[_0x33deb6(0x4e0)]()&&this['battler']()[_0x33deb6(0x827)]());},Game_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x6e8)]=function(){const _0x47a35c=_0x16b2b1;return $gameSystem[_0x47a35c(0x25a)]()[_0x47a35c(0x3e4)](this[_0x47a35c(0x665)]);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x231)]=Game_BattlerBase[_0x16b2b1(0x1ca)][_0x16b2b1(0x568)],Game_BattlerBase['prototype'][_0x16b2b1(0x568)]=function(_0x443e03){const _0x47f5e6=_0x16b2b1;VisuMZ[_0x47f5e6(0x4da)][_0x47f5e6(0x231)][_0x47f5e6(0x357)](this,_0x443e03),this[_0x47f5e6(0x73f)]()&&_0x443e03===this[_0x47f5e6(0x8ed)]()&&this['isAlive']()&&(this[_0x47f5e6(0x599)]=![]),!this[_0x47f5e6(0x7ee)]&&!this[_0x47f5e6(0x2df)]&&SceneManager['isSceneBattle']()&&this[_0x47f5e6(0x868)]();},VisuMZ['BattleCore'][_0x16b2b1(0x192)]=Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x7e7)],Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x7e7)]=function(){const _0x287e1f=_0x16b2b1;VisuMZ[_0x287e1f(0x4da)]['Game_Action_clear']['call'](this),this[_0x287e1f(0x834)]={'arPenRate':0x0,'arPenFlat':0x0,'arRedRate':0x0,'arRedFlat':0x0},this[_0x287e1f(0x7a3)]={'criticalHitRate':0x1,'criticalHitFlat':0x0,'criticalDmgRate':0x1,'criticalDmgFlat':0x0,'damageRate':0x1,'damageFlat':0x0,'hitRate':0x1,'hitFlat':0x0},this['_customDamageFormula']='default';},Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x44e)]=function(_0x3822e5,_0x5e5c3d){const _0x595068=_0x16b2b1;return VisuMZ[_0x595068(0x4da)][_0x595068(0x6ac)][_0x595068(0x5a4)][_0x595068(0x561)][_0x595068(0x357)](this,_0x3822e5,_0x5e5c3d);},Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x695)]=function(_0x5796f0,_0x522b47){const _0x5a3286=_0x16b2b1;return VisuMZ['BattleCore'][_0x5a3286(0x6ac)][_0x5a3286(0x5a4)][_0x5a3286(0x31f)][_0x5a3286(0x357)](this,_0x5796f0,_0x522b47);},Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x1b8)]=function(_0x12ff62,_0x545105){const _0x156aad=_0x16b2b1;return VisuMZ[_0x156aad(0x4da)][_0x156aad(0x6ac)][_0x156aad(0x5a4)][_0x156aad(0x8fb)]['call'](this,_0x12ff62,_0x545105);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x638)]=Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x5db)],Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x5db)]=function(_0x31b320){const _0x330d5e=_0x16b2b1,_0x56da52=this['item']()[_0x330d5e(0x50c)];if(_0x56da52[_0x330d5e(0x6ef)](/<ALWAYS HIT>/i))return 0x1;else{if(_0x56da52[_0x330d5e(0x6ef)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return Number(RegExp['$1'])/0x64;else{let _0x49a541=VisuMZ[_0x330d5e(0x4da)][_0x330d5e(0x638)][_0x330d5e(0x357)](this,_0x31b320);return _0x49a541=this[_0x330d5e(0x7a3)][_0x330d5e(0x442)]*_0x49a541+this[_0x330d5e(0x7a3)]['hitFlat'],_0x49a541;}}},Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x3bc)]=function(_0x2c97af){const _0x12a1b0=_0x16b2b1;if(!this[_0x12a1b0(0x3e3)]()['damage'][_0x12a1b0(0x784)])return 0x0;let _0x4eb2c1=VisuMZ[_0x12a1b0(0x4da)][_0x12a1b0(0x6ac)]['Damage'][_0x12a1b0(0x6fc)][_0x12a1b0(0x357)](this,_0x2c97af);return _0x4eb2c1=this[_0x12a1b0(0x7a3)][_0x12a1b0(0x7ac)]*_0x4eb2c1+this['_multipliers'][_0x12a1b0(0x935)],_0x4eb2c1;},Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x456)]=function(_0x20c8f8){const _0x4f6011=_0x16b2b1;return _0x20c8f8=VisuMZ['BattleCore']['Settings'][_0x4f6011(0x5a4)][_0x4f6011(0x353)][_0x4f6011(0x357)](this,_0x20c8f8),_0x20c8f8=this[_0x4f6011(0x7a3)][_0x4f6011(0x30e)]*_0x20c8f8+this[_0x4f6011(0x7a3)][_0x4f6011(0x23c)],_0x20c8f8;},VisuMZ['BattleCore']['Game_Action_evalDamageFormula']=Game_Action[_0x16b2b1(0x1ca)]['evalDamageFormula'],Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x505)]=function(_0x40ff){const _0x439236=_0x16b2b1;if(this[_0x439236(0x4e5)]!==_0x439236(0x1f9))return this['customDamageFormula'](_0x40ff);else return DataManager[_0x439236(0x942)](this[_0x439236(0x3e3)]())==='MANUAL'?VisuMZ['BattleCore']['Game_Action_evalDamageFormula'][_0x439236(0x357)](this,_0x40ff):this[_0x439236(0x52a)](_0x40ff);},Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x843)]=function(_0x546472){this['_customDamageFormula']=_0x546472;},Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x7e2)]=function(_0x141406){const _0x3d24bb=_0x16b2b1,_0x1371e4=this['item'](),_0x42a221=_0x1371e4[_0x3d24bb(0x271)]['formula'];_0x1371e4['damage'][_0x3d24bb(0x8af)]=this[_0x3d24bb(0x4e5)];let _0x415712=VisuMZ['BattleCore'][_0x3d24bb(0x53b)][_0x3d24bb(0x357)](this,_0x141406);return _0x1371e4[_0x3d24bb(0x271)]['formula']=_0x42a221,_0x415712;},Game_Action[_0x16b2b1(0x1ca)]['damageStyle']=function(){const _0x47d66d=_0x16b2b1;if(this['item']()[_0x47d66d(0x50c)][_0x47d66d(0x6ef)](/<DAMAGE STYLE:[ ](.*)>/i)){const _0x4fd266=String(RegExp['$1'])['toUpperCase']()[_0x47d66d(0x7bc)]();return _0x4fd266;}return'MANUAL';},Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x52a)]=function(_0x1d8d0e){const _0x370bba=_0x16b2b1,_0x3b3c5f=DataManager[_0x370bba(0x942)](this[_0x370bba(0x3e3)]()),_0x429bbc=VisuMZ['DamageStyles'][_0x3b3c5f];try{return _0x429bbc[_0x370bba(0x87a)]['call'](this,_0x1d8d0e);}catch(_0x24fa00){if($gameTemp[_0x370bba(0x500)]())console[_0x370bba(0x32a)](_0x24fa00);return VisuMZ['BattleCore'][_0x370bba(0x53b)][_0x370bba(0x357)](this);}},Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x916)]=function(_0x25e914,_0x2a115a){const _0x104b31=_0x16b2b1;if(this[_0x104b31(0x8a5)]())return _0x2a115a;const _0x3e63c6=this[_0x104b31(0x8fc)](),_0x42066d=_0x25e914;let _0x18cbfa=[],_0x366f8a=[];_0x18cbfa[_0x104b31(0x305)](this[_0x104b31(0x834)][_0x104b31(0x8de)],this[_0x104b31(0x834)][_0x104b31(0x2a4)]),_0x366f8a[_0x104b31(0x305)](this[_0x104b31(0x834)][_0x104b31(0x522)],this[_0x104b31(0x834)][_0x104b31(0x335)]);const _0x4fd990=this[_0x104b31(0x1ce)]()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)>/i,_0x483192=this['isPhysical']()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)([%％])>/i,_0x2fce82=this[_0x104b31(0x1ce)]()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)>/i,_0x30295b=this[_0x104b31(0x1ce)]()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)([%％])>/i;return _0x18cbfa=_0x18cbfa[_0x104b31(0x6ba)](_0x42066d['traitObjects']()[_0x104b31(0x5b1)](_0x5a227a=>_0x5a227a&&_0x5a227a[_0x104b31(0x50c)]['match'](_0x4fd990)?Number(RegExp['$1']):0x0)),_0x366f8a=_0x366f8a[_0x104b31(0x6ba)](_0x42066d[_0x104b31(0x233)]()['map'](_0xc75302=>_0xc75302&&_0xc75302[_0x104b31(0x50c)]['match'](_0x483192)?Number(RegExp['$1'])/0x64:0x0)),_0x18cbfa=_0x18cbfa[_0x104b31(0x6ba)](_0x3e63c6[_0x104b31(0x233)]()[_0x104b31(0x5b1)](_0x3d26f9=>_0x3d26f9&&_0x3d26f9[_0x104b31(0x50c)][_0x104b31(0x6ef)](_0x2fce82)?Number(RegExp['$1']):0x0)),_0x366f8a=_0x366f8a['concat'](_0x3e63c6[_0x104b31(0x233)]()[_0x104b31(0x5b1)](_0x165ae5=>_0x165ae5&&_0x165ae5['note'][_0x104b31(0x6ef)](_0x30295b)?Number(RegExp['$1'])/0x64:0x0)),this['item']()[_0x104b31(0x50c)][_0x104b31(0x6ef)](_0x2fce82)&&_0x18cbfa[_0x104b31(0x305)](Number(RegExp['$1'])),this[_0x104b31(0x3e3)]()[_0x104b31(0x50c)][_0x104b31(0x6ef)](_0x30295b)&&_0x366f8a[_0x104b31(0x305)](Number(RegExp['$1'])),_0x2a115a=_0x18cbfa[_0x104b31(0x454)]((_0x8324db,_0x269149)=>_0x8324db-_0x269149,_0x2a115a),_0x2a115a>0x0&&(_0x2a115a=_0x366f8a[_0x104b31(0x454)]((_0x1de7df,_0x3fdc51)=>_0x1de7df*(0x1-_0x3fdc51),_0x2a115a)),_0x2a115a;},VisuMZ['BattleCore'][_0x16b2b1(0x667)]=Game_Action['prototype'][_0x16b2b1(0x32f)],Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x32f)]=function(_0x2da6b2,_0x3b9a2c){const _0xa04a2e=_0x16b2b1;_0x3b9a2c=_0x3b9a2c*this['_multipliers'][_0xa04a2e(0x3d7)],_0x3b9a2c+=this[_0xa04a2e(0x7a3)][_0xa04a2e(0x497)]*(_0x3b9a2c>=0x0?0x1:-0x1),_0x3b9a2c=this[_0xa04a2e(0x77c)](_0xa04a2e(0x764),_0x2da6b2,_0x3b9a2c,![]),_0x3b9a2c=this[_0xa04a2e(0x63f)](_0x3b9a2c),_0x3b9a2c=Math[_0xa04a2e(0x855)](_0x3b9a2c),this[_0xa04a2e(0x4dc)]=_0x3b9a2c,this[_0xa04a2e(0x2e1)]=this[_0xa04a2e(0x2e1)]||0x0,this[_0xa04a2e(0x2e1)]+=_0x3b9a2c,VisuMZ['BattleCore'][_0xa04a2e(0x667)]['call'](this,_0x2da6b2,_0x3b9a2c),this[_0xa04a2e(0x77c)]('PostDamage%1JS',_0x2da6b2,_0x3b9a2c,!![]);},Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x63f)]=function(_0x519e39){const _0xb1a4bb=_0x16b2b1;if(this[_0xb1a4bb(0x4c1)]())return _0x519e39;return _0x519e39=this[_0xb1a4bb(0x678)](_0x519e39),_0x519e39=this[_0xb1a4bb(0x912)](_0x519e39),_0x519e39;},Game_Action['prototype'][_0x16b2b1(0x4c1)]=function(){const _0x273ce2=_0x16b2b1,_0x17a14a=/<BYPASS DAMAGE CAP>/i;if(this[_0x273ce2(0x3e3)]()[_0x273ce2(0x50c)][_0x273ce2(0x6ef)](_0x17a14a))return!![];if(this[_0x273ce2(0x8fc)]()[_0x273ce2(0x233)]()[_0x273ce2(0x324)](_0x184ecd=>_0x184ecd&&_0x184ecd[_0x273ce2(0x50c)]['match'](_0x17a14a)))return!![];return!VisuMZ[_0x273ce2(0x4da)][_0x273ce2(0x6ac)][_0x273ce2(0x5a4)][_0x273ce2(0x3a3)];},Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x678)]=function(_0x5cdc68){const _0x3fce68=_0x16b2b1;if(!VisuMZ['BattleCore'][_0x3fce68(0x6ac)]['Damage'][_0x3fce68(0x8be)])return _0x5cdc68;const _0x23c4a0=/<BYPASS SOFT DAMAGE CAP>/i;if(this[_0x3fce68(0x3e3)]()['note']['match'](_0x23c4a0))return!![];if(this[_0x3fce68(0x8fc)]()['traitObjects']()[_0x3fce68(0x324)](_0x4eafdf=>_0x4eafdf&&_0x4eafdf[_0x3fce68(0x50c)][_0x3fce68(0x6ef)](_0x23c4a0)))return!![];const _0x425c11=_0x5cdc68<0x0?-0x1:0x1;_0x5cdc68=Math[_0x3fce68(0x43d)](_0x5cdc68);let _0x53ce66=this[_0x3fce68(0x8fc)]()[_0x3fce68(0x42d)]();this[_0x3fce68(0x3e3)]()[_0x3fce68(0x50c)][_0x3fce68(0x6ef)](/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i)&&(_0x53ce66+=Number(RegExp['$1'])/0x64);_0x53ce66=_0x53ce66['clamp'](0.01,0x1);const _0x33dc1c=this[_0x3fce68(0x1bb)](),_0x2a9880=_0x53ce66*_0x33dc1c;if(_0x5cdc68>_0x2a9880&&_0x33dc1c>_0x2a9880){_0x5cdc68-=_0x2a9880;const _0x30d5b1=VisuMZ[_0x3fce68(0x4da)][_0x3fce68(0x6ac)][_0x3fce68(0x5a4)][_0x3fce68(0x25f)],_0x6871ee=Math[_0x3fce68(0x6fa)](0x1-_0x5cdc68/((_0x33dc1c-_0x2a9880)*_0x30d5b1+_0x5cdc68),0.01);_0x5cdc68*=_0x6871ee,_0x5cdc68+=_0x2a9880;}return _0x5cdc68*_0x425c11;},Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x1bb)]=function(){const _0x4398e8=_0x16b2b1;return this[_0x4398e8(0x3e3)]()['note'][_0x4398e8(0x6ef)](/<DAMAGE CAP:[ ](\d+)>/i)?Number(RegExp['$1']):this[_0x4398e8(0x8fc)]()[_0x4398e8(0x43e)]();},Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x912)]=function(_0x1b50d7){const _0x11460a=_0x16b2b1;let _0x46b03d=this[_0x11460a(0x1bb)]();return _0x1b50d7[_0x11460a(0x235)](-_0x46b03d,_0x46b03d);},VisuMZ[_0x16b2b1(0x4da)]['Game_Action_apply']=Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x909)],Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x909)]=function(_0x2ae6dd){const _0x54c4e6=_0x16b2b1;this['applyBattleCoreJS'](_0x54c4e6(0x1f0),_0x2ae6dd,0x0,!![]),VisuMZ['BattleCore']['Game_Action_apply'][_0x54c4e6(0x357)](this,_0x2ae6dd),this[_0x54c4e6(0x77c)](_0x54c4e6(0x7ea),_0x2ae6dd,this['_executedValue']||0x0,!![]),this['applyResultSwitches'](_0x2ae6dd);},Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x77c)]=function(_0x5d0a33,_0x741bee,_0x113a1a,_0x3179f4){const _0x675840=_0x16b2b1;if(this[_0x675840(0x2df)]||this[_0x675840(0x7ee)])return;_0x113a1a=_0x113a1a||0x0;const _0x57324d=_0x113a1a,_0x197b6b=VisuMZ['BattleCore']['Settings'][_0x675840(0x37d)],_0x405cd9=_0x5d0a33[_0x675840(0x742)]('');if(_0x197b6b[_0x405cd9]){_0x113a1a=_0x197b6b[_0x405cd9][_0x675840(0x357)](this,_0x113a1a,_0x741bee);if(_0x3179f4)_0x113a1a=_0x57324d;}let _0x57c9ec=VisuMZ[_0x675840(0x4da)][_0x675840(0x525)](this[_0x675840(0x3e3)](),_0x5d0a33[_0x675840(0x742)](''));if(VisuMZ[_0x675840(0x4da)]['JS'][_0x57c9ec]){_0x113a1a=VisuMZ[_0x675840(0x4da)]['JS'][_0x57c9ec]['call'](this,this[_0x675840(0x8fc)](),_0x741bee,this[_0x675840(0x3e3)](),_0x113a1a);if(_0x3179f4)_0x113a1a=_0x57324d;}for(const _0x3cd7a5 of this[_0x675840(0x8fc)]()[_0x675840(0x233)]()){if(!_0x3cd7a5)continue;_0x57c9ec=VisuMZ['BattleCore'][_0x675840(0x525)](_0x3cd7a5,_0x5d0a33[_0x675840(0x742)]('AsUser'));if(VisuMZ[_0x675840(0x4da)]['JS'][_0x57c9ec]){_0x113a1a=VisuMZ[_0x675840(0x4da)]['JS'][_0x57c9ec][_0x675840(0x357)](this,this[_0x675840(0x8fc)](),_0x741bee,_0x3cd7a5,_0x113a1a);if(_0x3179f4)_0x113a1a=_0x57324d;}}for(const _0x343d9e of _0x741bee[_0x675840(0x233)]()){if(!_0x343d9e)continue;_0x57c9ec=VisuMZ[_0x675840(0x4da)]['createKeyJS'](_0x343d9e,_0x5d0a33[_0x675840(0x742)](_0x675840(0x44d)));if(VisuMZ[_0x675840(0x4da)]['JS'][_0x57c9ec]){_0x113a1a=VisuMZ[_0x675840(0x4da)]['JS'][_0x57c9ec][_0x675840(0x357)](this,this['subject'](),_0x741bee,_0x343d9e,_0x113a1a);if(_0x3179f4)_0x113a1a=_0x57324d;}}return _0x113a1a;},Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x900)]=function(_0x258561){const _0x2d93e8=_0x16b2b1,_0x533f2b=this['_totalValue']||0x0,_0x36284f=VisuMZ[_0x2d93e8(0x4da)][_0x2d93e8(0x6ac)][_0x2d93e8(0x37d)],_0xe894d6=_0x258561[_0x2d93e8(0x742)]('');_0x36284f[_0xe894d6]&&_0x36284f[_0xe894d6][_0x2d93e8(0x357)](this,_0x533f2b);let _0x32aca2=VisuMZ[_0x2d93e8(0x4da)][_0x2d93e8(0x525)](this[_0x2d93e8(0x3e3)](),_0x258561);VisuMZ[_0x2d93e8(0x4da)]['JS'][_0x32aca2]&&VisuMZ[_0x2d93e8(0x4da)]['JS'][_0x32aca2]['call'](this,this['subject'](),this[_0x2d93e8(0x8fc)](),this[_0x2d93e8(0x3e3)](),_0x533f2b);for(const _0x558a65 of this[_0x2d93e8(0x8fc)]()[_0x2d93e8(0x233)]()){if(!_0x558a65)continue;_0x32aca2=VisuMZ[_0x2d93e8(0x4da)]['createKeyJS'](_0x558a65,_0x258561),VisuMZ[_0x2d93e8(0x4da)]['JS'][_0x32aca2]&&VisuMZ['BattleCore']['JS'][_0x32aca2]['call'](this,this[_0x2d93e8(0x8fc)](),this['subject'](),_0x558a65,_0x533f2b);}},Game_Action[_0x16b2b1(0x1ca)]['speed']=function(){const _0x5ec349=_0x16b2b1;return VisuMZ[_0x5ec349(0x4da)][_0x5ec349(0x6ac)]['Mechanics'][_0x5ec349(0x8e1)]['call'](this);},Game_Action['prototype'][_0x16b2b1(0x5cd)]=function(){const _0x6a704f=_0x16b2b1;return VisuMZ[_0x6a704f(0x4da)]['Settings']['Mechanics'][_0x6a704f(0x653)];},Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x6cc)]=function(){const _0x5bdfee=_0x16b2b1;return this['item']()[_0x5bdfee(0x50c)]['match'](/<JS TARGETS>/i);},Game_Action[_0x16b2b1(0x1ca)]['isBattleCoreTargetScope']=function(){const _0x2f7eac=_0x16b2b1;if(!this[_0x2f7eac(0x1be)]&&this['subject']()[_0x2f7eac(0x402)]())return![];if(this[_0x2f7eac(0x6cc)]())return!![];return typeof this[_0x2f7eac(0x3e3)]()[_0x2f7eac(0x89e)]==='string';},VisuMZ[_0x16b2b1(0x4da)]['Game_Action_isForOpponent']=Game_Action['prototype'][_0x16b2b1(0x6b1)],Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x6b1)]=function(){const _0x470479=_0x16b2b1;return this[_0x470479(0x927)]()&&!this['isCustomBattleScope']()?this[_0x470479(0x5ad)]():VisuMZ['BattleCore'][_0x470479(0x680)]['call'](this);},Game_Action['prototype'][_0x16b2b1(0x5ad)]=function(){const _0x20e233=_0x16b2b1,_0x3745e4=this[_0x20e233(0x3e3)]()[_0x20e233(0x89e)];return _0x3745e4[_0x20e233(0x6ef)](/(?:ENEMY|ENEMIES|FOE|FOES)/i);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x45f)]=Game_Action[_0x16b2b1(0x1ca)]['isForFriend'],Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x46e)]=function(){const _0x5910be=_0x16b2b1;return this['isBattleCoreTargetScope']()&&!this[_0x5910be(0x6cc)]()?this['isForFriendBattleCore']():VisuMZ[_0x5910be(0x4da)][_0x5910be(0x45f)][_0x5910be(0x357)](this);},Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x2de)]=function(){const _0x17084c=_0x16b2b1,_0x25e2b1=this[_0x17084c(0x3e3)]()[_0x17084c(0x89e)];return _0x25e2b1[_0x17084c(0x6ef)](/(?:ALLY|ALLIES|FRIEND|FRIENDS)/i);},VisuMZ[_0x16b2b1(0x4da)]['Game_Action_isForRandom']=Game_Action['prototype']['isForRandom'],Game_Action['prototype'][_0x16b2b1(0x709)]=function(){const _0x11ca1b=_0x16b2b1;return this[_0x11ca1b(0x927)]()&&!this['isCustomBattleScope']()?this[_0x11ca1b(0x450)]():VisuMZ['BattleCore']['Game_Action_isForRandom'][_0x11ca1b(0x357)](this);},Game_Action[_0x16b2b1(0x1ca)]['isForRandomBattleCore']=function(){const _0x506f7f=_0x16b2b1,_0x32bbd0=this[_0x506f7f(0x3e3)]()[_0x506f7f(0x89e)];return _0x32bbd0[_0x506f7f(0x6ef)](/(?:RAND|RANDOM)/i);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x6ab)]=Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x455)],Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x455)]=function(){const _0xeee8b6=_0x16b2b1;return this[_0xeee8b6(0x927)]()&&!this[_0xeee8b6(0x6cc)]()?this[_0xeee8b6(0x1d9)]():VisuMZ[_0xeee8b6(0x4da)]['Game_Action_needsSelection'][_0xeee8b6(0x357)](this);},Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x1d9)]=function(){const _0x81569=_0x16b2b1,_0x55672b=this[_0x81569(0x3e3)]()[_0x81569(0x89e)];if(_0x55672b[_0x81569(0x6ef)](/RANDOM/i))return![];if(_0x55672b[_0x81569(0x6ef)](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return![];if(_0x55672b['match'](/ALL (?:ENEMY|ENEMIES|FOE|FOES)/i))return![];return VisuMZ[_0x81569(0x4da)][_0x81569(0x6ab)]['call'](this);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x226)]=Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x502)],Game_Action['prototype'][_0x16b2b1(0x502)]=function(){const _0x3ad982=_0x16b2b1;let _0x2ed309=[];return this[_0x3ad982(0x927)]()?_0x2ed309=this['makeTargetsBattleCore']():_0x2ed309=VisuMZ[_0x3ad982(0x4da)][_0x3ad982(0x226)][_0x3ad982(0x357)](this),_0x2ed309=this['applyTargetFilters'](_0x2ed309),_0x2ed309;},Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x60a)]=function(){const _0x51f465=_0x16b2b1;let _0xf4072e=[];const _0x35be95=String(this[_0x51f465(0x3e3)]()[_0x51f465(0x89e)]),_0x2392e6=VisuMZ[_0x51f465(0x4da)]['createKeyJS'](this['item'](),_0x51f465(0x85c));if(VisuMZ['BattleCore']['JS'][_0x2392e6]){_0xf4072e=VisuMZ[_0x51f465(0x4da)][_0x51f465(0x226)][_0x51f465(0x357)](this);const _0x4e1c6b=VisuMZ[_0x51f465(0x4da)]['createKeyJS'](this[_0x51f465(0x3e3)](),_0x51f465(0x85c));return _0xf4072e=VisuMZ[_0x51f465(0x4da)]['JS'][_0x4e1c6b][_0x51f465(0x357)](this,this['subject'](),_0xf4072e),this[_0x51f465(0x930)](_0xf4072e);}if(_0x35be95[_0x51f465(0x6ef)](/(\d+) RANDOM ANY/i)){let _0x2febd6=Number(RegExp['$1']);while(_0x2febd6--){const _0x591e95=Math[_0x51f465(0x576)](0x2)===0x0?this['opponentsUnit']():this[_0x51f465(0x411)]();_0xf4072e['push'](_0x591e95[_0x51f465(0x4ac)]());}return this[_0x51f465(0x930)](_0xf4072e);}if(_0x35be95[_0x51f465(0x6ef)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i)){let _0x351b04=Number(RegExp['$1']);while(_0x351b04--){_0xf4072e[_0x51f465(0x305)](this[_0x51f465(0x492)]()[_0x51f465(0x4ac)]());}return this['repeatTargets'](_0xf4072e);}if(_0x35be95[_0x51f465(0x6ef)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i)){let _0x4242de=Number(RegExp['$1']);while(_0x4242de--){_0xf4072e[_0x51f465(0x305)](this[_0x51f465(0x411)]()[_0x51f465(0x4ac)]());}return this[_0x51f465(0x930)](_0xf4072e);}if(_0x35be95['match'](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0xf4072e[_0x51f465(0x305)](...this['friendsUnit']()[_0x51f465(0x25b)]()[_0x51f465(0x1a0)](_0x161f1d=>_0x161f1d!==this['subject']())),this[_0x51f465(0x930)](_0xf4072e);return VisuMZ[_0x51f465(0x4da)][_0x51f465(0x226)][_0x51f465(0x357)](this);},Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x604)]=function(_0x3487d1){const _0x129abd=_0x16b2b1,_0x445c17=[];for(let _0x435f3a=0x0;_0x435f3a<this[_0x129abd(0x2a5)]();_0x435f3a++){_0x445c17[_0x129abd(0x305)](_0x3487d1[_0x129abd(0x4ac)]());}return _0x445c17;},Game_Action['prototype']['applyTargetFilters']=function(_0x3cec93){const _0x13b14a=_0x16b2b1;if(!this['item']())return _0x3cec93;const _0x1fbdcd=this['item']()['note'];return _0x1fbdcd[_0x13b14a(0x6ef)](/(?:BUT|EXCEPT) (?:USER|SELF)/i)&&_0x3cec93[_0x13b14a(0x94d)](this[_0x13b14a(0x8fc)]()),_0x3cec93;},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x850)]=Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x8e4)],Game_Action[_0x16b2b1(0x1ca)]['itemEffectAddAttackState']=function(_0x12d6ad,_0x46be59){const _0x58b0ff=_0x16b2b1,_0x10f977=_0x12d6ad[_0x58b0ff(0x3de)]();this[_0x58b0ff(0x8fc)]()['attackStates']()[_0x58b0ff(0x3e4)](_0x12d6ad[_0x58b0ff(0x8ed)]())&&_0x12d6ad[_0x58b0ff(0x829)](![]),VisuMZ[_0x58b0ff(0x4da)][_0x58b0ff(0x850)][_0x58b0ff(0x357)](this,_0x12d6ad,_0x46be59),_0x12d6ad[_0x58b0ff(0x829)](_0x10f977);},VisuMZ[_0x16b2b1(0x4da)]['Game_Action_itemEffectAddNormalState']=Game_Action[_0x16b2b1(0x1ca)]['itemEffectAddNormalState'],Game_Action[_0x16b2b1(0x1ca)]['itemEffectAddNormalState']=function(_0x3eaf75,_0x321276){const _0x326518=_0x16b2b1,_0x4c28e5=_0x3eaf75[_0x326518(0x3de)]();_0x321276[_0x326518(0x2e7)]===_0x3eaf75['deathStateId']()&&_0x3eaf75[_0x326518(0x829)](![]),VisuMZ[_0x326518(0x4da)][_0x326518(0x410)][_0x326518(0x357)](this,_0x3eaf75,_0x321276),_0x3eaf75['setImmortal'](_0x4c28e5);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x2f9)]=Game_Action['prototype'][_0x16b2b1(0x281)],Game_Action['prototype'][_0x16b2b1(0x281)]=function(){const _0x3fa829=_0x16b2b1;VisuMZ[_0x3fa829(0x4da)][_0x3fa829(0x2f9)][_0x3fa829(0x357)](this),this[_0x3fa829(0x7cd)](),this[_0x3fa829(0x412)]();},Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x7cd)]=function(){const _0x3c8a23=_0x16b2b1;if(!SceneManager['isSceneBattle']())return;const _0x27e9e0=/<COMMON (?:EVENT|EVENTS):[ ](.*)>/gi,_0x18c290=this[_0x3c8a23(0x3e3)]()['note']['match'](_0x27e9e0);if(_0x18c290)for(const _0x23d9e5 of _0x18c290){if(!_0x23d9e5)continue;_0x23d9e5[_0x3c8a23(0x6ef)](_0x27e9e0);const _0x185f68=String(RegExp['$1'])['split'](',')[_0x3c8a23(0x5b1)](_0x3dcb55=>String(_0x3dcb55)[_0x3c8a23(0x7bc)]()),_0x1e09ef=_0x185f68[_0x3c8a23(0x5b1)](_0x2b3ac6=>DataManager[_0x3c8a23(0x679)](_0x2b3ac6));for(const _0x1360f1 of _0x1e09ef){const _0x560ab0=$dataCommonEvents[_0x1360f1];_0x560ab0&&$gameTemp['reserveCommonEvent'](_0x1360f1);}}},DataManager[_0x16b2b1(0x679)]=function(_0x32c804){const _0x2b2b09=_0x16b2b1;_0x32c804=_0x32c804[_0x2b2b09(0x2b1)]()['trim'](),this[_0x2b2b09(0x23d)]=this[_0x2b2b09(0x23d)]||{};if(this[_0x2b2b09(0x23d)][_0x32c804])return this[_0x2b2b09(0x23d)][_0x32c804];for(const _0x223c4a of $dataCommonEvents){if(!_0x223c4a)continue;let _0x24e5f8=_0x223c4a['name'];_0x24e5f8=_0x24e5f8[_0x2b2b09(0x702)](/\x1I\[(\d+)\]/gi,''),_0x24e5f8=_0x24e5f8[_0x2b2b09(0x702)](/\\I\[(\d+)\]/gi,''),this[_0x2b2b09(0x23d)][_0x24e5f8[_0x2b2b09(0x2b1)]()[_0x2b2b09(0x7bc)]()]=_0x223c4a['id'];}return this[_0x2b2b09(0x23d)][_0x32c804]||0x0;},Game_Action['prototype'][_0x16b2b1(0x412)]=function(){const _0x12c7ac=_0x16b2b1;if(!SceneManager[_0x12c7ac(0x7ed)]())return;const _0x724839=VisuMZ[_0x12c7ac(0x4da)][_0x12c7ac(0x6ac)]['Mechanics'];_0x724839[_0x12c7ac(0x92b)]&&$gameSwitches[_0x12c7ac(0x69a)](_0x724839[_0x12c7ac(0x92b)],![]),_0x724839['SwitchMissEvade']&&$gameSwitches[_0x12c7ac(0x69a)](_0x724839[_0x12c7ac(0x2ab)],![]),_0x724839['VariableDmg']&&$gameVariables['setValue'](_0x724839['VariableDmg'],0x0),_0x724839['VariableHeal']&&$gameVariables[_0x12c7ac(0x69a)](_0x724839[_0x12c7ac(0x70e)],0x0);},Game_Action[_0x16b2b1(0x1ca)][_0x16b2b1(0x907)]=function(_0x3991ce){const _0x12cbac=_0x16b2b1;if(!SceneManager[_0x12cbac(0x7ed)]())return;if(!_0x3991ce)return;const _0x4e0229=_0x3991ce['result'](),_0x4292dc=VisuMZ['BattleCore']['Settings']['Mechanics'];_0x4292dc[_0x12cbac(0x92b)]&&_0x4e0229[_0x12cbac(0x784)]&&$gameSwitches['setValue'](_0x4292dc[_0x12cbac(0x92b)],!![]);_0x4292dc[_0x12cbac(0x2ab)]&&(_0x4e0229[_0x12cbac(0x6a8)]||_0x4e0229[_0x12cbac(0x751)])&&$gameSwitches[_0x12cbac(0x69a)](_0x4292dc[_0x12cbac(0x2ab)],!![]);if(_0x4292dc[_0x12cbac(0x1bc)]){let _0x1fa04c=$gameVariables[_0x12cbac(0x58f)](_0x4292dc['VariableDmg']);_0x4e0229[_0x12cbac(0x80f)]>0x0&&(_0x1fa04c+=Math[_0x12cbac(0x43d)](_0x4e0229['hpDamage'])),$gameVariables[_0x12cbac(0x69a)](_0x4292dc[_0x12cbac(0x1bc)],_0x1fa04c);}if(_0x4292dc[_0x12cbac(0x70e)]){let _0x2bd32d=$gameVariables[_0x12cbac(0x58f)](_0x4292dc[_0x12cbac(0x70e)]);_0x4e0229[_0x12cbac(0x80f)]<0x0&&(_0x2bd32d+=Math[_0x12cbac(0x43d)](_0x4e0229[_0x12cbac(0x80f)])),$gameVariables[_0x12cbac(0x69a)](_0x4292dc[_0x12cbac(0x70e)],_0x2bd32d);}},VisuMZ[_0x16b2b1(0x4da)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x16b2b1(0x1ca)][_0x16b2b1(0x5af)],Game_BattlerBase[_0x16b2b1(0x1ca)]['initMembers']=function(){const _0x22d8ed=_0x16b2b1;VisuMZ[_0x22d8ed(0x4da)][_0x22d8ed(0x2d2)]['call'](this),this[_0x22d8ed(0x8da)]();},Game_BattlerBase['prototype'][_0x16b2b1(0x8da)]=function(){this['_immortal']=![];},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x8f9)]=Game_BattlerBase[_0x16b2b1(0x1ca)][_0x16b2b1(0x388)],Game_BattlerBase['prototype'][_0x16b2b1(0x388)]=function(){const _0x4b7a5b=_0x16b2b1;this[_0x4b7a5b(0x825)]={},VisuMZ['BattleCore']['Game_BattlerBase_refresh'][_0x4b7a5b(0x357)](this);},Game_BattlerBase[_0x16b2b1(0x1ca)][_0x16b2b1(0x43a)]=function(_0x2b3320){const _0x180cd1=_0x16b2b1;return this[_0x180cd1(0x825)]=this[_0x180cd1(0x825)]||{},this[_0x180cd1(0x825)][_0x2b3320]!==undefined;},Game_BattlerBase[_0x16b2b1(0x1ca)]['hardDamageCap']=function(){const _0x2893e7=_0x16b2b1;if(this['_cache'][_0x2893e7(0x43e)]!==undefined)return this[_0x2893e7(0x825)][_0x2893e7(0x43e)];const _0x5ba96d=/<DAMAGE CAP:[ ](\d+)>/i,_0x26a58c=this[_0x2893e7(0x233)]()['map'](_0x324f06=>_0x324f06&&_0x324f06[_0x2893e7(0x50c)]['match'](_0x5ba96d)?Number(RegExp['$1']):0x0);let _0x5845bc=_0x26a58c['length']>0x0?Math['max'](..._0x26a58c):0x0;if(_0x5845bc<=0x0)_0x5845bc=VisuMZ[_0x2893e7(0x4da)][_0x2893e7(0x6ac)][_0x2893e7(0x5a4)][_0x2893e7(0x45a)];return this[_0x2893e7(0x825)][_0x2893e7(0x43e)]=_0x5845bc,this[_0x2893e7(0x825)][_0x2893e7(0x43e)];},Game_BattlerBase[_0x16b2b1(0x1ca)][_0x16b2b1(0x42d)]=function(){const _0x5b3d47=_0x16b2b1;if(this['_cache']['softDamageCap']!==undefined)return this[_0x5b3d47(0x825)][_0x5b3d47(0x6d3)];let _0x230c4c=VisuMZ[_0x5b3d47(0x4da)][_0x5b3d47(0x6ac)][_0x5b3d47(0x5a4)][_0x5b3d47(0x4c5)];const _0x1fb61f=/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i,_0x3fd97a=this[_0x5b3d47(0x233)]()[_0x5b3d47(0x5b1)](_0x3b676e=>_0x3b676e&&_0x3b676e[_0x5b3d47(0x50c)]['match'](_0x1fb61f)?Number(RegExp['$1'])/0x64:0x0);return _0x230c4c=_0x3fd97a[_0x5b3d47(0x454)]((_0x96fd00,_0x4806dc)=>_0x96fd00+_0x4806dc,_0x230c4c),this[_0x5b3d47(0x825)][_0x5b3d47(0x6d3)]=_0x230c4c,this[_0x5b3d47(0x825)][_0x5b3d47(0x6d3)][_0x5b3d47(0x235)](0.01,0x1);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x947)]=Game_BattlerBase[_0x16b2b1(0x1ca)][_0x16b2b1(0x304)],Game_BattlerBase[_0x16b2b1(0x1ca)][_0x16b2b1(0x304)]=function(){const _0x213cd1=_0x16b2b1;VisuMZ[_0x213cd1(0x4da)][_0x213cd1(0x947)][_0x213cd1(0x357)](this),SceneManager[_0x213cd1(0x7ed)]()&&this['requestMotion']('dead');},Game_BattlerBase[_0x16b2b1(0x1ca)][_0x16b2b1(0x4e0)]=function(){const _0x1eb5ae=_0x16b2b1;if(!SceneManager['isSceneBattle']())return null;if(!SceneManager[_0x1eb5ae(0x6b0)]['_spriteset'])return null;return SceneManager[_0x1eb5ae(0x6b0)][_0x1eb5ae(0x7d7)][_0x1eb5ae(0x251)](this);},Game_BattlerBase[_0x16b2b1(0x1ca)]['svBattlerAnchorX']=function(){const _0x34d485=_0x16b2b1;return VisuMZ[_0x34d485(0x4da)]['Settings'][_0x34d485(0x435)][_0x34d485(0x80e)];},Game_BattlerBase[_0x16b2b1(0x1ca)][_0x16b2b1(0x699)]=function(){const _0x4c8905=_0x16b2b1;return VisuMZ[_0x4c8905(0x4da)][_0x4c8905(0x6ac)][_0x4c8905(0x435)][_0x4c8905(0x27c)];},Game_BattlerBase['prototype'][_0x16b2b1(0x533)]=function(){const _0x263a78=_0x16b2b1;return this[_0x263a78(0x68f)]&&this['isActor']()?VisuMZ[_0x263a78(0x4da)][_0x263a78(0x6ac)][_0x263a78(0x435)][_0x263a78(0x376)]:VisuMZ[_0x263a78(0x4da)]['Settings'][_0x263a78(0x706)][_0x263a78(0x376)];},Game_BattlerBase[_0x16b2b1(0x1ca)][_0x16b2b1(0x700)]=function(){return!![];},Game_BattlerBase[_0x16b2b1(0x1ca)][_0x16b2b1(0x3e5)]=function(){return 0x0;},Game_BattlerBase[_0x16b2b1(0x1ca)]['battleUIOffsetY']=function(){return 0x0;},Game_BattlerBase[_0x16b2b1(0x1ca)][_0x16b2b1(0x20e)]=function(_0x34fbd9){const _0x5d69fd=_0x16b2b1;if(!_0x34fbd9)return 0x0;let _0xee576a=0x0;const _0x4ef680=_0x34fbd9[_0x5d69fd(0x50c)];return _0x4ef680['match'](/<BATTLE UI OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0xee576a+=Number(RegExp['$1'])),_0x4ef680[_0x5d69fd(0x6ef)](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0xee576a+=Number(RegExp['$1'])),_0xee576a;},Game_BattlerBase[_0x16b2b1(0x1ca)][_0x16b2b1(0x35d)]=function(_0x5c1072){const _0x36c62c=_0x16b2b1;if(!_0x5c1072)return 0x0;let _0x2627fa=0x0;const _0x35db01=_0x5c1072[_0x36c62c(0x50c)];return _0x35db01[_0x36c62c(0x6ef)](/<BATTLE UI OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x2627fa+=Number(RegExp['$1'])),_0x35db01[_0x36c62c(0x6ef)](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x2627fa+=Number(RegExp['$2'])),_0x2627fa;},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x939)]=Game_BattlerBase[_0x16b2b1(0x1ca)][_0x16b2b1(0x344)],Game_BattlerBase['prototype'][_0x16b2b1(0x344)]=function(_0x3e4da3){const _0x403188=_0x16b2b1;if(_0x3e4da3===this[_0x403188(0x8ed)]()&&this[_0x403188(0x3de)]())return!![];return VisuMZ[_0x403188(0x4da)][_0x403188(0x939)][_0x403188(0x357)](this,_0x3e4da3);},Game_BattlerBase[_0x16b2b1(0x1ca)]['isImmortal']=function(){return this['_immortal'];},Game_BattlerBase[_0x16b2b1(0x1ca)]['setImmortal']=function(_0x5ddbb9){const _0x1c8c34=_0x16b2b1;_0x5ddbb9?this[_0x1c8c34(0x509)]():this[_0x1c8c34(0x5f9)]();},Game_BattlerBase[_0x16b2b1(0x1ca)][_0x16b2b1(0x509)]=function(){if(this['isDead']())return;this['_immortal']=!![];},Game_BattlerBase['prototype'][_0x16b2b1(0x5f9)]=function(){const _0x1deb94=_0x16b2b1,_0x330fe8=this[_0x1deb94(0x526)]();this[_0x1deb94(0x539)]=![],this[_0x1deb94(0x388)](),this[_0x1deb94(0x8dc)]()&&_0x330fe8&&(this[_0x1deb94(0x7c6)](),this[_0x1deb94(0x868)]());},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x27f)]=Game_BattlerBase[_0x16b2b1(0x1ca)][_0x16b2b1(0x65e)],Game_BattlerBase[_0x16b2b1(0x1ca)][_0x16b2b1(0x65e)]=function(){const _0x4ad59b=_0x16b2b1;if(!this[_0x4ad59b(0x3f7)]())return![];return VisuMZ['BattleCore'][_0x4ad59b(0x27f)][_0x4ad59b(0x357)](this);},Game_BattlerBase[_0x16b2b1(0x1ca)]['canAttackBattleCore']=function(){const _0x284eb7=_0x16b2b1;for(const _0x4de7cf of this[_0x284eb7(0x233)]()){if(!_0x4de7cf)continue;if(_0x4de7cf[_0x284eb7(0x50c)][_0x284eb7(0x6ef)](/<(?:ATTACK SEAL|SEAL ATTACK)>/i))return![];}return!![];},VisuMZ[_0x16b2b1(0x4da)]['Game_BattlerBase_canGuard']=Game_BattlerBase[_0x16b2b1(0x1ca)]['canGuard'],Game_BattlerBase[_0x16b2b1(0x1ca)]['canGuard']=function(){const _0x3bd29e=_0x16b2b1;if(!this[_0x3bd29e(0x5c3)]())return![];return VisuMZ[_0x3bd29e(0x4da)]['Game_BattlerBase_canGuard'][_0x3bd29e(0x357)](this);},Game_BattlerBase[_0x16b2b1(0x1ca)][_0x16b2b1(0x5c3)]=function(){const _0x4eefd4=_0x16b2b1;for(const _0x2f1498 of this[_0x4eefd4(0x233)]()){if(!_0x2f1498)continue;if(_0x2f1498['note']['match'](/<(?:GUARD SEAL|SEAL GUARD)>/i))return![];}return!![];},Game_BattlerBase[_0x16b2b1(0x1ca)][_0x16b2b1(0x322)]=function(){const _0xf78d55=_0x16b2b1;for(const _0x5099e6 of this[_0xf78d55(0x233)]()){if(!_0x5099e6)continue;if(_0x5099e6[_0xf78d55(0x50c)][_0xf78d55(0x6ef)](/<(?:ITEM SEAL|SEAL ITEM|SEAL ITEMS)>/i))return![];}return!![];},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x527)]=Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x2a3)],Game_Battler[_0x16b2b1(0x1ca)]['regenerateAll']=function(){const _0x1f61cb=_0x16b2b1;if(SceneManager[_0x1f61cb(0x7ed)]()&&$gameTroop[_0x1f61cb(0x1bf)]()<=0x0)return;this['processBattleCoreJS']('PreRegenerateJS'),VisuMZ[_0x1f61cb(0x4da)][_0x1f61cb(0x527)][_0x1f61cb(0x357)](this),this['regenerateAllBattleCore'](),this[_0x1f61cb(0x78a)](_0x1f61cb(0x44b));},Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x83c)]=function(){const _0x152d56=_0x16b2b1;if(SceneManager['isSceneBattle']())for(const _0x4f5581 of this[_0x152d56(0x233)]()){if(!_0x4f5581)continue;this['onRegeneratePlayStateAnimation'](_0x4f5581);}},Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x693)]=function(_0x28f154){const _0xe504d=_0x16b2b1;if(!Imported['VisuMZ_0_CoreEngine'])return;if(!SceneManager['isSceneBattle']())return;if(this['isDead']())return;if(this[_0xe504d(0x8a4)]())return;if(_0x28f154[_0xe504d(0x50c)][_0xe504d(0x6ef)](/<(?:REGENERATE|REGEN|DEGEN|DOT|SLIP)[ ]ANIMATION:[ ](\d+)>/i)){const _0x1a37b6=Number(RegExp['$1']);$gameTemp[_0xe504d(0x606)]([this],_0x1a37b6,![],![]);}},VisuMZ['BattleCore'][_0x16b2b1(0x778)]=Game_Battler['prototype']['startTpbTurn'],Game_Battler['prototype'][_0x16b2b1(0x786)]=function(){const _0x427fbd=_0x16b2b1;this[_0x427fbd(0x78a)]('PreStartTurnJS'),VisuMZ[_0x427fbd(0x4da)][_0x427fbd(0x778)]['call'](this),this[_0x427fbd(0x78a)](_0x427fbd(0x2be));},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x2ee)]=Game_Battler['prototype']['onTurnEnd'],Game_Battler['prototype'][_0x16b2b1(0x290)]=function(){const _0x2c9942=_0x16b2b1;this[_0x2c9942(0x78a)](_0x2c9942(0x1cf)),VisuMZ['BattleCore'][_0x2c9942(0x2ee)]['call'](this),this['processBattleCoreJS'](_0x2c9942(0x5d3));},Game_Battler[_0x16b2b1(0x1ca)]['processBattleCoreJS']=function(_0x2f95ec){const _0x1b532a=_0x16b2b1;if(this[_0x1b532a(0x2df)]||this[_0x1b532a(0x7ee)])return;const _0x44241e=VisuMZ[_0x1b532a(0x4da)]['Settings'][_0x1b532a(0x37d)];if(_0x44241e[_0x2f95ec])_0x44241e[_0x2f95ec]['call'](this);for(const _0x32e8e1 of this[_0x1b532a(0x233)]()){if(!_0x32e8e1)continue;key=VisuMZ['BattleCore'][_0x1b532a(0x525)](_0x32e8e1,_0x2f95ec),VisuMZ[_0x1b532a(0x4da)]['JS'][key]&&VisuMZ[_0x1b532a(0x4da)]['JS'][key]['call'](this,this,this,_0x32e8e1,0x0);}},Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x7dd)]=function(){const _0x5befd9=_0x16b2b1;return VisuMZ[_0x5befd9(0x4da)][_0x5befd9(0x6ac)][_0x5befd9(0x435)][_0x5befd9(0x4e3)]||![];},Game_Battler[_0x16b2b1(0x1ca)]['isChanting']=function(){const _0x163ef9=_0x16b2b1;if(this[_0x163ef9(0x3ed)]()){if(this[_0x163ef9(0x7dd)]()){if(this[_0x163ef9(0x8fa)]['some'](_0x3869f4=>_0x3869f4['item']()&&_0x3869f4[_0x163ef9(0x6d0)]()))return!![];}else{if(this[_0x163ef9(0x8fa)]['some'](_0x21f90a=>_0x21f90a['item']()&&_0x21f90a['isMagicSkill']()))return!![];}}if(BattleManager[_0x163ef9(0x1fc)]()&&this['_tpbState']===_0x163ef9(0x451))return this['chantStyle']()?this[_0x163ef9(0x1ae)]()&&this[_0x163ef9(0x1ae)]()[_0x163ef9(0x3e3)]()&&this[_0x163ef9(0x1ae)]()[_0x163ef9(0x6d0)]():this['currentAction']()&&this[_0x163ef9(0x1ae)]()['item']()&&this[_0x163ef9(0x1ae)]()[_0x163ef9(0x7d3)]();return![];},Game_Battler[_0x16b2b1(0x1ca)]['isCharging']=function(){const _0x5651dc=_0x16b2b1;if(BattleManager['isTpb']()&&this['_tpbState']===_0x5651dc(0x451))return this[_0x5651dc(0x7dd)]()?this[_0x5651dc(0x1ae)]()&&this[_0x5651dc(0x1ae)]()[_0x5651dc(0x3e3)]()&&!this['currentAction']()[_0x5651dc(0x6d0)]():this[_0x5651dc(0x1ae)]()&&this['currentAction']()[_0x5651dc(0x3e3)]()&&!this['currentAction']()[_0x5651dc(0x7d3)]();return![];},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x284)]=Game_Battler[_0x16b2b1(0x1ca)]['clearDamagePopup'],Game_Battler['prototype'][_0x16b2b1(0x7d5)]=function(){const _0x4b1641=_0x16b2b1;VisuMZ[_0x4b1641(0x4da)]['Game_Battler_clearDamagePopup'][_0x4b1641(0x357)](this),this['_damagePopupArray']=[];},Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x2b7)]=function(){const _0x1e183d=_0x16b2b1;if(!this[_0x1e183d(0x1f1)])this['clearDamagePopup']();return this[_0x1e183d(0x1f1)][_0x1e183d(0x7d1)]>0x0;},Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x6f2)]=function(){const _0x20d4a3=_0x16b2b1;if(!SceneManager[_0x20d4a3(0x7ed)]())return;if(!this[_0x20d4a3(0x1f1)])this[_0x20d4a3(0x7d5)]();this[_0x20d4a3(0x918)]();const _0x5c9596=this['battler']();if(_0x5c9596)_0x5c9596['setupDamagePopup']();},Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x918)]=function(){const _0x3392f9=_0x16b2b1,_0x41e594=this['result']();if(_0x41e594[_0x3392f9(0x6a8)]||_0x41e594[_0x3392f9(0x751)]){const _0x5937a4=JsonEx[_0x3392f9(0x5df)](_0x41e594);_0x5937a4[_0x3392f9(0x1f2)]=![],_0x5937a4[_0x3392f9(0x854)]=0x0,this[_0x3392f9(0x1f1)][_0x3392f9(0x305)](_0x5937a4);}if(_0x41e594[_0x3392f9(0x1f2)]){const _0x5e708b=JsonEx['makeDeepCopy'](_0x41e594);_0x5e708b[_0x3392f9(0x6a8)]=![],_0x5e708b[_0x3392f9(0x751)]=![],_0x5e708b[_0x3392f9(0x854)]=0x0,this[_0x3392f9(0x1f1)][_0x3392f9(0x305)](_0x5e708b);}if(_0x41e594['mpDamage']!==0x0){const _0x42c1c9=JsonEx[_0x3392f9(0x5df)](_0x41e594);_0x42c1c9['missed']=![],_0x42c1c9[_0x3392f9(0x751)]=![],_0x42c1c9[_0x3392f9(0x1f2)]=![],this[_0x3392f9(0x1f1)]['push'](_0x42c1c9);}},Game_Battler['prototype'][_0x16b2b1(0x585)]=function(){const _0x4c80be=_0x16b2b1;if(!this[_0x4c80be(0x1f1)])this[_0x4c80be(0x7d5)]();return VisuMZ[_0x4c80be(0x4da)]['Settings'][_0x4c80be(0x5a4)][_0x4c80be(0x48a)]?this[_0x4c80be(0x1f1)][_0x4c80be(0x41f)]():this[_0x4c80be(0x1f1)][_0x4c80be(0x8cf)]();},Game_Battler[_0x16b2b1(0x1ca)]['setupTextPopup']=function(_0x1ab20d,_0x34ccb1){const _0x30dfc7=_0x16b2b1;if(!SceneManager[_0x30dfc7(0x7ed)]())return;if(!this[_0x30dfc7(0x4e0)]())return;if(_0x1ab20d[_0x30dfc7(0x7d1)]<=0x0)return;_0x34ccb1=_0x34ccb1||{},_0x34ccb1[_0x30dfc7(0x67b)]=_0x34ccb1['textColor']||_0x30dfc7(0x432),_0x34ccb1['flashColor']=_0x34ccb1[_0x30dfc7(0x37a)]||[0x0,0x0,0x0,0x0],_0x34ccb1[_0x30dfc7(0x3f4)]=_0x34ccb1[_0x30dfc7(0x3f4)]||0x0,this['battler']()[_0x30dfc7(0x79e)](_0x1ab20d,_0x34ccb1);},Game_Battler[_0x16b2b1(0x1ca)]['setupIconTextPopup']=function(_0x1250ca,_0x35e875,_0x26d25b){const _0xdbf12a=_0x16b2b1;if(!SceneManager[_0xdbf12a(0x7ed)]())return;if(!this[_0xdbf12a(0x4e0)]())return;if(_0x35e875[_0xdbf12a(0x7d1)]<=0x0)return;_0x26d25b=_0x26d25b||{},_0x26d25b[_0xdbf12a(0x67b)]=_0x26d25b[_0xdbf12a(0x67b)]||_0xdbf12a(0x432),_0x26d25b[_0xdbf12a(0x37a)]=_0x26d25b[_0xdbf12a(0x37a)]||[0x0,0x0,0x0,0x0],_0x26d25b[_0xdbf12a(0x3f4)]=_0x26d25b['flashDuration']||0x0,this['battler']()['setupIconTextPopup'](_0x1250ca,_0x35e875,_0x26d25b);},Game_Battler['prototype']['notFocusValid']=function(){const _0x90ba1c=_0x16b2b1;if(this[_0x90ba1c(0x8a4)]())return![];if(this[_0x90ba1c(0x526)]()&&this[_0x90ba1c(0x7b6)]())return!![];if(this['isEnemy']()&&this[_0x90ba1c(0x86f)]()){if(this['isDead']()&&this[_0x90ba1c(0x51d)]())return![];}else{if(this[_0x90ba1c(0x8dc)]())return![];}return!![];},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x88a)]=Game_Battler[_0x16b2b1(0x1ca)]['clearMotion'],Game_Battler['prototype']['clearMotion']=function(){const _0x13e7aa=_0x16b2b1;VisuMZ[_0x13e7aa(0x4da)][_0x13e7aa(0x88a)][_0x13e7aa(0x357)](this),this[_0x13e7aa(0x758)]();},Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x46f)]=function(){return!![];},Game_Battler['prototype'][_0x16b2b1(0x4f1)]=function(){return![];},VisuMZ['BattleCore'][_0x16b2b1(0x3d5)]=Game_Battler[_0x16b2b1(0x1ca)]['onBattleStart'],Game_Battler['prototype'][_0x16b2b1(0x685)]=function(_0x1181dd){const _0x4824cd=_0x16b2b1;VisuMZ[_0x4824cd(0x4da)][_0x4824cd(0x3d5)][_0x4824cd(0x357)](this,_0x1181dd),this[_0x4824cd(0x464)](_0x1181dd);},Game_Battler['prototype'][_0x16b2b1(0x464)]=function(_0x18d6f0){this['setBattlerFlip'](![]);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x8c4)]=Game_Battler['prototype'][_0x16b2b1(0x273)],Game_Battler['prototype'][_0x16b2b1(0x273)]=function(_0xba1700){const _0x57e59e=_0x16b2b1;VisuMZ[_0x57e59e(0x4da)]['Game_Battler_performActionStart'][_0x57e59e(0x357)](this,_0xba1700);if(!_0xba1700[_0x57e59e(0x94f)]()){const _0x2f2eb4=this[_0x57e59e(0x4e0)]();_0x2f2eb4&&_0x2f2eb4[_0x57e59e(0x876)]();}this[_0x57e59e(0x5b7)](![]);},Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x72d)]=function(){const _0x390eaf=_0x16b2b1,_0x11540c=this['_flinched'];this['_flinched']=![];if(BattleManager[_0x390eaf(0x447)]()&&this[_0x390eaf(0x8cc)]()){const _0xae174b=this[_0x390eaf(0x4e0)]();if(_0xae174b&&_0x11540c)_0xae174b['stepForward']();return;}const _0x14c691=this['battler']();if(_0x14c691)_0x14c691[_0x390eaf(0x419)]();this['setBattlerFlip'](![]),this['requestMotionRefresh']();},Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x4ca)]=function(_0x162666){const _0x279194=_0x16b2b1;if(_0x162666['isAttack']())this[_0x279194(0x475)]();else{if(_0x162666[_0x279194(0x94f)]())this['requestMotion'](_0x279194(0x483));else{if(_0x162666['isMagical']())this['requestMotion'](_0x279194(0x3a0));else{if(_0x162666[_0x279194(0x540)]())_0x162666[_0x279194(0x3e3)]()[_0x279194(0x271)][_0x279194(0x617)]>0x0?this[_0x279194(0x475)]():this['requestMotion']('skill');else _0x162666['isItem']()&&this['requestMotion'](_0x279194(0x3e3));}}}},Game_Battler['prototype']['getAttackMotion']=function(){const _0x42478f=_0x16b2b1;return $dataSystem[_0x42478f(0x8bb)][0x0];},Game_Battler['prototype'][_0x16b2b1(0x303)]=function(){const _0x312505=_0x16b2b1,_0x48b44d=this['getAttackMotion']();return _0x48b44d?_0x48b44d[_0x312505(0x55c)]:0x0;},Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x4b7)]=function(_0x9afda9){const _0x5d1bf3=_0x16b2b1;if(!$gameSystem['isSideView']())return;const _0x5e3d64=this[_0x5d1bf3(0x4e0)](),_0x4544fe=_0x9afda9['battler']();if(!_0x5e3d64||!_0x4544fe)return;const _0x31dada=_0x4544fe[_0x5d1bf3(0x5f5)],_0x30fdba=_0x4544fe[_0x5d1bf3(0x19e)];this[_0x5d1bf3(0x558)](_0x31dada,_0x30fdba,0x0,![],'Linear',-0x1),_0x5e3d64[_0x5d1bf3(0x632)]();const _0x2815c7=VisuMZ[_0x5d1bf3(0x4da)][_0x5d1bf3(0x6ac)][_0x5d1bf3(0x7df)];let _0xee459c=(_0x4544fe[_0x5d1bf3(0x20c)]+_0x5e3d64[_0x5d1bf3(0x20c)])/0x2;_0xee459c*=this[_0x5d1bf3(0x68f)]()?0x1:-0x1;let _0x19e41c=_0x2815c7[_0x5d1bf3(0x78f)]*(this['isActor']()?0x1:-0x1);_0x9afda9[_0x5d1bf3(0x903)](_0xee459c,_0x19e41c,0x0,![],_0x5d1bf3(0x1ed)),_0x4544fe[_0x5d1bf3(0x632)]();},Game_Battler['prototype'][_0x16b2b1(0x459)]=function(_0x26edd8){const _0x12b7ec=_0x16b2b1;if(SceneManager[_0x12b7ec(0x7ed)]()){const _0xc0f208=this[_0x12b7ec(0x4e0)]();_0xc0f208&&(_0xc0f208[_0x12b7ec(0x2aa)](_0x26edd8),[_0x12b7ec(0x4a9),_0x12b7ec(0x7cc),_0x12b7ec(0x4c4)][_0x12b7ec(0x3e4)](_0x26edd8)&&this[_0x12b7ec(0x5b5)]());}this['clearFreezeMotion']();},Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x5b5)]=function(){},Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x217)]=function(_0x52b15b){const _0x1e630e=_0x16b2b1;if(SceneManager[_0x1e630e(0x7ed)]()){const _0x582ab8=this['battler']();if(_0x582ab8)_0x582ab8[_0x1e630e(0x7e1)](_0x52b15b);}},Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x57e)]=function(){const _0x16170f=_0x16b2b1;if(SceneManager[_0x16170f(0x7ed)]()){const _0x5912bc=this[_0x16170f(0x303)]();this[_0x16170f(0x217)](_0x5912bc);}},Game_Battler['prototype'][_0x16b2b1(0x8c1)]=function(_0x213763,_0x2ba0e5){const _0x19dbde=_0x16b2b1;if(!_0x213763)return;if(!_0x213763[_0x19dbde(0x3e3)]())return;if(_0x213763[_0x19dbde(0x3cc)]())return;if(_0x213763[_0x19dbde(0x94f)]())return;if(_0x213763[_0x19dbde(0x445)]())return;let _0xdde761=0x0;const _0x1008d9=VisuMZ['BattleCore']['Settings'][_0x19dbde(0x7df)],_0x4788c8=_0x213763['item']()['note'];if(_0x4788c8[_0x19dbde(0x6ef)](/<CAST ANIMATION: (\d+)>/i))_0xdde761=Number(RegExp['$1']);else{if(_0x4788c8[_0x19dbde(0x6ef)](/<NO CAST ANIMATION>/i))return;else{if(_0x213763['isCertainHit']())_0xdde761=_0x1008d9['CastCertain'];else{if(_0x213763[_0x19dbde(0x1ce)]())_0xdde761=_0x1008d9[_0x19dbde(0x22c)];else _0x213763[_0x19dbde(0x6d0)]()&&(_0xdde761=_0x1008d9['CastMagical']);}}}_0xdde761>0x0&&$gameTemp[_0x19dbde(0x26f)]([this],_0xdde761,!!_0x2ba0e5);},Game_Battler['prototype'][_0x16b2b1(0x79d)]=function(){const _0x3cc549=_0x16b2b1;SoundManager[_0x3cc549(0x8d2)]();let _0x4d279b=VisuMZ[_0x3cc549(0x4da)]['Settings'][_0x3cc549(0x7df)][_0x3cc549(0x466)];_0x4d279b>0x0&&$gameTemp['requestAnimation']([this],_0x4d279b);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x50e)]=Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x3ca)],Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x3ca)]=function(){const _0x5232dd=_0x16b2b1;VisuMZ[_0x5232dd(0x4da)][_0x5232dd(0x50e)][_0x5232dd(0x357)](this),this['performFlinch']();},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x2c5)]=Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x90a)],Game_Battler['prototype'][_0x16b2b1(0x90a)]=function(){const _0x41cf49=_0x16b2b1;VisuMZ[_0x41cf49(0x4da)][_0x41cf49(0x2c5)][_0x41cf49(0x357)](this),this[_0x41cf49(0x7f7)]();},VisuMZ['BattleCore'][_0x16b2b1(0x365)]=Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x49d)],Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x49d)]=function(){const _0x488c9b=_0x16b2b1;VisuMZ[_0x488c9b(0x4da)][_0x488c9b(0x365)][_0x488c9b(0x357)](this),this[_0x488c9b(0x7f7)]();},Game_Battler['prototype']['performFlinch']=function(){const _0x15dcfc=_0x16b2b1;if(!$gameSystem[_0x15dcfc(0x5a0)]())return;if(this[_0x15dcfc(0x562)])return;this[_0x15dcfc(0x562)]=!![];const _0x568707=this[_0x15dcfc(0x4e0)]();if(_0x568707)_0x568707[_0x15dcfc(0x253)]();},Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x868)]=function(){const _0x264168=_0x16b2b1;if(this[_0x264168(0x8dc)]()&&this[_0x264168(0x6bf)]!==_0x264168(0x78d)){this[_0x264168(0x459)]('dead');return;}if(this['isDead']()&&this[_0x264168(0x6bf)]===_0x264168(0x78d))return;if(!!this[_0x264168(0x1b1)])return;if(this[_0x264168(0x73f)]()){if(!this[_0x264168(0x603)]()&&this!==BattleManager[_0x264168(0x8ff)]){if(this[_0x264168(0x4e0)]())this['battler']()['refreshMotion']();}this['clearFreezeMotion']();return;}if(this[_0x264168(0x6bf)]==='victory')return;if(this[_0x264168(0x6bf)]===_0x264168(0x214)&&!BattleManager[_0x264168(0x8cc)]())return;if(this[_0x264168(0x6bf)]==='guard'&&!BattleManager[_0x264168(0x8cc)]())return;this[_0x264168(0x2f1)]();if(this[_0x264168(0x4e0)]()&&BattleManager['isInputting']()){this[_0x264168(0x4e0)]()[_0x264168(0x827)](),this[_0x264168(0x758)]();return;}},Game_Enemy['prototype'][_0x16b2b1(0x603)]=function(){const _0xac2372=_0x16b2b1;if(!this[_0xac2372(0x86f)]())return![];const _0xeaeeff=this[_0xac2372(0x4e0)]();if(!_0xeaeeff)return![];const _0x3d7b00=_0xeaeeff[_0xac2372(0x878)];if(!_0x3d7b00)return![];const _0x38325a=_0x3d7b00[_0xac2372(0x8f5)];return _0x38325a&&!_0x38325a[_0xac2372(0x265)];},Game_Battler['prototype'][_0x16b2b1(0x950)]=function(){const _0xd6c277=_0x16b2b1;return this[_0xd6c277(0x8ca)];},Game_Battler[_0x16b2b1(0x1ca)]['setBattlerFlip']=function(_0x2e3dde){const _0x308e67=_0x16b2b1;if(!$gameSystem['isSideView']())return;this['_isBattlerFlipped']=_0x2e3dde;const _0x28f30f=this['battler']();if(_0x28f30f)_0x28f30f[_0x308e67(0x5f8)]();},Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x3fb)]=function(_0xadb6ac,_0x124980,_0x476e9d){const _0x2ec29f=_0x16b2b1;if(!$gameSystem['isSideView']())return;const _0x51cfbf=this[_0x2ec29f(0x4e0)]();if(!_0x51cfbf)return;if(_0xadb6ac===_0x51cfbf[_0x2ec29f(0x5f5)])return;let _0x3545ff=![];if(this['isActor']()){if(_0xadb6ac>_0x51cfbf[_0x2ec29f(0x5f5)])_0x3545ff=!![];if(_0xadb6ac<_0x51cfbf[_0x2ec29f(0x5f5)])_0x3545ff=![];}else{if(this[_0x2ec29f(0x73f)]()){if(_0xadb6ac>_0x51cfbf[_0x2ec29f(0x5f5)])_0x3545ff=![];if(_0xadb6ac<_0x51cfbf[_0x2ec29f(0x5f5)])_0x3545ff=!![];}};this['setBattlerFlip'](_0x476e9d?!_0x3545ff:_0x3545ff),_0x51cfbf['updateFlip']();},Game_Battler[_0x16b2b1(0x1ca)]['moveBattlerDistance']=function(_0x336b63,_0x3016bb,_0x163ff5,_0x29c3a0,_0x20c7a8){const _0x241160=_0x16b2b1;if(!$gameSystem[_0x241160(0x5a0)]())return;const _0xfb790d=this[_0x241160(0x4e0)]();if(!_0xfb790d)return;if(_0x29c3a0)this['setBattlerFacePoint'](_0x336b63+_0xfb790d['_baseX'],_0x3016bb+_0xfb790d['_baseY'],![]);_0x336b63+=_0xfb790d['_baseX']-_0xfb790d[_0x241160(0x535)],_0x3016bb+=_0xfb790d[_0x241160(0x19e)]-_0xfb790d[_0x241160(0x1c6)],_0xfb790d[_0x241160(0x1fe)](_0x336b63,_0x3016bb,_0x163ff5);if(Imported[_0x241160(0x64f)])_0xfb790d[_0x241160(0x20d)](_0x20c7a8||'Linear');},Game_Battler['prototype'][_0x16b2b1(0x558)]=function(_0x38419f,_0x343d32,_0x318bbe,_0x257f1d,_0xc9d616,_0x6671de){const _0x58675b=_0x16b2b1;if(!$gameSystem[_0x58675b(0x5a0)]())return;const _0x528d1d=this[_0x58675b(0x4e0)]();if(!_0x528d1d)return;_0x6671de=_0x6671de||0x0;if(_0x6671de>0x0){if(_0x528d1d[_0x58675b(0x5f5)]>_0x38419f)_0x38419f+=_0x528d1d[_0x58675b(0x20c)]/0x2+_0x6671de;if(_0x528d1d[_0x58675b(0x5f5)]<_0x38419f)_0x38419f-=_0x528d1d[_0x58675b(0x20c)]/0x2+_0x6671de;}if(_0x257f1d)this[_0x58675b(0x3fb)](_0x38419f,_0x343d32,![]);_0x38419f-=_0x528d1d[_0x58675b(0x535)],_0x343d32-=_0x528d1d[_0x58675b(0x1c6)],_0x528d1d[_0x58675b(0x1fe)](_0x38419f,_0x343d32,_0x318bbe);if(Imported[_0x58675b(0x64f)])_0x528d1d[_0x58675b(0x20d)](_0xc9d616||'Linear');},Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x1c7)]=function(_0x4755d6,_0x101af9,_0x4f835b){const _0x38994a=_0x16b2b1;if(!$gameSystem['isSideView']())return;const _0x5495e1=this[_0x38994a(0x4e0)]();if(!_0x5495e1)return;_0x5495e1[_0x38994a(0x973)](_0x4755d6,_0x101af9,_0x4f835b);},Game_Battler['prototype'][_0x16b2b1(0x370)]=function(_0x5ee477,_0x49978f){const _0x103e4d=_0x16b2b1;if(!$gameSystem[_0x103e4d(0x5a0)]())return;const _0x398782=this[_0x103e4d(0x4e0)]();if(!_0x398782)return;_0x398782[_0x103e4d(0x85b)](_0x5ee477,_0x49978f);},Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x64c)]=function(_0x31b765,_0x4a86e5,_0x3c4b09,_0x13effa){const _0x1ea7d3=_0x16b2b1;if(!$gameSystem[_0x1ea7d3(0x5a0)]())return;const _0x38767e=this[_0x1ea7d3(0x4e0)]();if(!_0x38767e)return;_0x38767e['startSpin'](_0x31b765,_0x4a86e5,_0x3c4b09,_0x13effa);},Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x4cb)]=function(_0x20e440,_0x2f0d99,_0x3d4f6a,_0x129f7d){const _0x1e4ddd=_0x16b2b1;if(!$gameSystem[_0x1e4ddd(0x5a0)]())return;const _0x395f98=this[_0x1e4ddd(0x4e0)]();if(!_0x395f98)return;this[_0x1e4ddd(0x68f)]()&&(_0x20e440*=-0x1,_0x2f0d99*=-0x1),_0x395f98[_0x1e4ddd(0x4b0)](_0x20e440,_0x2f0d99,_0x3d4f6a,_0x129f7d);},Game_Battler['prototype'][_0x16b2b1(0x966)]=function(_0x2f916e,_0x4ee18c,_0x2e4d83,_0x470b40){const _0x1af7b0=_0x16b2b1;if(!$gameSystem[_0x1af7b0(0x5a0)]())return;const _0x28de43=this[_0x1af7b0(0x4e0)]();if(!_0x28de43)return;_0x28de43[_0x1af7b0(0x931)](_0x2f916e,_0x4ee18c,_0x2e4d83,_0x470b40);},Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x542)]=function(_0x2ea7b9,_0xa6e4bf,_0x4b86f9){const _0x153429=_0x16b2b1;if(!$gameSystem['isSideView']())return;const _0x46e374=this['battler']();if(!_0x46e374)return;_0x46e374[_0x153429(0x6f5)](_0x2ea7b9,_0xa6e4bf,_0x4b86f9);},Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x758)]=function(){const _0x34fc97=_0x16b2b1,_0x5117fd=!!this[_0x34fc97(0x1b1)];this[_0x34fc97(0x1b1)]=undefined,_0x5117fd&&(this[_0x34fc97(0x868)](),this['clearFreezeMotionForWeapons']());},Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x516)]=function(){const _0x1312e4=_0x16b2b1;if(!SceneManager[_0x1312e4(0x7ed)]())return;const _0x483379=this['battler']();if(!_0x483379)return;let _0x3d2e39=this['isActor']()?_0x483379[_0x1312e4(0x264)]:_0x483379['_svBattlerSprite'][_0x1312e4(0x264)];_0x3d2e39&&_0x3d2e39[_0x1312e4(0x85d)](0x0);},Game_Battler['prototype'][_0x16b2b1(0x487)]=function(_0x35362d,_0x1a89d7,_0x542496){const _0x43dfc0=_0x16b2b1;if(this[_0x43dfc0(0x73f)]()&&!this[_0x43dfc0(0x86f)]())return;let _0x313ac5=0x0,_0x246ebf=0x0;_0x35362d[_0x43dfc0(0x6ef)](/ATTACK[ ](\d+)/i)&&(_0x246ebf=Number(RegExp['$1']),_0x246ebf--);if(this['isActor']()){const _0x22bd32=this[_0x43dfc0(0x6d6)]();_0x313ac5=_0x22bd32[_0x246ebf]?_0x22bd32[_0x246ebf][_0x43dfc0(0x3d0)]:0x0;}else this[_0x43dfc0(0x73f)]()&&(_0x313ac5=this[_0x43dfc0(0x881)]()[_0x43dfc0(0x3d0)]||0x0);const _0x2d2b68=$dataSystem[_0x43dfc0(0x8bb)][_0x313ac5];_0x35362d[_0x43dfc0(0x6ef)](/attack/i)&&(_0x35362d=[_0x43dfc0(0x7cc),_0x43dfc0(0x4a9),_0x43dfc0(0x4c4)][_0x2d2b68[_0x43dfc0(0x617)]]||_0x43dfc0(0x4a9)),this[_0x43dfc0(0x1b1)]={'motionType':_0x35362d,'weaponImageId':_0x1a89d7?_0x2d2b68[_0x43dfc0(0x55c)]:0x0,'pattern':_0x542496};},Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x6cf)]=function(_0x139865){const _0x5e67b1=_0x16b2b1;if(!_0x139865)return![];return _0x139865[_0x5e67b1(0x411)]()===this[_0x5e67b1(0x411)]();},Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x565)]=function(_0x4cd6a4){const _0x1d461f=_0x16b2b1;if(!_0x4cd6a4)return![];return _0x4cd6a4[_0x1d461f(0x492)]()===this['friendsUnit']();},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x4dd)]=Game_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x85d)],Game_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x85d)]=function(_0x37dc91){const _0x2e85e9=_0x16b2b1;VisuMZ[_0x2e85e9(0x4da)][_0x2e85e9(0x4dd)][_0x2e85e9(0x357)](this,_0x37dc91),this['initBattlePortrait']();},Game_Actor[_0x16b2b1(0x1ca)]['initBattlePortrait']=function(){const _0x403d89=_0x16b2b1;this[_0x403d89(0x68e)]='',this[_0x403d89(0x755)]()&&this[_0x403d89(0x755)]()[_0x403d89(0x50c)][_0x403d89(0x6ef)](/<BATTLE (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this[_0x403d89(0x68e)]=String(RegExp['$1']));},Game_Actor['prototype']['getBattlePortraitFilename']=function(){const _0x4feb24=_0x16b2b1;if(this[_0x4feb24(0x34c)]()!=='')return this[_0x4feb24(0x34c)]();else{if(Imported['VisuMZ_1_MainMenuCore']&&this['getMenuImage']()!=='')return this[_0x4feb24(0x476)]();}return'';},Game_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x34c)]=function(){const _0x106c70=_0x16b2b1;if(this[_0x106c70(0x68e)]===undefined)this[_0x106c70(0x504)]();return this[_0x106c70(0x68e)];},Game_Actor['prototype'][_0x16b2b1(0x564)]=function(_0x5a1132){const _0x3b22dc=_0x16b2b1;if(this['_battlePortrait']===undefined)this[_0x3b22dc(0x504)]();this['_battlePortrait']=_0x5a1132;if(SceneManager[_0x3b22dc(0x7ed)]()&&$gameParty[_0x3b22dc(0x367)]()['includes'](this)){const _0x48c182=SceneManager[_0x3b22dc(0x6b0)][_0x3b22dc(0x7a4)];if(_0x48c182)_0x48c182[_0x3b22dc(0x8a1)](this);}},Game_Actor['prototype'][_0x16b2b1(0x296)]=function(){return!![];},Game_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x470)]=function(){const _0x12c465=_0x16b2b1;if(!this[_0x12c465(0x402)]()&&BattleManager['_autoBattle'])return!![];return Game_Battler[_0x12c465(0x1ca)][_0x12c465(0x470)][_0x12c465(0x357)](this);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x697)]=Game_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x383)],Game_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x383)]=function(){const _0x34a2bf=_0x16b2b1;if(BattleManager[_0x34a2bf(0x4fb)]&&!ConfigManager['autoBattleUseSkills'])return this[_0x34a2bf(0x4d8)]();else{return VisuMZ['BattleCore'][_0x34a2bf(0x697)][_0x34a2bf(0x357)](this);;}},Game_Actor['prototype'][_0x16b2b1(0x4d8)]=function(){const _0x46db9b=_0x16b2b1,_0x3e67e4=[],_0x32d5f1=new Game_Action(this);return _0x32d5f1[_0x46db9b(0x770)](),_0x3e67e4[_0x46db9b(0x305)](_0x32d5f1),_0x3e67e4;},Game_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x8ab)]=function(){const _0x554322=_0x16b2b1;return this['currentClass']()[_0x554322(0x50c)]['match'](/<BATTLE COMMANDS>\s*([\s\S]*)\s*<\/BATTLE COMMANDS>/i)?String(RegExp['$1'])[_0x554322(0x3da)](/[\r\n]+/):VisuMZ[_0x554322(0x4da)]['Settings']['ActorCmd'][_0x554322(0x59e)];},Game_Actor['prototype'][_0x16b2b1(0x19b)]=function(){const _0x391e68=_0x16b2b1;if(this['_cache'][_0x391e68(0x846)]!==undefined)return this[_0x391e68(0x825)][_0x391e68(0x846)];return this['actor']()['note']['match'](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)?(this[_0x391e68(0x825)][_0x391e68(0x846)]=eval(RegExp['$1']),this[_0x391e68(0x825)][_0x391e68(0x6d9)]=eval(RegExp['$2'])):this[_0x391e68(0x825)]['svAnchorX']=Game_Battler[_0x391e68(0x1ca)][_0x391e68(0x19b)][_0x391e68(0x357)](this),this['_cache']['svAnchorX'];},Game_Actor['prototype'][_0x16b2b1(0x699)]=function(){const _0x33d0ed=_0x16b2b1;if(this[_0x33d0ed(0x825)][_0x33d0ed(0x6d9)]!==undefined)return this[_0x33d0ed(0x825)][_0x33d0ed(0x6d9)];return this['actor']()['note'][_0x33d0ed(0x6ef)](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)?(this[_0x33d0ed(0x825)][_0x33d0ed(0x846)]=eval(RegExp['$1']),this[_0x33d0ed(0x825)][_0x33d0ed(0x6d9)]=eval(RegExp['$2'])):this[_0x33d0ed(0x825)]['svAnchorY']=Game_Battler[_0x33d0ed(0x1ca)][_0x33d0ed(0x699)][_0x33d0ed(0x357)](this),this[_0x33d0ed(0x825)][_0x33d0ed(0x6d9)];},Game_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x533)]=function(){const _0x46c97e=_0x16b2b1;if(this[_0x46c97e(0x825)][_0x46c97e(0x213)]!==undefined)return this['_cache'][_0x46c97e(0x213)];if(this['actor']()[_0x46c97e(0x50c)][_0x46c97e(0x6ef)](/<SIDEVIEW SHOW SHADOW>/i))this[_0x46c97e(0x825)][_0x46c97e(0x213)]=!![];else this[_0x46c97e(0x755)]()[_0x46c97e(0x50c)][_0x46c97e(0x6ef)](/<SIDEVIEW HIDE SHADOW>/i)?this[_0x46c97e(0x825)][_0x46c97e(0x213)]=![]:this[_0x46c97e(0x825)]['svShadow']=Game_Battler[_0x46c97e(0x1ca)]['svBattlerShadowVisible']['call'](this);return this[_0x46c97e(0x825)][_0x46c97e(0x213)];},Game_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x700)]=function(){const _0x515c84=_0x16b2b1;return VisuMZ[_0x515c84(0x4da)][_0x515c84(0x6ac)]['Actor'][_0x515c84(0x838)];},Game_Actor[_0x16b2b1(0x1ca)]['performWeaponAnimation']=function(){const _0x5c0f73=_0x16b2b1,_0x46751e=this[_0x5c0f73(0x6d6)](),_0x425d45=_0x46751e[0x0]?_0x46751e[0x0][_0x5c0f73(0x3d0)]:0x0,_0x469980=$dataSystem[_0x5c0f73(0x8bb)][_0x425d45];_0x469980&&this[_0x5c0f73(0x217)](_0x469980[_0x5c0f73(0x55c)]);},Game_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x6e2)]=function(_0x5754f3){const _0x10852c=_0x16b2b1;Game_Battler[_0x10852c(0x1ca)][_0x10852c(0x6e2)][_0x10852c(0x357)](this,_0x5754f3),this[_0x10852c(0x4ca)](_0x5754f3);},Game_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x7d6)]=function(){const _0x46163c=_0x16b2b1,_0x3b1508=this[_0x46163c(0x6d6)](),_0x5cf09b=_0x3b1508[0x0]?_0x3b1508[0x0]['wtypeId']:0x0;return $dataSystem[_0x46163c(0x8bb)][_0x5cf09b];},Game_Actor[_0x16b2b1(0x1ca)]['attackAnimationIdSlot']=function(_0x438dca){const _0x1278e2=_0x16b2b1;_0x438dca=_0x438dca||0x1,_0x438dca--;const _0x5782b6=this[_0x1278e2(0x6d6)]();return _0x5782b6[_0x438dca]?_0x5782b6[_0x438dca]['animationId']:0x0;},Game_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x3ab)]=function(_0x391b89){const _0x4d3422=_0x16b2b1;_0x391b89=_0x391b89||0x1,_0x391b89--;const _0x512e19=this['weapons'](),_0x174998=_0x512e19[_0x391b89]?_0x512e19[_0x391b89][_0x4d3422(0x3d0)]:0x0;return $dataSystem[_0x4d3422(0x8bb)][_0x174998];},Game_Actor['prototype'][_0x16b2b1(0x66c)]=function(_0x5b7a63){const _0x316c13=_0x16b2b1;_0x5b7a63=_0x5b7a63||0x1,_0x5b7a63--;const _0x50d986=this[_0x316c13(0x6d6)](),_0x3985c4=_0x50d986[_0x5b7a63]?_0x50d986[_0x5b7a63][_0x316c13(0x3d0)]:0x0,_0x1762b9=$dataSystem[_0x316c13(0x8bb)][_0x3985c4];if(_0x1762b9){if(_0x1762b9[_0x316c13(0x617)]===0x0)this[_0x316c13(0x459)](_0x316c13(0x7cc));else{if(_0x1762b9[_0x316c13(0x617)]===0x1)this[_0x316c13(0x459)](_0x316c13(0x4a9));else _0x1762b9[_0x316c13(0x617)]===0x2&&this[_0x316c13(0x459)](_0x316c13(0x4c4));}this[_0x316c13(0x217)](_0x1762b9[_0x316c13(0x55c)]);}},Game_Battler[_0x16b2b1(0x1ca)]['setActiveWeaponSlot']=function(_0x5dea41){const _0x13368a=_0x16b2b1;this[_0x13368a(0x763)]=_0x5dea41||0x0;},Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x22f)]=function(){const _0x4c54e4=_0x16b2b1;this[_0x4c54e4(0x763)]=this['_activeWeaponSlot']||0x0,this[_0x4c54e4(0x763)]++;},Game_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x960)]=function(){const _0x467336=_0x16b2b1;this[_0x467336(0x763)]=undefined;},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x2a0)]=Game_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x6b9)],Game_Actor[_0x16b2b1(0x1ca)]['equips']=function(){const _0x1a8cb5=_0x16b2b1;let _0x481151=VisuMZ[_0x1a8cb5(0x4da)]['Game_Actor_equips'][_0x1a8cb5(0x357)](this);if(this[_0x1a8cb5(0x60d)])return _0x481151;if(this[_0x1a8cb5(0x763)]!==undefined){this['_tempEquipCheck']=!![];const _0x2a2d6d=this[_0x1a8cb5(0x4ec)]();for(let _0x41a0f9=0x0;_0x41a0f9<_0x2a2d6d[_0x1a8cb5(0x7d1)];_0x41a0f9++){_0x2a2d6d[_0x41a0f9]===0x1&&this[_0x1a8cb5(0x763)]!==_0x41a0f9&&(_0x481151[_0x41a0f9]=null);}this[_0x1a8cb5(0x60d)]=undefined;}return _0x481151;},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x875)]=function(_0x5792ed){const _0x1417d0=_0x16b2b1;return _0x5792ed[_0x1417d0(0x68f)]()?_0x5792ed[_0x1417d0(0x6d6)]()[_0x1417d0(0x7d1)]||0x1:0x1;},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x307)]=function(_0x3624ad,_0x17e876){const _0x15f57e=_0x16b2b1;_0x3624ad&&_0x3624ad[_0x15f57e(0x68f)]()&&_0x3624ad['setActiveWeaponSlot'](_0x17e876),this[_0x15f57e(0x23f)]();},Window_BattleLog[_0x16b2b1(0x1ca)]['clearActiveWeaponSet']=function(_0x28c900){const _0x44d5f4=_0x16b2b1;_0x28c900&&_0x28c900['isActor']()&&_0x28c900[_0x44d5f4(0x960)](),this['callNextMethod']();},Game_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x3e5)]=function(){const _0x9441a5=_0x16b2b1;let _0x468583=_0x9441a5(0x3e5);if(this[_0x9441a5(0x43a)](_0x468583))return this['_cache'][_0x468583];return this[_0x9441a5(0x825)][_0x468583]=this['createBattleUIOffsetX'](this[_0x9441a5(0x755)]()),this[_0x9441a5(0x825)][_0x468583];},Game_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x96c)]=function(){const _0x279555=_0x16b2b1;let _0x3c06ca=_0x279555(0x96c);if(this[_0x279555(0x43a)](_0x3c06ca))return this[_0x279555(0x825)][_0x3c06ca];return this[_0x279555(0x825)][_0x3c06ca]=this[_0x279555(0x35d)](this['actor']()),this[_0x279555(0x825)][_0x3c06ca];},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x7b0)]=Game_Enemy['prototype']['setup'],Game_Enemy['prototype'][_0x16b2b1(0x85d)]=function(_0x5583ca,_0x4275c1,_0x227bc4){const _0x11b117=_0x16b2b1;_0x5583ca=DataManager[_0x11b117(0x8d9)](_0x5583ca),VisuMZ[_0x11b117(0x4da)][_0x11b117(0x7b0)]['call'](this,_0x5583ca,_0x4275c1,_0x227bc4),Imported[_0x11b117(0x859)]&&this[_0x11b117(0x774)](),this[_0x11b117(0x5a1)](),this[_0x11b117(0x252)](),Imported[_0x11b117(0x859)]&&this[_0x11b117(0x8ee)]();},Game_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x5a1)]=function(){const _0x49e7ee=_0x16b2b1,_0x2facc4=VisuMZ[_0x49e7ee(0x4da)][_0x49e7ee(0x6ac)][_0x49e7ee(0x706)];this['_attackAnimationId']=_0x2facc4[_0x49e7ee(0x58a)],this[_0x49e7ee(0x5bd)]={};},Game_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x252)]=function(){const _0x15de67=_0x16b2b1,_0x27e1b6=VisuMZ[_0x15de67(0x4da)][_0x15de67(0x6ac)][_0x15de67(0x706)],_0x1395aa=this[_0x15de67(0x330)]()[_0x15de67(0x50c)];this[_0x15de67(0x5bd)]={'name':'','wtypeId':_0x27e1b6[_0x15de67(0x5e9)],'collapse':_0x27e1b6[_0x15de67(0x5d2)],'motionIdle':_0x27e1b6[_0x15de67(0x5e4)],'width':_0x27e1b6[_0x15de67(0x7f2)]||0x40,'height':_0x27e1b6[_0x15de67(0x602)]||0x40,'anchorX':_0x27e1b6[_0x15de67(0x80e)]||0x0,'anchorY':_0x27e1b6[_0x15de67(0x27c)]||0x0,'shadow':_0x27e1b6[_0x15de67(0x376)]};_0x1395aa[_0x15de67(0x6ef)](/<ATTACK ANIMATION:[ ](\d+)>/i)&&(this[_0x15de67(0x571)]=Number(RegExp['$1']));const _0x25595f=this[_0x15de67(0x5bd)];if(_0x1395aa[_0x15de67(0x6ef)](/<SIDEVIEW BATTLER: (.*)>/i))_0x25595f[_0x15de67(0x802)]=String(RegExp['$1']);else{if(_0x1395aa['match'](/<SIDEVIEW BATTLERS>\s*([\s\S]*)\s*<\/SIDEVIEW BATTLERS>/i)){const _0x48ccd7=String(RegExp['$1'])[_0x15de67(0x3da)](/[\r\n]+/)['remove']('');_0x25595f[_0x15de67(0x802)]=DataManager[_0x15de67(0x69b)](_0x48ccd7);}}_0x1395aa[_0x15de67(0x6ef)](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)&&(_0x25595f[_0x15de67(0x4db)]=eval(RegExp['$1']),_0x25595f['anchorY']=eval(RegExp['$2']));if(_0x1395aa[_0x15de67(0x6ef)](/<SIDEVIEW COLLAPSE>/i))_0x25595f[_0x15de67(0x300)]=!![];else _0x1395aa[_0x15de67(0x6ef)](/<SIDEVIEW NO COLLAPSE>/i)&&(_0x25595f[_0x15de67(0x300)]=![]);if(_0x1395aa[_0x15de67(0x6ef)](/<SIDEVIEW SHOW SHADOW>/i))_0x25595f[_0x15de67(0x465)]=!![];else _0x1395aa[_0x15de67(0x6ef)](/<SIDEVIEW HIDE SHADOW>/i)&&(_0x25595f['shadow']=![]);if(_0x1395aa[_0x15de67(0x6ef)](/<SIDEVIEW IDLE MOTION: (.*)>/i))_0x25595f[_0x15de67(0x861)]=String(RegExp['$1'])[_0x15de67(0x70a)]()[_0x15de67(0x7bc)]();else{if(_0x1395aa[_0x15de67(0x6ef)](/<SIDEVIEW IDLE MOTIONS>\s*([\s\S]*)\s*<\/SIDEVIEW IDLE MOTIONS>/i)){const _0x444e92=String(RegExp['$1'])[_0x15de67(0x3da)](/[\r\n]+/)[_0x15de67(0x94d)]('');_0x25595f[_0x15de67(0x861)]=DataManager[_0x15de67(0x69b)](_0x444e92);}}_0x1395aa['match'](/<SIDEVIEW SIZE: (\d+), (\d+)>/i)&&(_0x25595f[_0x15de67(0x20c)]=Number(RegExp['$1']),_0x25595f['height']=Number(RegExp['$2']));if(_0x1395aa[_0x15de67(0x6ef)](/<SIDEVIEW WEAPON: (.*)>/i))_0x25595f['wtypeId']=DataManager[_0x15de67(0x851)](RegExp['$1']);else{if(_0x1395aa[_0x15de67(0x6ef)](/<SIDEVIEW WEAPONS>\s*([\s\S]*)\s*<\/SIDEVIEW WEAPONS>/i)){const _0x43a3e0=String(RegExp['$1'])[_0x15de67(0x3da)](/[\r\n]+/)[_0x15de67(0x94d)](''),_0x36f367=DataManager[_0x15de67(0x69b)](_0x43a3e0);_0x25595f[_0x15de67(0x3d0)]=DataManager[_0x15de67(0x851)](_0x36f367);}}if(Imported[_0x15de67(0x859)]){const _0xa61411=this['getTraitSetKeys']();for(const _0x57b5e1 of _0xa61411){const _0x329e5e=this[_0x15de67(0x3cf)](_0x57b5e1)[_0x15de67(0x59d)][_0x15de67(0x2b1)]()[_0x15de67(0x7bc)](),_0x54ea71=_0x57b5e1[_0x15de67(0x2b1)]()[_0x15de67(0x7bc)]();if(_0x1395aa['match'](VisuMZ[_0x15de67(0x964)][_0x15de67(0x674)][_0x15de67(0x31a)[_0x15de67(0x742)](_0x54ea71,_0x329e5e)]))_0x25595f[_0x15de67(0x802)]=String(RegExp['$1']);else{if(_0x1395aa['match'](VisuMZ[_0x15de67(0x964)][_0x15de67(0x674)][_0x15de67(0x816)[_0x15de67(0x742)](_0x54ea71,_0x329e5e)])){const _0x5b8b5c=String(RegExp['$1'])[_0x15de67(0x3da)](/[\r\n]+/)[_0x15de67(0x94d)]('');_0x25595f['name']=DataManager[_0x15de67(0x69b)](_0x5b8b5c);}}if(_0x1395aa[_0x15de67(0x6ef)](VisuMZ[_0x15de67(0x964)][_0x15de67(0x674)][_0x15de67(0x2f5)[_0x15de67(0x742)](_0x54ea71,_0x329e5e)]))_0x25595f[_0x15de67(0x3d0)]=DataManager[_0x15de67(0x851)](RegExp['$1']);else{if(_0x1395aa['match'](VisuMZ[_0x15de67(0x964)][_0x15de67(0x674)]['SvWeaponMass-%1-%2'['format'](_0x54ea71,_0x329e5e)])){const _0x3718af=String(RegExp['$1'])['split'](/[\r\n]+/)[_0x15de67(0x94d)](''),_0x2c69dd=DataManager[_0x15de67(0x69b)](_0x3718af);_0x25595f[_0x15de67(0x3d0)]=DataManager[_0x15de67(0x851)](_0x2c69dd);}}if(_0x1395aa[_0x15de67(0x6ef)](VisuMZ[_0x15de67(0x964)]['RegExp'][_0x15de67(0x33d)['format'](_0x54ea71,_0x329e5e)]))_0x25595f[_0x15de67(0x861)]=String(RegExp['$1'])[_0x15de67(0x70a)]()[_0x15de67(0x7bc)]();else{if(_0x1395aa[_0x15de67(0x6ef)](VisuMZ[_0x15de67(0x964)][_0x15de67(0x674)][_0x15de67(0x298)['format'](_0x54ea71,_0x329e5e)])){const _0x385fa5=String(RegExp['$1'])[_0x15de67(0x3da)](/[\r\n]+/)[_0x15de67(0x94d)]('');_0x25595f[_0x15de67(0x861)]=DataManager[_0x15de67(0x69b)](_0x385fa5);}}}}},Game_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x728)]=function(){const _0x3803f1=_0x16b2b1;return this[_0x3803f1(0x571)]||0x0;},Game_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x2ff)]=function(){const _0x187e35=_0x16b2b1;return this[_0x187e35(0x728)]();},Game_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x409)]=function(_0x10dc42){const _0x209442=_0x16b2b1;return this[_0x209442(0x728)]();},Game_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x46f)]=function(){const _0x23d834=_0x16b2b1;if(this['enemy']()['note'][_0x23d834(0x6ef)](/<BATTLER SPRITE CANNOT MOVE>/i))return![];return Game_Battler['prototype'][_0x23d834(0x46f)]['call'](this);},Game_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x4f1)]=function(){const _0x471901=_0x16b2b1;if(this['enemy']()[_0x471901(0x50c)][_0x471901(0x6ef)](/<BATTLER SPRITE GROUNDED>/i))return!![];return![];},Game_Enemy['prototype']['skills']=function(){const _0xe90391=_0x16b2b1,_0x2c21c1=[];for(const _0x1039d5 of this[_0xe90391(0x330)]()['actions']){const _0x4fc366=$dataSkills[_0x1039d5[_0xe90391(0x659)]];if(_0x4fc366&&!_0x2c21c1[_0xe90391(0x3e4)](_0x4fc366))_0x2c21c1['push'](_0x4fc366);}return _0x2c21c1;},Game_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x3e5)]=function(){const _0x22f515=_0x16b2b1;let _0x46d9f8=_0x22f515(0x3e5);if(this['checkCacheKey'](_0x46d9f8))return this[_0x22f515(0x825)][_0x46d9f8];return this[_0x22f515(0x825)][_0x46d9f8]=this[_0x22f515(0x20e)](this[_0x22f515(0x330)]()),this['_cache'][_0x46d9f8];},Game_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x96c)]=function(){const _0x4e6dae=_0x16b2b1;let _0x5d7a28=_0x4e6dae(0x96c);if(this[_0x4e6dae(0x43a)](_0x5d7a28))return this[_0x4e6dae(0x825)][_0x5d7a28];return this[_0x4e6dae(0x825)][_0x5d7a28]=this[_0x4e6dae(0x35d)](this['enemy']()),this[_0x4e6dae(0x825)][_0x5d7a28];},Game_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x881)]=function(){const _0x330883=_0x16b2b1;if(this[_0x330883(0x5bd)]!==undefined)return this[_0x330883(0x5bd)];return this[_0x330883(0x252)](),this[_0x330883(0x5bd)];},Game_Enemy['prototype']['hasSvBattler']=function(){const _0x359f06=_0x16b2b1;return this[_0x359f06(0x881)]()[_0x359f06(0x802)]!=='';},Game_Enemy['prototype'][_0x16b2b1(0x8f6)]=function(){const _0x35ff60=_0x16b2b1;return this[_0x35ff60(0x881)]()[_0x35ff60(0x802)];},Game_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x700)]=function(){const _0x29e8d1=_0x16b2b1;return this['hasSvBattler']()?VisuMZ['BattleCore'][_0x29e8d1(0x6ac)][_0x29e8d1(0x435)][_0x29e8d1(0x838)]:VisuMZ[_0x29e8d1(0x4da)][_0x29e8d1(0x6ac)][_0x29e8d1(0x706)][_0x29e8d1(0x838)];},Game_Enemy['prototype'][_0x16b2b1(0x6e2)]=function(_0x4a1384){const _0x1fd701=_0x16b2b1;Game_Battler[_0x1fd701(0x1ca)][_0x1fd701(0x6e2)][_0x1fd701(0x357)](this,_0x4a1384);if(this[_0x1fd701(0x86f)]())this['performActionMotions'](_0x4a1384);},Game_Enemy[_0x16b2b1(0x1ca)]['performAttack']=function(){const _0x1d117f=_0x16b2b1,_0x2ed360=this[_0x1d117f(0x881)]()['wtypeId']||0x0,_0x3dff0d=$dataSystem[_0x1d117f(0x8bb)][_0x2ed360];if(_0x3dff0d){if(_0x3dff0d['type']===0x0)this[_0x1d117f(0x459)](_0x1d117f(0x7cc));else{if(_0x3dff0d[_0x1d117f(0x617)]===0x1)this[_0x1d117f(0x459)]('swing');else _0x3dff0d['type']===0x2&&this[_0x1d117f(0x459)](_0x1d117f(0x4c4));}}},Game_Enemy['prototype'][_0x16b2b1(0x5b5)]=function(){const _0x37904b=_0x16b2b1,_0x373537=this[_0x37904b(0x881)]()[_0x37904b(0x3d0)]||0x0,_0x54533e=$dataSystem[_0x37904b(0x8bb)][_0x373537];_0x54533e&&this[_0x37904b(0x217)](_0x54533e[_0x37904b(0x55c)]);},Game_Enemy[_0x16b2b1(0x1ca)]['getAttackMotion']=function(){const _0xd3774d=_0x16b2b1,_0x39a76e=this['svBattlerData']()['wtypeId']||0x0;return $dataSystem[_0xd3774d(0x8bb)][_0x39a76e];},Game_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x3ab)]=function(_0x59d634){const _0x170589=_0x16b2b1;return this[_0x170589(0x7d6)]();},Game_Enemy['prototype'][_0x16b2b1(0x3ca)]=function(){const _0x4ff2d9=_0x16b2b1;Game_Battler['prototype']['performDamage'][_0x4ff2d9(0x357)](this),this[_0x4ff2d9(0x296)]()&&this[_0x4ff2d9(0x86f)]()&&this[_0x4ff2d9(0x459)](_0x4ff2d9(0x271)),SoundManager['playEnemyDamage']();},Game_Enemy['prototype'][_0x16b2b1(0x49d)]=function(){const _0x5ebf40=_0x16b2b1;Game_Battler[_0x5ebf40(0x1ca)]['performEvasion'][_0x5ebf40(0x357)](this),this[_0x5ebf40(0x459)]('evade');},Game_Enemy['prototype'][_0x16b2b1(0x686)]=function(){const _0x568d41=_0x16b2b1;Game_Battler[_0x568d41(0x1ca)][_0x568d41(0x686)][_0x568d41(0x357)](this),this[_0x568d41(0x459)]('evade');},Game_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x57b)]=function(){const _0xedaae4=_0x16b2b1;Game_Battler[_0xedaae4(0x1ca)]['performCounter'][_0xedaae4(0x357)](this),this[_0xedaae4(0x475)]();},Game_Enemy[_0x16b2b1(0x1ca)]['allowCollapse']=function(){const _0x4c1ec4=_0x16b2b1;if(this[_0x4c1ec4(0x86f)]()){if(this[_0x4c1ec4(0x661)]()>=0x1)return!![];return this[_0x4c1ec4(0x881)]()[_0x4c1ec4(0x300)];}else return!![];},Game_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x19b)]=function(){const _0x30c36d=_0x16b2b1;return this[_0x30c36d(0x881)]()['anchorX'];},Game_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x699)]=function(){const _0x5997d9=_0x16b2b1;return this[_0x5997d9(0x881)]()[_0x5997d9(0x61d)];},Game_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x533)]=function(){const _0x4007a0=_0x16b2b1;return this[_0x4007a0(0x881)]()[_0x4007a0(0x465)];},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x836)]=Game_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x613)],Game_Enemy['prototype'][_0x16b2b1(0x613)]=function(_0x16a144){const _0x5854f2=_0x16b2b1;VisuMZ['BattleCore'][_0x5854f2(0x836)]['call'](this,_0x16a144),this[_0x5854f2(0x5a1)](),this[_0x5854f2(0x252)]();const _0x41f928=this[_0x5854f2(0x4e0)]();if(_0x41f928)_0x41f928[_0x5854f2(0x89f)](this);},Game_Unit[_0x16b2b1(0x1ca)][_0x16b2b1(0x78a)]=function(_0x1b4882){const _0x3928e9=_0x16b2b1;for(const _0x3dde93 of this['members']()){if(_0x3dde93)_0x3dde93[_0x3928e9(0x78a)](_0x1b4882);}},Game_Unit[_0x16b2b1(0x1ca)][_0x16b2b1(0x4ac)]=function(){const _0x2beab9=_0x16b2b1,_0x3f25fd=this['aliveMembers']();return _0x3f25fd[Math[_0x2beab9(0x576)](_0x3f25fd['length'])];},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x737)]=Game_Party[_0x16b2b1(0x1ca)][_0x16b2b1(0x73b)],Game_Party[_0x16b2b1(0x1ca)][_0x16b2b1(0x73b)]=function(_0x5ef735){const _0x57b488=_0x16b2b1;VisuMZ['BattleCore'][_0x57b488(0x737)][_0x57b488(0x357)](this,_0x5ef735),BattleManager[_0x57b488(0x976)]();},VisuMZ[_0x16b2b1(0x4da)]['Game_Party_removeActor']=Game_Party[_0x16b2b1(0x1ca)][_0x16b2b1(0x396)],Game_Party[_0x16b2b1(0x1ca)][_0x16b2b1(0x396)]=function(_0x30329f){const _0x33352e=_0x16b2b1;VisuMZ[_0x33352e(0x4da)][_0x33352e(0x645)]['call'](this,_0x30329f),BattleManager[_0x33352e(0x976)]();},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x531)]=Game_Troop[_0x16b2b1(0x1ca)][_0x16b2b1(0x85d)],Game_Troop[_0x16b2b1(0x1ca)]['setup']=function(_0x295c15){const _0x558d3d=_0x16b2b1;$gameTemp[_0x558d3d(0x5a7)](),$gameTemp[_0x558d3d(0x81a)](_0x295c15),VisuMZ['BattleCore']['Game_Troop_setup'][_0x558d3d(0x357)](this,_0x295c15);},VisuMZ['BattleCore'][_0x16b2b1(0x6a3)]=Game_Map[_0x16b2b1(0x1ca)][_0x16b2b1(0x963)],Game_Map[_0x16b2b1(0x1ca)][_0x16b2b1(0x963)]=function(){const _0x220bd2=_0x16b2b1;VisuMZ[_0x220bd2(0x4da)][_0x220bd2(0x6a3)][_0x220bd2(0x357)](this),this['setupBattlebackBattleCore']();},Game_Map[_0x16b2b1(0x1ca)]['setupBattlebackBattleCore']=function(){const _0x8fd887=_0x16b2b1;this[_0x8fd887(0x2b2)]={},this[_0x8fd887(0x809)]={};if(!$dataMap)return;const _0x18945d=$dataMap['note'];if(!_0x18945d)return;const _0x16d30b=_0x18945d[_0x8fd887(0x6ef)](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/gi);if(_0x16d30b)for(const _0x2d2910 of _0x16d30b){_0x2d2910['match'](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/i);const _0x3ab534=Number(RegExp['$1']),_0x3c98c8=Number(RegExp['$2']),_0x589687=_0x3c98c8===0x1?this[_0x8fd887(0x2b2)]:this['_regionBattleback2'],_0x4e840f=String(RegExp['$3']);_0x589687[_0x3ab534]=_0x4e840f;}},VisuMZ[_0x16b2b1(0x4da)]['Game_Map_battleback1Name']=Game_Map[_0x16b2b1(0x1ca)][_0x16b2b1(0x249)],Game_Map[_0x16b2b1(0x1ca)]['battleback1Name']=function(){const _0x1b118c=_0x16b2b1;if(!BattleManager[_0x1b118c(0x6ca)]()){const _0x102632=$gamePlayer['regionId']($gamePlayer['x'],$gamePlayer['y']);if(this[_0x1b118c(0x2b2)]&&this[_0x1b118c(0x2b2)][_0x102632])return this[_0x1b118c(0x2b2)][_0x102632];}return VisuMZ[_0x1b118c(0x4da)][_0x1b118c(0x797)][_0x1b118c(0x357)](this);},VisuMZ['BattleCore'][_0x16b2b1(0x87e)]=Game_Map[_0x16b2b1(0x1ca)][_0x16b2b1(0x224)],Game_Map[_0x16b2b1(0x1ca)][_0x16b2b1(0x224)]=function(){const _0x138017=_0x16b2b1;if(!BattleManager[_0x138017(0x6ca)]()){const _0xb3c73b=$gamePlayer[_0x138017(0x55d)]($gamePlayer['x'],$gamePlayer['y']);if(this[_0x138017(0x2b2)]&&this['_regionBattleback2'][_0xb3c73b])return this[_0x138017(0x809)][_0xb3c73b];}return VisuMZ['BattleCore'][_0x138017(0x87e)][_0x138017(0x357)](this);},VisuMZ['BattleCore']['Game_Interpreter_PluginCommand']=Game_Interpreter[_0x16b2b1(0x1ca)][_0x16b2b1(0x8fe)],Game_Interpreter[_0x16b2b1(0x1ca)][_0x16b2b1(0x8fe)]=function(_0x314c69){const _0xe0681a=_0x16b2b1;return $gameTemp[_0xe0681a(0x275)](this),VisuMZ[_0xe0681a(0x4da)]['Game_Interpreter_PluginCommand']['call'](this,_0x314c69);},VisuMZ['BattleCore'][_0x16b2b1(0x6fe)]=Game_Interpreter[_0x16b2b1(0x1ca)]['updateWaitMode'],Game_Interpreter['prototype'][_0x16b2b1(0x1df)]=function(){const _0x4b288b=_0x16b2b1;if(SceneManager[_0x4b288b(0x7ed)]())switch(this['_waitMode']){case _0x4b288b(0x301):if(Imported[_0x4b288b(0x936)]){if($gameScreen[_0x4b288b(0x711)]()[_0x4b288b(0x240)]>0x0)return!![];this[_0x4b288b(0x375)]='';}break;case _0x4b288b(0x439):if(BattleManager[_0x4b288b(0x7d7)][_0x4b288b(0x8ba)]())return!![];this[_0x4b288b(0x375)]='';break;case _0x4b288b(0x60b):if(Imported[_0x4b288b(0x936)]){if($gameScreen[_0x4b288b(0x711)]()['cameraDuration']>0x0)return!![];if($gameScreen[_0x4b288b(0x711)]()[_0x4b288b(0x530)]>0x0)return!![];this[_0x4b288b(0x375)]='';}break;case'battleEffect':if(BattleManager['_spriteset'][_0x4b288b(0x5a3)]())return!![];this[_0x4b288b(0x375)]='';break;case _0x4b288b(0x32c):if(BattleManager[_0x4b288b(0x7d7)][_0x4b288b(0x71f)]())return!![];this[_0x4b288b(0x375)]='';break;case'battleJump':if(BattleManager[_0x4b288b(0x7d7)]['isAnyoneJumping']())return!![];this['_waitMode']='';break;case _0x4b288b(0x5d9):if(BattleManager[_0x4b288b(0x629)]['isBusy']())return!![];this['_waitMode']='';break;case'battleMove':if(BattleManager['_spriteset'][_0x4b288b(0x631)]())return!![];this[_0x4b288b(0x375)]='';break;case'battleOpacity':if(BattleManager['_spriteset'][_0x4b288b(0x616)]())return!![];this[_0x4b288b(0x375)]='';break;case'battleGrow':if(BattleManager[_0x4b288b(0x7d7)]['isAnyoneGrowing']())return!![];this[_0x4b288b(0x375)]='';break;case'battleSpriteSkew':if(BattleManager[_0x4b288b(0x7d7)][_0x4b288b(0x3f3)]())return!![];this[_0x4b288b(0x375)]='';break;case _0x4b288b(0x5de):if(Imported[_0x4b288b(0x956)]){if(BattleManager[_0x4b288b(0x7d7)]['isAnyProjectilePresent']())return!![];this['_waitMode']='';}break;case _0x4b288b(0x3ee):if(Imported[_0x4b288b(0x936)]){if($gameScreen[_0x4b288b(0x711)]()[_0x4b288b(0x479)]>0x0)return!![];this[_0x4b288b(0x375)]='';}break;case'battleSpin':if(BattleManager[_0x4b288b(0x7d7)][_0x4b288b(0x22a)]())return!![];this[_0x4b288b(0x375)]='';break;case _0x4b288b(0x5ba):if(Imported[_0x4b288b(0x936)]){if($gameScreen[_0x4b288b(0x711)]()[_0x4b288b(0x76e)]>0x0)return!![];this['_waitMode']='';}break;}return VisuMZ[_0x4b288b(0x4da)]['Game_Interpreter_updateWaitMode'][_0x4b288b(0x357)](this);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x5c5)]=Game_Interpreter[_0x16b2b1(0x1ca)][_0x16b2b1(0x49a)],Game_Interpreter['prototype'][_0x16b2b1(0x49a)]=function(_0xa38be8){const _0x6d9de9=_0x16b2b1;return!$gameParty[_0x6d9de9(0x7a1)]()?this[_0x6d9de9(0x60c)](_0xa38be8):VisuMZ[_0x6d9de9(0x4da)][_0x6d9de9(0x5c5)][_0x6d9de9(0x357)](this,_0xa38be8);},Game_Interpreter[_0x16b2b1(0x1ca)][_0x16b2b1(0x605)]=function(_0x3be6ba){const _0x4a6a36=_0x16b2b1;return VisuMZ['BattleCore'][_0x4a6a36(0x5c5)][_0x4a6a36(0x357)](this,_0x3be6ba),BattleManager['setEventCallback'](_0x598fed=>{const _0x3fbd4b=_0x4a6a36;this[_0x3fbd4b(0x222)][this['_indent']]=_0x598fed;}),!![];},VisuMZ[_0x16b2b1(0x4da)]['CheckMapBattleEventValid']=function(_0x487e43){const _0x1161a3=_0x16b2b1,_0x49bd87=$dataCommonEvents[_0x487e43];if(!_0x49bd87)return![];if(_0x49bd87[_0x1161a3(0x3c5)]['length']<=0x1)return![];return!![];},Game_Interpreter[_0x16b2b1(0x1ca)][_0x16b2b1(0x60c)]=function(_0x4a3383){const _0x442eb5=_0x16b2b1,_0x19bde5=VisuMZ['BattleCore'][_0x442eb5(0x6ac)][_0x442eb5(0x37d)],_0x93521d=_0x19bde5['BattleStartEvent'],_0x448efb=$dataCommonEvents[_0x93521d];if(_0x448efb&&VisuMZ[_0x442eb5(0x4da)][_0x442eb5(0x503)](_0x93521d)){const _0x3b1051=this[_0x442eb5(0x210)]()?this['_eventId']:0x0,_0x5dc7df=_0x448efb[_0x442eb5(0x3c5)];this[_0x442eb5(0x73d)](_0x5dc7df,_0x3b1051),this[_0x442eb5(0x2f0)]=JsonEx[_0x442eb5(0x5df)](this[_0x442eb5(0x2f0)]);const _0xd27312={'code':0xbc3,'indent':this[_0x442eb5(0x55e)],'parameters':JsonEx[_0x442eb5(0x5df)](_0x4a3383)};return this['_list'][_0x442eb5(0x512)](this[_0x442eb5(0x4f4)]+0x1,0x0,_0xd27312),!![];}else return VisuMZ['BattleCore'][_0x442eb5(0x5c5)][_0x442eb5(0x357)](this,_0x4a3383);},VisuMZ[_0x16b2b1(0x4da)]['BattleManager_onEncounter']=BattleManager['onEncounter'],BattleManager[_0x16b2b1(0x228)]=function(){const _0x1ebcee=_0x16b2b1;VisuMZ[_0x1ebcee(0x4da)]['BattleManager_onEncounter'][_0x1ebcee(0x357)](this),this[_0x1ebcee(0x1d4)]();},BattleManager[_0x16b2b1(0x1d4)]=function(){const _0x27257f=_0x16b2b1,_0x4e1198=VisuMZ[_0x27257f(0x4da)][_0x27257f(0x6ac)][_0x27257f(0x37d)],_0x476269=_0x4e1198['BattleStartEvent'];_0x476269&&VisuMZ[_0x27257f(0x4da)]['CheckMapBattleEventValid'](_0x476269)&&(this[_0x27257f(0x974)]=!![],$gameTemp[_0x27257f(0x1fd)](_0x4e1198[_0x27257f(0x2c2)]),$gameMap[_0x27257f(0x1e7)](),$gameMap[_0x27257f(0x36d)][_0x27257f(0x19d)]=!![]),_0x4e1198['DefeatEvent']>0x0&&(this[_0x27257f(0x30c)]=!![]);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x6e3)]=Scene_Map[_0x16b2b1(0x1ca)][_0x16b2b1(0x61c)],Scene_Map[_0x16b2b1(0x1ca)]['launchBattle']=function(){const _0x204157=_0x16b2b1;BattleManager[_0x204157(0x974)]?this[_0x204157(0x4f7)]():VisuMZ[_0x204157(0x4da)]['Scene_Map_launchBattle'][_0x204157(0x357)](this);},Scene_Map['prototype'][_0x16b2b1(0x4f7)]=function(){const _0x3ccaca=_0x16b2b1;this[_0x3ccaca(0x970)]=!![];},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x707)]=SceneManager[_0x16b2b1(0x842)],SceneManager['isSceneChanging']=function(){const _0x1ff846=_0x16b2b1;if(BattleManager[_0x1ff846(0x974)])return![];return VisuMZ['BattleCore'][_0x1ff846(0x707)][_0x1ff846(0x357)](this);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x7fa)]=Game_Interpreter[_0x16b2b1(0x1ca)][_0x16b2b1(0x782)],Game_Interpreter['prototype']['terminate']=function(){const _0x20768c=_0x16b2b1;VisuMZ[_0x20768c(0x4da)][_0x20768c(0x7fa)][_0x20768c(0x357)](this),this['_preBattleCommonEvent']&&(this[_0x20768c(0x19d)]=undefined,SceneManager['_scene'][_0x20768c(0x5c9)]());},Scene_Map[_0x16b2b1(0x1ca)][_0x16b2b1(0x5c9)]=function(){const _0x49a0ed=_0x16b2b1;BattleManager['_battleCoreBattleStartEvent']=undefined,BattleManager['_battleCoreBattleResumeAfter']=!![],this[_0x49a0ed(0x5f6)]();},VisuMZ['BattleCore']['Scene_Map_initializeAfter']=Scene_Map[_0x16b2b1(0x1ca)]['initialize'],Scene_Map[_0x16b2b1(0x1ca)][_0x16b2b1(0x77d)]=function(){const _0xba987b=_0x16b2b1;VisuMZ[_0xba987b(0x4da)][_0xba987b(0x7b7)][_0xba987b(0x357)](this),BattleManager['_battleCoreBattleResumeAfter']&&(this[_0xba987b(0x970)]=!![],BattleManager[_0xba987b(0x343)]=undefined);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x7ad)]=Scene_Map[_0x16b2b1(0x1ca)]['initialize'],Scene_Map[_0x16b2b1(0x1ca)][_0x16b2b1(0x77d)]=function(){const _0x4f9332=_0x16b2b1;VisuMZ[_0x4f9332(0x4da)]['Scene_Map_initialize'][_0x4f9332(0x357)](this),$gameTemp[_0x4f9332(0x5a7)]();},VisuMZ[_0x16b2b1(0x4da)]['Scene_ItemBase_applyItem']=Scene_ItemBase[_0x16b2b1(0x1ca)]['applyItem'],Scene_ItemBase[_0x16b2b1(0x1ca)][_0x16b2b1(0x499)]=function(){const _0x554ba3=_0x16b2b1;VisuMZ[_0x554ba3(0x4da)][_0x554ba3(0x399)][_0x554ba3(0x357)](this),this[_0x554ba3(0x3e3)]()[_0x554ba3(0x50c)]['match'](/<CUSTOM ACTION SEQUENCE>/i)&&($gameTemp[_0x554ba3(0x53f)]=[]),DataManager['checkAutoCustomActionSequenceNotetagEffect'](this[_0x554ba3(0x3e3)]())&&($gameTemp['_commonEventQueue']=[]);},VisuMZ[_0x16b2b1(0x4da)]['Scene_Options_maxCommands']=Scene_Options[_0x16b2b1(0x1ca)]['maxCommands'],Scene_Options[_0x16b2b1(0x1ca)][_0x16b2b1(0x7cb)]=function(){const _0x201ae2=_0x16b2b1;let _0x3a9c94=VisuMZ[_0x201ae2(0x4da)][_0x201ae2(0x934)][_0x201ae2(0x357)](this);const _0x81e72b=VisuMZ['BattleCore'][_0x201ae2(0x6ac)];if(_0x81e72b['AutoBattle'][_0x201ae2(0x57c)]&&_0x81e72b[_0x201ae2(0x352)][_0x201ae2(0x208)])_0x3a9c94+=0x2;if(_0x81e72b['HpGauge'][_0x201ae2(0x57c)]&&_0x81e72b[_0x201ae2(0x573)][_0x201ae2(0x208)])_0x3a9c94+=0x1;return _0x3a9c94;},VisuMZ['BattleCore'][_0x16b2b1(0x25d)]=Scene_Battle['prototype'][_0x16b2b1(0x63b)],Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x63b)]=function(){const _0xe95d4b=_0x16b2b1;SceneManager['isPreviousSceneBattleTransitionable']()?(Scene_Message[_0xe95d4b(0x1ca)][_0xe95d4b(0x63b)][_0xe95d4b(0x357)](this),this[_0xe95d4b(0x7d7)]&&this['_spriteset'][_0xe95d4b(0x541)](),BattleManager[_0xe95d4b(0x812)]&&BattleManager[_0xe95d4b(0x81d)]()):VisuMZ[_0xe95d4b(0x4da)][_0xe95d4b(0x25d)][_0xe95d4b(0x357)](this);},VisuMZ[_0x16b2b1(0x4da)]['Scene_Battle_stop']=Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x5f6)],Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x5f6)]=function(){const _0x184d8c=_0x16b2b1;SceneManager[_0x184d8c(0x56b)]()?Scene_Message['prototype'][_0x184d8c(0x5f6)][_0x184d8c(0x357)](this):VisuMZ['BattleCore'][_0x184d8c(0x7e3)][_0x184d8c(0x357)](this);},VisuMZ['BattleCore'][_0x16b2b1(0x805)]=Scene_Battle['prototype']['terminate'],Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x782)]=function(){const _0x394a0e=_0x16b2b1;SceneManager['isNextSceneBattleTransitionable']()?Scene_Message['prototype'][_0x394a0e(0x782)][_0x394a0e(0x357)](this):VisuMZ[_0x394a0e(0x4da)][_0x394a0e(0x805)][_0x394a0e(0x357)](this);},Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x206)]=function(){const _0x30e1a0=_0x16b2b1;if(ConfigManager[_0x30e1a0(0x2e4)]&&ConfigManager[_0x30e1a0(0x800)]!==undefined)return ConfigManager[_0x30e1a0(0x800)];else{if(this[_0x30e1a0(0x860)]()===_0x30e1a0(0x369))return![];else{return Scene_Message[_0x30e1a0(0x1ca)][_0x30e1a0(0x206)]['call'](this);;}}},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x953)]=Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x60f)],Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x60f)]=function(){const _0x520788=_0x16b2b1;this[_0x520788(0x425)](),VisuMZ[_0x520788(0x4da)][_0x520788(0x953)][_0x520788(0x357)](this),this[_0x520788(0x610)]();},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x569)]=Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x543)],Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x543)]=function(){const _0x4e2e25=_0x16b2b1;VisuMZ[_0x4e2e25(0x4da)]['Scene_Battle_createCancelButton']['call'](this),this[_0x4e2e25(0x860)]()===_0x4e2e25(0x369)&&this['repositionCancelButtonBorderStyle']();},Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x67e)]=function(_0x9b5a1e){const _0x3556f6=_0x16b2b1;_0x9b5a1e?(this[_0x3556f6(0x8ea)]['x']=(Graphics['width']-Graphics['boxWidth'])/0x2,this['_windowLayer']['y']=(Graphics[_0x3556f6(0x86c)]-Graphics[_0x3556f6(0x582)])/0x2):(this['_windowLayer']['x']=Graphics[_0x3556f6(0x20c)]*0xa,this[_0x3556f6(0x8ea)]['y']=Graphics['height']*0xa);},VisuMZ[_0x16b2b1(0x4da)]['Scene_Battle_selectNextCommand']=Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x3ba)],Scene_Battle['prototype'][_0x16b2b1(0x3ba)]=function(){const _0x56e6a5=_0x16b2b1,_0xea1be3=BattleManager[_0x56e6a5(0x755)]();VisuMZ[_0x56e6a5(0x4da)][_0x56e6a5(0x506)][_0x56e6a5(0x357)](this);if(_0xea1be3){if(_0xea1be3===BattleManager[_0x56e6a5(0x755)]())return;if(_0xea1be3===BattleManager[_0x56e6a5(0x8ff)])return;if(_0xea1be3['battler']())_0xea1be3[_0x56e6a5(0x4e0)]()[_0x56e6a5(0x419)]();}},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x203)]=Scene_Battle['prototype'][_0x16b2b1(0x790)],Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x790)]=function(){const _0x5ba09d=_0x16b2b1,_0x34d630=BattleManager['actor']();if(_0x34d630&&_0x34d630[_0x5ba09d(0x4e0)])_0x34d630[_0x5ba09d(0x4e0)]()[_0x5ba09d(0x419)]();VisuMZ[_0x5ba09d(0x4da)][_0x5ba09d(0x203)]['call'](this);},VisuMZ['BattleCore'][_0x16b2b1(0x772)]=Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x6ee)],Scene_Battle['prototype']['logWindowRect']=function(){const _0x2db99c=_0x16b2b1;if(VisuMZ[_0x2db99c(0x4da)][_0x2db99c(0x6ac)]['BattleLog'][_0x2db99c(0x5d5)])return VisuMZ['BattleCore']['Settings'][_0x2db99c(0x458)]['BattleLogRectJS'][_0x2db99c(0x357)](this);return VisuMZ[_0x2db99c(0x4da)][_0x2db99c(0x772)][_0x2db99c(0x357)](this);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x722)]=Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x922)],Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x922)]=function(){const _0x40e3bd=_0x16b2b1;VisuMZ[_0x40e3bd(0x4da)][_0x40e3bd(0x722)][_0x40e3bd(0x357)](this),this[_0x40e3bd(0x74e)]();},Scene_Battle[_0x16b2b1(0x1ca)]['createPartyCommandWindowBattleCore']=function(){const _0x5ceb73=_0x16b2b1,_0x109941=this['_partyCommandWindow'];_0x109941[_0x5ceb73(0x78b)](_0x5ceb73(0x787),this[_0x5ceb73(0x47f)][_0x5ceb73(0x7aa)](this)),_0x109941['setHandler'](_0x5ceb73(0x3a7),this['commandOptions'][_0x5ceb73(0x7aa)](this));const _0x96c5b2=this[_0x5ceb73(0x860)]();switch(_0x96c5b2){case'xp':case _0x5ceb73(0x89b):return this[_0x5ceb73(0x38e)]['setBackgroundType'](0x1);break;}},Scene_Battle['prototype'][_0x16b2b1(0x47f)]=function(){const _0x249b77=_0x16b2b1;BattleManager['_autoBattle']=!![],$gameParty[_0x249b77(0x3f1)](),this[_0x249b77(0x3ba)](),BattleManager[_0x249b77(0x1fc)]()&&(BattleManager['_inputting']=![]);},Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x227)]=function(){const _0x5a554a=_0x16b2b1;this[_0x5a554a(0x87c)]()?(this['_callSceneOptions']=!![],this[_0x5a554a(0x629)]['push'](_0x5a554a(0x3dc),VisuMZ['BattleCore'][_0x5a554a(0x6ac)][_0x5a554a(0x47a)][_0x5a554a(0x882)])):this[_0x5a554a(0x6f7)]();},Scene_Battle[_0x16b2b1(0x1ca)]['isQueueOptionsMenu']=function(){const _0x319ce2=_0x16b2b1;return BattleManager[_0x319ce2(0x447)]();},Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x6f7)]=function(){const _0x483765=_0x16b2b1;this['_callSceneOptions']=![],this[_0x483765(0x7d7)][_0x483765(0x541)](),this[_0x483765(0x8ea)][_0x483765(0x21f)]=![];if(BattleManager[_0x483765(0x6ca)]())($dataSystem['battleback1Name']||$dataSystem['battleback2Name'])&&SceneManager[_0x483765(0x469)]();else($gameMap[_0x483765(0x249)]()||$gameMap['battleback2Name']())&&SceneManager[_0x483765(0x469)]();SceneManager['push'](Scene_Options),BattleManager[_0x483765(0x1fc)]()&&(BattleManager[_0x483765(0x812)]=BattleManager['actor']());},VisuMZ['BattleCore'][_0x16b2b1(0x8db)]=Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x33c)],Scene_Battle['prototype'][_0x16b2b1(0x33c)]=function(){const _0x567cbf=_0x16b2b1;VisuMZ[_0x567cbf(0x4da)][_0x567cbf(0x8db)][_0x567cbf(0x357)](this);if(this[_0x567cbf(0x84b)]&&!BattleManager[_0x567cbf(0x8ff)])this[_0x567cbf(0x6f7)]();},Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x610)]=function(){const _0x26b8f9=_0x16b2b1,_0x4f48e9=this[_0x26b8f9(0x4d6)]();this[_0x26b8f9(0x841)]=new Window_AutoBattleCancel(_0x4f48e9),this[_0x26b8f9(0x841)]['hide'](),this['addChild'](this[_0x26b8f9(0x841)]);},Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x4d6)]=function(){const _0xd71c45=_0x16b2b1;return VisuMZ[_0xd71c45(0x4da)][_0xd71c45(0x6ac)]['AutoBattle'][_0xd71c45(0x50b)][_0xd71c45(0x357)](this);},Scene_Battle['prototype'][_0x16b2b1(0x390)]=function(){const _0xde4d8d=_0x16b2b1;return VisuMZ[_0xde4d8d(0x4da)][_0xde4d8d(0x6ac)][_0xde4d8d(0x47a)][_0xde4d8d(0x752)];},VisuMZ['BattleCore']['Scene_Battle_startPartyCommandSelection']=Scene_Battle[_0x16b2b1(0x1ca)]['startPartyCommandSelection'],Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x54b)]=function(){const _0x29a4a3=_0x16b2b1;this[_0x29a4a3(0x390)]()?this['onDisabledPartyCommandSelection']():VisuMZ['BattleCore'][_0x29a4a3(0x624)][_0x29a4a3(0x357)](this);},Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x238)]=function(){const _0x2b38aa=_0x16b2b1;if(BattleManager[_0x2b38aa(0x4f8)]())this[_0x2b38aa(0x3ba)]();else BattleManager[_0x2b38aa(0x1fc)]()&&VisuMZ['BattleCore'][_0x2b38aa(0x624)][_0x2b38aa(0x357)](this);},VisuMZ[_0x16b2b1(0x4da)]['Scene_Battle_commandFight']=Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x883)],Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x883)]=function(){const _0x4c994f=_0x16b2b1;BattleManager['isTpb']()?this[_0x4c994f(0x85f)]():VisuMZ[_0x4c994f(0x4da)][_0x4c994f(0x3df)][_0x4c994f(0x357)](this);},VisuMZ['BattleCore'][_0x16b2b1(0x3a2)]=Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x1e0)],Scene_Battle[_0x16b2b1(0x1ca)]['createActorCommandWindow']=function(){const _0x3dea19=_0x16b2b1;VisuMZ[_0x3dea19(0x4da)]['Scene_Battle_createActorCommandWindow']['call'](this),this[_0x3dea19(0x2b4)]();},Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x2b4)]=function(){const _0x3f4e76=_0x16b2b1,_0x24edc2=this[_0x3f4e76(0x811)];_0x24edc2[_0x3f4e76(0x78b)](_0x3f4e76(0x214),this[_0x3f4e76(0x41c)][_0x3f4e76(0x7aa)](this)),_0x24edc2['setHandler'](_0x3f4e76(0x787),this[_0x3f4e76(0x40e)]['bind'](this)),_0x24edc2[_0x3f4e76(0x78b)](_0x3f4e76(0x65d),this[_0x3f4e76(0x6de)][_0x3f4e76(0x7aa)](this)),BattleManager[_0x3f4e76(0x1fc)]()&&(this[_0x3f4e76(0x390)]()?delete _0x24edc2['_handlers']['cancel']:_0x24edc2[_0x3f4e76(0x78b)](_0x3f4e76(0x3a9),this[_0x3f4e76(0x820)][_0x3f4e76(0x7aa)](this)));},Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x41c)]=function(){const _0x1ff964=_0x16b2b1;this[_0x1ff964(0x5ef)]();},Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x40e)]=function(){const _0x205695=_0x16b2b1;BattleManager[_0x205695(0x755)]()[_0x205695(0x5ee)](),BattleManager['finishActorInput'](),BattleManager['selectNextActor'](),this['changeInputWindow']();},Scene_Battle['prototype'][_0x16b2b1(0x6de)]=function(){const _0x24b68f=_0x16b2b1,_0x3e40fc=BattleManager[_0x24b68f(0x891)]();_0x3e40fc[_0x24b68f(0x609)](this[_0x24b68f(0x811)]['currentExt']()),this['onSelectAction']();},Scene_Battle['prototype'][_0x16b2b1(0x820)]=function(){const _0xc020df=_0x16b2b1;this[_0xc020df(0x38e)][_0xc020df(0x85d)](),this['_actorCommandWindow'][_0xc020df(0x1b0)]();},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x52e)]=Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x52c)],Scene_Battle[_0x16b2b1(0x1ca)]['createHelpWindow']=function(){const _0x34a93f=_0x16b2b1;VisuMZ[_0x34a93f(0x4da)][_0x34a93f(0x52e)][_0x34a93f(0x357)](this),this[_0x34a93f(0x2ac)]();},Scene_Battle['prototype']['createHelpWindowBattleCore']=function(){const _0x2423ad=_0x16b2b1;this['_actorCommandWindow'][_0x2423ad(0x777)](this[_0x2423ad(0x8cd)]),this[_0x2423ad(0x38e)]['setHelpWindow'](this['_helpWindow']);},Scene_Battle['prototype'][_0x16b2b1(0x860)]=function(){const _0x4513b8=_0x16b2b1;if($gameTemp[_0x4513b8(0x75b)]!==undefined)return $gameTemp[_0x4513b8(0x75b)];if(this[_0x4513b8(0x391)])return this[_0x4513b8(0x391)];return this[_0x4513b8(0x391)]=VisuMZ[_0x4513b8(0x4da)][_0x4513b8(0x6ac)]['BattleLayout'][_0x4513b8(0x1fa)]['toLowerCase']()[_0x4513b8(0x7bc)](),this[_0x4513b8(0x391)]===_0x4513b8(0x467)&&!Imported[_0x4513b8(0x26d)]&&(this[_0x4513b8(0x391)]=_0x4513b8(0x1f9)),this[_0x4513b8(0x391)];},VisuMZ['BattleCore']['Scene_Battle_windowAreaHeight']=Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x862)],Scene_Battle[_0x16b2b1(0x1ca)]['windowAreaHeight']=function(){const _0x1e801d=_0x16b2b1,_0x41f2c1=this[_0x1e801d(0x860)]();switch(_0x41f2c1){case _0x1e801d(0x3c5):return this['calcWindowHeight'](Math[_0x1e801d(0x6fa)](0x1,$gameParty[_0x1e801d(0x579)]()),!![]);break;default:return VisuMZ[_0x1e801d(0x4da)][_0x1e801d(0x5c8)]['call'](this);break;}},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x904)]=Scene_Battle[_0x16b2b1(0x1ca)]['helpWindowRect'],Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x473)]=function(){const _0xc9a3c2=_0x16b2b1,_0x2627fd=this[_0xc9a3c2(0x860)]();switch(_0x2627fd){case _0xc9a3c2(0x369):return this['helpWindowRectBorderStyle']();break;case'default':case _0xc9a3c2(0x3c5):case'xp':case _0xc9a3c2(0x89b):default:return VisuMZ['BattleCore']['Scene_Battle_helpWindowRect'][_0xc9a3c2(0x357)](this);break;}},Scene_Battle['prototype']['statusWindowRect']=function(){const _0x1f83fe=_0x16b2b1,_0x9201be=this[_0x1f83fe(0x860)]();switch(_0x9201be){case'xp':case _0x1f83fe(0x89b):return this['statusWindowRectXPStyle']();break;case _0x1f83fe(0x369):return this[_0x1f83fe(0x414)]();break;case'default':case'list':default:return this[_0x1f83fe(0x96d)]();break;}},VisuMZ[_0x16b2b1(0x4da)]['Scene_Battle_partyCommandWindowRect']=Scene_Battle['prototype'][_0x16b2b1(0x398)],Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x398)]=function(){const _0x12c23c=_0x16b2b1,_0x587d14=this['battleLayoutStyle']();switch(_0x587d14){case'xp':case _0x12c23c(0x89b):return this[_0x12c23c(0x84a)]();break;case _0x12c23c(0x369):return this[_0x12c23c(0x8e7)]();case'default':case _0x12c23c(0x3c5):default:return this[_0x12c23c(0x1a2)]();break;}},Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x1a2)]=function(){const _0x1c4ba8=_0x16b2b1,_0x1d354e=VisuMZ[_0x1c4ba8(0x4da)]['Settings'][_0x1c4ba8(0x8ec)],_0x92b0a1=_0x1d354e[_0x1c4ba8(0x5ce)]||0xc0,_0x1274e9=this[_0x1c4ba8(0x862)](),_0x1e3d73=this[_0x1c4ba8(0x206)]()?Graphics[_0x1c4ba8(0x2af)]-_0x92b0a1:0x0,_0x178607=Graphics['boxHeight']-_0x1274e9;return new Rectangle(_0x1e3d73,_0x178607,_0x92b0a1,_0x1274e9);},Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x18b)]=function(){const _0x40a6ab=_0x16b2b1;return this[_0x40a6ab(0x398)]();},VisuMZ['BattleCore'][_0x16b2b1(0x193)]=Scene_Battle[_0x16b2b1(0x1ca)]['updateStatusWindowPosition'],Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x40a)]=function(){const _0x5ad50a=_0x16b2b1,_0x3080d4=this['battleLayoutStyle']();switch(_0x3080d4){case'xp':case _0x5ad50a(0x89b):case _0x5ad50a(0x369):break;case'default':case'list':default:VisuMZ['BattleCore']['Scene_Battle_updateStatusWindowPosition'][_0x5ad50a(0x357)](this);break;}},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x577)]=Scene_Battle['prototype'][_0x16b2b1(0x53d)],Scene_Battle[_0x16b2b1(0x1ca)]['startActorSelection']=function(){const _0x40c7ad=_0x16b2b1;VisuMZ['BattleCore']['Scene_Battle_startActorSelection'][_0x40c7ad(0x357)](this),this[_0x40c7ad(0x1b4)]();},VisuMZ['BattleCore'][_0x16b2b1(0x549)]=Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x7e5)],Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x7e5)]=function(){const _0x2e4f89=_0x16b2b1;VisuMZ[_0x2e4f89(0x4da)][_0x2e4f89(0x549)][_0x2e4f89(0x357)](this),this[_0x2e4f89(0x364)][_0x2e4f89(0x90f)](),this[_0x2e4f89(0x1b4)]();},Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x1b4)]=function(){const _0x11d844=_0x16b2b1,_0x833090=this[_0x11d844(0x860)]();['xp',_0x11d844(0x89b),_0x11d844(0x369)][_0x11d844(0x3e4)](_0x833090)&&this[_0x11d844(0x811)][_0x11d844(0x1b0)](),(_0x833090===_0x11d844(0x369)||this[_0x11d844(0x323)]())&&(this[_0x11d844(0x701)][_0x11d844(0x1b0)](),this[_0x11d844(0x197)]['close']());},VisuMZ[_0x16b2b1(0x4da)]['Scene_Battle_onActorOk']=Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x87d)],Scene_Battle[_0x16b2b1(0x1ca)]['onActorOk']=function(){const _0x2be4ab=_0x16b2b1;VisuMZ[_0x2be4ab(0x4da)]['Scene_Battle_onActorOk'][_0x2be4ab(0x357)](this),this['okTargetSelectionVisibility']();},Scene_Battle[_0x16b2b1(0x1ca)]['isNonSubmenuCancel']=function(){const _0x5574c0=_0x16b2b1;return[_0x5574c0(0x63c),_0x5574c0(0x483),_0x5574c0(0x65d)][_0x5574c0(0x3e4)](this[_0x5574c0(0x811)][_0x5574c0(0x676)]());},VisuMZ['BattleCore'][_0x16b2b1(0x5ca)]=Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x740)],Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x740)]=function(){const _0x49fc78=_0x16b2b1;this['isNonSubmenuCancel']()?(this[_0x49fc78(0x7a4)][_0x49fc78(0x972)](),this['_actorWindow']['hide'](),this[_0x49fc78(0x811)][_0x49fc78(0x8ad)]()):VisuMZ[_0x49fc78(0x4da)][_0x49fc78(0x5ca)]['call'](this),this['cancelTargetSelectionVisibility']();},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x736)]=Scene_Battle[_0x16b2b1(0x1ca)]['onEnemyOk'],Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x405)]=function(){const _0x486124=_0x16b2b1;VisuMZ[_0x486124(0x4da)][_0x486124(0x736)][_0x486124(0x357)](this),this[_0x486124(0x2f6)]();},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x3c4)]=Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x37e)],Scene_Battle['prototype'][_0x16b2b1(0x37e)]=function(){const _0x38212d=_0x16b2b1;this[_0x38212d(0x392)]()?(this[_0x38212d(0x7a4)][_0x38212d(0x972)](),this[_0x38212d(0x364)][_0x38212d(0x1e6)](),this[_0x38212d(0x811)][_0x38212d(0x8ad)]()):VisuMZ[_0x38212d(0x4da)][_0x38212d(0x3c4)][_0x38212d(0x357)](this),this[_0x38212d(0x563)]();},Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x2f6)]=function(){const _0x1592c6=_0x16b2b1,_0x4d495b=this[_0x1592c6(0x860)]();(_0x4d495b===_0x1592c6(0x369)||this[_0x1592c6(0x323)]())&&(this[_0x1592c6(0x701)][_0x1592c6(0x2f7)](),this[_0x1592c6(0x701)][_0x1592c6(0x839)]&&this['_skillWindow'][_0x1592c6(0x972)](),this[_0x1592c6(0x197)][_0x1592c6(0x2f7)](),this[_0x1592c6(0x197)][_0x1592c6(0x839)]&&this[_0x1592c6(0x197)][_0x1592c6(0x972)]());},Scene_Battle[_0x16b2b1(0x1ca)]['cancelTargetSelectionVisibility']=function(){const _0xca9184=_0x16b2b1,_0x1b31ee=this[_0xca9184(0x860)]();['xp',_0xca9184(0x89b),_0xca9184(0x369)]['includes'](_0x1b31ee)&&this[_0xca9184(0x811)]['open'](),this[_0xca9184(0x2f6)]();},Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x96d)]=function(){const _0x5aee25=_0x16b2b1,_0x3e2343=VisuMZ[_0x5aee25(0x4da)][_0x5aee25(0x6ac)][_0x5aee25(0x8ec)],_0x196473=Window_BattleStatus[_0x5aee25(0x1ca)][_0x5aee25(0x7b1)](),_0x48ce6f=Graphics['boxWidth']-(_0x3e2343['CommandWidth']||0xc0),_0x298468=this[_0x5aee25(0x862)]()+_0x196473,_0x147d94=this['isRightInputMode']()?0x0:Graphics[_0x5aee25(0x2af)]-_0x48ce6f,_0x4f50b8=Graphics['boxHeight']-_0x298468+_0x196473;return new Rectangle(_0x147d94,_0x4f50b8,_0x48ce6f,_0x298468);},Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x4ff)]=function(){const _0x2236fc=_0x16b2b1,_0xd4e374=Window_BattleStatus[_0x2236fc(0x1ca)][_0x2236fc(0x7b1)](),_0x2901d7=Graphics[_0x2236fc(0x2af)],_0x167b70=this[_0x2236fc(0x862)]()+_0xd4e374,_0x258607=0x0,_0x3b9a67=Graphics[_0x2236fc(0x582)]-_0x167b70+_0xd4e374;return new Rectangle(_0x258607,_0x3b9a67,_0x2901d7,_0x167b70);},Scene_Battle[_0x16b2b1(0x1ca)]['partyCommandWindowRectXPStyle']=function(){const _0x313d45=_0x16b2b1,_0x40c920=Graphics['boxWidth']/0x2,_0x3f69fb=this[_0x313d45(0x61e)](VisuMZ[_0x313d45(0x4da)][_0x313d45(0x6ac)][_0x313d45(0x8ec)][_0x313d45(0x28f)],!![]),_0x4bded1=Math[_0x313d45(0x855)]((Graphics[_0x313d45(0x2af)]-_0x40c920)/0x2),_0x1dd889=Graphics[_0x313d45(0x582)]-_0x3f69fb-this['statusWindowRectXPStyle']()[_0x313d45(0x86c)];return new Rectangle(_0x4bded1,_0x1dd889,_0x40c920,_0x3f69fb);},Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x356)]=function(){const _0x3ab9a3=_0x16b2b1,_0x55f018=Graphics[_0x3ab9a3(0x20c)],_0x135a06=Math[_0x3ab9a3(0x855)]((Graphics[_0x3ab9a3(0x2af)]-_0x55f018)/0x2),_0x4eec63=this[_0x3ab9a3(0x515)](),_0x419258=(Graphics[_0x3ab9a3(0x86c)]-Graphics['boxHeight'])/-0x2;return new Rectangle(_0x135a06,_0x419258,_0x55f018,_0x4eec63);},Scene_Battle[_0x16b2b1(0x1ca)]['statusWindowRectBorderStyle']=function(){const _0x1ad0a2=_0x16b2b1,_0x444029=Graphics[_0x1ad0a2(0x20c)],_0x176086=Math[_0x1ad0a2(0x855)]((Graphics[_0x1ad0a2(0x2af)]-_0x444029)/0x2),_0x1969c2=this[_0x1ad0a2(0x61e)](0x4,!![]),_0x31f65b=Graphics[_0x1ad0a2(0x582)]-_0x1969c2+(Graphics['height']-Graphics[_0x1ad0a2(0x582)])/0x2;return new Rectangle(_0x176086,_0x31f65b,_0x444029,_0x1969c2);},Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x8e7)]=function(){const _0x20e5bf=_0x16b2b1,_0x2154f1=Math[_0x20e5bf(0x3db)](Graphics[_0x20e5bf(0x20c)]/0x3),_0x3e7d97=this['isRightInputMode']()?(Graphics[_0x20e5bf(0x20c)]+Graphics['boxWidth'])/0x2-_0x2154f1:(Graphics[_0x20e5bf(0x20c)]-Graphics[_0x20e5bf(0x2af)])/-0x2,_0x209bc8=this[_0x20e5bf(0x356)](),_0x403343=_0x209bc8['y']+_0x209bc8[_0x20e5bf(0x86c)],_0x5bde1b=this[_0x20e5bf(0x414)](),_0x461412=_0x5bde1b['y']-_0x403343;return new Rectangle(_0x3e7d97,_0x403343,_0x2154f1,_0x461412);},Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x351)]=function(){const _0x310fd5=_0x16b2b1,_0x393af6=Math[_0x310fd5(0x7ba)](Graphics[_0x310fd5(0x20c)]/0x3),_0x5b6a4c=Math[_0x310fd5(0x855)]((Graphics[_0x310fd5(0x2af)]-_0x393af6)/0x2),_0x5b7e6c=this[_0x310fd5(0x8e7)](),_0x409d00=_0x5b7e6c['y'],_0xb0a867=_0x5b7e6c[_0x310fd5(0x86c)];return new Rectangle(_0x5b6a4c,_0x409d00,_0x393af6,_0xb0a867);},Scene_Battle['prototype']['repositionCancelButtonBorderStyle']=function(){const _0x5d45c8=_0x16b2b1;this[_0x5d45c8(0x66d)]['y']=this[_0x5d45c8(0x8cd)]['y']+this[_0x5d45c8(0x8cd)][_0x5d45c8(0x86c)],this[_0x5d45c8(0x206)]()?this[_0x5d45c8(0x860)]()==='border'?this['_cancelButton']['x']=0x8:this[_0x5d45c8(0x66d)]['x']=-this[_0x5d45c8(0x66d)][_0x5d45c8(0x20c)]-0x4:this[_0x5d45c8(0x66d)]['x']=Graphics[_0x5d45c8(0x20c)]-(Graphics['width']-Graphics[_0x5d45c8(0x2af)])/0x2-this[_0x5d45c8(0x66d)][_0x5d45c8(0x20c)]-0x4;},VisuMZ['BattleCore']['Scene_Battle_skillWindowRect']=Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x38d)],Scene_Battle[_0x16b2b1(0x1ca)]['skillWindowRect']=function(){const _0x2ec55a=_0x16b2b1;if(this[_0x2ec55a(0x860)]()===_0x2ec55a(0x369))return this[_0x2ec55a(0x351)]();else return this[_0x2ec55a(0x323)]()?this['skillItemWindowRectMiddle']():VisuMZ[_0x2ec55a(0x4da)][_0x2ec55a(0x2e6)]['call'](this);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x485)]=Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x20b)],Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x20b)]=function(){const _0x3bd803=_0x16b2b1;if(this[_0x3bd803(0x860)]()===_0x3bd803(0x369))return this[_0x3bd803(0x351)]();else return this['isSkillItemWindowsMiddle']()?this[_0x3bd803(0x229)]():VisuMZ[_0x3bd803(0x4da)][_0x3bd803(0x485)]['call'](this);},Scene_Battle[_0x16b2b1(0x1ca)]['isSkillItemWindowsMiddle']=function(){const _0x50881c=_0x16b2b1;return VisuMZ[_0x50881c(0x4da)][_0x50881c(0x6ac)][_0x50881c(0x8ec)][_0x50881c(0x1d1)];},Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x229)]=function(){const _0x46a992=_0x16b2b1,_0x4d391d=Sprite_Button[_0x46a992(0x1ca)][_0x46a992(0x2e2)]()*0x2+0x4;let _0x3c8cad=Graphics['boxWidth']-_0x4d391d;Imported[_0x46a992(0x64f)]&&SceneManager[_0x46a992(0x34e)]()&&(_0x3c8cad+=_0x4d391d);const _0xd113c5=this[_0x46a992(0x21c)](),_0x4312d9=Graphics[_0x46a992(0x582)]-_0xd113c5-this[_0x46a992(0x84d)]()[_0x46a992(0x86c)]+Window_BattleStatus[_0x46a992(0x1ca)][_0x46a992(0x7b1)](),_0x1dde69=0x0;return new Rectangle(_0x1dde69,_0xd113c5,_0x3c8cad,_0x4312d9);},Scene_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x425)]=function(){const _0x330311=_0x16b2b1;if(!VisuMZ[_0x330311(0x4da)][_0x330311(0x6ac)][_0x330311(0x706)][_0x330311(0x1e8)])return;this[_0x330311(0x954)]=new Sprite(),this['_enemyNameContainer']['x']=this[_0x330311(0x8ea)]['x'],this[_0x330311(0x954)]['y']=this[_0x330311(0x8ea)]['y'];const _0x5d280d=this[_0x330311(0x57a)]['indexOf'](this[_0x330311(0x8ea)]);this[_0x330311(0x76c)](this[_0x330311(0x954)],_0x5d280d);for(let _0x3b4464=0x0;_0x3b4464<0x8;_0x3b4464++){const _0x5d9b24=new Window_EnemyName(_0x3b4464);this[_0x330311(0x954)]['addChild'](_0x5d9b24);}},Sprite_Battler[_0x16b2b1(0x436)]=VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x6ac)]['Actor'][_0x16b2b1(0x38a)],VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x428)]=Sprite_Battler['prototype'][_0x16b2b1(0x5af)],Sprite_Battler[_0x16b2b1(0x1ca)]['initMembers']=function(){const _0x24264c=_0x16b2b1;VisuMZ[_0x24264c(0x4da)][_0x24264c(0x428)]['call'](this),this[_0x24264c(0x8da)]();if(this['constructor']===Sprite_Enemy)this[_0x24264c(0x975)]();this[_0x24264c(0x93b)]();},Sprite_Battler['prototype'][_0x16b2b1(0x8da)]=function(){const _0x177e33=_0x16b2b1;this[_0x177e33(0x5f5)]=0x0,this['_baseY']=0x0,this[_0x177e33(0x8b4)]=0x0,this[_0x177e33(0x309)]=0x0,this[_0x177e33(0x739)]=0x0,this[_0x177e33(0x5bf)]=0x0,this[_0x177e33(0x726)]=_0x177e33(0x1ed),this[_0x177e33(0x7fe)]=0x0,this[_0x177e33(0x2e3)]=0x0,this[_0x177e33(0x39f)]=0x0,this['_jumpWholeDuration']=0x0,this[_0x177e33(0x453)]=0xff,this['_opacityDuration']=0x0,this[_0x177e33(0x8bd)]=0x0,this['_opacityEasing']=_0x177e33(0x1ed),this[_0x177e33(0x826)]=0x0,this['_targetAngle']=0x0,this[_0x177e33(0x649)]=0x0,this[_0x177e33(0x4a6)]=0x0,this['_angleEasing']='Linear',this[_0x177e33(0x35a)]=!![],this[_0x177e33(0x82a)]=0x0,this[_0x177e33(0x5cf)]=0x0,this['_targetSkewX']=0x0,this[_0x177e33(0x968)]=0x0,this[_0x177e33(0x4d0)]=0x0,this[_0x177e33(0x20a)]=0x0,this[_0x177e33(0x1f5)]=_0x177e33(0x1ed),this[_0x177e33(0x337)]=0x1,this[_0x177e33(0x54a)]=0x1,this[_0x177e33(0x378)]=0x1,this['_targetGrowY']=0x1,this[_0x177e33(0x7a8)]=0x0,this['_growWholeDuration']=0x0,this[_0x177e33(0x949)]='Linear',this[_0x177e33(0x7b2)]=0x1;},Sprite_Battler[_0x16b2b1(0x1ca)]['createShadowSprite']=function(){const _0x256df3=_0x16b2b1;this[_0x256df3(0x556)]=new Sprite(),this[_0x256df3(0x556)][_0x256df3(0x4ee)]=ImageManager[_0x256df3(0x5c6)]('Shadow2'),this['_shadowSprite'][_0x256df3(0x4ee)]['smooth']=VisuMZ[_0x256df3(0x4da)][_0x256df3(0x6ac)]['Actor'][_0x256df3(0x838)],this['_shadowSprite'][_0x256df3(0x6f0)]['x']=0.5,this[_0x256df3(0x556)][_0x256df3(0x6f0)]['y']=0.5,this[_0x256df3(0x556)]['y']=-0x2,this['_shadowSprite'][_0x256df3(0x21f)]=![],this['addChild'](this[_0x256df3(0x556)]);},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x93b)]=function(){const _0x5b3c14=_0x16b2b1;this[_0x5b3c14(0x5b3)]=new Sprite(),this[_0x5b3c14(0x5b3)]['anchor']['x']=0.5,this[_0x5b3c14(0x5b3)]['anchor']['y']=0.5,this[_0x5b3c14(0x7d4)](this[_0x5b3c14(0x5b3)]);},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x550)]=function(){const _0x56b496=_0x16b2b1;if(!this[_0x56b496(0x5b3)])return;if(this[_0x56b496(0x556)]){const _0x30f5c2=this[_0x56b496(0x749)](this[_0x56b496(0x5b3)]);this['addChildAt'](this[_0x56b496(0x556)],_0x30f5c2),this[_0x56b496(0x3dd)]();}this['_svBattlerSprite']&&this[_0x56b496(0x5b3)]['addChild'](this['_svBattlerSprite']),this[_0x56b496(0x264)]&&this[_0x56b496(0x5b3)][_0x56b496(0x7d4)](this[_0x56b496(0x264)]),this[_0x56b496(0x62c)]&&this[_0x56b496(0x5b3)]['addChild'](this[_0x56b496(0x62c)]),this['_dragonbonesSpriteContainer']&&this['_distortionSprite'][_0x56b496(0x7d4)](this[_0x56b496(0x1a9)]);},Sprite_Battler['prototype'][_0x16b2b1(0x3dd)]=function(){const _0x1a2e14=_0x16b2b1;if(!this[_0x1a2e14(0x556)])return;if(this[_0x1a2e14(0x4e9)]&&this[_0x1a2e14(0x4e9)][_0x1a2e14(0x533)]()){const _0x55a3a6=this[_0x1a2e14(0x556)][_0x1a2e14(0x4ee)];this[_0x1a2e14(0x556)][_0x1a2e14(0x77e)](0x0,0x0,_0x55a3a6[_0x1a2e14(0x20c)],_0x55a3a6[_0x1a2e14(0x86c)]);}else this[_0x1a2e14(0x556)][_0x1a2e14(0x77e)](0x0,0x0,0x0,0x0);},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x92c)]=function(){const _0x4cd6fa=_0x16b2b1;return SceneManager[_0x4cd6fa(0x7ed)]()?SceneManager[_0x4cd6fa(0x6b0)][_0x4cd6fa(0x7d7)][_0x4cd6fa(0x55a)]:this['parent'];},Sprite_Battler['prototype'][_0x16b2b1(0x79e)]=function(_0x262907,_0x14ce65){const _0x499f92=_0x16b2b1;if(!this['_battler'][_0x499f92(0x296)]())return;const _0x76e9fe=VisuMZ[_0x499f92(0x4da)][_0x499f92(0x6ac)][_0x499f92(0x5a4)],_0x12e152=new Sprite_Damage();_0x12e152[_0x499f92(0x92e)]=_0x76e9fe[_0x499f92(0x3c7)],this[_0x499f92(0x4cd)](_0x12e152),_0x12e152[_0x499f92(0x79e)](_0x262907,_0x14ce65),this['addDamageSprite'](_0x12e152);},Sprite_Battler['prototype'][_0x16b2b1(0x91c)]=function(_0x24546d,_0x70166c,_0x5617ec){const _0x8e95e7=_0x16b2b1;if(!this['_battler'][_0x8e95e7(0x296)]())return;const _0x14f7a7=VisuMZ[_0x8e95e7(0x4da)]['Settings'][_0x8e95e7(0x5a4)],_0x480069=new Sprite_Damage();_0x480069[_0x8e95e7(0x92e)]=_0x14f7a7[_0x8e95e7(0x3c7)],this[_0x8e95e7(0x4cd)](_0x480069),_0x480069[_0x8e95e7(0x91c)](_0x24546d,_0x70166c,_0x5617ec),this[_0x8e95e7(0x31e)](_0x480069);},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x650)]=function(){const _0x2bb910=_0x16b2b1;if(!this[_0x2bb910(0x4e9)][_0x2bb910(0x2b7)]())return;while(this['_battler'][_0x2bb910(0x2b7)]()){this[_0x2bb910(0x4e9)][_0x2bb910(0x296)]()&&this[_0x2bb910(0x71a)]();}this[_0x2bb910(0x4e9)][_0x2bb910(0x7d5)](),this[_0x2bb910(0x4e9)]['clearResult']();},Sprite_Battler['prototype'][_0x16b2b1(0x71a)]=function(){const _0x48a6c8=_0x16b2b1,_0x241a35=VisuMZ[_0x48a6c8(0x4da)][_0x48a6c8(0x6ac)][_0x48a6c8(0x5a4)],_0xd4c21=new Sprite_Damage();_0xd4c21[_0x48a6c8(0x92e)]=_0x241a35[_0x48a6c8(0x3c7)],this[_0x48a6c8(0x4cd)](_0xd4c21),_0xd4c21[_0x48a6c8(0x85d)](this[_0x48a6c8(0x4e9)]),_0xd4c21[_0x48a6c8(0x596)](this[_0x48a6c8(0x4e9)]),this[_0x48a6c8(0x31e)](_0xd4c21);},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x31e)]=function(_0x77af64){const _0x42889e=_0x16b2b1;this[_0x42889e(0x4ea)][_0x42889e(0x305)](_0x77af64);if(this[_0x42889e(0x312)]())SceneManager['_scene'][_0x42889e(0x7a4)][_0x42889e(0x31e)](_0x77af64,this[_0x42889e(0x4e9)]);else{this[_0x42889e(0x92c)]()[_0x42889e(0x7d4)](_0x77af64);if(SceneManager[_0x42889e(0x6fb)]())_0x77af64['scale']['x']=-0x1;}},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x312)]=function(){const _0x152618=_0x16b2b1;return!$gameSystem[_0x152618(0x5a0)]()&&this[_0x152618(0x4e9)]&&this[_0x152618(0x4e9)][_0x152618(0x68f)]();},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x4cd)]=function(_0x5e6b13){const _0x30871f=_0x16b2b1,_0x132f17=VisuMZ['BattleCore'][_0x30871f(0x6ac)]['Damage'],_0x3eff72=SceneManager[_0x30871f(0x6fb)]()?-0x1:0x1;let _0x11ab1f=this['x'],_0x58d82e=this['y'];const _0x252821=SceneManager[_0x30871f(0x6b0)][_0x30871f(0x7a4)];if(_0x252821&&this[_0x30871f(0x6f3)]===_0x252821){_0x11ab1f+=_0x252821['x']-this[_0x30871f(0x354)]();const _0x2d727d=_0x252821[_0x30871f(0x268)]()*0x3/0x4;_0x58d82e=_0x252821['y']+_0x2d727d,_0x58d82e=Math['min'](_0x58d82e,_0x252821['y']+this['y']-this[_0x30871f(0x86c)]+_0x2d727d);}_0x5e6b13['x']=Math[_0x30871f(0x855)](_0x11ab1f+this[_0x30871f(0x354)]()*_0x3eff72),_0x5e6b13['y']=Math[_0x30871f(0x855)](_0x58d82e+this[_0x30871f(0x242)]());if(_0x132f17['NewPopupBottom'])for(const _0x3542c3 of this[_0x30871f(0x4ea)]){_0x3542c3['x']+=_0x132f17[_0x30871f(0x1e2)]*_0x3eff72,_0x3542c3['y']+=_0x132f17[_0x30871f(0x583)];}else{const _0x20d5da=this['_damages'][this[_0x30871f(0x4ea)][_0x30871f(0x7d1)]-0x1];_0x20d5da&&(_0x5e6b13['x']=_0x20d5da['x']+_0x132f17['PopupShiftX']*_0x3eff72,_0x5e6b13['y']=_0x20d5da['y']+_0x132f17['PopupShiftY']);}},VisuMZ[_0x16b2b1(0x4da)]['Sprite_Battler_damageOffsetX']=Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x354)],Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x354)]=function(){const _0x4f57cb=_0x16b2b1;let _0x5b260c=VisuMZ[_0x4f57cb(0x4da)][_0x4f57cb(0x4fc)][_0x4f57cb(0x357)](this),_0x1949a6=VisuMZ[_0x4f57cb(0x4da)]['Settings'][_0x4f57cb(0x5a4)]['PopupOffsetX']||0x0;return Math[_0x4f57cb(0x855)](_0x5b260c+_0x1949a6);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x944)]=Sprite_Battler['prototype'][_0x16b2b1(0x242)],Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x242)]=function(){const _0x43e7c5=_0x16b2b1;let _0x39eab9=VisuMZ[_0x43e7c5(0x4da)][_0x43e7c5(0x944)][_0x43e7c5(0x357)](this);switch(VisuMZ[_0x43e7c5(0x4da)]['Settings'][_0x43e7c5(0x5a4)][_0x43e7c5(0x762)]){case _0x43e7c5(0x2eb):_0x39eab9-=this['height']*this[_0x43e7c5(0x6aa)]['y'];break;case _0x43e7c5(0x6bb):_0x39eab9-=this[_0x43e7c5(0x86c)]*this[_0x43e7c5(0x6aa)]['y']*0.5;break;}let _0x561a5b=VisuMZ[_0x43e7c5(0x4da)]['Settings'][_0x43e7c5(0x5a4)][_0x43e7c5(0x72c)]||0x0;return Math[_0x43e7c5(0x855)](_0x39eab9+_0x561a5b);},Sprite_Actor[_0x16b2b1(0x1ca)]['damageOffsetX']=function(){const _0x8300a2=_0x16b2b1;return Sprite_Battler[_0x8300a2(0x1ca)]['damageOffsetX']['call'](this);},Sprite_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x242)]=function(){const _0x3c1542=_0x16b2b1;return Sprite_Battler[_0x3c1542(0x1ca)][_0x3c1542(0x242)][_0x3c1542(0x357)](this);},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x377)]=function(_0x24d353){const _0x4e5084=_0x16b2b1;this[_0x4e5084(0x312)]()?SceneManager[_0x4e5084(0x6b0)][_0x4e5084(0x7a4)][_0x4e5084(0x44f)](_0x24d353):(this['damageContainer']()[_0x4e5084(0x524)](_0x24d353),this[_0x4e5084(0x4ea)]['remove'](_0x24d353),_0x24d353[_0x4e5084(0x30f)]());},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x3be)]=Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x692)],Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x692)]=function(_0x13db13,_0x4a9f19){const _0x7c4241=_0x16b2b1,_0x22b13c=VisuMZ['BattleCore'][_0x7c4241(0x6ac)];if(this[_0x7c4241(0x651)]===Sprite_Actor)_0x13db13+=_0x22b13c[_0x7c4241(0x435)][_0x7c4241(0x318)]||0x0,_0x4a9f19+=_0x22b13c[_0x7c4241(0x435)][_0x7c4241(0x555)]||0x0;else this['constructor']===Sprite_Enemy&&(_0x13db13+=_0x22b13c[_0x7c4241(0x706)][_0x7c4241(0x318)]||0x0,_0x4a9f19+=_0x22b13c[_0x7c4241(0x706)][_0x7c4241(0x555)]||0x0);VisuMZ[_0x7c4241(0x4da)][_0x7c4241(0x3be)][_0x7c4241(0x357)](this,_0x13db13,_0x4a9f19);},VisuMZ['BattleCore'][_0x16b2b1(0x902)]=Sprite_Battler['prototype'][_0x16b2b1(0x541)],Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x541)]=function(){const _0x2cd4b5=_0x16b2b1;VisuMZ[_0x2cd4b5(0x4da)][_0x2cd4b5(0x902)][_0x2cd4b5(0x357)](this),!this[_0x2cd4b5(0x4e9)]&&this[_0x2cd4b5(0x3bb)]&&(this['_hpGaugeSprite']['visible']=![]);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x614)]=Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x1c9)],Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x1c9)]=function(){const _0x5baab7=_0x16b2b1;this[_0x5baab7(0x83f)](),this[_0x5baab7(0x53a)](),this[_0x5baab7(0x52f)](),this[_0x5baab7(0x5f8)](),this['updateHpGaugePosition'](),VisuMZ[_0x5baab7(0x4da)][_0x5baab7(0x614)][_0x5baab7(0x357)](this);if(this[_0x5baab7(0x651)]===Sprite_Enemy)this[_0x5baab7(0x634)]();},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x567)]=Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x632)],Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x632)]=function(){const _0xbd2b07=_0x16b2b1;VisuMZ[_0xbd2b07(0x4da)]['Sprite_Battler_updatePosition'][_0xbd2b07(0x357)](this),this['updatePositionBattleCore'](),this['updateOpacity']();},Sprite_Battler['prototype']['updatePositionBattleCore']=function(){const _0x11618b=_0x16b2b1;this[_0x11618b(0x5f5)]=this['x'],this[_0x11618b(0x19e)]=this['y'],this[_0x11618b(0x666)](),this['updateJump'](),this['x']+=this[_0x11618b(0x3b0)](),this['y']+=this[_0x11618b(0x544)](),this['x']=Math[_0x11618b(0x855)](this['x']),this['y']=Math[_0x11618b(0x855)](this['y']);},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x3b0)]=function(){let _0x3a2d19=0x0;return _0x3a2d19;},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x544)]=function(){const _0x45c74c=_0x16b2b1;let _0x2dc45e=0x0;this[_0x45c74c(0x4e9)]&&!this[_0x45c74c(0x4e9)][_0x45c74c(0x4f1)]()&&(_0x2dc45e-=this['_floatHeight'],_0x2dc45e-=this['_jumpHeight']);if(this['_distortionSprite']&&this[_0x45c74c(0x651)]!==Sprite_SvEnemy){const _0x533db7=this[_0x45c74c(0x5b3)][_0x45c74c(0x6aa)]['y'];_0x2dc45e-=(_0x533db7-0x1)*this[_0x45c74c(0x86c)];}return _0x2dc45e;},Sprite_Battler['prototype'][_0x16b2b1(0x5f8)]=function(){const _0x7c3c52=_0x16b2b1,_0x3c1018=this[_0x7c3c52(0x4e9)]&&this[_0x7c3c52(0x4e9)][_0x7c3c52(0x950)]();this[_0x7c3c52(0x7b2)]=(_0x3c1018?-0x1:0x1)*Math['abs'](this[_0x7c3c52(0x6aa)]['x']);},Sprite_Battler[_0x16b2b1(0x1ca)]['startFloat']=function(_0x2e2412,_0x3f7ad9,_0x4335c7){const _0x4d1718=_0x16b2b1;if(!this[_0x4d1718(0x873)]())return;if(this['_targetFloatHeight']===_0x2e2412)return;this[_0x4d1718(0x309)]=_0x2e2412,this[_0x4d1718(0x739)]=_0x3f7ad9,this[_0x4d1718(0x5bf)]=_0x3f7ad9,this[_0x4d1718(0x726)]=_0x4335c7||'Linear';if(_0x3f7ad9<=0x0)this[_0x4d1718(0x8b4)]=_0x2e2412;},Sprite_Battler['prototype']['updateFloat']=function(){const _0x48ea66=_0x16b2b1;if(this[_0x48ea66(0x739)]<=0x0)return;const _0x30543b=this[_0x48ea66(0x739)],_0x1af03e=this[_0x48ea66(0x5bf)],_0x2b3b16=this[_0x48ea66(0x726)];Imported[_0x48ea66(0x64f)]?this[_0x48ea66(0x8b4)]=this[_0x48ea66(0x91b)](this[_0x48ea66(0x8b4)],this['_targetFloatHeight'],_0x30543b,_0x1af03e,_0x2b3b16):this[_0x48ea66(0x8b4)]=(this[_0x48ea66(0x8b4)]*(_0x30543b-0x1)+this[_0x48ea66(0x309)])/_0x30543b;this[_0x48ea66(0x739)]--;if(this[_0x48ea66(0x739)]<=0x0)this[_0x48ea66(0x3ec)]();},Sprite_Battler[_0x16b2b1(0x1ca)]['onFloatEnd']=function(){const _0x55a8c7=_0x16b2b1;this[_0x55a8c7(0x8b4)]=this[_0x55a8c7(0x309)];},Sprite_Battler['prototype']['isFloating']=function(){const _0x1cf033=_0x16b2b1;return this[_0x1cf033(0x739)]>0x0;},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x85b)]=function(_0x5500db,_0xfd8ac5){const _0x14338f=_0x16b2b1;if(!this['canMove']())return;if(_0xfd8ac5<=0x0)return;this[_0x14338f(0x2e3)]=_0x5500db,this[_0x14338f(0x39f)]=_0xfd8ac5,this[_0x14338f(0x24f)]=_0xfd8ac5;},Sprite_Battler['prototype'][_0x16b2b1(0x243)]=function(){const _0x4e54d5=_0x16b2b1;if(this['_jumpDuration']<=0x0)return;const _0x37c945=this['_jumpWholeDuration']-this[_0x4e54d5(0x39f)],_0x197a05=this[_0x4e54d5(0x24f)]/0x2,_0x554320=this[_0x4e54d5(0x2e3)],_0x17f465=-_0x554320/Math[_0x4e54d5(0x620)](_0x197a05,0x2);this[_0x4e54d5(0x7fe)]=_0x17f465*Math[_0x4e54d5(0x620)](_0x37c945-_0x197a05,0x2)+_0x554320,this[_0x4e54d5(0x39f)]--;if(this[_0x4e54d5(0x39f)]<=0x0)return this['onJumpEnd']();},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x529)]=function(){const _0x186adf=_0x16b2b1;this[_0x186adf(0x7fe)]=0x0;},Sprite_Battler[_0x16b2b1(0x1ca)]['isJumping']=function(){return this['_jumpDuration']>0x0;},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x6f5)]=function(_0x3c3b83,_0x178327,_0x4aa259){const _0x537d33=_0x16b2b1;if(this[_0x537d33(0x453)]===_0x3c3b83)return;this[_0x537d33(0x453)]=_0x3c3b83,this[_0x537d33(0x1c8)]=_0x178327,this[_0x537d33(0x8bd)]=_0x178327,this[_0x537d33(0x896)]=_0x4aa259||_0x537d33(0x1ed);if(_0x178327<=0x0)this[_0x537d33(0x548)]=_0x3c3b83;},Sprite_Battler[_0x16b2b1(0x1ca)]['updateOpacity']=function(){const _0x59ad9a=_0x16b2b1;if(this['_opacityDuration']<=0x0)return;const _0xe75d0e=this[_0x59ad9a(0x1c8)],_0x1b0063=this[_0x59ad9a(0x8bd)],_0x3cda44=this[_0x59ad9a(0x896)];Imported['VisuMZ_0_CoreEngine']?this['opacity']=this[_0x59ad9a(0x91b)](this[_0x59ad9a(0x548)],this['_targetOpacity'],_0xe75d0e,_0x1b0063,_0x3cda44):this['opacity']=(this[_0x59ad9a(0x548)]*(_0xe75d0e-0x1)+this['_targetOpacity'])/_0xe75d0e;this[_0x59ad9a(0x1c8)]--;if(this[_0x59ad9a(0x1c8)]<=0x0)this['onOpacityEnd']();},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x514)]=function(){const _0x3a7159=_0x16b2b1;this[_0x3a7159(0x548)]=this[_0x3a7159(0x453)];},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x652)]=function(){const _0x590418=_0x16b2b1;return this[_0x590418(0x1c8)]>0x0;},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x634)]=function(){const _0x76a917=_0x16b2b1;this[_0x76a917(0x556)][_0x76a917(0x21f)]=this['_battler'][_0x76a917(0x86f)](),this[_0x76a917(0x340)]();},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x340)]=function(){const _0x10f216=_0x16b2b1;if(!this[_0x10f216(0x556)])return;this[_0x10f216(0x556)]['y']=Math[_0x10f216(0x855)](-this[_0x10f216(0x544)]()-0x2);},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x94a)]=function(){const _0x17667a=_0x16b2b1;if(!this[_0x17667a(0x4e9)])return;this[_0x17667a(0x7c4)]=this[_0x17667a(0x4e9)][_0x17667a(0x611)]();},Game_BattlerBase[_0x16b2b1(0x1ca)][_0x16b2b1(0x611)]=function(){const _0x446407=_0x16b2b1,_0x34ee07=this[_0x446407(0x68f)]()?this[_0x446407(0x755)]():this[_0x446407(0x330)]();if(_0x34ee07){const _0x1d7139=_0x34ee07[_0x446407(0x50c)];if(_0x1d7139['match'](/<SIDEVIEW SHADOW SCALE:[ ](\d+)([%％])>/i))return Number(RegExp['$1'])*0.01;else{if(_0x1d7139[_0x446407(0x6ef)](/<SIDEVIEW SHADOW SCALE:[ ](.*)>/i))return Number(RegExp['$1'])||0x0;}}return 0x1;},Sprite_Battler['prototype'][_0x16b2b1(0x83f)]=function(){const _0x54c4b3=_0x16b2b1;if(this['constructor']===Sprite_SvEnemy)return;this[_0x54c4b3(0x8e8)](),this[_0x54c4b3(0x744)]();},Sprite_Battler['prototype'][_0x16b2b1(0x744)]=function(){const _0x2c7b15=_0x16b2b1,_0x2ae3b5=this[_0x2c7b15(0x5b3)];_0x2ae3b5&&(_0x2ae3b5[_0x2c7b15(0x6aa)]['x']=this[_0x2c7b15(0x780)](),_0x2ae3b5[_0x2c7b15(0x6aa)]['y']=this[_0x2c7b15(0x80d)]());},Sprite_Battler[_0x16b2b1(0x1ca)]['mainSpriteScaleX']=function(){const _0x25ef67=_0x16b2b1;let _0x34f49f=0x1;return _0x34f49f*=this[_0x25ef67(0x7b2)],_0x34f49f*=this[_0x25ef67(0x337)],_0x34f49f;},Sprite_Battler['prototype'][_0x16b2b1(0x80d)]=function(){return 0x1*this['_growY'];},Sprite_Battler['prototype'][_0x16b2b1(0x498)]=function(){const _0x2f1ab9=_0x16b2b1;return this[_0x2f1ab9(0x20c)]*this[_0x2f1ab9(0x780)]();},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x380)]=function(){const _0x7eaabc=_0x16b2b1;return this['height']*this[_0x7eaabc(0x80d)]();},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x931)]=function(_0x34ef63,_0x41f22d,_0x59062e,_0x1c6511){const _0x364030=_0x16b2b1;if(!this[_0x364030(0x873)]())return;if(!this['_distortionSprite'])return;if(this[_0x364030(0x378)]===_0x34ef63&&this['_targetGrowY']===_0x41f22d)return;this[_0x364030(0x378)]=_0x34ef63,this['_targetGrowY']=_0x41f22d,this[_0x364030(0x7a8)]=_0x59062e,this['_growWholeDuration']=_0x59062e,this['_growEasing']=_0x1c6511||_0x364030(0x1ed),_0x59062e<=0x0&&(this[_0x364030(0x337)]=this[_0x364030(0x378)],this[_0x364030(0x54a)]=this[_0x364030(0x8bf)]);},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x8e8)]=function(){const _0xa1b708=_0x16b2b1;if(this[_0xa1b708(0x7a8)]<=0x0)return;if(!this[_0xa1b708(0x5b3)])return;const _0xef608=this[_0xa1b708(0x7a8)],_0x1fe7f4=this[_0xa1b708(0x6a5)],_0x2b77d7=this[_0xa1b708(0x949)];Imported[_0xa1b708(0x64f)]?(this[_0xa1b708(0x337)]=this['applyEasing'](this[_0xa1b708(0x337)],this[_0xa1b708(0x378)],_0xef608,_0x1fe7f4,_0x2b77d7),this[_0xa1b708(0x54a)]=this['applyEasing'](this[_0xa1b708(0x54a)],this[_0xa1b708(0x8bf)],_0xef608,_0x1fe7f4,_0x2b77d7)):(this[_0xa1b708(0x337)]=(this[_0xa1b708(0x337)]*(_0xef608-0x1)+this[_0xa1b708(0x378)])/_0xef608,this[_0xa1b708(0x54a)]=(this[_0xa1b708(0x54a)]*(_0xef608-0x1)+this['_targetGrowY'])/_0xef608);this[_0xa1b708(0x7a8)]--;if(this['_growDuration']<=0x0)this[_0xa1b708(0x3a8)]();},Sprite_Battler[_0x16b2b1(0x1ca)]['onGrowEnd']=function(){const _0xb9b538=_0x16b2b1;this[_0xb9b538(0x337)]=this[_0xb9b538(0x378)],this[_0xb9b538(0x54a)]=this['_targetGrowY'];},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x7a7)]=function(){const _0x5dcd4b=_0x16b2b1;return this[_0x5dcd4b(0x7a8)]>0x0;},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x4b0)]=function(_0x40f871,_0x1ecdda,_0x3cfe06,_0x3e9766){const _0x57302c=_0x16b2b1;if(!this[_0x57302c(0x873)]())return;if(!this[_0x57302c(0x5b3)])return;if(this['_targetSkewX']===_0x40f871&&this[_0x57302c(0x968)]===_0x1ecdda)return;this[_0x57302c(0x7f4)]=_0x40f871,this[_0x57302c(0x968)]=_0x1ecdda,this[_0x57302c(0x4d0)]=_0x3cfe06,this[_0x57302c(0x20a)]=_0x3cfe06,this[_0x57302c(0x1f5)]=_0x3e9766||_0x57302c(0x1ed),_0x3cfe06<=0x0&&(this[_0x57302c(0x5b3)][_0x57302c(0x3fc)]['x']=this[_0x57302c(0x7f4)],this[_0x57302c(0x5b3)][_0x57302c(0x3fc)]['y']=this[_0x57302c(0x968)]);},Sprite_Battler['prototype']['updateSkew']=function(){const _0x33c92d=_0x16b2b1;if(this['_skewDuration']<=0x0)return;if(!this[_0x33c92d(0x5b3)])return;const _0x3fccbe=this[_0x33c92d(0x4d0)],_0x25c428=this[_0x33c92d(0x20a)],_0xd642a1=this[_0x33c92d(0x1f5)],_0x48c286=this[_0x33c92d(0x5b3)];Imported[_0x33c92d(0x64f)]?(_0x48c286['skew']['x']=this[_0x33c92d(0x91b)](_0x48c286[_0x33c92d(0x3fc)]['x'],this[_0x33c92d(0x7f4)],_0x3fccbe,_0x25c428,_0xd642a1),_0x48c286['skew']['y']=this['applyEasing'](_0x48c286[_0x33c92d(0x3fc)]['y'],this[_0x33c92d(0x968)],_0x3fccbe,_0x25c428,_0xd642a1)):(_0x48c286[_0x33c92d(0x3fc)]['x']=(_0x48c286[_0x33c92d(0x3fc)]['x']*(_0x3fccbe-0x1)+this[_0x33c92d(0x7f4)])/_0x3fccbe,_0x48c286[_0x33c92d(0x3fc)]['y']=(_0x48c286['skew']['y']*(_0x3fccbe-0x1)+this[_0x33c92d(0x968)])/_0x3fccbe);this[_0x33c92d(0x4d0)]--;if(this['_skewDuration']<=0x0)this[_0x33c92d(0x90c)]();},Sprite_Battler['prototype'][_0x16b2b1(0x90c)]=function(){const _0x177287=_0x16b2b1;this[_0x177287(0x5b3)][_0x177287(0x3fc)]['x']=this[_0x177287(0x7f4)],this[_0x177287(0x5b3)][_0x177287(0x3fc)]['y']=this[_0x177287(0x968)];},Sprite_Battler['prototype']['isSkewing']=function(){const _0x107aba=_0x16b2b1;return this[_0x107aba(0x4d0)]>0x0;},Sprite_Battler[_0x16b2b1(0x1ca)]['startSpin']=function(_0x4b8f41,_0x319e96,_0x4ab282,_0x4af99e){const _0x45b078=_0x16b2b1;if(!this[_0x45b078(0x873)]())return;if(!this['_distortionSprite'])return;if(this[_0x45b078(0x32e)]===_0x4b8f41)return;this[_0x45b078(0x32e)]=_0x4b8f41,this['_angleDuration']=_0x319e96,this[_0x45b078(0x4a6)]=_0x319e96,this[_0x45b078(0x591)]=_0x4ab282||'Linear',this[_0x45b078(0x35a)]=_0x4af99e,this[_0x45b078(0x35a)]===undefined&&(this['_angleRevertOnFinish']=!![]),_0x319e96<=0x0&&(this[_0x45b078(0x826)]=_0x4b8f41,this[_0x45b078(0x35a)]&&(this[_0x45b078(0x32e)]=0x0,this['_currentAngle']=0x0));},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x52f)]=function(){const _0x2b19ae=_0x16b2b1;this[_0x2b19ae(0x2fc)](),this[_0x2b19ae(0x677)]();},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x2fc)]=function(){const _0x33cae8=_0x16b2b1;if(this[_0x33cae8(0x649)]<=0x0)return;const _0x50d9a0=this['_angleDuration'],_0x23ff8f=this[_0x33cae8(0x4a6)],_0x25a20d=this['_angleEasing'];Imported['VisuMZ_0_CoreEngine']?this[_0x33cae8(0x826)]=this[_0x33cae8(0x91b)](this[_0x33cae8(0x826)],this[_0x33cae8(0x32e)],_0x50d9a0,_0x23ff8f,_0x25a20d):this[_0x33cae8(0x826)]=(this['_currentAngle']*(_0x50d9a0-0x1)+this['_targetAngle'])/_0x50d9a0;this[_0x33cae8(0x649)]--;if(this[_0x33cae8(0x649)]<=0x0)this[_0x33cae8(0x8f8)]();},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x8f8)]=function(){const _0x3c7fb7=_0x16b2b1;this['_currentAngle']=this[_0x3c7fb7(0x32e)],this[_0x3c7fb7(0x35a)]&&(this[_0x3c7fb7(0x32e)]=0x0,this[_0x3c7fb7(0x826)]=0x0);},Sprite_Battler['prototype']['isSpinning']=function(){const _0x412cc9=_0x16b2b1;return this[_0x412cc9(0x649)]>0x0;},Sprite_Battler['prototype'][_0x16b2b1(0x677)]=function(){const _0x373848=_0x16b2b1;if(!this[_0x373848(0x5b3)])return;const _0x29f8ec=this[_0x373848(0x826)],_0x590439=this[_0x373848(0x6aa)]['x'],_0x59a90a=this[_0x373848(0x4e9)][_0x373848(0x68f)]()?-0x1:0x1;this[_0x373848(0x5b3)]['angle']=_0x29f8ec*_0x590439*_0x59a90a;const _0x416aa0=this[_0x373848(0x5b3)][_0x373848(0x6aa)]['y'];this[_0x373848(0x5b3)]['y']=this[_0x373848(0x86c)]*-0.5*(0x2-_0x416aa0);const _0x202841=[this['_mainSprite'],this[_0x373848(0x878)],this[_0x373848(0x1a9)]];for(const _0x1881b0 of _0x202841){if(!_0x1881b0)continue;_0x1881b0['y']=this['height']*0.5;}this[_0x373848(0x556)]&&(this[_0x373848(0x7c4)]=this[_0x373848(0x7c4)]??0x1,this[_0x373848(0x556)][_0x373848(0x6aa)]['x']=this['_distortionSprite'][_0x373848(0x6aa)]['x']*this[_0x373848(0x7c4)],this[_0x373848(0x556)][_0x373848(0x6aa)]['y']=this['_distortionSprite'][_0x373848(0x6aa)]['y']*this[_0x373848(0x7c4)]);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x1cb)]=Sprite_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x3af)],Sprite_Actor['prototype']['createStateSprite']=function(){const _0x35ac69=_0x16b2b1;VisuMZ[_0x35ac69(0x4da)]['Sprite_Actor_createStateSprite'][_0x35ac69(0x357)](this),VisuMZ[_0x35ac69(0x4da)][_0x35ac69(0x6ac)][_0x35ac69(0x573)][_0x35ac69(0x635)]&&this[_0x35ac69(0x2cc)]();},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x316)]=Sprite_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x716)],Sprite_Enemy['prototype'][_0x16b2b1(0x716)]=function(){const _0x206ce8=_0x16b2b1;VisuMZ[_0x206ce8(0x4da)]['Settings'][_0x206ce8(0x573)][_0x206ce8(0x248)]&&this[_0x206ce8(0x2cc)](),VisuMZ[_0x206ce8(0x4da)][_0x206ce8(0x316)][_0x206ce8(0x357)](this);},Sprite_Battler[_0x16b2b1(0x1ca)]['createHpGaugeSprite']=function(){const _0x226b5d=_0x16b2b1;if(!ConfigManager[_0x226b5d(0x65c)])return;if(this['constructor']===Sprite_SvEnemy)return;const _0x476d0b=VisuMZ[_0x226b5d(0x4da)][_0x226b5d(0x6ac)][_0x226b5d(0x573)],_0x41c997=new Sprite_HpGauge();_0x41c997['anchor']['x']=_0x476d0b[_0x226b5d(0x80e)],_0x41c997[_0x226b5d(0x6f0)]['y']=_0x476d0b[_0x226b5d(0x27c)],_0x41c997[_0x226b5d(0x6aa)]['x']=_0x41c997[_0x226b5d(0x6aa)]['y']=_0x476d0b[_0x226b5d(0x6ff)],this['_hpGaugeSprite']=_0x41c997,this['addChild'](this['_hpGaugeSprite']);},VisuMZ['BattleCore']['Sprite_Battler_setBattler']=Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x89f)],Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x89f)]=function(_0x41a640){const _0x2ecc2c=_0x16b2b1,_0x3bb847=this['_battler'];VisuMZ[_0x2ecc2c(0x4da)][_0x2ecc2c(0x547)][_0x2ecc2c(0x357)](this,_0x41a640),this[_0x2ecc2c(0x218)](_0x41a640);if(_0x3bb847!==_0x41a640)this['updateShadowScale']();},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x218)]=function(_0x47ff02){const _0x587dd5=_0x16b2b1;if(!_0x47ff02)return;if(!this[_0x587dd5(0x3bb)])return;if(_0x47ff02[_0x587dd5(0x68f)]()){}else{if(_0x47ff02[_0x587dd5(0x73f)]()){if(this[_0x587dd5(0x651)]===Sprite_SvEnemy&&!_0x47ff02[_0x587dd5(0x86f)]())return;}}this[_0x587dd5(0x3bb)][_0x587dd5(0x85d)](_0x47ff02,'hp');},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x937)]=function(){const _0x1d0bc2=_0x16b2b1;if(!this['_battler'])return;if(!this[_0x1d0bc2(0x3bb)])return;const _0x330dc2=VisuMZ[_0x1d0bc2(0x4da)][_0x1d0bc2(0x6ac)][_0x1d0bc2(0x573)],_0x4234ed=this[_0x1d0bc2(0x3bb)];_0x4234ed[_0x1d0bc2(0x21f)]=this[_0x1d0bc2(0x3e7)]();const _0x375d7c=_0x330dc2[_0x1d0bc2(0x318)],_0x23b75c=_0x330dc2[_0x1d0bc2(0x555)];_0x4234ed['x']=_0x375d7c,_0x4234ed['x']+=this[_0x1d0bc2(0x4e9)][_0x1d0bc2(0x3e5)](),_0x4234ed['y']=-this[_0x1d0bc2(0x86c)]+_0x23b75c,_0x4234ed['y']+=this['_battler']['battleUIOffsetY']();},Sprite_Battler['prototype'][_0x16b2b1(0x3e7)]=function(){const _0x2675ff=_0x16b2b1;if(!this['_battler'])return![];if(this[_0x2675ff(0x4e9)][_0x2675ff(0x68f)]())return!![];const _0x802673=this['_battler'][_0x2675ff(0x330)]()[_0x2675ff(0x50c)];if(_0x802673['match'](/<SHOW HP GAUGE>/i))return!![];if(_0x802673[_0x2675ff(0x6ef)](/<HIDE HP GAUGE>/i))return![];const _0xf74087=VisuMZ['BattleCore']['Settings'][_0x2675ff(0x573)];if(_0xf74087['RequiresDefeat']){if(_0xf74087[_0x2675ff(0x6c0)]&&BattleManager[_0x2675ff(0x6ca)]())return!![];if(this[_0x2675ff(0x4e9)][_0x2675ff(0x599)])return![];return this['_battler'][_0x2675ff(0x6e8)]();}return!![];},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x4c0)]=Sprite_Battler['prototype'][_0x16b2b1(0x2a2)],Sprite_Battler['prototype'][_0x16b2b1(0x2a2)]=function(){const _0x358727=_0x16b2b1;if(!this[_0x358727(0x4e9)])return![];return VisuMZ[_0x358727(0x4da)][_0x358727(0x4c0)][_0x358727(0x357)](this);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x8c3)]=Sprite_Battler[_0x16b2b1(0x1ca)]['startMove'],Sprite_Battler['prototype']['startMove']=function(_0x59c516,_0xed0a07,_0x4ebc4d){const _0x3c2aa0=_0x16b2b1;this[_0x3c2aa0(0x873)]()&&VisuMZ[_0x3c2aa0(0x4da)][_0x3c2aa0(0x8c3)][_0x3c2aa0(0x357)](this,_0x59c516,_0xed0a07,_0x4ebc4d);},Sprite_Battler['prototype']['canMove']=function(){const _0x1c9d47=_0x16b2b1;if(this[_0x1c9d47(0x4e9)]&&this['_battler'][_0x1c9d47(0x8dc)]())return![];if(this[_0x1c9d47(0x4e9)]&&!this[_0x1c9d47(0x4e9)][_0x1c9d47(0x46f)]())return![];return $gameSystem[_0x1c9d47(0x5a0)]();},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x876)]=function(){},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x419)]=function(){const _0x99149f=_0x16b2b1;this[_0x99149f(0x1fe)](0x0,0x0,0xc);},Sprite_Battler[_0x16b2b1(0x1ca)][_0x16b2b1(0x27a)]=function(){},Sprite_Battler['prototype'][_0x16b2b1(0x253)]=function(){const _0x31aeff=_0x16b2b1,_0x5d22ac=VisuMZ[_0x31aeff(0x4da)][_0x31aeff(0x6ac)][_0x31aeff(0x435)],_0x29f695=this[_0x31aeff(0x4e9)]&&this[_0x31aeff(0x4e9)][_0x31aeff(0x68f)]()?0x1:-0x1,_0x39e826=this[_0x31aeff(0x5f5)]-this[_0x31aeff(0x535)]+_0x29f695*_0x5d22ac[_0x31aeff(0x4f9)],_0x5554a2=this[_0x31aeff(0x19e)]-this[_0x31aeff(0x1c6)]+_0x29f695*_0x5d22ac[_0x31aeff(0x47d)],_0x3e93d1=_0x5d22ac[_0x31aeff(0x421)];this[_0x31aeff(0x1fe)](_0x39e826,_0x5554a2,_0x3e93d1);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x3a5)]=Sprite_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x5af)],Sprite_Actor['prototype']['initMembers']=function(){const _0x4dfd00=_0x16b2b1;VisuMZ['BattleCore']['Sprite_Actor_initMembers'][_0x4dfd00(0x357)](this),this[_0x4dfd00(0x550)]();},Sprite_Actor['prototype'][_0x16b2b1(0x8e6)]=function(){const _0x91cb44=_0x16b2b1;return this[_0x91cb44(0x5b3)]||this['_mainSprite']||this;},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x3c0)]=Sprite_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x35b)],Sprite_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x35b)]=function(){},Sprite_Actor['prototype'][_0x16b2b1(0x725)]=function(_0x3f6597){const _0x1f48d7=_0x16b2b1;if(SceneManager[_0x1f48d7(0x3f9)]())return;if(!_0x3f6597)return;if(!_0x3f6597[_0x1f48d7(0x873)]())return;VisuMZ[_0x1f48d7(0x4da)][_0x1f48d7(0x3c0)][_0x1f48d7(0x357)](this);},VisuMZ[_0x16b2b1(0x4da)]['Sprite_Actor_setActorHome']=Sprite_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x899)],Sprite_Actor['prototype'][_0x16b2b1(0x899)]=function(_0x280fde){const _0x2c1113=_0x16b2b1;VisuMZ[_0x2c1113(0x4da)][_0x2c1113(0x6ac)]['Actor'][_0x2c1113(0x2ca)]?VisuMZ['BattleCore']['Settings'][_0x2c1113(0x435)][_0x2c1113(0x2ca)][_0x2c1113(0x357)](this,_0x280fde):VisuMZ[_0x2c1113(0x4da)][_0x2c1113(0x1c5)][_0x2c1113(0x357)](this,_0x280fde);},VisuMZ['BattleCore'][_0x16b2b1(0x61f)]=Sprite_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x89f)],Sprite_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x89f)]=function(_0x533162){const _0x319ab9=_0x16b2b1;VisuMZ[_0x319ab9(0x4da)]['Sprite_Actor_setBattler'][_0x319ab9(0x357)](this,_0x533162),this[_0x319ab9(0x93a)](_0x533162);},Sprite_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x93a)]=function(_0xc5ae1c){const _0x32e9da=_0x16b2b1;if(!_0xc5ae1c)return;if(!this['_mainSprite'])return;this[_0x32e9da(0x62c)]['anchor']['x']=this[_0x32e9da(0x6df)][_0x32e9da(0x19b)](),this[_0x32e9da(0x62c)][_0x32e9da(0x6f0)]['y']=this[_0x32e9da(0x6df)]['svBattlerAnchorY'](),this['updateShadowVisibility']();},VisuMZ[_0x16b2b1(0x4da)]['Sprite_Actor_update']=Sprite_Actor['prototype']['update'],Sprite_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x541)]=function(){const _0x53f899=_0x16b2b1;VisuMZ[_0x53f899(0x4da)][_0x53f899(0x76a)][_0x53f899(0x357)](this),this[_0x53f899(0x6df)]&&(this[_0x53f899(0x201)](),this[_0x53f899(0x644)]());},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x95a)]=Sprite_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x5b8)],Sprite_Actor[_0x16b2b1(0x1ca)]['updateBitmap']=function(){const _0x1ff84b=_0x16b2b1;VisuMZ['BattleCore'][_0x1ff84b(0x95a)][_0x1ff84b(0x357)](this),this[_0x1ff84b(0x62c)]&&this['_mainSprite'][_0x1ff84b(0x4ee)]&&this[_0x1ff84b(0x4e9)]&&(this[_0x1ff84b(0x62c)][_0x1ff84b(0x4ee)]['smooth']!==this['_battler'][_0x1ff84b(0x700)]()&&(this[_0x1ff84b(0x62c)][_0x1ff84b(0x4ee)][_0x1ff84b(0x8bc)]=this[_0x1ff84b(0x4e9)][_0x1ff84b(0x700)]()));},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x856)]=Sprite_Actor[_0x16b2b1(0x1ca)]['updateShadow'],Sprite_Actor['prototype'][_0x16b2b1(0x634)]=function(){const _0x4be1e9=_0x16b2b1;VisuMZ[_0x4be1e9(0x4da)][_0x4be1e9(0x856)]['call'](this),this[_0x4be1e9(0x68c)]();},Sprite_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x68c)]=function(){const _0x5976fe=_0x16b2b1;if(!this[_0x5976fe(0x62c)])return;if(!this[_0x5976fe(0x556)])return;this[_0x5976fe(0x3dd)](),this[_0x5976fe(0x340)]();},Sprite_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x201)]=function(){const _0x3d17f3=_0x16b2b1;this['_stateSprite'][_0x3d17f3(0x6aa)]['x']=0x1/(this[_0x3d17f3(0x6aa)]['x']||0.001),this[_0x3d17f3(0x276)][_0x3d17f3(0x6aa)]['y']=0x1/(this[_0x3d17f3(0x6aa)]['y']||0.001);},Sprite_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x644)]=function(){const _0xea76f6=_0x16b2b1;if(!$gameSystem[_0xea76f6(0x5a0)]()&&this[_0xea76f6(0x651)]===Sprite_Actor){const _0x5594db=Scene_Battle['prototype'][_0xea76f6(0x860)]();['default','list','portrait','border']['includes'](_0x5594db)&&(this[_0xea76f6(0x548)]=0x0);}},Sprite_Actor[_0x16b2b1(0x1ca)]['refreshMotion']=function(){const _0x4d451e=_0x16b2b1,_0x365d9d=this['_actor'];if(_0x365d9d){const _0x1a82ad=_0x365d9d[_0x4d451e(0x285)]();if(_0x365d9d[_0x4d451e(0x8cc)]()||_0x365d9d['isActing']())this[_0x4d451e(0x6dc)](_0x4d451e(0x44c));else{if(_0x1a82ad===0x3)this[_0x4d451e(0x6dc)](_0x4d451e(0x78d));else{if(_0x1a82ad===0x2)this[_0x4d451e(0x6dc)](_0x4d451e(0x3c3));else{if(this[_0x4d451e(0x793)])this[_0x4d451e(0x6dc)](_0x4d451e(0x214));else{if(_0x365d9d[_0x4d451e(0x962)]())this[_0x4d451e(0x6dc)](_0x4d451e(0x7bd));else{if(_0x365d9d[_0x4d451e(0x24c)]())this['startMotion']('chant');else{if(_0x365d9d['isGuard']()||_0x365d9d[_0x4d451e(0x8d6)]())this[_0x4d451e(0x6dc)](_0x4d451e(0x483));else{if(_0x1a82ad===0x1)this[_0x4d451e(0x6dc)](_0x4d451e(0x871));else{if(_0x365d9d[_0x4d451e(0x371)]())this['startMotion'](_0x4d451e(0x29d));else{if(_0x365d9d[_0x4d451e(0x420)]())this[_0x4d451e(0x6dc)]('walk');else _0x365d9d[_0x4d451e(0x1ae)]()?this[_0x4d451e(0x6dc)](_0x4d451e(0x7bd)):this[_0x4d451e(0x6dc)]('walk');}}}}}}}}}}},Sprite_Actor['prototype']['retreat']=function(){const _0x367422=_0x16b2b1,_0x5aeb32=0xa,_0x17c204=0x12c*_0x5aeb32,_0x4266c3=0x1e*_0x5aeb32;this[_0x367422(0x1fe)](_0x17c204,0x0,_0x4266c3);},Sprite_Actor['prototype']['onMoveEnd']=function(){const _0x49ecca=_0x16b2b1;Sprite_Battler[_0x49ecca(0x1ca)][_0x49ecca(0x67d)][_0x49ecca(0x357)](this);},Sprite_Actor[_0x16b2b1(0x1ca)]['motionSpeed']=function(){const _0x58192f=_0x16b2b1;return Sprite_Battler[_0x58192f(0x436)];},Sprite_Weapon[_0x16b2b1(0x1ca)]['animationWait']=function(){return Sprite_Battler['_motionSpeed'];},Sprite_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x5ed)]=function(){},Sprite_Actor[_0x16b2b1(0x1ca)]['setupWeaponAnimation']=function(){},Sprite_Actor[_0x16b2b1(0x1ca)]['updateMotionCount']=function(){const _0x3c69ba=_0x16b2b1;if(this['_motion']&&++this['_motionCount']>=this[_0x3c69ba(0x803)]()){if(this['_motion']['loop'])this[_0x3c69ba(0x847)]=(this[_0x3c69ba(0x847)]+0x1)%0x4;else this[_0x3c69ba(0x847)]<0x2?this[_0x3c69ba(0x847)]++:this[_0x3c69ba(0x827)]();this['_motionCount']=0x0;}},Sprite_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x2aa)]=function(_0x2c91aa){const _0x12e398=_0x16b2b1;if(_0x2c91aa===_0x12e398(0x67f))this[_0x12e398(0x2b6)]=!![];if(this['_battler']&&this[_0x12e398(0x4e9)][_0x12e398(0x8dc)]()){this['_motion']=Sprite_Actor[_0x12e398(0x574)][_0x12e398(0x78d)];return;}const _0x4643f0=Sprite_Actor[_0x12e398(0x574)][_0x2c91aa];this[_0x12e398(0x8f5)]=_0x4643f0,this[_0x12e398(0x279)]=0x0,this[_0x12e398(0x847)]=0x0;},Sprite_Actor['prototype'][_0x16b2b1(0x7e1)]=function(_0x2837fc){const _0x5bd157=_0x16b2b1;this[_0x5bd157(0x6be)](),this[_0x5bd157(0x264)][_0x5bd157(0x85d)](_0x2837fc),this[_0x5bd157(0x6df)][_0x5bd157(0x518)]();},Sprite_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x6be)]=function(){const _0x22ed2f=_0x16b2b1;let _0x4772c3=-0x10,_0x23faab=this[_0x22ed2f(0x86c)]*0.5;const _0x42b590=/<SIDEVIEW WEAPON OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i,_0x1f909b=this['_battler']['traitObjects']()[_0x22ed2f(0x5b1)](_0x466a24=>_0x466a24&&_0x466a24[_0x22ed2f(0x50c)][_0x22ed2f(0x6ef)](_0x42b590)?Number(RegExp['$1']):0x0),_0x411865=this[_0x22ed2f(0x4e9)][_0x22ed2f(0x233)]()[_0x22ed2f(0x5b1)](_0x351ac2=>_0x351ac2&&_0x351ac2[_0x22ed2f(0x50c)]['match'](_0x42b590)?Number(RegExp['$2']):0x0);_0x4772c3=_0x1f909b['reduce']((_0x4577f5,_0x3c881c)=>_0x4577f5+_0x3c881c,_0x4772c3),_0x23faab=_0x411865[_0x22ed2f(0x454)]((_0x455a33,_0x419636)=>_0x455a33+_0x419636,_0x23faab),this[_0x22ed2f(0x264)]['x']=_0x4772c3,this[_0x22ed2f(0x264)]['y']=_0x23faab,this[_0x22ed2f(0x264)][_0x22ed2f(0x541)]();},Sprite_Weapon[_0x16b2b1(0x1ca)][_0x16b2b1(0x85d)]=function(_0x2a804e){const _0x3cab59=_0x16b2b1;this[_0x3cab59(0x28c)]=_0x2a804e,this['_animationCount']=-0x1,this[_0x3cab59(0x847)]=0x0,this['loadBitmap'](),this['updateFrame']();},Sprite_Actor[_0x16b2b1(0x1ca)]['updateTargetPosition']=function(){},Sprite_Actor['prototype'][_0x16b2b1(0x876)]=function(){const _0x38203c=_0x16b2b1,_0x3a1bd4=VisuMZ[_0x38203c(0x4da)]['Settings'][_0x38203c(0x7df)],_0xdd7070=_0x3a1bd4['StepDistanceX'],_0x32acba=_0x3a1bd4[_0x38203c(0x78f)],_0x4d32a1=_0x3a1bd4[_0x38203c(0x2c9)];this[_0x38203c(0x1fe)](-_0xdd7070,-_0x32acba,_0x4d32a1);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x4cc)]=Sprite_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x938)],Sprite_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x938)]=function(){const _0xff148b=_0x16b2b1;this[_0xff148b(0x6ec)](),VisuMZ['BattleCore']['Sprite_Actor_updateFrame']['call'](this);},Sprite_Actor[_0x16b2b1(0x1ca)]['applyFreezeMotionFrames']=function(){const _0xfeb9c0=_0x16b2b1;if(this[_0xfeb9c0(0x4e9)]&&this[_0xfeb9c0(0x4e9)][_0xfeb9c0(0x1b1)]){const _0x2f1cd2=this[_0xfeb9c0(0x4e9)][_0xfeb9c0(0x1b1)];this[_0xfeb9c0(0x8f5)]=Sprite_Actor[_0xfeb9c0(0x574)][_0x2f1cd2[_0xfeb9c0(0x7e9)]],this[_0xfeb9c0(0x847)]=_0x2f1cd2[_0xfeb9c0(0x4d3)];const _0x49c56c=this[_0xfeb9c0(0x264)];_0x49c56c[_0xfeb9c0(0x2d1)](_0x2f1cd2[_0xfeb9c0(0x55c)],_0x2f1cd2[_0xfeb9c0(0x4d3)]),this['adjustWeaponSpriteOffset']();}},Sprite_Weapon[_0x16b2b1(0x1ca)]['freezeFrame']=function(_0x7bd6ab,_0xd325e2){const _0x493c64=_0x16b2b1;this[_0x493c64(0x28c)]=_0x7bd6ab,this['_animationCount']=-Infinity,this['_pattern']=_0xd325e2,this[_0x493c64(0x880)](),this[_0x493c64(0x938)]();},Sprite_Enemy['prototype'][_0x16b2b1(0x5af)]=function(){const _0x33cfd8=_0x16b2b1;Sprite_Battler[_0x33cfd8(0x1ca)][_0x33cfd8(0x5af)][_0x33cfd8(0x357)](this),this['_enemy']=null,this[_0x33cfd8(0x668)]=![],this['_battlerName']='',this[_0x33cfd8(0x69c)]=0x0,this['_effectType']=null,this[_0x33cfd8(0x3eb)]=0x0,this[_0x33cfd8(0x946)]=0x0,this['createMainSprite'](),this['createStateIconSprite']();},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x4a3)]=Sprite_Enemy[_0x16b2b1(0x1ca)]['update'],Sprite_Enemy['prototype']['update']=function(){const _0x5440a1=_0x16b2b1;VisuMZ[_0x5440a1(0x4da)][_0x5440a1(0x4a3)][_0x5440a1(0x357)](this),this[_0x5440a1(0x3dd)]();},Sprite_Enemy[_0x16b2b1(0x1ca)]['createMainSprite']=function(){const _0x2e6f7f=_0x16b2b1;this[_0x2e6f7f(0x62c)]=new Sprite(),this['_mainSprite'][_0x2e6f7f(0x6f0)]['x']=0.5,this['_mainSprite']['anchor']['y']=0x1,this['addChild'](this['_mainSprite']),this[_0x2e6f7f(0x550)]();},Sprite_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x8e6)]=function(){const _0x2f082d=_0x16b2b1;return this[_0x2f082d(0x5b3)]||this[_0x2f082d(0x62c)]||this;},Sprite_Enemy[_0x16b2b1(0x1ca)]['loadBitmap']=function(_0x400631){const _0x383b87=_0x16b2b1;this[_0x383b87(0x4ee)]=new Bitmap(0x1,0x1),$gameSystem[_0x383b87(0x5a0)]()?this[_0x383b87(0x62c)]['bitmap']=ImageManager[_0x383b87(0x8e2)](_0x400631):this[_0x383b87(0x62c)][_0x383b87(0x4ee)]=ImageManager[_0x383b87(0x521)](_0x400631),this[_0x383b87(0x62c)][_0x383b87(0x4ee)][_0x383b87(0x703)](this[_0x383b87(0x408)]['bind'](this));},Sprite_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x408)]=function(){const _0x488541=_0x16b2b1,_0x3284b1=this[_0x488541(0x62c)][_0x488541(0x4ee)];_0x3284b1&&(this[_0x488541(0x4ee)]=new Bitmap(_0x3284b1['width'],_0x3284b1[_0x488541(0x86c)]));},VisuMZ[_0x16b2b1(0x4da)]['Sprite_Enemy_setHue']=Sprite_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x8d1)],Sprite_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x8d1)]=function(_0x236171){const _0x519fd3=_0x16b2b1;this[_0x519fd3(0x62c)]&&this[_0x519fd3(0x62c)][_0x519fd3(0x8d1)](_0x236171);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x536)]=Sprite_Enemy['prototype']['initVisibility'],Sprite_Enemy['prototype'][_0x16b2b1(0x277)]=function(){const _0x592668=_0x16b2b1;this[_0x592668(0x51d)]()?VisuMZ[_0x592668(0x4da)][_0x592668(0x536)][_0x592668(0x357)](this):(this['_appeared']=!this[_0x592668(0x1b9)][_0x592668(0x8a4)](),!this[_0x592668(0x668)]&&(this[_0x592668(0x548)]=0x0));},VisuMZ[_0x16b2b1(0x4da)]['Sprite_Enemy_updateCollapse']=Sprite_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x46c)],Sprite_Enemy[_0x16b2b1(0x1ca)]['updateCollapse']=function(){const _0x2b6374=_0x16b2b1;if(this['allowCollapse']())VisuMZ[_0x2b6374(0x4da)][_0x2b6374(0x26a)][_0x2b6374(0x357)](this);},Sprite_Enemy['prototype']['updateFrame']=function(){const _0x1ba20c=_0x16b2b1;Sprite_Battler[_0x1ba20c(0x1ca)]['updateFrame'][_0x1ba20c(0x357)](this);const _0x303dc1=this[_0x1ba20c(0x8e6)]()||this;if(!_0x303dc1)return;!_0x303dc1['bitmap']&&(_0x303dc1[_0x1ba20c(0x4ee)]=new Bitmap(this[_0x1ba20c(0x20c)],this[_0x1ba20c(0x86c)])),this[_0x1ba20c(0x584)]===_0x1ba20c(0x4c3)?this[_0x1ba20c(0x62c)]['setFrame'](0x0,0x0,this['_mainSprite'][_0x1ba20c(0x20c)],this[_0x1ba20c(0x3eb)]):_0x303dc1[_0x1ba20c(0x77e)](0x0,0x0,_0x303dc1[_0x1ba20c(0x4ee)]['width'],this['bitmap']['height']);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x796)]=Sprite_Enemy['prototype']['updateBossCollapse'],Sprite_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x581)]=function(){const _0x57b670=_0x16b2b1;if(this['allowCollapse']())VisuMZ[_0x57b670(0x4da)][_0x57b670(0x796)][_0x57b670(0x357)](this);},Sprite_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x2a2)]=function(){const _0x4434d6=_0x16b2b1;return Sprite_Battler[_0x4434d6(0x1ca)][_0x4434d6(0x2a2)][_0x4434d6(0x357)](this);},VisuMZ['BattleCore'][_0x16b2b1(0x5d4)]=Sprite_Enemy['prototype'][_0x16b2b1(0x201)],Sprite_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x201)]=function(){const _0x559adf=_0x16b2b1;VisuMZ[_0x559adf(0x4da)][_0x559adf(0x5d4)][_0x559adf(0x357)](this),this['updateStateSpriteBattleCore']();},Sprite_Enemy[_0x16b2b1(0x1ca)]['updateStateSpriteBattleCore']=function(){const _0x496c7a=_0x16b2b1,_0x2458f5=VisuMZ[_0x496c7a(0x4da)]['Settings']['Enemy'];if(_0x2458f5[_0x496c7a(0x5fe)]&&!_0x2458f5['NameLegacy']){this[_0x496c7a(0x5e3)]['opacity']=0x0;return;}this[_0x496c7a(0x5e3)]['x']=0x0,this[_0x496c7a(0x5e3)]['x']+=this[_0x496c7a(0x4e9)]['battleUIOffsetX'](),this[_0x496c7a(0x5e3)]['y']=-this[_0x496c7a(0x4ee)][_0x496c7a(0x86c)]-this[_0x496c7a(0x5e3)][_0x496c7a(0x86c)],this[_0x496c7a(0x5e3)]['y']+=this[_0x496c7a(0x4e9)][_0x496c7a(0x96c)](),this[_0x496c7a(0x5e3)][_0x496c7a(0x6aa)]['x']=0x1/(this[_0x496c7a(0x6aa)]['x']||0.001),this[_0x496c7a(0x5e3)][_0x496c7a(0x6aa)]['y']=0x1/(this[_0x496c7a(0x6aa)]['y']||0.001),this[_0x496c7a(0x86f)]()&&(this['_svBattlerSprite'][_0x496c7a(0x276)][_0x496c7a(0x6aa)]['x']=-0x1/(this['scale']['x']||0.001),this[_0x496c7a(0x878)]['_stateSprite']['scale']['y']=0x1/(this[_0x496c7a(0x6aa)]['y']||0.001));},VisuMZ['BattleCore']['Sprite_Enemy_setBattler']=Sprite_Enemy['prototype'][_0x16b2b1(0x89f)],Sprite_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x89f)]=function(_0x3700c7){const _0x8032f8=_0x16b2b1;VisuMZ[_0x8032f8(0x4da)][_0x8032f8(0x7ff)][_0x8032f8(0x357)](this,_0x3700c7),this[_0x8032f8(0x554)](_0x3700c7);},Sprite_Enemy[_0x16b2b1(0x1ca)]['setSvBattlerSprite']=function(_0xc5f0ee){const _0xa569b9=_0x16b2b1;!this['_svBattlerSprite']&&(this[_0xa569b9(0x878)]=new Sprite_SvEnemy(_0xc5f0ee),this[_0xa569b9(0x550)]()),this['_svBattlerSprite'][_0xa569b9(0x89f)](_0xc5f0ee);},Sprite_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x86f)]=function(){const _0x536d96=_0x16b2b1;return this[_0x536d96(0x1b9)]&&this[_0x536d96(0x1b9)][_0x536d96(0x86f)]();},VisuMZ['BattleCore']['Sprite_Enemy_loadBitmap']=Sprite_Enemy['prototype'][_0x16b2b1(0x880)],Sprite_Enemy['prototype'][_0x16b2b1(0x880)]=function(_0x4f214b){const _0x56469c=_0x16b2b1;if(this[_0x56469c(0x86f)]()){const _0x122528=this['_enemy'][_0x56469c(0x881)]();this[_0x56469c(0x4ee)]=new Bitmap(_0x122528[_0x56469c(0x20c)],_0x122528[_0x56469c(0x86c)]);}else VisuMZ['BattleCore'][_0x56469c(0x7a0)][_0x56469c(0x357)](this,_0x4f214b);},Sprite_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x51d)]=function(){const _0x1eb249=_0x16b2b1;return this[_0x1eb249(0x86f)]()?this['_enemy'][_0x1eb249(0x51d)]():!![];},Sprite_Enemy[_0x16b2b1(0x1ca)]['refreshMotion']=function(){const _0xf2e386=_0x16b2b1;this['hasSvBattler']()&&this[_0xf2e386(0x878)]['refreshMotion']();},Sprite_Enemy[_0x16b2b1(0x1ca)]['forceMotion']=function(_0x472e97){const _0x37fdd2=_0x16b2b1;if(this[_0x37fdd2(0x86f)]())this[_0x37fdd2(0x878)]['forceMotion'](_0x472e97);},Sprite_Enemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x7e1)]=function(_0x47e070){const _0x3b3763=_0x16b2b1;if(this[_0x3b3763(0x86f)]())this[_0x3b3763(0x878)][_0x3b3763(0x7e1)](_0x47e070);},Sprite_Enemy[_0x16b2b1(0x1ca)]['stepForward']=function(){const _0xd95b1b=_0x16b2b1,_0x3a150b=VisuMZ[_0xd95b1b(0x4da)]['Settings'][_0xd95b1b(0x7df)],_0x2529a9=_0x3a150b[_0xd95b1b(0x5b4)],_0x34d054=_0x3a150b[_0xd95b1b(0x78f)],_0x3a1b18=_0x3a150b['StepDuration'];this[_0xd95b1b(0x1fe)](_0x2529a9,_0x34d054,_0x3a1b18);};function Sprite_SvEnemy(){const _0x523992=_0x16b2b1;this[_0x523992(0x77d)](...arguments);}Sprite_SvEnemy[_0x16b2b1(0x1ca)]=Object[_0x16b2b1(0x446)](Sprite_Actor[_0x16b2b1(0x1ca)]),Sprite_SvEnemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x651)]=Sprite_SvEnemy,Sprite_SvEnemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x77d)]=function(_0x25c0ce){const _0x5f4922=_0x16b2b1;Sprite_Actor[_0x5f4922(0x1ca)][_0x5f4922(0x77d)][_0x5f4922(0x357)](this,_0x25c0ce),this[_0x5f4922(0x6aa)]['x']=-0x1,this[_0x5f4922(0x276)][_0x5f4922(0x6aa)]['x']=-0x1;},Sprite_SvEnemy['prototype'][_0x16b2b1(0x975)]=function(){},Sprite_SvEnemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x35b)]=function(){},Sprite_SvEnemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x899)]=function(_0x3528ef){},Sprite_SvEnemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x634)]=function(){},Sprite_SvEnemy['prototype']['updateShadowPosition']=function(){},Sprite_SvEnemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x201)]=function(){this['_stateSprite']['visible']=![];},Sprite_SvEnemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x5b8)]=function(){const _0x3dcc5b=_0x16b2b1;Sprite_Battler[_0x3dcc5b(0x1ca)][_0x3dcc5b(0x5b8)]['call'](this);const _0x56ad82=this[_0x3dcc5b(0x6df)][_0x3dcc5b(0x8f6)]();this[_0x3dcc5b(0x639)]!==_0x56ad82&&(this[_0x3dcc5b(0x639)]=_0x56ad82,this[_0x3dcc5b(0x62c)][_0x3dcc5b(0x4ee)]=ImageManager[_0x3dcc5b(0x36b)](_0x56ad82)),this[_0x3dcc5b(0x62c)]&&this['_mainSprite'][_0x3dcc5b(0x4ee)]&&this[_0x3dcc5b(0x4e9)]&&(this[_0x3dcc5b(0x62c)][_0x3dcc5b(0x4ee)][_0x3dcc5b(0x8bc)]!==this[_0x3dcc5b(0x4e9)]['battlerSmoothImage']()&&(this[_0x3dcc5b(0x62c)][_0x3dcc5b(0x4ee)][_0x3dcc5b(0x8bc)]=this[_0x3dcc5b(0x4e9)][_0x3dcc5b(0x700)]()));},Sprite_SvEnemy['prototype'][_0x16b2b1(0x27a)]=function(){},Sprite_SvEnemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x1fe)]=function(_0x457b63,_0x53fdd6,_0x3308f9){const _0x350e44=_0x16b2b1;if(this['parent'])this['parent'][_0x350e44(0x1fe)](_0x457b63,_0x53fdd6,_0x3308f9);},Sprite_SvEnemy['prototype']['refreshMotion']=function(){const _0x22a035=_0x16b2b1,_0x18948c=this[_0x22a035(0x6df)];if(_0x18948c){const _0xdc7895=_0x18948c[_0x22a035(0x285)]();if(_0x18948c[_0x22a035(0x8cc)]()||_0x18948c[_0x22a035(0x817)]())this[_0x22a035(0x6dc)](_0x22a035(0x44c));else{if(_0xdc7895===0x3)this['startMotion'](_0x22a035(0x78d));else{if(_0xdc7895===0x2)this[_0x22a035(0x6dc)](_0x22a035(0x3c3));else{if(_0x18948c[_0x22a035(0x24c)]())this[_0x22a035(0x6dc)](_0x22a035(0x471));else{if(_0x18948c[_0x22a035(0x94f)]()||_0x18948c['isGuardWaiting']())this['startMotion'](_0x22a035(0x483));else{if(_0xdc7895===0x1)this[_0x22a035(0x6dc)](_0x22a035(0x871));else{if(_0x18948c[_0x22a035(0x371)]())this[_0x22a035(0x6dc)]('dying');else _0x18948c['isUndecided']()?this[_0x22a035(0x6dc)]('walk'):this['startMotion'](_0x18948c[_0x22a035(0x881)]()[_0x22a035(0x861)]||_0x22a035(0x44c));}}}}}}}},Sprite_SvEnemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x600)]=function(){const _0x3f4cd3=_0x16b2b1;return this[_0x3f4cd3(0x6f3)]?this[_0x3f4cd3(0x6f3)][_0x3f4cd3(0x4a4)]===0x0&&this[_0x3f4cd3(0x6f3)][_0x3f4cd3(0x3ff)]===0x0:!![];},Sprite_SvEnemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x5f8)]=function(){},Sprite_Damage[_0x16b2b1(0x1ca)][_0x16b2b1(0x596)]=function(_0x34e55e){const _0x268d10=_0x16b2b1,_0x23276e=_0x34e55e[_0x268d10(0x585)]()||_0x34e55e['result']();if(_0x23276e[_0x268d10(0x6a8)]||_0x23276e[_0x268d10(0x751)])this['_colorType']=0x0,this[_0x268d10(0x431)]();else{if(_0x23276e[_0x268d10(0x1f2)])this[_0x268d10(0x578)]=_0x23276e[_0x268d10(0x80f)]>=0x0?0x0:0x1,this[_0x268d10(0x1ef)](_0x23276e[_0x268d10(0x80f)]);else _0x34e55e[_0x268d10(0x526)]()&&_0x23276e[_0x268d10(0x854)]!==0x0&&(this[_0x268d10(0x578)]=_0x23276e[_0x268d10(0x854)]>=0x0?0x2:0x3,this['createDigits'](_0x23276e['mpDamage']));}_0x23276e[_0x268d10(0x784)]&&this[_0x268d10(0x1cc)]();},Sprite_Damage[_0x16b2b1(0x1ca)]['setup']=function(_0x130ce8){},Sprite_Damage[_0x16b2b1(0x1ca)][_0x16b2b1(0x1ef)]=function(_0x475333){const _0x250f02=_0x16b2b1;let _0x17f0b1=this[_0x250f02(0x5b6)](_0x475333);const _0x12d3d7=this[_0x250f02(0x7c8)](),_0x59299c=Math[_0x250f02(0x3db)](_0x12d3d7*0.75);for(let _0x5210e1=0x0;_0x5210e1<_0x17f0b1[_0x250f02(0x7d1)];_0x5210e1++){const _0x3b5284=this['createChildSprite'](_0x59299c,_0x12d3d7);_0x3b5284[_0x250f02(0x4ee)]['drawText'](_0x17f0b1[_0x5210e1],0x0,0x0,_0x59299c,_0x12d3d7,_0x250f02(0x6bb)),_0x3b5284['x']=(_0x5210e1-(_0x17f0b1[_0x250f02(0x7d1)]-0x1)/0x2)*_0x59299c,_0x3b5284['dy']=-_0x5210e1;}},Sprite_Damage[_0x16b2b1(0x1ca)][_0x16b2b1(0x5b6)]=function(_0x469b28){const _0x44977f=_0x16b2b1;let _0xd3ddf4=Math[_0x44977f(0x43d)](_0x469b28)[_0x44977f(0x34d)]();this[_0x44977f(0x8b8)]()&&(_0xd3ddf4=VisuMZ[_0x44977f(0x30b)](_0xd3ddf4));const _0x337eb8=VisuMZ[_0x44977f(0x4da)][_0x44977f(0x6ac)][_0x44977f(0x5a4)];let _0x1c4176='',_0x4d6bd='';switch(this[_0x44977f(0x578)]){case 0x0:_0x1c4176=_0x337eb8[_0x44977f(0x443)]||'-%1',_0x4d6bd=TextManager['hp'];if(_0x469b28===0x0)_0x1c4176='%1';break;case 0x1:_0x1c4176=_0x337eb8['hpHealingFmt']||_0x44977f(0x31d),_0x4d6bd=TextManager['hp'];break;case 0x2:_0x1c4176=_0x337eb8[_0x44977f(0x96f)]||_0x44977f(0x958),_0x4d6bd=TextManager['mp'];break;case 0x3:_0x1c4176=_0x337eb8[_0x44977f(0x440)]||_0x44977f(0x552),_0x4d6bd=TextManager['mp'];break;}return _0x1c4176['format'](_0xd3ddf4,_0x4d6bd)['trim']();},Sprite_Damage['prototype']['useDigitGrouping']=function(){const _0x35be18=_0x16b2b1;return Imported[_0x35be18(0x64f)]?VisuMZ[_0x35be18(0x911)][_0x35be18(0x6ac)][_0x35be18(0x269)][_0x35be18(0x423)]:![];},Sprite_Damage[_0x16b2b1(0x1ca)][_0x16b2b1(0x1cc)]=function(){const _0x4747f6=_0x16b2b1,_0x2b1db8=VisuMZ[_0x4747f6(0x4da)][_0x4747f6(0x6ac)][_0x4747f6(0x5a4)];this[_0x4747f6(0x26b)]=_0x2b1db8['CriticalColor'][_0x4747f6(0x2ed)](0x0),this[_0x4747f6(0x747)]=_0x2b1db8[_0x4747f6(0x753)];},Sprite_Damage[_0x16b2b1(0x1ca)]['setupTextPopup']=function(_0x696fa5,_0x2c84be){const _0x2da801=_0x16b2b1;this['_flashColor']=_0x2c84be['flashColor']||[0x0,0x0,0x0,0x0],this[_0x2da801(0x26b)]=JsonEx[_0x2da801(0x5df)](this['_flashColor']),this[_0x2da801(0x747)]=_0x2c84be[_0x2da801(0x3f4)]||0x0;const _0x263c2f=this['fontSize'](),_0x1aab29=Math[_0x2da801(0x3db)](_0x263c2f*0x1e),_0x36535e=this[_0x2da801(0x5f1)](_0x1aab29,_0x263c2f);_0x36535e[_0x2da801(0x4ee)][_0x2da801(0x67b)]=ColorManager['getColor'](_0x2c84be[_0x2da801(0x67b)]),_0x36535e[_0x2da801(0x4ee)][_0x2da801(0x1d0)](_0x696fa5,0x0,0x0,_0x1aab29,_0x263c2f,_0x2da801(0x6bb)),_0x36535e['dy']=0x0;},Sprite_Damage[_0x16b2b1(0x1ca)][_0x16b2b1(0x91c)]=function(_0x310fbc,_0x2d02a7,_0x210929){const _0x1b24e1=_0x16b2b1,_0xac3933=Math[_0x1b24e1(0x6fa)](this['fontSize'](),ImageManager['iconHeight']),_0x35c2bc=Math[_0x1b24e1(0x3db)](_0xac3933*0x1e),_0x42dd6b=this[_0x1b24e1(0x5f1)](_0x35c2bc,_0xac3933),_0x591799=ImageManager[_0x1b24e1(0x2e9)]/0x2,_0x321859=_0x42dd6b[_0x1b24e1(0x4ee)]['measureTextWidth'](_0x2d02a7+'\x20');_0x42dd6b[_0x1b24e1(0x4ee)]['textColor']=ColorManager[_0x1b24e1(0x8ce)](_0x210929['textColor']),_0x42dd6b[_0x1b24e1(0x4ee)]['drawText'](_0x2d02a7,_0x591799,0x0,_0x35c2bc-_0x591799,_0xac3933,_0x1b24e1(0x6bb));const _0x39b9a7=Math[_0x1b24e1(0x855)]((_0xac3933-ImageManager['iconHeight'])/0x2),_0x262d8a=_0x35c2bc/0x2-ImageManager[_0x1b24e1(0x2e9)]-_0x321859/0x2+_0x591799/0x2,_0x17b2fe=ImageManager[_0x1b24e1(0x5c6)]('IconSet'),_0x4d7bda=ImageManager[_0x1b24e1(0x2e9)],_0xf392e0=ImageManager[_0x1b24e1(0x3b1)],_0x3ab58f=_0x310fbc%0x10*_0x4d7bda,_0x32487a=Math['floor'](_0x310fbc/0x10)*_0xf392e0;_0x42dd6b[_0x1b24e1(0x4ee)][_0x1b24e1(0x501)](_0x17b2fe,_0x3ab58f,_0x32487a,_0x4d7bda,_0xf392e0,_0x262d8a,_0x39b9a7),this['_flashColor']=_0x210929['flashColor']||[0x0,0x0,0x0,0x0],this[_0x1b24e1(0x26b)]=JsonEx['makeDeepCopy'](this[_0x1b24e1(0x26b)]),this[_0x1b24e1(0x747)]=_0x210929[_0x1b24e1(0x3f4)]||0x0,_0x42dd6b['dy']=0x0;},VisuMZ[_0x16b2b1(0x4da)]['Sprite_StateIcon_updateFrame']=Sprite_StateIcon[_0x16b2b1(0x1ca)][_0x16b2b1(0x938)],Sprite_StateIcon['prototype'][_0x16b2b1(0x938)]=function(){const _0x5ed06e=_0x16b2b1;VisuMZ[_0x5ed06e(0x4da)]['Sprite_StateIcon_updateFrame']['call'](this),this['opacity']=this['_iconIndex']>0x0?0xff:0x0;},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x732)]=Sprite_Weapon[_0x16b2b1(0x1ca)][_0x16b2b1(0x880)],Sprite_Weapon[_0x16b2b1(0x1ca)][_0x16b2b1(0x880)]=function(){const _0x18073e=_0x16b2b1;VisuMZ[_0x18073e(0x4da)][_0x18073e(0x732)][_0x18073e(0x357)](this),this[_0x18073e(0x4ee)]&&(this['bitmap'][_0x18073e(0x8bc)]=VisuMZ['BattleCore'][_0x18073e(0x6ac)][_0x18073e(0x435)][_0x18073e(0x838)]);};function Sprite_HpGauge(){const _0x3b4c9e=_0x16b2b1;this[_0x3b4c9e(0x77d)](...arguments);}Sprite_HpGauge[_0x16b2b1(0x1ca)]=Object[_0x16b2b1(0x446)](Sprite_Gauge['prototype']),Sprite_HpGauge[_0x16b2b1(0x1ca)][_0x16b2b1(0x651)]=Sprite_HpGauge,Sprite_HpGauge[_0x16b2b1(0x1ca)][_0x16b2b1(0x77d)]=function(){const _0x6357ea=_0x16b2b1;Sprite_Gauge[_0x6357ea(0x1ca)]['initialize'][_0x6357ea(0x357)](this);},Sprite_HpGauge['prototype']['gaugeX']=function(){return 0x0;},Sprite_HpGauge[_0x16b2b1(0x1ca)][_0x16b2b1(0x57d)]=function(){const _0x184536=_0x16b2b1;this[_0x184536(0x4ee)]['clear']();const _0x1c55ab=this[_0x184536(0x3e9)]();!isNaN(_0x1c55ab)&&this['drawGauge']();};function Sprite_EnemyName(){const _0x12e345=_0x16b2b1;this[_0x12e345(0x77d)](...arguments);}Sprite_EnemyName[_0x16b2b1(0x1ca)]=Object['create'](Sprite_Name[_0x16b2b1(0x1ca)]),Sprite_EnemyName[_0x16b2b1(0x1ca)][_0x16b2b1(0x651)]=Sprite_EnemyName,Sprite_EnemyName[_0x16b2b1(0x1ca)][_0x16b2b1(0x77d)]=function(){const _0x540871=_0x16b2b1;Sprite_Name['prototype']['initialize'][_0x540871(0x357)](this),this[_0x540871(0x3c6)]();},Sprite_EnemyName[_0x16b2b1(0x1ca)][_0x16b2b1(0x5af)]=function(){const _0x36128a=_0x16b2b1;Sprite_Name[_0x36128a(0x1ca)]['initMembers'][_0x36128a(0x357)](this),this['opacity']=0x0,this[_0x36128a(0x1b3)]=null,this[_0x36128a(0x6f0)]['x']=0.5,this['anchor']['y']=0x0;},Sprite_EnemyName[_0x16b2b1(0x1ca)][_0x16b2b1(0x3c6)]=function(){const _0x9feec4=_0x16b2b1;VisuMZ[_0x9feec4(0x4da)][_0x9feec4(0x6ac)][_0x9feec4(0x706)]['NameAttachStateIcon']&&(this['_stateIconSprite']=new Sprite_StateIcon(),this[_0x9feec4(0x7d4)](this['_stateIconSprite']));},Sprite_EnemyName['prototype']['bitmapWidth']=function(){const _0x5b8a84=_0x16b2b1;return Graphics[_0x5b8a84(0x2af)];},Sprite_EnemyName[_0x16b2b1(0x1ca)][_0x16b2b1(0x2dc)]=function(){const _0x575de2=_0x16b2b1;return this[_0x575de2(0x204)]=this[_0x575de2(0x204)]||Window_Base['prototype'][_0x575de2(0x268)]()||0x24,this[_0x575de2(0x204)]*0x4;},Sprite_EnemyName[_0x16b2b1(0x1ca)][_0x16b2b1(0x7c8)]=function(){const _0x15af3e=_0x16b2b1;return VisuMZ['BattleCore']['Settings'][_0x15af3e(0x706)][_0x15af3e(0x8a7)]||$gameSystem[_0x15af3e(0x7e4)]();},Sprite_EnemyName[_0x16b2b1(0x1ca)][_0x16b2b1(0x56e)]=function(_0x292927){const _0x40a74b=_0x16b2b1;this[_0x40a74b(0x1b3)]=_0x292927;},Sprite_EnemyName['prototype'][_0x16b2b1(0x541)]=function(){const _0x3a6fbc=_0x16b2b1;Sprite_Name[_0x3a6fbc(0x1ca)][_0x3a6fbc(0x541)]['call'](this),this[_0x3a6fbc(0x625)](),this[_0x3a6fbc(0x632)](),this[_0x3a6fbc(0x1db)](),this[_0x3a6fbc(0x5c4)]();},Sprite_EnemyName[_0x16b2b1(0x1ca)][_0x16b2b1(0x57d)]=function(){const _0x3a12d4=_0x16b2b1;this[_0x3a12d4(0x51a)]=undefined;const _0x4f803a=this['name'](),_0x3aeea5=this['bitmapWidth'](),_0x5750ae=Window_Base['prototype'][_0x3a12d4(0x268)]();this['setupFont'](),this[_0x3a12d4(0x4ee)]['clear'](),this[_0x3a12d4(0x4ee)][_0x3a12d4(0x1d0)](_0x4f803a,0x0,0x0,_0x3aeea5,_0x5750ae,'center');},Sprite_EnemyName['prototype'][_0x16b2b1(0x625)]=function(){const _0x4e0216=_0x16b2b1;if(!this[_0x4e0216(0x1b3)])return;this['_battler']!==this[_0x4e0216(0x1b3)]['_battler']&&this[_0x4e0216(0x85d)](this[_0x4e0216(0x1b3)][_0x4e0216(0x4e9)]);},Sprite_EnemyName[_0x16b2b1(0x1ca)][_0x16b2b1(0x632)]=function(){const _0x2c0d22=_0x16b2b1;if(!this[_0x2c0d22(0x1b3)])return;this[_0x2c0d22(0x204)]=this[_0x2c0d22(0x204)]||Window_Base['prototype']['lineHeight'](),this['x']=this[_0x2c0d22(0x1b3)]['_baseX'],this['y']=this['_linkedSprite']['_baseY']-this[_0x2c0d22(0x204)]*0.5;const _0x2975cc=VisuMZ[_0x2c0d22(0x4da)][_0x2c0d22(0x6ac)][_0x2c0d22(0x706)];this['x']+=_0x2975cc[_0x2c0d22(0x6f8)]||0x0,this['y']+=_0x2975cc['NameOffsetY']||0x0;},Sprite_EnemyName[_0x16b2b1(0x1ca)][_0x16b2b1(0x1db)]=function(){this['updateStateIconSprite']();},Sprite_EnemyName['prototype'][_0x16b2b1(0x18d)]=function(){const _0x4626af=_0x16b2b1;if(!this[_0x4626af(0x5e3)])return;this[_0x4626af(0x4e9)]!==this[_0x4626af(0x5e3)][_0x4626af(0x4e9)]&&this[_0x4626af(0x5e3)][_0x4626af(0x85d)](this[_0x4626af(0x4e9)]);const _0x57b496=this[_0x4626af(0x3ac)]();this['_lineHeight']=this[_0x4626af(0x204)]||Window_Base[_0x4626af(0x1ca)][_0x4626af(0x268)](),this[_0x4626af(0x5e3)]['x']=Math[_0x4626af(0x855)]((_0x57b496+ImageManager[_0x4626af(0x2e9)])/0x2)+0x8,this[_0x4626af(0x5e3)]['y']=this[_0x4626af(0x204)]/0x2;const _0x3026ea=VisuMZ[_0x4626af(0x4da)]['Settings'][_0x4626af(0x706)];this['_stateIconSprite']['x']+=_0x3026ea['AttachStateOffsetX']||0x0,this[_0x4626af(0x5e3)]['y']+=_0x3026ea[_0x4626af(0x6d5)]||0x0;},Sprite_EnemyName[_0x16b2b1(0x1ca)][_0x16b2b1(0x5c4)]=function(){const _0x5d0a66=_0x16b2b1,_0x2a284c=this['visibilityState']();if(_0x2a284c&&this[_0x5d0a66(0x548)]<0xff)this[_0x5d0a66(0x548)]+=0x10;else!_0x2a284c&&this[_0x5d0a66(0x548)]>0x0&&(this[_0x5d0a66(0x548)]-=0x10);},Sprite_EnemyName['prototype']['visibilityState']=function(){const _0x424afe=_0x16b2b1;if(!this[_0x424afe(0x4e9)])return![];else{if(this['_battler'][_0x424afe(0x8dc)]())return![];else{if(!this['_battler'][_0x424afe(0x7b6)]())return![];else{if(this[_0x424afe(0x8c0)]())return!![];else{if(this['isAlwaysVisible']())return!![];else{if(SceneManager[_0x424afe(0x6b0)][_0x424afe(0x364)]&&SceneManager[_0x424afe(0x6b0)][_0x424afe(0x364)]['active']&&SceneManager[_0x424afe(0x6b0)][_0x424afe(0x364)][_0x424afe(0x331)][_0x424afe(0x3e4)](this[_0x424afe(0x4e9)]))return!![];else{if(this['opacity']>0x0)return![];}}}}}}},Sprite_EnemyName[_0x16b2b1(0x1ca)][_0x16b2b1(0x8c0)]=function(){return![];},Sprite_EnemyName['prototype'][_0x16b2b1(0x3d4)]=function(){const _0x1d55c1=_0x16b2b1;return VisuMZ['BattleCore'][_0x1d55c1(0x6ac)][_0x1d55c1(0x706)][_0x1d55c1(0x6b7)];},Sprite_EnemyName[_0x16b2b1(0x1ca)][_0x16b2b1(0x3ac)]=function(){const _0x5f2ba0=_0x16b2b1;if(!this[_0x5f2ba0(0x4e9)])return 0x0;if(this[_0x5f2ba0(0x51a)])return this[_0x5f2ba0(0x51a)];const _0x4ff7de=this[_0x5f2ba0(0x802)]();return this[_0x5f2ba0(0x8a9)](),this[_0x5f2ba0(0x51a)]=this[_0x5f2ba0(0x4ee)][_0x5f2ba0(0x615)](_0x4ff7de)||0x1,this[_0x5f2ba0(0x51a)];},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x910)]=Sprite_Battleback[_0x16b2b1(0x1ca)][_0x16b2b1(0x488)],Sprite_Battleback[_0x16b2b1(0x1ca)][_0x16b2b1(0x488)]=function(){const _0x890cc=_0x16b2b1,_0x41b246=VisuMZ[_0x890cc(0x4da)][_0x890cc(0x6ac)][_0x890cc(0x5da)];if(!_0x41b246)return VisuMZ[_0x890cc(0x4da)][_0x890cc(0x910)]['call'](this);const _0x1e045d=String(_0x41b246['DefaultStyle'])||'MZ';switch(_0x1e045d){case'MZ':VisuMZ['BattleCore'][_0x890cc(0x910)]['call'](this);break;case _0x890cc(0x8b6):this[_0x890cc(0x496)]();break;case _0x890cc(0x334):this[_0x890cc(0x648)]();break;case'ScaleDown':this[_0x890cc(0x8f7)]();break;case'ScaleUp':this[_0x890cc(0x2fe)]();break;}},Sprite_Battleback[_0x16b2b1(0x1ca)][_0x16b2b1(0x496)]=function(){const _0x32fcec=_0x16b2b1;this[_0x32fcec(0x20c)]=Graphics['width'],this[_0x32fcec(0x86c)]=Graphics[_0x32fcec(0x86c)];const _0x47d2a0=0x1;this[_0x32fcec(0x6aa)]['x']=_0x47d2a0,this[_0x32fcec(0x6aa)]['y']=_0x47d2a0,this['x']=0x0,this['y']=0x0;},Sprite_Battleback[_0x16b2b1(0x1ca)][_0x16b2b1(0x648)]=function(){const _0x50eaa0=_0x16b2b1;this[_0x50eaa0(0x20c)]=Graphics[_0x50eaa0(0x20c)],this[_0x50eaa0(0x86c)]=Graphics[_0x50eaa0(0x86c)];const _0x33d329=this['width']/this[_0x50eaa0(0x4ee)][_0x50eaa0(0x20c)],_0x2f14da=this[_0x50eaa0(0x86c)]/this[_0x50eaa0(0x4ee)][_0x50eaa0(0x86c)],_0x31359d=Math[_0x50eaa0(0x6fa)](_0x33d329,_0x2f14da);this[_0x50eaa0(0x6aa)]['x']=_0x31359d,this['scale']['y']=_0x31359d,this['x']=(Graphics[_0x50eaa0(0x20c)]-this[_0x50eaa0(0x20c)])/0x2,this['y']=Graphics[_0x50eaa0(0x86c)]-this[_0x50eaa0(0x86c)];},Sprite_Battleback[_0x16b2b1(0x1ca)]['adjustPosition_ScaleDown']=function(){const _0x449a2d=_0x16b2b1;this[_0x449a2d(0x20c)]=Graphics[_0x449a2d(0x20c)],this['height']=Graphics[_0x449a2d(0x86c)];const _0x3462a0=Math[_0x449a2d(0x537)](0x1,this[_0x449a2d(0x20c)]/this['bitmap'][_0x449a2d(0x20c)]),_0x2e80c1=Math[_0x449a2d(0x537)](0x1,this[_0x449a2d(0x86c)]/this[_0x449a2d(0x4ee)]['height']),_0x2e299f=Math[_0x449a2d(0x6fa)](_0x3462a0,_0x2e80c1);this[_0x449a2d(0x6aa)]['x']=_0x2e299f,this[_0x449a2d(0x6aa)]['y']=_0x2e299f,this['x']=(Graphics[_0x449a2d(0x20c)]-this[_0x449a2d(0x20c)])/0x2,this['y']=Graphics[_0x449a2d(0x86c)]-this[_0x449a2d(0x86c)];},Sprite_Battleback[_0x16b2b1(0x1ca)]['adjustPosition_ScaleUp']=function(){const _0x52ec35=_0x16b2b1;this['width']=Graphics['width'],this[_0x52ec35(0x86c)]=Graphics[_0x52ec35(0x86c)];const _0x4ad41b=Math['max'](0x1,this[_0x52ec35(0x20c)]/this[_0x52ec35(0x4ee)][_0x52ec35(0x20c)]),_0x1128e6=Math[_0x52ec35(0x6fa)](0x1,this[_0x52ec35(0x86c)]/this[_0x52ec35(0x4ee)][_0x52ec35(0x86c)]),_0x5ed928=Math[_0x52ec35(0x6fa)](_0x4ad41b,_0x1128e6);this['scale']['x']=_0x5ed928,this[_0x52ec35(0x6aa)]['y']=_0x5ed928,this['x']=(Graphics[_0x52ec35(0x20c)]-this['width'])/0x2,this['y']=Graphics[_0x52ec35(0x86c)]-this[_0x52ec35(0x86c)];},Spriteset_Battle['prototype'][_0x16b2b1(0x2dd)]=function(){if(!$gameSystem['isSideView']())return![];return![];},Spriteset_Battle['prototype'][_0x16b2b1(0x1ba)]=function(){return 0x0;},Spriteset_Battle['prototype'][_0x16b2b1(0x85a)]=function(){return 0x0;},VisuMZ['BattleCore'][_0x16b2b1(0x794)]=Spriteset_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x731)],Spriteset_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x731)]=function(){const _0x177eed=_0x16b2b1;VisuMZ[_0x177eed(0x4da)]['Spriteset_Battle_createLowerLayer'][_0x177eed(0x357)](this),this['createWeather'](),this[_0x177eed(0x302)](),this[_0x177eed(0x8cb)]();},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x71b)]=Spriteset_Battle[_0x16b2b1(0x1ca)]['update'],Spriteset_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x541)]=function(){const _0x3369e0=_0x16b2b1;VisuMZ[_0x3369e0(0x4da)]['Spriteset_Battle_update'][_0x3369e0(0x357)](this),this['updateWeather']();},Spriteset_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x1a4)]=function(){const _0x4b39b5=_0x16b2b1;this[_0x4b39b5(0x51f)]=new Weather(),this['_battleField'][_0x4b39b5(0x7d4)](this['_weather']);},Spriteset_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x366)]=function(){const _0x57ca92=_0x16b2b1;this[_0x57ca92(0x51f)][_0x57ca92(0x617)]=$gameScreen['weatherType'](),this[_0x57ca92(0x51f)][_0x57ca92(0x66a)]=$gameScreen[_0x57ca92(0x822)]();},Game_Interpreter[_0x16b2b1(0x1ca)]['command236']=function(_0x565413){const _0x351e3f=_0x16b2b1;$gameScreen['changeWeather'](_0x565413[0x0],_0x565413[0x1],_0x565413[0x2]);if(_0x565413[0x3])this[_0x351e3f(0x7bd)](_0x565413[0x2]);return!![];},VisuMZ['BattleCore'][_0x16b2b1(0x6e4)]=Game_Interpreter[_0x16b2b1(0x1ca)][_0x16b2b1(0x6d2)],Game_Interpreter['prototype'][_0x16b2b1(0x6d2)]=function(_0x3875d1){const _0x9a76ae=_0x16b2b1;return SceneManager[_0x9a76ae(0x7ed)]()?(SceneManager['_scene'][_0x9a76ae(0x7d7)][_0x9a76ae(0x84f)](_0x3875d1[0x0],_0x3875d1[0x1]),!![]):VisuMZ[_0x9a76ae(0x4da)][_0x9a76ae(0x6e4)][_0x9a76ae(0x357)](this,_0x3875d1);},Spriteset_Battle[_0x16b2b1(0x1ca)]['updateBattlebackBitmap']=function(_0x2bce27,_0x1495c0){const _0x5486f9=_0x16b2b1;_0x2bce27[_0x5486f9(0x4ee)]=_0x1495c0;},Spriteset_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x84f)]=function(_0xd45dba,_0x4746f3){const _0x3b9db=_0x16b2b1;_0xd45dba=_0xd45dba||'',_0x4746f3=_0x4746f3||'';_0xd45dba===''&&_0x4746f3===''&&(_0xd45dba=this[_0x3b9db(0x7a6)][_0x3b9db(0x249)](),_0x4746f3=this[_0x3b9db(0x886)][_0x3b9db(0x224)]());const _0x48b001=ImageManager[_0x3b9db(0x879)](_0xd45dba),_0x50eb89=ImageManager[_0x3b9db(0x3c1)](_0x4746f3);_0x48b001[_0x3b9db(0x703)](this[_0x3b9db(0x406)]['bind'](this,this['_back1Sprite'],this['_back2Sprite'],_0x48b001,_0x50eb89));},Spriteset_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x406)]=function(_0x1165f7,_0x4bd033,_0xc29471,_0x4659aa){const _0x53af78=_0x16b2b1;_0x4659aa[_0x53af78(0x703)](this[_0x53af78(0x293)]['bind'](this,_0x1165f7,_0x4bd033,_0xc29471,_0x4659aa));},Spriteset_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x293)]=function(_0x439569,_0x524dd8,_0x182d81,_0x45250d){const _0xd365e1=_0x16b2b1;_0x439569[_0xd365e1(0x4ee)]=_0x182d81,_0x524dd8[_0xd365e1(0x4ee)]=_0x45250d,_0x439569[_0xd365e1(0x488)](),_0x524dd8[_0xd365e1(0x488)]();},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x6b5)]=Spriteset_Battle['prototype'][_0x16b2b1(0x832)],Spriteset_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x832)]=function(){const _0x1e2815=_0x16b2b1;VisuMZ[_0x1e2815(0x4da)][_0x1e2815(0x6b5)][_0x1e2815(0x357)](this),this[_0x1e2815(0x355)]();},Spriteset_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x355)]=function(){const _0x29091e=_0x16b2b1;this['createBattleFieldContainer'](),this[_0x29091e(0x718)](),this[_0x29091e(0x2bf)](),this[_0x29091e(0x887)]();},Spriteset_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x4b8)]=function(){const _0x5cc1a6=_0x16b2b1;this[_0x5cc1a6(0x6dd)]=new Sprite(),this[_0x5cc1a6(0x4b2)]['addChild'](this[_0x5cc1a6(0x6dd)]);},Spriteset_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x718)]=function(){const _0x3e4cc4=_0x16b2b1;this[_0x3e4cc4(0x641)]=new Sprite(),this[_0x3e4cc4(0x4b2)][_0x3e4cc4(0x7d4)](this[_0x3e4cc4(0x641)]);},Spriteset_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x2bf)]=function(){const _0x31133f=_0x16b2b1;this[_0x31133f(0x55a)]=new Sprite(),this[_0x31133f(0x55a)]['x']=this[_0x31133f(0x4b2)]['x'],this[_0x31133f(0x55a)]['y']=this[_0x31133f(0x4b2)]['y'],this[_0x31133f(0x7d4)](this[_0x31133f(0x55a)]);},Spriteset_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x887)]=function(){const _0x3a98d3=_0x16b2b1;if(!this['isFlipped']())return;this[_0x3a98d3(0x6dd)][_0x3a98d3(0x6aa)]['x']=-0x1,this[_0x3a98d3(0x6dd)]['x']=this[_0x3a98d3(0x4b2)][_0x3a98d3(0x20c)],this[_0x3a98d3(0x641)][_0x3a98d3(0x6aa)]['x']=-0x1,this[_0x3a98d3(0x641)]['x']=this['_battleField'][_0x3a98d3(0x20c)],this[_0x3a98d3(0x55a)][_0x3a98d3(0x6aa)]['x']=-0x1,this['_damageContainer']['x']=this[_0x3a98d3(0x4b2)]['x']+this[_0x3a98d3(0x4b2)][_0x3a98d3(0x20c)];},Spriteset_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x8b3)]=function(){const _0x2de3f3=_0x16b2b1;Imported[_0x2de3f3(0x64f)]&&VisuMZ[_0x2de3f3(0x911)][_0x2de3f3(0x6ac)]['UI'][_0x2de3f3(0x42c)]&&this['repositionEnemiesByResolution']();const _0x378704=$gameTroop[_0x2de3f3(0x1ac)](),_0x1e3e6a=[];for(const _0x4be71f of _0x378704){_0x1e3e6a[_0x2de3f3(0x305)](new Sprite_Enemy(_0x4be71f));}_0x1e3e6a[_0x2de3f3(0x495)](this[_0x2de3f3(0x62a)][_0x2de3f3(0x7aa)](this));for(const _0xd839ec of _0x1e3e6a){this[_0x2de3f3(0x6dd)][_0x2de3f3(0x7d4)](_0xd839ec);}this['_enemySprites']=_0x1e3e6a;},Spriteset_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x460)]=function(){const _0x2183e8=_0x16b2b1;this[_0x2183e8(0x42e)]=[];for(let _0x5603e6=0x0;_0x5603e6<$gameParty['maxBattleMembers']();_0x5603e6++){const _0x6772ad=$gameParty[_0x2183e8(0x367)]()[_0x5603e6],_0x20bb9b=new Sprite_Actor();_0x20bb9b['moveToStartPositionBattleCore'](_0x6772ad),_0x20bb9b[_0x2183e8(0x89f)](_0x6772ad),_0x20bb9b[_0x2183e8(0x541)](),this['_actorSprites'][_0x2183e8(0x305)](_0x20bb9b),this['_battlerContainer'][_0x2183e8(0x7d4)](_0x20bb9b);}},Spriteset_Battle['prototype'][_0x16b2b1(0x5c1)]=function(_0x370e95,_0x1fddab,_0x3b956b,_0x328a64){const _0x2f7a4c=_0x16b2b1,_0x19cb9a=this[_0x2f7a4c(0x86b)](_0x1fddab),_0x18c528=new(_0x19cb9a?Sprite_AnimationMV:Sprite_Animation)(),_0x4d13c8=this['makeTargetSprites'](_0x370e95);this[_0x2f7a4c(0x2ef)](_0x370e95[0x0])&&(_0x3b956b=!_0x3b956b),_0x18c528[_0x2f7a4c(0x54e)]=_0x370e95,_0x18c528['setup'](_0x4d13c8,_0x1fddab,_0x3b956b,_0x328a64),this[_0x2f7a4c(0x6c1)](_0x18c528);},Spriteset_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x6c1)]=function(_0xf5b567){const _0x37d9ea=_0x16b2b1;this[_0x37d9ea(0x905)](_0xf5b567)?this[_0x37d9ea(0x3a4)]()[_0x37d9ea(0x7d4)](_0xf5b567):this[_0x37d9ea(0x641)][_0x37d9ea(0x7d4)](_0xf5b567),this[_0x37d9ea(0x361)]['push'](_0xf5b567);},Spriteset_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x905)]=function(_0x274f03){const _0x1b957b=_0x16b2b1;if(!_0x274f03)return![];if(!_0x274f03[_0x1b957b(0x363)])return![];if(_0x274f03[_0x1b957b(0x363)][_0x1b957b(0x234)]!==0x0)return![];if(!_0x274f03['targetObjects'][0x0])return![];if(!_0x274f03[_0x1b957b(0x54e)][0x0][_0x1b957b(0x68f)]())return![];if($gameSystem[_0x1b957b(0x5a0)]())return![];if(!this['battleStatusWindowAnimationContainer']())return![];return Window_BattleStatus[_0x1b957b(0x1ca)]['battleLayoutStyle']()===_0x1b957b(0x89b);},Spriteset_Battle['prototype']['battleStatusWindowAnimationContainer']=function(){const _0x3aa719=_0x16b2b1;if(!SceneManager[_0x3aa719(0x6b0)])return;if(!SceneManager['_scene'][_0x3aa719(0x7a4)])return;if(!SceneManager[_0x3aa719(0x6b0)][_0x3aa719(0x7a4)]['_effectsContainer'])return;return SceneManager[_0x3aa719(0x6b0)][_0x3aa719(0x7a4)][_0x3aa719(0x4c7)];},Spriteset_Battle[_0x16b2b1(0x1ca)]['removeAnimation']=function(_0x214aea){const _0x5ed8fc=_0x16b2b1;this[_0x5ed8fc(0x55f)](_0x214aea);for(const _0xee692f of _0x214aea['targetObjects']){_0xee692f[_0x5ed8fc(0x654)]&&_0xee692f[_0x5ed8fc(0x654)]();}_0x214aea['destroy']();},Spriteset_Battle[_0x16b2b1(0x1ca)]['removeAnimationFromContainer']=function(_0x199bd7){const _0x74de9f=_0x16b2b1;this[_0x74de9f(0x361)][_0x74de9f(0x94d)](_0x199bd7),this[_0x74de9f(0x905)](_0x199bd7)?this[_0x74de9f(0x3a4)]()['removeChild'](_0x199bd7):this[_0x74de9f(0x641)]['removeChild'](_0x199bd7);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x673)]=Spriteset_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x941)],Spriteset_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x941)]=function(){const _0x52904d=_0x16b2b1;VisuMZ[_0x52904d(0x4da)]['Spriteset_Battle_updateActors'][_0x52904d(0x357)](this),this[_0x52904d(0x675)]();},Spriteset_Battle['prototype'][_0x16b2b1(0x675)]=function(){const _0x1fd673=_0x16b2b1;this[_0x1fd673(0x6dd)][_0x1fd673(0x57a)][_0x1fd673(0x495)](this[_0x1fd673(0x4d9)]['bind'](this)),this[_0x1fd673(0x928)]();},Spriteset_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x4d9)]=function(_0x1b5fc8,_0xb08898){const _0x476b4b=_0x16b2b1;if(VisuMZ[_0x476b4b(0x4da)]['Settings'][_0x476b4b(0x435)][_0x476b4b(0x823)]){if(_0x1b5fc8['_battler']&&_0xb08898[_0x476b4b(0x4e9)]){if(_0x1b5fc8[_0x476b4b(0x4e9)][_0x476b4b(0x68f)]()&&_0xb08898[_0x476b4b(0x4e9)][_0x476b4b(0x73f)]())return 0x1;else{if(_0xb08898['_battler'][_0x476b4b(0x68f)]()&&_0x1b5fc8['_battler'][_0x476b4b(0x73f)]())return-0x1;}}}return _0x1b5fc8[_0x476b4b(0x19e)]!==_0xb08898[_0x476b4b(0x19e)]?_0x1b5fc8[_0x476b4b(0x19e)]-_0xb08898['_baseY']:_0xb08898[_0x476b4b(0x3b9)]-_0x1b5fc8['spriteId'];},Spriteset_Battle[_0x16b2b1(0x1ca)]['putActiveBattlerOnTop']=function(){const _0x321785=_0x16b2b1;if(!VisuMZ['BattleCore'][_0x321785(0x6ac)][_0x321785(0x435)]['PrioritySortActive'])return;const _0x501a65=BattleManager[_0x321785(0x8ff)];if(_0x501a65){if(_0x501a65['isActor']()&&!$gameSystem[_0x321785(0x5a0)]())return;const _0x46d173=_0x501a65[_0x321785(0x4e0)]();if(_0x46d173&&_0x501a65[_0x321785(0x68f)]())this[_0x321785(0x6dd)][_0x321785(0x7d4)](_0x46d173);}},Spriteset_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x940)]=function(){const _0x382c64=_0x16b2b1;for(const _0x47f10a of $gameParty[_0x382c64(0x25b)]()){if(!_0x47f10a)continue;if(!_0x47f10a[_0x382c64(0x4e0)]())continue;_0x47f10a[_0x382c64(0x4e0)]()[_0x382c64(0x793)]=!![],_0x47f10a[_0x382c64(0x4e0)]()[_0x382c64(0x27a)]();}},Spriteset_Battle[_0x16b2b1(0x1ca)]['createUIContainer']=function(){const _0x16b2db=_0x16b2b1;this[_0x16b2db(0x321)]=new Sprite(),this[_0x16b2db(0x4b2)][_0x16b2db(0x7d4)](this['_uiContainer']);},Spriteset_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x8cb)]=function(){const _0x3cc7f2=_0x16b2b1;if(VisuMZ[_0x3cc7f2(0x4da)][_0x3cc7f2(0x6ac)]['Enemy'][_0x3cc7f2(0x1e8)])return;this[_0x3cc7f2(0x954)]=new Sprite(),this['_uiContainer']['addChild'](this[_0x3cc7f2(0x954)]);for(const _0x5299a7 of this['_enemySprites']){const _0x4d5fb1=new Sprite_EnemyName();this[_0x3cc7f2(0x954)]['addChild'](_0x4d5fb1),_0x4d5fb1[_0x3cc7f2(0x56e)](_0x5299a7);}},Spriteset_Battle[_0x16b2b1(0x1ca)]['isBusy']=function(){return![];},Spriteset_Battle[_0x16b2b1(0x1ca)]['isAnyoneFloating']=function(){const _0x51e0a0=_0x16b2b1;return this['battlerSprites']()[_0x51e0a0(0x324)](_0x5b8380=>_0x5b8380['isFloating']());},Spriteset_Battle['prototype'][_0x16b2b1(0x39e)]=function(){const _0x529796=_0x16b2b1;return this[_0x529796(0x5a2)]()[_0x529796(0x324)](_0x56f2e6=>_0x56f2e6[_0x529796(0x93e)]());},Spriteset_Battle[_0x16b2b1(0x1ca)]['isAnyoneGrowing']=function(){const _0x5c7bf4=_0x16b2b1;return this[_0x5c7bf4(0x5a2)]()[_0x5c7bf4(0x324)](_0x2b3b9b=>_0x2b3b9b[_0x5c7bf4(0x7a7)]());},Spriteset_Battle['prototype'][_0x16b2b1(0x3f3)]=function(){const _0x6ca516=_0x16b2b1;return this[_0x6ca516(0x5a2)]()[_0x6ca516(0x324)](_0x4165dc=>_0x4165dc[_0x6ca516(0x8c7)]());},Spriteset_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x22a)]=function(){const _0x3491c0=_0x16b2b1;return this[_0x3491c0(0x5a2)]()[_0x3491c0(0x324)](_0x1edc92=>_0x1edc92[_0x3491c0(0x89a)]());},Spriteset_Battle[_0x16b2b1(0x1ca)][_0x16b2b1(0x616)]=function(){const _0x3cb1a0=_0x16b2b1;return this['battlerSprites']()[_0x3cb1a0(0x324)](_0x883c3=>_0x883c3[_0x3cb1a0(0x652)]());},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x734)]=Window_ItemList[_0x16b2b1(0x1ca)][_0x16b2b1(0x326)],Window_ItemList[_0x16b2b1(0x1ca)][_0x16b2b1(0x326)]=function(){const _0x4931fa=_0x16b2b1;return SceneManager[_0x4931fa(0x7ed)]()?SceneManager[_0x4931fa(0x6b0)][_0x4931fa(0x860)]()===_0x4931fa(0x369)?VisuMZ['BattleCore'][_0x4931fa(0x6ac)]['BattleLayout']['SkillItemBorderCols']:VisuMZ[_0x4931fa(0x4da)][_0x4931fa(0x6ac)]['BattleLayout'][_0x4931fa(0x45d)]:VisuMZ['BattleCore'][_0x4931fa(0x734)][_0x4931fa(0x357)](this);},VisuMZ[_0x16b2b1(0x4da)]['Window_SkillList_maxCols']=Window_SkillList[_0x16b2b1(0x1ca)]['maxCols'],Window_SkillList[_0x16b2b1(0x1ca)][_0x16b2b1(0x326)]=function(){const _0x3e9106=_0x16b2b1;return SceneManager[_0x3e9106(0x7ed)]()?SceneManager['_scene'][_0x3e9106(0x860)]()==='border'?VisuMZ[_0x3e9106(0x4da)][_0x3e9106(0x6ac)][_0x3e9106(0x8ec)]['SkillItemBorderCols']:VisuMZ[_0x3e9106(0x4da)][_0x3e9106(0x6ac)][_0x3e9106(0x8ec)][_0x3e9106(0x45d)]:VisuMZ['BattleCore'][_0x3e9106(0x3ea)][_0x3e9106(0x357)](this);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x1b2)]=Window_Options['prototype'][_0x16b2b1(0x95e)],Window_Options[_0x16b2b1(0x1ca)][_0x16b2b1(0x95e)]=function(){const _0x55ab66=_0x16b2b1;VisuMZ[_0x55ab66(0x4da)][_0x55ab66(0x1b2)][_0x55ab66(0x357)](this),this[_0x55ab66(0x46d)](),this[_0x55ab66(0x921)]();},Window_Options['prototype'][_0x16b2b1(0x46d)]=function(){const _0x1b9283=_0x16b2b1;VisuMZ[_0x1b9283(0x4da)][_0x1b9283(0x6ac)][_0x1b9283(0x352)][_0x1b9283(0x57c)]&&(this[_0x1b9283(0x5c2)](),this[_0x1b9283(0x468)]());},Window_Options[_0x16b2b1(0x1ca)][_0x16b2b1(0x921)]=function(){const _0x39acf0=_0x16b2b1;if(!VisuMZ[_0x39acf0(0x4da)][_0x39acf0(0x6ac)][_0x39acf0(0x573)][_0x39acf0(0x3f2)])return;const _0x551718=TextManager[_0x39acf0(0x65c)],_0x34e243='visualHpGauge';this['addCommand'](_0x551718,_0x34e243);},Window_Options[_0x16b2b1(0x1ca)][_0x16b2b1(0x5c2)]=function(){const _0x3dd4bb=_0x16b2b1,_0x460c23=TextManager[_0x3dd4bb(0x6db)],_0x22f911=_0x3dd4bb(0x3ce);this[_0x3dd4bb(0x84e)](_0x460c23,_0x22f911);},Window_Options[_0x16b2b1(0x1ca)][_0x16b2b1(0x468)]=function(){const _0x4419d9=_0x16b2b1,_0x2ffe4c=TextManager['autoBattleStyle'],_0xa6881a=_0x4419d9(0x395);this[_0x4419d9(0x84e)](_0x2ffe4c,_0xa6881a);},VisuMZ['BattleCore'][_0x16b2b1(0x75c)]=Window_Options[_0x16b2b1(0x1ca)][_0x16b2b1(0x59a)],Window_Options[_0x16b2b1(0x1ca)][_0x16b2b1(0x59a)]=function(_0x1b4493){const _0x352e57=_0x16b2b1,_0x398f8d=this[_0x352e57(0x4bd)](_0x1b4493);return _0x398f8d==='autoBattleUseSkills'?this[_0x352e57(0x28b)]():VisuMZ[_0x352e57(0x4da)][_0x352e57(0x75c)][_0x352e57(0x357)](this,_0x1b4493);},Window_Options[_0x16b2b1(0x1ca)]['statusTextAutoBattleStyle']=function(){const _0x3ae691=_0x16b2b1,_0x4f47e9=VisuMZ[_0x3ae691(0x4da)]['Settings'][_0x3ae691(0x352)],_0x149dca=this[_0x3ae691(0x48b)](_0x3ae691(0x395));return _0x149dca?_0x4f47e9[_0x3ae691(0x570)]:_0x4f47e9[_0x3ae691(0x262)];},Window_ShopStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x47e)]=function(){const _0x5835ec=_0x16b2b1,_0x1bfd80=DataManager[_0x5835ec(0x942)](this['_item']),_0x2b9482=VisuMZ['DamageStyles'][_0x1bfd80];if(!_0x2b9482)return this[_0x5835ec(0x1e3)]();const _0x45e600=_0x5835ec(0x824)['format'](this[_0x5835ec(0x33e)][_0x5835ec(0x271)][_0x5835ec(0x617)]),_0x515258=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x5835ec(0x33e)][_0x5835ec(0x271)][_0x5835ec(0x617)]];return _0x2b9482[_0x45e600][_0x5835ec(0x742)](_0x515258);},Window_ShopStatus['prototype']['getItemDamageAmountTextBattleCore']=function(){const _0x4c94d8=_0x16b2b1,_0x34c979=DataManager[_0x4c94d8(0x942)](this[_0x4c94d8(0x33e)]),_0x2e4eaf=VisuMZ['DamageStyles'][_0x34c979];if(!_0x2e4eaf)return this[_0x4c94d8(0x52d)]();return _0x2e4eaf[_0x4c94d8(0x4d7)][_0x4c94d8(0x357)](this);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x86a)]=Window_PartyCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x77d)],Window_PartyCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x77d)]=function(_0x42a338){const _0x3a5e66=_0x16b2b1;VisuMZ[_0x3a5e66(0x4da)]['Window_PartyCommand_initialize'][_0x3a5e66(0x357)](this,_0x42a338),this[_0x3a5e66(0x7cf)](_0x42a338);},Window_PartyCommand['prototype'][_0x16b2b1(0x7cf)]=function(_0x1615a7){const _0x3a7916=_0x16b2b1,_0x117e34=new Rectangle(0x0,0x0,_0x1615a7[_0x3a7916(0x20c)],_0x1615a7[_0x3a7916(0x86c)]);this[_0x3a7916(0x1e1)]=new Window_Base(_0x117e34),this['_commandNameWindow'][_0x3a7916(0x548)]=0x0,this[_0x3a7916(0x7d4)](this['_commandNameWindow']),this[_0x3a7916(0x729)]();},Window_PartyCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x684)]=function(){const _0x110ded=_0x16b2b1;Window_Command[_0x110ded(0x1ca)][_0x110ded(0x684)][_0x110ded(0x357)](this);if(this[_0x110ded(0x1e1)])this[_0x110ded(0x729)]();},Window_PartyCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x729)]=function(){const _0x278f9e=_0x16b2b1,_0x2424e1=this[_0x278f9e(0x1e1)];_0x2424e1[_0x278f9e(0x394)]['clear']();const _0xcd8f=this[_0x278f9e(0x2c6)](this['index']());if(_0xcd8f===_0x278f9e(0x41a)&&this['maxItems']()>0x0){const _0x2a175a=this[_0x278f9e(0x867)](this[_0x278f9e(0x2ba)]());let _0x53074d=this[_0x278f9e(0x95d)](this[_0x278f9e(0x2ba)]());_0x53074d=_0x53074d[_0x278f9e(0x702)](/\\I\[(\d+)\]/gi,''),_0x2424e1[_0x278f9e(0x6c7)](),this[_0x278f9e(0x815)](_0x53074d,_0x2a175a),this[_0x278f9e(0x3b6)](_0x53074d,_0x2a175a),this[_0x278f9e(0x804)](_0x53074d,_0x2a175a);}},Window_PartyCommand['prototype'][_0x16b2b1(0x815)]=function(_0x107c45,_0x226508){},Window_PartyCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x3b6)]=function(_0x5bf579,_0x2ccac9){const _0x402cd2=_0x16b2b1,_0xd7842d=this[_0x402cd2(0x1e1)];_0xd7842d[_0x402cd2(0x1d0)](_0x5bf579,0x0,_0x2ccac9['y'],_0xd7842d[_0x402cd2(0x54f)],'center');},Window_PartyCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x804)]=function(_0x51f8a9,_0x284246){const _0x3f0022=_0x16b2b1,_0x63bb1a=this[_0x3f0022(0x1e1)],_0x32775b=$gameSystem[_0x3f0022(0x65b)](),_0x352d42=_0x284246['x']+Math[_0x3f0022(0x3db)](_0x284246[_0x3f0022(0x20c)]/0x2)+_0x32775b;_0x63bb1a['x']=_0x63bb1a[_0x3f0022(0x20c)]/-0x2+_0x352d42,_0x63bb1a['y']=Math['floor'](_0x284246[_0x3f0022(0x86c)]/0x2);},Window_PartyCommand[_0x16b2b1(0x1ca)]['makeCommandList']=function(){const _0x3c1be9=_0x16b2b1;this[_0x3c1be9(0x819)](),this[_0x3c1be9(0x3cd)](),this[_0x3c1be9(0x598)](),this[_0x3c1be9(0x5ea)](),this[_0x3c1be9(0x5ac)]();},Window_PartyCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x819)]=function(){const _0xe5c4d7=_0x16b2b1,_0x2a4825=this['commandStyle'](),_0x3d7d7b=VisuMZ[_0xe5c4d7(0x4da)]['Settings'][_0xe5c4d7(0x47a)][_0xe5c4d7(0x3b8)],_0x840b9d=_0x2a4825===_0xe5c4d7(0x63a)?TextManager[_0xe5c4d7(0x7ec)]:_0xe5c4d7(0x664)[_0xe5c4d7(0x742)](_0x3d7d7b,TextManager[_0xe5c4d7(0x7ec)]),_0x4693f6=this[_0xe5c4d7(0x74b)]();this['addCommand'](_0x840b9d,_0xe5c4d7(0x7ec),_0x4693f6);},Window_PartyCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x74b)]=function(){return!![];},Window_PartyCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x3cd)]=function(){const _0x3003d6=_0x16b2b1;if(!this[_0x3003d6(0x93f)]())return;const _0x3f9dab=this[_0x3003d6(0x94e)](),_0x4fbf5d=VisuMZ[_0x3003d6(0x4da)][_0x3003d6(0x6ac)][_0x3003d6(0x47a)][_0x3003d6(0x51e)],_0x4cb756=_0x3f9dab===_0x3003d6(0x63a)?TextManager['autoBattle']:'\x5cI[%1]%2'[_0x3003d6(0x742)](_0x4fbf5d,TextManager[_0x3003d6(0x787)]),_0x405163=this[_0x3003d6(0x7d0)]();this['addCommand'](_0x4cb756,_0x3003d6(0x787),_0x405163);},Window_PartyCommand['prototype'][_0x16b2b1(0x93f)]=function(){const _0x51060f=_0x16b2b1;return VisuMZ[_0x51060f(0x4da)][_0x51060f(0x6ac)][_0x51060f(0x47a)][_0x51060f(0x7c0)];},Window_PartyCommand[_0x16b2b1(0x1ca)]['isAutoBattleCommandEnabled']=function(){return!![];},Window_PartyCommand['prototype'][_0x16b2b1(0x598)]=function(){},Window_PartyCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x5ea)]=function(){const _0x4b2616=_0x16b2b1;if(!this[_0x4b2616(0x3bf)]())return;const _0x41f7f8=this['commandStyle'](),_0x3bcefd=VisuMZ[_0x4b2616(0x4da)][_0x4b2616(0x6ac)][_0x4b2616(0x47a)][_0x4b2616(0x6ae)],_0x2b484e=_0x41f7f8===_0x4b2616(0x63a)?TextManager[_0x4b2616(0x3a7)]:_0x4b2616(0x664)[_0x4b2616(0x742)](_0x3bcefd,TextManager[_0x4b2616(0x3a7)]),_0x39403c=this[_0x4b2616(0x657)]();this[_0x4b2616(0x84e)](_0x2b484e,_0x4b2616(0x3a7),_0x39403c);},Window_PartyCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x3bf)]=function(){const _0x5d5372=_0x16b2b1;return VisuMZ['BattleCore'][_0x5d5372(0x6ac)][_0x5d5372(0x47a)]['CommandAddOptions'];},Window_PartyCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x657)]=function(){return!![];},Window_PartyCommand['prototype'][_0x16b2b1(0x5ac)]=function(){const _0x51588c=_0x16b2b1,_0x5eb98b=this[_0x51588c(0x94e)](),_0x1a1ea0=VisuMZ[_0x51588c(0x4da)][_0x51588c(0x6ac)]['PartyCmd']['CmdIconEscape'],_0x303945=_0x5eb98b==='text'?TextManager[_0x51588c(0x214)]:_0x51588c(0x664)[_0x51588c(0x742)](_0x1a1ea0,TextManager[_0x51588c(0x214)]),_0x5f9379=this[_0x51588c(0x7f6)]();this['addCommand'](_0x303945,_0x51588c(0x214),_0x5f9379);},Window_PartyCommand['prototype'][_0x16b2b1(0x7f6)]=function(){const _0x2f9dba=_0x16b2b1;return BattleManager[_0x2f9dba(0x50d)]();},Window_PartyCommand[_0x16b2b1(0x1ca)]['itemTextAlign']=function(){const _0x204ae0=_0x16b2b1;return VisuMZ[_0x204ae0(0x4da)][_0x204ae0(0x6ac)][_0x204ae0(0x47a)][_0x204ae0(0x80c)];},Window_PartyCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x3f8)]=function(_0x1f72d9){const _0x3cb8b9=_0x16b2b1,_0x4b524f=this[_0x3cb8b9(0x2c6)](_0x1f72d9);if(_0x4b524f===_0x3cb8b9(0x517))this[_0x3cb8b9(0x266)](_0x1f72d9);else _0x4b524f===_0x3cb8b9(0x41a)?this[_0x3cb8b9(0x4a0)](_0x1f72d9):Window_Command[_0x3cb8b9(0x1ca)]['drawItem']['call'](this,_0x1f72d9);},Window_PartyCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x94e)]=function(){const _0x1aa22f=_0x16b2b1;return VisuMZ[_0x1aa22f(0x4da)][_0x1aa22f(0x6ac)][_0x1aa22f(0x47a)][_0x1aa22f(0x4d1)];},Window_PartyCommand['prototype']['commandStyleCheck']=function(_0x42b723){const _0x2582a7=_0x16b2b1;if(_0x42b723<0x0)return _0x2582a7(0x63a);const _0x5af847=this[_0x2582a7(0x94e)]();if(_0x5af847!==_0x2582a7(0x85e))return _0x5af847;else{if(this[_0x2582a7(0x520)]()>0x0){const _0x1c40ee=this[_0x2582a7(0x95d)](_0x42b723);if(_0x1c40ee[_0x2582a7(0x6ef)](/\\I\[(\d+)\]/i)){const _0x3db3da=this[_0x2582a7(0x867)](_0x42b723),_0x576093=this[_0x2582a7(0x260)](_0x1c40ee)[_0x2582a7(0x20c)];return _0x576093<=_0x3db3da[_0x2582a7(0x20c)]?_0x2582a7(0x517):_0x2582a7(0x41a);}}}return _0x2582a7(0x63a);},Window_PartyCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x266)]=function(_0x48d013){const _0x25be5b=_0x16b2b1,_0x11b668=this[_0x25be5b(0x867)](_0x48d013),_0x51aee7=this[_0x25be5b(0x95d)](_0x48d013),_0x3296e6=this[_0x25be5b(0x260)](_0x51aee7)[_0x25be5b(0x20c)];this['changePaintOpacity'](this[_0x25be5b(0x26c)](_0x48d013));const _0x254578=this[_0x25be5b(0x68d)]();if(_0x254578===_0x25be5b(0x33f))this['drawTextEx'](_0x51aee7,_0x11b668['x']+_0x11b668[_0x25be5b(0x20c)]-_0x3296e6,_0x11b668['y'],_0x3296e6);else{if(_0x254578==='center'){const _0x31a93b=_0x11b668['x']+Math['floor']((_0x11b668[_0x25be5b(0x20c)]-_0x3296e6)/0x2);this[_0x25be5b(0x94c)](_0x51aee7,_0x31a93b,_0x11b668['y'],_0x3296e6);}else this[_0x25be5b(0x94c)](_0x51aee7,_0x11b668['x'],_0x11b668['y'],_0x3296e6);}},Window_PartyCommand[_0x16b2b1(0x1ca)]['drawItemStyleIcon']=function(_0x4d8917){const _0x3e6f92=_0x16b2b1;this[_0x3e6f92(0x95d)](_0x4d8917)['match'](/\\I\[(\d+)\]/i);const _0x591b31=Number(RegExp['$1'])||0x0,_0xebbe00=this[_0x3e6f92(0x867)](_0x4d8917),_0xd1462=_0xebbe00['x']+Math[_0x3e6f92(0x3db)]((_0xebbe00[_0x3e6f92(0x20c)]-ImageManager['iconWidth'])/0x2),_0x4663b1=_0xebbe00['y']+(_0xebbe00[_0x3e6f92(0x86c)]-ImageManager['iconHeight'])/0x2;this[_0x3e6f92(0x1d8)](_0x591b31,_0xd1462,_0x4663b1);},Window_PartyCommand['prototype']['hide']=function(){},Window_PartyCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x8ad)]=function(){const _0x146a03=_0x16b2b1;Window_Command[_0x146a03(0x1ca)][_0x146a03(0x8ad)][_0x146a03(0x357)](this);const _0x2c66b2=this['battleLayoutStyle']();_0x2c66b2==='border'&&this['showHelpWindow']();},Window_PartyCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x860)]=function(){const _0x5c4d71=_0x16b2b1;if(this[_0x5c4d71(0x391)])return this[_0x5c4d71(0x391)];return this[_0x5c4d71(0x391)]=SceneManager[_0x5c4d71(0x6b0)]['battleLayoutStyle'](),this[_0x5c4d71(0x391)];},Window_PartyCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x6ad)]=function(){const _0x2f3201=_0x16b2b1,_0x2835fe=VisuMZ[_0x2f3201(0x4da)][_0x2f3201(0x6ac)]['PartyCmd'],_0x43c2b1=this['currentSymbol']();switch(_0x43c2b1){case _0x2f3201(0x7ec):this[_0x2f3201(0x8cd)][_0x2f3201(0x24b)](_0x2835fe[_0x2f3201(0x5f4)]);break;case _0x2f3201(0x787):this['_helpWindow'][_0x2f3201(0x24b)](_0x2835fe[_0x2f3201(0x1cd)]);break;case _0x2f3201(0x3a7):this[_0x2f3201(0x8cd)][_0x2f3201(0x24b)](_0x2835fe['HelpOptions']);break;case _0x2f3201(0x214):this[_0x2f3201(0x8cd)][_0x2f3201(0x24b)](_0x2835fe['HelpEscape']);break;default:this[_0x2f3201(0x8cd)][_0x2f3201(0x24b)]('');break;}},VisuMZ[_0x16b2b1(0x4da)]['Window_ActorCommand_initialize']=Window_ActorCommand['prototype']['initialize'],Window_ActorCommand[_0x16b2b1(0x1ca)]['initialize']=function(_0x3349d4){const _0x19af85=_0x16b2b1;VisuMZ[_0x19af85(0x4da)][_0x19af85(0x5cc)][_0x19af85(0x357)](this,_0x3349d4),this[_0x19af85(0x7cf)](_0x3349d4);},Window_ActorCommand[_0x16b2b1(0x1ca)]['createCommandNameWindow']=function(_0x2efe83){const _0x2cb847=_0x16b2b1,_0x4b9a3f=new Rectangle(0x0,0x0,_0x2efe83[_0x2cb847(0x20c)],_0x2efe83[_0x2cb847(0x86c)]);this[_0x2cb847(0x1e1)]=new Window_Base(_0x4b9a3f),this[_0x2cb847(0x1e1)][_0x2cb847(0x548)]=0x0,this[_0x2cb847(0x7d4)](this[_0x2cb847(0x1e1)]),this[_0x2cb847(0x729)]();},Window_ActorCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x684)]=function(){const _0x44af6d=_0x16b2b1;Window_Command['prototype'][_0x44af6d(0x684)][_0x44af6d(0x357)](this);if(this['_commandNameWindow'])this[_0x44af6d(0x729)]();},Window_ActorCommand[_0x16b2b1(0x1ca)]['updateCommandNameWindow']=function(){const _0x523790=_0x16b2b1,_0x31f791=this['_commandNameWindow'];_0x31f791['contents'][_0x523790(0x7e7)]();const _0x3e1184=this[_0x523790(0x2c6)](this[_0x523790(0x2ba)]());if(_0x3e1184===_0x523790(0x41a)&&this['maxItems']()>0x0){const _0x3fa348=this[_0x523790(0x867)](this[_0x523790(0x2ba)]());let _0x40bad5=this[_0x523790(0x95d)](this[_0x523790(0x2ba)]());_0x40bad5=_0x40bad5[_0x523790(0x702)](/\\I\[(\d+)\]/gi,''),_0x31f791['resetFontSettings'](),this[_0x523790(0x815)](_0x40bad5,_0x3fa348),this[_0x523790(0x3b6)](_0x40bad5,_0x3fa348),this['commandNameWindowCenter'](_0x40bad5,_0x3fa348);}},Window_ActorCommand[_0x16b2b1(0x1ca)]['commandNameWindowDrawBackground']=function(_0x464db7,_0x59df1b){},Window_ActorCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x3b6)]=function(_0x2d24b2,_0xa04feb){const _0x394f87=_0x16b2b1,_0x2dfbd2=this['_commandNameWindow'];_0x2dfbd2[_0x394f87(0x1d0)](_0x2d24b2,0x0,_0xa04feb['y'],_0x2dfbd2['innerWidth'],_0x394f87(0x6bb));},Window_ActorCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x804)]=function(_0x55db13,_0x204c41){const _0x25aa2d=_0x16b2b1,_0x2cbca9=this[_0x25aa2d(0x1e1)],_0x5c8d17=$gameSystem[_0x25aa2d(0x65b)](),_0x31bca1=_0x204c41['x']+Math['floor'](_0x204c41['width']/0x2)+_0x5c8d17;_0x2cbca9['x']=_0x2cbca9[_0x25aa2d(0x20c)]/-0x2+_0x31bca1,_0x2cbca9['y']=Math['floor'](_0x204c41[_0x25aa2d(0x86c)]/0x2);},Window_ActorCommand['prototype'][_0x16b2b1(0x64b)]=function(){const _0x18a724=_0x16b2b1;if(!this[_0x18a724(0x6df)])return;const _0x13ea6a=this[_0x18a724(0x6df)][_0x18a724(0x8ab)]();for(const _0x300ab1 of _0x13ea6a){this[_0x18a724(0x3b7)](_0x300ab1[_0x18a724(0x2b1)]()['trim']());}},Window_ActorCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x3b7)]=function(_0x34a154){const _0x4aef46=_0x16b2b1;_0x34a154===_0x4aef46(0x7bf)&&this['addAttackCommand']();[_0x4aef46(0x877),'SKILLS']['includes'](_0x34a154)&&this[_0x4aef46(0x733)]();_0x34a154===_0x4aef46(0x1f6)&&this[_0x4aef46(0x232)]();_0x34a154===_0x4aef46(0x6ce)&&this[_0x4aef46(0x88e)]();_0x34a154==='ESCAPE'&&this['addEscapeCommand']();_0x34a154===_0x4aef46(0x951)&&this[_0x4aef46(0x3cd)]();if(_0x34a154[_0x4aef46(0x6ef)](/STYPE: (\d+)/i)){const _0x1b52d2=Number(RegExp['$1']);this[_0x4aef46(0x5ae)](_0x1b52d2);}else{if(_0x34a154[_0x4aef46(0x6ef)](/STYPE: (.*)/i)){const _0x5ec005=DataManager[_0x4aef46(0x715)](RegExp['$1']);this['addSkillTypeCommand'](_0x5ec005);}}_0x34a154===_0x4aef46(0x3ae)&&this[_0x4aef46(0x246)]();if(_0x34a154[_0x4aef46(0x6ef)](/SKILL: (\d+)/i)){const _0xd8dd56=Number(RegExp['$1']);this[_0x4aef46(0x368)]($dataSkills[_0xd8dd56]);}else{if(_0x34a154[_0x4aef46(0x6ef)](/SKILL: (.*)/i)){const _0x42d04a=DataManager[_0x4aef46(0x93c)](RegExp['$1']);this['addSingleSkillCommand']($dataSkills[_0x42d04a]);}}_0x34a154==='PARTY'&&Imported[_0x4aef46(0x49e)]&&this[_0x4aef46(0x7eb)](),['COMBATLOG','COMBAT\x20LOG'][_0x4aef46(0x3e4)](_0x34a154)&&Imported['VisuMZ_4_CombatLog']&&this[_0x4aef46(0x2b9)](),_0x34a154===_0x4aef46(0x359)&&Imported['VisuMZ_2_WeaponSwapSystem']&&this[_0x4aef46(0x2ec)](!![]);},Window_ActorCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x21b)]=function(){const _0x1efbc3=_0x16b2b1,_0x808de8=$dataSkills[this[_0x1efbc3(0x6df)][_0x1efbc3(0x65a)]()];if(!_0x808de8)return;if(!this['canAddSkillCommand'](_0x808de8))return;const _0x5cb25c=this[_0x1efbc3(0x94e)](),_0x13f6e7=DataManager[_0x1efbc3(0x280)](_0x808de8),_0x353dbf=DataManager[_0x1efbc3(0x6f1)](_0x808de8),_0x3d416e=_0x5cb25c===_0x1efbc3(0x63a)?_0x13f6e7:_0x1efbc3(0x664)[_0x1efbc3(0x742)](_0x353dbf,_0x13f6e7);this[_0x1efbc3(0x84e)](_0x3d416e,_0x1efbc3(0x63c),this[_0x1efbc3(0x6df)][_0x1efbc3(0x65e)]());},Window_ActorCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x232)]=function(){const _0x374112=_0x16b2b1,_0x225eee=$dataSkills[this[_0x374112(0x6df)][_0x374112(0x91a)]()];if(!_0x225eee)return;if(!this[_0x374112(0x28a)](_0x225eee))return;const _0x128c20=this[_0x374112(0x94e)](),_0x3e59c2=DataManager['battleCommandName'](_0x225eee),_0x1c1a06=DataManager[_0x374112(0x6f1)](_0x225eee),_0x431017=_0x128c20==='text'?_0x3e59c2:'\x5cI[%1]%2'['format'](_0x1c1a06,_0x3e59c2);this[_0x374112(0x84e)](_0x431017,_0x374112(0x483),this[_0x374112(0x6df)][_0x374112(0x1b5)]());},Window_ActorCommand[_0x16b2b1(0x1ca)]['addItemCommand']=function(){const _0x40c5f5=_0x16b2b1,_0x4a3744=this[_0x40c5f5(0x94e)](),_0x3905f6=VisuMZ['BattleCore'][_0x40c5f5(0x6ac)][_0x40c5f5(0x199)]['CmdIconItem'],_0x148acd=_0x4a3744===_0x40c5f5(0x63a)?TextManager['item']:_0x40c5f5(0x664)[_0x40c5f5(0x742)](_0x3905f6,TextManager[_0x40c5f5(0x3e3)]),_0x2cc027=this[_0x40c5f5(0x1c3)]();this[_0x40c5f5(0x84e)](_0x148acd,'item',_0x2cc027);},Window_ActorCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x1c3)]=function(){const _0x32025a=_0x16b2b1;return this[_0x32025a(0x6df)]&&this['_actor'][_0x32025a(0x322)]();},Window_ActorCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x733)]=function(){const _0x57de25=_0x16b2b1,_0x31c727=this['_actor'][_0x57de25(0x29c)]();for(const _0x138687 of _0x31c727){this['addSkillTypeCommand'](_0x138687);}},Window_ActorCommand['prototype'][_0x16b2b1(0x5ae)]=function(_0x1382e9){const _0x2f7330=_0x16b2b1;let _0x4e7eae=$dataSystem['skillTypes'][_0x1382e9];if(!_0x4e7eae)return;let _0x2fb25e=_0x4e7eae;const _0x51dd8b=this['commandStyle']();if(_0x51dd8b===_0x2f7330(0x63a))_0x2fb25e=_0x2fb25e[_0x2f7330(0x702)](/\x1I\[(\d+)\]/gi,''),_0x2fb25e=_0x2fb25e[_0x2f7330(0x702)](/\\I\[(\d+)\]/gi,'');else{if(!_0x4e7eae[_0x2f7330(0x6ef)](/\\I\[(\d+)\]/i)){const _0x1fce4c=Imported[_0x2f7330(0x5f2)]?VisuMZ[_0x2f7330(0x374)][_0x2f7330(0x6ac)][_0x2f7330(0x1eb)]:VisuMZ[_0x2f7330(0x4da)][_0x2f7330(0x6ac)][_0x2f7330(0x199)],_0x43c6b4=$dataSystem[_0x2f7330(0x5b9)]['includes'](_0x1382e9),_0x3abae5=_0x43c6b4?_0x1fce4c[_0x2f7330(0x59f)]:_0x1fce4c['IconStypeNorm'];_0x2fb25e=_0x2f7330(0x664)[_0x2f7330(0x742)](_0x3abae5,_0x4e7eae);}}this[_0x2f7330(0x84e)](_0x2fb25e,'skill',!![],_0x1382e9);},Window_ActorCommand['prototype']['addSingleSkillCommands']=function(){const _0x2cd7e2=_0x16b2b1,_0x393120=this['_actor'][_0x2cd7e2(0x29c)](),_0x506bec=this['_actor'][_0x2cd7e2(0x6eb)]();for(const _0x5b5269 of _0x506bec){if(!_0x5b5269)continue;if(Imported['VisuMZ_1_SkillsStatesCore']){if(this[_0x2cd7e2(0x821)](_0x5b5269))continue;if(this[_0x2cd7e2(0x47c)](_0x5b5269))continue;}else{if(!_0x393120['includes'](_0x5b5269[_0x2cd7e2(0x893)]))continue;}this[_0x2cd7e2(0x368)](_0x5b5269);}},Window_ActorCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x821)]=function(_0x51b6ee){const _0x5b8efe=_0x16b2b1,_0x2f2d9e=this[_0x5b8efe(0x6df)]['skillTypes'](),_0xcb98cd=_0x2f2d9e[_0x5b8efe(0x1a0)](_0x5d1e95=>DataManager[_0x5b8efe(0x7ef)](_0x51b6ee)['includes'](_0x5d1e95));return _0xcb98cd[_0x5b8efe(0x7d1)]<=0x0;},Window_ActorCommand['prototype'][_0x16b2b1(0x47c)]=function(_0x1461ca){const _0x5bc546=_0x16b2b1;if(!Window_SkillList[_0x5bc546(0x1ca)][_0x5bc546(0x393)][_0x5bc546(0x357)](this,_0x1461ca))return!![];if(!Window_SkillList[_0x5bc546(0x1ca)]['checkShowHideSwitchNotetags'][_0x5bc546(0x357)](this,_0x1461ca))return!![];if(!Window_SkillList['prototype'][_0x5bc546(0x4a8)][_0x5bc546(0x357)](this,_0x1461ca))return!![];return![];},Window_ActorCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x368)]=function(_0x1722f0){const _0xbe7f87=_0x16b2b1;if(!_0x1722f0)return;if(!this[_0xbe7f87(0x28a)](_0x1722f0))return;const _0x41432d=this[_0xbe7f87(0x94e)](),_0x31033b=DataManager[_0xbe7f87(0x280)](_0x1722f0),_0xd45d0b=DataManager[_0xbe7f87(0x6f1)](_0x1722f0),_0x478de8=_0x41432d===_0xbe7f87(0x63a)?_0x31033b:'\x5cI[%1]%2'[_0xbe7f87(0x742)](_0xd45d0b,_0x31033b),_0x541708=this[_0xbe7f87(0x6df)][_0xbe7f87(0x8f0)](_0x1722f0);this['addCommand'](_0x478de8,_0xbe7f87(0x65d),_0x541708,_0x1722f0['id']);},Window_ActorCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x28a)]=function(_0x30deea){const _0x19d103=_0x16b2b1,_0x44994a=_0x30deea[_0x19d103(0x50c)];if(_0x44994a[_0x19d103(0x6ef)](/<COMMAND REQUIRE LEARN>/i)){if(!this[_0x19d103(0x6df)][_0x19d103(0x914)](_0x30deea['id']))return![];}if(_0x44994a[_0x19d103(0x6ef)](/<COMMAND REQUIRE ACCESS>/i)){if(!this[_0x19d103(0x6df)]['hasSkill'](_0x30deea['id']))return![];}const _0xcddbe1=VisuMZ['BattleCore'][_0x19d103(0x525)](_0x30deea,_0x19d103(0x21e));if(VisuMZ[_0x19d103(0x4da)]['JS'][_0xcddbe1]){if(!VisuMZ[_0x19d103(0x4da)]['JS'][_0xcddbe1][_0x19d103(0x357)](this,this[_0x19d103(0x6df)],_0x30deea))return![];}return VisuMZ[_0x19d103(0x4da)][_0x19d103(0x338)](_0x30deea);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x338)]=function(_0x213a85){const _0xe94850=_0x16b2b1,_0xa1e07f=_0x213a85['note'];if(_0xa1e07f[_0xe94850(0x6ef)](/<COMMAND SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x18bf94=JSON[_0xe94850(0x708)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x256602 of _0x18bf94){if(!$gameSwitches[_0xe94850(0x58f)](_0x256602))return![];}return!![];}if(_0xa1e07f[_0xe94850(0x6ef)](/<COMMAND SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1db4c0=JSON[_0xe94850(0x708)]('['+RegExp['$1'][_0xe94850(0x6ef)](/\d+/g)+']');for(const _0x3f0ab4 of _0x1db4c0){if(!$gameSwitches[_0xe94850(0x58f)](_0x3f0ab4))return![];}return!![];}if(_0xa1e07f[_0xe94850(0x6ef)](/<COMMAND SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1ef5d9=JSON['parse']('['+RegExp['$1'][_0xe94850(0x6ef)](/\d+/g)+']');for(const _0x568b4f of _0x1ef5d9){if($gameSwitches[_0xe94850(0x58f)](_0x568b4f))return!![];}return![];}if(_0xa1e07f[_0xe94850(0x6ef)](/<COMMAND HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x14fca0=JSON[_0xe94850(0x708)]('['+RegExp['$1'][_0xe94850(0x6ef)](/\d+/g)+']');for(const _0x10670a of _0x14fca0){if(!$gameSwitches[_0xe94850(0x58f)](_0x10670a))return!![];}return![];}if(_0xa1e07f[_0xe94850(0x6ef)](/<COMMAND HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x100f0e=JSON[_0xe94850(0x708)]('['+RegExp['$1'][_0xe94850(0x6ef)](/\d+/g)+']');for(const _0x3f261d of _0x100f0e){if(!$gameSwitches[_0xe94850(0x58f)](_0x3f261d))return!![];}return![];}if(_0xa1e07f[_0xe94850(0x6ef)](/<COMMAND HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x12c7df=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x58ab15 of _0x12c7df){if($gameSwitches[_0xe94850(0x58f)](_0x58ab15))return![];}return!![];}return!![];},Window_ActorCommand[_0x16b2b1(0x1ca)]['addEscapeCommand']=function(){const _0x4bdc65=_0x16b2b1,_0x41b063=this[_0x4bdc65(0x94e)](),_0x5aac92=VisuMZ[_0x4bdc65(0x4da)][_0x4bdc65(0x6ac)][_0x4bdc65(0x47a)]['CmdIconEscape'],_0x3272bb=_0x41b063===_0x4bdc65(0x63a)?TextManager['escape']:_0x4bdc65(0x664)['format'](_0x5aac92,TextManager[_0x4bdc65(0x214)]),_0x15b7f0=this[_0x4bdc65(0x7f6)]();this[_0x4bdc65(0x84e)](_0x3272bb,_0x4bdc65(0x214),_0x15b7f0);},Window_ActorCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x7f6)]=function(){const _0x273a94=_0x16b2b1;return BattleManager[_0x273a94(0x50d)]();},Window_ActorCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x3cd)]=function(){const _0x2d419e=_0x16b2b1,_0x44b9f0=this[_0x2d419e(0x94e)](),_0x49e565=VisuMZ[_0x2d419e(0x4da)][_0x2d419e(0x6ac)][_0x2d419e(0x47a)][_0x2d419e(0x51e)],_0x11ee65=_0x44b9f0===_0x2d419e(0x63a)?TextManager[_0x2d419e(0x787)]:'\x5cI[%1]%2'[_0x2d419e(0x742)](_0x49e565,TextManager[_0x2d419e(0x787)]),_0x4a28d3=this[_0x2d419e(0x7d0)]();this[_0x2d419e(0x84e)](_0x11ee65,'autoBattle',_0x4a28d3);},Window_ActorCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x7d0)]=function(){return!![];},Window_ActorCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x68d)]=function(){const _0x5ca216=_0x16b2b1;return VisuMZ[_0x5ca216(0x4da)]['Settings']['ActorCmd'][_0x5ca216(0x80c)];},Window_ActorCommand['prototype'][_0x16b2b1(0x3f8)]=function(_0x2cf765){const _0xdd0d62=_0x16b2b1,_0x1a06fc=this['commandStyleCheck'](_0x2cf765);if(_0x1a06fc===_0xdd0d62(0x517))this[_0xdd0d62(0x266)](_0x2cf765);else _0x1a06fc===_0xdd0d62(0x41a)?this[_0xdd0d62(0x4a0)](_0x2cf765):Window_Command[_0xdd0d62(0x1ca)]['drawItem']['call'](this,_0x2cf765);this['drawSingleSkillCost'](_0x2cf765);},Window_ActorCommand[_0x16b2b1(0x1ca)]['commandStyle']=function(){const _0x4376f3=_0x16b2b1;return VisuMZ[_0x4376f3(0x4da)][_0x4376f3(0x6ac)]['ActorCmd'][_0x4376f3(0x4d1)];},Window_ActorCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x2c6)]=function(_0x29ea72){const _0x458718=_0x16b2b1;if(_0x29ea72<0x0)return _0x458718(0x63a);const _0xf21d2a=this[_0x458718(0x94e)]();if(_0xf21d2a!==_0x458718(0x85e))return _0xf21d2a;else{if(this[_0x458718(0x520)]()>0x0){const _0xdd2613=this[_0x458718(0x95d)](_0x29ea72);if(_0xdd2613[_0x458718(0x6ef)](/\\I\[(\d+)\]/i)){const _0x54a660=this[_0x458718(0x867)](_0x29ea72),_0x2e9667=this[_0x458718(0x260)](_0xdd2613)[_0x458718(0x20c)];return _0x2e9667<=_0x54a660['width']?'iconText':_0x458718(0x41a);}}}return _0x458718(0x63a);},Window_ActorCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x266)]=function(_0x11aa7e){const _0x115539=_0x16b2b1,_0x3227aa=this[_0x115539(0x867)](_0x11aa7e),_0x3878fb=this[_0x115539(0x95d)](_0x11aa7e),_0x59ec55=this['textSizeEx'](_0x3878fb)[_0x115539(0x20c)];this[_0x115539(0x688)](this[_0x115539(0x26c)](_0x11aa7e));const _0x1d7cee=this[_0x115539(0x68d)]();if(_0x1d7cee==='right')this[_0x115539(0x94c)](_0x3878fb,_0x3227aa['x']+_0x3227aa[_0x115539(0x20c)]-_0x59ec55,_0x3227aa['y'],_0x59ec55);else{if(_0x1d7cee==='center'){const _0x544a7e=_0x3227aa['x']+Math[_0x115539(0x3db)]((_0x3227aa[_0x115539(0x20c)]-_0x59ec55)/0x2);this[_0x115539(0x94c)](_0x3878fb,_0x544a7e,_0x3227aa['y'],_0x59ec55);}else this[_0x115539(0x94c)](_0x3878fb,_0x3227aa['x'],_0x3227aa['y'],_0x59ec55);}},Window_ActorCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x4a0)]=function(_0x43eb3d){const _0x79c538=_0x16b2b1;this[_0x79c538(0x95d)](_0x43eb3d)[_0x79c538(0x6ef)](/\\I\[(\d+)\]/i);const _0x54d265=Number(RegExp['$1'])||0x0,_0x1abe97=this[_0x79c538(0x867)](_0x43eb3d),_0x2addd1=_0x1abe97['x']+Math['floor']((_0x1abe97[_0x79c538(0x20c)]-ImageManager['iconWidth'])/0x2),_0x5cddef=_0x1abe97['y']+(_0x1abe97[_0x79c538(0x86c)]-ImageManager[_0x79c538(0x3b1)])/0x2;this[_0x79c538(0x1d8)](_0x54d265,_0x2addd1,_0x5cddef);},Window_ActorCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x895)]=function(_0x612702){const _0x2a5c3b=_0x16b2b1;if(!(VisuMZ[_0x2a5c3b(0x4da)][_0x2a5c3b(0x6ac)][_0x2a5c3b(0x199)][_0x2a5c3b(0x1e4)]??!![]))return;const _0x458d2b=this[_0x2a5c3b(0x4bd)](_0x612702);if(![_0x2a5c3b(0x63c),_0x2a5c3b(0x483),_0x2a5c3b(0x65d)][_0x2a5c3b(0x3e4)](_0x458d2b))return;const _0xdc81d=this[_0x2a5c3b(0x867)](_0x612702);let _0x78ac71=null;if(_0x458d2b==='attack')_0x78ac71=$dataSkills[this[_0x2a5c3b(0x6df)][_0x2a5c3b(0x65a)]()];else _0x458d2b===_0x2a5c3b(0x483)?_0x78ac71=$dataSkills[this['_actor'][_0x2a5c3b(0x91a)]()]:_0x78ac71=$dataSkills[this[_0x2a5c3b(0x2f0)][_0x612702][_0x2a5c3b(0x785)]];this[_0x2a5c3b(0x759)](this[_0x2a5c3b(0x6df)],_0x78ac71,_0xdc81d['x'],_0xdc81d['y'],_0xdc81d[_0x2a5c3b(0x20c)]);},Window_ActorCommand['prototype']['drawSkillCost']=function(_0x3b33cf,_0x1b4ff6,_0x36e48b,_0x5cc984,_0xa154c3){const _0x3cceee=_0x16b2b1;if(!_0x1b4ff6)return;Imported[_0x3cceee(0x5f2)]?Window_Command[_0x3cceee(0x1ca)][_0x3cceee(0x759)][_0x3cceee(0x357)](this,_0x3b33cf,_0x1b4ff6,_0x36e48b,_0x5cc984,_0xa154c3):Window_SkillList[_0x3cceee(0x1ca)][_0x3cceee(0x759)]['call'](this,_0x1b4ff6,_0x36e48b,_0x5cc984,_0xa154c3);},Window_ActorCommand[_0x16b2b1(0x1ca)]['hide']=function(){},Window_ActorCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x8ad)]=function(){const _0x3a14f9=_0x16b2b1;Window_Command[_0x3a14f9(0x1ca)][_0x3a14f9(0x8ad)][_0x3a14f9(0x357)](this);const _0x307b1c=this[_0x3a14f9(0x860)]();_0x307b1c===_0x3a14f9(0x369)&&this[_0x3a14f9(0x426)]();},Window_ActorCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x860)]=function(){const _0x2b7f03=_0x16b2b1;if(this['_battleLayoutStyle'])return this['_battleLayoutStyle'];return this[_0x2b7f03(0x391)]=SceneManager[_0x2b7f03(0x6b0)][_0x2b7f03(0x860)](),this[_0x2b7f03(0x391)];},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x484)]=Window_ActorCommand[_0x16b2b1(0x1ca)]['setup'],Window_ActorCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x85d)]=function(_0x1a3b6c){const _0x29e907=_0x16b2b1,_0x43d36d=this[_0x29e907(0x860)]();if(_0x1a3b6c&&['xp',_0x29e907(0x89b)][_0x29e907(0x3e4)](_0x43d36d))this['resizeWindowXPStyle'](_0x1a3b6c);else _0x1a3b6c&&[_0x29e907(0x369)]['includes'](_0x43d36d)&&(this[_0x29e907(0x79c)](_0x1a3b6c),this['showHelpWindow']());VisuMZ[_0x29e907(0x4da)]['Window_ActorCommand_setup']['call'](this,_0x1a3b6c),_0x1a3b6c&&$gameTroop[_0x29e907(0x25b)]()[_0x29e907(0x7d1)]>0x0&&_0x1a3b6c[_0x29e907(0x4e0)]()&&_0x1a3b6c[_0x29e907(0x4e0)]()[_0x29e907(0x876)]();},Window_ActorCommand[_0x16b2b1(0x1ca)]['resizeWindowXPStyle']=function(_0x52a7a7){const _0x3f5039=_0x16b2b1,_0x4b9a55=Math[_0x3f5039(0x855)](Graphics['boxWidth']/0x3),_0x5db297=Math[_0x3f5039(0x855)](Graphics[_0x3f5039(0x2af)]/$gameParty[_0x3f5039(0x367)]()[_0x3f5039(0x7d1)]),_0x2c9272=Math[_0x3f5039(0x537)](_0x4b9a55,_0x5db297),_0x3b2fc0=this['fittingHeight'](VisuMZ['BattleCore'][_0x3f5039(0x6ac)][_0x3f5039(0x8ec)]['XPActorCommandLines']),_0x28e23d=_0x5db297*_0x52a7a7[_0x3f5039(0x2ba)]()+(_0x5db297-_0x2c9272)/0x2,_0x42094a=SceneManager[_0x3f5039(0x6b0)][_0x3f5039(0x7a4)]['y']-_0x3b2fc0;this[_0x3f5039(0x1c0)](_0x28e23d,_0x42094a,_0x2c9272,_0x3b2fc0),this[_0x3f5039(0x77b)](),this[_0x3f5039(0x5eb)](0x1);},Window_ActorCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x79c)]=function(_0x13000b){const _0x2e0e08=_0x16b2b1,_0x4c5373=SceneManager[_0x2e0e08(0x6b0)][_0x2e0e08(0x8e7)]();this[_0x2e0e08(0x1c0)](_0x4c5373['x'],_0x4c5373['y'],_0x4c5373['width'],_0x4c5373[_0x2e0e08(0x86c)]),this['createContents'](),this[_0x2e0e08(0x5eb)](0x0);},Window_ActorCommand[_0x16b2b1(0x1ca)][_0x16b2b1(0x789)]=function(){const _0x1fce5b=_0x16b2b1;if(this[_0x1fce5b(0x945)]){const _0x58bf15=this[_0x1fce5b(0x945)][_0x1fce5b(0x4ee)],_0x5a8ee=this[_0x1fce5b(0x20c)]-0x8,_0x3bb6fd=this[_0x1fce5b(0x86c)],_0x56a3e1=this[_0x1fce5b(0x2d7)],_0x4ccbbe=ColorManager['dimColor1'](),_0x99ec83=ColorManager[_0x1fce5b(0x756)]();this['_dimmerSprite']['x']=0x4,_0x58bf15[_0x1fce5b(0x597)](_0x5a8ee,_0x3bb6fd),_0x58bf15[_0x1fce5b(0x7d9)](0x0,0x0,_0x5a8ee,_0x56a3e1,_0x99ec83,_0x4ccbbe,!![]),_0x58bf15[_0x1fce5b(0x75f)](0x0,_0x56a3e1,_0x5a8ee,_0x3bb6fd-_0x56a3e1*0x2,_0x4ccbbe),_0x58bf15['gradientFillRect'](0x0,_0x3bb6fd-_0x56a3e1,_0x5a8ee,_0x56a3e1,_0x4ccbbe,_0x99ec83,!![]),this[_0x1fce5b(0x945)][_0x1fce5b(0x77e)](0x0,0x0,_0x5a8ee,_0x3bb6fd);}},Window_ActorCommand[_0x16b2b1(0x1ca)]['updateHelp']=function(){const _0x8968cc=_0x16b2b1;if(!this['_actor'])return;const _0xd9395=VisuMZ[_0x8968cc(0x4da)][_0x8968cc(0x6ac)][_0x8968cc(0x199)],_0x104aa3=this[_0x8968cc(0x676)]();switch(_0x104aa3){case'attack':this[_0x8968cc(0x382)]($dataSkills[this[_0x8968cc(0x6df)][_0x8968cc(0x65a)]()]);break;case _0x8968cc(0x483):this[_0x8968cc(0x382)]($dataSkills[this[_0x8968cc(0x6df)]['guardSkillId']()]);break;case _0x8968cc(0x36a):const _0x496348=_0xd9395[_0x8968cc(0x24a)],_0x172a75=_0x496348[_0x8968cc(0x742)]($dataSystem[_0x8968cc(0x29c)][this[_0x8968cc(0x62d)]()]);this['_helpWindow'][_0x8968cc(0x24b)](_0x172a75);break;case'singleSkill':this[_0x8968cc(0x382)]($dataSkills[this[_0x8968cc(0x62d)]()]);break;case'item':this['_helpWindow'][_0x8968cc(0x24b)](_0xd9395[_0x8968cc(0x848)]);break;case _0x8968cc(0x214):this[_0x8968cc(0x8cd)][_0x8968cc(0x24b)](_0xd9395[_0x8968cc(0x4e7)]);break;case _0x8968cc(0x787):this[_0x8968cc(0x8cd)][_0x8968cc(0x24b)](_0xd9395[_0x8968cc(0x1cd)]);break;default:this[_0x8968cc(0x8cd)][_0x8968cc(0x24b)]('');break;}},VisuMZ[_0x16b2b1(0x4da)]['Window_BattleStatus_initialize']=Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x77d)],Window_BattleStatus['prototype'][_0x16b2b1(0x77d)]=function(_0x100e8f){const _0x4676fc=_0x16b2b1;VisuMZ[_0x4676fc(0x4da)][_0x4676fc(0x655)]['call'](this,_0x100e8f),this[_0x4676fc(0x6e9)](),this['createAttachmentSprites']();},Window_BattleStatus[_0x16b2b1(0x1ca)]['battleLayoutStyle']=function(){const _0x444b10=_0x16b2b1;if(this[_0x444b10(0x391)])return this['_battleLayoutStyle'];return this[_0x444b10(0x391)]=SceneManager[_0x444b10(0x6b0)][_0x444b10(0x860)](),this[_0x444b10(0x391)];},Window_BattleStatus['prototype'][_0x16b2b1(0x6e9)]=function(){const _0x352041=_0x16b2b1;this[_0x352041(0x401)]=this[_0x352041(0x381)]();const _0x3ab9c8=VisuMZ[_0x352041(0x4da)][_0x352041(0x6ac)][_0x352041(0x8ec)];_0x3ab9c8[_0x352041(0x5be)]&&(this[_0x352041(0x548)]=0x0);},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x381)]=function(){const _0x477cf7=_0x16b2b1,_0x82d69a=VisuMZ[_0x477cf7(0x4da)][_0x477cf7(0x6ac)][_0x477cf7(0x8ec)];if(_0x82d69a[_0x477cf7(0x738)])return!![];const _0x3019a1=this[_0x477cf7(0x860)]();switch(_0x3019a1){case _0x477cf7(0x3c5):case _0x477cf7(0x369):return!![];break;case _0x477cf7(0x1f9):case'xp':case _0x477cf7(0x89b):default:return![];break;}},Window_BattleStatus['prototype'][_0x16b2b1(0x7b1)]=function(){const _0x4f89fa=_0x16b2b1;return this[_0x4f89fa(0x381)]()?0x0:0xa;},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x326)]=function(){const _0x32f45a=_0x16b2b1,_0x44ed90=this['battleLayoutStyle']();switch(_0x44ed90){case _0x32f45a(0x3c5):return 0x1;break;case'xp':case _0x32f45a(0x89b):return $gameParty[_0x32f45a(0x367)]()[_0x32f45a(0x7d1)];break;case'default':default:return $gameParty[_0x32f45a(0x579)]();break;}},Window_BattleStatus[_0x16b2b1(0x1ca)]['itemHeight']=function(){const _0xe76dd3=_0x16b2b1,_0x404d71=this[_0xe76dd3(0x860)]();switch(_0x404d71){case _0xe76dd3(0x3c5):return Window_StatusBase[_0xe76dd3(0x1ca)][_0xe76dd3(0x418)]['call'](this);break;case _0xe76dd3(0x1f9):case'xp':case _0xe76dd3(0x89b):default:return this[_0xe76dd3(0x5d0)];break;}},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x8df)]=function(){const _0x10ae25=_0x16b2b1,_0x1733b6=this['battleLayoutStyle']();switch(_0x1733b6){case _0x10ae25(0x3c5):return Window_StatusBase[_0x10ae25(0x1ca)][_0x10ae25(0x8df)][_0x10ae25(0x357)](this);break;case _0x10ae25(0x1f9):case'xp':case _0x10ae25(0x89b):default:return 0x0;break;}},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x18a)]=function(){const _0x2005b6=_0x16b2b1;this[_0x2005b6(0x381)]()?Window_StatusBase[_0x2005b6(0x1ca)][_0x2005b6(0x18a)]['call'](this):this[_0x2005b6(0x2d7)]=0x8;},Window_BattleStatus['prototype']['loadWindowskin']=function(){const _0x178a07=_0x16b2b1,_0x4d01c0=VisuMZ[_0x178a07(0x4da)][_0x178a07(0x6ac)][_0x178a07(0x8ec)];_0x4d01c0[_0x178a07(0x738)]?this[_0x178a07(0x682)]=ImageManager['loadSystem'](_0x4d01c0['StatusWindowSkinFilename']):Window_StatusBase[_0x178a07(0x1ca)][_0x178a07(0x55b)][_0x178a07(0x357)](this);},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x87f)]=function(_0x209f3a){const _0x1b973e=_0x16b2b1,_0x29d755=VisuMZ[_0x1b973e(0x4da)]['Settings'][_0x1b973e(0x8ec)];if(_0x29d755['StatusWindowSelectableBackHide'])return;Window_StatusBase[_0x1b973e(0x1ca)][_0x1b973e(0x87f)]['call'](this,_0x209f3a);},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x5e8)]=function(){const _0x2219af=_0x16b2b1;this[_0x2219af(0x908)]=!![];},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x541)]=function(){const _0xcd005c=_0x16b2b1;Window_StatusBase[_0xcd005c(0x1ca)][_0xcd005c(0x541)]['call'](this),this['updateRefresh'](),this[_0xcd005c(0x888)]();if(this['battleLayoutStyle']()===_0xcd005c(0x369))this[_0xcd005c(0x3e6)]();},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x589)]=function(){const _0x4f4e4f=_0x16b2b1;if($gameTemp[_0x4f4e4f(0x96a)]())this[_0x4f4e4f(0x38c)](),this[_0x4f4e4f(0x908)]=![],$gameTemp['clearBattleRefreshRequest']();else this[_0x4f4e4f(0x908)]&&(this[_0x4f4e4f(0x908)]=![],this[_0x4f4e4f(0x388)](),this[_0x4f4e4f(0x332)]());},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x972)]=function(){const _0x31f5e8=_0x16b2b1;Window_StatusBase[_0x31f5e8(0x1ca)][_0x31f5e8(0x972)][_0x31f5e8(0x357)](this);if(!$gameSystem['isSideView']())this[_0x31f5e8(0x388)]();},Window_BattleStatus['prototype'][_0x16b2b1(0x1e6)]=function(){const _0x36b526=_0x16b2b1;if(this[_0x36b526(0x651)]===Window_BattleStatus)return;Window_StatusBase[_0x36b526(0x1ca)][_0x36b526(0x1e6)][_0x36b526(0x357)](this);},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x7a5)]=function(_0xa1465d){const _0x17dc01=_0x16b2b1,_0x1683d0=this['battleLayoutStyle']();switch(_0x1683d0){case'xp':case _0x17dc01(0x89b):break;case _0x17dc01(0x1f9):case _0x17dc01(0x3c5):case _0x17dc01(0x369):default:return Window_StatusBase[_0x17dc01(0x1ca)][_0x17dc01(0x7a5)][_0x17dc01(0x357)](this,_0xa1465d);break;}},VisuMZ[_0x16b2b1(0x4da)]['Window_BattleStatus_drawItemImage']=Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x36c)],Window_BattleStatus['prototype']['drawItemImage']=function(_0x3909be){const _0xa23955=_0x16b2b1,_0x559055=this['battleLayoutStyle']();switch(_0x559055){case _0xa23955(0x3c5):this[_0xa23955(0x6f9)](_0x3909be);break;case'xp':this[_0xa23955(0x88b)](_0x3909be);break;case _0xa23955(0x89b):this[_0xa23955(0x967)](_0x3909be);break;case _0xa23955(0x1f9):case'border':default:VisuMZ[_0xa23955(0x4da)]['Window_BattleStatus_drawItemImage']['call'](this,_0x3909be);break;}},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x299)]=function(_0x3dbe48){const _0x47f2c5=_0x16b2b1,_0x59a3e2=this[_0x47f2c5(0x860)]();if(!$gameSystem[_0x47f2c5(0x5a0)]())this['centerFrontViewSprite'](_0x3dbe48);switch(_0x59a3e2){case'list':this[_0x47f2c5(0x83b)](_0x3dbe48);break;case'xp':case _0x47f2c5(0x89b):case _0x47f2c5(0x1f9):case _0x47f2c5(0x369):default:this[_0x47f2c5(0x5ab)](_0x3dbe48);break;}},Window_BattleStatus['prototype'][_0x16b2b1(0x857)]=function(){const _0x2250d7=_0x16b2b1,_0x29cb58=this[_0x2250d7(0x860)]();if(['xp']['includes'](_0x29cb58)&&!$gameSystem[_0x2250d7(0x5a0)]()){this['setCursorRect'](0x0,0x0,0x0,0x0);return;}Window_StatusBase[_0x2250d7(0x1ca)][_0x2250d7(0x857)]['call'](this);},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x1aa)]=function(_0x4b56f5){const _0x4b78d6=_0x16b2b1,_0x316ee6=this[_0x4b78d6(0x755)](_0x4b56f5)[_0x4b78d6(0x4e0)]();if(!_0x316ee6)return;const _0xe347b7=this[_0x4b78d6(0x860)](),_0x5396d6=this[_0x4b78d6(0x71c)](_0x4b56f5);let _0x3df0ba=Math[_0x4b78d6(0x855)](_0x5396d6['x']+_0x5396d6['width']/0x2)+this[_0x4b78d6(0x2d7)];[_0x4b78d6(0x3c5)]['includes'](_0xe347b7)&&(_0x3df0ba=_0x5396d6[_0x4b78d6(0x20c)]/$gameParty[_0x4b78d6(0x367)]()[_0x4b78d6(0x7d1)],_0x3df0ba*=_0x4b56f5,_0x3df0ba+=_0x5396d6[_0x4b78d6(0x20c)]/$gameParty[_0x4b78d6(0x367)]()[_0x4b78d6(0x7d1)]/0x2);let _0x475438=Math[_0x4b78d6(0x855)](this[_0x4b78d6(0x4ef)](_0x4b56f5,_0x316ee6,_0x5396d6));_0x316ee6['setHome'](_0x3df0ba,_0x475438),this[_0x4b78d6(0x76c)](_0x316ee6,0x1),_0x316ee6[_0x4b78d6(0x972)]();},Window_BattleStatus['prototype'][_0x16b2b1(0x4ef)]=function(_0x2f3aa7,_0x596814,_0xb98856){const _0x4b2df4=_0x16b2b1,_0x21e057=VisuMZ[_0x4b2df4(0x4da)][_0x4b2df4(0x6ac)][_0x4b2df4(0x8ec)],_0x3168bd=this[_0x4b2df4(0x860)]();if(_0x3168bd==='xp'){const _0x2eb0f2=_0x21e057[_0x4b2df4(0x658)];switch(_0x2eb0f2['toLowerCase']()['trim']()){case _0x4b2df4(0x6a7):return _0xb98856[_0x4b2df4(0x86c)]-_0x596814[_0x4b2df4(0x556)][_0x4b2df4(0x86c)]/0x4;break;case _0x4b2df4(0x6bb):const _0x2e4b40=_0x21e057[_0x4b2df4(0x5e2)];return(_0xb98856['height']+(_0x596814['height']||_0x2e4b40))/0x2;break;case _0x4b2df4(0x1a8):return 0x0;case _0x4b2df4(0x802):default:return this[_0x4b2df4(0x463)](_0xb98856);break;}}else{if(_0x3168bd===_0x4b2df4(0x89b)){}}return _0x596814[_0x4b2df4(0x86c)];},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x6f9)]=function(_0x31cd00){const _0x4e56d2=_0x16b2b1;if(!VisuMZ[_0x4e56d2(0x4da)][_0x4e56d2(0x6ac)][_0x4e56d2(0x8ec)]['ShowFacesListStyle'])return;const _0x183c86=this[_0x4e56d2(0x755)](_0x31cd00),_0x4f34a7=this[_0x4e56d2(0x71c)](_0x31cd00);_0x4f34a7['width']=ImageManager['faceWidth'],_0x4f34a7[_0x4e56d2(0x86c)]-=0x2,this[_0x4e56d2(0x70d)](_0x183c86,_0x4f34a7['x']+0x1,_0x4f34a7['y']+0x1,_0x4f34a7['width'],_0x4f34a7[_0x4e56d2(0x86c)]);},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x83b)]=function(_0x511a0b){const _0x47b4d5=_0x16b2b1,_0x3eab1c=VisuMZ['BattleCore'][_0x47b4d5(0x6ac)][_0x47b4d5(0x8ec)],_0x500cd6=$dataSystem[_0x47b4d5(0x90e)]?0x4:0x3,_0xa8b271=_0x500cd6*0x80+(_0x500cd6-0x1)*0x8+0x4,_0x4cd210=this[_0x47b4d5(0x755)](_0x511a0b),_0x50fbb8=this[_0x47b4d5(0x71c)](_0x511a0b);let _0x13ee96=_0x50fbb8['x']+this['padding'];_0x3eab1c['ShowFacesListStyle']?_0x13ee96=_0x50fbb8['x']+ImageManager['faceWidth']+0x8:_0x13ee96+=ImageManager[_0x47b4d5(0x2e9)];const _0x36d223=Math[_0x47b4d5(0x855)](Math[_0x47b4d5(0x537)](_0x50fbb8['x']+_0x50fbb8[_0x47b4d5(0x20c)]-_0xa8b271,_0x13ee96)),_0x19b58d=Math[_0x47b4d5(0x855)](_0x50fbb8['y']+(_0x50fbb8[_0x47b4d5(0x86c)]-Sprite_Name[_0x47b4d5(0x1ca)]['bitmapHeight']())/0x2),_0x272db8=Math[_0x47b4d5(0x855)](_0x36d223-ImageManager['iconWidth']/0x2-0x4),_0x3a0529=Math[_0x47b4d5(0x855)](_0x50fbb8['y']+(_0x50fbb8[_0x47b4d5(0x86c)]-ImageManager[_0x47b4d5(0x3b1)])/0x2+ImageManager['iconHeight']/0x2);let _0xf17bef=_0x36d223+0x88;const _0xe14e1c=_0x19b58d;this[_0x47b4d5(0x3c9)](_0x4cd210,_0x36d223-0x4+(_0x3eab1c['TpbGaugeOffsetX']||0x0),_0x19b58d+(_0x3eab1c[_0x47b4d5(0x196)]||0x0)),this[_0x47b4d5(0x979)](_0x4cd210,_0x36d223+(_0x3eab1c[_0x47b4d5(0x6f8)]||0x0),_0x19b58d+(_0x3eab1c[_0x47b4d5(0x83d)]||0x0)),this[_0x47b4d5(0x2db)](_0x4cd210,_0x272db8+(_0x3eab1c['StateIconOffsetX']||0x0),_0x3a0529+(_0x3eab1c[_0x47b4d5(0x5b2)]||0x0)),this[_0x47b4d5(0x6ea)](_0x4cd210,'hp',_0xf17bef+0x88*0x0+(_0x3eab1c[_0x47b4d5(0x8dd)]||0x0),_0xe14e1c+(_0x3eab1c[_0x47b4d5(0x211)]||0x0)),this[_0x47b4d5(0x6ea)](_0x4cd210,'mp',_0xf17bef+0x88*0x1+(_0x3eab1c[_0x47b4d5(0x221)]||0x0),_0xe14e1c+(_0x3eab1c[_0x47b4d5(0x457)]||0x0)),$dataSystem[_0x47b4d5(0x90e)]&&this[_0x47b4d5(0x6ea)](_0x4cd210,'tp',_0xf17bef+0x88*0x2+(_0x3eab1c[_0x47b4d5(0x278)]||0x0),_0xe14e1c+(_0x3eab1c[_0x47b4d5(0x6c8)]||0x0));},Window_BattleStatus['prototype'][_0x16b2b1(0x88b)]=function(_0x1339b3){const _0x341a65=_0x16b2b1;if(!$gameSystem[_0x341a65(0x5a0)]())return;VisuMZ[_0x341a65(0x4da)][_0x341a65(0x795)][_0x341a65(0x357)](this,_0x1339b3);},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x5ab)]=function(_0x3dd07f){const _0x7f03f1=_0x16b2b1,_0x398e67=VisuMZ['BattleCore'][_0x7f03f1(0x6ac)][_0x7f03f1(0x8ec)],_0x410757=this[_0x7f03f1(0x755)](_0x3dd07f),_0x2ca87b=this[_0x7f03f1(0x71c)](_0x3dd07f),_0x46811b=Math[_0x7f03f1(0x855)](_0x2ca87b['x']+(_0x2ca87b[_0x7f03f1(0x20c)]-0x80)/0x2),_0x234ecd=this[_0x7f03f1(0x463)](_0x2ca87b);let _0x1d5ca5=_0x46811b-ImageManager[_0x7f03f1(0x2e9)]/0x2-0x4,_0x27041d=_0x234ecd+ImageManager[_0x7f03f1(0x3b1)]/0x2;_0x1d5ca5-ImageManager['iconWidth']/0x2<_0x2ca87b['x']&&(_0x1d5ca5=_0x46811b+ImageManager[_0x7f03f1(0x2e9)]/0x2-0x4,_0x27041d=_0x234ecd-ImageManager[_0x7f03f1(0x3b1)]/0x2);const _0x5aa022=_0x46811b,_0x5a538d=this[_0x7f03f1(0x237)](_0x2ca87b);this['placeTimeGauge'](_0x410757,_0x46811b+(_0x398e67[_0x7f03f1(0x2fa)]||0x0),_0x234ecd+(_0x398e67[_0x7f03f1(0x196)]||0x0)),this['placeActorName'](_0x410757,_0x46811b+(_0x398e67[_0x7f03f1(0x6f8)]||0x0),_0x234ecd+(_0x398e67[_0x7f03f1(0x83d)]||0x0)),this['placeStateIcon'](_0x410757,_0x1d5ca5+(_0x398e67[_0x7f03f1(0x31b)]||0x0),_0x27041d+(_0x398e67[_0x7f03f1(0x5b2)]||0x0)),this[_0x7f03f1(0x6ea)](_0x410757,'hp',_0x5aa022+(_0x398e67[_0x7f03f1(0x8dd)]||0x0),_0x5a538d+(_0x398e67[_0x7f03f1(0x211)]||0x0)),this['placeGauge'](_0x410757,'mp',_0x5aa022+(_0x398e67[_0x7f03f1(0x221)]||0x0),_0x5a538d+this[_0x7f03f1(0x7b8)]()+(_0x398e67[_0x7f03f1(0x457)]||0x0)),$dataSystem['optDisplayTp']&&this[_0x7f03f1(0x6ea)](_0x410757,'tp',_0x5aa022+(_0x398e67[_0x7f03f1(0x278)]||0x0),_0x5a538d+this[_0x7f03f1(0x7b8)]()*0x2+(_0x398e67[_0x7f03f1(0x6c8)]||0x0));},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x6bc)]=function(_0x598c2c){const _0x1f137a=_0x16b2b1;if(!VisuMZ[_0x1f137a(0x4da)][_0x1f137a(0x6ac)][_0x1f137a(0x8ec)][_0x1f137a(0x2d6)])return![];if(_0x598c2c[_0x1f137a(0x34c)]())return!![];return Imported['VisuMZ_1_MainMenuCore']&&_0x598c2c[_0x1f137a(0x476)]();},Game_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x40f)]=function(){const _0x4497ec=_0x16b2b1;if(this[_0x4497ec(0x755)]()[_0x4497ec(0x50c)][_0x4497ec(0x6ef)](/<BATTLE (?:IMAGE|PORTRAIT) OFFSET X:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x4497ec(0x755)]()[_0x4497ec(0x50c)][_0x4497ec(0x6ef)](/<BATTLE (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);}return 0x0;},Game_Actor[_0x16b2b1(0x1ca)][_0x16b2b1(0x42a)]=function(){const _0x405d5f=_0x16b2b1;if(this[_0x405d5f(0x755)]()[_0x405d5f(0x50c)][_0x405d5f(0x6ef)](/<BATTLE (?:IMAGE|PORTRAIT) OFFSET Y:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x405d5f(0x755)]()[_0x405d5f(0x50c)][_0x405d5f(0x6ef)](/<BATTLE (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$2']);}return 0x0;},Window_BattleStatus['prototype'][_0x16b2b1(0x967)]=function(_0x268ca1){const _0xb1889d=_0x16b2b1,_0x414355=this['actor'](_0x268ca1);if(this[_0xb1889d(0x6bc)](_0x414355)){const _0x425bdd='actor%1-portrait'[_0xb1889d(0x742)](_0x414355[_0xb1889d(0x261)]()),_0x55b470=this[_0xb1889d(0x2bb)](_0x425bdd,Sprite),_0x166360=_0x414355[_0xb1889d(0x8ac)]();_0x166360!==''?_0x55b470[_0xb1889d(0x4ee)]=ImageManager[_0xb1889d(0x82b)](_0x166360):_0x55b470['bitmap']=ImageManager[_0xb1889d(0x4aa)];const _0xe3ef45=this['itemRect'](_0x268ca1);_0x55b470[_0xb1889d(0x6f0)]['x']=0.5,_0x55b470['anchor']['y']=0x1;let _0x163c3a=Math[_0xb1889d(0x855)](_0xe3ef45['x']+_0xe3ef45[_0xb1889d(0x20c)]/0x2)+this[_0xb1889d(0x2d7)];_0x163c3a+=_0x414355[_0xb1889d(0x40f)]();let _0x362848=Math[_0xb1889d(0x855)](this[_0xb1889d(0x86c)]);_0x362848+=_0x414355[_0xb1889d(0x42a)](),_0x55b470[_0xb1889d(0x1c0)](_0x163c3a,_0x362848);const _0x18cfe0=VisuMZ[_0xb1889d(0x4da)][_0xb1889d(0x6ac)][_0xb1889d(0x8ec)][_0xb1889d(0x424)];_0x55b470[_0xb1889d(0x6aa)]['x']=_0x18cfe0,_0x55b470[_0xb1889d(0x6aa)]['y']=_0x18cfe0,_0x55b470['show']();}else{const _0x308976=this[_0xb1889d(0x77f)](_0x268ca1);this[_0xb1889d(0x70d)](_0x414355,_0x308976['x'],_0x308976['y'],_0x308976[_0xb1889d(0x20c)],_0x308976[_0xb1889d(0x86c)]);}},Window_BattleStatus['prototype'][_0x16b2b1(0x2bb)]=function(_0x46049e,_0x19a847){const _0x4bce57=_0x16b2b1,_0x4df6d2=this[_0x4bce57(0x66f)];if(_0x4df6d2[_0x46049e])return _0x4df6d2[_0x46049e];else{const _0x18e4ef=new _0x19a847();return _0x4df6d2[_0x46049e]=_0x18e4ef,this[_0x4bce57(0x2a7)](_0x18e4ef),this[_0x4bce57(0x2a7)](this[_0x4bce57(0x49f)]),_0x18e4ef;}},Window_BattleStatus[_0x16b2b1(0x1ca)]['_createClientArea']=function(){const _0x48f124=_0x16b2b1;this[_0x48f124(0x194)](),this[_0x48f124(0x313)](),Window_StatusBase[_0x48f124(0x1ca)][_0x48f124(0x845)][_0x48f124(0x357)](this),this[_0x48f124(0x5a8)]();},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x194)]=function(){const _0x1e08b0=_0x16b2b1;this['_cursorArea']=new Sprite(),this[_0x1e08b0(0x49f)][_0x1e08b0(0x372)]=[new PIXI[(_0x1e08b0(0x372))]['AlphaFilter']()],this[_0x1e08b0(0x49f)][_0x1e08b0(0x926)]=new Rectangle(),this[_0x1e08b0(0x49f)][_0x1e08b0(0x1c0)](this['_padding'],this[_0x1e08b0(0x612)]),this[_0x1e08b0(0x7d4)](this['_cursorArea']);},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x313)]=function(){const _0x57bb77=_0x16b2b1;this[_0x57bb77(0x4c7)]=new Sprite(),this[_0x57bb77(0x7d4)](this[_0x57bb77(0x4c7)]);},Window_BattleStatus[_0x16b2b1(0x1ca)]['_createDamageContainer']=function(){const _0x53f204=_0x16b2b1;this[_0x53f204(0x55a)]=new Sprite(),this['addChild'](this[_0x53f204(0x55a)]);},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x362)]=function(){const _0x557197=_0x16b2b1;this['_cursorSprite']=new Sprite();for(let _0x56f11b=0x0;_0x56f11b<0x9;_0x56f11b++){this['_cursorSprite'][_0x557197(0x7d4)](new Sprite());}this[_0x557197(0x49f)][_0x557197(0x7d4)](this[_0x557197(0x336)]);},Window_BattleStatus[_0x16b2b1(0x1ca)]['_updateClientArea']=function(){const _0x15488f=_0x16b2b1;Window_StatusBase[_0x15488f(0x1ca)][_0x15488f(0x2d5)][_0x15488f(0x357)](this),this[_0x15488f(0x901)]();},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x901)]=function(){const _0x1b8c0a=_0x16b2b1,_0xdfb45a=this['_padding'];this[_0x1b8c0a(0x49f)]['move'](_0xdfb45a,_0xdfb45a),this[_0x1b8c0a(0x49f)]['x']=_0xdfb45a-this[_0x1b8c0a(0x81b)]['x'],this[_0x1b8c0a(0x49f)]['y']=_0xdfb45a-this[_0x1b8c0a(0x81b)]['y'],this['innerWidth']>0x0&&this['innerHeight']>0x0?this[_0x1b8c0a(0x49f)]['visible']=this['isOpen']():this['_cursorArea'][_0x1b8c0a(0x21f)]=![];},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x46a)]=function(){const _0x53c82a=_0x16b2b1;Window_StatusBase[_0x53c82a(0x1ca)]['_updateFilterArea'][_0x53c82a(0x357)](this),this[_0x53c82a(0x73a)]();},Window_BattleStatus['prototype'][_0x16b2b1(0x73a)]=function(){const _0xe992e4=_0x16b2b1,_0x4d6b8c=this[_0xe992e4(0x49f)][_0xe992e4(0x8d5)][_0xe992e4(0x909)](new Point(0x0,0x0)),_0x3b805f=this[_0xe992e4(0x49f)][_0xe992e4(0x926)];_0x3b805f['x']=_0x4d6b8c['x']+this['origin']['x'],_0x3b805f['y']=_0x4d6b8c['y']+this[_0xe992e4(0x81b)]['y'],_0x3b805f[_0xe992e4(0x20c)]=this[_0xe992e4(0x54f)],_0x3b805f[_0xe992e4(0x86c)]=this['innerHeight'];},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x8a1)]=function(_0x44f9d9){const _0x443d54=_0x16b2b1;if(this[_0x443d54(0x860)]()!==_0x443d54(0x89b))return;this[_0x443d54(0x967)](_0x44f9d9[_0x443d54(0x2ba)]());},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x31e)]=function(_0x45e638,_0x298643){const _0x170325=_0x16b2b1;if(!this[_0x170325(0x55a)])return;if(!_0x45e638)return;if(!_0x298643)return;const _0x335182=this[_0x170325(0x71c)](_0x298643[_0x170325(0x2ba)]());_0x335182['x']+=_0x335182['width']/0x2+this[_0x170325(0x2d7)],_0x45e638['x']=_0x335182['x'],_0x45e638['y']=_0x335182['y'],this['_damageContainer'][_0x170325(0x7d4)](_0x45e638);},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x44f)]=function(_0x2524d2){const _0x3845e3=_0x16b2b1;if(!this[_0x3845e3(0x55a)])return;if(!_0x2524d2)return;this['_damageContainer']['removeChild'](_0x2524d2);},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x3e6)]=function(){const _0x52fb4a=_0x16b2b1;if(!this[_0x52fb4a(0x7ab)]())return;if(!this[_0x52fb4a(0x4d5)])this[_0x52fb4a(0x6a1)]();this[_0x52fb4a(0x22e)](),this[_0x52fb4a(0x6cd)]();},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x7ab)]=function(){const _0x4c00fa=_0x16b2b1;if(this[_0x4c00fa(0x651)]!==Window_BattleStatus)return![];if(!SceneManager[_0x4c00fa(0x7ed)]())return![];return VisuMZ[_0x4c00fa(0x4da)][_0x4c00fa(0x6ac)][_0x4c00fa(0x8ec)][_0x4c00fa(0x74d)];},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x6a1)]=function(){const _0x5b70da=_0x16b2b1;this[_0x5b70da(0x4d5)]=new Sprite();const _0x140c8a=SceneManager['_scene'],_0x1c85f0=_0x140c8a[_0x5b70da(0x57a)]['indexOf'](_0x140c8a[_0x5b70da(0x8ea)]);_0x140c8a['addChildAt'](this[_0x5b70da(0x4d5)],_0x1c85f0),this[_0x5b70da(0x4d5)]['anchor']['x']=0.5,this[_0x5b70da(0x4d5)][_0x5b70da(0x6f0)]['y']=0x1;const _0x174ba9=VisuMZ['BattleCore']['Settings']['BattleLayout'][_0x5b70da(0x63e)];this[_0x5b70da(0x4d5)][_0x5b70da(0x6aa)]['x']=_0x174ba9,this[_0x5b70da(0x4d5)][_0x5b70da(0x6aa)]['y']=_0x174ba9,this[_0x5b70da(0x4d5)]['y']=this['y']+this['height'],this[_0x5b70da(0x5c0)]=0x0;},Window_BattleStatus[_0x16b2b1(0x1ca)]['prepareBorderActor']=function(){const _0x3117d0=_0x16b2b1;this['_borderPortraitSprite']['visible']=BattleManager[_0x3117d0(0x8cc)]();const _0x3a02d6=BattleManager[_0x3117d0(0x755)]();if(_0x3a02d6===this['_borderPortraitSprite'][_0x3117d0(0x755)])return;this[_0x3117d0(0x4d5)][_0x3117d0(0x755)]=_0x3a02d6||this[_0x3117d0(0x4d5)][_0x3117d0(0x755)];if(!_0x3a02d6)return;else{if(_0x3a02d6[_0x3117d0(0x8ac)]()===''){this['_borderPortraitSprite'][_0x3117d0(0x4ee)]=ImageManager['_emptyBitmap'];return;}else{const _0x436d9f=ImageManager[_0x3117d0(0x82b)](_0x3a02d6[_0x3117d0(0x8ac)]());_0x436d9f[_0x3117d0(0x703)](this[_0x3117d0(0x7bb)]['bind'](this,_0x436d9f));}}},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x7bb)]=function(_0x5503c0){const _0x135607=_0x16b2b1;this[_0x135607(0x5c0)]=0x14,this[_0x135607(0x4d5)]['bitmap']=_0x5503c0;SceneManager[_0x135607(0x6b0)]['isRightInputMode']()?(this['_borderPortraitSprite']['x']=0x0,this['_borderPortraitTargetX']=Math[_0x135607(0x7ba)](_0x5503c0[_0x135607(0x20c)]/0x2)):(this[_0x135607(0x4d5)]['x']=this[_0x135607(0x20c)],this[_0x135607(0x91d)]=this[_0x135607(0x20c)]*0x3/0x4);this[_0x135607(0x4d5)][_0x135607(0x548)]=0x0,this[_0x135607(0x4d5)]['y']=this['y']+this[_0x135607(0x86c)];const _0x46b6c4=BattleManager[_0x135607(0x755)]();_0x46b6c4&&(this[_0x135607(0x91d)]+=_0x46b6c4[_0x135607(0x40f)](),this[_0x135607(0x4d5)]['y']+=_0x46b6c4[_0x135607(0x42a)]());},Window_BattleStatus[_0x16b2b1(0x1ca)]['updateBorderSprite']=function(){const _0x37828d=_0x16b2b1;if(this[_0x37828d(0x5c0)]>0x0){const _0x2acfb0=this[_0x37828d(0x5c0)],_0x54d6c4=this['_borderPortraitSprite'];_0x54d6c4['x']=(_0x54d6c4['x']*(_0x2acfb0-0x1)+this[_0x37828d(0x91d)])/_0x2acfb0,_0x54d6c4[_0x37828d(0x548)]=(_0x54d6c4[_0x37828d(0x548)]*(_0x2acfb0-0x1)+0xff)/_0x2acfb0,this[_0x37828d(0x5c0)]--;}},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x888)]=function(){const _0x5c06ce=_0x16b2b1;return;this[_0x5c06ce(0x4c7)]&&(this[_0x5c06ce(0x4c7)]['x']=this['x'],this[_0x5c06ce(0x4c7)]['y']=this['y']),this[_0x5c06ce(0x55a)]&&(this[_0x5c06ce(0x55a)]['x']=this['x'],this[_0x5c06ce(0x55a)]['y']=this['y']);},Window_BattleStatus[_0x16b2b1(0x1ca)][_0x16b2b1(0x628)]=function(){const _0x4d0baf=_0x16b2b1,_0x44b414=VisuMZ[_0x4d0baf(0x4da)][_0x4d0baf(0x6ac)]['BattleLayout'];if(_0x44b414[_0x4d0baf(0x3e1)]){const _0x4ebfe1=new Sprite();_0x4ebfe1['bitmap']=ImageManager['loadSystem'](_0x44b414[_0x4d0baf(0x3e1)]),_0x4ebfe1['x']=_0x44b414[_0x4d0baf(0x831)]||0x0,_0x4ebfe1['y']=_0x44b414[_0x4d0baf(0x7c2)]||0x0,this[_0x4d0baf(0x2a7)](_0x4ebfe1),this[_0x4d0baf(0x830)]=_0x4ebfe1;}if(_0x44b414[_0x4d0baf(0x8b9)]){const _0x232ca7=new Sprite();_0x232ca7[_0x4d0baf(0x4ee)]=ImageManager[_0x4d0baf(0x5c6)](_0x44b414['StatusWindowAttachmentFront']),_0x232ca7['x']=_0x44b414[_0x4d0baf(0x481)]||0x0,_0x232ca7['y']=_0x44b414[_0x4d0baf(0x216)]||0x0,this[_0x4d0baf(0x7d4)](_0x232ca7),this['_frontAttachmentSprite']=_0x232ca7;}},Window_BattleStatus['prototype']['updateAttachmentSprites']=function(){const _0x477d9a=_0x16b2b1;this[_0x477d9a(0x1ad)]&&this[_0x477d9a(0x7d4)](this[_0x477d9a(0x1ad)]);},Window_BattleActor[_0x16b2b1(0x1ca)][_0x16b2b1(0x923)]=function(){const _0x9260a8=_0x16b2b1;return Window_BattleStatus[_0x9260a8(0x1ca)][_0x9260a8(0x923)][_0x9260a8(0x357)](this)&&this[_0x9260a8(0x1b7)]();},Window_BattleActor[_0x16b2b1(0x1ca)]['isActionSelectionValid']=function(){const _0x19cab9=_0x16b2b1,_0xc01d22=BattleManager[_0x19cab9(0x891)](),_0x39cece=this[_0x19cab9(0x755)](this['index']());if(!_0xc01d22)return!![];if(!_0xc01d22['item']())return!![];const _0x44e113=_0xc01d22[_0x19cab9(0x3e3)]()['note'];if(_0x44e113[_0x19cab9(0x6ef)](/<CANNOT TARGET (?:USER|SELF)>/i)){if(_0x39cece===BattleManager['actor']())return![];}return!![];},VisuMZ[_0x16b2b1(0x4da)]['Window_BattleEnemy_initialize']=Window_BattleEnemy['prototype'][_0x16b2b1(0x77d)],Window_BattleEnemy['prototype'][_0x16b2b1(0x77d)]=function(_0x4a4fd8){const _0x1ae9e9=_0x16b2b1;this[_0x1ae9e9(0x810)]=null,VisuMZ[_0x1ae9e9(0x4da)][_0x1ae9e9(0x19f)][_0x1ae9e9(0x357)](this,_0x4a4fd8);},Window_BattleEnemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x326)]=function(){const _0xbd55b9=_0x16b2b1;return this[_0xbd55b9(0x520)]();},VisuMZ['BattleCore'][_0x16b2b1(0x76f)]=Window_BattleEnemy['prototype'][_0x16b2b1(0x972)],Window_BattleEnemy[_0x16b2b1(0x1ca)]['show']=function(){const _0x1bc862=_0x16b2b1;VisuMZ[_0x1bc862(0x4da)][_0x1bc862(0x76f)][_0x1bc862(0x357)](this),this['y']=Graphics[_0x1bc862(0x86c)]*0xa;},Window_BattleEnemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x41e)]=function(){const _0x485a8e=_0x16b2b1;return $gameTroop['aliveMembers']()[_0x485a8e(0x2ed)](0x0);},Window_BattleEnemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x388)]=function(){const _0x4de5a4=_0x16b2b1;this[_0x4de5a4(0x331)]=this[_0x4de5a4(0x41e)](),this['sortEnemies'](),Window_Selectable[_0x4de5a4(0x1ca)][_0x4de5a4(0x388)][_0x4de5a4(0x357)](this);},Window_BattleEnemy['prototype'][_0x16b2b1(0x801)]=function(){const _0x5d7cf4=_0x16b2b1;this['_enemies']['sort']((_0x26c839,_0x3628ca)=>{const _0x8bfd21=_0x46a0;return _0x26c839[_0x8bfd21(0x4e0)]()['_baseX']===_0x3628ca[_0x8bfd21(0x4e0)]()['_baseX']?_0x26c839[_0x8bfd21(0x4e0)]()[_0x8bfd21(0x19e)]-_0x3628ca[_0x8bfd21(0x4e0)]()['_baseY']:_0x26c839['battler']()[_0x8bfd21(0x5f5)]-_0x3628ca[_0x8bfd21(0x4e0)]()[_0x8bfd21(0x5f5)];}),SceneManager[_0x5d7cf4(0x6fb)]()&&this[_0x5d7cf4(0x331)][_0x5d7cf4(0x342)]();},Window_BattleEnemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x90f)]=function(){const _0x2ffb22=_0x16b2b1,_0xfedb14=VisuMZ[_0x2ffb22(0x4da)][_0x2ffb22(0x6ac)][_0x2ffb22(0x706)];_0xfedb14[_0x2ffb22(0x1c4)]?this[_0x2ffb22(0x2fd)]():this[_0x2ffb22(0x5f3)]();},Window_BattleEnemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x2fd)]=function(){const _0x19c6ed=_0x16b2b1;if(this[_0x19c6ed(0x810)]&&this[_0x19c6ed(0x331)][_0x19c6ed(0x3e4)](this[_0x19c6ed(0x810)])){const _0x29b9b0=this[_0x19c6ed(0x331)][_0x19c6ed(0x925)](this[_0x19c6ed(0x810)]);this[_0x19c6ed(0x2fb)](_0x29b9b0);}else this[_0x19c6ed(0x5f3)]();},Window_BattleEnemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x5f3)]=function(){const _0x4bc64b=_0x16b2b1,_0x1202ef=VisuMZ[_0x4bc64b(0x4da)][_0x4bc64b(0x6ac)][_0x4bc64b(0x706)];let _0x589cad=![];$gameSystem[_0x4bc64b(0x5a0)]()?_0x589cad=_0x1202ef[_0x4bc64b(0x2b8)]:_0x589cad=_0x1202ef[_0x4bc64b(0x75d)],this[_0x4bc64b(0x2fb)](_0x589cad?this[_0x4bc64b(0x520)]()-0x1:0x0);},Window_BattleEnemy[_0x16b2b1(0x1ca)][_0x16b2b1(0x704)]=function(){const _0x32714d=_0x16b2b1;Window_Selectable[_0x32714d(0x1ca)][_0x32714d(0x704)][_0x32714d(0x357)](this),this[_0x32714d(0x810)]=this['enemy']();},Window_BattleItem[_0x16b2b1(0x1ca)][_0x16b2b1(0x3e4)]=function(_0x2bca1a){const _0x2a5f12=_0x16b2b1;if(!_0x2bca1a)return![];return _0x2bca1a['occasion']===0x0||_0x2bca1a[_0x2a5f12(0x844)]===0x1;};function Window_AutoBattleCancel(){this['initialize'](...arguments);}Window_AutoBattleCancel['prototype']=Object[_0x16b2b1(0x446)](Window_Base[_0x16b2b1(0x1ca)]),Window_AutoBattleCancel[_0x16b2b1(0x1ca)]['constructor']=Window_AutoBattleCancel,Window_AutoBattleCancel['prototype'][_0x16b2b1(0x77d)]=function(_0x1f5b29){const _0x4f5629=_0x16b2b1;Window_Base['prototype']['initialize'][_0x4f5629(0x357)](this,_0x1f5b29),this['setBackgroundType'](this['bgType']()),this[_0x4f5629(0x388)]();},Window_AutoBattleCancel['prototype']['bgType']=function(){const _0x3a5b2e=_0x16b2b1;return VisuMZ['BattleCore'][_0x3a5b2e(0x6ac)][_0x3a5b2e(0x352)][_0x3a5b2e(0x74a)];},Window_AutoBattleCancel[_0x16b2b1(0x1ca)][_0x16b2b1(0x388)]=function(){const _0x1f873b=_0x16b2b1;this[_0x1f873b(0x394)][_0x1f873b(0x7e7)]();const _0x61424e=VisuMZ[_0x1f873b(0x4da)][_0x1f873b(0x6ac)][_0x1f873b(0x352)][_0x1f873b(0x29f)],_0x4bf446=_0x61424e[_0x1f873b(0x742)](this[_0x1f873b(0x1a3)](),this[_0x1f873b(0x315)]()),_0x1f0cec=this[_0x1f873b(0x260)](_0x4bf446)[_0x1f873b(0x20c)],_0x44ce33=Math[_0x1f873b(0x3db)]((this['innerWidth']-_0x1f0cec)/0x2);this[_0x1f873b(0x94c)](_0x4bf446,_0x44ce33,0x0,_0x1f0cec);},Window_AutoBattleCancel[_0x16b2b1(0x1ca)]['okButtonText']=function(){const _0x35b1f4=_0x16b2b1;return Imported[_0x35b1f4(0x64f)]?TextManager[_0x35b1f4(0x4d4)]('ok'):VisuMZ[_0x35b1f4(0x4da)][_0x35b1f4(0x6ac)]['AutoBattle'][_0x35b1f4(0x39d)];},Window_AutoBattleCancel[_0x16b2b1(0x1ca)]['cancelButtonText']=function(){const _0x158bf9=_0x16b2b1;return Imported['VisuMZ_0_CoreEngine']?TextManager[_0x158bf9(0x4d4)]('cancel'):VisuMZ[_0x158bf9(0x4da)][_0x158bf9(0x6ac)][_0x158bf9(0x352)][_0x158bf9(0x329)];},Window_AutoBattleCancel['prototype']['update']=function(){const _0x993a4c=_0x16b2b1;Window_Base[_0x993a4c(0x1ca)][_0x993a4c(0x541)][_0x993a4c(0x357)](this),this[_0x993a4c(0x6f6)](),this['updateCancel']();},Window_AutoBattleCancel['prototype'][_0x16b2b1(0x6f6)]=function(){this['visible']=BattleManager['_autoBattle'];},Window_AutoBattleCancel['prototype']['updateCancel']=function(){const _0x5e40a5=_0x16b2b1;if(!BattleManager['_autoBattle'])return;(Input[_0x5e40a5(0x348)]('ok')||Input[_0x5e40a5(0x348)](_0x5e40a5(0x3a9))||TouchInput['isClicked']()||TouchInput[_0x5e40a5(0x21a)]())&&(SoundManager[_0x5e40a5(0x8d0)](),BattleManager['_autoBattle']=![],Input[_0x5e40a5(0x7e7)](),TouchInput[_0x5e40a5(0x7e7)]());};function Window_EnemyName(){const _0x23873b=_0x16b2b1;this[_0x23873b(0x77d)](...arguments);}Window_EnemyName[_0x16b2b1(0x1ca)]=Object['create'](Window_StatusBase[_0x16b2b1(0x1ca)]),Window_EnemyName[_0x16b2b1(0x1ca)][_0x16b2b1(0x651)]=Window_EnemyName,Window_EnemyName['prototype'][_0x16b2b1(0x77d)]=function(_0x4a5fd5){const _0x5371ef=_0x16b2b1;this['_enemyID']=_0x4a5fd5,this['_text']='';const _0x3d1c1f=new Rectangle(0x0,0x0,Graphics[_0x5371ef(0x2af)],this[_0x5371ef(0x268)]()*0x4);Window_StatusBase[_0x5371ef(0x1ca)][_0x5371ef(0x77d)][_0x5371ef(0x357)](this,_0x3d1c1f),this['setBackgroundType'](0x2),this[_0x5371ef(0x18c)]=0x0;},Window_EnemyName[_0x16b2b1(0x1ca)][_0x16b2b1(0x18a)]=function(){const _0x1837e6=_0x16b2b1;this[_0x1837e6(0x2d7)]=0x0;},Window_EnemyName['prototype']['enemy']=function(){const _0x240ed6=_0x16b2b1;return $gameTroop[_0x240ed6(0x1ac)]()[this[_0x240ed6(0x510)]];},Window_EnemyName['prototype'][_0x16b2b1(0x541)]=function(){const _0x170a17=_0x16b2b1;Window_StatusBase[_0x170a17(0x1ca)][_0x170a17(0x541)]['call'](this),this[_0x170a17(0x330)]()&&this[_0x170a17(0x330)]()['name']()!==this[_0x170a17(0x3aa)]&&(this[_0x170a17(0x3aa)]=this['enemy']()[_0x170a17(0x802)](),this[_0x170a17(0x388)]()),this[_0x170a17(0x5c4)](),this[_0x170a17(0x632)]();},Window_EnemyName[_0x16b2b1(0x1ca)]['updateOpacity']=function(){const _0x70b1da=_0x16b2b1;if(!this[_0x70b1da(0x330)]()){if(this['contentsOpacity']>0x0)this['contentsOpacity']-=0x10;}else{if(this[_0x70b1da(0x330)]()[_0x70b1da(0x8dc)]()){if(this[_0x70b1da(0x18c)]>0x0)this[_0x70b1da(0x18c)]-=0x10;}else{if(SceneManager[_0x70b1da(0x6b0)][_0x70b1da(0x364)]&&SceneManager[_0x70b1da(0x6b0)][_0x70b1da(0x364)]['active']&&SceneManager[_0x70b1da(0x6b0)][_0x70b1da(0x364)][_0x70b1da(0x331)][_0x70b1da(0x3e4)](this[_0x70b1da(0x330)]())){if(this['contentsOpacity']<0xff)this['contentsOpacity']+=0x10;}else this[_0x70b1da(0x18c)]>0x0&&(this['contentsOpacity']-=0x10);}}},Window_EnemyName[_0x16b2b1(0x1ca)][_0x16b2b1(0x632)]=function(){const _0x2de4ec=_0x16b2b1;if(!this[_0x2de4ec(0x330)]())return;SceneManager[_0x2de4ec(0x6fb)]()?this['x']=Graphics[_0x2de4ec(0x2af)]-this['enemy']()['battler']()['_baseX']:this['x']=this['enemy']()['battler']()[_0x2de4ec(0x5f5)];this['x']-=Math['round'](this[_0x2de4ec(0x20c)]/0x2),this['y']=this[_0x2de4ec(0x330)]()['battler']()['_baseY']-Math[_0x2de4ec(0x855)](this[_0x2de4ec(0x268)]()*1.5);const _0x32c043=VisuMZ['BattleCore'][_0x2de4ec(0x6ac)][_0x2de4ec(0x706)];this['x']+=_0x32c043[_0x2de4ec(0x6f8)]||0x0,this['y']+=_0x32c043[_0x2de4ec(0x83d)]||0x0;},Window_EnemyName[_0x16b2b1(0x1ca)]['resetFontSettings']=function(){const _0x38ef5a=_0x16b2b1;Window_Base[_0x38ef5a(0x1ca)][_0x38ef5a(0x6c7)]['call'](this),this[_0x38ef5a(0x394)]['fontSize']=VisuMZ[_0x38ef5a(0x4da)][_0x38ef5a(0x6ac)]['Enemy'][_0x38ef5a(0x8a7)];},Window_EnemyName[_0x16b2b1(0x1ca)][_0x16b2b1(0x388)]=function(){const _0x5b5799=_0x16b2b1;Window_StatusBase[_0x5b5799(0x1ca)][_0x5b5799(0x388)][_0x5b5799(0x357)](this),this[_0x5b5799(0x394)][_0x5b5799(0x7e7)]();if(!this['enemy']())return;this['drawEnemyName']();},Window_EnemyName['prototype']['drawEnemyName']=function(){const _0x48c57b=_0x16b2b1;this[_0x48c57b(0x3aa)]=this[_0x48c57b(0x330)]()[_0x48c57b(0x802)]();const _0x43a466=this[_0x48c57b(0x260)](this[_0x48c57b(0x3aa)])[_0x48c57b(0x20c)],_0x23dd94=Math[_0x48c57b(0x855)]((this[_0x48c57b(0x54f)]-_0x43a466)/0x2);this[_0x48c57b(0x94c)](this[_0x48c57b(0x3aa)],_0x23dd94,0x0,_0x43a466+0x8);},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x765)]=function(){const _0x10aa4b=_0x16b2b1;return VisuMZ[_0x10aa4b(0x4da)][_0x10aa4b(0x6ac)][_0x10aa4b(0x458)][_0x10aa4b(0x462)];},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x386)]=function(){const _0x140dd4=_0x16b2b1;return VisuMZ[_0x140dd4(0x4da)][_0x140dd4(0x6ac)][_0x140dd4(0x458)]['MessageWait'];},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x89d)]=function(){const _0x4da8ef=_0x16b2b1;return VisuMZ[_0x4da8ef(0x4da)][_0x4da8ef(0x6ac)][_0x4da8ef(0x458)]['BackColor'];},Window_BattleLog['prototype']['isFastForward']=function(){return![];},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x23e)]=function(_0x53eee1,_0x307d34){const _0x453a31=_0x16b2b1;this[_0x453a31(0x56a)](_0x453a31(0x53c)),BattleManager[_0x453a31(0x588)](_0x53eee1,_0x307d34),this[_0x453a31(0x23f)]();},Window_BattleLog['prototype'][_0x16b2b1(0x53c)]=function(){const _0xd75cfc=_0x16b2b1;this[_0xd75cfc(0x23f)]();},Window_BattleLog[_0x16b2b1(0x1ca)]['push']=function(_0x69ed2d){const _0x1ef0a5=_0x16b2b1,_0x3a486f=Array[_0x1ef0a5(0x1ca)][_0x1ef0a5(0x2ed)]['call'](arguments,0x1),_0x2120e2={'name':_0x69ed2d,'params':_0x3a486f},_0x203015=this[_0x1ef0a5(0x78c)][_0x1ef0a5(0x5b1)](_0x23a5f0=>_0x23a5f0[_0x1ef0a5(0x802)])[_0x1ef0a5(0x925)]('actionSplicePoint');_0x203015>=0x0?this[_0x1ef0a5(0x78c)][_0x1ef0a5(0x512)](_0x203015,0x0,_0x2120e2):this[_0x1ef0a5(0x78c)]['push'](_0x2120e2);},Window_BattleLog[_0x16b2b1(0x1ca)]['unshift']=function(_0x17a998){const _0x5ccd43=_0x16b2b1,_0x25a4e3=Array[_0x5ccd43(0x1ca)][_0x5ccd43(0x2ed)][_0x5ccd43(0x357)](arguments,0x1);this['_methods']['unshift']({'name':_0x17a998,'params':_0x25a4e3});},Window_BattleLog[_0x16b2b1(0x1ca)]['logActionList']=function(){const _0x563a25=_0x16b2b1;if(!$gameTemp[_0x563a25(0x500)]())return;console['log'](this['_methods'][_0x563a25(0x5b1)](_0x5ea99c=>_0x5ea99c[_0x563a25(0x802)])[_0x563a25(0x920)]('\x0a'));},VisuMZ[_0x16b2b1(0x4da)]['Window_BattleLog_refresh']=Window_BattleLog['prototype'][_0x16b2b1(0x388)],Window_BattleLog['prototype']['refresh']=function(){const _0x45bdf9=_0x16b2b1;this[_0x45bdf9(0x908)]=!![];},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x637)]=Window_BattleLog['prototype'][_0x16b2b1(0x541)],Window_BattleLog['prototype']['update']=function(){const _0x3be46c=_0x16b2b1;VisuMZ[_0x3be46c(0x4da)][_0x3be46c(0x637)]['call'](this);if(this[_0x3be46c(0x908)])this[_0x3be46c(0x385)]();},Window_BattleLog[_0x16b2b1(0x1ca)]['processRefresh']=function(){const _0x21686e=_0x16b2b1;this[_0x21686e(0x908)]=![],VisuMZ[_0x21686e(0x4da)]['Window_BattleLog_refresh'][_0x21686e(0x357)](this);},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x4b5)]=function(_0x3dc2e3){const _0x2aa328=_0x16b2b1;let _0x4c0143=VisuMZ['BattleCore'][_0x2aa328(0x6ac)]['BattleLog']['TextAlign'][_0x2aa328(0x70a)]()[_0x2aa328(0x7bc)](),_0xd48a8e=this[_0x2aa328(0x7c5)][_0x3dc2e3];if(_0xd48a8e['match'](/<LEFT>/i))_0x4c0143=_0x2aa328(0x47b);else{if(_0xd48a8e[_0x2aa328(0x6ef)](/<CENTER>/i))_0x4c0143=_0x2aa328(0x6bb);else _0xd48a8e['match'](/<RIGHT>/i)&&(_0x4c0143=_0x2aa328(0x33f));}_0xd48a8e=_0xd48a8e[_0x2aa328(0x702)](/<(?:LEFT|CENTER|RIGHT)>/gi,''),_0xd48a8e=_0xd48a8e[_0x2aa328(0x702)](/\\I\[0\]/gi,'');const _0x3fe651=this[_0x2aa328(0x4be)](_0x3dc2e3);this['contents'][_0x2aa328(0x8a2)](_0x3fe651['x'],_0x3fe651['y'],_0x3fe651['width'],_0x3fe651['height']);const _0x274164=this[_0x2aa328(0x260)](_0xd48a8e)['width'];let _0x4ce0e3=_0x3fe651['x'];if(_0x4c0143===_0x2aa328(0x6bb))_0x4ce0e3+=(_0x3fe651['width']-_0x274164)/0x2;else _0x4c0143===_0x2aa328(0x33f)&&(_0x4ce0e3+=_0x3fe651[_0x2aa328(0x20c)]-_0x274164);this[_0x2aa328(0x94c)](_0xd48a8e,_0x4ce0e3,_0x3fe651['y'],_0x274164+0x8);},Window_BattleLog['prototype'][_0x16b2b1(0x3dc)]=function(_0x10f9ee){const _0x53dd7a=_0x16b2b1;this['_lines']['push'](_0x10f9ee),this[_0x53dd7a(0x388)](),this[_0x53dd7a(0x23f)]();},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x1df)]=function(){const _0x13de56=_0x16b2b1;let _0x54f3ba=![];switch(this[_0x13de56(0x375)]){case _0x13de56(0x712):_0x54f3ba=this['_spriteset'][_0x13de56(0x5a3)]();break;case'movement':_0x54f3ba=this[_0x13de56(0x7d7)][_0x13de56(0x631)]();break;case _0x13de56(0x534):_0x54f3ba=this[_0x13de56(0x7d7)][_0x13de56(0x8ba)]();break;case'float':_0x54f3ba=this[_0x13de56(0x7d7)]['isAnyoneFloating']();break;case _0x13de56(0x28d):_0x54f3ba=this[_0x13de56(0x7d7)]['isAnyoneJumping']();break;case'opacity':_0x54f3ba=this['_spriteset'][_0x13de56(0x616)]();break;}return!_0x54f3ba&&(this[_0x13de56(0x375)]=''),_0x54f3ba;},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x48f)]=function(){const _0x41939a=_0x16b2b1;this[_0x41939a(0x384)](_0x41939a(0x534));},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x387)]=function(){const _0x59faab=_0x16b2b1;this[_0x59faab(0x384)]('float');},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x490)]=function(){const _0x2ddf82=_0x16b2b1;this[_0x2ddf82(0x384)](_0x2ddf82(0x28d));},Window_BattleLog[_0x16b2b1(0x1ca)]['waitForOpacity']=function(){const _0xbbe13f=_0x16b2b1;this[_0xbbe13f(0x384)](_0xbbe13f(0x548));},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x575)]=function(){const _0x457883=_0x16b2b1,_0x28bdc2=VisuMZ['BattleCore'][_0x457883(0x6ac)]['BattleLog'];if(!_0x28bdc2['StartTurnShow'])return;this[_0x457883(0x305)](_0x457883(0x3dc),_0x28bdc2['StartTurnMsg']['format']($gameTroop[_0x457883(0x1bf)]())),this[_0x457883(0x305)]('waitCount',_0x28bdc2[_0x457883(0x2e5)]),this[_0x457883(0x305)]('clear');},Window_BattleLog[_0x16b2b1(0x1ca)]['startAction']=function(_0x32f76d,_0x3e4ee6,_0x50524c){const _0x1cb9b8=_0x16b2b1;this[_0x1cb9b8(0x1f3)](_0x3e4ee6)?BattleManager[_0x1cb9b8(0x83a)]():this[_0x1cb9b8(0x288)](_0x32f76d,_0x3e4ee6,_0x50524c);},Window_BattleLog['prototype'][_0x16b2b1(0x1f3)]=function(_0x43be0c){const _0x3d5275=_0x16b2b1;if(!SceneManager[_0x3d5275(0x7ed)]())return![];if(!_0x43be0c)return![];if(!_0x43be0c[_0x3d5275(0x3e3)]())return![];if(_0x43be0c[_0x3d5275(0x3e3)]()['note'][_0x3d5275(0x6ef)](/<CUSTOM ACTION SEQUENCE>/i))return!![];if(DataManager[_0x3d5275(0x295)](_0x43be0c['item']()))return!![];return![];},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x288)]=function(_0x34bd11,_0x477882,_0x2f250e){const _0x4add6e=_0x16b2b1,_0x112a69=_0x477882['item']();this['setupActionSet'](_0x34bd11,_0x477882,_0x2f250e),this[_0x4add6e(0x379)](_0x34bd11,_0x477882,_0x2f250e),this['finishActionSet'](_0x34bd11,_0x477882,_0x2f250e);},Window_BattleLog['prototype']['displayAction']=function(_0x9b22d,_0x294d0b){const _0x477edb=_0x16b2b1,_0x2bd261=VisuMZ[_0x477edb(0x4da)]['Settings'][_0x477edb(0x458)];_0x2bd261[_0x477edb(0x8aa)]&&this[_0x477edb(0x305)](_0x477edb(0x3dc),_0x477edb(0x8a0)['format'](DataManager['battleDisplayText'](_0x294d0b)));if(DataManager[_0x477edb(0x540)](_0x294d0b)){if(_0x2bd261[_0x477edb(0x965)])this[_0x477edb(0x433)](_0x294d0b[_0x477edb(0x592)],_0x9b22d,_0x294d0b);if(_0x2bd261[_0x477edb(0x88d)])this[_0x477edb(0x433)](_0x294d0b[_0x477edb(0x37c)],_0x9b22d,_0x294d0b);}else{if(_0x2bd261[_0x477edb(0x263)])this[_0x477edb(0x433)](TextManager['useItem'],_0x9b22d,_0x294d0b);}},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x3ad)]=function(_0x17d620,_0x319da2,_0x44a507){const _0x25b5e8=_0x16b2b1,_0x4137c4=_0x319da2['item']();this[_0x25b5e8(0x452)](_0x17d620,_0x4137c4),this[_0x25b5e8(0x305)]('applyImmortal',_0x17d620,_0x44a507,!![]),this[_0x25b5e8(0x305)]('performActionStart',_0x17d620,_0x319da2),this[_0x25b5e8(0x305)](_0x25b5e8(0x33b)),this[_0x25b5e8(0x305)]('performCastAnimation',_0x17d620,_0x319da2),this[_0x25b5e8(0x305)]('waitForAnimation');},Window_BattleLog[_0x16b2b1(0x1ca)]['createEffectActionSet']=function(_0x27e3b7,_0x2c0fb0,_0x5b8473){const _0x216351=_0x16b2b1;if(this[_0x216351(0x91f)](_0x2c0fb0))this[_0x216351(0x245)](_0x27e3b7,_0x2c0fb0,_0x5b8473);else{if(this[_0x216351(0x200)](_0x2c0fb0))this['autoMeleeMultiTargetActionSet'](_0x27e3b7,_0x2c0fb0,_0x5b8473);else _0x2c0fb0['isForRandom']()?this['targetActionSet'](_0x27e3b7,_0x2c0fb0,_0x5b8473):this['wholeActionSet'](_0x27e3b7,_0x2c0fb0,_0x5b8473);}},Window_BattleLog['prototype'][_0x16b2b1(0x91f)]=function(_0x3ac635){const _0x48bc7b=_0x16b2b1;if(!_0x3ac635[_0x48bc7b(0x1ce)]())return![];if(!_0x3ac635['isForOne']())return![];if(!_0x3ac635[_0x48bc7b(0x6b1)]())return![];return VisuMZ[_0x48bc7b(0x4da)][_0x48bc7b(0x6ac)][_0x48bc7b(0x7df)][_0x48bc7b(0x346)];},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x245)]=function(_0xc5de05,_0x8a4c8c,_0x573c6b){const _0xe2c20f=_0x16b2b1,_0x2900b3=_0xc5de05['getAttackMotion']()[_0xe2c20f(0x617)]<0x2,_0x9a2382=0x14,_0x55d21b=0x30;_0x2900b3&&(this[_0xe2c20f(0x305)](_0xe2c20f(0x4eb),[_0xc5de05],_0x55d21b,_0x9a2382),this[_0xe2c20f(0x305)]('performMoveToTargets',_0xc5de05,_0x573c6b,'front\x20base',_0x9a2382,!![],_0xe2c20f(0x1ed),!![]),this['push']('requestMotion',[_0xc5de05],'walk'),this['push'](_0xe2c20f(0x33b)));let _0x40d5fe=_0x8a4c8c[_0xe2c20f(0x3cc)]()?this['getDualWieldTimes'](_0xc5de05):0x1;for(let _0x461701=0x0;_0x461701<_0x40d5fe;_0x461701++){_0x8a4c8c[_0xe2c20f(0x3cc)]()&&_0xc5de05[_0xe2c20f(0x68f)]()&&this[_0xe2c20f(0x305)](_0xe2c20f(0x307),_0xc5de05,_0x461701),_0x8a4c8c['item']()[_0xe2c20f(0x7f0)]<0x0?this[_0xe2c20f(0x48e)](_0xc5de05,_0x8a4c8c,_0x573c6b):this[_0xe2c20f(0x441)](_0xc5de05,_0x8a4c8c,_0x573c6b);}_0x8a4c8c[_0xe2c20f(0x3cc)]()&&_0xc5de05[_0xe2c20f(0x68f)]()&&this[_0xe2c20f(0x305)](_0xe2c20f(0x7de),_0xc5de05);this[_0xe2c20f(0x305)]('applyImmortal',_0xc5de05,_0x573c6b,![]);if(_0x2900b3){const _0x4eb07e=_0xc5de05['battler']();this[_0xe2c20f(0x305)]('performJump',[_0xc5de05],_0x55d21b,_0x9a2382),this[_0xe2c20f(0x305)](_0xe2c20f(0x37b),_0xc5de05,_0x4eb07e[_0xe2c20f(0x535)],_0x4eb07e[_0xe2c20f(0x1c6)],_0x9a2382,![],_0xe2c20f(0x1ed)),this['push'](_0xe2c20f(0x459),[_0xc5de05],_0xe2c20f(0x2b5)),this[_0xe2c20f(0x305)](_0xe2c20f(0x33b)),this['push'](_0xe2c20f(0x459),[_0xc5de05],_0xe2c20f(0x44c));}},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x200)]=function(_0x2cc016){const _0x4b211d=_0x16b2b1;if(!_0x2cc016[_0x4b211d(0x1ce)]())return![];if(!_0x2cc016[_0x4b211d(0x1ea)]())return![];if(!_0x2cc016[_0x4b211d(0x6b1)]())return![];return VisuMZ[_0x4b211d(0x4da)]['Settings'][_0x4b211d(0x7df)][_0x4b211d(0x215)];},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x1dd)]=function(_0x555632,_0x561177,_0x3c2b63){const _0x37a37b=_0x16b2b1,_0xa12018=_0x555632[_0x37a37b(0x7d6)]()['type']<0x2,_0x58a117=0x14,_0x471c97=0x30;_0xa12018&&(this[_0x37a37b(0x305)]('performJump',[_0x555632],_0x471c97,_0x58a117),this[_0x37a37b(0x305)]('performMoveToTargets',_0x555632,_0x3c2b63,_0x37a37b(0x7fb),_0x58a117,!![],_0x37a37b(0x1ed),!![]),this[_0x37a37b(0x305)](_0x37a37b(0x459),[_0x555632],_0x37a37b(0x44c)),this[_0x37a37b(0x305)](_0x37a37b(0x33b)));let _0x295014=_0x561177[_0x37a37b(0x3cc)]()?this[_0x37a37b(0x875)](_0x555632):0x1;for(let _0x2131c6=0x0;_0x2131c6<_0x295014;_0x2131c6++){_0x561177['isAttack']()&&_0x555632[_0x37a37b(0x68f)]()&&this[_0x37a37b(0x305)]('setActiveWeaponSet',_0x555632,_0x2131c6),this[_0x37a37b(0x441)](_0x555632,_0x561177,_0x3c2b63);}_0x561177[_0x37a37b(0x3cc)]()&&_0x555632['isActor']()&&this['push']('clearActiveWeaponSet',_0x555632);this[_0x37a37b(0x305)](_0x37a37b(0x8a3),_0x555632,_0x3c2b63,![]);if(_0xa12018){const _0x3a1af5=_0x555632[_0x37a37b(0x4e0)]();this[_0x37a37b(0x305)](_0x37a37b(0x4eb),[_0x555632],_0x471c97,_0x58a117),this['push'](_0x37a37b(0x37b),_0x555632,_0x3a1af5[_0x37a37b(0x535)],_0x3a1af5[_0x37a37b(0x1c6)],_0x58a117,![],_0x37a37b(0x1ed)),this[_0x37a37b(0x305)](_0x37a37b(0x459),[_0x555632],_0x37a37b(0x2b5)),this['push'](_0x37a37b(0x33b)),this[_0x37a37b(0x305)]('requestMotion',[_0x555632],_0x37a37b(0x44c));}},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x48e)]=function(_0x979b29,_0x42b096,_0x130417){const _0x5684be=_0x16b2b1,_0x1f4813=_0x42b096[_0x5684be(0x3e3)]();for(const _0x3ac1d3 of _0x130417){if(!_0x3ac1d3)continue;this[_0x5684be(0x305)](_0x5684be(0x6e2),_0x979b29,_0x42b096),this[_0x5684be(0x305)](_0x5684be(0x2bd),Sprite_Battler[_0x5684be(0x436)]),this[_0x5684be(0x305)](_0x5684be(0x34a),_0x979b29,[_0x3ac1d3],_0x1f4813[_0x5684be(0x7f0)]),this[_0x5684be(0x305)](_0x5684be(0x2bd),0x18),this[_0x5684be(0x305)](_0x5684be(0x23e),_0x979b29,_0x3ac1d3);}},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x441)]=function(_0x3d6bf2,_0x5e251a,_0x1de72f){const _0x175948=_0x16b2b1,_0x3a2736=_0x5e251a[_0x175948(0x3e3)]();this['push']('performAction',_0x3d6bf2,_0x5e251a),this[_0x175948(0x305)](_0x175948(0x2bd),Sprite_Battler[_0x175948(0x436)]),this[_0x175948(0x305)](_0x175948(0x34a),_0x3d6bf2,_0x1de72f[_0x175948(0x4b4)](),_0x3a2736[_0x175948(0x7f0)]),this['push'](_0x175948(0x48f));for(const _0x410c91 of _0x1de72f){if(!_0x410c91)continue;this[_0x175948(0x305)](_0x175948(0x23e),_0x3d6bf2,_0x410c91);}},Window_BattleLog[_0x16b2b1(0x1ca)]['finishActionSet']=function(_0x222a36,_0x379aff,_0x55aa6e){const _0xb98c4f=_0x16b2b1,_0x20bafb=_0x379aff[_0xb98c4f(0x3e3)]();this[_0xb98c4f(0x305)](_0xb98c4f(0x8a3),_0x222a36,_0x55aa6e,![]),this[_0xb98c4f(0x305)](_0xb98c4f(0x3d6)),this[_0xb98c4f(0x305)](_0xb98c4f(0x7e6)),this[_0xb98c4f(0x305)](_0xb98c4f(0x7e7)),this[_0xb98c4f(0x305)]('performActionEnd',_0x222a36),this['push']('waitForMovement');},Window_BattleLog[_0x16b2b1(0x1ca)]['endAction']=function(_0x31251e){},VisuMZ[_0x16b2b1(0x4da)]['Window_BattleLog_displayCurrentState']=Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x4ed)],Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x4ed)]=function(_0x1ead6f){const _0x25876e=_0x16b2b1;if(!VisuMZ['BattleCore'][_0x25876e(0x6ac)][_0x25876e(0x458)]['ShowCurrentState'])return;VisuMZ['BattleCore'][_0x25876e(0x913)]['call'](this,_0x1ead6f);},Window_BattleLog[_0x16b2b1(0x1ca)]['displayCounter']=function(_0x7ce6b8){const _0x3b8ee2=_0x16b2b1;this[_0x3b8ee2(0x305)](_0x3b8ee2(0x57b),_0x7ce6b8);VisuMZ[_0x3b8ee2(0x4da)][_0x3b8ee2(0x6ac)]['ActionSequence']['CounterPlayback']&&this['push'](_0x3b8ee2(0x34a),_0x7ce6b8,[BattleManager[_0x3b8ee2(0x8ff)]],-0x1);if(!VisuMZ[_0x3b8ee2(0x4da)][_0x3b8ee2(0x6ac)][_0x3b8ee2(0x458)]['ShowCounter'])return;this[_0x3b8ee2(0x305)](_0x3b8ee2(0x3dc),TextManager[_0x3b8ee2(0x656)][_0x3b8ee2(0x742)](_0x7ce6b8['name']()));},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x90d)]=function(_0xbcb677){const _0x4c3d57=_0x16b2b1;this['push'](_0x4c3d57(0x79d),_0xbcb677);if(!VisuMZ['BattleCore'][_0x4c3d57(0x6ac)][_0x4c3d57(0x458)][_0x4c3d57(0x3d2)])return;this[_0x4c3d57(0x305)](_0x4c3d57(0x3dc),TextManager[_0x4c3d57(0x49c)][_0x4c3d57(0x742)](_0xbcb677[_0x4c3d57(0x802)]()));},Window_BattleLog[_0x16b2b1(0x1ca)]['displayReflectionPlayBack']=function(_0x59507e,_0x49befa){const _0x22e04f=_0x16b2b1;if(VisuMZ[_0x22e04f(0x4da)][_0x22e04f(0x6ac)][_0x22e04f(0x7df)][_0x22e04f(0x422)]){const _0x1c3192=_0x49befa[_0x22e04f(0x3e3)]();this[_0x22e04f(0x305)]('showAnimation',_0x59507e,[_0x59507e],_0x1c3192[_0x22e04f(0x7f0)]);}},Window_BattleLog['prototype'][_0x16b2b1(0x1f8)]=function(_0x46dd8c,_0xb279bf){const _0x1f275a=_0x16b2b1;this[_0x1f275a(0x305)](_0x1f275a(0x4b7),_0x46dd8c,_0xb279bf);if(!VisuMZ[_0x1f275a(0x4da)][_0x1f275a(0x6ac)][_0x1f275a(0x458)][_0x1f275a(0x72b)])return;const _0x4282f9=_0x46dd8c['name'](),_0x559112=TextManager[_0x1f275a(0x4cf)][_0x1f275a(0x742)](_0x4282f9,_0xb279bf[_0x1f275a(0x802)]());this[_0x1f275a(0x305)](_0x1f275a(0x3dc),_0x559112);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x6e1)]=Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x491)],Window_BattleLog[_0x16b2b1(0x1ca)]['displayFailure']=function(_0x55fb3b){const _0xc77882=_0x16b2b1;if(!VisuMZ['BattleCore'][_0xc77882(0x6ac)]['BattleLog'][_0xc77882(0x254)])return;VisuMZ[_0xc77882(0x4da)]['Window_BattleLog_displayFailure'][_0xc77882(0x357)](this,_0x55fb3b);},VisuMZ['BattleCore'][_0x16b2b1(0x5bc)]=Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x513)],Window_BattleLog['prototype']['displayCritical']=function(_0x2d9462){const _0x444015=_0x16b2b1;if(!VisuMZ[_0x444015(0x4da)][_0x444015(0x6ac)]['BattleLog'][_0x444015(0x894)])return;VisuMZ[_0x444015(0x4da)]['Window_BattleLog_displayCritical'][_0x444015(0x357)](this,_0x2d9462);},VisuMZ[_0x16b2b1(0x4da)]['Window_BattleLog_displayMiss']=Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x26e)],Window_BattleLog['prototype'][_0x16b2b1(0x26e)]=function(_0x2fcc4b){const _0x114d0a=_0x16b2b1;!VisuMZ['BattleCore'][_0x114d0a(0x6ac)]['BattleLog'][_0x114d0a(0x195)]?this[_0x114d0a(0x305)](_0x114d0a(0x90a),_0x2fcc4b):VisuMZ[_0x114d0a(0x4da)][_0x114d0a(0x30d)][_0x114d0a(0x357)](this,_0x2fcc4b);},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x723)]=Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x82d)],Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x82d)]=function(_0x22b119){const _0x262038=_0x16b2b1;!VisuMZ[_0x262038(0x4da)][_0x262038(0x6ac)][_0x262038(0x458)]['ShowMissEvasion']?_0x22b119['result']()[_0x262038(0x566)]?this['push'](_0x262038(0x49d),_0x22b119):this[_0x262038(0x305)](_0x262038(0x686),_0x22b119):VisuMZ[_0x262038(0x4da)][_0x262038(0x723)][_0x262038(0x357)](this,_0x22b119);},Window_BattleLog[_0x16b2b1(0x1ca)]['displayHpDamage']=function(_0x595453){const _0x1d2b9d=_0x16b2b1;_0x595453[_0x1d2b9d(0x7c7)]()[_0x1d2b9d(0x1f2)]&&(_0x595453['result']()[_0x1d2b9d(0x80f)]>0x0&&!_0x595453['result']()[_0x1d2b9d(0x341)]&&this[_0x1d2b9d(0x305)]('performDamage',_0x595453),_0x595453[_0x1d2b9d(0x7c7)]()['hpDamage']<0x0&&this[_0x1d2b9d(0x305)]('performRecovery',_0x595453),VisuMZ[_0x1d2b9d(0x4da)][_0x1d2b9d(0x6ac)][_0x1d2b9d(0x458)][_0x1d2b9d(0x1d2)]&&this[_0x1d2b9d(0x305)](_0x1d2b9d(0x3dc),this['makeHpDamageText'](_0x595453)));},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x681)]=Window_BattleLog['prototype'][_0x16b2b1(0x3d3)],Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x3d3)]=function(_0x143a08){const _0x10066f=_0x16b2b1;if(!VisuMZ[_0x10066f(0x4da)][_0x10066f(0x6ac)][_0x10066f(0x458)][_0x10066f(0x73c)])return;VisuMZ[_0x10066f(0x4da)][_0x10066f(0x681)][_0x10066f(0x357)](this,_0x143a08);},VisuMZ['BattleCore']['Window_BattleLog_displayTpDamage']=Window_BattleLog[_0x16b2b1(0x1ca)]['displayTpDamage'],Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x4e6)]=function(_0x5aaf58){const _0x5a0995=_0x16b2b1;if(!VisuMZ[_0x5a0995(0x4da)][_0x5a0995(0x6ac)][_0x5a0995(0x458)][_0x5a0995(0x32d)])return;VisuMZ[_0x5a0995(0x4da)][_0x5a0995(0x662)][_0x5a0995(0x357)](this,_0x5aaf58);},Window_BattleLog['prototype'][_0x16b2b1(0x8c6)]=function(_0x332a10){const _0x1663b9=_0x16b2b1,_0x4b3157=_0x332a10[_0x1663b9(0x7c7)](),_0x3f3826=_0x4b3157['addedStateObjects']();for(const _0x18fee5 of _0x3f3826){const _0x904eaf=_0x332a10[_0x1663b9(0x68f)]()?_0x18fee5[_0x1663b9(0x592)]:_0x18fee5[_0x1663b9(0x37c)];_0x904eaf&&VisuMZ['BattleCore'][_0x1663b9(0x6ac)][_0x1663b9(0x458)][_0x1663b9(0x78e)]&&(this[_0x1663b9(0x305)]('popBaseLine'),this['push'](_0x1663b9(0x4bf)),this[_0x1663b9(0x305)]('addText',_0x904eaf[_0x1663b9(0x742)](_0x332a10[_0x1663b9(0x802)]())),this['push'](_0x1663b9(0x7bd))),_0x18fee5['id']===_0x332a10[_0x1663b9(0x8ed)]()&&this[_0x1663b9(0x305)](_0x1663b9(0x7c6),_0x332a10);}},Window_BattleLog['prototype'][_0x16b2b1(0x3a6)]=function(_0x4887cf){const _0x2f78db=_0x16b2b1;if(!VisuMZ[_0x2f78db(0x4da)][_0x2f78db(0x6ac)][_0x2f78db(0x458)]['ShowRemovedState'])return;const _0x5ef77f=_0x4887cf[_0x2f78db(0x7c7)](),_0x12946d=_0x5ef77f[_0x2f78db(0x553)]();for(const _0x4acd7b of _0x12946d){_0x4acd7b['message4']&&(this[_0x2f78db(0x305)]('popBaseLine'),this['push'](_0x2f78db(0x4bf)),this[_0x2f78db(0x305)]('addText',_0x4acd7b['message4'][_0x2f78db(0x742)](_0x4887cf['name']())),this[_0x2f78db(0x305)](_0x2f78db(0x7bd)));}},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x39a)]=function(_0x3066f0){const _0x4617e3=_0x16b2b1,_0x428691=VisuMZ['BattleCore'][_0x4617e3(0x6ac)][_0x4617e3(0x458)],_0x37871b=_0x3066f0[_0x4617e3(0x7c7)]();if(_0x428691[_0x4617e3(0x38b)])this[_0x4617e3(0x5ec)](_0x3066f0,_0x37871b['addedBuffs'],TextManager[_0x4617e3(0x219)]);if(_0x428691['ShowAddedDebuff'])this[_0x4617e3(0x5ec)](_0x3066f0,_0x37871b[_0x4617e3(0x83e)],TextManager['debuffAdd']);if(_0x428691[_0x4617e3(0x5b0)])this[_0x4617e3(0x5ec)](_0x3066f0,_0x37871b['removedBuffs'],TextManager[_0x4617e3(0x32b)]);},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x5ec)]=function(_0x88e469,_0x2f539e,_0x16afed){const _0x4cc666=_0x16b2b1;for(const _0x2ba500 of _0x2f539e){const _0x5699af=_0x16afed[_0x4cc666(0x742)](_0x88e469[_0x4cc666(0x802)](),TextManager[_0x4cc666(0x8ef)](_0x2ba500));this['push']('popBaseLine'),this[_0x4cc666(0x305)]('pushBaseLine'),this[_0x4cc666(0x305)](_0x4cc666(0x3dc),_0x5699af),this[_0x4cc666(0x305)]('wait');}},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x7da)]=Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x7e7)],Window_BattleLog['prototype'][_0x16b2b1(0x7e7)]=function(){const _0x127b9b=_0x16b2b1;VisuMZ[_0x127b9b(0x4da)][_0x127b9b(0x7da)][_0x127b9b(0x357)](this),this[_0x127b9b(0x23f)]();},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x62f)]=Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x4bf)],Window_BattleLog['prototype'][_0x16b2b1(0x4bf)]=function(){const _0x19d86a=_0x16b2b1;VisuMZ[_0x19d86a(0x4da)][_0x19d86a(0x62f)][_0x19d86a(0x357)](this),this[_0x19d86a(0x23f)]();},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x1af)]=Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x36f)],Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x36f)]=function(){const _0x103c53=_0x16b2b1;VisuMZ[_0x103c53(0x4da)]['Window_BattleLog_popBaseLine'][_0x103c53(0x357)](this),this['refresh'](),this[_0x103c53(0x23f)]();},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x1f7)]=Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x1ff)],Window_BattleLog['prototype'][_0x16b2b1(0x1ff)]=function(_0x4bcda7){const _0x5af818=_0x16b2b1;VisuMZ[_0x5af818(0x4da)][_0x5af818(0x1f7)][_0x5af818(0x357)](this,_0x4bcda7),this[_0x5af818(0x23f)]();},Window_BattleLog[_0x16b2b1(0x1ca)]['waitForNewLine']=function(){const _0x5e12fd=_0x16b2b1;let _0x6ff901=0x0;this[_0x5e12fd(0x282)][_0x5e12fd(0x7d1)]>0x0&&(_0x6ff901=this[_0x5e12fd(0x282)][this['_baseLineStack'][_0x5e12fd(0x7d1)]-0x1]),this[_0x5e12fd(0x7c5)][_0x5e12fd(0x7d1)]>_0x6ff901?this['wait']():this['callNextMethod']();},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x88f)]=Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x273)],Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x273)]=function(_0x1cb1be,_0x166a13){const _0x4317d9=_0x16b2b1;VisuMZ[_0x4317d9(0x4da)]['Window_BattleLog_performActionStart']['call'](this,_0x1cb1be,_0x166a13),this[_0x4317d9(0x23f)]();},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x34f)]=Window_BattleLog[_0x16b2b1(0x1ca)]['performAction'],Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x6e2)]=function(_0x31b53f,_0x157efa){const _0x3dacfb=_0x16b2b1;VisuMZ[_0x3dacfb(0x4da)]['Window_BattleLog_performAction']['call'](this,_0x31b53f,_0x157efa),this[_0x3dacfb(0x23f)]();},VisuMZ[_0x16b2b1(0x4da)]['Window_BattleLog_performActionEnd']=Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x27e)],Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x27e)]=function(_0x369938){const _0x3e1552=_0x16b2b1;VisuMZ[_0x3e1552(0x4da)][_0x3e1552(0x5fa)][_0x3e1552(0x357)](this,_0x369938);for(const _0x3a7dca of BattleManager['allBattleMembers']()){if(!_0x3a7dca)continue;if(_0x3a7dca[_0x3e1552(0x8dc)]())continue;_0x3a7dca[_0x3e1552(0x72d)]();}this[_0x3e1552(0x23f)]();},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x8e5)]=Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x3ca)],Window_BattleLog[_0x16b2b1(0x1ca)]['performDamage']=function(_0x427e9e){const _0x1fce53=_0x16b2b1;VisuMZ[_0x1fce53(0x4da)][_0x1fce53(0x8e5)]['call'](this,_0x427e9e),this['callNextMethod']();},VisuMZ[_0x16b2b1(0x4da)]['Window_BattleLog_performMiss']=Window_BattleLog[_0x16b2b1(0x1ca)]['performMiss'],Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x90a)]=function(_0x734c1f){const _0x5665d4=_0x16b2b1;VisuMZ['BattleCore'][_0x5665d4(0x71e)]['call'](this,_0x734c1f),this[_0x5665d4(0x23f)]();},VisuMZ[_0x16b2b1(0x4da)]['Window_BattleLog_performRecovery']=Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x349)],Window_BattleLog['prototype']['performRecovery']=function(_0x325538){const _0x25ca18=_0x16b2b1;VisuMZ['BattleCore'][_0x25ca18(0x56d)][_0x25ca18(0x357)](this,_0x325538),this[_0x25ca18(0x23f)]();},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x92a)]=Window_BattleLog['prototype']['performEvasion'],Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x49d)]=function(_0x4af749){const _0x477a04=_0x16b2b1;VisuMZ['BattleCore']['Window_BattleLog_performEvasion']['call'](this,_0x4af749),this[_0x477a04(0x23f)]();},VisuMZ[_0x16b2b1(0x4da)][_0x16b2b1(0x24d)]=Window_BattleLog['prototype']['performMagicEvasion'],Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x686)]=function(_0x57264d){const _0x3a3216=_0x16b2b1;VisuMZ[_0x3a3216(0x4da)]['Window_BattleLog_performMagicEvasion'][_0x3a3216(0x357)](this,_0x57264d),this[_0x3a3216(0x23f)]();},VisuMZ['BattleCore'][_0x16b2b1(0x7b5)]=Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x57b)],Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x57b)]=function(_0x790e6e){const _0x29abea=_0x16b2b1;VisuMZ['BattleCore'][_0x29abea(0x7b5)]['call'](this,_0x790e6e),this[_0x29abea(0x23f)]();},VisuMZ['BattleCore'][_0x16b2b1(0x7af)]=Window_BattleLog['prototype'][_0x16b2b1(0x79d)],Window_BattleLog['prototype'][_0x16b2b1(0x79d)]=function(_0x3dbf15){const _0x19e867=_0x16b2b1;VisuMZ[_0x19e867(0x4da)]['Window_BattleLog_performReflection']['call'](this,_0x3dbf15),this['callNextMethod']();},VisuMZ['BattleCore'][_0x16b2b1(0x7c9)]=Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x4b7)],Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x4b7)]=function(_0x1737de,_0x284d6a){const _0x197b35=_0x16b2b1;VisuMZ[_0x197b35(0x4da)]['Window_BattleLog_performSubstitute']['call'](this,_0x1737de,_0x284d6a),this[_0x197b35(0x23f)]();},VisuMZ[_0x16b2b1(0x4da)]['Window_BattleLog_performCollapse']=Window_BattleLog['prototype']['performCollapse'],Window_BattleLog['prototype']['performCollapse']=function(_0x5cd59e){const _0x460ae8=_0x16b2b1;VisuMZ['BattleCore'][_0x460ae8(0x557)][_0x460ae8(0x357)](this,_0x5cd59e),this[_0x460ae8(0x23f)]();},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x8c1)]=function(_0x1893c9,_0x318280){const _0x48cfea=_0x16b2b1;_0x1893c9[_0x48cfea(0x8c1)](_0x318280),this['callNextMethod']();},Window_BattleLog['prototype'][_0x16b2b1(0x4b3)]=function(_0x446426,_0x41a395){const _0x52ad2e=_0x16b2b1,_0x38010b=_0x446426[_0x52ad2e(0x728)]();_0x38010b<=0x0?SoundManager['playEnemyAttack']():this[_0x52ad2e(0x932)](_0x41a395,_0x38010b);},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x8a3)]=function(_0x2d10c4,_0x40b912,_0x211e97){const _0x4ec540=_0x16b2b1,_0x50d0ca=[_0x2d10c4][_0x4ec540(0x6ba)](_0x40b912);for(const _0x5e5af6 of _0x50d0ca){if(!_0x5e5af6)continue;_0x5e5af6[_0x4ec540(0x829)](_0x211e97);}this[_0x4ec540(0x23f)]();},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x2bd)]=function(_0x4dc8ad){this['_waitCount']=_0x4dc8ad;},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x459)]=function(_0x472807,_0x222ae0){const _0x5f3eb1=_0x16b2b1;for(const _0x47e8ff of _0x472807){if(!_0x47e8ff)continue;_0x47e8ff['requestMotion'](_0x222ae0);}this[_0x5f3eb1(0x23f)]();},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x37b)]=function(_0x5d402f,_0x2b7e02,_0x11a33b,_0x13a893,_0x44ba8c,_0x4d79d6){const _0x25f3d5=_0x16b2b1;_0x5d402f[_0x25f3d5(0x558)](_0x2b7e02,_0x11a33b,_0x13a893,_0x44ba8c,_0x4d79d6,-0x1),this['callNextMethod']();},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x50a)]=function(_0x2583ff,_0x4bb28f,_0x273faf,_0x33f17c,_0x147e1e,_0x1bf480,_0x2d8455){const _0x5a3991=_0x16b2b1,_0x32d3df=Math[_0x5a3991(0x537)](..._0x4bb28f[_0x5a3991(0x5b1)](_0x38e545=>_0x38e545['battler']()['_baseX']-_0x38e545['battler']()[_0x5a3991(0x498)]()/0x2)),_0x193444=Math['max'](..._0x4bb28f[_0x5a3991(0x5b1)](_0x478d01=>_0x478d01[_0x5a3991(0x4e0)]()[_0x5a3991(0x5f5)]+_0x478d01[_0x5a3991(0x4e0)]()[_0x5a3991(0x498)]()/0x2)),_0x5852fc=Math[_0x5a3991(0x537)](..._0x4bb28f[_0x5a3991(0x5b1)](_0xaf3179=>_0xaf3179[_0x5a3991(0x4e0)]()[_0x5a3991(0x19e)]-_0xaf3179[_0x5a3991(0x4e0)]()[_0x5a3991(0x380)]())),_0x196ae8=Math[_0x5a3991(0x6fa)](..._0x4bb28f[_0x5a3991(0x5b1)](_0xa6d5a3=>_0xa6d5a3[_0x5a3991(0x4e0)]()[_0x5a3991(0x19e)])),_0x2ad74e=_0x4bb28f['filter'](_0x32f19f=>_0x32f19f[_0x5a3991(0x68f)]())['length'],_0x2e0856=_0x4bb28f[_0x5a3991(0x1a0)](_0x5b526e=>_0x5b526e[_0x5a3991(0x73f)]())[_0x5a3991(0x7d1)];let _0xeb5d05=0x0,_0x49a580=0x0;if(_0x273faf[_0x5a3991(0x6ef)](/front/i))_0xeb5d05=_0x2ad74e>=_0x2e0856?_0x32d3df:_0x193444;else{if(_0x273faf[_0x5a3991(0x6ef)](/middle/i))_0xeb5d05=(_0x32d3df+_0x193444)/0x2,_0x2d8455=-0x1;else _0x273faf['match'](/back/i)&&(_0xeb5d05=_0x2ad74e>=_0x2e0856?_0x193444:_0x32d3df);}if(_0x273faf[_0x5a3991(0x6ef)](/head/i))_0x49a580=_0x5852fc;else{if(_0x273faf[_0x5a3991(0x6ef)](/center/i))_0x49a580=(_0x5852fc+_0x196ae8)/0x2;else _0x273faf['match'](/base/i)&&(_0x49a580=_0x196ae8);}_0x2583ff[_0x5a3991(0x558)](_0xeb5d05,_0x49a580,_0x33f17c,_0x147e1e,_0x1bf480,_0x2d8455),this['callNextMethod']();},Window_BattleLog[_0x16b2b1(0x1ca)][_0x16b2b1(0x4eb)]=function(_0x36bc00,_0x469af7,_0x4f9369){const _0x5a9803=_0x16b2b1;for(const _0x5bc37a of _0x36bc00){if(!_0x5bc37a)continue;_0x5bc37a[_0x5a9803(0x370)](_0x469af7,_0x4f9369);}this[_0x5a9803(0x23f)]();};
//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.33;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.33] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
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
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the default battle system (DTB).
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
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
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
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
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","LargerResolution":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Misc
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param LargerResolution
 * @text Larger Resolution
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
//=============================================================================

const _0x2743=['log','paramName','Flat','AccuracyBoost','([\x5c+\x5c-]\x5cd+)([%％])>','ApplyEasing','StatusBgType','playMiss','F11','platform','EVA','Sprite_Battler_startMove','ParseItemNotetags','NoTileShadows','isMapScrollLinked','ctGaugeColor2','usableSkills','_setupEventHandlers','duration','_backgroundFilter','Game_System_initialize','DataManager_setupNewGame','mev','processEscape','VisuMZ_2_BattleSystemCTB','drawGauge','deathColor','trim','_stored_crisisColor','WIN_OEM_CLEAR','ExtJS','tpGaugeColor1','center','adjustPictureAntiZoom','_pressed','string','WIN_OEM_RESET','setupBattleTestItems','ColorDeath','useDigitGrouping','ONE','Bitmap_gradientFillRect','SceneManager_isGameActive','BTB','isEnabled','WIN_ICO_CLEAR','EnableJS','isItem','mhp','_hideTileShadows','keyboard','missed','adjustBoxSize','CTRL','nextLevelExp','SPACE','updateMotion','COLON','EditRect','command357','repositionCancelButtonSideButtonLayout','ALTGR','SELECT','defaultInputMode','left','normal','crisisColor','keyMapper','_targetOffsetY','playBuzzer','LevelUpFullHp','TranslucentOpacity','isCursorMovable','Window_ShopSell_isEnabled','targetOpacity','shake','mainAreaTopSideButtonLayout','onDatabaseLoaded','outbounce','BasicParameterFormula','isArrowPressed','MenuLayout','_defaultStretchMode','Title','tpColor','SystemSetBattleSystem','printError','XParamVocab8','drawCircle','Flat1','paramMaxJS','IconSParam2','processTouchModernControls','doesNameContainBannedWords','subject','isGamepadTriggered','_windowskin','FUNC','displayY','makeCommandList','sin','VOLUME_UP','setBackgroundOpacity','resetTextColor','ColorCTGauge1','makeInputButtonString','_movementDuration','GoldBgType','targetX','IconXParam1','performEscape','getInputButtonString','WIN_OEM_JUMP','setEasingType','Linear','isActiveTpb','CRSEL','isSpecialCode','updatePositionCoreEngineShakeRand','Speed','params','retreat','VisuMZ_2_BattleSystemSTB','WIN_OEM_PA3','fromCharCode','offsetY','menu','randomJS','%1/','INOUTEXPO','MEV','keyCode','Scene_Equip_create','HIT','_itemWindow','start','isNormalPriority','processTouch','CONVERT','AnimationMirrorOffset','createBackground','19832EwZsNa','DTB','_cache','IconParam5','hpColor','Window','_shakePower','NUMPAD2','_blank','process_VisuMZ_CoreEngine_Settings','MODECHANGE','Scene_MenuBase_helpAreaTop','pagedownShowButton','isMenuButtonAssistEnabled','profileWindowRect','SParamVocab4','Sprite_Gauge_currentValue','GoldFontSize','ACCEPT','_stored_powerDownColor','Window_NameInput_cursorUp','SkillTypeBgType','ColorNormal','initialBattleSystem','imageSmoothingEnabled','paramValueByName','isPressed','IconSet','INQUINT','inBattle','INOUTCUBIC','Window_Base_createTextState','enter','_lastPluginCommandInterpreter','_muteSound','_coreEngineShakeStyle','ParseSkillNotetags','REPLACE','getColor','MAT','slotWindowRect','ColorMPGauge1','drawIcon','allowShiftScrolling','ParseAllNotetags','processAlwaysEscape','key%1','_dimmerSprite','IconXParam6','max','initCoreEngineScreenShake','picture','fadeSpeed','SCALE_MODES','processCursorHomeEndTrigger','focus','getCoreEngineScreenShakeStyle','Plus1','Color','isPlaying','end','FontSize','hpGaugeColor1','textWidth','PHA','ItemBackColor1','processKeyboardBackspace','getButtonAssistLocation','alpha','titleCommandWindow','Scene_Name_create','eva','TCR','sparamPlus1','HYPHEN_MINUS','processKeyboardHandling','name','runCombinedScrollingTextAsCode','prototype','createChildSprite','_inputString','_clientArea','paramPlusJS','PictureEraseAll','isExpGaugeDrawn','Game_Temp_initialize','Game_Interpreter_command105','FDR','hide','xparam','Window_NumberInput_start','isTpb','ColorTPGauge2','paramMax','EquipMenu','catchNormalError','lineHeight','xScrollLinkedOffset','onKeyDown','replace','(\x5cd+)([%％])>','buttonAssistKey4','_effectsContainer','_playTestFastMode','maxLvGaugeColor1','Game_Map_setup','createTitleButtons','floor','CommandBgType','isMaxLevel','reduce','updateDocumentTitle','createWindowLayer','addChild','valueOutlineWidth','Game_Interpreter_PluginCommand','drawTextEx','MainMenu','initDigitGrouping','_stored_systemColor','_slotWindow','IconSParam7','ButtonHeight','valueOutlineColor','DummyBgType','encounterStep','toLowerCase','origin','img/%1/','IconParam6','isCollidedWithEvents','<JS\x20%1\x20%2:[\x20](.*)>','BottomButtons','index','ZERO','CommandList','BaseTexture','evade','CTB','categoryWindowRect','Scene_Map_createSpriteset','_mirror','concat','LATIN1','StatusParamsRect','BuyRect','buttonAssistKey%1','atbActive','createPageButtons','maxItems','itemHeight','attackSkillId','MIN_SAFE_INTEGER','xparamPlus','MAXHP','_windowLayer','createMenuButton','itemHit','STENCIL_BUFFER_BIT','SkillTypeRect','_listWindow','BACK_SLASH','CRI','DATABASE','Sprite_Animation_processSoundTimings','BTestItems','evaluate','top','openness','STRUCT','mainAreaHeightSideButtonLayout','areButtonsHidden','eventsXyNt','helpAreaTopSideButtonLayout','gameTitle','updateKeyText','IconParam4','INOUTBOUNCE','WIN_OEM_FINISH','isSideButtonLayout','INBOUNCE','contentsOpacity','_editWindow','pictureId','updateFauxAnimations','initButtonHidden','GoldChange','bgmVolume','itemEva','Window_Base_initialize','clearRect','drawActorClass','ConvertNumberToString','type','VisuMZ_2_BattleSystemBTB','helpAreaBottom','sparamRateJS','registerCommand','MCR','_skillTypeWindow','xparamRate','519858HKBFwn','ShowButtons','faces','_inputSpecialKeyCode','EndingID','isMaskingEnabled','createCustomParameter','BattleSystem','gradientFillRect','CreateBattleSystemID','BTestWeapons','KeyItemProtect','bitmapHeight','_playtestF7Looping','updateOpacity','_battlerName','buttonAssistText4','_stored_powerUpColor','loadGameImagesCoreEngine','PGDN','statusParamsWindowRect','setClickHandler','WIN_OEM_BACKTAB','IconXParam9','Max','titles1','Subtitle','open','background','_clickHandler','process_VisuMZ_CoreEngine_CustomParameters','BgFilename1','_tempActor','KeyTAB','outlineColorDmg','system','statusWindowRect','drawValue','loadPicture','DisplayedParams','createTextState','Game_Event_isCollidedWithEvents','commandWindowRows','save','cos','option','slice','animationBaseDelay','LINEAR','setupCoreEasing','colSpacing','updateLastTarget','command122','ColorCTGauge2','Sprite_destroy','ParamChange','CNT','CAPSLOCK','catchUnknownError','dummyWindowRect','onClick','ActorHPColor','requestMotion','snapForBackground','buttonAssistWindowSideRect','enableDigitGroupingEx','animationId','NEAREST','ColorGaugeBack','fontSize','targetScaleY','_cacheScaleX','Window_NameInput_cursorPageup','ATK','processKeyboardDigitChange','NameInputMessage','_index','Scene_Boot_startNormalGame','requestFauxAnimation','learnings','split','_backgroundSprite','CEV','_cacheScaleY','_hp','setMoveEasingType','jsQuickFunc','note','sparamPlus2','innerWidth','setMainFontSize','drawGoldItemStyle','original','calcEasing','DrawItemBackgroundJS','Game_Party_consumeItem','itypeId','WIN_OEM_COPY','drawGameSubtitle','SellRect','processTimingData','_stored_expGaugeColor2','targetSpritePosition','TRAIT_PARAM','SParamVocab3','outlineColorGauge','_list','OpenURL','Game_Picture_calcEasing','SlotRect','AMPERSAND','targetContentsOpacity','updateScene','xparamRate2','onInputBannedWords','initCoreEngine','JSON','PixelateImageRendering','OUTSINE','_centerElementCoreEngine','hideButtonFromView','_spriteset','DigitGroupingExText','ATTN','Sprite_Actor_setActorHome','get','onNameOk','rgba(0,\x200,\x200,\x200.7)','OutlineColorDmg','mute','_drawTextShadow','NUMPAD8','XParamVocab5','resetFontSettings','Scene_Boot_loadSystemImages','Flat2','drawSegment','bind','ButtonFadeSpeed','F24','ConvertParams','Scene_Shop_create','stencilFunc','drawText','_pagedownButton','_realScale','createCancelButton','NUMPAD4','clear','stretch','dimColor1','processFauxAnimationRequests','isSideView','FontSmoothing','initialize','default','HANJA','_stored_tpGaugeColor2','Game_Picture_move','_fauxAnimationSprites','OTB','WIN_OEM_FJ_ROYA','KeySHIFT','gaugeBackColor','Game_Picture_initBasic','tileHeight','CommandRect','OptionsBgType','processKeyboardDelete','_stored_hpGaugeColor1','_animation','NewGameCommonEventAll','number','stringKeyMap','getCombinedScrollingText','paramFlatBonus','Game_Action_itemEva','pendingColor','expGaugeColor1','makeDocumentTitle','VOLUME_DOWN','maxLvGaugeColor2','#%1','removeChild','HelpBgType','_isButtonHidden','_shakeDuration','StartID','transform','playCursor','height','NUM','Script\x20Call\x20Error','Scene_Battle_createSpriteset','SwitchActorText','openingSpeed','WindowLayer_render','_pauseSignSprite','IconXParam5','Input_pollGamepads','useDigitGroupingEx','Abbreviation','PRINT','displayX','buttonAssistSwitch','processCursorMove','catchLoadError','mainAreaHeight','startShake','createJsQuickFunction','smallParamFontSize','Graphics','_coreEasing','updateEffekseer','Game_Action_updateLastTarget','resize','StatusEquipBgType','buttonAssistKey1','NUMPAD6','NUMPAD9','animations','Game_Actor_paramBase','isGamepadButtonPressed','DOLLAR','inbounce','SParamVocab0','updatePositionCoreEngine','TextJS','numActions','Scene_Skill_create','match','CustomParamType','style','DELETE','subjectHitRate','isKeyItem','isOpenAndActive','TitleCommandList','IconSParam9','paramRateJS','EditBgType','KeyboardInput','GetParamIcon','_forcedBattleSys','VisuMZ_1_OptionsCore','SHIFT','playOk','traitObjects','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','OUTQUINT','makeFontBigger','3109PadsXV','isNumpadPressed','param','Game_BattlerBase_refresh','sparamFlatJS','BackOpacity','Game_Picture_x','Renderer','RIGHT','PIPE','cancelShowButton','measureTextWidth','map','OS_KEY','LevelUpFullMp','paramWidth','MDF','CallHandlerJS','initCoreEasing','initMembers','abs','updateBackOpacity','MDR','OUTCUBIC','_offsetX','Scene_Menu_create','WIN_OEM_PA1','WIN_OEM_CUSEL','getGamepads','createFauxAnimation','parseForcedGameTroopSettingsCoreEngine','faceHeight','Window_Base_update','getInputMultiButtonStrings','BgType','Total','actorWindowRect','CLOSE_CURLY_BRACKET','terms','pow','FunctionName','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','RegExp','ProfileRect','IconSParam6','_digitGrouping','windowPadding','TILDE','encounterStepsMinimum','enemies','OPEN_BRACKET','buttonAssistWindowButtonRect','INSERT','pressed','drawGameVersion','Window_Selectable_cursorUp','level','CANCEL','Graphics_centerElement','_refreshPauseSign','fillText','PAUSE','XParamVocab2','Bitmap_blt','includes','processKeyboardEnd','command355','Window_StatusBase_drawActorLevel','INOUTBACK','HelpRect','drawParamName','_cancelButton','gaugeRate','targetBackOpacity','wholeDuration','Scene_Map_updateMainMultiply','STR','xparamRateJS','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','blockWidth','Bitmap_clearRect','ALT','_statusParamsWindow','itemWindowRect','levelUp','EXSEL','INEXPO','isInputting','DocumentTitleFmt','right','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','NUMPAD3','Bitmap_drawCircle','canUse','Spriteset_Base_updatePosition','ParseWeaponNotetags','fillRect','ParamMax','_offsetY','scaleMode','PA1','_shakeSpeed','CLEAR','BoxMargin','isOptionValid','(\x5cd+)>','Rate2','Game_Troop_setup','Game_Actor_levelUp','hit','isTriggered','isGameActive','levelUpRecovery','create','EnableNameInput','isAnimationForEach','isBottomHelpMode','Param','DigitGroupingDamageSprites','targetScaleX','drawCurrentParam','helpAreaHeight','Window_NameInput_processHandling','Scene_Base_createWindowLayer','Game_Actor_changeClass','startAutoNewGame','_data','MAX_GL_TEXTURES','layoutSettings','BACKSPACE','bitmapWidth','_registerKeyInput','F19','_stored_normalColor','tilesets','NumberRect','isAnimationOffsetXMirrored','animationShouldMirror','updateAnchor','Rate1','INCUBIC','paramchangeTextColor','Window_NameInput_processTouch','getColorDataFromPluginParameters','SaveMenu','isItemStyle','ColorMPGauge2','checkCacheKey','IconParam1','removeAllFauxAnimations','_forcedTroopView','createEnemies','ParseEnemyNotetags','buttonAssistOk','Window_StatusBase_drawActorSimpleStatus','_stored_mpCostColor','xparamFlatBonus','RepositionEnemies','Window_NameInput_refresh','OkText','damageColor','Window_EquipItem_isEnabled','viewport','BlurFilter','version','clamp','Scene_Boot_onDatabaseLoaded','MAXMP','ColorMPCost','markCoreEngineModified','WIN_OEM_PA2','process_VisuMZ_CoreEngine_Notetags','isEnemy','paramRate','_stored_hpGaugeColor2','NumberBgType','targetY','horizontal','loadTitle2','_addShadow','terminate','setLastPluginCommandInterpreter','_sideButtonLayout','updatePosition','updateMainMultiply','backgroundBitmap','openURL','Enable','gainGold','Window_NameInput_cursorDown','win32','boxWidth','DrawIcons','result','Window_Base_drawIcon','Game_Picture_updateMove','batch','_bitmap','StatusRect','MAX_SAFE_INTEGER','makeAutoBattleActions','TPB\x20WAIT','gaugeHeight','_inputWindow','processBack','PLAY','loadWindowskin','BattleManager_processEscape','createDimmerSprite','ARRAYFUNC','addEventListener','toString','startMove','playTestF7','members','exp','normalColor','SystemSetSideView','SystemLoadImages','Show\x20Scrolling\x20Text\x20Script\x20Error','asin','filterArea','ColorMaxLvGauge2','ColSpacing','EnableNumberInput','width','toLocaleString','_height','processSoundTimings','Type','OUTQUART','push','mainCommandWidth','buttonAssistOffset%1','ParseActorNotetags','setSkill','_customModified','SideButtons','currentClass','buttons','OUTELASTIC','SParameterFormula','InputBgType','TGR','_mode','Scene_Item_create','updatePositionCoreEngineShakeOriginal','remove','Sprite_Picture_updateOrigin','INQUAD','sparamPlus','RightMenus','updateClose','meVolume','offsetX','_stored_pendingColor','PDR','_isWindow','_stored_tpGaugeColor1','META','_baseSprite','substring','makeTargetSprites','XParameterFormula','JUNJA','ALWAYS','_fauxAnimationQueue','isUseModernControls','CustomParamAbb','update','clearZoom','WIN_ICO_HELP','constructor','Scene_Map_updateScene','PRINTSCREEN','NUMPAD7','moveMenuButtonSideButtonLayout','_changingClass','setBackgroundType','mpGaugeColor1','optionsWindowRect','GRD','catchException','setMute','_coreEasingType','F7key','WIN_ICO_00','SParamVocab8','Game_Interpreter_command355','OutlineColor','Input_setupEventHandlers','NUMPAD1','loadBitmap','status','tileWidth','titles2','SceneManager_initialize','setCoreEngineScreenShakeStyle','drawActorLevel','tab','isTouchedInsideFrame','_repositioned','_maxDigits','ListBgType','drawBackgroundRect','EnableMasking','Window_Base_drawCharacter','_numberWindow','SEPARATOR','OnLoadJS','OUTBOUNCE','goldWindowRect','consumeItem','XParamVocab0','tpGaugeColor2','Window_Base_drawFace','moveCancelButtonSideButtonLayout','Scene_Boot_updateDocumentTitle','worldTransform','SystemSetWindowPadding','isCancelled','GoldMax','StatusMenu','pop','volume','makeFontSmaller','paramBaseAboveLevel99','_dummyWindow','CategoryBgType','buttonAssistCancel','traitsPi','outlineColor','stop','setFrame','sparamRate1','setup','drawItem','F10','Actor','isOpen','isDying','stypeId','itemPadding','playEscape','_hovered','Untitled','onButtonImageLoad','itemRect','_updateFilterArea','Window_Selectable_processTouch','select','onEscapeSuccess','shift','currencyUnit','drawActorSimpleStatus','return\x200','drawGameTitle','QoL','_targetOffsetX','areButtonsOutsideMainUI','isRightInputMode','ColorCrisis','\x5c}❪TAB❫\x5c{','Scene_Battle_createCancelButton','buyWindowRect','IconSParam5','Scene_MenuBase_mainAreaHeight','changeTextColor','MRG','FadeSpeed','render','SmartEventCollisionPriority','_targetAnchor','battleSystem','flush','buttonAssistText1','charAt','DEF','isBottomButtonMode','0.00','DummyRect','PictureEasingType','_colorTone','cursorPageup','102158FKjWez','applyEasing','call','Plus','cursorUp','MULTIPLY','updateCoreEasing','Window_NameInput_cursorPagedown','description','resetBattleSystem','_backSprite','Scene_Name_onInputOk','_duration','forceOutOfPlaytest','_categoryWindow','DamageColor','opacity','smoothSelect','_actorWindow','visible','scale','addLoadListener','AGI','command111','CLOSE_PAREN','adjustSprite','setActorHomeRepositioned','ARRAYJSON','IconSParam3','IconXParam7','EXR','destroy','Sprite_Button_updateOpacity','INQUART','anchor','545517ZZUued','getCustomBackgroundSettings','connected','Window_Selectable_processCursorMove','createCustomBackgroundImages','targetEvaRate','MenuBg','Manual','contents','Window_Gold_refresh','Wait','ARRAYSTRUCT','IconParam7','_paramPlus','Bitmap_drawTextOutline','enableDigitGrouping','_stored_gaugeBackColor','min','DefaultStyle','ButtonAssist','command105','Game_Interpreter_command111','updatePositionCoreEngineShakeHorz','IconSParam8','VisuMZ_2_BattleSystemOTB','SParamVocab1','apply','WIN_OEM_ATTN','setHandler','setWindowPadding','round','Graphics_printError','startNormalGame','TextStr','dimColor2','battlebacks1','LEFT','\x5c}❪SHIFT❫\x5c{','_context','WIN_OEM_FJ_MASSHOU','ctrlKey','pageup','popScene','sparamFlat1','toUpperCase','_stored_mpGaugeColor2','ActorRect','isGamepadConnected','19UzVpUM','backspace','addCommand','boxHeight','SEMICOLON','active','fillStyle','QwertyLayout','getLevel','ceil','buttonAssistOffset4','WIN_OEM_WSCTRL','yScrollLinkedOffset','blt','showFauxAnimations','home','_backSprite2','_gamepadWait','guardSkillId','F15','ColorSystem','CustomParam','gainItem','createFauxAnimationSprite','xparamPlus1','iconWidth','_baseTexture','itemSuccessRate','BACK_QUOTE','anchorCoreEasing','bitmap','STB','XParamVocab4','ShowDevTools','switchModes','END','playTestF6','buttonAssistOffset5','clearForcedGameTroopSettingsCoreEngine','Scene_GameEnd_createBackground','createFauxAnimationQueue','ColorExpGauge1','_statusWindow','Bitmap_strokeRect','onMoveEnd','randomInt','ColorPowerDown','keypress','move','KEEP','xparamPlus2','reserveCommonEvent','drawParamText','battlebacks2','Scene_Options_create','touchUI','gaugeLineHeight','paramRate2','Input_shouldPreventDefault','GREATER_THAN','currentValue','KANA','F13','Game_BattlerBase_initMembers','_number','createButtonAssistWindow','Padding','mpCostColor','updateMove','SkillMenu','_viewportSize','NUMPAD5','ColorHPGauge1','applyForcedGameTroopSettingsCoreEngine','integer','isSmartEventCollisionOn','length','CustomParamNames','InputRect','child_process','_moveEasingType','RevertPreserveNumbers','_refreshArrows','xparamFlat1','disable','_actor','sparam','backOpacity','itemHitImprovedAccuracy','NUM_LOCK','movePageButtonSideButtonLayout','retrieveFauxAnimation','paramFlatJS','CancelText','GroupDigits','Window_NameInput_cursorRight','STENCIL_TEST','FINAL','editWindowRect','_isPlaytest','systemColor','xparamRate1','buttonAssistWindowRect','paramRate1','sqrt','setAttack','initBasic','Icon','INSINE','sv_actors','isRepeated','escape','BTestAddedQuantity','maxCols','_scene','_upArrowSprite','filter','paramPlus','ValueJS','strokeRect','determineSideButtonLayoutValid','Game_Picture_y','_pollGamepads','loadTitle1','applyCoreEasing','DimColor2','_helpWindow','isPlaytest','Scene_Battle_update','addWindow','children','IconParam2','XParamVocab9','setActorHome','TRG','listWindowRect','evaded','setTargetAnchor','drawActorExpGauge','Scene_Unlisted','ItemBgType','Window_Selectable_cursorDown','REC','renderNoMask','Spriteset_Base_initialize','isFullDocumentTitle','setAction','_stored_mpGaugeColor1','PictureFilename','QUOTE','areTileShadowsHidden','Scene_MenuBase_createBackground','_screenY','ParseTilesetNotetags','removeFauxAnimation','XParamVocab7','sparamPlusJS','filters','_opening','CoreEngine','Window_Selectable_drawBackgroundRect','LESS_THAN','pictureButtons','sellWindowRect','dashToggle','TextManager_param','Window_NameInput_cursorLeft','128UNUxMY','down2','ColorManager_loadWindowskin','createBuffer','onKeyDownKeysF6F7','FTB','SParamVocab5','_timerSprite','setupButtonImage','context','SceneManager_onKeyDown','isWindowMaskingEnabled','2162iqWmdu','padding','format','GoldRect','OPEN_PAREN','pagedown','_menuButton','item','VisuMZ_2_BattleSystemFTB','594377mRFdTk','isActor','PGUP','helpAreaTop','CrisisRate','targetObjects','textSizeEx','vertJS','getBackgroundOpacity','_pageupButton','updateTransform','changeClass','sparamRate','random','Sprite_Button_initialize','_stored_tpCostColor','LoadMenu','_buyWindow','Game_Picture_show','repeat','ShowItemBackground','cursorRight','Scene_Map_initialize','ENTER','scaleSprite','_colorCache','Scene_Title_drawGameTitle','_closing','advanced','XParamVocab1','Bitmap_fillRect','DefaultMode','Game_Interpreter_command122','HRG','loadSystemImages','tpCostColor','cancel','currentLevelExp','_shouldPreventDefault','ScreenShake','horzJS','skipBranch','F14','setSideButtonLayout','ActorTPColor','INELASTIC','bgsVolume','TPB\x20ACTIVE','EQUALS','setViewport','buttonAssistText3','OutlineColorGauge','%2%1%3','ShowJS','CategoryRect','_digitGroupingEx','makeEncounterCount','skillId','_profileWindow','gold','DECIMAL','setSize','darwin','CustomParamIcons','ListRect','BuyBgType','LUK','CLOSE_BRACKET','Graphics_defaultStretchMode','buttonY','updatePictureAntiZoom','_screenX','setCoreEngineUpdateWindowBg','cursorPagedown','Game_Character_processMoveCommand','hpGaugeColor2','framebuffer','test','Input_onKeyDown','IconSParam0','setBattleSystem','buttonAssistText%1','button','ImprovedAccuracySystem','Tilemap_addShadow','ActorBgType','UNDERSCORE','onInputOk','Scene_MenuBase_createCancelButton','subtitle','updatePadding','en-US','drawCurrencyValue','_anchor','XParamVocab3','ParseClassNotetags','exec','Window_NameInput_initialize','originalJS','_movementWholeDuration','14HVHnwo','INCIRC','drawFace','CodeJS','_mainSprite','setupValueFont','SCROLL_LOCK','pictures','updateMain','INOUTQUINT','createCommandWindow','mainAreaTop','setupNewGame','_CoreEngineSettings','GoldIcon','menuShowButton','KeyUnlisted','playCursorSound','stencilOp','Bitmap_measureTextWidth','GameEnd','createSpriteset','updateOrigin','Spriteset_Battle_createEnemies','value','isAlive','makeDeepCopy','IconParam3','_stored_ctGaugeColor2','xparamFlatJS','_mapNameWindow','ctGaugeColor1','Scene_MenuBase_mainAreaTop','IconParam0','ItemRect','defineProperty','PositionJS','destroyCoreEngineMarkedBitmaps','LineHeight','_hideButtons','Settings','expGaugeColor2','drawIconBySize','up2','sv_enemies','OpenConsole','DIVIDE','F21','ParseArmorNotetags','_onKeyDown','ZOOM','(\x5cd+\x5c.?\x5cd+)>','skillTypeWindowRect','nickname','Spriteset_Base_destroy','Input_clear','Control\x20Variables\x20Script\x20Error','XParamVocab6','_goldWindow','Gold','down','updatePositionCoreEngineShakeVert','cursorDown','PreserveNumbers','drawCharacter','([\x5c+\x5c-]\x5cd+)>','paramY','Duration','mpGaugeColor2','CONTEXT_MENU','_backSprite1','INOUTQUAD','_pictureContainer','_downArrowSprite','_onKeyPress','blendFunc','Basic','ENTER_SPECIAL','Game_Screen_initialize','equips','innerHeight','_drawTextOutline','expRate','commandWindowRect','initVisuMZCoreEngine','DigitGroupingGaugeSprites','maxLevel','Window_Selectable_itemRect','isHandled','calcCoreEasing','Bitmap_resize','_commandWindow','NewGameCommonEvent','_buttonType','actor','makeCoreEngineCommandList','process_VisuMZ_CoreEngine_Functions','updatePlayTestF7','helpWindowRect','cursorLeft','deselect','_optionsWindow','setSideView','sparamFlatBonus','Scene_Status_create','Key%1','targets','exit','show','contains','MRF','ParamArrow','TitlePicButtons','alwaysDash','setColorTone','process_VisuMZ_CoreEngine_jsQuickFunctions','checkSmartEventCollision','NONCONVERT','QUESTION_MARK','F17','textColor','refresh','SnapshotOpacity','SideView','parallaxes','updateOpen','drawNewParam','parse','altKey','ItemStyle','IconSParam4','Power','_width','Rate','parameters','F16','destroyed','setAnchor','uiAreaHeight','IconXParam4','ColorMaxLvGauge1','centerSprite','PictureEraseRange','wait','showDevTools','processHandling','Bitmap_drawText','drawAllParams','clearStencil','createDigits','iconHeight','_commandList','setGuard','getLastPluginCommandInterpreter','characters','_statusEquipWindow','BgFilename2','isClosed','erasePicture'];const _0x243e=function(_0x279bd5,_0x23860e){_0x279bd5=_0x279bd5-0xd0;let _0x2743d5=_0x2743[_0x279bd5];return _0x2743d5;};const _0x18ba1f=_0x243e;(function(_0xb45b21,_0xcc76f2){const _0x2f9551=_0x243e;while(!![]){try{const _0xad40c4=-parseInt(_0x2f9551(0x2f8))+parseInt(_0x2f9551(0x31b))+-parseInt(_0x2f9551(0x597))*parseInt(_0x2f9551(0x34b))+-parseInt(_0x2f9551(0x407))+parseInt(_0x2f9551(0x660))+-parseInt(_0x2f9551(0x3fe))*-parseInt(_0x2f9551(0x3f2))+parseInt(_0x2f9551(0x178))*parseInt(_0x2f9551(0x46b));if(_0xad40c4===_0xcc76f2)break;else _0xb45b21['push'](_0xb45b21['shift']());}catch(_0x194774){_0xb45b21['push'](_0xb45b21['shift']());}}}(_0x2743,0x4c3e6));var label=_0x18ba1f(0x3ea),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x18ba1f(0x3bf)](function(_0x499c20){const _0x32015f=_0x18ba1f;return _0x499c20[_0x32015f(0x29d)]&&_0x499c20[_0x32015f(0x300)][_0x32015f(0x1b8)]('['+label+']');})[0x0];VisuMZ[label][_0x18ba1f(0x493)]=VisuMZ[label][_0x18ba1f(0x493)]||{},VisuMZ[_0x18ba1f(0x109)]=function(_0xe88525,_0x1509c0){const _0x114e06=_0x18ba1f;for(const _0x2d193d in _0x1509c0){if(_0x2d193d[_0x114e06(0x163)](/(.*):(.*)/i)){const _0x3a450b=String(RegExp['$1']),_0x2db3f2=String(RegExp['$2'])[_0x114e06(0x347)]()[_0x114e06(0x525)]();let _0x36e9fb,_0x40269e,_0x11b5fe;switch(_0x2db3f2){case _0x114e06(0x13c):_0x36e9fb=_0x1509c0[_0x2d193d]!==''?Number(_0x1509c0[_0x2d193d]):0x0;break;case'ARRAYNUM':_0x40269e=_0x1509c0[_0x2d193d]!==''?JSON[_0x114e06(0x4ea)](_0x1509c0[_0x2d193d]):[],_0x36e9fb=_0x40269e[_0x114e06(0x184)](_0x2994a3=>Number(_0x2994a3));break;case'EVAL':_0x36e9fb=_0x1509c0[_0x2d193d]!==''?eval(_0x1509c0[_0x2d193d]):null;break;case'ARRAYEVAL':_0x40269e=_0x1509c0[_0x2d193d]!==''?JSON['parse'](_0x1509c0[_0x2d193d]):[],_0x36e9fb=_0x40269e[_0x114e06(0x184)](_0x24a1ef=>eval(_0x24a1ef));break;case _0x114e06(0xf1):_0x36e9fb=_0x1509c0[_0x2d193d]!==''?JSON[_0x114e06(0x4ea)](_0x1509c0[_0x2d193d]):'';break;case _0x114e06(0x313):_0x40269e=_0x1509c0[_0x2d193d]!==''?JSON['parse'](_0x1509c0[_0x2d193d]):[],_0x36e9fb=_0x40269e['map'](_0x245fe6=>JSON['parse'](_0x245fe6));break;case _0x114e06(0x56b):_0x36e9fb=_0x1509c0[_0x2d193d]!==''?new Function(JSON[_0x114e06(0x4ea)](_0x1509c0[_0x2d193d])):new Function(_0x114e06(0x2db));break;case _0x114e06(0x249):_0x40269e=_0x1509c0[_0x2d193d]!==''?JSON[_0x114e06(0x4ea)](_0x1509c0[_0x2d193d]):[],_0x36e9fb=_0x40269e['map'](_0x1a660b=>new Function(JSON[_0x114e06(0x4ea)](_0x1a660b)));break;case _0x114e06(0x1c4):_0x36e9fb=_0x1509c0[_0x2d193d]!==''?String(_0x1509c0[_0x2d193d]):'';break;case'ARRAYSTR':_0x40269e=_0x1509c0[_0x2d193d]!==''?JSON[_0x114e06(0x4ea)](_0x1509c0[_0x2d193d]):[],_0x36e9fb=_0x40269e[_0x114e06(0x184)](_0x125dd8=>String(_0x125dd8));break;case _0x114e06(0x640):_0x11b5fe=_0x1509c0[_0x2d193d]!==''?JSON['parse'](_0x1509c0[_0x2d193d]):{},_0xe88525[_0x3a450b]={},VisuMZ[_0x114e06(0x109)](_0xe88525[_0x3a450b],_0x11b5fe);continue;case _0x114e06(0x326):_0x40269e=_0x1509c0[_0x2d193d]!==''?JSON[_0x114e06(0x4ea)](_0x1509c0[_0x2d193d]):[],_0x36e9fb=_0x40269e[_0x114e06(0x184)](_0x9042cd=>VisuMZ[_0x114e06(0x109)]({},JSON['parse'](_0x9042cd)));break;default:continue;}_0xe88525[_0x3a450b]=_0x36e9fb;}}return _0xe88525;},(_0x4998a8=>{const _0x2b49bc=_0x18ba1f,_0x2b1891=_0x4998a8[_0x2b49bc(0x5e3)];for(const _0x5beb5f of dependencies){if(!Imported[_0x5beb5f]){alert(_0x2b49bc(0x1d2)[_0x2b49bc(0x400)](_0x2b1891,_0x5beb5f)),SceneManager['exit']();break;}}const _0x8861e4=_0x4998a8[_0x2b49bc(0x300)];if(_0x8861e4[_0x2b49bc(0x163)](/\[Version[ ](.*?)\]/i)){const _0x46d427=Number(RegExp['$1']);_0x46d427!==VisuMZ[label]['version']&&(alert(_0x2b49bc(0x1a1)[_0x2b49bc(0x400)](_0x2b1891,_0x46d427)),SceneManager[_0x2b49bc(0x4d6)]());}if(_0x8861e4['match'](/\[Tier[ ](\d+)\]/i)){const _0x38f1b9=Number(RegExp['$1']);_0x38f1b9<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x2b49bc(0x400)](_0x2b1891,_0x38f1b9,tier)),SceneManager[_0x2b49bc(0x4d6)]()):tier=Math[_0x2b49bc(0x5c8)](_0x38f1b9,tier);}VisuMZ[_0x2b49bc(0x109)](VisuMZ[label][_0x2b49bc(0x493)],_0x4998a8[_0x2b49bc(0x4f1)]);})(pluginData),VisuMZ[_0x18ba1f(0x3ea)]['Activated']={'PluginCommands':!![]},PluginManager[_0x18ba1f(0x65c)](pluginData['name'],_0x18ba1f(0xe8),_0x471c0f=>{const _0x5b325f=_0x18ba1f;VisuMZ[_0x5b325f(0x109)](_0x471c0f,_0x471c0f);const _0x4f7046=_0x471c0f['URL'];VisuMZ[_0x5b325f(0x232)](_0x4f7046);}),PluginManager[_0x18ba1f(0x65c)](pluginData[_0x18ba1f(0x5e3)],_0x18ba1f(0x651),_0x422ae2=>{const _0x2f14f1=_0x18ba1f;VisuMZ[_0x2f14f1(0x109)](_0x422ae2,_0x422ae2);const _0x475be5=_0x422ae2[_0x2f14f1(0x483)]||0x0;$gameParty[_0x2f14f1(0x234)](_0x475be5);}),PluginManager[_0x18ba1f(0x65c)](pluginData[_0x18ba1f(0x5e3)],_0x18ba1f(0x2f5),_0xcb66c4=>{const _0x162485=_0x18ba1f;VisuMZ['ConvertParams'](_0xcb66c4,_0xcb66c4);const _0x3817ac=_0xcb66c4[_0x162485(0x64e)]||0x1,_0x3266f2=_0xcb66c4['easingType']||_0x162485(0x57c),_0x507028=$gameScreen['picture'](_0x3817ac);_0x507028&&_0x507028[_0x162485(0x57b)](_0x3266f2);}),PluginManager[_0x18ba1f(0x65c)](pluginData[_0x18ba1f(0x5e3)],_0x18ba1f(0x5ea),_0xd00236=>{const _0x3f6d52=_0x18ba1f;for(let _0x37cc2d=0x1;_0x37cc2d<=0x64;_0x37cc2d++){$gameScreen[_0x3f6d52(0x509)](_0x37cc2d);}}),PluginManager[_0x18ba1f(0x65c)](pluginData['name'],_0x18ba1f(0x4f9),_0x3e4081=>{const _0xa39597=_0x18ba1f;VisuMZ['ConvertParams'](_0x3e4081,_0x3e4081);const _0x580f90=Math[_0xa39597(0x32c)](_0x3e4081[_0xa39597(0x138)],_0x3e4081['EndingID']),_0x405a98=Math[_0xa39597(0x5c8)](_0x3e4081[_0xa39597(0x138)],_0x3e4081[_0xa39597(0x664)]);for(let _0x3b1cc9=_0x580f90;_0x3b1cc9<=_0x405a98;_0x3b1cc9++){$gameScreen[_0xa39597(0x509)](_0x3b1cc9);}}),PluginManager['registerCommand'](pluginData[_0x18ba1f(0x5e3)],_0x18ba1f(0x42e),_0x5e6bd6=>{const _0x175f35=_0x18ba1f;VisuMZ['ConvertParams'](_0x5e6bd6,_0x5e6bd6);const _0x494fc8=_0x5e6bd6[_0x175f35(0x25d)]||_0x175f35(0x414),_0x5cc097=_0x5e6bd6[_0x175f35(0x4ee)][_0x175f35(0x21d)](0x1,0x9),_0x9497b4=_0x5e6bd6[_0x175f35(0x581)]['clamp'](0x1,0x9),_0x48637b=_0x5e6bd6[_0x175f35(0x4ae)]||0x1,_0x1776d2=_0x5e6bd6[_0x175f35(0x325)];$gameScreen['setCoreEngineScreenShakeStyle'](_0x494fc8),$gameScreen[_0x175f35(0x14d)](_0x5cc097,_0x9497b4,_0x48637b);if(_0x1776d2){const _0x59947d=$gameTemp[_0x175f35(0x504)]();if(_0x59947d)_0x59947d[_0x175f35(0x4fa)](_0x48637b);}}),PluginManager[_0x18ba1f(0x65c)](pluginData['name'],'SystemSetFontSize',_0x415a4f=>{const _0x1b5dd8=_0x18ba1f;VisuMZ[_0x1b5dd8(0x109)](_0x415a4f,_0x415a4f);const _0x4815e3=_0x415a4f[_0x1b5dd8(0x68d)]||0x1;$gameSystem[_0x1b5dd8(0xd7)](_0x4815e3);}),PluginManager[_0x18ba1f(0x65c)](pluginData['name'],_0x18ba1f(0x251),_0x1f216e=>{const _0xe007b=_0x18ba1f;if($gameParty[_0xe007b(0x5b4)]())return;VisuMZ[_0xe007b(0x109)](_0x1f216e,_0x1f216e);const _0x42b21d=_0x1f216e['option'];if(_0x42b21d[_0xe007b(0x163)](/Front/i))$gameSystem['setSideView'](![]);else _0x42b21d[_0xe007b(0x163)](/Side/i)?$gameSystem[_0xe007b(0x4d1)](!![]):$gameSystem[_0xe007b(0x4d1)](!$gameSystem[_0xe007b(0x115)]());}),PluginManager[_0x18ba1f(0x65c)](pluginData[_0x18ba1f(0x5e3)],'SystemLoadAudio',_0x32f627=>{const _0x49cc31=_0x18ba1f;if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x32f627,_0x32f627);const _0x264ae5=['bgm','bgs','me','se'];for(const _0x3149fd of _0x264ae5){const _0x5d40ba=_0x32f627[_0x3149fd],_0x9203bc=_0x49cc31(0x58a)[_0x49cc31(0x400)](_0x3149fd);for(const _0x3e67bf of _0x5d40ba){console[_0x49cc31(0x50a)](_0x9203bc,_0x3e67bf),AudioManager[_0x49cc31(0x3f5)](_0x9203bc,_0x3e67bf);}}}),PluginManager[_0x18ba1f(0x65c)](pluginData[_0x18ba1f(0x5e3)],_0x18ba1f(0x252),_0x15b200=>{const _0x50f379=_0x18ba1f;if($gameParty['inBattle']())return;VisuMZ[_0x50f379(0x109)](_0x15b200,_0x15b200);const _0x5e4ec1=[_0x50f379(0x159),_0x50f379(0x33e),_0x50f379(0x380),_0x50f379(0x505),'enemies','faces',_0x50f379(0x4e7),_0x50f379(0x472),_0x50f379(0x3b8),_0x50f379(0x497),'system','tilesets',_0x50f379(0x679),_0x50f379(0x29f)];for(const _0xca0271 of _0x5e4ec1){const _0x58286b=_0x15b200[_0xca0271],_0x529e3a=_0x50f379(0x617)[_0x50f379(0x400)](_0xca0271);for(const _0x3d07a8 of _0x58286b){ImageManager[_0x50f379(0x29c)](_0x529e3a,_0x3d07a8);}}}),PluginManager[_0x18ba1f(0x65c)](pluginData[_0x18ba1f(0x5e3)],_0x18ba1f(0x55f),_0x594045=>{const _0x16fa1b=_0x18ba1f;if($gameParty[_0x16fa1b(0x5b4)]())return;VisuMZ[_0x16fa1b(0x109)](_0x594045,_0x594045);const _0x324f02=_0x594045[_0x16fa1b(0x68d)][_0x16fa1b(0x347)]()['trim'](),_0x575f64=VisuMZ[_0x16fa1b(0x3ea)]['CreateBattleSystemID'](_0x324f02);$gameSystem[_0x16fa1b(0x457)](_0x575f64);}),VisuMZ[_0x18ba1f(0x3ea)]['CreateBattleSystemID']=function(_0x364ad6){const _0x4a3001=_0x18ba1f;_0x364ad6=_0x364ad6||_0x4a3001(0x63a),_0x364ad6=String(_0x364ad6)[_0x4a3001(0x347)]()[_0x4a3001(0x525)]();switch(_0x364ad6){case _0x4a3001(0x598):return 0x0;case _0x4a3001(0x436):Imported[_0x4a3001(0x171)]&&(ConfigManager[_0x4a3001(0x62a)]=!![]);return 0x1;case _0x4a3001(0x241):Imported[_0x4a3001(0x171)]&&(ConfigManager['atbActive']=![]);return 0x2;case _0x4a3001(0x621):if(Imported[_0x4a3001(0x522)])return _0x4a3001(0x621);break;case _0x4a3001(0x36a):if(Imported[_0x4a3001(0x584)])return _0x4a3001(0x36a);break;case'BTB':if(Imported[_0x4a3001(0x659)])return'BTB';break;case'FTB':if(Imported['VisuMZ_2_BattleSystemFTB'])return'FTB';break;case _0x4a3001(0x11d):if(Imported[_0x4a3001(0x333)])return'OTB';break;}return $dataSystem[_0x4a3001(0x2ed)];},PluginManager[_0x18ba1f(0x65c)](pluginData['name'],_0x18ba1f(0x2b7),_0x54f748=>{const _0x286808=_0x18ba1f;VisuMZ[_0x286808(0x109)](_0x54f748,_0x54f748);const _0x5118e5=_0x54f748[_0x286808(0x68d)]||0x1;$gameSystem[_0x286808(0x338)](_0x5118e5);}),VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x21e)]=Scene_Boot['prototype'][_0x18ba1f(0x557)],Scene_Boot[_0x18ba1f(0x5e5)][_0x18ba1f(0x557)]=function(){const _0x59eeda=_0x18ba1f;VisuMZ[_0x59eeda(0x3ea)][_0x59eeda(0x21e)][_0x59eeda(0x2fa)](this),this['process_VisuMZ_CoreEngine_RegExp'](),this[_0x59eeda(0x223)](),this[_0x59eeda(0x5a0)](),this[_0x59eeda(0x4cb)](),this[_0x59eeda(0x67e)](),VisuMZ[_0x59eeda(0x5c3)]();},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x1a2)]={},Scene_Boot[_0x18ba1f(0x5e5)]['process_VisuMZ_CoreEngine_RegExp']=function(){const _0xefb2be=_0x18ba1f,_0x21c54a=[_0xefb2be(0x631),_0xefb2be(0x21f),_0xefb2be(0x6a9),'DEF',_0xefb2be(0x5be),_0xefb2be(0x188),_0xefb2be(0x30e),_0xefb2be(0x449)],_0x53554f=[_0xefb2be(0x58f),_0xefb2be(0x514),_0xefb2be(0x639),_0xefb2be(0x6b2),_0xefb2be(0x58c),_0xefb2be(0x4d9),'CNT',_0xefb2be(0x428),'MRG',_0xefb2be(0x3d1)],_0x43d975=[_0xefb2be(0x26b),'GRD','REC',_0xefb2be(0x5d7),_0xefb2be(0x65d),_0xefb2be(0x5df),_0xefb2be(0x278),'MDR',_0xefb2be(0x5ee),'EXR'],_0x3c3b49=[_0x21c54a,_0x53554f,_0x43d975],_0x5b9981=[_0xefb2be(0x2fb),_0xefb2be(0x5d0),'Plus2',_0xefb2be(0x678),_0xefb2be(0x4f0),_0xefb2be(0x203),_0xefb2be(0x1e2),_0xefb2be(0x50c),'Flat1',_0xefb2be(0x104)];for(const _0x538f72 of _0x3c3b49){let _0x3ed279='';if(_0x538f72===_0x21c54a)_0x3ed279='param';if(_0x538f72===_0x53554f)_0x3ed279='xparam';if(_0x538f72===_0x43d975)_0x3ed279='sparam';for(const _0x339a5c of _0x5b9981){let _0x1f1341='%1%2'[_0xefb2be(0x400)](_0x3ed279,_0x339a5c);VisuMZ[_0xefb2be(0x3ea)]['RegExp'][_0x1f1341]=[],VisuMZ[_0xefb2be(0x3ea)]['RegExp'][_0x1f1341+'JS']=[];let _0x9f3e4c='<%1\x20%2:[\x20]';if([_0xefb2be(0x2fb),_0xefb2be(0x50c)][_0xefb2be(0x1b8)](_0x339a5c))_0x9f3e4c+=_0xefb2be(0x4ac);else{if([_0xefb2be(0x5d0),_0xefb2be(0x563)]['includes'](_0x339a5c))_0x9f3e4c+=_0xefb2be(0x50e);else{if(['Plus2','Flat2']['includes'](_0x339a5c))_0x9f3e4c+='([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>';else{if(_0x339a5c===_0xefb2be(0x678))_0x9f3e4c+=_0xefb2be(0x1e1);else{if(_0x339a5c===_0xefb2be(0x203))_0x9f3e4c+=_0xefb2be(0x5fb);else _0x339a5c===_0xefb2be(0x1e2)&&(_0x9f3e4c+=_0xefb2be(0x49e));}}}}for(const _0x1b4843 of _0x538f72){let _0x8acb16=_0x339a5c[_0xefb2be(0x5fa)](/[\d+]/g,'')[_0xefb2be(0x347)]();const _0x48a6ee=_0x9f3e4c[_0xefb2be(0x400)](_0x1b4843,_0x8acb16);VisuMZ['CoreEngine'][_0xefb2be(0x1a2)][_0x1f1341][_0xefb2be(0x25f)](new RegExp(_0x48a6ee,'i'));const _0x5722f8=_0xefb2be(0x61a)[_0xefb2be(0x400)](_0x1b4843,_0x8acb16);VisuMZ[_0xefb2be(0x3ea)][_0xefb2be(0x1a2)][_0x1f1341+'JS']['push'](new RegExp(_0x5722f8,'i'));}}}},Scene_Boot[_0x18ba1f(0x5e5)]['process_VisuMZ_CoreEngine_Notetags']=function(){const _0x444c01=_0x18ba1f;if(VisuMZ[_0x444c01(0x5c3)])return;},Scene_Boot[_0x18ba1f(0x5e5)][_0x18ba1f(0x5a0)]=function(){const _0x4f3714=_0x18ba1f;VisuMZ[_0x4f3714(0x3ea)]['Settings']['QoL'][_0x4f3714(0x498)]&&VisuMZ[_0x4f3714(0x36c)](!![]);VisuMZ['CoreEngine'][_0x4f3714(0x493)][_0x4f3714(0x2dd)]['ModernControls']&&(Input[_0x4f3714(0x54d)][0x23]=_0x4f3714(0x5d3),Input[_0x4f3714(0x54d)][0x24]=_0x4f3714(0x35a));if(VisuMZ['CoreEngine']['Settings'][_0x4f3714(0x32e)]){const _0x5475d6=VisuMZ['CoreEngine'][_0x4f3714(0x493)][_0x4f3714(0x32e)];_0x5475d6[_0x4f3714(0x11f)]=_0x5475d6['KeySHIFT']||_0x4f3714(0x340),_0x5475d6['KeyTAB']=_0x5475d6[_0x4f3714(0x681)]||_0x4f3714(0x2e2);}VisuMZ[_0x4f3714(0x3ea)]['Settings'][_0x4f3714(0x16e)]['WASD']&&(Input[_0x4f3714(0x54d)][0x57]='up',Input[_0x4f3714(0x54d)][0x41]=_0x4f3714(0x54a),Input[_0x4f3714(0x54d)][0x53]=_0x4f3714(0x4a7),Input[_0x4f3714(0x54d)][0x44]=_0x4f3714(0x1d1),Input[_0x4f3714(0x54d)][0x45]=_0x4f3714(0x403)),VisuMZ[_0x4f3714(0x3ea)][_0x4f3714(0x493)][_0x4f3714(0x16e)]['DashToggleR']&&(Input['keyMapper'][0x52]=_0x4f3714(0x3ef));},Scene_Boot[_0x18ba1f(0x5e5)]['process_VisuMZ_CoreEngine_Functions']=function(){const _0x51e371=_0x18ba1f;this[_0x51e371(0x4de)]();},Scene_Boot[_0x18ba1f(0x5e5)]['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0x3bd984=_0x18ba1f,_0x5b3698=VisuMZ[_0x3bd984(0x3ea)][_0x3bd984(0x493)][_0x3bd984(0xd3)];for(const _0x491311 of _0x5b3698){const _0x1672b3=_0x491311[_0x3bd984(0x1a0)]['replace'](/[ ]/g,''),_0x29c024=_0x491311[_0x3bd984(0x46e)];VisuMZ[_0x3bd984(0x3ea)]['createJsQuickFunction'](_0x1672b3,_0x29c024);}},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x14e)]=function(_0x1b54e4,_0x57a9cd){const _0x26b405=_0x18ba1f;if(!!window[_0x1b54e4]){if($gameTemp[_0x26b405(0x3ca)]())console[_0x26b405(0x50a)](_0x26b405(0x1c6)[_0x26b405(0x400)](_0x1b54e4));}const _0x3cb9e2=_0x26b405(0x175)[_0x26b405(0x400)](_0x1b54e4,_0x57a9cd);window[_0x1b54e4]=new Function(_0x3cb9e2);},Scene_Boot[_0x18ba1f(0x5e5)][_0x18ba1f(0x67e)]=function(){const _0xb4da4=_0x18ba1f,_0x29bc1a=VisuMZ[_0xb4da4(0x3ea)][_0xb4da4(0x493)][_0xb4da4(0x360)];if(!_0x29bc1a)return;for(const _0x4e9c36 of _0x29bc1a){if(!_0x4e9c36)continue;VisuMZ[_0xb4da4(0x3ea)][_0xb4da4(0x666)](_0x4e9c36);}},VisuMZ['CoreEngine'][_0x18ba1f(0x398)]={},VisuMZ[_0x18ba1f(0x3ea)]['CustomParamIcons']={},VisuMZ['CoreEngine'][_0x18ba1f(0x164)]={},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x284)]={},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x666)]=function(_0x48cb61){const _0x358e06=_0x18ba1f,_0x1b0f69=_0x48cb61[_0x358e06(0x146)],_0x16046c=_0x48cb61['ParamName'],_0x373e47=_0x48cb61[_0x358e06(0x3b6)],_0x63a631=_0x48cb61[_0x358e06(0x25d)],_0x18afea=new Function(_0x48cb61[_0x358e06(0x3c1)]);VisuMZ[_0x358e06(0x3ea)][_0x358e06(0x398)][_0x1b0f69[_0x358e06(0x347)]()['trim']()]=_0x16046c,VisuMZ[_0x358e06(0x3ea)][_0x358e06(0x446)][_0x1b0f69[_0x358e06(0x347)]()[_0x358e06(0x525)]()]=_0x373e47,VisuMZ[_0x358e06(0x3ea)][_0x358e06(0x164)][_0x1b0f69[_0x358e06(0x347)]()['trim']()]=_0x63a631,VisuMZ[_0x358e06(0x3ea)][_0x358e06(0x284)][_0x1b0f69[_0x358e06(0x347)]()['trim']()]=_0x1b0f69,Object[_0x358e06(0x48e)](Game_BattlerBase['prototype'],_0x1b0f69,{'get'(){const _0x109c8d=_0x358e06,_0x13f4f0=_0x18afea[_0x109c8d(0x2fa)](this);return _0x63a631===_0x109c8d(0x395)?Math['round'](_0x13f4f0):_0x13f4f0;}});},VisuMZ['ParseAllNotetags']=function(){const _0xe04781=_0x18ba1f;for(const _0x383463 of $dataActors){if(_0x383463)VisuMZ[_0xe04781(0x262)](_0x383463);}for(const _0x22ceef of $dataClasses){if(_0x22ceef)VisuMZ[_0xe04781(0x466)](_0x22ceef);}for(const _0x25aab2 of $dataSkills){if(_0x25aab2)VisuMZ[_0xe04781(0x5bb)](_0x25aab2);}for(const _0x187d64 of $dataItems){if(_0x187d64)VisuMZ[_0xe04781(0x516)](_0x187d64);}for(const _0x137835 of $dataWeapons){if(_0x137835)VisuMZ[_0xe04781(0x1d7)](_0x137835);}for(const _0x3faff3 of $dataArmors){if(_0x3faff3)VisuMZ['ParseArmorNotetags'](_0x3faff3);}for(const _0x3706b7 of $dataEnemies){if(_0x3706b7)VisuMZ[_0xe04781(0x210)](_0x3706b7);}for(const _0x532e6b of $dataStates){if(_0x532e6b)VisuMZ['ParseStateNotetags'](_0x532e6b);}for(const _0x5c5e32 of $dataTilesets){if(_0x5c5e32)VisuMZ[_0xe04781(0x3e4)](_0x5c5e32);}},VisuMZ[_0x18ba1f(0x262)]=function(_0xe5294){},VisuMZ['ParseClassNotetags']=function(_0x42642c){},VisuMZ[_0x18ba1f(0x5bb)]=function(_0x320e93){},VisuMZ[_0x18ba1f(0x516)]=function(_0x32f355){},VisuMZ['ParseWeaponNotetags']=function(_0x13f256){},VisuMZ[_0x18ba1f(0x49b)]=function(_0x42f9ad){},VisuMZ[_0x18ba1f(0x210)]=function(_0x386e1e){},VisuMZ['ParseStateNotetags']=function(_0x2c0793){},VisuMZ[_0x18ba1f(0x3e4)]=function(_0x30013b){},VisuMZ['CoreEngine']['ParseActorNotetags']=VisuMZ[_0x18ba1f(0x262)],VisuMZ['ParseActorNotetags']=function(_0x2a3738){const _0x1d506b=_0x18ba1f;VisuMZ[_0x1d506b(0x3ea)][_0x1d506b(0x262)][_0x1d506b(0x2fa)](this,_0x2a3738);const _0x175701=_0x2a3738['note'];if(_0x175701['match'](/<MAX LEVEL:[ ](\d+)>/i)){_0x2a3738[_0x1d506b(0x4c1)]=Number(RegExp['$1']);if(_0x2a3738[_0x1d506b(0x4c1)]===0x0)_0x2a3738[_0x1d506b(0x4c1)]=Number[_0x1d506b(0x23f)];}_0x175701[_0x1d506b(0x163)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x2a3738['initialLevel']=Math['min'](Number(RegExp['$1']),_0x2a3738['maxLevel']));},VisuMZ[_0x18ba1f(0x3ea)]['ParseClassNotetags']=VisuMZ[_0x18ba1f(0x466)],VisuMZ[_0x18ba1f(0x466)]=function(_0x3ab963){const _0x26c4bb=_0x18ba1f;VisuMZ[_0x26c4bb(0x3ea)]['ParseClassNotetags'][_0x26c4bb(0x2fa)](this,_0x3ab963);if(_0x3ab963[_0x26c4bb(0x6af)])for(const _0x2dcba5 of _0x3ab963[_0x26c4bb(0x6af)]){_0x2dcba5[_0x26c4bb(0xd4)][_0x26c4bb(0x163)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x2dcba5[_0x26c4bb(0x1b0)]=Math[_0x26c4bb(0x5c8)](Number(RegExp['$1']),0x1));}},VisuMZ['CoreEngine'][_0x18ba1f(0x210)]=VisuMZ[_0x18ba1f(0x210)],VisuMZ[_0x18ba1f(0x210)]=function(_0x485c94){const _0x29604d=_0x18ba1f;VisuMZ[_0x29604d(0x3ea)][_0x29604d(0x210)]['call'](this,_0x485c94),_0x485c94['level']=0x1;const _0x2fd5b8=_0x485c94[_0x29604d(0xd4)];if(_0x2fd5b8[_0x29604d(0x163)](/<LEVEL:[ ](\d+)>/i))_0x485c94['level']=Number(RegExp['$1']);if(_0x2fd5b8[_0x29604d(0x163)](/<MAXHP:[ ](\d+)>/i))_0x485c94['params'][0x0]=Number(RegExp['$1']);if(_0x2fd5b8[_0x29604d(0x163)](/<MAXMP:[ ](\d+)>/i))_0x485c94['params'][0x1]=Number(RegExp['$1']);if(_0x2fd5b8[_0x29604d(0x163)](/<ATK:[ ](\d+)>/i))_0x485c94[_0x29604d(0x582)][0x2]=Number(RegExp['$1']);if(_0x2fd5b8[_0x29604d(0x163)](/<DEF:[ ](\d+)>/i))_0x485c94[_0x29604d(0x582)][0x3]=Number(RegExp['$1']);if(_0x2fd5b8[_0x29604d(0x163)](/<MAT:[ ](\d+)>/i))_0x485c94[_0x29604d(0x582)][0x4]=Number(RegExp['$1']);if(_0x2fd5b8[_0x29604d(0x163)](/<MDF:[ ](\d+)>/i))_0x485c94[_0x29604d(0x582)][0x5]=Number(RegExp['$1']);if(_0x2fd5b8['match'](/<AGI:[ ](\d+)>/i))_0x485c94['params'][0x6]=Number(RegExp['$1']);if(_0x2fd5b8[_0x29604d(0x163)](/<LUK:[ ](\d+)>/i))_0x485c94[_0x29604d(0x582)][0x7]=Number(RegExp['$1']);if(_0x2fd5b8[_0x29604d(0x163)](/<EXP:[ ](\d+)>/i))_0x485c94[_0x29604d(0x24f)]=Number(RegExp['$1']);if(_0x2fd5b8['match'](/<GOLD:[ ](\d+)>/i))_0x485c94[_0x29604d(0x442)]=Number(RegExp['$1']);},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x44b)]=Graphics['_defaultStretchMode'],Graphics[_0x18ba1f(0x55c)]=function(){const _0x4ae08b=_0x18ba1f;switch(VisuMZ[_0x4ae08b(0x3ea)][_0x4ae08b(0x493)][_0x4ae08b(0x2dd)]['AutoStretch']){case _0x4ae08b(0x112):return!![];case _0x4ae08b(0x54b):return![];default:return VisuMZ[_0x4ae08b(0x3ea)][_0x4ae08b(0x44b)][_0x4ae08b(0x2fa)](this);}},VisuMZ['CoreEngine'][_0x18ba1f(0x33a)]=Graphics[_0x18ba1f(0x560)],Graphics[_0x18ba1f(0x560)]=function(_0x13e9dc,_0x324dd5,_0xfd63a7=null){const _0x4080dc=_0x18ba1f;VisuMZ[_0x4080dc(0x3ea)][_0x4080dc(0x33a)][_0x4080dc(0x2fa)](this,_0x13e9dc,_0x324dd5,_0xfd63a7),VisuMZ[_0x4080dc(0x36c)](![]);},VisuMZ['CoreEngine'][_0x18ba1f(0x1b2)]=Graphics['_centerElement'],Graphics['_centerElement']=function(_0x5cd10f){const _0x58c19d=_0x18ba1f;VisuMZ[_0x58c19d(0x3ea)][_0x58c19d(0x1b2)][_0x58c19d(0x2fa)](this,_0x5cd10f),this[_0x58c19d(0xf4)](_0x5cd10f);},Graphics[_0x18ba1f(0xf4)]=function(_0x3b67e7){const _0x129fac=_0x18ba1f;VisuMZ[_0x129fac(0x3ea)][_0x129fac(0x493)][_0x129fac(0x2dd)][_0x129fac(0x116)]&&(_0x3b67e7['style']['font-smooth']='none');VisuMZ[_0x129fac(0x3ea)][_0x129fac(0x493)][_0x129fac(0x2dd)][_0x129fac(0xf2)]&&(_0x3b67e7[_0x129fac(0x165)]['image-rendering']='pixelated');const _0x540666=Math[_0x129fac(0x5c8)](0x0,Math['floor'](_0x3b67e7[_0x129fac(0x259)]*this[_0x129fac(0x10e)])),_0x701168=Math[_0x129fac(0x5c8)](0x0,Math[_0x129fac(0x602)](_0x3b67e7['height']*this[_0x129fac(0x10e)]));_0x3b67e7['style'][_0x129fac(0x259)]=_0x540666+'px',_0x3b67e7['style'][_0x129fac(0x13b)]=_0x701168+'px';},Bitmap[_0x18ba1f(0x5e5)][_0x18ba1f(0x221)]=function(){const _0x3e21b=_0x18ba1f;this[_0x3e21b(0x264)]=!![];},VisuMZ[_0x18ba1f(0x3ea)]['Sprite_destroy']=Sprite['prototype'][_0x18ba1f(0x317)],Sprite[_0x18ba1f(0x5e5)][_0x18ba1f(0x317)]=function(){const _0x169466=_0x18ba1f;VisuMZ[_0x169466(0x3ea)][_0x169466(0x696)]['call'](this),this[_0x169466(0x490)]();},Sprite[_0x18ba1f(0x5e5)][_0x18ba1f(0x490)]=function(){const _0x1bc8e5=_0x18ba1f;if(!this[_0x1bc8e5(0x369)])return;if(!this['bitmap']['_customModified'])return;this[_0x1bc8e5(0x369)][_0x1bc8e5(0x365)]&&!this[_0x1bc8e5(0x23d)][_0x1bc8e5(0x365)][_0x1bc8e5(0x4f3)]&&this[_0x1bc8e5(0x369)][_0x1bc8e5(0x317)]();},VisuMZ[_0x18ba1f(0x3ea)]['Bitmap_resize']=Bitmap[_0x18ba1f(0x5e5)][_0x18ba1f(0x154)],Bitmap['prototype'][_0x18ba1f(0x154)]=function(_0x253174,_0x4372ac){const _0xc057eb=_0x18ba1f;VisuMZ[_0xc057eb(0x3ea)][_0xc057eb(0x4c5)]['call'](this,_0x253174,_0x4372ac),this[_0xc057eb(0x221)]();},VisuMZ['CoreEngine']['Bitmap_blt']=Bitmap[_0x18ba1f(0x5e5)]['blt'],Bitmap[_0x18ba1f(0x5e5)][_0x18ba1f(0x358)]=function(_0x374086,_0x34bd7d,_0x2da9c6,_0x4a5967,_0x58aad4,_0x9197aa,_0xf53bab,_0x6ce2e7,_0x32b6c5){const _0x4fa5dd=_0x18ba1f;VisuMZ[_0x4fa5dd(0x3ea)][_0x4fa5dd(0x1b7)][_0x4fa5dd(0x2fa)](this,_0x374086,_0x34bd7d,_0x2da9c6,_0x4a5967,_0x58aad4,_0x9197aa,_0xf53bab,_0x6ce2e7,_0x32b6c5),this[_0x4fa5dd(0x221)]();},VisuMZ['CoreEngine']['Bitmap_clearRect']=Bitmap['prototype'][_0x18ba1f(0x655)],Bitmap[_0x18ba1f(0x5e5)][_0x18ba1f(0x655)]=function(_0x56f590,_0x2da70d,_0x4b80ef,_0x34dd91){const _0x56c75f=_0x18ba1f;VisuMZ[_0x56c75f(0x3ea)][_0x56c75f(0x1c8)][_0x56c75f(0x2fa)](this,_0x56f590,_0x2da70d,_0x4b80ef,_0x34dd91),this[_0x56c75f(0x221)]();},VisuMZ['CoreEngine']['Bitmap_fillRect']=Bitmap[_0x18ba1f(0x5e5)][_0x18ba1f(0x1d8)],Bitmap[_0x18ba1f(0x5e5)][_0x18ba1f(0x1d8)]=function(_0x49f7c0,_0x35ad91,_0x2f1568,_0x1d1b67,_0x108322){const _0x2dcf00=_0x18ba1f;VisuMZ[_0x2dcf00(0x3ea)][_0x2dcf00(0x425)][_0x2dcf00(0x2fa)](this,_0x49f7c0,_0x35ad91,_0x2f1568,_0x1d1b67,_0x108322),this[_0x2dcf00(0x221)]();},VisuMZ['CoreEngine']['Bitmap_strokeRect']=Bitmap[_0x18ba1f(0x5e5)][_0x18ba1f(0x3c2)],Bitmap[_0x18ba1f(0x5e5)][_0x18ba1f(0x3c2)]=function(_0x2f8edc,_0x11166a,_0x1d55ea,_0x5ab66e,_0x5e84f4){const _0x27df1d=_0x18ba1f;VisuMZ[_0x27df1d(0x3ea)][_0x27df1d(0x376)][_0x27df1d(0x2fa)](this,_0x2f8edc,_0x11166a,_0x1d55ea,_0x5ab66e,_0x5e84f4),this[_0x27df1d(0x221)]();},VisuMZ[_0x18ba1f(0x3ea)]['Bitmap_gradientFillRect']=Bitmap[_0x18ba1f(0x5e5)]['gradientFillRect'],Bitmap[_0x18ba1f(0x5e5)]['gradientFillRect']=function(_0x34e52c,_0x5ce72c,_0x5d13a4,_0x27e3d4,_0x5d2968,_0x45d9ba,_0x5527dd){const _0x56ca13=_0x18ba1f;VisuMZ['CoreEngine'][_0x56ca13(0x533)][_0x56ca13(0x2fa)](this,_0x34e52c,_0x5ce72c,_0x5d13a4,_0x27e3d4,_0x5d2968,_0x45d9ba,_0x5527dd),this[_0x56ca13(0x221)]();},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x1d4)]=Bitmap[_0x18ba1f(0x5e5)][_0x18ba1f(0x562)],Bitmap[_0x18ba1f(0x5e5)]['drawCircle']=function(_0x22f49f,_0x666708,_0x3a4100,_0x145f47){const _0x596c38=_0x18ba1f;_0x22f49f=Math[_0x596c38(0x339)](_0x22f49f),_0x666708=Math[_0x596c38(0x339)](_0x666708),_0x3a4100=Math['round'](_0x3a4100),VisuMZ[_0x596c38(0x3ea)]['Bitmap_drawCircle'][_0x596c38(0x2fa)](this,_0x22f49f,_0x666708,_0x3a4100,_0x145f47),this[_0x596c38(0x221)]();},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x47e)]=Bitmap['prototype'][_0x18ba1f(0x183)],Bitmap[_0x18ba1f(0x5e5)][_0x18ba1f(0x183)]=function(_0x392f10){const _0x3e76bc=_0x18ba1f;return Math['round'](VisuMZ['CoreEngine'][_0x3e76bc(0x47e)][_0x3e76bc(0x2fa)](this,_0x392f10));},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x4fd)]=Bitmap[_0x18ba1f(0x5e5)][_0x18ba1f(0x10c)],Bitmap[_0x18ba1f(0x5e5)][_0x18ba1f(0x10c)]=function(_0x57b331,_0x2b4841,_0x42405d,_0x1e2de3,_0x1b0c8f,_0x30c7c1){const _0x5dcb2a=_0x18ba1f;_0x2b4841=Math['round'](_0x2b4841),_0x42405d=Math[_0x5dcb2a(0x339)](_0x42405d),_0x1e2de3=Math[_0x5dcb2a(0x339)](_0x1e2de3),_0x1b0c8f=Math['round'](_0x1b0c8f),VisuMZ[_0x5dcb2a(0x3ea)][_0x5dcb2a(0x4fd)][_0x5dcb2a(0x2fa)](this,_0x57b331,_0x2b4841,_0x42405d,_0x1e2de3,_0x1b0c8f,_0x30c7c1),this[_0x5dcb2a(0x221)]();},VisuMZ['CoreEngine']['Bitmap_drawTextOutline']=Bitmap[_0x18ba1f(0x5e5)][_0x18ba1f(0x4bc)],Bitmap[_0x18ba1f(0x5e5)][_0x18ba1f(0x4bc)]=function(_0x398af3,_0x27b4c8,_0x5b906e,_0x165152){const _0x3c8fd4=_0x18ba1f;VisuMZ[_0x3c8fd4(0x3ea)][_0x3c8fd4(0x493)]['QoL']['FontShadows']?this[_0x3c8fd4(0xff)](_0x398af3,_0x27b4c8,_0x5b906e,_0x165152):VisuMZ[_0x3c8fd4(0x3ea)][_0x3c8fd4(0x329)][_0x3c8fd4(0x2fa)](this,_0x398af3,_0x27b4c8,_0x5b906e,_0x165152);},Bitmap[_0x18ba1f(0x5e5)][_0x18ba1f(0xff)]=function(_0x34cf9e,_0x204e38,_0x51880a,_0x3ddc89){const _0x1ef8d4=_0x18ba1f,_0x515273=this[_0x1ef8d4(0x3fb)];_0x515273[_0x1ef8d4(0x351)]=this['outlineColor'],_0x515273[_0x1ef8d4(0x1b4)](_0x34cf9e,_0x204e38+0x2,_0x51880a+0x2,_0x3ddc89);},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x4a2)]=Input[_0x18ba1f(0x111)],Input[_0x18ba1f(0x111)]=function(){const _0x42e267=_0x18ba1f;VisuMZ[_0x42e267(0x3ea)]['Input_clear'][_0x42e267(0x2fa)](this),this['_inputString']=undefined,this[_0x42e267(0x663)]=undefined,this[_0x42e267(0x35c)]=Input['keyRepeatWait'];},VisuMZ[_0x18ba1f(0x3ea)]['Input_update']=Input[_0x18ba1f(0x285)],Input[_0x18ba1f(0x285)]=function(){const _0x2ba2ee=_0x18ba1f;VisuMZ['CoreEngine']['Input_update'][_0x2ba2ee(0x2fa)](this);if(this[_0x2ba2ee(0x35c)])this[_0x2ba2ee(0x35c)]--;},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x144)]=Input[_0x18ba1f(0x3c5)],Input[_0x18ba1f(0x3c5)]=function(){const _0x1bc4ca=_0x18ba1f;if(this[_0x1bc4ca(0x35c)])return;VisuMZ[_0x1bc4ca(0x3ea)]['Input_pollGamepads']['call'](this);},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x29a)]=Input[_0x18ba1f(0x51b)],Input[_0x18ba1f(0x51b)]=function(){const _0x1983e2=_0x18ba1f;VisuMZ[_0x1983e2(0x3ea)][_0x1983e2(0x29a)][_0x1983e2(0x2fa)](this),document[_0x1983e2(0x24a)](_0x1983e2(0x37a),this[_0x1983e2(0x4b5)][_0x1983e2(0x106)](this));},VisuMZ['CoreEngine'][_0x18ba1f(0x455)]=Input[_0x18ba1f(0x49c)],Input[_0x18ba1f(0x49c)]=function(_0x8dc4a){const _0x1f8576=_0x18ba1f;this[_0x1f8576(0x663)]=_0x8dc4a['keyCode'],VisuMZ['CoreEngine'][_0x1f8576(0x455)]['call'](this,_0x8dc4a);},Input[_0x18ba1f(0x4b5)]=function(_0x4e354c){const _0x4c04d4=_0x18ba1f;this[_0x4c04d4(0x1fb)](_0x4e354c);},Input['_registerKeyInput']=function(_0x56dbb2){const _0x4331a1=_0x18ba1f;this[_0x4331a1(0x663)]=_0x56dbb2[_0x4331a1(0x58d)];let _0x22e1c4=String[_0x4331a1(0x586)](_0x56dbb2['charCode']);this['_inputString']===undefined?this['_inputString']=_0x22e1c4:this[_0x4331a1(0x5e7)]+=_0x22e1c4;},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x385)]=Input[_0x18ba1f(0x42d)],Input[_0x18ba1f(0x42d)]=function(_0x3c28ae){const _0x348100=_0x18ba1f;if(_0x3c28ae===0x8)return![];return VisuMZ[_0x348100(0x3ea)]['Input_shouldPreventDefault']['call'](this,_0x3c28ae);},Input['isSpecialCode']=function(_0x11bc1a){const _0x3c2a88=_0x18ba1f;if(_0x11bc1a['match'](/backspace/i))return this[_0x3c2a88(0x663)]===0x8;if(_0x11bc1a['match'](/enter/i))return this[_0x3c2a88(0x663)]===0xd;if(_0x11bc1a[_0x3c2a88(0x163)](/escape/i))return this[_0x3c2a88(0x663)]===0x1b;},Input[_0x18ba1f(0x179)]=function(){const _0x37ee1f=_0x18ba1f;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x37ee1f(0x4d8)](this[_0x37ee1f(0x663)]);},Input[_0x18ba1f(0x55a)]=function(){const _0x563733=_0x18ba1f;return[0x25,0x26,0x27,0x28]['contains'](this[_0x563733(0x663)]);},Input[_0x18ba1f(0x34a)]=function(){const _0x288814=_0x18ba1f;if(navigator[_0x288814(0x194)]){const _0x545ca5=navigator[_0x288814(0x194)]();if(_0x545ca5)for(const _0x134c57 of _0x545ca5){if(_0x134c57&&_0x134c57['connected'])return!![];}}return![];},Input[_0x18ba1f(0x569)]=function(){const _0x35bca8=_0x18ba1f;if(navigator[_0x35bca8(0x194)]){const _0xe2f644=navigator[_0x35bca8(0x194)]();if(_0xe2f644)for(const _0x37c7c7 of _0xe2f644){if(_0x37c7c7&&_0x37c7c7[_0x35bca8(0x31d)]){if(this['isGamepadButtonPressed'](_0x37c7c7))return!![];}}}return![];},Input[_0x18ba1f(0x15b)]=function(_0x10b097){const _0xedb073=_0x18ba1f,_0x7aa3df=_0x10b097[_0xedb073(0x267)];for(let _0x1f738f=0x0;_0x1f738f<_0x7aa3df[_0xedb073(0x397)];_0x1f738f++){if(_0x7aa3df[_0x1f738f][_0xedb073(0x1ad)])return!![];}return![];},VisuMZ['CoreEngine'][_0x18ba1f(0x45b)]=Tilemap[_0x18ba1f(0x5e5)][_0x18ba1f(0x22b)],Tilemap[_0x18ba1f(0x5e5)][_0x18ba1f(0x22b)]=function(_0x4a17b2,_0x268430,_0x45a0db,_0x2c99c2){const _0x4259f1=_0x18ba1f;if($gameMap&&$gameMap[_0x4259f1(0x3e1)]())return;VisuMZ[_0x4259f1(0x3ea)][_0x4259f1(0x45b)]['call'](this,_0x4a17b2,_0x268430,_0x45a0db,_0x2c99c2);},Tilemap[_0x18ba1f(0x17f)]['prototype']['_createInternalTextures']=function(){const _0x213864=_0x18ba1f;this['_destroyInternalTextures']();for(let _0x11a43e=0x0;_0x11a43e<Tilemap['Layer'][_0x213864(0x1f7)];_0x11a43e++){const _0x5c6ca8=new PIXI[(_0x213864(0x61f))]();_0x5c6ca8[_0x213864(0x444)](0x800,0x800),VisuMZ['CoreEngine']['Settings'][_0x213864(0x2dd)][_0x213864(0xf2)]&&(_0x5c6ca8[_0x213864(0x1db)]=PIXI[_0x213864(0x5cc)][_0x213864(0x6a3)]),this['_internalTextures'][_0x213864(0x25f)](_0x5c6ca8);}},WindowLayer['prototype'][_0x18ba1f(0x665)]=function(){const _0x29575e=_0x18ba1f;return SceneManager&&SceneManager[_0x29575e(0x3bd)]?SceneManager[_0x29575e(0x3bd)][_0x29575e(0x3fd)]():!![];},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x141)]=WindowLayer[_0x18ba1f(0x5e5)][_0x18ba1f(0x2ea)],WindowLayer['prototype'][_0x18ba1f(0x2ea)]=function render(_0x4c46d9){const _0x3a65cf=_0x18ba1f;this['isMaskingEnabled']()?VisuMZ['CoreEngine'][_0x3a65cf(0x141)][_0x3a65cf(0x2fa)](this,_0x4c46d9):this[_0x3a65cf(0x3da)](_0x4c46d9);},WindowLayer[_0x18ba1f(0x5e5)][_0x18ba1f(0x3da)]=function render(_0x185cc3){const _0x524e69=_0x18ba1f;if(!this[_0x524e69(0x30b)])return;const _0x42db59=new PIXI[(_0x524e69(0x150))](),_0x14242e=_0x185cc3['gl'],_0x35060a=this[_0x524e69(0x3cd)]['clone']();_0x185cc3[_0x524e69(0x453)]['forceStencil'](),_0x42db59[_0x524e69(0x139)]=this[_0x524e69(0x139)],_0x185cc3[_0x524e69(0x23c)][_0x524e69(0x2ee)](),_0x14242e['enable'](_0x14242e[_0x524e69(0x3ab)]);while(_0x35060a['length']>0x0){const _0x4fe7f6=_0x35060a[_0x524e69(0x2d8)]();_0x4fe7f6[_0x524e69(0x279)]&&_0x4fe7f6[_0x524e69(0x30b)]&&_0x4fe7f6[_0x524e69(0x63f)]>0x0&&(_0x14242e[_0x524e69(0x10b)](_0x14242e['EQUAL'],0x0,~0x0),_0x14242e[_0x524e69(0x47d)](_0x14242e[_0x524e69(0x37c)],_0x14242e[_0x524e69(0x37c)],_0x14242e['KEEP']),_0x4fe7f6[_0x524e69(0x2ea)](_0x185cc3),_0x185cc3[_0x524e69(0x23c)][_0x524e69(0x2ee)](),_0x42db59[_0x524e69(0x111)](),_0x14242e[_0x524e69(0x10b)](_0x14242e[_0x524e69(0x281)],0x1,~0x0),_0x14242e[_0x524e69(0x47d)](_0x14242e[_0x524e69(0x5bc)],_0x14242e['REPLACE'],_0x14242e['REPLACE']),_0x14242e['blendFunc'](_0x14242e[_0x524e69(0x61d)],_0x14242e[_0x524e69(0x532)]),_0x42db59[_0x524e69(0x2ea)](_0x185cc3),_0x185cc3[_0x524e69(0x23c)]['flush'](),_0x14242e[_0x524e69(0x4b6)](_0x14242e[_0x524e69(0x532)],_0x14242e['ONE_MINUS_SRC_ALPHA']));}_0x14242e[_0x524e69(0x39f)](_0x14242e['STENCIL_TEST']),_0x14242e['clear'](_0x14242e[_0x524e69(0x635)]),_0x14242e[_0x524e69(0x4ff)](0x0),_0x185cc3[_0x524e69(0x23c)][_0x524e69(0x2ee)]();for(const _0x4bc614 of this[_0x524e69(0x3cd)]){!_0x4bc614[_0x524e69(0x279)]&&_0x4bc614[_0x524e69(0x30b)]&&_0x4bc614['render'](_0x185cc3);}_0x185cc3[_0x524e69(0x23c)][_0x524e69(0x2ee)]();},DataManager['isKeyItem']=function(_0x5b25b3){const _0x259463=_0x18ba1f;return this[_0x259463(0x539)](_0x5b25b3)&&_0x5b25b3[_0x259463(0xdd)]===0x2;},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x51f)]=DataManager[_0x18ba1f(0x477)],DataManager[_0x18ba1f(0x477)]=function(){const _0x31192d=_0x18ba1f;VisuMZ[_0x31192d(0x3ea)][_0x31192d(0x51f)][_0x31192d(0x2fa)](this),this['reservePlayTestNewGameCommonEvent'](),this['reserveNewGameCommonEvent']();},DataManager['reservePlayTestNewGameCommonEvent']=function(){const _0x14af47=_0x18ba1f;if($gameTemp[_0x14af47(0x3ca)]()){const _0x4e204=VisuMZ[_0x14af47(0x3ea)][_0x14af47(0x493)][_0x14af47(0x2dd)][_0x14af47(0x4c7)];if(_0x4e204>0x0)$gameTemp[_0x14af47(0x37e)](_0x4e204);}},DataManager['reserveNewGameCommonEvent']=function(){const _0xda83a8=_0x18ba1f,_0xae782f=VisuMZ[_0xda83a8(0x3ea)][_0xda83a8(0x493)]['QoL'][_0xda83a8(0x128)]||0x0;if(_0xae782f>0x0)$gameTemp[_0xda83a8(0x37e)](_0xae782f);},TextManager[_0x18ba1f(0x12a)]=['','','',_0x18ba1f(0x1b1),'','','HELP','',_0x18ba1f(0x1f9),'TAB','','',_0x18ba1f(0x1de),_0x18ba1f(0x41e),_0x18ba1f(0x4b8),'',_0x18ba1f(0x172),_0x18ba1f(0x53f),_0x18ba1f(0x1c9),_0x18ba1f(0x1b5),_0x18ba1f(0x699),_0x18ba1f(0x388),'EISU',_0x18ba1f(0x280),_0x18ba1f(0x3ac),_0x18ba1f(0x119),'','ESC',_0x18ba1f(0x594),_0x18ba1f(0x4e0),_0x18ba1f(0x5a9),_0x18ba1f(0x5a1),_0x18ba1f(0x541),_0x18ba1f(0x409),_0x18ba1f(0x673),_0x18ba1f(0x36e),'HOME',_0x18ba1f(0x33f),'UP',_0x18ba1f(0x180),'DOWN',_0x18ba1f(0x548),_0x18ba1f(0x147),'EXECUTE',_0x18ba1f(0x28a),_0x18ba1f(0x1ac),_0x18ba1f(0x166),'','0','1','2','3','4','5','6','7','8','9',_0x18ba1f(0x543),_0x18ba1f(0x34f),_0x18ba1f(0x3ec),'EQUALS',_0x18ba1f(0x386),_0x18ba1f(0x4e1),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x18ba1f(0x185),'',_0x18ba1f(0x4b0),'','SLEEP','NUMPAD0',_0x18ba1f(0x29b),_0x18ba1f(0x59e),_0x18ba1f(0x1d3),_0x18ba1f(0x110),_0x18ba1f(0x392),_0x18ba1f(0x157),_0x18ba1f(0x28b),_0x18ba1f(0x100),_0x18ba1f(0x158),_0x18ba1f(0x2fd),'ADD',_0x18ba1f(0x2ac),'SUBTRACT',_0x18ba1f(0x443),_0x18ba1f(0x499),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x18ba1f(0x2c9),_0x18ba1f(0x512),'F12',_0x18ba1f(0x389),_0x18ba1f(0x431),_0x18ba1f(0x35e),_0x18ba1f(0x4f2),_0x18ba1f(0x4e2),'F18',_0x18ba1f(0x1fc),'F20',_0x18ba1f(0x49a),'F22','F23',_0x18ba1f(0x108),'','','','','','','','',_0x18ba1f(0x3a4),_0x18ba1f(0x471),'WIN_OEM_FJ_JISHO',_0x18ba1f(0x342),'WIN_OEM_FJ_TOUROKU','WIN_OEM_FJ_LOYA',_0x18ba1f(0x11e),'','','','','','','','','','CIRCUMFLEX','EXCLAMATION','DOUBLE_QUOTE','HASH',_0x18ba1f(0x15c),'PERCENT',_0x18ba1f(0xeb),_0x18ba1f(0x45d),_0x18ba1f(0x402),_0x18ba1f(0x310),'ASTERISK','PLUS',_0x18ba1f(0x181),_0x18ba1f(0x5e1),'OPEN_CURLY_BRACKET',_0x18ba1f(0x19d),_0x18ba1f(0x1a7),'','','','','VOLUME_MUTE',_0x18ba1f(0x131),_0x18ba1f(0x56f),'','',_0x18ba1f(0x34f),_0x18ba1f(0x437),'COMMA','MINUS','PERIOD','SLASH',_0x18ba1f(0x367),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x18ba1f(0x1aa),_0x18ba1f(0x638),_0x18ba1f(0x44a),_0x18ba1f(0x3e0),'',_0x18ba1f(0x27b),_0x18ba1f(0x547),'',_0x18ba1f(0x287),_0x18ba1f(0x296),'',_0x18ba1f(0x537),'','',_0x18ba1f(0x52e),_0x18ba1f(0x57a),_0x18ba1f(0x192),_0x18ba1f(0x222),_0x18ba1f(0x585),_0x18ba1f(0x356),_0x18ba1f(0x193),_0x18ba1f(0x336),_0x18ba1f(0x649),_0x18ba1f(0xde),'WIN_OEM_AUTO','WIN_OEM_ENLW',_0x18ba1f(0x676),_0x18ba1f(0xf8),_0x18ba1f(0x57e),_0x18ba1f(0x1cd),'EREOF',_0x18ba1f(0x245),_0x18ba1f(0x49d),'',_0x18ba1f(0x1dc),_0x18ba1f(0x527),''],TextManager[_0x18ba1f(0x211)]=VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x493)][_0x18ba1f(0x32e)][_0x18ba1f(0x217)],TextManager[_0x18ba1f(0x2c1)]=VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x493)]['ButtonAssist'][_0x18ba1f(0x3a8)],TextManager[_0x18ba1f(0x149)]=VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x493)]['ButtonAssist'][_0x18ba1f(0x13f)],VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x3f0)]=TextManager[_0x18ba1f(0x17a)],TextManager[_0x18ba1f(0x17a)]=function(_0x7a8ea1){const _0x1d0aab=_0x18ba1f;return typeof _0x7a8ea1===_0x1d0aab(0x129)?VisuMZ[_0x1d0aab(0x3ea)][_0x1d0aab(0x3f0)][_0x1d0aab(0x2fa)](this,_0x7a8ea1):this[_0x1d0aab(0x50b)](_0x7a8ea1);},TextManager[_0x18ba1f(0x50b)]=function(_0x4d5044){const _0x290744=_0x18ba1f;_0x4d5044=String(_0x4d5044||'')['toUpperCase']();const _0x2f3295=VisuMZ[_0x290744(0x3ea)][_0x290744(0x493)][_0x290744(0x1ed)];if(_0x4d5044==='MAXHP')return $dataSystem[_0x290744(0x19e)]['params'][0x0];if(_0x4d5044===_0x290744(0x21f))return $dataSystem[_0x290744(0x19e)][_0x290744(0x582)][0x1];if(_0x4d5044===_0x290744(0x6a9))return $dataSystem['terms'][_0x290744(0x582)][0x2];if(_0x4d5044==='DEF')return $dataSystem[_0x290744(0x19e)][_0x290744(0x582)][0x3];if(_0x4d5044==='MAT')return $dataSystem[_0x290744(0x19e)]['params'][0x4];if(_0x4d5044===_0x290744(0x188))return $dataSystem[_0x290744(0x19e)]['params'][0x5];if(_0x4d5044===_0x290744(0x30e))return $dataSystem[_0x290744(0x19e)][_0x290744(0x582)][0x6];if(_0x4d5044===_0x290744(0x449))return $dataSystem[_0x290744(0x19e)][_0x290744(0x582)][0x7];if(_0x4d5044===_0x290744(0x58f))return _0x2f3295[_0x290744(0x2b1)];if(_0x4d5044===_0x290744(0x514))return _0x2f3295[_0x290744(0x424)];if(_0x4d5044==='CRI')return _0x2f3295[_0x290744(0x1b6)];if(_0x4d5044===_0x290744(0x6b2))return _0x2f3295[_0x290744(0x465)];if(_0x4d5044===_0x290744(0x58c))return _0x2f3295[_0x290744(0x36b)];if(_0x4d5044===_0x290744(0x4d9))return _0x2f3295[_0x290744(0x101)];if(_0x4d5044===_0x290744(0x698))return _0x2f3295[_0x290744(0x4a4)];if(_0x4d5044===_0x290744(0x428))return _0x2f3295[_0x290744(0x3e6)];if(_0x4d5044===_0x290744(0x2e8))return _0x2f3295[_0x290744(0x561)];if(_0x4d5044===_0x290744(0x3d1))return _0x2f3295[_0x290744(0x3cf)];if(_0x4d5044==='TGR')return _0x2f3295[_0x290744(0x15e)];if(_0x4d5044===_0x290744(0x291))return _0x2f3295[_0x290744(0x334)];if(_0x4d5044==='REC')return _0x2f3295['SParamVocab2'];if(_0x4d5044==='PHA')return _0x2f3295[_0x290744(0xe5)];if(_0x4d5044===_0x290744(0x65d))return _0x2f3295[_0x290744(0x5a6)];if(_0x4d5044===_0x290744(0x5df))return _0x2f3295[_0x290744(0x3f8)];if(_0x4d5044===_0x290744(0x278))return _0x2f3295['SParamVocab6'];if(_0x4d5044===_0x290744(0x18e))return _0x2f3295['SParamVocab7'];if(_0x4d5044==='FDR')return _0x2f3295[_0x290744(0x297)];if(_0x4d5044==='EXR')return _0x2f3295['SParamVocab9'];if(VisuMZ[_0x290744(0x3ea)][_0x290744(0x398)][_0x4d5044])return VisuMZ[_0x290744(0x3ea)][_0x290744(0x398)][_0x4d5044];return'';},TextManager[_0x18ba1f(0x579)]=function(_0x2c6210){const _0x538b1d=_0x18ba1f;if(_0x2c6210===_0x538b1d(0x42b))_0x2c6210='escape';let _0x105dd3=[];for(let _0x2d0bc4 in Input['keyMapper']){_0x2d0bc4=Number(_0x2d0bc4);if(_0x2d0bc4>=0x60&&_0x2d0bc4<=0x69)continue;if([0x12,0x20][_0x538b1d(0x1b8)](_0x2d0bc4))continue;_0x2c6210===Input['keyMapper'][_0x2d0bc4]&&_0x105dd3[_0x538b1d(0x25f)](_0x2d0bc4);}for(let _0x5719e6=0x0;_0x5719e6<_0x105dd3[_0x538b1d(0x397)];_0x5719e6++){_0x105dd3[_0x5719e6]=TextManager[_0x538b1d(0x12a)][_0x105dd3[_0x5719e6]];}return this[_0x538b1d(0x573)](_0x105dd3);},TextManager[_0x18ba1f(0x573)]=function(_0x20031d){const _0x3c319e=_0x18ba1f,_0x58a885=VisuMZ['CoreEngine'][_0x3c319e(0x493)][_0x3c319e(0x32e)],_0x262b8c=_0x58a885[_0x3c319e(0x47b)],_0x5f6d5b=_0x20031d[_0x3c319e(0x2bb)](),_0x155f64=_0x3c319e(0x4d4)[_0x3c319e(0x400)](_0x5f6d5b);return _0x58a885[_0x155f64]?_0x58a885[_0x155f64]:_0x262b8c[_0x3c319e(0x400)](_0x5f6d5b);},TextManager[_0x18ba1f(0x199)]=function(_0x1513d1,_0x3d38da){const _0x5c9615=_0x18ba1f,_0x5b399e=VisuMZ['CoreEngine']['Settings']['ButtonAssist'],_0xb32d6=_0x5b399e['MultiKeyFmt'],_0x18d38c=this['getInputButtonString'](_0x1513d1),_0x45116f=this[_0x5c9615(0x579)](_0x3d38da);return _0xb32d6['format'](_0x18d38c,_0x45116f);},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x3f4)]=ColorManager[_0x18ba1f(0x246)],ColorManager['loadWindowskin']=function(){const _0x176b06=_0x18ba1f;VisuMZ[_0x176b06(0x3ea)]['ColorManager_loadWindowskin'][_0x176b06(0x2fa)](this),this['_colorCache']=this['_colorCache']||{};},ColorManager['getColorDataFromPluginParameters']=function(_0x1b9127,_0x3c3925){const _0xa3591d=_0x18ba1f;return _0x3c3925=String(_0x3c3925),this[_0xa3591d(0x420)]=this[_0xa3591d(0x420)]||{},_0x3c3925[_0xa3591d(0x163)](/#(.*)/i)?this[_0xa3591d(0x420)][_0x1b9127]=_0xa3591d(0x133)[_0xa3591d(0x400)](String(RegExp['$1'])):this[_0xa3591d(0x420)][_0x1b9127]=this[_0xa3591d(0x4e3)](Number(_0x3c3925)),this[_0xa3591d(0x420)][_0x1b9127];},ColorManager[_0x18ba1f(0x5bd)]=function(_0x5cbef3){const _0x4ce547=_0x18ba1f;return _0x5cbef3=String(_0x5cbef3),_0x5cbef3[_0x4ce547(0x163)](/#(.*)/i)?'#%1'[_0x4ce547(0x400)](String(RegExp['$1'])):this['textColor'](Number(_0x5cbef3));},ColorManager['clearCachedKeys']=function(){const _0x5c6c76=_0x18ba1f;this[_0x5c6c76(0x420)]={};},ColorManager[_0x18ba1f(0x250)]=function(){const _0x207725=_0x18ba1f,_0xfcd989=_0x207725(0x1fd);this[_0x207725(0x420)]=this[_0x207725(0x420)]||{};if(this[_0x207725(0x420)][_0xfcd989])return this[_0x207725(0x420)][_0xfcd989];const _0x45d284=VisuMZ[_0x207725(0x3ea)][_0x207725(0x493)]['Color'][_0x207725(0x5ad)];return this['getColorDataFromPluginParameters'](_0xfcd989,_0x45d284);},ColorManager[_0x18ba1f(0x3af)]=function(){const _0x2c4e0e=_0x18ba1f,_0x673d26=_0x2c4e0e(0x60e);this['_colorCache']=this['_colorCache']||{};if(this[_0x2c4e0e(0x420)][_0x673d26])return this[_0x2c4e0e(0x420)][_0x673d26];const _0x5b1737=VisuMZ['CoreEngine'][_0x2c4e0e(0x493)][_0x2c4e0e(0x5d1)][_0x2c4e0e(0x35f)];return this[_0x2c4e0e(0x207)](_0x673d26,_0x5b1737);},ColorManager[_0x18ba1f(0x54c)]=function(){const _0x1d5f0a=_0x18ba1f,_0x42d2f2=_0x1d5f0a(0x526);this[_0x1d5f0a(0x420)]=this['_colorCache']||{};if(this[_0x1d5f0a(0x420)][_0x42d2f2])return this[_0x1d5f0a(0x420)][_0x42d2f2];const _0x3d1dbf=VisuMZ['CoreEngine']['Settings'][_0x1d5f0a(0x5d1)][_0x1d5f0a(0x2e1)];return this[_0x1d5f0a(0x207)](_0x42d2f2,_0x3d1dbf);},ColorManager[_0x18ba1f(0x524)]=function(){const _0x246d55=_0x18ba1f,_0x287663='_stored_deathColor';this['_colorCache']=this[_0x246d55(0x420)]||{};if(this['_colorCache'][_0x287663])return this[_0x246d55(0x420)][_0x287663];const _0x2a5fb6=VisuMZ['CoreEngine']['Settings'][_0x246d55(0x5d1)][_0x246d55(0x530)];return this['getColorDataFromPluginParameters'](_0x287663,_0x2a5fb6);},ColorManager[_0x18ba1f(0x120)]=function(){const _0x144dd6=_0x18ba1f,_0xd186fe=_0x144dd6(0x32b);this['_colorCache']=this[_0x144dd6(0x420)]||{};if(this[_0x144dd6(0x420)][_0xd186fe])return this['_colorCache'][_0xd186fe];const _0x1be625=VisuMZ[_0x144dd6(0x3ea)][_0x144dd6(0x493)][_0x144dd6(0x5d1)][_0x144dd6(0x6a4)];return this[_0x144dd6(0x207)](_0xd186fe,_0x1be625);},ColorManager[_0x18ba1f(0x5d5)]=function(){const _0x345772=_0x18ba1f,_0xf45019=_0x345772(0x126);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0xf45019])return this[_0x345772(0x420)][_0xf45019];const _0x138cf7=VisuMZ['CoreEngine'][_0x345772(0x493)][_0x345772(0x5d1)][_0x345772(0x393)];return this[_0x345772(0x207)](_0xf45019,_0x138cf7);},ColorManager[_0x18ba1f(0x452)]=function(){const _0x53fb47=_0x18ba1f,_0x21acfb=_0x53fb47(0x226);this[_0x53fb47(0x420)]=this[_0x53fb47(0x420)]||{};if(this[_0x53fb47(0x420)][_0x21acfb])return this[_0x53fb47(0x420)][_0x21acfb];const _0x50211e=VisuMZ['CoreEngine'][_0x53fb47(0x493)][_0x53fb47(0x5d1)]['ColorHPGauge2'];return this['getColorDataFromPluginParameters'](_0x21acfb,_0x50211e);},ColorManager[_0x18ba1f(0x28f)]=function(){const _0x3ab053=_0x18ba1f,_0x40e51e=_0x3ab053(0x3de);this[_0x3ab053(0x420)]=this['_colorCache']||{};if(this[_0x3ab053(0x420)][_0x40e51e])return this[_0x3ab053(0x420)][_0x40e51e];const _0x308c2d=VisuMZ[_0x3ab053(0x3ea)]['Settings'][_0x3ab053(0x5d1)][_0x3ab053(0x5c0)];return this[_0x3ab053(0x207)](_0x40e51e,_0x308c2d);},ColorManager[_0x18ba1f(0x4af)]=function(){const _0x34bf28=_0x18ba1f,_0x41a292=_0x34bf28(0x348);this[_0x34bf28(0x420)]=this['_colorCache']||{};if(this[_0x34bf28(0x420)][_0x41a292])return this[_0x34bf28(0x420)][_0x41a292];const _0x5475f1=VisuMZ['CoreEngine']['Settings'][_0x34bf28(0x5d1)][_0x34bf28(0x20a)];return this[_0x34bf28(0x207)](_0x41a292,_0x5475f1);},ColorManager[_0x18ba1f(0x38e)]=function(){const _0x5f1472=_0x18ba1f,_0x412ad8=_0x5f1472(0x213);this[_0x5f1472(0x420)]=this['_colorCache']||{};if(this[_0x5f1472(0x420)][_0x412ad8])return this[_0x5f1472(0x420)][_0x412ad8];const _0x2e41ee=VisuMZ[_0x5f1472(0x3ea)][_0x5f1472(0x493)][_0x5f1472(0x5d1)][_0x5f1472(0x220)];return this[_0x5f1472(0x207)](_0x412ad8,_0x2e41ee);},ColorManager['powerUpColor']=function(){const _0x3e2816=_0x18ba1f,_0x351d3e=_0x3e2816(0x671);this[_0x3e2816(0x420)]=this[_0x3e2816(0x420)]||{};if(this[_0x3e2816(0x420)][_0x351d3e])return this['_colorCache'][_0x351d3e];const _0x4ebbdd=VisuMZ['CoreEngine']['Settings'][_0x3e2816(0x5d1)]['ColorPowerUp'];return this[_0x3e2816(0x207)](_0x351d3e,_0x4ebbdd);},ColorManager['powerDownColor']=function(){const _0x564b21=_0x18ba1f,_0x61dfc3=_0x564b21(0x5aa);this[_0x564b21(0x420)]=this[_0x564b21(0x420)]||{};if(this[_0x564b21(0x420)][_0x61dfc3])return this[_0x564b21(0x420)][_0x61dfc3];const _0xb91490=VisuMZ[_0x564b21(0x3ea)]['Settings']['Color'][_0x564b21(0x379)];return this[_0x564b21(0x207)](_0x61dfc3,_0xb91490);},ColorManager[_0x18ba1f(0x48a)]=function(){const _0x57baf5=_0x18ba1f,_0x4ca41b='_stored_ctGaugeColor1';this[_0x57baf5(0x420)]=this[_0x57baf5(0x420)]||{};if(this[_0x57baf5(0x420)][_0x4ca41b])return this[_0x57baf5(0x420)][_0x4ca41b];const _0x3bacca=VisuMZ[_0x57baf5(0x3ea)][_0x57baf5(0x493)][_0x57baf5(0x5d1)][_0x57baf5(0x572)];return this[_0x57baf5(0x207)](_0x4ca41b,_0x3bacca);},ColorManager[_0x18ba1f(0x519)]=function(){const _0x445f87=_0x18ba1f,_0x223cc9=_0x445f87(0x487);this[_0x445f87(0x420)]=this[_0x445f87(0x420)]||{};if(this[_0x445f87(0x420)][_0x223cc9])return this[_0x445f87(0x420)][_0x223cc9];const _0x2ade89=VisuMZ[_0x445f87(0x3ea)][_0x445f87(0x493)][_0x445f87(0x5d1)][_0x445f87(0x695)];return this[_0x445f87(0x207)](_0x223cc9,_0x2ade89);},ColorManager[_0x18ba1f(0x529)]=function(){const _0x229782=_0x18ba1f,_0x53284e=_0x229782(0x27a);this[_0x229782(0x420)]=this[_0x229782(0x420)]||{};if(this[_0x229782(0x420)][_0x53284e])return this[_0x229782(0x420)][_0x53284e];const _0x1ef00c=VisuMZ['CoreEngine'][_0x229782(0x493)][_0x229782(0x5d1)]['ColorTPGauge1'];return this[_0x229782(0x207)](_0x53284e,_0x1ef00c);},ColorManager[_0x18ba1f(0x2b2)]=function(){const _0x37e5ef=_0x18ba1f,_0x763a4a=_0x37e5ef(0x11a);this[_0x37e5ef(0x420)]=this[_0x37e5ef(0x420)]||{};if(this[_0x37e5ef(0x420)][_0x763a4a])return this[_0x37e5ef(0x420)][_0x763a4a];const _0x1065b2=VisuMZ[_0x37e5ef(0x3ea)][_0x37e5ef(0x493)][_0x37e5ef(0x5d1)][_0x37e5ef(0x5f3)];return this['getColorDataFromPluginParameters'](_0x763a4a,_0x1065b2);},ColorManager[_0x18ba1f(0x42a)]=function(){const _0x59b0c5=_0x18ba1f,_0x16f045=_0x59b0c5(0x416);this['_colorCache']=this[_0x59b0c5(0x420)]||{};if(this[_0x59b0c5(0x420)][_0x16f045])return this[_0x59b0c5(0x420)][_0x16f045];const _0x408d33=VisuMZ[_0x59b0c5(0x3ea)][_0x59b0c5(0x493)][_0x59b0c5(0x5d1)]['ColorTPCost'];return this[_0x59b0c5(0x207)](_0x16f045,_0x408d33);},ColorManager[_0x18ba1f(0x12e)]=function(){const _0x235053=_0x18ba1f,_0x23d85d=_0x235053(0x277);this[_0x235053(0x420)]=this[_0x235053(0x420)]||{};if(this[_0x235053(0x420)][_0x23d85d])return this[_0x235053(0x420)][_0x23d85d];const _0x4ebaf4=VisuMZ[_0x235053(0x3ea)][_0x235053(0x493)][_0x235053(0x5d1)]['ColorTPCost'];return this[_0x235053(0x207)](_0x23d85d,_0x4ebaf4);},ColorManager[_0x18ba1f(0x12f)]=function(){const _0x21d8b7=_0x18ba1f,_0x303af2='_stored_expGaugeColor1';this[_0x21d8b7(0x420)]=this[_0x21d8b7(0x420)]||{};if(this[_0x21d8b7(0x420)][_0x303af2])return this[_0x21d8b7(0x420)][_0x303af2];const _0x4ec681=VisuMZ['CoreEngine'][_0x21d8b7(0x493)]['Color'][_0x21d8b7(0x374)];return this['getColorDataFromPluginParameters'](_0x303af2,_0x4ec681);},ColorManager['expGaugeColor2']=function(){const _0x39f3c4=_0x18ba1f,_0x30d2d1=_0x39f3c4(0xe2);this[_0x39f3c4(0x420)]=this[_0x39f3c4(0x420)]||{};if(this[_0x39f3c4(0x420)][_0x30d2d1])return this[_0x39f3c4(0x420)][_0x30d2d1];const _0x5db6ef=VisuMZ[_0x39f3c4(0x3ea)][_0x39f3c4(0x493)][_0x39f3c4(0x5d1)]['ColorExpGauge2'];return this[_0x39f3c4(0x207)](_0x30d2d1,_0x5db6ef);},ColorManager[_0x18ba1f(0x5ff)]=function(){const _0x538917=_0x18ba1f,_0x5e32d7='_stored_maxLvGaugeColor1';this[_0x538917(0x420)]=this[_0x538917(0x420)]||{};if(this['_colorCache'][_0x5e32d7])return this[_0x538917(0x420)][_0x5e32d7];const _0x17a1ce=VisuMZ[_0x538917(0x3ea)]['Settings'][_0x538917(0x5d1)][_0x538917(0x4f7)];return this[_0x538917(0x207)](_0x5e32d7,_0x17a1ce);},ColorManager['maxLvGaugeColor2']=function(){const _0x4ad325=_0x18ba1f,_0x526620='_stored_maxLvGaugeColor2';this[_0x4ad325(0x420)]=this[_0x4ad325(0x420)]||{};if(this[_0x4ad325(0x420)][_0x526620])return this[_0x4ad325(0x420)][_0x526620];const _0x1606f9=VisuMZ[_0x4ad325(0x3ea)][_0x4ad325(0x493)]['Color'][_0x4ad325(0x256)];return this['getColorDataFromPluginParameters'](_0x526620,_0x1606f9);},ColorManager[_0x18ba1f(0x59b)]=function(_0x1ffc87){const _0x295445=_0x18ba1f;return VisuMZ[_0x295445(0x3ea)][_0x295445(0x493)][_0x295445(0x5d1)][_0x295445(0x69d)][_0x295445(0x2fa)](this,_0x1ffc87);},ColorManager['mpColor']=function(_0xe89a41){const _0x2dca13=_0x18ba1f;return VisuMZ[_0x2dca13(0x3ea)][_0x2dca13(0x493)][_0x2dca13(0x5d1)]['ActorMPColor']['call'](this,_0xe89a41);},ColorManager[_0x18ba1f(0x55e)]=function(_0x3cb6d7){const _0x2fb1f3=_0x18ba1f;return VisuMZ[_0x2fb1f3(0x3ea)][_0x2fb1f3(0x493)][_0x2fb1f3(0x5d1)][_0x2fb1f3(0x433)][_0x2fb1f3(0x2fa)](this,_0x3cb6d7);},ColorManager[_0x18ba1f(0x205)]=function(_0x553371){const _0x42758c=_0x18ba1f;return VisuMZ[_0x42758c(0x3ea)]['Settings'][_0x42758c(0x5d1)][_0x42758c(0x697)][_0x42758c(0x2fa)](this,_0x553371);},ColorManager[_0x18ba1f(0x218)]=function(_0xe5ba4b){const _0x1dafcd=_0x18ba1f;return VisuMZ[_0x1dafcd(0x3ea)][_0x1dafcd(0x493)][_0x1dafcd(0x5d1)][_0x1dafcd(0x307)][_0x1dafcd(0x2fa)](this,_0xe5ba4b);},ColorManager[_0x18ba1f(0x2c3)]=function(){const _0x3ca6bb=_0x18ba1f;return VisuMZ[_0x3ca6bb(0x3ea)][_0x3ca6bb(0x493)][_0x3ca6bb(0x5d1)][_0x3ca6bb(0x299)];},ColorManager['outlineColorDmg']=function(){const _0x3b659b=_0x18ba1f;return VisuMZ[_0x3b659b(0x3ea)][_0x3b659b(0x493)]['Color'][_0x3b659b(0xfd)]||_0x3b659b(0xfc);},ColorManager[_0x18ba1f(0xe6)]=function(){const _0x15d034=_0x18ba1f;return VisuMZ['CoreEngine'][_0x15d034(0x493)][_0x15d034(0x5d1)][_0x15d034(0x43a)]||'rgba(0,\x200,\x200,\x201.0)';},ColorManager['dimColor1']=function(){const _0xedd19a=_0x18ba1f;return VisuMZ[_0xedd19a(0x3ea)][_0xedd19a(0x493)]['Color']['DimColor1'];},ColorManager[_0x18ba1f(0x33d)]=function(){const _0xfc4d86=_0x18ba1f;return VisuMZ[_0xfc4d86(0x3ea)]['Settings'][_0xfc4d86(0x5d1)][_0xfc4d86(0x3c8)];},ColorManager['itemBackColor1']=function(){const _0x4c0c88=_0x18ba1f;return VisuMZ[_0x4c0c88(0x3ea)]['Settings'][_0x4c0c88(0x5d1)][_0x4c0c88(0x5d8)];},ColorManager['itemBackColor2']=function(){const _0x3df807=_0x18ba1f;return VisuMZ['CoreEngine'][_0x3df807(0x493)][_0x3df807(0x5d1)]['ItemBackColor2'];},SceneManager['_storedStack']=[],VisuMZ['CoreEngine'][_0x18ba1f(0x2a0)]=SceneManager[_0x18ba1f(0x117)],SceneManager[_0x18ba1f(0x117)]=function(){const _0x14fbef=_0x18ba1f;VisuMZ[_0x14fbef(0x3ea)]['SceneManager_initialize']['call'](this),this[_0x14fbef(0x4bf)]();},VisuMZ['CoreEngine'][_0x18ba1f(0x3fc)]=SceneManager[_0x18ba1f(0x5f9)],SceneManager['onKeyDown']=function(_0x3ec9ef){const _0x13eca3=_0x18ba1f;if($gameTemp)this['onKeyDownKeysF6F7'](_0x3ec9ef);VisuMZ[_0x13eca3(0x3ea)][_0x13eca3(0x3fc)][_0x13eca3(0x2fa)](this,_0x3ec9ef);},SceneManager[_0x18ba1f(0x3f6)]=function(_0x2c8485){const _0x5a17ea=_0x18ba1f;if(!_0x2c8485[_0x5a17ea(0x343)]&&!_0x2c8485[_0x5a17ea(0x4eb)])switch(_0x2c8485[_0x5a17ea(0x58d)]){case 0x75:this['playTestF6']();break;case 0x76:if(Input[_0x5a17ea(0x5b1)]('shift')||Input[_0x5a17ea(0x5b1)]('ctrl'))return;this[_0x5a17ea(0x24d)]();break;}},SceneManager[_0x18ba1f(0x36f)]=function(){const _0xcdf58=_0x18ba1f;if($gameTemp['isPlaytest']()&&VisuMZ['CoreEngine'][_0xcdf58(0x493)][_0xcdf58(0x2dd)]['F6key']){ConfigManager['seVolume']!==0x0?(ConfigManager[_0xcdf58(0x652)]=0x0,ConfigManager[_0xcdf58(0x435)]=0x0,ConfigManager[_0xcdf58(0x275)]=0x0,ConfigManager['seVolume']=0x0):(ConfigManager[_0xcdf58(0x652)]=0x64,ConfigManager[_0xcdf58(0x435)]=0x64,ConfigManager[_0xcdf58(0x275)]=0x64,ConfigManager['seVolume']=0x64);ConfigManager[_0xcdf58(0x68b)]();if(this[_0xcdf58(0x3bd)][_0xcdf58(0x288)]===Scene_Options){if(this[_0xcdf58(0x3bd)][_0xcdf58(0x4d0)])this[_0xcdf58(0x3bd)]['_optionsWindow'][_0xcdf58(0x4e4)]();if(this['_scene']['_listWindow'])this[_0xcdf58(0x3bd)]['_listWindow']['refresh']();}}},SceneManager[_0x18ba1f(0x24d)]=function(){const _0xe98454=_0x18ba1f;$gameTemp['isPlaytest']()&&VisuMZ['CoreEngine'][_0xe98454(0x493)][_0xe98454(0x2dd)][_0xe98454(0x295)]&&($gameTemp['_playTestFastMode']=!$gameTemp['_playTestFastMode']);},SceneManager[_0x18ba1f(0x4bf)]=function(){const _0xb6dfb8=_0x18ba1f;this[_0xb6dfb8(0x22e)]=![],this[_0xb6dfb8(0x492)]=!VisuMZ[_0xb6dfb8(0x3ea)][_0xb6dfb8(0x493)]['UI'][_0xb6dfb8(0x661)];},SceneManager[_0x18ba1f(0x432)]=function(_0x197d1c){const _0x4590ef=_0x18ba1f;VisuMZ['CoreEngine'][_0x4590ef(0x493)]['UI'][_0x4590ef(0x265)]&&(this[_0x4590ef(0x22e)]=_0x197d1c);},SceneManager[_0x18ba1f(0x64a)]=function(){return this['_sideButtonLayout'];},SceneManager[_0x18ba1f(0x642)]=function(){return this['_hideButtons'];},SceneManager['areButtonsOutsideMainUI']=function(){const _0x4a3328=_0x18ba1f;return this[_0x4a3328(0x642)]()||this[_0x4a3328(0x64a)]();},VisuMZ['CoreEngine'][_0x18ba1f(0x534)]=SceneManager[_0x18ba1f(0x1e7)],SceneManager[_0x18ba1f(0x1e7)]=function(){const _0xdbe7a4=_0x18ba1f;return VisuMZ[_0xdbe7a4(0x3ea)][_0xdbe7a4(0x493)][_0xdbe7a4(0x2dd)]['RequireFocus']?VisuMZ[_0xdbe7a4(0x3ea)][_0xdbe7a4(0x534)][_0xdbe7a4(0x2fa)](this):!![];},SceneManager[_0x18ba1f(0x292)]=function(_0x1325cc){const _0x203c37=_0x18ba1f;if(_0x1325cc instanceof Error)this[_0x203c37(0x5f6)](_0x1325cc);else _0x1325cc instanceof Array&&_0x1325cc[0x0]==='LoadError'?this[_0x203c37(0x14b)](_0x1325cc):this[_0x203c37(0x69a)](_0x1325cc);this[_0x203c37(0x2c4)]();},VisuMZ['CoreEngine'][_0x18ba1f(0x247)]=BattleManager[_0x18ba1f(0x521)],BattleManager[_0x18ba1f(0x521)]=function(){const _0x486297=_0x18ba1f;if(VisuMZ[_0x486297(0x3ea)][_0x486297(0x493)][_0x486297(0x2dd)]['EscapeAlways'])this[_0x486297(0x5c4)]();else return VisuMZ['CoreEngine'][_0x486297(0x247)]['call'](this);},BattleManager[_0x18ba1f(0x5c4)]=function(){const _0x5466ad=_0x18ba1f;return $gameParty[_0x5466ad(0x578)](),SoundManager[_0x5466ad(0x2cf)](),this[_0x5466ad(0x2d7)](),!![];},BattleManager[_0x18ba1f(0x5f2)]=function(){return $gameSystem['getBattleSystem']()>=0x1;},BattleManager[_0x18ba1f(0x57d)]=function(){return $gameSystem['getBattleSystem']()===0x1;},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x5ec)]=Game_Temp['prototype'][_0x18ba1f(0x117)],Game_Temp[_0x18ba1f(0x5e5)][_0x18ba1f(0x117)]=function(){const _0x56faf5=_0x18ba1f;VisuMZ[_0x56faf5(0x3ea)][_0x56faf5(0x5ec)]['call'](this),this[_0x56faf5(0x305)](),this[_0x56faf5(0x373)]();},Game_Temp[_0x18ba1f(0x5e5)]['forceOutOfPlaytest']=function(){const _0x1afa22=_0x18ba1f;VisuMZ[_0x1afa22(0x3ea)][_0x1afa22(0x493)][_0x1afa22(0x2dd)]['ForceNoPlayTest']&&(this[_0x1afa22(0x3ae)]=![]);},Game_Temp[_0x18ba1f(0x5e5)][_0x18ba1f(0x373)]=function(){this['_fauxAnimationQueue']=[];},Game_Temp[_0x18ba1f(0x5e5)][_0x18ba1f(0x6ae)]=function(_0x4861d7,_0x29556c,_0x3180b3,_0x42421c){const _0x300e21=_0x18ba1f;if(!this[_0x300e21(0x359)]())return;_0x3180b3=_0x3180b3||![],_0x42421c=_0x42421c||![];if($dataAnimations[_0x29556c]){const _0x404156={'targets':_0x4861d7,'animationId':_0x29556c,'mirror':_0x3180b3,'mute':_0x42421c};this[_0x300e21(0x282)][_0x300e21(0x25f)](_0x404156);for(const _0x2264cd of _0x4861d7){_0x2264cd['startAnimation']&&_0x2264cd['startAnimation']();}}},Game_Temp[_0x18ba1f(0x5e5)][_0x18ba1f(0x359)]=function(){return!![];},Game_Temp[_0x18ba1f(0x5e5)][_0x18ba1f(0x3a6)]=function(){const _0x56123e=_0x18ba1f;return this[_0x56123e(0x282)]['shift']();},Game_Temp[_0x18ba1f(0x5e5)][_0x18ba1f(0x22d)]=function(_0x7d5e2c){const _0x17b777=_0x18ba1f;this[_0x17b777(0x5b8)]=_0x7d5e2c;},Game_Temp['prototype']['getLastPluginCommandInterpreter']=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp[_0x18ba1f(0x5e5)][_0x18ba1f(0x371)]=function(){const _0x1d188b=_0x18ba1f;this['_forcedTroopView']=undefined,this[_0x1d188b(0x170)]=undefined;},Game_Temp[_0x18ba1f(0x5e5)][_0x18ba1f(0x394)]=function(_0x5d7126){const _0x126c0c=_0x18ba1f;$gameMap&&$dataMap&&$dataMap[_0x126c0c(0xd4)]&&this[_0x126c0c(0x196)]($dataMap[_0x126c0c(0xd4)]);const _0x2384fe=$dataTroops[_0x5d7126];_0x2384fe&&this[_0x126c0c(0x196)](_0x2384fe[_0x126c0c(0x5e3)]);},Game_Temp[_0x18ba1f(0x5e5)][_0x18ba1f(0x196)]=function(_0x501f0c){const _0x49db8f=_0x18ba1f;if(!_0x501f0c)return;if(_0x501f0c[_0x49db8f(0x163)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x49db8f(0x20e)]='FV';else{if(_0x501f0c[_0x49db8f(0x163)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x49db8f(0x20e)]='SV';else{if(_0x501f0c[_0x49db8f(0x163)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x2dba42=String(RegExp['$1']);if(_0x2dba42[_0x49db8f(0x163)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x49db8f(0x20e)]='FV';else _0x2dba42['match'](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x49db8f(0x20e)]='SV');}}}if(_0x501f0c[_0x49db8f(0x163)](/<(?:DTB)>/i))this[_0x49db8f(0x170)]=0x0;else{if(_0x501f0c[_0x49db8f(0x163)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x49db8f(0x170)]=0x1;else{if(_0x501f0c['match'](/<(?:TPB|ATB)[ ]WAIT>/i))this['_forcedBattleSys']=0x2;else{if(_0x501f0c[_0x49db8f(0x163)](/<(?:CTB)>/i))Imported[_0x49db8f(0x522)]&&(this[_0x49db8f(0x170)]=_0x49db8f(0x621));else{if(_0x501f0c[_0x49db8f(0x163)](/<(?:STB)>/i))Imported[_0x49db8f(0x584)]&&(this[_0x49db8f(0x170)]=_0x49db8f(0x36a));else{if(_0x501f0c[_0x49db8f(0x163)](/<(?:BTB)>/i))Imported['VisuMZ_2_BattleSystemBTB']&&(this[_0x49db8f(0x170)]=_0x49db8f(0x535));else{if(_0x501f0c['match'](/<(?:FTB)>/i))Imported['VisuMZ_2_BattleSystemFTB']&&(this[_0x49db8f(0x170)]=_0x49db8f(0x3f7));else{if(_0x501f0c['match'](/<(?:OTB)>/i))Imported[_0x49db8f(0x333)]&&(this['_forcedBattleSys']=_0x49db8f(0x11d));else{if(_0x501f0c[_0x49db8f(0x163)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x19a8e7=String(RegExp['$1']);if(_0x19a8e7['match'](/DTB/i))this[_0x49db8f(0x170)]=0x0;else{if(_0x19a8e7[_0x49db8f(0x163)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x49db8f(0x170)]=0x1;else{if(_0x19a8e7['match'](/(?:TPB|ATB)[ ]WAIT/i))this[_0x49db8f(0x170)]=0x2;else{if(_0x19a8e7[_0x49db8f(0x163)](/CTB/i))Imported[_0x49db8f(0x522)]&&(this['_forcedBattleSys']=_0x49db8f(0x621));else{if(_0x19a8e7[_0x49db8f(0x163)](/STB/i))Imported[_0x49db8f(0x584)]&&(this[_0x49db8f(0x170)]=_0x49db8f(0x36a));else{if(_0x19a8e7[_0x49db8f(0x163)](/BTB/i))Imported[_0x49db8f(0x659)]&&(this[_0x49db8f(0x170)]=_0x49db8f(0x535));else{if(_0x19a8e7[_0x49db8f(0x163)](/FTB/i))Imported[_0x49db8f(0x406)]&&(this['_forcedBattleSys']=_0x49db8f(0x3f7));else _0x19a8e7[_0x49db8f(0x163)](/OTB/i)&&(Imported['VisuMZ_2_BattleSystemOTB']&&(this[_0x49db8f(0x170)]=_0x49db8f(0x11d)));}}}}}}}}}}}}}}}},VisuMZ['CoreEngine']['Game_System_initialize']=Game_System[_0x18ba1f(0x5e5)][_0x18ba1f(0x117)],Game_System[_0x18ba1f(0x5e5)][_0x18ba1f(0x117)]=function(){const _0x58add1=_0x18ba1f;VisuMZ[_0x58add1(0x3ea)][_0x58add1(0x51e)]['call'](this),this[_0x58add1(0xf0)]();},Game_System['prototype']['initCoreEngine']=function(){const _0x584beb=_0x18ba1f;this['_CoreEngineSettings']={'SideView':$dataSystem['optSideView'],'BattleSystem':this[_0x584beb(0x5ae)](),'FontSize':$dataSystem[_0x584beb(0x423)][_0x584beb(0x6a5)],'Padding':0xc};},Game_System[_0x18ba1f(0x5e5)][_0x18ba1f(0x115)]=function(){const _0x1755b9=_0x18ba1f;if($gameTemp[_0x1755b9(0x20e)]==='SV')return!![];else{if($gameTemp[_0x1755b9(0x20e)]==='FV')return![];}if(this['_CoreEngineSettings']===undefined)this[_0x1755b9(0xf0)]();if(this[_0x1755b9(0x478)][_0x1755b9(0x4e6)]===undefined)this[_0x1755b9(0xf0)]();return this[_0x1755b9(0x478)][_0x1755b9(0x4e6)];},Game_System[_0x18ba1f(0x5e5)][_0x18ba1f(0x4d1)]=function(_0x88d4b3){const _0x1a3d8e=_0x18ba1f;if(this[_0x1a3d8e(0x478)]===undefined)this[_0x1a3d8e(0xf0)]();if(this[_0x1a3d8e(0x478)]['SideView']===undefined)this['initCoreEngine']();this[_0x1a3d8e(0x478)][_0x1a3d8e(0x4e6)]=_0x88d4b3;},Game_System[_0x18ba1f(0x5e5)][_0x18ba1f(0x301)]=function(){const _0x4773a0=_0x18ba1f;if(this[_0x4773a0(0x478)]===undefined)this['initCoreEngine']();this[_0x4773a0(0x478)]['BattleSystem']=this[_0x4773a0(0x5ae)]();},Game_System['prototype'][_0x18ba1f(0x5ae)]=function(){const _0x4edf91=_0x18ba1f,_0x5a1782=(VisuMZ['CoreEngine']['Settings'][_0x4edf91(0x667)]||_0x4edf91(0x63a))[_0x4edf91(0x347)]()[_0x4edf91(0x525)]();return VisuMZ[_0x4edf91(0x3ea)][_0x4edf91(0x669)](_0x5a1782);},Game_System[_0x18ba1f(0x5e5)]['getBattleSystem']=function(){const _0x31e355=_0x18ba1f;if($gameTemp['_forcedBattleSys']!==undefined)return $gameTemp[_0x31e355(0x170)];if(this[_0x31e355(0x478)]===undefined)this[_0x31e355(0xf0)]();if(this[_0x31e355(0x478)][_0x31e355(0x667)]===undefined)this[_0x31e355(0x301)]();return this[_0x31e355(0x478)]['BattleSystem'];},Game_System['prototype'][_0x18ba1f(0x457)]=function(_0x4605d8){const _0x1e3dd2=_0x18ba1f;if(this['_CoreEngineSettings']===undefined)this[_0x1e3dd2(0xf0)]();if(this[_0x1e3dd2(0x478)]['BattleSystem']===undefined)this[_0x1e3dd2(0x301)]();this['_CoreEngineSettings']['BattleSystem']=_0x4605d8;},Game_System[_0x18ba1f(0x5e5)]['mainFontSize']=function(){const _0x1f6ccd=_0x18ba1f;if(this[_0x1f6ccd(0x478)]===undefined)this[_0x1f6ccd(0xf0)]();if(this['_CoreEngineSettings']['FontSize']===undefined)this[_0x1f6ccd(0xf0)]();return this['_CoreEngineSettings'][_0x1f6ccd(0x5d4)];},Game_System['prototype']['setMainFontSize']=function(_0xd04095){const _0x358218=_0x18ba1f;if(this[_0x358218(0x478)]===undefined)this[_0x358218(0xf0)]();if(this[_0x358218(0x478)]['TimeProgress']===undefined)this[_0x358218(0xf0)]();this[_0x358218(0x478)][_0x358218(0x5d4)]=_0xd04095;},Game_System[_0x18ba1f(0x5e5)][_0x18ba1f(0x1a6)]=function(){const _0x4a2fa1=_0x18ba1f;if(this[_0x4a2fa1(0x478)]===undefined)this[_0x4a2fa1(0xf0)]();if(this['_CoreEngineSettings']['Padding']===undefined)this[_0x4a2fa1(0xf0)]();return this[_0x4a2fa1(0x478)][_0x4a2fa1(0x38d)];},Game_System['prototype'][_0x18ba1f(0x338)]=function(_0x8e9061){const _0x38efe3=_0x18ba1f;if(this[_0x38efe3(0x478)]===undefined)this[_0x38efe3(0xf0)]();if(this['_CoreEngineSettings']['TimeProgress']===undefined)this[_0x38efe3(0xf0)]();this[_0x38efe3(0x478)][_0x38efe3(0x38d)]=_0x8e9061;},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x4b9)]=Game_Screen[_0x18ba1f(0x5e5)][_0x18ba1f(0x117)],Game_Screen[_0x18ba1f(0x5e5)][_0x18ba1f(0x117)]=function(){const _0x2c28e2=_0x18ba1f;VisuMZ['CoreEngine'][_0x2c28e2(0x4b9)]['call'](this),this[_0x2c28e2(0x5c9)]();},Game_Screen['prototype'][_0x18ba1f(0x5c9)]=function(){const _0x599450=_0x18ba1f,_0x51ac14=VisuMZ[_0x599450(0x3ea)]['Settings']['ScreenShake'];this[_0x599450(0x5ba)]=_0x51ac14?.[_0x599450(0x32d)]||_0x599450(0x414);},Game_Screen['prototype'][_0x18ba1f(0x5cf)]=function(){const _0x45b41d=_0x18ba1f;if(this[_0x45b41d(0x5ba)]===undefined)this[_0x45b41d(0x5c9)]();return this[_0x45b41d(0x5ba)];},Game_Screen['prototype'][_0x18ba1f(0x2a1)]=function(_0x33bb1b){const _0x20b8eb=_0x18ba1f;if(this[_0x20b8eb(0x5ba)]===undefined)this[_0x20b8eb(0x5c9)]();this[_0x20b8eb(0x5ba)]=_0x33bb1b[_0x20b8eb(0x615)]()[_0x20b8eb(0x525)]();},Game_Picture['prototype'][_0x18ba1f(0x518)]=function(){const _0x138d0a=_0x18ba1f;if($gameParty[_0x138d0a(0x5b4)]())return![];return this['name']()&&this[_0x138d0a(0x5e3)]()[_0x138d0a(0x2f0)](0x0)==='!';},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x17e)]=Game_Picture['prototype']['x'],Game_Picture[_0x18ba1f(0x5e5)]['x']=function(){const _0x5bbdb5=_0x18ba1f;return this['isMapScrollLinked']()?this[_0x5bbdb5(0x5f8)]():VisuMZ[_0x5bbdb5(0x3ea)][_0x5bbdb5(0x17e)]['call'](this);},Game_Picture['prototype'][_0x18ba1f(0x5f8)]=function(){const _0x3f24dd=_0x18ba1f,_0x5d15af=$gameMap[_0x3f24dd(0x148)]()*$gameMap[_0x3f24dd(0x29e)]();return this['_x']-_0x5d15af;},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x3c4)]=Game_Picture[_0x18ba1f(0x5e5)]['y'],Game_Picture['prototype']['y']=function(){const _0x821676=_0x18ba1f;return this['isMapScrollLinked']()?this[_0x821676(0x357)]():VisuMZ[_0x821676(0x3ea)][_0x821676(0x3c4)][_0x821676(0x2fa)](this);},Game_Picture['prototype'][_0x18ba1f(0x357)]=function(){const _0x3de4d2=_0x18ba1f,_0x43d0cf=$gameMap[_0x3de4d2(0x56c)]()*$gameMap[_0x3de4d2(0x122)]();return this['_y']-_0x43d0cf;},Game_Picture[_0x18ba1f(0x5e5)]['setEasingType']=function(_0x2005cd){this['_coreEasingType']=_0x2005cd;},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0xe9)]=Game_Picture['prototype'][_0x18ba1f(0xda)],Game_Picture['prototype'][_0x18ba1f(0xda)]=function(_0xd63099){const _0x4c144f=_0x18ba1f;return this[_0x4c144f(0x294)]=this[_0x4c144f(0x294)]||0x0,[0x0,0x1,0x2,0x3]['includes'](this['_coreEasingType'])?VisuMZ[_0x4c144f(0x3ea)]['Game_Picture_calcEasing'][_0x4c144f(0x2fa)](this,_0xd63099):VisuMZ[_0x4c144f(0x50f)](_0xd63099,this[_0x4c144f(0x294)]);},VisuMZ['CoreEngine']['Game_Action_itemHit']=Game_Action['prototype'][_0x18ba1f(0x634)],Game_Action[_0x18ba1f(0x5e5)]['itemHit']=function(_0x5101d8){const _0x2c90ae=_0x18ba1f;return VisuMZ[_0x2c90ae(0x3ea)]['Settings'][_0x2c90ae(0x2dd)]['ImprovedAccuracySystem']?this[_0x2c90ae(0x3a3)](_0x5101d8):VisuMZ[_0x2c90ae(0x3ea)]['Game_Action_itemHit'][_0x2c90ae(0x2fa)](this,_0x5101d8);},Game_Action['prototype'][_0x18ba1f(0x3a3)]=function(_0x42c35a){const _0x530f93=_0x18ba1f,_0x10ab5a=this[_0x530f93(0x366)](_0x42c35a),_0xed83af=this[_0x530f93(0x167)](_0x42c35a),_0x20ea05=this[_0x530f93(0x320)](_0x42c35a);return _0x10ab5a*(_0xed83af-_0x20ea05);},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x12d)]=Game_Action[_0x18ba1f(0x5e5)][_0x18ba1f(0x653)],Game_Action[_0x18ba1f(0x5e5)][_0x18ba1f(0x653)]=function(_0x465b09){const _0x452dfe=_0x18ba1f;return VisuMZ[_0x452dfe(0x3ea)]['Settings'][_0x452dfe(0x2dd)][_0x452dfe(0x45a)]?0x0:VisuMZ[_0x452dfe(0x3ea)]['Game_Action_itemEva']['call'](this,_0x465b09);},Game_Action['prototype'][_0x18ba1f(0x366)]=function(_0x1e7165){const _0x3ea485=_0x18ba1f;return this[_0x3ea485(0x405)]()['successRate']*0.01;},Game_Action[_0x18ba1f(0x5e5)][_0x18ba1f(0x167)]=function(_0x4a72ac){const _0x1f953f=_0x18ba1f;if(VisuMZ[_0x1f953f(0x3ea)]['Settings'][_0x1f953f(0x2dd)][_0x1f953f(0x50d)]&&this[_0x1f953f(0x539)]())return 0x1;return this['isPhysical']()?VisuMZ[_0x1f953f(0x3ea)][_0x1f953f(0x493)][_0x1f953f(0x2dd)]['AccuracyBoost']&&this['subject']()[_0x1f953f(0x408)]()?this[_0x1f953f(0x568)]()['hit']+0.05:this['subject']()[_0x1f953f(0x1e5)]:0x1;},Game_Action[_0x18ba1f(0x5e5)][_0x18ba1f(0x320)]=function(_0x16e5ba){const _0x20a763=_0x18ba1f;if(this[_0x20a763(0x568)]()[_0x20a763(0x408)]()===_0x16e5ba[_0x20a763(0x408)]())return 0x0;if(this['isPhysical']())return VisuMZ[_0x20a763(0x3ea)][_0x20a763(0x493)][_0x20a763(0x2dd)][_0x20a763(0x50d)]&&_0x16e5ba[_0x20a763(0x224)]()?_0x16e5ba['eva']-0.05:_0x16e5ba[_0x20a763(0x5de)];else return this['isMagical']()?_0x16e5ba[_0x20a763(0x520)]:0x0;},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x153)]=Game_Action[_0x18ba1f(0x5e5)][_0x18ba1f(0x693)],Game_Action['prototype']['updateLastTarget']=function(_0x3fc4fc){const _0x53480a=_0x18ba1f;VisuMZ[_0x53480a(0x3ea)][_0x53480a(0x153)]['call'](this,_0x3fc4fc);if(VisuMZ[_0x53480a(0x3ea)][_0x53480a(0x493)][_0x53480a(0x2dd)][_0x53480a(0x45a)])return;const _0x2811c2=_0x3fc4fc[_0x53480a(0x239)]();_0x2811c2[_0x53480a(0x53d)]&&(0x1-this['itemEva'](_0x3fc4fc)>this[_0x53480a(0x634)](_0x3fc4fc)&&(_0x2811c2[_0x53480a(0x53d)]=![],_0x2811c2[_0x53480a(0x3d3)]=!![]));},VisuMZ[_0x18ba1f(0x3ea)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x18ba1f(0x5e5)]['initMembers'],Game_BattlerBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x18b)]=function(){const _0x10e577=_0x18ba1f;this[_0x10e577(0x599)]={},VisuMZ[_0x10e577(0x3ea)][_0x10e577(0x38a)][_0x10e577(0x2fa)](this);},VisuMZ['CoreEngine']['Game_BattlerBase_refresh']=Game_BattlerBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x4e4)],Game_BattlerBase['prototype'][_0x18ba1f(0x4e4)]=function(){const _0x4152a7=_0x18ba1f;this[_0x4152a7(0x599)]={},VisuMZ[_0x4152a7(0x3ea)][_0x4152a7(0x17b)][_0x4152a7(0x2fa)](this);},Game_BattlerBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x20b)]=function(_0x242afe){const _0x2d31a1=_0x18ba1f;return this[_0x2d31a1(0x599)]=this[_0x2d31a1(0x599)]||{},this[_0x2d31a1(0x599)][_0x242afe]!==undefined;},Game_BattlerBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x3c0)]=function(_0xc4717e){const _0x119148=_0x18ba1f,_0x44d620=(_0x59c909,_0x3b77df)=>{const _0x402a7a=_0x243e;if(!_0x3b77df)return _0x59c909;if(_0x3b77df[_0x402a7a(0xd4)][_0x402a7a(0x163)](VisuMZ[_0x402a7a(0x3ea)][_0x402a7a(0x1a2)][_0x402a7a(0x3c0)][_0xc4717e])){var _0x112c53=Number(RegExp['$1']);_0x59c909+=_0x112c53;}if(_0x3b77df[_0x402a7a(0xd4)][_0x402a7a(0x163)](VisuMZ[_0x402a7a(0x3ea)][_0x402a7a(0x1a2)][_0x402a7a(0x5e9)][_0xc4717e])){var _0x86c464=String(RegExp['$1']);try{_0x59c909+=eval(_0x86c464);}catch(_0x14c831){if($gameTemp[_0x402a7a(0x3ca)]())console[_0x402a7a(0x50a)](_0x14c831);}}return _0x59c909;};return this[_0x119148(0x174)]()['reduce'](_0x44d620,this[_0x119148(0x328)][_0xc4717e]);},Game_BattlerBase['prototype'][_0x18ba1f(0x5f4)]=function(_0x10bbbd){const _0x775d72=_0x18ba1f;var _0x4104c5=_0x775d72(0x4b7)+(this[_0x775d72(0x408)]()?_0x775d72(0x2ca):'Enemy')+_0x775d72(0x1d9)+_0x10bbbd;if(this[_0x775d72(0x20b)](_0x4104c5))return this[_0x775d72(0x599)][_0x4104c5];this[_0x775d72(0x599)][_0x4104c5]=eval(VisuMZ[_0x775d72(0x3ea)][_0x775d72(0x493)][_0x775d72(0x1ed)][_0x4104c5]);const _0x13a8e8=(_0x4f8fe9,_0x15ad2c)=>{const _0xe0fee5=_0x775d72;if(!_0x15ad2c)return _0x4f8fe9;if(_0x15ad2c[_0xe0fee5(0xd4)][_0xe0fee5(0x163)](VisuMZ[_0xe0fee5(0x3ea)]['RegExp'][_0xe0fee5(0x5f4)][_0x10bbbd])){var _0x2196e7=Number(RegExp['$1']);if(_0x2196e7===0x0)_0x2196e7=Number[_0xe0fee5(0x23f)];_0x4f8fe9=Math[_0xe0fee5(0x5c8)](_0x4f8fe9,_0x2196e7);}if(_0x15ad2c[_0xe0fee5(0xd4)][_0xe0fee5(0x163)](VisuMZ['CoreEngine'][_0xe0fee5(0x1a2)][_0xe0fee5(0x564)][_0x10bbbd])){var _0xb24f0f=String(RegExp['$1']);try{_0x4f8fe9=Math[_0xe0fee5(0x5c8)](_0x4f8fe9,Number(eval(_0xb24f0f)));}catch(_0x2b4ff4){if($gameTemp[_0xe0fee5(0x3ca)]())console[_0xe0fee5(0x50a)](_0x2b4ff4);}}return _0x4f8fe9;};if(this['_cache'][_0x4104c5]===0x0)this[_0x775d72(0x599)][_0x4104c5]=Number[_0x775d72(0x23f)];return this[_0x775d72(0x599)][_0x4104c5]=this[_0x775d72(0x174)]()['reduce'](_0x13a8e8,this['_cache'][_0x4104c5]),this['_cache'][_0x4104c5];},Game_BattlerBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x225)]=function(_0x2c4df8){const _0x3c2658=_0x18ba1f,_0x492c36=this[_0x3c2658(0x2c2)](Game_BattlerBase[_0x3c2658(0xe4)],_0x2c4df8),_0x1bf515=(_0x12b85c,_0x10ea47)=>{const _0xeebd31=_0x3c2658;if(!_0x10ea47)return _0x12b85c;if(_0x10ea47['note']['match'](VisuMZ[_0xeebd31(0x3ea)][_0xeebd31(0x1a2)][_0xeebd31(0x3b2)][_0x2c4df8])){var _0x35a079=Number(RegExp['$1'])/0x64;_0x12b85c*=_0x35a079;}if(_0x10ea47[_0xeebd31(0xd4)][_0xeebd31(0x163)](VisuMZ[_0xeebd31(0x3ea)][_0xeebd31(0x1a2)][_0xeebd31(0x384)][_0x2c4df8])){var _0x35a079=Number(RegExp['$1']);_0x12b85c*=_0x35a079;}if(_0x10ea47[_0xeebd31(0xd4)][_0xeebd31(0x163)](VisuMZ[_0xeebd31(0x3ea)][_0xeebd31(0x1a2)][_0xeebd31(0x16c)][_0x2c4df8])){var _0x4eb138=String(RegExp['$1']);try{_0x12b85c*=eval(_0x4eb138);}catch(_0x9908ec){if($gameTemp['isPlaytest']())console[_0xeebd31(0x50a)](_0x9908ec);}}return _0x12b85c;};return this[_0x3c2658(0x174)]()['reduce'](_0x1bf515,_0x492c36);},Game_BattlerBase['prototype'][_0x18ba1f(0x12c)]=function(_0x7521b7){const _0x1e9498=_0x18ba1f,_0x508108=(_0x160b92,_0xd3c68b)=>{const _0x34f9fa=_0x243e;if(!_0xd3c68b)return _0x160b92;if(_0xd3c68b[_0x34f9fa(0xd4)][_0x34f9fa(0x163)](VisuMZ[_0x34f9fa(0x3ea)]['RegExp']['paramFlat'][_0x7521b7])){var _0x134622=Number(RegExp['$1']);_0x160b92+=_0x134622;}if(_0xd3c68b[_0x34f9fa(0xd4)][_0x34f9fa(0x163)](VisuMZ[_0x34f9fa(0x3ea)]['RegExp'][_0x34f9fa(0x3a7)][_0x7521b7])){var _0x1a24d9=String(RegExp['$1']);try{_0x160b92+=eval(_0x1a24d9);}catch(_0x3711cc){if($gameTemp[_0x34f9fa(0x3ca)]())console[_0x34f9fa(0x50a)](_0x3711cc);}}return _0x160b92;};return this[_0x1e9498(0x174)]()[_0x1e9498(0x605)](_0x508108,0x0);},Game_BattlerBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x17a)]=function(_0x586ece){const _0x2fd9f4=_0x18ba1f;let _0x4e4777=_0x2fd9f4(0x17a)+_0x586ece+_0x2fd9f4(0x19b);if(this['checkCacheKey'](_0x4e4777))return this['_cache'][_0x4e4777];return this[_0x2fd9f4(0x599)][_0x4e4777]=Math['round'](VisuMZ[_0x2fd9f4(0x3ea)]['Settings'][_0x2fd9f4(0x1ed)][_0x2fd9f4(0x559)]['call'](this,_0x586ece)),this[_0x2fd9f4(0x599)][_0x4e4777];},Game_BattlerBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x630)]=function(_0x221a36){const _0x562318=_0x18ba1f,_0xe26bfe=(_0x46423f,_0x2b2d1b)=>{const _0x26178b=_0x243e;if(!_0x2b2d1b)return _0x46423f;if(_0x2b2d1b[_0x26178b(0xd4)][_0x26178b(0x163)](VisuMZ[_0x26178b(0x3ea)][_0x26178b(0x1a2)][_0x26178b(0x363)][_0x221a36])){var _0x2823b3=Number(RegExp['$1'])/0x64;_0x46423f+=_0x2823b3;}if(_0x2b2d1b[_0x26178b(0xd4)][_0x26178b(0x163)](VisuMZ[_0x26178b(0x3ea)]['RegExp'][_0x26178b(0x37d)][_0x221a36])){var _0x2823b3=Number(RegExp['$1']);_0x46423f+=_0x2823b3;}if(_0x2b2d1b[_0x26178b(0xd4)][_0x26178b(0x163)](VisuMZ[_0x26178b(0x3ea)][_0x26178b(0x1a2)]['xparamPlusJS'][_0x221a36])){var _0x22253b=String(RegExp['$1']);try{_0x46423f+=eval(_0x22253b);}catch(_0x4b4b60){if($gameTemp[_0x26178b(0x3ca)]())console[_0x26178b(0x50a)](_0x4b4b60);}}return _0x46423f;};return this[_0x562318(0x174)]()[_0x562318(0x605)](_0xe26bfe,0x0);},Game_BattlerBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x65f)]=function(_0x5455b4){const _0x2cae59=_0x18ba1f,_0x558235=(_0x22ef31,_0x5de303)=>{const _0x2e2630=_0x243e;if(!_0x5de303)return _0x22ef31;if(_0x5de303[_0x2e2630(0xd4)]['match'](VisuMZ[_0x2e2630(0x3ea)][_0x2e2630(0x1a2)][_0x2e2630(0x3b0)][_0x5455b4])){var _0x3f9eba=Number(RegExp['$1'])/0x64;_0x22ef31*=_0x3f9eba;}if(_0x5de303[_0x2e2630(0xd4)][_0x2e2630(0x163)](VisuMZ[_0x2e2630(0x3ea)][_0x2e2630(0x1a2)][_0x2e2630(0xee)][_0x5455b4])){var _0x3f9eba=Number(RegExp['$1']);_0x22ef31*=_0x3f9eba;}if(_0x5de303[_0x2e2630(0xd4)][_0x2e2630(0x163)](VisuMZ[_0x2e2630(0x3ea)][_0x2e2630(0x1a2)][_0x2e2630(0x1c5)][_0x5455b4])){var _0x590e95=String(RegExp['$1']);try{_0x22ef31*=eval(_0x590e95);}catch(_0x1847ab){if($gameTemp[_0x2e2630(0x3ca)]())console['log'](_0x1847ab);}}return _0x22ef31;};return this['traitObjects']()[_0x2cae59(0x605)](_0x558235,0x1);},Game_BattlerBase['prototype'][_0x18ba1f(0x214)]=function(_0x22f166){const _0x5601cc=_0x18ba1f,_0x91e92c=(_0x32b01a,_0x5965dd)=>{const _0x48fab6=_0x243e;if(!_0x5965dd)return _0x32b01a;if(_0x5965dd[_0x48fab6(0xd4)][_0x48fab6(0x163)](VisuMZ[_0x48fab6(0x3ea)][_0x48fab6(0x1a2)][_0x48fab6(0x39e)][_0x22f166])){var _0xdfaab=Number(RegExp['$1'])/0x64;_0x32b01a+=_0xdfaab;}if(_0x5965dd[_0x48fab6(0xd4)]['match'](VisuMZ['CoreEngine'][_0x48fab6(0x1a2)]['xparamFlat2'][_0x22f166])){var _0xdfaab=Number(RegExp['$1']);_0x32b01a+=_0xdfaab;}if(_0x5965dd['note']['match'](VisuMZ[_0x48fab6(0x3ea)][_0x48fab6(0x1a2)][_0x48fab6(0x488)][_0x22f166])){var _0x2e4473=String(RegExp['$1']);try{_0x32b01a+=eval(_0x2e4473);}catch(_0x339126){if($gameTemp[_0x48fab6(0x3ca)]())console[_0x48fab6(0x50a)](_0x339126);}}return _0x32b01a;};return this[_0x5601cc(0x174)]()[_0x5601cc(0x605)](_0x91e92c,0x0);},Game_BattlerBase['prototype']['xparam']=function(_0x416a11){const _0x4f8d3c=_0x18ba1f;let _0x4c4c1b=_0x4f8d3c(0x5f0)+_0x416a11+_0x4f8d3c(0x19b);if(this['checkCacheKey'](_0x4c4c1b))return this[_0x4f8d3c(0x599)][_0x4c4c1b];return this['_cache'][_0x4c4c1b]=VisuMZ[_0x4f8d3c(0x3ea)][_0x4f8d3c(0x493)][_0x4f8d3c(0x1ed)][_0x4f8d3c(0x27f)][_0x4f8d3c(0x2fa)](this,_0x416a11),this[_0x4f8d3c(0x599)][_0x4c4c1b];},Game_BattlerBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x272)]=function(_0x4a0ef4){const _0x25c7c2=_0x18ba1f,_0x33c2c7=(_0x29447d,_0x3bcfc6)=>{const _0x40d433=_0x243e;if(!_0x3bcfc6)return _0x29447d;if(_0x3bcfc6[_0x40d433(0xd4)]['match'](VisuMZ[_0x40d433(0x3ea)][_0x40d433(0x1a2)][_0x40d433(0x5e0)][_0x4a0ef4])){var _0x4e514f=Number(RegExp['$1'])/0x64;_0x29447d+=_0x4e514f;}if(_0x3bcfc6[_0x40d433(0xd4)][_0x40d433(0x163)](VisuMZ[_0x40d433(0x3ea)][_0x40d433(0x1a2)][_0x40d433(0xd5)][_0x4a0ef4])){var _0x4e514f=Number(RegExp['$1']);_0x29447d+=_0x4e514f;}if(_0x3bcfc6['note'][_0x40d433(0x163)](VisuMZ[_0x40d433(0x3ea)]['RegExp'][_0x40d433(0x3e7)][_0x4a0ef4])){var _0x5b4d30=String(RegExp['$1']);try{_0x29447d+=eval(_0x5b4d30);}catch(_0x3a3a67){if($gameTemp['isPlaytest']())console[_0x40d433(0x50a)](_0x3a3a67);}}return _0x29447d;};return this[_0x25c7c2(0x174)]()[_0x25c7c2(0x605)](_0x33c2c7,0x0);},Game_BattlerBase['prototype'][_0x18ba1f(0x413)]=function(_0xd51f41){const _0x1fabdc=_0x18ba1f,_0x2be9d=(_0x249eb4,_0x3796ee)=>{const _0x4170bd=_0x243e;if(!_0x3796ee)return _0x249eb4;if(_0x3796ee[_0x4170bd(0xd4)][_0x4170bd(0x163)](VisuMZ[_0x4170bd(0x3ea)][_0x4170bd(0x1a2)][_0x4170bd(0x2c6)][_0xd51f41])){var _0x2be26b=Number(RegExp['$1'])/0x64;_0x249eb4*=_0x2be26b;}if(_0x3796ee[_0x4170bd(0xd4)][_0x4170bd(0x163)](VisuMZ[_0x4170bd(0x3ea)][_0x4170bd(0x1a2)]['sparamRate2'][_0xd51f41])){var _0x2be26b=Number(RegExp['$1']);_0x249eb4*=_0x2be26b;}if(_0x3796ee[_0x4170bd(0xd4)]['match'](VisuMZ[_0x4170bd(0x3ea)][_0x4170bd(0x1a2)][_0x4170bd(0x65b)][_0xd51f41])){var _0x2c17e6=String(RegExp['$1']);try{_0x249eb4*=eval(_0x2c17e6);}catch(_0x1a5238){if($gameTemp['isPlaytest']())console['log'](_0x1a5238);}}return _0x249eb4;};return this['traitObjects']()[_0x1fabdc(0x605)](_0x2be9d,0x1);},Game_BattlerBase['prototype'][_0x18ba1f(0x4d2)]=function(_0x1099f7){const _0x1afed1=(_0x5f3117,_0x2305f9)=>{const _0x2d6614=_0x243e;if(!_0x2305f9)return _0x5f3117;if(_0x2305f9[_0x2d6614(0xd4)][_0x2d6614(0x163)](VisuMZ[_0x2d6614(0x3ea)][_0x2d6614(0x1a2)][_0x2d6614(0x346)][_0x1099f7])){var _0x5d0e0c=Number(RegExp['$1'])/0x64;_0x5f3117+=_0x5d0e0c;}if(_0x2305f9[_0x2d6614(0xd4)]['match'](VisuMZ['CoreEngine']['RegExp']['sparamFlat2'][_0x1099f7])){var _0x5d0e0c=Number(RegExp['$1']);_0x5f3117+=_0x5d0e0c;}if(_0x2305f9['note'][_0x2d6614(0x163)](VisuMZ[_0x2d6614(0x3ea)][_0x2d6614(0x1a2)][_0x2d6614(0x17c)][_0x1099f7])){var _0x263b92=String(RegExp['$1']);try{_0x5f3117+=eval(_0x263b92);}catch(_0x1590df){if($gameTemp[_0x2d6614(0x3ca)]())console[_0x2d6614(0x50a)](_0x1590df);}}return _0x5f3117;};return this['traitObjects']()['reduce'](_0x1afed1,0x0);},Game_BattlerBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x3a1)]=function(_0x37c27f){const _0x5afb5b=_0x18ba1f;let _0x244a4b='sparam'+_0x37c27f+_0x5afb5b(0x19b);if(this['checkCacheKey'](_0x244a4b))return this[_0x5afb5b(0x599)][_0x244a4b];return this['_cache'][_0x244a4b]=VisuMZ['CoreEngine'][_0x5afb5b(0x493)][_0x5afb5b(0x1ed)][_0x5afb5b(0x269)]['call'](this,_0x37c27f),this['_cache'][_0x244a4b];},Game_BattlerBase['prototype'][_0x18ba1f(0x5b0)]=function(_0x1f6c99,_0x3f1d69){const _0x395f85=_0x18ba1f;if(typeof paramId===_0x395f85(0x129))return this[_0x395f85(0x17a)](_0x1f6c99);_0x1f6c99=String(_0x1f6c99||'')['toUpperCase']();if(_0x1f6c99===_0x395f85(0x631))return this[_0x395f85(0x17a)](0x0);if(_0x1f6c99===_0x395f85(0x21f))return this[_0x395f85(0x17a)](0x1);if(_0x1f6c99===_0x395f85(0x6a9))return this[_0x395f85(0x17a)](0x2);if(_0x1f6c99===_0x395f85(0x2f1))return this[_0x395f85(0x17a)](0x3);if(_0x1f6c99==='MAT')return this['param'](0x4);if(_0x1f6c99===_0x395f85(0x188))return this[_0x395f85(0x17a)](0x5);if(_0x1f6c99===_0x395f85(0x30e))return this['param'](0x6);if(_0x1f6c99===_0x395f85(0x449))return this[_0x395f85(0x17a)](0x7);if(_0x1f6c99===_0x395f85(0x58f))return _0x3f1d69?String(Math[_0x395f85(0x339)](this[_0x395f85(0x5f0)](0x0)*0x64))+'%':this[_0x395f85(0x5f0)](0x0);if(_0x1f6c99===_0x395f85(0x514))return _0x3f1d69?String(Math[_0x395f85(0x339)](this[_0x395f85(0x5f0)](0x1)*0x64))+'%':this[_0x395f85(0x5f0)](0x1);if(_0x1f6c99===_0x395f85(0x639))return _0x3f1d69?String(Math[_0x395f85(0x339)](this[_0x395f85(0x5f0)](0x2)*0x64))+'%':this[_0x395f85(0x5f0)](0x2);if(_0x1f6c99===_0x395f85(0x6b2))return _0x3f1d69?String(Math[_0x395f85(0x339)](this['xparam'](0x3)*0x64))+'%':this['xparam'](0x3);if(_0x1f6c99===_0x395f85(0x58c))return _0x3f1d69?String(Math[_0x395f85(0x339)](this[_0x395f85(0x5f0)](0x4)*0x64))+'%':this[_0x395f85(0x5f0)](0x4);if(_0x1f6c99===_0x395f85(0x4d9))return _0x3f1d69?String(Math[_0x395f85(0x339)](this[_0x395f85(0x5f0)](0x5)*0x64))+'%':this[_0x395f85(0x5f0)](0x5);if(_0x1f6c99===_0x395f85(0x698))return _0x3f1d69?String(Math[_0x395f85(0x339)](this[_0x395f85(0x5f0)](0x6)*0x64))+'%':this['xparam'](0x6);if(_0x1f6c99==='HRG')return _0x3f1d69?String(Math[_0x395f85(0x339)](this[_0x395f85(0x5f0)](0x7)*0x64))+'%':this[_0x395f85(0x5f0)](0x7);if(_0x1f6c99===_0x395f85(0x2e8))return _0x3f1d69?String(Math[_0x395f85(0x339)](this[_0x395f85(0x5f0)](0x8)*0x64))+'%':this[_0x395f85(0x5f0)](0x8);if(_0x1f6c99===_0x395f85(0x3d1))return _0x3f1d69?String(Math['round'](this['xparam'](0x9)*0x64))+'%':this['xparam'](0x9);if(_0x1f6c99===_0x395f85(0x26b))return _0x3f1d69?String(Math[_0x395f85(0x339)](this[_0x395f85(0x3a1)](0x0)*0x64))+'%':this[_0x395f85(0x3a1)](0x0);if(_0x1f6c99===_0x395f85(0x291))return _0x3f1d69?String(Math[_0x395f85(0x339)](this['sparam'](0x1)*0x64))+'%':this[_0x395f85(0x3a1)](0x1);if(_0x1f6c99===_0x395f85(0x3d9))return _0x3f1d69?String(Math['round'](this['sparam'](0x2)*0x64))+'%':this['sparam'](0x2);if(_0x1f6c99===_0x395f85(0x5d7))return _0x3f1d69?String(Math[_0x395f85(0x339)](this['sparam'](0x3)*0x64))+'%':this[_0x395f85(0x3a1)](0x3);if(_0x1f6c99===_0x395f85(0x65d))return _0x3f1d69?String(Math[_0x395f85(0x339)](this[_0x395f85(0x3a1)](0x4)*0x64))+'%':this[_0x395f85(0x3a1)](0x4);if(_0x1f6c99===_0x395f85(0x5df))return _0x3f1d69?String(Math[_0x395f85(0x339)](this[_0x395f85(0x3a1)](0x5)*0x64))+'%':this[_0x395f85(0x3a1)](0x5);if(_0x1f6c99==='PDR')return _0x3f1d69?String(Math[_0x395f85(0x339)](this[_0x395f85(0x3a1)](0x6)*0x64))+'%':this[_0x395f85(0x3a1)](0x6);if(_0x1f6c99===_0x395f85(0x18e))return _0x3f1d69?String(Math[_0x395f85(0x339)](this[_0x395f85(0x3a1)](0x7)*0x64))+'%':this[_0x395f85(0x3a1)](0x7);if(_0x1f6c99===_0x395f85(0x5ee))return _0x3f1d69?String(Math[_0x395f85(0x339)](this[_0x395f85(0x3a1)](0x8)*0x64))+'%':this[_0x395f85(0x3a1)](0x8);if(_0x1f6c99===_0x395f85(0x316))return _0x3f1d69?String(Math['round'](this['sparam'](0x9)*0x64))+'%':this[_0x395f85(0x3a1)](0x9);if(VisuMZ[_0x395f85(0x3ea)][_0x395f85(0x284)][_0x1f6c99]){const _0x2abeb9=VisuMZ[_0x395f85(0x3ea)]['CustomParamAbb'][_0x1f6c99],_0x1810d2=this[_0x2abeb9];return VisuMZ['CoreEngine'][_0x395f85(0x164)][_0x1f6c99]===_0x395f85(0x395)?_0x1810d2:_0x3f1d69?String(Math[_0x395f85(0x339)](_0x1810d2*0x64))+'%':_0x1810d2;}return'';},Game_BattlerBase['prototype'][_0x18ba1f(0x2cc)]=function(){const _0x17569e=_0x18ba1f;return this[_0x17569e(0x484)]()&&this['_hp']<this[_0x17569e(0x53a)]*VisuMZ['CoreEngine'][_0x17569e(0x493)][_0x17569e(0x1ed)][_0x17569e(0x40b)];},Game_Battler['prototype']['performMiss']=function(){const _0x52af7c=_0x18ba1f;SoundManager[_0x52af7c(0x511)](),this[_0x52af7c(0x69e)](_0x52af7c(0x620));},VisuMZ['CoreEngine'][_0x18ba1f(0x15a)]=Game_Actor[_0x18ba1f(0x5e5)]['paramBase'],Game_Actor[_0x18ba1f(0x5e5)]['paramBase']=function(_0xdb0fdb){const _0x5109cd=_0x18ba1f;if(this['level']>0x63)return this[_0x5109cd(0x2be)](_0xdb0fdb);return VisuMZ[_0x5109cd(0x3ea)][_0x5109cd(0x15a)][_0x5109cd(0x2fa)](this,_0xdb0fdb);},Game_Actor[_0x18ba1f(0x5e5)]['paramBaseAboveLevel99']=function(_0x413faf){const _0x780e82=_0x18ba1f,_0x38f7a9=this[_0x780e82(0x266)]()[_0x780e82(0x582)][_0x413faf][0x63],_0xc99b59=this[_0x780e82(0x266)]()[_0x780e82(0x582)][_0x413faf][0x62];return _0x38f7a9+(_0x38f7a9-_0xc99b59)*(this[_0x780e82(0x1b0)]-0x63);},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x1f4)]=Game_Actor[_0x18ba1f(0x5e5)]['changeClass'],Game_Actor[_0x18ba1f(0x5e5)][_0x18ba1f(0x412)]=function(_0x4c17bf,_0x48247d){const _0x19c861=_0x18ba1f;$gameTemp[_0x19c861(0x28d)]=!![],VisuMZ[_0x19c861(0x3ea)][_0x19c861(0x1f4)][_0x19c861(0x2fa)](this,_0x4c17bf,_0x48247d),$gameTemp[_0x19c861(0x28d)]=undefined;},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x1e4)]=Game_Actor[_0x18ba1f(0x5e5)][_0x18ba1f(0x1cc)],Game_Actor['prototype']['levelUp']=function(){const _0x1cecf8=_0x18ba1f;VisuMZ['CoreEngine'][_0x1cecf8(0x1e4)][_0x1cecf8(0x2fa)](this);if(!$gameTemp['_changingClass'])this[_0x1cecf8(0x1e8)]();},Game_Actor['prototype']['levelUpRecovery']=function(){const _0x3c98e2=_0x18ba1f;this['_cache']={};if(VisuMZ['CoreEngine'][_0x3c98e2(0x493)][_0x3c98e2(0x2dd)][_0x3c98e2(0x550)])this[_0x3c98e2(0xd1)]=this['mhp'];if(VisuMZ['CoreEngine'][_0x3c98e2(0x493)][_0x3c98e2(0x2dd)][_0x3c98e2(0x186)])this['_mp']=this['mmp'];},Game_Actor[_0x18ba1f(0x5e5)]['expRate']=function(){const _0x4784f1=_0x18ba1f;if(this[_0x4784f1(0x604)]())return 0x1;const _0x37e848=this[_0x4784f1(0x540)]()-this[_0x4784f1(0x42c)](),_0x1bef8a=this['currentExp']()-this['currentLevelExp']();return(_0x1bef8a/_0x37e848)[_0x4784f1(0x21d)](0x0,0x1);},Game_Actor[_0x18ba1f(0x5e5)][_0x18ba1f(0x174)]=function(){const _0x350ada=_0x18ba1f,_0x2c864f=Game_Battler[_0x350ada(0x5e5)][_0x350ada(0x174)][_0x350ada(0x2fa)](this);for(const _0x1e8c23 of this[_0x350ada(0x4ba)]()){_0x1e8c23&&_0x2c864f[_0x350ada(0x25f)](_0x1e8c23);}return _0x2c864f['push'](this[_0x350ada(0x266)](),this[_0x350ada(0x4c9)]()),_0x2c864f;},Object['defineProperty'](Game_Enemy[_0x18ba1f(0x5e5)],_0x18ba1f(0x1b0),{'get':function(){const _0x3b3505=_0x18ba1f;return this[_0x3b3505(0x353)]();},'configurable':!![]}),Game_Enemy[_0x18ba1f(0x5e5)]['getLevel']=function(){return this['enemy']()['level'];},Game_Enemy[_0x18ba1f(0x5e5)]['moveRelativeToResolutionChange']=function(){const _0x5ddcbd=_0x18ba1f;!this[_0x5ddcbd(0x2a5)]&&(this[_0x5ddcbd(0x3e3)]+=Math['round']((Graphics['height']-0x270)/0x2),this[_0x5ddcbd(0x3e3)]-=Math[_0x5ddcbd(0x602)]((Graphics[_0x5ddcbd(0x13b)]-Graphics[_0x5ddcbd(0x34e)])/0x2),$gameSystem['isSideView']()?this[_0x5ddcbd(0x44e)]-=Math['floor']((Graphics[_0x5ddcbd(0x259)]-Graphics['boxWidth'])/0x2):this['_screenX']+=Math[_0x5ddcbd(0x339)]((Graphics[_0x5ddcbd(0x237)]-0x330)/0x2)),this[_0x5ddcbd(0x2a5)]=!![];},Game_Party[_0x18ba1f(0x5e5)]['maxGold']=function(){const _0x3e7824=_0x18ba1f;return VisuMZ[_0x3e7824(0x3ea)][_0x3e7824(0x493)][_0x3e7824(0x4a6)][_0x3e7824(0x2b9)];},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0xdc)]=Game_Party[_0x18ba1f(0x5e5)][_0x18ba1f(0x2b0)],Game_Party['prototype']['consumeItem']=function(_0x43cff6){const _0xbec3a1=_0x18ba1f;if(VisuMZ[_0xbec3a1(0x3ea)][_0xbec3a1(0x493)][_0xbec3a1(0x2dd)][_0xbec3a1(0x66b)]&&DataManager[_0xbec3a1(0x168)](_0x43cff6))return;VisuMZ['CoreEngine'][_0xbec3a1(0xdc)]['call'](this,_0x43cff6);},Game_Party['prototype'][_0x18ba1f(0x52f)]=function(){const _0x2a5187=_0x18ba1f,_0x548ba5=VisuMZ['CoreEngine'][_0x2a5187(0x493)][_0x2a5187(0x2dd)],_0x55e2d4=_0x548ba5[_0x2a5187(0x3bb)]??0x63;let _0x477787=[];(_0x548ba5[_0x2a5187(0x63c)]??!![])&&(_0x477787=_0x477787[_0x2a5187(0x625)]($dataItems));(_0x548ba5[_0x2a5187(0x66a)]??!![])&&(_0x477787=_0x477787[_0x2a5187(0x625)]($dataWeapons));(_0x548ba5['BTestArmors']??!![])&&(_0x477787=_0x477787['concat']($dataArmors));for(const _0x1e528c of _0x477787){if(!_0x1e528c)continue;if(_0x1e528c[_0x2a5187(0x5e3)]['trim']()<=0x0)continue;if(_0x1e528c[_0x2a5187(0x5e3)][_0x2a5187(0x163)](/-----/i))continue;this[_0x2a5187(0x361)](_0x1e528c,_0x55e2d4);}},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x1e3)]=Game_Troop['prototype']['setup'],Game_Troop[_0x18ba1f(0x5e5)]['setup']=function(_0x247f1e){const _0x4eef6e=_0x18ba1f;$gameTemp[_0x4eef6e(0x371)](),$gameTemp[_0x4eef6e(0x394)](_0x247f1e),VisuMZ[_0x4eef6e(0x3ea)][_0x4eef6e(0x1e3)][_0x4eef6e(0x2fa)](this,_0x247f1e);},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x600)]=Game_Map['prototype'][_0x18ba1f(0x2c7)],Game_Map['prototype'][_0x18ba1f(0x2c7)]=function(_0xf7fa){const _0x1d162f=_0x18ba1f;VisuMZ['CoreEngine'][_0x1d162f(0x600)][_0x1d162f(0x2fa)](this,_0xf7fa),this['setupCoreEngine'](_0xf7fa);},Game_Map[_0x18ba1f(0x5e5)]['setupCoreEngine']=function(){const _0x406292=_0x18ba1f;this['_hideTileShadows']=VisuMZ[_0x406292(0x3ea)]['Settings'][_0x406292(0x2dd)][_0x406292(0x517)]||![];if($dataMap&&$dataMap['note']){if($dataMap['note'][_0x406292(0x163)](/<SHOW TILE SHADOWS>/i))this[_0x406292(0x53b)]=![];if($dataMap[_0x406292(0xd4)][_0x406292(0x163)](/<HIDE TILE SHADOWS>/i))this[_0x406292(0x53b)]=!![];}},Game_Map[_0x18ba1f(0x5e5)][_0x18ba1f(0x3e1)]=function(){if(this['_hideTileShadows']===undefined)this['setupCoreEngine']();return this['_hideTileShadows'];},VisuMZ[_0x18ba1f(0x3ea)]['Game_Character_processMoveCommand']=Game_Character[_0x18ba1f(0x5e5)]['processMoveCommand'],Game_Character[_0x18ba1f(0x5e5)]['processMoveCommand']=function(_0x2abe14){const _0x444baf=_0x18ba1f;try{VisuMZ['CoreEngine'][_0x444baf(0x451)]['call'](this,_0x2abe14);}catch(_0x140d96){if($gameTemp[_0x444baf(0x3ca)]())console['log'](_0x140d96);}},Game_Player[_0x18ba1f(0x5e5)][_0x18ba1f(0x43f)]=function(){const _0x342751=_0x18ba1f,_0x38d315=$gameMap[_0x342751(0x614)]();this['_encounterCount']=Math[_0x342751(0x378)](_0x38d315)+Math[_0x342751(0x378)](_0x38d315)+this[_0x342751(0x1a8)]();},Game_Player[_0x18ba1f(0x5e5)]['encounterStepsMinimum']=function(){const _0x20627a=_0x18ba1f;return $dataMap&&$dataMap[_0x20627a(0xd4)]&&$dataMap[_0x20627a(0xd4)][_0x20627a(0x163)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x20627a(0x3ea)][_0x20627a(0x493)][_0x20627a(0x2dd)]['EncounterRateMinimum'];},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x689)]=Game_Event['prototype'][_0x18ba1f(0x619)],Game_Event[_0x18ba1f(0x5e5)][_0x18ba1f(0x619)]=function(_0x3f3c0f,_0xd289b4){const _0x52e14f=_0x18ba1f;return this[_0x52e14f(0x396)]()?this[_0x52e14f(0x4df)](_0x3f3c0f,_0xd289b4):VisuMZ[_0x52e14f(0x3ea)]['Game_Event_isCollidedWithEvents'][_0x52e14f(0x2fa)](this,_0x3f3c0f,_0xd289b4);},Game_Event[_0x18ba1f(0x5e5)][_0x18ba1f(0x396)]=function(){const _0x222690=_0x18ba1f;return VisuMZ['CoreEngine']['Settings'][_0x222690(0x2dd)][_0x222690(0x2eb)];},Game_Event[_0x18ba1f(0x5e5)][_0x18ba1f(0x4df)]=function(_0x450f07,_0x53bcae){const _0x2404ce=_0x18ba1f;if(!this[_0x2404ce(0x592)]())return![];else{const _0xb9f904=$gameMap[_0x2404ce(0x643)](_0x450f07,_0x53bcae)[_0x2404ce(0x3bf)](_0x31ed49=>_0x31ed49['isNormalPriority']());return _0xb9f904[_0x2404ce(0x397)]>0x0;}},VisuMZ['CoreEngine'][_0x18ba1f(0x5ed)]=Game_Interpreter[_0x18ba1f(0x5e5)]['command105'],Game_Interpreter[_0x18ba1f(0x5e5)][_0x18ba1f(0x32f)]=function(_0x4d7b8a){const _0x12a15c=_0x18ba1f,_0x3e330c=this[_0x12a15c(0x12b)]();return _0x3e330c['match'](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x12a15c(0x5e4)](_0x3e330c):VisuMZ[_0x12a15c(0x3ea)][_0x12a15c(0x5ed)]['call'](this,_0x4d7b8a);},Game_Interpreter[_0x18ba1f(0x5e5)][_0x18ba1f(0x12b)]=function(){const _0x160fbb=_0x18ba1f;let _0x230a4d='',_0x559539=this[_0x160fbb(0x6ac)]+0x1;while(this[_0x160fbb(0xe7)][_0x559539]&&this[_0x160fbb(0xe7)][_0x559539]['code']===0x195){_0x230a4d+=this[_0x160fbb(0xe7)][_0x559539][_0x160fbb(0x4f1)][0x0]+'\x0a',_0x559539++;}return _0x230a4d;},Game_Interpreter[_0x18ba1f(0x5e5)]['runCombinedScrollingTextAsCode']=function(_0x4c74f0){const _0x28b631=_0x18ba1f;try{eval(_0x4c74f0);}catch(_0x1564ab){$gameTemp[_0x28b631(0x3ca)]()&&(console[_0x28b631(0x50a)](_0x28b631(0x253)),console[_0x28b631(0x50a)](_0x1564ab));}return!![];},VisuMZ[_0x18ba1f(0x3ea)]['Game_Interpreter_command111']=Game_Interpreter[_0x18ba1f(0x5e5)][_0x18ba1f(0x30f)],Game_Interpreter[_0x18ba1f(0x5e5)][_0x18ba1f(0x30f)]=function(_0x19edcd){const _0x3cb601=_0x18ba1f;try{VisuMZ[_0x3cb601(0x3ea)][_0x3cb601(0x330)][_0x3cb601(0x2fa)](this,_0x19edcd);}catch(_0x1c8d33){$gameTemp[_0x3cb601(0x3ca)]()&&(console[_0x3cb601(0x50a)]('Conditional\x20Branch\x20Script\x20Error'),console[_0x3cb601(0x50a)](_0x1c8d33)),this[_0x3cb601(0x430)]();}return!![];},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x427)]=Game_Interpreter[_0x18ba1f(0x5e5)][_0x18ba1f(0x694)],Game_Interpreter[_0x18ba1f(0x5e5)][_0x18ba1f(0x694)]=function(_0x4d21a8){const _0x35aece=_0x18ba1f;try{VisuMZ[_0x35aece(0x3ea)][_0x35aece(0x427)][_0x35aece(0x2fa)](this,_0x4d21a8);}catch(_0x518e95){$gameTemp[_0x35aece(0x3ca)]()&&(console[_0x35aece(0x50a)](_0x35aece(0x4a3)),console[_0x35aece(0x50a)](_0x518e95));}return!![];},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x298)]=Game_Interpreter[_0x18ba1f(0x5e5)][_0x18ba1f(0x1ba)],Game_Interpreter[_0x18ba1f(0x5e5)]['command355']=function(){const _0x158edf=_0x18ba1f;try{VisuMZ[_0x158edf(0x3ea)][_0x158edf(0x298)][_0x158edf(0x2fa)](this);}catch(_0x2d8c77){$gameTemp['isPlaytest']()&&(console['log'](_0x158edf(0x13d)),console[_0x158edf(0x50a)](_0x2d8c77));}return!![];},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x60a)]=Game_Interpreter[_0x18ba1f(0x5e5)][_0x18ba1f(0x545)],Game_Interpreter[_0x18ba1f(0x5e5)][_0x18ba1f(0x545)]=function(_0x2bd595){const _0x3f7a86=_0x18ba1f;return $gameTemp[_0x3f7a86(0x22d)](this),VisuMZ[_0x3f7a86(0x3ea)][_0x3f7a86(0x60a)]['call'](this,_0x2bd595);},Scene_Base[_0x18ba1f(0x5e5)]['fadeSpeed']=function(){const _0x47a0b1=_0x18ba1f;return VisuMZ['CoreEngine'][_0x47a0b1(0x493)]['UI'][_0x47a0b1(0x2e9)];},Scene_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x1ec)]=function(){const _0x1d0a67=_0x18ba1f;return VisuMZ[_0x1d0a67(0x3ea)][_0x1d0a67(0x493)]['UI']['BottomHelp'];},Scene_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x2f2)]=function(){const _0x1080df=_0x18ba1f;return VisuMZ[_0x1080df(0x3ea)][_0x1080df(0x493)]['UI'][_0x1080df(0x61b)];},Scene_Base['prototype'][_0x18ba1f(0x2e0)]=function(){const _0x3f0cfa=_0x18ba1f;return VisuMZ[_0x3f0cfa(0x3ea)][_0x3f0cfa(0x493)]['UI'][_0x3f0cfa(0x273)];},Scene_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x260)]=function(){const _0x38328e=_0x18ba1f;return VisuMZ[_0x38328e(0x3ea)][_0x38328e(0x493)]['UI']['CommandWidth'];},Scene_Base[_0x18ba1f(0x5e5)]['buttonAreaHeight']=function(){const _0x4e8f88=_0x18ba1f;return VisuMZ[_0x4e8f88(0x3ea)][_0x4e8f88(0x493)]['UI'][_0x4e8f88(0x611)];},Scene_Base[_0x18ba1f(0x5e5)]['isWindowMaskingEnabled']=function(){const _0x5f3d9c=_0x18ba1f;return VisuMZ['CoreEngine'][_0x5f3d9c(0x493)]['Window'][_0x5f3d9c(0x2a9)];},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x1f3)]=Scene_Base['prototype'][_0x18ba1f(0x607)],Scene_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x607)]=function(){const _0x4289cd=_0x18ba1f;VisuMZ[_0x4289cd(0x3ea)]['Scene_Base_createWindowLayer'][_0x4289cd(0x2fa)](this),this[_0x4289cd(0x38c)](),this[_0x4289cd(0x632)]['x']=Math[_0x4289cd(0x339)](this[_0x4289cd(0x632)]['x']),this['_windowLayer']['y']=Math[_0x4289cd(0x339)](this[_0x4289cd(0x632)]['y']);},Scene_Base[_0x18ba1f(0x5e5)]['createButtonAssistWindow']=function(){},Scene_Base['prototype']['buttonAssistKey1']=function(){const _0x2476fb=_0x18ba1f;return TextManager['getInputMultiButtonStrings']('pageup',_0x2476fb(0x403));},Scene_Base[_0x18ba1f(0x5e5)]['buttonAssistKey2']=function(){const _0xdaf6dd=_0x18ba1f;return TextManager[_0xdaf6dd(0x579)](_0xdaf6dd(0x2a3));},Scene_Base[_0x18ba1f(0x5e5)]['buttonAssistKey3']=function(){const _0x159f48=_0x18ba1f;return TextManager['getInputButtonString'](_0x159f48(0x2d8));},Scene_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x5fc)]=function(){return TextManager['getInputButtonString']('ok');},Scene_Base['prototype']['buttonAssistKey5']=function(){const _0x1692e0=_0x18ba1f;return TextManager[_0x1692e0(0x579)](_0x1692e0(0x42b));},Scene_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x2ef)]=function(){const _0x5d454a=_0x18ba1f;return this[_0x5d454a(0x410)]&&this[_0x5d454a(0x410)][_0x5d454a(0x30b)]?TextManager[_0x5d454a(0x149)]:'';},Scene_Base[_0x18ba1f(0x5e5)]['buttonAssistText2']=function(){return'';},Scene_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x439)]=function(){return'';},Scene_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x670)]=function(){const _0xeaf0bd=_0x18ba1f;return TextManager[_0xeaf0bd(0x211)];},Scene_Base[_0x18ba1f(0x5e5)]['buttonAssistText5']=function(){const _0x21dd77=_0x18ba1f;return TextManager[_0x21dd77(0x2c1)];},Scene_Base['prototype']['buttonAssistOffset1']=function(){return 0x0;},Scene_Base[_0x18ba1f(0x5e5)]['buttonAssistOffset2']=function(){return 0x0;},Scene_Base[_0x18ba1f(0x5e5)]['buttonAssistOffset3']=function(){return 0x0;},Scene_Base['prototype'][_0x18ba1f(0x355)]=function(){return 0x0;},Scene_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x370)]=function(){return 0x0;},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x103)]=Scene_Boot[_0x18ba1f(0x5e5)][_0x18ba1f(0x429)],Scene_Boot[_0x18ba1f(0x5e5)][_0x18ba1f(0x429)]=function(){VisuMZ['CoreEngine']['Scene_Boot_loadSystemImages']['call'](this),this['loadGameImagesCoreEngine']();},Scene_Boot[_0x18ba1f(0x5e5)][_0x18ba1f(0x672)]=function(){const _0x5376ed=_0x18ba1f,_0x21e091=[_0x5376ed(0x159),_0x5376ed(0x33e),_0x5376ed(0x380),_0x5376ed(0x505),_0x5376ed(0x1a9),_0x5376ed(0x662),'parallaxes',_0x5376ed(0x472),'sv_actors','sv_enemies',_0x5376ed(0x683),_0x5376ed(0x1fe),_0x5376ed(0x679),_0x5376ed(0x29f)];for(const _0x1bd332 of _0x21e091){const _0x314f88=VisuMZ[_0x5376ed(0x3ea)]['Settings']['ImgLoad'][_0x1bd332],_0x11fda1='img/%1/'[_0x5376ed(0x400)](_0x1bd332);for(const _0x56713a of _0x314f88){ImageManager[_0x5376ed(0x29c)](_0x11fda1,_0x56713a);}}},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x6ad)]=Scene_Boot['prototype'][_0x18ba1f(0x33b)],Scene_Boot[_0x18ba1f(0x5e5)][_0x18ba1f(0x33b)]=function(){const _0x439341=_0x18ba1f;Utils['isOptionValid'](_0x439341(0x454))&&VisuMZ[_0x439341(0x3ea)][_0x439341(0x493)][_0x439341(0x2dd)]['NewGameBoot']?this[_0x439341(0x1f5)]():VisuMZ['CoreEngine']['Scene_Boot_startNormalGame'][_0x439341(0x2fa)](this);},Scene_Boot['prototype'][_0x18ba1f(0x1f5)]=function(){const _0x21646e=_0x18ba1f;DataManager[_0x21646e(0x477)](),SceneManager['goto'](Scene_Map);},Scene_Boot['prototype'][_0x18ba1f(0x53e)]=function(){const _0xb417b5=_0x18ba1f,_0x1ee4b2=$dataSystem['advanced']['uiAreaWidth'],_0x51cf9b=$dataSystem['advanced'][_0xb417b5(0x4f5)],_0x4831ce=VisuMZ['CoreEngine'][_0xb417b5(0x493)]['UI']['BoxMargin'];Graphics[_0xb417b5(0x237)]=_0x1ee4b2-_0x4831ce*0x2,Graphics['boxHeight']=_0x51cf9b-_0x4831ce*0x2,this[_0xb417b5(0x3c3)]();},VisuMZ['CoreEngine'][_0x18ba1f(0x2b5)]=Scene_Boot[_0x18ba1f(0x5e5)]['updateDocumentTitle'],Scene_Boot[_0x18ba1f(0x5e5)][_0x18ba1f(0x606)]=function(){const _0x1b9d59=_0x18ba1f;this[_0x1b9d59(0x3dc)]()?this[_0x1b9d59(0x130)]():VisuMZ[_0x1b9d59(0x3ea)][_0x1b9d59(0x2b5)][_0x1b9d59(0x2fa)](this);},Scene_Boot[_0x18ba1f(0x5e5)][_0x18ba1f(0x3dc)]=function(){const _0x2f6931=_0x18ba1f;if(Scene_Title[_0x2f6931(0x460)]==='')return![];if(Scene_Title[_0x2f6931(0x460)]===_0x2f6931(0x67a))return![];if(Scene_Title[_0x2f6931(0x21c)]==='')return![];if(Scene_Title[_0x2f6931(0x21c)]===_0x2f6931(0x2f3))return![];return!![];},Scene_Boot[_0x18ba1f(0x5e5)][_0x18ba1f(0x130)]=function(){const _0x4015b8=_0x18ba1f,_0x462280=$dataSystem[_0x4015b8(0x645)],_0x30c4a1=Scene_Title[_0x4015b8(0x460)]||'',_0x6560d9=Scene_Title[_0x4015b8(0x21c)]||'',_0x3b08de=VisuMZ[_0x4015b8(0x3ea)][_0x4015b8(0x493)][_0x4015b8(0x55b)][_0x4015b8(0x55d)][_0x4015b8(0x1d0)],_0x2eb1cd=_0x3b08de[_0x4015b8(0x400)](_0x462280,_0x30c4a1,_0x6560d9);document['title']=_0x2eb1cd;},Scene_Boot[_0x18ba1f(0x5e5)]['determineSideButtonLayoutValid']=function(){const _0x1654e1=_0x18ba1f;if(VisuMZ[_0x1654e1(0x3ea)][_0x1654e1(0x493)]['UI']['SideButtons']){const _0x8f5666=Graphics[_0x1654e1(0x259)]-Graphics['boxWidth']-VisuMZ['CoreEngine'][_0x1654e1(0x493)]['UI'][_0x1654e1(0x1df)]*0x2,_0x45db72=Sprite_Button[_0x1654e1(0x5e5)][_0x1654e1(0x1c7)]['call'](this)*0x4;if(_0x8f5666>=_0x45db72)SceneManager[_0x1654e1(0x432)](!![]);}},Scene_Title[_0x18ba1f(0x460)]=VisuMZ['CoreEngine'][_0x18ba1f(0x493)][_0x18ba1f(0x55b)]['Title'][_0x18ba1f(0x67a)],Scene_Title[_0x18ba1f(0x21c)]=VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x493)][_0x18ba1f(0x55b)][_0x18ba1f(0x55d)]['Version'],Scene_Title[_0x18ba1f(0x3ed)]=VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x493)][_0x18ba1f(0x4db)],VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x421)]=Scene_Title[_0x18ba1f(0x5e5)][_0x18ba1f(0x2dc)],Scene_Title[_0x18ba1f(0x5e5)]['drawGameTitle']=function(){const _0x54e0b3=_0x18ba1f;VisuMZ[_0x54e0b3(0x3ea)][_0x54e0b3(0x493)][_0x54e0b3(0x55b)][_0x54e0b3(0x55d)][_0x54e0b3(0x2dc)][_0x54e0b3(0x2fa)](this);if(Scene_Title[_0x54e0b3(0x460)]!==''&&Scene_Title[_0x54e0b3(0x460)]!=='Subtitle')this['drawGameSubtitle']();if(Scene_Title[_0x54e0b3(0x21c)]!==''&&Scene_Title[_0x54e0b3(0x21c)]!==_0x54e0b3(0x2f3))this[_0x54e0b3(0x1ae)]();},Scene_Title[_0x18ba1f(0x5e5)][_0x18ba1f(0xdf)]=function(){const _0x293b80=_0x18ba1f;VisuMZ['CoreEngine'][_0x293b80(0x493)][_0x293b80(0x55b)][_0x293b80(0x55d)][_0x293b80(0xdf)]['call'](this);},Scene_Title[_0x18ba1f(0x5e5)]['drawGameVersion']=function(){const _0x580a72=_0x18ba1f;VisuMZ[_0x580a72(0x3ea)]['Settings']['MenuLayout'][_0x580a72(0x55d)]['drawGameVersion'][_0x580a72(0x2fa)](this);},Scene_Title[_0x18ba1f(0x5e5)][_0x18ba1f(0x475)]=function(){const _0x940ccb=_0x18ba1f;this[_0x940ccb(0x601)]();const _0x2376e5=$dataSystem[_0x940ccb(0x5dc)][_0x940ccb(0x67c)],_0x3d7386=this[_0x940ccb(0x4be)]();this[_0x940ccb(0x4c6)]=new Window_TitleCommand(_0x3d7386),this[_0x940ccb(0x4c6)][_0x940ccb(0x28e)](_0x2376e5);const _0x155ea3=this[_0x940ccb(0x4be)]();this[_0x940ccb(0x4c6)]['move'](_0x155ea3['x'],_0x155ea3['y'],_0x155ea3[_0x940ccb(0x259)],_0x155ea3[_0x940ccb(0x13b)]),this[_0x940ccb(0x3cc)](this[_0x940ccb(0x4c6)]);},Scene_Title[_0x18ba1f(0x5e5)][_0x18ba1f(0x68a)]=function(){const _0x595e70=_0x18ba1f;return this[_0x595e70(0x4c6)]?this[_0x595e70(0x4c6)][_0x595e70(0x62c)]():VisuMZ[_0x595e70(0x3ea)][_0x595e70(0x493)][_0x595e70(0x16a)][_0x595e70(0x397)];},Scene_Title['prototype'][_0x18ba1f(0x4be)]=function(){const _0x5f5af1=_0x18ba1f;return VisuMZ['CoreEngine']['Settings'][_0x5f5af1(0x55b)][_0x5f5af1(0x55d)][_0x5f5af1(0x123)][_0x5f5af1(0x2fa)](this);},Scene_Title[_0x18ba1f(0x5e5)][_0x18ba1f(0x601)]=function(){const _0x234c02=_0x18ba1f;for(const _0x148ea9 of Scene_Title[_0x234c02(0x3ed)]){const _0x10522d=new Sprite_TitlePictureButton(_0x148ea9);this[_0x234c02(0x608)](_0x10522d);}},VisuMZ['CoreEngine'][_0x18ba1f(0x41d)]=Scene_Map[_0x18ba1f(0x5e5)][_0x18ba1f(0x117)],Scene_Map[_0x18ba1f(0x5e5)][_0x18ba1f(0x117)]=function(){const _0xc7a243=_0x18ba1f;VisuMZ['CoreEngine'][_0xc7a243(0x41d)][_0xc7a243(0x2fa)](this),$gameTemp['clearForcedGameTroopSettingsCoreEngine']();},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x1c3)]=Scene_Map[_0x18ba1f(0x5e5)][_0x18ba1f(0x230)],Scene_Map['prototype'][_0x18ba1f(0x230)]=function(){const _0x2604ec=_0x18ba1f;VisuMZ[_0x2604ec(0x3ea)]['Scene_Map_updateMainMultiply'][_0x2604ec(0x2fa)](this),$gameTemp[_0x2604ec(0x5fe)]&&!$gameMessage['isBusy']()&&(this[_0x2604ec(0x473)](),SceneManager[_0x2604ec(0x152)]());},Scene_Map[_0x18ba1f(0x5e5)]['terminate']=function(){const _0xe92eff=_0x18ba1f;Scene_Message[_0xe92eff(0x5e5)][_0xe92eff(0x22c)][_0xe92eff(0x2fa)](this),!SceneManager['isNextScene'](Scene_Battle)&&(this['_spriteset'][_0xe92eff(0x285)](),this[_0xe92eff(0x489)][_0xe92eff(0x5ef)](),this['_windowLayer'][_0xe92eff(0x30b)]=![],SceneManager[_0xe92eff(0x69f)]()),$gameScreen[_0xe92eff(0x286)]();},VisuMZ[_0x18ba1f(0x3ea)]['Scene_Map_createMenuButton']=Scene_Map['prototype'][_0x18ba1f(0x633)],Scene_Map[_0x18ba1f(0x5e5)]['createMenuButton']=function(){const _0x2ee851=_0x18ba1f;VisuMZ[_0x2ee851(0x3ea)]['Scene_Map_createMenuButton']['call'](this),SceneManager[_0x2ee851(0x64a)]()&&this[_0x2ee851(0x28c)]();},Scene_Map[_0x18ba1f(0x5e5)][_0x18ba1f(0x28c)]=function(){const _0x317818=_0x18ba1f;this[_0x317818(0x404)]['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x289)]=Scene_Map['prototype']['updateScene'],Scene_Map[_0x18ba1f(0x5e5)][_0x18ba1f(0xed)]=function(){const _0x52e436=_0x18ba1f;VisuMZ['CoreEngine'][_0x52e436(0x289)][_0x52e436(0x2fa)](this),this['updateDashToggle']();},Scene_Map['prototype']['updateDashToggle']=function(){const _0x4bf21f=_0x18ba1f;Input[_0x4bf21f(0x1e6)](_0x4bf21f(0x3ef))&&(ConfigManager[_0x4bf21f(0x4dc)]=!ConfigManager[_0x4bf21f(0x4dc)],ConfigManager[_0x4bf21f(0x68b)]());},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x5a2)]=Scene_MenuBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x40a)],Scene_MenuBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x40a)]=function(){const _0x4c8848=_0x18ba1f;let _0x457a5c=0x0;return SceneManager[_0x4c8848(0x2df)]()?_0x457a5c=this[_0x4c8848(0x644)]():_0x457a5c=VisuMZ[_0x4c8848(0x3ea)][_0x4c8848(0x5a2)]['call'](this),this[_0x4c8848(0x5a4)]()&&this[_0x4c8848(0x5da)]()===_0x4c8848(0x63e)&&(_0x457a5c+=Window_ButtonAssist['prototype']['lineHeight']()),_0x457a5c;},Scene_MenuBase[_0x18ba1f(0x5e5)]['helpAreaTopSideButtonLayout']=function(){const _0x256d35=_0x18ba1f;return this[_0x256d35(0x1ec)]()?this['mainAreaBottom']():0x0;},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x48b)]=Scene_MenuBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x476)],Scene_MenuBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x476)]=function(){const _0x55d6c6=_0x18ba1f;return SceneManager['areButtonsOutsideMainUI']()?this[_0x55d6c6(0x556)]():VisuMZ[_0x55d6c6(0x3ea)][_0x55d6c6(0x48b)]['call'](this);},Scene_MenuBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x556)]=function(){const _0x5076a7=_0x18ba1f;return!this[_0x5076a7(0x1ec)]()?this[_0x5076a7(0x65a)]():0x0;},VisuMZ['CoreEngine'][_0x18ba1f(0x2e6)]=Scene_MenuBase[_0x18ba1f(0x5e5)]['mainAreaHeight'],Scene_MenuBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x14c)]=function(){const _0x625dc2=_0x18ba1f;let _0x5379cb=0x0;return SceneManager[_0x625dc2(0x2df)]()?_0x5379cb=this[_0x625dc2(0x641)]():_0x5379cb=VisuMZ[_0x625dc2(0x3ea)][_0x625dc2(0x2e6)]['call'](this),this[_0x625dc2(0x5a4)]()&&this[_0x625dc2(0x5da)]()!==_0x625dc2(0x459)&&(_0x5379cb-=Window_ButtonAssist[_0x625dc2(0x5e5)][_0x625dc2(0x5f7)]()),_0x5379cb;},Scene_MenuBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x641)]=function(){const _0x366869=_0x18ba1f;return Graphics[_0x366869(0x34e)]-this[_0x366869(0x1f1)]();},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x3e2)]=Scene_MenuBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x596)],Scene_MenuBase[_0x18ba1f(0x5e5)]['createBackground']=function(){const _0x48521e=_0x18ba1f;this[_0x48521e(0x51d)]=new PIXI[(_0x48521e(0x3e8))]['BlurFilter'](clamp=!![]),this[_0x48521e(0x6b1)]=new Sprite(),this[_0x48521e(0x6b1)][_0x48521e(0x369)]=SceneManager['backgroundBitmap'](),this[_0x48521e(0x6b1)][_0x48521e(0x3e8)]=[this['_backgroundFilter']],this[_0x48521e(0x608)](this[_0x48521e(0x6b1)]),this[_0x48521e(0x570)](0xc0),this[_0x48521e(0x570)](this['getBackgroundOpacity']()),this[_0x48521e(0x31f)]();},Scene_MenuBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x40f)]=function(){const _0x3befce=_0x18ba1f,_0x229a1a=String(this[_0x3befce(0x288)][_0x3befce(0x5e3)]),_0x20ff54=this[_0x3befce(0x31c)](_0x229a1a);return _0x20ff54?_0x20ff54[_0x3befce(0x4e5)]:0xc0;},Scene_MenuBase[_0x18ba1f(0x5e5)]['createCustomBackgroundImages']=function(){const _0x1a7acd=_0x18ba1f,_0x513e5f=String(this['constructor'][_0x1a7acd(0x5e3)]),_0x2d5957=this['getCustomBackgroundSettings'](_0x513e5f);_0x2d5957&&(_0x2d5957[_0x1a7acd(0x67f)]!==''||_0x2d5957[_0x1a7acd(0x507)]!=='')&&(this[_0x1a7acd(0x4b1)]=new Sprite(ImageManager[_0x1a7acd(0x3c6)](_0x2d5957['BgFilename1'])),this['_backSprite2']=new Sprite(ImageManager[_0x1a7acd(0x22a)](_0x2d5957[_0x1a7acd(0x507)])),this[_0x1a7acd(0x608)](this[_0x1a7acd(0x4b1)]),this['addChild'](this[_0x1a7acd(0x35b)]),this[_0x1a7acd(0x4b1)][_0x1a7acd(0x369)][_0x1a7acd(0x30d)](this[_0x1a7acd(0x311)][_0x1a7acd(0x106)](this,this[_0x1a7acd(0x4b1)])),this[_0x1a7acd(0x35b)][_0x1a7acd(0x369)]['addLoadListener'](this[_0x1a7acd(0x311)]['bind'](this,this[_0x1a7acd(0x35b)])));},Scene_MenuBase['prototype'][_0x18ba1f(0x31c)]=function(_0x3ab99f){const _0x19ff80=_0x18ba1f;return VisuMZ['CoreEngine'][_0x19ff80(0x493)]['MenuBg'][_0x3ab99f]||VisuMZ[_0x19ff80(0x3ea)][_0x19ff80(0x493)][_0x19ff80(0x321)][_0x19ff80(0x3d6)];},Scene_MenuBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x311)]=function(_0x2b1bf){const _0x265ac6=_0x18ba1f;this[_0x265ac6(0x41f)](_0x2b1bf),this[_0x265ac6(0x4f8)](_0x2b1bf);},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x45f)]=Scene_MenuBase[_0x18ba1f(0x5e5)]['createCancelButton'],Scene_MenuBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x10f)]=function(){const _0x22fcdc=_0x18ba1f;VisuMZ['CoreEngine'][_0x22fcdc(0x45f)][_0x22fcdc(0x2fa)](this),SceneManager[_0x22fcdc(0x64a)]()&&this[_0x22fcdc(0x2b4)]();},Scene_MenuBase['prototype']['moveCancelButtonSideButtonLayout']=function(){const _0x16d732=_0x18ba1f;this['_cancelButton']['x']=Graphics[_0x16d732(0x237)]+0x4;},VisuMZ[_0x18ba1f(0x3ea)]['Scene_MenuBase_createPageButtons']=Scene_MenuBase[_0x18ba1f(0x5e5)]['createPageButtons'],Scene_MenuBase['prototype'][_0x18ba1f(0x62b)]=function(){VisuMZ['CoreEngine']['Scene_MenuBase_createPageButtons']['call'](this),SceneManager['isSideButtonLayout']()&&this['movePageButtonSideButtonLayout']();},Scene_MenuBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x3a5)]=function(){const _0x48f656=_0x18ba1f;this['_pageupButton']['x']=-0x1*(this[_0x48f656(0x410)][_0x48f656(0x259)]+this[_0x48f656(0x10d)][_0x48f656(0x259)]+0x8),this[_0x48f656(0x10d)]['x']=-0x1*(this[_0x48f656(0x10d)][_0x48f656(0x259)]+0x4);},Scene_MenuBase[_0x18ba1f(0x5e5)]['isMenuButtonAssistEnabled']=function(){const _0x262dc4=_0x18ba1f;return VisuMZ[_0x262dc4(0x3ea)][_0x262dc4(0x493)][_0x262dc4(0x32e)][_0x262dc4(0x233)];},Scene_MenuBase['prototype'][_0x18ba1f(0x5da)]=function(){const _0x4750ba=_0x18ba1f;return SceneManager[_0x4750ba(0x64a)]()||SceneManager['areButtonsHidden']()?VisuMZ[_0x4750ba(0x3ea)][_0x4750ba(0x493)][_0x4750ba(0x32e)]['Location']:'button';},Scene_MenuBase['prototype'][_0x18ba1f(0x38c)]=function(){const _0x48c23d=_0x18ba1f;if(!this[_0x48c23d(0x5a4)]())return;const _0x421332=this[_0x48c23d(0x3b1)]();this['_buttonAssistWindow']=new Window_ButtonAssist(_0x421332),this[_0x48c23d(0x3cc)](this['_buttonAssistWindow']);},Scene_MenuBase['prototype'][_0x18ba1f(0x3b1)]=function(){const _0x5be15b=_0x18ba1f;return this['getButtonAssistLocation']()===_0x5be15b(0x459)?this[_0x5be15b(0x1ab)]():this['buttonAssistWindowSideRect']();},Scene_MenuBase['prototype'][_0x18ba1f(0x1ab)]=function(){const _0x9fb181=_0x18ba1f,_0x47f8a7=ConfigManager[_0x9fb181(0x382)]?(Sprite_Button[_0x9fb181(0x5e5)]['blockWidth']()+0x6)*0x2:0x0,_0x33f56c=this[_0x9fb181(0x44c)](),_0x5499a9=Graphics[_0x9fb181(0x237)]-_0x47f8a7*0x2,_0x28a055=this['buttonAreaHeight']();return new Rectangle(_0x47f8a7,_0x33f56c,_0x5499a9,_0x28a055);},Scene_MenuBase['prototype'][_0x18ba1f(0x6a0)]=function(){const _0x1648ec=_0x18ba1f,_0x44fbb8=Graphics[_0x1648ec(0x237)],_0x418129=Window_ButtonAssist['prototype'][_0x1648ec(0x5f7)](),_0x48c4af=0x0;let _0x306c58=0x0;return this[_0x1648ec(0x5da)]()==='top'?_0x306c58=0x0:_0x306c58=Graphics[_0x1648ec(0x34e)]-_0x418129,new Rectangle(_0x48c4af,_0x306c58,_0x44fbb8,_0x418129);},Scene_Menu[_0x18ba1f(0x1f8)]=VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x493)]['MenuLayout'][_0x18ba1f(0x60c)],VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x191)]=Scene_Menu['prototype'][_0x18ba1f(0x1e9)],Scene_Menu[_0x18ba1f(0x5e5)][_0x18ba1f(0x1e9)]=function(){const _0x564d97=_0x18ba1f;VisuMZ[_0x564d97(0x3ea)]['Scene_Menu_create'][_0x564d97(0x2fa)](this),this[_0x564d97(0x44f)]();},Scene_Menu[_0x18ba1f(0x5e5)][_0x18ba1f(0x44f)]=function(){const _0x44ead9=_0x18ba1f;this[_0x44ead9(0x4c6)]&&this[_0x44ead9(0x4c6)][_0x44ead9(0x28e)](Scene_Menu[_0x44ead9(0x1f8)][_0x44ead9(0x603)]),this[_0x44ead9(0x4a5)]&&this['_goldWindow'][_0x44ead9(0x28e)](Scene_Menu[_0x44ead9(0x1f8)]['GoldBgType']),this[_0x44ead9(0x375)]&&this['_statusWindow'][_0x44ead9(0x28e)](Scene_Menu['layoutSettings'][_0x44ead9(0x510)]);},Scene_Menu[_0x18ba1f(0x5e5)]['commandWindowRect']=function(){const _0x50209c=_0x18ba1f;return Scene_Menu[_0x50209c(0x1f8)][_0x50209c(0x123)][_0x50209c(0x2fa)](this);},Scene_Menu[_0x18ba1f(0x5e5)][_0x18ba1f(0x2af)]=function(){const _0x9f1380=_0x18ba1f;return Scene_Menu[_0x9f1380(0x1f8)][_0x9f1380(0x401)][_0x9f1380(0x2fa)](this);},Scene_Menu[_0x18ba1f(0x5e5)][_0x18ba1f(0x684)]=function(){const _0xbbfa2e=_0x18ba1f;return Scene_Menu[_0xbbfa2e(0x1f8)][_0xbbfa2e(0x23e)][_0xbbfa2e(0x2fa)](this);},Scene_Item[_0x18ba1f(0x1f8)]=VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x493)][_0x18ba1f(0x55b)]['ItemMenu'],VisuMZ['CoreEngine'][_0x18ba1f(0x26d)]=Scene_Item['prototype']['create'],Scene_Item['prototype']['create']=function(){const _0x2ab28c=_0x18ba1f;VisuMZ[_0x2ab28c(0x3ea)][_0x2ab28c(0x26d)][_0x2ab28c(0x2fa)](this),this[_0x2ab28c(0x44f)]();},Scene_Item['prototype'][_0x18ba1f(0x44f)]=function(){const _0x31b26f=_0x18ba1f;this['_helpWindow']&&this[_0x31b26f(0x3c9)]['setBackgroundType'](Scene_Item['layoutSettings']['HelpBgType']),this[_0x31b26f(0x306)]&&this['_categoryWindow'][_0x31b26f(0x28e)](Scene_Item['layoutSettings'][_0x31b26f(0x2c0)]),this['_itemWindow']&&this['_itemWindow'][_0x31b26f(0x28e)](Scene_Item[_0x31b26f(0x1f8)]['ItemBgType']),this[_0x31b26f(0x30a)]&&this[_0x31b26f(0x30a)][_0x31b26f(0x28e)](Scene_Item[_0x31b26f(0x1f8)][_0x31b26f(0x45c)]);},Scene_Item[_0x18ba1f(0x5e5)][_0x18ba1f(0x4cd)]=function(){const _0x379402=_0x18ba1f;return Scene_Item[_0x379402(0x1f8)][_0x379402(0x1bd)]['call'](this);},Scene_Item[_0x18ba1f(0x5e5)]['categoryWindowRect']=function(){const _0x403816=_0x18ba1f;return Scene_Item[_0x403816(0x1f8)][_0x403816(0x43d)][_0x403816(0x2fa)](this);},Scene_Item[_0x18ba1f(0x5e5)][_0x18ba1f(0x1cb)]=function(){const _0x49b810=_0x18ba1f;return Scene_Item[_0x49b810(0x1f8)][_0x49b810(0x48d)][_0x49b810(0x2fa)](this);},Scene_Item['prototype'][_0x18ba1f(0x19c)]=function(){const _0xeb2727=_0x18ba1f;return Scene_Item[_0xeb2727(0x1f8)][_0xeb2727(0x349)][_0xeb2727(0x2fa)](this);},Scene_Skill[_0x18ba1f(0x1f8)]=VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x493)][_0x18ba1f(0x55b)][_0x18ba1f(0x390)],VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x162)]=Scene_Skill[_0x18ba1f(0x5e5)]['create'],Scene_Skill[_0x18ba1f(0x5e5)][_0x18ba1f(0x1e9)]=function(){const _0x43a521=_0x18ba1f;VisuMZ[_0x43a521(0x3ea)][_0x43a521(0x162)][_0x43a521(0x2fa)](this),this[_0x43a521(0x44f)]();},Scene_Skill[_0x18ba1f(0x5e5)][_0x18ba1f(0x44f)]=function(){const _0x5aeb24=_0x18ba1f;this[_0x5aeb24(0x3c9)]&&this[_0x5aeb24(0x3c9)][_0x5aeb24(0x28e)](Scene_Skill['layoutSettings'][_0x5aeb24(0x135)]),this['_skillTypeWindow']&&this[_0x5aeb24(0x65e)][_0x5aeb24(0x28e)](Scene_Skill['layoutSettings'][_0x5aeb24(0x5ac)]),this['_statusWindow']&&this[_0x5aeb24(0x375)][_0x5aeb24(0x28e)](Scene_Skill['layoutSettings'][_0x5aeb24(0x510)]),this[_0x5aeb24(0x590)]&&this['_itemWindow'][_0x5aeb24(0x28e)](Scene_Skill[_0x5aeb24(0x1f8)][_0x5aeb24(0x3d7)]),this[_0x5aeb24(0x30a)]&&this[_0x5aeb24(0x30a)][_0x5aeb24(0x28e)](Scene_Skill[_0x5aeb24(0x1f8)][_0x5aeb24(0x45c)]);},Scene_Skill['prototype'][_0x18ba1f(0x4cd)]=function(){const _0xbdd1d2=_0x18ba1f;return Scene_Skill[_0xbdd1d2(0x1f8)][_0xbdd1d2(0x1bd)]['call'](this);},Scene_Skill['prototype'][_0x18ba1f(0x49f)]=function(){const _0x1bef6d=_0x18ba1f;return Scene_Skill['layoutSettings'][_0x1bef6d(0x636)][_0x1bef6d(0x2fa)](this);},Scene_Skill[_0x18ba1f(0x5e5)][_0x18ba1f(0x684)]=function(){const _0xcd0667=_0x18ba1f;return Scene_Skill[_0xcd0667(0x1f8)][_0xcd0667(0x23e)][_0xcd0667(0x2fa)](this);},Scene_Skill['prototype'][_0x18ba1f(0x1cb)]=function(){const _0x302652=_0x18ba1f;return Scene_Skill[_0x302652(0x1f8)][_0x302652(0x48d)]['call'](this);},Scene_Skill[_0x18ba1f(0x5e5)][_0x18ba1f(0x19c)]=function(){const _0x3f76cf=_0x18ba1f;return Scene_Skill[_0x3f76cf(0x1f8)]['ActorRect'][_0x3f76cf(0x2fa)](this);},Scene_Equip[_0x18ba1f(0x1f8)]=VisuMZ[_0x18ba1f(0x3ea)]['Settings'][_0x18ba1f(0x55b)][_0x18ba1f(0x5f5)],VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x58e)]=Scene_Equip[_0x18ba1f(0x5e5)]['create'],Scene_Equip[_0x18ba1f(0x5e5)][_0x18ba1f(0x1e9)]=function(){const _0x3315ab=_0x18ba1f;VisuMZ[_0x3315ab(0x3ea)]['Scene_Equip_create'][_0x3315ab(0x2fa)](this),this[_0x3315ab(0x44f)]();},Scene_Equip[_0x18ba1f(0x5e5)][_0x18ba1f(0x44f)]=function(){const _0x3a0e31=_0x18ba1f;this['_helpWindow']&&this[_0x3a0e31(0x3c9)][_0x3a0e31(0x28e)](Scene_Equip['layoutSettings'][_0x3a0e31(0x135)]),this['_statusWindow']&&this[_0x3a0e31(0x375)][_0x3a0e31(0x28e)](Scene_Equip[_0x3a0e31(0x1f8)][_0x3a0e31(0x510)]),this[_0x3a0e31(0x4c6)]&&this[_0x3a0e31(0x4c6)][_0x3a0e31(0x28e)](Scene_Equip[_0x3a0e31(0x1f8)]['CommandBgType']),this[_0x3a0e31(0x60f)]&&this['_slotWindow'][_0x3a0e31(0x28e)](Scene_Equip[_0x3a0e31(0x1f8)]['SlotBgType']),this[_0x3a0e31(0x590)]&&this[_0x3a0e31(0x590)][_0x3a0e31(0x28e)](Scene_Equip[_0x3a0e31(0x1f8)][_0x3a0e31(0x3d7)]);},Scene_Equip['prototype'][_0x18ba1f(0x4cd)]=function(){const _0x29f597=_0x18ba1f;return Scene_Equip[_0x29f597(0x1f8)][_0x29f597(0x1bd)][_0x29f597(0x2fa)](this);},Scene_Equip['prototype'][_0x18ba1f(0x684)]=function(){const _0x10de98=_0x18ba1f;return Scene_Equip[_0x10de98(0x1f8)]['StatusRect'][_0x10de98(0x2fa)](this);},Scene_Equip[_0x18ba1f(0x5e5)][_0x18ba1f(0x4be)]=function(){const _0x4cd30d=_0x18ba1f;return Scene_Equip[_0x4cd30d(0x1f8)]['CommandRect'][_0x4cd30d(0x2fa)](this);},Scene_Equip[_0x18ba1f(0x5e5)][_0x18ba1f(0x5bf)]=function(){const _0x1d32cf=_0x18ba1f;return Scene_Equip[_0x1d32cf(0x1f8)][_0x1d32cf(0xea)][_0x1d32cf(0x2fa)](this);},Scene_Equip['prototype'][_0x18ba1f(0x1cb)]=function(){const _0x5630b6=_0x18ba1f;return Scene_Equip[_0x5630b6(0x1f8)][_0x5630b6(0x48d)][_0x5630b6(0x2fa)](this);},Scene_Status[_0x18ba1f(0x1f8)]=VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x493)][_0x18ba1f(0x55b)][_0x18ba1f(0x2ba)],VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x4d3)]=Scene_Status['prototype'][_0x18ba1f(0x1e9)],Scene_Status[_0x18ba1f(0x5e5)][_0x18ba1f(0x1e9)]=function(){const _0x58fd3a=_0x18ba1f;VisuMZ['CoreEngine'][_0x58fd3a(0x4d3)][_0x58fd3a(0x2fa)](this),this[_0x58fd3a(0x44f)]();},Scene_Status[_0x18ba1f(0x5e5)][_0x18ba1f(0x44f)]=function(){const _0x9b72b5=_0x18ba1f;this[_0x9b72b5(0x441)]&&this[_0x9b72b5(0x441)][_0x9b72b5(0x28e)](Scene_Status['layoutSettings']['ProfileBgType']),this[_0x9b72b5(0x375)]&&this[_0x9b72b5(0x375)][_0x9b72b5(0x28e)](Scene_Status['layoutSettings']['StatusBgType']),this[_0x9b72b5(0x1ca)]&&this[_0x9b72b5(0x1ca)][_0x9b72b5(0x28e)](Scene_Status[_0x9b72b5(0x1f8)]['StatusParamsBgType']),this[_0x9b72b5(0x506)]&&this['_statusEquipWindow'][_0x9b72b5(0x28e)](Scene_Status[_0x9b72b5(0x1f8)][_0x9b72b5(0x155)]);},Scene_Status[_0x18ba1f(0x5e5)][_0x18ba1f(0x5a5)]=function(){const _0x96818b=_0x18ba1f;return Scene_Status[_0x96818b(0x1f8)][_0x96818b(0x1a3)][_0x96818b(0x2fa)](this);},Scene_Status['prototype']['statusWindowRect']=function(){const _0x4f6565=_0x18ba1f;return Scene_Status['layoutSettings'][_0x4f6565(0x23e)][_0x4f6565(0x2fa)](this);},Scene_Status[_0x18ba1f(0x5e5)][_0x18ba1f(0x674)]=function(){const _0x2af421=_0x18ba1f;return Scene_Status[_0x2af421(0x1f8)][_0x2af421(0x627)]['call'](this);},Scene_Status['prototype']['statusEquipWindowRect']=function(){const _0x2dd48d=_0x18ba1f;return Scene_Status['layoutSettings']['StatusEquipRect'][_0x2dd48d(0x2fa)](this);},Scene_Options[_0x18ba1f(0x1f8)]=VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x493)]['MenuLayout']['OptionsMenu'],VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x381)]=Scene_Options[_0x18ba1f(0x5e5)][_0x18ba1f(0x1e9)],Scene_Options[_0x18ba1f(0x5e5)][_0x18ba1f(0x1e9)]=function(){const _0x147f16=_0x18ba1f;VisuMZ[_0x147f16(0x3ea)][_0x147f16(0x381)][_0x147f16(0x2fa)](this),this[_0x147f16(0x44f)]();},Scene_Options[_0x18ba1f(0x5e5)]['setCoreEngineUpdateWindowBg']=function(){const _0x2ed88d=_0x18ba1f;this[_0x2ed88d(0x4d0)]&&this[_0x2ed88d(0x4d0)][_0x2ed88d(0x28e)](Scene_Options[_0x2ed88d(0x1f8)][_0x2ed88d(0x124)]);},Scene_Options[_0x18ba1f(0x5e5)][_0x18ba1f(0x290)]=function(){const _0x2e4af9=_0x18ba1f;return Scene_Options[_0x2e4af9(0x1f8)]['OptionsRect']['call'](this);},Scene_Save[_0x18ba1f(0x1f8)]=VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x493)][_0x18ba1f(0x55b)][_0x18ba1f(0x208)],Scene_Save[_0x18ba1f(0x5e5)]['create']=function(){const _0xf008dd=_0x18ba1f;Scene_File[_0xf008dd(0x5e5)]['create'][_0xf008dd(0x2fa)](this),this[_0xf008dd(0x44f)]();},Scene_Save[_0x18ba1f(0x5e5)][_0x18ba1f(0x44f)]=function(){const _0x3e0d62=_0x18ba1f;this[_0x3e0d62(0x3c9)]&&this[_0x3e0d62(0x3c9)][_0x3e0d62(0x28e)](Scene_Save[_0x3e0d62(0x1f8)][_0x3e0d62(0x135)]),this[_0x3e0d62(0x637)]&&this['_listWindow']['setBackgroundType'](Scene_Save[_0x3e0d62(0x1f8)][_0x3e0d62(0x2a7)]);},Scene_Save[_0x18ba1f(0x5e5)][_0x18ba1f(0x4cd)]=function(){const _0x29fd2c=_0x18ba1f;return Scene_Save[_0x29fd2c(0x1f8)][_0x29fd2c(0x1bd)][_0x29fd2c(0x2fa)](this);},Scene_Save[_0x18ba1f(0x5e5)][_0x18ba1f(0x3d2)]=function(){const _0x51c7e2=_0x18ba1f;return Scene_Save[_0x51c7e2(0x1f8)][_0x51c7e2(0x447)]['call'](this);},Scene_Load['layoutSettings']=VisuMZ['CoreEngine']['Settings'][_0x18ba1f(0x55b)][_0x18ba1f(0x417)],Scene_Load[_0x18ba1f(0x5e5)][_0x18ba1f(0x1e9)]=function(){const _0x1a11b8=_0x18ba1f;Scene_File['prototype'][_0x1a11b8(0x1e9)][_0x1a11b8(0x2fa)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Load['prototype'][_0x18ba1f(0x44f)]=function(){const _0xa431c4=_0x18ba1f;this[_0xa431c4(0x3c9)]&&this['_helpWindow'][_0xa431c4(0x28e)](Scene_Load[_0xa431c4(0x1f8)][_0xa431c4(0x135)]),this[_0xa431c4(0x637)]&&this['_listWindow'][_0xa431c4(0x28e)](Scene_Load[_0xa431c4(0x1f8)][_0xa431c4(0x2a7)]);},Scene_Load[_0x18ba1f(0x5e5)][_0x18ba1f(0x4cd)]=function(){const _0x29ae9c=_0x18ba1f;return Scene_Load[_0x29ae9c(0x1f8)][_0x29ae9c(0x1bd)][_0x29ae9c(0x2fa)](this);},Scene_Load[_0x18ba1f(0x5e5)][_0x18ba1f(0x3d2)]=function(){const _0x53e625=_0x18ba1f;return Scene_Load[_0x53e625(0x1f8)]['ListRect']['call'](this);},Scene_GameEnd[_0x18ba1f(0x1f8)]=VisuMZ['CoreEngine'][_0x18ba1f(0x493)][_0x18ba1f(0x55b)]['GameEnd'],VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x372)]=Scene_GameEnd[_0x18ba1f(0x5e5)][_0x18ba1f(0x596)],Scene_GameEnd[_0x18ba1f(0x5e5)]['createBackground']=function(){const _0x57cf62=_0x18ba1f;Scene_MenuBase[_0x57cf62(0x5e5)][_0x57cf62(0x596)][_0x57cf62(0x2fa)](this);},Scene_GameEnd[_0x18ba1f(0x5e5)][_0x18ba1f(0x475)]=function(){const _0x472bd5=_0x18ba1f,_0x5cd3eb=this[_0x472bd5(0x4be)]();this[_0x472bd5(0x4c6)]=new Window_GameEnd(_0x5cd3eb),this['_commandWindow'][_0x472bd5(0x337)](_0x472bd5(0x42b),this[_0x472bd5(0x345)][_0x472bd5(0x106)](this)),this[_0x472bd5(0x3cc)](this[_0x472bd5(0x4c6)]),this['_commandWindow'][_0x472bd5(0x28e)](Scene_GameEnd[_0x472bd5(0x1f8)][_0x472bd5(0x603)]);},Scene_GameEnd[_0x18ba1f(0x5e5)][_0x18ba1f(0x4be)]=function(){const _0x22e74d=_0x18ba1f;return Scene_GameEnd[_0x22e74d(0x1f8)]['CommandRect'][_0x22e74d(0x2fa)](this);},Scene_Shop[_0x18ba1f(0x1f8)]=VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x493)][_0x18ba1f(0x55b)]['ShopMenu'],VisuMZ['CoreEngine']['Scene_Shop_create']=Scene_Shop[_0x18ba1f(0x5e5)][_0x18ba1f(0x1e9)],Scene_Shop[_0x18ba1f(0x5e5)]['create']=function(){const _0x53807d=_0x18ba1f;VisuMZ[_0x53807d(0x3ea)][_0x53807d(0x10a)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Shop[_0x18ba1f(0x5e5)][_0x18ba1f(0x44f)]=function(){const _0x2a7861=_0x18ba1f;this[_0x2a7861(0x3c9)]&&this[_0x2a7861(0x3c9)]['setBackgroundType'](Scene_Shop[_0x2a7861(0x1f8)][_0x2a7861(0x135)]),this[_0x2a7861(0x4a5)]&&this[_0x2a7861(0x4a5)][_0x2a7861(0x28e)](Scene_Shop[_0x2a7861(0x1f8)][_0x2a7861(0x575)]),this[_0x2a7861(0x4c6)]&&this['_commandWindow']['setBackgroundType'](Scene_Shop[_0x2a7861(0x1f8)]['CommandBgType']),this[_0x2a7861(0x2bf)]&&this['_dummyWindow'][_0x2a7861(0x28e)](Scene_Shop[_0x2a7861(0x1f8)][_0x2a7861(0x613)]),this[_0x2a7861(0x2ab)]&&this[_0x2a7861(0x2ab)][_0x2a7861(0x28e)](Scene_Shop[_0x2a7861(0x1f8)][_0x2a7861(0x227)]),this['_statusWindow']&&this[_0x2a7861(0x375)][_0x2a7861(0x28e)](Scene_Shop[_0x2a7861(0x1f8)]['StatusBgType']),this[_0x2a7861(0x418)]&&this['_buyWindow'][_0x2a7861(0x28e)](Scene_Shop[_0x2a7861(0x1f8)][_0x2a7861(0x448)]),this[_0x2a7861(0x306)]&&this['_categoryWindow'][_0x2a7861(0x28e)](Scene_Shop[_0x2a7861(0x1f8)][_0x2a7861(0x2c0)]),this['_sellWindow']&&this['_sellWindow'][_0x2a7861(0x28e)](Scene_Shop['layoutSettings']['SellBgType']);},Scene_Shop['prototype'][_0x18ba1f(0x4cd)]=function(){const _0x4f620e=_0x18ba1f;return Scene_Shop['layoutSettings'][_0x4f620e(0x1bd)][_0x4f620e(0x2fa)](this);},Scene_Shop[_0x18ba1f(0x5e5)][_0x18ba1f(0x2af)]=function(){const _0x5737ad=_0x18ba1f;return Scene_Shop['layoutSettings'][_0x5737ad(0x401)]['call'](this);},Scene_Shop['prototype'][_0x18ba1f(0x4be)]=function(){const _0x58bca=_0x18ba1f;return Scene_Shop[_0x58bca(0x1f8)]['CommandRect'][_0x58bca(0x2fa)](this);},Scene_Shop['prototype'][_0x18ba1f(0x69b)]=function(){const _0x5e6bae=_0x18ba1f;return Scene_Shop[_0x5e6bae(0x1f8)][_0x5e6bae(0x2f4)][_0x5e6bae(0x2fa)](this);},Scene_Shop['prototype']['numberWindowRect']=function(){const _0xcebe9b=_0x18ba1f;return Scene_Shop[_0xcebe9b(0x1f8)][_0xcebe9b(0x1ff)][_0xcebe9b(0x2fa)](this);},Scene_Shop[_0x18ba1f(0x5e5)][_0x18ba1f(0x684)]=function(){const _0x27fa3e=_0x18ba1f;return Scene_Shop[_0x27fa3e(0x1f8)]['StatusRect']['call'](this);},Scene_Shop[_0x18ba1f(0x5e5)][_0x18ba1f(0x2e4)]=function(){const _0x736171=_0x18ba1f;return Scene_Shop[_0x736171(0x1f8)][_0x736171(0x628)][_0x736171(0x2fa)](this);},Scene_Shop[_0x18ba1f(0x5e5)][_0x18ba1f(0x622)]=function(){const _0x22d9d7=_0x18ba1f;return Scene_Shop['layoutSettings'][_0x22d9d7(0x43d)]['call'](this);},Scene_Shop['prototype'][_0x18ba1f(0x3ee)]=function(){const _0x181367=_0x18ba1f;return Scene_Shop[_0x181367(0x1f8)][_0x181367(0xe0)][_0x181367(0x2fa)](this);},Scene_Name[_0x18ba1f(0x1f8)]=VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x493)][_0x18ba1f(0x55b)]['NameMenu'],VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x5dd)]=Scene_Name[_0x18ba1f(0x5e5)][_0x18ba1f(0x1e9)],Scene_Name[_0x18ba1f(0x5e5)]['create']=function(){const _0x58ae6a=_0x18ba1f;VisuMZ[_0x58ae6a(0x3ea)][_0x58ae6a(0x5dd)]['call'](this),this[_0x58ae6a(0x44f)]();},Scene_Name[_0x18ba1f(0x5e5)][_0x18ba1f(0x44f)]=function(){const _0x59c79d=_0x18ba1f;this[_0x59c79d(0x64d)]&&this[_0x59c79d(0x64d)][_0x59c79d(0x28e)](Scene_Name[_0x59c79d(0x1f8)][_0x59c79d(0x16d)]),this[_0x59c79d(0x243)]&&this[_0x59c79d(0x243)][_0x59c79d(0x28e)](Scene_Name[_0x59c79d(0x1f8)][_0x59c79d(0x26a)]);},Scene_Name['prototype'][_0x18ba1f(0x1f1)]=function(){return 0x0;},Scene_Name['prototype'][_0x18ba1f(0x3ad)]=function(){const _0x55e14f=_0x18ba1f;return Scene_Name['layoutSettings'][_0x55e14f(0x544)]['call'](this);},Scene_Name[_0x18ba1f(0x5e5)]['inputWindowRect']=function(){const _0x5a3333=_0x18ba1f;return Scene_Name[_0x5a3333(0x1f8)][_0x5a3333(0x399)][_0x5a3333(0x2fa)](this);},Scene_Name['prototype'][_0x18ba1f(0x1ea)]=function(){const _0xf603f0=_0x18ba1f;if(!this[_0xf603f0(0x243)])return![];return VisuMZ[_0xf603f0(0x3ea)][_0xf603f0(0x493)]['KeyboardInput'][_0xf603f0(0x1ea)];},Scene_Name[_0x18ba1f(0x5e5)][_0x18ba1f(0x156)]=function(){const _0x3c7e84=_0x18ba1f;return this['EnableNameInput']()?TextManager[_0x3c7e84(0x579)]('tab'):Scene_MenuBase[_0x3c7e84(0x5e5)][_0x3c7e84(0x156)][_0x3c7e84(0x2fa)](this);},Scene_Name[_0x18ba1f(0x5e5)][_0x18ba1f(0x2ef)]=function(){const _0x424d17=_0x18ba1f;if(this[_0x424d17(0x1ea)]()){const _0x81a50f=VisuMZ[_0x424d17(0x3ea)]['Settings'][_0x424d17(0x16e)];return this[_0x424d17(0x243)][_0x424d17(0x26c)]===_0x424d17(0x53c)?_0x81a50f['Keyboard']||'Keyboard':_0x81a50f[_0x424d17(0x322)]||_0x424d17(0x322);}else return Scene_MenuBase['prototype']['buttonAssistText1'][_0x424d17(0x2fa)](this);},VisuMZ['CoreEngine']['Scene_Name_onInputOk']=Scene_Name[_0x18ba1f(0x5e5)][_0x18ba1f(0x45e)],Scene_Name[_0x18ba1f(0x5e5)]['onInputOk']=function(){const _0x262bc3=_0x18ba1f;this[_0x262bc3(0x567)]()?this[_0x262bc3(0xef)]():VisuMZ[_0x262bc3(0x3ea)][_0x262bc3(0x303)]['call'](this);},Scene_Name[_0x18ba1f(0x5e5)][_0x18ba1f(0x567)]=function(){const _0x2bd4fc=_0x18ba1f,_0x1b3ba9=VisuMZ[_0x2bd4fc(0x3ea)][_0x2bd4fc(0x493)][_0x2bd4fc(0x16e)];if(!_0x1b3ba9)return![];const _0x1f5233=_0x1b3ba9['BannedWords'];if(!_0x1f5233)return![];const _0x1a3d7a=this[_0x2bd4fc(0x64d)][_0x2bd4fc(0x5e3)]()['toLowerCase']();for(const _0x136eb7 of _0x1f5233){if(_0x1a3d7a[_0x2bd4fc(0x1b8)](_0x136eb7[_0x2bd4fc(0x615)]()))return!![];}return![];},Scene_Name[_0x18ba1f(0x5e5)][_0x18ba1f(0xef)]=function(){const _0x2ceab2=_0x18ba1f;SoundManager[_0x2ceab2(0x54f)]();},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x3cb)]=Scene_Battle['prototype'][_0x18ba1f(0x285)],Scene_Battle[_0x18ba1f(0x5e5)]['update']=function(){const _0x51e828=_0x18ba1f;VisuMZ[_0x51e828(0x3ea)][_0x51e828(0x3cb)][_0x51e828(0x2fa)](this);if($gameTemp[_0x51e828(0x5fe)])this[_0x51e828(0x4cc)]();},Scene_Battle[_0x18ba1f(0x5e5)][_0x18ba1f(0x4cc)]=function(){const _0x11e41c=_0x18ba1f;!BattleManager[_0x11e41c(0x1cf)]()&&!this[_0x11e41c(0x66d)]&&!$gameMessage['isBusy']()&&(this[_0x11e41c(0x66d)]=!![],this[_0x11e41c(0x285)](),SceneManager[_0x11e41c(0x152)](),this[_0x11e41c(0x66d)]=![]);},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x2e3)]=Scene_Battle['prototype'][_0x18ba1f(0x10f)],Scene_Battle[_0x18ba1f(0x5e5)][_0x18ba1f(0x10f)]=function(){const _0x433090=_0x18ba1f;VisuMZ[_0x433090(0x3ea)][_0x433090(0x2e3)][_0x433090(0x2fa)](this),SceneManager[_0x433090(0x64a)]()&&this[_0x433090(0x546)]();},Scene_Battle['prototype'][_0x18ba1f(0x546)]=function(){const _0x19d9a5=_0x18ba1f;this[_0x19d9a5(0x1bf)]['x']=Graphics['boxWidth']+0x4,this[_0x19d9a5(0x2f2)]()?this[_0x19d9a5(0x1bf)]['y']=Graphics[_0x19d9a5(0x34e)]-this['buttonAreaHeight']():this[_0x19d9a5(0x1bf)]['y']=0x0;},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x415)]=Sprite_Button[_0x18ba1f(0x5e5)]['initialize'],Sprite_Button[_0x18ba1f(0x5e5)][_0x18ba1f(0x117)]=function(_0x21fdc2){const _0x1cf11f=_0x18ba1f;VisuMZ[_0x1cf11f(0x3ea)][_0x1cf11f(0x415)][_0x1cf11f(0x2fa)](this,_0x21fdc2),this[_0x1cf11f(0x650)]();},Sprite_Button[_0x18ba1f(0x5e5)][_0x18ba1f(0x650)]=function(){const _0x1ac313=_0x18ba1f,_0x3cd8da=VisuMZ[_0x1ac313(0x3ea)][_0x1ac313(0x493)]['UI'];this[_0x1ac313(0x136)]=![];switch(this[_0x1ac313(0x4c8)]){case _0x1ac313(0x42b):this[_0x1ac313(0x136)]=!_0x3cd8da[_0x1ac313(0x182)];break;case _0x1ac313(0x344):case _0x1ac313(0x403):this[_0x1ac313(0x136)]=!_0x3cd8da[_0x1ac313(0x5a3)];break;case'down':case'up':case _0x1ac313(0x3f3):case _0x1ac313(0x496):case'ok':this[_0x1ac313(0x136)]=!_0x3cd8da['numberShowButton'];break;case _0x1ac313(0x588):this[_0x1ac313(0x136)]=!_0x3cd8da[_0x1ac313(0x47a)];break;}},VisuMZ[_0x18ba1f(0x3ea)]['Sprite_Button_updateOpacity']=Sprite_Button[_0x18ba1f(0x5e5)][_0x18ba1f(0x66e)],Sprite_Button['prototype'][_0x18ba1f(0x66e)]=function(){const _0x51deaa=_0x18ba1f;SceneManager[_0x51deaa(0x642)]()||this[_0x51deaa(0x136)]?this[_0x51deaa(0xf5)]():VisuMZ[_0x51deaa(0x3ea)][_0x51deaa(0x318)]['call'](this);},Sprite_Button[_0x18ba1f(0x5e5)]['hideButtonFromView']=function(){const _0xee9135=_0x18ba1f;this[_0xee9135(0x30b)]=![],this['opacity']=0x0,this['x']=Graphics[_0xee9135(0x259)]*0xa,this['y']=Graphics[_0xee9135(0x13b)]*0xa;},VisuMZ[_0x18ba1f(0x3ea)]['Sprite_Battler_startMove']=Sprite_Battler['prototype'][_0x18ba1f(0x24c)],Sprite_Battler[_0x18ba1f(0x5e5)][_0x18ba1f(0x24c)]=function(_0x3d666c,_0x32be75,_0xfa1cb3){const _0x34a959=_0x18ba1f;(this[_0x34a959(0x2de)]!==_0x3d666c||this[_0x34a959(0x54e)]!==_0x32be75)&&(this[_0x34a959(0xd2)]('Linear'),this[_0x34a959(0x46a)]=_0xfa1cb3),VisuMZ[_0x34a959(0x3ea)][_0x34a959(0x515)][_0x34a959(0x2fa)](this,_0x3d666c,_0x32be75,_0xfa1cb3);},Sprite_Battler[_0x18ba1f(0x5e5)][_0x18ba1f(0xd2)]=function(_0xf97cd7){const _0x6ca062=_0x18ba1f;this[_0x6ca062(0x39b)]=_0xf97cd7;},Sprite_Battler[_0x18ba1f(0x5e5)][_0x18ba1f(0x38f)]=function(){const _0x586918=_0x18ba1f;if(this['_movementDuration']<=0x0)return;const _0x4d9c0d=this[_0x586918(0x574)],_0x40a9db=this['_movementWholeDuration'],_0xad00cb=this[_0x586918(0x39b)];this[_0x586918(0x190)]=this[_0x586918(0x2f9)](this[_0x586918(0x190)],this[_0x586918(0x2de)],_0x4d9c0d,_0x40a9db,_0xad00cb),this[_0x586918(0x1da)]=this[_0x586918(0x2f9)](this[_0x586918(0x1da)],this['_targetOffsetY'],_0x4d9c0d,_0x40a9db,_0xad00cb),this[_0x586918(0x574)]--;if(this[_0x586918(0x574)]<=0x0)this[_0x586918(0x377)]();},Sprite_Battler['prototype'][_0x18ba1f(0x2f9)]=function(_0x30db0d,_0x642e84,_0x5e3e57,_0x42e544,_0x491a47){const _0x123253=_0x18ba1f,_0x3cb268=VisuMZ[_0x123253(0x50f)]((_0x42e544-_0x5e3e57)/_0x42e544,_0x491a47||_0x123253(0x57c)),_0x3d67d6=VisuMZ[_0x123253(0x50f)]((_0x42e544-_0x5e3e57+0x1)/_0x42e544,_0x491a47||_0x123253(0x57c)),_0x149ac9=(_0x30db0d-_0x642e84*_0x3cb268)/(0x1-_0x3cb268);return _0x149ac9+(_0x642e84-_0x149ac9)*_0x3d67d6;},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0xf9)]=Sprite_Actor[_0x18ba1f(0x5e5)][_0x18ba1f(0x3d0)],Sprite_Actor['prototype'][_0x18ba1f(0x3d0)]=function(_0x403747){const _0x5a6c5a=_0x18ba1f;VisuMZ['CoreEngine'][_0x5a6c5a(0x493)]['UI']['RepositionActors']?this[_0x5a6c5a(0x312)](_0x403747):VisuMZ['CoreEngine'][_0x5a6c5a(0xf9)][_0x5a6c5a(0x2fa)](this,_0x403747);},Sprite_Actor[_0x18ba1f(0x5e5)][_0x18ba1f(0x312)]=function(_0x4876d2){const _0x545a01=_0x18ba1f;let _0x4e9b94=Math[_0x545a01(0x339)](Graphics['width']/0x2+0xc0);_0x4e9b94-=Math[_0x545a01(0x602)]((Graphics[_0x545a01(0x259)]-Graphics[_0x545a01(0x237)])/0x2),_0x4e9b94+=_0x4876d2*0x20;let _0x6fcaf3=Graphics['height']-0xc8-$gameParty['maxBattleMembers']()*0x30;_0x6fcaf3-=Math[_0x545a01(0x602)]((Graphics[_0x545a01(0x13b)]-Graphics[_0x545a01(0x34e)])/0x2),_0x6fcaf3+=_0x4876d2*0x30,this['setHome'](_0x4e9b94,_0x6fcaf3);},Sprite_Actor['prototype'][_0x18ba1f(0x583)]=function(){const _0x403ddf=_0x18ba1f;this[_0x403ddf(0x24c)](0x4b0,0x0,0x78);},Sprite_Animation[_0x18ba1f(0x5e5)][_0x18ba1f(0x293)]=function(_0x43ba99){const _0x58fee5=_0x18ba1f;this[_0x58fee5(0x5b9)]=_0x43ba99;},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x63b)]=Sprite_Animation[_0x18ba1f(0x5e5)][_0x18ba1f(0x25c)],Sprite_Animation[_0x18ba1f(0x5e5)]['processSoundTimings']=function(){const _0x449380=_0x18ba1f;if(this[_0x449380(0x5b9)])return;VisuMZ[_0x449380(0x3ea)]['Sprite_Animation_processSoundTimings'][_0x449380(0x2fa)](this);},VisuMZ[_0x18ba1f(0x3ea)]['Sprite_Animation_setViewport']=Sprite_Animation[_0x18ba1f(0x5e5)][_0x18ba1f(0x438)],Sprite_Animation[_0x18ba1f(0x5e5)][_0x18ba1f(0x438)]=function(_0x49bf84){const _0x3c8599=_0x18ba1f;this[_0x3c8599(0x200)]()?this['setViewportCoreEngineFix'](_0x49bf84):VisuMZ[_0x3c8599(0x3ea)]['Sprite_Animation_setViewport']['call'](this,_0x49bf84);},Sprite_Animation[_0x18ba1f(0x5e5)][_0x18ba1f(0x200)]=function(){const _0x43efa1=_0x18ba1f;if(!this['_animation'])return![];const _0x119f7a=this[_0x43efa1(0x127)][_0x43efa1(0x5e3)]||'';if(_0x119f7a['match'](/<MIRROR OFFSET X>/i))return!![];if(_0x119f7a[_0x43efa1(0x163)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x43efa1(0x3ea)]['Settings'][_0x43efa1(0x2dd)][_0x43efa1(0x595)];},Sprite_Animation['prototype']['setViewportCoreEngineFix']=function(_0x49c587){const _0xfae220=_0x18ba1f,_0x1a9848=this[_0xfae220(0x391)],_0x288f0d=this[_0xfae220(0x391)],_0x3a0130=this[_0xfae220(0x127)][_0xfae220(0x276)]*(this[_0xfae220(0x624)]?-0x1:0x1)-_0x1a9848/0x2,_0x2f3e32=this[_0xfae220(0x127)][_0xfae220(0x587)]-_0x288f0d/0x2,_0x23248c=this['targetPosition'](_0x49c587);_0x49c587['gl'][_0xfae220(0x21a)](_0x3a0130+_0x23248c['x'],_0x2f3e32+_0x23248c['y'],_0x1a9848,_0x288f0d);},Sprite_Animation[_0x18ba1f(0x5e5)][_0x18ba1f(0xe3)]=function(_0x32be0c){const _0x18e4e2=_0x18ba1f;if(_0x32be0c[_0x18e4e2(0x46f)]){}const _0x5dcc28=this[_0x18e4e2(0x127)]['name'];let _0x246f90=_0x32be0c[_0x18e4e2(0x13b)]*_0x32be0c[_0x18e4e2(0x30c)]['y'],_0x33fa35=0x0,_0x28f1af=-_0x246f90/0x2;if(_0x5dcc28[_0x18e4e2(0x163)](/<(?:HEAD|HEADER|TOP)>/i))_0x28f1af=-_0x246f90;if(_0x5dcc28[_0x18e4e2(0x163)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x28f1af=0x0;if(_0x5dcc28['match'](/<(?:LEFT)>/i))_0x33fa35=-_0x32be0c[_0x18e4e2(0x259)]/0x2;if(_0x5dcc28[_0x18e4e2(0x163)](/<(?:RIGHT)>/i))_0x28f1af=_0x32be0c['width']/0x2;if(_0x5dcc28[_0x18e4e2(0x163)](/<ANCHOR X:[ ](\d+\.?\d*)>/i))_0x33fa35=Number(RegExp['$1'])*_0x32be0c[_0x18e4e2(0x259)];_0x5dcc28[_0x18e4e2(0x163)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x28f1af=(0x1-Number(RegExp['$1']))*-_0x246f90);_0x5dcc28[_0x18e4e2(0x163)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x33fa35=Number(RegExp['$1'])*_0x32be0c[_0x18e4e2(0x259)],_0x28f1af=(0x1-Number(RegExp['$2']))*-_0x246f90);if(_0x5dcc28[_0x18e4e2(0x163)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x33fa35+=Number(RegExp['$1']);if(_0x5dcc28[_0x18e4e2(0x163)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x28f1af+=Number(RegExp['$1']);_0x5dcc28[_0x18e4e2(0x163)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x33fa35+=Number(RegExp['$1']),_0x28f1af+=Number(RegExp['$2']));const _0x811050=new Point(_0x33fa35,_0x28f1af);return _0x32be0c[_0x18e4e2(0x411)](),_0x32be0c[_0x18e4e2(0x2b6)][_0x18e4e2(0x335)](_0x811050);},Sprite_AnimationMV[_0x18ba1f(0x5e5)]['setMute']=function(_0x78d7bd){const _0xbe6218=_0x18ba1f;this[_0xbe6218(0x5b9)]=_0x78d7bd;},VisuMZ[_0x18ba1f(0x3ea)]['Sprite_AnimationMV_processTimingData']=Sprite_AnimationMV[_0x18ba1f(0x5e5)][_0x18ba1f(0xe1)],Sprite_AnimationMV[_0x18ba1f(0x5e5)][_0x18ba1f(0xe1)]=function(_0xaacb7f){const _0x4b580b=_0x18ba1f;this[_0x4b580b(0x5b9)]&&(_0xaacb7f=JsonEx[_0x4b580b(0x485)](_0xaacb7f),_0xaacb7f['se']&&(_0xaacb7f['se'][_0x4b580b(0x2bc)]=0x0)),VisuMZ[_0x4b580b(0x3ea)]['Sprite_AnimationMV_processTimingData'][_0x4b580b(0x2fa)](this,_0xaacb7f);},Sprite_Damage[_0x18ba1f(0x5e5)][_0x18ba1f(0x500)]=function(_0x1ad15d){const _0x94bb64=_0x18ba1f;let _0x29ff47=Math[_0x94bb64(0x18c)](_0x1ad15d)[_0x94bb64(0x24b)]();this[_0x94bb64(0x531)]()&&(_0x29ff47=VisuMZ['GroupDigits'](_0x29ff47));const _0x20b47c=this[_0x94bb64(0x6a5)](),_0x281879=Math['floor'](_0x20b47c*0.75);for(let _0x549449=0x0;_0x549449<_0x29ff47[_0x94bb64(0x397)];_0x549449++){const _0x114f80=this[_0x94bb64(0x5e6)](_0x281879,_0x20b47c);_0x114f80[_0x94bb64(0x369)]['drawText'](_0x29ff47[_0x549449],0x0,0x0,_0x281879,_0x20b47c,_0x94bb64(0x52a)),_0x114f80['x']=(_0x549449-(_0x29ff47[_0x94bb64(0x397)]-0x1)/0x2)*_0x281879,_0x114f80['dy']=-_0x549449;}},Sprite_Damage[_0x18ba1f(0x5e5)][_0x18ba1f(0x531)]=function(){const _0x39d240=_0x18ba1f;return VisuMZ[_0x39d240(0x3ea)][_0x39d240(0x493)]['QoL'][_0x39d240(0x1ee)];},Sprite_Damage[_0x18ba1f(0x5e5)][_0x18ba1f(0x612)]=function(){const _0x29e4d9=_0x18ba1f;return ColorManager[_0x29e4d9(0x682)]();},VisuMZ[_0x18ba1f(0x3ea)]['Sprite_Gauge_gaugeRate']=Sprite_Gauge[_0x18ba1f(0x5e5)][_0x18ba1f(0x1c0)],Sprite_Gauge[_0x18ba1f(0x5e5)][_0x18ba1f(0x1c0)]=function(){const _0x3fa158=_0x18ba1f;return VisuMZ[_0x3fa158(0x3ea)]['Sprite_Gauge_gaugeRate'][_0x3fa158(0x2fa)](this)[_0x3fa158(0x21d)](0x0,0x1);},VisuMZ['CoreEngine']['Sprite_Gauge_currentValue']=Sprite_Gauge['prototype'][_0x18ba1f(0x387)],Sprite_Gauge[_0x18ba1f(0x5e5)]['currentValue']=function(){const _0x25d874=_0x18ba1f;let _0x2efcc9=VisuMZ[_0x25d874(0x3ea)][_0x25d874(0x5a7)]['call'](this);return _0x2efcc9;},Sprite_Gauge[_0x18ba1f(0x5e5)][_0x18ba1f(0x685)]=function(){const _0x5f06e7=_0x18ba1f;let _0x4847ac=this[_0x5f06e7(0x387)]();this[_0x5f06e7(0x531)]()&&(_0x4847ac=VisuMZ[_0x5f06e7(0x3a9)](_0x4847ac));const _0x8cc777=this[_0x5f06e7(0x1fa)]()-0x1,_0x1f42e8=this[_0x5f06e7(0x66c)]();this[_0x5f06e7(0x470)](),this[_0x5f06e7(0x369)]['drawText'](_0x4847ac,0x0,0x0,_0x8cc777,_0x1f42e8,'right');},Sprite_Gauge['prototype'][_0x18ba1f(0x609)]=function(){return 0x3;},Sprite_Gauge['prototype'][_0x18ba1f(0x531)]=function(){const _0x31c2a0=_0x18ba1f;return VisuMZ[_0x31c2a0(0x3ea)][_0x31c2a0(0x493)][_0x31c2a0(0x2dd)][_0x31c2a0(0x4c0)];},Sprite_Gauge[_0x18ba1f(0x5e5)][_0x18ba1f(0x612)]=function(){const _0x678d49=_0x18ba1f;return ColorManager[_0x678d49(0xe6)]();};function Sprite_TitlePictureButton(){const _0x238d2d=_0x18ba1f;this[_0x238d2d(0x117)](...arguments);}Sprite_TitlePictureButton[_0x18ba1f(0x5e5)]=Object[_0x18ba1f(0x1e9)](Sprite_Clickable[_0x18ba1f(0x5e5)]),Sprite_TitlePictureButton[_0x18ba1f(0x5e5)][_0x18ba1f(0x288)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x18ba1f(0x5e5)]['initialize']=function(_0x2b0e80){const _0x1b5a6c=_0x18ba1f;Sprite_Clickable[_0x1b5a6c(0x5e5)][_0x1b5a6c(0x117)][_0x1b5a6c(0x2fa)](this),this[_0x1b5a6c(0x1f6)]=_0x2b0e80,this['_clickHandler']=null,this['setup']();},Sprite_TitlePictureButton[_0x18ba1f(0x5e5)][_0x18ba1f(0x2c7)]=function(){const _0x1d40f4=_0x18ba1f;this['x']=Graphics['width'],this['y']=Graphics[_0x1d40f4(0x13b)],this[_0x1d40f4(0x30b)]=![],this['setupButtonImage']();},Sprite_TitlePictureButton[_0x18ba1f(0x5e5)][_0x18ba1f(0x3fa)]=function(){const _0x1b15ac=_0x18ba1f;this['bitmap']=ImageManager[_0x1b15ac(0x686)](this[_0x1b15ac(0x1f6)][_0x1b15ac(0x3df)]),this['bitmap']['addLoadListener'](this['onButtonImageLoad'][_0x1b15ac(0x106)](this));},Sprite_TitlePictureButton['prototype'][_0x18ba1f(0x2d2)]=function(){const _0x5959c3=_0x18ba1f;this[_0x5959c3(0x1f6)][_0x5959c3(0x2ad)][_0x5959c3(0x2fa)](this),this[_0x5959c3(0x1f6)][_0x5959c3(0x48f)]['call'](this),this[_0x5959c3(0x675)](this[_0x5959c3(0x1f6)][_0x5959c3(0x189)][_0x5959c3(0x106)](this));},Sprite_TitlePictureButton[_0x18ba1f(0x5e5)]['update']=function(){const _0x38c534=_0x18ba1f;Sprite_Clickable[_0x38c534(0x5e5)][_0x38c534(0x285)][_0x38c534(0x2fa)](this),this[_0x38c534(0x66e)](),this[_0x38c534(0x593)]();},Sprite_TitlePictureButton['prototype']['fadeSpeed']=function(){const _0x346f53=_0x18ba1f;return VisuMZ[_0x346f53(0x3ea)]['Settings'][_0x346f53(0x55b)][_0x346f53(0x55d)][_0x346f53(0x107)];},Sprite_TitlePictureButton[_0x18ba1f(0x5e5)][_0x18ba1f(0x66e)]=function(){const _0x45729f=_0x18ba1f;this[_0x45729f(0x52c)]||this[_0x45729f(0x2d0)]?this[_0x45729f(0x308)]=0xff:(this[_0x45729f(0x308)]+=this['visible']?this[_0x45729f(0x5cb)]():-0x1*this[_0x45729f(0x5cb)](),this[_0x45729f(0x308)]=Math['min'](0xc0,this['opacity']));},Sprite_TitlePictureButton['prototype'][_0x18ba1f(0x675)]=function(_0x1f8270){const _0x5bb6ac=_0x18ba1f;this[_0x5bb6ac(0x67d)]=_0x1f8270;},Sprite_TitlePictureButton[_0x18ba1f(0x5e5)][_0x18ba1f(0x69c)]=function(){const _0x183966=_0x18ba1f;this['_clickHandler']&&this[_0x183966(0x67d)]();},VisuMZ['CoreEngine'][_0x18ba1f(0x3db)]=Spriteset_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x117)],Spriteset_Base[_0x18ba1f(0x5e5)]['initialize']=function(){const _0x4c4dbf=_0x18ba1f;VisuMZ['CoreEngine'][_0x4c4dbf(0x3db)]['call'](this),this['initMembersCoreEngine']();},Spriteset_Base[_0x18ba1f(0x5e5)]['initMembersCoreEngine']=function(){const _0x1b4798=_0x18ba1f;this[_0x1b4798(0x11c)]=[],this[_0x1b4798(0x6a7)]=this[_0x1b4798(0x30c)]['x'],this[_0x1b4798(0xd0)]=this[_0x1b4798(0x30c)]['y'];},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x4a1)]=Spriteset_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x317)],Spriteset_Base['prototype'][_0x18ba1f(0x317)]=function(_0x3ea321){const _0x409901=_0x18ba1f;this[_0x409901(0x20d)](),VisuMZ[_0x409901(0x3ea)][_0x409901(0x4a1)][_0x409901(0x2fa)](this,_0x3ea321);},VisuMZ[_0x18ba1f(0x3ea)]['Spriteset_Base_update']=Spriteset_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x285)],Spriteset_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x285)]=function(){const _0x1025e0=_0x18ba1f;VisuMZ['CoreEngine']['Spriteset_Base_update'][_0x1025e0(0x2fa)](this),this[_0x1025e0(0x44d)](),this[_0x1025e0(0x64f)]();},Spriteset_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x44d)]=function(){const _0x56defa=_0x18ba1f;if(!VisuMZ['CoreEngine']['Settings'][_0x56defa(0x2dd)]['AntiZoomPictures'])return;if(this[_0x56defa(0x6a7)]===this['scale']['x']&&this['_cacheScaleY']===this[_0x56defa(0x30c)]['y'])return;this[_0x56defa(0x52b)](),this[_0x56defa(0x6a7)]=this[_0x56defa(0x30c)]['x'],this['_cacheScaleY']=this[_0x56defa(0x30c)]['y'];},Spriteset_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x52b)]=function(){const _0x5ddf1a=_0x18ba1f;this[_0x5ddf1a(0x30c)]['x']!==0x0&&(this['_pictureContainer'][_0x5ddf1a(0x30c)]['x']=0x1/this[_0x5ddf1a(0x30c)]['x'],this[_0x5ddf1a(0x4b3)]['x']=-(this['x']/this['scale']['x'])),this['scale']['y']!==0x0&&(this[_0x5ddf1a(0x4b3)][_0x5ddf1a(0x30c)]['y']=0x1/this[_0x5ddf1a(0x30c)]['y'],this['_pictureContainer']['y']=-(this['y']/this[_0x5ddf1a(0x30c)]['y']));},Spriteset_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x64f)]=function(){const _0x8e1764=_0x18ba1f;for(const _0x19f0b9 of this[_0x8e1764(0x11c)]){!_0x19f0b9[_0x8e1764(0x5d2)]()&&this[_0x8e1764(0x3e5)](_0x19f0b9);}this[_0x8e1764(0x114)]();},Spriteset_Base['prototype'][_0x18ba1f(0x114)]=function(){const _0x15e47d=_0x18ba1f;for(;;){const _0x4f998c=$gameTemp[_0x15e47d(0x3a6)]();if(_0x4f998c)this['createFauxAnimation'](_0x4f998c);else break;}},Spriteset_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x195)]=function(_0x4f6057){const _0x3fca00=_0x18ba1f,_0x5a761b=$dataAnimations[_0x4f6057[_0x3fca00(0x6a2)]],_0x4ae3ce=_0x4f6057[_0x3fca00(0x4d5)],_0x46d744=_0x4f6057['mirror'],_0x31dcd2=_0x4f6057[_0x3fca00(0xfe)];let _0x29c0e0=this[_0x3fca00(0x68f)]();const _0xc33492=this['animationNextDelay']();if(this[_0x3fca00(0x1eb)](_0x5a761b))for(const _0x31fc40 of _0x4ae3ce){this[_0x3fca00(0x362)]([_0x31fc40],_0x5a761b,_0x46d744,_0x29c0e0,_0x31dcd2),_0x29c0e0+=_0xc33492;}else this[_0x3fca00(0x362)](_0x4ae3ce,_0x5a761b,_0x46d744,_0x29c0e0,_0x31dcd2);},Spriteset_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x362)]=function(_0x42d924,_0x27b43d,_0x17cbde,_0x406df0,_0x177925){const _0x48f12a=_0x18ba1f,_0x323492=this['isMVAnimation'](_0x27b43d),_0x3ccc97=new(_0x323492?Sprite_AnimationMV:Sprite_Animation)(),_0x1f5940=this[_0x48f12a(0x27e)](_0x42d924);this[_0x48f12a(0x201)](_0x42d924[0x0])&&(_0x17cbde=!_0x17cbde),_0x3ccc97['targetObjects']=_0x42d924,_0x3ccc97[_0x48f12a(0x2c7)](_0x1f5940,_0x27b43d,_0x17cbde,_0x406df0),_0x3ccc97['setMute'](_0x177925),this[_0x48f12a(0x5fd)][_0x48f12a(0x608)](_0x3ccc97),this[_0x48f12a(0x11c)][_0x48f12a(0x25f)](_0x3ccc97);},Spriteset_Base['prototype'][_0x18ba1f(0x3e5)]=function(_0x4f1354){const _0x4cc9b4=_0x18ba1f;this['_fauxAnimationSprites'][_0x4cc9b4(0x26f)](_0x4f1354),this[_0x4cc9b4(0x5fd)][_0x4cc9b4(0x134)](_0x4f1354);for(const _0x333cbc of _0x4f1354[_0x4cc9b4(0x40c)]){_0x333cbc['endAnimation']&&_0x333cbc['endAnimation']();}_0x4f1354[_0x4cc9b4(0x317)]();},Spriteset_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x20d)]=function(){const _0x55e581=_0x18ba1f;for(const _0xead5d of this[_0x55e581(0x11c)]){this['removeFauxAnimation'](_0xead5d);}},Spriteset_Base[_0x18ba1f(0x5e5)]['isFauxAnimationPlaying']=function(){const _0x1c36c0=_0x18ba1f;return this['_fauxAnimationSprites'][_0x1c36c0(0x397)]>0x0;},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x1d6)]=Spriteset_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x22f)],Spriteset_Base['prototype'][_0x18ba1f(0x22f)]=function(){const _0x477cf4=_0x18ba1f;VisuMZ[_0x477cf4(0x3ea)]['Spriteset_Base_updatePosition'][_0x477cf4(0x2fa)](this),this['updatePositionCoreEngine']();},Spriteset_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x15f)]=function(){const _0x1525bf=_0x18ba1f;if(!$gameScreen)return;if($gameScreen[_0x1525bf(0x137)]<=0x0)return;this['x']-=Math[_0x1525bf(0x339)]($gameScreen[_0x1525bf(0x555)]());const _0x1dc407=$gameScreen[_0x1525bf(0x5cf)]();switch($gameScreen[_0x1525bf(0x5cf)]()){case _0x1525bf(0xd9):this[_0x1525bf(0x26e)]();break;case _0x1525bf(0x229):this[_0x1525bf(0x331)]();break;case'vertical':this[_0x1525bf(0x4a8)]();break;default:this[_0x1525bf(0x580)]();break;}},Spriteset_Base['prototype'][_0x18ba1f(0x26e)]=function(){const _0xaf8bfc=_0x18ba1f,_0x26d7de=VisuMZ[_0xaf8bfc(0x3ea)][_0xaf8bfc(0x493)][_0xaf8bfc(0x42e)];if(_0x26d7de&&_0x26d7de[_0xaf8bfc(0x469)])return _0x26d7de[_0xaf8bfc(0x469)][_0xaf8bfc(0x2fa)](this);this['x']+=Math[_0xaf8bfc(0x339)]($gameScreen[_0xaf8bfc(0x555)]());},Spriteset_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x580)]=function(){const _0x2f52f0=_0x18ba1f,_0xb24543=VisuMZ['CoreEngine'][_0x2f52f0(0x493)][_0x2f52f0(0x42e)];if(_0xb24543&&_0xb24543[_0x2f52f0(0x589)])return _0xb24543['randomJS'][_0x2f52f0(0x2fa)](this);const _0x26d3a8=$gameScreen[_0x2f52f0(0x59d)]*0.75,_0x13307c=$gameScreen[_0x2f52f0(0x1dd)]*0.6,_0x49b814=$gameScreen['_shakeDuration'];this['x']+=Math[_0x2f52f0(0x339)](Math[_0x2f52f0(0x378)](_0x26d3a8)-Math[_0x2f52f0(0x378)](_0x13307c))*(Math[_0x2f52f0(0x32c)](_0x49b814,0x1e)*0.5),this['y']+=Math[_0x2f52f0(0x339)](Math['randomInt'](_0x26d3a8)-Math[_0x2f52f0(0x378)](_0x13307c))*(Math[_0x2f52f0(0x32c)](_0x49b814,0x1e)*0.5);},Spriteset_Base['prototype'][_0x18ba1f(0x331)]=function(){const _0x38ae36=_0x18ba1f,_0x164bca=VisuMZ['CoreEngine']['Settings']['ScreenShake'];if(_0x164bca&&_0x164bca['horzJS'])return _0x164bca[_0x38ae36(0x42f)][_0x38ae36(0x2fa)](this);const _0x2c6759=$gameScreen[_0x38ae36(0x59d)]*0.75,_0x4bc6d6=$gameScreen[_0x38ae36(0x1dd)]*0.6,_0x380afe=$gameScreen[_0x38ae36(0x137)];this['x']+=Math['round'](Math['randomInt'](_0x2c6759)-Math[_0x38ae36(0x378)](_0x4bc6d6))*(Math[_0x38ae36(0x32c)](_0x380afe,0x1e)*0.5);},Spriteset_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x4a8)]=function(){const _0x2c9cc7=_0x18ba1f,_0x2a10d9=VisuMZ[_0x2c9cc7(0x3ea)][_0x2c9cc7(0x493)]['ScreenShake'];if(_0x2a10d9&&_0x2a10d9[_0x2c9cc7(0x40e)])return _0x2a10d9[_0x2c9cc7(0x40e)][_0x2c9cc7(0x2fa)](this);const _0x3ebc84=$gameScreen['_shakePower']*0.75,_0x2b6730=$gameScreen[_0x2c9cc7(0x1dd)]*0.6,_0x369fc5=$gameScreen[_0x2c9cc7(0x137)];this['y']+=Math[_0x2c9cc7(0x339)](Math[_0x2c9cc7(0x378)](_0x3ebc84)-Math[_0x2c9cc7(0x378)](_0x2b6730))*(Math[_0x2c9cc7(0x32c)](_0x369fc5,0x1e)*0.5);},Spriteset_Battle[_0x18ba1f(0x5e5)][_0x18ba1f(0x596)]=function(){const _0x31208d=_0x18ba1f;this[_0x31208d(0x51d)]=new PIXI[(_0x31208d(0x3e8))][(_0x31208d(0x21b))](clamp=!![]),this[_0x31208d(0x6b1)]=new Sprite(),this[_0x31208d(0x6b1)][_0x31208d(0x369)]=SceneManager[_0x31208d(0x231)](),this[_0x31208d(0x6b1)]['filters']=[this[_0x31208d(0x51d)]],this[_0x31208d(0x27c)][_0x31208d(0x608)](this[_0x31208d(0x6b1)]);},VisuMZ['CoreEngine']['Spriteset_Battle_createEnemies']=Spriteset_Battle['prototype'][_0x18ba1f(0x20f)],Spriteset_Battle[_0x18ba1f(0x5e5)][_0x18ba1f(0x20f)]=function(){const _0x45b988=_0x18ba1f;VisuMZ[_0x45b988(0x3ea)]['Settings']['UI'][_0x45b988(0x215)]&&this['repositionEnemiesByResolution'](),VisuMZ[_0x45b988(0x3ea)][_0x45b988(0x482)][_0x45b988(0x2fa)](this);},Spriteset_Battle['prototype']['repositionEnemiesByResolution']=function(){const _0x298522=_0x18ba1f;for(member of $gameTroop[_0x298522(0x24e)]()){member['moveRelativeToResolutionChange']();}},VisuMZ['CoreEngine'][_0x18ba1f(0x654)]=Window_Base['prototype'][_0x18ba1f(0x117)],Window_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x117)]=function(_0x33d137){const _0xcc50d2=_0x18ba1f;_0x33d137['x']=Math[_0xcc50d2(0x339)](_0x33d137['x']),_0x33d137['y']=Math[_0xcc50d2(0x339)](_0x33d137['y']),_0x33d137[_0xcc50d2(0x259)]=Math['round'](_0x33d137[_0xcc50d2(0x259)]),_0x33d137[_0xcc50d2(0x13b)]=Math[_0xcc50d2(0x339)](_0x33d137[_0xcc50d2(0x13b)]),this[_0xcc50d2(0x60d)](),VisuMZ['CoreEngine']['Window_Base_initialize'][_0xcc50d2(0x2fa)](this,_0x33d137),this[_0xcc50d2(0x18a)]();},Window_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x60d)]=function(){const _0x2f1322=_0x18ba1f;this['_digitGrouping']=VisuMZ[_0x2f1322(0x3ea)][_0x2f1322(0x493)]['QoL']['DigitGroupingStandardText'],this[_0x2f1322(0x43e)]=VisuMZ[_0x2f1322(0x3ea)][_0x2f1322(0x493)][_0x2f1322(0x2dd)][_0x2f1322(0xf7)];},Window_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x5f7)]=function(){const _0xd57f02=_0x18ba1f;return VisuMZ[_0xd57f02(0x3ea)][_0xd57f02(0x493)][_0xd57f02(0x59c)][_0xd57f02(0x491)];},Window_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x2ce)]=function(){const _0x243de7=_0x18ba1f;return VisuMZ[_0x243de7(0x3ea)]['Settings'][_0x243de7(0x59c)]['ItemPadding'];},Window_Base['prototype'][_0x18ba1f(0x18d)]=function(){const _0x111709=_0x18ba1f;this[_0x111709(0x3a2)]=VisuMZ[_0x111709(0x3ea)][_0x111709(0x493)][_0x111709(0x59c)][_0x111709(0x17d)];},Window_Base[_0x18ba1f(0x5e5)]['translucentOpacity']=function(){const _0x2115cd=_0x18ba1f;return VisuMZ[_0x2115cd(0x3ea)][_0x2115cd(0x493)]['Window'][_0x2115cd(0x551)];},Window_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x140)]=function(){const _0xf2556c=_0x18ba1f;return VisuMZ['CoreEngine'][_0xf2556c(0x493)][_0xf2556c(0x59c)]['OpenSpeed'];},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x198)]=Window_Base[_0x18ba1f(0x5e5)]['update'],Window_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x285)]=function(){const _0x564cc8=_0x18ba1f;VisuMZ[_0x564cc8(0x3ea)]['Window_Base_update'][_0x564cc8(0x2fa)](this),this[_0x564cc8(0x2fe)]();},Window_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x4e8)]=function(){const _0x51568d=_0x18ba1f;this[_0x51568d(0x3e9)]&&(this['openness']+=this[_0x51568d(0x140)](),this['isOpen']()&&(this['_opening']=![]));},Window_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x274)]=function(){const _0x3c2740=_0x18ba1f;this[_0x3c2740(0x422)]&&(this[_0x3c2740(0x63f)]-=this['openingSpeed'](),this[_0x3c2740(0x508)]()&&(this['_closing']=![]));},VisuMZ[_0x18ba1f(0x3ea)]['Window_Base_drawText']=Window_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x10c)],Window_Base[_0x18ba1f(0x5e5)]['drawText']=function(_0x2a4eb1,_0x204f51,_0x2bc6f3,_0x30a9d1,_0x17c47e){const _0x476aeb=_0x18ba1f;if(this[_0x476aeb(0x531)]())_0x2a4eb1=VisuMZ[_0x476aeb(0x3a9)](_0x2a4eb1);VisuMZ[_0x476aeb(0x3ea)]['Window_Base_drawText'][_0x476aeb(0x2fa)](this,_0x2a4eb1,_0x204f51,_0x2bc6f3,_0x30a9d1,_0x17c47e);},Window_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x531)]=function(){return this['_digitGrouping'];},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x5b6)]=Window_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x688)],Window_Base['prototype'][_0x18ba1f(0x688)]=function(_0xacd316,_0x1eda7c,_0x2481a2,_0x312a6a){const _0x3caf7e=_0x18ba1f;var _0x497470=VisuMZ[_0x3caf7e(0x3ea)][_0x3caf7e(0x5b6)][_0x3caf7e(0x2fa)](this,_0xacd316,_0x1eda7c,_0x2481a2,_0x312a6a);if(this[_0x3caf7e(0x145)]())_0x497470['text']=VisuMZ[_0x3caf7e(0x3a9)](_0x497470['text']);return _0x497470;},Window_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x145)]=function(){return this['_digitGroupingEx'];},Window_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x32a)]=function(_0x142588){const _0x331d1b=_0x18ba1f;this[_0x331d1b(0x1a5)]=_0x142588;},Window_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x6a1)]=function(_0x4cd143){const _0x51ae60=_0x18ba1f;this[_0x51ae60(0x43e)]=_0x4cd143;},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x23a)]=Window_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x5c1)],Window_Base['prototype']['drawIcon']=function(_0x3e3f66,_0x388aa4,_0x12cdde){const _0x2aee74=_0x18ba1f;_0x388aa4=Math[_0x2aee74(0x339)](_0x388aa4),_0x12cdde=Math[_0x2aee74(0x339)](_0x12cdde),VisuMZ[_0x2aee74(0x3ea)][_0x2aee74(0x23a)]['call'](this,_0x3e3f66,_0x388aa4,_0x12cdde);},VisuMZ['CoreEngine'][_0x18ba1f(0x2b3)]=Window_Base['prototype'][_0x18ba1f(0x46d)],Window_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x46d)]=function(_0x47a42d,_0xd75953,_0x3082a3,_0x241d0c,_0x7395f1,_0x5194db){const _0x12181e=_0x18ba1f;_0x7395f1=_0x7395f1||ImageManager['faceWidth'],_0x5194db=_0x5194db||ImageManager[_0x12181e(0x197)],_0x3082a3=Math['round'](_0x3082a3),_0x241d0c=Math[_0x12181e(0x339)](_0x241d0c),_0x7395f1=Math['round'](_0x7395f1),_0x5194db=Math['round'](_0x5194db),VisuMZ['CoreEngine'][_0x12181e(0x2b3)][_0x12181e(0x2fa)](this,_0x47a42d,_0xd75953,_0x3082a3,_0x241d0c,_0x7395f1,_0x5194db);},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x2aa)]=Window_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x4ab)],Window_Base[_0x18ba1f(0x5e5)]['drawCharacter']=function(_0x276ef4,_0x334f1a,_0x2f7af0,_0x245bd2){const _0x113dec=_0x18ba1f;_0x2f7af0=Math[_0x113dec(0x339)](_0x2f7af0),_0x245bd2=Math['round'](_0x245bd2),VisuMZ[_0x113dec(0x3ea)][_0x113dec(0x2aa)][_0x113dec(0x2fa)](this,_0x276ef4,_0x334f1a,_0x2f7af0,_0x245bd2);},VisuMZ[_0x18ba1f(0x3ea)]['Window_Selectable_itemRect']=Window_Selectable[_0x18ba1f(0x5e5)][_0x18ba1f(0x2d3)],Window_Selectable[_0x18ba1f(0x5e5)][_0x18ba1f(0x2d3)]=function(_0x255131){const _0x336de4=_0x18ba1f;let _0x4b3aa3=VisuMZ['CoreEngine'][_0x336de4(0x4c2)][_0x336de4(0x2fa)](this,_0x255131);return _0x4b3aa3['x']=Math[_0x336de4(0x339)](_0x4b3aa3['x']),_0x4b3aa3['y']=Math[_0x336de4(0x339)](_0x4b3aa3['y']),_0x4b3aa3['width']=Math[_0x336de4(0x339)](_0x4b3aa3['width']),_0x4b3aa3[_0x336de4(0x13b)]=Math[_0x336de4(0x339)](_0x4b3aa3[_0x336de4(0x13b)]),_0x4b3aa3;},VisuMZ[_0x18ba1f(0x3ea)]['Window_StatusBase_drawActorSimpleStatus']=Window_StatusBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x2da)],Window_StatusBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x2da)]=function(_0x2eb6dd,_0xfad641,_0x4fc10d){const _0x148cb0=_0x18ba1f;_0xfad641=Math['round'](_0xfad641),_0x4fc10d=Math['round'](_0x4fc10d),VisuMZ[_0x148cb0(0x3ea)][_0x148cb0(0x212)]['call'](this,_0x2eb6dd,_0xfad641,_0x4fc10d);},Window_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x18a)]=function(){const _0x1e97e9=_0x18ba1f;this[_0x1e97e9(0x151)]={'duration':0x0,'wholeDuration':0x0,'type':_0x1e97e9(0x690),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this['scale']['x'],'targetScaleY':this[_0x1e97e9(0x30c)]['y'],'targetOpacity':this[_0x1e97e9(0x308)],'targetBackOpacity':this[_0x1e97e9(0x3a2)],'targetContentsOpacity':this[_0x1e97e9(0x64c)]};},Window_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x2fe)]=function(){const _0x4afb16=_0x18ba1f;if(!this[_0x4afb16(0x151)])return;if(this['_coreEasing'][_0x4afb16(0x51c)]<=0x0)return;this['x']=this[_0x4afb16(0x3c7)](this['x'],this['_coreEasing'][_0x4afb16(0x576)]),this['y']=this[_0x4afb16(0x3c7)](this['y'],this['_coreEasing'][_0x4afb16(0x228)]),this[_0x4afb16(0x30c)]['x']=this[_0x4afb16(0x3c7)](this[_0x4afb16(0x30c)]['x'],this[_0x4afb16(0x151)][_0x4afb16(0x1ef)]),this[_0x4afb16(0x30c)]['y']=this[_0x4afb16(0x3c7)](this[_0x4afb16(0x30c)]['y'],this['_coreEasing']['targetScaleY']),this[_0x4afb16(0x308)]=this['applyCoreEasing'](this[_0x4afb16(0x308)],this['_coreEasing']['targetOpacity']),this['backOpacity']=this[_0x4afb16(0x3c7)](this[_0x4afb16(0x3a2)],this['_coreEasing'][_0x4afb16(0x1c1)]),this[_0x4afb16(0x64c)]=this[_0x4afb16(0x3c7)](this[_0x4afb16(0x64c)],this[_0x4afb16(0x151)]['targetContentsOpacity']),this['_coreEasing']['duration']--;},Window_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x3c7)]=function(_0x4f54fe,_0x226b0e){const _0x5eea34=_0x18ba1f;if(!this['_coreEasing'])return _0x226b0e;const _0x190bb0=this[_0x5eea34(0x151)][_0x5eea34(0x51c)],_0x142879=this[_0x5eea34(0x151)][_0x5eea34(0x1c2)],_0x46da85=this[_0x5eea34(0x4c4)]((_0x142879-_0x190bb0)/_0x142879),_0x1e5d76=this[_0x5eea34(0x4c4)]((_0x142879-_0x190bb0+0x1)/_0x142879),_0x2c5e61=(_0x4f54fe-_0x226b0e*_0x46da85)/(0x1-_0x46da85);return _0x2c5e61+(_0x226b0e-_0x2c5e61)*_0x1e5d76;},Window_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x4c4)]=function(_0x22a5a8){const _0x128584=_0x18ba1f;if(!this['_coreEasing'])return _0x22a5a8;return VisuMZ[_0x128584(0x50f)](_0x22a5a8,this[_0x128584(0x151)][_0x128584(0x658)]||_0x128584(0x690));},Window_Base['prototype'][_0x18ba1f(0x368)]=function(_0x2781ae,_0x5f5909){const _0x5dfed1=_0x18ba1f;if(!this[_0x5dfed1(0x151)])return;this['x']=this[_0x5dfed1(0x151)][_0x5dfed1(0x576)],this['y']=this['_coreEasing'][_0x5dfed1(0x228)],this[_0x5dfed1(0x30c)]['x']=this[_0x5dfed1(0x151)][_0x5dfed1(0x1ef)],this[_0x5dfed1(0x30c)]['y']=this[_0x5dfed1(0x151)][_0x5dfed1(0x6a6)],this['opacity']=this[_0x5dfed1(0x151)][_0x5dfed1(0x554)],this['backOpacity']=this[_0x5dfed1(0x151)]['targetBackOpacity'],this[_0x5dfed1(0x64c)]=this[_0x5dfed1(0x151)][_0x5dfed1(0xec)],this[_0x5dfed1(0x691)](_0x2781ae,_0x5f5909,this['x'],this['y'],this[_0x5dfed1(0x30c)]['x'],this[_0x5dfed1(0x30c)]['y'],this[_0x5dfed1(0x308)],this[_0x5dfed1(0x3a2)],this[_0x5dfed1(0x64c)]);},Window_Base[_0x18ba1f(0x5e5)]['setupCoreEasing']=function(_0x2d2247,_0x5466e7,_0x3741d4,_0x631271,_0x12df2e,_0x5b46b3,_0x1d492f,_0x5e9595,_0xd8e6ab){this['_coreEasing']={'duration':_0x2d2247,'wholeDuration':_0x2d2247,'type':_0x5466e7,'targetX':_0x3741d4,'targetY':_0x631271,'targetScaleX':_0x12df2e,'targetScaleY':_0x5b46b3,'targetOpacity':_0x1d492f,'targetBackOpacity':_0x5e9595,'targetContentsOpacity':_0xd8e6ab};},Window_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x463)]=function(_0x95bd72,_0x12ced6,_0x2f2220,_0x444280,_0xdf3ee4){const _0x15f772=_0x18ba1f;this[_0x15f772(0x102)](),this[_0x15f772(0x323)][_0x15f772(0x6a5)]=VisuMZ[_0x15f772(0x3ea)]['Settings'][_0x15f772(0x4a6)]['GoldFontSize'];const _0x57ebee=VisuMZ[_0x15f772(0x3ea)]['Settings'][_0x15f772(0x4a6)][_0x15f772(0x479)];if(_0x57ebee>0x0&&_0x12ced6===TextManager[_0x15f772(0x2d9)]){const _0x4c7689=_0x444280+(this[_0x15f772(0x5f7)]()-ImageManager['iconHeight'])/0x2;this[_0x15f772(0x5c1)](_0x57ebee,_0x2f2220+(_0xdf3ee4-ImageManager[_0x15f772(0x364)]),_0x4c7689),_0xdf3ee4-=ImageManager[_0x15f772(0x364)]+0x4;}else this[_0x15f772(0x2e7)](ColorManager['systemColor']()),this['drawText'](_0x12ced6,_0x2f2220,_0x444280,_0xdf3ee4,_0x15f772(0x1d1)),_0xdf3ee4-=this['textWidth'](_0x12ced6)+0x6;this['resetTextColor']();const _0x5695e0=this[_0x15f772(0x5d6)](this[_0x15f772(0x1a5)]?VisuMZ[_0x15f772(0x3a9)](_0x95bd72):_0x95bd72);_0x5695e0>_0xdf3ee4?this[_0x15f772(0x10c)](VisuMZ[_0x15f772(0x3ea)]['Settings'][_0x15f772(0x4a6)]['GoldOverlap'],_0x2f2220,_0x444280,_0xdf3ee4,_0x15f772(0x1d1)):this['drawText'](_0x95bd72,_0x2f2220,_0x444280,_0xdf3ee4,_0x15f772(0x1d1)),this[_0x15f772(0x102)]();},Window_Base['prototype'][_0x18ba1f(0x495)]=function(_0x5b3e3e,_0x9a1171,_0x102e30,_0x580a2d,_0x499411){const _0x4d6fb6=_0x18ba1f,_0x3c0565=ImageManager['loadSystem'](_0x4d6fb6(0x5b2)),_0x54b9cb=ImageManager[_0x4d6fb6(0x364)],_0x13d9dc=ImageManager['iconHeight'],_0x156598=_0x5b3e3e%0x10*_0x54b9cb,_0x4964d1=Math['floor'](_0x5b3e3e/0x10)*_0x13d9dc,_0x473b13=_0x580a2d,_0x3dcc8b=_0x580a2d;this['contents']['_context'][_0x4d6fb6(0x5af)]=_0x499411,this[_0x4d6fb6(0x323)][_0x4d6fb6(0x358)](_0x3c0565,_0x156598,_0x4964d1,_0x54b9cb,_0x13d9dc,_0x9a1171,_0x102e30,_0x473b13,_0x3dcc8b),this[_0x4d6fb6(0x323)][_0x4d6fb6(0x341)]['imageSmoothingEnabled']=!![];},Window_Base['prototype'][_0x18ba1f(0x523)]=function(_0x221808,_0x57c784,_0x4576e5,_0x18a03b,_0x381db6,_0x4776ea){const _0x3bc847=_0x18ba1f,_0x580be9=Math[_0x3bc847(0x602)]((_0x4576e5-0x2)*_0x18a03b),_0x7692b0=Sprite_Gauge[_0x3bc847(0x5e5)][_0x3bc847(0x242)]['call'](this),_0x6e29ca=_0x57c784+this[_0x3bc847(0x5f7)]()-_0x7692b0-0x2;this[_0x3bc847(0x323)][_0x3bc847(0x1d8)](_0x221808,_0x6e29ca,_0x4576e5,_0x7692b0,ColorManager[_0x3bc847(0x120)]()),this[_0x3bc847(0x323)][_0x3bc847(0x668)](_0x221808+0x1,_0x6e29ca+0x1,_0x580be9,_0x7692b0-0x2,_0x381db6,_0x4776ea);},Window_Selectable['prototype'][_0x18ba1f(0x4a9)]=function(_0x9a0ebc){const _0x54974=_0x18ba1f;let _0x2b7090=this['index']();const _0x123bc2=this[_0x54974(0x62c)](),_0xcc8412=this[_0x54974(0x3bc)]();if(this[_0x54974(0x283)]()&&(_0x2b7090<_0x123bc2||_0x9a0ebc&&_0xcc8412===0x1)){_0x2b7090+=_0xcc8412;if(_0x2b7090>=_0x123bc2)_0x2b7090=_0x123bc2-0x1;this['smoothSelect'](_0x2b7090);}else!this[_0x54974(0x283)]()&&((_0x2b7090<_0x123bc2-_0xcc8412||_0x9a0ebc&&_0xcc8412===0x1)&&this[_0x54974(0x309)]((_0x2b7090+_0xcc8412)%_0x123bc2));},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x3d8)]=Window_Selectable[_0x18ba1f(0x5e5)][_0x18ba1f(0x4a9)],Window_Selectable[_0x18ba1f(0x5e5)][_0x18ba1f(0x4a9)]=function(_0x2b6736){const _0x4d3cfa=_0x18ba1f;this[_0x4d3cfa(0x283)]()&&_0x2b6736&&this[_0x4d3cfa(0x3bc)]()===0x1&&this[_0x4d3cfa(0x61c)]()===this['maxItems']()-0x1?this[_0x4d3cfa(0x309)](0x0):VisuMZ['CoreEngine']['Window_Selectable_cursorDown'][_0x4d3cfa(0x2fa)](this,_0x2b6736);},Window_Selectable[_0x18ba1f(0x5e5)]['cursorUp']=function(_0x95a8a3){const _0x1f8ab4=_0x18ba1f;let _0x436b5a=Math['max'](0x0,this[_0x1f8ab4(0x61c)]());const _0x409de0=this[_0x1f8ab4(0x62c)](),_0x18ac9b=this[_0x1f8ab4(0x3bc)]();if(this[_0x1f8ab4(0x283)]()&&_0x436b5a>0x0||_0x95a8a3&&_0x18ac9b===0x1){_0x436b5a-=_0x18ac9b;if(_0x436b5a<=0x0)_0x436b5a=0x0;this[_0x1f8ab4(0x309)](_0x436b5a);}else!this[_0x1f8ab4(0x283)]()&&((_0x436b5a>=_0x18ac9b||_0x95a8a3&&_0x18ac9b===0x1)&&this[_0x1f8ab4(0x309)]((_0x436b5a-_0x18ac9b+_0x409de0)%_0x409de0));},VisuMZ[_0x18ba1f(0x3ea)]['Window_Selectable_cursorUp']=Window_Selectable[_0x18ba1f(0x5e5)][_0x18ba1f(0x2fc)],Window_Selectable[_0x18ba1f(0x5e5)]['cursorUp']=function(_0x14ac93){const _0x5e7b2d=_0x18ba1f;this[_0x5e7b2d(0x283)]()&&_0x14ac93&&this[_0x5e7b2d(0x3bc)]()===0x1&&this[_0x5e7b2d(0x61c)]()===0x0?this[_0x5e7b2d(0x309)](this['maxItems']()-0x1):VisuMZ[_0x5e7b2d(0x3ea)][_0x5e7b2d(0x1af)][_0x5e7b2d(0x2fa)](this,_0x14ac93);},Window_Selectable[_0x18ba1f(0x5e5)][_0x18ba1f(0x283)]=function(){const _0x5e3175=_0x18ba1f;return VisuMZ[_0x5e3175(0x3ea)][_0x5e3175(0x493)][_0x5e3175(0x2dd)]['ModernControls'];},VisuMZ[_0x18ba1f(0x3ea)]['Window_Selectable_processCursorMove']=Window_Selectable[_0x18ba1f(0x5e5)]['processCursorMove'],Window_Selectable[_0x18ba1f(0x5e5)]['processCursorMove']=function(){const _0x30e951=_0x18ba1f;this[_0x30e951(0x283)]()?(this['processCursorMoveModernControls'](),this[_0x30e951(0x5cd)]()):VisuMZ[_0x30e951(0x3ea)][_0x30e951(0x31e)][_0x30e951(0x2fa)](this);},Window_Selectable['prototype'][_0x18ba1f(0x5c2)]=function(){return!![];},Window_Selectable[_0x18ba1f(0x5e5)]['processCursorMoveModernControls']=function(){const _0x580b41=_0x18ba1f;if(this[_0x580b41(0x552)]()){const _0x5cee30=this['index']();Input['isRepeated'](_0x580b41(0x4a7))&&(Input[_0x580b41(0x5b1)]('shift')&&this[_0x580b41(0x5c2)]()?this[_0x580b41(0x450)]():this['cursorDown'](Input[_0x580b41(0x1e6)]('down'))),Input[_0x580b41(0x3b9)]('up')&&(Input[_0x580b41(0x5b1)](_0x580b41(0x2d8))&&this['allowShiftScrolling']()?this[_0x580b41(0x2f7)]():this[_0x580b41(0x2fc)](Input[_0x580b41(0x1e6)]('up'))),Input[_0x580b41(0x3b9)](_0x580b41(0x1d1))&&this[_0x580b41(0x41c)](Input[_0x580b41(0x1e6)](_0x580b41(0x1d1))),Input[_0x580b41(0x3b9)](_0x580b41(0x54a))&&this['cursorLeft'](Input['isTriggered']('left')),!this[_0x580b41(0x4c3)](_0x580b41(0x403))&&Input['isRepeated'](_0x580b41(0x403))&&this[_0x580b41(0x450)](),!this[_0x580b41(0x4c3)]('pageup')&&Input[_0x580b41(0x3b9)](_0x580b41(0x344))&&this[_0x580b41(0x2f7)](),this['index']()!==_0x5cee30&&this[_0x580b41(0x47c)]();}},Window_Selectable['prototype'][_0x18ba1f(0x5cd)]=function(){const _0x54efe1=_0x18ba1f;if(this[_0x54efe1(0x552)]()){const _0x27d2ad=this[_0x54efe1(0x61c)]();Input[_0x54efe1(0x1e6)](_0x54efe1(0x35a))&&this[_0x54efe1(0x309)](Math[_0x54efe1(0x32c)](this[_0x54efe1(0x61c)](),0x0)),Input[_0x54efe1(0x1e6)](_0x54efe1(0x5d3))&&this[_0x54efe1(0x309)](Math['max'](this['index'](),this[_0x54efe1(0x62c)]()-0x1)),this['index']()!==_0x27d2ad&&this['playCursorSound']();}},VisuMZ[_0x18ba1f(0x3ea)]['Window_Selectable_processTouch']=Window_Selectable['prototype'][_0x18ba1f(0x593)],Window_Selectable[_0x18ba1f(0x5e5)]['processTouch']=function(){const _0x5adc16=_0x18ba1f;this[_0x5adc16(0x283)]()?this[_0x5adc16(0x566)]():VisuMZ[_0x5adc16(0x3ea)][_0x5adc16(0x2d5)][_0x5adc16(0x2fa)](this);},Window_Selectable[_0x18ba1f(0x5e5)][_0x18ba1f(0x566)]=function(){const _0x5a8b3e=_0x18ba1f;VisuMZ[_0x5a8b3e(0x3ea)][_0x5a8b3e(0x2d5)][_0x5a8b3e(0x2fa)](this);},Window_Selectable[_0x18ba1f(0x5e5)][_0x18ba1f(0x692)]=function(){const _0x28a901=_0x18ba1f;return VisuMZ[_0x28a901(0x3ea)]['Settings']['Window'][_0x28a901(0x257)];},Window_Selectable[_0x18ba1f(0x5e5)]['rowSpacing']=function(){const _0x5f5261=_0x18ba1f;return VisuMZ['CoreEngine']['Settings'][_0x5f5261(0x59c)]['RowSpacing'];},Window_Selectable['prototype']['itemHeight']=function(){const _0x28f36d=_0x18ba1f;return Window_Scrollable[_0x28f36d(0x5e5)][_0x28f36d(0x62d)][_0x28f36d(0x2fa)](this)+VisuMZ[_0x28f36d(0x3ea)][_0x28f36d(0x493)][_0x28f36d(0x59c)]['ItemHeight'];;},VisuMZ['CoreEngine'][_0x18ba1f(0x3eb)]=Window_Selectable[_0x18ba1f(0x5e5)][_0x18ba1f(0x2a8)],Window_Selectable[_0x18ba1f(0x5e5)]['drawBackgroundRect']=function(_0x268fb4){const _0x312860=_0x18ba1f,_0x50db94=VisuMZ[_0x312860(0x3ea)][_0x312860(0x493)][_0x312860(0x59c)];if(_0x50db94[_0x312860(0x41b)]===![])return;_0x50db94['DrawItemBackgroundJS']?_0x50db94[_0x312860(0xdb)]['call'](this,_0x268fb4):VisuMZ[_0x312860(0x3ea)][_0x312860(0x3eb)][_0x312860(0x2fa)](this,_0x268fb4);},VisuMZ['CoreEngine'][_0x18ba1f(0x324)]=Window_Gold[_0x18ba1f(0x5e5)][_0x18ba1f(0x4e4)],Window_Gold[_0x18ba1f(0x5e5)][_0x18ba1f(0x4e4)]=function(){const _0x235eea=_0x18ba1f;this[_0x235eea(0x209)]()?this[_0x235eea(0xd8)]():VisuMZ[_0x235eea(0x3ea)][_0x235eea(0x324)][_0x235eea(0x2fa)](this);},Window_Gold[_0x18ba1f(0x5e5)][_0x18ba1f(0x209)]=function(){const _0xf29d06=_0x18ba1f;if(TextManager['currencyUnit']!==this[_0xf29d06(0x2d9)]())return![];return VisuMZ[_0xf29d06(0x3ea)][_0xf29d06(0x493)][_0xf29d06(0x4a6)][_0xf29d06(0x4ec)];},Window_Gold[_0x18ba1f(0x5e5)][_0x18ba1f(0xd8)]=function(){const _0x47392d=_0x18ba1f;this[_0x47392d(0x102)](),this[_0x47392d(0x323)][_0x47392d(0x111)](),this['contents'][_0x47392d(0x6a5)]=VisuMZ[_0x47392d(0x3ea)]['Settings'][_0x47392d(0x4a6)][_0x47392d(0x5a8)];const _0x35d784=VisuMZ['CoreEngine']['Settings'][_0x47392d(0x4a6)][_0x47392d(0x479)],_0x8269f1=this['itemLineRect'](0x0);if(_0x35d784>0x0){const _0x547773=_0x8269f1['y']+(this['lineHeight']()-ImageManager[_0x47392d(0x501)])/0x2;this[_0x47392d(0x5c1)](_0x35d784,_0x8269f1['x'],_0x547773);const _0x23ea01=ImageManager[_0x47392d(0x364)]+0x4;_0x8269f1['x']+=_0x23ea01,_0x8269f1[_0x47392d(0x259)]-=_0x23ea01;}this[_0x47392d(0x2e7)](ColorManager[_0x47392d(0x3af)]()),this[_0x47392d(0x10c)](this[_0x47392d(0x2d9)](),_0x8269f1['x'],_0x8269f1['y'],_0x8269f1[_0x47392d(0x259)],_0x47392d(0x54a));const _0x37b513=this[_0x47392d(0x5d6)](this[_0x47392d(0x2d9)]())+0x6;;_0x8269f1['x']+=_0x37b513,_0x8269f1[_0x47392d(0x259)]-=_0x37b513,this[_0x47392d(0x571)]();const _0x70eafe=this['value'](),_0x26780e=this[_0x47392d(0x5d6)](this['_digitGrouping']?VisuMZ[_0x47392d(0x3a9)](this[_0x47392d(0x483)]()):this[_0x47392d(0x483)]());_0x26780e>_0x8269f1[_0x47392d(0x259)]?this[_0x47392d(0x10c)](VisuMZ[_0x47392d(0x3ea)][_0x47392d(0x493)][_0x47392d(0x4a6)]['GoldOverlap'],_0x8269f1['x'],_0x8269f1['y'],_0x8269f1[_0x47392d(0x259)],_0x47392d(0x1d1)):this[_0x47392d(0x10c)](this[_0x47392d(0x483)](),_0x8269f1['x'],_0x8269f1['y'],_0x8269f1[_0x47392d(0x259)],_0x47392d(0x1d1)),this[_0x47392d(0x102)]();},Window_StatusBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x37f)]=function(_0x33e2a7,_0x142740,_0x2cff4d,_0x49c9f2,_0x464fbd){const _0x1bda4a=_0x18ba1f;_0x49c9f2=String(_0x49c9f2||'')[_0x1bda4a(0x347)]();if(VisuMZ[_0x1bda4a(0x3ea)][_0x1bda4a(0x493)][_0x1bda4a(0x1ed)][_0x1bda4a(0x238)]){const _0x12a7a7=VisuMZ[_0x1bda4a(0x16f)](_0x49c9f2);_0x464fbd?(this['drawIconBySize'](_0x12a7a7,_0x33e2a7,_0x142740,this['gaugeLineHeight']()),_0x2cff4d-=this[_0x1bda4a(0x383)]()+0x2,_0x33e2a7+=this[_0x1bda4a(0x383)]()+0x2):(this[_0x1bda4a(0x5c1)](_0x12a7a7,_0x33e2a7+0x2,_0x142740+0x2),_0x2cff4d-=ImageManager[_0x1bda4a(0x364)]+0x4,_0x33e2a7+=ImageManager['iconWidth']+0x4);}const _0x19d390=TextManager[_0x1bda4a(0x17a)](_0x49c9f2);this[_0x1bda4a(0x102)](),this[_0x1bda4a(0x2e7)](ColorManager[_0x1bda4a(0x3af)]()),_0x464fbd?(this[_0x1bda4a(0x323)][_0x1bda4a(0x6a5)]=this[_0x1bda4a(0x14f)](),this[_0x1bda4a(0x323)][_0x1bda4a(0x10c)](_0x19d390,_0x33e2a7,_0x142740,_0x2cff4d,this[_0x1bda4a(0x383)](),_0x1bda4a(0x54a))):this[_0x1bda4a(0x10c)](_0x19d390,_0x33e2a7,_0x142740,_0x2cff4d),this['resetFontSettings']();},Window_StatusBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x14f)]=function(){return $gameSystem['mainFontSize']()-0x8;},Window_StatusBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x656)]=function(_0x42af2f,_0xb0b4bb,_0xadc064,_0x20061a){const _0x12142a=_0x18ba1f;_0x20061a=_0x20061a||0xa8,this['resetTextColor']();if(VisuMZ[_0x12142a(0x3ea)][_0x12142a(0x493)]['UI']['TextCodeClassNames'])this['drawTextEx'](_0x42af2f[_0x12142a(0x266)]()[_0x12142a(0x5e3)],_0xb0b4bb,_0xadc064,_0x20061a);else{const _0x171331=_0x42af2f[_0x12142a(0x266)]()[_0x12142a(0x5e3)][_0x12142a(0x5fa)](/\\I\[(\d+)\]/gi,'');this[_0x12142a(0x10c)](_0x171331,_0xb0b4bb,_0xadc064,_0x20061a);}},Window_StatusBase[_0x18ba1f(0x5e5)]['drawActorNickname']=function(_0x968835,_0x266efc,_0x2c14dc,_0x5d449a){const _0x19365a=_0x18ba1f;_0x5d449a=_0x5d449a||0x10e,this[_0x19365a(0x571)]();if(VisuMZ['CoreEngine'][_0x19365a(0x493)]['UI']['TextCodeNicknames'])this['drawTextEx'](_0x968835[_0x19365a(0x4a0)](),_0x266efc,_0x2c14dc,_0x5d449a);else{const _0x182591=_0x968835[_0x19365a(0x4a0)]()[_0x19365a(0x5fa)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x968835['nickname'](),_0x266efc,_0x2c14dc,_0x5d449a);}},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x1bb)]=Window_StatusBase['prototype']['drawActorLevel'],Window_StatusBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x2a2)]=function(_0x1ca08f,_0x3a4a14,_0x14600a){const _0x203347=_0x18ba1f;if(this[_0x203347(0x5eb)]())this[_0x203347(0x3d5)](_0x1ca08f,_0x3a4a14,_0x14600a);VisuMZ[_0x203347(0x3ea)][_0x203347(0x1bb)][_0x203347(0x2fa)](this,_0x1ca08f,_0x3a4a14,_0x14600a);},Window_StatusBase[_0x18ba1f(0x5e5)]['isExpGaugeDrawn']=function(){const _0x1a9fe9=_0x18ba1f;return VisuMZ[_0x1a9fe9(0x3ea)][_0x1a9fe9(0x493)]['UI']['LvExpGauge'];},Window_StatusBase[_0x18ba1f(0x5e5)][_0x18ba1f(0x3d5)]=function(_0x21ab3c,_0x3d58b1,_0x511fcf){const _0x5ed25f=_0x18ba1f;if(!_0x21ab3c)return;if(!_0x21ab3c[_0x5ed25f(0x408)]())return;const _0x1a0649=0x80,_0x524c7c=_0x21ab3c[_0x5ed25f(0x4bd)]();let _0xa1dab2=ColorManager[_0x5ed25f(0x12f)](),_0x5366f0=ColorManager[_0x5ed25f(0x494)]();_0x524c7c>=0x1&&(_0xa1dab2=ColorManager[_0x5ed25f(0x5ff)](),_0x5366f0=ColorManager[_0x5ed25f(0x132)]()),this[_0x5ed25f(0x523)](_0x3d58b1,_0x511fcf,_0x1a0649,_0x524c7c,_0xa1dab2,_0x5366f0);},Window_EquipStatus['prototype'][_0x18ba1f(0x4fe)]=function(){const _0x419eff=_0x18ba1f;let _0x1b0f08=0x0;for(const _0x3c37f4 of VisuMZ[_0x419eff(0x3ea)][_0x419eff(0x493)]['Param'][_0x419eff(0x687)]){const _0x4cbc6a=this[_0x419eff(0x2ce)](),_0x54cc29=this[_0x419eff(0x4ad)](_0x1b0f08);this[_0x419eff(0x2c8)](_0x4cbc6a,_0x54cc29,_0x3c37f4),_0x1b0f08++;}},Window_EquipStatus[_0x18ba1f(0x5e5)][_0x18ba1f(0x1be)]=function(_0xf18622,_0xba2bc2,_0x4867ba){const _0x477e21=_0x18ba1f,_0xa9eef5=this['paramX']()-this[_0x477e21(0x2ce)]()*0x2;this[_0x477e21(0x37f)](_0xf18622,_0xba2bc2,_0xa9eef5,_0x4867ba,![]);},Window_EquipStatus[_0x18ba1f(0x5e5)][_0x18ba1f(0x1f0)]=function(_0x2da601,_0x1777e6,_0x35af1f){const _0x14aec6=_0x18ba1f,_0x9e83aa=this[_0x14aec6(0x187)]();this[_0x14aec6(0x571)](),this[_0x14aec6(0x10c)](this[_0x14aec6(0x3a0)][_0x14aec6(0x5b0)](_0x35af1f,!![]),_0x2da601,_0x1777e6,_0x9e83aa,'right');},Window_EquipStatus[_0x18ba1f(0x5e5)]['drawRightArrow']=function(_0x51048a,_0x1e5c83){const _0x41965b=_0x18ba1f,_0x3a116c=this['rightArrowWidth']();this[_0x41965b(0x2e7)](ColorManager[_0x41965b(0x3af)]());const _0x2fee5d=VisuMZ[_0x41965b(0x3ea)][_0x41965b(0x493)]['UI'][_0x41965b(0x4da)];this[_0x41965b(0x10c)](_0x2fee5d,_0x51048a,_0x1e5c83,_0x3a116c,_0x41965b(0x52a));},Window_EquipStatus[_0x18ba1f(0x5e5)][_0x18ba1f(0x4e9)]=function(_0x48a3fe,_0x4131d1,_0x256e15){const _0x287290=_0x18ba1f,_0x51038e=this['paramWidth'](),_0x2ca4ed=this[_0x287290(0x680)][_0x287290(0x5b0)](_0x256e15),_0x4d4c50=_0x2ca4ed-this[_0x287290(0x3a0)][_0x287290(0x5b0)](_0x256e15);this[_0x287290(0x2e7)](ColorManager[_0x287290(0x205)](_0x4d4c50)),this[_0x287290(0x10c)](VisuMZ[_0x287290(0x657)](_0x2ca4ed,0x0,_0x256e15),_0x48a3fe,_0x4131d1,_0x51038e,_0x287290(0x1d1));},VisuMZ['CoreEngine'][_0x18ba1f(0x219)]=Window_EquipItem[_0x18ba1f(0x5e5)][_0x18ba1f(0x536)],Window_EquipItem[_0x18ba1f(0x5e5)][_0x18ba1f(0x536)]=function(_0x224290){const _0x560c25=_0x18ba1f;return _0x224290&&this[_0x560c25(0x3a0)]?this[_0x560c25(0x3a0)]['canEquip'](_0x224290):VisuMZ['CoreEngine'][_0x560c25(0x219)]['call'](this,_0x224290);},Window_StatusParams[_0x18ba1f(0x5e5)][_0x18ba1f(0x62c)]=function(){const _0x4073a2=_0x18ba1f;return VisuMZ[_0x4073a2(0x3ea)][_0x4073a2(0x493)][_0x4073a2(0x1ed)][_0x4073a2(0x687)][_0x4073a2(0x397)];},Window_StatusParams[_0x18ba1f(0x5e5)]['drawItem']=function(_0x3da842){const _0x2d3f98=_0x18ba1f,_0x5725ac=this['itemLineRect'](_0x3da842),_0x3fa05f=VisuMZ['CoreEngine'][_0x2d3f98(0x493)][_0x2d3f98(0x1ed)][_0x2d3f98(0x687)][_0x3da842],_0x374b32=TextManager[_0x2d3f98(0x17a)](_0x3fa05f),_0x4b724d=this[_0x2d3f98(0x3a0)][_0x2d3f98(0x5b0)](_0x3fa05f,!![]);this[_0x2d3f98(0x37f)](_0x5725ac['x'],_0x5725ac['y'],0xa0,_0x3fa05f,![]),this[_0x2d3f98(0x571)](),this[_0x2d3f98(0x10c)](_0x4b724d,_0x5725ac['x']+0xa0,_0x5725ac['y'],0x3c,_0x2d3f98(0x1d1));};if(VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x493)][_0x18ba1f(0x16e)]['EnableNameInput']){VisuMZ['CoreEngine']['Settings']['KeyboardInput'][_0x18ba1f(0x352)]&&(Window_NameInput[_0x18ba1f(0x626)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20','Page','OK']);;VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x468)]=Window_NameInput[_0x18ba1f(0x5e5)][_0x18ba1f(0x117)],Window_NameInput[_0x18ba1f(0x5e5)]['initialize']=function(_0x26bfb8){const _0x3ca844=_0x18ba1f;this[_0x3ca844(0x26c)]=this['defaultInputMode'](),VisuMZ[_0x3ca844(0x3ea)][_0x3ca844(0x468)][_0x3ca844(0x2fa)](this,_0x26bfb8),this[_0x3ca844(0x26c)]===_0x3ca844(0x118)?this[_0x3ca844(0x2d6)](0x0):(Input['clear'](),this[_0x3ca844(0x4cf)]());},Window_NameInput[_0x18ba1f(0x5e5)][_0x18ba1f(0x549)]=function(){const _0x1160f8=_0x18ba1f;if(Input[_0x1160f8(0x34a)]())return _0x1160f8(0x118);return VisuMZ[_0x1160f8(0x3ea)]['Settings']['KeyboardInput'][_0x1160f8(0x426)]||'keyboard';},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x1f2)]=Window_NameInput[_0x18ba1f(0x5e5)][_0x18ba1f(0x4fc)],Window_NameInput[_0x18ba1f(0x5e5)][_0x18ba1f(0x4fc)]=function(){const _0x23e87b=_0x18ba1f;if(!this[_0x23e87b(0x2cb)]())return;if(!this[_0x23e87b(0x350)])return;if(this[_0x23e87b(0x26c)]==='keyboard'&&Input[_0x23e87b(0x569)]())this[_0x23e87b(0x36d)](_0x23e87b(0x118));else{if(Input[_0x23e87b(0x57f)](_0x23e87b(0x34c)))Input[_0x23e87b(0x111)](),this[_0x23e87b(0x244)]();else{if(Input[_0x23e87b(0x1e6)](_0x23e87b(0x2a3)))Input['clear'](),this[_0x23e87b(0x26c)]===_0x23e87b(0x53c)?this[_0x23e87b(0x36d)](_0x23e87b(0x118)):this['switchModes'](_0x23e87b(0x53c));else{if(this[_0x23e87b(0x26c)]==='keyboard')this['processKeyboardHandling']();else Input[_0x23e87b(0x57f)](_0x23e87b(0x3ba))?(Input[_0x23e87b(0x111)](),this[_0x23e87b(0x36d)](_0x23e87b(0x53c))):VisuMZ['CoreEngine'][_0x23e87b(0x1f2)][_0x23e87b(0x2fa)](this);}}}},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x206)]=Window_NameInput[_0x18ba1f(0x5e5)]['processTouch'],Window_NameInput[_0x18ba1f(0x5e5)]['processTouch']=function(){const _0x30cc4a=_0x18ba1f;if(!this['isOpenAndActive']())return;if(this['_mode']===_0x30cc4a(0x53c)){if(TouchInput['isTriggered']()&&this[_0x30cc4a(0x2a4)]())this[_0x30cc4a(0x36d)]('default');else TouchInput[_0x30cc4a(0x2b8)]()&&this[_0x30cc4a(0x36d)](_0x30cc4a(0x118));}else VisuMZ[_0x30cc4a(0x3ea)][_0x30cc4a(0x206)][_0x30cc4a(0x2fa)](this);},Window_NameInput[_0x18ba1f(0x5e5)][_0x18ba1f(0x5e2)]=function(){const _0x5a38e3=_0x18ba1f;if(Input[_0x5a38e3(0x57f)](_0x5a38e3(0x5b7)))Input['clear'](),this[_0x5a38e3(0xfb)]();else{if(Input[_0x5a38e3(0x5e7)]!==undefined){let _0x261871=Input[_0x5a38e3(0x5e7)],_0x5af13b=_0x261871[_0x5a38e3(0x397)];for(let _0x11af50=0x0;_0x11af50<_0x5af13b;++_0x11af50){this[_0x5a38e3(0x64d)]['add'](_0x261871[_0x11af50])?SoundManager[_0x5a38e3(0x173)]():SoundManager[_0x5a38e3(0x54f)]();}Input['clear']();}}},Window_NameInput[_0x18ba1f(0x5e5)]['switchModes']=function(_0x5a1efd){const _0x5490e4=_0x18ba1f;let _0xe4b4e9=this[_0x5490e4(0x26c)];this['_mode']=_0x5a1efd,_0xe4b4e9!==this[_0x5490e4(0x26c)]&&(this['refresh'](),SoundManager['playOk'](),this['_mode']===_0x5490e4(0x118)?this[_0x5490e4(0x2d6)](0x0):this[_0x5490e4(0x2d6)](-0x1));},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x235)]=Window_NameInput[_0x18ba1f(0x5e5)]['cursorDown'],Window_NameInput[_0x18ba1f(0x5e5)][_0x18ba1f(0x4a9)]=function(_0x5d1905){const _0x5f4069=_0x18ba1f;if(this['_mode']===_0x5f4069(0x53c)&&!Input['isArrowPressed']())return;if(Input[_0x5f4069(0x179)]())return;VisuMZ[_0x5f4069(0x3ea)][_0x5f4069(0x235)][_0x5f4069(0x2fa)](this,_0x5d1905),this['switchModes'](_0x5f4069(0x118));},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x5ab)]=Window_NameInput[_0x18ba1f(0x5e5)]['cursorUp'],Window_NameInput['prototype'][_0x18ba1f(0x2fc)]=function(_0x2a19af){const _0x26a2c7=_0x18ba1f;if(this[_0x26a2c7(0x26c)]==='keyboard'&&!Input['isArrowPressed']())return;if(Input[_0x26a2c7(0x179)]())return;VisuMZ[_0x26a2c7(0x3ea)][_0x26a2c7(0x5ab)]['call'](this,_0x2a19af),this[_0x26a2c7(0x36d)](_0x26a2c7(0x118));},VisuMZ[_0x18ba1f(0x3ea)]['Window_NameInput_cursorRight']=Window_NameInput['prototype']['cursorRight'],Window_NameInput[_0x18ba1f(0x5e5)][_0x18ba1f(0x41c)]=function(_0x4d6eb0){const _0x4b1bb2=_0x18ba1f;if(this[_0x4b1bb2(0x26c)]==='keyboard'&&!Input['isArrowPressed']())return;if(Input[_0x4b1bb2(0x179)]())return;VisuMZ[_0x4b1bb2(0x3ea)][_0x4b1bb2(0x3aa)]['call'](this,_0x4d6eb0),this[_0x4b1bb2(0x36d)]('default');},VisuMZ[_0x18ba1f(0x3ea)]['Window_NameInput_cursorLeft']=Window_NameInput[_0x18ba1f(0x5e5)][_0x18ba1f(0x4ce)],Window_NameInput[_0x18ba1f(0x5e5)]['cursorLeft']=function(_0x21f9e8){const _0x2d48c3=_0x18ba1f;if(this[_0x2d48c3(0x26c)]===_0x2d48c3(0x53c)&&!Input[_0x2d48c3(0x55a)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x2d48c3(0x3ea)][_0x2d48c3(0x3f1)][_0x2d48c3(0x2fa)](this,_0x21f9e8),this[_0x2d48c3(0x36d)]('default');},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x2ff)]=Window_NameInput[_0x18ba1f(0x5e5)]['cursorPagedown'],Window_NameInput['prototype']['cursorPagedown']=function(){const _0x12b584=_0x18ba1f;if(this[_0x12b584(0x26c)]===_0x12b584(0x53c))return;if(Input['isNumpadPressed']())return;VisuMZ[_0x12b584(0x3ea)]['Window_NameInput_cursorPagedown'][_0x12b584(0x2fa)](this),this[_0x12b584(0x36d)](_0x12b584(0x118));},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x6a8)]=Window_NameInput[_0x18ba1f(0x5e5)][_0x18ba1f(0x2f7)],Window_NameInput['prototype']['cursorPageup']=function(){const _0x5f342b=_0x18ba1f;if(this[_0x5f342b(0x26c)]===_0x5f342b(0x53c))return;if(Input[_0x5f342b(0x179)]())return;VisuMZ[_0x5f342b(0x3ea)]['Window_NameInput_cursorPageup'][_0x5f342b(0x2fa)](this),this[_0x5f342b(0x36d)](_0x5f342b(0x118));},VisuMZ[_0x18ba1f(0x3ea)]['Window_NameInput_refresh']=Window_NameInput[_0x18ba1f(0x5e5)][_0x18ba1f(0x4e4)],Window_NameInput[_0x18ba1f(0x5e5)][_0x18ba1f(0x4e4)]=function(){const _0x15ee9=_0x18ba1f;if(this[_0x15ee9(0x26c)]===_0x15ee9(0x53c)){this[_0x15ee9(0x323)][_0x15ee9(0x111)](),this['contentsBack'][_0x15ee9(0x111)](),this[_0x15ee9(0x571)]();let _0x2d3d17=VisuMZ[_0x15ee9(0x3ea)]['Settings']['KeyboardInput'][_0x15ee9(0x6ab)][_0x15ee9(0x6b0)]('\x0a'),_0x388463=_0x2d3d17[_0x15ee9(0x397)],_0x522a61=(this[_0x15ee9(0x4bb)]-_0x388463*this[_0x15ee9(0x5f7)]())/0x2;for(let _0x43127f=0x0;_0x43127f<_0x388463;++_0x43127f){let _0x229444=_0x2d3d17[_0x43127f],_0x88755f=this[_0x15ee9(0x40d)](_0x229444)[_0x15ee9(0x259)],_0x105bd2=Math[_0x15ee9(0x602)]((this[_0x15ee9(0x323)]['width']-_0x88755f)/0x2);this[_0x15ee9(0x60b)](_0x229444,_0x105bd2,_0x522a61),_0x522a61+=this[_0x15ee9(0x5f7)]();}}else VisuMZ['CoreEngine'][_0x15ee9(0x216)][_0x15ee9(0x2fa)](this);};};VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x553)]=Window_ShopSell['prototype'][_0x18ba1f(0x536)],Window_ShopSell['prototype'][_0x18ba1f(0x536)]=function(_0x42bc3f){const _0x500b65=_0x18ba1f;return VisuMZ[_0x500b65(0x3ea)]['Settings'][_0x500b65(0x2dd)]['KeyItemProtect']&&DataManager[_0x500b65(0x168)](_0x42bc3f)?![]:VisuMZ[_0x500b65(0x3ea)][_0x500b65(0x553)][_0x500b65(0x2fa)](this,_0x42bc3f);},Window_NumberInput['prototype'][_0x18ba1f(0x283)]=function(){return![];};VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x493)]['KeyboardInput'][_0x18ba1f(0x258)]&&(VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x5f1)]=Window_NumberInput[_0x18ba1f(0x5e5)][_0x18ba1f(0x591)],Window_NumberInput['prototype'][_0x18ba1f(0x591)]=function(){const _0x4fa905=_0x18ba1f;VisuMZ['CoreEngine'][_0x4fa905(0x5f1)][_0x4fa905(0x2fa)](this),this[_0x4fa905(0x2d6)](this[_0x4fa905(0x2a6)]-0x1);},VisuMZ[_0x18ba1f(0x3ea)]['Window_NumberInput_processDigitChange']=Window_NumberInput[_0x18ba1f(0x5e5)]['processDigitChange'],Window_NumberInput['prototype']['processDigitChange']=function(){const _0x158095=_0x18ba1f;if(!this[_0x158095(0x169)]())return;if(Input[_0x158095(0x179)]())this[_0x158095(0x6aa)]();else{if(Input[_0x158095(0x57f)]('backspace'))this['processKeyboardBackspace']();else{if(Input[_0x158095(0x663)]===0x2e)this[_0x158095(0x125)]();else{if(Input[_0x158095(0x663)]===0x24)this['processKeyboardHome']();else Input[_0x158095(0x663)]===0x23?this[_0x158095(0x1b9)]():(VisuMZ[_0x158095(0x3ea)]['Window_NumberInput_processDigitChange']['call'](this),Input[_0x158095(0x111)]());}}}},Window_NumberInput[_0x18ba1f(0x5e5)][_0x18ba1f(0x14a)]=function(){const _0x49f010=_0x18ba1f;if(!this[_0x49f010(0x552)]())return;Input[_0x49f010(0x179)]()?this[_0x49f010(0x6aa)]():Window_Selectable[_0x49f010(0x5e5)][_0x49f010(0x14a)][_0x49f010(0x2fa)](this);},Window_NumberInput[_0x18ba1f(0x5e5)][_0x18ba1f(0x5cd)]=function(){},Window_NumberInput[_0x18ba1f(0x5e5)]['processKeyboardDigitChange']=function(){const _0x260262=_0x18ba1f;if(String(this[_0x260262(0x38b)])[_0x260262(0x397)]>=this[_0x260262(0x2a6)])return;this[_0x260262(0x38b)]=Number(String(this[_0x260262(0x38b)])+Input['_inputString']);const _0x2807a0='9'[_0x260262(0x41a)](this[_0x260262(0x2a6)]);this['_number']=this[_0x260262(0x38b)][_0x260262(0x21d)](0x0,_0x2807a0),Input['clear'](),this[_0x260262(0x4e4)](),SoundManager[_0x260262(0x13a)](),this[_0x260262(0x2d6)](this[_0x260262(0x2a6)]-0x1);},Window_NumberInput[_0x18ba1f(0x5e5)][_0x18ba1f(0x5d9)]=function(){const _0x2ab4a4=_0x18ba1f;this[_0x2ab4a4(0x38b)]=Number(String(this[_0x2ab4a4(0x38b)])[_0x2ab4a4(0x68e)](0x0,-0x1)),this[_0x2ab4a4(0x38b)]=Math[_0x2ab4a4(0x5c8)](0x0,this[_0x2ab4a4(0x38b)]),Input['clear'](),this[_0x2ab4a4(0x4e4)](),SoundManager['playCursor'](),this['select'](this[_0x2ab4a4(0x2a6)]-0x1);},Window_NumberInput[_0x18ba1f(0x5e5)][_0x18ba1f(0x125)]=function(){const _0x19079e=_0x18ba1f;this['_number']=Number(String(this['_number'])[_0x19079e(0x27d)](0x1)),this[_0x19079e(0x38b)]=Math['max'](0x0,this['_number']),Input[_0x19079e(0x111)](),this[_0x19079e(0x4e4)](),SoundManager[_0x19079e(0x13a)](),this['select'](this[_0x19079e(0x2a6)]-0x1);});;Window_TitleCommand[_0x18ba1f(0x502)]=VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x493)]['TitleCommandList'],Window_TitleCommand[_0x18ba1f(0x5e5)]['makeCommandList']=function(){const _0x175c3a=_0x18ba1f;this[_0x175c3a(0x4ca)]();},Window_TitleCommand[_0x18ba1f(0x5e5)][_0x18ba1f(0x4ca)]=function(){const _0x4f14e3=_0x18ba1f;for(const _0x2532ca of Window_TitleCommand[_0x4f14e3(0x502)]){if(_0x2532ca[_0x4f14e3(0x43c)]['call'](this)){const _0x369a2c=_0x2532ca['Symbol'];let _0x178629=_0x2532ca['TextStr'];if(['',_0x4f14e3(0x2d1)][_0x4f14e3(0x1b8)](_0x178629))_0x178629=_0x2532ca[_0x4f14e3(0x160)]['call'](this);const _0x2ef658=_0x2532ca[_0x4f14e3(0x538)]['call'](this),_0x19589d=_0x2532ca['ExtJS'][_0x4f14e3(0x2fa)](this);this['addCommand'](_0x178629,_0x369a2c,_0x2ef658,_0x19589d),this[_0x4f14e3(0x337)](_0x369a2c,_0x2532ca['CallHandlerJS'][_0x4f14e3(0x106)](this,_0x19589d));}}},Window_GameEnd['_commandList']=VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x493)]['MenuLayout'][_0x18ba1f(0x47f)][_0x18ba1f(0x61e)],Window_GameEnd[_0x18ba1f(0x5e5)][_0x18ba1f(0x56d)]=function(){const _0xd7e542=_0x18ba1f;this[_0xd7e542(0x4ca)]();},Window_GameEnd['prototype'][_0x18ba1f(0x4ca)]=function(){const _0x248686=_0x18ba1f;for(const _0x4a3baa of Window_GameEnd[_0x248686(0x502)]){if(_0x4a3baa['ShowJS'][_0x248686(0x2fa)](this)){const _0x57ce73=_0x4a3baa['Symbol'];let _0x3da2b1=_0x4a3baa[_0x248686(0x33c)];if(['',_0x248686(0x2d1)][_0x248686(0x1b8)](_0x3da2b1))_0x3da2b1=_0x4a3baa[_0x248686(0x160)][_0x248686(0x2fa)](this);const _0xa6d3ad=_0x4a3baa[_0x248686(0x538)]['call'](this),_0x214abd=_0x4a3baa[_0x248686(0x528)][_0x248686(0x2fa)](this);this[_0x248686(0x34d)](_0x3da2b1,_0x57ce73,_0xa6d3ad,_0x214abd),this[_0x248686(0x337)](_0x57ce73,_0x4a3baa[_0x248686(0x189)]['bind'](this,_0x214abd));}}};function Window_ButtonAssist(){const _0x46cdd0=_0x18ba1f;this[_0x46cdd0(0x117)](...arguments);}Window_ButtonAssist[_0x18ba1f(0x5e5)]=Object[_0x18ba1f(0x1e9)](Window_Base[_0x18ba1f(0x5e5)]),Window_ButtonAssist[_0x18ba1f(0x5e5)][_0x18ba1f(0x288)]=Window_ButtonAssist,Window_ButtonAssist[_0x18ba1f(0x5e5)][_0x18ba1f(0x117)]=function(_0x469eb7){const _0x10b001=_0x18ba1f;this[_0x10b001(0x1f6)]={},Window_Base['prototype'][_0x10b001(0x117)]['call'](this,_0x469eb7),this[_0x10b001(0x28e)](VisuMZ[_0x10b001(0x3ea)][_0x10b001(0x493)][_0x10b001(0x32e)][_0x10b001(0x19a)]||0x0),this[_0x10b001(0x4e4)]();},Window_ButtonAssist['prototype'][_0x18ba1f(0x177)]=function(){const _0x5487fe=_0x18ba1f;this['contents'][_0x5487fe(0x6a5)]<=0x60&&(this['contents'][_0x5487fe(0x6a5)]+=0x6);},Window_ButtonAssist[_0x18ba1f(0x5e5)][_0x18ba1f(0x2bd)]=function(){const _0x461896=_0x18ba1f;this['contents']['fontSize']>=0x18&&(this[_0x461896(0x323)][_0x461896(0x6a5)]-=0x6);},Window_ButtonAssist[_0x18ba1f(0x5e5)][_0x18ba1f(0x285)]=function(){const _0x3b6609=_0x18ba1f;Window_Base[_0x3b6609(0x5e5)]['update'][_0x3b6609(0x2fa)](this),this[_0x3b6609(0x646)]();},Window_ButtonAssist[_0x18ba1f(0x5e5)][_0x18ba1f(0x461)]=function(){const _0x2a4128=_0x18ba1f;this[_0x2a4128(0x3ff)]=SceneManager[_0x2a4128(0x3bd)]['getButtonAssistLocation']()!==_0x2a4128(0x459)?0x0:0x8;},Window_ButtonAssist[_0x18ba1f(0x5e5)][_0x18ba1f(0x646)]=function(){const _0x29906d=_0x18ba1f,_0x32914e=SceneManager[_0x29906d(0x3bd)];for(let _0xa1372e=0x1;_0xa1372e<=0x5;_0xa1372e++){if(this['_data'][_0x29906d(0x5c5)[_0x29906d(0x400)](_0xa1372e)]!==_0x32914e[_0x29906d(0x629)[_0x29906d(0x400)](_0xa1372e)]())return this['refresh']();if(this[_0x29906d(0x1f6)]['text%1'['format'](_0xa1372e)]!==_0x32914e[_0x29906d(0x458)[_0x29906d(0x400)](_0xa1372e)]())return this[_0x29906d(0x4e4)]();}},Window_ButtonAssist[_0x18ba1f(0x5e5)][_0x18ba1f(0x4e4)]=function(){const _0x4a8711=_0x18ba1f;this[_0x4a8711(0x323)]['clear']();for(let _0x28247c=0x1;_0x28247c<=0x5;_0x28247c++){this[_0x4a8711(0x105)](_0x28247c);}},Window_ButtonAssist[_0x18ba1f(0x5e5)][_0x18ba1f(0x105)]=function(_0x12fd49){const _0x26f0cf=_0x18ba1f,_0x393218=this['innerWidth']/0x5,_0x48e995=SceneManager[_0x26f0cf(0x3bd)],_0x9e09=_0x48e995['buttonAssistKey%1'[_0x26f0cf(0x400)](_0x12fd49)](),_0x3f601b=_0x48e995[_0x26f0cf(0x458)['format'](_0x12fd49)]();this[_0x26f0cf(0x1f6)][_0x26f0cf(0x5c5)[_0x26f0cf(0x400)](_0x12fd49)]=_0x9e09,this['_data']['text%1'[_0x26f0cf(0x400)](_0x12fd49)]=_0x3f601b;if(_0x9e09==='')return;if(_0x3f601b==='')return;const _0x436f74=_0x48e995[_0x26f0cf(0x261)[_0x26f0cf(0x400)](_0x12fd49)](),_0xa9c3e2=this['itemPadding'](),_0x327084=_0x393218*(_0x12fd49-0x1)+_0xa9c3e2+_0x436f74,_0x3adf0d=VisuMZ[_0x26f0cf(0x3ea)]['Settings'][_0x26f0cf(0x32e)]['TextFmt'];this[_0x26f0cf(0x60b)](_0x3adf0d[_0x26f0cf(0x400)](_0x9e09,_0x3f601b),_0x327084,0x0,_0x393218-_0xa9c3e2*0x2);},VisuMZ[_0x18ba1f(0x36c)]=function(_0x53886c){const _0x28f967=_0x18ba1f;if(Utils[_0x28f967(0x1e0)](_0x28f967(0x454))){var _0x482841=require('nw.gui')[_0x28f967(0x59c)][_0x28f967(0xfa)]();SceneManager[_0x28f967(0x4fb)]();if(_0x53886c)setTimeout(_0x482841[_0x28f967(0x5ce)][_0x28f967(0x106)](_0x482841),0x190);}},VisuMZ[_0x18ba1f(0x50f)]=function(_0x5e9db3,_0x26f45b){const _0xba1f38=_0x18ba1f;_0x26f45b=_0x26f45b[_0xba1f38(0x347)]();var _0x372dc8=1.70158,_0x5620ea=0.7;switch(_0x26f45b){case _0xba1f38(0x690):return _0x5e9db3;case _0xba1f38(0x3b7):return-0x1*Math[_0xba1f38(0x68c)](_0x5e9db3*(Math['PI']/0x2))+0x1;case _0xba1f38(0xf3):return Math[_0xba1f38(0x56e)](_0x5e9db3*(Math['PI']/0x2));case'INOUTSINE':return-0.5*(Math[_0xba1f38(0x68c)](Math['PI']*_0x5e9db3)-0x1);case _0xba1f38(0x271):return _0x5e9db3*_0x5e9db3;case'OUTQUAD':return _0x5e9db3*(0x2-_0x5e9db3);case _0xba1f38(0x4b2):return _0x5e9db3<0.5?0x2*_0x5e9db3*_0x5e9db3:-0x1+(0x4-0x2*_0x5e9db3)*_0x5e9db3;case _0xba1f38(0x204):return _0x5e9db3*_0x5e9db3*_0x5e9db3;case _0xba1f38(0x18f):var _0x1bc8fa=_0x5e9db3-0x1;return _0x1bc8fa*_0x1bc8fa*_0x1bc8fa+0x1;case _0xba1f38(0x5b5):return _0x5e9db3<0.5?0x4*_0x5e9db3*_0x5e9db3*_0x5e9db3:(_0x5e9db3-0x1)*(0x2*_0x5e9db3-0x2)*(0x2*_0x5e9db3-0x2)+0x1;case _0xba1f38(0x319):return _0x5e9db3*_0x5e9db3*_0x5e9db3*_0x5e9db3;case _0xba1f38(0x25e):var _0x1bc8fa=_0x5e9db3-0x1;return 0x1-_0x1bc8fa*_0x1bc8fa*_0x1bc8fa*_0x1bc8fa;case'INOUTQUART':var _0x1bc8fa=_0x5e9db3-0x1;return _0x5e9db3<0.5?0x8*_0x5e9db3*_0x5e9db3*_0x5e9db3*_0x5e9db3:0x1-0x8*_0x1bc8fa*_0x1bc8fa*_0x1bc8fa*_0x1bc8fa;case _0xba1f38(0x5b3):return _0x5e9db3*_0x5e9db3*_0x5e9db3*_0x5e9db3*_0x5e9db3;case _0xba1f38(0x176):var _0x1bc8fa=_0x5e9db3-0x1;return 0x1+_0x1bc8fa*_0x1bc8fa*_0x1bc8fa*_0x1bc8fa*_0x1bc8fa;case _0xba1f38(0x474):var _0x1bc8fa=_0x5e9db3-0x1;return _0x5e9db3<0.5?0x10*_0x5e9db3*_0x5e9db3*_0x5e9db3*_0x5e9db3*_0x5e9db3:0x1+0x10*_0x1bc8fa*_0x1bc8fa*_0x1bc8fa*_0x1bc8fa*_0x1bc8fa;case _0xba1f38(0x1ce):if(_0x5e9db3===0x0)return 0x0;return Math[_0xba1f38(0x19f)](0x2,0xa*(_0x5e9db3-0x1));case'OUTEXPO':if(_0x5e9db3===0x1)return 0x1;return-Math[_0xba1f38(0x19f)](0x2,-0xa*_0x5e9db3)+0x1;case _0xba1f38(0x58b):if(_0x5e9db3===0x0||_0x5e9db3===0x1)return _0x5e9db3;var _0x43bdc1=_0x5e9db3*0x2,_0x2c0472=_0x43bdc1-0x1;if(_0x43bdc1<0x1)return 0.5*Math[_0xba1f38(0x19f)](0x2,0xa*_0x2c0472);return 0.5*(-Math[_0xba1f38(0x19f)](0x2,-0xa*_0x2c0472)+0x2);case _0xba1f38(0x46c):var _0x43bdc1=_0x5e9db3/0x1;return-0x1*(Math[_0xba1f38(0x3b3)](0x1-_0x43bdc1*_0x5e9db3)-0x1);case'OUTCIRC':var _0x1bc8fa=_0x5e9db3-0x1;return Math[_0xba1f38(0x3b3)](0x1-_0x1bc8fa*_0x1bc8fa);case'INOUTCIRC':var _0x43bdc1=_0x5e9db3*0x2,_0x2c0472=_0x43bdc1-0x2;if(_0x43bdc1<0x1)return-0.5*(Math['sqrt'](0x1-_0x43bdc1*_0x43bdc1)-0x1);return 0.5*(Math['sqrt'](0x1-_0x2c0472*_0x2c0472)+0x1);case'INBACK':return _0x5e9db3*_0x5e9db3*((_0x372dc8+0x1)*_0x5e9db3-_0x372dc8);case'OUTBACK':var _0x43bdc1=_0x5e9db3/0x1-0x1;return _0x43bdc1*_0x43bdc1*((_0x372dc8+0x1)*_0x43bdc1+_0x372dc8)+0x1;break;case _0xba1f38(0x1bc):var _0x43bdc1=_0x5e9db3*0x2,_0x3f4af3=_0x43bdc1-0x2,_0x22454d=_0x372dc8*1.525;if(_0x43bdc1<0x1)return 0.5*_0x43bdc1*_0x43bdc1*((_0x22454d+0x1)*_0x43bdc1-_0x22454d);return 0.5*(_0x3f4af3*_0x3f4af3*((_0x22454d+0x1)*_0x3f4af3+_0x22454d)+0x2);case _0xba1f38(0x434):if(_0x5e9db3===0x0||_0x5e9db3===0x1)return _0x5e9db3;var _0x43bdc1=_0x5e9db3/0x1,_0x2c0472=_0x43bdc1-0x1,_0x31da99=0x1-_0x5620ea,_0x22454d=_0x31da99/(0x2*Math['PI'])*Math['asin'](0x1);return-(Math[_0xba1f38(0x19f)](0x2,0xa*_0x2c0472)*Math[_0xba1f38(0x56e)]((_0x2c0472-_0x22454d)*(0x2*Math['PI'])/_0x31da99));case _0xba1f38(0x268):var _0x31da99=0x1-_0x5620ea,_0x43bdc1=_0x5e9db3*0x2;if(_0x5e9db3===0x0||_0x5e9db3===0x1)return _0x5e9db3;var _0x22454d=_0x31da99/(0x2*Math['PI'])*Math[_0xba1f38(0x254)](0x1);return Math[_0xba1f38(0x19f)](0x2,-0xa*_0x43bdc1)*Math[_0xba1f38(0x56e)]((_0x43bdc1-_0x22454d)*(0x2*Math['PI'])/_0x31da99)+0x1;case'INOUTELASTIC':var _0x31da99=0x1-_0x5620ea;if(_0x5e9db3===0x0||_0x5e9db3===0x1)return _0x5e9db3;var _0x43bdc1=_0x5e9db3*0x2,_0x2c0472=_0x43bdc1-0x1,_0x22454d=_0x31da99/(0x2*Math['PI'])*Math[_0xba1f38(0x254)](0x1);if(_0x43bdc1<0x1)return-0.5*(Math[_0xba1f38(0x19f)](0x2,0xa*_0x2c0472)*Math[_0xba1f38(0x56e)]((_0x2c0472-_0x22454d)*(0x2*Math['PI'])/_0x31da99));return Math[_0xba1f38(0x19f)](0x2,-0xa*_0x2c0472)*Math[_0xba1f38(0x56e)]((_0x2c0472-_0x22454d)*(0x2*Math['PI'])/_0x31da99)*0.5+0x1;case _0xba1f38(0x2ae):var _0x43bdc1=_0x5e9db3/0x1;if(_0x43bdc1<0x1/2.75)return 7.5625*_0x43bdc1*_0x43bdc1;else{if(_0x43bdc1<0x2/2.75){var _0x3f4af3=_0x43bdc1-1.5/2.75;return 7.5625*_0x3f4af3*_0x3f4af3+0.75;}else{if(_0x43bdc1<2.5/2.75){var _0x3f4af3=_0x43bdc1-2.25/2.75;return 7.5625*_0x3f4af3*_0x3f4af3+0.9375;}else{var _0x3f4af3=_0x43bdc1-2.625/2.75;return 7.5625*_0x3f4af3*_0x3f4af3+0.984375;}}}case _0xba1f38(0x64b):var _0x54bcc1=0x1-VisuMZ[_0xba1f38(0x50f)](0x1-_0x5e9db3,_0xba1f38(0x558));return _0x54bcc1;case _0xba1f38(0x648):if(_0x5e9db3<0.5)var _0x54bcc1=VisuMZ[_0xba1f38(0x50f)](_0x5e9db3*0x2,_0xba1f38(0x15d))*0.5;else var _0x54bcc1=VisuMZ[_0xba1f38(0x50f)](_0x5e9db3*0x2-0x1,_0xba1f38(0x558))*0.5+0.5;return _0x54bcc1;default:return _0x5e9db3;}},VisuMZ[_0x18ba1f(0x16f)]=function(_0x1fa643){const _0x433bd9=_0x18ba1f;_0x1fa643=String(_0x1fa643)[_0x433bd9(0x347)]();const _0x4eeb8b=VisuMZ[_0x433bd9(0x3ea)][_0x433bd9(0x493)][_0x433bd9(0x1ed)];if(_0x1fa643===_0x433bd9(0x631))return _0x4eeb8b[_0x433bd9(0x48c)];if(_0x1fa643===_0x433bd9(0x21f))return _0x4eeb8b[_0x433bd9(0x20c)];if(_0x1fa643==='ATK')return _0x4eeb8b[_0x433bd9(0x3ce)];if(_0x1fa643===_0x433bd9(0x2f1))return _0x4eeb8b[_0x433bd9(0x486)];if(_0x1fa643===_0x433bd9(0x5be))return _0x4eeb8b[_0x433bd9(0x647)];if(_0x1fa643==='MDF')return _0x4eeb8b[_0x433bd9(0x59a)];if(_0x1fa643===_0x433bd9(0x30e))return _0x4eeb8b[_0x433bd9(0x618)];if(_0x1fa643==='LUK')return _0x4eeb8b[_0x433bd9(0x327)];if(_0x1fa643===_0x433bd9(0x58f))return _0x4eeb8b['IconXParam0'];if(_0x1fa643===_0x433bd9(0x514))return _0x4eeb8b[_0x433bd9(0x577)];if(_0x1fa643==='CRI')return _0x4eeb8b['IconXParam2'];if(_0x1fa643===_0x433bd9(0x6b2))return _0x4eeb8b['IconXParam3'];if(_0x1fa643===_0x433bd9(0x58c))return _0x4eeb8b[_0x433bd9(0x4f6)];if(_0x1fa643==='MRF')return _0x4eeb8b[_0x433bd9(0x143)];if(_0x1fa643===_0x433bd9(0x698))return _0x4eeb8b[_0x433bd9(0x5c7)];if(_0x1fa643===_0x433bd9(0x428))return _0x4eeb8b[_0x433bd9(0x315)];if(_0x1fa643===_0x433bd9(0x2e8))return _0x4eeb8b['IconXParam8'];if(_0x1fa643===_0x433bd9(0x3d1))return _0x4eeb8b[_0x433bd9(0x677)];if(_0x1fa643===_0x433bd9(0x26b))return _0x4eeb8b[_0x433bd9(0x456)];if(_0x1fa643===_0x433bd9(0x291))return _0x4eeb8b['IconSParam1'];if(_0x1fa643==='REC')return _0x4eeb8b[_0x433bd9(0x565)];if(_0x1fa643==='PHA')return _0x4eeb8b[_0x433bd9(0x314)];if(_0x1fa643===_0x433bd9(0x65d))return _0x4eeb8b[_0x433bd9(0x4ed)];if(_0x1fa643===_0x433bd9(0x5df))return _0x4eeb8b[_0x433bd9(0x2e5)];if(_0x1fa643==='PDR')return _0x4eeb8b[_0x433bd9(0x1a4)];if(_0x1fa643===_0x433bd9(0x18e))return _0x4eeb8b[_0x433bd9(0x610)];if(_0x1fa643===_0x433bd9(0x5ee))return _0x4eeb8b[_0x433bd9(0x332)];if(_0x1fa643===_0x433bd9(0x316))return _0x4eeb8b[_0x433bd9(0x16b)];if(VisuMZ[_0x433bd9(0x3ea)][_0x433bd9(0x446)][_0x1fa643])return VisuMZ['CoreEngine'][_0x433bd9(0x446)][_0x1fa643]||0x0;return 0x0;},VisuMZ[_0x18ba1f(0x657)]=function(_0xe30270,_0x48b519,_0x530fc4){const _0xdbbdb5=_0x18ba1f;if(_0x530fc4===undefined&&_0xe30270%0x1===0x0)return _0xe30270;if(_0x530fc4!==undefined&&['MAXHP','MAXMP',_0xdbbdb5(0x6a9),_0xdbbdb5(0x2f1),_0xdbbdb5(0x5be),_0xdbbdb5(0x188),_0xdbbdb5(0x30e),_0xdbbdb5(0x449)]['includes'](String(_0x530fc4)[_0xdbbdb5(0x347)]()[_0xdbbdb5(0x525)]()))return _0xe30270;return _0x48b519=_0x48b519||0x0,String((_0xe30270*0x64)['toFixed'](_0x48b519))+'%';},VisuMZ[_0x18ba1f(0x3a9)]=function(_0x17fb8c){const _0x2a77d8=_0x18ba1f;_0x17fb8c=String(_0x17fb8c);if(!_0x17fb8c)return _0x17fb8c;if(typeof _0x17fb8c!==_0x2a77d8(0x52d))return _0x17fb8c;const _0xe7d996=VisuMZ[_0x2a77d8(0x3ea)]['Settings']['QoL']['DigitGroupingLocale']||_0x2a77d8(0x462),_0x5bc736={'maximumFractionDigits':0x6};_0x17fb8c=_0x17fb8c[_0x2a77d8(0x5fa)](/\[(.*?)\]/g,(_0x10653c,_0x3475fe)=>{return VisuMZ['PreserveNumbers'](_0x3475fe,'[',']');}),_0x17fb8c=_0x17fb8c[_0x2a77d8(0x5fa)](/<(.*?)>/g,(_0x5c2625,_0x392ba1)=>{return VisuMZ['PreserveNumbers'](_0x392ba1,'<','>');}),_0x17fb8c=_0x17fb8c['replace'](/\{\{(.*?)\}\}/g,(_0x18b234,_0x255804)=>{const _0x265d3e=_0x2a77d8;return VisuMZ[_0x265d3e(0x4aa)](_0x255804,'','');}),_0x17fb8c=_0x17fb8c[_0x2a77d8(0x5fa)](/(\d+\.?\d*)/g,(_0xb1fa0b,_0x37ec2e)=>{const _0x49203e=_0x2a77d8;let _0x4a9857=_0x37ec2e;if(_0x4a9857[0x0]==='0')return _0x4a9857;if(_0x4a9857[_0x4a9857[_0x49203e(0x397)]-0x1]==='.')return Number(_0x4a9857)['toLocaleString'](_0xe7d996,_0x5bc736)+'.';else return _0x4a9857[_0x4a9857[_0x49203e(0x397)]-0x1]===','?Number(_0x4a9857)[_0x49203e(0x25a)](_0xe7d996,_0x5bc736)+',':Number(_0x4a9857)['toLocaleString'](_0xe7d996,_0x5bc736);});let _0x33bd61=0x3;while(_0x33bd61--){_0x17fb8c=VisuMZ[_0x2a77d8(0x39c)](_0x17fb8c);}return _0x17fb8c;},VisuMZ[_0x18ba1f(0x4aa)]=function(_0x2e9eb2,_0x4b81c6,_0x1177be){const _0x44943a=_0x18ba1f;return _0x2e9eb2=_0x2e9eb2[_0x44943a(0x5fa)](/(\d)/gi,(_0x2b5752,_0x4997e5)=>'PRESERVCONVERSION(%1)'[_0x44943a(0x400)](Number(_0x4997e5))),_0x44943a(0x43b)[_0x44943a(0x400)](_0x2e9eb2,_0x4b81c6,_0x1177be);},VisuMZ['RevertPreserveNumbers']=function(_0x39ccbe){const _0x277f7c=_0x18ba1f;return _0x39ccbe=_0x39ccbe[_0x277f7c(0x5fa)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x510d62,_0x2fd66a)=>Number(parseInt(_0x2fd66a))),_0x39ccbe;},VisuMZ['openURL']=function(_0x417d84){const _0x40d032=_0x18ba1f;SoundManager[_0x40d032(0x173)]();if(!Utils['isNwjs']()){const _0x15a19c=window[_0x40d032(0x67b)](_0x417d84,_0x40d032(0x59f));}else{const _0xaef406=process['platform']==_0x40d032(0x445)?_0x40d032(0x67b):process[_0x40d032(0x513)]==_0x40d032(0x236)?_0x40d032(0x591):'xdg-open';require(_0x40d032(0x39a))[_0x40d032(0x467)](_0xaef406+'\x20'+_0x417d84);}},Game_Picture['prototype'][_0x18ba1f(0x31a)]=function(){const _0xe56dba=_0x18ba1f;return this[_0xe56dba(0x464)];},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x121)]=Game_Picture[_0x18ba1f(0x5e5)][_0x18ba1f(0x3b5)],Game_Picture[_0x18ba1f(0x5e5)][_0x18ba1f(0x3b5)]=function(){const _0x2fe2f4=_0x18ba1f;VisuMZ['CoreEngine'][_0x2fe2f4(0x121)][_0x2fe2f4(0x2fa)](this),this[_0x2fe2f4(0x464)]={'x':0x0,'y':0x0},this[_0x2fe2f4(0x2ec)]={'x':0x0,'y':0x0};},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x23b)]=Game_Picture[_0x18ba1f(0x5e5)]['updateMove'],Game_Picture['prototype'][_0x18ba1f(0x38f)]=function(){const _0x5d7602=_0x18ba1f;this['updateAnchor'](),VisuMZ['CoreEngine']['Game_Picture_updateMove'][_0x5d7602(0x2fa)](this);},VisuMZ['CoreEngine'][_0x18ba1f(0x419)]=Game_Picture['prototype']['show'],Game_Picture[_0x18ba1f(0x5e5)][_0x18ba1f(0x4d7)]=function(_0x242f02,_0x2a6c7f,_0x4a7c83,_0x226c2d,_0x423646,_0x1cbe25,_0xc3ec4e,_0x20c7ab){const _0x5ec813=_0x18ba1f;VisuMZ[_0x5ec813(0x3ea)]['Game_Picture_show'][_0x5ec813(0x2fa)](this,_0x242f02,_0x2a6c7f,_0x4a7c83,_0x226c2d,_0x423646,_0x1cbe25,_0xc3ec4e,_0x20c7ab),this[_0x5ec813(0x4f4)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x2a6c7f]||{'x':0x0,'y':0x0});},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x11b)]=Game_Picture[_0x18ba1f(0x5e5)][_0x18ba1f(0x37b)],Game_Picture['prototype'][_0x18ba1f(0x37b)]=function(_0x39e2f9,_0x2b9585,_0x3a693f,_0x3f46ac,_0x4aa936,_0x36aaf3,_0x1c3c4f,_0x45f1ab,_0x18fad3){const _0x44a66f=_0x18ba1f;VisuMZ[_0x44a66f(0x3ea)][_0x44a66f(0x11b)][_0x44a66f(0x2fa)](this,_0x39e2f9,_0x2b9585,_0x3a693f,_0x3f46ac,_0x4aa936,_0x36aaf3,_0x1c3c4f,_0x45f1ab,_0x18fad3),this[_0x44a66f(0x3d4)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x39e2f9]||{'x':0x0,'y':0x0});},Game_Picture[_0x18ba1f(0x5e5)][_0x18ba1f(0x202)]=function(){const _0x3675c7=_0x18ba1f;this[_0x3675c7(0x304)]>0x0&&(this['_anchor']['x']=this['applyEasing'](this[_0x3675c7(0x464)]['x'],this[_0x3675c7(0x2ec)]['x']),this[_0x3675c7(0x464)]['y']=this[_0x3675c7(0x2f9)](this[_0x3675c7(0x464)]['y'],this[_0x3675c7(0x2ec)]['y']));},Game_Picture[_0x18ba1f(0x5e5)][_0x18ba1f(0x4f4)]=function(_0x34144b){const _0x56d32c=_0x18ba1f;this[_0x56d32c(0x464)]=_0x34144b,this['_targetAnchor']=JsonEx[_0x56d32c(0x485)](this[_0x56d32c(0x464)]);},Game_Picture[_0x18ba1f(0x5e5)]['setTargetAnchor']=function(_0x57e25){this['_targetAnchor']=_0x57e25;},VisuMZ[_0x18ba1f(0x3ea)][_0x18ba1f(0x270)]=Sprite_Picture['prototype'][_0x18ba1f(0x481)],Sprite_Picture[_0x18ba1f(0x5e5)][_0x18ba1f(0x481)]=function(){const _0x5c5f71=_0x18ba1f,_0xf3d80=this[_0x5c5f71(0x5ca)]();!_0xf3d80[_0x5c5f71(0x31a)]()?VisuMZ[_0x5c5f71(0x3ea)][_0x5c5f71(0x270)][_0x5c5f71(0x2fa)](this):(this[_0x5c5f71(0x31a)]['x']=_0xf3d80['anchor']()['x'],this[_0x5c5f71(0x31a)]['y']=_0xf3d80[_0x5c5f71(0x31a)]()['y']);},Game_Action['prototype']['setEnemyAction']=function(_0x18e796){const _0x100ead=_0x18ba1f;if(_0x18e796){const _0x2972d5=_0x18e796[_0x100ead(0x440)];if(_0x2972d5===0x1&&this[_0x100ead(0x568)]()[_0x100ead(0x62e)]()!==0x1)this[_0x100ead(0x3b4)]();else _0x2972d5===0x2&&this[_0x100ead(0x568)]()[_0x100ead(0x35d)]()!==0x2?this[_0x100ead(0x503)]():this[_0x100ead(0x263)](_0x2972d5);}else this[_0x100ead(0x111)]();},Game_Actor[_0x18ba1f(0x5e5)][_0x18ba1f(0x51a)]=function(){const _0x10fc0a=_0x18ba1f;return this['skills']()[_0x10fc0a(0x3bf)](_0xee3d6e=>this[_0x10fc0a(0x1d5)](_0xee3d6e)&&this['skillTypes']()[_0x10fc0a(0x1b8)](_0xee3d6e[_0x10fc0a(0x2cd)]));},Window_Base[_0x18ba1f(0x5e5)][_0x18ba1f(0x248)]=function(){const _0x2339ed=_0x18ba1f;this['_dimmerSprite']=new Sprite(),this[_0x2339ed(0x5c6)][_0x2339ed(0x369)]=new Bitmap(0x0,0x0),this['_dimmerSprite']['x']=0x0,this['addChildToBack'](this[_0x2339ed(0x5c6)]);},Window_Base['prototype']['refreshDimmerBitmap']=function(){const _0x32c539=_0x18ba1f;if(this[_0x32c539(0x5c6)]){const _0x487048=this['_dimmerSprite'][_0x32c539(0x369)],_0x26507a=this[_0x32c539(0x259)],_0x4da930=this[_0x32c539(0x13b)],_0x5c65d6=this['padding'],_0x58d4ea=ColorManager[_0x32c539(0x113)](),_0x4d22b1=ColorManager[_0x32c539(0x33d)]();_0x487048[_0x32c539(0x154)](_0x26507a,_0x4da930),_0x487048['gradientFillRect'](0x0,0x0,_0x26507a,_0x5c65d6,_0x4d22b1,_0x58d4ea,!![]),_0x487048[_0x32c539(0x1d8)](0x0,_0x5c65d6,_0x26507a,_0x4da930-_0x5c65d6*0x2,_0x58d4ea),_0x487048[_0x32c539(0x668)](0x0,_0x4da930-_0x5c65d6,_0x26507a,_0x5c65d6,_0x58d4ea,_0x4d22b1,!![]),this[_0x32c539(0x5c6)][_0x32c539(0x2c5)](0x0,0x0,_0x26507a,_0x4da930);}},Game_Actor['prototype'][_0x18ba1f(0x240)]=function(){const _0x43512d=_0x18ba1f;for(let _0x3a7b64=0x0;_0x3a7b64<this[_0x43512d(0x161)]();_0x3a7b64++){const _0x546e2a=this['makeActionList']();let _0x247644=Number[_0x43512d(0x62f)];this['setAction'](_0x3a7b64,_0x546e2a[0x0]);for(const _0x4de2bb of _0x546e2a){const _0x552a38=_0x4de2bb[_0x43512d(0x63d)]();_0x552a38>_0x247644&&(_0x247644=_0x552a38,this[_0x43512d(0x3dd)](_0x3a7b64,_0x4de2bb));}}this['setActionState']('waiting');},Window_BattleItem[_0x18ba1f(0x5e5)][_0x18ba1f(0x536)]=function(_0x3e481f){const _0x260a25=_0x18ba1f;return BattleManager[_0x260a25(0x4c9)]()?BattleManager[_0x260a25(0x4c9)]()[_0x260a25(0x1d5)](_0x3e481f):Window_ItemList[_0x260a25(0x5e5)][_0x260a25(0x536)][_0x260a25(0x2fa)](this,_0x3e481f);},VisuMZ[_0x18ba1f(0x3ea)]['Scene_Map_createSpriteset']=Scene_Map[_0x18ba1f(0x5e5)][_0x18ba1f(0x480)],Scene_Map[_0x18ba1f(0x5e5)][_0x18ba1f(0x480)]=function(){const _0x3607fd=_0x18ba1f;VisuMZ[_0x3607fd(0x3ea)][_0x3607fd(0x623)][_0x3607fd(0x2fa)](this);const _0x1916af=this[_0x3607fd(0xf6)]['_timerSprite'];if(_0x1916af)this['addChild'](_0x1916af);},VisuMZ['CoreEngine'][_0x18ba1f(0x13e)]=Scene_Battle[_0x18ba1f(0x5e5)][_0x18ba1f(0x480)],Scene_Battle[_0x18ba1f(0x5e5)]['createSpriteset']=function(){const _0x23e1e1=_0x18ba1f;VisuMZ[_0x23e1e1(0x3ea)][_0x23e1e1(0x13e)][_0x23e1e1(0x2fa)](this);const _0x4ff932=this[_0x23e1e1(0xf6)][_0x23e1e1(0x3f9)];if(_0x4ff932)this[_0x23e1e1(0x608)](_0x4ff932);},Sprite_Actor[_0x18ba1f(0x5e5)][_0x18ba1f(0x285)]=function(){const _0x578d4c=_0x18ba1f;Sprite_Battler[_0x578d4c(0x5e5)][_0x578d4c(0x285)][_0x578d4c(0x2fa)](this),this['updateShadow']();if(this[_0x578d4c(0x3a0)])this[_0x578d4c(0x542)]();else this[_0x578d4c(0x66f)]!==''&&(this[_0x578d4c(0x66f)]='');},Window[_0x18ba1f(0x5e5)][_0x18ba1f(0x39d)]=function(){const _0x3b10de=_0x18ba1f,_0x147d75=this[_0x3b10de(0x4ef)],_0x675df5=this[_0x3b10de(0x25b)],_0x34dc80=0x18,_0x5ce644=_0x34dc80/0x2,_0x41aaaf=0x60+_0x34dc80,_0x82d676=0x0+_0x34dc80;this[_0x3b10de(0x4b4)][_0x3b10de(0x369)]=this[_0x3b10de(0x56a)],this[_0x3b10de(0x4b4)][_0x3b10de(0x31a)]['x']=0.5,this[_0x3b10de(0x4b4)][_0x3b10de(0x31a)]['y']=0.5,this[_0x3b10de(0x4b4)][_0x3b10de(0x2c5)](_0x41aaaf+_0x5ce644,_0x82d676+_0x5ce644+_0x34dc80,_0x34dc80,_0x5ce644),this[_0x3b10de(0x4b4)]['move'](Math['round'](_0x147d75/0x2),Math[_0x3b10de(0x339)](_0x675df5-_0x5ce644)),this[_0x3b10de(0x3be)][_0x3b10de(0x369)]=this['_windowskin'],this[_0x3b10de(0x3be)][_0x3b10de(0x31a)]['x']=0.5,this[_0x3b10de(0x3be)]['anchor']['y']=0.5,this[_0x3b10de(0x3be)][_0x3b10de(0x2c5)](_0x41aaaf+_0x5ce644,_0x82d676,_0x34dc80,_0x5ce644),this[_0x3b10de(0x3be)][_0x3b10de(0x37b)](Math[_0x3b10de(0x339)](_0x147d75/0x2),Math[_0x3b10de(0x339)](_0x5ce644));},Window['prototype'][_0x18ba1f(0x1b3)]=function(){const _0x3d38d0=_0x18ba1f,_0x5d9ca0=0x90,_0x4896cd=0x60,_0x405edf=0x18;this[_0x3d38d0(0x142)][_0x3d38d0(0x369)]=this[_0x3d38d0(0x56a)],this['_pauseSignSprite'][_0x3d38d0(0x31a)]['x']=0.5,this['_pauseSignSprite'][_0x3d38d0(0x31a)]['y']=0x1,this[_0x3d38d0(0x142)][_0x3d38d0(0x37b)](Math[_0x3d38d0(0x339)](this['_width']/0x2),this[_0x3d38d0(0x25b)]),this[_0x3d38d0(0x142)]['setFrame'](_0x5d9ca0,_0x4896cd,_0x405edf,_0x405edf),this[_0x3d38d0(0x142)][_0x3d38d0(0x5db)]=0x0;},Window[_0x18ba1f(0x5e5)][_0x18ba1f(0x2d4)]=function(){const _0x33db04=_0x18ba1f,_0x2b2167=this[_0x33db04(0x5e8)][_0x33db04(0x2b6)][_0x33db04(0x335)](new Point(0x0,0x0)),_0x339116=this['_clientArea'][_0x33db04(0x255)];_0x339116['x']=_0x2b2167['x']+this[_0x33db04(0x616)]['x'],_0x339116['y']=_0x2b2167['y']+this[_0x33db04(0x616)]['y'],_0x339116['width']=Math[_0x33db04(0x354)](this[_0x33db04(0xd6)]*this[_0x33db04(0x30c)]['x']),_0x339116[_0x33db04(0x13b)]=Math[_0x33db04(0x354)](this[_0x33db04(0x4bb)]*this[_0x33db04(0x30c)]['y']);},Window[_0x18ba1f(0x5e5)]['_refreshBack']=function(){const _0x5bac8e=_0x18ba1f,_0x433ba7=this['_margin'],_0x18b261=Math[_0x5bac8e(0x5c8)](0x0,this[_0x5bac8e(0x4ef)]-_0x433ba7*0x2),_0x30cf45=Math[_0x5bac8e(0x5c8)](0x0,this[_0x5bac8e(0x25b)]-_0x433ba7*0x2),_0x25efb7=this[_0x5bac8e(0x302)],_0x3d883c=_0x25efb7['children'][0x0];_0x25efb7[_0x5bac8e(0x369)]=this[_0x5bac8e(0x56a)],_0x25efb7['setFrame'](0x0,0x0,0x60,0x60),_0x25efb7[_0x5bac8e(0x37b)](_0x433ba7,_0x433ba7),_0x25efb7[_0x5bac8e(0x30c)]['x']=_0x18b261/0x60,_0x25efb7[_0x5bac8e(0x30c)]['y']=_0x30cf45/0x60,_0x3d883c['bitmap']=this[_0x5bac8e(0x56a)],_0x3d883c[_0x5bac8e(0x2c5)](0x0,0x60,0x60,0x60),_0x3d883c['move'](0x0,0x0,_0x18b261,_0x30cf45),_0x3d883c['scale']['x']=0x60/_0x18b261,_0x3d883c[_0x5bac8e(0x30c)]['y']=0x60/_0x30cf45,_0x25efb7[_0x5bac8e(0x4dd)](this[_0x5bac8e(0x2f6)]);};
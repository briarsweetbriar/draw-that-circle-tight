//=============================================================================
// VisuStella MZ - Main Menu Core
// VisuMZ_1_MainMenuCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MainMenuCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MainMenuCore = VisuMZ.MainMenuCore || {};
VisuMZ.MainMenuCore.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.09] [MainMenuCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Main_Menu_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Main Menu Core plugin is designed to give you more control over the Main
 * Menu outside of RPG Maker MZ's editor's control. Game devs are given control
 * over how commands work, visual aesthetics pertaining to the Main Menu, and 
 * assign menu images to actors as background portraits.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general Main Menu settings.
 * * The ability to set Menu Background Portraits for individual actors.
 * * Flexibility in changing which commands appear in the Main Menu.
 * * Add new windows like the Playtime Window and Variable windows.
 * * Change the style of how the windows are arranged in the Main Menu.
 * * Change the way the status list is displayed and the way it's displayed.
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
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 *
 * <Menu Portrait: filename>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" style Main Menu List.
 * - Sets the menu image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 *
 * ---
 * 
 * <Menu Portrait Offset: +x, +y>
 * <Menu Portrait Offset: -x, -y>
 * 
 * <Menu Portrait Offset X: +x>
 * <Menu Portrait Offset X: -x>
 * 
 * <Menu Portrait Offset Y: +y>
 * <Menu Portrait Offset Y: -y>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" style Main Menu List.
 * - Offsets the X and Y coordinates for the menu image.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * - This only applies to the Main Menu portraits.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Menu Image (Group)
 * Actor: Change Menu Image (Range)
 * Actor: Change Menu Image (JS)
 * - Changes the actor's Menu Image.
 * - Each version has a different means of selecting Actor ID's.
 *
 *   Step 1: Actor:
 *   - Select which ID(s) to affect.
 *
 *     Single:
 *     - Select which specific ID to affect.
 *
 *     Variable Reference:
 *     - Which variable is used to determine which ID to affect?
 *
 *     Range Start:
 *     - Select where the ID range begins.
 *
 *     Range End:
 *     - Select where the ID range ends.
 *
 *     Group:
 *     - Select which group of ID(s) to affect.
 *
 *     JavaScript:
 *     - JavaScript code to return an array on which ID(s) to affect.
 *
 *   Step 2: Target:
 *   - Select operation on what to change the switch(es) to.
 *   - Depending on what you pick here, one of the following actions are used
 *     in combination with the ID's picked from Step 1.
 *
 *     Filename:
 *     - Selected actor(s) will have their menu images changed to this.
 *
 *     Variable Reference:
 *     - Select the variable used to determine filename used for the selected
 *       actor(s).
 *
 *     JavaScript:
 *     - JavaScript code to determine what filename is used for the selected
 *       actor(s).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These general settings contain various settings on how the Main Menu scene
 * displays certain windows, alters how specific windows behave, and determines
 * which scenes would display actor menu images as background portraits.
 *
 * ---
 *
 * Gold Window
 * 
 *   Thinner Gold Window:
 *   - Make the Gold Window thinner in the Main Menu?
 *   - Used to match the Playtime and Variable Windows.
 * 
 *   Auto Adjust Height:
 *   - Automatically adjust the height for the thinner Gold Window?
 *
 *   Auto Adjust Y:
 *   - Automatically adjust the Y position for the thinner Gold Window?
 *
 * ---
 * 
 * Status Window
 * 
 *   Select Last?:
 *   - When picking a personal command from the Command Window, select the
 *     last picked actor or always the first?
 * 
 * ---
 *
 * Solo Party
 *
 *   Solo Quick Mode:
 *   - When selecting "Skills", "Equip", or "Status" with one party member,
 *     immediately go to the scene.
 *
 * ---
 *
 * Sub Menus
 *
 *   Menus with Actor BG's:
 *   - A list of the menus that would be compatible with Actor Menu Backgrounds
 *
 *   JS: Actor BG Action:
 *   - Code used to determine how to display the sprites upon loading.
 *
 * ---
 * 
 * Party Window
 * 
 *   Show Reserve Memebers:
 *   - Show reserve members while on the Main Menu scene?
 * 
 *   Hide Main Menu Only
 *   - If reserve members are hidden, hide them only in the main menu or
 *     all scenes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window List
 * ============================================================================
 *
 * The Command Window functions as a hub to the various scenes linked from the
 * Main Menu. These include 'Item', 'Skill', 'Equip', 'Status', 'Save', and
 * so on. This Plugin Parameter is an array that lets you add, remove, and/or
 * alter the Command Window's various commands, how they're handled, whether or
 * not they're visible, and how they react when selected.
 *
 * These will require knowledge of JavaScript to use them properly.
 *
 * ---
 *
 * Command Window List
 * 
 *   Symbol:
 *   - The symbol used for this command.
 *
 *   Icon:
 *   - Icon used for this command.
 *   - Use 0 for no icon.
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
 *   JS: Personal Code:
 *   - JavaScript code that runs once the actor list is selected with this
 *     command highlighted.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Playtime Window
 * ============================================================================
 *
 * The Playtime Window is an optional feature that can be displayed in the
 * Main Menu. As its name suggests, it displays the playtime of the player's
 * current play through.
 *
 * ---
 *
 * Playtime Window
 * 
 *   Enable:
 *   - Use the Playtime Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Playtime Window?
 *
 *   Background Type:
 *   - Select background type for the Playtime window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Playtime window.
 * 
 *   Time Icon:
 *   - Icon displayed for the 'Time' label.
 * 
 *   Time Text:
 *   - Text for the display of 'Time' in the Playtime window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Playtime window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Variable Window
 * ============================================================================
 *
 * The Variable Window is an optional feature that can be displayed in the
 * Main Menu. If enabled, the Variable Window will display variables of the
 * game dev's choice in the Main Menu itself.
 *
 * ---
 *
 * Variable Window
 * 
 *   Enable:
 *   - Use the Variable Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Variable Window?
 *
 *   Background Type:
 *   - Select background type for the Variable window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Variable window.
 * 
 *   Variable List:
 *   - Select variables to be displayed into the window.
 *     Use \i[x] to determine their icon.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Variable window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window Style & Command Style Settings
 * ============================================================================
 *
 * This determines how the Main Menu appears based on the Command Window Style.
 * If anything but the 'Default' is used, then these settings will take over
 * the window placement settings for the Main Menu. This means that even if you
 * are using VisuStella's Core Engine, the window layouts will be overwritten.
 *
 * ---
 *
 * Command Window Style:
 * - Choose the positioning and style of the Main Menu Command Window.
 * - This will automatically rearrange windows.
 * 
 *   Default Vertical Side Style:
 *   - The default Main Menu layout style.
 *   - Affected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Top Horizontal Style:
 *   - Puts the Command Window at the top of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 *   Bottom Horizontal Style:
 *   - Puts the Command Window at the bottom of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the top.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Mobile Full Screen Style:
 *   - Puts the Command Window at the center of the screen with larger buttons.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is hidden until prompted to be selected.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 * ---
 *
 * Command Style Settings
 *
 *   Style:
 *   - How do you wish to draw command entries in the Command Window?
 *   - Text Only: displays only text.
 *   - Icon Only: displays only the icon.
 *   - Icon + Text: displays icon first, then text.
 *   - Automatic: determines the best fit for the size
 *
 *   Text Alignment:
 *   - Decide how you want the text to be aligned.
 *   - Left, Center, or Right
 * 
 *   Rows:
 *   - Number of visible rows.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Mobile Thickness:
 *   - The thickness of the buttons for mobile version.
 *   - Applies only to Top, Bottom, and Mobile styles.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Graphic, Status List Style, & List Style Settings
 * ============================================================================
 *
 * Choose how the contents Actor Status List Window in the Main Menu appears.
 * This can range from the which actor graphic is drawn to the style used for
 * the data that's displayed.
 *
 * ---
 *
 * Status Graphic:
 * - Choose how the graphic for actor graphics appear in status-like menus.
 * 
 *   None:
 *   - Don't display any graphic for the actors.
 * 
 *   Face:
 *   - Display the actors' faces. This is the default option in RPG Maker MZ.
 *
 *   Map Sprite:
 *   - Display the actors' map sprites.
 * 
 *   Sideview Battler:
 *   - Display the actors' sideview battlers.
 *
 * ---
 *
 * Main Menu List Style
 * - Choose how the actor status list looks in the Main Menu.
 *
 * Inner-Menu List Style
 * - Choose how the actor status list looks in the inner menus like Scene_Item,
 *   Scene_Skill, etc.
 *
 *   Default Horizontal Style:
 *   - This is the default style found in RPG Maker MZ's Main Menu.
 *
 *   Vertical Style:
 *   - Makes the display for the actor list vertical instead of horizontal.
 *
 *   Portrait Style:
 *   - Similar to the vertical style, except each actor's Menu Image is
 *     displayed in the background instead. Portraits are required.
 *   - If there is no Menu Image used, this will switch over to the Vertical
 *     Style and use a face graphic instead.
 *
 *   Solo Style:
 *   - Used for solo party member games. Extends the whole view of the Status
 *     Window to accomodate a single actor.
 *
 *   Thin Horizontal Style:
 *   - Makes the selectable menu entries for the actors a single line thin.
 *
 *   Thicker Horizontal Style:
 *   - Makes the selectable menu entries for the actors two lines thick.
 *
 * ---
 *
 * List Styles
 *   JavaScript code used to determine how the individual styles are drawn.
 *
 *   JS: Default:
 *   JS: Vertical:
 *   JS: Portrait:
 *   JS: Solo:
 *   JS: Thin:
 *   JS: Thicker:
 *   - Code used to draw the data for these styles.
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
 * Version 1.09: March 19, 2021
 * * Documentation Update!
 * ** Added clarity for the "Portrait Style" in Plugin Parameters section for
 *    "Status Graphic, Status List Style, & List Style Settings":
 * *** If there is no Menu Image used, this will switch over to the Vertical
 *     Style and use a face graphic instead.
 * 
 * Version 1.08: February 26, 2021
 * * Feature Update!
 * ** Default Plugin Parameters for the List Style Settings defaults have been
 *    updated with tighter coordinate values to allow for more accurate display
 *    of UI element positioning. Update made by Olivia.
 * 
 * Version 1.07: January 1, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Removed "<Menu Image: filename>" version of notetag to reduce confusion
 *    and to stick with the norm declared by the Battle Core.
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Menu Portrait Offset: +x, +y>
 * *** <Menu Portrait Offset X: +x>
 * *** <Menu Portrait Offset Y: +y>
 * **** This is used with the "Portrait" style Main Menu list.
 * **** Offsets the X and Y coordinates for the menu portrait.
 * 
 * Version 1.06: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: October 11, 2020
 * * Documentation Update!
 * ** Documentation added for the new plugin parameter.
 * * New Features!
 * ** New plugin parameter added by Yanfly.
 * *** Plugin Parameters > General > Status Window > Select Last?
 * **** When picking a personal command from the Command Window, select the
 *      last picked actor or always the first?
 * 
 * Version 1.04: October 4, 2020
 * * Feature Update!
 * ** Certain windows will now pre-load all associated image types for the
 *    actor upon being created to avoid custom JS drawing problems.
 *    Change made by Irina.
 * ** Failsafes have been added to prevent non-existent variables from crashing
 *    the game if a user does not remove them from the variable list. Change
 *    made by Irina.
 * 
 * Version 1.03: September 20, 2020
 * * Documentation Update!
 * ** Added the alternative notetag <Menu Portrait: filename> that also works
 *    the same way as <Menu Image: filename>.
 * 
 * Version 1.02: September 13, 2020
 * * Compatibility Update!
 * ** Better compatibility for SV Actor graphics.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Skill check plugin parameter for show fixed. Fixed by Yanfly and Shaz.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Command Window List > skill >
 *     JS: Show > and changing 'this.needsCommand("item")' to
 *     'this.needsCommand("skill")'
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
 * @command ChangeActorMenuImageGroup
 * @text Actor: Change Menu Image (Group)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's to change.
 *
 * @arg Step1:arraynum
 * @text Step 1: Target ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageRange
 * @text Actor: Change Menu Image (Range)
 * @desc Changes the actor's Menu Image.
 * Select from a range of actor ID's to change.
 *
 * @arg Step1
 * @text Step 1: ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to end at.
 * @default 4
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageJS
 * @text Actor: Change Menu Image (JS)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Step 1: Target ID(s)
 * @type string[]
 * @desc Enter which Actor ID(s) to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
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
 * @param MainMenuCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings pertaining to the Main Menu and related.
 * @default {"GoldWindow":"","ThinGoldWindow:eval":"true","AutoGoldHeight:eval":"true","AutoGoldY:eval":"true","StatusWindow":"","StatusSelectLast:eval":"false","SoloParty":"","SoloQuick:eval":"true","SubMenus":"","ActorBgMenus:arraystr":"[\"Scene_Skill\"]","ActorBgMenuJS:func":"\"this.anchor.x = 0.5;\\nconst scale = 1.25;\\nthis.scale.x = this.scale.y = scale;\\nthis.x = Graphics.width;\\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._targetX = Graphics.width * 3 / 4;\\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._duration = 10;\\nthis.opacity = 0;\"","PartyWindow":"","ShowReserve:eval":"true","HideMainMenuOnly:eval":"true"}
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Main Menu.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"item\",\"Icon:num\":\"208\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.item;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"item\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItem();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"classChange\",\"Icon:num\":\"133\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.classChangeMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    this.isClassChangeCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled() &&\\\\n    this.isClassChangeCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_ClassChange);\\\"\"}","{\"Symbol:str\":\"skill\",\"Icon:num\":\"101\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.skill;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"skill\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Skill);\\\"\"}","{\"Symbol:str\":\"equip\",\"Icon:num\":\"137\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.equip;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"equip\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Equip);\\\"\"}","{\"Symbol:str\":\"status\",\"Icon:num\":\"82\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.status;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"status\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Status);\\\"\"}","{\"Symbol:str\":\"itemCrafting\",\"Icon:num\":\"223\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.ItemCraftingMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ItemCraftingSys &&\\\\n    this.isItemCraftingCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isItemCraftingCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItemCrafting();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"quest\",\"Icon:num\":\"186\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.questCommandName;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_QuestSystem &&\\\\n    this.isQuestCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isQuestCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandQuest();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"combatLog\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.combatLog_BattleCmd_Name;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CombatLog &&\\\\n    this.isCombatLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCombatLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCombatLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"formation\",\"Icon:num\":\"75\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.formation;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"formation\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isFormationEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandFormation();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"options\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"options\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isOptionsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"save\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.save;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isSaveEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandSave();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent1\",\"Icon:num\":\"88\",\"TextStr:str\":\"Common Event 1\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return 1;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCommonEvent();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent2\",\"Icon:num\":\"87\",\"TextStr:str\":\"Common Event 2\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return 2;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"// Declare Ext\\\\nconst ext = arguments[0];\\\\n\\\\n// Declare Status Window\\\\nconst statusWindow = SceneManager._scene._statusWindow;\\\\n\\\\n// Declare Actor ID\\\\nconst actorId = statusWindow.actor(statusWindow.index()).actorId();\\\\n\\\\n// Set variable 1 to Actor ID\\\\n$gameVariables.setValue(1, actorId);\\\\n\\\\n// Prepare Common Event ext to run\\\\n$gameTemp.reserveCommonEvent(ext);\\\\n\\\\n// Exit Main Menu\\\\nSceneManager._scene.popScene();\\\"\"}","{\"Symbol:str\":\"gameEnd\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"gameEnd\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isGameEndEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandGameEnd();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}"]
 *
 * @param Playtime:struct
 * @text Playtime Window
 * @type struct<Playtime>
 * @desc Settings for the Playtime Window.
 * @default {"Enable:eval":"true","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","Icon:num":"75","Time:str":"Time","WindowRect:func":"\"const rows = 1;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param Variable:struct
 * @text Variable Window
 * @type struct<Variable>
 * @desc Settings for the Variable Window.
 * @default {"Enable:eval":"false","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","VarList:arraynum":"[\"1\",\"2\"]","WindowRect:func":"\"const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param ParamBreak1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CommandWindowStyle:str
 * @text Command Window Style
 * @type select
 * @option Default Vertical Side Style
 * @value default
 * @option Top Horizontal Style
 * @value top
 * @option Thin Top Horizontal Style
 * @value thinTop
 * @option Bottom Horizontal Style
 * @value bottom
 * @option Thin Bottom Horizontal Style
 * @value thinBottom
 * @option Mobile Full Screen Style
 * @value mobile
 * @desc Choose the positioning and style of the Main Menu Command Window. This will automatically rearrange windows.
 * @default top
 *
 * @param CustomCmdWin:struct
 * @text Command Style Settings
 * @parent CommandWindowStyle:str
 * @type struct<CustomCmdWin>
 * @desc Settings for the non-default Command Window Styles.
 * @default {"Style:str":"auto","TextAlign:str":"center","Rows:num":"2","Cols:num":"4","MobileThickness:num":"5"}
 *
 * @param ParamBreak2
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param StatusGraphic:str
 * @text Status Graphic
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler
 * @value svbattler
 * @desc Choose how the actor graphics appear in status-like menus.
 * @default face
 *
 * @param StatusListStyle:str
 * @text Main Menu List Style
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the Main Menu.
 * @default portrait
 *
 * @param InnerMenuListStyle:str
 * @text Inner-Menu List Style
 * @parent StatusListStyle:str
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the inner menus
 * like Scene_Item, Scene_Skill, etc.
 * @default default
 *
 * @param ListStyles:struct
 * @text List Style Settings
 * @parent StatusListStyle:str
 * @type struct<ListStyles>
 * @desc JavaScript code used to determine how the individual styles are drawn.
 * @default {"DefaultStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst sx = rect.x + 180;\\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\\nconst lineHeight = this.lineHeight();\\nconst sx2 = sx + 180;\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\\nthis.drawActorClass(actor, sx2, sy);\\n\\n// Place Gauges\\nconst sy2 = sy + lineHeight;\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nthis.placeGauge(actor, \\\"hp\\\", sx2, sy2);\\nthis.placeGauge(actor, \\\"mp\\\", sx2, sy2 + gaugeLineHeight);\\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\\nif ($dataSystem.optDisplayTp && roomForTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx2, sy2 + gaugeLineHeight * 2);\\n}\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx2 + 180;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\"","VerticalStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nconst gx = rect.x;\\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Actor Name\\nlet sx = rect.x;\\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\\nlet sw = rect.width;\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","PortraitStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = rect.height;\\nconst gx = rect.x;\\nconst gy = rect.y;\\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\\n\\n// Draw Dark Rectangle\\nlet sx = rect.x;\\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\\nlet sw = rect.width;\\nlet sh = rect.y + rect.height - sy;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","SoloStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\n\\n// Draw Actor Graphic\\nlet sx = rect.x;\\nlet sy = rect.y;\\nlet sw = rect.width;\\nlet sh = rect.height;\\n\\n// Portrait\\nif (actor.getMenuImage() !== '') {\\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\\n\\n// Everything Else\\n} else {\\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\\n}\\n\\n// Draw Dark Rectangle\\nsh = Math.ceil(lineHeight * 4.5);\\nsy = rect.y + rect.height - sh;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nsw = Math.round(rect.width / 2);\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Prepare Stat Coordinates\\nsx = rect.x + Math.floor(rect.width / 2);\\nsw = rect.width / 2;\\nsh = rect.height;\\nconst sx3 = sx;\\nconst cw = rect.width - sx3 - 2;\\n\\n// Prepare Total Content Height to vertically center the content.\\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    totalHeight += lineHeight;\\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\nconst equips = actor.equips();\\ntotalHeight += lineHeight;\\ntotalHeight += equips.length * lineHeight;\\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\\n\\n// Place Gauges\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nif ($dataSystem.optDisplayTp) {\\n    sy += gaugeLineHeight;\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n    sy += gaugeLineHeight;\\n}\\nlet ny = sy;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    sy += lineHeight;\\n    const pw = Math.floor(cw / 2) - 24;\\n    let px = sx3;\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, sy, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            sy += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n    ny += lineHeight;\\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\n\\n// Draw Actor Equipment\\nthis.resetFontSettings();\\nsx = rect.x + Math.floor(rect.width / 2);\\nsy = ny + lineHeight;\\nsw = rect.width / 2;\\nfor (const equip of equips) {\\n    if (equip) {\\n        this.drawItemName(equip, sx, sy, sw);\\n        sy += lineHeight;\\n        if (sy + lineHeight > rect.y + rect.height) return;\\n    }\\n}\"","ThinStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\n\\n// Place Gauges\\nsx += 180;\\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy);\"","ThickerStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorClass(actor, sx, sy + lineHeight);\\n//this.drawActorLevel(actor, sx, sy + lineHeight);\\n\\n// Place Gauges\\nsx += 180;\\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy + gaugeLineHeight);\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy + (gaugeLineHeight * 2));\\nsx += 160;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\""}
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
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this command.
 * Use 0 for no icon.
 * @default 0
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this menu command.
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
 * @default "const ext = arguments[0];"
 *
 * @param PersonalHandlerJS:func
 * @text JS: Personal Code
 * @type note
 * @desc JavaScript code that runs once the actor list is selected with this command highlighted.
 * @default "const ext = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param ThinGoldWindow:eval
 * @text Thinner Gold Window
 * @parent GoldWindow
 * @type boolean
 * @on Thinner
 * @off Normal
 * @desc Make the Gold Window thinner in the Main Menu?
 * Used to match the Playtime and Variable Windows.
 * @default true
 *
 * @param AutoGoldHeight:eval
 * @text Auto Adjust Height
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the height for the thinner Gold Window?
 * @default true
 *
 * @param AutoGoldY:eval
 * @text Auto Adjust Y
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the Y position for the thinner Gold Window?
 * @default true
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusSelectLast:eval
 * @text Select Last?
 * @parent StatusWindow
 * @type boolean
 * @on Last Picked Actor
 * @off Always First Actor
 * @desc When picking a personal command from the Command Window,
 * select the last picked actor or always the first?
 * @default false
 *
 * @param SoloParty
 * @text Solo Party
 *
 * @param SoloQuick:eval
 * @text Solo Quick Mode
 * @parent SoloParty
 * @type boolean
 * @on Quick
 * @off Normal
 * @desc When selecting "Skills", "Equip", or "Status" with one party member, immediately go to the scene.
 * @default true
 *
 * @param SubMenus
 * @text Sub Menus
 *
 * @param ActorBgMenus:arraystr
 * @text Menus with Actor BG's
 * @parent SubMenus
 * @type string[]
 * @desc A list of the menus that would be compatible with Actor Menu Backgrounds.
 * @default ["Scene_Skill","Scene_Equip","Scene_Status"]
 *
 * @param ActorBgMenuJS:func
 * @text JS: Actor BG Action
 * @parent SubMenus
 * @type note
 * @desc Code used to determine how to display the sprites upon loading.
 * @default "this.anchor.x = 0.5;\nconst scale = 1.25;\nthis.scale.x = this.scale.y = scale;\nthis.x = Graphics.width;\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._targetX = Graphics.width * 3 / 4;\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._duration = 10;\nthis.opacity = 0;"
 *
 * @param PartyWindow
 * @text Party Window
 *
 * @param ShowReserve:eval
 * @text Show Reserve Memebers
 * @parent PartyWindow
 * @type boolean
 * @on Show Reserve Members
 * @off Hide Reserve Members
 * @desc Show reserve members while on the Main Menu scene?
 * @default true
 *
 * @param HideMainMenuOnly:eval
 * @text Hide Main Menu Only
 * @parent ShowReserve:eval
 * @type boolean
 * @on Hide in Main Menu Only
 * @off Hide in all Scenes
 * @desc If reserve members are hidden, hide them only in the main menu or all scenes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Playtime Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Playtime:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Playtime Window?
 * @default true
 *
 * @param AdjustCommandHeight:func
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Playtime Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Playtime window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Playtime window.
 * Default: 26
 * @default 20
 *
 * @param Icon:num
 * @text Time Icon
 * @desc Icon displayed for the 'Time' label.
 * @default 75
 *
 * @param Time:str
 * @text Time Text
 * @desc Text for the display of 'Time' in the Playtime window.
 * @default Time
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Playtime window.
 * @default "const rows = 1;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Variable Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Variable:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Variable Window?
 * @default false
 *
 * @param AdjustCommandHeight:func
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Variable Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Variable window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Variable window.
 * Default: 26
 * @default 20
 *
 * @param VarList:arraynum
 * @text Variable List
 * @type variable[]
 * @desc Select variables to be displayed into the window.
 * Use \i[x] to determine their icon.
 * @default ["1","2","3"]
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Variable window.
 * @default "const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Horizontal Command Window Style
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomCmdWin:
 *
 * @param Style:str
 * @text Command Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw command entries in the Command Window?
 * @default auto
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Rows:num
 * @text Rows
 * @type number
 * @min 1
 * @desc Number of visible rows.
 * @default 2
 *
 * @param Cols:num
 * @text Columns
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 4
 *
 * @param MobileThickness:num
 * @text Mobile Thickness
 * @type number
 * @min 1
 * @desc The thickness of the buttons for mobile version.
 * @default 5
 *
 */
/* ----------------------------------------------------------------------------
 * List Style Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ListStyles:
 *
 * @param DefaultStyle:func
 * @text JS: Default
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst sx = rect.x + 180;\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\nconst lineHeight = this.lineHeight();\nconst sx2 = sx + 180;\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\nthis.drawActorClass(actor, sx2, sy);\n\n// Place Gauges\nconst sy2 = sy + lineHeight;\nconst gaugeLineHeight = this.gaugeLineHeight();\nthis.placeGauge(actor, \"hp\", sx2, sy2);\nthis.placeGauge(actor, \"mp\", sx2, sy2 + gaugeLineHeight);\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\nif ($dataSystem.optDisplayTp && roomForTp) {\n    this.placeGauge(actor, \"tp\", sx2, sy2 + gaugeLineHeight * 2);\n}\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx2 + 180;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 * @param VerticalStyle:func
 * @text JS: Vertical
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x;\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Actor Name\nlet sx = rect.x;\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\nlet sw = rect.width;\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param PortraitStyle:func
 * @text JS: Portrait
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = rect.height;\nconst gx = rect.x;\nconst gy = rect.y;\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\n\n// Draw Dark Rectangle\nlet sx = rect.x;\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\nlet sw = rect.width;\nlet sh = rect.y + rect.height - sy;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param SoloStyle:func
 * @text JS: Solo
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\n\n// Draw Actor Graphic\nlet sx = rect.x;\nlet sy = rect.y;\nlet sw = rect.width;\nlet sh = rect.height;\n\n// Portrait\nif (actor.getMenuImage() !== '') {\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\n\n// Everything Else\n} else {\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\n}\n\n// Draw Dark Rectangle\nsh = Math.ceil(lineHeight * 4.5);\nsy = rect.y + rect.height - sh;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nsw = Math.round(rect.width / 2);\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Prepare Stat Coordinates\nsx = rect.x + Math.floor(rect.width / 2);\nsw = rect.width / 2;\nsh = rect.height;\nconst sx3 = sx;\nconst cw = rect.width - sx3 - 2;\n\n// Prepare Total Content Height to vertically center the content.\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    totalHeight += lineHeight;\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\nconst equips = actor.equips();\ntotalHeight += lineHeight;\ntotalHeight += equips.length * lineHeight;\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\n\n// Place Gauges\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nif ($dataSystem.optDisplayTp) {\n    sy += gaugeLineHeight;\n    this.placeGauge(actor, \"tp\", sx, sy);\n    sy += gaugeLineHeight;\n}\nlet ny = sy;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    sy += lineHeight;\n    const pw = Math.floor(cw / 2) - 24;\n    let px = sx3;\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, sy, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            sy += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n    ny += lineHeight;\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\n\n// Draw Actor Equipment\nthis.resetFontSettings();\nsx = rect.x + Math.floor(rect.width / 2);\nsy = ny + lineHeight;\nsw = rect.width / 2;\nfor (const equip of equips) {\n    if (equip) {\n        this.drawItemName(equip, sx, sy, sw);\n        sy += lineHeight;\n        if (sy + lineHeight > rect.y + rect.height) return;\n    }\n}"
 *
 * @param ThinStyle:func
 * @text JS: Thin
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\n\n// Place Gauges\nsx += 180;\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy);"
 *
 * @param ThickerStyle:func
 * @text JS: Thicker
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\nthis.drawActorName(actor, sx, sy);\nthis.drawActorClass(actor, sx, sy + lineHeight);\n//this.drawActorLevel(actor, sx, sy + lineHeight);\n\n// Place Gauges\nsx += 180;\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nthis.placeGauge(actor, \"mp\", sx, sy + gaugeLineHeight);\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy + (gaugeLineHeight * 2));\nsx += 160;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 */
//=============================================================================

const _0x268b=['drawIcon','General','match','NUM','ThickerStyle','createActorMenuBackgroundImageSprite','ActorBgMenus','drawItemStatusPortraitStyleOnLoad','Scene_Menu_commandPersonal','iconText','addSymbolBridge','TextAlign','Window_MenuStatus_drawItemImage','maxBattleMembers','updateActor','opacity','svbattler','drawAllItems','drawItemActorMenuImage','maxCols','Step2','iconWidth','_playtimeText','_duration','commandWindowStyle','changeTextColor','1001533yuyLNu','map','_commandNameWindow','MainMenuCore','addChild','adjustStatusWindowMobile','_playtimeWindow','ARRAYSTRUCT','_scene','playtimeText','svActorVertCells','ConvertParams','concat','changePaintOpacity','statusWindowRectMobileStyle','_targetY','commandWindowRectMobileStyle','Time','thicker','createVariableWindow','drawSvActor','trim','width','ceil','mobile','Rows','Variable','maxVisibleItems','createCommandNameWindow','1106972rQHpMO','clear','format','_timer','includes','actor','index','AutoGoldHeight','22205qTwttv','DefaultStyle','call','commandWindowRectThinBottomStyle','ARRAYFUNC','boxHeight','bitmap','commandStyleCheck','Scene_MenuBase_createBackground','initMenuImage','iconHeight','vertical','currentExt','updateOpacity','\x5cI[%1]%2','PersonalHandlerJS','auto','Enable','openness','62EcCNNS','colSpacing','drawItemStatusThinStyle','StatusListStyle','Step1Start','adjustCommandHeightByVariable','commandCommonEvent','drawPendingItemBackground','loadPicture','createBackground','windowPadding','AdjustCommandHeight','loadFaceImages','onPersonalOk','getMenuImage','CommandWindowStyle','mainAreaHeight','loadSvActor','drawItemStatusSoloStyleOnLoad','_goldWindow','item','top','Playtime','adjustDefaultCommandWindowRect','min','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','innerWidth','PortraitStyle','_variableWindow','drawPlaytime','BgType','textSizeEx','_list','open','STR','battlerName','setBackgroundType','canCreateVariableWindow','TextStr','right','addLoadListener','_commandWindow','currentSymbol','statusWindowRectBottomStyle','update','Window_MenuStatus_maxItems','resetFontSettings','listStyle','playtimeWindowRect','setActor','drawItemStatusSoloStyle','ActorBgMenuJS','CustomCmdWin','Scene_Menu_goldWindowRect','characterIndex','_bitmapReady','addSaveCommand','refresh','bind','variableWindowRectTopStyle','StatusSelectLast','ThinGoldWindow','setup','drawItemStatusDefaultStyle','characterName','selectLast','SoloQuick','loadBitmap','bottom','setMenuImage','TextJS','WindowRect','onPersonalCancel','updateTimer','Step1','text','EVAL','activate','status','options','Window_StatusBase_loadFaceImages','_menuImage','prototype','push','thinTop','Scene_Menu_commandWindowRect','thinGoldWindow','createPlaytimeWindow','Scene_Menu_statusWindowRect','updatePosition','commandWindowRectThinTopStyle','applyThinnerGoldWindowRect','commandName','default','_data','getMenuImageOffsetY','portrait','VarList','reserveCommonEvent','ShowJS','makeMainMenuCoreCommandList','fittingHeight','updateDuration','addWindow','drawActorGraphic','itemLineRect','adjustCommandHeightByPlaytime','createCommandWindow','Scene_Menu_onPersonalCancel','needsDummyWindow','addFormationCommand','Settings','goldWindowRectTopStyle','drawTextEx','blt','showOnlyBattleMembers','drawItemImage','SoloStyle','faceHeight','addCommand','variables','addOptionsCommand','drawItemStatusThickerStyle','shift','drawItemStatusPortraitStyle','drawItemBackground','canCreatePlaytimeWindow','normalColor','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','faceWidth','isCommandEnabled','drawTimeIcon','max','drawItemStatusVerticalStyle','Window_MenuCommand_initialize','create','ChangeActorMenuImageGroup','ExtJS','ChangeActorMenuImageRange','Style','drawTimeLabel','contents','description','thinBottom','icon','drawItemStatus','setHandler','drawItemActorSprite','isArray','name','lineHeight','isSoloQuickMode','drawItemStyleIconText','ShowReserve','commandFormation','solo','addMainCommands','statusWindowRect','itemRect','MobileThickness','ThinStyle','EnableJS','exit','goldWindowRect','commandNameWindowDrawText','FUNC','itemHeight','ChangeActorMenuImageJS','ListStyles','commandNameWindowCenter','updateCommandNameWindow','variableWindowRect','height','isBattleMember','ARRAYEVAL','drawItem','drawText','Step1End','note','mainCommandWidth','StatusGraphic','floor','_statusWindow','Scene_Menu_create','Untitled','commandPersonal','drawItemStyleIcon','Window_MenuStatus_itemHeight','battleMembers','initialize','_actor','AutoGoldY','cancel','mainAreaBottom','round','Cols','return\x200','commandStyle','popScene','VerticalStyle','_dummyWindow','792570MorWfP','graphicType','value','FontSize','maxItems','_actorMenuBgSprite','version','addGameEndCommand','calcWindowHeight','length','svActorHorzCells','topIndex','drawItemActorSvBattler','close','members','Icon','systemColor','boxWidth','constructor','parse','left','center','playtimeWindowRectBottomStyle','replace','997839yOeaHc','statusWindowRectTopStyle','itemTextAlign','smoothSelect','isExpGaugeDrawn','1619563bBPeKb','mainAreaTop','save','thin','_commandList','Window_MenuStatus_selectLast','makeCommandList','commandWindowRectTopStyle','Symbol','commandNameWindowDrawBackground','registerCommand','callUpdateHelp','drawItemActorFace','drawActorFace','getMenuImageOffsetX','createStatusWindow','none','Scene_Menu_onFormationCancel','HideMainMenuOnly','fontSize','isDisplayActorMenuBackgroundImage','goldWindowRectBottomStyle','JSON','onBitmapLoad','264993vIPkOd'];const _0x415a=function(_0x1db22,_0x1a35b5){_0x1db22=_0x1db22-0x103;let _0x268b06=_0x268b[_0x1db22];return _0x268b06;};const _0x39a349=_0x415a;(function(_0x176703,_0x23b878){const _0x4fd714=_0x415a;while(!![]){try{const _0x19e57b=parseInt(_0x4fd714(0x13a))+-parseInt(_0x4fd714(0x155))+-parseInt(_0x4fd714(0x11d))+parseInt(_0x4fd714(0x122))+-parseInt(_0x4fd714(0x172))+parseInt(_0x4fd714(0x18d))*parseInt(_0x4fd714(0x17a))+parseInt(_0x4fd714(0x105));if(_0x19e57b===_0x23b878)break;else _0x176703['push'](_0x176703['shift']());}catch(_0x810b71){_0x176703['push'](_0x176703['shift']());}}}(_0x268b,0xe7524));var label=_0x39a349(0x158),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x21d929){const _0x5bca37=_0x39a349;return _0x21d929[_0x5bca37(0x1db)]&&_0x21d929[_0x5bca37(0x21b)][_0x5bca37(0x176)]('['+label+']');})[0x0];VisuMZ[label][_0x39a349(0x1fc)]=VisuMZ[label][_0x39a349(0x1fc)]||{},VisuMZ['ConvertParams']=function(_0x13f6bd,_0x2c0579){const _0x502c65=_0x39a349;for(const _0x409dd1 in _0x2c0579){if(_0x409dd1[_0x502c65(0x13d)](/(.*):(.*)/i)){const _0x207d5b=String(RegExp['$1']),_0xb1cea0=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x1d014a,_0x66371e,_0x37327b;switch(_0xb1cea0){case _0x502c65(0x13e):_0x1d014a=_0x2c0579[_0x409dd1]!==''?Number(_0x2c0579[_0x409dd1]):0x0;break;case'ARRAYNUM':_0x66371e=_0x2c0579[_0x409dd1]!==''?JSON[_0x502c65(0x118)](_0x2c0579[_0x409dd1]):[],_0x1d014a=_0x66371e[_0x502c65(0x156)](_0x29612f=>Number(_0x29612f));break;case _0x502c65(0x1d9):_0x1d014a=_0x2c0579[_0x409dd1]!==''?eval(_0x2c0579[_0x409dd1]):null;break;case _0x502c65(0x23b):_0x66371e=_0x2c0579[_0x409dd1]!==''?JSON['parse'](_0x2c0579[_0x409dd1]):[],_0x1d014a=_0x66371e[_0x502c65(0x156)](_0x295876=>eval(_0x295876));break;case _0x502c65(0x138):_0x1d014a=_0x2c0579[_0x409dd1]!==''?JSON[_0x502c65(0x118)](_0x2c0579[_0x409dd1]):'';break;case'ARRAYJSON':_0x66371e=_0x2c0579[_0x409dd1]!==''?JSON[_0x502c65(0x118)](_0x2c0579[_0x409dd1]):[],_0x1d014a=_0x66371e[_0x502c65(0x156)](_0x5afaac=>JSON[_0x502c65(0x118)](_0x5afaac));break;case _0x502c65(0x232):_0x1d014a=_0x2c0579[_0x409dd1]!==''?new Function(JSON[_0x502c65(0x118)](_0x2c0579[_0x409dd1])):new Function(_0x502c65(0x251));break;case _0x502c65(0x17e):_0x66371e=_0x2c0579[_0x409dd1]!==''?JSON[_0x502c65(0x118)](_0x2c0579[_0x409dd1]):[],_0x1d014a=_0x66371e['map'](_0x181370=>new Function(JSON['parse'](_0x181370)));break;case _0x502c65(0x1af):_0x1d014a=_0x2c0579[_0x409dd1]!==''?String(_0x2c0579[_0x409dd1]):'';break;case'ARRAYSTR':_0x66371e=_0x2c0579[_0x409dd1]!==''?JSON[_0x502c65(0x118)](_0x2c0579[_0x409dd1]):[],_0x1d014a=_0x66371e['map'](_0x2dc6e7=>String(_0x2dc6e7));break;case'STRUCT':_0x37327b=_0x2c0579[_0x409dd1]!==''?JSON[_0x502c65(0x118)](_0x2c0579[_0x409dd1]):{},_0x13f6bd[_0x207d5b]={},VisuMZ['ConvertParams'](_0x13f6bd[_0x207d5b],_0x37327b);continue;case _0x502c65(0x15c):_0x66371e=_0x2c0579[_0x409dd1]!==''?JSON[_0x502c65(0x118)](_0x2c0579[_0x409dd1]):[],_0x1d014a=_0x66371e['map'](_0xac709a=>VisuMZ[_0x502c65(0x160)]({},JSON['parse'](_0xac709a)));break;default:continue;}_0x13f6bd[_0x207d5b]=_0x1d014a;}}return _0x13f6bd;},(_0x23792c=>{const _0x5e3ba4=_0x39a349,_0x525308=_0x23792c[_0x5e3ba4(0x222)];for(const _0x3b5e5c of dependencies){if(!Imported[_0x3b5e5c]){alert(_0x5e3ba4(0x1a6)['format'](_0x525308,_0x3b5e5c)),SceneManager[_0x5e3ba4(0x22f)]();break;}}const _0x2a3799=_0x23792c['description'];if(_0x2a3799[_0x5e3ba4(0x13d)](/\[Version[ ](.*?)\]/i)){const _0x1640c5=Number(RegExp['$1']);_0x1640c5!==VisuMZ[label][_0x5e3ba4(0x10b)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x5e3ba4(0x174)](_0x525308,_0x1640c5)),SceneManager[_0x5e3ba4(0x22f)]());}if(_0x2a3799[_0x5e3ba4(0x13d)](/\[Tier[ ](\d+)\]/i)){const _0x5e85da=Number(RegExp['$1']);_0x5e85da<tier?(alert(_0x5e3ba4(0x20d)['format'](_0x525308,_0x5e85da,tier)),SceneManager[_0x5e3ba4(0x22f)]()):tier=Math[_0x5e3ba4(0x211)](_0x5e85da,tier);}VisuMZ[_0x5e3ba4(0x160)](VisuMZ[label][_0x5e3ba4(0x1fc)],_0x23792c['parameters']);})(pluginData),PluginManager[_0x39a349(0x12c)](pluginData[_0x39a349(0x222)],_0x39a349(0x215),_0x19ce2e=>{const _0x13c5b7=_0x39a349;VisuMZ[_0x13c5b7(0x160)](_0x19ce2e,_0x19ce2e);const _0x2fd7e2=_0x19ce2e[_0x13c5b7(0x1d7)],_0x54fc0d=_0x19ce2e['Step2'];for(let _0x540270 of _0x2fd7e2){_0x540270=parseInt(_0x540270)||0x0;if(_0x540270<=0x0)continue;const _0x16b995=$gameActors['actor'](_0x540270);if(!_0x16b995)continue;_0x16b995[_0x13c5b7(0x1d2)](_0x54fc0d);}}),PluginManager[_0x39a349(0x12c)](pluginData[_0x39a349(0x222)],_0x39a349(0x217),_0x586e48=>{const _0x4b5141=_0x39a349;VisuMZ[_0x4b5141(0x160)](_0x586e48,_0x586e48);const _0x35e687=_0x586e48[_0x4b5141(0x23e)]>=_0x586e48['Step1Start']?_0x586e48[_0x4b5141(0x191)]:_0x586e48[_0x4b5141(0x23e)],_0x24d2a8=_0x586e48[_0x4b5141(0x23e)]>=_0x586e48[_0x4b5141(0x191)]?_0x586e48[_0x4b5141(0x23e)]:_0x586e48['Step1Start'],_0x49cfd8=Array(_0x24d2a8-_0x35e687+0x1)['fill']()[_0x4b5141(0x156)]((_0x225990,_0x141bf6)=>_0x35e687+_0x141bf6),_0x8ab35=_0x586e48['Step2'];for(let _0x4f6705 of _0x49cfd8){_0x4f6705=parseInt(_0x4f6705)||0x0;if(_0x4f6705<=0x0)continue;const _0x1bbafe=$gameActors[_0x4b5141(0x177)](_0x4f6705);if(!_0x1bbafe)continue;_0x1bbafe['setMenuImage'](_0x8ab35);}}),PluginManager[_0x39a349(0x12c)](pluginData[_0x39a349(0x222)],_0x39a349(0x234),_0x2974ae=>{const _0x1ace79=_0x39a349;VisuMZ['ConvertParams'](_0x2974ae,_0x2974ae);const _0x4bff22=_0x2974ae['Step1'];let _0x2ddda8=[];while(_0x4bff22['length']>0x0){const _0x5e705a=_0x4bff22[_0x1ace79(0x208)]();Array[_0x1ace79(0x221)](_0x5e705a)?_0x2ddda8=_0x2ddda8[_0x1ace79(0x161)](_0x5e705a):_0x2ddda8[_0x1ace79(0x1e0)](_0x5e705a);}const _0x152960=_0x2974ae[_0x1ace79(0x14f)];for(let _0x2959fe of _0x2ddda8){_0x2959fe=parseInt(_0x2959fe)||0x0;if(_0x2959fe<=0x0)continue;const _0x4a55c4=$gameActors[_0x1ace79(0x177)](_0x2959fe);if(!_0x4a55c4)continue;_0x4a55c4[_0x1ace79(0x1d2)](_0x152960);}}),VisuMZ[_0x39a349(0x158)]['Game_Actor_setup']=Game_Actor[_0x39a349(0x1df)][_0x39a349(0x1cb)],Game_Actor[_0x39a349(0x1df)][_0x39a349(0x1cb)]=function(_0x3b117f){const _0x3f5c82=_0x39a349;VisuMZ[_0x3f5c82(0x158)]['Game_Actor_setup']['call'](this,_0x3b117f),this[_0x3f5c82(0x183)]();},Game_Actor[_0x39a349(0x1df)]['initMenuImage']=function(){const _0x25f10d=_0x39a349;this['_menuImage']='',this[_0x25f10d(0x177)]()&&this[_0x25f10d(0x177)]()[_0x25f10d(0x23f)][_0x25f10d(0x13d)](/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this[_0x25f10d(0x1de)]=String(RegExp['$1']));},Game_Actor[_0x39a349(0x1df)]['getMenuImage']=function(){const _0x321081=_0x39a349;if(this[_0x321081(0x1de)]===undefined)this[_0x321081(0x183)]();return this[_0x321081(0x1de)];},Game_Actor['prototype'][_0x39a349(0x1d2)]=function(_0x864610){const _0x3ec9db=_0x39a349;if(this[_0x3ec9db(0x1de)]===undefined)this['initMenuImage']();this['_menuImage']=_0x864610;},Game_Actor[_0x39a349(0x1df)][_0x39a349(0x130)]=function(){const _0x1d79da=_0x39a349;if(this[_0x1d79da(0x177)]()[_0x1d79da(0x23f)][_0x1d79da(0x13d)](/<MENU (?:IMAGE|PORTRAIT) OFFSET X:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x1d79da(0x177)]()[_0x1d79da(0x23f)][_0x1d79da(0x13d)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);}return 0x0;},Game_Actor[_0x39a349(0x1df)][_0x39a349(0x1ec)]=function(){const _0x2d544d=_0x39a349;if(this[_0x2d544d(0x177)]()['note'][_0x2d544d(0x13d)](/<MENU (?:IMAGE|PORTRAIT) OFFSET Y:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x2d544d(0x177)]()[_0x2d544d(0x23f)][_0x2d544d(0x13d)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$2']);}return 0x0;},Scene_MenuBase[_0x39a349(0x1df)][_0x39a349(0x136)]=function(){const _0x1bab70=_0x39a349;return VisuMZ[_0x1bab70(0x158)]['Settings'][_0x1bab70(0x13c)][_0x1bab70(0x141)]['includes'](this[_0x1bab70(0x117)][_0x1bab70(0x222)]);},VisuMZ['MainMenuCore'][_0x39a349(0x182)]=Scene_MenuBase[_0x39a349(0x1df)][_0x39a349(0x196)],Scene_MenuBase[_0x39a349(0x1df)]['createBackground']=function(){const _0x2873ee=_0x39a349;VisuMZ[_0x2873ee(0x158)][_0x2873ee(0x182)][_0x2873ee(0x17c)](this),this[_0x2873ee(0x140)]();},Scene_MenuBase[_0x39a349(0x1df)][_0x39a349(0x140)]=function(){const _0x4fa6db=_0x39a349;this['_actorMenuBgSprite']=new Sprite_MenuBackgroundActor(),this[_0x4fa6db(0x159)](this[_0x4fa6db(0x10a)]);},VisuMZ[_0x39a349(0x158)]['Scene_MenuBase_updateActor']=Scene_MenuBase[_0x39a349(0x1df)][_0x39a349(0x149)],Scene_MenuBase[_0x39a349(0x1df)]['updateActor']=function(){const _0x520e8c=_0x39a349;VisuMZ[_0x520e8c(0x158)]['Scene_MenuBase_updateActor'][_0x520e8c(0x17c)](this),this[_0x520e8c(0x136)]()&&this[_0x520e8c(0x10a)]&&this[_0x520e8c(0x10a)][_0x520e8c(0x1be)](this[_0x520e8c(0x24b)]);},VisuMZ[_0x39a349(0x158)]['Scene_Menu_create']=Scene_Menu['prototype']['create'],Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x214)]=function(){const _0x51a762=_0x39a349;VisuMZ[_0x51a762(0x158)][_0x51a762(0x244)][_0x51a762(0x17c)](this),this[_0x51a762(0x1e4)](),this[_0x51a762(0x168)](),this['createDummyWindow']();},Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x1f8)]=function(){const _0x168501=_0x39a349,_0x57c1ba=this['commandWindowRect'](),_0x26a2a1=new Window_MenuCommand(_0x57c1ba);_0x26a2a1[_0x168501(0x21f)](_0x168501(0x24d),this['popScene']['bind'](this)),this['addWindow'](_0x26a2a1),this[_0x168501(0x1b6)]=_0x26a2a1;},VisuMZ[_0x39a349(0x158)][_0x39a349(0x1e2)]=Scene_Menu[_0x39a349(0x1df)]['commandWindowRect'],Scene_Menu[_0x39a349(0x1df)]['commandWindowRect']=function(){const _0x22addf=_0x39a349,_0x5932e6=this[_0x22addf(0x153)]();if(_0x5932e6===_0x22addf(0x1a2))return this[_0x22addf(0x129)]();else{if(_0x5932e6==='thinTop')return this[_0x22addf(0x1e7)]();else{if(_0x5932e6==='bottom')return this['commandWindowRectBottomStyle']();else{if(_0x5932e6===_0x22addf(0x21c))return this[_0x22addf(0x17d)]();else{if(_0x5932e6===_0x22addf(0x16d))return this[_0x22addf(0x165)]();else{const _0x45f364=VisuMZ[_0x22addf(0x158)][_0x22addf(0x1e2)][_0x22addf(0x17c)](this);return this[_0x22addf(0x1a4)](_0x45f364),_0x45f364;}}}}}},Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x1a4)]=function(_0x3144f7){const _0x451e41=_0x39a349;this['adjustCommandHeightByPlaytime']()&&(_0x3144f7[_0x451e41(0x239)]-=this[_0x451e41(0x1bd)]()['height']),this[_0x451e41(0x192)]()&&(_0x3144f7['height']-=this[_0x451e41(0x238)]()['height']);},Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x129)]=function(){const _0x34617d=_0x39a349,_0x34be9e=VisuMZ['MainMenuCore']['Settings'][_0x34617d(0x1c1)][_0x34617d(0x16e)],_0x3bd472=Graphics['boxWidth'],_0x221b01=this[_0x34617d(0x10d)](_0x34be9e,!![]),_0x16b111=0x0,_0x3d4c03=this['mainAreaTop']();return new Rectangle(_0x16b111,_0x3d4c03,_0x3bd472,_0x221b01);},Scene_Menu[_0x39a349(0x1df)]['commandWindowRectThinTopStyle']=function(){const _0x4fef4b=_0x39a349,_0x9c9120=VisuMZ[_0x4fef4b(0x158)]['Settings'][_0x4fef4b(0x1c1)]['Rows'],_0x5e947d=Graphics[_0x4fef4b(0x116)],_0x3cc32a=this['calcWindowHeight'](0x1,!![]),_0x27e89f=0x0,_0x1e9d4f=this[_0x4fef4b(0x123)]();return new Rectangle(_0x27e89f,_0x1e9d4f,_0x5e947d,_0x3cc32a);},Scene_Menu[_0x39a349(0x1df)]['commandWindowRectBottomStyle']=function(){const _0x455fda=_0x39a349,_0x3ccdb0=VisuMZ[_0x455fda(0x158)][_0x455fda(0x1fc)]['CustomCmdWin'][_0x455fda(0x16e)],_0x4ae795=Graphics[_0x455fda(0x116)],_0x385e7f=this[_0x455fda(0x10d)](_0x3ccdb0,!![]),_0x3debd2=0x0,_0xe63d11=this['mainAreaBottom']()-_0x385e7f;return new Rectangle(_0x3debd2,_0xe63d11,_0x4ae795,_0x385e7f);},Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x17d)]=function(){const _0x241651=_0x39a349,_0x4a6578=VisuMZ['MainMenuCore']['Settings'][_0x241651(0x1c1)]['Rows'],_0x4b13eb=Graphics[_0x241651(0x116)],_0x1eecd8=this[_0x241651(0x10d)](0x1,!![]),_0x2eea26=0x0,_0x3a9099=this[_0x241651(0x24e)]()-_0x1eecd8;return new Rectangle(_0x2eea26,_0x3a9099,_0x4b13eb,_0x1eecd8);},Scene_Menu[_0x39a349(0x1df)]['commandWindowRectMobileStyle']=function(){const _0x5f8890=_0x39a349,_0x169443=VisuMZ[_0x5f8890(0x158)][_0x5f8890(0x1fc)][_0x5f8890(0x1c1)][_0x5f8890(0x16e)],_0x1926c8=Graphics[_0x5f8890(0x116)],_0x240d0f=Window_MenuCommand['prototype'][_0x5f8890(0x1f2)](_0x169443),_0x30b992=0x0,_0x2f0c3f=Math[_0x5f8890(0x24f)]((Graphics[_0x5f8890(0x17f)]-_0x240d0f)/0x2);return new Rectangle(_0x30b992,_0x2f0c3f,_0x1926c8,_0x240d0f);},Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x153)]=function(){const _0x4b881f=_0x39a349;return VisuMZ[_0x4b881f(0x158)]['Settings'][_0x4b881f(0x19c)];},Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x1e3)]=function(){const _0x44fb36=_0x39a349;if(this['commandWindowStyle']()!==_0x44fb36(0x1ea))return!![];return VisuMZ[_0x44fb36(0x158)]['Settings'][_0x44fb36(0x13c)][_0x44fb36(0x1ca)];},Scene_Menu['prototype']['createGoldWindow']=function(){const _0x5b891e=_0x39a349,_0x5620f9=this['goldWindowRect']();this[_0x5b891e(0x1a0)]=this[_0x5b891e(0x1e3)]()?new Window_ThinGold(_0x5620f9):new Window_Gold(_0x5620f9),this[_0x5b891e(0x1f4)](this['_goldWindow']);},VisuMZ[_0x39a349(0x158)][_0x39a349(0x1c2)]=Scene_Menu['prototype'][_0x39a349(0x230)],Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x230)]=function(){const _0x56daf7=_0x39a349,_0x75f07a=this[_0x56daf7(0x153)]();if([_0x56daf7(0x1a2),_0x56daf7(0x1e1),_0x56daf7(0x16d)][_0x56daf7(0x176)](_0x75f07a))return this[_0x56daf7(0x1fd)]();else{if([_0x56daf7(0x1d1),_0x56daf7(0x21c)][_0x56daf7(0x176)](_0x75f07a))return this[_0x56daf7(0x137)]();else{const _0x118105=VisuMZ['MainMenuCore'][_0x56daf7(0x1c2)][_0x56daf7(0x17c)](this);return this['applyThinnerGoldWindowRect'](_0x118105),_0x118105;}}},Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x1e8)]=function(_0x562ad5){const _0x5092b5=_0x39a349;if(this[_0x5092b5(0x1e3)]()){if(VisuMZ['MainMenuCore'][_0x5092b5(0x1fc)][_0x5092b5(0x13c)][_0x5092b5(0x24c)]){const _0x309199=_0x562ad5[_0x5092b5(0x239)]-this[_0x5092b5(0x10d)](0x1,![]);_0x562ad5['y']+=_0x309199;}VisuMZ[_0x5092b5(0x158)][_0x5092b5(0x1fc)][_0x5092b5(0x13c)][_0x5092b5(0x179)]&&(_0x562ad5['height']=this['calcWindowHeight'](0x1,![]));}},Scene_Menu[_0x39a349(0x1df)]['goldWindowRectTopStyle']=function(){const _0x2e4e51=_0x39a349,_0x1da96f=this['mainCommandWidth'](),_0x37ed28=this[_0x2e4e51(0x10d)](0x1,![]),_0x3e87a1=Graphics[_0x2e4e51(0x116)]-_0x1da96f,_0x521546=this[_0x2e4e51(0x24e)]()-_0x37ed28;return new Rectangle(_0x3e87a1,_0x521546,_0x1da96f,_0x37ed28);},Scene_Menu['prototype'][_0x39a349(0x137)]=function(){const _0x5c5b6f=_0x39a349,_0x4c9cda=this[_0x5c5b6f(0x240)](),_0x1dc5fd=this[_0x5c5b6f(0x10d)](0x1,![]),_0x22b18d=Graphics[_0x5c5b6f(0x116)]-_0x4c9cda,_0x54172c=this['mainAreaTop']();return new Rectangle(_0x22b18d,_0x54172c,_0x4c9cda,_0x1dc5fd);},VisuMZ[_0x39a349(0x158)]['Scene_Menu_createStatusWindow']=Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x131)],Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x131)]=function(){const _0x1f48d3=_0x39a349;VisuMZ[_0x1f48d3(0x158)]['Scene_Menu_createStatusWindow'][_0x1f48d3(0x17c)](this),this['adjustStatusWindowMobile']();},Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x15a)]=function(){const _0xe06ee9=_0x39a349;this[_0xe06ee9(0x153)]()===_0xe06ee9(0x16d)&&(this[_0xe06ee9(0x243)][_0xe06ee9(0x18c)]=0x0);},VisuMZ['MainMenuCore']['Scene_Menu_statusWindowRect']=Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x22a)],Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x22a)]=function(){const _0x391cbe=_0x39a349,_0x214c33=this[_0x391cbe(0x153)]();if([_0x391cbe(0x1a2),_0x391cbe(0x1e1)]['includes'](_0x214c33))return this[_0x391cbe(0x11e)]();else{if([_0x391cbe(0x1d1),_0x391cbe(0x21c)]['includes'](_0x214c33))return this[_0x391cbe(0x1b8)]();else return _0x214c33===_0x391cbe(0x16d)?this[_0x391cbe(0x163)]():VisuMZ['MainMenuCore'][_0x391cbe(0x1e5)][_0x391cbe(0x17c)](this);}},Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x11e)]=function(){const _0x158f71=_0x39a349,_0x4adcee=Graphics[_0x158f71(0x116)],_0x3e8ed7=this[_0x158f71(0x19d)]()-this[_0x158f71(0x1b6)][_0x158f71(0x239)]-this['_goldWindow'][_0x158f71(0x239)],_0x36014a=0x0,_0x346372=this[_0x158f71(0x1b6)]['y']+this[_0x158f71(0x1b6)][_0x158f71(0x239)];return new Rectangle(_0x36014a,_0x346372,_0x4adcee,_0x3e8ed7);},Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x1b8)]=function(){const _0xfda0f1=_0x39a349,_0x7f79b5=Graphics['boxWidth'],_0x4fa234=this[_0xfda0f1(0x19d)]()-this[_0xfda0f1(0x1b6)]['height']-this[_0xfda0f1(0x1a0)][_0xfda0f1(0x239)],_0x573393=0x0,_0x2888ae=this[_0xfda0f1(0x1a0)]['y']+this[_0xfda0f1(0x1a0)][_0xfda0f1(0x239)];return new Rectangle(_0x573393,_0x2888ae,_0x7f79b5,_0x4fa234);},Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x163)]=function(){const _0x3b4deb=_0x39a349,_0x28e632=Graphics[_0x3b4deb(0x116)],_0x5f0bdf=this[_0x3b4deb(0x19d)]()-this[_0x3b4deb(0x1a0)][_0x3b4deb(0x239)],_0x15710e=0x0,_0x5c02da=this[_0x3b4deb(0x24e)]()-this[_0x3b4deb(0x1a0)][_0x3b4deb(0x239)]-_0x5f0bdf;return new Rectangle(_0x15710e,_0x5c02da,_0x28e632,_0x5f0bdf);},Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x1e4)]=function(){const _0x3e3168=_0x39a349;if(!this['canCreatePlaytimeWindow']())return new Rectangle(0x0,0x0,0x0,0x0);const _0x3f3809=this[_0x3e3168(0x1bd)]();this['_playtimeWindow']=new Window_Playtime(_0x3f3809),this[_0x3e3168(0x15b)][_0x3e3168(0x1b1)](VisuMZ[_0x3e3168(0x158)][_0x3e3168(0x1fc)][_0x3e3168(0x1a3)][_0x3e3168(0x1ab)]),this[_0x3e3168(0x1f4)](this[_0x3e3168(0x15b)]);},Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x20b)]=function(){const _0x42b482=_0x39a349;return VisuMZ[_0x42b482(0x158)][_0x42b482(0x1fc)][_0x42b482(0x1a3)][_0x42b482(0x18b)];},Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x1f7)]=function(){const _0x2ec2d5=_0x39a349;return this[_0x2ec2d5(0x20b)]()&&VisuMZ[_0x2ec2d5(0x158)]['Settings'][_0x2ec2d5(0x1a3)][_0x2ec2d5(0x198)];},Scene_Menu['prototype'][_0x39a349(0x1bd)]=function(){const _0x32c8e8=_0x39a349,_0x4e04a2=this[_0x32c8e8(0x153)]();if([_0x32c8e8(0x1a2),_0x32c8e8(0x1e1),'mobile'][_0x32c8e8(0x176)](_0x4e04a2))return this['playtimeWindowRectTopStyle']();else return[_0x32c8e8(0x1d1),_0x32c8e8(0x21c)][_0x32c8e8(0x176)](_0x4e04a2)?this[_0x32c8e8(0x11b)]():VisuMZ[_0x32c8e8(0x158)][_0x32c8e8(0x1fc)]['Playtime'][_0x32c8e8(0x1d4)]['call'](this);},Scene_Menu[_0x39a349(0x1df)]['playtimeWindowRectTopStyle']=function(){const _0x5ecbb3=_0x39a349,_0x4c2ac6=this[_0x5ecbb3(0x240)](),_0x31e846=this[_0x5ecbb3(0x10d)](0x1,![]),_0x51a359=0x0,_0x388a7f=this[_0x5ecbb3(0x24e)]()-_0x31e846;return new Rectangle(_0x51a359,_0x388a7f,_0x4c2ac6,_0x31e846);},Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x11b)]=function(){const _0x5e115c=_0x39a349,_0xb64b4b=this[_0x5e115c(0x240)](),_0xece5b0=this[_0x5e115c(0x10d)](0x1,![]),_0x37309f=0x0,_0x8ee28e=this[_0x5e115c(0x123)]();return new Rectangle(_0x37309f,_0x8ee28e,_0xb64b4b,_0xece5b0);},Scene_Menu[_0x39a349(0x1df)]['createVariableWindow']=function(){const _0x49b31f=_0x39a349;if(!this[_0x49b31f(0x1b2)]())return new Rectangle(0x0,0x0,0x0,0x0);const _0xe9e192=this['variableWindowRect']();this[_0x49b31f(0x1a9)]=new Window_MenuVariables(_0xe9e192),this['_variableWindow']['setBackgroundType'](VisuMZ[_0x49b31f(0x158)][_0x49b31f(0x1fc)][_0x49b31f(0x16f)][_0x49b31f(0x1ab)]),this[_0x49b31f(0x1f4)](this[_0x49b31f(0x1a9)]);},Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x1b2)]=function(){const _0x3e5bc7=_0x39a349;return VisuMZ[_0x3e5bc7(0x158)][_0x3e5bc7(0x1fc)]['Variable'][_0x3e5bc7(0x18b)];},Scene_Menu['prototype']['adjustCommandHeightByVariable']=function(){const _0x274171=_0x39a349;return this[_0x274171(0x1b2)]()&&VisuMZ['MainMenuCore'][_0x274171(0x1fc)][_0x274171(0x16f)][_0x274171(0x198)];},Scene_Menu['prototype'][_0x39a349(0x238)]=function(){const _0x377425=_0x39a349,_0x4b9044=this[_0x377425(0x153)]();if(['top',_0x377425(0x1e1),_0x377425(0x16d)][_0x377425(0x176)](_0x4b9044))return this['variableWindowRectTopStyle']();else return['bottom',_0x377425(0x21c)][_0x377425(0x176)](_0x4b9044)?this['variableWindowRectBottomStyle']():VisuMZ[_0x377425(0x158)][_0x377425(0x1fc)]['Variable'][_0x377425(0x1d4)][_0x377425(0x17c)](this);},Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x1c8)]=function(){const _0x2fb3b0=_0x39a349,_0x1739f1=Graphics['boxWidth']-this[_0x2fb3b0(0x1a0)][_0x2fb3b0(0x16b)]-(this[_0x2fb3b0(0x15b)]?this[_0x2fb3b0(0x15b)]['width']:0x0),_0x1bf19f=this[_0x2fb3b0(0x10d)](0x1,![]),_0x4ca1a6=this[_0x2fb3b0(0x1a0)]['x']-_0x1739f1,_0x4526d2=this[_0x2fb3b0(0x24e)]()-_0x1bf19f;return new Rectangle(_0x4ca1a6,_0x4526d2,_0x1739f1,_0x1bf19f);},Scene_Menu[_0x39a349(0x1df)]['variableWindowRectBottomStyle']=function(){const _0x4c2134=_0x39a349,_0x1ed736=Graphics['boxWidth']-this[_0x4c2134(0x1a0)][_0x4c2134(0x16b)]-(this['_playtimeWindow']?this[_0x4c2134(0x15b)]['width']:0x0),_0x263575=this[_0x4c2134(0x10d)](0x1,![]),_0x4c5c37=this[_0x4c2134(0x1a0)]['x']-_0x1ed736,_0x3a4d3a=this['mainAreaTop']();return new Rectangle(_0x4c5c37,_0x3a4d3a,_0x1ed736,_0x263575);},Scene_Menu[_0x39a349(0x1df)]['createDummyWindow']=function(){const _0x2737f8=_0x39a349;if(!this['needsDummyWindow']())return;const _0x291300=this[_0x2737f8(0x238)]();this['_dummyWindow']=new Window_Base(_0x291300),this[_0x2737f8(0x104)][_0x2737f8(0x1b1)](VisuMZ[_0x2737f8(0x158)]['Settings']['Variable'][_0x2737f8(0x1ab)]),this[_0x2737f8(0x1f4)](this[_0x2737f8(0x104)]);},Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x1fa)]=function(){const _0x3f9639=_0x39a349;if([_0x3f9639(0x1ea),_0x3f9639(0x16d)]['includes'](this[_0x3f9639(0x153)]()))return![];if(this[_0x3f9639(0x1a9)])return![];return!![];},VisuMZ[_0x39a349(0x158)][_0x39a349(0x143)]=Scene_Menu[_0x39a349(0x1df)]['commandPersonal'],Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x246)]=function(){const _0x36bdc6=_0x39a349;if(this[_0x36bdc6(0x224)]()&&this['_statusWindow'])$gameParty['setTargetActor']($gameParty[_0x36bdc6(0x113)]()[0x0]),this[_0x36bdc6(0x19a)]();else{if(this['commandWindowStyle']()==='mobile')this[_0x36bdc6(0x243)][_0x36bdc6(0x1ae)]();VisuMZ[_0x36bdc6(0x158)]['Scene_Menu_commandPersonal'][_0x36bdc6(0x17c)](this);}},Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x224)]=function(){const _0x312db0=_0x39a349;return VisuMZ[_0x312db0(0x158)][_0x312db0(0x1fc)][_0x312db0(0x13c)][_0x312db0(0x1cf)]&&$gameParty[_0x312db0(0x113)]()[_0x312db0(0x10e)]<=0x1;},Scene_Menu['prototype']['onPersonalOk']=function(){const _0x255f4c=_0x39a349,_0x4bc513=this[_0x255f4c(0x1b6)][_0x255f4c(0x1b7)](),_0x1a2da8=this[_0x255f4c(0x1b6)][_0x255f4c(0x186)]();for(const _0x3ba050 of Window_MenuCommand[_0x255f4c(0x126)]){if(_0x3ba050[_0x255f4c(0x12a)]===_0x4bc513){_0x3ba050[_0x255f4c(0x189)][_0x255f4c(0x17c)](this,_0x1a2da8);return;}}},VisuMZ[_0x39a349(0x158)][_0x39a349(0x1f9)]=Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x1d5)],Scene_Menu[_0x39a349(0x1df)]['onPersonalCancel']=function(){const _0x1c2cf1=_0x39a349;VisuMZ['MainMenuCore'][_0x1c2cf1(0x1f9)]['call'](this);if(this[_0x1c2cf1(0x153)]()==='mobile')this[_0x1c2cf1(0x243)][_0x1c2cf1(0x112)]();},Scene_Menu['prototype'][_0x39a349(0x193)]=function(){const _0x4cc215=_0x39a349,_0x142e13=parseInt(this['_commandWindow'][_0x4cc215(0x186)]());_0x142e13?($gameTemp[_0x4cc215(0x1ef)](_0x142e13),this[_0x4cc215(0x253)]()):this[_0x4cc215(0x1b6)][_0x4cc215(0x1da)]();},VisuMZ[_0x39a349(0x158)]['Scene_Menu_commandFormation']=Scene_Menu['prototype'][_0x39a349(0x227)],Scene_Menu[_0x39a349(0x1df)][_0x39a349(0x227)]=function(){const _0x507624=_0x39a349;VisuMZ[_0x507624(0x158)]['Scene_Menu_commandFormation']['call'](this);if(this[_0x507624(0x153)]()==='mobile')this['_statusWindow']['open']();},VisuMZ[_0x39a349(0x158)][_0x39a349(0x133)]=Scene_Menu[_0x39a349(0x1df)]['onFormationCancel'],Scene_Menu[_0x39a349(0x1df)]['onFormationCancel']=function(){const _0x55a4bb=_0x39a349;VisuMZ[_0x55a4bb(0x158)]['Scene_Menu_onFormationCancel'][_0x55a4bb(0x17c)](this);if(this[_0x55a4bb(0x153)]()===_0x55a4bb(0x16d))this[_0x55a4bb(0x243)][_0x55a4bb(0x112)]();};function Sprite_MenuBackgroundActor(){const _0x4b5751=_0x39a349;this[_0x4b5751(0x24a)](...arguments);}Sprite_MenuBackgroundActor[_0x39a349(0x1df)]=Object[_0x39a349(0x214)](Sprite[_0x39a349(0x1df)]),Sprite_MenuBackgroundActor[_0x39a349(0x1df)][_0x39a349(0x117)]=Sprite_MenuBackgroundActor,Sprite_MenuBackgroundActor[_0x39a349(0x1df)]['initialize']=function(){const _0x2f1a7b=_0x39a349;this[_0x2f1a7b(0x24b)]=null,this[_0x2f1a7b(0x1c4)]=![],Sprite[_0x2f1a7b(0x1df)]['initialize'][_0x2f1a7b(0x17c)](this),this['x']=Graphics[_0x2f1a7b(0x16b)];},Sprite_MenuBackgroundActor['prototype']['setActor']=function(_0x4e6b29){const _0x426aef=_0x39a349;this[_0x426aef(0x24b)]!==_0x4e6b29&&(this[_0x426aef(0x24b)]=_0x4e6b29,this['loadBitmap']());},Sprite_MenuBackgroundActor[_0x39a349(0x1df)][_0x39a349(0x1d0)]=function(){const _0x194192=_0x39a349;this['_bitmapReady']=![],this[_0x194192(0x24b)]?(this['bitmap']=ImageManager[_0x194192(0x195)](this[_0x194192(0x24b)]['getMenuImage']()),this[_0x194192(0x180)]['addLoadListener'](this[_0x194192(0x139)]['bind'](this))):this[_0x194192(0x180)]=new Bitmap(0x1,0x1);},Sprite_MenuBackgroundActor[_0x39a349(0x1df)]['onBitmapLoad']=function(){const _0x1e7038=_0x39a349;this['_bitmapReady']=!![],VisuMZ[_0x1e7038(0x158)][_0x1e7038(0x1fc)][_0x1e7038(0x13c)][_0x1e7038(0x1c0)][_0x1e7038(0x17c)](this);},Sprite_MenuBackgroundActor[_0x39a349(0x1df)][_0x39a349(0x1b9)]=function(){const _0x322dbf=_0x39a349;Sprite[_0x322dbf(0x1df)][_0x322dbf(0x1b9)][_0x322dbf(0x17c)](this),this[_0x322dbf(0x1c4)]&&(this['updateOpacity'](),this[_0x322dbf(0x1e6)](),this[_0x322dbf(0x1f3)]());},Sprite_MenuBackgroundActor[_0x39a349(0x1df)][_0x39a349(0x187)]=function(){const _0x395f37=_0x39a349;if(this[_0x395f37(0x152)]>0x0){const _0x5df118=this[_0x395f37(0x152)];this['opacity']=(this[_0x395f37(0x14a)]*(_0x5df118-0x1)+0xff)/_0x5df118;}},Sprite_MenuBackgroundActor['prototype'][_0x39a349(0x1e6)]=function(){const _0x8c5549=_0x39a349;if(this[_0x8c5549(0x152)]>0x0){const _0x5e0b4e=this[_0x8c5549(0x152)];this['x']=(this['x']*(_0x5e0b4e-0x1)+this['_targetX'])/_0x5e0b4e,this['y']=(this['y']*(_0x5e0b4e-0x1)+this[_0x8c5549(0x164)])/_0x5e0b4e;}},Sprite_MenuBackgroundActor['prototype'][_0x39a349(0x1f3)]=function(){const _0x4fa563=_0x39a349;if(this['_duration']>0x0)this[_0x4fa563(0x152)]--;},ImageManager['svActorHorzCells']=ImageManager[_0x39a349(0x10f)]||0x9,ImageManager['svActorVertCells']=ImageManager[_0x39a349(0x15f)]||0x6,Window_Base[_0x39a349(0x1df)][_0x39a349(0x169)]=function(_0x2b9f42,_0x2e9689,_0x5310e3){const _0x291d46=_0x39a349,_0x119318=ImageManager[_0x291d46(0x19e)](_0x2b9f42),_0x404290=_0x119318['width']/ImageManager[_0x291d46(0x10f)],_0x49a537=_0x119318[_0x291d46(0x239)]/ImageManager[_0x291d46(0x15f)],_0x5d5f4e=0x0,_0x1e84db=0x0;this[_0x291d46(0x21a)][_0x291d46(0x1ff)](_0x119318,_0x5d5f4e,_0x1e84db,_0x404290,_0x49a537,_0x2e9689-_0x404290/0x2,_0x5310e3-_0x49a537);},Window_MenuCommand[_0x39a349(0x126)]=VisuMZ['MainMenuCore'][_0x39a349(0x1fc)]['CommandList'],VisuMZ[_0x39a349(0x158)][_0x39a349(0x213)]=Window_MenuCommand[_0x39a349(0x1df)][_0x39a349(0x24a)],Window_MenuCommand[_0x39a349(0x1df)]['initialize']=function(_0x567718){const _0x1ac4ce=_0x39a349;VisuMZ[_0x1ac4ce(0x158)]['Window_MenuCommand_initialize'][_0x1ac4ce(0x17c)](this,_0x567718),this[_0x1ac4ce(0x171)](_0x567718);},Window_MenuCommand[_0x39a349(0x1df)][_0x39a349(0x171)]=function(_0x33ae85){const _0x44d1c7=_0x39a349,_0x215774=new Rectangle(0x0,0x0,_0x33ae85[_0x44d1c7(0x16b)],_0x33ae85[_0x44d1c7(0x239)]);this[_0x44d1c7(0x157)]=new Window_Base(_0x215774),this[_0x44d1c7(0x157)][_0x44d1c7(0x14a)]=0x0,this[_0x44d1c7(0x159)](this[_0x44d1c7(0x157)]),this[_0x44d1c7(0x237)]();},Window_MenuCommand[_0x39a349(0x1df)][_0x39a349(0x12d)]=function(){const _0x4c3418=_0x39a349;Window_HorzCommand[_0x4c3418(0x1df)]['callUpdateHelp'][_0x4c3418(0x17c)](this);if(this[_0x4c3418(0x157)])this[_0x4c3418(0x237)]();},Window_MenuCommand[_0x39a349(0x1df)]['updateCommandNameWindow']=function(){const _0x137aca=_0x39a349,_0xe196ef=this[_0x137aca(0x157)];_0xe196ef[_0x137aca(0x21a)]['clear']();const _0x3fd5d0=this[_0x137aca(0x181)](this[_0x137aca(0x178)]());if(_0x3fd5d0==='icon'){const _0x55a67f=this[_0x137aca(0x1f6)](this[_0x137aca(0x178)]());let _0x153d09=this['commandName'](this[_0x137aca(0x178)]());_0x153d09=_0x153d09[_0x137aca(0x11c)](/\\I\[(\d+)\]/gi,''),_0xe196ef[_0x137aca(0x1bb)](),this[_0x137aca(0x12b)](_0x153d09,_0x55a67f),this[_0x137aca(0x231)](_0x153d09,_0x55a67f),this[_0x137aca(0x236)](_0x153d09,_0x55a67f);}},Window_MenuCommand[_0x39a349(0x1df)][_0x39a349(0x12b)]=function(_0x1db0b9,_0x1a5a07){},Window_MenuCommand[_0x39a349(0x1df)][_0x39a349(0x231)]=function(_0x37a1f3,_0x56698d){const _0x350f10=_0x39a349,_0x24085d=this[_0x350f10(0x157)];_0x24085d['drawText'](_0x37a1f3,0x0,_0x56698d['y'],_0x24085d[_0x350f10(0x1a7)],_0x350f10(0x11a));},Window_MenuCommand[_0x39a349(0x1df)]['commandNameWindowCenter']=function(_0x22adcf,_0x4fc5b8){const _0x2aeea3=_0x39a349,_0xd6759e=this[_0x2aeea3(0x157)],_0x1b80e0=$gameSystem[_0x2aeea3(0x197)](),_0x44b7d5=_0x4fc5b8['x']+Math[_0x2aeea3(0x242)](_0x4fc5b8[_0x2aeea3(0x16b)]/0x2)+_0x1b80e0;_0xd6759e['x']=_0xd6759e['width']/-0x2+_0x44b7d5,_0xd6759e['y']=Math[_0x2aeea3(0x242)](_0x4fc5b8[_0x2aeea3(0x239)]/0x4);},Window_MenuCommand[_0x39a349(0x1df)][_0x39a349(0x233)]=function(){const _0x5d9626=_0x39a349,_0x35aafe=SceneManager['_scene'][_0x5d9626(0x153)]();if(_0x35aafe==='mobile'){const _0xf6eef4=VisuMZ['MainMenuCore'][_0x5d9626(0x1fc)][_0x5d9626(0x1c1)][_0x5d9626(0x22c)];return this[_0x5d9626(0x223)]()*_0xf6eef4+0x8;}else return Window_Command[_0x5d9626(0x1df)][_0x5d9626(0x233)][_0x5d9626(0x17c)](this);},Window_MenuCommand['prototype'][_0x39a349(0x128)]=function(){const _0x361352=_0x39a349;this[_0x361352(0x1f1)]();},Window_MenuCommand[_0x39a349(0x1df)][_0x39a349(0x1f1)]=function(){const _0x2c62f0=_0x39a349;for(const _0x9d7ab3 of Window_MenuCommand[_0x2c62f0(0x126)]){const _0x219bf8=_0x9d7ab3[_0x2c62f0(0x12a)];if(_0x9d7ab3[_0x2c62f0(0x1f0)][_0x2c62f0(0x17c)](this)){let _0x8c7215=_0x9d7ab3[_0x2c62f0(0x1b3)];if(['',_0x2c62f0(0x245)][_0x2c62f0(0x176)](_0x8c7215))_0x8c7215=_0x9d7ab3[_0x2c62f0(0x1d3)][_0x2c62f0(0x17c)](this);const _0x22322f=_0x9d7ab3[_0x2c62f0(0x114)];_0x22322f>0x0&&this[_0x2c62f0(0x252)]()!==_0x2c62f0(0x1d8)&&(_0x8c7215=_0x2c62f0(0x188)['format'](_0x22322f,_0x8c7215));const _0x27e8dc=_0x9d7ab3[_0x2c62f0(0x22e)][_0x2c62f0(0x17c)](this),_0x688ee6=_0x9d7ab3[_0x2c62f0(0x216)][_0x2c62f0(0x17c)](this);this[_0x2c62f0(0x204)](_0x8c7215,_0x219bf8,_0x27e8dc,_0x688ee6),this['setHandler'](_0x219bf8,_0x9d7ab3['CallHandlerJS'][_0x2c62f0(0x1c7)](this,_0x688ee6));}this['addSymbolBridge'](_0x219bf8);}},Window_MenuCommand[_0x39a349(0x1df)][_0x39a349(0x145)]=function(_0x3d2be0){const _0x58b204=_0x39a349;switch(_0x3d2be0){case _0x58b204(0x1a1):this[_0x58b204(0x229)]();break;case'formation':this[_0x58b204(0x1fb)](),this['addOriginalCommands']();break;case _0x58b204(0x1dc):this['addOptionsCommand']();break;case _0x58b204(0x124):this[_0x58b204(0x1c5)]();break;case'gameEnd':this['addGameEndCommand']();break;}},Window_MenuCommand[_0x39a349(0x1df)][_0x39a349(0x229)]=function(){},Window_MenuCommand['prototype']['addFormationCommand']=function(){},Window_MenuCommand[_0x39a349(0x1df)]['addOriginalCommands']=function(){},Window_MenuCommand[_0x39a349(0x1df)][_0x39a349(0x206)]=function(){},Window_MenuCommand[_0x39a349(0x1df)][_0x39a349(0x1c5)]=function(){},Window_MenuCommand['prototype'][_0x39a349(0x10c)]=function(){},Window_MenuCommand['prototype']['maxCols']=function(){const _0x3be8d0=_0x39a349,_0x3e001c=SceneManager[_0x3be8d0(0x15d)][_0x3be8d0(0x153)]();if([_0x3be8d0(0x1e1),_0x3be8d0(0x21c)][_0x3be8d0(0x176)](_0x3e001c))return this[_0x3be8d0(0x1ad)]?this[_0x3be8d0(0x109)]():0x4;else return _0x3e001c!==_0x3be8d0(0x1ea)?VisuMZ[_0x3be8d0(0x158)][_0x3be8d0(0x1fc)][_0x3be8d0(0x1c1)][_0x3be8d0(0x250)]:Window_Command[_0x3be8d0(0x1df)][_0x3be8d0(0x14e)][_0x3be8d0(0x17c)](this);},Window_MenuCommand[_0x39a349(0x1df)][_0x39a349(0x11f)]=function(){const _0xd8e75e=_0x39a349;return VisuMZ['MainMenuCore'][_0xd8e75e(0x1fc)][_0xd8e75e(0x1c1)][_0xd8e75e(0x146)];},Window_MenuCommand['prototype'][_0x39a349(0x23c)]=function(_0x8b2409){const _0x2b3019=_0x39a349,_0x2ed431=this['commandStyleCheck'](_0x8b2409);if(_0x2ed431===_0x2b3019(0x144))this['drawItemStyleIconText'](_0x8b2409);else _0x2ed431==='icon'?this[_0x2b3019(0x247)](_0x8b2409):Window_Command[_0x2b3019(0x1df)][_0x2b3019(0x23c)]['call'](this,_0x8b2409);},Window_MenuCommand[_0x39a349(0x1df)][_0x39a349(0x252)]=function(){const _0x3afb5c=_0x39a349;return VisuMZ[_0x3afb5c(0x158)][_0x3afb5c(0x1fc)][_0x3afb5c(0x1c1)][_0x3afb5c(0x218)];},Window_MenuCommand[_0x39a349(0x1df)][_0x39a349(0x181)]=function(_0x5ec629){const _0x55c49e=_0x39a349,_0x2c98b6=this[_0x55c49e(0x252)]();if(_0x2c98b6!==_0x55c49e(0x18a))return _0x2c98b6;else{const _0xcdba0c=this[_0x55c49e(0x1e9)](_0x5ec629);if(_0xcdba0c['match'](/\\I\[(\d+)\]/i)){const _0x4e4088=this['itemLineRect'](_0x5ec629),_0x16aabf=this[_0x55c49e(0x1ac)](_0xcdba0c)['width'];return _0x16aabf<=_0x4e4088[_0x55c49e(0x16b)]?'iconText':_0x55c49e(0x21d);}else return _0x55c49e(0x1d8);}},Window_MenuCommand[_0x39a349(0x1df)][_0x39a349(0x225)]=function(_0x1c18de){const _0x5ecec5=_0x39a349,_0x3f42ff=this[_0x5ecec5(0x1f6)](_0x1c18de),_0x35dd3f=this[_0x5ecec5(0x1e9)](_0x1c18de),_0x2e4006=this[_0x5ecec5(0x1ac)](_0x35dd3f)['width'];this[_0x5ecec5(0x162)](this[_0x5ecec5(0x20f)](_0x1c18de));let _0x4a1977=this['itemTextAlign']();if(_0x4a1977==='right')this[_0x5ecec5(0x1fe)](_0x35dd3f,_0x3f42ff['x']+_0x3f42ff[_0x5ecec5(0x16b)]-_0x2e4006,_0x3f42ff['y'],_0x2e4006);else{if(_0x4a1977===_0x5ecec5(0x11a)){const _0x1673d9=_0x3f42ff['x']+Math['floor']((_0x3f42ff[_0x5ecec5(0x16b)]-_0x2e4006)/0x2);this[_0x5ecec5(0x1fe)](_0x35dd3f,_0x1673d9,_0x3f42ff['y'],_0x2e4006);}else this[_0x5ecec5(0x1fe)](_0x35dd3f,_0x3f42ff['x'],_0x3f42ff['y'],_0x2e4006);}},Window_MenuCommand[_0x39a349(0x1df)]['drawItemStyleIcon']=function(_0x5e99eb){const _0x135dfa=_0x39a349;this[_0x135dfa(0x1e9)](_0x5e99eb)['match'](/\\I\[(\d+)\]/i);const _0x5ea16f=Number(RegExp['$1']),_0x1c2557=this[_0x135dfa(0x1f6)](_0x5e99eb),_0x1cfdff=_0x1c2557['x']+Math[_0x135dfa(0x242)]((_0x1c2557['width']-ImageManager[_0x135dfa(0x150)])/0x2),_0x952633=_0x1c2557['y']+(_0x1c2557[_0x135dfa(0x239)]-ImageManager['iconHeight'])/0x2;this[_0x135dfa(0x13b)](_0x5ea16f,_0x1cfdff,_0x952633);},VisuMZ[_0x39a349(0x158)]['Window_StatusBase_loadFaceImages']=Window_StatusBase[_0x39a349(0x1df)]['loadFaceImages'],Window_StatusBase[_0x39a349(0x1df)][_0x39a349(0x199)]=function(){const _0x4d5bc1=_0x39a349;VisuMZ[_0x4d5bc1(0x158)][_0x4d5bc1(0x1dd)]['call'](this),this['loadOtherActorImages']();},Window_StatusBase[_0x39a349(0x1df)]['loadOtherActorImages']=function(){const _0x2d2c5b=_0x39a349;for(const _0xdb39b2 of $gameParty[_0x2d2c5b(0x113)]()){if(!_0xdb39b2)continue;_0xdb39b2[_0x2d2c5b(0x1cd)]()&&ImageManager['loadCharacter'](_0xdb39b2['characterName']()),_0xdb39b2[_0x2d2c5b(0x1b0)]()&&ImageManager[_0x2d2c5b(0x19e)](_0xdb39b2['battlerName']()),_0xdb39b2[_0x2d2c5b(0x19b)]()&&ImageManager[_0x2d2c5b(0x195)](_0xdb39b2[_0x2d2c5b(0x19b)]());}},Window_StatusBase['prototype']['graphicType']=function(){const _0x13a057=_0x39a349;return VisuMZ['MainMenuCore'][_0x13a057(0x1fc)][_0x13a057(0x241)];},Window_StatusBase[_0x39a349(0x1df)][_0x39a349(0x12e)]=function(_0x211165,_0x1de97e,_0x3b900a,_0x4a19bf,_0x6f6bf6){const _0x53ba0=_0x39a349;_0x4a19bf=_0x4a19bf||ImageManager[_0x53ba0(0x20e)],_0x6f6bf6=_0x6f6bf6||ImageManager['faceHeight'];const _0x24fbe4=ImageManager[_0x53ba0(0x20e)],_0x53f790=_0x6f6bf6-0x2,_0x190df7=_0x1de97e+Math[_0x53ba0(0x242)]((_0x4a19bf-_0x24fbe4)/0x2);this[_0x53ba0(0x117)]===Window_MenuStatus&&this['changePaintOpacity'](_0x211165[_0x53ba0(0x23a)]()),this[_0x53ba0(0x12f)](_0x211165,_0x190df7,_0x3b900a,_0x24fbe4,_0x53f790),this[_0x53ba0(0x162)](!![]);},Window_StatusBase[_0x39a349(0x1df)][_0x39a349(0x220)]=function(_0x4df031,_0x1e3428,_0x45d458,_0x30b22c,_0x472ddf){const _0x23350=_0x39a349;_0x30b22c=_0x30b22c||ImageManager[_0x23350(0x20e)],_0x472ddf=_0x472ddf||ImageManager['faceHeight'];const _0x6a075=_0x4df031['characterName'](),_0x357502=_0x4df031[_0x23350(0x1c3)](),_0xf4d123=ImageManager['loadCharacter'](_0x6a075),_0xc0b57b=ImageManager['isBigCharacter'](_0x6a075),_0x2a96c7=_0xf4d123[_0x23350(0x16b)]/(_0xc0b57b?0x3:0xc),_0x5c2d39=_0xf4d123[_0x23350(0x239)]/(_0xc0b57b?0x4:0x8),_0x46d0b6=_0x30b22c,_0x25bf0a=_0x472ddf-0x2,_0x52ef4f=_0x1e3428+Math[_0x23350(0x242)](_0x46d0b6/0x2),_0x20b313=_0x45d458+Math[_0x23350(0x16c)]((_0x472ddf+_0x5c2d39)/0x2);this[_0x23350(0x117)]===Window_MenuStatus&&this['changePaintOpacity'](_0x4df031[_0x23350(0x23a)]());const _0x114aa7=Math[_0x23350(0x1a5)](_0x30b22c,_0x2a96c7),_0x5ec4c3=Math[_0x23350(0x1a5)](_0x472ddf,_0x5c2d39),_0x3c4746=Math[_0x23350(0x242)](_0x1e3428+Math[_0x23350(0x211)](_0x30b22c-_0x2a96c7,0x0)/0x2),_0x27668c=Math[_0x23350(0x242)](_0x45d458+Math[_0x23350(0x211)](_0x472ddf-_0x5c2d39,0x0)/0x2),_0x1231bc=_0xc0b57b?0x0:_0x357502,_0x11c205=(_0x1231bc%0x4*0x3+0x1)*_0x2a96c7,_0xf96673=Math[_0x23350(0x242)](_0x1231bc/0x4)*0x4*_0x5c2d39;this[_0x23350(0x21a)][_0x23350(0x1ff)](_0xf4d123,_0x11c205,_0xf96673,_0x114aa7,_0x5ec4c3,_0x3c4746,_0x27668c),this[_0x23350(0x162)](!![]);},Window_StatusBase[_0x39a349(0x1df)][_0x39a349(0x111)]=function(_0x3def62,_0x5762d1,_0x53d225,_0x480459,_0x56dd71){const _0x5d7a33=_0x39a349;_0x480459=_0x480459||ImageManager['faceWidth'],_0x56dd71=_0x56dd71||ImageManager[_0x5d7a33(0x203)];const _0x362da7=ImageManager[_0x5d7a33(0x19e)](_0x3def62['battlerName']()),_0x416aee=_0x362da7['width']/ImageManager[_0x5d7a33(0x10f)],_0x2a9aa0=_0x362da7[_0x5d7a33(0x239)]/ImageManager[_0x5d7a33(0x15f)],_0x546ebc=_0x480459,_0x5cad46=_0x56dd71-0x2,_0xaad1c9=_0x5762d1+Math['floor'](_0x546ebc/0x2),_0x4e339d=_0x53d225+Math[_0x5d7a33(0x16c)]((_0x56dd71+_0x2a9aa0)/0x2);this[_0x5d7a33(0x117)]===Window_MenuStatus&&this['changePaintOpacity'](_0x3def62[_0x5d7a33(0x23a)]());const _0x3be836=Math[_0x5d7a33(0x1a5)](_0x480459,_0x416aee),_0x4a1a88=Math['min'](_0x56dd71,_0x2a9aa0),_0x3445e4=Math[_0x5d7a33(0x242)](_0x5762d1+Math[_0x5d7a33(0x211)](_0x480459-_0x416aee,0x0)/0x2),_0x5ea237=Math['floor'](_0x53d225+Math[_0x5d7a33(0x211)](_0x56dd71-_0x2a9aa0,0x0)/0x2),_0x30fad9=0x0,_0x3359cb=0x0;this[_0x5d7a33(0x21a)][_0x5d7a33(0x1ff)](_0x362da7,_0x30fad9,_0x3359cb,_0x3be836,_0x4a1a88,_0x3445e4,_0x5ea237),this[_0x5d7a33(0x162)](!![]);},Window_StatusBase[_0x39a349(0x1df)][_0x39a349(0x14d)]=function(_0x1a89cf,_0x48fc94,_0xa78591,_0x2817ec,_0x2b92c7){const _0x5693fb=_0x39a349,_0x348d83=ImageManager[_0x5693fb(0x195)](_0x1a89cf['getMenuImage']());_0x2817ec=(_0x2817ec||ImageManager[_0x5693fb(0x20e)])-0x2,_0x2b92c7=(_0x2b92c7||ImageManager[_0x5693fb(0x203)])-0x2;const _0x3febc1=_0x348d83[_0x5693fb(0x16b)],_0x59b07b=_0x348d83[_0x5693fb(0x239)],_0x33acd8=_0x2817ec,_0x2159c2=_0x2b92c7-0x2,_0x283bee=_0x48fc94+Math[_0x5693fb(0x242)](_0x33acd8/0x2),_0x2e77f7=_0xa78591+Math[_0x5693fb(0x16c)]((_0x2b92c7+_0x59b07b)/0x2);this[_0x5693fb(0x117)]===Window_MenuStatus&&this[_0x5693fb(0x162)](_0x1a89cf[_0x5693fb(0x23a)]());const _0xf92b0c=Math[_0x5693fb(0x1a5)](_0x2817ec,_0x3febc1),_0x259ed3=Math['min'](_0x2b92c7,_0x59b07b),_0x29f5f1=_0x48fc94+0x1,_0x245524=Math[_0x5693fb(0x211)](_0xa78591+0x1,_0xa78591+_0x2159c2-_0x59b07b+0x3);let _0x2c319f=(_0x3febc1-_0xf92b0c)/0x2,_0x199d68=(_0x59b07b-_0x259ed3)/0x2;_0x2c319f-=_0x1a89cf['getMenuImageOffsetX'](),_0x199d68-=_0x1a89cf['getMenuImageOffsetY'](),this[_0x5693fb(0x21a)]['blt'](_0x348d83,_0x2c319f,_0x199d68,_0xf92b0c,_0x259ed3,_0x29f5f1,_0x245524),this[_0x5693fb(0x162)](!![]);},VisuMZ['MainMenuCore'][_0x39a349(0x127)]=Window_MenuStatus[_0x39a349(0x1df)][_0x39a349(0x1ce)],Window_MenuStatus[_0x39a349(0x1df)][_0x39a349(0x1ce)]=function(){const _0x114aae=_0x39a349;VisuMZ['MainMenuCore']['Settings'][_0x114aae(0x13c)][_0x114aae(0x1c9)]?VisuMZ[_0x114aae(0x158)][_0x114aae(0x127)][_0x114aae(0x17c)](this):this[_0x114aae(0x120)](0x0);},VisuMZ['MainMenuCore']['Window_MenuStatus_maxItems']=Window_MenuStatus[_0x39a349(0x1df)][_0x39a349(0x109)],Window_MenuStatus[_0x39a349(0x1df)][_0x39a349(0x109)]=function(){const _0x2dbf37=_0x39a349;return this[_0x2dbf37(0x200)]()?$gameParty[_0x2dbf37(0x249)]()[_0x2dbf37(0x10e)]:VisuMZ['MainMenuCore'][_0x2dbf37(0x1ba)][_0x2dbf37(0x17c)](this);},Window_MenuStatus['prototype'][_0x39a349(0x200)]=function(){const _0x35017a=_0x39a349,_0x87e8b5=VisuMZ[_0x35017a(0x158)][_0x35017a(0x1fc)][_0x35017a(0x13c)];if(_0x87e8b5['ShowReserve']===undefined)_0x87e8b5[_0x35017a(0x226)]=!![];const _0x5b1b9f=SceneManager['_scene'];if(!_0x87e8b5['ShowReserve']){if(_0x87e8b5[_0x35017a(0x134)])return _0x5b1b9f[_0x35017a(0x117)]===Scene_Menu;return!![];}return![];},Window_MenuStatus[_0x39a349(0x1df)][_0x39a349(0x1bc)]=function(){const _0x346ef0=_0x39a349,_0x427b62=SceneManager[_0x346ef0(0x15d)][_0x346ef0(0x117)];return _0x427b62===Scene_Menu?VisuMZ[_0x346ef0(0x158)][_0x346ef0(0x1fc)][_0x346ef0(0x190)]:VisuMZ[_0x346ef0(0x158)]['Settings']['InnerMenuListStyle'];},Window_MenuStatus['prototype']['numVisibleRows']=function(){const _0x1373b6=_0x39a349,_0x376eca=this['listStyle']();switch(_0x376eca){case'vertical':case'portrait':return 0x1;case _0x1373b6(0x228):return 0x1;default:return $gameParty[_0x1373b6(0x148)]();}},Window_MenuStatus['prototype'][_0x39a349(0x14e)]=function(){const _0x527e72=_0x39a349,_0x38ae78=this[_0x527e72(0x1bc)]();switch(_0x38ae78){case _0x527e72(0x185):case _0x527e72(0x1ed):return $gameParty[_0x527e72(0x148)]();default:return 0x1;}},VisuMZ['MainMenuCore'][_0x39a349(0x248)]=Window_MenuStatus[_0x39a349(0x1df)]['itemHeight'],Window_MenuStatus[_0x39a349(0x1df)][_0x39a349(0x233)]=function(){const _0x1e9f9e=_0x39a349,_0x5474f1=this[_0x1e9f9e(0x1bc)]();switch(_0x5474f1){case _0x1e9f9e(0x185):case _0x1e9f9e(0x1ed):case _0x1e9f9e(0x228):return this['innerHeight'];case _0x1e9f9e(0x125):return Window_Selectable[_0x1e9f9e(0x1df)][_0x1e9f9e(0x233)][_0x1e9f9e(0x17c)](this);case _0x1e9f9e(0x167):return this['lineHeight']()*0x2+0x8;default:return VisuMZ[_0x1e9f9e(0x158)]['Window_MenuStatus_itemHeight']['call'](this);}},Window_MenuStatus['prototype']['drawItem']=function(_0x41a8ff){const _0x5956d6=_0x39a349;this[_0x5956d6(0x194)](_0x41a8ff),this[_0x5956d6(0x21e)](_0x41a8ff);},VisuMZ[_0x39a349(0x158)][_0x39a349(0x147)]=Window_MenuStatus[_0x39a349(0x1df)][_0x39a349(0x201)],Window_MenuStatus[_0x39a349(0x1df)][_0x39a349(0x1f5)]=function(_0x553909,_0x1b05db,_0x3ca20c,_0x50b5f3,_0x112fea){const _0x13b888=_0x39a349;switch(this['graphicType']()){case _0x13b888(0x132):break;case'sprite':this[_0x13b888(0x220)](_0x553909,_0x1b05db,_0x3ca20c+0x1,_0x50b5f3,_0x112fea-0x2);break;case _0x13b888(0x14b):this[_0x13b888(0x111)](_0x553909,_0x1b05db,_0x3ca20c+0x1,_0x50b5f3,_0x112fea-0x2);break;default:this['drawItemActorFace'](_0x553909,_0x1b05db,_0x3ca20c,_0x50b5f3,_0x112fea);break;}},Window_MenuStatus[_0x39a349(0x1df)][_0x39a349(0x21e)]=function(_0x15dc96){const _0xfffb0e=_0x39a349;this[_0xfffb0e(0x1bb)]();const _0x3b6b97=this[_0xfffb0e(0x177)](_0x15dc96),_0xe30dd7=this[_0xfffb0e(0x22b)](_0x15dc96),_0xfabe77=this[_0xfffb0e(0x1bc)]();switch(_0xfabe77){case _0xfffb0e(0x185):this[_0xfffb0e(0x212)](_0x3b6b97,_0xe30dd7);break;case _0xfffb0e(0x1ed):this[_0xfffb0e(0x209)](_0x3b6b97,_0xe30dd7);break;case'solo':this[_0xfffb0e(0x1bf)](_0x3b6b97,_0xe30dd7);break;case _0xfffb0e(0x125):this[_0xfffb0e(0x18f)](_0x3b6b97,_0xe30dd7);break;case _0xfffb0e(0x167):this[_0xfffb0e(0x207)](_0x3b6b97,_0xe30dd7);break;default:this[_0xfffb0e(0x1cc)](_0x3b6b97,_0xe30dd7);break;}},Window_MenuStatus[_0x39a349(0x1df)][_0x39a349(0x212)]=function(_0x29306b,_0x5ec445){const _0x2f0f47=_0x39a349;VisuMZ[_0x2f0f47(0x158)][_0x2f0f47(0x1fc)]['ListStyles'][_0x2f0f47(0x103)][_0x2f0f47(0x17c)](this,_0x29306b,_0x5ec445);},Window_MenuStatus[_0x39a349(0x1df)][_0x39a349(0x209)]=function(_0x2510cf,_0x554990){const _0x8e68a2=_0x39a349;if(_0x2510cf[_0x8e68a2(0x19b)]()!==''){const _0x7c86fd=ImageManager[_0x8e68a2(0x195)](_0x2510cf['getMenuImage']());_0x7c86fd[_0x8e68a2(0x1b5)](this['drawItemStatusPortraitStyleOnLoad']['bind'](this,_0x2510cf,_0x554990));}else this['drawItemStatusVerticalStyle'](_0x2510cf,_0x554990);},Window_MenuStatus[_0x39a349(0x1df)][_0x39a349(0x142)]=function(_0x2dee32,_0x186938){const _0x1cf29f=_0x39a349;VisuMZ[_0x1cf29f(0x158)][_0x1cf29f(0x1fc)][_0x1cf29f(0x235)][_0x1cf29f(0x1a8)][_0x1cf29f(0x17c)](this,_0x2dee32,_0x186938);},Window_MenuStatus[_0x39a349(0x1df)][_0x39a349(0x1bf)]=function(_0x4a9e9f,_0x4bbda5){const _0x1964fd=_0x39a349,_0x5f1e5d=ImageManager[_0x1964fd(0x195)](_0x4a9e9f['getMenuImage']());_0x5f1e5d['addLoadListener'](this['drawItemStatusSoloStyleOnLoad'][_0x1964fd(0x1c7)](this,_0x4a9e9f,_0x4bbda5));},Window_MenuStatus[_0x39a349(0x1df)][_0x39a349(0x19f)]=function(_0x5d51fd,_0x5e05d7){const _0x28c5d7=_0x39a349;VisuMZ[_0x28c5d7(0x158)][_0x28c5d7(0x1fc)]['ListStyles'][_0x28c5d7(0x202)][_0x28c5d7(0x17c)](this,_0x5d51fd,_0x5e05d7);},Window_MenuStatus['prototype'][_0x39a349(0x18f)]=function(_0x717963,_0xab9755){const _0x37eca5=_0x39a349;VisuMZ[_0x37eca5(0x158)][_0x37eca5(0x1fc)]['ListStyles'][_0x37eca5(0x22d)][_0x37eca5(0x17c)](this,_0x717963,_0xab9755);},Window_MenuStatus[_0x39a349(0x1df)][_0x39a349(0x207)]=function(_0x3e39ae,_0x233a66){const _0xc74858=_0x39a349;VisuMZ[_0xc74858(0x158)][_0xc74858(0x1fc)][_0xc74858(0x235)][_0xc74858(0x13f)][_0xc74858(0x17c)](this,_0x3e39ae,_0x233a66);},Window_MenuStatus[_0x39a349(0x1df)]['isExpGaugeDrawn']=function(){const _0x145883=_0x39a349,_0x302f99=this[_0x145883(0x1bc)]();if([_0x145883(0x125),_0x145883(0x167)][_0x145883(0x176)](_0x302f99))return![];return Window_StatusBase[_0x145883(0x1df)][_0x145883(0x121)][_0x145883(0x17c)](this);},Window_MenuStatus[_0x39a349(0x1df)][_0x39a349(0x1cc)]=function(_0x107582,_0x54683d){const _0x14f250=_0x39a349;VisuMZ[_0x14f250(0x158)][_0x14f250(0x1fc)][_0x14f250(0x235)][_0x14f250(0x17b)][_0x14f250(0x17c)](this,_0x107582,_0x54683d);},Window_SkillStatus[_0x39a349(0x1df)][_0x39a349(0x12f)]=function(_0x51764b,_0x1ec9f0,_0x4d7e89,_0x317d58,_0x5a0f31){const _0x17dc7e=_0x39a349;switch(this[_0x17dc7e(0x106)]()){case'none':break;case'sprite':this['drawItemActorSprite'](_0x51764b,_0x1ec9f0,_0x4d7e89,_0x317d58,_0x5a0f31);break;case _0x17dc7e(0x14b):this[_0x17dc7e(0x111)](_0x51764b,_0x1ec9f0,_0x4d7e89,_0x317d58,_0x5a0f31);break;default:Window_StatusBase[_0x17dc7e(0x1df)][_0x17dc7e(0x12f)]['call'](this,_0x51764b,_0x1ec9f0,_0x4d7e89,_0x317d58,_0x5a0f31);break;}},Window_EquipStatus['prototype'][_0x39a349(0x12f)]=function(_0x183eb4,_0x5db516,_0x1ab600,_0x27ecb0,_0x259233){const _0x1ed53e=_0x39a349;switch(this['graphicType']()){case'none':break;case'sprite':this[_0x1ed53e(0x220)](_0x183eb4,_0x5db516,_0x1ab600,_0x27ecb0,_0x259233);break;case _0x1ed53e(0x14b):this[_0x1ed53e(0x111)](_0x183eb4,_0x5db516,_0x1ab600,_0x27ecb0,_0x259233);break;default:Window_StatusBase[_0x1ed53e(0x1df)][_0x1ed53e(0x12f)][_0x1ed53e(0x17c)](this,_0x183eb4,_0x5db516,_0x1ab600,_0x27ecb0,_0x259233);break;}};function Window_ThinGold(){this['initialize'](...arguments);}Window_ThinGold[_0x39a349(0x1df)]=Object['create'](Window_Gold[_0x39a349(0x1df)]),Window_ThinGold['prototype'][_0x39a349(0x117)]=Window_ThinGold,Window_ThinGold[_0x39a349(0x1df)][_0x39a349(0x233)]=function(){const _0x577301=_0x39a349;return this[_0x577301(0x223)]();},Window_ThinGold['prototype'][_0x39a349(0x18e)]=function(){const _0x1db2e2=_0x39a349;return Window_Selectable[_0x1db2e2(0x1df)][_0x1db2e2(0x18e)]['call'](this);};function Window_Playtime(){this['initialize'](...arguments);}Window_Playtime['prototype']=Object[_0x39a349(0x214)](Window_Selectable[_0x39a349(0x1df)]),Window_Playtime[_0x39a349(0x1df)][_0x39a349(0x117)]=Window_Playtime,Window_Playtime[_0x39a349(0x1df)][_0x39a349(0x24a)]=function(_0x270d50){const _0x97a9ff=_0x39a349;this[_0x97a9ff(0x151)]=$gameSystem[_0x97a9ff(0x15e)](),this[_0x97a9ff(0x175)]=0x3c,Window_Selectable[_0x97a9ff(0x1df)][_0x97a9ff(0x24a)][_0x97a9ff(0x17c)](this,_0x270d50),this[_0x97a9ff(0x1c6)]();},Window_Playtime['prototype'][_0x39a349(0x233)]=function(){const _0x448f3e=_0x39a349;return this[_0x448f3e(0x223)]();},Window_Playtime[_0x39a349(0x1df)][_0x39a349(0x1b9)]=function(){const _0x14e3bd=_0x39a349;Window_Selectable[_0x14e3bd(0x1df)][_0x14e3bd(0x1b9)][_0x14e3bd(0x17c)](this),this[_0x14e3bd(0x1d6)]();},Window_Playtime[_0x39a349(0x1df)][_0x39a349(0x1d6)]=function(){const _0x7961a=_0x39a349;if(this[_0x7961a(0x175)]-->0x0){if(this[_0x7961a(0x175)]<=0x0)this[_0x7961a(0x1c6)]();}},Window_Playtime['prototype'][_0x39a349(0x1c6)]=function(){const _0x22222a=_0x39a349;this[_0x22222a(0x175)]=0x3c;const _0x48d842=this[_0x22222a(0x1f6)](0x0),_0x557278=_0x48d842['x'],_0x3ea911=_0x48d842['y'],_0x3fe5c=_0x48d842[_0x22222a(0x16b)];this['contents'][_0x22222a(0x173)](),this[_0x22222a(0x210)](_0x48d842),this[_0x22222a(0x219)](_0x48d842),this[_0x22222a(0x1aa)](_0x48d842);},Window_Playtime[_0x39a349(0x1df)][_0x39a349(0x1bb)]=function(){const _0x445abd=_0x39a349;Window_Selectable[_0x445abd(0x1df)][_0x445abd(0x1bb)][_0x445abd(0x17c)](this),this[_0x445abd(0x21a)][_0x445abd(0x135)]=VisuMZ['MainMenuCore']['Settings'][_0x445abd(0x1a3)][_0x445abd(0x108)];},Window_Playtime[_0x39a349(0x1df)][_0x39a349(0x210)]=function(_0x1f41fd){const _0x45a7d7=_0x39a349;if(VisuMZ[_0x45a7d7(0x158)][_0x45a7d7(0x1fc)][_0x45a7d7(0x1a3)][_0x45a7d7(0x114)]>0x0){const _0x40c938=VisuMZ[_0x45a7d7(0x158)][_0x45a7d7(0x1fc)][_0x45a7d7(0x1a3)]['Icon'],_0x56c4d9=_0x1f41fd['y']+(this[_0x45a7d7(0x223)]()-ImageManager[_0x45a7d7(0x184)])/0x2;this['drawIcon'](_0x40c938,_0x1f41fd['x'],_0x56c4d9);const _0x493478=ImageManager[_0x45a7d7(0x150)]+0x4;_0x1f41fd['x']+=_0x493478,_0x1f41fd['width']-=_0x493478;}},Window_Playtime[_0x39a349(0x1df)][_0x39a349(0x219)]=function(_0xc6c4d2){const _0xc22a61=_0x39a349;this[_0xc22a61(0x1bb)](),this[_0xc22a61(0x154)](ColorManager[_0xc22a61(0x115)]());const _0x253ac2=VisuMZ[_0xc22a61(0x158)][_0xc22a61(0x1fc)]['Playtime'][_0xc22a61(0x166)];this[_0xc22a61(0x23d)](_0x253ac2,_0xc6c4d2['x'],_0xc6c4d2['y'],_0xc6c4d2['width'],'left'),this['resetTextColor']();},Window_Playtime[_0x39a349(0x1df)]['drawPlaytime']=function(_0x172cb6){const _0x5c1b47=_0x39a349,_0xdd4750=$gameSystem['playtimeText']();this[_0x5c1b47(0x23d)](_0xdd4750,_0x172cb6['x'],_0x172cb6['y'],_0x172cb6[_0x5c1b47(0x16b)],'right');};function Window_MenuVariables(){this['initialize'](...arguments);}Window_MenuVariables[_0x39a349(0x1df)]=Object[_0x39a349(0x214)](Window_Selectable[_0x39a349(0x1df)]),Window_MenuVariables[_0x39a349(0x1df)][_0x39a349(0x117)]=Window_MenuVariables,Window_MenuVariables[_0x39a349(0x1df)]['initialize']=function(_0x228817){const _0x22c344=_0x39a349;Window_Selectable['prototype']['initialize'][_0x22c344(0x17c)](this,_0x228817),this[_0x22c344(0x1eb)]=VisuMZ[_0x22c344(0x158)][_0x22c344(0x1fc)][_0x22c344(0x16f)][_0x22c344(0x1ee)],this[_0x22c344(0x1c6)]();},Window_MenuVariables[_0x39a349(0x1df)][_0x39a349(0x233)]=function(){const _0x49f576=_0x39a349;return this[_0x49f576(0x223)]();},Window_MenuVariables['prototype'][_0x39a349(0x14e)]=function(){const _0x57e15c=_0x39a349,_0x52281d=SceneManager[_0x57e15c(0x15d)][_0x57e15c(0x153)]();return _0x52281d===_0x57e15c(0x1ea)?0x1:VisuMZ[_0x57e15c(0x158)][_0x57e15c(0x1fc)][_0x57e15c(0x16f)][_0x57e15c(0x1ee)][_0x57e15c(0x10e)];},Window_MenuVariables[_0x39a349(0x1df)][_0x39a349(0x1bb)]=function(){const _0x3ae7b6=_0x39a349;Window_Selectable[_0x3ae7b6(0x1df)][_0x3ae7b6(0x1bb)][_0x3ae7b6(0x17c)](this),this['contents']['fontSize']=VisuMZ[_0x3ae7b6(0x158)][_0x3ae7b6(0x1fc)]['Variable']['FontSize'],this['changeTextColor'](ColorManager['systemColor']());},Window_MenuVariables[_0x39a349(0x1df)][_0x39a349(0x109)]=function(){const _0xf9bd16=_0x39a349;return this[_0xf9bd16(0x1eb)]['length'];},Window_MenuVariables[_0x39a349(0x1df)][_0x39a349(0x14c)]=function(){const _0x1d7dee=_0x39a349,_0x48b8a0=this[_0x1d7dee(0x110)]();for(let _0x3ec3fb=0x0;_0x3ec3fb<this[_0x1d7dee(0x170)]();_0x3ec3fb++){const _0x13adac=_0x48b8a0+_0x3ec3fb;_0x13adac<this['maxItems']()&&(this[_0x1d7dee(0x20a)](_0x13adac),this[_0x1d7dee(0x23c)](_0x13adac));}},Window_MenuVariables[_0x39a349(0x1df)][_0x39a349(0x20a)]=function(_0x28485c){},Window_MenuVariables[_0x39a349(0x1df)][_0x39a349(0x23c)]=function(_0x40e2d7){const _0x11fc66=_0x39a349,_0x2f775f=this['_data'][_0x40e2d7];if(_0x2f775f<=0x0)return;if(!$dataSystem[_0x11fc66(0x205)][_0x2f775f])return;const _0x20c5ea=this['itemLineRect'](_0x40e2d7);this['resetFontSettings']();let _0x5a6193=0x0,_0x1a8239=$dataSystem['variables'][_0x2f775f][_0x11fc66(0x16a)]();_0x1a8239[_0x11fc66(0x13d)](/\\I\[(\d+)\]/i)&&(_0x5a6193=Number(RegExp['$1']),_0x1a8239=_0x1a8239[_0x11fc66(0x11c)](/\\I\[(\d+)\]/i,'')[_0x11fc66(0x16a)]());if(_0x5a6193>0x0){const _0x34aa58=_0x20c5ea['y']+(this[_0x11fc66(0x223)]()-ImageManager[_0x11fc66(0x184)])/0x2;this[_0x11fc66(0x13b)](_0x5a6193,_0x20c5ea['x'],_0x34aa58);const _0x9ab171=ImageManager['iconWidth']+0x4;_0x20c5ea['x']+=_0x9ab171,_0x20c5ea[_0x11fc66(0x16b)]-=_0x9ab171;}this['drawText'](_0x1a8239,_0x20c5ea['x'],_0x20c5ea['y'],_0x20c5ea[_0x11fc66(0x16b)],_0x11fc66(0x119)),this[_0x11fc66(0x154)](ColorManager[_0x11fc66(0x20c)]()),this[_0x11fc66(0x23d)]($gameVariables[_0x11fc66(0x107)](_0x2f775f),_0x20c5ea['x'],_0x20c5ea['y'],_0x20c5ea[_0x11fc66(0x16b)],_0x11fc66(0x1b4));};
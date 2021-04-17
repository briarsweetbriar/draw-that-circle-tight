//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.23;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.23] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
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
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for singul column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
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
 * VisuMZ_2_WeaponSwapSystem
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
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
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - If the actor this is disabled for is the only party member, it will not be
 *   visible in the item list unless the VisuStella Battle Core is installed.
 *   - If the VisuStella Battle Core is installed, then all battle scope items
 *     will be visible even if they're disabled.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 * 
 * <Equip Copy Limit: x>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Sets a maximum number of copies that the actor can wear of this equipment.
 * - Replace 'x' with a number value to determine the copy limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: Actors can only equip one copy of the "One-of-a-Kind Ring"
 *   on at any time despite having empty accessory slots because the ring has a
 *   <Equip Copy Limit: 1> notetag.
 * 
 * ---
 * 
 * <Equip Weapon Type Limit: x>
 * 
 * - Used for: Weapon
 * - This weapon cannot be equipped with other weapons of the same type once
 *   the limited amount has been reached.
 * - Replace 'x' with a number value to determine the weapon type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: A dualwielding warrior who can only equip one sword and a
 *   dagger but never two swords or two daggers because the swords and daggers
 *   all have the <Equip Weapon Type Limit: 1> notetags on them.
 * 
 * ---
 * 
 * <Equip Armor Type Limit: x>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped with other armors of the same type once the
 *   limited amount has been reached.
 * - Replace 'x' with a number value to determine the armor type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: People cannot equip more than two glove accessories on at a
 *   time because the glove is a "Glove" armor-type and each glove item has the
 *   <Equip Armor Type Limit: 2> notetags on them.
 * 
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
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
 * Actor: Change Equip Slots
 * - Forcefully change the actor(s) equip slots.
 * - These will persist through class changes.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Equip Slots:
 *   - Insert the equip slots you want the actor(s) to have.
 *   - These entries are case-sensitive.
 *
 * ---
 *
 * Actor: Reset Equip Slots
 * - Reset any forced equip slots for the actor(s).
 * - Equip slots will then be based on class.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 * 
 *     Visibility Switch:
 *     - This Switch must be turned ON in order for the category to show.
 *     - Use 0 for no Switch requirement.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optimized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 * 
 * Switches:
 * 
 *   Switch: Buy:
 *   - Buying items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 *   Switch: Sell
 *   - Selling items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Already Equipped:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Can't Equip:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   No Changes:
 *   - Marker used to show no changes have occurred.
 * 
 *   JS: Draw Equip Data:
 *   - Code used to draw the equipment data for the Shop Status Window.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
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
 * Version 1.23: April 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.21: March 5, 2021
 * * Feature Update!
 * ** Custom equipment slots are disabled during Battle Testing for better
 *    accuracy and results.
 * 
 * Version 1.20: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Buy
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Sell
 * **** Buying/selling items in the Shop Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Shop Scene opens.
 * **** These switches can be used after a "Shop Processing" event command to
 *      determine if the player has bought an item, bought and sold an item,
 *      sold an item, or neither.
 * 
 * Version 1.19: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina.
 * *** <Equip Copy Limit: x>
 * **** Sets a maximum number of copies that the actor can wear of this
 *      equipment. Usage Example: Actors can only equip one copy of the
 *      "One-of-a-Kind Ring" on at any time despite having empty accessory
 *      slots because the ring has a <Equip Copy Limit: 1> notetag.
 * *** <Equip Weapon Type Limit: x>
 * **** This weapon cannot be equipped with other weapons of the same type once
 *      the limited amount has been reached. Usage Example: A dualwielding
 *      warrior who can only equip one sword and a dagger but never two swords
 *      or two daggers because the swords and daggers all have the
 *      <Equip Weapon Type Limit: 1> notetags on them.
 * *** <Equip Armor Type Limit: x>
 * **** This armor cannot be equipped with other armors of the same type once
 *      the limited amount has been reached. Usage Example: People cannot equip
 *      more than two glove accessories on at a time because the glove is a
 *      "Glove" armor-type and each glove item has the
 *      <Equip Armor Type Limit: 2> notetags on them.
 * 
 * Version 1.18: January 15, 2021
 * * Bug Fixes!
 * ** Pressing "Shift" to remove equipment will now refresh the status window
 *    unlike before. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Item Menu Settings > Background Type
 * 
 * Version 1.17: January 1, 2021
 * * Bug Fixes!
 * ** Equipping should be working properly again. Fix made by Yanfly.
 * 
 * Version 1.16: December 25, 2020
 * * Bug Fixes!
 * ** Equip-Adjust HP/MP should work properly now. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that if the VisuStella
 *    Battle Core is installed, then all battle scope items are visible, but
 *    not necessarily enabled if they are disabled otherwise.
 * 
 * Version 1.15: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that it removes the
 *    usable item from visibility as well if the actor unable to use it is the
 *    only person in the party.
 * 
 * Version 1.14: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.13: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Actor: Change Equip Slots
 * *** Actor: Reset Equip Slots
 * **** These plugin commands allow you to forcefully change the equip slots
 *      available to an actor regardless of the slots provided by its class as
 *      well as reset them.
 * 
 * Version 1.12: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 8, 2020
 * * Bug Fix!
 * ** Font size ratio for the shop status window now scales to a hard coded
 *    value to prevent smaller font sizes from expanding icon sizes. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Currency display in the shop menu is now reflected upon how the plugin
 *    parameters set them to display. Update made by Arisu.
 * 
 * Version 1.10: November 1, 2020
 * * Feature Update!
 * ** Modern Controls compatibility with Core Engine no longer enables the
 *    Item Categories window and child classes to utilize the Home/End keys.
 * 
 * Version 1.09: October 25, 2020
 * * Bug Fixes!
 * ** "All Items" category should now display the "Items" text. Fix by Irina.
 * ** WType, AType, and EType categories now work with text. Fix by Irina.
 *
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
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
 * @command ActorChangeEquipSlots
 * @text Actor: Change Equip Slots
 * @desc Forcefully change the actor(s) equip slots.
 * These will persist through class changes.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 * 
 * @arg Slots:arraystr
 * @text Equip Slots
 * @type string[]
 * @desc Insert the equip slots you want the actor(s) to have.
 * These entries are case-sensitive.
 * @default ["Weapon","Shield","Head","Body","Accessory"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorResetEquipSlots
 * @text Actor: Reset Equip Slots
 * @desc Reset any forced equip slots for the actor(s).
 * Equip slots will then be based on class.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
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
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","CommandAddOptimize:eval":"false","CmdIconOptimize:num":"137","CommandAddClear:eval":"false","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
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
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
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
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
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
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @text Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param SwitchID:num
 * @text Visibility Switch
 * @type switch
 * @desc This Switch must be turned ON in order for the category to show.
 * Use 0 for no Switch requirement.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optimized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param Switches
 *
 * @param SwitchBuy:num
 * @text Switch: Buy
 * @parent Switches
 * @type switch
 * @desc Buying items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param SwitchSell:num
 * @text Switch: Sell
 * @parent Switches
 * @type switch
 * @desc Selling items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipData
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipData
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 */
//=============================================================================

const _0x44c1=['MaxItems','commandName','ARRAYSTR','buttonAssistRemove','ScopeRandomEnemies','releaseUnequippableItems','categories','commandNameWindowDrawText','_category','prepareNewEquipSlotsOnLoad','isShiftRemoveShortcutEnabled','LUK','commandBuyItemsEquipsCore','postCreateItemsEquipsCore','drawItemEffectsHpDamage','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','numberWindowRect','Parse_Notetags_Batch','VisuMZ_1_MainMenuCore','drawItemEffectsSelfTpGain','registerCommand','nonOptimizeEtypes','Window_ItemList_colSpacing','MAT','LabelElement','Parse_Notetags_ParamJS','buyWindowRectItemsEquipsCore','hideDisabledCommands','_list','isGoodShown','type','callUpdateHelp','drawItemDamageAmount','_numberWindow','Scene_Equip_onActorChange','_newLabelOpacity','calcWindowHeight','IncludeShopItem','CmdHideDisabled','Scene_Shop_create','initNewItemsList','placeItemNewLabel','_customItemInfo','Game_Actor_discardEquip','maxCols','equipSlotIndex','isOpenAndActive','drawRemoveItem','isDualWield','clear','resetTextColor','value','Consumable','buttonAssistCategory','setStatusWindow','cancel','processTouchModernControls','ConvertNumberToString','categoryStyleCheck','hpRate','onCategoryCancel','allowCreateStatusWindow','_buyWindowLastIndex','Scene_Shop_buyWindowRect','createSellWindow','equip2','categoryStyle','drawItemEffectsAddedStatesBuffs','paintOpacity','LabelSelfGainTP','drawItemEffectsHpRecovery','addInnerChild','458476iyGGPW','processHandling','isCancelled','adjustHiddenShownGoods','SwitchBuy','addSellCommand','iconWidth','isPlaytest','blt','doBuy','updateCategoryNameWindow','_calculatingJSParameters','AlwaysUsable','isEquipChangeOk','MaxHP','isUseModernControls','resetShopSwitches','Categories','ShowShopStatus','sellWindowRectItemsEquipsCore','getColor','iconIndex','ARRAYJSON','postCreateSellWindowItemsEquipsCore','577587JHKyBq','helpAreaTop','ParseClassNotetags','isClearCommandAdded','getItemsEquipsCoreBackColor2','StatusWindowWidth','isEquipped','cursorPageup','EFFECT_ADD_STATE','drawItemConsumable','46083nTtikC','drawItemCustomEntries','isClearEquipOk','createStatusWindow','ItemQuantityFmt','getItemDamageElementLabel','removeDebuff','format','commandBuy','SellPriceJS','windowPadding','tradeItemWithParty','getItemEffectsTpRecoveryText','commandWindowRect','iconHeight','_doubleTouch','EFFECT_ADD_DEBUFF','onSellOkItemsEquipsCore','Slots','Parse_Notetags_Prices','param','powerUpColor','ParseWeaponNotetags','item-%1','loadSystem','ParseItemNotetags','length','isHovered','Damage\x20Formula\x20Error\x20for\x20%1','Scene_Item_createItemWindow','isUseParamNamesWithIcons','buttonAssistLargeIncrement','split','ScopeRandomAny','_data','W%1','getNextAvailableEtypeId','commandSellItemsEquipsCore','AlreadyEquipMarker','Scene_Shop_prepare','70400WcdOUD','currentClass','scrollTo','EFFECT_RECOVER_HP','DamageType%1','LabelSuccessRate','smallParamFontSize','ItemScene','onActorChange','Parse_Notetags_Category','drawItemNumber','setHelpWindowItem','getItemSpeedLabel','addOptimizeCommand','cursorPagedown','getItemEffectsMpDamageLabel','values','itemWindowRectItemsEquipsCore','312477IXLpwR','Nonconsumable','drawItemEffectsTpDamage','createCategoryWindow','speed','changeBuff','BackRectColor','helpWindowRect','updatedLayoutStyle','commandStyleCheck','max','Scene_Equip_createSlotWindow','HiddenItemB','discardEquip','drawNewLabelText','statusWindowRectItemsEquipsCore','getItemDamageAmountTextOriginal','HiddenItemA','SpeedNeg2000','log','armor','commandSell','\x5cI[%1]%2','drawItemEffects','actor','ItemMenuStatusRect','numberWindowRectItemsEquipsCore','Scene_Equip_slotWindowRect','itemPadding','drawTextEx','isSceneShop','return\x200','\x5cb%1\x5cb','buttonAssistItemListRequirement','categoryItemTypes','BattleUsable','translucentOpacity','Width','ParamChangeFontSize','placeNewLabel','setTopRow','activate','_goodsCount','DrawBackRect','120809QfEfmP','1fbNFKr','isHandled','createNewLabelSprite','getItemEffectsHpDamageText','Window_ItemList_maxCols','canShiftRemoveEquipment','drawItem','code','categoryNameWindowDrawText','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','makeItemData','itemTextAlign','statusWidth','Game_Actor_forceChangeEquip','Step3End','normalColor','updateNewLabelOpacity','getItemQuantityText','createSlotWindow','commandStyle','setMp','_sellWindow','JSON','?????','forceChangeEquip','BatchShop','NeverUsable','call','SpeedNeg1999','drawItemDarkRect','getItemSuccessRateText','commandNameWindowDrawBackground','optimize','buffIconIndex','_buyWindow','repeats','currentSymbol','HP\x20RECOVERY','addBuyCommand','Window_Selectable_setHelpWindowItem','hitType','playBuzzerSound','getItemEffectsSelfTpGainText','isBuyCommandEnabled','effects','getItemColor','drawItemDamageElement','AllWeapons','canUse','CmdIconBuy','createItemWindow','armorTypes','Window_ItemCategory_setItemWindow','drawItemScope','categoryList','refreshCursor','_commandNameWindow','SPEED','Window_ShopBuy_refresh','equipAdjustHpMp','OffsetX','DrawEquipData','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Window_ItemList_updateHelp','getMenuImage','Window_EquipCommand_initialize','getItemSuccessRateLabel','itemEnableJS','onCategoryOk','getInputButtonString','NotConsumable','setTempActor','gaugeBackColor','drawParamText','cursorLeft','SwitchSell','addEquipCommand','pageup','getItemDamageAmountLabelBattleCore','_itemWindow','parse','EnableLayout','onBuyCancel','onSellCancel','occasion','Scene_Equip_create','addLoadListener','bestEquipItem','optKeyItemsNumber','slotWindowRectItemsEquipsCore','drawItemRepeats','ConvertParams','consumable','paramId','Speed1000','map','setHandler','updateHelp','+%1','REPEAT','clearNewLabelFromItem','removeStateBuffChanges','boxWidth','prepareItemCustomData','lineHeight','sell','setShopStatusWindowMode','Step2Start','isOpen','pagedown','buttonAssistKey1','mainAreaBottom','Scene_Shop_onSellCancel','RemoveEquipIcon','getItemScopeText','paramchangeTextColor','flatMP','AllItems','MaxWeapons','clearEquipments','\x5cI[%1]','_equips','process_VisuMZ_ItemsEquipsCore_EquipSlots','FadeLimit','gainItem','icon','fontSize','isSoleWeaponType','getDamageStyle','onTouchSelect','ELEMENT','Game_Actor_paramPlus','getItemEffectsSelfTpGainLabel','SwitchID','NonRemoveETypes','Scene_Shop_activateSellWindow','initNewLabelSprites','processShiftRemoveShortcut','colSpacing','removeState','Scene_Load_reloadMapIfUpdated','Scene_Item_categoryWindowRect','playCursorSound','LabelConsume','getItemEffectsRemovedStatesBuffsText','_dummyWindow','ParseAllNotetags','refreshItemsEquipsCoreNoMenuImage','changePaintOpacity','slotWindowRect','Scene_Shop_createCategoryWindow','constructor','version','ShopScene','MANUAL','show','loadCharacter','rateHP','Scene_Equip_itemWindowRect','textWidth','A%1','_item','nextActor','VisuMZ_1_BattleCore','categoryWindowRectItemsEquipsCore','paramValueByName','DrawParamJS','Game_BattlerBase_meetsItemConditions','uiHelpPosition','commandWindowRectItemsEquipsCore','prepareRefreshItemsEquipsCoreLayout','active','Step1Start','categoryNameWindowDrawBackground','buyWindowRect','visible','setItem','onTouchCancel','getItemDamageAmountLabelOriginal','Style','buttonAssistSlotWindowShift','buttonAssistText3','replace','shift','onDatabaseLoaded','drawItemEffectsRemovedStatesBuffs','successRate','Speed2000','getItemEffectsHpRecoveryText','isKeyItem','getItemEffectsTpRecoveryLabel','nonRemovableEtypes','getItemEffectsHpRecoveryLabel','CmdTextAlign','FieldUsable','Scope%1','indexOf','LabelDamageHP','etypeId','members','onTouchOk','characterName','_slotId','KeyItems','exit','drawItemQuantity','StatusWindow','ActorResetEquipSlots','isBattleTest','makeCommandList','numItems','Scene_Shop_doBuy','category','postCreateItemWindowModernControls','update','STR','Scene_Shop_sellWindowRect','Window_ItemCategory_initialize','gainTP','fill','changeTextColor','drawItemEffectsMpDamage','meetsItemConditionsNotetags','isTriggered','Param','TP\x20DAMAGE','Settings','optimizeEquipments','sellingPrice','meetsItemConditions','currentExt','loadPicture','splice','trim','getItemEffectsMpDamageText','tpGain','MaxMP','_handlers','reloadMapIfUpdated','innerWidth','activateSellWindow','bitmap','EFFECT_REMOVE_BUFF','drawItemSpeed','forceResetEquipSlots','FadeSpeed','drawNewLabelIcon','name','IconSet','HIT\x20TYPE','fontSizeRatio','playOkSound','bind','initEquips','getItemEffectsAddedStatesBuffsText','createCommandNameWindow','select','onMenuImageLoad','LabelRemove','getItemDamageAmountTextBattleCore','wtypeId','Scene_ItemBase_activateItemWindow','checkItemConditionsSwitchNotetags','commandEquip','Scene_Shop_createSellWindow','CmdStyle','hitIndex','isRepeated','cursorUp','addChild','drawItemName','_shopStatusMenuAlly','Scene_Boot_onDatabaseLoaded','CONSUMABLE','resetFontSettings','isOptimizeCommandAdded','_categoryWindow','Game_Actor_changeEquip','drawItemActorMenuImage','addStateBuffChanges','SUCCESS\x20RATE','Scene_Item_itemWindowRect','Parse_Notetags_ParamValues','deactivate','Scene_Shop_doSell','CommandAddClear','_statusWindow','weaponTypes','isEquipCommandEnabled','determineBaseSellingPrice','drawItemStyleIcon','_newItemsList','REMOVED\x20EFFECTS','LabelDamageTP','itemWindowRect','TP\x20RECOVERY','actorParams','_purchaseOnly','Game_Party_initialize','Parse_Notetags_EnableJS','keyItem','isUseItemsEquipsCoreUpdatedLayout','meetsItemConditionsJS','equips','ItemSceneAdjustItemList','selfTP','SCOPE','getItemEffectsMpRecoveryText','convertInitEquipsToItems','mainCommandWidth','Enable','drawEquipData','LabelHitType','maxItemAmount','ceil','round','postCreateCategoryWindowItemsEquipsCore','itypeId','fillRect','MP\x20RECOVERY','Scene_Equip_statusWindowRect','FUNC','isNewItem','New','Scene_Shop_onBuyCancel','onSlotCancel','params','Actors','FontColor','onBuyCancelItemsEquipsCore','onTouchSelectModernControls','%1%','Type','match','drawParamsItemsEquipsCore','Scene_Item_create','activateItemWindow','setCategory','paramPlus','remove','QUANTITY','getItemRepeatsLabel','cursorDown','Scene_Shop_numberWindowRect','DrawPortraitJS','atypeId','down','Blacklist','Window_Selectable_refresh','setupItemDamageTempActors','Icon','itemLineRect','paramJS','SpeedNeg999','RegularItems','Speed1','CannotEquipMarker','Scene_Shop_onCategoryCancel','elements','ShopMenuStatusStandard','limitedPageUpDownSceneCheck','setItemWindow','mpRate','Scene_Equip_onSlotOk','processCursorSpecialCheckModernControls','dataId','categoryWindowRect','possession','EFFECT_GAIN_TP','forceChangeEquipSlots','isOptimizeCommandEnabled','parameters','EquipParams','weapon','Window_EquipItem_isEnabled','toUpperCase','price','drawItemCustomEntryLine','CoreEngine','Game_Party_gainItem','clamp','ScopeRandomAllies','defaultItemMax','helpAreaHeight','flatHP','CmdCancelRename','_commandWindow','LabelRecoverMP','_slotWindow','MP\x20DAMAGE','rateMP','Window_EquipStatus_refresh','getItemHitTypeLabel','isWeapon','Scene_Shop_commandBuy','PurchaseOnly','Window_Selectable_initialize','_tempActorA','postCreateSlotWindowItemsEquipsCore','LabelRecoverHP','changeEquip','isBottomHelpMode','getItemOccasionText','LabelApply','sellWindowRect','refresh','_newLabelOpacityUpperLimit','isMainMenuCoreMenuImageOptionAvailable','refreshActorEquipSlotsIfUpdated','allowShiftScrolling','width','CommandAddOptimize','getItemConsumableText','isArmor','SellPriceRate','getItemHitTypeText','setNewItem','isEquipCommandAdded','Window_ItemList_drawItem','contentsBack','itemAt','OffsetY','damage','getItemEffectsTpDamageLabel','description','value2','Scene_Shop_statusWindowRect','setBackgroundType','Scene_Item_createCategoryWindow','Scene_Shop_commandSell','itemHasEquipLimit','QoL','prototype','Game_BattlerBase_param','newLabelEnabled','createCategoryNameWindow','Scene_Equip_onSlotCancel','isClicked','_resetFontSize','uiMenuStyle','drawing','drawUpdatedParamValueDiff','canEquip','doSell','isPressed','drawItemEffectsMpRecovery','popScene','isSellCommandEnabled','isCommandEnabled','_forcedSlots','isSoleArmorType','drawActorParamDifference','drawItemEffectsTpRecovery','maxVisibleItems','categoryNameWindowCenter','getItemSpeedText','ARRAYFUNC','uiInputPosition','itemDataFontSize','isOptimizeEquipOk','armor-%1','processCursorMoveModernControls','drawItemEquipType','onSellOk','_tempActor','drawUpdatedParamName','includes','getItemEffectsTpDamageText','RegExp','powerDownColor','Parse_Notetags_EquipSlots','1GpmZZT','Game_Actor_tradeItemWithParty','getItemsEquipsCoreBackColor1','center','EVAL','floor','AllArmors','getItemRepeatsText','Speed0','textColor','_money','_tempActorB','setHp','damageColor','0000','isEquipItem','contents','Step2End','push','addState','cursorRight','ATK','maxItems','DEF','HP\x20DAMAGE','elementId','mainFontSize','getMatchingInitEquip','ParseArmorNotetags','_resetFontColor','LayoutStyle','ADDED\x20EFFECTS','isItem','_actor','paramPlusItemsEquipsCoreCustomJS','_newLabelSprites','hide','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','buttonAssistSmallIncrement','_itemData','height','CmdIconEquip','EquipAdjustHpMp','drawText','_newLabelOpacityChange','isRightInputMode','formula','updateCommandNameWindow','getItemEffectsHpDamageLabel','DrawFaceJS','drawItemSuccessRate','NoChangeMarker','_categoryNameWindow','(%1)','RemoveEquipText','isShowNew','drawItemKeyData','FontFace','filter','shouldCommandWindowExist','initialize','modifiedBuyPriceItemsEquipsCore','EquipScene','Window_EquipItem_includes','weapon-%1','sellPriceRate','mainAreaTop','Scene_Equip_commandWindowRect','deselect','buttonAssistKey2','makeDeepCopy','Scene_Equip_commandEquip','versionId','smoothSelect','equip','setObject','Window_ShopSell_isEnabled','text','ItemsEquipsCore','setValue','onCategoryCancelItemsEquipsCore','DAMAGE\x20MULTIPLIER','getTextColor','buy','systemColor','ActorChangeEquipSlots','isShiftShortcutKeyForRemove','loadFaceImages','processCursorHomeEndTrigger','prepare','hideNewLabelSprites','getItemEffectsMpRecoveryLabel','getItemConsumableLabel','isHoverEnabled','right','drawIcon','drawParamName','ExtDisplayedParams','processDrawIcon','equipTypes','value1','drawUpdatedBeforeParamValue','left','clearNewItem','process_VisuMZ_ItemsEquipsCore_Notetags','getItemEffectsAddedStatesBuffsLabel','create','buttonAssistText2','drawItemOccasion','isClearCommandEnabled','1NGUdpK','Scene_Shop_commandWindowRect','buttonAssistKey3','isEnabled','equipSlots','onTouchSelectModern','ParamValueFontSize','Scene_Shop_goldWindowRect','USER\x20TP\x20GAIN','×%1','geUpdatedLayoutStatusWidth','updateMoneyAmount','Whitelist','goldWindowRect','Window_ShopCommand_initialize','drawItemData','(+%1)','DrawIcons','battleMembers','process_VisuMZ_ItemsEquipsCore_RegExp','addCommand','index','commandNameWindowCenter','Window_ShopBuy_price','Scene_Shop_sellingPrice','addWindow','revertGlobalNamespaceVariables','textSizeEx','66970dTMIXO','currencyUnit','isPageChangeRequested','mainAreaHeight','buttonAssistOffset3','Scene_Shop_categoryWindowRect','_scene','getInputMultiButtonStrings','Scene_Shop_onSellOk','BorderRegExp','opacity','goldWindowRectItemsEquipsCore','move','prepareNextScene','processCursorMove','ItemQuantityFontSize','ARRAYNUM','iconText','VisuMZ_0_CoreEngine','addCancelCommand','isCursorMovable','+%1%','atk','Text','HitType%1','KeyItemProtect','MDF','adjustItemWidthByStatus','Step1End','item','createBitmap','FontSize','%1-%2','getItemDamageAmountLabel','checkShiftRemoveShortcut','isDrawItemNumber','gaugeLineHeight','drawItemCost','getItemDamageAmountText','helpWindowRectItemsEquipsCore','statusWindowRect','Occasion%1','note','CmdIconSell','TextAlign','2CksNrR','Step3Start','LabelDamageMP','auto','_goods','buttonAssistText1','EFFECT_RECOVER_MP'];const _0x408f=function(_0x33c7de,_0x20d8f4){_0x33c7de=_0x33c7de-0x64;let _0x44c139=_0x44c1[_0x33c7de];return _0x44c139;};const _0x1f1bbd=_0x408f;(function(_0x13be47,_0x58ebdc){const _0x5a9ccc=_0x408f;while(!![]){try{const _0xb4a021=parseInt(_0x5a9ccc(0x2b4))*-parseInt(_0x5a9ccc(0x33d))+parseInt(_0x5a9ccc(0x265))*-parseInt(_0x5a9ccc(0x33c))+parseInt(_0x5a9ccc(0x2fe))+parseInt(_0x5a9ccc(0x21c))*parseInt(_0x5a9ccc(0x310))+parseInt(_0x5a9ccc(0x2d6))+parseInt(_0x5a9ccc(0x1ae))*parseInt(_0x5a9ccc(0x2cc))+parseInt(_0x5a9ccc(0x238));if(_0xb4a021===_0x58ebdc)break;else _0x13be47['push'](_0x13be47['shift']());}catch(_0x4f1569){_0x13be47['push'](_0x13be47['shift']());}}}(_0x44c1,0x5b2af));var label=_0x1f1bbd(0x1fc),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1f1bbd(0x1e8)](function(_0x27e3f6){const _0x2946d4=_0x1f1bbd;return _0x27e3f6['status']&&_0x27e3f6[_0x2946d4(0x17f)][_0x2946d4(0x1a9)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x1f1bbd(0xb9)]||{},VisuMZ[_0x1f1bbd(0x398)]=function(_0x476f39,_0x4ffcb8){const _0x138505=_0x1f1bbd;for(const _0x5f4649 in _0x4ffcb8){if(_0x5f4649[_0x138505(0x124)](/(.*):(.*)/i)){const _0x2d6723=String(RegExp['$1']),_0x5b5e8b=String(RegExp['$2'])[_0x138505(0x14e)]()[_0x138505(0xc0)]();let _0x4f7600,_0x16ec9d,_0x4d6b77;switch(_0x5b5e8b){case'NUM':_0x4f7600=_0x4ffcb8[_0x5f4649]!==''?Number(_0x4ffcb8[_0x5f4649]):0x0;break;case _0x138505(0x248):_0x16ec9d=_0x4ffcb8[_0x5f4649]!==''?JSON['parse'](_0x4ffcb8[_0x5f4649]):[],_0x4f7600=_0x16ec9d[_0x138505(0x39c)](_0x16e112=>Number(_0x16e112));break;case _0x138505(0x1b2):_0x4f7600=_0x4ffcb8[_0x5f4649]!==''?eval(_0x4ffcb8[_0x5f4649]):null;break;case'ARRAYEVAL':_0x16ec9d=_0x4ffcb8[_0x5f4649]!==''?JSON[_0x138505(0x38d)](_0x4ffcb8[_0x5f4649]):[],_0x4f7600=_0x16ec9d['map'](_0xb5816a=>eval(_0xb5816a));break;case _0x138505(0x353):_0x4f7600=_0x4ffcb8[_0x5f4649]!==''?JSON[_0x138505(0x38d)](_0x4ffcb8[_0x5f4649]):'';break;case _0x138505(0x2ca):_0x16ec9d=_0x4ffcb8[_0x5f4649]!==''?JSON['parse'](_0x4ffcb8[_0x5f4649]):[],_0x4f7600=_0x16ec9d[_0x138505(0x39c)](_0x50d608=>JSON[_0x138505(0x38d)](_0x50d608));break;case _0x138505(0x118):_0x4f7600=_0x4ffcb8[_0x5f4649]!==''?new Function(JSON[_0x138505(0x38d)](_0x4ffcb8[_0x5f4649])):new Function(_0x138505(0x32f));break;case _0x138505(0x19f):_0x16ec9d=_0x4ffcb8[_0x5f4649]!==''?JSON[_0x138505(0x38d)](_0x4ffcb8[_0x5f4649]):[],_0x4f7600=_0x16ec9d[_0x138505(0x39c)](_0x5d11fd=>new Function(JSON[_0x138505(0x38d)](_0x5d11fd)));break;case _0x138505(0xae):_0x4f7600=_0x4ffcb8[_0x5f4649]!==''?String(_0x4ffcb8[_0x5f4649]):'';break;case _0x138505(0x26e):_0x16ec9d=_0x4ffcb8[_0x5f4649]!==''?JSON[_0x138505(0x38d)](_0x4ffcb8[_0x5f4649]):[],_0x4f7600=_0x16ec9d[_0x138505(0x39c)](_0x3296d2=>String(_0x3296d2));break;case'STRUCT':_0x4d6b77=_0x4ffcb8[_0x5f4649]!==''?JSON[_0x138505(0x38d)](_0x4ffcb8[_0x5f4649]):{},_0x476f39[_0x2d6723]={},VisuMZ['ConvertParams'](_0x476f39[_0x2d6723],_0x4d6b77);continue;case'ARRAYSTRUCT':_0x16ec9d=_0x4ffcb8[_0x5f4649]!==''?JSON[_0x138505(0x38d)](_0x4ffcb8[_0x5f4649]):[],_0x4f7600=_0x16ec9d[_0x138505(0x39c)](_0x261a0f=>VisuMZ[_0x138505(0x398)]({},JSON[_0x138505(0x38d)](_0x261a0f)));break;default:continue;}_0x476f39[_0x2d6723]=_0x4f7600;}}return _0x476f39;},(_0x2b4179=>{const _0x31842=_0x1f1bbd,_0x30c7b4=_0x2b4179[_0x31842(0xce)];for(const _0x243952 of dependencies){if(!Imported[_0x243952]){alert(_0x31842(0x37b)['format'](_0x30c7b4,_0x243952)),SceneManager[_0x31842(0xa3)]();break;}}const _0x4b4f9c=_0x2b4179[_0x31842(0x17f)];if(_0x4b4f9c[_0x31842(0x124)](/\[Version[ ](.*?)\]/i)){const _0x30a4b6=Number(RegExp['$1']);_0x30a4b6!==VisuMZ[label][_0x31842(0x6f)]&&(alert(_0x31842(0x1d3)[_0x31842(0x2dd)](_0x30c7b4,_0x30a4b6)),SceneManager['exit']());}if(_0x4b4f9c[_0x31842(0x124)](/\[Tier[ ](\d+)\]/i)){const _0x2cdcda=Number(RegExp['$1']);_0x2cdcda<tier?(alert(_0x31842(0x27b)[_0x31842(0x2dd)](_0x30c7b4,_0x2cdcda,tier)),SceneManager[_0x31842(0xa3)]()):tier=Math[_0x31842(0x31a)](_0x2cdcda,tier);}VisuMZ[_0x31842(0x398)](VisuMZ[label]['Settings'],_0x2b4179[_0x31842(0x14a)]);})(pluginData),PluginManager[_0x1f1bbd(0x280)](pluginData['name'],_0x1f1bbd(0x203),_0x53d4eb=>{const _0x530b00=_0x1f1bbd;VisuMZ['ConvertParams'](_0x53d4eb,_0x53d4eb);const _0x5f5a6e=_0x53d4eb[_0x530b00(0x11e)][_0x530b00(0x39c)](_0x43f4d9=>$gameActors[_0x530b00(0x328)](_0x43f4d9)),_0x3866ba=_0x53d4eb[_0x530b00(0x2e8)][_0x530b00(0x39c)](_0x3d9b32=>$dataSystem[_0x530b00(0x211)][_0x530b00(0x9b)](_0x3d9b32[_0x530b00(0xc0)]()));for(const _0x3eed13 of _0x5f5a6e){if(!_0x3eed13)continue;_0x3eed13[_0x530b00(0x148)](_0x3866ba);}}),PluginManager[_0x1f1bbd(0x280)](pluginData[_0x1f1bbd(0xce)],_0x1f1bbd(0xa6),_0x3ed9b1=>{const _0x54099f=_0x1f1bbd;VisuMZ[_0x54099f(0x398)](_0x3ed9b1,_0x3ed9b1);const _0x2c41a2=_0x3ed9b1['Actors']['map'](_0x2761a2=>$gameActors['actor'](_0x2761a2));for(const _0x5c5ead of _0x2c41a2){if(!_0x5c5ead)continue;_0x5c5ead[_0x54099f(0xcb)]();}}),PluginManager[_0x1f1bbd(0x280)](pluginData[_0x1f1bbd(0xce)],_0x1f1bbd(0x356),_0x1c1fd1=>{const _0x4e08fb=_0x1f1bbd;VisuMZ[_0x4e08fb(0x398)](_0x1c1fd1,_0x1c1fd1);const _0x1ca480=[],_0xfad956=_0x1c1fd1[_0x4e08fb(0x132)][_0x4e08fb(0x39c)](_0x503dc3=>_0x503dc3[_0x4e08fb(0x14e)]()[_0x4e08fb(0xc0)]()),_0x43b112=_0x1c1fd1[_0x4e08fb(0x228)][_0x4e08fb(0x39c)](_0xf85995=>_0xf85995['toUpperCase']()[_0x4e08fb(0xc0)]()),_0x44e8ad=_0x1c1fd1[_0x4e08fb(0x254)]>=_0x1c1fd1[_0x4e08fb(0x83)]?_0x1c1fd1[_0x4e08fb(0x83)]:_0x1c1fd1[_0x4e08fb(0x254)],_0x19d7e1=_0x1c1fd1['Step1End']>=_0x1c1fd1['Step1Start']?_0x1c1fd1[_0x4e08fb(0x254)]:_0x1c1fd1[_0x4e08fb(0x83)],_0x242988=Array(_0x19d7e1-_0x44e8ad+0x1)[_0x4e08fb(0xb2)]()[_0x4e08fb(0x39c)]((_0x2f8501,_0x25dfb6)=>_0x44e8ad+_0x25dfb6);for(const _0x2d9b99 of _0x242988){const _0x106a67=$dataItems[_0x2d9b99];if(!_0x106a67)continue;if(!VisuMZ[_0x4e08fb(0x1fc)][_0x4e08fb(0x291)](_0x106a67,_0xfad956,_0x43b112))continue;_0x1ca480[_0x4e08fb(0x1c0)]([0x0,_0x2d9b99,0x0,_0x106a67['price']]);}const _0x2d32f3=_0x1c1fd1['Step2End']>=_0x1c1fd1[_0x4e08fb(0x3a8)]?_0x1c1fd1['Step2Start']:_0x1c1fd1[_0x4e08fb(0x1bf)],_0x4bb9e2=_0x1c1fd1['Step2End']>=_0x1c1fd1['Step2Start']?_0x1c1fd1[_0x4e08fb(0x1bf)]:_0x1c1fd1[_0x4e08fb(0x3a8)],_0x447528=Array(_0x4bb9e2-_0x2d32f3+0x1)[_0x4e08fb(0xb2)]()['map']((_0x3d150c,_0x2d65b4)=>_0x2d32f3+_0x2d65b4);for(const _0x242954 of _0x447528){const _0x3cd01d=$dataWeapons[_0x242954];if(!_0x3cd01d)continue;if(!VisuMZ[_0x4e08fb(0x1fc)][_0x4e08fb(0x291)](_0x3cd01d,_0xfad956,_0x43b112))continue;_0x1ca480[_0x4e08fb(0x1c0)]([0x1,_0x242954,0x0,_0x3cd01d['price']]);}const _0x335b76=_0x1c1fd1[_0x4e08fb(0x34b)]>=_0x1c1fd1['Step3Start']?_0x1c1fd1[_0x4e08fb(0x266)]:_0x1c1fd1[_0x4e08fb(0x34b)],_0x28c2fd=_0x1c1fd1['Step3End']>=_0x1c1fd1['Step3Start']?_0x1c1fd1[_0x4e08fb(0x34b)]:_0x1c1fd1[_0x4e08fb(0x266)],_0x463e80=Array(_0x28c2fd-_0x335b76+0x1)[_0x4e08fb(0xb2)]()[_0x4e08fb(0x39c)]((_0x5d53e9,_0x596ec5)=>_0x335b76+_0x596ec5);for(const _0x15dfcf of _0x463e80){const _0x3af734=$dataArmors[_0x15dfcf];if(!_0x3af734)continue;if(!VisuMZ[_0x4e08fb(0x1fc)]['IncludeShopItem'](_0x3af734,_0xfad956,_0x43b112))continue;_0x1ca480['push']([0x2,_0x15dfcf,0x0,_0x3af734['price']]);}SceneManager[_0x4e08fb(0x1c0)](Scene_Shop),SceneManager[_0x4e08fb(0x245)](_0x1ca480,_0x1c1fd1[_0x4e08fb(0x162)]);}),VisuMZ['ItemsEquipsCore'][_0x1f1bbd(0x291)]=function(_0x586f73,_0x295cda,_0x4200f0){const _0x58ae7c=_0x1f1bbd;if(_0x586f73[_0x58ae7c(0xce)][_0x58ae7c(0xc0)]()==='')return![];if(_0x586f73[_0x58ae7c(0xce)][_0x58ae7c(0x124)](/-----/i))return![];const _0x416023=_0x586f73[_0x58ae7c(0x272)];if(_0x295cda[_0x58ae7c(0x2f0)]>0x0)for(const _0x5b32fa of _0x295cda){if(!_0x5b32fa)continue;if(_0x416023[_0x58ae7c(0x1a9)](_0x5b32fa))return![];}if(_0x4200f0[_0x58ae7c(0x2f0)]>0x0){for(const _0x5ab800 of _0x4200f0){if(!_0x5ab800)continue;if(_0x416023[_0x58ae7c(0x1a9)](_0x5ab800))return!![];}return![];}return!![];},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0xe7)]=Scene_Boot[_0x1f1bbd(0x187)][_0x1f1bbd(0x8f)],Scene_Boot[_0x1f1bbd(0x187)][_0x1f1bbd(0x8f)]=function(){const _0x2ac51a=_0x1f1bbd;this['process_VisuMZ_ItemsEquipsCore_RegExp'](),VisuMZ[_0x2ac51a(0x1fc)][_0x2ac51a(0xe7)][_0x2ac51a(0x358)](this),this['process_VisuMZ_ItemsEquipsCore_Notetags']();},Scene_Boot[_0x1f1bbd(0x187)][_0x1f1bbd(0x22f)]=function(){const _0x248ed1=_0x1f1bbd;VisuMZ[_0x248ed1(0x1fc)][_0x248ed1(0x1ab)]={},VisuMZ[_0x248ed1(0x1fc)][_0x248ed1(0x1ab)]['EquipParams']=[],VisuMZ[_0x248ed1(0x1fc)][_0x248ed1(0x1ab)][_0x248ed1(0x241)]=[];const _0x529731=[_0x248ed1(0x2c2),_0x248ed1(0xc3),_0x248ed1(0x1c3),_0x248ed1(0x1c5),_0x248ed1(0x283),_0x248ed1(0x252),'AGI',_0x248ed1(0x277)];for(const _0x517c72 of _0x529731){const _0x72a5ee='<%1:[\x20]([\x5c+\x5c-]\x5cd+)>'[_0x248ed1(0x2dd)](_0x517c72);VisuMZ[_0x248ed1(0x1fc)]['RegExp']['EquipParams'][_0x248ed1(0x1c0)](new RegExp(_0x72a5ee,'i'));const _0x28acb0=_0x248ed1(0x330)[_0x248ed1(0x2dd)](_0x517c72);VisuMZ[_0x248ed1(0x1fc)][_0x248ed1(0x1ab)][_0x248ed1(0x241)][_0x248ed1(0x1c0)](new RegExp(_0x28acb0,'g'));}},Scene_Boot[_0x1f1bbd(0x187)][_0x1f1bbd(0x216)]=function(){const _0x1815ba=_0x1f1bbd;if(VisuMZ[_0x1815ba(0x69)])return;this['process_VisuMZ_ItemsEquipsCore_EquipSlots']();const _0x4a615a=[$dataItems,$dataWeapons,$dataArmors];for(const _0x4ad5e9 of _0x4a615a){for(const _0x45fe29 of _0x4ad5e9){if(!_0x45fe29)continue;VisuMZ[_0x1815ba(0x1fc)][_0x1815ba(0x307)](_0x45fe29,_0x4ad5e9),VisuMZ['ItemsEquipsCore'][_0x1815ba(0x2e9)](_0x45fe29,_0x4ad5e9),VisuMZ[_0x1815ba(0x1fc)][_0x1815ba(0xf1)](_0x45fe29,_0x4ad5e9),VisuMZ[_0x1815ba(0x1fc)][_0x1815ba(0x285)](_0x45fe29,_0x4ad5e9),VisuMZ[_0x1815ba(0x1fc)][_0x1815ba(0x102)](_0x45fe29,_0x4ad5e9);}}},Scene_Boot['prototype'][_0x1f1bbd(0x3b7)]=function(){const _0x262e52=_0x1f1bbd;for(const _0x48754a of $dataClasses){if(!_0x48754a)continue;VisuMZ['ItemsEquipsCore'][_0x262e52(0x1ad)](_0x48754a);}},VisuMZ[_0x1f1bbd(0x1fc)]['ParseClassNotetags']=VisuMZ['ParseClassNotetags'],VisuMZ[_0x1f1bbd(0x2ce)]=function(_0x191ece){const _0x547a5f=_0x1f1bbd;VisuMZ[_0x547a5f(0x1fc)][_0x547a5f(0x2ce)][_0x547a5f(0x358)](this,_0x191ece),VisuMZ[_0x547a5f(0x1fc)]['Parse_Notetags_EquipSlots'](_0x191ece);},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x2ef)]=VisuMZ['ParseItemNotetags'],VisuMZ[_0x1f1bbd(0x2ef)]=function(_0x386a1c){const _0x5d5ed1=_0x1f1bbd;VisuMZ[_0x5d5ed1(0x1fc)][_0x5d5ed1(0x2ef)][_0x5d5ed1(0x358)](this,_0x386a1c),VisuMZ[_0x5d5ed1(0x1fc)]['Parse_Notetags_Batch'](_0x386a1c,$dataItems);},VisuMZ['ItemsEquipsCore'][_0x1f1bbd(0x2ec)]=VisuMZ[_0x1f1bbd(0x2ec)],VisuMZ[_0x1f1bbd(0x2ec)]=function(_0x489599){const _0x2961e4=_0x1f1bbd;VisuMZ[_0x2961e4(0x1fc)][_0x2961e4(0x2ec)]['call'](this,_0x489599),VisuMZ[_0x2961e4(0x1fc)][_0x2961e4(0x27d)](_0x489599,$dataWeapons);},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x1ca)]=VisuMZ['ParseArmorNotetags'],VisuMZ['ParseArmorNotetags']=function(_0x5c49d5){const _0x93eaaa=_0x1f1bbd;VisuMZ['ItemsEquipsCore'][_0x93eaaa(0x1ca)][_0x93eaaa(0x358)](this,_0x5c49d5),VisuMZ[_0x93eaaa(0x1fc)][_0x93eaaa(0x27d)](_0x5c49d5,$dataArmors);},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x1ad)]=function(_0x27f825){const _0x551f37=_0x1f1bbd;_0x27f825[_0x551f37(0x220)]=[];if(!BattleManager[_0x551f37(0xa7)]()&&_0x27f825[_0x551f37(0x262)][_0x551f37(0x124)](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){const _0x4bfef4=String(RegExp['$1'])[_0x551f37(0x2f6)](/[\r\n]+/);for(const _0x4f7536 of _0x4bfef4){const _0xf472ba=$dataSystem[_0x551f37(0x211)][_0x551f37(0x9b)](_0x4f7536['trim']());if(_0xf472ba>0x0)_0x27f825[_0x551f37(0x220)][_0x551f37(0x1c0)](_0xf472ba);}}else for(const _0x4043d3 of $dataSystem[_0x551f37(0x211)]){const _0x21aa71=$dataSystem[_0x551f37(0x211)][_0x551f37(0x9b)](_0x4043d3[_0x551f37(0xc0)]());if(_0x21aa71>0x0)_0x27f825[_0x551f37(0x220)][_0x551f37(0x1c0)](_0x21aa71);}},VisuMZ[_0x1f1bbd(0x1fc)]['Parse_Notetags_Batch']=function(_0x440a35,_0x4968fe){const _0x6ea899=_0x1f1bbd;VisuMZ['ItemsEquipsCore'][_0x6ea899(0x307)](_0x440a35,_0x4968fe),VisuMZ[_0x6ea899(0x1fc)][_0x6ea899(0x2e9)](_0x440a35,_0x4968fe),VisuMZ[_0x6ea899(0x1fc)][_0x6ea899(0xf1)](_0x440a35,_0x4968fe),VisuMZ[_0x6ea899(0x1fc)]['Parse_Notetags_ParamJS'](_0x440a35,_0x4968fe),VisuMZ[_0x6ea899(0x1fc)][_0x6ea899(0x102)](_0x440a35,_0x4968fe);},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x307)]=function(_0x2b2d61,_0x409a80){const _0x27c026=_0x1f1bbd;_0x2b2d61[_0x27c026(0x272)]=[];const _0x3abe47=_0x2b2d61['note'],_0x542c99=_0x3abe47[_0x27c026(0x124)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x542c99)for(const _0x70339b of _0x542c99){_0x70339b['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x49951b=String(RegExp['$1'])['toUpperCase']()[_0x27c026(0xc0)]()[_0x27c026(0x2f6)](',');for(const _0x27ca0a of _0x49951b){_0x2b2d61[_0x27c026(0x272)][_0x27c026(0x1c0)](_0x27ca0a[_0x27c026(0xc0)]());}}if(_0x3abe47[_0x27c026(0x124)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x496bf0=RegExp['$1']['split'](/[\r\n]+/);for(const _0x2661cc of _0x496bf0){_0x2b2d61[_0x27c026(0x272)]['push'](_0x2661cc[_0x27c026(0x14e)]()['trim']());}}},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x2e9)]=function(_0x6e609c,_0x27b31e){const _0x64f8aa=_0x1f1bbd;_0x6e609c['note'][_0x64f8aa(0x124)](/<PRICE:[ ](\d+)>/i)&&(_0x6e609c[_0x64f8aa(0x14f)]=Number(RegExp['$1']));},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0xf1)]=function(_0xf79e85,_0xbc2684){const _0x211cf5=_0x1f1bbd;if(_0xbc2684===$dataItems)return;for(let _0x37ffb8=0x0;_0x37ffb8<0x8;_0x37ffb8++){const _0x3bd646=VisuMZ[_0x211cf5(0x1fc)][_0x211cf5(0x1ab)][_0x211cf5(0x14b)][_0x37ffb8];_0xf79e85[_0x211cf5(0x262)]['match'](_0x3bd646)&&(_0xf79e85[_0x211cf5(0x11d)][_0x37ffb8]=parseInt(RegExp['$1']));}},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x137)]={},VisuMZ[_0x1f1bbd(0x1fc)]['Parse_Notetags_ParamJS']=function(_0x4c22b8,_0x203a6d){const _0x47110=_0x1f1bbd;if(_0x203a6d===$dataItems)return;if(_0x4c22b8['note'][_0x47110(0x124)](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x1729a0=String(RegExp['$1']),_0x14803e=(_0x203a6d===$dataWeapons?_0x47110(0x2f9):'A%1')[_0x47110(0x2dd)](_0x4c22b8['id']),_0x3fab22='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x1729a0);for(let _0x9c65fa=0x0;_0x9c65fa<0x8;_0x9c65fa++){if(_0x1729a0[_0x47110(0x124)](VisuMZ[_0x47110(0x1fc)]['RegExp']['BorderRegExp'][_0x9c65fa])){const _0x576000=_0x47110(0x258)[_0x47110(0x2dd)](_0x14803e,_0x9c65fa);VisuMZ[_0x47110(0x1fc)]['paramJS'][_0x576000]=new Function(_0x47110(0x255),_0x47110(0x39a),_0x3fab22);}}}},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x380)]={},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x102)]=function(_0x329d8b,_0x284401){const _0x220046=_0x1f1bbd;if(_0x284401!==$dataItems)return;if(_0x329d8b[_0x220046(0x262)]['match'](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){const _0x5d9e6c=String(RegExp['$1']),_0x23afbf=_0x220046(0x346)[_0x220046(0x2dd)](_0x5d9e6c);VisuMZ[_0x220046(0x1fc)][_0x220046(0x380)][_0x329d8b['id']]=new Function(_0x220046(0x255),_0x23afbf);}},DataManager[_0x1f1bbd(0x94)]=function(_0x153200){const _0x2fcee8=_0x1f1bbd;return this[_0x2fcee8(0x1ce)](_0x153200)&&_0x153200[_0x2fcee8(0x114)]===0x2;},DataManager[_0x1f1bbd(0x110)]=function(_0x54e2c5){const _0x2af93f=_0x1f1bbd;if(!_0x54e2c5)return 0x63;else return _0x54e2c5['note'][_0x2af93f(0x124)](/<MAX:[ ](\d+)>/i)?parseInt(RegExp['$1']):this[_0x2af93f(0x155)](_0x54e2c5);},DataManager[_0x1f1bbd(0x155)]=function(_0x57b4e2){const _0x1db76b=_0x1f1bbd;if(this[_0x1db76b(0x1ce)](_0x57b4e2))return VisuMZ['ItemsEquipsCore'][_0x1db76b(0xb9)][_0x1db76b(0x305)][_0x1db76b(0x26c)];else{if(this[_0x1db76b(0x160)](_0x57b4e2))return VisuMZ[_0x1db76b(0x1fc)]['Settings'][_0x1db76b(0x305)][_0x1db76b(0x3b3)];else{if(this['isArmor'](_0x57b4e2))return VisuMZ[_0x1db76b(0x1fc)][_0x1db76b(0xb9)]['ItemScene']['MaxArmors'];}}},ColorManager['getItemColor']=function(_0x50a572){const _0x2d16a8=_0x1f1bbd;if(!_0x50a572)return this['normalColor']();else{if(_0x50a572['note'][_0x2d16a8(0x124)](/<COLOR:[ ](\d+)>/i))return this[_0x2d16a8(0x1b7)](Number(RegExp['$1'])[_0x2d16a8(0x153)](0x0,0x1f));else return _0x50a572[_0x2d16a8(0x262)][_0x2d16a8(0x124)](/<COLOR:[ ]#(.*)>/i)?'#'+String(RegExp['$1']):this[_0x2d16a8(0x34c)]();}},ColorManager[_0x1f1bbd(0x2c8)]=function(_0x396e02){const _0xbe4b1e=_0x1f1bbd;return _0x396e02=String(_0x396e02),_0x396e02[_0xbe4b1e(0x124)](/#(.*)/i)?'#%1'[_0xbe4b1e(0x2dd)](String(RegExp['$1'])):this[_0xbe4b1e(0x1b7)](Number(_0x396e02));},SceneManager[_0x1f1bbd(0x32e)]=function(){const _0xec27f4=_0x1f1bbd;return this[_0xec27f4(0x23e)]&&this[_0xec27f4(0x23e)][_0xec27f4(0x6e)]===Scene_Shop;},Game_Temp[_0x1f1bbd(0x187)]['newLabelEnabled']=function(){const _0x27b826=_0x1f1bbd;if(this['_bypassNewLabel'])return![];return VisuMZ[_0x27b826(0x1fc)]['Settings']['New'][_0x27b826(0x10d)];},VisuMZ[_0x1f1bbd(0x13e)]=VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0xb9)]['StatusWindow']['MultiplierStandard'],VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x188)]=Game_BattlerBase[_0x1f1bbd(0x187)][_0x1f1bbd(0x2ea)],Game_BattlerBase[_0x1f1bbd(0x187)][_0x1f1bbd(0x2ea)]=function(_0x2aed8f){const _0x4e4b7d=_0x1f1bbd;return this['_shopStatusMenuMode']?this[_0x4e4b7d(0xe6)]?VisuMZ[_0x4e4b7d(0x13e)]:0x1:VisuMZ[_0x4e4b7d(0x1fc)][_0x4e4b7d(0x188)]['call'](this,_0x2aed8f);},VisuMZ['ItemsEquipsCore'][_0x1f1bbd(0x7e)]=Game_BattlerBase[_0x1f1bbd(0x187)]['meetsItemConditions'],Game_BattlerBase['prototype'][_0x1f1bbd(0xbc)]=function(_0x286c93){const _0x3599de=_0x1f1bbd;if(!_0x286c93)return![];if(!VisuMZ[_0x3599de(0x1fc)][_0x3599de(0x7e)]['call'](this,_0x286c93))return![];if(!this[_0x3599de(0xb5)](_0x286c93))return![];if(!this['meetsItemConditionsJS'](_0x286c93))return![];return!![];},Game_BattlerBase[_0x1f1bbd(0x187)][_0x1f1bbd(0xb5)]=function(_0x4a989e){const _0x3fb8c6=_0x1f1bbd;if(!this[_0x3fb8c6(0xdd)](_0x4a989e))return![];return!![];},Game_BattlerBase[_0x1f1bbd(0x187)][_0x1f1bbd(0xdd)]=function(_0x31cf9b){const _0x2c7209=_0x1f1bbd,_0x4542f7=_0x31cf9b[_0x2c7209(0x262)];if(_0x4542f7['match'](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1bb0f2=JSON['parse']('['+RegExp['$1'][_0x2c7209(0x124)](/\d+/g)+']');for(const _0x30ea44 of _0x1bb0f2){if(!$gameSwitches[_0x2c7209(0x29f)](_0x30ea44))return![];}return!![];}if(_0x4542f7[_0x2c7209(0x124)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5e24d5=JSON[_0x2c7209(0x38d)]('['+RegExp['$1'][_0x2c7209(0x124)](/\d+/g)+']');for(const _0x33b66f of _0x5e24d5){if(!$gameSwitches['value'](_0x33b66f))return![];}return!![];}if(_0x4542f7[_0x2c7209(0x124)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x13c534=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x254b5c of _0x13c534){if($gameSwitches[_0x2c7209(0x29f)](_0x254b5c))return!![];}return![];}if(_0x4542f7[_0x2c7209(0x124)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3a4cc7=JSON[_0x2c7209(0x38d)]('['+RegExp['$1'][_0x2c7209(0x124)](/\d+/g)+']');for(const _0x4adaa7 of _0x3a4cc7){if(!$gameSwitches[_0x2c7209(0x29f)](_0x4adaa7))return!![];}return![];}if(_0x4542f7[_0x2c7209(0x124)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x56ab72=JSON[_0x2c7209(0x38d)]('['+RegExp['$1'][_0x2c7209(0x124)](/\d+/g)+']');for(const _0x2e9fd4 of _0x56ab72){if(!$gameSwitches['value'](_0x2e9fd4))return!![];}return![];}if(_0x4542f7[_0x2c7209(0x124)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4c0024=JSON[_0x2c7209(0x38d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x258f90 of _0x4c0024){if($gameSwitches[_0x2c7209(0x29f)](_0x258f90))return![];}return!![];}return!![];},Game_BattlerBase[_0x1f1bbd(0x187)][_0x1f1bbd(0x105)]=function(_0x2d8f98){const _0xf58b47=_0x1f1bbd,_0x2e610a=_0x2d8f98[_0xf58b47(0x262)],_0x5f4e13=VisuMZ[_0xf58b47(0x1fc)]['itemEnableJS'];return _0x5f4e13[_0x2d8f98['id']]?_0x5f4e13[_0x2d8f98['id']][_0xf58b47(0x358)](this,_0x2d8f98):!![];},Game_Actor[_0x1f1bbd(0x187)][_0x1f1bbd(0xd4)]=function(_0x390317){const _0x54f301=_0x1f1bbd;_0x390317=this[_0x54f301(0x10b)](_0x390317);const _0x291442=this[_0x54f301(0x220)]();this[_0x54f301(0x3b6)]=[];for(let _0x269cb1=0x0;_0x269cb1<_0x291442[_0x54f301(0x2f0)];_0x269cb1++){this[_0x54f301(0x3b6)][_0x269cb1]=new Game_Item();}for(let _0x484029=0x0;_0x484029<_0x291442[_0x54f301(0x2f0)];_0x484029++){const _0x29735a=_0x291442[_0x484029],_0x264c7d=this[_0x54f301(0x1c9)](_0x390317,_0x29735a);if(this[_0x54f301(0x191)](_0x264c7d))this[_0x54f301(0x3b6)][_0x484029][_0x54f301(0x1f9)](_0x264c7d);}this[_0x54f301(0x271)](!![]),this['refresh']();},Game_Actor['prototype'][_0x1f1bbd(0x10b)]=function(_0x1d47fc){const _0x29f402=_0x1f1bbd,_0x56d724=[];for(let _0x4d5fae=0x0;_0x4d5fae<_0x1d47fc[_0x29f402(0x2f0)];_0x4d5fae++){const _0x344dbb=_0x1d47fc[_0x4d5fae];if(_0x344dbb<=0x0)continue;const _0x2faea5=$dataSystem[_0x29f402(0x211)][_0x4d5fae+0x1];if(_0x2faea5===$dataSystem[_0x29f402(0x211)][0x1]||_0x4d5fae===0x1&&this['isDualWield']())_0x56d724[_0x29f402(0x1c0)]($dataWeapons[_0x344dbb]);else{if(BattleManager[_0x29f402(0xa7)]()){const _0x1178bb=$dataArmors[_0x344dbb];_0x1178bb[_0x29f402(0x9d)]===_0x4d5fae+0x1&&_0x56d724['push'](_0x1178bb);}else _0x56d724[_0x29f402(0x1c0)]($dataArmors[_0x344dbb]);}}return _0x56d724;},Game_Actor[_0x1f1bbd(0x187)][_0x1f1bbd(0x1c9)]=function(_0x47365e,_0x56698a){const _0x328a66=_0x1f1bbd;for(const _0x19654d of _0x47365e){if(!_0x19654d)continue;if(_0x19654d[_0x328a66(0x9d)]===_0x56698a)return _0x47365e[_0x328a66(0xbf)](_0x47365e[_0x328a66(0x9b)](_0x19654d),0x1),_0x19654d;}return null;},Game_Actor[_0x1f1bbd(0x187)][_0x1f1bbd(0x220)]=function(){const _0xdc8756=_0x1f1bbd,_0x45d532=JsonEx['makeDeepCopy'](this[_0xdc8756(0x198)]||this[_0xdc8756(0x2ff)]()[_0xdc8756(0x220)]);if(_0x45d532[_0xdc8756(0x2f0)]>=0x2&&this[_0xdc8756(0x29c)]())_0x45d532[0x1]=0x1;return _0x45d532;},Game_Actor[_0x1f1bbd(0x187)][_0x1f1bbd(0x148)]=function(_0x5358f3){const _0x1f45a2=_0x1f1bbd;_0x5358f3[_0x1f45a2(0x12a)](0x0),_0x5358f3[_0x1f45a2(0x12a)](-0x1),this['_forcedSlots']=_0x5358f3,this[_0x1f45a2(0x16c)]();},Game_Actor[_0x1f1bbd(0x187)]['forceResetEquipSlots']=function(){const _0x4f7bdd=_0x1f1bbd;this[_0x4f7bdd(0x198)]=undefined,this[_0x4f7bdd(0x16c)]();},Game_Actor[_0x1f1bbd(0x187)]['prepareNewEquipSlotsOnLoad']=function(){const _0x1a1b3e=_0x1f1bbd,_0x29fcb1=this[_0x1a1b3e(0x220)]();for(let _0x4b9b5c=0x0;_0x4b9b5c<_0x29fcb1[_0x1a1b3e(0x2f0)];_0x4b9b5c++){if(!this[_0x1a1b3e(0x3b6)][_0x4b9b5c])this[_0x1a1b3e(0x3b6)][_0x4b9b5c]=new Game_Item();}this[_0x1a1b3e(0x271)](![]),this['refresh']();},VisuMZ['ItemsEquipsCore'][_0x1f1bbd(0xec)]=Game_Actor[_0x1f1bbd(0x187)][_0x1f1bbd(0x167)],Game_Actor[_0x1f1bbd(0x187)][_0x1f1bbd(0x167)]=function(_0x48ee02,_0x147ea3){const _0x5166ad=_0x1f1bbd;if(!this['_tempActor']){const _0x309e1e=JsonEx['makeDeepCopy'](this);_0x309e1e[_0x5166ad(0x1a7)]=!![],VisuMZ[_0x5166ad(0x1fc)][_0x5166ad(0xec)][_0x5166ad(0x358)](this,_0x48ee02,_0x147ea3),this[_0x5166ad(0x378)](_0x309e1e);}else VisuMZ[_0x5166ad(0x1fc)][_0x5166ad(0xec)]['call'](this,_0x48ee02,_0x147ea3);},VisuMZ['ItemsEquipsCore']['Game_Actor_forceChangeEquip']=Game_Actor['prototype'][_0x1f1bbd(0x355)],Game_Actor[_0x1f1bbd(0x187)]['forceChangeEquip']=function(_0x8b45b5,_0x53e141){const _0x3f4cff=_0x1f1bbd;if(!this[_0x3f4cff(0x1a7)]){const _0x30b3f0=JsonEx['makeDeepCopy'](this);_0x30b3f0[_0x3f4cff(0x1a7)]=!![],VisuMZ[_0x3f4cff(0x1fc)][_0x3f4cff(0x34a)][_0x3f4cff(0x358)](this,_0x8b45b5,_0x53e141),this[_0x3f4cff(0x378)](_0x30b3f0);}else VisuMZ['ItemsEquipsCore'][_0x3f4cff(0x34a)]['call'](this,_0x8b45b5,_0x53e141);},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x297)]=Game_Actor['prototype']['discardEquip'],Game_Actor['prototype'][_0x1f1bbd(0x31d)]=function(_0x2ecb56){const _0x49c4c9=_0x1f1bbd;if(!this[_0x49c4c9(0x1a7)]){const _0x212419=JsonEx['makeDeepCopy'](this);_0x212419[_0x49c4c9(0x1a7)]=!![],VisuMZ['ItemsEquipsCore'][_0x49c4c9(0x297)][_0x49c4c9(0x358)](this,_0x2ecb56),this[_0x49c4c9(0x378)](_0x212419);}else VisuMZ[_0x49c4c9(0x1fc)][_0x49c4c9(0x297)]['call'](this,_0x2ecb56);},Game_Actor['prototype'][_0x1f1bbd(0x271)]=function(_0x5a6c4c){const _0x3f8ff2=_0x1f1bbd;for(;;){const _0x2dd5b9=this[_0x3f8ff2(0x220)](),_0x2547d3=this[_0x3f8ff2(0x106)](),_0x5a71a4=_0x2547d3[_0x3f8ff2(0x2f0)];let _0x215866=![];for(let _0x123cae=0x0;_0x123cae<_0x5a71a4;_0x123cae++){const _0x21774c=_0x2547d3[_0x123cae];if(_0x21774c&&(!this['canEquip'](_0x21774c)||_0x21774c[_0x3f8ff2(0x9d)]!==_0x2dd5b9[_0x123cae])){!_0x5a6c4c&&this['tradeItemWithParty'](null,_0x21774c);if(!this['_tempActor']){const _0x383833=JsonEx[_0x3f8ff2(0x1f4)](this);_0x383833[_0x3f8ff2(0x1a7)]=!![],this[_0x3f8ff2(0x3b6)][_0x123cae][_0x3f8ff2(0x1f9)](null),this['equipAdjustHpMp'](_0x383833);}else this[_0x3f8ff2(0x3b6)][_0x123cae]['setObject'](null);_0x215866=!![];}}if(!_0x215866)break;}},Game_Actor[_0x1f1bbd(0x187)][_0x1f1bbd(0x378)]=function(_0x4bf0bf){const _0x2f04d3=_0x1f1bbd;if(this[_0x2f04d3(0x1a7)])return;if(!VisuMZ[_0x2f04d3(0x1fc)][_0x2f04d3(0xb9)][_0x2f04d3(0x1ec)][_0x2f04d3(0x1d8)])return;const _0xc9bae3=Math[_0x2f04d3(0x112)](_0x4bf0bf[_0x2f04d3(0x2a7)]()*this['mhp']),_0x392555=Math['round'](_0x4bf0bf[_0x2f04d3(0x141)]()*this['mmp']);if(this['hp']>0x0)this[_0x2f04d3(0x1ba)](_0xc9bae3);if(this['mp']>0x0)this[_0x2f04d3(0x351)](_0x392555);},Game_Actor[_0x1f1bbd(0x187)][_0x1f1bbd(0x3b4)]=function(){const _0x24f822=_0x1f1bbd,_0xed8bb=this[_0x24f822(0x220)]()[_0x24f822(0x2f0)];for(let _0x2bedb9=0x0;_0x2bedb9<_0xed8bb;_0x2bedb9++){if(this[_0x24f822(0x2d8)](_0x2bedb9))this[_0x24f822(0x167)](_0x2bedb9,null);}},Game_Actor[_0x1f1bbd(0x187)]['isClearEquipOk']=function(_0x6230cf){const _0x5a9c37=_0x1f1bbd;return this[_0x5a9c37(0x96)]()[_0x5a9c37(0x1a9)](this[_0x5a9c37(0x220)]()[_0x6230cf])?![]:this[_0x5a9c37(0x2c1)](_0x6230cf);},Game_Actor[_0x1f1bbd(0x187)][_0x1f1bbd(0x96)]=function(){const _0x44e763=_0x1f1bbd;return VisuMZ[_0x44e763(0x1fc)]['Settings'][_0x44e763(0x1ec)][_0x44e763(0x3c3)];},Game_Actor[_0x1f1bbd(0x187)][_0x1f1bbd(0xba)]=function(){const _0xa48790=_0x1f1bbd,_0x233bee=this[_0xa48790(0x220)]()['length'];for(let _0x50b587=0x0;_0x50b587<_0x233bee;_0x50b587++){if(this[_0xa48790(0x1a2)](_0x50b587))this[_0xa48790(0x167)](_0x50b587,null);}for(let _0x3af1d2=0x0;_0x3af1d2<_0x233bee;_0x3af1d2++){if(this[_0xa48790(0x1a2)](_0x3af1d2))this['changeEquip'](_0x3af1d2,this[_0xa48790(0x394)](_0x3af1d2));}},Game_Actor['prototype'][_0x1f1bbd(0x1a2)]=function(_0x52ca56){const _0x37844b=_0x1f1bbd;return this[_0x37844b(0x281)]()[_0x37844b(0x1a9)](this[_0x37844b(0x220)]()[_0x52ca56])?![]:this[_0x37844b(0x2c1)](_0x52ca56);},Game_Actor[_0x1f1bbd(0x187)][_0x1f1bbd(0x281)]=function(){const _0xee7ade=_0x1f1bbd;return VisuMZ[_0xee7ade(0x1fc)][_0xee7ade(0xb9)][_0xee7ade(0x1ec)]['NonOptimizeETypes'];},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x1af)]=Game_Actor['prototype']['tradeItemWithParty'],Game_Actor[_0x1f1bbd(0x187)][_0x1f1bbd(0x2e1)]=function(_0x4ff577,_0x3fafd4){const _0x457684=_0x1f1bbd;if(this[_0x457684(0x1a7)])return![];$gameTemp['_bypassNewLabel']=!![];const _0x7af837=VisuMZ['ItemsEquipsCore'][_0x457684(0x1af)][_0x457684(0x358)](this,_0x4ff577,_0x3fafd4);return $gameTemp['_bypassNewLabel']=![],_0x7af837;},Game_Actor[_0x1f1bbd(0x187)]['changeEquipById']=function(_0xeb5629,_0x86b773){const _0x1cd263=_0x1f1bbd,_0x150a53=this[_0x1cd263(0x2fa)](_0xeb5629);if(_0x150a53<0x0)return;const _0x5053f5=_0xeb5629===0x1?$dataWeapons[_0x86b773]:$dataArmors[_0x86b773];this[_0x1cd263(0x167)](_0x150a53,_0x5053f5);},Game_Actor[_0x1f1bbd(0x187)][_0x1f1bbd(0x2fa)]=function(_0x391f8d){const _0x3c13d5=_0x1f1bbd;let _0x1ad75e=0x0;const _0x54d06c=this['equipSlots'](),_0x4eebde=this[_0x3c13d5(0x106)]();for(let _0x221bc9=0x0;_0x221bc9<_0x54d06c['length'];_0x221bc9++){if(_0x54d06c[_0x221bc9]===_0x391f8d){_0x1ad75e=_0x221bc9;if(!_0x4eebde[_0x221bc9])return _0x1ad75e;}}return _0x1ad75e;},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x3c0)]=Game_Actor[_0x1f1bbd(0x187)][_0x1f1bbd(0x129)],Game_Actor[_0x1f1bbd(0x187)][_0x1f1bbd(0x129)]=function(_0xcdbdf0){const _0x160bbe=_0x1f1bbd;let _0x116a9c=VisuMZ[_0x160bbe(0x1fc)][_0x160bbe(0x3c0)][_0x160bbe(0x358)](this,_0xcdbdf0);for(const _0x484fc7 of this[_0x160bbe(0x106)]()){if(_0x484fc7)_0x116a9c+=this[_0x160bbe(0x1d0)](_0x484fc7,_0xcdbdf0);}return _0x116a9c;},Game_Actor[_0x1f1bbd(0x187)][_0x1f1bbd(0x1d0)]=function(_0x13676e,_0x2c7272){const _0x12f9db=_0x1f1bbd;if(this['_calculatingJSParameters'])return 0x0;const _0x1b6df2=(DataManager[_0x12f9db(0x160)](_0x13676e)?'W%1':_0x12f9db(0x77))[_0x12f9db(0x2dd)](_0x13676e['id']),_0x13a00f=_0x12f9db(0x258)[_0x12f9db(0x2dd)](_0x1b6df2,_0x2c7272);if(VisuMZ[_0x12f9db(0x1fc)][_0x12f9db(0x137)][_0x13a00f]){this['_calculatingJSParameters']=!![];const _0x1256c6=VisuMZ[_0x12f9db(0x1fc)][_0x12f9db(0x137)][_0x13a00f][_0x12f9db(0x358)](this,_0x13676e,_0x2c7272);return this[_0x12f9db(0x2bf)]=![],_0x1256c6;}else return 0x0;},Game_Actor[_0x1f1bbd(0x187)][_0x1f1bbd(0x3a7)]=function(_0x4f7fa4){this['_shopStatusMenuMode']=!![],this['_shopStatusMenuAlly']=_0x4f7fa4;},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x101)]=Game_Party['prototype']['initialize'],Game_Party[_0x1f1bbd(0x187)][_0x1f1bbd(0x1ea)]=function(){const _0x4ac8d3=_0x1f1bbd;VisuMZ['ItemsEquipsCore'][_0x4ac8d3(0x101)][_0x4ac8d3(0x358)](this),this['initNewItemsList']();},Game_Party[_0x1f1bbd(0x187)][_0x1f1bbd(0x294)]=function(){const _0xad2555=_0x1f1bbd;this[_0xad2555(0xfa)]=[];},Game_Party[_0x1f1bbd(0x187)][_0x1f1bbd(0x119)]=function(_0x415c94){const _0x2e0b35=_0x1f1bbd;if(!$gameTemp[_0x2e0b35(0x189)]())return![];if(this['_newItemsList']===undefined)this[_0x2e0b35(0x294)]();let _0x39fb75='';if(DataManager[_0x2e0b35(0x1ce)](_0x415c94))_0x39fb75=_0x2e0b35(0x2ed)[_0x2e0b35(0x2dd)](_0x415c94['id']);else{if(DataManager[_0x2e0b35(0x160)](_0x415c94))_0x39fb75=_0x2e0b35(0x1ee)['format'](_0x415c94['id']);else{if(DataManager[_0x2e0b35(0x174)](_0x415c94))_0x39fb75='armor-%1'['format'](_0x415c94['id']);else return;}}return this['_newItemsList']['includes'](_0x39fb75);},Game_Party[_0x1f1bbd(0x187)]['setNewItem']=function(_0x5f5c9){const _0x42a755=_0x1f1bbd;if(!$gameTemp[_0x42a755(0x189)]())return;if(this['_newItemsList']===undefined)this[_0x42a755(0x294)]();let _0x48b73c='';if(DataManager[_0x42a755(0x1ce)](_0x5f5c9))_0x48b73c='item-%1'['format'](_0x5f5c9['id']);else{if(DataManager[_0x42a755(0x160)](_0x5f5c9))_0x48b73c=_0x42a755(0x1ee)[_0x42a755(0x2dd)](_0x5f5c9['id']);else{if(DataManager[_0x42a755(0x174)](_0x5f5c9))_0x48b73c=_0x42a755(0x1a3)['format'](_0x5f5c9['id']);else return;}}if(!this['_newItemsList'][_0x42a755(0x1a9)](_0x48b73c))this['_newItemsList'][_0x42a755(0x1c0)](_0x48b73c);},Game_Party[_0x1f1bbd(0x187)][_0x1f1bbd(0x215)]=function(_0x3d2a3d){const _0xb8f0d5=_0x1f1bbd;if(!$gameTemp['newLabelEnabled']())return;if(this[_0xb8f0d5(0xfa)]===undefined)this['initNewItemsList']();let _0x3e0184='';if(DataManager[_0xb8f0d5(0x1ce)](_0x3d2a3d))_0x3e0184=_0xb8f0d5(0x2ed)['format'](_0x3d2a3d['id']);else{if(DataManager[_0xb8f0d5(0x160)](_0x3d2a3d))_0x3e0184=_0xb8f0d5(0x1ee)['format'](_0x3d2a3d['id']);else{if(DataManager['isArmor'](_0x3d2a3d))_0x3e0184=_0xb8f0d5(0x1a3)[_0xb8f0d5(0x2dd)](_0x3d2a3d['id']);else return;}}this[_0xb8f0d5(0xfa)][_0xb8f0d5(0x1a9)](_0x3e0184)&&this[_0xb8f0d5(0xfa)][_0xb8f0d5(0xbf)](this[_0xb8f0d5(0xfa)][_0xb8f0d5(0x9b)](_0x3e0184),0x1);},VisuMZ['ItemsEquipsCore'][_0x1f1bbd(0x152)]=Game_Party[_0x1f1bbd(0x187)][_0x1f1bbd(0x3b9)],Game_Party[_0x1f1bbd(0x187)]['gainItem']=function(_0x1a428f,_0x2341b7,_0x43e69c){const _0x3ef572=_0x1f1bbd,_0x3f6aee=this[_0x3ef572(0xa9)](_0x1a428f);VisuMZ[_0x3ef572(0x1fc)][_0x3ef572(0x152)][_0x3ef572(0x358)](this,_0x1a428f,_0x2341b7,_0x43e69c);if(this['numItems'](_0x1a428f)>_0x3f6aee)this[_0x3ef572(0x177)](_0x1a428f);},Game_Party[_0x1f1bbd(0x187)][_0x1f1bbd(0x1c4)]=function(_0x285787){return DataManager['maxItemAmount'](_0x285787);},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0xdc)]=Scene_ItemBase[_0x1f1bbd(0x187)][_0x1f1bbd(0x127)],Scene_ItemBase['prototype']['activateItemWindow']=function(){const _0x50d056=_0x1f1bbd;VisuMZ[_0x50d056(0x1fc)]['Scene_ItemBase_activateItemWindow'][_0x50d056(0x358)](this),this[_0x50d056(0x38c)][_0x50d056(0x28b)]();},Scene_Item[_0x1f1bbd(0x187)][_0x1f1bbd(0x168)]=function(){const _0x52ba2b=_0x1f1bbd;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x52ba2b(0x7f)]!==undefined)return ConfigManager[_0x52ba2b(0x7f)];else{if(this[_0x52ba2b(0x104)]())return this['updatedLayoutStyle']()['match'](/LOWER/i);else Scene_ItemBase[_0x52ba2b(0x187)][_0x52ba2b(0x1db)]['call'](this);}},Scene_Item[_0x1f1bbd(0x187)][_0x1f1bbd(0x1db)]=function(){const _0x930afa=_0x1f1bbd;if(ConfigManager[_0x930afa(0x18e)]&&ConfigManager[_0x930afa(0x1a0)]!==undefined)return ConfigManager[_0x930afa(0x1a0)];else{if(this[_0x930afa(0x104)]())return this[_0x930afa(0x318)]()['match'](/RIGHT/i);else Scene_ItemBase[_0x930afa(0x187)]['isRightInputMode']['call'](this);}},Scene_Item[_0x1f1bbd(0x187)]['updatedLayoutStyle']=function(){const _0x3dbdc5=_0x1f1bbd;return VisuMZ['ItemsEquipsCore'][_0x3dbdc5(0xb9)][_0x3dbdc5(0x305)][_0x3dbdc5(0x1cc)];},Scene_Item[_0x1f1bbd(0x187)]['isUseModernControls']=function(){const _0x15bda0=_0x1f1bbd;return this[_0x15bda0(0xeb)]&&this['_categoryWindow'][_0x15bda0(0x2c3)]();},Scene_Item[_0x1f1bbd(0x187)][_0x1f1bbd(0x104)]=function(){const _0x536c7c=_0x1f1bbd;return VisuMZ[_0x536c7c(0x1fc)][_0x536c7c(0xb9)][_0x536c7c(0x305)][_0x536c7c(0x38e)];},VisuMZ['ItemsEquipsCore'][_0x1f1bbd(0x126)]=Scene_Item[_0x1f1bbd(0x187)]['create'],Scene_Item[_0x1f1bbd(0x187)][_0x1f1bbd(0x218)]=function(){const _0xf6b188=_0x1f1bbd;VisuMZ[_0xf6b188(0x1fc)][_0xf6b188(0x126)][_0xf6b188(0x358)](this),this['isUseModernControls']()&&this[_0xf6b188(0x381)]();},Scene_Item['prototype'][_0x1f1bbd(0x317)]=function(){const _0x5a22da=_0x1f1bbd;return this[_0x5a22da(0x104)]()?this[_0x5a22da(0x25f)]():Scene_ItemBase[_0x5a22da(0x187)]['helpWindowRect'][_0x5a22da(0x358)](this);},Scene_Item['prototype']['helpWindowRectItemsEquipsCore']=function(){const _0x5d5931=0x0,_0xb8fe17=this['helpAreaTop'](),_0x615785=Graphics['boxWidth'],_0x4edab2=this['helpAreaHeight']();return new Rectangle(_0x5d5931,_0xb8fe17,_0x615785,_0x4edab2);},VisuMZ['ItemsEquipsCore']['Scene_Item_createCategoryWindow']=Scene_Item['prototype'][_0x1f1bbd(0x313)],Scene_Item[_0x1f1bbd(0x187)]['createCategoryWindow']=function(){const _0xcb60e3=_0x1f1bbd;VisuMZ['ItemsEquipsCore'][_0xcb60e3(0x183)][_0xcb60e3(0x358)](this),this[_0xcb60e3(0x2c3)]()&&this[_0xcb60e3(0x113)]();},Scene_Item[_0x1f1bbd(0x187)][_0x1f1bbd(0x113)]=function(){const _0x11f786=_0x1f1bbd;delete this[_0x11f786(0xeb)]['_handlers']['ok'],delete this[_0x11f786(0xeb)]['_handlers'][_0x11f786(0x2a3)];},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x64)]=Scene_Item[_0x1f1bbd(0x187)][_0x1f1bbd(0x145)],Scene_Item['prototype'][_0x1f1bbd(0x145)]=function(){const _0x369a9e=_0x1f1bbd;return this[_0x369a9e(0x104)]()?this[_0x369a9e(0x7b)]():VisuMZ['ItemsEquipsCore'][_0x369a9e(0x64)]['call'](this);},Scene_Item[_0x1f1bbd(0x187)][_0x1f1bbd(0x7b)]=function(){const _0x352600=_0x1f1bbd,_0x53f882=0x0,_0x32125f=this[_0x352600(0x1f0)](),_0x267d46=Graphics[_0x352600(0x3a3)],_0x326520=this[_0x352600(0x290)](0x1,!![]);return new Rectangle(_0x53f882,_0x32125f,_0x267d46,_0x326520);},VisuMZ[_0x1f1bbd(0x1fc)]['Scene_Item_createItemWindow']=Scene_Item[_0x1f1bbd(0x187)][_0x1f1bbd(0x36f)],Scene_Item['prototype'][_0x1f1bbd(0x36f)]=function(){const _0x116985=_0x1f1bbd;VisuMZ[_0x116985(0x1fc)][_0x116985(0x2f3)][_0x116985(0x358)](this),this[_0x116985(0x2c3)]()&&this['postCreateItemWindowModernControls'](),this[_0x116985(0x2a9)]()&&this[_0x116985(0x2d9)]();},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0xf0)]=Scene_Item[_0x1f1bbd(0x187)][_0x1f1bbd(0xfd)],Scene_Item[_0x1f1bbd(0x187)][_0x1f1bbd(0xfd)]=function(){const _0x128988=_0x1f1bbd;if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x128988(0x30f)]();else{const _0x22cd32=VisuMZ[_0x128988(0x1fc)]['Scene_Item_itemWindowRect'][_0x128988(0x358)](this);return this['allowCreateStatusWindow']()&&this[_0x128988(0x253)]()&&(_0x22cd32['width']-=this[_0x128988(0x349)]()),_0x22cd32;}},Scene_Item[_0x1f1bbd(0x187)][_0x1f1bbd(0x30f)]=function(){const _0x4db087=_0x1f1bbd,_0x3173eb=this[_0x4db087(0x1db)]()?this[_0x4db087(0x349)]():0x0,_0x3e5673=this[_0x4db087(0xeb)]['y']+this[_0x4db087(0xeb)][_0x4db087(0x1d6)],_0x3e848e=Graphics[_0x4db087(0x3a3)]-this['statusWidth'](),_0x5acf8a=this[_0x4db087(0x3ac)]()-_0x3e5673;return new Rectangle(_0x3173eb,_0x3e5673,_0x3e848e,_0x5acf8a);},Scene_Item[_0x1f1bbd(0x187)][_0x1f1bbd(0xac)]=function(){const _0x3fbf78=_0x1f1bbd;this[_0x3fbf78(0x38c)][_0x3fbf78(0x39d)](_0x3fbf78(0x2a3),this[_0x3fbf78(0x195)]['bind'](this));},Scene_Item[_0x1f1bbd(0x187)][_0x1f1bbd(0x2a9)]=function(){const _0x25cb6e=_0x1f1bbd;return this['isUseItemsEquipsCoreUpdatedLayout']()?!![]:VisuMZ['ItemsEquipsCore'][_0x25cb6e(0xb9)][_0x25cb6e(0x305)][_0x25cb6e(0x2c6)];},Scene_Item['prototype'][_0x1f1bbd(0x253)]=function(){const _0x15eea7=_0x1f1bbd;return VisuMZ['ItemsEquipsCore'][_0x15eea7(0xb9)][_0x15eea7(0x305)][_0x15eea7(0x107)];},Scene_Item[_0x1f1bbd(0x187)][_0x1f1bbd(0x2d9)]=function(){const _0x7e7cfd=_0x1f1bbd,_0xe7ed0a=this[_0x7e7cfd(0x260)]();this['_statusWindow']=new Window_ShopStatus(_0xe7ed0a),this[_0x7e7cfd(0x235)](this['_statusWindow']),this[_0x7e7cfd(0x38c)]['setStatusWindow'](this[_0x7e7cfd(0xf5)]);const _0x5dc3f0=VisuMZ[_0x7e7cfd(0x1fc)][_0x7e7cfd(0xb9)]['ItemScene']['ItemMenuStatusBgType'];this[_0x7e7cfd(0xf5)][_0x7e7cfd(0x182)](_0x5dc3f0||0x0);},Scene_Item[_0x1f1bbd(0x187)]['statusWindowRect']=function(){const _0x3cce4a=_0x1f1bbd;return this[_0x3cce4a(0x104)]()?this[_0x3cce4a(0x31f)]():VisuMZ['ItemsEquipsCore'][_0x3cce4a(0xb9)][_0x3cce4a(0x305)][_0x3cce4a(0x329)][_0x3cce4a(0x358)](this);},Scene_Item[_0x1f1bbd(0x187)][_0x1f1bbd(0x31f)]=function(){const _0x108f83=_0x1f1bbd,_0x5d9d4c=this['statusWidth'](),_0x357a12=this[_0x108f83(0x38c)][_0x108f83(0x1d6)],_0x1aad53=this['isRightInputMode']()?0x0:Graphics['boxWidth']-this[_0x108f83(0x349)](),_0x302608=this[_0x108f83(0x38c)]['y'];return new Rectangle(_0x1aad53,_0x302608,_0x5d9d4c,_0x357a12);},Scene_Item[_0x1f1bbd(0x187)][_0x1f1bbd(0x349)]=function(){return Scene_Shop['prototype']['statusWidth']();},Scene_Item['prototype'][_0x1f1bbd(0x331)]=function(){const _0x2585b0=_0x1f1bbd;if(!this[_0x2585b0(0x318)]())return![];if(!this[_0x2585b0(0x2c3)]())return![];if(!this[_0x2585b0(0x38c)])return![];if(!this[_0x2585b0(0x38c)][_0x2585b0(0x82)])return![];return this[_0x2585b0(0x318)]()&&this[_0x2585b0(0x2c3)]();},Scene_Item['prototype']['buttonAssistKey1']=function(){const _0x520140=_0x1f1bbd;if(this[_0x520140(0x331)]())return this[_0x520140(0x38c)][_0x520140(0x298)]()===0x1?TextManager[_0x520140(0x23f)](_0x520140(0x214),_0x520140(0x20c)):TextManager[_0x520140(0x23f)](_0x520140(0x38a),'pagedown');return Scene_ItemBase[_0x520140(0x187)][_0x520140(0x3ab)][_0x520140(0x358)](this);},Scene_Item[_0x1f1bbd(0x187)][_0x1f1bbd(0x26a)]=function(){const _0x23743d=_0x1f1bbd;if(this['buttonAssistItemListRequirement']())return VisuMZ[_0x23743d(0x1fc)][_0x23743d(0xb9)][_0x23743d(0x305)][_0x23743d(0x2a1)];return Scene_ItemBase[_0x23743d(0x187)]['buttonAssistText1'][_0x23743d(0x358)](this);},Scene_Equip[_0x1f1bbd(0x187)][_0x1f1bbd(0x168)]=function(){const _0x59d6aa=_0x1f1bbd;if(ConfigManager[_0x59d6aa(0x18e)]&&ConfigManager[_0x59d6aa(0x7f)]!==undefined)return ConfigManager[_0x59d6aa(0x7f)];else{if(this[_0x59d6aa(0x104)]())return this[_0x59d6aa(0x318)]()[_0x59d6aa(0x124)](/LOWER/i);else Scene_MenuBase[_0x59d6aa(0x187)][_0x59d6aa(0x1db)][_0x59d6aa(0x358)](this);}},Scene_Equip['prototype'][_0x1f1bbd(0x1db)]=function(){const _0x2158b9=_0x1f1bbd;if(ConfigManager[_0x2158b9(0x18e)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x2158b9(0x1a0)];else{if(this[_0x2158b9(0x104)]())return this[_0x2158b9(0x318)]()[_0x2158b9(0x124)](/RIGHT/i);else Scene_MenuBase[_0x2158b9(0x187)][_0x2158b9(0x1db)][_0x2158b9(0x358)](this);}},Scene_Equip[_0x1f1bbd(0x187)][_0x1f1bbd(0x318)]=function(){const _0x3d40f=_0x1f1bbd;return VisuMZ[_0x3d40f(0x1fc)][_0x3d40f(0xb9)][_0x3d40f(0x1ec)][_0x3d40f(0x1cc)];},Scene_Equip['prototype'][_0x1f1bbd(0x2c3)]=function(){const _0x24e7dc=_0x1f1bbd;return this['_commandWindow']&&this[_0x24e7dc(0x159)][_0x24e7dc(0x2c3)]();},Scene_Equip[_0x1f1bbd(0x187)][_0x1f1bbd(0x104)]=function(){const _0x2e3c05=_0x1f1bbd;return VisuMZ['ItemsEquipsCore'][_0x2e3c05(0xb9)][_0x2e3c05(0x1ec)]['EnableLayout'];},VisuMZ['ItemsEquipsCore']['Scene_Equip_create']=Scene_Equip[_0x1f1bbd(0x187)][_0x1f1bbd(0x218)],Scene_Equip[_0x1f1bbd(0x187)]['create']=function(){const _0x383b7c=_0x1f1bbd;VisuMZ['ItemsEquipsCore'][_0x383b7c(0x392)][_0x383b7c(0x358)](this),this[_0x383b7c(0x2c3)]()&&this['commandEquip']();},Scene_Equip[_0x1f1bbd(0x187)][_0x1f1bbd(0x317)]=function(){const _0x11f690=_0x1f1bbd;return this[_0x11f690(0x104)]()?this[_0x11f690(0x25f)]():Scene_MenuBase['prototype']['helpWindowRect']['call'](this);},Scene_Equip[_0x1f1bbd(0x187)][_0x1f1bbd(0x25f)]=function(){const _0x3ff3f5=_0x1f1bbd,_0x1e09fe=0x0,_0x29a423=this['helpAreaTop'](),_0x3f9ea2=Graphics['boxWidth'],_0x5a3b27=this[_0x3ff3f5(0x156)]();return new Rectangle(_0x1e09fe,_0x29a423,_0x3f9ea2,_0x5a3b27);},VisuMZ['ItemsEquipsCore'][_0x1f1bbd(0x117)]=Scene_Equip['prototype'][_0x1f1bbd(0x260)],Scene_Equip[_0x1f1bbd(0x187)][_0x1f1bbd(0x260)]=function(){const _0x412916=_0x1f1bbd;return this[_0x412916(0x104)]()?this[_0x412916(0x31f)]():VisuMZ['ItemsEquipsCore']['Scene_Equip_statusWindowRect'][_0x412916(0x358)](this);},Scene_Equip[_0x1f1bbd(0x187)][_0x1f1bbd(0x31f)]=function(){const _0x472c02=_0x1f1bbd,_0x574e4a=this[_0x472c02(0x1db)]()?0x0:Graphics['boxWidth']-this[_0x472c02(0x349)](),_0x110d9a=this['mainAreaTop'](),_0x1f4d26=this[_0x472c02(0x349)](),_0x4f9bbc=this[_0x472c02(0x23b)]();return new Rectangle(_0x574e4a,_0x110d9a,_0x1f4d26,_0x4f9bbc);},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x1f1)]=Scene_Equip['prototype'][_0x1f1bbd(0x2e3)],Scene_Equip[_0x1f1bbd(0x187)][_0x1f1bbd(0x2e3)]=function(){const _0xb8253=_0x1f1bbd;return this[_0xb8253(0x104)]()?this[_0xb8253(0x80)]():VisuMZ['ItemsEquipsCore'][_0xb8253(0x1f1)]['call'](this);},Scene_Equip[_0x1f1bbd(0x187)]['shouldCommandWindowExist']=function(){const _0x13547b=_0x1f1bbd,_0x3a00d1=VisuMZ['ItemsEquipsCore'][_0x13547b(0xb9)]['EquipScene'];return _0x3a00d1['CommandAddOptimize']||_0x3a00d1[_0x13547b(0xf4)];},Scene_Equip[_0x1f1bbd(0x187)]['commandWindowRectItemsEquipsCore']=function(){const _0x352335=_0x1f1bbd,_0x2632c9=this[_0x352335(0x1e9)](),_0x7570e=this[_0x352335(0x1db)]()?this[_0x352335(0x349)]():0x0,_0x33c04b=this[_0x352335(0x1f0)](),_0x21d143=Graphics[_0x352335(0x3a3)]-this[_0x352335(0x349)](),_0x2baa02=_0x2632c9?this[_0x352335(0x290)](0x1,!![]):0x0;return new Rectangle(_0x7570e,_0x33c04b,_0x21d143,_0x2baa02);},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x31b)]=Scene_Equip['prototype'][_0x1f1bbd(0x34f)],Scene_Equip[_0x1f1bbd(0x187)][_0x1f1bbd(0x34f)]=function(){const _0x1ab8e7=_0x1f1bbd;VisuMZ[_0x1ab8e7(0x1fc)][_0x1ab8e7(0x31b)][_0x1ab8e7(0x358)](this),this['isUseModernControls']()&&this[_0x1ab8e7(0x165)]();},VisuMZ['ItemsEquipsCore']['Scene_Equip_slotWindowRect']=Scene_Equip[_0x1f1bbd(0x187)][_0x1f1bbd(0x6c)],Scene_Equip['prototype'][_0x1f1bbd(0x6c)]=function(){const _0x312ba9=_0x1f1bbd;return this[_0x312ba9(0x104)]()?this[_0x312ba9(0x396)]():VisuMZ[_0x312ba9(0x1fc)][_0x312ba9(0x32b)][_0x312ba9(0x358)](this);},Scene_Equip[_0x1f1bbd(0x187)][_0x1f1bbd(0x396)]=function(){const _0x89d787=_0x1f1bbd,_0x3c73e3=this[_0x89d787(0x2e3)](),_0x1c7654=this['isRightInputMode']()?this[_0x89d787(0x349)]():0x0,_0x339b6c=_0x3c73e3['y']+_0x3c73e3[_0x89d787(0x1d6)],_0x9e3e9b=Graphics['boxWidth']-this[_0x89d787(0x349)](),_0xd97328=this[_0x89d787(0x23b)]()-_0x3c73e3[_0x89d787(0x1d6)];return new Rectangle(_0x1c7654,_0x339b6c,_0x9e3e9b,_0xd97328);},VisuMZ['ItemsEquipsCore'][_0x1f1bbd(0x75)]=Scene_Equip[_0x1f1bbd(0x187)]['itemWindowRect'],Scene_Equip[_0x1f1bbd(0x187)][_0x1f1bbd(0xfd)]=function(){const _0x54a989=_0x1f1bbd;return this[_0x54a989(0x104)]()?this[_0x54a989(0x6c)]():VisuMZ['ItemsEquipsCore'][_0x54a989(0x75)][_0x54a989(0x358)](this);},Scene_Equip['prototype'][_0x1f1bbd(0x349)]=function(){const _0x5a9434=_0x1f1bbd;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['geUpdatedLayoutStatusWidth']():VisuMZ['ItemsEquipsCore'][_0x5a9434(0xb9)][_0x5a9434(0x1ec)][_0x5a9434(0x2d1)];},Scene_Equip[_0x1f1bbd(0x187)][_0x1f1bbd(0x226)]=function(){const _0x26a89b=_0x1f1bbd;return Math[_0x26a89b(0x1b3)](Graphics[_0x26a89b(0x3a3)]/0x2);},Scene_Equip[_0x1f1bbd(0x187)][_0x1f1bbd(0x165)]=function(){const _0x4a2899=_0x1f1bbd;this['_slotWindow'][_0x4a2899(0x39d)]('cancel',this[_0x4a2899(0x195)]['bind'](this)),this[_0x4a2899(0x15b)]['setHandler'](_0x4a2899(0x3aa),this[_0x4a2899(0x79)][_0x4a2899(0xd3)](this)),this['_slotWindow'][_0x4a2899(0x39d)]('pageup',this['previousActor']['bind'](this));},VisuMZ[_0x1f1bbd(0x1fc)]['Scene_Equip_commandEquip']=Scene_Equip[_0x1f1bbd(0x187)][_0x1f1bbd(0xde)],Scene_Equip[_0x1f1bbd(0x187)][_0x1f1bbd(0xde)]=function(){const _0x4b4e4d=_0x1f1bbd;this[_0x4b4e4d(0x2c3)]()&&(this[_0x4b4e4d(0x159)]['deselect'](),this[_0x4b4e4d(0x159)][_0x4b4e4d(0xf2)]()),VisuMZ[_0x4b4e4d(0x1fc)][_0x4b4e4d(0x1f5)][_0x4b4e4d(0x358)](this);},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x142)]=Scene_Equip[_0x1f1bbd(0x187)]['onSlotOk'],Scene_Equip[_0x1f1bbd(0x187)]['onSlotOk']=function(){const _0x5e305d=_0x1f1bbd;this[_0x5e305d(0x15b)][_0x5e305d(0x231)]()>=0x0?(VisuMZ[_0x5e305d(0x1fc)][_0x5e305d(0x142)]['call'](this),this['onSlotOkAutoSelect']()):(this[_0x5e305d(0x15b)][_0x5e305d(0x1f7)](0x0),this[_0x5e305d(0x15b)][_0x5e305d(0x339)]());},Scene_Equip[_0x1f1bbd(0x187)]['onSlotOkAutoSelect']=function(){const _0x4d4652=_0x1f1bbd;this[_0x4d4652(0x38c)]['refresh']();const _0x3fd05d=this[_0x4d4652(0x15b)]['item'](),_0x419831=this[_0x4d4652(0x38c)]['_data']['indexOf'](_0x3fd05d),_0x3721f9=Math[_0x4d4652(0x1b3)](this[_0x4d4652(0x38c)][_0x4d4652(0x19c)]()/0x2)-0x1;this[_0x4d4652(0x38c)]['smoothSelect'](_0x419831>=0x0?_0x419831:0x0),this[_0x4d4652(0x38c)][_0x4d4652(0x338)](this[_0x4d4652(0x38c)][_0x4d4652(0x231)]()-_0x3721f9);},VisuMZ['ItemsEquipsCore'][_0x1f1bbd(0x18b)]=Scene_Equip[_0x1f1bbd(0x187)][_0x1f1bbd(0x11c)],Scene_Equip[_0x1f1bbd(0x187)][_0x1f1bbd(0x11c)]=function(){const _0x2d6ced=_0x1f1bbd;VisuMZ['ItemsEquipsCore'][_0x2d6ced(0x18b)][_0x2d6ced(0x358)](this),this[_0x2d6ced(0x2c3)]()&&(this[_0x2d6ced(0x159)][_0x2d6ced(0x1f7)](0x0),this['_slotWindow'][_0x2d6ced(0xf2)]());},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x28e)]=Scene_Equip[_0x1f1bbd(0x187)][_0x1f1bbd(0x306)],Scene_Equip['prototype'][_0x1f1bbd(0x306)]=function(){const _0x5a38d6=_0x1f1bbd;VisuMZ[_0x5a38d6(0x1fc)][_0x5a38d6(0x28e)][_0x5a38d6(0x358)](this),this['isUseModernControls']()&&(this[_0x5a38d6(0x159)][_0x5a38d6(0xf2)](),this[_0x5a38d6(0x159)][_0x5a38d6(0x1f2)](),this[_0x5a38d6(0x15b)][_0x5a38d6(0x1f7)](0x0),this[_0x5a38d6(0x15b)][_0x5a38d6(0x339)]());},Scene_Equip['prototype'][_0x1f1bbd(0x8b)]=function(){const _0x1d5605=_0x1f1bbd;if(!this['_slotWindow'])return![];if(!this['_slotWindow'][_0x1d5605(0x82)])return![];return this['_slotWindow']['isShiftRemoveShortcutEnabled']();},Scene_Equip['prototype']['buttonAssistKey3']=function(){const _0xda94e2=_0x1f1bbd;if(this[_0xda94e2(0x8b)]())return TextManager[_0xda94e2(0x382)](_0xda94e2(0x8e));return Scene_MenuBase[_0xda94e2(0x187)][_0xda94e2(0x21e)]['call'](this);},Scene_Equip[_0x1f1bbd(0x187)]['buttonAssistText3']=function(){const _0x1cb257=_0x1f1bbd;if(this[_0x1cb257(0x8b)]())return VisuMZ[_0x1cb257(0x1fc)][_0x1cb257(0xb9)][_0x1cb257(0x1ec)][_0x1cb257(0x26f)];return Scene_MenuBase[_0x1cb257(0x187)][_0x1cb257(0x8c)]['call'](this);},Scene_Equip['prototype'][_0x1f1bbd(0x23c)]=function(){const _0x133fff=_0x1f1bbd;if(this[_0x133fff(0x8b)]())return this['_buttonAssistWindow'][_0x133fff(0x171)]/0x5/-0x3;return Scene_MenuBase[_0x133fff(0x187)][_0x133fff(0x23c)]['call'](this);},VisuMZ[_0x1f1bbd(0x1fc)]['Scene_Load_reloadMapIfUpdated']=Scene_Load['prototype'][_0x1f1bbd(0xc5)],Scene_Load[_0x1f1bbd(0x187)][_0x1f1bbd(0xc5)]=function(){const _0x4c682c=_0x1f1bbd;VisuMZ[_0x4c682c(0x1fc)][_0x4c682c(0x3c9)][_0x4c682c(0x358)](this),this['refreshActorEquipSlotsIfUpdated']();},Scene_Load[_0x1f1bbd(0x187)][_0x1f1bbd(0x16f)]=function(){const _0x395e7b=_0x1f1bbd;if($gameSystem[_0x395e7b(0x1f6)]()!==$dataSystem[_0x395e7b(0x1f6)])for(const _0x4bf49e of $gameActors[_0x395e7b(0x2f8)]){if(_0x4bf49e)_0x4bf49e[_0x395e7b(0x275)]();}},Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x168)]=function(){const _0x23a69d=_0x1f1bbd;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x23a69d(0x7f)]!==undefined)return ConfigManager['uiHelpPosition'];else{if(this[_0x23a69d(0x104)]())return this[_0x23a69d(0x318)]()[_0x23a69d(0x124)](/LOWER/i);else Scene_MenuBase[_0x23a69d(0x187)]['isRightInputMode']['call'](this);}},Scene_Shop['prototype']['isRightInputMode']=function(){const _0x28f2d9=_0x1f1bbd;if(ConfigManager[_0x28f2d9(0x18e)]&&ConfigManager[_0x28f2d9(0x1a0)]!==undefined)return ConfigManager['uiInputPosition'];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x28f2d9(0x318)]()[_0x28f2d9(0x124)](/RIGHT/i);else Scene_MenuBase[_0x28f2d9(0x187)][_0x28f2d9(0x1db)][_0x28f2d9(0x358)](this);}},Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x318)]=function(){const _0x38259b=_0x1f1bbd;return VisuMZ[_0x38259b(0x1fc)]['Settings'][_0x38259b(0x70)][_0x38259b(0x1cc)];},Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x2c3)]=function(){const _0x1a27e4=_0x1f1bbd;return this[_0x1a27e4(0xeb)]&&this[_0x1a27e4(0xeb)][_0x1a27e4(0x2c3)]();},Scene_Shop['prototype']['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x38d75c=_0x1f1bbd;return VisuMZ['ItemsEquipsCore'][_0x38d75c(0xb9)]['ShopScene'][_0x38d75c(0x38e)];},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x2fd)]=Scene_Shop[_0x1f1bbd(0x187)]['prepare'],Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x207)]=function(_0x17f2ed,_0x5b966e){const _0x2c1124=_0x1f1bbd;_0x17f2ed=JsonEx[_0x2c1124(0x1f4)](_0x17f2ed),VisuMZ[_0x2c1124(0x1fc)][_0x2c1124(0x2fd)][_0x2c1124(0x358)](this,_0x17f2ed,_0x5b966e),this['adjustHiddenShownGoods']();},Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x2b7)]=function(){const _0x1f450f=_0x1f1bbd;this[_0x1f450f(0x33a)]=0x0;for(const _0x530cf3 of this[_0x1f450f(0x269)]){this[_0x1f450f(0x289)](_0x530cf3)?this[_0x1f450f(0x33a)]++:_0x530cf3[0x0]=-0x1;}},Scene_Shop[_0x1f1bbd(0x187)]['isGoodShown']=function(_0x36d358){const _0x2b95dd=_0x1f1bbd;if(_0x36d358[0x0]>0x2||_0x36d358[0x0]<0x0)return![];const _0x34ea72=[$dataItems,$dataWeapons,$dataArmors][_0x36d358[0x0]][_0x36d358[0x1]];if(!_0x34ea72)return![];const _0x2ce8df=_0x34ea72['note']||'';if(_0x2ce8df[_0x2b95dd(0x124)](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x35f153=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x7a960a of _0x35f153){if(!$gameSwitches[_0x2b95dd(0x29f)](_0x7a960a))return![];}return!![];}if(_0x2ce8df['match'](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x59a3d0=JSON[_0x2b95dd(0x38d)]('['+RegExp['$1'][_0x2b95dd(0x124)](/\d+/g)+']');for(const _0x1c44e6 of _0x59a3d0){if(!$gameSwitches['value'](_0x1c44e6))return![];}return!![];}if(_0x2ce8df['match'](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2b6520=JSON[_0x2b95dd(0x38d)]('['+RegExp['$1'][_0x2b95dd(0x124)](/\d+/g)+']');for(const _0x2a3158 of _0x2b6520){if($gameSwitches['value'](_0x2a3158))return!![];}return![];}if(_0x2ce8df[_0x2b95dd(0x124)](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3545e5=JSON[_0x2b95dd(0x38d)]('['+RegExp['$1'][_0x2b95dd(0x124)](/\d+/g)+']');for(const _0x271e36 of _0x3545e5){if(!$gameSwitches[_0x2b95dd(0x29f)](_0x271e36))return!![];}return![];}if(_0x2ce8df[_0x2b95dd(0x124)](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3a161b=JSON['parse']('['+RegExp['$1'][_0x2b95dd(0x124)](/\d+/g)+']');for(const _0xa35d21 of _0x3a161b){if(!$gameSwitches['value'](_0xa35d21))return!![];}return![];}if(_0x2ce8df[_0x2b95dd(0x124)](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5bfd6a=JSON[_0x2b95dd(0x38d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x47fb34 of _0x5bfd6a){if($gameSwitches[_0x2b95dd(0x29f)](_0x47fb34))return![];}return!![];}return!![];},VisuMZ[_0x1f1bbd(0x1fc)]['Scene_Shop_create']=Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x218)],Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x218)]=function(){const _0x57a315=_0x1f1bbd;VisuMZ['ItemsEquipsCore'][_0x57a315(0x293)][_0x57a315(0x358)](this),this[_0x57a315(0x104)]()&&this[_0x57a315(0x279)](),this['resetShopSwitches']();},Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x279)]=function(){const _0x2f2062=_0x1f1bbd;this['_dummyWindow'][_0x2f2062(0x1d2)](),this[_0x2f2062(0x35f)][_0x2f2062(0x72)](),this['_buyWindow']['deselect'](),this[_0x2f2062(0xf5)]['show']();},Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x317)]=function(){const _0x14ebc8=_0x1f1bbd;return this[_0x14ebc8(0x104)]()?this[_0x14ebc8(0x25f)]():Scene_MenuBase[_0x14ebc8(0x187)][_0x14ebc8(0x317)][_0x14ebc8(0x358)](this);},Scene_Shop['prototype'][_0x1f1bbd(0x25f)]=function(){const _0x4253e2=_0x1f1bbd,_0x11238c=0x0,_0x52f1e7=this[_0x4253e2(0x2cd)](),_0x574e77=Graphics[_0x4253e2(0x3a3)],_0x274ad4=this[_0x4253e2(0x156)]();return new Rectangle(_0x11238c,_0x52f1e7,_0x574e77,_0x274ad4);},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x223)]=Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x229)],Scene_Shop[_0x1f1bbd(0x187)]['goldWindowRect']=function(){const _0x5c1069=_0x1f1bbd;return this[_0x5c1069(0x104)]()?this[_0x5c1069(0x243)]():VisuMZ[_0x5c1069(0x1fc)]['Scene_Shop_goldWindowRect'][_0x5c1069(0x358)](this);},Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x243)]=function(){const _0x536cb3=_0x1f1bbd,_0x5e3ecb=this['mainCommandWidth'](),_0x3afffa=this[_0x536cb3(0x290)](0x1,!![]),_0x1c357d=this[_0x536cb3(0x1db)]()?0x0:Graphics[_0x536cb3(0x3a3)]-_0x5e3ecb,_0x367f7b=this['mainAreaTop']();return new Rectangle(_0x1c357d,_0x367f7b,_0x5e3ecb,_0x3afffa);},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x21d)]=Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x2e3)],Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x2e3)]=function(){const _0x4bc2fd=_0x1f1bbd;return this[_0x4bc2fd(0x104)]()?this[_0x4bc2fd(0x80)]():VisuMZ['ItemsEquipsCore'][_0x4bc2fd(0x21d)][_0x4bc2fd(0x358)](this);},Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x80)]=function(){const _0x8d8063=_0x1f1bbd,_0x4cf734=this['isRightInputMode']()?this['mainCommandWidth']():0x0,_0x4c46b0=this[_0x8d8063(0x1f0)](),_0x704dbe=Graphics[_0x8d8063(0x3a3)]-this[_0x8d8063(0x10c)](),_0x2c8a00=this[_0x8d8063(0x290)](0x1,!![]);return new Rectangle(_0x4cf734,_0x4c46b0,_0x704dbe,_0x2c8a00);},VisuMZ[_0x1f1bbd(0x1fc)]['Scene_Shop_numberWindowRect']=Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x27c)],Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x27c)]=function(){const _0x4a07e6=_0x1f1bbd;return this[_0x4a07e6(0x104)]()?this[_0x4a07e6(0x32a)]():VisuMZ[_0x4a07e6(0x1fc)][_0x4a07e6(0x12e)][_0x4a07e6(0x358)](this);},Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x32a)]=function(){const _0xad51cd=_0x1f1bbd,_0x334176=this['_commandWindow']['y']+this[_0xad51cd(0x159)][_0xad51cd(0x1d6)],_0x5bd3b0=Graphics[_0xad51cd(0x3a3)]-this[_0xad51cd(0x349)](),_0x51fd49=this[_0xad51cd(0x1db)]()?Graphics['boxWidth']-_0x5bd3b0:0x0,_0x2d05ea=this[_0xad51cd(0x23b)]()-this[_0xad51cd(0x159)]['height'];return new Rectangle(_0x51fd49,_0x334176,_0x5bd3b0,_0x2d05ea);},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x181)]=Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x260)],Scene_Shop['prototype'][_0x1f1bbd(0x260)]=function(){const _0x42b4a6=_0x1f1bbd;return this[_0x42b4a6(0x104)]()?this[_0x42b4a6(0x31f)]():VisuMZ['ItemsEquipsCore']['Scene_Shop_statusWindowRect']['call'](this);},Scene_Shop['prototype'][_0x1f1bbd(0x31f)]=function(){const _0x5dbbbf=_0x1f1bbd,_0x3589d5=this[_0x5dbbbf(0x349)](),_0x4e1ee1=this[_0x5dbbbf(0x23b)]()-this[_0x5dbbbf(0x159)][_0x5dbbbf(0x1d6)],_0x1d4ad2=this[_0x5dbbbf(0x1db)]()?0x0:Graphics[_0x5dbbbf(0x3a3)]-_0x3589d5,_0x1fcf4c=this[_0x5dbbbf(0x159)]['y']+this['_commandWindow'][_0x5dbbbf(0x1d6)];return new Rectangle(_0x1d4ad2,_0x1fcf4c,_0x3589d5,_0x4e1ee1);},VisuMZ[_0x1f1bbd(0x1fc)]['Scene_Shop_buyWindowRect']=Scene_Shop['prototype']['buyWindowRect'],Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x85)]=function(){const _0x1dfd54=_0x1f1bbd;return this[_0x1dfd54(0x104)]()?this[_0x1dfd54(0x286)]():VisuMZ[_0x1dfd54(0x1fc)][_0x1dfd54(0x2ab)][_0x1dfd54(0x358)](this);},Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x286)]=function(){const _0x326d16=_0x1f1bbd,_0x3d0cc3=this['_commandWindow']['y']+this[_0x326d16(0x159)]['height'],_0x2da023=Graphics[_0x326d16(0x3a3)]-this[_0x326d16(0x349)](),_0x482d=this[_0x326d16(0x23b)]()-this[_0x326d16(0x159)][_0x326d16(0x1d6)],_0x2e340a=this[_0x326d16(0x1db)]()?Graphics[_0x326d16(0x3a3)]-_0x2da023:0x0;return new Rectangle(_0x2e340a,_0x3d0cc3,_0x2da023,_0x482d);},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x6d)]=Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x313)],Scene_Shop[_0x1f1bbd(0x187)]['createCategoryWindow']=function(){const _0x59a2bd=_0x1f1bbd;VisuMZ[_0x59a2bd(0x1fc)][_0x59a2bd(0x6d)][_0x59a2bd(0x358)](this),this['isUseModernControls']()&&this[_0x59a2bd(0x113)]();},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x23d)]=Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x145)],Scene_Shop[_0x1f1bbd(0x187)]['categoryWindowRect']=function(){const _0x598701=_0x1f1bbd;return this[_0x598701(0x104)]()?this[_0x598701(0x7b)]():VisuMZ['ItemsEquipsCore'][_0x598701(0x23d)][_0x598701(0x358)](this);},Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x7b)]=function(){const _0x46460d=_0x1f1bbd,_0x3561d1=this[_0x46460d(0x159)]['y'],_0x43469f=this[_0x46460d(0x159)][_0x46460d(0x171)],_0x5ec3c7=this[_0x46460d(0x290)](0x1,!![]),_0x3654c4=this[_0x46460d(0x1db)]()?Graphics['boxWidth']-_0x43469f:0x0;return new Rectangle(_0x3654c4,_0x3561d1,_0x43469f,_0x5ec3c7);},Scene_Shop[_0x1f1bbd(0x187)]['postCreateCategoryWindowItemsEquipsCore']=function(){const _0x19f8f=_0x1f1bbd;delete this[_0x19f8f(0xeb)]['_handlers']['ok'],delete this[_0x19f8f(0xeb)][_0x19f8f(0xc4)]['cancel'];},VisuMZ[_0x1f1bbd(0x1fc)]['Scene_Shop_createSellWindow']=Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x2ac)],Scene_Shop[_0x1f1bbd(0x187)]['createSellWindow']=function(){const _0x2e5ef6=_0x1f1bbd;VisuMZ[_0x2e5ef6(0x1fc)][_0x2e5ef6(0xdf)][_0x2e5ef6(0x358)](this),this[_0x2e5ef6(0x104)]()&&this[_0x2e5ef6(0x2cb)]();},VisuMZ['ItemsEquipsCore'][_0x1f1bbd(0xaf)]=Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x16b)],Scene_Shop['prototype'][_0x1f1bbd(0x16b)]=function(){const _0x516a0b=_0x1f1bbd;return this[_0x516a0b(0x104)]()?this[_0x516a0b(0x2c7)]():VisuMZ[_0x516a0b(0x1fc)][_0x516a0b(0xaf)][_0x516a0b(0x358)](this);},Scene_Shop[_0x1f1bbd(0x187)]['sellWindowRectItemsEquipsCore']=function(){const _0x4ab0d7=_0x1f1bbd,_0x282572=this[_0x4ab0d7(0xeb)]['y']+this[_0x4ab0d7(0xeb)][_0x4ab0d7(0x1d6)],_0x96445e=Graphics['boxWidth']-this[_0x4ab0d7(0x349)](),_0x5c50a3=this[_0x4ab0d7(0x23b)]()-this[_0x4ab0d7(0xeb)][_0x4ab0d7(0x1d6)],_0x31d831=this[_0x4ab0d7(0x1db)]()?Graphics[_0x4ab0d7(0x3a3)]-_0x96445e:0x0;return new Rectangle(_0x31d831,_0x282572,_0x96445e,_0x5c50a3);},Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x2cb)]=function(){const _0x5cb168=_0x1f1bbd;this['_sellWindow'][_0x5cb168(0x2a2)](this[_0x5cb168(0xf5)]);},Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x349)]=function(){const _0x5951e5=_0x1f1bbd;return VisuMZ[_0x5951e5(0x1fc)][_0x5951e5(0xb9)][_0x5951e5(0xa5)][_0x5951e5(0x335)];},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x3c4)]=Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0xc7)],Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0xc7)]=function(){const _0x391d09=_0x1f1bbd;VisuMZ[_0x391d09(0x1fc)][_0x391d09(0x3c4)][_0x391d09(0x358)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this['_statusWindow']['show']();},VisuMZ[_0x1f1bbd(0x1fc)]['Scene_Shop_commandBuy']=Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x2de)],Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x2de)]=function(){const _0x3c8b42=_0x1f1bbd;VisuMZ[_0x3c8b42(0x1fc)][_0x3c8b42(0x161)][_0x3c8b42(0x358)](this),this[_0x3c8b42(0x104)]()&&this[_0x3c8b42(0x278)]();},Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x278)]=function(){const _0x1a41a3=_0x1f1bbd;this[_0x1a41a3(0x2aa)]=this[_0x1a41a3(0x2aa)]||0x0,this[_0x1a41a3(0x35f)][_0x1a41a3(0x1f7)](this[_0x1a41a3(0x2aa)]);},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x184)]=Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x325)],Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x325)]=function(){const _0x1c56cd=_0x1f1bbd;VisuMZ[_0x1c56cd(0x1fc)][_0x1c56cd(0x184)][_0x1c56cd(0x358)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x1c56cd(0x2fb)](),this['isUseModernControls']()&&(this[_0x1c56cd(0xeb)]['smoothSelect'](0x0),this['onCategoryOk']());},Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x2fb)]=function(){const _0x5b985f=_0x1f1bbd;this['_buyWindow'][_0x5b985f(0x1d2)](),this[_0x5b985f(0x159)][_0x5b985f(0x1d2)]();},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x11b)]=Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x38f)],Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x38f)]=function(){const _0x47562e=_0x1f1bbd;VisuMZ[_0x47562e(0x1fc)][_0x47562e(0x11b)]['call'](this),this[_0x47562e(0x104)]()&&this[_0x47562e(0x120)]();},Scene_Shop[_0x1f1bbd(0x187)]['onBuyCancelItemsEquipsCore']=function(){const _0x40500=_0x1f1bbd;this[_0x40500(0x2aa)]=this[_0x40500(0x35f)][_0x40500(0x231)](),this['_buyWindow'][_0x40500(0x72)](),this[_0x40500(0x35f)][_0x40500(0x1f2)](),this['_buyWindow']['smoothScrollTo'](0x0,0x0),this[_0x40500(0xf5)][_0x40500(0x72)](),this['_dummyWindow']['hide']();},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x13c)]=Scene_Shop['prototype'][_0x1f1bbd(0x2a8)],Scene_Shop['prototype'][_0x1f1bbd(0x2a8)]=function(){const _0x273863=_0x1f1bbd;VisuMZ[_0x273863(0x1fc)][_0x273863(0x13c)][_0x273863(0x358)](this),this[_0x273863(0x104)]()&&this[_0x273863(0x1fe)]();},Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x1fe)]=function(){const _0x3dba5f=_0x1f1bbd;this[_0x3dba5f(0x35f)][_0x3dba5f(0x72)](),this[_0x3dba5f(0x159)][_0x3dba5f(0x72)]();},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x240)]=Scene_Shop['prototype'][_0x1f1bbd(0x1a6)],Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x1a6)]=function(){const _0x802f0=_0x1f1bbd;VisuMZ['ItemsEquipsCore'][_0x802f0(0x240)][_0x802f0(0x358)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x802f0(0x2e7)]();},Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x2e7)]=function(){const _0x513b7b=_0x1f1bbd;this[_0x513b7b(0xeb)][_0x513b7b(0x72)]();},VisuMZ['ItemsEquipsCore'][_0x1f1bbd(0x3ad)]=Scene_Shop[_0x1f1bbd(0x187)]['onSellCancel'],Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x390)]=function(){const _0x2c1933=_0x1f1bbd;VisuMZ[_0x2c1933(0x1fc)]['Scene_Shop_onSellCancel'][_0x2c1933(0x358)](this),this[_0x2c1933(0x2c3)]()&&this[_0x2c1933(0x2a8)](),this[_0x2c1933(0x104)]()&&this[_0x2c1933(0x68)][_0x2c1933(0x1d2)]();},VisuMZ['ItemsEquipsCore'][_0x1f1bbd(0x234)]=Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0xbb)],Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0xbb)]=function(){const _0x56d5e8=_0x1f1bbd;let _0x2d98f3=this[_0x56d5e8(0xf8)]();const _0x124643=this[_0x56d5e8(0x78)];return _0x2d98f3=VisuMZ[_0x56d5e8(0x1fc)]['Settings'][_0x56d5e8(0x70)][_0x56d5e8(0x2df)][_0x56d5e8(0x358)](this,_0x124643,_0x2d98f3),_0x2d98f3;},Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0xf8)]=function(){const _0x4995f3=_0x1f1bbd;if(!this[_0x4995f3(0x78)])return 0x0;else{if(this[_0x4995f3(0x78)]['note'][_0x4995f3(0x124)](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){const _0x34a677=String(RegExp['$1']);let _0x196d0b=this[_0x4995f3(0x78)],_0xe28541=_0x196d0b[_0x4995f3(0x14f)]*this[_0x4995f3(0x1ef)]();try{eval(_0x34a677);}catch(_0x3052eb){if($gameTemp[_0x4995f3(0x2bb)]())console['log'](_0x3052eb);}if(isNaN(_0xe28541))_0xe28541=0x0;return Math[_0x4995f3(0x1b3)](_0xe28541);}else return this[_0x4995f3(0x78)]['note'][_0x4995f3(0x124)](/<SELL PRICE:[ ](\d+)>/i)?parseInt(RegExp['$1']):Math[_0x4995f3(0x1b3)](this[_0x4995f3(0x78)][_0x4995f3(0x14f)]*this[_0x4995f3(0x1ef)]());}},Scene_Shop['prototype'][_0x1f1bbd(0x1ef)]=function(){const _0x238ca2=_0x1f1bbd;return VisuMZ[_0x238ca2(0x1fc)]['Settings'][_0x238ca2(0x70)][_0x238ca2(0x175)];},Scene_Shop[_0x1f1bbd(0x187)]['buttonAssistItemListRequirement']=function(){const _0x2f2f3a=_0x1f1bbd;if(!this[_0x2f2f3a(0x318)]())return![];if(!this['isUseModernControls']())return![];if(!this[_0x2f2f3a(0x352)])return![];if(!this['_sellWindow'][_0x2f2f3a(0x82)])return![];return this['updatedLayoutStyle']()&&this['isUseModernControls']();},Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x3ab)]=function(){const _0x59a766=_0x1f1bbd;if(this[_0x59a766(0x331)]())return this[_0x59a766(0x352)][_0x59a766(0x298)]()===0x1?TextManager[_0x59a766(0x23f)](_0x59a766(0x214),_0x59a766(0x20c)):TextManager[_0x59a766(0x23f)](_0x59a766(0x38a),'pagedown');else{if(this[_0x59a766(0x28d)]&&this['_numberWindow'][_0x59a766(0x82)])return TextManager[_0x59a766(0x23f)](_0x59a766(0x214),_0x59a766(0x20c));}return Scene_MenuBase[_0x59a766(0x187)]['buttonAssistKey1'][_0x59a766(0x358)](this);},Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x1f3)]=function(){const _0x3f6dbd=_0x1f1bbd;if(this[_0x3f6dbd(0x28d)]&&this[_0x3f6dbd(0x28d)][_0x3f6dbd(0x82)])return TextManager[_0x3f6dbd(0x23f)]('up',_0x3f6dbd(0x131));return Scene_MenuBase[_0x3f6dbd(0x187)][_0x3f6dbd(0x1f3)]['call'](this);},Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x26a)]=function(){const _0x3ab8f7=_0x1f1bbd;if(this[_0x3ab8f7(0x331)]())return VisuMZ['ItemsEquipsCore'][_0x3ab8f7(0xb9)][_0x3ab8f7(0x305)][_0x3ab8f7(0x2a1)];else{if(this[_0x3ab8f7(0x28d)]&&this[_0x3ab8f7(0x28d)][_0x3ab8f7(0x82)])return VisuMZ[_0x3ab8f7(0x1fc)][_0x3ab8f7(0xb9)][_0x3ab8f7(0x70)][_0x3ab8f7(0x1d4)];}return Scene_MenuBase['prototype']['buttonAssistText1'][_0x3ab8f7(0x358)](this);},Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x219)]=function(){const _0x465fa6=_0x1f1bbd;if(this[_0x465fa6(0x28d)]&&this['_numberWindow'][_0x465fa6(0x82)])return VisuMZ[_0x465fa6(0x1fc)][_0x465fa6(0xb9)][_0x465fa6(0x70)][_0x465fa6(0x2f5)];return Scene_MenuBase[_0x465fa6(0x187)]['buttonAssistText2'][_0x465fa6(0x358)](this);},Scene_Shop['prototype'][_0x1f1bbd(0x2c4)]=function(){const _0x52e392=_0x1f1bbd;if(!SceneManager['isSceneShop']())return;const _0x5712b6=VisuMZ[_0x52e392(0x1fc)][_0x52e392(0xb9)][_0x52e392(0x70)];_0x5712b6['SwitchBuy']&&$gameSwitches[_0x52e392(0x1fd)](_0x5712b6[_0x52e392(0x2b8)],![]),_0x5712b6[_0x52e392(0x388)]&&$gameSwitches[_0x52e392(0x1fd)](_0x5712b6[_0x52e392(0x388)],![]);},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0xaa)]=Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x2bd)],Scene_Shop[_0x1f1bbd(0x187)]['doBuy']=function(_0x41be84){const _0xfca26a=_0x1f1bbd;VisuMZ[_0xfca26a(0x1fc)]['Scene_Shop_doBuy'][_0xfca26a(0x358)](this,_0x41be84);if(_0x41be84<=0x0)return;const _0x673667=VisuMZ['ItemsEquipsCore'][_0xfca26a(0xb9)]['ShopScene'];_0x673667[_0xfca26a(0x2b8)]&&$gameSwitches['setValue'](_0x673667['SwitchBuy'],!![]);},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0xf3)]=Scene_Shop[_0x1f1bbd(0x187)][_0x1f1bbd(0x192)],Scene_Shop[_0x1f1bbd(0x187)]['doSell']=function(_0x55aee3){const _0x463459=_0x1f1bbd;VisuMZ[_0x463459(0x1fc)][_0x463459(0xf3)][_0x463459(0x358)](this,_0x55aee3);if(_0x55aee3<=0x0)return;const _0x5a1781=VisuMZ['ItemsEquipsCore']['Settings'][_0x463459(0x70)];_0x5a1781[_0x463459(0x2b8)]&&$gameSwitches[_0x463459(0x1fd)](_0x5a1781[_0x463459(0x388)],!![]);};function Sprite_NewLabel(){const _0x9a2441=_0x1f1bbd;this[_0x9a2441(0x1ea)](...arguments);}Sprite_NewLabel[_0x1f1bbd(0x187)]=Object[_0x1f1bbd(0x218)](Sprite[_0x1f1bbd(0x187)]),Sprite_NewLabel[_0x1f1bbd(0x187)][_0x1f1bbd(0x6e)]=Sprite_NewLabel,Sprite_NewLabel[_0x1f1bbd(0x187)][_0x1f1bbd(0x1ea)]=function(){const _0x58803c=_0x1f1bbd;Sprite[_0x58803c(0x187)]['initialize'][_0x58803c(0x358)](this),this[_0x58803c(0x256)]();},Sprite_NewLabel['prototype'][_0x1f1bbd(0x256)]=function(){const _0x9bc561=_0x1f1bbd,_0x248af7=ImageManager[_0x9bc561(0x2ba)],_0xda2581=ImageManager[_0x9bc561(0x2e4)];this[_0x9bc561(0xc8)]=new Bitmap(_0x248af7,_0xda2581),this[_0x9bc561(0xcd)](),this['drawNewLabelText']();},Sprite_NewLabel[_0x1f1bbd(0x187)][_0x1f1bbd(0xcd)]=function(){const _0xbf4a9c=_0x1f1bbd,_0x39e384=VisuMZ[_0xbf4a9c(0x1fc)]['Settings'][_0xbf4a9c(0x11a)]['Icon'];if(_0x39e384<=0x0)return;const _0x265dba=ImageManager['loadSystem'](_0xbf4a9c(0xcf)),_0xdaa2=ImageManager[_0xbf4a9c(0x2ba)],_0x4b84f5=ImageManager[_0xbf4a9c(0x2e4)],_0x6f043f=_0x39e384%0x10*_0xdaa2,_0x7c939f=Math['floor'](_0x39e384/0x10)*_0x4b84f5;this[_0xbf4a9c(0xc8)][_0xbf4a9c(0x2bc)](_0x265dba,_0x6f043f,_0x7c939f,_0xdaa2,_0x4b84f5,0x0,0x0);},Sprite_NewLabel[_0x1f1bbd(0x187)][_0x1f1bbd(0x31e)]=function(){const _0x283e4d=_0x1f1bbd,_0x3c7458=VisuMZ['ItemsEquipsCore'][_0x283e4d(0xb9)][_0x283e4d(0x11a)],_0x31ad38=_0x3c7458[_0x283e4d(0x24f)];if(_0x31ad38==='')return;const _0x2af3ff=ImageManager[_0x283e4d(0x2ba)],_0x25b66b=ImageManager[_0x283e4d(0x2e4)];this[_0x283e4d(0xc8)]['fontFace']=_0x3c7458[_0x283e4d(0x1e7)]||$gameSystem['mainFontFace'](),this[_0x283e4d(0xc8)][_0x283e4d(0x1b7)]=this[_0x283e4d(0x200)](),this[_0x283e4d(0xc8)][_0x283e4d(0x3bb)]=_0x3c7458[_0x283e4d(0x257)],this[_0x283e4d(0xc8)][_0x283e4d(0x1d9)](_0x31ad38,0x0,_0x25b66b/0x2,_0x2af3ff,_0x25b66b/0x2,_0x283e4d(0x1b1));},Sprite_NewLabel[_0x1f1bbd(0x187)][_0x1f1bbd(0x200)]=function(){const _0x43a9d4=_0x1f1bbd,_0x5e10b7=VisuMZ[_0x43a9d4(0x1fc)]['Settings'][_0x43a9d4(0x11a)][_0x43a9d4(0x11f)];return _0x5e10b7[_0x43a9d4(0x124)](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager[_0x43a9d4(0x1b7)](_0x5e10b7);},Window_Base[_0x1f1bbd(0x187)][_0x1f1bbd(0xe5)]=function(_0x54ce7c,_0x562512,_0x3a0bc1,_0x1b2137){const _0x736015=_0x1f1bbd;if(_0x54ce7c){const _0x4af5d6=_0x3a0bc1+(this['lineHeight']()-ImageManager[_0x736015(0x2e4)])/0x2,_0x3f8d23=ImageManager['iconWidth']+0x4,_0x5bfc95=Math[_0x736015(0x31a)](0x0,_0x1b2137-_0x3f8d23);this[_0x736015(0xb3)](ColorManager[_0x736015(0x36a)](_0x54ce7c)),this['drawIcon'](_0x54ce7c[_0x736015(0x2c9)],_0x562512,_0x4af5d6),this[_0x736015(0x1d9)](_0x54ce7c[_0x736015(0xce)],_0x562512+_0x3f8d23,_0x3a0bc1,_0x5bfc95),this[_0x736015(0x29e)]();}},Window_Base[_0x1f1bbd(0x187)][_0x1f1bbd(0x308)]=function(_0x380563,_0x344373,_0x2092e2,_0x23c7d2){const _0x431e93=_0x1f1bbd;if(this[_0x431e93(0x25b)](_0x380563)){this[_0x431e93(0xe9)]();const _0x5c7e84=VisuMZ[_0x431e93(0x1fc)]['Settings']['ItemScene'],_0x42306b=_0x5c7e84[_0x431e93(0x2da)],_0x310868=_0x42306b[_0x431e93(0x2dd)]($gameParty[_0x431e93(0xa9)](_0x380563));this[_0x431e93(0x1be)][_0x431e93(0x3bb)]=_0x5c7e84[_0x431e93(0x247)],this[_0x431e93(0x1d9)](_0x310868,_0x344373,_0x2092e2,_0x23c7d2,_0x431e93(0x20c)),this[_0x431e93(0xe9)]();}},Window_Base[_0x1f1bbd(0x187)][_0x1f1bbd(0x25b)]=function(_0x250cf0){const _0x5af7ee=_0x1f1bbd;if(DataManager['isKeyItem'](_0x250cf0))return $dataSystem[_0x5af7ee(0x395)];return!![];},Window_Base[_0x1f1bbd(0x187)][_0x1f1bbd(0x35a)]=function(_0xfcdf13,_0x55f3cf,_0x3e8d88,_0x168168,_0x10d0f2){const _0x5e2511=_0x1f1bbd;_0x10d0f2=Math['max'](_0x10d0f2||0x1,0x1);while(_0x10d0f2--){_0x168168=_0x168168||this[_0x5e2511(0x3a5)](),this[_0x5e2511(0x17a)][_0x5e2511(0x2b0)]=0xa0;const _0x10ef69=ColorManager[_0x5e2511(0x385)]();this[_0x5e2511(0x17a)]['fillRect'](_0xfcdf13+0x1,_0x55f3cf+0x1,_0x3e8d88-0x2,_0x168168-0x2,_0x10ef69),this[_0x5e2511(0x17a)][_0x5e2511(0x2b0)]=0xff;}},VisuMZ['ItemsEquipsCore'][_0x1f1bbd(0x163)]=Window_Selectable[_0x1f1bbd(0x187)][_0x1f1bbd(0x1ea)],Window_Selectable[_0x1f1bbd(0x187)]['initialize']=function(_0x175e81){const _0x1a1f33=_0x1f1bbd;this[_0x1a1f33(0x3c5)](),VisuMZ[_0x1a1f33(0x1fc)][_0x1a1f33(0x163)][_0x1a1f33(0x358)](this,_0x175e81);},Window_Selectable[_0x1f1bbd(0x187)]['initNewLabelSprites']=function(){const _0x49d024=_0x1f1bbd;this['_newLabelSprites']={},this[_0x49d024(0x28f)]=0xff,this[_0x49d024(0x1da)]=VisuMZ[_0x49d024(0x1fc)][_0x49d024(0xb9)]['New'][_0x49d024(0xcc)],this[_0x49d024(0x16d)]=VisuMZ[_0x49d024(0x1fc)][_0x49d024(0xb9)][_0x49d024(0x11a)][_0x49d024(0x3b8)];},Window_Selectable[_0x1f1bbd(0x187)]['isShowNew']=function(){return![];},VisuMZ['ItemsEquipsCore'][_0x1f1bbd(0x364)]=Window_Selectable[_0x1f1bbd(0x187)][_0x1f1bbd(0x309)],Window_Selectable['prototype'][_0x1f1bbd(0x309)]=function(_0xe97af1){const _0x1caeec=_0x1f1bbd;VisuMZ['ItemsEquipsCore'][_0x1caeec(0x364)][_0x1caeec(0x358)](this,_0xe97af1);if(this[_0x1caeec(0x1e5)]())this[_0x1caeec(0x3a1)](_0xe97af1);},Window_Selectable['prototype'][_0x1f1bbd(0x3a1)]=function(_0x46832e){const _0xcc52a3=_0x1f1bbd;if(!_0x46832e)return;$gameParty[_0xcc52a3(0x215)](_0x46832e);let _0x2c5605='';if(DataManager[_0xcc52a3(0x1ce)](_0x46832e))_0x2c5605=_0xcc52a3(0x2ed)['format'](_0x46832e['id']);else{if(DataManager[_0xcc52a3(0x160)](_0x46832e))_0x2c5605=_0xcc52a3(0x1ee)['format'](_0x46832e['id']);else{if(DataManager[_0xcc52a3(0x174)](_0x46832e))_0x2c5605=_0xcc52a3(0x1a3)[_0xcc52a3(0x2dd)](_0x46832e['id']);else return;}}const _0x402fe5=this[_0xcc52a3(0x1d1)][_0x2c5605];if(_0x402fe5)_0x402fe5['hide']();},VisuMZ['ItemsEquipsCore'][_0x1f1bbd(0x133)]=Window_Selectable[_0x1f1bbd(0x187)][_0x1f1bbd(0x16c)],Window_Selectable[_0x1f1bbd(0x187)][_0x1f1bbd(0x16c)]=function(){const _0x5ce457=_0x1f1bbd;this['hideNewLabelSprites'](),VisuMZ[_0x5ce457(0x1fc)]['Window_Selectable_refresh'][_0x5ce457(0x358)](this);},Window_Selectable['prototype'][_0x1f1bbd(0x208)]=function(){const _0x1070d4=_0x1f1bbd;for(const _0x23f7f5 of Object[_0x1070d4(0x30e)](this[_0x1070d4(0x1d1)])){_0x23f7f5['hide']();}},VisuMZ[_0x1f1bbd(0x1fc)]['Window_Selectable_update']=Window_Selectable[_0x1f1bbd(0x187)][_0x1f1bbd(0xad)],Window_Selectable[_0x1f1bbd(0x187)][_0x1f1bbd(0xad)]=function(){const _0x4feb40=_0x1f1bbd;this['updateNewLabelOpacity'](),VisuMZ[_0x4feb40(0x1fc)]['Window_Selectable_update'][_0x4feb40(0x358)](this);},Window_Selectable[_0x1f1bbd(0x187)][_0x1f1bbd(0x34d)]=function(){const _0x5ca2b9=_0x1f1bbd;if(!this['isShowNew']())return;const _0x446a31=this[_0x5ca2b9(0x16d)];this[_0x5ca2b9(0x28f)]+=this[_0x5ca2b9(0x1da)];(this[_0x5ca2b9(0x28f)]>=_0x446a31||this[_0x5ca2b9(0x28f)]<=0x0)&&(this['_newLabelOpacityChange']*=-0x1);this[_0x5ca2b9(0x28f)]=this[_0x5ca2b9(0x28f)]['clamp'](0x0,_0x446a31);for(const _0x3ec229 of Object[_0x5ca2b9(0x30e)](this['_newLabelSprites'])){_0x3ec229['opacity']=this[_0x5ca2b9(0x28f)];}},Window_Selectable['prototype'][_0x1f1bbd(0x33f)]=function(_0xb72f66){const _0x450527=_0x1f1bbd,_0x550f83=this[_0x450527(0x1d1)];if(_0x550f83[_0xb72f66])return _0x550f83[_0xb72f66];else{const _0x2b80c2=new Sprite_NewLabel();return _0x550f83[_0xb72f66]=_0x2b80c2,this[_0x450527(0x2b3)](_0x2b80c2),_0x2b80c2;}},Window_Selectable['prototype']['placeNewLabel']=function(_0x1c34cc,_0x38901f,_0x36b842){const _0xef302d=_0x1f1bbd;let _0x3b3992='';if(DataManager[_0xef302d(0x1ce)](_0x1c34cc))_0x3b3992=_0xef302d(0x2ed)['format'](_0x1c34cc['id']);else{if(DataManager['isWeapon'](_0x1c34cc))_0x3b3992=_0xef302d(0x1ee)['format'](_0x1c34cc['id']);else{if(DataManager[_0xef302d(0x174)](_0x1c34cc))_0x3b3992=_0xef302d(0x1a3)[_0xef302d(0x2dd)](_0x1c34cc['id']);else return;}}const _0x42bc2f=this['createNewLabelSprite'](_0x3b3992);_0x42bc2f[_0xef302d(0x244)](_0x38901f,_0x36b842),_0x42bc2f[_0xef302d(0x72)](),_0x42bc2f[_0xef302d(0x242)]=this['_newLabelOpacity'];},Window_ItemCategory[_0x1f1bbd(0x373)]=VisuMZ['ItemsEquipsCore']['Settings'][_0x1f1bbd(0x2c5)]['List'],Window_ItemCategory[_0x1f1bbd(0x332)]=[_0x1f1bbd(0x321),_0x1f1bbd(0x31c),_0x1f1bbd(0x311),_0x1f1bbd(0x2a0),_0x1f1bbd(0x2c0),_0x1f1bbd(0x333),'FieldUsable',_0x1f1bbd(0x357)],VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0xb0)]=Window_ItemCategory[_0x1f1bbd(0x187)]['initialize'],Window_ItemCategory['prototype'][_0x1f1bbd(0x1ea)]=function(_0xe857df){const _0x8f71ff=_0x1f1bbd;VisuMZ[_0x8f71ff(0x1fc)]['Window_ItemCategory_initialize'][_0x8f71ff(0x358)](this,_0xe857df),this[_0x8f71ff(0x18a)](_0xe857df);},Window_ItemCategory['prototype']['createCategoryNameWindow']=function(_0x5f1a80){const _0x536da9=_0x1f1bbd,_0x4729c0=new Rectangle(0x0,0x0,_0x5f1a80[_0x536da9(0x171)],_0x5f1a80[_0x536da9(0x1d6)]);this[_0x536da9(0x1e2)]=new Window_Base(_0x4729c0),this['_categoryNameWindow'][_0x536da9(0x242)]=0x0,this[_0x536da9(0xe4)](this[_0x536da9(0x1e2)]),this[_0x536da9(0x2be)]();},Window_ItemCategory['prototype'][_0x1f1bbd(0x2c3)]=function(){const _0x298fb3=_0x1f1bbd;return Imported[_0x298fb3(0x24a)]&&Window_HorzCommand['prototype'][_0x298fb3(0x2c3)]['call'](this);},Window_ItemCategory['prototype'][_0x1f1bbd(0x206)]=function(){},Window_ItemCategory['prototype'][_0x1f1bbd(0xd2)]=function(){const _0x28c07e=_0x1f1bbd;if(!this[_0x28c07e(0x2c3)]())Window_HorzCommand[_0x28c07e(0x187)][_0x28c07e(0xd2)][_0x28c07e(0x358)](this);},Window_ItemCategory[_0x1f1bbd(0x187)]['maxCols']=function(){const _0x3e2eb6=_0x1f1bbd;return this[_0x3e2eb6(0x288)]?this[_0x3e2eb6(0x1c4)]():0x4;},Window_ItemCategory[_0x1f1bbd(0x187)][_0x1f1bbd(0xad)]=function(){const _0x3b9e02=_0x1f1bbd;Window_HorzCommand[_0x3b9e02(0x187)][_0x3b9e02(0xad)]['call'](this),this['_itemWindow']&&this[_0x3b9e02(0x38c)]['setCategory'](this[_0x3b9e02(0xbd)]());},Window_ItemCategory[_0x1f1bbd(0x187)]['processCursorMoveModernControls']=function(){const _0x5d0b2c=_0x1f1bbd;if(this[_0x5d0b2c(0x24c)]()){const _0x392146=this['index']();if(this['_itemWindow']&&this[_0x5d0b2c(0x38c)]['maxCols']()<=0x1)Input[_0x5d0b2c(0xe2)](_0x5d0b2c(0x20c))&&this[_0x5d0b2c(0x1c2)](Input[_0x5d0b2c(0xb6)](_0x5d0b2c(0x20c))),Input['isRepeated']('left')&&this[_0x5d0b2c(0x387)](Input[_0x5d0b2c(0xb6)](_0x5d0b2c(0x214)));else this[_0x5d0b2c(0x38c)]&&this[_0x5d0b2c(0x38c)]['maxCols']()>0x1&&(Input[_0x5d0b2c(0xe2)](_0x5d0b2c(0x3aa))&&!Input[_0x5d0b2c(0x193)](_0x5d0b2c(0x8e))&&this[_0x5d0b2c(0x1c2)](Input['isTriggered'](_0x5d0b2c(0x3aa))),Input[_0x5d0b2c(0xe2)](_0x5d0b2c(0x38a))&&!Input[_0x5d0b2c(0x193)](_0x5d0b2c(0x8e))&&this['cursorLeft'](Input[_0x5d0b2c(0xb6)](_0x5d0b2c(0x38a))));this[_0x5d0b2c(0x231)]()!==_0x392146&&this[_0x5d0b2c(0x65)]();}},Window_ItemCategory[_0x1f1bbd(0x187)][_0x1f1bbd(0x2b5)]=function(){const _0x349f8e=_0x1f1bbd;if(this[_0x349f8e(0x2c3)]())return;Window_HorzCommand['prototype']['processHandling'][_0x349f8e(0x358)](this);},Window_ItemCategory['prototype'][_0x1f1bbd(0x20b)]=function(){const _0x566bc7=_0x1f1bbd;return this[_0x566bc7(0x2c3)]()?![]:Window_HorzCommand[_0x566bc7(0x187)][_0x566bc7(0x20b)][_0x566bc7(0x358)](this);},Window_ItemCategory[_0x1f1bbd(0x187)][_0x1f1bbd(0x2a4)]=function(){const _0x39863e=_0x1f1bbd;if(this[_0x39863e(0x29a)]()){TouchInput[_0x39863e(0xb6)]()&&this[_0x39863e(0x3be)](!![]);if(TouchInput['isClicked']())this[_0x39863e(0x9f)]();else TouchInput[_0x39863e(0x2b6)]()&&this[_0x39863e(0x88)]();}},Window_ItemCategory[_0x1f1bbd(0x187)][_0x1f1bbd(0x3be)]=function(_0x2a17c8){const _0xc4576c=_0x1f1bbd;this[_0xc4576c(0x2c3)]()?this[_0xc4576c(0x221)](!![]):Window_HorzCommand[_0xc4576c(0x187)][_0xc4576c(0x3be)][_0xc4576c(0x358)](this,_0x2a17c8);},Window_ItemCategory['prototype'][_0x1f1bbd(0x221)]=function(_0x3902c3){const _0x35185c=_0x1f1bbd;this[_0x35185c(0x2e5)]=![];if(this['isCursorMovable']()){const _0x187f49=this[_0x35185c(0x231)](),_0x5c0597=this[_0x35185c(0xe1)]();_0x5c0597>=0x0&&_0x5c0597!==this['index']()&&this[_0x35185c(0xd7)](_0x5c0597),_0x3902c3&&this[_0x35185c(0x231)]()!==_0x187f49&&this[_0x35185c(0x65)]();}},Window_ItemCategory[_0x1f1bbd(0x187)]['makeCommandList']=function(){const _0x3880f5=_0x1f1bbd;for(const _0x1d1fca of Window_ItemCategory['categoryList']){this['addItemCategory'](_0x1d1fca);}this[_0x3880f5(0xd7)](this['index']());},Window_ItemCategory['prototype']['addItemCategory']=function(_0x19defc){const _0x25721e=_0x1f1bbd,_0x182d8b=_0x19defc[_0x25721e(0x123)],_0x4bc1cb=_0x19defc[_0x25721e(0x135)],_0x2a3a52=_0x19defc[_0x25721e(0x3c2)]||0x0;if(_0x2a3a52>0x0&&!$gameSwitches[_0x25721e(0x29f)](_0x2a3a52))return;let _0x5622c='',_0x3e9e32=_0x25721e(0xab),_0x256e21=_0x182d8b;if(_0x182d8b[_0x25721e(0x124)](/Category:(.*)/i))_0x5622c=String(RegExp['$1'])[_0x25721e(0xc0)]();else{if(Window_ItemCategory[_0x25721e(0x332)][_0x25721e(0x1a9)](_0x182d8b))_0x5622c=VisuMZ[_0x25721e(0x1fc)][_0x25721e(0xb9)][_0x25721e(0x2c5)][_0x182d8b];else{if([_0x25721e(0x3b2),_0x25721e(0x139)][_0x25721e(0x1a9)](_0x182d8b))_0x5622c=TextManager[_0x25721e(0x255)];else{if(_0x182d8b==='KeyItems')_0x5622c=TextManager[_0x25721e(0x103)];else{if(_0x182d8b===_0x25721e(0x36c))_0x5622c=TextManager[_0x25721e(0x14c)];else{if(_0x182d8b===_0x25721e(0x1b4))_0x5622c=TextManager[_0x25721e(0x324)];else{if(_0x182d8b[_0x25721e(0x124)](/WTYPE:(\d+)/i))_0x5622c=$dataSystem[_0x25721e(0xf6)][Number(RegExp['$1'])]||'';else{if(_0x182d8b[_0x25721e(0x124)](/ATYPE:(\d+)/i))_0x5622c=$dataSystem[_0x25721e(0x370)][Number(RegExp['$1'])]||'';else _0x182d8b[_0x25721e(0x124)](/ETYPE:(\d+)/i)&&(_0x5622c=$dataSystem[_0x25721e(0x211)][Number(RegExp['$1'])]||'');}}}}}}}_0x4bc1cb>0x0&&this[_0x25721e(0x2ae)]()!==_0x25721e(0x1fb)&&(_0x5622c='\x5cI[%1]%2'['format'](_0x4bc1cb,_0x5622c)),this[_0x25721e(0x230)](_0x5622c,_0x3e9e32,!![],_0x256e21);},Window_ItemCategory['prototype'][_0x1f1bbd(0x348)]=function(){const _0x18d7cc=_0x1f1bbd;return VisuMZ['ItemsEquipsCore'][_0x18d7cc(0xb9)][_0x18d7cc(0x2c5)][_0x18d7cc(0x264)];},Window_ItemCategory['prototype'][_0x1f1bbd(0x343)]=function(_0x500721){const _0x459d45=_0x1f1bbd,_0x2fcf7d=this[_0x459d45(0x2a6)](_0x500721);if(_0x2fcf7d===_0x459d45(0x249))this['drawItemStyleIconText'](_0x500721);else _0x2fcf7d===_0x459d45(0x3ba)?this[_0x459d45(0xf9)](_0x500721):Window_HorzCommand[_0x459d45(0x187)][_0x459d45(0x343)]['call'](this,_0x500721);},Window_ItemCategory[_0x1f1bbd(0x187)][_0x1f1bbd(0x2ae)]=function(){const _0x4510c8=_0x1f1bbd;return VisuMZ['ItemsEquipsCore'][_0x4510c8(0xb9)][_0x4510c8(0x2c5)][_0x4510c8(0x8a)];},Window_ItemCategory['prototype'][_0x1f1bbd(0x2a6)]=function(_0x3a5fe2){const _0x3c7ba4=_0x1f1bbd;if(_0x3a5fe2<0x0)return'text';const _0x132aad=this[_0x3c7ba4(0x2ae)]();if(_0x132aad!==_0x3c7ba4(0x268))return _0x132aad;else{const _0x188d96=this[_0x3c7ba4(0x26d)](_0x3a5fe2);if(_0x188d96['match'](/\\I\[(\d+)\]/i)){const _0x5c7c73=this['itemLineRect'](_0x3a5fe2),_0x8eb7f7=this[_0x3c7ba4(0x237)](_0x188d96)[_0x3c7ba4(0x171)];return _0x8eb7f7<=_0x5c7c73['width']?'iconText':_0x3c7ba4(0x3ba);}else return _0x3c7ba4(0x1fb);}},Window_ItemCategory['prototype']['drawItemStyleIconText']=function(_0x548190){const _0x242f86=_0x1f1bbd,_0x404425=this['itemLineRect'](_0x548190),_0x4e55a7=this[_0x242f86(0x26d)](_0x548190),_0x656b66=this[_0x242f86(0x237)](_0x4e55a7)[_0x242f86(0x171)];this['changePaintOpacity'](this[_0x242f86(0x197)](_0x548190));const _0xf3707=this['itemTextAlign']();if(_0xf3707===_0x242f86(0x20c))this[_0x242f86(0x32d)](_0x4e55a7,_0x404425['x']+_0x404425[_0x242f86(0x171)]-_0x656b66,_0x404425['y'],_0x656b66);else{if(_0xf3707===_0x242f86(0x1b1)){const _0x270481=_0x404425['x']+Math[_0x242f86(0x1b3)]((_0x404425['width']-_0x656b66)/0x2);this[_0x242f86(0x32d)](_0x4e55a7,_0x270481,_0x404425['y'],_0x656b66);}else this['drawTextEx'](_0x4e55a7,_0x404425['x'],_0x404425['y'],_0x656b66);}},Window_ItemCategory[_0x1f1bbd(0x187)][_0x1f1bbd(0xf9)]=function(_0x5be5f7){const _0x8b3fda=_0x1f1bbd,_0x585708=this[_0x8b3fda(0x26d)](_0x5be5f7);if(_0x585708[_0x8b3fda(0x124)](/\\I\[(\d+)\]/i)){const _0x54d1c2=Number(RegExp['$1'])||0x0,_0xe19f36=this[_0x8b3fda(0x136)](_0x5be5f7),_0x56c65c=_0xe19f36['x']+Math[_0x8b3fda(0x1b3)]((_0xe19f36['width']-ImageManager[_0x8b3fda(0x2ba)])/0x2),_0x34acbf=_0xe19f36['y']+(_0xe19f36[_0x8b3fda(0x1d6)]-ImageManager[_0x8b3fda(0x2e4)])/0x2;this[_0x8b3fda(0x20d)](_0x54d1c2,_0x56c65c,_0x34acbf);}},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x371)]=Window_ItemCategory[_0x1f1bbd(0x187)]['setItemWindow'],Window_ItemCategory['prototype'][_0x1f1bbd(0x140)]=function(_0x1d724e){const _0xa26e9b=_0x1f1bbd;VisuMZ[_0xa26e9b(0x1fc)][_0xa26e9b(0x371)][_0xa26e9b(0x358)](this,_0x1d724e),_0x1d724e[_0xa26e9b(0xeb)]=this;},Window_ItemCategory['prototype'][_0x1f1bbd(0x28b)]=function(){const _0xa74c8b=_0x1f1bbd;Window_HorzCommand[_0xa74c8b(0x187)][_0xa74c8b(0x28b)][_0xa74c8b(0x358)](this);if(this[_0xa74c8b(0x1e2)])this[_0xa74c8b(0x2be)]();},Window_ItemCategory[_0x1f1bbd(0x187)][_0x1f1bbd(0x2be)]=function(){const _0x43eaca=_0x1f1bbd,_0x1df3dc=this[_0x43eaca(0x1e2)];_0x1df3dc[_0x43eaca(0x1be)][_0x43eaca(0x29d)]();const _0x220f36=this['categoryStyleCheck'](this[_0x43eaca(0x231)]());if(_0x220f36==='icon'){const _0xaac00c=this[_0x43eaca(0x136)](this['index']());let _0xbd9c70=this[_0x43eaca(0x26d)](this[_0x43eaca(0x231)]());_0xbd9c70=_0xbd9c70[_0x43eaca(0x8d)](/\\I\[(\d+)\]/gi,''),_0x1df3dc[_0x43eaca(0xe9)](),this['categoryNameWindowDrawBackground'](_0xbd9c70,_0xaac00c),this[_0x43eaca(0x345)](_0xbd9c70,_0xaac00c),this['categoryNameWindowCenter'](_0xbd9c70,_0xaac00c);}},Window_ItemCategory[_0x1f1bbd(0x187)][_0x1f1bbd(0x84)]=function(_0x3a7947,_0x47189c){},Window_ItemCategory['prototype'][_0x1f1bbd(0x345)]=function(_0x59a4e5,_0x36605b){const _0x52e6cd=_0x1f1bbd,_0x3d282d=this['_categoryNameWindow'];_0x3d282d[_0x52e6cd(0x1d9)](_0x59a4e5,0x0,_0x36605b['y'],_0x3d282d[_0x52e6cd(0xc6)],'center');},Window_ItemCategory['prototype'][_0x1f1bbd(0x19d)]=function(_0x10a570,_0x541931){const _0x13aee7=_0x1f1bbd,_0x3048c7=this['_categoryNameWindow'],_0x7a821b=$gameSystem[_0x13aee7(0x2e0)](),_0x457007=_0x541931['x']+Math[_0x13aee7(0x1b3)](_0x541931[_0x13aee7(0x171)]/0x2)+_0x7a821b;_0x3048c7['x']=_0x3048c7[_0x13aee7(0x171)]/-0x2+_0x457007,_0x3048c7['y']=Math['floor'](_0x541931[_0x13aee7(0x1d6)]/0x2);},Window_ItemList[_0x1f1bbd(0x187)][_0x1f1bbd(0x1a4)]=function(){const _0x45a747=_0x1f1bbd;if(this['isCursorMovable']()){const _0x4e72f0=this[_0x45a747(0x231)]();if(this[_0x45a747(0x298)]()<=0x1)!this[_0x45a747(0x33e)](_0x45a747(0x3aa))&&Input[_0x45a747(0xb6)]('pagedown')&&this[_0x45a747(0x30c)](),!this[_0x45a747(0x33e)](_0x45a747(0x38a))&&Input[_0x45a747(0xb6)](_0x45a747(0x38a))&&this[_0x45a747(0x2d3)]();else this[_0x45a747(0x298)]()>0x1&&(Input['isRepeated'](_0x45a747(0x20c))&&this[_0x45a747(0x1c2)](Input[_0x45a747(0xb6)]('right')),Input[_0x45a747(0xe2)](_0x45a747(0x214))&&this[_0x45a747(0x387)](Input[_0x45a747(0xb6)](_0x45a747(0x214))),this['limitedPageUpDownSceneCheck']()?(Input[_0x45a747(0xb6)]('pagedown')&&Input[_0x45a747(0x193)]('shift')&&this[_0x45a747(0x30c)](),Input['isTriggered'](_0x45a747(0x38a))&&Input['isPressed']('shift')&&this['cursorPageup']()):(Input[_0x45a747(0xb6)](_0x45a747(0x3aa))&&this[_0x45a747(0x30c)](),Input[_0x45a747(0xb6)](_0x45a747(0x38a))&&this['cursorPageup']()));Input['isRepeated'](_0x45a747(0x131))&&(Input[_0x45a747(0x193)](_0x45a747(0x8e))&&this[_0x45a747(0x170)]()?this[_0x45a747(0x30c)]():this['cursorDown'](Input[_0x45a747(0xb6)](_0x45a747(0x131)))),Input[_0x45a747(0xe2)]('up')&&(Input[_0x45a747(0x193)]('shift')&&this[_0x45a747(0x170)]()?this[_0x45a747(0x2d3)]():this[_0x45a747(0xe3)](Input[_0x45a747(0xb6)]('up'))),Imported[_0x45a747(0x24a)]&&this[_0x45a747(0x206)](),this[_0x45a747(0x231)]()!==_0x4e72f0&&this[_0x45a747(0x65)]();}},Window_ItemList[_0x1f1bbd(0x187)][_0x1f1bbd(0x13f)]=function(){const _0x1dc9d4=_0x1f1bbd,_0x3544b9=SceneManager[_0x1dc9d4(0x23e)],_0x42c9ea=[Scene_Item,Scene_Shop];return _0x42c9ea[_0x1dc9d4(0x1a9)](_0x3544b9[_0x1dc9d4(0x6e)]);},Window_ItemList[_0x1f1bbd(0x187)]['activate']=function(){const _0x293083=_0x1f1bbd;Window_Selectable[_0x293083(0x187)][_0x293083(0x339)][_0x293083(0x358)](this),this[_0x293083(0xeb)]&&this[_0x293083(0xeb)][_0x293083(0x2c3)]()&&this['_categoryWindow'][_0x293083(0x339)]();},Window_ItemList[_0x1f1bbd(0x187)][_0x1f1bbd(0xf2)]=function(){const _0x8c8f62=_0x1f1bbd;Window_Selectable[_0x8c8f62(0x187)][_0x8c8f62(0xf2)][_0x8c8f62(0x358)](this),this[_0x8c8f62(0xeb)]&&this[_0x8c8f62(0xeb)][_0x8c8f62(0x2c3)]()&&this[_0x8c8f62(0xeb)][_0x8c8f62(0xf2)]();},Window_ItemList[_0x1f1bbd(0x187)][_0x1f1bbd(0x128)]=function(_0x570ffb){const _0x296d10=_0x1f1bbd;this[_0x296d10(0x274)]!==_0x570ffb&&(this[_0x296d10(0x274)]=_0x570ffb,this['refresh'](),this[_0x296d10(0xeb)]&&this[_0x296d10(0xeb)][_0x296d10(0x2c3)]()?this[_0x296d10(0x1f7)](0x0):this[_0x296d10(0x300)](0x0,0x0));},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x341)]=Window_ItemList[_0x1f1bbd(0x187)][_0x1f1bbd(0x298)],Window_ItemList[_0x1f1bbd(0x187)][_0x1f1bbd(0x298)]=function(){const _0x19fda7=_0x1f1bbd;if(SceneManager[_0x19fda7(0x23e)][_0x19fda7(0x6e)]===Scene_Battle)return VisuMZ['ItemsEquipsCore'][_0x19fda7(0x341)][_0x19fda7(0x358)](this);else return SceneManager[_0x19fda7(0x23e)]['constructor']===Scene_Map?VisuMZ[_0x19fda7(0x1fc)][_0x19fda7(0x341)][_0x19fda7(0x358)](this):VisuMZ[_0x19fda7(0x1fc)][_0x19fda7(0xb9)][_0x19fda7(0x305)]['ListWindowCols'];},VisuMZ['ItemsEquipsCore'][_0x1f1bbd(0x282)]=Window_ItemList[_0x1f1bbd(0x187)][_0x1f1bbd(0x3c7)],Window_ItemList[_0x1f1bbd(0x187)]['colSpacing']=function(){const _0x5e4ed6=_0x1f1bbd;return this[_0x5e4ed6(0x298)]()<=0x1?Window_Selectable['prototype'][_0x5e4ed6(0x3c7)][_0x5e4ed6(0x358)](this):VisuMZ[_0x5e4ed6(0x1fc)][_0x5e4ed6(0x282)][_0x5e4ed6(0x358)](this);},Window_ItemList[_0x1f1bbd(0x187)][_0x1f1bbd(0x1a9)]=function(_0x5d2a04){const _0x244ef5=_0x1f1bbd;switch(this['_category']){case _0x244ef5(0x3b2):return DataManager[_0x244ef5(0x1ce)](_0x5d2a04);case _0x244ef5(0x139):return DataManager[_0x244ef5(0x1ce)](_0x5d2a04)&&_0x5d2a04[_0x244ef5(0x114)]===0x1;case _0x244ef5(0xa2):return DataManager[_0x244ef5(0x1ce)](_0x5d2a04)&&_0x5d2a04[_0x244ef5(0x114)]===0x2;case'HiddenItemA':return DataManager[_0x244ef5(0x1ce)](_0x5d2a04)&&_0x5d2a04[_0x244ef5(0x114)]===0x3;case'HiddenItemB':return DataManager[_0x244ef5(0x1ce)](_0x5d2a04)&&_0x5d2a04[_0x244ef5(0x114)]===0x4;case _0x244ef5(0x2a0):return DataManager[_0x244ef5(0x1ce)](_0x5d2a04)&&_0x5d2a04[_0x244ef5(0x399)];case _0x244ef5(0x311):return DataManager['isItem'](_0x5d2a04)&&!_0x5d2a04[_0x244ef5(0x399)];case _0x244ef5(0x2c0):return DataManager[_0x244ef5(0x1ce)](_0x5d2a04)&&[0x0][_0x244ef5(0x1a9)](_0x5d2a04['occasion']);case _0x244ef5(0x333):return DataManager[_0x244ef5(0x1ce)](_0x5d2a04)&&[0x0,0x1][_0x244ef5(0x1a9)](_0x5d2a04[_0x244ef5(0x391)]);case _0x244ef5(0x99):return DataManager[_0x244ef5(0x1ce)](_0x5d2a04)&&[0x0,0x2][_0x244ef5(0x1a9)](_0x5d2a04[_0x244ef5(0x391)]);case'NeverUsable':return DataManager[_0x244ef5(0x1ce)](_0x5d2a04)&&[0x3][_0x244ef5(0x1a9)](_0x5d2a04['occasion']);case'AllWeapons':return DataManager[_0x244ef5(0x160)](_0x5d2a04);case _0x244ef5(0x1b4):return DataManager[_0x244ef5(0x174)](_0x5d2a04);default:if(this['_category'][_0x244ef5(0x124)](/WTYPE:(\d+)/i))return DataManager[_0x244ef5(0x160)](_0x5d2a04)&&_0x5d2a04[_0x244ef5(0xdb)]===Number(RegExp['$1']);else{if(this[_0x244ef5(0x274)]['match'](/WTYPE:(.*)/i)){const _0x4ea994=$dataSystem[_0x244ef5(0xf6)]['indexOf'](String(RegExp['$1'])['trim']());return DataManager['isWeapon'](_0x5d2a04)&&_0x5d2a04[_0x244ef5(0xdb)]===_0x4ea994;}else{if(this[_0x244ef5(0x274)][_0x244ef5(0x124)](/ATYPE:(\d+)/i))return DataManager[_0x244ef5(0x174)](_0x5d2a04)&&_0x5d2a04[_0x244ef5(0x130)]===Number(RegExp['$1']);else{if(this[_0x244ef5(0x274)][_0x244ef5(0x124)](/ATYPE:(.*)/i)){const _0x2a04c1=$dataSystem[_0x244ef5(0x370)][_0x244ef5(0x9b)](String(RegExp['$1'])[_0x244ef5(0xc0)]());return DataManager[_0x244ef5(0x174)](_0x5d2a04)&&_0x5d2a04['atypeId']===_0x2a04c1;}else{if(this['_category'][_0x244ef5(0x124)](/ETYPE:(\d+)/i))return!!_0x5d2a04&&_0x5d2a04[_0x244ef5(0x9d)]===Number(RegExp['$1']);else{if(this[_0x244ef5(0x274)]['match'](/ETYPE:(.*)/i)){const _0x33ea58=$dataSystem['equipTypes'][_0x244ef5(0x9b)](String(RegExp['$1'])[_0x244ef5(0xc0)]());return DataManager[_0x244ef5(0x174)](_0x5d2a04)&&_0x5d2a04[_0x244ef5(0x9d)]===_0x33ea58;}else{if(this[_0x244ef5(0x274)]['match'](/Category:(.*)/i))return!!_0x5d2a04&&_0x5d2a04[_0x244ef5(0x272)][_0x244ef5(0x1a9)](String(RegExp['$1'])['toUpperCase']()[_0x244ef5(0xc0)]());}}}}}}}return![];},Window_ItemList[_0x1f1bbd(0x187)][_0x1f1bbd(0x1e5)]=function(){return!![];},VisuMZ[_0x1f1bbd(0x1fc)]['Window_ItemList_drawItem']=Window_ItemList['prototype'][_0x1f1bbd(0x343)],Window_ItemList['prototype'][_0x1f1bbd(0x343)]=function(_0x53961f){const _0x3206eb=_0x1f1bbd;VisuMZ[_0x3206eb(0x1fc)][_0x3206eb(0x179)][_0x3206eb(0x358)](this,_0x53961f),this[_0x3206eb(0x295)](_0x53961f);},Window_ItemList[_0x1f1bbd(0x187)][_0x1f1bbd(0x308)]=function(_0x118991,_0x412bb4,_0x1517f8,_0x4cc915){const _0x53540d=_0x1f1bbd;Window_Selectable[_0x53540d(0x187)][_0x53540d(0x308)]['call'](this,_0x118991,_0x412bb4,_0x1517f8,_0x4cc915);},Window_ItemList['prototype'][_0x1f1bbd(0x295)]=function(_0x2b3118){const _0x3a6e87=_0x1f1bbd,_0x3a9b2d=this[_0x3a6e87(0x17b)](_0x2b3118);if(!_0x3a9b2d||!this['isShowNew']())return;if(!$gameParty[_0x3a6e87(0x119)](_0x3a9b2d))return;const _0x2224d6=this[_0x3a6e87(0x136)](_0x2b3118),_0x554c60=_0x2224d6['x'],_0x2a891c=_0x2224d6['y']+(this[_0x3a6e87(0x3a5)]()-ImageManager[_0x3a6e87(0x2e4)])/0x2,_0x921bab=VisuMZ[_0x3a6e87(0x1fc)]['Settings']['New'][_0x3a6e87(0x379)],_0x298ff7=VisuMZ[_0x3a6e87(0x1fc)][_0x3a6e87(0xb9)][_0x3a6e87(0x11a)][_0x3a6e87(0x17c)];this[_0x3a6e87(0x337)](_0x3a9b2d,_0x554c60+_0x921bab,_0x2a891c+_0x298ff7);},Window_ItemList[_0x1f1bbd(0x187)][_0x1f1bbd(0x2a2)]=function(_0x5cdc77){const _0x41a206=_0x1f1bbd;this[_0x41a206(0xf5)]=_0x5cdc77,this[_0x41a206(0x28b)]();},VisuMZ[_0x1f1bbd(0x1fc)]['Window_ItemList_updateHelp']=Window_ItemList[_0x1f1bbd(0x187)][_0x1f1bbd(0x39e)],Window_ItemList[_0x1f1bbd(0x187)][_0x1f1bbd(0x39e)]=function(){const _0x2c9825=_0x1f1bbd;VisuMZ[_0x2c9825(0x1fc)][_0x2c9825(0x37c)][_0x2c9825(0x358)](this),this['_statusWindow']&&this[_0x2c9825(0xf5)][_0x2c9825(0x6e)]===Window_ShopStatus&&this[_0x2c9825(0xf5)][_0x2c9825(0x87)](this['item']());},Window_BattleItem[_0x1f1bbd(0x187)][_0x1f1bbd(0x21f)]=function(_0x11224d){const _0x5e2ff9=_0x1f1bbd;return BattleManager[_0x5e2ff9(0x328)]()?BattleManager[_0x5e2ff9(0x328)]()[_0x5e2ff9(0x36d)](_0x11224d):Window_ItemList[_0x5e2ff9(0x187)]['isEnabled'][_0x5e2ff9(0x358)](this,_0x11224d);},Window_EventItem[_0x1f1bbd(0x187)][_0x1f1bbd(0x1e5)]=function(){return![];},Window_EquipStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x104)]=function(){const _0x4ee08f=_0x1f1bbd;return VisuMZ[_0x4ee08f(0x1fc)][_0x4ee08f(0xb9)]['EquipScene'][_0x4ee08f(0x38e)];},VisuMZ[_0x1f1bbd(0x1fc)]['Window_EquipStatus_refresh']=Window_EquipStatus[_0x1f1bbd(0x187)]['refresh'],Window_EquipStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x16c)]=function(){const _0x14ddaa=_0x1f1bbd;this['hideAdditionalSprites'](),this[_0x14ddaa(0xe9)]();if(this[_0x14ddaa(0x1cf)])this[_0x14ddaa(0x1cf)]['refresh']();this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x14ddaa(0x81)]():VisuMZ['ItemsEquipsCore'][_0x14ddaa(0x15e)][_0x14ddaa(0x358)](this);},Window_EquipStatus[_0x1f1bbd(0x187)]['prepareRefreshItemsEquipsCoreLayout']=function(){const _0xd89491=_0x1f1bbd;this['contents'][_0xd89491(0x29d)]();if(!this[_0xd89491(0x1cf)])return;if(this[_0xd89491(0x16e)]()){const _0x12b94f=ImageManager['loadPicture'](this[_0xd89491(0x1cf)][_0xd89491(0x37d)]());_0x12b94f[_0xd89491(0x393)](this[_0xd89491(0xd8)]['bind'](this));}else this[_0xd89491(0x6a)]();},Window_EquipStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x16e)]=function(){const _0x34a44a=_0x1f1bbd;return Imported[_0x34a44a(0x27e)]&&this[_0x34a44a(0x1cf)][_0x34a44a(0x37d)]()!==''&&VisuMZ[_0x34a44a(0x1fc)][_0x34a44a(0xb9)][_0x34a44a(0x1ec)]['MenuPortraits'];},Window_EquipStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0xd8)]=function(){const _0x3fda7b=_0x1f1bbd;VisuMZ['ItemsEquipsCore'][_0x3fda7b(0xb9)][_0x3fda7b(0x1ec)][_0x3fda7b(0x12f)][_0x3fda7b(0x358)](this),this[_0x3fda7b(0x125)]();},Window_EquipStatus['prototype'][_0x1f1bbd(0x6a)]=function(){const _0x109262=_0x1f1bbd;VisuMZ[_0x109262(0x1fc)][_0x109262(0xb9)][_0x109262(0x1ec)][_0x109262(0x1df)]['call'](this),this['drawParamsItemsEquipsCore']();},Window_EquipStatus['prototype'][_0x1f1bbd(0x125)]=function(){const _0x1e5f65=_0x1f1bbd;this['resetFontSettings'](),VisuMZ[_0x1e5f65(0x1fc)]['Settings'][_0x1e5f65(0x1ec)][_0x1e5f65(0x7d)][_0x1e5f65(0x358)](this);},Window_EquipStatus['prototype'][_0x1f1bbd(0xed)]=function(_0x10b976,_0x3737e1,_0x1d831b,_0x1e80c3,_0x12412f){const _0x88af07=_0x1f1bbd,_0x306085=ImageManager[_0x88af07(0xbe)](_0x10b976[_0x88af07(0x37d)]()),_0xe9c09d=this[_0x88af07(0xc6)]-_0x306085['width'];_0x3737e1+=_0xe9c09d/0x2;if(_0xe9c09d<0x0)_0x1e80c3-=_0xe9c09d;Window_StatusBase[_0x88af07(0x187)]['drawItemActorMenuImage'][_0x88af07(0x358)](this,_0x10b976,_0x3737e1,_0x1d831b,_0x1e80c3,_0x12412f);},Window_EquipStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0xff)]=function(){const _0x37d805=_0x1f1bbd;return Imported[_0x37d805(0x24a)]?VisuMZ[_0x37d805(0x151)][_0x37d805(0xb9)]['Param'][_0x37d805(0x20f)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus['prototype']['paramValueFontSize']=function(){const _0x38386d=_0x1f1bbd;return VisuMZ[_0x38386d(0x1fc)]['Settings'][_0x38386d(0x1ec)][_0x38386d(0x222)];},Window_EquipStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x2f4)]=function(){const _0x503101=_0x1f1bbd;return Imported[_0x503101(0x24a)]&&VisuMZ[_0x503101(0x151)][_0x503101(0xb9)][_0x503101(0xb7)]['DrawIcons'];},Window_EquipStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x1a8)]=function(_0x3ddd14,_0x5c0152,_0x93c2e0,_0x3122e5){const _0x38e7f0=_0x1f1bbd,_0x5b328c=this[_0x38e7f0(0x32c)]();Imported[_0x38e7f0(0x24a)]?this[_0x38e7f0(0x386)](_0x5c0152+_0x5b328c,_0x93c2e0,_0x3122e5,_0x3ddd14,![]):this[_0x38e7f0(0x1d9)](TextManager[_0x38e7f0(0x2ea)](_0x3ddd14),_0x5c0152+_0x5b328c,_0x93c2e0,_0x3122e5);},Window_EquipStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x213)]=function(_0x6bb1e9,_0x479780,_0x3f6e7c,_0x57fe40){const _0x122e03=_0x1f1bbd,_0x18a9b0=this['itemPadding']();let _0x2eae4d=0x0;Imported[_0x122e03(0x24a)]?_0x2eae4d=this[_0x122e03(0x1cf)][_0x122e03(0x7c)](_0x6bb1e9,!![]):_0x2eae4d=this[_0x122e03(0x1cf)][_0x122e03(0x2ea)](_0x6bb1e9);const _0x3ad18e=_0x2eae4d;this['drawText'](_0x2eae4d,_0x479780,_0x3f6e7c,_0x57fe40-_0x18a9b0,'right');},Window_EquipStatus[_0x1f1bbd(0x187)]['drawUpdatedAfterParamValue']=function(_0x3dcdf8,_0x15ae4e,_0x1ef25a,_0x353c78){const _0x2c0b50=_0x1f1bbd,_0x567da2=this[_0x2c0b50(0x32c)]();let _0x96b523=0x0,_0x379d98=0x0,_0x5d4427='';if(this[_0x2c0b50(0x1a7)]){Imported['VisuMZ_0_CoreEngine']?(_0x96b523=this['_actor'][_0x2c0b50(0x7c)](_0x3dcdf8,![]),_0x379d98=this[_0x2c0b50(0x1a7)][_0x2c0b50(0x7c)](_0x3dcdf8,![]),_0x5d4427=this[_0x2c0b50(0x1a7)][_0x2c0b50(0x7c)](_0x3dcdf8,!![])):(_0x96b523=this[_0x2c0b50(0x1cf)][_0x2c0b50(0x2ea)](_0x3dcdf8),_0x379d98=this['_tempActor'][_0x2c0b50(0x2ea)](_0x3dcdf8),_0x5d4427=this[_0x2c0b50(0x1a7)][_0x2c0b50(0x2ea)](_0x3dcdf8));const _0x127ee6=_0x96b523,_0x539cbf=_0x379d98;diffValue=_0x539cbf-_0x127ee6,this['changeTextColor'](ColorManager[_0x2c0b50(0x3b0)](diffValue)),this[_0x2c0b50(0x1d9)](_0x5d4427,_0x15ae4e,_0x1ef25a,_0x353c78-_0x567da2,_0x2c0b50(0x20c));}},Window_EquipStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x190)]=function(_0x8d409e,_0x323b42,_0x3c9323,_0x2629f0){const _0x59ef28=_0x1f1bbd,_0x5a12ea=this[_0x59ef28(0x32c)]();let _0xa0a502=0x0,_0x5275ef=0x0,_0x159829=![];if(this['_tempActor']){Imported[_0x59ef28(0x24a)]?(_0xa0a502=this['_actor']['paramValueByName'](_0x8d409e,![]),_0x5275ef=this['_tempActor'][_0x59ef28(0x7c)](_0x8d409e,![]),_0x159829=String(this[_0x59ef28(0x1cf)][_0x59ef28(0x7c)](_0x8d409e,!![]))['match'](/([%％])/i)):(_0xa0a502=this[_0x59ef28(0x1cf)][_0x59ef28(0x2ea)](_0x8d409e),_0x5275ef=this[_0x59ef28(0x1a7)][_0x59ef28(0x2ea)](_0x8d409e),_0x159829=_0xa0a502%0x1!==0x0||_0x5275ef%0x1!==0x0);const _0x21596f=_0xa0a502,_0x2c49c2=_0x5275ef,_0x173b45=_0x2c49c2-_0x21596f;let _0x32702c=_0x173b45;if(_0x159829)_0x32702c=Math[_0x59ef28(0x112)](_0x173b45*0x64)+'%';_0x173b45!==0x0&&(this[_0x59ef28(0xb3)](ColorManager['paramchangeTextColor'](_0x173b45)),_0x32702c=(_0x173b45>0x0?_0x59ef28(0x22c):_0x59ef28(0x1e3))['format'](_0x32702c),this[_0x59ef28(0x1d9)](_0x32702c,_0x323b42+_0x5a12ea,_0x3c9323,_0x2629f0,_0x59ef28(0x214)));}},Window_EquipStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x35a)]=function(_0x44e082,_0x160315,_0xb56c0f,_0x487097,_0x380bd4){const _0x4a779a=_0x1f1bbd;if(VisuMZ['ItemsEquipsCore'][_0x4a779a(0xb9)][_0x4a779a(0x1ec)][_0x4a779a(0x33b)]===![])return;_0x380bd4=Math[_0x4a779a(0x31a)](_0x380bd4||0x1,0x1);while(_0x380bd4--){_0x487097=_0x487097||this[_0x4a779a(0x3a5)](),this['contents'][_0x4a779a(0x2b0)]=0xa0;const _0x23a337=ColorManager[_0x4a779a(0x2d0)]();this[_0x4a779a(0x1be)]['fillRect'](_0x44e082+0x1,_0x160315+0x1,_0xb56c0f-0x2,_0x487097-0x2,_0x23a337),this[_0x4a779a(0x1be)][_0x4a779a(0x2b0)]=0xff;}},ColorManager[_0x1f1bbd(0x2d0)]=function(){const _0x207d9d=_0x1f1bbd,_0x388233=VisuMZ[_0x207d9d(0x1fc)]['Settings'][_0x207d9d(0x1ec)];let _0x4310bc=_0x388233[_0x207d9d(0x316)]!==undefined?_0x388233['BackRectColor']:0x13;return ColorManager[_0x207d9d(0x2c8)](_0x4310bc);},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x37e)]=Window_EquipCommand['prototype']['initialize'],Window_EquipCommand['prototype'][_0x1f1bbd(0x1ea)]=function(_0xd9f1e8){const _0x1d1d93=_0x1f1bbd;VisuMZ[_0x1d1d93(0x1fc)][_0x1d1d93(0x37e)][_0x1d1d93(0x358)](this,_0xd9f1e8),this[_0x1d1d93(0xd6)](_0xd9f1e8);},Window_EquipCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0xd6)]=function(_0x2b1a28){const _0x58d43b=_0x1f1bbd,_0xf4b2a9=new Rectangle(0x0,0x0,_0x2b1a28[_0x58d43b(0x171)],_0x2b1a28[_0x58d43b(0x1d6)]);this['_commandNameWindow']=new Window_Base(_0xf4b2a9),this[_0x58d43b(0x375)][_0x58d43b(0x242)]=0x0,this[_0x58d43b(0xe4)](this[_0x58d43b(0x375)]),this[_0x58d43b(0x1dd)]();},Window_EquipCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0x28b)]=function(){const _0x1995c0=_0x1f1bbd;Window_HorzCommand[_0x1995c0(0x187)][_0x1995c0(0x28b)][_0x1995c0(0x358)](this);if(this['_commandNameWindow'])this[_0x1995c0(0x1dd)]();},Window_EquipCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0x1dd)]=function(){const _0x9728a=_0x1f1bbd,_0xd0815c=this[_0x9728a(0x375)];_0xd0815c[_0x9728a(0x1be)]['clear']();const _0x2050e5=this[_0x9728a(0x319)](this[_0x9728a(0x231)]());if(_0x2050e5==='icon'){const _0xcfe9d5=this[_0x9728a(0x136)](this[_0x9728a(0x231)]());let _0x28163b=this[_0x9728a(0x26d)](this['index']());_0x28163b=_0x28163b['replace'](/\\I\[(\d+)\]/gi,''),_0xd0815c[_0x9728a(0xe9)](),this[_0x9728a(0x35c)](_0x28163b,_0xcfe9d5),this[_0x9728a(0x273)](_0x28163b,_0xcfe9d5),this[_0x9728a(0x232)](_0x28163b,_0xcfe9d5);}},Window_EquipCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0x35c)]=function(_0x3994c8,_0x3e3bec){},Window_EquipCommand['prototype'][_0x1f1bbd(0x273)]=function(_0x14be7b,_0x39ef9c){const _0x3f6027=_0x1f1bbd,_0x313128=this[_0x3f6027(0x375)];_0x313128[_0x3f6027(0x1d9)](_0x14be7b,0x0,_0x39ef9c['y'],_0x313128[_0x3f6027(0xc6)],_0x3f6027(0x1b1));},Window_EquipCommand['prototype'][_0x1f1bbd(0x232)]=function(_0x1fbb33,_0xa123e8){const _0x26ca04=_0x1f1bbd,_0x486e9b=this['_commandNameWindow'],_0x134d1e=$gameSystem[_0x26ca04(0x2e0)](),_0x482488=_0xa123e8['x']+Math[_0x26ca04(0x1b3)](_0xa123e8[_0x26ca04(0x171)]/0x2)+_0x134d1e;_0x486e9b['x']=_0x486e9b['width']/-0x2+_0x482488,_0x486e9b['y']=Math[_0x26ca04(0x1b3)](_0xa123e8[_0x26ca04(0x1d6)]/0x2);},Window_EquipCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0x2c3)]=function(){const _0x34cb28=_0x1f1bbd;return Imported[_0x34cb28(0x24a)]&&Window_HorzCommand[_0x34cb28(0x187)][_0x34cb28(0x2c3)][_0x34cb28(0x358)](this);},Window_EquipCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0xd2)]=function(){const _0x4f207c=_0x1f1bbd;if(this[_0x4f207c(0x361)]()===_0x4f207c(0x1f8))Window_HorzCommand[_0x4f207c(0x187)][_0x4f207c(0xd2)][_0x4f207c(0x358)](this);},Window_EquipCommand[_0x1f1bbd(0x187)]['processCursorMoveModernControls']=function(){const _0x1007d3=_0x1f1bbd;!this['processCursorSpecialCheckModernControls']()&&Window_HorzCommand[_0x1007d3(0x187)][_0x1007d3(0x1a4)][_0x1007d3(0x358)](this);},Window_EquipCommand[_0x1f1bbd(0x187)]['processCursorSpecialCheckModernControls']=function(){const _0x38c8d1=_0x1f1bbd;if(!this[_0x38c8d1(0x24c)]())return![];if(SceneManager[_0x38c8d1(0x23e)]['constructor']!==Scene_Equip)return![];return Input['isTriggered'](_0x38c8d1(0x131))&&(this[_0x38c8d1(0x65)](),SceneManager[_0x38c8d1(0x23e)]['commandEquip'](),SceneManager[_0x38c8d1(0x23e)][_0x38c8d1(0x15b)][_0x38c8d1(0x1f7)](-0x1)),![];},Window_EquipCommand['prototype'][_0x1f1bbd(0x298)]=function(){const _0x1e78ff=_0x1f1bbd;return this['_list']?this[_0x1e78ff(0x288)]['length']:0x3;},Window_EquipCommand['prototype'][_0x1f1bbd(0x2a4)]=function(){const _0x35b9b9=_0x1f1bbd;if(this['isOpen']()&&this['visible']&&SceneManager[_0x35b9b9(0x23e)][_0x35b9b9(0x6e)]===Scene_Equip){if(this[_0x35b9b9(0x20b)]()&&TouchInput[_0x35b9b9(0x2f1)]())this[_0x35b9b9(0x121)](![]);else TouchInput[_0x35b9b9(0xb6)]()&&this[_0x35b9b9(0x121)](!![]);if(TouchInput['isClicked']())this[_0x35b9b9(0x9f)]();else TouchInput[_0x35b9b9(0x2b6)]()&&this[_0x35b9b9(0x88)]();}},Window_EquipCommand['prototype'][_0x1f1bbd(0x121)]=function(_0x1f9cd7){const _0x36482e=_0x1f1bbd;this[_0x36482e(0x2e5)]=![];const _0x3e93d8=this[_0x36482e(0x231)](),_0x3346f8=this['hitIndex'](),_0x5ec674=SceneManager['_scene'][_0x36482e(0x15b)];if(_0x5ec674['isOpen']()&&_0x5ec674[_0x36482e(0x86)]){if(_0x3346f8>=0x0)_0x3346f8===this[_0x36482e(0x231)]()&&(this[_0x36482e(0x2e5)]=!![]),this['activate'](),this['select'](_0x3346f8);else _0x5ec674[_0x36482e(0xe1)]()>=0x0&&(this[_0x36482e(0xf2)](),this[_0x36482e(0x1f2)]());}_0x1f9cd7&&this[_0x36482e(0x231)]()!==_0x3e93d8&&this['playCursorSound']();},Window_EquipCommand['prototype'][_0x1f1bbd(0xa8)]=function(){const _0x35f2b2=_0x1f1bbd;this[_0x35f2b2(0x389)](),this[_0x35f2b2(0x30b)](),this['addClearCommand']();},Window_EquipCommand['prototype'][_0x1f1bbd(0x16c)]=function(){const _0x5c2260=_0x1f1bbd;Window_HorzCommand[_0x5c2260(0x187)]['refresh'][_0x5c2260(0x358)](this),this['refreshCursor']();},Window_EquipCommand[_0x1f1bbd(0x187)]['addEquipCommand']=function(){const _0x10309e=_0x1f1bbd;if(!this[_0x10309e(0x178)]())return;const _0x18f44e=this[_0x10309e(0x350)](),_0x2f59b7=VisuMZ[_0x10309e(0x1fc)][_0x10309e(0xb9)][_0x10309e(0x1ec)][_0x10309e(0x1d7)],_0xca62e=_0x18f44e==='text'?TextManager[_0x10309e(0x2ad)]:_0x10309e(0x326)['format'](_0x2f59b7,TextManager[_0x10309e(0x2ad)]),_0x23e082=this['isEquipCommandEnabled']();this[_0x10309e(0x230)](_0xca62e,_0x10309e(0x1f8),_0x23e082);},Window_EquipCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0x178)]=function(){return!this['isUseModernControls']();},Window_EquipCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0xf7)]=function(){return!![];},Window_EquipCommand['prototype'][_0x1f1bbd(0x30b)]=function(){const _0x502d12=_0x1f1bbd;if(!this[_0x502d12(0xea)]())return;const _0x3058e2=this[_0x502d12(0x350)](),_0x12e57a=VisuMZ[_0x502d12(0x1fc)][_0x502d12(0xb9)]['EquipScene']['CmdIconOptimize'],_0x1ebfde=_0x3058e2==='text'?TextManager[_0x502d12(0x35d)]:_0x502d12(0x326)[_0x502d12(0x2dd)](_0x12e57a,TextManager['optimize']),_0x4bc6a6=this[_0x502d12(0x149)]();this[_0x502d12(0x230)](_0x1ebfde,'optimize',_0x4bc6a6);},Window_EquipCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0xea)]=function(){const _0x46a4d6=_0x1f1bbd;return VisuMZ['ItemsEquipsCore']['Settings'][_0x46a4d6(0x1ec)]['CommandAddOptimize'];},Window_EquipCommand[_0x1f1bbd(0x187)]['isOptimizeCommandEnabled']=function(){return!![];},Window_EquipCommand[_0x1f1bbd(0x187)]['addClearCommand']=function(){const _0x49f715=_0x1f1bbd;if(!this[_0x49f715(0x2cf)]())return;const _0x293efd=this['commandStyle'](),_0x255459=VisuMZ[_0x49f715(0x1fc)]['Settings']['EquipScene']['CmdIconClear'],_0x46ea48=_0x293efd===_0x49f715(0x1fb)?TextManager[_0x49f715(0x29d)]:_0x49f715(0x326)[_0x49f715(0x2dd)](_0x255459,TextManager[_0x49f715(0x29d)]),_0x5b6faf=this[_0x49f715(0x21b)]();this[_0x49f715(0x230)](_0x46ea48,'clear',_0x5b6faf);},Window_EquipCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0x2cf)]=function(){const _0x4ea8e0=_0x1f1bbd;return VisuMZ[_0x4ea8e0(0x1fc)][_0x4ea8e0(0xb9)][_0x4ea8e0(0x1ec)][_0x4ea8e0(0xf4)];},Window_EquipCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0x21b)]=function(){return!![];},Window_EquipCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0x348)]=function(){const _0x4496f3=_0x1f1bbd;return VisuMZ[_0x4496f3(0x1fc)][_0x4496f3(0xb9)]['EquipScene'][_0x4496f3(0x98)];},Window_EquipCommand['prototype'][_0x1f1bbd(0x343)]=function(_0x41c14c){const _0x4b0ae4=_0x1f1bbd,_0x139caf=this[_0x4b0ae4(0x319)](_0x41c14c);if(_0x139caf===_0x4b0ae4(0x249))this['drawItemStyleIconText'](_0x41c14c);else _0x139caf===_0x4b0ae4(0x3ba)?this[_0x4b0ae4(0xf9)](_0x41c14c):Window_HorzCommand['prototype'][_0x4b0ae4(0x343)][_0x4b0ae4(0x358)](this,_0x41c14c);},Window_EquipCommand['prototype'][_0x1f1bbd(0x350)]=function(){const _0x5921de=_0x1f1bbd;return VisuMZ[_0x5921de(0x1fc)][_0x5921de(0xb9)][_0x5921de(0x1ec)][_0x5921de(0xe0)];},Window_EquipCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0x319)]=function(_0x5f2de0){const _0x58398b=_0x1f1bbd;if(_0x5f2de0<0x0)return'text';const _0x2a8a2f=this['commandStyle']();if(_0x2a8a2f!=='auto')return _0x2a8a2f;else{if(this[_0x58398b(0x1c4)]()>0x0){const _0x58d5b3=this[_0x58398b(0x26d)](_0x5f2de0);if(_0x58d5b3[_0x58398b(0x124)](/\\I\[(\d+)\]/i)){const _0x5a51e6=this[_0x58398b(0x136)](_0x5f2de0),_0x57bddb=this[_0x58398b(0x237)](_0x58d5b3)[_0x58398b(0x171)];return _0x57bddb<=_0x5a51e6['width']?_0x58398b(0x249):_0x58398b(0x3ba);}}}return _0x58398b(0x1fb);},Window_EquipCommand[_0x1f1bbd(0x187)]['drawItemStyleIconText']=function(_0x5048b4){const _0x303d80=_0x1f1bbd,_0xfaa947=this[_0x303d80(0x136)](_0x5048b4),_0x204309=this[_0x303d80(0x26d)](_0x5048b4),_0x381fb4=this['textSizeEx'](_0x204309)['width'];this[_0x303d80(0x6b)](this[_0x303d80(0x197)](_0x5048b4));const _0x22133c=this[_0x303d80(0x348)]();if(_0x22133c===_0x303d80(0x20c))this['drawTextEx'](_0x204309,_0xfaa947['x']+_0xfaa947[_0x303d80(0x171)]-_0x381fb4,_0xfaa947['y'],_0x381fb4);else{if(_0x22133c===_0x303d80(0x1b1)){const _0x2a1b3a=_0xfaa947['x']+Math['floor']((_0xfaa947[_0x303d80(0x171)]-_0x381fb4)/0x2);this[_0x303d80(0x32d)](_0x204309,_0x2a1b3a,_0xfaa947['y'],_0x381fb4);}else this[_0x303d80(0x32d)](_0x204309,_0xfaa947['x'],_0xfaa947['y'],_0x381fb4);}},Window_EquipCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0xf9)]=function(_0x16f932){const _0x1434c9=_0x1f1bbd;this[_0x1434c9(0x26d)](_0x16f932)[_0x1434c9(0x124)](/\\I\[(\d+)\]/i);const _0xb18a84=Number(RegExp['$1'])||0x0,_0x1ec269=this[_0x1434c9(0x136)](_0x16f932),_0x50e1a0=_0x1ec269['x']+Math[_0x1434c9(0x1b3)]((_0x1ec269[_0x1434c9(0x171)]-ImageManager[_0x1434c9(0x2ba)])/0x2),_0x3e2cd3=_0x1ec269['y']+(_0x1ec269[_0x1434c9(0x1d6)]-ImageManager['iconHeight'])/0x2;this[_0x1434c9(0x20d)](_0xb18a84,_0x50e1a0,_0x3e2cd3);},Window_EquipSlot[_0x1f1bbd(0x187)]['isUseModernControls']=function(){const _0x32af46=_0x1f1bbd;return Imported[_0x32af46(0x24a)]&&Window_HorzCommand['prototype']['isUseModernControls'][_0x32af46(0x358)](this);},Window_EquipSlot[_0x1f1bbd(0x187)]['activate']=function(){const _0x1f5664=_0x1f1bbd;Window_StatusBase[_0x1f5664(0x187)][_0x1f5664(0x339)][_0x1f5664(0x358)](this),this[_0x1f5664(0x28b)]();},Window_EquipSlot[_0x1f1bbd(0x187)][_0x1f1bbd(0x246)]=function(){const _0xfad79=_0x1f1bbd;Window_StatusBase[_0xfad79(0x187)]['processCursorMove']['call'](this),this[_0xfad79(0x25a)]();},Window_EquipSlot['prototype']['checkShiftRemoveShortcut']=function(){const _0x4ac21a=_0x1f1bbd;if(!this['isShiftRemoveShortcutEnabled']())return;if(Input[_0x4ac21a(0xb6)](_0x4ac21a(0x8e))&&this['item']()){const _0x21bb55=SceneManager['_scene'][_0x4ac21a(0x1cf)];_0x21bb55&&(this[_0x4ac21a(0x342)](this[_0x4ac21a(0x231)]())?(this['processShiftRemoveShortcut'](),this['updateHelp']()):this[_0x4ac21a(0x366)]());}},Window_EquipSlot[_0x1f1bbd(0x187)][_0x1f1bbd(0x342)]=function(_0x2888b2){const _0x30365e=_0x1f1bbd,_0x5288d0=SceneManager[_0x30365e(0x23e)][_0x30365e(0x1cf)];if(!_0x5288d0)return;if(!_0x5288d0[_0x30365e(0x2c1)](this[_0x30365e(0x231)]()))return![];const _0x47af99=_0x5288d0[_0x30365e(0x220)]()[this[_0x30365e(0x231)]()];if(_0x5288d0[_0x30365e(0x96)]()[_0x30365e(0x1a9)](_0x47af99))return![];return!![];;},Window_EquipSlot['prototype'][_0x1f1bbd(0x3c6)]=function(){const _0xe50d78=_0x1f1bbd;SoundManager['playEquip']();const _0x5502a4=SceneManager[_0xe50d78(0x23e)][_0xe50d78(0x1cf)];_0x5502a4[_0xe50d78(0x167)](this[_0xe50d78(0x231)](),null),this[_0xe50d78(0x16c)](),this[_0xe50d78(0x38c)][_0xe50d78(0x16c)](),this[_0xe50d78(0x28b)]();const _0x2c3fe1=SceneManager['_scene']['_statusWindow'];if(_0x2c3fe1)_0x2c3fe1[_0xe50d78(0x16c)]();},Window_EquipSlot['prototype'][_0x1f1bbd(0x276)]=function(){const _0x2e2fd9=_0x1f1bbd;if(!this[_0x2e2fd9(0x82)])return![];if(!VisuMZ[_0x2e2fd9(0x1fc)]['Settings'][_0x2e2fd9(0x1ec)]['ShiftShortcutKey'])return![];return!![];},Window_EquipSlot[_0x1f1bbd(0x187)][_0x1f1bbd(0x1a4)]=function(){const _0x268550=_0x1f1bbd;!this['processCursorSpecialCheckModernControls']()&&Window_StatusBase[_0x268550(0x187)][_0x268550(0x1a4)][_0x268550(0x358)](this);},Window_EquipSlot[_0x1f1bbd(0x187)][_0x1f1bbd(0x143)]=function(){const _0x1a6d94=_0x1f1bbd;if(!this[_0x1a6d94(0x24c)]())return![];if(SceneManager['_scene'][_0x1a6d94(0x6e)]!==Scene_Equip)return![];if(this['allowCommandWindowCursorUp']())return this[_0x1a6d94(0x65)](),Input['clear'](),SceneManager[_0x1a6d94(0x23e)][_0x1a6d94(0x11c)](),![];else{if(Input['isRepeated'](_0x1a6d94(0x131))){const _0x1c700d=this[_0x1a6d94(0x231)]();return Input['isPressed'](_0x1a6d94(0x8e))?this[_0x1a6d94(0x30c)]():this[_0x1a6d94(0x12d)](Input[_0x1a6d94(0xb6)](_0x1a6d94(0x131))),this['index']()!==_0x1c700d&&this[_0x1a6d94(0x65)](),!![];}else{if(this[_0x1a6d94(0x204)]()&&Input[_0x1a6d94(0xb6)](_0x1a6d94(0x8e)))return!![];}}return![];},Window_EquipSlot[_0x1f1bbd(0x187)]['allowCommandWindowCursorUp']=function(){const _0x14f02e=_0x1f1bbd;if(this[_0x14f02e(0x231)]()!==0x0)return![];const _0x181594=VisuMZ[_0x14f02e(0x1fc)]['Settings'][_0x14f02e(0x1ec)];if(!_0x181594[_0x14f02e(0x172)]&&!_0x181594['CommandAddClear'])return![];return Input[_0x14f02e(0xb6)]('up');},Window_EquipSlot[_0x1f1bbd(0x187)][_0x1f1bbd(0x204)]=function(){const _0x1edbdb=_0x1f1bbd;return VisuMZ['ItemsEquipsCore'][_0x1edbdb(0xb9)][_0x1edbdb(0x1ec)]['ShiftShortcutKey'];},Window_EquipSlot[_0x1f1bbd(0x187)][_0x1f1bbd(0x2a4)]=function(){const _0xc95744=_0x1f1bbd;if(this[_0xc95744(0x3a9)]()&&this[_0xc95744(0x86)]&&SceneManager[_0xc95744(0x23e)][_0xc95744(0x6e)]===Scene_Equip){if(this['isHoverEnabled']()&&TouchInput[_0xc95744(0x2f1)]())this['onTouchSelectModernControls'](![]);else TouchInput[_0xc95744(0xb6)]()&&this[_0xc95744(0x121)](!![]);if(TouchInput[_0xc95744(0x18c)]())this[_0xc95744(0x9f)]();else TouchInput[_0xc95744(0x2b6)]()&&this[_0xc95744(0x88)]();}},Window_EquipSlot[_0x1f1bbd(0x187)][_0x1f1bbd(0x121)]=function(_0x9e292e){const _0x39120f=_0x1f1bbd;this[_0x39120f(0x2e5)]=![];const _0x16273d=this[_0x39120f(0x231)](),_0x6a3af9=this['hitIndex'](),_0x87ff36=SceneManager[_0x39120f(0x23e)][_0x39120f(0x159)];if(_0x87ff36[_0x39120f(0x3a9)]()&&_0x87ff36[_0x39120f(0x86)]){if(_0x6a3af9>=0x0)_0x6a3af9===this[_0x39120f(0x231)]()&&(this[_0x39120f(0x2e5)]=!![]),this[_0x39120f(0x339)](),this['select'](_0x6a3af9);else _0x87ff36[_0x39120f(0xe1)]()>=0x0&&(this[_0x39120f(0xf2)](),this[_0x39120f(0x1f2)]());}_0x9e292e&&this[_0x39120f(0x231)]()!==_0x16273d&&this['playCursorSound']();},Window_EquipSlot[_0x1f1bbd(0x187)][_0x1f1bbd(0x299)]=function(){const _0x3cd56c=_0x1f1bbd;return this[_0x3cd56c(0x231)]();},VisuMZ['ItemsEquipsCore'][_0x1f1bbd(0x1ed)]=Window_EquipItem[_0x1f1bbd(0x187)][_0x1f1bbd(0x1a9)],Window_EquipItem['prototype'][_0x1f1bbd(0x1a9)]=function(_0x3d10eb){const _0x3f3c47=_0x1f1bbd;return _0x3d10eb===null&&this[_0x3f3c47(0x96)]()[_0x3f3c47(0x1a9)](this[_0x3f3c47(0x9d)]())?this[_0x3f3c47(0x2f8)][_0x3f3c47(0x2f0)]>0x0?![]:!![]:VisuMZ[_0x3f3c47(0x1fc)][_0x3f3c47(0x1ed)][_0x3f3c47(0x358)](this,_0x3d10eb);},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x14d)]=Window_EquipItem[_0x1f1bbd(0x187)][_0x1f1bbd(0x21f)],Window_EquipItem['prototype'][_0x1f1bbd(0x21f)]=function(_0x32f18d){const _0x29d1ae=_0x1f1bbd;if(_0x32f18d&&this[_0x29d1ae(0x1cf)]){if(this['nonRemovableEtypes']()['includes'](this[_0x29d1ae(0x9d)]()))return![];if(this[_0x29d1ae(0x185)](_0x32f18d))return![];if(this[_0x29d1ae(0x3bc)](_0x32f18d))return![];if(this[_0x29d1ae(0x199)](_0x32f18d))return![];}return VisuMZ[_0x29d1ae(0x1fc)][_0x29d1ae(0x14d)][_0x29d1ae(0x358)](this,_0x32f18d);},Window_EquipItem[_0x1f1bbd(0x187)][_0x1f1bbd(0x185)]=function(_0x45f12b){const _0x3102f7=_0x1f1bbd,_0x166cc0=_0x45f12b[_0x3102f7(0x262)];if(_0x166cc0['match'](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){const _0x1103a6=Number(RegExp['$1'])||0x1;let _0x11bfaa=0x0;const _0x9694ae=this[_0x3102f7(0x1cf)]['equips'](),_0x18c895=SceneManager['_scene'][_0x3102f7(0x15b)]['equipSlotIndex']();_0x9694ae[_0x18c895]=null;for(const _0x128986 of _0x9694ae){if(!_0x128986)continue;if(DataManager[_0x3102f7(0x160)](_0x45f12b)===DataManager['isWeapon'](_0x128986)){if(_0x45f12b['id']===_0x128986['id'])_0x11bfaa+=0x1;}}return _0x11bfaa>=_0x1103a6;}else return![];},Window_EquipItem[_0x1f1bbd(0x187)][_0x1f1bbd(0x3bc)]=function(_0x4321ac){const _0x4ade90=_0x1f1bbd;if(!DataManager[_0x4ade90(0x160)](_0x4321ac))return![];const _0x3bcccc=/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;let _0x4b65eb=0x0;const _0x2f1b8a=this[_0x4ade90(0x1cf)][_0x4ade90(0x106)](),_0x58c1af=SceneManager[_0x4ade90(0x23e)][_0x4ade90(0x15b)][_0x4ade90(0x299)]();_0x2f1b8a[_0x58c1af]=null;for(const _0x1eae99 of _0x2f1b8a){if(!_0x1eae99)continue;if(!DataManager[_0x4ade90(0x160)](_0x1eae99))continue;if(_0x4321ac[_0x4ade90(0xdb)]===_0x1eae99['wtypeId']){_0x4b65eb+=0x1;if(_0x4321ac[_0x4ade90(0x262)][_0x4ade90(0x124)](_0x3bcccc)){const _0x53b68d=Number(RegExp['$1'])||0x1;if(_0x4b65eb>=_0x53b68d)return!![];}if(_0x1eae99[_0x4ade90(0x262)][_0x4ade90(0x124)](_0x3bcccc)){const _0x4b2901=Number(RegExp['$1'])||0x1;if(_0x4b65eb>=_0x4b2901)return!![];}}}return![];},Window_EquipItem[_0x1f1bbd(0x187)][_0x1f1bbd(0x199)]=function(_0x1ab038){const _0x4de073=_0x1f1bbd;if(!DataManager[_0x4de073(0x174)](_0x1ab038))return![];const _0x28db8f=/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;let _0x29531f=0x0;const _0xd43968=this[_0x4de073(0x1cf)][_0x4de073(0x106)](),_0xa5f67=SceneManager['_scene'][_0x4de073(0x15b)]['equipSlotIndex']();_0xd43968[_0xa5f67]=null;for(const _0x3a5a61 of _0xd43968){if(!_0x3a5a61)continue;if(!DataManager[_0x4de073(0x174)](_0x3a5a61))continue;if(_0x1ab038[_0x4de073(0x130)]===_0x3a5a61[_0x4de073(0x130)]){_0x29531f+=0x1;if(_0x1ab038[_0x4de073(0x262)][_0x4de073(0x124)](_0x28db8f)){const _0x21cd5f=Number(RegExp['$1'])||0x1;if(_0x29531f>=_0x21cd5f)return!![];}if(_0x3a5a61[_0x4de073(0x262)][_0x4de073(0x124)](_0x28db8f)){const _0x4ce7c8=Number(RegExp['$1'])||0x1;if(_0x29531f>=_0x4ce7c8)return!![];}}}return![];},Window_EquipItem['prototype']['nonRemovableEtypes']=function(){const _0x1290b0=_0x1f1bbd;return VisuMZ[_0x1290b0(0x1fc)][_0x1290b0(0xb9)][_0x1290b0(0x1ec)][_0x1290b0(0x3c3)];},Window_EquipItem['prototype']['drawItem']=function(_0x32ec9a){const _0x497893=_0x1f1bbd,_0x203e17=this[_0x497893(0x17b)](_0x32ec9a);_0x203e17?Window_ItemList['prototype'][_0x497893(0x343)][_0x497893(0x358)](this,_0x32ec9a):this[_0x497893(0x29b)](_0x32ec9a);},Window_EquipItem['prototype'][_0x1f1bbd(0x29b)]=function(_0x87854){const _0x4fd653=_0x1f1bbd;this[_0x4fd653(0x6b)](this[_0x4fd653(0x21f)](null));const _0x1bec41=VisuMZ['ItemsEquipsCore']['Settings'][_0x4fd653(0x1ec)],_0x158f61=this[_0x4fd653(0x136)](_0x87854),_0x31f528=_0x158f61['y']+(this[_0x4fd653(0x3a5)]()-ImageManager[_0x4fd653(0x2e4)])/0x2,_0x29a2e1=ImageManager[_0x4fd653(0x2ba)]+0x4,_0x474c26=Math['max'](0x0,_0x158f61[_0x4fd653(0x171)]-_0x29a2e1);this[_0x4fd653(0x29e)](),this[_0x4fd653(0x20d)](_0x1bec41[_0x4fd653(0x3ae)],_0x158f61['x'],_0x31f528),this['drawText'](_0x1bec41[_0x4fd653(0x1e4)],_0x158f61['x']+_0x29a2e1,_0x158f61['y'],_0x474c26),this['changePaintOpacity'](!![]);},Window_EquipItem[_0x1f1bbd(0x187)][_0x1f1bbd(0x39e)]=function(){const _0x22f65d=_0x1f1bbd;Window_ItemList[_0x22f65d(0x187)][_0x22f65d(0x39e)]['call'](this);if(this['_actor']&&this[_0x22f65d(0xf5)]&&this[_0x22f65d(0xa1)]>=0x0){const _0x5da67b=JsonEx['makeDeepCopy'](this[_0x22f65d(0x1cf)]);_0x5da67b[_0x22f65d(0x1a7)]=!![],_0x5da67b[_0x22f65d(0x355)](this[_0x22f65d(0xa1)],this[_0x22f65d(0x255)]()),this[_0x22f65d(0xf5)][_0x22f65d(0x384)](_0x5da67b);}},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x22a)]=Window_ShopCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0x1ea)],Window_ShopCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0x1ea)]=function(_0x43e242){const _0x3bacb5=_0x1f1bbd;VisuMZ[_0x3bacb5(0x1fc)]['Window_ShopCommand_initialize'][_0x3bacb5(0x358)](this,_0x43e242),this[_0x3bacb5(0xd6)](_0x43e242);},Window_ShopCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0xd6)]=function(_0xe013b4){const _0x2c4c33=_0x1f1bbd,_0x8bb815=new Rectangle(0x0,0x0,_0xe013b4[_0x2c4c33(0x171)],_0xe013b4[_0x2c4c33(0x1d6)]);this[_0x2c4c33(0x375)]=new Window_Base(_0x8bb815),this[_0x2c4c33(0x375)][_0x2c4c33(0x242)]=0x0,this['addChild'](this[_0x2c4c33(0x375)]),this[_0x2c4c33(0x1dd)]();},Window_ShopCommand[_0x1f1bbd(0x187)]['callUpdateHelp']=function(){const _0x5bb887=_0x1f1bbd;Window_HorzCommand[_0x5bb887(0x187)][_0x5bb887(0x28b)]['call'](this);if(this[_0x5bb887(0x375)])this[_0x5bb887(0x1dd)]();},Window_ShopCommand[_0x1f1bbd(0x187)]['updateCommandNameWindow']=function(){const _0x2aed09=_0x1f1bbd,_0xbf859=this[_0x2aed09(0x375)];_0xbf859[_0x2aed09(0x1be)][_0x2aed09(0x29d)]();const _0x41db02=this['commandStyleCheck'](this[_0x2aed09(0x231)]());if(_0x41db02===_0x2aed09(0x3ba)){const _0x36cf7d=this[_0x2aed09(0x136)](this[_0x2aed09(0x231)]());let _0x5c1aef=this[_0x2aed09(0x26d)](this[_0x2aed09(0x231)]());_0x5c1aef=_0x5c1aef[_0x2aed09(0x8d)](/\\I\[(\d+)\]/gi,''),_0xbf859[_0x2aed09(0xe9)](),this[_0x2aed09(0x35c)](_0x5c1aef,_0x36cf7d),this[_0x2aed09(0x273)](_0x5c1aef,_0x36cf7d),this[_0x2aed09(0x232)](_0x5c1aef,_0x36cf7d);}},Window_ShopCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0x35c)]=function(_0x1da7cf,_0x97beb){},Window_ShopCommand[_0x1f1bbd(0x187)]['commandNameWindowDrawText']=function(_0x3e44d8,_0x395ba3){const _0xa7d401=_0x1f1bbd,_0x1b026e=this[_0xa7d401(0x375)];_0x1b026e[_0xa7d401(0x1d9)](_0x3e44d8,0x0,_0x395ba3['y'],_0x1b026e[_0xa7d401(0xc6)],_0xa7d401(0x1b1));},Window_ShopCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0x232)]=function(_0x5c2faa,_0x464e61){const _0xa67b3c=_0x1f1bbd,_0xd608d5=this[_0xa67b3c(0x375)],_0x523ad1=$gameSystem[_0xa67b3c(0x2e0)](),_0x5e7cc9=_0x464e61['x']+Math[_0xa67b3c(0x1b3)](_0x464e61[_0xa67b3c(0x171)]/0x2)+_0x523ad1;_0xd608d5['x']=_0xd608d5[_0xa67b3c(0x171)]/-0x2+_0x5e7cc9,_0xd608d5['y']=Math['floor'](_0x464e61[_0xa67b3c(0x1d6)]/0x2);},Window_ShopCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0x298)]=function(){const _0x13e7b4=_0x1f1bbd;return this['_list']?this[_0x13e7b4(0x288)]['length']:0x3;},Window_ShopCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0x287)]=function(){const _0x3a6a7a=_0x1f1bbd;return VisuMZ[_0x3a6a7a(0x1fc)][_0x3a6a7a(0xb9)][_0x3a6a7a(0x70)][_0x3a6a7a(0x292)];},Window_ShopCommand['prototype'][_0x1f1bbd(0xa8)]=function(){const _0x906be9=_0x1f1bbd;this[_0x906be9(0x363)](),this[_0x906be9(0x2b9)](),this[_0x906be9(0x24b)]();},Window_ShopCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0x16c)]=function(){const _0x1e31ce=_0x1f1bbd;Window_HorzCommand[_0x1e31ce(0x187)]['refresh']['call'](this),this[_0x1e31ce(0x374)]();},Window_ShopCommand[_0x1f1bbd(0x187)]['addBuyCommand']=function(){const _0x2cf5fe=_0x1f1bbd,_0x45d32e=this[_0x2cf5fe(0x350)](),_0x5f4559=VisuMZ[_0x2cf5fe(0x1fc)][_0x2cf5fe(0xb9)][_0x2cf5fe(0x70)][_0x2cf5fe(0x36e)],_0x552469=_0x45d32e===_0x2cf5fe(0x1fb)?TextManager['buy']:_0x2cf5fe(0x326)[_0x2cf5fe(0x2dd)](_0x5f4559,TextManager[_0x2cf5fe(0x201)]),_0x401302=this[_0x2cf5fe(0x368)]();if(this[_0x2cf5fe(0x287)]()&&!_0x401302)return;this['addCommand'](_0x552469,_0x2cf5fe(0x201),_0x401302);},Window_ShopCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0x368)]=function(){const _0x4a3645=_0x1f1bbd;return SceneManager[_0x4a3645(0x23e)]['constructor']===Scene_Shop?SceneManager[_0x4a3645(0x23e)]['_goodsCount']>0x0:!![];},Window_ShopCommand['prototype'][_0x1f1bbd(0x2b9)]=function(){const _0x5edbe2=_0x1f1bbd,_0x3c1c42=this['commandStyle'](),_0x2b289a=VisuMZ['ItemsEquipsCore'][_0x5edbe2(0xb9)][_0x5edbe2(0x70)][_0x5edbe2(0x263)],_0x110c37=_0x3c1c42===_0x5edbe2(0x1fb)?TextManager['sell']:'\x5cI[%1]%2'[_0x5edbe2(0x2dd)](_0x2b289a,TextManager[_0x5edbe2(0x3a6)]),_0x5a3ace=this[_0x5edbe2(0x196)]();if(this[_0x5edbe2(0x287)]()&&!_0x5a3ace)return;this['addCommand'](_0x110c37,_0x5edbe2(0x3a6),_0x5a3ace);},Window_ShopCommand['prototype'][_0x1f1bbd(0x196)]=function(){const _0x3b56e3=_0x1f1bbd;return!this[_0x3b56e3(0x100)];},Window_ShopCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0x24b)]=function(){const _0x3a06a1=_0x1f1bbd,_0x3ef97b=this[_0x3a06a1(0x350)](),_0x37c58f=VisuMZ[_0x3a06a1(0x1fc)]['Settings'][_0x3a06a1(0x70)]['CmdIconCancel'],_0xb72803=VisuMZ[_0x3a06a1(0x1fc)]['Settings'][_0x3a06a1(0x70)][_0x3a06a1(0x158)],_0x1fc102=_0x3ef97b===_0x3a06a1(0x1fb)?_0xb72803:_0x3a06a1(0x326)[_0x3a06a1(0x2dd)](_0x37c58f,_0xb72803);this[_0x3a06a1(0x230)](_0x1fc102,_0x3a06a1(0x2a3));},Window_ShopCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0x348)]=function(){const _0x525f02=_0x1f1bbd;return VisuMZ[_0x525f02(0x1fc)][_0x525f02(0xb9)][_0x525f02(0x70)][_0x525f02(0x98)];},Window_ShopCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0x343)]=function(_0x2ec506){const _0x3f8296=_0x1f1bbd,_0x3cc6ee=this[_0x3f8296(0x319)](_0x2ec506);if(_0x3cc6ee===_0x3f8296(0x249))this['drawItemStyleIconText'](_0x2ec506);else _0x3cc6ee===_0x3f8296(0x3ba)?this[_0x3f8296(0xf9)](_0x2ec506):Window_HorzCommand[_0x3f8296(0x187)][_0x3f8296(0x343)][_0x3f8296(0x358)](this,_0x2ec506);},Window_ShopCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0x350)]=function(){const _0x305df0=_0x1f1bbd;return VisuMZ[_0x305df0(0x1fc)][_0x305df0(0xb9)][_0x305df0(0x70)]['CmdStyle'];},Window_ShopCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0x319)]=function(_0x55728e){const _0x2cbe09=_0x1f1bbd;if(_0x55728e<0x0)return _0x2cbe09(0x1fb);const _0x3fb0d9=this['commandStyle']();if(_0x3fb0d9!==_0x2cbe09(0x268))return _0x3fb0d9;else{if(this[_0x2cbe09(0x1c4)]()>0x0){const _0x524c35=this[_0x2cbe09(0x26d)](_0x55728e);if(_0x524c35[_0x2cbe09(0x124)](/\\I\[(\d+)\]/i)){const _0x2d31fa=this[_0x2cbe09(0x136)](_0x55728e),_0x39d38f=this[_0x2cbe09(0x237)](_0x524c35)[_0x2cbe09(0x171)];return _0x39d38f<=_0x2d31fa[_0x2cbe09(0x171)]?'iconText':_0x2cbe09(0x3ba);}}}return _0x2cbe09(0x1fb);},Window_ShopCommand[_0x1f1bbd(0x187)]['drawItemStyleIconText']=function(_0x4a5b62){const _0x1d915d=_0x1f1bbd,_0x5011c1=this['itemLineRect'](_0x4a5b62),_0x416af8=this[_0x1d915d(0x26d)](_0x4a5b62),_0x55c0de=this[_0x1d915d(0x237)](_0x416af8)['width'];this[_0x1d915d(0x6b)](this['isCommandEnabled'](_0x4a5b62));const _0x40beaa=this[_0x1d915d(0x348)]();if(_0x40beaa==='right')this[_0x1d915d(0x32d)](_0x416af8,_0x5011c1['x']+_0x5011c1[_0x1d915d(0x171)]-_0x55c0de,_0x5011c1['y'],_0x55c0de);else{if(_0x40beaa===_0x1d915d(0x1b1)){const _0x4bf118=_0x5011c1['x']+Math[_0x1d915d(0x1b3)]((_0x5011c1[_0x1d915d(0x171)]-_0x55c0de)/0x2);this[_0x1d915d(0x32d)](_0x416af8,_0x4bf118,_0x5011c1['y'],_0x55c0de);}else this[_0x1d915d(0x32d)](_0x416af8,_0x5011c1['x'],_0x5011c1['y'],_0x55c0de);}},Window_ShopCommand[_0x1f1bbd(0x187)][_0x1f1bbd(0xf9)]=function(_0x316623){const _0x41c175=_0x1f1bbd;this[_0x41c175(0x26d)](_0x316623)[_0x41c175(0x124)](/\\I\[(\d+)\]/i);const _0x3ab833=Number(RegExp['$1'])||0x0,_0x6ecc22=this['itemLineRect'](_0x316623),_0x4a342a=_0x6ecc22['x']+Math[_0x41c175(0x1b3)]((_0x6ecc22[_0x41c175(0x171)]-ImageManager[_0x41c175(0x2ba)])/0x2),_0x83eada=_0x6ecc22['y']+(_0x6ecc22[_0x41c175(0x1d6)]-ImageManager[_0x41c175(0x2e4)])/0x2;this[_0x41c175(0x20d)](_0x3ab833,_0x4a342a,_0x83eada);},VisuMZ[_0x1f1bbd(0x1fc)][_0x1f1bbd(0x377)]=Window_ShopBuy[_0x1f1bbd(0x187)][_0x1f1bbd(0x16c)],Window_ShopBuy[_0x1f1bbd(0x187)][_0x1f1bbd(0x16c)]=function(){const _0x397bd3=_0x1f1bbd;this[_0x397bd3(0x227)](),VisuMZ[_0x397bd3(0x1fc)][_0x397bd3(0x377)][_0x397bd3(0x358)](this);},Window_ShopBuy[_0x1f1bbd(0x187)]['updateMoneyAmount']=function(){const _0x402779=_0x1f1bbd;SceneManager[_0x402779(0x23e)][_0x402779(0x6e)]===Scene_Shop&&(this[_0x402779(0x1b8)]=SceneManager[_0x402779(0x23e)]['money']());},VisuMZ['ItemsEquipsCore'][_0x1f1bbd(0x233)]=Window_ShopBuy[_0x1f1bbd(0x187)][_0x1f1bbd(0x14f)],Window_ShopBuy[_0x1f1bbd(0x187)]['price']=function(_0x3dfc78){const _0xef2db0=_0x1f1bbd;if(!_0x3dfc78)return 0x0;const _0x18168c=VisuMZ['ItemsEquipsCore'][_0xef2db0(0x233)][_0xef2db0(0x358)](this,_0x3dfc78);return this[_0xef2db0(0x1eb)](_0x3dfc78,_0x18168c);},Window_ShopBuy['prototype'][_0x1f1bbd(0x1eb)]=function(_0x1742a4,_0x1d430c){const _0x51d77f=_0x1f1bbd,_0x37cfd7=_0x1742a4['note'];if(_0x37cfd7['match'](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0xf75f8f=String(RegExp['$1']);try{eval(_0xf75f8f);}catch(_0x165bea){if($gameTemp['isPlaytest']())console['log'](_0x165bea);}}_0x1d430c=VisuMZ['ItemsEquipsCore'][_0x51d77f(0xb9)][_0x51d77f(0x70)]['BuyPriceJS'][_0x51d77f(0x358)](this,_0x1742a4,_0x1d430c);if(isNaN(_0x1d430c))_0x1d430c=0x0;return Math[_0x51d77f(0x1b3)](_0x1d430c);},Window_ShopBuy[_0x1f1bbd(0x187)][_0x1f1bbd(0x343)]=function(_0x9c5468){const _0x286c13=_0x1f1bbd;this[_0x286c13(0xe9)]();const _0x11dc0b=this[_0x286c13(0x17b)](_0x9c5468),_0x4f025c=this[_0x286c13(0x136)](_0x9c5468),_0x300e93=_0x4f025c[_0x286c13(0x171)];this[_0x286c13(0x6b)](this['isEnabled'](_0x11dc0b)),this[_0x286c13(0xe5)](_0x11dc0b,_0x4f025c['x'],_0x4f025c['y'],_0x300e93),this[_0x286c13(0x25d)](_0x11dc0b,_0x4f025c),this['changePaintOpacity'](!![]);},Window_ShopBuy[_0x1f1bbd(0x187)][_0x1f1bbd(0x25d)]=function(_0x3c1074,_0x5e4a4c){const _0xfb6dff=_0x1f1bbd,_0x404467=this[_0xfb6dff(0x14f)](_0x3c1074);this['drawCurrencyValue'](_0x404467,TextManager[_0xfb6dff(0x239)],_0x5e4a4c['x'],_0x5e4a4c['y'],_0x5e4a4c[_0xfb6dff(0x171)]);},Window_ShopSell[_0x1f1bbd(0x187)][_0x1f1bbd(0x298)]=function(){const _0x169d5e=_0x1f1bbd;return SceneManager[_0x169d5e(0x23e)][_0x169d5e(0x104)]()?0x1:0x2;},VisuMZ['ItemsEquipsCore'][_0x1f1bbd(0x1fa)]=Window_ShopSell['prototype']['isEnabled'],Window_ShopSell['prototype']['isEnabled']=function(_0x4eeb8f){const _0x10c100=_0x1f1bbd;if(!_0x4eeb8f)return![];const _0x190c01=_0x4eeb8f[_0x10c100(0x262)];if(_0x190c01[_0x10c100(0x124)](/<CANNOT SELL>/i))return![];if(_0x190c01[_0x10c100(0x124)](/<CAN SELL>/i))return!![];if(_0x190c01[_0x10c100(0x124)](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x58c9d8=JSON[_0x10c100(0x38d)]('['+RegExp['$1'][_0x10c100(0x124)](/\d+/g)+']');for(const _0x2b6262 of _0x58c9d8){if(!$gameSwitches['value'](_0x2b6262))return![];}}if(_0x190c01[_0x10c100(0x124)](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x577a68=JSON[_0x10c100(0x38d)]('['+RegExp['$1'][_0x10c100(0x124)](/\d+/g)+']');for(const _0x4026ce of _0x577a68){if(!$gameSwitches[_0x10c100(0x29f)](_0x4026ce))return![];}}if(_0x190c01[_0x10c100(0x124)](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x32d5d4=JSON[_0x10c100(0x38d)]('['+RegExp['$1'][_0x10c100(0x124)](/\d+/g)+']');for(const _0x299599 of _0x32d5d4){if($gameSwitches[_0x10c100(0x29f)](_0x299599))return![];}}return VisuMZ[_0x10c100(0x1fc)]['Window_ShopSell_isEnabled'][_0x10c100(0x358)](this,_0x4eeb8f);},Window_ShopStatus['prototype'][_0x1f1bbd(0x23a)]=function(){return![];},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x205)]=function(){const _0x334791=_0x1f1bbd;Window_StatusBase[_0x334791(0x187)]['loadFaceImages'][_0x334791(0x358)](this);for(const _0x46857f of $gameParty[_0x334791(0x9e)]()){ImageManager[_0x334791(0x73)](_0x46857f[_0x334791(0xa0)]());}},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x334)]=function(){const _0x1d40b7=_0x1f1bbd;return VisuMZ[_0x1d40b7(0x1fc)][_0x1d40b7(0xb9)][_0x1d40b7(0xa5)]['Translucent'];},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x16c)]=function(){const _0x1c69ea=_0x1f1bbd;this[_0x1c69ea(0x1be)][_0x1c69ea(0x29d)](),this[_0x1c69ea(0x17a)][_0x1c69ea(0x29d)](),this[_0x1c69ea(0x78)]&&(this[_0x1c69ea(0xe9)](),this[_0x1c69ea(0x6b)](!![]),this[_0x1c69ea(0x3a4)](),this[_0x1c69ea(0x1bd)]()?this[_0x1c69ea(0x10e)]():this[_0x1c69ea(0x22b)]());},Window_ShopStatus['prototype']['drawPossession']=function(_0x3d0f6a,_0x54c1fc){const _0x172112=_0x1f1bbd;if(!this['isEquipItem']()&&!DataManager['isItem'](this[_0x172112(0x78)]))return;const _0x12a3e2=this['innerWidth']-this[_0x172112(0x32c)]()-_0x3d0f6a,_0x216601=this[_0x172112(0x76)](_0x172112(0x1bc));this[_0x172112(0xb3)](ColorManager[_0x172112(0x202)]()),this[_0x172112(0x1d9)](TextManager[_0x172112(0x146)],_0x3d0f6a+this[_0x172112(0x32c)](),_0x54c1fc,_0x12a3e2-_0x216601),this[_0x172112(0x29e)](),this[_0x172112(0x308)](this[_0x172112(0x78)],_0x3d0f6a,_0x54c1fc,_0x12a3e2);},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x35a)]=function(_0x9bb8bf,_0x268fe1,_0x2c7ab5,_0xc7f133,_0x5bf0f7){const _0x4945ce=_0x1f1bbd;if(VisuMZ['ItemsEquipsCore'][_0x4945ce(0xb9)][_0x4945ce(0xa5)][_0x4945ce(0x33b)]===![])return;_0x5bf0f7=Math[_0x4945ce(0x31a)](_0x5bf0f7||0x1,0x1);while(_0x5bf0f7--){_0xc7f133=_0xc7f133||this[_0x4945ce(0x3a5)](),this[_0x4945ce(0x17a)][_0x4945ce(0x2b0)]=0xa0;const _0x2f19ba=ColorManager[_0x4945ce(0x1b0)]();this[_0x4945ce(0x17a)][_0x4945ce(0x115)](_0x9bb8bf+0x1,_0x268fe1+0x1,_0x2c7ab5-0x2,_0xc7f133-0x2,_0x2f19ba),this[_0x4945ce(0x17a)][_0x4945ce(0x2b0)]=0xff;}},ColorManager[_0x1f1bbd(0x1b0)]=function(){const _0x53bc21=_0x1f1bbd,_0x1c3331=VisuMZ['ItemsEquipsCore'][_0x53bc21(0xb9)][_0x53bc21(0xa5)];let _0x310699=_0x1c3331[_0x53bc21(0x316)]!==undefined?_0x1c3331[_0x53bc21(0x316)]:0x13;return ColorManager[_0x53bc21(0x2c8)](_0x310699);},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x10e)]=function(){const _0x519e67=_0x1f1bbd;if(VisuMZ[_0x519e67(0x1fc)][_0x519e67(0xb9)]['StatusWindow'][_0x519e67(0x37a)]){VisuMZ[_0x519e67(0x1fc)][_0x519e67(0xb9)][_0x519e67(0xa5)][_0x519e67(0x37a)][_0x519e67(0x358)](this);return;}const _0x42c483=this['lineHeight'](),_0x2062e0=this[_0x519e67(0x25c)]()+0x8;let _0x156422=0x0,_0x44661d=0x0,_0x262390=this['innerWidth'],_0x3f0460=this['innerHeight'],_0x596da4=Math[_0x519e67(0x1b3)](_0x262390/0x2),_0xe15fba=_0x156422+_0x262390-_0x596da4;this['drawItemName'](this[_0x519e67(0x78)],_0x156422+this['itemPadding'](),_0x44661d,_0x262390-this[_0x519e67(0x32c)]()*0x2),this[_0x519e67(0x35a)](_0x156422,_0x44661d,_0x262390),_0x44661d+=_0x42c483;if(this[_0x519e67(0x1a5)](_0x156422,_0x44661d,_0x596da4))_0x44661d+=0x0;if(this[_0x519e67(0xa4)](_0xe15fba,_0x44661d,_0x596da4))_0x44661d+=_0x42c483;const _0xef6e78=this['actorParams'](),_0x2d8595=_0x44661d;_0x44661d=_0x3f0460-_0xef6e78[_0x519e67(0x2f0)]*_0x2062e0-0x4;let _0x3f2d5f=_0x156422,_0x70f2aa=0x0,_0x1081d9=_0x44661d;for(const _0x441942 of _0xef6e78){_0x70f2aa=Math['max'](this[_0x519e67(0x20e)](_0x441942,_0x156422+0x4,_0x44661d+0x4,_0x262390),_0x70f2aa),_0x44661d+=_0x2062e0;}const _0x41e3ba=$gameParty['maxBattleMembers'](),_0x416184=Math[_0x519e67(0x1b3)]((_0x262390-_0x70f2aa)/_0x41e3ba);_0x70f2aa=_0x262390-_0x416184*_0x41e3ba;for(const _0x1d0b8e of $gameParty[_0x519e67(0x22e)]()){const _0x25c986=$gameParty['battleMembers']()[_0x519e67(0x9b)](_0x1d0b8e),_0x1e9c69=_0x3f2d5f+_0x70f2aa+_0x25c986*_0x416184;this[_0x519e67(0x6b)](_0x1d0b8e[_0x519e67(0x191)](this['_item'])),this['drawActorCharacter'](_0x1d0b8e,_0x1e9c69+_0x416184/0x2,_0x1081d9);let _0x36a61c=_0x1081d9;for(const _0x4af795 of _0xef6e78){const _0x1d71fa=_0x36a61c-(_0x42c483-_0x2062e0)/0x2;this['drawActorParamDifference'](_0x1d0b8e,_0x4af795,_0x1e9c69,_0x1d71fa,_0x416184),_0x36a61c+=_0x2062e0;}}this[_0x519e67(0x35a)](_0x3f2d5f,_0x2d8595,_0x70f2aa,_0x1081d9-_0x2d8595);for(let _0xe8c825=0x0;_0xe8c825<_0x41e3ba;_0xe8c825++){const _0x5b841b=_0x3f2d5f+_0x70f2aa+_0xe8c825*_0x416184;this[_0x519e67(0x35a)](_0x5b841b,_0x2d8595,_0x416184,_0x1081d9-_0x2d8595);}for(const _0x1522c8 of _0xef6e78){this[_0x519e67(0x35a)](_0x3f2d5f,_0x1081d9,_0x70f2aa,_0x2062e0);for(let _0x4b50dd=0x0;_0x4b50dd<_0x41e3ba;_0x4b50dd++){const _0x3bc4f1=_0x3f2d5f+_0x70f2aa+_0x4b50dd*_0x416184;this['drawItemDarkRect'](_0x3bc4f1,_0x1081d9,_0x416184,_0x2062e0);}_0x1081d9+=_0x2062e0;}},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x1a5)]=function(_0x3ab424,_0x546397,_0x3a152b){const _0x314e9d=_0x1f1bbd;if(!this[_0x314e9d(0x1bd)]())return![];const _0x3f60c9=$dataSystem[_0x314e9d(0x211)][this[_0x314e9d(0x78)]['etypeId']];return this[_0x314e9d(0x1e6)](_0x3f60c9,_0x3ab424,_0x546397,_0x3a152b,!![]),this[_0x314e9d(0x35a)](_0x3ab424,_0x546397,_0x3a152b),this[_0x314e9d(0xe9)](),!![];},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x34e)]=function(){const _0x3c1daa=_0x1f1bbd,_0x199da5=VisuMZ[_0x3c1daa(0x1fc)]['Settings'][_0x3c1daa(0x305)][_0x3c1daa(0x2da)];return _0x199da5['format']($gameParty[_0x3c1daa(0xa9)](this[_0x3c1daa(0x78)]));},Window_ShopStatus['prototype'][_0x1f1bbd(0xff)]=function(){const _0x8c0c2a=_0x1f1bbd;return Imported['VisuMZ_0_CoreEngine']?VisuMZ['CoreEngine']['Settings'][_0x8c0c2a(0xb7)][_0x8c0c2a(0x20f)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x304)]=function(){const _0x1fa809=_0x1f1bbd;return VisuMZ[_0x1fa809(0x1fc)]['Settings']['StatusWindow'][_0x1fa809(0x336)];},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x20e)]=function(_0x3556e2,_0x19d525,_0x28fdf3,_0x19b7d0){const _0x4bf25e=_0x1f1bbd;this[_0x4bf25e(0xe9)](),this['contents'][_0x4bf25e(0x3bb)]=this[_0x4bf25e(0x304)]();let _0x24a0b7=this[_0x4bf25e(0x76)](TextManager[_0x4bf25e(0x2ea)](_0x3556e2))+0x4+_0x19d525;return Imported['VisuMZ_0_CoreEngine']?(this[_0x4bf25e(0x386)](_0x19d525,_0x28fdf3,_0x19b7d0,_0x3556e2,!![]),VisuMZ[_0x4bf25e(0x151)][_0x4bf25e(0xb9)][_0x4bf25e(0xb7)][_0x4bf25e(0x22d)]&&(_0x24a0b7+=ImageManager[_0x4bf25e(0x2ba)]+0x4)):(this['changeTextColor'](ColorManager[_0x4bf25e(0x202)]()),this['drawText'](TextManager[_0x4bf25e(0x2ea)](_0x3556e2),_0x19d525,_0x28fdf3,_0x19b7d0)),this[_0x4bf25e(0xe9)](),_0x24a0b7;},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x19a)]=function(_0x5df851,_0x58df1d,_0x458ebb,_0x291021,_0x5045a3){const _0x3bbbcc=_0x1f1bbd;_0x458ebb+=this['itemPadding'](),_0x5045a3-=this[_0x3bbbcc(0x32c)]()*0x2;const _0x311013=VisuMZ[_0x3bbbcc(0x1fc)][_0x3bbbcc(0xb9)][_0x3bbbcc(0xa5)];this['contents'][_0x3bbbcc(0x3bb)]=_0x311013[_0x3bbbcc(0x336)],this[_0x3bbbcc(0x6b)](_0x5df851[_0x3bbbcc(0x191)](this[_0x3bbbcc(0x78)]));if(_0x5df851[_0x3bbbcc(0x2d2)](this[_0x3bbbcc(0x78)])){const _0x3a3c68=_0x311013[_0x3bbbcc(0x2fc)];this[_0x3bbbcc(0x1d9)](_0x3a3c68,_0x458ebb,_0x291021,_0x5045a3,_0x3bbbcc(0x1b1));}else{if(_0x5df851['canEquip'](this[_0x3bbbcc(0x78)])){const _0x3c55d7=JsonEx[_0x3bbbcc(0x1f4)](_0x5df851);_0x3c55d7[_0x3bbbcc(0x1a7)]=!![];const _0x5057f8=_0x3c55d7['equipSlots']()['indexOf'](this['_item'][_0x3bbbcc(0x9d)]);if(_0x5057f8>=0x0)_0x3c55d7[_0x3bbbcc(0x355)](_0x5057f8,this[_0x3bbbcc(0x78)]);let _0x5bfaae=0x0,_0x43511f=0x0,_0x403fe8=0x0;Imported['VisuMZ_0_CoreEngine']?(_0x5bfaae=_0x3c55d7[_0x3bbbcc(0x7c)](_0x58df1d),_0x43511f=_0x5bfaae-_0x5df851['paramValueByName'](_0x58df1d),this['changeTextColor'](ColorManager[_0x3bbbcc(0x3b0)](_0x43511f)),_0x403fe8=(_0x43511f>=0x0?'+':'')+VisuMZ[_0x3bbbcc(0x2a5)](_0x43511f,0x0,_0x58df1d)):(_0x5bfaae=_0x3c55d7[_0x3bbbcc(0x2ea)](_0x58df1d),_0x43511f=_0x5bfaae-_0x5df851['param'](_0x58df1d),this[_0x3bbbcc(0xb3)](ColorManager[_0x3bbbcc(0x3b0)](_0x43511f)),_0x403fe8=(_0x43511f>=0x0?'+':'')+_0x43511f);if(_0x403fe8==='+0')_0x403fe8=_0x311013[_0x3bbbcc(0x1e1)];this[_0x3bbbcc(0x1d9)](_0x403fe8,_0x458ebb,_0x291021,_0x5045a3,'center');}else{const _0x2e8dc4=_0x311013[_0x3bbbcc(0x13b)];this['drawText'](_0x2e8dc4,_0x458ebb,_0x291021,_0x5045a3,'center');}}this[_0x3bbbcc(0xe9)](),this[_0x3bbbcc(0x6b)](!![]);},Window_ShopStatus[_0x1f1bbd(0x187)]['drawItemData']=function(){const _0xbd058b=_0x1f1bbd;VisuMZ[_0xbd058b(0x1fc)][_0xbd058b(0xb9)][_0xbd058b(0xa5)]['DrawItemData'][_0xbd058b(0x358)](this);},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x3a4)]=function(){const _0x3bf4b5=_0x1f1bbd;this[_0x3bf4b5(0x296)]={};if(!this['_item'])return;const _0x3650aa=this[_0x3bf4b5(0x78)][_0x3bf4b5(0x262)];if(_0x3650aa[_0x3bf4b5(0x124)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x45928b=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x40b906 of _0x45928b){if(_0x40b906[_0x3bf4b5(0x124)](/(.*):[ ](.*)/i)){const _0x570c0f=String(RegExp['$1'])[_0x3bf4b5(0x14e)]()[_0x3bf4b5(0xc0)](),_0x2e8d2f=String(RegExp['$2'])['trim']();this[_0x3bf4b5(0x296)][_0x570c0f]=_0x2e8d2f;}}}},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x1a1)]=function(){const _0x416568=_0x1f1bbd;return Math[_0x416568(0x31a)](0x1,$gameSystem[_0x416568(0x1c8)]()-0x4);},Window_ShopStatus['prototype']['resetFontSettings']=function(){const _0x54db7c=_0x1f1bbd;Window_StatusBase[_0x54db7c(0x187)][_0x54db7c(0xe9)]['call'](this),this[_0x54db7c(0x1be)]['fontSize']=this['_resetFontSize']||this['contents'][_0x54db7c(0x3bb)],this[_0x54db7c(0x1be)][_0x54db7c(0x1b7)]=this[_0x54db7c(0x1cb)]||this[_0x54db7c(0x1be)][_0x54db7c(0x1b7)];},Window_ShopStatus[_0x1f1bbd(0x187)]['fontSizeRatio']=function(){const _0x4263e6=_0x1f1bbd;return this[_0x4263e6(0x1be)][_0x4263e6(0x3bb)]/$gameSystem[_0x4263e6(0x1c8)]();},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x20d)]=function(_0x171b9c,_0x33a925,_0x190d24){const _0x200a87=_0x1f1bbd,_0x43e4cc=ImageManager[_0x200a87(0x2ee)](_0x200a87(0xcf)),_0x15e1d3=ImageManager[_0x200a87(0x2ba)],_0x23c423=ImageManager[_0x200a87(0x2e4)],_0x2225b4=_0x171b9c%0x10*_0x15e1d3,_0x1ae142=Math[_0x200a87(0x1b3)](_0x171b9c/0x10)*_0x23c423,_0x5355eb=Math[_0x200a87(0x111)](_0x15e1d3*this['fontSizeRatio']()),_0x42692b=Math[_0x200a87(0x111)](_0x23c423*this[_0x200a87(0xd1)]());this['contents']['blt'](_0x43e4cc,_0x2225b4,_0x1ae142,_0x15e1d3,_0x23c423,_0x33a925,_0x190d24,_0x5355eb,_0x42692b);},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x210)]=function(_0x51e2e3,_0x270bce){const _0x3a5866=_0x1f1bbd;_0x270bce[_0x3a5866(0x18f)]&&this['drawIcon'](_0x51e2e3,_0x270bce['x'],_0x270bce['y']+0x2);_0x270bce['x']+=Math[_0x3a5866(0x111)](ImageManager[_0x3a5866(0x2ba)]*this[_0x3a5866(0xd1)]());if(this[_0x3a5866(0xd1)]()===0x1)_0x270bce['x']+=0x4;},Window_ShopStatus[_0x1f1bbd(0x187)]['drawItemKeyData']=function(_0x474b07,_0x460343,_0x422e8f,_0x28685d,_0x1a8372,_0x43174e){const _0x2de631=_0x1f1bbd;_0x474b07=_0x474b07||'',_0x43174e=_0x43174e||_0x2de631(0x214),this[_0x2de631(0x18d)]=this[_0x2de631(0x1a1)](),this['_resetFontColor']=_0x1a8372?ColorManager['systemColor']():this['contents'][_0x2de631(0x1b7)],_0x460343+=this[_0x2de631(0x32c)](),_0x28685d-=this[_0x2de631(0x32c)]()*0x2;const _0x541d0b=this[_0x2de631(0x237)](_0x474b07);if(_0x43174e==='center')_0x460343=_0x460343+Math[_0x2de631(0x1b3)]((_0x28685d-_0x541d0b['width'])/0x2);else _0x43174e===_0x2de631(0x20c)&&(_0x460343=_0x460343+_0x28685d-_0x541d0b[_0x2de631(0x171)]);_0x422e8f+=(this[_0x2de631(0x3a5)]()-_0x541d0b[_0x2de631(0x1d6)])/0x2,this[_0x2de631(0x32d)](_0x474b07,_0x460343,_0x422e8f,_0x28685d),this['_resetFontSize']=undefined,this[_0x2de631(0x1cb)]=undefined,this['resetFontSettings']();},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x2d5)]=function(_0x5dcf3d,_0x270fe8,_0x4b77f1){const _0x4447de=_0x1f1bbd;if(!DataManager[_0x4447de(0x1ce)](this[_0x4447de(0x78)]))return![];const _0x50f51f=this[_0x4447de(0x20a)]();this[_0x4447de(0x1e6)](_0x50f51f,_0x5dcf3d,_0x270fe8,_0x4b77f1,!![]);const _0x10143e=this[_0x4447de(0x173)]();return this['drawItemKeyData'](_0x10143e,_0x5dcf3d,_0x270fe8,_0x4b77f1,![],'right'),this[_0x4447de(0x35a)](_0x5dcf3d,_0x270fe8,_0x4b77f1),this[_0x4447de(0xe9)](),!![];},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x20a)]=function(){const _0x3a556d=_0x1f1bbd;return VisuMZ[_0x3a556d(0x1fc)][_0x3a556d(0xb9)][_0x3a556d(0xa5)][_0x3a556d(0x66)];},Window_ShopStatus[_0x1f1bbd(0x187)]['getItemConsumableText']=function(){const _0x47737a=_0x1f1bbd,_0x278df9=_0x47737a(0xe8);if(this[_0x47737a(0x296)][_0x278df9])return this[_0x47737a(0x296)][_0x278df9];return this['canConsumeItem']()?VisuMZ[_0x47737a(0x1fc)][_0x47737a(0xb9)]['StatusWindow'][_0x47737a(0x2a0)]:VisuMZ[_0x47737a(0x1fc)]['Settings']['StatusWindow'][_0x47737a(0x383)];},Window_ShopStatus[_0x1f1bbd(0x187)]['canConsumeItem']=function(){const _0x3c75e4=_0x1f1bbd;return VisuMZ['CoreEngine']&&VisuMZ[_0x3c75e4(0x151)][_0x3c75e4(0xb9)][_0x3c75e4(0x186)][_0x3c75e4(0x251)]&&DataManager[_0x3c75e4(0x94)](this[_0x3c75e4(0x78)])?![]:this[_0x3c75e4(0x78)][_0x3c75e4(0x399)];},Window_ShopStatus[_0x1f1bbd(0x187)]['drawItemQuantity']=function(_0x345913,_0x503cb7,_0x19e49b){const _0x2ea75f=_0x1f1bbd;if(!this['isEquipItem']()&&!DataManager[_0x2ea75f(0x1ce)](this['_item']))return![];if(DataManager[_0x2ea75f(0x94)](this[_0x2ea75f(0x78)])&&!$dataSystem[_0x2ea75f(0x395)]){const _0x39e3b2=TextManager[_0x2ea75f(0x103)];this[_0x2ea75f(0x1e6)](_0x39e3b2,_0x345913,_0x503cb7,_0x19e49b,!![],_0x2ea75f(0x1b1));}else{const _0x8274b4=TextManager[_0x2ea75f(0x146)];this['drawItemKeyData'](_0x8274b4,_0x345913,_0x503cb7,_0x19e49b,!![]);const _0x1510d1=this[_0x2ea75f(0x34e)]();this[_0x2ea75f(0x1e6)](_0x1510d1,_0x345913,_0x503cb7,_0x19e49b,![],_0x2ea75f(0x20c));}return this[_0x2ea75f(0x35a)](_0x345913,_0x503cb7,_0x19e49b),this[_0x2ea75f(0xe9)](),!![];},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x34e)]=function(){const _0xd70909=_0x1f1bbd,_0x3db3c8=_0xd70909(0x12b);if(this[_0xd70909(0x296)][_0x3db3c8])return this[_0xd70909(0x296)][_0x3db3c8];const _0x21c912=VisuMZ['ItemsEquipsCore'][_0xd70909(0xb9)][_0xd70909(0x305)][_0xd70909(0x2da)];return _0x21c912['format']($gameParty[_0xd70909(0xa9)](this[_0xd70909(0x78)]));},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x21a)]=function(_0x1c2694,_0x3f8a4a,_0x3dff74){const _0xd66064=_0x1f1bbd,_0x237f65=this[_0xd66064(0x169)]();return this[_0xd66064(0x1e6)](_0x237f65,_0x1c2694,_0x3f8a4a,_0x3dff74,![],_0xd66064(0x1b1)),this[_0xd66064(0x35a)](_0x1c2694,_0x3f8a4a,_0x3dff74),this[_0xd66064(0xe9)](),!![];},Window_ShopStatus[_0x1f1bbd(0x187)]['getItemOccasionText']=function(){const _0x5566fd=_0x1f1bbd,_0x3bb481='OCCASION';if(this[_0x5566fd(0x296)][_0x3bb481])return this['_customItemInfo'][_0x3bb481];const _0x14194f=VisuMZ[_0x5566fd(0x1fc)][_0x5566fd(0xb9)][_0x5566fd(0xa5)],_0x1316d6=_0x5566fd(0x261)[_0x5566fd(0x2dd)](this[_0x5566fd(0x78)]['occasion']);return _0x14194f[_0x1316d6];},Window_ShopStatus['prototype'][_0x1f1bbd(0x372)]=function(_0x37f73f,_0x457e9c,_0x4f05ae){const _0x40a198=_0x1f1bbd,_0x544360=this[_0x40a198(0x3af)]();return this['drawItemKeyData'](_0x544360,_0x37f73f,_0x457e9c,_0x4f05ae,![],_0x40a198(0x1b1)),this[_0x40a198(0x35a)](_0x37f73f,_0x457e9c,_0x4f05ae),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x3af)]=function(){const _0x3450f6=_0x1f1bbd,_0x394971=_0x3450f6(0x109);if(this[_0x3450f6(0x296)][_0x394971])return this[_0x3450f6(0x296)][_0x394971];const _0x5cbaaf=VisuMZ[_0x3450f6(0x1fc)][_0x3450f6(0xb9)]['StatusWindow'];if(Imported[_0x3450f6(0x7a)]){const _0x119be2=this[_0x3450f6(0x78)][_0x3450f6(0x262)];if(_0x119be2[_0x3450f6(0x124)](/<TARGET:[ ](.*)>/i)){const _0x5a9dc0=String(RegExp['$1']);if(_0x5a9dc0[_0x3450f6(0x124)](/(\d+) RANDOM ANY/i))return _0x5cbaaf[_0x3450f6(0x2f7)][_0x3450f6(0x2dd)](Number(RegExp['$1']));else{if(_0x5a9dc0[_0x3450f6(0x124)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x5cbaaf[_0x3450f6(0x270)]['format'](Number(RegExp['$1']));else{if(_0x5a9dc0['match'](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return _0x5cbaaf[_0x3450f6(0x154)][_0x3450f6(0x2dd)](Number(RegExp['$1']));else{if(_0x5a9dc0[_0x3450f6(0x124)](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x5cbaaf['ScopeAlliesButUser'];}}}}}const _0x321835=_0x3450f6(0x9a)['format'](this[_0x3450f6(0x78)]['scope']);return _0x5cbaaf[_0x321835];},Window_ShopStatus['prototype'][_0x1f1bbd(0xca)]=function(_0x248ea5,_0x5385d2,_0x2d129b){const _0x57197a=_0x1f1bbd,_0x1aecad=this[_0x57197a(0x30a)]();this[_0x57197a(0x1e6)](_0x1aecad,_0x248ea5,_0x5385d2,_0x2d129b,!![]);const _0x20a187=this[_0x57197a(0x19e)]();return this[_0x57197a(0x1e6)](_0x20a187,_0x248ea5,_0x5385d2,_0x2d129b,![],'right'),this[_0x57197a(0x35a)](_0x248ea5,_0x5385d2,_0x2d129b),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x30a)]=function(){const _0x28ea6e=_0x1f1bbd;return VisuMZ['ItemsEquipsCore'][_0x28ea6e(0xb9)][_0x28ea6e(0xa5)]['LabelSpeed'];},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x19e)]=function(){const _0x325e4a=_0x1f1bbd,_0x355285=_0x325e4a(0x376);if(this[_0x325e4a(0x296)][_0x355285])return this['_customItemInfo'][_0x355285];const _0x5eec85=this[_0x325e4a(0x78)][_0x325e4a(0x314)];if(_0x5eec85>=0x7d0)return VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow'][_0x325e4a(0x92)];else{if(_0x5eec85>=0x3e8)return VisuMZ[_0x325e4a(0x1fc)][_0x325e4a(0xb9)][_0x325e4a(0xa5)][_0x325e4a(0x39b)];else{if(_0x5eec85>0x0)return VisuMZ[_0x325e4a(0x1fc)][_0x325e4a(0xb9)][_0x325e4a(0xa5)][_0x325e4a(0x13a)];else{if(_0x5eec85===0x0)return VisuMZ['ItemsEquipsCore'][_0x325e4a(0xb9)][_0x325e4a(0xa5)][_0x325e4a(0x1b6)];else{if(_0x5eec85>-0x3e8)return VisuMZ['ItemsEquipsCore'][_0x325e4a(0xb9)][_0x325e4a(0xa5)][_0x325e4a(0x138)];else{if(_0x5eec85>-0x7d0)return VisuMZ[_0x325e4a(0x1fc)][_0x325e4a(0xb9)][_0x325e4a(0xa5)][_0x325e4a(0x359)];else return _0x5eec85<=-0x7d0?VisuMZ['ItemsEquipsCore']['Settings'][_0x325e4a(0xa5)][_0x325e4a(0x322)]:_0x325e4a(0x354);}}}}}},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x1e0)]=function(_0x2a378b,_0x1ae4c4,_0x5d415a){const _0x301682=_0x1f1bbd,_0x52b5fd=this['getItemSuccessRateLabel']();this['drawItemKeyData'](_0x52b5fd,_0x2a378b,_0x1ae4c4,_0x5d415a,!![]);const _0x41c0d8=this[_0x301682(0x35b)]();return this['drawItemKeyData'](_0x41c0d8,_0x2a378b,_0x1ae4c4,_0x5d415a,![],_0x301682(0x20c)),this[_0x301682(0x35a)](_0x2a378b,_0x1ae4c4,_0x5d415a),this[_0x301682(0xe9)](),!![];},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x37f)]=function(){const _0x2f4b4b=_0x1f1bbd;return VisuMZ['ItemsEquipsCore'][_0x2f4b4b(0xb9)][_0x2f4b4b(0xa5)][_0x2f4b4b(0x303)];},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x35b)]=function(){const _0x4d1b7c=_0x1f1bbd,_0x3db34d=_0x4d1b7c(0xef);if(this[_0x4d1b7c(0x296)][_0x3db34d])return this[_0x4d1b7c(0x296)][_0x3db34d];if(Imported[_0x4d1b7c(0x7a)]){const _0x523b0f=this[_0x4d1b7c(0x78)][_0x4d1b7c(0x262)];if(_0x523b0f[_0x4d1b7c(0x124)](/<ALWAYS HIT>/i))return'100%';else{if(_0x523b0f[_0x4d1b7c(0x124)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x4d1b7c(0x122)['format'](Number(RegExp['$1']));}}return _0x4d1b7c(0x122)[_0x4d1b7c(0x2dd)](this[_0x4d1b7c(0x78)][_0x4d1b7c(0x91)]);},Window_ShopStatus['prototype'][_0x1f1bbd(0x397)]=function(_0xabef43,_0x15ffe8,_0x59a589){const _0x5cbaf9=_0x1f1bbd,_0x3d2244=this[_0x5cbaf9(0x12c)]();this[_0x5cbaf9(0x1e6)](_0x3d2244,_0xabef43,_0x15ffe8,_0x59a589,!![]);const _0x536ef3=this[_0x5cbaf9(0x1b5)]();return this[_0x5cbaf9(0x1e6)](_0x536ef3,_0xabef43,_0x15ffe8,_0x59a589,![],'right'),this[_0x5cbaf9(0x35a)](_0xabef43,_0x15ffe8,_0x59a589),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x12c)]=function(){const _0x1af7f6=_0x1f1bbd;return VisuMZ[_0x1af7f6(0x1fc)]['Settings'][_0x1af7f6(0xa5)]['LabelRepeats'];},Window_ShopStatus[_0x1f1bbd(0x187)]['getItemRepeatsText']=function(){const _0x3488af=_0x1f1bbd,_0xf10727=_0x3488af(0x3a0);if(this[_0x3488af(0x296)][_0xf10727])return this[_0x3488af(0x296)][_0xf10727];const _0x821c93=_0x3488af(0x225);return _0x821c93[_0x3488af(0x2dd)](this[_0x3488af(0x78)][_0x3488af(0x360)]);},Window_ShopStatus[_0x1f1bbd(0x187)]['drawItemHitType']=function(_0x457ec2,_0x10cea4,_0x30611d){const _0x20d388=_0x1f1bbd,_0x10fa89=this[_0x20d388(0x15f)]();this[_0x20d388(0x1e6)](_0x10fa89,_0x457ec2,_0x10cea4,_0x30611d,!![]);const _0x214506=this[_0x20d388(0x176)]();return this[_0x20d388(0x1e6)](_0x214506,_0x457ec2,_0x10cea4,_0x30611d,![],_0x20d388(0x20c)),this[_0x20d388(0x35a)](_0x457ec2,_0x10cea4,_0x30611d),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x15f)]=function(){const _0xeea2e0=_0x1f1bbd;return VisuMZ['ItemsEquipsCore']['Settings'][_0xeea2e0(0xa5)][_0xeea2e0(0x10f)];},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x176)]=function(){const _0x389675=_0x1f1bbd,_0x425b9d=_0x389675(0xd0);if(this[_0x389675(0x296)][_0x425b9d])return this[_0x389675(0x296)][_0x425b9d];const _0x1ac944=VisuMZ[_0x389675(0x1fc)]['Settings'][_0x389675(0xa5)],_0x529316=_0x389675(0x250)[_0x389675(0x2dd)](this[_0x389675(0x78)][_0x389675(0x365)]);return _0x1ac944[_0x529316];},Window_ShopStatus[_0x1f1bbd(0x187)]['drawItemDamage']=function(_0x25c17c,_0x49f821,_0x47a543){const _0x1995e1=_0x1f1bbd;if(this['_item'][_0x1995e1(0x17d)]['type']<=0x0)return _0x49f821;if(this[_0x1995e1(0x36b)](_0x25c17c,_0x49f821,_0x47a543))_0x49f821+=this[_0x1995e1(0x3a5)]();if(this[_0x1995e1(0x28c)](_0x25c17c,_0x49f821,_0x47a543))_0x49f821+=this[_0x1995e1(0x3a5)]();return this['resetFontSettings'](),_0x49f821;},Window_ShopStatus[_0x1f1bbd(0x187)]['drawItemDamageElement']=function(_0x147503,_0x1bdaf2,_0x5b87b0){const _0x5f2000=_0x1f1bbd,_0x4d1303=this[_0x5f2000(0x2db)]();this[_0x5f2000(0x1e6)](_0x4d1303,_0x147503,_0x1bdaf2,_0x5b87b0,!![]);const _0x30dab5=this['getItemDamageElementText']();return this['drawItemKeyData'](_0x30dab5,_0x147503,_0x1bdaf2,_0x5b87b0,![],_0x5f2000(0x20c)),this[_0x5f2000(0x35a)](_0x147503,_0x1bdaf2,_0x5b87b0),this[_0x5f2000(0xe9)](),!![];},Window_ShopStatus['prototype'][_0x1f1bbd(0x2db)]=function(){const _0x2264e7=_0x1f1bbd;return VisuMZ['ItemsEquipsCore'][_0x2264e7(0xb9)][_0x2264e7(0xa5)][_0x2264e7(0x284)];},Window_ShopStatus[_0x1f1bbd(0x187)]['getItemDamageElementText']=function(){const _0x29011f=_0x1f1bbd,_0x526179=_0x29011f(0x3bf);if(this[_0x29011f(0x296)][_0x526179])return this['_customItemInfo'][_0x526179];if(this[_0x29011f(0x78)][_0x29011f(0x17d)][_0x29011f(0x1c7)]<=-0x1)return VisuMZ['ItemsEquipsCore'][_0x29011f(0xb9)][_0x29011f(0xa5)]['ElementWeapon'];else return this['_item'][_0x29011f(0x17d)][_0x29011f(0x1c7)]===0x0?VisuMZ[_0x29011f(0x1fc)][_0x29011f(0xb9)]['StatusWindow']['ElementNone']:$dataSystem[_0x29011f(0x13d)][this[_0x29011f(0x78)][_0x29011f(0x17d)]['elementId']];},Window_ShopStatus['prototype'][_0x1f1bbd(0x28c)]=function(_0x3b9a44,_0x5e14ac,_0x1593cc){const _0x19d62d=_0x1f1bbd,_0x2e3110=this['getItemDamageAmountLabel']();this['drawItemKeyData'](_0x2e3110,_0x3b9a44,_0x5e14ac,_0x1593cc,!![]),this[_0x19d62d(0x134)]();const _0x348ce3=this[_0x19d62d(0x25e)](),_0x19312d=ColorManager[_0x19d62d(0x1bb)]([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x19d62d(0x78)][_0x19d62d(0x17d)]['type']]);return this[_0x19d62d(0xb3)](_0x19312d),this['drawItemKeyData'](_0x348ce3,_0x3b9a44,_0x5e14ac,_0x1593cc,![],_0x19d62d(0x20c)),this['drawItemDarkRect'](_0x3b9a44,_0x5e14ac,_0x1593cc),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x259)]=function(){const _0x2768ca=_0x1f1bbd;return Imported[_0x2768ca(0x7a)]&&DataManager[_0x2768ca(0x3bd)](this[_0x2768ca(0x78)])!=='MANUAL'?this[_0x2768ca(0x38b)]():this[_0x2768ca(0x89)]();},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x89)]=function(){const _0x4435b6=_0x1f1bbd,_0x63204c=VisuMZ[_0x4435b6(0x1fc)][_0x4435b6(0xb9)][_0x4435b6(0xa5)],_0xe66e8a=_0x4435b6(0x302)[_0x4435b6(0x2dd)](this[_0x4435b6(0x78)][_0x4435b6(0x17d)][_0x4435b6(0x28a)]),_0x190bbb=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this['_item']['damage'][_0x4435b6(0x28a)]];return _0x63204c[_0xe66e8a][_0x4435b6(0x2dd)](_0x190bbb);},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x134)]=function(){const _0x1ac981=_0x1f1bbd,_0x53d8e2=$gameActors[_0x1ac981(0x328)](0x1);this[_0x1ac981(0x164)]=JsonEx[_0x1ac981(0x1f4)](_0x53d8e2),this[_0x1ac981(0x1b9)]=JsonEx[_0x1ac981(0x1f4)](_0x53d8e2);},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x25e)]=function(){const _0x1540e0=_0x1f1bbd,_0x455573=_0x1540e0(0x1ff);if(this[_0x1540e0(0x296)][_0x455573])return this[_0x1540e0(0x296)][_0x455573];return Imported[_0x1540e0(0x7a)]&&DataManager[_0x1540e0(0x3bd)](this['_item'])!==_0x1540e0(0x71)?this[_0x1540e0(0xda)]():this[_0x1540e0(0x320)]();},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x320)]=function(){const _0x203be4=_0x1f1bbd;window['a']=this[_0x203be4(0x164)],window['b']=this[_0x203be4(0x1b9)],this[_0x203be4(0x164)][_0x203be4(0x3a7)](!![]),this[_0x203be4(0x1b9)]['setShopStatusWindowMode']([0x3,0x4][_0x203be4(0x1a9)](this[_0x203be4(0x78)]['damage'][_0x203be4(0x28a)]));let _0x1f22db=this[_0x203be4(0x78)][_0x203be4(0x17d)][_0x203be4(0x1dc)];try{const _0x39bc48=Math['max'](eval(_0x1f22db),0x0)/window['a'][_0x203be4(0x24e)];return this[_0x203be4(0x236)](),isNaN(_0x39bc48)?_0x203be4(0x354):_0x203be4(0x122)['format'](Math[_0x203be4(0x112)](_0x39bc48*0x64));}catch(_0x508901){return $gameTemp[_0x203be4(0x2bb)]()&&(console['log'](_0x203be4(0x2f2)[_0x203be4(0x2dd)](this[_0x203be4(0x78)][_0x203be4(0xce)])),console[_0x203be4(0x323)](_0x508901)),this['revertGlobalNamespaceVariables'](),_0x203be4(0x354);}},Window_ShopStatus['prototype']['revertGlobalNamespaceVariables']=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x327)]=function(_0x282d09,_0x10b836,_0x350609){const _0x28dfac=_0x1f1bbd;if(!this['makeItemData']())return _0x10b836;if(this[_0x28dfac(0x2b2)](_0x282d09,_0x10b836,_0x350609))_0x10b836+=this[_0x28dfac(0x3a5)]();if(this[_0x28dfac(0x194)](_0x282d09,_0x10b836,_0x350609))_0x10b836+=this['lineHeight']();if(this[_0x28dfac(0x19b)](_0x282d09,_0x10b836,_0x350609))_0x10b836+=this[_0x28dfac(0x3a5)]();if(this[_0x28dfac(0x27a)](_0x282d09,_0x10b836,_0x350609))_0x10b836+=this['lineHeight']();if(this[_0x28dfac(0xb4)](_0x282d09,_0x10b836,_0x350609))_0x10b836+=this['lineHeight']();if(this['drawItemEffectsTpDamage'](_0x282d09,_0x10b836,_0x350609))_0x10b836+=this[_0x28dfac(0x3a5)]();if(this[_0x28dfac(0x27f)](_0x282d09,_0x10b836,_0x350609))_0x10b836+=this[_0x28dfac(0x3a5)]();if(this[_0x28dfac(0x2af)](_0x282d09,_0x10b836,_0x350609))_0x10b836+=this['lineHeight']();if(this[_0x28dfac(0x90)](_0x282d09,_0x10b836,_0x350609))_0x10b836+=this[_0x28dfac(0x3a5)]();return this[_0x28dfac(0xe9)](),_0x10b836;},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x347)]=function(){const _0x4b6879=_0x1f1bbd;let _0x4aade1=![];this['_itemData']={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};for(const _0x2ad692 of this['_item'][_0x4b6879(0x369)]){switch(_0x2ad692[_0x4b6879(0x344)]){case Game_Action[_0x4b6879(0x301)]:this[_0x4b6879(0x1d5)][_0x4b6879(0x74)]+=_0x2ad692[_0x4b6879(0x212)],this['_itemData']['flatHP']+=_0x2ad692['value2'],_0x4aade1=!![];break;case Game_Action[_0x4b6879(0x26b)]:this[_0x4b6879(0x1d5)]['rateMP']+=_0x2ad692[_0x4b6879(0x212)],this[_0x4b6879(0x1d5)][_0x4b6879(0x3b1)]+=_0x2ad692[_0x4b6879(0x180)],_0x4aade1=!![];break;case Game_Action[_0x4b6879(0x147)]:this[_0x4b6879(0x1d5)][_0x4b6879(0xb1)]+=_0x2ad692[_0x4b6879(0x212)],_0x4aade1=!![];break;case Game_Action[_0x4b6879(0x2d4)]:this['_itemData']['addState']['push'](_0x2ad692[_0x4b6879(0x144)]),_0x4aade1=!![];break;case Game_Action['EFFECT_REMOVE_STATE']:this[_0x4b6879(0x1d5)][_0x4b6879(0x3c8)][_0x4b6879(0x1c0)](_0x2ad692['dataId']),this['_itemData'][_0x4b6879(0x3a2)]=!![],_0x4aade1=!![];break;case Game_Action['EFFECT_ADD_BUFF']:this['_itemData'][_0x4b6879(0x315)][_0x2ad692['dataId']]+=0x1,_0x4aade1=!![];break;case Game_Action[_0x4b6879(0x2e6)]:this[_0x4b6879(0x1d5)]['changeBuff'][_0x2ad692['dataId']]-=0x1,_0x4aade1=!![];break;case Game_Action[_0x4b6879(0xc9)]:this[_0x4b6879(0x1d5)]['removeBuff'][_0x4b6879(0x1c0)](_0x2ad692['dataId']),this['_itemData'][_0x4b6879(0x3a2)]=!![],_0x4aade1=!![];break;case Game_Action['EFFECT_REMOVE_DEBUFF']:this[_0x4b6879(0x1d5)][_0x4b6879(0x2dc)]['push'](_0x2ad692[_0x4b6879(0x144)]),this[_0x4b6879(0x1d5)][_0x4b6879(0x3a2)]=!![],_0x4aade1=!![];break;}}if(this['_itemData'][_0x4b6879(0x1c1)]['length']>0x0)this[_0x4b6879(0x1d5)][_0x4b6879(0xee)]=!![];for(let _0x5d5e2b=0x0;_0x5d5e2b<this['_itemData'][_0x4b6879(0x315)][_0x4b6879(0x2f0)];_0x5d5e2b++){if(this[_0x4b6879(0x1d5)]['changeBuff'][_0x5d5e2b]!==0x0)this['_itemData'][_0x4b6879(0xee)]=!![];}this[_0x4b6879(0x78)][_0x4b6879(0xc2)]!==0x0&&(this[_0x4b6879(0x1d5)][_0x4b6879(0x108)]=this[_0x4b6879(0x78)]['tpGain'],_0x4aade1=!![]);const _0x179dfb=[_0x4b6879(0x362),_0x4b6879(0x116),_0x4b6879(0xfe),_0x4b6879(0x1c6),'MP\x20DAMAGE','TP\x20DAMAGE',_0x4b6879(0x224),'ADDED\x20EFFECTS','REMOVED\x20EFFECTS'];for(const _0x5b24aa of _0x179dfb){if(this[_0x4b6879(0x296)][_0x5b24aa]){_0x4aade1=!![];break;}}return _0x4aade1;},Window_ShopStatus['prototype'][_0x1f1bbd(0x2b2)]=function(_0x32dc45,_0x4803e6,_0x681c82){const _0x33535e=_0x1f1bbd,_0x5a12ac=_0x33535e(0x362);if(this[_0x33535e(0x1d5)][_0x33535e(0x74)]<=0x0&&this[_0x33535e(0x1d5)][_0x33535e(0x157)]<=0x0&&!this[_0x33535e(0x296)][_0x5a12ac])return![];const _0x6c6148=this[_0x33535e(0x97)]();this[_0x33535e(0x1e6)](_0x6c6148,_0x32dc45,_0x4803e6,_0x681c82,!![]);const _0x4b9e17=this[_0x33535e(0x93)]();return this[_0x33535e(0xb3)](ColorManager[_0x33535e(0x1bb)](0x1)),this['drawItemKeyData'](_0x4b9e17,_0x32dc45,_0x4803e6,_0x681c82,![],_0x33535e(0x20c)),this[_0x33535e(0x35a)](_0x32dc45,_0x4803e6,_0x681c82),this[_0x33535e(0xe9)](),!![];},Window_ShopStatus[_0x1f1bbd(0x187)]['getItemEffectsHpRecoveryLabel']=function(){const _0x35c724=_0x1f1bbd,_0x548393=VisuMZ[_0x35c724(0x1fc)]['Settings'][_0x35c724(0xa5)][_0x35c724(0x166)];return _0x548393['format'](TextManager['hp']);},Window_ShopStatus['prototype'][_0x1f1bbd(0x93)]=function(){const _0x584ec1=_0x1f1bbd,_0x4471ce=_0x584ec1(0x362);if(this[_0x584ec1(0x296)][_0x4471ce])return this['_customItemInfo'][_0x4471ce];let _0x2c1694='';if(this[_0x584ec1(0x1d5)][_0x584ec1(0x74)]>0x0)_0x2c1694+=_0x584ec1(0x24d)[_0x584ec1(0x2dd)](Math['floor'](this['_itemData']['rateHP']*0x64));if(this[_0x584ec1(0x1d5)][_0x584ec1(0x74)]>0x0&&this[_0x584ec1(0x1d5)][_0x584ec1(0x157)]>0x0)_0x2c1694+='\x20';if(this['_itemData'][_0x584ec1(0x157)]>0x0)_0x2c1694+=_0x584ec1(0x39f)[_0x584ec1(0x2dd)](this[_0x584ec1(0x1d5)][_0x584ec1(0x157)]);return _0x2c1694;},Window_ShopStatus['prototype'][_0x1f1bbd(0x194)]=function(_0x109e8f,_0x207e95,_0x2f5b7c){const _0x41451f=_0x1f1bbd,_0x3e4c62='MP\x20RECOVERY';if(this[_0x41451f(0x1d5)][_0x41451f(0x15d)]<=0x0&&this[_0x41451f(0x1d5)][_0x41451f(0x3b1)]<=0x0&&!this[_0x41451f(0x296)][_0x3e4c62])return![];const _0x4a8eab=this['getItemEffectsMpRecoveryLabel']();this[_0x41451f(0x1e6)](_0x4a8eab,_0x109e8f,_0x207e95,_0x2f5b7c,!![]);const _0x3064d2=this[_0x41451f(0x10a)]();return this[_0x41451f(0xb3)](ColorManager[_0x41451f(0x1bb)](0x3)),this[_0x41451f(0x1e6)](_0x3064d2,_0x109e8f,_0x207e95,_0x2f5b7c,![],'right'),this[_0x41451f(0x35a)](_0x109e8f,_0x207e95,_0x2f5b7c),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x209)]=function(){const _0xc26d0d=_0x1f1bbd,_0x44b160=VisuMZ['ItemsEquipsCore'][_0xc26d0d(0xb9)][_0xc26d0d(0xa5)][_0xc26d0d(0x15a)];return _0x44b160[_0xc26d0d(0x2dd)](TextManager['mp']);},Window_ShopStatus['prototype'][_0x1f1bbd(0x10a)]=function(){const _0x2e811b=_0x1f1bbd,_0x270168=_0x2e811b(0x116);if(this[_0x2e811b(0x296)][_0x270168])return this[_0x2e811b(0x296)][_0x270168];let _0x2a7944='';if(this[_0x2e811b(0x1d5)][_0x2e811b(0x15d)]>0x0)_0x2a7944+=_0x2e811b(0x24d)[_0x2e811b(0x2dd)](Math['floor'](this[_0x2e811b(0x1d5)][_0x2e811b(0x15d)]*0x64));if(this[_0x2e811b(0x1d5)][_0x2e811b(0x15d)]>0x0&&this[_0x2e811b(0x1d5)][_0x2e811b(0x3b1)]>0x0)_0x2a7944+='\x20';if(this[_0x2e811b(0x1d5)][_0x2e811b(0x3b1)]>0x0)_0x2a7944+='+%1'['format'](this[_0x2e811b(0x1d5)][_0x2e811b(0x3b1)]);return _0x2a7944;},Window_ShopStatus['prototype'][_0x1f1bbd(0x19b)]=function(_0xdb287f,_0x125a7d,_0x3fb942){const _0x32daeb=_0x1f1bbd,_0x223dd0=_0x32daeb(0xfe);if(this[_0x32daeb(0x1d5)]['gainTP']<=0x0&&!this[_0x32daeb(0x296)][_0x223dd0])return![];const _0x3a67f1=this[_0x32daeb(0x95)]();this[_0x32daeb(0x1e6)](_0x3a67f1,_0xdb287f,_0x125a7d,_0x3fb942,!![]);const _0x2bdfb6=this[_0x32daeb(0x2e2)]();return this['changeTextColor'](ColorManager[_0x32daeb(0x2eb)]()),this[_0x32daeb(0x1e6)](_0x2bdfb6,_0xdb287f,_0x125a7d,_0x3fb942,![],_0x32daeb(0x20c)),this[_0x32daeb(0x35a)](_0xdb287f,_0x125a7d,_0x3fb942),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x95)]=function(){const _0x1bb681=_0x1f1bbd,_0x1b4422=VisuMZ['ItemsEquipsCore']['Settings'][_0x1bb681(0xa5)]['LabelRecoverTP'];return _0x1b4422[_0x1bb681(0x2dd)](TextManager['tp']);},Window_ShopStatus['prototype'][_0x1f1bbd(0x2e2)]=function(){const _0x30e2f2=_0x1f1bbd,_0x3103a5=_0x30e2f2(0xfe);if(this[_0x30e2f2(0x296)][_0x3103a5])return this[_0x30e2f2(0x296)][_0x3103a5];let _0x4db22c='';return _0x4db22c+=_0x30e2f2(0x39f)['format'](this[_0x30e2f2(0x1d5)][_0x30e2f2(0xb1)]),_0x4db22c;},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x27f)]=function(_0x4cd9b9,_0x46ff31,_0x1e4ecc){const _0x39f068=_0x1f1bbd,_0x1d3d41=_0x39f068(0x224);if(this[_0x39f068(0x1d5)][_0x39f068(0x108)]===0x0&&!this[_0x39f068(0x296)][_0x1d3d41])return![];const _0x188f75=this[_0x39f068(0x3c1)]();this[_0x39f068(0x1e6)](_0x188f75,_0x4cd9b9,_0x46ff31,_0x1e4ecc,!![]);const _0x2437cf=this[_0x39f068(0x367)]();return this[_0x39f068(0x1d5)][_0x39f068(0x108)]>0x0?this[_0x39f068(0xb3)](ColorManager['powerUpColor']()):this[_0x39f068(0xb3)](ColorManager[_0x39f068(0x1ac)]()),this['drawItemKeyData'](_0x2437cf,_0x4cd9b9,_0x46ff31,_0x1e4ecc,![],_0x39f068(0x20c)),this[_0x39f068(0x35a)](_0x4cd9b9,_0x46ff31,_0x1e4ecc),this[_0x39f068(0xe9)](),!![];},Window_ShopStatus['prototype']['getItemEffectsSelfTpGainLabel']=function(){const _0x506a1e=_0x1f1bbd,_0xa996cc=VisuMZ[_0x506a1e(0x1fc)][_0x506a1e(0xb9)][_0x506a1e(0xa5)][_0x506a1e(0x2b1)];return _0xa996cc['format'](TextManager['tp']);},Window_ShopStatus['prototype'][_0x1f1bbd(0x367)]=function(){const _0x3ddd22=_0x1f1bbd,_0x534f40='USER\x20TP\x20GAIN';if(this['_customItemInfo'][_0x534f40])return this[_0x3ddd22(0x296)][_0x534f40];let _0x57556f='';return this[_0x3ddd22(0x1d5)][_0x3ddd22(0x108)]>0x0?_0x57556f+=_0x3ddd22(0x39f)['format'](this[_0x3ddd22(0x1d5)][_0x3ddd22(0x108)]):_0x57556f+='%1'[_0x3ddd22(0x2dd)](this['_itemData'][_0x3ddd22(0x108)]),_0x57556f;},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x27a)]=function(_0xad5c28,_0x3e7a1c,_0x34cc21){const _0x5067f7=_0x1f1bbd,_0x5be48b=_0x5067f7(0x1c6);if(this[_0x5067f7(0x1d5)]['rateHP']>=0x0&&this[_0x5067f7(0x1d5)][_0x5067f7(0x157)]>=0x0&&!this[_0x5067f7(0x296)][_0x5be48b])return![];const _0xfd5b52=this[_0x5067f7(0x1de)]();this[_0x5067f7(0x1e6)](_0xfd5b52,_0xad5c28,_0x3e7a1c,_0x34cc21,!![]);const _0x576422=this[_0x5067f7(0x340)]();return this[_0x5067f7(0xb3)](ColorManager[_0x5067f7(0x1bb)](0x0)),this[_0x5067f7(0x1e6)](_0x576422,_0xad5c28,_0x3e7a1c,_0x34cc21,![],_0x5067f7(0x20c)),this[_0x5067f7(0x35a)](_0xad5c28,_0x3e7a1c,_0x34cc21),this[_0x5067f7(0xe9)](),!![];},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x1de)]=function(){const _0x3a93f6=_0x1f1bbd,_0x124b4a=VisuMZ[_0x3a93f6(0x1fc)]['Settings'][_0x3a93f6(0xa5)][_0x3a93f6(0x9c)];return _0x124b4a['format'](TextManager['hp']);},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x340)]=function(){const _0x44185c=_0x1f1bbd,_0x309e12=_0x44185c(0x1c6);if(this['_customItemInfo'][_0x309e12])return this[_0x44185c(0x296)][_0x309e12];let _0x531081='';if(this[_0x44185c(0x1d5)][_0x44185c(0x74)]<0x0)_0x531081+=_0x44185c(0x122)[_0x44185c(0x2dd)](Math['floor'](this[_0x44185c(0x1d5)][_0x44185c(0x74)]*0x64));if(this[_0x44185c(0x1d5)][_0x44185c(0x74)]<0x0&&this['_itemData'][_0x44185c(0x157)]<0x0)_0x531081+='\x20';if(this[_0x44185c(0x1d5)][_0x44185c(0x157)]<0x0)_0x531081+='%1'[_0x44185c(0x2dd)](this[_0x44185c(0x1d5)][_0x44185c(0x157)]);return _0x531081;},Window_ShopStatus[_0x1f1bbd(0x187)]['drawItemEffectsMpDamage']=function(_0x236cf4,_0x27101e,_0x40db18){const _0x2f56de=_0x1f1bbd,_0x31c217=_0x2f56de(0x15c);if(this['_itemData'][_0x2f56de(0x15d)]>=0x0&&this[_0x2f56de(0x1d5)][_0x2f56de(0x3b1)]>=0x0&&!this[_0x2f56de(0x296)][_0x31c217])return![];const _0x33144c=this[_0x2f56de(0x30d)]();this[_0x2f56de(0x1e6)](_0x33144c,_0x236cf4,_0x27101e,_0x40db18,!![]);const _0x38e9bc=this['getItemEffectsMpDamageText']();return this[_0x2f56de(0xb3)](ColorManager[_0x2f56de(0x1bb)](0x2)),this[_0x2f56de(0x1e6)](_0x38e9bc,_0x236cf4,_0x27101e,_0x40db18,![],_0x2f56de(0x20c)),this[_0x2f56de(0x35a)](_0x236cf4,_0x27101e,_0x40db18),this[_0x2f56de(0xe9)](),!![];},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x30d)]=function(){const _0x47bd40=_0x1f1bbd,_0x31a26a=VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow'][_0x47bd40(0x267)];return _0x31a26a[_0x47bd40(0x2dd)](TextManager['mp']);},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0xc1)]=function(){const _0x416b8d=_0x1f1bbd,_0x2e15a8='MP\x20DAMAGE';if(this[_0x416b8d(0x296)][_0x2e15a8])return this[_0x416b8d(0x296)][_0x2e15a8];let _0x53845e='';if(this[_0x416b8d(0x1d5)]['rateMP']<0x0)_0x53845e+=_0x416b8d(0x122)[_0x416b8d(0x2dd)](Math[_0x416b8d(0x1b3)](this[_0x416b8d(0x1d5)]['rateMP']*0x64));if(this[_0x416b8d(0x1d5)]['rateMP']<0x0&&this[_0x416b8d(0x1d5)][_0x416b8d(0x3b1)]<0x0)_0x53845e+='\x20';if(this[_0x416b8d(0x1d5)][_0x416b8d(0x3b1)]<0x0)_0x53845e+='%1'[_0x416b8d(0x2dd)](this['_itemData'][_0x416b8d(0x3b1)]);return _0x53845e;},Window_ShopStatus['prototype'][_0x1f1bbd(0x312)]=function(_0x540dd8,_0x150c03,_0x3617e4){const _0x70d3f2=_0x1f1bbd,_0x2a07b0=_0x70d3f2(0xb8);if(this['_itemData'][_0x70d3f2(0xb1)]>=0x0&&!this[_0x70d3f2(0x296)][_0x2a07b0])return![];const _0x382c16=this[_0x70d3f2(0x17e)]();this['drawItemKeyData'](_0x382c16,_0x540dd8,_0x150c03,_0x3617e4,!![]);const _0x134448=this['getItemEffectsTpDamageText']();return this[_0x70d3f2(0xb3)](ColorManager['powerDownColor']()),this[_0x70d3f2(0x1e6)](_0x134448,_0x540dd8,_0x150c03,_0x3617e4,![],_0x70d3f2(0x20c)),this[_0x70d3f2(0x35a)](_0x540dd8,_0x150c03,_0x3617e4),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x1f1bbd(0x17e)]=function(){const _0x9c58b9=_0x1f1bbd,_0x1d7de0=VisuMZ[_0x9c58b9(0x1fc)][_0x9c58b9(0xb9)][_0x9c58b9(0xa5)][_0x9c58b9(0xfc)];return _0x1d7de0[_0x9c58b9(0x2dd)](TextManager['tp']);},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x1aa)]=function(){const _0x495989=_0x1f1bbd,_0x3bd816=_0x495989(0xb8);if(this['_customItemInfo'][_0x3bd816])return this[_0x495989(0x296)][_0x3bd816];let _0x5b96c8='';return _0x5b96c8+='%1'[_0x495989(0x2dd)](this['_itemData']['gainTP']),_0x5b96c8;},Window_ShopStatus['prototype'][_0x1f1bbd(0x2af)]=function(_0x17b1a1,_0x4340fa,_0x57c1e9){const _0x16ea46=_0x1f1bbd,_0x1acd87=_0x16ea46(0x1cd);if(!this[_0x16ea46(0x1d5)][_0x16ea46(0xee)]&&!this[_0x16ea46(0x296)][_0x1acd87])return![];const _0x4547b5=this[_0x16ea46(0x217)]();this['drawItemKeyData'](_0x4547b5,_0x17b1a1,_0x4340fa,_0x57c1e9,!![]);const _0x1648a4=this[_0x16ea46(0xd5)]();return this[_0x16ea46(0x1e6)](_0x1648a4,_0x17b1a1,_0x4340fa,_0x57c1e9,![],_0x16ea46(0x20c)),this[_0x16ea46(0x35a)](_0x17b1a1,_0x4340fa,_0x57c1e9),this[_0x16ea46(0xe9)](),!![];},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x217)]=function(){const _0x2d334b=_0x1f1bbd;return VisuMZ['ItemsEquipsCore'][_0x2d334b(0xb9)][_0x2d334b(0xa5)][_0x2d334b(0x16a)];},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0xd5)]=function(){const _0x4e2e97=_0x1f1bbd,_0x1ede33='ADDED\x20EFFECTS';if(this[_0x4e2e97(0x296)][_0x1ede33])return this[_0x4e2e97(0x296)][_0x1ede33];let _0xf0eda7='',_0x48b9e6=0x0;const _0x538511=0x8;for(const _0x5dfa27 of this['_itemData'][_0x4e2e97(0x1c1)]){const _0x4ea7b4=$dataStates[_0x5dfa27];if(_0x4ea7b4&&_0x4ea7b4[_0x4e2e97(0x2c9)]>0x0){_0xf0eda7+=_0x4e2e97(0x3b5)['format'](_0x4ea7b4[_0x4e2e97(0x2c9)]),_0x48b9e6++;if(_0x48b9e6>=_0x538511)return _0xf0eda7;}}for(let _0x5e802a=0x0;_0x5e802a<this[_0x4e2e97(0x1d5)][_0x4e2e97(0x315)]['length'];_0x5e802a++){const _0x6c77e6=this[_0x4e2e97(0x1d5)]['changeBuff'][_0x5e802a],_0x1a38dd=Game_BattlerBase[_0x4e2e97(0x187)]['buffIconIndex'](_0x6c77e6,_0x5e802a);if(_0x1a38dd>0x0){_0xf0eda7+=_0x4e2e97(0x3b5)[_0x4e2e97(0x2dd)](_0x1a38dd),_0x48b9e6++;if(_0x48b9e6>=_0x538511)return _0xf0eda7;}}return _0xf0eda7;},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x90)]=function(_0x2a3344,_0x51c8ad,_0x24a585){const _0x38b213=_0x1f1bbd,_0x13cd4a=_0x38b213(0xfb);if(!this[_0x38b213(0x1d5)][_0x38b213(0x3a2)]&&!this[_0x38b213(0x296)][_0x13cd4a])return![];const _0x394186=this['getItemEffectsRemovedStatesBuffsLabel']();this[_0x38b213(0x1e6)](_0x394186,_0x2a3344,_0x51c8ad,_0x24a585,!![]);const _0x2ecddd=this[_0x38b213(0x67)]();return this[_0x38b213(0x1e6)](_0x2ecddd,_0x2a3344,_0x51c8ad,_0x24a585,![],_0x38b213(0x20c)),this[_0x38b213(0x35a)](_0x2a3344,_0x51c8ad,_0x24a585),this[_0x38b213(0xe9)](),!![];},Window_ShopStatus[_0x1f1bbd(0x187)]['getItemEffectsRemovedStatesBuffsLabel']=function(){const _0x3c4513=_0x1f1bbd;return VisuMZ[_0x3c4513(0x1fc)][_0x3c4513(0xb9)]['StatusWindow'][_0x3c4513(0xd9)];},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x67)]=function(){const _0x394457=_0x1f1bbd,_0x2de5f6=_0x394457(0xfb);if(this['_customItemInfo'][_0x2de5f6])return this[_0x394457(0x296)][_0x2de5f6];let _0x49889b='',_0x1639fb=0x0;const _0x1ccbed=VisuMZ[_0x394457(0x1fc)][_0x394457(0xb9)][_0x394457(0xa5)]['MaxIcons'];for(const _0xdfb589 of this['_itemData'][_0x394457(0x3c8)]){const _0x37f8d8=$dataStates[_0xdfb589];if(_0x37f8d8&&_0x37f8d8[_0x394457(0x2c9)]>0x0){_0x49889b+=_0x394457(0x3b5)[_0x394457(0x2dd)](_0x37f8d8['iconIndex']),_0x1639fb++;if(_0x1639fb>=_0x1ccbed)return _0x49889b;}}for(let _0x5c08c2=0x0;_0x5c08c2<this['_itemData']['removeBuff'][_0x394457(0x2f0)];_0x5c08c2++){const _0x3cc06b=Game_BattlerBase[_0x394457(0x187)]['buffIconIndex'](0x1,_0x5c08c2);if(_0x3cc06b>0x0){_0x49889b+=_0x394457(0x3b5)[_0x394457(0x2dd)](_0x3cc06b),_0x1639fb++;if(_0x1639fb>=_0x1ccbed)return _0x49889b;}}for(let _0x2d83e8=0x0;_0x2d83e8<this[_0x394457(0x1d5)][_0x394457(0x2dc)][_0x394457(0x2f0)];_0x2d83e8++){const _0x21aa41=Game_BattlerBase['prototype'][_0x394457(0x35e)](-0x1,_0x2d83e8);if(_0x21aa41>0x0){_0x49889b+='\x5cI[%1]'[_0x394457(0x2dd)](_0x21aa41),_0x1639fb++;if(_0x1639fb>=_0x1ccbed)return _0x49889b;}}return _0x49889b;},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x2d7)]=function(_0x5159e6,_0x4902e5,_0x5932d6){const _0x40f439=_0x1f1bbd;if(this['_item'][_0x40f439(0x262)]['match'](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0x4702e2=String(RegExp['$1'])[_0x40f439(0x2f6)](/[\r\n]+/);for(const _0x363796 of _0x4702e2){if(_0x363796['match'](/(.*):[ ](.*)/i)){const _0x551ece=String(RegExp['$1'])['trim'](),_0x353a19=String(RegExp['$2'])['trim']();this[_0x40f439(0x150)](_0x551ece,_0x353a19,_0x5159e6,_0x4902e5,_0x5932d6),_0x4902e5+=this['lineHeight']();}}}return this[_0x40f439(0xe9)](),_0x4902e5;},Window_ShopStatus[_0x1f1bbd(0x187)][_0x1f1bbd(0x150)]=function(_0x49f4a2,_0x5a814a,_0x43295c,_0x39f8c2,_0x3b0a93){const _0x2e8017=_0x1f1bbd;this['drawItemKeyData'](_0x49f4a2,_0x43295c,_0x39f8c2,_0x3b0a93,!![]),this[_0x2e8017(0x1e6)](_0x5a814a,_0x43295c,_0x39f8c2,_0x3b0a93,![],'right'),this[_0x2e8017(0x35a)](_0x43295c,_0x39f8c2,_0x3b0a93),this[_0x2e8017(0xe9)]();};